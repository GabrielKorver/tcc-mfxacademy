import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import Style from "./Login.module.css";
import devImage from "../../assets/img.login2.jpg";
import imgLogo from "../../assets/img_logo2.png";
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
      console.log(data)

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
    } catch (error) {
      toast.error("Erro ao conectar com o servidor.");
      console.error(error);
    }
  };

  return (
    <div className={Style.container}>
      <div className={Style.container_image}>
        <img src={devImage} alt="img.login.2" />
      </div>

      <div className={Style.container_login}>
        <div className={Style.container_box}>
          <div className={Style.container_logo}>
            <img className={Style.imgLogo} src={imgLogo} alt="Logo Dev Network" />
            <h1 className={Style.title}>Dev Network</h1>
          </div>
          <p className={Style.subtitle}>
            Entre para a maior comunidade para devs!!
          </p>

          <label htmlFor="email">Nome</label>
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            id="nome"
            placeholder="Digite seu email"
            className={Style.inputPadrao}
          />

          {/* Input Senha */}
          <label htmlFor="senha">Senha</label>
          <div className={Style.inputSenha}>
            <input
              type={mostrarSenha ? "text" : "password"}
              onChange={(e) => setSenha(e.target.value)}
              id="senha"
              placeholder="Digite sua senha"
              className={Style.inputPadrao}
            />
            <span
              className={Style.toggleSenha}
              onClick={() => setMostrarSenha(!mostrarSenha)}
            >
              {mostrarSenha ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
            </span>
          </div>

          <a href="/recuperar">Esqueceu a Senha?</a>

          <button onClick={logar}>Logar</button>

          <p className={Style.options}>
            <a href="/cadastro">Novo aqui? Cadastre-se</a>
          </p>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
};

export default Login;
