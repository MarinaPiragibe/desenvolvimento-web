import { useMutation, useQueryClient } from "@tanstack/react-query";
import useApi from "./useApi";
import Ingresso from "../interfaces/ingresso";
import { URL_INGRESSOS } from "../util/constants";

const useCadastrarIngresso = () => {
  const { cadastrar } = useApi<Ingresso>(URL_INGRESSOS);
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (ingresso: Ingresso) => cadastrar(ingresso),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["ingressos"],
      });
    },
  });
};

export default useCadastrarIngresso;
