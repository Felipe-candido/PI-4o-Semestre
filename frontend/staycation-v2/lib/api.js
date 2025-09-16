export const apiFetch = async (endpoint, options = {}) => {
  const defaultOptions = {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const token = document.cookie.split(';').find(c => c.trim().startsWith('access_token='));
  if (token) {
    const tokenValue = token.split('=')[1];
    defaultOptions.headers['Authorization'] = `Bearer ${tokenValue}`;
  }

  // Handle FormData bodies
  if (options.body instanceof FormData) {
    delete defaultOptions.headers['Content-Type'];
  } else if (options.body && typeof options.body === 'object') {
    options.body = JSON.stringify(options.body);
  }

  const mergedOptions = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options.headers,
    },
  };

  try {
    console.log('Sending request to:', `/api/proxy/${endpoint}`);
    console.log('Request options:', mergedOptions);

    const response = await fetch(`/api/proxy/${endpoint}`, mergedOptions);
    
    console.log('Response received:', {
      status: response.status,
      statusText: response.statusText,
      headers: Object.fromEntries(response.headers.entries())
    });

    if (!response.ok) {
      if (response.status === 401) {
        return null;
      }

      const contentType = response.headers.get("content-type");
      let errorMessage;
      
      if (contentType?.includes("application/json")) {
        const error = await response.json();
        errorMessage = error.erro || error.message || 'Request error';
      } else {
        const text = await response.text();
        errorMessage = `Server error: ${response.status} - ${text.substring(0, 100)}`;
      }
      
      throw new Error(errorMessage);
    }

    const contentType = response.headers.get("content-type");
    if (contentType?.includes("application/json")) {
      const data = await response.json();
      console.log('JSON response:', data);
      return data;
    } else {
      const text = await response.text();
      console.log('Text response:', text);
      return text;
    }

  } catch (error) {
    console.error('API request error:', error);
    throw error;
  }
};

// Helper methods for common HTTP methods
export const api = {
  get: (endpoint) => apiFetch(endpoint, { method: 'GET' }),
  
  post: (endpoint, data) => apiFetch(endpoint, {
    method: 'POST',
    body: data
  }),
  
  put: (endpoint, data) => apiFetch(endpoint, {
    method: 'PUT',
    body: data
  }),
  
  delete: (endpoint) => apiFetch(endpoint, {
    method: 'DELETE'
  })
};


// export async function apiFetch(url, options = {}) {
//   const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000';
  
//   // Se não for FormData, adiciona o header Content-Type
//   const headers = options.body instanceof FormData 
//     ? options.headers 
//     : {
//         'Content-Type': 'application/json',
//         ...options.headers,
//       };

//   try {
//     console.log('Enviando requisição para:', `${baseURL}${url}`);
//     console.log('Opções:', { ...options, headers });

//     const response = await fetch(`${baseURL}${url}`, {
//       ...options,
//       credentials: 'include',
//       headers,
//     });

//     console.log('Resposta recebida:', {
//       status: response.status,
//       statusText: response.statusText,
//       headers: Object.fromEntries(response.headers.entries())
//     });

//     if (!response.ok) {
//       if (response.status === 401) {
//         return null;
//       }

//       // Tenta obter o erro como JSON
//       const contentType = response.headers.get("content-type");
//       let errorMessage;
      
//       if (contentType && contentType.includes("application/json")) {
//         const error = await response.json();
//         errorMessage = error.erro || error.message || 'Erro na requisição';
//       } else {
//         // Se não for JSON, retorna o texto do erro
//         const text = await response.text();
//         errorMessage = `Erro no servidor: ${response.status} - ${text.substring(0, 100)}`;
//       }
      
//       throw new Error(errorMessage);
//     }

//     // Tenta parsear a resposta como JSON
//     const contentType = response.headers.get("content-type");
//     if (contentType && contentType.includes("application/json")) {
//       const data = await response.json();
//       console.log('Resposta JSON:', data);
//       return data;
//     } else {
//       const text = await response.text();
//       console.log('Resposta texto:', text);
//       return text;
//     }
//   } catch (error) {
//     console.error('Erro na requisição:', error);
//     throw error;
//   }
// }



export async function apiFetch2(url, options = {}) {
  const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000';
  
  // Define os headers, especialmente Content-Type para JSON por padrão
  const headers = options.body instanceof FormData 
    ? options.headers 
    : {
        'Content-Type': 'application/json',
        ...options.headers,
      };

  // Se houver um corpo e não for FormData, converte para JSON string
  let requestBody = options.body;
  if (requestBody && !(requestBody instanceof FormData) && typeof requestBody !== 'string') {
    requestBody = JSON.stringify(requestBody);
  }

  try {
    console.log('Enviando requisição para:', `${baseURL}${url}`);
    console.log('Opções da requisição:', { ...options, headers, body: requestBody });

    const response = await fetch(`${baseURL}${url}`, {
      ...options,
      body: requestBody, // Usa o corpo já processado
      credentials: 'include', // Essencial para enviar cookies HttpOnly
      headers,
    });

    console.log('Resposta recebida (bruta):', {
      status: response.status,
      statusText: response.statusText,
      headers: Object.fromEntries(response.headers.entries())
    });

    // **** A MUDANÇA ESSENCIAL: ****
    // A função apiFetch agora SOMENTE retorna o objeto Response bruto.
    // O chamador (PaymentPage.js) será responsável por verificar response.ok,
    // response.status, e chamar response.json() ou response.text().
    return response;

  } catch (error) {
    console.error('Erro geral na requisição apiFetch:', error);
    // Re-lança o erro para que o componente chamador possa capturá-lo
    throw error;
  }
}