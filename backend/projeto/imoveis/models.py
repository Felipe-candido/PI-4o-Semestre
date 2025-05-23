from django.db import models
from django.conf import settings




class Comodidade(models.Model):
     nome = models.CharField(max_length=100, unique=True)

     def __str__(self):
          return self.nome
     


class Imovel(models.Model):

      id = models.AutoField(primary_key=True)
      proprietario = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
      titulo = models.CharField(max_length=255)
      descricao = models.CharField(max_length=255)
      preco = models.FloatField()
      numero_hospedes = models.IntegerField()
      regras = models.TextField(null=True, blank=True)
      comodidades = models.ManyToManyField(Comodidade, blank=True)
      id_reserva = models.CharField(max_length=200, blank=True)
      logo = models.ImageField(
          upload_to='imoveis/logos/',
          null=True,
          blank=True,
          verbose_name='Logo do Imóvel'
      )


      def __str__(self):
            return self.titulo

      
class imagem_imovel(models.Model):
     imovel = models.ForeignKey(Imovel, related_name='imagens', on_delete=models.CASCADE)
     imagem = models.ImageField(upload_to='imoveis/')
     legenda = models.CharField(max_length=255, blank=True)

     def __str__(self):
        return f"Imagem de {self.imovel.titulo}"


class Endereco_imovel(models.Model):
    imovel = models.OneToOneField(Imovel, on_delete=models.CASCADE, related_name='endereco')
    rua = models.CharField(max_length=255)
    numero = models.CharField(max_length=10)
    cidade = models.CharField(max_length=100)
    estado = models.CharField(max_length=100)
    cep = models.CharField(max_length=20)
    bairro = models.CharField(max_length=255)

    def __str__(self):
        return f"{self.rua}, {self.numero} - {self.cidade}"
    
