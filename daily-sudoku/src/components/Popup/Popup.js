import React, { useState, useEffect } from "react";
import "./Popup.css";
import axios from "axios";

export default function ControlledPopup(props) {
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const [piada, setPiada] = useState(null);
    const listaStorage = [
        `listaVitorias${capitalizeFirstLetter(props.dificuldade)}`,
        `listaJaJogados${capitalizeFirstLetter(props.dificuldade)}`,
    ];

    console.log(listaStorage[0], listaStorage[1]);
    let listaVitorias = JSON.parse(localStorage.getItem(listaStorage[0]));
    let listaJaJogados = JSON.parse(localStorage.getItem(listaStorage[1]));

    console.log("listas do local:");
    console.log(listaVitorias);
    console.log(listaJaJogados);

    let jogos = listaJaJogados.length;
    let vitorias = Math.round((listaVitorias.length * 100) / jogos);

    let sequenciaAtual = 0;
    let sequenciaContador = 0;
    let maiorSequencia = 0;
    let jaAchouAtual = false;
    let pVitorias = listaVitorias.length - 1;
    let pJogos = listaJaJogados.length - 1;

    while (pVitorias >= 0) {
        if (listaVitorias[pVitorias] === listaJaJogados[pJogos]) {
            sequenciaContador++;
        } else {
            if (!jaAchouAtual) {
                sequenciaAtual = sequenciaContador;
                jaAchouAtual = true;
            }
            sequenciaContador = 0;
        }
        if (sequenciaContador > maiorSequencia) {
            maiorSequencia = sequenciaContador;
        }
        pVitorias--;
        pJogos--;
    }

    useEffect(() => {
        axios.get("http://127.0.0.1:8000/api/piada-aleatoria/").then((res) => {
            setPiada(res.data);
        });
    }, []);

    return (
        piada && (
            <div className="overlay">
                <div className="popup-container">
                    <a className="close" onClick={props.closeModal}>
                        &times;
                    </a>
                    <h1>GENIUS</h1>

                    <div className="estatisticas-container">
                        <div className="estatistica">
                            <h2 className="estatistica-valor">{jogos}</h2>
                            <h3>GAMES</h3>
                        </div>

                        <div className="estatistica">
                            <h2 className="estatistica-valor">{vitorias}</h2>
                            <h3>% OF WINS</h3>
                        </div>

                        <div className="estatistica">
                            <h2 className="estatistica-valor">
                                {sequenciaAtual}
                            </h2>
                            <h3>SEQUENCE</h3>
                        </div>

                        <div className="estatistica">
                            <h2 className="estatistica-valor">
                                {maiorSequencia}
                            </h2>
                            <h3>BEST SEQUENCE</h3>
                        </div>
                    </div>

                    <h1 className="setup">{piada.setup}</h1>
                    <h2 className="punchline">{piada["punch_line"]}</h2>
                </div>
            </div>
        )
    );
}
