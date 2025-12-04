import Style from "../Home/Home.module.css";
import Header from "../../components/Header/Header";
import Perfil from "../../components/Perfil/Perfil";
import { Feed } from "../../components/Feed/Feed";
import Chat from "../../components/Chat/ChatModal"

const Home = () => {
  return (
    <>
      <Header />

      <div className={Style.container}>
        <div className={Style.container_left}>
          <Perfil />
        </div>

        <div className={Style.container_right}>
          <Feed />
        </div>
        <Chat />
      </div>
    </>
  );
};

export default Home;
