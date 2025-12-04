import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import Style from "./ChatModal.module.css";

const socket = io("http://localhost:3001");

const ModalChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [connectedUsers, setConnectedUsers] = useState([]);
  const messagesEndRef = useRef(null);

  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const username = usuario?.nome || "Usuário";

  function toggleModal() {
    setIsOpen(!isOpen);
  }

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  useEffect(() => {
    socket.emit("set_username", username);

    // Histórico de mensagens
    socket.on("chat_history", (history) => {
      setMessages(history.map(msg => ({
        text: msg.mensagem,
        author: msg.usuario,
        data_envio: msg.data_envio
      })));
    });

    // Novas mensagens
    socket.on("receive_message", (msg) => {
      setMessages(prev => [...prev, msg]);
    });

    // Usuários conectados
    socket.on("connected_users", (users) => {
      setConnectedUsers(users);
    });

    return () => {
      socket.off("chat_history");
      socket.off("receive_message");
      socket.off("connected_users");
    };
  }, [username]);

  const sendMessage = () => {
    const text = input.trim();
    if (text) {
      socket.emit("message", text);
      setInput("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <>
      {isOpen && (
        <div className={Style.chatModal}>
          <div className={Style.chatHeader}>
            <span>Chat</span>
            <button onClick={toggleModal} className={Style.closeButton}>×</button>
          </div>

          <div className={Style.chatBody}>
            <div className={Style.friendsList}>
              <h2>Conectados</h2>
              {connectedUsers.map((user, index) => (
                <p key={index} className={Style.userItem}>
                  <span className={Style.greenDot}></span>
                  {user}
                </p>
              ))}
            </div>

            <div className={Style.chatMessages}>
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={
                    msg.author === username
                      ? Style.messageRight
                      : Style.messageLeft
                  }
                >
                  <strong>{msg.author}: </strong> {msg.text}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </div>

          <div className={Style.chatFooter}>
            <input
              className={Style.input}
              type="text"
              placeholder="Digite uma mensagem..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button onClick={sendMessage}>➤</button>
          </div>
        </div>
      )}

      <button className={Style.floatingButton} onClick={toggleModal}>💬</button>
    </>
  );
};

export default ModalChat;
