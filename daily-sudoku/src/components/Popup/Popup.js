import React, {useState, useEffect} from 'react';
import "./Popup.css"
import axios from "axios";


export default function ControlledPopup(props){
    const [piada, setPiada] = useState(null);
    const sequencia = 0;

    
    
    useEffect(() => {
    
        axios
          .get("http://127.0.0.1:8000/api/piada-aleatoria/")
          .then((res) => {
            setPiada(res.data);
          })
        }, []);
    
    return piada && (
    <div className = "overlay" onClick={() => console.log("clicado")}>
      <div className="popup-container">
        <a className="close" onClick={props.closeModal}>
            &times;
        </a>
        <h1>GENIUS</h1>

        <div className = "estatisticas-container">
            <div className = "estatistica">
                <h2 className="estatistica-valor">{localStorage.getItem('vitorias')}</h2>
                <h3>GAMES</h3>
            </div>

            <div className = "estatistica">
                <h2 className="estatistica-valor">{localStorage.getItem('vitorias')}</h2>
                <h3>% OF WINS</h3>
            </div>

            <div className = "estatistica">
                <h2 className="estatistica-valor">{sequencia}</h2>
                <h3>BEST SEQUENCE</h3>
            </div>
        </div>
        
        <h1 className="setup">{piada.setup}</h1>
        <h2 className="punchline">{piada['punch_line']}</h2>
        
      </div>
    </div>
    );
};
  


{/* <button type="button" className="button" onClick={() => setOpen(o => !o)}>
    Controlled Popup
</button>
<Popup open={open} closeOnDocumentClick onClose={closeModal}>
    <div className="modal">
    <a className="close" onClick={closeModal}>
        &times;
    </a>
    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae magni
    omnis delectus nemo, maxime molestiae dolorem numquam mollitia, voluptate
    ea, accusamus excepturi deleniti ratione sapiente! Laudantium, aperiam
    doloribus. Odit, aut.
    </div>
</Popup> */}