import axios from "axios";
import { ROUTER } from "../Router/constants";
import { setAuthAction } from "../Store/auth/actions";
import { setAllPostersAction } from "../Store/poster/actions";
import { setAllProfileAction } from "../Store/profile/actions";
import { date, dateTime } from "./utils";


function api(url,fun){
  axios
    .get(url).then((res)=>fun(res)).catch((error) => {
      console.log(error);
    });
}

function setDataPoster(res){
  let posters = [];
  res.map((element, index) => {
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
  return posters
}

export const getPosters = (dispatch) => {
  
  api("https://mo-strelna.ru/mobile/mobile.php?type=get_all_poster",(res)=>{
    dispatch(setAllPostersAction(setDataPoster(res.data)));
  })
};

export const signIn = (
  login,
  password,
  setError,
  dispatch,
  navigate,
  setLoading
) => {
  api(`https://mo-strelna.ru/mobile/mobile.php?type=sign_in&login=${login}&password=${password}`,(res)=>{
    if(res.data.auth){
            dispatch(setAuthAction(res.data.auth));
            navigate(ROUTER.PROFILE)
          }
          setLoading(false)
          setError(res.data.error);
           })
};

export const getAuth = (dispatch, navigate) => {
    api(`https://mo-strelna.ru/mobile/mobile.php?type=get_auth`, (res) => {
      if (res.data.auth) {
        dispatch(setAuthAction(res.data.auth))
        // navigate(ROUTER.PROFILE)};
      }
    })
};

export const exitAuth = (dispatch,navigate) => {
  api(`https://mo-strelna.ru/mobile/mobile.php?type=exit_auth`,(res) => {
      if (!res.data.auth) {
        dispatch(setAuthAction(res.data.auth))
        navigate(ROUTER.AUTH)};
    })
};

export const getProfile = (dispatch) => {
  api(`https://mo-strelna.ru/mobile/mobile.php?type=profile`,(res)=>{
    dispatch(setAllProfileAction(setDataPoster(res.data.invites)));
  })
}