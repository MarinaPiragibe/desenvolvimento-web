package com.marinapiragibe.trabalhodevweb.servico;

import com.marinapiragibe.trabalhodevweb.exception.EntidadeNaoEncontradaException;
import com.marinapiragibe.trabalhodevweb.modelo.Sessao;
import com.marinapiragibe.trabalhodevweb.repository.SessaoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SessaoService {

    @Autowired
    private SessaoRepository sessaoRepository;

    public List<Sessao> recuperarSessoes() {
        return sessaoRepository.findAll(Sort.by("id"));
    }

    public Sessao recuperarSessaoPorId(Long id) {
        return sessaoRepository.findById(id)
                .orElseThrow(() -> new EntidadeNaoEncontradaException(
                        "Sessão número " + id + " não encontrado."));
    }
}