import React from "react";
import { useRef } from "react";
interface Props {
  tratarNomePesquisado: (nome: string) => void;
  nome: string;
}
const Pesquisa = ({ tratarNomePesquisado, nome }: Props) => {
  const nomeRef = useRef<HTMLInputElement>(null);

  return (
    <form onSubmit={(event) => {
        event.preventDefault();
        tratarNomePesquisado(nomeRef.current!.value);
     }} 
     className="d-flex mb-3">
      <input defaultValue={nome} ref={nomeRef} type="text" className="form-control form-control-sm me-2" placeholder="Pesquisar..." />
      <button type="submit" className="btn btn-success btn-sm">Pesquisar</button>
    </form>
  );
};

export default Pesquisa;
