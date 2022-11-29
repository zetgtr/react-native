import { SET_POSTER_ACTION, SET_ALL_POSTER_ACTION } from "./constants";

export const setPosterAction = (payload) => ({
  type: SET_POSTER_ACTION,
  payload,
});

export const setAllPostersAction = (payload) => ({
  type: SET_ALL_POSTER_ACTION,
  payload,
});
