import { useState } from "react";
import Style from "../Feed/Feed.module.css";
import { IoTimeOutline } from "react-icons/io5";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { IoChatboxEllipsesOutline } from "react-icons/io5";

export const Feed = () => {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

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

  return (
    <div className={Style.container}>
      <div className={Style.box}>
        <img
          src="https://robohash.org/e247115709924ae6b6d095cc7af55336?set=set4&bgset=bg2&size=400x400"
          alt="avatar"
          style={{ width: "30px", height: "30px", borderRadius: "50%" }}
        />
        <p>
          <strong>Nome API</strong>
        </p>
        <span>
          <IoTimeOutline /> 2 horas atrás
        </span>
      </div>

      <div className={Style.containerPergunta}>
        <p>
          Pergunta: <strong>Pergunta da API . . .</strong>
        </p>
        <p>
          Descrição da dúvida <strong>Vem da API</strong>
        </p>
        <div className={Style.containerRelacionados}>
          <p>Relacionado</p>
          <div className={Style.containerRelacionadosBox}>
            <span>JavaScript</span>
            <span>React</span>
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
      {/* ABRIR MODAL E FECHAR*/}
      {isVisible && (
        <div className={Style.modal}>
          <textarea></textarea>
          <div className={Style.modalBtn}>
            <button>Cancelar</button>
            <button>Postar</button>
          </div>
        </div>
      )}
    </div>
  );
};
