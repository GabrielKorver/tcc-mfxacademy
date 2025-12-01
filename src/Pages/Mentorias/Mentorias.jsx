import { FaTrash } from "react-icons/fa";
import { AiFillEdit } from "react-icons/ai";
import { useEffect, useState } from "react";
import styles from "./Mentorias.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Mentorias() {
  const [listaAgendamentos, setListaAgendamentos] = useState([]);
  const [paginaAtual, setPaginaAtual] = useState(1);

  // Modal de Delete
  const [showModal, setShowModal] = useState(false);
  const [agendamentoToDelete, setAgendamentoToDelete] = useState(null);

  // Modal de Editar
  const [showEditModal, setShowEditModal] = useState(false);
  const [agendamentoToEdit, setAgendamentoToEdit] = useState({
    id: "",
    nome: "",
    data_agendamento: "",
    telefone: ""
  });

  const itensPorPagina = 10;

  // ------------------ FORMATAÇÃO DE DATA PARA O INPUT ------------------
  function formatarDataParaInput(data) {
    if (!data) return "";

    const d = new Date(data);

    // Ajuste do timezone
    const offset = d.getTimezoneOffset();
    const local = new Date(d.getTime() - offset * 60000);

    return local.toISOString().slice(0, 16); // yyyy-MM-ddTHH:mm
  }

  const getAgendamentos = async () => {
    try {
      const url = "http://127.0.0.1:3000/agendamentos/get";
      const response = await fetch(url);
      const data = await response.json();

      // Converte as datas para um formato que o JS entende
      const dataFormatada = data.map(item => {
        const agendamento = new Date(item.data_agendamento);
        const criacao = new Date(item.data_criacao);

        return {
          ...item,
          data_agendamento: agendamento.toLocaleString("pt-BR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit"
          }),
          data_criacao: criacao.toLocaleString("pt-BR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit"
          }),
        };
      });

      // Ordena do mais recente para o mais antigo
      dataFormatada.sort((a, b) => new Date(b.data_agendamento) - new Date(a.data_agendamento));

      setListaAgendamentos(dataFormatada);
    } catch {
      toast.error("Erro ao carregar agendamentos.");
    }
  };

  useEffect(() => {
    getAgendamentos();
  }, []);

  // ------------------ DELETE ------------------
  function openModal(id) {
    setAgendamentoToDelete(id);
    setShowModal(true);
  }

  function closeModal() {
    setAgendamentoToDelete(null);
    setShowModal(false);
  }

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

  // ------------------ EDITAR ------------------
  function openEditModal(user) {
    setAgendamentoToEdit({
      id: user.id,
      nome: user.nome,
      telefone: user.telefone,
      data_agendamento: formatarDataParaInput(user.data_agendamento),
    });

    setShowEditModal(true);
  }

  function closeEditModal() {
    setShowEditModal(false);
  }

  const confirmEdit = async () => {
    try {
      const url = `http://127.0.0.1:3000/agendamentos/put/${agendamentoToEdit.id}`;

      // Monta um objeto só com o que deve atualizar
      const body = {};

      if (agendamentoToEdit.nome.trim() !== "") {
        body.nome = agendamentoToEdit.nome;
      }

      if (agendamentoToEdit.telefone.trim() !== "") {
        body.telefone = agendamentoToEdit.telefone;
      }

      if (agendamentoToEdit.data_agendamento !== "") {
        // agendamentoToEdit.data_agendamento vem como "YYYY-MM-DDTHH:MM"
        const [datePart, timePart] = agendamentoToEdit.data_agendamento.split("T");
        body.data_agendamento = `${datePart} ${timePart}:00`; // "YYYY-MM-DD HH:MM:SS"
      }

      await fetch(url, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      toast.success("Agendamento atualizado!");

      setTimeout(() => {
        closeEditModal();
        getAgendamentos();
      }, 1500);

    } catch {
      toast.error("Erro ao editar.");
    }
  };


  // ------------------ PAGINAÇÃO ------------------
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
              <th>Telefone </th>
              <th>Ações</th>
            </tr>
          </thead>

          <tbody>
            {agendamentosPagina.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.nome}</td>
                <td>{user.data_agendamento}</td>
                <td>{user.telefone}</td>

                <td className={styles.acoes}>
                  <button
                    className={styles.botaoEditar}
                    onClick={() => openEditModal(user)}
                  >
                    <AiFillEdit /> Editar
                  </button>

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
                setPaginaAtual((prev) =>
                  Math.min(prev + 1, totalPaginas)
                )
              }
              disabled={paginaAtual === totalPaginas}
            >
              Próxima ➡
            </button>
          </div>
        )}
      </div>

      {/* ------------------ MODAL DELETE ------------------ */}
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

      {/* ------------------ MODAL EDITAR ------------------ */}
      {showEditModal && (
        <div className={styles.modalFundo}>
          <div className={styles.modal}>
            <h3>Editar Agendamento</h3>

            <label>Nome:</label>
            <input
              type="text"
              value={agendamentoToEdit.nome}
              onChange={(e) =>
                setAgendamentoToEdit({
                  ...agendamentoToEdit,
                  nome: e.target.value,
                })
              }
            />

            <label>Data Agendamento:</label>
            <input
              type="datetime-local"
              value={agendamentoToEdit.data_agendamento}
              onChange={(e) =>
                setAgendamentoToEdit({
                  ...agendamentoToEdit,
                  data_agendamento: e.target.value,
                })
              }
            />

            <label>Telefone:</label>
            <input
              type="text"
              value={agendamentoToEdit.telefone}
              onChange={(e) =>
                setAgendamentoToEdit({
                  ...agendamentoToEdit,
                  telefone: e.target.value,
                })
              }
            />

            <div className={styles.modalBotoes}>
              <button onClick={confirmEdit} className={styles.sim}>
                Salvar
              </button>

              <button onClick={closeEditModal} className={styles.cancelar}>
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      <ToastContainer position="top-right" autoClose={1500} theme="colored" />
    </div>
  );
}
