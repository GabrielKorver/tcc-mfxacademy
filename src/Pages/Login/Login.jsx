import { useState } from "react";
import Style from "./Login.module.css";
import devImage from "../../assets/img.login2.jpg";

const Login = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const logar = () => {
    if (email === "mayara@dev.com" && senha === "123456") {
      alert("Logado com sucesso!");
      window.location.href = "/home";
    } else {
      alert("Email ou senha incorretos!");
    }
  };

  return (
    <div className={Style.container}>
      <div className={Style.container_image}>
        <img src={devImage} alt="img.login.2" />
      </div>

      <div className={Style.container_login}>
        <div className={Style.container_box}>
          <h1 className={Style.title}>Dev Network</h1>
          <p className={Style.subtitle}>
            Entre para a maior comunidade para devs!!
          </p>

          <label htmlFor="nome">Nome</label>
          <input
            type="text"
            onChange={(e) => setEmail(e.target.value)}
            id="nome"
            placeholder="Digite seu nome"
          />

          <label htmlFor="senha">Senha</label>
          <input
            type="password"
            onChange={(e) => setSenha(e.target.value)}
            id="senha"
            placeholder="Digite sua senha"
          />
          <a href="/recuperar">Esqueceu a Senha?</a>

          <button onClick={logar}>Logar</button>

          <p className={Style.options}>
            <a href="/cadastro">Novo aqui? Cadastre-se</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
