// src/solid.ts
import { subscribe as c } from "exome";
import { createSignal as u, onCleanup as a } from "solid-js";
function p(e, t = (n) => n) {
  let [n, o] = u(t(e));
  function r() {
    o(() => t(e));
  }
  let s = c(e, r);
  return a(() => s), n;
}
export {
  p as useStore
};
