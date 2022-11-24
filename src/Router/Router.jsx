import { StyleSheet, View } from "react-native";
import { NativeRouter, Route, Routes } from "react-router-native";
import Header from "../Components/header/header";
import MenuApp from "../Components/menu/menu";
import { ROUTER } from "./constants";
import Poster from "../Components/poster/poster";
import { useEffect, useState } from "react";
import PosterInfo from "../Components/posterInfo/posterInfo";
import { useDispatch } from "react-redux";
import { getAuth, getPosters, getProfile } from "../API/api";
import Home from "../Components/home/home";
import { Auth } from "../Components/auth/auth";
import { ProFile } from "../Components/profile/profile";
import { InvitationPage } from "../Components/invitationPage/invitationPage";

const Router = () => {
  const [title, setTitle] = useState("Афиша мероприятий");
  const [poster, setPoster] = useState();
  const [back, setBack] = useState(false);
  const [pagePoster, setPagePoster] = useState(false);
  const [posterPage, setPosterPage] = useState(false);
  const [logout, setLogout] = useState(false);
  const dicpatch = useDispatch();
  console.log(logout);
  useEffect(() => {
    getPosters(dicpatch);
    getProfile(dicpatch);
    getAuth(dicpatch);
  }, [dicpatch]);
  return (
    <NativeRouter>
      <View style={style.container}>
        <Header back={back} title={title} logout={logout} />
        <Poster
          setPosterPage={setPosterPage}
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
              setLogout={setLogout}
                setBack={setBack}
                setPosterPage={setPosterPage}
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
              setLogout={setLogout}
                posterPage={posterPage}
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
                setPosterPage={setPosterPage}
                setBack={setBack}
                setPoster={setPoster}
                setTitle={setTitle}
                setLogout={setLogout}
                logout={logout}
              />
            }
          />
          <Route
            path={ROUTER.INVITATION}
            element={<InvitationPage poster={poster}/>}
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
