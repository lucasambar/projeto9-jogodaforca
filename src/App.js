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
   let [botao,setBotao] = react.useState("Escolher palavra") //texto do batão canto superior
   let [palavra, setPalavra] = react.useState("") //palvra resposta
   let [chute, setChute] =react.useState("") //pega o chute do input
    let [boa, setBoa] = react.useState("")
   

    function Letra (props) {
        return (
            <button onClick={()=>{tentativa(props.funcao)}} className={usadas.includes(props.funcao)? "letra usada" : "letra"}>{props.letra}</button>
        )
    }

    function iniciar () {
        setBotao("Mudar a palavra")
        setErro(0)
        setCor("palavra")
        setInput(false)
        let novaUsadas = []
        setUsadas(novaUsadas)

        let index
        do { index = Math.floor(Math.random()*1000) } while (index > 231)
        palavra = palavras[index]
        setPalavra(palavra)
        carac = palavra.split("")
        setCarac(carac)
        console.log(palavra, carac)
        
        let newChave = [];
        for (let i = 0; i<carac.length; i++) {newChave.push("_ ")}
        setChave(newChave)
        setIniciado(true)
    }
    
    function perdeu () {
        if (erro===5 || boa==="false") {
            setChave(carac)
            setCor("palavra vermelho")
            setIniciado(false)
            setInput(true)
            setBotao("Começar")
        }
    }

    function ganhou () {
        if (!chave.includes("_ ")|| boa==="true") {
            setChave(carac)
            setCor("palavra verde")
            setIniciado(false)
            setInput(true)
            setBotao("Começar")
        }
    }

    function tentativa (letra) {
    
        if (!iniciado) {return}
       if(usadas.includes(letra)) {return}

       let u = [...usadas,letra]
       setUsadas(u)
       console.log(usadas)

       let testar = []
       if (letra === "a") {testar=["a","á","â","ã"]}
        else if (letra === "c") {testar=["c","ç"]}
        else {testar = [letra]}
    


       let newChave;
       newChave = chave
       if (carac.includes(letra)) {
        for (let i = 0; i<carac.length; i++) {
            testar.forEach((a) => { if (a === carac[i]) {newChave[i] = a} } )
        }
        setChave(newChave)
        ganhou()
        return
       }

       else {
            setErro(erro+1)
            perdeu()
        }
    }

    function chutar () {
         chute = chute.toLowerCase()
         if(chute===palavra) {setBoa("true")
        ganhou()}
         else {setBoa("false")
        perdeu()}
    }

    return (
        <>
             <div className="topo">
                <div className="image"> <img src={forca[erro]} alt="imagem forca"/> </div>
                <div className="direita"> 
                    <button className="escolher" onClick={iniciar} >{botao}</button>
                    <div className={cor}>{chave}</div>
                </div>
            </div>

            <div className="teclado">
                {alfabeto.map((a,index) => <Letra key={index} letra={a.toUpperCase()} funcao={a}/>)}
            </div>

            <div className="container">
                <p>Já sei a palavra!</p>
                <input disabled={input} onChange={(e) => setChute(e.target.value)} value={chute}/> 
                <button className="chutar" onClick={chutar}>Chutar</button>
            </div>
        </>
    )
}