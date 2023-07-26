import { c as ot, g as pt, s as mt, a as _t, b as kt, D as xt, B as vt, E as bt, f as wt, av as St, j as Y, k as Lt } from "./mermaid-42f7bf2b.js";
import { o as Et } from "./ordinal-5695958c.js";
import "./init-f9637058.js";
function At(t) {
  for (var n = t.length / 6 | 0, i = new Array(n), a = 0; a < n; )
    i[a] = "#" + t.slice(a * 6, ++a * 6);
  return i;
}
const Tt = At("4e79a7f28e2ce1575976b7b259a14fedc949af7aa1ff9da79c755fbab0ab");
var tt = function() {
  var t = function(p, s, o, c) {
    for (o = o || {}, c = p.length; c--; o[p[c]] = s)
      ;
    return o;
  }, n = [1, 9], i = [1, 10], a = [1, 5, 10, 12], u = {
    trace: function() {
    },
    yy: {},
    symbols_: { error: 2, start: 3, SANKEY: 4, NEWLINE: 5, csv: 6, opt_eof: 7, record: 8, csv_tail: 9, EOF: 10, "field[source]": 11, COMMA: 12, "field[target]": 13, "field[value]": 14, field: 15, escaped: 16, non_escaped: 17, DQUOTE: 18, ESCAPED_TEXT: 19, NON_ESCAPED_TEXT: 20, $accept: 0, $end: 1 },
    terminals_: { 2: "error", 4: "SANKEY", 5: "NEWLINE", 10: "EOF", 11: "field[source]", 12: "COMMA", 13: "field[target]", 14: "field[value]", 18: "DQUOTE", 19: "ESCAPED_TEXT", 20: "NON_ESCAPED_TEXT" },
    productions_: [0, [3, 4], [6, 2], [9, 2], [9, 0], [7, 1], [7, 0], [8, 5], [15, 1], [15, 1], [16, 3], [17, 1]],
    performAction: function(s, o, c, g, b, d, x) {
      var E = d.length - 1;
      switch (b) {
        case 7:
          const M = g.findOrCreateNode(d[E - 4].trim().replaceAll('""', '"')), P = g.findOrCreateNode(d[E - 2].trim().replaceAll('""', '"')), A = parseFloat(d[E].trim());
          g.addLink(M, P, A);
          break;
        case 8:
        case 9:
        case 11:
          this.$ = d[E];
          break;
        case 10:
          this.$ = d[E - 1];
          break;
      }
    },
    table: [{ 3: 1, 4: [1, 2] }, { 1: [3] }, { 5: [1, 3] }, { 6: 4, 8: 5, 15: 6, 16: 7, 17: 8, 18: n, 20: i }, { 1: [2, 6], 7: 11, 10: [1, 12] }, t(i, [2, 4], { 9: 13, 5: [1, 14] }), { 12: [1, 15] }, t(a, [2, 8]), t(a, [2, 9]), { 19: [1, 16] }, t(a, [2, 11]), { 1: [2, 1] }, { 1: [2, 5] }, t(i, [2, 2]), { 6: 17, 8: 5, 15: 6, 16: 7, 17: 8, 18: n, 20: i }, { 15: 18, 16: 7, 17: 8, 18: n, 20: i }, { 18: [1, 19] }, t(i, [2, 3]), { 12: [1, 20] }, t(a, [2, 10]), { 15: 21, 16: 7, 17: 8, 18: n, 20: i }, t([1, 5, 10], [2, 7])],
    defaultActions: { 11: [2, 1], 12: [2, 5] },
    parseError: function(s, o) {
      if (o.recoverable)
        this.trace(s);
      else {
        var c = new Error(s);
        throw c.hash = o, c;
      }
    },
    parse: function(s) {
      var o = this, c = [0], g = [], b = [null], d = [], x = this.table, E = "", M = 0, P = 0, A = 2, N = 1, C = d.slice.call(arguments, 1), w = Object.create(this.lexer), y = { yy: {} };
      for (var L in this.yy)
        Object.prototype.hasOwnProperty.call(this.yy, L) && (y.yy[L] = this.yy[L]);
      w.setInput(s, y.yy), y.yy.lexer = w, y.yy.parser = this, typeof w.yylloc > "u" && (w.yylloc = {});
      var j = w.yylloc;
      d.push(j);
      var W = w.options && w.options.ranges;
      typeof y.yy.parseError == "function" ? this.parseError = y.yy.parseError : this.parseError = Object.getPrototypeOf(this).parseError;
      function V() {
        var v;
        return v = g.pop() || w.lex() || N, typeof v != "number" && (v instanceof Array && (g = v, v = g.pop()), v = o.symbols_[v] || v), v;
      }
      for (var S, I, T, $, e = {}, f, l, h, r; ; ) {
        if (I = c[c.length - 1], this.defaultActions[I] ? T = this.defaultActions[I] : ((S === null || typeof S > "u") && (S = V()), T = x[I] && x[I][S]), typeof T > "u" || !T.length || !T[0]) {
          var m = "";
          r = [];
          for (f in x[I])
            this.terminals_[f] && f > A && r.push("'" + this.terminals_[f] + "'");
          w.showPosition ? m = "Parse error on line " + (M + 1) + `:
` + w.showPosition() + `
Expecting ` + r.join(", ") + ", got '" + (this.terminals_[S] || S) + "'" : m = "Parse error on line " + (M + 1) + ": Unexpected " + (S == N ? "end of input" : "'" + (this.terminals_[S] || S) + "'"), this.parseError(m, {
            text: w.match,
            token: this.terminals_[S] || S,
            line: w.yylineno,
            loc: j,
            expected: r
          });
        }
        if (T[0] instanceof Array && T.length > 1)
          throw new Error("Parse Error: multiple actions possible at state: " + I + ", token: " + S);
        switch (T[0]) {
          case 1:
            c.push(S), b.push(w.yytext), d.push(w.yylloc), c.push(T[1]), S = null, P = w.yyleng, E = w.yytext, M = w.yylineno, j = w.yylloc;
            break;
          case 2:
            if (l = this.productions_[T[1]][1], e.$ = b[b.length - l], e._$ = {
              first_line: d[d.length - (l || 1)].first_line,
              last_line: d[d.length - 1].last_line,
              first_column: d[d.length - (l || 1)].first_column,
              last_column: d[d.length - 1].last_column
            }, W && (e._$.range = [
              d[d.length - (l || 1)].range[0],
              d[d.length - 1].range[1]
            ]), $ = this.performAction.apply(e, [
              E,
              P,
              M,
              y.yy,
              T[1],
              b,
              d
            ].concat(C)), typeof $ < "u")
              return $;
            l && (c = c.slice(0, -1 * l * 2), b = b.slice(0, -1 * l), d = d.slice(0, -1 * l)), c.push(this.productions_[T[1]][0]), b.push(e.$), d.push(e._$), h = x[c[c.length - 2]][c[c.length - 1]], c.push(h);
            break;
          case 3:
            return !0;
        }
      }
      return !0;
    }
  }, k = function() {
    var p = {
      EOF: 1,
      parseError: function(o, c) {
        if (this.yy.parser)
          this.yy.parser.parseError(o, c);
        else
          throw new Error(o);
      },
      // resets the lexer, sets new input
      setInput: function(s, o) {
        return this.yy = o || this.yy || {}, this._input = s, this._more = this._backtrack = this.done = !1, this.yylineno = this.yyleng = 0, this.yytext = this.matched = this.match = "", this.conditionStack = ["INITIAL"], this.yylloc = {
          first_line: 1,
          first_column: 0,
          last_line: 1,
          last_column: 0
        }, this.options.ranges && (this.yylloc.range = [0, 0]), this.offset = 0, this;
      },
      // consumes and returns one char from the input
      input: function() {
        var s = this._input[0];
        this.yytext += s, this.yyleng++, this.offset++, this.match += s, this.matched += s;
        var o = s.match(/(?:\r\n?|\n).*/g);
        return o ? (this.yylineno++, this.yylloc.last_line++) : this.yylloc.last_column++, this.options.ranges && this.yylloc.range[1]++, this._input = this._input.slice(1), s;
      },
      // unshifts one char (or a string) into the input
      unput: function(s) {
        var o = s.length, c = s.split(/(?:\r\n?|\n)/g);
        this._input = s + this._input, this.yytext = this.yytext.substr(0, this.yytext.length - o), this.offset -= o;
        var g = this.match.split(/(?:\r\n?|\n)/g);
        this.match = this.match.substr(0, this.match.length - 1), this.matched = this.matched.substr(0, this.matched.length - 1), c.length - 1 && (this.yylineno -= c.length - 1);
        var b = this.yylloc.range;
        return this.yylloc = {
          first_line: this.yylloc.first_line,
          last_line: this.yylineno + 1,
          first_column: this.yylloc.first_column,
          last_column: c ? (c.length === g.length ? this.yylloc.first_column : 0) + g[g.length - c.length].length - c[0].length : this.yylloc.first_column - o
        }, this.options.ranges && (this.yylloc.range = [b[0], b[0] + this.yyleng - o]), this.yyleng = this.yytext.length, this;
      },
      // When called from action, caches matched text and appends it on next action
      more: function() {
        return this._more = !0, this;
      },
      // When called from action, signals the lexer that this rule fails to match the input, so the next matching rule (regex) should be tested instead.
      reject: function() {
        if (this.options.backtrack_lexer)
          this._backtrack = !0;
        else
          return this.parseError("Lexical error on line " + (this.yylineno + 1) + `. You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).
` + this.showPosition(), {
            text: "",
            token: null,
            line: this.yylineno
          });
        return this;
      },
      // retain first n characters of the match
      less: function(s) {
        this.unput(this.match.slice(s));
      },
      // displays already matched input, i.e. for error messages
      pastInput: function() {
        var s = this.matched.substr(0, this.matched.length - this.match.length);
        return (s.length > 20 ? "..." : "") + s.substr(-20).replace(/\n/g, "");
      },
      // displays upcoming input, i.e. for error messages
      upcomingInput: function() {
        var s = this.match;
        return s.length < 20 && (s += this._input.substr(0, 20 - s.length)), (s.substr(0, 20) + (s.length > 20 ? "..." : "")).replace(/\n/g, "");
      },
      // displays the character position where the lexing error occurred, i.e. for error messages
      showPosition: function() {
        var s = this.pastInput(), o = new Array(s.length + 1).join("-");
        return s + this.upcomingInput() + `
` + o + "^";
      },
      // test the lexed token: return FALSE when not a match, otherwise return token
      test_match: function(s, o) {
        var c, g, b;
        if (this.options.backtrack_lexer && (b = {
          yylineno: this.yylineno,
          yylloc: {
            first_line: this.yylloc.first_line,
            last_line: this.last_line,
            first_column: this.yylloc.first_column,
            last_column: this.yylloc.last_column
          },
          yytext: this.yytext,
          match: this.match,
          matches: this.matches,
          matched: this.matched,
          yyleng: this.yyleng,
          offset: this.offset,
          _more: this._more,
          _input: this._input,
          yy: this.yy,
          conditionStack: this.conditionStack.slice(0),
          done: this.done
        }, this.options.ranges && (b.yylloc.range = this.yylloc.range.slice(0))), g = s[0].match(/(?:\r\n?|\n).*/g), g && (this.yylineno += g.length), this.yylloc = {
          first_line: this.yylloc.last_line,
          last_line: this.yylineno + 1,
          first_column: this.yylloc.last_column,
          last_column: g ? g[g.length - 1].length - g[g.length - 1].match(/\r?\n?/)[0].length : this.yylloc.last_column + s[0].length
        }, this.yytext += s[0], this.match += s[0], this.matches = s, this.yyleng = this.yytext.length, this.options.ranges && (this.yylloc.range = [this.offset, this.offset += this.yyleng]), this._more = !1, this._backtrack = !1, this._input = this._input.slice(s[0].length), this.matched += s[0], c = this.performAction.call(this, this.yy, this, o, this.conditionStack[this.conditionStack.length - 1]), this.done && this._input && (this.done = !1), c)
          return c;
        if (this._backtrack) {
          for (var d in b)
            this[d] = b[d];
          return !1;
        }
        return !1;
      },
      // return next match in input
      next: function() {
        if (this.done)
          return this.EOF;
        this._input || (this.done = !0);
        var s, o, c, g;
        this._more || (this.yytext = "", this.match = "");
        for (var b = this._currentRules(), d = 0; d < b.length; d++)
          if (c = this._input.match(this.rules[b[d]]), c && (!o || c[0].length > o[0].length)) {
            if (o = c, g = d, this.options.backtrack_lexer) {
              if (s = this.test_match(c, b[d]), s !== !1)
                return s;
              if (this._backtrack) {
                o = !1;
                continue;
              } else
                return !1;
            } else if (!this.options.flex)
              break;
          }
        return o ? (s = this.test_match(o, b[g]), s !== !1 ? s : !1) : this._input === "" ? this.EOF : this.parseError("Lexical error on line " + (this.yylineno + 1) + `. Unrecognized text.
` + this.showPosition(), {
          text: "",
          token: null,
          line: this.yylineno
        });
      },
      // return next match that has a token
      lex: function() {
        var o = this.next();
        return o || this.lex();
      },
      // activates a new lexer condition state (pushes the new lexer condition state onto the condition stack)
      begin: function(o) {
        this.conditionStack.push(o);
      },
      // pop the previously active lexer condition state off the condition stack
      popState: function() {
        var o = this.conditionStack.length - 1;
        return o > 0 ? this.conditionStack.pop() : this.conditionStack[0];
      },
      // produce the lexer rule set which is active for the currently active lexer condition state
      _currentRules: function() {
        return this.conditionStack.length && this.conditionStack[this.conditionStack.length - 1] ? this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules : this.conditions.INITIAL.rules;
      },
      // return the currently active lexer condition state; when an index argument is provided it produces the N-th previous condition state, if available
      topState: function(o) {
        return o = this.conditionStack.length - 1 - Math.abs(o || 0), o >= 0 ? this.conditionStack[o] : "INITIAL";
      },
      // alias for begin(condition)
      pushState: function(o) {
        this.begin(o);
      },
      // return the number of states currently on the stack
      stateStackSize: function() {
        return this.conditionStack.length;
      },
      options: { easy_keword_rules: !0 },
      performAction: function(o, c, g, b) {
        switch (g) {
          case 0:
            return this.pushState("csv"), 4;
          case 1:
            return 10;
          case 2:
            return 5;
          case 3:
            return 12;
          case 4:
            return this.pushState("escaped_text"), 18;
          case 5:
            return 20;
          case 6:
            return this.popState("escaped_text"), 18;
          case 7:
            return 19;
        }
      },
      rules: [/^(?:sankey-beta\b)/, /^(?:$)/, /^(?:((\u000D\u000A)|(\u000A)))/, /^(?:(\u002C))/, /^(?:(\u0022))/, /^(?:([\u0020-\u0021\u0023-\u002B\u002D-\u007E])*)/, /^(?:(\u0022)(?!(\u0022)))/, /^(?:(([\u0020-\u0021\u0023-\u002B\u002D-\u007E])|(\u002C)|(\u000D)|(\u000A)|(\u0022)(\u0022))*)/],
      conditions: { csv: { rules: [1, 2, 3, 4, 5, 6, 7], inclusive: !1 }, escaped_text: { rules: [6, 7], inclusive: !1 }, INITIAL: { rules: [0, 1, 2, 3, 4, 5, 6, 7], inclusive: !0 } }
    };
    return p;
  }();
  u.lexer = k;
  function _() {
    this.yy = {};
  }
  return _.prototype = u, u.Parser = _, new _();
}();
tt.parser = tt;
const H = tt;
let q = [], Q = [], D = {};
const Mt = () => {
  q = [], Q = [], D = {}, bt();
};
class Nt {
  constructor(n, i, a = 0) {
    this.source = n, this.target = i, this.value = a;
  }
}
const Pt = (t, n, i) => {
  q.push(new Nt(t, n, i));
};
class Ct {
  constructor(n) {
    this.ID = n;
  }
}
const It = (t) => (t = wt.sanitizeText(t, ot()), D[t] || (D[t] = new Ct(t), Q.push(D[t])), D[t]), Ot = () => Q, zt = () => q, jt = () => ({
  nodes: Q.map((t) => ({ id: t.ID })),
  links: q.map((t) => ({
    source: t.source.ID,
    target: t.target.ID,
    value: t.value
  }))
}), Dt = {
  nodesMap: D,
  getConfig: () => ot().sankey,
  getNodes: Ot,
  getLinks: zt,
  getGraph: jt,
  addLink: Pt,
  findOrCreateNode: It,
  getAccTitle: pt,
  setAccTitle: mt,
  getAccDescription: _t,
  setAccDescription: kt,
  getDiagramTitle: xt,
  setDiagramTitle: vt,
  clear: Mt
};
function at(t, n) {
  let i;
  if (n === void 0)
    for (const a of t)
      a != null && (i < a || i === void 0 && a >= a) && (i = a);
  else {
    let a = -1;
    for (let u of t)
      (u = n(u, ++a, t)) != null && (i < u || i === void 0 && u >= u) && (i = u);
  }
  return i;
}
function yt(t, n) {
  let i;
  if (n === void 0)
    for (const a of t)
      a != null && (i > a || i === void 0 && a >= a) && (i = a);
  else {
    let a = -1;
    for (let u of t)
      (u = n(u, ++a, t)) != null && (i > u || i === void 0 && u >= u) && (i = u);
  }
  return i;
}
function Z(t, n) {
  let i = 0;
  if (n === void 0)
    for (let a of t)
      (a = +a) && (i += a);
  else {
    let a = -1;
    for (let u of t)
      (u = +n(u, ++a, t)) && (i += u);
  }
  return i;
}
function $t(t) {
  return t.target.depth;
}
function Bt(t) {
  return t.depth;
}
function Rt(t, n) {
  return n - 1 - t.height;
}
function dt(t, n) {
  return t.sourceLinks.length ? t.depth : n - 1;
}
function Ft(t) {
  return t.targetLinks.length ? t.depth : t.sourceLinks.length ? yt(t.sourceLinks, $t) - 1 : 0;
}
function G(t) {
  return function() {
    return t;
  };
}
function lt(t, n) {
  return X(t.source, n.source) || t.index - n.index;
}
function ct(t, n) {
  return X(t.target, n.target) || t.index - n.index;
}
function X(t, n) {
  return t.y0 - n.y0;
}
function J(t) {
  return t.value;
}
function Ut(t) {
  return t.index;
}
function Wt(t) {
  return t.nodes;
}
function Vt(t) {
  return t.links;
}
function ut(t, n) {
  const i = t.get(n);
  if (!i)
    throw new Error("missing: " + n);
  return i;
}
function ht({ nodes: t }) {
  for (const n of t) {
    let i = n.y0, a = i;
    for (const u of n.sourceLinks)
      u.y0 = i + u.width / 2, i += u.width;
    for (const u of n.targetLinks)
      u.y1 = a + u.width / 2, a += u.width;
  }
}
function Yt() {
  let t = 0, n = 0, i = 1, a = 1, u = 24, k = 8, _, p = Ut, s = dt, o, c, g = Wt, b = Vt, d = 6;
  function x() {
    const e = { nodes: g.apply(null, arguments), links: b.apply(null, arguments) };
    return E(e), M(e), P(e), A(e), w(e), ht(e), e;
  }
  x.update = function(e) {
    return ht(e), e;
  }, x.nodeId = function(e) {
    return arguments.length ? (p = typeof e == "function" ? e : G(e), x) : p;
  }, x.nodeAlign = function(e) {
    return arguments.length ? (s = typeof e == "function" ? e : G(e), x) : s;
  }, x.nodeSort = function(e) {
    return arguments.length ? (o = e, x) : o;
  }, x.nodeWidth = function(e) {
    return arguments.length ? (u = +e, x) : u;
  }, x.nodePadding = function(e) {
    return arguments.length ? (k = _ = +e, x) : k;
  }, x.nodes = function(e) {
    return arguments.length ? (g = typeof e == "function" ? e : G(e), x) : g;
  }, x.links = function(e) {
    return arguments.length ? (b = typeof e == "function" ? e : G(e), x) : b;
  }, x.linkSort = function(e) {
    return arguments.length ? (c = e, x) : c;
  }, x.size = function(e) {
    return arguments.length ? (t = n = 0, i = +e[0], a = +e[1], x) : [i - t, a - n];
  }, x.extent = function(e) {
    return arguments.length ? (t = +e[0][0], i = +e[1][0], n = +e[0][1], a = +e[1][1], x) : [[t, n], [i, a]];
  }, x.iterations = function(e) {
    return arguments.length ? (d = +e, x) : d;
  };
  function E({ nodes: e, links: f }) {
    for (const [h, r] of e.entries())
      r.index = h, r.sourceLinks = [], r.targetLinks = [];
    const l = new Map(e.map((h, r) => [p(h, r, e), h]));
    for (const [h, r] of f.entries()) {
      r.index = h;
      let { source: m, target: v } = r;
      typeof m != "object" && (m = r.source = ut(l, m)), typeof v != "object" && (v = r.target = ut(l, v)), m.sourceLinks.push(r), v.targetLinks.push(r);
    }
    if (c != null)
      for (const { sourceLinks: h, targetLinks: r } of e)
        h.sort(c), r.sort(c);
  }
  function M({ nodes: e }) {
    for (const f of e)
      f.value = f.fixedValue === void 0 ? Math.max(Z(f.sourceLinks, J), Z(f.targetLinks, J)) : f.fixedValue;
  }
  function P({ nodes: e }) {
    const f = e.length;
    let l = new Set(e), h = /* @__PURE__ */ new Set(), r = 0;
    for (; l.size; ) {
      for (const m of l) {
        m.depth = r;
        for (const { target: v } of m.sourceLinks)
          h.add(v);
      }
      if (++r > f)
        throw new Error("circular link");
      l = h, h = /* @__PURE__ */ new Set();
    }
  }
  function A({ nodes: e }) {
    const f = e.length;
    let l = new Set(e), h = /* @__PURE__ */ new Set(), r = 0;
    for (; l.size; ) {
      for (const m of l) {
        m.height = r;
        for (const { source: v } of m.targetLinks)
          h.add(v);
      }
      if (++r > f)
        throw new Error("circular link");
      l = h, h = /* @__PURE__ */ new Set();
    }
  }
  function N({ nodes: e }) {
    const f = at(e, (r) => r.depth) + 1, l = (i - t - u) / (f - 1), h = new Array(f);
    for (const r of e) {
      const m = Math.max(0, Math.min(f - 1, Math.floor(s.call(null, r, f))));
      r.layer = m, r.x0 = t + m * l, r.x1 = r.x0 + u, h[m] ? h[m].push(r) : h[m] = [r];
    }
    if (o)
      for (const r of h)
        r.sort(o);
    return h;
  }
  function C(e) {
    const f = yt(e, (l) => (a - n - (l.length - 1) * _) / Z(l, J));
    for (const l of e) {
      let h = n;
      for (const r of l) {
        r.y0 = h, r.y1 = h + r.value * f, h = r.y1 + _;
        for (const m of r.sourceLinks)
          m.width = m.value * f;
      }
      h = (a - h + _) / (l.length + 1);
      for (let r = 0; r < l.length; ++r) {
        const m = l[r];
        m.y0 += h * (r + 1), m.y1 += h * (r + 1);
      }
      I(l);
    }
  }
  function w(e) {
    const f = N(e);
    _ = Math.min(k, (a - n) / (at(f, (l) => l.length) - 1)), C(f);
    for (let l = 0; l < d; ++l) {
      const h = Math.pow(0.99, l), r = Math.max(1 - h, (l + 1) / d);
      L(f, h, r), y(f, h, r);
    }
  }
  function y(e, f, l) {
    for (let h = 1, r = e.length; h < r; ++h) {
      const m = e[h];
      for (const v of m) {
        let B = 0, O = 0;
        for (const { source: F, value: K } of v.targetLinks) {
          let U = K * (v.layer - F.layer);
          B += T(F, v) * U, O += U;
        }
        if (!(O > 0))
          continue;
        let R = (B / O - v.y0) * f;
        v.y0 += R, v.y1 += R, S(v);
      }
      o === void 0 && m.sort(X), j(m, l);
    }
  }
  function L(e, f, l) {
    for (let h = e.length, r = h - 2; r >= 0; --r) {
      const m = e[r];
      for (const v of m) {
        let B = 0, O = 0;
        for (const { target: F, value: K } of v.sourceLinks) {
          let U = K * (F.layer - v.layer);
          B += $(v, F) * U, O += U;
        }
        if (!(O > 0))
          continue;
        let R = (B / O - v.y0) * f;
        v.y0 += R, v.y1 += R, S(v);
      }
      o === void 0 && m.sort(X), j(m, l);
    }
  }
  function j(e, f) {
    const l = e.length >> 1, h = e[l];
    V(e, h.y0 - _, l - 1, f), W(e, h.y1 + _, l + 1, f), V(e, a, e.length - 1, f), W(e, n, 0, f);
  }
  function W(e, f, l, h) {
    for (; l < e.length; ++l) {
      const r = e[l], m = (f - r.y0) * h;
      m > 1e-6 && (r.y0 += m, r.y1 += m), f = r.y1 + _;
    }
  }
  function V(e, f, l, h) {
    for (; l >= 0; --l) {
      const r = e[l], m = (r.y1 - f) * h;
      m > 1e-6 && (r.y0 -= m, r.y1 -= m), f = r.y0 - _;
    }
  }
  function S({ sourceLinks: e, targetLinks: f }) {
    if (c === void 0) {
      for (const { source: { sourceLinks: l } } of f)
        l.sort(ct);
      for (const { target: { targetLinks: l } } of e)
        l.sort(lt);
    }
  }
  function I(e) {
    if (c === void 0)
      for (const { sourceLinks: f, targetLinks: l } of e)
        f.sort(ct), l.sort(lt);
  }
  function T(e, f) {
    let l = e.y0 - (e.sourceLinks.length - 1) * _ / 2;
    for (const { target: h, width: r } of e.sourceLinks) {
      if (h === f)
        break;
      l += r + _;
    }
    for (const { source: h, width: r } of f.targetLinks) {
      if (h === e)
        break;
      l -= r;
    }
    return l;
  }
  function $(e, f) {
    let l = f.y0 - (f.targetLinks.length - 1) * _ / 2;
    for (const { source: h, width: r } of f.targetLinks) {
      if (h === e)
        break;
      l += r + _;
    }
    for (const { target: h, width: r } of e.sourceLinks) {
      if (h === f)
        break;
      l -= r;
    }
    return l;
  }
  return x;
}
var et = Math.PI, nt = 2 * et, z = 1e-6, Gt = nt - z;
function it() {
  this._x0 = this._y0 = // start of current subpath
  this._x1 = this._y1 = null, this._ = "";
}
function gt() {
  return new it();
}
it.prototype = gt.prototype = {
  constructor: it,
  moveTo: function(t, n) {
    this._ += "M" + (this._x0 = this._x1 = +t) + "," + (this._y0 = this._y1 = +n);
  },
  closePath: function() {
    this._x1 !== null && (this._x1 = this._x0, this._y1 = this._y0, this._ += "Z");
  },
  lineTo: function(t, n) {
    this._ += "L" + (this._x1 = +t) + "," + (this._y1 = +n);
  },
  quadraticCurveTo: function(t, n, i, a) {
    this._ += "Q" + +t + "," + +n + "," + (this._x1 = +i) + "," + (this._y1 = +a);
  },
  bezierCurveTo: function(t, n, i, a, u, k) {
    this._ += "C" + +t + "," + +n + "," + +i + "," + +a + "," + (this._x1 = +u) + "," + (this._y1 = +k);
  },
  arcTo: function(t, n, i, a, u) {
    t = +t, n = +n, i = +i, a = +a, u = +u;
    var k = this._x1, _ = this._y1, p = i - t, s = a - n, o = k - t, c = _ - n, g = o * o + c * c;
    if (u < 0)
      throw new Error("negative radius: " + u);
    if (this._x1 === null)
      this._ += "M" + (this._x1 = t) + "," + (this._y1 = n);
    else if (g > z)
      if (!(Math.abs(c * p - s * o) > z) || !u)
        this._ += "L" + (this._x1 = t) + "," + (this._y1 = n);
      else {
        var b = i - k, d = a - _, x = p * p + s * s, E = b * b + d * d, M = Math.sqrt(x), P = Math.sqrt(g), A = u * Math.tan((et - Math.acos((x + g - E) / (2 * M * P))) / 2), N = A / P, C = A / M;
        Math.abs(N - 1) > z && (this._ += "L" + (t + N * o) + "," + (n + N * c)), this._ += "A" + u + "," + u + ",0,0," + +(c * b > o * d) + "," + (this._x1 = t + C * p) + "," + (this._y1 = n + C * s);
      }
  },
  arc: function(t, n, i, a, u, k) {
    t = +t, n = +n, i = +i, k = !!k;
    var _ = i * Math.cos(a), p = i * Math.sin(a), s = t + _, o = n + p, c = 1 ^ k, g = k ? a - u : u - a;
    if (i < 0)
      throw new Error("negative radius: " + i);
    this._x1 === null ? this._ += "M" + s + "," + o : (Math.abs(this._x1 - s) > z || Math.abs(this._y1 - o) > z) && (this._ += "L" + s + "," + o), i && (g < 0 && (g = g % nt + nt), g > Gt ? this._ += "A" + i + "," + i + ",0,1," + c + "," + (t - _) + "," + (n - p) + "A" + i + "," + i + ",0,1," + c + "," + (this._x1 = s) + "," + (this._y1 = o) : g > z && (this._ += "A" + i + "," + i + ",0," + +(g >= et) + "," + c + "," + (this._x1 = t + i * Math.cos(u)) + "," + (this._y1 = n + i * Math.sin(u))));
  },
  rect: function(t, n, i, a) {
    this._ += "M" + (this._x0 = this._x1 = +t) + "," + (this._y0 = this._y1 = +n) + "h" + +i + "v" + +a + "h" + -i + "Z";
  },
  toString: function() {
    return this._;
  }
};
function ft(t) {
  return function() {
    return t;
  };
}
function Ht(t) {
  return t[0];
}
function Xt(t) {
  return t[1];
}
var qt = Array.prototype.slice;
function Qt(t) {
  return t.source;
}
function Kt(t) {
  return t.target;
}
function Zt(t) {
  var n = Qt, i = Kt, a = Ht, u = Xt, k = null;
  function _() {
    var p, s = qt.call(arguments), o = n.apply(this, s), c = i.apply(this, s);
    if (k || (k = p = gt()), t(k, +a.apply(this, (s[0] = o, s)), +u.apply(this, s), +a.apply(this, (s[0] = c, s)), +u.apply(this, s)), p)
      return k = null, p + "" || null;
  }
  return _.source = function(p) {
    return arguments.length ? (n = p, _) : n;
  }, _.target = function(p) {
    return arguments.length ? (i = p, _) : i;
  }, _.x = function(p) {
    return arguments.length ? (a = typeof p == "function" ? p : ft(+p), _) : a;
  }, _.y = function(p) {
    return arguments.length ? (u = typeof p == "function" ? p : ft(+p), _) : u;
  }, _.context = function(p) {
    return arguments.length ? (k = p ?? null, _) : k;
  }, _;
}
function Jt(t, n, i, a, u) {
  t.moveTo(n, i), t.bezierCurveTo(n = (n + a) / 2, i, n, u, a, u);
}
function te() {
  return Zt(Jt);
}
function ee(t) {
  return [t.source.x1, t.y0];
}
function ne(t) {
  return [t.target.x0, t.y1];
}
function ie() {
  return te().source(ee).target(ne);
}
const st = class {
  static next(t) {
    return new st(t + ++st.count);
  }
  constructor(t) {
    this.id = t, this.href = `#${t}`;
  }
  toString() {
    return "url(" + this.href + ")";
  }
};
let rt = st;
rt.count = 0;
const se = {
  left: Bt,
  right: Rt,
  center: Ft,
  justify: dt
}, re = function(t, n, i, a) {
  const { securityLevel: u, sankey: k } = ot(), _ = St.sankey;
  let p;
  u === "sandbox" && (p = Y("#i" + n));
  const s = u === "sandbox" ? Y(p.nodes()[0].contentDocument.body) : Y("body"), o = u === "sandbox" ? s.select(`[id="${n}"]`) : Y(`[id="${n}"]`), c = (k == null ? void 0 : k.width) || _.width, g = (k == null ? void 0 : k.height) || _.width, b = (k == null ? void 0 : k.useMaxWidth) || _.useMaxWidth, d = (k == null ? void 0 : k.nodeAlignment) || _.nodeAlignment;
  Lt(o, g, c, b);
  const x = a.db.getGraph(), E = se[d], M = 10;
  Yt().nodeId((y) => y.id).nodeWidth(M).nodePadding(10).nodeAlign(E).extent([
    [0, 0],
    [c, g]
  ])(x);
  const A = Et(Tt);
  o.append("g").attr("class", "nodes").selectAll(".node").data(x.nodes).join("g").attr("class", "node").attr("id", (y) => (y.uid = rt.next("node-")).id).attr("transform", function(y) {
    return "translate(" + y.x0 + "," + y.y0 + ")";
  }).attr("x", (y) => y.x0).attr("y", (y) => y.y0).append("rect").attr("height", (y) => y.y1 - y.y0).attr("width", (y) => y.x1 - y.x0).attr("fill", (y) => A(y.id)), o.append("g").attr("class", "node-labels").attr("font-family", "sans-serif").attr("font-size", 14).selectAll("text").data(x.nodes).join("text").attr("x", (y) => y.x0 < c / 2 ? y.x1 + 6 : y.x0 - 6).attr("y", (y) => (y.y1 + y.y0) / 2).attr("dy", "0.35em").attr("text-anchor", (y) => y.x0 < c / 2 ? "start" : "end").text((y) => y.id);
  const N = o.append("g").attr("class", "links").attr("fill", "none").attr("stroke-opacity", 0.5).selectAll(".link").data(x.links).join("g").attr("class", "link").style("mix-blend-mode", "multiply"), C = (k == null ? void 0 : k.linkColor) || "gradient";
  if (C === "gradient") {
    const y = N.append("linearGradient").attr("id", (L) => (L.uid = rt.next("linearGradient-")).id).attr("gradientUnits", "userSpaceOnUse").attr("x1", (L) => L.source.x1).attr("x2", (L) => L.target.x0);
    y.append("stop").attr("offset", "0%").attr("stop-color", (L) => A(L.source.id)), y.append("stop").attr("offset", "100%").attr("stop-color", (L) => A(L.target.id));
  }
  let w;
  switch (C) {
    case "gradient":
      w = (y) => y.uid;
      break;
    case "source":
      w = (y) => A(y.source.id);
      break;
    case "target":
      w = (y) => A(y.target.id);
      break;
    default:
      w = C;
  }
  N.append("path").attr("d", ie()).attr("stroke", w).attr("stroke-width", (y) => Math.max(1, y.width));
}, oe = {
  draw: re
}, ae = (t) => t.replaceAll(/^[^\S\n\r]+|[^\S\n\r]+$/g, "").replaceAll(/([\n\r])+/g, `
`).trim(), le = H.parse.bind(H);
H.parse = (t) => le(ae(t));
const fe = {
  parser: H,
  db: Dt,
  renderer: oe
};
export {
  fe as diagram
};
