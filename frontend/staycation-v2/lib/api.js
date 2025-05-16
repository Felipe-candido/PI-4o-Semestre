export async function apiFetch(url, options = {}) {
  const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000';
  
  // Se não for FormData, adiciona o header Content-Type
  const headers = options.body instanceof FormData 
    ? options.headers 
    : {
        'Content-Type': 'application/json',
        ...options.headers,
      };

  try {
    console.log('Enviando requisição para:', `${baseURL}${url}`);
    console.log('Opções:', { ...options, headers });

    const response = await fetch(`${baseURL}${url}`, {
      ...options,
      credentials: 'include',
      headers,
    });

    console.log('Resposta recebida:', {
      status: response.status,
      statusText: response.statusText,
      headers: Object.fromEntries(response.headers.entries())
    });

    if (!response.ok) {
      if (response.status === 401) {
        return null;
      }

      // Tenta obter o erro como JSON
      const contentType = response.headers.get("content-type");
      let errorMessage;
      
      if (contentType && contentType.includes("application/json")) {
        const error = await response.json();
        errorMessage = error.erro || error.message || 'Erro na requisição';
      } else {
        // Se não for JSON, retorna o texto do erro
        const text = await response.text();
        errorMessage = `Erro no servidor: ${response.status} - ${text.substring(0, 100)}`;
      }
      
      throw new Error(errorMessage);
    }

    // Tenta parsear a resposta como JSON
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      const data = await response.json();
      console.log('Resposta JSON:', data);
      return data;
    } else {
      const text = await response.text();
      console.log('Resposta texto:', text);
      return text;
    }
  } catch (error) {
    console.error('Erro na requisição:', error);
    throw error;
  }
}