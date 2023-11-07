import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { ToastProvider } from './context/ToastContext'

if (process.env.NODE_ENV === "production") {
  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <ToastProvider>
        <App />
      </ToastProvider>
    </React.StrictMode>,
  )
} else {
  ReactDOM.createRoot(document.getElementById('root')).render(
    <ToastProvider>
      <App />
    </ToastProvider>,
  )
}

