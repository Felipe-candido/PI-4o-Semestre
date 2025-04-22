from django.test import TestCase
from cadastro.models import usuario

class UsuarioModelTestCase(TestCase):

      def test_create_usuario(self):
            user = usuario.objects.create(
                  id = 1,
                  email = 'teste@teste.com',
                  nome = 'teste',
                  sobrenome = 'testando',
                  is_active = True,
                  is_staff = False,
                  date_joined = '2025-04-21 20:06:15.62512-03',
                  tipo = 'locatario'
            )
            
            self.assertEqual(user.id, 1)
            self.assertEqual(user.email, 'teste@teste.com')
            self.assertEqual(user.nome, 'teste')
            self.assertEqual(user.sobrenome, 'testando')
            self.assertEqual(user.is_active, True)
            self.assertEqual(user.is_staff, False)
            self.assertEqual(user.date_joined, '2025-04-21 20:06:15.62512-03')
            self.assertEqual(user.tipo, 'locatario')
            