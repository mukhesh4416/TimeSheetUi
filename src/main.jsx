import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import DesignationReg from './admin/DesignationReg.jsx'
import { BrowserRouter} from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    
    <App/>
  
  </StrictMode>,
)
