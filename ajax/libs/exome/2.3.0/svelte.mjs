// src/svelte.ts
import { subscribe as u } from "exome";
function i(r, t = (e) => e) {
  return {
    subscribe(e) {
      return e(t(r)), u(r, () => e(t(r)));
    }
  };
}
export {
  i as useStore
};
