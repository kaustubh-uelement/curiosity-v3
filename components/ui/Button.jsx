import Link from "next/link";
import { cn } from "@/lib/utils";

const variantMap = {
  primary: "btnP bg-mist text-ink hover:bg-cloud hover:shadow-[0_0_24px_rgba(205,228,255,0.30)]",
  glass: "btnG border border-line-2 text-tx bg-glass backdrop-blur-[20px] hover:border-tx hover:bg-glass-2 hover:shadow-[0_0_20px_rgba(240,247,255,0.10)]",
  electric: "btnE bg-electric text-white hover:bg-violet hover:shadow-[0_0_30px_rgba(30,125,255,0.4)]",
  p: "btnP bg-mist text-ink hover:bg-cloud hover:shadow-[0_0_24px_rgba(205,228,255,0.30)]",
  g: "btnG border border-line-2 text-tx bg-glass backdrop-blur-[20px] hover:border-tx hover:bg-glass-2",
  e: "btnE bg-electric text-white hover:bg-violet hover:shadow-[0_0_30px_rgba(30,125,255,0.4)]",
};

const sizeMap = {
  sm: "btnSm py-2.5 px-5 text-[13.5px]",
  md: "py-[15px] px-[30px] text-[14.5px]",
  lg: "py-4 px-8 text-base",
};

/**
 * Universal polymorphic Button component with micro-interactions,
 * focus rings, and hover physics.
 */
export default function Button({
  children,
  href,
  variant = "primary",
  size = "md",
  shimmer = false,
  className,
  ...props
}) {
  const variantClass = variantMap[variant] || variantMap.primary;
  const sizeClass = sizeMap[size] || sizeMap.md;
  const combinedClassName = cn(
    "btn relative inline-flex items-center justify-center gap-2.5 rounded-r-pill font-medium tracking-tight cursor-pointer overflow-hidden whitespace-nowrap flex-shrink-0 transition-all duration-300 active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-orchid focus-visible:outline-offset-2",
    variantClass,
    sizeClass,
    className
  );


  const innerContent = (
    <>
      <span className="relative z-10 inline-flex items-center gap-2.5">
        {children}
      </span>
      {shimmer && (
        <span
          className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 group-hover:translate-x-full"
          aria-hidden="true"
        />
      )}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={combinedClassName} {...props}>
        {innerContent}
      </Link>
    );
  }

  return (
    <button className={combinedClassName} {...props}>
      {innerContent}
    </button>
  );
}
