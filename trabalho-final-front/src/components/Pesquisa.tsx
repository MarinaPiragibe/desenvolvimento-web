import React from "react";
import { useRef } from "react";
import useIngressoStore from "../store/ingressoStore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const Pesquisa = () => {

  const setTituloFilme = useIngressoStore(s=> s.setTituloFilme);
  const setPagina = useIngressoStore(s => s.setPagina);
  const tituloFilme = useIngressoStore(s => s.tituloFilme);
  
  const tratarTituloFilmePesquisado = (tituloFilme: string) => {
    setTituloFilme(tituloFilme);
    setPagina(0);
  };

  const tituloFilmeRef = useRef<HTMLInputElement>(null);

  return (
    <form onSubmit={(event) => {
        event.preventDefault();
        tratarTituloFilmePesquisado(tituloFilmeRef.current!.value);
     }} 
     className="d-flex mb-3">
      <input defaultValue={tituloFilme} ref={tituloFilmeRef} type="text" className="form-control form-control-sm me-2" placeholder="Pesquisar..." />
      <button type="submit" className="btn btn-success btn-sm">
      <FontAwesomeIcon icon={faSearch} />
      </button>
    </form>
  );
};

export default Pesquisa;
