#!/usr/bin/env python3
"""
Script simples para testar cookies com ngrok
"""

import requests
import json

def test_cookies():
    """Testa se os cookies estão sendo criados corretamente"""
    
    # URL do ngrok
    ngrok_url = "https://9b63e1766156.ngrok-free.app"
    
    print("🔍 Testando criação de cookies...")
    print(f"URL: {ngrok_url}")
    
    # Dados de teste (substitua pelos dados reais)
    login_data = {
        "email": "teste@exemplo.com",  # Substitua por um email válido
        "password": "senha123"         # Substitua por uma senha válida
    }
    
    try:
        # Fazer requisição de login
        response = requests.post(
            f"{ngrok_url}/api/cadastro/login/",
            json=login_data,
            headers={
                'Content-Type': 'application/json',
                'Origin': ngrok_url,
                'X-Forwarded-Host': '9b63e1766156.ngrok-free.app',
                'X-Forwarded-Proto': 'https'
            }
        )
        
        print(f"\n📊 Status Code: {response.status_code}")
        print(f"📋 Response Headers:")
        
        # Verificar headers de resposta
        set_cookie_headers = []
        for key, value in response.headers.items():
            if 'set-cookie' in key.lower():
                set_cookie_headers.append(f"{key}: {value}")
                print(f"  {key}: {value}")
        
        if not set_cookie_headers:
            print("❌ Nenhum cookie foi definido!")
        else:
            print(f"✅ {len(set_cookie_headers)} cookie(s) definido(s)")
            
        # Verificar cookies recebidos
        cookies = response.cookies
        print(f"\n🍪 Cookies recebidos ({len(cookies)}):")
        for cookie in cookies:
            print(f"  Nome: {cookie.name}")
            print(f"  Valor: {cookie.value[:20]}...")
            print(f"  Domain: {cookie.domain}")
            print(f"  Secure: {cookie.secure}")
            print(f"  HttpOnly: {cookie.has_nonstandard_attr('HttpOnly')}")
            print(f"  SameSite: {cookie.get('samesite', 'Not set')}")
            print(f"  Path: {cookie.path}")
            print()
            
        # Testar se o cookie está sendo enviado de volta
        if cookies:
            print("🔄 Testando envio do cookie de volta...")
            test_response = requests.get(
                f"{ngrok_url}/api/me/",
                cookies=cookies,
                headers={
                    'Origin': ngrok_url,
                    'X-Forwarded-Host': '9b63e1766156.ngrok-free.app',
                    'X-Forwarded-Proto': 'https'
                }
            )
            print(f"Status da requisição /api/me/: {test_response.status_code}")
            if test_response.status_code == 200:
                print("✅ Autenticação funcionando!")
            else:
                print("❌ Falha na autenticação")
                print(f"Resposta: {test_response.text}")
            
    except Exception as e:
        print(f"❌ Erro na requisição: {e}")

if __name__ == "__main__":
    print("🚀 Teste simples de cookies com ngrok\n")
    test_cookies()
