import React, { useState, useEffect } from "react";
import styles from "./Carroussel.module.css";

function Carroussel() {

  const cards = [
    {
      titulo: "HTML5",
      texto: "HTML5 é a versão moderna da linguagem de marcação HTML usada para estruturar conteúdo na web. Foi projetada para ser mais semântica, acessível e multimídia, além de oferecer APIs nativas para funcionalidades que antes exigiam plugins (como Flash). HTML5 padroniza elementos, atributos e comportamentos que facilitam criar sites e aplicações web responsivas e ricas.",
      imagem: "https://cdn-icons-png.flaticon.com/512/732/732212.png",
    },
    {
      titulo: "CSS3",
      texto: "CSS3 (Cascading Style Sheets Level 3) é a terceira versão da linguagem usada para estilizar páginas web. Ele permite controlar a aparência visual dos elementos HTML, incluindo cores, tamanhos, layouts, animações e muito mais. Com o CSS3, o desenvolvimento web se tornou mais moderno e flexível, trazendo diversos recursos avançados que antes só eram possíveis com imagens ou JavaScript.",
      imagem: "https://cdn-icons-png.flaticon.com/512/732/732190.png",
    },
    {
      titulo: "JavaScript",
      texto: "JavaScript é uma linguagem de programação amplamente utilizada para criar páginas web dinâmicas e interativas. Enquanto o HTML define a estrutura e o CSS define o estilo, o JavaScript é responsável pelo comportamento, permitindo que elementos da página respondam a ações do usuário, como cliques, movimentos do mouse, envio de formulários e muito mais.Criada inicialmente para rodar nos navegadores, a linguagem evoluiu e hoje também funciona no lado do servidor, principalmente com o ambiente Node.js, além de estar presente no desenvolvimento de aplicativos mobile, desktop, APIs e até IoT.",
      imagem: "https://cdn-icons-png.flaticon.com/512/5968/5968292.png",
    },

    {
      titulo: "React.js",
      texto: "React.js é uma biblioteca JavaScript de código aberto desenvolvida pelo Facebook para construir interfaces de usuário (UIs) de forma eficiente e declarativa. Ela permite criar componentes reutilizáveis que gerenciam seu próprio estado, facilitando a construção de aplicações web complexas e interativas. Com o React, os desenvolvedores podem criar UIs que se atualizam automaticamente quando os dados mudam, graças ao seu sistema de renderização baseado em um DOM virtual. React é amplamente adotado na indústria devido à sua performance, flexibilidade e grande ecossistema de ferramentas e bibliotecas complementares.",
      imagem: "https://cdn-icons-png.flaticon.com/512/1126/1126012.png",
    },

    {
      titulo: "Node.js",
      texto: "Node.js é um ambiente de execução de JavaScript no lado do servidor, baseado no motor V8 do Google Chrome. Ele permite que desenvolvedores utilizem JavaScript não apenas no navegador, mas também para criar aplicações de back-end, APIs, sistemas em tempo real e muito mais. Com o Node.js, é possível construir servidores rápidos, escaláveis e eficientes, aproveitando um modelo assíncrono e orientado a eventos, que permite lidar com múltiplas requisições ao mesmo tempo sem bloquear o processamento.",
      imagem: "https://cdn-icons-png.flaticon.com/512/919/919825.png",
    },

    {
      titulo: "Neon SQL",
      texto: "Neon é uma plataforma moderna de banco de dados baseada em PostgreSQL, totalmente na nuvem, criada para ser rápida, escalável e fácil de usar. Ela combina os recursos avançados do PostgreSQL com uma infraestrutura serverless, permitindo que o banco aumente ou diminua a capacidade automaticamente conforme a demanda. Neon é especialmente popular entre desenvolvedores que usam APIs, Node.js, Next.js, Vercel, serverless functions e aplicações modernas que exigem desempenho e simplicidade.",
      imagem: "https://cdn-icons-png.flaticon.com/512/5968/5968342.png",
    },

    {
      titulo: "Git",
      texto: "Git é um sistema de controle de versões distribuído que permite gerenciar e acompanhar alterações em projetos de software. Com ele, desenvolvedores podem trabalhar simultaneamente em diferentes partes do código, criar ramificações (branches), mesclar alterações e manter um histórico detalhado de todas as modificações. Git é essencial para colaboração em equipe, integração contínua e manutenção de projetos de qualquer tamanho. É amplamente utilizado junto com plataformas como GitHub, GitLab e Bitbucket.",
      imagem: "https://avatars.githubusercontent.com/u/18133?s=280&v=4",
    },


    {
      titulo: "GitHub",
      texto: "GitHub é uma plataforma de hospedagem de código-fonte baseada em Git, que facilita a colaboração entre desenvolvedores. Ele oferece ferramentas para versionamento, pull requests, issues, integração contínua e automação de workflows. É amplamente usado para projetos open source e também em empresas para gerenciar repositórios privados e públicos, além de permitir que equipes acompanhem o progresso do desenvolvimento de forma organizada.",
      imagem: "https://www.make.com/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2Fun655fb9wln6%2FappIcon-github%2F1cbc82833bde8e77a127b331eee21ba8%2Fgithub.png&w=3840&q=75",
    },


  ];

  const [index, setIndex] = useState(0);

  function anterior() {
    setIndex((prev) => (prev === 0 ? cards.length - 1 : prev - 1));
  }

  function proximo() {
    setIndex((prev) => (prev === cards.length - 1 ? 0 : prev + 1));
  }


  useEffect(() => {
    const intervalo = setInterval(() => {
      setIndex((prev) => (prev === cards.length - 1 ? 0 : prev + 1));
    }, 9000); // 9 segundos

    return () => clearInterval(intervalo);
  }, [cards.length]);

  return (
    <div className={styles.carrousel}>
      <div
        className={styles.faixa}
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {cards.map((card, i) => (
          <div className={styles.slide} key={i}>
            <div className={styles.card}>
              <img src={card.imagem} className={styles.cardImg} />
              <h3>{card.titulo}</h3>
              <p>{card.texto}</p>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.indicadores}>
        {cards.map((_, i) => (
          <button
            key={i}
            className={`${styles.indicador} ${index === i ? styles.ativo : ""}`}
            onClick={() => setIndex(i)}
          />
        ))}
      </div>

      <button className={`${styles.controle} ${styles.esquerda}`} onClick={anterior}>
        ◀
      </button>
      <button className={`${styles.controle} ${styles.direita}`} onClick={proximo}>
        ▶
      </button>
    </div>
  );
}

export default Carroussel;
