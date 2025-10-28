import React, { useState } from "react";
import Style from "./ChatModal.module.css";

const ModalChat = () => {
  const [isOpen, setIsOpen] = useState(false);

  function toggleModal() {
    setIsOpen(!isOpen);
  }

  return (
    <>
      {/* Chat Modal */}
      {isOpen && (
        <div className={Style.chatModal}>
          <div className={Style.chatHeader}>
            <span>Chat</span>
            <button onClick={toggleModal} className={Style.closeButton}>
              ×
            </button>
          </div>

          <div className={Style.chatBody}>
            <div className={Style.friendsList}>
              <h2>Amigos</h2>
              <p>Gabriel</p>
              <p>Dyego</p>
              <p>Jhonatan</p>
            </div>

            <div className={Style.chatMessages}>
              <div className={Style.messageLeft}>
                Olá! Como posso te ajudar?
              </div>
              <div className={Style.messageRight}>Oi! Tudo bem?</div>
            </div>
          </div>

          <div className={Style.chatFooter}>
            <input type="text" placeholder="Digite uma mensagem..." />
            <button>➤</button>
          </div>
        </div>
      )}

      {/* Botão flutuante */}
      <button className={Style.floatingButton} onClick={toggleModal}>
        💬
      </button>
    </>
  );
};

export default ModalChat;
