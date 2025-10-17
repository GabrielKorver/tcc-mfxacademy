import { useState, useEffect } from "react";
import Style from "../Header/Header.module.css";
import { FiLogOut, FiUserPlus, FiMenu, FiX } from "react-icons/fi";
import { LuMessageSquarePlus } from "react-icons/lu";
import { FaHome } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo from "../../assets/img_logo3.png";
import ModalNovaPergunta from "../ModalNovaPergunta/ModalNovaPergunta";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [usuarioLogado, setUsuarioLogado] = useState(null);
  const [showModal, setShowModal] = useState(false);

  function toggleMenu() {
    setMenuOpen(!menuOpen);
  }

  function logout() {
    localStorage.removeItem("usuario");
    toast.success("Deslogado com sucesso!", { autoClose: 2500 });

    setTimeout(() => {
      window.location.href = "/";
    }, 2500);
  }

  useEffect(() => {
    const usuario = JSON.parse(localStorage.getItem("usuario"));

    if (usuario) {
      setUsuarioLogado(usuario);
    } else {
      toast.error("Você precisa estar logado para acessar o feed", {
        autoClose: 3000,
      });
      setTimeout(() => {
        window.location.href = "/";
      }, 3000);
    }
  }, []);

  return (
    <>
      <header className={Style.container}>
        <div className={Style.brand}>
          <img src={logo} alt="Logo DevNetwork" className={Style.logoImg} />
          <h1 className={Style.logo}>DevNetwork</h1>
          <p className={Style.textIcon}>
            <FaHome className={Style.icon} />
            Feed
          </p>
        </div>

        <button className={Style.menuButton} onClick={toggleMenu}>
          {menuOpen ? <FiX size={28} /> : <FiMenu size={28} />}
        </button>

        <div
          className={`${Style.boxOptions} ${menuOpen ? Style.showMenu : ""}`}
        >
          <p onClick={() => setShowModal(true)} className={Style.textIcon}>
            <LuMessageSquarePlus className={Style.icon} />
            Nova pergunta
          </p>
          <p className={Style.textIcon}>
            <FiUserPlus className={Style.icon} />
            Adicionar Dev
          </p>
          <p>
            Bem-vindo:{" "}
            <span
              title={usuarioLogado?.name || ""}
              className={Style.usuarioLogado}
            >
              {usuarioLogado?.name
                ? `${usuarioLogado.name[0].toUpperCase()}${
                    usuarioLogado.name[1]?.toUpperCase() || ""
                  }`
                : usuarioLogado?.email || ""}
            </span>
          </p>
          <p className={Style.textIcon} onClick={logout}>
            <FiLogOut className={Style.icon} />
            Sair
          </p>
        </div>
      </header>

      {showModal && <ModalNovaPergunta onClose={() => setShowModal(false)} />}

      <ToastContainer
        position="top-right"
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
};

export default Header;
