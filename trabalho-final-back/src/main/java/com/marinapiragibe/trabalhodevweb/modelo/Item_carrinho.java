package com.marinapiragibe.trabalhodevweb.modelo;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Item_carrinho {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name="quantidade")
    private int quantidade;

    @ManyToOne
    private Carrinho carrinho;
    @ManyToOne
    private Ingresso ingresso;


    public Item_carrinho(int quantidade, Carrinho carrinho, Ingresso ingresso){
        this.quantidade = quantidade;
        this.carrinho = carrinho;
        this.ingresso = ingresso;
    }
}


