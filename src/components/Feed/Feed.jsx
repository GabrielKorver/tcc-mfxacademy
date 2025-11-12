import { useState, useEffect } from "react";
import Style from "../Feed/Feed.module.css";
import { IoTimeOutline } from "react-icons/io5";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { IoChatboxEllipsesOutline } from "react-icons/io5";

export const Feed = () => {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [perguntas, setPerguntas] = useState([]);

  const listaPergutas = async () => {
    try {
      const response = await fetch("http://127.0.0.1:3000/perguntas/get");
      const data = await response.json();
      data.reverse();
      setPerguntas(data);
    } catch (error) {
      console.error("Erro ao buscar perguntas:", error);
    }
  };

  useEffect(() => {
    listaPergutas();
  }, []);

  const toggleLike = () => {
    if (liked) {
      setLikes(likes - 1);
    } else {
      setLikes(likes + 1);
    }
    setLiked(!liked);
  };

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
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
        <span>
          <IoTimeOutline /> {pergunta.data_criacao}
        </span>
      </div>

      <div className={Style.containerPergunta}>
        <p>
          Pergunta: <strong>{pergunta.titulo}</strong>
        </p>
        <p>
          Descrição da dúvida <strong>{pergunta.descricao}</strong>
        </p>
        <div className={Style.containerRelacionados}>
          <strong>Relacionado</strong>
          <div className={Style.containerRelacionadosBox}>
            <span>{pergunta.assunto_nome}</span>
          </div>
        </div>
      </div>

      <div className={Style.containerLike}>
        <button onClick={toggleLike} className={Style.actionBtn}>
          {liked ? (
            <FaHeart className={Style.iconLiked} />
          ) : (
            <FaRegHeart className={Style.icon} />
          )}
          <span>{likes}</span>
        </button>

        <button onClick={toggleVisibility} className={Style.actionBtn}>
          <IoChatboxEllipsesOutline className={Style.icon} />
          <span>Comentar</span>
        </button>
      </div>

      {isVisible && (
        <div className={Style.modal}>
          <textarea></textarea>
          <div className={Style.modalBtn}>
            <button onClick={toggleVisibility} className={Style.actionBtn}>
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
