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
  const t = t => {
      const e = function () {
        let t = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
        return t.replace(/\/$/u, "");
      }(t);
      return /^(https?:)?\/\//.test(e) ? e : `https://${e}`;
    },
    e = t => {
      "AbortError" !== t.name && console.error(t.message);
    },
    r = _ref => {
      let {
        serverURL: r,
        path: n = window.location.pathname,
        selector: o = ".waline-comment-count",
        lang: a = "zh-CN"
      } = _ref;
      const s = new AbortController(),
        c = document.querySelectorAll(o);
      return c.length && (_ref2 => {
        let {
          serverURL: t,
          lang: e,
          paths: r,
          signal: n
        } = _ref2;
        return fetch(`${t}/comment?type=count&url=${encodeURIComponent(r.join(","))}&lang=${e}`, {
          signal: n
        }).then(t => t.json()).then(t => Array.isArray(t) ? t : [t]);
      })({
        serverURL: t(r),
        paths: Array.from(c).map(t => (t => {
          try {
            t = decodeURI(t);
          } catch (t) {}
          return t;
        })(t.dataset.path || t.getAttribute("id") || n)),
        lang: a,
        signal: s.signal
      }).then(t => {
        c.forEach((e, r) => {
          e.innerText = t[r].toString();
        });
      }).catch(e), s.abort.bind(s);
    },
    n = "2.14.1";
  _exports.version = n;
  _exports.commentCount = r;
});
//# sourceMappingURL=comment.js.map
