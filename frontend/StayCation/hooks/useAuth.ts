import { useState, useEffect } from 'react'
import api from '@/hooks/api'
import { useRouter } from 'next/router'

interface User {
      id: number;
      email: string;
      nome: string;
}

export const useAuth = () => {
      const [user, setUser] = useState<User | null>(null)
      const [loading, setLoading] = useState(true)
      const router = useRouter()
    
      const login = async (email: string, password: string): Promise<User> => {
        try {
          const response = await api.post<User>('/api/login/', { email, password })
          setUser(response.data)
          return response.data
        } catch (error) {
          throw error
        }
      }
    
      const logout = async () => {
        try {
          await api.post('/api/logout/')
          setUser(null)
          document.cookie = 'access_token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;'
          document.cookie = 'refresh_token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;'
          router.push('/')
        } catch (error) {
          console.error('Erro no logout:', error)
          throw error
        }
      }
    
      const checkAuth = async () => {
        try {
          const response = await fetch('http://localhost:8000/api/me/', {
            credentials: 'include'
          });
          
          if (!response.ok) {
            throw new Error('Não autenticado');
          }
          
          const userData = await response.json();
          setUser(userData);
        } catch (error) {
          setUser(null);
        } finally {
          setLoading(false);
        }
      }
    
      useEffect(() => {
        checkAuth()
      }, [])
    
      return { 
        user, 
        loading, 
        login, 
        logout,
        checkAuth // Exportando checkAuth para uso externo
      }
    }