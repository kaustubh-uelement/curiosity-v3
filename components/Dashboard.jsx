import CountUp from "./CountUp";
import { DASHBOARD } from "@/lib/content";
import { cn } from "@/lib/utils";

export default function Dashboard({ className }) {
  return (
    <div className={cn("dash", className)}>
      {DASHBOARD.map((item) => (
        <div className="dashCell" key={item.label}>
          <div className="l">
            {item.live ? <span className="dot" aria-hidden="true" /> : null}
            {item.label}
          </div>
          <div className="v">
            <CountUp to={item.value} />
            {item.unit ? <span className="u">{item.unit}</span> : null}
          </div>
          <div className="n">{item.note}</div>
        </div>
      ))}
    </div>
  );
}

