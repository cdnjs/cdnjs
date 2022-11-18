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
  const e = "2.14.1",
    t = {
      "Content-Type": "application/json"
    },
    n = _ref => {
      let {
        serverURL: e,
        lang: t,
        paths: n,
        signal: r
      } = _ref;
      return (_ref2 => {
        let {
          serverURL: e,
          lang: t,
          paths: n,
          type: r,
          signal: a
        } = _ref2;
        return fetch(`${e}/article?path=${encodeURIComponent(n.join(","))}&type=${encodeURIComponent(r.join(","))}&lang=${t}`, {
          signal: a
        }).then(e => e.json());
      })({
        serverURL: e,
        lang: t,
        paths: n,
        type: ["time"],
        signal: r
      }).then(e => Array.isArray(e) ? e : [e]);
    },
    r = e => (_ref3 => {
      let {
        serverURL: e,
        lang: n,
        path: r,
        type: a,
        action: o
      } = _ref3;
      return fetch(`${e}/article?lang=${n}`, {
        method: "POST",
        headers: t,
        body: JSON.stringify({
          path: r,
          type: a,
          action: o
        })
      }).then(e => e.json());
    })({
      ...e,
      type: "time",
      action: "inc"
    }),
    a = e => {
      const t = function () {
        let e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
        return e.replace(/\/$/u, "");
      }(e);
      return /^(https?:)?\/\//.test(t) ? t : `https://${t}`;
    },
    o = e => {
      "AbortError" !== e.name && console.error(e.message);
    },
    l = e => e.dataset.path || e.getAttribute("id"),
    s = (e, t) => {
      t.forEach((t, n) => {
        t.innerText = e[n].toString();
      });
    },
    i = _ref4 => {
      let {
        serverURL: e,
        path: t = window.location.pathname,
        selector: i = ".waline-pageview-count",
        update: p = !0,
        lang: h = "zh-CN"
      } = _ref4;
      const c = new AbortController(),
        g = Array.from(document.querySelectorAll(i)),
        y = e => {
          const n = l(e);
          return null !== n && t !== n;
        },
        d = r => n({
          serverURL: a(e),
          paths: r.map(e => l(e) || t),
          lang: h,
          signal: c.signal
        }).then(e => s(e, r)).catch(o);
      if (p) {
        const n = g.filter(e => !y(e)),
          o = g.filter(y);
        r({
          serverURL: a(e),
          path: t,
          lang: h
        }).then(e => s(new Array(n.length).fill(e), n)), o.length && d(o);
      } else d(g);
      return c.abort.bind(c);
    };
  _exports.pageviewCount = i;
  _exports.version = e;
});
//# sourceMappingURL=pageview.js.map
