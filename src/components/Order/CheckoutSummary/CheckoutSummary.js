import React from "react";
import Sandwich from "../../Sandwich/Sandwich";
import Button from "../../UI/Button/Button";
import classes from "./CheckoutSummary.module.css"

const CheckoutSummary = props => {
  return (
    <div className={classes.CheckoutSummary}>
      <h1>We hope you enjoy it!</h1>
      <div style={{ width: "100%", margin: "auto" }}>
        <Sandwich ingredients={props.ingredients} />
        <Button btnType="Danger" clicked={props.checkoutCancelled}>
          CANCEL
        </Button>
        <Button btnType="Success" clicked={props.checkoutContinued}>
          CONTINUE
        </Button>
      </div>
    </div>
  );
};

export default CheckoutSummary;
