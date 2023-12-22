package com.marinapiragibe.trabalhodevweb.servico;

import com.marinapiragibe.trabalhodevweb.exception.EntidadeNaoEncontradaException;
import com.marinapiragibe.trabalhodevweb.modelo.Carrinho;
import com.marinapiragibe.trabalhodevweb.repository.CarrinhoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CarrinhoService {

    @Autowired
    private CarrinhoRepository carrinhoRepository;

    public Carrinho recuperarCarrinhoPorId(Long id) {
        return carrinhoRepository.findById(id)
                .orElseThrow(() -> new EntidadeNaoEncontradaException(
                        "Carrinho número " + id + " não encontrado."));
    }
    public void removerCarrinho(Long id) {
        carrinhoRepository.deleteById(id);
    }

}
