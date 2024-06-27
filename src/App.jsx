import {useState} from 'react'
import './App.css'
import {Game, gameLabel} from "@/games/game.js";
import {AlphabetGame} from "@/games/alphabet-game.jsx"
import {Switch, Case} from "@/switch.jsx";
import {NumberGame} from "@/games/number-game.jsx";
import {StatePlateGame} from "@/games/state-plates.jsx";


function App() {
  const [game, setGame] = useState(Game.NONE)
  
  return (
    <>
      <h1>Road Trip Game Helper</h1>
      <select onChange={e => setGame(e.target.value)}>
        {Object.keys(Game).map(it => <option value={Game[it]}>{gameLabel(it)}</option>)}
      </select>
      <Switch test={game}>
        <Case value={Game.ALPHABET}><AlphabetGame></AlphabetGame></Case>
        <Case value={Game.NUMBER}><NumberGame></NumberGame></Case>
        <Case value={Game.STATE_PLATES}><StatePlateGame></StatePlateGame></Case>
      </Switch>
    </>
  )
}

export default App
