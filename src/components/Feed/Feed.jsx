import { useState, useEffect } from "react";
import Style from "../Feed/Feed.module.css";
import { IoTimeOutline } from "react-icons/io5";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { IoChatboxEllipsesOutline } from "react-icons/io5";
import { FiSearch } from "react-icons/fi";

export const Feed = () => {
  const [perguntas, setPerguntas] = useState([]);
  const [visibleCommentId, setVisibleCommentId] = useState(null);
  const [likedPerguntas, setLikedPerguntas] = useState({});
  const [likesCount, setLikesCount] = useState({});
  const [assuntos, setAssuntos] = useState([]);

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


  const listaPergutas = async () => {
    try {
      const response = await fetch("http://127.0.0.1:3000/perguntas/get");
      const data = await response.json();
      console.log(data)
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

    const filtrados = perguntas.filter(item =>
      item.titulo.toLowerCase().includes(termo) ||
      item.pergunta.toLowerCase().includes(termo) ||
      item.assunto_nome.toLowerCase().includes(termo)
    );

    setPerguntas(filtrados);
  };

  const getSelectCategory = async () => {
    const response = await fetch("http://127.0.0.1:3000/perguntas/get");
    const data = await response.json();

    const termo = document.querySelector("#SelectTech").value

    if (termo.trim() === "") {
      listaPergutas();
      return setPerguntas(data);
    }

    const filtrados = data.filter(item =>
      item.assunto_nome.includes(termo)
    );
    setPerguntas(filtrados);
  }


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
          <strong>
            Descrição da dúvida:
          </strong>
          <p>{pergunta.pergunta}</p>
        </div>

        <div className={Style.containerRelacionados}>
          <strong>Tema Relacionado:</strong>
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

  return <>
    <div className={Style.filtros}>

      <div className={Style.inputContainer}>
        <FiSearch className={Style.icon} />
        <input id="search" type="text" placeholder="Buscar perguntas..." onChange={getRealTime} />
      </div>

      <select onChange={getSelectCategory} name="Select tech" id="SelectTech">
        <option value="">Selecione a Tecnologia</option>
        {
          assuntos.map(item => (
            <option value={item.nome}>{item.nome}</option>
          ))
        }
      </select>

    </div>
    {perguntas.map(renderPergunta)}
  </>;
};
