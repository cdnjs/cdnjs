// src/preact.ts
import { subscribe as n } from "exome";
import { useEffect as o, useLayoutEffect as r, useState as u } from "preact/hooks";
var f = typeof window != "undefined" ? r : o;
function c(e) {
  return e + 1;
}
function s(e) {
  let [, t] = u(0);
  return f(
    () => n(e, () => t(c)),
    [e]
  ), e;
}
export {
  s as useStore
};
