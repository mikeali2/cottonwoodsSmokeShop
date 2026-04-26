import type { FormEvent } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { SITE, formatAddressOneLine } from "../config/site";

export function Apply() {
  const [status, setStatus] = useState<"idle" | "sent" | "error">("idle");

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const name = String(fd.get("name") ?? "").trim();
    const email = String(fd.get("email") ?? "").trim();
    const phone = String(fd.get("phone") ?? "").trim();
    const location = String(fd.get("location") ?? "").trim();
    const resumeUrl = String(fd.get("resumeUrl") ?? "").trim();
    const message = String(fd.get("message") ?? "").trim();
    if (!name || !email || !phone || !location) {
      setStatus("error");
      return;
    }

    const subject = encodeURIComponent(`Job application — ${name}`);
    const body = encodeURIComponent(
      [
        `Name: ${name}`,
        `Email: ${email}`,
        `Phone: ${phone}`,
        `Location / store applying to: ${location}`,
        resumeUrl ? `Resume / portfolio link: ${resumeUrl}` : "Resume / portfolio link: —",
        "",
        message || "(No additional message)",
        "",
        "Note: email cannot attach files—bring a resume to the interview or share a link above.",
      ].join("\n"),
    );
    window.location.href = `mailto:${SITE.email}?subject=${subject}&body=${body}`;
    setStatus("sent");
  }

  return (
    <div className="container container--narrow">
      <p style={{ margin: "0 0 0.5rem" }}>
        <Link to="/" className="muted">
          ← Home
        </Link>
      </p>
      <h1 className="page-title">Apply for a job</h1>
      <p className="lede">
        Interested in joining {SITE.name} at{" "}
        <strong style={{ color: "var(--text)" }}>{formatAddressOneLine()}</strong>? Tell us a bit
        about yourself. Submitting opens an email draft to{" "}
        <a href={`mailto:${SITE.email}`} style={{ color: "var(--accent-dim)" }}>
          {SITE.email}
        </a>
        —attach a resume from your mail client if you prefer.
      </p>

      <form className="panel stack" style={{ marginTop: "1.5rem" }} onSubmit={onSubmit}>
        <div className="field">
          <label htmlFor="name">Full name *</label>
          <input id="name" name="name" required autoComplete="name" />
        </div>
        <div className="field">
          <label htmlFor="email">Email *</label>
          <input id="email" name="email" type="email" required autoComplete="email" />
        </div>
        <div className="field">
          <label htmlFor="phone">Phone *</label>
          <input id="phone" name="phone" type="tel" required autoComplete="tel" />
        </div>
        <div className="field">
          <label htmlFor="location">Which location are you applying for? *</label>
          <input
            id="location"
            name="location"
            required
            defaultValue={formatAddressOneLine()}
            placeholder="Store name or address"
          />
        </div>
        <div className="field">
          <label htmlFor="resumeUrl">Resume or portfolio link (optional)</label>
          <input
            id="resumeUrl"
            name="resumeUrl"
            type="url"
            placeholder="https://…"
          />
        </div>
        <div className="field">
          <label htmlFor="message">Anything else we should know?</label>
          <textarea id="message" name="message" placeholder="Availability, experience, etc." />
        </div>

        {status === "error" ? (
          <div className="alert alert--error" role="alert">
            Please fill in name, email, phone, and the location you are applying for.
          </div>
        ) : null}
        {status === "sent" ? (
          <div className="alert alert--ok" role="status">
            If your mail app did not open, email {SITE.email} with your resume.
          </div>
        ) : null}

        <button type="submit" className="btn btn--primary btn--block">
          Send application email
        </button>
      </form>
    </div>
  );
}
