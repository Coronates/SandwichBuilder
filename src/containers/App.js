import React, { Component } from "react";
import Layout from "../containers/Layout/Layout";
import SandwichBuilder from "./SandwichBuilder/SandwichBuilder";
import { Route, Switch, withRouter, Redirect } from "react-router";
import Logout from "./Auth/Logout/Logout";
import { connect } from "react-redux";
import * as actions from "../store/actions/index";
import asyncComponent from "../hoc/asyncComponent/asyncComponent";

const asyncCheckout = asyncComponent(()=>{
  return import("./Checkout/Checkout");
});
const asyncOrders = asyncComponent(()=>{
  return import("./Orders/Orders");
});
const asyncAuth = asyncComponent(()=>{
  return import("./Auth/Auth");
});


class App extends Component {
  componentDidMount() {
    this.props.onAutoSignUp();
  }
  render() {
    let routes = (
      <Switch>
        <Route path="/auth" exact component={asyncAuth} />
        <Route path="/" exact component={SandwichBuilder} />
        <Redirect to="/" />
      </Switch>
    );
    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/checkout" component={asyncCheckout} />
          <Route path="/orders" component={asyncOrders} />
          <Route path="/logout" exact component={Logout} />
          <Route path="/auth" exact component={asyncAuth} />
          <Route path="/" exact component={SandwichBuilder} />
          <Redirect to="/" />
        </Switch>
      );
    }
    return (
      <div className="App">
        <Layout>{routes}</Layout>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.authe.idToken !== null,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onAutoSignUp: () => dispatch(actions.authCheckState()),
  };
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
