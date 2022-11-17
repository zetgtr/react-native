import {
  GET_ALL_POSTERS_ACTION,
  SET_ALL_POSTERS_ACTION
} from "./constants";

export const getAllPostersAction = () => ({
  type: GET_ALL_POSTERS_ACTION,
});

export const setAllPostersAction = (payload) => ({
  type: SET_ALL_POSTERS_ACTION,
  payload
});
