import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface LettersContextType {
  selectedLetters: string[];
  setSelectedLetters: (letters: string[]) => void;
  toggleLetter: (letter: string) => void;
  isLetterSelected: (letter: string) => boolean;
}

const LettersContext = createContext<LettersContextType | undefined>(undefined);

const ALL_LETTERS = [
  'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'Ñ', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
];

const STORAGE_KEY = "sound-it-selected-letters";

interface LettersProviderProps {
  children: ReactNode;
}

// helper function to load selected letters from localStorage
const loadSelectedLettersFromStorage = (): string[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      // validate that it's an array of strings and all letters exist in ALL_LETTERS
      if (
        Array.isArray(parsed) &&
        parsed.every(
          (letter) =>
            typeof letter === "string" && ALL_LETTERS.includes(letter),
        )
      ) {
        // ensure at least one letter is selected
        return parsed;
      }
    }
  } catch (error) {
    console.warn("Failed to load selected letters from localStorage:", error);
  }

  // return all letters as default
  return ALL_LETTERS;
};

// helper function to save selected letters to localStorage
const saveSelectedLettersToStorage = (letters: string[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(letters));
  } catch (error) {
    console.warn("Failed to save selected letters to localStorage:", error);
  }
};

export const LettersProvider: React.FC<LettersProviderProps> = ({
  children,
}) => {
  const [selectedLetters, setSelectedLettersState] = useState<string[]>(() => {
    // initialize with letters from localStorage on first render
    return loadSelectedLettersFromStorage();
  });

  // wrapper function that also saves to localStorage
  const setSelectedLetters = (letters: string[]) => {
    setSelectedLettersState(letters);
    saveSelectedLettersToStorage(letters);
  };

  const toggleLetter = (letter: string) => {
    setSelectedLetters(prev => {
      if (prev.includes(letter)) {
        return prev.filter((l: string) => l !== letter);
      } else {
        return [...prev, letter].sort();
      }
    });
  };

  const isLetterSelected = (letter: string): boolean => {
    return selectedLetters.includes(letter);
  };

  // save to localStorage whenever selectedLetters changes
  useEffect(() => {
    saveSelectedLettersToStorage(selectedLetters);
  }, [selectedLetters]);

  const value = {
    selectedLetters,
    setSelectedLetters,
    toggleLetter,
    isLetterSelected,
  };

  return (
    <LettersContext.Provider value={value}>{children}</LettersContext.Provider>
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
