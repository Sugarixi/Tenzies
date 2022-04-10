import React from "react";

export default function Dice(props) {
  const styles = {
    backgroundColor: props.isHeld ? "#59E391" : "#ffffff",
  };
  return (
    <div className="dice" onClick={props.holdDice} style={styles}>
      {props.value}
    </div>
  );
}
