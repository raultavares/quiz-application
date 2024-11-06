import React, { useState } from 'react';
import { Amplify } from 'aws-amplify';
import { generateClient } from 'aws-amplify/api';
import { publishMessage } from '../graphql/mutations';
import AmplifyConfig from '../amplify/AmplifyConfig'

Amplify.configure(AmplifyConfig);

const client = generateClient();

const ManageQuiz = () => {
    // Local state to hold quiz ID and message
    const [quizId, setQuizId] = useState('');
    const [message, setMessage] = useState('');

    const json_test = { "message_action": "player_joined" }

    // Function to publish the message
    const handlePublish = async () => {
        try {
            if (!quizId || !message) {
                alert('Please enter both a quiz ID and a message.');
                return;
            }

            const response = await client.graphql(
                {query: publishMessage, variables: { quiz_id: quizId, message: JSON.stringify(json_test) }});
            console.log('Message published:', response);
            setMessage(''); // Clear message input
        } catch (error) {
            console.error('Error publishing message:', error);
        }
    };

    return (
        <div>
            <h2>Publish a Message</h2>
            <input
                type="text"
                placeholder="Enter quiz ID"
                value={quizId}
                onChange={(e) => setQuizId(e.target.value)}
            />
            <br />
            <input
                type="text"
                placeholder="Enter message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />
            <br />
            <button onClick={handlePublish}>Publish Message</button>
        </div>
    );
};

export default ManageQuiz;