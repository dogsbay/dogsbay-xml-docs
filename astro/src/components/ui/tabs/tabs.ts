import { CompositeNavigation } from "@dogsbay/primitives/composite";
import type { Orientation } from "@dogsbay/primitives/composite";

interface TabsInstance {
  root: HTMLElement;
  list: HTMLElement;
  triggers: HTMLElement[];
  panels: HTMLElement[];
  nav: CompositeNavigation;
  value: string;
  syncKey: string | null;
  orientation: Orientation;
}

const instances = new WeakMap<HTMLElement, TabsInstance>();

let idCounter = 0;
function uniqueId(prefix: string) {
  return `${prefix}-${++idCounter}`;
}

function initTabs(root: HTMLElement) {
  if (instances.has(root)) return;

  const list = root.querySelector("[data-part='list']") as HTMLElement | null;
  if (!list) return;

  const triggers = Array.from(
    list.querySelectorAll("[data-part='trigger']"),
  ) as HTMLElement[];
  const panels = Array.from(
    root.querySelectorAll("[data-part='content']"),
  ) as HTMLElement[];

  const orientation = (root.dataset.orientation as Orientation) || "horizontal";
  const defaultValue =
    root.dataset.defaultValue || triggers[0]?.dataset.value || "";
  const syncKey = root.dataset.syncKey || null;

  // Set orientation on tablist
  list.setAttribute("aria-orientation", orientation);

  // Generate IDs and link triggers ↔ panels
  triggers.forEach((trigger) => {
    const value = trigger.dataset.value!;
    const triggerId = trigger.id || uniqueId("base-tab");
    trigger.id = triggerId;

    const panel = panels.find((p) => p.dataset.value === value);
    if (panel) {
      const panelId = panel.id || uniqueId("base-tabpanel");
      panel.id = panelId;
      trigger.setAttribute("aria-controls", panelId);
      panel.setAttribute("aria-labelledby", triggerId);
    }
  });

  // Set up composite navigation
  const nav = new CompositeNavigation(list, "[data-part='trigger']", {
    orientation,
    loop: true,
    homeEnd: true,
    onHighlightedIndexChange: () => {
      // Selection follows focus — activate the focused tab
      const focused = document.activeElement as HTMLElement;
      const value = focused?.dataset?.value;
      if (value) selectTab(root, value);
    },
  });

  const instance: TabsInstance = {
    root,
    list,
    triggers,
    panels,
    nav,
    value: "",
    syncKey,
    orientation,
  };

  instances.set(root, instance);

  // Click handler — also handles non-keyboard activation
  list.addEventListener("click", (e) => {
    const trigger = (e.target as HTMLElement).closest(
      "[data-part='trigger']",
    ) as HTMLElement | null;
    if (!trigger || trigger.hasAttribute("disabled")) return;
    const value = trigger.dataset.value;
    if (value) selectTab(root, value);
  });

  // Activate navigation
  nav.activate();

  // Sync: read initial value from localStorage or hash
  let initialValue = defaultValue;
  if (syncKey) {
    const stored = localStorage.getItem(`base-tabs-sync:${syncKey}`);
    if (stored && triggers.some((t) => t.dataset.value === stored)) {
      initialValue = stored;
    }
  }

  // Deep link: check URL hash
  const hash = window.location.hash.slice(1);
  if (hash && triggers.some((t) => t.dataset.value === hash)) {
    initialValue = hash;
  }

  // Set initial selection
  selectTab(root, initialValue);

  // Listen for sync events from other tabs instances with same syncKey
  if (syncKey) {
    window.addEventListener("storage", (e) => {
      if (e.key !== `base-tabs-sync:${syncKey}`) return;
      const newValue = e.newValue;
      if (newValue && instance.value !== newValue) {
        selectTab(root, newValue);
      }
    });

    // Listen for same-page sync (custom event)
    document.addEventListener(`base-tabs-sync:${syncKey}`, ((
      e: CustomEvent,
    ) => {
      const newValue = e.detail.value;
      if (newValue && instance.value !== newValue) {
        selectTab(root, newValue);
      }
    }) as EventListener);
  }
}

function selectTab(root: HTMLElement, value: string) {
  const instance = instances.get(root);
  if (!instance) return;
  if (instance.value === value) return;

  instance.value = value;

  // Update triggers
  instance.triggers.forEach((trigger) => {
    const isSelected = trigger.dataset.value === value;
    trigger.setAttribute("aria-selected", String(isSelected));
    trigger.setAttribute("tabindex", isSelected ? "0" : "-1");
    if (isSelected) {
      trigger.setAttribute("data-state", "active");
    } else {
      trigger.removeAttribute("data-state");
    }
  });

  // Update panels
  instance.panels.forEach((panel) => {
    const isActive = panel.dataset.value === value;
    panel.hidden = !isActive;
    if (isActive) {
      panel.setAttribute("data-state", "active");
      // Ensure panel is focusable for keyboard users
      if (!panel.hasAttribute("tabindex")) {
        panel.setAttribute("tabindex", "0");
      }
      // Lazy init: initialize any nested tabs that haven't been set up yet
      panel.querySelectorAll("[data-component='tabs']").forEach((nestedEl) => {
        if (!instances.has(nestedEl as HTMLElement)) {
          initTabs(nestedEl as HTMLElement);
        }
      });
    } else {
      panel.removeAttribute("data-state");
    }
  });

  // Update hash
  if (window.location.hash.slice(1) !== value) {
    // Only update hash if the user interacted (not on initial load)
    // We skip this to avoid scroll jumps on page load
  }

  // Sync to localStorage and other instances
  if (instance.syncKey) {
    localStorage.setItem(`base-tabs-sync:${instance.syncKey}`, value);
    document.dispatchEvent(
      new CustomEvent(`base-tabs-sync:${instance.syncKey}`, {
        detail: { value, source: root },
      }),
    );
  }

  // Dispatch change event
  root.dispatchEvent(
    new CustomEvent("base-tabs:change", {
      detail: { value },
      bubbles: true,
    }),
  );
}

// Auto-initialize — skip tabs inside hidden panels (they'll be lazy-inited)
function init() {
  document.querySelectorAll("[data-component='tabs']").forEach((el) => {
    const tabsEl = el as HTMLElement;
    // Skip if inside a hidden tabpanel (will be lazy-inited when panel activates)
    const parentPanel = tabsEl.closest("[data-part='content'][hidden]");
    if (parentPanel) return;
    initTabs(tabsEl);
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
document.addEventListener("astro:page-load", init);

export { initTabs, selectTab };
