import { Outlet } from "react-router";
import { NavBar } from "./NavBar";

export function Layout() {
  return (
    <>
      <NavBar />
      <main className="page-content">
        <Outlet />
      </main>
      <footer className="site-footer">
        <p>© 2026 Tianmu Wu. All rights reserved.</p>
      </footer>
    </>
  );
}
