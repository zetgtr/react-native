import { useEffect } from "react";

const Home = ({
  setBack,
  setPagePoster,
  setTitle,
  setLogout,
  setHistory,
  setActiveAfish,
  setActiveNotifications,
  setActiveProfile,
}) => {
  useEffect(() => {
    setActiveAfish(true)
    setActiveProfile(false)
    setActiveNotifications(false)
    setLogout(false);
    setTitle("Афиша мероприятий");
    setPagePoster(true);
    setBack(false);
    setHistory(true);
  }, []);
  return <></>;
};

export default Home;
