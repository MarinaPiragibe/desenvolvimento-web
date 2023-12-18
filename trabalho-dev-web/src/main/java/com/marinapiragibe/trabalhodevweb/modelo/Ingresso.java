package com.marinapiragibe.trabalhodevweb.modelo;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Ingresso
{

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(name="cod_ingresso")
    private Long codIngresso;

        @Column(name="titulo_filme")
        private String tituloFilme;

        @Column(name="poltrona")
        private int poltrona;

        @Column(name="preco")
        private double preco;

        @Column(name="data_compra")
        @JsonFormat(pattern = "yyyy-MM-dd")
        private LocalDate dataCompra;

    // ********* Construtores *********

    public Ingresso(String tituloFilme,
                    Integer poltrona,
                    double preco,
                    LocalDate dataCompra)
    {	this.tituloFilme = tituloFilme;
        this.poltrona = poltrona;
        this.preco = preco;
        this.dataCompra = dataCompra;
    }
}


