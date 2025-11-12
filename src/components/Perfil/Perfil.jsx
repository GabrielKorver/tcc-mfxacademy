import { useState } from "react";
import Style from "../Perfil/Perfil.module.css";
import ModalPerfil from "../ModalPerfil/ModalPerfil.jsx";
import { CiEdit } from "react-icons/ci";

const Perfil = () => {
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const [abrirModal, setAbrirModal] = useState(false);

  const handleEditar = () => {
    setAbrirModal(true);
  };

  const handleFecharModal = () => {
    setAbrirModal(false);
  };

  if (!usuario) {
    return (
      <div className={Style.container}>
        <h2>Nenhum usuário encontrado</h2>
        <p>Faça login ou cadastre-se para ver o perfil.</p>
      </div>
    );
  }

  return (
    <div className={Style.container}>
      <div className={Style.perfil}>
        <h1>Meu Perfil</h1>
        <p onClick={handleEditar} className={Style.editar}>
          <CiEdit /> Editar
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
        </div>
      </div>

      <div className={Style.bio}>
        <p>
          <strong>Bio</strong>
        </p>
        <span>{usuario.biografia}</span>
      </div>

      <div className={Style.tecnologias}>
        <p>
          <strong>Habilidades</strong>
        </p>
        <div className={Style.tecnologias_dev}>
          <span>{usuario.habilidades}</span>
        </div>
      </div>

      {/* Renderiza o modal somente se abrirModal for true */}
      {abrirModal && (
        <ModalPerfil onClose={handleFecharModal} usuario={usuario} />
      )}
    </div>
  );
};

export default Perfil;
