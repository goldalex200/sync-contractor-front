import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './styles/styles.scss';
import { AuthProvider } from './pages/AuthContext.jsx'; // Import AuthProvider

import './index.css'
import { BrowserRouter } from 'react-router-dom';

createRoot(document.getElementById('root')).render(
  // <StrictMode>
    <BrowserRouter>
        <AuthProvider>
      <App />
        </AuthProvider>
    </BrowserRouter>
  // </StrictMode>,
)
