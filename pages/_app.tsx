import '@/styles/globals.css'
import { darkTheme, lightTheme } from '../themes'
import { CssBaseline, ThemeProvider } from '@mui/material'
import type { AppProps } from 'next/app'
import { UIProvider } from '../context/ui'
import { EntriesProvider } from '@/context/entries'
import { SnackbarProvider } from 'notistack'


export default function App({ Component, pageProps }: AppProps) {
  return(
    <SnackbarProvider maxSnack={3}>
    <EntriesProvider>
      <UIProvider>
        <ThemeProvider theme={ darkTheme }>
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </UIProvider>
    </EntriesProvider>
    </SnackbarProvider>
  ) 
}
