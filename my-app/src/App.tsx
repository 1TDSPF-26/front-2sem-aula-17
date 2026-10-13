import { Outlet } from "react-router";
import Cabecalho from "./components/Cabecalho/Cabecalho";
import Conteudo from "./components/Conteudo/Conteudo";
import Rodape from "./components/Rodape/Rodape";

export default function App() {
  return (
    <div>
      <Cabecalho/>
      <Outlet/>
      <Rodape/>
    </div>
  )
}
