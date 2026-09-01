import { cn } from "@/lib/utils";

const variantMap = {
  default:
    "badge inline-flex items-center gap-2 py-2 px-4 rounded-r-pill border border-line-2 bg-glass backdrop-blur-[20px] font-mono text-[11.5px] uppercase tracking-[0.1em] text-tx-2 shadow-sm",
  pill:
    "pillTag inline-flex items-center py-3 px-5 rounded-r-pill text-sm text-tx-2 border border-line bg-glass backdrop-blur-[20px] transition-all duration-300 hover:border-line-2 hover:text-tx hover:-translate-y-0.5 hover:shadow-[0_4px_16px_rgba(65,126,243,0.2)] cursor-default select-none",
  spec:
    "inline-flex items-center font-mono text-[11px] text-tx-3 border border-line py-1.5 px-3 rounded-lg bg-white/[0.02] transition-colors duration-200 hover:text-tx-2 hover:border-line-2",
  kicker:
    "kicker font-mono text-[11px] tracking-[0.2em] uppercase text-tx-3 inline-block select-none",
  "kicker-active":
    "kicker on font-mono text-[11px] tracking-[0.2em] uppercase text-orchid inline-flex items-center gap-1.5 select-none",
};

/**
 * Reusable Badge / Tag / Kicker component with micro-animations.
 */
export default function Badge({
  children,
  variant = "default",
  dot = false,
  className,
  as: Component = "span",
  ...props
}) {
  return (
    <Component
      className={cn(variantMap[variant] || variantMap.default, className)}
      {...props}
    >
      {dot && (
        <span
          className="w-1.5 h-1.5 rounded-full bg-orchid animate-pulse"
          aria-hidden="true"
        />
      )}
      {children}
    </Component>
  );
}
