import React from "react";
import Ingresso from "../interfaces/ingresso";
import { FieldValues, useForm } from "react-hook-form";
import useCadastrarIngresso from "../hooks/useCadastrarIngresso";
import useSessoes from "../hooks/useSessoes";
import dataValida from "../util/dataValida";
import useApi from "../hooks/useApi";
import Sessao from "../interfaces/sessao";
import { URL_SESSOES } from "../util/constants";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const { recuperar } = useApi<Sessao>(URL_SESSOES);
let sessoesValidas: Sessao[];

const validaSessao = async (id: string) => {
  if (!sessoesValidas) {
    sessoesValidas = await recuperar();
  }
  const cat = sessoesValidas.find((sessao) => sessao.id === parseInt(id));
  return cat;
};


const regexData = /^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/;
//const regexImagem = /^[a-z]+\.(gif|jpg|png|bmp)$/;
const schema = z.object({

  sessao: z.string().refine(validaSessao, { message: "Sessão inválida." }),
  dataCompra: z
    .string()
    .min(1, { message: "A data de cadastro deve ser informada." })
    .regex(regexData, { message: "Data inválida." })
    .refine(dataValida, { message: "Data inválida." }),
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
  const { mutate: cadastrarIngresso, error: errorCadastrar  } = useCadastrarIngresso();
  const { data: sessoes, error: errorSessoes } = useSessoes();

  const { register, handleSubmit, reset, formState: { errors }} = useForm<FormIngresso>({
    resolver: zodResolver(schema),
    mode: "onSubmit"});

  const onSubmit = ({
    preco,
    poltrona,
    dataCompra,
    sessao
  }: FieldValues) => {
    const ingresso: Ingresso = {
      preco: preco,
      poltrona: poltrona,
      dataCompra: new Date(
        dataCompra.substring(6, 10) +
        "-" +
        dataCompra.substring(3, 5) +
        "-" +
        dataCompra.substring(0, 2)
      ),
      sessao: { id: sessao, tituloFilme: "", horaInicio: "" },
    };
    console.log(ingresso);
    cadastrarIngresso(ingresso);
    reset();
  };

  if (errorSessoes) throw errorSessoes;
  if (errorCadastrar) throw errorCadastrar;

  return (
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
            <option value="0">Selecione uma categoria</option>
            {sessoes?.map((sessao) => (
              <option key={sessao.id} value={sessao.id}>
                {sessao.horaInicio}
              </option>
            ))}
          </select>
          <div className="invalid-feedback">{errors.sessao?.message}</div>
        </div>
      </div>

      <div className="row mb-2">
        <div className="col-xl-2 fw-bold text-start align-self-center">Data Compra</div>
        <div className="col-xl-10">
          <input
            {...register("dataCompra")}
            type="text"
            id="dataCompra"
            className={
              errors.dataCompra
                ? "form-control form-control-sm is-invalid"
                : "form-control form-control-sm"
            }
          />
          <div className="invalid-feedback">{errors.dataCompra?.message}</div>
        </div>
      </div>

      <div className="row mb-2">
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
        <div className="col-xl-10 offset-xl-2 text-end">
          <button id="botao" type="submit" className="btn btn-primary btn-sm">
             Cadastrar
          </button>
        </div>
      </div>
    </form>
  );
};

export default CadastroDeIngressosForm;
