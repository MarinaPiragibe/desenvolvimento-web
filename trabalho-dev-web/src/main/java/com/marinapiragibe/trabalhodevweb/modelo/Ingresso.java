package com.marinapiragibe.trabalhodevweb.modelo;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name="ingresso")

public class Ingresso
{
    private Long codIngresso;
    private String tituloFilme;
    private LocalDate sessao;
    private String sala;
    private LocalDate dataCompra;

    // ********* Construtores *********

    public Ingresso()
    {
    }

    public Ingresso(String tituloFilme,
                    LocalDate sessao,
                    LocalDate dataCompra)
    {	this.tituloFilme = tituloFilme;
        this.sessao = sessao;
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

    @Column(name="sessao")
    public LocalDate getSessao()
    {	return sessao;
    }

//    @Column(name="sala")
//    public String getSala()
//    {	return sala;
//    }

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

    public void setSessao(LocalDate sessao)
    {	this.sessao = sessao;
    }

//    public void setSala(String sala)
//    {	this.sala = sala;
//    }

    public void setDataCompra(LocalDate dataCompra)
    {	this.dataCompra = dataCompra;
    }

}


