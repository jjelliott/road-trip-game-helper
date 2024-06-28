import React from "react";
import {UsaState} from "./usa-state.jsx";
import data from "./usa-map-dimensions.js";
import PropTypes from "prop-types";

export class USAMap extends React.Component {
  
  clickHandler = (stateAbbreviation) => {
    this.props.onClick(stateAbbreviation);
  };
  
  fillStateColor = (state) => {
    if (this.props.customize && this.props.customize[state] && this.props.customize[state].fill) {
      return this.props.customize[state].fill;
    }
    
    return this.props.defaultFill;
  };
  
  stateClickHandler = (state) => {
    if (this.props.customize && this.props.customize[state] && this.props.customize[state].clickHandler) {
      return this.props.customize[state].clickHandler
    }
    return this.clickHandler;
  }
  
  buildPaths = () => {
    let paths = [];
    let dataStates = data();
    for (let stateKey in dataStates) {
      const path = <UsaState key={stateKey} stateName={dataStates[stateKey].name} dimensions={dataStates[stateKey]["dimensions"]} state={stateKey} fill={this.fillStateColor(stateKey)} onClickState={this.stateClickHandler(stateKey)} />
      paths.push(path);
    };
    return paths;
  };
  
  render() {
    return (
      <svg className="us-state-map" xmlns="http://www.w3.org/2000/svg" width={this.props.width} height={this.props.height} viewBox="0 0 959 593">
        <title>{this.props.title}</title>
        <g className="outlines">
          {this.buildPaths()}
        </g>
      </svg>
    );
  }
}

USAMap.propTypes = {
  onClick: PropTypes.func.isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
  title: PropTypes.string,
  defaultFill: PropTypes.string,
  customize: PropTypes.object
};

USAMap.defaultProps = {
  onClick: () => {},
  width: 959,
  height: 593,
  defaultFill: "#D3D3D3",
  title: "Blank US states map",
  customize: {}
};