import {useState} from "react";
import {LineBreak} from "@/line-break.jsx";
import {LocalStorage} from "@/local-storage.js";

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const storage = new LocalStorage("alphabet-game");

export function AlphabetGame(props) {
  const [letter, setLetter] = useState(storage.get() || 0);
  const updateLetter = (num) => {
    storage.set(num);
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