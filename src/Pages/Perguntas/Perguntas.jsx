import { FaTrash } from "react-icons/fa";
import { useEffect, useState } from "react";
import styles from "./Perguntas.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Perguntas() {
  const [listaPerguntas, setListaPerguntas] = useState([]);
  const [paginaAtual, setPaginaAtual] = useState(1);

  const [showModal, setShowModal] = useState(false);
  const [perguntaToDelete, setPerguntaToDelete] = useState(null);

  const itensPorPagina = 10;

  const getPerguntas = async () => {
    try {
      const url = "http://127.0.0.1:3000/perguntas/get";
      const response = await fetch(url);
      const data = await response.json();
      setListaPerguntas(data);
    } catch {
      toast.error("Erro ao carregar perguntas.");
    }
  };

  useEffect(() => {
    getPerguntas();
  }, []);

  // Abrir modal
  function openModal(id) {
    setPerguntaToDelete(id);
    setShowModal(true);
  }

  // Fechar modal
  function closeModal() {
    setPerguntaToDelete(null);
    setShowModal(false);
  }

  // Confirmar exclusão
  const confirmDelete = async () => {
    try {
      const url = `http://127.0.0.1:3000/perguntas/delete/${perguntaToDelete}`;
      await fetch(url, { method: "DELETE" });

      toast.success("Pergunta deletada com sucesso!");

      // Remove da lista
      setListaPerguntas((prev) =>
        prev.filter((p) => p.id !== perguntaToDelete)
      );
    } catch {
      toast.error("Erro ao deletar pergunta.");
    }

    closeModal();
  };

  // Paginação
  const indexInicial = (paginaAtual - 1) * itensPorPagina;
  const indexFinal = indexInicial + itensPorPagina;

  const perguntasPagina = listaPerguntas.slice(indexInicial, indexFinal);

  const totalPaginas = Math.ceil(listaPerguntas.length / itensPorPagina);

  return (
    <div className={styles.container}>
      <h1>Gestão de Perguntas</h1>
      <div>
        <p>Lista de Perguntas</p>

        <table className={styles.tabelaUsuarios}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Pergunta</th>
              <th>Data criação</th>
              <th>Ações</th>
            </tr>
          </thead>

          <tbody>
            {perguntasPagina.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.user_name}</td>
                <td>{user.titulo}</td>
                <td>
                  {new Date(user.data_criacao).toLocaleDateString("pt-BR")}
                </td>
                <td>
                  <button
                    className={styles.botaoDelete}
                    onClick={() => openModal(user.id)}
                  >
                    <FaTrash /> Deletar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* PAGINAÇÃO */}
        {listaPerguntas.length > itensPorPagina && (
          <div className={styles.paginacao}>
            <button
              onClick={() => setPaginaAtual((prev) => Math.max(prev - 1, 1))}
              disabled={paginaAtual === 1}
            >
              ⬅ Anterior
            </button>

            <span>
              Página {paginaAtual} de {totalPaginas}
            </span>

            <button
              onClick={() =>
                setPaginaAtual((prev) => Math.min(prev + 1, totalPaginas))
              }
              disabled={paginaAtual === totalPaginas}
            >
              Próxima ➡
            </button>
          </div>
        )}
      </div>

      {/* ===================== MODAL ===================== */}
      {showModal && (
        <div className={styles.modalFundo}>
          <div className={styles.modal}>
            <h3>Confirmação</h3>
            <p>Deseja realmente deletar esta pergunta?</p>

            <div className={styles.modalBotoes}>
              <button onClick={confirmDelete} className={styles.sim}>
                Sim
              </button>

              <button onClick={closeModal} className={styles.cancelar}>
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
      {/* ================================================= */}

      {/* TOASTIFY */}
      <ToastContainer
        position="top-right"
        autoClose={1500}
        theme="colored"
      />
    </div>
  );
}
