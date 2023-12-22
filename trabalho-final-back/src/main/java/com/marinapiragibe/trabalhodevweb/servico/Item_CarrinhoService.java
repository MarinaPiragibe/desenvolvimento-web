package com.marinapiragibe.trabalhodevweb.servico;

import com.marinapiragibe.trabalhodevweb.exception.EntidadeNaoEncontradaException;
import com.marinapiragibe.trabalhodevweb.exception.EntidadeTransienteException;
import com.marinapiragibe.trabalhodevweb.modelo.Item_carrinho;
import com.marinapiragibe.trabalhodevweb.repository.Item_CarrinhoRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class Item_CarrinhoService {

    @Autowired
    private Item_CarrinhoRepository item_carrinhoRepository;

    public List<Item_carrinho> recuperarItens_carrinho(Long idCarrinho){
        return item_carrinhoRepository.recuperarItens_carrinho(idCarrinho);
    }

    @Transactional
    public Item_carrinho alterarItem(Item_carrinho item_carrinho){
        if (item_carrinho.getId() != null) {
            item_carrinhoRepository.findById(item_carrinho.getId())
                    .orElseThrow(
                            () -> new EntidadeNaoEncontradaException("Item não encontrado."));
            return item_carrinhoRepository.save(item_carrinho);
        }
        else {
            throw new EntidadeTransienteException("Tentando alterar um objeto transiente.");
        }
    }

    public Item_carrinho recuperarItemCarrinho(Long idItem) {
        return item_carrinhoRepository.findById(idItem)
                .orElseThrow(() -> new EntidadeNaoEncontradaException(
                        "Item número " + idItem + " não encontrado."));
    }
    public void removerItemDoCarrinho(Long idItem) {
        item_carrinhoRepository.deleteById(idItem);
    }

}