import {
  faCalendarCheck,
  faCalendarPlus,
  faClock,
  faMapMarkerAlt,
  faTicketAlt,
} from "@fortawesome/fontawesome-free-solid";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { Image, ScrollView, Text, View } from "react-native";
import { useSelector } from "react-redux";
import { Link } from "react-router-native";
import { ROUTER } from "../../Router/constants";
import { profileSelector } from "../../Store/profile/selector";
import style from "../poster/poster.scss"
import styleInvitation from "./style.scss"

const Invitation = ({setPoster}) => {
  const {invites} = useSelector(profileSelector)
  return (<ScrollView style={styleInvitation.scrollContainer}>
    <View style={style.container}>
      {invites.map((poster) => (
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
                    style={style.icon}
                    icon={faCalendarCheck}
                  />
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
                    Начало регистрации: {"\n"}
                    {poster.regStartsAt}
                  </Text>
                </View>
                <View style={style.info}>
                  <FontAwesomeIcon style={style.icon} icon={faCalendarPlus} />
                  <Text style={style.infoText}>
                    Конец регистрации: {"\n"}
                    {poster.regEndsAt}
                  </Text>
                </View>
                <View style={style.info}>
                  <FontAwesomeIcon style={style.icon} icon={faMapMarkerAlt} />
                  <Text style={style.infoText}>{poster.place}</Text>
                </View>
              </View>
              <View
                // onLayout={(e) =>
                //   onLayoutImg(e.nativeEvent.layout.width, poster)
                // }
                style={style.containerImg}
              >
                <Image
                  style={style[poster.classImg]}
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
  </ScrollView>)
}

export default Invitation;