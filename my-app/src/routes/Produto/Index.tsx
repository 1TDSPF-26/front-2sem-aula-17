import { useEffect, useState } from "react";
import { Link } from "react-router";
import CardProduto from "../../components/CardProduto";
import type { TipoProduto } from "../../types/types";
import { FaEdit } from "react-icons/fa";

export default function Produto() {
  document.title = "Produtos";

  const [produtos, setProdutos] = useState<TipoProduto[]>([]);

  useEffect(() => {
    async function carregaProdutos() {
      try {
        const response = await fetch("http://localhost:3001/produtos");

        if (!response.ok) {
          throw new Error("Erro na listagem dos produtos");
        }

        const data: TipoProduto[] = await response.json();
        setProdutos(data);
      } catch (error) {
        console.error(error);
      }
    }

    carregaProdutos();
  }, []);

  return (
    <main>
      <h2>Produtos</h2>
      <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
        {produtos.map((produto) => (
          <CardProduto key={produto.id} produto={produto} />
        ))}
      </div>
      <div>
        <table
          border={1}
          style={{
            width: "100%",
            borderCollapse: "collapse",
          }}
        >
          <thead>
            <tr>
              <th>ID</th>
              <th>NOME</th>
              <th>PREÇO</th>
              <th>DESCRIÇÃO</th>
              <th>AVATAR</th>
              <th>AÇÕES</th>
            </tr>
          </thead>
          <tbody>
            {produtos.map((produto) => (
              <tr key={produto.id}>
                <td>{produto.id}</td>
                <td>{produto.nome}</td>
                <td>{produto.preco}</td>
                <td>{produto.descricao}</td>
                <td>
                  <img src={produto.avatar} alt={produto.nome} width={40} />
                </td>
                <td>
                  <Link to={`/editar-produtos/${produto.id}`}><FaEdit /></Link>
                  <span>  </span>
                  <a href="#" onClick={(event) => event.preventDefault()}>
                    EXCLUIR
                  </a>
                  <Link to="#" onClick={() => alert}> </Link>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={6}>
                Quantidade de registros: {produtos.length}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </main>
  );
}
