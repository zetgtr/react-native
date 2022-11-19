import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import { posterSelector } from "../Store/poster/selector";
import style from "./posterInfo.scss";

import {
  faCalendarCheck,
  faCalendarPlus,
  faClock,
  faMapMarkerAlt,
  faTicketAlt,
} from "@fortawesome/fontawesome-free-solid";
import { createRef, useEffect, useState } from "react";

const PosterInfo = ({ setTitle, setBack, poster }) => {
  const posters = useSelector(posterSelector);
  const ref = createRef();

  setTitle("назад");
  setBack(true);

  const [render, setRender] = useState(false);

  const onLayoutImg = (widthImg) => {
    Image.getSize(poster.photo, (width, height) => {
      console.log(widthImg + widthImg * ((height - width) / width));
      style.img = {
        width: widthImg,
        height: widthImg + widthImg * ((height - width) / width),
      };
      setRender(!render);
    });
  };

  return (
    <>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        style={style.container}
      >
        <View
          onLayout={(e) => onLayoutImg(e.nativeEvent.layout.width)}
          style={style.boxPoster}
        >
          <Image
            source={{
              uri: poster.photo,
            }}
            style={style.img}
          />
          <Text style={style.textInfoHeader}>Информация</Text>
          <View style={style.infoBox}>
            <View style={style.info}>
              <FontAwesomeIcon style={style.icon} icon={faCalendarCheck} />
              <Text style={style.infoText}>{poster.startsAt}</Text>
            </View>
            <View style={style.info}>
              <FontAwesomeIcon style={style.icon} icon={faClock} />
              <Text style={style.infoText}>
                {poster.timeStartAt} - {poster.timeEndsAt}
              </Text>
            </View>
            <View style={style.info}>
              <FontAwesomeIcon style={style.icon} icon={faTicketAlt} />
              <Text style={style.infoText}>
                Всего билетов: {poster.tickets}
              </Text>
            </View>
            <View style={style.info}>
              <FontAwesomeIcon style={style.icon} icon={faTicketAlt} />
              <Text style={style.infoText}>
                {poster.availableTickets == 0
                  ? "Билетов не осталось"
                  : "Билетов: " + poster.availableTickets}
              </Text>
            </View>
            <View style={style.info}>
              <FontAwesomeIcon style={style.icon} icon={faCalendarPlus} />
              <Text style={style.infoText}>
                Начало регистрации:
                {poster.regStartsAt}
              </Text>
            </View>
            <View style={style.info}>
              <FontAwesomeIcon style={style.icon} icon={faCalendarPlus} />
              <Text style={style.infoText}>
                Конец регистрации:
                {poster.regEndsAt}
              </Text>
            </View>
            <View style={style.info}>
              <FontAwesomeIcon style={style.icon} icon={faMapMarkerAlt} />
              <Text style={style.infoText}>{poster.place}</Text>
            </View>
            <Text style={style.textDescription}>{poster.description}</Text>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default PosterInfo;
