import {
  FETCH_POSTS,
  POST_LOADING,
  POST_REFRESHING,
  LIKE_POST,
  SELECT_POST
} from "../actions/types";

const inititalState = {
  posts: {},
  selectedPost: null,
  loading: false,
  refreshing: false,
  error: {}
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
    case LIKE_POST:
      let posts = [...state.posts];
      let index = posts.findIndex(post => post._id === action.payload._id);
      posts[index] = action.payload;
      return {
        ...state,
        posts
      };
    case SELECT_POST:
      return {
        ...state,
        selectedPost: action.payload
      };
    default:
      return state;
  }
};
