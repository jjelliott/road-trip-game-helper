import {LineBreak} from "@/line-break.jsx";
import {useState} from "react";
import {USAMap} from "./usa-map.jsx";
import {LocalStorage} from "@/local-storage.js";

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
  "WY": "Wyoming",
  "DC": "Washington, D.C.",
  "AB": "Alberta",
  "BC": "British Columbia",
  "MB": "Manitoba",
  "NB": "New Brunswick",
  "NL": "Newfoundland and Labrador",
  "NS": "Nova Scotia",
  "ON": "Ontario",
  "PE": "Prince Edward Island",
  "QC": "Quebec",
  "SK": "Saskatchewan"
}
  
  const storage = new LocalStorage("state-plates")
  export function StatePlateGame() {
    const [activeView, setActiveView] = useState("list")
    const [foundStates, setFoundStates] = useState(storage.get() || []);
    let [selectState, setSelectState] = useState("none")
    const updateFound = (newList) => {
      setFoundStates(newList);
      storage.set(newList);
    }
    const customize = Object.entries(states).reduce((obj, it) => {
      if (!foundStates.includes(it[0])) {
        obj[it[0]] = {fill: "red", clickHandler: () => updateFound([...foundStates, it[0]])};
      } else {
        obj[it[0]] = {fill: "blue", clickHandler: () => updateFound(foundStates.filter(state => state !== it[0]))};
      }
      return obj;
    }, {}) || {}
    let tableRows = [];
    let tableLength = Math.round(Object.keys(states).length / 2);
    
    console.log(tableLength)
    for (let i = 0; i < tableLength; i++) {
      tableRows.push(<tr>
        <td>{states[Object.keys(states)[i]]}</td>
        <td>{foundStates.includes(Object.keys(states)[i]) ? "Y" : "N"}</td>
        {states[Object.keys(states)[i + tableLength]] ? <>
        <td>{states[Object.keys(states)[i + tableLength]]}</td>
        <td>{foundStates.includes(Object.keys(states)[i + tableLength]) ? "Y" : "N"}</td>
        </> : <></>}
      </tr>)
    }
    return <>
      <LineBreak lines={2}/>
      <h3>Found: {foundStates.length}/50</h3>
      <select value={selectState} onChange={(e) => {
        setSelectState(e.target.value)
      }}>
        <option value="none">Select a state...</option>
        {Object.entries(states).filter(it => !foundStates.includes(it[0])).map(it => <option
          value={it[0]}>{it[1]}</option>)}
      </select>
      <button onClick={() => {
        console.log(selectState)
        updateFound([...foundStates, selectState])
        setSelectState("none")
      }}>Found it!
      </button>
      <LineBreak lines={3}/>
      <button onClick={() => setActiveView("list")}>List</button>
      <button onClick={() => setActiveView("map")}>Map</button>
      <LineBreak lines={3}/>
      {activeView === "list" ?
        <table style={{width: "100%"}}>
          <thead>
          <tr>
            <th>State</th>
            <th>Found</th>
            <th>State</th>
            <th>Found</th>
          </tr>
          </thead>
          <tbody>
          {tableRows}
          </tbody>
        </table> :
        <USAMap customize={customize}/>
      }
      <LineBreak lines={5}/>
      <button onClick={() => updateFound([])}>Reset!</button>
    </>
  }