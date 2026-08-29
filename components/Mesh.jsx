import { cn } from "@/lib/utils";

/**
 * Animated gradient mesh — stands in for SharpLink's looping hero video,
 * but renders as pure CSS so there is no media payload to ship.
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

