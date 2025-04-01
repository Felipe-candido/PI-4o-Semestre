export async function apiFetch(url, options = {}) {
  const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000';
  try {
    const response = await fetch(`${baseURL}${url}`, {
      ...options,
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      if (response.status === 401) {
        return null;
      }
      const error = await response.json();
      throw new Error(error.message || 'Erro na requisição');
    }

    return response.json();
  } catch (error) {
    console.error('Erro na requisição:', error);
    return null; // Retorna null para qualquer erro, incluindo 401
  }
}