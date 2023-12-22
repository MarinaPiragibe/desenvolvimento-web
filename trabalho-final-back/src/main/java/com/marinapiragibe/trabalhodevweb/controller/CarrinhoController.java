package com.marinapiragibe.trabalhodevweb.controller;



import com.marinapiragibe.trabalhodevweb.modelo.Carrinho;
import com.marinapiragibe.trabalhodevweb.modelo.Ingresso;
import com.marinapiragibe.trabalhodevweb.servico.CarrinhoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("http://localhost:5173")
@RestController
@RequestMapping("carrinho")   // http://localhost:8080/carrinho
public class CarrinhoController {

    @Autowired
    private CarrinhoService carrinhoService;
    //remover Carrinho
    @DeleteMapping("{idCarrinho}")
    public Carrinho removerCarrinho(@PathVariable("idCarrinho") Long idCarrinho) {
        Carrinho carrinho = carrinhoService.recuperarCarrinhoPorId(idCarrinho);
        carrinhoService.removerCarrinho(idCarrinho);
        return carrinho;
    }
}
