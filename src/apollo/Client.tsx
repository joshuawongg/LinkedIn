// Container component
import { ApolloClient, InMemoryCache, ApolloProvider, TypePolicies } from "@apollo/client";

const typePolicies: TypePolicies = {
  Query: {
    fields: {
      postPaginatedList: {
        keyArgs: false,
        merge(existing = [], incoming) {
          return [...existing, ...incoming]
        }
      }
    }
  }
};

const client = new ApolloClient({
  uri: "https://poussan.stepzen.net/api/oldfashioned-lambkin/__graphql",
  headers: {
    Authorization:
      "apikey poussan::stepzen.io+1000::3559f93365816f924df7b8bdf35ddd3052ef0e4e171237d4cf273d663ffe36d9",
  },
  cache: new InMemoryCache({ typePolicies }),
});

export default client;

