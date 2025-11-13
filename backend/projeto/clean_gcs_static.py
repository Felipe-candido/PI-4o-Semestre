#!/usr/bin/env python
"""
Script para fazer upload de arquivos estáticos para o GCS corretamente
"""
import os
import sys
import shutil
from pathlib import Path

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'projeto.settings')

import django
django.setup()

from django.conf import settings
from django.contrib.staticfiles.management.commands.collectstatic import Command
from storages.backends.gcloud import GoogleCloudStorage

print("🔄 Preparando upload de arquivos estáticos para GCS...\n")

try:
    # 1. Deletar STATIC_ROOT local
    static_root = Path(settings.STATIC_ROOT)
    if static_root.exists():
        print(f"🗑️  Removendo pasta local: {static_root}")
        shutil.rmtree(static_root)
    
    # 2. Limpar arquivos estáticos do GCS
    print("\n🧹 Limpando 'static/' do GCS...")
    storage = GoogleCloudStorage()
    bucket = storage.bucket
    
    blobs = list(bucket.list_blobs(prefix='static/'))
    for blob in blobs:
        print(f"   ✓ Deletando: {blob.name}")
        blob.delete()
    
    print(f"✅ {len(blobs)} arquivos removidos do GCS")
    
    # 3. Agora rodar collectstatic
    print("\n📤 Executando collectstatic para enviar para GCS...")
    cmd = Command(verbosity=2, interactive=False, ignore_patterns=None)
    cmd.handle(clear=True, dry_run=False, no_input=True, ignore_list=())
    
    print("\n✅ Upload concluído com sucesso!")
    
except Exception as e:
    print(f"\n❌ Erro: {e}")
    import traceback
    traceback.print_exc()
    sys.exit(1)
