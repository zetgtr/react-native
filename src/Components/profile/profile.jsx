import { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getProfile, signInRefresh } from "../../API/api";
import { Famaly } from "../family/family";
import Invitation from "../invitation/invitation";
import style from "./profile.scss";

import React from "react";
import { useNavigate } from "react-router-native";
import { authSelector } from "../../Store/auth/selector";

export const ProFile = ({
  setTitle,
  setPosterPage,
  setLogout,
  logout,
  setHistory,
  setActiveAfish,
  setActiveNotifications,
  setActiveProfile,
}) => {
  const dicpatch = useDispatch();
  const [invitation, setInvitation] = useState(false);
  const [family, setFamily] = useState(false);
  const [rules, setRules] = useState(false);
  const { login, password } = useSelector(authSelector)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onChangeInvitation = () => {
    setInvitation(true);
    setFamily(false);
    setRules(false);
  };

  const onChengeFamily = () => {
    setHistory(false);
    setInvitation(false);
    setFamily(true);
    setRules(false);
  };
  const onChengeRules = () => {
    setInvitation(false);
    setFamily(false);
    setRules(true);
  };

  useEffect(() => {
    setActiveAfish(false);
    setActiveProfile(true);
    setActiveNotifications(false);
    setHistory(false);
    setInvitation(true);
    setPosterPage(false);
    getProfile(dicpatch);
    signInRefresh(login,password,dispatch,navigate)
    setTitle("Профиль");
    !logout && setLogout(true);
  }, [dicpatch]);

  return (
    <View disableScrollViewPanResponder={true} style={style.container}>
      <View style={style.header}>
        <TouchableOpacity
          style={style.buttonHeader}
          onPress={() => {
            onChangeInvitation();
          }}
        >
          <Text>Приглашения</Text>
          <View style={invitation && style.band} />
        </TouchableOpacity>
        <TouchableOpacity
          style={[style.buttonHeader]}
          onPress={() => {
            onChengeRules();
          }}
        >
          <Text>Прошедшие</Text>
          <View style={rules && style.band} />
        </TouchableOpacity>
        <TouchableOpacity
          style={[style.buttonHeader]}
          onPress={() => {
            onChengeFamily();
          }}
        >
          <Text>Члены семьи</Text>
          <View style={family && style.band} />
        </TouchableOpacity>
      </View>
      <View
        style={{ marginBottom: 5, overflowX: "hidden", marginHorizontal: 10 }}
      ></View>
      {invitation && <Invitation setLogout={setLogout} invite={true} />}
      {rules && <Invitation setLogout={setLogout} invite={false} />}
      {family && <Famaly />}
    </View>
  );
};
