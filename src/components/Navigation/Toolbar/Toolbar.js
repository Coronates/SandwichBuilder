import React from "react";
import classes from "./Toolbar.module.css";
import Logo from "../../Logo/logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import Home from "../SideDrawer/MenuButton/MenuButton"

const Toolbar = props => {
  return (
    <header className={classes.Toolbar}>
      <Home clicked={props.clicked}/>
      <div className={classes.Logo}>
        <Logo />
      </div>

      <nav className={classes.DesktopOnly}>
        <NavigationItems />
      </nav>
    </header>
  );
};

export default Toolbar;
