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
    telefone: "",
  });

  const itensPorPagina = 10;

  // ------------------ FORMATAR PARA INPUT datetime-local ------------------
  function formatarDataParaInput(date) {
    if (!date || isNaN(date.getTime())) return "";
    const iso = date.toISOString();
    return iso.slice(0, 16); // YYYY-MM-DDTHH:MM
  }

  // ------------------ CONVERTER FORMATOS pt-BR PARA Date ------------------
  function parsePtBrToDate(value) {
    if (!value) return null;

    // Detectar DD/MM/YYYY HH:MM(:SS)
    const ptbrMatch = value.match(
      /^(\d{2})\/(\d{2})\/(\d{4})\s+(\d{2}):(\d{2})(?::(\d{2}))?$/
    );

    if (ptbrMatch) {
      const [, dd, mm, yyyy, HH, MM, SS] = ptbrMatch;

      return new Date(
        Number(yyyy),
        Number(mm) - 1,
        Number(dd),
        Number(HH),
        Number(MM),
        SS ? Number(SS) : 0
      );
    }

    // ISO
    if (/^\d{4}-\d{2}-\d{2}T/.test(value)) {
      return new Date(value);
    }

    // Última tentativa
    const d = new Date(value);
    return isNaN(d.getTime()) ? null : d;
  }

  // ------------------ BUSCAR AGENDAMENTOS ------------------
  const getAgendamentos = async () => {
    try {
      const url = "http://127.0.0.1:3000/agendamentos/get";
      const response = await fetch(url);
      const data = await response.json();

      const lista = data.map((item) => {
        const dateObj = parsePtBrToDate(item.data_agendamento);

        return {
          ...item,
          dateObject: dateObj,

          // Exibir em pt-BR
          data_agendamento_formatada: dateObj
            ? dateObj.toLocaleString("pt-BR", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })
            : "Data inválida",
        };
      });

      // Ordenar mais recente → mais antigo
      lista.sort((a, b) => b.dateObject - a.dateObject);

      setListaAgendamentos(lista);
    } catch (err) {
      console.log(err);
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

      toast.success("Agendamento deletado!");

      setListaAgendamentos((prev) =>
        prev.filter((item) => item.id !== agendamentoToDelete)
      );
    } catch {
      toast.error("Erro ao deletar.");
    }
    closeModal();
  };

  // ------------------ EDITAR ------------------
  function openEditModal(user) {
    setAgendamentoToEdit({
      id: user.id,
      nome: user.nome,
      telefone: user.telefone,
      data_agendamento: formatarDataParaInput(user.dateObject),
    });

    setShowEditModal(true);
  }

  function closeEditModal() {
    setShowEditModal(false);
  }

  const confirmEdit = async () => {
    try {
      const url = `http://127.0.0.1:3000/agendamentos/put/${agendamentoToEdit.id}`;

      const body = {};

      if (agendamentoToEdit.nome.trim() !== "") {
        body.nome = agendamentoToEdit.nome;
      }

      if (agendamentoToEdit.telefone.trim() !== "") {
        body.telefone = agendamentoToEdit.telefone;
      }

      if (agendamentoToEdit.data_agendamento !== "") {
        const [datePart, timePart] = agendamentoToEdit.data_agendamento.split("T");
        body.data_agendamento = `${datePart} ${timePart}:00`;
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

                {/* Exibição pt-BR */}
                <td>{user.data_agendamento_formatada}</td>

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
                setPaginaAtual((prev) => Math.min(prev + 1, totalPaginas))
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
              className={styles.focus}
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
              className={styles.focus}
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
              className={styles.focus}
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
