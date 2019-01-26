import { SET_TOKEN, SET_USER } from "../actions/types";

const inititalState = {
  accessToken: null,
  user: {}
};

export default (state = inititalState, action) => {
  switch (action.type) {
    case SET_TOKEN:
      return {
        ...state,
        accessToken: action.payload
      };
    case SET_USER:
      return {
        ...state,
        user: action.payload
      };
    default:
      return state;
  }
};
