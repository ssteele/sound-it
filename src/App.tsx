import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LettersProvider } from "./LettersContext";
import Flashcard from "./Flashcard";
import Settings from "./Settings";
import "./App.css";

function App() {
  return (
    <LettersProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Flashcard />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Router>
    </LettersProvider>
  );
}

export default App;
