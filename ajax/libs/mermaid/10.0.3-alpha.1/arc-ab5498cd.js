import { c as S, p as sn } from "./constant-2fe7eae5.js";
import { K as en, N as Y, O as I, P as rn, Q as y, I as ln, R as z, T as b, V as un, W as t, X as an, Y as on, Z as tn } from "./utils-b2e69cd8.js";
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
function pn(l, x, w, O, h, v, V, r) {
  var s = w - l, n = O - x, m = V - h, i = r - v, u = i * s - m * n;
  if (!(u * u < y))
    return u = (m * (x - v) - i * (l - h)) / u, [l + u * s, x + u * n];
}
function H(l, x, w, O, h, v, V) {
  var r = l - w, s = x - O, n = (V ? v : -v) / z(r * r + s * s), m = n * s, i = -n * r, u = l + m, f = x + i, c = w + m, D = O + i, o = (u + c) / 2, E = (f + D) / 2, p = c - u, g = D - f, R = p * p + g * g, K = h - v, P = u * D - c * f, N = (g < 0 ? -1 : 1) * z(tn(0, K * K * R - P * P)), Q = (P * g - p * N) / R, d = (-P * p - g * N) / R, A = (P * g + p * N) / R, T = (-P * p + g * N) / R, e = Q - o, a = d - E, W = A - o, X = T - E;
  return e * e + a * a > W * W + X * X && (Q = A, d = T), {
    cx: Q,
    cy: d,
    x01: -m,
    y01: -i,
    x11: Q * (h / K - 1),
    y11: d * (h / K - 1)
  };
}
function hn() {
  var l = fn, x = cn, w = S(0), O = null, h = yn, v = gn, V = mn, r = null;
  function s() {
    var n, m, i = +l.apply(this, arguments), u = +x.apply(this, arguments), f = h.apply(this, arguments) - rn, c = v.apply(this, arguments) - rn, D = un(c - f), o = c > f;
    if (r || (r = n = sn()), u < i && (m = u, u = i, i = m), !(u > y))
      r.moveTo(0, 0);
    else if (D > ln - y)
      r.moveTo(u * Y(f), u * I(f)), r.arc(0, 0, u, f, c, !o), i > y && (r.moveTo(i * Y(c), i * I(c)), r.arc(0, 0, i, c, f, o));
    else {
      var E = f, p = c, g = f, R = c, K = D, P = D, N = V.apply(this, arguments) / 2, Q = N > y && (O ? +O.apply(this, arguments) : z(i * i + u * u)), d = b(un(u - i) / 2, +w.apply(this, arguments)), A = d, T = d, e, a;
      if (Q > y) {
        var W = an(Q / i * I(N)), X = an(Q / u * I(N));
        (K -= W * 2) > y ? (W *= o ? 1 : -1, g += W, R -= W) : (K = 0, g = R = (f + c) / 2), (P -= X * 2) > y ? (X *= o ? 1 : -1, E += X, p -= X) : (P = 0, E = p = (f + c) / 2);
      }
      var Z = u * Y(E), j = u * I(E), B = i * Y(R), C = i * I(R);
      if (d > y) {
        var F = u * Y(p), G = u * I(p), J = i * Y(g), L = i * I(g), q;
        if (D < en && (q = pn(Z, j, J, L, F, G, B, C))) {
          var M = Z - q[0], U = j - q[1], $ = F - q[0], k = G - q[1], _ = 1 / I(on((M * $ + U * k) / (z(M * M + U * U) * z($ * $ + k * k))) / 2), nn = z(q[0] * q[0] + q[1] * q[1]);
          A = b(d, (i - nn) / (_ - 1)), T = b(d, (u - nn) / (_ + 1));
        }
      }
      P > y ? T > y ? (e = H(J, L, Z, j, u, T, o), a = H(F, G, B, C, u, T, o), r.moveTo(e.cx + e.x01, e.cy + e.y01), T < d ? r.arc(e.cx, e.cy, T, t(e.y01, e.x01), t(a.y01, a.x01), !o) : (r.arc(e.cx, e.cy, T, t(e.y01, e.x01), t(e.y11, e.x11), !o), r.arc(0, 0, u, t(e.cy + e.y11, e.cx + e.x11), t(a.cy + a.y11, a.cx + a.x11), !o), r.arc(a.cx, a.cy, T, t(a.y11, a.x11), t(a.y01, a.x01), !o))) : (r.moveTo(Z, j), r.arc(0, 0, u, E, p, !o)) : r.moveTo(Z, j), !(i > y) || !(K > y) ? r.lineTo(B, C) : A > y ? (e = H(B, C, F, G, i, -A, o), a = H(Z, j, J, L, i, -A, o), r.lineTo(e.cx + e.x01, e.cy + e.y01), A < d ? r.arc(e.cx, e.cy, A, t(e.y01, e.x01), t(a.y01, a.x01), !o) : (r.arc(e.cx, e.cy, A, t(e.y01, e.x01), t(e.y11, e.x11), !o), r.arc(0, 0, i, t(e.cy + e.y11, e.cx + e.x11), t(a.cy + a.y11, a.cx + a.x11), o), r.arc(a.cx, a.cy, A, t(a.y11, a.x11), t(a.y01, a.x01), !o))) : r.arc(0, 0, i, R, g, o);
    }
    if (r.closePath(), n)
      return r = null, n + "" || null;
  }
  return s.centroid = function() {
    var n = (+l.apply(this, arguments) + +x.apply(this, arguments)) / 2, m = (+h.apply(this, arguments) + +v.apply(this, arguments)) / 2 - en / 2;
    return [Y(m) * n, I(m) * n];
  }, s.innerRadius = function(n) {
    return arguments.length ? (l = typeof n == "function" ? n : S(+n), s) : l;
  }, s.outerRadius = function(n) {
    return arguments.length ? (x = typeof n == "function" ? n : S(+n), s) : x;
  }, s.cornerRadius = function(n) {
    return arguments.length ? (w = typeof n == "function" ? n : S(+n), s) : w;
  }, s.padRadius = function(n) {
    return arguments.length ? (O = n == null ? null : typeof n == "function" ? n : S(+n), s) : O;
  }, s.startAngle = function(n) {
    return arguments.length ? (h = typeof n == "function" ? n : S(+n), s) : h;
  }, s.endAngle = function(n) {
    return arguments.length ? (v = typeof n == "function" ? n : S(+n), s) : v;
  }, s.padAngle = function(n) {
    return arguments.length ? (V = typeof n == "function" ? n : S(+n), s) : V;
  }, s.context = function(n) {
    return arguments.length ? (r = n ?? null, s) : r;
  }, s;
}
export {
  hn as d
};
//# sourceMappingURL=arc-ab5498cd.js.map
