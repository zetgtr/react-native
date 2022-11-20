import axios from "axios";
import { setAuthAction } from "../Store/auth/actions";
import { setAllPostersAction } from "../Store/poster/actions";
import { date, dateTime } from "./utils";

export const getPosters = (dispatch) => {
  let posters = [];
  axios
    .get("https://mo-strelna.ru/mobile/mobile.php?type=get_all_poster")
    .then((res) => {
      res.data.map((element, index) => {
        posters[index] = {
          title: element.title,
          description: element.description,
          tickets: element.tickets,
          place: element.place,
          startsAt: date(element.startsAt),
          timeStartAt: dateTime(element.startsAt),
          active: element.active,
          timeEndsAt: dateTime(element.endsAt),
          forCitizens: element.forCitizens,
          limitation: element.limitation,
          regEndsAt: date(element.regEndsAt),
          regStartsAt: date(element.regStartsAt),
          availableTickets: element.availableTickets,
          photo: "https://mo-strelna.ru/" + element.photo,
          classImg: "img" + index,
        };
      });
      dispatch(setAllPostersAction(posters));
    })
    .catch((error) => {
      console.log(error);
    });
};

export const signIn = (
  login,
  password,
  setError,
  dispatch,
  setRender,
  render
) => {
  axios
    .get(
      `https://mo-strelna.ru/mobile/mobile.php?type=sign_in&login=${login}&password=${password}`
    )
    .then((res) => {
      dispatch(setAuthAction(res.data.auth));
      setError(res.data.error);
      setRender(!render);
    })
    .catch((error) => {
      setError(error);
    });
};

export const getAuth = (dispatch, setRender, render) => {
  axios
    .get(`https://mo-strelna.ru/mobile/mobile.php?type=get_auth`)
    .then((res) => {
      if (res.data.auth) dispatch(setAuthAction(res.data.auth));
      setRender(!render);
    })
    .catch((error) => {
      console.log(error);
    });
};

export const exitAuth = (dispatch) => {
  axios
    .get(`https://mo-strelna.ru/mobile/mobile.php?type=exit_auth`)
    .then((res) => {
      if (!res.data.auth) dispatch(setAuthAction(res.data.auth));
    })
    .catch((error) => {
      console.log(error);
    });
};
