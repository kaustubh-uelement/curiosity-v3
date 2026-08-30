import { PARTNERS } from "@/lib/content";
import { cn } from "@/lib/utils";

export default function Marquee({ className }) {
  const items = [...PARTNERS, ...PARTNERS, ...PARTNERS, ...PARTNERS];
  return (
    <div className={cn("marq", className)} aria-label="AI Factory partners ticker">
      <div className="marqTrack">
        {items.map((partner, i) => (
          <span key={`${partner.name}-${i}`} aria-hidden={i >= PARTNERS.length}>
            <b>{partner.name}</b>
            {partner.role}
          </span>
        ))}
      </div>
    </div>
  );
}

