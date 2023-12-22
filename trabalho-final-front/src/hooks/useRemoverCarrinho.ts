import { useMutation, useQueryClient } from "@tanstack/react-query";
import Carrinho from "../interfaces/carrinho";
import useApi from "./useApi";
import { URL_CARRINHO } from "../util/constants";

const useRemoverCarrinho = () => {
  const { removerPorId } = useApi<Carrinho>(URL_CARRINHO);
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: number) => removerPorId(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["carrinho"],
      });
    },
  });
};

export default useRemoverCarrinho;
