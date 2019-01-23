import { SET_TOKEN } from "./types";

export const setToken = token => {
  console.log("setToken action");
  return {
    type: SET_TOKEN,
    payload: token
  };
};
