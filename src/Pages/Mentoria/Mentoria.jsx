import styles from "./Mentoria.module.css";
import { RiArrowGoBackFill } from "react-icons/ri";
import frontendImg from "../../assets/img_frontend_card.png";
import backendImg from "../../assets/img_backend_card.png";
import fullstackImg from "../../assets/img_fullstack_card.png";
import carreirasImg from "../../assets/img_carreiras_card.png";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ToastContainer, toast } from "react-toastify";


export default function Mentoria() {
  const [datasPermitidas, setDatasPermitidas] = useState([]);
  const [horasPermitidas, setHorasPermitidas] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [mentoria, setMentoria] = useState([]);
  const [mentoriaSelecionado, setMentoriaSelecionado] = useState("");
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");

  // Buscar datas
  const getDate = async () => {
    try {
      const url = `http://127.0.0.1:3000/data/get`;
      const response = await fetch(url);
      const data = await response.json();

      const datasConvertidas = data.map(item => new Date(item.agenda_data));
      setDatasPermitidas(datasConvertidas);
    } catch {
      toast.error("Erro ao buscar datas");
    }
  };

  useEffect(() => {
    getDate();
  }, []);

  // Buscar horas
  const getHora = async () => {
    try {
      const url = `http://127.0.0.1:3000/hora/get`;
      const response = await fetch(url);
      const data = await response.json();

      const horasConvertidas = data.map(item => {
        const partes = item.agenda_hora.split(":");
        const date = new Date();
        date.setHours(parseInt(partes[0]));
        date.setMinutes(parseInt(partes[1]));
        date.setSeconds(0);
        date.setMilliseconds(0);
        return date;
      });

      setHorasPermitidas(horasConvertidas);
    } catch {
      toast.error("Erro ao buscar horas");
    }
  };

  useEffect(() => {
    getHora();
  }, []);

  const getMentoria = async () => {
    try {
      const url = "http://127.0.0.1:3000/mentoria/get";
      const response = await fetch(url);
      const data = await response.json();
      setMentoria(data);
    } catch {
      toast.error("Erro ao buscar mentorias");
    }
  };

  useEffect(() => {
    getMentoria();
  }, []);


  const criarAgendamento = async () => {
    try {
      if (!nome || !telefone || !selectedDate || !mentoriaSelecionado) {
        return toast.error("Preencha todos os campos!");
      }

      const agora = new Date();

      // Bloqueia horário 00:00:00
      if (
        selectedDate.getHours() === 0 &&
        selectedDate.getMinutes() === 0 &&
        selectedDate.getSeconds() === 0
      ) {
        return toast.error("Horário 00:00 não pode ser agendado!");
      }

      // Bloqueia datas/horários que já passaram
      if (selectedDate < agora) {
        return toast.error("Não é possível agendar um horário que já passou!");
      }

      const dataFormatada = new Date(selectedDate)

      const agendamento = {
        nome,
        telefone,
        data_agendamento: dataFormatada.toLocaleString("pt-br"),
        mentoria_id: mentoriaSelecionado,
      };

      const URL = "http://127.0.0.1:3000/agendamentos/post";

      const response = await fetch(URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(agendamento),
      });

      const data = await response.json(); // backend SEMPRE envia message

      if (!response.ok) {
        toast.error(data.message || "Erro ao criar agendamento.");
        return;
      }

      toast.success(data.message || "Agendamento criado com sucesso!");

      setTimeout(() => {
        window.location.href = "/Login";
      }, 2000);

    } catch (error) {
      console.error("Erro de conexão:", error);
      toast.error("Erro ao conectar com o servidor.");
    }
  };


  const mentores = [
    {
      tema: "Frontend",
      descricao:
        "Aprenda HTML, CSS, JavaScript, React e todo o ecossistema do desenvolvimento Front-end.",
      imagem: frontendImg,
    },
    {
      tema: "Backend",
      descricao:
        "Entenda o funcionamento do lado do servidor com Node, APIs, bancos de dados e boas práticas.",
      imagem: backendImg,
    },
    {
      tema: "Fullstack",
      descricao:
        "Domine o desenvolvimento completo unindo frontend, backend e integração entre sistemas.",
      imagem: fullstackImg,
    },
    {
      tema: "Carreiras",
      descricao:
        "Receba orientação profissional, monte seu portfólio, currículo e prepare-se para o mercado.",
      imagem: carreirasImg,
    },
  ];

  return (
    <>
      {/* HEADER */}
      <header className={styles.header}>
        <div className={styles.headerContainer}>
          <div className={styles.logo}>
            <img src="src/assets/novo_logo.png" alt="DevNetwork Logo" />
            <span>DevNetwork</span>
          </div>

          <a href="/" className={styles.inicioBtn}>
            <RiArrowGoBackFill />
            Voltar
          </a>

          <a href="/" className={styles.inicioBtn2}>
            <RiArrowGoBackFill />
          </a>
        </div>
      </header>

      {/* CONTEÚDO DA PÁGINA */}
      <div className={styles.container}>
        <section className={styles.mentoriaSection}>
          <h1 className={styles.title}>Mentorias Exclusivas</h1>
          <p className={styles.subtitle}>
            Escolha um tema e faça o agendamento da sua mentoria para aprimorar
            seu conhecimento e/ou alavancar sua carreira!
          </p>

          <div className={styles.cardsArea}>
            {mentores.map((item, index) => (
              <div key={index} className={styles.card}>
                <img
                  src={item.imagem}
                  alt={`Ilustração para o tema ${item.tema}`}
                  className={styles.cardImage}
                />

                <h2>{item.tema}</h2>
                <p>{item.descricao}</p>
              </div>
            ))}
          </div>

          <div className={styles.formArea}>
            <h2>Agendar Mentoria</h2>
            <p className={styles.subtitle}>
              Clique em "saiba mais" para ter acesso a condições especiais às
              nossas mentorias personalizadas!
            </p>

            <details className={styles.precoDetails}>
              <summary className={styles.saibaMaisBtn}>Saiba Mais</summary>
              <br />
              <br />

              <div className={styles.precoInfo}>
                <p className={styles.precoDe}>
                  De: <del>R$ 280,00</del>
                </p>
                <br />
                <br />
                <p className={styles.precoPor}>Por:</p>
                <h1 className={styles.precoAtual}>R$ 79,90</h1>
                <br />
                <small className={styles.duracao}>
                  Cada mentoria tem duração de 1 hora.
                </small>
              </div>
            </details>

            <br />

            <div className={styles.form}>
              <label>Nome:</label>
              <input onChange={(e) => setNome(e.target.value)} type="text" placeholder="Seu nome" required />

              <label>Telefone:</label>
              <input onChange={(e) => setTelefone(e.target.value)} type="tel" placeholder="(00) 00000-0000" required />

              <label>Data e hora:</label>

              <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                includeDates={datasPermitidas}
                includeTimes={horasPermitidas.map(hora => {
                  const novaData = new Date(selectedDate || new Date());
                  novaData.setHours(hora.getHours());
                  novaData.setMinutes(hora.getMinutes());
                  novaData.setSeconds(0);
                  return novaData;
                })}
                showTimeSelect
                dateFormat="dd/MM/yyyy HH:mm"
                placeholderText="Selecione data e hora"
                onChangeRaw={(e) => e.preventDefault()} // impede digitação
              />

              <select
                value={mentoriaSelecionado}
                onChange={(e) => setMentoriaSelecionado(e.target.value)}
              >
                <option value="">Selecione a tecnologia</option>

                {mentoria.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.nome}
                  </option>
                ))}
              </select>

              <button onClick={criarAgendamento} className={styles.agendarBtn}>
                Confirmar Agendamento
              </button>
            </div>
          </div>
        </section>
        <ToastContainer
          position="top-right"
          autoClose={1500}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </div>
    </>
  );
}
