import React from "react"
import Quadrado from "../Quadrado/Quadrado"
import "./Bloco.css"

export default function Bloco(props) {

    // console.log(props.data)
    return (
        <div className="bloco-container">
            <div className="bloco-linha">
                <Quadrado 
                    linhaCol = {[props.blocoi * 3, props.blocoj*3]} 
                    objeto = {props.data.tabuleiro[(props.blocoi * 3).toString() + (props.blocoj*3).toString() - (props.blocoi * 3)]}
                    atualizaClicado={props.atualizaClicado}
                />

                <Quadrado 
                    linhaCol = {[props.blocoi * 3, props.blocoj*3 + 1]} 
                    objeto = {props.data.tabuleiro[(props.blocoi * 3).toString() + (props.blocoj*3 + 1).toString() - (props.blocoi * 3)]}
                    atualizaClicado={props.atualizaClicado}
                />
                
                <Quadrado 
                    linhaCol = {[props.blocoi * 3, props.blocoj*3 + 2]} 
                    objeto = {props.data.tabuleiro[(props.blocoi * 3).toString() + (props.blocoj*3 + 2).toString() - (props.blocoi * 3)]}
                    atualizaClicado={props.atualizaClicado}
                />
            </div>

            <div className="bloco-linha">
                <Quadrado 
                    linhaCol = {[props.blocoi * 3 + 1, props.blocoj*3]}
                    objeto = {props.data.tabuleiro[(props.blocoi * 3 + 1).toString() + (props.blocoj*3).toString() - (props.blocoi * 3 + 1)]}
                    atualizaClicado={props.atualizaClicado}
                 />
                 
                <Quadrado 
                    linhaCol = {[props.blocoi * 3 + 1, props.blocoj*3 + 1]} 
                    objeto = {props.data.tabuleiro[(props.blocoi * 3 + 1).toString() + (props.blocoj*3 + 1).toString() - (props.blocoi * 3 + 1)]}
                    atualizaClicado={props.atualizaClicado}
                />
                
                <Quadrado 
                    linhaCol = {[props.blocoi * 3 + 1, props.blocoj*3 + 2]} 
                    objeto = {props.data.tabuleiro[(props.blocoi * 3 + 1).toString() + (props.blocoj*3 + 2).toString() - (props.blocoi * 3 + 1)]}
                    atualizaClicado={props.atualizaClicado}
                />
            </div>
            
            <div className="bloco-linha">
                <Quadrado 
                    linhaCol = {[props.blocoi * 3 + 2, props.blocoj*3]} 
                    objeto = {props.data.tabuleiro[(props.blocoi * 3 + 2).toString() + (props.blocoj*3).toString() - (props.blocoi * 3 + 2)]}
                    atualizaClicado={props.atualizaClicado}
                />

                <Quadrado 
                    linhaCol = {[props.blocoi * 3 + 2, props.blocoj*3 + 1]} 
                    objeto = {props.data.tabuleiro[(props.blocoi * 3 + 2).toString() + (props.blocoj*3 + 1).toString() - (props.blocoi * 3 + 2)]}
                    atualizaClicado={props.atualizaClicado}
                />
                
                <Quadrado 
                    linhaCol = {[props.blocoi * 3 + 2, props.blocoj*3 + 2]} 
                    objeto = {props.data.tabuleiro[(props.blocoi * 3 + 2).toString() + (props.blocoj*3 + 2).toString() - (props.blocoi * 3 + 2)]}
                    atualizaClicado={props.atualizaClicado}
                />
            </div>
            
        </div>
    )
}