"""
SETTINGS.PY – CONFIGURAÇÃO PROFISSIONAL DJANGO + RENDER + GCS
=============================================================
Feito para funcionar perfeitamente em:
- Desenvolvimento local (DEBUG=True, carregando .env)
- Produção (Render) com Google Cloud Storage
"""

import os
from pathlib import Path
from datetime import timedelta

BASE_DIR = Path(__file__).resolve().parent.parent


# ============================================================
# 🔹 1. DEBUG E VARIÁVEIS DE AMBIENTE
# ============================================================

DEBUG = os.getenv('DJANGO_DEBUG', 'False') == 'True'

if DEBUG:
    from dotenv import load_dotenv
    print("⚠️ Rodando em modo DEBUG, carregando .env local…")
    load_dotenv(BASE_DIR / "tokens.env")
else:
    print("✅ Rodando em modo PRODUÇÃO.")


# ============================================================
# 🔹 2. SECRET KEY (Produção: OBRIGATÓRIA)
# ============================================================

SECRET_KEY = os.getenv("DJANGO_SECRET_KEY")

if not SECRET_KEY:
    if DEBUG:
        SECRET_KEY = "django-insecure-local-dev-only"
        print("⚠️ Usando SECRET_KEY insegura em modo DEV.")
    else:
        raise ValueError("❌ ERRO: DJANGO_SECRET_KEY deve estar definida em produção.")


# ============================================================
# 🔹 3. HOSTS / CORS / CSRF
# ============================================================

ALLOWED_HOSTS = os.getenv("DJANGO_ALLOWED_HOSTS", "localhost,127.0.0.1").split(",")

if "RENDER" in os.environ:
    ALLOWED_HOSTS.append(os.getenv("RENDER_EXTERNAL_HOSTNAME"))

CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "https://ba2bfe523cb1.ngrok-free.app",
]

if DEBUG:
    CORS_ALLOW_ALL_ORIGINS = True

CORS_ALLOW_CREDENTIALS = True

CSRF_TRUSTED_ORIGINS = [
    "http://localhost:3000",
    "https://ba2bfe523cb1.ngrok-free.app",
]

SESSION_COOKIE_SECURE = True
CSRF_COOKIE_SECURE = True
SESSION_COOKIE_SAMESITE = "None"
CSRF_COOKIE_SAMESITE = "None"


# ============================================================
# 🔹 4. APPS
# ============================================================

INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",

    # APPS DO PROJETO
    "cadastro",
    "imoveis",
    "reservas",
    "pagamentos",
    "comentarios",

    # DRF
    "rest_framework",
    "rest_framework_simplejwt",
    "corsheaders",

    # Armazenamento Google
    "storages",
]


# ============================================================
# 🔹 5. MIDDLEWARE
# ============================================================

MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "corsheaders.middleware.CorsMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",

    # Middleware personalizado
    "cadastro.middleware.CookieProxyMiddleware",
]


# ============================================================
# 🔹 6. URLS / TEMPLATES / WSGI
# ============================================================

ROOT_URLCONF = "projeto.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

WSGI_APPLICATION = "projeto.wsgi.application"


# ============================================================
# 🔹 7. DATABASE (PostgreSQL)
# ============================================================

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.postgresql",
        "NAME": "app_chacaras",
        "USER": "postgres",
        "PASSWORD": "123",
        "HOST": "localhost",
        "PORT": "5432",
    }
}


# ============================================================
# 🔹 8. SENHAS
# ============================================================

AUTH_PASSWORD_VALIDATORS = [
    {"NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator"},
    {"NAME": "django.contrib.auth.password_validation.MinimumLengthValidator"},
    {"NAME": "django.contrib.auth.password_validation.CommonPasswordValidator"},
    {"NAME": "django.contrib.auth.password_validation.NumericPasswordValidator"},
]


# ============================================================
# 🔹 9. REST FRAMEWORK / JWT
# ============================================================

REST_FRAMEWORK = {
    "DEFAULT_AUTHENTICATION_CLASSES": [
        "rest_framework_simplejwt.authentication.JWTAuthentication",
    ]
}

SIMPLE_JWT = {
    "ACCESS_TOKEN_LIFETIME": timedelta(minutes=600),
    "REFRESH_TOKEN_LIFETIME": timedelta(days=1),
    "AUTH_COOKIE": "access_token",
    "AUTH_COOKIE_SECURE": True,
    "AUTH_COOKIE_HTTP_ONLY": True,
    "AUTH_COOKIE_SAMESITE": "None",
}


AUTH_USER_MODEL = "cadastro.usuario"


# ============================================================
# 🔹 10. ARQUIVOS ESTÁTICOS / GOOGLE STORAGE
# ============================================================

GOOGLE_APPLICATION_CREDENTIALS = os.getenv("GOOGLE_APPLICATION_CREDENTIALS")
GS_BUCKET_NAME = os.getenv("GS_BUCKET_NAME")

if GOOGLE_APPLICATION_CREDENTIALS and GS_BUCKET_NAME:
    print(f"✅ GCS configurado. Bucket: {GS_BUCKET_NAME}")

    STORAGE_BACKEND = "storages.backends.gcloud.GoogleCloudStorage"

    STATIC_URL = f"https://storage.googleapis.com/{GS_BUCKET_NAME}/static/"
    MEDIA_URL = f"https://storage.googleapis.com/{GS_BUCKET_NAME}/media/"

    STATICFILES_STORAGE = STORAGE_BACKEND
    DEFAULT_FILE_STORAGE = STORAGE_BACKEND

    GS_QUERYSTRING_AUTH = False

    STORAGES = {
        "staticfiles": {
            "BACKEND": STORAGE_BACKEND,
            "OPTIONS": {"bucket_name": GS_BUCKET_NAME, "location": "static"},
        },
        "default": {
            "BACKEND": STORAGE_BACKEND,
            "OPTIONS": {"bucket_name": GS_BUCKET_NAME, "location": "media"},
        },
    }

else:
    print("⚠️ GCS não configurado. Usando armazenamento local.")

    STATIC_URL = "/static/"
    MEDIA_URL = "/media/"

    STATIC_ROOT = BASE_DIR / "staticfiles"
    MEDIA_ROOT = BASE_DIR / "media"


# ============================================================
# 🔹 11. OUTRAS CONFIGURAÇÕES
# ============================================================

LANGUAGE_CODE = "pt-br"
TIME_ZONE = "UTC"
USE_I18N = True
USE_TZ = True

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

APPEND_SLASH = False
