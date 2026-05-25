import { useState } from 'react'
import { supabase } from '../../services/supabaseClient'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { CoresVizzo } from '../../theme' // Puxa o arquivo de cores oficial

type MoradorForm = {
  nome: string
  cpf: string
  telefone: string
  email: string
  senha: string
}

// --- LAYOUT SURPREENDENTE EM DOIS PAINÉIS (PADRÃO VIZZO) ---
const ScreenContainer = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
  background-color: ${CoresVizzo.background};
  overflow: hidden;
`;

// LADO ESQUERDO: Painel institucional da marca
const VisualSide = styled.div`
  flex: 1;
  background: linear-gradient(135deg, #1a1d1d 0%, #0f1111 100%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 80px;
  position: relative;
  border-right: 1px solid ${CoresVizzo.inputBorder};

  @media (max-width: 900px) {
    display: none; /* Mantém a responsividade em telas menores */
  }

  &::before {
    content: '';
    position: absolute;
    bottom: -10%;
    right: -10%;
    width: 50%;
    height: 50%;
    background: radial-gradient(circle, rgba(255, 140, 0, 0.05) 0%, transparent 70%);
    z-index: 0;
  }
`;

const BrandTitle = styled.h1`
  font-size: 3.5rem;
  font-weight: 900;
  color: white;
  letter-spacing: -2px;
  z-index: 1;

  span {
    color: ${CoresVizzo.brandOrange};
  }
`;

const BrandDescription = styled.p`
  color: ${CoresVizzo.textSecondary};
  font-size: 1.15rem;
  line-height: 1.6;
  max-width: 460px;
  margin-top: 16px;
  z-index: 1;
`;

// LADO DIREITO: Área do Formulário de Cadastro
const FormSide = styled.div`
  width: 550px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${CoresVizzo.background};
  padding: 40px;

  @media (max-width: 900px) {
    width: 100%;
  }
`;

const FormCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  background-color: ${CoresVizzo.cardBackground};
  padding: 35px 40px;
  width: 100%;
  max-width: 440px;
  border-radius: 24px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
  border-top: 6px solid ${CoresVizzo.brandOrange}; /* Linha Laranja Vizzo */
`;

const HeaderContainer = styled.div`
  margin-bottom: 8px;
  
  h2 {
    font-size: 1.8rem;
    font-weight: 700;
    color: white;
  }

  p {
    color: ${CoresVizzo.textSecondary};
    font-size: 0.9rem;
    margin-top: 4px;
  }
`;

const InputFormGroup = styled.div`
  background-color: ${CoresVizzo.inputBackground}; 
  border: 1.5px solid ${CoresVizzo.inputBorder};
  border-radius: 12px;
  height: 48px;
  display: flex;
  align-items: center;
  padding: 0 16px;
  transition: all 0.2s ease-in-out;

  &:focus-within {
    border: 1.5px solid ${CoresVizzo.brandBlue};
    box-shadow: 0 0 10px rgba(45, 121, 243, 0.25);
  }
`;

const InputField = styled.input`
  background-color: transparent;
  border: none;
  width: 100%;
  height: 100%;
  color: white; 
  font-size: 14px;

  &:focus {
    outline: none;
  }

  &::placeholder {
    color: #5c5f66;
  }
`;

const ButtonSubmit = styled.button`
  margin-top: 10px;
  background-color: ${CoresVizzo.brandBlue};
  border: none;
  color: white;
  font-size: 15px;
  font-weight: 600;
  border-radius: 12px;
  height: 48px;
  width: 100%;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover:not(:disabled) {
    background-color: ${CoresVizzo.blueHover}; 
    box-shadow: 0 4px 15px rgba(45, 121, 243, 0.4);
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const ButtonGoogle = styled.button`
  background-color: ${CoresVizzo.inputBackground};
  border: 1.5px solid ${CoresVizzo.inputBorder};
  color: white;
  font-size: 14px;
  font-weight: 600;
  border-radius: 12px;
  height: 48px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover:not(:disabled) {
    border-color: ${CoresVizzo.brandOrange};
    background-color: #2a2d2d;
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  svg {
    flex-shrink: 0;
  }
`;

const DividerLine = styled.p`
  display: flex;
  align-items: center;
  color: #5b5e68;
  font-size: 13px;
  margin: 8px 0;

  &::before, &::after {
    content: "";
    flex: 1;
    height: 1px;
    background: ${CoresVizzo.inputBorder};
    margin: 0 12px;
  }
`;

const TextParagraph = styled.p`
  text-align: center;
  color: ${CoresVizzo.textSecondary};
  font-size: 14px;
  margin-top: 8px;
`;

const BlueSpan = styled.span`
  color: ${CoresVizzo.brandBlue}; 
  font-weight: 600;
  cursor: pointer;
  transition: color 0.2s;

  &:hover {
    color: ${CoresVizzo.brandOrange}; 
    text-decoration: underline;
  }
`;

// --- COMPONENTE FINAL ---
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

    const { error } = await supabase.auth.signUp({
      email: form.email,
      password: form.senha
    })

    if (error) {
      alert(error.message)
      setLoading(false)
      return
    }

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

  return (
    <ScreenContainer>
      {/* Painel Institucional Vizzo (Esquerda) */}
      <VisualSide>
        <BrandTitle>VIZZO<span>.</span></BrandTitle>
        <BrandDescription>
          Faça parte da transformação residencial. Gerencie acessos, agende serviços e tenha o controle do seu condomínio na palma da mão.
        </BrandDescription>
      </VisualSide>

      {/* Formulário de Cadastro Fluido (Direita) */}
      <FormSide>
        <FormCard>
          <HeaderContainer>
            <h2>Criar Conta</h2>
            <p>Cadastre-se para acessar o ecossistema Vizzo</p>
          </HeaderContainer>

          <InputFormGroup>
            <InputField
              name="nome"
              placeholder="Nome completo"
              value={form.nome}
              onChange={handleChange}
            />
          </InputFormGroup>

          <InputFormGroup>
            <InputField
              name="cpf"
              placeholder="CPF"
              value={form.cpf}
              onChange={handleChange}
            />
          </InputFormGroup>

          <InputFormGroup>
            <InputField
              name="telefone"
              placeholder="Telefone"
              value={form.telefone}
              onChange={handleChange}
            />
          </InputFormGroup>

          <InputFormGroup>
            <InputField
              name="email"
              placeholder="E-mail"
              value={form.email}
              onChange={handleChange}
            />
          </InputFormGroup>

          <InputFormGroup>
            <InputField
              name="senha"
              type="password"
              placeholder="Senha de acesso"
              value={form.senha}
              onChange={handleChange}
            />
          </InputFormGroup>

          <ButtonSubmit onClick={handleCadastro} disabled={loading}>
            {loading ? 'Criando Conta...' : 'Finalizar Cadastro'}
          </ButtonSubmit>

          <DividerLine>Ou conecte via</DividerLine>

          <ButtonGoogle onClick={handleGoogleLogin} disabled={loadingGoogle}>
            <svg version="1.1" width="18" height="18" viewBox="0 0 512 512">
              <path style={{ fill: '#FBBB00' }} d="M113.47,309.408L95.648,375.94l-65.139,1.378C11.042,341.211,0,299.9,0,256c0-42.451,10.324-82.483,28.624-117.732h0.014l57.992,10.632l25.404,57.644c-5.317,15.501-8.215,32.141-8.215,49.456C103.821,274.792,107.225,292.797,113.47,309.408z" />
              <path style={{ fill: '#518EF8' }} d="M507.527,208.176C510.467,223.662,512,239.655,512,256c0,18.328-1.927,36.206-5.598,53.451c-12.462,58.683-45.025,109.925-90.134,146.187l-0.014-0.014l-73.044-3.727l-10.338-64.535c29.932-17.554,53.324-45.025,65.646-77.911h-136.89V208.176h138.887L507.527,208.176z" />
              <path style={{ fill: '#28B446' }} d="M416.253,455.624l0.014,0.014C372.396,490.901,316.666,512,256,512c-97.491,0-182.252-54.491-225.491-134.681l82.961-67.91c21.619,57.698,77.278,98.771,142.53,98.771c28.047,0,54.323-7.582,76.87-20.818L416.253,455.624z" />
              <path style={{ fill: '#F14336' }} d="M419.404,58.936l-82.933,67.896c-23.335-14.586-50.919-23.012-80.471-23.012c-66.729,0-123.429,42.957-143.965,102.724l-83.397-68.276h-0.014C71.23,56.123,157.06,0,256,0C318.115,0,375.068,22.126,419.404,58.936z" />
            </svg>
            {loadingGoogle ? 'Conectando...' : 'Cadastrar com o Google'}
          </ButtonGoogle>

          <TextParagraph>
            Já possui uma conta? <BlueSpan onClick={() => navigate('/login')}>Fazer Login</BlueSpan>
          </TextParagraph>
        </FormCard>
      </FormSide>
    </ScreenContainer>
  )
}