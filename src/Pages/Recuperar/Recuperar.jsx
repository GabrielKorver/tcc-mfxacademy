import { useState } from "react";
import Style from "../Recuperar/Recuperar.module.css";

const Recuperar = () => {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [tipoMsg, setTipoMsg] = useState("");

  const esqueceuSenha = async () => {
    setMsg("");
    setTipoMsg("");

    try {
      const response = await fetch("http://127.0.0.1:3000/mail/recuperar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setMsg(data.message);
        setTipoMsg("sucesso");
      } else {
        setMsg(data.message || "Erro ao recuperar senha.");
        setTipoMsg("erro");
      }
    } catch (err) {
      console.error(err);
      setMsg("Erro ao conectar ao servidor.");
      setTipoMsg("erro");
    }
  };

  return (
    <div className={Style.container}>
      <div className={Style.containerRecuperar}>
        <label>Email</label>
        <input
          type="text"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Digite seu email"
        />

        {/* <label>Palavra passe</label>
        <input
          type="password"
          onChange={(e) => setPalavra(e.target.value)}
          placeholder="Digite sua palavra passe"
        /> */}

        <button onClick={esqueceuSenha}>Recuperar senha</button>

        {msg && (
          <p className={tipoMsg === "sucesso" ? Style.sucesso : Style.erro}>
            {msg}
          </p>
        )}
      </div>
    </div>
  );
};

export default Recuperar;
