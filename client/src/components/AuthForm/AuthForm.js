import React, { Component } from "react";
import { graphql, compose } from "react-apollo";
import gql from "graphql-tag";
import classes from "./AuthForm.css";

class AuthForm extends Component {
  state = {
    username: null,
    email: null,
    password: null
  };

  onChangeHandler = event => {
    const newState = { ...this.state };
    newState[event.target.name] = event.target.value;
    this.setState({ [event.target.name]: newState[event.target.name] });
  };

  onSubmitLoginHandler = event => {
    event.preventDefault();
    console.log(this.state);
    this.props
      .Login({
        variables: {
          email: this.state.email,
          password: this.state.password
        }
      })
      .then(({ data }) => {
        localStorage.setItem("doyouevenscrum_token", data.login);
      })
      .catch(error => {
        console.log("There was an error sending the query");
      });
  };

  onSubmitRegisterHandler = event => {
    event.preventDefault();
    console.log(this.state);
    this.props
      .Register({
        variables: {
          username: this.state.username,
          email: this.state.email,
          password: this.state.password
        }
      })
      .then(({ data }) => {
        this.props.history.replace("/login");
      })
      .catch(error => {
        console.log("There was an error sending the query");
      });
  };

  render() {
    console.log(this.props.match.path);
    const formType = this.props.match.path === "/register";
    return (
      <form
        onSubmit={
          formType ? this.onSubmitRegisterHandler : this.onSubmitLoginHandler
        }
        className={classes.AuthForm}
      >
        {formType ? (
          <input
            name="username"
            type="text"
            placeholder="Username"
            onChange={this.onChangeHandler}
          />
        ) : null}
        <input
          onChange={this.onChangeHandler}
          name="email"
          type="text"
          placeholder="Email"
          required
        />
        <input
          onChange={this.onChangeHandler}
          name="password"
          type="password"
          placeholder="Password"
          required
        />
        <input type="submit" value={formType ? "Register" : "Login"} required />
      </form>
    );
  }
}

const Login = gql`
  mutation loginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password)
  }
`;

const Register = gql`
  mutation registerMutation(
    $username: String!
    $email: String!
    $password: String!
  ) {
    register(username: $username, email: $email, password: $password) {
      username
    }
  }
`;

const AuthFormWithMutations = compose(
  graphql(Login, {
    name: "Login"
  }),
  graphql(Register, {
    name: "Register"
  })
)(AuthForm);

export default AuthFormWithMutations;
