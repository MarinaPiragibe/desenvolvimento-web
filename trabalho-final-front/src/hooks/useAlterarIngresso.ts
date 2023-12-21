import { useMutation, useQueryClient } from "@tanstack/react-query";
import useApi from "./useApi";
import Ingresso from "../interfaces/ingresso";
import { URL_INGRESSOS } from "../util/constants";

const useAlterarIngresso = () => {
  const { alterar } = useApi<Ingresso>(URL_INGRESSOS);
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (ingresso: Ingresso) => alterar(ingresso),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["ingressos"],
      });
    },
  });
};

export default useAlterarIngresso;
