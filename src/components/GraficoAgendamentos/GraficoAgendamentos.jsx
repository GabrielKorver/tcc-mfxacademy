import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Chart } from "react-chartjs-2";
import { useEffect, useState } from "react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

export default function GraficoUsuario() {
  const [agendamentosPorMes, setagendamentosPorMes] = useState([]);

  useEffect(() => {
    const pegarInfosAPI = async () => {
      try {
        const respostaFetch = await fetch("http://127.0.0.1:3000/agendamentos/get");
        const usuarios = await respostaFetch.json();

        const meses = Array(12).fill(0);

        usuarios.forEach((user) => {
          const data = new Date(user.data_criacao);
          const mes = data.getMonth();
          meses[mes] += 1;
        });

        const resultado = meses.map((total, index) => ({
          mes: index + 1,
          total,
        }));

        setagendamentosPorMes(resultado);
      } catch (error) {
        console.log("Erro ao buscar API", error);
      }
    };

    pegarInfosAPI();
  }, []);

  const data = {
    labels: agendamentosPorMes.map((item) => item.mes),

    datasets: [
      {
        type: "bar",
        label: "   por mês",
        data: agendamentosPorMes.map((item) => item.total),
        backgroundColor: "rgba(75, 192, 192, 0.5)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
      {
        type: "line",
        label: "Tendência (linha)",
        data: agendamentosPorMes.map((item) => item.total),
        borderColor: "#4B8AF0",
        backgroundColor: "#4B8AF0",
        borderWidth: 2,
        tension: 0.3,
        pointRadius: 5,
        pointBackgroundColor: "#4B8AF0",
        fill: false,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // mantém largura 100% funcionando dentro do container
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <Chart type="bar" data={data} options={options} />
    </div>
  );
}
