import { FETCH_POSTS } from "./types";
import API from "../../config/api";

export const fetchPosts = token => dispatch => {
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
