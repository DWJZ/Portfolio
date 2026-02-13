import { NavLink } from "react-router";

const NAV_ITEMS = [
  { path: "/", label: "Home" },
  { path: "/demos", label: "Demos" },
  { path: "/playground", label: "Playground" },
  { path: "/lab", label: "Lab" },
];

export function NavBar() {
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
            >
              {label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
