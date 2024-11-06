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

  const handleGenerateDemoQuiz = async (e) => {

    setAlternatives([]);
    setQuizID(null);
    setQuizData({});

    let quizObj = {
      "quiz_id": "123456",
      "qz_info": {
       "qz_description": "Test your knowledge about the role of cats in ancient Egyptian culture and history.",
       "qz_name": "Cats and Ancient Egypt Quiz"
      },
      "qz_questions": [
       {
        "qe_alternatives": [
         "Bastet",
         "Anubis",
         "Ra",
         "Horus"
        ],
        "qe_answer": 0,
        "qe_picture": "",
        "qe_question": "Which ancient Egyptian deity was represented as a cat or a cat-headed woman?"
       },
       {
        "qe_alternatives": [
         "Pets",
         "Protectors of the home",
         "Symbols of fertility",
         "All of the above"
        ],
        "qe_answer": 3,
        "qe_picture": "",
        "qe_question": "What roles did cats serve in ancient Egyptian society?"
       },
       {
        "qe_alternatives": [
         "Mummified",
         "Buried with their owners",
         "Worshipped in temples",
         "All of the above"
        ],
        "qe_answer": 3,
        "qe_picture": "",
        "qe_question": "How were cats honored and treated in ancient Egypt?"
       },
       {
        "qe_alternatives": [
         "Killing a cat was punishable by death",
         "Cats were considered sacred animals",
         "Cat mummies were used as offerings to the gods",
         "All of the above"
        ],
        "qe_answer": 3,
        "qe_picture": "",
        "qe_question": "Which of the following statements about cats in ancient Egypt are true?"
       },
       {
        "qe_alternatives": [
         "Hunting rodents",
         "Protecting grain stores",
         "Catching birds",
         "All of the above"
        ],
        "qe_answer": 3,
        "qe_picture": "",
        "qe_question": "What practical roles did cats play in ancient Egyptian households?"
       },
       {
        "qe_alternatives": [
         "Bastet",
         "Sekhmet",
         "Isis",
         "Nephthys"
        ],
        "qe_answer": 1,
        "qe_picture": "",
        "qe_question": "Which ancient Egyptian goddess was depicted as a lioness or a woman with a lion's head?"
       },
       {
        "qe_alternatives": [
         "Bubastis",
         "Thebes",
         "Memphis",
         "Giza"
        ],
        "qe_answer": 0,
        "qe_picture": "",
        "qe_question": "Which ancient Egyptian city was known for its cat cult and had a temple dedicated to the cat goddess Bastet?"
       },
       {
        "qe_alternatives": [
         "Hunting",
         "Fertility",
         "Protection",
         "All of the above"
        ],
        "qe_answer": 3,
        "qe_picture": "",
        "qe_question": "Which of the following qualities were associated with cats in ancient Egyptian mythology and symbolism?"
       }
      ]
     }

    
    setQuizData(quizObj);
    setAlternatives(quizObj.qz_questions)
  }

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
          <Button variant='contained' className='gen-demo-quiz-button' onClick={handleGenerateDemoQuiz}>Load Demo Quiz</Button>
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
