import { useEffect, useState } from "react";
import { Image, ScrollView, Text, View } from "react-native";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faCalendarCheck,
  faCalendarPlus,
  faClock,
  faMapMarkerAlt,
  faTicketAlt,
} from "@fortawesome/fontawesome-free-solid";

import { posterSelector } from "../../Store/poster/selector";
import style from "./poster.scss";
import { Link } from "react-router-native";
import { ROUTER } from "../../Router/constants";
import { imgPoster } from "../utils";

const Poster = ({ setPoster }) => {
  const posters = useSelector(posterSelector);
  const [styleImg, setStyleImg] = useState([]);
  const [loading, setLoading] = useState(true);
  const [widthImg, setWidthImg] = useState(160);
  const [sizeIcon] = useState(11);

  const onLayoutImg = (widthImg) => {
    setWidthImg(widthImg);
  };

  useEffect(() => {
    imgPoster(posters?.posters, widthImg, setStyleImg, styleImg, setLoading);
  }, [posters, widthImg]);
  if (posters.loading || loading) return <></>;
  return (
    <ScrollView style={style.scrollContainer}>
      <View style={style.container}>
        {posters.posters.map((poster) => {
          return (
            <Link
              key={poster.classImg}
              onPress={() => setPoster(poster)}
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
            </Link>
          );
        })}
      </View>
    </ScrollView>
  );
};

export default Poster;
