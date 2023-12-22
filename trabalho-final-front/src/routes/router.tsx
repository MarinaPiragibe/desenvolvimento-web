import { createBrowserRouter } from 'react-router-dom';
import CarrinhoPage from '../pages/CarrinhoPage';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import Layout from './Layout';
import CadastroDeProdutosPage from '../pages/CadastroDeIngressosPage';
import ListaDeIngressosPage from '../pages/ListaDeIngressosPage';
import ErrorPage from '../pages/ErrorPage';
import React from 'react';
import DetalhesIngresso from '../pages/DetalhesIngresso';
import CardsIngressoPorSessao from '../pages/CardsIngressoPorSessao';
import HelpPage from '../pages/HelpPage';
import SobrePage from '../pages/SobrePage';

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        errorElement: <ErrorPage />,
        children: [
            { path: "", element: <HomePage />,
            children:[
                {
                    path: ":sessao?",
                    element:<CardsIngressoPorSessao/>
                },]
            },
            { path: "listar-ingressos", element: <ListaDeIngressosPage /> },
            { path: "login", element: <LoginPage /> },            
            { path: "cadastrar-ingresso", element: <CadastroDeProdutosPage /> },            
            { path: "carrinho", element: <CarrinhoPage /> },
            { path: "detalhesIngresso", element: <DetalhesIngresso/>},
            { path: "ajuda", element: <HelpPage /> },  
            { path: "sobre", element: <SobrePage /> }, 
            { path: "login", element: <LoginPage /> },            

        ]
    }
]);
export default router;