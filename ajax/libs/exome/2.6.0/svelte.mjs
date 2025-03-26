// src/svelte.ts
import { subscribe as r } from "exome";
function s(u, i = (e) => e) {
  return {
    subscribe(e) {
      return e(i(u)), r(u, () => e(i(u)));
    }
  };
}
export {
  s as useStore
};
