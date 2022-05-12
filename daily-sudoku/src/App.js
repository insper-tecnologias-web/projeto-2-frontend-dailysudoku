import logo from './logo.svg';
import React, {useState, useEffect, useRef} from "react"
import './App.css';
import axios from "axios";
import data from "./game.js"
import Tabuleiro from './components/Tabuleiro/Tabuleiro';
import Header from './components/Header/Header';
import Popup from './components/Popup/Popup';


function App() {

  const [tresJogos, setTresJogos] = useState({});
  const [jogo, setJogo] = useState(null);
  const [sudoku, setSudoku] = useState(false);
  const [popup, setPopup] = useState(false);
  const [focus, setFocus] = useState(0);
  const [listaErrados, setListaErrados] = useState([]);
  const [dificuldade, setDificuldade] = useState("easy");

  useEffect(() => {
    // localStorage.clear();
    const listaStorage = ['vitoriasEasy', 'sequenciaEasy', 'listaJaJogadosEasy',
                      'vitoriasMedium', 'sequenciaMedium', 'listaJaJogadosMedium',
                      'vitoriasHard', 'sequenciaHard', 'listaJaJogadosHard',]
        
    for (let storageItem of listaStorage){
      
      if (!localStorage.getItem(storageItem)){

        if (storageItem.substring(0,5) === 'lista' && jogo){
          if (jogo.dificuldade === "easy" && storageItem === 'listaJaJogadosEasy'){
            let jogosJogados = [jogo.id]
            localStorage.setItem(storageItem,JSON.stringify(jogosJogados))
          }
          else if (jogo.dificuldade === "medium" && storageItem === 'listaJaJogadosMedium'){
            let jogosJogados = [jogo.id]
            localStorage.setItem(storageItem,JSON.stringify(jogosJogados))
          }
          else if (jogo.dificuldade === "hard" && storageItem === 'listaJaJogadosHard'){
            let jogosJogados = [jogo.id]
            localStorage.setItem(storageItem,JSON.stringify(jogosJogados))
          } else{
            let jogosJogados = []
            localStorage.setItem(storageItem,JSON.stringify(jogosJogados))
          }
          
        } else {
          localStorage.setItem(storageItem, 0)
        }


    
      } else if (storageItem.substring(0,5) === 'lista' && jogo) {

          let jogosJogados = JSON.parse(localStorage.getItem(storageItem))

          if (jogo.dificuldade === "easy" && storageItem === 'listaJaJogadosEasy' && !jogosJogados.includes(jogo.id)){
            jogosJogados.push(jogo.id)
            localStorage.setItem(storageItem,JSON.stringify(jogosJogados))
          }
          else if (jogo.dificuldade === "medium" && storageItem === 'listaJaJogadosMedium' && !jogosJogados.includes(jogo.id)){
            jogosJogados.push(jogo.id)
            localStorage.setItem(storageItem,JSON.stringify(jogosJogados))
          }
          else if (jogo.dificuldade === "hard" && storageItem === 'listaJaJogadosHard' && !jogosJogados.includes(jogo.id)){
            jogosJogados.push(jogo.id)
            localStorage.setItem(storageItem,JSON.stringify(jogosJogados))
          }

      }
      console.log(`${storageItem}: ${localStorage.getItem(storageItem)}`);
      }
  }, [tresJogos])

  if (jogo){
    console.log(`jogo.id: ${jogo.id}`)
  }
  
  useEffect(() => {
    
    axios
      .get("http://127.0.0.1:8000/api/sudoku/ultimo-jogo/easy/")
      .then((res) => {
        setTresJogos(prevJogos => ({
          ...prevJogos,
          easy: res.data 
        }));
      }).then(
        axios
          .get("http://127.0.0.1:8000/api/sudoku/ultimo-jogo/medium/")
          .then((res) => {
            setTresJogos(prevJogos => ({
              ...prevJogos,
              medium: res.data 
            }));
        })
        ).then(
          axios
            .get("http://127.0.0.1:8000/api/sudoku/ultimo-jogo/hard/")
            .then((res) => {
              setTresJogos(prevJogos => ({
                ...prevJogos,
                hard: res.data 
              }));
            }))
      
      }, []);
  

  useEffect(() => {
    if (!jogo){
      setJogo(tresJogos[dificuldade])
    }
  }, [tresJogos]);
 

  useEffect(() => {
    if (Object.keys(tresJogos).length === 3){
      setFocus(tresJogos[dificuldade].ultimo_clicado);
      setTresJogos(prevTresJogos => {
        return ({
          ...prevTresJogos,
          [jogo.dificuldade]: jogo
        })
        
      })
      setJogo(tresJogos[dificuldade])
      console.log("chamei use effect")
    }
    
  }, [dificuldade])

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
              venceu: true,
              ultimo_clicado : -1
            }
          )
        })
      }
      let vitorias = localStorage.getItem('vitorias')
      if (jogo && !jogo.venceu){
        localStorage.setItem('vitorias', parseInt(vitorias) + 1)
        vitorias = localStorage.getItem('vitorias')
      }
      
      console.log(`vitorias ${vitorias}`)
      
    }, [sudoku])

  function closeModal(){
    setPopup(false);
  }

  function mudaDificuldade(novaDificuldade){
    setDificuldade(novaDificuldade);
    // console.log(novaDificuldade);
    // console.log(`Quantidade de keys em tres jogos: ${Object.keys(tresJogos).length}`)
    // console.log(`Tres jogos easy: ${tresJogos.easy}`)
    // console.log(tresJogos.easy)
    // console.log(`Tres jogos medium: ${tresJogos.medium}`)
    // console.log(tresJogos.medium)
    // console.log(`Tres jogos hard: ${tresJogos.hard}`)
    // console.log(tresJogos.hard)
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

  function atualizaValor(event, objeto){
    
    var novoValor = event.target.value;

    const tabuleiroVerifica = jogo.tabuleiro.map(objMap => {
      if (objMap.id === objeto.id && !objMap.fixo){
        return {...objMap, valor: parseInt(novoValor.charAt(novoValor.length - 1))}
      } else{
        return objMap;
      }
    })

    let novoObjeto
    if (!objeto.fixo){
      novoObjeto = {...objeto, valor: parseInt(novoValor.charAt(novoValor.length - 1))}
    } else{
      novoObjeto = objeto
    }
    
    const listaErrados = atualizaErros(novoObjeto, tabuleiroVerifica)
    setListaErrados(listaErrados);

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

  function atualizaErros(objeto, tabuleiroAtualizado){
    
    let objetosParaVerificar = listaErrados.map(idErrado => tabuleiroAtualizado[idErrado])
    objetosParaVerificar.push(objeto)

    let listaNovosErros = []
    
    for (let objetoParaVerificar of objetosParaVerificar){
      // console.log(`verificando para ${objetoParaVerificar.id}`);
      // console.log(`********************`);
      let [i, j] = objetoParaVerificar["linha-coluna"];
      let valorVerificado = objetoParaVerificar.valor

      let tamanhoInicial = listaNovosErros.length

      for (let objetoFor of tabuleiroAtualizado) {
        
        // Pula ele mesmo
        if (objetoParaVerificar.id === objetoFor.id){
          continue;
        }

        // verifica linha e coluna
        else if ((objetoFor["linha-coluna"][0] === i || objetoFor["linha-coluna"][1] === j) && objetoFor.valor === valorVerificado && valorVerificado !== 0) {
          console.log(`Entrei no erro linha e coluna com ${objetoFor.id}`)
          if (!listaNovosErros.includes(objetoParaVerificar.id)){
            listaNovosErros.push(objetoParaVerificar.id)
          }
          if (!listaNovosErros.includes(objetoFor.id)){
            listaNovosErros.push(objetoFor.id)
          }
          console.log(`lista novos erros: ${listaNovosErros}`)
        }
      
        // Verifica bloco
        else if((Math.floor(objetoFor["linha-coluna"][0] / 3) === Math.floor(i / 3) 
        && Math.floor(objetoFor["linha-coluna"][1] / 3) === Math.floor(j / 3)) 
        && objetoFor.valor === valorVerificado && valorVerificado !== 0) {
          console.log(`Entrei no erro bloco com ${objetoFor.id}`)
          if (!listaNovosErros.includes(objetoParaVerificar.id)){
            listaNovosErros.push(objetoParaVerificar.id)
          }
          if (!listaNovosErros.includes(objetoFor.id)){
            listaNovosErros.push(objetoFor.id)
          }
          // console.log(`lista novos erros: ${listaNovosErros}`)
        }
      }
    }

    return listaNovosErros;
}

  
  return jogo && (
    <div className="App"> 
      <Header mudaDificuldade = {mudaDificuldade} dificuldade = {dificuldade}/> 
      <div className = "app-container">
        <Tabuleiro data={jogo} atualizaClicado = {atualizaClicado} atualizaValor = {atualizaValor} atualizaClicadoSeta = {atualizaClicadoSeta} focus = {focus}/>
      </div>
      {popup && <Popup closeModal={closeModal}/>}
    </div>
    
  );
}

export default App;