import React, { useEffect } from "react";
import Ingresso from "../interfaces/ingresso";
import { FieldValues, useForm } from "react-hook-form";
import useCadastrarIngresso from "../hooks/useCadastrarIngresso";
import useSessoes from "../hooks/useSessoes";
import useApi from "../hooks/useApi";
import { URL_SESSOES } from "../util/constants";
import Sessao from "../interfaces/sessao";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { DevTool } from "@hookform/devtools";
import useAlterarIngresso from "../hooks/useAlterarIngresso";
import useIngressoStore from "../store/ingressoStore";

const { recuperar } = useApi<Sessao>(URL_SESSOES);
let sessoesValidas: Sessao[];

const validaSessao = async (id: string) => {
  if (!sessoesValidas) {
    sessoesValidas = await recuperar();
  }
  const cat = sessoesValidas.find((sessao) => sessao.id === parseInt(id));
  return cat;
};


// const regexData = /^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/;
//const regexImagem = /^[a-z]+\.(gif|jpg|png|bmp)$/;
const schema = z.object({

  sessao: z.string().refine(validaSessao, { message: "Sessão inválida." }),
  poltrona: z
  .string()
  .refine((value) => /^[0-9]+$/.test(value), { message: "O número da poltrona deve ser um número válido." })
  .refine((value) => Number(value) >= 0, { message: "O número da poltrona deve ser um número válido." }),
  preco: z
  .string()
  .refine((value) => /^\d+(\.\d{1,2})?$/.test(value), { message: "O preço deve ser um número válido com até duas casas decimais." })
  .refine((value) => parseFloat(value) >= 0.1, { message: "O preço deve ser maior ou igual a R$ 0.10" }),

});

type FormIngresso = z.infer<typeof schema>;

const CadastroDeIngressosForm = () => {
  
  const ingressoSelecionado = useIngressoStore(s => s.ingressoSelecionado);
  const setIngressoSelecionado = useIngressoStore(s => s.setIngressoSelecionado);
  const tratarIngressoSelecionado = (ingresso: Ingresso) => setIngressoSelecionado(ingresso);


  const { mutate: cadastrarIngresso, error: errorCadastrar } = useCadastrarIngresso();
  const { data: sessoes, error: errorCategorias } = useSessoes();
  const { mutate: alterarIngresso, error: errorAlterar } = useAlterarIngresso();

  const { 
    setValue,
    setFocus, 
    register,
    formState: { errors, isSubmitSuccessful },
    control,
    handleSubmit,
    reset} = useForm<FormIngresso>
    ({
      resolver: zodResolver(schema),
      mode: "onSubmit"
  });

  const onSubmit = ({
    preco,
    poltrona,
    sessao
  }: FieldValues) => {
    const ingresso: Ingresso = {
      preco: preco,
      poltrona: poltrona,
      dataCompra: new Date(Date.now()),
      sessao: { id: sessao, tituloFilme: "", horaInicio: "" },
    };
    reset();
    if (ingressoSelecionado?.codIngresso) {
      ingresso.codIngresso = ingressoSelecionado.codIngresso;
      console.log("alterando")
      alterarIngresso(ingresso);
    } else {
      console.log("cadastrando")
      cadastrarIngresso(ingresso);
    }
  };

  useEffect(() => {
    setFocus("sessao");
    if (ingressoSelecionado?.codIngresso) {
      reset();
      setValue("poltrona", String(ingressoSelecionado.poltrona));
      setValue("sessao", String(ingressoSelecionado.sessao.id));
      setValue("preco", String(ingressoSelecionado.preco));
    }
  }, [ingressoSelecionado]);

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
      tratarIngressoSelecionado({} as Ingresso);
    }
  }, [isSubmitSuccessful]);

  if (errorCategorias) throw errorCategorias;
  if (errorCadastrar) throw errorCadastrar;
  if (errorAlterar) throw errorAlterar;

  return (
    <>
  <form onSubmit={handleSubmit(onSubmit)}>
    <div className="row mb-2">
      <div className="col-xl-2 fw-bold text-start align-self-center">Poltrona</div>
      <div className="col-xl-10">
        <input
          {...register("poltrona")}
          type="number"
          id="poltrona"
          className={
            errors.poltrona
              ? "form-control form-control-sm is-invalid"
              : "form-control form-control-sm"
          }
        />
        <div className="invalid-feedback">{errors.poltrona?.message}</div>
      </div>
    </div>

    <div className="row mb-2">
      <div className="col-xl-2 fw-bold text-start align-self-center">Sessão</div>
      <div className="col-xl-10">
        <select
          {...register("sessao")}
          id="sessao"
          className={
            errors.sessao
              ? "form-control form-control-sm is-invalid"
              : "form-control form-control-sm"
          }
        >
          <option value="0">Selecione uma Sessao</option>
          {sessoes?.map((sessao) => (
            <option key={sessao.id} value={sessao.id}>
              {sessao.horaInicio}
            </option>
          ))}
        </select>
        <div className="invalid-feedback">{errors.sessao?.message}</div>
      </div>
    </div>

    <div className="row mb-2 d-flex justify-content-end">
      <div className="col-xl-2 fw-bold text-start align-self-center">Preço</div>
      <div className="col-xl-10">
        <input
          {...register("preco")}
          type="number"
          step="0.01"
          min="0"
          id="preco"
          className={
            errors.preco
              ? "form-control form-control-sm is-invalid"
              : "form-control form-control-sm"
          }
        />
        <div className="invalid-feedback">{errors.preco?.message}</div>
      </div>
    </div>

    <div className="row mb-5">
      <div className="col-xl-12 text-end">
        <button
          onClick={() => {
            reset();
            console.log("click");
            tratarIngressoSelecionado({} as Ingresso);
          }}
          id="botao"
          type="button"
          className="btn btn-light btn-sm me-2"
        >
          Cancelar
        </button>
        <button
          id="botao"
          type="submit"
          className="btn btn-primary btn-sm "
        >
          {ingressoSelecionado.codIngresso ? " Alterar" : " Cadastrar"}
        </button>
      </div>
    </div>
  </form>
  <DevTool control={control} />
</>
  );
};

export default CadastroDeIngressosForm;
