import { useState } from "react";
import { NavLink } from "react-router";
import styles from "./NavBar.module.css";

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
    <nav className={styles.navBar}>
      <NavLink to="/" className={styles.brand}>
        Tianmu Wu
      </NavLink>
      <ul className={styles.links}>
        {NAV_ITEMS.map(({ path, label }) => (
          <li key={path}>
            <NavLink
              to={path}
              className={({ isActive, isPending }) =>
                [styles.link, isActive && styles.linkActive, isPending && styles.linkPending]
                  .filter(Boolean)
                  .join(" ")
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
        className={styles.menuBtn}
        onClick={() => setMenuOpen(true)}
        aria-label="Open menu"
      >
        <span className={styles.menuIcon} />
        <span className={styles.menuIcon} />
        <span className={styles.menuIcon} />
      </button>
      {menuOpen && (
        <div
          className={styles.overlay}
          onClick={() => setMenuOpen(false)}
          aria-hidden="true"
        />
      )}
      <div className={`${styles.drawer} ${menuOpen ? styles.drawerOpen : ""}`}>
        <div className={styles.drawerHeader}>
          <span>菜单</span>
          <button
            type="button"
            className={styles.drawerClose}
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
          >
            ×
          </button>
        </div>
        <ul className={styles.drawerLinks}>
          {NAV_ITEMS.map(({ path, label }) => (
            <li key={path}>
              <NavLink
                to={path}
                className={({ isActive }) =>
                  [styles.drawerLink, isActive && styles.drawerLinkActive]
                    .filter(Boolean)
                    .join(" ")
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
