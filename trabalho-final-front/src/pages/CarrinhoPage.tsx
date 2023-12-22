import { useEffect, useState } from "react";
import useRecuperarItensCarrinho from "../hooks/useRecuperarItensCarrinho";
import useRemoverCarrinho from "../hooks/useRemoverCarrinho";
import useRemoverItemCarrinho from "../hooks/useRemoverItemCarrinho";
import Item_carrinho from "../interfaces/item_carrinho";
import useAlterarItemCarrinho from "../hooks/useAlterarItemCarrinho";
import Item_Carrinho from "../interfaces/item_carrinho";
import { useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";


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
      <h5>Carrinho</h5>
      {(carrinhoRemovido || itens_carrinhos?.length ==0) &&  <p className="m-3 text-warning">O carrinho se encontra vazio!</p>}
      <table className="table table-responsive table-bordered table-sm">
      <thead>
        <tr>
            <th className="align-middle text-center" scope="col">Id</th>
            <th className="align-middle text-center" scope="col">Poltrona</th>
            <th className="align-middle text-center" scope="col">Sessao</th>
            <th className="align-middle text-center" scope="col">Quantidade</th>
            <th className="align-middle text-center" scope="col">Preço</th>
            <th className="align-middle text-center" scope="col">Excluir</th>
        </tr>
      </thead>
      <tbody >
      {itens_carrinhos?.map((item) => (
           <tr key={item.id}>
           <td width="5%"  className="align-middle text-center">{item.id}</td>
           <td width="10%" className="align-middle text-center">{item.ingresso.poltrona}</td>
           <td width="30%" className="align-middle">{item.ingresso.sessao.horaInicio}</td>
           <td width="30%" className="align-middle">{item.ingresso.sessao.tituloFilme}</td>
           <td width="30%" className="align-middle text-end pe-3" >
            <div className=" input-group input-group-sm">
           <input className="form-control"
            name="quantidade"
            type="number"
            min={1}
            defaultValue={item.quantidade}
            onChange={e => handleChange(e, item)}
             />
             
             <div className="input-group-append">
             <button className="btn btn-sm btn-info" onClick={()=> tratarAlteracaoItemDoCarrinho(item)}>Atualizar</button>
             </div>
             </div>
           </td>
           <td width="10%" className="align-middle text-end pe-3">
             {item.ingresso.preco.toLocaleString("pt-BR", {
               minimumFractionDigits: 2,
               maximumFractionDigits: 2,
               useGrouping: true
             })}
           </td>
           <td width="10%" className="align-middle text-center">
             <button onClick={() => tratarRemocaoItem(item!)} className="btn btn-danger btn-sm">Remover</button>
           </td>
         </tr>
     
      ))}
    </tbody>
    <tfoot>
        <tr>
          <td colSpan={4}></td>
          <td className="align-middle text-center fw-bold">Total...</td>
          <td colSpan={2} className="align-middle text-center fw-bold">
            R$ {" "}
            {itens_carrinhos!
              .reduce((total, item) => item.quantidade * item.ingresso.preco + total, 0)
              .toLocaleString("pt-BR", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
                useGrouping: true,
              })}
          </td>
          <td></td>
        </tr>
      </tfoot>
    </table>
    <button onClick={handleVoltar}>Voltar</button>
    </>
    )
  }
  export default Carrinho
  