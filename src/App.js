import React from "react";
import Die from "./components/Die.js";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";
import Footer from "./components/Footer.js";
import "./App.css";

function App() {
  const [tenzies, setTenzies] = React.useState(false);
  const [rollCount, setRollCount] = React.useState(0);
  const [bestRollScore, setBestRollScore] = React.useState(0);

  function generateNewDie() {
    return {
      id: nanoid(),
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
    };
  }

  function allNewDice() {
    const newDieArr = [];
    for (let i = 0; i < 10; i++) {
      const newDieObj = generateNewDie();
      newDieArr.push(newDieObj);
    }
    return newDieArr;
  }
  const [dieVal, setDieVal] = React.useState(allNewDice());
  const dieSet = dieVal.map((die) => (
    <Die
      key={die.id}
      id={die.id}
      value={die.value}
      isHeld={die.isHeld}
      handleHeld={handleHeld}
    />
  ));

  function handleRoll() {
    setDieVal((prevDie) => {
      const newDie = [];
      for (let i = 0; i < prevDie.length; i++) {
        if (tenzies) {
          newDie.push(generateNewDie());
          setTenzies(false);
        } else {
          const isHeldVal = prevDie[i].isHeld;
          if (!isHeldVal) {
            const updatedDie = generateNewDie();
            newDie.push(updatedDie);
          } else {
            newDie.push(prevDie[i]);
          }
        }
      }
      setRollCount((prevRollCount) => (tenzies ? 0 : prevRollCount + 1));
      return newDie;
    });
  }

  function handleHeld(event, dieId) {
    setDieVal((prevDie) => {
      const newDie = [];
      for (let i = 0; i < prevDie.length; i++) {
        if (prevDie[i].id === dieId) {
          const updatedDie = {
            ...prevDie[i],
            isHeld: !prevDie[i].isHeld,
          };
          newDie.push(updatedDie);
        } else {
          newDie.push(prevDie[i]);
        }
      }
      return newDie;
    });
  }

  React.useEffect(() => {
    const dieisHeld = dieVal.every((die) => die.isHeld);
    const dieHeldValue = dieVal[0].value;
    const allDieHeldValue = dieVal.every((die) => die.value === dieHeldValue);
    if (dieisHeld && allDieHeldValue) {
      setTenzies(true);
    }
  }, [dieVal]);

  React.useEffect(() => {
    var bestRollStore = localStorage.getItem("bestRollCount");
    if (!tenzies) {
      if (bestRollStore === null) {
        localStorage.setItem("bestRollCount", JSON.stringify(Number(0)));
      }
      setBestRollScore(localStorage.getItem("bestRollCount"));
    }
    if (tenzies) {
      bestRollStore = localStorage.getItem("bestRollCount");
      if (bestRollScore === 0) {
        setBestRollScore(rollCount);
        localStorage.setItem(
          "bestRollCount",
          JSON.stringify(Number(rollCount))
        );
      } else if (rollCount < bestRollStore) {
        setBestRollScore(rollCount);
        localStorage.setItem(
          "bestRollCount",
          JSON.stringify(Number(rollCount))
        );
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tenzies]);

  return (
    <div>
      {tenzies && (
        <Confetti width={window.innerWidth} height={window.innerHeight} />
      )}
      <main>
        <h1 id="headingText">{tenzies ? "You Won!" : "TENZIES"}</h1>
        <p id="gameRules">
          Roll until all dice are the same. Click each die to freeze it at its
          current value between rolls.
        </p>
        <div className="dieContainer">{dieSet}</div>
        <button id="rollBtn" onClick={handleRoll}>
          {tenzies ? "NEW GAME" : "ROLL"}
        </button>
        <div className="statContainer">
          <p>
            <b>Rolls:</b> {rollCount}
          </p>
          <p>|</p>
          <p>
            <b>Personal Best:</b> {bestRollScore} rolls
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
