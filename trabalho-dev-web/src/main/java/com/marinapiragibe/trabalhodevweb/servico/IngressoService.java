package com.marinapiragibe.trabalhodevweb.servico;
import java.util.List;

import com.marinapiragibe.trabalhodevweb.modelo.Ingresso;
import org.springframework.stereotype.Component;


@Component //precisa?
public interface IngressoService
{
    long inclui(Ingresso umIngresso);

    List<Ingresso> recuperaIngressos();
}