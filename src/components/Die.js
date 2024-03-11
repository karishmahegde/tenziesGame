/*
 * Component: Die.js
 * Description:
 * Die component is rendered on the App Component to display the die.
 * Based on the value generated using Math.random() function through 1-6, App Component passed the value through props.
 * Based on the value, the respective die face is shown.
 */

import React from "react";
export default function Die(props) {
  const isHeldStyle = {
    //If the die is selected, we indicate with a different color and styled accordingly
    //The 'isHeld' prop value helps check the state of the die
    backgroundColor: props.isHeld ? "#aaba84" : "#FFFFFF",
    boxShadow: props.isHeld
      ? "inset 0 5px #e7ecdc, inset 0 -5px #5a614a, inset 5px 0 #7d856a"
      : "inset 0 5px white, inset 0 -5px #bbb, inset 5px 0 #d7d7d7",
  };
  /*
   * Function: generateDieFace()
   * Parameter: Value - prop.value corresponding to the die face value.
   * Description: Based on the value, the respective HTML structure and subsequently, the CSS is applied.
   */
  function generateDieFace(value) {
    if (value === 1) {
      return (
        <div style={isHeldStyle} className="first-face">
          <span className="pip"></span>
        </div>
      );
    }
    if (value === 2) {
      return (
        <div style={isHeldStyle} className="second-face">
          <span className="pip"></span>
          <span className="pip"></span>
        </div>
      );
    }
    if (value === 3) {
      return (
        <div style={isHeldStyle} className="third-face">
          <span className="pip"></span>
          <span className="pip"></span>
          <span className="pip"></span>
        </div>
      );
    }
    if (value === 4) {
      return (
        <div style={isHeldStyle} className="fourth-face">
          <div className="column">
            <span className="pip"></span>
            <span className="pip"></span>
          </div>
          <div className="column">
            <span className="pip"></span>
            <span className="pip"></span>
          </div>
        </div>
      );
    }
    if (value === 5) {
      return (
        <div style={isHeldStyle} className="fifth-face">
          <div className="column">
            <span className="pip"></span>
            <span className="pip"></span>
          </div>
          <div className="column">
            <span className="pip"></span>
          </div>
          <div className="column">
            <span className="pip"></span>
            <span className="pip"></span>
          </div>
        </div>
      );
    }
    if (value === 6) {
      return (
        <div style={isHeldStyle} className="sixth-face">
          <div className="column">
            <span className="pip"></span>
            <span className="pip"></span>
            <span className="pip"></span>
          </div>
          <div className="column">
            <span className="pip"></span>
            <span className="pip"></span>
            <span className="pip"></span>
          </div>
        </div>
      );
    }
  }
  return (
    <div
      className="dieBox"
      onClick={(event) => props.handleHeld(event, props.id)} //OnClick to change the isHeld value when the die is clicked.
    >
      {generateDieFace(props.value)}
    </div>
  );
}
