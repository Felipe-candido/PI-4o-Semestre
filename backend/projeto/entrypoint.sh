#!/bin/sh

# Sair imediatamente se um comando falhar
set -e

# Executar as migrações do banco de dados
echo "Executando migrações do banco de dados..."
python manage.py migrate --noinput

# Coletar arquivos estáticos (para o GCS)
echo "Coletando arquivos estáticos..."
python manage.py collectstatic --noinput

# Iniciar o servidor Gunicorn
echo "Iniciando o Gunicorn..."
gunicorn projeto.wsgi:application --bind 0.0.0.0:8000