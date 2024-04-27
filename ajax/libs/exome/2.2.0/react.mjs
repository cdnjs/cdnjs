// src/react.ts
import { subscribe as o } from "exome";
import { useEffect as n, useLayoutEffect as r, useState as u } from "react";
var f = typeof window != "undefined" ? r : n;
function c(e) {
  return e + 1;
}
var i = (e) => {
  let [, t] = u(0);
  return f(
    () => o(e, () => t(c)),
    [e]
  ), e;
};
export {
  i as useStore
};
