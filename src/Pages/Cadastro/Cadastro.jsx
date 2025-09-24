import React, { useState } from "react";
import Style from "../cadastro/Cadastro.module.css";

const avatars = [
  "https://avatar.iran.liara.run/public/27",
  "https://avatar.iran.liara.run/public/8",
  "https://avatar.iran.liara.run/public/37",
  "https://avatar.iran.liara.run/public/19",
  "https://avatar.iran.liara.run/public/46",
  "https://avatar.iran.liara.run/public/20",
  "https://avatar.iran.liara.run/public/74",
  "https://avatar.iran.liara.run/public/58",
  "https://avatar.iran.liara.run/public/96",
  "https://avatar.iran.liara.run/public/88",
  "https://avatar.iran.liara.run/public/56",
  "https://avatar.iran.liara.run/public/90",
];

const Cadastro = () => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [data, setData] = useState("");
  const [bio, setBio] = useState("");
  const [skills, setSkills] = useState("");
  const [avatar, setAvatar] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3001/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, email, senha, data, bio, skills, avatar }),
      });

      const dataRes = await response.json();
      console.log("Resposta do servidor:", dataRes);

      if (response.ok) {
        alert(dataRes.message);
      } else {
        alert("Erro: " + dataRes.error);
      }
    } catch (error) {
      console.error("Erro ao cadastrar:", error);
      alert("Erro de conexão com o servidor.");
    }
  }

  return (
    <form className={Style.container_cadastro} onSubmit={handleSubmit}>
      <h1>Cadastro</h1>

      <label htmlFor="nome">Nome</label>
      <input
        type="text"
        id="nome"
        placeholder="Digite seu nome"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
      />

      <label htmlFor="email">Email</label>
      <input
        type="email"
        id="email"
        placeholder="Digite seu email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <label htmlFor="senha">Senha</label>
      <input
        type="password"
        id="senha"
        placeholder="Digite sua senha"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
      />

      <label htmlFor="data">Data de aniversário</label>
      <input
        type="date"
        id="data"
        value={data}
        onChange={(e) => setData(e.target.value)}
      />

      <label htmlFor="bio">Biografia</label>
      <input
        type="text"
        id="bio"
        placeholder="Ex: Desenvolvedor full-stack a 05 anos"
        value={bio}
        onChange={(e) => setBio(e.target.value)}
      />

      <label htmlFor="skills">Skills</label>
      <input
        type="text"
        id="skills"
        placeholder="Digite suas skills ex: JavaScript | React | Node"
        value={skills}
        onChange={(e) => setSkills(e.target.value)}
      />

      <h2>Escolha seu avatar</h2>

      <div className={Style.avatar_grid}>
        {avatars.map((url, index) => (
          <img
            key={index}
            src={url}
            alt={`Avatar ${index + 1}`}
            className={`${Style.avatar} ${
              avatar === url ? Style.avatar_selected : ""
            }`}
            onClick={() => setAvatar(url)}
          />
        ))}
      </div>

      {avatar && (
        <p className={Style.avatar_msg}>
          Avatar selecionado:
          <img src={avatar} alt="Selecionado" />
        </p>
      )}

      <button className={Style.btn_cadastro} type="submit">
        Cadastrar
      </button>
    </form>
  );
};

export default Cadastro;
