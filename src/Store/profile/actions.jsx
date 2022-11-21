import { GET_ALL_POSTERS_ACTION, SET_ALL_PROFILE_ACTION } from "./constants";

export const getAllPostersAction = () => ({
  type: GET_ALL_POSTERS_ACTION,
});

export const setAllProfileAction = (payload) => ({
  type: SET_ALL_PROFILE_ACTION,
  payload,
});
