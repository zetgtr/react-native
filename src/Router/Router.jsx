import { StyleSheet, View } from "react-native";
import { NativeRouter, Route, Routes } from "react-router-native";
import Header from "../Components/header/header";
import MenuApp from "../Components/menu/menu";
import { ROUTER } from "./constants";
import Poster from "../Components/poster/poster";
import Push from "../Components/push/push";
import { useEffect, useState } from "react";
import PosterInfo from "../Components/posterInfo/posterInfo";
import { useDispatch } from "react-redux";
import { getAuth, getPosters, getProfile } from "../API/api";
import Home from "../Components/home/home";
import { Auth } from "../Components/auth/auth";
import { ProFile } from "../Components/profile/profile";
import { InvitationPage } from "../Components/invitationPage/invitationPage";
import { getPushFirebase } from "../Components/utils";
import { Rules } from "../Components/rules/rules";

const Router = () => {
  const [title, setTitle] = useState("Афиша мероприятий");
  const [poster, setPoster] = useState();
  const [history, setHistory] = useState(false);
  const [pagePoster, setPagePoster] = useState(false);
  // const [posterPage, setPosterPage] = useState(false);
  const [logout, setLogout] = useState(false);
  const [count, setCount] = useState(0);
  const [activeAfish, setActiveAfish] = useState(false);
  const [activeNotifications, setActiveNotifications] = useState(false);
  const [activeProfile, setActiveProfile] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    getPushFirebase(dispatch);
    getPosters(dispatch);
    getProfile(dispatch);
    getAuth(dispatch);
    setCount(11);
  }, [dispatch]);
  return (
    <NativeRouter>
      <View style={style.container}>
        <Header
          setActiveAfish={setActiveAfish}
          setActiveNotifications={setActiveNotifications}
          setActiveProfile={setActiveProfile}
          title={title}
          setTitle={setTitle}
          logout={logout}
        />
        <Poster
        // setPosterPage={setPosterPage}
        // setTitle={setTitle}
        // setBack={setBack}
        // back={back}
        // pagePoster={pagePoster}
        // setPoster={setPoster}
        />
        <Routes>
          <Route
            exact
            path={ROUTER.HOME}
            element={
              <Home
                setActiveAfish={setActiveAfish}
                setActiveNotifications={setActiveNotifications}
                setActiveProfile={setActiveProfile}
                setLogout={setLogout}
                setTitle={setTitle}
                setPagePoster={setPagePoster}
                setHistory={setHistory}
              ></Home>
            }
          />
          <Route path={ROUTER.RULES} element={<Rules />} />
          <Route
            exact
            path={ROUTER.POSTER}
            element={
              <PosterInfo
                posterPage={pagePoster}
                setTitle={setTitle}
                history={history}
              />
            }
          />
          <Route
            path={ROUTER.PROFILE}
            element={
              <ProFile
                setActiveAfish={setActiveAfish}
                setActiveNotifications={setActiveNotifications}
                setActiveProfile={setActiveProfile}
                setPosterPage={setPagePoster}
                setPoster={setPoster}
                setTitle={setTitle}
                setLogout={setLogout}
                setHistory={setHistory}
              />
            }
          />
          <Route
            path={ROUTER.PUSH}
            element={
              <Push
                setActiveAfish={setActiveAfish}
                setActiveNotifications={setActiveNotifications}
                setActiveProfile={setActiveProfile}
                setPoster={setPoster}
                setTitle={setTitle}
                setCount={setCount}
                setLogout={setLogout}
              />
            }
          />
          <Route
            path={ROUTER.INVITATION}
            element={<InvitationPage poster={poster} />}
          />
          <Route
            exact
            path={ROUTER.AUTH}
            element={
              <Auth
                setActiveAfish={setActiveAfish}
                setActiveNotifications={setActiveNotifications}
                setActiveProfile={setActiveProfile}
                setTitle={setTitle}
              />
            }
          />
        </Routes>
        <MenuApp
          activeAfish={activeAfish}
          activeNotifications={activeNotifications}
          activeProfile={activeProfile}
          count={count}
        />
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
