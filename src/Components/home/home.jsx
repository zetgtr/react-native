import { useEffect } from "react";

const Home = ({ setBack, setPagePoster,setTitle,setLogout,setHistory }) => {
  useEffect(()=>{
    setLogout(false)
    setTitle("Афиша мероприятий");
    setPagePoster(true)
    setBack(false);
    setHistory(true)
  },[])
  return <></>;
};

export default Home;