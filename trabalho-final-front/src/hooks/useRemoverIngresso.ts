import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const useRemoverIngresso = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: number) =>
      axios.delete("http://localhost:8080/ingressos/" + id).then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["ingressos"],
      });
    },
  });
};

export default useRemoverIngresso;
