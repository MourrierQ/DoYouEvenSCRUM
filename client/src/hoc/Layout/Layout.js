import React, { Component } from "react";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import gql from "graphql-tag";
import { graphql } from "react-apollo";
import classes from "./Layout.css";

class Layout extends Component {
  SignupHandler = () => {};

  render() {
    return (
      <div className={classes.Layout}>
        <Toolbar />
        {this.props.children}
      </div>
    );
  }
}

const Login = gql`
  mutation loginMutation {
    login(email: "tst", password: "gdgdgd")
  }
`;

// const Signup = gql`
//   mutation signupMutation {
//       register()
//   }
// `

export default graphql(Login)(Layout);
