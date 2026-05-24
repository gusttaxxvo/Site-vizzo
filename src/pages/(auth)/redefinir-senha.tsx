import { useState, useEffect } from 'react'
import { supabase } from '@/services/supabaseClient'
import { useNavigate } from 'react-router-dom'

export default function RedefinirSenha() {
  const [password, setPassword] = useState('')
  const [confirmar, setConfirmar] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const [valido, setValido] = useState(false)

  useEffect(() => {
    const hash = window.location.hash

    if (hash) {
      const params = new URLSearchParams(hash.replace('#', ''))
      const accessToken = params.get('access_token')
      const refreshToken = params.get('refresh_token')

      if (accessToken) {
        supabase.auth.setSession({
          access_token: accessToken,
          refresh_token: refreshToken ?? ''
        })
      }
    }


    // Verifica se o usuário chegou nessa página por meio do link de recuperação de senha
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'PASSWORD_RECOVERY') {
        setValido(true)
      }
    })
    return () => subscription.unsubscribe()
  }, [])

  async function handleRedefinir() {
    if (password !== confirmar) {
      alert('As senhas não coincidem')
      return
    }

    setLoading(true)

    const { error } = await supabase.auth.updateUser({
      password
    })

    setLoading(false)

    if (error) {
      alert(error.message)
      return
    }

    alert('Senha redefinida com sucesso!')
    navigate('/login')
  }

  if (!valido) return <p>Verificando...</p>

  const inputStyle: React.CSSProperties = {
  padding: '10px 14px',
  borderRadius: 8,
  border: '1px solid #ddd',
  fontSize: 14,
  outline: 'none',
  width: '100%',
  boxSizing: 'border-box',
}

const btnPrimaryStyle: React.CSSProperties = {
  padding: '11px',
  borderRadius: 8,
  background: '#1a3a8f',
  color: 'white',
  border: 'none',
  fontSize: 14,
  fontWeight: 500,
  cursor: 'pointer',
}

return (
  <div style={{ maxWidth: 400, margin: '60px auto', padding: '0 20px' }}>
    <h1 style={{ fontSize: 24, fontWeight: 600, color: '#1a3a8f', marginBottom: 4 }}>
      Redefinir senha
    </h1>
    <p style={{ fontSize: 14, color: '#888', marginBottom: 28 }}>
      Digite sua nova senha abaixo
    </p>

    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <input
        type="password"
        placeholder="Nova senha"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={inputStyle}
      />
      <input
        type="password"
        placeholder="Confirmar senha"
        value={confirmar}
        onChange={(e) => setConfirmar(e.target.value)}
        style={inputStyle}
      />
      <button
        onClick={handleRedefinir}
        disabled={loading}
        style={btnPrimaryStyle}
      >
        {loading ? 'Salvando...' : 'Salvar'}
      </button>
    </div>
  </div>
)


}