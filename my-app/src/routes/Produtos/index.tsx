import { useEffect, useState } from "react"
import type { tipoProduto } from "../../types/types";
import { Link, useNavigate } from "react-router";
import CardProduto from "../../components/CardProduto";
import { FaEdit as Editar } from "react-icons/fa";
import { MdDeleteForever as Excluir } from "react-icons/md";

export default function Produtos() {
  document.title = "Home"

  const navigate =  useNavigate();

  const [produtos, setProdutos] = useState<tipoProduto[]>([]);

  useEffect( ()=>{
    const carregarProdutos = async ()=> {

      try{
        const response = await fetch("http://localhost:3001/produtos");
        
        if(!response.ok){
          throw new Error(`Erro na listagem dos produtos: ${response.status} - ${response.statusText}`);
        }

        const data:tipoProduto[] = await response.json();
        setProdutos(data);

      } catch (error){
        console.error(error);
      }

    }

    carregarProdutos();

  }, []);

  const handleDelete = async (id:string) => {
    try {

      const response = await fetch(`http://localhost:3001/produtos/${id}`, {
        method: "DELETE"
      });

      //tratamento de erro
      if (!response.ok) {
        throw new Error(`Erro na exclusão do produto: ${response.status} - ${response.statusText}`);
      }

      //SUCESSO
      alert("Produto excluido com sucesso.");

      //REDIRECT
      navigate("/");

    } catch (error) {
      console.error(error);
    }
  }

  
  return (
    <main>
        <h2>Produtos</h2>
        <div style={{display: "flex", gap: "16px", flexWrap: "wrap"}}>
          {produtos.map((produto)=>(
            <CardProduto key={produto.id} produto={produto}/>
          ))}

        </div>

        <div>
          <table border={1} style={{width: "100%", borderCollapse: "collapse", border: "1px solid black"}}>
            
            <thead>
              <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>Preço</th>
                <th>Descrição</th>
                <th>Avatar</th>
                <th>Ações</th>
              </tr>
            </thead>

            <tbody>
              {produtos.map( (produto)=>(
                <tr key={produto.id}>
                  <td>{produto.id}</td>
                  <td>{produto.nome}</td>
                  <td>{produto.preco}</td>
                  <td>{produto.descricao}</td>
                  <td><img src={produto.avatar} alt={produto.nome} width={40} /></td>
                  <td>
                    <Link to={`/editar-produto/${produto.id}`}><Editar/></Link> / 
                    <Link to="#" onClick={()=> handleDelete(produto.id)}><Excluir /></Link>
                  </td>
                </tr>
              ))}
            </tbody>

            <tfoot>
              <tr>
                <td colSpan={6}>Quantidade de registros: {produtos.length}</td>
              </tr>
            </tfoot>

          </table>
        </div>

    </main>
  )
}
