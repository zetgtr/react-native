import { useEffect } from "react";

const Home = ({ setBack, setPagePoster,setTitle,setLogout }) => {
  useEffect(()=>{
    setLogout(false)
    setTitle("Афиша мероприятий");
    setPagePoster(true)
    setBack(false);
  },[])
  return <></>;
};

export default Home;