// src/utils.ts
import { addMiddleware as p, getExomeId as y, update as d } from "exome";
var o = {};
function b(s, a) {
  let n = y(s) + ":" + a, e = o[n];
  if (e)
    return e;
  e = o[n] = {
    loading: !1,
    error: !1,
    response: void 0,
    unsubscribe() {
      i(), o[n] = void 0;
    }
  };
  let r = 0, i = p((t, u, g) => {
    if (t !== s || u !== a || !e)
      return;
    r++;
    let c = r;
    return e.loading = !0, e.error = !1, e.response = void 0, d(t), (f, l) => {
      c !== r || !e || (e.loading = !1, e.error = f || !1, e.response = l || void 0, d(t));
    };
  });
  return e;
}
export {
  b as getActionStatus
};
