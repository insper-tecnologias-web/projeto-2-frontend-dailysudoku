import React, { useState } from "react"
import "./Quadrado.css"

export default function Quadrado(props) {
    // const indice = props.id[0].toString() + props.id[1].toString() - props.id[0]
    
    // {props.valor ? props.valor : ""}
    
    // console.log(props.objeto)
    

    let classeCssContainer = "";
    if (props.objeto.clicado){
        classeCssContainer = "quadrado-container-clicado"
    } else {
        classeCssContainer = "quadrado-container"
    }

    let focus 
    if (props.objeto.clicado){
        focus = "autofocus"
    }
    
    
    return (
        <div 
            onClick={(event) => props.atualizaClicado(event, props.objeto.id)}  
            className={classeCssContainer}
        >
            {props.objeto.clicado ? 
            <input 
                className="form-quadrado"
                type="number"
                onChange= {(event) => props.atualizaValor(event, props.objeto.id)}
                value={props.objeto.valor ? props.objeto.valor : ""} 
                autoFocus
            /> 
            : 
            <input 
                className="form-quadrado"
                type="number"
                onChange= {(event) => props.atualizaValor(event, props.objeto.id)}
                value={props.objeto.valor ? props.objeto.valor : ""} 
            />}
            
            {/* <h1 className="conteudo-quadrado">{props.objeto.valor}</h1> */}
        </div>
    )
}