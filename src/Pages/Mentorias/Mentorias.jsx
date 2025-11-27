import { FaTrash } from "react-icons/fa";
import { useEffect, useState } from "react";
import styles from "./Mentorias.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Mentorias() {
  const [listaAgendamentos, setListaAgendamentos] = useState([]);
  const [paginaAtual, setPaginaAtual] = useState(1);

  const [showModal, setShowModal] = useState(false);
  const [agendamentoToDelete, setAgendamentoToDelete] = useState(null);

  const itensPorPagina = 10;

  const getAgendamentos = async () => {
    try {
      const url = "http://127.0.0.1:3000/agendamentos/get";
      const response = await fetch(url);
      const data = await response.json();
      setListaAgendamentos(data);
    } catch {
      toast.error("Erro ao carregar agendamentos.");
    }
  };

  useEffect(() => {
    getAgendamentos();
  }, []);

  // Abrir modal
  function openModal(id) {
    setAgendamentoToDelete(id);
    setShowModal(true);
  }

  // Fechar modal
  function closeModal() {
    setAgendamentoToDelete(null);
    setShowModal(false);
  }

  // Confirmar exclusão
  const confirmDelete = async () => {
    try {
      const url = `http://127.0.0.1:3000/agendamentos/delete/${agendamentoToDelete}`;
      await fetch(url, { method: "DELETE" });

      toast.success("Agendamento deletado com sucesso!");

      setListaAgendamentos((prev) =>
        prev.filter((item) => item.id !== agendamentoToDelete)
      );
    } catch {
      toast.error("Erro ao deletar agendamento.");
    }

    closeModal();
  };

  // Paginação
  const indexInicial = (paginaAtual - 1) * itensPorPagina;
  const indexFinal = indexInicial + itensPorPagina;

  const agendamentosPagina = listaAgendamentos.slice(indexInicial, indexFinal);

  const totalPaginas = Math.ceil(listaAgendamentos.length / itensPorPagina);

  return (
    <div className={styles.container}>
      <h1>Gestão de Mentorias</h1>
      <div>
        <p>Lista de Agendamentos</p>

        <table className={styles.tabelaUsuarios}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Data Agendamento</th>
              <th>Data criação</th>
              <th>Ações</th>
            </tr>
          </thead>

          <tbody>
            {agendamentosPagina.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.nome}</td>
                <td>{new Date(user.data_agendamento).toLocaleString("pt-BR")}</td>
                <td>{new Date(user.data_criacao).toLocaleDateString("pt-BR")}</td>
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

        {/* Paginação */}
        {listaAgendamentos.length > itensPorPagina && (
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
            <p>Deseja realmente deletar este agendamento?</p>

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
      <ToastContainer position="top-right" autoClose={1500} theme="colored" />
    </div>
  );
}
