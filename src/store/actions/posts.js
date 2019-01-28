import {
  FETCH_POSTS,
  POST_LOADING,
  POST_REFRESHING,
  LIKE_POST,
  SELECT_POST
} from "./types";
import API from "../../config/api";

export const fetchPosts = token => dispatch => {
  dispatch(setPostRefreshing());
  dispatch(setPostLoading());
  API.get("/api/posts", {
    headers: {
      Authorization: token
    }
  }).then(response => {
    dispatch({
      type: FETCH_POSTS,
      payload: response.data
    });
  });
};

export const setPostLoading = () => {
  return {
    type: POST_LOADING
  };
};

export const setPostRefreshing = () => {
  return {
    type: POST_REFRESHING
  };
};

export const likePost = (token, postID) => dispatch => {
  API.post(
    "/api/posts/like/id=" + postID,
    {},
    {
      headers: {
        Authorization: token
      }
    }
  ).then(response => {
    dispatch({
      type: LIKE_POST,
      payload: response.data
    });
  });
};

export const selectPost = postID => {
  return {
    type: SELECT_POST,
    payload: postID
  };
};
