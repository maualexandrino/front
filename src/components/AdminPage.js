// src/components/AdminPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

// --- Estilos para a página (opcional, mas ajuda na organização) ---
const pageStyle = { fontFamily: 'sans-serif', padding: '20px' };
const formSectionStyle = { border: '1px solid #ccc', borderRadius: '8px', padding: '20px', marginBottom: '30px' };
const inputGroupStyle = { marginBottom: '15px' };
const labelStyle = { display: 'block', marginBottom: '5px' };
const inputStyle = { width: '300px', padding: '8px' };
const buttonStyle = { padding: '10px 15px', cursor: 'pointer' };
const messageStyle = { marginTop: '10px', fontWeight: 'bold' };

const AdminPage = () => {
    // Estados para as listas de usuários e painéis
    const [users, setUsers] = useState([]);
    const [panels, setPanels] = useState([]);

    // Estados para o formulário de criação de painel
    const [newPanelName, setNewPanelName] = useState('');
    const [newPanelUrl, setNewPanelUrl] = useState('');

    // Estados para o formulário de associação
    const [selectedUserId, setSelectedUserId] = useState('');
    const [selectedPanelId, setSelectedPanelId] = useState('');

    // Estados para feedback
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    // Função para buscar os dados iniciais (usuários e painéis)
    const fetchData = async () => {
        try {
            const token = localStorage.getItem('token');
            const config = { headers: { 'Authorization': `Bearer ${token}` } };
            
            // Busca usuários e painéis em paralelo
            const [usersResponse, panelsResponse] = await Promise.all([
                axios.get('http://localhost:5000/api/users', config),
                axios.get('http://localhost:5000/api/panels', config)
            ]);

            setUsers(usersResponse.data);
            setPanels(panelsResponse.data);
        } catch (err) {
            setError('Falha ao carregar dados iniciais.');
        }
    };

    // O useEffect com array vazio [] executa a função uma vez quando o componente carrega
    useEffect(() => {
        fetchData();
    }, []);

    // Função para lidar com o envio do formulário de criação de painel
    const handleCreatePanel = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');
        try {
            const token = localStorage.getItem('token');
            const config = { headers: { 'Authorization': `Bearer ${token}` } };
            const body = { name: newPanelName, embed_url: newPanelUrl };
            
            await axios.post('http://localhost:5000/api/panels', body, config);
            
            setMessage('Painel criado com sucesso!');
            setNewPanelName('');
            setNewPanelUrl('');
            fetchData(); // Atualiza a lista de painéis
        } catch (err) {
            setError(err.response?.data?.error || 'Erro ao criar painel.');
        }
    };
    
    // Função para lidar com o envio do formulário de associação
    const handleAssignPanel = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');
        if (!selectedUserId || !selectedPanelId) {
            setError('Por favor, selecione um usuário e um painel.');
            return;
        }
        try {
            const token = localStorage.getItem('token');
            const config = { headers: { 'Authorization': `Bearer ${token}` } };
            const body = { user_id: selectedUserId, panel_id: selectedPanelId };

            await axios.post('http://localhost:5000/api/panels/assign', body, config);

            setMessage('Painel associado com sucesso!');
        } catch (err) {
            setError(err.response?.data?.error || 'Erro ao associar painel.');
        }
    };


    return (
        <div style={pageStyle}>
            <h1>Página de Administração</h1>

            {/* Seção de Cadastro de Painel */}
            <section style={formSectionStyle}>
                <h2>Cadastrar Novo Painel</h2>
                <form onSubmit={handleCreatePanel}>
                    <div style={inputGroupStyle}>
                        <label style={labelStyle}>Nome do Painel:</label>
                        <input type="text" value={newPanelName} onChange={(e) => setNewPanelName(e.target.value)} style={inputStyle} required />
                    </div>
                    <div style={inputGroupStyle}>
                        <label style={labelStyle}>URL Pública do Painel:</label>
                        <input type="url" value={newPanelUrl} onChange={(e) => setNewPanelUrl(e.target.value)} style={inputStyle} required />
                    </div>
                    <button type="submit" style={buttonStyle}>Criar Painel</button>
                </form>
            </section>

            {/* Seção de Associação de Painel */}
            <section style={formSectionStyle}>
                <h2>Associar Painel a Usuário</h2>
                <form onSubmit={handleAssignPanel}>
                    <div style={inputGroupStyle}>
                        <label style={labelStyle}>Selecione o Usuário:</label>
                        <select value={selectedUserId} onChange={(e) => setSelectedUserId(e.target.value)} style={inputStyle} required>
                            <option value="">-- Escolha um usuário --</option>
                            {users.map(user => (
                                <option key={user.id} value={user.id}>{user.email}</option>
                            ))}
                        </select>
                    </div>
                    <div style={inputGroupStyle}>
                        <label style={labelStyle}>Selecione o Painel:</label>
                        <select value={selectedPanelId} onChange={(e) => setSelectedPanelId(e.target.value)} style={inputStyle} required>
                            <option value="">-- Escolha um painel --</option>
                            {panels.map(panel => (
                                <option key={panel.id} value={panel.id}>{panel.name}</option>
                            ))}
                        </select>
                    </div>
                    <button type="submit" style={buttonStyle}>Associar Painel</button>
                </form>
            </section>
            
            {message && <p style={{...messageStyle, color: 'green'}}>{message}</p>}
            {error && <p style={{...messageStyle, color: 'red'}}>{error}</p>}
        </div>
    );
};

export default AdminPage;