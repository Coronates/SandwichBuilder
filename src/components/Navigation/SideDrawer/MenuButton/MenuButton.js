import React from "react";
import classes from "./MenuButton.module.css";
import icon from "../../../../assets/icons/grid.png";

const MenuButton = (props) => {
  return (
    <button className={classes.Button} onClick={props.clicked}>
      <img className = {classes.Img} src={icon} alt="Sandwich icon for display sidedrawer" />
    </button>
  );
};

export default MenuButton;
