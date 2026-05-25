import { useState } from "react";
import { supabase } from "@services/supabaseClient";

export default function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

const handleConfirmarEmail = async () => {
    setLoading(true)
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: 'http://localhost:5173/redefinir-senha'
    })

    if (error) {
        alert('Email não encontrado')
        return
    }
    alert('Email de recuperação enviado com sucesso')
    setLoading(false)
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
      Recuperar senha
    </h1>
    <p style={{ fontSize: 14, color: '#888', marginBottom: 28 }}>
      Informe seu email para recuperar sua senha.
    </p>

    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <input
        type="email"
        placeholder="seu@email.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={inputStyle}
      />

      <button onClick={handleConfirmarEmail} disabled={loading} style={btnPrimaryStyle}>
        {loading ? 'Enviando...' : 'Recuperar senha'}
      </button>

      {email && (
        <p style={{ fontSize: 13, color: '#888', textAlign: 'center', margin: 0 }}>
          Um email de recuperação foi enviado para{' '}
          <span style={{ color: '#1a3a8f', fontWeight: 500 }}>{email}</span>
        </p>
      )}
    </div>
  </div>
)

}