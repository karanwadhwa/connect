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
  DELETE_POST,
  ADD_NEW_POST
} from "./types";
import API from "../../config/api";

// fetch all posts accessible by the logged in user
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

export const selectPost = post => {
  return {
    type: SELECT_POST,
    payload: post
  };
};

// fetch a single (selected)post
export const fetchSelectedPost = (token, postID) => dispatch => {
  dispatch(setSelectedPostRefreshing());
  dispatch(setSelectedPostLoading());
  API.get("/api/posts/id=" + postID, {
    headers: {
      Authorization: token
    }
  }).then(response => {
    dispatch({
      type: FETCH_SELECTED_POST,
      payload: response.data
    });
  });
};

export const setSelectedPostLoading = () => {
  return {
    type: SELECTED_POST_LOADING
  };
};

export const setSelectedPostRefreshing = () => {
  return {
    type: SELECTED_POST_REFRESHING
  };
};

export const commentPost = (token, postID, commentData) => dispatch => {
  API.post("/api/posts/comment/id=" + postID, commentData, {
    headers: {
      Authorization: token
    }
  }).then(response => {
    dispatch({
      type: COMMENT_POST,
      payload: response.data
    });
  });
};

export const deletePost = (token, postID) => dispatch => {
  API.delete("/api/posts/id=" + postID, {
    headers: {
      Authorization: token
    }
  }).then(response => {
    dispatch({
      type: DELETE_POST,
      payload: response.data.post
    });
  });
};

export const deleteComment = (token, postID, commentID) => dispatch => {
  API.delete(`/api/posts/comment/pid=${postID}&&cid=${commentID}`, {
    headers: {
      Authorization: token
    }
  }).then(response => {
    dispatch({
      type: FETCH_SELECTED_POST,
      payload: response.data.post
    });
  });
};

export const addNewPost = post => {
  return {
    type: ADD_NEW_POST,
    payload: post
  };
};
