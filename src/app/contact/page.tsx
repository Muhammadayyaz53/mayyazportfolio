"use client";

import { useState } from "react";
import { contactDetails, githubUrl, resumeUrl } from "../../data/portfolio";
import { Section } from "../../components/section";

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      subject: formData.get("subject") as string,
      message: formData.get("message") as string,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (res.ok) {
        setSuccess(result.message || "Message sent successfully!");
        (e.target as HTMLFormElement).reset();
      } else {
        setError(result.message || "Something went wrong. Please try again.");
      }
    } catch {
      setError("Network error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Section
      eyebrow="Contact"
      title="Get In Touch"
      description="Have a project in mind? Fill in the form and I'll get back to you as soon as possible."
    >
      <div className="contact-grid contact-grid-page">
        <div className="glass-card contact-panel">
          <div className="contact-details">
            {contactDetails.map((item) => (
              <div className="contact-row" key={item.label}>
                <span>{item.label}</span>
                <strong>{item.value}</strong>
              </div>
            ))}
          </div>

          <div className="action-row">
            <a className="button button-primary" href={githubUrl} target="_blank" rel="noreferrer">
              GitHub
            </a>
            <a className="button button-secondary" href={resumeUrl} target="_blank" rel="noreferrer">
              Resume
            </a>
          </div>
        </div>

        <div className="glass-card contact-panel">
          <form className="contact-form" onSubmit={handleSubmit}>
            <label>
              <span>Full Name</span>
              <input type="text" name="name" required placeholder="Your full name" />
            </label>
            <label>
              <span>Email Address</span>
              <input type="email" name="email" required placeholder="you@example.com" />
            </label>
            <label>
              <span>Phone Number</span>
              <input type="tel" name="phone" required placeholder="03160019053 or +923160019053" />
            </label>
            <label>
              <span>Subject</span>
              <input type="text" name="subject" required placeholder="What is this about?" />
            </label>
            <label>
              <span>Message</span>
              <textarea name="message" required rows={5} placeholder="Tell me about your project..." />
            </label>

            {error && (
              <p style={{ color: "#f87171", fontSize: "14px", marginTop: "8px", padding: "10px", background: "rgba(239,68,68,0.1)", borderRadius: "8px", border: "1px solid rgba(239,68,68,0.3)" }}>
                {error}
              </p>
            )}
            {success && (
              <p style={{ color: "#34d399", fontSize: "14px", marginTop: "8px", padding: "10px", background: "rgba(52,211,153,0.1)", borderRadius: "8px", border: "1px solid rgba(52,211,153,0.3)" }}>
                {success}
              </p>
            )}

            <button className="button button-primary button-submit" type="submit" disabled={loading}>
              {loading ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </div>
    </Section>
  );
}