package com.marinapiragibe.trabalhodevweb.modelo;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.DecimalMin;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

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

    @JsonIgnore
    @OneToMany(mappedBy = "ingresso", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Item_carrinho> itens_carrinho;

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


