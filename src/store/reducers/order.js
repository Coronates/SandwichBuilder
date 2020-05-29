import * as actionTypes from "../actions/actionTypes";
import { fetchOrders } from "../actions";

const initialState = {
  orders: [],
  loading: false,
  purchased: false,
};

const purchaseInit = (state, action) => {
  return {
    ...state,
    loading: false,
    purchased: false,
  };
};
const setPurchase = (state, action) => {
  return {
    ...state,
    loading: true,
  };
};
const purchaseSuccess = (state, action) => {
  const newOrder = {
    ...action.orderData,
    id: action.orderId,
  };
  return {
    ...state,
    loading: false,
    orders: state.orders.concat(newOrder),
    purchased: true,
  };
};
const purchaseFailed = (state, action) => {
  return {
    ...state,
    loading: false,
  };
};
const fetchOrdersStart = (state, action) => {
  return {
    ...state,
    loading: true,
  };
};
const fetchOrdersSuccess = (state, action) => {
  return {
    ...state,
    loading: false,
    orders: action.orders,
  };
};
const fetchOrdersFailed = (state, action) => {
  return {
    ...state,
    loading: false,
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PURCHASE_INIT: return purchaseInit(state,action);
    case actionTypes.SET_PURCHASE: return setPurchase(state,action);
    case actionTypes.PURCHASE_SUCCESS: return purchaseSuccess(state,action);
    case actionTypes.PURCHASE_FAILED: return purchaseFailed(state,action);
    case actionTypes.FETCH_ORDERS_START: return fetchOrdersStart(state,action);
    case actionTypes.FETCH_ORDERS_SUCCESS: return fetchOrdersSuccess(state,action);
    case actionTypes.FETCH_ORDERS_FAILED: return fetchOrdersFailed(state,action);
    default: return state;
  }
};

export default reducer;
