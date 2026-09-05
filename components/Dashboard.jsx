import CountUp from "./CountUp";
import { DASHBOARD } from "@/lib/content";
import { cn } from "@/lib/utils";

export default function Dashboard({ className }) {
  return (
    <div
      className={cn(
        "dash rounded-2xl border border-line/60 bg-black/5 backdrop-blur-md overflow-hidden",
        className
      )}
    >
      {DASHBOARD.map((item) => (
        <div
          className="dashCell group relative p-6 sm:p-8 transition-colors duration-300 hover:bg-white/[0.04]"
          key={item.label}
        >
          {/* Top border highlight on cell hover */}
          <div
            className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-orchid/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            aria-hidden="true"
          />

          <div className="l flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.16em] text-white/85">
            {item.live ? (
              <span className="relative flex h-2.5 w-2.5 items-center justify-center">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orchid opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-orchid" />
              </span>
            ) : null}
            <span>{item.label}</span>
          </div>
          <div className="v mt-3.5 font-display font-medium text-[clamp(32px,4vw,54px)] text-white tracking-tight leading-none">
            <CountUp to={item.value} />
            {item.unit ? (
              <span className="u text-[0.45em] text-orchid ml-1 font-mono tracking-normal">
                {item.unit}
              </span>
            ) : null}
          </div>
          <div className="n text-[12.5px] text-white/75 mt-2.5 transition-colors group-hover:text-white">
            {item.note}
          </div>
        </div>
      ))}
    </div>
  );
}


