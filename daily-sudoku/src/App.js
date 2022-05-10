import logo from './logo.svg';
import React, {useState, useEffect, useRef} from "react"
import './App.css';
import axios from "axios";
import data from "./game.js"
import Tabuleiro from './components/Tabuleiro/Tabuleiro';
import Header from './components/Header/Header';
import Popup from './components/Popup/Popup';


function App() {

  const [jogo, setJogo] = useState(null);
  const [sudoku, setSudoku] = useState(false);
  const [popup, setPopup] = useState(false);
  //const [cursor, setCursor] = useState(0);

  const [focus, setFocus] = useState(0);


  console.log(`focus ${focus}`)
  // if (jogo){
  //   console.log(jogo.tabuleiro)
  // }
  
  useEffect(() => {
    
    axios
      .get("http://127.0.0.1:8000/api/sudoku/1/")
      .then((res) => {
        setJogo(res.data);
      })
    }, []);

  useEffect(() => {
      if (jogo){
        for (let obj of jogo.tabuleiro){
          if (obj.valor !== obj.resposta) {
            return;
          }
        }
        
        setSudoku(true);
        setPopup(true);
        console.log("venceu!")
      } 
    }, [jogo])

    useEffect(() => {
      if (sudoku) {
        setJogo((prevJogo) => {
          return (
            {
              dificuldade: prevJogo.dificuldade,
    
              tabuleiro: prevJogo.tabuleiro.map(obj => {           
                return {...obj, fixo: true, clicado: false}
              }),
              
              ultimo_clicado : -1
            }
          )
        })
      } 
    }, [sudoku])

  function closeModal(){
    setPopup(false);
  }

  function atualizaClicado(event, id) {
    console.log(id)
    setFocus(id)

    if (!sudoku){
      setJogo((prevJogo) => {
        return (
          {
            dificuldade: prevJogo.dificuldade,

            tabuleiro: prevJogo.tabuleiro.map(obj => {
              if (obj.id === id) {
                return {...obj, clicado: true}

              } else if (obj.id === prevJogo.ultimo_clicado){
                return {...obj, clicado: false}
                
              } else {
                return obj
              }
            }) ,
            
            ultimo_clicado : id
          }
        )
    })}  
  }

  function atualizaClicadoSeta(event, id, linhaColuna){
    let arrows = ["ArrowLeft","ArrowUp","ArrowRight","ArrowDown","0"];

    if (arrows.includes(event.key)){
      event.preventDefault();
      verificaNovoCLicado(event.key, id, linhaColuna);
    }

  }
  
  function verificaNovoCLicado(key, id, linhaColuna){
    const [i, j] = linhaColuna;
    // console.log(`i: ${i}, j: ${j}`);
    // console.log(`typeof(i): ${typeof(i)}, typeof(j): ${typeof(j)}`);

    switch (key) {
      case 'ArrowLeft':
        if (j !== 0){
          atualizaClicado(null,(id - 1));
        }
        break;
      case 'ArrowUp':
        if (i !== 0){
          atualizaClicado(null,(id - 9));
        }
        break
      case 'ArrowRight':
        if (j !== 8){
          atualizaClicado(null,(id + 1));
        }
        break;
      case 'ArrowDown':
        if (i !== 8){
          atualizaClicado(null,(id + 9));
        }
        break
      default:
        break; 
  }
}

function onClickFocus(){}

  function atualizaValor(event, objeto){
    // console.log("atualiza valor")
    var novoValor = event.target.value;

    const tabuleiroVerifica = jogo.tabuleiro.map(objMap => {
      if (objMap.id === objeto.id){
        return {...objMap, valor: parseInt(novoValor.charAt(novoValor.length - 1))}
      } else{
        return objMap;
      }
    })

    const listaErrados = verificaResposta(novoValor, objeto, tabuleiroVerifica)
    // console.log(listaErrados)

    // console.log(tabuleiroVerifica)

    setJogo((prevJogo) => {
      return (
        {
          dificuldade: prevJogo.dificuldade,

          tabuleiro: prevJogo.tabuleiro.map(objMap => {

            let erradoIndividual = listaErrados.includes(objMap.id)

            if (objMap.id === objeto.id && !objMap.fixo) {
              return {...objMap, valor: parseInt(novoValor.charAt(novoValor.length - 1)), errado: erradoIndividual}

            } else {
              return {...objMap, errado: erradoIndividual}   
            }
          }) ,
          
          ultimo_clicado : prevJogo.ultimo_clicado
        }
      )
    })  

  
    
    
  }

  function verificaResposta(novoValor,objeto, tabuleiroAtualizado){
    
    let listaErrados = []
    // console.log("Verificando para");
    // console.log(objeto);
    let [i, j] = objeto["linha-coluna"];
    novoValor = parseInt(novoValor.charAt(novoValor.length - 1));

    //Verifica linha
    // console.log(`*****************************************`)
    for (let objetoFor of tabuleiroAtualizado) {

      if (objeto.id === objetoFor.id){
        continue;
      }

      else if ((objetoFor["linha-coluna"][0] === i || objetoFor["linha-coluna"][1] === j) && objetoFor.valor === novoValor) {
        listaErrados.push(objetoFor.id);
      }
    
      else if((Math.floor(objetoFor["linha-coluna"][0] / 3) === Math.floor(i / 3) 
      && Math.floor(objetoFor["linha-coluna"][1] / 3) === Math.floor(j / 3)) 
      && objetoFor.valor === novoValor) {
        listaErrados.push(objetoFor.id)
      }
      
      
      // console.log(`-----------------------------------------------`)
      // console.log(`objetoFor["linha-coluna"]: ${objetoFor["linha-coluna"]}`)
      // console.log(`objetoFor.id: ${objetoFor.id}`)
      // console.log(`objetoFor.valor: ${objetoFor.valor}`)
      // console.log(`novoValor: ${novoValor}`)

    
      // console.log(`i:${i} j: ${j}`)  
      // console.log((objetoFor["linha-coluna"][0] % 3 === i % 3 && objetoFor["linha-coluna"][1] % 3 === j % 3) && objetoFor.valor === novoValor)
      // console.log(`objetoFor["linha-coluna"][0] % 3: ${Math.floor(objetoFor["linha-coluna"][0] / 3)}`)
      // console.log(`i % 3: ${Math.floor(i / 3)}`)
      // console.log(`objetoFor["linha-coluna"][1] % 3: ${Math.floor(objetoFor["linha-coluna"][1] / 3)}`)
      // console.log(`j % 3: ${Math.floor(j / 3)}`)

  }
  
  if (listaErrados.length > 0){
    listaErrados.push(objeto.id)
  }


  return listaErrados;
}

  
  return jogo && (
    <div className="App"> 
      <Header/> 
      <div className = "app-container">
        <Tabuleiro data={jogo} atualizaClicado = {atualizaClicado} atualizaValor = {atualizaValor} atualizaClicadoSeta = {atualizaClicadoSeta} focus = {focus}/>
      </div>
      {popup && <Popup closeModal={closeModal}/>}
    </div>
    
  );
}

export default App;

