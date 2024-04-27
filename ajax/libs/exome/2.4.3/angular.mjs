// src/angular.ts
import {
  DestroyRef as i,
  assertInInjectionContext as a,
  inject as u,
  signal as c
} from "@angular/core";
import { subscribe as l } from "exome";
function m(e, s = (n) => n) {
  let n = c(s(e));
  function o() {
    n.set(s(e));
  }
  let r = l(e, o), t = a(m) ? u(i) : null;
  return t == null || t.onDestroy(r), n.asReadonly();
}
export {
  m as useStore
};
