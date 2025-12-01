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
  const [agendamentosPorMes, setAgendamentosPorMes] = useState([]);

  useEffect(function () {
    async function pegarInfosAPI() {
      try {
        const respostaFetch = await fetch(
          "http://127.0.0.1:3000/agendamentos/get"
        );
        const agendamentos = await respostaFetch.json();

        // Array com 12 posições (Jan → Dez)
        const meses = Array(12).fill(0);

        agendamentos.forEach(function (ag) {
          const data = new Date(ag.data_agendamento); // ajuste conforme seu backend
          const mes = data.getMonth(); // 0 a 11
          meses[mes] += 1;
        });

        setAgendamentosPorMes(meses);
      } catch (error) {
        console.log("Deu erro", error);
      }
    }

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
        label: "Agendamentos por mês",
        data: agendamentosPorMes,
        backgroundColor: "rgba(54, 162, 235, 0.7)",
      },
    ],
  };

  const chartOptions = {
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        ticks: { precision: 0 },
      },
    },
  };

  return <Bar data={data} options={chartOptions} />;
};

export default GraficoUsuario;
