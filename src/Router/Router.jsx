import { StyleSheet, View } from "react-native";
import { NativeRouter, Route, Routes } from "react-router-native";
import Header from "../Components/header/header";
import Menu from "../Components/menu/menu";
import { ROUTER } from "./constants";
import Poster from "../Components/poster/poster";
import { useEffect, useState } from "react";
import PosterInfo from "../pages/posterInfo";
import { useDispatch } from "react-redux";
import { getPosters } from "../API/api";

const Router = () => {
  const [title, setTitle] = useState("Афиша мероприятий");
  const [poster, setPoster] = useState();
  const [back, setBack] = useState(false);
  const dicpatch = useDispatch();

  useEffect(() => {
    setBack(false);
  }, [title]);
  useEffect(() => {
    getPosters(dicpatch);
  }, [dicpatch]);
  return (
    <NativeRouter>
      <View style={style.container}>
        <Header back={back} title={title} />
        <Routes>
          <Route
            exact
            path={ROUTER.HOME}
            element={<Poster setTitle={setTitle} setPoster={setPoster} />}
          />
          <Route
            exact
            path={ROUTER.POSTER}
            element={
              <PosterInfo
                setTitle={setTitle}
                setBack={setBack}
                poster={poster}
              />
            }
          />
        </Routes>
        <Menu />
      </View>
    </NativeRouter>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    height: 100,
    alignItems: "center",
  },
});

export default Router;
