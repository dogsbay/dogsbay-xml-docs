import { Collapsible } from "@dogsbay/primitives/collapsible";

function init(root: HTMLElement) {
  if (root.hasAttribute("data-initialized")) return;
  root.setAttribute("data-initialized", "");

  const trigger = root.querySelector<HTMLElement>("[data-part='trigger']");
  const content = root.querySelector<HTMLElement>("[data-part='content']");
  if (!trigger || !content) return;

  const disabled = root.hasAttribute("data-disabled");
  if (disabled) {
    trigger.setAttribute("disabled", "");
    trigger.setAttribute("aria-disabled", "true");
  }

  const collapsible = new Collapsible(trigger, content, {
    onToggle(open) {
      root.setAttribute("data-state", open ? "open" : "closed");
      content.setAttribute("data-state", open ? "open" : "closed");
    },
  });

  // Open by default if specified
  if (root.hasAttribute("data-default-open")) {
    collapsible.expand();
    content.setAttribute("data-state", "open");
  }
}

function initAll() {
  document
    .querySelectorAll<HTMLElement>("[data-component='collapsible']")
    .forEach(init);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initAll);
} else {
  initAll();
}
document.addEventListener("astro:page-load", initAll);
