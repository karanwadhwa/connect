import { FETCH_POSTS } from "../actions/types";

const inititalState = {
  posts: {},
  selectedPost: null
};

export default (state = inititalState, action) => {
  switch (action.type) {
    case FETCH_POSTS:
      return {
        ...state,
        posts: action.payload
      };
    default:
      return state;
  }
};
