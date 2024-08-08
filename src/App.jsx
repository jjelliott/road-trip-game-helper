import {useEffect, useState} from 'react'
import './App.css'
import {Game, gameLabel} from "@/games/game.js";
import {AlphabetGame} from "@/games/alphabet-game.jsx";
import {Switch, Case} from "@/switch.jsx";
import {NumberGame} from "@/games/number-game.jsx";
import {StatePlateGame} from "@/games/state-plates/state-plates.jsx";
import {getGameRoom, setGameRoom} from "@/room.js";
import {backendRequest} from "@/BackendRequest.js";
import {LineBreak} from "@/line-break.jsx";

const DEFAULT_ROOM_OPTIONS = [<option key={"none"} value={null}>None</option>];

function App() {
    const [game, setGame] = useState(Game.NONE);
    const [room, setRoom] = useState(getGameRoom());
    const [roomOptions, setRoomOptions] = useState(DEFAULT_ROOM_OPTIONS);
    useEffect(() => {
        backendRequest("/room").then(res => res.json()).then(json => {
            setRoomOptions([...DEFAULT_ROOM_OPTIONS, ...json.map(roomObj => <option value={roomObj.code}
                                                                                 key={roomObj.code}>{roomObj.code}</option>)]);

        });
    }, [room]);
    return (
        <>
            <h1>Road Trip Game Helper</h1>
            <LineBreak lines={1}/>
            <select value={room || ""}
                onChange={e => {
                const value = e.target.value;
                if (value !== "None") {
                    setRoom(value);
                    setGameRoom(value)
                }
                else {
                    setGameRoom(null)
                    setRoom(null);
                }
            }}>{roomOptions}</select>
            <button onClick={e => {
                backendRequest("/room", {method: "POST"})
            }}>Create Room
            </button>
            <LineBreak lines={1}/>
            <select onChange={e => setGame(e.target.value)}>
                {Object.keys(Game).map(it => <option value={Game[it]}>{gameLabel(it)}</option>)}
            </select>
            <Switch test={game}>
                <Case value={Game.ALPHABET}><AlphabetGame gameRoom={room}></AlphabetGame></Case>
                <Case value={Game.NUMBER}><NumberGame></NumberGame></Case>
                <Case value={Game.STATE_PLATES}><StatePlateGame></StatePlateGame></Case>
            </Switch>
        </>
    )
}

export default App
