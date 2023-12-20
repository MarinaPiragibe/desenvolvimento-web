import React from "react";

interface Props {
  paginaCorrente: number;
  totalDePaginas: number;
  tratarPaginaSelecionada: (pagina: number) => void;
}

const Paginacao = ({ paginaCorrente, totalDePaginas, tratarPaginaSelecionada }: Props) => {
  const arrayDePaginas = [];

  if (totalDePaginas < 2) return null;

  for (let i = 0; i < totalDePaginas; i++) {
    arrayDePaginas.push(
      <li key={i} className={paginaCorrente === i ? "page-item active" : "page-item"} aria-current="page">
        <a onClick={() => tratarPaginaSelecionada(i)} className="page-link">
          {i + 1}
        </a>
      </li>
    );
  }
  return (
    <nav aria-label="Paginacao">
      <ul className="pagination">
        <li className={paginaCorrente === 0 ? "page-item disabled" : "page-item"}>
          <a onClick={() => tratarPaginaSelecionada(paginaCorrente - 1)} className="page-link">Anterior</a>
        </li>
        {arrayDePaginas}
        <li className={paginaCorrente === totalDePaginas - 1 ? "page-item disabled" : "page-item"}>
          <a onClick={() => tratarPaginaSelecionada(paginaCorrente + 1)} className="page-link">
            Próxima
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Paginacao;
