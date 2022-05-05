import logo from './logo.svg';
import React, {useState, useEffect} from "react"
import './App.css';
import axios from "axios";
import data from "./game.js"
import Tabuleiro from './components/Tabuleiro/Tabuleiro';
import Header from './components/Header/Header';

function App() {

  const [jogo, setJogo] = useState({});
  
  // { dificuldade: "dificil", tabuleiro: [
      // [{linha-coluna: [0,3] valor : 5, resposta: 8, clicado: true}
  // ]}


  useEffect(() => {
    
    axios
      .get("http://127.0.0.1:8000/api/sudoku/1/")
      .then((res) => {
        setJogo(res.data);
      })
    }, []);

  console.log(jogo)
  return (
    <div className="App"> 
      <Header/>
      <Tabuleiro data={jogo}/>

    </div>
  );
}

export default App;
