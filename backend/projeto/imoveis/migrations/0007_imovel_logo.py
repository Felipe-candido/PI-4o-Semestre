# Generated manually

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('imoveis', '0006_imagem_imovel'),
    ]

    operations = [
        migrations.AddField(
            model_name='imovel',
            name='logo',
            field=models.ImageField(
                blank=True,
                null=True,
                upload_to='imoveis/logos/',
                verbose_name='Logo do Imóvel'
            ),
        ),
    ] 