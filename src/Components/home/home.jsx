import { useEffect } from "react";

const Home = ({ setBack, setPagePoster,setTitle }) => {
  useEffect(()=>{
    setTitle("Афиша мероприятий");
    setPagePoster(true)
    setBack(false);
  },[])
  return <></>;
};

export default Home;
