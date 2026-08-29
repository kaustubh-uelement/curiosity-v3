import { cn } from "@/lib/utils";

const variantMap = {
  default: "badge",
  pill: "pillTag",
  spec: "font-mono text-[11px] text-tx-3 border border-line py-1.5 px-[11px] rounded-lg",
  kicker: "kicker",
  "kicker-active": "kicker on",
};

/**
 * Reusable Badge / Tag / Kicker component.
 */
export default function Badge({
  children,
  variant = "default",
  className,
  as: Component = "span",
  ...props
}) {
  return (
    <Component
      className={cn(variantMap[variant] || variantMap.default, className)}
      {...props}
    >
      {children}
    </Component>
  );
}
