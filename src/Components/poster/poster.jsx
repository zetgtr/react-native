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

const Poster = ({ setTitle, setPoster, back }) => {
  //  return false;
  const posters = useSelector(posterSelector);
  const [render, setRender] = useState(false);
  // if (!back) {
  //   style.container = {
  //     ...style.container,
  //     opacity: 1,
  //   };
  // } else {
  //   style.container = {
  //     ...style.container,
  //     opacity: 0,
  //   };
  // }

  const onLayoutImg = (widthImg, poster) => {
    Image.getSize(poster.photo, (width, height) => {
      const tmp = widthImg - 10;
      style[poster.classImg] = {
        width: tmp ,
        height: tmp + tmp * ((height - width) / width),
        borderRadius: 5,
        objectFit: 'scale-down',
        // borderWidth: 5,
        // borderColor: '#fff',
        

      };
    });
  };

  useEffect(() => {
    setTimeout(() => {
      setRender(true);
    }, 2000);
  }, [style]);
  if (posters.loading) return <></>;
  return (
    <ScrollView style={style.scrollContainer}>
      <View style={style.container}>
        {posters.posters.map((poster) => (
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
                      size={11}
                      style={style.icon}
                      icon={faCalendarCheck}
                    />
                    <Text style={style.infoText}>{poster.startsAt}</Text>
                  </View>
                  <View style={style.info}>
                    <FontAwesomeIcon style={style.icon} icon={faClock}  size={11} />
                    <Text style={style.infoText}>
                      {poster.timeStartAt} - {poster.timeEndsAt}
                    </Text>
                  </View>
                  <View style={style.info}>
                    <FontAwesomeIcon style={style.icon} icon={faTicketAlt}  size={11} />
                    <Text style={style.infoText}>
                      Всего билетов: {poster.tickets}
                    </Text>
                  </View>
                  <View style={style.info}>
                    <FontAwesomeIcon style={style.icon} icon={faTicketAlt}  size={11} />
                    <Text style={style.infoText}>
                      {poster.availableTickets == 0
                        ? "Билетов не осталось"
                        : "Билетов: " + poster.availableTickets}
                    </Text>
                  </View>
                  <View style={style.info}>
                    <FontAwesomeIcon style={style.icon} icon={faCalendarPlus}  size={11} />
                    <Text style={style.infoText}>
                      Начало регистрации: {"\n"}
                      {poster.regStartsAt}
                    </Text>
                  </View>
                  <View style={style.info}>
                    <FontAwesomeIcon style={style.icon} icon={faCalendarPlus}  size={11} />
                    <Text style={style.infoText}>
                      Конец регистрации: {"\n"}
                      {poster.regEndsAt}
                    </Text>
                  </View>
                  <View style={style.info}>
                    <FontAwesomeIcon style={style.icon} icon={faMapMarkerAlt}  size={11} />
                    <Text style={style.infoText}>{poster.place}</Text>
                  </View>
                </View>
                <View
                  onLayout={(e) =>
                    onLayoutImg(e.nativeEvent.layout.width, poster)
                  }
                  
                  style={style.containerImg}
                  >
                  <Image
                    style={style[poster.classImg]}
                    // style = {style.img}
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

export default Poster;
