from django.test import TestCase
from cadastro.models import usuario
from django.db import IntegrityError

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