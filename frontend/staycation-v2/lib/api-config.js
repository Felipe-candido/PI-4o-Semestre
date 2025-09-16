// Configuração da API para garantir que os cookies sejam enviados
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://9b63e1766156.ngrok-free.app'

export const apiConfig = {
  baseURL: API_BASE_URL,
  withCredentials: true, // Importante: garante que os cookies sejam enviados
  headers: {
    'Content-Type': 'application/json',
  },
}

// Função para fazer requisições com cookies
export async function apiRequest(url, options = {}) {
  const config = {
    ...apiConfig,
    ...options,
    headers: {
      ...apiConfig.headers,
      ...options.headers,
    },
  }

  console.log('🌐 Fazendo requisição para:', `${config.baseURL}${url}`)
  console.log('🍪 Configuração:', { withCredentials: config.withCredentials })

  try {
    const response = await fetch(`${config.baseURL}${url}`, config)
    
    console.log('📡 Resposta recebida:', {
      status: response.status,
      statusText: response.statusText,
      headers: Object.fromEntries(response.headers.entries())
    })
    
    return response
  } catch (error) {
    console.error('❌ Erro na requisição:', error)
    throw error
  }
}

// Função específica para login
export async function login(email, password) {
  return apiRequest('/api/cadastro/login/', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  })
}

// Função específica para buscar dados do usuário
export async function getMe() {
  return apiRequest('/api/me/', {
    method: 'GET',
  })
}
