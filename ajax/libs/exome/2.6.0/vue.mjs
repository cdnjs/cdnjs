// src/vue.ts
import { Exome as c, subscribe as i } from "exome";
import { ref as u, watchEffect as s } from "vue";
function p(r) {
  let o = {};
  function e() {
    Object.keys(o).forEach((n) => {
      o[n].value = r[n];
    });
  }
  return s(() => i(r, e), {
    flush: "pre"
  }), new Proxy(r, {
    get(n, f) {
      return n === r && typeof n[f] == "function" || n && n[f] instanceof c ? n[f] : o[f] || (o[f] = u(n[f]));
    }
  });
}
export {
  p as useStore
};
