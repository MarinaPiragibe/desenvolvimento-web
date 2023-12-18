package com.marinapiragibe.trabalhodevweb;

import com.marinapiragibe.trabalhodevweb.modelo.Ingresso;
import com.marinapiragibe.trabalhodevweb.servico.IngressoService;
import com.marinapiragibe.trabalhodevweb.util.Util;
import corejava.Console;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.List;

@SpringBootApplication
public class TrabalhoDevWebApplication implements CommandLineRunner {

	@Autowired
	IngressoService ingressoService;

	public static void main(String[] args) {
		SpringApplication.run(TrabalhoDevWebApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {

		String tituloFilme;
		int poltrona;
		double preco;
		String dataCompra;
		Ingresso umIngresso;

		boolean continua = true;
		while (continua)
		{	System.out.println('\n' + "O que você deseja fazer?");
			System.out.println('\n' + "1. Cadastrar um ingresso no banco de dados");
			System.out.println("2. Alterar um ingresso já existente");
			System.out.println("3. Remover um ingresso do banco de dados");
			System.out.println("4. Listar todos os ingressos do banco de dados");
			System.out.println("5. Sair");

			int opcao = Console.readInt('\n' +
					"Digite um número entre 1 e 5:");

			switch (opcao) {
				case 1 -> {
					tituloFilme = Console.readLine('\n' +
							"Informe o nome do filme: ");
					poltrona = Console.readInt("Informa a poltrona: ");
					preco = Console.readDouble(
							"Informe o preco do ingresso");
					dataCompra = Console.readLine(
							"Informe a data de compra do produto: ");

					umIngresso = new Ingresso(tituloFilme, poltrona, preco, Util.strToLocalDate(dataCompra));

					ingressoService.cadastrarIngresso(umIngresso);

					System.out.println('\n' + "Ingresso número " +
							umIngresso.getCodIngresso() + " incluído com sucesso!");

				}
				case 2 -> {
				}
				case 3 -> {
				}
				case 4 -> {
					List<Ingresso> produtos = ingressoService.recuperarIngressos();

					for (Ingresso ingresso : produtos) {
						System.out.println('\n' +
								"  Id = " + ingresso.getCodIngresso() +
								"  Titulo do Filme = " + ingresso.getTituloFilme() +
								"  Poltrona = " + ingresso.getPoltrona() +
								"  Preco = " + Util.doubleToStr(ingresso.getPreco()) +
								"  Data da Compra = " + Util.dateToStr(ingresso.getDataCompra()));
					}
				}
				case 5 -> {
					continua = false;
				}
				default -> System.out.println('\n' + "Opção inválida!");
			}
		}
	}
}
