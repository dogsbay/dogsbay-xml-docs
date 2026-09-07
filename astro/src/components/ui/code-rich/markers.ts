/**
 * `[!code …]` annotation hygiene.
 *
 * Shiki's notation transformers consume these markers — but only the
 * ones they can SEE: a marker is recognized when the grammar tokenizes
 * its comment AND the marker ends the line. Anything else reaches the
 * reader as literal text in the code block. Two real cases from the
 * better-auth corpus:
 *
 *   - `package-install` (and every unknown language) falls back to
 *     `plaintext`, which has no comment tokens at all;
 *   - upstream authors mid-line markers — `// [!code highlight] // check
 *     if the user is allowed` — where the marker is not the last thing
 *     on the line.
 *
 * These helpers strip exactly what Shiki cannot process, and strip
 * everything from copy text (a marker pasted into an editor is always
 * wrong).
 */

/** A `[!code …]` annotation carrying its own comment leader. */
const MARKER = /[ \t]*(?:\/\/|#|--|<!--|\/\*|;)[ \t]*\[!code[^\]]*\](?:[ \t]*(?:-->|\*\/))?/g;

/**
 * A bare annotation — upstream also appends one INSIDE an existing
 * comment (`// e.g. "us-east-1" [!code highlight]`), with no leader of
 * its own.
 */
const BARE_MARKER = /[ \t]*\[!code[^\]]*\]/g;

/**
 * Remove the markers Shiki cannot process, leaving the ones it can for
 * the notation transformers to consume.
 *
 * @param code           the block's source
 * @param isPlainGrammar true when highlighting falls back to plaintext
 */
export function stripUnprocessableMarkers(code: string, isPlainGrammar: boolean): string {
  return code
    .split("\n")
    .map((line) => {
      // No grammar → no comment tokens → Shiki sees nothing to strip.
      if (isPlainGrammar) return line.replace(MARKER, "").replace(BARE_MARKER, "");
      let out = "";
      let last = 0;
      for (const m of line.matchAll(MARKER)) {
        const end = m.index + m[0].length;
        if (line.slice(end).trim() === "") break; // ends the line — Shiki handles it
        out += line.slice(last, m.index);
        last = end;
      }
      return out + line.slice(last);
    })
    .join("\n");
}

/** Strip EVERY annotation form — markers must never reach the clipboard. */
export function stripMarkersForCopy(code: string): string {
  return code
    .replace(MARKER, "")
    .replace(BARE_MARKER, "")
    .replace(/\s*\/\/\s*![a-z]+.*$/gm, "")
    .trim();
}
