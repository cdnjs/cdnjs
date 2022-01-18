// src/runtime.ts
import { cx } from "@twind/core";
import { twind, cssom, observe } from "@twind/core";
var active;
function runtime(config, target) {
  active?.destroy();
  return active = observe(twind(config, cssom()), target);
}
function apply(strings, ...interpolations) {
  return "~{" + cx(strings, ...interpolations) + "}";
}
function tw(strings, ...interpolations) {
  const tokens = cx(strings, ...interpolations);
  return active ? active.inject(tokens) : tokens;
}
function theme() {
}

export {
  runtime,
  apply,
  tw,
  theme
};
//# sourceMappingURL=chunk-PUOHJDKQ.js.map
