import React, { Component } from "react";
import Burguer from "../../components/Burguer/Burguer";
import BuildControls from "../../components/Burguer/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burguer/OrderSummary/OrderSummary";

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.3,
  meat: 2,
  bacon: 0.7
};

class BurguerBuilder extends Component {
  /*constructor(props) {
        super(props)
    
        this.state = {
             
        }
    }*/
  state = {
    ingredients: {
      salad: 0,
      cheese: 0,
      bacon: 0,
      meat: 0
    },
    totalPrice: 5,
    purchasable: false,
    purchasing: false
  };

  purchaseHandler = () => {
    this.setState({
      purchasing: true
    });
  };
  purchaseCancelledHandler = () => {
    this.setState({
      purchasing: false
    });
  };
  continueHandler = () => {
    alert("you continue!");
  };

  updatePurchase = ingredients => {
    //const ingredients = { ...this.state.ingredients };
    const sum = Object.keys(ingredients)
      .map(key => {
        return ingredients[key];
      })
      .reduce((arr, el) => {
        return arr + el;
      }, 0);
    const isPurchasable = sum > 0;
    this.setState({
      purchasable: isPurchasable
    });
  };
  addIngredientHandler = type => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;
    const updatedIngredients = { ...this.state.ingredients };
    updatedIngredients[type] = updatedCount;
    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;
    this.setState({
      ingredients: updatedIngredients,
      totalPrice: newPrice
    });
    this.updatePurchase(updatedIngredients);
  };
  removeIngredientHandler = type => {
    const oldCount = this.state.ingredients[type];
    if (oldCount <= 0) {
      return;
    }

    const updatedCount = oldCount - 1;
    const updatedIngredients = { ...this.state.ingredients };
    updatedIngredients[type] = updatedCount;
    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - priceAddition;
    this.setState({
      ingredients: updatedIngredients,
      totalPrice: newPrice
    });
    this.updatePurchase(updatedIngredients);
  };

  render() {
    const disabledInfo = {
      ...this.state.ingredients
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    // {salad:true, meat:false ...}
    return (
      <>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelledHandler}
        >
          <OrderSummary
            ingredients={this.state.ingredients}
            cancelClicked={this.purchaseCancelledHandler}
            continueClicked={this.continueHandler}
            price={this.state.totalPrice}
          />
        </Modal>
        <Burguer ingredients={this.state.ingredients} />
        <BuildControls
          price={this.state.totalPrice}
          moreClicked={this.addIngredientHandler}
          lessClicked={this.removeIngredientHandler}
          disabled={disabledInfo}
          purchasable={this.state.purchasable}
          ordered={this.purchaseHandler}
        />
      </>
    );
  }
}

export default BurguerBuilder;
