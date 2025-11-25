import { useEffect, useState } from "react";
import styles from "./Dashboard.module.css";
import GraficoUsuario from "../../components/GraficoUsuario/GraficoUsuario.jsx";

export default function Dashboard() {
  const [totalUsuarios, setTotalUsuarios] = useState(0);

  const getUsuario = async () => {
    try {
      const url = "http://127.0.0.1:3000/users/get";
      const response = await fetch(url);
      const data = await response.json();

      setTotalUsuarios(data.length); // <-- AQUI pega o total certinho
    } catch (error) {
      console.log("Erro ao buscar usuários:", error);
    }
  };

  useEffect(() => {
    getUsuario();
  }, []);

  return (
    <div className={styles.container}>
      <h1>Dashboard</h1>

      <div className={styles.graficos}>
        <div className={styles.graficoPadrao}>
          <div className={styles.graficoInfo}>
            <p>Gráfico de Usuários</p>
            <p>
              Total: <strong>{totalUsuarios}</strong>
            </p>
          </div>

          <div className={styles.graficoBox}>
            <GraficoUsuario />
          </div>
        </div>

        <div className={styles.graficoPadrao}>
          <div className={styles.graficoInfo}>
            <p>Gráfico de Perguntas</p>
            <p>
              Total: <strong>{totalUsuarios}</strong>
            </p>
          </div>

          <div className={styles.graficoBox}>
            <GraficoUsuario />
          </div>
        </div>

        <div className={styles.graficoPadrao}>
          <div className={styles.graficoInfo}>
            <p>Gráfico de Agendamentos</p>
            <p>
              Total: <strong>{totalUsuarios}</strong>
            </p>
          </div>

          <div className={styles.graficoBox}>
            <GraficoUsuario />
          </div>
        </div>
      </div>
    </div>
  );
}
