import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

// --- Estilos ---
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f4f7f6;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
`;

const Card = styled.div`
  background: white;
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  text-align: center;
  max-width: 400px;
  width: 90%;
`;

const Title = styled.h1`
  color: #333;
  margin-bottom: 10px;
  font-size: 2rem;
`;

const Subtitle = styled.p`
  color: #666;
  margin-bottom: 30px;
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const PrimaryButton = styled.button`
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  background-color: #007bff;
  color: white;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

const SecondaryButton = styled.button`
  padding: 12px 24px;
  border: 2px solid #007bff;
  border-radius: 8px;
  background-color: transparent;
  color: #007bff;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #007bff;
    color: white;
  }
`;

const TertiaryButton =  styled.button`
  padding: 12px 24px;
  background-color: transparent;
  color: #000000;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.1s ease;
  border: none;

  &:hover {
    color: #007bff;
  }
`;

// --- Componente ---
export default function AuthChoice() {
  const navigate = useNavigate();

  return (
    <Container>
      <Card>
        <Title>Bem-vindo 👋</Title>
        <Subtitle>Escolha como deseja acessar a plataforma</Subtitle>

        <ButtonGroup>
          <PrimaryButton onClick={() => navigate('/login')}>
            Já tenho conta
          </PrimaryButton>

          <SecondaryButton onClick={() => navigate('/register')}>
            Criar nova conta
          </SecondaryButton>
          
          <TertiaryButton onClick={() => navigate('/home')}>
            entrar como visitante
          </TertiaryButton>
        </ButtonGroup>
      </Card>
    </Container>
  );
}