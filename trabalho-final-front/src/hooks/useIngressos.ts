import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Ingresso from "../interfaces/ingresso";

const useIngressos = () => useQuery({
  queryKey: ['ingressos'],
  queryFn: () => axios
    .get<Ingresso[]>("http://localhost:8080/ingressos")
    .then(res => res.data),
  staleTime: 10_000  
});
console.log("oi");
export default useIngressos;