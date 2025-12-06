import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useLetters } from "./LettersContext";
import "./App.css";

const Flashcard: React.FC = () => {
  const { selectedLetters } = useLetters();
  const [currentLetter, setCurrentLetter] = useState("");

  const getRandomLetter = () => {
    if (selectedLetters.length === 0) return "A";
    const randomIndex = Math.floor(Math.random() * selectedLetters.length);
    return selectedLetters[randomIndex];
  };

  const handleTap = () => {
    const newLetter = getRandomLetter();
    setCurrentLetter(newLetter);
  };

  useEffect(() => {
    // Set initial random letter when component mounts or selected letters change
    const getRandomLetter = () => {
      if (selectedLetters.length === 0) return "A";
      const randomIndex = Math.floor(Math.random() * selectedLetters.length);
      return selectedLetters[randomIndex];
    };
    setCurrentLetter(getRandomLetter());
  }, [selectedLetters]);

  return (
    <div className="App" onClick={handleTap}>
      <Link
        to="/settings"
        className="settings-button"
        onClick={(e) => e.stopPropagation()}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <circle cx="12" cy="12" r="3"></circle>
          <path d="M12 1v6m0 6v6m11-7h-6m-6 0H1m11-7a4 4 0 0 0-8 0m8 14a4 4 0 0 0-8 0"></path>
        </svg>
      </Link>
      <div className="flashcard-container">
        <div className="flashcard">
          <div className="letter">{currentLetter}</div>
        </div>
      </div>
    </div>
  );
};

export default Flashcard;
