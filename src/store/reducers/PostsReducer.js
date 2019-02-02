import {
  FETCH_POSTS,
  POST_LOADING,
  POST_REFRESHING,
  LIKE_POST,
  SELECT_POST,
  SELECTED_POST_LOADING,
  SELECTED_POST_REFRESHING,
  FETCH_SELECTED_POST,
  COMMENT_POST,
  DELETE_POST
} from "../actions/types";

const inititalState = {
  posts: {},
  selectedPost: {
    post: null,
    loading: false,
    refreshing: false
  },
  loading: false,
  refreshing: false,
  error: {}
};

export default (state = inititalState, action) => {
  switch (action.type) {
    // loading and refreshing array of posts
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
        selectedPost: {
          post: action.payload
        }
      };
    case SELECTED_POST_LOADING:
      return {
        ...state,
        selectedPost: {
          loading: true
        }
      };
    case SELECTED_POST_REFRESHING:
      return {
        ...state,
        selectedPost: {
          refreshing: true
        }
      };
    case FETCH_SELECTED_POST:
      return {
        ...state,
        selectedPost: {
          post: action.payload,
          loading: false,
          refreshing: false
        }
      };
    case COMMENT_POST: {
      let posts = [...state.posts];
      let index = posts.findIndex(post => post._id === action.payload._id);
      posts[index] = action.payload;
      return {
        ...state,
        posts,
        selectedPost: {
          post: action.payload
        }
      };
    }
    case DELETE_POST: {
      let posts = [...state.posts];
      let index = posts.findIndex(post => post._id === action.payload._id);
      posts.splice(index, 1);
      return {
        ...state,
        posts
      };
    }
    default:
      return state;
  }
};
