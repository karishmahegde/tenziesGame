import React from "react";

export default function Die(props) {
  const isHeldStyle = {
    backgroundColor: props.isHeld ? "#aaba84" : "#FFFFFF",
    boxShadow: props.isHeld
      ? "inset 0 5px #e7ecdc, inset 0 -5px #5a614a, inset 5px 0 #7d856a"
      : "inset 0 5px white, inset 0 -5px #bbb, inset 5px 0 #d7d7d7",
  };
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
      onClick={(event) => props.handleHeld(event, props.id)}
    >
      {generateDieFace(props.value)}
    </div>
  );
}
