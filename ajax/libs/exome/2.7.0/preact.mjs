// src/preact.ts
import { subscribe as t } from "exome";
import { useEffect as o, useLayoutEffect as u, useState as r } from "preact/hooks";
var f = typeof window != "undefined" ? u : o;
function c(e) {
  return e + 1;
}
function s(e) {
  let [, n] = r(0);
  return f(
    () => t(e, () => n(c)),
    [e]
  ), e;
}
export {
  s as useStore
};
