import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Amplify } from 'aws-amplify';
import { generateClient } from 'aws-amplify/api';
import { getPlayersByQuiz } from '../graphql/queries';
import { onMessage } from '../graphql/subscriptions';
import AmplifyConfig from '../amplify/AmplifyConfig';

// Amplify configuration.
Amplify.configure(AmplifyConfig);

const client = generateClient();


function Lobby() {

    const navigate = useNavigate();

    // Define the quizID here
    const [players, setPlayers] = useState(0);

    // subscribe to events
    useEffect(() => {

        // read the quizId and name from localStorage
        const storedQuizId = localStorage.getItem('quizId');

        // Function to query players in the quiz
        const fetchPlayers = async () => {
            try {
                const response = await client.graphql(
                    { query: getPlayersByQuiz, variables: { quiz_id: storedQuizId } });
                setPlayers(response.data.getPlayersByQuiz);
            } catch (error) {
                console.error('Error fetching players:', error);
            }
        };

        fetchPlayers();

        // Subscribe to onMessage events when the page loads
        const subscription = client.graphql(
            { query: onMessage, variables: { quiz_id: storedQuizId } }
        ).subscribe({
            next: (eventData) => {

                const newMessage = eventData.data.onMessage;

                const parsedMessage = JSON.parse(newMessage.message)

                // logic to handle the message
                if (parsedMessage.message_action === "player_joined") {
                    fetchPlayers();
                }

                if (parsedMessage.message_action === "show_question" && parsedMessage.qe_number === 1) {
                    
                    //save the quiz state to local storage
                    localStorage.setItem('quizQuestion', JSON.stringify(parsedMessage));

                    localStorage.setItem('startQuiz', true);

                    //redirect to game.js page using navigate
                    navigate('/game/' + storedQuizId);

                }
                
            },
            error: (err) => console.error('Subscription error:', err),
        });


        // Cleanup the subscription when component unmounts
        return () => subscription.unsubscribe();

    }, []);

    return (
        <div className="lobby-container">
            <div>
                <h1>Game Lobby</h1>
                <pre>{players} {players > 1 ? 'players' : 'player'} waiting ...</pre>
                </div>
        </div>
    );
};

export default Lobby;