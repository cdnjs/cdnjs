// src/react.ts
import { subscribe as t } from "exome";
import { useEffect as o, useLayoutEffect as u, useState as r } from "react";
var f = typeof window != "undefined" ? u : o;
function c(e) {
  return e + 1;
}
var i = (e) => {
  let [, n] = r(0);
  return f(
    () => t(e, () => n(c)),
    [e]
  ), e;
};
export {
  i as useStore
};
