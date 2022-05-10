import React from "react";
import Bloco from "../Bloco/Bloco";
import "./Tabuleiro.css"



export default function Tabuleiro(props){


    return (
        <div className= "tabuleiro-container">
            <div className= "tabuleiro-linha">
                <Bloco blocoi={0} blocoj={0} data={props.data} atualizaClicado={props.atualizaClicado} atualizaValor = {props.atualizaValor} atualizaClicadoSeta = {props.atualizaClicadoSeta} focus = {props.focus}/>
                <Bloco blocoi={0} blocoj={1} data={props.data} atualizaClicado={props.atualizaClicado} atualizaValor = {props.atualizaValor} atualizaClicadoSeta = {props.atualizaClicadoSeta} focus = {props.focus}/>
                <Bloco blocoi={0} blocoj={2} data={props.data} atualizaClicado={props.atualizaClicado} atualizaValor = {props.atualizaValor} atualizaClicadoSeta = {props.atualizaClicadoSeta} focus = {props.focus}/>
            </div>

            <div className= "tabuleiro-linha">
                <Bloco blocoi={1} blocoj={0} data={props.data} atualizaClicado={props.atualizaClicado} atualizaValor = {props.atualizaValor} atualizaClicadoSeta = {props.atualizaClicadoSeta} focus = {props.focus}/>
                <Bloco blocoi={1} blocoj={1} data={props.data} atualizaClicado={props.atualizaClicado} atualizaValor = {props.atualizaValor} atualizaClicadoSeta = {props.atualizaClicadoSeta} focus = {props.focus}/>
                <Bloco blocoi={1} blocoj={2} data={props.data} atualizaClicado={props.atualizaClicado} atualizaValor = {props.atualizaValor} atualizaClicadoSeta = {props.atualizaClicadoSeta} focus = {props.focus}/>
            </div>

            <div className= "tabuleiro-linha">
                <Bloco blocoi={2} blocoj={0} data={props.data} atualizaClicado={props.atualizaClicado} atualizaValor = {props.atualizaValor} atualizaClicadoSeta = {props.atualizaClicadoSeta} focus = {props.focus}/>
                <Bloco blocoi={2} blocoj={1} data={props.data} atualizaClicado={props.atualizaClicado} atualizaValor = {props.atualizaValor} atualizaClicadoSeta = {props.atualizaClicadoSeta} focus = {props.focus}/>
                <Bloco blocoi={2} blocoj={2} data={props.data} atualizaClicado={props.atualizaClicado} atualizaValor = {props.atualizaValor} atualizaClicadoSeta = {props.atualizaClicadoSeta} focus = {props.focus}/>
            </div>
        </div>
    )
}