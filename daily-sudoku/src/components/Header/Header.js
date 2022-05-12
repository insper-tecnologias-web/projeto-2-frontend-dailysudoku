import React from "react"
import "./Header.css"

export default function Header(props) {
    const styles = {
        color: "white"
    }
    return (
        <div className="header-container">
            <div className="botoes-dificuldade">
               
                <h3 className="botao-dificuldade" style = {props.dificuldade === "easy" ? styles : {}} 
                onClick={() => props.mudaDificuldade("easy")}>FÁCIL</h3>
            
                <h3 className="botao-dificuldade" style = {props.dificuldade === "medium" ? styles : {}} 
                onClick={() => props.mudaDificuldade("medium")}>MÉDIO</h3>

                <h3 className="botao-dificuldade" style = {props.dificuldade === "hard" ? styles : {}} 
                onClick={() => props.mudaDificuldade("hard")}>DIFÍCIL</h3>

            </div>
            <h1 className="header-titulo">DAILY SUDOKU</h1>
            <div className="container-direita"></div>
        </div>

    )
}    