import { useEffect, useState, useRef } from 'react';
import { Amplify } from 'aws-amplify';
import { generateClient } from 'aws-amplify/api';
import { Slide, LinearProgress, Modal, Box } from '@mui/material';
import { onMessage } from '../graphql/subscriptions';
import AmplifyConfig from '../amplify/AmplifyConfig';

// Amplify configuration.
Amplify.configure(AmplifyConfig);

const client = generateClient();

function Game() {

    const [checked, setChecked] = useState(true); // To control the animation
    const [questionAlternatives, setQuestionAlternatives] = useState([]);
    const [questionTitle, setQuestionTitle] = useState('');
    const [correctAnswerIndex, setCorrectAnswerIndex] = useState(null);

    // Variables that do not depend or trigger on rendering state
    const questionNumberRef = useRef(0);
    const answerTimestampRef = useRef('');
    const selectedAnswerRef = useRef(null);
    const quizId = useState('');
    const playerName = useState('');

    // Handling timers
    const [progress, setProgress] = useState(0);  // For the LinearProgress bar
    const [timer, setTimer] = useState(null);     // To store the setTimeout reference
    const [countdown, setCountdown] = useState(null);

    // For handling scores and modal
    const [showScoresModal, setShowScoresModal] = useState(false);
    const [scores, setScores] = useState([]);

    // For handling answer selection
    const handleAnswerSelect = (index) => {
        selectedAnswerRef.current = index;
        answerTimestampRef.current = Math.floor(Date.now() / 1000).toString();
    };

    const handleCloseModal = () => {
        setShowScoresModal(false);
    };

    useEffect(() => {

        // read the question object from localStorage
        const storedQuestion = localStorage.getItem('quizQuestion');
        const storedQuizId = localStorage.getItem('quizId');
        const storedPlayerName = localStorage.getItem('name');
        const storedStartQuiz = localStorage.getItem('startQuiz');

        quizId.current = storedQuizId;
        playerName.current = storedPlayerName;

        // Subscribe to onMessage events when the page loads
        const subscription = client.graphql(
            { query: onMessage, variables: { quiz_id: quizId.current } }
        ).subscribe({
            next: (eventData) => {

                const newMessage = eventData.data.onMessage;

                const parsedMessage = JSON.parse(newMessage.message)

                if (parsedMessage.message_action === "show_scores") {
                    // Set the scores data and open the modal
                    setScores(parsedMessage.scores);
                    setShowScoresModal(true);
                    setCorrectAnswerIndex(parsedMessage.correct_answer);
                }

                if (parsedMessage.message_action === "show_question") {
                    setShowScoresModal(false);
                    startCountdown(parsedMessage);
                }

            },
            error: (err) => console.error('Subscription error:', err),
        });

        // Clear the answer selection and progress on new question load
        const resetQuestionState = () => {
            selectedAnswerRef.current = null; // Clear selected answer
            setProgress(0);          // Reset progress bar
            if (timer) clearTimeout(timer);  // Clear any previous timers
        };

        // Trigger progress countdown when a question is received
        const startProgressTimer = () => {
            resetQuestionState();

            let progressValue = 0;
            const progressInterval = setInterval(() => {
                progressValue += 1;
                setProgress(progressValue);

                if (progressValue >= 100) {
                    clearInterval(progressInterval);
                    submitAnswer(); // Submit after 10 seconds
                }
            }, 100);  // Update progress every 100ms

            // Save the timer reference to clear later if needed
            setTimer(progressInterval);
        };

        const showQuestion = (parsedMessage) => {
            setCorrectAnswerIndex(null);  // Reset correct answer index
            setQuestionAlternatives(parsedMessage.qe_alternatives);
            setQuestionTitle(parsedMessage.qe_question);
            questionNumberRef.current = parsedMessage.qe_number;
        }

        const startCountdown = (parsedMessage) => {
            setCountdown(3); // Start countdown at 3 seconds
    
            const countdownInterval = setInterval(() => {
                setCountdown(prev => {
                    if (prev === 1) {
                        clearInterval(countdownInterval); // Stop countdown when it reaches zero
                        setCountdown(null); // Clear countdown display
                        showQuestion(parsedMessage);
                        startProgressTimer();
                        return null;
                    }
                    return prev - 1; // Decrement countdown by 1 each second
                });
            }, 1000);
        };

        if (storedStartQuiz) {
            startCountdown(JSON.parse(storedQuestion));
            localStorage.removeItem('startQuiz');
        }

        // Cleanup the subscription and the timer when the component unmounts
        return () => {
            subscription.unsubscribe();
            if (timer) clearInterval(timer);
        };

    }, []);

    const submitAnswer = async () => {

        // Prepare the object
        const answerObject = {
            quiz_id: quizId.current,
            player_name: playerName.current,
            question_number: questionNumberRef.current - 1,
            player_answer: selectedAnswerRef.current,
            timestamp: answerTimestampRef.current
        };

        // Send the POST request to the API
        try {
            const response = await fetch(process.env.REACT_APP_API_GATEWAY_PREFIX_ENDPOINT + '/answer/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(answerObject),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

        } catch (error) {
            console.error('Error submitting answer:', error);
        }
    };

    return (
        <div className="question-container">
            {countdown !== null ? (
            <div className='countdown'><h2>{countdown}</h2></div>  // Display countdown
        ) : (
            <>
            <h2>{questionTitle}</h2>

            < div className='alternatives-container'>
                {questionAlternatives.map((answer, index) => (
                    <Slide key={index} direction="up" in={checked} mountOnEnter unmountOnExit>
                        <div
                            className={
                                `questionWrapper ${selectedAnswerRef.current === index ? 'alternative-wrapper selected' : 'alternative-wrapper idle'} ` +
                                `${correctAnswerIndex === index ? 'correct-answer' : ''}`
                            }
                            onClick={() => handleAnswerSelect(index)}
                        >
                            <div className='answer-text'> {answer} </div>
                        </div>
                    </Slide>
                ))}
            </div>

            {/* LinearProgress bar with determinate behavior */}
            <LinearProgress variant="determinate" value={progress} />
            </>)}

            {/* Modal for showing scores */}
            <Modal
                open={showScoresModal}
                onClose={handleCloseModal}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
            >
                <Box className='scores-modal-container'>

                    <h2>Quiz Scores</h2>

                    {/* Loop through the scores and display them */}
                    {scores.map((scoreObj, index) => (
                        <div key={index}>
                            <strong>{scoreObj.player}</strong>: {scoreObj.score} points
                        </div>
                    ))}

                </Box>
            </Modal>


        </div>
    );
};

export default Game;