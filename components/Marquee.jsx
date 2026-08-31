import { PARTNERS as DEFAULT_PARTNERS } from "@/lib/content";
import { cn } from "@/lib/utils";

export default function Marquee({ className, partners }) {
  const partnerList = partners && partners.length > 0 ? partners : DEFAULT_PARTNERS;
  const items = [...partnerList, ...partnerList, ...partnerList, ...partnerList];
  return (
    <div className={cn("marq", className)} aria-label="AI Factory partners ticker">
      <div className="marqTrack">
        {items.map((partner, i) => (
          <span key={`${partner.name}-${i}`} aria-hidden={i >= partnerList.length}>
            <b>{partner.name}</b>
            {partner.role}
          </span>
        ))}
      </div>
    </div>
  );
}

