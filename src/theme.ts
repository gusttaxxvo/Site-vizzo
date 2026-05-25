import { createGlobalStyle } from 'styled-components';

export const GlobalVizzoStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif !important;
  }

  html, body, #root {
    background-color: #0f1111 !important; /* Cor oficial do Vizzo App */
    color: #FFFFFF !important;
    min-height: 100vh;
    width: 100%;
    overflow-x: hidden;
    -webkit-font-smoothing: antialiased;
  }
`;

export const CoresVizzo = {
  background: '#0f1111',
  cardBackground: '#1a1d1d',
  inputBackground: '#252828',
  inputBorder: '#353838',
  brandOrange: '#ff8c00',      /* Linha de destaque */
  brandBlue: '#2d79f3',        /* Botões principais */
  blueHover: '#1a5bbd',
  textSecondary: '#b0b0b0',
  textLabel: '#e0e0e0'
};