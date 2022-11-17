import { GET_ALL_POSTERS_ACTION, SET_ALL_POSTER_ACTION } from "./constants";
import axios from 'axios';
import { useDispatch } from "react-redux";
import { setAllPostersAction } from "./actions";

const initialState = {
  posters: {}
};

export const posterReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_POSTERS_ACTION: {
      let posters = {}
      const dispatch = useDispatch()
    axios.get("https://mo-strelna.ru/mobile/mobile.php?type=get_all_poster").then(res => {
      (res.data).map(element => {
        posters = {...posters, 
          "tytle": element.title,
          // "description": element.description,
          "tickets": element.tickets,
          "place": element.place,
          "startsAt": date(element.startsAt)
        }
      });
      dispatch(setAllPostersAction())
    }).catch((error) => {
      console.log(error);
    })
    }
    case SET_ALL_POSTER_ACTION: {
      let posters = action.payload 
        return {
          ...state,
          posters
        }
    }
    default:
      return state;
  }
};


function date(dateStamp) {
  let date = Number(dateStamp + "000")
  return new Date(new Date(date).setHours(new Date(date).getHours() + 3))
}