import {
  FaHome,
  FaUsers,
  FaQuestion,
  FaChalkboardTeacher,
} from "react-icons/fa";
import { NavLink } from "react-router-dom";
import styles from "./Aside.module.css";

const navItems = [
  { to: "dashboard", label: "Dashboard", icon: <FaHome /> },
  { to: "usuarios", label: "Usuários", icon: <FaUsers /> },
  { to: "perguntas", label: "Perguntas", icon: <FaQuestion /> },
  { to: "mentorias", label: "Mentorias", icon: <FaChalkboardTeacher /> },
  { to: "datahora", label: "Data e Hora", icon: <FaChalkboardTeacher /> },
];

export default function Aside() {
  return (
    <aside className={styles.aside}>
      <div className={styles.logo}>Painel DevNetwork</div>
      <nav>
        <ul className={styles.navList}>
          {navItems.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  isActive
                    ? `${styles.navLink} ${styles.active}`
                    : styles.navLink
                }
              >
                <span className={styles.icon}>{item.icon}</span>
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
