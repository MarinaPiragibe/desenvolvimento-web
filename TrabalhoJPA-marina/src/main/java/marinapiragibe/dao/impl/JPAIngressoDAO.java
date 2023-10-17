package marinapiragibe.dao.impl;

import marinapiragibe.dao.IngressoDAO;
import marinapiragibe.excecao.IngressoNaoEncontradoException;
import marinapiragibe.modelo.Ingresso;
import marinapiragibe.util.FabricaDeEntityManager;

import javax.persistence.EntityManager;
import javax.persistence.EntityTransaction;
import javax.persistence.LockModeType;
import java.util.List;

public class JPAIngressoDAO implements IngressoDAO
{	
	public long inclui(Ingresso umIngresso)
	{
		EntityManager em = null;
		EntityTransaction tx = null;

		try
		{	// transiente - objeto novo: ainda não persistente
			// persistente - após ser persistido
			// destacado - objeto persistente não vinculado a um entity manager
			em = FabricaDeEntityManager.criarEntityManager();

			tx = em.getTransaction();

			tx.begin();
			em.persist(umIngresso);

			// O que acontece quando o método persist é executado:
			// 1. Os dados do objeto umProduto são inseridos no banco de dados (sem commit)
			// 2. O valor da coluna de auto incremento do banco de dados é atribuído
			//    ao campo id do objeto umProduto.
			// 3. O objeto umProduto é inserido na lista de objetos monitorados do entity
			//    manager.

			// umProduto.setNome("abc");  // Provoca o agendamento de um update no banco
			                              // de dados. O update será executado no momento
			                              // do commit.
			tx.commit();
			return umIngresso.getCodIngresso();
		}
		catch(RuntimeException e)
		{	if (tx != null)
			{
				tx.rollback();
			}
			throw e;
		}
		finally
		{
			em.close();
		}
	}

	public Ingresso recuperaUmIngresso(long numero) throws IngressoNaoEncontradoException
	{
		EntityManager em = null;

		try
		{
			em = FabricaDeEntityManager.criarEntityManager();
			Ingresso umIngresso = em.find(Ingresso.class, numero);

			// Características no método find():
			// 1. É genérico: não requer um cast.
			// 2. Retorna null caso a linha não seja encontrada no banco.

			if(umIngresso == null)
			{	throw new IngressoNaoEncontradoException("Produto não encontrado");
			}
			return umIngresso;
		}
		finally
		{   em.close();
		}
	}

	public void altera(Ingresso umIngresso) throws IngressoNaoEncontradoException
	{
		EntityManager em = null;
		EntityTransaction tx = null;
		Ingresso ingresso = null;
		try
		{
			em = FabricaDeEntityManager.criarEntityManager();
			tx = em.getTransaction();
			tx.begin();

			ingresso = em.find(Ingresso.class, umIngresso.getCodIngresso(), LockModeType.PESSIMISTIC_WRITE);

			if (ingresso == null) {
				throw new IngressoNaoEncontradoException(
					"Ingresso número " + umIngresso.getCodIngresso() + "não encontrado.");
			}
			// O merge entre nada e tudo é tudo. Ao tentar alterar um produto deletado ele será re-inserido
			// no banco de dados.
			em.merge(umIngresso);

			tx.commit();
		}
		catch(RuntimeException e)
		{
			if (tx != null)
		    {   tx.rollback();
		    }
		    throw e;
		}
		finally
		{   em.close();
		}
	}

	public void exclui(long numero) throws IngressoNaoEncontradoException
	{
		EntityManager em = null;
		EntityTransaction tx = null;

		try
		{
			em = FabricaDeEntityManager.criarEntityManager();
			tx = em.getTransaction();
			tx.begin();

			Ingresso ingresso = em.find(Ingresso.class, numero);

			if(ingresso == null)
			{	tx.rollback();
				throw new IngressoNaoEncontradoException("Ingresso não encontrado");
			}

			em.remove(ingresso);
			tx.commit();
		}
		catch(RuntimeException e)
		{
			if (tx != null)
		    {   tx.rollback();
		    }
		    throw e;
		}
		finally
		{   em.close();
		}
	}

	public List<Ingresso> recuperaIngressos()
	{
		EntityManager em = null;

		try
		{	em = FabricaDeEntityManager.criarEntityManager();

			List<Ingresso> ingressos = em
				.createQuery("select p from Ingresso p order by p.codIngresso")
				.getResultList();

			// Retorna um List vazio caso a tabela correspondente esteja vazia.

			return ingressos;
		}
		finally
		{   em.close();
		}
	}
}