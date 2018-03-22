import React from "react";
import NavigationItem from "./NavigationItem/NavigationItem";
import classes from "./NavigationItems.css";

const navigationItems = props => (
  <ul className={classes.NavigationItems}>
    <NavigationItem linkTo="/login">Login</NavigationItem>
    <NavigationItem linkTo="/register">Register</NavigationItem>
  </ul>
);

export default navigationItems;
