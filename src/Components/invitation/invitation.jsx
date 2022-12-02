import {
  faCalendarCheck,
  faCalendarPlus,
  faClock,
  faMapMarkerAlt,
  faTicketAlt,
} from "@fortawesome/fontawesome-free-solid";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
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
import { Link, useNavigate } from "react-router-native";
import { getPoster, getPosters, getProfile } from "../../API/api";
import { ROUTER } from "../../Router/constants";
import { loadingPosterAction } from "../../Store/poster/actions";
import { profileSelector } from "../../Store/profile/selector";
import style from "../poster/poster.scss";
import { imgPoster } from "../utils";

const Invitation = ({ setLogout }) => {
  const { invites } = useSelector(profileSelector);
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
    imgPoster(invites, widthImg, setStyleImg, styleImg, setLoading);
  }, [invites, widthImg]);
  if (loading) return <></>;
  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          onRefresh={() => onChengeRefresh()}
          refreshing={refresh}
        />
      }
    >
      <View style={style.container}>
        {invites.map((poster) => (
          <TouchableOpacity
            key={poster.classImg}
            onPress={() => {
              setLogout(false);
              dispatch(loadingPosterAction(true));
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
                      size={sizeIcon}
                      style={style.icon}
                      icon={faClock}
                    />
                    <Text style={style.infoText}>
                      {poster.timeStartAt} - {poster.timeEndsAt}
                    </Text>
                  </View>
                  <View style={style.info}>
                    <FontAwesomeIcon
                      size={sizeIcon}
                      style={style.icon}
                      icon={faTicketAlt}
                    />
                    <Text style={style.infoText}>
                      Всего билетов: {poster.tickets}
                    </Text>
                  </View>
                  <View style={style.info}>
                    <FontAwesomeIcon
                      size={sizeIcon}
                      style={style.icon}
                      icon={faTicketAlt}
                    />
                    <Text style={style.infoText}>
                      {poster.availableTickets == 0
                        ? "Билетов не осталось"
                        : "Билетов: " + poster.availableTickets}
                    </Text>
                  </View>
                  <View style={style.info}>
                    <FontAwesomeIcon
                      size={sizeIcon}
                      style={style.icon}
                      icon={faCalendarPlus}
                    />
                    <Text style={style.infoText}>
                      Начало регистрации: {"\n"}
                      {poster.regStartsAt}
                    </Text>
                  </View>
                  <View style={style.info}>
                    <FontAwesomeIcon
                      size={sizeIcon}
                      style={style.icon}
                      icon={faCalendarPlus}
                    />
                    <Text style={style.infoText}>
                      Конец регистрации: {"\n"}
                      {poster.regEndsAt}
                    </Text>
                  </View>
                  <View style={style.info}>
                    <FontAwesomeIcon
                      size={sizeIcon}
                      style={style.icon}
                      icon={faMapMarkerAlt}
                    />
                    <Text style={style.infoText}>{poster.place}</Text>
                  </View>
                </View>
                <View
                  onLayout={(e) =>
                    onLayoutImg(e.nativeEvent.layout.width, poster)
                  }
                  style={styleImg[poster.classImg]}
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
        ))}
      </View>
    </ScrollView>
  );
};

export default Invitation;
