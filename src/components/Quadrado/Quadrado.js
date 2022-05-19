import React from "react";
import "./Quadrado.css";

export default function Quadrado(props) {
    // Muda as cores do background, fonte e borda dependendo se o valor e está errado e se o quadrado
    // é fixo.
    let styles = {
        backgroundColor: props.objeto.errado ? "#d44a5b" : "transparent",
        color:
            !props.objeto.fixo && props.objeto.errado
                ? "#000000"
                : !props.objeto.fixo
                ? "#00423F"
                : "white",
        borderColor:
            props.focus === props.objeto.id && props.objeto.errado
                ? "#00000082"
                : props.focus === props.objeto.id
                ? "#0000003f"
                : props.objeto.errado
                ? "#9c2a38"
                : "#ffffff42",
    };

    // Seta a propriedade focus da DOM se o estado do app focus aponta para o quadrado\
    if (
        props.focus === props.objeto.id &&
        document.getElementById(`input-${props.objeto.id}`)
    ) {
        document.getElementById(`input-${props.objeto.id}`).focus();
    }

    return (
        <div
            onClick={(event) => props.atualizaClicado(event, props.objeto.id)}
            onKeyDown={(event) => {
                props.atualizaClicadoSeta(
                    event,
                    props.objeto.id,
                    props.objeto["linha-coluna"]
                );
            }}
            className="quadrado-container"
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
