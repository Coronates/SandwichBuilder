import * as actionTypes from "../actions/actionTypes";

const initialState = {
  ingredients: null,
  error: false,
  totalPrice: 5,
  cooking: false,
};
const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.3,
  jam: 2,
  tomato: 0.7,
};
const addIngredient = (state, action) => {
  return {
    ...state,
    ingredients: {
      ...state.ingredients,
      [action.ingredientName]: state.ingredients[action.ingredientName] + 1,
    },
    totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
    cooking: true,
  };
};

const removeIngredient = (state, action) => {
  return {
    ...state,
    ingredients: {
      ...state.ingredients,
      [action.ingredientName]: state.ingredients[action.ingredientName] - 1,
    },
    totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
    cooking: true,
  };
};

const setIngredients = (state,action) => {
  return {
    ...state,
    ingredients: {
      salad: action.ingredients.salad,
      tomato: action.ingredients.tomato,
      cheese: action.ingredients.cheese,
      jam: action.ingredients.jam,
    },
    error: false,
    totalPrice: 5,
    cooking: false,
  };
};

const fetchFailed = (state,action)=>{
  return {
    ...state,
    error: true,
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT: return addIngredient(state, action);
    case actionTypes.REMOVE_INGREDIENT: return removeIngredient(state, action);
    case actionTypes.SET_INGREDIENTS: return setIngredients(state,action);
    case actionTypes.FETCH_INGREDIENT_FAILED: return fetchFailed(state,action);  
    default: return state;
  }
};

export default reducer;
