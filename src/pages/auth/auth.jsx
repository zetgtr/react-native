import { faSignInAlt } from "@fortawesome/fontawesome-free-solid";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getAuth, signIn } from "../../API/api";
import { ProFile } from "../../Components/profile/profile";
import { getAuthAction } from "../../Store/auth/actions";
import { authSelector } from "../../Store/auth/selector";
import style from "./auth.scss";

export const Auth = ({ setBack }) => {
  const [login, onChangeLogin] = useState(null);
  const [password, onChangePassword] = useState(null);
  const [render, setRender] = useState(false);
  const [error, setError] = useState(false);
  const dispatch = useDispatch();
  const auth = useSelector(authSelector);
  const onPressAuth = () => {
    signIn(login, password, setError, dispatch, setRender, render);
  };
  const onLayoutGetHigth = (height) => {
    style.container = {
      ...style.container,
      height,
    };
    setRender(!render);
  };
  console.log(error);
  useEffect(() => {
    setBack(true);
    getAuth(dispatch, setRender, render);
    setRender(!render);
  }, []);
  return (
    <>
      {auth.auth ? (
        <ProFile />
      ) : (
        <ScrollView
          onLayout={(e) => onLayoutGetHigth(e.nativeEvent.layout.height)}
          style={style.containerScroll}
        >
          <View style={style.container}>
            <View style={style.box}>
              <TextInput
                style={styles.input}
                onChangeText={onChangeLogin}
                value={login}
                placeholder="Логин или Email"
              />
              <TextInput
                style={styles.input}
                onChangeText={onChangePassword}
                value={password}
                placeholder="Пароль"
                secureTextEntry={true}
              />
              <Text>{error}</Text>
              <TouchableOpacity
                onPress={() => onPressAuth()}
                style={style.button}
              >
                <FontAwesomeIcon icon={faSignInAlt} />
                <Text>Войти</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    width: "100%",
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
