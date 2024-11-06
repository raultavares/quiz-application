import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Lobby  from './pages/lobby';
import Home from './pages/home';
import Game from './pages/game';
import './index.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/lobby/:quizId" element={<Lobby />} />
        <Route path="/game/:quizId" element={<Game />} />
      </Routes>
    </Router>
  );
}
export default App;