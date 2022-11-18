import axios from "axios";
import { setAllPostersAction } from "../Store/poster/actions";
import { date, dateTime } from "./utils";

export const getPosters = (dispatch) => {
  let posters = [];
  axios
    .get("https://mo-strelna.ru/mobile/mobile.php?type=get_all_poster")
    .then((res) => {
      res.data.map((element) => {
        posters = [
          ...posters,
          {
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
          },
        ];
      });
      dispatch(setAllPostersAction(posters));
    })
    .catch((error) => {
      console.log(error);
    });
};
