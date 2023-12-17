package com.marinapiragibe.trabalhodevweb.modelo;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name="ingresso")

public class Ingresso
{
    private Long codIngresso;
    private String tituloFilme;
    private int poltrona;
    private double preco;
    private LocalDate dataCompra;

    // ********* Construtores *********

    public Ingresso()
    {
    }

    public Ingresso(String tituloFilme,
                    Integer poltrona,
                    double preco,
                    LocalDate dataCompra)
    {	this.tituloFilme = tituloFilme;
        this.poltrona = poltrona;
        this.preco = preco;
        this.dataCompra = dataCompra;
    }

    //??????????????
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(name="cod_ingresso")
    public Long getCodIngresso()
    {	return codIngresso;
    }

    @Column(name="titulo_filme")
    public String getTituloFilme()
    {	return tituloFilme;
    }

    @Column(name="poltrona")
    public int getPoltrona()
    {	return poltrona;
    }

    @Column(name="preco")
    public double getPreco()
    {	return preco;
    }

    @Column(name="data_compra")
    public LocalDate getDataCompra()
    {	return dataCompra;
    }

    // ********* Métodos do Tipo Set *********

    private void setCodIngresso(Long codIngresso)
    {	this.codIngresso = codIngresso;
    }

    public void setTituloFilme(String tituloFilme)
    {	this.tituloFilme = tituloFilme;
    }

    public void setPoltrona(int poltrona)
    {	this.poltrona = poltrona;
    }

    public void setPreco(double preco)
    {	this.preco = preco;
    }

    public void setDataCompra(LocalDate dataCompra)
    {	this.dataCompra = dataCompra;
    }

}


