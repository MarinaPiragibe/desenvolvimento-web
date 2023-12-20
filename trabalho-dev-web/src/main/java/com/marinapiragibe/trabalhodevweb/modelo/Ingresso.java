package com.marinapiragibe.trabalhodevweb.modelo;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.DecimalMin;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Ingresso
{

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long codIngresso;

    private int poltrona;

    @DecimalMin(value="0.1", message = "O 'Preço' deve ser maior ou igual a 0,1.")
    private BigDecimal preco;

    private LocalDate dataCompra;

    @ManyToOne
    private Sessao sessao;

    // ********* Construtores *********

    public Ingresso(
                    Integer poltrona,
                    BigDecimal preco,
                    Sessao sessao,
                    LocalDate dataCompra){
        this.poltrona = poltrona;
        this.preco = preco;
        this.sessao = sessao;
        this.dataCompra = dataCompra;
    }
}


