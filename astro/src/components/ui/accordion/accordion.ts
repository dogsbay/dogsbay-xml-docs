import { CompositeNavigation } from "@dogsbay/primitives/composite";
import { Collapsible } from "@dogsbay/primitives/collapsible";

interface AccordionItem {
  el: HTMLElement;
  value: string;
  collapsible: Collapsible;
  disabled: boolean;
}

interface AccordionInstance {
  root: HTMLElement;
  type: "single" | "multiple";
  items: AccordionItem[];
  nav: CompositeNavigation;
  openValues: Set<string>;
}

const instances = new WeakMap<HTMLElement, AccordionInstance>();

function initAccordion(root: HTMLElement) {
  if (instances.has(root)) return;

  const type = (root.dataset.type as "single" | "multiple") || "single";
  const defaultStr = root.dataset.defaultValue || "";
  const defaultValues = defaultStr ? defaultStr.split(",") : [];

  const itemEls = Array.from(
    root.querySelectorAll("[data-part='item']"),
  ) as HTMLElement[];

  const items = itemEls
    .map((el) => {
      const trigger = el.querySelector(
        "[data-part='trigger']",
      ) as HTMLElement | null;
      const content = el.querySelector(
        "[data-part='content']",
      ) as HTMLElement | null;
      if (!trigger || !content) return null;

      const value = el.dataset.value || "";
      const disabled = el.hasAttribute("data-disabled");

      if (disabled) {
        trigger.setAttribute("disabled", "");
        trigger.setAttribute("aria-disabled", "true");
      }

      // Create a Collapsible instance for each item
      // We pass onToggle to coordinate single/multiple behavior
      const collapsible = new Collapsible(trigger, content, {
        onToggle: (open) => {
          if (open) {
            onItemExpanded(root, value);
          } else {
            onItemCollapsed(root, value);
          }
        },
      });

      return { el, value, collapsible, disabled };
    })
    .filter(Boolean) as AccordionItem[];

  // Keyboard navigation on triggers
  const nav = new CompositeNavigation(root, "[data-part='trigger']", {
    orientation: "vertical",
    loop: true,
    homeEnd: true,
  });

  const instance: AccordionInstance = {
    root,
    type,
    items,
    nav,
    openValues: new Set(),
  };

  instances.set(root, instance);

  // Activate keyboard nav
  nav.activate();

  // Set initial tabindex for roving
  items.forEach((item, i) => {
    item.collapsible.trigger.setAttribute("tabindex", i === 0 ? "0" : "-1");
  });

  // Set initial open state
  defaultValues.forEach((value) => {
    const item = items.find((i) => i.value === value && !i.disabled);
    if (item) {
      item.collapsible.expand();
    }
  });
}

function onItemExpanded(root: HTMLElement, value: string) {
  const instance = instances.get(root);
  if (!instance) return;

  // In single mode, collapse all others
  if (instance.type === "single") {
    for (const openValue of instance.openValues) {
      if (openValue !== value) {
        const other = instance.items.find((i) => i.value === openValue);
        if (other) {
          other.collapsible.collapse();
        }
      }
    }
  }

  instance.openValues.add(value);
  const item = instance.items.find((i) => i.value === value);
  if (item) {
    item.el.setAttribute("data-state", "open");
  }

  root.dispatchEvent(
    new CustomEvent("base-accordion:change", {
      detail: { value, open: true, openValues: [...instance.openValues] },
      bubbles: true,
    }),
  );
}

function onItemCollapsed(root: HTMLElement, value: string) {
  const instance = instances.get(root);
  if (!instance) return;

  instance.openValues.delete(value);
  const item = instance.items.find((i) => i.value === value);
  if (item) {
    item.el.removeAttribute("data-state");
  }

  root.dispatchEvent(
    new CustomEvent("base-accordion:change", {
      detail: { value, open: false, openValues: [...instance.openValues] },
      bubbles: true,
    }),
  );
}

function toggleItem(root: HTMLElement, value: string) {
  const instance = instances.get(root);
  if (!instance) return;
  const item = instance.items.find((i) => i.value === value);
  if (item && !item.disabled) {
    item.collapsible.toggle();
  }
}

function expandItem(root: HTMLElement, value: string) {
  const instance = instances.get(root);
  if (!instance) return;
  const item = instance.items.find((i) => i.value === value);
  if (item && !item.disabled) {
    item.collapsible.expand();
  }
}

function collapseItem(root: HTMLElement, value: string) {
  const instance = instances.get(root);
  if (!instance) return;
  const item = instance.items.find((i) => i.value === value);
  if (item) {
    item.collapsible.collapse();
  }
}

// Auto-initialize
function init() {
  document.querySelectorAll("[data-component='accordion']").forEach((el) => {
    initAccordion(el as HTMLElement);
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
document.addEventListener("astro:page-load", init);

export { initAccordion, toggleItem, expandItem, collapseItem };
