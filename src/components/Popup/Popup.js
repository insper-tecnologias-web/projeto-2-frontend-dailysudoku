import React, { useState, useEffect } from "react";
import "./Popup.css";
import axios from "axios";
import Countdown from "react-countdown";

export default function ControlledPopup(props) {
    const [piada, setPiada] = useState(null);

    // Helper function
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    // Variavéis para o contador
    var actualTime = new Date(Date.now());
    var endOfDay = new Date(
        actualTime.getFullYear(),
        actualTime.getMonth(),
        actualTime.getDate() + 1,
        0,
        0,
        0
    );

    // Função para renderizar o contador
    function renderer({ hours, minutes, seconds, completed }) {
        return (
            <div className="countdown">
                <h1 className="proximo">Next game in:</h1>
                <span className="countdown-span">
                    {hours}:{minutes}:{seconds}
                </span>
            </div>
        );
    }

    // Lógica para calcular as sequências de vitórias a partir do localstorage
    const listaStorage = [
        `listaVitorias${capitalizeFirstLetter(props.dificuldade)}`,
        `listaJaJogados${capitalizeFirstLetter(props.dificuldade)}`,
    ];

    let listaVitorias = JSON.parse(localStorage.getItem(listaStorage[0]));
    let listaJaJogados = JSON.parse(localStorage.getItem(listaStorage[1]));

    let jogos = listaJaJogados.length;
    let vitorias = Math.round((listaVitorias.length * 100) / jogos);

    let sequenciaAtual = 0;
    let sequenciaContador = 0;
    let maiorSequencia = 0;
    let jaAchouAtual = false;
    let pJogos = listaJaJogados.length - 1;

    while (pJogos >= 0) {
        if (listaVitorias.includes(listaJaJogados[pJogos])) {
            sequenciaContador++;
            if (pJogos === 0 && sequenciaAtual === 0) {
                sequenciaAtual = sequenciaContador;
            }
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
        pJogos--;
    }

    // Get da piada do popup
    useEffect(() => {
        axios
            .get(
                "https://fathomless-cove-20305.herokuapp.com/api/piada-aleatoria/"
            )
            .then((res) => {
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
                    <Countdown date={endOfDay} renderer={renderer} />
                </div>
            </div>
        )
    );
}
