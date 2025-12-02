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
        console.log(agendamentos);

        const meses = Array(12).fill(0);

        agendamentos.forEach(function (ag) {
          // data_agendamento vem no formato "DD/MM/YYYY HH:MM"
          const [dataParte, horaParte] = ag.data_agendamento.split(" ");
          const [dia, mes, ano] = dataParte.split("/").map(Number);
          const data = new Date(`${ano}-${String(mes).padStart(2, "0")}-${String(dia).padStart(2, "0")}T${horaParte}:00`);

          meses[data.getMonth()] += 1; // incrementa o mês correto
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
      "Jan", "Fev", "Mar", "Abr", "Mai", "Jun",
      "Jul", "Ago", "Set", "Out", "Nov", "Dez",
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
