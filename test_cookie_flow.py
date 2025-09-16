#!/usr/bin/env python3
"""
Teste completo do fluxo de cookies com ngrok
"""

import requests
import json

def test_complete_cookie_flow():
    """Testa o fluxo completo de login e autenticação"""
    
    # URL do ngrok
    ngrok_url = "https://9b63e1766156.ngrok-free.app"
    
    print("🚀 Teste completo do fluxo de cookies")
    print(f"URL: {ngrok_url}")
    print("=" * 50)
    
    # Dados de teste (substitua pelos dados reais)
    login_data = {
        "email": "teste@exemplo.com",  # Substitua por um email válido
        "password": "senha123"         # Substitua por uma senha válida
    }
    
    # Criar uma sessão para manter os cookies
    session = requests.Session()
    
    try:
        print("1️⃣ Fazendo login...")
        login_response = session.post(
            f"{ngrok_url}/api/cadastro/login/",
            json=login_data,
            headers={
                'Content-Type': 'application/json',
                'Origin': ngrok_url,
                'X-Forwarded-Host': '9b63e1766156.ngrok-free.app',
                'X-Forwarded-Proto': 'https'
            }
        )
        
        print(f"   Status: {login_response.status_code}")
        
        if login_response.status_code == 200:
            print("   ✅ Login bem-sucedido")
            
            # Verificar cookies recebidos
            print(f"\n2️⃣ Cookies recebidos ({len(session.cookies)}):")
            for cookie in session.cookies:
                print(f"   {cookie.name}: {cookie.value[:20]}...")
                print(f"   Domain: {cookie.domain}")
                print(f"   Secure: {cookie.secure}")
                print(f"   SameSite: {cookie.get('samesite', 'Not set')}")
                print()
        else:
            print(f"   ❌ Falha no login: {login_response.text}")
            return
        
        print("3️⃣ Testando autenticação com /api/me/...")
        me_response = session.get(
            f"{ngrok_url}/api/me/",
            headers={
                'Origin': ngrok_url,
                'X-Forwarded-Host': '9b63e1766156.ngrok-free.app',
                'X-Forwarded-Proto': 'https'
            }
        )
        
        print(f"   Status: {me_response.status_code}")
        
        if me_response.status_code == 200:
            print("   ✅ Autenticação funcionando!")
            print(f"   Dados do usuário: {me_response.json()}")
        else:
            print(f"   ❌ Falha na autenticação: {me_response.text}")
            
            # Debug adicional
            print(f"\n🔍 Debug da requisição /api/me/:")
            print(f"   Headers enviados: {dict(me_response.request.headers)}")
            print(f"   Cookies enviados: {dict(session.cookies)}")
        
    except Exception as e:
        print(f"❌ Erro: {e}")

def test_direct_api():
    """Testa chamada direta à API sem proxy"""
    
    print("\n" + "=" * 50)
    print("🔧 Teste direto à API (sem proxy)")
    
    # URL direta do Django
    django_url = "http://127.0.0.1:8000"
    
    session = requests.Session()
    
    try:
        print("1️⃣ Login direto...")
        login_response = session.post(
            f"{django_url}/api/cadastro/login/",
            json={"email": "teste@exemplo.com", "password": "senha123"},
            headers={'Content-Type': 'application/json'}
        )
        
        print(f"   Status: {login_response.status_code}")
        
        if login_response.status_code == 200:
            print("   ✅ Login direto funcionou")
            
            print("2️⃣ Testando /api/me/ direto...")
            me_response = session.get(f"{django_url}/api/me/")
            
            print(f"   Status: {me_response.status_code}")
            
            if me_response.status_code == 200:
                print("   ✅ Autenticação direta funcionando!")
            else:
                print(f"   ❌ Falha na autenticação direta: {me_response.text}")
        
    except Exception as e:
        print(f"❌ Erro no teste direto: {e}")

if __name__ == "__main__":
    test_complete_cookie_flow()
    test_direct_api()
    
    print("\n" + "=" * 50)
    print("📝 Instruções:")
    print("1. Verifique se o Django está rodando em http://127.0.0.1:8000")
    print("2. Verifique se o Next.js está rodando em http://localhost:3000")
    print("3. Acesse https://9b63e1766156.ngrok-free.app no navegador")
    print("4. Abra o DevTools (F12) > Application > Cookies")
    print("5. Verifique se os cookies estão sendo criados e enviados")
