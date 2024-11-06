import React, { useState } from 'react';
import './questions-carousel.css';
import { Amplify } from 'aws-amplify';
import { generateClient } from 'aws-amplify/api';
import { publishMessage } from '../graphql/mutations';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import AmplifyConfig from '../amplify/AmplifyConfig'

Amplify.configure(AmplifyConfig);

const client = generateClient();

let auxArray = ['a', 'b', 'c', 'd']

const QuizCarousel = ({ quizId, questions }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    if (questions.length === 0 || !quizId) {
        return <p>No quiz selected</p>; // If no quiz ID is set, display this message or nothing.
    }

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % questions.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? questions.length - 1 : prevIndex - 1
        );
    };

    // Function to handle the play button click
    const handlePlayClick = async () => {

        const current_question_obj = questions[currentIndex]; // array-based should be zero, for all frontend interactions add +1 so it does not start at zero

        delete current_question_obj.qe_answer;

        const show_question_json = { "message_action": "show_question", "qe_number": currentIndex + 1, ...current_question_obj }

        try {
            await client.graphql(
                { query: publishMessage, variables: { quiz_id: quizId, message: JSON.stringify(show_question_json) } });
        } catch (error) {
            console.error('Error publishing message:', error);
        }

    };

    const currentQuestion = questions[currentIndex];

    return (
        <div className="carousel-container">
            <div className="carousel-content">
                <div className="question">

                    <h3>Question {currentIndex + 1}</h3>

                    {currentQuestion && currentQuestion.qe_question
                        ? <h1> {currentQuestion.qe_question}</h1>
                        : 'Question not available'}

                </div>

                <ul className="alternatives">
                    {currentQuestion && currentQuestion.qe_alternatives
                        ? currentQuestion.qe_alternatives.map((alt, index) => (
                            <li key={index}>{auxArray[index]}. {alt}</li>
                        ))
                        : 'No alternatives available'}
                </ul>

            </div>

            <div className="button-container">
                
                
                <span className='back-button'>
                {currentIndex > 0 && (
                    <ArrowBackIosIcon sx={{ fontSize: 50 }} onClick={prevSlide} />
                )}
                </span>
                
                <span className='play-button'>
                    <PlayCircleIcon sx={{ fontSize: 50 }} onClick={handlePlayClick} />
                </span>

                <span className='forward-button'>
                {currentIndex < questions.length - 1 && (
                    <ArrowForwardIosIcon sx={{ fontSize: 50 }} onClick={nextSlide} />
                )}
                    </span>

            </div>
        </div>
    );
};

export default QuizCarousel;
