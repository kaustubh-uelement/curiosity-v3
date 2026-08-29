import { cn } from "@/lib/utils";

/**
 * Reusable Card component supporting hover lifts, tags, numbers, and specs.
 */
export default function Card({
  children,
  hoverable = false,
  tag,
  number,
  title,
  description,
  specs,
  className,
  as: Component = "div",
  ...props
}) {
  return (
    <Component
      className={cn("card", hoverable && "cardH", className)}
      {...props}
    >
      {number != null && <div className="cNum">{number}</div>}
      {tag && <span className="cTag">{tag}</span>}
      {title && <h3>{title}</h3>}
      {description && <p>{description}</p>}
      {specs && specs.length > 0 && (
        <div className="specs">
          {specs.map((spec) => (
            <span key={spec}>{spec}</span>
          ))}
        </div>
      )}
      {children}
    </Component>
  );
}
