import { Z as se, l as L, D as ye, A as Ee, o as _e, c as we, j as H, k as De } from "./mermaid-a09fe7cd.js";
import { c as Ne } from "./clone-e2cbe4d9.js";
import { c as Ie } from "./channel-b111d153.js";
import { h as Oe, f as Te, j as ze, e as ge, p as Ce, a as Ae } from "./edges-a720f28b.js";
import { G as Re } from "./graph-940f1512.js";
import { o as ve } from "./ordinal-5695958c.js";
import { d as Be } from "./Tableau10-558cc280.js";
import "./createText-e916aecc.js";
import "./line-0f31738a.js";
import "./array-2ff2c7a6.js";
import "./path-428ebac9.js";
import "./init-f9637058.js";
var ee = function() {
  var e = function(D, l, s, r) {
    for (s = s || {}, r = D.length; r--; s[D[r]] = l)
      ;
    return s;
  }, c = [1, 7], u = [1, 13], a = [1, 14], i = [1, 15], g = [1, 19], o = [1, 16], p = [1, 17], f = [1, 18], m = [8, 30], S = [8, 21, 28, 29, 30, 31, 32, 40, 44, 47], E = [1, 23], z = [1, 24], I = [8, 15, 16, 21, 28, 29, 30, 31, 32, 40, 44, 47], w = [8, 15, 16, 21, 27, 28, 29, 30, 31, 32, 40, 44, 47], C = [1, 49], y = {
    trace: function() {
    },
    yy: {},
    symbols_: { error: 2, spaceLines: 3, SPACELINE: 4, NL: 5, seperator: 6, SPACE: 7, EOF: 8, start: 9, BLOCK_DIAGRAM_KEY: 10, document: 11, stop: 12, statement: 13, link: 14, LINK: 15, START_LINK: 16, LINK_LABEL: 17, STR: 18, nodeStatement: 19, columnsStatement: 20, SPACE_BLOCK: 21, blockStatement: 22, classDefStatement: 23, cssClassStatement: 24, styleStatement: 25, node: 26, SIZE: 27, COLUMNS: 28, "id-block": 29, end: 30, block: 31, NODE_ID: 32, nodeShapeNLabel: 33, dirList: 34, DIR: 35, NODE_DSTART: 36, NODE_DEND: 37, BLOCK_ARROW_START: 38, BLOCK_ARROW_END: 39, classDef: 40, CLASSDEF_ID: 41, CLASSDEF_STYLEOPTS: 42, DEFAULT: 43, class: 44, CLASSENTITY_IDS: 45, STYLECLASS: 46, style: 47, STYLE_ENTITY_IDS: 48, STYLE_DEFINITION_DATA: 49, $accept: 0, $end: 1 },
    terminals_: { 2: "error", 4: "SPACELINE", 5: "NL", 7: "SPACE", 8: "EOF", 10: "BLOCK_DIAGRAM_KEY", 15: "LINK", 16: "START_LINK", 17: "LINK_LABEL", 18: "STR", 21: "SPACE_BLOCK", 27: "SIZE", 28: "COLUMNS", 29: "id-block", 30: "end", 31: "block", 32: "NODE_ID", 35: "DIR", 36: "NODE_DSTART", 37: "NODE_DEND", 38: "BLOCK_ARROW_START", 39: "BLOCK_ARROW_END", 40: "classDef", 41: "CLASSDEF_ID", 42: "CLASSDEF_STYLEOPTS", 43: "DEFAULT", 44: "class", 45: "CLASSENTITY_IDS", 46: "STYLECLASS", 47: "style", 48: "STYLE_ENTITY_IDS", 49: "STYLE_DEFINITION_DATA" },
    productions_: [0, [3, 1], [3, 2], [3, 2], [6, 1], [6, 1], [6, 1], [9, 3], [12, 1], [12, 1], [12, 2], [12, 2], [11, 1], [11, 2], [14, 1], [14, 4], [13, 1], [13, 1], [13, 1], [13, 1], [13, 1], [13, 1], [13, 1], [19, 3], [19, 2], [19, 1], [20, 1], [22, 4], [22, 3], [26, 1], [26, 2], [34, 1], [34, 2], [33, 3], [33, 4], [23, 3], [23, 3], [24, 3], [25, 3]],
    performAction: function(l, s, r, h, d, t, x) {
      var n = t.length - 1;
      switch (d) {
        case 4:
          h.getLogger().debug("Rule: seperator (NL) ");
          break;
        case 5:
          h.getLogger().debug("Rule: seperator (Space) ");
          break;
        case 6:
          h.getLogger().debug("Rule: seperator (EOF) ");
          break;
        case 7:
          h.getLogger().debug("Rule: hierarchy: ", t[n - 1]), h.setHierarchy(t[n - 1]);
          break;
        case 8:
          h.getLogger().debug("Stop NL ");
          break;
        case 9:
          h.getLogger().debug("Stop EOF ");
          break;
        case 10:
          h.getLogger().debug("Stop NL2 ");
          break;
        case 11:
          h.getLogger().debug("Stop EOF2 ");
          break;
        case 12:
          h.getLogger().debug("Rule: statement: ", t[n]), typeof t[n].length == "number" ? this.$ = t[n] : this.$ = [t[n]];
          break;
        case 13:
          h.getLogger().debug("Rule: statement #2: ", t[n - 1]), this.$ = [t[n - 1]].concat(t[n]);
          break;
        case 14:
          h.getLogger().debug("Rule: link: ", t[n], l), this.$ = { edgeTypeStr: t[n], label: "" };
          break;
        case 15:
          h.getLogger().debug("Rule: LABEL link: ", t[n - 3], t[n - 1], t[n]), this.$ = { edgeTypeStr: t[n], label: t[n - 1] };
          break;
        case 18:
          const B = parseInt(t[n]), Y = h.generateId();
          this.$ = { id: Y, type: "space", label: "", width: B, children: [] };
          break;
        case 23:
          h.getLogger().debug("Rule: (nodeStatement link node) ", t[n - 2], t[n - 1], t[n], " typestr: ", t[n - 1].edgeTypeStr);
          const F = h.edgeStrToEdgeData(t[n - 1].edgeTypeStr);
          this.$ = [
            { id: t[n - 2].id, label: t[n - 2].label, type: t[n - 2].type, directions: t[n - 2].directions },
            { id: t[n - 2].id + "-" + t[n].id, start: t[n - 2].id, end: t[n].id, label: t[n - 1].label, type: "edge", directions: t[n].directions, arrowTypeEnd: F, arrowTypeStart: "arrow_open" },
            { id: t[n].id, label: t[n].label, type: h.typeStr2Type(t[n].typeStr), directions: t[n].directions }
          ];
          break;
        case 24:
          h.getLogger().debug("Rule: nodeStatement (abc88 node size) ", t[n - 1], t[n]), this.$ = { id: t[n - 1].id, label: t[n - 1].label, type: h.typeStr2Type(t[n - 1].typeStr), directions: t[n - 1].directions, widthInColumns: parseInt(t[n], 10) };
          break;
        case 25:
          h.getLogger().debug("Rule: nodeStatement (node) ", t[n]), this.$ = { id: t[n].id, label: t[n].label, type: h.typeStr2Type(t[n].typeStr), directions: t[n].directions, widthInColumns: 1 };
          break;
        case 26:
          h.getLogger().debug("APA123", this ? this : "na"), h.getLogger().debug("COLUMNS: ", t[n]), this.$ = { type: "column-setting", columns: t[n] === "auto" ? -1 : parseInt(t[n]) };
          break;
        case 27:
          h.getLogger().debug("Rule: id-block statement : ", t[n - 2], t[n - 1]), h.generateId(), this.$ = { ...t[n - 2], type: "composite", children: t[n - 1] };
          break;
        case 28:
          h.getLogger().debug("Rule: blockStatement : ", t[n - 2], t[n - 1], t[n]);
          const R = h.generateId();
          this.$ = { id: R, type: "composite", label: "", children: t[n - 1] };
          break;
        case 29:
          h.getLogger().debug("Rule: node (NODE_ID seperator): ", t[n]), this.$ = { id: t[n] };
          break;
        case 30:
          h.getLogger().debug("Rule: node (NODE_ID nodeShapeNLabel seperator): ", t[n - 1], t[n]), this.$ = { id: t[n - 1], label: t[n].label, typeStr: t[n].typeStr, directions: t[n].directions };
          break;
        case 31:
          h.getLogger().debug("Rule: dirList: ", t[n]), this.$ = [t[n]];
          break;
        case 32:
          h.getLogger().debug("Rule: dirList: ", t[n - 1], t[n]), this.$ = [t[n - 1]].concat(t[n]);
          break;
        case 33:
          h.getLogger().debug("Rule: nodeShapeNLabel: ", t[n - 2], t[n - 1], t[n]), this.$ = { typeStr: t[n - 2] + t[n], label: t[n - 1] };
          break;
        case 34:
          h.getLogger().debug("Rule: BLOCK_ARROW nodeShapeNLabel: ", t[n - 3], t[n - 2], " #3:", t[n - 1], t[n]), this.$ = { typeStr: t[n - 3] + t[n], label: t[n - 2], directions: t[n - 1] };
          break;
        case 35:
        case 36:
          this.$ = { type: "classDef", id: t[n - 1].trim(), css: t[n].trim() };
          break;
        case 37:
          this.$ = { type: "applyClass", id: t[n - 1].trim(), styleClass: t[n].trim() };
          break;
        case 38:
          this.$ = { type: "applyStyles", id: t[n - 1].trim(), stylesStr: t[n].trim() };
          break;
      }
    },
    table: [{ 9: 1, 10: [1, 2] }, { 1: [3] }, { 11: 3, 13: 4, 19: 5, 20: 6, 21: c, 22: 8, 23: 9, 24: 10, 25: 11, 26: 12, 28: u, 29: a, 31: i, 32: g, 40: o, 44: p, 47: f }, { 8: [1, 20] }, e(m, [2, 12], { 13: 4, 19: 5, 20: 6, 22: 8, 23: 9, 24: 10, 25: 11, 26: 12, 11: 21, 21: c, 28: u, 29: a, 31: i, 32: g, 40: o, 44: p, 47: f }), e(S, [2, 16], { 14: 22, 15: E, 16: z }), e(S, [2, 17]), e(S, [2, 18]), e(S, [2, 19]), e(S, [2, 20]), e(S, [2, 21]), e(S, [2, 22]), e(I, [2, 25], { 27: [1, 25] }), e(S, [2, 26]), { 19: 26, 26: 12, 32: g }, { 11: 27, 13: 4, 19: 5, 20: 6, 21: c, 22: 8, 23: 9, 24: 10, 25: 11, 26: 12, 28: u, 29: a, 31: i, 32: g, 40: o, 44: p, 47: f }, { 41: [1, 28], 43: [1, 29] }, { 45: [1, 30] }, { 48: [1, 31] }, e(w, [2, 29], { 33: 32, 36: [1, 33], 38: [1, 34] }), { 1: [2, 7] }, e(m, [2, 13]), { 26: 35, 32: g }, { 32: [2, 14] }, { 17: [1, 36] }, e(I, [2, 24]), { 11: 37, 13: 4, 14: 22, 15: E, 16: z, 19: 5, 20: 6, 21: c, 22: 8, 23: 9, 24: 10, 25: 11, 26: 12, 28: u, 29: a, 31: i, 32: g, 40: o, 44: p, 47: f }, { 30: [1, 38] }, { 42: [1, 39] }, { 42: [1, 40] }, { 46: [1, 41] }, { 49: [1, 42] }, e(w, [2, 30]), { 18: [1, 43] }, { 18: [1, 44] }, e(I, [2, 23]), { 18: [1, 45] }, { 30: [1, 46] }, e(S, [2, 28]), e(S, [2, 35]), e(S, [2, 36]), e(S, [2, 37]), e(S, [2, 38]), { 37: [1, 47] }, { 34: 48, 35: C }, { 15: [1, 50] }, e(S, [2, 27]), e(w, [2, 33]), { 39: [1, 51] }, { 34: 52, 35: C, 39: [2, 31] }, { 32: [2, 15] }, e(w, [2, 34]), { 39: [2, 32] }],
    defaultActions: { 20: [2, 7], 23: [2, 14], 50: [2, 15], 52: [2, 32] },
    parseError: function(l, s) {
      if (s.recoverable)
        this.trace(l);
      else {
        var r = new Error(l);
        throw r.hash = s, r;
      }
    },
    parse: function(l) {
      var s = this, r = [0], h = [], d = [null], t = [], x = this.table, n = "", B = 0, Y = 0, F = 2, R = 1, xe = t.slice.call(arguments, 1), _ = Object.create(this.lexer), K = { yy: {} };
      for (var Z in this.yy)
        Object.prototype.hasOwnProperty.call(this.yy, Z) && (K.yy[Z] = this.yy[Z]);
      _.setInput(l, K.yy), K.yy.lexer = _, K.yy.parser = this, typeof _.yylloc > "u" && (_.yylloc = {});
      var J = _.yylloc;
      t.push(J);
      var me = _.options && _.options.ranges;
      typeof K.yy.parseError == "function" ? this.parseError = K.yy.parseError : this.parseError = Object.getPrototypeOf(this).parseError;
      function be() {
        var P;
        return P = h.pop() || _.lex() || R, typeof P != "number" && (P instanceof Array && (h = P, P = h.pop()), P = s.symbols_[P] || P), P;
      }
      for (var O, M, A, Q, W = {}, X, k, ae, G; ; ) {
        if (M = r[r.length - 1], this.defaultActions[M] ? A = this.defaultActions[M] : ((O === null || typeof O > "u") && (O = be()), A = x[M] && x[M][O]), typeof A > "u" || !A.length || !A[0]) {
          var $ = "";
          G = [];
          for (X in x[M])
            this.terminals_[X] && X > F && G.push("'" + this.terminals_[X] + "'");
          _.showPosition ? $ = "Parse error on line " + (B + 1) + `:
` + _.showPosition() + `
Expecting ` + G.join(", ") + ", got '" + (this.terminals_[O] || O) + "'" : $ = "Parse error on line " + (B + 1) + ": Unexpected " + (O == R ? "end of input" : "'" + (this.terminals_[O] || O) + "'"), this.parseError($, {
            text: _.match,
            token: this.terminals_[O] || O,
            line: _.yylineno,
            loc: J,
            expected: G
          });
        }
        if (A[0] instanceof Array && A.length > 1)
          throw new Error("Parse Error: multiple actions possible at state: " + M + ", token: " + O);
        switch (A[0]) {
          case 1:
            r.push(O), d.push(_.yytext), t.push(_.yylloc), r.push(A[1]), O = null, Y = _.yyleng, n = _.yytext, B = _.yylineno, J = _.yylloc;
            break;
          case 2:
            if (k = this.productions_[A[1]][1], W.$ = d[d.length - k], W._$ = {
              first_line: t[t.length - (k || 1)].first_line,
              last_line: t[t.length - 1].last_line,
              first_column: t[t.length - (k || 1)].first_column,
              last_column: t[t.length - 1].last_column
            }, me && (W._$.range = [
              t[t.length - (k || 1)].range[0],
              t[t.length - 1].range[1]
            ]), Q = this.performAction.apply(W, [
              n,
              Y,
              B,
              K.yy,
              A[1],
              d,
              t
            ].concat(xe)), typeof Q < "u")
              return Q;
            k && (r = r.slice(0, -1 * k * 2), d = d.slice(0, -1 * k), t = t.slice(0, -1 * k)), r.push(this.productions_[A[1]][0]), d.push(W.$), t.push(W._$), ae = x[r[r.length - 2]][r[r.length - 1]], r.push(ae);
            break;
          case 3:
            return !0;
        }
      }
      return !0;
    }
  }, v = function() {
    var D = {
      EOF: 1,
      parseError: function(s, r) {
        if (this.yy.parser)
          this.yy.parser.parseError(s, r);
        else
          throw new Error(s);
      },
      // resets the lexer, sets new input
      setInput: function(l, s) {
        return this.yy = s || this.yy || {}, this._input = l, this._more = this._backtrack = this.done = !1, this.yylineno = this.yyleng = 0, this.yytext = this.matched = this.match = "", this.conditionStack = ["INITIAL"], this.yylloc = {
          first_line: 1,
          first_column: 0,
          last_line: 1,
          last_column: 0
        }, this.options.ranges && (this.yylloc.range = [0, 0]), this.offset = 0, this;
      },
      // consumes and returns one char from the input
      input: function() {
        var l = this._input[0];
        this.yytext += l, this.yyleng++, this.offset++, this.match += l, this.matched += l;
        var s = l.match(/(?:\r\n?|\n).*/g);
        return s ? (this.yylineno++, this.yylloc.last_line++) : this.yylloc.last_column++, this.options.ranges && this.yylloc.range[1]++, this._input = this._input.slice(1), l;
      },
      // unshifts one char (or a string) into the input
      unput: function(l) {
        var s = l.length, r = l.split(/(?:\r\n?|\n)/g);
        this._input = l + this._input, this.yytext = this.yytext.substr(0, this.yytext.length - s), this.offset -= s;
        var h = this.match.split(/(?:\r\n?|\n)/g);
        this.match = this.match.substr(0, this.match.length - 1), this.matched = this.matched.substr(0, this.matched.length - 1), r.length - 1 && (this.yylineno -= r.length - 1);
        var d = this.yylloc.range;
        return this.yylloc = {
          first_line: this.yylloc.first_line,
          last_line: this.yylineno + 1,
          first_column: this.yylloc.first_column,
          last_column: r ? (r.length === h.length ? this.yylloc.first_column : 0) + h[h.length - r.length].length - r[0].length : this.yylloc.first_column - s
        }, this.options.ranges && (this.yylloc.range = [d[0], d[0] + this.yyleng - s]), this.yyleng = this.yytext.length, this;
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
      less: function(l) {
        this.unput(this.match.slice(l));
      },
      // displays already matched input, i.e. for error messages
      pastInput: function() {
        var l = this.matched.substr(0, this.matched.length - this.match.length);
        return (l.length > 20 ? "..." : "") + l.substr(-20).replace(/\n/g, "");
      },
      // displays upcoming input, i.e. for error messages
      upcomingInput: function() {
        var l = this.match;
        return l.length < 20 && (l += this._input.substr(0, 20 - l.length)), (l.substr(0, 20) + (l.length > 20 ? "..." : "")).replace(/\n/g, "");
      },
      // displays the character position where the lexing error occurred, i.e. for error messages
      showPosition: function() {
        var l = this.pastInput(), s = new Array(l.length + 1).join("-");
        return l + this.upcomingInput() + `
` + s + "^";
      },
      // test the lexed token: return FALSE when not a match, otherwise return token
      test_match: function(l, s) {
        var r, h, d;
        if (this.options.backtrack_lexer && (d = {
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
        }, this.options.ranges && (d.yylloc.range = this.yylloc.range.slice(0))), h = l[0].match(/(?:\r\n?|\n).*/g), h && (this.yylineno += h.length), this.yylloc = {
          first_line: this.yylloc.last_line,
          last_line: this.yylineno + 1,
          first_column: this.yylloc.last_column,
          last_column: h ? h[h.length - 1].length - h[h.length - 1].match(/\r?\n?/)[0].length : this.yylloc.last_column + l[0].length
        }, this.yytext += l[0], this.match += l[0], this.matches = l, this.yyleng = this.yytext.length, this.options.ranges && (this.yylloc.range = [this.offset, this.offset += this.yyleng]), this._more = !1, this._backtrack = !1, this._input = this._input.slice(l[0].length), this.matched += l[0], r = this.performAction.call(this, this.yy, this, s, this.conditionStack[this.conditionStack.length - 1]), this.done && this._input && (this.done = !1), r)
          return r;
        if (this._backtrack) {
          for (var t in d)
            this[t] = d[t];
          return !1;
        }
        return !1;
      },
      // return next match in input
      next: function() {
        if (this.done)
          return this.EOF;
        this._input || (this.done = !0);
        var l, s, r, h;
        this._more || (this.yytext = "", this.match = "");
        for (var d = this._currentRules(), t = 0; t < d.length; t++)
          if (r = this._input.match(this.rules[d[t]]), r && (!s || r[0].length > s[0].length)) {
            if (s = r, h = t, this.options.backtrack_lexer) {
              if (l = this.test_match(r, d[t]), l !== !1)
                return l;
              if (this._backtrack) {
                s = !1;
                continue;
              } else
                return !1;
            } else if (!this.options.flex)
              break;
          }
        return s ? (l = this.test_match(s, d[h]), l !== !1 ? l : !1) : this._input === "" ? this.EOF : this.parseError("Lexical error on line " + (this.yylineno + 1) + `. Unrecognized text.
` + this.showPosition(), {
          text: "",
          token: null,
          line: this.yylineno
        });
      },
      // return next match that has a token
      lex: function() {
        var s = this.next();
        return s || this.lex();
      },
      // activates a new lexer condition state (pushes the new lexer condition state onto the condition stack)
      begin: function(s) {
        this.conditionStack.push(s);
      },
      // pop the previously active lexer condition state off the condition stack
      popState: function() {
        var s = this.conditionStack.length - 1;
        return s > 0 ? this.conditionStack.pop() : this.conditionStack[0];
      },
      // produce the lexer rule set which is active for the currently active lexer condition state
      _currentRules: function() {
        return this.conditionStack.length && this.conditionStack[this.conditionStack.length - 1] ? this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules : this.conditions.INITIAL.rules;
      },
      // return the currently active lexer condition state; when an index argument is provided it produces the N-th previous condition state, if available
      topState: function(s) {
        return s = this.conditionStack.length - 1 - Math.abs(s || 0), s >= 0 ? this.conditionStack[s] : "INITIAL";
      },
      // alias for begin(condition)
      pushState: function(s) {
        this.begin(s);
      },
      // return the number of states currently on the stack
      stateStackSize: function() {
        return this.conditionStack.length;
      },
      options: {},
      performAction: function(s, r, h, d) {
        switch (h) {
          case 0:
            return 10;
          case 1:
            return s.getLogger().debug("Found space-block"), 31;
          case 2:
            return s.getLogger().debug("Found nl-block"), 31;
          case 3:
            return s.getLogger().debug("Found space-block"), 29;
          case 4:
            s.getLogger().debug(".", r.yytext);
            break;
          case 5:
            s.getLogger().debug("_", r.yytext);
            break;
          case 6:
            return 5;
          case 7:
            return r.yytext = -1, 28;
          case 8:
            return r.yytext = r.yytext.replace(/columns\s+/, ""), s.getLogger().debug("COLUMNS (LEX)", r.yytext), 28;
          case 9:
            this.pushState("md_string");
            break;
          case 10:
            return "MD_STR";
          case 11:
            this.popState();
            break;
          case 12:
            this.pushState("string");
            break;
          case 13:
            s.getLogger().debug("LEX: POPPING STR:", r.yytext), this.popState();
            break;
          case 14:
            return s.getLogger().debug("LEX: STR end:", r.yytext), "STR";
          case 15:
            return r.yytext = r.yytext.replace(/space\:/, ""), s.getLogger().debug("SPACE NUM (LEX)", r.yytext), 21;
          case 16:
            return r.yytext = "1", s.getLogger().debug("COLUMNS (LEX)", r.yytext), 21;
          case 17:
            return 43;
          case 18:
            return "LINKSTYLE";
          case 19:
            return "INTERPOLATE";
          case 20:
            return this.pushState("CLASSDEF"), 40;
          case 21:
            return this.popState(), this.pushState("CLASSDEFID"), "DEFAULT_CLASSDEF_ID";
          case 22:
            return this.popState(), this.pushState("CLASSDEFID"), 41;
          case 23:
            return this.popState(), 42;
          case 24:
            return this.pushState("CLASS"), 44;
          case 25:
            return this.popState(), this.pushState("CLASS_STYLE"), 45;
          case 26:
            return this.popState(), 46;
          case 27:
            return this.pushState("STYLE_STMNT"), 47;
          case 28:
            return this.popState(), this.pushState("STYLE_DEFINITION"), 48;
          case 29:
            return this.popState(), 49;
          case 30:
            return this.pushState("acc_title"), "acc_title";
          case 31:
            return this.popState(), "acc_title_value";
          case 32:
            return this.pushState("acc_descr"), "acc_descr";
          case 33:
            return this.popState(), "acc_descr_value";
          case 34:
            this.pushState("acc_descr_multiline");
            break;
          case 35:
            this.popState();
            break;
          case 36:
            return "acc_descr_multiline_value";
          case 37:
            return 30;
          case 38:
            return this.popState(), s.getLogger().debug("Lex: (("), "NODE_DEND";
          case 39:
            return this.popState(), s.getLogger().debug("Lex: (("), "NODE_DEND";
          case 40:
            return this.popState(), s.getLogger().debug("Lex: ))"), "NODE_DEND";
          case 41:
            return this.popState(), s.getLogger().debug("Lex: (("), "NODE_DEND";
          case 42:
            return this.popState(), s.getLogger().debug("Lex: (("), "NODE_DEND";
          case 43:
            return this.popState(), s.getLogger().debug("Lex: (-"), "NODE_DEND";
          case 44:
            return this.popState(), s.getLogger().debug("Lex: -)"), "NODE_DEND";
          case 45:
            return this.popState(), s.getLogger().debug("Lex: (("), "NODE_DEND";
          case 46:
            return this.popState(), s.getLogger().debug("Lex: ]]"), "NODE_DEND";
          case 47:
            return this.popState(), s.getLogger().debug("Lex: ("), "NODE_DEND";
          case 48:
            return this.popState(), s.getLogger().debug("Lex: ])"), "NODE_DEND";
          case 49:
            return this.popState(), s.getLogger().debug("Lex: /]"), "NODE_DEND";
          case 50:
            return this.popState(), s.getLogger().debug("Lex: /]"), "NODE_DEND";
          case 51:
            return this.popState(), s.getLogger().debug("Lex: )]"), "NODE_DEND";
          case 52:
            return this.popState(), s.getLogger().debug("Lex: )"), "NODE_DEND";
          case 53:
            return this.popState(), s.getLogger().debug("Lex: ]>"), "NODE_DEND";
          case 54:
            return this.popState(), s.getLogger().debug("Lex: ]"), "NODE_DEND";
          case 55:
            return s.getLogger().debug("Lexa: -)"), this.pushState("NODE"), 36;
          case 56:
            return s.getLogger().debug("Lexa: (-"), this.pushState("NODE"), 36;
          case 57:
            return s.getLogger().debug("Lexa: ))"), this.pushState("NODE"), 36;
          case 58:
            return s.getLogger().debug("Lexa: )"), this.pushState("NODE"), 36;
          case 59:
            return s.getLogger().debug("Lex: ((("), this.pushState("NODE"), 36;
          case 60:
            return s.getLogger().debug("Lexa: )"), this.pushState("NODE"), 36;
          case 61:
            return s.getLogger().debug("Lexa: )"), this.pushState("NODE"), 36;
          case 62:
            return s.getLogger().debug("Lexa: )"), this.pushState("NODE"), 36;
          case 63:
            return s.getLogger().debug("Lexc: >"), this.pushState("NODE"), 36;
          case 64:
            return s.getLogger().debug("Lexa: (["), this.pushState("NODE"), 36;
          case 65:
            return s.getLogger().debug("Lexa: )"), this.pushState("NODE"), 36;
          case 66:
            return this.pushState("NODE"), 36;
          case 67:
            return this.pushState("NODE"), 36;
          case 68:
            return this.pushState("NODE"), 36;
          case 69:
            return this.pushState("NODE"), 36;
          case 70:
            return this.pushState("NODE"), 36;
          case 71:
            return this.pushState("NODE"), 36;
          case 72:
            return this.pushState("NODE"), 36;
          case 73:
            return s.getLogger().debug("Lexa: ["), this.pushState("NODE"), 36;
          case 74:
            return this.pushState("BLOCK_ARROW"), s.getLogger().debug("LEX ARR START"), 38;
          case 75:
            return s.getLogger().debug("Lex: NODE_ID", r.yytext), 32;
          case 76:
            return s.getLogger().debug("Lex: EOF", r.yytext), 8;
          case 77:
            this.pushState("md_string");
            break;
          case 78:
            this.pushState("md_string");
            break;
          case 79:
            return "NODE_DESCR";
          case 80:
            this.popState();
            break;
          case 81:
            s.getLogger().debug("Lex: Starting string"), this.pushState("string");
            break;
          case 82:
            s.getLogger().debug("LEX ARR: Starting string"), this.pushState("string");
            break;
          case 83:
            return s.getLogger().debug("LEX: NODE_DESCR:", r.yytext), "NODE_DESCR";
          case 84:
            s.getLogger().debug("LEX POPPING"), this.popState();
            break;
          case 85:
            s.getLogger().debug("Lex: =>BAE"), this.pushState("ARROW_DIR");
            break;
          case 86:
            return r.yytext = r.yytext.replace(/^,\s*/, ""), s.getLogger().debug("Lex (right): dir:", r.yytext), "DIR";
          case 87:
            return r.yytext = r.yytext.replace(/^,\s*/, ""), s.getLogger().debug("Lex (left):", r.yytext), "DIR";
          case 88:
            return r.yytext = r.yytext.replace(/^,\s*/, ""), s.getLogger().debug("Lex (x):", r.yytext), "DIR";
          case 89:
            return r.yytext = r.yytext.replace(/^,\s*/, ""), s.getLogger().debug("Lex (y):", r.yytext), "DIR";
          case 90:
            return r.yytext = r.yytext.replace(/^,\s*/, ""), s.getLogger().debug("Lex (up):", r.yytext), "DIR";
          case 91:
            return r.yytext = r.yytext.replace(/^,\s*/, ""), s.getLogger().debug("Lex (down):", r.yytext), "DIR";
          case 92:
            return r.yytext = "]>", s.getLogger().debug("Lex (ARROW_DIR end):", r.yytext), this.popState(), this.popState(), "BLOCK_ARROW_END";
          case 93:
            return s.getLogger().debug("Lex: LINK", "#" + r.yytext + "#"), 15;
          case 94:
            return s.getLogger().debug("Lex: LINK", r.yytext), 15;
          case 95:
            return s.getLogger().debug("Lex: LINK", r.yytext), 15;
          case 96:
            return s.getLogger().debug("Lex: LINK", r.yytext), 15;
          case 97:
            return s.getLogger().debug("Lex: START_LINK", r.yytext), this.pushState("LLABEL"), 16;
          case 98:
            return s.getLogger().debug("Lex: START_LINK", r.yytext), this.pushState("LLABEL"), 16;
          case 99:
            return s.getLogger().debug("Lex: START_LINK", r.yytext), this.pushState("LLABEL"), 16;
          case 100:
            this.pushState("md_string");
            break;
          case 101:
            return s.getLogger().debug("Lex: Starting string"), this.pushState("string"), "LINK_LABEL";
          case 102:
            return this.popState(), s.getLogger().debug("Lex: LINK", "#" + r.yytext + "#"), 15;
          case 103:
            return this.popState(), s.getLogger().debug("Lex: LINK", r.yytext), 15;
          case 104:
            return this.popState(), s.getLogger().debug("Lex: LINK", r.yytext), 15;
          case 105:
            return s.getLogger().debug("Lex: COLON", r.yytext), r.yytext = r.yytext.slice(1), 27;
        }
      },
      rules: [/^(?:block-beta\b)/, /^(?:block\s+)/, /^(?:block\n+)/, /^(?:block:)/, /^(?:[\s]+)/, /^(?:[\n]+)/, /^(?:((\u000D\u000A)|(\u000A)))/, /^(?:columns\s+auto\b)/, /^(?:columns\s+[\d]+)/, /^(?:["][`])/, /^(?:[^`"]+)/, /^(?:[`]["])/, /^(?:["])/, /^(?:["])/, /^(?:[^"]*)/, /^(?:space[:]\d+)/, /^(?:space\b)/, /^(?:default\b)/, /^(?:linkStyle\b)/, /^(?:interpolate\b)/, /^(?:classDef\s+)/, /^(?:DEFAULT\s+)/, /^(?:\w+\s+)/, /^(?:[^\n]*)/, /^(?:class\s+)/, /^(?:(\w+)+((,\s*\w+)*))/, /^(?:[^\n]*)/, /^(?:style\s+)/, /^(?:(\w+)+((,\s*\w+)*))/, /^(?:[^\n]*)/, /^(?:accTitle\s*:\s*)/, /^(?:(?!\n||)*[^\n]*)/, /^(?:accDescr\s*:\s*)/, /^(?:(?!\n||)*[^\n]*)/, /^(?:accDescr\s*\{\s*)/, /^(?:[\}])/, /^(?:[^\}]*)/, /^(?:end\b\s*)/, /^(?:\(\(\()/, /^(?:\)\)\))/, /^(?:[\)]\))/, /^(?:\}\})/, /^(?:\})/, /^(?:\(-)/, /^(?:-\))/, /^(?:\(\()/, /^(?:\]\])/, /^(?:\()/, /^(?:\]\))/, /^(?:\\\])/, /^(?:\/\])/, /^(?:\)\])/, /^(?:[\)])/, /^(?:\]>)/, /^(?:[\]])/, /^(?:-\))/, /^(?:\(-)/, /^(?:\)\))/, /^(?:\))/, /^(?:\(\(\()/, /^(?:\(\()/, /^(?:\{\{)/, /^(?:\{)/, /^(?:>)/, /^(?:\(\[)/, /^(?:\()/, /^(?:\[\[)/, /^(?:\[\|)/, /^(?:\[\()/, /^(?:\)\)\))/, /^(?:\[\\)/, /^(?:\[\/)/, /^(?:\[\\)/, /^(?:\[)/, /^(?:<\[)/, /^(?:[^\(\[\n\-\)\{\}\s\<\>:]+)/, /^(?:$)/, /^(?:["][`])/, /^(?:["][`])/, /^(?:[^`"]+)/, /^(?:[`]["])/, /^(?:["])/, /^(?:["])/, /^(?:[^"]+)/, /^(?:["])/, /^(?:\]>\s*\()/, /^(?:,?\s*right\s*)/, /^(?:,?\s*left\s*)/, /^(?:,?\s*x\s*)/, /^(?:,?\s*y\s*)/, /^(?:,?\s*up\s*)/, /^(?:,?\s*down\s*)/, /^(?:\)\s*)/, /^(?:\s*[xo<]?--+[-xo>]\s*)/, /^(?:\s*[xo<]?==+[=xo>]\s*)/, /^(?:\s*[xo<]?-?\.+-[xo>]?\s*)/, /^(?:\s*~~[\~]+\s*)/, /^(?:\s*[xo<]?--\s*)/, /^(?:\s*[xo<]?==\s*)/, /^(?:\s*[xo<]?-\.\s*)/, /^(?:["][`])/, /^(?:["])/, /^(?:\s*[xo<]?--+[-xo>]\s*)/, /^(?:\s*[xo<]?==+[=xo>]\s*)/, /^(?:\s*[xo<]?-?\.+-[xo>]?\s*)/, /^(?::\d+)/],
      conditions: { STYLE_DEFINITION: { rules: [29], inclusive: !1 }, STYLE_STMNT: { rules: [28], inclusive: !1 }, CLASSDEFID: { rules: [23], inclusive: !1 }, CLASSDEF: { rules: [21, 22], inclusive: !1 }, CLASS_STYLE: { rules: [26], inclusive: !1 }, CLASS: { rules: [25], inclusive: !1 }, LLABEL: { rules: [100, 101, 102, 103, 104], inclusive: !1 }, ARROW_DIR: { rules: [86, 87, 88, 89, 90, 91, 92], inclusive: !1 }, BLOCK_ARROW: { rules: [77, 82, 85], inclusive: !1 }, NODE: { rules: [38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 78, 81], inclusive: !1 }, md_string: { rules: [10, 11, 79, 80], inclusive: !1 }, space: { rules: [], inclusive: !1 }, string: { rules: [13, 14, 83, 84], inclusive: !1 }, acc_descr_multiline: { rules: [35, 36], inclusive: !1 }, acc_descr: { rules: [33], inclusive: !1 }, acc_title: { rules: [31], inclusive: !1 }, INITIAL: { rules: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 12, 15, 16, 17, 18, 19, 20, 24, 27, 30, 32, 34, 37, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 93, 94, 95, 96, 97, 98, 99, 105], inclusive: !0 } }
    };
    return D;
  }();
  y.lexer = v;
  function N() {
    this.yy = {};
  }
  return N.prototype = y, y.Parser = N, new N();
}();
ee.parser = ee;
const ke = ee;
let T = {}, ie = [], V = {};
const oe = "color", ce = "fill", Pe = "bgFill", de = ",";
let j = {};
const Fe = function(e, c = "") {
  j[e] === void 0 && (j[e] = { id: e, styles: [], textStyles: [] });
  const u = j[e];
  c != null && c.split(de).forEach((a) => {
    const i = a.replace(/([^;]*);/, "$1").trim();
    if (a.match(oe)) {
      const o = i.replace(ce, Pe).replace(oe, ce);
      u.textStyles.push(o);
    }
    u.styles.push(i);
  });
}, Ke = function(e, c = "") {
  const u = T[e];
  c != null && (u.styles = c.split(de));
}, Me = function(e, c) {
  e.split(",").forEach(function(u) {
    let a = T[u];
    if (a === void 0) {
      const i = u.trim();
      T[i] = { id: i, type: "na", children: [] }, a = T[i];
    }
    a.classes || (a.classes = []), a.classes.push(c);
  });
}, pe = (e, c) => {
  const u = e.flat(), a = [];
  for (const i of u) {
    if (i.type === "classDef") {
      Fe(i.id, i.css);
      continue;
    }
    if (i.type === "applyClass") {
      Me(i.id, (i == null ? void 0 : i.styleClass) || "");
      continue;
    }
    if (i.type === "applyStyles") {
      i != null && i.stylesStr && Ke(i.id, i == null ? void 0 : i.stylesStr);
      continue;
    }
    if (i.type === "column-setting")
      c.columns = i.columns || -1;
    else if (i.type === "edge")
      V[i.id] ? V[i.id]++ : V[i.id] = 1, i.id = V[i.id] + "-" + i.id, ie.push(i);
    else {
      i.label || (i.type === "composite" ? i.label = "" : i.label = i.id);
      const g = !T[i.id];
      if (g ? T[i.id] = i : (i.type !== "na" && (T[i.id].type = i.type), i.label !== i.id && (T[i.id].label = i.label)), i.children && pe(i.children, i), i.type === "space") {
        const o = i.width || 1;
        for (let p = 0; p < o; p++) {
          const f = Ne(i);
          f.id = f.id + "-" + p, T[f.id] = f, a.push(f);
        }
      } else
        g && a.push(i);
    }
  }
  c.children = a;
};
let re = [], U = { id: "root", type: "composite", children: [], columns: -1 };
const Ye = () => {
  L.debug("Clear called"), ye(), U = { id: "root", type: "composite", children: [], columns: -1 }, T = { root: U }, re = [], j = {}, ie = [], V = {};
};
function We(e) {
  switch (L.debug("typeStr2Type", e), e) {
    case "[]":
      return "square";
    case "()":
      return L.debug("we have a round"), "round";
    case "(())":
      return "circle";
    case ">]":
      return "rect_left_inv_arrow";
    case "{}":
      return "diamond";
    case "{{}}":
      return "hexagon";
    case "([])":
      return "stadium";
    case "[[]]":
      return "subroutine";
    case "[()]":
      return "cylinder";
    case "((()))":
      return "doublecircle";
    case "[//]":
      return "lean_right";
    case "[\\\\]":
      return "lean_left";
    case "[/\\]":
      return "trapezoid";
    case "[\\/]":
      return "inv_trapezoid";
    case "<[]>":
      return "block_arrow";
    default:
      return "na";
  }
}
function Ve(e) {
  switch (L.debug("typeStr2Type", e), e) {
    case "==":
      return "thick";
    default:
      return "normal";
  }
}
function je(e) {
  switch (e.trim()) {
    case "--x":
      return "arrow_cross";
    case "--o":
      return "arrow_circle";
    default:
      return "arrow_point";
  }
}
let le = 0;
const Ue = () => (le++, "id-" + Math.random().toString(36).substr(2, 12) + "-" + le), Xe = (e) => {
  U.children = e, pe(e, U), re = U.children;
}, Ge = (e) => {
  const c = T[e];
  return c ? c.columns ? c.columns : c.children ? c.children.length : -1 : -1;
}, He = () => [...Object.values(T)], qe = () => re || [], Ze = () => ie, Je = (e) => T[e], Qe = (e) => {
  T[e.id] = e;
}, $e = () => console, et = function() {
  return j;
}, tt = {
  getConfig: () => se().block,
  typeStr2Type: We,
  edgeTypeStr2Type: Ve,
  edgeStrToEdgeData: je,
  getLogger: $e,
  getBlocksFlat: He,
  getBlocks: qe,
  getEdges: Ze,
  setHierarchy: Xe,
  getBlock: Je,
  setBlock: Qe,
  getColumns: Ge,
  getClasses: et,
  clear: Ye,
  generateId: Ue
}, st = tt, q = (e, c) => {
  const u = Ie, a = u(e, "r"), i = u(e, "g"), g = u(e, "b");
  return Ee(a, i, g, c);
}, it = (e) => `.label {
    font-family: ${e.fontFamily};
    color: ${e.nodeTextColor || e.textColor};
  }
  .cluster-label text {
    fill: ${e.titleColor};
  }
  .cluster-label span,p {
    color: ${e.titleColor};
  }



  .label text,span,p {
    fill: ${e.nodeTextColor || e.textColor};
    color: ${e.nodeTextColor || e.textColor};
  }

  .node rect,
  .node circle,
  .node ellipse,
  .node polygon,
  .node path {
    fill: ${e.mainBkg};
    stroke: ${e.nodeBorder};
    stroke-width: 1px;
  }
  .flowchart-label text {
    text-anchor: middle;
  }
  // .flowchart-label .text-outer-tspan {
  //   text-anchor: middle;
  // }
  // .flowchart-label .text-inner-tspan {
  //   text-anchor: start;
  // }

  .node .label {
    text-align: center;
  }
  .node.clickable {
    cursor: pointer;
  }

  .arrowheadPath {
    fill: ${e.arrowheadColor};
  }

  .edgePath .path {
    stroke: ${e.lineColor};
    stroke-width: 2.0px;
  }

  .flowchart-link {
    stroke: ${e.lineColor};
    fill: none;
  }

  .edgeLabel {
    background-color: ${e.edgeLabelBackground};
    rect {
      opacity: 0.5;
      background-color: ${e.edgeLabelBackground};
      fill: ${e.edgeLabelBackground};
    }
    text-align: center;
  }

  /* For html labels only */
  .labelBkg {
    background-color: ${q(e.edgeLabelBackground, 0.5)};
    // background-color:
  }

  .node .cluster {
    // fill: ${q(e.mainBkg, 0.5)};
    fill: ${q(e.clusterBkg, 0.5)};
    stroke: ${q(e.clusterBorder, 0.2)};
    box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
    stroke-width: 1px;
  }

  .cluster text {
    fill: ${e.titleColor};
  }

  .cluster span,p {
    color: ${e.titleColor};
  }
  /* .cluster div {
    color: ${e.titleColor};
  } */

  div.mermaidTooltip {
    position: absolute;
    text-align: center;
    max-width: 200px;
    padding: 2px;
    font-family: ${e.fontFamily};
    font-size: 12px;
    background: ${e.tertiaryColor};
    border: 1px solid ${e.border2};
    border-radius: 2px;
    pointer-events: none;
    z-index: 100;
  }

  .flowchartTitleText {
    text-anchor: middle;
    font-size: 18px;
    fill: ${e.textColor};
  }
`, rt = it;
function fe(e, c, u = !1) {
  var z, I, w;
  const a = e;
  let i = "default";
  (((z = a == null ? void 0 : a.classes) == null ? void 0 : z.length) || 0) > 0 && (i = ((a == null ? void 0 : a.classes) || []).join(" ")), i = i + " flowchart-label";
  let g = 0, o = "", p;
  switch (a.type) {
    case "round":
      g = 5, o = "rect";
      break;
    case "composite":
      g = 0, o = "composite", p = 0;
      break;
    case "square":
      o = "rect";
      break;
    case "diamond":
      o = "question";
      break;
    case "hexagon":
      o = "hexagon";
      break;
    case "block_arrow":
      o = "block_arrow";
      break;
    case "odd":
      o = "rect_left_inv_arrow";
      break;
    case "lean_right":
      o = "lean_right";
      break;
    case "lean_left":
      o = "lean_left";
      break;
    case "trapezoid":
      o = "trapezoid";
      break;
    case "inv_trapezoid":
      o = "inv_trapezoid";
      break;
    case "rect_left_inv_arrow":
      o = "rect_left_inv_arrow";
      break;
    case "circle":
      o = "circle";
      break;
    case "ellipse":
      o = "ellipse";
      break;
    case "stadium":
      o = "stadium";
      break;
    case "subroutine":
      o = "subroutine";
      break;
    case "cylinder":
      o = "cylinder";
      break;
    case "group":
      o = "rect";
      break;
    case "doublecircle":
      o = "doublecircle";
      break;
    default:
      o = "rect";
  }
  const f = _e((a == null ? void 0 : a.styles) || []), m = a.label, S = a.size || { width: 0, height: 0, x: 0, y: 0 };
  return {
    labelStyle: f.labelStyle,
    shape: o,
    labelText: m,
    rx: g,
    ry: g,
    class: i,
    style: f.style,
    id: a.id,
    directions: a.directions,
    width: S.width,
    height: S.height,
    x: S.x,
    y: S.y,
    positioned: u,
    intersect: void 0,
    type: a.type,
    padding: p ?? (((w = (I = se()) == null ? void 0 : I.block) == null ? void 0 : w.padding) || 0)
  };
}
async function nt(e, c, u) {
  const a = fe(c, u, !1);
  if (a.type === "group")
    return;
  const i = await ge(e, a), g = i.node().getBBox(), o = u.getBlock(a.id);
  o.size = { width: g.width, height: g.height, x: 0, y: 0, node: i }, u.setBlock(o), i.remove();
}
async function at(e, c, u) {
  const a = fe(c, u, !0);
  u.getBlock(a.id).type !== "space" && (await ge(e, a), c.intersect = a == null ? void 0 : a.intersect, Ce(a));
}
async function ne(e, c, u, a) {
  for (const i of c)
    await a(e, i, u), i.children && await ne(e, i.children, u, a);
}
async function ot(e, c, u) {
  await ne(e, c, u, nt);
}
async function ct(e, c, u) {
  await ne(e, c, u, at);
}
async function lt(e, c, u, a, i) {
  const g = new Re({
    multigraph: !0,
    compound: !0
  });
  g.setGraph({
    rankdir: "TB",
    nodesep: 10,
    ranksep: 10,
    marginx: 8,
    marginy: 8
  });
  for (const o of u)
    o.size && g.setNode(o.id, {
      width: o.size.width,
      height: o.size.height,
      intersect: o.intersect
    });
  for (const o of c)
    if (o.start && o.end) {
      const p = a.getBlock(o.start), f = a.getBlock(o.end);
      if (p != null && p.size && (f != null && f.size)) {
        const m = p.size, S = f.size, E = [
          { x: m.x, y: m.y },
          { x: m.x + (S.x - m.x) / 2, y: m.y + (S.y - m.y) / 2 },
          { x: S.x, y: S.y }
        ];
        await Oe(
          e,
          { v: o.start, w: o.end, name: o.id },
          {
            ...o,
            arrowTypeEnd: o.arrowTypeEnd,
            arrowTypeStart: o.arrowTypeStart,
            points: E,
            classes: "edge-thickness-normal edge-pattern-solid flowchart-link LS-a1 LE-b1"
          },
          void 0,
          "block",
          g,
          i
        ), o.label && (await Te(e, {
          ...o,
          label: o.label,
          labelStyle: "stroke: #333; stroke-width: 1.5px;fill:none;",
          arrowTypeEnd: o.arrowTypeEnd,
          arrowTypeStart: o.arrowTypeStart,
          points: E,
          classes: "edge-thickness-normal edge-pattern-solid flowchart-link LS-a1 LE-b1"
        }), await ze(
          { ...o, x: E[1].x, y: E[1].y },
          {
            originalPath: E
          }
        ));
      }
    }
}
var he, ue;
const b = ((ue = (he = we()) == null ? void 0 : he.block) == null ? void 0 : ue.padding) || 8;
function ht(e, c) {
  if (e === 0 || !Number.isInteger(e))
    throw new Error("Columns must be an integer !== 0.");
  if (c < 0 || !Number.isInteger(c))
    throw new Error("Position must be a non-negative integer." + c);
  if (e < 0)
    return { px: c, py: 0 };
  if (e === 1)
    return { px: 0, py: c };
  const u = c % e, a = Math.floor(c / e);
  return { px: u, py: a };
}
const ut = (e) => {
  let c = 0, u = 0;
  for (const a of e.children) {
    const { width: i, height: g, x: o, y: p } = a.size || { width: 0, height: 0, x: 0, y: 0 };
    L.debug(
      "getMaxChildSize abc95 child:",
      a.id,
      "width:",
      i,
      "height:",
      g,
      "x:",
      o,
      "y:",
      p,
      a.type
    ), a.type !== "space" && (i > c && (c = i / (e.widthInColumns || 1)), g > u && (u = g));
  }
  return { width: c, height: u };
};
function te(e, c, u = 0, a = 0) {
  var o, p, f, m, S, E, z, I, w, C, y;
  L.debug(
    "setBlockSizes abc95 (start)",
    e.id,
    (o = e == null ? void 0 : e.size) == null ? void 0 : o.x,
    "block width =",
    e == null ? void 0 : e.size,
    "sieblingWidth",
    u
  ), (p = e == null ? void 0 : e.size) != null && p.width || (e.size = {
    width: u,
    height: a,
    x: 0,
    y: 0
  });
  let i = 0, g = 0;
  if (((f = e.children) == null ? void 0 : f.length) > 0) {
    for (const d of e.children)
      te(d, c);
    const v = ut(e);
    i = v.width, g = v.height, L.debug("setBlockSizes abc95 maxWidth of", e.id, ":s children is ", i, g);
    for (const d of e.children)
      d.size && (L.debug(
        `abc95 Setting size of children of ${e.id} id=${d.id} ${i} ${g} ${d.size}`
      ), d.size.width = i * (d.widthInColumns || 1) + b * ((d.widthInColumns || 1) - 1), d.size.height = g, d.size.x = 0, d.size.y = 0, L.debug(
        `abc95 updating size of ${e.id} children child:${d.id} maxWidth:${i} maxHeight:${g}`
      ));
    for (const d of e.children)
      te(d, c, i, g);
    const N = e.columns || -1;
    let D = 0;
    for (const d of e.children)
      D += d.widthInColumns || 1;
    let l = e.children.length;
    N > 0 && N < D && (l = N), e.widthInColumns;
    const s = Math.ceil(D / l);
    let r = l * (i + b) + b, h = s * (g + b) + b;
    if (r < u) {
      L.debug(
        `Detected to small siebling: abc95 ${e.id} sieblingWidth ${u} sieblingHeight ${a} width ${r}`
      ), r = u, h = a;
      const d = (u - l * b - b) / l, t = (a - s * b - b) / s;
      L.debug("Size indata abc88", e.id, "childWidth", d, "maxWidth", i), L.debug("Size indata abc88", e.id, "childHeight", t, "maxHeight", g), L.debug("Size indata abc88 xSize", l, "paddiong", b);
      for (const x of e.children)
        x.size && (x.size.width = d, x.size.height = t, x.size.x = 0, x.size.y = 0);
    }
    if (L.debug(
      `abc95 (finale calc) ${e.id} xSize ${l} ySize ${s} columns ${N}${e.children.length} width=${Math.max(r, ((m = e.size) == null ? void 0 : m.width) || 0)}`
    ), r < (((S = e == null ? void 0 : e.size) == null ? void 0 : S.width) || 0)) {
      r = ((E = e == null ? void 0 : e.size) == null ? void 0 : E.width) || 0;
      const d = N > 0 ? Math.min(e.children.length, N) : e.children.length;
      if (d > 0) {
        const t = (r - d * b - b) / d;
        L.debug("abc95 (growing to fit) width", e.id, r, (z = e.size) == null ? void 0 : z.width, t);
        for (const x of e.children)
          x.size && (x.size.width = t);
      }
    }
    e.size = {
      width: r,
      height: h,
      x: 0,
      y: 0
    };
  }
  L.debug(
    "setBlockSizes abc94 (done)",
    e.id,
    (I = e == null ? void 0 : e.size) == null ? void 0 : I.x,
    (w = e == null ? void 0 : e.size) == null ? void 0 : w.width,
    (C = e == null ? void 0 : e.size) == null ? void 0 : C.y,
    (y = e == null ? void 0 : e.size) == null ? void 0 : y.height
  );
}
function Se(e, c) {
  var a, i, g, o, p, f, m, S, E, z, I, w, C, y, v, N, D;
  L.debug(
    `abc85 layout blocks (=>layoutBlocks) ${e.id} x: ${(a = e == null ? void 0 : e.size) == null ? void 0 : a.x} y: ${(i = e == null ? void 0 : e.size) == null ? void 0 : i.y} width: ${(g = e == null ? void 0 : e.size) == null ? void 0 : g.width}`
  );
  const u = e.columns || -1;
  if (L.debug("layoutBlocks columns abc95", e.id, "=>", u, e), e.children && // find max width of children
  e.children.length > 0) {
    const l = ((p = (o = e == null ? void 0 : e.children[0]) == null ? void 0 : o.size) == null ? void 0 : p.width) || 0, s = e.children.length * l + (e.children.length - 1) * b;
    L.debug("widthOfChildren 88", s, "posX");
    let r = 0;
    L.debug("abc91 block?.size?.x", e.id, (f = e == null ? void 0 : e.size) == null ? void 0 : f.x);
    let h = (m = e == null ? void 0 : e.size) != null && m.x ? ((S = e == null ? void 0 : e.size) == null ? void 0 : S.x) + (-((E = e == null ? void 0 : e.size) == null ? void 0 : E.width) / 2 || 0) : -b, d = 0;
    for (const t of e.children) {
      const x = e;
      if (!t.size)
        continue;
      const { width: n, height: B } = t.size, { px: Y, py: F } = ht(u, r);
      if (F != d && (d = F, h = (z = e == null ? void 0 : e.size) != null && z.x ? ((I = e == null ? void 0 : e.size) == null ? void 0 : I.x) + (-((w = e == null ? void 0 : e.size) == null ? void 0 : w.width) / 2 || 0) : -b, L.debug("New row in layout for block", e.id, " and child ", t.id, d)), L.debug(
        `abc89 layout blocks (child) id: ${t.id} Pos: ${r} (px, py) ${Y},${F} (${(C = x == null ? void 0 : x.size) == null ? void 0 : C.x},${(y = x == null ? void 0 : x.size) == null ? void 0 : y.y}) parent: ${x.id} width: ${n}${b}`
      ), x.size) {
        const R = n / 2;
        t.size.x = h + b + R, L.debug(
          `abc91 layout blocks (calc) px, pyid:${t.id} startingPos=X${h} new startingPosX${t.size.x} ${R} padding=${b} width=${n} halfWidth=${R} => x:${t.size.x} y:${t.size.y} ${t.widthInColumns} (width * (child?.w || 1)) / 2 ${n * ((t == null ? void 0 : t.widthInColumns) || 1) / 2}`
        ), h = t.size.x + R, t.size.y = x.size.y - x.size.height / 2 + F * (B + b) + B / 2 + b, L.debug(
          `abc88 layout blocks (calc) px, pyid:${t.id}startingPosX${h}${b}${R}=>x:${t.size.x}y:${t.size.y}${t.widthInColumns}(width * (child?.w || 1)) / 2${n * ((t == null ? void 0 : t.widthInColumns) || 1) / 2}`
        );
      }
      t.children && Se(t), r += (t == null ? void 0 : t.widthInColumns) || 1, L.debug("abc88 columnsPos", t, r);
    }
  }
  L.debug(
    `layout blocks (<==layoutBlocks) ${e.id} x: ${(v = e == null ? void 0 : e.size) == null ? void 0 : v.x} y: ${(N = e == null ? void 0 : e.size) == null ? void 0 : N.y} width: ${(D = e == null ? void 0 : e.size) == null ? void 0 : D.width}`
  );
}
function Le(e, { minX: c, minY: u, maxX: a, maxY: i } = { minX: 0, minY: 0, maxX: 0, maxY: 0 }) {
  if (e.size && e.id !== "root") {
    const { x: g, y: o, width: p, height: f } = e.size;
    g - p / 2 < c && (c = g - p / 2), o - f / 2 < u && (u = o - f / 2), g + p / 2 > a && (a = g + p / 2), o + f / 2 > i && (i = o + f / 2);
  }
  if (e.children)
    for (const g of e.children)
      ({ minX: c, minY: u, maxX: a, maxY: i } = Le(g, { minX: c, minY: u, maxX: a, maxY: i }));
  return { minX: c, minY: u, maxX: a, maxY: i };
}
function gt(e) {
  const c = e.getBlock("root");
  if (!c)
    return;
  te(c, e, 0, 0), Se(c), L.debug("getBlocks", JSON.stringify(c, null, 2));
  const { minX: u, minY: a, maxX: i, maxY: g } = Le(c), o = g - a, p = i - u;
  return { x: u, y: a, width: p, height: o };
}
const dt = function(e, c) {
  return c.db.getClasses();
}, pt = async function(e, c, u, a) {
  const { securityLevel: i, block: g } = se(), o = a.db;
  let p;
  i === "sandbox" && (p = H("#i" + c));
  const f = i === "sandbox" ? H(p.nodes()[0].contentDocument.body) : H("body"), m = i === "sandbox" ? f.select(`[id="${c}"]`) : H(`[id="${c}"]`);
  Ae(m, ["point", "circle", "cross"], a.type, c);
  const E = o.getBlocks(), z = o.getBlocksFlat(), I = o.getEdges(), w = m.insert("g").attr("class", "block");
  await ot(w, E, o);
  const C = gt(o);
  if (await ct(w, E, o), await lt(w, I, z, o, c), C) {
    const y = C, v = Math.max(1, Math.round(0.125 * (y.width / y.height))), N = y.height + v + 10, D = y.width + 10, { useMaxWidth: l } = g;
    De(m, N, D, !!l), L.debug("Here Bounds", C, y), m.attr(
      "viewBox",
      `${y.x - 5} ${y.y - 5} ${y.width + 10} ${y.height + 10}`
    );
  }
  ve(Be);
}, ft = {
  draw: pt,
  getClasses: dt
}, Ot = {
  parser: ke,
  db: st,
  renderer: ft,
  styles: rt
};
export {
  Ot as diagram
};
