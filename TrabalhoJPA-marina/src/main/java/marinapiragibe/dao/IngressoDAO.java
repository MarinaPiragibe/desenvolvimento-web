package marinapiragibe.dao;

import marinapiragibe.excecao.IngressoNaoEncontradoException;
import marinapiragibe.modelo.Ingresso;

import java.util.List;


public interface IngressoDAO
{
	long inclui(Ingresso umIngresso);
	void altera(Ingresso umIngresso) throws IngressoNaoEncontradoException;
	void exclui(long id) throws IngressoNaoEncontradoException;
	Ingresso recuperaUmIngresso(long numero) throws IngressoNaoEncontradoException;
	List<Ingresso> recuperaIngressos();
}