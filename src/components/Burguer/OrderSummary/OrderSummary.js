import React, { Component } from "react";
import Button from "../../UI/Button/Button";

class OrderSummary extends Component {
  //lifecycle in order to re-render the modal only when necessary
  componentWillUpdate(){
    console.log('[orderSummary.js] willUpdate');
  }
  render() {
    const summaryIngredients = Object.keys(this.props.ingredients).map(
      igKey => {
        return (
          <li key={igKey}>
            <span style={{ transform: "capitalize" }}>{igKey}</span>:
            {this.props.ingredients[igKey]}
          </li>
        );
      }
    );
    return (
      <>
        <h3>Your Order </h3>
        <p>A delicious burguer with:</p>
        <ul>{summaryIngredients}</ul>
        <p>
          <strong>total price: {this.props.price.toFixed(2)}</strong>
        </p>
        <p>continue to checkout?</p>
        <Button btnType="Danger" clicked={this.props.cancelClicked}>
          CANCEL
        </Button>
        <Button btnType="Success" clicked={this.props.continueClicked}>
          CONTINUE
        </Button>
      </>
    );
  }
}
export default OrderSummary;
