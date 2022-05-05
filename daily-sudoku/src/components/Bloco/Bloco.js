import React from "react"
import Quadrado from "../Quadrado/Quadrado"
import "./Bloco.css"

export default function Bloco(props) {
    return (
        <div className="bloco-container">
            <div className="bloco-linha">
                <Quadrado id = {1} valor={8}/>
                <Quadrado id = {2} valor={0}/>
                <Quadrado id = {3} valor={2}/>
            </div>

            <div className="bloco-linha">
                <Quadrado id = {4} valor={0}/>
                <Quadrado id = {5} valor={0}/>
                <Quadrado id = {6} valor={0}/>
            </div>
            
            <div className="bloco-linha">
                <Quadrado id = {7} valor={0}/>
                <Quadrado id = {8} valor={0}/>
                <Quadrado id = {9} valor={0}/>
            </div>
            
        </div>
    )
}