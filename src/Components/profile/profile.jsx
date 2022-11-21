import { useEffect, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-native";
import { exitAuth, getProfile } from "../../API/api";
import Invitation from "../invitation/invitation";
import style from "./profile.scss";

export const ProFile = ({setBack, setTitle}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [invitation, setInvitation] = useState(true)
  const [family, setFamily] = useState(false)
  const onChengeExit = () => {
    exitAuth(dispatch, navigate);
  };
  const onChangeInvitation = () =>{
    setInvitation(true)
    setFamily(false)
  }

  const onChengeFamily = () => {
    setInvitation(false)
    setFamily(true)
  }
  useEffect(()=>{
    setBack(false)
    getProfile(dispatch)
    setTitle("Профиль")
  })
  return (
    <ScrollView style={style.container}>
      <View style={style.header}>
      <TouchableOpacity style={style.buttonHeader} onPress={() => onChangeInvitation()}>
        <Text>Приглашения</Text>
      </TouchableOpacity>
      <TouchableOpacity style={style.buttonHeader} onPress={() => onChengeFamily()}>
        <Text>Члены семьи</Text>
      </TouchableOpacity>
      <TouchableOpacity style={style.buttonHeader} onPress={() => onChengeExit()}>
        <Text>Выйти</Text>
      </TouchableOpacity>
      </View>
      {invitation && <Invitation />}
      {family && <Text>555555</Text>}
    </ScrollView>
  );
};
