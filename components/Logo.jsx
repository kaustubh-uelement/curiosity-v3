import { cn } from "@/lib/utils";

/**
 * Curiosity AI brand SVG logo mark.
 */
export default function Logo({ size = 26, className }) {
  return (
    <svg
      className={cn("logoMark flex-none", className)}
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="curiosityLogo" x1="2" y1="2" x2="30" y2="30" gradientUnits="userSpaceOnUse">
          <stop stopColor="#CD82FF" />
          <stop offset="0.5" stopColor="#8752FA" />
          <stop offset="1" stopColor="#4500F9" />
        </linearGradient>
      </defs>
      <path
        d="M16 1.5 L19.8 12.2 L30.5 16 L19.8 19.8 L16 30.5 L12.2 19.8 L1.5 16 L12.2 12.2 Z"
        fill="url(#curiosityLogo)"
      />
    </svg>
  );
}

