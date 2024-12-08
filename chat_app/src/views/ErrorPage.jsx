import { useRouteError, Link } from "react-router-dom";
import styles from "./ErrorPage.module.css";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>OPAA!</h1>
      <p className={styles.text}>Você encontrou uma página indisponível.</p>
      <p className={styles.errorMessage}>
        <i>{error?.statusText || error?.message || "Erro desconhecido"}</i>
      </p>
      <Link className={styles.link} to={"/"}>
        Voltar para a Home
      </Link>
    </div>
  );
}
