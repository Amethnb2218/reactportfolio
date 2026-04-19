import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

const links = [
  { to: "/", label: "Accueil" },
  { to: "/dossier", label: "Dossier projets" },
  { to: "/ajouter-projet", label: "AjouterProjet" }
];

export default function Topbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  return (
    <nav className="topbar" aria-label="Navigation principale">
      <div className="topbar-head">
        <NavLink className="brand" to="/">
          MS
        </NavLink>

        <button
          className="menu-button"
          type="button"
          aria-label={isMenuOpen ? "Fermer la navigation" : "Ouvrir la navigation"}
          aria-expanded={isMenuOpen}
          aria-controls="menuPrincipal"
          onClick={() => setIsMenuOpen((currentValue) => !currentValue)}
        >
          <span className="menu-icon" aria-hidden="true"></span>
        </button>
      </div>

      <div
        className={`topbar-links${isMenuOpen ? " is-open" : ""}`}
        id="menuPrincipal"
      >
        {links.map((link) => (
          <NavLink
            key={link.to}
            className={({ isActive }) => (isActive ? "nav-current" : undefined)}
            to={link.to}
            onClick={() => setIsMenuOpen(false)}
          >
            {link.label}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
