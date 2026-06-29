"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { contactSchema } from "@/lib/validation/contactSchema";
import { Section } from "../../components/section";
import { contactDetails, githubUrl, resumeUrl } from "../../data/portfolio";

type ContactFormValues = z.input<typeof contactSchema>;

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
    } catch (error) {
      setServerError("Something went wrong. Please try again later.");
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

          <div className="action-row" style={{ marginTop: "32px" }}>
            <a className="button button-primary" href={githubUrl} target="_blank" rel="noreferrer">
              GitHub
            </a>
            <a className="button button-secondary" href={resumeUrl} target="_blank" rel="noreferrer">
              Resume
            </a>
          </div>
        </div>

        <div className="glass-card contact-panel">
          <form className="contact-form" onSubmit={handleSubmit(onSubmit)}>
            <label>
              <span>Full Name</span>
              <input type="text" placeholder="Your full name" {...register("name")} />
              {errors.name && (
                <p style={{ color: "#f87171", fontSize: "14px", marginTop: "8px", padding: "10px", background: "rgba(239,68,68,0.1)", borderRadius: "8px", border: "1px solid rgba(239,68,68,0.3)" }}>
                  {errors.name.message}
                </p>
              )}
            </label>
            
            <label>
              <span>Email Address</span>
              <input type="email" placeholder="you@example.com" {...register("email")} />
              {errors.email && (
                <p style={{ color: "#f87171", fontSize: "14px", marginTop: "8px", padding: "10px", background: "rgba(239,68,68,0.1)", borderRadius: "8px", border: "1px solid rgba(239,68,68,0.3)" }}>
                  {errors.email.message}
                </p>
              )}
            </label>
            
            <label>
              <span>Phone Number</span>
              <input type="tel" placeholder="03160019053 or +923160019053" {...register("phone")} />
              {errors.phone && (
                <p style={{ color: "#f87171", fontSize: "14px", marginTop: "8px", padding: "10px", background: "rgba(239,68,68,0.1)", borderRadius: "8px", border: "1px solid rgba(239,68,68,0.3)" }}>
                  {errors.phone.message}
                </p>
              )}
            </label>
            
            <label>
              <span>Subject</span>
              <input type="text" placeholder="What is this about?" {...register("subject")} />
              {errors.subject && (
                <p style={{ color: "#f87171", fontSize: "14px", marginTop: "8px", padding: "10px", background: "rgba(239,68,68,0.1)", borderRadius: "8px", border: "1px solid rgba(239,68,68,0.3)" }}>
                  {errors.subject.message}
                </p>
              )}
            </label>
            
            <label>
              <span>Message</span>
              <textarea rows={5} placeholder="Tell me about your project..." {...register("message")} />
              {errors.message && (
                <p style={{ color: "#f87171", fontSize: "14px", marginTop: "8px", padding: "10px", background: "rgba(239,68,68,0.1)", borderRadius: "8px", border: "1px solid rgba(239,68,68,0.3)" }}>
                  {errors.message.message}
                </p>
              )}
            </label>

            {serverError && (
              <p style={{ color: "#f87171", fontSize: "14px", marginTop: "8px", padding: "10px", background: "rgba(239,68,68,0.1)", borderRadius: "8px", border: "1px solid rgba(239,68,68,0.3)" }}>
                {serverError}
              </p>
            )}
            
            {successMessage && (
              <p style={{ color: "#34d399", fontSize: "14px", marginTop: "8px", padding: "10px", background: "rgba(52,211,153,0.1)", borderRadius: "8px", border: "1px solid rgba(52,211,153,0.3)" }}>
                {successMessage}
              </p>
            )}

            <button className="button button-primary button-submit" type="submit" disabled={isSubmitting}>
        <div className="rounded-[28px] border border-white/10 bg-white/8 p-6 shadow-2xl shadow-cyan-950/20 backdrop-blur-xl md:p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="grid gap-5 md:grid-cols-2">
              <label className="space-y-2">
                <span className="text-sm font-medium text-slate-200">Name</span>
                <input
                  placeholder="Your full name"
                  {...register("name")}
                  aria-invalid={Boolean(errors.name)}
                  className="w-full rounded-xl border border-white/10 bg-[#071a31] px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-400"
                />
                {errors.name ? <p className="text-sm text-rose-300">{errors.name.message}</p> : null}
              </label>

              

              <label className="space-y-2">
                <span className="text-sm font-medium text-slate-200">Email</span>
                <input
                  type="email"
                  placeholder="you@example.com"
                  {...register("email")}
                  aria-invalid={Boolean(errors.email)}
                  className="w-full rounded-xl border border-white/10 bg-[#071a31] px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-400"
                />
                {errors.email ? <p className="text-sm text-rose-300">{errors.email.message}</p> : null}
              </label>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <label className="space-y-2">
                <span className="text-sm font-medium text-slate-200">Phone</span>
                <input
                  placeholder="+92 316 0019053"
                  {...register("phone")}
                  aria-invalid={Boolean(errors.phone)}
                  className="w-full rounded-xl border border-white/10 bg-[#071a31] px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-400"
                />
                {errors.phone ? <p className="text-sm text-rose-300">{errors.phone.message}</p> : null}
              </label>
              <div className="hidden md:block" aria-hidden="true" />
            </div>
            <label className="space-y-2">
              <span className="text-sm font-medium text-slate-200">Subject</span>
              <input
                placeholder="Short subject for your message"
                {...register("subject")}
                aria-invalid={Boolean(errors.subject)}
                className="w-full rounded-xl border border-white/10 bg-[#071a31] px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-400"
              />
              {errors.subject ? <p className="text-sm text-rose-300">{errors.subject.message}</p> : null}
            </label>
            <label className="block space-y-2">
              <span className="text-sm font-medium text-slate-200">Message</span>
              <textarea
                placeholder="Tell me about your project"
                {...register("message")}
                rows={6}
                aria-invalid={Boolean(errors.message)}
                className="w-full rounded-xl border border-white/10 bg-[#071a31] px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-400"
              />
              {errors.message ? <p className="text-sm text-rose-300">{errors.message.message}</p> : null}
            </label>
            {serverError ? (
              <div className="rounded-xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-100">
                {serverError}
              </div>
            ) : null}
            {successMessage ? (
              <div className="rounded-xl border border-emerald-400/30 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-100">
                {successMessage}
              </div>
            ) : null}
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex w-full items-center justify-center rounded-xl bg-cyan-400 px-5 py-3 font-semibold text-black transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </div>
    </Section>
  );
}
