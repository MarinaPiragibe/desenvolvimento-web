package com.marinapiragibe.trabalhodevweb.servico;

import com.marinapiragibe.trabalhodevweb.exception.EntidadeDestacadaException;
import com.marinapiragibe.trabalhodevweb.exception.EntidadeNaoEncontradaException;
import com.marinapiragibe.trabalhodevweb.exception.EntidadeTransienteException;
import com.marinapiragibe.trabalhodevweb.modelo.Ingresso;
import com.marinapiragibe.trabalhodevweb.repository.IngressoRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

@Component
@Service
public class IngressoService
{
    @Autowired
    private IngressoRepository ingressoRepository;

    public List<Ingresso> recuperarIngressos() {
        return ingressoRepository.recuperarIngressosDoFilme();
    }

    public Ingresso cadastrarIngresso(Ingresso ingresso) {
        if(ingresso.getCodIngresso() == null) {
            return ingressoRepository.save(ingresso);
        }
        else {
            throw new EntidadeDestacadaException("Tentando cadastrar um objeto destacado");
        }
    }

//    public Produto alterarProduto(Produto produto) {
//        if (produto.getId() != null) {
//            Supplier<EntidadeNaoEncontradaException> sup =
//                    () -> new EntidadeNaoEncontradaException("Produto não encontrado.");
//            produtoRepository.findById(produto.getId())
//                    .orElseThrow(sup);
//            return produtoRepository.save(produto);
//        }
//        else {
//            throw new EntidadeTransienteException("Tentando alterar um objeto transiente.");
//        }
//    }

    @Transactional
    public Ingresso alterarIngresso(Ingresso ingresso) {
        if (ingresso.getCodIngresso() != null) {
//          produtoRepository.recuperarProdutoPorIdComLock(produto.getId())
            ingressoRepository.findById(ingresso.getCodIngresso())
                    .orElseThrow(
                            () -> new EntidadeNaoEncontradaException("Ingresso não encontrado."));
            return ingressoRepository.save(ingresso);
        }
        else {
            throw new EntidadeTransienteException("Tentando alterar um objeto transiente.");
        }
    }

//    @Transactional
//    public Produto alterarProduto(Produto produto) {
//        if (produto.getId() != null) {
//            Produto umProduto = produtoRepository.findById(produto.getId())
//                    .orElseThrow(
//                            () -> new EntidadeNaoEncontradaException("Produto não encontrado."));
//            umProduto.setNome(produto.getNome());
//            umProduto.setPreco(produto.getPreco());
//            umProduto.setDataCadastro(produto.getDataCadastro());
//            umProduto.setCategoria(produto.getCategoria());
//            return umProduto;
//            // return produtoRepository.save(umProduto);
//        }
//        else {
//            throw new EntidadeTransienteException("Tentando alterar um objeto transiente.");
//        }
//    }

    public void removerIngresso(Long id) {
        ingressoRepository.deleteById(id);
    }

    @GetMapping
    public Ingresso recuperarIngressoPorId(Long id) {
        return ingressoRepository.findById(id)
                .orElseThrow(() -> new EntidadeNaoEncontradaException(
                        "Produto número " + id + " não encontrado"));
    }

//    public List<Ingresso> recuperarIngressoFilmePorId(Long id) {
//        return ingressoRepository.findByCategoriaId(id);
//    }


}
