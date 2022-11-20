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
import Home from "../pages/home";
import { Auth } from "../pages/auth/auth";

const Router = () => {
  const [title, setTitle] = useState("Афиша мероприятий");
  const [poster, setPoster] = useState();
  const [back, setBack] = useState(false);
  const [pagePoster, setPagePoster] = useState();
  const dicpatch = useDispatch();

  useEffect(() => {
    getPosters(dicpatch);
  }, [dicpatch]);
  return (
    <NativeRouter>
      <View style={style.container}>
        <Header back={back} title={title} />
        <Poster
          setTitle={setTitle}
          setBack={setBack}
          setPagePoster={setPagePoster}
          back={back}
          pagePoster={pagePoster}
          setPoster={setPoster}
        />
        <Routes>
          <Route
            exact
            path={ROUTER.HOME}
            element={<Home setBack={setBack}></Home>}
          />
          <Route
            exact
            path={ROUTER.POSTER}
            element={
              <PosterInfo
                setTitle={setTitle}
                setBack={setBack}
                setPagePoster={setPagePoster}
                back={back}
                poster={poster}
              />
            }
          />
          <Route
            exact
            path={ROUTER.AUTH}
            element={<Auth setBack={setBack} />}
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
