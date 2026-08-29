import { cn } from "@/lib/utils";

/**
 * Animated gradient mesh: creates ambient lighting and drifting color orbs
 * across the background.
 */
export default function Mesh({ className }) {
  return (
    <>
      <div className={cn("mesh", className)} aria-hidden="true">
        <i />
        <i />
        <i />
      </div>
      <div className="grain" aria-hidden="true" />
    </>
  );
}

