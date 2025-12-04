import { useState, useEffect } from "react";
import Style from "../Feed/Feed.module.css";
import { IoTimeOutline } from "react-icons/io5";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { IoChatboxEllipsesOutline } from "react-icons/io5";
import { FiSearch } from "react-icons/fi";
import { ToastContainer, toast } from "react-toastify";


export const Feed = () => {
  const [perguntas, setPerguntas] = useState([]);
  const [visibleCommentId, setVisibleCommentId] = useState(null);
  const [likedPerguntas, setLikedPerguntas] = useState({});
  const [likesCount, setLikesCount] = useState({});
  const [assuntos, setAssuntos] = useState([]);
  const [respostas, setRespostas] = useState([]);
  const [textoResposta, setTextoResposta] = useState("");
  const [perguntaSelecionada, setPerguntaSelecionada] = useState(null);
  const usuarioId = JSON.parse(localStorage.getItem("usuario")).id;


  // 👉 Função para formatar data (DD-MM-YYYY)
  const formatarData = (dataISO) => {
    const data = new Date(dataISO);
    const dia = String(data.getDate()).padStart(2, "0");
    const mes = String(data.getMonth() + 1).padStart(2, "0");
    const ano = data.getFullYear();
    return `${dia}-${mes}-${ano}`;
  };

  const assuntoPerguta = async () => {
    try {
      const URL = "http://127.0.0.1:3000/assuntos/get";
      const response = await fetch(URL);
      const dados = await response.json();
      console.log(dados);

      setAssuntos(dados);
    } catch (error) {
      console.log("Erro ao buscar os assuntos:", error);
    }
  };

  const listaResposta = async () => {
    try {
      const url = "http://127.0.0.1:3000/respostas/get";
      const response = await fetch(url);
      const data = await response.json();

      console.log("Respostas:", data);

      setRespostas(data);
    } catch (error) {
      console.log("Erro ao buscar respostas:", error);
    }
  };

  const criarRespostas = async () => {
    if (!textoResposta.trim()) {
      return toast.error("Digite uma resposta antes de enviar.");
    }

    if (textoResposta.length < 20) {
      return toast.error("Sua resposta deve ter no mínimo 20 caractéres.");
    }

    const url = "http://127.0.0.1:3000/respostas/post";

    const data = {
      usuario_id: usuarioId,
      pergunta_id: perguntaSelecionada,
      resposta: textoResposta
    };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });

      await response.json();

      toast.success("Resposta enviada com sucesso!");

      // recarrega respostas sem reload da página
      listaResposta();
      setTextoResposta("");
      setVisibleCommentId(null);

    } catch (error) {
      toast.error("Erro ao criar resposta.");
      console.log(error);
    }
  };


  const listaPergutas = async () => {
    try {
      const response = await fetch("http://127.0.0.1:3000/perguntas/get");
      const data = await response.json();
      console.log(data);
      const initialLikes = {};
      const initialLiked = {};
      data.forEach((p) => {
        initialLikes[p.id] = 0;
        initialLiked[p.id] = false;
      });

      setLikesCount(initialLikes);
      setLikedPerguntas(initialLiked);
      setPerguntas(data);
    } catch (error) {
      console.error("Erro ao buscar perguntas:", error);
    }
  };

  useEffect(() => {
    listaPergutas();
    assuntoPerguta();
    listaResposta();
  }, []);

  const toggleLike = (id) => {
    setLikedPerguntas((prevLiked) => ({
      ...prevLiked,
      [id]: !prevLiked[id],
    }));

    setLikesCount((prevLikes) => ({
      ...prevLikes,
      [id]: prevLikes[id] + (likedPerguntas[id] ? -1 : 1),
    }));
  };

  const toggleVisibility = (id) => {
    setVisibleCommentId((prevId) => (prevId === id ? null : id));
  };

  const getRealTime = () => {
    const termo = document.querySelector("#search").value.toLowerCase();

    if (termo.trim() === "") {
      listaPergutas();
      return setPerguntas(perguntas);
    }

    const filtrados = perguntas.filter(
      (item) =>
        item.user_name.toLowerCase().includes(termo) ||
        item.titulo.toLowerCase().includes(termo) ||
        item.pergunta.toLowerCase().includes(termo) ||
        item.assunto_nome.toLowerCase().includes(termo)
    );

    setPerguntas(filtrados);
  };

  const getSelectCategory = async () => {
    const response = await fetch("http://127.0.0.1:3000/perguntas/get");
    const data = await response.json();

    const termo = document.querySelector("#SelectTech").value;

    if (termo.trim() === "") {
      listaPergutas();
      return setPerguntas(data);
    }

    const filtrados = data.filter((item) => item.assunto_nome.includes(termo));
    setPerguntas(filtrados);
  };

  const renderPergunta = (pergunta) => (
    <div key={pergunta.id} className={Style.container}>
      <div className={Style.box}>
        <img
          src={pergunta.user_avatar}
          alt="avatar"
          style={{ width: "30px", height: "30px", borderRadius: "50%" }}
        />
        <p>
          <strong>{pergunta.user_name}</strong>
        </p>

        {/* 👉 AQUI A DATA JÁ ESTÁ FORMATADA */}
        <span>
          <IoTimeOutline /> {formatarData(pergunta.data_criacao)}
        </span>
      </div>

      <div className={Style.containerPergunta}>
        <div className={Style.titleRow}>
          <strong>Título da Pergunta:</strong>
          <p>{pergunta.titulo}</p>
        </div>
        <div className={Style.titleRow}>
          <strong>Descrição da dúvida:</strong>
          <p>{pergunta.pergunta}</p>
        </div>

        <div className={Style.containerRelacionados}>
          <strong>Tema Relacionado:</strong>
          <div className={Style.containerRelacionadosBox}>
            <span>{pergunta.assunto_nome}</span>
          </div>
        </div>
      </div>

      <div className={Style.respostas}>
        <details className={Style.detailsRespostas}>
          <summary>Ver respostas</summary>

          {respostas.filter(r => r.pergunta_id === pergunta.id).length === 0 ? (
            <p>Nenhuma resposta ainda...</p>
          ) : (
            respostas
              .filter(r => r.pergunta_id === pergunta.id)
              .map((resp) => (
                <div key={resp.id} className={Style.respostaItem}>

                  <div className={Style.usuario}>
                    <img
                      src={resp.user_avatar}
                      alt="avatar"
                      style={{ width: "30px", height: "30px", borderRadius: "50%" }}
                    />
                    <strong>{resp.user_name}</strong>
                    <span style={{ marginLeft: "10px" }}>
                      <IoTimeOutline /> {formatarData(resp.data_criacao)}
                    </span>
                  </div>

                  <div>
                    <p>{resp.resposta}</p>
                  </div>

                </div>
              ))
          )}

        </details>
      </div>


      <div className={Style.containerLike}>
        <button
          onClick={() => toggleLike(pergunta.id)}
          className={Style.actionBtn}
        >
          {likedPerguntas[pergunta.id] ? (
            <FaHeart className={Style.iconLiked} />
          ) : (
            <FaRegHeart className={Style.icon} />
          )}
          <span>{likesCount[pergunta.id]}</span>
        </button>

        <button
          onClick={() => {
            setPerguntaSelecionada(pergunta.id);
            toggleVisibility(pergunta.id);
          }}
          className={Style.actionBtn}
        >
          <IoChatboxEllipsesOutline className={Style.icon} />
          <span>Comentar</span>
        </button>
      </div>

      {visibleCommentId === pergunta.id && (
        <div className={Style.modal}>
          <textarea onChange={(e) => setTextoResposta(e.target.value)}></textarea>
          <div className={Style.modalBtn}>
            <button
              onClick={() => toggleVisibility(pergunta.id)}
              className={Style.actionBtn}
            >
              Cancelar
            </button>
            <button onClick={criarRespostas} className={Style.actionBtn}>Postar</button>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <>
      <div className={Style.filtros}>
        <div className={Style.inputContainer}>
          <FiSearch className={Style.icon} />
          <input
            className={Style.focus}
            id="search"
            type="text"
            placeholder="Buscar perguntas..."
            onChange={getRealTime}
          />
        </div>

        <select className={Style.focus} onChange={getSelectCategory} id="SelectTech">
          <option value="">Selecione a Tecnologia</option>
          {assuntos.map((item) => (
            <option value={item.nome}>{item.nome}</option>
          ))}
        </select>
      </div>
      {perguntas.map(renderPergunta)}

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
    </>
  );
};
