import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import useRecuperarItensCarrinho from "../hooks/useRecuperarItensCarrinho";
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestionCircle, faShoppingCart, faSignIn } from '@fortawesome/free-solid-svg-icons';
import logo_ceart from '../../assets/logo_ceart.png';


function NavBar() {
  // if (removendo) return null;


   const {data: itens_carrinhos, isLoading: carregandoItens, error: error} = useRecuperarItensCarrinho();

   if(carregandoItens) return <div>Carregando...</div>
    if(error) throw(error);
  
  return (
    <>

          <Navbar bg="light" expand="md" className="navbar navbar-light bg-light navbar-expand-md ">
              <Container className="container mb-4">
                  <Navbar.Brand className="navbar-brand" href="/"> 
                  <img className="d-none d-md-block" src={logo_ceart} style={{ width: "60%" }} />
                  </Navbar.Brand>
                  <Navbar.Toggle className="navbar-toggler" aria-controls="menu" />
                  <Navbar.Collapse className="collapse navbar-collapse" id="menu">
                      <Nav className="navbar-nav mr-auto">
                          <Nav.Link className="nav-link nav-item" href="/"> Home
                          </Nav.Link>
                          <NavDropdown title="Cinema" id="dropdownMenuButton">
                              <NavDropdown.Item className="dropdown-item" href="/listar-ingressos"> Ingressos
                              </NavDropdown.Item>
                              
                          </NavDropdown>
                          <Nav.Link className="nav-link nav-item" href="/sobre">
                              Sobre
                          </Nav.Link>
                      </Nav>
                      </Navbar.Collapse>
                      <Navbar.Collapse className="justify-content-end" id="menu">
                      <Nav className="navbar-nav">
                          <Nav.Link className="nav-link nav-item" href="/ajuda"> 
                          <FontAwesomeIcon icon={faQuestionCircle} />
                          </Nav.Link>
                          <Nav.Link className="nav-link nav-item" href="/carrinho">
                          {itens_carrinhos == undefined && (
                  <li className="d-flex justify-content-center">
                    Carrinho vazio
                  </li>
                )} <FontAwesomeIcon icon={faShoppingCart} /> Carrinho 
                              {itens_carrinhos != undefined && (
                              <li className="d-flex justify-content-center">
                              
                R${" "}
                {itens_carrinhos! 
                  .reduce((total, item) => item.quantidade * item.ingresso.preco + total, 0)
                  .toLocaleString("pt-BR", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                    useGrouping: true,
                  })}
                              
              </li>
              )}
                          </Nav.Link>
                          <Nav.Link className="nav-link nav-item" href="/login">
                          <FontAwesomeIcon icon={faSignIn} /> Entrar
                          </Nav.Link>
                      </Nav>

                  </Navbar.Collapse>
                  
              </Container>
          </Navbar>

    </>
  );
}
export default NavBar;