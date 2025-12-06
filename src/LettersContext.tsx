import React, { createContext, useContext, useState, ReactNode } from 'react';

interface LettersContextType {
  selectedLetters: string[];
  setSelectedLetters: (letters: string[]) => void;
  toggleLetter: (letter: string) => void;
  isLetterSelected: (letter: string) => boolean;
}

const LettersContext = createContext<LettersContextType | undefined>(undefined);

const ALL_LETTERS = [
  'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
  'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
];

interface LettersProviderProps {
  children: ReactNode;
}

export const LettersProvider: React.FC<LettersProviderProps> = ({ children }) => {
  const [selectedLetters, setSelectedLetters] = useState<string[]>(ALL_LETTERS);

  const toggleLetter = (letter: string) => {
    setSelectedLetters(prev => {
      if (prev.includes(letter)) {
        // Don't allow deselecting if it's the last letter
        if (prev.length === 1) return prev;
        return prev.filter(l => l !== letter);
      } else {
        return [...prev, letter].sort();
      }
    });
  };

  const isLetterSelected = (letter: string): boolean => {
    return selectedLetters.includes(letter);
  };

  const value = {
    selectedLetters,
    setSelectedLetters,
    toggleLetter,
    isLetterSelected,
  };

  return (
    <LettersContext.Provider value={value}>
      {children}
    </LettersContext.Provider>
  );
};

export const useLetters = (): LettersContextType => {
  const context = useContext(LettersContext);
  if (context === undefined) {
    throw new Error('useLetters must be used within a LettersProvider');
  }
  return context;
};

export { ALL_LETTERS };
