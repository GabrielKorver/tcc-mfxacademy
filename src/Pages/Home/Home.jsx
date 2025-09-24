import Style from "../Home/Home.module.css";
import Header from "../../components/Header/Header";
import Perfil from "../../components/Perfil/Perfil";
import { Feed } from "../../components/Feed/Feed";
import Footer from "../../components/Footer/Footer";

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
          <Feed />
          <Feed />
          <Feed />
          <Feed />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
