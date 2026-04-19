import { NavLink } from "react-router-dom";

const links = [
  { to: "/", label: "Accueil" },
  { to: "/dossier", label: "Dossier projets" },
  { to: "/ajouter-projet", label: "AjouterProjet" }
];

export default function Topbar() {
  return (
    <nav className="topbar" aria-label="Navigation principale">
      <div className="topbar-head">
        <NavLink className="brand" to="/">
          MS
        </NavLink>
      </div>

      <div className="topbar-links">
        {links.map((link) => (
          <NavLink
            key={link.to}
            className={({ isActive }) => (isActive ? "nav-current" : undefined)}
            to={link.to}
          >
            {link.label}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
