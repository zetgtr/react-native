import {
  faCalendarCheck,
  faCalendarPlus,
  faClock,
  faMapMarkerAlt,
  faTicketAlt,
} from "@fortawesome/fontawesome-free-solid";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useEffect, useState } from "react";
import { Image, RefreshControl, ScrollView, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-native";
import { getPosters, getProfile } from "../../API/api";
import { ROUTER } from "../../Router/constants";
import { profileSelector } from "../../Store/profile/selector";
import style from "../poster/poster.scss";
import { imgPoster } from "../utils";

const Invitation = ({ setPoster,setLogout }) => {
  const { invites } = useSelector(profileSelector);
  const [styleImg, setStyleImg] = useState([]);
  const [loading, setLoading] = useState(true);
  const [widthImg, setWidthImg] = useState(160);
  const [sizeIcon] = useState(11);
  const [refresh, setRefresh] = useState(false);
  const dicpatch = useDispatch();

  const onChengeRefresh = () => {
    setRefresh(true);
    getPosters(dicpatch);
    getProfile(dicpatch);
    setTimeout(() => {
      setRefresh(false);
    }, 1000);
  };

  const onLayoutImg = (widthImg) => {
    setWidthImg(widthImg);
  };
  useEffect(() => {
    imgPoster(invites, widthImg, setStyleImg, styleImg, setLoading);
    // setLogout(false);
  }, [invites, widthImg]);
  if (loading) return <></>;
  return (
    <ScrollView refreshControl={
      <RefreshControl
        onRefresh={() => onChengeRefresh()}
        refreshing={refresh}
      />} >
      <View style={style.container}>
        {invites.map((poster) => (
          <Link
            key={poster.classImg}
            onPress={() => {setLogout(false); setPoster(poster)}}
            style={style.posterContainer}
            underlayColor
            to={ROUTER.POSTER}
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
          </Link>
        ))}
      </View>
    </ScrollView>
  );
};

export default Invitation;
