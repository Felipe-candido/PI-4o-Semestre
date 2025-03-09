from django.db import models

# Create your models here.

class usuario(models.Model):
    nome = models.CharField(max_length=255, null=False),
    email = models.EmailField(max_length=255, null=False)
    senha = models.CharField(max_length=255, null=False)

    def __str__(self):
        return self.nome