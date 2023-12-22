import { useMutation, useQueryClient } from "@tanstack/react-query";

import Item_Carrinho from "../interfaces/item_carrinho";
import useApi from "./useApi";
import { URL_ITEM } from "../util/constants";

const useAlterarItemCarrinho = () => {
  const { alterar } = useApi<Item_Carrinho>(URL_ITEM);
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (item_carrinho: Item_Carrinho) => alterar(item_carrinho),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["item_carrinho"],
      });
    },
  });
};

export default useAlterarItemCarrinho;
