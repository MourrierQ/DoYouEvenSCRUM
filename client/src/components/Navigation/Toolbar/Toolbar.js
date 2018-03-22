import React from "react";
import NavigationItems from "./NavigationItems/NavigationItems";
import classes from "./Toolbar.css";

const toolbar = props => {
  return (
    <div className={classes.Toolbar}>
      <h1>DoYouEvenSCRUM !?</h1>
      <NavigationItems />
    </div>
  );
};

export default toolbar;
