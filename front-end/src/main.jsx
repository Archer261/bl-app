import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from './utils/AuthContext';
import App from './App.jsx';
import './index.css';
import { PopupProvider } from './utils/PopupContext';

const initialToken = localStorage.getItem('token') || '';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>

    <AuthProvider>
      <App />
    </AuthProvider>

  </BrowserRouter>,
)
