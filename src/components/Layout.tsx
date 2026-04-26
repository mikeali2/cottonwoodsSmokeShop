import type { ReactNode } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { SITE } from "../config/site";
import { ThemeToggle } from "./ThemeToggle";
import "../styles/site.css";

function NavItem({ to, children }: { to: string; children: ReactNode }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => (isActive ? "is-active" : undefined)}
      end={to === "/"}
    >
      {children}
    </NavLink>
  );
}

export function Layout() {
  return (
    <>
      <header className="site-header">
        <div className="site-header__inner">
          <NavLink to="/" className="brand">
            <span className="brand__title">{SITE.name}</span>
            <span className="brand__tag">Vape · Glass · Smoke</span>
          </NavLink>
          <nav className="nav" aria-label="Primary">
            <ThemeToggle />
            <NavItem to="/">Home</NavItem>
            <NavItem to="/contact">Contact</NavItem>
            <NavItem to="/apply">Apply</NavItem>
          </nav>
        </div>
      </header>

      <main className="site-main">
        <Outlet />
      </main>

      <footer className="site-footer">
        <div className="site-footer__inner">
          <div className="footer-block">
            <h3>Visit</h3>
            <p>{SITE.name}</p>
            <p className="muted" style={{ marginTop: "0.35rem" }}>
              {SITE.street}
              <br />
              {SITE.city}, {SITE.stateAbbr} {SITE.zip}
            </p>
            <p className="muted" style={{ marginTop: "0.5rem" }}>
              <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
            </p>
            {SITE.phone ? (
              <p className="muted" style={{ marginTop: "0.35rem" }}>
                {SITE.phone}
              </p>
            ) : null}
          </div>
          <div className="footer-block">
            <h3>Policies</h3>
            <p className="disclaimer">
              You must meet age requirements for your jurisdiction. Products are for lawful use
              only. Nothing on this site is medical or legal advice.
            </p>
          </div>
          <div className="footer-block">
            <h3>Links</h3>
            <ul className="footer-list">
              <li>
                <NavLink to="/contact">Contact us</NavLink>
              </li>
              <li>
                <NavLink to="/apply">Apply for a job</NavLink>
              </li>
            </ul>
          </div>
        </div>
        <p
          className="muted"
          style={{ textAlign: "center", fontSize: "0.82rem", padding: "0 1.25rem 1.75rem" }}
        >
          © {new Date().getFullYear()} {SITE.name}. All rights reserved.
        </p>
      </footer>
    </>
  );
}
