import { useEffect } from "react";

const Home = ({
  setPagePoster,
  setTitle,
  setLogout,
  setHistory,
  setActiveAfish,
  setActiveNotifications,
  setActiveProfile,
}) => {
  useEffect(() => {
    setActiveAfish(true);
    setActiveProfile(false);
    setActiveNotifications(false);
    setLogout(false);
    setTitle("Афиша мероприятий");
    setPagePoster(true);
    setHistory(true);
  }, []);
  return <></>;
};

export default Home;
