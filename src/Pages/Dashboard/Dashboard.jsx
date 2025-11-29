import { useEffect, useState } from "react";
import styles from "./Dashboard.module.css";
import GraficoUsuario from "../../components/GraficoUsuario/GraficoUsuario.jsx";
import GraficoPerguntas from "../../components/GraficoPergunta/GraficoPergunta.jsx";
import GraficoAgendamentos from "../../components/GraficoAgendamentos/GraficoAgendamentos.jsx";
import { ToastContainer, toast } from "react-toastify";

export default function Dashboard() {
  const [totalUsuarios, setTotalUsuarios] = useState(0);
  const [totalPerguntas, setTotalPerguntas] = useState(0);
  const [totalAgendamentos, setTotalAgendamentos] = useState(0);

  // ⬇️ VERIFICA LOGIN + PERMISSÃO
  useEffect(() => {
    const usuario = JSON.parse(localStorage.getItem("usuario"));

    if (!usuario) {
      toast.error("Você precisa estar logado para acessar o Dashboard.");
      setTimeout(() => {
        window.location.href = "/Login";
      }, 2000);
      return;
    }

    const isAdmin =
      usuario.email === "gabrielkorver76ers@gmail.com" ||
      usuario.email === "mayaracenteno1@gmail.com";

    if (!isAdmin) {
      toast.error("Acesso negado! Você não tem permissão.");
      setTimeout(() => {
        window.location.href = "/Login";
      }, 2000);
    }
  }, []);

  const getUsuario = async () => {
    try {
      const url = "http://127.0.0.1:3000/users/get";
      const response = await fetch(url);
      const data = await response.json();

      setTotalUsuarios(data.length);
    } catch (error) {
      console.log("Erro ao buscar usuários:", error);
    }
  };

  useEffect(() => {
    getUsuario();
  }, []);

  const getPerguntas = async () => {
    try {
      const url = "http://127.0.0.1:3000/perguntas/get";
      const response = await fetch(url);
      const data = await response.json();

      setTotalPerguntas(data.length);
    } catch (error) {
      console.log("Erro ao buscar perguntas:", error);
    }
  };

  useEffect(() => {
    getPerguntas();
  }, []);

  const getAgendamentos = async () => {
    try {
      const url = "http://127.0.0.1:3000/agendamentos/get";
      const response = await fetch(url);
      const data = await response.json();

      setTotalAgendamentos(data.length);
    } catch (error) {
      console.log("Erro ao buscar agendamentos:", error);
    }
  };

  useEffect(() => {
    getAgendamentos();
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
              Total: <strong>{totalPerguntas}</strong>
            </p>
          </div>

          <div className={styles.graficoBox}>
            <GraficoPerguntas />
          </div>
        </div>

        <div className={styles.graficoPadrao}>
          <div className={styles.graficoInfo}>
            <p>Gráfico de Agendamentos</p>
            <p>
              Total: <strong>{totalAgendamentos}</strong>
            </p>
          </div>

          <div className={styles.graficoBox}>
            <GraficoAgendamentos />
          </div>
        </div>
      </div>

      <ToastContainer position="top-right" autoClose={1500} theme="colored" />
    </div>
  );
}
