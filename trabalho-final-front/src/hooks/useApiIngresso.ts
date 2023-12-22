import useAxios from "./useAxios";
import { AxiosRequestConfig } from "axios";
import Item_carrinho from "../interfaces/item_carrinho";
import { URL_INGRESSOS, URL_ITEM } from "../util/constants";
import Ingresso from "../interfaces/ingresso";
import CustomError from "../util/customError";

const useApiIngresso = () => {

    const axiosInstance = useAxios();

    const recuperarIngressoPorTituloFilme = (tituloFilme?: string) =>
        axiosInstance
            .get<Ingresso[]>(URL_INGRESSOS + (tituloFilme ? ("/sessao/" + tituloFilme) : ""))
            .then(res => res.data)
            .catch((error) => {
                if (error.response) {
                    // significa que o servidor respondeu, porém com erro
                    throw new CustomError(
                        error.response.data.message,
                        error.response.data.errorCode
                    )
                }
                else if (error.request) {
                    // significa que a requisição foi enviada mas o servidor não respondeu
                    throw error;
                }
                else {
                    // erro desconhecido
                    throw error;
                }
            })

        const recuperarIngressosPaginadoPorHoraInicioDaSessao = (config: AxiosRequestConfig) =>
            axiosInstance
                .get<ResultadoPaginado<Ingresso>>(URL_INGRESSOS + "/hora-inicio/paginacao", config)
                .then(res => res.data)
                .catch((error) => {
                    if (error.response) {
                        // significa que o servidor respondeu, porém com erro
                        throw new CustomError(
                            error.response.data.message,
                            error.response.data.errorCode
                        )
                    }
                    else if (error.request) {
                        // significa que a requisição foi enviada mas o servidor não respondeu
                        throw error;
                    }
                    else {
                        // erro desconhecido
                        throw error;
                    }
                })

                const recuperarItensCarrinho = (idCarrinho: number) =>
                axiosInstance
                    .get<Item_carrinho[]>(URL_ITEM +'/'+String(idCarrinho) )
                    .then(res => res.data)
                    .catch((error) => {
                        if (error.response) {
                            // significa que o servidor respondeu, porém com erro
                            throw new CustomError(
                                error.response.data.message,
                                error.response.data.errorCode
                            )
                        }
                        else if (error.request) {
                            // significa que a requisição foi enviada mas o servidor não respondeu
                            throw error;
                        }
                        else {
                            // erro desconhecido
                            throw error;
                        }
                    })
        

    return { recuperarIngressoPorTituloFilme,
        recuperarIngressosPaginadoPorHoraInicioDaSessao,
        recuperarItensCarrinho };
}

export default useApiIngresso;
