package com.marinapiragibe.trabalhodevweb.repository;

import com.marinapiragibe.trabalhodevweb.modelo.Ingresso;
import jakarta.persistence.LockModeType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface IngressoRepository extends JpaRepository<Ingresso, Long> {

    @Query("select i from Ingresso i order by i.codIngresso")
    List<Ingresso> recuperarIngressosDoFilme();

//    @Lock(LockModeType.PESSIMISTIC_WRITE)
//    @Query("select i from Ingresso i left outer join fetch i.tituloFilme where i.codIngresso = :codIngresso")
//    Optional<Ingresso> recuperarIngressoPorIdComLock(Long id);

//    List<Ingresso> findByCategoriaId(Long id);
}