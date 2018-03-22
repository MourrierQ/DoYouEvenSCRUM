import React from "react";
import ReactDOM from "react-dom";
import { ApolloClient } from "apollo-client";
import { ApolloProvider } from "react-apollo";
import { ApolloLink } from "apollo-link";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";

import { BrowserRouter } from "react-router-dom";

import App from "./App";
import registerServiceWorker from "./registerServiceWorker";

import "./index.css";

const middleWareAuthLink = new ApolloLink((operation, forward) => {
  const token = localStorage.getItem("doyouevenscrum_token");
  const authorizationHeader = token ? `${token}` : null;
  operation.setContext({
    headers: {
      authorization: authorizationHeader
    }
  });
  return forward(operation);
});

const httpLink = new HttpLink({
  uri: "http://127.0.0.1:4000/graphql"
});

const httpLinkWithAuthToken = middleWareAuthLink.concat(httpLink);
const cache = new InMemoryCache();

const client = new ApolloClient({
  link: httpLinkWithAuthToken,
  cache
});

const ApolloApp = () => {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ApolloProvider>
  );
};

ReactDOM.render(<ApolloApp />, document.getElementById("root"));
registerServiceWorker();
