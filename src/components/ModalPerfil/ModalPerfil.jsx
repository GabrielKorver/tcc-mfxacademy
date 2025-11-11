import { TfiClose } from "react-icons/tfi";
import Style from "./ModalPerfil.module.css";
import { toast, ToastContainer } from "react-toastify"; // 👈 precisa importar ToastContainer aqui
import "react-toastify/dist/ReactToastify.css"; // 👈 importa o CSS do toast
import { useState } from "react";

const ModalPerfil = ({ onClose, usuario }) => {
  const [formData, setFormData] = useState({
    nome: usuario.nome,
    email: usuario.email,
    senha: usuario.senha,
    avatar_url: usuario.avatar_url,
    biografia: usuario.biografia,
    habilidades: usuario.habilidades,
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  async function handleSalvar() {
    try {
      const response = await fetch(
        `http://127.0.0.1:3000/users/put/${usuario.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const dados = await response.json();

      if (!response.ok) {
        console.error("Erro ao atualizar:", dados);
        toast.error(
          dados.error ||
            "Erro ao atualizar o perfil. Verifique os dados e tente novamente."
        );
        return;
      }

      // Atualiza dados no localStorage (mantendo consistência)
      const usuarioAtualizado = {
        ...usuario,
        ...dados.usuario,
      };

      localStorage.setItem("usuario", JSON.stringify(usuarioAtualizado));

      toast.success("Perfil atualizado com sucesso! 🎉");

      setTimeout(() => {
        onClose();
        window.location.reload();
      }, 1500);
    } catch (error) {
      console.error(error);
      toast.error(
        "Erro ao atualizar o perfil. Verifique os dados e tente novamente."
      );
    }
  }

  return (
    <div className={Style.modal_overlay}>
      <div className={Style.modal_content}>
        <button className={Style.close_button} onClick={onClose}>
          <TfiClose size={20} />
        </button>

        <h2>Editar Perfil</h2>

        <div className={Style.formGroup}>
          <label>Nome</label>
          <input
            type="text"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
          />
        </div>

        <div className={Style.formGroup}>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div className={Style.formGroup}>
          <label>Senha</label>
          <input
            type="password"
            name="senha"
            value={formData.senha}
            onChange={handleChange}
            placeholder="Digite sua nova senha"
          />
        </div>

        <div className={Style.formGroup}>
          <label>Avatar URL</label>
          <input
            type="text"
            name="avatar_url"
            value={formData.avatar_url}
            onChange={handleChange}
          />
        </div>

        <div className={Style.formGroup}>
          <label>Biografia</label>
          <textarea
            name="biografia"
            value={formData.biografia}
            onChange={handleChange}
          ></textarea>
        </div>

        <div className={Style.formGroup}>
          <label>Habilidades</label>
          <input
            type="text"
            name="habilidades"
            value={formData.habilidades}
            onChange={handleChange}
          />
        </div>

        <button className={Style.button} onClick={handleSalvar}>
          Salvar
        </button>
      </div>

      {/* Componente Toastify configurado */}
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        style={{ marginTop: 50 }}
      />
    </div>
  );
};

export default ModalPerfil;
