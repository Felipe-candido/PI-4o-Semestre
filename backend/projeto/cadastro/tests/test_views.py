from django.contrib.auth import get_user_model
from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APIClient, APIRequestFactory
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from cadastro.models import usuario  
from cadastro.views import (
    view_registro,
    viewLogin,
    RefreshTokenView,
    viewLogout,
    UserAuthenticated
)

User = get_user_model()



class RegistroUsuarioTestCase(TestCase):
      def test_registro_usuario_sucesso(self):
            dados = {
                  'email': 'teste@teste.com',
                  'nome': 'testando',
                  'password': '123',
            }

            response = self.client.post('/api/registrar/', dados)
            
            self.assertEqual(response.status_code, 201)
            self.assertEqual(response.data['mensagem'], 'Usuario registrado com sucesso!')



class RegistroViewTests(TestCase):
    
    #CRIA O USUARIO E O SERVIDOR DE TESTES 
    def setUp(self):
        self.client = APIClient()
        self.factory = APIRequestFactory()
        
        self.url = reverse('registro-list')  
        
        self.valid_data = {
            'email': 'test@test.com',
            'nome': 'Test',
            'password': 'senha123mudar',
            'confirmaSenha': 'senha123mudar'
        }

    def test_registro_sucesso(self):
        # Formato JSON explícito para APIs REST
        response = self.client.post(
            self.url,
            self.valid_data,
            format='json'  
        )
        
        
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['mensagem'], 'Usuario registrado com sucesso!')



class LoginViewTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.url = '/api/entrar/'
        self.user = User.objects.create_user(
            email='test@example.com',
            nome='Test User',
            password='testpassword123',
            tipo='proprietario'
        )
        self.valid_data = {
            'email': 'test@example.com',
            'password': 'testpassword123'
        }

    def test_login_sucesso(self):
        response = self.client.post(self.url, self.valid_data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        
        
        self.assertEqual(response.data['email'], 'test@example.com')
        self.assertEqual(response.data['nome'], 'Test User')
        
       
        self.assertIn('access_token', response.cookies)
        self.assertIn('refresh_token', response.cookies)
        
        
        refresh_token = response.cookies['refresh_token'].value
 
        self.assertTrue(RefreshToken(refresh_token))
        self.assertTrue(RefreshToken(refresh_token).access_token)

    def test_login_credenciais_invalidas(self):
        dados_invalidos = self.valid_data.copy()
        dados_invalidos['password'] = 'wrongpassword'
        response = self.client.post(self.url, dados_invalidos)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)  
        self.assertIn('non_field_errors', response.data)


class AutenticacaoTests(TestCase):
    
    def test_rota_protegida(self):
      user = User.objects.create_user(email='test@123.com', password='123')
      refresh = RefreshToken.for_user(user)
      self.client.cookies['access_token'] = str(refresh.access_token)
      
      response = self.client.get('/api/me/')
      self.assertEqual(response.status_code, 200)
