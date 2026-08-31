"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import { submitContactInquiry } from "@/lib/mainstay";

const INQUIRY_TYPES = [
  { id: "factory", label: "AI Factory Partner" },
  { id: "capacity", label: "Reserve GPU Capacity" },
  { id: "investor", label: "Investor / Press" },
  { id: "general", label: "General Inquiry" },
];

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    inquiryType: "AI Factory Partner",
    message: "",
  });

  const [status, setStatus] = useState("idle"); // idle | submitting | success | error
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleInquiryTypeSelect = (typeLabel) => {
    setFormData((prev) => ({ ...prev, inquiryType: typeLabel }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatus("error");
      setErrorMessage("Please fill in your name, email, and message.");
      return;
    }

    setStatus("submitting");
    setErrorMessage("");

    try {
      await submitContactInquiry(formData);
      setStatus("success");
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        inquiryType: "AI Factory Partner",
        message: "",
      });
    } catch (err) {
      console.error("Contact submission error:", err);
      setStatus("error");
      setErrorMessage(
        err.message || "Failed to submit your inquiry. Please try again or email us directly."
      );
    }
  };

  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/15 bg-ink-2/70 p-6 sm:p-10 backdrop-blur-xl shadow-[0_12px_40px_rgba(0,0,0,0.5)]">
      {/* Decorative top ambient highlight */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-orchid/50 to-transparent"
        aria-hidden="true"
      />

      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <Badge variant="kicker">Direct Connection</Badge>
          <Badge variant="default" className="text-white/70">Mainstay CMS Lead API</Badge>
        </div>
        <h2 className="text-2xl sm:text-3xl font-normal tracking-tight text-white">
          Send a Deployment Request
        </h2>
        <p className="mt-2 text-sm sm:text-base text-white/70">
          Connect directly with our engineering and deployment team in Worli, Mumbai.
        </p>
      </div>

      {status === "success" ? (
        <div className="rounded-xl border border-emerald-500/30 bg-emerald-950/40 p-6 sm:p-8 text-center animate-fadeIn">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 6L9 17l-5-5" />
            </svg>
          </div>
          <h3 className="text-lg sm:text-xl font-medium text-white">Inquiry Received</h3>
          <p className="mt-2 text-sm text-white/80 max-w-md mx-auto">
            Your request has been recorded into the Curiosity AI platform pipeline. Our deployment lead will respond within 24 hours.
          </p>
          <button
            type="button"
            onClick={() => setStatus("idle")}
            className="mt-6 inline-flex items-center justify-center rounded-lg bg-white/10 px-5 py-2 text-xs font-mono uppercase tracking-wider text-white hover:bg-white/20 transition-colors"
          >
            Submit another inquiry
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Inquiry Type Selection */}
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-white/70 mb-2.5">
              I am reaching out as:
            </label>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {INQUIRY_TYPES.map((type) => {
                const isSelected = formData.inquiryType === type.label;
                return (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() => handleInquiryTypeSelect(type.label)}
                    className={`rounded-lg border px-3 py-2 text-center text-xs transition-all font-medium ${
                      isSelected
                        ? "border-orchid bg-orchid/20 text-white shadow-[0_0_15px_rgba(205,130,255,0.25)]"
                        : "border-white/10 bg-black/30 text-white/70 hover:border-white/25 hover:text-white"
                    }`}
                  >
                    {type.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Name & Email Row */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="name" className="block text-xs font-mono uppercase tracking-wider text-white/70 mb-1.5">
                Full Name <span className="text-orchid">*</span>
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Anand Sharma"
                className="w-full rounded-lg border border-white/15 bg-black/40 px-4 py-2.5 text-sm text-white placeholder-white/30 focus:border-orchid/60 focus:outline-none focus:ring-1 focus:ring-orchid/50 transition-all font-sans"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-xs font-mono uppercase tracking-wider text-white/70 mb-1.5">
                Work Email <span className="text-orchid">*</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="anand@company.com"
                className="w-full rounded-lg border border-white/15 bg-black/40 px-4 py-2.5 text-sm text-white placeholder-white/30 focus:border-orchid/60 focus:outline-none focus:ring-1 focus:ring-orchid/50 transition-all font-sans"
              />
            </div>
          </div>

          {/* Company & Phone Row */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="company" className="block text-xs font-mono uppercase tracking-wider text-white/70 mb-1.5">
                Company / Organization
              </label>
              <input
                id="company"
                name="company"
                type="text"
                value={formData.company}
                onChange={handleChange}
                placeholder="e.g. AI Factory / Neo-Cloud Inc."
                className="w-full rounded-lg border border-white/15 bg-black/40 px-4 py-2.5 text-sm text-white placeholder-white/30 focus:border-orchid/60 focus:outline-none focus:ring-1 focus:ring-orchid/50 transition-all font-sans"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-xs font-mono uppercase tracking-wider text-white/70 mb-1.5">
                Phone Number (Optional)
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+91 98765 43210"
                className="w-full rounded-lg border border-white/15 bg-black/40 px-4 py-2.5 text-sm text-white placeholder-white/30 focus:border-orchid/60 focus:outline-none focus:ring-1 focus:ring-orchid/50 transition-all font-sans"
              />
            </div>
          </div>

          {/* Message */}
          <div>
            <label htmlFor="message" className="block text-xs font-mono uppercase tracking-wider text-white/70 mb-1.5">
              Requirements / Project Overview <span className="text-orchid">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              required
              value={formData.message}
              onChange={handleChange}
              placeholder="Tell us about your power capacity, target MW timeline, or compute cluster requirements..."
              className="w-full rounded-lg border border-white/15 bg-black/40 px-4 py-2.5 text-sm text-white placeholder-white/30 focus:border-orchid/60 focus:outline-none focus:ring-1 focus:ring-orchid/50 transition-all font-sans resize-none"
            />
          </div>

          {status === "error" && (
            <div className="rounded-lg border border-red-500/30 bg-red-950/40 p-3.5 text-xs text-red-300">
              {errorMessage}
            </div>
          )}

          <div className="flex items-center justify-between pt-2">
            <span className="text-xs text-white/50 font-mono">
              Direct API route · Encrypted
            </span>
            <Button
              type="submit"
              variant="primary"
              disabled={status === "submitting"}
              className="!px-7 !py-2.5"
            >
              {status === "submitting" ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Connecting...
                </span>
              ) : (
                "Deploy with Curiosity"
              )}
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}
