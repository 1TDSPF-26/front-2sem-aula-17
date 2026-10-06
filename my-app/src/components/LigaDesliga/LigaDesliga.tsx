import ligada from  "../../img/lampada-ligada.png";
import desligada from  "../../img/lampada-apagada.png";
import { useState } from "react";

export default function LigaDesliga() {

    const [isLigada, setIsLigada] = useState(false);


  return (
    <div>
        <h2>Liga Desliga</h2>
        <figure>
            <img src={isLigada ? ligada : desligada} alt="Lâmpada" width={isLigada ? 102 : 100} />
            <figcaption>Lâmpada {isLigada ? "Ligada" : "Desligada"}</figcaption>
        </figure>
        <button onClick={() => setIsLigada(!isLigada)}>
            {isLigada ? "Desligar" : "Ligar"}
        </button>
    </div>
  )
}
