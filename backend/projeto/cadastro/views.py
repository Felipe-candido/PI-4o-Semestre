from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework import status, viewsets
from .models import Endereco
from .serializers import EnderecoSerializer, registroSerializer, loginSerializer, UserSerializer, edit_user_serializer
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated

user = get_user_model()


# Create your views here.

class view_registro(viewsets.ModelViewSet):
    queryset = user.objects.all()
    serializer_class = registroSerializer
    http_method_names = ['post', 'options']

    def create(self, request, *args, **kwargs):   
        dados = request.data.copy()
        dados['tipo'] = 'locatario'
        serializer = self.get_serializer(data = dados)
        if serializer.is_valid():
            serializer.save()
            return Response({'mensagem': 'Usuario registrado com sucesso!'}, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)   


class viewLogin(viewsets.ViewSet):
    def create(self, request):
        
        serializer = loginSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            user = serializer.validated_data["user"]
            
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
        
        return Response(
            serializer.errors,
            status = status.HTTP_400_BAD_REQUEST
        )


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


class viewLogout(viewsets.ViewSet):
    @action(detail=False, methods=['post'])
    def logout(self, request):
        response = Response({'message': 'Logout realizado com sucesso'})
        
        # Remove os cookies
        response.delete_cookie('access_token')
        response.delete_cookie('refresh_token')
        
        return response

class CookieJWTAuthentication(JWTAuthentication):
    def authenticate(self, request):
        # Tenta pegar o token do cookie
        token = request.COOKIES.get('access_token')
        
        if token is None:
            return None
            
        validated_token = self.get_validated_token(token)
        return self.get_user(validated_token), validated_token

class UserAuthenticated(viewsets.ViewSet):
    authentication_classes = [CookieJWTAuthentication]
    permission_classes = [IsAuthenticated]

    @action(detail=False, methods=['get'])
    def me(self, request):
        user = request.user
        try:
            endereco = Endereco.objects.get(user=user)
            endereco_serializer = EnderecoSerializer(endereco)
        except Endereco.DoesNotExist:
            endereco_serializer = None

        user_serializer = UserSerializer(user)
        
        return Response({
            'user': user_serializer.data,
            'endereco': endereco_serializer.data if endereco_serializer else None
        })
    

class editUsuario(viewsets.ViewSet):
    authentication_classes = [CookieJWTAuthentication]
    permission_classes = [IsAuthenticated]

    @action(detail=False, methods=['patch'])
    def edit(self, request):
        user = request.user
        data = request.data
        
        # ATUALIZA OS DADOS DO USUARIO
        user_serializer = UserSerializer(user, data=data.get('user', {}), partial=True)
        user_serializer.is_valid(raise_exception=True)
        user_serializer.save()
        
        # ATUALIZA OU CRIA UM ENDERECO
        endereco_data = data.get('endereco', {})
        if endereco_data:
            endereco, created = Endereco.objects.update_or_create(
                user=user,
                defaults=endereco_data
            )
            endereco_serializer = EnderecoSerializer(endereco)
        else:
            endereco_serializer = None
        
        return Response({
            'user': user_serializer.data,
            'endereco': endereco_serializer.data if endereco_serializer else None
        })

