import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { HeroUIProvider } from "@heroui/react";
import { ToastContainer } from 'react-toastify';
import AuthContextProvider from './assets/Components/Context/AuthContextProvider.jsx';

createRoot(document.getElementById('root')).render(

  <StrictMode>
    <AuthContextProvider>
      <HeroUIProvider>
        <App />
        <ToastContainer />
      </HeroUIProvider>
    </AuthContextProvider>
  </StrictMode>,
)
