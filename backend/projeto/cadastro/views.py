from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework import status, viewsets
from .models import Endereco_usuario
from .serializers import EnderecoSerializer, UserSerializer, RegistroSerializer, LoginSerializer
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from .services import UserService, CookieJWTAuthentication


def get_cookie_config(request):
    """
    Determina a configuração correta dos cookies baseada na origem da requisição
    """
    origin = request.META.get('HTTP_ORIGIN', '')
    forwarded_host = request.META.get('HTTP_X_FORWARDED_HOST', '')
    referer = request.META.get('HTTP_REFERER', '')
    host = request.get_host()
    
    print(f"🔍 Debug cookie config:")
    print(f"  Origin: {origin}")
    print(f"  X-Forwarded-Host: {forwarded_host}")
    print(f"  Referer: {referer}")
    print(f"  Host: {host}")
    
    # Verifica se a requisição vem do ngrok (mais flexível)
    # Inclui verificação do host atual também
    all_urls = [origin, forwarded_host, referer, host]
    is_ngrok = any('ngrok' in str(url).lower() for url in all_urls if url)
    
    # Se não detectou ngrok mas o Origin contém ngrok, força ngrok
    if not is_ngrok and origin and 'ngrok' in origin.lower():
        is_ngrok = True
        print(f"  Forçando detecção de ngrok baseado no Origin")
    
    print(f"  Is ngrok detected: {is_ngrok}")
    
    if is_ngrok:
        config = {
            'domain': None,  # Não definir domain para funcionar com proxy
            'secure': True,
            'samesite': 'None'
        }
    else:
        config = {
            'domain': None,
            'secure': False,
            'samesite': 'Lax'
        }
    
    print(f"  Cookie config: {config}")
    return config


user = get_user_model()


# API PARA REGISTRO DE USUARIOS
class Registro(APIView):
    def post(self, request):
        dados = request.data.copy()
        serializer = RegistroSerializer(data=dados)
        if serializer.is_valid():
            try:    
                print("toba")
                user = serializer.save() 
                return Response(UserSerializer(user).data, status=status.HTTP_201_CREATED)
                     
            except Exception as e:
                return Response({'detail': 'Ocorreu um erro inesperado'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        print("Erros de validação:", serializer.errors)  
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
# API PARA LOGIN COM GERENCIAMENTO DE TOKEN JWT
class Login(APIView):
    def post(self, request):
        serializer = LoginSerializer(data = request.data)
        if serializer.is_valid():
            user = UserService.autenticar_usuario(serializer.validated_data)

             # --- DEBUG ---
            print(f"Host (request.get_host()): {request.get_host()}")
            print(f"Header X-Forwarded-Host: {request.META.get('HTTP_X_FORWARDED_HOST')}")
            print(f"Header Origin: {request.META.get('HTTP_ORIGIN')}")
            # -------------
            
            # DEFININDO TOKENS DE AUTENTICACAO
            refresh = RefreshToken.for_user(user)
            access_token = str(refresh.access_token)
            refresh_token = str(refresh)

            response = Response({
                "id_usuario": user.id, 
                "email": user.email,
                "nome": user.nome,
            })

            # Obter configuração dos cookies baseada na origem
            cookie_config = get_cookie_config(request)

            print(f"🍪 Criando cookies com configuração: {cookie_config}")
            print(f"🔑 Access token: {access_token[:20]}...")
            print(f"🔄 Refresh token: {refresh_token[:20]}...")

            response.set_cookie(
                key='access_token',
                value=access_token,
                httponly=True,
                secure=cookie_config['secure'],
                samesite=cookie_config['samesite'],
                domain=cookie_config['domain'],
                path='/',
                max_age=60 * 60 * 24,
            )

            response.set_cookie(
                key='refresh_token',
                value=refresh_token,
                httponly=True,
                secure=cookie_config['secure'],
                samesite=cookie_config['samesite'],
                domain=cookie_config['domain'],
                path='/api/token/refresh',
                max_age=60 * 60 * 24,
            )

            print(f"📤 Headers de resposta:")
            for key, value in response.headers.items():
                if 'set-cookie' in key.lower():
                    print(f"  {key}: {value}")
            
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
        
        # Obter configuração dos cookies baseada na origem
        cookie_config = get_cookie_config(request)
        
        # Remove os cookies
        response.delete_cookie('access_token', domain=cookie_config['domain'], path='/')
        response.delete_cookie('refresh_token', domain=cookie_config['domain'], path='/api/token/refresh')
        
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
            
            # Obter configuração dos cookies baseada na origem
            cookie_config = get_cookie_config(request)
            
            response.set_cookie(
                key='access_token',
                value=new_access_token,
                httponly=True,
                secure=cookie_config['secure'],
                samesite=cookie_config['samesite'],
                domain=cookie_config['domain'],
                path='/',
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

        # PEGANDO E FORMATANDO OS DADOS PARA MANDAR AO SERVICE E SALVAR NO BANCO
        user = request.user
        request_data = request.data.copy()
        new_data = request_data.get('user', {})
        endereco_data = request_data.get('endereco', {})

        user.tipo = 'proprietario'

        result = UserService.update(user, new_data, endereco_data)

        return Response(result, status=status.HTTP_201_CREATED)


        

    



