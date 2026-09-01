"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import { submitCareerApplication } from "@/lib/mainstay";

export default function CareerApplicationForm({ job, onCancel, onSuccess }) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    currentLocation: "",
    linkedin: "",
    resumeUrl: "",
    coverLetter: "",
  });

  const [status, setStatus] = useState("idle"); // idle | submitting | success | error
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email) {
      setStatus("error");
      setErrorMessage("Please provide your full name and email address.");
      return;
    }

    setStatus("submitting");
    setErrorMessage("");

    try {
      await submitCareerApplication(job.id, formData);
      setStatus("success");
      if (onSuccess) onSuccess();
    } catch (err) {
      console.error("Career application error:", err);
      setStatus("error");
      setErrorMessage(
        err.message || "Failed to submit application. Please try again or email careers@curiosityai.in."
      );
    }
  };

  return (
    <div className="rounded-2xl border border-white/15 bg-ink-2/90 p-6 sm:p-8 backdrop-blur-2xl shadow-2xl">
      <div className="mb-6 border-b border-white/10 pb-4">
        <div className="flex items-center gap-2 mb-2">
          <Badge variant="kicker">{job.department}</Badge>
          <Badge variant="default" className="text-white/80">{job.location}</Badge>
        </div>
        <h3 className="text-xl sm:text-2xl font-normal text-white">
          Apply for {job.title}
        </h3>
        <p className="mt-1 text-xs sm:text-sm text-white/60">
          Experience level: {job.experience} · {job.type}
        </p>
      </div>

      {status === "success" ? (
        <div className="rounded-xl border border-emerald-500/30 bg-emerald-950/40 p-6 text-center animate-fadeIn">
          <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 6L9 17l-5-5" />
            </svg>
          </div>
          <h4 className="text-lg font-medium text-white">Application Submitted!</h4>
          <p className="mt-2 text-xs sm:text-sm text-white/80 max-w-sm mx-auto">
            Your application has been routed directly to our engineering hiring lead in Mumbai. We will review your profile and reach out shortly.
          </p>
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="mt-5 inline-flex items-center justify-center rounded-lg bg-white/10 px-4 py-2 text-xs font-mono uppercase tracking-wider text-white hover:bg-white/20 transition-colors"
            >
              Close
            </button>
          )}
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="fullName" className="block text-xs font-mono uppercase tracking-wider text-white/70 mb-1">
                Full Name <span className="text-orchid">*</span>
              </label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                required
                value={formData.fullName}
                onChange={handleChange}
                placeholder="e.g. Rahul Verma"
                className="w-full rounded-lg border border-white/15 bg-black/40 px-3.5 py-2 text-sm text-white placeholder-white/30 focus:border-orchid/60 focus:outline-none focus:ring-1 focus:ring-orchid/50 font-sans"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-xs font-mono uppercase tracking-wider text-white/70 mb-1">
                Email Address <span className="text-orchid">*</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="rahul@example.com"
                className="w-full rounded-lg border border-white/15 bg-black/40 px-3.5 py-2 text-sm text-white placeholder-white/30 focus:border-orchid/60 focus:outline-none focus:ring-1 focus:ring-orchid/50 font-sans"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div>
              <label htmlFor="phone" className="block text-xs font-mono uppercase tracking-wider text-white/70 mb-1">
                Phone Number
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+91 98765 43210"
                className="w-full rounded-lg border border-white/15 bg-black/40 px-3.5 py-2 text-sm text-white placeholder-white/30 focus:border-orchid/60 focus:outline-none focus:ring-1 focus:ring-orchid/50 font-sans"
              />
            </div>

            <div>
              <label htmlFor="currentLocation" className="block text-xs font-mono uppercase tracking-wider text-white/70 mb-1">
                Location
              </label>
              <input
                id="currentLocation"
                name="currentLocation"
                type="text"
                value={formData.currentLocation}
                onChange={handleChange}
                placeholder="Mumbai, India"
                className="w-full rounded-lg border border-white/15 bg-black/40 px-3.5 py-2 text-sm text-white placeholder-white/30 focus:border-orchid/60 focus:outline-none focus:ring-1 focus:ring-orchid/50 font-sans"
              />
            </div>

            <div>
              <label htmlFor="linkedin" className="block text-xs font-mono uppercase tracking-wider text-white/70 mb-1">
                LinkedIn / GitHub
              </label>
              <input
                id="linkedin"
                name="linkedin"
                type="url"
                value={formData.linkedin}
                onChange={handleChange}
                placeholder="https://linkedin.com/..."
                className="w-full rounded-lg border border-white/15 bg-black/40 px-3.5 py-2 text-sm text-white placeholder-white/30 focus:border-orchid/60 focus:outline-none focus:ring-1 focus:ring-orchid/50 font-sans"
              />
            </div>
          </div>

          <div>
            <label htmlFor="resumeUrl" className="block text-xs font-mono uppercase tracking-wider text-white/70 mb-1">
              Resume / CV Link (Google Drive, Notion, PDF Link)
            </label>
            <input
              id="resumeUrl"
              name="resumeUrl"
              type="url"
              value={formData.resumeUrl}
              onChange={handleChange}
              placeholder="https://drive.google.com/..."
              className="w-full rounded-lg border border-white/15 bg-black/40 px-3.5 py-2 text-sm text-white placeholder-white/30 focus:border-orchid/60 focus:outline-none focus:ring-1 focus:ring-orchid/50 font-sans"
            />
          </div>

          <div>
            <label htmlFor="coverLetter" className="block text-xs font-mono uppercase tracking-wider text-white/70 mb-1">
              Brief Intro / Relevant Experience
            </label>
            <textarea
              id="coverLetter"
              name="coverLetter"
              rows={3}
              value={formData.coverLetter}
              onChange={handleChange}
              placeholder="Briefly describe your experience with high-density power, data centres, or GPU cluster deployment..."
              className="w-full rounded-lg border border-white/15 bg-black/40 px-3.5 py-2 text-sm text-white placeholder-white/30 focus:border-orchid/60 focus:outline-none focus:ring-1 focus:ring-orchid/50 font-sans resize-none"
            />
          </div>

          {status === "error" && (
            <div className="rounded-lg border border-red-500/30 bg-red-950/40 p-3 text-xs text-red-300">
              {errorMessage}
            </div>
          )}

          <div className="flex items-center justify-end gap-3 pt-2">
            {onCancel && (
              <button
                type="button"
                onClick={onCancel}
                className="px-4 py-2 text-xs font-mono uppercase tracking-wider text-white/60 hover:text-white transition-colors"
              >
                Cancel
              </button>
            )}
            <Button
              type="submit"
              variant="primary"
              disabled={status === "submitting"}
              className="!px-6 !py-2 text-xs"
            >
              {status === "submitting" ? "Submitting..." : "Send Application"}
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}
