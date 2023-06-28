import { l as le, as as oe } from "./mermaid-29dd296b.js";
var ue = /\r\n?/g, ie = /\t/g, ce = /\f/g, J = function(n) {
  return n.replace(ue, `
`).replace(ce, "").replace(ie, "    ");
}, Q = function(n, e) {
  var r = n || {};
  if (e != null)
    for (var a in e)
      Object.prototype.hasOwnProperty.call(e, a) && (r[a] = e[a]);
  return r;
}, V = function(n, e) {
  var r = Object.keys(n).filter(function(o) {
    var u = n[o];
    if (u == null || u.match == null)
      return !1;
    var i = u.order;
    return (typeof i != "number" || !isFinite(i)) && typeof console < "u" && console.warn("simple-markdown: Invalid order for rule `" + o + "`: " + String(i)), !0;
  });
  r.sort(function(o, u) {
    var i = n[o], f = n[u], s = i.order, p = f.order;
    if (s !== p)
      return s - p;
    var h = i.quality ? 0 : 1, d = f.quality ? 0 : 1;
    return h !== d ? h - d : o < u ? -1 : o > u ? 1 : 0;
  });
  var a, l = function o(u, i) {
    var f = [];
    for (i = i || a, a = i; u; ) {
      var s = null, p = null, h = null, d = NaN, _ = 0, x = r[0], y = n[x];
      do {
        var b = y.order, w = i.prevCapture == null ? "" : i.prevCapture[0], R = y.match(u, i, w);
        if (R) {
          var A = y.quality ? y.quality(R, i, w) : 0;
          A <= d || (s = x, p = y, h = R, d = A);
        }
        _++, x = r[_], y = n[x];
      } while (
        // keep looping while we're still within the ruleList
        y && // if we don't have a match yet, continue
        (!h || // or if we have a match, but the next rule is
        // at the same order, and has a quality measurement
        // functions, then this rule must have a quality
        // measurement function (since they are sorted before
        // those without), and we need to check if there is
        // a better quality match
        y.order === b && y.quality)
      );
      if (p == null || h == null)
        throw new Error("Could not find a matching rule for the below content. The rule with highest `order` should always match content provided to it. Check the definition of `match` for '" + r[r.length - 1] + `'. It seems to not match the following source:
` + u);
      if (h.index)
        throw new Error("`match` must return a capture starting at index 0 (the current parse index). Did you forget a ^ at the start of the RegExp?");
      var k = p.parse(h, o, i);
      if (Array.isArray(k))
        Array.prototype.push.apply(f, k);
      else {
        if (k == null || typeof k != "object")
          throw new Error(`parse() function returned invalid parse result: '${k}'`);
        k.type == null && (k.type = s), f.push(k);
      }
      i.prevCapture = h, u = u.substring(i.prevCapture[0].length);
    }
    return f;
  }, c = function(u, i) {
    return a = Q(i, e), !a.inline && !a.disableAutoBlockNewlines && (u = u + `

`), a.prevCapture = null, l(J(u), a);
  };
  return c;
}, T = function(n) {
  var e = function(a, l, c) {
    return l.inline ? n.exec(a) : null;
  };
  return e.regex = n, e;
}, E = function(n) {
  var e = function(a, l) {
    return l.inline ? null : n.exec(a);
  };
  return e.regex = n, e;
}, j = function(n) {
  var e = function(a, l) {
    return n.exec(a);
  };
  return e.regex = n, e;
}, se = typeof Symbol == "function" && Symbol.for && Symbol.for("react.element") || 60103, m = function(n, e, r) {
  var a = {
    $$typeof: se,
    type: n,
    key: e ?? void 0,
    ref: null,
    props: r,
    _owner: null
  };
  return a;
}, g = function(n, e, r, a) {
  r = r || {}, a = typeof a < "u" ? a : !0;
  var l = "";
  for (var c in r) {
    var o = r[c];
    Object.prototype.hasOwnProperty.call(r, c) && o && (l += " " + S(c) + '="' + S(o) + '"');
  }
  var u = "<" + n + l + ">";
  return a ? u + e + "</" + n + ">" : u;
}, q = {}, I = function(n) {
  if (n == null)
    return null;
  try {
    var e = new URL(n, "https://localhost").protocol;
    if (e.indexOf("javascript:") === 0 || e.indexOf("vbscript:") === 0 || e.indexOf("data:") === 0)
      return null;
  } catch {
    return null;
  }
  return n;
}, fe = /[<>&"']/g, pe = {
  "<": "&lt;",
  ">": "&gt;",
  "&": "&amp;",
  '"': "&quot;",
  "'": "&#x27;",
  "/": "&#x2F;",
  "`": "&#96;"
}, S = function(n) {
  return String(n).replace(fe, function(e) {
    return pe[e];
  });
}, he = /\\([^0-9A-Za-z\s])/g, M = function(n) {
  return n.replace(he, "$1");
}, B = function(n, e, r) {
  var a = r.inline || !1;
  r.inline = !0;
  var l = n(e, r);
  return r.inline = a, l;
}, ve = function(n, e, r) {
  var a = r.inline || !1;
  r.inline = !1;
  var l = n(e + `

`, r);
  return r.inline = a, l;
}, O = function(n, e, r) {
  return {
    content: B(e, n[1], r)
  };
}, F = function() {
  return {};
}, N = "(?:[*+-]|\\d+\\.)", ee = "( *)(" + N + ") +", K = new RegExp("^" + ee), de = new RegExp(ee + "[^\\n]*(?:\\n(?!\\1" + N + ` )[^\\n]*)*(
|$)`, "gm"), te = /\n{2,}$/, me = /^ (?= *`)|(` *) $/g, ge = te, z = / *\n+$/, ye = new RegExp("^( *)(" + N + `) [\\s\\S]+?(?:
{2,}(?! )(?!\\1` + N + ` )\\n*|\\s*
*$)`), xe = /(?:^|\n)( *)$/, P = function() {
  var t = /^ *\| *| *\| *$/g, n = / *$/, e = /^ *-+: *$/, r = /^ *:-+: *$/, a = /^ *:-+ *$/, l = function(s) {
    return e.test(s) ? "right" : r.test(s) ? "center" : a.test(s) ? "left" : null;
  }, c = function(s, p, h, d) {
    d && (s = s.replace(t, ""));
    var _ = s.trim().split("|");
    return _.map(l);
  }, o = function(s, p, h, d) {
    var _ = h.inTable;
    h.inTable = !0;
    var x = p(s.trim(), h);
    h.inTable = _;
    var y = [[]];
    return x.forEach(function(b, w) {
      b.type === "tableSeparator" ? (!d || w !== 0 && w !== x.length - 1) && y.push([]) : (b.type === "text" && (x[w + 1] == null || x[w + 1].type === "tableSeparator") && (b.content = b.content.replace(n, "")), y[y.length - 1].push(b));
    }), y;
  }, u = function(s, p, h, d) {
    var _ = s.trim().split(`
`);
    return _.map(function(x) {
      return o(x, p, h, d);
    });
  }, i = function(s) {
    return function(p, h, d) {
      d.inline = !0;
      var _ = o(p[1], h, d, s), x = c(p[2], h, d, s), y = u(p[3], h, d, s);
      return d.inline = !1, {
        type: "table",
        header: _,
        align: x,
        cells: y
      };
    };
  };
  return {
    parseTable: i(!0),
    parseNpTable: i(!1),
    TABLE_REGEX: /^ *(\|.+)\n *\|( *[-:]+[-| :]*)\n((?: *\|.*(?:\n|$))*)\n*/,
    NPTABLE_REGEX: /^ *(\S.*\|.*)\n *([-:]+ *\|[-| :]*)\n((?:.*\|.*(?:\n|$))*)\n*/
  };
}(), C = "(?:\\[[^\\]]*\\]|[^\\[\\]]|\\](?=[^\\[]*\\]))*", G = `\\s*<?((?:\\([^)]*\\)|[^\\s\\\\]|\\\\.)*?)>?(?:\\s+['"]([\\s\\S]*?)['"])?\\s*`, Te = /mailto:/i, X = function(n, e, r) {
  var a = (n[2] || n[1]).replace(/\s+/g, " ").toLowerCase();
  if (e._defs && e._defs[a]) {
    var l = e._defs[a];
    r.target = l.target, r.title = l.title;
  }
  return e._refs = e._refs || {}, e._refs[a] = e._refs[a] || [], e._refs[a].push(r), r;
}, v = 0, L = {
  Array: {
    react: function(t, n, e) {
      for (var r = e.key, a = [], l = 0, c = 0; l < t.length; l++, c++) {
        e.key = "" + l;
        var o = t[l];
        if (o.type === "text")
          for (o = {
            type: "text",
            content: o.content
          }; l + 1 < t.length && t[l + 1].type === "text"; l++)
            o.content += t[l + 1].content;
        a.push(n(o, e));
      }
      return e.key = r, a;
    },
    html: function(t, n, e) {
      for (var r = "", a = 0; a < t.length; a++) {
        var l = t[a];
        if (l.type === "text")
          for (l = {
            type: "text",
            content: l.content
          }; a + 1 < t.length && t[a + 1].type === "text"; a++)
            l.content += t[a + 1].content;
        r += n(l, e);
      }
      return r;
    }
  },
  heading: {
    order: v++,
    match: E(/^ *(#{1,6})([^\n]+?)#* *(?:\n *)+\n/),
    parse: function(t, n, e) {
      return {
        level: t[1].length,
        content: B(n, t[2].trim(), e)
      };
    },
    react: function(t, n, e) {
      return m("h" + t.level, e.key, {
        children: n(t.content, e)
      });
    },
    html: function(t, n, e) {
      return g("h" + t.level, n(t.content, e));
    }
  },
  nptable: {
    order: v++,
    match: E(P.NPTABLE_REGEX),
    parse: P.parseNpTable,
    react: null,
    html: null
  },
  lheading: {
    order: v++,
    match: E(/^([^\n]+)\n *(=|-){3,} *(?:\n *)+\n/),
    parse: function(t, n, e) {
      return {
        type: "heading",
        level: t[2] === "=" ? 1 : 2,
        content: B(n, t[1], e)
      };
    },
    react: null,
    html: null
  },
  hr: {
    order: v++,
    match: E(/^( *[-*_]){3,} *(?:\n *)+\n/),
    parse: F,
    react: function(t, n, e) {
      return m("hr", e.key, q);
    },
    html: function(t, n, e) {
      return "<hr>";
    }
  },
  codeBlock: {
    order: v++,
    match: E(/^(?:    [^\n]+\n*)+(?:\n *)+\n/),
    parse: function(t, n, e) {
      var r = t[0].replace(/^    /gm, "").replace(/\n+$/, "");
      return {
        lang: void 0,
        content: r
      };
    },
    react: function(t, n, e) {
      var r = t.lang ? "markdown-code-" + t.lang : void 0;
      return m("pre", e.key, {
        children: m("code", null, {
          className: r,
          children: t.content
        })
      });
    },
    html: function(t, n, e) {
      var r = t.lang ? "markdown-code-" + t.lang : void 0, a = g("code", S(t.content), {
        class: r
      });
      return g("pre", a);
    }
  },
  fence: {
    order: v++,
    match: E(/^ *(`{3,}|~{3,}) *(?:(\S+) *)?\n([\s\S]+?)\n?\1 *(?:\n *)+\n/),
    parse: function(t, n, e) {
      return {
        type: "codeBlock",
        lang: t[2] || void 0,
        content: t[3]
      };
    },
    react: null,
    html: null
  },
  blockQuote: {
    order: v++,
    match: E(/^( *>[^\n]+(\n[^\n]+)*\n*)+\n{2,}/),
    parse: function(t, n, e) {
      var r = t[0].replace(/^ *> ?/gm, "");
      return {
        content: n(r, e)
      };
    },
    react: function(t, n, e) {
      return m("blockquote", e.key, {
        children: n(t.content, e)
      });
    },
    html: function(t, n, e) {
      return g("blockquote", n(t.content, e));
    }
  },
  list: {
    order: v++,
    match: function(t, n) {
      var e = n.prevCapture == null ? "" : n.prevCapture[0], r = xe.exec(e), a = n._list || !n.inline;
      return r && a ? (t = r[1] + t, ye.exec(t)) : null;
    },
    parse: function(t, n, e) {
      var r = t[2], a = r.length > 1, l = a ? +r : void 0, c = t[0].replace(ge, `
`).match(de), o = !1, u = c.map(function(i, f) {
        var s = K.exec(i), p = s ? s[0].length : 0, h = new RegExp("^ {1," + p + "}", "gm"), d = i.replace(h, "").replace(K, ""), _ = f === c.length - 1, x = d.indexOf(`

`) !== -1, y = x || _ && o;
        o = y;
        var b = e.inline, w = e._list;
        e._list = !0;
        var R;
        y ? (e.inline = !1, R = d.replace(z, `

`)) : (e.inline = !0, R = d.replace(z, ""));
        var A = n(R, e);
        return e.inline = b, e._list = w, A;
      });
      return {
        ordered: a,
        start: l,
        items: u
      };
    },
    react: function(t, n, e) {
      var r = t.ordered ? "ol" : "ul";
      return m(r, e.key, {
        start: t.start,
        children: t.items.map(function(a, l) {
          return m("li", "" + l, {
            children: n(a, e)
          });
        })
      });
    },
    html: function(t, n, e) {
      var r = t.items.map(function(c) {
        return g("li", n(c, e));
      }).join(""), a = t.ordered ? "ol" : "ul", l = {
        start: t.start
      };
      return g(a, r, l);
    }
  },
  def: {
    order: v++,
    // TODO(aria): This will match without a blank line before the next
    // block element, which is inconsistent with most of the rest of
    // simple-markdown.
    match: E(/^ *\[([^\]]+)\]: *<?([^\s>]*)>?(?: +["(]([^\n]+)[")])? *\n(?: *\n)*/),
    parse: function(t, n, e) {
      var r = t[1].replace(/\s+/g, " ").toLowerCase(), a = t[2], l = t[3];
      return e._refs && e._refs[r] && e._refs[r].forEach(function(c) {
        c.target = a, c.title = l;
      }), e._defs = e._defs || {}, e._defs[r] = {
        target: a,
        title: l
      }, {
        def: r,
        target: a,
        title: l
      };
    },
    react: function() {
      return null;
    },
    html: function() {
      return "";
    }
  },
  table: {
    order: v++,
    match: E(P.TABLE_REGEX),
    parse: P.parseTable,
    react: function(t, n, e) {
      var r = function(o) {
        return t.align[o] == null ? {} : {
          textAlign: t.align[o]
        };
      }, a = t.header.map(function(c, o) {
        return m("th", "" + o, {
          style: r(o),
          scope: "col",
          children: n(c, e)
        });
      }), l = t.cells.map(function(c, o) {
        return m("tr", "" + o, {
          children: c.map(function(u, i) {
            return m("td", "" + i, {
              style: r(i),
              children: n(u, e)
            });
          })
        });
      });
      return m("table", e.key, {
        children: [m("thead", "thead", {
          children: m("tr", null, {
            children: a
          })
        }), m("tbody", "tbody", {
          children: l
        })]
      });
    },
    html: function(t, n, e) {
      var r = function(i) {
        return t.align[i] == null ? "" : "text-align:" + t.align[i] + ";";
      }, a = t.header.map(function(u, i) {
        return g("th", n(u, e), {
          style: r(i),
          scope: "col"
        });
      }).join(""), l = t.cells.map(function(u) {
        var i = u.map(function(f, s) {
          return g("td", n(f, e), {
            style: r(s)
          });
        }).join("");
        return g("tr", i);
      }).join(""), c = g("thead", g("tr", a)), o = g("tbody", l);
      return g("table", c + o);
    }
  },
  newline: {
    order: v++,
    match: E(/^(?:\n *)*\n/),
    parse: F,
    react: function(t, n, e) {
      return `
`;
    },
    html: function(t, n, e) {
      return `
`;
    }
  },
  paragraph: {
    order: v++,
    match: E(/^((?:[^\n]|\n(?! *\n))+)(?:\n *)+\n/),
    parse: O,
    react: function(t, n, e) {
      return m("div", e.key, {
        className: "paragraph",
        children: n(t.content, e)
      });
    },
    html: function(t, n, e) {
      var r = {
        class: "paragraph"
      };
      return g("div", n(t.content, e), r);
    }
  },
  escape: {
    order: v++,
    // We don't allow escaping numbers, letters, or spaces here so that
    // backslashes used in plain text still get rendered. But allowing
    // escaping anything else provides a very flexible escape mechanism,
    // regardless of how this grammar is extended.
    match: T(/^\\([^0-9A-Za-z\s])/),
    parse: function(t, n, e) {
      return {
        type: "text",
        content: t[1]
      };
    },
    react: null,
    html: null
  },
  tableSeparator: {
    order: v++,
    match: function(t, n) {
      return n.inTable ? /^ *\| */.exec(t) : null;
    },
    parse: function() {
      return {
        type: "tableSeparator"
      };
    },
    // These shouldn't be reached, but in case they are, be reasonable:
    react: function() {
      return " | ";
    },
    html: function() {
      return " &vert; ";
    }
  },
  autolink: {
    order: v++,
    match: T(/^<([^: >]+:\/[^ >]+)>/),
    parse: function(t, n, e) {
      return {
        type: "link",
        content: [{
          type: "text",
          content: t[1]
        }],
        target: t[1]
      };
    },
    react: null,
    html: null
  },
  mailto: {
    order: v++,
    match: T(/^<([^ >]+@[^ >]+)>/),
    parse: function(t, n, e) {
      var r = t[1], a = t[1];
      return Te.test(a) || (a = "mailto:" + a), {
        type: "link",
        content: [{
          type: "text",
          content: r
        }],
        target: a
      };
    },
    react: null,
    html: null
  },
  url: {
    order: v++,
    match: T(/^(https?:\/\/[^\s<]+[^<.,:;"')\]\s])/),
    parse: function(t, n, e) {
      return {
        type: "link",
        content: [{
          type: "text",
          content: t[1]
        }],
        target: t[1],
        title: void 0
      };
    },
    react: null,
    html: null
  },
  link: {
    order: v++,
    match: T(new RegExp("^\\[(" + C + ")\\]\\(" + G + "\\)")),
    parse: function(t, n, e) {
      var r = {
        content: n(t[1], e),
        target: M(t[2]),
        title: t[3]
      };
      return r;
    },
    react: function(t, n, e) {
      return m("a", e.key, {
        href: I(t.target),
        title: t.title,
        children: n(t.content, e)
      });
    },
    html: function(t, n, e) {
      var r = {
        href: I(t.target),
        title: t.title
      };
      return g("a", n(t.content, e), r);
    }
  },
  image: {
    order: v++,
    match: T(new RegExp("^!\\[(" + C + ")\\]\\(" + G + "\\)")),
    parse: function(t, n, e) {
      var r = {
        alt: t[1],
        target: M(t[2]),
        title: t[3]
      };
      return r;
    },
    react: function(t, n, e) {
      return m("img", e.key, {
        src: I(t.target),
        alt: t.alt,
        title: t.title
      });
    },
    html: function(t, n, e) {
      var r = {
        src: I(t.target),
        alt: t.alt,
        title: t.title
      };
      return g("img", "", r, !1);
    }
  },
  reflink: {
    order: v++,
    match: T(new RegExp(
      // The first [part] of the link
      "^\\[(" + C + ")\\]\\s*\\[([^\\]]*)\\]"
    )),
    parse: function(t, n, e) {
      return X(t, e, {
        type: "link",
        content: n(t[1], e)
      });
    },
    react: null,
    html: null
  },
  refimage: {
    order: v++,
    match: T(new RegExp(
      // The first [part] of the link
      "^!\\[(" + C + ")\\]\\s*\\[([^\\]]*)\\]"
    )),
    parse: function(t, n, e) {
      return X(t, e, {
        type: "image",
        alt: t[1]
      });
    },
    react: null,
    html: null
  },
  em: {
    order: v,
    match: T(new RegExp(
      // only match _s surrounding words.
      "^\\b_((?:__|\\\\[\\s\\S]|[^\\\\_])+?)_\\b|^\\*(?=\\S)((?:\\*\\*|\\\\[\\s\\S]|\\s+(?:\\\\[\\s\\S]|[^\\s\\*\\\\]|\\*\\*)|[^\\s\\*\\\\])+?)\\*(?!\\*)"
    )),
    quality: function(t) {
      return t[0].length + 0.2;
    },
    parse: function(t, n, e) {
      return {
        content: n(t[2] || t[1], e)
      };
    },
    react: function(t, n, e) {
      return m("em", e.key, {
        children: n(t.content, e)
      });
    },
    html: function(t, n, e) {
      return g("em", n(t.content, e));
    }
  },
  strong: {
    order: v,
    match: T(/^\*\*((?:\\[\s\S]|[^\\])+?)\*\*(?!\*)/),
    quality: function(t) {
      return t[0].length + 0.1;
    },
    parse: O,
    react: function(t, n, e) {
      return m("strong", e.key, {
        children: n(t.content, e)
      });
    },
    html: function(t, n, e) {
      return g("strong", n(t.content, e));
    }
  },
  u: {
    order: v++,
    match: T(/^__((?:\\[\s\S]|[^\\])+?)__(?!_)/),
    quality: function(t) {
      return t[0].length;
    },
    parse: O,
    react: function(t, n, e) {
      return m("u", e.key, {
        children: n(t.content, e)
      });
    },
    html: function(t, n, e) {
      return g("u", n(t.content, e));
    }
  },
  del: {
    order: v++,
    match: T(/^~~(?=\S)((?:\\[\s\S]|~(?!~)|[^\s~\\]|\s(?!~~))+?)~~/),
    parse: O,
    react: function(t, n, e) {
      return m("del", e.key, {
        children: n(t.content, e)
      });
    },
    html: function(t, n, e) {
      return g("del", n(t.content, e));
    }
  },
  inlineCode: {
    order: v++,
    match: T(/^(`+)([\s\S]*?[^`])\1(?!`)/),
    parse: function(t, n, e) {
      return {
        content: t[2].replace(me, "$1")
      };
    },
    react: function(t, n, e) {
      return m("code", e.key, {
        children: t.content
      });
    },
    html: function(t, n, e) {
      return g("code", S(t.content));
    }
  },
  br: {
    order: v++,
    match: j(/^ {2,}\n/),
    parse: F,
    react: function(t, n, e) {
      return m("br", e.key, q);
    },
    html: function(t, n, e) {
      return "<br>";
    }
  },
  text: {
    order: v++,
    // Here we look for anything followed by non-symbols,
    // double newlines, or double-space-newlines
    // We break on any symbol characters so that this grammar
    // is easy to extend without needing to modify this regex
    match: j(/^[\s\S]+?(?=[^0-9A-Za-z\s\u00c0-\uffff]|\n\n| {2,}\n|\w+:\S|$)/),
    parse: function(t, n, e) {
      return {
        content: t[0]
      };
    },
    react: function(t, n, e) {
      return t.content;
    },
    html: function(t, n, e) {
      return S(t.content);
    }
  }
}, _e = function(n, e) {
  !e && typeof console < "u" && console.warn("simple-markdown ruleOutput should take 'react' or 'html' as the second argument.");
  var r = function(l, c, o) {
    return n[l.type][e](l, c, o);
  };
  return r;
}, Ee = function(n) {
  var e = function r(a, l) {
    if (l = l || {}, Array.isArray(a)) {
      for (var c = l.key, o = [], u = null, i = 0; i < a.length; i++) {
        l.key = "" + i;
        var f = r(a[i], l);
        typeof f == "string" && typeof u == "string" ? (u = u + f, o[o.length - 1] = u) : (o.push(f), u = f);
      }
      return l.key = c, o;
    } else
      return n(a, r, l);
  };
  return e;
}, be = function(n) {
  var e = function r(a, l) {
    return l = l || {}, Array.isArray(a) ? a.map(function(c) {
      return r(c, l);
    }).join("") : n(a, r, l);
  };
  return e;
}, D = function(n, e, r = {}) {
  if (!e)
    throw new Error("simple-markdown: outputFor: `property` must be defined. if you just upgraded, you probably need to replace `outputFor` with `reactFor`");
  var a, l = n.Array || L.Array, c = l[e];
  if (!c)
    throw new Error("simple-markdown: outputFor: to join nodes of type `" + // @ts-expect-error [FEI-5003] - TS2469 - The '+' operator cannot be applied to type 'symbol'.
    e + "` you must provide an `Array:` joiner rule with that type, Please see the docs for details on specifying an Array rule.");
  var o = c, u = function f(s, p) {
    return p = p || a, a = p, Array.isArray(s) ? o(s, f, p) : n[s.type][e](s, f, p);
  }, i = function(s, p) {
    return a = Q(p, r), u(s, a);
  };
  return i;
}, $ = V(L), U = function(n, e) {
  return e = e || {}, e.inline = !1, $(n, e);
}, we = function(n, e) {
  return e = e || {}, e.inline = !0, $(n, e);
}, W = function(n, e) {
  var r = te.test(n);
  return e = e || {}, e.inline = !r, $(n, e);
}, H = D(L, "react"), ne = D(L, "html"), re = function(n, e) {
  return H(U(n, e), e);
}, ke = function(n, e) {
  return ne(U(n, e), e);
}, Re = function(n) {
  var e = {};
  for (var r in n)
    r !== "source" && Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
  return e.children = re(n.source), m("div", null, e);
}, ae = {
  defaultRules: L,
  parserFor: V,
  outputFor: D,
  inlineRegex: T,
  blockRegex: E,
  anyScopeRegex: j,
  parseInline: B,
  parseBlock: ve,
  // default wrappers:
  markdownToReact: re,
  markdownToHtml: ke,
  // @ts-expect-error [FEI-5003] - TS2322 - Type 'FC<any>' is not assignable to type '(props: { [key: string]: any; source: string; }) => ReactElement'.
  ReactMarkdown: Re,
  defaultBlockParse: U,
  defaultInlineParse: we,
  defaultImplicitParse: W,
  defaultReactOutput: H,
  defaultHtmlOutput: ne,
  preprocess: J,
  sanitizeText: S,
  sanitizeUrl: I,
  unescapeUrl: M,
  htmlTag: g,
  reactElement: m,
  // deprecated:
  defaultRawParse: $,
  ruleOutput: _e,
  reactFor: Ee,
  htmlFor: be,
  defaultParse: function(...t) {
    return typeof console < "u" && console.warn("defaultParse is deprecated, please use `defaultImplicitParse`"), W.apply(null, t);
  },
  defaultOutput: function(...t) {
    return typeof console < "u" && console.warn("defaultOutput is deprecated, please use `defaultReactOutput`"), H.apply(null, t);
  }
};
function Se(t) {
  return t.replace(/\n{2,}/g, `
`).replace(/^\s+/gm, "");
}
function Ie(t) {
  const n = Se(t), e = ae.defaultBlockParse, r = e(n);
  let a = [[]], l = 0;
  function c(o, u) {
    o.type === "text" ? o.content.split(`
`).forEach((f, s) => {
      s !== 0 && (l++, a.push([])), f.split(" ").forEach((p) => {
        p && a[l].push({ content: p, type: u || "normal" });
      });
    }) : (o.type === "strong" || o.type === "em") && o.content.forEach((i) => {
      c(i, o.type);
    });
  }
  return r.forEach((o) => {
    o.type === "paragraph" && o.content.forEach((u) => {
      c(u);
    });
  }), a;
}
function Le(t) {
  const n = ae.defaultBlockParse, e = n(t);
  function r(a) {
    return a.type === "text" ? a.content.replace(/\n/g, "<br/>") : a.type === "strong" ? `<strong>${a.content.map(r).join("")}</strong>` : a.type === "em" ? `<em>${a.content.map(r).join("")}</em>` : a.type === "paragraph" ? `<p>${a.content.map(r).join("")}</p>` : "";
  }
  return e.map(r).join("");
}
function Ae(t, n) {
  n && t.attr("style", n);
}
function Oe(t, n, e, r) {
  const a = t.append("foreignObject"), l = a.append("xhtml:div"), c = n.label, o = n.isNode ? "nodeLabel" : "edgeLabel";
  l.html(
    `<span class="${o} ${r}" ` + (n.labelStyle ? 'style="' + n.labelStyle + '"' : "") + ">" + c + "</span>"
  ), Ae(l, n.labelStyle), l.style("display", "table-cell"), l.style("white-space", "nowrap"), l.style("max-width", e + "px"), l.attr("xmlns", "http://www.w3.org/1999/xhtml");
  let u = l.node().getBoundingClientRect();
  return u.width === e && (l.style("display", "table"), l.style("white-space", "break-spaces"), l.style("width", e + "px"), u = l.node().getBoundingClientRect()), a.style("width", u.width), a.style("height", u.height), a.node();
}
function Z(t, n, e) {
  return t.append("tspan").attr("class", "text-outer-tspan").attr("x", 0).attr("y", n * e - 0.1 + "em").attr("dy", e + "em");
}
function Pe(t, n, e, r = !1) {
  const l = n.append("g");
  let c = l.insert("rect").attr("class", "background");
  const o = l.append("text").attr("y", "-10.1");
  let u = -1;
  if (e.forEach((i) => {
    u++;
    let f = Z(o, u, 1.1), s = [...i].reverse(), p, h = [];
    for (; s.length; )
      p = s.pop(), h.push(p), Y(f, h), f.node().getComputedTextLength() > t && (h.pop(), s.push(p), Y(f, h), h = [], u++, f = Z(o, u, 1.1));
  }), r) {
    const i = o.node().getBBox(), f = 2;
    return c.attr("x", -f).attr("y", -f).attr("width", i.width + 2 * f).attr("height", i.height + 2 * f), l.node();
  } else
    return o.node();
}
function Y(t, n) {
  t.text(""), n.forEach((e, r) => {
    const a = t.append("tspan").attr("font-style", e.type === "em" ? "italic" : "normal").attr("class", "text-inner-tspan").attr("font-weight", e.type === "strong" ? "bold" : "normal");
    r === 0 ? a.text(e.content) : a.text(" " + e.content);
  });
}
const Be = (t, n = "", {
  style: e = "",
  isTitle: r = !1,
  classes: a = "",
  useHtmlLabels: l = !0,
  isNode: c = !0,
  width: o,
  addSvgBackground: u = !1
} = {}) => {
  if (le.info("createText", n, e, r, a, l, c, u), l) {
    const i = Le(n), f = {
      isNode: c,
      label: oe(i).replace(
        /fa[blrs]?:fa-[\w-]+/g,
        (p) => `<i class='${p.replace(":", " ")}'></i>`
      ),
      labelStyle: e.replace("fill:", "color:")
    };
    return Oe(t, f, o, a);
  } else {
    const i = Ie(n), f = ['"', "'", ".", ",", ":", ";", "!", "?", "(", ")", "[", "]", "{", "}"];
    let s;
    return i.forEach((h) => {
      h.forEach((d) => {
        f.includes(d.content) && s && (s.content += d.content, d.content = ""), s = d;
      });
    }), Pe(o, t, i, u);
  }
};
export {
  Be as c
};
