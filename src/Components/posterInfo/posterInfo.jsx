import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  Image,
  ScrollView,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from "react-native";
import style from "./posterInfo.scss";

import {
  faBuilding,
  faCalendarCheck,
  faCalendarPlus,
  faClock,
  faMapMarkerAlt,
  faTicketAlt,
} from "@fortawesome/fontawesome-free-solid";
import { useEffect, useState } from "react";
import { authSelector } from "../../Store/auth/selector";
import { useSelector } from "react-redux";
import { userValidation } from "../utils";
import { profileSelector } from "../../Store/profile/selector";
import { ROUTER } from "../../Router/constants";
import { useNavigate } from "react-router-native";

const PosterInfo = ({ setTitle, setBack, poster, posterPage }) => {
  const [render, setRender] = useState(false);
  const [invitationButton, setInvitationButton] = useState(false);
  const [sizeIcon] = useState(11);
  const { auth } = useSelector(authSelector);
  const { familys } = useSelector(profileSelector);
  const navigate = useNavigate();
  const [buttonColor, setButtonColor] = useState("#f7ca27")

  console.log(familys);

  const onLayoutImg = (widthImg) => {
    Image.getSize(poster.photo, (width, height) => {
      style.img = {
        width: widthImg - 30,
        height: (widthImg - 30) + (widthImg - 30) * ((height - width) / width),
      };
      setRender(!render);
    });
  };

  const onChengeInvitation = () => {
    invitationButton ? navigate(ROUTER.INVITATION) : navigate(ROUTER.AUTH);
  };
  const onChangeButtonColor = () => {
    console.log(123);
    setButtonColor('#505050')
  }

  useEffect(() => {
    setInvitationButton(userValidation(familys[0], auth, poster));
    setTitle("назад");
    setBack(true);
  }, []);

  return (
    <>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        style={style.scrollContainer}
      >
        <View style={style.container}>
          <View
            onLayout={(e) => onLayoutImg(e.nativeEvent.layout.width)}
            style={style.boxPoster}
          >
            <View style={style.imgContainer}>
              <Image
                source={{
                  uri: poster.photo,
                }}
                style={[style.img , {borderRadius: "5"}]}
              />
            </View>
            <Text style={style.textInfoHeader}>Информация</Text>
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
                  size={sizeIcon}
                  style={style.icon}
                  icon={faCalendarPlus}
                />
                <Text style={style.infoText}>
                  Начало регистрации: {poster.regStartsAt}
                </Text>
              </View>
              <View style={style.info}>
                <FontAwesomeIcon
                  size={sizeIcon}
                  style={style.icon}
                  icon={faCalendarPlus}
                />
                <Text style={style.infoText}>
                  Конец регистрации: {poster.regEndsAt}
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
              {poster.description && <Text style={style.textInfoDescription}>Описание</Text>}
              <Text style={style.textDescription}>{poster.description}</Text>
            </View>
          </View>
        </View>
      </ScrollView>
      {posterPage && (
        <TouchableHighlight
          onPress={() => { 
            poster.availableTickets > 0 &&
            onChengeInvitation()
            onChangeButtonColor()
          }}
          // backgroundColor = {buttonColor}
          style={[
            poster.availableTickets > 0
              ? style.invitationButton
              : style.invitationButtonNone
          , {backgroundColor: buttonColor}]}
        >
          <Text style={style.textInvitation}>
            {poster.availableTickets > 0 ? (
              <>
                <FontAwesomeIcon
                  size={15}
                  style={[style.fontAwesomeIcon, {
                  }]}
                  icon={faTicketAlt}
                />{" "}
                <Text style={style.textInvitationText}> ПОЛУЧИТЬ ПРИГЛАШЕНИЕ </Text>{" "}
              </>
            ) : (
              "РЕГИСТРАЦИЯ ЗАКРЫТА"
            )}
          </Text>
        </TouchableHighlight>
      )}
      {/* <Button
      // color="#f7ca27"
      // style={{ height: 50, justifyContent: "center" }}
      // title={<Text style={style.textInvitation}>Получить приглашение!</Text>}
      /> */}
    </>
  );
};

export default PosterInfo;
