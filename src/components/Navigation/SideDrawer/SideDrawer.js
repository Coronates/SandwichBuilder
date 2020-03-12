import React from "react";
import Logo from "../../Logo/logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import classes from "./SideDrawer.module.css";
import BackDrop from "../../UI/Backdrop/Backdrop";

const SideDrawer = props => {
  let styleClasses = [classes.SideDrawer, classes.Closed];
  if (props.open) {
    styleClasses = [classes.SideDrawer, classes.Open];
    
  }
  return (
    <>
      <BackDrop show={props.open} clicked={props.close} />
      <div className={styleClasses.join("  ")}>
        <div className={classes.Logo}>
          <Logo />
        </div>
        <nav>
          <NavigationItems />
        </nav>
      </div>
    </>
  );
};

export default SideDrawer;
