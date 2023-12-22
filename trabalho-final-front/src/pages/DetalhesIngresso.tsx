import { useLocation, useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import { useState } from "react";
import React from "react";
import useIngressoStore from "../store/ingressoStore";
import useRemoverIngresso from "../hooks/useRemoverIngresso";
import Ingresso from "../interfaces/ingresso";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleLeft } from "@fortawesome/free-solid-svg-icons/faArrowAltCircleLeft";
import { Button, Card, Col, Row } from "react-bootstrap";

const DetalhesIngresso = () => {
    const [isDisabled, setDisabled] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    var ingresso = location.state.data;

    const tratarRemocaoPassagem = (id: number) => {
        removerIngresso(id);
        setDisabled(true);


      };

      const setIngressoSelecionado = useIngressoStore(s => s.setIngressoSelecionado);

      const tratarIngressoSelecionado = (passagem: Ingresso) => {
        setIngressoSelecionado(passagem);
        navigate('/listar-ingressos');
      }

      const {
        data: ingressoRemovido,
        mutate: removerIngresso,
        isLoading: removendo,
        error: erroRemocao,
      } = useRemoverIngresso();

      if (erroRemocao) throw erroRemocao;

      const handleVoltar = () => {
        navigate(-1);
        };
    return (
        <>
      <div style={{ display: 'flex', alignItems: 'center' }}>
      <button onClick={handleVoltar} className="btn btn-lg">
        <FontAwesomeIcon icon={faArrowAltCircleLeft} />
      </button>
      <h5 className="mb-0 ms-3">Detalhes</h5>
    </div>
      {ingressoRemovido && <p className="m-3 text-danger">O ingresso foi removida com sucesso!</p>}
      <div className="row">

 
      <Card>
      <Card.Body>
        <Row>
          <Col>
            <Card.Title>Id: {ingresso.codIngresso}</Card.Title>
            <Card.Text>
              Poltrona: {ingresso.poltrona}
              <br />
              Filme: {ingresso.sessao.tituloFilme}
              <br />
              Sessão: {ingresso.sessao.horaInicio}
              <br />
              Preço: {ingresso.preco.toLocaleString("pt-BR", {
                maximumFractionDigits: 2,
                minimumFractionDigits: 2,
                useGrouping: true,
              })}
            </Card.Text>
          </Col>
          <Col className="d-flex justify-content-end">
            <Button type="button" className="btn btn-sm btn-danger m-2 align-self-end" disabled={isDisabled} onClick={() => tratarRemocaoPassagem(ingresso.codIngresso!)}>
              Deletar
            </Button>
            <Button className="btn btn-sm btn-info m-2 align-self-end" disabled={isDisabled} onClick={() => tratarIngressoSelecionado(ingresso)}>
              Alterar
            </Button>
          </Col>
        </Row>
      </Card.Body>
    </Card>

</div>
    
            </>
    )

  }
  
  export default DetalhesIngresso