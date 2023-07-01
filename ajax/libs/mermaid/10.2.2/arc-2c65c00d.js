import { c as H, p as sn } from "./constant-2fe7eae5.js";
import { aB as en, aC as y, Q as ln, aD as M, aE as D, aF as S, aG as b, aH as an, aI as rn, aJ as t, aK as un, aL as on, aM as tn } from "./mermaid-08b2ff5f.js";
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
function pn(l, x, q, E, h, v, J, a) {
  var s = q - l, n = E - x, m = J - h, i = a - v, r = i * s - m * n;
  if (!(r * r < y))
    return r = (m * (x - v) - i * (l - h)) / r, [l + r * s, x + r * n];
}
function V(l, x, q, E, h, v, J) {
  var a = l - q, s = x - E, n = (J ? v : -v) / S(a * a + s * s), m = n * s, i = -n * a, r = l + m, f = x + i, c = q + m, w = E + i, o = (r + c) / 2, B = (f + w) / 2, p = c - r, g = w - f, A = p * p + g * g, C = h - v, P = r * w - c * f, F = (g < 0 ? -1 : 1) * S(tn(0, C * C * A - P * P)), G = (P * g - p * F) / A, d = (-P * p - g * F) / A, R = (P * g + p * F) / A, T = (-P * p + g * F) / A, e = G - o, u = d - B, K = R - o, L = T - B;
  return e * e + u * u > K * K + L * L && (G = R, d = T), {
    cx: G,
    cy: d,
    x01: -m,
    y01: -i,
    x11: G * (h / C - 1),
    y11: d * (h / C - 1)
  };
}
function hn() {
  var l = fn, x = cn, q = H(0), E = null, h = yn, v = gn, J = mn, a = null;
  function s() {
    var n, m, i = +l.apply(this, arguments), r = +x.apply(this, arguments), f = h.apply(this, arguments) - en, c = v.apply(this, arguments) - en, w = an(c - f), o = c > f;
    if (a || (a = n = sn()), r < i && (m = r, r = i, i = m), !(r > y))
      a.moveTo(0, 0);
    else if (w > ln - y)
      a.moveTo(r * M(f), r * D(f)), a.arc(0, 0, r, f, c, !o), i > y && (a.moveTo(i * M(c), i * D(c)), a.arc(0, 0, i, c, f, o));
    else {
      var B = f, p = c, g = f, A = c, C = w, P = w, F = J.apply(this, arguments) / 2, G = F > y && (E ? +E.apply(this, arguments) : S(i * i + r * r)), d = b(an(r - i) / 2, +q.apply(this, arguments)), R = d, T = d, e, u;
      if (G > y) {
        var K = un(G / i * D(F)), L = un(G / r * D(F));
        (C -= K * 2) > y ? (K *= o ? 1 : -1, g += K, A -= K) : (C = 0, g = A = (f + c) / 2), (P -= L * 2) > y ? (L *= o ? 1 : -1, B += L, p -= L) : (P = 0, B = p = (f + c) / 2);
      }
      var O = r * M(B), Q = r * D(B), j = i * M(A), z = i * D(A);
      if (d > y) {
        var N = r * M(p), U = r * D(p), W = i * M(g), X = i * D(g), I;
        if (w < rn && (I = pn(O, Q, W, X, N, U, j, z))) {
          var Y = O - I[0], Z = Q - I[1], $ = N - I[0], k = U - I[1], _ = 1 / D(on((Y * $ + Z * k) / (S(Y * Y + Z * Z) * S($ * $ + k * k))) / 2), nn = S(I[0] * I[0] + I[1] * I[1]);
          R = b(d, (i - nn) / (_ - 1)), T = b(d, (r - nn) / (_ + 1));
        }
      }
      P > y ? T > y ? (e = V(W, X, O, Q, r, T, o), u = V(N, U, j, z, r, T, o), a.moveTo(e.cx + e.x01, e.cy + e.y01), T < d ? a.arc(e.cx, e.cy, T, t(e.y01, e.x01), t(u.y01, u.x01), !o) : (a.arc(e.cx, e.cy, T, t(e.y01, e.x01), t(e.y11, e.x11), !o), a.arc(0, 0, r, t(e.cy + e.y11, e.cx + e.x11), t(u.cy + u.y11, u.cx + u.x11), !o), a.arc(u.cx, u.cy, T, t(u.y11, u.x11), t(u.y01, u.x01), !o))) : (a.moveTo(O, Q), a.arc(0, 0, r, B, p, !o)) : a.moveTo(O, Q), !(i > y) || !(C > y) ? a.lineTo(j, z) : R > y ? (e = V(j, z, N, U, i, -R, o), u = V(O, Q, W, X, i, -R, o), a.lineTo(e.cx + e.x01, e.cy + e.y01), R < d ? a.arc(e.cx, e.cy, R, t(e.y01, e.x01), t(u.y01, u.x01), !o) : (a.arc(e.cx, e.cy, R, t(e.y01, e.x01), t(e.y11, e.x11), !o), a.arc(0, 0, i, t(e.cy + e.y11, e.cx + e.x11), t(u.cy + u.y11, u.cx + u.x11), o), a.arc(u.cx, u.cy, R, t(u.y11, u.x11), t(u.y01, u.x01), !o))) : a.arc(0, 0, i, A, g, o);
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
    return arguments.length ? (q = typeof n == "function" ? n : H(+n), s) : q;
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
