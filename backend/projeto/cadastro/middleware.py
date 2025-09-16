"""
Middleware personalizado para lidar com cookies em ambiente de proxy/ngrok
"""

class CookieProxyMiddleware:
    """
    Middleware para garantir que cookies sejam enviados corretamente
    quando usando proxy (Next.js) com ngrok
    """
    
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        # Processar a requisição
        response = self.get_response(request)
        
        # Se a requisição vem do ngrok, ajustar cookies
        origin = request.META.get('HTTP_ORIGIN', '')
        if 'ngrok' in origin.lower():
            # Garantir que cookies sejam enviados com as configurações corretas
            if hasattr(response, 'cookies'):
                for cookie in response.cookies.values():
                    # Ajustar configurações do cookie para funcionar com proxy
                    if cookie.get('domain') == '.ngrok-free.app':
                        cookie['domain'] = None
                    if not cookie.get('samesite'):
                        cookie['samesite'] = 'None'
                    if not cookie.get('secure'):
                        cookie['secure'] = True
        
        return response
