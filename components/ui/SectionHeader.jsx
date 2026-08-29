import Reveal from "@/components/Reveal";
import TextLink from "./TextLink";
import { cn } from "@/lib/utils";

/**
 * Standardized Section Header component with optional kicker, title, lead/subtitle text, and action link.
 */
export default function SectionHeader({
  kicker,
  title,
  lead,
  subtitle,
  action,
  size = "xl",
  className,
  headerClassName,
}) {
  const titleClass = size === "xl" ? "dispXl" : size === "lg" ? "dispLg" : "dispMd";
  const description = subtitle || lead;

  const headerContent = (
    <div className={cn("head", headerClassName)}>
      {kicker && <span className="kicker on">{kicker}</span>}
      {typeof title === "string" ? (
        <h2 className={titleClass}>{title}</h2>
      ) : (
        title
      )}
      {description && <p className="lead">{description}</p>}
    </div>
  );

  if (action) {
    return (
      <div className={cn("headRow", className)}>
        <Reveal>{headerContent}</Reveal>
        {action.href && action.label && (
          <TextLink href={action.href}>{action.label}</TextLink>
        )}
      </div>
    );
  }

  return (
    <div className={cn("headRow", className)}>
      <Reveal>{headerContent}</Reveal>
    </div>
  );
}

