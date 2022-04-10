import React from "react";
import Dice from "./Dice";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

export default function Game() {
  const [tenzies, setTenzies] = React.useState(false);
  const [dice, setDice] = React.useState(allNewDice());

  React.useEffect(() => {
    const isGameWon =
      dice.every((die) => die.isHeld === true) &&
      dice.every((die) => die.value === dice[0].value);
    setTenzies(isGameWon);
  }, [dice]);

  const mapNumbers = dice.map((die) => (
    <Dice
      key={die.id}
      value={die.value}
      isHeld={die.isHeld}
      holdDice={() => holdDice(die.id)}
    />
  ));

  function allNewDice() {
    const newDiceNum = [];
    for (let i = 0; i < 10; i++) {
      newDiceNum.push({
        value: Math.ceil(Math.random() * 6),
        isHeld: false,
        id: nanoid(),
      });
    }
    return newDiceNum;
  }

  function rollDice() {
    if (tenzies === false) {
      setDice((oldDice) =>
        oldDice.map((die) => {
          if (die.isHeld === false) {
            return {
              ...die,
              value: Math.ceil(Math.random() * 6),
            };
          }
          return die;
        })
      );
    } else {
      setTenzies(false);
      setDice(allNewDice());
    }
  }

  function holdDice(id) {
    setDice((oldDice) =>
      oldDice.map((die) => {
        if (id === die.id) {
          return {
            ...die,
            isHeld: !die.isHeld,
          };
        }
        return die;
      })
    );
  }

  return (
    <main className="container">
      {tenzies === true ? <Confetti /> : ""}
      <div className="game">
        <div className="gameText">
          <h1>Tenzies</h1>
          <p>
            Roll until all dice are the same. Click each die to freeze it at its
            current value between rolls.
          </p>
        </div>
        <div className="diceGrid">{mapNumbers}</div>
        <button onClick={rollDice}>
          {tenzies === false ? "Roll" : "Reset game"}
        </button>
      </div>
    </main>
  );
}
