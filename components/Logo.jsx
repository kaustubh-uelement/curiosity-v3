import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Curiosity AI Brand Logo Component
 * - variant="full" (default): White horizontal brand wordmark logo (curiosity-ai-white-logo.png)
 * - variant="icon": Square favicon / app icon mark (curiosity-ai-icon.png)
 */
export default function Logo({
  variant = "full",
  className,
  priority = false,
  width,
  height,
}) {
  if (variant === "icon") {
    const size = width || height || 28;
    return (
      <Image
        src="/curiosity-ai-icon.png"
        alt="Curiosity AI Icon"
        width={size}
        height={size}
        priority={priority}
        className={cn("logoMark flex-none object-contain", className)}
      />
    );
  }

  // Full white brand logo (3400 x 400 aspect ratio)
  const defaultWidth = width || 175;
  const defaultHeight = height || 21;

  return (
    <Image
      src="/curiosity-ai-white-logo.png"
      alt="Curiosity AI"
      width={defaultWidth}
      height={defaultHeight}
      priority={priority}
      className={cn("h-6 sm:h-7 w-auto object-contain flex-none", className)}
    />
  );
}

