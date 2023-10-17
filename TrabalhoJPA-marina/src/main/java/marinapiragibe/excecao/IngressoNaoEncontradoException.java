package marinapiragibe.excecao;

public class IngressoNaoEncontradoException extends Exception
{	
	private final static long serialVersionUID = 1;
	
	private int codigo;
	
	public IngressoNaoEncontradoException(String msg)
	{	super(msg);
	}

	public IngressoNaoEncontradoException(int codigo, String msg)
	{	super(msg);
		this.codigo = codigo;
	}
	
	public int getCodigoDeErro()
	{	return codigo;
	}
}	