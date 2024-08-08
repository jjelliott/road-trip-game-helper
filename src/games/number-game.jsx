import {useEffect, useState} from "react";
import {LineBreak} from "@/line-break.jsx";
// import {Game} from "@/games/game.js";

export function NumberGame() {
  const [number, setNumber] = useState( 0);
  useEffect(() => {
    // setNumber(getGameState(Game.NUMBER));
  }, []);
  const updateNumber = (num) => {
    // setGameState(Game.NUMBER);
    setNumber(num);
  }
  return <>
    <h2>Number Game</h2>
    <h3>Current Number: {number}</h3>
    <button onClick={() => updateNumber(number + 1)}>Found it!</button>
    <LineBreak lines={4}/>
    <button onClick={() => updateNumber(0)}>Reset!</button>
  </>
}