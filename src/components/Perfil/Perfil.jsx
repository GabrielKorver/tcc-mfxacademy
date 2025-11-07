import Style from "../Perfil/Perfil.module.css";
import { CiEdit } from "react-icons/ci";

const Perfil = () => {

  const usuario = JSON.parse(localStorage.getItem("usuario"));

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
          src={usuario.avatar_url}
          alt="avatar"
          style={{ width: "80px", height: "80px", borderRadius: "50%" }}
        />
        <div className={Style.avatar_name}>
          <p>
            Nome: <strong>{usuario.nome}</strong>
          </p>
          {/* <p>
            Email: <strong>{usuario.email}</strong>
          </p> */}
          {/* <p>
            Membro desde: <strong>{usuario.data_criacao}</strong>
          </p> */}
        </div>
      </div>

      <div className={Style.bio}>
        <p>
          <strong>Bio</strong>
        </p>
        <span>{usuario.biografia}</span>
      </div>

      <div className={Style.tecnologias}>
        <p><strong>Tecnologias</strong></p>
        <div className={Style.tecnologias_dev}>
          <span>
            {usuario.habilidades}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Perfil;
