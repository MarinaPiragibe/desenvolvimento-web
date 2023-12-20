import Sessao from "./sessao";

interface Ingresso {
    codIngresso?: number;
    preco: number;
    poltrona: number;
    dataCompra: Date;
    sessao: Sessao;
}
export default Ingresso;