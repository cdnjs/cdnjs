// src/react.ts
import { subscribe as n } from "exome";
import { useEffect as o, useLayoutEffect as r, useState as u } from "react";
var f = typeof window != "undefined" ? r : o;
function c(e) {
  return e + 1;
}
var i = (e) => {
  let [, t] = u(0);
  return f(
    () => n(e, () => t(c)),
    [e]
  ), e;
};
export {
  i as useStore
};
