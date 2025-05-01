from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.utils.timezone import now
from django.core.validators import RegexValidator



# testando git
# Create your models here.



class customUserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError("O email e obrigatorio")
        
        email = self.normalize_email(email)

        extra_fields.pop('user_permissions', None)
        extra_fields.pop('groups', None)
        
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user
    
    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        return self.create_user(email, password, **extra_fields)
        


class usuario(AbstractBaseUser, PermissionsMixin):
    class TipoUsuario(models.TextChoices):
        ADMIN = 'admin', 'Administrador'
        VISITANTE = 'visitante', 'Visitante'
        LOCATARIO = 'locatario', 'Locatario'
        PROPRIETARIO = 'proprietario', 'proprietario'

    
    id = models.AutoField(primary_key=True)
    cpf = models.CharField(max_length=11, null=True, blank=True)
    dataNascimento = models.DateField(null=True, blank=True)
    email = models.EmailField(unique=True)
    nome = models.CharField(max_length=255)
    telefone = models.CharField(null=True, max_length=20, blank=True)
    sobrenome = models.CharField(max_length=255, blank=True, null=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    date_joined = models.DateTimeField(default=now)
    tipo = models.CharField(max_length=13,
                            choices=TipoUsuario.choices,
                            default=TipoUsuario.VISITANTE)
    
    class meta:
        constraints = [
            models.UniqueConstraint(
                fields=['endereco', 'id', 'cpf', 'dataNascimento', 'email', 'nome', 'sobrenome', 'is_staff', 'is_active', 'date_joined', 'tipo'],
                name='unique_endereco_pessoa' 
            )
        ]

    objects = customUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    def __str__(self):
        return self.email
    

class Endereco(models.Model):
    user = models.OneToOneField(usuario, on_delete=models.CASCADE, related_name='endereco')
    rua = models.CharField(max_length=255)
    numero = models.CharField(max_length=10)
    cidade = models.CharField(max_length=100)
    estado = models.CharField(max_length=100)
    cep = models.CharField(max_length=20)
    pais = models.CharField(max_length=255)

    def __str__(self):
        return f"{self.rua}, {self.numero} - {self.cidade}"



cep_validation = RegexValidator(
    regex=r'^\d{5}-?\d{3}$',
    message="CEP inválido. Use o formato XXXXX-XXX ou XXXXXXXX."
)
    
   

class chacara(models.Model):
    id = models.AutoField(primary_key=True)
    nome = models.CharField(max_length=255)
    Descricao = models.TextField()
    preco = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    capacidade = models.IntegerField(default=0)
    cep = models.CharField(max_length=9, verbose_name="CEP", help_text="Formato: XXXXX-XXX", validators=[cep_validation]) 

    def __str__(self):
        return self.nome

    
