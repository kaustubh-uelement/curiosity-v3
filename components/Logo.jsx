import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Curiosity AI Brand Logo Component
 * - variant="full" | "purple" (default): Purple horizontal brand wordmark logo (curiosity-ai-purple-logo.png)
 * - variant="icon": Square favicon / app icon mark (curiosity-ai-icon-purple.png)
 * - variant="blue": Electric blue horizontal brand wordmark logo (curiosity-ai-blue-logo.png)
 * - variant="white": White horizontal brand wordmark logo (curiosity-ai-white-logo.png)
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
        src="/curiosity-ai-icon-purple.png"
        alt="Curiosity AI Icon"
        width={size}
        height={size}
        priority={priority}
        className={cn("logoMark flex-none object-contain", className)}
      />
    );
  }

  const defaultWidth = width || 175;
  const defaultHeight = height || 21;

  if (variant === "blue") {
    return (
      <Image
        src="/curiosity-ai-blue-logo.png"
        alt="Curiosity AI"
        width={defaultWidth}
        height={defaultHeight}
        priority={priority}
        className={cn("h-6 sm:h-7 w-auto object-contain flex-none", className)}
      />
    );
  }

  if (variant === "white") {
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

  // Full purple brand logo (3400 x 400 aspect ratio)
  return (
    <Image
      src="/curiosity-ai-purple-logo.png"
      alt="Curiosity AI"
      width={defaultWidth}
      height={defaultHeight}
      priority={priority}
      className={cn("h-6 sm:h-7 w-auto object-contain flex-none", className)}
    />
  );
}

