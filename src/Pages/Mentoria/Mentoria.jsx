import styles from "./Mentoria.module.css";
import frontendImg from "../../assets/img_frontend_card.png";
import backendImg from "../../assets/img_backend_card.png";
import fullstackImg from "../../assets/img_fullstack_card.png";
import carreirasImg from "../../assets/img_carreiras_card.png";

export default function Mentoria() {
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
            Voltar para o início
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
                {/* NOVO: Adicionando a imagem ao card */}
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
              <br /><br />

              <div className={styles.precoInfo}>
                <p className={styles.precoDe}>
                  De: <del>R$ 280,00</del>
                </p>
                <br /><br />
                <p className={styles.precoPor}>Por:</p>
                <h1 className={styles.precoAtual}>R$ 79,90</h1>
                <br />
                <small className={styles.duracao}>
                  Cada mentoria tem duração de 45 minutos
                </small>
              </div>
            </details>

            <br />

            <form className={styles.form}>
              <label>
                Nome:
                <br /> <br />
                <input type="text" placeholder="Seu nome" required />
              </label>

              <label>
                Telefone:
                <br /> <br />
                <input type="tel" placeholder="(00) 00000-0000" required />
              </label>

              <label>
                Data de Agendamento:
                <br /> <br />
                <input type="datetime-local" required />
              </label>

              <label>
                Tema escolhido:   
                <select required>
                  <option value="">Selecione um tema</option>
                  {mentores.map((tema, index) => (
                    <option key={index} value={tema.tema}>
                      {tema.tema}
                    </option>
                  ))}
                </select>
              </label>

              <button type="submit" className={styles.agendarBtn}>
                Confirmar Agendamento
              </button>
            </form>
          </div>
        </section>
      </div>
    </>
  );
}
