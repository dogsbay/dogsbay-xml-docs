/**
 * Footnote runtime — hover shows tooltip, click navigates to definition.
 */
import { setupFloating } from "@dogsbay/primitives/floating";

const initialized = new WeakSet<HTMLElement>();

function createPopover(content: string): HTMLElement {
  const el = document.createElement("div");
  el.className =
    "fixed z-50 max-w-sm rounded-lg border bg-popover p-3 text-sm text-popover-foreground shadow-md";
  el.innerHTML = content;
  el.setAttribute("role", "tooltip");
  el.hidden = true;
  document.body.appendChild(el);
  return el;
}

function initFootnote(trigger: HTMLElement) {
  if (initialized.has(trigger)) return;
  initialized.add(trigger);

  const content = trigger.getAttribute("data-content") || "";
  let popover: HTMLElement | null = null;
  let cleanup: (() => void) | null = null;
  let hideTimeout: ReturnType<typeof setTimeout> | null = null;

  function show() {
    if (hideTimeout) { clearTimeout(hideTimeout); hideTimeout = null; }
    if (!popover) {
      popover = createPopover(content);
      // Keep popover open while hovering it
      popover.addEventListener("mouseenter", () => {
        if (hideTimeout) { clearTimeout(hideTimeout); hideTimeout = null; }
      });
      popover.addEventListener("mouseleave", () => {
        hideTimeout = setTimeout(hide, 150);
      });
    }
    popover.hidden = false;
    cleanup = setupFloating(trigger, popover, {
      placement: "top",
      offset: 8,
    });
  }

  function hide() {
    if (popover) popover.hidden = true;
    if (cleanup) { cleanup(); cleanup = null; }
    hideTimeout = null;
  }

  // Hover to show tooltip
  trigger.addEventListener("mouseenter", show);
  trigger.addEventListener("mouseleave", () => {
    hideTimeout = setTimeout(hide, 150);
  });

  // Focus for keyboard accessibility
  trigger.addEventListener("focus", show);
  trigger.addEventListener("blur", () => {
    hideTimeout = setTimeout(hide, 150);
  });

  // Click navigates to footnote definition (default <a> behavior)
  // No preventDefault — let the browser follow the href="#fn-{label}"
}

function initAll() {
  document.querySelectorAll<HTMLElement>("[data-footnote]").forEach(initFootnote);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initAll);
} else {
  initAll();
}

document.addEventListener("astro:page-load", initAll);
