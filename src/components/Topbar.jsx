const links = [
  { href: "#accueil", label: "Accueil", current: true },
  { href: "#profil", label: "Profil" },
  { href: "#parcours", label: "Parcours" },
  { href: "#portfolio", label: "Portfolio" }
];

export default function Topbar() {
  return (
    <nav className="topbar" aria-label="Navigation principale">
      <div className="topbar-head">
        <a className="brand" href="#accueil">
          MS
        </a>
      </div>

      <div className="topbar-links">
        {links.map((link) => (
          <a
            key={link.href}
            className={link.current ? "nav-current" : undefined}
            href={link.href}
          >
            {link.label}
          </a>
        ))}
      </div>
    </nav>
  );
}
