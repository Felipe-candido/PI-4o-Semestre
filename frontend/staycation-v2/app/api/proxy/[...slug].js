// app/api/proxy/[...slug]/route.js

import { NextResponse } from 'next/server';

// O URL do seu backend Django
const DJANGO_API_URL = 'http://127.0.0.1:8000';

async function handler(request, { params }) {
  // 1. Remonta a URL de destino
  const destinationPath = `/api/${params.slug.join('/')}`;
  const destinationUrl = new URL(destinationPath, DJANGO_API_URL);

  // Anexa os query params da requisição original (ex: ?page=2)
  destinationUrl.search = request.nextUrl.search;

  console.log(`[API PROXY] Encaminhando para: ${destinationUrl.href}`);

  // 2. Prepara os cabeçalhos para o Django
  const headers = new Headers(request.headers);
  const originalHost = request.headers.get('host');

  // O ponto crucial: Define os cabeçalhos para que o Django veja o host do ngrok
  headers.set('Host', new URL(DJANGO_API_URL).host); // Define o host que o Django espera (localhost:8000)
  headers.set('X-Forwarded-Host', originalHost); // Envia o host original (do ngrok)

  try {
    // 3. Faz a requisição para o Django, encaminhando tudo
    const proxyResponse = await fetch(destinationUrl, {
      method: request.method,
      headers: headers,
      body: request.body, // Encaminha o corpo da requisição como um stream
      redirect: 'manual',
      // 'duplex: half' é necessário em algumas versões do Node.js para encaminhar o corpo da requisição corretamente
      // @ts-ignore
      duplex: 'half',
    });

    // 4. Retorna a resposta do Django diretamente para o navegador
    // Isso garante que status, corpo e cabeçalhos (incluindo Set-Cookie) sejam repassados
    return new Response(proxyResponse.body, {
      status: proxyResponse.status,
      statusText: proxyResponse.statusText,
      headers: proxyResponse.headers,
    });
    
  } catch (error) {
    console.error('[API PROXY] Error:', error);
    return NextResponse.json(
      { error: 'Erro de conexão com o serviço de backend.' },
      { status: 502 } // 502 Bad Gateway é um status apropriado para erro de proxy
    );
  }
}

// Exportamos a função handler para todos os métodos HTTP que queremos suportar
export { handler as GET };
export { handler as POST };
export { handler as PUT };
export { handler as PATCH };
export { handler as DELETE };