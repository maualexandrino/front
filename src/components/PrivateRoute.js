// src/components/PrivateRoute.js

import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
    // A lógica de autenticação:
    // 1. Pega o token do localStorage.
    // 2. A dupla negação (!!) transforma o resultado em um booleano.
    //    - Se o token existir (uma string), !!token se torna true.
    //    - Se o token for null ou undefined, !!token se torna false.
    const isAuthenticated = !!localStorage.getItem('token');

    // Retorna o componente Outlet se o usuário estiver autenticado,
    // caso contrário, redireciona para a página de login.
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;