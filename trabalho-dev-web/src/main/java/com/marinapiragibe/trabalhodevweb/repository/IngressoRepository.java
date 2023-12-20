package com.marinapiragibe.trabalhodevweb.repository;

import com.marinapiragibe.trabalhodevweb.modelo.Ingresso;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface IngressoRepository extends JpaRepository<Ingresso, Long> {

    @Query("select i from Ingresso i left outer join fetch i.sessao order by i.codIngresso")
    List<Ingresso> recuperIngressosComFilme();

    @Query("select i from Ingresso i left join fetch i.sessao s where s.tituloFilme = :tituloFilme order by i.codIngresso desc")
    List<Ingresso> findBySessaoTituloFilme(String tituloFilme);

    @Query(
            value = "select i from Ingresso i left join fetch i.sessao s where s.tituloFilme like %:tituloFilme%",
            countQuery = "select count(i) from Ingresso i left join  i.sessao s where s.tituloFilme like %:tituloFilme%"
    )
    Page<Ingresso> recuperarIngressosPaginados(String tituloFilme, Pageable pageable);

    @Query(
            value = "select i from Ingresso i left join fetch i.sessao s where s.horaInicio=:horaInicio order by i.poltrona asc",
            countQuery = "select count(i) from Ingresso i left join i.sessao s where s.horaInicio=:horaInicio"
    )
    Page<Ingresso> recuperarIngressosPorHorarioDaSessaoComPaginacao(String horaInicio, Pageable pageable);

    @Query(
            // Muito importante efetuar a busca de produtos com join fetch para categoria para
            // evitar que para cada produto seja recuperada a respectiva categoria.
            value = "select i from Ingresso i left join fetch i.sessao order by i.poltrona asc",
            countQuery = "select count(i) from Ingresso i"
    )
    Page<Ingresso> recuperarIngressosComPaginacao(Pageable pageable);

}