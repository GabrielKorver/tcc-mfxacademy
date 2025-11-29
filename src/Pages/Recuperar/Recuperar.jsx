import { useState } from "react";
import Style from "../Recuperar/Recuperar.module.css";

const Recuperar = () => {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [tipoMsg, setTipoMsg] = useState("");
  const [loading, setLoading] = useState(false); // 🔁 novo estado

  const esqueceuSenha = async () => {
    setMsg("");
    setTipoMsg("");
    setLoading(true); // inicia carregamento

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

    setLoading(false); // finaliza carregamento
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

        <button onClick={esqueceuSenha}>Recuperar senha</button>

        {loading && (
          <p className={Style.loading}>
            🔁 Enviando...
          </p>
        )}

        {!loading && msg && (
          <p className={tipoMsg === "sucesso" ? Style.sucesso : Style.erro}>
            {tipoMsg === "erro" ? "❌ " : ""}{msg}
          </p>
        )}
      </div>
    </div>
  );
};

export default Recuperar;
