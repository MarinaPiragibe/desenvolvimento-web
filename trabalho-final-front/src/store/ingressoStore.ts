import { create } from "zustand";
import Ingresso from "../interfaces/ingresso";

interface IngressoStore {
    pagina: number;
    poltrona: number;
    ingressoSelecionado: Ingresso;
    tamanho: number;

    setPagina: (pagina: number) => void;
    setPoltrona: (poltrona: number) => void;
    setIngressoSelecionado: (ingressoSelecionado: Ingresso) => void;
}

const useIngressoStore = create<IngressoStore>((set) => ({
    pagina: 0,
    poltrona: 0,
    ingressoSelecionado: {} as Ingresso,
    tamanho: 5,
    setPagina: (pagina: number) => set(() => ({ pagina: pagina })),
    setPoltrona: (poltrona: number) => set(() => ({ poltrona: poltrona })),
    setIngressoSelecionado: (ingressoSelecionado: Ingresso) => set(() => ({ ingressoSelecionado: ingressoSelecionado }))
}));

export default useIngressoStore;
