/**
 * Resolve an icon shortcode for the Alert component.
 *
 * Accepts two formats:
 *   - `library:name` — e.g. "lucide:rocket", "material:check-circle", "simple:github"
 *   - bare shortcode — treated as emoji (e.g. "rocket" → 🚀)
 *
 * Returns an inline SVG string or a span with the emoji character. Returns
 * null when the shortcode can't be resolved (caller should fall back to the
 * variant's default icon).
 */
import { createIconRegistry } from "@dogsbay/icons";

const registry = createIconRegistry();

export function resolveIcon(shortcode: string): string | null {
  const colonIdx = shortcode.indexOf(":");
  const [library, name] = colonIdx >= 0
    ? [shortcode.slice(0, colonIdx), shortcode.slice(colonIdx + 1)]
    : ["emoji", shortcode];

  const resolved = registry.resolve(library, name);
  if (!resolved) return null;

  // Emoji resolve to Unicode characters; wrap for consistent sizing/positioning
  // with the SVG icons in the Alert layout.
  if (library === "emoji") {
    return `<span aria-hidden="true" style="font-size:1em;line-height:1;display:inline-block;width:1em;text-align:center;">${resolved}</span>`;
  }

  return resolved;
}
