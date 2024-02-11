import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { UserProvider } from './providers/UserProvider.tsx'
import { ContactProvider } from './providers/ContactProvider.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <ContactProvider>
          <App />
        </ContactProvider>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
