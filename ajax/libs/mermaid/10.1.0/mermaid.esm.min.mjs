import { l as o } from "./commonDb-41f8b4c5.js";
import { d as P, i as E, u as y, r as D, l as q } from "./utils-8ea37061.js";
import { m } from "./mermaidAPI-67f627de.js";
function A(e) {
  for (var n = [], a = 1; a < arguments.length; a++)
    n[a - 1] = arguments[a];
  var t = Array.from(typeof e == "string" ? [e] : e);
  t[t.length - 1] = t[t.length - 1].replace(/\r?\n([\t ]*)$/, "");
  var c = t.reduce(function(r, i) {
    var d = i.match(/\n([\t ]+|(?!\s).)/g);
    return d ? r.concat(d.map(function(h) {
      var f, l;
      return (l = (f = h.match(/[\t ]/g)) === null || f === void 0 ? void 0 : f.length) !== null && l !== void 0 ? l : 0;
    })) : r;
  }, []);
  if (c.length) {
    var g = new RegExp(`
[	 ]{` + Math.min.apply(Math, c) + "}", "g");
    t = t.map(function(r) {
      return r.replace(g, `
`);
    });
  }
  t[0] = t[0].replace(/^\r?\n/, "");
  var s = t[0];
  return n.forEach(function(r, i) {
    var d = s.match(/(?:^|\n)( *)$/), h = d ? d[1] : "", f = r;
    typeof r == "string" && r.includes(`
`) && (f = String(r).split(`
`).map(function(l, S) {
      return S === 0 ? l : "" + h + l;
    }).join(`
`)), s += f + t[i + 1];
  }), s;
}
const M = (e, n, a) => {
  o.warn(e), E(e) ? (a && a(e.str, e.hash), n.push({ ...e, message: e.str, error: e })) : (a && a(e), e instanceof Error && n.push({
    str: e.message,
    message: e.message,
    hash: e.name,
    error: e
  }));
}, v = async function(e = {
  querySelector: ".mermaid"
}) {
  try {
    await T(e);
  } catch (n) {
    if (E(n) && o.error(n.str), u.parseError && u.parseError(n), !e.suppressErrors)
      throw o.error("Use the suppressErrors option to suppress these errors"), n;
  }
}, T = async function({ postRenderCallback: e, querySelector: n, nodes: a } = {
  querySelector: ".mermaid"
}) {
  const t = m.getConfig();
  o.debug(`${e ? "" : "No "}Callback function found`);
  let c;
  if (a)
    c = a;
  else if (n)
    c = document.querySelectorAll(n);
  else
    throw new Error("Nodes and querySelector are both undefined");
  o.debug(`Found ${c.length} diagrams`), (t == null ? void 0 : t.startOnLoad) !== void 0 && (o.debug("Start On Load: " + (t == null ? void 0 : t.startOnLoad)), m.updateSiteConfig({ startOnLoad: t == null ? void 0 : t.startOnLoad }));
  const g = new y.initIdGenerator(t.deterministicIds, t.deterministicIDSeed);
  let s;
  const r = [];
  for (const i of Array.from(c)) {
    o.info("Rendering diagram: " + i.id);
    /*! Check if previously processed */
    if (i.getAttribute("data-processed"))
      continue;
    i.setAttribute("data-processed", "true");
    const d = `mermaid-${g.next()}`;
    s = i.innerHTML, s = A(y.entityDecode(s)).trim().replace(/<br\s*\/?>/gi, "<br/>");
    const h = y.detectInit(s);
    h && o.debug("Detected early reinit: ", h);
    try {
      const { svg: f, bindFunctions: l } = await O(d, s, i);
      i.innerHTML = f, e && await e(d), l && l(i);
    } catch (f) {
      M(f, r, u.parseError);
    }
  }
  if (r.length > 0)
    throw r[0];
}, L = function(e) {
  m.initialize(e);
}, C = async function(e, n, a) {
  o.warn("mermaid.init is deprecated. Please use run instead."), e && L(e);
  const t = { postRenderCallback: a, querySelector: ".mermaid" };
  typeof n == "string" ? t.querySelector = n : n && (n instanceof HTMLElement ? t.nodes = [n] : t.nodes = n), await v(t);
}, I = async (e, {
  lazyLoad: n = !0
} = {}) => {
  D(...e), n === !1 && await q();
}, b = function() {
  if (u.startOnLoad) {
    const { startOnLoad: e } = m.getConfig();
    e && u.run().catch((n) => o.error("Mermaid failed to initialize", n));
  }
};
if (typeof document < "u") {
  /*!
   * Wait for document loaded before starting the execution
   */
  window.addEventListener("load", b, !1);
}
const $ = function(e) {
  u.parseError = e;
}, p = [];
let w = !1;
const x = async () => {
  if (!w) {
    for (w = !0; p.length > 0; ) {
      const e = p.shift();
      if (e)
        try {
          await e();
        } catch (n) {
          o.error("Error executing queue", n);
        }
    }
    w = !1;
  }
}, z = async (e, n) => new Promise((a, t) => {
  const c = () => new Promise((g, s) => {
    m.parse(e, n).then(
      (r) => {
        g(r), a(r);
      },
      (r) => {
        var i;
        o.error("Error parsing", r), (i = u.parseError) == null || i.call(u, r), s(r), t(r);
      }
    );
  });
  p.push(c), x().catch(t);
}), O = (e, n, a) => new Promise((t, c) => {
  const g = () => new Promise((s, r) => {
    m.render(e, n, a).then(
      (i) => {
        s(i), t(i);
      },
      (i) => {
        var d;
        o.error("Error parsing", i), (d = u.parseError) == null || d.call(u, i), r(i), c(i);
      }
    );
  });
  p.push(g), x().catch(c);
}), u = {
  startOnLoad: !0,
  mermaidAPI: m,
  parse: z,
  render: O,
  init: C,
  run: v,
  registerExternalDiagrams: I,
  initialize: L,
  parseError: void 0,
  contentLoaded: b,
  setParseErrorHandler: $,
  detectType: P
};
export {
  u as default
};
//# sourceMappingURL=mermaid.esm.min.mjs.map
