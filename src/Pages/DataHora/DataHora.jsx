import { useState, useEffect } from "react";
import styles from "./DataHora.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaTrash } from "react-icons/fa";
import { AiFillEdit } from "react-icons/ai";
import { LuMessageSquarePlus } from "react-icons/lu";

export default function DataHora() {
  const [listaAgendamentos, setListaAgendamentos] = useState([]);
  const [dataHora, setDataHora] = useState([]);

  // modal de Editar Data
  const [modalOpen, setModalOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState("");

  // modal de Editar Hora
  const [modalHoraOpen, setModalHoraOpen] = useState(false);
  const [editHoraId, setEditHoraId] = useState(null);
  const [editHora, setEditHora] = useState("");

  // modal de deletar Data
  const [modalDeleteOpen, setModalDeleteOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  // modal de deletar Hora
  const [modalDeleteHoraOpen, setModalDeleteHoraOpen] = useState(false);
  const [deleteHoraId, setDeleteHoraId] = useState(null);

  // modal de adicionar Data
  const [modalAddDataOpen, setModalAddDataOpen] = useState(false);
  const [addData, setAddData] = useState("");

  // modal de adicionar Hora
  const [modalAddHoraOpen, setModalAddHoraOpen] = useState(false);
  const [addHora, setAddHora] = useState("");

  // abrir modal Editar Data
  function openModal(user) {
    setEditId(user.id);
    setEditData(user.agenda_data.slice(0, 10));
    setModalOpen(true);
  }

  // abrir modal Editar Hora
  function openModalHora(hora) {
    setEditHoraId(hora.id);
    setEditHora(hora.agenda_hora);
    setModalHoraOpen(true);
  }

  // abrir modal deletar Data
  function openDeleteModal(id) {
    setDeleteId(id);
    setModalDeleteOpen(true);
  }

  // abrir modal deletar Hora
  function openDeleteModalHora(id) {
    setDeleteHoraId(id);
    setModalDeleteHoraOpen(true);
  }

  // abrir modal adicionar Data
  function openAddDataModal() {
    setAddData("");
    setModalAddDataOpen(true);
  }

  // abrir modal adicionar Hora
  function openAddHoraModal() {
    setAddHora("");
    setModalAddHoraOpen(true);
  }

  function formatarData(iso) {
    return new Date(iso).toLocaleDateString("pt-BR", {
      timeZone: "UTC",
    });
  }

  function formatarHora(horaString) {
    const [hora, minuto] = horaString.split(":");
    return `${hora}:${minuto}`;
  }

  // GET de datas
  const getData = async () => {
    try {
      const response = await fetch("http://127.0.0.1:3000/data/get");
      const data = await response.json();
      setListaAgendamentos(data);
    } catch (error) {
      toast.error("Erro ao buscar Data e Hora", error);
    }
  };

  // GET de horas
  const getHoras = async () => {
    try {
      const response = await fetch("http://127.0.0.1:3000/hora/get");
      const data = await response.json();
      setDataHora(data);
    } catch (error) {
      toast.error("Erro ao buscar Hora", error);
    }
  };

  // POST de Data
  async function postData() {
    try {
      // 1. Buscar todas as datas existentes
      const req = await fetch("http://127.0.0.1:3000/data/get");
      const lista = await req.json();

      const existe = lista.some(item =>
        new Date(item.agenda_data).toISOString().split("T")[0] === addData
      );

      if (existe) {
        toast.error("Esta data já está cadastrada!");
        return;
      }

      const response = await fetch("http://127.0.0.1:3000/data/post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ agenda_data: addData })
      });

      if (!response.ok) throw new Error("Erro ao adicionar data");

      toast.success("Data adicionada!");
      setModalAddDataOpen(false);
      getData();

    } catch (error) {
      toast.error("Erro ao adicionar Data!", error);
    }
  }


  async function postHora() {
    try {
      // valida input rápido
      if (!addHora || !addHora.trim()) {
        toast.error("Informe uma hora válida.");
        return;
      }

      // normalizador: retorna "HH:MM" a partir de vários formatos
      const normalizeHora = (raw) => {
        if (!raw && raw !== 0) return "";
        const s = String(raw).trim();

        // ISO datetime -> extrai horas e minutos em UTC
        if (s.includes("T") && s.endsWith("Z")) {
          try {
            return new Date(s).toLocaleTimeString("pt-BR", {
              hour: "2-digit",
              minute: "2-digit",
              timeZone: "UTC",
            });
          } catch {
            return "";
          }
        }

        // se contém ":" (ex: "14:30:00" ou "14:30")
        if (s.includes(":")) {
          const parts = s.split(":");
          const hh = parts[0].padStart(2, "0");
          const mm = (parts[1] || "00").slice(0, 2).padStart(2, "0");
          return `${hh}:${mm}`;
        }

        // fallback: retorna string (não ideal)
        return s;
      };

      const addHoraNorm = normalizeHora(addHora);

      // GET fresh lista de horas do backend
      const req = await fetch("http://127.0.0.1:3000/hora/get");
      if (!req.ok) throw new Error("Erro ao buscar lista de horas");
      const lista = await req.json();

      // compara após normalizar cada item da lista
      const existe = lista.some(item => {
        const itemNorm = normalizeHora(item.agenda_hora);
        return itemNorm === addHoraNorm;
      });

      if (existe) {
        toast.error("Esta hora já está cadastrada!");
        return;
      }

      // tudo ok — envia POST (envia addHora no formato original; se quiser, envie addHoraNorm)
      const response = await fetch("http://127.0.0.1:3000/hora/post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ agenda_hora: addHora })
      });

      if (!response.ok) throw new Error("Erro ao adicionar hora");

      toast.success("Hora adicionada!");
      setModalAddHoraOpen(false);
      getHoras();

    } catch (error) {
      console.error("postHora error:", error);
      toast.error("Erro ao adicionar Hora!");
    }
  }



  // PUT de Data
  async function putData() {
    try {
      const response = await fetch(`http://127.0.0.1:3000/data/put/${editId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ agenda_data: editData })
      });

      if (!response.ok) throw new Error("Erro ao atualizar");

      toast.success("Data atualizada!");
      setModalOpen(false);
      await getData();

    } catch (error) {
      toast.error("Erro ao atualizar Data!", error);
    }
  }

  // PUT de Hora
  async function putHora() {
    try {
      const response = await fetch(`http://127.0.0.1:3000/hora/put/${editHoraId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ agenda_hora: editHora })
      });

      if (!response.ok) throw new Error("Erro ao atualizar");

      toast.success("Hora atualizada!");
      setModalHoraOpen(false);
      await getHoras();

    } catch (error) {
      toast.error("Erro ao atualizar Hora!", error);
    }
  }

  // DELETE de Data
  async function deleteData() {
    try {
      const response = await fetch(`http://127.0.0.1:3000/data/delete/${deleteId}`, {
        method: "DELETE"
      });

      if (!response.ok) throw new Error("Erro ao deletar");

      toast.success("Data deletada!");
      setModalDeleteOpen(false);
      getData();

    } catch (error) {
      toast.error("Erro ao deletar Data!", error);
    }
  }

  // DELETE de Hora
  async function deleteHora() {
    try {
      const response = await fetch(`http://127.0.0.1:3000/hora/delete/${deleteHoraId}`, {
        method: "DELETE"
      });

      if (!response.ok) throw new Error("Erro ao deletar");

      toast.success("Hora deletada!");
      setModalDeleteHoraOpen(false);
      getHoras();

    } catch (error) {
      toast.error("Erro ao deletar Hora!", error);
    }
  }

  useEffect(function () {
    getData();
    getHoras();
  }, []);

  return (
    <div className={styles.container}>

      <div className={styles.listAdicionar}>
        <h1>Gestão de Data e Hora</h1>
        <div className={styles.listBotao}>

          <p className={styles.BotaoAdicionar} onClick={openAddDataModal}>
            <LuMessageSquarePlus className={styles.icon} /> Data
          </p>

          <p className={styles.BotaoAdicionar} onClick={openAddHoraModal}>
            <LuMessageSquarePlus className={styles.icon} /> Hora
          </p>

        </div>
      </div>

      <div><p>Lista de Data e Hora</p></div>

      <div className={styles.datahora_list}>

        {/* LISTA DE DATAS */}
        <div>
          <p>Data</p>
          <table className={styles.tabelaUsuarios}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Data</th>
                <th>Ações</th>
              </tr>
            </thead>

            <tbody>
              {listaAgendamentos.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{formatarData(user.agenda_data)}</td>

                  <td className={styles.acoes}>
                    <button
                      onClick={() => openModal(user)}
                      className={styles.botaoEditar}
                    >
                      <AiFillEdit /> Editar
                    </button>

                    <button
                      onClick={() => openDeleteModal(user.id)}
                      className={styles.botaoDelete}
                    >
                      <FaTrash /> Deletar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* LISTA DE HORAS */}
        <div>
          <p>Hora</p>
          <table className={styles.tabelaUsuarios}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Hora</th>
                <th>Ações</th>
              </tr>
            </thead>

            <tbody>
              {dataHora.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{formatarHora(user.agenda_hora)}</td>

                  <td className={styles.acoes}>
                    <button
                      onClick={() => openModalHora(user)}
                      className={styles.botaoEditar}
                    >
                      <AiFillEdit /> Editar
                    </button>

                    <button
                      onClick={() => openDeleteModalHora(user.id)}
                      className={styles.botaoDelete}
                    >
                      <FaTrash /> Deletar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>

      {/* MODAL EDITAR DATA */}
      {modalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h2>Editar Data</h2>

            <input
              type="date"
              value={editData}
              onChange={(e) => setEditData(e.target.value)}
              className={styles.inputDate}
            />

            <div className={styles.modalButtons}>
              <button onClick={() => setModalOpen(false)} className={styles.botaoCancelar}>
                Cancelar
              </button>

              <button onClick={putData} className={styles.botaoSalvar}>
                Salvar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL EDITAR HORA */}
      {modalHoraOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h2>Editar Hora</h2>

            <input
              type="time"
              value={editHora}
              onChange={(e) => setEditHora(e.target.value)}
              className={styles.inputDate}
            />

            <div className={styles.modalButtons}>
              <button onClick={() => setModalHoraOpen(false)} className={styles.botaoCancelar}>
                Cancelar
              </button>

              <button onClick={putHora} className={styles.botaoSalvar}>
                Salvar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL ADICIONAR DATA */}
      {modalAddDataOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h2>Adicionar Data</h2>

            <input
              type="date"
              value={addData}
              onChange={(e) => setAddData(e.target.value)}
              className={styles.inputDate}
            />

            <div className={styles.modalButtons}>
              <button
                onClick={() => setModalAddDataOpen(false)}
                className={styles.botaoCancelar}
              >
                Cancelar
              </button>

              <button
                onClick={postData}
                className={styles.botaoSalvar}
              >
                Adicionar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL ADICIONAR HORA */}
      {modalAddHoraOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h2>Adicionar Hora</h2>

            <input
              type="time"
              value={addHora}
              onChange={(e) => setAddHora(e.target.value)}
              className={styles.inputDate}
            />

            <div className={styles.modalButtons}>
              <button
                onClick={() => setModalAddHoraOpen(false)}
                className={styles.botaoCancelar}
              >
                Cancelar
              </button>

              <button
                onClick={postHora}
                className={styles.botaoSalvar}
              >
                Adicionar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL DELETAR DATA */}
      {modalDeleteOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h2>Confirmar Exclusão</h2>
            <p>Tem certeza que deseja deletar a data #{deleteId}?</p>

            <div className={styles.modalButtons}>
              <button
                onClick={() => setModalDeleteOpen(false)}
                className={styles.botaoCancelar}
              >
                Cancelar
              </button>

              <button
                onClick={deleteData}
                className={styles.botaoDeletarConfirm}
              >
                Deletar
              </button>
            </div>

          </div>
        </div>
      )}

      {/* MODAL DELETAR HORA */}
      {modalDeleteHoraOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h2>Confirmar Exclusão</h2>
            <p>Tem certeza que deseja deletar a hora ?</p>

            <div className={styles.modalButtons}>
              <button
                onClick={() => setModalDeleteHoraOpen(false)}
                className={styles.botaoCancelar}
              >
                Cancelar
              </button>

              <button
                onClick={deleteHora}
                className={styles.botaoDeletarConfirm}
              >
                Deletar
              </button>
            </div>

          </div>
        </div>
      )}

      <ToastContainer position="top-right" autoClose={1500} theme="colored" />

    </div>
  );
}
