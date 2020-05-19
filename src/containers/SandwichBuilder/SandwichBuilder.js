import React, { Component } from "react";
import Sandwich from "../../components/Sandwich/Sandwich";
import BuildControls from "../../components/Sandwich/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Sandwich/OrderSummary/OrderSummary";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
//redux
import { connect } from "react-redux";
import * as actionTypes from "../../store/actions";

class SandwichBuilder extends Component {
  state = {
    purchasing: false,
    loading: false,
    error: false,
  };

  purchaseHandler = () => {
    this.setState({
      purchasing: true,
    });
  };
  purchaseCancelledHandler = () => {
    this.setState({
      purchasing: false,
    });
  };
  continueHandler = () => {
    this.props.history.push({
      pathname: "/checkout",
    });
  };

  updatePurchase = (ingredients) => {
    const sum = Object.keys(ingredients)
      .map((key) => {
        return ingredients[key];
      })
      .reduce((arr, el) => {
        return arr + el;
      }, 0);
    return sum > 0;
  };

  render() {
    const disabledInfo = {
      ...this.props.ings,
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let orderSummary = null;

    let sandwich = this.state.error ? (
      <p>Ingredients can't be loaded</p>
    ) : (
      <Spinner />
    );

    if (this.props.ings) {
      sandwich = (
        <React.Fragment>
          <Sandwich ingredients={this.props.ings} />
          <BuildControls
            price={this.props.price}
            moreClicked={this.props.onIngredientAdded}
            lessClicked={this.props.onIngredientRemoved}
            disabled={disabledInfo}
            purchasable={this.updatePurchase(this.props.ings)}
            ordered={this.purchaseHandler}
          />
        </React.Fragment>
      );
      orderSummary = (
        <OrderSummary
          ingredients={this.props.ings}
          cancelClicked={this.purchaseCancelledHandler}
          continueClicked={this.continueHandler}
          price={this.props.price}
        />
      );
    }
    if (this.state.loading) {
      orderSummary = <Spinner />;
    }

    // {salad:true, meat:false ...}
    return (
      <React.Fragment>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelledHandler}
        >
          {orderSummary}
        </Modal>
        {sandwich}
      </React.Fragment>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    ings: state.ingredients,
    price: state.totalPrice,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onIngredientAdded: (igName) =>
      dispatch({
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: igName,
      }),
    onIngredientRemoved: (igName) =>
      dispatch({
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: igName,
      }),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(SandwichBuilder, axios));
