package com.marinapiragibe.trabalhodevweb;

import com.marinapiragibe.trabalhodevweb.modelo.Carrinho;
import com.marinapiragibe.trabalhodevweb.modelo.Ingresso;
import com.marinapiragibe.trabalhodevweb.modelo.Item_carrinho;
import com.marinapiragibe.trabalhodevweb.modelo.Sessao;
import com.marinapiragibe.trabalhodevweb.repository.CarrinhoRepository;
import com.marinapiragibe.trabalhodevweb.repository.IngressoRepository;
import com.marinapiragibe.trabalhodevweb.repository.Item_CarrinhoRepository;
import com.marinapiragibe.trabalhodevweb.repository.SessaoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.math.BigDecimal;
import java.time.LocalDate;

@SpringBootApplication
public class TrabalhoDevWebApplication implements CommandLineRunner {

	@Autowired
    IngressoRepository ingressoRepository;

    @Autowired
    SessaoRepository sessaoRepository;

    @Autowired
    private CarrinhoRepository carrinhoRepository;

    @Autowired
    private Item_CarrinhoRepository item_carrinhoRepository;

	public static void main(String[] args) {
		SpringApplication.run(TrabalhoDevWebApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {

        Sessao nossoSonho = new Sessao("Nosso Sonho","14:00", 120);
        sessaoRepository.save(nossoSonho);

        Sessao bastardosInglorios = new Sessao("Bastardos Inglórios","22:00", 160);
        sessaoRepository.save(bastardosInglorios);

        Sessao dezCoisas = new Sessao("Dez coisas que eu odeio em você","17:00", 100);
        sessaoRepository.save(dezCoisas);

        Sessao homemAranha = new Sessao("Homem-aranha: No aranhaverso","21:00", 110);
        sessaoRepository.save(homemAranha);

        Sessao curtindoAVida = new Sessao("Curtindo a vida adoidado","21:00", 110);
        sessaoRepository.save(curtindoAVida);

        Sessao questaoTempo = new Sessao("Questão de Tempo","21:00", 110);
        sessaoRepository.save(questaoTempo);

        Ingresso ingresso = new Ingresso(
                10,
                BigDecimal.valueOf(16.15),
                nossoSonho,
                LocalDate.now()
        );
        ingressoRepository.save(ingresso);

        Ingresso ingresso2 = new Ingresso(
                15,
                BigDecimal.valueOf(42.0),
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

        Ingresso ingresso4 = new Ingresso(
                56,
                BigDecimal.valueOf(23.70),
                homemAranha,
                LocalDate.now()
        );
        ingressoRepository.save(ingresso4);

        Ingresso ingresso5 = new Ingresso(
                10,
                BigDecimal.valueOf(30.40),
                curtindoAVida,
                LocalDate.now()
        );
        ingressoRepository.save(ingresso5);

        Ingresso ingresso6 = new Ingresso(
                37,
                BigDecimal.valueOf(25.50),
                questaoTempo,
                LocalDate.now()
        );
        ingressoRepository.save(ingresso6);


        Carrinho carrinho = new Carrinho(
                LocalDate.now()
        );
        carrinhoRepository.save(carrinho);
        Item_carrinho item1 = new Item_carrinho(
                3,
                carrinho,
                ingresso
        );
        item_carrinhoRepository.save(item1);

        Item_carrinho item2 = new Item_carrinho(
                3,
                carrinho,
                ingresso2
        );
        item_carrinhoRepository.save(item2);

        Item_carrinho item3 = new Item_carrinho(
                4,
                carrinho,
                ingresso3
        );
        item_carrinhoRepository.save(item3);

        Item_carrinho item4 = new Item_carrinho(
                2,
                carrinho,
                ingresso4
        );
        item_carrinhoRepository.save(item4);


    }
}
