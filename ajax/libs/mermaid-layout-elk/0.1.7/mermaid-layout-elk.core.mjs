import {
  __name
} from "./chunks/mermaid-layout-elk.core/chunk-ZW26E7AF.mjs";

// src/layouts.ts
var loader = /* @__PURE__ */ __name(async () => await import("./chunks/mermaid-layout-elk.core/render-SL7ONYGO.mjs"), "loader");
var algos = ["elk.stress", "elk.force", "elk.mrtree", "elk.sporeOverlap"];
var layouts = [
  {
    name: "elk",
    loader,
    algorithm: "elk.layered"
  },
  ...algos.map((algo) => ({
    name: algo,
    loader,
    algorithm: algo
  }))
];
var layouts_default = layouts;
export {
  layouts_default as default
};
