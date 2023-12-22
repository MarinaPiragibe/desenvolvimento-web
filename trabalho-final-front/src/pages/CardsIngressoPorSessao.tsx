import { useNavigate, useParams } from "react-router-dom";
import Card from "../components/cards";
import InfiniteScroll from "react-infinite-scroll-component";
import Ingresso from "../interfaces/ingresso";
import React from "react";
import useIngressosPaginadosPorTituloFilme from "../hooks/useIngressosPaginadosPorInicioFilme";


const CardsIngressoPorSessao = () => {
  const navigate = useNavigate();

const detalhesIngresso= (ingresso: Ingresso) => {
  navigate(`/detalhesIngresso`, {state: {data: ingresso}})
}

  var { horaInicio } = useParams();
  const tamanho = 10;
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
      <h5>Ingressos</h5>
      <div className="row">
        {data?.pages.map((page) =>
          page.itens.map((ingresso) => (
            <div key={ingresso.codIngresso} className="col-md-4">
              <Card
                id={ingresso.codIngresso!}
                horaInicio={ingresso.sessao.horaInicio}
                tituloFilme={ingresso.sessao.tituloFilme}
                poltrona={ingresso.poltrona.toLocaleString("pt-BR")}
                preco={ingresso.preco.toLocaleString("pt-BR", {
                  maximumFractionDigits: 2,
                  minimumFractionDigits: 2,
                  useGrouping: true,
                })}
                footer={<input type="button" className="btn btn-primary w-100" value="Ver mais" onClick={()=> detalhesIngresso(ingresso)} />}
              />
            </div>
          ))
        )}
      </div>
    </InfiniteScroll>
    </>
  );
};

export default CardsIngressoPorSessao;
