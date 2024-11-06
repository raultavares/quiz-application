import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/home';
import CreateQuiz from './pages/create-quiz';
import ManageQuiz from './pages/manage-quiz';
import PresentQuiz from './pages/present-quiz';
import './index.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create-quiz" element={<CreateQuiz />} />
          <Route path="/manage-quiz" element={<ManageQuiz />} />
          <Route path="/present-quiz" element={<PresentQuiz />} />
        </Routes>
      </div>
    </Router>
  );
}
export default App;
