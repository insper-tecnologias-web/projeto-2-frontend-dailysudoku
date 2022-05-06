import React, { useState } from "react"
import "./Quadrado.css"

export default function Quadrado(props) {
    // const indice = props.id[0].toString() + props.id[1].toString() - props.id[0]
    
    // {props.valor ? props.valor : ""}
    
    // console.log(props.objeto)
    const [valor,setValor] = useState(props.objeto.valor);

    

    let classeCssContainer = "";
    if (props.objeto.clicado){
        classeCssContainer = "quadrado-container-clicado"
    } else {
        classeCssContainer = "quadrado-container"
    }
    
    
    return (
        <div onClick={(event) => props.atualizaClicado(event, props.objeto.id)} className={classeCssContainer}>
            {/* <input 
                className="conteudo-quadrado"
                placeholder = {valor ? valor : ""} 
                value = {valor}
            /> */}
            <h1 className="conteudo-quadrado">{valor}</h1>
        </div>
    )
}