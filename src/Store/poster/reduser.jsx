import { GET_ALL_POSTERS_ACTION, SET_ALL_POSTER_ACTION } from "./constants";

const initialState = {
  posters: [],
  loading: true,
};

export const posterReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_POSTERS_ACTION: {
      //   const dispatch = useDispatch()
    }
    case SET_ALL_POSTER_ACTION: {
      let posters = action.payload;
      return {
        ...state,
        posters,
        loading: false,
      };
    }
    default:
      return state;
  }
};