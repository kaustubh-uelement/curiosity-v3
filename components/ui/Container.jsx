import { cn } from "@/lib/utils";

/**
 * Standardized responsive container wrapper.
 * @param {boolean} narrow - If true, uses narrow max-width (940px) instead of default (1320px).
 */
export default function Container({
  children,
  narrow = false,
  className,
  as: Component = "div",
  ...props
}) {
  return (
    <Component
      className={cn(narrow ? "wrapNar" : "wrap", className)}
      {...props}
    >
      {children}
    </Component>
  );
}
