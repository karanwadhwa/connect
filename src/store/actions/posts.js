import { FETCH_POSTS, POST_LOADING } from "./types";
import API from "../../config/api";

export const fetchPosts = token => dispatch => {
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
