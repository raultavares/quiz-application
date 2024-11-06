# Quiz Application

This project consists of two separate applications: qz-host (for quiz hosts) and qz-player (for quiz participants). <br>
Visit this [Blog Post](https://oraultavares.medium.com/using-generative-ai-react-and-serverless-to-create-a-fun-and-interactive-quiz-game-application-9b77ec61cc8b) for detailed installation/usage instructions.

## Steps to Install and Test it

### Description
qz-host is a React-based web application designed for quiz hosts to create, manage, and present quizzes.

### Features
- Create quizzes
- Manage existing quizzes
- Present quizzes to participants
- User-friendly interface with Material-UI components

### Installation

1. Clone the repository

2. Run the CloudFormation Template quiz-application-cf-template.yaml in your AWS Account

### Installation (Host)
1. Navigate to the qz-host directory:
cd qz-host

2. Install dependencies:
npm install

3. Create a .env file in the root of the qz-host directory and add the necessary environment variables below:
```
PORT=9000
REACT_APP_GRAPHQL_KEY=THE KEY COPIED FROM OUTPUTS TAB
REACT_APP_GRAPHQL_ENDPOINT=THE GRAPHQL API COPIED FROM OUTPUTS TAB
REACT_APP_GRAPHQL_REGION=us-east-1
REACT_APP_API_GATEWAY_PREFIX_ENDPOINT=THE API GATEWAY COPIED FROM OUTPUTS TAB
```

4. Start the Application
npm start


### Installation (Host)
1. Navigate to the qz-host directory:
cd qz-player

2. Install dependencies:
npm install

3. Create a .env file in the root of the qz-host directory and add the necessary environment variables below:
```
PORT=9001
REACT_APP_GRAPHQL_KEY=THE KEY COPIED FROM OUTPUTS TAB
REACT_APP_GRAPHQL_ENDPOINT=THE GRAPHQL API COPIED FROM OUTPUTS TAB
REACT_APP_GRAPHQL_REGION=us-east-1
REACT_APP_API_GATEWAY_PREFIX_ENDPOINT=THE API GATEWAY COPIED FROM OUTPUTS TAB
```

4. Start the Application
npm start

### Main Dependencies
- React 18.3.1
- React Router 6.26.2
- Material-UI 6.1.5
- AWS Amplify 6.6.4

### Live Demo
Under construction. Come back soon!