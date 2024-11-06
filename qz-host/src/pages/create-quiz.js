import React from 'react';
import CreateQuiz from '../components/create-quiz';
import Sidebar from '../components/sidebar';

function App() {

  return (
    <div className="App">
      <Sidebar />
      <CreateQuiz />
    </div>
  );
}

export default App;