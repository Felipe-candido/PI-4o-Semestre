import requests
from django.core.files.base import ContentFile
from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from imoveis.models import Imovel, Endereco_imovel, imagem_imovel, Comodidade

User = get_user_model()

class Command(BaseCommand):
    help = 'Popula o banco com imóveis na cidade Leme com imagens reais'

    def handle(self, *args, **options):
        # Usuário proprietário (ajuste conforme necessário)
        proprietario = User.objects.first()
        if not proprietario:
            self.stdout.write(self.style.ERROR('Nenhum usuário encontrado para ser proprietário.'))
            return
        
        # URLs de imagens reais (Unsplash)
        imagens_urls = [
            "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1472220625704-91e1462799b2?auto=format&fit=crop&w=800&q=80",
        ]

        # Criar comodidades básicas
        comodidades = []
        for nome in ["WiFi", "Estacionamento", "Piscina"]:
            c, _ = Comodidade.objects.get_or_create(nome=nome)
            comodidades.append(c)

        def criar_imovel(titulo, descricao, preco, numero_hospedes, regras, endereco_dados):
            imovel = Imovel.objects.create(
                proprietario=proprietario,
                titulo=titulo,
                descricao=descricao,
                preco=preco,
                numero_hospedes=numero_hospedes,
                regras=regras,
            )
            imovel.comodidades.set(comodidades)

            # Criar endereço com cep sem hífen
            Endereco_imovel.objects.create(
                imovel=imovel,
                rua=endereco_dados['rua'],
                numero=endereco_dados['numero'],
                cidade="Araras",
                estado=endereco_dados['estado'],
                cep=endereco_dados['cep'].replace("-", ""),
                bairro=endereco_dados['bairro']
            )

            # Baixa e salva imagens
            headers = {'User-Agent': 'Mozilla/5.0'}

            for i, url in enumerate(imagens_urls):
                try:
                    response = requests.get(url, headers=headers, timeout=10)
                    if response.status_code == 200:
                        img_name = f"{imovel.titulo.lower().replace(' ', '_')}_{i}.jpg"
                        image_file = ContentFile(response.content, img_name)

                        # Define a primeira imagem como logo
                        if i == 0:
                            imovel.logo.save(img_name, image_file, save=True)
                        else:
                            imagem_imovel.objects.create(
                                imovel=imovel,
                                legenda=f"Foto {i+1} do {imovel.titulo}",
                                imagem=image_file
                            )
                    else:
                        self.stdout.write(self.style.WARNING(f"Falha ao baixar imagem: {url}"))
                except Exception as e:
                    self.stdout.write(self.style.WARNING(f"Erro ao baixar imagem {url}: {e}"))
            return imovel

        # Cria os imóveis
        imovel1 = criar_imovel(
            titulo="Casa aconchegante em Leme",
            descricao="Casa espaçosa com piscina e WiFi rápido.",
            preco=350.0,
            numero_hospedes=6,
            regras="Não aceitar animais de estimação.",
            endereco_dados={
                'rua': "Rua das Flores",
                'numero': "123",
                'estado': "SP",
                'cep': "13670000",
                'bairro': "Centro"
            }
        )

        imovel2 = criar_imovel(
            titulo="Apartamento moderno no centro de Leme",
            descricao="Apartamento com ótimo acabamento e estacionamento.",
            preco=280.0,
            numero_hospedes=4,
            regras="Proibido fumar dentro do imóvel.",
            endereco_dados={
                'rua': "Avenida Brasil",
                'numero': "456",
                'estado': "SP",
                'cep': "13670001",
                'bairro': "Vila Nova"
            }
        )

        self.stdout.write(self.style.SUCCESS('Imóveis criados com sucesso!'))