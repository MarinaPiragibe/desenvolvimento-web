import { useInfiniteQuery } from "@tanstack/react-query";
import Ingresso from "../interfaces/ingresso";
import useApiIngresso from "./useApiIngresso";
interface QueryString {
  tamanho: number;
  horaInicio?: string;
}

// const pessoa1 = {nome: "Joao", salario: 5000};
// const pessoa2 = {nome: "Lucia", salario: 3000};
// const pessoa3 = {...pessoa1, secretaria: pessoa2};  // spread

const useIngressosPaginadosPorTituloFilme = (query: QueryString) => {
  const { recuperarIngressosPaginadoPorHoraInicioDaSessao } = useApiIngresso();

  return useInfiniteQuery<ResultadoPaginado<Ingresso>>({
    queryKey: ["ingressos", "sessao", "paginacao", query],
    queryFn: ({ pageParam = 0 }) =>
    recuperarIngressosPaginadoPorHoraInicioDaSessao({
        params: {
          pagina: pageParam,
          tamanho: query.tamanho,
          horaInicio: query.horaInicio
        },
      }),
      staleTime: 10_000,
      keepPreviousData: true,
    
    getNextPageParam: (lastPage, allPages) => {
      
      return lastPage.paginaCorrente < lastPage.totalDePaginas -1 ? 
        lastPage.paginaCorrente + 1 : undefined;
    }
  });
};
export default useIngressosPaginadosPorTituloFilme;
