import * as actionTypes from "./actionTypes";
import axios from "../../axios-orders";

export const purchaseSuccess = (orderId, orderData) => {
  return {
    type: actionTypes.PURCHASE_SUCCESS,
    orderId: orderId,
    orderData: orderData,
  };
};
export const purchaseFailed = (error) => {
  return {
    type: actionTypes.PURCHASE_FAILED,
    error: error,
  };
};
export const setPurchase = () => {
  return {
    type: actionTypes.SET_PURCHASE,
  };
};
export const purchaseSandwich = (orderData) => {
  return (dispatch) => {
    dispatch(setPurchase());
    axios
      .post("/orders.json", orderData)
      .then((response) => {
        console.log(response.data);
        dispatch(purchaseSuccess(response.data.name, orderData));
      })
      .catch((error) => {
        dispatch(purchaseFailed(error));
      });
  };
};

export const purchaseInit = () => {
  return {
    type: actionTypes.PURCHASE_INIT,
  };
};

export const fetchOrdersStart = () =>{
  return {
    type: actionTypes.FETCH_ORDERS_START,
  };
};

export const fetchOrdersSuccess = (orders) =>{
  return {
    type: actionTypes.FETCH_ORDERS_SUCCESS,
    orders: orders,
  };
};

export const fetchOrdersFailed = (error) =>{
  return {
    type: actionTypes.FETCH_ORDERS_FAILED,
    error: error,
  };
};

export const fetchOrders = ()=>{
  return dispatch=>{
    dispatch(fetchOrdersStart());
    axios
      .get("/orders.json")
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
        dispatch(fetchOrdersSuccess(fetchOrders))
      })
      .catch(err => {
        dispatch(fetchOrdersFailed(err))
      });
  }
}