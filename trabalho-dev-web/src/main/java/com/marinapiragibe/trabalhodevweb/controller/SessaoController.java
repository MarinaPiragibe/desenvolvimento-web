package com.marinapiragibe.trabalhodevweb.controller;

import com.marinapiragibe.trabalhodevweb.modelo.Sessao;
import com.marinapiragibe.trabalhodevweb.servico.SessaoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin("http://localhost:5173")
@RestController
@RequestMapping("sessao")
public class SessaoController {

    @Autowired
    private SessaoService sessaoService;

    @GetMapping("sessoes")
    public List<Sessao> recuperarSessoes() {
        return sessaoService.recuperarSessoes();
    }
}