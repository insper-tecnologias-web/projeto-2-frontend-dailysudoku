import React, { useState } from "react";
import "./Quadrado.css";

export default function Quadrado(props) {
    if (props.focus === props.objeto.id) {
        console.log(props.objeto);
    }

    let classeCssContainer = "";

    let styles = {
        backgroundColor: props.objeto.errado
            ? "#d44a5b"
            : // ? "#991425"
              "transparent",
        color:
            !props.objeto.fixo && props.objeto.errado
                ? "#000000"
                : !props.objeto.fixo
                ? "#00423F"
                : "white",

        borderColor: props.objeto.errado && "#9c2a38",
        // borderColor: props.objeto.errado ? "" : props.objeto.clicado ? rgba(0, 0, 0, 0.247) : rgba(255, 255, 255, 0.26) ,
    };

    let focus;
    if (props.objeto.clicado) {
        focus = "autofocus";
    }
    if (
        props.focus === props.objeto.id &&
        document.getElementById(`input-${props.objeto.id}`)
    ) {
        document.getElementById(`input-${props.objeto.id}`).focus();
        classeCssContainer = "quadrado-container-clicado";
    } else {
        classeCssContainer = "quadrado-container";
    }

    return (
        <div
            onClick={(event) => props.atualizaClicado(event, props.objeto.id)}
            onKeyDown={(event) => {
                // console.log(`Quem chamou foi o ${props.objeto.id}`)
                props.atualizaClicadoSeta(
                    event,
                    props.objeto.id,
                    props.objeto["linha-coluna"]
                );
            }}
            className={classeCssContainer}
            style={styles}
        >
            {/* <h4>{props.objeto.resposta}</h4> */}
            {props.objeto.desenhando ? (
                <>
                    <input
                        className="form-quadrado"
                        type="number"
                        onChange={(event) =>
                            props.atualizaValor(event, props.objeto)
                        }
                        value=""
                        autoFocus={props.focus === props.objeto.id}
                        id={`input-${props.objeto.id}`}
                        style={styles}
                    />
                    {Object.keys(props.objeto.dic_desenhando).map(
                        (chave, chaveIdx) => {
                            if (props.objeto.dic_desenhando[chave])
                                return (
                                    <div
                                        key={chaveIdx}
                                        className={`draw-${chave}`}
                                    >
                                        {chave}
                                    </div>
                                );
                        }
                    )}
                </>
            ) : (
                <input
                    className="form-quadrado"
                    type="number"
                    onChange={(event) =>
                        props.atualizaValor(event, props.objeto)
                    }
                    value={props.objeto.valor ? props.objeto.valor : ""}
                    autoFocus={props.focus === props.objeto.id}
                    id={`input-${props.objeto.id}`}
                    style={styles}
                />
            )}
        </div>
    );
}

// function areEqual(prevProps, nextProps) {
//     /*
//     return true if passing nextProps to render would return
//     the same result as passing prevProps to render,
//     otherwise return false
//     */

//     if (
//         prevProps.objeto.clicado !== nextProps.objeto.clicado ||
//         prevProps.objeto.errado !== nextProps.objeto.errado ||
//         prevProps.objeto.valor !== nextProps.objeto.valor ||
//         prevProps.objeto.venceu !== nextProps.objeto.venceu ||
//         prevProps.focus !== nextProps.focus
//     ) {
//         return false;
//     }
//     return true;
// }
