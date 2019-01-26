import { FETCH_POSTS, POST_LOADING, POST_REFRESHING } from "../actions/types";

const inititalState = {
  posts: {},
  selectedPost: null,
  loading: false,
  refreshing: false
};

export default (state = inititalState, action) => {
  switch (action.type) {
    case POST_LOADING:
      return {
        ...state,
        loading: true
      };
    case POST_REFRESHING:
      return {
        ...state,
        refreshing: true
      };
    case FETCH_POSTS:
      return {
        ...state,
        posts: action.payload,
        loading: false,
        refreshing: false
      };
    default:
      return state;
  }
};
