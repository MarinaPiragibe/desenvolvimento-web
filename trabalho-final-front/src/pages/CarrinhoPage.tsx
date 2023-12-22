import useRecuperarItensCarrinho from "../hooks/useRecuperarItensCarrinho";
import useRemoverCarrinho from "../hooks/useRemoverCarrinho";
import useRemoverItemCarrinho from "../hooks/useRemoverItemCarrinho";
import Item_carrinho from "../interfaces/item_carrinho";
import useAlterarItemCarrinho from "../hooks/useAlterarItemCarrinho";
import Item_Carrinho from "../interfaces/item_carrinho";
import {useNavigate } from "react-router-dom";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSyncAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { faArrowAltCircleLeft } from "@fortawesome/free-solid-svg-icons/faArrowAltCircleLeft";


const Carrinho = () => {

  const navigate = useNavigate();

  function handleChange(event: any, item_carrinho: Item_Carrinho) {
    item_carrinho.quantidade = event.target.value;
  }
  //Recuperando Itens do carrinho!
  
  const {data: itens_carrinhos, isLoading: carregandoItens} = useRecuperarItensCarrinho();

//Remover Carrinho
  const {
    data: carrinhoRemovido, mutate:removerCarrinho } =useRemoverCarrinho();

  //remover  Item do carrinho
  const {
    data: itemRemovido, mutate:removerItemDoCarrinho, isLoading: removendo } = useRemoverItemCarrinho();

    const{data: itemAlterado,mutate:alterarItem, isLoading: alterando,error: errorAlterar} = useAlterarItemCarrinho();
 

  const tratarRemocaoItem= (item: Item_carrinho) => {
    removerItemDoCarrinho(item.id!);
   
    if (itens_carrinhos &&((itens_carrinhos?.length -1) === 0) && !carrinhoRemovido && !removendo) {
      // Remover carrinho quando não há itens no carrinho e não foi removido ainda
      tratarRemocaoCarrinho(itens_carrinhos[0].carrinho.id!);
    }
  };
  const tratarRemocaoCarrinho= (id: number) => {
    removerCarrinho(id);
  };

  const tratarAlteracaoItemDoCarrinho =(item: Item_carrinho) =>{
    alterarItem(item);
  }

  const handleVoltar = () => {
    itens_carrinhos?.forEach((item) => {
      tratarAlteracaoItemDoCarrinho(item);
    })
    navigate(-1);
    };


  if(carregandoItens) return <div>Carregando...</div>
  if(errorAlterar) return null;
  

    return (
      <>
      <div style={{ display: 'flex', alignItems: 'center' }}>
      <button onClick={handleVoltar} className="btn btn-lg">
        <FontAwesomeIcon icon={faArrowAltCircleLeft} />
      </button>
      <h5 className="mb-0 ms-3">Carrinho</h5>
    </div>
      
      {(carrinhoRemovido || itens_carrinhos?.length === 0) && (
        <p className="m-3 text-warning">O carrinho se encontra vazio!</p>
      )}
      <div className="table-responsive">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th className="align-middle text-center" scope="col">Id</th>
              <th className="align-middle text-center" scope="col">Sessão</th>
              <th className="align-middle text-center" scope="col">Filme</th>
              <th className="align-middle text-center" scope="col">Quantidade</th>
              <th className="align-middle text-center" scope="col">Preço</th>
              <th className="align-middle text-center" scope="col">Excluir</th>
            </tr>
          </thead>
          <tbody>
            {itens_carrinhos?.map((item, index) => (
              <tr key={item.id} className={index % 2 === 0 ? 'table-light' : 'table-secondary'}>
                <td className="align-middle text-center">{item.id}</td>
                <td className="align-middle">{item.ingresso.sessao.horaInicio}</td>
                <td className="align-middle">{item.ingresso.sessao.tituloFilme}</td>
                <td className="align-middle text-end pe-3" style={{width: "10px"}}>
                  <div className="input-group input-group-sm">
                    <input
                      className="form-control"
                      name="quantidade"
                      type="number"
                      min={1}
                      defaultValue={item.quantidade}
                      onChange={(e) => handleChange(e, item)}
                    />
                    <div className="input-group-append">
                      <button className="btn btn-sm" onClick={() => tratarAlteracaoItemDoCarrinho(item)}>
                        <FontAwesomeIcon icon={faSyncAlt} />
                      </button>
                    </div>
                  </div>
                </td>
                <td className="align-middle text-end pe-3">
                  {item.ingresso.preco.toLocaleString("pt-BR", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                    useGrouping: true,
                  })}
                </td>
                <td className="col-1 align-middle text-center">
                  <button onClick={() => tratarRemocaoItem(item!)} className="btn btn-danger btn-sm">
                    <FontAwesomeIcon icon={faTrashAlt} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={4}></td>
              <td className="align-middle text-end fw-bold" style={{width: "15%"}}>
                &sum; R${" "}
                {itens_carrinhos!
                  .reduce((total, item) => item.quantidade * item.ingresso.preco + total, 0)
                  .toLocaleString("pt-BR", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                    useGrouping: true,
                  })}
              </td><td></td>

                
            </tr>
          </tfoot>
        </table>
      </div>
      
    </>
    )
  }
  export default Carrinho
  