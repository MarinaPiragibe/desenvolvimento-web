import { useNavigate, useParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import Ingresso from "../interfaces/ingresso";
import React from "react";
import useIngressosPaginadosPorTituloFilme from "../hooks/useIngressosPaginadosPorInicioFilme";
import '../styles/CardsIngressoPorSessao.css';

const CardsIngressoPorSessao = () => {
  const navigate = useNavigate();

const detalhesIngresso= (ingresso: Ingresso) => {
  navigate(`/detalhesIngresso`, {state: {data: ingresso}})
}

  var { horaInicio } = useParams();
  const tamanho = 3;
  const { data, isLoading, error, fetchNextPage, hasNextPage } =
  useIngressosPaginadosPorTituloFilme({
      tamanho,
      horaInicio,
    });
  if (isLoading) return <h6>Carregando...</h6>;

  if (error) throw error;

  const getQtdPassagens = data?.pages.reduce((total, page) => total + page.itens.length, 0) || 0;

  
  
  return (
    <>
      <InfiniteScroll
      dataLength={getQtdPassagens}
      hasMore={!!hasNextPage}
      next={() => fetchNextPage()}
      loader={<h6>Carregando...</h6>}
      style={{overflow: "visible"}}>
        <h5 className="mt-4 mb-3">Ingressos</h5>
        <div className="row">
          {data?.pages.map((page) =>
            page.itens.map((ingresso) => (
              <div key={ingresso.codIngresso} className="col-md-4 mb-4">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">{ingresso.sessao.tituloFilme}</h5>
                    <p className="card-text">Hora de Início: {ingresso.sessao.horaInicio}</p>
                    {/* Adicione a classe "poltrona-number" para estilizar o número da poltrona */}
                    <p className="card-text">
                      Poltrona: <span className="poltrona-number">{ingresso.poltrona.toLocaleString("pt-BR")}</span>
                    </p>
                    <p className="card-text">Preço: R$ {ingresso.preco.toLocaleString("pt-BR", {
                      maximumFractionDigits: 2,
                      minimumFractionDigits: 2,
                      useGrouping: true,
                    })}</p>
                    <button
                      className="btn btn-primary w-100"
                      onClick={() => detalhesIngresso(ingresso)}
                    >
                      Ver mais
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div> 
      </InfiniteScroll>
    </>
  );
};

export default CardsIngressoPorSessao;
