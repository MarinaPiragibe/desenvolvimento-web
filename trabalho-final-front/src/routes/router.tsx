import { createBrowserRouter } from 'react-router-dom';
import CarrinhoPage from '../pages/CarrinhoPage';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import Layout from './Layout';
import CadastroDeProdutosPage from '../pages/CadastroDeIngressosPage';
import ListaDeIngressosPage from '../pages/ListaDeIngressosPage';
import ErrorPage from '../pages/ErrorPage';
import React from 'react';

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        errorElement: <ErrorPage />,
        children: [
            { path: "", element: <HomePage /> },
            { path: "listar-ingressos", element: <ListaDeIngressosPage /> },
            { path: "login", element: <LoginPage /> },            
            { path: "cadastrar-ingresso", element: <CadastroDeProdutosPage /> },            
            { path: "carrinho", element: <CarrinhoPage /> },            
        ]
    }
]);
export default router;