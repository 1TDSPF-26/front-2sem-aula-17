import { useState } from "react";
import imgQuadrado from "../../img/quadrado.png";
import LigaDesliga from "../LigaDesliga/LigaDesliga";
import VerDataNasc from "../VerDataNasc/VerDataNasc";

export default function Conteudo() {
  let numeroComum = 0;

  //Estado do React
  
  const [mostraSection, setMostraSection] = useState(true);

  function aumentaVariavelComun() {
    numeroComum = numeroComum + 1;

    //O valor muda e aparece no console
    console.log("Variavel comum:", numeroComum);
    //Más não aparecerá na página
  }

  function verSection() {
    //O React altera o estado e renderiza novamente a página/componente.
    
    
    setMostraSection(!mostraSection);
  }
  
  return (
    <main>
      <section>
        <LigaDesliga />
        <VerDataNasc/>
      </section>
      <section>
        <h2>Conteúdo</h2>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Libero
          perspiciatis expedita beatae, at tempora praesentium nihil fuga illum
          aut, maiores consequuntur porro repellendus sit laudantium, nemo
          explicabo modi molestiae ipsa?
        </p>
      </section>
      <section>
        <h2>Imagem com link externo</h2>
        <figure>
          <img
            src="https://placehold.co/600x400/e1e1e1/000000/png"
            alt="Imagem de exemplo de 600x400px"
          />
          <figcaption>Imagem de exemplo de 600x400px</figcaption>
        </figure>
      </section>
      <section>
        <h2>Imagem com referência interna</h2>
        <figure>
          <img src={imgQuadrado} alt="Imagem quadrada 400x400px" />
          <figcaption>Imagem de exemplo 400x400px</figcaption>
        </figure>
      </section>
      <section style={{"display": mostraSection ? "block" : "none"}}>
        <h2>Imagem com referência interna estática</h2>
        <figure>
          <img src="/image/lampada.png" alt="Lampada de Desenho." />
          <figcaption>Imagem de exemplo estática - Lâmpada</figcaption>
        </figure>
      </section>
        <button onClick={verSection}>{mostraSection ? "Ocultar" : "Mostrar"}</button>
    </main>
  );
}
