import { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { CoresVizzo } from '../../theme';
import { supabase } from '../../services/supabaseClient'; // Garanta a importação do seu cliente supabase

const ScreenContainer = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
  background-color: ${CoresVizzo.background};
  overflow: hidden;
`;

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
    display: none;
  }
`;

const BrandTitle = styled.h1`
  font-size: 3.5rem;
  font-weight: 900;
  color: white;
  letter-spacing: -2px;
  span { color: ${CoresVizzo.brandOrange}; }
`;

const BrandDescription = styled.p`
  color: ${CoresVizzo.textSecondary};
  font-size: 1.15rem;
  line-height: 1.6;
  max-width: 460px;
  margin-top: 16px;
`;

const FormSide = styled.div`
  width: 550px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${CoresVizzo.background};
  padding: 40px;
  @media (max-width: 900px) { width: 100%; }
`;

const FormCard = styled.form`
  display: flex;
  flex-direction: column;
  gap: 14px;
  background-color: ${CoresVizzo.cardBackground};
  padding: 40px;
  width: 100%;
  max-width: 420px;
  border-radius: 24px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
  border-top: 6px solid ${CoresVizzo.brandOrange};
`;

const HeaderContainer = styled.div`
  margin-bottom: 6px;
  h2 { font-size: 1.8rem; font-weight: 700; color: white; }
  p { color: ${CoresVizzo.textSecondary}; font-size: 0.9rem; margin-top: 4px; }
`;

const FieldGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const Label = styled.label`
  color: ${CoresVizzo.textLabel};
  font-weight: 600;
  font-size: 13px;
`;

const InputFormGroup = styled.div`
  background-color: ${CoresVizzo.inputBackground}; 
  border: 1.5px solid ${CoresVizzo.inputBorder};
  border-radius: 12px;
  height: 50px;
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
  font-size: 15px;
  &:focus { outline: none; }
`;

const ForgotPasswordText = styled.p`
  font-size: 13px;
  color: ${CoresVizzo.brandBlue};
  text-align: right;
  cursor: pointer;
  margin: 0;
  font-weight: 500;
  &:hover {
    color: ${CoresVizzo.brandOrange};
    text-decoration: underline;
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
  height: 50px;
  width: 100%;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover:not(:disabled) {
    background-color: ${CoresVizzo.blueHover}; 
    box-shadow: 0 4px 15px rgba(45, 121, 243, 0.4);
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
  height: 50px;
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
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const DividerLine = styled.p`
  display: flex;
  align-items: center;
  color: #5b5e68;
  font-size: 12px;
  margin: 6px 0;
  &::before, &::after { content: ""; flex: 1; height: 1px; background: ${CoresVizzo.inputBorder}; margin: 0 12px; }
`;

const TextParagraph = styled.p`
  text-align: center;
  color: ${CoresVizzo.textSecondary};
  font-size: 14px;
`;

const BlueSpan = styled.span`
  color: ${CoresVizzo.brandBlue}; 
  font-weight: 600;
  cursor: pointer;
  &:hover { color: ${CoresVizzo.brandOrange}; text-decoration: underline; }
`;

export default function Login() {
  const navigate = useNavigate();
  
  // Estados integrados do código antigo
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // Função do Google atualizada com o estado de loading
  const handleGoogleLogin = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: 'http://localhost:5173/completar-cadastro' }
    });
    
    if (error) {
      alert('Erro ao entrar com Google: ' + error.message);
    }
    setLoading(false);
  };

  // Função de Login por E-mail/Senha integrada
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault(); // Evita o reload da página
    setLoading(true);

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error || !data) {
      alert('Email ou senha incorretos');
      setLoading(false);
      return;
    }

    setLoading(false);
    navigate("/home");
  };

  return (
    <ScreenContainer>
      <VisualSide>
        <BrandTitle>VIZZO<span>.</span></BrandTitle>
        <BrandDescription>
          Conectando moradores, otimizando a administração e simplificando o ecossistema do seu condomínio em um único lugar.
        </BrandDescription>
      </VisualSide>

      <FormSide>
        <FormCard onSubmit={handleLogin}>
          <HeaderContainer>
            <h2>Seja bem-vindo</h2>
            <p>Insira seus dados para acessar a plataforma</p>
          </HeaderContainer>

          <FieldGroup>
            <Label>E-mail</Label>
            <InputFormGroup>
              <InputField 
                type="email" 
                placeholder="Entre com seu melhor e-mail" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </InputFormGroup>
          </FieldGroup>
          
          <FieldGroup>
            <Label>Senha</Label>
            <InputFormGroup>
              <InputField 
                type="password" 
                placeholder="Entre com sua senha" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </InputFormGroup>
          </FieldGroup>

          {/* Link Esqueci minha senha recuperado do código original */}
          <ForgotPasswordText onClick={() => navigate('/forgotpassword')}>
            Esqueci minha senha
          </ForgotPasswordText>

          <ButtonSubmit type="submit" disabled={loading}>
            {loading ? 'Entrando...' : 'Entrar no Sistema'}
          </ButtonSubmit>

          <DividerLine>Ou</DividerLine>

          <ButtonGoogle type="button" onClick={handleGoogleLogin} disabled={loading}>
            <svg version="1.1" width="16" height="16" viewBox="0 0 512 512">
              <path style={{ fill: '#FBBB00' }} d="M113.47,309.408L95.648,375.94l-65.139,1.378C11.042,341.211,0,299.9,0,256c0-42.451,10.324-82.483,28.624-117.732h0.014l57.992,10.632l25.404,57.644c-5.317,15.501-8.215,32.141-8.215,49.456C103.821,274.792,107.225,292.797,113.47,309.408z" />
              <path style={{ fill: '#518EF8' }} d="M507.527,208.176C510.467,223.662,512,239.655,512,256c0,18.328-1.927,36.206-5.598,53.451c-12.462,58.683-45.025,109.925-90.134,146.187l-0.014-0.014l-73.044-3.727l-10.338-64.535c29.932-17.554,53.324-45.025,65.646-77.911h-136.89V208.176h138.887L507.527,208.176z" />
              <path style={{ fill: '#28B446' }} d="M416.253,455.624l0.014,0.014C372.396,490.901,316.666,512,256,512c-97.491,0-182.252-54.491-225.491-134.681l82.961-67.91c21.619,57.698,77.278,98.771,142.53,98.771c28.047,0,54.323-7.582,76.87-20.818L416.253,455.624z" />
              <path style={{ fill: '#F14336' }} d="M419.404,58.936l-82.933,67.896c-23.335-14.586-50.919-23.012-80.471-23.012c-66.729,0-123.429,42.957-143.965,102.724l-83.397-68.276h-0.014C71.23,56.123,157.06,0,256,0C318.115,0,375.068,22.126,419.404,58.936z" />
            </svg>
            {loading ? 'Entrando...' : 'Entrar com o Google'}
          </ButtonGoogle>

          <TextParagraph>
            Não tem uma conta? <BlueSpan onClick={() => navigate('/register')}>Cadastre-se</BlueSpan>
          </TextParagraph>
        </FormCard>
      </FormSide>
    </ScreenContainer>
  );
}