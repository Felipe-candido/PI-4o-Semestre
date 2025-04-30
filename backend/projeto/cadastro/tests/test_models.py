from django.test import TestCase
from cadastro.models import usuario
from django.db import IntegrityError

class UsuarioModelTest(TestCase):

      def test_create_usuario(self):
            user = usuario.objects.create(
                  email = 'teste@teste.com',
                  nome = 'teste',
                  sobrenome = 'testando',
                  is_active = True,
                  is_staff = False,
                  tipo = 'locatario'
            )
            
            self.assertEqual(user.email, 'teste@teste.com')
            self.assertEqual(user.nome, 'teste')
            self.assertEqual(user.sobrenome, 'testando')
            self.assertEqual(user.is_active, True)
            self.assertEqual(user.is_staff, False)
            self.assertEqual(user.tipo, 'locatario')

      
      def test_email_unico(self):
            
            usuario.objects.create(
                  email = 'teste@teste.com',
                  nome = 'teste',
                  sobrenome = 'testando',
                  is_active = True,
                  is_staff = False,
                  tipo = 'locatario'
                  )
            
            with self.assertRaises(IntegrityError):
                  user2 = usuario.objects.create(
                  email = 'teste@teste.com',
                  nome = 'teste2',
                  sobrenome = 'testando2',
                  is_active = True,
                  is_staff = False,
                  tipo = 'locatario'
                  )
            