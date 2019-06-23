import deepOrange from '@material-ui/core/colors/deepOrange'
import green from '@material-ui/core/colors/green'
import orange from '@material-ui/core/colors/orange'
import pink from '@material-ui/core/colors/pink'
import purple from '@material-ui/core/colors/purple'
import CssBaseline from '@material-ui/core/CssBaseline'
import { createMuiTheme } from '@material-ui/core/styles'
import { ThemeProvider } from '@material-ui/styles'
import { SnackbarProvider } from 'notistack'
import React from 'react'
import { DataContextProvider } from '../contexts/dataContext'
import { UiContextProvider } from '../contexts/uiContext'
import { AddButton } from './AddButton'
import { Header } from './Header'
import { Main } from './Main'
import { NewWeightDialog } from './NewWeightDialog'
import { SecretDialog } from './SecretDialog'

const colors = [pink, orange, purple, deepOrange, green]
const randomColor = colors[Math.floor(Math.random() * colors.length)]

const metaTag = document.getElementById('meta-color')

if (metaTag) {
  metaTag.setAttribute('content', randomColor[300])
}

const theme = createMuiTheme({
  palette: {
    primary: {
      ...randomColor,
      contrastText: 'white',
    },
    divider: 'rgba(0, 0, 0, 0.03)',
  },
  successColor: {
    main: green[500],
    light: green[300],
    dark: green[700],
    contrastText: 'white',
  },
})

export const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider
        hideIconVariant
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <UiContextProvider>
          <DataContextProvider>
            <CssBaseline />
            <Header />
            <Main />
            <NewWeightDialog />
            <SecretDialog />
            <AddButton />
          </DataContextProvider>
        </UiContextProvider>
      </SnackbarProvider>
    </ThemeProvider>
  )
}
