import React from "react";
import classes from "./BuildControls.module.css";
import BuildControl from "./BuildControl/BuildControl";

const controls = [
  { label: "Salad", type: "salad" },
  { label: "Tomato", type: "tomato" },
  { label: "Cheese", type: "cheese" },
  { label: "Jam", type: "jam" }
];
const BuildControls = props => {
  return (
    <div className={classes.BuildControls}>
      <p>
        current price: <strong>{props.price.toFixed(2)}</strong>
      </p>
      {controls.map(ctrl => {
        return (
          <BuildControl
            key={ctrl.label}
            label={ctrl.label}
            moreClicked={() => props.moreClicked(ctrl.type)}
            lessClicked={() => props.lessClicked(ctrl.type)}
            disabled={props.disabled[ctrl.type]}
          />
        );
      })}
      <button
        className={classes.OrderButton}
        disabled={!props.purchasable}
        onClick={props.ordered}
      >
        {props.isAuth?"ORDER NOW":"SIGN UP TO ORDER"}
      </button>
    </div>
  );
};

export default BuildControls;
