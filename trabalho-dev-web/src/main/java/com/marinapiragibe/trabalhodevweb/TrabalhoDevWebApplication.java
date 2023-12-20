package com.marinapiragibe.trabalhodevweb;

import com.marinapiragibe.trabalhodevweb.modelo.Ingresso;
import com.marinapiragibe.trabalhodevweb.modelo.Sessao;
import com.marinapiragibe.trabalhodevweb.repository.IngressoRepository;
import com.marinapiragibe.trabalhodevweb.repository.SessaoRepository;
import com.marinapiragibe.trabalhodevweb.servico.IngressoService;
import com.marinapiragibe.trabalhodevweb.util.Util;
import corejava.Console;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@SpringBootApplication
public class TrabalhoDevWebApplication implements CommandLineRunner {

	@Autowired
    IngressoRepository ingressoRepository;

    @Autowired
    SessaoRepository sessaoRepository;

	public static void main(String[] args) {
		SpringApplication.run(TrabalhoDevWebApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {

        Sessao nossoSonho = new Sessao("Nosso Sonho","14:00", 120);
        sessaoRepository.save(nossoSonho);

        Sessao bastardosInglorios = new Sessao("Bastarodos Inglorios","22:00", 160);
        sessaoRepository.save(bastardosInglorios);

        Sessao dezCoisas = new Sessao("Dez coisas que odeio em você","17:00", 100);
        sessaoRepository.save(dezCoisas);


        Ingresso ingresso = new Ingresso(
                10,
                BigDecimal.valueOf(14.70),
                nossoSonho,
                LocalDate.now()
        );
        ingressoRepository.save(ingresso);

        Ingresso ingresso2 = new Ingresso(
                15,
                BigDecimal.valueOf(14.70),
                bastardosInglorios,
                LocalDate.now()
        );
        ingressoRepository.save(ingresso2);

        Ingresso ingresso3 = new Ingresso(
                33,
                BigDecimal.valueOf(14.70),
                dezCoisas,
                LocalDate.now()
        );
        ingressoRepository.save(ingresso3);



    }
}
