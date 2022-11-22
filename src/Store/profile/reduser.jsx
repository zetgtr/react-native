import { SET_ALL_PROFILE_ACTION } from "./constants";

const initialState = {
  invites: [],
  familys: [],
  loading: true,
};

export const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ALL_PROFILE_ACTION: {
      let invites = action.payload.invites;
      let familys = action.payload.familys;
      return {
        ...state,
        invites,
        familys,
        loading: false,
      };
    }
    default:
      return state;
  }
};
