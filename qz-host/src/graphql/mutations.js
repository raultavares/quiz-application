/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const addPlayer = /* GraphQL */ `
  mutation AddPlayer($player_name: String!, $quiz_id: ID!) {
    addPlayer(player_name: $player_name, quiz_id: $quiz_id) {
      player_id
      player_name
      quiz_id
      __typename
    }
  }
`;
export const publishMessage = /* GraphQL */ `
  mutation PublishMessage($quiz_id: ID!, $message: AWSJSON!) {
    publishMessage(quiz_id: $quiz_id, message: $message) {
      quiz_id
      message
      __typename
    }
  }
`;
