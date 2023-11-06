import { c as rt, g as mt, s as kt, a as _t, b as xt, D as vt, B as bt, E as wt, f as St, aQ as Lt, j as Y, k as Et } from "./mermaid-d06ecb0d.js";
import { o as At } from "./ordinal-5695958c.js";
import "./init-f9637058.js";
function Tt(t) {
  for (var n = t.length / 6 | 0, i = new Array(n), a = 0; a < n; )
    i[a] = "#" + t.slice(a * 6, ++a * 6);
  return i;
}
const Mt = Tt("4e79a7f28e2ce1575976b7b259a14fedc949af7aa1ff9da79c755fbab0ab");
var tt = function() {
  var t = function(k, s, o, c) {
    for (o = o || {}, c = k.length; c--; o[k[c]] = s)
      ;
    return o;
  }, n = [1, 9], i = [1, 10], a = [1, 5, 10, 12], u = {
    trace: function() {
    },
    yy: {},
    symbols_: { error: 2, start: 3, SANKEY: 4, NEWLINE: 5, csv: 6, opt_eof: 7, record: 8, csv_tail: 9, EOF: 10, "field[source]": 11, COMMA: 12, "field[target]": 13, "field[value]": 14, field: 15, escaped: 16, non_escaped: 17, DQUOTE: 18, ESCAPED_TEXT: 19, NON_ESCAPED_TEXT: 20, $accept: 0, $end: 1 },
    terminals_: { 2: "error", 4: "SANKEY", 5: "NEWLINE", 10: "EOF", 11: "field[source]", 12: "COMMA", 13: "field[target]", 14: "field[value]", 18: "DQUOTE", 19: "ESCAPED_TEXT", 20: "NON_ESCAPED_TEXT" },
    productions_: [0, [3, 4], [6, 2], [9, 2], [9, 0], [7, 1], [7, 0], [8, 5], [15, 1], [15, 1], [16, 3], [17, 1]],
    performAction: function(s, o, c, m, b, d, x) {
      var E = d.length - 1;
      switch (b) {
        case 7:
          const L = m.findOrCreateNode(d[E - 4].trim().replaceAll('""', '"')), A = m.findOrCreateNode(d[E - 2].trim().replaceAll('""', '"')), N = parseFloat(d[E].trim());
          m.addLink(L, A, N);
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
      var o = this, c = [0], m = [], b = [null], d = [], x = this.table, E = "", L = 0, A = 0, N = 2, P = 1, z = d.slice.call(arguments, 1), S = Object.create(this.lexer), M = { yy: {} };
      for (var $ in this.yy)
        Object.prototype.hasOwnProperty.call(this.yy, $) && (M.yy[$] = this.yy[$]);
      S.setInput(s, M.yy), M.yy.lexer = S, M.yy.parser = this, typeof S.yylloc > "u" && (S.yylloc = {});
      var C = S.yylloc;
      d.push(C);
      var I = S.options && S.options.ranges;
      typeof M.yy.parseError == "function" ? this.parseError = M.yy.parseError : this.parseError = Object.getPrototypeOf(this).parseError;
      function g() {
        var v;
        return v = m.pop() || S.lex() || P, typeof v != "number" && (v instanceof Array && (m = v, v = m.pop()), v = o.symbols_[v] || v), v;
      }
      for (var w, O, T, R, e = {}, f, l, h, r; ; ) {
        if (O = c[c.length - 1], this.defaultActions[O] ? T = this.defaultActions[O] : ((w === null || typeof w > "u") && (w = g()), T = x[O] && x[O][w]), typeof T > "u" || !T.length || !T[0]) {
          var _ = "";
          r = [];
          for (f in x[O])
            this.terminals_[f] && f > N && r.push("'" + this.terminals_[f] + "'");
          S.showPosition ? _ = "Parse error on line " + (L + 1) + `:
` + S.showPosition() + `
Expecting ` + r.join(", ") + ", got '" + (this.terminals_[w] || w) + "'" : _ = "Parse error on line " + (L + 1) + ": Unexpected " + (w == P ? "end of input" : "'" + (this.terminals_[w] || w) + "'"), this.parseError(_, {
            text: S.match,
            token: this.terminals_[w] || w,
            line: S.yylineno,
            loc: C,
            expected: r
          });
        }
        if (T[0] instanceof Array && T.length > 1)
          throw new Error("Parse Error: multiple actions possible at state: " + O + ", token: " + w);
        switch (T[0]) {
          case 1:
            c.push(w), b.push(S.yytext), d.push(S.yylloc), c.push(T[1]), w = null, A = S.yyleng, E = S.yytext, L = S.yylineno, C = S.yylloc;
            break;
          case 2:
            if (l = this.productions_[T[1]][1], e.$ = b[b.length - l], e._$ = {
              first_line: d[d.length - (l || 1)].first_line,
              last_line: d[d.length - 1].last_line,
              first_column: d[d.length - (l || 1)].first_column,
              last_column: d[d.length - 1].last_column
            }, I && (e._$.range = [
              d[d.length - (l || 1)].range[0],
              d[d.length - 1].range[1]
            ]), R = this.performAction.apply(e, [
              E,
              A,
              L,
              M.yy,
              T[1],
              b,
              d
            ].concat(z)), typeof R < "u")
              return R;
            l && (c = c.slice(0, -1 * l * 2), b = b.slice(0, -1 * l), d = d.slice(0, -1 * l)), c.push(this.productions_[T[1]][0]), b.push(e.$), d.push(e._$), h = x[c[c.length - 2]][c[c.length - 1]], c.push(h);
            break;
          case 3:
            return !0;
        }
      }
      return !0;
    }
  }, y = function() {
    var k = {
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
        var m = this.match.split(/(?:\r\n?|\n)/g);
        this.match = this.match.substr(0, this.match.length - 1), this.matched = this.matched.substr(0, this.matched.length - 1), c.length - 1 && (this.yylineno -= c.length - 1);
        var b = this.yylloc.range;
        return this.yylloc = {
          first_line: this.yylloc.first_line,
          last_line: this.yylineno + 1,
          first_column: this.yylloc.first_column,
          last_column: c ? (c.length === m.length ? this.yylloc.first_column : 0) + m[m.length - c.length].length - c[0].length : this.yylloc.first_column - o
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
        var c, m, b;
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
        }, this.options.ranges && (b.yylloc.range = this.yylloc.range.slice(0))), m = s[0].match(/(?:\r\n?|\n).*/g), m && (this.yylineno += m.length), this.yylloc = {
          first_line: this.yylloc.last_line,
          last_line: this.yylineno + 1,
          first_column: this.yylloc.last_column,
          last_column: m ? m[m.length - 1].length - m[m.length - 1].match(/\r?\n?/)[0].length : this.yylloc.last_column + s[0].length
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
        var s, o, c, m;
        this._more || (this.yytext = "", this.match = "");
        for (var b = this._currentRules(), d = 0; d < b.length; d++)
          if (c = this._input.match(this.rules[b[d]]), c && (!o || c[0].length > o[0].length)) {
            if (o = c, m = d, this.options.backtrack_lexer) {
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
        return o ? (s = this.test_match(o, b[m]), s !== !1 ? s : !1) : this._input === "" ? this.EOF : this.parseError("Lexical error on line " + (this.yylineno + 1) + `. Unrecognized text.
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
      performAction: function(o, c, m, b) {
        switch (m) {
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
    return k;
  }();
  u.lexer = y;
  function p() {
    this.yy = {};
  }
  return p.prototype = u, u.Parser = p, new p();
}();
tt.parser = tt;
const H = tt;
let X = [], q = [], B = {};
const Nt = () => {
  X = [], q = [], B = {}, wt();
};
class Pt {
  constructor(n, i, a = 0) {
    this.source = n, this.target = i, this.value = a;
  }
}
const Ct = (t, n, i) => {
  X.push(new Pt(t, n, i));
};
class It {
  constructor(n) {
    this.ID = n;
  }
}
const Ot = (t) => (t = St.sanitizeText(t, rt()), B[t] || (B[t] = new It(t), q.push(B[t])), B[t]), $t = () => q, zt = () => X, jt = () => ({
  nodes: q.map((t) => ({ id: t.ID })),
  links: X.map((t) => ({
    source: t.source.ID,
    target: t.target.ID,
    value: t.value
  }))
}), Dt = {
  nodesMap: B,
  getConfig: () => rt().sankey,
  getNodes: $t,
  getLinks: zt,
  getGraph: jt,
  addLink: Ct,
  findOrCreateNode: Ot,
  getAccTitle: mt,
  setAccTitle: kt,
  getAccDescription: _t,
  setAccDescription: xt,
  getDiagramTitle: vt,
  setDiagramTitle: bt,
  clear: Nt
};
function ot(t, n) {
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
function Bt(t) {
  return t.target.depth;
}
function Rt(t) {
  return t.depth;
}
function Ut(t, n) {
  return n - 1 - t.height;
}
function dt(t, n) {
  return t.sourceLinks.length ? t.depth : n - 1;
}
function Vt(t) {
  return t.targetLinks.length ? t.depth : t.sourceLinks.length ? yt(t.sourceLinks, Bt) - 1 : 0;
}
function G(t) {
  return function() {
    return t;
  };
}
function at(t, n) {
  return Q(t.source, n.source) || t.index - n.index;
}
function lt(t, n) {
  return Q(t.target, n.target) || t.index - n.index;
}
function Q(t, n) {
  return t.y0 - n.y0;
}
function J(t) {
  return t.value;
}
function Ft(t) {
  return t.index;
}
function Wt(t) {
  return t.nodes;
}
function Yt(t) {
  return t.links;
}
function ct(t, n) {
  const i = t.get(n);
  if (!i)
    throw new Error("missing: " + n);
  return i;
}
function ut({ nodes: t }) {
  for (const n of t) {
    let i = n.y0, a = i;
    for (const u of n.sourceLinks)
      u.y0 = i + u.width / 2, i += u.width;
    for (const u of n.targetLinks)
      u.y1 = a + u.width / 2, a += u.width;
  }
}
function Gt() {
  let t = 0, n = 0, i = 1, a = 1, u = 24, y = 8, p, k = Ft, s = dt, o, c, m = Wt, b = Yt, d = 6;
  function x() {
    const e = { nodes: m.apply(null, arguments), links: b.apply(null, arguments) };
    return E(e), L(e), A(e), N(e), S(e), ut(e), e;
  }
  x.update = function(e) {
    return ut(e), e;
  }, x.nodeId = function(e) {
    return arguments.length ? (k = typeof e == "function" ? e : G(e), x) : k;
  }, x.nodeAlign = function(e) {
    return arguments.length ? (s = typeof e == "function" ? e : G(e), x) : s;
  }, x.nodeSort = function(e) {
    return arguments.length ? (o = e, x) : o;
  }, x.nodeWidth = function(e) {
    return arguments.length ? (u = +e, x) : u;
  }, x.nodePadding = function(e) {
    return arguments.length ? (y = p = +e, x) : y;
  }, x.nodes = function(e) {
    return arguments.length ? (m = typeof e == "function" ? e : G(e), x) : m;
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
    const l = new Map(e.map((h, r) => [k(h, r, e), h]));
    for (const [h, r] of f.entries()) {
      r.index = h;
      let { source: _, target: v } = r;
      typeof _ != "object" && (_ = r.source = ct(l, _)), typeof v != "object" && (v = r.target = ct(l, v)), _.sourceLinks.push(r), v.targetLinks.push(r);
    }
    if (c != null)
      for (const { sourceLinks: h, targetLinks: r } of e)
        h.sort(c), r.sort(c);
  }
  function L({ nodes: e }) {
    for (const f of e)
      f.value = f.fixedValue === void 0 ? Math.max(Z(f.sourceLinks, J), Z(f.targetLinks, J)) : f.fixedValue;
  }
  function A({ nodes: e }) {
    const f = e.length;
    let l = new Set(e), h = /* @__PURE__ */ new Set(), r = 0;
    for (; l.size; ) {
      for (const _ of l) {
        _.depth = r;
        for (const { target: v } of _.sourceLinks)
          h.add(v);
      }
      if (++r > f)
        throw new Error("circular link");
      l = h, h = /* @__PURE__ */ new Set();
    }
  }
  function N({ nodes: e }) {
    const f = e.length;
    let l = new Set(e), h = /* @__PURE__ */ new Set(), r = 0;
    for (; l.size; ) {
      for (const _ of l) {
        _.height = r;
        for (const { source: v } of _.targetLinks)
          h.add(v);
      }
      if (++r > f)
        throw new Error("circular link");
      l = h, h = /* @__PURE__ */ new Set();
    }
  }
  function P({ nodes: e }) {
    const f = ot(e, (r) => r.depth) + 1, l = (i - t - u) / (f - 1), h = new Array(f);
    for (const r of e) {
      const _ = Math.max(0, Math.min(f - 1, Math.floor(s.call(null, r, f))));
      r.layer = _, r.x0 = t + _ * l, r.x1 = r.x0 + u, h[_] ? h[_].push(r) : h[_] = [r];
    }
    if (o)
      for (const r of h)
        r.sort(o);
    return h;
  }
  function z(e) {
    const f = yt(e, (l) => (a - n - (l.length - 1) * p) / Z(l, J));
    for (const l of e) {
      let h = n;
      for (const r of l) {
        r.y0 = h, r.y1 = h + r.value * f, h = r.y1 + p;
        for (const _ of r.sourceLinks)
          _.width = _.value * f;
      }
      h = (a - h + p) / (l.length + 1);
      for (let r = 0; r < l.length; ++r) {
        const _ = l[r];
        _.y0 += h * (r + 1), _.y1 += h * (r + 1);
      }
      O(l);
    }
  }
  function S(e) {
    const f = P(e);
    p = Math.min(y, (a - n) / (ot(f, (l) => l.length) - 1)), z(f);
    for (let l = 0; l < d; ++l) {
      const h = Math.pow(0.99, l), r = Math.max(1 - h, (l + 1) / d);
      $(f, h, r), M(f, h, r);
    }
  }
  function M(e, f, l) {
    for (let h = 1, r = e.length; h < r; ++h) {
      const _ = e[h];
      for (const v of _) {
        let U = 0, j = 0;
        for (const { source: F, value: K } of v.targetLinks) {
          let W = K * (v.layer - F.layer);
          U += T(F, v) * W, j += W;
        }
        if (!(j > 0))
          continue;
        let V = (U / j - v.y0) * f;
        v.y0 += V, v.y1 += V, w(v);
      }
      o === void 0 && _.sort(Q), C(_, l);
    }
  }
  function $(e, f, l) {
    for (let h = e.length, r = h - 2; r >= 0; --r) {
      const _ = e[r];
      for (const v of _) {
        let U = 0, j = 0;
        for (const { target: F, value: K } of v.sourceLinks) {
          let W = K * (F.layer - v.layer);
          U += R(v, F) * W, j += W;
        }
        if (!(j > 0))
          continue;
        let V = (U / j - v.y0) * f;
        v.y0 += V, v.y1 += V, w(v);
      }
      o === void 0 && _.sort(Q), C(_, l);
    }
  }
  function C(e, f) {
    const l = e.length >> 1, h = e[l];
    g(e, h.y0 - p, l - 1, f), I(e, h.y1 + p, l + 1, f), g(e, a, e.length - 1, f), I(e, n, 0, f);
  }
  function I(e, f, l, h) {
    for (; l < e.length; ++l) {
      const r = e[l], _ = (f - r.y0) * h;
      _ > 1e-6 && (r.y0 += _, r.y1 += _), f = r.y1 + p;
    }
  }
  function g(e, f, l, h) {
    for (; l >= 0; --l) {
      const r = e[l], _ = (r.y1 - f) * h;
      _ > 1e-6 && (r.y0 -= _, r.y1 -= _), f = r.y0 - p;
    }
  }
  function w({ sourceLinks: e, targetLinks: f }) {
    if (c === void 0) {
      for (const { source: { sourceLinks: l } } of f)
        l.sort(lt);
      for (const { target: { targetLinks: l } } of e)
        l.sort(at);
    }
  }
  function O(e) {
    if (c === void 0)
      for (const { sourceLinks: f, targetLinks: l } of e)
        f.sort(lt), l.sort(at);
  }
  function T(e, f) {
    let l = e.y0 - (e.sourceLinks.length - 1) * p / 2;
    for (const { target: h, width: r } of e.sourceLinks) {
      if (h === f)
        break;
      l += r + p;
    }
    for (const { source: h, width: r } of f.targetLinks) {
      if (h === e)
        break;
      l -= r;
    }
    return l;
  }
  function R(e, f) {
    let l = f.y0 - (f.targetLinks.length - 1) * p / 2;
    for (const { source: h, width: r } of f.targetLinks) {
      if (h === e)
        break;
      l += r + p;
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
var et = Math.PI, nt = 2 * et, D = 1e-6, Ht = nt - D;
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
  bezierCurveTo: function(t, n, i, a, u, y) {
    this._ += "C" + +t + "," + +n + "," + +i + "," + +a + "," + (this._x1 = +u) + "," + (this._y1 = +y);
  },
  arcTo: function(t, n, i, a, u) {
    t = +t, n = +n, i = +i, a = +a, u = +u;
    var y = this._x1, p = this._y1, k = i - t, s = a - n, o = y - t, c = p - n, m = o * o + c * c;
    if (u < 0)
      throw new Error("negative radius: " + u);
    if (this._x1 === null)
      this._ += "M" + (this._x1 = t) + "," + (this._y1 = n);
    else if (m > D)
      if (!(Math.abs(c * k - s * o) > D) || !u)
        this._ += "L" + (this._x1 = t) + "," + (this._y1 = n);
      else {
        var b = i - y, d = a - p, x = k * k + s * s, E = b * b + d * d, L = Math.sqrt(x), A = Math.sqrt(m), N = u * Math.tan((et - Math.acos((x + m - E) / (2 * L * A))) / 2), P = N / A, z = N / L;
        Math.abs(P - 1) > D && (this._ += "L" + (t + P * o) + "," + (n + P * c)), this._ += "A" + u + "," + u + ",0,0," + +(c * b > o * d) + "," + (this._x1 = t + z * k) + "," + (this._y1 = n + z * s);
      }
  },
  arc: function(t, n, i, a, u, y) {
    t = +t, n = +n, i = +i, y = !!y;
    var p = i * Math.cos(a), k = i * Math.sin(a), s = t + p, o = n + k, c = 1 ^ y, m = y ? a - u : u - a;
    if (i < 0)
      throw new Error("negative radius: " + i);
    this._x1 === null ? this._ += "M" + s + "," + o : (Math.abs(this._x1 - s) > D || Math.abs(this._y1 - o) > D) && (this._ += "L" + s + "," + o), i && (m < 0 && (m = m % nt + nt), m > Ht ? this._ += "A" + i + "," + i + ",0,1," + c + "," + (t - p) + "," + (n - k) + "A" + i + "," + i + ",0,1," + c + "," + (this._x1 = s) + "," + (this._y1 = o) : m > D && (this._ += "A" + i + "," + i + ",0," + +(m >= et) + "," + c + "," + (this._x1 = t + i * Math.cos(u)) + "," + (this._y1 = n + i * Math.sin(u))));
  },
  rect: function(t, n, i, a) {
    this._ += "M" + (this._x0 = this._x1 = +t) + "," + (this._y0 = this._y1 = +n) + "h" + +i + "v" + +a + "h" + -i + "Z";
  },
  toString: function() {
    return this._;
  }
};
function ht(t) {
  return function() {
    return t;
  };
}
function Qt(t) {
  return t[0];
}
function Xt(t) {
  return t[1];
}
var qt = Array.prototype.slice;
function Kt(t) {
  return t.source;
}
function Zt(t) {
  return t.target;
}
function Jt(t) {
  var n = Kt, i = Zt, a = Qt, u = Xt, y = null;
  function p() {
    var k, s = qt.call(arguments), o = n.apply(this, s), c = i.apply(this, s);
    if (y || (y = k = gt()), t(y, +a.apply(this, (s[0] = o, s)), +u.apply(this, s), +a.apply(this, (s[0] = c, s)), +u.apply(this, s)), k)
      return y = null, k + "" || null;
  }
  return p.source = function(k) {
    return arguments.length ? (n = k, p) : n;
  }, p.target = function(k) {
    return arguments.length ? (i = k, p) : i;
  }, p.x = function(k) {
    return arguments.length ? (a = typeof k == "function" ? k : ht(+k), p) : a;
  }, p.y = function(k) {
    return arguments.length ? (u = typeof k == "function" ? k : ht(+k), p) : u;
  }, p.context = function(k) {
    return arguments.length ? (y = k ?? null, p) : y;
  }, p;
}
function te(t, n, i, a, u) {
  t.moveTo(n, i), t.bezierCurveTo(n = (n + a) / 2, i, n, u, a, u);
}
function ee() {
  return Jt(te);
}
function ne(t) {
  return [t.source.x1, t.y0];
}
function ie(t) {
  return [t.target.x0, t.y1];
}
function se() {
  return ee().source(ne).target(ie);
}
const pt = class st {
  static next(n) {
    return new st(n + ++st.count);
  }
  constructor(n) {
    this.id = n, this.href = `#${n}`;
  }
  toString() {
    return "url(" + this.href + ")";
  }
};
pt.count = 0;
let ft = pt;
const re = {
  left: Rt,
  right: Ut,
  center: Vt,
  justify: dt
}, oe = function(t, n, i, a) {
  const { securityLevel: u, sankey: y } = rt(), p = Lt.sankey;
  let k;
  u === "sandbox" && (k = Y("#i" + n));
  const s = u === "sandbox" ? Y(k.nodes()[0].contentDocument.body) : Y("body"), o = u === "sandbox" ? s.select(`[id="${n}"]`) : Y(`[id="${n}"]`), c = (y == null ? void 0 : y.width) ?? p.width, m = (y == null ? void 0 : y.height) ?? p.width, b = (y == null ? void 0 : y.useMaxWidth) ?? p.useMaxWidth, d = (y == null ? void 0 : y.nodeAlignment) ?? p.nodeAlignment, x = (y == null ? void 0 : y.prefix) ?? p.prefix, E = (y == null ? void 0 : y.suffix) ?? p.suffix, L = (y == null ? void 0 : y.showValues) ?? p.showValues;
  Et(o, m, c, b);
  const A = a.db.getGraph(), N = re[d], P = 10;
  Gt().nodeId((g) => g.id).nodeWidth(P).nodePadding(10 + (L ? 15 : 0)).nodeAlign(N).extent([
    [0, 0],
    [c, m]
  ])(A);
  const S = At(Mt);
  o.append("g").attr("class", "nodes").selectAll(".node").data(A.nodes).join("g").attr("class", "node").attr("id", (g) => (g.uid = ft.next("node-")).id).attr("transform", function(g) {
    return "translate(" + g.x0 + "," + g.y0 + ")";
  }).attr("x", (g) => g.x0).attr("y", (g) => g.y0).append("rect").attr("height", (g) => g.y1 - g.y0).attr("width", (g) => g.x1 - g.x0).attr("fill", (g) => S(g.id));
  const M = ({ id: g, value: w }) => L ? `${g}
${x}${Math.round(w * 100) / 100}${E}` : g;
  o.append("g").attr("class", "node-labels").attr("font-family", "sans-serif").attr("font-size", 14).selectAll("text").data(A.nodes).join("text").attr("x", (g) => g.x0 < c / 2 ? g.x1 + 6 : g.x0 - 6).attr("y", (g) => (g.y1 + g.y0) / 2).attr("dy", `${L ? "0" : "0.35"}em`).attr("text-anchor", (g) => g.x0 < c / 2 ? "start" : "end").text(M);
  const $ = o.append("g").attr("class", "links").attr("fill", "none").attr("stroke-opacity", 0.5).selectAll(".link").data(A.links).join("g").attr("class", "link").style("mix-blend-mode", "multiply"), C = (y == null ? void 0 : y.linkColor) || "gradient";
  if (C === "gradient") {
    const g = $.append("linearGradient").attr("id", (w) => (w.uid = ft.next("linearGradient-")).id).attr("gradientUnits", "userSpaceOnUse").attr("x1", (w) => w.source.x1).attr("x2", (w) => w.target.x0);
    g.append("stop").attr("offset", "0%").attr("stop-color", (w) => S(w.source.id)), g.append("stop").attr("offset", "100%").attr("stop-color", (w) => S(w.target.id));
  }
  let I;
  switch (C) {
    case "gradient":
      I = (g) => g.uid;
      break;
    case "source":
      I = (g) => S(g.source.id);
      break;
    case "target":
      I = (g) => S(g.target.id);
      break;
    default:
      I = C;
  }
  $.append("path").attr("d", se()).attr("stroke", I).attr("stroke-width", (g) => Math.max(1, g.width));
}, ae = {
  draw: oe
}, le = (t) => t.replaceAll(/^[^\S\n\r]+|[^\S\n\r]+$/g, "").replaceAll(/([\n\r])+/g, `
`).trim(), ce = H.parse.bind(H);
H.parse = (t) => ce(le(t));
const ye = {
  parser: H,
  db: Dt,
  renderer: ae
};
export {
  ye as diagram
};
