import { c as Y, p as sn } from "./constant-2fe7eae5.js";
import { aY as en, aZ as z, a_ as P, a$ as rn, b0 as y, X as ln, b1 as F, b2 as k, b3 as an, b4 as t, b5 as un, b6 as on, b7 as tn } from "./mermaid-d733041c.js";
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
function pn(l, x, D, q, h, v, Z, r) {
  var s = D - l, n = q - x, m = Z - h, i = r - v, a = i * s - m * n;
  if (!(a * a < y))
    return a = (m * (x - v) - i * (l - h)) / a, [l + a * s, x + a * n];
}
function L(l, x, D, q, h, v, Z) {
  var r = l - D, s = x - q, n = (Z ? v : -v) / F(r * r + s * s), m = n * s, i = -n * r, a = l + m, f = x + i, c = D + m, E = q + i, o = (a + c) / 2, I = (f + E) / 2, p = c - a, g = E - f, A = p * p + g * g, O = h - v, b = a * E - c * f, S = (g < 0 ? -1 : 1) * F(tn(0, O * O * A - b * b)), X = (b * g - p * S) / A, d = (-b * p - g * S) / A, R = (b * g + p * S) / A, T = (-b * p + g * S) / A, e = X - o, u = d - I, $ = R - o, j = T - I;
  return e * e + u * u > $ * $ + j * j && (X = R, d = T), {
    cx: X,
    cy: d,
    x01: -m,
    y01: -i,
    x11: X * (h / O - 1),
    y11: d * (h / O - 1)
  };
}
function hn() {
  var l = fn, x = cn, D = Y(0), q = null, h = yn, v = gn, Z = mn, r = null;
  function s() {
    var n, m, i = +l.apply(this, arguments), a = +x.apply(this, arguments), f = h.apply(this, arguments) - rn, c = v.apply(this, arguments) - rn, E = an(c - f), o = c > f;
    if (r || (r = n = sn()), a < i && (m = a, a = i, i = m), !(a > y))
      r.moveTo(0, 0);
    else if (E > ln - y)
      r.moveTo(a * z(f), a * P(f)), r.arc(0, 0, a, f, c, !o), i > y && (r.moveTo(i * z(c), i * P(c)), r.arc(0, 0, i, c, f, o));
    else {
      var I = f, p = c, g = f, A = c, O = E, b = E, S = Z.apply(this, arguments) / 2, X = S > y && (q ? +q.apply(this, arguments) : F(i * i + a * a)), d = k(an(a - i) / 2, +D.apply(this, arguments)), R = d, T = d, e, u;
      if (X > y) {
        var $ = un(X / i * P(S)), j = un(X / a * P(S));
        (O -= $ * 2) > y ? ($ *= o ? 1 : -1, g += $, A -= $) : (O = 0, g = A = (f + c) / 2), (b -= j * 2) > y ? (j *= o ? 1 : -1, I += j, p -= j) : (b = 0, I = p = (f + c) / 2);
      }
      var B = a * z(I), C = a * P(I), G = i * z(A), H = i * P(A);
      if (d > y) {
        var J = a * z(p), K = a * P(p), M = i * z(g), N = i * P(g), w;
        if (E < en && (w = pn(B, C, M, N, J, K, G, H))) {
          var Q = B - w[0], U = C - w[1], V = J - w[0], W = K - w[1], _ = 1 / P(on((Q * V + U * W) / (F(Q * Q + U * U) * F(V * V + W * W))) / 2), nn = F(w[0] * w[0] + w[1] * w[1]);
          R = k(d, (i - nn) / (_ - 1)), T = k(d, (a - nn) / (_ + 1));
        }
      }
      b > y ? T > y ? (e = L(M, N, B, C, a, T, o), u = L(J, K, G, H, a, T, o), r.moveTo(e.cx + e.x01, e.cy + e.y01), T < d ? r.arc(e.cx, e.cy, T, t(e.y01, e.x01), t(u.y01, u.x01), !o) : (r.arc(e.cx, e.cy, T, t(e.y01, e.x01), t(e.y11, e.x11), !o), r.arc(0, 0, a, t(e.cy + e.y11, e.cx + e.x11), t(u.cy + u.y11, u.cx + u.x11), !o), r.arc(u.cx, u.cy, T, t(u.y11, u.x11), t(u.y01, u.x01), !o))) : (r.moveTo(B, C), r.arc(0, 0, a, I, p, !o)) : r.moveTo(B, C), !(i > y) || !(O > y) ? r.lineTo(G, H) : R > y ? (e = L(G, H, J, K, i, -R, o), u = L(B, C, M, N, i, -R, o), r.lineTo(e.cx + e.x01, e.cy + e.y01), R < d ? r.arc(e.cx, e.cy, R, t(e.y01, e.x01), t(u.y01, u.x01), !o) : (r.arc(e.cx, e.cy, R, t(e.y01, e.x01), t(e.y11, e.x11), !o), r.arc(0, 0, i, t(e.cy + e.y11, e.cx + e.x11), t(u.cy + u.y11, u.cx + u.x11), o), r.arc(u.cx, u.cy, R, t(u.y11, u.x11), t(u.y01, u.x01), !o))) : r.arc(0, 0, i, A, g, o);
    }
    if (r.closePath(), n)
      return r = null, n + "" || null;
  }
  return s.centroid = function() {
    var n = (+l.apply(this, arguments) + +x.apply(this, arguments)) / 2, m = (+h.apply(this, arguments) + +v.apply(this, arguments)) / 2 - en / 2;
    return [z(m) * n, P(m) * n];
  }, s.innerRadius = function(n) {
    return arguments.length ? (l = typeof n == "function" ? n : Y(+n), s) : l;
  }, s.outerRadius = function(n) {
    return arguments.length ? (x = typeof n == "function" ? n : Y(+n), s) : x;
  }, s.cornerRadius = function(n) {
    return arguments.length ? (D = typeof n == "function" ? n : Y(+n), s) : D;
  }, s.padRadius = function(n) {
    return arguments.length ? (q = n == null ? null : typeof n == "function" ? n : Y(+n), s) : q;
  }, s.startAngle = function(n) {
    return arguments.length ? (h = typeof n == "function" ? n : Y(+n), s) : h;
  }, s.endAngle = function(n) {
    return arguments.length ? (v = typeof n == "function" ? n : Y(+n), s) : v;
  }, s.padAngle = function(n) {
    return arguments.length ? (Z = typeof n == "function" ? n : Y(+n), s) : Z;
  }, s.context = function(n) {
    return arguments.length ? (r = n ?? null, s) : r;
  }, s;
}
export {
  hn as d
};
