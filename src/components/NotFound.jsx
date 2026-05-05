import { Link } from "react-router-dom";
import "./../styles/NotFound.css";

export default function NotFound() {
  return (
    <div className="notfound_wrapper">
      <p className="notfound_code">404</p>
      <h1 className="notfound_title">Page introuvable</h1>
      <p className="notfound_sub">Ce champion n'existe pas.</p>
      <Link to="/" className="notfound_btn">
        ← Retour à l'accueil
      </Link>
    </div>
  );
}
