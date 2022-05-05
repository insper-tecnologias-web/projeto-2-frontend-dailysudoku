import React from "react";
import Bloco from "../Bloco/Bloco";
import "./Tabuleiro.css"



export default function Tabuleiro(props){

    return (
        <div className= "tabuleiro-container">
            <div className= "tabuleiro-linha">
                <Bloco/>
                <Bloco/>
                <Bloco/>
            </div>

            <div className= "tabuleiro-linha">
                <Bloco/>
                <Bloco/>
                <Bloco/>
            </div>

            <div className= "tabuleiro-linha">
                <Bloco/>
                <Bloco/>
                <Bloco/>
            </div>
        </div>
    )
}