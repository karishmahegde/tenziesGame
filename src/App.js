/*
 * Component: App.js
 * Description:
 * App component renders the Die.js and Footer.js components.
 * It first generates 10 new die.
 * Once all 10 die are frozen to the same value, the state 'tenzies' is set to true, delcaring the game as win.
 * It also records the best score which is the lowest number of rolls.
 */

import React from "react";
import { nanoid } from "nanoid";
import Die from "./components/Die.js";
import Confetti from "react-confetti";
import Footer from "./components/Footer.js";
import "./App.css";

function App() {
  const [tenzies, setTenzies] = React.useState(false); //To track the game status
  const [rollCount, setRollCount] = React.useState(0); //To track the number of rolls for the game
  const [bestRollScore, setBestRollScore] = React.useState(0); //To track the best roll score which is recorded in localStorage

  /*
   * Function: generateNewDie()
   * Description: Generates a single new die element with
   * unique ID
   * value (between 1-6), and
   * isHeld flag set to false
   */
  function generateNewDie() {
    return {
      id: nanoid(),
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
    };
  }

  /*
   * Function: allNewDice()
   * Description: Generates 10 new dice for a new game
   */
  function allNewDice() {
    const newDieArr = [];
    for (let i = 0; i < 10; i++) {
      const newDieObj = generateNewDie();
      newDieArr.push(newDieObj);
    }
    return newDieArr;
  }
  const [dieVal, setDieVal] = React.useState(allNewDice()); //State storing 10 new dice
  const dieSet = dieVal.map(
    (
      die //Creates a map of the 10 dice
    ) => (
      <Die
        key={die.id}
        id={die.id}
        value={die.value}
        isHeld={die.isHeld}
        handleHeld={handleHeld}
      />
    )
  );

  /*
   * Function: handleRoll()
   * Description: Handles when "Roll" button is clicked
   * Checks all 10 die. If state 'tenzies' is true, it implies the game is won. Hence new set of dice is generated for the new game.
   * else, we check the isHeld value
   * If isHeld is true, that die is retained and pushed unchanged.
   * else, a new die is generated.
   * rollCount value is also updated by incrementing by 1
   */
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

  /*
   * Function: handleHeld()
   * Description: Called from Die.js Component when a die is clicked on.
   * Updates the isHeld flag value of the die being clicked.
   * Pushes the remaining dice objects as is.
   */
  function handleHeld(event, dieId) {
    setDieVal((prevDie) => {
      const newDie = [];
      for (let i = 0; i < prevDie.length; i++) {
        if (prevDie[i].id === dieId) {
          //Checking if this is the die that was clicked by checking the unqiue ID value
          const updatedDie = {
            ...prevDie[i],
            isHeld: !prevDie[i].isHeld, //Implementing toggle. If isHeld is false, it is set to true and vice-versa
          };
          newDie.push(updatedDie);
        } else {
          newDie.push(prevDie[i]);
        }
      }
      return newDie;
    });
  }

  //Hook to keep track of game status and update 'tenzies' state
  React.useEffect(() => {
    const dieisHeld = dieVal.every((die) => die.isHeld);
    const dieHeldValue = dieVal[0].value;
    const allDieHeldValue = dieVal.every((die) => die.value === dieHeldValue);
    if (dieisHeld && allDieHeldValue) {
      setTenzies(true);
    }
  }, [dieVal]);

  //Hook to keep track of roll count and set best roll count state
  React.useEffect(() => {
    var bestRollStore = localStorage.getItem("bestRollCount");
    if (!tenzies) {
      if (bestRollStore === null) {
        //bestRollCount is not present in local storage, initialize it
        localStorage.setItem("bestRollCount", JSON.stringify(Number(0)));
      }
      setBestRollScore(localStorage.getItem("bestRollCount"));
    }
    if (tenzies) {
      bestRollStore = localStorage.getItem("bestRollCount");
      // eslint-disable-next-line eqeqeq
      if (bestRollScore == 0) {
        //If bestRollCount is 0, set it to latest roll count
        setBestRollScore(rollCount);
        localStorage.setItem(
          "bestRollCount",
          JSON.stringify(Number(rollCount))
        );
      } else if (rollCount < bestRollStore) {
        //Update bestRollCount only if the current game's rollCount is smaller
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
        <Confetti
          width={document.body.scrollWidth}
          height={document.body.scrollHeight}
        />
      )}
      <main>
        <h1 id="headingText">{tenzies ? "You Won!" : "TENZIES"}</h1>
        <p id="gameRules">
          Roll until all dice are the same. Click each die to freeze it at its
          current value between rolls.
        </p>
        <div className="dieContainer">{dieSet}</div>
        <div>
          <button id="rollBtn" onClick={handleRoll}>
            {tenzies ? "NEW GAME" : "ROLL"}
          </button>
        </div>

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
