import Link from "next/link";
import { cn } from "@/lib/utils";

const variantMap = {
  primary: "btnP",
  glass: "btnG",
  electric: "btnE",
  p: "btnP",
  g: "btnG",
  e: "btnE",
};

const sizeMap = {
  sm: "btnSm",
  md: "",
  lg: "text-base py-4 px-8",
};

/**
 * Universal polymorphic Button component.
 * Renders as a Next.js Link when `href` is provided, otherwise as a `<button>`.
 */
export default function Button({
  children,
  href,
  variant = "primary",
  size = "md",
  className,
  ...props
}) {
  const variantClass = variantMap[variant] || variantMap.primary;
  const sizeClass = sizeMap[size] || "";
  const combinedClassName = cn("btn", variantClass, sizeClass, className);

  if (href) {
    return (
      <Link href={href} className={combinedClassName} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button className={combinedClassName} {...props}>
      {children}
    </button>
  );
}
