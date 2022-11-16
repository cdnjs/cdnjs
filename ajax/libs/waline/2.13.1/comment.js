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
  _exports.version = _exports.commentCount = void 0;
  const e = _ref => {
      let {
        serverURL: e,
        lang: t,
        paths: r,
        signal: n
      } = _ref;
      return fetch(`${e}/comment?type=count&url=${encodeURIComponent(r.join(","))}&lang=${t}`, {
        signal: n
      }).then(e => e.json()).then(e => function (e) {
        let t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
        if ("object" == typeof e && e.errno) throw new TypeError(`Fetch ${t} failed with ${e.errno}: ${e.errmsg}`);
        return e;
      }(e, "comment count")).then(e => Array.isArray(e) ? e : [e]);
    },
    t = e => {
      const t = function () {
        let e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
        return e.replace(/\/$/u, "");
      }(e);
      return /^(https?:)?\/\//.test(t) ? t : `https://${t}`;
    },
    r = e => {
      "AbortError" !== e.name && console.error(e.message);
    },
    n = _ref2 => {
      let {
        serverURL: n,
        path: o = window.location.pathname,
        selector: a = ".waline-comment-count",
        lang: c = "zh-CN"
      } = _ref2;
      const s = new AbortController(),
        l = document.querySelectorAll(a);
      return l.length && e({
        serverURL: t(n),
        paths: Array.from(l).map(e => (e => {
          try {
            e = decodeURI(e);
          } catch (e) {}
          return e;
        })(e.dataset.path || e.getAttribute("id") || o)),
        lang: c,
        signal: s.signal
      }).then(e => {
        l.forEach((t, r) => {
          t.innerText = e[r].toString();
        });
      }).catch(r), s.abort.bind(s);
    },
    o = "2.13.1";
  _exports.version = o;
  _exports.commentCount = n;
});
//# sourceMappingURL=comment.js.map
