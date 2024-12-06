import { useRouteError, Link } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page">
      <h1>OPAA!</h1>
      <p>Você encontrou uma página indisponível.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
      <Link to={"/"}>Home</Link>
    </div>
  );
}
