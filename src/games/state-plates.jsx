import USAMap from "react-usa-map/src";
import {LineBreak} from "@/line-break.jsx";
import {useState} from "react";
const states = {
  "AL": "Alabama",
  "AK": "Alaska",
  "AZ": "Arizona",
  "AR": "Arkansas",
  "CA": "California",
  "CO": "Colorado",
  "CT": "Connecticut",
  "DE": "Delaware",
  "FL": "Florida",
  "GA": "Georgia",
  "HI": "Hawaii",
  "ID": "Idaho",
  "IL": "Illinois",
  "IN": "Indiana",
  "IA": "Iowa",
  "KS": "Kansas",
  "KY": "Kentucky",
  "LA": "Louisiana",
  "ME": "Maine",
  "MD": "Maryland",
  "MA": "Massachusetts",
  "MI": "Michigan",
  "MN": "Minnesota",
  "MS": "Mississippi",
  "MO": "Missouri",
  "MT": "Montana",
  "NE": "Nebraska",
  "NV": "Nevada",
  "NH": "New Hampshire",
  "NJ": "New Jersey",
  "NM": "New Mexico",
  "NY": "New York",
  "NC": "North Carolina",
  "ND": "North Dakota",
  "OH": "Ohio",
  "OK": "Oklahoma",
  "OR": "Oregon",
  "PA": "Pennsylvania",
  "RI": "Rhode Island",
  "SC": "South Carolina",
  "SD": "South Dakota",
  "TN": "Tennessee",
  "TX": "Texas",
  "UT": "Utah",
  "VT": "Vermont",
  "VA": "Virginia",
  "WA": "Washington",
  "WV": "West Virginia",
  "WI": "Wisconsin",
  "WY": "Wyoming"
}
export function StatePlateGame() {
  const [foundStates, setFoundStates] = useState([]);
  let [selectState, setSelectState] = useState([])
  const customize = Object.entries(states).reduce((obj, it) => {
    if (!foundStates.includes(it[0])) {
      obj[it[0]] = {fill: "red", clickHandler: () => setFoundStates([...foundStates, it[0]])};
    }
    else {
      obj[it[0]] = {fill: "blue", clickHandler: () => setFoundStates(foundStates.filter(state => state !== it[0]))};
    }
    return obj;
  }, {}) || {}
  console.log(customize)
  return <>
    <LineBreak lines={2}/>
    <select onChange={(e) => {
      setSelectState(e.target.value)
    }}>
      {Object.entries(states).filter(it => !foundStates.includes(it[0])).map(it => <option value={it[0]}>{it[1]}</option>)}
    </select>
    <button onClick={() => {
      setFoundStates([...foundStates, selectState])
    }}>Found it!</button>
    <LineBreak lines={3}/>
    <USAMap customize={customize}/>
  </>
}