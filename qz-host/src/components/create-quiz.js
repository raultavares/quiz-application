import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { Card, CardContent } from '@mui/material';

const CreateQuiz = () => {

 const [formData, setFormData] = useState({
    quiz_domain: 'any domain you want',
    quiz_difficulty: 'easy',
    question_count: 6
  });
  const [isLoading, setIsLoading] = useState(false);
  const [alternatives, setAlternatives] = useState([]);
  const [quizData, setQuizData] = useState({});
  const [message, setMessage] = useState('No quiz generated yet')
  const [quizID, setQuizID] = useState(null);

  let auxArray = ['a', 'b', 'c', 'd']

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAlternatives([])
    setIsLoading(true);

    try {
      const response = await fetch(process.env.REACT_APP_API_GATEWAY_PREFIX_ENDPOINT + '/quiz/generator', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      // Extract the body part of the API response
      const responseBody = JSON.parse(data.body);

      // Parse the generated_text inside the body
      let quizObj = JSON.parse(responseBody.generated_text)
      setQuizData(quizObj);
      setAlternatives(quizObj.qz_questions)

    } catch (error) {
      console.error("There was an error submitting the form:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setAlternatives([])
  };

  const handleSave = async () => {

    setIsLoading(true);

    try {
      const response = await fetch(process.env.REACT_APP_API_GATEWAY_PREFIX_ENDPOINT + '/quiz/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(quizData)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      const responseBody = data.body;

      setQuizID(responseBody.quiz_id);
      setAlternatives([])
      setMessage('Quiz' + responseBody.quiz_id + ' saved successfully');

    } catch (error) {
      console.error("There was an error submitting the form:", error);
    } finally {
      setIsLoading(false);
    }


  };

  return (
    <>      
      <div className="create-quiz-container">
        <h1 className="text-2xl font-bold mb-4">Generate Quiz</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <p>Prompt:</p>
            <textarea
              id="prompt"
              name="quiz_domain"
              value={formData.quiz_domain}
              onChange={handleInputChange}
              required
              className="w-full p-2 border rounded"
              rows="4"
            />
          </div>

          <div>
            <p>Difficulty:</p>
            <select
              id="difficulty"
              name="quiz_difficulty"
              value={formData.quiz_difficulty}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>

          <div>
            <p>Number of Questions:</p>
            <input
              type="number"
              id="questionCount"
              name="question_count"
              value={formData.question_count}
              onChange={handleInputChange}
              min="2"
              max="10"
              required
              className="w-full p-2 border rounded"
            />
          </div>
          <br></br>
          <Button
            type="submit"
            disabled={isLoading}
            variant="contained"
            className='gen-quiz-button'
          >
            {isLoading ? 'Generating Quiz! Please wait...' : 'Generate Quiz'}
          </Button>
        </form>

      </div>

      <div className='card-quiz-container'>
        {quizID && <h1>Your Quiz ID is: {quizID}</h1>}
        {alternatives.length > 0 ? (
          <>
            <h1>Your Quiz</h1>
            {alternatives.map((alternative, index) => (
              <Card className='card-quiz-questions' key={index}>
                <CardContent>
                  <b>
                    {index + 1} - {alternative.qe_question}
                  </b>

                  {alternative.qe_alternatives.map((alt, i) => (
                    <p key={i}>
                      {auxArray[i]}. {alt}
                    </p>
                  ))}
                </CardContent>
              </Card>
            ))}

            <Button onClick={handleSave} disabled={isLoading} className="submit-quiz" variant="contained" color="success">
              {isLoading ? 'Saving Quiz' : 'Save Quiz'}
            </Button>
            <Button onClick={handleCancel} className="submit-quiz" variant="contained" color="error">
              Start Again
            </Button>
          </>
        ) : (<div>
          {!quizID && <h2>{message}</h2>}
        </div>)
        }
      </div>
    </>
  );
};

export default CreateQuiz;
