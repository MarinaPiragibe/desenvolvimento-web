import React from "react";
import Ingresso from "../interfaces/ingresso";
import { FieldValues, useForm } from "react-hook-form";
import useCadastrarIngresso from "../hooks/useCadastrarIngresso";
import useSessoes from "../hooks/useCategorias";

const CadastroDeIngressosForm = () => {
  const { mutate: cadastrarIngresso } = useCadastrarIngresso();
  const { data: sessoes, error: errorSessoes } = useSessoes();

  const { register, handleSubmit, reset } = useForm();

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

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="row mb-2">
        <div className="col-xl-2 fw-bold text-start align-self-center">Poltrona</div>
        <div className="col-xl-10">
          <input
            {...register("poltrona")}
            type="text"
            id="poltrona"
            className="form-control form-control-sm"
          />
        </div>
      </div>

      <div className="row mb-2">
        <div className="col-xl-2 fw-bold text-start align-self-center">Sessão</div>
        <div className="col-xl-10">
          <select
            {...register("sessao")}
            id="sessao"
            className="form-control form-control-sm"
          >
            <option value="0">Selecione uma categoria</option>
            {sessoes?.map((sessao) => (
              <option key={sessao.id} value={sessao.id}>{sessao.horaInicio}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="row mb-2">
        <div className="col-xl-2 fw-bold text-start align-self-center">Data Compra</div>
        <div className="col-xl-10">
          <input
            {...register("dataCompra")}
            type="text"
            id="dataCompra"
            className="form-control form-control-sm"
          />
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
            className="form-control form-control-sm"
          />
        </div>
      </div>

      <div className="row mb-5">
        <div className="col-xl-10 offset-xl-2 text-end">
          <button id="botao" type="submit" className="btn btn-primary btn-sm">
            <img src="/skin/database_add.png" /> Cadastrar
          </button>
        </div>
      </div>
    </form>
  );
};

export default CadastroDeIngressosForm;
