import logo from './logo.svg';
import React, {useState, useEffect} from "react"
import './App.css';
import axios from "axios";
import data from "./game.js"
import Tabuleiro from './components/Tabuleiro/Tabuleiro';
import Header from './components/Header/Header';

function App() {

  const [jogo, setJogo] = useState(null);

  useEffect(() => {
    
    axios
      .get("http://127.0.0.1:8000/api/sudoku/1/")
      .then((res) => {
        setJogo(res.data);
      })
    }, []);


  function atualizaClicado(event, id) {
    console.log(id)
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
    })  
  }

  function atualizaValor(event, id){
    let novoValor = event.target.value;
    

    setJogo((prevJogo) => {
      return (
        {
          dificuldade: prevJogo.dificuldade,

          tabuleiro: prevJogo.tabuleiro.map(obj => {
            if (obj.id === id && !obj.fixo) {
              return {...obj, valor: parseInt(novoValor.charAt(novoValor.length - 1))}      
            } else {
              return obj
            }
          }) ,
          
          ultimo_clicado : prevJogo.ultimo_clicado
        }
      )
    })  
    
  }
  
  return jogo && (
    <div className="App"> 
      <Header/> 
      <Tabuleiro data={jogo} atualizaClicado = {atualizaClicado} atualizaValor = {atualizaValor}/>

    </div>
  );
}

export default App;
