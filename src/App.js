import palavras from "./palavras";
import forca0 from "./assets/forca0.png";
import forca1 from "./assets/forca1.png";
import forca2 from "./assets/forca2.png";
import forca3 from "./assets/forca3.png";
import forca4 from "./assets/forca4.png";
import forca5 from "./assets/forca5.png";
import forca6 from "./assets/forca6.png";

function Letra (props) {
    return (
        <button className="letra">{props.letra}</button>
    )
}

export default function App () {
    const alfabeto = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
    const forca = [forca0,forca1,forca2,forca3,forca4,forca5,forca6]
    let erros = 0
    // let image = 
    return (
        <>
            <div class="topo">
                <div className="image"> <img src={forca[erros]} alt="imagem forca"/> </div>
                <div className="direita"> 
                    <button className="escolher">Escolher Palavra</button>
                </div> 
            </div>

            <div className="teclado">
                {alfabeto.map((a) => <Letra letra={a.toUpperCase()}/>)}
            </div>

            <div className="container">
                <p>Já sei a palavra!</p>
                <input/>
                <button className="chutar">Chutar</button>
            </div>
        </>
    )
}