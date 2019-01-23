import { SET_TOKEN } from "../actions/types";

const inititalState = {
  accessToken: null
};

export default (state = inititalState, action) => {
  switch (action.type) {
    case SET_TOKEN:
      return {
        ...state,
        accessToken: action.payload
      };
    default:
      return state;
  }
};
