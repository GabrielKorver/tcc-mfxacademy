import styles from "../LandingPage/LandingPage.module.css";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

export default function LandingPage() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerContainer}>
            <div className={styles.logo}>
            <img src="src/assets/novo_logo.png" alt="DevNetwork Logo" />
            <span>DevNetwork</span>
          </div>

          <nav className={styles.menu}>
            <a href="#projeto">Sobre o Projeto</a>
            <a href="#criadores">Sobre os Criadores</a>
            <a href="/Login" className={styles.loginBtn}>
              Ir para Login
            </a>
          </nav>
        </div>
      </header>

      <section id="projeto" className={styles.hero}>
        <h1>Bem-vindo ao Devnetwork</h1>
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
        </div>

        <div className={styles.tecnologias}>
          <h2>Tecnologias Utilizadas no Projeto</h2>
          <p>
            Este projeto foi desenvolvido utilizando um conjunto de tecnologias
            modernas que garantem desempenho, organização e uma ótima
            experiência para o usuário.
            <p>
              A seguir, apresentamos as principais ferramentas adotadas durante
              o desenvolvimento:{" "}
            </p>
          </p>

          <p>
            🌐 HTML5 Base da estrutura da aplicação, garantindo acessibilidade e
            semântica.
          </p>
          <p>
            📦 JavaScript (ES6+) Linguagem utilizada para toda a lógica da
            aplicação, com recursos modernos como hooks, import/export e arrow
            functions.
          </p>

          <p>
            ⚛️ React.js Framework JavaScript responsável pela construção da
            interface. Permite criar componentes reutilizáveis, garantindo
            velocidade e modularidade.
          </p>
          <p>
            🧩 Vite Ferramenta de build extremamente rápida que facilita o
            desenvolvimento com React. Possui recarregamento instantâneo e uma
            performance superior ao Create React App.
            <p>
              🎨 CSS Modules Utilizado para estilizar os componentes com
              isolamento de escopo. Evita conflitos de classe e deixa o código
              mais limpo e organizado.
            </p>
            <p>
              🖼️ Lucide Icons Biblioteca de ícones leves, modernos e altamente
              compatíveis com React. Usada para exibir ícones como Github,
              Linkedin e Mail.
            </p>
            <p>
              🧪 Node.js & npm Usados para gerenciar dependências e executar
              ferramentas de desenvolvimento.
            </p>
          </p>
        </div>

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
              <FaGithub size={20} />
              <FaLinkedin size={20} />
              <FaEnvelope size={20} />
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
        <span>© 2025 DevNetwork</span>
      </footer>
    </div>
  );
}
