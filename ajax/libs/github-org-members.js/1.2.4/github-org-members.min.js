"use strict";

/*!
 *  github-org-members.js
 *  =====================
 *  A JavaScript library for fetching and rendering in HTML the
 *  members of a GitHub organization.
 *
 *  Developed with JavaScript and Love by Ionică Bizău.
 * */(function (e) {
  function t(e, n) {
    return typeof e != "string" ? e : (n = n || document, typeof n == "string" && (n = t(n)), n.querySelector(e));
  }function n(e, t) {
    var n = [],
        r = /{{([^}}]+)}}/g,
        i;while ((i = r.exec(e)) !== null) {
      n.push(i[1]);
    }for (var s = 0; s < n.length; ++s) {
      e = e.replace(new RegExp("{{" + n[s] + "}}"), t[n[s]]);
    }return e;
  }function r(e, n) {
    function s(e) {
      t.getJSON(r + e, function (t, r) {
        if (t) return n(t);i = i.concat(r);if (r.length !== 100) return n(null, i);s(e + 1);
      });
    }var r = "https://api.github.com/orgs/" + e + "/members?per_page=100&page=",
        i = [];s(1);
  }function i(e, i) {
    var s = t(e.container),
        o = e.user ? t(e.user) : { outerHTML: e.userTempl },
        u = o.outerHTML,
        a = "",
        f = 0,
        l = { modifyData: function modifyData(e, t) {
        return { err: e, members: t };
      }, done: i || function (e, t) {} };typeof o.remove == "function" && o.remove();var c = { org: function org(t) {
        r(e.org, t);
      }, source: function source(n) {
        t.getJSON(e.source, n);
      } },
        h = typeof e.org == "string" ? c.org : typeof e.source == "string" ? c.source : new Error("The org or the source fields should be strings.");if (typeof h != "function") throw h;return h(function (e, t) {
      var r = l.modifyData(e, t);e = r.err, t = r.members;if (e) a = "An error ocured.";else for (; f < t.length; ++f) {
        a += n(u, t[f]);
      }s.innerHTML = a, l.done(e, t);
    }), l;
  }t.getJSON = function (e, t) {
    var n = new XMLHttpRequest();t = t || function () {}, n.open("GET", e, !0), n.send(), n.onreadystatechange = function () {
      n.readyState === 4 && (n.status === 200 ? t(null, JSON.parse(n.responseText)) : t(JSON.parse(n.responseText)));
    };
  }, i.version = "1.0.0", e.GhOrgMembers = i;
})(window);