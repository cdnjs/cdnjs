import { X as J, Y as ot, D as ht, E as ut, s as pt, g as ft, b as yt, a as gt, Z as dt, F as _t, d as mt, c as nt, l as st, $ as vt, W as kt, k as bt, a0 as xt } from "./mermaid-d733041c.js";
import { d as it } from "./arc-1026bbaf.js";
import { o as St } from "./ordinal-5695958c.js";
import { a as Et } from "./array-2ff2c7a6.js";
import { c as z } from "./constant-2fe7eae5.js";
import "./init-f9637058.js";
function wt(t, c) {
  return c < t ? -1 : c > t ? 1 : c >= t ? 0 : NaN;
}
function At(t) {
  return t;
}
function Dt() {
  var t = At, c = wt, d = null, g = z(0), k = z(J), b = z(0);
  function h(r) {
    var u, p = (r = Et(r)).length, I, x, D = 0, _ = new Array(p), o = new Array(p), $ = +g.apply(this, arguments), V = Math.min(J, Math.max(-J, k.apply(this, arguments) - $)), w, P = Math.min(Math.abs(V) / p, b.apply(this, arguments)), N = P * (V < 0 ? -1 : 1), S;
    for (u = 0; u < p; ++u)
      (S = o[_[u] = u] = +t(r[u], u, r)) > 0 && (D += S);
    for (c != null ? _.sort(function(A, m) {
      return c(o[A], o[m]);
    }) : d != null && _.sort(function(A, m) {
      return d(r[A], r[m]);
    }), u = 0, x = D ? (V - p * N) / D : 0; u < p; ++u, $ = w)
      I = _[u], S = o[I], w = $ + (S > 0 ? S * x : 0) + N, o[I] = {
        data: r[I],
        index: u,
        value: S,
        startAngle: $,
        endAngle: w,
        padAngle: P
      };
    return o;
  }
  return h.value = function(r) {
    return arguments.length ? (t = typeof r == "function" ? r : z(+r), h) : t;
  }, h.sortValues = function(r) {
    return arguments.length ? (c = r, d = null, h) : c;
  }, h.sort = function(r) {
    return arguments.length ? (d = r, c = null, h) : d;
  }, h.startAngle = function(r) {
    return arguments.length ? (g = typeof r == "function" ? r : z(+r), h) : g;
  }, h.endAngle = function(r) {
    return arguments.length ? (k = typeof r == "function" ? r : z(+r), h) : k;
  }, h.padAngle = function(r) {
    return arguments.length ? (b = typeof r == "function" ? r : z(+r), h) : b;
  }, h;
}
var K = function() {
  var t = function(m, e, n, s) {
    for (n = n || {}, s = m.length; s--; n[m[s]] = e)
      ;
    return n;
  }, c = [1, 4], d = [1, 5], g = [1, 6], k = [1, 7], b = [1, 9], h = [1, 11, 13, 15, 17, 19, 20, 26, 27, 28, 29], r = [2, 5], u = [1, 6, 11, 13, 15, 17, 19, 20, 26, 27, 28, 29], p = [26, 27, 28], I = [2, 8], x = [1, 18], D = [1, 19], _ = [1, 20], o = [1, 21], $ = [1, 22], V = [1, 23], w = [1, 28], P = [6, 26, 27, 28, 29], N = {
    trace: function() {
    },
    yy: {},
    symbols_: { error: 2, start: 3, eol: 4, directive: 5, PIE: 6, document: 7, showData: 8, line: 9, statement: 10, txt: 11, value: 12, title: 13, title_value: 14, acc_title: 15, acc_title_value: 16, acc_descr: 17, acc_descr_value: 18, acc_descr_multiline_value: 19, section: 20, openDirective: 21, typeDirective: 22, closeDirective: 23, ":": 24, argDirective: 25, NEWLINE: 26, ";": 27, EOF: 28, open_directive: 29, type_directive: 30, arg_directive: 31, close_directive: 32, $accept: 0, $end: 1 },
    terminals_: { 2: "error", 6: "PIE", 8: "showData", 11: "txt", 12: "value", 13: "title", 14: "title_value", 15: "acc_title", 16: "acc_title_value", 17: "acc_descr", 18: "acc_descr_value", 19: "acc_descr_multiline_value", 20: "section", 24: ":", 26: "NEWLINE", 27: ";", 28: "EOF", 29: "open_directive", 30: "type_directive", 31: "arg_directive", 32: "close_directive" },
    productions_: [0, [3, 2], [3, 2], [3, 2], [3, 3], [7, 0], [7, 2], [9, 2], [10, 0], [10, 2], [10, 2], [10, 2], [10, 2], [10, 1], [10, 1], [10, 1], [5, 3], [5, 5], [4, 1], [4, 1], [4, 1], [21, 1], [22, 1], [25, 1], [23, 1]],
    performAction: function(e, n, s, a, l, i, T) {
      var f = i.length - 1;
      switch (l) {
        case 4:
          a.setShowData(!0);
          break;
        case 7:
          this.$ = i[f - 1];
          break;
        case 9:
          a.addSection(i[f - 1], a.cleanupValue(i[f]));
          break;
        case 10:
          this.$ = i[f].trim(), a.setDiagramTitle(this.$);
          break;
        case 11:
          this.$ = i[f].trim(), a.setAccTitle(this.$);
          break;
        case 12:
        case 13:
          this.$ = i[f].trim(), a.setAccDescription(this.$);
          break;
        case 14:
          a.addSection(i[f].substr(8)), this.$ = i[f].substr(8);
          break;
        case 21:
          a.parseDirective("%%{", "open_directive");
          break;
        case 22:
          a.parseDirective(i[f], "type_directive");
          break;
        case 23:
          i[f] = i[f].trim().replace(/'/g, '"'), a.parseDirective(i[f], "arg_directive");
          break;
        case 24:
          a.parseDirective("}%%", "close_directive", "pie");
          break;
      }
    },
    table: [{ 3: 1, 4: 2, 5: 3, 6: c, 21: 8, 26: d, 27: g, 28: k, 29: b }, { 1: [3] }, { 3: 10, 4: 2, 5: 3, 6: c, 21: 8, 26: d, 27: g, 28: k, 29: b }, { 3: 11, 4: 2, 5: 3, 6: c, 21: 8, 26: d, 27: g, 28: k, 29: b }, t(h, r, { 7: 12, 8: [1, 13] }), t(u, [2, 18]), t(u, [2, 19]), t(u, [2, 20]), { 22: 14, 30: [1, 15] }, { 30: [2, 21] }, { 1: [2, 1] }, { 1: [2, 2] }, t(p, I, { 21: 8, 9: 16, 10: 17, 5: 24, 1: [2, 3], 11: x, 13: D, 15: _, 17: o, 19: $, 20: V, 29: b }), t(h, r, { 7: 25 }), { 23: 26, 24: [1, 27], 32: w }, t([24, 32], [2, 22]), t(h, [2, 6]), { 4: 29, 26: d, 27: g, 28: k }, { 12: [1, 30] }, { 14: [1, 31] }, { 16: [1, 32] }, { 18: [1, 33] }, t(p, [2, 13]), t(p, [2, 14]), t(p, [2, 15]), t(p, I, { 21: 8, 9: 16, 10: 17, 5: 24, 1: [2, 4], 11: x, 13: D, 15: _, 17: o, 19: $, 20: V, 29: b }), t(P, [2, 16]), { 25: 34, 31: [1, 35] }, t(P, [2, 24]), t(h, [2, 7]), t(p, [2, 9]), t(p, [2, 10]), t(p, [2, 11]), t(p, [2, 12]), { 23: 36, 32: w }, { 32: [2, 23] }, t(P, [2, 17])],
    defaultActions: { 9: [2, 21], 10: [2, 1], 11: [2, 2], 35: [2, 23] },
    parseError: function(e, n) {
      if (n.recoverable)
        this.trace(e);
      else {
        var s = new Error(e);
        throw s.hash = n, s;
      }
    },
    parse: function(e) {
      var n = this, s = [0], a = [], l = [null], i = [], T = this.table, f = "", R = 0, M = 0, B = 2, tt = 1, at = i.slice.call(arguments, 1), y = Object.create(this.lexer), F = { yy: {} };
      for (var Z in this.yy)
        Object.prototype.hasOwnProperty.call(this.yy, Z) && (F.yy[Z] = this.yy[Z]);
      y.setInput(e, F.yy), F.yy.lexer = y, F.yy.parser = this, typeof y.yylloc > "u" && (y.yylloc = {});
      var X = y.yylloc;
      i.push(X);
      var lt = y.options && y.options.ranges;
      typeof F.yy.parseError == "function" ? this.parseError = F.yy.parseError : this.parseError = Object.getPrototypeOf(this).parseError;
      function ct() {
        var O;
        return O = a.pop() || y.lex() || tt, typeof O != "number" && (O instanceof Array && (a = O, O = a.pop()), O = n.symbols_[O] || O), O;
      }
      for (var v, L, E, q, j = {}, W, C, et, G; ; ) {
        if (L = s[s.length - 1], this.defaultActions[L] ? E = this.defaultActions[L] : ((v === null || typeof v > "u") && (v = ct()), E = T[L] && T[L][v]), typeof E > "u" || !E.length || !E[0]) {
          var H = "";
          G = [];
          for (W in T[L])
            this.terminals_[W] && W > B && G.push("'" + this.terminals_[W] + "'");
          y.showPosition ? H = "Parse error on line " + (R + 1) + `:
` + y.showPosition() + `
Expecting ` + G.join(", ") + ", got '" + (this.terminals_[v] || v) + "'" : H = "Parse error on line " + (R + 1) + ": Unexpected " + (v == tt ? "end of input" : "'" + (this.terminals_[v] || v) + "'"), this.parseError(H, {
            text: y.match,
            token: this.terminals_[v] || v,
            line: y.yylineno,
            loc: X,
            expected: G
          });
        }
        if (E[0] instanceof Array && E.length > 1)
          throw new Error("Parse Error: multiple actions possible at state: " + L + ", token: " + v);
        switch (E[0]) {
          case 1:
            s.push(v), l.push(y.yytext), i.push(y.yylloc), s.push(E[1]), v = null, M = y.yyleng, f = y.yytext, R = y.yylineno, X = y.yylloc;
            break;
          case 2:
            if (C = this.productions_[E[1]][1], j.$ = l[l.length - C], j._$ = {
              first_line: i[i.length - (C || 1)].first_line,
              last_line: i[i.length - 1].last_line,
              first_column: i[i.length - (C || 1)].first_column,
              last_column: i[i.length - 1].last_column
            }, lt && (j._$.range = [
              i[i.length - (C || 1)].range[0],
              i[i.length - 1].range[1]
            ]), q = this.performAction.apply(j, [
              f,
              M,
              R,
              F.yy,
              E[1],
              l,
              i
            ].concat(at)), typeof q < "u")
              return q;
            C && (s = s.slice(0, -1 * C * 2), l = l.slice(0, -1 * C), i = i.slice(0, -1 * C)), s.push(this.productions_[E[1]][0]), l.push(j.$), i.push(j._$), et = T[s[s.length - 2]][s[s.length - 1]], s.push(et);
            break;
          case 3:
            return !0;
        }
      }
      return !0;
    }
  }, S = function() {
    var m = {
      EOF: 1,
      parseError: function(n, s) {
        if (this.yy.parser)
          this.yy.parser.parseError(n, s);
        else
          throw new Error(n);
      },
      // resets the lexer, sets new input
      setInput: function(e, n) {
        return this.yy = n || this.yy || {}, this._input = e, this._more = this._backtrack = this.done = !1, this.yylineno = this.yyleng = 0, this.yytext = this.matched = this.match = "", this.conditionStack = ["INITIAL"], this.yylloc = {
          first_line: 1,
          first_column: 0,
          last_line: 1,
          last_column: 0
        }, this.options.ranges && (this.yylloc.range = [0, 0]), this.offset = 0, this;
      },
      // consumes and returns one char from the input
      input: function() {
        var e = this._input[0];
        this.yytext += e, this.yyleng++, this.offset++, this.match += e, this.matched += e;
        var n = e.match(/(?:\r\n?|\n).*/g);
        return n ? (this.yylineno++, this.yylloc.last_line++) : this.yylloc.last_column++, this.options.ranges && this.yylloc.range[1]++, this._input = this._input.slice(1), e;
      },
      // unshifts one char (or a string) into the input
      unput: function(e) {
        var n = e.length, s = e.split(/(?:\r\n?|\n)/g);
        this._input = e + this._input, this.yytext = this.yytext.substr(0, this.yytext.length - n), this.offset -= n;
        var a = this.match.split(/(?:\r\n?|\n)/g);
        this.match = this.match.substr(0, this.match.length - 1), this.matched = this.matched.substr(0, this.matched.length - 1), s.length - 1 && (this.yylineno -= s.length - 1);
        var l = this.yylloc.range;
        return this.yylloc = {
          first_line: this.yylloc.first_line,
          last_line: this.yylineno + 1,
          first_column: this.yylloc.first_column,
          last_column: s ? (s.length === a.length ? this.yylloc.first_column : 0) + a[a.length - s.length].length - s[0].length : this.yylloc.first_column - n
        }, this.options.ranges && (this.yylloc.range = [l[0], l[0] + this.yyleng - n]), this.yyleng = this.yytext.length, this;
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
      less: function(e) {
        this.unput(this.match.slice(e));
      },
      // displays already matched input, i.e. for error messages
      pastInput: function() {
        var e = this.matched.substr(0, this.matched.length - this.match.length);
        return (e.length > 20 ? "..." : "") + e.substr(-20).replace(/\n/g, "");
      },
      // displays upcoming input, i.e. for error messages
      upcomingInput: function() {
        var e = this.match;
        return e.length < 20 && (e += this._input.substr(0, 20 - e.length)), (e.substr(0, 20) + (e.length > 20 ? "..." : "")).replace(/\n/g, "");
      },
      // displays the character position where the lexing error occurred, i.e. for error messages
      showPosition: function() {
        var e = this.pastInput(), n = new Array(e.length + 1).join("-");
        return e + this.upcomingInput() + `
` + n + "^";
      },
      // test the lexed token: return FALSE when not a match, otherwise return token
      test_match: function(e, n) {
        var s, a, l;
        if (this.options.backtrack_lexer && (l = {
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
        }, this.options.ranges && (l.yylloc.range = this.yylloc.range.slice(0))), a = e[0].match(/(?:\r\n?|\n).*/g), a && (this.yylineno += a.length), this.yylloc = {
          first_line: this.yylloc.last_line,
          last_line: this.yylineno + 1,
          first_column: this.yylloc.last_column,
          last_column: a ? a[a.length - 1].length - a[a.length - 1].match(/\r?\n?/)[0].length : this.yylloc.last_column + e[0].length
        }, this.yytext += e[0], this.match += e[0], this.matches = e, this.yyleng = this.yytext.length, this.options.ranges && (this.yylloc.range = [this.offset, this.offset += this.yyleng]), this._more = !1, this._backtrack = !1, this._input = this._input.slice(e[0].length), this.matched += e[0], s = this.performAction.call(this, this.yy, this, n, this.conditionStack[this.conditionStack.length - 1]), this.done && this._input && (this.done = !1), s)
          return s;
        if (this._backtrack) {
          for (var i in l)
            this[i] = l[i];
          return !1;
        }
        return !1;
      },
      // return next match in input
      next: function() {
        if (this.done)
          return this.EOF;
        this._input || (this.done = !0);
        var e, n, s, a;
        this._more || (this.yytext = "", this.match = "");
        for (var l = this._currentRules(), i = 0; i < l.length; i++)
          if (s = this._input.match(this.rules[l[i]]), s && (!n || s[0].length > n[0].length)) {
            if (n = s, a = i, this.options.backtrack_lexer) {
              if (e = this.test_match(s, l[i]), e !== !1)
                return e;
              if (this._backtrack) {
                n = !1;
                continue;
              } else
                return !1;
            } else if (!this.options.flex)
              break;
          }
        return n ? (e = this.test_match(n, l[a]), e !== !1 ? e : !1) : this._input === "" ? this.EOF : this.parseError("Lexical error on line " + (this.yylineno + 1) + `. Unrecognized text.
` + this.showPosition(), {
          text: "",
          token: null,
          line: this.yylineno
        });
      },
      // return next match that has a token
      lex: function() {
        var n = this.next();
        return n || this.lex();
      },
      // activates a new lexer condition state (pushes the new lexer condition state onto the condition stack)
      begin: function(n) {
        this.conditionStack.push(n);
      },
      // pop the previously active lexer condition state off the condition stack
      popState: function() {
        var n = this.conditionStack.length - 1;
        return n > 0 ? this.conditionStack.pop() : this.conditionStack[0];
      },
      // produce the lexer rule set which is active for the currently active lexer condition state
      _currentRules: function() {
        return this.conditionStack.length && this.conditionStack[this.conditionStack.length - 1] ? this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules : this.conditions.INITIAL.rules;
      },
      // return the currently active lexer condition state; when an index argument is provided it produces the N-th previous condition state, if available
      topState: function(n) {
        return n = this.conditionStack.length - 1 - Math.abs(n || 0), n >= 0 ? this.conditionStack[n] : "INITIAL";
      },
      // alias for begin(condition)
      pushState: function(n) {
        this.begin(n);
      },
      // return the number of states currently on the stack
      stateStackSize: function() {
        return this.conditionStack.length;
      },
      options: { "case-insensitive": !0 },
      performAction: function(n, s, a, l) {
        switch (a) {
          case 0:
            return this.begin("open_directive"), 29;
          case 1:
            return this.begin("type_directive"), 30;
          case 2:
            return this.popState(), this.begin("arg_directive"), 24;
          case 3:
            return this.popState(), this.popState(), 32;
          case 4:
            return 31;
          case 5:
            break;
          case 6:
            break;
          case 7:
            return 26;
          case 8:
            break;
          case 9:
            break;
          case 10:
            return this.begin("title"), 13;
          case 11:
            return this.popState(), "title_value";
          case 12:
            return this.begin("acc_title"), 15;
          case 13:
            return this.popState(), "acc_title_value";
          case 14:
            return this.begin("acc_descr"), 17;
          case 15:
            return this.popState(), "acc_descr_value";
          case 16:
            this.begin("acc_descr_multiline");
            break;
          case 17:
            this.popState();
            break;
          case 18:
            return "acc_descr_multiline_value";
          case 19:
            this.begin("string");
            break;
          case 20:
            this.popState();
            break;
          case 21:
            return "txt";
          case 22:
            return 6;
          case 23:
            return 8;
          case 24:
            return "value";
          case 25:
            return 28;
        }
      },
      rules: [/^(?:%%\{)/i, /^(?:((?:(?!\}%%)[^:.])*))/i, /^(?::)/i, /^(?:\}%%)/i, /^(?:((?:(?!\}%%).|\n)*))/i, /^(?:%%(?!\{)[^\n]*)/i, /^(?:[^\}]%%[^\n]*)/i, /^(?:[\n\r]+)/i, /^(?:%%[^\n]*)/i, /^(?:[\s]+)/i, /^(?:title\b)/i, /^(?:(?!\n||)*[^\n]*)/i, /^(?:accTitle\s*:\s*)/i, /^(?:(?!\n||)*[^\n]*)/i, /^(?:accDescr\s*:\s*)/i, /^(?:(?!\n||)*[^\n]*)/i, /^(?:accDescr\s*\{\s*)/i, /^(?:[\}])/i, /^(?:[^\}]*)/i, /^(?:["])/i, /^(?:["])/i, /^(?:[^"]*)/i, /^(?:pie\b)/i, /^(?:showData\b)/i, /^(?::[\s]*[\d]+(?:\.[\d]+)?)/i, /^(?:$)/i],
      conditions: { acc_descr_multiline: { rules: [17, 18], inclusive: !1 }, acc_descr: { rules: [15], inclusive: !1 }, acc_title: { rules: [13], inclusive: !1 }, close_directive: { rules: [], inclusive: !1 }, arg_directive: { rules: [3, 4], inclusive: !1 }, type_directive: { rules: [2, 3], inclusive: !1 }, open_directive: { rules: [1], inclusive: !1 }, title: { rules: [11], inclusive: !1 }, string: { rules: [20, 21], inclusive: !1 }, INITIAL: { rules: [0, 5, 6, 7, 8, 9, 10, 12, 14, 16, 19, 22, 23, 24, 25], inclusive: !0 } }
    };
    return m;
  }();
  N.lexer = S;
  function A() {
    this.yy = {};
  }
  return A.prototype = N, N.Parser = A, new A();
}();
K.parser = K;
const $t = K, rt = ot.pie, U = {
  sections: {},
  showData: !1,
  config: rt
};
let Y = U.sections, Q = U.showData;
const Tt = structuredClone(rt), It = () => structuredClone(Tt), Vt = (t, c, d) => {
  dt(void 0, t, c, d);
}, Ct = () => {
  Y = structuredClone(U.sections), Q = U.showData, _t();
}, Ot = (t, c) => {
  t = mt(t, nt()), Y[t] === void 0 && (Y[t] = c, st.debug(`added new section: ${t}, with value: ${c}`));
}, Pt = () => Y, Nt = (t) => (t.substring(0, 1) === ":" && (t = t.substring(1).trim()), Number(t.trim())), Ft = (t) => {
  Q = t;
}, Lt = () => Q, zt = {
  getConfig: It,
  parseDirective: Vt,
  clear: Ct,
  setDiagramTitle: ht,
  getDiagramTitle: ut,
  setAccTitle: pt,
  getAccTitle: ft,
  setAccDescription: yt,
  getAccDescription: gt,
  addSection: Ot,
  getSections: Pt,
  cleanupValue: Nt,
  setShowData: Ft,
  getShowData: Lt
}, Rt = (t) => `
  .pieCircle{
    stroke: ${t.pieStrokeColor};
    stroke-width : ${t.pieStrokeWidth};
    opacity : ${t.pieOpacity};
  }
  .pieOuterCircle{
    stroke: ${t.pieOuterStrokeColor};
    stroke-width: ${t.pieOuterStrokeWidth};
    fill: none;
  }
  .pieTitleText {
    text-anchor: middle;
    font-size: ${t.pieTitleTextSize};
    fill: ${t.pieTitleTextColor};
    font-family: ${t.fontFamily};
  }
  .slice {
    font-family: ${t.fontFamily};
    fill: ${t.pieSectionTextColor};
    font-size:${t.pieSectionTextSize};
    // fill: white;
  }
  .legend text {
    fill: ${t.pieLegendTextColor};
    font-family: ${t.fontFamily};
    font-size: ${t.pieLegendTextSize};
  }
`, jt = Rt, Mt = (t) => {
  const c = Object.entries(t).map(
    (g) => ({
      label: g[0],
      value: g[1]
    })
  );
  return Dt().value(
    (g) => g.value
  )(c);
}, Wt = (t, c, d, g) => {
  var a, l;
  st.debug(`rendering pie chart
` + t);
  const k = g.db, b = nt(), h = vt(k.getConfig(), b.pie), r = 450, u = ((l = (a = document.getElementById(c)) == null ? void 0 : a.parentElement) == null ? void 0 : l.offsetWidth) ?? h.useWidth, p = kt(c);
  p.attr("viewBox", `0 0 ${u} ${r}`), bt(p, r, u, h.useMaxWidth);
  const I = 40, x = 18, D = 4, _ = p.append("g");
  _.attr("transform", "translate(" + u / 2 + "," + r / 2 + ")");
  const { themeVariables: o } = b;
  let [$] = xt(o.pieOuterStrokeWidth);
  $ ?? ($ = 2);
  const V = h.textPosition, w = Math.min(u, r) / 2 - I, P = it().innerRadius(0).outerRadius(w), N = it().innerRadius(w * V).outerRadius(w * V);
  _.append("circle").attr("cx", 0).attr("cy", 0).attr("r", w + $ / 2).attr("class", "pieOuterCircle");
  const S = k.getSections(), A = Mt(S), m = [
    o.pie1,
    o.pie2,
    o.pie3,
    o.pie4,
    o.pie5,
    o.pie6,
    o.pie7,
    o.pie8,
    o.pie9,
    o.pie10,
    o.pie11,
    o.pie12
  ], e = St(m);
  _.selectAll("mySlices").data(A).enter().append("path").attr("d", P).attr("fill", (i) => e(i.data.label)).attr("class", "pieCircle");
  let n = 0;
  Object.keys(S).forEach((i) => {
    n += S[i];
  }), _.selectAll("mySlices").data(A).enter().append("text").text((i) => (i.data.value / n * 100).toFixed(0) + "%").attr("transform", (i) => "translate(" + N.centroid(i) + ")").style("text-anchor", "middle").attr("class", "slice"), _.append("text").text(k.getDiagramTitle()).attr("x", 0).attr("y", -(r - 50) / 2).attr("class", "pieTitleText");
  const s = _.selectAll(".legend").data(e.domain()).enter().append("g").attr("class", "legend").attr("transform", (i, T) => {
    const f = x + D, R = f * e.domain().length / 2, M = 12 * x, B = T * f - R;
    return "translate(" + M + "," + B + ")";
  });
  s.append("rect").attr("width", x).attr("height", x).style("fill", e).style("stroke", e), s.data(A).append("text").attr("x", x + D).attr("y", x - D).text((i) => {
    const { label: T, value: f } = i.data;
    return k.getShowData() ? `${T} [${f}]` : T;
  });
}, Gt = { draw: Wt }, Ht = {
  parser: $t,
  db: zt,
  renderer: Gt,
  styles: jt
};
export {
  Ht as diagram
};
