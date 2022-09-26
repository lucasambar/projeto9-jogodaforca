import react from "react";
import styled from "styled-components";

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
    
    let [erro,setErro] = react.useState(0) 
    let [cor, setCor] = react.useState("palavra") 
    let [carac,setCarac] = react.useState([]) 
    let [input,setInput] = react.useState(true) 
    let [iniciado,setIniciado] = react.useState(false)  
    let [usadas,setUsadas] = react.useState([]) 
    let [chave, setChave] = react.useState([]) 
    let [botao,setBotao] = react.useState("Escolher palavra") 
    let [palavra, setPalavra] = react.useState("") 
    let [chute, setChute] =react.useState("")  
    let [boa, setBoa] = react.useState("")
   

    function Letra (props) {
        return (
            <Letra onClick={()=>{tentativa(props.funcao)}} className={usadas.includes(props.funcao)? "letra usada" : "letra"}>{props.letra}</Letra>
        )
    }

    function iniciar () {
        setBotao("Mudar a palavra")
        setErro(0)
        setCor("palavra")
        setInput(false)
        setChute("")
        setBoa("")

        let novaUsadas = []
        setUsadas(novaUsadas)

        let index
        do { index = Math.floor(Math.random()*1000) } while (index > 231)
        palavra = palavras[index]
        setPalavra(palavra)
        carac = palavra.split("")
        setCarac(carac)
       
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

       let testar = []
        if (letra === "a") {testar=["a","á","â","ã"]}
        else if (letra === "c") {testar=["c","ç"]}
        else if (letra === "e") {testar=["e","é","ê"]}
        else if (letra === "i") {testar=["i","í"]}
        else if (letra === "o") {testar=["o","ó","ô"]}
        else if (letra === "u") {testar=["u","ú"]}
        else {testar = [letra]}
        
       let newChave = chave
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
         if(chute===palavra) {setBoa("true")
        ganhou()}
         else {setBoa("false")
        perdeu()}
    }

    return (
        <>
             <Topo>
                <Image> <img src={forca[erro]} alt="imagem forca"/> </Image>
                <Direita> 
                    <button onClick={iniciar} >{botao}</button>
                    <Palavra cor={cor}>{chave}</Palavra>
                </Direita>
            </Topo>

            <Teclado>
                {alfabeto.map((a,index) => <Letra key={index} letra={a.toUpperCase()} funcao={a}/>)}
            </Teclado>

            <Conteiner>
                <p>Já sei a palavra!</p>
                <input disabled={input} onChange={(e) => setChute(e.target.value)} value={chute}/> 
                <button className="chutar" onClick={chutar}>Chutar</button>
            </Conteiner>
        </>
    )
}


const Topo = styled.div`
    display: flex;
    justify-content: space-between;
`
const Image = styled.div`
    width: 50%;
    display: flex;
    justify-content: center;

    img {
        height: 370px;
        margin-top: 30px;
        margin-bottom: 20px;
    }
`
const Direita = styled.div`
    width: 50%;
    height: 420px;

    display: flex;
    flex-direction: column;
    justify-content: space-between;

    padding-top: 30px;
    padding-bottom: 40px;

    button {
        height: 30px;
        width: 150px;
        background-color: #46A471;
        border: none;
        border-radius: 10px;

        color: white;
        font-weight: 700;

        margin: auto;
    }

`
const Palavra = styled.p`
        font-size: 50px;
        font-weight: 700;

        margin: auto;
        display: block;
`
const Teclado = styled.div`
    width: 580px;

    display: flex;
    flex-wrap: wrap;
    gap: 6px;

    margin: auto;
    margin-bottom: 30px;
`
const Letra = styled.div`

`
const Conteiner = styled.div`
    width: 520px;

    display: flex;
    justify-content: space-between;
    align-items: center;

    margin: auto;

    p{
        font-size: 20px;
    }

    input{
        width: 300px;
        height: 30px;
        border-radius: 5px;
        border-color: #B8B8B8;
    }

    button {
        width: 60px;
        height: 30px;
        background-color: #E1ECF4;
        border-color: #527B9E;
        border-width: 2.5px;
        border-radius: 5px;

        color: #527B9E;
        font-weight: 700;
    }
`
