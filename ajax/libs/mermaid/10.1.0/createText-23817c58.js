import { l as lt } from "./commonDb-41f8b4c5.js";
import { p as ut } from "./mermaidAPI-67f627de.js";
var it = /\r\n?/g, ot = /\t/g, ct = /\f/g, J = function(t) {
  return t.replace(it, `
`).replace(ct, "").replace(ot, "    ");
}, Q = function(t, e) {
  var r = t || {};
  if (e != null)
    for (var a in e)
      Object.prototype.hasOwnProperty.call(e, a) && (r[a] = e[a]);
  return r;
}, V = function(t, e) {
  var r = Object.keys(t).filter(function(i) {
    var u = t[i];
    if (u == null || u.match == null)
      return !1;
    var c = u.order;
    return (typeof c != "number" || !isFinite(c)) && typeof console < "u" && console.warn("simple-markdown: Invalid order for rule `" + i + "`: " + String(c)), !0;
  });
  r.sort(function(i, u) {
    var c = t[i], f = t[u], s = c.order, p = f.order;
    if (s !== p)
      return s - p;
    var h = c.quality ? 0 : 1, g = f.quality ? 0 : 1;
    return h !== g ? h - g : i < u ? -1 : i > u ? 1 : 0;
  });
  var a, l = function i(u, c) {
    var f = [];
    for (c = c || a, a = c; u; ) {
      var s = null, p = null, h = null, g = NaN, S = 0, x = r[0], y = t[x];
      do {
        var E = y.order, b = c.prevCapture == null ? "" : c.prevCapture[0], k = y.match(u, c, b);
        if (k) {
          var A = y.quality ? y.quality(k, c, b) : 0;
          A <= g || (s = x, p = y, h = k, g = A);
        }
        S++, x = r[S], y = t[x];
      } while (
        // keep looping while we're still within the ruleList
        y && // if we don't have a match yet, continue
        (!h || // or if we have a match, but the next rule is
        // at the same order, and has a quality measurement
        // functions, then this rule must have a quality
        // measurement function (since they are sorted before
        // those without), and we need to check if there is
        // a better quality match
        y.order === E && y.quality)
      );
      if (p == null || h == null)
        throw new Error("Could not find a matching rule for the below content. The rule with highest `order` should always match content provided to it. Check the definition of `match` for '" + r[r.length - 1] + `'. It seems to not match the following source:
` + u);
      if (h.index)
        throw new Error("`match` must return a capture starting at index 0 (the current parse index). Did you forget a ^ at the start of the RegExp?");
      var w = p.parse(h, i, c);
      if (Array.isArray(w))
        Array.prototype.push.apply(f, w);
      else {
        if (w == null || typeof w != "object")
          throw new Error("parse() function returned invalid parse result: '".concat(w, "'"));
        w.type == null && (w.type = s), f.push(w);
      }
      c.prevCapture = h, u = u.substring(c.prevCapture[0].length);
    }
    return f;
  }, o = function(u, c) {
    return a = Q(c, e), !a.inline && !a.disableAutoBlockNewlines && (u = u + `

`), a.prevCapture = null, l(J(u), a);
  };
  return o;
}, _ = function(t) {
  var e = function(a, l, o) {
    return l.inline ? t.exec(a) : null;
  };
  return e.regex = t, e;
}, T = function(t) {
  var e = function(a, l) {
    return l.inline ? null : t.exec(a);
  };
  return e.regex = t, e;
}, j = function(t) {
  var e = function(a, l) {
    return t.exec(a);
  };
  return e.regex = t, e;
}, ft = typeof Symbol == "function" && Symbol.for && Symbol.for("react.element") || 60103, v = function(t, e, r) {
  var a = {
    $$typeof: ft,
    type: t,
    key: e ?? void 0,
    ref: null,
    props: r,
    _owner: null
  };
  return a;
}, d = function(t, e, r, a) {
  r = r || {}, a = typeof a < "u" ? a : !0;
  var l = "";
  for (var o in r) {
    var i = r[o];
    // $FlowFixMe
    Object.prototype.hasOwnProperty.call(r, o) && i && (l += " " + R(o) + '="' + R(i) + '"');
  }
  var u = "<" + t + l + ">";
  return a ? u + e + "</" + t + ">" : u;
}, U = {}, I = function(t) {
  if (t == null)
    return null;
  try {
    var e = new URL(t, "https://localhost").protocol;
    if (e.indexOf("javascript:") === 0 || e.indexOf("vbscript:") === 0 || e.indexOf("data:") === 0)
      return null;
  } catch {
    return null;
  }
  return t;
}, st = /[<>&"']/g, pt = {
  "<": "&lt;",
  ">": "&gt;",
  "&": "&amp;",
  '"': "&quot;",
  "'": "&#x27;",
  "/": "&#x2F;",
  "`": "&#96;"
}, R = function(t) {
  return String(t).replace(st, function(e) {
    return pt[e];
  });
}, ht = /\\([^0-9A-Za-z\s])/g, M = function(t) {
  return t.replace(ht, "$1");
}, B = function(t, e, r) {
  var a = r.inline || !1;
  r.inline = !0;
  var l = t(e, r);
  return r.inline = a, l;
}, mt = function(t, e, r) {
  var a = r.inline || !1;
  r.inline = !1;
  var l = t(e + `

`, r);
  return r.inline = a, l;
}, O = function(t, e, r) {
  return {
    content: B(e, t[1], r)
  };
}, F = function() {
  return {};
}, N = "(?:[*+-]|\\d+\\.)", tt = "( *)(" + N + ") +", K = new RegExp("^" + tt), gt = new RegExp(tt + "[^\\n]*(?:\\n(?!\\1" + N + ` )[^\\n]*)*(
|$)`, "gm"), et = /\n{2,}$/, vt = /^ (?= *`)|(` *) $/g, dt = et, z = / *\n+$/, yt = new RegExp("^( *)(" + N + `) [\\s\\S]+?(?:
{2,}(?! )(?!\\1` + N + ` )\\n*|\\s*
*$)`), xt = /(?:^|\n)( *)$/, P = function() {
  var n = /^ *\| *| *\| *$/g, t = / *$/, e = /^ *-+: *$/, r = /^ *:-+: *$/, a = /^ *:-+ *$/, l = function(s) {
    return e.test(s) ? "right" : r.test(s) ? "center" : a.test(s) ? "left" : null;
  }, o = function(s, p, h, g) {
    g && (s = s.replace(n, ""));
    var S = s.trim().split("|");
    return S.map(l);
  }, i = function(s, p, h, g) {
    var S = h.inTable;
    h.inTable = !0;
    var x = p(s.trim(), h);
    h.inTable = S;
    var y = [[]];
    return x.forEach(function(E, b) {
      E.type === "tableSeparator" ? (!g || b !== 0 && b !== x.length - 1) && y.push([]) : (E.type === "text" && (x[b + 1] == null || x[b + 1].type === "tableSeparator") && (E.content = E.content.replace(t, "")), y[y.length - 1].push(E));
    }), y;
  }, u = function(s, p, h, g) {
    var S = s.trim().split(`
`);
    return S.map(function(x) {
      return i(x, p, h, g);
    });
  }, c = function(s) {
    return function(p, h, g) {
      g.inline = !0;
      var S = i(p[1], h, g, s), x = o(p[2], h, g, s), y = u(p[3], h, g, s);
      return g.inline = !1, {
        type: "table",
        header: S,
        align: x,
        cells: y
      };
    };
  };
  return {
    parseTable: c(!0),
    parseNpTable: c(!1),
    TABLE_REGEX: /^ *(\|.+)\n *\|( *[-:]+[-| :]*)\n((?: *\|.*(?:\n|$))*)\n*/,
    NPTABLE_REGEX: /^ *(\S.*\|.*)\n *([-:]+ *\|[-| :]*)\n((?:.*\|.*(?:\n|$))*)\n*/
  };
}(), C = "(?:\\[[^\\]]*\\]|[^\\[\\]]|\\](?=[^\\[]*\\]))*", G = `\\s*<?((?:\\([^)]*\\)|[^\\s\\\\]|\\\\.)*?)>?(?:\\s+['"]([\\s\\S]*?)['"])?\\s*`, _t = /mailto:/i, X = function(t, e, r) {
  var a = (t[2] || t[1]).replace(/\s+/g, " ").toLowerCase();
  if (e._defs && e._defs[a]) {
    var l = e._defs[a];
    r.target = l.target, r.title = l.title;
  }
  return e._refs = e._refs || {}, e._refs[a] = e._refs[a] || [], e._refs[a].push(r), r;
}, m = 0, L = {
  Array: {
    react: function(t, e, r) {
      for (var a = r.key, l = [], o = 0, i = 0; o < t.length; o++, i++) {
        r.key = "" + o;
        var u = t[o];
        if (u.type === "text")
          for (u = {
            type: "text",
            content: u.content
          }; o + 1 < t.length && t[o + 1].type === "text"; o++)
            u.content += t[o + 1].content;
        l.push(e(u, r));
      }
      return r.key = a, l;
    },
    html: function(t, e, r) {
      for (var a = "", l = 0; l < t.length; l++) {
        var o = t[l];
        if (o.type === "text")
          for (o = {
            type: "text",
            content: o.content
          }; l + 1 < t.length && t[l + 1].type === "text"; l++)
            o.content += t[l + 1].content;
        a += e(o, r);
      }
      return a;
    }
  },
  heading: {
    order: m++,
    match: T(/^ *(#{1,6})([^\n]+?)#* *(?:\n *)+\n/),
    parse: function(n) {
      function t(e, r, a) {
        return n.apply(this, arguments);
      }
      return t.toString = function() {
        return n.toString();
      }, t;
    }(function(n, t, e) {
      return {
        level: n[1].length,
        content: B(t, n[2].trim(), e)
      };
    }),
    react: function(t, e, r) {
      return v("h" + t.level, r.key, {
        children: e(t.content, r)
      });
    },
    html: function(t, e, r) {
      return d("h" + t.level, e(t.content, r));
    }
  },
  nptable: {
    order: m++,
    match: T(P.NPTABLE_REGEX),
    parse: P.parseNpTable,
    react: null,
    html: null
  },
  lheading: {
    order: m++,
    match: T(/^([^\n]+)\n *(=|-){3,} *(?:\n *)+\n/),
    parse: function(n) {
      function t(e, r, a) {
        return n.apply(this, arguments);
      }
      return t.toString = function() {
        return n.toString();
      }, t;
    }(function(n, t, e) {
      return {
        type: "heading",
        level: n[2] === "=" ? 1 : 2,
        content: B(t, n[1], e)
      };
    }),
    react: null,
    html: null
  },
  hr: {
    order: m++,
    match: T(/^( *[-*_]){3,} *(?:\n *)+\n/),
    parse: F,
    react: function(t, e, r) {
      return v("hr", r.key, U);
    },
    html: function(t, e, r) {
      return "<hr>";
    }
  },
  codeBlock: {
    order: m++,
    match: T(/^(?:    [^\n]+\n*)+(?:\n *)+\n/),
    parse: function(n) {
      function t(e, r, a) {
        return n.apply(this, arguments);
      }
      return t.toString = function() {
        return n.toString();
      }, t;
    }(function(n, t, e) {
      var r = n[0].replace(/^    /gm, "").replace(/\n+$/, "");
      return {
        lang: void 0,
        content: r
      };
    }),
    react: function(t, e, r) {
      var a = t.lang ? "markdown-code-" + t.lang : void 0;
      return v("pre", r.key, {
        children: v("code", null, {
          className: a,
          children: t.content
        })
      });
    },
    html: function(t, e, r) {
      var a = t.lang ? "markdown-code-" + t.lang : void 0, l = d("code", R(t.content), {
        class: a
      });
      return d("pre", l);
    }
  },
  fence: {
    order: m++,
    match: T(/^ *(`{3,}|~{3,}) *(?:(\S+) *)?\n([\s\S]+?)\n?\1 *(?:\n *)+\n/),
    parse: function(n) {
      function t(e, r, a) {
        return n.apply(this, arguments);
      }
      return t.toString = function() {
        return n.toString();
      }, t;
    }(function(n, t, e) {
      return {
        type: "codeBlock",
        lang: n[2] || void 0,
        content: n[3]
      };
    }),
    react: null,
    html: null
  },
  blockQuote: {
    order: m++,
    match: T(/^( *>[^\n]+(\n[^\n]+)*\n*)+\n{2,}/),
    parse: function(n) {
      function t(e, r, a) {
        return n.apply(this, arguments);
      }
      return t.toString = function() {
        return n.toString();
      }, t;
    }(function(n, t, e) {
      var r = n[0].replace(/^ *> ?/gm, "");
      return {
        content: t(r, e)
      };
    }),
    react: function(t, e, r) {
      return v("blockquote", r.key, {
        children: e(t.content, r)
      });
    },
    html: function(t, e, r) {
      return d("blockquote", e(t.content, r));
    }
  },
  list: {
    order: m++,
    // $FlowFixMe
    match: function(t, e) {
      var r = e.prevCapture == null ? "" : e.prevCapture[0], a = xt.exec(r), l = e._list || !e.inline;
      return a && l ? (t = a[1] + t, yt.exec(t)) : null;
    },
    parse: function(n) {
      function t(e, r, a) {
        return n.apply(this, arguments);
      }
      return t.toString = function() {
        return n.toString();
      }, t;
    }(function(n, t, e) {
      var r = n[2], a = r.length > 1, l = a ? +r : void 0, o = n[0].replace(dt, `
`).match(gt), i = !1, u = o.map(function(c, f) {
        var s = K.exec(c), p = s ? s[0].length : 0, h = new RegExp("^ {1," + p + "}", "gm"), g = c.replace(h, "").replace(K, ""), S = f === o.length - 1, x = g.indexOf(`

`) !== -1, y = x || S && i;
        i = y;
        var E = e.inline, b = e._list;
        e._list = !0;
        var k;
        y ? (e.inline = !1, k = g.replace(z, `

`)) : (e.inline = !0, k = g.replace(z, ""));
        var A = t(k, e);
        return e.inline = E, e._list = b, A;
      });
      return {
        ordered: a,
        start: l,
        items: u
      };
    }),
    react: function(t, e, r) {
      var a = t.ordered ? "ol" : "ul";
      return v(a, r.key, {
        start: t.start,
        children: t.items.map(function(l, o) {
          return v("li", "" + o, {
            children: e(l, r)
          });
        })
      });
    },
    html: function(t, e, r) {
      var a = t.items.map(function(i) {
        return d("li", e(i, r));
      }).join(""), l = t.ordered ? "ol" : "ul", o = {
        start: t.start
      };
      return d(l, a, o);
    }
  },
  def: {
    order: m++,
    // TODO(aria): This will match without a blank line before the next
    // block element, which is inconsistent with most of the rest of
    // simple-markdown.
    match: T(/^ *\[([^\]]+)\]: *<?([^\s>]*)>?(?: +["(]([^\n]+)[")])? *\n(?: *\n)*/),
    parse: function(n) {
      function t(e, r, a) {
        return n.apply(this, arguments);
      }
      return t.toString = function() {
        return n.toString();
      }, t;
    }(function(n, t, e) {
      var r = n[1].replace(/\s+/g, " ").toLowerCase(), a = n[2], l = n[3];
      return e._refs && e._refs[r] && e._refs[r].forEach(function(o) {
        o.target = a, o.title = l;
      }), e._defs = e._defs || {}, e._defs[r] = {
        target: a,
        title: l
      }, {
        def: r,
        target: a,
        title: l
      };
    }),
    react: function() {
      return null;
    },
    html: function() {
      return "";
    }
  },
  table: {
    order: m++,
    match: T(P.TABLE_REGEX),
    parse: P.parseTable,
    react: function(t, e, r) {
      var a = function(u) {
        return t.align[u] == null ? {} : {
          textAlign: t.align[u]
        };
      }, l = t.header.map(function(i, u) {
        return v("th", "" + u, {
          style: a(u),
          scope: "col",
          children: e(i, r)
        });
      }), o = t.cells.map(function(i, u) {
        return v("tr", "" + u, {
          children: i.map(function(c, f) {
            return v("td", "" + f, {
              style: a(f),
              children: e(c, r)
            });
          })
        });
      });
      return v("table", r.key, {
        children: [v("thead", "thead", {
          children: v("tr", null, {
            children: l
          })
        }), v("tbody", "tbody", {
          children: o
        })]
      });
    },
    html: function(t, e, r) {
      var a = function(f) {
        return t.align[f] == null ? "" : "text-align:" + t.align[f] + ";";
      }, l = t.header.map(function(c, f) {
        return d("th", e(c, r), {
          style: a(f),
          scope: "col"
        });
      }).join(""), o = t.cells.map(function(c) {
        var f = c.map(function(s, p) {
          return d("td", e(s, r), {
            style: a(p)
          });
        }).join("");
        return d("tr", f);
      }).join(""), i = d("thead", d("tr", l)), u = d("tbody", o);
      return d("table", i + u);
    }
  },
  newline: {
    order: m++,
    match: T(/^(?:\n *)*\n/),
    parse: F,
    react: function(t, e, r) {
      return `
`;
    },
    html: function(t, e, r) {
      return `
`;
    }
  },
  paragraph: {
    order: m++,
    match: T(/^((?:[^\n]|\n(?! *\n))+)(?:\n *)+\n/),
    parse: O,
    react: function(t, e, r) {
      return v("div", r.key, {
        className: "paragraph",
        children: e(t.content, r)
      });
    },
    html: function(t, e, r) {
      var a = {
        class: "paragraph"
      };
      return d("div", e(t.content, r), a);
    }
  },
  escape: {
    order: m++,
    // We don't allow escaping numbers, letters, or spaces here so that
    // backslashes used in plain text still get rendered. But allowing
    // escaping anything else provides a very flexible escape mechanism,
    // regardless of how this grammar is extended.
    match: _(/^\\([^0-9A-Za-z\s])/),
    parse: function(n) {
      function t(e, r, a) {
        return n.apply(this, arguments);
      }
      return t.toString = function() {
        return n.toString();
      }, t;
    }(function(n, t, e) {
      return {
        type: "text",
        content: n[1]
      };
    }),
    react: null,
    html: null
  },
  tableSeparator: {
    order: m++,
    // $FlowFixMe
    match: function(t, e) {
      return e.inTable ? /^ *\| */.exec(t) : null;
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
    order: m++,
    match: _(/^<([^: >]+:\/[^ >]+)>/),
    parse: function(n) {
      function t(e, r, a) {
        return n.apply(this, arguments);
      }
      return t.toString = function() {
        return n.toString();
      }, t;
    }(function(n, t, e) {
      return {
        type: "link",
        content: [{
          type: "text",
          content: n[1]
        }],
        target: n[1]
      };
    }),
    react: null,
    html: null
  },
  mailto: {
    order: m++,
    match: _(/^<([^ >]+@[^ >]+)>/),
    parse: function(n) {
      function t(e, r, a) {
        return n.apply(this, arguments);
      }
      return t.toString = function() {
        return n.toString();
      }, t;
    }(function(n, t, e) {
      var r = n[1], a = n[1];
      return _t.test(a) || (a = "mailto:" + a), {
        type: "link",
        content: [{
          type: "text",
          content: r
        }],
        target: a
      };
    }),
    react: null,
    html: null
  },
  url: {
    order: m++,
    match: _(/^(https?:\/\/[^\s<]+[^<.,:;"')\]\s])/),
    parse: function(n) {
      function t(e, r, a) {
        return n.apply(this, arguments);
      }
      return t.toString = function() {
        return n.toString();
      }, t;
    }(function(n, t, e) {
      return {
        type: "link",
        content: [{
          type: "text",
          content: n[1]
        }],
        target: n[1],
        title: void 0
      };
    }),
    react: null,
    html: null
  },
  link: {
    order: m++,
    match: _(new RegExp("^\\[(" + C + ")\\]\\(" + G + "\\)")),
    parse: function(n) {
      function t(e, r, a) {
        return n.apply(this, arguments);
      }
      return t.toString = function() {
        return n.toString();
      }, t;
    }(function(n, t, e) {
      var r = {
        content: t(n[1], e),
        target: M(n[2]),
        title: n[3]
      };
      return r;
    }),
    react: function(t, e, r) {
      return v("a", r.key, {
        href: I(t.target),
        title: t.title,
        children: e(t.content, r)
      });
    },
    html: function(t, e, r) {
      var a = {
        href: I(t.target),
        title: t.title
      };
      return d("a", e(t.content, r), a);
    }
  },
  image: {
    order: m++,
    match: _(new RegExp("^!\\[(" + C + ")\\]\\(" + G + "\\)")),
    parse: function(n) {
      function t(e, r, a) {
        return n.apply(this, arguments);
      }
      return t.toString = function() {
        return n.toString();
      }, t;
    }(function(n, t, e) {
      var r = {
        alt: n[1],
        target: M(n[2]),
        title: n[3]
      };
      return r;
    }),
    react: function(t, e, r) {
      return v("img", r.key, {
        src: I(t.target),
        alt: t.alt,
        title: t.title
      });
    },
    html: function(t, e, r) {
      var a = {
        src: I(t.target),
        alt: t.alt,
        title: t.title
      };
      return d("img", "", a, !1);
    }
  },
  reflink: {
    order: m++,
    match: _(new RegExp(
      // The first [part] of the link
      "^\\[(" + C + ")\\]\\s*\\[([^\\]]*)\\]"
    )),
    parse: function(n) {
      function t(e, r, a) {
        return n.apply(this, arguments);
      }
      return t.toString = function() {
        return n.toString();
      }, t;
    }(function(n, t, e) {
      return X(n, e, {
        type: "link",
        content: t(n[1], e)
      });
    }),
    react: null,
    html: null
  },
  refimage: {
    order: m++,
    match: _(new RegExp(
      // The first [part] of the link
      "^!\\[(" + C + ")\\]\\s*\\[([^\\]]*)\\]"
    )),
    parse: function(n) {
      function t(e, r, a) {
        return n.apply(this, arguments);
      }
      return t.toString = function() {
        return n.toString();
      }, t;
    }(function(n, t, e) {
      return X(n, e, {
        type: "image",
        alt: n[1]
      });
    }),
    react: null,
    html: null
  },
  em: {
    order: m,
    match: _(new RegExp(
      // only match _s surrounding words.
      "^\\b_((?:__|\\\\[\\s\\S]|[^\\\\_])+?)_\\b|^\\*(?=\\S)((?:\\*\\*|\\\\[\\s\\S]|\\s+(?:\\\\[\\s\\S]|[^\\s\\*\\\\]|\\*\\*)|[^\\s\\*\\\\])+?)\\*(?!\\*)"
    )),
    quality: function(t) {
      return t[0].length + 0.2;
    },
    parse: function(n) {
      function t(e, r, a) {
        return n.apply(this, arguments);
      }
      return t.toString = function() {
        return n.toString();
      }, t;
    }(function(n, t, e) {
      return {
        content: t(n[2] || n[1], e)
      };
    }),
    react: function(t, e, r) {
      return v("em", r.key, {
        children: e(t.content, r)
      });
    },
    html: function(t, e, r) {
      return d("em", e(t.content, r));
    }
  },
  strong: {
    order: m,
    match: _(/^\*\*((?:\\[\s\S]|[^\\])+?)\*\*(?!\*)/),
    quality: function(t) {
      return t[0].length + 0.1;
    },
    parse: O,
    react: function(t, e, r) {
      return v("strong", r.key, {
        children: e(t.content, r)
      });
    },
    html: function(t, e, r) {
      return d("strong", e(t.content, r));
    }
  },
  u: {
    order: m++,
    match: _(/^__((?:\\[\s\S]|[^\\])+?)__(?!_)/),
    quality: function(t) {
      return t[0].length;
    },
    parse: O,
    react: function(t, e, r) {
      return v("u", r.key, {
        children: e(t.content, r)
      });
    },
    html: function(t, e, r) {
      return d("u", e(t.content, r));
    }
  },
  del: {
    order: m++,
    match: _(/^~~(?=\S)((?:\\[\s\S]|~(?!~)|[^\s~\\]|\s(?!~~))+?)~~/),
    parse: O,
    react: function(t, e, r) {
      return v("del", r.key, {
        children: e(t.content, r)
      });
    },
    html: function(t, e, r) {
      return d("del", e(t.content, r));
    }
  },
  inlineCode: {
    order: m++,
    match: _(/^(`+)([\s\S]*?[^`])\1(?!`)/),
    parse: function(n) {
      function t(e, r, a) {
        return n.apply(this, arguments);
      }
      return t.toString = function() {
        return n.toString();
      }, t;
    }(function(n, t, e) {
      return {
        content: n[2].replace(vt, "$1")
      };
    }),
    react: function(t, e, r) {
      return v("code", r.key, {
        children: t.content
      });
    },
    html: function(t, e, r) {
      return d("code", R(t.content));
    }
  },
  br: {
    order: m++,
    match: j(/^ {2,}\n/),
    parse: F,
    react: function(t, e, r) {
      return v("br", r.key, U);
    },
    html: function(t, e, r) {
      return "<br>";
    }
  },
  text: {
    order: m++,
    // Here we look for anything followed by non-symbols,
    // double newlines, or double-space-newlines
    // We break on any symbol characters so that this grammar
    // is easy to extend without needing to modify this regex
    match: j(/^[\s\S]+?(?=[^0-9A-Za-z\s\u00c0-\uffff]|\n\n| {2,}\n|\w+:\S|$)/),
    parse: function(n) {
      function t(e, r, a) {
        return n.apply(this, arguments);
      }
      return t.toString = function() {
        return n.toString();
      }, t;
    }(function(n, t, e) {
      return {
        content: n[0]
      };
    }),
    react: function(t, e, r) {
      return t.content;
    },
    html: function(t, e, r) {
      return R(t.content);
    }
  }
}, St = function(t, e) {
  !e && typeof console < "u" && console.warn("simple-markdown ruleOutput should take 'react' or 'html' as the second argument.");
  var r = function(l, o, i) {
    return t[l.type][e](l, o, i);
  };
  return r;
}, Tt = function(t) {
  var e = function r(a, l) {
    if (l = l || {}, Array.isArray(a)) {
      for (var o = l.key, i = [], u = null, c = 0; c < a.length; c++) {
        l.key = "" + c;
        var f = r(a[c], l);
        typeof f == "string" && typeof u == "string" ? (u = u + f, i[i.length - 1] = u) : (i.push(f), u = f);
      }
      return l.key = o, i;
    } else
      return t(a, r, l);
  };
  return e;
}, Et = function(t) {
  var e = function r(a, l) {
    return l = l || {}, Array.isArray(a) ? a.map(function(o) {
      return r(o, l);
    }).join("") : t(a, r, l);
  };
  return e;
}, H = function(t, e) {
  var r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
  if (!e)
    throw new Error("simple-markdown: outputFor: `property` must be defined. if you just upgraded, you probably need to replace `outputFor` with `reactFor`");
  var a, l = t.Array || L.Array, o = l[e];
  if (!o)
    throw new Error("simple-markdown: outputFor: to join nodes of type `" + e + "` you must provide an `Array:` joiner rule with that type, Please see the docs for details on specifying an Array rule.");
  var i = o, u = function f(s, p) {
    return p = p || a, a = p, Array.isArray(s) ? i(s, f, p) : t[s.type][e](s, f, p);
  }, c = function(s, p) {
    return a = Q(p, r), u(s, a);
  };
  return c;
}, $ = V(L), D = function(t, e) {
  return e = e || {}, e.inline = !1, $(t, e);
}, bt = function(t, e) {
  return e = e || {}, e.inline = !0, $(t, e);
}, W = function(t, e) {
  var r = et.test(t);
  return e = e || {}, e.inline = !r, $(t, e);
}, q = H(L, "react"), nt = H(L, "html"), rt = function(t, e) {
  return q(D(t, e), e);
}, wt = function(t, e) {
  return nt(D(t, e), e);
}, kt = function(t) {
  var e = {};
  for (var r in t)
    r !== "source" && // $FlowFixMe
    Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r]);
  return e.children = rt(t.source), v("div", null, e);
}, at = {
  defaultRules: L,
  parserFor: V,
  outputFor: H,
  inlineRegex: _,
  blockRegex: T,
  anyScopeRegex: j,
  parseInline: B,
  parseBlock: mt,
  // default wrappers:
  markdownToReact: rt,
  markdownToHtml: wt,
  ReactMarkdown: kt,
  defaultBlockParse: D,
  defaultInlineParse: bt,
  defaultImplicitParse: W,
  defaultReactOutput: q,
  defaultHtmlOutput: nt,
  preprocess: J,
  sanitizeText: R,
  sanitizeUrl: I,
  unescapeUrl: M,
  htmlTag: d,
  reactElement: v,
  // deprecated:
  defaultRawParse: $,
  ruleOutput: St,
  reactFor: Tt,
  htmlFor: Et,
  defaultParse: function() {
    return typeof console < "u" && console.warn("defaultParse is deprecated, please use `defaultImplicitParse`"), W.apply(null, arguments);
  },
  defaultOutput: function() {
    return typeof console < "u" && console.warn("defaultOutput is deprecated, please use `defaultReactOutput`"), q.apply(null, arguments);
  }
};
function Rt(n) {
  return n.replace(/\n{2,}/g, `
`).replace(/^\s+/gm, "");
}
function It(n) {
  const t = Rt(n), e = at.defaultBlockParse, r = e(t);
  let a = [[]], l = 0;
  function o(i, u) {
    i.type === "text" ? i.content.split(`
`).forEach((f, s) => {
      s !== 0 && (l++, a.push([])), f.split(" ").forEach((p) => {
        p && a[l].push({ content: p, type: u || "normal" });
      });
    }) : (i.type === "strong" || i.type === "em") && i.content.forEach((c) => {
      o(c, i.type);
    });
  }
  return r.forEach((i) => {
    i.type === "paragraph" && i.content.forEach((u) => {
      o(u);
    });
  }), a;
}
function Lt(n) {
  const t = at.defaultBlockParse, e = t(n);
  function r(a) {
    return a.type === "text" ? a.content.replace(/\n/g, "<br/>") : a.type === "strong" ? `<strong>${a.content.map(r).join("")}</strong>` : a.type === "em" ? `<em>${a.content.map(r).join("")}</em>` : a.type === "paragraph" ? `<p>${a.content.map(r).join("")}</p>` : "";
  }
  return e.map(r).join("");
}
function At(n, t) {
  t && n.attr("style", t);
}
function Ot(n, t, e, r) {
  const a = n.append("foreignObject"), l = a.append("xhtml:div"), o = t.label, i = t.isNode ? "nodeLabel" : "edgeLabel";
  l.html(
    `<span class="${i} ${r}" ` + (t.labelStyle ? 'style="' + t.labelStyle + '"' : "") + ">" + o + "</span>"
  ), At(l, t.labelStyle), l.style("display", "table-cell"), l.style("white-space", "nowrap"), l.style("max-width", e + "px"), l.attr("xmlns", "http://www.w3.org/1999/xhtml");
  let u = l.node().getBoundingClientRect();
  return u.width === e && (l.style("display", "table"), l.style("white-space", "break-spaces"), l.style("width", e + "px"), u = l.node().getBoundingClientRect()), a.style("width", u.width), a.style("height", u.height), a.node();
}
function Z(n, t, e) {
  return n.append("tspan").attr("class", "text-outer-tspan").attr("x", 0).attr("y", t * e - 0.1 + "em").attr("dy", e + "em");
}
function Pt(n, t, e, r = !1) {
  const l = t.append("g");
  let o = l.insert("rect").attr("class", "background");
  const i = l.append("text").attr("y", "-10.1");
  let u = -1;
  if (e.forEach((c) => {
    u++;
    let f = Z(i, u, 1.1), s = [...c].reverse(), p, h = [];
    for (; s.length; )
      p = s.pop(), h.push(p), Y(f, h), f.node().getComputedTextLength() > n && (h.pop(), s.push(p), Y(f, h), h = [], u++, f = Z(i, u, 1.1));
  }), r) {
    const c = i.node().getBBox(), f = 2;
    return o.attr("x", -f).attr("y", -f).attr("width", c.width + 2 * f).attr("height", c.height + 2 * f), l.node();
  } else
    return i.node();
}
function Y(n, t) {
  n.text(""), t.forEach((e, r) => {
    const a = n.append("tspan").attr("font-style", e.type === "em" ? "italic" : "normal").attr("class", "text-inner-tspan").attr("font-weight", e.type === "strong" ? "bold" : "normal");
    r === 0 ? a.text(e.content) : a.text(" " + e.content);
  });
}
const Nt = (n, t = "", {
  style: e = "",
  isTitle: r = !1,
  classes: a = "",
  useHtmlLabels: l = !0,
  isNode: o = !0,
  width: i,
  addSvgBackground: u = !1
} = {}) => {
  if (lt.info("createText", t, e, r, a, l, o, u), l) {
    const c = Lt(t), f = {
      isNode: o,
      label: ut(c).replace(
        /fa[blrs]?:fa-[\w-]+/g,
        (p) => `<i class='${p.replace(":", " ")}'></i>`
      ),
      labelStyle: e.replace("fill:", "color:")
    };
    return Ot(n, f, i, a);
  } else {
    const c = It(t), f = ['"', "'", ".", ",", ":", ";", "!", "?", "(", ")", "[", "]", "{", "}"];
    let s;
    return c.forEach((h) => {
      h.forEach((g) => {
        f.includes(g.content) && s && (s.content += g.content, g.content = ""), s = g;
      });
    }), Pt(i, n, c, u);
  }
};
export {
  Nt as c
};
//# sourceMappingURL=createText-23817c58.js.map
