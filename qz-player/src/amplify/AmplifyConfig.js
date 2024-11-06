const AmplifyConfig = {
    API: {
        GraphQL: {
          endpoint: process.env.REACT_APP_GRAPHQL_ENDPOINT,
          region: process.env.REACT_APP_GRAPHQL_REGION,
          defaultAuthMode: 'apiKey',
          apiKey: process.env.REACT_APP_GRAPHQL_KEY
        }
    }
  };
  

export default AmplifyConfig;