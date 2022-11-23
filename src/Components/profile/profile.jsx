import { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-native";
import { exitAuth, getProfile } from "../../API/api";
import { Famaly } from "../family/family";
import Invitation from "../invitation/invitation";
import style from "./profile.scss";

export const ProFile = ({ setBack, setPoster, setTitle,setPosterPage }) => {
  const dicpatch = useDispatch();
  const navigate = useNavigate();
  const [invitation, setInvitation] = useState(true);
  const [family, setFamily] = useState(false);
  const onChengeExit = () => {
    exitAuth(dicpatch, navigate);
  };

  const onChangeInvitation = () => {
    setInvitation(true);
    setFamily(false);
  };

  const onChengeFamily = () => {
    setInvitation(false);
    setFamily(true);
  };
  useEffect(() => {
    setPosterPage(false)
    setBack(false);
    getProfile(dicpatch);
    setTitle("Профиль");
  });
  return (
    <View disableScrollViewPanResponder={true} style={style.container}>
      <View style={style.header}>
        <TouchableOpacity
          style={style.buttonHeader}
          onPress={() => onChangeInvitation()}
        >
          <Text>Приглашения</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={style.buttonHeader}
          onPress={() => onChengeFamily()}
        >
          <Text>Члены семьи</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={style.buttonHeader}
          onPress={() => onChengeExit()}
        >
          <Text>Выйти</Text>
        </TouchableOpacity>
      </View>
      {invitation && <Invitation setPoster={setPoster} />}
      {family && <Famaly />}
    </View>
  );
};
