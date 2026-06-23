"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { contactSchema } from "@/lib/validation/contactSchema";

type ContactFormValues = z.input<typeof contactSchema>;

export default function ContactPage() {
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
          setError(field as keyof ContactFormValues, { type: "server", message });
        }
      });

      setServerError(data?.message || "Error sending message. Please try again.");
      return;
    }

    setSuccessMessage(data?.message || "Message sent successfully.");
    reset();
  };

  return (
    <section className="relative overflow-hidden bg-[#06152b] text-white">
      <div
        className="absolute inset-0 opacity-25"
        style={{
          backgroundImage: `radial-gradient(circle at 20% 20%, rgba(34,211,238,0.18), transparent 28%), radial-gradient(circle at 80% 10%, rgba(59,130,246,0.18), transparent 26%), radial-gradient(circle at 50% 90%, rgba(14,165,233,0.16), transparent 30%)`,
        }}
      />

      <div className="relative z-10 mx-auto grid max-w-7xl gap-10 px-6 py-20 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div className="space-y-6">
          <span className="inline-flex rounded-full border border-cyan-400/30 bg-white/5 px-4 py-2 text-xs tracking-[0.2em] text-cyan-100 uppercase">
            Contact
          </span>
          <div>
            <h2 className="text-3xl font-bold tracking-tight md:text-5xl">
              Let&apos;s build something useful.
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-7 text-slate-300 md:text-base">
              Send me a message and I&apos;ll receive it by email.
              I&apos;ll also store the submission in the database for follow-up.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-md">
              <p className="text-xs uppercase tracking-[0.2em] text-cyan-200/70">Email</p>
              <p className="mt-2 text-sm text-white/90">Fast response and confirmation</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-md">
              <p className="text-xs uppercase tracking-[0.2em] text-cyan-200/70">Database</p>
              <p className="mt-2 text-sm text-white/90">Saved for later review</p>
            </div>
          </div>
        </div>

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
    </section>
  );
}