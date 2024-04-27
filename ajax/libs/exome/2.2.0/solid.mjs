// src/solid.ts
import { subscribe as a } from "exome";
import { createSignal as s, onCleanup as i } from "solid-js";
function p(e, t = (n) => n) {
  let [n, o] = s(t(e));
  function r() {
    o(() => t(e));
  }
  let u = a(e, r);
  return i(() => u), n;
}
export {
  p as useStore
};
