package com.marinapiragibe.trabalhodevweb.repository;

import com.marinapiragibe.trabalhodevweb.modelo.Item_carrinho;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface Item_CarrinhoRepository extends JpaRepository<Item_carrinho, Long> {

    @Query(
            value="select i from Item_carrinho i left join fetch i.carrinho c where c.id=:idCarrinho"
    )
    public List<Item_carrinho> recuperarItens_carrinho(Long idCarrinho);
}