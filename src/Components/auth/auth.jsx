import { faSignInAlt } from "@fortawesome/fontawesome-free-solid";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useNavigate } from "react-router-native";
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
import { authSelector } from "../../Store/auth/selector";
import style from "./auth.scss";
import { ActivityIndicator } from "@react-native-material/core";

export const Auth = ({ setBack, setTitle }) => {
  const [login, onChangeLogin] = useState(null);
  const [password, onChangePassword] = useState(null);
  const [render, setRender] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { auth } = useSelector(authSelector);
  const onPressAuth = () => {
    setLoading(true);
    signIn(login, password, setError, dispatch, navigate, setLoading);
  };
  const onLayoutGetHigth = (height) => {
    style.container = {
      ...style.container,
      height,
    };
    setRender(!render);
  };
  useEffect(() => {
    setTitle("Авторизация");
    setBack(false);
    getAuth(dispatch, navigate);
    setRender(!render);
  }, []);
  return (
    <>
      {auth.auth ? (
        <></>
      ) : (
        <ScrollView
          onLayout={(e) => onLayoutGetHigth(e.nativeEvent.layout.height)}
          style={style.containerScroll}
        >
          <View style={style.container}>
            <View style={style.box}>
              {loading ? (
                <ActivityIndicator size="large" color="#4f68c8" />
              ) : (
                <>
                  <TextInput
                    autoComplete={"name"}
                    style={styles.input}
                    onChangeText={onChangeLogin}
                    value={login}
                    placeholder="Логин или Email"
                  />
                  <TextInput
                    autoComplete={"password"}
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
                </>
              )}
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
