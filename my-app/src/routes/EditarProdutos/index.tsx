import { useParams, useNavigate } from "react-router";
import type { TipoProduto } from "../../types/types";
import { useEffect, useState } from "react";



export default function EditarProdutos() {
  // Para alterar o título da página:
  document.title = "Editar Produtos";

  const navigate = useNavigate();

  const { id } = useParams<{id:string}>();

  const [produto, setProduto] = useState<TipoProduto>({ id: "", nome: "", preco: 0, descricao: "", avatar: "" });

  useEffect(()=>{

    const carregaProduto = async () => {
      try {
        const response = await fetch(`http://localhost:3001/produtos/${id}`);

        if (!response.ok) {
          throw new Error(
            `Erro na listagem dos produtos: ${response.status} - ${response.statusText}`,
          );
        }

        const data: TipoProduto = await response.json();
        setProduto(data);
      } catch (error) {
        console.error(error);
      }
    };
    carregaProduto();

  }, []);

  const handleUpdate = async () => {
    try {
      const response = await fetch(`http://localhost:3001/produtos/${produto.id}`, {
        method: "PUT",
        headers: {
          "Content:Type": "application/json"
        },
        body: JSON.stringify(produto)
      })
    
      if (!response.ok) {
        throw new Error(
          `Erro na listagem dos produtos: ${response.status} - ${response.statusText}`,
        );
        }

      alert("produto atualizado com sucesso")
      navigate("/produtos")
    }
    catch (error) {
      console.error(error)
    }
  }
  return (
    <main>
      <h2>Editar Produtos Lindos</h2>
      <h1>{id}</h1>
      <div>
        <form>
          <fieldset>
            <legend>Dados do produto:</legend>
            <div>
              <label htmlFor="nome">Nome do Produto</label>
              <input type="text" name="nome" id="nome" value={produto.nome} onChange={(e) => setProduto({...produto, nome:e.target.value })}/>
            </div>
            <div>
              <label htmlFor="preco">Preço do Produto</label>
              <input type="number" step={0.1} name="preco" id="preco" value={produto.preco} onChange={(e) => setProduto({ ...produto, preco: parseFloat(e.target.value) })} />
            </div>
            <div>
              <label htmlFor="descricao">Descricao do Produto</label>
              <input type="text" name="descricao" id="descricao" value={produto.descricao} onChange={(e) => setProduto({ ...produto, descricao: e.target.value })} />
            </div>
            <div>
              <label htmlFor="avatar">Foto do Produto</label>
              <figure>
                <img src={produto.avatar} alt={produto.nome} />
              </figure>
            </div>
            <div>
              <button type="button" onClick={()=> handleUpdate()}>Atualizar</button>
            </div>
          </fieldset>
        </form>
      </div>
    </main>
  );
}
