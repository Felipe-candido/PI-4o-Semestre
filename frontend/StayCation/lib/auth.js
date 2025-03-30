import Cookies from 'js-cookie'

export const login = async (email, password) => {
  const res = await fetch('http://localhost:8000/api/login/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  })
  
  if (res.ok) {
    const data = await res.json()
    // Armazena tokens em cookies seguros
    Cookies.set('access_token', data.access, { 
      expires: 1/96, // 15 minutos (igual ao backend)
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict'
    })
    Cookies.set('refresh_token', data.refresh, {
      expires: 7, // 7 dias
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict'
    })
    return data.user
  }
  throw await res.json()
}