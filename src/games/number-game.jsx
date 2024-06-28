import {useState} from "react";
import {LineBreak} from "@/line-break.jsx";
import {LocalStorage} from "@/local-storage.js";

const storage = new LocalStorage("number-game")

export function NumberGame() {
  const [number, setNumber] = useState(storage.get() || 0);
  const updateNumber = (num) => {
    storage.set(num);
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