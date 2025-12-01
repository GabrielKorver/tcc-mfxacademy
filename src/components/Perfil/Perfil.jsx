import { useState } from "react";
import Style from "../Perfil/Perfil.module.css";
import ModalPerfil from "../ModalPerfil/ModalPerfil.jsx";
import { IoTimeOutline } from "react-icons/io5";

import { CiEdit } from "react-icons/ci";

const Perfil = () => {
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const [abrirModal, setAbrirModal] = useState(false);

  // 👉 Função para formatar data com tracinho
  const formatarData = (dataISO) => {
    const data = new Date(dataISO);
    const dia = String(data.getDate()).padStart(2, "0");
    const mes = String(data.getMonth() + 1).padStart(2, "0");
    const ano = data.getFullYear();
    return `${dia}-${mes}-${ano}`;
  };

  if (usuario) {
    usuario.data_criacao = formatarData(usuario.data_criacao);
  }

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

        <div className={Style.avatar_nome}>
          <strong>
            Nome:
          </strong>
          <p>{usuario.nome}</p>
        </div>
      </div>

      <div className={Style.membro}>
        <span>
          <strong>Membro desde:</strong>
          <IoTimeOutline className={Style.icon} />
        </span>
        <p>{usuario.data_criacao}</p>

      </div>


      <div className={Style.bio}>
        <strong>Bio</strong>
        <p>{usuario.biografia}</p>
      </div>

      <div className={Style.tecnologias}>
        <strong>Habilidades</strong>
        <p>{usuario.habilidades}</p>
      </div>

      {abrirModal && (
        <ModalPerfil onClose={handleFecharModal} usuario={usuario} />
      )}
    </div>
  );
};

export default Perfil;
