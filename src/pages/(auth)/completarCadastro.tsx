import { useState, useEffect } from 'react'
import { supabase } from '@/services/supabaseClient'
import { useNavigate } from 'react-router-dom'
import type { User } from '@supabase/supabase-js'

export default function CompletarCadastro() {
  const navigate = useNavigate()
  const [cpf, setCpf] = useState('')
  const [telefone, setTelefone] = useState('')
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState<User|null>(null)

  useEffect(() => {
    const pegarUsuario = async () => {
      const { data: { user } } = await supabase.auth.getUser()

      if (!user) {
        navigate('/')
        return
      }

      // verifica se já completou o cadastro
      const { data } = await supabase
        .from('users')
        .select('email')
        .eq('email', user.email)
        .maybeSingle()

      if (data) {
        // já tem cadastro → vai para home
        navigate('/home')
        return
      }

      setUser(user)
    }

    pegarUsuario()
  }, [navigate])

  const handleCompletar = async () => {
    setLoading(true)

    const { error } = await supabase
      .from('users')
      .insert({
        nome: user?.user_metadata.full_name,
        email: user?.email,
        cpf,
        telefone
      })

    setLoading(false)

    if (error) {
      alert(error.message)
      return
    }

    navigate('/home')
  }

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
      Complete seu cadastro
    </h1>
    <p style={{ fontSize: 14, color: '#888', marginBottom: 28 }}>
      Só falta mais um pouco! 👋
    </p>

    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <input
        type="text"
        placeholder="CPF"
        value={cpf}
        onChange={(e) => setCpf(e.target.value)}
        style={inputStyle}
      />
      <input
        type="text"
        placeholder="Telefone"
        value={telefone}
        onChange={(e) => setTelefone(e.target.value)}
        style={inputStyle}
      />

      <button onClick={handleCompletar} disabled={loading} style={btnPrimaryStyle}>
        {loading ? 'Salvando...' : 'Completar cadastro'}
      </button>
    </div>
  </div>
)
}