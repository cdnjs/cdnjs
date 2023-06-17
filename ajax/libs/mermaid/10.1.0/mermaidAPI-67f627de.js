import { l as M, h as A, g as R, i as De, j as zt, u as Ae, r as H, k as Tt, s as Bt, a as Ee, m as je, p as xe, n as Ce, t as Z, o as Ie } from "./commonDb-41f8b4c5.js";
import { g as Me, a as rt, r as ke, d as Ut, b as Gt, c as Le, U as Fe, e as _e, f as Y, h as B, t as O, j as q, M as at, k as Re, m as Oe, p as Ve, u as Pe, n as ze, o as Be } from "./utils-8ea37061.js";
var Nt = "comm", Xt = "rule", Ht = "decl", Ue = "@import", Ge = "@keyframes", Ne = Math.abs, ft = String.fromCharCode;
function Yt(t) {
  return t.trim();
}
function nt(t, e, r) {
  return t.replace(e, r);
}
function Xe(t, e) {
  return t.indexOf(e);
}
function W(t, e) {
  return t.charCodeAt(e) | 0;
}
function z(t, e, r) {
  return t.slice(e, r);
}
function x(t) {
  return t.length;
}
function qt(t) {
  return t.length;
}
function U(t, e) {
  return e.push(t), t;
}
var K = 1, _ = 1, Wt = 0, $ = 0, m = 0, V = "";
function pt(t, e, r, a, n, o, d) {
  return { value: t, root: e, parent: r, type: a, props: n, children: o, line: K, column: _, length: d, return: "" };
}
function He() {
  return m;
}
function Ye() {
  return m = $ > 0 ? W(V, --$) : 0, _--, m === 10 && (_ = 1, K--), m;
}
function v() {
  return m = $ < Wt ? W(V, $++) : 0, _++, m === 10 && (_ = 1, K++), m;
}
function k() {
  return W(V, $);
}
function G() {
  return $;
}
function J(t, e) {
  return z(V, t, e);
}
function st(t) {
  switch (t) {
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
function qe(t) {
  return K = _ = 1, Wt = x(V = t), $ = 0, [];
}
function We(t) {
  return V = "", t;
}
function tt(t) {
  return Yt(J($ - 1, ot(t === 91 ? t + 2 : t === 40 ? t + 1 : t)));
}
function Ke(t) {
  for (; (m = k()) && m < 33; )
    v();
  return st(t) > 2 || st(m) > 3 ? "" : " ";
}
function Je(t, e) {
  for (; --e && v() && !(m < 48 || m > 102 || m > 57 && m < 65 || m > 70 && m < 97); )
    ;
  return J(t, G() + (e < 6 && k() == 32 && v() == 32));
}
function ot(t) {
  for (; v(); )
    switch (m) {
      case t:
        return $;
      case 34:
      case 39:
        t !== 34 && t !== 39 && ot(m);
        break;
      case 40:
        t === 41 && ot(t);
        break;
      case 92:
        v();
        break;
    }
  return $;
}
function Qe(t, e) {
  for (; v() && t + m !== 47 + 10; )
    if (t + m === 42 + 42 && k() === 47)
      break;
  return "/*" + J(e, $ - 1) + "*" + ft(t === 47 ? t : v());
}
function Ze(t) {
  for (; !st(k()); )
    v();
  return J(t, $);
}
function tr(t) {
  return We(N("", null, null, null, [""], t = qe(t), 0, [0], t));
}
function N(t, e, r, a, n, o, d, p, w) {
  for (var y = 0, s = 0, l = d, E = 0, j = 0, u = 0, h = 1, L = 1, g = 1, f = 0, T = "", F = n, S = o, b = a, i = T; L; )
    switch (u = f, f = v()) {
      case 40:
        if (u != 108 && W(i, l - 1) == 58) {
          Xe(i += nt(tt(f), "&", "&\f"), "&\f") != -1 && (g = -1);
          break;
        }
      case 34:
      case 39:
      case 91:
        i += tt(f);
        break;
      case 9:
      case 10:
      case 13:
      case 32:
        i += Ke(u);
        break;
      case 92:
        i += Je(G() - 1, 7);
        continue;
      case 47:
        switch (k()) {
          case 42:
          case 47:
            U(er(Qe(v(), G()), e, r), w);
            break;
          default:
            i += "/";
        }
        break;
      case 123 * h:
        p[y++] = x(i) * g;
      case 125 * h:
      case 59:
      case 0:
        switch (f) {
          case 0:
          case 125:
            L = 0;
          case 59 + s:
            j > 0 && x(i) - l && U(j > 32 ? Dt(i + ";", a, r, l - 1) : Dt(nt(i, " ", "") + ";", a, r, l - 2), w);
            break;
          case 59:
            i += ";";
          default:
            if (U(b = St(i, e, r, y, s, n, p, T, F = [], S = [], l), o), f === 123)
              if (s === 0)
                N(i, e, b, b, F, o, l, p, S);
              else
                switch (E) {
                  case 100:
                  case 109:
                  case 115:
                    N(t, b, b, a && U(St(t, b, b, 0, 0, n, p, T, n, F = [], l), S), n, S, l, p, a ? F : S);
                    break;
                  default:
                    N(i, b, b, b, [""], S, 0, p, S);
                }
        }
        y = s = j = 0, h = g = 1, T = i = "", l = d;
        break;
      case 58:
        l = 1 + x(i), j = u;
      default:
        if (h < 1) {
          if (f == 123)
            --h;
          else if (f == 125 && h++ == 0 && Ye() == 125)
            continue;
        }
        switch (i += ft(f), f * h) {
          case 38:
            g = s > 0 ? 1 : (i += "\f", -1);
            break;
          case 44:
            p[y++] = (x(i) - 1) * g, g = 1;
            break;
          case 64:
            k() === 45 && (i += tt(v())), E = k(), s = l = x(T = i += Ze(G())), f++;
            break;
          case 45:
            u === 45 && x(i) == 2 && (h = 0);
        }
    }
  return o;
}
function St(t, e, r, a, n, o, d, p, w, y, s) {
  for (var l = n - 1, E = n === 0 ? o : [""], j = qt(E), u = 0, h = 0, L = 0; u < a; ++u)
    for (var g = 0, f = z(t, l + 1, l = Ne(h = d[u])), T = t; g < j; ++g)
      (T = Yt(h > 0 ? E[g] + " " + f : nt(f, /&\f/g, E[g]))) && (w[L++] = T);
  return pt(t, e, r, n === 0 ? Xt : p, w, y, s);
}
function er(t, e, r) {
  return pt(t, e, r, Nt, ft(He()), z(t, 2, -2), 0);
}
function Dt(t, e, r, a) {
  return pt(t, e, r, Ht, z(t, 0, a), z(t, a + 1, -1), a);
}
function ct(t, e) {
  for (var r = "", a = qt(t), n = 0; n < a; n++)
    r += e(t[n], n, t, e) || "";
  return r;
}
function rr(t, e, r, a) {
  switch (t.type) {
    case Ue:
    case Ht:
      return t.return = t.return || t.value;
    case Nt:
      return "";
    case Ge:
      return t.return = t.value + "{" + ct(t.children, a) + "}";
    case Xt:
      t.value = t.props.join(",");
  }
  return x(r = ct(t.children, a)) ? t.return = t.value + "{" + r + "}" : "";
}
const At = "10.1.0", Kt = "c4", ar = (t) => t.match(/^\s*C4Context|C4Container|C4Component|C4Dynamic|C4Deployment/) !== null, nr = async () => {
  const { diagram: t } = await import("./c4Diagram-d4b415eb.js");
  return { id: Kt, diagram: t };
}, sr = {
  id: Kt,
  detector: ar,
  loader: nr
}, or = sr, Jt = "flowchart", cr = (t, e) => {
  var r, a;
  return ((r = e == null ? void 0 : e.flowchart) == null ? void 0 : r.defaultRenderer) === "dagre-wrapper" || ((a = e == null ? void 0 : e.flowchart) == null ? void 0 : a.defaultRenderer) === "elk" ? !1 : t.match(/^\s*graph/) !== null;
}, ir = async () => {
  const { diagram: t } = await import("./flowDiagram-7d05970f.js");
  return { id: Jt, diagram: t };
}, lr = {
  id: Jt,
  detector: cr,
  loader: ir
}, dr = lr, Qt = "flowchart-v2", ur = (t, e) => {
  var r, a, n;
  return ((r = e == null ? void 0 : e.flowchart) == null ? void 0 : r.defaultRenderer) === "dagre-d3" || ((a = e == null ? void 0 : e.flowchart) == null ? void 0 : a.defaultRenderer) === "elk" ? !1 : t.match(/^\s*graph/) !== null && ((n = e == null ? void 0 : e.flowchart) == null ? void 0 : n.defaultRenderer) === "dagre-wrapper" ? !0 : t.match(/^\s*flowchart/) !== null;
}, mr = async () => {
  const { diagram: t } = await import("./flowDiagram-v2-6bfe9e0e.js");
  return { id: Qt, diagram: t };
}, fr = {
  id: Qt,
  detector: ur,
  loader: mr
}, pr = fr, Zt = "er", hr = (t) => t.match(/^\s*erDiagram/) !== null, gr = async () => {
  const { diagram: t } = await import("./erDiagram-215b0341.js");
  return { id: Zt, diagram: t };
}, yr = {
  id: Zt,
  detector: hr,
  loader: gr
}, br = yr, te = "gitGraph", wr = (t) => t.match(/^\s*gitGraph/) !== null, $r = async () => {
  const { diagram: t } = await import("./gitGraphDiagram-603d2a33.js");
  return { id: te, diagram: t };
}, vr = {
  id: te,
  detector: wr,
  loader: $r
}, Tr = vr, ee = "gantt", Sr = (t) => t.match(/^\s*gantt/) !== null, Dr = async () => {
  const { diagram: t } = await import("./ganttDiagram-6b6599ba.js");
  return { id: ee, diagram: t };
}, Ar = {
  id: ee,
  detector: Sr,
  loader: Dr
}, Er = Ar, re = "info", jr = (t) => t.match(/^\s*info/) !== null, xr = async () => {
  const { diagram: t } = await import("./infoDiagram-388842fb.js");
  return { id: re, diagram: t };
}, Cr = {
  id: re,
  detector: jr,
  loader: xr
}, Ir = Cr, ae = "pie", Mr = (t) => t.match(/^\s*pie/) !== null, kr = async () => {
  const { diagram: t } = await import("./pieDiagram-ffb7c1e5.js");
  return { id: ae, diagram: t };
}, Lr = {
  id: ae,
  detector: Mr,
  loader: kr
}, Fr = Lr, ne = "requirement", _r = (t) => t.match(/^\s*requirement(Diagram)?/) !== null, Rr = async () => {
  const { diagram: t } = await import("./requirementDiagram-51a5ec78.js");
  return { id: ne, diagram: t };
}, Or = {
  id: ne,
  detector: _r,
  loader: Rr
}, Vr = Or, se = "sequence", Pr = (t) => t.match(/^\s*sequenceDiagram/) !== null, zr = async () => {
  const { diagram: t } = await import("./sequenceDiagram-3b765acc.js");
  return { id: se, diagram: t };
}, Br = {
  id: se,
  detector: Pr,
  loader: zr
}, Ur = Br, oe = "class", Gr = (t, e) => {
  var r;
  return ((r = e == null ? void 0 : e.class) == null ? void 0 : r.defaultRenderer) === "dagre-wrapper" ? !1 : t.match(/^\s*classDiagram/) !== null;
}, Nr = async () => {
  const { diagram: t } = await import("./classDiagram-7b4b2ee6.js");
  return { id: oe, diagram: t };
}, Xr = {
  id: oe,
  detector: Gr,
  loader: Nr
}, Hr = Xr, ce = "classDiagram", Yr = (t, e) => {
  var r;
  return t.match(/^\s*classDiagram/) !== null && ((r = e == null ? void 0 : e.class) == null ? void 0 : r.defaultRenderer) === "dagre-wrapper" ? !0 : t.match(/^\s*classDiagram-v2/) !== null;
}, qr = async () => {
  const { diagram: t } = await import("./classDiagram-v2-556a8c31.js");
  return { id: ce, diagram: t };
}, Wr = {
  id: ce,
  detector: Yr,
  loader: qr
}, Kr = Wr, ie = "state", Jr = (t, e) => {
  var r;
  return ((r = e == null ? void 0 : e.state) == null ? void 0 : r.defaultRenderer) === "dagre-wrapper" ? !1 : t.match(/^\s*stateDiagram/) !== null;
}, Qr = async () => {
  const { diagram: t } = await import("./stateDiagram-d14e810e.js");
  return { id: ie, diagram: t };
}, Zr = {
  id: ie,
  detector: Jr,
  loader: Qr
}, ta = Zr, le = "stateDiagram", ea = (t, e) => {
  var r, a;
  return !!(t.match(/^\s*stateDiagram-v2/) !== null || t.match(/^\s*stateDiagram/) && ((r = e == null ? void 0 : e.state) == null ? void 0 : r.defaultRenderer) === "dagre-wrapper" || t.match(/^\s*stateDiagram/) && ((a = e == null ? void 0 : e.state) == null ? void 0 : a.defaultRenderer) === "dagre-wrapper");
}, ra = async () => {
  const { diagram: t } = await import("./stateDiagram-v2-c3d22c51.js");
  return { id: le, diagram: t };
}, aa = {
  id: le,
  detector: ea,
  loader: ra
}, na = aa, de = "journey", sa = (t) => t.match(/^\s*journey/) !== null, oa = async () => {
  const { diagram: t } = await import("./journeyDiagram-420adb66.js");
  return { id: de, diagram: t };
}, ca = {
  id: de,
  detector: sa,
  loader: oa
}, ia = ca, la = () => "", da = la, ua = function() {
}, ma = (t, e, r) => {
  try {
    M.debug(`Renering svg for syntax error
`);
    const a = A("#" + e), n = a.append("g");
    n.append("path").attr("class", "error-icon").attr(
      "d",
      "m411.313,123.313c6.25-6.25 6.25-16.375 0-22.625s-16.375-6.25-22.625,0l-32,32-9.375,9.375-20.688-20.688c-12.484-12.5-32.766-12.5-45.25,0l-16,16c-1.261,1.261-2.304,2.648-3.31,4.051-21.739-8.561-45.324-13.426-70.065-13.426-105.867,0-192,86.133-192,192s86.133,192 192,192 192-86.133 192-192c0-24.741-4.864-48.327-13.426-70.065 1.402-1.007 2.79-2.049 4.051-3.31l16-16c12.5-12.492 12.5-32.758 0-45.25l-20.688-20.688 9.375-9.375 32.001-31.999zm-219.313,100.687c-52.938,0-96,43.063-96,96 0,8.836-7.164,16-16,16s-16-7.164-16-16c0-70.578 57.422-128 128-128 8.836,0 16,7.164 16,16s-7.164,16-16,16z"
    ), n.append("path").attr("class", "error-icon").attr(
      "d",
      "m459.02,148.98c-6.25-6.25-16.375-6.25-22.625,0s-6.25,16.375 0,22.625l16,16c3.125,3.125 7.219,4.688 11.313,4.688 4.094,0 8.188-1.563 11.313-4.688 6.25-6.25 6.25-16.375 0-22.625l-16.001-16z"
    ), n.append("path").attr("class", "error-icon").attr(
      "d",
      "m340.395,75.605c3.125,3.125 7.219,4.688 11.313,4.688 4.094,0 8.188-1.563 11.313-4.688 6.25-6.25 6.25-16.375 0-22.625l-16-16c-6.25-6.25-16.375-6.25-22.625,0s-6.25,16.375 0,22.625l15.999,16z"
    ), n.append("path").attr("class", "error-icon").attr(
      "d",
      "m400,64c8.844,0 16-7.164 16-16v-32c0-8.836-7.156-16-16-16-8.844,0-16,7.164-16,16v32c0,8.836 7.156,16 16,16z"
    ), n.append("path").attr("class", "error-icon").attr(
      "d",
      "m496,96.586h-32c-8.844,0-16,7.164-16,16 0,8.836 7.156,16 16,16h32c8.844,0 16-7.164 16-16 0-8.836-7.156-16-16-16z"
    ), n.append("path").attr("class", "error-icon").attr(
      "d",
      "m436.98,75.605c3.125,3.125 7.219,4.688 11.313,4.688 4.094,0 8.188-1.563 11.313-4.688l32-32c6.25-6.25 6.25-16.375 0-22.625s-16.375-6.25-22.625,0l-32,32c-6.251,6.25-6.251,16.375-0.001,22.625z"
    ), n.append("text").attr("class", "error-text").attr("x", 1440).attr("y", 250).attr("font-size", "150px").style("text-anchor", "middle").text("Syntax error in text"), n.append("text").attr("class", "error-text").attr("x", 1250).attr("y", 400).attr("font-size", "100px").style("text-anchor", "middle").text("mermaid version " + r), a.attr("height", 100), a.attr("width", 500), a.attr("viewBox", "768 0 912 512");
  } catch (a) {
    M.error("Error while rendering info diagram"), M.error(Me(a));
  }
}, ue = {
  setConf: ua,
  draw: ma
}, fa = {
  db: {
    clear: () => {
    }
  },
  styles: da,
  renderer: ue,
  parser: {
    parser: { yy: {} },
    parse: () => {
    }
  },
  init: () => {
  }
}, pa = fa, me = "flowchart-elk", ha = (t, e) => {
  var r;
  return (
    // If diagram explicitly states flowchart-elk
    !!(t.match(/^\s*flowchart-elk/) || // If a flowchart/graph diagram has their default renderer set to elk
    t.match(/^\s*flowchart|graph/) && ((r = e == null ? void 0 : e.flowchart) == null ? void 0 : r.defaultRenderer) === "elk")
  );
}, ga = async () => {
  const { diagram: t } = await import("./flowchart-elk-definition-55d9b0bb.js");
  return { id: me, diagram: t };
}, ya = {
  id: me,
  detector: ha,
  loader: ga
}, ba = ya, fe = "timeline", wa = (t) => t.match(/^\s*timeline/) !== null, $a = async () => {
  const { diagram: t } = await import("./timeline-definition-f3a4334c.js");
  return { id: fe, diagram: t };
}, va = {
  id: fe,
  detector: wa,
  loader: $a
}, Ta = va, pe = "mindmap", Sa = (t) => t.match(/^\s*mindmap/) !== null, Da = async () => {
  const { diagram: t } = await import("./mindmap-definition-b90592f0.js");
  return { id: pe, diagram: t };
}, Aa = {
  id: pe,
  detector: Sa,
  loader: Da
}, Ea = Aa;
let Et = !1;
const ht = () => {
  Et || (Et = !0, rt("error", pa, (t) => t.toLowerCase().trim() === "error"), rt(
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
    (t) => t.toLowerCase().trimStart().startsWith("---")
  ), ke(
    or,
    Kr,
    Hr,
    br,
    Er,
    Ir,
    Fr,
    Vr,
    Ur,
    ba,
    pr,
    dr,
    Ea,
    Ta,
    Tr,
    na,
    ta,
    ia
  ));
}, ja = (t) => t.trimStart().replace(/^\s*%%(?!{)[^\n]+\n?/gm, "");
class he {
  constructor(e) {
    var o, d;
    this.text = e, this.type = "graph", this.text += `
`;
    const r = R();
    try {
      this.type = Ut(e, r);
    } catch (p) {
      this.type = "error", this.detectError = p;
    }
    const a = Gt(this.type);
    M.debug("Type " + this.type), this.db = a.db, (d = (o = this.db).clear) == null || d.call(o), this.renderer = a.renderer, this.parser = a.parser;
    const n = this.parser.parse.bind(this.parser);
    this.parser.parse = (p) => n(ja(_e(p, this.db))), this.parser.parser.yy = this.db, a.init && (a.init(r), M.info("Initialized diagram " + this.type, r)), this.parse();
  }
  parse() {
    var e, r;
    if (this.detectError)
      throw this.detectError;
    (r = (e = this.db).clear) == null || r.call(e), this.parser.parse(this.text);
  }
  async render(e, r) {
    await this.renderer.draw(this.text, e, r, this);
  }
  getParser() {
    return this.parser;
  }
  getType() {
    return this.type;
  }
}
const gt = async (t) => {
  const e = Ut(t, R());
  try {
    Gt(e);
  } catch {
    const a = Le(e);
    if (!a)
      throw new Fe(`Diagram ${e} not found.`);
    const { id: n, diagram: o } = await a();
    rt(n, o);
  }
  return new he(t);
};
let it = [];
const $s = (t) => {
  it.push(t);
}, xa = () => {
  it.forEach((t) => {
    t();
  }), it = [];
};
var Ca = Object.prototype;
function ge(t) {
  var e = t && t.constructor, r = typeof e == "function" && e.prototype || Ca;
  return t === r;
}
function Ia(t, e) {
  return function(r) {
    return t(e(r));
  };
}
var Ma = Ia(Object.keys, Object);
const ka = Ma;
var La = Object.prototype, Fa = La.hasOwnProperty;
function _a(t) {
  if (!ge(t))
    return ka(t);
  var e = [];
  for (var r in Object(t))
    Fa.call(t, r) && r != "constructor" && e.push(r);
  return e;
}
var Ra = Y(B, "DataView");
const lt = Ra;
var Oa = Y(B, "Promise");
const dt = Oa;
var Va = Y(B, "Set");
const ut = Va;
var Pa = Y(B, "WeakMap");
const mt = Pa;
var jt = "[object Map]", za = "[object Object]", xt = "[object Promise]", Ct = "[object Set]", It = "[object WeakMap]", Mt = "[object DataView]", Ba = O(lt), Ua = O(at), Ga = O(dt), Na = O(ut), Xa = O(mt), I = q;
(lt && I(new lt(new ArrayBuffer(1))) != Mt || at && I(new at()) != jt || dt && I(dt.resolve()) != xt || ut && I(new ut()) != Ct || mt && I(new mt()) != It) && (I = function(t) {
  var e = q(t), r = e == za ? t.constructor : void 0, a = r ? O(r) : "";
  if (a)
    switch (a) {
      case Ba:
        return Mt;
      case Ua:
        return jt;
      case Ga:
        return xt;
      case Na:
        return Ct;
      case Xa:
        return It;
    }
  return e;
});
const Ha = I;
function yt(t) {
  return t != null && typeof t == "object";
}
var Ya = "[object Arguments]";
function kt(t) {
  return yt(t) && q(t) == Ya;
}
var ye = Object.prototype, qa = ye.hasOwnProperty, Wa = ye.propertyIsEnumerable, Ka = kt(function() {
  return arguments;
}()) ? kt : function(t) {
  return yt(t) && qa.call(t, "callee") && !Wa.call(t, "callee");
};
const Ja = Ka;
var Qa = Array.isArray;
const Za = Qa;
var tn = 9007199254740991;
function be(t) {
  return typeof t == "number" && t > -1 && t % 1 == 0 && t <= tn;
}
function en(t) {
  return t != null && be(t.length) && !Re(t);
}
function rn() {
  return !1;
}
var we = typeof exports == "object" && exports && !exports.nodeType && exports, Lt = we && typeof module == "object" && module && !module.nodeType && module, an = Lt && Lt.exports === we, Ft = an ? B.Buffer : void 0, nn = Ft ? Ft.isBuffer : void 0, sn = nn || rn;
const on = sn;
var cn = "[object Arguments]", ln = "[object Array]", dn = "[object Boolean]", un = "[object Date]", mn = "[object Error]", fn = "[object Function]", pn = "[object Map]", hn = "[object Number]", gn = "[object Object]", yn = "[object RegExp]", bn = "[object Set]", wn = "[object String]", $n = "[object WeakMap]", vn = "[object ArrayBuffer]", Tn = "[object DataView]", Sn = "[object Float32Array]", Dn = "[object Float64Array]", An = "[object Int8Array]", En = "[object Int16Array]", jn = "[object Int32Array]", xn = "[object Uint8Array]", Cn = "[object Uint8ClampedArray]", In = "[object Uint16Array]", Mn = "[object Uint32Array]", c = {};
c[Sn] = c[Dn] = c[An] = c[En] = c[jn] = c[xn] = c[Cn] = c[In] = c[Mn] = !0;
c[cn] = c[ln] = c[vn] = c[dn] = c[Tn] = c[un] = c[mn] = c[fn] = c[pn] = c[hn] = c[gn] = c[yn] = c[bn] = c[wn] = c[$n] = !1;
function kn(t) {
  return yt(t) && be(t.length) && !!c[q(t)];
}
function Ln(t) {
  return function(e) {
    return t(e);
  };
}
var $e = typeof exports == "object" && exports && !exports.nodeType && exports, P = $e && typeof module == "object" && module && !module.nodeType && module, Fn = P && P.exports === $e, et = Fn && Oe.process, _n = function() {
  try {
    var t = P && P.require && P.require("util").types;
    return t || et && et.binding && et.binding("util");
  } catch {
  }
}();
const _t = _n;
var Rt = _t && _t.isTypedArray, Rn = Rt ? Ln(Rt) : kn;
const On = Rn;
var Vn = "[object Map]", Pn = "[object Set]", zn = Object.prototype, Bn = zn.hasOwnProperty;
function X(t) {
  if (t == null)
    return !0;
  if (en(t) && (Za(t) || typeof t == "string" || typeof t.splice == "function" || on(t) || On(t) || Ja(t)))
    return !t.length;
  var e = Ha(t);
  if (e == Vn || e == Pn)
    return !t.size;
  if (ge(t))
    return !_a(t).length;
  for (var r in t)
    if (Bn.call(t, r))
      return !1;
  return !0;
}
const Un = "graphics-document document";
function Gn(t, e) {
  t.attr("role", Un), X(e) || t.attr("aria-roledescription", e);
}
function Nn(t, e, r, a) {
  if (t.insert !== void 0)
    if (e || r) {
      if (r) {
        const n = "chart-desc-" + a;
        t.attr("aria-describedby", n), t.insert("desc", ":first-child").attr("id", n).text(r);
      }
      if (e) {
        const n = "chart-title-" + a;
        t.attr("aria-labelledby", n), t.insert("title", ":first-child").attr("id", n).text(e);
      }
    } else
      return;
}
const ve = [
  "graph",
  "flowchart",
  "flowchart-v2",
  "flowchart-elk",
  "stateDiagram",
  "stateDiagram-v2"
], Xn = 5e4, Hn = "graph TB;a[Maximum text size in diagram exceeded];style a fill:#faa", Yn = "sandbox", qn = "loose", Wn = "http://www.w3.org/2000/svg", Kn = "http://www.w3.org/1999/xlink", Jn = "http://www.w3.org/1999/xhtml", Qn = "100%", Zn = "100%", ts = "border:0;margin:0;", es = "margin:0", rs = "allow-top-navigation-by-user-activation allow-popups", as = 'The "iframe" tag is not supported by your browser.', ns = ["foreignobject"], ss = ["dominant-baseline"];
async function os(t, e) {
  ht();
  try {
    (await gt(t)).parse();
  } catch (r) {
    if (e != null && e.suppressErrors)
      return !1;
    throw r;
  }
  return !0;
}
const cs = function(t) {
  let e = t;
  return e = e.replace(/style.*:\S*#.*;/g, function(r) {
    return r.substring(0, r.length - 1);
  }), e = e.replace(/classDef.*:\S*#.*;/g, function(r) {
    return r.substring(0, r.length - 1);
  }), e = e.replace(/#\w+;/g, function(r) {
    const a = r.substring(1, r.length - 1);
    return /^\+?\d+$/.test(a) ? "ﬂ°°" + a + "¶ß" : "ﬂ°" + a + "¶ß";
  }), e;
}, is = function(t) {
  let e = t;
  return e = e.replace(/ﬂ°°/g, "&#"), e = e.replace(/ﬂ°/g, "&"), e = e.replace(/¶ß/g, ";"), e;
}, Ot = (t, e, r = []) => `
.${t} ${e} { ${r.join(" !important; ")} !important; }`, ls = (t, e, r = {}) => {
  var n;
  let a = "";
  if (t.themeCSS !== void 0 && (a += `
${t.themeCSS}`), t.fontFamily !== void 0 && (a += `
:root { --mermaid-font-family: ${t.fontFamily}}`), t.altFontFamily !== void 0 && (a += `
:root { --mermaid-alt-font-family: ${t.altFontFamily}}`), !X(r) && ve.includes(e)) {
    const w = t.htmlLabels || ((n = t.flowchart) == null ? void 0 : n.htmlLabels) ? ["> *", "span"] : ["rect", "polygon", "ellipse", "circle", "path"];
    for (const y in r) {
      const s = r[y];
      X(s.styles) || w.forEach((l) => {
        a += Ot(s.id, l, s.styles);
      }), X(s.textStyles) || (a += Ot(s.id, "tspan", s.textStyles));
    }
  }
  return a;
}, ds = (t, e, r, a) => {
  const n = ls(t, e, r), o = Be(e, n, t.themeVariables);
  return ct(tr(`${a}{${o}}`), rr);
}, us = (t = "", e, r) => {
  let a = t;
  return !r && !e && (a = a.replace(/marker-end="url\(.*?#/g, 'marker-end="url(#')), a = is(a), a = a.replace(/<br>/g, "<br/>"), a;
}, ms = (t = "", e) => {
  const r = e ? e.viewBox.baseVal.height + "px" : Zn, a = btoa('<body style="' + es + '">' + t + "</body>");
  return `<iframe style="width:${Qn};height:${r};${ts}" src="data:text/html;base64,${a}" sandbox="${rs}">
  ${as}
</iframe>`;
}, Vt = (t, e, r, a, n) => {
  const o = t.append("div");
  o.attr("id", r), a && o.attr("style", a);
  const d = o.append("svg").attr("id", e).attr("width", "100%").attr("xmlns", Wn);
  return n && d.attr("xmlns:xlink", n), d.append("g"), t;
};
function Pt(t, e) {
  return t.append("iframe").attr("id", e).attr("style", "width: 100%; height: 100%;").attr("sandbox", "");
}
const fs = (t, e, r, a) => {
  var n, o, d;
  (n = t.getElementById(e)) == null || n.remove(), (o = t.getElementById(r)) == null || o.remove(), (d = t.getElementById(a)) == null || d.remove();
}, ps = async function(t, e, r) {
  var bt, wt, $t, vt;
  ht(), H();
  const a = Pe.detectInit(e);
  a && (ze(a), Ee(a));
  const n = R();
  M.debug(n), e.length > ((n == null ? void 0 : n.maxTextSize) ?? Xn) && (e = Hn), e = e.replace(/\r\n?/g, `
`);
  const o = "#" + t, d = "i" + t, p = "#" + d, w = "d" + t, y = "#" + w;
  let s = A("body");
  const l = n.securityLevel === Yn, E = n.securityLevel === qn, j = n.fontFamily;
  if (r !== void 0) {
    if (r && (r.innerHTML = ""), l) {
      const D = Pt(A(r), d);
      s = A(D.nodes()[0].contentDocument.body), s.node().style.margin = 0;
    } else
      s = A(r);
    Vt(s, t, w, `font-family: ${j}`, Kn);
  } else {
    if (fs(document, t, w, d), l) {
      const D = Pt(A("body"), d);
      s = A(D.nodes()[0].contentDocument.body), s.node().style.margin = 0;
    } else
      s = A("body");
    Vt(s, t, w);
  }
  e = cs(e);
  let u, h;
  try {
    u = await gt(e);
  } catch (D) {
    u = new he("error"), h = D;
  }
  const L = s.select(y).node(), g = u.type, f = L.firstChild, T = f.firstChild, F = ve.includes(g) ? u.renderer.getClasses(e, u) : {}, S = ds(
    n,
    g,
    // @ts-ignore convert renderer to TS.
    F,
    o
  ), b = document.createElement("style");
  b.innerHTML = S, f.insertBefore(b, T);
  try {
    await u.renderer.draw(e, t, At, u);
  } catch (D) {
    throw ue.draw(e, t, At), D;
  }
  const i = s.select(`${y} svg`), Te = (wt = (bt = u.db).getAccTitle) == null ? void 0 : wt.call(bt), Se = (vt = ($t = u.db).getAccDescription) == null ? void 0 : vt.call($t);
  gs(g, i, Te, Se), s.select(`[id="${t}"]`).selectAll("foreignobject > *").attr("xmlns", Jn);
  let C = s.select(y).node().innerHTML;
  if (M.debug("config.arrowMarkerAbsolute", n.arrowMarkerAbsolute), C = us(C, l, je(n.arrowMarkerAbsolute)), l) {
    const D = s.select(y + " svg").node();
    C = ms(C, D);
  } else
    E || (C = xe.sanitize(C, {
      ADD_TAGS: ns,
      ADD_ATTR: ss
    }));
  if (xa(), h)
    throw h;
  const Q = A(l ? p : y).node();
  return Q && "remove" in Q && Q.remove(), {
    svg: C,
    bindFunctions: u.db.bindFunctions
  };
};
function hs(t = {}) {
  var r;
  t != null && t.fontFamily && !((r = t.themeVariables) != null && r.fontFamily) && (t.themeVariables || (t.themeVariables = {}), t.themeVariables.fontFamily = t.fontFamily), Ce(t), t != null && t.theme && t.theme in Z ? t.themeVariables = Z[t.theme].getThemeVariables(
    t.themeVariables
  ) : t && (t.themeVariables = Z.default.getThemeVariables(t.themeVariables));
  const e = typeof t == "object" ? Ie(t) : zt();
  Bt(e.logLevel), ht();
}
function gs(t, e, r, a) {
  Gn(e, t), Nn(e, r, a, e.attr("id"));
}
const vs = Object.freeze({
  render: ps,
  parse: os,
  parseDirective: Ve,
  getDiagramFromText: gt,
  initialize: hs,
  getConfig: R,
  setConfig: De,
  getSiteConfig: zt,
  updateSiteConfig: Ae,
  reset: () => {
    H();
  },
  globalReset: () => {
    H(Tt);
  },
  defaultConfig: Tt
});
Bt(R().logLevel);
H(R());
export {
  ut as S,
  Za as a,
  en as b,
  Ja as c,
  on as d,
  On as e,
  _a as f,
  ge as g,
  Ha as h,
  yt as i,
  Ln as j,
  be as k,
  X as l,
  vs as m,
  _t as n,
  Ia as o,
  is as p,
  $s as q
};
//# sourceMappingURL=mermaidAPI-67f627de.js.map
