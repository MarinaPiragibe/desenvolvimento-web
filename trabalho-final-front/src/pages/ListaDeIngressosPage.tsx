import { useState } from "react";
import Paginacao from "../components/Paginacao";
import Pesquisa from "../components/Pesquisa";
import useRemoverIngresso from "../hooks/useRemoverIngresso";
import useIngressosPaginados from "../hooks/useIngressosPaginados";
import React from "react";
import TabelasDeIngressos from "../components/TabelasDeIngressos";
import CadastroDeIngressosForm from "../components/CadastroDeIngressosForm";
import Ingresso from "../interfaces/ingresso";

const ListaDeIngressosPage = () => {
  return (
    <>
      <div className="mb-4">
        <h5>Cadastro de Ingressos</h5>
        <hr className="mt-0" />
      </div>

      <CadastroDeIngressosForm  />

      <div className="mb-4">
        <h5>Lista de Ingressos</h5>
        <hr className="mt-0" />
      </div>
      <Pesquisa />
      <TabelasDeIngressos />
      <Paginacao
      />
    </>
  );
};
export default ListaDeIngressosPage;
