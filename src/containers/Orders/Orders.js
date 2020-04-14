import React, { Component } from "react";
import Order from "../../components/Order/Order";
import axios from "../../axios-orders";

import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

class Orders extends Component {
  state = {
    orders: [],
    loading: true
  };
  componentDidMount() {
    axios
      .get("/orders.json    ")
      .then(res => {
        //RES is an objects not an array
        console.log(res.data);

        const fetchOrders = [];
        for (const [key, value] of Object.entries(res.data)) {
          fetchOrders.push({
            ...value,
            id: key
          });
        }
        this.setState({
          loading: false,
          orders: fetchOrders
        });
      })
      .catch(err => {
        this.setState({
          loading: false
        });
      });
  }
  render() {
    console.log(this.state.orders);
    return (
      <div>
        {this.state.orders.map(order => (
          <Order
            key={order.id}
            ingredients={order.ingredients}
            price={order.price}
          />
        ))}
      </div>
    );
  }
}

export default withErrorHandler(Orders, axios);
