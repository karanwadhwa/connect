import { SET_TOKEN, SET_USER, AUTH_LOADING } from "./types";
import firebase from "firebase";
import API from "../../config/api";

export const setToken = token => {
  return {
    type: SET_TOKEN,
    payload: token
  };
};

export const setUser = token => dispatch => {
  dispatch(setAuthLoading());
  API.get("/api/auth/whoami", {
    headers: {
      Authorization: token
    }
  })
    .then(response => {
      // firebase signin
      firebase.auth().signInWithCustomToken(response.data.user.firebaseToken);

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

export const setAuthLoading = () => {
  return {
    type: AUTH_LOADING
  };
};

export const updateUser = updatedUser => {
  return {
    type: SET_USER,
    payload: updatedUser
  };
};
