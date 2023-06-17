import { c as V, p as sn } from "./constant-2fe7eae5.js";
import { O as en, P as Z, Q as O, R as rn, T as y, K as ln, V as z, W as b, X as un, Y as t, Z as an, _ as on, $ as tn } from "./utils-8ea37061.js";
function fn(l) {
  return l.innerRadius;
}
function cn(l) {
  return l.outerRadius;
}
function yn(l) {
  return l.startAngle;
}
function gn(l) {
  return l.endAngle;
}
function mn(l) {
  return l && l.padAngle;
}
function pn(l, x, D, q, h, v, W, r) {
  var s = D - l, n = q - x, m = W - h, i = r - v, u = i * s - m * n;
  if (!(u * u < y))
    return u = (m * (x - v) - i * (l - h)) / u, [l + u * s, x + u * n];
}
function H(l, x, D, q, h, v, W) {
  var r = l - D, s = x - q, n = (W ? v : -v) / z(r * r + s * s), m = n * s, i = -n * r, u = l + m, f = x + i, c = D + m, E = q + i, o = (u + c) / 2, I = (f + E) / 2, p = c - u, g = E - f, R = p * p + g * g, K = h - v, P = u * E - c * f, Q = (g < 0 ? -1 : 1) * z(tn(0, K * K * R - P * P)), S = (P * g - p * Q) / R, d = (-P * p - g * Q) / R, A = (P * g + p * Q) / R, T = (-P * p + g * Q) / R, e = S - o, a = d - I, X = A - o, Y = T - I;
  return e * e + a * a > X * X + Y * Y && (S = A, d = T), {
    cx: S,
    cy: d,
    x01: -m,
    y01: -i,
    x11: S * (h / K - 1),
    y11: d * (h / K - 1)
  };
}
function hn() {
  var l = fn, x = cn, D = V(0), q = null, h = yn, v = gn, W = mn, r = null;
  function s() {
    var n, m, i = +l.apply(this, arguments), u = +x.apply(this, arguments), f = h.apply(this, arguments) - rn, c = v.apply(this, arguments) - rn, E = un(c - f), o = c > f;
    if (r || (r = n = sn()), u < i && (m = u, u = i, i = m), !(u > y))
      r.moveTo(0, 0);
    else if (E > ln - y)
      r.moveTo(u * Z(f), u * O(f)), r.arc(0, 0, u, f, c, !o), i > y && (r.moveTo(i * Z(c), i * O(c)), r.arc(0, 0, i, c, f, o));
    else {
      var I = f, p = c, g = f, R = c, K = E, P = E, Q = W.apply(this, arguments) / 2, S = Q > y && (q ? +q.apply(this, arguments) : z(i * i + u * u)), d = b(un(u - i) / 2, +D.apply(this, arguments)), A = d, T = d, e, a;
      if (S > y) {
        var X = an(S / i * O(Q)), Y = an(S / u * O(Q));
        (K -= X * 2) > y ? (X *= o ? 1 : -1, g += X, R -= X) : (K = 0, g = R = (f + c) / 2), (P -= Y * 2) > y ? (Y *= o ? 1 : -1, I += Y, p -= Y) : (P = 0, I = p = (f + c) / 2);
      }
      var $ = u * Z(I), j = u * O(I), B = i * Z(R), C = i * O(R);
      if (d > y) {
        var F = u * Z(p), G = u * O(p), J = i * Z(g), L = i * O(g), w;
        if (E < en && (w = pn($, j, J, L, F, G, B, C))) {
          var M = $ - w[0], N = j - w[1], U = F - w[0], k = G - w[1], _ = 1 / O(on((M * U + N * k) / (z(M * M + N * N) * z(U * U + k * k))) / 2), nn = z(w[0] * w[0] + w[1] * w[1]);
          A = b(d, (i - nn) / (_ - 1)), T = b(d, (u - nn) / (_ + 1));
        }
      }
      P > y ? T > y ? (e = H(J, L, $, j, u, T, o), a = H(F, G, B, C, u, T, o), r.moveTo(e.cx + e.x01, e.cy + e.y01), T < d ? r.arc(e.cx, e.cy, T, t(e.y01, e.x01), t(a.y01, a.x01), !o) : (r.arc(e.cx, e.cy, T, t(e.y01, e.x01), t(e.y11, e.x11), !o), r.arc(0, 0, u, t(e.cy + e.y11, e.cx + e.x11), t(a.cy + a.y11, a.cx + a.x11), !o), r.arc(a.cx, a.cy, T, t(a.y11, a.x11), t(a.y01, a.x01), !o))) : (r.moveTo($, j), r.arc(0, 0, u, I, p, !o)) : r.moveTo($, j), !(i > y) || !(K > y) ? r.lineTo(B, C) : A > y ? (e = H(B, C, F, G, i, -A, o), a = H($, j, J, L, i, -A, o), r.lineTo(e.cx + e.x01, e.cy + e.y01), A < d ? r.arc(e.cx, e.cy, A, t(e.y01, e.x01), t(a.y01, a.x01), !o) : (r.arc(e.cx, e.cy, A, t(e.y01, e.x01), t(e.y11, e.x11), !o), r.arc(0, 0, i, t(e.cy + e.y11, e.cx + e.x11), t(a.cy + a.y11, a.cx + a.x11), o), r.arc(a.cx, a.cy, A, t(a.y11, a.x11), t(a.y01, a.x01), !o))) : r.arc(0, 0, i, R, g, o);
    }
    if (r.closePath(), n)
      return r = null, n + "" || null;
  }
  return s.centroid = function() {
    var n = (+l.apply(this, arguments) + +x.apply(this, arguments)) / 2, m = (+h.apply(this, arguments) + +v.apply(this, arguments)) / 2 - en / 2;
    return [Z(m) * n, O(m) * n];
  }, s.innerRadius = function(n) {
    return arguments.length ? (l = typeof n == "function" ? n : V(+n), s) : l;
  }, s.outerRadius = function(n) {
    return arguments.length ? (x = typeof n == "function" ? n : V(+n), s) : x;
  }, s.cornerRadius = function(n) {
    return arguments.length ? (D = typeof n == "function" ? n : V(+n), s) : D;
  }, s.padRadius = function(n) {
    return arguments.length ? (q = n == null ? null : typeof n == "function" ? n : V(+n), s) : q;
  }, s.startAngle = function(n) {
    return arguments.length ? (h = typeof n == "function" ? n : V(+n), s) : h;
  }, s.endAngle = function(n) {
    return arguments.length ? (v = typeof n == "function" ? n : V(+n), s) : v;
  }, s.padAngle = function(n) {
    return arguments.length ? (W = typeof n == "function" ? n : V(+n), s) : W;
  }, s.context = function(n) {
    return arguments.length ? (r = n ?? null, s) : r;
  }, s;
}
export {
  hn as d
};
//# sourceMappingURL=arc-f7872e1e.js.map
