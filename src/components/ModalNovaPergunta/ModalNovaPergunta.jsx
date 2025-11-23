import { useState, useEffect } from "react";
import Style from "./ModalNovaPergunta.module.css";
import { TfiClose } from "react-icons/tfi";
import { ToastContainer, toast } from "react-toastify";

function ModalNovaPergunta({ onClose }) {
  const [assuntos, setAssuntos] = useState([]);
  const [titulo, setTitulo] = useState("")
  const [pergunta, setPergunta] = useState("")
  const [assuntoSelecionado, setAssuntoSelecionado] = useState("");

  const usuarioId = JSON.parse(localStorage.getItem("usuario")).id;


  // Função para buscar os assuntos
  const assuntoPerguta = async () => {
    try {
      const URL = "http://127.0.0.1:3000/assuntos/get";
      const response = await fetch(URL);
      const dados = await response.json();

      setAssuntos(dados); // Salva no estado
    } catch (error) {
      console.log("Erro ao buscar os assuntos:", error);
    }
  };

  // useEffect para carregar assim que o modal abrir
  useEffect(function () {
    assuntoPerguta();
  }, []);

  const criarPergunta = async () => {
    const url = "http://127.0.0.1:3000/perguntas/post";

    // Validações básicas
    if (!titulo.trim()) {
      return toast.error("Erro: título é obrigatório!");
    }

    if (!pergunta.trim()) {
      return toast.error("Erro: descrição é obrigatória!");
    }

    if (!usuarioId) {
      return toast.error("Erro: usuário não encontrado faça o logoff!");
    }

    if (!assuntoSelecionado) {
      return toast.error("Erro: selecione uma tecnologia!");
    }

    const data = {
      titulo: titulo,
      pergunta: pergunta,
      user_id: usuarioId,
      assunto_id: Number(assuntoSelecionado),
    };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        toast.error("Erro na resposta do servidor:", response.status);
        return;
      }

      const resultado = await response.json();
      toast.success("Pergunta criada com sucesso:", resultado);

      setTimeout(() => {
        window.location.reload(); // Recarrega a página após o sucesso
        onClose(); // Fecha o modal após o sucesso
      }, 2000);


    } catch (error) {
      toast.error("Erro ao criar pergunta:", error);
    }
  };


  return (
    <div className={Style.overlay}>
      <div className={Style.modal}>
        <div className={Style.closeModal}>
          <h2>Nova Pergunta</h2>
          <span onClick={onClose}>
            <TfiClose />
          </span>
        </div>

        <div className={Style.pergunta}>
          <p><strong>Título da pergunta *</strong></p>
          <input
            onChange={(e) => setTitulo(e.target.value)}
            type="text"
            id="pergunta"
            placeholder="Ex: Como implementar autenticação no React"
          />
        </div>

        <div className={Style.pergunta}>
          <p><strong>Descrição da Pergunta *</strong></p>
          <textarea
            onChange={(e) => setPergunta(e.target.value)}
            id="descricao"
            placeholder="Ex: Descreva sua dúvida em detalhes..."
          ></textarea>
        </div>

        <div className={Style.pergunta}>
          <p>
            <strong className={Style.relacionado}>
              Tecnologia relacionada *
            </strong>
          </p>

          <div className={Style.tecnologias}>
            <select onChange={(e) => setAssuntoSelecionado(e.target.value)}>
              <option value="">Selecione a tecnologia</option>
              {assuntos.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.nome}
                </option>
              ))}
            </select>

          </div>
        </div>

        <button onClick={criarPergunta} className={Style.publicarButton}>Publicar Pergunta</button>
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
}

export default ModalNovaPergunta;
