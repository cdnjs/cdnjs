import { c as rt, g as mt, s as kt, a as _t, b as xt, D as vt, C as bt, E as wt, f as St, ar as Lt, j as G, t as Et } from "./mermaid-9f2aa176.js";
import { o as At } from "./ordinal-5695958c.js";
import { d as Tt } from "./Tableau10-558cc280.js";
import "./init-f9637058.js";
var tt = function() {
  var t = function(m, i, o, c) {
    for (o = o || {}, c = m.length; c--; o[m[c]] = i)
      ;
    return o;
  }, n = [1, 9], s = [1, 10], a = [1, 5, 10, 12], u = {
    trace: function() {
    },
    yy: {},
    symbols_: { error: 2, start: 3, SANKEY: 4, NEWLINE: 5, csv: 6, opt_eof: 7, record: 8, csv_tail: 9, EOF: 10, "field[source]": 11, COMMA: 12, "field[target]": 13, "field[value]": 14, field: 15, escaped: 16, non_escaped: 17, DQUOTE: 18, ESCAPED_TEXT: 19, NON_ESCAPED_TEXT: 20, $accept: 0, $end: 1 },
    terminals_: { 2: "error", 4: "SANKEY", 5: "NEWLINE", 10: "EOF", 11: "field[source]", 12: "COMMA", 13: "field[target]", 14: "field[value]", 18: "DQUOTE", 19: "ESCAPED_TEXT", 20: "NON_ESCAPED_TEXT" },
    productions_: [0, [3, 4], [6, 2], [9, 2], [9, 0], [7, 1], [7, 0], [8, 5], [15, 1], [15, 1], [16, 3], [17, 1]],
    performAction: function(i, o, c, k, b, d, x) {
      var E = d.length - 1;
      switch (b) {
        case 7:
          const L = k.findOrCreateNode(d[E - 4].trim().replaceAll('""', '"')), A = k.findOrCreateNode(d[E - 2].trim().replaceAll('""', '"')), N = parseFloat(d[E].trim());
          k.addLink(L, A, N);
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
    table: [{ 3: 1, 4: [1, 2] }, { 1: [3] }, { 5: [1, 3] }, { 6: 4, 8: 5, 15: 6, 16: 7, 17: 8, 18: n, 20: s }, { 1: [2, 6], 7: 11, 10: [1, 12] }, t(s, [2, 4], { 9: 13, 5: [1, 14] }), { 12: [1, 15] }, t(a, [2, 8]), t(a, [2, 9]), { 19: [1, 16] }, t(a, [2, 11]), { 1: [2, 1] }, { 1: [2, 5] }, t(s, [2, 2]), { 6: 17, 8: 5, 15: 6, 16: 7, 17: 8, 18: n, 20: s }, { 15: 18, 16: 7, 17: 8, 18: n, 20: s }, { 18: [1, 19] }, t(s, [2, 3]), { 12: [1, 20] }, t(a, [2, 10]), { 15: 21, 16: 7, 17: 8, 18: n, 20: s }, t([1, 5, 10], [2, 7])],
    defaultActions: { 11: [2, 1], 12: [2, 5] },
    parseError: function(i, o) {
      if (o.recoverable)
        this.trace(i);
      else {
        var c = new Error(i);
        throw c.hash = o, c;
      }
    },
    parse: function(i) {
      var o = this, c = [0], k = [], b = [null], d = [], x = this.table, E = "", L = 0, A = 0, N = 2, C = 1, j = d.slice.call(arguments, 1), S = Object.create(this.lexer), M = { yy: {} };
      for (var $ in this.yy)
        Object.prototype.hasOwnProperty.call(this.yy, $) && (M.yy[$] = this.yy[$]);
      S.setInput(i, M.yy), M.yy.lexer = S, M.yy.parser = this, typeof S.yylloc > "u" && (S.yylloc = {});
      var P = S.yylloc;
      d.push(P);
      var I = S.options && S.options.ranges;
      typeof M.yy.parseError == "function" ? this.parseError = M.yy.parseError : this.parseError = Object.getPrototypeOf(this).parseError;
      function g() {
        var v;
        return v = k.pop() || S.lex() || C, typeof v != "number" && (v instanceof Array && (k = v, v = k.pop()), v = o.symbols_[v] || v), v;
      }
      for (var w, O, T, V, e = {}, f, l, h, r; ; ) {
        if (O = c[c.length - 1], this.defaultActions[O] ? T = this.defaultActions[O] : ((w === null || typeof w > "u") && (w = g()), T = x[O] && x[O][w]), typeof T > "u" || !T.length || !T[0]) {
          var _ = "";
          r = [];
          for (f in x[O])
            this.terminals_[f] && f > N && r.push("'" + this.terminals_[f] + "'");
          S.showPosition ? _ = "Parse error on line " + (L + 1) + `:
` + S.showPosition() + `
Expecting ` + r.join(", ") + ", got '" + (this.terminals_[w] || w) + "'" : _ = "Parse error on line " + (L + 1) + ": Unexpected " + (w == C ? "end of input" : "'" + (this.terminals_[w] || w) + "'"), this.parseError(_, {
            text: S.match,
            token: this.terminals_[w] || w,
            line: S.yylineno,
            loc: P,
            expected: r
          });
        }
        if (T[0] instanceof Array && T.length > 1)
          throw new Error("Parse Error: multiple actions possible at state: " + O + ", token: " + w);
        switch (T[0]) {
          case 1:
            c.push(w), b.push(S.yytext), d.push(S.yylloc), c.push(T[1]), w = null, A = S.yyleng, E = S.yytext, L = S.yylineno, P = S.yylloc;
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
            ]), V = this.performAction.apply(e, [
              E,
              A,
              L,
              M.yy,
              T[1],
              b,
              d
            ].concat(j)), typeof V < "u")
              return V;
            l && (c = c.slice(0, -1 * l * 2), b = b.slice(0, -1 * l), d = d.slice(0, -1 * l)), c.push(this.productions_[T[1]][0]), b.push(e.$), d.push(e._$), h = x[c[c.length - 2]][c[c.length - 1]], c.push(h);
            break;
          case 3:
            return !0;
        }
      }
      return !0;
    }
  }, y = function() {
    var m = {
      EOF: 1,
      parseError: function(o, c) {
        if (this.yy.parser)
          this.yy.parser.parseError(o, c);
        else
          throw new Error(o);
      },
      // resets the lexer, sets new input
      setInput: function(i, o) {
        return this.yy = o || this.yy || {}, this._input = i, this._more = this._backtrack = this.done = !1, this.yylineno = this.yyleng = 0, this.yytext = this.matched = this.match = "", this.conditionStack = ["INITIAL"], this.yylloc = {
          first_line: 1,
          first_column: 0,
          last_line: 1,
          last_column: 0
        }, this.options.ranges && (this.yylloc.range = [0, 0]), this.offset = 0, this;
      },
      // consumes and returns one char from the input
      input: function() {
        var i = this._input[0];
        this.yytext += i, this.yyleng++, this.offset++, this.match += i, this.matched += i;
        var o = i.match(/(?:\r\n?|\n).*/g);
        return o ? (this.yylineno++, this.yylloc.last_line++) : this.yylloc.last_column++, this.options.ranges && this.yylloc.range[1]++, this._input = this._input.slice(1), i;
      },
      // unshifts one char (or a string) into the input
      unput: function(i) {
        var o = i.length, c = i.split(/(?:\r\n?|\n)/g);
        this._input = i + this._input, this.yytext = this.yytext.substr(0, this.yytext.length - o), this.offset -= o;
        var k = this.match.split(/(?:\r\n?|\n)/g);
        this.match = this.match.substr(0, this.match.length - 1), this.matched = this.matched.substr(0, this.matched.length - 1), c.length - 1 && (this.yylineno -= c.length - 1);
        var b = this.yylloc.range;
        return this.yylloc = {
          first_line: this.yylloc.first_line,
          last_line: this.yylineno + 1,
          first_column: this.yylloc.first_column,
          last_column: c ? (c.length === k.length ? this.yylloc.first_column : 0) + k[k.length - c.length].length - c[0].length : this.yylloc.first_column - o
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
      less: function(i) {
        this.unput(this.match.slice(i));
      },
      // displays already matched input, i.e. for error messages
      pastInput: function() {
        var i = this.matched.substr(0, this.matched.length - this.match.length);
        return (i.length > 20 ? "..." : "") + i.substr(-20).replace(/\n/g, "");
      },
      // displays upcoming input, i.e. for error messages
      upcomingInput: function() {
        var i = this.match;
        return i.length < 20 && (i += this._input.substr(0, 20 - i.length)), (i.substr(0, 20) + (i.length > 20 ? "..." : "")).replace(/\n/g, "");
      },
      // displays the character position where the lexing error occurred, i.e. for error messages
      showPosition: function() {
        var i = this.pastInput(), o = new Array(i.length + 1).join("-");
        return i + this.upcomingInput() + `
` + o + "^";
      },
      // test the lexed token: return FALSE when not a match, otherwise return token
      test_match: function(i, o) {
        var c, k, b;
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
        }, this.options.ranges && (b.yylloc.range = this.yylloc.range.slice(0))), k = i[0].match(/(?:\r\n?|\n).*/g), k && (this.yylineno += k.length), this.yylloc = {
          first_line: this.yylloc.last_line,
          last_line: this.yylineno + 1,
          first_column: this.yylloc.last_column,
          last_column: k ? k[k.length - 1].length - k[k.length - 1].match(/\r?\n?/)[0].length : this.yylloc.last_column + i[0].length
        }, this.yytext += i[0], this.match += i[0], this.matches = i, this.yyleng = this.yytext.length, this.options.ranges && (this.yylloc.range = [this.offset, this.offset += this.yyleng]), this._more = !1, this._backtrack = !1, this._input = this._input.slice(i[0].length), this.matched += i[0], c = this.performAction.call(this, this.yy, this, o, this.conditionStack[this.conditionStack.length - 1]), this.done && this._input && (this.done = !1), c)
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
        var i, o, c, k;
        this._more || (this.yytext = "", this.match = "");
        for (var b = this._currentRules(), d = 0; d < b.length; d++)
          if (c = this._input.match(this.rules[b[d]]), c && (!o || c[0].length > o[0].length)) {
            if (o = c, k = d, this.options.backtrack_lexer) {
              if (i = this.test_match(c, b[d]), i !== !1)
                return i;
              if (this._backtrack) {
                o = !1;
                continue;
              } else
                return !1;
            } else if (!this.options.flex)
              break;
          }
        return o ? (i = this.test_match(o, b[k]), i !== !1 ? i : !1) : this._input === "" ? this.EOF : this.parseError("Lexical error on line " + (this.yylineno + 1) + `. Unrecognized text.
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
      options: { "case-insensitive": !0 },
      performAction: function(o, c, k, b) {
        switch (k) {
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
      rules: [/^(?:sankey-beta\b)/i, /^(?:$)/i, /^(?:((\u000D\u000A)|(\u000A)))/i, /^(?:(\u002C))/i, /^(?:(\u0022))/i, /^(?:([\u0020-\u0021\u0023-\u002B\u002D-\u007E])*)/i, /^(?:(\u0022)(?!(\u0022)))/i, /^(?:(([\u0020-\u0021\u0023-\u002B\u002D-\u007E])|(\u002C)|(\u000D)|(\u000A)|(\u0022)(\u0022))*)/i],
      conditions: { csv: { rules: [1, 2, 3, 4, 5, 6, 7], inclusive: !1 }, escaped_text: { rules: [6, 7], inclusive: !1 }, INITIAL: { rules: [0, 1, 2, 3, 4, 5, 6, 7], inclusive: !0 } }
    };
    return m;
  }();
  u.lexer = y;
  function p() {
    this.yy = {};
  }
  return p.prototype = u, u.Parser = p, new p();
}();
tt.parser = tt;
const H = tt;
let q = [], Q = [], B = {};
const Mt = () => {
  q = [], Q = [], B = {}, wt();
};
class Nt {
  constructor(n, s, a = 0) {
    this.source = n, this.target = s, this.value = a;
  }
}
const Ct = (t, n, s) => {
  q.push(new Nt(t, n, s));
};
class Pt {
  constructor(n) {
    this.ID = n;
  }
}
const It = (t) => (t = St.sanitizeText(t, rt()), B[t] || (B[t] = new Pt(t), Q.push(B[t])), B[t]), Ot = () => Q, $t = () => q, jt = () => ({
  nodes: Q.map((t) => ({ id: t.ID })),
  links: q.map((t) => ({
    source: t.source.ID,
    target: t.target.ID,
    value: t.value
  }))
}), zt = {
  nodesMap: B,
  getConfig: () => rt().sankey,
  getNodes: Ot,
  getLinks: $t,
  getGraph: jt,
  addLink: Ct,
  findOrCreateNode: It,
  getAccTitle: mt,
  setAccTitle: kt,
  getAccDescription: _t,
  setAccDescription: xt,
  getDiagramTitle: vt,
  setDiagramTitle: bt,
  clear: Mt
};
function ot(t, n) {
  let s;
  if (n === void 0)
    for (const a of t)
      a != null && (s < a || s === void 0 && a >= a) && (s = a);
  else {
    let a = -1;
    for (let u of t)
      (u = n(u, ++a, t)) != null && (s < u || s === void 0 && u >= u) && (s = u);
  }
  return s;
}
function yt(t, n) {
  let s;
  if (n === void 0)
    for (const a of t)
      a != null && (s > a || s === void 0 && a >= a) && (s = a);
  else {
    let a = -1;
    for (let u of t)
      (u = n(u, ++a, t)) != null && (s > u || s === void 0 && u >= u) && (s = u);
  }
  return s;
}
function Z(t, n) {
  let s = 0;
  if (n === void 0)
    for (let a of t)
      (a = +a) && (s += a);
  else {
    let a = -1;
    for (let u of t)
      (u = +n(u, ++a, t)) && (s += u);
  }
  return s;
}
function Dt(t) {
  return t.target.depth;
}
function Bt(t) {
  return t.depth;
}
function Vt(t, n) {
  return n - 1 - t.height;
}
function dt(t, n) {
  return t.sourceLinks.length ? t.depth : n - 1;
}
function Rt(t) {
  return t.targetLinks.length ? t.depth : t.sourceLinks.length ? yt(t.sourceLinks, Dt) - 1 : 0;
}
function Y(t) {
  return function() {
    return t;
  };
}
function lt(t, n) {
  return X(t.source, n.source) || t.index - n.index;
}
function at(t, n) {
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
function Ft(t) {
  return t.nodes;
}
function Wt(t) {
  return t.links;
}
function ct(t, n) {
  const s = t.get(n);
  if (!s)
    throw new Error("missing: " + n);
  return s;
}
function ut({ nodes: t }) {
  for (const n of t) {
    let s = n.y0, a = s;
    for (const u of n.sourceLinks)
      u.y0 = s + u.width / 2, s += u.width;
    for (const u of n.targetLinks)
      u.y1 = a + u.width / 2, a += u.width;
  }
}
function Gt() {
  let t = 0, n = 0, s = 1, a = 1, u = 24, y = 8, p, m = Ut, i = dt, o, c, k = Ft, b = Wt, d = 6;
  function x() {
    const e = { nodes: k.apply(null, arguments), links: b.apply(null, arguments) };
    return E(e), L(e), A(e), N(e), S(e), ut(e), e;
  }
  x.update = function(e) {
    return ut(e), e;
  }, x.nodeId = function(e) {
    return arguments.length ? (m = typeof e == "function" ? e : Y(e), x) : m;
  }, x.nodeAlign = function(e) {
    return arguments.length ? (i = typeof e == "function" ? e : Y(e), x) : i;
  }, x.nodeSort = function(e) {
    return arguments.length ? (o = e, x) : o;
  }, x.nodeWidth = function(e) {
    return arguments.length ? (u = +e, x) : u;
  }, x.nodePadding = function(e) {
    return arguments.length ? (y = p = +e, x) : y;
  }, x.nodes = function(e) {
    return arguments.length ? (k = typeof e == "function" ? e : Y(e), x) : k;
  }, x.links = function(e) {
    return arguments.length ? (b = typeof e == "function" ? e : Y(e), x) : b;
  }, x.linkSort = function(e) {
    return arguments.length ? (c = e, x) : c;
  }, x.size = function(e) {
    return arguments.length ? (t = n = 0, s = +e[0], a = +e[1], x) : [s - t, a - n];
  }, x.extent = function(e) {
    return arguments.length ? (t = +e[0][0], s = +e[1][0], n = +e[0][1], a = +e[1][1], x) : [[t, n], [s, a]];
  }, x.iterations = function(e) {
    return arguments.length ? (d = +e, x) : d;
  };
  function E({ nodes: e, links: f }) {
    for (const [h, r] of e.entries())
      r.index = h, r.sourceLinks = [], r.targetLinks = [];
    const l = new Map(e.map((h, r) => [m(h, r, e), h]));
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
  function C({ nodes: e }) {
    const f = ot(e, (r) => r.depth) + 1, l = (s - t - u) / (f - 1), h = new Array(f);
    for (const r of e) {
      const _ = Math.max(0, Math.min(f - 1, Math.floor(i.call(null, r, f))));
      r.layer = _, r.x0 = t + _ * l, r.x1 = r.x0 + u, h[_] ? h[_].push(r) : h[_] = [r];
    }
    if (o)
      for (const r of h)
        r.sort(o);
    return h;
  }
  function j(e) {
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
    const f = C(e);
    p = Math.min(y, (a - n) / (ot(f, (l) => l.length) - 1)), j(f);
    for (let l = 0; l < d; ++l) {
      const h = Math.pow(0.99, l), r = Math.max(1 - h, (l + 1) / d);
      $(f, h, r), M(f, h, r);
    }
  }
  function M(e, f, l) {
    for (let h = 1, r = e.length; h < r; ++h) {
      const _ = e[h];
      for (const v of _) {
        let R = 0, z = 0;
        for (const { source: F, value: K } of v.targetLinks) {
          let W = K * (v.layer - F.layer);
          R += T(F, v) * W, z += W;
        }
        if (!(z > 0))
          continue;
        let U = (R / z - v.y0) * f;
        v.y0 += U, v.y1 += U, w(v);
      }
      o === void 0 && _.sort(X), P(_, l);
    }
  }
  function $(e, f, l) {
    for (let h = e.length, r = h - 2; r >= 0; --r) {
      const _ = e[r];
      for (const v of _) {
        let R = 0, z = 0;
        for (const { target: F, value: K } of v.sourceLinks) {
          let W = K * (F.layer - v.layer);
          R += V(v, F) * W, z += W;
        }
        if (!(z > 0))
          continue;
        let U = (R / z - v.y0) * f;
        v.y0 += U, v.y1 += U, w(v);
      }
      o === void 0 && _.sort(X), P(_, l);
    }
  }
  function P(e, f) {
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
        l.sort(at);
      for (const { target: { targetLinks: l } } of e)
        l.sort(lt);
    }
  }
  function O(e) {
    if (c === void 0)
      for (const { sourceLinks: f, targetLinks: l } of e)
        f.sort(at), l.sort(lt);
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
  function V(e, f) {
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
var et = Math.PI, nt = 2 * et, D = 1e-6, Yt = nt - D;
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
  quadraticCurveTo: function(t, n, s, a) {
    this._ += "Q" + +t + "," + +n + "," + (this._x1 = +s) + "," + (this._y1 = +a);
  },
  bezierCurveTo: function(t, n, s, a, u, y) {
    this._ += "C" + +t + "," + +n + "," + +s + "," + +a + "," + (this._x1 = +u) + "," + (this._y1 = +y);
  },
  arcTo: function(t, n, s, a, u) {
    t = +t, n = +n, s = +s, a = +a, u = +u;
    var y = this._x1, p = this._y1, m = s - t, i = a - n, o = y - t, c = p - n, k = o * o + c * c;
    if (u < 0)
      throw new Error("negative radius: " + u);
    if (this._x1 === null)
      this._ += "M" + (this._x1 = t) + "," + (this._y1 = n);
    else if (k > D)
      if (!(Math.abs(c * m - i * o) > D) || !u)
        this._ += "L" + (this._x1 = t) + "," + (this._y1 = n);
      else {
        var b = s - y, d = a - p, x = m * m + i * i, E = b * b + d * d, L = Math.sqrt(x), A = Math.sqrt(k), N = u * Math.tan((et - Math.acos((x + k - E) / (2 * L * A))) / 2), C = N / A, j = N / L;
        Math.abs(C - 1) > D && (this._ += "L" + (t + C * o) + "," + (n + C * c)), this._ += "A" + u + "," + u + ",0,0," + +(c * b > o * d) + "," + (this._x1 = t + j * m) + "," + (this._y1 = n + j * i);
      }
  },
  arc: function(t, n, s, a, u, y) {
    t = +t, n = +n, s = +s, y = !!y;
    var p = s * Math.cos(a), m = s * Math.sin(a), i = t + p, o = n + m, c = 1 ^ y, k = y ? a - u : u - a;
    if (s < 0)
      throw new Error("negative radius: " + s);
    this._x1 === null ? this._ += "M" + i + "," + o : (Math.abs(this._x1 - i) > D || Math.abs(this._y1 - o) > D) && (this._ += "L" + i + "," + o), s && (k < 0 && (k = k % nt + nt), k > Yt ? this._ += "A" + s + "," + s + ",0,1," + c + "," + (t - p) + "," + (n - m) + "A" + s + "," + s + ",0,1," + c + "," + (this._x1 = i) + "," + (this._y1 = o) : k > D && (this._ += "A" + s + "," + s + ",0," + +(k >= et) + "," + c + "," + (this._x1 = t + s * Math.cos(u)) + "," + (this._y1 = n + s * Math.sin(u))));
  },
  rect: function(t, n, s, a) {
    this._ += "M" + (this._x0 = this._x1 = +t) + "," + (this._y0 = this._y1 = +n) + "h" + +s + "v" + +a + "h" + -s + "Z";
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
  var n = Qt, s = Kt, a = Ht, u = Xt, y = null;
  function p() {
    var m, i = qt.call(arguments), o = n.apply(this, i), c = s.apply(this, i);
    if (y || (y = m = gt()), t(y, +a.apply(this, (i[0] = o, i)), +u.apply(this, i), +a.apply(this, (i[0] = c, i)), +u.apply(this, i)), m)
      return y = null, m + "" || null;
  }
  return p.source = function(m) {
    return arguments.length ? (n = m, p) : n;
  }, p.target = function(m) {
    return arguments.length ? (s = m, p) : s;
  }, p.x = function(m) {
    return arguments.length ? (a = typeof m == "function" ? m : ht(+m), p) : a;
  }, p.y = function(m) {
    return arguments.length ? (u = typeof m == "function" ? m : ht(+m), p) : u;
  }, p.context = function(m) {
    return arguments.length ? (y = m ?? null, p) : y;
  }, p;
}
function Jt(t, n, s, a, u) {
  t.moveTo(n, s), t.bezierCurveTo(n = (n + a) / 2, s, n, u, a, u);
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
const se = {
  left: Bt,
  right: Vt,
  center: Rt,
  justify: dt
}, re = function(t, n, s, a) {
  const { securityLevel: u, sankey: y } = rt(), p = Lt.sankey;
  let m;
  u === "sandbox" && (m = G("#i" + n));
  const i = u === "sandbox" ? G(m.nodes()[0].contentDocument.body) : G("body"), o = u === "sandbox" ? i.select(`[id="${n}"]`) : G(`[id="${n}"]`), c = (y == null ? void 0 : y.width) ?? p.width, k = (y == null ? void 0 : y.height) ?? p.width, b = (y == null ? void 0 : y.useMaxWidth) ?? p.useMaxWidth, d = (y == null ? void 0 : y.nodeAlignment) ?? p.nodeAlignment, x = (y == null ? void 0 : y.prefix) ?? p.prefix, E = (y == null ? void 0 : y.suffix) ?? p.suffix, L = (y == null ? void 0 : y.showValues) ?? p.showValues, A = a.db.getGraph(), N = se[d], C = 10;
  Gt().nodeId((g) => g.id).nodeWidth(C).nodePadding(10 + (L ? 15 : 0)).nodeAlign(N).extent([
    [0, 0],
    [c, k]
  ])(A);
  const S = At(Tt);
  o.append("g").attr("class", "nodes").selectAll(".node").data(A.nodes).join("g").attr("class", "node").attr("id", (g) => (g.uid = ft.next("node-")).id).attr("transform", function(g) {
    return "translate(" + g.x0 + "," + g.y0 + ")";
  }).attr("x", (g) => g.x0).attr("y", (g) => g.y0).append("rect").attr("height", (g) => g.y1 - g.y0).attr("width", (g) => g.x1 - g.x0).attr("fill", (g) => S(g.id));
  const M = ({ id: g, value: w }) => L ? `${g}
${x}${Math.round(w * 100) / 100}${E}` : g;
  o.append("g").attr("class", "node-labels").attr("font-family", "sans-serif").attr("font-size", 14).selectAll("text").data(A.nodes).join("text").attr("x", (g) => g.x0 < c / 2 ? g.x1 + 6 : g.x0 - 6).attr("y", (g) => (g.y1 + g.y0) / 2).attr("dy", `${L ? "0" : "0.35"}em`).attr("text-anchor", (g) => g.x0 < c / 2 ? "start" : "end").text(M);
  const $ = o.append("g").attr("class", "links").attr("fill", "none").attr("stroke-opacity", 0.5).selectAll(".link").data(A.links).join("g").attr("class", "link").style("mix-blend-mode", "multiply"), P = (y == null ? void 0 : y.linkColor) || "gradient";
  if (P === "gradient") {
    const g = $.append("linearGradient").attr("id", (w) => (w.uid = ft.next("linearGradient-")).id).attr("gradientUnits", "userSpaceOnUse").attr("x1", (w) => w.source.x1).attr("x2", (w) => w.target.x0);
    g.append("stop").attr("offset", "0%").attr("stop-color", (w) => S(w.source.id)), g.append("stop").attr("offset", "100%").attr("stop-color", (w) => S(w.target.id));
  }
  let I;
  switch (P) {
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
      I = P;
  }
  $.append("path").attr("d", ie()).attr("stroke", I).attr("stroke-width", (g) => Math.max(1, g.width)), Et(void 0, o, 0, b);
}, oe = {
  draw: re
}, le = (t) => t.replaceAll(/^[^\S\n\r]+|[^\S\n\r]+$/g, "").replaceAll(/([\n\r])+/g, `
`).trim(), ae = H.parse.bind(H);
H.parse = (t) => ae(le(t));
const ye = {
  parser: H,
  db: zt,
  renderer: oe
};
export {
  ye as diagram
};
