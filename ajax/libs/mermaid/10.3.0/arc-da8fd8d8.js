import { c as J, p as sn } from "./constant-2fe7eae5.js";
import { aC as en, aD as y, V as ln, aE as N, aF as D, aG as V, aH as b, aI as an, aJ as rn, aK as t, aL as un, aM as on, aN as tn } from "./mermaid-42f7bf2b.js";
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
function pn(l, x, q, E, h, v, K, a) {
  var s = q - l, n = E - x, m = K - h, i = a - v, r = i * s - m * n;
  if (!(r * r < y))
    return r = (m * (x - v) - i * (l - h)) / r, [l + r * s, x + r * n];
}
function U(l, x, q, E, h, v, K) {
  var a = l - q, s = x - E, n = (K ? v : -v) / V(a * a + s * s), m = n * s, i = -n * a, r = l + m, f = x + i, c = q + m, w = E + i, o = (r + c) / 2, C = (f + w) / 2, p = c - r, g = w - f, A = p * p + g * g, F = h - v, P = r * w - c * f, G = (g < 0 ? -1 : 1) * V(tn(0, F * F * A - P * P)), H = (P * g - p * G) / A, d = (-P * p - g * G) / A, R = (P * g + p * G) / A, T = (-P * p + g * G) / A, e = H - o, u = d - C, L = R - o, M = T - C;
  return e * e + u * u > L * L + M * M && (H = R, d = T), {
    cx: H,
    cy: d,
    x01: -m,
    y01: -i,
    x11: H * (h / F - 1),
    y11: d * (h / F - 1)
  };
}
function hn() {
  var l = fn, x = cn, q = J(0), E = null, h = yn, v = gn, K = mn, a = null;
  function s() {
    var n, m, i = +l.apply(this, arguments), r = +x.apply(this, arguments), f = h.apply(this, arguments) - en, c = v.apply(this, arguments) - en, w = an(c - f), o = c > f;
    if (a || (a = n = sn()), r < i && (m = r, r = i, i = m), !(r > y))
      a.moveTo(0, 0);
    else if (w > ln - y)
      a.moveTo(r * N(f), r * D(f)), a.arc(0, 0, r, f, c, !o), i > y && (a.moveTo(i * N(c), i * D(c)), a.arc(0, 0, i, c, f, o));
    else {
      var C = f, p = c, g = f, A = c, F = w, P = w, G = K.apply(this, arguments) / 2, H = G > y && (E ? +E.apply(this, arguments) : V(i * i + r * r)), d = b(an(r - i) / 2, +q.apply(this, arguments)), R = d, T = d, e, u;
      if (H > y) {
        var L = un(H / i * D(G)), M = un(H / r * D(G));
        (F -= L * 2) > y ? (L *= o ? 1 : -1, g += L, A -= L) : (F = 0, g = A = (f + c) / 2), (P -= M * 2) > y ? (M *= o ? 1 : -1, C += M, p -= M) : (P = 0, C = p = (f + c) / 2);
      }
      var O = r * N(C), S = r * D(C), j = i * N(A), z = i * D(A);
      if (d > y) {
        var B = r * N(p), Q = r * D(p), W = i * N(g), X = i * D(g), I;
        if (w < rn && (I = pn(O, S, W, X, B, Q, j, z))) {
          var Y = O - I[0], Z = S - I[1], $ = B - I[0], k = Q - I[1], _ = 1 / D(on((Y * $ + Z * k) / (V(Y * Y + Z * Z) * V($ * $ + k * k))) / 2), nn = V(I[0] * I[0] + I[1] * I[1]);
          R = b(d, (i - nn) / (_ - 1)), T = b(d, (r - nn) / (_ + 1));
        }
      }
      P > y ? T > y ? (e = U(W, X, O, S, r, T, o), u = U(B, Q, j, z, r, T, o), a.moveTo(e.cx + e.x01, e.cy + e.y01), T < d ? a.arc(e.cx, e.cy, T, t(e.y01, e.x01), t(u.y01, u.x01), !o) : (a.arc(e.cx, e.cy, T, t(e.y01, e.x01), t(e.y11, e.x11), !o), a.arc(0, 0, r, t(e.cy + e.y11, e.cx + e.x11), t(u.cy + u.y11, u.cx + u.x11), !o), a.arc(u.cx, u.cy, T, t(u.y11, u.x11), t(u.y01, u.x01), !o))) : (a.moveTo(O, S), a.arc(0, 0, r, C, p, !o)) : a.moveTo(O, S), !(i > y) || !(F > y) ? a.lineTo(j, z) : R > y ? (e = U(j, z, B, Q, i, -R, o), u = U(O, S, W, X, i, -R, o), a.lineTo(e.cx + e.x01, e.cy + e.y01), R < d ? a.arc(e.cx, e.cy, R, t(e.y01, e.x01), t(u.y01, u.x01), !o) : (a.arc(e.cx, e.cy, R, t(e.y01, e.x01), t(e.y11, e.x11), !o), a.arc(0, 0, i, t(e.cy + e.y11, e.cx + e.x11), t(u.cy + u.y11, u.cx + u.x11), o), a.arc(u.cx, u.cy, R, t(u.y11, u.x11), t(u.y01, u.x01), !o))) : a.arc(0, 0, i, A, g, o);
    }
    if (a.closePath(), n)
      return a = null, n + "" || null;
  }
  return s.centroid = function() {
    var n = (+l.apply(this, arguments) + +x.apply(this, arguments)) / 2, m = (+h.apply(this, arguments) + +v.apply(this, arguments)) / 2 - rn / 2;
    return [N(m) * n, D(m) * n];
  }, s.innerRadius = function(n) {
    return arguments.length ? (l = typeof n == "function" ? n : J(+n), s) : l;
  }, s.outerRadius = function(n) {
    return arguments.length ? (x = typeof n == "function" ? n : J(+n), s) : x;
  }, s.cornerRadius = function(n) {
    return arguments.length ? (q = typeof n == "function" ? n : J(+n), s) : q;
  }, s.padRadius = function(n) {
    return arguments.length ? (E = n == null ? null : typeof n == "function" ? n : J(+n), s) : E;
  }, s.startAngle = function(n) {
    return arguments.length ? (h = typeof n == "function" ? n : J(+n), s) : h;
  }, s.endAngle = function(n) {
    return arguments.length ? (v = typeof n == "function" ? n : J(+n), s) : v;
  }, s.padAngle = function(n) {
    return arguments.length ? (K = typeof n == "function" ? n : J(+n), s) : K;
  }, s.context = function(n) {
    return arguments.length ? (a = n ?? null, s) : a;
  }, s;
}
export {
  hn as d
};
