import React from "react";
import Layout from "../containers/Layout/Layout";
import SandwichBuilder from "./SandwichBuilder/SandwichBuilder";
import Checkout from "./Checkout/Checkout";
import { Route, Switch } from "react-router";
import Orders from "./Orders/Orders";

function App() {
  return (
    <div className="App">
      <Layout>
        <Switch>
          <Route path="/checkout" component={Checkout} />
          <Route path="/orders" component={Orders}/>
          <Route path="/" exact component={SandwichBuilder} />
        </Switch>
      </Layout>
    </div>
  );
}

export default App;
