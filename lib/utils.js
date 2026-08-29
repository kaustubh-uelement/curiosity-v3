import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merges class names safely with Tailwind conflict resolution.
 * @param {...any} inputs - Class names, conditionals, or objects.
 * @returns {string} Merged class names.
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
