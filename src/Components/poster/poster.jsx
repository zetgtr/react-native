import { useEffect, useState } from "react";
import {
  Image,
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faBuilding,
  faCalendarCheck,
  faCalendarPlus,
  faClock,
  faMapMarkerAlt,
  faTicketAlt,
} from "@fortawesome/fontawesome-free-solid";

import { posterSelector } from "../../Store/poster/selector";
import style from "./poster.scss";
import { useNavigate } from "react-router-native";
import { imgPoster } from "../utils";
import { getPoster, getPosters, getProfile } from "../../API/api";
import { ActivityIndicator } from "@react-native-material/core";
import { loadingPosterAction } from "../../Store/poster/actions";
import { ROUTER } from "../../Router/constants";

const Poster = () => {
  const posters = useSelector(posterSelector);
  const [styleImg, setStyleImg] = useState([]);
  const [loading, setLoading] = useState(true);
  const [widthImg, setWidthImg] = useState(160);
  const [sizeIcon] = useState(11);
  const [refresh, setRefresh] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onChengeRefresh = () => {
    setRefresh(true);
    getPosters(dispatch);
    getProfile(dispatch);
    setTimeout(() => {
      setRefresh(false);
    }, 1000);
  };

  const onLayoutImg = (widthImg) => {
    setWidthImg(widthImg);
  };

  useEffect(() => {
    imgPoster(posters?.posters, widthImg, setStyleImg, styleImg, setLoading);
  }, [posters, widthImg]);
  if (posters.loading || loading)
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator size="large" color="#4f68c8" />
      </View>
    );
  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          onRefresh={() => onChengeRefresh()}
          refreshing={refresh}
        />
      }
      style={style.scrollContainer}
    >
      <View style={style.container}>
        {posters.posters.map((poster) => {
          return (
            <TouchableOpacity
              key={poster.classImg}
              onPress={() => {
                dispatch(loadingPosterAction(true))
                navigate(ROUTER.POSTER);
                getPoster(poster.event, dispatch, navigate);
              }}
              style={style.posterContainer}
            >
              <View style={style.posterContainer}>
                <Text style={style.title}>{poster.title}</Text>
                <View style={style.posterBox}>
                  <View style={style.infoBox}>
                    <View style={style.info}>
                      <FontAwesomeIcon
                        size={sizeIcon}
                        style={style.icon}
                        icon={faCalendarCheck}
                      />
                      <Text style={style.infoText}>{poster.startsAt}</Text>
                    </View>
                    <View style={style.info}>
                      <FontAwesomeIcon
                        style={style.icon}
                        icon={faClock}
                        size={sizeIcon}
                      />
                      <Text style={style.infoText}>
                        {poster.timeStartAt} - {poster.timeEndsAt}
                      </Text>
                    </View>
                    <View style={style.info}>
                      <FontAwesomeIcon
                        style={style.icon}
                        icon={faTicketAlt}
                        size={sizeIcon}
                      />
                      <Text style={style.infoText}>
                        Всего билетов: {poster.tickets}
                      </Text>
                    </View>
                    <View style={style.info}>
                      <FontAwesomeIcon
                        style={style.icon}
                        icon={faTicketAlt}
                        size={sizeIcon}
                      />
                      <Text style={style.infoText}>
                        {poster.availableTickets == 0
                          ? "Билетов не осталось"
                          : "Билетов: " + poster.availableTickets}
                      </Text>
                    </View>
                    {poster.forCitizens != 0 && (
                      <View style={style.info}>
                        <FontAwesomeIcon
                          style={style.icon}
                          icon={faBuilding}
                          size={sizeIcon}
                        />
                        <Text style={style.infoText}>
                          Только для жителей Стрельны
                        </Text>
                      </View>
                    )}
                    <View style={style.info}>
                      <FontAwesomeIcon
                        style={style.icon}
                        icon={faCalendarPlus}
                        size={sizeIcon}
                      />
                      <Text style={style.infoText}>
                        Начало регистрации: {"\n"}
                        {poster.regStartsAt}
                      </Text>
                    </View>
                    <View style={style.info}>
                      <FontAwesomeIcon
                        style={style.icon}
                        icon={faCalendarPlus}
                        size={sizeIcon}
                      />
                      <Text style={style.infoText}>
                        Конец регистрации: {"\n"}
                        {poster.regEndsAt}
                      </Text>
                    </View>
                    <View style={style.info}>
                      <FontAwesomeIcon
                        style={style.icon}
                        icon={faMapMarkerAlt}
                        size={sizeIcon}
                      />
                      <Text style={style.infoText}>{poster.place}</Text>
                    </View>
                  </View>
                  <View
                    onLayout={(e) => onLayoutImg(e.nativeEvent.layout.width)}
                    style={styleImg[poster.classImg]}
                    // style={style.containerImg}
                  >
                    <Image
                      style={style.img}
                      source={{
                        uri: poster.photo,
                      }}
                    />
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </ScrollView>
  );
};

export default Poster;
