import {useState} from "react";
import {LineBreak} from "@/line-break.jsx";

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";


export function AlphabetGame(props) {
  const [letter, setLetter] = useState(parseInt(localStorage.getItem("alphabet.current") || 0));
  const updateLetter = (num) => {
    localStorage.setItem("alphabet.current", num);
    setLetter(num);
  }
  
  return <>
    <h2>Alphabet Game</h2>
    {letter < alphabet.length ? <>
      <h3>Current Letter: {alphabet[letter]}</h3>
      <button onClick={() => updateLetter(letter + 1)}>Found it!</button>
      
      <LineBreak lines={4}/>
      <button onClick={() => updateLetter(0)}>Reset!</button>
    </> : <>
      <h3>You won!</h3>
      <button onClick={() => updateLetter(0)}>Again?</button>
    </>}
  </>
  
}