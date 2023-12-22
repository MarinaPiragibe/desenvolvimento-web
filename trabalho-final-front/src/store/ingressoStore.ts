import { create } from "zustand";
import Ingresso from "../interfaces/ingresso";

interface IngressoStore {
    pagina: number;
    tituloFilme: string;
    ingressoSelecionado: Ingresso;
    tamanho: number;

    setPagina: (pagina: number) => void;
    setTituloFilme: (tituloFilme: string) => void;
    setIngressoSelecionado: (ingressoSelecionado: Ingresso) => void;
}

const useIngressoStore = create<IngressoStore>((set) => ({
    pagina: 0,
    tituloFilme: "",
    ingressoSelecionado: {} as Ingresso,
    tamanho: 5,
    setPagina: (pagina: number) => set(() => ({ pagina: pagina })),
    setTituloFilme: (tituloFilme: string) => set(() => ({ tituloFilme: tituloFilme })),
    setIngressoSelecionado: (ingressoSelecionado: Ingresso) => set(() => ({ ingressoSelecionado: ingressoSelecionado }))
}));

export default useIngressoStore;
