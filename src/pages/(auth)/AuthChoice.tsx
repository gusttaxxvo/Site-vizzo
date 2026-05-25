import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { supabase } from '../../services/supabaseClient'; // Ajuste o caminho se necessário

// --- COMPONENTES ESTILIZADOS ---

const Container = styled.div`
  position: relative;
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  background-color: #0f1111;
`;

const VideoBackground = styled.video`
  position: absolute;
  top: 50%;
  left: 50%;
  min-width: 100%;
  min-height: 100%;
  width: auto;
  height: auto;
  z-index: -2;
  transform: translate(-50%, -50%);
  object-fit: cover;
  pointer-events: none; /* Garante que cliques passem direto para o card */
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(180deg, rgba(15, 17, 17, 0.4) 0%, #0f1111 95%);
  z-index: -1;
`;

const Card = styled.div`
  background: rgba(26, 29, 29, 0.75);
  backdrop-filter: blur(16px);
  padding: 45px 35px;
  border-radius: 24px;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.6);
  border-top: 6px solid #ff8c00; /* Linha Laranja Vizzo */
  text-align: center;
  max-width: 420px;
  width: 90%;
  z-index: 1;
`;

const Title = styled.h1`
  color: #ffffff;
  font-size: 2.2rem;
  font-weight: 800;
  letter-spacing: -1.5px;
  margin-bottom: 8px;

  span {
    color: #ff8c00;
  }
`;

const Subtitle = styled.p`
  color: #b0b0b0;
  font-size: 0.95rem;
  line-height: 1.5;
  margin-bottom: 30px;
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

const PrimaryButton = styled.button`
  height: 52px;
  border: none;
  border-radius: 12px;
  background-color: #2d79f3;
  color: white;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: #1a5bbd;
    box-shadow: 0 4px 15px rgba(45, 121, 243, 0.4);
    transform: translateY(-1px);
  }
`;

const SecondaryButton = styled.button`
  height: 52px;
  border: 1.5px solid #353838;
  border-radius: 12px;
  background-color: #252828;
  color: white;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    border-color: #ff8c00;
    background-color: #2a2d2d;
    transform: translateY(-1px);
  }
`;

const ButtonGoogle = styled.button`
  background-color: #252828;
  border: 1.5px solid #353838;
  color: white;
  font-size: 14px;
  font-weight: 600;
  border-radius: 12px;
  height: 52px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: #ff8c00;
    background-color: #2a2d2d;
    transform: translateY(-1px);
  }
`;

const DividerLine = styled.p`
  display: flex;
  align-items: center;
  color: #5b5e68;
  font-size: 12px;
  margin: 5px 0;

  &::before, &::after {
    content: "";
    flex: 1;
    height: 1px;
    background: #353838;
    margin: 0 12px;
  }
`;

const TertiaryButton = styled.button`
  padding: 10px;
  background-color: transparent;
  color: #b0b0b0;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: color 0.2s ease;
  border: none;
  margin-top: 5px;

  &:hover {
    color: #2d79f3;
    text-decoration: underline;
  }
`;

// --- CÓDIGO DA TELA ---
export default function AuthChoice() {
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: 'http://localhost:5173/completar-cadastro'
        }
      });
      if (error) throw error;
    } catch (error: any) {
      alert('Erro ao entrar com Google: ' + error.message);
    }
  };

  return (
    <Container>
      {/* Tag de vídeo configurada de forma super rígida para forçar a renderização web */}
      <VideoBackground 
        autoPlay 
        loop 
        muted={true} 
        playsInline 
        preload="auto"
      >
        <source src="https://prod-streaming-video-msn-com.akamaized.net/a8c412fa-ae9d-4e45-80cf-5b6fb9b1f9b3/78fcb976-02e0-47cb-95a7-96a921d7b1aa.mp4" type="video/mp4" />
        Seu navegador não suporta vídeos.
      </VideoBackground>
      
      <Overlay />

      <Card>
        <Title>VIZZO<span>.</span></Title>
        <Subtitle>Escolha como deseja acessar o ecossistema inteligente de moradia</Subtitle>

        <ButtonGroup>
          <PrimaryButton onClick={() => navigate('/login')}>
            Já tenho conta
          </PrimaryButton>

          <SecondaryButton onClick={() => navigate('/register')}>
            Criar nova conta
          </SecondaryButton>

          <DividerLine>Ou acesse rapidamente</DividerLine>

          <ButtonGoogle onClick={handleGoogleLogin}>
            <svg version="1.1" width="18" height="18" viewBox="0 0 512 512">
              <path style={{ fill: '#FBBB00' }} d="M113.47,309.408L95.648,375.94l-65.139,1.378C11.042,341.211,0,299.9,0,256c0-42.451,10.324-82.483,28.624-117.732h0.014l57.992,10.632l25.404,57.644c-5.317,15.501-8.215,32.141-8.215,49.456C103.821,274.792,107.225,292.797,113.47,309.408z" />
              <path style={{ fill: '#518EF8' }} d="M507.527,208.176C510.467,223.662,512,239.655,512,256c0,18.328-1.927,36.206-5.598,53.451c-12.462,58.683-45.025,109.925-90.134,146.187l-0.014-0.014l-73.044-3.727l-10.338-64.535c29.932-17.554,53.324-45.025,65.646-77.911h-136.89V208.176h138.887L507.527,208.176z" />
              <path style={{ fill: '#28B446' }} d="M416.253,455.624l0.014,0.014C372.396,490.901,316.666,512,256,512c-97.491,0-182.252-54.491-225.491-134.681l82.961-67.91c21.619,57.698,77.278,98.771,142.53,98.771c28.047,0,54.323-7.582,76.87-20.818L416.253,455.624z" />
              <path style={{ fill: '#F14336' }} d="M419.404,58.936l-82.933,67.896c-23.335-14.586-50.919-23.012-80.471-23.012c-66.729,0-123.429,42.957-143.965,102.724l-83.397-68.276h-0.014C71.23,56.123,157.06,0,256,0C318.115,0,375.068,22.126,419.404,58.936z" />
            </svg>
            Entrar com Google
          </ButtonGoogle>
          
          <TertiaryButton onClick={() => navigate('/home')}>
            Entrar como visitante
          </TertiaryButton>
        </ButtonGroup>
      </Card>
    </Container>
  );
}