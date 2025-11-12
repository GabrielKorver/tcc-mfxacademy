import Style from "../../components/Footer/Footer.module.css";

const Footer = () => {
  return (
    <footer className={Style.footer}>
      <p>
        &copy; {new Date().getFullYear()} <strong>Dev Network</strong>. Todos os
        direitos reservados.
      </p>
    </footer>
  );
};

export default Footer;
