import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-brand">
        <strong>CineHub</strong>
        <p>Universidad de La Sabana</p>
      </div>

      <div className="footer-links">
        <Link to="/about">Acerca de</Link>
        <Link to="/movies">Películas</Link>
        <Link to="/my-plans">Mis planes</Link>
      </div>

      <p className="footer-copy">© {new Date().getFullYear()} CineHub</p>
    </footer>
  );
}
