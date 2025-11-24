import styles from "./Mentoria.module.css";

export default function Mentoria() {
  const mentores = [
    {
      tema: "Frontend",
      descricao:
        "Aprenda HTML, CSS, JavaScript, React e todo o ecossistema do desenvolvimento Front-end.",
    },
    {
      tema: "Backend",
      descricao:
        "Entenda o funcionamento do lado do servidor com Node, APIs, bancos de dados e boas práticas.",
    },
    {
      tema: "Fullstack",
      descricao:
        "Domine o desenvolvimento completo unindo frontend, backend e integração entre sistemas.",
    },
    {
      tema: "Carreiras",
      descricao:
        "Receba orientação profissional, monte seu portfólio, currículo e prepare-se para o mercado.",
    },
  ];

  return (
    <div className={styles.container}>
      <section className={styles.mentoriaSection}>
        <h1 className={styles.title}>Mentorias Exclusivas</h1>
        <p className={styles.subtitle}>
          Escolha um tema e faça o agendamento da sua mentoria.
        </p>

        {/* === CARDS COM OS TEMAS === */}
        <div className={styles.cardsArea}>
          {mentores.map((item, index) => (
            <div key={index} className={styles.card}>
              <h2>{item.tema}</h2>
              <p>{item.descricao}</p>
            </div>
          ))}
        </div>

        {/* === FORMULÁRIO DE AGENDAMENTO === */}
        <div className={styles.formArea}>
          <h2>Agendar Mentoria</h2>

          <form className={styles.form}>
            <label>
              Nome:
              <input type="text" placeholder="Seu nome" required />
            </label>

            <label>
              Telefone:
              <input type="tel" placeholder="(00) 00000-0000" required />
            </label>

            <label>
              Data de Agendamento:
              <input type="date" required />
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
  );
}
