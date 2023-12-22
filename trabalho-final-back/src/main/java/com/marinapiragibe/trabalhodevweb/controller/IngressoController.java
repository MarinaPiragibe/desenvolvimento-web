package com.marinapiragibe.trabalhodevweb.controller;
import com.marinapiragibe.trabalhodevweb.modelo.Ingresso;
import com.marinapiragibe.trabalhodevweb.servico.IngressoService;
import com.marinapiragibe.trabalhodevweb.servico.SessaoService;
import com.marinapiragibe.trabalhodevweb.util.ResultadoPaginado;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("http://localhost:5173")
@RestController
@RequestMapping("ingressos")   // http://localhost:8080/produtos
public class IngressoController {

    @Autowired
    private IngressoService ingressoService;

    @Autowired
    private SessaoService sessaoService;

    @GetMapping
    public List<Ingresso> recuperarIngressos() {
        return ingressoService.recuperarIngressos();
    }

    @PostMapping 
    public Ingresso cadastrarIngresso(@RequestBody Ingresso ingresso) {

        sessaoService.recuperarSessaoPorId(ingresso.getSessao().getId());
        return ingressoService.cadastrarIngresso(ingresso);
    }

    @PutMapping
    public Ingresso alterarIngresso(@RequestBody Ingresso ingresso) {
        return ingressoService.alterarIngresso(ingresso);
    }

    // http://localhost:8080/produtos/1
    @DeleteMapping("{codIngresso}")
    public Ingresso removerIngresso(@PathVariable("codIngresso") Long codIngresso) {
        Ingresso ingresso = ingressoService.recuperarIngressoPorId(codIngresso);
        ingressoService.removerIngresso(codIngresso);
        return ingresso;
    }

    // http://localhost:8080/produtos/1
    @GetMapping("{codIngresso}")
    public Ingresso recuperarIngressoPorId(@PathVariable("codIngresso") Long codIngresso) {
        return ingressoService.recuperarIngressoPorId(codIngresso);
    }

    // http://localhost:8080/produtos/categoria/1/televisor
//    @GetMapping("categoria/{codIngresso}/{tituloFilme}")
//    public List<Ingresso> recuperarIngressosDeUmFilmePorId(@PathVariable("codIngresso") Long codIngresso,
//                                                              @PathVariable("tituloFilme") String tituloFilme) {
//        return produtoService.recuperarProdutoDeUmaCategoriaPorId(id);
//    }
    @GetMapping("sessao/{tituloFilme}")         // http://localhost:8080/produtos/categoria/frutas
    public List<Ingresso> recuperarProdutosPorSlugDaCategoria(@PathVariable("tituloFilme") String tituloFilme) {
        return ingressoService.recuperarIngressosPorTituloFilme(tituloFilme);
    }

    // http://localhost:8080/produtos/categoria/paginacao?slugCategoria=frutas&pagina=0
    // http://localhost:8080/produtos/categoria/paginacao?pagina=0
    @GetMapping("hora-inicio/paginacao")
    public ResultadoPaginado<Ingresso> recuperarIngressosPorHorarioDaSessaoComPaginacao(
            @RequestParam(name="horaInicio", defaultValue = "") String horaInicio,
            @RequestParam(name="pagina", defaultValue = "0") int pagina,
            @RequestParam(name="tamanho", defaultValue = "3") int tamanho
    ) {
        Pageable pageable = PageRequest.of(pagina, tamanho);
        Page<Ingresso> paginaDeIngresso = ingressoService
                .recuperarIngressosPorHorarioDaSessaoComPaginacao(horaInicio, pageable);
        ResultadoPaginado<Ingresso> resultadoPaginado = new ResultadoPaginado<>(
                paginaDeIngresso.getTotalElements(),
                paginaDeIngresso.getTotalPages(),
                paginaDeIngresso.getNumber(),
                paginaDeIngresso.getContent());
        return resultadoPaginado;
    }

    @GetMapping("paginacao")   // http://localhost:8080/produtos/paginacao?pagina=0&tamanho=5
    public ResultadoPaginado<Ingresso> recuperarIngressosPaginados(
            @RequestParam(name="pagina", defaultValue = "0") int pagina,
            @RequestParam(name="tamanho", defaultValue = "3") int tamanho,
            @RequestParam(name="tituloFilme", defaultValue = "") String nome
    ) {
        Pageable pageable = PageRequest.of(pagina, tamanho);
        Page<Ingresso> paginaDeProduto = ingressoService.recuperarIngressosPaginados(nome, pageable);
        ResultadoPaginado<Ingresso> resultadoPaginado = new ResultadoPaginado<>(
                paginaDeProduto.getTotalElements(),
                paginaDeProduto.getTotalPages(),
                paginaDeProduto.getNumber(),
                paginaDeProduto.getContent());
        return resultadoPaginado;
    }
}

