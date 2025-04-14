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
    email = models.EmailField(unique=True)
    nome = models.CharField(max_length=255)
    sobrenome = models.CharField(max_length=255, blank=True, null=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    date_joined = models.DateTimeField(default=now)
    tipo = models.CharField(max_length=13,
                            choices=TipoUsuario.choices,
                            default=TipoUsuario.VISITANTE)

    objects = customUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    def __str__(self):
        return self.email
    

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

    
