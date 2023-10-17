package marinapiragibe;

import marinapiragibe.dao.IngressoDAO;
import marinapiragibe.excecao.IngressoNaoEncontradoException;
import marinapiragibe.modelo.Ingresso;
import marinapiragibe.util.FabricaDeDAOs;
import marinapiragibe.util.Util;
import corejava.Console;

import java.util.List;

public class Principal
{	public static void main (String[] args) 
	{
//		Logger logger = LoggerFactory.getLogger(Principal.class);
//		logger.error("Mensagem de log emitida utilizando o LOG4J");
		// fatal - error - warning - info - debug

		String tituloFilme;
		String sessao;
		String dataCompra;
		Ingresso umIngresso;

		IngressoDAO ingressoDAO = FabricaDeDAOs.getDAO(IngressoDAO.class);

		boolean continua = true;
		while (continua)
		{	System.out.println('\n' + "O que você deseja fazer?");
			System.out.println('\n' + "1. Cadastrar um ingresso");
			System.out.println("2. Alterar um ingresso");
			System.out.println("3. Remover um ingresso");
			System.out.println("4. Listar todos os ingressos");
			System.out.println("5. Sair");
						
			int opcao = Console.readInt('\n' + 
							"Digite um número entre 1 e 5:");
					
			switch (opcao)
			{	case 1:
				{
					tituloFilme = Console.readLine('\n' +
						"Informe o titulo do filme: ");
					sessao = Console.readLine(
						"Informe a sessao do filme: ");
					dataCompra = Console.readLine(
						"Informe a data de compra: ");
						
					umIngresso = new Ingresso(tituloFilme, Util.strToLocalDate(sessao), Util.strToLocalDate(dataCompra));
					
					ingressoDAO.inclui(umIngresso);
					
					System.out.println('\n' + "Ingresso número " +
					    umIngresso.getCodIngresso() + " incluído com sucesso!");

					break;
				}

				case 2:
				{	int resposta = Console.readInt('\n' + 
						"Digite o número do ingresso que você deseja alterar: ");
										
					try
					{
						umIngresso = ingressoDAO.recuperaUmIngresso(resposta);
					}
					catch(IngressoNaoEncontradoException e)
					{	System.out.println('\n' + e.getMessage());
						break;
					}
										
					System.out.println('\n' + 
						"Código = " + umIngresso.getCodIngresso() +
						"    Titulo do Filme = " + umIngresso.getTituloFilme() +
						"    Sessao = " + umIngresso.getSessao());
												
					System.out.println('\n' + "O que você deseja alterar?");
					System.out.println('\n' + "1. Titulo do Filme");
					System.out.println("2. Sessao");

					int opcaoAlteracao = Console.readInt('\n' + 
											"Digite um número de 1 a 2:");

					switch (opcaoAlteracao)
					{	case 1:
							String novoNome = Console.
								readLine("Digite o novo titulo do Filme: ");

							umIngresso.setTituloFilme(novoNome);

							try
							{
								ingressoDAO.altera(umIngresso);

								System.out.println('\n' +
									"Alteração de titulo do Filme efetuada com sucesso!");
							}
							catch(IngressoNaoEncontradoException e)
							{	System.out.println('\n' + e.getMessage());
							}

							break;

						case 2:
							String novaSessao = Console.
									readLine("Digite o novo lance mínimo: ");

							umIngresso.setSessao(Util.strToLocalDate(novaSessao));

							try
							{
								ingressoDAO.altera(umIngresso);

								System.out.println('\n' +
									"Alteração da sessão efetuada " +
									"com sucesso!");
							}
							catch(IngressoNaoEncontradoException e)
							{	System.out.println('\n' + e.getMessage());
							}

							break;

						default:
							System.out.println('\n' + "Opção inválida!");
					}

					break;
				}

				case 3:
				{	int resposta = Console.readInt('\n' + 
						"Digite o código do ingresso que você deseja remover: ");
									
					try
					{
						umIngresso = ingressoDAO.recuperaUmIngresso(resposta);
					}
					catch(IngressoNaoEncontradoException e)
					{	System.out.println('\n' + e.getMessage());
						break;
					}
										
					System.out.println('\n' + 
						"Código do Ingresso = " + umIngresso.getCodIngresso() +
						"    Nome do Filme = " + umIngresso.getTituloFilme() +
						"		Sessão  = " + umIngresso.getSessao());
														
					String resp = Console.readLine('\n' + 
						"Confirma a remoção do ingresso?");

					if(resp.equals("s"))
					{	try
						{
							ingressoDAO.exclui (umIngresso.getCodIngresso());
							System.out.println('\n' + 
								"Ingresso removido com sucesso!");
						}
						catch(IngressoNaoEncontradoException e)
						{	System.out.println('\n' + e.getMessage());
						}
					}
					else
					{	System.out.println('\n' + "Ingresso não removido.");
					}
					
					break;
				}

				case 4:
				{
					List<Ingresso> ingressos = ingressoDAO.recuperaIngressos();

//                  Utilizando um consumer. Consumer é uma interface funcional. Ela recebe um
//                  argumento e não retorna nada. Para que um valor seja aceito pelo Consumer
//                  deve ser executado o método accept.


//                  Utilizando method reference. Method references são expressões que possuem
//                  o mesmo tratamento de expressões lambda, mas em vez de prover um corpo  à
//                  expressão lambda, eles (os method references) referenciam um método existente
//                  pelo tituloFilme.

					for (Ingresso ingresso : ingressos)
					{
						System.out.println('\n' +
							"Id = " + ingresso.getCodIngresso() +
							"  Nome do Filme = " + ingresso.getTituloFilme() +
							"  Sessão = " + Util.dateToStr(ingresso.getSessao()) +
							"  Data da Compra = " + Util.dateToStr(ingresso.getDataCompra()));
					}

					break;
				}

				case 5:
				{	continua = false;
					break;
				}

				default:
					System.out.println('\n' + "Opção inválida!");
			}
		}		
	}
}
