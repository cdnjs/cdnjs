import { w as ln, c as S } from "./path-428ebac9.js";
import { at as an, au as G, av as D, aw as rn, ax as y, U as tn, ay as K, az as _, aA as un, aB as o, aC as sn, aD as on, aE as fn } from "./mermaid-a09fe7cd.js";
function cn(l) {
  return l.innerRadius;
}
function yn(l) {
  return l.outerRadius;
}
function gn(l) {
  return l.startAngle;
}
function mn(l) {
  return l.endAngle;
}
function pn(l) {
  return l && l.padAngle;
}
function dn(l, h, z, E, v, A, U, a) {
  var B = z - l, i = E - h, n = U - v, m = a - A, r = m * B - n * i;
  if (!(r * r < y))
    return r = (n * (h - A) - m * (l - v)) / r, [l + r * B, h + r * i];
}
function W(l, h, z, E, v, A, U) {
  var a = l - z, B = h - E, i = (U ? A : -A) / K(a * a + B * B), n = i * B, m = -i * a, r = l + n, s = h + m, f = z + n, c = E + m, j = (r + f) / 2, t = (s + c) / 2, p = f - r, g = c - s, R = p * p + g * g, T = v - A, w = r * c - f * s, C = (g < 0 ? -1 : 1) * K(fn(0, T * T * R - w * w)), I = (w * g - p * C) / R, O = (-w * p - g * C) / R, P = (w * g + p * C) / R, d = (-w * p + g * C) / R, x = I - j, e = O - t, u = P - j, F = d - t;
  return x * x + e * e > u * u + F * F && (I = P, O = d), {
    cx: I,
    cy: O,
    x01: -n,
    y01: -m,
    x11: I * (v / T - 1),
    y11: O * (v / T - 1)
  };
}
function vn() {
  var l = cn, h = yn, z = S(0), E = null, v = gn, A = mn, U = pn, a = null, B = ln(i);
  function i() {
    var n, m, r = +l.apply(this, arguments), s = +h.apply(this, arguments), f = v.apply(this, arguments) - rn, c = A.apply(this, arguments) - rn, j = un(c - f), t = c > f;
    if (a || (a = n = B()), s < r && (m = s, s = r, r = m), !(s > y))
      a.moveTo(0, 0);
    else if (j > tn - y)
      a.moveTo(s * G(f), s * D(f)), a.arc(0, 0, s, f, c, !t), r > y && (a.moveTo(r * G(c), r * D(c)), a.arc(0, 0, r, c, f, t));
    else {
      var p = f, g = c, R = f, T = c, w = j, C = j, I = U.apply(this, arguments) / 2, O = I > y && (E ? +E.apply(this, arguments) : K(r * r + s * s)), P = _(un(s - r) / 2, +z.apply(this, arguments)), d = P, x = P, e, u;
      if (O > y) {
        var F = sn(O / r * D(I)), L = sn(O / s * D(I));
        (w -= F * 2) > y ? (F *= t ? 1 : -1, R += F, T -= F) : (w = 0, R = T = (f + c) / 2), (C -= L * 2) > y ? (L *= t ? 1 : -1, p += L, g -= L) : (C = 0, p = g = (f + c) / 2);
      }
      var H = s * G(p), J = s * D(p), M = r * G(T), N = r * D(T);
      if (P > y) {
        var Q = s * G(g), V = s * D(g), X = r * G(R), Y = r * D(R), q;
        if (j < an)
          if (q = dn(H, J, X, Y, Q, V, M, N)) {
            var Z = H - q[0], $ = J - q[1], k = Q - q[0], b = V - q[1], nn = 1 / D(on((Z * k + $ * b) / (K(Z * Z + $ * $) * K(k * k + b * b))) / 2), en = K(q[0] * q[0] + q[1] * q[1]);
            d = _(P, (r - en) / (nn - 1)), x = _(P, (s - en) / (nn + 1));
          } else
            d = x = 0;
      }
      C > y ? x > y ? (e = W(X, Y, H, J, s, x, t), u = W(Q, V, M, N, s, x, t), a.moveTo(e.cx + e.x01, e.cy + e.y01), x < P ? a.arc(e.cx, e.cy, x, o(e.y01, e.x01), o(u.y01, u.x01), !t) : (a.arc(e.cx, e.cy, x, o(e.y01, e.x01), o(e.y11, e.x11), !t), a.arc(0, 0, s, o(e.cy + e.y11, e.cx + e.x11), o(u.cy + u.y11, u.cx + u.x11), !t), a.arc(u.cx, u.cy, x, o(u.y11, u.x11), o(u.y01, u.x01), !t))) : (a.moveTo(H, J), a.arc(0, 0, s, p, g, !t)) : a.moveTo(H, J), !(r > y) || !(w > y) ? a.lineTo(M, N) : d > y ? (e = W(M, N, Q, V, r, -d, t), u = W(H, J, X, Y, r, -d, t), a.lineTo(e.cx + e.x01, e.cy + e.y01), d < P ? a.arc(e.cx, e.cy, d, o(e.y01, e.x01), o(u.y01, u.x01), !t) : (a.arc(e.cx, e.cy, d, o(e.y01, e.x01), o(e.y11, e.x11), !t), a.arc(0, 0, r, o(e.cy + e.y11, e.cx + e.x11), o(u.cy + u.y11, u.cx + u.x11), t), a.arc(u.cx, u.cy, d, o(u.y11, u.x11), o(u.y01, u.x01), !t))) : a.arc(0, 0, r, T, R, t);
    }
    if (a.closePath(), n)
      return a = null, n + "" || null;
  }
  return i.centroid = function() {
    var n = (+l.apply(this, arguments) + +h.apply(this, arguments)) / 2, m = (+v.apply(this, arguments) + +A.apply(this, arguments)) / 2 - an / 2;
    return [G(m) * n, D(m) * n];
  }, i.innerRadius = function(n) {
    return arguments.length ? (l = typeof n == "function" ? n : S(+n), i) : l;
  }, i.outerRadius = function(n) {
    return arguments.length ? (h = typeof n == "function" ? n : S(+n), i) : h;
  }, i.cornerRadius = function(n) {
    return arguments.length ? (z = typeof n == "function" ? n : S(+n), i) : z;
  }, i.padRadius = function(n) {
    return arguments.length ? (E = n == null ? null : typeof n == "function" ? n : S(+n), i) : E;
  }, i.startAngle = function(n) {
    return arguments.length ? (v = typeof n == "function" ? n : S(+n), i) : v;
  }, i.endAngle = function(n) {
    return arguments.length ? (A = typeof n == "function" ? n : S(+n), i) : A;
  }, i.padAngle = function(n) {
    return arguments.length ? (U = typeof n == "function" ? n : S(+n), i) : U;
  }, i.context = function(n) {
    return arguments.length ? (a = n ?? null, i) : a;
  }, i;
}
export {
  vn as d
};
