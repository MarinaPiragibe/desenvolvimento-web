import dayjs from "dayjs";
import React from "react";
import Ingresso from "../interfaces/ingresso";
import useIngressoStore from "../store/ingressoStore";
import useRemoverIngresso from "../hooks/useRemoverIngresso";
import useIngressosPaginados from "../hooks/useIngressosPaginados";

const TabelasDeIngressos = () => {
  
  const pagina = useIngressoStore(s => s.pagina);
  const tamanho = useIngressoStore(s => s.tamanho);
  const tituloFilme = useIngressoStore(s => s.tituloFilme);

  const setPagina = useIngressoStore(s => s.setPagina);
  const setIngressoSelecionado = useIngressoStore(s => s.setIngressoSelecionado);
  
  const tratarRemocaoDeIngresso = (id: number) => {
    removerIngresso(id);
    setPagina(0);
  };
  const tratarIngressoSelecionado = (ingresso: Ingresso) => setIngressoSelecionado(ingresso);
  
  const {
    data: ingressoRemovido,
    mutate: removerIngresso,
    isLoading: removendo,
    error: erroRemocao,
  } = useRemoverIngresso();

  const {
    data: ingressosPaginados,
    isLoading,
    error,
  } = useIngressosPaginados({ pagina, tamanho, tituloFilme });

  // if (removendo) return null;
  if (isLoading) return <h6>Carregando...</h6>;

  if (error) throw error;
  if (erroRemocao) throw erroRemocao;

  const ingressos = ingressosPaginados!.itens;
  
  return (
    <table className="table table-responsive table-bordered table-sm">
      <thead>
        <tr>
          <th className="align-middle text-center">Id</th>
          <th className="align-middle text-center">Sessao</th>
          <th className="align-middle text-center">Filme </th>
          <th className="align-middle text-center">Poltrona</th>
          <th className="align-middle text-center">Preço</th>
          <th className="align-middle text-center">Ação</th>
        </tr>
      </thead>
      <tbody>
        {ingressos.map((ingresso) => (
          <tr key={ingresso.codIngresso}>
            <td className="align-middle text-center">
              <a className="link-underline" onClick={() => tratarIngressoSelecionado(ingresso)}>
                {ingresso.codIngresso}
              </a>{" "}
              </td>
            <td className="align-middle text-center">{ingresso.sessao.horaInicio}</td>
            <td className="align-middle">{ingresso.sessao.tituloFilme}</td>
            <td className="align-middle text-center">
              {ingresso.poltrona}
            </td>
            <td className="align-middle text-end pe-3">
              {ingresso.preco.toLocaleString("pt-BR", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
                useGrouping: true
              })}
            </td>
            <td width="10%" className="align-middle text-center">
              <button onClick={() => tratarRemocaoDeIngresso(ingresso.codIngresso!)} className="btn btn-danger btn-sm">Remover</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TabelasDeIngressos;
