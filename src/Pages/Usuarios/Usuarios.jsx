import { FaTrash } from "react-icons/fa";
import styles from "./Usuarios.module.css";
import { useEffect, useState } from "react";

export default function Usuarios() {
  const [listaUsuarios, setListaUsuarios] = useState([]);
  const [paginaAtual, setPaginaAtual] = useState(1);

  const itensPorPagina = 10;

  const getUsers = async () => {
    const url = "http://127.0.0.1:3000/users/get";
    const response = await fetch(url);
    const data = await response.json();
    setListaUsuarios(data);
  };

  useEffect(() => {
    getUsers();
  }, []);

  // Calcular índices da página atual
  const indexInicial = (paginaAtual - 1) * itensPorPagina;
  const indexFinal = indexInicial + itensPorPagina;

  // Usuários exibidos na página
  const usuariosPagina = listaUsuarios.slice(indexInicial, indexFinal);

  // Número total de páginas
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
                  <button className={styles.botaoDelete}>
                    <FaTrash /> Deletar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* PAGINAÇÃO BEM SIMPLES */}
        {listaUsuarios.length > itensPorPagina && (
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
    </div>
  );
}
