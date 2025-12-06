import React, { useState, useEffect } from "react";
import "./App.css";

const LETTERS = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];

function App() {
  const [currentLetter, setCurrentLetter] = useState("A");

  const getRandomLetter = () => {
    const randomIndex = Math.floor(Math.random() * LETTERS.length);
    return LETTERS[randomIndex];
  };

  const handleTap = () => {
    const newLetter = getRandomLetter();
    setCurrentLetter(newLetter);
  };

  useEffect(() => {
    // Set initial random letter when component mounts
    setCurrentLetter(getRandomLetter());
  }, []);

  return (
    <div className="App" onClick={handleTap}>
      <div className="flashcard-container">
        <div className="flashcard">
          <div className="letter">{currentLetter}</div>
        </div>
        <div className="instructions">Tap anywhere to see the next letter!</div>
      </div>
    </div>
  );
}

export default App;
