import Style from "../../components/Footer/Footer.module.css";

const Footer = () => {
  return (
    <div className={Style.container}>
      <footer className={Style.footer}>
        <p>
          &copy; {new Date().getFullYear()} <strong>Dev Network</strong>. Todos
          os direitos reservados.
        </p>
      </footer>
    </div>
  );
};

export default Footer;
