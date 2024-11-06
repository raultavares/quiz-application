import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import  { Amplify } from 'aws-amplify';
import { generateClient } from 'aws-amplify/api';
import { addPlayer } from '../graphql/mutations';
import AmplifyConfig from '../amplify/AmplifyConfig';

// Amplify configuration.
Amplify.configure(AmplifyConfig);

const client = generateClient();

function QuizJoinForm() {
  const [name, setName] = useState('');
  const [quizId, setQuizId] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (name && quizId) {

      // Redirect to the quiz page with name and quizId as state variables
      localStorage.setItem('name', name);
      localStorage.setItem('quizId', quizId);

    // Add the user to the quiz before navigating
    try {
        await client.graphql({
          query: addPlayer,
          variables: { player_name: name, quiz_id: quizId }
        });
        
        // Now navigate to the lobby page
        navigate('/lobby/' + quizId);
      } catch (error) {
        console.error('Error adding player:', error);
      }

    }
  };

  useEffect(() => {
    
    
  }, []);

  return (
    
    <><div className='logo'><img src='/img/logo.png' /> </div>
    <div className='join-quiz-container'>

      <form onSubmit={handleSubmit}>

        <div>
          <input
            type="text"
            id="quizId"
            placeholder='Game ID'
            value={quizId}
            onChange={(e) => setQuizId(e.target.value)}
            required
          />
        </div>

        <div>
          <input
            type="text"
            id="name"
            placeholder='Nickname'
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>


        <button type="submit">Join!</button>
      </form>
    </div>
    </>
  );
}

export default QuizJoinForm;
