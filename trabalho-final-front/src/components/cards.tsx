import React from "react";
import { ReactNode } from "react";

interface Props {
    id: number;
    //imagem: string;
    horaInicio: string;
    tituloFilme: string;
    preco: string;
    poltrona: string;
    footer: ReactNode;
}

const Card = ({id, horaInicio, tituloFilme, preco, poltrona, footer}: Props) => {
  return (
    <>
     <div className="card border-0 mb-5">
      <div className="card-body">
        <h5 className="card-title">{tituloFilme}</h5>
        <p className="card-text">{horaInicio}</p>     
        <p className="card-text">Poltrona: {poltrona}</p>     
        <p className="card-text fw-bold" style={{color: "rgb(220, 53, 69)"}}>R$ {preco}</p>        
        </div>
      <div className="card-footer border-0 p-0">{footer}</div>
    </div>
          
          </>
  );
};

export default Card;
