import React from "react";
import "./Header.css";

export default function Header(props) {
    // Cor do botão clicado
    const styles = {
        color: "white",
    };
    return (
        <div className="header-container">
            <div className="botoes-dificuldade">
                <h3
                    className="botao-dificuldade"
                    style={props.dificuldade === "easy" ? styles : {}}
                    onClick={() => props.mudaDificuldade("easy")}
                >
                    EASY
                </h3>

                <h3
                    className="botao-dificuldade"
                    style={props.dificuldade === "medium" ? styles : {}}
                    onClick={() => props.mudaDificuldade("medium")}
                >
                    MEDIUM
                </h3>

                <h3
                    className="botao-dificuldade"
                    style={props.dificuldade === "hard" ? styles : {}}
                    onClick={() => props.mudaDificuldade("hard")}
                >
                    HARD
                </h3>
            </div>
            <h1 className="header-titulo">DAILY SUDOKU</h1>
            <div className="container-direita">
                <div className="by">Made By: Eduardo Cunha & Paulo Falcão </div>
                {/* <div className="paulo"></div>
                <div className="eduardo"></div> */}
            </div>
        </div>
    );
}
