package com.marinapiragibe.trabalhodevweb.servico.impl;

import com.marinapiragibe.trabalhodevweb.excecao.ObjetoDestacadoSendoIncluidoNoBancoException;
import com.marinapiragibe.trabalhodevweb.modelo.Ingresso;
import com.marinapiragibe.trabalhodevweb.repository.IngressoRepository;
import com.marinapiragibe.trabalhodevweb.servico.IngressoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class IngressoServiceImpl implements IngressoService
{
    @Autowired
    private IngressoRepository ingressoRepository;

    public long inclui(Ingresso umIngresso)
    {
        if (umIngresso.getCodIngresso() == null) {
            Ingresso ingresso = ingressoRepository.save(umIngresso);
            return ingresso.getCodIngresso();
        }
        else {
            throw new ObjetoDestacadoSendoIncluidoNoBancoException();
        }
    }

    public List<Ingresso> recuperaIngressos()
    {
        System.out.println("oi");
        return ingressoRepository.findAll(Sort.by("codIngresso"));
    }
}