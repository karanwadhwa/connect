import { FETCH_POSTS, POST_LOADING } from "../actions/types";

const inititalState = {
  posts: {},
  selectedPost: null,
  loading: false
};

export default (state = inititalState, action) => {
  switch (action.type) {
    case POST_LOADING:
      return {
        ...state,
        loading: true
      };
    case FETCH_POSTS:
      return {
        ...state,
        posts: action.payload,
        loading: false
      };
    default:
      return state;
  }
};
