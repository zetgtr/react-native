import { useEffect, useState } from "react";
import { Animated, Text, TouchableOpacity, View } from "react-native";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-native";
import { exitAuth, getProfile } from "../../API/api";
import { Famaly } from "../family/family";
import Invitation from "../invitation/invitation";
import style from "./profile.scss";
import { Rules } from "../rules/rules"

import React, { useRef } from "react";

export const ProFile = ({ setBack, setPoster, setTitle,setPosterPage, setLogout,logout,setHistory}) => {
  const dicpatch = useDispatch();
  const navigate = useNavigate();
  const [invitation, setInvitation] = useState(false);
  const [family, setFamily] = useState(false);
  const [rules, setRules] = useState(false);
  const [value1, setValue1] = useState(118);
  const [value2, setValue2] = useState(0);
  const [value3, setValue3] = useState(234);
  const [width, setWidth] = useState(0)
  const [fadeAnim] = useState(useRef(new Animated.Value(0)).current) 
  console.log(fadeAnim);
  const calculateBar = () => {
    setValue1((width * 1) )
    setValue2((width * 0));
    setValue3((width * 2) );
  }  
  const onLayoutMenu = (w) => {
    setWidth(w);
  }

  const onChengeExit = () => {
    exitAuth(dicpatch, navigate);
    
  };

  const onChangeInvitation = () => {
    calculateBar()
    setInvitation(true);
    setFamily(false);
    setRules(false)
    // setTitle('Мои приглашения')
  };

  const onChengeFamily = () => {
    calculateBar()
    setHistory(false)
    setInvitation(false);
    setFamily(true);
    setRules(false)
  };
  const onChengeRules = () => {
    calculateBar()
    setInvitation(false);
    setFamily(false);
    setRules(true)
  };
  
  useEffect(() => {
    setHistory(false)
    setInvitation(true)
    setPosterPage(false)
    setBack(false);
    getProfile(dicpatch);
    setTitle("Профиль");
    
    !logout && setLogout(true)
  },[dicpatch]);
  
  const moveAnimated = () => {
    Animated.timing(fadeAnim, {
      toValue: value1,
      duration: 300,
      useNativeDriver: false
    }).start()
  }
  const backAnimated = () => {
    Animated.timing(fadeAnim, {
      toValue: value2,
      duration: 300,
      useNativeDriver: false
    }).start()
  }
  const endAnimated = () => {
    Animated.timing(fadeAnim, {
      toValue: value3,
      duration: 300,
      useNativeDriver: false
    }).start()
  }
  
  

  return (
    <View disableScrollViewPanResponder={true} style={style.container}>
      <View style={style.header}>
        <TouchableOpacity
          style={style.buttonHeader}
          onPress={() => {
            backAnimated()
            onChangeInvitation()
          }}
        >
          <Text>Приглашения</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[style.buttonHeader]}
          onPress={() => {
            moveAnimated()
            onChengeFamily()
            // moveAnimated()
          }}
        >
          <Text>Члены семьи</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[style.buttonHeader,]}
          onPress={() => {
            // onChengeExit()
            endAnimated()
            onChengeRules()
            // moveAnimated()
          }}
        >
          {/* <Text>Выйти</Text> */}
          <Text>Правила</Text>
        </TouchableOpacity>
      </View>
      <View style={{ marginBottom: 5, overflowX: "hidden", marginHorizontal: 10}} >
        <Animated.View style={[style.bar , {marginLeft: fadeAnim} ]} onLayout = {(e) => onLayoutMenu(e.nativeEvent.layout.width)}>

        </Animated.View>
      </View>
      {invitation && <Invitation setPoster={setPoster} setLogout={setLogout} />}
      {family && <Famaly />}
      {rules && <Rules />}
    </View>
    
  );
};
