import axios from "axios";
import { ROUTER } from "../Router/constants";
import { setAuthAction } from "../Store/auth/actions";
import {
  loadingPosterAction,
  setAllPostersAction,
  setPosterAction,
} from "../Store/poster/actions";
import { setAllProfileAction } from "../Store/profile/actions";
import { date, dateTime, removeTags } from "./utils";

function api(url, fun) {
  axios
    .get(url)
    .then((res) => fun(res))
    .catch((error) => {
      console.log(error);
    });
}

function setDataPoster(element, index = 0) {
  return {
    event: element.event,
    title: element.title,
    description: removeTags(element.description),
    tickets: element.tickets,
    place: element.place,
    startsAt: date(element.startsAt),
    end: date(element.startsAt, true),
    stamp: element.startsAt,
    timeStartAt: dateTime(element.startsAt),
    active: element.active,
    timeEndsAt: dateTime(element.endsAt),
    forCitizens: element.forCitizens,
    id: element.id,
    limitation: element.limitation,
    regEndsAt: date(element.regEndsAt),
    regStartsAt: date(element.regStartsAt),
    availableTickets: element.availableTickets,
    photo: "https://mo-strelna.ru/" + element.photo,
    classImg: "img" + index,
  };
}

function setFamilys(res) {
  let familys = [];
  res?.map((element, index) => {
    familys[index] = {
      firstname: element.firstname,
      lastname: element.lastname,
      patronymic: element.patronymic,
      id: element.id,
      citizen: element.citizen,
      valid: element.valid,
      novalid: element.novalid,
      phoneNumber: element.phoneNumber,
      email: element.email,
      birthdate: element.birthdate,
    };
  });
  return familys;
}

export const getPosters = (dispatch) => {
  api("https://mo-strelna.ru/mobile/mobile.php?type=get_all_poster", (res) => {
    let posters = [];
    res?.data?.map((element, index) => {
      posters[index] = setDataPoster(element, index);
    });
    dispatch(setAllPostersAction(posters));
  });
};

export const signIn = (
  login,
  password,
  setError,
  dispatch,
  navigate,
  setLoading
) => {
  api(
    `https://mo-strelna.ru/mobile/mobile.php?type=sign_in&login=${login}&password=${password}`,
    (res) => {
      if (res.data.auth) {
        dispatch(setAuthAction(res.data.auth));
        navigate(ROUTER.PROFILE);
      }
      setLoading(false);
      setError(res.data.error);
    }
  );
};

export const getAuth = (dispatch, navigate = () => {}) => {
  api(`https://mo-strelna.ru/mobile/mobile.php?type=get_auth`, (res) => {
    if (res.data.auth) {
      dispatch(setAuthAction(res.data.auth));
      navigate(ROUTER.PROFILE);
    }
  });
};

export const exitAuth = (dispatch, navigate) => {
  api(`https://mo-strelna.ru/mobile/mobile.php?type=exit_auth`, (res) => {
    if (!res.data.auth) {
      dispatch(setAuthAction(res.data.auth));
      navigate(ROUTER.AUTH);
    }
  });
};

export const getProfile = (dispatch) => {
  api(`https://mo-strelna.ru/mobile/mobile.php?type=profile`, (res) => {
    let posters = [];
    res?.data?.invites &&
      res?.data?.invites?.map((element, index) => {
        posters[index] = setDataPoster(element, index);
      });
    dispatch(
      setAllProfileAction({
        invites: posters,
        familys: setFamilys(res.data.familys),
      })
    );
  });
};

export const cancellation = (id, Alert, navigate) => {
  api(
    `https://mo-strelna.ru/mobile/mobile.php?type=cancellation&schedule=${id}`,
    (res) => {
      Alert.alert("", res.data.message, [
        { text: "Ok", onPress: () => navigate(ROUTER.PROFILE) },
      ]);
    }
  );
};

export const setInvie = (ids, poster, setError, setMembers, setAlter) => {
  api(
    `https://mo-strelna.ru/mobile/mobile.php?type=invite&id=${ids}&event=${poster.id}&stamp=${poster.stamp}`,
    (res) => {
      if (res.data.status) {
        setError(false);
        setAlter(res.data.message);
      } else {
        setAlter(false);
        setError(res.data);
      }

      setMembers({});
    }
  );
};

export const setToken = (token) => {
  api(
    `https://mo-strelna.ru/mobile/mobile.php?type=set_token&token=${token}`,
    (res) => {
      console.log(res.data);
    }
  );
};

export const getPoster = (event, dispatch, navigate, Alert = null) => {
  api(
    `https://mo-strelna.ru/mobile/mobile.php?type=get_poster&event=${event}`,
    (res) => {
      if (res.data.event) {
        dispatch(setPosterAction(setDataPoster(res.data)));
        dispatch(loadingPosterAction(false));
      } else {
        Alert.alert("Ошибка", "Данное мероприятие не найдено!", [
          {
            text: "Закрыть",
            onPress: () => {
              navigate(-1), dispatch(loadingPosterAction(false));
            },
            style: "cancel",
          },
        ]);
      }
    }
  );
};
