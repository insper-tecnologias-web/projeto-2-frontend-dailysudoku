import logo from "./logo.svg";
import React, { useState, useEffect } from "react";

import "./App.css";
import axios from "axios";
import Tabuleiro from "./components/Tabuleiro/Tabuleiro";
import Header from "./components/Header/Header";
import Popup from "./components/Popup/Popup";
import Confetti from "react-confetti";

function App() {
    const [tresJogos, setTresJogos] = useState({});
    const [jogo, setJogo] = useState(null);
    const [tresSudokus, setTresSudokus] = useState({
        easy: false,
        medium: false,
        hard: false,
    });
    const [popup, setPopup] = useState(false);
    const [focus, setFocus] = useState(0);
    const [listaErrados, setListaErrados] = useState([]);
    const [dificuldade, setDificuldade] = useState("easy");
    const [desenhando, setDesenhando] = useState(false);

    // localStorage.clear();

    // Use effect que inicia o local storage e atualiza e lista de jogos já jogados quando o jogador entra
    // no site pela primeira vez
    useEffect(() => {
        const listaStorage = [
            "jogoEasy",
            "listaVitoriasEasy",
            "listaJaJogadosEasy",
            "jogoMedium",
            "listaVitoriasMedium",
            "listaJaJogadosMedium",
            "jogoHard",
            "listaVitoriasHard",
            "listaJaJogadosHard",
        ];

        for (let storageItem of listaStorage) {
            //Não criados
            if (!localStorage.getItem(storageItem)) {
                //Lógica para localstorage dos jogos ja jogados
                if (storageItem.substring(0, 14) === "listaJaJogados" && jogo) {
                    if (
                        jogo.dificuldade === "easy" &&
                        storageItem === "listaJaJogadosEasy"
                    ) {
                        let jogosJogados = [jogo.id];
                        localStorage.setItem(
                            storageItem,
                            JSON.stringify(jogosJogados)
                        );
                    } else if (
                        jogo.dificuldade === "medium" &&
                        storageItem === "listaJaJogadosMedium"
                    ) {
                        let jogosJogados = [jogo.id];
                        localStorage.setItem(
                            storageItem,
                            JSON.stringify(jogosJogados)
                        );
                    } else if (
                        jogo.dificuldade === "hard" &&
                        storageItem === "listaJaJogadosHard"
                    ) {
                        let jogosJogados = [jogo.id];
                        localStorage.setItem(
                            storageItem,
                            JSON.stringify(jogosJogados)
                        );
                    } else {
                        let jogosJogados = [];
                        localStorage.setItem(
                            storageItem,
                            JSON.stringify(jogosJogados)
                        );
                    }

                    //Lógica para localsrotage das vitorias
                } else if (storageItem.substring(0, 13) === "listaVitorias") {
                    localStorage.setItem(storageItem, JSON.stringify([]));

                    //Lógica para jogo do dia
                } else if (storageItem.substring(0, 4) === "jogo") {
                    localStorage.setItem(storageItem, JSON.stringify({}));
                }

                //Criados
            } else if (
                storageItem.substring(0, 14) === "listaJaJogados" &&
                jogo
            ) {
                let jogosJogados = JSON.parse(
                    localStorage.getItem(storageItem)
                );

                if (
                    jogo.dificuldade === "easy" &&
                    storageItem === "listaJaJogadosEasy" &&
                    !jogosJogados.includes(jogo.id)
                ) {
                    jogosJogados.push(jogo.id);
                    localStorage.setItem(
                        storageItem,
                        JSON.stringify(jogosJogados)
                    );
                } else if (
                    jogo.dificuldade === "medium" &&
                    storageItem === "listaJaJogadosMedium" &&
                    !jogosJogados.includes(jogo.id)
                ) {
                    jogosJogados.push(jogo.id);
                    localStorage.setItem(
                        storageItem,
                        JSON.stringify(jogosJogados)
                    );
                } else if (
                    jogo.dificuldade === "hard" &&
                    storageItem === "listaJaJogadosHard" &&
                    !jogosJogados.includes(jogo.id)
                ) {
                    jogosJogados.push(jogo.id);
                    localStorage.setItem(
                        storageItem,
                        JSON.stringify(jogosJogados)
                    );
                }
            }
            // console.log(`${storageItem}: ${localStorage.getItem(storageItem)}`);
        }
    }, [tresJogos, dificuldade]);

    // if (jogo) {
    //     console.log(`jogo:`);
    //     console.log(jogo);
    // }

    // Use effect que carrega o jogo no esta tresJogos. Sempre faz um get nos jogos easy, medium e hard no
    // backend e verifica se o jogo está no localstorage. Se estiver carrega o do localstorage, se não carrega
    // o novo jogo.
    useEffect(() => {
        axios
            .get(
                "https://fathomless-cove-20305.herokuapp.com/api/sudoku/ultimo-jogo/easy/"
            )
            .then((res) => {
                if (
                    !JSON.parse(localStorage.getItem("jogoEasy")) ||
                    JSON.parse(localStorage.getItem("jogoEasy")).id !==
                        res.data.id
                ) {
                    setTresJogos((prevJogos) => ({
                        ...prevJogos,
                        easy: res.data,
                    }));
                    localStorage.setItem("jogoEasy", JSON.stringify(res.data));
                } else {
                    setTresJogos((prevJogos) => ({
                        ...prevJogos,
                        easy: JSON.parse(localStorage.getItem("jogoEasy")),
                    }));
                }
            })
            .then(
                axios
                    .get(
                        "https://fathomless-cove-20305.herokuapp.com/api/sudoku/ultimo-jogo/medium/"
                    )
                    .then((res) => {
                        if (
                            !JSON.parse(localStorage.getItem("jogoMedium")) ||
                            JSON.parse(localStorage.getItem("jogoMedium"))
                                .id !== res.data.id
                        ) {
                            setTresJogos((prevJogos) => ({
                                ...prevJogos,
                                medium: res.data,
                            }));
                            localStorage.setItem(
                                "jogoMedium",
                                JSON.stringify(res.data)
                            );
                        } else {
                            setTresJogos((prevJogos) => ({
                                ...prevJogos,
                                medium: JSON.parse(
                                    localStorage.getItem("jogoMedium")
                                ),
                            }));
                        }
                    })
            )
            .then(
                axios
                    .get(
                        "https://fathomless-cove-20305.herokuapp.com/api/sudoku/ultimo-jogo/hard/"
                    )
                    .then((res) => {
                        if (
                            !JSON.parse(localStorage.getItem("jogoHard")) ||
                            JSON.parse(localStorage.getItem("jogoHard")).id !==
                                res.data.id
                        ) {
                            setTresJogos((prevJogos) => ({
                                ...prevJogos,
                                hard: res.data,
                            }));
                            localStorage.setItem(
                                "jogoHard",
                                JSON.stringify(res.data)
                            );
                        } else {
                            setTresJogos((prevJogos) => ({
                                ...prevJogos,
                                hard: JSON.parse(
                                    localStorage.getItem("jogoHard")
                                ),
                            }));
                        }
                    })
            );
    }, []);

    //Inicia o jogo atual com a dificuldade easy
    useEffect(() => {
        if (!jogo) {
            setJogo(tresJogos[dificuldade]);
        }
    }, [tresJogos]);

    //Muda o jogo atual conforme dificuldade
    useEffect(() => {
        if (Object.keys(tresJogos).length === 3) {
            setFocus(tresJogos[dificuldade].ultimo_clicado);
            setTresJogos((prevTresJogos) => {
                return {
                    ...prevTresJogos,
                    [jogo.dificuldade]: jogo,
                };
            });
            setJogo(tresJogos[dificuldade]);
        }
    }, [dificuldade]);

    // A cada mudança no jogo, atualiza o localstorage do jogo dessa dificuldade e verifica se o jogo
    // foi ganho.
    useEffect(() => {
        function capitalizeFirstLetter(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        }

        if (jogo) {
            localStorage.setItem(
                `jogo${capitalizeFirstLetter(dificuldade)}`,
                JSON.stringify(jogo)
            );
        }

        if (jogo && listaErrados.length === 0) {
            for (let obj of jogo.tabuleiro) {
                if (obj.valor === 0) {
                    return;
                }
            }

            if (!tresSudokus[dificuldade]) {
                setTresSudokus((prevTresSudokus) => ({
                    ...prevTresSudokus,
                    [dificuldade]: true,
                }));
            }

            setPopup(true);
        }
    }, [jogo]);

    // Caso o jogo seja vencido, atualiza a UI e o localstorage
    useEffect(() => {
        if (tresSudokus[dificuldade]) {
            // venceu, logo todos os objetos sõa fixos
            setJogo((prevJogo) => {
                return {
                    dificuldade: prevJogo.dificuldade,

                    tabuleiro: prevJogo.tabuleiro.map((obj) => {
                        return { ...obj, fixo: true, clicado: false };
                    }),
                    venceu: true,
                    ultimo_clicado: -1,
                    id: prevJogo.id,
                };
            });
            //atualiza localStorage, adicionando essa nova vitoria
            if (jogo && !jogo.venceu) {
                let vitorias;
                switch (dificuldade) {
                    case "easy":
                        vitorias = JSON.parse(
                            localStorage.getItem("listaVitoriasEasy")
                        );

                        if (!vitorias.includes(jogo.id)) {
                            vitorias.push(jogo.id);
                        }
                        localStorage.setItem(
                            "listaVitoriasEasy",
                            JSON.stringify(vitorias)
                        );

                        break;

                    case "medium":
                        vitorias = JSON.parse(
                            localStorage.getItem("listaVitoriasMedium")
                        );
                        if (!vitorias.includes(jogo.id)) {
                            vitorias.push(jogo.id);
                        }
                        localStorage.setItem(
                            "listaVitoriasMedium",
                            JSON.stringify(vitorias)
                        );
                        break;

                    case "hard":
                        vitorias = JSON.parse(
                            localStorage.getItem("listaVitoriasHard")
                        );
                        if (!vitorias.includes(jogo.id)) {
                            vitorias.push(jogo.id);
                        }
                        localStorage.setItem(
                            "listaVitoriasHard",
                            JSON.stringify(vitorias)
                        );
                        break;
                }
            }
        }
    }, [tresSudokus]);

    // fecha o popup
    function closeModal() {
        setPopup(false);
    }

    // seta a nova dificuldade a partir do clique no header
    function mudaDificuldade(novaDificuldade) {
        setPopup(false);
        setDificuldade(novaDificuldade);
    }

    // muda o quadrado focado a partir do clique do mouse
    function atualizaClicado(event, id) {
        setFocus(id);

        // garante que só atualiza o clque quando o jogo não foi vencido
        if (!tresSudokus[dificuldade]) {
            setJogo((prevJogo) => {
                return {
                    dificuldade: prevJogo.dificuldade,

                    tabuleiro: prevJogo.tabuleiro.map((obj) => {
                        if (obj.id === id) {
                            return { ...obj, clicado: true };
                        } else if (obj.id === prevJogo.ultimo_clicado) {
                            return { ...obj, clicado: false };
                        } else {
                            return obj;
                        }
                    }),

                    ultimo_clicado: id,
                    id: prevJogo.id,
                };
            });
        }
    }

    // atualiza o quadrado focado a partir das setas
    function atualizaClicadoSeta(event, id, linhaColuna) {
        let arrows = ["ArrowLeft", "ArrowUp", "ArrowRight", "ArrowDown", "0"];

        if (arrows.includes(event.key)) {
            event.preventDefault();
            verificaNovoCLicado(event.key, id, linhaColuna);
        }
    }

    // helper function que verifica qual será o novo quadrado selecionado a partir da seta clicada
    function verificaNovoCLicado(key, id, linhaColuna) {
        const [i, j] = linhaColuna;

        switch (key) {
            case "ArrowLeft":
                if (j !== 0) {
                    atualizaClicado(null, id - 1);
                }
                break;
            case "ArrowUp":
                if (i !== 0) {
                    atualizaClicado(null, id - 9);
                }
                break;
            case "ArrowRight":
                if (j !== 8) {
                    atualizaClicado(null, id + 1);
                }
                break;
            case "ArrowDown":
                if (i !== 8) {
                    atualizaClicado(null, id + 9);
                }
                break;
            default:
                break;
        }
    }

    // função que atualiza o valor do quadrado
    function atualizaValor(event, objeto) {
        var novoValor = event.target.value;

        // Tabuleiro a ser verificado com o valor novo do quadrado mudado.
        // Garante que se estiver desenhando o quadrado não terá erro no quadrado mudado
        const tabuleiroVerifica = jogo.tabuleiro.map((objMap) => {
            if (objMap.id === objeto.id && !objMap.fixo) {
                return {
                    ...objMap,
                    valor: desenhando
                        ? 0
                        : parseInt(novoValor.charAt(novoValor.length - 1)),
                };
            } else {
                return objMap;
            }
        });

        let novoObjeto;
        if (!objeto.fixo) {
            novoObjeto = {
                ...objeto,
                valor: desenhando
                    ? 0
                    : parseInt(novoValor.charAt(novoValor.length - 1)),
            };
        } else {
            novoObjeto = objeto;
        }

        // atualiza a lista dos quadrados errados
        const listaErrados = atualizaErros(novoObjeto, tabuleiroVerifica);
        setListaErrados(listaErrados);

        // Se estiver desenhando, atualiza o dicionario de desenhos, se não atualiza o valor do quadrado.
        // Sempre muda os erro individuais de todos quadrados para carregar os erros de mudanças passadas.
        // Só muda o atributo desenhando do quadrado que está sendo atualizado para que assim seja possivel
        // manter quadrados com desenho e valor real ao mesmo tempo.
        if (desenhando) {
            novoValor = parseInt(novoValor.charAt(novoValor.length - 1));
            setJogo((prevJogo) => {
                return {
                    dificuldade: prevJogo.dificuldade,

                    id: prevJogo.id,

                    tabuleiro: prevJogo.tabuleiro.map((objMap) => {
                        let erradoIndividual = listaErrados.includes(objMap.id);
                        if (objMap.id === objeto.id && !objMap.fixo) {
                            return {
                                ...objMap,
                                valor: 0,
                                errado: erradoIndividual,
                                desenhando: desenhando,
                                dic_desenhando: {
                                    ...objMap.dic_desenhando,
                                    [novoValor]:
                                        !objMap.dic_desenhando[novoValor],
                                },
                            };
                        } else {
                            return { ...objMap, errado: erradoIndividual };
                        }
                    }),

                    ultimo_clicado: prevJogo.ultimo_clicado,
                };
            });
        } else {
            setJogo((prevJogo) => {
                return {
                    dificuldade: prevJogo.dificuldade,

                    id: prevJogo.id,

                    tabuleiro: prevJogo.tabuleiro.map((objMap) => {
                        let erradoIndividual = listaErrados.includes(objMap.id);

                        if (objMap.id === objeto.id && !objMap.fixo) {
                            return {
                                ...objMap,
                                valor: parseInt(
                                    novoValor.charAt(novoValor.length - 1)
                                ),
                                errado: erradoIndividual,
                                desenhando: desenhando,
                            };
                        } else {
                            return { ...objMap, errado: erradoIndividual };
                        }
                    }),

                    ultimo_clicado: prevJogo.ultimo_clicado,
                };
            });
        }
    }

    // Helper function utilizada para verificar os erros no tabuleiro
    function atualizaErros(objeto, tabuleiroAtualizado) {
        let objetosParaVerificar = listaErrados.map(
            (idErrado) => tabuleiroAtualizado[idErrado]
        );
        objetosParaVerificar.push(objeto);

        let listaNovosErros = [];

        for (let objetoParaVerificar of objetosParaVerificar) {
            let [i, j] = objetoParaVerificar["linha-coluna"];
            let valorVerificado = objetoParaVerificar.valor;

            let tamanhoInicial = listaNovosErros.length;

            for (let objetoFor of tabuleiroAtualizado) {
                // Pula ele mesmo
                if (objetoParaVerificar.id === objetoFor.id) {
                    continue;
                }

                // verifica linha e coluna
                else if (
                    (objetoFor["linha-coluna"][0] === i ||
                        objetoFor["linha-coluna"][1] === j) &&
                    objetoFor.valor === valorVerificado &&
                    valorVerificado !== 0
                ) {
                    if (!listaNovosErros.includes(objetoParaVerificar.id)) {
                        listaNovosErros.push(objetoParaVerificar.id);
                    }
                    if (!listaNovosErros.includes(objetoFor.id)) {
                        listaNovosErros.push(objetoFor.id);
                    }
                }

                // Verifica bloco
                else if (
                    Math.floor(objetoFor["linha-coluna"][0] / 3) ===
                        Math.floor(i / 3) &&
                    Math.floor(objetoFor["linha-coluna"][1] / 3) ===
                        Math.floor(j / 3) &&
                    objetoFor.valor === valorVerificado &&
                    valorVerificado !== 0
                ) {
                    if (!listaNovosErros.includes(objetoParaVerificar.id)) {
                        listaNovosErros.push(objetoParaVerificar.id);
                    }
                    if (!listaNovosErros.includes(objetoFor.id)) {
                        listaNovosErros.push(objetoFor.id);
                    }
                }
            }
        }

        return listaNovosErros;
    }

    // função chamada no clique da imagem de desenho
    function atualizaDesenhando() {
        setDesenhando((prevDesenhando) => !prevDesenhando);
    }

    return (
        jogo && (
            <div className="App">
                <Header
                    mudaDificuldade={mudaDificuldade}
                    dificuldade={dificuldade}
                />
                <div className="app-container">
                    <Tabuleiro
                        data={jogo}
                        atualizaClicado={atualizaClicado}
                        atualizaValor={atualizaValor}
                        atualizaClicadoSeta={atualizaClicadoSeta}
                        focus={focus}
                    />

                    <img
                        onClick={atualizaDesenhando}
                        className="pencil"
                        src={desenhando ? "/pencil2.png" : "/pencil.png"}
                    />
                    {/* <div className="made-by">
                        <div className="by">Made By:</div>
                        <div className="paulo">Paulo Falcão</div>
                        <div className="eduardo">Eduardo Cunha</div>
                    </div> */}
                </div>

                {popup && (
                    <>
                        <Confetti
                            gravity={0.2}
                            numberOfPieces={500}
                            colors={[
                                "#E8F9FD",
                                "#79DAE8",
                                "#0AA1DD",
                                "#2155CD",
                                "#FFD93D",
                            ]}
                        />
                        <Popup
                            closeModal={closeModal}
                            dificuldade={dificuldade}
                        />
                    </>
                )}
            </div>
        )
    );
}

export default App;
