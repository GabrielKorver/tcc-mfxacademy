import Style from "../Perfil/Perfil.module.css";
import { CiEdit } from "react-icons/ci";

const Perfil = () => {
  return (
    <div className={Style.container}>
      <div className={Style.perfil}>
        <h1>Meu Perfil</h1>
        <p>
          <CiEdit />
          Editar
        </p>
      </div>

      <div className={Style.avatar_perfil}>
        <img
          src="https://robohash.org/e247115709924ae6b6d095cc7af55336?set=set4&bgset=bg2&size=400x400"
          alt="avatar"
          style={{ width: "80px", height: "80px", borderRadius: "50%" }}
        />
        <div className={Style.avatar_name}>
          <p>
            Nome: <strong>Nome API</strong>
          </p>
          <p>
            Email: <strong>Email API</strong>
          </p>
          <p>
            Membro desde: <strong>Data API</strong>
          </p>
        </div>
      </div>

      <div className={Style.bio}>
        <p>
          <strong>Bio</strong>
        </p>
        <span>Descricao da API</span>
      </div>

      <div className={Style.tecnologias}>
        <p>Tecnologias</p>
        <div className={Style.tecnologias_dev}>
          <span>
            <strong>JavaScrip</strong>
          </span>
          <span>
            <strong>React</strong>
          </span>
          <span>
            <strong>Node</strong>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Perfil;
