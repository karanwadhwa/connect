import { SET_TOKEN, SET_USER } from "./types";
import API from "../../config/api";

export const setToken = token => {
  return {
    type: SET_TOKEN,
    payload: token
  };
};

export const setUser = token => dispatch => {
  API.get("/api/auth/whoami", {
    headers: {
      Authorization: token
    }
  })
    .then(response => {
      dispatch({
        type: SET_USER,
        payload: response.data.user
      });
    })
    .catch(err => {
      dispatch({
        type: SET_USER,
        payload: {}
      });
    });
};
