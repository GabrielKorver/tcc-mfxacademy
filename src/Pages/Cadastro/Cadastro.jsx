import { useState } from "react";
import Style from "../cadastro/Cadastro.module.css";
import { ToastContainer, toast } from "react-toastify";

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
  const [avatar, setAvatar] = useState("");
  const [bio, setBio] = useState("");
  const [habilidades, setHabilidades] = useState("");

  const criarUsuario = async () => {
    const url = "http://127.0.0.1:3000/users/post";

    const data = {
      nome: nome,
      email: email,
      senha: senha,
      avatar_url: avatar,
      biografia: bio,
      habilidades: habilidades,
    };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const resultado = await response.json();

      if (!response.ok) {
        return toast.error(resultado.error || "Erro ao criar usuário!");
      }

      toast.success(resultado.message);

      setTimeout(() => {
        window.location.href = "/Login";
      }, 2000);

    } catch (error) {
      toast.error("Erro ao criar usuário.");
      console.error("Erro ao criar usuário:", error);
    }
  };

  return (
    <div className={Style.container_cadastro}>
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

      <h2>Escolha seu avatar</h2>

      <div className={Style.avatar_grid}>
        {avatars.map((url, index) => (
          <img
            key={index}
            src={url}
            alt={`Avatar ${index + 1}`}
            className={`${Style.avatar} ${avatar === url ? Style.avatar_selected : ""}`}
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

      <label htmlFor="bio">Biografia</label>
      <input
        type="text"
        id="bio"
        placeholder="Ex: Desenvolvedor full-stack há 5 anos"
        value={bio}
        onChange={(e) => setBio(e.target.value)}
      />

      <label htmlFor="skills">Habilidades</label>
      <input
        type="text"
        id="skills"
        placeholder="Ex: JavaScript, React, Node"
        value={habilidades}
        onChange={(e) => setHabilidades(e.target.value)}
      />

      <button onClick={criarUsuario} className={Style.btn_cadastro}>
        Cadastrar
      </button>

      <ToastContainer position="top-right" autoClose={1500} theme="colored" />
    </div>
  );
};

export default Cadastro;
