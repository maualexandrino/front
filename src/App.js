// src/App.js

import React from 'react';
import { 
  BrowserRouter as Router, 
  Routes, 
  Route, 
  Navigate 
} from 'react-router-dom';

// --- Importação dos Componentes ---
import PrivateRoute from './components/PrivateRoute';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import DashboardPage from './components/DashboardPage';
import AdminPage from './components/AdminPage';

// Estilo básico para a aplicação (opcional)
import './App.css'; 

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* --- ROTAS PÚBLICAS --- */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          
          <Route path="/" element={<Navigate to="/login" />} />

          
          {/* --- ROTAS PRIVADAS --- */}
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/admin" element={<AdminPage />} />
          </Route>

          
          {/* --- ROTA DE FALLBACK --- */}
          <Route path="*" element={
            <div style={{ padding: '50px', textAlign: 'center' }}>
              <h2>404 - Página Não Encontrada</h2>
            </div>
          } />
        </Routes>
      </div>
    </Router>
  );
}

// AQUI ESTÁ A CORREÇÃO
export default App;