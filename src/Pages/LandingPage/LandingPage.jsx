import styles from "../LandingPage/LandingPage.module.css";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

export default function LandingPage() {
  return (
    <div className={styles.container}>

      <header className={styles.header}>
        <div className={styles.headerContainer}>
          <div className={styles.logo}>DevNetwork</div>

          <nav className={styles.menu}>
            <a href="#projeto">Sobre o Projeto</a>
            <a href="#criadores">Sobre os Criadores</a>
            <a href="/Login" className={styles.loginBtn}>Ir para Login</a>
          </nav>
        </div>
      </header>

      <section className={styles.hero}>
        <h1>Bem-vindo ao Devnetwork</h1>
        <p>
          Uma plataforma criada por desenvolvedores iniciantes que buscam transformar ideias em realidade através do código.
          Permite que os usuários façam perguntas e respostas, promovendo a interação e troca de conhecimento entre os DEVS registrados.
        </p>

        <div className={styles.features}>
          <div className={styles.card}>
            <span className={styles.icon}>💻</span>
            <h3>Código Limpo</h3>
            <p>Desenvolvido com as melhores práticas e padrões modernos.</p>
          </div>
          <div className={styles.card}>
            <span className={styles.icon}>⚡</span>
            <h3>Alta Performance</h3>
            <p>Otimizado para velocidade e eficiência em cada interação.</p>
          </div>
          <div className={styles.card}>
            <span className={styles.icon}>✨</span>
            <h3>Inovação</h3>
            <p>Tecnologias modernas e evolução contínua.</p>
          </div>
        </div>

        <div className={styles.missao}>
          <h2>Nossa Missão</h2>
          <p>
            Criar soluções tecnológicas acessíveis e intuitivas que empoderem
            usuários e desenvolvedores. Acreditamos que a tecnologia deve ser
            inclusiva e impactar positivamente a vida das pessoas.
          </p>
        </div>
      </section>

      <section className={styles.creators}>
        <h2>Conheça os Criadores</h2>
        <p>Desenvolvedores iniciantes com paixão por tecnologia e inovação</p>

        <div className={styles.creatorCards}>
          <div className={styles.creator}>
            <img
              src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400"
              alt="Ana Silva"
            />
            <h3>Ana Silva</h3>
            <span>Full Stack Developer</span>
            <p>
              Apaixonada por criar interfaces intuitivas e experiências
              marcantes. Especializada em React e design systems.
            </p>
            <div className={styles.socials}>
              <FaGithub size={20} />
              <FaLinkedin size={20} />
              <FaEnvelope size={20} />
            </div>
          </div>

          <div className={styles.creator}>
            <img
              src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=400"
              alt="Carlos Mendes"
            />
            <h3>Carlos Mendes</h3>
            <span>Backend Developer</span>
            <p>
              Especialista em APIs escaláveis e otimização de performance.
              Entusiasta de banco de dados e arquitetura.
            </p>
            <div className={styles.socials}>
              <FaGithub size={20} />
              <FaLinkedin size={20} />
              <FaEnvelope size={20} />
            </div>
          </div>
        </div>

        <div className={styles.cta}>
          <p>
            Sempre buscamos desafios e oportunidades de aprendizado. Entre em
            contato se quiser colaborar!
          </p>
          <button>Entrar em Contato</button>
        </div>
      </section>

      <footer className={styles.footer}>
        <p>Feito com ❤️ por desenvolvedores iniciantes</p>
        <span>© 2024 DevPortal</span>
      </footer>
    </div>
  );
}
