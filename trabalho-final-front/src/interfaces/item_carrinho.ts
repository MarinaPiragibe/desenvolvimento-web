import Carrinho from "./carrinho";
import Ingresso from "./ingresso";

interface Item_Carrinho {
    id?: number;
    quantidade: number;
    ingresso: Ingresso;
    carrinho: Carrinho
}
export default Item_Carrinho;