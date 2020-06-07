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
export const purchaseSandwich = (orderData, token) => {
  return (dispatch) => {
    dispatch(setPurchase());
    axios
      .post("/orders.json?auth=" + token, orderData)
      .then((response) => {
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

export const fetchOrdersStart = () => {
  return {
    type: actionTypes.FETCH_ORDERS_START,
  };
};

export const fetchOrdersSuccess = (orders) => {
  return {
    type: actionTypes.FETCH_ORDERS_SUCCESS,
    orders: orders,
  };
};

export const fetchOrdersFailed = (error) => {
  return {
    type: actionTypes.FETCH_ORDERS_FAILED,
    error: error,
  };
};

export const fetchOrders = (token, userId) => {
  return (dispatch) => {
    dispatch(fetchOrdersStart());
    const params =
      "?auth=" + token + '&orderBy="userId"&equalTo="' + userId + '"';
    axios
      .get("/orders.json" + params)
      .then((res) => {
        //RES is an objects not an array
        const fetchOrders = [];
        for (const [key, value] of Object.entries(res.data)) {
          fetchOrders.push({
            ...value,
            id: key,
          });
        }
        dispatch(fetchOrdersSuccess(fetchOrders));
      })
      .catch((err) => {
        dispatch(fetchOrdersFailed(err));
      });
  };
};
