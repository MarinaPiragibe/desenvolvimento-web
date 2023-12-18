package com.marinapiragibe.trabalhodevweb.controller;
import com.marinapiragibe.trabalhodevweb.modelo.Ingresso;
import com.marinapiragibe.trabalhodevweb.servico.IngressoService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("ingressos")   // http://localhost:8080/produtos
public class IngressoController {

    @Autowired
    private IngressoService ingressoService;

    @GetMapping
    public List<Ingresso> recuperarIngressos() {
        return ingressoService.recuperarIngressos();
    }

//    @PostMapping
//    public ResponseEntity<Produto> cadastrarProduto(@RequestBody Produto produto) {
//        Produto umProduto = produtoService.cadastrarProduto(produto);
//        return new ResponseEntity<>(umProduto, HttpStatus.OK);
//    }

    @PostMapping("cadastrar-ingresso")
    public Ingresso cadastrarIngresso(@Valid @RequestBody Ingresso ingresso) {
        return ingressoService.cadastrarIngresso(ingresso);
    }

    @PutMapping
    public Ingresso alterarIngresso(@RequestBody Ingresso ingresso) {
        return ingressoService.alterarIngresso(ingresso);
    }

    // http://localhost:8080/produtos/1
    @DeleteMapping("{codIngresso}")
    public void removerIngresso(@PathVariable("codIngresso") Long codIngresso) {
        ingressoService.removerIngresso(codIngresso);
    }

    // http://localhost:8080/produtos/1
    @GetMapping("{codIngresso}")
    public Ingresso recuperarIngressoPorId(@PathVariable("codIngresso") Long codIngresso) {
        return ingressoService.recuperarIngressoPorId(codIngresso);
    }

    // http://localhost:8080/produtos/categoria/1/televisor
//    @GetMapping("categoria/{idProduto}/{slug}")
//    public List<Ingresso> recuperarProdutosDeUmaCategoriaPorId(@PathVariable("idProduto") Long id,
//                                                              @PathVariable("slug") String slug) {
//        return ingressoService.recuperarProdutoDeUmaCategoriaPorId(id);
//    }
}

