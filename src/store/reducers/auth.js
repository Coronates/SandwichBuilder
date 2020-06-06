import * as actionTypes from "../actions/actionTypes";

const initialState = {
  idToken: null,
  userId: null,
  error: null,
  loading: false,
  authRedirectPath: "/",
};
const authStart = (state, action) => {
  return {
    ...state,
    error: null,
    loading: true,
  };
};
const authDone = (state, action) => {
  return {
    ...state,
    error: null,
    loading: false,
    idToken: action.idToken,
    userId: action.userId,
  };
};
const authFail = (state, action) => {
  return {
    ...state,
    error: action.error,
    loading: false,
  };
};
const authLogout = (state, action) => {
  return {
    ...state,
    idToken: null,
    userId: null,
  };
};

const setAuthRedirectPath = (state, action) => {
  return {
    ...state,
    authRedirectPath: action.path,
  };
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return authStart(state, action);
    case actionTypes.AUTH_SUCCESS:
      return authDone(state, action);
    case actionTypes.AUTH_FAIL:
      return authFail(state, action);
    case actionTypes.AUTH_LOGOUT:
      return authLogout(state, action);
    case actionTypes.SET_AUTH_REDIRECT_PATH:
      return setAuthRedirectPath(state, action);
    default:
      return state;
  }
};

export default reducer;
