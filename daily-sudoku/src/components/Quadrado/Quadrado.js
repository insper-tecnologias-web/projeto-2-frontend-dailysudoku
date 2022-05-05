import React from "react"
import "./Quadrado.css"

export default function Quadrado(props) {
    // {props.valor ? props.valor : ""}
    return (
        <div className="quadrado-container">
            <h1 className="conteudo-quadrado">{props.id[0]}{props.id[1]}</h1>
        </div>
    )
}