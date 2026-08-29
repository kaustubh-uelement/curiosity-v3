import Mesh from "@/components/Mesh";
import Container from "./Container";
import Badge from "./Badge";
import { cn } from "@/lib/utils";

/**
 * Reusable interior page hero component.
 */
export default function PageHero({
  kicker,
  title,
  lead,
  children,
  className,
}) {
  return (
    <header className={cn("pHero", className)}>
      <Mesh />
      <Container className="pHeroIn">
        {kicker && <Badge variant="kicker-active">{kicker}</Badge>}
        <h1 className="dispXl">{title}</h1>
        {lead && <p className="lead">{lead}</p>}
        {children}
      </Container>
    </header>
  );
}
