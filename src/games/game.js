export const Game = {
  NONE: "none",
  ALPHABET: "alphabet",
  NUMBER: "number",
  STATE_PLATES: "state_plates"
}
export const gameLabel = (game) => {
  switch (game){
    case "NONE": return "No game selected"
    case "ALPHABET": return "Alphabet Game"
    case "NUMBER": return "Number Game"
    case "STATE_PLATES": return "State Plates"
  }
}