import React, { useState } from "react"
import "./Quadrado.css"

export default function Quadrado(props) {

    let classeCssContainer = "";
    if (props.objeto.clicado){
        classeCssContainer = "quadrado-container-clicado"
    } else {
        classeCssContainer = "quadrado-container"
    }

    let styles = {
        backgroundColor: props.objeto.errado ? "#EE2A5D" : "transparent"
    }

    let focus 
    if (props.objeto.clicado){
        focus = "autofocus"
    }
    if (props.focus === props.objeto.id && document.getElementById(`input-${props.objeto.id}`)){
        document.getElementById(`input-${props.objeto.id}`).focus()
    }
    
    
    return (
        <div 
            onClick={(event) => props.atualizaClicado(event, props.objeto.id)} 
            onKeyDown={(event) => {
                console.log(`Quem chamou foi o ${props.objeto.id}`)
                props.atualizaClicadoSeta(event, props.objeto.id, props.objeto["linha-coluna"])
            }} 
            className={classeCssContainer}
            style={styles}
        >
            <h4>{props.objeto.id}</h4>
            <input 
                className="form-quadrado"
                type="number"
                onChange= {(event) => props.atualizaValor(event, props.objeto)}
                value={props.objeto.valor ? props.objeto.valor : ""} 
                // value = {props.objeto.id}
                autoFocus = {props.focus === props.objeto.id}
                id = {`input-${props.objeto.id}`}
            /> 
            {/* {props.objeto.clicado ? 

            : 
            <input 
                className="form-quadrado"
                type="number"
                onChange= {(event) => props.atualizaValor(event, props.objeto)}
                value={props.objeto.valor ? props.objeto.valor : ""} 
                // value = {props.objeto.id}
            />} */}
            
            
        </div>
    )
}