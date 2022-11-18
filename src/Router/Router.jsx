import { StyleSheet, Text, View } from "react-native";
import { NativeRouter, Route, Switch, Routes } from "react-router-native";
import { useDispatch, useSelector } from "react-redux";
import { getPosters } from "../API/api";
import Header from "../Components/header/header";
import Menu from "../Components/menu/menu";
import { posterSelector } from "../Store/poster/selector";
import { ROUTER } from "./constants";
import Poster from "../Components/poster/poster";

const Router = () => (
  <NativeRouter>
    <View style={style.container}>
      <Header />
      <Routes>
        <Route exact path={ROUTER.HOME} element={<Poster />} />
      </Routes>
      <Menu />
    </View>
  </NativeRouter>
);

const style = StyleSheet.create({
  container: {
    flex: 1,
    height: 100,
  },
});

export default Router;
