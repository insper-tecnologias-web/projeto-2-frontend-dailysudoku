import logo from './logo.svg';
import React, {useState, useEffect} from "react"
import './App.css';
import axios from "axios";
import data from "./game.js"
import Tabuleiro from './components/Tabuleiro/Tabuleiro';

function App() {

  const [tabuleiro, setTabuleiro] = useState({});


  // useEffect(() => {
    
  //   axios
  //     .get("http://127.0.0.1:8000/api/sudoku/1")
  //     .then((res) => {
  //       // setNotes(res.data)
  //       console.log(res.data)
  //     })
  //   }, []);

  console.log(data)
  
  return (
    <div className="App"> 
      <Tabuleiro/>

    </div>
  );
}

export default App;
