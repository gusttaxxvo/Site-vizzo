import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

// Imports das logos direto da sua pasta de assets local
import logoVizzo from '../../assets/img/vizzo.svg';
import logoVizzoMono from '../../assets/img/vizzo_mono.svg';
import logoAllset from '../../assets/img/allset.jpeg';

// --- CONFIGURAÇÃO DE CORES (THEME VIZZO DARK) ---
const CoresVizzo = {
  background: '#0f1111',
  cardBackground: '#161919',
  brandBlue: '#2d79f3',
  brandOrange: '#ff8c00',
  textPrimary: '#ffffff',
  textSecondary: '#b0b0b0',
  border: '#252828',
};

// --- COMPONENTES ESTILIZADOS ---

const MainContainer = styled.div`
  min-height: 100vh;
  background-color: ${CoresVizzo.background};
  color: ${CoresVizzo.textPrimary};
  font-family: 'Inter', sans-serif;
`;

// Navbar Superior
const Navbar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 40px;
  background-color: rgba(15, 17, 17, 0.85);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid ${CoresVizzo.border};
  position: sticky;
  top: 0;
  z-index: 100;
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  
  img {
    height: 42px;
    width: 42px;
  }

  h1 {
    font-size: 1.4rem;
    font-weight: 900;
    letter-spacing: -1px;
    margin: 0;
    span { color: ${CoresVizzo.brandOrange}; }
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 24px;
  align-items: center;
`;

const NavLink = styled.a`
  color: ${CoresVizzo.textSecondary};
  text-decoration: none;
  font-size: 0.95rem;
  font-weight: 500;
  transition: color 0.2s;

  &:hover {
    color: ${CoresVizzo.brandOrange};
  }
`;

const NavButton = styled.button`
  background-color: ${CoresVizzo.brandBlue};
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: #1a5bbd;
    transform: translateY(-1px);
  }
`;

const InstallButton = styled.button`
  background-color: transparent;
  color: ${CoresVizzo.brandOrange};
  border: 1px solid ${CoresVizzo.brandOrange};
  padding: 9px 18px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: rgba(255, 140, 0, 0.1);
    transform: translateY(-1px);
  }
`;

// Hero Section
const HeroSection = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 120px 20px 80px 20px;
  background: radial-gradient(circle at top, #111e36 0%, ${CoresVizzo.background} 70%);
`;

const HeroTitle = styled.h1`
  font-size: 3.8rem;
  font-weight: 900;
  max-width: 850px;
  line-height: 1.15;
  letter-spacing: -2px;
  margin: 0;

  span.orange { color: ${CoresVizzo.brandOrange}; }
  span.blue { color: ${CoresVizzo.brandBlue}; }
`;

const HeroSubtitle = styled.p`
  font-size: 1.25rem;
  color: ${CoresVizzo.textSecondary};
  max-width: 650px;
  margin-top: 24px;
  line-height: 1.6;
`;

const HeroButtonGroup = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 40px;
`;

const PrimaryHeroButton = styled.button`
  background-color: ${CoresVizzo.brandOrange};
  color: white;
  border: none;
  padding: 14px 32px;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    box-shadow: 0 4px 20px rgba(255, 140, 0, 0.4);
    transform: translateY(-2px);
  }
`;

const SecondaryHeroButton = styled.button`
  background-color: transparent;
  color: white;
  border: 1.5px solid ${CoresVizzo.border};
  padding: 14px 32px;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: ${CoresVizzo.brandBlue};
    background-color: rgba(45, 121, 243, 0.05);
    transform: translateY(-2px);
  }
`;

// Seções de Layout Comum
const SectionContainer = styled.section`
  max-width: 1200px;
  margin: 0 auto;
  padding: 80px 20px;
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 60px;

  p {
    color: ${CoresVizzo.brandBlue};
    font-weight: 700;
    text-transform: uppercase;
    font-size: 0.85rem;
    letter-spacing: 2px;
    margin-bottom: 8px;
  }

  h2 {
    font-size: 2.6rem;
    font-weight: 800;
    margin: 0;
    letter-spacing: -1px;
    span { color: ${CoresVizzo.brandOrange}; }
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 30px;
`;

const Card = styled.div`
  background-color: ${CoresVizzo.cardBackground};
  border: 1px solid ${CoresVizzo.border};
  padding: 40px 30px;
  border-radius: 20px;
  transition: all 0.3s ease;

  &:hover {
    border-color: ${CoresVizzo.brandOrange};
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  }
`;

const CardIcon = styled.div`
  font-size: 2.2rem;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
`;

const CardTitle = styled.h3`
  font-size: 1.35rem;
  font-weight: 700;
  margin: 0 0 12px 0;
`;

const CardDescription = styled.p`
  font-size: 0.95rem;
  color: ${CoresVizzo.textSecondary};
  line-height: 1.6;
  margin: 0;
`;

// Seção de Métricas / Números
const MetricsBanner = styled.div`
  background: linear-gradient(90deg, #111622 0%, #161919 100%);
  border-top: 1px solid ${CoresVizzo.border};
  border-bottom: 1px solid ${CoresVizzo.border};
  padding: 60px 20px;
  margin: 40px 0;
`;

const MetricsGrid = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  gap: 40px;
  text-align: center;
`;

const MetricItem = styled.div`
  h3 {
    font-size: 3rem;
    font-weight: 800;
    color: ${CoresVizzo.brandOrange};
    margin: 0 0 5px 0;
  }
  p {
    font-size: 1rem;
    color: ${CoresVizzo.textSecondary};
    margin: 0;
    font-weight: 500;
  }
`;

// FAQ Informativo
const FAQGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(450px, 1fr));
  gap: 24px;
  max-width: 1000px;
  margin: 0 auto;

  @media(max-width: 500px) {
    grid-template-columns: 1fr;
  }
`;

const FAQCard = styled.div`
  background-color: rgba(255, 255, 255, 0.02);
  border-left: 3px solid ${CoresVizzo.brandBlue};
  padding: 24px;
  border-radius: 4px 12px 12px 4px;
  
  h4 {
    font-size: 1.1rem;
    font-weight: 600;
    margin: 0 0 10px 0;
    color: #ffffff;
  }
  p {
    font-size: 0.95rem;
    color: ${CoresVizzo.textSecondary};
    line-height: 1.5;
    margin: 0;
  }
`;

// --- COMPONENTES DO MODAL DE QR CODE ---
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(10, 12, 12, 0.8);
  backdrop-filter: blur(12px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: ${CoresVizzo.cardBackground};
  border: 1px solid ${CoresVizzo.border};
  border-top: 5px solid ${CoresVizzo.brandOrange};
  padding: 40px;
  border-radius: 24px;
  text-align: center;
  max-width: 360px;
  width: 90%;
  position: relative;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.7);
`;

const QRCodePlaceholder = styled.div`
  background: white;
  padding: 16px;
  border-radius: 16px;
  display: inline-block;
  margin: 20px 0;
  box-shadow: 0 4px 15px rgba(0,0,0,0.2);
  
  img {
    width: 200px;
    height: 200px;
    display: block;
  }
`;

const CloseModalButton = styled.button`
  background: ${CoresVizzo.brandBlue};
  color: white;
  border: none;
  padding: 10px 24px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  margin-top: 10px;
  width: 100%;
  transition: background 0.2s;

  &:hover {
    background-color: #1a5bbd;
  }
`;

// --- SEU RODAPÉ CUSTOMIZADO (CSS REGRAS EXATAS) ---
const FooterContainer = styled.footer`
  margin: 100px auto 0 auto;
  max-width: 1100px;
  padding: 3px 40px 3px 40px;
  background-color: transparent;
  backdrop-filter: blur(15px);
  box-shadow: 1px 1px 20px rgba(0, 0, 0, 0.515);
  border-radius: 10px 10px 0 0;
  text-shadow: 1px 1px 7px rgba(0, 0, 0, 0.407);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-bottom: none;
`;

const PeZao = styled.div`
  margin: auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  max-width: 900px;
  text-align: justify;
  letter-spacing: 3px;
  padding: 30px 0;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 35px;
    text-align: center;
  }
`;

const OiPeLogo = styled.img`
  height: 70px;
  width: 70px;
  margin-right: 8px;
  border-radius: 12px;
  object-fit: cover;
  filter: drop-shadow(2px 2px 2px rgba(0, 0, 0, 0.495));
`;

const VizzoFooterLogo = styled.img`
  height: 24px;
  width: auto;
  opacity: 0.4;
  margin-top: 15px;
  transition: opacity 0.2s;
  &:hover { opacity: 0.8; }
`;

const Dog = styled.div`
  flex: 1;
  min-width: 220px;

  .titulo {
    font-size: 1.05rem;
    font-weight: 700;
    color: white;
    margin: 0 0 15px 0;
    letter-spacing: normal;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  li {
    color: ${CoresVizzo.textSecondary};
    font-size: 0.9rem;
    margin-bottom: 8px;
    line-height: 1.4;
    letter-spacing: normal;
  }
`;

const CopyrightBar = styled.div`
  text-align: center;
  padding: 20px 0;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  font-size: 0.8rem;
  color: #5b5e68;
  letter-spacing: normal;

  span {
    color: ${CoresVizzo.brandOrange};
    font-weight: 600;
  }
`;

// --- RENDERIZAÇÃO COMPLETA DA PÁGINA ---
export default function Home() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <MainContainer>
      {/* Navbar de Navegação */}
      <Navbar>
        <LogoContainer onClick={() => navigate('/home')}>
          <img src={logoVizzo} alt="Vizzo Logo" />
          <h1>VIZZO<span>.</span></h1>
        </LogoContainer>
        <NavLinks>
          <NavLink href="#features">Funcionalidades</NavLink>
          <NavLink href="#curiosidades">Curiosidades</NavLink>
          <NavLink href="#faq">Dúvidas</NavLink>
          <InstallButton onClick={() => setIsModalOpen(true)}>Instalar Aplicativo</InstallButton>
          <NavButton onClick={() => navigate('/')}>Acessar Plataforma</NavButton>
        </NavLinks>
      </Navbar>

      {/* Hero Header principal */}
      <HeroSection>
        <HeroTitle>
          Conectando você aos <span className="blue">serviços</span> do seu <span className="orange">vizinho</span>.
        </HeroTitle>
        <HeroSubtitle>
          O ecossistema inteligente definitivo para moradia. Faça reservas de áreas comuns, organize ocorrências e compre produtos de forma integrada.
        </HeroSubtitle>
        <HeroButtonGroup>
          <PrimaryHeroButton onClick={() => navigate('/')}>Entrar no Aplicativo</PrimaryHeroButton>
          <SecondaryHeroButton onClick={() => setIsModalOpen(true)}>Baixar App Mobile</SecondaryHeroButton>
        </HeroButtonGroup>
      </HeroSection>

      {/* Seção de Métricas de Preenchimento */}
      <MetricsBanner>
        <MetricsGrid>
          <MetricItem>
            <h3>100%</h3>
            <p>Seguro e Criptografado</p>
          </MetricItem>
          <MetricItem>
            <h3>Zero</h3>
            <p>Taxas Intermediárias</p>
          </MetricItem>
          <MetricItem>
            <h3>Real-time</h3>
            <p>Notificações via Supabase</p>
          </MetricItem>
        </MetricsGrid>
      </MetricsBanner>

      {/* Seção de Funcionalidades */}
      <SectionContainer id="features">
        <SectionHeader>
          <p>Eficiência e Integração</p>
          <h2>Funcionalidades do <span>App</span></h2>
        </SectionHeader>
        <Grid>
          <Card>
            <CardIcon>📅</CardIcon>
            <CardTitle>Reserva de Ambientes</CardTitle>
            <CardDescription>
              Agendamento em tempo real para salões de festas, quadras e churrasqueiras sem planilhas físicas ou burocracia.
            </CardDescription>
          </Card>

          <Card>
            <CardIcon>📦</CardIcon>
            <CardTitle>Controle de Encomendas</CardTitle>
            <CardDescription>
              Avisos instantâneos e push assim que novas mercadorias e correspondências chegam à portaria do condomínio.
            </CardDescription>
          </Card>

          <Card>
            <CardIcon>🛠️</CardIcon>
            <CardTitle>Serviços entre Vizinhos</CardTitle>
            <CardDescription>
              Contrate profissionais validados do seu próprio prédio como encanadores, pintores ou eletricistas com segurança.
            </CardDescription>
          </Card>

          <Card>
            <CardIcon>⚠️</CardIcon>
            <CardTitle>Abertura de Ocorrências</CardTitle>
            <CardDescription>
              Relate problemas estruturais, barulhos ou manutenções diretamente para a administração com envio de fotos.
            </CardDescription>
          </Card>
        </Grid>
      </SectionContainer>

      {/* Seção de Curiosidades */}
      <SectionContainer id="curiosidades" style={{ paddingTop: '0px' }}>
        <SectionHeader>
          <p>Nos bastidores do projeto</p>
          <h2>Curiosidades Importantes</h2>
        </SectionHeader>
        <Grid>
          <Card style={{ borderTop: `4px solid ${CoresVizzo.brandOrange}` }}>
            <CardTitle>Economia Circular Ativa</CardTitle>
            <CardDescription>
              O ecossistema Vizzo reduz a pegada de carbono local ao estimular a venda e troca de produtos usados exclusivamente no espaço interno do condomínio.
            </CardDescription>
          </Card>

          <Card style={{ borderTop: `4px solid ${CoresVizzo.brandBlue}` }}>
            <CardTitle>Validação e Segurança</CardTitle>
            <CardDescription>
              Diferente de redes sociais abertas, o cadastro no Vizzo exige comprovação de residência ou vínculo para blindar o marketplace contra fraudes.
            </CardDescription>
          </Card>

          <Card style={{ borderTop: `4px solid ${CoresVizzo.brandOrange}` }}>
            <CardTitle>Foco em Acessibilidade</CardTitle>
            <CardDescription>
              O design limpo e de alto contraste foi planejado para rodar perfeitamente em telas menores e garantir acessibilidade a todas as idades.
            </CardDescription>
          </Card>
        </Grid>
      </SectionContainer>

      {/* Seção de Dúvidas / FAQ */}
      <SectionContainer id="faq" style={{ paddingTop: '0px' }}>
        <SectionHeader>
          <p>Suporte e Informação</p>
          <h2>Perguntas Frequentes</h2>
        </SectionHeader>
        <FAQGrid>
          <FAQCard>
            <h4>Como funciona o cadastro na plataforma?</h4>
            <p>O morador pode realizar o cadastro informando os dados iniciais. Após a criação, o síndico valida as informações para liberar o acesso às áreas comuns e ao chat.</p>
          </FAQCard>
          <FAQCard>
            <h4>O app cobra comissão pelas vendas no marketplace?</h4>
            <p>Não! A proposta do Vizzo é ser um facilitador gratuito para impulsionar negócios locais e o suporte mútuo entre moradores do mesmo condomínio.</p>
          </FAQCard>
        </FAQGrid>
      </SectionContainer>

      {/* MODAL DO QR CODE (ABRE AO CLICAR EM INSTALAR) */}
      {isModalOpen && (
        <ModalOverlay onClick={() => setIsModalOpen(false)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <h3 style={{ margin: '0 0 10px 0', fontSize: '1.4rem' }}>Instale o Vizzo Mobile</h3>
            <p style={{ color: CoresVizzo.textSecondary, fontSize: '0.9rem', margin: 0 }}>
              Abra a câmera do seu celular para escanear o QR Code e baixar o app.
            </p>
            
            <QRCodePlaceholder>
              <img src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://vizzo.com.br/download" alt="App QR Code" />
            </QRCodePlaceholder>

            <CloseModalButton onClick={() => setIsModalOpen(false)}>
              Fechar Janela
            </CloseModalButton>
          </ModalContent>
        </ModalOverlay>
      )}

      {/* SEU RODAPÉ CUSTOMIZADO INTEGRADO COM SUAS EXIGÊNCIAS */}
      <FooterContainer>
        <PeZao className="pezao" id="pe-zao">
          
          <div style={{ display: 'flex', alignItems: 'flex-start' }}>
            {/* Logo da Equipe AllSet posicionada com o ID de estilo #oi_pe */}
            <OiPeLogo id="oi_pe" src={logoAllset} alt="Allset Equipe" />
            
            <Dog id="fot-sobrenos" className="dog">
              <h3 className="titulo titdevs">Desenvolvido por:</h3>
              <ul>
                <li>Diogo Alves</li>
                <li>Gustavo Silva </li>
                <li>Isabela Araújo </li>
                <li>Isabelly Alves</li>
                <li>Julia Anjos</li>
                <li>Mateus Henrique</li>
              </ul>
            </Dog>
          </div>

          <Dog id="fot-homenagens" className="dog">
            <h3 className="titulo">Homenagens / Pessoas Relacionadas</h3>
            <ul>
              <li>Prof: DonViadao (Valezzi)</li>
              <li>Etec de Sapopemba</li>
            </ul>
          </Dog>

          <Dog style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            {/* Logo Mono da Vizzo aplicada de forma clean no encerramento */}
            <VizzoFooterLogo src={logoVizzoMono} alt="Vizzo Co" />
          </Dog>

        </PeZao>

        <CopyrightBar>
          © 2026 <span>Vizzo Condomínios</span> & Grupo AllSet. Todos os direitos reservados.
        </CopyrightBar>
      </FooterContainer>
    </MainContainer>
  );
}