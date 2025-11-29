import { useState } from "react";
import styles from "../LandingPage/LandingPage.module.css";
import {
  FaGithub,
  FaLinkedin,
  FaWhatsapp,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import Slide from "../../components/Slider/Slider.jsx";
import Slide2 from "../../components/Slider2/Slider2.jsx";
import Carroussel from "../../components/Carroussel-tech/Carroussel.jsx";

export default function LandingPage() {
  const [menuOpen, setMenuOpen] = useState(false);

  function toggleMenu() {
    setMenuOpen(!menuOpen);
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerContainer}>
          {/* LOGO */}
          <div className={styles.logo}>
            <img src="src/assets/novo_logo.png" alt="DevNetwork Logo" />
            <span>DevNetwork</span>
          </div>

          {/* BOTÃO HAMBÚRGUER */}
          <button className={styles.hamburger} onClick={toggleMenu}>
            {menuOpen ? <FaTimes size={25} /> : <FaBars size={25} />}
          </button>

          {/* MENU */}
          <nav className={`${styles.menu} ${menuOpen ? styles.menuOpen : ""}`}>
            <a onClick={toggleMenu} href="#projeto">
              Sobre o Projeto
            </a>
            <a onClick={toggleMenu} href="#criadores">
              Sobre os Criadores
            </a>
            <a
              onClick={toggleMenu}
              className={styles.mentoria}
              href="/mentoria"
            >
              Mentoria
            </a>
            <a onClick={toggleMenu} href="/Login" className={styles.loginBtn}>
              Ir para Login
            </a>
          </nav>
        </div>
      </header>

      <section id="" className={styles.hero}>
        <h1>Bem-vindo ao DevNetwork</h1>
        <p>
          Uma plataforma criada por desenvolvedores iniciantes que buscam
          transformar ideias em realidade através do código. Permite que os
          usuários façam perguntas e respostas, promovendo a interação e troca
          de conhecimento entre os DEVS registrados.
        </p>

        <div className={styles.features}>
          <div className={styles.card}>
            <span className={styles.icon}>💡</span>
            <h3>Comunidade Ativa</h3>
            <p>
              Interaja com outros desenvolvedores, compartilhe experiências e
              cresça junto com a comunidade Devnetwork.
            </p>
          </div>
          <div className={styles.card}>
            <span className={styles.icon}>💬</span>
            <h3>Perguntas e Respostas</h3>
            <p>
              Tire dúvidas, ajude outros devs e colabore para fortalecer o
              aprendizado coletivo.
            </p>
          </div>
          <div className={styles.card}>
            <span className={styles.icon}>🚀</span>
            <h3>Evolução Profissional</h3>
            <p>
              Aprenda constantemente e transforme conhecimento em oportunidades
              reais no mundo da tecnologia.
            </p>
          </div>
          <div className={styles.card}>
            <span className={styles.icon}>✅</span>
            <h3>Mentorias Particulares</h3>
            <p>
              Aprenda de forma personalizada e transforme conhecimento em
              oportunidades reais no mundo da tecnologia com uma mentoria
              individual focada no seu crescimento.
            </p>
          </div>
        </div>

        <br />
        <br />

        <Slide />

        <br />
        <br />

        <h1 id="projeto" className={styles.hero}>
          Tecnologias Utilizadas no Projeto
        </h1>

        <div className={styles.tecnologias}>
          <Carroussel />
        </div>

        <br />
        <br />

        <Slide2 />

        <div className={styles.missao}>
          <h2>Nossa Missão</h2>
          <p>
            Nossa missão é criar um ambiente colaborativo onde o aprendizado, a
            troca de conhecimento e a prática constante sejam o caminho para o
            crescimento profissional. Buscamos inspirar e conectar
            desenvolvedores iniciantes, oferecendo um espaço onde cada código
            escrito, cada dúvida resolvida e cada projeto compartilhado se
            tornam passos importantes rumo à evolução na jornada tech.
          </p>
        </div>
      </section>

      <section id="criadores" className={styles.creators}>
        <h2>Conheça os Criadores</h2>
        <p>Desenvolvedores iniciantes apaixonados por tecnologia</p>

        <div className={styles.creatorCards}>
          <div className={styles.creator}>
            <img
              src="https://media.licdn.com/dms/image/v2/D4D03AQHefBz7prlvuw/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1728178950809?e=1764806400&v=beta&t=ZfrrR1QNfjBOpUmwbyd5l3nxRYwqMwCwrQsm9p94nk8"
              alt="Gabriel Almeida"
            />
            <h3>Gabriel Almeida</h3>
            <span>Full Stack Developer</span>
            <p>
              Motivado pela paixão por tecnologia e o desejo constante de
              aprender, estou pronto para enfrentar desafios e contribuir com
              soluções inovadoras.
            </p>
            <div className={styles.socials}>
              <a href="https://github.com/GabrielKorver" target="_blank">
                <FaGithub size={20} />
              </a>
              <a
                href="https://www.linkedin.com/in/gabriel-de-almeida-rodrigues-6a10a4103/"
                target="_blank"
              >
                <FaLinkedin size={20} />
              </a>
              <a href="https://wa.me/5511951594482?text=Ola%2C+meu+contato+é+através+do+DevNetwork" target="blank">
                <FaWhatsapp size={20} />
              </a>
            </div>
          </div>

          <div className={styles.creator}>
            <img
              src="https://media.licdn.com/dms/image/v2/D4E03AQF-x3Lc3cByfQ/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1700264504294?e=1764806400&v=beta&t=HSzpiSJ-fkgDJ7hhnpKO8_8Q27ixSlk8SK7eY-Bz3_s"
              alt="Mayara Centeno"
            />
            <h3>Mayara Centeno</h3>
            <span>Full Stack Developer</span>
            <p>
              Impulsionada pela vontade de crescer e transformar minha carreira,
              estou focada em desenvolver habilidades como Full Stack Developer,
              unindo criatividade e lógica para criar soluções completas e
              impactantes.
            </p>
            <div className={styles.socials}>
              <a href="https://github.com/MayCenteno1" target="_blank">
                <FaGithub size={20} />
              </a>
              <a
                href="https://www.linkedin.com/in/mayara-centeno-62b563269/"
                target="_blank"
              >
                <FaLinkedin size={20} />
              </a>
              <a href="https://wa.me/5511940355834?text=Ola%2C+meu+contato+é+através+do+DevNetwork" target="blank">
                <FaWhatsapp size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className={styles.cta}>
          <p>
            Sempre buscamos desafios e oportunidades de aprendizado. Entre em
            contato se quiser colaborar!
          </p>
          <a href="mailto:devnetwork.adm@gmail.com?subject=Contato">
            <button>Entrar em Contato</button>
          </a>

        </div>
      </section>

      <footer className={styles.footer}>
        <p>Feito com ❤️ por desenvolvedores iniciantes</p>
        <span>© 2025 DevNetwork</span>
      </footer>
    </div>
  );
}
