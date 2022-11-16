(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define("Waline", ["exports"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports);
    global.Waline = mod.exports;
  }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.version = _exports.pageviewCount = void 0;
  const e = "2.13.1",
    t = {
      "Content-Type": "application/json"
    },
    n = function (e) {
      let t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
      if ("object" == typeof e && e.errno) throw new TypeError(`Fetch ${t} failed with ${e.errno}: ${e.errmsg}`);
      return e;
    },
    r = _ref => {
      let {
        serverURL: e,
        lang: t,
        paths: r,
        signal: a
      } = _ref;
      return (_ref2 => {
        let {
          serverURL: e,
          lang: t,
          paths: r,
          type: a,
          signal: o
        } = _ref2;
        return fetch(`${e}/article?path=${encodeURIComponent(r.join(","))}&type=${encodeURIComponent(a.join(","))}&lang=${t}`, {
          signal: o
        }).then(e => e.json()).then(e => n(e, "article count"));
      })({
        serverURL: e,
        lang: t,
        paths: r,
        type: ["time"],
        signal: a
      }).then(e => Array.isArray(e) ? e : [e]);
    },
    a = e => (_ref3 => {
      let {
        serverURL: e,
        lang: r,
        path: a,
        type: o,
        action: l
      } = _ref3;
      return fetch(`${e}/article?lang=${r}`, {
        method: "POST",
        headers: t,
        body: JSON.stringify({
          path: a,
          type: o,
          action: l
        })
      }).then(e => e.json()).then(e => n(e, "article count"));
    })({
      ...e,
      type: "time",
      action: "inc"
    }),
    o = e => {
      const t = function () {
        let e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
        return e.replace(/\/$/u, "");
      }(e);
      return /^(https?:)?\/\//.test(t) ? t : `https://${t}`;
    },
    l = e => {
      "AbortError" !== e.name && console.error(e.message);
    },
    i = e => e.dataset.path || e.getAttribute("id"),
    s = (e, t) => {
      t.forEach((t, n) => {
        t.innerText = e[n].toString();
      });
    },
    c = _ref4 => {
      let {
        serverURL: e,
        path: t = window.location.pathname,
        selector: n = ".waline-pageview-count",
        update: c = !0,
        lang: h = "zh-CN"
      } = _ref4;
      const p = new AbortController(),
        g = Array.from(document.querySelectorAll(n)),
        y = e => {
          const n = i(e);
          return null !== n && t !== n;
        },
        u = n => r({
          serverURL: o(e),
          paths: n.map(e => i(e) || t),
          lang: h,
          signal: p.signal
        }).then(e => s(e, n)).catch(l);
      if (c) {
        const n = g.filter(e => !y(e)),
          r = g.filter(y);
        a({
          serverURL: o(e),
          path: t,
          lang: h
        }).then(e => s(new Array(n.length).fill(e), n)), r.length && u(r);
      } else u(g);
      return p.abort.bind(p);
    };
  _exports.pageviewCount = c;
  _exports.version = e;
});
//# sourceMappingURL=pageview.js.map
