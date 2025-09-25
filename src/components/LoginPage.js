// src/components/LoginPage.js

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Estilos básicos para centralizar o formulário (opcional, mas ajuda na visualização)
const loginPageStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
  fontFamily: 'sans-serif'
};

const formStyle = {
  display: 'flex',
  flexDirection: 'column',
  width: '300px',
  padding: '20px',
  border: '1px solid #ccc',
  borderRadius: '8px',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
};

const inputGroupStyle = {
  marginBottom: '15px'
};

const labelStyle = {
  marginBottom: '5px',
  display: 'block'
};

const inputStyle = {
  width: '100%',
  padding: '8px',
  boxSizing: 'border-box'
};

const buttonStyle = {
  padding: '10px',
  backgroundColor: '#007bff',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer'
};

const errorStyle = {
    color: 'red',
    marginTop: '10px'
}

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(''); // Estado para guardar mensagens de erro
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault(); // Impede o recarregamento da página ao submeter o formulário
        setError(''); // Limpa erros anteriores

        try {
            // Faz a requisição POST para o endpoint de login no backend
            const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
            
            // Se o login for bem-sucedido:
            localStorage.setItem('token', res.data.token); // 1. Armazena o token recebido
            navigate('/dashboard');                         // 2. Redireciona para o dashboard

        } catch (err) {
            console.error('Erro de login!', err);
            // Se o backend retornar um erro (ex: credenciais inválidas), exibe uma mensagem
            setError('Email ou senha inválidos. Tente novamente.');
        }
    };

    return (
        <div style={loginPageStyle}>
            <form style={formStyle} onSubmit={handleSubmit}>
                <h2>Login</h2>
                <div style={inputGroupStyle}>
                    <label htmlFor="email" style={labelStyle}>Email:</label>
                    <input
                        type="email"
                        id="email"
                        style={inputStyle}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div style={inputGroupStyle}>
                    <label htmlFor="password" style={labelStyle}>Senha:</label>
                    <input
                        type="password"
                        id="password"
                        style={inputStyle}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" style={buttonStyle}>Entrar</button>
                {error && <p style={errorStyle}>{error}</p>}
            </form>
        </div>
    );
};

export default LoginPage;