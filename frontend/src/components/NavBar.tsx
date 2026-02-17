import { useState } from "react";
import { NavLink } from "react-router";

const NAV_ITEMS = [
  { path: "/", label: "Home" },
  { path: "/demos", label: "Demos" },
  { path: "/playground", label: "Playground" },
  { path: "/lab", label: "Lab" },
  { path: "/tft", label: "TFT Calc" },
];

export function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="nav-bar">
      <NavLink to="/" className="nav-brand">
        Tianmu Wu
      </NavLink>
      <ul className="nav-links">
        {NAV_ITEMS.map(({ path, label }) => (
          <li key={path}>
            <NavLink
              to={path}
              className={({ isActive, isPending }) =>
                `nav-link${isActive ? " active" : ""}${isPending ? " pending" : ""}`
              }
              end={path === "/"}
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </NavLink>
          </li>
        ))}
      </ul>
      <button
        type="button"
        className="nav-menu-btn"
        onClick={() => setMenuOpen(true)}
        aria-label="Open menu"
      >
        <span className="nav-menu-icon" />
        <span className="nav-menu-icon" />
        <span className="nav-menu-icon" />
      </button>
      {menuOpen && (
        <div
          className="nav-overlay"
          onClick={() => setMenuOpen(false)}
          aria-hidden="true"
        />
      )}
      <div className={`nav-drawer ${menuOpen ? "open" : ""}`}>
        <div className="nav-drawer-header">
          <span>菜单</span>
          <button
            type="button"
            className="nav-drawer-close"
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
          >
            ×
          </button>
        </div>
        <ul className="nav-drawer-links">
          {NAV_ITEMS.map(({ path, label }) => (
            <li key={path}>
              <NavLink
                to={path}
                className={({ isActive }) =>
                  `nav-drawer-link${isActive ? " active" : ""}`
                }
                end={path === "/"}
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
