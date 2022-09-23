import react from "react";

import palavras from "./palavras";
import forca0 from "./assets/forca0.png";
import forca1 from "./assets/forca1.png";
import forca2 from "./assets/forca2.png";
import forca3 from "./assets/forca3.png";
import forca4 from "./assets/forca4.png";
import forca5 from "./assets/forca5.png";
import forca6 from "./assets/forca6.png";

export default function App () {
    const alfabeto = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
    const forca = [forca0,forca1,forca2,forca3,forca4,forca5,forca6]
    
   let [erro,setErro] = react.useState(0) //conta o num de erros
   let [cor, setCor] = react.useState("palavra") // define o estilo da palavra
   let [carac,setCarac] = react.useState([]) // guarda a resposta em array
   let [input,setInput] = react.useState(true) //habilita o input
   let [iniciado,setIniciado] = react.useState(false) //habilita letras e desabilita iniciar
   let [usadas,setUsadas] = react.useState([]) //guarda letras usadas
   let [chave, setChave] = react.useState([]) //renderizado ao logo do jogo



    function Letra (props) {
        return (
            <button onClick={()=>{tentativa(props.funcao)}} className={usadas.includes(props.funcao)? "letra usada" : "letra"}>{props.letra}</button>
        )
    }

    function iniciar () {
        if (iniciado) {return}
        let index
        do { index = Math.floor(Math.random()*1000) } while (index > 231)
        let palavra = palavras[index]
        carac = palavra.split("")
        setCarac(carac)
        console.log(palavra, carac)
        
        for (let i = 1; i<=carac.length; i++) {chave.push("_ ")}

        setChave(chave)
        setInput(false)
        setIniciado(true)
    }
    
    function perdeu () {
    //     if (erro===6) {
    //         for (let i = 1; i<=carac.length; i++) {chave.push(carac[i]+" ")}
    //         setCod(chave)
    //         setCor("palavra vermelho")
    //     }
    }

    function tentativa (letra) {
       if(!iniciado){return}

       if(usadas.includes(letra)) {return}

       let u = [...usadas,letra]
       setUsadas(u)
       console.log(usadas)
    
       let newChave = chave
       if (carac.includes(letra)) {
        for (let i = 0; i<carac.length; i++) {
            if (letra===carac[i]) {newChave[i] = letra.toUpperCase()}
        }
        setChave(newChave)
        return
       }
       else {setErro(erro+1)}
    }

    return (
        <>
             <div className="topo">
                <div className="image"> <img src={forca[erro]} alt="imagem forca"/> </div>
                <div className="direita"> 
                    <button className="escolher" onClick={iniciar} >Escolher Palavra</button>
                    <div className={cor}>{chave}</div>
                </div>
            </div>

            <div className="teclado">
                {alfabeto.map((a,index) => <Letra key={index} letra={a.toUpperCase()} funcao={a}/>)}
            </div>

            <div className="container">
                <p>Já sei a palavra!</p>
                <input disabled={input}/> 
                <button className="chutar">Chutar</button>
            </div>
        </>
    )
}