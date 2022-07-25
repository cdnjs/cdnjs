"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _typeof2 = "function" == typeof Symbol && "symbol" == _typeof(Symbol.iterator) ? function (e) {
  return typeof e === "undefined" ? "undefined" : _typeof(e);
} : function (e) {
  return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e === "undefined" ? "undefined" : _typeof(e);
};!function (e) {
  "object" === ("undefined" == typeof exports ? "undefined" : _typeof2(exports)) && "undefined" != typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define([], e) : ("undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this).GitHubCalendar = e();
}(function () {
  return function r(o, a, u) {
    function s(t, e) {
      if (!a[t]) {
        if (!o[t]) {
          var n = "function" == typeof require && require;if (!e && n) return n(t, !0);if (i) return i(t, !0);throw (e = new Error("Cannot find module '" + t + "'")).code = "MODULE_NOT_FOUND", e;
        }n = a[t] = { exports: {} }, o[t][0].call(n.exports, function (e) {
          return s(o[t][1][e] || e);
        }, n, n.exports, r, o, a, u);
      }return a[t].exports;
    }for (var i = "function" == typeof require && require, e = 0; e < u.length; e++) {
      s(u[e]);
    }return s;
  }({ 1: [function (e, t, n) {
      var p = e("github-calendar-parser"),
          g = e("elly"),
          b = e("add-subtract-date"),
          m = e("formatoid"),
          h = "MMM D, YYYY",
          y = "MMMM D",
          v = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];function M(e) {
        return e + " " + (1 === e ? "day" : "days");
      }t.exports = function (d, e, f) {
        d = g(d), (f = f || {}).summary_text = f.summary_text || 'Summary of pull requests, issues opened, and commits made by <a href="https://github.com/' + e + '" target="blank">@' + e + "</a>", f.cache = 1e3 * (f.cache || 86400), !1 === f.global_stats && (d.style.minHeight = "175px");var n = { content: "gh_calendar_content." + e, expire_at: "gh_calendar_expire." + e };return f.proxy = f.proxy || function (e) {
          return fetch("https://api.bloggify.net/gh-calendar/?username=" + e).then(function (e) {
            return e.text();
          });
        }, f.getCalendar = f.getCalendar || function (e) {
          if (f.cache && Date.now() < +localStorage.getItem(n.expire_at)) {
            var t = localStorage.getItem(n.content);if (t) return Promise.resolve(t);
          }return f.proxy(e).then(function (e) {
            return f.cache && (localStorage.setItem(n.content, e), localStorage.setItem(n.expire_at, Date.now() + f.cache)), e;
          });
        }, function l() {
          return f.getCalendar(e).then(function (e) {
            var t,
                r,
                n = document.createElement("div"),
                e = (n.innerHTML = e, n.querySelector(".js-yearly-contributions")),
                o = (g(".position-relative h2", e).remove(), !0),
                a = !1,
                u = void 0;try {
              for (var s, i = n.querySelectorAll("a")[Symbol.iterator](); !(o = (s = i.next()).done); o = !0) {
                var c = s.value;c.textContent.includes("View your contributions in 3D, VR and IRL!") && c.parentElement.remove();
              }
            } catch (e) {
              a = !0, u = e;
            } finally {
              try {
                !o && i.return && i.return();
              } finally {
                if (a) throw u;
              }
            }e.querySelector("include-fragment") ? setTimeout(l, 500) : (!0 === f.responsive && (a = (n = e.querySelector("svg.js-calendar-graph-svg")).getAttribute("width"), u = n.getAttribute("height"), n.removeAttribute("height"), n.setAttribute("width", "100%"), n.setAttribute("viewBox", "0 0 " + a + " " + u)), !1 !== f.global_stats && (a = (n = p(g("svg", e).outerHTML)).current_streak ? m(n.current_streak_range[0], y) + " &ndash; " + m(n.current_streak_range[1], y) : n.last_contributed ? "Last contributed in " + m(n.last_contributed, y) + "." : "Rock - Hard Place", u = n.longest_streak ? m(n.longest_streak_range[0], y) + " &ndash; " + m(n.longest_streak_range[1], y) : n.last_contributed ? "Last contributed in " + m(n.last_contributed, y) + "." : "Rock - Hard Place", t = g("<div>", { class: "contrib-column contrib-column-first table-column", html: '<span class="text-muted">Contributions in the last year</span>\n                               <span class="contrib-number">' + n.last_year + ' total</span>\n                               <span class="text-muted">' + m(b.add(b.subtract(new Date(), 1, "year"), 1, "day"), h) + " &ndash; " + m(new Date(), h) + "</span>" }), u = g("<div>", { class: "contrib-column table-column", html: '<span class="text-muted">Longest streak</span>\n                               <span class="contrib-number">' + M(n.longest_streak) + '</span>\n                               <span class="text-muted">' + u + "</span>" }), n = g("<div>", { class: "contrib-column table-column", html: '<span class="text-muted">Current streak</span>\n                               <span class="contrib-number">' + M(n.current_streak) + '</span>\n                               <span class="text-muted">' + a + "</span>" }), e.appendChild(t), e.appendChild(u), e.appendChild(n)), d.innerHTML = e.innerHTML, !0 === f.tooltips && (a = d, (r = document.createElement("div")).classList.add("day-tooltip"), a.appendChild(r), a.querySelectorAll(".js-calendar-graph-svg rect.ContributionCalendar-day").forEach(function (e) {
              e.addEventListener("mouseenter", function (e) {
                var t = e.target.getAttribute("data-count"),
                    n = ("0" === t ? t = "No contributions" : "1" === t ? t = "1 contribution" : t += " contributions", new Date(e.target.getAttribute("data-date"))),
                    n = v[n.getUTCMonth()] + " " + n.getUTCDate() + ", " + n.getUTCFullYear(),
                    t = (r.innerHTML = "<strong>" + t + "</strong> on " + n, r.classList.add("is-visible"), e.target.getBoundingClientRect()),
                    n = t.left + window.pageXOffset - r.offsetWidth / 2 + t.width / 2,
                    e = t.bottom + window.pageYOffset - r.offsetHeight - 2 * t.height;r.style.top = e + "px", r.style.left = n + "px";
              }), e.addEventListener("mouseleave", function () {
                r.classList.remove("is-visible");
              });
            })));
          }).catch(function (e) {
            return console.error(e);
          });
        }();
      };
    }, { "add-subtract-date": 2, elly: 4, formatoid: 6, "github-calendar-parser": 8 }], 2: [function (e, t, n) {
      function r(o) {
        return function e(t, n, r) {
          switch (n *= o, r) {case "years":case "year":
              t.setFullYear(t.getFullYear() + n);break;case "months":case "month":
              t.setMonth(t.getMonth() + n);break;case "weeks":case "week":
              return e(t, 7 * n, "days");case "days":case "day":
              t.setDate(t.getDate() + n);break;case "hours":case "hour":
              t.setHours(t.getHours() + n);break;case "minutes":case "minute":
              t.setMinutes(t.getMinutes() + n);break;case "seconds":case "second":
              t.setSeconds(t.getSeconds() + n);break;case "milliseconds":case "millisecond":
              t.setMilliseconds(t.getMilliseconds() + n);break;default:
              throw new Error("Invalid range: " + r);}return t;
        };
      }t.exports = { add: r(1), subtract: r(-1) };
    }, {}], 3: [function (e, t, n) {
      t.exports.en = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], t.exports.en.abbr = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], t.exports.en.short = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"], t.exports.fr = ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"], t.exports.fr.abbr = ["dim", "lun", "mar", "mer", "jeu", "ven", "sam"], t.exports.fr.short = ["di", "lu", "ma", "me", "je", "ve", "sa"], t.exports.es = ["domingo", "lunes", "martes", "miercoles", "jueves", "viernes", "sabado"], t.exports.es.abbr = ["dom", "lun", "mar", "mir", "jue", "vie", "sab"], t.exports.es.short = ["do", "lu", "ma", "mi", "ju", "vi", "sa"], t.exports.it = ["Domenica", "Lunedi", "Martedi", "Mercoledi", "Giovedi", "Venerdi", "Sabato"], t.exports.it.abbr = ["Dom", "Lun", "Mar", "Mer", "Gio", "Ven", "Sab"], t.exports.it.short = ["D", "L", "Ma", "Me", "G", "V", "S"], t.exports = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], t.exports.abbr = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], t.exports.short = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
    }, {}], 4: [function (e, t, n) {
      var r = e("iterate-object"),
          o = e("sliced");function a(n, e) {
        return "string" == typeof n ? "<" === n.charAt(0) ? (n = document.createElement(n.slice(1, -1)), r(e || {}, function (e, t) {
          switch (t) {case "text":
              return void (n.textContent = e);case "html":
              return void (n.innerHTML = e);}n.setAttribute(t, e);
        }), n) : (e = e || document).querySelector(n) : n;
      }a.$$ = function (e, t) {
        return "string" == typeof e ? (t = t || document, o(t.querySelectorAll(e))) : [e];
      }, t.exports = a;
    }, { "iterate-object": 9, sliced: 13 }], 5: [function (e, t, n) {
      t.exports = function (e, t, n) {
        n = n || "0";t = (t = t || 2) - (e = e.toString()).length;return (t <= 0 ? "" : n.repeat(t)) + e;
      };
    }, {}], 6: [function (e, t, n) {
      var r = e("months"),
          o = e("days"),
          a = e("fillo"),
          e = e("parse-it").Parser,
          u = { YYYY: function YYYY(e, t) {
          return t ? e.getUTCFullYear() : e.getFullYear();
        }, YY: function YY(e, t) {
          return u.YYYY(e, t) % 100;
        }, MMMM: function MMMM(e, t) {
          return t ? r[e.getUTCMonth()] : r[e.getMonth()];
        }, MMM: function MMM(e, t) {
          return t ? r.abbr[e.getUTCMonth()] : r.abbr[e.getMonth()];
        }, MM: function MM(e, t) {
          return a(t ? e.getUTCMonth() + 1 : e.getMonth() + 1);
        }, M: function M(e, t) {
          return t ? e.getUTCMonth() + 1 : e.getMonth() + 1;
        }, dddd: function dddd(e, t) {
          return o[u.d(e, t)];
        }, ddd: function ddd(e, t) {
          return o.abbr[u.d(e, t)];
        }, dd: function dd(e, t) {
          return o.short[u.d(e, t)];
        }, d: function d(e, t) {
          return t ? e.getUTCDay() : e.getDay();
        }, DD: function DD(e, t) {
          return a(u.D(e, t));
        }, D: function D(e, t) {
          return t ? e.getUTCDate() : e.getDate();
        }, A: function A(e, t) {
          return u.a(e, t).toUpperCase();
        }, a: function a(e, t) {
          return 12 <= u.H(e, t) ? "pm" : "am";
        }, hh: function hh(e, t) {
          return a(u.h(e, t));
        }, h: function h(e, t) {
          return u.H(e, t) % 12 || 12;
        }, HH: function HH(e, t) {
          return a(u.H(e, t));
        }, H: function H(e, t) {
          return t ? e.getUTCHours() : e.getHours();
        }, mm: function mm(e, t) {
          return a(u.m(e, t));
        }, m: function m(e, t) {
          return t ? e.getUTCMinutes() : e.getMinutes();
        }, ss: function ss(e, t) {
          return a(u.s(e, t));
        }, s: function s(e, t) {
          return t ? e.getUTCSeconds() : e.getSeconds();
        }, S: function S(e, t) {
          return Math.round(u.s(e, t) / 60 * 10);
        }, SS: function SS(e, t) {
          return a(u.s(e, t) / 60 * 100);
        }, SSS: function SSS(e, t) {
          return a(u.s(e, t) / 60 * 1e3, 3);
        }, Z: function Z(e) {
          e = -e.getTimezoneOffset();return (0 <= e ? "+" : "-") + a(parseInt(e / 60)) + ":" + a(e % 60);
        }, ZZ: function ZZ(e) {
          e = -e.getTimezoneOffset();return (0 <= e ? "+" : "-") + a(parseInt(e / 60)) + a(e % 60);
        } },
          s = new e(u);t.exports = function (e, t) {
        return s.run(t, [e, e._useUTC]);
      };
    }, { days: 3, fillo: 5, months: 10, "parse-it": 11 }], 7: [function (e, t, n) {
      t.exports = ["#eee", "#d6e685", "#8cc665", "#44a340", "#1e6823"];
    }, {}], 8: [function (e, t, n) {
      var u = e("github-calendar-legend");t.exports = function (e) {
        function r() {
          o.current_streak > o.longest_streak && (o.longest_streak = o.current_streak, o.longest_streak_range[0] = o.current_streak_range[0], o.longest_streak_range[1] = o.current_streak_range[1]);
        }var o = { last_year: 0, longest_streak: -1, longest_streak_range: [], current_streak: 0, current_streak_range: [], weeks: [], days: [], last_contributed: null },
            a = [];return e.split("\n").slice(2).map(function (e) {
          return e.trim();
        }).forEach(function (e) {
          if (e.startsWith("<g transform")) return a.length && o.weeks.push(a) && (a = []);var t = e.match(/data-level="([0-9\-]+)"/i),
              n = e.match(/data-date="([0-9\-]+)"/),
              e = e.match(/data-count="([0-9]+)"/),
              t = t && t[1],
              n = n && n[1],
              e = e && +e[1];t && (n = { fill: u[t], date: new Date(n), count: e, level: t }, 0 === o.current_streak && (o.current_streak_range[0] = n.date), n.count ? (++o.current_streak, o.last_year += n.count, o.last_contributed = n.date, o.current_streak_range[1] = n.date) : (r(), o.current_streak = 0), a.push(n), o.days.push(n));
        }), r(), o;
      };
    }, { "github-calendar-legend": 7 }], 9: [function (e, t, n) {
      var o = "function" == typeof Symbol && "symbol" === _typeof2(Symbol.iterator) ? function (e) {
        return void 0 === e ? "undefined" : _typeof2(e);
      } : function (e) {
        return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : void 0 === e ? "undefined" : _typeof2(e);
      };t.exports = function (e, t) {
        var n,
            r = 0;if (Array.isArray(e)) for (; r < e.length && !1 !== t(e[r], r, e); ++r) {} else if ("object" === (void 0 === e ? "undefined" : o(e)) && null !== e) for (n = Object.keys(e); r < n.length && !1 !== t(e[n[r]], n[r], e); ++r) {}
      };
    }, {}], 10: [function (e, t, n) {
      t.exports = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"], t.exports.abbr = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], t.exports.it = ["Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno", "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"], t.exports.abbr.it = ["Gen", "Feb", "Mar", "Apr", "Mag", "Giu", "Lug", "Ago", "Set", "Ott", "Nov", "Dic"], t.exports.de = ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"], t.exports.abbr.de = ["Jan", "Feb", "Mär", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez"];
    }, {}], 11: [function (e, t, n) {
      var r = function r(e, t, n) {
        return t && o(e.prototype, t), n && o(e, n), e;
      };function o(e, t) {
        for (var n = 0; n < t.length; n++) {
          var r = t[n];r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
        }
      }var a = e("regex-escape"),
          u = (r(s, [{ key: "run", value: function value(e, t) {
          var n = "";t = t || [];do {
            var r = e.match(this.re),
                r = r && r[1],
                o = r || e.charAt(0);
          } while ((n += r ? r = "function" == typeof (r = this.obj[r]) ? r.apply(this, t) : r : o, e = e.substring(o.length)));return n;
        } }]), s);function s(e) {
        if (!(this instanceof s)) throw new TypeError("Cannot call a class as a function");this.obj = e || {}, this.re = new RegExp("^(" + Object.keys(e).map(a).join("|") + ")");
      }function i(e, t, n) {
        return new u(t).run(e, n);
      }i.Parser = u, t.exports = i;
    }, { "regex-escape": 12 }], 12: [function (e, t, n) {
      function r(e) {
        return e.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
      }r.proto = function () {
        return RegExp.escape = r;
      }, t.exports = r;
    }, {}], 13: [function (e, t, n) {
      t.exports = function (e, t, n) {
        var r = [],
            o = e.length;if (0 !== o) {
          var a = t < 0 ? Math.max(0, t + o) : t || 0;for (void 0 !== n && (o = n < 0 ? n + o : n); o-- > a;) {
            r[o - a] = e[o];
          }
        }return r;
      };
    }, {}] }, {}, [1])(1);
});