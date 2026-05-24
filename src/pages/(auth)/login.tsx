import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/services/supabaseClient";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false)

  const handleGoogleLogin = async () => {
    setLoading(true)
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: 'http://localhost:5173/completar-cadastro'
      }
    })


    if (error) {
      alert('Erro ao entrar com Google: ' + error.message)
    }
    setLoading(false)
  }


  const handleLogin = () => {
    setLoading(true);
    handleVerificar()
  };

  const handleVerificar = async () => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  })

  if (error || !data) {
    alert('Email ou senha incorretos')
    setLoading(false)
    return
  }

    navigate("/home")
  
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
      Entrar
    </h1>
    <p style={{ fontSize: 14, color: '#888', marginBottom: 28 }}>
      Bem-vindo de volta 👋
    </p>

    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={inputStyle}
      />
      <input
        type="password"
        placeholder="Senha"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={inputStyle}
      />

      <p
        onClick={() => navigate('/forgotpassword')}
        style={{ fontSize: 13, color: '#1a3a8f', textAlign: 'right', cursor: 'pointer', margin: 0 }}
      >
        Esqueci minha senha
      </p>

      <button onClick={handleLogin} disabled={loading} style={btnPrimaryStyle}>
        {loading ? 'Entrando...' : 'Entrar'}
      </button>

      <button onClick={handleGoogleLogin} disabled={loading} style={btnOutlineStyle}>
        {loading ? 'Entrando...' : 'Entrar com Google'}
      </button>

      <p style={{ fontSize: 13, color: '#888', textAlign: 'center', margin: 0 }}>
        Não tem conta?{' '}
        <span
          onClick={() => navigate('/register')}
          style={{ color: '#1a3a8f', cursor: 'pointer', fontWeight: 500 }}
        >
          Cadastre-se
        </span>
      </p>
    </div>
  </div>
)
}