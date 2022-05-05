import React from "react"
import Quadrado from "../Quadrado/Quadrado"
import "./Bloco.css"

export default function Bloco(props) {
    return (
        <div className="bloco-container">
            <div className="bloco-linha">
                <Quadrado id = {[props.blocoi * 3, props.blocoj*3]} valor={8}/>
                <Quadrado id = {[props.blocoi * 3, props.blocoj*3 + 1]} valor={0}/>
                <Quadrado id = {[props.blocoi * 3, props.blocoj*3 + 2]} valor={2}/>
            </div>

            <div className="bloco-linha">
                <Quadrado id = {[props.blocoi * 3 + 1, props.blocoj*3]} valor={8}/>
                <Quadrado id = {[props.blocoi * 3 + 1, props.blocoj*3 + 1]} valor={0}/>
                <Quadrado id = {[props.blocoi * 3 + 1, props.blocoj*3 + 2]} valor={2}/>
            </div>
            
            <div className="bloco-linha">
                <Quadrado id = {[props.blocoi * 3 + 2, props.blocoj*3]} valor={8}/>
                <Quadrado id = {[props.blocoi * 3 + 2, props.blocoj*3 + 1]} valor={0}/>
                <Quadrado id = {[props.blocoi * 3 + 2, props.blocoj*3 + 2]} valor={2}/>
            </div>
            
        </div>
    )
}