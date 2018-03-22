import React, { Component } from "react";
import Layout from "./hoc/Layout/Layout";

import { Switch, Route } from "react-router-dom";

import HomePage from "./components/HomePage/HomePage";
import AuthForm from "./components/AuthForm/AuthForm";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Layout>
          <Switch>
            <Route exact path="/login" formType="login" component={AuthForm} />
            <Route
              exact
              path="/register"
              formType="register"
              component={AuthForm}
            />
            <Route exact path="/" component={HomePage} />
          </Switch>
        </Layout>
      </React.Fragment>
    );
  }
}

export default App;
