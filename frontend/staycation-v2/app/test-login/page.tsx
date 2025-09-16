'use client'

import { useState } from 'react'
import { login, getMe } from '@/lib/api-config'

export default function TestLoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setResult('')

    try {
      console.log('🔐 Iniciando login...')
      
      const loginResponse = await login(email, password)
      const loginData = await loginResponse.json()
      
      console.log('✅ Login response:', loginData)
      setResult(`Login: ${loginResponse.status} - ${JSON.stringify(loginData)}`)

      if (loginResponse.ok) {
        // Aguardar um pouco e testar /api/me/
        setTimeout(async () => {
          try {
            console.log('👤 Testando /api/me/...')
            const meResponse = await getMe()
            const meData = await meResponse.json()
            
            console.log('✅ Me response:', meData)
            setResult(prev => prev + `\n\nMe: ${meResponse.status} - ${JSON.stringify(meData)}`)
          } catch (error) {
            console.error('❌ Erro no /api/me/:', error)
            setResult(prev => prev + `\n\nErro no /api/me/: ${error}`)
          }
        }, 1000)
      }
    } catch (error) {
      console.error('❌ Erro no login:', error)
      setResult(`Erro: ${error}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-6">Teste de Login com Cookies</h1>
        
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Senha
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
          >
            {loading ? 'Testando...' : 'Testar Login'}
          </button>
        </form>
        
        {result && (
          <div className="mt-6">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Resultado:</h3>
            <pre className="bg-gray-100 p-4 rounded-md text-sm overflow-auto">
              {result}
            </pre>
          </div>
        )}
        
        <div className="mt-6 text-sm text-gray-600">
          <p><strong>URL da API:</strong> {process.env.NEXT_PUBLIC_API_URL || 'https://9b63e1766156.ngrok-free.app'}</p>
          <p><strong>Debug:</strong> Abra o DevTools (F12) para ver os logs detalhados</p>
        </div>
      </div>
    </div>
  )
}
