// src/components/DashboardPage.js

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const DashboardPage = () => {
    // O estado agora armazena apenas a URL do relatório
    const [reportUrl, setReportUrl] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        const fetchReportUrl = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    navigate('/login');
                    return;
                }

                const config = {
                    headers: { 'Authorization': `Bearer ${token}` }
                };

                // A chamada para o backend continua a mesma
                const response = await axios.get('http://localhost:5000/api/powerbi/embed-info', config);
                
                if (response.data && response.data.embedUrl) {
                    setReportUrl(response.data.embedUrl);
                } else {
                    setError('URL do relatório não encontrada na resposta.');
                }

            } catch (err) {
                console.error('Falha ao buscar a URL do relatório:', err);
                setError('Não foi possível carregar o painel.');
                if (err.response && err.response.status === 401) {
                    handleLogout();
                }
            } finally {
                setIsLoading(false);
            }
        };

        fetchReportUrl();
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };
    
    return (
        <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', height: '100vh' }}>
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexShrink: 0 }}>
                <h1>Dashboard de Análise</h1>
                <button onClick={handleLogout} style={{ padding: '8px 16px', cursor: 'pointer' }}>
                    Sair
                </button>
            </header>
            
            <main style={{ flexGrow: 1, border: '1px solid #ccc', borderRadius: '8px' }}>
                {isLoading && <p style={{ textAlign: 'center', paddingTop: '20px' }}>Carregando painel...</p>}
                {error && <p style={{ color: 'red', textAlign: 'center', paddingTop: '20px' }}>{error}</p>}
                
                {/* A grande mudança: usamos um <iframe> em vez do PowerBIEmbed */}
                {!isLoading && !error && reportUrl && (
                    <iframe
                        title="Power BI Report"
                        style={{ width: '100%', height: '100%', border: 'none' }}
                        src={reportUrl}
                        allowFullScreen={true}
                    ></iframe>
                )}
            </main>
        </div>
    );
};

export default DashboardPage;