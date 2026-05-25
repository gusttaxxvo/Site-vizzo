import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider } from 'styled-components'
import App from './app'
import { GlobalVizzoStyle, CoresVizzo } from './theme'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={{ colors: CoresVizzo }}>
      <GlobalVizzoStyle />
      <App />
    </ThemeProvider>
  </StrictMode>,
)