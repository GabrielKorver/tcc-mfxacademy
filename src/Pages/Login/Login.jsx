import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import styles from "./Login.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);

  const logar = async () => {
    try {
      const URL = "http://127.0.0.1:3000/users/login";

      const response = await fetch(URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, senha }),
      });

      const data = await response.json();

      if (!email || !senha) {
        toast.error(data.message);
        return;
      }

      if (!response.ok) {
        toast.error(data.message || "Credenciais inválidas!");
        return;
      }

      localStorage.setItem("usuario", JSON.stringify(data.user));
      toast.success("Login realizado com sucesso!");

      setTimeout(() => {
        window.location.href = "/home";
      }, 2000);
    } catch {
      toast.error("Erro ao conectar com o servidor.");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        {/* <h1 className={styles.title}>DevNetwork</h1> */}
        <div className={styles.logo}>
          <img src="src/assets/novo_logo.png" alt="DevNetwork Logo" />
          <span>DevNetwork</span>
        </div>

        {/* EMAIL */}
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          placeholder="Digite seu email"
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* SENHA */}
        <label htmlFor="senha">Senha</label>
        <div className={styles.senhaWrapper}>
          <input
            type={mostrarSenha ? "text" : "password"}
            id="senha"
            placeholder="Digite sua senha"
            onChange={(e) => setSenha(e.target.value)}
          />

          <span
            className={styles.toggleSenha}
            onClick={() => setMostrarSenha(!mostrarSenha)}
          >
            {mostrarSenha ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
          </span>
        </div>

        <a className={styles.linkLeft} href="/recuperar">
          Esqueceu a senha?
        </a>

        <button className={styles.buttonLogin} onClick={logar}>
          Logar
        </button>

        <p className={styles.options}>
          <a href="/cadastro">Novo aqui? Cadastre-se</a>
        </p>
      </div>

      <ToastContainer position="top-right" autoClose={1500} theme="colored" />
    </div>
  );
};

export default Login;
