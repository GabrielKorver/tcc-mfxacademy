import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import { useEffect, useState } from "react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

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
          const mes = data.getMonth();
          meses[mes] += 1;
        });

        const resultado = meses.map((total, index) => ({
          mes: index + 1,
          total,
        }));

        setUsuariosPorMes(resultado);
      } catch (error) {
        console.log("Deu erro", error);
      }
    };

    pegarInfosAPI();
  }, []);

  const data = {
    labels: usuariosPorMes.map((item) => item.mes),
    datasets: [
      {
        label: "Usuários cadastrados por mês",
        data: usuariosPorMes.map((item) => item.total),
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.4)",
        borderWidth: 3,
        tension: 0.3, // deixa a linha levemente curva
        pointRadius: 5,
        pointBackgroundColor: "rgba(75, 192, 192, 1)",
        fill: false, // mantém estilo parecido com o gráfico anterior
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false, // <-- FUNDAMENTAL pro 100% da altura funcionar
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <Line data={data} options={chartOptions} />
    </div>
  );
};

export default GraficoUsuario;
