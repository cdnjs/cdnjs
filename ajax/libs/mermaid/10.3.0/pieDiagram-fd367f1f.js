import { V as it, c as Y, s as ut, g as ft, B as pt, D as yt, a as dt, b as gt, m as mt, f as _t, l as J, E as vt, j as nt, k as bt, W as kt } from "./mermaid-42f7bf2b.js";
import { o as xt } from "./ordinal-5695958c.js";
import { a as St } from "./array-2ff2c7a6.js";
import { c as M } from "./constant-2fe7eae5.js";
import { d as lt } from "./arc-da8fd8d8.js";
import "./init-f9637058.js";
function wt(t, u) {
  return u < t ? -1 : u > t ? 1 : u >= t ? 0 : NaN;
}
function At(t) {
  return t;
}
function Et() {
  var t = At, u = wt, v = null, b = M(0), E = M(it), d = M(0);
  function o(a) {
    var h, p = (a = St(a)).length, D, C, k = 0, $ = new Array(p), S = new Array(p), w = +b.apply(this, arguments), W = Math.min(it, Math.max(-it, E.apply(this, arguments) - w)), N, V = Math.min(Math.abs(W) / p, d.apply(this, arguments)), I = V * (W < 0 ? -1 : 1), g;
    for (h = 0; h < p; ++h)
      (g = S[$[h] = h] = +t(a[h], h, a)) > 0 && (k += g);
    for (u != null ? $.sort(function(A, m) {
      return u(S[A], S[m]);
    }) : v != null && $.sort(function(A, m) {
      return v(a[A], a[m]);
    }), h = 0, C = k ? (W - p * I) / k : 0; h < p; ++h, w = N)
      D = $[h], g = S[D], N = w + (g > 0 ? g * C : 0) + I, S[D] = {
        data: a[D],
        index: h,
        value: g,
        startAngle: w,
        endAngle: N,
        padAngle: V
      };
    return S;
  }
  return o.value = function(a) {
    return arguments.length ? (t = typeof a == "function" ? a : M(+a), o) : t;
  }, o.sortValues = function(a) {
    return arguments.length ? (u = a, v = null, o) : u;
  }, o.sort = function(a) {
    return arguments.length ? (v = a, u = null, o) : v;
  }, o.startAngle = function(a) {
    return arguments.length ? (b = typeof a == "function" ? a : M(+a), o) : b;
  }, o.endAngle = function(a) {
    return arguments.length ? (E = typeof a == "function" ? a : M(+a), o) : E;
  }, o.padAngle = function(a) {
    return arguments.length ? (d = typeof a == "function" ? a : M(+a), o) : d;
  }, o;
}
var st = function() {
  var t = function(m, e, i, r) {
    for (i = i || {}, r = m.length; r--; i[m[r]] = e)
      ;
    return i;
  }, u = [1, 4], v = [1, 5], b = [1, 6], E = [1, 7], d = [1, 9], o = [1, 11, 13, 15, 17, 19, 20, 26, 27, 28, 29], a = [2, 5], h = [1, 6, 11, 13, 15, 17, 19, 20, 26, 27, 28, 29], p = [26, 27, 28], D = [2, 8], C = [1, 18], k = [1, 19], $ = [1, 20], S = [1, 21], w = [1, 22], W = [1, 23], N = [1, 28], V = [6, 26, 27, 28, 29], I = {
    trace: function() {
    },
    yy: {},
    symbols_: { error: 2, start: 3, eol: 4, directive: 5, PIE: 6, document: 7, showData: 8, line: 9, statement: 10, txt: 11, value: 12, title: 13, title_value: 14, acc_title: 15, acc_title_value: 16, acc_descr: 17, acc_descr_value: 18, acc_descr_multiline_value: 19, section: 20, openDirective: 21, typeDirective: 22, closeDirective: 23, ":": 24, argDirective: 25, NEWLINE: 26, ";": 27, EOF: 28, open_directive: 29, type_directive: 30, arg_directive: 31, close_directive: 32, $accept: 0, $end: 1 },
    terminals_: { 2: "error", 6: "PIE", 8: "showData", 11: "txt", 12: "value", 13: "title", 14: "title_value", 15: "acc_title", 16: "acc_title_value", 17: "acc_descr", 18: "acc_descr_value", 19: "acc_descr_multiline_value", 20: "section", 24: ":", 26: "NEWLINE", 27: ";", 28: "EOF", 29: "open_directive", 30: "type_directive", 31: "arg_directive", 32: "close_directive" },
    productions_: [0, [3, 2], [3, 2], [3, 2], [3, 3], [7, 0], [7, 2], [9, 2], [10, 0], [10, 2], [10, 2], [10, 2], [10, 2], [10, 1], [10, 1], [10, 1], [5, 3], [5, 5], [4, 1], [4, 1], [4, 1], [21, 1], [22, 1], [25, 1], [23, 1]],
    performAction: function(e, i, r, n, l, s, c) {
      var f = s.length - 1;
      switch (l) {
        case 4:
          n.setShowData(!0);
          break;
        case 7:
          this.$ = s[f - 1];
          break;
        case 9:
          n.addSection(s[f - 1], n.cleanupValue(s[f]));
          break;
        case 10:
          this.$ = s[f].trim(), n.setDiagramTitle(this.$);
          break;
        case 11:
          this.$ = s[f].trim(), n.setAccTitle(this.$);
          break;
        case 12:
        case 13:
          this.$ = s[f].trim(), n.setAccDescription(this.$);
          break;
        case 14:
          n.addSection(s[f].substr(8)), this.$ = s[f].substr(8);
          break;
        case 21:
          n.parseDirective("%%{", "open_directive");
          break;
        case 22:
          n.parseDirective(s[f], "type_directive");
          break;
        case 23:
          s[f] = s[f].trim().replace(/'/g, '"'), n.parseDirective(s[f], "arg_directive");
          break;
        case 24:
          n.parseDirective("}%%", "close_directive", "pie");
          break;
      }
    },
    table: [{ 3: 1, 4: 2, 5: 3, 6: u, 21: 8, 26: v, 27: b, 28: E, 29: d }, { 1: [3] }, { 3: 10, 4: 2, 5: 3, 6: u, 21: 8, 26: v, 27: b, 28: E, 29: d }, { 3: 11, 4: 2, 5: 3, 6: u, 21: 8, 26: v, 27: b, 28: E, 29: d }, t(o, a, { 7: 12, 8: [1, 13] }), t(h, [2, 18]), t(h, [2, 19]), t(h, [2, 20]), { 22: 14, 30: [1, 15] }, { 30: [2, 21] }, { 1: [2, 1] }, { 1: [2, 2] }, t(p, D, { 21: 8, 9: 16, 10: 17, 5: 24, 1: [2, 3], 11: C, 13: k, 15: $, 17: S, 19: w, 20: W, 29: d }), t(o, a, { 7: 25 }), { 23: 26, 24: [1, 27], 32: N }, t([24, 32], [2, 22]), t(o, [2, 6]), { 4: 29, 26: v, 27: b, 28: E }, { 12: [1, 30] }, { 14: [1, 31] }, { 16: [1, 32] }, { 18: [1, 33] }, t(p, [2, 13]), t(p, [2, 14]), t(p, [2, 15]), t(p, D, { 21: 8, 9: 16, 10: 17, 5: 24, 1: [2, 4], 11: C, 13: k, 15: $, 17: S, 19: w, 20: W, 29: d }), t(V, [2, 16]), { 25: 34, 31: [1, 35] }, t(V, [2, 24]), t(o, [2, 7]), t(p, [2, 9]), t(p, [2, 10]), t(p, [2, 11]), t(p, [2, 12]), { 23: 36, 32: N }, { 32: [2, 23] }, t(V, [2, 17])],
    defaultActions: { 9: [2, 21], 10: [2, 1], 11: [2, 2], 35: [2, 23] },
    parseError: function(e, i) {
      if (i.recoverable)
        this.trace(e);
      else {
        var r = new Error(e);
        throw r.hash = i, r;
      }
    },
    parse: function(e) {
      var i = this, r = [0], n = [], l = [null], s = [], c = this.table, f = "", F = 0, U = 0, Q = 2, q = 1, ct = s.slice.call(arguments, 1), y = Object.create(this.lexer), j = { yy: {} };
      for (var X in this.yy)
        Object.prototype.hasOwnProperty.call(this.yy, X) && (j.yy[X] = this.yy[X]);
      y.setInput(e, j.yy), j.yy.lexer = y, j.yy.parser = this, typeof y.yylloc > "u" && (y.yylloc = {});
      var Z = y.yylloc;
      s.push(Z);
      var ot = y.options && y.options.ranges;
      typeof j.yy.parseError == "function" ? this.parseError = j.yy.parseError : this.parseError = Object.getPrototypeOf(this).parseError;
      function ht() {
        var P;
        return P = n.pop() || y.lex() || q, typeof P != "number" && (P instanceof Array && (n = P, P = n.pop()), P = i.symbols_[P] || P), P;
      }
      for (var _, z, x, tt, R = {}, G, O, at, H; ; ) {
        if (z = r[r.length - 1], this.defaultActions[z] ? x = this.defaultActions[z] : ((_ === null || typeof _ > "u") && (_ = ht()), x = c[z] && c[z][_]), typeof x > "u" || !x.length || !x[0]) {
          var et = "";
          H = [];
          for (G in c[z])
            this.terminals_[G] && G > Q && H.push("'" + this.terminals_[G] + "'");
          y.showPosition ? et = "Parse error on line " + (F + 1) + `:
` + y.showPosition() + `
Expecting ` + H.join(", ") + ", got '" + (this.terminals_[_] || _) + "'" : et = "Parse error on line " + (F + 1) + ": Unexpected " + (_ == q ? "end of input" : "'" + (this.terminals_[_] || _) + "'"), this.parseError(et, {
            text: y.match,
            token: this.terminals_[_] || _,
            line: y.yylineno,
            loc: Z,
            expected: H
          });
        }
        if (x[0] instanceof Array && x.length > 1)
          throw new Error("Parse Error: multiple actions possible at state: " + z + ", token: " + _);
        switch (x[0]) {
          case 1:
            r.push(_), l.push(y.yytext), s.push(y.yylloc), r.push(x[1]), _ = null, U = y.yyleng, f = y.yytext, F = y.yylineno, Z = y.yylloc;
            break;
          case 2:
            if (O = this.productions_[x[1]][1], R.$ = l[l.length - O], R._$ = {
              first_line: s[s.length - (O || 1)].first_line,
              last_line: s[s.length - 1].last_line,
              first_column: s[s.length - (O || 1)].first_column,
              last_column: s[s.length - 1].last_column
            }, ot && (R._$.range = [
              s[s.length - (O || 1)].range[0],
              s[s.length - 1].range[1]
            ]), tt = this.performAction.apply(R, [
              f,
              U,
              F,
              j.yy,
              x[1],
              l,
              s
            ].concat(ct)), typeof tt < "u")
              return tt;
            O && (r = r.slice(0, -1 * O * 2), l = l.slice(0, -1 * O), s = s.slice(0, -1 * O)), r.push(this.productions_[x[1]][0]), l.push(R.$), s.push(R._$), at = c[r[r.length - 2]][r[r.length - 1]], r.push(at);
            break;
          case 3:
            return !0;
        }
      }
      return !0;
    }
  }, g = function() {
    var m = {
      EOF: 1,
      parseError: function(i, r) {
        if (this.yy.parser)
          this.yy.parser.parseError(i, r);
        else
          throw new Error(i);
      },
      // resets the lexer, sets new input
      setInput: function(e, i) {
        return this.yy = i || this.yy || {}, this._input = e, this._more = this._backtrack = this.done = !1, this.yylineno = this.yyleng = 0, this.yytext = this.matched = this.match = "", this.conditionStack = ["INITIAL"], this.yylloc = {
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
        var i = e.match(/(?:\r\n?|\n).*/g);
        return i ? (this.yylineno++, this.yylloc.last_line++) : this.yylloc.last_column++, this.options.ranges && this.yylloc.range[1]++, this._input = this._input.slice(1), e;
      },
      // unshifts one char (or a string) into the input
      unput: function(e) {
        var i = e.length, r = e.split(/(?:\r\n?|\n)/g);
        this._input = e + this._input, this.yytext = this.yytext.substr(0, this.yytext.length - i), this.offset -= i;
        var n = this.match.split(/(?:\r\n?|\n)/g);
        this.match = this.match.substr(0, this.match.length - 1), this.matched = this.matched.substr(0, this.matched.length - 1), r.length - 1 && (this.yylineno -= r.length - 1);
        var l = this.yylloc.range;
        return this.yylloc = {
          first_line: this.yylloc.first_line,
          last_line: this.yylineno + 1,
          first_column: this.yylloc.first_column,
          last_column: r ? (r.length === n.length ? this.yylloc.first_column : 0) + n[n.length - r.length].length - r[0].length : this.yylloc.first_column - i
        }, this.options.ranges && (this.yylloc.range = [l[0], l[0] + this.yyleng - i]), this.yyleng = this.yytext.length, this;
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
        var e = this.pastInput(), i = new Array(e.length + 1).join("-");
        return e + this.upcomingInput() + `
` + i + "^";
      },
      // test the lexed token: return FALSE when not a match, otherwise return token
      test_match: function(e, i) {
        var r, n, l;
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
        }, this.options.ranges && (l.yylloc.range = this.yylloc.range.slice(0))), n = e[0].match(/(?:\r\n?|\n).*/g), n && (this.yylineno += n.length), this.yylloc = {
          first_line: this.yylloc.last_line,
          last_line: this.yylineno + 1,
          first_column: this.yylloc.last_column,
          last_column: n ? n[n.length - 1].length - n[n.length - 1].match(/\r?\n?/)[0].length : this.yylloc.last_column + e[0].length
        }, this.yytext += e[0], this.match += e[0], this.matches = e, this.yyleng = this.yytext.length, this.options.ranges && (this.yylloc.range = [this.offset, this.offset += this.yyleng]), this._more = !1, this._backtrack = !1, this._input = this._input.slice(e[0].length), this.matched += e[0], r = this.performAction.call(this, this.yy, this, i, this.conditionStack[this.conditionStack.length - 1]), this.done && this._input && (this.done = !1), r)
          return r;
        if (this._backtrack) {
          for (var s in l)
            this[s] = l[s];
          return !1;
        }
        return !1;
      },
      // return next match in input
      next: function() {
        if (this.done)
          return this.EOF;
        this._input || (this.done = !0);
        var e, i, r, n;
        this._more || (this.yytext = "", this.match = "");
        for (var l = this._currentRules(), s = 0; s < l.length; s++)
          if (r = this._input.match(this.rules[l[s]]), r && (!i || r[0].length > i[0].length)) {
            if (i = r, n = s, this.options.backtrack_lexer) {
              if (e = this.test_match(r, l[s]), e !== !1)
                return e;
              if (this._backtrack) {
                i = !1;
                continue;
              } else
                return !1;
            } else if (!this.options.flex)
              break;
          }
        return i ? (e = this.test_match(i, l[n]), e !== !1 ? e : !1) : this._input === "" ? this.EOF : this.parseError("Lexical error on line " + (this.yylineno + 1) + `. Unrecognized text.
` + this.showPosition(), {
          text: "",
          token: null,
          line: this.yylineno
        });
      },
      // return next match that has a token
      lex: function() {
        var i = this.next();
        return i || this.lex();
      },
      // activates a new lexer condition state (pushes the new lexer condition state onto the condition stack)
      begin: function(i) {
        this.conditionStack.push(i);
      },
      // pop the previously active lexer condition state off the condition stack
      popState: function() {
        var i = this.conditionStack.length - 1;
        return i > 0 ? this.conditionStack.pop() : this.conditionStack[0];
      },
      // produce the lexer rule set which is active for the currently active lexer condition state
      _currentRules: function() {
        return this.conditionStack.length && this.conditionStack[this.conditionStack.length - 1] ? this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules : this.conditions.INITIAL.rules;
      },
      // return the currently active lexer condition state; when an index argument is provided it produces the N-th previous condition state, if available
      topState: function(i) {
        return i = this.conditionStack.length - 1 - Math.abs(i || 0), i >= 0 ? this.conditionStack[i] : "INITIAL";
      },
      // alias for begin(condition)
      pushState: function(i) {
        this.begin(i);
      },
      // return the number of states currently on the stack
      stateStackSize: function() {
        return this.conditionStack.length;
      },
      options: { "case-insensitive": !0 },
      performAction: function(i, r, n, l) {
        switch (n) {
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
  I.lexer = g;
  function A() {
    this.yy = {};
  }
  return A.prototype = I, I.Parser = A, new A();
}();
st.parser = st;
const Dt = st;
let K = {}, rt = !1;
const Tt = function(t, u, v) {
  mt.parseDirective(this, t, u, v);
}, $t = function(t, u) {
  t = _t.sanitizeText(t, Y()), K[t] === void 0 && (K[t] = u, J.debug("Added new section :", t));
}, Vt = () => K, It = function(t) {
  rt = t;
}, Ot = function() {
  return rt;
}, Pt = function(t) {
  return t.substring(0, 1) === ":" && (t = t.substring(1).trim()), Number(t.trim());
}, Lt = function() {
  K = {}, rt = !1, vt();
}, Wt = {
  parseDirective: Tt,
  getConfig: () => Y().pie,
  addSection: $t,
  getSections: Vt,
  cleanupValue: Pt,
  clear: Lt,
  setAccTitle: ut,
  getAccTitle: ft,
  setDiagramTitle: pt,
  getDiagramTitle: yt,
  setShowData: It,
  getShowData: Ot,
  getAccDescription: dt,
  setAccDescription: gt
}, Nt = (t) => `
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
`, Ct = Nt;
let T = Y(), L;
const B = 450, Ft = (t, u, v, b) => {
  var I;
  try {
    T = Y(), J.debug(`Rendering info diagram
` + t);
    const g = Y().securityLevel;
    let A;
    g === "sandbox" && (A = nt("#i" + u));
    const m = g === "sandbox" ? nt(A.nodes()[0].contentDocument.body) : nt("body"), i = (g === "sandbox" ? A.nodes()[0].contentDocument : document).getElementById(u);
    L = i.parentElement.offsetWidth, L === void 0 && (L = 1200), T.useWidth !== void 0 && (L = T.useWidth), T.pie.useWidth !== void 0 && (L = T.pie.useWidth);
    const r = m.select("#" + u);
    bt(r, B, L, T.pie.useMaxWidth), i.setAttribute("viewBox", "0 0 " + L + " " + B);
    var E = 40, d = 18, o = 4, a = Math.min(L, B) / 2 - E, h = r.append("g").attr("transform", "translate(" + L / 2 + "," + B / 2 + ")"), p = b.db.getSections(), D = 0;
    Object.keys(p).forEach(function(c) {
      D += p[c];
    });
    const n = T.themeVariables;
    var C = [
      n.pie1,
      n.pie2,
      n.pie3,
      n.pie4,
      n.pie5,
      n.pie6,
      n.pie7,
      n.pie8,
      n.pie9,
      n.pie10,
      n.pie11,
      n.pie12
    ];
    const l = ((I = T.pie) == null ? void 0 : I.textPosition) ?? 0.75;
    let [s] = kt(n.pieOuterStrokeWidth);
    s ?? (s = 2);
    var k = xt().range(C), $ = Object.entries(p).map(function(c, f) {
      return {
        order: f,
        name: c[0],
        value: c[1]
      };
    }), S = Et().value(function(c) {
      return c.value;
    }).sort(function(c, f) {
      return c.order - f.order;
    }), w = S($), W = lt().innerRadius(0).outerRadius(a), N = lt().innerRadius(a * l).outerRadius(a * l);
    h.append("circle").attr("cx", 0).attr("cy", 0).attr("r", a + s / 2).attr("class", "pieOuterCircle"), h.selectAll("mySlices").data(w).enter().append("path").attr("d", W).attr("fill", function(c) {
      return k(c.data.name);
    }).attr("class", "pieCircle"), h.selectAll("mySlices").data(w).enter().append("text").text(function(c) {
      return (c.data.value / D * 100).toFixed(0) + "%";
    }).attr("transform", function(c) {
      return "translate(" + N.centroid(c) + ")";
    }).style("text-anchor", "middle").attr("class", "slice"), h.append("text").text(b.db.getDiagramTitle()).attr("x", 0).attr("y", -(B - 50) / 2).attr("class", "pieTitleText");
    var V = h.selectAll(".legend").data(k.domain()).enter().append("g").attr("class", "legend").attr("transform", function(c, f) {
      const F = d + o, U = F * k.domain().length / 2, Q = 12 * d, q = f * F - U;
      return "translate(" + Q + "," + q + ")";
    });
    V.append("rect").attr("width", d).attr("height", d).style("fill", k).style("stroke", k), V.data(w).append("text").attr("x", d + o).attr("y", d - o).text(function(c) {
      return b.db.getShowData() || T.showData || T.pie.showData ? c.data.name + " [" + c.data.value + "]" : c.data.name;
    });
  } catch (g) {
    J.error("Error while rendering info diagram"), J.error(g);
  }
}, jt = {
  draw: Ft
}, qt = {
  parser: Dt,
  db: Wt,
  renderer: jt,
  styles: Ct
};
export {
  qt as diagram
};
