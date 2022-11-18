import { useEffect } from "react";
import { Image, ScrollView, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import FontAwesome, {
  SolidIcons,
  RegularIcons,
  parseIconName,
  parseIconFromClassName,
} from "react-native-fontawesome";

import { getPosters } from "../../API/api";
import { posterSelector } from "../../Store/poster/selector";
import style from "./poster.scss";

const Poster = () => {
  const dicpatch = useDispatch();
  const posters = useSelector(posterSelector);

  const validIcon = parseIconFromClassName(" fas fa-calendar-check ");

  useEffect(() => {
    getPosters(dicpatch);
  }, [dicpatch]);
  return (
    <ScrollView style={style.scrollContainer}>
      <View style={style.container}>
        {posters.posters.map((poster) => (
          <View style={style.posterBox}>
            <View style={style.infoBox}>
              <FontAwesome style={{ fontSize: 32 }} icon={validIcon} />
              <Text>{poster.title}</Text>
              <Text>{poster.startsAt}</Text>
              <Text>
                {poster.timeStartAt} - {poster.timeEndsAt}
              </Text>
              <Text>Всего билетов: {poster.tickets}</Text>
              <Text>
                {poster.availableTickets == 0
                  ? "Билетов не осталось"
                  : "Билетов: " + poster.availableTickets}
              </Text>
              <Text>Начало регестрации: {poster.regStartsAt}</Text>
              <Text>Конец регистрации: {poster.regEndsAt}</Text>
              <Text>{poster.place}</Text>
            </View>
            <Image
              style={style.img}
              source={{
                uri: poster.photo,
              }}
            />
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default Poster;
