import {useState} from "react";
import {LineBreak} from "@/line-break.jsx";

export function NumberGame() {
  const [number, setNumber] = useState(parseInt(localStorage.getItem("number.current") || 0));
  const updateNumber = (num) => {
    localStorage.setItem("number.current", num);
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