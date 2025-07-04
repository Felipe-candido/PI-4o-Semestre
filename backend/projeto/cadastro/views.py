from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework import status, viewsets
from .models import Endereco_usuario
from .serializers import EnderecoSerializer, UserSerializer, edit_user_serializer, RegistroSerializer, LoginSerializer
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from .services import UserService, CookieJWTAuthentication

user = get_user_model()


# API PARA REGISTRO DE USUARIOS
class Registro(APIView):
    def post(self, request):
        dados = request.data.copy()
        serializer = RegistroSerializer(data=dados)
        if serializer.is_valid():
            user = UserService.registrar_usuario(serializer.validated_data) 
            return Response(UserSerializer(user).data, status=status.HTTP_201_CREATED)
        
        print("Erros de validação:", serializer.errors)  
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
# API PARA LOGIN COM GERENCIAMENTO DE TOKEN JWT
class Login(APIView):
    def post(self, request):
        serializer = LoginSerializer(data = request.data)
        if serializer.is_valid():
            user = UserService.autenticar_usuario(serializer.validated_data)
            
            # DEFININDO TOKENS DE AUTENTICACAO
            refresh = RefreshToken.for_user(user)
            access_token = str(refresh.access_token)
            refresh_token = str(refresh)

            response = Response({
                "id_usuario": user.id, 
                "email": user.email,
                "nome": user.nome,
            })

            response.set_cookie(
                key='access_token',
                value=access_token,
                httponly=True,
                secure=False,
                samesite='Lax',
                domain='localhost',
                path='/',
                max_age=60 * 15,
            )

            response.set_cookie(
                key='refresh_token',
                value=refresh_token,
                httponly=True,
                secure=False,
                samesite='Lax',
                domain='localhost',
                path='/api/token/refresh',
                max_age=60 * 60 * 24,
            )
            
            return response
        
        print("erros de validacao", serializer.errors),
        return Response(
            serializer.errors,
            status = status.HTTP_400_BAD_REQUEST
        )   
        
# API PARA DESCONECTAR USUARIO AUTENTICADO
class viewLogout(viewsets.ViewSet):
    @action(detail=False, methods=['post'])
    def logout(self, request):
        response = Response({'message': 'Logout realizado com sucesso'})
        
        # Remove os cookies
        response.delete_cookie('access_token')
        response.delete_cookie('refresh_token')
        
        return response
    

class RefreshTokenView(viewsets.ViewSet):
    def post(self, request):
        refresh_token = request.COOKIES.get('refresh_token')
        
        if not refresh_token:
            return Response(
                {'error': 'Refresh token não fornecido'},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            refresh = RefreshToken(refresh_token)
            new_access_token = str(refresh.access_token)
            
            response = Response({'message': 'Token atualizado'})
            
            response.set_cookie(
                key='access_token',
                value=new_access_token,
                httponly=True,
                secure=False,
                samesite='Lax',
                max_age=60 * 15,
            )

            print("Headers da resposta:", response.headers)
            
            return response
            
        except Exception as e:
            return Response(
                {'error': 'Refresh token inválido'},
                status=status.HTTP_401_UNAUTHORIZED
            )





# API PARA PEGAR OS DADOS DO USUARIO AUTENTICADO E SEU ENDERECO
class UserAuthenticated(viewsets.ViewSet):
    authentication_classes = [CookieJWTAuthentication]
    permission_classes = [IsAuthenticated]

    @action(detail=False, methods=['get'])
    def me(self, request):
        user = request.user
        try:
            endereco = UserService.get_endereco(user)
            print("ENDERECO", endereco)
            endereco_serializer = EnderecoSerializer(endereco)
        except Endereco_usuario.DoesNotExist:
            endereco_serializer = None

        serializer = UserSerializer(user)
        
        return Response({
            'user': serializer.data,
            'endereco': endereco_serializer.data if endereco_serializer else None
        })
    

    

class editUsuario(viewsets.ViewSet):
    authentication_classes = [CookieJWTAuthentication]
    permission_classes = [IsAuthenticated]

    @action(detail=False, methods=['patch'])
    def edit(self, request):
        user = request.user
        data = request.data

        user.tipo = 'proprietario'
        # ATUALIZA OS DADOS DO USUARIO
        user_serializer = UserSerializer(user, data=data.get('user', {}), partial=True)
        user_serializer.is_valid(raise_exception=True)
        user_serializer.save()
        
        # ATUALIZA OU CRIA UM ENDERECO
        endereco_data = data.get('endereco', {})
        if endereco_data:
            endereco, created = Endereco_usuario.objects.update_or_create(
                user=user,
                defaults=endereco_data
            )
            endereco_serializer = EnderecoSerializer(endereco)
        else:
            endereco_serializer = None
        
        print(endereco_serializer.data)
        return Response({
            'user': user_serializer.data,
            'endereco': endereco_serializer.data if endereco_serializer else None
        })
    



