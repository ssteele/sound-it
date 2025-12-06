import React from "react";
import { Link } from "react-router-dom";
import { useLetters, ALL_LETTERS } from "./LettersContext";
import "./Settings.css";

const Settings: React.FC = () => {
  const {
    selectedLetters,
    toggleLetter,
    isLetterSelected,
    setSelectedLetters,
  } = useLetters();

  const handleSelectAll = () => {
    setSelectedLetters(ALL_LETTERS);
  };

  const handleDeselectAll = () => {
    // Keep at least one letter selected
    setSelectedLetters([ALL_LETTERS[0]]);
  };

  const handleToggleVowels = () => {
    const vowels = ["A", "E", "I", "O", "U"];
    const allVowelsSelected = vowels.every((vowel) => isLetterSelected(vowel));

    if (allVowelsSelected) {
      // Deselect vowels (but keep at least one letter total)
      const newSelection = selectedLetters.filter(
        (letter) => !vowels.includes(letter),
      );
      if (newSelection.length === 0) {
        setSelectedLetters(["A"]); // Keep at least one
      } else {
        setSelectedLetters(newSelection);
      }
    } else {
      // Select all vowels
      const combined = [...selectedLetters, ...vowels];
      const newSelection = Array.from(new Set(combined)).sort();
      setSelectedLetters(newSelection);
    }
  };

  const handleToggleConsonants = () => {
    const vowels = ["A", "E", "I", "O", "U"];
    const consonants = ALL_LETTERS.filter((letter) => !vowels.includes(letter));
    const allConsonantsSelected = consonants.every((consonant) =>
      isLetterSelected(consonant),
    );

    if (allConsonantsSelected) {
      // Deselect consonants (but keep at least one letter total)
      const newSelection = selectedLetters.filter((letter) =>
        vowels.includes(letter),
      );
      if (newSelection.length === 0) {
        setSelectedLetters(["A"]); // Keep at least one
      } else {
        setSelectedLetters(newSelection);
      }
    } else {
      // Select all consonants
      const combined = [...selectedLetters, ...consonants];
      const newSelection = Array.from(new Set(combined)).sort();
      setSelectedLetters(newSelection);
    }
  };

  return (
    <div className="settings-page">
      <div className="settings-header">
        <Link to="/" className="back-button">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M19 12H5"></path>
            <path d="M12 19l-7-7 7-7"></path>
          </svg>
          Back
        </Link>
        <h1>Settings</h1>
      </div>

      <div className="settings-content">
        <div className="settings-section">
          <h2>Choose Letters to Practice</h2>
          <p className="settings-description">
            Select which letters you'd like to practice. At least one letter
            must be selected.
          </p>

          <div className="quick-actions">
            <button onClick={handleSelectAll} className="action-button">
              Select All
            </button>
            <button onClick={handleDeselectAll} className="action-button">
              Deselect All
            </button>
            <button
              onClick={handleToggleVowels}
              className="action-button vowels"
            >
              Toggle Vowels (A, E, I, O, U)
            </button>
            <button
              onClick={handleToggleConsonants}
              className="action-button consonants"
            >
              Toggle Consonants
            </button>
          </div>

          <div className="letter-grid">
            {ALL_LETTERS.map((letter) => {
              const isSelected = isLetterSelected(letter);
              const isVowel = ["A", "E", "I", "O", "U"].includes(letter);
              const isLastSelected = selectedLetters.length === 1 && isSelected;

              return (
                <button
                  key={letter}
                  className={`letter-toggle ${isSelected ? "selected" : ""} ${isVowel ? "vowel" : "consonant"} ${isLastSelected ? "disabled" : ""}`}
                  onClick={() => toggleLetter(letter)}
                  disabled={isLastSelected}
                  title={
                    isLastSelected
                      ? "At least one letter must be selected"
                      : `Toggle ${letter}`
                  }
                >
                  {letter}
                </button>
              );
            })}
          </div>

          <div className="selected-count">
            <strong>{selectedLetters.length}</strong> of{" "}
            <strong>{ALL_LETTERS.length}</strong> letters selected
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
