import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Ingresso from "../interfaces/ingresso";

interface IngressosPaginados {
  totalDeIngressos: number;
  totalDePaginas: number;
  paginaCorrente: number;
  itens: Ingresso[];
}

interface QueryString {
  pagina: number;
  tamanho: number;
  tituloFilme: string;
}

// const pessoa1 = {nome: "Joao", salario: 5000};
// const pessoa2 = {nome: "Lucia", salario: 3000};

// const pessoa3 = {...pessoa1, secretaria: pessoa2};  // spread

const useIngressosPaginados = (query: QueryString) => useQuery({
  queryKey: ['ingressos', 'paginacao', query],
  queryFn: () => axios
    .get<IngressosPaginados>(
      "http://localhost:8080/ingressos/paginacao", {
        params: {
          // pagina: query.pagina,
          // tamanho: query.tamanho,
          // nome: query.nome
          ...query
        }
      })
    .then(res => res.data),
  staleTime: 10_000,
  keepPreviousData: true  
});
export default useIngressosPaginados;