import dayjs from "dayjs";
import React from "react";
import Ingresso from "../interfaces/ingresso";

interface Props {
  ingressos: Ingresso[];
  tratarRemocaoDeIngresso: (id: number) => void;
}

const TabelasDeIngressos = ({ ingressos, tratarRemocaoDeIngresso }: Props) => {
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
            <td className="align-middle text-center">{ingresso.codIngresso}</td>
            <td className="align-middle text-center">{ingresso.sessao.horaInicio}</td>
            <td className="align-middle">{ingresso.sessao.tituloFilme}</td>
            <td className="align-middle text-center">
              {dayjs(ingresso.dataCompra).format("DD/MM/YYYY")}
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
