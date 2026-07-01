"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { contactSchema } from "@/lib/validation/contactSchema";
import { Section } from "../../components/section";
import { contactDetails, githubUrl, resumeUrl } from "../../data/portfolio";

type ContactFormValues = z.input<typeof contactSchema>;

const errorStyle = {
  color: "#f87171",
  fontSize: "14px",
  marginTop: "8px",
  padding: "10px",
  background: "rgba(239,68,68,0.1)",
  borderRadius: "8px",
  border: "1px solid rgba(239,68,68,0.3)",
};

const successStyle = {
  color: "#34d399",
  fontSize: "14px",
  marginTop: "8px",
  padding: "10px",
  background: "rgba(52,211,153,0.1)",
  borderRadius: "8px",
  border: "1px solid rgba(52,211,153,0.3)",
};

export default function ContactSection() {
  const [successMessage, setSuccessMessage] = useState("");
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      phone: "",
      message: "",
    },
    mode: "onTouched",
  });

  const onSubmit = async (values: ContactFormValues) => {
    setServerError("");
    setSuccessMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = await res.json();

      if (!res.ok) {
        const fieldErrors = data?.errors || {};

        Object.entries(fieldErrors).forEach(([field, messages]) => {
          const message = Array.isArray(messages) ? messages[0] : undefined;

          if (message) {
            setError(field as keyof ContactFormValues, {
              type: "server",
              message,
            });
          }
        });

        setServerError(
          data?.message || "Error sending message. Please try again.",
        );

        return;
      }

      setSuccessMessage(data?.message || "Message sent successfully.");

      reset();
    } catch {
      setServerError("Something went wrong. Please try again later.");
    }
  };

  return (
    <Section
      eyebrow="Contact"
      title="Get In Touch"
      description="Have a project in mind? Fill in the form and I'll get back to you as soon as possible."
      centered={true}
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

          <div className="action-row" style={{ marginTop: "32px" }}>
            <a
              className="button button-primary"
              href={githubUrl}
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </a>
            <a
              className="button button-secondary"
              href={resumeUrl}
              target="_blank"
              rel="noreferrer"
            >
              Resume
            </a>
          </div>
        </div>

        <div className="glass-card contact-panel">
          <form className="contact-form" onSubmit={handleSubmit(onSubmit)}>
            <label>
              <span>Full Name</span>
              <input
                type="text"
                placeholder="Your full name"
                {...register("name")}
              />
              {errors.name && (
                <p style={errorStyle}>
                  {errors.name.message}
                </p>
              )}
            </label>

            <label>
              <span>Email Address</span>
              <input
                type="email"
                placeholder="you@example.com"
                {...register("email")}
              />
              {errors.email && (
                <p style={errorStyle}>
                  {errors.email.message}
                </p>
              )}
            </label>

            <label>
              <span>Phone Number</span>
              <input
                type="tel"
                placeholder="e.g. +1 (555) 000-0000"
                {...register("phone")}
              />
              {errors.phone && (
                <p style={errorStyle}>
                  {errors.phone.message}
                </p>
              )}
            </label>

            <label>
              <span>Subject</span>
              <input
                type="text"
                placeholder="What is this about?"
                {...register("subject")}
              />
              {errors.subject && (
                <p style={errorStyle}>
                  {errors.subject.message}
                </p>
              )}
            </label>

            <label>
              <span>Message</span>
              <textarea
                rows={5}
                placeholder="Tell me about your project..."
                {...register("message")}
              />
              {errors.message && (
                <p style={errorStyle}>
                  {errors.message.message}
                </p>
              )}
            </label>

            {serverError && (
              <p style={errorStyle}>
                {serverError}
              </p>
            )}

            {successMessage && (
              <p style={successStyle}>
                {successMessage}
              </p>
            )}

            <button
              className="button button-primary button-submit"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </div>
    </Section>
  );
}
