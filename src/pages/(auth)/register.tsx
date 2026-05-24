import { useState } from 'react'
import { supabase } from '../../services/supabaseClient'
import { useNavigate } from 'react-router-dom'

type MoradorForm = {
  nome: string
  cpf: string
  telefone: string
  email: string
  senha: string
}

export default function CadastroMorador() {
  const navigate = useNavigate()

  const [form, setForm] = useState<MoradorForm>({
    nome: '',
    cpf: '',
    telefone: '',
    email: '',
    senha: ''
  })

  const [loading, setLoading] = useState(false)
  const [loadingGoogle, setLoadingGoogle] = useState(false)

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }
  // login com o google
  const handleGoogleLogin = async () => {
    console.log('Entrando com Google...')
    setLoadingGoogle(true)
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: 'http://localhost:5173/completar-cadastro'
      }
    })
    if (error) {
      alert('Erro ao entrar com Google: ' + error.message)
      setLoadingGoogle(false)
    }
  }

  async function handleCadastro() {
    setLoading(true)

    // 1. cria usuário no Auth (email + senha)
    const { error } = await supabase.auth.signUp({
      email: form.email,
      password: form.senha
    })

    if (error) {
      alert(error.message)
      setLoading(false)
      return
    }

    // 2. salva dados na tabela users (id, nome, cpf, telefone, email)
    const { error: insertError } = await supabase
      .from('users')
      .insert({
        nome: form.nome,
        cpf: form.cpf,
        telefone: form.telefone,
        email: form.email,
      })

    setLoading(false)

    if (insertError) {
      alert(insertError.message)
      return
    }

    alert('Morador cadastrado com sucesso!')
    navigate('/login')
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

const btnOutlineStyle: React.CSSProperties = {
  padding: '11px',
  borderRadius: 8,
  background: 'transparent',
  color: '#1a3a8f',
  border: '1px solid #1a3a8f',
  fontSize: 14,
  cursor: 'pointer',
}

return (
  <div style={{ maxWidth: 400, margin: '60px auto', padding: '0 20px' }}>
    <h1 style={{ fontSize: 24, fontWeight: 600, color: '#1a3a8f', marginBottom: 4 }}>
      Cadastro
    </h1>
    <p style={{ fontSize: 14, color: '#888', marginBottom: 28 }}>
      Crie sua conta no Vizzo
    </p>

    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <input
        name="nome"
        placeholder="Nome completo"
        value={form.nome}
        onChange={handleChange}
        style={inputStyle}
      />
      <input
        name="cpf"
        placeholder="CPF"
        value={form.cpf}
        onChange={handleChange}
        style={inputStyle}
      />
      <input
        name="telefone"
        placeholder="Telefone"
        value={form.telefone}
        onChange={handleChange}
        style={inputStyle}
      />
      <input
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        style={inputStyle}
      />
      <input
        name="senha"
        type="password"
        placeholder="Senha"
        value={form.senha}
        onChange={handleChange}
        style={inputStyle}
      />

      <button
        onClick={handleCadastro}
        disabled={loading}
        style={btnPrimaryStyle}
      >
        {loading ? 'Criando...' : 'Cadastrar'}
      </button>

      <button
        onClick={handleGoogleLogin}
        disabled={loadingGoogle}
        style={btnOutlineStyle}
      >
        {loadingGoogle ? 'Entrando...' : 'Entrar com Google'}
      </button>
    </div>
  </div>
)
}