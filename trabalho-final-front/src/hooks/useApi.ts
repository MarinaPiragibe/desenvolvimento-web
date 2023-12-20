import { AxiosRequestConfig } from "axios";
import useAxios from "./useAxios";

const useApi = <T>(endpoint: string) => {

    const axiosInstance = useAxios();

    const recuperar = () =>
        axiosInstance
            .get<T[]>(endpoint)
            .then(res => res.data)
            .catch((error) => {
                if (error.response) {
                    // significa que o servidor respondeu, porém com erro
                    throw error;
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

    const removerPorId = (id: number) =>
        axiosInstance
            .delete(endpoint + "/" + id)
            .then(res => res.data)
            .catch((error) => {
                if (error.response) {
                    // significa que o servidor respondeu, porém com erro
                    throw error;
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
    
    const recuperarPagina = (config: AxiosRequestConfig) =>
        axiosInstance
            .get<ResultadoPaginado<T>>(endpoint + "/paginacao", config)
            .then(res => res.data)
            .catch((error) => {
                if (error.response) {
                    // significa que o servidor respondeu, porém com erro
                    throw error;
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

    const cadastrar = (obj: T) =>
        axiosInstance
            .post<T>(endpoint, obj)
            .then(res => res.data)
            .catch((error) => {
                if (error.response) {
                    // significa que o servidor respondeu, porém com erro
                    throw error;
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
    
    return { recuperar, removerPorId, recuperarPagina, cadastrar };
}

export default useApi;

// const { recuperar } = useApi<Produto>(URL_PRODUTOS);