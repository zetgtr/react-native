import { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useDispatch } from "react-redux";
import {  getProfile } from "../../API/api";
import { Famaly } from "../family/family";
import Invitation from "../invitation/invitation";
import style from "./profile.scss";
import { Rules } from "../rules/rules";

import React from "react";

export const ProFile = ({
  setBack,
  setPoster,
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
    setBack(false);
    getProfile(dicpatch);
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
            onChengeFamily();
          }}
        >
          <Text>Члены семьи</Text>
          <View style={family && style.band} />
        </TouchableOpacity>
        <TouchableOpacity
          style={[style.buttonHeader]}
          onPress={() => {
            onChengeRules();
          }}
        >
          <Text>Правила</Text>
          <View style={rules && style.band} />
        </TouchableOpacity>
      </View>
      <View
        style={{ marginBottom: 5, overflowX: "hidden", marginHorizontal: 10 }}
      >
      </View>
      {invitation && <Invitation setPoster={setPoster} setLogout={setLogout} />}
      {family && <Famaly />}
      {rules && <Rules />}
    </View>
  );
};
