import { useQuery } from "@tanstack/react-query";
import useApi from "./useApi";
import Sessao from "../interfaces/sessao";
import { URL_SESSOES } from "../util/constants";

const useSessoes = () => {
  const { recuperar } = useApi<Sessao>(URL_SESSOES);

  return useQuery({
    queryKey: ["sessoes"],
    queryFn: () => recuperar(),
    staleTime: 7 * 24 * 60 * 60 * 1000,
    keepPreviousData: true,
  });
};
export default useSessoes;