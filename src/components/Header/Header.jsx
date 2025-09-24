import { useState } from "react";
import Style from "../Header/Header.module.css";
import { FiLogOut, FiUserPlus, FiMenu, FiX } from "react-icons/fi";
import { LuMessageSquarePlus } from "react-icons/lu";
import { FaHome } from "react-icons/fa";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  function toggleMenu() {
    setMenuOpen(!menuOpen);
  }

  return (
    <header className={Style.container}>
      <div className={Style.boxFeed}>
        <h1 className={Style.logo}>Dev Network</h1>
        <p className={Style.textIcon}>
          <FaHome className={Style.icon} />
          Feed
        </p>
      </div>

      <button className={Style.menuButton} onClick={toggleMenu}>
        {menuOpen ? <FiX size={28} /> : <FiMenu size={28} />}
      </button>

      <div className={`${Style.boxOptions} ${menuOpen ? Style.showMenu : ""}`}>
        <p className={Style.textIcon}>
          <LuMessageSquarePlus className={Style.icon} />
          Nova pergunta
        </p>
        <p className={Style.textIcon}>
          <FiUserPlus className={Style.icon} />
          Adicionar Dev
        </p>
        <p className={Style.textIcon}>
          <FiLogOut className={Style.icon} />
          Sair
        </p>
      </div>
    </header>
  );
};

export default Header;
