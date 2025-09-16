#!/usr/bin/env python3
"""
Script para testar se os cookies estão sendo configurados corretamente com ngrok
"""

import requests
import json

def test_login_with_ngrok():
    """Testa o login via ngrok e verifica os cookies"""
    
    # URL do ngrok
    ngrok_url = "https://9b63e1766156.ngrok-free.app"
    
    # Dados de teste (substitua pelos dados reais)
    login_data = {
        "email": "teste@exemplo.com",
        "password": "senha123"
    }
    
    print("🔍 Testando login via ngrok...")
    print(f"URL: {ngrok_url}/api/cadastro/login/")
    
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
        
        print(f"Status Code: {response.status_code}")
        print(f"Response Headers:")
        for key, value in response.headers.items():
            if 'cookie' in key.lower() or 'set-cookie' in key.lower():
                print(f"  {key}: {value}")
        
        # Verificar se os cookies foram definidos corretamente
        cookies = response.cookies
        print(f"\n🍪 Cookies recebidos:")
        for cookie in cookies:
            print(f"  {cookie.name}: {cookie.value}")
            print(f"    Domain: {cookie.domain}")
            print(f"    Secure: {cookie.secure}")
            print(f"    HttpOnly: {cookie.has_nonstandard_attr('HttpOnly')}")
            print(f"    SameSite: {cookie.get('samesite', 'Not set')}")
            print()
            
    except Exception as e:
        print(f"❌ Erro na requisição: {e}")

def test_cookie_detection():
    """Testa a detecção de ngrok no backend"""
    
    print("🔍 Testando detecção de ngrok...")
    
    # Simular headers de ngrok
    ngrok_headers = {
        'HTTP_ORIGIN': 'https://9b63e1766156.ngrok-free.app',
        'HTTP_X_FORWARDED_HOST': '9b63e1766156.ngrok-free.app',
        'HTTP_REFERER': 'https://9b63e1766156.ngrok-free.app/login'
    }
    
    # Simular headers locais
    local_headers = {
        'HTTP_ORIGIN': 'http://localhost:3000',
        'HTTP_X_FORWARDED_HOST': 'localhost:3000',
        'HTTP_REFERER': 'http://localhost:3000/login'
    }
    
    def test_headers(headers, name):
        print(f"\n📋 Testando {name}:")
        for key, value in headers.items():
            print(f"  {key}: {value}")
        
        # Simular a lógica de detecção
        origin = headers.get('HTTP_ORIGIN', '')
        forwarded_host = headers.get('HTTP_X_FORWARDED_HOST', '')
        referer = headers.get('HTTP_REFERER', '')
        
        is_ngrok = any('ngrok' in url for url in [origin, forwarded_host, referer])
        
        if is_ngrok:
            config = {
                'domain': '.ngrok-free.app',
                'secure': True,
                'samesite': 'None'
            }
        else:
            config = {
                'domain': None,
                'secure': False,
                'samesite': 'Lax'
            }
        
        print(f"  Resultado: {config}")
        return config
    
    test_headers(ngrok_headers, "Headers do ngrok")
    test_headers(local_headers, "Headers locais")

if __name__ == "__main__":
    print("🚀 Iniciando testes de configuração de cookies com ngrok\n")
    
    test_cookie_detection()
    print("\n" + "="*50 + "\n")
    test_login_with_ngrok()
    
    print("\n✅ Testes concluídos!")
    print("\n📝 Para testar manualmente:")
    print("1. Acesse https://9b63e1766156.ngrok-free.app")
    print("2. Faça login")
    print("3. Verifique no DevTools > Application > Cookies se os cookies estão com domain '.ngrok-free.app'")
