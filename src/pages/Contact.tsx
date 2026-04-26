import type { FormEvent } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { SITE, formatAddressOneLine } from "../config/site";

export function Contact() {
  const [status, setStatus] = useState<"idle" | "sent" | "error">("idle");

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const name = String(fd.get("name") ?? "").trim();
    const email = String(fd.get("email") ?? "").trim();
    const phone = String(fd.get("phone") ?? "").trim();
    const message = String(fd.get("message") ?? "").trim();
    if (!email || !message) {
      setStatus("error");
      return;
    }

    const subject = encodeURIComponent(`Website inquiry from ${name || "visitor"}`);
    const body = encodeURIComponent(
      [`Name: ${name || "—"}`, `Email: ${email}`, `Phone: ${phone || "—"}`, "", message].join(
        "\n",
      ),
    );
    window.location.href = `mailto:${SITE.email}?subject=${subject}&body=${body}`;
    setStatus("sent");
  }

  return (
    <div className="container">
      <p style={{ margin: "0 0 0.5rem" }}>
        <Link to="/" className="muted">
          ← Home
        </Link>
      </p>
      <h1 className="page-title">Contact us</h1>
      <p className="lede">
        We are at <strong style={{ color: "var(--text)" }}>{formatAddressOneLine()}</strong>.
        Submitting the form below opens your email app to{" "}
        <a href={`mailto:${SITE.email}`} style={{ color: "var(--accent-dim)" }}>
          {SITE.email}
        </a>
        {SITE.phone ? (
          <>
            {" "}
            — or call <strong style={{ color: "var(--text)" }}>{SITE.phone}</strong>
          </>
        ) : null}
        .
      </p>

      <form className="panel stack" style={{ marginTop: "1.5rem" }} onSubmit={onSubmit}>
        <div className="field">
          <label htmlFor="name">Name</label>
          <input id="name" name="name" autoComplete="name" placeholder="Your name" />
        </div>
        <div className="field">
          <label htmlFor="email">Email *</label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@example.com"
          />
        </div>
        <div className="field">
          <label htmlFor="phone">Phone</label>
          <input id="phone" name="phone" type="tel" autoComplete="tel" placeholder="Optional" />
        </div>
        <div className="field">
          <label htmlFor="message">Message *</label>
          <textarea
            id="message"
            name="message"
            required
            placeholder="What can we help you with?"
          />
        </div>

        {status === "error" ? (
          <div className="alert alert--error" role="alert">
            Please add an email and a short message so we can reply.
          </div>
        ) : null}
        {status === "sent" ? (
          <div className="alert alert--ok" role="status">
            If your mail app did not open, email us manually at {SITE.email}.
          </div>
        ) : null}

        <button type="submit" className="btn btn--primary btn--block">
          Open email draft
        </button>
      </form>
    </div>
  );
}
