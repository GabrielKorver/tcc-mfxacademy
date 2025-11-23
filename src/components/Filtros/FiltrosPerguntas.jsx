import styles from "../Filtros/FiltrosPerguntas.module.css";
import { FiSearch } from "react-icons/fi";

function FiltrosPerguntas() {
  return (
    <div className={styles.container}>

      <div className={styles.filtros}>

        <div className={styles.inputContainer}>
          <FiSearch className={styles.icon} />
          <input type="text" placeholder="Buscar perguntas..." />
        </div>

        <select name="Select tech" id="Select Tech">
          <option value="todas">Todas as tecnologias</option>
          <option value="react">React</option>
          <option value="javascript">Javascript</option>
          <option value="css">CSS</option>
          <option value="html">HTML</option>
        </select>

      </div>

    </div>
  );
}

export default FiltrosPerguntas;
