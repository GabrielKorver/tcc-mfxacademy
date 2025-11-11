import Style from "./ModalNovaPergunta.module.css";
import { TfiClose } from "react-icons/tfi";
import { TiPlus } from "react-icons/ti";

function ModalNovaPergunta({ onClose }) {
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
          <p>
            <strong>Título da pergunta *</strong>
          </p>
          <input
            type="text"
            id="pergunta"
            placeholder="Ex: Como implementar autenticação no React"
          />
        </div>
        <div className={Style.pergunta}>
          <p>
            <strong>Título da pergunta *</strong>
          </p>
          <textarea
            id="descricao"
            placeholder="Ex: Descreva sua dúvida em detalhes..."
          ></textarea>
        </div>
        <div className={Style.pergunta}>
          <p>
            <strong>Tecnologias relacionadas*</strong>
          </p>
          <div className={Style.tecnologias}>
            <input
              type="text"
              id="tecnologias"
              placeholder="Ex: React, Node.js, JavaScript"
            />
            <span>
              <TiPlus className={Style.icon} />
            </span>
          </div>
        </div>
        <button className={Style.publicarButton}>Publicar Pergunta</button>
      </div>
    </div>
  );
}

export default ModalNovaPergunta;
