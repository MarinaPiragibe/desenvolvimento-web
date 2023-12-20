import { useState } from "react";
import Paginacao from "../components/Paginacao";
import Pesquisa from "../components/Pesquisa";
import useRemoverIngresso from "../hooks/useRemoverIngresso";
import useIngressosPaginados from "../hooks/useIngressosPaginados";
import React from "react";
import TabelasDeIngressos from "../components/TabelasDeIngressos";
import CadastroDeIngressosForm from "../components/CadastroDeIngressosForm";

const ListaDeIngressosPage = () => {
  const [pagina, setPagina] = useState(0);
  const [nome, setNome] = useState("");

  // array[0] = 0;
  // array[1] = função que altera o valor de array[0]

  const tratarPaginaSelecionada = (page: number) => setPagina(page);
  const tratarNomePesquisado = (nome: string) => {
    setNome(nome);
    setPagina(0);
  };

  const { data: ingressoRemovido, mutate: removerIngresso, isLoading: removendo, error: erroRemocao } = useRemoverIngresso();

  const tratarRemocaoDeIngresso = (id: number) => {
    removerIngresso(id);
    setPagina(0);
  };
  const tamanho = 5;

  const {
    data: ingressosPaginados,
    isLoading,
    error,
  } = useIngressosPaginados({ pagina, tamanho, nome });

  if (removendo) return null;
  if (isLoading) return <h6>Carregando...</h6>;
  
  if (error) throw error;
  if (erroRemocao) throw erroRemocao;

  const ingresso = ingressosPaginados?.itens || [];
  const totalDePaginas = ingressosPaginados?.totalDePaginas || 0;

  console.log(ingressoRemovido);

  return (
    <>
      <div className="mb-4">
        <h5>Cadastro de Ingressos</h5>
        <hr className="mt-0" />
      </div>

      <CadastroDeIngressosForm />

      <div className="mb-4">
        <h5>Lista de Ingressos</h5>
        <hr className="mt-0" />
      </div>
      <Pesquisa tratarNomePesquisado={tratarNomePesquisado} nome={nome} />
      <TabelasDeIngressos ingressos={ingresso} tratarRemocaoDeIngresso={tratarRemocaoDeIngresso} />
      <Paginacao
        paginaCorrente={pagina}
        totalDePaginas={totalDePaginas}
        tratarPaginaSelecionada={tratarPaginaSelecionada}
      />
    </>
  );
};
export default ListaDeIngressosPage;
