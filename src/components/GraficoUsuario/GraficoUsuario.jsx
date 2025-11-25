import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import { useEffect, useState } from "react";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const GraficoUsuario = () => {
  const [usuariosPorMes, setUsuariosPorMes] = useState([]);

  useEffect(() => {
    const pegarInfosAPI = async () => {
      try {
        const respostaFetch = await fetch("http://127.0.0.1:3000/users/get");
        const usuarios = await respostaFetch.json();

        const meses = Array(12).fill(0);

        usuarios.forEach((user) => {
          const data = new Date(user.data_criacao);
          const mes = data.getMonth(); // 0-11
          meses[mes] += 1;
        });

        setUsuariosPorMes(meses);
      } catch (error) {
        console.log("Deu erro", error);
      }
    };

    pegarInfosAPI();
  }, []);

  const data = {
    labels: [
      "Jan",
      "Fev",
      "Mar",
      "Abr",
      "Mai",
      "Jun",
      "Jul",
      "Ago",
      "Set",
      "Out",
      "Nov",
      "Dez",
    ],
    datasets: [
      {
        label: "Usuários cadastrados por mês",
        data: usuariosPorMes,
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };

  const chartOptions = {
    maintainAspectRatio: false, // IMPORTANTE!
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          precision: 0,
        },
      },
    },
  };

  return <Bar data={data} options={chartOptions} />;
};

export default GraficoUsuario;
