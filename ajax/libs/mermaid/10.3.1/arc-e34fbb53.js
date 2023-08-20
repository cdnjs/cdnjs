import { c as J, p as sn } from "./constant-2fe7eae5.js";
import { aD as en, aE as y, W as ln, aF as N, aG as D, aH as j, aI as b, aJ as an, aK as rn, aL as t, aM as un, aN as on, aO as tn } from "./mermaid-7e6c58c3.js";
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
function pn(l, x, O, E, h, v, K, a) {
  var s = O - l, n = E - x, m = K - h, i = a - v, r = i * s - m * n;
  if (!(r * r < y))
    return r = (m * (x - v) - i * (l - h)) / r, [l + r * s, x + r * n];
}
function U(l, x, O, E, h, v, K) {
  var a = l - O, s = x - E, n = (K ? v : -v) / j(a * a + s * s), m = n * s, i = -n * a, r = l + m, f = x + i, c = O + m, q = E + i, o = (r + c) / 2, w = (f + q) / 2, p = c - r, g = q - f, A = p * p + g * g, F = h - v, P = r * q - c * f, G = (g < 0 ? -1 : 1) * j(tn(0, F * F * A - P * P)), H = (P * g - p * G) / A, d = (-P * p - g * G) / A, R = (P * g + p * G) / A, T = (-P * p + g * G) / A, e = H - o, u = d - w, L = R - o, M = T - w;
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
  var l = fn, x = cn, O = J(0), E = null, h = yn, v = gn, K = mn, a = null;
  function s() {
    var n, m, i = +l.apply(this, arguments), r = +x.apply(this, arguments), f = h.apply(this, arguments) - en, c = v.apply(this, arguments) - en, q = an(c - f), o = c > f;
    if (a || (a = n = sn()), r < i && (m = r, r = i, i = m), !(r > y))
      a.moveTo(0, 0);
    else if (q > ln - y)
      a.moveTo(r * N(f), r * D(f)), a.arc(0, 0, r, f, c, !o), i > y && (a.moveTo(i * N(c), i * D(c)), a.arc(0, 0, i, c, f, o));
    else {
      var w = f, p = c, g = f, A = c, F = q, P = q, G = K.apply(this, arguments) / 2, H = G > y && (E ? +E.apply(this, arguments) : j(i * i + r * r)), d = b(an(r - i) / 2, +O.apply(this, arguments)), R = d, T = d, e, u;
      if (H > y) {
        var L = un(H / i * D(G)), M = un(H / r * D(G));
        (F -= L * 2) > y ? (L *= o ? 1 : -1, g += L, A -= L) : (F = 0, g = A = (f + c) / 2), (P -= M * 2) > y ? (M *= o ? 1 : -1, w += M, p -= M) : (P = 0, w = p = (f + c) / 2);
      }
      var S = r * N(w), W = r * D(w), z = i * N(A), B = i * D(A);
      if (d > y) {
        var C = r * N(p), Q = r * D(p), V = i * N(g), X = i * D(g), I;
        if (q < rn && (I = pn(S, W, V, X, C, Q, z, B))) {
          var Y = S - I[0], Z = W - I[1], $ = C - I[0], k = Q - I[1], _ = 1 / D(on((Y * $ + Z * k) / (j(Y * Y + Z * Z) * j($ * $ + k * k))) / 2), nn = j(I[0] * I[0] + I[1] * I[1]);
          R = b(d, (i - nn) / (_ - 1)), T = b(d, (r - nn) / (_ + 1));
        }
      }
      P > y ? T > y ? (e = U(V, X, S, W, r, T, o), u = U(C, Q, z, B, r, T, o), a.moveTo(e.cx + e.x01, e.cy + e.y01), T < d ? a.arc(e.cx, e.cy, T, t(e.y01, e.x01), t(u.y01, u.x01), !o) : (a.arc(e.cx, e.cy, T, t(e.y01, e.x01), t(e.y11, e.x11), !o), a.arc(0, 0, r, t(e.cy + e.y11, e.cx + e.x11), t(u.cy + u.y11, u.cx + u.x11), !o), a.arc(u.cx, u.cy, T, t(u.y11, u.x11), t(u.y01, u.x01), !o))) : (a.moveTo(S, W), a.arc(0, 0, r, w, p, !o)) : a.moveTo(S, W), !(i > y) || !(F > y) ? a.lineTo(z, B) : R > y ? (e = U(z, B, C, Q, i, -R, o), u = U(S, W, V, X, i, -R, o), a.lineTo(e.cx + e.x01, e.cy + e.y01), R < d ? a.arc(e.cx, e.cy, R, t(e.y01, e.x01), t(u.y01, u.x01), !o) : (a.arc(e.cx, e.cy, R, t(e.y01, e.x01), t(e.y11, e.x11), !o), a.arc(0, 0, i, t(e.cy + e.y11, e.cx + e.x11), t(u.cy + u.y11, u.cx + u.x11), o), a.arc(u.cx, u.cy, R, t(u.y11, u.x11), t(u.y01, u.x01), !o))) : a.arc(0, 0, i, A, g, o);
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
    return arguments.length ? (O = typeof n == "function" ? n : J(+n), s) : O;
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
