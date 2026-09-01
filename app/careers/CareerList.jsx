"use client";

import { useState } from "react";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import CareerApplicationForm from "@/components/CareerApplicationForm";

export default function CareerList({ initialCareers = [] }) {
  const [selectedJob, setSelectedJob] = useState(null);
  const [filterDept, setFilterDept] = useState("all");

  const departments = [
    "all",
    ...new Set(initialCareers.map((c) => c.department).filter(Boolean)),
  ];

  const filteredCareers =
    filterDept === "all"
      ? initialCareers
      : initialCareers.filter((c) => c.department === filterDept);

  return (
    <div className="space-y-8">
      {/* Department Filter Pills */}
      {departments.length > 2 && (
        <div className="flex flex-wrap gap-2 pb-2">
          {departments.map((dept) => (
            <button
              key={dept}
              type="button"
              onClick={() => setFilterDept(dept)}
              className={`rounded-full px-4 py-1.5 text-xs font-mono tracking-wider uppercase transition-all ${
                filterDept === dept
                  ? "bg-white text-ink font-semibold shadow-md"
                  : "bg-white/[0.05] text-white/70 hover:bg-white/10 hover:text-white"
              }`}
            >
              {dept === "all" ? "All Departments" : dept}
            </button>
          ))}
        </div>
      )}

      {/* Application Modal / Focus View */}
      {selectedJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <CareerApplicationForm
              job={selectedJob}
              onCancel={() => setSelectedJob(null)}
              onSuccess={() => {
                setTimeout(() => setSelectedJob(null), 3000);
              }}
            />
          </div>
        </div>
      )}

      {/* Job Cards Grid */}
      {filteredCareers.length === 0 ? (
        <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-12 text-center">
          <p className="text-white/60">No open positions currently in this category.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {filteredCareers.map((job) => (
            <div
              key={job.id}
              className="group relative overflow-hidden rounded-2xl border border-line bg-white/[0.02] p-6 sm:p-8 backdrop-blur-md transition-all duration-300 hover:border-orchid/40 hover:bg-white/[0.04]"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <Badge variant="kicker">{job.department}</Badge>
                    <Badge variant="default" className="text-white/80">{job.location}</Badge>
                    <span className="text-xs font-mono text-white/50">{job.experience}</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-normal text-white group-hover:text-orchid transition-colors">
                    {job.title}
                  </h3>
                </div>
                <Button
                  type="button"
                  variant="primary"
                  onClick={() => setSelectedJob(job)}
                  className="self-start sm:self-auto !px-5 !py-2 text-xs flex-none"
                >
                  Apply for Role
                </Button>
              </div>

              <p className="text-sm sm:text-base text-white/70 leading-relaxed mb-6">
                {job.description}
              </p>

              {/* Responsibilities & Skills */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-white/10">
                {job.responsibilities && job.responsibilities.length > 0 && (
                  <div>
                    <h4 className="text-xs font-mono uppercase tracking-wider text-white/80 mb-2">
                      Key Responsibilities
                    </h4>
                    <ul className="space-y-1.5 text-xs sm:text-sm text-white/60 list-disc list-inside">
                      {job.responsibilities.map((r, i) => (
                        <li key={i}>{r}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {job.requiredSkills && job.requiredSkills.length > 0 && (
                  <div>
                    <h4 className="text-xs font-mono uppercase tracking-wider text-white/80 mb-2">
                      Key Domain Skills
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {job.requiredSkills.map((s, i) => (
                        <Badge key={i} variant="spec" className="text-[11px]">
                          {s}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
