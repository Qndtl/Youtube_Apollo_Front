import { ApolloClient, InMemoryCache } from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client';
import { setContext } from '@apollo/client/link/context';

const httpLink = createUploadLink({
  uri: process.env.NODE_ENV === "production" ?
    "https://youtube-clone-apollo.herokuapp.com/graphql" :
    "http://localhost:4000/graphql"
})

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      token: localStorage.getItem('jwt')
    }
  }
})

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

export default client;