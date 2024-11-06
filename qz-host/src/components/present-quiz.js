import React, { useState } from 'react';
import QuizCarousel from './questions-carousel';

const PresentQuiz = () => {
    // Local state to hold quiz ID and message
    const [quizId, setQuizId] = useState('');
    const [quizQuestions, setQuizQuestions] = useState([]);

    const findQuiz = async () => {
        try {
            // Call API with GET to retrieve a JSON with quiz information
            const response = await fetch(process.env.REACT_APP_API_GATEWAY_PREFIX_ENDPOINT + '/quiz/' + quizId, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (response.ok) {
                const data = await response.json();
                const parsed_body = JSON.parse(data.body)

                const parsed_questions = JSON.parse(parsed_body.questions)
                setQuizQuestions(parsed_questions)

            } else {
                console.error('Error: ', response.status, response.statusText);
            }
        } catch (error) {
            console.error('Fetch error: ', error);
        }
    };

    return (
        <div className='present-quiz-container'>
            <div className='present-quiz-search'>
                <h1>Present Quiz</h1>
                <input
                    type="text"
                    placeholder="Enter quiz ID"
                    value={quizId}
                    onChange={(e) => setQuizId(e.target.value)}
                />
                <button onClick={findQuiz}>Go</button>
            </div>

            {quizQuestions.length > 0 && (
                <>
                    <div className='quiz-carousel-card'>

                        <QuizCarousel quizId={quizId} questions={quizQuestions} />
                    </div>
                </>
            )}
        </div>
    );
};

export default PresentQuiz;