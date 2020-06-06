import React, { Component } from "react";
import Layout from "../containers/Layout/Layout";
import SandwichBuilder from "./SandwichBuilder/SandwichBuilder";
import Checkout from "./Checkout/Checkout";
import { Route, Switch, withRouter, Redirect } from "react-router";
import Orders from "./Orders/Orders";
import Auth from "./Auth/Auth";
import Logout from "./Auth/Logout/Logout";
import { connect } from "react-redux";
import * as actions from "../store/actions/index";

class App extends Component {
  componentDidMount() {
    this.props.onAutoSignUp();
  }
  render() {
    let routes = (
      <Switch>
        <Route path="/auth" exact component={Auth} />
        <Route path="/" exact component={SandwichBuilder} />
        <Redirect to="/" />
      </Switch>
    );
    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/checkout" component={Checkout} />
          <Route path="/orders" component={Orders} />
          <Route path="/logout" exact component={Logout} />
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
