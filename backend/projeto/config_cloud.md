## ADICIONAR NO TOKENS.ENV
GS_CREDENTIALS_PATH 
GS_BUCKET_NAME
GS_DEFAULT_ACL

## ENVIAR OS ARQUIVOS PARA O BUVKET GCS
python manage.py collectstatic

## CONFIG DO GOOGLE CREDENTIALS JSON GCP
Se você estiver hospedando o projeto (por exemplo, no Render, Railway, GCP App Engine, etc.), armazene o conteúdo da chave JSON em uma variável de ambiente e crie o arquivo no container assim:
# No settings.py
import json

GOOGLE_CREDS_JSON = os.getenv("GOOGLE_CREDENTIALS_JSON")
if GOOGLE_CREDS_JSON:
    GS_CREDENTIALS = service_account.Credentials.from_service_account_info(
        json.loads(GOOGLE_CREDS_JSON)
    )


## BANCO DE DADOS
Seu docker-compose.yml sobe um serviço db (PostgreSQL).

O Problema: É possível rodar um banco de dados dentro do Kubernetes, mas é complexo (envolve StatefulSets, PersistentVolumes) e arriscado para quem está começando.

A Solução: Usar um serviço de banco de dados gerenciado, como o Google Cloud SQL ou AWS RDS. Você paga, e a nuvem cuida de backups, segurança e escalabilidade para você.

Ação: Nenhuma por enquanto, apenas saiba que não vamos "subir" o serviço db do seu compose. Vamos apontar o Django para um banco de dados externo.


==========================================================================================
## postgresql://staycation_db_user:JVhV8SqYrJmHAtSYYOa1g4tdfEZlECPV@dpg-d4b6iekhg0os73eo7qcg-a/staycation_db