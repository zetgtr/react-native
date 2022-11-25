import {
  faAt,
  faBirthdayCake,
  faBuilding,
  faExclamation,
  faExclamationTriangle,
  faMobileAlt,
  faCheckCircle,
} from "@fortawesome/fontawesome-free-solid";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { Banner, Button, HStack, Text } from "@react-native-material/core";
import { useState } from "react";
import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import CheckBox from "@react-native-community/checkbox";
import { useDispatch, useSelector } from "react-redux";
import { getPosters, getProfile, setInvie } from "../../API/api";
import { profileSelector } from "../../Store/profile/selector";
import style from "./family.scss";

export const Famaly = ({ invitation, members, setMembers, setIds, ids }) => {
  const { familys } = useSelector(profileSelector);
  const [sizeIcon] = useState(11);
  const [banner, setBanner] = useState(false);
  const [textBanner, setTextBanner] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [render, setRender] = useState(false);

  const dicpatch = useDispatch();

  const onChengeRefresh = () => {
    setRefresh(true);
    getPosters(dicpatch);
    getProfile(dicpatch);
    setTimeout(() => {
      setRefresh(false);
    }, 1000);
  };
  const onChengeFamily = (id) => {
    members[id] = members[id] ? false : true;
    Object.keys(members).map((key) => {
      members[key] &&
        setIds((ids ? ids : "")+ (ids ? ", " + key : "" + key))
    });
    setMembers(members);
    setRender(!render);
  };

  const onChengeBaner = (text) => {
    setBanner(true);
    setTextBanner(text);
  };
  const onChengeBanerExit = () => {
    setBanner(false);
  };
  return (
    <>
      <>
        <ScrollView
          refreshControl={
            !invitation && (
              <RefreshControl
                onRefresh={() => onChengeRefresh()}
                refreshing={refresh}
              />
            )
          }
          style={style.scroll}
        >
          <View style={style.container}>
            {familys.map((family) => (
              <TouchableOpacity
                activeOpacity={1}
                onPress={() => invitation && onChengeFamily(family.id)}
                key={family.id}
                style={style.containerFamily}
              >
                <View style={{ width: "100%" }}>
                  <Text style={style.name}>
                    {family.lastname} {family.firstname} {family.patronymic}
                  </Text>
                  <View style={style.containerIcon}>
                    <FontAwesomeIcon
                      size={sizeIcon}
                      style={style.icon}
                      icon={faBirthdayCake}
                    />
                    <Text style={style.text}>{family.birthdate}</Text>
                  </View>
                  <View style={style.containerIcon}>
                    <FontAwesomeIcon
                      size={sizeIcon}
                      style={style.icon}
                      icon={faMobileAlt}
                    />
                    <Text style={style.text}>
                      {family.phoneNumber ? family.phoneNumber : "Не указан"}
                    </Text>
                  </View>
                  <View style={style.containerIcon}>
                    <FontAwesomeIcon
                      size={sizeIcon}
                      style={style.icon}
                      icon={faAt}
                    />
                    <Text style={style.text}>
                      {family.email ? family.email : "Не указана"}
                    </Text>
                  </View>
                  <View style={style.buttonContainer}>
                    {!family.citizen && (
                      <TouchableOpacity
                        onPress={() =>
                          onChengeBaner(
                            "Вы можете оформлять приглашения с пометкой «Только для жителей пос. Стрельна» для этого члена семьи."
                          )
                        }
                        style={stayles.button}
                      >
                        <FontAwesomeIcon
                          size={sizeIcon}
                          style={style.icon}
                          icon={faBuilding}
                        />
                        <Text style={style.textButton}>
                          Житель пос. Стрельна
                        </Text>
                      </TouchableOpacity>
                    )}
                    {family.novalid ? (
                      <TouchableOpacity
                        onPress={() =>
                          onChengeBaner(
                            "К сожалению, Ваш аккаунт был отклонен. Проверьте введённую Вами информацию в личном кабинете."
                          )
                        }
                        style={stayles.button}
                      >
                        <FontAwesomeIcon
                          size={sizeIcon}
                          style={style.iconTriangle}
                          icon={faExclamationTriangle}
                        />
                        <Text style={style.textButtonTriangle}>Отклонен</Text>
                      </TouchableOpacity>
                    ) : family.valid ? (
                      <TouchableOpacity
                        onPress={() =>
                          onChengeBaner(
                            "Вы можете оформлять приглашения на мероприятия для этого члена семьи."
                          )
                        }
                        style={stayles.button}
                      >
                        <FontAwesomeIcon
                          size={sizeIcon}
                          style={style.iconCircle}
                          icon={faCheckCircle}
                        />
                        <Text style={style.textButtonCircle}>Подтверждён</Text>
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity
                        onPress={() =>
                          onChengeBaner(
                            "Пожалуйста, подождите, пока администратор проверит введённую Вами информацию, после чего вы сможете оформлять приглашения для этого члена семьи."
                          )
                        }
                        style={stayles.button}
                      >
                        <FontAwesomeIcon
                          size={sizeIcon}
                          style={style.iconTriangle}
                          icon={faExclamationTriangle}
                        />
                        <Text style={style.textButtonTriangle}>
                          На модерации
                        </Text>
                      </TouchableOpacity>
                    )}
                  </View>
                </View>
                {invitation && (
                  <View
                    style={[
                      style.check,
                      { borderRadius: 10 },
                      members[family.id]
                        ? {
                            backgroundColor: "#186f40",
                            borderColor: "#186f40",
                            padding: 12,
                          }
                        : {
                            borderColor: "#e5e5e5",
                            borderStyle: "dotted",
                            borderWidth: 2,
                            padding: 10,
                          },
                    ]}
                  >
                    <FontAwesomeIcon
                      size={20}
                      style={
                        members[family.id]
                          ? { color: "#FFF" }
                          : { color: "#e5e5e5" }
                      }
                      icon={faCheckCircle}
                    />
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
        {banner && (
          <TouchableOpacity
            onPress={() => onChengeBanerExit()}
            activeOpacity={1}
            style={style.bannerFon}
          ></TouchableOpacity>
        )}
      </>
      {banner && (
        <>
          <Banner
            style={style.banner}
            text={textBanner}
            buttons={
              <HStack spacing={2}>
                <Button
                  key="learn-more"
                  color="#3c52a6"
                  onPress={() => onChengeBanerExit()}
                  variant="text"
                  title="Закрыть"
                  compact
                  style = {{size: 5}}
                />
              </HStack>
            }
          />
        </>
      )}
    </>
  );
};

const stayles = StyleSheet.create({
  button: {
    borderStyle: "dotted",
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    padding: 5,
    borderWidth: 2,
    borderColor: "#e5e5e5",
    marginTop: 10,
  },
});
