import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Admin from './admin/Admin.jsx'
import { ContentProvider } from './ContentContext.jsx'

const isAdmin = window.location.pathname.replace(/\/$/, '') === '/admin'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {isAdmin ? (
      <Admin />
    ) : (
      <ContentProvider>
        <App />
      </ContentProvider>
    )}
  </StrictMode>,
)
