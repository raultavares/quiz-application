# Quiz Application

This project consists of two separate applications: qz-host (for quiz hosts) and qz-player (for quiz participants).

## qz-host

### Description
qz-host is a React-based web application designed for quiz hosts to create, manage, and present quizzes.

### Features
- Create quizzes
- Manage existing quizzes
- Present quizzes to participants
- User-friendly interface with Material-UI components

### Installation

1. Clone the repository

2. Run the CloudFormation Template in your AWS Account

3. Navigate to the qz-host directory:
cd qz-host

4. Install dependencies:
npm install

5. Create a .env file in the root of the qz-host directory and add the necessary environment variables below:

### Usage

To start the development server:
npm start

To build for production:
npm run build

### Main Dependencies
- React 18.3.1
- React Router 6.26.2
- Material-UI 6.1.5
- AWS Amplify 6.6.4