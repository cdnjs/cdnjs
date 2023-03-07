import { g as _, l as X, h as Dt, i as Pe, u as At, r as H, j as ve, s as Be, a as Et, f as j, k as jt, p as It, m as Ct, t as Z, n as Mt } from "./config-f375a171.js";
import { a as Ue, r as kt, d as Ge, g as Ne, b as Lt, U as Ft, e as xt, c as Y, f as B, t as R, h as q, M as re, j as _t, k as Rt, p as Ot, u as Vt, m as Pt, n as Bt } from "./utils-b2e69cd8.js";
import { r as Ut } from "./errorRenderer-42e96268.js";
var ze = "comm", Xe = "rule", He = "decl", Gt = "@import", Nt = "@keyframes", zt = Math.abs, me = String.fromCharCode;
function Ye(e) {
  return e.trim();
}
function ae(e, t, r) {
  return e.replace(t, r);
}
function Xt(e, t) {
  return e.indexOf(t);
}
function W(e, t) {
  return e.charCodeAt(t) | 0;
}
function P(e, t, r) {
  return e.slice(t, r);
}
function I(e) {
  return e.length;
}
function qe(e) {
  return e.length;
}
function U(e, t) {
  return t.push(e), e;
}
var K = 1, x = 1, We = 0, $ = 0, m = 0, O = "";
function fe(e, t, r, a, n, o, l) {
  return { value: e, root: t, parent: r, type: a, props: n, children: o, line: K, column: x, length: l, return: "" };
}
function Ht() {
  return m;
}
function Yt() {
  return m = $ > 0 ? W(O, --$) : 0, x--, m === 10 && (x = 1, K--), m;
}
function v() {
  return m = $ < We ? W(O, $++) : 0, x++, m === 10 && (x = 1, K++), m;
}
function k() {
  return W(O, $);
}
function G() {
  return $;
}
function J(e, t) {
  return P(O, e, t);
}
function ne(e) {
  switch (e) {
    case 0:
    case 9:
    case 10:
    case 13:
    case 32:
      return 5;
    case 33:
    case 43:
    case 44:
    case 47:
    case 62:
    case 64:
    case 126:
    case 59:
    case 123:
    case 125:
      return 4;
    case 58:
      return 3;
    case 34:
    case 39:
    case 40:
    case 91:
      return 2;
    case 41:
    case 93:
      return 1;
  }
  return 0;
}
function qt(e) {
  return K = x = 1, We = I(O = e), $ = 0, [];
}
function Wt(e) {
  return O = "", e;
}
function ee(e) {
  return Ye(J($ - 1, se(e === 91 ? e + 2 : e === 40 ? e + 1 : e)));
}
function Kt(e) {
  for (; (m = k()) && m < 33; )
    v();
  return ne(e) > 2 || ne(m) > 3 ? "" : " ";
}
function Jt(e, t) {
  for (; --t && v() && !(m < 48 || m > 102 || m > 57 && m < 65 || m > 70 && m < 97); )
    ;
  return J(e, G() + (t < 6 && k() == 32 && v() == 32));
}
function se(e) {
  for (; v(); )
    switch (m) {
      case e:
        return $;
      case 34:
      case 39:
        e !== 34 && e !== 39 && se(m);
        break;
      case 40:
        e === 41 && se(e);
        break;
      case 92:
        v();
        break;
    }
  return $;
}
function Qt(e, t) {
  for (; v() && e + m !== 47 + 10; )
    if (e + m === 42 + 42 && k() === 47)
      break;
  return "/*" + J(t, $ - 1) + "*" + me(e === 47 ? e : v());
}
function Zt(e) {
  for (; !ne(k()); )
    v();
  return J(e, $);
}
function er(e) {
  return Wt(N("", null, null, null, [""], e = qt(e), 0, [0], e));
}
function N(e, t, r, a, n, o, l, p, w) {
  for (var y = 0, s = 0, d = l, A = 0, E = 0, u = 0, h = 1, L = 1, g = 1, f = 0, T = "", F = n, S = o, b = a, i = T; L; )
    switch (u = f, f = v()) {
      case 40:
        if (u != 108 && W(i, d - 1) == 58) {
          Xt(i += ae(ee(f), "&", "&\f"), "&\f") != -1 && (g = -1);
          break;
        }
      case 34:
      case 39:
      case 91:
        i += ee(f);
        break;
      case 9:
      case 10:
      case 13:
      case 32:
        i += Kt(u);
        break;
      case 92:
        i += Jt(G() - 1, 7);
        continue;
      case 47:
        switch (k()) {
          case 42:
          case 47:
            U(tr(Qt(v(), G()), t, r), w);
            break;
          default:
            i += "/";
        }
        break;
      case 123 * h:
        p[y++] = I(i) * g;
      case 125 * h:
      case 59:
      case 0:
        switch (f) {
          case 0:
          case 125:
            L = 0;
          case 59 + s:
            E > 0 && I(i) - d && U(E > 32 ? Se(i + ";", a, r, d - 1) : Se(ae(i, " ", "") + ";", a, r, d - 2), w);
            break;
          case 59:
            i += ";";
          default:
            if (U(b = Te(i, t, r, y, s, n, p, T, F = [], S = [], d), o), f === 123)
              if (s === 0)
                N(i, t, b, b, F, o, d, p, S);
              else
                switch (A) {
                  case 100:
                  case 109:
                  case 115:
                    N(e, b, b, a && U(Te(e, b, b, 0, 0, n, p, T, n, F = [], d), S), n, S, d, p, a ? F : S);
                    break;
                  default:
                    N(i, b, b, b, [""], S, 0, p, S);
                }
        }
        y = s = E = 0, h = g = 1, T = i = "", d = l;
        break;
      case 58:
        d = 1 + I(i), E = u;
      default:
        if (h < 1) {
          if (f == 123)
            --h;
          else if (f == 125 && h++ == 0 && Yt() == 125)
            continue;
        }
        switch (i += me(f), f * h) {
          case 38:
            g = s > 0 ? 1 : (i += "\f", -1);
            break;
          case 44:
            p[y++] = (I(i) - 1) * g, g = 1;
            break;
          case 64:
            k() === 45 && (i += ee(v())), A = k(), s = d = I(T = i += Zt(G())), f++;
            break;
          case 45:
            u === 45 && I(i) == 2 && (h = 0);
        }
    }
  return o;
}
function Te(e, t, r, a, n, o, l, p, w, y, s) {
  for (var d = n - 1, A = n === 0 ? o : [""], E = qe(A), u = 0, h = 0, L = 0; u < a; ++u)
    for (var g = 0, f = P(e, d + 1, d = zt(h = l[u])), T = e; g < E; ++g)
      (T = Ye(h > 0 ? A[g] + " " + f : ae(f, /&\f/g, A[g]))) && (w[L++] = T);
  return fe(e, t, r, n === 0 ? Xe : p, w, y, s);
}
function tr(e, t, r) {
  return fe(e, t, r, ze, me(Ht()), P(e, 2, -2), 0);
}
function Se(e, t, r, a) {
  return fe(e, t, r, He, P(e, 0, a), P(e, a + 1, -1), a);
}
function oe(e, t) {
  for (var r = "", a = qe(e), n = 0; n < a; n++)
    r += t(e[n], n, e, t) || "";
  return r;
}
function rr(e, t, r, a) {
  switch (e.type) {
    case Gt:
    case He:
      return e.return = e.return || e.value;
    case ze:
      return "";
    case Nt:
      return e.return = e.value + "{" + oe(e.children, a) + "}";
    case Xe:
      e.value = e.props.join(",");
  }
  return I(r = oe(e.children, a)) ? e.return = e.value + "{" + r + "}" : "";
}
const De = "10.0.3-alpha.1", Ke = "c4", ar = (e) => e.match(/^\s*C4Context|C4Container|C4Component|C4Dynamic|C4Deployment/) !== null, nr = async () => {
  const { diagram: e } = await import("./c4Diagram-c009b50f.js");
  return { id: Ke, diagram: e };
}, sr = {
  id: Ke,
  detector: ar,
  loader: nr
}, or = sr, Je = "flowchart", cr = (e, t) => {
  var r, a;
  return ((r = t == null ? void 0 : t.flowchart) == null ? void 0 : r.defaultRenderer) === "dagre-wrapper" || ((a = t == null ? void 0 : t.flowchart) == null ? void 0 : a.defaultRenderer) === "elk" ? !1 : e.match(/^\s*graph/) !== null;
}, ir = async () => {
  const { diagram: e } = await import("./flowDiagram-c2f1eab0.js");
  return { id: Je, diagram: e };
}, dr = {
  id: Je,
  detector: cr,
  loader: ir
}, lr = dr, Qe = "flowchart-v2", ur = (e, t) => {
  var r, a, n;
  return ((r = t == null ? void 0 : t.flowchart) == null ? void 0 : r.defaultRenderer) === "dagre-d3" || ((a = t == null ? void 0 : t.flowchart) == null ? void 0 : a.defaultRenderer) === "elk" ? !1 : e.match(/^\s*graph/) !== null && ((n = t == null ? void 0 : t.flowchart) == null ? void 0 : n.defaultRenderer) === "dagre-wrapper" ? !0 : e.match(/^\s*flowchart/) !== null;
}, mr = async () => {
  const { diagram: e } = await import("./flowDiagram-v2-64754fe6.js");
  return { id: Qe, diagram: e };
}, fr = {
  id: Qe,
  detector: ur,
  loader: mr
}, pr = fr, Ze = "er", hr = (e) => e.match(/^\s*erDiagram/) !== null, gr = async () => {
  const { diagram: e } = await import("./erDiagram-7d443202.js");
  return { id: Ze, diagram: e };
}, yr = {
  id: Ze,
  detector: hr,
  loader: gr
}, br = yr, et = "gitGraph", wr = (e) => e.match(/^\s*gitGraph/) !== null, $r = async () => {
  const { diagram: e } = await import("./gitGraphDiagram-6cf8e83c.js");
  return { id: et, diagram: e };
}, vr = {
  id: et,
  detector: wr,
  loader: $r
}, Tr = vr, tt = "gantt", Sr = (e) => e.match(/^\s*gantt/) !== null, Dr = async () => {
  const { diagram: e } = await import("./ganttDiagram-b91af0b8.js");
  return { id: tt, diagram: e };
}, Ar = {
  id: tt,
  detector: Sr,
  loader: Dr
}, Er = Ar, rt = "info", jr = (e) => e.match(/^\s*info/) !== null, Ir = async () => {
  const { diagram: e } = await import("./infoDiagram-d0bc493a.js");
  return { id: rt, diagram: e };
}, Cr = {
  id: rt,
  detector: jr,
  loader: Ir
}, Mr = Cr, at = "pie", kr = (e) => e.match(/^\s*pie/) !== null, Lr = async () => {
  const { diagram: e } = await import("./pieDiagram-a8c1e70d.js");
  return { id: at, diagram: e };
}, Fr = {
  id: at,
  detector: kr,
  loader: Lr
}, xr = Fr, nt = "requirement", _r = (e) => e.match(/^\s*requirement(Diagram)?/) !== null, Rr = async () => {
  const { diagram: e } = await import("./requirementDiagram-87ec2ed1.js");
  return { id: nt, diagram: e };
}, Or = {
  id: nt,
  detector: _r,
  loader: Rr
}, Vr = Or, st = "sequence", Pr = (e) => e.match(/^\s*sequenceDiagram/) !== null, Br = async () => {
  const { diagram: e } = await import("./sequenceDiagram-386aa653.js");
  return { id: st, diagram: e };
}, Ur = {
  id: st,
  detector: Pr,
  loader: Br
}, Gr = Ur, ot = "class", Nr = (e, t) => {
  var r;
  return ((r = t == null ? void 0 : t.class) == null ? void 0 : r.defaultRenderer) === "dagre-wrapper" ? !1 : e.match(/^\s*classDiagram/) !== null;
}, zr = async () => {
  const { diagram: e } = await import("./classDiagram-36441b44.js");
  return { id: ot, diagram: e };
}, Xr = {
  id: ot,
  detector: Nr,
  loader: zr
}, Hr = Xr, ct = "classDiagram", Yr = (e, t) => {
  var r;
  return e.match(/^\s*classDiagram/) !== null && ((r = t == null ? void 0 : t.class) == null ? void 0 : r.defaultRenderer) === "dagre-wrapper" ? !0 : e.match(/^\s*classDiagram-v2/) !== null;
}, qr = async () => {
  const { diagram: e } = await import("./classDiagram-v2-5cd68d6b.js");
  return { id: ct, diagram: e };
}, Wr = {
  id: ct,
  detector: Yr,
  loader: qr
}, Kr = Wr, it = "state", Jr = (e, t) => {
  var r;
  return ((r = t == null ? void 0 : t.state) == null ? void 0 : r.defaultRenderer) === "dagre-wrapper" ? !1 : e.match(/^\s*stateDiagram/) !== null;
}, Qr = async () => {
  const { diagram: e } = await import("./stateDiagram-28d06901.js");
  return { id: it, diagram: e };
}, Zr = {
  id: it,
  detector: Jr,
  loader: Qr
}, ea = Zr, dt = "stateDiagram", ta = (e, t) => {
  var r, a;
  return !!(e.match(/^\s*stateDiagram-v2/) !== null || e.match(/^\s*stateDiagram/) && ((r = t == null ? void 0 : t.state) == null ? void 0 : r.defaultRenderer) === "dagre-wrapper" || e.match(/^\s*stateDiagram/) && ((a = t == null ? void 0 : t.state) == null ? void 0 : a.defaultRenderer) === "dagre-wrapper");
}, ra = async () => {
  const { diagram: e } = await import("./stateDiagram-v2-441d1b2c.js");
  return { id: dt, diagram: e };
}, aa = {
  id: dt,
  detector: ta,
  loader: ra
}, na = aa, lt = "journey", sa = (e) => e.match(/^\s*journey/) !== null, oa = async () => {
  const { diagram: e } = await import("./journeyDiagram-65442621.js");
  return { id: lt, diagram: e };
}, ca = {
  id: lt,
  detector: sa,
  loader: oa
}, ia = ca, ut = "error", da = (e) => e.toLowerCase().trim() === "error", la = async () => {
  const { diagram: e } = await import("./errorDiagram-90ec9454.js");
  return { id: ut, diagram: e };
}, ua = {
  id: ut,
  detector: da,
  loader: la
}, ma = ua, mt = "flowchart-elk", fa = (e, t) => {
  var r;
  return (
    // If diagram explicitly states flowchart-elk
    !!(e.match(/^\s*flowchart-elk/) || // If a flowchart/graph diagram has their default renderer set to elk
    e.match(/^\s*flowchart|graph/) && ((r = t == null ? void 0 : t.flowchart) == null ? void 0 : r.defaultRenderer) === "elk")
  );
}, pa = async () => {
  const { diagram: e } = await import("./flowchart-elk-definition-3f74d138.js");
  return { id: mt, diagram: e };
}, ha = {
  id: mt,
  detector: fa,
  loader: pa
}, ga = ha, ft = "timeline", ya = (e) => e.match(/^\s*timeline/) !== null, ba = async () => {
  const { diagram: e } = await import("./timeline-definition-ebcb1045.js");
  return { id: ft, diagram: e };
}, wa = {
  id: ft,
  detector: ya,
  loader: ba
}, $a = wa, pt = "mindmap", va = (e) => e.match(/^\s*mindmap/) !== null, Ta = async () => {
  const { diagram: e } = await import("./mindmap-definition-b7ec00d6.js");
  return { id: pt, diagram: e };
}, Sa = {
  id: pt,
  detector: va,
  loader: Ta
}, Da = Sa;
let Ae = !1;
const pe = () => {
  Ae || (Ae = !0, Ue(
    "---",
    // --- diagram type may appear if YAML front-matter is not parsed correctly
    {
      db: {
        clear: () => {
        }
      },
      styles: {},
      // should never be used
      renderer: {},
      // should never be used
      parser: {
        parser: { yy: {} },
        parse: () => {
          throw new Error(
            "Diagrams beginning with --- are not valid. If you were trying to use a YAML front-matter, please ensure that you've correctly opened and closed the YAML front-matter with un-indented `---` blocks"
          );
        }
      },
      init: () => null
      // no op
    },
    (e) => e.toLowerCase().trimStart().startsWith("---")
  ), kt(
    ma,
    or,
    Kr,
    Hr,
    br,
    Er,
    Mr,
    xr,
    Vr,
    Gr,
    ga,
    pr,
    lr,
    Da,
    $a,
    Tr,
    na,
    ea,
    ia
  ));
};
class ht {
  constructor(t) {
    var o, l;
    this.text = t, this.type = "graph", this.text += `
`;
    const r = _();
    try {
      this.type = Ge(t, r);
    } catch (p) {
      this.type = "error", this.detectError = p;
    }
    const a = Ne(this.type);
    X.debug("Type " + this.type), this.db = a.db, (l = (o = this.db).clear) == null || l.call(o), this.renderer = a.renderer, this.parser = a.parser;
    const n = this.parser.parse.bind(this.parser);
    this.parser.parse = (p) => n(xt(p, this.db)), this.parser.parser.yy = this.db, a.init && (a.init(r), X.info("Initialized diagram " + this.type, r)), this.parse();
  }
  parse() {
    var t, r;
    if (this.detectError)
      throw this.detectError;
    (r = (t = this.db).clear) == null || r.call(t), this.parser.parse(this.text);
  }
  async render(t, r) {
    await this.renderer.draw(this.text, t, r, this);
  }
  getParser() {
    return this.parser;
  }
  getType() {
    return this.type;
  }
}
const he = async (e) => {
  const t = Ge(e, _());
  try {
    Ne(t);
  } catch {
    const a = Lt(t);
    if (!a)
      throw new Ft(`Diagram ${t} not found.`);
    const { id: n, diagram: o } = await a();
    Ue(n, o);
  }
  return new ht(e);
};
let ce = [];
const bs = (e) => {
  ce.push(e);
}, Aa = () => {
  ce.forEach((e) => {
    e();
  }), ce = [];
};
var Ea = Object.prototype;
function gt(e) {
  var t = e && e.constructor, r = typeof t == "function" && t.prototype || Ea;
  return e === r;
}
function ja(e, t) {
  return function(r) {
    return e(t(r));
  };
}
var Ia = ja(Object.keys, Object);
const Ca = Ia;
var Ma = Object.prototype, ka = Ma.hasOwnProperty;
function La(e) {
  if (!gt(e))
    return Ca(e);
  var t = [];
  for (var r in Object(e))
    ka.call(e, r) && r != "constructor" && t.push(r);
  return t;
}
var Fa = Y(B, "DataView");
const ie = Fa;
var xa = Y(B, "Promise");
const de = xa;
var _a = Y(B, "Set");
const le = _a;
var Ra = Y(B, "WeakMap");
const ue = Ra;
var Ee = "[object Map]", Oa = "[object Object]", je = "[object Promise]", Ie = "[object Set]", Ce = "[object WeakMap]", Me = "[object DataView]", Va = R(ie), Pa = R(re), Ba = R(de), Ua = R(le), Ga = R(ue), M = q;
(ie && M(new ie(new ArrayBuffer(1))) != Me || re && M(new re()) != Ee || de && M(de.resolve()) != je || le && M(new le()) != Ie || ue && M(new ue()) != Ce) && (M = function(e) {
  var t = q(e), r = t == Oa ? e.constructor : void 0, a = r ? R(r) : "";
  if (a)
    switch (a) {
      case Va:
        return Me;
      case Pa:
        return Ee;
      case Ba:
        return je;
      case Ua:
        return Ie;
      case Ga:
        return Ce;
    }
  return t;
});
const Na = M;
function ge(e) {
  return e != null && typeof e == "object";
}
var za = "[object Arguments]";
function ke(e) {
  return ge(e) && q(e) == za;
}
var yt = Object.prototype, Xa = yt.hasOwnProperty, Ha = yt.propertyIsEnumerable, Ya = ke(function() {
  return arguments;
}()) ? ke : function(e) {
  return ge(e) && Xa.call(e, "callee") && !Ha.call(e, "callee");
};
const qa = Ya;
var Wa = Array.isArray;
const Ka = Wa;
var Ja = 9007199254740991;
function bt(e) {
  return typeof e == "number" && e > -1 && e % 1 == 0 && e <= Ja;
}
function Qa(e) {
  return e != null && bt(e.length) && !_t(e);
}
function Za() {
  return !1;
}
var wt = typeof exports == "object" && exports && !exports.nodeType && exports, Le = wt && typeof module == "object" && module && !module.nodeType && module, en = Le && Le.exports === wt, Fe = en ? B.Buffer : void 0, tn = Fe ? Fe.isBuffer : void 0, rn = tn || Za;
const an = rn;
var nn = "[object Arguments]", sn = "[object Array]", on = "[object Boolean]", cn = "[object Date]", dn = "[object Error]", ln = "[object Function]", un = "[object Map]", mn = "[object Number]", fn = "[object Object]", pn = "[object RegExp]", hn = "[object Set]", gn = "[object String]", yn = "[object WeakMap]", bn = "[object ArrayBuffer]", wn = "[object DataView]", $n = "[object Float32Array]", vn = "[object Float64Array]", Tn = "[object Int8Array]", Sn = "[object Int16Array]", Dn = "[object Int32Array]", An = "[object Uint8Array]", En = "[object Uint8ClampedArray]", jn = "[object Uint16Array]", In = "[object Uint32Array]", c = {};
c[$n] = c[vn] = c[Tn] = c[Sn] = c[Dn] = c[An] = c[En] = c[jn] = c[In] = !0;
c[nn] = c[sn] = c[bn] = c[on] = c[wn] = c[cn] = c[dn] = c[ln] = c[un] = c[mn] = c[fn] = c[pn] = c[hn] = c[gn] = c[yn] = !1;
function Cn(e) {
  return ge(e) && bt(e.length) && !!c[q(e)];
}
function Mn(e) {
  return function(t) {
    return e(t);
  };
}
var $t = typeof exports == "object" && exports && !exports.nodeType && exports, V = $t && typeof module == "object" && module && !module.nodeType && module, kn = V && V.exports === $t, te = kn && Rt.process, Ln = function() {
  try {
    var e = V && V.require && V.require("util").types;
    return e || te && te.binding && te.binding("util");
  } catch {
  }
}();
const xe = Ln;
var _e = xe && xe.isTypedArray, Fn = _e ? Mn(_e) : Cn;
const xn = Fn;
var _n = "[object Map]", Rn = "[object Set]", On = Object.prototype, Vn = On.hasOwnProperty;
function z(e) {
  if (e == null)
    return !0;
  if (Qa(e) && (Ka(e) || typeof e == "string" || typeof e.splice == "function" || an(e) || xn(e) || qa(e)))
    return !e.length;
  var t = Na(e);
  if (t == _n || t == Rn)
    return !e.size;
  if (gt(e))
    return !La(e).length;
  for (var r in e)
    if (Vn.call(e, r))
      return !1;
  return !0;
}
const Pn = "graphics-document document";
function Bn(e, t) {
  e.attr("role", Pn), z(t) || e.attr("aria-roledescription", t);
}
function Un(e, t, r, a) {
  if (e.insert !== void 0)
    if (t || r) {
      if (r) {
        const n = "chart-desc-" + a;
        e.attr("aria-describedby", n), e.insert("desc", ":first-child").attr("id", n).text(r);
      }
      if (t) {
        const n = "chart-title-" + a;
        e.attr("aria-labelledby", n), e.insert("title", ":first-child").attr("id", n).text(t);
      }
    } else
      return;
}
const vt = ["graph", "flowchart", "flowchart-v2", "stateDiagram", "stateDiagram-v2"], Gn = 5e4, Nn = "graph TB;a[Maximum text size in diagram exceeded];style a fill:#faa", zn = "sandbox", Xn = "loose", Hn = "http://www.w3.org/2000/svg", Yn = "http://www.w3.org/1999/xlink", qn = "http://www.w3.org/1999/xhtml", Wn = "100%", Kn = "100%", Jn = "border:0;margin:0;", Qn = "margin:0", Zn = "allow-top-navigation-by-user-activation allow-popups", es = 'The "iframe" tag is not supported by your browser.', ts = ["foreignobject"], rs = ["dominant-baseline"];
async function as(e, t) {
  pe();
  let r;
  try {
    (await he(e)).parse();
  } catch (a) {
    r = a;
  }
  if (t != null && t.suppressErrors)
    return r === void 0;
  if (r)
    throw r;
}
const ns = function(e) {
  let t = e;
  return t = t.replace(/style.*:\S*#.*;/g, function(r) {
    return r.substring(0, r.length - 1);
  }), t = t.replace(/classDef.*:\S*#.*;/g, function(r) {
    return r.substring(0, r.length - 1);
  }), t = t.replace(/#\w+;/g, function(r) {
    const a = r.substring(1, r.length - 1);
    return /^\+?\d+$/.test(a) ? "ﬂ°°" + a + "¶ß" : "ﬂ°" + a + "¶ß";
  }), t;
}, ss = function(e) {
  let t = e;
  return t = t.replace(/ﬂ°°/g, "&#"), t = t.replace(/ﬂ°/g, "&"), t = t.replace(/¶ß/g, ";"), t;
}, Re = (e, t, r = []) => `
.${e} ${t} { ${r.join(" !important; ")} !important; }`, os = (e, t, r = {}) => {
  var n;
  let a = "";
  if (e.themeCSS !== void 0 && (a += `
${e.themeCSS}`), e.fontFamily !== void 0 && (a += `
:root { --mermaid-font-family: ${e.fontFamily}}`), e.altFontFamily !== void 0 && (a += `
:root { --mermaid-alt-font-family: ${e.altFontFamily}}`), !z(r) && vt.includes(t)) {
    const w = e.htmlLabels || ((n = e.flowchart) == null ? void 0 : n.htmlLabels) ? ["> *", "span"] : ["rect", "polygon", "ellipse", "circle", "path"];
    for (const y in r) {
      const s = r[y];
      z(s.styles) || w.forEach((d) => {
        a += Re(s.id, d, s.styles);
      }), z(s.textStyles) || (a += Re(s.id, "tspan", s.textStyles));
    }
  }
  return a;
}, cs = (e, t, r, a) => {
  const n = os(e, t, r), o = Bt(t, n, e.themeVariables);
  return oe(er(`${a}{${o}}`), rr);
}, is = (e = "", t, r) => {
  let a = e;
  return !r && !t && (a = a.replace(/marker-end="url\(.*?#/g, 'marker-end="url(#')), a = ss(a), a = a.replace(/<br>/g, "<br/>"), a;
}, ds = (e = "", t) => {
  const r = t ? t.viewBox.baseVal.height + "px" : Kn, a = btoa('<body style="' + Qn + '">' + e + "</body>");
  return `<iframe style="width:${Wn};height:${r};${Jn}" src="data:text/html;base64,${a}" sandbox="${Zn}">
  ${es}
</iframe>`;
}, Oe = (e, t, r, a, n) => {
  const o = e.append("div");
  o.attr("id", r), a && o.attr("style", a);
  const l = o.append("svg").attr("id", t).attr("width", "100%").attr("xmlns", Hn);
  return n && l.attr("xmlns:xlink", n), l.append("g"), e;
};
function Ve(e, t) {
  return e.append("iframe").attr("id", t).attr("style", "width: 100%; height: 100%;").attr("sandbox", "");
}
const ls = (e, t, r, a) => {
  var n, o, l;
  (n = e.getElementById(t)) == null || n.remove(), (o = e.getElementById(r)) == null || o.remove(), (l = e.getElementById(a)) == null || l.remove();
}, us = async function(e, t, r) {
  var ye, be, we, $e;
  pe(), H();
  const a = Vt.detectInit(t);
  a && (Pt(a), Et(a));
  const n = _();
  X.debug(n), t.length > ((n == null ? void 0 : n.maxTextSize) ?? Gn) && (t = Nn), t = t.replace(/\r\n?/g, `
`);
  const o = "#" + e, l = "i" + e, p = "#" + l, w = "d" + e, y = "#" + w;
  let s = j("body");
  const d = n.securityLevel === zn, A = n.securityLevel === Xn, E = n.fontFamily;
  if (r !== void 0) {
    if (r && (r.innerHTML = ""), d) {
      const D = Ve(j(r), l);
      s = j(D.nodes()[0].contentDocument.body), s.node().style.margin = 0;
    } else
      s = j(r);
    Oe(s, e, w, `font-family: ${E}`, Yn);
  } else {
    if (ls(document, e, w, l), d) {
      const D = Ve(j("body"), l);
      s = j(D.nodes()[0].contentDocument.body), s.node().style.margin = 0;
    } else
      s = j("body");
    Oe(s, e, w);
  }
  t = ns(t);
  let u, h;
  try {
    u = await he(t);
  } catch (D) {
    u = new ht("error"), h = D;
  }
  const L = s.select(y).node(), g = u.type, f = L.firstChild, T = f.firstChild, F = vt.includes(g) ? u.renderer.getClasses(t, u) : {}, S = cs(
    n,
    g,
    // @ts-ignore convert renderer to TS.
    F,
    o
  ), b = document.createElement("style");
  b.innerHTML = S, f.insertBefore(b, T);
  try {
    await u.renderer.draw(t, e, De, u);
  } catch (D) {
    throw Ut.draw(t, e, De), D;
  }
  const i = s.select(`${y} svg`), Tt = (be = (ye = u.db).getAccTitle) == null ? void 0 : be.call(ye), St = ($e = (we = u.db).getAccDescription) == null ? void 0 : $e.call(we);
  fs(g, i, Tt, St), s.select(`[id="${e}"]`).selectAll("foreignobject > *").attr("xmlns", qn);
  let C = s.select(y).node().innerHTML;
  if (X.debug("config.arrowMarkerAbsolute", n.arrowMarkerAbsolute), C = is(C, d, jt(n.arrowMarkerAbsolute)), d) {
    const D = s.select(y + " svg").node();
    C = ds(C, D);
  } else
    A || (C = It.sanitize(C, {
      ADD_TAGS: ts,
      ADD_ATTR: rs
    }));
  Aa();
  const Q = j(d ? p : y).node();
  if (Q && "remove" in Q && Q.remove(), h)
    throw h;
  return {
    svg: C,
    bindFunctions: u.db.bindFunctions
  };
};
function ms(e = {}) {
  var r;
  e != null && e.fontFamily && !((r = e.themeVariables) != null && r.fontFamily) && (e.themeVariables || (e.themeVariables = {}), e.themeVariables.fontFamily = e.fontFamily), Ct(e), e != null && e.theme && e.theme in Z ? e.themeVariables = Z[e.theme].getThemeVariables(
    e.themeVariables
  ) : e && (e.themeVariables = Z.default.getThemeVariables(e.themeVariables));
  const t = typeof e == "object" ? Mt(e) : Pe();
  Be(t.logLevel), pe();
}
function fs(e, t, r, a) {
  Bn(t, e), Un(t, r, a, t.attr("id"));
}
const ws = Object.freeze({
  render: us,
  parse: as,
  parseDirective: Ot,
  getDiagramFromText: he,
  initialize: ms,
  getConfig: _,
  setConfig: Dt,
  getSiteConfig: Pe,
  updateSiteConfig: At,
  reset: () => {
    H();
  },
  globalReset: () => {
    H(ve);
  },
  defaultConfig: ve
});
Be(_().logLevel);
H(_());
export {
  le as S,
  Ka as a,
  Qa as b,
  qa as c,
  an as d,
  xn as e,
  La as f,
  gt as g,
  Na as h,
  ge as i,
  Mn as j,
  bt as k,
  z as l,
  ws as m,
  xe as n,
  ja as o,
  ss as p,
  bs as q
};
//# sourceMappingURL=mermaidAPI-fece337c.js.map
