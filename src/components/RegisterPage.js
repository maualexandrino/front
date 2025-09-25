// Arquivo: frontend/src/components/RegisterPage.js

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

// Estilos (podem ser os mesmos do LoginPage para consistência)
const pageStyle = { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', fontFamily: 'sans-serif' };
const formStyle = { display: 'flex', flexDirection: 'column', width: '300px', padding: '20px', border: '1px solid #ccc', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' };
const inputGroupStyle = { marginBottom: '15px' };
const labelStyle = { marginBottom: '5px', display: 'block' };
const inputStyle = { width: '100%', padding: '8px', boxSizing: 'border-box' };
const buttonStyle = { padding: '10px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' };
const messageStyle = { marginTop: '10px', textAlign: 'center' };

const RegisterPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');
        try {
            // Faz a chamada POST para o endpoint de registro que criamos no backend
            await axios.post('http://localhost:5000/api/auth/register', { email, password });
            
            setMessage('Usuário cadastrado com sucesso! Redirecionando para o login...');
            
            // Espera 2.5 segundos e redireciona para a página de login
            setTimeout(() => {
                navigate('/login');
            }, 2500);

        } catch (err) {
            // Pega o erro enviado pelo backend (ex: "Este email já está em uso.")
            setError(err.response?.data?.error || 'Erro ao cadastrar.');
        }
    };

    return (
        <div style={pageStyle}>
            <form style={formStyle} onSubmit={handleSubmit}>
                <h2>Criar Conta</h2>
                <div style={inputGroupStyle}>
                    <label htmlFor="email" style={labelStyle}>Email:</label>
                    <input type="email" id="email" style={inputStyle} value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div style={inputGroupStyle}>
                    <label htmlFor="password" style={labelStyle}>Senha:</label>
                    <input type="password" id="password" style={inputStyle} value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <button type="submit" style={buttonStyle}>Cadastrar</button>
                
                {/* Exibe mensagens de sucesso ou erro */}
                {message && <p style={{...messageStyle, color: 'green'}}>{message}</p>}
                {error && <p style={{...messageStyle, color: 'red'}}>{error}</p>}
                
                <p style={messageStyle}>
                    Já tem uma conta? <Link to="/login">Faça o login</Link>
                </p>
            </form>
        </div>
    );
};

export default RegisterPage;