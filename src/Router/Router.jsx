import { StyleSheet, View } from "react-native";
import { NativeRouter, Route, Routes } from "react-router-native";
import Header from "../Components/header/header";
import MenuApp from "../Components/menu/menu";
import { ROUTER } from "./constants";
import Poster from "../Components/poster/poster";
import { useEffect, useState } from "react";
import PosterInfo from "../Components/posterInfo/posterInfo";
import { useDispatch } from "react-redux";
import { getPosters, getProfile } from "../API/api";
import Home from "../Components/home/home";
import { Auth } from "../Components/auth/auth";
import { ProFile } from "../Components/profile/profile";

const Router = () => {
  const [title, setTitle] = useState("Афиша мероприятий");
  const [poster, setPoster] = useState();
  const [back, setBack] = useState(false);
  const [pagePoster, setPagePoster] = useState(false);
  const dicpatch = useDispatch();

  useEffect(() => {
    getPosters(dicpatch);
    getProfile(dicpatch);
  }, [dicpatch]);
  return (
    <NativeRouter>
      <View style={style.container}>
        <Header back={back} title={title} />
        <Poster
          setTitle={setTitle}
          setBack={setBack}
          back={back}
          pagePoster={pagePoster}
          setPoster={setPoster}
        />
        <Routes>
          <Route
            exact
            path={ROUTER.HOME}
            element={
              <Home
                setBack={setBack}
                setTitle={setTitle}
                setPagePoster={setPagePoster}
              ></Home>
            }
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
            path={ROUTER.PROFILE}
            element={
              <ProFile
                setBack={setBack}
                setPoster={setPoster}
                setTitle={setTitle}
              />
            }
          />
          <Route
            exact
            path={ROUTER.AUTH}
            element={<Auth setTitle={setTitle} setBack={setBack} />}
          />
        </Routes>
        <MenuApp />
      </View>
    </NativeRouter>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Router;
