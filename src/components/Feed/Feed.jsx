import { useState, useEffect } from "react";
import Style from "../Feed/Feed.module.css";
import { IoTimeOutline } from "react-icons/io5";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { IoChatboxEllipsesOutline } from "react-icons/io5";

export const Feed = () => {
  const [perguntas, setPerguntas] = useState([]);
  const [visibleCommentId, setVisibleCommentId] = useState(null);
  const [likedPerguntas, setLikedPerguntas] = useState({});
  const [likesCount, setLikesCount] = useState({});

  // 👉 Função para formatar data (DD-MM-YYYY)
  const formatarData = (dataISO) => {
    const data = new Date(dataISO);
    const dia = String(data.getDate()).padStart(2, "0");
    const mes = String(data.getMonth() + 1).padStart(2, "0");
    const ano = data.getFullYear();
    return `${dia}-${mes}-${ano}`;
  };

  const listaPergutas = async () => {
    try {
      const response = await fetch("http://127.0.0.1:3000/perguntas/get");
      const data = await response.json();

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
        <p>
          Pergunta: <strong>{pergunta.titulo}</strong>
        </p>
        <p>
          Descrição da dúvida: <strong>{pergunta.pergunta}</strong>
        </p>

        <div className={Style.containerRelacionados}>
          <strong>Relacionado</strong>
          <div className={Style.containerRelacionadosBox}>
            <span>{pergunta.assunto_nome}</span>
          </div>
        </div>
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
          onClick={() => toggleVisibility(pergunta.id)}
          className={Style.actionBtn}
        >
          <IoChatboxEllipsesOutline className={Style.icon} />
          <span>Comentar</span>
        </button>
      </div>

      {visibleCommentId === pergunta.id && (
        <div className={Style.modal}>
          <textarea></textarea>
          <div className={Style.modalBtn}>
            <button
              onClick={() => toggleVisibility(pergunta.id)}
              className={Style.actionBtn}
            >
              Cancelar
            </button>
            <button className={Style.actionBtn}>Postar</button>
          </div>
        </div>
      )}
    </div>
  );

  return <>{perguntas.map(renderPergunta)}</>;
};
