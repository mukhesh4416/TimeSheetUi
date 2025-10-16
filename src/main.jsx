import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import "./index.css"
import { Provider } from 'react-redux'
import { store } from './core/store/store.js'
import { ThemeProvider } from '@mui/material'
import theme from './core/theme.js'
import './styles.scss'

createRoot(document.getElementById('root')).render(
  // <StrictMode>  
  //   <App/>
  // </StrictMode>,
  <Provider store={store}>
     <ThemeProvider theme={theme}>
        <App/>
     </ThemeProvider>
  </Provider>
)
