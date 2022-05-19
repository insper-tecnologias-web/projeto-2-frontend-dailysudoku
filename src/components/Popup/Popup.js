import React, { useState, useEffect } from "react";
import "./Popup.css";
import axios from "axios";
import Countdown from "react-countdown";

export default function ControlledPopup(props) {
    // const [tempoRestante, setTempoRestante] = useState("");

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    // console.log("rederizei")

    var actualTime = new Date(Date.now());

    var endOfDay = new Date(
        actualTime.getFullYear(),
        actualTime.getMonth(),
        actualTime.getDate() + 1,
        0,
        0,
        0
    );

    var timeRemaining = endOfDay.getTime() - actualTime.getTime();

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

    const [piada, setPiada] = useState(null);
    const listaStorage = [
        `listaVitorias${capitalizeFirstLetter(props.dificuldade)}`,
        `listaJaJogados${capitalizeFirstLetter(props.dificuldade)}`,
    ];

    // console.log(listaStorage[0], listaStorage[1]);
    let listaVitorias = JSON.parse(localStorage.getItem(listaStorage[0]));
    let listaJaJogados = JSON.parse(localStorage.getItem(listaStorage[1]));

    // console.log("listas do local:");
    // console.log(listaVitorias);
    // console.log(listaJaJogados);

    let jogos = listaJaJogados.length;
    let vitorias = Math.round((listaVitorias.length * 100) / jogos);

    let sequenciaAtual = 0;
    let sequenciaContador = 0;
    let maiorSequencia = 0;
    let jaAchouAtual = false;
    let pJogos = listaJaJogados.length - 1;

    while (pJogos >= 0) {
        // console.log(`--------------------------`)
        // console.log(`pJogos: ${pJogos}`)
        // console.log(`sequenciaContador: ${sequenciaContador}`)
        // console.log(`sequenciaAtual: ${sequenciaAtual}`)
        // console.log(`maiorSequencia: ${maiorSequencia}`)
        // console.log(`jaAchouAtual: ${jaAchouAtual}`)
        
        if (listaVitorias.includes(listaJaJogados[pJogos])) {
            // console.log("Entrou no if")
            sequenciaContador++;
            // console.log(`Aumentando contador, sequenciaContador: ${sequenciaContador}`)
            if (pJogos === 0 && sequenciaAtual === 0){
                sequenciaAtual = sequenciaContador
            }


        } else {    
            if (!jaAchouAtual) {
                // console.log(`Achamos sequencia atual! JaAchou = ${jaAchouAtual}`)
                sequenciaAtual = sequenciaContador;
                jaAchouAtual = true;
                // console.log(`A sequencia atual é: ${sequenciaAtual}`)
            }
            sequenciaContador = 0;
        }
        if (sequenciaContador > maiorSequencia) {
            maiorSequencia = sequenciaContador;
        }
        pJogos--;
    }

    // console.log(`--------------------------`)
    // console.log(`pós while`)
    // console.log(`pJogos: ${pJogos}`)
    // console.log(`sequenciaAtual: ${sequenciaAtual}`)
    // console.log(`maiorSequencia: ${maiorSequencia}`)
    // console.log(`jaAchouAtual: ${jaAchouAtual}`)

    useEffect(() => {
        axios.get("https://fathomless-cove-20305.herokuapp.com/api/piada-aleatoria/").then((res) => {
            setPiada(res.data);
            console.log("get");
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
                    {/* <h2 className="tempoRestante">{tempoRestante}</h2> */}
                    <Countdown date={endOfDay} renderer={renderer} />
                </div>
            </div>
        )
    );
}
