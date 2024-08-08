import {useEffect, useState} from "react";
import {LineBreak} from "@/line-break.jsx";
import {Game} from "@/games/game.js";
import {LocalStorage} from "@/local-storage.js";
import {backendRequest} from "@/BackendRequest.js";

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const game = Game.ALPHABET;

function RefreshTimer ({lastRefresh, interval}){

}

export function AlphabetGame({gameRoom}) {
    const [letter, setLetter] = useState(0);
    const [lastRefresh, setLastRefresh] = useState(new Date().getMilliseconds());
    const getGameState = async () => {
        if (gameRoom != null) {
            const response = await backendRequest("/" + gameRoom + "/" + game);
            return JSON.parse(await response.text());
        } else {
            return new LocalStorage(game).get();
        }
    };
    const setGameState = (newState) => {
        if (gameRoom != null) {
            const reset = newState === 0 ? "/reset" : "";
            backendRequest("/" + gameRoom + "/" + game + reset, {method: "POST"});
        } else {
            new LocalStorage(game).set(newState);
        }
    };
    useEffect(() => {
        getGameState().then(state => {
            if (state != null && state !== "") {
                setLetter(state);
            }
        });
        console.log(gameRoom);
        if (gameRoom != null) {
            const eventSource = new EventSource(import.meta.env.VITE_BACKEND_URL + "/" + gameRoom + "/" + game + "/stream-updates");
            eventSource.addEventListener("currentLetter", (e) => {
                console.log(e);
                let newLetter = parseInt(e.data);
                if (newLetter !== letter) {
                    setLetter(newLetter);
                }
                // setLastRefresh(new Date().getMilliseconds());
            });
            return () => {
                eventSource.close();
            };
        }
    }, [gameRoom, getGameState, letter]);
    const updateLetter = (num) => {
        setGameState(num);
        setLetter(num);
    };

    return <>
        <h2>Alphabet Game</h2>
        {letter < alphabet.length ? <>
            <h3>Current Letter: {alphabet[letter]}</h3>
                {gameRoom ? <RefreshTimer lastRefresh={lastRefresh} interval={5}/>   : ""}
            <button onClick={() => updateLetter(letter + 1)}>Found it!</button>

            <LineBreak lines={4}/>
            <button onClick={() => updateLetter(0)}>Reset!</button>
        </> : <>
            <h3>You won!</h3>
            <button onClick={() => updateLetter(0)}>Again?</button>
        </>}
    </>;

}