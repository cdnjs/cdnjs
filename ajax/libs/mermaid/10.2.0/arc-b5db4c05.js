import { c as H, p as sn } from "./constant-2fe7eae5.js";
import { aD as en, aE as y, S as ln, aF as M, aG as D, aH as z, aI as b, aJ as an, aK as rn, aL as t, aM as un, aN as on, aO as tn } from "./mermaid-9357f3d0.js";
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
function pn(l, x, O, E, h, v, J, a) {
  var s = O - l, n = E - x, m = J - h, i = a - v, r = i * s - m * n;
  if (!(r * r < y))
    return r = (m * (x - v) - i * (l - h)) / r, [l + r * s, x + r * n];
}
function V(l, x, O, E, h, v, J) {
  var a = l - O, s = x - E, n = (J ? v : -v) / z(a * a + s * s), m = n * s, i = -n * a, r = l + m, f = x + i, c = O + m, S = E + i, o = (r + c) / 2, q = (f + S) / 2, p = c - r, g = S - f, A = p * p + g * g, w = h - v, P = r * S - c * f, F = (g < 0 ? -1 : 1) * z(tn(0, w * w * A - P * P)), G = (P * g - p * F) / A, d = (-P * p - g * F) / A, R = (P * g + p * F) / A, T = (-P * p + g * F) / A, e = G - o, u = d - q, K = R - o, L = T - q;
  return e * e + u * u > K * K + L * L && (G = R, d = T), {
    cx: G,
    cy: d,
    x01: -m,
    y01: -i,
    x11: G * (h / w - 1),
    y11: d * (h / w - 1)
  };
}
function hn() {
  var l = fn, x = cn, O = H(0), E = null, h = yn, v = gn, J = mn, a = null;
  function s() {
    var n, m, i = +l.apply(this, arguments), r = +x.apply(this, arguments), f = h.apply(this, arguments) - en, c = v.apply(this, arguments) - en, S = an(c - f), o = c > f;
    if (a || (a = n = sn()), r < i && (m = r, r = i, i = m), !(r > y))
      a.moveTo(0, 0);
    else if (S > ln - y)
      a.moveTo(r * M(f), r * D(f)), a.arc(0, 0, r, f, c, !o), i > y && (a.moveTo(i * M(c), i * D(c)), a.arc(0, 0, i, c, f, o));
    else {
      var q = f, p = c, g = f, A = c, w = S, P = S, F = J.apply(this, arguments) / 2, G = F > y && (E ? +E.apply(this, arguments) : z(i * i + r * r)), d = b(an(r - i) / 2, +O.apply(this, arguments)), R = d, T = d, e, u;
      if (G > y) {
        var K = un(G / i * D(F)), L = un(G / r * D(F));
        (w -= K * 2) > y ? (K *= o ? 1 : -1, g += K, A -= K) : (w = 0, g = A = (f + c) / 2), (P -= L * 2) > y ? (L *= o ? 1 : -1, q += L, p -= L) : (P = 0, q = p = (f + c) / 2);
      }
      var N = r * M(q), j = r * D(q), B = i * M(A), C = i * D(A);
      if (d > y) {
        var Q = r * M(p), U = r * D(p), W = i * M(g), X = i * D(g), I;
        if (S < rn && (I = pn(N, j, W, X, Q, U, B, C))) {
          var Y = N - I[0], Z = j - I[1], $ = Q - I[0], k = U - I[1], _ = 1 / D(on((Y * $ + Z * k) / (z(Y * Y + Z * Z) * z($ * $ + k * k))) / 2), nn = z(I[0] * I[0] + I[1] * I[1]);
          R = b(d, (i - nn) / (_ - 1)), T = b(d, (r - nn) / (_ + 1));
        }
      }
      P > y ? T > y ? (e = V(W, X, N, j, r, T, o), u = V(Q, U, B, C, r, T, o), a.moveTo(e.cx + e.x01, e.cy + e.y01), T < d ? a.arc(e.cx, e.cy, T, t(e.y01, e.x01), t(u.y01, u.x01), !o) : (a.arc(e.cx, e.cy, T, t(e.y01, e.x01), t(e.y11, e.x11), !o), a.arc(0, 0, r, t(e.cy + e.y11, e.cx + e.x11), t(u.cy + u.y11, u.cx + u.x11), !o), a.arc(u.cx, u.cy, T, t(u.y11, u.x11), t(u.y01, u.x01), !o))) : (a.moveTo(N, j), a.arc(0, 0, r, q, p, !o)) : a.moveTo(N, j), !(i > y) || !(w > y) ? a.lineTo(B, C) : R > y ? (e = V(B, C, Q, U, i, -R, o), u = V(N, j, W, X, i, -R, o), a.lineTo(e.cx + e.x01, e.cy + e.y01), R < d ? a.arc(e.cx, e.cy, R, t(e.y01, e.x01), t(u.y01, u.x01), !o) : (a.arc(e.cx, e.cy, R, t(e.y01, e.x01), t(e.y11, e.x11), !o), a.arc(0, 0, i, t(e.cy + e.y11, e.cx + e.x11), t(u.cy + u.y11, u.cx + u.x11), o), a.arc(u.cx, u.cy, R, t(u.y11, u.x11), t(u.y01, u.x01), !o))) : a.arc(0, 0, i, A, g, o);
    }
    if (a.closePath(), n)
      return a = null, n + "" || null;
  }
  return s.centroid = function() {
    var n = (+l.apply(this, arguments) + +x.apply(this, arguments)) / 2, m = (+h.apply(this, arguments) + +v.apply(this, arguments)) / 2 - rn / 2;
    return [M(m) * n, D(m) * n];
  }, s.innerRadius = function(n) {
    return arguments.length ? (l = typeof n == "function" ? n : H(+n), s) : l;
  }, s.outerRadius = function(n) {
    return arguments.length ? (x = typeof n == "function" ? n : H(+n), s) : x;
  }, s.cornerRadius = function(n) {
    return arguments.length ? (O = typeof n == "function" ? n : H(+n), s) : O;
  }, s.padRadius = function(n) {
    return arguments.length ? (E = n == null ? null : typeof n == "function" ? n : H(+n), s) : E;
  }, s.startAngle = function(n) {
    return arguments.length ? (h = typeof n == "function" ? n : H(+n), s) : h;
  }, s.endAngle = function(n) {
    return arguments.length ? (v = typeof n == "function" ? n : H(+n), s) : v;
  }, s.padAngle = function(n) {
    return arguments.length ? (J = typeof n == "function" ? n : H(+n), s) : J;
  }, s.context = function(n) {
    return arguments.length ? (a = n ?? null, s) : a;
  }, s;
}
export {
  hn as d
};
