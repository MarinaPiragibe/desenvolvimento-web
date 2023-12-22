import { createBrowserRouter } from 'react-router-dom';
import CarrinhoPage from '../pages/CarrinhoPage';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import Layout from './Layout';
import CadastroDeProdutosPage from '../pages/CadastroDeIngressosPage';
import ListaDeIngressosPage from '../pages/ListaDeIngressosPage';
import ErrorPage from '../pages/ErrorPage';
import React from 'react';
import DetalhesIngresso from '../pages/DetalhesPassagem';
import CardsIngressoPorSessao from '../pages/CardsIngressoPorSessao';

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        errorElement: <ErrorPage />,
        children: [
                {
                    path: ":empresa?",
                    element:<CardsIngressoPorSessao/>
                },
            { path: "", element: <HomePage /> },
            { path: "listar-ingressos", element: <ListaDeIngressosPage /> },
            { path: "login", element: <LoginPage /> },            
            { path: "cadastrar-ingresso", element: <CadastroDeProdutosPage /> },            
            { path: "carrinho", element: <CarrinhoPage /> },
            { path: "detalhesIngresso", element: <DetalhesIngresso/>},
        ]
    }
]);
export default router;