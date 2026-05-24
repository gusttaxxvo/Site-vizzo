import { useNavigate } from 'react-router-dom'
import styled, { keyframes } from 'styled-components'

const AZUL = '#1a3a8f'
const LARANJA = '#e85d04'
const AZUL_CLARO = '#E6F1FB'
const LARANJA_CLARO = '#FFF0E6'

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`

const Nav = styled.nav`
  background: ${AZUL};
  padding: 14px 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const Logo = styled.div`
  color: white;
  font-size: 22px;
  font-weight: 600;
  letter-spacing: 0.5px;
  span { color: ${LARANJA}; }
`

const NavLinks = styled.div`
  display: flex;
  gap: 28px;
  @media (max-width: 600px) { display: none; }
`

const NavLink = styled.a<{ active?: boolean }>`
  color: ${p => p.active ? 'white' : 'rgba(255,255,255,0.65)'};
  font-size: 14px;
  font-weight: ${p => p.active ? '500' : '400'};
  cursor: pointer;
  text-decoration: none;
  &:hover { color: white; }
`

const NavBtn = styled.button`
  background: ${LARANJA};
  color: white;
  border: none;
  padding: 9px 20px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  &:hover { background: #d04e00; }
`

const Hero = styled.section`
  background: ${AZUL};
  padding: 72px 40px;
  text-align: center;
  animation: ${fadeUp} 0.6s ease;
`

const HeroTitle = styled.h1`
  color: white;
  font-size: 36px;
  font-weight: 600;
  line-height: 1.3;
  margin-bottom: 16px;
  span { color: ${LARANJA}; }
`

const HeroSub = styled.p`
  color: rgba(255,255,255,0.75);
  font-size: 16px;
  max-width: 500px;
  margin: 0 auto 32px;
  line-height: 1.7;
`

const HeroBtns = styled.div`
  display: flex;
  gap: 12px;
  justify-content: center;
`

const BtnPrimary = styled.button`
  background: ${LARANJA};
  color: white;
  border: none;
  padding: 13px 32px;
  border-radius: 8px;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  &:hover { background: #d04e00; }
`

const BtnOutline = styled.button`
  background: transparent;
  color: white;
  border: 1.5px solid rgba(255,255,255,0.35);
  padding: 13px 32px;
  border-radius: 8px;
  font-size: 15px;
  cursor: pointer;
  &:hover { background: rgba(255,255,255,0.08); }
`

const Section = styled.section`
  padding: 56px 40px;
  background: ${p => p.color || 'white'};
`

const SectionSub = styled.p`
  font-size: 13px;
  color: #888;
  margin-bottom: 6px;
  text-transform: uppercase;
  letter-spacing: 0.8px;
`

const SectionTitle = styled.h2`
  font-size: 26px;
  font-weight: 600;
  color: #111;
  margin-bottom: 32px;
`

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
`

const FeatCard = styled.div`
  background: white;
  border: 1px solid #eee;
  border-radius: 14px;
  padding: 24px 20px;
  transition: box-shadow 0.2s;
  &:hover { box-shadow: 0 4px 20px rgba(0,0,0,0.07); }
`

const FeatIcon = styled.div<{ orange?: boolean }>`
  width: 44px;
  height: 44px;
  border-radius: 10px;
  background: ${p => p.orange ? LARANJA_CLARO : AZUL_CLARO};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 14px;
  font-size: 22px;
`

const FeatTitle = styled.h3`
  font-size: 15px;
  font-weight: 600;
  color: #111;
  margin-bottom: 8px;
`

const FeatDesc = styled.p`
  font-size: 13px;
  color: #666;
  line-height: 1.6;
`

const Divider = styled.hr`
  border: none;
  border-top: 1px solid #f0f0f0;
`

const AmbientesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 14px;
`

const AmbCard = styled.div`
  background: white;
  border: 1px solid #eee;
  border-radius: 12px;
  padding: 16px;
  display: flex;
  align-items: center;
  gap: 12px;
  transition: border-color 0.2s;
  &:hover { border-color: ${AZUL}; }
`

const AmbIcon = styled.div`
  width: 38px;
  height: 38px;
  border-radius: 8px;
  background: ${AZUL_CLARO};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  flex-shrink: 0;
`

const AmbName = styled.span`
  font-size: 13px;
  font-weight: 500;
  color: #222;
`

const QrSection = styled.section`
  padding: 64px 40px;
  background: #f8f9ff;
  text-align: center;
`

const QrBox = styled.div`
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`

const QrImg = styled.div`
  width: 130px;
  height: 130px;
  border: 1px solid #ddd;
  border-radius: 12px;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
`

const QrLabel = styled.div`
  strong {
    display: block;
    font-size: 16px;
    font-weight: 600;
    color: #111;
    margin-bottom: 4px;
  }
  p {
    font-size: 13px;
    color: #888;
  }
`

const Footer = styled.footer`
  background: ${AZUL};
  padding: 20px 40px;
  text-align: center;
  p {
    color: rgba(255,255,255,0.5);
    font-size: 13px;
    span { color: ${LARANJA}; }
  }
`

const features = [
  { icon: '📅', orange: false, title: 'Reserva de ambientes', desc: 'Agende a piscina, salão de jogos, brinquedoteca e muito mais direto pelo app.' },
  { icon: '🔧', orange: true, title: 'Serviços entre moradores', desc: 'Ofereça ou contrate serviços como limpeza, elétrica e outros dentro do condomínio.' },
  { icon: '🛍️', orange: false, title: 'Marketplace seguro', desc: 'Compre e venda produtos usados entre moradores com mais segurança e confiança.' },
  { icon: '🛡️', orange: true, title: 'Segurança garantida', desc: 'Todas as transações acontecem entre moradores verificados do seu condomínio.' },
]

const ambientes = [
  { icon: '🏊', name: 'Piscina' },
  { icon: '🎮', name: 'Salão de jogos' },
  { icon: '🧸', name: 'Brinquedoteca' },
  { icon: '🎉', name: 'Salão de festas' },
  { icon: '🏋️', name: 'Academia' },
  { icon: '🍖', name: 'Churrasqueira' },
]

export default function Home() {
  const navigate = useNavigate()

  return (
    <>
      <Nav>
        <Logo>Viz<span>zo</span></Logo>
        <NavLinks>
          <NavLink active>Início</NavLink>
        </NavLinks>
        <NavBtn>Baixar app</NavBtn>
      </Nav>

      <Hero>
        <HeroTitle>
          Gerencie seu condomínio<br />
          de forma <span>inteligente</span>
        </HeroTitle>
        <HeroSub>
          Reserve ambientes, ofereça serviços e compre produtos de outros moradores com segurança e praticidade.
        </HeroSub>
        <HeroBtns>
          <BtnPrimary>Baixar agora</BtnPrimary>
          <BtnOutline onClick={() => navigate('/register')}>Criar conta</BtnOutline>
        </HeroBtns>
      </Hero>

      <Section>
        <SectionSub>tudo que você precisa</SectionSub>
        <SectionTitle>Funcionalidades principais</SectionTitle>
        <FeaturesGrid>
          {features.map((f, i) => (
            <FeatCard key={i}>
              <FeatIcon orange={f.orange}>{f.icon}</FeatIcon>
              <FeatTitle>{f.title}</FeatTitle>
              <FeatDesc>{f.desc}</FeatDesc>
            </FeatCard>
          ))}
        </FeaturesGrid>
      </Section>

      <Divider />

      <Section color="#fafafa">
        <SectionSub>reserve com um toque</SectionSub>
        <SectionTitle>Ambientes disponíveis</SectionTitle>
        <AmbientesGrid>
          {ambientes.map((a, i) => (
            <AmbCard key={i}>
              <AmbIcon>{a.icon}</AmbIcon>
              <AmbName>{a.name}</AmbName>
            </AmbCard>
          ))}
        </AmbientesGrid>
      </Section>

      <Divider />

      <QrSection>
        <SectionSub style={{ marginBottom: 8 }}>disponível para android</SectionSub>
        <SectionTitle style={{ marginBottom: 36 }}>Baixe o Vizzo agora</SectionTitle>
        <QrBox>
          <QrImg>
            <svg width="110" height="110" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
              <rect width="100" height="100" fill="white"/>
              <rect x="10" y="10" width="30" height="30" fill="none" stroke={AZUL} strokeWidth="3"/>
              <rect x="15" y="15" width="20" height="20" fill={AZUL}/>
              <rect x="60" y="10" width="30" height="30" fill="none" stroke={AZUL} strokeWidth="3"/>
              <rect x="65" y="15" width="20" height="20" fill={AZUL}/>
              <rect x="10" y="60" width="30" height="30" fill="none" stroke={AZUL} strokeWidth="3"/>
              <rect x="15" y="65" width="20" height="20" fill={AZUL}/>
              <rect x="60" y="60" width="8" height="8" fill={AZUL}/>
              <rect x="72" y="60" width="8" height="8" fill={AZUL}/>
              <rect x="84" y="60" width="8" height="8" fill={AZUL}/>
              <rect x="60" y="72" width="8" height="8" fill={AZUL}/>
              <rect x="84" y="72" width="8" height="8" fill={AZUL}/>
              <rect x="60" y="84" width="8" height="8" fill={AZUL}/>
              <rect x="72" y="84" width="8" height="8" fill={AZUL}/>
              <rect x="84" y="84" width="8" height="8" fill={AZUL}/>
              <rect x="45" y="10" width="8" height="8" fill={AZUL}/>
              <rect x="45" y="22" width="8" height="8" fill={AZUL}/>
              <rect x="45" y="34" width="8" height="8" fill={AZUL}/>
              <rect x="10" y="45" width="8" height="8" fill={AZUL}/>
              <rect x="22" y="45" width="8" height="8" fill={AZUL}/>
              <rect x="34" y="45" width="8" height="8" fill={AZUL}/>
              <rect x="45" y="45" width="8" height="8" fill={LARANJA}/>
            </svg>
          </QrImg>
          <QrLabel>
            <strong>Escaneie para baixar</strong>
            <p>Aponte a câmera do seu Android para o QR code</p>
          </QrLabel>
        </QrBox>
      </QrSection>

      <Footer>
        <p>© 2025 <span>Vizzo</span> — Gerencie seu condomínio</p>
      </Footer>
    </>
  )
}
