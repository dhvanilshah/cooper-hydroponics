import React, { Component } from "react";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import PublicRoutes from "./router";
import { ApolloClient, InMemoryCache } from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { createHttpLink } from "apollo-link-http";
import { setContext } from "apollo-link-context";
import Startup from "./startup";
import "./App.css";

const httpLink = createHttpLink({
  // uri: "http://localhost:8000/api"
  uri: "cooper-hydroponics.herokuapp.com/api"
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("hydroponics-token");
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      "hydroponics-token": token ? `${token}` : ""
    }
  };
});

export const client = new ApolloClient({
  // uri: process.env.API
  //uri: "https://shellfish-traceability.herokuapp.com/api"
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Provider store={store}>
          <Startup>
            <PublicRoutes />
          </Startup>
        </Provider>
      </ApolloProvider>
    );
  }
}

export default App;
