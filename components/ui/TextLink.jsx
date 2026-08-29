import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * Standardized arrow text link with hover gap animation.
 */
export default function TextLink({
  children,
  href,
  className,
  external = false,
  ...props
}) {
  const content = (
    <>
      {children}
      <svg
        width="14"
        height="14"
        viewBox="0 0 18 18"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M4 9h10M9.5 4.5 14 9l-4.5 4.5"
          stroke="currentColor"
          strokeWidth="1.5"
        />
      </svg>
    </>
  );

  if (external || href.startsWith("mailto:") || href.startsWith("http")) {
    return (
      <a
        href={href}
        className={cn("tlink", className)}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...props}
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={cn("tlink", className)} {...props}>
      {content}
    </Link>
  );
}
