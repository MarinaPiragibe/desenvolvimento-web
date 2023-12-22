import { useLocation, useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import { useState } from "react";
import React from "react";
import useIngressoStore from "../store/ingressoStore";
import useRemoverIngresso from "../hooks/useRemoverIngresso";
import Ingresso from "../interfaces/ingresso";

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
      <h1>Detalhes Ingresso</h1>
      {ingressoRemovido && <p className="m-3 text-danger">O ingresso foi removida com sucesso!</p>}
      <div className="row">

 
  <div className="col-lg-4">
    <h5>Id: {ingresso.codIngresso}</h5>
    <p>Poltrona: {ingresso.poltrona}</p>
    <p>Filme: {ingresso.sessao.tituloFilme}</p>
    <p>Sessao: {ingresso.sessao.horaInicio}</p>
    <p>Preco: {ingresso.preco.toLocaleString("pt-BR", {
      maximumFractionDigits: 2,
      minimumFractionDigits: 2,
      useGrouping: true,
    })}</p>
  </div>
</div>
    
      <button type="button" className="btn btn-lg btn-danger m-4" disabled={isDisabled} onClick={() => tratarRemocaoPassagem(ingresso.codIngresso!)}>Deletar</button>
      <button className="btn btn-lg btn-info" disabled={isDisabled} onClick={() => tratarIngressoSelecionado(ingresso)}>Alterar</button>
      

      <button onClick={handleVoltar} className="mt-5 btn btn-sm btn-success d-block">Voltar</button>
      </>
    )

  }
  
  export default DetalhesIngresso