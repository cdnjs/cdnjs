// src/utils.ts
import { addMiddleware as f, getExomeId as g, update as i } from "exome";
var o = {};
function x(a, s) {
  let r = g(a) + ":" + s, e = o[r];
  if (e)
    return e;
  e = o[r] = {
    loading: !1,
    error: !1,
    unsubscribe() {
      u(), o[r] = void 0;
    }
  };
  let t = 0, u = f((n, d, E) => {
    if (n !== a || d !== s || !e)
      return;
    t++;
    let c = t;
    return e.loading = !0, e.error = !1, i(n), (l) => {
      c !== t || !e || (e.loading = !1, e.error = l || !1, i(n));
    };
  });
  return e;
}
export {
  x as getActionStatus
};
