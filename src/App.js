import "./App.css";
import React, { useState } from "react";
import Dice from "react-dice-roll";

function App() {
  const [diceAmount, setDiceAmount] = useState(1);
  const [lockDiceList, setLockDiceList] = useState([]);
  const diceRefs = Array.from({ length: diceAmount }, () => React.createRef());

  const handleRollAllButtonClick = () => {
    if (diceAmount === lockDiceList.length) alert("All dice is locked");
    diceRefs.forEach((ref, index) => {
      if (!lockDiceList.includes(index) && ref.current) {
        ref.current.rollDice();
      }
    });
  };
  const handleInputChange = (event) => {
    setDiceAmount(event.target.value);
  };

  const onLockDice = (diceIndex) => {
    const isDiceLocked = lockDiceList.includes(diceIndex);
    if (!isDiceLocked) {
      setLockDiceList([...lockDiceList, diceIndex]);
    } else {
      setLockDiceList(lockDiceList.filter((el) => el !== diceIndex));
    }
  };

  return (
    <div className="App">
      <h3>Enter Dice Amount</h3>
      <input
        type="text"
        value={diceAmount}
        onChange={handleInputChange}
        placeholder="Enter dice amount ..."
      />
      <div className="container">
        {diceRefs.map((ref, index) => (
          <div className={`dice-wrapper`} onClick={() => onLockDice(index)}>
            <div
              className={`${lockDiceList.includes(index) && "locked-border"}  `}
            ></div>
            <Dice key={index} size={100} ref={ref} triggers={[""]} />
          </div>
        ))}
      </div>
      <button className="roll-btn" onClick={handleRollAllButtonClick}>
        ROLL
      </button>
    </div>
  );
}

export default App;
