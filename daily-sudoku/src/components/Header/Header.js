import React from "react"
import "./Header.css"

export default function Header(props) {
    return (
        <div className="header-container">
            <div className="botoes-dificuldade">
               
                <h3 className="botao-dificuldade">FÁCIL</h3>
                <h3 className="botao-dificuldade">MÉDIO</h3>
                <h3 className="botao-dificuldade">DIFÍCIL</h3>

            </div>
            <h1 className="header-titulo">DAILY SUDOKU</h1>
            <div className="container-direita"></div>
        </div>

    )
}    