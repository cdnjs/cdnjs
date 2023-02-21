import { g as _, l as X, h as Dt, i as Ve, u as At, r as H, j as $e, s as Pe, a as Et, f as j, k as jt, p as It, m as Ct, t as Z, n as Mt } from "./config-0b7a4e7d.js";
import { a as Be, r as kt, d as Ue, g as Ge, e as Lt, b as Ft, U as xt, c as Y, f as B, t as R, h as q, M as re, j as _t, k as Rt, p as Ot, u as Vt, m as Pt, n as Bt } from "./utils-c190d844.js";
import { r as Ut } from "./errorRenderer-89ef1884.js";
var Ne = "comm", ze = "rule", Xe = "decl", Gt = "@import", Nt = "@keyframes", zt = Math.abs, fe = String.fromCharCode;
function He(e) {
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
function Ye(e) {
  return e.length;
}
function U(e, t) {
  return t.push(e), e;
}
var K = 1, x = 1, qe = 0, $ = 0, f = 0, O = "";
function me(e, t, r, a, n, o, l) {
  return { value: e, root: t, parent: r, type: a, props: n, children: o, line: K, column: x, length: l, return: "" };
}
function Ht() {
  return f;
}
function Yt() {
  return f = $ > 0 ? W(O, --$) : 0, x--, f === 10 && (x = 1, K--), f;
}
function v() {
  return f = $ < qe ? W(O, $++) : 0, x++, f === 10 && (x = 1, K++), f;
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
  return K = x = 1, qe = I(O = e), $ = 0, [];
}
function Wt(e) {
  return O = "", e;
}
function ee(e) {
  return He(J($ - 1, se(e === 91 ? e + 2 : e === 40 ? e + 1 : e)));
}
function Kt(e) {
  for (; (f = k()) && f < 33; )
    v();
  return ne(e) > 2 || ne(f) > 3 ? "" : " ";
}
function Jt(e, t) {
  for (; --t && v() && !(f < 48 || f > 102 || f > 57 && f < 65 || f > 70 && f < 97); )
    ;
  return J(e, G() + (t < 6 && k() == 32 && v() == 32));
}
function se(e) {
  for (; v(); )
    switch (f) {
      case e:
        return $;
      case 34:
      case 39:
        e !== 34 && e !== 39 && se(f);
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
  for (; v() && e + f !== 47 + 10; )
    if (e + f === 42 + 42 && k() === 47)
      break;
  return "/*" + J(t, $ - 1) + "*" + fe(e === 47 ? e : v());
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
  for (var y = 0, s = 0, d = l, A = 0, E = 0, u = 0, g = 1, L = 1, h = 1, m = 0, T = "", F = n, S = o, b = a, i = T; L; )
    switch (u = m, m = v()) {
      case 40:
        if (u != 108 && W(i, d - 1) == 58) {
          Xt(i += ae(ee(m), "&", "&\f"), "&\f") != -1 && (h = -1);
          break;
        }
      case 34:
      case 39:
      case 91:
        i += ee(m);
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
      case 123 * g:
        p[y++] = I(i) * h;
      case 125 * g:
      case 59:
      case 0:
        switch (m) {
          case 0:
          case 125:
            L = 0;
          case 59 + s:
            E > 0 && I(i) - d && U(E > 32 ? Te(i + ";", a, r, d - 1) : Te(ae(i, " ", "") + ";", a, r, d - 2), w);
            break;
          case 59:
            i += ";";
          default:
            if (U(b = ve(i, t, r, y, s, n, p, T, F = [], S = [], d), o), m === 123)
              if (s === 0)
                N(i, t, b, b, F, o, d, p, S);
              else
                switch (A) {
                  case 100:
                  case 109:
                  case 115:
                    N(e, b, b, a && U(ve(e, b, b, 0, 0, n, p, T, n, F = [], d), S), n, S, d, p, a ? F : S);
                    break;
                  default:
                    N(i, b, b, b, [""], S, 0, p, S);
                }
        }
        y = s = E = 0, g = h = 1, T = i = "", d = l;
        break;
      case 58:
        d = 1 + I(i), E = u;
      default:
        if (g < 1) {
          if (m == 123)
            --g;
          else if (m == 125 && g++ == 0 && Yt() == 125)
            continue;
        }
        switch (i += fe(m), m * g) {
          case 38:
            h = s > 0 ? 1 : (i += "\f", -1);
            break;
          case 44:
            p[y++] = (I(i) - 1) * h, h = 1;
            break;
          case 64:
            k() === 45 && (i += ee(v())), A = k(), s = d = I(T = i += Zt(G())), m++;
            break;
          case 45:
            u === 45 && I(i) == 2 && (g = 0);
        }
    }
  return o;
}
function ve(e, t, r, a, n, o, l, p, w, y, s) {
  for (var d = n - 1, A = n === 0 ? o : [""], E = Ye(A), u = 0, g = 0, L = 0; u < a; ++u)
    for (var h = 0, m = P(e, d + 1, d = zt(g = l[u])), T = e; h < E; ++h)
      (T = He(g > 0 ? A[h] + " " + m : ae(m, /&\f/g, A[h]))) && (w[L++] = T);
  return me(e, t, r, n === 0 ? ze : p, w, y, s);
}
function tr(e, t, r) {
  return me(e, t, r, Ne, fe(Ht()), P(e, 2, -2), 0);
}
function Te(e, t, r, a) {
  return me(e, t, r, Xe, P(e, 0, a), P(e, a + 1, -1), a);
}
function oe(e, t) {
  for (var r = "", a = Ye(e), n = 0; n < a; n++)
    r += t(e[n], n, e, t) || "";
  return r;
}
function rr(e, t, r, a) {
  switch (e.type) {
    case Gt:
    case Xe:
      return e.return = e.return || e.value;
    case Ne:
      return "";
    case Nt:
      return e.return = e.value + "{" + oe(e.children, a) + "}";
    case ze:
      e.value = e.props.join(",");
  }
  return I(r = oe(e.children, a)) ? e.return = e.value + "{" + r + "}" : "";
}
const Se = "10.0.0", We = "c4", ar = (e) => e.match(/^\s*C4Context|C4Container|C4Component|C4Dynamic|C4Deployment/) !== null, nr = async () => {
  const { diagram: e } = await import("./c4Diagram-f07b8ffa.js");
  return { id: We, diagram: e };
}, sr = {
  id: We,
  detector: ar,
  loader: nr
}, or = sr, Ke = "flowchart", cr = (e, t) => {
  var r, a;
  return ((r = t == null ? void 0 : t.flowchart) == null ? void 0 : r.defaultRenderer) === "dagre-wrapper" || ((a = t == null ? void 0 : t.flowchart) == null ? void 0 : a.defaultRenderer) === "elk" ? !1 : e.match(/^\s*graph/) !== null;
}, ir = async () => {
  const { diagram: e } = await import("./flowDiagram-a349a9ce.js");
  return { id: Ke, diagram: e };
}, dr = {
  id: Ke,
  detector: cr,
  loader: ir
}, lr = dr, Je = "flowchart-v2", ur = (e, t) => {
  var r, a;
  return ((r = t == null ? void 0 : t.flowchart) == null ? void 0 : r.defaultRenderer) === "dagre-d3" || ((a = t == null ? void 0 : t.flowchart) == null ? void 0 : a.defaultRenderer) === "elk" ? !1 : e.match(/^\s*graph/) !== null ? !0 : e.match(/^\s*flowchart/) !== null;
}, fr = async () => {
  const { diagram: e } = await import("./flowDiagram-v2-4f8cc090.js");
  return { id: Je, diagram: e };
}, mr = {
  id: Je,
  detector: ur,
  loader: fr
}, pr = mr, Qe = "er", gr = (e) => e.match(/^\s*erDiagram/) !== null, hr = async () => {
  const { diagram: e } = await import("./erDiagram-32e0e33c.js");
  return { id: Qe, diagram: e };
}, yr = {
  id: Qe,
  detector: gr,
  loader: hr
}, br = yr, Ze = "gitGraph", wr = (e) => e.match(/^\s*gitGraph/) !== null, $r = async () => {
  const { diagram: e } = await import("./gitGraphDiagram-497d65a2.js");
  return { id: Ze, diagram: e };
}, vr = {
  id: Ze,
  detector: wr,
  loader: $r
}, Tr = vr, et = "gantt", Sr = (e) => e.match(/^\s*gantt/) !== null, Dr = async () => {
  const { diagram: e } = await import("./ganttDiagram-bd6c6bd4.js");
  return { id: et, diagram: e };
}, Ar = {
  id: et,
  detector: Sr,
  loader: Dr
}, Er = Ar, tt = "info", jr = (e) => e.match(/^\s*info/) !== null, Ir = async () => {
  const { diagram: e } = await import("./infoDiagram-b7ce54b0.js");
  return { id: tt, diagram: e };
}, Cr = {
  id: tt,
  detector: jr,
  loader: Ir
}, Mr = Cr, rt = "pie", kr = (e) => e.match(/^\s*pie/) !== null, Lr = async () => {
  const { diagram: e } = await import("./pieDiagram-f21623fc.js");
  return { id: rt, diagram: e };
}, Fr = {
  id: rt,
  detector: kr,
  loader: Lr
}, xr = Fr, at = "requirement", _r = (e) => e.match(/^\s*requirement(Diagram)?/) !== null, Rr = async () => {
  const { diagram: e } = await import("./requirementDiagram-ea070473.js");
  return { id: at, diagram: e };
}, Or = {
  id: at,
  detector: _r,
  loader: Rr
}, Vr = Or, nt = "sequence", Pr = (e) => e.match(/^\s*sequenceDiagram/) !== null, Br = async () => {
  const { diagram: e } = await import("./sequenceDiagram-a58a5c5d.js");
  return { id: nt, diagram: e };
}, Ur = {
  id: nt,
  detector: Pr,
  loader: Br
}, Gr = Ur, st = "class", Nr = (e, t) => {
  var r;
  return ((r = t == null ? void 0 : t.class) == null ? void 0 : r.defaultRenderer) === "dagre-wrapper" ? !1 : e.match(/^\s*classDiagram/) !== null;
}, zr = async () => {
  const { diagram: e } = await import("./classDiagram-a4697698.js");
  return { id: st, diagram: e };
}, Xr = {
  id: st,
  detector: Nr,
  loader: zr
}, Hr = Xr, ot = "classDiagram", Yr = (e, t) => {
  var r;
  return e.match(/^\s*classDiagram/) !== null && ((r = t == null ? void 0 : t.class) == null ? void 0 : r.defaultRenderer) === "dagre-wrapper" ? !0 : e.match(/^\s*classDiagram-v2/) !== null;
}, qr = async () => {
  const { diagram: e } = await import("./classDiagram-v2-452ecbc6.js");
  return { id: ot, diagram: e };
}, Wr = {
  id: ot,
  detector: Yr,
  loader: qr
}, Kr = Wr, ct = "state", Jr = (e, t) => {
  var r;
  return ((r = t == null ? void 0 : t.state) == null ? void 0 : r.defaultRenderer) === "dagre-wrapper" ? !1 : e.match(/^\s*stateDiagram/) !== null;
}, Qr = async () => {
  const { diagram: e } = await import("./stateDiagram-467d14bf.js");
  return { id: ct, diagram: e };
}, Zr = {
  id: ct,
  detector: Jr,
  loader: Qr
}, ea = Zr, it = "stateDiagram", ta = (e, t) => {
  var r, a;
  return !!(e.match(/^\s*stateDiagram-v2/) !== null || e.match(/^\s*stateDiagram/) && ((r = t == null ? void 0 : t.state) == null ? void 0 : r.defaultRenderer) === "dagre-wrapper" || e.match(/^\s*stateDiagram/) && ((a = t == null ? void 0 : t.state) == null ? void 0 : a.defaultRenderer) === "dagre-wrapper");
}, ra = async () => {
  const { diagram: e } = await import("./stateDiagram-v2-b12f9500.js");
  return { id: it, diagram: e };
}, aa = {
  id: it,
  detector: ta,
  loader: ra
}, na = aa, dt = "journey", sa = (e) => e.match(/^\s*journey/) !== null, oa = async () => {
  const { diagram: e } = await import("./journeyDiagram-006423cd.js");
  return { id: dt, diagram: e };
}, ca = {
  id: dt,
  detector: sa,
  loader: oa
}, ia = ca, lt = "error", da = (e) => e.toLowerCase().trim() === "error", la = async () => {
  const { diagram: e } = await import("./errorDiagram-4418218c.js");
  return { id: lt, diagram: e };
}, ua = {
  id: lt,
  detector: da,
  loader: la
}, fa = ua, ut = "flowchart-elk", ma = (e, t) => {
  var r;
  return (
    // If diagram explicitly states flowchart-elk
    !!(e.match(/^\s*flowchart-elk/) || // If a flowchart/graph diagram has their default renderer set to elk
    e.match(/^\s*flowchart|graph/) && ((r = t == null ? void 0 : t.flowchart) == null ? void 0 : r.defaultRenderer) === "elk")
  );
}, pa = async () => {
  const { diagram: e } = await import("./flowchart-elk-definition-30f8bb2c.js");
  return { id: ut, diagram: e };
}, ga = {
  id: ut,
  detector: ma,
  loader: pa
}, ha = ga, ft = "timeline", ya = (e) => e.match(/^\s*timeline/) !== null, ba = async () => {
  const { diagram: e } = await import("./timeline-definition-b044f8f6.js");
  return { id: ft, diagram: e };
}, wa = {
  id: ft,
  detector: ya,
  loader: ba
}, $a = wa, mt = "mindmap", va = (e) => e.match(/^\s*mindmap/) !== null, Ta = async () => {
  const { diagram: e } = await import("./mindmap-definition-658dedb3.js");
  return { id: mt, diagram: e };
}, Sa = {
  id: mt,
  detector: va,
  loader: Ta
}, Da = Sa;
let De = !1;
const pe = () => {
  De || (De = !0, Be(
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
            "Diagrams beginning with --- are not valid. If you were trying to use a YAML front-matter, please ensure that you've correctly opened and closed the YAML front-matter with unindented `---` blocks"
          );
        }
      },
      init: () => null
      // no op
    },
    (e) => e.toLowerCase().trimStart().startsWith("---")
  ), kt(
    fa,
    or,
    Hr,
    Kr,
    br,
    Er,
    Mr,
    xr,
    Vr,
    Gr,
    lr,
    pr,
    ha,
    Da,
    $a,
    Tr,
    ea,
    na,
    ia
  ));
};
class pt {
  constructor(t) {
    var o, l;
    this.text = t, this.type = "graph", this.text += `
`;
    const r = _();
    try {
      this.type = Ue(t, r);
    } catch (p) {
      this.type = "error", this.detectError = p;
    }
    const a = Ge(this.type);
    X.debug("Type " + this.type), this.db = a.db, (l = (o = this.db).clear) == null || l.call(o), this.renderer = a.renderer, this.parser = a.parser;
    const n = this.parser.parse.bind(this.parser);
    this.parser.parse = (p) => n(Lt(p, this.db)), this.parser.parser.yy = this.db, a.init && (a.init(r), X.info("Initialized diagram " + this.type, r)), this.parse();
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
const gt = async (e) => {
  const t = Ue(e, _());
  try {
    Ge(t);
  } catch {
    const a = Ft(t);
    if (!a)
      throw new xt(`Diagram ${t} not found.`);
    const { id: n, diagram: o } = await a();
    Be(n, o);
  }
  return new pt(e);
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
function ht(e) {
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
  if (!ht(e))
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
var Ae = "[object Map]", Oa = "[object Object]", Ee = "[object Promise]", je = "[object Set]", Ie = "[object WeakMap]", Ce = "[object DataView]", Va = R(ie), Pa = R(re), Ba = R(de), Ua = R(le), Ga = R(ue), M = q;
(ie && M(new ie(new ArrayBuffer(1))) != Ce || re && M(new re()) != Ae || de && M(de.resolve()) != Ee || le && M(new le()) != je || ue && M(new ue()) != Ie) && (M = function(e) {
  var t = q(e), r = t == Oa ? e.constructor : void 0, a = r ? R(r) : "";
  if (a)
    switch (a) {
      case Va:
        return Ce;
      case Pa:
        return Ae;
      case Ba:
        return Ee;
      case Ua:
        return je;
      case Ga:
        return Ie;
    }
  return t;
});
const Na = M;
function ge(e) {
  return e != null && typeof e == "object";
}
var za = "[object Arguments]";
function Me(e) {
  return ge(e) && q(e) == za;
}
var yt = Object.prototype, Xa = yt.hasOwnProperty, Ha = yt.propertyIsEnumerable, Ya = Me(function() {
  return arguments;
}()) ? Me : function(e) {
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
var wt = typeof exports == "object" && exports && !exports.nodeType && exports, ke = wt && typeof module == "object" && module && !module.nodeType && module, en = ke && ke.exports === wt, Le = en ? B.Buffer : void 0, tn = Le ? Le.isBuffer : void 0, rn = tn || Za;
const an = rn;
var nn = "[object Arguments]", sn = "[object Array]", on = "[object Boolean]", cn = "[object Date]", dn = "[object Error]", ln = "[object Function]", un = "[object Map]", fn = "[object Number]", mn = "[object Object]", pn = "[object RegExp]", gn = "[object Set]", hn = "[object String]", yn = "[object WeakMap]", bn = "[object ArrayBuffer]", wn = "[object DataView]", $n = "[object Float32Array]", vn = "[object Float64Array]", Tn = "[object Int8Array]", Sn = "[object Int16Array]", Dn = "[object Int32Array]", An = "[object Uint8Array]", En = "[object Uint8ClampedArray]", jn = "[object Uint16Array]", In = "[object Uint32Array]", c = {};
c[$n] = c[vn] = c[Tn] = c[Sn] = c[Dn] = c[An] = c[En] = c[jn] = c[In] = !0;
c[nn] = c[sn] = c[bn] = c[on] = c[wn] = c[cn] = c[dn] = c[ln] = c[un] = c[fn] = c[mn] = c[pn] = c[gn] = c[hn] = c[yn] = !1;
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
const Fe = Ln;
var xe = Fe && Fe.isTypedArray, Fn = xe ? Mn(xe) : Cn;
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
  if (ht(e))
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
    (await gt(e)).parse();
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
}, _e = (e, t, r = []) => `
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
        a += _e(s.id, d, s.styles);
      }), z(s.textStyles) || (a += _e(s.id, "tspan", s.textStyles));
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
}, Re = (e, t, r, a, n) => {
  const o = e.append("div");
  o.attr("id", r), a && o.attr("style", a);
  const l = o.append("svg").attr("id", t).attr("width", "100%").attr("xmlns", Hn);
  return n && l.attr("xmlns:xlink", n), l.append("g"), e;
};
function Oe(e, t) {
  return e.append("iframe").attr("id", t).attr("style", "width: 100%; height: 100%;").attr("sandbox", "");
}
const ls = (e, t, r, a) => {
  var n, o, l;
  (n = e.getElementById(t)) == null || n.remove(), (o = e.getElementById(r)) == null || o.remove(), (l = e.getElementById(a)) == null || l.remove();
}, us = async function(e, t, r) {
  var he, ye, be, we;
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
      const D = Oe(j(r), l);
      s = j(D.nodes()[0].contentDocument.body), s.node().style.margin = 0;
    } else
      s = j(r);
    Re(s, e, w, `font-family: ${E}`, Yn);
  } else {
    if (ls(document, e, w, l), d) {
      const D = Oe(j("body"), l);
      s = j(D.nodes()[0].contentDocument.body), s.node().style.margin = 0;
    } else
      s = j("body");
    Re(s, e, w);
  }
  t = ns(t);
  let u, g;
  try {
    u = await gt(t);
  } catch (D) {
    u = new pt("error"), g = D;
  }
  const L = s.select(y).node(), h = u.type, m = L.firstChild, T = m.firstChild, F = vt.includes(h) ? u.renderer.getClasses(t, u) : {}, S = cs(
    n,
    h,
    // @ts-ignore convert renderer to TS.
    F,
    o
  ), b = document.createElement("style");
  b.innerHTML = S, m.insertBefore(b, T);
  try {
    await u.renderer.draw(t, e, Se, u);
  } catch (D) {
    throw Ut.draw(t, e, Se), D;
  }
  const i = s.select(`${y} svg`), Tt = (ye = (he = u.db).getAccTitle) == null ? void 0 : ye.call(he), St = (we = (be = u.db).getAccDescription) == null ? void 0 : we.call(be);
  ms(h, i, Tt, St), s.select(`[id="${e}"]`).selectAll("foreignobject > *").attr("xmlns", qn);
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
  if (Q && "remove" in Q && Q.remove(), g)
    throw g;
  return {
    svg: C,
    bindFunctions: u.db.bindFunctions
  };
};
function fs(e = {}) {
  var r;
  e != null && e.fontFamily && !((r = e.themeVariables) != null && r.fontFamily) && (e.themeVariables = { fontFamily: e.fontFamily }), Ct(e), e != null && e.theme && e.theme in Z ? e.themeVariables = Z[e.theme].getThemeVariables(
    e.themeVariables
  ) : e && (e.themeVariables = Z.default.getThemeVariables(e.themeVariables));
  const t = typeof e == "object" ? Mt(e) : Ve();
  Pe(t.logLevel), pe();
}
function ms(e, t, r, a) {
  Bn(t, e), Un(t, r, a, t.attr("id"));
}
const ws = Object.freeze({
  render: us,
  parse: as,
  parseDirective: Ot,
  initialize: fs,
  getConfig: _,
  setConfig: Dt,
  getSiteConfig: Ve,
  updateSiteConfig: At,
  reset: () => {
    H();
  },
  globalReset: () => {
    H($e);
  },
  defaultConfig: $e
});
Pe(_().logLevel);
H(_());
export {
  le as S,
  Ka as a,
  Qa as b,
  qa as c,
  an as d,
  xn as e,
  La as f,
  ht as g,
  Na as h,
  ge as i,
  Mn as j,
  bt as k,
  z as l,
  ws as m,
  Fe as n,
  ja as o,
  ss as p,
  bs as q
};
//# sourceMappingURL=mermaidAPI-f2dd6058.js.map
