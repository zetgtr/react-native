import { useEffect, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-native";
import { exitAuth, getProfile } from "../../API/api";
import { profileSelector } from "../../Store/profile/selector";
import Invitation from "../invitation/invitation";
import style from "./profile.scss";

export const ProFile = ({setBack, setPoster, setTitle}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [invitation, setInvitation] = useState(true)
  const [family, setFamily] = useState(false)
  const onChengeExit = () => {
    exitAuth(dispatch, navigate);
  };
  // console.log(invites)
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
    <View disableScrollViewPanResponder={true} style={style.container}>
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
      {invitation && <Invitation setPoster={setPoster}/>}
      {family && <Text>555555</Text>}
    </View>
  );
};
