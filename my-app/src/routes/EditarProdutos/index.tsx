import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import type { TipoProduto } from "../../types/types";
 
// URL do web app configurada no .env
const API_URL = import.meta.env.VITE_API_URL;
 
export default function EditarProdutos() {
  document.title = "Editar Produtos";
 
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
 
  const [produto, setProduto] = useState<TipoProduto>({
    id: "",
    nome: "",
    preco: 0,
    estoque: 0,
    avatar: "",
  });
 
  // Busca o produto pelo id utilizando o doGet do Apps Script com query string (?id=...)
  useEffect(() => {
    if (!id) return; // Garante que só executa se o id estiver presente na rota
 
    const carregarProduto = async () => {
      try {
        console.log("Buscando ID:", id);
        const response = await fetch(`${API_URL}?id=${id}`);
 
        if (!response.ok) {
          throw new Error(`Erro na recuperação: ${response.status}`);
        }
 
        const resultado = await response.json();
        console.log("Resultado da API:", resultado);
 
        if (resultado.status === "error") {
          throw new Error(resultado.message);
        }
 
        setProduto(resultado.data);
      } catch (error) {
        console.error("Erro ao carregar produto:", error);
      }
    };
 
    carregarProduto();
  }, [id]);
 
  // Atualiza o produto enviando POST com ação PUT
  const handleUpdate = async () => {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },
        body: JSON.stringify({
          action: "PUT",
          ...produto,
        }),
      });
 
      if (!response.ok) {
        throw new Error(`Erro na atualização: ${response.status}`);
      }
 
      const resultado = await response.json();
 
      if (resultado.status === "error") {
        throw new Error(resultado.message);
      }
 
      alert("Produto atualizado com sucesso!");
      navigate("/Produtos");
    } catch (error) {
      console.error("Erro ao atualizar produto:", error);
    }
  };
 
  return (
    <main>
      <h2>Editar Produtos</h2>
      <h1>ID: {id}</h1>
      <div>
        <form>
          <fieldset>
            <legend>Dados do produto:</legend>
            <div>
              <label htmlFor="nome">Nome do produto </label>
              <input
                type="text"
                name="nome"
                id="nome"
                value={produto.nome}
                onChange={(e) =>
                  setProduto({ ...produto, nome: e.target.value })
                }
              />
            </div>
            <div>
              <label htmlFor="preco">Preço do produto </label>
              <input
                type="number"
                step={0.1}
                name="preco"
                id="preco"
                value={produto.preco}
                onChange={(e) =>
                  setProduto({
                    ...produto,
                    preco: parseFloat(e.target.value) || 0,
                  })
                }
              />
            </div>
            <div>
              <label htmlFor="estoque">Estoque do produto </label>
              <input
                type="number"
                step={1}
                name="estoque"
                id="estoque"
                value={produto.estoque}
                onChange={(e) =>
                  setProduto({
                    ...produto,
                    estoque: parseInt(e.target.value) || 0,
                  })
                }
              />
            </div>
            <div>
              <label htmlFor="avatar">URL do Avatar </label>
              <input
                type="url"
                name="avatar"
                id="avatar"
                value={produto.avatar}
                onChange={(e) =>
                  setProduto({ ...produto, avatar: e.target.value })
                }
              />
              {produto.avatar && (
                <figure>
                  <img src={produto.avatar} alt={produto.nome} width="100" />
                </figure>
              )}
            </div>
            <div>
              <button type="button" onClick={() => handleUpdate()}>
                ATUALIZAR
              </button>
            </div>
          </fieldset>
        </form>
      </div>
    </main>
  );
}