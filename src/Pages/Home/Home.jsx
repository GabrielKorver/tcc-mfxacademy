import Style from "../Home/Home.module.css";
import Header from "../../components/Header/Header";
import Perfil from "../../components/Perfil/Perfil";
import { Feed } from "../../components/Feed/Feed";
import Footer from "../../components/Footer/Footer";
import Filtros from "../../components/Filtros/FiltrosPerguntas"
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
          <Filtros />
          <Feed />
          <Feed />
          <Feed />
          <Feed />
          <Feed />
        </div>
        <Chat />
      </div>
      <Footer />
    </>
  );
};

export default Home;
