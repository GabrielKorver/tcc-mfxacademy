import Style from "./ModalNovaPergunta.module.css";

function ModalNovaPergunta({ onClose }) {
    return (
        <div className={Style.overlay}>
            <div className={Style.modal}>
                <h2>Nova Pergunta</h2>
                <p>Aqui vai o conteúdo do modal...</p>
                <button onClick={onClose}>Fechar</button>
            </div>
        </div>

    );
}

export default ModalNovaPergunta;
