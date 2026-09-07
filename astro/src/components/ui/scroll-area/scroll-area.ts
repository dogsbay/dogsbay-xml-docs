function init(root: HTMLElement) {
  if (root.hasAttribute("data-initialized")) return;
  root.setAttribute("data-initialized", "");

  const viewport = root.querySelector<HTMLElement>("[data-part='viewport']");
  if (!viewport) return;

  const vBar = root.querySelector<HTMLElement>(
    "[data-part='scrollbar'][data-orientation='vertical']",
  );
  const hBar = root.querySelector<HTMLElement>(
    "[data-part='scrollbar'][data-orientation='horizontal']",
  );
  const vThumb = vBar?.querySelector<HTMLElement>("[data-part='thumb']");
  const hThumb = hBar?.querySelector<HTMLElement>("[data-part='thumb']");

  let hideTimeout: ReturnType<typeof setTimeout>;

  function updateScrollbars() {
    const {
      scrollTop,
      scrollLeft,
      scrollHeight,
      scrollWidth,
      clientHeight,
      clientWidth,
    } = viewport!;

    // Vertical
    if (vBar && vThumb) {
      const hasOverflow = scrollHeight > clientHeight;
      vBar.style.opacity = hasOverflow ? "1" : "0";
      if (hasOverflow) {
        const ratio = clientHeight / scrollHeight;
        const thumbHeight = Math.max(ratio * clientHeight, 20);
        const thumbTop =
          (scrollTop / (scrollHeight - clientHeight)) *
          (clientHeight - thumbHeight);
        vThumb.style.height = `${thumbHeight}px`;
        vThumb.style.transform = `translateY(${thumbTop}px)`;
      }
    }

    // Horizontal
    if (hBar && hThumb) {
      const hasOverflow = scrollWidth > clientWidth;
      hBar.style.opacity = hasOverflow ? "1" : "0";
      if (hasOverflow) {
        const ratio = clientWidth / scrollWidth;
        const thumbWidth = Math.max(ratio * clientWidth, 20);
        const thumbLeft =
          (scrollLeft / (scrollWidth - clientWidth)) *
          (clientWidth - thumbWidth);
        hThumb.style.width = `${thumbWidth}px`;
        hThumb.style.transform = `translateX(${thumbLeft}px)`;
      }
    }

    // Auto-hide after 1s of inactivity
    clearTimeout(hideTimeout);
    if (vBar) vBar.setAttribute("data-state", "visible");
    if (hBar) hBar.setAttribute("data-state", "visible");
    hideTimeout = setTimeout(() => {
      if (vBar) vBar.setAttribute("data-state", "hidden");
      if (hBar) hBar.setAttribute("data-state", "hidden");
    }, 1000);
  }

  // Drag support for vertical thumb
  if (vBar && vThumb) {
    setupDrag(vBar, vThumb, viewport, "vertical");
  }

  // Drag support for horizontal thumb
  if (hBar && hThumb) {
    setupDrag(hBar, hThumb, viewport, "horizontal");
  }

  viewport.addEventListener("scroll", updateScrollbars, { passive: true });

  // Convert vertical wheel to horizontal scroll when only horizontal overflow
  viewport.addEventListener("wheel", (e) => {
    const hasHOverflow = viewport.scrollWidth > viewport.clientWidth;
    const hasVOverflow = viewport.scrollHeight > viewport.clientHeight;
    if (hasHOverflow && !hasVOverflow && e.deltaY !== 0) {
      e.preventDefault();
      viewport.scrollLeft += e.deltaY;
    }
  }, { passive: false });

  // Initial update
  updateScrollbars();

  // Watch for content changes
  const observer = new ResizeObserver(updateScrollbars);
  observer.observe(viewport);
  if (viewport.firstElementChild) {
    observer.observe(viewport.firstElementChild);
  }
}

function setupDrag(
  bar: HTMLElement,
  thumb: HTMLElement,
  viewport: HTMLElement,
  orientation: "vertical" | "horizontal",
) {
  let isDragging = false;
  let startPos = 0;
  let startScroll = 0;

  thumb.addEventListener("pointerdown", (e) => {
    isDragging = true;
    startPos = orientation === "vertical" ? e.clientY : e.clientX;
    startScroll =
      orientation === "vertical" ? viewport.scrollTop : viewport.scrollLeft;
    thumb.setPointerCapture(e.pointerId);
    e.preventDefault();
  });

  thumb.addEventListener("pointermove", (e) => {
    if (!isDragging) return;

    const pos = orientation === "vertical" ? e.clientY : e.clientX;
    const delta = pos - startPos;

    const barSize =
      orientation === "vertical"
        ? bar.clientHeight
        : bar.clientWidth;
    const scrollSize =
      orientation === "vertical"
        ? viewport.scrollHeight - viewport.clientHeight
        : viewport.scrollWidth - viewport.clientWidth;

    const scrollDelta = (delta / barSize) * (scrollSize + barSize);

    if (orientation === "vertical") {
      viewport.scrollTop = startScroll + scrollDelta;
    } else {
      viewport.scrollLeft = startScroll + scrollDelta;
    }
  });

  thumb.addEventListener("pointerup", () => {
    isDragging = false;
  });

  // Click on track scrolls to position
  bar.addEventListener("pointerdown", (e) => {
    if (e.target === thumb) return;

    const rect = bar.getBoundingClientRect();
    const pos = orientation === "vertical" ? e.clientY - rect.top : e.clientX - rect.left;
    const ratio = pos / (orientation === "vertical" ? rect.height : rect.width);

    if (orientation === "vertical") {
      viewport.scrollTop = ratio * (viewport.scrollHeight - viewport.clientHeight);
    } else {
      viewport.scrollLeft = ratio * (viewport.scrollWidth - viewport.clientWidth);
    }
  });
}

function initAll() {
  document
    .querySelectorAll<HTMLElement>("[data-component='scroll-area']")
    .forEach(init);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initAll);
} else {
  initAll();
}
document.addEventListener("astro:page-load", initAll);
