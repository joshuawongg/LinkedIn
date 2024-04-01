// Container component
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://poussan.stepzen.net/api/oldfashioned-lambkin/__graphql',
  headers: {'Authorization':'apikey poussan::stepzen.io+1000::3559f93365816f924df7b8bdf35ddd3052ef0e4e171237d4cf273d663ffe36d9'},
  cache: new InMemoryCache(),
});