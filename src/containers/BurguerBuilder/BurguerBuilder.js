import React, { Component } from "react";
import Burguer from "../../components/Burguer/Burguer";
import BuildControls from "../../components/Burguer/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burguer/OrderSummary/OrderSummary";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

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
    ingredients: null,
    totalPrice: 5,
    purchasable: false,
    purchasing: false,
    loading: false,
    error:false
  };
  componentDidMount() {
    axios
      .get("https://burguerbuilder1.firebaseio.com/ingredients.json")
      .then(response => {
        this.setState({
          ingredients: response.data
        });
      }).catch(error=>{
        this.setState({
          error:true
        });
      });
  }

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
    //alert("you continue!");
    this.setState({
      loading: true
    });
    const order = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice,
      customer: {
        name: "Andres Coronado",
        address: {
          street: "tttstreet",
          zipCode: "251111",
          country: "Polombia"
        },
        email: "a@test.com",
        deliveryMethod: "fastest"
      }
    };
    axios
      .post("/orders.json", order)
      .then(response => {
        //console.log(response);
        this.setState({
          loading: false,
          purchasing: false
        });
      })
      .catch(error => {
        //console.log(error);
        this.setState({
          loading: false,
          purchasing: false
        });
      });
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

    let orderSummary = null;

    
    let burguer = this.state.error?<p>Ingredients can't be loaded</p>:<Spinner />;

    if (this.state.ingredients) {
      burguer = (
        <>
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
      orderSummary = (
        <OrderSummary
          ingredients={this.state.ingredients}
          cancelClicked={this.purchaseCancelledHandler}
          continueClicked={this.continueHandler}
          price={this.state.totalPrice}
        />
      );
    }
    if (this.state.loading) {
      orderSummary = <Spinner />;
    }

    // {salad:true, meat:false ...}
    return (
      <>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelledHandler}
        >
          {orderSummary}
        </Modal>
        {burguer}
      </>
    );
  }
}

export default withErrorHandler(BurguerBuilder, axios);
