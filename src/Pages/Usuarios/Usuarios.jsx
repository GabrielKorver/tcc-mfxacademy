import { FaTrash } from "react-icons/fa";
import styles from "./Usuarios.module.css";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

export default function Usuarios() {
  const [listaUsuarios, setListaUsuarios] = useState([]);
  const [paginaAtual, setPaginaAtual] = useState(1);

  const [showModal, setShowModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  const itensPorPagina = 10;

  const getUsers = async () => {
    try {
      const url = "http://127.0.0.1:3000/users/get";
      const response = await fetch(url);
      const data = await response.json();
      setListaUsuarios(data);
    } catch {
      toast.error("Erro ao carregar usuários.");
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  // Abre o modal e guarda o ID do usuário
  function openModal(id) {
    setShowModal(true);
    setUserToDelete(id);
  }

  // Fecha o modal sem deletar
  function closeModal() {
    setShowModal(false);
    setUserToDelete(null);
  }

  // Confirmação final de exclusão
  const confirmDelete = async () => {
    try {
      const url = `http://127.0.0.1:3000/users/delete/${userToDelete}`;
      const response = await fetch(url, { method: "DELETE" });
      await response.json();

      setListaUsuarios((prev) => prev.filter((u) => u.id !== userToDelete));

      toast.success("Usuário deletado com sucesso!");
    } catch {
      toast.error("Erro ao deletar o usuário.");
    }

    closeModal();
  };

  // ----- Paginação -----
  const indexInicial = (paginaAtual - 1) * itensPorPagina;
  const indexFinal = indexInicial + itensPorPagina;

  const usuariosPagina = listaUsuarios.slice(indexInicial, indexFinal);

  const totalPaginas = Math.ceil(listaUsuarios.length / itensPorPagina);

  return (
    <div className={styles.container}>
      <h1>Gestão de Usuários</h1>

      <div>
        <p>Lista de usuários</p>

        <table className={styles.tabelaUsuarios}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>E-mail</th>
              <th>Data criação</th>
              <th>Ações</th>
            </tr>
          </thead>

          <tbody>
            {usuariosPagina.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.nome}</td>
                <td>{user.email}</td>
                <td>
                  {new Date(user.data_criacao).toLocaleDateString("pt-BR")}
                </td>
                <td>
                  <button
                    onClick={() => openModal(user.id)}
                    className={styles.botaoDelete}
                  >
                    <FaTrash /> Deletar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* PAGINAÇÃO */}
        {listaUsuarios.length > itensPorPagina && (
          <div className={styles.paginacao}>
            <button
              onClick={() =>
                setPaginaAtual((prev) => Math.max(prev - 1, 1))
              }
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

      <ToastContainer position="top-right" autoClose={1500} theme="colored" />

      {/* ===================== MODAL ===================== */}
      {showModal && (
        <div className={styles.modalFundo}>
          <div className={styles.modal}>
            <h3>Confirmar exclusão</h3>
            <p>Deseja realmente deletar este usuário?</p>

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
    </div>
  );
}
