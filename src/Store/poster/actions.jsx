import { SET_POSTER_ACTION, SET_ALL_POSTER_ACTION, LOADING_POSTER_ACTION } from "./constants";

export const setPosterAction = (payload) => ({
  type: SET_POSTER_ACTION,
  payload,
});

export const setAllPostersAction = (payload) => ({
  type: SET_ALL_POSTER_ACTION,
  payload,
});

export const loadingPosterAction = (payload) => ({
  type: LOADING_POSTER_ACTION,
  payload
})