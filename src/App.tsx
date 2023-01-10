import { GobalStyle } from './styles/theme/global'
import { ThemeProvider } from 'styled-components'
import { defaultTheme } from './styles/theme/default'
import { Router } from './Router'
import { BrowserRouter } from 'react-router-dom'
import { CycleContextProvider } from './contexts/CycleContext'

export function App() {

  return (
    <ThemeProvider theme={defaultTheme}>
      <BrowserRouter>
        <CycleContextProvider>
           <Router />
        </CycleContextProvider>
      </BrowserRouter>
      <GobalStyle />
    </ThemeProvider>

  )
}


