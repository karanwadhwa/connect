import { SET_TOKEN, SET_USER, AUTH_LOADING } from "../actions/types";

const inititalState = {
  accessToken: null,
  user: {},
  loading: false
};

export default (state = inititalState, action) => {
  switch (action.type) {
    case AUTH_LOADING:
      return {
        ...state,
        loading: true
      };
    case SET_TOKEN:
      return {
        ...state,
        accessToken: action.payload,
        loading: false
      };
    case SET_USER:
      return {
        ...state,
        user: action.payload,
        loading: false
      };
    default:
      return state;
  }
};
