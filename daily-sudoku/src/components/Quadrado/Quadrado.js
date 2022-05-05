import React from "react"
import "./Quadrado.css"

export default function Quadrado(props) {
    const valor = props.valor ? props.valor : ""
    return (
        <div className="quadrado-container">
            <h1 className="conteudo-quadrado">{valor}</h1>
        </div>
    )
}