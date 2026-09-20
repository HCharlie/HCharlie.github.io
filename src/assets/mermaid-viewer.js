import mermaid from "https://cdn.jsdelivr.net/npm/mermaid@11.16.1/dist/mermaid.esm.min.mjs";

mermaid.initialize({
  startOnLoad: false,
  securityLevel: "loose",
  theme: window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "default",
  flowchart: { useMaxWidth: false },
});

await mermaid.run({ nodes: document.querySelectorAll(".mermaid") });

try {
  const { default: Panzoom } = await import("https://cdn.jsdelivr.net/npm/@panzoom/panzoom@4.6.0/dist/panzoom.es.js");
  document.querySelectorAll(".interactive-mermaid").forEach((diagram) => enhance(diagram, Panzoom));
} catch (error) {
  console.warn("Interactive Mermaid controls unavailable; showing the rendered diagram.", error);
}

function enhance(diagram, Panzoom) {
  const svg = diagram.querySelector("svg");
  if (!svg) return;

  const frame = document.createElement("section");
  frame.className = "mermaid-viewer";
  frame.setAttribute("aria-label", "Interactive website roadmap");
  frame.innerHTML = `
    <div class="mermaid-viewer__toolbar">
      <button type="button" data-action="out" aria-label="Zoom out">−</button>
      <button type="button" data-action="in" aria-label="Zoom in">+</button>
      <button type="button" data-action="fit">Fit</button>
      <button type="button" data-action="reset" aria-label="Reset to actual size">1:1</button>
      <span class="mermaid-viewer__hint">Drag to move · pinch or Ctrl/⌘ + wheel to zoom</span>
    </div>
    <div class="mermaid-viewer__viewport" tabindex="0">
      <aside class="mermaid-viewer__inspector" aria-live="polite"></aside>
    </div>`;

  diagram.before(frame);
  const viewport = frame.querySelector(".mermaid-viewer__viewport");
  const inspector = frame.querySelector(".mermaid-viewer__inspector");
  diagram.classList.add("mermaid-viewer__diagram");
  viewport.append(diagram);

  const width = svg.viewBox.baseVal.width;
  const height = svg.viewBox.baseVal.height;
  diagram.style.width = `${width}px`;
  diagram.style.height = `${height}px`;
  svg.style.width = "100%";
  svg.style.height = "100%";
  svg.setAttribute("role", "img");
  svg.setAttribute("aria-label", "Website roadmap");

  const panzoom = Panzoom(diagram, {
    minScale: 0.08,
    maxScale: 4,
    canvas: true,
    step: 0.2,
  });
  const animate = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const center = (scale) => {
    panzoom.reset({ animate: false });
    panzoom.zoom(scale, { animate: false });
    panzoom.pan(
      (viewport.clientWidth / 2 - width / 2) / scale,
      (viewport.clientHeight / 2 - height / 2) / scale,
      { animate },
    );
  };

  const fit = () => center(Math.min(
    (viewport.clientWidth - 48) / width,
    (viewport.clientHeight - 48) / height,
    1,
  ));

  frame.querySelector(".mermaid-viewer__toolbar").addEventListener("click", ({ target }) => {
    const action = target.closest("button")?.dataset.action;
    if (action === "in") panzoom.zoomIn({ animate });
    if (action === "out") panzoom.zoomOut({ animate });
    if (action === "fit") fit();
    if (action === "reset") center(1);
  });

  viewport.addEventListener("wheel", (event) => {
    if (!event.ctrlKey && !event.metaKey) return;
    event.preventDefault();
    panzoom.zoomWithWheel(event);
  }, { passive: false });

  addNodeInteractions(svg, viewport, inspector);
  requestAnimationFrame(fit);
}

function addNodeInteractions(svg, viewport, inspector) {
  const nodes = [...svg.querySelectorAll("g.node")];
  const edges = [...svg.querySelectorAll("path.flowchart-link")];
  const nodeByKey = new Map(nodes.map((node) => [nodeKey(node), node]));
  let selected;

  const resetInspector = () => {
    inspector.innerHTML = `
      <small>Diagram guide</small>
      <strong>Hover or focus a node</strong>
      <span class="mermaid-viewer__action">Click to keep the selection</span>`;
  };

  const edgeEndpoints = (edge) => {
    const id = edge.dataset.id || "";
    return [...nodeByKey.keys()].filter((key) => id.startsWith(`L_${key}_`) || id.includes(`_${key}_`));
  };

  const clearClasses = () => {
    svg.classList.remove("is-interacting");
    nodes.forEach((node) => node.classList.remove("is-active", "is-neighbor"));
    edges.forEach((edge) => edge.classList.remove("is-active"));
  };

  const show = (node, locked = false) => {
    clearClasses();
    const key = nodeKey(node);
    const connected = edges.filter((edge) => edgeEndpoints(edge).includes(key));
    const neighbors = new Set(connected.flatMap(edgeEndpoints).filter((candidate) => candidate !== key));
    svg.classList.add("is-interacting");
    node.classList.add("is-active");
    neighbors.forEach((candidate) => nodeByKey.get(candidate)?.classList.add("is-neighbor"));
    connected.forEach((edge) => edge.classList.add("is-active"));

    const label = node.textContent.trim().replace(/\s+/g, " ");
    const link = node.closest("a") || node.querySelector("a");
    const href = link?.getAttribute("href") || link?.getAttribute("xlink:href");
    inspector.innerHTML = `
      <small>${locked ? "Selected" : "Exploring"} · ${connected.length} direct connection${connected.length === 1 ? "" : "s"}</small>
      <strong>${label}</strong>
      <span class="mermaid-viewer__action">${href ? `<a href="${href}">Open article →</a>` : ""}</span>`;
  };

  const clear = () => {
    selected = undefined;
    clearClasses();
    resetInspector();
  };

  resetInspector();

  nodes.forEach((node) => {
    const label = node.textContent.trim().replace(/\s+/g, " ");
    node.tabIndex = 0;
    node.setAttribute("role", "button");
    node.setAttribute("aria-label", `Explore ${label}`);
    node.addEventListener("pointerenter", () => { if (!selected) show(node); });
    node.addEventListener("pointerleave", () => { if (!selected) { clearClasses(); resetInspector(); } });
    node.addEventListener("focus", () => { if (!selected) show(node); });
    node.addEventListener("blur", () => { if (!selected) { clearClasses(); resetInspector(); } });
    node.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      selected = selected === node ? undefined : node;
      if (selected) show(selected, true); else clear();
    });
    node.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        node.click();
      }
    });
  });

  viewport.addEventListener("click", (event) => {
    if (!event.target.closest(".node, .mermaid-viewer__inspector")) clear();
  });
  viewport.addEventListener("keydown", (event) => {
    if (event.key === "Escape") clear();
  });
}

function nodeKey(node) {
  return node.id.match(/-flowchart-(.+)-\d+$/)?.[1];
}
