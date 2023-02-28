import { y as Yu, a as jr, l as ur, s as Zr, c as $t, g as Hs, b as Hu, w as Xu, x as qu } from "./mermaid-95dd44f4.js";
import { i as Wu } from "./is_dark-a8441071.js";
var Pn = function() {
  var t = function(T, C, S, b) {
    for (S = S || {}, b = T.length; b--; S[T[b]] = C)
      ;
    return S;
  }, e = [1, 4], r = [1, 13], a = [1, 12], n = [1, 15], i = [1, 16], s = [1, 20], o = [1, 19], u = [6, 7, 8], l = [1, 26], f = [1, 24], h = [1, 25], c = [6, 7, 11], v = [1, 6, 13, 15, 16, 19, 22], d = [1, 33], g = [1, 34], y = [1, 6, 7, 11, 13, 15, 16, 19, 22], p = {
    trace: function() {
    },
    yy: {},
    symbols_: { error: 2, start: 3, mindMap: 4, spaceLines: 5, SPACELINE: 6, NL: 7, MINDMAP: 8, document: 9, stop: 10, EOF: 11, statement: 12, SPACELIST: 13, node: 14, ICON: 15, CLASS: 16, nodeWithId: 17, nodeWithoutId: 18, NODE_DSTART: 19, NODE_DESCR: 20, NODE_DEND: 21, NODE_ID: 22, $accept: 0, $end: 1 },
    terminals_: { 2: "error", 6: "SPACELINE", 7: "NL", 8: "MINDMAP", 11: "EOF", 13: "SPACELIST", 15: "ICON", 16: "CLASS", 19: "NODE_DSTART", 20: "NODE_DESCR", 21: "NODE_DEND", 22: "NODE_ID" },
    productions_: [0, [3, 1], [3, 2], [5, 1], [5, 2], [5, 2], [4, 2], [4, 3], [10, 1], [10, 1], [10, 1], [10, 2], [10, 2], [9, 3], [9, 2], [12, 2], [12, 2], [12, 2], [12, 1], [12, 1], [12, 1], [12, 1], [12, 1], [14, 1], [14, 1], [18, 3], [17, 1], [17, 4]],
    performAction: function(C, S, b, x, w, D, A) {
      var L = D.length - 1;
      switch (w) {
        case 6:
        case 7:
          return x;
        case 8:
          x.getLogger().trace("Stop NL ");
          break;
        case 9:
          x.getLogger().trace("Stop EOF ");
          break;
        case 11:
          x.getLogger().trace("Stop NL2 ");
          break;
        case 12:
          x.getLogger().trace("Stop EOF2 ");
          break;
        case 15:
          x.getLogger().info("Node: ", D[L].id), x.addNode(D[L - 1].length, D[L].id, D[L].descr, D[L].type);
          break;
        case 16:
          x.getLogger().trace("Icon: ", D[L]), x.decorateNode({ icon: D[L] });
          break;
        case 17:
        case 21:
          x.decorateNode({ class: D[L] });
          break;
        case 18:
          x.getLogger().trace("SPACELIST");
          break;
        case 19:
          x.getLogger().trace("Node: ", D[L].id), x.addNode(0, D[L].id, D[L].descr, D[L].type);
          break;
        case 20:
          x.decorateNode({ icon: D[L] });
          break;
        case 25:
          x.getLogger().trace("node found ..", D[L - 2]), this.$ = { id: D[L - 1], descr: D[L - 1], type: x.getType(D[L - 2], D[L]) };
          break;
        case 26:
          this.$ = { id: D[L], descr: D[L], type: x.nodeType.DEFAULT };
          break;
        case 27:
          x.getLogger().trace("node found ..", D[L - 3]), this.$ = { id: D[L - 3], descr: D[L - 1], type: x.getType(D[L - 2], D[L]) };
          break;
      }
    },
    table: [{ 3: 1, 4: 2, 5: 3, 6: [1, 5], 8: e }, { 1: [3] }, { 1: [2, 1] }, { 4: 6, 6: [1, 7], 7: [1, 8], 8: e }, { 6: r, 7: [1, 10], 9: 9, 12: 11, 13: a, 14: 14, 15: n, 16: i, 17: 17, 18: 18, 19: s, 22: o }, t(u, [2, 3]), { 1: [2, 2] }, t(u, [2, 4]), t(u, [2, 5]), { 1: [2, 6], 6: r, 12: 21, 13: a, 14: 14, 15: n, 16: i, 17: 17, 18: 18, 19: s, 22: o }, { 6: r, 9: 22, 12: 11, 13: a, 14: 14, 15: n, 16: i, 17: 17, 18: 18, 19: s, 22: o }, { 6: l, 7: f, 10: 23, 11: h }, t(c, [2, 22], { 17: 17, 18: 18, 14: 27, 15: [1, 28], 16: [1, 29], 19: s, 22: o }), t(c, [2, 18]), t(c, [2, 19]), t(c, [2, 20]), t(c, [2, 21]), t(c, [2, 23]), t(c, [2, 24]), t(c, [2, 26], { 19: [1, 30] }), { 20: [1, 31] }, { 6: l, 7: f, 10: 32, 11: h }, { 1: [2, 7], 6: r, 12: 21, 13: a, 14: 14, 15: n, 16: i, 17: 17, 18: 18, 19: s, 22: o }, t(v, [2, 14], { 7: d, 11: g }), t(y, [2, 8]), t(y, [2, 9]), t(y, [2, 10]), t(c, [2, 15]), t(c, [2, 16]), t(c, [2, 17]), { 20: [1, 35] }, { 21: [1, 36] }, t(v, [2, 13], { 7: d, 11: g }), t(y, [2, 11]), t(y, [2, 12]), { 21: [1, 37] }, t(c, [2, 25]), t(c, [2, 27])],
    defaultActions: { 2: [2, 1], 6: [2, 2] },
    parseError: function(C, S) {
      if (S.recoverable)
        this.trace(C);
      else {
        var b = new Error(C);
        throw b.hash = S, b;
      }
    },
    parse: function(C) {
      var S = this, b = [0], x = [], w = [null], D = [], A = this.table, L = "", M = 0, O = 0, P = 2, I = 1, k = D.slice.call(arguments, 1), R = Object.create(this.lexer), B = { yy: {} };
      for (var z in this.yy)
        Object.prototype.hasOwnProperty.call(this.yy, z) && (B.yy[z] = this.yy[z]);
      R.setInput(C, B.yy), B.yy.lexer = R, B.yy.parser = this, typeof R.yylloc > "u" && (R.yylloc = {});
      var F = R.yylloc;
      D.push(F);
      var $ = R.options && R.options.ranges;
      typeof B.yy.parseError == "function" ? this.parseError = B.yy.parseError : this.parseError = Object.getPrototypeOf(this).parseError;
      function U() {
        var ee;
        return ee = x.pop() || R.lex() || I, typeof ee != "number" && (ee instanceof Array && (x = ee, ee = x.pop()), ee = S.symbols_[ee] || ee), ee;
      }
      for (var V, H, Y, G, X = {}, K, Z, te, he; ; ) {
        if (H = b[b.length - 1], this.defaultActions[H] ? Y = this.defaultActions[H] : ((V === null || typeof V > "u") && (V = U()), Y = A[H] && A[H][V]), typeof Y > "u" || !Y.length || !Y[0]) {
          var de = "";
          he = [];
          for (K in A[H])
            this.terminals_[K] && K > P && he.push("'" + this.terminals_[K] + "'");
          R.showPosition ? de = "Parse error on line " + (M + 1) + `:
` + R.showPosition() + `
Expecting ` + he.join(", ") + ", got '" + (this.terminals_[V] || V) + "'" : de = "Parse error on line " + (M + 1) + ": Unexpected " + (V == I ? "end of input" : "'" + (this.terminals_[V] || V) + "'"), this.parseError(de, {
            text: R.match,
            token: this.terminals_[V] || V,
            line: R.yylineno,
            loc: F,
            expected: he
          });
        }
        if (Y[0] instanceof Array && Y.length > 1)
          throw new Error("Parse Error: multiple actions possible at state: " + H + ", token: " + V);
        switch (Y[0]) {
          case 1:
            b.push(V), w.push(R.yytext), D.push(R.yylloc), b.push(Y[1]), V = null, O = R.yyleng, L = R.yytext, M = R.yylineno, F = R.yylloc;
            break;
          case 2:
            if (Z = this.productions_[Y[1]][1], X.$ = w[w.length - Z], X._$ = {
              first_line: D[D.length - (Z || 1)].first_line,
              last_line: D[D.length - 1].last_line,
              first_column: D[D.length - (Z || 1)].first_column,
              last_column: D[D.length - 1].last_column
            }, $ && (X._$.range = [
              D[D.length - (Z || 1)].range[0],
              D[D.length - 1].range[1]
            ]), G = this.performAction.apply(X, [
              L,
              O,
              M,
              B.yy,
              Y[1],
              w,
              D
            ].concat(k)), typeof G < "u")
              return G;
            Z && (b = b.slice(0, -1 * Z * 2), w = w.slice(0, -1 * Z), D = D.slice(0, -1 * Z)), b.push(this.productions_[Y[1]][0]), w.push(X.$), D.push(X._$), te = A[b[b.length - 2]][b[b.length - 1]], b.push(te);
            break;
          case 3:
            return !0;
        }
      }
      return !0;
    }
  }, E = function() {
    var T = {
      EOF: 1,
      parseError: function(S, b) {
        if (this.yy.parser)
          this.yy.parser.parseError(S, b);
        else
          throw new Error(S);
      },
      // resets the lexer, sets new input
      setInput: function(C, S) {
        return this.yy = S || this.yy || {}, this._input = C, this._more = this._backtrack = this.done = !1, this.yylineno = this.yyleng = 0, this.yytext = this.matched = this.match = "", this.conditionStack = ["INITIAL"], this.yylloc = {
          first_line: 1,
          first_column: 0,
          last_line: 1,
          last_column: 0
        }, this.options.ranges && (this.yylloc.range = [0, 0]), this.offset = 0, this;
      },
      // consumes and returns one char from the input
      input: function() {
        var C = this._input[0];
        this.yytext += C, this.yyleng++, this.offset++, this.match += C, this.matched += C;
        var S = C.match(/(?:\r\n?|\n).*/g);
        return S ? (this.yylineno++, this.yylloc.last_line++) : this.yylloc.last_column++, this.options.ranges && this.yylloc.range[1]++, this._input = this._input.slice(1), C;
      },
      // unshifts one char (or a string) into the input
      unput: function(C) {
        var S = C.length, b = C.split(/(?:\r\n?|\n)/g);
        this._input = C + this._input, this.yytext = this.yytext.substr(0, this.yytext.length - S), this.offset -= S;
        var x = this.match.split(/(?:\r\n?|\n)/g);
        this.match = this.match.substr(0, this.match.length - 1), this.matched = this.matched.substr(0, this.matched.length - 1), b.length - 1 && (this.yylineno -= b.length - 1);
        var w = this.yylloc.range;
        return this.yylloc = {
          first_line: this.yylloc.first_line,
          last_line: this.yylineno + 1,
          first_column: this.yylloc.first_column,
          last_column: b ? (b.length === x.length ? this.yylloc.first_column : 0) + x[x.length - b.length].length - b[0].length : this.yylloc.first_column - S
        }, this.options.ranges && (this.yylloc.range = [w[0], w[0] + this.yyleng - S]), this.yyleng = this.yytext.length, this;
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
      less: function(C) {
        this.unput(this.match.slice(C));
      },
      // displays already matched input, i.e. for error messages
      pastInput: function() {
        var C = this.matched.substr(0, this.matched.length - this.match.length);
        return (C.length > 20 ? "..." : "") + C.substr(-20).replace(/\n/g, "");
      },
      // displays upcoming input, i.e. for error messages
      upcomingInput: function() {
        var C = this.match;
        return C.length < 20 && (C += this._input.substr(0, 20 - C.length)), (C.substr(0, 20) + (C.length > 20 ? "..." : "")).replace(/\n/g, "");
      },
      // displays the character position where the lexing error occurred, i.e. for error messages
      showPosition: function() {
        var C = this.pastInput(), S = new Array(C.length + 1).join("-");
        return C + this.upcomingInput() + `
` + S + "^";
      },
      // test the lexed token: return FALSE when not a match, otherwise return token
      test_match: function(C, S) {
        var b, x, w;
        if (this.options.backtrack_lexer && (w = {
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
        }, this.options.ranges && (w.yylloc.range = this.yylloc.range.slice(0))), x = C[0].match(/(?:\r\n?|\n).*/g), x && (this.yylineno += x.length), this.yylloc = {
          first_line: this.yylloc.last_line,
          last_line: this.yylineno + 1,
          first_column: this.yylloc.last_column,
          last_column: x ? x[x.length - 1].length - x[x.length - 1].match(/\r?\n?/)[0].length : this.yylloc.last_column + C[0].length
        }, this.yytext += C[0], this.match += C[0], this.matches = C, this.yyleng = this.yytext.length, this.options.ranges && (this.yylloc.range = [this.offset, this.offset += this.yyleng]), this._more = !1, this._backtrack = !1, this._input = this._input.slice(C[0].length), this.matched += C[0], b = this.performAction.call(this, this.yy, this, S, this.conditionStack[this.conditionStack.length - 1]), this.done && this._input && (this.done = !1), b)
          return b;
        if (this._backtrack) {
          for (var D in w)
            this[D] = w[D];
          return !1;
        }
        return !1;
      },
      // return next match in input
      next: function() {
        if (this.done)
          return this.EOF;
        this._input || (this.done = !0);
        var C, S, b, x;
        this._more || (this.yytext = "", this.match = "");
        for (var w = this._currentRules(), D = 0; D < w.length; D++)
          if (b = this._input.match(this.rules[w[D]]), b && (!S || b[0].length > S[0].length)) {
            if (S = b, x = D, this.options.backtrack_lexer) {
              if (C = this.test_match(b, w[D]), C !== !1)
                return C;
              if (this._backtrack) {
                S = !1;
                continue;
              } else
                return !1;
            } else if (!this.options.flex)
              break;
          }
        return S ? (C = this.test_match(S, w[x]), C !== !1 ? C : !1) : this._input === "" ? this.EOF : this.parseError("Lexical error on line " + (this.yylineno + 1) + `. Unrecognized text.
` + this.showPosition(), {
          text: "",
          token: null,
          line: this.yylineno
        });
      },
      // return next match that has a token
      lex: function() {
        var S = this.next();
        return S || this.lex();
      },
      // activates a new lexer condition state (pushes the new lexer condition state onto the condition stack)
      begin: function(S) {
        this.conditionStack.push(S);
      },
      // pop the previously active lexer condition state off the condition stack
      popState: function() {
        var S = this.conditionStack.length - 1;
        return S > 0 ? this.conditionStack.pop() : this.conditionStack[0];
      },
      // produce the lexer rule set which is active for the currently active lexer condition state
      _currentRules: function() {
        return this.conditionStack.length && this.conditionStack[this.conditionStack.length - 1] ? this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules : this.conditions.INITIAL.rules;
      },
      // return the currently active lexer condition state; when an index argument is provided it produces the N-th previous condition state, if available
      topState: function(S) {
        return S = this.conditionStack.length - 1 - Math.abs(S || 0), S >= 0 ? this.conditionStack[S] : "INITIAL";
      },
      // alias for begin(condition)
      pushState: function(S) {
        this.begin(S);
      },
      // return the number of states currently on the stack
      stateStackSize: function() {
        return this.conditionStack.length;
      },
      options: { "case-insensitive": !0 },
      performAction: function(S, b, x, w) {
        switch (x) {
          case 0:
            S.getLogger().trace("Found comment", b.yytext);
            break;
          case 1:
            return 8;
          case 2:
            this.begin("CLASS");
            break;
          case 3:
            return this.popState(), 16;
          case 4:
            this.popState();
            break;
          case 5:
            S.getLogger().trace("Begin icon"), this.begin("ICON");
            break;
          case 6:
            return S.getLogger().trace("SPACELINE"), 6;
          case 7:
            return 7;
          case 8:
            return 15;
          case 9:
            S.getLogger().trace("end icon"), this.popState();
            break;
          case 10:
            return S.getLogger().trace("Exploding node"), this.begin("NODE"), 19;
          case 11:
            return S.getLogger().trace("Cloud"), this.begin("NODE"), 19;
          case 12:
            return S.getLogger().trace("Explosion Bang"), this.begin("NODE"), 19;
          case 13:
            return S.getLogger().trace("Cloud Bang"), this.begin("NODE"), 19;
          case 14:
            return this.begin("NODE"), 19;
          case 15:
            return this.begin("NODE"), 19;
          case 16:
            return this.begin("NODE"), 19;
          case 17:
            return this.begin("NODE"), 19;
          case 18:
            return 13;
          case 19:
            return 22;
          case 20:
            return 11;
          case 21:
            S.getLogger().trace("Starting NSTR"), this.begin("NSTR");
            break;
          case 22:
            return S.getLogger().trace("description:", b.yytext), "NODE_DESCR";
          case 23:
            this.popState();
            break;
          case 24:
            return this.popState(), S.getLogger().trace("node end ))"), "NODE_DEND";
          case 25:
            return this.popState(), S.getLogger().trace("node end )"), "NODE_DEND";
          case 26:
            return this.popState(), S.getLogger().trace("node end ...", b.yytext), "NODE_DEND";
          case 27:
            return this.popState(), S.getLogger().trace("node end (("), "NODE_DEND";
          case 28:
            return this.popState(), S.getLogger().trace("node end (-"), "NODE_DEND";
          case 29:
            return this.popState(), S.getLogger().trace("node end (-"), "NODE_DEND";
          case 30:
            return this.popState(), S.getLogger().trace("node end (("), "NODE_DEND";
          case 31:
            return this.popState(), S.getLogger().trace("node end (("), "NODE_DEND";
          case 32:
            return S.getLogger().trace("Long description:", b.yytext), 20;
          case 33:
            return S.getLogger().trace("Long description:", b.yytext), 20;
        }
      },
      rules: [/^(?:\s*%%.*)/i, /^(?:mindmap\b)/i, /^(?::::)/i, /^(?:.+)/i, /^(?:\n)/i, /^(?:::icon\()/i, /^(?:[\s]+[\n])/i, /^(?:[\n]+)/i, /^(?:[^\)]+)/i, /^(?:\))/i, /^(?:-\))/i, /^(?:\(-)/i, /^(?:\)\))/i, /^(?:\))/i, /^(?:\(\()/i, /^(?:\{\{)/i, /^(?:\()/i, /^(?:\[)/i, /^(?:[\s]+)/i, /^(?:[^\(\[\n\-\)\{\}]+)/i, /^(?:$)/i, /^(?:["])/i, /^(?:[^"]+)/i, /^(?:["])/i, /^(?:[\)]\))/i, /^(?:[\)])/i, /^(?:[\]])/i, /^(?:\}\})/i, /^(?:\(-)/i, /^(?:-\))/i, /^(?:\(\()/i, /^(?:\()/i, /^(?:[^\)\]\(\}]+)/i, /^(?:.+(?!\(\())/i],
      conditions: { CLASS: { rules: [3, 4], inclusive: !1 }, ICON: { rules: [8, 9], inclusive: !1 }, NSTR: { rules: [22, 23], inclusive: !1 }, NODE: { rules: [21, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33], inclusive: !1 }, INITIAL: { rules: [0, 1, 2, 5, 6, 7, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20], inclusive: !0 } }
    };
    return T;
  }();
  p.lexer = E;
  function m() {
    this.yy = {};
  }
  return m.prototype = p, p.Parser = m, new m();
}();
Pn.parser = Pn;
const Ku = Pn, ea = (t) => Yu(t, jr());
let gt = [], Xs = 0, Qn = {};
const Zu = () => {
  gt = [], Xs = 0, Qn = {};
}, Qu = function(t) {
  for (let e = gt.length - 1; e >= 0; e--)
    if (gt[e].level < t)
      return gt[e];
  return null;
}, Ju = () => gt.length > 0 ? gt[0] : null, ju = (t, e, r, a) => {
  ur.info("addNode", t, e, r, a);
  const n = jr(), i = {
    id: Xs++,
    nodeId: ea(e),
    level: t,
    descr: ea(r),
    type: a,
    children: [],
    width: jr().mindmap.maxNodeWidth
  };
  switch (i.type) {
    case Me.ROUNDED_RECT:
      i.padding = 2 * n.mindmap.padding;
      break;
    case Me.RECT:
      i.padding = 2 * n.mindmap.padding;
      break;
    case Me.HEXAGON:
      i.padding = 2 * n.mindmap.padding;
      break;
    default:
      i.padding = n.mindmap.padding;
  }
  const s = Qu(t);
  if (s)
    s.children.push(i), gt.push(i);
  else if (gt.length === 0)
    gt.push(i);
  else {
    let o = new Error(
      'There can be only one root. No parent could be found for ("' + i.descr + '")'
    );
    throw o.hash = {
      text: "branch " + name,
      token: "branch " + name,
      line: "1",
      loc: { first_line: 1, last_line: 1, first_column: 1, last_column: 1 },
      expected: ['"checkout ' + name + '"']
    }, o;
  }
}, Me = {
  DEFAULT: 0,
  NO_BORDER: 0,
  ROUNDED_RECT: 1,
  RECT: 2,
  CIRCLE: 3,
  CLOUD: 4,
  BANG: 5,
  HEXAGON: 6
}, el = (t, e) => {
  switch (ur.debug("In get type", t, e), t) {
    case "[":
      return Me.RECT;
    case "(":
      return e === ")" ? Me.ROUNDED_RECT : Me.CLOUD;
    case "((":
      return Me.CIRCLE;
    case ")":
      return Me.CLOUD;
    case "))":
      return Me.BANG;
    case "{{":
      return Me.HEXAGON;
    default:
      return Me.DEFAULT;
  }
}, qs = (t, e) => {
  Qn[t] = e;
}, tl = (t) => {
  const e = gt[gt.length - 1];
  t && t.icon && (e.icon = ea(t.icon)), t && t.class && (e.class = ea(t.class));
}, lr = (t) => {
  switch (t) {
    case Me.DEFAULT:
      return "no-border";
    case Me.RECT:
      return "rect";
    case Me.ROUNDED_RECT:
      return "rounded-rect";
    case Me.CIRCLE:
      return "circle";
    case Me.CLOUD:
      return "cloud";
    case Me.BANG:
      return "bang";
    case Me.HEXAGON:
      return "hexgon";
    default:
      return "no-border";
  }
};
let Ws;
const rl = (t) => {
  Ws = t;
}, al = () => ur, nl = (t) => gt[t], Jn = (t) => Qn[t], il = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  addNode: ju,
  clear: Zu,
  decorateNode: tl,
  getElementById: Jn,
  getLogger: al,
  getMindmap: Ju,
  getNodeById: nl,
  getType: el,
  nodeType: Me,
  get parseError() {
    return Ws;
  },
  sanitizeText: ea,
  setElementForId: qs,
  setErrorHandler: rl,
  type2Str: lr
}, Symbol.toStringTag, { value: "Module" })), Ks = 12;
function sl(t, e) {
  t.each(function() {
    var r = Zr(this), a = r.text().split(/(\s+|<br>)/).reverse(), n, i = [], s = 1.1, o = r.attr("y"), u = parseFloat(r.attr("dy")), l = r.text(null).append("tspan").attr("x", 0).attr("y", o).attr("dy", u + "em");
    for (let f = 0; f < a.length; f++)
      n = a[a.length - 1 - f], i.push(n), l.text(i.join(" ").trim()), (l.node().getComputedTextLength() > e || n === "<br>") && (i.pop(), l.text(i.join(" ").trim()), n === "<br>" ? i = [""] : i = [n], l = r.append("tspan").attr("x", 0).attr("y", o).attr("dy", s + "em").text(n));
  });
}
const ol = function(t, e, r) {
  t.append("path").attr("id", "node-" + e.id).attr("class", "node-bkg node-" + lr(e.type)).attr(
    "d",
    `M0 ${e.height - 5} v${-e.height + 2 * 5} q0,-5 5,-5 h${e.width - 2 * 5} q5,0 5,5 v${e.height - 5} H0 Z`
  ), t.append("line").attr("class", "node-line-" + r).attr("x1", 0).attr("y1", e.height).attr("x2", e.width).attr("y2", e.height);
}, ul = function(t, e) {
  t.append("rect").attr("id", "node-" + e.id).attr("class", "node-bkg node-" + lr(e.type)).attr("height", e.height).attr("width", e.width);
}, ll = function(t, e) {
  const r = e.width, a = e.height, n = 0.15 * r, i = 0.25 * r, s = 0.35 * r, o = 0.2 * r;
  t.append("path").attr("id", "node-" + e.id).attr("class", "node-bkg node-" + lr(e.type)).attr(
    "d",
    `M0 0 a${n},${n} 0 0,1 ${r * 0.25},${-1 * r * 0.1}
      a${s},${s} 1 0,1 ${r * 0.4},${-1 * r * 0.1}
      a${i},${i} 1 0,1 ${r * 0.35},${1 * r * 0.2}

      a${n},${n} 1 0,1 ${r * 0.15},${1 * a * 0.35}
      a${o},${o} 1 0,1 ${-1 * r * 0.15},${1 * a * 0.65}

      a${i},${n} 1 0,1 ${-1 * r * 0.25},${r * 0.15}
      a${s},${s} 1 0,1 ${-1 * r * 0.5},${0}
      a${n},${n} 1 0,1 ${-1 * r * 0.25},${-1 * r * 0.15}

      a${n},${n} 1 0,1 ${-1 * r * 0.1},${-1 * a * 0.35}
      a${o},${o} 1 0,1 ${r * 0.1},${-1 * a * 0.65}

    H0 V0 Z`
  );
}, fl = function(t, e) {
  const r = e.width, a = e.height, n = 0.15 * r;
  t.append("path").attr("id", "node-" + e.id).attr("class", "node-bkg node-" + lr(e.type)).attr(
    "d",
    `M0 0 a${n},${n} 1 0,0 ${r * 0.25},${-1 * a * 0.1}
      a${n},${n} 1 0,0 ${r * 0.25},${0}
      a${n},${n} 1 0,0 ${r * 0.25},${0}
      a${n},${n} 1 0,0 ${r * 0.25},${1 * a * 0.1}

      a${n},${n} 1 0,0 ${r * 0.15},${1 * a * 0.33}
      a${n * 0.8},${n * 0.8} 1 0,0 ${0},${1 * a * 0.34}
      a${n},${n} 1 0,0 ${-1 * r * 0.15},${1 * a * 0.33}

      a${n},${n} 1 0,0 ${-1 * r * 0.25},${a * 0.15}
      a${n},${n} 1 0,0 ${-1 * r * 0.25},${0}
      a${n},${n} 1 0,0 ${-1 * r * 0.25},${0}
      a${n},${n} 1 0,0 ${-1 * r * 0.25},${-1 * a * 0.15}

      a${n},${n} 1 0,0 ${-1 * r * 0.1},${-1 * a * 0.33}
      a${n * 0.8},${n * 0.8} 1 0,0 ${0},${-1 * a * 0.34}
      a${n},${n} 1 0,0 ${r * 0.1},${-1 * a * 0.33}

    H0 V0 Z`
  );
}, hl = function(t, e) {
  t.append("circle").attr("id", "node-" + e.id).attr("class", "node-bkg node-" + lr(e.type)).attr("r", e.width / 2);
};
function vl(t, e, r, a, n) {
  return t.insert("polygon", ":first-child").attr(
    "points",
    a.map(function(i) {
      return i.x + "," + i.y;
    }).join(" ")
  ).attr("transform", "translate(" + (n.width - e) / 2 + ", " + r + ")");
}
const cl = function(t, e) {
  const r = e.height, n = r / 4, i = e.width - e.padding + 2 * n, s = [
    { x: n, y: 0 },
    { x: i - n, y: 0 },
    { x: i, y: -r / 2 },
    { x: i - n, y: -r },
    { x: n, y: -r },
    { x: 0, y: -r / 2 }
  ];
  vl(t, i, r, s, e);
}, dl = function(t, e) {
  t.append("rect").attr("id", "node-" + e.id).attr("class", "node-bkg node-" + lr(e.type)).attr("height", e.height).attr("rx", e.padding).attr("ry", e.padding).attr("width", e.width);
}, gl = function(t, e, r, a) {
  const n = r % (Ks - 1), i = t.append("g");
  e.section = n;
  let s = "section-" + n;
  n < 0 && (s += " section-root"), i.attr("class", (e.class ? e.class + " " : "") + "mindmap-node " + s);
  const o = i.append("g"), u = i.append("g"), f = u.append("text").text(e.descr).attr("dy", "1em").attr("alignment-baseline", "middle").attr("dominant-baseline", "middle").attr("text-anchor", "middle").call(sl, e.width).node().getBBox(), h = a.fontSize.replace ? a.fontSize.replace("px", "") : a.fontSize;
  if (e.height = f.height + h * 1.1 * 0.5 + e.padding, e.width = f.width + 2 * e.padding, e.icon)
    if (e.type === Me.CIRCLE)
      e.height += 50, e.width += 50, i.append("foreignObject").attr("height", "50px").attr("width", e.width).attr("style", "text-align: center;").append("div").attr("class", "icon-container").append("i").attr("class", "node-icon-" + n + " " + e.icon), u.attr(
        "transform",
        "translate(" + e.width / 2 + ", " + (e.height / 2 - 1.5 * e.padding) + ")"
      );
    else {
      e.width += 50;
      const c = e.height;
      e.height = Math.max(c, 60);
      const v = Math.abs(e.height - c);
      i.append("foreignObject").attr("width", "60px").attr("height", e.height).attr("style", "text-align: center;margin-top:" + v / 2 + "px;").append("div").attr("class", "icon-container").append("i").attr("class", "node-icon-" + n + " " + e.icon), u.attr(
        "transform",
        "translate(" + (25 + e.width / 2) + ", " + (v / 2 + e.padding / 2) + ")"
      );
    }
  else
    u.attr("transform", "translate(" + e.width / 2 + ", " + e.padding / 2 + ")");
  switch (e.type) {
    case Me.DEFAULT:
      ol(o, e, n);
      break;
    case Me.ROUNDED_RECT:
      dl(o, e);
      break;
    case Me.RECT:
      ul(o, e);
      break;
    case Me.CIRCLE:
      o.attr("transform", "translate(" + e.width / 2 + ", " + +e.height / 2 + ")"), hl(o, e);
      break;
    case Me.CLOUD:
      ll(o, e);
      break;
    case Me.BANG:
      fl(o, e);
      break;
    case Me.HEXAGON:
      cl(o, e);
      break;
  }
  return qs(e.id, i), e.height;
}, pl = function(e, r, a, n, i) {
  const s = i % (Ks - 1), o = a.x + a.width / 2, u = a.y + a.height / 2, l = r.x + r.width / 2, f = r.y + r.height / 2, h = l > o ? o + Math.abs(o - l) / 2 : o - Math.abs(o - l) / 2, c = f > u ? u + Math.abs(u - f) / 2 : u - Math.abs(u - f) / 2, v = l > o ? Math.abs(o - h) / 2 + o : -Math.abs(o - h) / 2 + o, d = f > u ? Math.abs(u - c) / 2 + u : -Math.abs(u - c) / 2 + u;
  e.append("path").attr(
    "d",
    a.direction === "TB" || a.direction === "BT" ? `M${o},${u} Q${o},${d} ${h},${c} T${l},${f}` : `M${o},${u} Q${v},${u} ${h},${c} T${l},${f}`
  ).attr("class", "edge section-edge-" + s + " edge-depth-" + n);
}, yl = function(t) {
  const e = Jn(t.id), r = t.x || 0, a = t.y || 0;
  e.attr("transform", "translate(" + r + "," + a + ")");
}, Zs = { drawNode: gl, positionNode: yl, drawEdge: pl };
function ml(t) {
  var e = typeof t;
  return t != null && (e == "object" || e == "function");
}
var ha = ml, bl = typeof $t == "object" && $t && $t.Object === Object && $t, El = bl, wl = El, xl = typeof self == "object" && self && self.Object === Object && self, Tl = wl || xl || Function("return this")(), en = Tl, Cl = en, Dl = function() {
  return Cl.Date.now();
}, Sl = Dl, Ll = /\s/;
function Al(t) {
  for (var e = t.length; e-- && Ll.test(t.charAt(e)); )
    ;
  return e;
}
var Ol = Al, Nl = Ol, Ml = /^\s+/;
function Il(t) {
  return t && t.slice(0, Nl(t) + 1).replace(Ml, "");
}
var Rl = Il, kl = en, Pl = kl.Symbol, jn = Pl, Li = jn, Qs = Object.prototype, Bl = Qs.hasOwnProperty, Fl = Qs.toString, Vr = Li ? Li.toStringTag : void 0;
function Gl(t) {
  var e = Bl.call(t, Vr), r = t[Vr];
  try {
    t[Vr] = void 0;
    var a = !0;
  } catch {
  }
  var n = Fl.call(t);
  return a && (e ? t[Vr] = r : delete t[Vr]), n;
}
var zl = Gl, $l = Object.prototype, Vl = $l.toString;
function _l(t) {
  return Vl.call(t);
}
var Ul = _l, Ai = jn, Yl = zl, Hl = Ul, Xl = "[object Null]", ql = "[object Undefined]", Oi = Ai ? Ai.toStringTag : void 0;
function Wl(t) {
  return t == null ? t === void 0 ? ql : Xl : Oi && Oi in Object(t) ? Yl(t) : Hl(t);
}
var Js = Wl;
function Kl(t) {
  return t != null && typeof t == "object";
}
var Zl = Kl, Ql = Js, Jl = Zl, jl = "[object Symbol]";
function ef(t) {
  return typeof t == "symbol" || Jl(t) && Ql(t) == jl;
}
var va = ef, tf = Rl, Ni = ha, rf = va, Mi = 0 / 0, af = /^[-+]0x[0-9a-f]+$/i, nf = /^0b[01]+$/i, sf = /^0o[0-7]+$/i, of = parseInt;
function uf(t) {
  if (typeof t == "number")
    return t;
  if (rf(t))
    return Mi;
  if (Ni(t)) {
    var e = typeof t.valueOf == "function" ? t.valueOf() : t;
    t = Ni(e) ? e + "" : e;
  }
  if (typeof t != "string")
    return t === 0 ? t : +t;
  t = tf(t);
  var r = nf.test(t);
  return r || sf.test(t) ? of(t.slice(2), r ? 2 : 8) : af.test(t) ? Mi : +t;
}
var lf = uf, ff = ha, xn = Sl, Ii = lf, hf = "Expected a function", vf = Math.max, cf = Math.min;
function df(t, e, r) {
  var a, n, i, s, o, u, l = 0, f = !1, h = !1, c = !0;
  if (typeof t != "function")
    throw new TypeError(hf);
  e = Ii(e) || 0, ff(r) && (f = !!r.leading, h = "maxWait" in r, i = h ? vf(Ii(r.maxWait) || 0, e) : i, c = "trailing" in r ? !!r.trailing : c);
  function v(S) {
    var b = a, x = n;
    return a = n = void 0, l = S, s = t.apply(x, b), s;
  }
  function d(S) {
    return l = S, o = setTimeout(p, e), f ? v(S) : s;
  }
  function g(S) {
    var b = S - u, x = S - l, w = e - b;
    return h ? cf(w, i - x) : w;
  }
  function y(S) {
    var b = S - u, x = S - l;
    return u === void 0 || b >= e || b < 0 || h && x >= i;
  }
  function p() {
    var S = xn();
    if (y(S))
      return E(S);
    o = setTimeout(p, g(S));
  }
  function E(S) {
    return o = void 0, c && a ? v(S) : (a = n = void 0, s);
  }
  function m() {
    o !== void 0 && clearTimeout(o), l = 0, a = u = n = o = void 0;
  }
  function T() {
    return o === void 0 ? s : E(xn());
  }
  function C() {
    var S = xn(), b = y(S);
    if (a = arguments, n = this, u = S, b) {
      if (o === void 0)
        return d(u);
      if (h)
        return clearTimeout(o), o = setTimeout(p, e), v(u);
    }
    return o === void 0 && (o = setTimeout(p, e)), s;
  }
  return C.cancel = m, C.flush = T, C;
}
var tn = df, Bn = {}, gf = {
  get exports() {
    return Bn;
  },
  set exports(t) {
    Bn = t;
  }
}, Fn = {}, pf = {
  get exports() {
    return Fn;
  },
  set exports(t) {
    Fn = t;
  }
};
(function(t, e) {
  (function() {
    var r, a, n, i, s, o, u, l, f, h, c, v, d, g, y;
    n = Math.floor, h = Math.min, a = function(p, E) {
      return p < E ? -1 : p > E ? 1 : 0;
    }, f = function(p, E, m, T, C) {
      var S;
      if (m == null && (m = 0), C == null && (C = a), m < 0)
        throw new Error("lo must be non-negative");
      for (T == null && (T = p.length); m < T; )
        S = n((m + T) / 2), C(E, p[S]) < 0 ? T = S : m = S + 1;
      return [].splice.apply(p, [m, m - m].concat(E)), E;
    }, o = function(p, E, m) {
      return m == null && (m = a), p.push(E), g(p, 0, p.length - 1, m);
    }, s = function(p, E) {
      var m, T;
      return E == null && (E = a), m = p.pop(), p.length ? (T = p[0], p[0] = m, y(p, 0, E)) : T = m, T;
    }, l = function(p, E, m) {
      var T;
      return m == null && (m = a), T = p[0], p[0] = E, y(p, 0, m), T;
    }, u = function(p, E, m) {
      var T;
      return m == null && (m = a), p.length && m(p[0], E) < 0 && (T = [p[0], E], E = T[0], p[0] = T[1], y(p, 0, m)), E;
    }, i = function(p, E) {
      var m, T, C, S, b, x;
      for (E == null && (E = a), S = function() {
        x = [];
        for (var w = 0, D = n(p.length / 2); 0 <= D ? w < D : w > D; 0 <= D ? w++ : w--)
          x.push(w);
        return x;
      }.apply(this).reverse(), b = [], T = 0, C = S.length; T < C; T++)
        m = S[T], b.push(y(p, m, E));
      return b;
    }, d = function(p, E, m) {
      var T;
      if (m == null && (m = a), T = p.indexOf(E), T !== -1)
        return g(p, 0, T, m), y(p, T, m);
    }, c = function(p, E, m) {
      var T, C, S, b, x;
      if (m == null && (m = a), C = p.slice(0, E), !C.length)
        return C;
      for (i(C, m), x = p.slice(E), S = 0, b = x.length; S < b; S++)
        T = x[S], u(C, T, m);
      return C.sort(m).reverse();
    }, v = function(p, E, m) {
      var T, C, S, b, x, w, D, A, L;
      if (m == null && (m = a), E * 10 <= p.length) {
        if (S = p.slice(0, E).sort(m), !S.length)
          return S;
        for (C = S[S.length - 1], D = p.slice(E), b = 0, w = D.length; b < w; b++)
          T = D[b], m(T, C) < 0 && (f(S, T, 0, null, m), S.pop(), C = S[S.length - 1]);
        return S;
      }
      for (i(p, m), L = [], x = 0, A = h(E, p.length); 0 <= A ? x < A : x > A; 0 <= A ? ++x : --x)
        L.push(s(p, m));
      return L;
    }, g = function(p, E, m, T) {
      var C, S, b;
      for (T == null && (T = a), C = p[m]; m > E; ) {
        if (b = m - 1 >> 1, S = p[b], T(C, S) < 0) {
          p[m] = S, m = b;
          continue;
        }
        break;
      }
      return p[m] = C;
    }, y = function(p, E, m) {
      var T, C, S, b, x;
      for (m == null && (m = a), C = p.length, x = E, S = p[E], T = 2 * E + 1; T < C; )
        b = T + 1, b < C && !(m(p[T], p[b]) < 0) && (T = b), p[E] = p[T], E = T, T = 2 * E + 1;
      return p[E] = S, g(p, x, E, m);
    }, r = function() {
      p.push = o, p.pop = s, p.replace = l, p.pushpop = u, p.heapify = i, p.updateItem = d, p.nlargest = c, p.nsmallest = v;
      function p(E) {
        this.cmp = E ?? a, this.nodes = [];
      }
      return p.prototype.push = function(E) {
        return o(this.nodes, E, this.cmp);
      }, p.prototype.pop = function() {
        return s(this.nodes, this.cmp);
      }, p.prototype.peek = function() {
        return this.nodes[0];
      }, p.prototype.contains = function(E) {
        return this.nodes.indexOf(E) !== -1;
      }, p.prototype.replace = function(E) {
        return l(this.nodes, E, this.cmp);
      }, p.prototype.pushpop = function(E) {
        return u(this.nodes, E, this.cmp);
      }, p.prototype.heapify = function() {
        return i(this.nodes, this.cmp);
      }, p.prototype.updateItem = function(E) {
        return d(this.nodes, E, this.cmp);
      }, p.prototype.clear = function() {
        return this.nodes = [];
      }, p.prototype.empty = function() {
        return this.nodes.length === 0;
      }, p.prototype.size = function() {
        return this.nodes.length;
      }, p.prototype.clone = function() {
        var E;
        return E = new p(), E.nodes = this.nodes.slice(0), E;
      }, p.prototype.toArray = function() {
        return this.nodes.slice(0);
      }, p.prototype.insert = p.prototype.push, p.prototype.top = p.prototype.peek, p.prototype.front = p.prototype.peek, p.prototype.has = p.prototype.contains, p.prototype.copy = p.prototype.clone, p;
    }(), function(p, E) {
      return t.exports = E();
    }(this, function() {
      return r;
    });
  }).call($t);
})(pf);
(function(t) {
  t.exports = Fn;
})(gf);
const ca = /* @__PURE__ */ Hs(Bn);
var yf = Array.isArray, rn = yf, mf = rn, bf = va, Ef = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, wf = /^\w*$/;
function xf(t, e) {
  if (mf(t))
    return !1;
  var r = typeof t;
  return r == "number" || r == "symbol" || r == "boolean" || t == null || bf(t) ? !0 : wf.test(t) || !Ef.test(t) || e != null && t in Object(e);
}
var Tf = xf, Cf = Js, Df = ha, Sf = "[object AsyncFunction]", Lf = "[object Function]", Af = "[object GeneratorFunction]", Of = "[object Proxy]";
function Nf(t) {
  if (!Df(t))
    return !1;
  var e = Cf(t);
  return e == Lf || e == Af || e == Sf || e == Of;
}
var Mf = Nf, If = en, Rf = If["__core-js_shared__"], kf = Rf, Tn = kf, Ri = function() {
  var t = /[^.]+$/.exec(Tn && Tn.keys && Tn.keys.IE_PROTO || "");
  return t ? "Symbol(src)_1." + t : "";
}();
function Pf(t) {
  return !!Ri && Ri in t;
}
var Bf = Pf, Ff = Function.prototype, Gf = Ff.toString;
function zf(t) {
  if (t != null) {
    try {
      return Gf.call(t);
    } catch {
    }
    try {
      return t + "";
    } catch {
    }
  }
  return "";
}
var $f = zf, Vf = Mf, _f = Bf, Uf = ha, Yf = $f, Hf = /[\\^$.*+?()[\]{}|]/g, Xf = /^\[object .+?Constructor\]$/, qf = Function.prototype, Wf = Object.prototype, Kf = qf.toString, Zf = Wf.hasOwnProperty, Qf = RegExp(
  "^" + Kf.call(Zf).replace(Hf, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
);
function Jf(t) {
  if (!Uf(t) || _f(t))
    return !1;
  var e = Vf(t) ? Qf : Xf;
  return e.test(Yf(t));
}
var jf = Jf;
function eh(t, e) {
  return t == null ? void 0 : t[e];
}
var th = eh, rh = jf, ah = th;
function nh(t, e) {
  var r = ah(t, e);
  return rh(r) ? r : void 0;
}
var ei = nh, ih = ei, sh = ih(Object, "create"), an = sh, ki = an;
function oh() {
  this.__data__ = ki ? ki(null) : {}, this.size = 0;
}
var uh = oh;
function lh(t) {
  var e = this.has(t) && delete this.__data__[t];
  return this.size -= e ? 1 : 0, e;
}
var fh = lh, hh = an, vh = "__lodash_hash_undefined__", ch = Object.prototype, dh = ch.hasOwnProperty;
function gh(t) {
  var e = this.__data__;
  if (hh) {
    var r = e[t];
    return r === vh ? void 0 : r;
  }
  return dh.call(e, t) ? e[t] : void 0;
}
var ph = gh, yh = an, mh = Object.prototype, bh = mh.hasOwnProperty;
function Eh(t) {
  var e = this.__data__;
  return yh ? e[t] !== void 0 : bh.call(e, t);
}
var wh = Eh, xh = an, Th = "__lodash_hash_undefined__";
function Ch(t, e) {
  var r = this.__data__;
  return this.size += this.has(t) ? 0 : 1, r[t] = xh && e === void 0 ? Th : e, this;
}
var Dh = Ch, Sh = uh, Lh = fh, Ah = ph, Oh = wh, Nh = Dh;
function Or(t) {
  var e = -1, r = t == null ? 0 : t.length;
  for (this.clear(); ++e < r; ) {
    var a = t[e];
    this.set(a[0], a[1]);
  }
}
Or.prototype.clear = Sh;
Or.prototype.delete = Lh;
Or.prototype.get = Ah;
Or.prototype.has = Oh;
Or.prototype.set = Nh;
var Mh = Or;
function Ih() {
  this.__data__ = [], this.size = 0;
}
var Rh = Ih;
function kh(t, e) {
  return t === e || t !== t && e !== e;
}
var js = kh, Ph = js;
function Bh(t, e) {
  for (var r = t.length; r--; )
    if (Ph(t[r][0], e))
      return r;
  return -1;
}
var nn = Bh, Fh = nn, Gh = Array.prototype, zh = Gh.splice;
function $h(t) {
  var e = this.__data__, r = Fh(e, t);
  if (r < 0)
    return !1;
  var a = e.length - 1;
  return r == a ? e.pop() : zh.call(e, r, 1), --this.size, !0;
}
var Vh = $h, _h = nn;
function Uh(t) {
  var e = this.__data__, r = _h(e, t);
  return r < 0 ? void 0 : e[r][1];
}
var Yh = Uh, Hh = nn;
function Xh(t) {
  return Hh(this.__data__, t) > -1;
}
var qh = Xh, Wh = nn;
function Kh(t, e) {
  var r = this.__data__, a = Wh(r, t);
  return a < 0 ? (++this.size, r.push([t, e])) : r[a][1] = e, this;
}
var Zh = Kh, Qh = Rh, Jh = Vh, jh = Yh, ev = qh, tv = Zh;
function Nr(t) {
  var e = -1, r = t == null ? 0 : t.length;
  for (this.clear(); ++e < r; ) {
    var a = t[e];
    this.set(a[0], a[1]);
  }
}
Nr.prototype.clear = Qh;
Nr.prototype.delete = Jh;
Nr.prototype.get = jh;
Nr.prototype.has = ev;
Nr.prototype.set = tv;
var rv = Nr, av = ei, nv = en, iv = av(nv, "Map"), sv = iv, Pi = Mh, ov = rv, uv = sv;
function lv() {
  this.size = 0, this.__data__ = {
    hash: new Pi(),
    map: new (uv || ov)(),
    string: new Pi()
  };
}
var fv = lv;
function hv(t) {
  var e = typeof t;
  return e == "string" || e == "number" || e == "symbol" || e == "boolean" ? t !== "__proto__" : t === null;
}
var vv = hv, cv = vv;
function dv(t, e) {
  var r = t.__data__;
  return cv(e) ? r[typeof e == "string" ? "string" : "hash"] : r.map;
}
var sn = dv, gv = sn;
function pv(t) {
  var e = gv(this, t).delete(t);
  return this.size -= e ? 1 : 0, e;
}
var yv = pv, mv = sn;
function bv(t) {
  return mv(this, t).get(t);
}
var Ev = bv, wv = sn;
function xv(t) {
  return wv(this, t).has(t);
}
var Tv = xv, Cv = sn;
function Dv(t, e) {
  var r = Cv(this, t), a = r.size;
  return r.set(t, e), this.size += r.size == a ? 0 : 1, this;
}
var Sv = Dv, Lv = fv, Av = yv, Ov = Ev, Nv = Tv, Mv = Sv;
function Mr(t) {
  var e = -1, r = t == null ? 0 : t.length;
  for (this.clear(); ++e < r; ) {
    var a = t[e];
    this.set(a[0], a[1]);
  }
}
Mr.prototype.clear = Lv;
Mr.prototype.delete = Av;
Mr.prototype.get = Ov;
Mr.prototype.has = Nv;
Mr.prototype.set = Mv;
var Iv = Mr, eo = Iv, Rv = "Expected a function";
function ti(t, e) {
  if (typeof t != "function" || e != null && typeof e != "function")
    throw new TypeError(Rv);
  var r = function() {
    var a = arguments, n = e ? e.apply(this, a) : a[0], i = r.cache;
    if (i.has(n))
      return i.get(n);
    var s = t.apply(this, a);
    return r.cache = i.set(n, s) || i, s;
  };
  return r.cache = new (ti.Cache || eo)(), r;
}
ti.Cache = eo;
var kv = ti, Pv = kv, Bv = 500;
function Fv(t) {
  var e = Pv(t, function(a) {
    return r.size === Bv && r.clear(), a;
  }), r = e.cache;
  return e;
}
var Gv = Fv, zv = Gv, $v = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, Vv = /\\(\\)?/g, _v = zv(function(t) {
  var e = [];
  return t.charCodeAt(0) === 46 && e.push(""), t.replace($v, function(r, a, n, i) {
    e.push(n ? i.replace(Vv, "$1") : a || r);
  }), e;
}), to = _v;
function Uv(t, e) {
  for (var r = -1, a = t == null ? 0 : t.length, n = Array(a); ++r < a; )
    n[r] = e(t[r], r, t);
  return n;
}
var ro = Uv, Bi = jn, Yv = ro, Hv = rn, Xv = va, qv = 1 / 0, Fi = Bi ? Bi.prototype : void 0, Gi = Fi ? Fi.toString : void 0;
function ao(t) {
  if (typeof t == "string")
    return t;
  if (Hv(t))
    return Yv(t, ao) + "";
  if (Xv(t))
    return Gi ? Gi.call(t) : "";
  var e = t + "";
  return e == "0" && 1 / t == -qv ? "-0" : e;
}
var Wv = ao, Kv = Wv;
function Zv(t) {
  return t == null ? "" : Kv(t);
}
var no = Zv, Qv = rn, Jv = Tf, jv = to, ec = no;
function tc(t, e) {
  return Qv(t) ? t : Jv(t, e) ? [t] : jv(ec(t));
}
var io = tc, rc = va, ac = 1 / 0;
function nc(t) {
  if (typeof t == "string" || rc(t))
    return t;
  var e = t + "";
  return e == "0" && 1 / t == -ac ? "-0" : e;
}
var ri = nc, ic = io, sc = ri;
function oc(t, e) {
  e = ic(e, t);
  for (var r = 0, a = e.length; t != null && r < a; )
    t = t[sc(e[r++])];
  return r && r == a ? t : void 0;
}
var uc = oc, lc = uc;
function fc(t, e, r) {
  var a = t == null ? void 0 : lc(t, e);
  return a === void 0 ? r : a;
}
var hc = fc, vc = ei, cc = function() {
  try {
    var t = vc(Object, "defineProperty");
    return t({}, "", {}), t;
  } catch {
  }
}(), dc = cc, zi = dc;
function gc(t, e, r) {
  e == "__proto__" && zi ? zi(t, e, {
    configurable: !0,
    enumerable: !0,
    value: r,
    writable: !0
  }) : t[e] = r;
}
var pc = gc, yc = pc, mc = js, bc = Object.prototype, Ec = bc.hasOwnProperty;
function wc(t, e, r) {
  var a = t[e];
  (!(Ec.call(t, e) && mc(a, r)) || r === void 0 && !(e in t)) && yc(t, e, r);
}
var xc = wc, Tc = 9007199254740991, Cc = /^(?:0|[1-9]\d*)$/;
function Dc(t, e) {
  var r = typeof t;
  return e = e ?? Tc, !!e && (r == "number" || r != "symbol" && Cc.test(t)) && t > -1 && t % 1 == 0 && t < e;
}
var Sc = Dc, Lc = xc, Ac = io, Oc = Sc, $i = ha, Nc = ri;
function Mc(t, e, r, a) {
  if (!$i(t))
    return t;
  e = Ac(e, t);
  for (var n = -1, i = e.length, s = i - 1, o = t; o != null && ++n < i; ) {
    var u = Nc(e[n]), l = r;
    if (u === "__proto__" || u === "constructor" || u === "prototype")
      return t;
    if (n != s) {
      var f = o[u];
      l = a ? a(f, u, o) : void 0, l === void 0 && (l = $i(f) ? f : Oc(e[n + 1]) ? [] : {});
    }
    Lc(o, u, l), o = o[u];
  }
  return t;
}
var Ic = Mc, Rc = Ic;
function kc(t, e, r) {
  return t == null ? t : Rc(t, e, r);
}
var Pc = kc;
function Bc(t, e) {
  var r = -1, a = t.length;
  for (e || (e = Array(a)); ++r < a; )
    e[r] = t[r];
  return e;
}
var Fc = Bc, Gc = ro, zc = Fc, $c = rn, Vc = va, _c = to, Uc = ri, Yc = no;
function Hc(t) {
  return $c(t) ? Gc(t, Uc) : Vc(t) ? [t] : zc(_c(Yc(t)));
}
var Xc = Hc;
function _e(t) {
  return _e = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e;
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  }, _e(t);
}
function ai(t, e) {
  if (!(t instanceof e))
    throw new TypeError("Cannot call a class as a function");
}
function Vi(t, e) {
  for (var r = 0; r < e.length; r++) {
    var a = e[r];
    a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), Object.defineProperty(t, a.key, a);
  }
}
function ni(t, e, r) {
  return e && Vi(t.prototype, e), r && Vi(t, r), Object.defineProperty(t, "prototype", {
    writable: !1
  }), t;
}
function so(t, e, r) {
  return e in t ? Object.defineProperty(t, e, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[e] = r, t;
}
function Nt(t, e) {
  return qc(t) || Wc(t, e) || Kc(t, e) || Zc();
}
function qc(t) {
  if (Array.isArray(t))
    return t;
}
function Wc(t, e) {
  var r = t == null ? null : typeof Symbol < "u" && t[Symbol.iterator] || t["@@iterator"];
  if (r != null) {
    var a = [], n = !0, i = !1, s, o;
    try {
      for (r = r.call(t); !(n = (s = r.next()).done) && (a.push(s.value), !(e && a.length === e)); n = !0)
        ;
    } catch (u) {
      i = !0, o = u;
    } finally {
      try {
        !n && r.return != null && r.return();
      } finally {
        if (i)
          throw o;
      }
    }
    return a;
  }
}
function Kc(t, e) {
  if (t) {
    if (typeof t == "string")
      return _i(t, e);
    var r = Object.prototype.toString.call(t).slice(8, -1);
    if (r === "Object" && t.constructor && (r = t.constructor.name), r === "Map" || r === "Set")
      return Array.from(t);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))
      return _i(t, e);
  }
}
function _i(t, e) {
  (e == null || e > t.length) && (e = t.length);
  for (var r = 0, a = new Array(e); r < e; r++)
    a[r] = t[r];
  return a;
}
function Zc() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
var Be = typeof window > "u" ? null : window, Ui = Be ? Be.navigator : null;
Be && Be.document;
var Qc = _e(""), oo = _e({}), Jc = _e(function() {
}), jc = typeof HTMLElement > "u" ? "undefined" : _e(HTMLElement), da = function(e) {
  return e && e.instanceString && Fe(e.instanceString) ? e.instanceString() : null;
}, le = function(e) {
  return e != null && _e(e) == Qc;
}, Fe = function(e) {
  return e != null && _e(e) === Jc;
}, Ie = function(e) {
  return !ft(e) && (Array.isArray ? Array.isArray(e) : e != null && e instanceof Array);
}, Te = function(e) {
  return e != null && _e(e) === oo && !Ie(e) && e.constructor === Object;
}, ed = function(e) {
  return e != null && _e(e) === oo;
}, ae = function(e) {
  return e != null && _e(e) === _e(1) && !isNaN(e);
}, td = function(e) {
  return ae(e) && Math.floor(e) === e;
}, Ua = function(e) {
  if (jc !== "undefined")
    return e != null && e instanceof HTMLElement;
}, ft = function(e) {
  return ga(e) || uo(e);
}, ga = function(e) {
  return da(e) === "collection" && e._private.single;
}, uo = function(e) {
  return da(e) === "collection" && !e._private.single;
}, ii = function(e) {
  return da(e) === "core";
}, lo = function(e) {
  return da(e) === "stylesheet";
}, rd = function(e) {
  return da(e) === "event";
}, Yt = function(e) {
  return e == null ? !0 : !!(e === "" || e.match(/^\s+$/));
}, ad = function(e) {
  return typeof HTMLElement > "u" ? !1 : e instanceof HTMLElement;
}, nd = function(e) {
  return Te(e) && ae(e.x1) && ae(e.x2) && ae(e.y1) && ae(e.y2);
}, id = function(e) {
  return ed(e) && Fe(e.then);
}, sd = function() {
  return Ui && Ui.userAgent.match(/msie|trident|edge/i);
}, ta = function(e, r) {
  r || (r = function() {
    if (arguments.length === 1)
      return arguments[0];
    if (arguments.length === 0)
      return "undefined";
    for (var i = [], s = 0; s < arguments.length; s++)
      i.push(arguments[s]);
    return i.join("$");
  });
  var a = function n() {
    var i = this, s = arguments, o, u = r.apply(i, s), l = n.cache;
    return (o = l[u]) || (o = l[u] = e.apply(i, s)), o;
  };
  return a.cache = {}, a;
}, si = ta(function(t) {
  return t.replace(/([A-Z])/g, function(e) {
    return "-" + e.toLowerCase();
  });
}), on = ta(function(t) {
  return t.replace(/(-\w)/g, function(e) {
    return e[1].toUpperCase();
  });
}), fo = ta(function(t, e) {
  return t + e[0].toUpperCase() + e.substring(1);
}, function(t, e) {
  return t + "$" + e;
}), Yi = function(e) {
  return Yt(e) ? e : e.charAt(0).toUpperCase() + e.substring(1);
}, Ve = "(?:[-+]?(?:(?:\\d+|\\d*\\.\\d+)(?:[Ee][+-]?\\d+)?))", od = "rgb[a]?\\((" + Ve + "[%]?)\\s*,\\s*(" + Ve + "[%]?)\\s*,\\s*(" + Ve + "[%]?)(?:\\s*,\\s*(" + Ve + "))?\\)", ud = "rgb[a]?\\((?:" + Ve + "[%]?)\\s*,\\s*(?:" + Ve + "[%]?)\\s*,\\s*(?:" + Ve + "[%]?)(?:\\s*,\\s*(?:" + Ve + "))?\\)", ld = "hsl[a]?\\((" + Ve + ")\\s*,\\s*(" + Ve + "[%])\\s*,\\s*(" + Ve + "[%])(?:\\s*,\\s*(" + Ve + "))?\\)", fd = "hsl[a]?\\((?:" + Ve + ")\\s*,\\s*(?:" + Ve + "[%])\\s*,\\s*(?:" + Ve + "[%])(?:\\s*,\\s*(?:" + Ve + "))?\\)", hd = "\\#[0-9a-fA-F]{3}", vd = "\\#[0-9a-fA-F]{6}", ho = function(e, r) {
  return e < r ? -1 : e > r ? 1 : 0;
}, cd = function(e, r) {
  return -1 * ho(e, r);
}, ce = Object.assign != null ? Object.assign.bind(Object) : function(t) {
  for (var e = arguments, r = 1; r < e.length; r++) {
    var a = e[r];
    if (a != null)
      for (var n = Object.keys(a), i = 0; i < n.length; i++) {
        var s = n[i];
        t[s] = a[s];
      }
  }
  return t;
}, dd = function(e) {
  if (!(!(e.length === 4 || e.length === 7) || e[0] !== "#")) {
    var r = e.length === 4, a, n, i, s = 16;
    return r ? (a = parseInt(e[1] + e[1], s), n = parseInt(e[2] + e[2], s), i = parseInt(e[3] + e[3], s)) : (a = parseInt(e[1] + e[2], s), n = parseInt(e[3] + e[4], s), i = parseInt(e[5] + e[6], s)), [a, n, i];
  }
}, gd = function(e) {
  var r, a, n, i, s, o, u, l;
  function f(d, g, y) {
    return y < 0 && (y += 1), y > 1 && (y -= 1), y < 1 / 6 ? d + (g - d) * 6 * y : y < 1 / 2 ? g : y < 2 / 3 ? d + (g - d) * (2 / 3 - y) * 6 : d;
  }
  var h = new RegExp("^" + ld + "$").exec(e);
  if (h) {
    if (a = parseInt(h[1]), a < 0 ? a = (360 - -1 * a % 360) % 360 : a > 360 && (a = a % 360), a /= 360, n = parseFloat(h[2]), n < 0 || n > 100 || (n = n / 100, i = parseFloat(h[3]), i < 0 || i > 100) || (i = i / 100, s = h[4], s !== void 0 && (s = parseFloat(s), s < 0 || s > 1)))
      return;
    if (n === 0)
      o = u = l = Math.round(i * 255);
    else {
      var c = i < 0.5 ? i * (1 + n) : i + n - i * n, v = 2 * i - c;
      o = Math.round(255 * f(v, c, a + 1 / 3)), u = Math.round(255 * f(v, c, a)), l = Math.round(255 * f(v, c, a - 1 / 3));
    }
    r = [o, u, l, s];
  }
  return r;
}, pd = function(e) {
  var r, a = new RegExp("^" + od + "$").exec(e);
  if (a) {
    r = [];
    for (var n = [], i = 1; i <= 3; i++) {
      var s = a[i];
      if (s[s.length - 1] === "%" && (n[i] = !0), s = parseFloat(s), n[i] && (s = s / 100 * 255), s < 0 || s > 255)
        return;
      r.push(Math.floor(s));
    }
    var o = n[1] || n[2] || n[3], u = n[1] && n[2] && n[3];
    if (o && !u)
      return;
    var l = a[4];
    if (l !== void 0) {
      if (l = parseFloat(l), l < 0 || l > 1)
        return;
      r.push(l);
    }
  }
  return r;
}, yd = function(e) {
  return bd[e.toLowerCase()];
}, md = function(e) {
  return (Ie(e) ? e : null) || yd(e) || dd(e) || pd(e) || gd(e);
}, bd = {
  // special colour names
  transparent: [0, 0, 0, 0],
  // NB alpha === 0
  // regular colours
  aliceblue: [240, 248, 255],
  antiquewhite: [250, 235, 215],
  aqua: [0, 255, 255],
  aquamarine: [127, 255, 212],
  azure: [240, 255, 255],
  beige: [245, 245, 220],
  bisque: [255, 228, 196],
  black: [0, 0, 0],
  blanchedalmond: [255, 235, 205],
  blue: [0, 0, 255],
  blueviolet: [138, 43, 226],
  brown: [165, 42, 42],
  burlywood: [222, 184, 135],
  cadetblue: [95, 158, 160],
  chartreuse: [127, 255, 0],
  chocolate: [210, 105, 30],
  coral: [255, 127, 80],
  cornflowerblue: [100, 149, 237],
  cornsilk: [255, 248, 220],
  crimson: [220, 20, 60],
  cyan: [0, 255, 255],
  darkblue: [0, 0, 139],
  darkcyan: [0, 139, 139],
  darkgoldenrod: [184, 134, 11],
  darkgray: [169, 169, 169],
  darkgreen: [0, 100, 0],
  darkgrey: [169, 169, 169],
  darkkhaki: [189, 183, 107],
  darkmagenta: [139, 0, 139],
  darkolivegreen: [85, 107, 47],
  darkorange: [255, 140, 0],
  darkorchid: [153, 50, 204],
  darkred: [139, 0, 0],
  darksalmon: [233, 150, 122],
  darkseagreen: [143, 188, 143],
  darkslateblue: [72, 61, 139],
  darkslategray: [47, 79, 79],
  darkslategrey: [47, 79, 79],
  darkturquoise: [0, 206, 209],
  darkviolet: [148, 0, 211],
  deeppink: [255, 20, 147],
  deepskyblue: [0, 191, 255],
  dimgray: [105, 105, 105],
  dimgrey: [105, 105, 105],
  dodgerblue: [30, 144, 255],
  firebrick: [178, 34, 34],
  floralwhite: [255, 250, 240],
  forestgreen: [34, 139, 34],
  fuchsia: [255, 0, 255],
  gainsboro: [220, 220, 220],
  ghostwhite: [248, 248, 255],
  gold: [255, 215, 0],
  goldenrod: [218, 165, 32],
  gray: [128, 128, 128],
  grey: [128, 128, 128],
  green: [0, 128, 0],
  greenyellow: [173, 255, 47],
  honeydew: [240, 255, 240],
  hotpink: [255, 105, 180],
  indianred: [205, 92, 92],
  indigo: [75, 0, 130],
  ivory: [255, 255, 240],
  khaki: [240, 230, 140],
  lavender: [230, 230, 250],
  lavenderblush: [255, 240, 245],
  lawngreen: [124, 252, 0],
  lemonchiffon: [255, 250, 205],
  lightblue: [173, 216, 230],
  lightcoral: [240, 128, 128],
  lightcyan: [224, 255, 255],
  lightgoldenrodyellow: [250, 250, 210],
  lightgray: [211, 211, 211],
  lightgreen: [144, 238, 144],
  lightgrey: [211, 211, 211],
  lightpink: [255, 182, 193],
  lightsalmon: [255, 160, 122],
  lightseagreen: [32, 178, 170],
  lightskyblue: [135, 206, 250],
  lightslategray: [119, 136, 153],
  lightslategrey: [119, 136, 153],
  lightsteelblue: [176, 196, 222],
  lightyellow: [255, 255, 224],
  lime: [0, 255, 0],
  limegreen: [50, 205, 50],
  linen: [250, 240, 230],
  magenta: [255, 0, 255],
  maroon: [128, 0, 0],
  mediumaquamarine: [102, 205, 170],
  mediumblue: [0, 0, 205],
  mediumorchid: [186, 85, 211],
  mediumpurple: [147, 112, 219],
  mediumseagreen: [60, 179, 113],
  mediumslateblue: [123, 104, 238],
  mediumspringgreen: [0, 250, 154],
  mediumturquoise: [72, 209, 204],
  mediumvioletred: [199, 21, 133],
  midnightblue: [25, 25, 112],
  mintcream: [245, 255, 250],
  mistyrose: [255, 228, 225],
  moccasin: [255, 228, 181],
  navajowhite: [255, 222, 173],
  navy: [0, 0, 128],
  oldlace: [253, 245, 230],
  olive: [128, 128, 0],
  olivedrab: [107, 142, 35],
  orange: [255, 165, 0],
  orangered: [255, 69, 0],
  orchid: [218, 112, 214],
  palegoldenrod: [238, 232, 170],
  palegreen: [152, 251, 152],
  paleturquoise: [175, 238, 238],
  palevioletred: [219, 112, 147],
  papayawhip: [255, 239, 213],
  peachpuff: [255, 218, 185],
  peru: [205, 133, 63],
  pink: [255, 192, 203],
  plum: [221, 160, 221],
  powderblue: [176, 224, 230],
  purple: [128, 0, 128],
  red: [255, 0, 0],
  rosybrown: [188, 143, 143],
  royalblue: [65, 105, 225],
  saddlebrown: [139, 69, 19],
  salmon: [250, 128, 114],
  sandybrown: [244, 164, 96],
  seagreen: [46, 139, 87],
  seashell: [255, 245, 238],
  sienna: [160, 82, 45],
  silver: [192, 192, 192],
  skyblue: [135, 206, 235],
  slateblue: [106, 90, 205],
  slategray: [112, 128, 144],
  slategrey: [112, 128, 144],
  snow: [255, 250, 250],
  springgreen: [0, 255, 127],
  steelblue: [70, 130, 180],
  tan: [210, 180, 140],
  teal: [0, 128, 128],
  thistle: [216, 191, 216],
  tomato: [255, 99, 71],
  turquoise: [64, 224, 208],
  violet: [238, 130, 238],
  wheat: [245, 222, 179],
  white: [255, 255, 255],
  whitesmoke: [245, 245, 245],
  yellow: [255, 255, 0],
  yellowgreen: [154, 205, 50]
}, vo = function(e) {
  for (var r = e.map, a = e.keys, n = a.length, i = 0; i < n; i++) {
    var s = a[i];
    if (Te(s))
      throw Error("Tried to set map with object key");
    i < a.length - 1 ? (r[s] == null && (r[s] = {}), r = r[s]) : r[s] = e.value;
  }
}, co = function(e) {
  for (var r = e.map, a = e.keys, n = a.length, i = 0; i < n; i++) {
    var s = a[i];
    if (Te(s))
      throw Error("Tried to get map with object key");
    if (r = r[s], r == null)
      return r;
  }
  return r;
}, Cn = Be ? Be.performance : null, go = Cn && Cn.now ? function() {
  return Cn.now();
} : function() {
  return Date.now();
}, Ed = function() {
  if (Be) {
    if (Be.requestAnimationFrame)
      return function(t) {
        Be.requestAnimationFrame(t);
      };
    if (Be.mozRequestAnimationFrame)
      return function(t) {
        Be.mozRequestAnimationFrame(t);
      };
    if (Be.webkitRequestAnimationFrame)
      return function(t) {
        Be.webkitRequestAnimationFrame(t);
      };
    if (Be.msRequestAnimationFrame)
      return function(t) {
        Be.msRequestAnimationFrame(t);
      };
  }
  return function(t) {
    t && setTimeout(function() {
      t(go());
    }, 1e3 / 60);
  };
}(), Ya = function(e) {
  return Ed(e);
}, Mt = go, br = 9261, po = 65599, Xr = 5381, yo = function(e) {
  for (var r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : br, a = r, n; n = e.next(), !n.done; )
    a = a * po + n.value | 0;
  return a;
}, ra = function(e) {
  var r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : br;
  return r * po + e | 0;
}, aa = function(e) {
  var r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : Xr;
  return (r << 5) + r + e | 0;
}, wd = function(e, r) {
  return e * 2097152 + r;
}, Ft = function(e) {
  return e[0] * 2097152 + e[1];
}, Da = function(e, r) {
  return [ra(e[0], r[0]), aa(e[1], r[1])];
}, xd = function(e, r) {
  var a = {
    value: 0,
    done: !1
  }, n = 0, i = e.length, s = {
    next: function() {
      return n < i ? a.value = e[n++] : a.done = !0, a;
    }
  };
  return yo(s, r);
}, ar = function(e, r) {
  var a = {
    value: 0,
    done: !1
  }, n = 0, i = e.length, s = {
    next: function() {
      return n < i ? a.value = e.charCodeAt(n++) : a.done = !0, a;
    }
  };
  return yo(s, r);
}, mo = function() {
  return Td(arguments);
}, Td = function(e) {
  for (var r, a = 0; a < e.length; a++) {
    var n = e[a];
    a === 0 ? r = ar(n) : r = ar(n, r);
  }
  return r;
}, Hi = !0, Cd = console.warn != null, Dd = console.trace != null, oi = Number.MAX_SAFE_INTEGER || 9007199254740991, bo = function() {
  return !0;
}, Ha = function() {
  return !1;
}, Xi = function() {
  return 0;
}, ui = function() {
}, ze = function(e) {
  throw new Error(e);
}, Eo = function(e) {
  if (e !== void 0)
    Hi = !!e;
  else
    return Hi;
}, Ae = function(e) {
  Eo() && (Cd ? console.warn(e) : (console.log(e), Dd && console.trace()));
}, Sd = function(e) {
  return ce({}, e);
}, Ct = function(e) {
  return e == null ? e : Ie(e) ? e.slice() : Te(e) ? Sd(e) : e;
}, Ld = function(e) {
  return e.slice();
}, wo = function(e, r) {
  for (
    // loop :)
    r = e = "";
    // b - result , a - numeric letiable
    e++ < 36;
    //
    r += e * 51 & 52 ? (
      //  return a random number or 4
      (e ^ 15 ? (
        // generate a random number from 0 to 15
        8 ^ Math.random() * (e ^ 20 ? 16 : 4)
      ) : 4).toString(16)
    ) : "-"
  )
    ;
  return r;
}, Ad = {}, xo = function() {
  return Ad;
}, Ze = function(e) {
  var r = Object.keys(e);
  return function(a) {
    for (var n = {}, i = 0; i < r.length; i++) {
      var s = r[i], o = a == null ? void 0 : a[s];
      n[s] = o === void 0 ? e[s] : o;
    }
    return n;
  };
}, Ht = function(e, r, a) {
  for (var n = e.length - 1; n >= 0 && !(e[n] === r && (e.splice(n, 1), a)); n--)
    ;
}, li = function(e) {
  e.splice(0, e.length);
}, Od = function(e, r) {
  for (var a = 0; a < r.length; a++) {
    var n = r[a];
    e.push(n);
  }
}, wt = function(e, r, a) {
  return a && (r = fo(a, r)), e[r];
}, zt = function(e, r, a, n) {
  a && (r = fo(a, r)), e[r] = n;
}, Nd = /* @__PURE__ */ function() {
  function t() {
    ai(this, t), this._obj = {};
  }
  return ni(t, [{
    key: "set",
    value: function(r, a) {
      return this._obj[r] = a, this;
    }
  }, {
    key: "delete",
    value: function(r) {
      return this._obj[r] = void 0, this;
    }
  }, {
    key: "clear",
    value: function() {
      this._obj = {};
    }
  }, {
    key: "has",
    value: function(r) {
      return this._obj[r] !== void 0;
    }
  }, {
    key: "get",
    value: function(r) {
      return this._obj[r];
    }
  }]), t;
}(), Dt = typeof Map < "u" ? Map : Nd, Md = "undefined", Id = /* @__PURE__ */ function() {
  function t(e) {
    if (ai(this, t), this._obj = /* @__PURE__ */ Object.create(null), this.size = 0, e != null) {
      var r;
      e.instanceString != null && e.instanceString() === this.instanceString() ? r = e.toArray() : r = e;
      for (var a = 0; a < r.length; a++)
        this.add(r[a]);
    }
  }
  return ni(t, [{
    key: "instanceString",
    value: function() {
      return "set";
    }
  }, {
    key: "add",
    value: function(r) {
      var a = this._obj;
      a[r] !== 1 && (a[r] = 1, this.size++);
    }
  }, {
    key: "delete",
    value: function(r) {
      var a = this._obj;
      a[r] === 1 && (a[r] = 0, this.size--);
    }
  }, {
    key: "clear",
    value: function() {
      this._obj = /* @__PURE__ */ Object.create(null);
    }
  }, {
    key: "has",
    value: function(r) {
      return this._obj[r] === 1;
    }
  }, {
    key: "toArray",
    value: function() {
      var r = this;
      return Object.keys(this._obj).filter(function(a) {
        return r.has(a);
      });
    }
  }, {
    key: "forEach",
    value: function(r, a) {
      return this.toArray().forEach(r, a);
    }
  }]), t;
}(), Ir = (typeof Set > "u" ? "undefined" : _e(Set)) !== Md ? Set : Id, un = function(e, r) {
  var a = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !0;
  if (e === void 0 || r === void 0 || !ii(e)) {
    ze("An element must have a core reference and parameters set");
    return;
  }
  var n = r.group;
  if (n == null && (r.data && r.data.source != null && r.data.target != null ? n = "edges" : n = "nodes"), n !== "nodes" && n !== "edges") {
    ze("An element must be of type `nodes` or `edges`; you specified `" + n + "`");
    return;
  }
  this.length = 1, this[0] = this;
  var i = this._private = {
    cy: e,
    single: !0,
    // indicates this is an element
    data: r.data || {},
    // data object
    position: r.position || {
      x: 0,
      y: 0
    },
    // (x, y) position pair
    autoWidth: void 0,
    // width and height of nodes calculated by the renderer when set to special 'auto' value
    autoHeight: void 0,
    autoPadding: void 0,
    compoundBoundsClean: !1,
    // whether the compound dimensions need to be recalculated the next time dimensions are read
    listeners: [],
    // array of bound listeners
    group: n,
    // string; 'nodes' or 'edges'
    style: {},
    // properties as set by the style
    rstyle: {},
    // properties for style sent from the renderer to the core
    styleCxts: [],
    // applied style contexts from the styler
    styleKeys: {},
    // per-group keys of style property values
    removed: !0,
    // whether it's inside the vis; true if removed (set true here since we call restore)
    selected: !!r.selected,
    // whether it's selected
    selectable: r.selectable === void 0 ? !0 : !!r.selectable,
    // whether it's selectable
    locked: !!r.locked,
    // whether the element is locked (cannot be moved)
    grabbed: !1,
    // whether the element is grabbed by the mouse; renderer sets this privately
    grabbable: r.grabbable === void 0 ? !0 : !!r.grabbable,
    // whether the element can be grabbed
    pannable: r.pannable === void 0 ? n === "edges" : !!r.pannable,
    // whether the element has passthrough panning enabled
    active: !1,
    // whether the element is active from user interaction
    classes: new Ir(),
    // map ( className => true )
    animation: {
      // object for currently-running animations
      current: [],
      queue: []
    },
    rscratch: {},
    // object in which the renderer can store information
    scratch: r.scratch || {},
    // scratch objects
    edges: [],
    // array of connected edges
    children: [],
    // array of children
    parent: r.parent && r.parent.isNode() ? r.parent : null,
    // parent ref
    traversalCache: {},
    // cache of output of traversal functions
    backgrounding: !1,
    // whether background images are loading
    bbCache: null,
    // cache of the current bounding box
    bbCacheShift: {
      x: 0,
      y: 0
    },
    // shift applied to cached bb to be applied on next get
    bodyBounds: null,
    // bounds cache of element body, w/o overlay
    overlayBounds: null,
    // bounds cache of element body, including overlay
    labelBounds: {
      // bounds cache of labels
      all: null,
      source: null,
      target: null,
      main: null
    },
    arrowBounds: {
      // bounds cache of edge arrows
      source: null,
      target: null,
      "mid-source": null,
      "mid-target": null
    }
  };
  if (i.position.x == null && (i.position.x = 0), i.position.y == null && (i.position.y = 0), r.renderedPosition) {
    var s = r.renderedPosition, o = e.pan(), u = e.zoom();
    i.position = {
      x: (s.x - o.x) / u,
      y: (s.y - o.y) / u
    };
  }
  var l = [];
  Ie(r.classes) ? l = r.classes : le(r.classes) && (l = r.classes.split(/\s+/));
  for (var f = 0, h = l.length; f < h; f++) {
    var c = l[f];
    !c || c === "" || i.classes.add(c);
  }
  this.createEmitter();
  var v = r.style || r.css;
  v && (Ae("Setting a `style` bypass at element creation should be done only when absolutely necessary.  Try to use the stylesheet instead."), this.style(v)), (a === void 0 || a) && this.restore();
}, qi = function(e) {
  return e = {
    bfs: e.bfs || !e.dfs,
    dfs: e.dfs || !e.bfs
  }, function(a, n, i) {
    var s;
    Te(a) && !ft(a) && (s = a, a = s.roots || s.root, n = s.visit, i = s.directed), i = arguments.length === 2 && !Fe(n) ? n : i, n = Fe(n) ? n : function() {
    };
    for (var o = this._private.cy, u = a = le(a) ? this.filter(a) : a, l = [], f = [], h = {}, c = {}, v = {}, d = 0, g, y = this.byGroup(), p = y.nodes, E = y.edges, m = 0; m < u.length; m++) {
      var T = u[m], C = T.id();
      T.isNode() && (l.unshift(T), e.bfs && (v[C] = !0, f.push(T)), c[C] = 0);
    }
    for (var S = function() {
      var M = e.bfs ? l.shift() : l.pop(), O = M.id();
      if (e.dfs) {
        if (v[O])
          return "continue";
        v[O] = !0, f.push(M);
      }
      var P = c[O], I = h[O], k = I != null ? I.source() : null, R = I != null ? I.target() : null, B = I == null ? void 0 : M.same(k) ? R[0] : k[0], z = void 0;
      if (z = n(M, I, B, d++, P), z === !0)
        return g = M, "break";
      if (z === !1)
        return "break";
      for (var F = M.connectedEdges().filter(function(Y) {
        return (!i || Y.source().same(M)) && E.has(Y);
      }), $ = 0; $ < F.length; $++) {
        var U = F[$], V = U.connectedNodes().filter(function(Y) {
          return !Y.same(M) && p.has(Y);
        }), H = V.id();
        V.length !== 0 && !v[H] && (V = V[0], l.push(V), e.bfs && (v[H] = !0, f.push(V)), h[H] = U, c[H] = c[O] + 1);
      }
    }; l.length !== 0; ) {
      var b = S();
      if (b !== "continue" && b === "break")
        break;
    }
    for (var x = o.collection(), w = 0; w < f.length; w++) {
      var D = f[w], A = h[D.id()];
      A != null && x.push(A), x.push(D);
    }
    return {
      path: o.collection(x),
      found: o.collection(g)
    };
  };
}, na = {
  breadthFirstSearch: qi({
    bfs: !0
  }),
  depthFirstSearch: qi({
    dfs: !0
  })
};
na.bfs = na.breadthFirstSearch;
na.dfs = na.depthFirstSearch;
var Rd = Ze({
  root: null,
  weight: function(e) {
    return 1;
  },
  directed: !1
}), kd = {
  dijkstra: function(e) {
    if (!Te(e)) {
      var r = arguments;
      e = {
        root: r[0],
        weight: r[1],
        directed: r[2]
      };
    }
    var a = Rd(e), n = a.root, i = a.weight, s = a.directed, o = this, u = i, l = le(n) ? this.filter(n)[0] : n[0], f = {}, h = {}, c = {}, v = this.byGroup(), d = v.nodes, g = v.edges;
    g.unmergeBy(function(P) {
      return P.isLoop();
    });
    for (var y = function(I) {
      return f[I.id()];
    }, p = function(I, k) {
      f[I.id()] = k, E.updateItem(I);
    }, E = new ca(function(P, I) {
      return y(P) - y(I);
    }), m = 0; m < d.length; m++) {
      var T = d[m];
      f[T.id()] = T.same(l) ? 0 : 1 / 0, E.push(T);
    }
    for (var C = function(I, k) {
      for (var R = (s ? I.edgesTo(k) : I.edgesWith(k)).intersect(g), B = 1 / 0, z, F = 0; F < R.length; F++) {
        var $ = R[F], U = u($);
        (U < B || !z) && (B = U, z = $);
      }
      return {
        edge: z,
        dist: B
      };
    }; E.size() > 0; ) {
      var S = E.pop(), b = y(S), x = S.id();
      if (c[x] = b, b !== 1 / 0)
        for (var w = S.neighborhood().intersect(d), D = 0; D < w.length; D++) {
          var A = w[D], L = A.id(), M = C(S, A), O = b + M.dist;
          O < y(A) && (p(A, O), h[L] = {
            node: S,
            edge: M.edge
          });
        }
    }
    return {
      distanceTo: function(I) {
        var k = le(I) ? d.filter(I)[0] : I[0];
        return c[k.id()];
      },
      pathTo: function(I) {
        var k = le(I) ? d.filter(I)[0] : I[0], R = [], B = k, z = B.id();
        if (k.length > 0)
          for (R.unshift(k); h[z]; ) {
            var F = h[z];
            R.unshift(F.edge), R.unshift(F.node), B = F.node, z = B.id();
          }
        return o.spawn(R);
      }
    };
  }
}, Pd = {
  // kruskal's algorithm (finds min spanning tree, assuming undirected graph)
  // implemented from pseudocode from wikipedia
  kruskal: function(e) {
    e = e || function(m) {
      return 1;
    };
    for (var r = this.byGroup(), a = r.nodes, n = r.edges, i = a.length, s = new Array(i), o = a, u = function(T) {
      for (var C = 0; C < s.length; C++) {
        var S = s[C];
        if (S.has(T))
          return C;
      }
    }, l = 0; l < i; l++)
      s[l] = this.spawn(a[l]);
    for (var f = n.sort(function(m, T) {
      return e(m) - e(T);
    }), h = 0; h < f.length; h++) {
      var c = f[h], v = c.source()[0], d = c.target()[0], g = u(v), y = u(d), p = s[g], E = s[y];
      g !== y && (o.merge(c), p.merge(E), s.splice(y, 1));
    }
    return o;
  }
}, Bd = Ze({
  root: null,
  goal: null,
  weight: function(e) {
    return 1;
  },
  heuristic: function(e) {
    return 0;
  },
  directed: !1
}), Fd = {
  // Implemented from pseudocode from wikipedia
  aStar: function(e) {
    var r = this.cy(), a = Bd(e), n = a.root, i = a.goal, s = a.heuristic, o = a.directed, u = a.weight;
    n = r.collection(n)[0], i = r.collection(i)[0];
    var l = n.id(), f = i.id(), h = {}, c = {}, v = {}, d = new ca(function(z, F) {
      return c[z.id()] - c[F.id()];
    }), g = new Ir(), y = {}, p = {}, E = function(F, $) {
      d.push(F), g.add($);
    }, m, T, C = function() {
      m = d.pop(), T = m.id(), g.delete(T);
    }, S = function(F) {
      return g.has(F);
    };
    E(n, l), h[l] = 0, c[l] = s(n);
    for (var b = 0; d.size() > 0; ) {
      if (C(), b++, T === f) {
        for (var x = [], w = i, D = f, A = p[D]; x.unshift(w), A != null && x.unshift(A), w = y[D], w != null; )
          D = w.id(), A = p[D];
        return {
          found: !0,
          distance: h[T],
          path: this.spawn(x),
          steps: b
        };
      }
      v[T] = !0;
      for (var L = m._private.edges, M = 0; M < L.length; M++) {
        var O = L[M];
        if (this.hasElementWithId(O.id()) && !(o && O.data("source") !== T)) {
          var P = O.source(), I = O.target(), k = P.id() !== T ? P : I, R = k.id();
          if (this.hasElementWithId(R) && !v[R]) {
            var B = h[T] + u(O);
            if (!S(R)) {
              h[R] = B, c[R] = B + s(k), E(k, R), y[R] = m, p[R] = O;
              continue;
            }
            B < h[R] && (h[R] = B, c[R] = B + s(k), y[R] = m, p[R] = O);
          }
        }
      }
    }
    return {
      found: !1,
      distance: void 0,
      path: void 0,
      steps: b
    };
  }
}, Gd = Ze({
  weight: function(e) {
    return 1;
  },
  directed: !1
}), zd = {
  // Implemented from pseudocode from wikipedia
  floydWarshall: function(e) {
    for (var r = this.cy(), a = Gd(e), n = a.weight, i = a.directed, s = n, o = this.byGroup(), u = o.nodes, l = o.edges, f = u.length, h = f * f, c = function(U) {
      return u.indexOf(U);
    }, v = function(U) {
      return u[U];
    }, d = new Array(h), g = 0; g < h; g++) {
      var y = g % f, p = (g - y) / f;
      p === y ? d[g] = 0 : d[g] = 1 / 0;
    }
    for (var E = new Array(h), m = new Array(h), T = 0; T < l.length; T++) {
      var C = l[T], S = C.source()[0], b = C.target()[0];
      if (S !== b) {
        var x = c(S), w = c(b), D = x * f + w, A = s(C);
        if (d[D] > A && (d[D] = A, E[D] = w, m[D] = C), !i) {
          var L = w * f + x;
          !i && d[L] > A && (d[L] = A, E[L] = x, m[L] = C);
        }
      }
    }
    for (var M = 0; M < f; M++)
      for (var O = 0; O < f; O++)
        for (var P = O * f + M, I = 0; I < f; I++) {
          var k = O * f + I, R = M * f + I;
          d[P] + d[R] < d[k] && (d[k] = d[P] + d[R], E[k] = E[P]);
        }
    var B = function(U) {
      return (le(U) ? r.filter(U) : U)[0];
    }, z = function(U) {
      return c(B(U));
    }, F = {
      distance: function(U, V) {
        var H = z(U), Y = z(V);
        return d[H * f + Y];
      },
      path: function(U, V) {
        var H = z(U), Y = z(V), G = v(H);
        if (H === Y)
          return G.collection();
        if (E[H * f + Y] == null)
          return r.collection();
        var X = r.collection(), K = H, Z;
        for (X.merge(G); H !== Y; )
          K = H, H = E[H * f + Y], Z = m[K * f + H], X.merge(Z), X.merge(v(H));
        return X;
      }
    };
    return F;
  }
  // floydWarshall
}, $d = Ze({
  weight: function(e) {
    return 1;
  },
  directed: !1,
  root: null
}), Vd = {
  // Implemented from pseudocode from wikipedia
  bellmanFord: function(e) {
    var r = this, a = $d(e), n = a.weight, i = a.directed, s = a.root, o = n, u = this, l = this.cy(), f = this.byGroup(), h = f.edges, c = f.nodes, v = c.length, d = new Dt(), g = !1, y = [];
    s = l.collection(s)[0], h.unmergeBy(function(se) {
      return se.isLoop();
    });
    for (var p = h.length, E = function(ne) {
      var ue = d.get(ne.id());
      return ue || (ue = {}, d.set(ne.id(), ue)), ue;
    }, m = function(ne) {
      return (le(ne) ? l.$(ne) : ne)[0];
    }, T = function(ne) {
      return E(m(ne)).dist;
    }, C = function(ne) {
      for (var ue = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : s, Ee = m(ne), ge = [], ve = Ee; ; ) {
        if (ve == null)
          return r.spawn();
        var J = E(ve), N = J.edge, _ = J.pred;
        if (ge.unshift(ve[0]), ve.same(ue) && ge.length > 0)
          break;
        N != null && ge.unshift(N), ve = _;
      }
      return u.spawn(ge);
    }, S = 0; S < v; S++) {
      var b = c[S], x = E(b);
      b.same(s) ? x.dist = 0 : x.dist = 1 / 0, x.pred = null, x.edge = null;
    }
    for (var w = !1, D = function(ne, ue, Ee, ge, ve, J) {
      var N = ge.dist + J;
      N < ve.dist && !Ee.same(ge.edge) && (ve.dist = N, ve.pred = ne, ve.edge = Ee, w = !0);
    }, A = 1; A < v; A++) {
      w = !1;
      for (var L = 0; L < p; L++) {
        var M = h[L], O = M.source(), P = M.target(), I = o(M), k = E(O), R = E(P);
        D(O, P, M, k, R, I), i || D(P, O, M, R, k, I);
      }
      if (!w)
        break;
    }
    if (w)
      for (var B = [], z = 0; z < p; z++) {
        var F = h[z], $ = F.source(), U = F.target(), V = o(F), H = E($).dist, Y = E(U).dist;
        if (H + V < Y || !i && Y + V < H)
          if (g || (Ae("Graph contains a negative weight cycle for Bellman-Ford"), g = !0), e.findNegativeWeightCycles !== !1) {
            var G = [];
            H + V < Y && G.push($), !i && Y + V < H && G.push(U);
            for (var X = G.length, K = 0; K < X; K++) {
              var Z = G[K], te = [Z];
              te.push(E(Z).edge);
              for (var he = E(Z).pred; te.indexOf(he) === -1; )
                te.push(he), te.push(E(he).edge), he = E(he).pred;
              te = te.slice(te.indexOf(he));
              for (var de = te[0].id(), ee = 0, re = 2; re < te.length; re += 2)
                te[re].id() < de && (de = te[re].id(), ee = re);
              te = te.slice(ee).concat(te.slice(0, ee)), te.push(te[0]);
              var fe = te.map(function(se) {
                return se.id();
              }).join(",");
              B.indexOf(fe) === -1 && (y.push(u.spawn(te)), B.push(fe));
            }
          } else
            break;
      }
    return {
      distanceTo: T,
      pathTo: C,
      hasNegativeWeightCycle: g,
      negativeWeightCycles: y
    };
  }
  // bellmanFord
}, _d = Math.sqrt(2), Ud = function(e, r, a) {
  a.length === 0 && ze("Karger-Stein must be run on a connected (sub)graph");
  for (var n = a[e], i = n[1], s = n[2], o = r[i], u = r[s], l = a, f = l.length - 1; f >= 0; f--) {
    var h = l[f], c = h[1], v = h[2];
    (r[c] === o && r[v] === u || r[c] === u && r[v] === o) && l.splice(f, 1);
  }
  for (var d = 0; d < l.length; d++) {
    var g = l[d];
    g[1] === u ? (l[d] = g.slice(), l[d][1] = o) : g[2] === u && (l[d] = g.slice(), l[d][2] = o);
  }
  for (var y = 0; y < r.length; y++)
    r[y] === u && (r[y] = o);
  return l;
}, Dn = function(e, r, a, n) {
  for (; a > n; ) {
    var i = Math.floor(Math.random() * r.length);
    r = Ud(i, e, r), a--;
  }
  return r;
}, Yd = {
  // Computes the minimum cut of an undirected graph
  // Returns the correct answer with high probability
  kargerStein: function() {
    var e = this, r = this.byGroup(), a = r.nodes, n = r.edges;
    n.unmergeBy(function(R) {
      return R.isLoop();
    });
    var i = a.length, s = n.length, o = Math.ceil(Math.pow(Math.log(i) / Math.LN2, 2)), u = Math.floor(i / _d);
    if (i < 2) {
      ze("At least 2 nodes are required for Karger-Stein algorithm");
      return;
    }
    for (var l = [], f = 0; f < s; f++) {
      var h = n[f];
      l.push([f, a.indexOf(h.source()), a.indexOf(h.target())]);
    }
    for (var c = 1 / 0, v = [], d = new Array(i), g = new Array(i), y = new Array(i), p = function(B, z) {
      for (var F = 0; F < i; F++)
        z[F] = B[F];
    }, E = 0; E <= o; E++) {
      for (var m = 0; m < i; m++)
        g[m] = m;
      var T = Dn(g, l.slice(), i, u), C = T.slice();
      p(g, y);
      var S = Dn(g, T, u, 2), b = Dn(y, C, u, 2);
      S.length <= b.length && S.length < c ? (c = S.length, v = S, p(g, d)) : b.length <= S.length && b.length < c && (c = b.length, v = b, p(y, d));
    }
    for (var x = this.spawn(v.map(function(R) {
      return n[R[0]];
    })), w = this.spawn(), D = this.spawn(), A = d[0], L = 0; L < d.length; L++) {
      var M = d[L], O = a[L];
      M === A ? w.merge(O) : D.merge(O);
    }
    var P = function(B) {
      var z = e.spawn();
      return B.forEach(function(F) {
        z.merge(F), F.connectedEdges().forEach(function($) {
          e.contains($) && !x.contains($) && z.merge($);
        });
      }), z;
    }, I = [P(w), P(D)], k = {
      cut: x,
      components: I,
      // n.b. partitions are included to be compatible with the old api spec
      // (could be removed in a future major version)
      partition1: w,
      partition2: D
    };
    return k;
  }
}, Hd = function(e) {
  return {
    x: e.x,
    y: e.y
  };
}, ln = function(e, r, a) {
  return {
    x: e.x * r + a.x,
    y: e.y * r + a.y
  };
}, To = function(e, r, a) {
  return {
    x: (e.x - a.x) / r,
    y: (e.y - a.y) / r
  };
}, Er = function(e) {
  return {
    x: e[0],
    y: e[1]
  };
}, Xd = function(e) {
  for (var r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0, a = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : e.length, n = 1 / 0, i = r; i < a; i++) {
    var s = e[i];
    isFinite(s) && (n = Math.min(s, n));
  }
  return n;
}, qd = function(e) {
  for (var r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0, a = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : e.length, n = -1 / 0, i = r; i < a; i++) {
    var s = e[i];
    isFinite(s) && (n = Math.max(s, n));
  }
  return n;
}, Wd = function(e) {
  for (var r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0, a = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : e.length, n = 0, i = 0, s = r; s < a; s++) {
    var o = e[s];
    isFinite(o) && (n += o, i++);
  }
  return n / i;
}, Kd = function(e) {
  var r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0, a = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : e.length, n = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : !0, i = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : !0, s = arguments.length > 5 && arguments[5] !== void 0 ? arguments[5] : !0;
  n ? e = e.slice(r, a) : (a < e.length && e.splice(a, e.length - a), r > 0 && e.splice(0, r));
  for (var o = 0, u = e.length - 1; u >= 0; u--) {
    var l = e[u];
    s ? isFinite(l) || (e[u] = -1 / 0, o++) : e.splice(u, 1);
  }
  i && e.sort(function(c, v) {
    return c - v;
  });
  var f = e.length, h = Math.floor(f / 2);
  return f % 2 !== 0 ? e[h + 1 + o] : (e[h - 1 + o] + e[h + o]) / 2;
}, Zd = function(e) {
  return Math.PI * e / 180;
}, Sa = function(e, r) {
  return Math.atan2(r, e) - Math.PI / 2;
}, fi = Math.log2 || function(t) {
  return Math.log(t) / Math.log(2);
}, Co = function(e) {
  return e > 0 ? 1 : e < 0 ? -1 : 0;
}, nr = function(e, r) {
  return Math.sqrt(er(e, r));
}, er = function(e, r) {
  var a = r.x - e.x, n = r.y - e.y;
  return a * a + n * n;
}, Qd = function(e) {
  for (var r = e.length, a = 0, n = 0; n < r; n++)
    a += e[n];
  for (var i = 0; i < r; i++)
    e[i] = e[i] / a;
  return e;
}, Ye = function(e, r, a, n) {
  return (1 - n) * (1 - n) * e + 2 * (1 - n) * n * r + n * n * a;
}, xr = function(e, r, a, n) {
  return {
    x: Ye(e.x, r.x, a.x, n),
    y: Ye(e.y, r.y, a.y, n)
  };
}, Jd = function(e, r, a, n) {
  var i = {
    x: r.x - e.x,
    y: r.y - e.y
  }, s = nr(e, r), o = {
    x: i.x / s,
    y: i.y / s
  };
  return a = a ?? 0, n = n ?? a * s, {
    x: e.x + o.x * n,
    y: e.y + o.y * n
  };
}, ia = function(e, r, a) {
  return Math.max(e, Math.min(a, r));
}, lt = function(e) {
  if (e == null)
    return {
      x1: 1 / 0,
      y1: 1 / 0,
      x2: -1 / 0,
      y2: -1 / 0,
      w: 0,
      h: 0
    };
  if (e.x1 != null && e.y1 != null) {
    if (e.x2 != null && e.y2 != null && e.x2 >= e.x1 && e.y2 >= e.y1)
      return {
        x1: e.x1,
        y1: e.y1,
        x2: e.x2,
        y2: e.y2,
        w: e.x2 - e.x1,
        h: e.y2 - e.y1
      };
    if (e.w != null && e.h != null && e.w >= 0 && e.h >= 0)
      return {
        x1: e.x1,
        y1: e.y1,
        x2: e.x1 + e.w,
        y2: e.y1 + e.h,
        w: e.w,
        h: e.h
      };
  }
}, jd = function(e) {
  return {
    x1: e.x1,
    x2: e.x2,
    w: e.w,
    y1: e.y1,
    y2: e.y2,
    h: e.h
  };
}, eg = function(e) {
  e.x1 = 1 / 0, e.y1 = 1 / 0, e.x2 = -1 / 0, e.y2 = -1 / 0, e.w = 0, e.h = 0;
}, tg = function(e, r) {
  e.x1 = Math.min(e.x1, r.x1), e.x2 = Math.max(e.x2, r.x2), e.w = e.x2 - e.x1, e.y1 = Math.min(e.y1, r.y1), e.y2 = Math.max(e.y2, r.y2), e.h = e.y2 - e.y1;
}, rg = function(e, r, a) {
  e.x1 = Math.min(e.x1, r), e.x2 = Math.max(e.x2, r), e.w = e.x2 - e.x1, e.y1 = Math.min(e.y1, a), e.y2 = Math.max(e.y2, a), e.h = e.y2 - e.y1;
}, Ba = function(e) {
  var r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
  return e.x1 -= r, e.x2 += r, e.y1 -= r, e.y2 += r, e.w = e.x2 - e.x1, e.h = e.y2 - e.y1, e;
}, Sn = function(e) {
  var r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [0], a, n, i, s;
  if (r.length === 1)
    a = n = i = s = r[0];
  else if (r.length === 2)
    a = i = r[0], s = n = r[1];
  else if (r.length === 4) {
    var o = Nt(r, 4);
    a = o[0], n = o[1], i = o[2], s = o[3];
  }
  return e.x1 -= s, e.x2 += n, e.y1 -= a, e.y2 += i, e.w = e.x2 - e.x1, e.h = e.y2 - e.y1, e;
}, Wi = function(e, r) {
  e.x1 = r.x1, e.y1 = r.y1, e.x2 = r.x2, e.y2 = r.y2, e.w = e.x2 - e.x1, e.h = e.y2 - e.y1;
}, hi = function(e, r) {
  return !(e.x1 > r.x2 || r.x1 > e.x2 || e.x2 < r.x1 || r.x2 < e.x1 || e.y2 < r.y1 || r.y2 < e.y1 || e.y1 > r.y2 || r.y1 > e.y2);
}, Sr = function(e, r, a) {
  return e.x1 <= r && r <= e.x2 && e.y1 <= a && a <= e.y2;
}, ag = function(e, r) {
  return Sr(e, r.x, r.y);
}, Do = function(e, r) {
  return Sr(e, r.x1, r.y1) && Sr(e, r.x2, r.y2);
}, So = function(e, r, a, n, i, s, o) {
  var u = pa(i, s), l = i / 2, f = s / 2, h;
  {
    var c = a - l + u - o, v = n - f - o, d = a + l - u + o, g = v;
    if (h = Vt(e, r, a, n, c, v, d, g, !1), h.length > 0)
      return h;
  }
  {
    var y = a + l + o, p = n - f + u - o, E = y, m = n + f - u + o;
    if (h = Vt(e, r, a, n, y, p, E, m, !1), h.length > 0)
      return h;
  }
  {
    var T = a - l + u - o, C = n + f + o, S = a + l - u + o, b = C;
    if (h = Vt(e, r, a, n, T, C, S, b, !1), h.length > 0)
      return h;
  }
  {
    var x = a - l - o, w = n - f + u - o, D = x, A = n + f - u + o;
    if (h = Vt(e, r, a, n, x, w, D, A, !1), h.length > 0)
      return h;
  }
  var L;
  {
    var M = a - l + u, O = n - f + u;
    if (L = qr(e, r, a, n, M, O, u + o), L.length > 0 && L[0] <= M && L[1] <= O)
      return [L[0], L[1]];
  }
  {
    var P = a + l - u, I = n - f + u;
    if (L = qr(e, r, a, n, P, I, u + o), L.length > 0 && L[0] >= P && L[1] <= I)
      return [L[0], L[1]];
  }
  {
    var k = a + l - u, R = n + f - u;
    if (L = qr(e, r, a, n, k, R, u + o), L.length > 0 && L[0] >= k && L[1] >= R)
      return [L[0], L[1]];
  }
  {
    var B = a - l + u, z = n + f - u;
    if (L = qr(e, r, a, n, B, z, u + o), L.length > 0 && L[0] <= B && L[1] >= z)
      return [L[0], L[1]];
  }
  return [];
}, ng = function(e, r, a, n, i, s, o) {
  var u = o, l = Math.min(a, i), f = Math.max(a, i), h = Math.min(n, s), c = Math.max(n, s);
  return l - u <= e && e <= f + u && h - u <= r && r <= c + u;
}, ig = function(e, r, a, n, i, s, o, u, l) {
  var f = {
    x1: Math.min(a, o, i) - l,
    x2: Math.max(a, o, i) + l,
    y1: Math.min(n, u, s) - l,
    y2: Math.max(n, u, s) + l
  };
  return !(e < f.x1 || e > f.x2 || r < f.y1 || r > f.y2);
}, sg = function(e, r, a, n) {
  a -= n;
  var i = r * r - 4 * e * a;
  if (i < 0)
    return [];
  var s = Math.sqrt(i), o = 2 * e, u = (-r + s) / o, l = (-r - s) / o;
  return [u, l];
}, og = function(e, r, a, n, i) {
  var s = 1e-5;
  e === 0 && (e = s), r /= e, a /= e, n /= e;
  var o, u, l, f, h, c, v, d;
  if (u = (3 * a - r * r) / 9, l = -(27 * n) + r * (9 * a - 2 * (r * r)), l /= 54, o = u * u * u + l * l, i[1] = 0, v = r / 3, o > 0) {
    h = l + Math.sqrt(o), h = h < 0 ? -Math.pow(-h, 1 / 3) : Math.pow(h, 1 / 3), c = l - Math.sqrt(o), c = c < 0 ? -Math.pow(-c, 1 / 3) : Math.pow(c, 1 / 3), i[0] = -v + h + c, v += (h + c) / 2, i[4] = i[2] = -v, v = Math.sqrt(3) * (-c + h) / 2, i[3] = v, i[5] = -v;
    return;
  }
  if (i[5] = i[3] = 0, o === 0) {
    d = l < 0 ? -Math.pow(-l, 1 / 3) : Math.pow(l, 1 / 3), i[0] = -v + 2 * d, i[4] = i[2] = -(d + v);
    return;
  }
  u = -u, f = u * u * u, f = Math.acos(l / Math.sqrt(f)), d = 2 * Math.sqrt(u), i[0] = -v + d * Math.cos(f / 3), i[2] = -v + d * Math.cos((f + 2 * Math.PI) / 3), i[4] = -v + d * Math.cos((f + 4 * Math.PI) / 3);
}, ug = function(e, r, a, n, i, s, o, u) {
  var l = 1 * a * a - 4 * a * i + 2 * a * o + 4 * i * i - 4 * i * o + o * o + n * n - 4 * n * s + 2 * n * u + 4 * s * s - 4 * s * u + u * u, f = 1 * 9 * a * i - 3 * a * a - 3 * a * o - 6 * i * i + 3 * i * o + 9 * n * s - 3 * n * n - 3 * n * u - 6 * s * s + 3 * s * u, h = 1 * 3 * a * a - 6 * a * i + a * o - a * e + 2 * i * i + 2 * i * e - o * e + 3 * n * n - 6 * n * s + n * u - n * r + 2 * s * s + 2 * s * r - u * r, c = 1 * a * i - a * a + a * e - i * e + n * s - n * n + n * r - s * r, v = [];
  og(l, f, h, c, v);
  for (var d = 1e-7, g = [], y = 0; y < 6; y += 2)
    Math.abs(v[y + 1]) < d && v[y] >= 0 && v[y] <= 1 && g.push(v[y]);
  g.push(1), g.push(0);
  for (var p = -1, E, m, T, C = 0; C < g.length; C++)
    E = Math.pow(1 - g[C], 2) * a + 2 * (1 - g[C]) * g[C] * i + g[C] * g[C] * o, m = Math.pow(1 - g[C], 2) * n + 2 * (1 - g[C]) * g[C] * s + g[C] * g[C] * u, T = Math.pow(E - e, 2) + Math.pow(m - r, 2), p >= 0 ? T < p && (p = T) : p = T;
  return p;
}, lg = function(e, r, a, n, i, s) {
  var o = [e - a, r - n], u = [i - a, s - n], l = u[0] * u[0] + u[1] * u[1], f = o[0] * o[0] + o[1] * o[1], h = o[0] * u[0] + o[1] * u[1], c = h * h / l;
  return h < 0 ? f : c > l ? (e - i) * (e - i) + (r - s) * (r - s) : f - c;
}, ut = function(e, r, a) {
  for (var n, i, s, o, u, l = 0, f = 0; f < a.length / 2; f++)
    if (n = a[f * 2], i = a[f * 2 + 1], f + 1 < a.length / 2 ? (s = a[(f + 1) * 2], o = a[(f + 1) * 2 + 1]) : (s = a[(f + 1 - a.length / 2) * 2], o = a[(f + 1 - a.length / 2) * 2 + 1]), !(n == e && s == e))
      if (n >= e && e >= s || n <= e && e <= s)
        u = (e - n) / (s - n) * (o - i) + i, u > r && l++;
      else
        continue;
  return l % 2 !== 0;
}, It = function(e, r, a, n, i, s, o, u, l) {
  var f = new Array(a.length), h;
  u[0] != null ? (h = Math.atan(u[1] / u[0]), u[0] < 0 ? h = h + Math.PI / 2 : h = -h - Math.PI / 2) : h = u;
  for (var c = Math.cos(-h), v = Math.sin(-h), d = 0; d < f.length / 2; d++)
    f[d * 2] = s / 2 * (a[d * 2] * c - a[d * 2 + 1] * v), f[d * 2 + 1] = o / 2 * (a[d * 2 + 1] * c + a[d * 2] * v), f[d * 2] += n, f[d * 2 + 1] += i;
  var g;
  if (l > 0) {
    var y = Ao(f, -l);
    g = Lo(y);
  } else
    g = f;
  return ut(e, r, g);
}, fg = function(e, r, a, n, i, s, o) {
  for (var u = new Array(a.length), l = s / 2, f = o / 2, h = vi(s, o), c = h * h, v = 0; v < a.length / 4; v++) {
    var d = void 0, g = void 0;
    v === 0 ? d = a.length - 2 : d = v * 4 - 2, g = v * 4 + 2;
    var y = n + l * a[v * 4], p = i + f * a[v * 4 + 1], E = -a[d] * a[g] - a[d + 1] * a[g + 1], m = h / Math.tan(Math.acos(E) / 2), T = y - m * a[d], C = p - m * a[d + 1], S = y + m * a[g], b = p + m * a[g + 1];
    u[v * 4] = T, u[v * 4 + 1] = C, u[v * 4 + 2] = S, u[v * 4 + 3] = b;
    var x = a[d + 1], w = -a[d], D = x * a[g] + w * a[g + 1];
    D < 0 && (x *= -1, w *= -1);
    var A = T + x * h, L = C + w * h, M = Math.pow(A - e, 2) + Math.pow(L - r, 2);
    if (M <= c)
      return !0;
  }
  return ut(e, r, u);
}, Lo = function(e) {
  for (var r = new Array(e.length / 2), a, n, i, s, o, u, l, f, h = 0; h < e.length / 4; h++) {
    a = e[h * 4], n = e[h * 4 + 1], i = e[h * 4 + 2], s = e[h * 4 + 3], h < e.length / 4 - 1 ? (o = e[(h + 1) * 4], u = e[(h + 1) * 4 + 1], l = e[(h + 1) * 4 + 2], f = e[(h + 1) * 4 + 3]) : (o = e[0], u = e[1], l = e[2], f = e[3]);
    var c = Vt(a, n, i, s, o, u, l, f, !0);
    r[h * 2] = c[0], r[h * 2 + 1] = c[1];
  }
  return r;
}, Ao = function(e, r) {
  for (var a = new Array(e.length * 2), n, i, s, o, u = 0; u < e.length / 2; u++) {
    n = e[u * 2], i = e[u * 2 + 1], u < e.length / 2 - 1 ? (s = e[(u + 1) * 2], o = e[(u + 1) * 2 + 1]) : (s = e[0], o = e[1]);
    var l = o - i, f = -(s - n), h = Math.sqrt(l * l + f * f), c = l / h, v = f / h;
    a[u * 4] = n + c * r, a[u * 4 + 1] = i + v * r, a[u * 4 + 2] = s + c * r, a[u * 4 + 3] = o + v * r;
  }
  return a;
}, hg = function(e, r, a, n, i, s) {
  var o = a - e, u = n - r;
  o /= i, u /= s;
  var l = Math.sqrt(o * o + u * u), f = l - 1;
  if (f < 0)
    return [];
  var h = f / l;
  return [(a - e) * h + e, (n - r) * h + r];
}, rr = function(e, r, a, n, i, s, o) {
  return e -= i, r -= s, e /= a / 2 + o, r /= n / 2 + o, e * e + r * r <= 1;
}, qr = function(e, r, a, n, i, s, o) {
  var u = [a - e, n - r], l = [e - i, r - s], f = u[0] * u[0] + u[1] * u[1], h = 2 * (l[0] * u[0] + l[1] * u[1]), c = l[0] * l[0] + l[1] * l[1] - o * o, v = h * h - 4 * f * c;
  if (v < 0)
    return [];
  var d = (-h + Math.sqrt(v)) / (2 * f), g = (-h - Math.sqrt(v)) / (2 * f), y = Math.min(d, g), p = Math.max(d, g), E = [];
  if (y >= 0 && y <= 1 && E.push(y), p >= 0 && p <= 1 && E.push(p), E.length === 0)
    return [];
  var m = E[0] * u[0] + e, T = E[0] * u[1] + r;
  if (E.length > 1) {
    if (E[0] == E[1])
      return [m, T];
    var C = E[1] * u[0] + e, S = E[1] * u[1] + r;
    return [m, T, C, S];
  } else
    return [m, T];
}, Ln = function(e, r, a) {
  return r <= e && e <= a || a <= e && e <= r ? e : e <= r && r <= a || a <= r && r <= e ? r : a;
}, Vt = function(e, r, a, n, i, s, o, u, l) {
  var f = e - i, h = a - e, c = o - i, v = r - s, d = n - r, g = u - s, y = c * v - g * f, p = h * v - d * f, E = g * h - c * d;
  if (E !== 0) {
    var m = y / E, T = p / E, C = 1e-3, S = 0 - C, b = 1 + C;
    return S <= m && m <= b && S <= T && T <= b ? [e + m * h, r + m * d] : l ? [e + m * h, r + m * d] : [];
  } else
    return y === 0 || p === 0 ? Ln(e, a, o) === o ? [o, u] : Ln(e, a, i) === i ? [i, s] : Ln(i, o, a) === a ? [a, n] : [] : [];
}, sa = function(e, r, a, n, i, s, o, u) {
  var l = [], f, h = new Array(a.length), c = !0;
  s == null && (c = !1);
  var v;
  if (c) {
    for (var d = 0; d < h.length / 2; d++)
      h[d * 2] = a[d * 2] * s + n, h[d * 2 + 1] = a[d * 2 + 1] * o + i;
    if (u > 0) {
      var g = Ao(h, -u);
      v = Lo(g);
    } else
      v = h;
  } else
    v = a;
  for (var y, p, E, m, T = 0; T < v.length / 2; T++)
    y = v[T * 2], p = v[T * 2 + 1], T < v.length / 2 - 1 ? (E = v[(T + 1) * 2], m = v[(T + 1) * 2 + 1]) : (E = v[0], m = v[1]), f = Vt(e, r, n, i, y, p, E, m), f.length !== 0 && l.push(f[0], f[1]);
  return l;
}, vg = function(e, r, a, n, i, s, o, u) {
  for (var l = [], f, h = new Array(a.length), c = s / 2, v = o / 2, d = vi(s, o), g = 0; g < a.length / 4; g++) {
    var y = void 0, p = void 0;
    g === 0 ? y = a.length - 2 : y = g * 4 - 2, p = g * 4 + 2;
    var E = n + c * a[g * 4], m = i + v * a[g * 4 + 1], T = -a[y] * a[p] - a[y + 1] * a[p + 1], C = d / Math.tan(Math.acos(T) / 2), S = E - C * a[y], b = m - C * a[y + 1], x = E + C * a[p], w = m + C * a[p + 1];
    g === 0 ? (h[a.length - 2] = S, h[a.length - 1] = b) : (h[g * 4 - 2] = S, h[g * 4 - 1] = b), h[g * 4] = x, h[g * 4 + 1] = w;
    var D = a[y + 1], A = -a[y], L = D * a[p] + A * a[p + 1];
    L < 0 && (D *= -1, A *= -1);
    var M = S + D * d, O = b + A * d;
    f = qr(e, r, n, i, M, O, d), f.length !== 0 && l.push(f[0], f[1]);
  }
  for (var P = 0; P < h.length / 4; P++)
    f = Vt(e, r, n, i, h[P * 4], h[P * 4 + 1], h[P * 4 + 2], h[P * 4 + 3], !1), f.length !== 0 && l.push(f[0], f[1]);
  if (l.length > 2) {
    for (var I = [l[0], l[1]], k = Math.pow(I[0] - e, 2) + Math.pow(I[1] - r, 2), R = 1; R < l.length / 2; R++) {
      var B = Math.pow(l[R * 2] - e, 2) + Math.pow(l[R * 2 + 1] - r, 2);
      B <= k && (I[0] = l[R * 2], I[1] = l[R * 2 + 1], k = B);
    }
    return I;
  }
  return l;
}, La = function(e, r, a) {
  var n = [e[0] - r[0], e[1] - r[1]], i = Math.sqrt(n[0] * n[0] + n[1] * n[1]), s = (i - a) / i;
  return s < 0 && (s = 1e-5), [r[0] + s * n[0], r[1] + s * n[1]];
}, nt = function(e, r) {
  var a = Gn(e, r);
  return a = Oo(a), a;
}, Oo = function(e) {
  for (var r, a, n = e.length / 2, i = 1 / 0, s = 1 / 0, o = -1 / 0, u = -1 / 0, l = 0; l < n; l++)
    r = e[2 * l], a = e[2 * l + 1], i = Math.min(i, r), o = Math.max(o, r), s = Math.min(s, a), u = Math.max(u, a);
  for (var f = 2 / (o - i), h = 2 / (u - s), c = 0; c < n; c++)
    r = e[2 * c] = e[2 * c] * f, a = e[2 * c + 1] = e[2 * c + 1] * h, i = Math.min(i, r), o = Math.max(o, r), s = Math.min(s, a), u = Math.max(u, a);
  if (s < -1)
    for (var v = 0; v < n; v++)
      a = e[2 * v + 1] = e[2 * v + 1] + (-1 - s);
  return e;
}, Gn = function(e, r) {
  var a = 1 / e * 2 * Math.PI, n = e % 2 === 0 ? Math.PI / 2 + a / 2 : Math.PI / 2;
  n += r;
  for (var i = new Array(e * 2), s, o = 0; o < e; o++)
    s = o * a + n, i[2 * o] = Math.cos(s), i[2 * o + 1] = Math.sin(-s);
  return i;
}, pa = function(e, r) {
  return Math.min(e / 4, r / 4, 8);
}, vi = function(e, r) {
  return Math.min(e / 10, r / 10, 8);
}, No = function() {
  return 8;
}, cg = function(e, r, a) {
  return [e - 2 * r + a, 2 * (r - e), e];
}, zn = function(e, r) {
  return {
    heightOffset: Math.min(15, 0.05 * r),
    widthOffset: Math.min(100, 0.25 * e),
    ctrlPtOffsetPct: 0.05
  };
}, dg = Ze({
  dampingFactor: 0.8,
  precision: 1e-6,
  iterations: 200,
  weight: function(e) {
    return 1;
  }
}), gg = {
  pageRank: function(e) {
    for (var r = dg(e), a = r.dampingFactor, n = r.precision, i = r.iterations, s = r.weight, o = this._private.cy, u = this.byGroup(), l = u.nodes, f = u.edges, h = l.length, c = h * h, v = f.length, d = new Array(c), g = new Array(h), y = (1 - a) / h, p = 0; p < h; p++) {
      for (var E = 0; E < h; E++) {
        var m = p * h + E;
        d[m] = 0;
      }
      g[p] = 0;
    }
    for (var T = 0; T < v; T++) {
      var C = f[T], S = C.data("source"), b = C.data("target");
      if (S !== b) {
        var x = l.indexOfId(S), w = l.indexOfId(b), D = s(C), A = w * h + x;
        d[A] += D, g[x] += D;
      }
    }
    for (var L = 1 / h + y, M = 0; M < h; M++)
      if (g[M] === 0)
        for (var O = 0; O < h; O++) {
          var P = O * h + M;
          d[P] = L;
        }
      else
        for (var I = 0; I < h; I++) {
          var k = I * h + M;
          d[k] = d[k] / g[M] + y;
        }
    for (var R = new Array(h), B = new Array(h), z, F = 0; F < h; F++)
      R[F] = 1;
    for (var $ = 0; $ < i; $++) {
      for (var U = 0; U < h; U++)
        B[U] = 0;
      for (var V = 0; V < h; V++)
        for (var H = 0; H < h; H++) {
          var Y = V * h + H;
          B[V] += d[Y] * R[H];
        }
      Qd(B), z = R, R = B, B = z;
      for (var G = 0, X = 0; X < h; X++) {
        var K = z[X] - R[X];
        G += K * K;
      }
      if (G < n)
        break;
    }
    var Z = {
      rank: function(he) {
        return he = o.collection(he)[0], R[l.indexOf(he)];
      }
    };
    return Z;
  }
  // pageRank
}, Ki = Ze({
  root: null,
  weight: function(e) {
    return 1;
  },
  directed: !1,
  alpha: 0
}), Tr = {
  degreeCentralityNormalized: function(e) {
    e = Ki(e);
    var r = this.cy(), a = this.nodes(), n = a.length;
    if (e.directed) {
      for (var f = {}, h = {}, c = 0, v = 0, d = 0; d < n; d++) {
        var g = a[d], y = g.id();
        e.root = g;
        var p = this.degreeCentrality(e);
        c < p.indegree && (c = p.indegree), v < p.outdegree && (v = p.outdegree), f[y] = p.indegree, h[y] = p.outdegree;
      }
      return {
        indegree: function(m) {
          return c == 0 ? 0 : (le(m) && (m = r.filter(m)), f[m.id()] / c);
        },
        outdegree: function(m) {
          return v === 0 ? 0 : (le(m) && (m = r.filter(m)), h[m.id()] / v);
        }
      };
    } else {
      for (var i = {}, s = 0, o = 0; o < n; o++) {
        var u = a[o];
        e.root = u;
        var l = this.degreeCentrality(e);
        s < l.degree && (s = l.degree), i[u.id()] = l.degree;
      }
      return {
        degree: function(m) {
          return s === 0 ? 0 : (le(m) && (m = r.filter(m)), i[m.id()] / s);
        }
      };
    }
  },
  // degreeCentralityNormalized
  // Implemented from the algorithm in Opsahl's paper
  // "Node centrality in weighted networks: Generalizing degree and shortest paths"
  // check the heading 2 "Degree"
  degreeCentrality: function(e) {
    e = Ki(e);
    var r = this.cy(), a = this, n = e, i = n.root, s = n.weight, o = n.directed, u = n.alpha;
    if (i = r.collection(i)[0], o) {
      for (var v = i.connectedEdges(), d = v.filter(function(S) {
        return S.target().same(i) && a.has(S);
      }), g = v.filter(function(S) {
        return S.source().same(i) && a.has(S);
      }), y = d.length, p = g.length, E = 0, m = 0, T = 0; T < d.length; T++)
        E += s(d[T]);
      for (var C = 0; C < g.length; C++)
        m += s(g[C]);
      return {
        indegree: Math.pow(y, 1 - u) * Math.pow(E, u),
        outdegree: Math.pow(p, 1 - u) * Math.pow(m, u)
      };
    } else {
      for (var l = i.connectedEdges().intersection(a), f = l.length, h = 0, c = 0; c < l.length; c++)
        h += s(l[c]);
      return {
        degree: Math.pow(f, 1 - u) * Math.pow(h, u)
      };
    }
  }
  // degreeCentrality
};
Tr.dc = Tr.degreeCentrality;
Tr.dcn = Tr.degreeCentralityNormalised = Tr.degreeCentralityNormalized;
var Zi = Ze({
  harmonic: !0,
  weight: function() {
    return 1;
  },
  directed: !1,
  root: null
}), Cr = {
  closenessCentralityNormalized: function(e) {
    for (var r = Zi(e), a = r.harmonic, n = r.weight, i = r.directed, s = this.cy(), o = {}, u = 0, l = this.nodes(), f = this.floydWarshall({
      weight: n,
      directed: i
    }), h = 0; h < l.length; h++) {
      for (var c = 0, v = l[h], d = 0; d < l.length; d++)
        if (h !== d) {
          var g = f.distance(v, l[d]);
          a ? c += 1 / g : c += g;
        }
      a || (c = 1 / c), u < c && (u = c), o[v.id()] = c;
    }
    return {
      closeness: function(p) {
        return u == 0 ? 0 : (le(p) ? p = s.filter(p)[0].id() : p = p.id(), o[p] / u);
      }
    };
  },
  // Implemented from pseudocode from wikipedia
  closenessCentrality: function(e) {
    var r = Zi(e), a = r.root, n = r.weight, i = r.directed, s = r.harmonic;
    a = this.filter(a)[0];
    for (var o = this.dijkstra({
      root: a,
      weight: n,
      directed: i
    }), u = 0, l = this.nodes(), f = 0; f < l.length; f++) {
      var h = l[f];
      if (!h.same(a)) {
        var c = o.distanceTo(h);
        s ? u += 1 / c : u += c;
      }
    }
    return s ? u : 1 / u;
  }
  // closenessCentrality
};
Cr.cc = Cr.closenessCentrality;
Cr.ccn = Cr.closenessCentralityNormalised = Cr.closenessCentralityNormalized;
var pg = Ze({
  weight: null,
  directed: !1
}), $n = {
  // Implemented from the algorithm in the paper "On Variants of Shortest-Path Betweenness Centrality and their Generic Computation" by Ulrik Brandes
  betweennessCentrality: function(e) {
    for (var r = pg(e), a = r.directed, n = r.weight, i = n != null, s = this.cy(), o = this.nodes(), u = {}, l = {}, f = 0, h = {
      set: function(m, T) {
        l[m] = T, T > f && (f = T);
      },
      get: function(m) {
        return l[m];
      }
    }, c = 0; c < o.length; c++) {
      var v = o[c], d = v.id();
      a ? u[d] = v.outgoers().nodes() : u[d] = v.openNeighborhood().nodes(), h.set(d, 0);
    }
    for (var g = function(m) {
      for (var T = o[m].id(), C = [], S = {}, b = {}, x = {}, w = new ca(function(H, Y) {
        return x[H] - x[Y];
      }), D = 0; D < o.length; D++) {
        var A = o[D].id();
        S[A] = [], b[A] = 0, x[A] = 1 / 0;
      }
      for (b[T] = 1, x[T] = 0, w.push(T); !w.empty(); ) {
        var L = w.pop();
        if (C.push(L), i)
          for (var M = 0; M < u[L].length; M++) {
            var O = u[L][M], P = s.getElementById(L), I = void 0;
            P.edgesTo(O).length > 0 ? I = P.edgesTo(O)[0] : I = O.edgesTo(P)[0];
            var k = n(I);
            O = O.id(), x[O] > x[L] + k && (x[O] = x[L] + k, w.nodes.indexOf(O) < 0 ? w.push(O) : w.updateItem(O), b[O] = 0, S[O] = []), x[O] == x[L] + k && (b[O] = b[O] + b[L], S[O].push(L));
          }
        else
          for (var R = 0; R < u[L].length; R++) {
            var B = u[L][R].id();
            x[B] == 1 / 0 && (w.push(B), x[B] = x[L] + 1), x[B] == x[L] + 1 && (b[B] = b[B] + b[L], S[B].push(L));
          }
      }
      for (var z = {}, F = 0; F < o.length; F++)
        z[o[F].id()] = 0;
      for (; C.length > 0; ) {
        for (var $ = C.pop(), U = 0; U < S[$].length; U++) {
          var V = S[$][U];
          z[V] = z[V] + b[V] / b[$] * (1 + z[$]);
        }
        $ != o[m].id() && h.set($, h.get($) + z[$]);
      }
    }, y = 0; y < o.length; y++)
      g(y);
    var p = {
      betweenness: function(m) {
        var T = s.collection(m).id();
        return h.get(T);
      },
      betweennessNormalized: function(m) {
        if (f == 0)
          return 0;
        var T = s.collection(m).id();
        return h.get(T) / f;
      }
    };
    return p.betweennessNormalised = p.betweennessNormalized, p;
  }
  // betweennessCentrality
};
$n.bc = $n.betweennessCentrality;
var yg = Ze({
  expandFactor: 2,
  // affects time of computation and cluster granularity to some extent: M * M
  inflateFactor: 2,
  // affects cluster granularity (the greater the value, the more clusters): M(i,j) / E(j)
  multFactor: 1,
  // optional self loops for each node. Use a neutral value to improve cluster computations.
  maxIterations: 20,
  // maximum number of iterations of the MCL algorithm in a single run
  attributes: [
    // attributes/features used to group nodes, ie. similarity values between nodes
    function(t) {
      return 1;
    }
  ]
}), mg = function(e) {
  return yg(e);
}, bg = function(e, r) {
  for (var a = 0, n = 0; n < r.length; n++)
    a += r[n](e);
  return a;
}, Eg = function(e, r, a) {
  for (var n = 0; n < r; n++)
    e[n * r + n] = a;
}, Mo = function(e, r) {
  for (var a, n = 0; n < r; n++) {
    a = 0;
    for (var i = 0; i < r; i++)
      a += e[i * r + n];
    for (var s = 0; s < r; s++)
      e[s * r + n] = e[s * r + n] / a;
  }
}, wg = function(e, r, a) {
  for (var n = new Array(a * a), i = 0; i < a; i++) {
    for (var s = 0; s < a; s++)
      n[i * a + s] = 0;
    for (var o = 0; o < a; o++)
      for (var u = 0; u < a; u++)
        n[i * a + u] += e[i * a + o] * r[o * a + u];
  }
  return n;
}, xg = function(e, r, a) {
  for (var n = e.slice(0), i = 1; i < a; i++)
    e = wg(e, n, r);
  return e;
}, Tg = function(e, r, a) {
  for (var n = new Array(r * r), i = 0; i < r * r; i++)
    n[i] = Math.pow(e[i], a);
  return Mo(n, r), n;
}, Cg = function(e, r, a, n) {
  for (var i = 0; i < a; i++) {
    var s = Math.round(e[i] * Math.pow(10, n)) / Math.pow(10, n), o = Math.round(r[i] * Math.pow(10, n)) / Math.pow(10, n);
    if (s !== o)
      return !1;
  }
  return !0;
}, Dg = function(e, r, a, n) {
  for (var i = [], s = 0; s < r; s++) {
    for (var o = [], u = 0; u < r; u++)
      Math.round(e[s * r + u] * 1e3) / 1e3 > 0 && o.push(a[u]);
    o.length !== 0 && i.push(n.collection(o));
  }
  return i;
}, Sg = function(e, r) {
  for (var a = 0; a < e.length; a++)
    if (!r[a] || e[a].id() !== r[a].id())
      return !1;
  return !0;
}, Lg = function(e) {
  for (var r = 0; r < e.length; r++)
    for (var a = 0; a < e.length; a++)
      r != a && Sg(e[r], e[a]) && e.splice(a, 1);
  return e;
}, Qi = function(e) {
  for (var r = this.nodes(), a = this.edges(), n = this.cy(), i = mg(e), s = {}, o = 0; o < r.length; o++)
    s[r[o].id()] = o;
  for (var u = r.length, l = u * u, f = new Array(l), h, c = 0; c < l; c++)
    f[c] = 0;
  for (var v = 0; v < a.length; v++) {
    var d = a[v], g = s[d.source().id()], y = s[d.target().id()], p = bg(d, i.attributes);
    f[g * u + y] += p, f[y * u + g] += p;
  }
  Eg(f, u, i.multFactor), Mo(f, u);
  for (var E = !0, m = 0; E && m < i.maxIterations; )
    E = !1, h = xg(f, u, i.expandFactor), f = Tg(h, u, i.inflateFactor), Cg(f, h, l, 4) || (E = !0), m++;
  var T = Dg(f, u, r, n);
  return T = Lg(T), T;
}, Ag = {
  markovClustering: Qi,
  mcl: Qi
}, Og = function(e) {
  return e;
}, Io = function(e, r) {
  return Math.abs(r - e);
}, Ji = function(e, r, a) {
  return e + Io(r, a);
}, ji = function(e, r, a) {
  return e + Math.pow(a - r, 2);
}, Ng = function(e) {
  return Math.sqrt(e);
}, Mg = function(e, r, a) {
  return Math.max(e, Io(r, a));
}, _r = function(e, r, a, n, i) {
  for (var s = arguments.length > 5 && arguments[5] !== void 0 ? arguments[5] : Og, o = n, u, l, f = 0; f < e; f++)
    u = r(f), l = a(f), o = i(o, u, l);
  return s(o);
}, Lr = {
  euclidean: function(e, r, a) {
    return e >= 2 ? _r(e, r, a, 0, ji, Ng) : _r(e, r, a, 0, Ji);
  },
  squaredEuclidean: function(e, r, a) {
    return _r(e, r, a, 0, ji);
  },
  manhattan: function(e, r, a) {
    return _r(e, r, a, 0, Ji);
  },
  max: function(e, r, a) {
    return _r(e, r, a, -1 / 0, Mg);
  }
};
Lr["squared-euclidean"] = Lr.squaredEuclidean;
Lr.squaredeuclidean = Lr.squaredEuclidean;
function fn(t, e, r, a, n, i) {
  var s;
  return Fe(t) ? s = t : s = Lr[t] || Lr.euclidean, e === 0 && Fe(t) ? s(n, i) : s(e, r, a, n, i);
}
var Ig = Ze({
  k: 2,
  m: 2,
  sensitivityThreshold: 1e-4,
  distance: "euclidean",
  maxIterations: 10,
  attributes: [],
  testMode: !1,
  testCentroids: null
}), ci = function(e) {
  return Ig(e);
}, Xa = function(e, r, a, n, i) {
  var s = i !== "kMedoids", o = s ? function(h) {
    return a[h];
  } : function(h) {
    return n[h](a);
  }, u = function(c) {
    return n[c](r);
  }, l = a, f = r;
  return fn(e, n.length, o, u, l, f);
}, An = function(e, r, a) {
  for (var n = a.length, i = new Array(n), s = new Array(n), o = new Array(r), u = null, l = 0; l < n; l++)
    i[l] = e.min(a[l]).value, s[l] = e.max(a[l]).value;
  for (var f = 0; f < r; f++) {
    u = [];
    for (var h = 0; h < n; h++)
      u[h] = Math.random() * (s[h] - i[h]) + i[h];
    o[f] = u;
  }
  return o;
}, Ro = function(e, r, a, n, i) {
  for (var s = 1 / 0, o = 0, u = 0; u < r.length; u++) {
    var l = Xa(a, e, r[u], n, i);
    l < s && (s = l, o = u);
  }
  return o;
}, ko = function(e, r, a) {
  for (var n = [], i = null, s = 0; s < r.length; s++)
    i = r[s], a[i.id()] === e && n.push(i);
  return n;
}, Rg = function(e, r, a) {
  return Math.abs(r - e) <= a;
}, kg = function(e, r, a) {
  for (var n = 0; n < e.length; n++)
    for (var i = 0; i < e[n].length; i++) {
      var s = Math.abs(e[n][i] - r[n][i]);
      if (s > a)
        return !1;
    }
  return !0;
}, Pg = function(e, r, a) {
  for (var n = 0; n < a; n++)
    if (e === r[n])
      return !0;
  return !1;
}, es = function(e, r) {
  var a = new Array(r);
  if (e.length < 50)
    for (var n = 0; n < r; n++) {
      for (var i = e[Math.floor(Math.random() * e.length)]; Pg(i, a, n); )
        i = e[Math.floor(Math.random() * e.length)];
      a[n] = i;
    }
  else
    for (var s = 0; s < r; s++)
      a[s] = e[Math.floor(Math.random() * e.length)];
  return a;
}, ts = function(e, r, a) {
  for (var n = 0, i = 0; i < r.length; i++)
    n += Xa("manhattan", r[i], e, a, "kMedoids");
  return n;
}, Bg = function(e) {
  var r = this.cy(), a = this.nodes(), n = null, i = ci(e), s = new Array(i.k), o = {}, u;
  i.testMode ? typeof i.testCentroids == "number" ? (i.testCentroids, u = An(a, i.k, i.attributes)) : _e(i.testCentroids) === "object" ? u = i.testCentroids : u = An(a, i.k, i.attributes) : u = An(a, i.k, i.attributes);
  for (var l = !0, f = 0; l && f < i.maxIterations; ) {
    for (var h = 0; h < a.length; h++)
      n = a[h], o[n.id()] = Ro(n, u, i.distance, i.attributes, "kMeans");
    l = !1;
    for (var c = 0; c < i.k; c++) {
      var v = ko(c, a, o);
      if (v.length !== 0) {
        for (var d = i.attributes.length, g = u[c], y = new Array(d), p = new Array(d), E = 0; E < d; E++) {
          p[E] = 0;
          for (var m = 0; m < v.length; m++)
            n = v[m], p[E] += i.attributes[E](n);
          y[E] = p[E] / v.length, Rg(y[E], g[E], i.sensitivityThreshold) || (l = !0);
        }
        u[c] = y, s[c] = r.collection(v);
      }
    }
    f++;
  }
  return s;
}, Fg = function(e) {
  var r = this.cy(), a = this.nodes(), n = null, i = ci(e), s = new Array(i.k), o, u = {}, l, f = new Array(i.k);
  i.testMode ? typeof i.testCentroids == "number" || (_e(i.testCentroids) === "object" ? o = i.testCentroids : o = es(a, i.k)) : o = es(a, i.k);
  for (var h = !0, c = 0; h && c < i.maxIterations; ) {
    for (var v = 0; v < a.length; v++)
      n = a[v], u[n.id()] = Ro(n, o, i.distance, i.attributes, "kMedoids");
    h = !1;
    for (var d = 0; d < o.length; d++) {
      var g = ko(d, a, u);
      if (g.length !== 0) {
        f[d] = ts(o[d], g, i.attributes);
        for (var y = 0; y < g.length; y++)
          l = ts(g[y], g, i.attributes), l < f[d] && (f[d] = l, o[d] = g[y], h = !0);
        s[d] = r.collection(g);
      }
    }
    c++;
  }
  return s;
}, Gg = function(e, r, a, n, i) {
  for (var s, o, u = 0; u < r.length; u++)
    for (var l = 0; l < e.length; l++)
      n[u][l] = Math.pow(a[u][l], i.m);
  for (var f = 0; f < e.length; f++)
    for (var h = 0; h < i.attributes.length; h++) {
      s = 0, o = 0;
      for (var c = 0; c < r.length; c++)
        s += n[c][f] * i.attributes[h](r[c]), o += n[c][f];
      e[f][h] = s / o;
    }
}, zg = function(e, r, a, n, i) {
  for (var s = 0; s < e.length; s++)
    r[s] = e[s].slice();
  for (var o, u, l, f = 2 / (i.m - 1), h = 0; h < a.length; h++)
    for (var c = 0; c < n.length; c++) {
      o = 0;
      for (var v = 0; v < a.length; v++)
        u = Xa(i.distance, n[c], a[h], i.attributes, "cmeans"), l = Xa(i.distance, n[c], a[v], i.attributes, "cmeans"), o += Math.pow(u / l, f);
      e[c][h] = 1 / o;
    }
}, $g = function(e, r, a, n) {
  for (var i = new Array(a.k), s = 0; s < i.length; s++)
    i[s] = [];
  for (var o, u, l = 0; l < r.length; l++) {
    o = -1 / 0, u = -1;
    for (var f = 0; f < r[0].length; f++)
      r[l][f] > o && (o = r[l][f], u = f);
    i[u].push(e[l]);
  }
  for (var h = 0; h < i.length; h++)
    i[h] = n.collection(i[h]);
  return i;
}, rs = function(e) {
  var r = this.cy(), a = this.nodes(), n = ci(e), i, s, o, u, l;
  u = new Array(a.length);
  for (var f = 0; f < a.length; f++)
    u[f] = new Array(n.k);
  o = new Array(a.length);
  for (var h = 0; h < a.length; h++)
    o[h] = new Array(n.k);
  for (var c = 0; c < a.length; c++) {
    for (var v = 0, d = 0; d < n.k; d++)
      o[c][d] = Math.random(), v += o[c][d];
    for (var g = 0; g < n.k; g++)
      o[c][g] = o[c][g] / v;
  }
  s = new Array(n.k);
  for (var y = 0; y < n.k; y++)
    s[y] = new Array(n.attributes.length);
  l = new Array(a.length);
  for (var p = 0; p < a.length; p++)
    l[p] = new Array(n.k);
  for (var E = !0, m = 0; E && m < n.maxIterations; )
    E = !1, Gg(s, a, o, l, n), zg(o, u, s, a, n), kg(o, u, n.sensitivityThreshold) || (E = !0), m++;
  return i = $g(a, o, n, r), {
    clusters: i,
    degreeOfMembership: o
  };
}, Vg = {
  kMeans: Bg,
  kMedoids: Fg,
  fuzzyCMeans: rs,
  fcm: rs
}, _g = Ze({
  distance: "euclidean",
  // distance metric to compare nodes
  linkage: "min",
  // linkage criterion : how to determine the distance between clusters of nodes
  mode: "threshold",
  // mode:'threshold' => clusters must be threshold distance apart
  threshold: 1 / 0,
  // the distance threshold
  // mode:'dendrogram' => the nodes are organised as leaves in a tree (siblings are close), merging makes clusters
  addDendrogram: !1,
  // whether to add the dendrogram to the graph for viz
  dendrogramDepth: 0,
  // depth at which dendrogram branches are merged into the returned clusters
  attributes: []
  // array of attr functions
}), Ug = {
  single: "min",
  complete: "max"
}, Yg = function(e) {
  var r = _g(e), a = Ug[r.linkage];
  return a != null && (r.linkage = a), r;
}, as = function(e, r, a, n, i) {
  for (var s = 0, o = 1 / 0, u, l = i.attributes, f = function(w, D) {
    return fn(i.distance, l.length, function(A) {
      return l[A](w);
    }, function(A) {
      return l[A](D);
    }, w, D);
  }, h = 0; h < e.length; h++) {
    var c = e[h].key, v = a[c][n[c]];
    v < o && (s = c, o = v);
  }
  if (i.mode === "threshold" && o >= i.threshold || i.mode === "dendrogram" && e.length === 1)
    return !1;
  var d = r[s], g = r[n[s]], y;
  i.mode === "dendrogram" ? y = {
    left: d,
    right: g,
    key: d.key
  } : y = {
    value: d.value.concat(g.value),
    key: d.key
  }, e[d.index] = y, e.splice(g.index, 1), r[d.key] = y;
  for (var p = 0; p < e.length; p++) {
    var E = e[p];
    d.key === E.key ? u = 1 / 0 : i.linkage === "min" ? (u = a[d.key][E.key], a[d.key][E.key] > a[g.key][E.key] && (u = a[g.key][E.key])) : i.linkage === "max" ? (u = a[d.key][E.key], a[d.key][E.key] < a[g.key][E.key] && (u = a[g.key][E.key])) : i.linkage === "mean" ? u = (a[d.key][E.key] * d.size + a[g.key][E.key] * g.size) / (d.size + g.size) : i.mode === "dendrogram" ? u = f(E.value, d.value) : u = f(E.value[0], d.value[0]), a[d.key][E.key] = a[E.key][d.key] = u;
  }
  for (var m = 0; m < e.length; m++) {
    var T = e[m].key;
    if (n[T] === d.key || n[T] === g.key) {
      for (var C = T, S = 0; S < e.length; S++) {
        var b = e[S].key;
        a[T][b] < a[T][C] && (C = b);
      }
      n[T] = C;
    }
    e[m].index = m;
  }
  return d.key = g.key = d.index = g.index = null, !0;
}, Aa = function t(e, r, a) {
  e && (e.value ? r.push(e.value) : (e.left && t(e.left, r), e.right && t(e.right, r)));
}, Hg = function t(e, r) {
  if (!e)
    return "";
  if (e.left && e.right) {
    var a = t(e.left, r), n = t(e.right, r), i = r.add({
      group: "nodes",
      data: {
        id: a + "," + n
      }
    });
    return r.add({
      group: "edges",
      data: {
        source: a,
        target: i.id()
      }
    }), r.add({
      group: "edges",
      data: {
        source: n,
        target: i.id()
      }
    }), i.id();
  } else if (e.value)
    return e.value.id();
}, Xg = function t(e, r, a) {
  if (!e)
    return [];
  var n = [], i = [], s = [];
  return r === 0 ? (e.left && Aa(e.left, n), e.right && Aa(e.right, i), s = n.concat(i), [a.collection(s)]) : r === 1 ? e.value ? [a.collection(e.value)] : (e.left && Aa(e.left, n), e.right && Aa(e.right, i), [a.collection(n), a.collection(i)]) : e.value ? [a.collection(e.value)] : (e.left && (n = t(e.left, r - 1, a)), e.right && (i = t(e.right, r - 1, a)), n.concat(i));
}, ns = function(e) {
  for (var r = this.cy(), a = this.nodes(), n = Yg(e), i = n.attributes, s = function(m, T) {
    return fn(n.distance, i.length, function(C) {
      return i[C](m);
    }, function(C) {
      return i[C](T);
    }, m, T);
  }, o = [], u = [], l = [], f = [], h = 0; h < a.length; h++) {
    var c = {
      value: n.mode === "dendrogram" ? a[h] : [a[h]],
      key: h,
      index: h
    };
    o[h] = c, f[h] = c, u[h] = [], l[h] = 0;
  }
  for (var v = 0; v < o.length; v++)
    for (var d = 0; d <= v; d++) {
      var g = void 0;
      n.mode === "dendrogram" ? g = v === d ? 1 / 0 : s(o[v].value, o[d].value) : g = v === d ? 1 / 0 : s(o[v].value[0], o[d].value[0]), u[v][d] = g, u[d][v] = g, g < u[v][l[v]] && (l[v] = d);
    }
  for (var y = as(o, f, u, l, n); y; )
    y = as(o, f, u, l, n);
  var p;
  return n.mode === "dendrogram" ? (p = Xg(o[0], n.dendrogramDepth, r), n.addDendrogram && Hg(o[0], r)) : (p = new Array(o.length), o.forEach(function(E, m) {
    E.key = E.index = null, p[m] = r.collection(E.value);
  })), p;
}, qg = {
  hierarchicalClustering: ns,
  hca: ns
}, Wg = Ze({
  distance: "euclidean",
  // distance metric to compare attributes between two nodes
  preference: "median",
  // suitability of a data point to serve as an exemplar
  damping: 0.8,
  // damping factor between [0.5, 1)
  maxIterations: 1e3,
  // max number of iterations to run
  minIterations: 100,
  // min number of iterations to run in order for clustering to stop
  attributes: [
    // functions to quantify the similarity between any two points
    // e.g. node => node.data('weight')
  ]
}), Kg = function(e) {
  var r = e.damping, a = e.preference;
  0.5 <= r && r < 1 || ze("Damping must range on [0.5, 1).  Got: ".concat(r));
  var n = ["median", "mean", "min", "max"];
  return n.some(function(i) {
    return i === a;
  }) || ae(a) || ze("Preference must be one of [".concat(n.map(function(i) {
    return "'".concat(i, "'");
  }).join(", "), "] or a number.  Got: ").concat(a)), Wg(e);
}, Zg = function(e, r, a, n) {
  var i = function(o, u) {
    return n[u](o);
  };
  return -fn(e, n.length, function(s) {
    return i(r, s);
  }, function(s) {
    return i(a, s);
  }, r, a);
}, Qg = function(e, r) {
  var a = null;
  return r === "median" ? a = Kd(e) : r === "mean" ? a = Wd(e) : r === "min" ? a = Xd(e) : r === "max" ? a = qd(e) : a = r, a;
}, Jg = function(e, r, a) {
  for (var n = [], i = 0; i < e; i++)
    r[i * e + i] + a[i * e + i] > 0 && n.push(i);
  return n;
}, is = function(e, r, a) {
  for (var n = [], i = 0; i < e; i++) {
    for (var s = -1, o = -1 / 0, u = 0; u < a.length; u++) {
      var l = a[u];
      r[i * e + l] > o && (s = l, o = r[i * e + l]);
    }
    s > 0 && n.push(s);
  }
  for (var f = 0; f < a.length; f++)
    n[a[f]] = a[f];
  return n;
}, jg = function(e, r, a) {
  for (var n = is(e, r, a), i = 0; i < a.length; i++) {
    for (var s = [], o = 0; o < n.length; o++)
      n[o] === a[i] && s.push(o);
    for (var u = -1, l = -1 / 0, f = 0; f < s.length; f++) {
      for (var h = 0, c = 0; c < s.length; c++)
        h += r[s[c] * e + s[f]];
      h > l && (u = f, l = h);
    }
    a[i] = s[u];
  }
  return n = is(e, r, a), n;
}, ss = function(e) {
  for (var r = this.cy(), a = this.nodes(), n = Kg(e), i = {}, s = 0; s < a.length; s++)
    i[a[s].id()] = s;
  var o, u, l, f, h, c;
  o = a.length, u = o * o, l = new Array(u);
  for (var v = 0; v < u; v++)
    l[v] = -1 / 0;
  for (var d = 0; d < o; d++)
    for (var g = 0; g < o; g++)
      d !== g && (l[d * o + g] = Zg(n.distance, a[d], a[g], n.attributes));
  f = Qg(l, n.preference);
  for (var y = 0; y < o; y++)
    l[y * o + y] = f;
  h = new Array(u);
  for (var p = 0; p < u; p++)
    h[p] = 0;
  c = new Array(u);
  for (var E = 0; E < u; E++)
    c[E] = 0;
  for (var m = new Array(o), T = new Array(o), C = new Array(o), S = 0; S < o; S++)
    m[S] = 0, T[S] = 0, C[S] = 0;
  for (var b = new Array(o * n.minIterations), x = 0; x < b.length; x++)
    b[x] = 0;
  var w;
  for (w = 0; w < n.maxIterations; w++) {
    for (var D = 0; D < o; D++) {
      for (var A = -1 / 0, L = -1 / 0, M = -1, O = 0, P = 0; P < o; P++)
        m[P] = h[D * o + P], O = c[D * o + P] + l[D * o + P], O >= A ? (L = A, A = O, M = P) : O > L && (L = O);
      for (var I = 0; I < o; I++)
        h[D * o + I] = (1 - n.damping) * (l[D * o + I] - A) + n.damping * m[I];
      h[D * o + M] = (1 - n.damping) * (l[D * o + M] - L) + n.damping * m[M];
    }
    for (var k = 0; k < o; k++) {
      for (var R = 0, B = 0; B < o; B++)
        m[B] = c[B * o + k], T[B] = Math.max(0, h[B * o + k]), R += T[B];
      R -= T[k], T[k] = h[k * o + k], R += T[k];
      for (var z = 0; z < o; z++)
        c[z * o + k] = (1 - n.damping) * Math.min(0, R - T[z]) + n.damping * m[z];
      c[k * o + k] = (1 - n.damping) * (R - T[k]) + n.damping * m[k];
    }
    for (var F = 0, $ = 0; $ < o; $++) {
      var U = c[$ * o + $] + h[$ * o + $] > 0 ? 1 : 0;
      b[w % n.minIterations * o + $] = U, F += U;
    }
    if (F > 0 && (w >= n.minIterations - 1 || w == n.maxIterations - 1)) {
      for (var V = 0, H = 0; H < o; H++) {
        C[H] = 0;
        for (var Y = 0; Y < n.minIterations; Y++)
          C[H] += b[Y * o + H];
        (C[H] === 0 || C[H] === n.minIterations) && V++;
      }
      if (V === o)
        break;
    }
  }
  for (var G = Jg(o, h, c), X = jg(o, l, G), K = {}, Z = 0; Z < G.length; Z++)
    K[G[Z]] = [];
  for (var te = 0; te < a.length; te++) {
    var he = i[a[te].id()], de = X[he];
    de != null && K[de].push(a[te]);
  }
  for (var ee = new Array(G.length), re = 0; re < G.length; re++)
    ee[re] = r.collection(K[G[re]]);
  return ee;
}, ep = {
  affinityPropagation: ss,
  ap: ss
}, tp = Ze({
  root: void 0,
  directed: !1
}), rp = {
  hierholzer: function(e) {
    if (!Te(e)) {
      var r = arguments;
      e = {
        root: r[0],
        directed: r[1]
      };
    }
    var a = tp(e), n = a.root, i = a.directed, s = this, o = !1, u, l, f;
    n && (f = le(n) ? this.filter(n)[0].id() : n[0].id());
    var h = {}, c = {};
    i ? s.forEach(function(E) {
      var m = E.id();
      if (E.isNode()) {
        var T = E.indegree(!0), C = E.outdegree(!0), S = T - C, b = C - T;
        S == 1 ? u ? o = !0 : u = m : b == 1 ? l ? o = !0 : l = m : (b > 1 || S > 1) && (o = !0), h[m] = [], E.outgoers().forEach(function(x) {
          x.isEdge() && h[m].push(x.id());
        });
      } else
        c[m] = [void 0, E.target().id()];
    }) : s.forEach(function(E) {
      var m = E.id();
      if (E.isNode()) {
        var T = E.degree(!0);
        T % 2 && (u ? l ? o = !0 : l = m : u = m), h[m] = [], E.connectedEdges().forEach(function(C) {
          return h[m].push(C.id());
        });
      } else
        c[m] = [E.source().id(), E.target().id()];
    });
    var v = {
      found: !1,
      trail: void 0
    };
    if (o)
      return v;
    if (l && u)
      if (i) {
        if (f && l != f)
          return v;
        f = l;
      } else {
        if (f && l != f && u != f)
          return v;
        f || (f = l);
      }
    else
      f || (f = s[0].id());
    var d = function(m) {
      for (var T = m, C = [m], S, b, x; h[T].length; )
        S = h[T].shift(), b = c[S][0], x = c[S][1], T != x ? (h[x] = h[x].filter(function(w) {
          return w != S;
        }), T = x) : !i && T != b && (h[b] = h[b].filter(function(w) {
          return w != S;
        }), T = b), C.unshift(S), C.unshift(T);
      return C;
    }, g = [], y = [];
    for (y = d(f); y.length != 1; )
      h[y[0]].length == 0 ? (g.unshift(s.getElementById(y.shift())), g.unshift(s.getElementById(y.shift()))) : y = d(y.shift()).concat(y);
    g.unshift(s.getElementById(y.shift()));
    for (var p in h)
      if (h[p].length)
        return v;
    return v.found = !0, v.trail = this.spawn(g, !0), v;
  }
}, Oa = function() {
  var e = this, r = {}, a = 0, n = 0, i = [], s = [], o = {}, u = function(c, v) {
    for (var d = s.length - 1, g = [], y = e.spawn(); s[d].x != c || s[d].y != v; )
      g.push(s.pop().edge), d--;
    g.push(s.pop().edge), g.forEach(function(p) {
      var E = p.connectedNodes().intersection(e);
      y.merge(p), E.forEach(function(m) {
        var T = m.id(), C = m.connectedEdges().intersection(e);
        y.merge(m), r[T].cutVertex ? y.merge(C.filter(function(S) {
          return S.isLoop();
        })) : y.merge(C);
      });
    }), i.push(y);
  }, l = function h(c, v, d) {
    c === d && (n += 1), r[v] = {
      id: a,
      low: a++,
      cutVertex: !1
    };
    var g = e.getElementById(v).connectedEdges().intersection(e);
    if (g.size() === 0)
      i.push(e.spawn(e.getElementById(v)));
    else {
      var y, p, E, m;
      g.forEach(function(T) {
        y = T.source().id(), p = T.target().id(), E = y === v ? p : y, E !== d && (m = T.id(), o[m] || (o[m] = !0, s.push({
          x: v,
          y: E,
          edge: T
        })), E in r ? r[v].low = Math.min(r[v].low, r[E].id) : (h(c, E, v), r[v].low = Math.min(r[v].low, r[E].low), r[v].id <= r[E].low && (r[v].cutVertex = !0, u(v, E))));
      });
    }
  };
  e.forEach(function(h) {
    if (h.isNode()) {
      var c = h.id();
      c in r || (n = 0, l(c, c), r[c].cutVertex = n > 1);
    }
  });
  var f = Object.keys(r).filter(function(h) {
    return r[h].cutVertex;
  }).map(function(h) {
    return e.getElementById(h);
  });
  return {
    cut: e.spawn(f),
    components: i
  };
}, ap = {
  hopcroftTarjanBiconnected: Oa,
  htbc: Oa,
  htb: Oa,
  hopcroftTarjanBiconnectedComponents: Oa
}, Na = function() {
  var e = this, r = {}, a = 0, n = [], i = [], s = e.spawn(e), o = function u(l) {
    i.push(l), r[l] = {
      index: a,
      low: a++,
      explored: !1
    };
    var f = e.getElementById(l).connectedEdges().intersection(e);
    if (f.forEach(function(g) {
      var y = g.target().id();
      y !== l && (y in r || u(y), r[y].explored || (r[l].low = Math.min(r[l].low, r[y].low)));
    }), r[l].index === r[l].low) {
      for (var h = e.spawn(); ; ) {
        var c = i.pop();
        if (h.merge(e.getElementById(c)), r[c].low = r[l].index, r[c].explored = !0, c === l)
          break;
      }
      var v = h.edgesWith(h), d = h.merge(v);
      n.push(d), s = s.difference(d);
    }
  };
  return e.forEach(function(u) {
    if (u.isNode()) {
      var l = u.id();
      l in r || o(l);
    }
  }), {
    cut: s,
    components: n
  };
}, np = {
  tarjanStronglyConnected: Na,
  tsc: Na,
  tscc: Na,
  tarjanStronglyConnectedComponents: Na
}, Po = {};
[na, kd, Pd, Fd, zd, Vd, Yd, gg, Tr, Cr, $n, Ag, Vg, qg, ep, rp, ap, np].forEach(function(t) {
  ce(Po, t);
});
/*!
Embeddable Minimum Strictly-Compliant Promises/A+ 1.1.1 Thenable
Copyright (c) 2013-2014 Ralf S. Engelschall (http://engelschall.com)
Licensed under The MIT License (http://opensource.org/licenses/MIT)
*/
var Bo = 0, Fo = 1, Go = 2, Rt = function t(e) {
  if (!(this instanceof t))
    return new t(e);
  this.id = "Thenable/1.0.7", this.state = Bo, this.fulfillValue = void 0, this.rejectReason = void 0, this.onFulfilled = [], this.onRejected = [], this.proxy = {
    then: this.then.bind(this)
  }, typeof e == "function" && e.call(this, this.fulfill.bind(this), this.reject.bind(this));
};
Rt.prototype = {
  /*  promise resolving methods  */
  fulfill: function(e) {
    return os(this, Fo, "fulfillValue", e);
  },
  reject: function(e) {
    return os(this, Go, "rejectReason", e);
  },
  /*  "The then Method" [Promises/A+ 1.1, 1.2, 2.2]  */
  then: function(e, r) {
    var a = this, n = new Rt();
    return a.onFulfilled.push(ls(e, n, "fulfill")), a.onRejected.push(ls(r, n, "reject")), zo(a), n.proxy;
  }
};
var os = function(e, r, a, n) {
  return e.state === Bo && (e.state = r, e[a] = n, zo(e)), e;
}, zo = function(e) {
  e.state === Fo ? us(e, "onFulfilled", e.fulfillValue) : e.state === Go && us(e, "onRejected", e.rejectReason);
}, us = function(e, r, a) {
  if (e[r].length !== 0) {
    var n = e[r];
    e[r] = [];
    var i = function() {
      for (var o = 0; o < n.length; o++)
        n[o](a);
    };
    typeof setImmediate == "function" ? setImmediate(i) : setTimeout(i, 0);
  }
}, ls = function(e, r, a) {
  return function(n) {
    if (typeof e != "function")
      r[a].call(r, n);
    else {
      var i;
      try {
        i = e(n);
      } catch (s) {
        r.reject(s);
        return;
      }
      ip(r, i);
    }
  };
}, ip = function t(e, r) {
  if (e === r || e.proxy === r) {
    e.reject(new TypeError("cannot resolve promise with itself"));
    return;
  }
  var a;
  if (_e(r) === "object" && r !== null || typeof r == "function")
    try {
      a = r.then;
    } catch (i) {
      e.reject(i);
      return;
    }
  if (typeof a == "function") {
    var n = !1;
    try {
      a.call(
        r,
        /*  resolvePromise  */
        /*  [Promises/A+ 2.3.3.3.1]  */
        function(i) {
          n || (n = !0, i === r ? e.reject(new TypeError("circular thenable chain")) : t(e, i));
        },
        /*  rejectPromise  */
        /*  [Promises/A+ 2.3.3.3.2]  */
        function(i) {
          n || (n = !0, e.reject(i));
        }
      );
    } catch (i) {
      n || e.reject(i);
    }
    return;
  }
  e.fulfill(r);
};
Rt.all = function(t) {
  return new Rt(function(e, r) {
    for (var a = new Array(t.length), n = 0, i = function(u, l) {
      a[u] = l, n++, n === t.length && e(a);
    }, s = 0; s < t.length; s++)
      (function(o) {
        var u = t[o], l = u != null && u.then != null;
        if (l)
          u.then(function(h) {
            i(o, h);
          }, function(h) {
            r(h);
          });
        else {
          var f = u;
          i(o, f);
        }
      })(s);
  });
};
Rt.resolve = function(t) {
  return new Rt(function(e, r) {
    e(t);
  });
};
Rt.reject = function(t) {
  return new Rt(function(e, r) {
    r(t);
  });
};
var Rr = typeof Promise < "u" ? Promise : Rt, Vn = function(e, r, a) {
  var n = ii(e), i = !n, s = this._private = ce({
    duration: 1e3
  }, r, a);
  if (s.target = e, s.style = s.style || s.css, s.started = !1, s.playing = !1, s.hooked = !1, s.applying = !1, s.progress = 0, s.completes = [], s.frames = [], s.complete && Fe(s.complete) && s.completes.push(s.complete), i) {
    var o = e.position();
    s.startPosition = s.startPosition || {
      x: o.x,
      y: o.y
    }, s.startStyle = s.startStyle || e.cy().style().getAnimationStartStyle(e, s.style);
  }
  if (n) {
    var u = e.pan();
    s.startPan = {
      x: u.x,
      y: u.y
    }, s.startZoom = e.zoom();
  }
  this.length = 1, this[0] = this;
}, ir = Vn.prototype;
ce(ir, {
  instanceString: function() {
    return "animation";
  },
  hook: function() {
    var e = this._private;
    if (!e.hooked) {
      var r, a = e.target._private.animation;
      e.queue ? r = a.queue : r = a.current, r.push(this), ft(e.target) && e.target.cy().addToAnimationPool(e.target), e.hooked = !0;
    }
    return this;
  },
  play: function() {
    var e = this._private;
    return e.progress === 1 && (e.progress = 0), e.playing = !0, e.started = !1, e.stopped = !1, this.hook(), this;
  },
  playing: function() {
    return this._private.playing;
  },
  apply: function() {
    var e = this._private;
    return e.applying = !0, e.started = !1, e.stopped = !1, this.hook(), this;
  },
  applying: function() {
    return this._private.applying;
  },
  pause: function() {
    var e = this._private;
    return e.playing = !1, e.started = !1, this;
  },
  stop: function() {
    var e = this._private;
    return e.playing = !1, e.started = !1, e.stopped = !0, this;
  },
  rewind: function() {
    return this.progress(0);
  },
  fastforward: function() {
    return this.progress(1);
  },
  time: function(e) {
    var r = this._private;
    return e === void 0 ? r.progress * r.duration : this.progress(e / r.duration);
  },
  progress: function(e) {
    var r = this._private, a = r.playing;
    return e === void 0 ? r.progress : (a && this.pause(), r.progress = e, r.started = !1, a && this.play(), this);
  },
  completed: function() {
    return this._private.progress === 1;
  },
  reverse: function() {
    var e = this._private, r = e.playing;
    r && this.pause(), e.progress = 1 - e.progress, e.started = !1;
    var a = function(l, f) {
      var h = e[l];
      h != null && (e[l] = e[f], e[f] = h);
    };
    if (a("zoom", "startZoom"), a("pan", "startPan"), a("position", "startPosition"), e.style)
      for (var n = 0; n < e.style.length; n++) {
        var i = e.style[n], s = i.name, o = e.startStyle[s];
        e.startStyle[s] = i, e.style[n] = o;
      }
    return r && this.play(), this;
  },
  promise: function(e) {
    var r = this._private, a;
    switch (e) {
      case "frame":
        a = r.frames;
        break;
      default:
      case "complete":
      case "completed":
        a = r.completes;
    }
    return new Rr(function(n, i) {
      a.push(function() {
        n();
      });
    });
  }
});
ir.complete = ir.completed;
ir.run = ir.play;
ir.running = ir.playing;
var sp = {
  animated: function() {
    return function() {
      var r = this, a = r.length !== void 0, n = a ? r : [r], i = this._private.cy || this;
      if (!i.styleEnabled())
        return !1;
      var s = n[0];
      if (s)
        return s._private.animation.current.length > 0;
    };
  },
  // animated
  clearQueue: function() {
    return function() {
      var r = this, a = r.length !== void 0, n = a ? r : [r], i = this._private.cy || this;
      if (!i.styleEnabled())
        return this;
      for (var s = 0; s < n.length; s++) {
        var o = n[s];
        o._private.animation.queue = [];
      }
      return this;
    };
  },
  // clearQueue
  delay: function() {
    return function(r, a) {
      var n = this._private.cy || this;
      return n.styleEnabled() ? this.animate({
        delay: r,
        duration: r,
        complete: a
      }) : this;
    };
  },
  // delay
  delayAnimation: function() {
    return function(r, a) {
      var n = this._private.cy || this;
      return n.styleEnabled() ? this.animation({
        delay: r,
        duration: r,
        complete: a
      }) : this;
    };
  },
  // delay
  animation: function() {
    return function(r, a) {
      var n = this, i = n.length !== void 0, s = i ? n : [n], o = this._private.cy || this, u = !i, l = !u;
      if (!o.styleEnabled())
        return this;
      var f = o.style();
      r = ce({}, r, a);
      var h = Object.keys(r).length === 0;
      if (h)
        return new Vn(s[0], r);
      switch (r.duration === void 0 && (r.duration = 400), r.duration) {
        case "slow":
          r.duration = 600;
          break;
        case "fast":
          r.duration = 200;
          break;
      }
      if (l && (r.style = f.getPropsList(r.style || r.css), r.css = void 0), l && r.renderedPosition != null) {
        var c = r.renderedPosition, v = o.pan(), d = o.zoom();
        r.position = To(c, d, v);
      }
      if (u && r.panBy != null) {
        var g = r.panBy, y = o.pan();
        r.pan = {
          x: y.x + g.x,
          y: y.y + g.y
        };
      }
      var p = r.center || r.centre;
      if (u && p != null) {
        var E = o.getCenterPan(p.eles, r.zoom);
        E != null && (r.pan = E);
      }
      if (u && r.fit != null) {
        var m = r.fit, T = o.getFitViewport(m.eles || m.boundingBox, m.padding);
        T != null && (r.pan = T.pan, r.zoom = T.zoom);
      }
      if (u && Te(r.zoom)) {
        var C = o.getZoomedViewport(r.zoom);
        C != null ? (C.zoomed && (r.zoom = C.zoom), C.panned && (r.pan = C.pan)) : r.zoom = null;
      }
      return new Vn(s[0], r);
    };
  },
  // animate
  animate: function() {
    return function(r, a) {
      var n = this, i = n.length !== void 0, s = i ? n : [n], o = this._private.cy || this;
      if (!o.styleEnabled())
        return this;
      a && (r = ce({}, r, a));
      for (var u = 0; u < s.length; u++) {
        var l = s[u], f = l.animated() && (r.queue === void 0 || r.queue), h = l.animation(r, f ? {
          queue: !0
        } : void 0);
        h.play();
      }
      return this;
    };
  },
  // animate
  stop: function() {
    return function(r, a) {
      var n = this, i = n.length !== void 0, s = i ? n : [n], o = this._private.cy || this;
      if (!o.styleEnabled())
        return this;
      for (var u = 0; u < s.length; u++) {
        for (var l = s[u], f = l._private, h = f.animation.current, c = 0; c < h.length; c++) {
          var v = h[c], d = v._private;
          a && (d.duration = 0);
        }
        r && (f.animation.queue = []), a || (f.animation.current = []);
      }
      return o.notify("draw"), this;
    };
  }
  // stop
}, op = {
  // access data field
  data: function(e) {
    var r = {
      field: "data",
      bindingEvent: "data",
      allowBinding: !1,
      allowSetting: !1,
      allowGetting: !1,
      settingEvent: "data",
      settingTriggersEvent: !1,
      triggerFnName: "trigger",
      immutableKeys: {},
      // key => true if immutable
      updateStyle: !1,
      beforeGet: function(n) {
      },
      beforeSet: function(n, i) {
      },
      onSet: function(n) {
      },
      canSet: function(n) {
        return !0;
      }
    };
    return e = ce({}, r, e), function(n, i) {
      var s = e, o = this, u = o.length !== void 0, l = u ? o : [o], f = u ? o[0] : o;
      if (le(n)) {
        var h = n.indexOf(".") !== -1, c = h && Xc(n);
        if (s.allowGetting && i === void 0) {
          var v;
          return f && (s.beforeGet(f), c && f._private[s.field][n] === void 0 ? v = hc(f._private[s.field], c) : v = f._private[s.field][n]), v;
        } else if (s.allowSetting && i !== void 0) {
          var d = !s.immutableKeys[n];
          if (d) {
            var g = so({}, n, i);
            s.beforeSet(o, g);
            for (var y = 0, p = l.length; y < p; y++) {
              var E = l[y];
              s.canSet(E) && (c && f._private[s.field][n] === void 0 ? Pc(E._private[s.field], c, i) : E._private[s.field][n] = i);
            }
            s.updateStyle && o.updateStyle(), s.onSet(o), s.settingTriggersEvent && o[s.triggerFnName](s.settingEvent);
          }
        }
      } else if (s.allowSetting && Te(n)) {
        var m = n, T, C, S = Object.keys(m);
        s.beforeSet(o, m);
        for (var b = 0; b < S.length; b++) {
          T = S[b], C = m[T];
          var x = !s.immutableKeys[T];
          if (x)
            for (var w = 0; w < l.length; w++) {
              var D = l[w];
              s.canSet(D) && (D._private[s.field][T] = C);
            }
        }
        s.updateStyle && o.updateStyle(), s.onSet(o), s.settingTriggersEvent && o[s.triggerFnName](s.settingEvent);
      } else if (s.allowBinding && Fe(n)) {
        var A = n;
        o.on(s.bindingEvent, A);
      } else if (s.allowGetting && n === void 0) {
        var L;
        return f && (s.beforeGet(f), L = f._private[s.field]), L;
      }
      return o;
    };
  },
  // data
  // remove data field
  removeData: function(e) {
    var r = {
      field: "data",
      event: "data",
      triggerFnName: "trigger",
      triggerEvent: !1,
      immutableKeys: {}
      // key => true if immutable
    };
    return e = ce({}, r, e), function(n) {
      var i = e, s = this, o = s.length !== void 0, u = o ? s : [s];
      if (le(n)) {
        for (var l = n.split(/\s+/), f = l.length, h = 0; h < f; h++) {
          var c = l[h];
          if (!Yt(c)) {
            var v = !i.immutableKeys[c];
            if (v)
              for (var d = 0, g = u.length; d < g; d++)
                u[d]._private[i.field][c] = void 0;
          }
        }
        i.triggerEvent && s[i.triggerFnName](i.event);
      } else if (n === void 0) {
        for (var y = 0, p = u.length; y < p; y++)
          for (var E = u[y]._private[i.field], m = Object.keys(E), T = 0; T < m.length; T++) {
            var C = m[T], S = !i.immutableKeys[C];
            S && (E[C] = void 0);
          }
        i.triggerEvent && s[i.triggerFnName](i.event);
      }
      return s;
    };
  }
  // removeData
}, up = {
  eventAliasesOn: function(e) {
    var r = e;
    r.addListener = r.listen = r.bind = r.on, r.unlisten = r.unbind = r.off = r.removeListener, r.trigger = r.emit, r.pon = r.promiseOn = function(a, n) {
      var i = this, s = Array.prototype.slice.call(arguments, 0);
      return new Rr(function(o, u) {
        var l = function(v) {
          i.off.apply(i, h), o(v);
        }, f = s.concat([l]), h = f.concat([]);
        i.on.apply(i, f);
      });
    };
  }
}, Le = {};
[sp, op, up].forEach(function(t) {
  ce(Le, t);
});
var lp = {
  animate: Le.animate(),
  animation: Le.animation(),
  animated: Le.animated(),
  clearQueue: Le.clearQueue(),
  delay: Le.delay(),
  delayAnimation: Le.delayAnimation(),
  stop: Le.stop()
}, Fa = {
  classes: function(e) {
    var r = this;
    if (e === void 0) {
      var a = [];
      return r[0]._private.classes.forEach(function(d) {
        return a.push(d);
      }), a;
    } else
      Ie(e) || (e = (e || "").match(/\S+/g) || []);
    for (var n = [], i = new Ir(e), s = 0; s < r.length; s++) {
      for (var o = r[s], u = o._private, l = u.classes, f = !1, h = 0; h < e.length; h++) {
        var c = e[h], v = l.has(c);
        if (!v) {
          f = !0;
          break;
        }
      }
      f || (f = l.size !== e.length), f && (u.classes = i, n.push(o));
    }
    return n.length > 0 && this.spawn(n).updateStyle().emit("class"), r;
  },
  addClass: function(e) {
    return this.toggleClass(e, !0);
  },
  hasClass: function(e) {
    var r = this[0];
    return r != null && r._private.classes.has(e);
  },
  toggleClass: function(e, r) {
    Ie(e) || (e = e.match(/\S+/g) || []);
    for (var a = this, n = r === void 0, i = [], s = 0, o = a.length; s < o; s++)
      for (var u = a[s], l = u._private.classes, f = !1, h = 0; h < e.length; h++) {
        var c = e[h], v = l.has(c), d = !1;
        r || n && !v ? (l.add(c), d = !0) : (!r || n && v) && (l.delete(c), d = !0), !f && d && (i.push(u), f = !0);
      }
    return i.length > 0 && this.spawn(i).updateStyle().emit("class"), a;
  },
  removeClass: function(e) {
    return this.toggleClass(e, !1);
  },
  flashClass: function(e, r) {
    var a = this;
    if (r == null)
      r = 250;
    else if (r === 0)
      return a;
    return a.addClass(e), setTimeout(function() {
      a.removeClass(e);
    }, r), a;
  }
};
Fa.className = Fa.classNames = Fa.classes;
var xe = {
  metaChar: "[\\!\\\"\\#\\$\\%\\&\\'\\(\\)\\*\\+\\,\\.\\/\\:\\;\\<\\=\\>\\?\\@\\[\\]\\^\\`\\{\\|\\}\\~]",
  // chars we need to escape in let names, etc
  comparatorOp: "=|\\!=|>|>=|<|<=|\\$=|\\^=|\\*=",
  // binary comparison op (used in data selectors)
  boolOp: "\\?|\\!|\\^",
  // boolean (unary) operators (used in data selectors)
  string: `"(?:\\\\"|[^"])*"|'(?:\\\\'|[^'])*'`,
  // string literals (used in data selectors) -- doublequotes | singlequotes
  number: Ve,
  // number literal (used in data selectors) --- e.g. 0.1234, 1234, 12e123
  meta: "degree|indegree|outdegree",
  // allowed metadata fields (i.e. allowed functions to use from Collection)
  separator: "\\s*,\\s*",
  // queries are separated by commas, e.g. edge[foo = 'bar'], node.someClass
  descendant: "\\s+",
  child: "\\s+>\\s+",
  subject: "\\$",
  group: "node|edge|\\*",
  directedEdge: "\\s+->\\s+",
  undirectedEdge: "\\s+<->\\s+"
};
xe.variable = "(?:[\\w-.]|(?:\\\\" + xe.metaChar + "))+";
xe.className = "(?:[\\w-]|(?:\\\\" + xe.metaChar + "))+";
xe.value = xe.string + "|" + xe.number;
xe.id = xe.variable;
(function() {
  var t, e, r;
  for (t = xe.comparatorOp.split("|"), r = 0; r < t.length; r++)
    e = t[r], xe.comparatorOp += "|@" + e;
  for (t = xe.comparatorOp.split("|"), r = 0; r < t.length; r++)
    e = t[r], !(e.indexOf("!") >= 0) && e !== "=" && (xe.comparatorOp += "|\\!" + e);
})();
var Ne = function() {
  return {
    checks: []
  };
}, ie = {
  /** E.g. node */
  GROUP: 0,
  /** A collection of elements */
  COLLECTION: 1,
  /** A filter(ele) function */
  FILTER: 2,
  /** E.g. [foo > 1] */
  DATA_COMPARE: 3,
  /** E.g. [foo] */
  DATA_EXIST: 4,
  /** E.g. [?foo] */
  DATA_BOOL: 5,
  /** E.g. [[degree > 2]] */
  META_COMPARE: 6,
  /** E.g. :selected */
  STATE: 7,
  /** E.g. #foo */
  ID: 8,
  /** E.g. .foo */
  CLASS: 9,
  /** E.g. #foo <-> #bar */
  UNDIRECTED_EDGE: 10,
  /** E.g. #foo -> #bar */
  DIRECTED_EDGE: 11,
  /** E.g. $#foo -> #bar */
  NODE_SOURCE: 12,
  /** E.g. #foo -> $#bar */
  NODE_TARGET: 13,
  /** E.g. $#foo <-> #bar */
  NODE_NEIGHBOR: 14,
  /** E.g. #foo > #bar */
  CHILD: 15,
  /** E.g. #foo #bar */
  DESCENDANT: 16,
  /** E.g. $#foo > #bar */
  PARENT: 17,
  /** E.g. $#foo #bar */
  ANCESTOR: 18,
  /** E.g. #foo > $bar > #baz */
  COMPOUND_SPLIT: 19,
  /** Always matches, useful placeholder for subject in `COMPOUND_SPLIT` */
  TRUE: 20
}, _n = [{
  selector: ":selected",
  matches: function(e) {
    return e.selected();
  }
}, {
  selector: ":unselected",
  matches: function(e) {
    return !e.selected();
  }
}, {
  selector: ":selectable",
  matches: function(e) {
    return e.selectable();
  }
}, {
  selector: ":unselectable",
  matches: function(e) {
    return !e.selectable();
  }
}, {
  selector: ":locked",
  matches: function(e) {
    return e.locked();
  }
}, {
  selector: ":unlocked",
  matches: function(e) {
    return !e.locked();
  }
}, {
  selector: ":visible",
  matches: function(e) {
    return e.visible();
  }
}, {
  selector: ":hidden",
  matches: function(e) {
    return !e.visible();
  }
}, {
  selector: ":transparent",
  matches: function(e) {
    return e.transparent();
  }
}, {
  selector: ":grabbed",
  matches: function(e) {
    return e.grabbed();
  }
}, {
  selector: ":free",
  matches: function(e) {
    return !e.grabbed();
  }
}, {
  selector: ":removed",
  matches: function(e) {
    return e.removed();
  }
}, {
  selector: ":inside",
  matches: function(e) {
    return !e.removed();
  }
}, {
  selector: ":grabbable",
  matches: function(e) {
    return e.grabbable();
  }
}, {
  selector: ":ungrabbable",
  matches: function(e) {
    return !e.grabbable();
  }
}, {
  selector: ":animated",
  matches: function(e) {
    return e.animated();
  }
}, {
  selector: ":unanimated",
  matches: function(e) {
    return !e.animated();
  }
}, {
  selector: ":parent",
  matches: function(e) {
    return e.isParent();
  }
}, {
  selector: ":childless",
  matches: function(e) {
    return e.isChildless();
  }
}, {
  selector: ":child",
  matches: function(e) {
    return e.isChild();
  }
}, {
  selector: ":orphan",
  matches: function(e) {
    return e.isOrphan();
  }
}, {
  selector: ":nonorphan",
  matches: function(e) {
    return e.isChild();
  }
}, {
  selector: ":compound",
  matches: function(e) {
    return e.isNode() ? e.isParent() : e.source().isParent() || e.target().isParent();
  }
}, {
  selector: ":loop",
  matches: function(e) {
    return e.isLoop();
  }
}, {
  selector: ":simple",
  matches: function(e) {
    return e.isSimple();
  }
}, {
  selector: ":active",
  matches: function(e) {
    return e.active();
  }
}, {
  selector: ":inactive",
  matches: function(e) {
    return !e.active();
  }
}, {
  selector: ":backgrounding",
  matches: function(e) {
    return e.backgrounding();
  }
}, {
  selector: ":nonbackgrounding",
  matches: function(e) {
    return !e.backgrounding();
  }
}].sort(function(t, e) {
  return cd(t.selector, e.selector);
}), fp = function() {
  for (var t = {}, e, r = 0; r < _n.length; r++)
    e = _n[r], t[e.selector] = e.matches;
  return t;
}(), hp = function(e, r) {
  return fp[e](r);
}, vp = "(" + _n.map(function(t) {
  return t.selector;
}).join("|") + ")", dr = function(e) {
  return e.replace(new RegExp("\\\\(" + xe.metaChar + ")", "g"), function(r, a) {
    return a;
  });
}, Gt = function(e, r, a) {
  e[e.length - 1] = a;
}, Un = [{
  name: "group",
  // just used for identifying when debugging
  query: !0,
  regex: "(" + xe.group + ")",
  populate: function(e, r, a) {
    var n = Nt(a, 1), i = n[0];
    r.checks.push({
      type: ie.GROUP,
      value: i === "*" ? i : i + "s"
    });
  }
}, {
  name: "state",
  query: !0,
  regex: vp,
  populate: function(e, r, a) {
    var n = Nt(a, 1), i = n[0];
    r.checks.push({
      type: ie.STATE,
      value: i
    });
  }
}, {
  name: "id",
  query: !0,
  regex: "\\#(" + xe.id + ")",
  populate: function(e, r, a) {
    var n = Nt(a, 1), i = n[0];
    r.checks.push({
      type: ie.ID,
      value: dr(i)
    });
  }
}, {
  name: "className",
  query: !0,
  regex: "\\.(" + xe.className + ")",
  populate: function(e, r, a) {
    var n = Nt(a, 1), i = n[0];
    r.checks.push({
      type: ie.CLASS,
      value: dr(i)
    });
  }
}, {
  name: "dataExists",
  query: !0,
  regex: "\\[\\s*(" + xe.variable + ")\\s*\\]",
  populate: function(e, r, a) {
    var n = Nt(a, 1), i = n[0];
    r.checks.push({
      type: ie.DATA_EXIST,
      field: dr(i)
    });
  }
}, {
  name: "dataCompare",
  query: !0,
  regex: "\\[\\s*(" + xe.variable + ")\\s*(" + xe.comparatorOp + ")\\s*(" + xe.value + ")\\s*\\]",
  populate: function(e, r, a) {
    var n = Nt(a, 3), i = n[0], s = n[1], o = n[2], u = new RegExp("^" + xe.string + "$").exec(o) != null;
    u ? o = o.substring(1, o.length - 1) : o = parseFloat(o), r.checks.push({
      type: ie.DATA_COMPARE,
      field: dr(i),
      operator: s,
      value: o
    });
  }
}, {
  name: "dataBool",
  query: !0,
  regex: "\\[\\s*(" + xe.boolOp + ")\\s*(" + xe.variable + ")\\s*\\]",
  populate: function(e, r, a) {
    var n = Nt(a, 2), i = n[0], s = n[1];
    r.checks.push({
      type: ie.DATA_BOOL,
      field: dr(s),
      operator: i
    });
  }
}, {
  name: "metaCompare",
  query: !0,
  regex: "\\[\\[\\s*(" + xe.meta + ")\\s*(" + xe.comparatorOp + ")\\s*(" + xe.number + ")\\s*\\]\\]",
  populate: function(e, r, a) {
    var n = Nt(a, 3), i = n[0], s = n[1], o = n[2];
    r.checks.push({
      type: ie.META_COMPARE,
      field: dr(i),
      operator: s,
      value: parseFloat(o)
    });
  }
}, {
  name: "nextQuery",
  separator: !0,
  regex: xe.separator,
  populate: function(e, r) {
    var a = e.currentSubject, n = e.edgeCount, i = e.compoundCount, s = e[e.length - 1];
    a != null && (s.subject = a, e.currentSubject = null), s.edgeCount = n, s.compoundCount = i, e.edgeCount = 0, e.compoundCount = 0;
    var o = e[e.length++] = Ne();
    return o;
  }
}, {
  name: "directedEdge",
  separator: !0,
  regex: xe.directedEdge,
  populate: function(e, r) {
    if (e.currentSubject == null) {
      var a = Ne(), n = r, i = Ne();
      return a.checks.push({
        type: ie.DIRECTED_EDGE,
        source: n,
        target: i
      }), Gt(e, r, a), e.edgeCount++, i;
    } else {
      var s = Ne(), o = r, u = Ne();
      return s.checks.push({
        type: ie.NODE_SOURCE,
        source: o,
        target: u
      }), Gt(e, r, s), e.edgeCount++, u;
    }
  }
}, {
  name: "undirectedEdge",
  separator: !0,
  regex: xe.undirectedEdge,
  populate: function(e, r) {
    if (e.currentSubject == null) {
      var a = Ne(), n = r, i = Ne();
      return a.checks.push({
        type: ie.UNDIRECTED_EDGE,
        nodes: [n, i]
      }), Gt(e, r, a), e.edgeCount++, i;
    } else {
      var s = Ne(), o = r, u = Ne();
      return s.checks.push({
        type: ie.NODE_NEIGHBOR,
        node: o,
        neighbor: u
      }), Gt(e, r, s), u;
    }
  }
}, {
  name: "child",
  separator: !0,
  regex: xe.child,
  populate: function(e, r) {
    if (e.currentSubject == null) {
      var a = Ne(), n = Ne(), i = e[e.length - 1];
      return a.checks.push({
        type: ie.CHILD,
        parent: i,
        child: n
      }), Gt(e, r, a), e.compoundCount++, n;
    } else if (e.currentSubject === r) {
      var s = Ne(), o = e[e.length - 1], u = Ne(), l = Ne(), f = Ne(), h = Ne();
      return s.checks.push({
        type: ie.COMPOUND_SPLIT,
        left: o,
        right: u,
        subject: l
      }), l.checks = r.checks, r.checks = [{
        type: ie.TRUE
      }], h.checks.push({
        type: ie.TRUE
      }), u.checks.push({
        type: ie.PARENT,
        // type is swapped on right side queries
        parent: h,
        child: f
        // empty for now
      }), Gt(e, o, s), e.currentSubject = l, e.compoundCount++, f;
    } else {
      var c = Ne(), v = Ne(), d = [{
        type: ie.PARENT,
        parent: c,
        child: v
      }];
      return c.checks = r.checks, r.checks = d, e.compoundCount++, v;
    }
  }
}, {
  name: "descendant",
  separator: !0,
  regex: xe.descendant,
  populate: function(e, r) {
    if (e.currentSubject == null) {
      var a = Ne(), n = Ne(), i = e[e.length - 1];
      return a.checks.push({
        type: ie.DESCENDANT,
        ancestor: i,
        descendant: n
      }), Gt(e, r, a), e.compoundCount++, n;
    } else if (e.currentSubject === r) {
      var s = Ne(), o = e[e.length - 1], u = Ne(), l = Ne(), f = Ne(), h = Ne();
      return s.checks.push({
        type: ie.COMPOUND_SPLIT,
        left: o,
        right: u,
        subject: l
      }), l.checks = r.checks, r.checks = [{
        type: ie.TRUE
      }], h.checks.push({
        type: ie.TRUE
      }), u.checks.push({
        type: ie.ANCESTOR,
        // type is swapped on right side queries
        ancestor: h,
        descendant: f
        // empty for now
      }), Gt(e, o, s), e.currentSubject = l, e.compoundCount++, f;
    } else {
      var c = Ne(), v = Ne(), d = [{
        type: ie.ANCESTOR,
        ancestor: c,
        descendant: v
      }];
      return c.checks = r.checks, r.checks = d, e.compoundCount++, v;
    }
  }
}, {
  name: "subject",
  modifier: !0,
  regex: xe.subject,
  populate: function(e, r) {
    if (e.currentSubject != null && e.currentSubject !== r)
      return Ae("Redefinition of subject in selector `" + e.toString() + "`"), !1;
    e.currentSubject = r;
    var a = e[e.length - 1], n = a.checks[0], i = n == null ? null : n.type;
    i === ie.DIRECTED_EDGE ? n.type = ie.NODE_TARGET : i === ie.UNDIRECTED_EDGE && (n.type = ie.NODE_NEIGHBOR, n.node = n.nodes[1], n.neighbor = n.nodes[0], n.nodes = null);
  }
}];
Un.forEach(function(t) {
  return t.regexObj = new RegExp("^" + t.regex);
});
var cp = function(e) {
  for (var r, a, n, i = 0; i < Un.length; i++) {
    var s = Un[i], o = s.name, u = e.match(s.regexObj);
    if (u != null) {
      a = u, r = s, n = o;
      var l = u[0];
      e = e.substring(l.length);
      break;
    }
  }
  return {
    expr: r,
    match: a,
    name: n,
    remaining: e
  };
}, dp = function(e) {
  var r = e.match(/^\s+/);
  if (r) {
    var a = r[0];
    e = e.substring(a.length);
  }
  return e;
}, gp = function(e) {
  var r = this, a = r.inputText = e, n = r[0] = Ne();
  for (r.length = 1, a = dp(a); ; ) {
    var i = cp(a);
    if (i.expr == null)
      return Ae("The selector `" + e + "`is invalid"), !1;
    var s = i.match.slice(1), o = i.expr.populate(r, n, s);
    if (o === !1)
      return !1;
    if (o != null && (n = o), a = i.remaining, a.match(/^\s*$/))
      break;
  }
  var u = r[r.length - 1];
  r.currentSubject != null && (u.subject = r.currentSubject), u.edgeCount = r.edgeCount, u.compoundCount = r.compoundCount;
  for (var l = 0; l < r.length; l++) {
    var f = r[l];
    if (f.compoundCount > 0 && f.edgeCount > 0)
      return Ae("The selector `" + e + "` is invalid because it uses both a compound selector and an edge selector"), !1;
    if (f.edgeCount > 1)
      return Ae("The selector `" + e + "` is invalid because it uses multiple edge selectors"), !1;
    f.edgeCount === 1 && Ae("The selector `" + e + "` is deprecated.  Edge selectors do not take effect on changes to source and target nodes after an edge is added, for performance reasons.  Use a class or data selector on edges instead, updating the class or data of an edge when your app detects a change in source or target nodes.");
  }
  return !0;
}, pp = function() {
  if (this.toStringCache != null)
    return this.toStringCache;
  for (var e = function(f) {
    return f ?? "";
  }, r = function(f) {
    return le(f) ? '"' + f + '"' : e(f);
  }, a = function(f) {
    return " " + f + " ";
  }, n = function(f, h) {
    var c = f.type, v = f.value;
    switch (c) {
      case ie.GROUP: {
        var d = e(v);
        return d.substring(0, d.length - 1);
      }
      case ie.DATA_COMPARE: {
        var g = f.field, y = f.operator;
        return "[" + g + a(e(y)) + r(v) + "]";
      }
      case ie.DATA_BOOL: {
        var p = f.operator, E = f.field;
        return "[" + e(p) + E + "]";
      }
      case ie.DATA_EXIST: {
        var m = f.field;
        return "[" + m + "]";
      }
      case ie.META_COMPARE: {
        var T = f.operator, C = f.field;
        return "[[" + C + a(e(T)) + r(v) + "]]";
      }
      case ie.STATE:
        return v;
      case ie.ID:
        return "#" + v;
      case ie.CLASS:
        return "." + v;
      case ie.PARENT:
      case ie.CHILD:
        return i(f.parent, h) + a(">") + i(f.child, h);
      case ie.ANCESTOR:
      case ie.DESCENDANT:
        return i(f.ancestor, h) + " " + i(f.descendant, h);
      case ie.COMPOUND_SPLIT: {
        var S = i(f.left, h), b = i(f.subject, h), x = i(f.right, h);
        return S + (S.length > 0 ? " " : "") + b + x;
      }
      case ie.TRUE:
        return "";
    }
  }, i = function(f, h) {
    return f.checks.reduce(function(c, v, d) {
      return c + (h === f && d === 0 ? "$" : "") + n(v, h);
    }, "");
  }, s = "", o = 0; o < this.length; o++) {
    var u = this[o];
    s += i(u, u.subject), this.length > 1 && o < this.length - 1 && (s += ", ");
  }
  return this.toStringCache = s, s;
}, yp = {
  parse: gp,
  toString: pp
}, $o = function(e, r, a) {
  var n, i = le(e), s = ae(e), o = le(a), u, l, f = !1, h = !1, c = !1;
  switch (r.indexOf("!") >= 0 && (r = r.replace("!", ""), h = !0), r.indexOf("@") >= 0 && (r = r.replace("@", ""), f = !0), (i || o || f) && (u = !i && !s ? "" : "" + e, l = "" + a), f && (e = u = u.toLowerCase(), a = l = l.toLowerCase()), r) {
    case "*=":
      n = u.indexOf(l) >= 0;
      break;
    case "$=":
      n = u.indexOf(l, u.length - l.length) >= 0;
      break;
    case "^=":
      n = u.indexOf(l) === 0;
      break;
    case "=":
      n = e === a;
      break;
    case ">":
      c = !0, n = e > a;
      break;
    case ">=":
      c = !0, n = e >= a;
      break;
    case "<":
      c = !0, n = e < a;
      break;
    case "<=":
      c = !0, n = e <= a;
      break;
    default:
      n = !1;
      break;
  }
  return h && (e != null || !c) && (n = !n), n;
}, mp = function(e, r) {
  switch (r) {
    case "?":
      return !!e;
    case "!":
      return !e;
    case "^":
      return e === void 0;
  }
}, bp = function(e) {
  return e !== void 0;
}, di = function(e, r) {
  return e.data(r);
}, Ep = function(e, r) {
  return e[r]();
}, $e = [], Pe = function(e, r) {
  return e.checks.every(function(a) {
    return $e[a.type](a, r);
  });
};
$e[ie.GROUP] = function(t, e) {
  var r = t.value;
  return r === "*" || r === e.group();
};
$e[ie.STATE] = function(t, e) {
  var r = t.value;
  return hp(r, e);
};
$e[ie.ID] = function(t, e) {
  var r = t.value;
  return e.id() === r;
};
$e[ie.CLASS] = function(t, e) {
  var r = t.value;
  return e.hasClass(r);
};
$e[ie.META_COMPARE] = function(t, e) {
  var r = t.field, a = t.operator, n = t.value;
  return $o(Ep(e, r), a, n);
};
$e[ie.DATA_COMPARE] = function(t, e) {
  var r = t.field, a = t.operator, n = t.value;
  return $o(di(e, r), a, n);
};
$e[ie.DATA_BOOL] = function(t, e) {
  var r = t.field, a = t.operator;
  return mp(di(e, r), a);
};
$e[ie.DATA_EXIST] = function(t, e) {
  var r = t.field;
  return t.operator, bp(di(e, r));
};
$e[ie.UNDIRECTED_EDGE] = function(t, e) {
  var r = t.nodes[0], a = t.nodes[1], n = e.source(), i = e.target();
  return Pe(r, n) && Pe(a, i) || Pe(a, n) && Pe(r, i);
};
$e[ie.NODE_NEIGHBOR] = function(t, e) {
  return Pe(t.node, e) && e.neighborhood().some(function(r) {
    return r.isNode() && Pe(t.neighbor, r);
  });
};
$e[ie.DIRECTED_EDGE] = function(t, e) {
  return Pe(t.source, e.source()) && Pe(t.target, e.target());
};
$e[ie.NODE_SOURCE] = function(t, e) {
  return Pe(t.source, e) && e.outgoers().some(function(r) {
    return r.isNode() && Pe(t.target, r);
  });
};
$e[ie.NODE_TARGET] = function(t, e) {
  return Pe(t.target, e) && e.incomers().some(function(r) {
    return r.isNode() && Pe(t.source, r);
  });
};
$e[ie.CHILD] = function(t, e) {
  return Pe(t.child, e) && Pe(t.parent, e.parent());
};
$e[ie.PARENT] = function(t, e) {
  return Pe(t.parent, e) && e.children().some(function(r) {
    return Pe(t.child, r);
  });
};
$e[ie.DESCENDANT] = function(t, e) {
  return Pe(t.descendant, e) && e.ancestors().some(function(r) {
    return Pe(t.ancestor, r);
  });
};
$e[ie.ANCESTOR] = function(t, e) {
  return Pe(t.ancestor, e) && e.descendants().some(function(r) {
    return Pe(t.descendant, r);
  });
};
$e[ie.COMPOUND_SPLIT] = function(t, e) {
  return Pe(t.subject, e) && Pe(t.left, e) && Pe(t.right, e);
};
$e[ie.TRUE] = function() {
  return !0;
};
$e[ie.COLLECTION] = function(t, e) {
  var r = t.value;
  return r.has(e);
};
$e[ie.FILTER] = function(t, e) {
  var r = t.value;
  return r(e);
};
var wp = function(e) {
  var r = this;
  if (r.length === 1 && r[0].checks.length === 1 && r[0].checks[0].type === ie.ID)
    return e.getElementById(r[0].checks[0].value).collection();
  var a = function(i) {
    for (var s = 0; s < r.length; s++) {
      var o = r[s];
      if (Pe(o, i))
        return !0;
    }
    return !1;
  };
  return r.text() == null && (a = function() {
    return !0;
  }), e.filter(a);
}, xp = function(e) {
  for (var r = this, a = 0; a < r.length; a++) {
    var n = r[a];
    if (Pe(n, e))
      return !0;
  }
  return !1;
}, Tp = {
  matches: xp,
  filter: wp
}, Xt = function(e) {
  this.inputText = e, this.currentSubject = null, this.compoundCount = 0, this.edgeCount = 0, this.length = 0, e == null || le(e) && e.match(/^\s*$/) || (ft(e) ? this.addQuery({
    checks: [{
      type: ie.COLLECTION,
      value: e.collection()
    }]
  }) : Fe(e) ? this.addQuery({
    checks: [{
      type: ie.FILTER,
      value: e
    }]
  }) : le(e) ? this.parse(e) || (this.invalid = !0) : ze("A selector must be created from a string; found "));
}, qt = Xt.prototype;
[yp, Tp].forEach(function(t) {
  return ce(qt, t);
});
qt.text = function() {
  return this.inputText;
};
qt.size = function() {
  return this.length;
};
qt.eq = function(t) {
  return this[t];
};
qt.sameText = function(t) {
  return !this.invalid && !t.invalid && this.text() === t.text();
};
qt.addQuery = function(t) {
  this[this.length++] = t;
};
qt.selector = qt.toString;
var _t = {
  allAre: function(e) {
    var r = new Xt(e);
    return this.every(function(a) {
      return r.matches(a);
    });
  },
  is: function(e) {
    var r = new Xt(e);
    return this.some(function(a) {
      return r.matches(a);
    });
  },
  some: function(e, r) {
    for (var a = 0; a < this.length; a++) {
      var n = r ? e.apply(r, [this[a], a, this]) : e(this[a], a, this);
      if (n)
        return !0;
    }
    return !1;
  },
  every: function(e, r) {
    for (var a = 0; a < this.length; a++) {
      var n = r ? e.apply(r, [this[a], a, this]) : e(this[a], a, this);
      if (!n)
        return !1;
    }
    return !0;
  },
  same: function(e) {
    if (this === e)
      return !0;
    e = this.cy().collection(e);
    var r = this.length, a = e.length;
    return r !== a ? !1 : r === 1 ? this[0] === e[0] : this.every(function(n) {
      return e.hasElementWithId(n.id());
    });
  },
  anySame: function(e) {
    return e = this.cy().collection(e), this.some(function(r) {
      return e.hasElementWithId(r.id());
    });
  },
  allAreNeighbors: function(e) {
    e = this.cy().collection(e);
    var r = this.neighborhood();
    return e.every(function(a) {
      return r.hasElementWithId(a.id());
    });
  },
  contains: function(e) {
    e = this.cy().collection(e);
    var r = this;
    return e.every(function(a) {
      return r.hasElementWithId(a.id());
    });
  }
};
_t.allAreNeighbours = _t.allAreNeighbors;
_t.has = _t.contains;
_t.equal = _t.equals = _t.same;
var dt = function(e, r) {
  return function(n, i, s, o) {
    var u = n, l = this, f;
    if (u == null ? f = "" : ft(u) && u.length === 1 && (f = u.id()), l.length === 1 && f) {
      var h = l[0]._private, c = h.traversalCache = h.traversalCache || {}, v = c[r] = c[r] || [], d = ar(f), g = v[d];
      return g || (v[d] = e.call(l, n, i, s, o));
    } else
      return e.call(l, n, i, s, o);
  };
}, Ar = {
  parent: function(e) {
    var r = [];
    if (this.length === 1) {
      var a = this[0]._private.parent;
      if (a)
        return a;
    }
    for (var n = 0; n < this.length; n++) {
      var i = this[n], s = i._private.parent;
      s && r.push(s);
    }
    return this.spawn(r, !0).filter(e);
  },
  parents: function(e) {
    for (var r = [], a = this.parent(); a.nonempty(); ) {
      for (var n = 0; n < a.length; n++) {
        var i = a[n];
        r.push(i);
      }
      a = a.parent();
    }
    return this.spawn(r, !0).filter(e);
  },
  commonAncestors: function(e) {
    for (var r, a = 0; a < this.length; a++) {
      var n = this[a], i = n.parents();
      r = r || i, r = r.intersect(i);
    }
    return r.filter(e);
  },
  orphans: function(e) {
    return this.stdFilter(function(r) {
      return r.isOrphan();
    }).filter(e);
  },
  nonorphans: function(e) {
    return this.stdFilter(function(r) {
      return r.isChild();
    }).filter(e);
  },
  children: dt(function(t) {
    for (var e = [], r = 0; r < this.length; r++)
      for (var a = this[r], n = a._private.children, i = 0; i < n.length; i++)
        e.push(n[i]);
    return this.spawn(e, !0).filter(t);
  }, "children"),
  siblings: function(e) {
    return this.parent().children().not(this).filter(e);
  },
  isParent: function() {
    var e = this[0];
    if (e)
      return e.isNode() && e._private.children.length !== 0;
  },
  isChildless: function() {
    var e = this[0];
    if (e)
      return e.isNode() && e._private.children.length === 0;
  },
  isChild: function() {
    var e = this[0];
    if (e)
      return e.isNode() && e._private.parent != null;
  },
  isOrphan: function() {
    var e = this[0];
    if (e)
      return e.isNode() && e._private.parent == null;
  },
  descendants: function(e) {
    var r = [];
    function a(n) {
      for (var i = 0; i < n.length; i++) {
        var s = n[i];
        r.push(s), s.children().nonempty() && a(s.children());
      }
    }
    return a(this.children()), this.spawn(r, !0).filter(e);
  }
};
function gi(t, e, r, a) {
  for (var n = [], i = new Ir(), s = t.cy(), o = s.hasCompoundNodes(), u = 0; u < t.length; u++) {
    var l = t[u];
    r ? n.push(l) : o && a(n, i, l);
  }
  for (; n.length > 0; ) {
    var f = n.shift();
    e(f), i.add(f.id()), o && a(n, i, f);
  }
  return t;
}
function Vo(t, e, r) {
  if (r.isParent())
    for (var a = r._private.children, n = 0; n < a.length; n++) {
      var i = a[n];
      e.has(i.id()) || t.push(i);
    }
}
Ar.forEachDown = function(t) {
  var e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0;
  return gi(this, t, e, Vo);
};
function _o(t, e, r) {
  if (r.isChild()) {
    var a = r._private.parent;
    e.has(a.id()) || t.push(a);
  }
}
Ar.forEachUp = function(t) {
  var e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0;
  return gi(this, t, e, _o);
};
function Cp(t, e, r) {
  _o(t, e, r), Vo(t, e, r);
}
Ar.forEachUpAndDown = function(t) {
  var e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0;
  return gi(this, t, e, Cp);
};
Ar.ancestors = Ar.parents;
var oa, Uo;
oa = Uo = {
  data: Le.data({
    field: "data",
    bindingEvent: "data",
    allowBinding: !0,
    allowSetting: !0,
    settingEvent: "data",
    settingTriggersEvent: !0,
    triggerFnName: "trigger",
    allowGetting: !0,
    immutableKeys: {
      id: !0,
      source: !0,
      target: !0,
      parent: !0
    },
    updateStyle: !0
  }),
  removeData: Le.removeData({
    field: "data",
    event: "data",
    triggerFnName: "trigger",
    triggerEvent: !0,
    immutableKeys: {
      id: !0,
      source: !0,
      target: !0,
      parent: !0
    },
    updateStyle: !0
  }),
  scratch: Le.data({
    field: "scratch",
    bindingEvent: "scratch",
    allowBinding: !0,
    allowSetting: !0,
    settingEvent: "scratch",
    settingTriggersEvent: !0,
    triggerFnName: "trigger",
    allowGetting: !0,
    updateStyle: !0
  }),
  removeScratch: Le.removeData({
    field: "scratch",
    event: "scratch",
    triggerFnName: "trigger",
    triggerEvent: !0,
    updateStyle: !0
  }),
  rscratch: Le.data({
    field: "rscratch",
    allowBinding: !1,
    allowSetting: !0,
    settingTriggersEvent: !1,
    allowGetting: !0
  }),
  removeRscratch: Le.removeData({
    field: "rscratch",
    triggerEvent: !1
  }),
  id: function() {
    var e = this[0];
    if (e)
      return e._private.data.id;
  }
};
oa.attr = oa.data;
oa.removeAttr = oa.removeData;
var Dp = Uo, hn = {};
function On(t) {
  return function(e) {
    var r = this;
    if (e === void 0 && (e = !0), r.length !== 0)
      if (r.isNode() && !r.removed()) {
        for (var a = 0, n = r[0], i = n._private.edges, s = 0; s < i.length; s++) {
          var o = i[s];
          !e && o.isLoop() || (a += t(n, o));
        }
        return a;
      } else
        return;
  };
}
ce(hn, {
  degree: On(function(t, e) {
    return e.source().same(e.target()) ? 2 : 1;
  }),
  indegree: On(function(t, e) {
    return e.target().same(t) ? 1 : 0;
  }),
  outdegree: On(function(t, e) {
    return e.source().same(t) ? 1 : 0;
  })
});
function gr(t, e) {
  return function(r) {
    for (var a, n = this.nodes(), i = 0; i < n.length; i++) {
      var s = n[i], o = s[t](r);
      o !== void 0 && (a === void 0 || e(o, a)) && (a = o);
    }
    return a;
  };
}
ce(hn, {
  minDegree: gr("degree", function(t, e) {
    return t < e;
  }),
  maxDegree: gr("degree", function(t, e) {
    return t > e;
  }),
  minIndegree: gr("indegree", function(t, e) {
    return t < e;
  }),
  maxIndegree: gr("indegree", function(t, e) {
    return t > e;
  }),
  minOutdegree: gr("outdegree", function(t, e) {
    return t < e;
  }),
  maxOutdegree: gr("outdegree", function(t, e) {
    return t > e;
  })
});
ce(hn, {
  totalDegree: function(e) {
    for (var r = 0, a = this.nodes(), n = 0; n < a.length; n++)
      r += a[n].degree(e);
    return r;
  }
});
var xt, Yo, Ho = function(e, r, a) {
  for (var n = 0; n < e.length; n++) {
    var i = e[n];
    if (!i.locked()) {
      var s = i._private.position, o = {
        x: r.x != null ? r.x - s.x : 0,
        y: r.y != null ? r.y - s.y : 0
      };
      i.isParent() && !(o.x === 0 && o.y === 0) && i.children().shift(o, a), i.dirtyBoundingBoxCache();
    }
  }
}, fs = {
  field: "position",
  bindingEvent: "position",
  allowBinding: !0,
  allowSetting: !0,
  settingEvent: "position",
  settingTriggersEvent: !0,
  triggerFnName: "emitAndNotify",
  allowGetting: !0,
  validKeys: ["x", "y"],
  beforeGet: function(e) {
    e.updateCompoundBounds();
  },
  beforeSet: function(e, r) {
    Ho(e, r, !1);
  },
  onSet: function(e) {
    e.dirtyCompoundBoundsCache();
  },
  canSet: function(e) {
    return !e.locked();
  }
};
xt = Yo = {
  position: Le.data(fs),
  // position but no notification to renderer
  silentPosition: Le.data(ce({}, fs, {
    allowBinding: !1,
    allowSetting: !0,
    settingTriggersEvent: !1,
    allowGetting: !1,
    beforeSet: function(e, r) {
      Ho(e, r, !0);
    },
    onSet: function(e) {
      e.dirtyCompoundBoundsCache();
    }
  })),
  positions: function(e, r) {
    if (Te(e))
      r ? this.silentPosition(e) : this.position(e);
    else if (Fe(e)) {
      var a = e, n = this.cy();
      n.startBatch();
      for (var i = 0; i < this.length; i++) {
        var s = this[i], o = void 0;
        (o = a(s, i)) && (r ? s.silentPosition(o) : s.position(o));
      }
      n.endBatch();
    }
    return this;
  },
  silentPositions: function(e) {
    return this.positions(e, !0);
  },
  shift: function(e, r, a) {
    var n;
    if (Te(e) ? (n = {
      x: ae(e.x) ? e.x : 0,
      y: ae(e.y) ? e.y : 0
    }, a = r) : le(e) && ae(r) && (n = {
      x: 0,
      y: 0
    }, n[e] = r), n != null) {
      var i = this.cy();
      i.startBatch();
      for (var s = 0; s < this.length; s++) {
        var o = this[s];
        if (!(i.hasCompoundNodes() && o.isChild() && o.ancestors().anySame(this))) {
          var u = o.position(), l = {
            x: u.x + n.x,
            y: u.y + n.y
          };
          a ? o.silentPosition(l) : o.position(l);
        }
      }
      i.endBatch();
    }
    return this;
  },
  silentShift: function(e, r) {
    return Te(e) ? this.shift(e, !0) : le(e) && ae(r) && this.shift(e, r, !0), this;
  },
  // get/set the rendered (i.e. on screen) positon of the element
  renderedPosition: function(e, r) {
    var a = this[0], n = this.cy(), i = n.zoom(), s = n.pan(), o = Te(e) ? e : void 0, u = o !== void 0 || r !== void 0 && le(e);
    if (a && a.isNode())
      if (u)
        for (var l = 0; l < this.length; l++) {
          var f = this[l];
          r !== void 0 ? f.position(e, (r - s[e]) / i) : o !== void 0 && f.position(To(o, i, s));
        }
      else {
        var h = a.position();
        return o = ln(h, i, s), e === void 0 ? o : o[e];
      }
    else if (!u)
      return;
    return this;
  },
  // get/set the position relative to the parent
  relativePosition: function(e, r) {
    var a = this[0], n = this.cy(), i = Te(e) ? e : void 0, s = i !== void 0 || r !== void 0 && le(e), o = n.hasCompoundNodes();
    if (a && a.isNode())
      if (s)
        for (var u = 0; u < this.length; u++) {
          var l = this[u], f = o ? l.parent() : null, h = f && f.length > 0, c = h;
          h && (f = f[0]);
          var v = c ? f.position() : {
            x: 0,
            y: 0
          };
          r !== void 0 ? l.position(e, r + v[e]) : i !== void 0 && l.position({
            x: i.x + v.x,
            y: i.y + v.y
          });
        }
      else {
        var d = a.position(), g = o ? a.parent() : null, y = g && g.length > 0, p = y;
        y && (g = g[0]);
        var E = p ? g.position() : {
          x: 0,
          y: 0
        };
        return i = {
          x: d.x - E.x,
          y: d.y - E.y
        }, e === void 0 ? i : i[e];
      }
    else if (!s)
      return;
    return this;
  }
};
xt.modelPosition = xt.point = xt.position;
xt.modelPositions = xt.points = xt.positions;
xt.renderedPoint = xt.renderedPosition;
xt.relativePoint = xt.relativePosition;
var Sp = Yo, Dr, Zt;
Dr = Zt = {};
Zt.renderedBoundingBox = function(t) {
  var e = this.boundingBox(t), r = this.cy(), a = r.zoom(), n = r.pan(), i = e.x1 * a + n.x, s = e.x2 * a + n.x, o = e.y1 * a + n.y, u = e.y2 * a + n.y;
  return {
    x1: i,
    x2: s,
    y1: o,
    y2: u,
    w: s - i,
    h: u - o
  };
};
Zt.dirtyCompoundBoundsCache = function() {
  var t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !1, e = this.cy();
  return !e.styleEnabled() || !e.hasCompoundNodes() ? this : (this.forEachUp(function(r) {
    if (r.isParent()) {
      var a = r._private;
      a.compoundBoundsClean = !1, a.bbCache = null, t || r.emitAndNotify("bounds");
    }
  }), this);
};
Zt.updateCompoundBounds = function() {
  var t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !1, e = this.cy();
  if (!e.styleEnabled() || !e.hasCompoundNodes())
    return this;
  if (!t && e.batching())
    return this;
  function r(s) {
    if (!s.isParent())
      return;
    var o = s._private, u = s.children(), l = s.pstyle("compound-sizing-wrt-labels").value === "include", f = {
      width: {
        val: s.pstyle("min-width").pfValue,
        left: s.pstyle("min-width-bias-left"),
        right: s.pstyle("min-width-bias-right")
      },
      height: {
        val: s.pstyle("min-height").pfValue,
        top: s.pstyle("min-height-bias-top"),
        bottom: s.pstyle("min-height-bias-bottom")
      }
    }, h = u.boundingBox({
      includeLabels: l,
      includeOverlays: !1,
      // updating the compound bounds happens outside of the regular
      // cache cycle (i.e. before fired events)
      useCache: !1
    }), c = o.position;
    (h.w === 0 || h.h === 0) && (h = {
      w: s.pstyle("width").pfValue,
      h: s.pstyle("height").pfValue
    }, h.x1 = c.x - h.w / 2, h.x2 = c.x + h.w / 2, h.y1 = c.y - h.h / 2, h.y2 = c.y + h.h / 2);
    function v(w, D, A) {
      var L = 0, M = 0, O = D + A;
      return w > 0 && O > 0 && (L = D / O * w, M = A / O * w), {
        biasDiff: L,
        biasComplementDiff: M
      };
    }
    function d(w, D, A, L) {
      if (A.units === "%")
        switch (L) {
          case "width":
            return w > 0 ? A.pfValue * w : 0;
          case "height":
            return D > 0 ? A.pfValue * D : 0;
          case "average":
            return w > 0 && D > 0 ? A.pfValue * (w + D) / 2 : 0;
          case "min":
            return w > 0 && D > 0 ? w > D ? A.pfValue * D : A.pfValue * w : 0;
          case "max":
            return w > 0 && D > 0 ? w > D ? A.pfValue * w : A.pfValue * D : 0;
          default:
            return 0;
        }
      else
        return A.units === "px" ? A.pfValue : 0;
    }
    var g = f.width.left.value;
    f.width.left.units === "px" && f.width.val > 0 && (g = g * 100 / f.width.val);
    var y = f.width.right.value;
    f.width.right.units === "px" && f.width.val > 0 && (y = y * 100 / f.width.val);
    var p = f.height.top.value;
    f.height.top.units === "px" && f.height.val > 0 && (p = p * 100 / f.height.val);
    var E = f.height.bottom.value;
    f.height.bottom.units === "px" && f.height.val > 0 && (E = E * 100 / f.height.val);
    var m = v(f.width.val - h.w, g, y), T = m.biasDiff, C = m.biasComplementDiff, S = v(f.height.val - h.h, p, E), b = S.biasDiff, x = S.biasComplementDiff;
    o.autoPadding = d(h.w, h.h, s.pstyle("padding"), s.pstyle("padding-relative-to").value), o.autoWidth = Math.max(h.w, f.width.val), c.x = (-T + h.x1 + h.x2 + C) / 2, o.autoHeight = Math.max(h.h, f.height.val), c.y = (-b + h.y1 + h.y2 + x) / 2;
  }
  for (var a = 0; a < this.length; a++) {
    var n = this[a], i = n._private;
    (!i.compoundBoundsClean || t) && (r(n), e.batching() || (i.compoundBoundsClean = !0));
  }
  return this;
};
var ct = function(e) {
  return e === 1 / 0 || e === -1 / 0 ? 0 : e;
}, Et = function(e, r, a, n, i) {
  n - r === 0 || i - a === 0 || r == null || a == null || n == null || i == null || (e.x1 = r < e.x1 ? r : e.x1, e.x2 = n > e.x2 ? n : e.x2, e.y1 = a < e.y1 ? a : e.y1, e.y2 = i > e.y2 ? i : e.y2, e.w = e.x2 - e.x1, e.h = e.y2 - e.y1);
}, tr = function(e, r) {
  return r == null ? e : Et(e, r.x1, r.y1, r.x2, r.y2);
}, Ur = function(e, r, a) {
  return wt(e, r, a);
}, Ma = function(e, r, a) {
  if (!r.cy().headless()) {
    var n = r._private, i = n.rstyle, s = i.arrowWidth / 2, o = r.pstyle(a + "-arrow-shape").value, u, l;
    if (o !== "none") {
      a === "source" ? (u = i.srcX, l = i.srcY) : a === "target" ? (u = i.tgtX, l = i.tgtY) : (u = i.midX, l = i.midY);
      var f = n.arrowBounds = n.arrowBounds || {}, h = f[a] = f[a] || {};
      h.x1 = u - s, h.y1 = l - s, h.x2 = u + s, h.y2 = l + s, h.w = h.x2 - h.x1, h.h = h.y2 - h.y1, Ba(h, 1), Et(e, h.x1, h.y1, h.x2, h.y2);
    }
  }
}, Nn = function(e, r, a) {
  if (!r.cy().headless()) {
    var n;
    a ? n = a + "-" : n = "";
    var i = r._private, s = i.rstyle, o = r.pstyle(n + "label").strValue;
    if (o) {
      var u = r.pstyle("text-halign"), l = r.pstyle("text-valign"), f = Ur(s, "labelWidth", a), h = Ur(s, "labelHeight", a), c = Ur(s, "labelX", a), v = Ur(s, "labelY", a), d = r.pstyle(n + "text-margin-x").pfValue, g = r.pstyle(n + "text-margin-y").pfValue, y = r.isEdge(), p = r.pstyle(n + "text-rotation"), E = r.pstyle("text-outline-width").pfValue, m = r.pstyle("text-border-width").pfValue, T = m / 2, C = r.pstyle("text-background-padding").pfValue, S = 2, b = h, x = f, w = x / 2, D = b / 2, A, L, M, O;
      if (y)
        A = c - w, L = c + w, M = v - D, O = v + D;
      else {
        switch (u.value) {
          case "left":
            A = c - x, L = c;
            break;
          case "center":
            A = c - w, L = c + w;
            break;
          case "right":
            A = c, L = c + x;
            break;
        }
        switch (l.value) {
          case "top":
            M = v - b, O = v;
            break;
          case "center":
            M = v - D, O = v + D;
            break;
          case "bottom":
            M = v, O = v + b;
            break;
        }
      }
      A += d - Math.max(E, T) - C - S, L += d + Math.max(E, T) + C + S, M += g - Math.max(E, T) - C - S, O += g + Math.max(E, T) + C + S;
      var P = a || "main", I = i.labelBounds, k = I[P] = I[P] || {};
      k.x1 = A, k.y1 = M, k.x2 = L, k.y2 = O, k.w = L - A, k.h = O - M;
      var R = y && p.strValue === "autorotate", B = p.pfValue != null && p.pfValue !== 0;
      if (R || B) {
        var z = R ? Ur(i.rstyle, "labelAngle", a) : p.pfValue, F = Math.cos(z), $ = Math.sin(z), U = (A + L) / 2, V = (M + O) / 2;
        if (!y) {
          switch (u.value) {
            case "left":
              U = L;
              break;
            case "right":
              U = A;
              break;
          }
          switch (l.value) {
            case "top":
              V = O;
              break;
            case "bottom":
              V = M;
              break;
          }
        }
        var H = function(de, ee) {
          return de = de - U, ee = ee - V, {
            x: de * F - ee * $ + U,
            y: de * $ + ee * F + V
          };
        }, Y = H(A, M), G = H(A, O), X = H(L, M), K = H(L, O);
        A = Math.min(Y.x, G.x, X.x, K.x), L = Math.max(Y.x, G.x, X.x, K.x), M = Math.min(Y.y, G.y, X.y, K.y), O = Math.max(Y.y, G.y, X.y, K.y);
      }
      var Z = P + "Rot", te = I[Z] = I[Z] || {};
      te.x1 = A, te.y1 = M, te.x2 = L, te.y2 = O, te.w = L - A, te.h = O - M, Et(e, A, M, L, O), Et(i.labelBounds.all, A, M, L, O);
    }
    return e;
  }
}, Lp = function(e, r) {
  var a = e._private.cy, n = a.styleEnabled(), i = a.headless(), s = lt(), o = e._private, u = e.isNode(), l = e.isEdge(), f, h, c, v, d, g, y = o.rstyle, p = u && n ? e.pstyle("bounds-expansion").pfValue : [0], E = function(fe) {
    return fe.pstyle("display").value !== "none";
  }, m = !n || E(e) && (!l || E(e.source()) && E(e.target()));
  if (m) {
    var T = 0, C = 0;
    n && r.includeOverlays && (T = e.pstyle("overlay-opacity").value, T !== 0 && (C = e.pstyle("overlay-padding").value));
    var S = 0, b = 0;
    n && r.includeUnderlays && (S = e.pstyle("underlay-opacity").value, S !== 0 && (b = e.pstyle("underlay-padding").value));
    var x = Math.max(C, b), w = 0, D = 0;
    if (n && (w = e.pstyle("width").pfValue, D = w / 2), u && r.includeNodes) {
      var A = e.position();
      d = A.x, g = A.y;
      var L = e.outerWidth(), M = L / 2, O = e.outerHeight(), P = O / 2;
      f = d - M, h = d + M, c = g - P, v = g + P, Et(s, f, c, h, v);
    } else if (l && r.includeEdges)
      if (n && !i) {
        var I = e.pstyle("curve-style").strValue;
        if (f = Math.min(y.srcX, y.midX, y.tgtX), h = Math.max(y.srcX, y.midX, y.tgtX), c = Math.min(y.srcY, y.midY, y.tgtY), v = Math.max(y.srcY, y.midY, y.tgtY), f -= D, h += D, c -= D, v += D, Et(s, f, c, h, v), I === "haystack") {
          var k = y.haystackPts;
          if (k && k.length === 2) {
            if (f = k[0].x, c = k[0].y, h = k[1].x, v = k[1].y, f > h) {
              var R = f;
              f = h, h = R;
            }
            if (c > v) {
              var B = c;
              c = v, v = B;
            }
            Et(s, f - D, c - D, h + D, v + D);
          }
        } else if (I === "bezier" || I === "unbundled-bezier" || I === "segments" || I === "taxi") {
          var z;
          switch (I) {
            case "bezier":
            case "unbundled-bezier":
              z = y.bezierPts;
              break;
            case "segments":
            case "taxi":
              z = y.linePts;
              break;
          }
          if (z != null)
            for (var F = 0; F < z.length; F++) {
              var $ = z[F];
              f = $.x - D, h = $.x + D, c = $.y - D, v = $.y + D, Et(s, f, c, h, v);
            }
        }
      } else {
        var U = e.source(), V = U.position(), H = e.target(), Y = H.position();
        if (f = V.x, h = Y.x, c = V.y, v = Y.y, f > h) {
          var G = f;
          f = h, h = G;
        }
        if (c > v) {
          var X = c;
          c = v, v = X;
        }
        f -= D, h += D, c -= D, v += D, Et(s, f, c, h, v);
      }
    if (n && r.includeEdges && l && (Ma(s, e, "mid-source"), Ma(s, e, "mid-target"), Ma(s, e, "source"), Ma(s, e, "target")), n) {
      var K = e.pstyle("ghost").value === "yes";
      if (K) {
        var Z = e.pstyle("ghost-offset-x").pfValue, te = e.pstyle("ghost-offset-y").pfValue;
        Et(s, s.x1 + Z, s.y1 + te, s.x2 + Z, s.y2 + te);
      }
    }
    var he = o.bodyBounds = o.bodyBounds || {};
    Wi(he, s), Sn(he, p), Ba(he, 1), n && (f = s.x1, h = s.x2, c = s.y1, v = s.y2, Et(s, f - x, c - x, h + x, v + x));
    var de = o.overlayBounds = o.overlayBounds || {};
    Wi(de, s), Sn(de, p), Ba(de, 1);
    var ee = o.labelBounds = o.labelBounds || {};
    ee.all != null ? eg(ee.all) : ee.all = lt(), n && r.includeLabels && (r.includeMainLabels && Nn(s, e, null), l && (r.includeSourceLabels && Nn(s, e, "source"), r.includeTargetLabels && Nn(s, e, "target")));
  }
  return s.x1 = ct(s.x1), s.y1 = ct(s.y1), s.x2 = ct(s.x2), s.y2 = ct(s.y2), s.w = ct(s.x2 - s.x1), s.h = ct(s.y2 - s.y1), s.w > 0 && s.h > 0 && m && (Sn(s, p), Ba(s, 1)), s;
}, Xo = function(e) {
  var r = 0, a = function(s) {
    return (s ? 1 : 0) << r++;
  }, n = 0;
  return n += a(e.incudeNodes), n += a(e.includeEdges), n += a(e.includeLabels), n += a(e.includeMainLabels), n += a(e.includeSourceLabels), n += a(e.includeTargetLabels), n += a(e.includeOverlays), n;
}, qo = function(e) {
  if (e.isEdge()) {
    var r = e.source().position(), a = e.target().position(), n = function(s) {
      return Math.round(s);
    };
    return xd([n(r.x), n(r.y), n(a.x), n(a.y)]);
  } else
    return 0;
}, hs = function(e, r) {
  var a = e._private, n, i = e.isEdge(), s = r == null ? vs : Xo(r), o = s === vs, u = qo(e), l = a.bbCachePosKey === u, f = r.useCache && l, h = function(g) {
    return g._private.bbCache == null || g._private.styleDirty;
  }, c = !f || h(e) || i && h(e.source()) || h(e.target());
  if (c ? (l || e.recalculateRenderedStyle(f), n = Lp(e, ua), a.bbCache = n, a.bbCachePosKey = u) : n = a.bbCache, !o) {
    var v = e.isNode();
    n = lt(), (r.includeNodes && v || r.includeEdges && !v) && (r.includeOverlays ? tr(n, a.overlayBounds) : tr(n, a.bodyBounds)), r.includeLabels && (r.includeMainLabels && (!i || r.includeSourceLabels && r.includeTargetLabels) ? tr(n, a.labelBounds.all) : (r.includeMainLabels && tr(n, a.labelBounds.mainRot), r.includeSourceLabels && tr(n, a.labelBounds.sourceRot), r.includeTargetLabels && tr(n, a.labelBounds.targetRot))), n.w = n.x2 - n.x1, n.h = n.y2 - n.y1;
  }
  return n;
}, ua = {
  includeNodes: !0,
  includeEdges: !0,
  includeLabels: !0,
  includeMainLabels: !0,
  includeSourceLabels: !0,
  includeTargetLabels: !0,
  includeOverlays: !0,
  includeUnderlays: !0,
  useCache: !0
}, vs = Xo(ua), cs = Ze(ua);
Zt.boundingBox = function(t) {
  var e;
  if (this.length === 1 && this[0]._private.bbCache != null && !this[0]._private.styleDirty && (t === void 0 || t.useCache === void 0 || t.useCache === !0))
    t === void 0 ? t = ua : t = cs(t), e = hs(this[0], t);
  else {
    e = lt(), t = t || ua;
    var r = cs(t), a = this, n = a.cy(), i = n.styleEnabled();
    if (i)
      for (var s = 0; s < a.length; s++) {
        var o = a[s], u = o._private, l = qo(o), f = u.bbCachePosKey === l, h = r.useCache && f && !u.styleDirty;
        o.recalculateRenderedStyle(h);
      }
    this.updateCompoundBounds(!t.useCache);
    for (var c = 0; c < a.length; c++) {
      var v = a[c];
      tr(e, hs(v, r));
    }
  }
  return e.x1 = ct(e.x1), e.y1 = ct(e.y1), e.x2 = ct(e.x2), e.y2 = ct(e.y2), e.w = ct(e.x2 - e.x1), e.h = ct(e.y2 - e.y1), e;
};
Zt.dirtyBoundingBoxCache = function() {
  for (var t = 0; t < this.length; t++) {
    var e = this[t]._private;
    e.bbCache = null, e.bbCachePosKey = null, e.bodyBounds = null, e.overlayBounds = null, e.labelBounds.all = null, e.labelBounds.source = null, e.labelBounds.target = null, e.labelBounds.main = null, e.labelBounds.sourceRot = null, e.labelBounds.targetRot = null, e.labelBounds.mainRot = null, e.arrowBounds.source = null, e.arrowBounds.target = null, e.arrowBounds["mid-source"] = null, e.arrowBounds["mid-target"] = null;
  }
  return this.emitAndNotify("bounds"), this;
};
Zt.boundingBoxAt = function(t) {
  var e = this.nodes(), r = this.cy(), a = r.hasCompoundNodes(), n = r.collection();
  if (a && (n = e.filter(function(l) {
    return l.isParent();
  }), e = e.not(n)), Te(t)) {
    var i = t;
    t = function() {
      return i;
    };
  }
  var s = function(f, h) {
    return f._private.bbAtOldPos = t(f, h);
  }, o = function(f) {
    return f._private.bbAtOldPos;
  };
  r.startBatch(), e.forEach(s).silentPositions(t), a && (n.dirtyCompoundBoundsCache(), n.dirtyBoundingBoxCache(), n.updateCompoundBounds(!0));
  var u = jd(this.boundingBox({
    useCache: !1
  }));
  return e.silentPositions(o), a && (n.dirtyCompoundBoundsCache(), n.dirtyBoundingBoxCache(), n.updateCompoundBounds(!0)), r.endBatch(), u;
};
Dr.boundingbox = Dr.bb = Dr.boundingBox;
Dr.renderedBoundingbox = Dr.renderedBoundingBox;
var Ap = Zt, Wr, ya;
Wr = ya = {};
var Wo = function(e) {
  e.uppercaseName = Yi(e.name), e.autoName = "auto" + e.uppercaseName, e.labelName = "label" + e.uppercaseName, e.outerName = "outer" + e.uppercaseName, e.uppercaseOuterName = Yi(e.outerName), Wr[e.name] = function() {
    var a = this[0], n = a._private, i = n.cy, s = i._private.styleEnabled;
    if (a)
      if (s) {
        if (a.isParent())
          return a.updateCompoundBounds(), n[e.autoName] || 0;
        var o = a.pstyle(e.name);
        switch (o.strValue) {
          case "label":
            return a.recalculateRenderedStyle(), n.rstyle[e.labelName] || 0;
          default:
            return o.pfValue;
        }
      } else
        return 1;
  }, Wr["outer" + e.uppercaseName] = function() {
    var a = this[0], n = a._private, i = n.cy, s = i._private.styleEnabled;
    if (a)
      if (s) {
        var o = a[e.name](), u = a.pstyle("border-width").pfValue, l = 2 * a.padding();
        return o + u + l;
      } else
        return 1;
  }, Wr["rendered" + e.uppercaseName] = function() {
    var a = this[0];
    if (a) {
      var n = a[e.name]();
      return n * this.cy().zoom();
    }
  }, Wr["rendered" + e.uppercaseOuterName] = function() {
    var a = this[0];
    if (a) {
      var n = a[e.outerName]();
      return n * this.cy().zoom();
    }
  };
};
Wo({
  name: "width"
});
Wo({
  name: "height"
});
ya.padding = function() {
  var t = this[0], e = t._private;
  return t.isParent() ? (t.updateCompoundBounds(), e.autoPadding !== void 0 ? e.autoPadding : t.pstyle("padding").pfValue) : t.pstyle("padding").pfValue;
};
ya.paddedHeight = function() {
  var t = this[0];
  return t.height() + 2 * t.padding();
};
ya.paddedWidth = function() {
  var t = this[0];
  return t.width() + 2 * t.padding();
};
var Op = ya, Np = function(e, r) {
  if (e.isEdge())
    return r(e);
}, Mp = function(e, r) {
  if (e.isEdge()) {
    var a = e.cy();
    return ln(r(e), a.zoom(), a.pan());
  }
}, Ip = function(e, r) {
  if (e.isEdge()) {
    var a = e.cy(), n = a.pan(), i = a.zoom();
    return r(e).map(function(s) {
      return ln(s, i, n);
    });
  }
}, Rp = function(e) {
  return e.renderer().getControlPoints(e);
}, kp = function(e) {
  return e.renderer().getSegmentPoints(e);
}, Pp = function(e) {
  return e.renderer().getSourceEndpoint(e);
}, Bp = function(e) {
  return e.renderer().getTargetEndpoint(e);
}, Fp = function(e) {
  return e.renderer().getEdgeMidpoint(e);
}, ds = {
  controlPoints: {
    get: Rp,
    mult: !0
  },
  segmentPoints: {
    get: kp,
    mult: !0
  },
  sourceEndpoint: {
    get: Pp
  },
  targetEndpoint: {
    get: Bp
  },
  midpoint: {
    get: Fp
  }
}, Gp = function(e) {
  return "rendered" + e[0].toUpperCase() + e.substr(1);
}, zp = Object.keys(ds).reduce(function(t, e) {
  var r = ds[e], a = Gp(e);
  return t[e] = function() {
    return Np(this, r.get);
  }, r.mult ? t[a] = function() {
    return Ip(this, r.get);
  } : t[a] = function() {
    return Mp(this, r.get);
  }, t;
}, {}), $p = ce({}, Sp, Ap, Op, zp);
/*!
Event object based on jQuery events, MIT license

https://jquery.org/license/
https://tldrlegal.com/license/mit-license
https://github.com/jquery/jquery/blob/master/src/event.js
*/
var Ko = function(e, r) {
  this.recycle(e, r);
};
function Yr() {
  return !1;
}
function Ia() {
  return !0;
}
Ko.prototype = {
  instanceString: function() {
    return "event";
  },
  recycle: function(e, r) {
    if (this.isImmediatePropagationStopped = this.isPropagationStopped = this.isDefaultPrevented = Yr, e != null && e.preventDefault ? (this.type = e.type, this.isDefaultPrevented = e.defaultPrevented ? Ia : Yr) : e != null && e.type ? r = e : this.type = e, r != null && (this.originalEvent = r.originalEvent, this.type = r.type != null ? r.type : this.type, this.cy = r.cy, this.target = r.target, this.position = r.position, this.renderedPosition = r.renderedPosition, this.namespace = r.namespace, this.layout = r.layout), this.cy != null && this.position != null && this.renderedPosition == null) {
      var a = this.position, n = this.cy.zoom(), i = this.cy.pan();
      this.renderedPosition = {
        x: a.x * n + i.x,
        y: a.y * n + i.y
      };
    }
    this.timeStamp = e && e.timeStamp || Date.now();
  },
  preventDefault: function() {
    this.isDefaultPrevented = Ia;
    var e = this.originalEvent;
    e && e.preventDefault && e.preventDefault();
  },
  stopPropagation: function() {
    this.isPropagationStopped = Ia;
    var e = this.originalEvent;
    e && e.stopPropagation && e.stopPropagation();
  },
  stopImmediatePropagation: function() {
    this.isImmediatePropagationStopped = Ia, this.stopPropagation();
  },
  isDefaultPrevented: Yr,
  isPropagationStopped: Yr,
  isImmediatePropagationStopped: Yr
};
var Zo = /^([^.]+)(\.(?:[^.]+))?$/, Vp = ".*", Qo = {
  qualifierCompare: function(e, r) {
    return e === r;
  },
  eventMatches: function() {
    return !0;
  },
  addEventFields: function() {
  },
  callbackContext: function(e) {
    return e;
  },
  beforeEmit: function() {
  },
  afterEmit: function() {
  },
  bubble: function() {
    return !1;
  },
  parent: function() {
    return null;
  },
  context: null
}, gs = Object.keys(Qo), _p = {};
function vn() {
  for (var t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : _p, e = arguments.length > 1 ? arguments[1] : void 0, r = 0; r < gs.length; r++) {
    var a = gs[r];
    this[a] = t[a] || Qo[a];
  }
  this.context = e || this.context, this.listeners = [], this.emitting = 0;
}
var Wt = vn.prototype, Jo = function(e, r, a, n, i, s, o) {
  Fe(n) && (i = n, n = null), o && (s == null ? s = o : s = ce({}, s, o));
  for (var u = Ie(a) ? a : a.split(/\s+/), l = 0; l < u.length; l++) {
    var f = u[l];
    if (!Yt(f)) {
      var h = f.match(Zo);
      if (h) {
        var c = h[1], v = h[2] ? h[2] : null, d = r(e, f, c, v, n, i, s);
        if (d === !1)
          break;
      }
    }
  }
}, ps = function(e, r) {
  return e.addEventFields(e.context, r), new Ko(r.type, r);
}, Up = function(e, r, a) {
  if (rd(a)) {
    r(e, a);
    return;
  } else if (Te(a)) {
    r(e, ps(e, a));
    return;
  }
  for (var n = Ie(a) ? a : a.split(/\s+/), i = 0; i < n.length; i++) {
    var s = n[i];
    if (!Yt(s)) {
      var o = s.match(Zo);
      if (o) {
        var u = o[1], l = o[2] ? o[2] : null, f = ps(e, {
          type: u,
          namespace: l,
          target: e.context
        });
        r(e, f);
      }
    }
  }
};
Wt.on = Wt.addListener = function(t, e, r, a, n) {
  return Jo(this, function(i, s, o, u, l, f, h) {
    Fe(f) && i.listeners.push({
      event: s,
      // full event string
      callback: f,
      // callback to run
      type: o,
      // the event type (e.g. 'click')
      namespace: u,
      // the event namespace (e.g. ".foo")
      qualifier: l,
      // a restriction on whether to match this emitter
      conf: h
      // additional configuration
    });
  }, t, e, r, a, n), this;
};
Wt.one = function(t, e, r, a) {
  return this.on(t, e, r, a, {
    one: !0
  });
};
Wt.removeListener = Wt.off = function(t, e, r, a) {
  var n = this;
  this.emitting !== 0 && (this.listeners = Ld(this.listeners));
  for (var i = this.listeners, s = function(l) {
    var f = i[l];
    Jo(n, function(h, c, v, d, g, y) {
      if ((f.type === v || t === "*") && (!d && f.namespace !== ".*" || f.namespace === d) && (!g || h.qualifierCompare(f.qualifier, g)) && (!y || f.callback === y))
        return i.splice(l, 1), !1;
    }, t, e, r, a);
  }, o = i.length - 1; o >= 0; o--)
    s(o);
  return this;
};
Wt.removeAllListeners = function() {
  return this.removeListener("*");
};
Wt.emit = Wt.trigger = function(t, e, r) {
  var a = this.listeners, n = a.length;
  return this.emitting++, Ie(e) || (e = [e]), Up(this, function(i, s) {
    r != null && (a = [{
      event: s.event,
      type: s.type,
      namespace: s.namespace,
      callback: r
    }], n = a.length);
    for (var o = function(f) {
      var h = a[f];
      if (h.type === s.type && (!h.namespace || h.namespace === s.namespace || h.namespace === Vp) && i.eventMatches(i.context, h, s)) {
        var c = [s];
        e != null && Od(c, e), i.beforeEmit(i.context, h, s), h.conf && h.conf.one && (i.listeners = i.listeners.filter(function(g) {
          return g !== h;
        }));
        var v = i.callbackContext(i.context, h, s), d = h.callback.apply(v, c);
        i.afterEmit(i.context, h, s), d === !1 && (s.stopPropagation(), s.preventDefault());
      }
    }, u = 0; u < n; u++)
      o(u);
    i.bubble(i.context) && !s.isPropagationStopped() && i.parent(i.context).emit(s, e);
  }, t), this.emitting--, this;
};
var Yp = {
  qualifierCompare: function(e, r) {
    return e == null || r == null ? e == null && r == null : e.sameText(r);
  },
  eventMatches: function(e, r, a) {
    var n = r.qualifier;
    return n != null ? e !== a.target && ga(a.target) && n.matches(a.target) : !0;
  },
  addEventFields: function(e, r) {
    r.cy = e.cy(), r.target = e;
  },
  callbackContext: function(e, r, a) {
    return r.qualifier != null ? a.target : e;
  },
  beforeEmit: function(e, r) {
    r.conf && r.conf.once && r.conf.onceCollection.removeListener(r.event, r.qualifier, r.callback);
  },
  bubble: function() {
    return !0;
  },
  parent: function(e) {
    return e.isChild() ? e.parent() : e.cy();
  }
}, Ra = function(e) {
  return le(e) ? new Xt(e) : e;
}, jo = {
  createEmitter: function() {
    for (var e = 0; e < this.length; e++) {
      var r = this[e], a = r._private;
      a.emitter || (a.emitter = new vn(Yp, r));
    }
    return this;
  },
  emitter: function() {
    return this._private.emitter;
  },
  on: function(e, r, a) {
    for (var n = Ra(r), i = 0; i < this.length; i++) {
      var s = this[i];
      s.emitter().on(e, n, a);
    }
    return this;
  },
  removeListener: function(e, r, a) {
    for (var n = Ra(r), i = 0; i < this.length; i++) {
      var s = this[i];
      s.emitter().removeListener(e, n, a);
    }
    return this;
  },
  removeAllListeners: function() {
    for (var e = 0; e < this.length; e++) {
      var r = this[e];
      r.emitter().removeAllListeners();
    }
    return this;
  },
  one: function(e, r, a) {
    for (var n = Ra(r), i = 0; i < this.length; i++) {
      var s = this[i];
      s.emitter().one(e, n, a);
    }
    return this;
  },
  once: function(e, r, a) {
    for (var n = Ra(r), i = 0; i < this.length; i++) {
      var s = this[i];
      s.emitter().on(e, n, a, {
        once: !0,
        onceCollection: this
      });
    }
  },
  emit: function(e, r) {
    for (var a = 0; a < this.length; a++) {
      var n = this[a];
      n.emitter().emit(e, r);
    }
    return this;
  },
  emitAndNotify: function(e, r) {
    if (this.length !== 0)
      return this.cy().notify(e, this), this.emit(e, r), this;
  }
};
Le.eventAliasesOn(jo);
var eu = {
  nodes: function(e) {
    return this.filter(function(r) {
      return r.isNode();
    }).filter(e);
  },
  edges: function(e) {
    return this.filter(function(r) {
      return r.isEdge();
    }).filter(e);
  },
  // internal helper to get nodes and edges as separate collections with single iteration over elements
  byGroup: function() {
    for (var e = this.spawn(), r = this.spawn(), a = 0; a < this.length; a++) {
      var n = this[a];
      n.isNode() ? e.push(n) : r.push(n);
    }
    return {
      nodes: e,
      edges: r
    };
  },
  filter: function(e, r) {
    if (e === void 0)
      return this;
    if (le(e) || ft(e))
      return new Xt(e).filter(this);
    if (Fe(e)) {
      for (var a = this.spawn(), n = this, i = 0; i < n.length; i++) {
        var s = n[i], o = r ? e.apply(r, [s, i, n]) : e(s, i, n);
        o && a.push(s);
      }
      return a;
    }
    return this.spawn();
  },
  not: function(e) {
    if (e) {
      le(e) && (e = this.filter(e));
      for (var r = this.spawn(), a = 0; a < this.length; a++) {
        var n = this[a], i = e.has(n);
        i || r.push(n);
      }
      return r;
    } else
      return this;
  },
  absoluteComplement: function() {
    var e = this.cy();
    return e.mutableElements().not(this);
  },
  intersect: function(e) {
    if (le(e)) {
      var r = e;
      return this.filter(r);
    }
    for (var a = this.spawn(), n = this, i = e, s = this.length < e.length, o = s ? n : i, u = s ? i : n, l = 0; l < o.length; l++) {
      var f = o[l];
      u.has(f) && a.push(f);
    }
    return a;
  },
  xor: function(e) {
    var r = this._private.cy;
    le(e) && (e = r.$(e));
    var a = this.spawn(), n = this, i = e, s = function(u, l) {
      for (var f = 0; f < u.length; f++) {
        var h = u[f], c = h._private.data.id, v = l.hasElementWithId(c);
        v || a.push(h);
      }
    };
    return s(n, i), s(i, n), a;
  },
  diff: function(e) {
    var r = this._private.cy;
    le(e) && (e = r.$(e));
    var a = this.spawn(), n = this.spawn(), i = this.spawn(), s = this, o = e, u = function(f, h, c) {
      for (var v = 0; v < f.length; v++) {
        var d = f[v], g = d._private.data.id, y = h.hasElementWithId(g);
        y ? i.merge(d) : c.push(d);
      }
    };
    return u(s, o, a), u(o, s, n), {
      left: a,
      right: n,
      both: i
    };
  },
  add: function(e) {
    var r = this._private.cy;
    if (!e)
      return this;
    if (le(e)) {
      var a = e;
      e = r.mutableElements().filter(a);
    }
    for (var n = this.spawnSelf(), i = 0; i < e.length; i++) {
      var s = e[i], o = !this.has(s);
      o && n.push(s);
    }
    return n;
  },
  // in place merge on calling collection
  merge: function(e) {
    var r = this._private, a = r.cy;
    if (!e)
      return this;
    if (e && le(e)) {
      var n = e;
      e = a.mutableElements().filter(n);
    }
    for (var i = r.map, s = 0; s < e.length; s++) {
      var o = e[s], u = o._private.data.id, l = !i.has(u);
      if (l) {
        var f = this.length++;
        this[f] = o, i.set(u, {
          ele: o,
          index: f
        });
      }
    }
    return this;
  },
  unmergeAt: function(e) {
    var r = this[e], a = r.id(), n = this._private, i = n.map;
    this[e] = void 0, i.delete(a);
    var s = e === this.length - 1;
    if (this.length > 1 && !s) {
      var o = this.length - 1, u = this[o], l = u._private.data.id;
      this[o] = void 0, this[e] = u, i.set(l, {
        ele: u,
        index: e
      });
    }
    return this.length--, this;
  },
  // remove single ele in place in calling collection
  unmergeOne: function(e) {
    e = e[0];
    var r = this._private, a = e._private.data.id, n = r.map, i = n.get(a);
    if (!i)
      return this;
    var s = i.index;
    return this.unmergeAt(s), this;
  },
  // remove eles in place on calling collection
  unmerge: function(e) {
    var r = this._private.cy;
    if (!e)
      return this;
    if (e && le(e)) {
      var a = e;
      e = r.mutableElements().filter(a);
    }
    for (var n = 0; n < e.length; n++)
      this.unmergeOne(e[n]);
    return this;
  },
  unmergeBy: function(e) {
    for (var r = this.length - 1; r >= 0; r--) {
      var a = this[r];
      e(a) && this.unmergeAt(r);
    }
    return this;
  },
  map: function(e, r) {
    for (var a = [], n = this, i = 0; i < n.length; i++) {
      var s = n[i], o = r ? e.apply(r, [s, i, n]) : e(s, i, n);
      a.push(o);
    }
    return a;
  },
  reduce: function(e, r) {
    for (var a = r, n = this, i = 0; i < n.length; i++)
      a = e(a, n[i], i, n);
    return a;
  },
  max: function(e, r) {
    for (var a = -1 / 0, n, i = this, s = 0; s < i.length; s++) {
      var o = i[s], u = r ? e.apply(r, [o, s, i]) : e(o, s, i);
      u > a && (a = u, n = o);
    }
    return {
      value: a,
      ele: n
    };
  },
  min: function(e, r) {
    for (var a = 1 / 0, n, i = this, s = 0; s < i.length; s++) {
      var o = i[s], u = r ? e.apply(r, [o, s, i]) : e(o, s, i);
      u < a && (a = u, n = o);
    }
    return {
      value: a,
      ele: n
    };
  }
}, De = eu;
De.u = De["|"] = De["+"] = De.union = De.or = De.add;
De["\\"] = De["!"] = De["-"] = De.difference = De.relativeComplement = De.subtract = De.not;
De.n = De["&"] = De["."] = De.and = De.intersection = De.intersect;
De["^"] = De["(+)"] = De["(-)"] = De.symmetricDifference = De.symdiff = De.xor;
De.fnFilter = De.filterFn = De.stdFilter = De.filter;
De.complement = De.abscomp = De.absoluteComplement;
var Hp = {
  isNode: function() {
    return this.group() === "nodes";
  },
  isEdge: function() {
    return this.group() === "edges";
  },
  isLoop: function() {
    return this.isEdge() && this.source()[0] === this.target()[0];
  },
  isSimple: function() {
    return this.isEdge() && this.source()[0] !== this.target()[0];
  },
  group: function() {
    var e = this[0];
    if (e)
      return e._private.group;
  }
}, tu = function(e, r) {
  var a = e.cy(), n = a.hasCompoundNodes();
  function i(f) {
    var h = f.pstyle("z-compound-depth");
    return h.value === "auto" ? n ? f.zDepth() : 0 : h.value === "bottom" ? -1 : h.value === "top" ? oi : 0;
  }
  var s = i(e) - i(r);
  if (s !== 0)
    return s;
  function o(f) {
    var h = f.pstyle("z-index-compare");
    return h.value === "auto" && f.isNode() ? 1 : 0;
  }
  var u = o(e) - o(r);
  if (u !== 0)
    return u;
  var l = e.pstyle("z-index").value - r.pstyle("z-index").value;
  return l !== 0 ? l : e.poolIndex() - r.poolIndex();
}, qa = {
  forEach: function(e, r) {
    if (Fe(e))
      for (var a = this.length, n = 0; n < a; n++) {
        var i = this[n], s = r ? e.apply(r, [i, n, this]) : e(i, n, this);
        if (s === !1)
          break;
      }
    return this;
  },
  toArray: function() {
    for (var e = [], r = 0; r < this.length; r++)
      e.push(this[r]);
    return e;
  },
  slice: function(e, r) {
    var a = [], n = this.length;
    r == null && (r = n), e == null && (e = 0), e < 0 && (e = n + e), r < 0 && (r = n + r);
    for (var i = e; i >= 0 && i < r && i < n; i++)
      a.push(this[i]);
    return this.spawn(a);
  },
  size: function() {
    return this.length;
  },
  eq: function(e) {
    return this[e] || this.spawn();
  },
  first: function() {
    return this[0] || this.spawn();
  },
  last: function() {
    return this[this.length - 1] || this.spawn();
  },
  empty: function() {
    return this.length === 0;
  },
  nonempty: function() {
    return !this.empty();
  },
  sort: function(e) {
    if (!Fe(e))
      return this;
    var r = this.toArray().sort(e);
    return this.spawn(r);
  },
  sortByZIndex: function() {
    return this.sort(tu);
  },
  zDepth: function() {
    var e = this[0];
    if (e) {
      var r = e._private, a = r.group;
      if (a === "nodes") {
        var n = r.data.parent ? e.parents().size() : 0;
        return e.isParent() ? n : oi - 1;
      } else {
        var i = r.source, s = r.target, o = i.zDepth(), u = s.zDepth();
        return Math.max(o, u, 0);
      }
    }
  }
};
qa.each = qa.forEach;
var Xp = function() {
  var e = "undefined", r = (typeof Symbol > "u" ? "undefined" : _e(Symbol)) != e && _e(Symbol.iterator) != e;
  r && (qa[Symbol.iterator] = function() {
    var a = this, n = {
      value: void 0,
      done: !1
    }, i = 0, s = this.length;
    return so({
      next: function() {
        return i < s ? n.value = a[i++] : (n.value = void 0, n.done = !0), n;
      }
    }, Symbol.iterator, function() {
      return this;
    });
  });
};
Xp();
var qp = Ze({
  nodeDimensionsIncludeLabels: !1
}), Ga = {
  // Calculates and returns node dimensions { x, y } based on options given
  layoutDimensions: function(e) {
    e = qp(e);
    var r;
    if (!this.takesUpSpace())
      r = {
        w: 0,
        h: 0
      };
    else if (e.nodeDimensionsIncludeLabels) {
      var a = this.boundingBox();
      r = {
        w: a.w,
        h: a.h
      };
    } else
      r = {
        w: this.outerWidth(),
        h: this.outerHeight()
      };
    return (r.w === 0 || r.h === 0) && (r.w = r.h = 1), r;
  },
  // using standard layout options, apply position function (w/ or w/o animation)
  layoutPositions: function(e, r, a) {
    var n = this.nodes().filter(function(C) {
      return !C.isParent();
    }), i = this.cy(), s = r.eles, o = function(S) {
      return S.id();
    }, u = ta(a, o);
    e.emit({
      type: "layoutstart",
      layout: e
    }), e.animations = [];
    var l = function(S, b, x) {
      var w = {
        x: b.x1 + b.w / 2,
        y: b.y1 + b.h / 2
      }, D = {
        // scale from center of bounding box (not necessarily 0,0)
        x: (x.x - w.x) * S,
        y: (x.y - w.y) * S
      };
      return {
        x: w.x + D.x,
        y: w.y + D.y
      };
    }, f = r.spacingFactor && r.spacingFactor !== 1, h = function() {
      if (!f)
        return null;
      for (var S = lt(), b = 0; b < n.length; b++) {
        var x = n[b], w = u(x, b);
        rg(S, w.x, w.y);
      }
      return S;
    }, c = h(), v = ta(function(C, S) {
      var b = u(C, S);
      if (f) {
        var x = Math.abs(r.spacingFactor);
        b = l(x, c, b);
      }
      return r.transform != null && (b = r.transform(C, b)), b;
    }, o);
    if (r.animate) {
      for (var d = 0; d < n.length; d++) {
        var g = n[d], y = v(g, d), p = r.animateFilter == null || r.animateFilter(g, d);
        if (p) {
          var E = g.animation({
            position: y,
            duration: r.animationDuration,
            easing: r.animationEasing
          });
          e.animations.push(E);
        } else
          g.position(y);
      }
      if (r.fit) {
        var m = i.animation({
          fit: {
            boundingBox: s.boundingBoxAt(v),
            padding: r.padding
          },
          duration: r.animationDuration,
          easing: r.animationEasing
        });
        e.animations.push(m);
      } else if (r.zoom !== void 0 && r.pan !== void 0) {
        var T = i.animation({
          zoom: r.zoom,
          pan: r.pan,
          duration: r.animationDuration,
          easing: r.animationEasing
        });
        e.animations.push(T);
      }
      e.animations.forEach(function(C) {
        return C.play();
      }), e.one("layoutready", r.ready), e.emit({
        type: "layoutready",
        layout: e
      }), Rr.all(e.animations.map(function(C) {
        return C.promise();
      })).then(function() {
        e.one("layoutstop", r.stop), e.emit({
          type: "layoutstop",
          layout: e
        });
      });
    } else
      n.positions(v), r.fit && i.fit(r.eles, r.padding), r.zoom != null && i.zoom(r.zoom), r.pan && i.pan(r.pan), e.one("layoutready", r.ready), e.emit({
        type: "layoutready",
        layout: e
      }), e.one("layoutstop", r.stop), e.emit({
        type: "layoutstop",
        layout: e
      });
    return this;
  },
  layout: function(e) {
    var r = this.cy();
    return r.makeLayout(ce({}, e, {
      eles: this
    }));
  }
};
Ga.createLayout = Ga.makeLayout = Ga.layout;
function ru(t, e, r) {
  var a = r._private, n = a.styleCache = a.styleCache || [], i;
  return (i = n[t]) != null || (i = n[t] = e(r)), i;
}
function cn(t, e) {
  return t = ar(t), function(a) {
    return ru(t, e, a);
  };
}
function dn(t, e) {
  t = ar(t);
  var r = function(n) {
    return e.call(n);
  };
  return function() {
    var n = this[0];
    if (n)
      return ru(t, r, n);
  };
}
var We = {
  recalculateRenderedStyle: function(e) {
    var r = this.cy(), a = r.renderer(), n = r.styleEnabled();
    return a && n && a.recalculateRenderedStyle(this, e), this;
  },
  dirtyStyleCache: function() {
    var e = this.cy(), r = function(i) {
      return i._private.styleCache = null;
    };
    if (e.hasCompoundNodes()) {
      var a;
      a = this.spawnSelf().merge(this.descendants()).merge(this.parents()), a.merge(a.connectedEdges()), a.forEach(r);
    } else
      this.forEach(function(n) {
        r(n), n.connectedEdges().forEach(r);
      });
    return this;
  },
  // fully updates (recalculates) the style for the elements
  updateStyle: function(e) {
    var r = this._private.cy;
    if (!r.styleEnabled())
      return this;
    if (r.batching()) {
      var a = r._private.batchStyleEles;
      return a.merge(this), this;
    }
    var n = r.hasCompoundNodes(), i = this;
    e = !!(e || e === void 0), n && (i = this.spawnSelf().merge(this.descendants()).merge(this.parents()));
    var s = i;
    return e ? s.emitAndNotify("style") : s.emit("style"), i.forEach(function(o) {
      return o._private.styleDirty = !0;
    }), this;
  },
  // private: clears dirty flag and recalculates style
  cleanStyle: function() {
    var e = this.cy();
    if (e.styleEnabled())
      for (var r = 0; r < this.length; r++) {
        var a = this[r];
        a._private.styleDirty && (a._private.styleDirty = !1, e.style().apply(a));
      }
  },
  // get the internal parsed style object for the specified property
  parsedStyle: function(e) {
    var r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0, a = this[0], n = a.cy();
    if (n.styleEnabled() && a) {
      this.cleanStyle();
      var i = a._private.style[e];
      return i ?? (r ? n.style().getDefaultProperty(e) : null);
    }
  },
  numericStyle: function(e) {
    var r = this[0];
    if (r.cy().styleEnabled() && r) {
      var a = r.pstyle(e);
      return a.pfValue !== void 0 ? a.pfValue : a.value;
    }
  },
  numericStyleUnits: function(e) {
    var r = this[0];
    if (r.cy().styleEnabled() && r)
      return r.pstyle(e).units;
  },
  // get the specified css property as a rendered value (i.e. on-screen value)
  // or get the whole rendered style if no property specified (NB doesn't allow setting)
  renderedStyle: function(e) {
    var r = this.cy();
    if (!r.styleEnabled())
      return this;
    var a = this[0];
    if (a)
      return r.style().getRenderedStyle(a, e);
  },
  // read the calculated css style of the element or override the style (via a bypass)
  style: function(e, r) {
    var a = this.cy();
    if (!a.styleEnabled())
      return this;
    var n = !1, i = a.style();
    if (Te(e)) {
      var s = e;
      i.applyBypass(this, s, n), this.emitAndNotify("style");
    } else if (le(e))
      if (r === void 0) {
        var o = this[0];
        return o ? i.getStylePropertyValue(o, e) : void 0;
      } else
        i.applyBypass(this, e, r, n), this.emitAndNotify("style");
    else if (e === void 0) {
      var u = this[0];
      return u ? i.getRawStyle(u) : void 0;
    }
    return this;
  },
  removeStyle: function(e) {
    var r = this.cy();
    if (!r.styleEnabled())
      return this;
    var a = !1, n = r.style(), i = this;
    if (e === void 0)
      for (var s = 0; s < i.length; s++) {
        var o = i[s];
        n.removeAllBypasses(o, a);
      }
    else {
      e = e.split(/\s+/);
      for (var u = 0; u < i.length; u++) {
        var l = i[u];
        n.removeBypasses(l, e, a);
      }
    }
    return this.emitAndNotify("style"), this;
  },
  show: function() {
    return this.css("display", "element"), this;
  },
  hide: function() {
    return this.css("display", "none"), this;
  },
  effectiveOpacity: function() {
    var e = this.cy();
    if (!e.styleEnabled())
      return 1;
    var r = e.hasCompoundNodes(), a = this[0];
    if (a) {
      var n = a._private, i = a.pstyle("opacity").value;
      if (!r)
        return i;
      var s = n.data.parent ? a.parents() : null;
      if (s)
        for (var o = 0; o < s.length; o++) {
          var u = s[o], l = u.pstyle("opacity").value;
          i = l * i;
        }
      return i;
    }
  },
  transparent: function() {
    var e = this.cy();
    if (!e.styleEnabled())
      return !1;
    var r = this[0], a = r.cy().hasCompoundNodes();
    if (r)
      return a ? r.effectiveOpacity() === 0 : r.pstyle("opacity").value === 0;
  },
  backgrounding: function() {
    var e = this.cy();
    if (!e.styleEnabled())
      return !1;
    var r = this[0];
    return !!r._private.backgrounding;
  }
};
function Mn(t, e) {
  var r = t._private, a = r.data.parent ? t.parents() : null;
  if (a)
    for (var n = 0; n < a.length; n++) {
      var i = a[n];
      if (!e(i))
        return !1;
    }
  return !0;
}
function pi(t) {
  var e = t.ok, r = t.edgeOkViaNode || t.ok, a = t.parentOk || t.ok;
  return function() {
    var n = this.cy();
    if (!n.styleEnabled())
      return !0;
    var i = this[0], s = n.hasCompoundNodes();
    if (i) {
      var o = i._private;
      if (!e(i))
        return !1;
      if (i.isNode())
        return !s || Mn(i, a);
      var u = o.source, l = o.target;
      return r(u) && (!s || Mn(u, r)) && (u === l || r(l) && (!s || Mn(l, r)));
    }
  };
}
var kr = cn("eleTakesUpSpace", function(t) {
  return t.pstyle("display").value === "element" && t.width() !== 0 && (t.isNode() ? t.height() !== 0 : !0);
});
We.takesUpSpace = dn("takesUpSpace", pi({
  ok: kr
}));
var Wp = cn("eleInteractive", function(t) {
  return t.pstyle("events").value === "yes" && t.pstyle("visibility").value === "visible" && kr(t);
}), Kp = cn("parentInteractive", function(t) {
  return t.pstyle("visibility").value === "visible" && kr(t);
});
We.interactive = dn("interactive", pi({
  ok: Wp,
  parentOk: Kp,
  edgeOkViaNode: kr
}));
We.noninteractive = function() {
  var t = this[0];
  if (t)
    return !t.interactive();
};
var Zp = cn("eleVisible", function(t) {
  return t.pstyle("visibility").value === "visible" && t.pstyle("opacity").pfValue !== 0 && kr(t);
}), Qp = kr;
We.visible = dn("visible", pi({
  ok: Zp,
  edgeOkViaNode: Qp
}));
We.hidden = function() {
  var t = this[0];
  if (t)
    return !t.visible();
};
We.isBundledBezier = dn("isBundledBezier", function() {
  return this.cy().styleEnabled() ? !this.removed() && this.pstyle("curve-style").value === "bezier" && this.takesUpSpace() : !1;
});
We.bypass = We.css = We.style;
We.renderedCss = We.renderedStyle;
We.removeBypass = We.removeCss = We.removeStyle;
We.pstyle = We.parsedStyle;
var Ut = {};
function ys(t) {
  return function() {
    var e = arguments, r = [];
    if (e.length === 2) {
      var a = e[0], n = e[1];
      this.on(t.event, a, n);
    } else if (e.length === 1 && Fe(e[0])) {
      var i = e[0];
      this.on(t.event, i);
    } else if (e.length === 0 || e.length === 1 && Ie(e[0])) {
      for (var s = e.length === 1 ? e[0] : null, o = 0; o < this.length; o++) {
        var u = this[o], l = !t.ableField || u._private[t.ableField], f = u._private[t.field] != t.value;
        if (t.overrideAble) {
          var h = t.overrideAble(u);
          if (h !== void 0 && (l = h, !h))
            return this;
        }
        l && (u._private[t.field] = t.value, f && r.push(u));
      }
      var c = this.spawn(r);
      c.updateStyle(), c.emit(t.event), s && c.emit(s);
    }
    return this;
  };
}
function Pr(t) {
  Ut[t.field] = function() {
    var e = this[0];
    if (e) {
      if (t.overrideField) {
        var r = t.overrideField(e);
        if (r !== void 0)
          return r;
      }
      return e._private[t.field];
    }
  }, Ut[t.on] = ys({
    event: t.on,
    field: t.field,
    ableField: t.ableField,
    overrideAble: t.overrideAble,
    value: !0
  }), Ut[t.off] = ys({
    event: t.off,
    field: t.field,
    ableField: t.ableField,
    overrideAble: t.overrideAble,
    value: !1
  });
}
Pr({
  field: "locked",
  overrideField: function(e) {
    return e.cy().autolock() ? !0 : void 0;
  },
  on: "lock",
  off: "unlock"
});
Pr({
  field: "grabbable",
  overrideField: function(e) {
    return e.cy().autoungrabify() || e.pannable() ? !1 : void 0;
  },
  on: "grabify",
  off: "ungrabify"
});
Pr({
  field: "selected",
  ableField: "selectable",
  overrideAble: function(e) {
    return e.cy().autounselectify() ? !1 : void 0;
  },
  on: "select",
  off: "unselect"
});
Pr({
  field: "selectable",
  overrideField: function(e) {
    return e.cy().autounselectify() ? !1 : void 0;
  },
  on: "selectify",
  off: "unselectify"
});
Ut.deselect = Ut.unselect;
Ut.grabbed = function() {
  var t = this[0];
  if (t)
    return t._private.grabbed;
};
Pr({
  field: "active",
  on: "activate",
  off: "unactivate"
});
Pr({
  field: "pannable",
  on: "panify",
  off: "unpanify"
});
Ut.inactive = function() {
  var t = this[0];
  if (t)
    return !t._private.active;
};
var et = {}, ms = function(e) {
  return function(a) {
    for (var n = this, i = [], s = 0; s < n.length; s++) {
      var o = n[s];
      if (o.isNode()) {
        for (var u = !1, l = o.connectedEdges(), f = 0; f < l.length; f++) {
          var h = l[f], c = h.source(), v = h.target();
          if (e.noIncomingEdges && v === o && c !== o || e.noOutgoingEdges && c === o && v !== o) {
            u = !0;
            break;
          }
        }
        u || i.push(o);
      }
    }
    return this.spawn(i, !0).filter(a);
  };
}, bs = function(e) {
  return function(r) {
    for (var a = this, n = [], i = 0; i < a.length; i++) {
      var s = a[i];
      if (s.isNode())
        for (var o = s.connectedEdges(), u = 0; u < o.length; u++) {
          var l = o[u], f = l.source(), h = l.target();
          e.outgoing && f === s ? (n.push(l), n.push(h)) : e.incoming && h === s && (n.push(l), n.push(f));
        }
    }
    return this.spawn(n, !0).filter(r);
  };
}, Es = function(e) {
  return function(r) {
    for (var a = this, n = [], i = {}; ; ) {
      var s = e.outgoing ? a.outgoers() : a.incomers();
      if (s.length === 0)
        break;
      for (var o = !1, u = 0; u < s.length; u++) {
        var l = s[u], f = l.id();
        i[f] || (i[f] = !0, n.push(l), o = !0);
      }
      if (!o)
        break;
      a = s;
    }
    return this.spawn(n, !0).filter(r);
  };
};
et.clearTraversalCache = function() {
  for (var t = 0; t < this.length; t++)
    this[t]._private.traversalCache = null;
};
ce(et, {
  // get the root nodes in the DAG
  roots: ms({
    noIncomingEdges: !0
  }),
  // get the leaf nodes in the DAG
  leaves: ms({
    noOutgoingEdges: !0
  }),
  // normally called children in graph theory
  // these nodes =edges=> outgoing nodes
  outgoers: dt(bs({
    outgoing: !0
  }), "outgoers"),
  // aka DAG descendants
  successors: Es({
    outgoing: !0
  }),
  // normally called parents in graph theory
  // these nodes <=edges= incoming nodes
  incomers: dt(bs({
    incoming: !0
  }), "incomers"),
  // aka DAG ancestors
  predecessors: Es({
    incoming: !0
  })
});
ce(et, {
  neighborhood: dt(function(t) {
    for (var e = [], r = this.nodes(), a = 0; a < r.length; a++)
      for (var n = r[a], i = n.connectedEdges(), s = 0; s < i.length; s++) {
        var o = i[s], u = o.source(), l = o.target(), f = n === u ? l : u;
        f.length > 0 && e.push(f[0]), e.push(o[0]);
      }
    return this.spawn(e, !0).filter(t);
  }, "neighborhood"),
  closedNeighborhood: function(e) {
    return this.neighborhood().add(this).filter(e);
  },
  openNeighborhood: function(e) {
    return this.neighborhood(e);
  }
});
et.neighbourhood = et.neighborhood;
et.closedNeighbourhood = et.closedNeighborhood;
et.openNeighbourhood = et.openNeighborhood;
ce(et, {
  source: dt(function(e) {
    var r = this[0], a;
    return r && (a = r._private.source || r.cy().collection()), a && e ? a.filter(e) : a;
  }, "source"),
  target: dt(function(e) {
    var r = this[0], a;
    return r && (a = r._private.target || r.cy().collection()), a && e ? a.filter(e) : a;
  }, "target"),
  sources: ws({
    attr: "source"
  }),
  targets: ws({
    attr: "target"
  })
});
function ws(t) {
  return function(r) {
    for (var a = [], n = 0; n < this.length; n++) {
      var i = this[n], s = i._private[t.attr];
      s && a.push(s);
    }
    return this.spawn(a, !0).filter(r);
  };
}
ce(et, {
  edgesWith: dt(xs(), "edgesWith"),
  edgesTo: dt(xs({
    thisIsSrc: !0
  }), "edgesTo")
});
function xs(t) {
  return function(r) {
    var a = [], n = this._private.cy, i = t || {};
    le(r) && (r = n.$(r));
    for (var s = 0; s < r.length; s++)
      for (var o = r[s]._private.edges, u = 0; u < o.length; u++) {
        var l = o[u], f = l._private.data, h = this.hasElementWithId(f.source) && r.hasElementWithId(f.target), c = r.hasElementWithId(f.source) && this.hasElementWithId(f.target), v = h || c;
        v && ((i.thisIsSrc || i.thisIsTgt) && (i.thisIsSrc && !h || i.thisIsTgt && !c) || a.push(l));
      }
    return this.spawn(a, !0);
  };
}
ce(et, {
  connectedEdges: dt(function(t) {
    for (var e = [], r = this, a = 0; a < r.length; a++) {
      var n = r[a];
      if (n.isNode())
        for (var i = n._private.edges, s = 0; s < i.length; s++) {
          var o = i[s];
          e.push(o);
        }
    }
    return this.spawn(e, !0).filter(t);
  }, "connectedEdges"),
  connectedNodes: dt(function(t) {
    for (var e = [], r = this, a = 0; a < r.length; a++) {
      var n = r[a];
      n.isEdge() && (e.push(n.source()[0]), e.push(n.target()[0]));
    }
    return this.spawn(e, !0).filter(t);
  }, "connectedNodes"),
  parallelEdges: dt(Ts(), "parallelEdges"),
  codirectedEdges: dt(Ts({
    codirected: !0
  }), "codirectedEdges")
});
function Ts(t) {
  var e = {
    codirected: !1
  };
  return t = ce({}, e, t), function(a) {
    for (var n = [], i = this.edges(), s = t, o = 0; o < i.length; o++)
      for (var u = i[o], l = u._private, f = l.source, h = f._private.data.id, c = l.data.target, v = f._private.edges, d = 0; d < v.length; d++) {
        var g = v[d], y = g._private.data, p = y.target, E = y.source, m = p === c && E === h, T = h === p && c === E;
        (s.codirected && m || !s.codirected && (m || T)) && n.push(g);
      }
    return this.spawn(n, !0).filter(a);
  };
}
ce(et, {
  components: function(e) {
    var r = this, a = r.cy(), n = a.collection(), i = e == null ? r.nodes() : e.nodes(), s = [];
    e != null && i.empty() && (i = e.sources());
    var o = function(f, h) {
      n.merge(f), i.unmerge(f), h.merge(f);
    };
    if (i.empty())
      return r.spawn();
    var u = function() {
      var f = a.collection();
      s.push(f);
      var h = i[0];
      o(h, f), r.bfs({
        directed: !1,
        roots: h,
        visit: function(v) {
          return o(v, f);
        }
      }), f.forEach(function(c) {
        c.connectedEdges().forEach(function(v) {
          r.has(v) && f.has(v.source()) && f.has(v.target()) && f.merge(v);
        });
      });
    };
    do
      u();
    while (i.length > 0);
    return s;
  },
  component: function() {
    var e = this[0];
    return e.cy().mutableElements().components(e)[0];
  }
});
et.componentsOf = et.components;
var Ke = function(e, r) {
  var a = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !1, n = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : !1;
  if (e === void 0) {
    ze("A collection must have a reference to the core");
    return;
  }
  var i = new Dt(), s = !1;
  if (!r)
    r = [];
  else if (r.length > 0 && Te(r[0]) && !ga(r[0])) {
    s = !0;
    for (var o = [], u = new Ir(), l = 0, f = r.length; l < f; l++) {
      var h = r[l];
      h.data == null && (h.data = {});
      var c = h.data;
      if (c.id == null)
        c.id = wo();
      else if (e.hasElementWithId(c.id) || u.has(c.id))
        continue;
      var v = new un(e, h, !1);
      o.push(v), u.add(c.id);
    }
    r = o;
  }
  this.length = 0;
  for (var d = 0, g = r.length; d < g; d++) {
    var y = r[d][0];
    if (y != null) {
      var p = y._private.data.id;
      (!a || !i.has(p)) && (a && i.set(p, {
        index: this.length,
        ele: y
      }), this[this.length] = y, this.length++);
    }
  }
  this._private = {
    eles: this,
    cy: e,
    get map() {
      return this.lazyMap == null && this.rebuildMap(), this.lazyMap;
    },
    set map(E) {
      this.lazyMap = E;
    },
    rebuildMap: function() {
      for (var m = this.lazyMap = new Dt(), T = this.eles, C = 0; C < T.length; C++) {
        var S = T[C];
        m.set(S.id(), {
          index: C,
          ele: S
        });
      }
    }
  }, a && (this._private.map = i), s && !n && this.restore();
}, ke = un.prototype = Ke.prototype = Object.create(Array.prototype);
ke.instanceString = function() {
  return "collection";
};
ke.spawn = function(t, e) {
  return new Ke(this.cy(), t, e);
};
ke.spawnSelf = function() {
  return this.spawn(this);
};
ke.cy = function() {
  return this._private.cy;
};
ke.renderer = function() {
  return this._private.cy.renderer();
};
ke.element = function() {
  return this[0];
};
ke.collection = function() {
  return uo(this) ? this : new Ke(this._private.cy, [this]);
};
ke.unique = function() {
  return new Ke(this._private.cy, this, !0);
};
ke.hasElementWithId = function(t) {
  return t = "" + t, this._private.map.has(t);
};
ke.getElementById = function(t) {
  t = "" + t;
  var e = this._private.cy, r = this._private.map.get(t);
  return r ? r.ele : new Ke(e);
};
ke.$id = ke.getElementById;
ke.poolIndex = function() {
  var t = this._private.cy, e = t._private.elements, r = this[0]._private.data.id;
  return e._private.map.get(r).index;
};
ke.indexOf = function(t) {
  var e = t[0]._private.data.id;
  return this._private.map.get(e).index;
};
ke.indexOfId = function(t) {
  return t = "" + t, this._private.map.get(t).index;
};
ke.json = function(t) {
  var e = this.element(), r = this.cy();
  if (e == null && t)
    return this;
  if (e != null) {
    var a = e._private;
    if (Te(t)) {
      if (r.startBatch(), t.data) {
        e.data(t.data);
        var n = a.data;
        if (e.isEdge()) {
          var i = !1, s = {}, o = t.data.source, u = t.data.target;
          o != null && o != n.source && (s.source = "" + o, i = !0), u != null && u != n.target && (s.target = "" + u, i = !0), i && (e = e.move(s));
        } else {
          var l = "parent" in t.data, f = t.data.parent;
          l && (f != null || n.parent != null) && f != n.parent && (f === void 0 && (f = null), f != null && (f = "" + f), e = e.move({
            parent: f
          }));
        }
      }
      t.position && e.position(t.position);
      var h = function(g, y, p) {
        var E = t[g];
        E != null && E !== a[g] && (E ? e[y]() : e[p]());
      };
      return h("removed", "remove", "restore"), h("selected", "select", "unselect"), h("selectable", "selectify", "unselectify"), h("locked", "lock", "unlock"), h("grabbable", "grabify", "ungrabify"), h("pannable", "panify", "unpanify"), t.classes != null && e.classes(t.classes), r.endBatch(), this;
    } else if (t === void 0) {
      var c = {
        data: Ct(a.data),
        position: Ct(a.position),
        group: a.group,
        removed: a.removed,
        selected: a.selected,
        selectable: a.selectable,
        locked: a.locked,
        grabbable: a.grabbable,
        pannable: a.pannable,
        classes: null
      };
      c.classes = "";
      var v = 0;
      return a.classes.forEach(function(d) {
        return c.classes += v++ === 0 ? d : " " + d;
      }), c;
    }
  }
};
ke.jsons = function() {
  for (var t = [], e = 0; e < this.length; e++) {
    var r = this[e], a = r.json();
    t.push(a);
  }
  return t;
};
ke.clone = function() {
  for (var t = this.cy(), e = [], r = 0; r < this.length; r++) {
    var a = this[r], n = a.json(), i = new un(t, n, !1);
    e.push(i);
  }
  return new Ke(t, e);
};
ke.copy = ke.clone;
ke.restore = function() {
  for (var t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !0, e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0, r = this, a = r.cy(), n = a._private, i = [], s = [], o, u = 0, l = r.length; u < l; u++) {
    var f = r[u];
    e && !f.removed() || (f.isNode() ? i.push(f) : s.push(f));
  }
  o = i.concat(s);
  var h, c = function() {
    o.splice(h, 1), h--;
  };
  for (h = 0; h < o.length; h++) {
    var v = o[h], d = v._private, g = d.data;
    if (v.clearTraversalCache(), !(!e && !d.removed)) {
      if (g.id === void 0)
        g.id = wo();
      else if (ae(g.id))
        g.id = "" + g.id;
      else if (Yt(g.id) || !le(g.id)) {
        ze("Can not create element with invalid string ID `" + g.id + "`"), c();
        continue;
      } else if (a.hasElementWithId(g.id)) {
        ze("Can not create second element with ID `" + g.id + "`"), c();
        continue;
      }
    }
    var y = g.id;
    if (v.isNode()) {
      var p = d.position;
      p.x == null && (p.x = 0), p.y == null && (p.y = 0);
    }
    if (v.isEdge()) {
      for (var E = v, m = ["source", "target"], T = m.length, C = !1, S = 0; S < T; S++) {
        var b = m[S], x = g[b];
        ae(x) && (x = g[b] = "" + g[b]), x == null || x === "" ? (ze("Can not create edge `" + y + "` with unspecified " + b), C = !0) : a.hasElementWithId(x) || (ze("Can not create edge `" + y + "` with nonexistant " + b + " `" + x + "`"), C = !0);
      }
      if (C) {
        c();
        continue;
      }
      var w = a.getElementById(g.source), D = a.getElementById(g.target);
      w.same(D) ? w._private.edges.push(E) : (w._private.edges.push(E), D._private.edges.push(E)), E._private.source = w, E._private.target = D;
    }
    d.map = new Dt(), d.map.set(y, {
      ele: v,
      index: 0
    }), d.removed = !1, e && a.addToPool(v);
  }
  for (var A = 0; A < i.length; A++) {
    var L = i[A], M = L._private.data;
    ae(M.parent) && (M.parent = "" + M.parent);
    var O = M.parent, P = O != null;
    if (P || L._private.parent) {
      var I = L._private.parent ? a.collection().merge(L._private.parent) : a.getElementById(O);
      if (I.empty())
        M.parent = void 0;
      else if (I[0].removed())
        Ae("Node added with missing parent, reference to parent removed"), M.parent = void 0, L._private.parent = null;
      else {
        for (var k = !1, R = I; !R.empty(); ) {
          if (L.same(R)) {
            k = !0, M.parent = void 0;
            break;
          }
          R = R.parent();
        }
        k || (I[0]._private.children.push(L), L._private.parent = I[0], n.hasCompoundNodes = !0);
      }
    }
  }
  if (o.length > 0) {
    for (var B = o.length === r.length ? r : new Ke(a, o), z = 0; z < B.length; z++) {
      var F = B[z];
      F.isNode() || (F.parallelEdges().clearTraversalCache(), F.source().clearTraversalCache(), F.target().clearTraversalCache());
    }
    var $;
    n.hasCompoundNodes ? $ = a.collection().merge(B).merge(B.connectedNodes()).merge(B.parent()) : $ = B, $.dirtyCompoundBoundsCache().dirtyBoundingBoxCache().updateStyle(t), t ? B.emitAndNotify("add") : e && B.emit("add");
  }
  return r;
};
ke.removed = function() {
  var t = this[0];
  return t && t._private.removed;
};
ke.inside = function() {
  var t = this[0];
  return t && !t._private.removed;
};
ke.remove = function() {
  var t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !0, e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0, r = this, a = [], n = {}, i = r._private.cy;
  function s(O) {
    for (var P = O._private.edges, I = 0; I < P.length; I++)
      u(P[I]);
  }
  function o(O) {
    for (var P = O._private.children, I = 0; I < P.length; I++)
      u(P[I]);
  }
  function u(O) {
    var P = n[O.id()];
    e && O.removed() || P || (n[O.id()] = !0, O.isNode() ? (a.push(O), s(O), o(O)) : a.unshift(O));
  }
  for (var l = 0, f = r.length; l < f; l++) {
    var h = r[l];
    u(h);
  }
  function c(O, P) {
    var I = O._private.edges;
    Ht(I, P), O.clearTraversalCache();
  }
  function v(O) {
    O.clearTraversalCache();
  }
  var d = [];
  d.ids = {};
  function g(O, P) {
    P = P[0], O = O[0];
    var I = O._private.children, k = O.id();
    Ht(I, P), P._private.parent = null, d.ids[k] || (d.ids[k] = !0, d.push(O));
  }
  r.dirtyCompoundBoundsCache(), e && i.removeFromPool(a);
  for (var y = 0; y < a.length; y++) {
    var p = a[y];
    if (p.isEdge()) {
      var E = p.source()[0], m = p.target()[0];
      c(E, p), c(m, p);
      for (var T = p.parallelEdges(), C = 0; C < T.length; C++) {
        var S = T[C];
        v(S), S.isBundledBezier() && S.dirtyBoundingBoxCache();
      }
    } else {
      var b = p.parent();
      b.length !== 0 && g(b, p);
    }
    e && (p._private.removed = !0);
  }
  var x = i._private.elements;
  i._private.hasCompoundNodes = !1;
  for (var w = 0; w < x.length; w++) {
    var D = x[w];
    if (D.isParent()) {
      i._private.hasCompoundNodes = !0;
      break;
    }
  }
  var A = new Ke(this.cy(), a);
  A.size() > 0 && (t ? A.emitAndNotify("remove") : e && A.emit("remove"));
  for (var L = 0; L < d.length; L++) {
    var M = d[L];
    (!e || !M.removed()) && M.updateStyle();
  }
  return A;
};
ke.move = function(t) {
  var e = this._private.cy, r = this, a = !1, n = !1, i = function(d) {
    return d == null ? d : "" + d;
  };
  if (t.source !== void 0 || t.target !== void 0) {
    var s = i(t.source), o = i(t.target), u = s != null && e.hasElementWithId(s), l = o != null && e.hasElementWithId(o);
    (u || l) && (e.batch(function() {
      r.remove(a, n), r.emitAndNotify("moveout");
      for (var v = 0; v < r.length; v++) {
        var d = r[v], g = d._private.data;
        d.isEdge() && (u && (g.source = s), l && (g.target = o));
      }
      r.restore(a, n);
    }), r.emitAndNotify("move"));
  } else if (t.parent !== void 0) {
    var f = i(t.parent), h = f === null || e.hasElementWithId(f);
    if (h) {
      var c = f === null ? void 0 : f;
      e.batch(function() {
        var v = r.remove(a, n);
        v.emitAndNotify("moveout");
        for (var d = 0; d < r.length; d++) {
          var g = r[d], y = g._private.data;
          g.isNode() && (y.parent = c);
        }
        v.restore(a, n);
      }), r.emitAndNotify("move");
    }
  }
  return this;
};
[Po, lp, Fa, _t, Ar, Dp, hn, $p, jo, eu, Hp, qa, Ga, We, Ut, et].forEach(function(t) {
  ce(ke, t);
});
var Jp = {
  add: function(e) {
    var r, a = this;
    if (ft(e)) {
      var n = e;
      if (n._private.cy === a)
        r = n.restore();
      else {
        for (var i = [], s = 0; s < n.length; s++) {
          var o = n[s];
          i.push(o.json());
        }
        r = new Ke(a, i);
      }
    } else if (Ie(e)) {
      var u = e;
      r = new Ke(a, u);
    } else if (Te(e) && (Ie(e.nodes) || Ie(e.edges))) {
      for (var l = e, f = [], h = ["nodes", "edges"], c = 0, v = h.length; c < v; c++) {
        var d = h[c], g = l[d];
        if (Ie(g))
          for (var y = 0, p = g.length; y < p; y++) {
            var E = ce({
              group: d
            }, g[y]);
            f.push(E);
          }
      }
      r = new Ke(a, f);
    } else {
      var m = e;
      r = new un(a, m).collection();
    }
    return r;
  },
  remove: function(e) {
    if (!ft(e)) {
      if (le(e)) {
        var r = e;
        e = this.$(r);
      }
    }
    return e.remove();
  }
};
/*! Bezier curve function generator. Copyright Gaetan Renaudeau. MIT License: http://en.wikipedia.org/wiki/MIT_License */
function jp(t, e, r, a) {
  var n = 4, i = 1e-3, s = 1e-7, o = 10, u = 11, l = 1 / (u - 1), f = typeof Float32Array < "u";
  if (arguments.length !== 4)
    return !1;
  for (var h = 0; h < 4; ++h)
    if (typeof arguments[h] != "number" || isNaN(arguments[h]) || !isFinite(arguments[h]))
      return !1;
  t = Math.min(t, 1), r = Math.min(r, 1), t = Math.max(t, 0), r = Math.max(r, 0);
  var c = f ? new Float32Array(u) : new Array(u);
  function v(D, A) {
    return 1 - 3 * A + 3 * D;
  }
  function d(D, A) {
    return 3 * A - 6 * D;
  }
  function g(D) {
    return 3 * D;
  }
  function y(D, A, L) {
    return ((v(A, L) * D + d(A, L)) * D + g(A)) * D;
  }
  function p(D, A, L) {
    return 3 * v(A, L) * D * D + 2 * d(A, L) * D + g(A);
  }
  function E(D, A) {
    for (var L = 0; L < n; ++L) {
      var M = p(A, t, r);
      if (M === 0)
        return A;
      var O = y(A, t, r) - D;
      A -= O / M;
    }
    return A;
  }
  function m() {
    for (var D = 0; D < u; ++D)
      c[D] = y(D * l, t, r);
  }
  function T(D, A, L) {
    var M, O, P = 0;
    do
      O = A + (L - A) / 2, M = y(O, t, r) - D, M > 0 ? L = O : A = O;
    while (Math.abs(M) > s && ++P < o);
    return O;
  }
  function C(D) {
    for (var A = 0, L = 1, M = u - 1; L !== M && c[L] <= D; ++L)
      A += l;
    --L;
    var O = (D - c[L]) / (c[L + 1] - c[L]), P = A + O * l, I = p(P, t, r);
    return I >= i ? E(D, P) : I === 0 ? P : T(D, A, A + l);
  }
  var S = !1;
  function b() {
    S = !0, (t !== e || r !== a) && m();
  }
  var x = function(A) {
    return S || b(), t === e && r === a ? A : A === 0 ? 0 : A === 1 ? 1 : y(C(A), e, a);
  };
  x.getControlPoints = function() {
    return [{
      x: t,
      y: e
    }, {
      x: r,
      y: a
    }];
  };
  var w = "generateBezier(" + [t, e, r, a] + ")";
  return x.toString = function() {
    return w;
  }, x;
}
/*! Runge-Kutta spring physics function generator. Adapted from Framer.js, copyright Koen Bok. MIT License: http://en.wikipedia.org/wiki/MIT_License */
var ey = function() {
  function t(a) {
    return -a.tension * a.x - a.friction * a.v;
  }
  function e(a, n, i) {
    var s = {
      x: a.x + i.dx * n,
      v: a.v + i.dv * n,
      tension: a.tension,
      friction: a.friction
    };
    return {
      dx: s.v,
      dv: t(s)
    };
  }
  function r(a, n) {
    var i = {
      dx: a.v,
      dv: t(a)
    }, s = e(a, n * 0.5, i), o = e(a, n * 0.5, s), u = e(a, n, o), l = 1 / 6 * (i.dx + 2 * (s.dx + o.dx) + u.dx), f = 1 / 6 * (i.dv + 2 * (s.dv + o.dv) + u.dv);
    return a.x = a.x + l * n, a.v = a.v + f * n, a;
  }
  return function a(n, i, s) {
    var o = {
      x: -1,
      v: 0,
      tension: null,
      friction: null
    }, u = [0], l = 0, f = 1 / 1e4, h = 16 / 1e3, c, v, d;
    for (n = parseFloat(n) || 500, i = parseFloat(i) || 20, s = s || null, o.tension = n, o.friction = i, c = s !== null, c ? (l = a(n, i), v = l / s * h) : v = h; d = r(d || o, v), u.push(1 + d.x), l += 16, Math.abs(d.x) > f && Math.abs(d.v) > f; )
      ;
    return c ? function(g) {
      return u[g * (u.length - 1) | 0];
    } : l;
  };
}(), Re = function(e, r, a, n) {
  var i = jp(e, r, a, n);
  return function(s, o, u) {
    return s + (o - s) * i(u);
  };
}, za = {
  linear: function(e, r, a) {
    return e + (r - e) * a;
  },
  // default easings
  ease: Re(0.25, 0.1, 0.25, 1),
  "ease-in": Re(0.42, 0, 1, 1),
  "ease-out": Re(0, 0, 0.58, 1),
  "ease-in-out": Re(0.42, 0, 0.58, 1),
  // sine
  "ease-in-sine": Re(0.47, 0, 0.745, 0.715),
  "ease-out-sine": Re(0.39, 0.575, 0.565, 1),
  "ease-in-out-sine": Re(0.445, 0.05, 0.55, 0.95),
  // quad
  "ease-in-quad": Re(0.55, 0.085, 0.68, 0.53),
  "ease-out-quad": Re(0.25, 0.46, 0.45, 0.94),
  "ease-in-out-quad": Re(0.455, 0.03, 0.515, 0.955),
  // cubic
  "ease-in-cubic": Re(0.55, 0.055, 0.675, 0.19),
  "ease-out-cubic": Re(0.215, 0.61, 0.355, 1),
  "ease-in-out-cubic": Re(0.645, 0.045, 0.355, 1),
  // quart
  "ease-in-quart": Re(0.895, 0.03, 0.685, 0.22),
  "ease-out-quart": Re(0.165, 0.84, 0.44, 1),
  "ease-in-out-quart": Re(0.77, 0, 0.175, 1),
  // quint
  "ease-in-quint": Re(0.755, 0.05, 0.855, 0.06),
  "ease-out-quint": Re(0.23, 1, 0.32, 1),
  "ease-in-out-quint": Re(0.86, 0, 0.07, 1),
  // expo
  "ease-in-expo": Re(0.95, 0.05, 0.795, 0.035),
  "ease-out-expo": Re(0.19, 1, 0.22, 1),
  "ease-in-out-expo": Re(1, 0, 0, 1),
  // circ
  "ease-in-circ": Re(0.6, 0.04, 0.98, 0.335),
  "ease-out-circ": Re(0.075, 0.82, 0.165, 1),
  "ease-in-out-circ": Re(0.785, 0.135, 0.15, 0.86),
  // user param easings...
  spring: function(e, r, a) {
    if (a === 0)
      return za.linear;
    var n = ey(e, r, a);
    return function(i, s, o) {
      return i + (s - i) * n(o);
    };
  },
  "cubic-bezier": Re
};
function Cs(t, e, r, a, n) {
  if (a === 1 || e === r)
    return r;
  var i = n(e, r, a);
  return t == null || ((t.roundValue || t.color) && (i = Math.round(i)), t.min !== void 0 && (i = Math.max(i, t.min)), t.max !== void 0 && (i = Math.min(i, t.max))), i;
}
function Ds(t, e) {
  return t.pfValue != null || t.value != null ? t.pfValue != null && (e == null || e.type.units !== "%") ? t.pfValue : t.value : t;
}
function pr(t, e, r, a, n) {
  var i = n != null ? n.type : null;
  r < 0 ? r = 0 : r > 1 && (r = 1);
  var s = Ds(t, n), o = Ds(e, n);
  if (ae(s) && ae(o))
    return Cs(i, s, o, r, a);
  if (Ie(s) && Ie(o)) {
    for (var u = [], l = 0; l < o.length; l++) {
      var f = s[l], h = o[l];
      if (f != null && h != null) {
        var c = Cs(i, f, h, r, a);
        u.push(c);
      } else
        u.push(h);
    }
    return u;
  }
}
function ty(t, e, r, a) {
  var n = !a, i = t._private, s = e._private, o = s.easing, u = s.startTime, l = a ? t : t.cy(), f = l.style();
  if (!s.easingImpl)
    if (o == null)
      s.easingImpl = za.linear;
    else {
      var h;
      if (le(o)) {
        var c = f.parse("transition-timing-function", o);
        h = c.value;
      } else
        h = o;
      var v, d;
      le(h) ? (v = h, d = []) : (v = h[1], d = h.slice(2).map(function(B) {
        return +B;
      })), d.length > 0 ? (v === "spring" && d.push(s.duration), s.easingImpl = za[v].apply(null, d)) : s.easingImpl = za[v];
    }
  var g = s.easingImpl, y;
  if (s.duration === 0 ? y = 1 : y = (r - u) / s.duration, s.applying && (y = s.progress), y < 0 ? y = 0 : y > 1 && (y = 1), s.delay == null) {
    var p = s.startPosition, E = s.position;
    if (E && n && !t.locked()) {
      var m = {};
      Hr(p.x, E.x) && (m.x = pr(p.x, E.x, y, g)), Hr(p.y, E.y) && (m.y = pr(p.y, E.y, y, g)), t.position(m);
    }
    var T = s.startPan, C = s.pan, S = i.pan, b = C != null && a;
    b && (Hr(T.x, C.x) && (S.x = pr(T.x, C.x, y, g)), Hr(T.y, C.y) && (S.y = pr(T.y, C.y, y, g)), t.emit("pan"));
    var x = s.startZoom, w = s.zoom, D = w != null && a;
    D && (Hr(x, w) && (i.zoom = ia(i.minZoom, pr(x, w, y, g), i.maxZoom)), t.emit("zoom")), (b || D) && t.emit("viewport");
    var A = s.style;
    if (A && A.length > 0 && n) {
      for (var L = 0; L < A.length; L++) {
        var M = A[L], O = M.name, P = M, I = s.startStyle[O], k = f.properties[I.name], R = pr(I, P, y, g, k);
        f.overrideBypass(t, O, R);
      }
      t.emit("style");
    }
  }
  return s.progress = y, y;
}
function Hr(t, e) {
  return t == null || e == null ? !1 : ae(t) && ae(e) ? !0 : !!(t && e);
}
function ry(t, e, r, a) {
  var n = e._private;
  n.started = !0, n.startTime = r - n.progress * n.duration;
}
function Ss(t, e) {
  var r = e._private.aniEles, a = [];
  function n(f, h) {
    var c = f._private, v = c.animation.current, d = c.animation.queue, g = !1;
    if (v.length === 0) {
      var y = d.shift();
      y && v.push(y);
    }
    for (var p = function(S) {
      for (var b = S.length - 1; b >= 0; b--) {
        var x = S[b];
        x();
      }
      S.splice(0, S.length);
    }, E = v.length - 1; E >= 0; E--) {
      var m = v[E], T = m._private;
      if (T.stopped) {
        v.splice(E, 1), T.hooked = !1, T.playing = !1, T.started = !1, p(T.frames);
        continue;
      }
      !T.playing && !T.applying || (T.playing && T.applying && (T.applying = !1), T.started || ry(f, m, t), ty(f, m, t, h), T.applying && (T.applying = !1), p(T.frames), T.step != null && T.step(t), m.completed() && (v.splice(E, 1), T.hooked = !1, T.playing = !1, T.started = !1, p(T.completes)), g = !0);
    }
    return !h && v.length === 0 && d.length === 0 && a.push(f), g;
  }
  for (var i = !1, s = 0; s < r.length; s++) {
    var o = r[s], u = n(o);
    i = i || u;
  }
  var l = n(e, !0);
  (i || l) && (r.length > 0 ? e.notify("draw", r) : e.notify("draw")), r.unmerge(a), e.emit("step");
}
var ay = {
  // pull in animation functions
  animate: Le.animate(),
  animation: Le.animation(),
  animated: Le.animated(),
  clearQueue: Le.clearQueue(),
  delay: Le.delay(),
  delayAnimation: Le.delayAnimation(),
  stop: Le.stop(),
  addToAnimationPool: function(e) {
    var r = this;
    r.styleEnabled() && r._private.aniEles.merge(e);
  },
  stopAnimationLoop: function() {
    this._private.animationsRunning = !1;
  },
  startAnimationLoop: function() {
    var e = this;
    if (e._private.animationsRunning = !0, !e.styleEnabled())
      return;
    function r() {
      e._private.animationsRunning && Ya(function(i) {
        Ss(i, e), r();
      });
    }
    var a = e.renderer();
    a && a.beforeRender ? a.beforeRender(function(i, s) {
      Ss(s, e);
    }, a.beforeRenderPriorities.animations) : r();
  }
}, ny = {
  qualifierCompare: function(e, r) {
    return e == null || r == null ? e == null && r == null : e.sameText(r);
  },
  eventMatches: function(e, r, a) {
    var n = r.qualifier;
    return n != null ? e !== a.target && ga(a.target) && n.matches(a.target) : !0;
  },
  addEventFields: function(e, r) {
    r.cy = e, r.target = e;
  },
  callbackContext: function(e, r, a) {
    return r.qualifier != null ? a.target : e;
  }
}, ka = function(e) {
  return le(e) ? new Xt(e) : e;
}, au = {
  createEmitter: function() {
    var e = this._private;
    return e.emitter || (e.emitter = new vn(ny, this)), this;
  },
  emitter: function() {
    return this._private.emitter;
  },
  on: function(e, r, a) {
    return this.emitter().on(e, ka(r), a), this;
  },
  removeListener: function(e, r, a) {
    return this.emitter().removeListener(e, ka(r), a), this;
  },
  removeAllListeners: function() {
    return this.emitter().removeAllListeners(), this;
  },
  one: function(e, r, a) {
    return this.emitter().one(e, ka(r), a), this;
  },
  once: function(e, r, a) {
    return this.emitter().one(e, ka(r), a), this;
  },
  emit: function(e, r) {
    return this.emitter().emit(e, r), this;
  },
  emitAndNotify: function(e, r) {
    return this.emit(e), this.notify(e, r), this;
  }
};
Le.eventAliasesOn(au);
var Yn = {
  png: function(e) {
    var r = this._private.renderer;
    return e = e || {}, r.png(e);
  },
  jpg: function(e) {
    var r = this._private.renderer;
    return e = e || {}, e.bg = e.bg || "#fff", r.jpg(e);
  }
};
Yn.jpeg = Yn.jpg;
var $a = {
  layout: function(e) {
    var r = this;
    if (e == null) {
      ze("Layout options must be specified to make a layout");
      return;
    }
    if (e.name == null) {
      ze("A `name` must be specified to make a layout");
      return;
    }
    var a = e.name, n = r.extension("layout", a);
    if (n == null) {
      ze("No such layout `" + a + "` found.  Did you forget to import it and `cytoscape.use()` it?");
      return;
    }
    var i;
    le(e.eles) ? i = r.$(e.eles) : i = e.eles != null ? e.eles : r.$();
    var s = new n(ce({}, e, {
      cy: r,
      eles: i
    }));
    return s;
  }
};
$a.createLayout = $a.makeLayout = $a.layout;
var iy = {
  notify: function(e, r) {
    var a = this._private;
    if (this.batching()) {
      a.batchNotifications = a.batchNotifications || {};
      var n = a.batchNotifications[e] = a.batchNotifications[e] || this.collection();
      r != null && n.merge(r);
      return;
    }
    if (a.notificationsEnabled) {
      var i = this.renderer();
      this.destroyed() || !i || i.notify(e, r);
    }
  },
  notifications: function(e) {
    var r = this._private;
    return e === void 0 ? r.notificationsEnabled : (r.notificationsEnabled = !!e, this);
  },
  noNotifications: function(e) {
    this.notifications(!1), e(), this.notifications(!0);
  },
  batching: function() {
    return this._private.batchCount > 0;
  },
  startBatch: function() {
    var e = this._private;
    return e.batchCount == null && (e.batchCount = 0), e.batchCount === 0 && (e.batchStyleEles = this.collection(), e.batchNotifications = {}), e.batchCount++, this;
  },
  endBatch: function() {
    var e = this._private;
    if (e.batchCount === 0)
      return this;
    if (e.batchCount--, e.batchCount === 0) {
      e.batchStyleEles.updateStyle();
      var r = this.renderer();
      Object.keys(e.batchNotifications).forEach(function(a) {
        var n = e.batchNotifications[a];
        n.empty() ? r.notify(a) : r.notify(a, n);
      });
    }
    return this;
  },
  batch: function(e) {
    return this.startBatch(), e(), this.endBatch(), this;
  },
  // for backwards compatibility
  batchData: function(e) {
    var r = this;
    return this.batch(function() {
      for (var a = Object.keys(e), n = 0; n < a.length; n++) {
        var i = a[n], s = e[i], o = r.getElementById(i);
        o.data(s);
      }
    });
  }
}, sy = Ze({
  hideEdgesOnViewport: !1,
  textureOnViewport: !1,
  motionBlur: !1,
  motionBlurOpacity: 0.05,
  pixelRatio: void 0,
  desktopTapThreshold: 4,
  touchTapThreshold: 8,
  wheelSensitivity: 1,
  debug: !1,
  showFps: !1
}), Hn = {
  renderTo: function(e, r, a, n) {
    var i = this._private.renderer;
    return i.renderTo(e, r, a, n), this;
  },
  renderer: function() {
    return this._private.renderer;
  },
  forceRender: function() {
    return this.notify("draw"), this;
  },
  resize: function() {
    return this.invalidateSize(), this.emitAndNotify("resize"), this;
  },
  initRenderer: function(e) {
    var r = this, a = r.extension("renderer", e.name);
    if (a == null) {
      ze("Can not initialise: No such renderer `".concat(e.name, "` found. Did you forget to import it and `cytoscape.use()` it?"));
      return;
    }
    e.wheelSensitivity !== void 0 && Ae("You have set a custom wheel sensitivity.  This will make your app zoom unnaturally when using mainstream mice.  You should change this value from the default only if you can guarantee that all your users will use the same hardware and OS configuration as your current machine.");
    var n = sy(e);
    n.cy = r, r._private.renderer = new a(n), this.notify("init");
  },
  destroyRenderer: function() {
    var e = this;
    e.notify("destroy");
    var r = e.container();
    if (r)
      for (r._cyreg = null; r.childNodes.length > 0; )
        r.removeChild(r.childNodes[0]);
    e._private.renderer = null, e.mutableElements().forEach(function(a) {
      var n = a._private;
      n.rscratch = {}, n.rstyle = {}, n.animation.current = [], n.animation.queue = [];
    });
  },
  onRender: function(e) {
    return this.on("render", e);
  },
  offRender: function(e) {
    return this.off("render", e);
  }
};
Hn.invalidateDimensions = Hn.resize;
var Va = {
  // get a collection
  // - empty collection on no args
  // - collection of elements in the graph on selector arg
  // - guarantee a returned collection when elements or collection specified
  collection: function(e, r) {
    return le(e) ? this.$(e) : ft(e) ? e.collection() : Ie(e) ? (r || (r = {}), new Ke(this, e, r.unique, r.removed)) : new Ke(this);
  },
  nodes: function(e) {
    var r = this.$(function(a) {
      return a.isNode();
    });
    return e ? r.filter(e) : r;
  },
  edges: function(e) {
    var r = this.$(function(a) {
      return a.isEdge();
    });
    return e ? r.filter(e) : r;
  },
  // search the graph like jQuery
  $: function(e) {
    var r = this._private.elements;
    return e ? r.filter(e) : r.spawnSelf();
  },
  mutableElements: function() {
    return this._private.elements;
  }
};
Va.elements = Va.filter = Va.$;
var rt = {}, Qr = "t", oy = "f";
rt.apply = function(t) {
  for (var e = this, r = e._private, a = r.cy, n = a.collection(), i = 0; i < t.length; i++) {
    var s = t[i], o = e.getContextMeta(s);
    if (!o.empty) {
      var u = e.getContextStyle(o), l = e.applyContextStyle(o, u, s);
      s._private.appliedInitStyle ? e.updateTransitions(s, l.diffProps) : s._private.appliedInitStyle = !0;
      var f = e.updateStyleHints(s);
      f && n.push(s);
    }
  }
  return n;
};
rt.getPropertiesDiff = function(t, e) {
  var r = this, a = r._private.propDiffs = r._private.propDiffs || {}, n = t + "-" + e, i = a[n];
  if (i)
    return i;
  for (var s = [], o = {}, u = 0; u < r.length; u++) {
    var l = r[u], f = t[u] === Qr, h = e[u] === Qr, c = f !== h, v = l.mappedProperties.length > 0;
    if (c || h && v) {
      var d = void 0;
      c && v || c ? d = l.properties : v && (d = l.mappedProperties);
      for (var g = 0; g < d.length; g++) {
        for (var y = d[g], p = y.name, E = !1, m = u + 1; m < r.length; m++) {
          var T = r[m], C = e[m] === Qr;
          if (C && (E = T.properties[y.name] != null, E))
            break;
        }
        !o[p] && !E && (o[p] = !0, s.push(p));
      }
    }
  }
  return a[n] = s, s;
};
rt.getContextMeta = function(t) {
  for (var e = this, r = "", a, n = t._private.styleCxtKey || "", i = 0; i < e.length; i++) {
    var s = e[i], o = s.selector && s.selector.matches(t);
    o ? r += Qr : r += oy;
  }
  return a = e.getPropertiesDiff(n, r), t._private.styleCxtKey = r, {
    key: r,
    diffPropNames: a,
    empty: a.length === 0
  };
};
rt.getContextStyle = function(t) {
  var e = t.key, r = this, a = this._private.contextStyles = this._private.contextStyles || {};
  if (a[e])
    return a[e];
  for (var n = {
    _private: {
      key: e
    }
  }, i = 0; i < r.length; i++) {
    var s = r[i], o = e[i] === Qr;
    if (o)
      for (var u = 0; u < s.properties.length; u++) {
        var l = s.properties[u];
        n[l.name] = l;
      }
  }
  return a[e] = n, n;
};
rt.applyContextStyle = function(t, e, r) {
  for (var a = this, n = t.diffPropNames, i = {}, s = a.types, o = 0; o < n.length; o++) {
    var u = n[o], l = e[u], f = r.pstyle(u);
    if (!l)
      if (f)
        f.bypass ? l = {
          name: u,
          deleteBypassed: !0
        } : l = {
          name: u,
          delete: !0
        };
      else
        continue;
    if (f !== l) {
      if (l.mapped === s.fn && f != null && f.mapping != null && f.mapping.value === l.value) {
        var h = f.mapping, c = h.fnValue = l.value(r);
        if (c === h.prevFnValue)
          continue;
      }
      var v = i[u] = {
        prev: f
      };
      a.applyParsedProperty(r, l), v.next = r.pstyle(u), v.next && v.next.bypass && (v.next = v.next.bypassed);
    }
  }
  return {
    diffProps: i
  };
};
rt.updateStyleHints = function(t) {
  var e = t._private, r = this, a = r.propertyGroupNames, n = r.propertyGroupKeys, i = function(Z, te, he) {
    return r.getPropertiesHash(Z, te, he);
  }, s = e.styleKey;
  if (t.removed())
    return !1;
  var o = e.group === "nodes", u = t._private.style;
  a = Object.keys(u);
  for (var l = 0; l < n.length; l++) {
    var f = n[l];
    e.styleKeys[f] = [br, Xr];
  }
  for (var h = function(Z, te) {
    return e.styleKeys[te][0] = ra(Z, e.styleKeys[te][0]);
  }, c = function(Z, te) {
    return e.styleKeys[te][1] = aa(Z, e.styleKeys[te][1]);
  }, v = function(Z, te) {
    h(Z, te), c(Z, te);
  }, d = function(Z, te) {
    for (var he = 0; he < Z.length; he++) {
      var de = Z.charCodeAt(he);
      h(de, te), c(de, te);
    }
  }, g = 2e9, y = function(Z) {
    return -128 < Z && Z < 128 && Math.floor(Z) !== Z ? g - (Z * 1024 | 0) : Z;
  }, p = 0; p < a.length; p++) {
    var E = a[p], m = u[E];
    if (m != null) {
      var T = this.properties[E], C = T.type, S = T.groupKey, b = void 0;
      T.hashOverride != null ? b = T.hashOverride(t, m) : m.pfValue != null && (b = m.pfValue);
      var x = T.enums == null ? m.value : null, w = b != null, D = x != null, A = w || D, L = m.units;
      if (C.number && A && !C.multiple) {
        var M = w ? b : x;
        v(y(M), S), !w && L != null && d(L, S);
      } else
        d(m.strValue, S);
    }
  }
  for (var O = [br, Xr], P = 0; P < n.length; P++) {
    var I = n[P], k = e.styleKeys[I];
    O[0] = ra(k[0], O[0]), O[1] = aa(k[1], O[1]);
  }
  e.styleKey = wd(O[0], O[1]);
  var R = e.styleKeys;
  e.labelDimsKey = Ft(R.labelDimensions);
  var B = i(t, ["label"], R.labelDimensions);
  if (e.labelKey = Ft(B), e.labelStyleKey = Ft(Da(R.commonLabel, B)), !o) {
    var z = i(t, ["source-label"], R.labelDimensions);
    e.sourceLabelKey = Ft(z), e.sourceLabelStyleKey = Ft(Da(R.commonLabel, z));
    var F = i(t, ["target-label"], R.labelDimensions);
    e.targetLabelKey = Ft(F), e.targetLabelStyleKey = Ft(Da(R.commonLabel, F));
  }
  if (o) {
    var $ = e.styleKeys, U = $.nodeBody, V = $.nodeBorder, H = $.backgroundImage, Y = $.compound, G = $.pie, X = [U, V, H, Y, G].filter(function(K) {
      return K != null;
    }).reduce(Da, [br, Xr]);
    e.nodeKey = Ft(X), e.hasPie = G != null && G[0] !== br && G[1] !== Xr;
  }
  return s !== e.styleKey;
};
rt.clearStyleHints = function(t) {
  var e = t._private;
  e.styleCxtKey = "", e.styleKeys = {}, e.styleKey = null, e.labelKey = null, e.labelStyleKey = null, e.sourceLabelKey = null, e.sourceLabelStyleKey = null, e.targetLabelKey = null, e.targetLabelStyleKey = null, e.nodeKey = null, e.hasPie = null;
};
rt.applyParsedProperty = function(t, e) {
  var r = this, a = e, n = t._private.style, i, s = r.types, o = r.properties[a.name].type, u = a.bypass, l = n[a.name], f = l && l.bypass, h = t._private, c = "mapping", v = function(U) {
    return U == null ? null : U.pfValue != null ? U.pfValue : U.value;
  }, d = function() {
    var U = v(l), V = v(a);
    r.checkTriggers(t, a.name, U, V);
  };
  if (a && a.name.substr(0, 3) === "pie" && Ae("The pie style properties are deprecated.  Create charts using background images instead."), e.name === "curve-style" && t.isEdge() && // loops must be bundled beziers
  (e.value !== "bezier" && t.isLoop() || // edges connected to compound nodes can not be haystacks
  e.value === "haystack" && (t.source().isParent() || t.target().isParent())) && (a = e = this.parse(e.name, "bezier", u)), a.delete)
    return n[a.name] = void 0, d(), !0;
  if (a.deleteBypassed)
    return l ? l.bypass ? (l.bypassed = void 0, d(), !0) : !1 : (d(), !0);
  if (a.deleteBypass)
    return l ? l.bypass ? (n[a.name] = l.bypassed, d(), !0) : !1 : (d(), !0);
  var g = function() {
    Ae("Do not assign mappings to elements without corresponding data (i.e. ele `" + t.id() + "` has no mapping for property `" + a.name + "` with data field `" + a.field + "`); try a `[" + a.field + "]` selector to limit scope to elements with `" + a.field + "` defined");
  };
  switch (a.mapped) {
    case s.mapData: {
      for (var y = a.field.split("."), p = h.data, E = 0; E < y.length && p; E++) {
        var m = y[E];
        p = p[m];
      }
      if (p == null)
        return g(), !1;
      var T;
      if (ae(p)) {
        var C = a.fieldMax - a.fieldMin;
        C === 0 ? T = 0 : T = (p - a.fieldMin) / C;
      } else
        return Ae("Do not use continuous mappers without specifying numeric data (i.e. `" + a.field + ": " + p + "` for `" + t.id() + "` is non-numeric)"), !1;
      if (T < 0 ? T = 0 : T > 1 && (T = 1), o.color) {
        var S = a.valueMin[0], b = a.valueMax[0], x = a.valueMin[1], w = a.valueMax[1], D = a.valueMin[2], A = a.valueMax[2], L = a.valueMin[3] == null ? 1 : a.valueMin[3], M = a.valueMax[3] == null ? 1 : a.valueMax[3], O = [Math.round(S + (b - S) * T), Math.round(x + (w - x) * T), Math.round(D + (A - D) * T), Math.round(L + (M - L) * T)];
        i = {
          // colours are simple, so just create the flat property instead of expensive string parsing
          bypass: a.bypass,
          // we're a bypass if the mapping property is a bypass
          name: a.name,
          value: O,
          strValue: "rgb(" + O[0] + ", " + O[1] + ", " + O[2] + ")"
        };
      } else if (o.number) {
        var P = a.valueMin + (a.valueMax - a.valueMin) * T;
        i = this.parse(a.name, P, a.bypass, c);
      } else
        return !1;
      if (!i)
        return g(), !1;
      i.mapping = a, a = i;
      break;
    }
    case s.data: {
      for (var I = a.field.split("."), k = h.data, R = 0; R < I.length && k; R++) {
        var B = I[R];
        k = k[B];
      }
      if (k != null && (i = this.parse(a.name, k, a.bypass, c)), !i)
        return g(), !1;
      i.mapping = a, a = i;
      break;
    }
    case s.fn: {
      var z = a.value, F = a.fnValue != null ? a.fnValue : z(t);
      if (a.prevFnValue = F, F == null)
        return Ae("Custom function mappers may not return null (i.e. `" + a.name + "` for ele `" + t.id() + "` is null)"), !1;
      if (i = this.parse(a.name, F, a.bypass, c), !i)
        return Ae("Custom function mappers may not return invalid values for the property type (i.e. `" + a.name + "` for ele `" + t.id() + "` is invalid)"), !1;
      i.mapping = Ct(a), a = i;
      break;
    }
    case void 0:
      break;
    default:
      return !1;
  }
  return u ? (f ? a.bypassed = l.bypassed : a.bypassed = l, n[a.name] = a) : f ? l.bypassed = a : n[a.name] = a, d(), !0;
};
rt.cleanElements = function(t, e) {
  for (var r = 0; r < t.length; r++) {
    var a = t[r];
    if (this.clearStyleHints(a), a.dirtyCompoundBoundsCache(), a.dirtyBoundingBoxCache(), !e)
      a._private.style = {};
    else
      for (var n = a._private.style, i = Object.keys(n), s = 0; s < i.length; s++) {
        var o = i[s], u = n[o];
        u != null && (u.bypass ? u.bypassed = null : n[o] = null);
      }
  }
};
rt.update = function() {
  var t = this._private.cy, e = t.mutableElements();
  e.updateStyle();
};
rt.updateTransitions = function(t, e) {
  var r = this, a = t._private, n = t.pstyle("transition-property").value, i = t.pstyle("transition-duration").pfValue, s = t.pstyle("transition-delay").pfValue;
  if (n.length > 0 && i > 0) {
    for (var o = {}, u = !1, l = 0; l < n.length; l++) {
      var f = n[l], h = t.pstyle(f), c = e[f];
      if (c) {
        var v = c.prev, d = v, g = c.next != null ? c.next : h, y = !1, p = void 0, E = 1e-6;
        d && (ae(d.pfValue) && ae(g.pfValue) ? (y = g.pfValue - d.pfValue, p = d.pfValue + E * y) : ae(d.value) && ae(g.value) ? (y = g.value - d.value, p = d.value + E * y) : Ie(d.value) && Ie(g.value) && (y = d.value[0] !== g.value[0] || d.value[1] !== g.value[1] || d.value[2] !== g.value[2], p = d.strValue), y && (o[f] = g.strValue, this.applyBypass(t, f, p), u = !0));
      }
    }
    if (!u)
      return;
    a.transitioning = !0, new Rr(function(m) {
      s > 0 ? t.delayAnimation(s).play().promise().then(m) : m();
    }).then(function() {
      return t.animation({
        style: o,
        duration: i,
        easing: t.pstyle("transition-timing-function").value,
        queue: !1
      }).play().promise();
    }).then(function() {
      r.removeBypasses(t, n), t.emitAndNotify("style"), a.transitioning = !1;
    });
  } else
    a.transitioning && (this.removeBypasses(t, n), t.emitAndNotify("style"), a.transitioning = !1);
};
rt.checkTrigger = function(t, e, r, a, n, i) {
  var s = this.properties[e], o = n(s);
  o != null && o(r, a) && i(s);
};
rt.checkZOrderTrigger = function(t, e, r, a) {
  var n = this;
  this.checkTrigger(t, e, r, a, function(i) {
    return i.triggersZOrder;
  }, function() {
    n._private.cy.notify("zorder", t);
  });
};
rt.checkBoundsTrigger = function(t, e, r, a) {
  this.checkTrigger(t, e, r, a, function(n) {
    return n.triggersBounds;
  }, function(n) {
    t.dirtyCompoundBoundsCache(), t.dirtyBoundingBoxCache(), // only for beziers -- so performance of other edges isn't affected
    n.triggersBoundsOfParallelBeziers && (e === "curve-style" && (r === "bezier" || a === "bezier") || e === "display" && (r === "none" || a === "none")) && t.parallelEdges().forEach(function(i) {
      i.isBundledBezier() && i.dirtyBoundingBoxCache();
    });
  });
};
rt.checkTriggers = function(t, e, r, a) {
  t.dirtyStyleCache(), this.checkZOrderTrigger(t, e, r, a), this.checkBoundsTrigger(t, e, r, a);
};
var ma = {};
ma.applyBypass = function(t, e, r, a) {
  var n = this, i = [], s = !0;
  if (e === "*" || e === "**") {
    if (r !== void 0)
      for (var o = 0; o < n.properties.length; o++) {
        var u = n.properties[o], l = u.name, f = this.parse(l, r, !0);
        f && i.push(f);
      }
  } else if (le(e)) {
    var h = this.parse(e, r, !0);
    h && i.push(h);
  } else if (Te(e)) {
    var c = e;
    a = r;
    for (var v = Object.keys(c), d = 0; d < v.length; d++) {
      var g = v[d], y = c[g];
      if (y === void 0 && (y = c[on(g)]), y !== void 0) {
        var p = this.parse(g, y, !0);
        p && i.push(p);
      }
    }
  } else
    return !1;
  if (i.length === 0)
    return !1;
  for (var E = !1, m = 0; m < t.length; m++) {
    for (var T = t[m], C = {}, S = void 0, b = 0; b < i.length; b++) {
      var x = i[b];
      if (a) {
        var w = T.pstyle(x.name);
        S = C[x.name] = {
          prev: w
        };
      }
      E = this.applyParsedProperty(T, Ct(x)) || E, a && (S.next = T.pstyle(x.name));
    }
    E && this.updateStyleHints(T), a && this.updateTransitions(T, C, s);
  }
  return E;
};
ma.overrideBypass = function(t, e, r) {
  e = si(e);
  for (var a = 0; a < t.length; a++) {
    var n = t[a], i = n._private.style[e], s = this.properties[e].type, o = s.color, u = s.mutiple, l = i ? i.pfValue != null ? i.pfValue : i.value : null;
    !i || !i.bypass ? this.applyBypass(n, e, r) : (i.value = r, i.pfValue != null && (i.pfValue = r), o ? i.strValue = "rgb(" + r.join(",") + ")" : u ? i.strValue = r.join(" ") : i.strValue = "" + r, this.updateStyleHints(n)), this.checkTriggers(n, e, l, r);
  }
};
ma.removeAllBypasses = function(t, e) {
  return this.removeBypasses(t, this.propertyNames, e);
};
ma.removeBypasses = function(t, e, r) {
  for (var a = !0, n = 0; n < t.length; n++) {
    for (var i = t[n], s = {}, o = 0; o < e.length; o++) {
      var u = e[o], l = this.properties[u], f = i.pstyle(l.name);
      if (!(!f || !f.bypass)) {
        var h = "", c = this.parse(u, h, !0), v = s[l.name] = {
          prev: f
        };
        this.applyParsedProperty(i, c), v.next = i.pstyle(l.name);
      }
    }
    this.updateStyleHints(i), r && this.updateTransitions(i, s, a);
  }
};
var yi = {};
yi.getEmSizeInPixels = function() {
  var t = this.containerCss("font-size");
  return t != null ? parseFloat(t) : 1;
};
yi.containerCss = function(t) {
  var e = this._private.cy, r = e.container();
  if (Be && r && Be.getComputedStyle)
    return Be.getComputedStyle(r).getPropertyValue(t);
};
var St = {};
St.getRenderedStyle = function(t, e) {
  return e ? this.getStylePropertyValue(t, e, !0) : this.getRawStyle(t, !0);
};
St.getRawStyle = function(t, e) {
  var r = this;
  if (t = t[0], t) {
    for (var a = {}, n = 0; n < r.properties.length; n++) {
      var i = r.properties[n], s = r.getStylePropertyValue(t, i.name, e);
      s != null && (a[i.name] = s, a[on(i.name)] = s);
    }
    return a;
  }
};
St.getIndexedStyle = function(t, e, r, a) {
  var n = t.pstyle(e)[r][a];
  return n ?? t.cy().style().getDefaultProperty(e)[r][0];
};
St.getStylePropertyValue = function(t, e, r) {
  var a = this;
  if (t = t[0], t) {
    var n = a.properties[e];
    n.alias && (n = n.pointsTo);
    var i = n.type, s = t.pstyle(n.name);
    if (s) {
      var o = s.value, u = s.units, l = s.strValue;
      if (r && i.number && o != null && ae(o)) {
        var f = t.cy().zoom(), h = function(y) {
          return y * f;
        }, c = function(y, p) {
          return h(y) + p;
        }, v = Ie(o), d = v ? u.every(function(g) {
          return g != null;
        }) : u != null;
        return d ? v ? o.map(function(g, y) {
          return c(g, u[y]);
        }).join(" ") : c(o, u) : v ? o.map(function(g) {
          return le(g) ? g : "" + h(g);
        }).join(" ") : "" + h(o);
      } else if (l != null)
        return l;
    }
    return null;
  }
};
St.getAnimationStartStyle = function(t, e) {
  for (var r = {}, a = 0; a < e.length; a++) {
    var n = e[a], i = n.name, s = t.pstyle(i);
    s !== void 0 && (Te(s) ? s = this.parse(i, s.strValue) : s = this.parse(i, s)), s && (r[i] = s);
  }
  return r;
};
St.getPropsList = function(t) {
  var e = this, r = [], a = t, n = e.properties;
  if (a)
    for (var i = Object.keys(a), s = 0; s < i.length; s++) {
      var o = i[s], u = a[o], l = n[o] || n[si(o)], f = this.parse(l.name, u);
      f && r.push(f);
    }
  return r;
};
St.getNonDefaultPropertiesHash = function(t, e, r) {
  var a = r.slice(), n, i, s, o, u, l;
  for (u = 0; u < e.length; u++)
    if (n = e[u], i = t.pstyle(n, !1), i != null)
      if (i.pfValue != null)
        a[0] = ra(o, a[0]), a[1] = aa(o, a[1]);
      else
        for (s = i.strValue, l = 0; l < s.length; l++)
          o = s.charCodeAt(l), a[0] = ra(o, a[0]), a[1] = aa(o, a[1]);
  return a;
};
St.getPropertiesHash = St.getNonDefaultPropertiesHash;
var gn = {};
gn.appendFromJson = function(t) {
  for (var e = this, r = 0; r < t.length; r++) {
    var a = t[r], n = a.selector, i = a.style || a.css, s = Object.keys(i);
    e.selector(n);
    for (var o = 0; o < s.length; o++) {
      var u = s[o], l = i[u];
      e.css(u, l);
    }
  }
  return e;
};
gn.fromJson = function(t) {
  var e = this;
  return e.resetToDefault(), e.appendFromJson(t), e;
};
gn.json = function() {
  for (var t = [], e = this.defaultLength; e < this.length; e++) {
    for (var r = this[e], a = r.selector, n = r.properties, i = {}, s = 0; s < n.length; s++) {
      var o = n[s];
      i[o.name] = o.strValue;
    }
    t.push({
      selector: a ? a.toString() : "core",
      style: i
    });
  }
  return t;
};
var mi = {};
mi.appendFromString = function(t) {
  var e = this, r = this, a = "" + t, n, i, s;
  a = a.replace(/[/][*](\s|.)+?[*][/]/g, "");
  function o() {
    a.length > n.length ? a = a.substr(n.length) : a = "";
  }
  function u() {
    i.length > s.length ? i = i.substr(s.length) : i = "";
  }
  for (; ; ) {
    var l = a.match(/^\s*$/);
    if (l)
      break;
    var f = a.match(/^\s*((?:.|\s)+?)\s*\{((?:.|\s)+?)\}/);
    if (!f) {
      Ae("Halting stylesheet parsing: String stylesheet contains more to parse but no selector and block found in: " + a);
      break;
    }
    n = f[0];
    var h = f[1];
    if (h !== "core") {
      var c = new Xt(h);
      if (c.invalid) {
        Ae("Skipping parsing of block: Invalid selector found in string stylesheet: " + h), o();
        continue;
      }
    }
    var v = f[2], d = !1;
    i = v;
    for (var g = []; ; ) {
      var y = i.match(/^\s*$/);
      if (y)
        break;
      var p = i.match(/^\s*(.+?)\s*:\s*(.+?)(?:\s*;|\s*$)/);
      if (!p) {
        Ae("Skipping parsing of block: Invalid formatting of style property and value definitions found in:" + v), d = !0;
        break;
      }
      s = p[0];
      var E = p[1], m = p[2], T = e.properties[E];
      if (!T) {
        Ae("Skipping property: Invalid property name in: " + s), u();
        continue;
      }
      var C = r.parse(E, m);
      if (!C) {
        Ae("Skipping property: Invalid property definition in: " + s), u();
        continue;
      }
      g.push({
        name: E,
        val: m
      }), u();
    }
    if (d) {
      o();
      break;
    }
    r.selector(h);
    for (var S = 0; S < g.length; S++) {
      var b = g[S];
      r.css(b.name, b.val);
    }
    o();
  }
  return r;
};
mi.fromString = function(t) {
  var e = this;
  return e.resetToDefault(), e.appendFromString(t), e;
};
var qe = {};
(function() {
  var t = Ve, e = ud, r = fd, a = hd, n = vd, i = function(X) {
    return "^" + X + "\\s*\\(\\s*([\\w\\.]+)\\s*\\)$";
  }, s = function(X) {
    var K = t + "|\\w+|" + e + "|" + r + "|" + a + "|" + n;
    return "^" + X + "\\s*\\(([\\w\\.]+)\\s*\\,\\s*(" + t + ")\\s*\\,\\s*(" + t + ")\\s*,\\s*(" + K + ")\\s*\\,\\s*(" + K + ")\\)$";
  }, o = [`^url\\s*\\(\\s*['"]?(.+?)['"]?\\s*\\)$`, "^(none)$", "^(.+)$"];
  qe.types = {
    time: {
      number: !0,
      min: 0,
      units: "s|ms",
      implicitUnits: "ms"
    },
    percent: {
      number: !0,
      min: 0,
      max: 100,
      units: "%",
      implicitUnits: "%"
    },
    percentages: {
      number: !0,
      min: 0,
      max: 100,
      units: "%",
      implicitUnits: "%",
      multiple: !0
    },
    zeroOneNumber: {
      number: !0,
      min: 0,
      max: 1,
      unitless: !0
    },
    zeroOneNumbers: {
      number: !0,
      min: 0,
      max: 1,
      unitless: !0,
      multiple: !0
    },
    nOneOneNumber: {
      number: !0,
      min: -1,
      max: 1,
      unitless: !0
    },
    nonNegativeInt: {
      number: !0,
      min: 0,
      integer: !0,
      unitless: !0
    },
    position: {
      enums: ["parent", "origin"]
    },
    nodeSize: {
      number: !0,
      min: 0,
      enums: ["label"]
    },
    number: {
      number: !0,
      unitless: !0
    },
    numbers: {
      number: !0,
      unitless: !0,
      multiple: !0
    },
    positiveNumber: {
      number: !0,
      unitless: !0,
      min: 0,
      strictMin: !0
    },
    size: {
      number: !0,
      min: 0
    },
    bidirectionalSize: {
      number: !0
    },
    // allows negative
    bidirectionalSizeMaybePercent: {
      number: !0,
      allowPercent: !0
    },
    // allows negative
    bidirectionalSizes: {
      number: !0,
      multiple: !0
    },
    // allows negative
    sizeMaybePercent: {
      number: !0,
      min: 0,
      allowPercent: !0
    },
    axisDirection: {
      enums: ["horizontal", "leftward", "rightward", "vertical", "upward", "downward", "auto"]
    },
    paddingRelativeTo: {
      enums: ["width", "height", "average", "min", "max"]
    },
    bgWH: {
      number: !0,
      min: 0,
      allowPercent: !0,
      enums: ["auto"],
      multiple: !0
    },
    bgPos: {
      number: !0,
      allowPercent: !0,
      multiple: !0
    },
    bgRelativeTo: {
      enums: ["inner", "include-padding"],
      multiple: !0
    },
    bgRepeat: {
      enums: ["repeat", "repeat-x", "repeat-y", "no-repeat"],
      multiple: !0
    },
    bgFit: {
      enums: ["none", "contain", "cover"],
      multiple: !0
    },
    bgCrossOrigin: {
      enums: ["anonymous", "use-credentials"],
      multiple: !0
    },
    bgClip: {
      enums: ["none", "node"],
      multiple: !0
    },
    bgContainment: {
      enums: ["inside", "over"],
      multiple: !0
    },
    color: {
      color: !0
    },
    colors: {
      color: !0,
      multiple: !0
    },
    fill: {
      enums: ["solid", "linear-gradient", "radial-gradient"]
    },
    bool: {
      enums: ["yes", "no"]
    },
    bools: {
      enums: ["yes", "no"],
      multiple: !0
    },
    lineStyle: {
      enums: ["solid", "dotted", "dashed"]
    },
    lineCap: {
      enums: ["butt", "round", "square"]
    },
    borderStyle: {
      enums: ["solid", "dotted", "dashed", "double"]
    },
    curveStyle: {
      enums: ["bezier", "unbundled-bezier", "haystack", "segments", "straight", "straight-triangle", "taxi"]
    },
    fontFamily: {
      regex: '^([\\w- \\"]+(?:\\s*,\\s*[\\w- \\"]+)*)$'
    },
    fontStyle: {
      enums: ["italic", "normal", "oblique"]
    },
    fontWeight: {
      enums: ["normal", "bold", "bolder", "lighter", "100", "200", "300", "400", "500", "600", "800", "900", 100, 200, 300, 400, 500, 600, 700, 800, 900]
    },
    textDecoration: {
      enums: ["none", "underline", "overline", "line-through"]
    },
    textTransform: {
      enums: ["none", "uppercase", "lowercase"]
    },
    textWrap: {
      enums: ["none", "wrap", "ellipsis"]
    },
    textOverflowWrap: {
      enums: ["whitespace", "anywhere"]
    },
    textBackgroundShape: {
      enums: ["rectangle", "roundrectangle", "round-rectangle"]
    },
    nodeShape: {
      enums: ["rectangle", "roundrectangle", "round-rectangle", "cutrectangle", "cut-rectangle", "bottomroundrectangle", "bottom-round-rectangle", "barrel", "ellipse", "triangle", "round-triangle", "square", "pentagon", "round-pentagon", "hexagon", "round-hexagon", "concavehexagon", "concave-hexagon", "heptagon", "round-heptagon", "octagon", "round-octagon", "tag", "round-tag", "star", "diamond", "round-diamond", "vee", "rhomboid", "polygon"]
    },
    overlayShape: {
      enums: ["roundrectangle", "round-rectangle", "ellipse"]
    },
    compoundIncludeLabels: {
      enums: ["include", "exclude"]
    },
    arrowShape: {
      enums: ["tee", "triangle", "triangle-tee", "circle-triangle", "triangle-cross", "triangle-backcurve", "vee", "square", "circle", "diamond", "chevron", "none"]
    },
    arrowFill: {
      enums: ["filled", "hollow"]
    },
    display: {
      enums: ["element", "none"]
    },
    visibility: {
      enums: ["hidden", "visible"]
    },
    zCompoundDepth: {
      enums: ["bottom", "orphan", "auto", "top"]
    },
    zIndexCompare: {
      enums: ["auto", "manual"]
    },
    valign: {
      enums: ["top", "center", "bottom"]
    },
    halign: {
      enums: ["left", "center", "right"]
    },
    justification: {
      enums: ["left", "center", "right", "auto"]
    },
    text: {
      string: !0
    },
    data: {
      mapping: !0,
      regex: i("data")
    },
    layoutData: {
      mapping: !0,
      regex: i("layoutData")
    },
    scratch: {
      mapping: !0,
      regex: i("scratch")
    },
    mapData: {
      mapping: !0,
      regex: s("mapData")
    },
    mapLayoutData: {
      mapping: !0,
      regex: s("mapLayoutData")
    },
    mapScratch: {
      mapping: !0,
      regex: s("mapScratch")
    },
    fn: {
      mapping: !0,
      fn: !0
    },
    url: {
      regexes: o,
      singleRegexMatchValue: !0
    },
    urls: {
      regexes: o,
      singleRegexMatchValue: !0,
      multiple: !0
    },
    propList: {
      propList: !0
    },
    angle: {
      number: !0,
      units: "deg|rad",
      implicitUnits: "rad"
    },
    textRotation: {
      number: !0,
      units: "deg|rad",
      implicitUnits: "rad",
      enums: ["none", "autorotate"]
    },
    polygonPointList: {
      number: !0,
      multiple: !0,
      evenMultiple: !0,
      min: -1,
      max: 1,
      unitless: !0
    },
    edgeDistances: {
      enums: ["intersection", "node-position"]
    },
    edgeEndpoint: {
      number: !0,
      multiple: !0,
      units: "%|px|em|deg|rad",
      implicitUnits: "px",
      enums: ["inside-to-node", "outside-to-node", "outside-to-node-or-label", "outside-to-line", "outside-to-line-or-label"],
      singleEnum: !0,
      validate: function(X, K) {
        switch (X.length) {
          case 2:
            return K[0] !== "deg" && K[0] !== "rad" && K[1] !== "deg" && K[1] !== "rad";
          case 1:
            return le(X[0]) || K[0] === "deg" || K[0] === "rad";
          default:
            return !1;
        }
      }
    },
    easing: {
      regexes: ["^(spring)\\s*\\(\\s*(" + t + ")\\s*,\\s*(" + t + ")\\s*\\)$", "^(cubic-bezier)\\s*\\(\\s*(" + t + ")\\s*,\\s*(" + t + ")\\s*,\\s*(" + t + ")\\s*,\\s*(" + t + ")\\s*\\)$"],
      enums: ["linear", "ease", "ease-in", "ease-out", "ease-in-out", "ease-in-sine", "ease-out-sine", "ease-in-out-sine", "ease-in-quad", "ease-out-quad", "ease-in-out-quad", "ease-in-cubic", "ease-out-cubic", "ease-in-out-cubic", "ease-in-quart", "ease-out-quart", "ease-in-out-quart", "ease-in-quint", "ease-out-quint", "ease-in-out-quint", "ease-in-expo", "ease-out-expo", "ease-in-out-expo", "ease-in-circ", "ease-out-circ", "ease-in-out-circ"]
    },
    gradientDirection: {
      enums: [
        "to-bottom",
        "to-top",
        "to-left",
        "to-right",
        "to-bottom-right",
        "to-bottom-left",
        "to-top-right",
        "to-top-left",
        "to-right-bottom",
        "to-left-bottom",
        "to-right-top",
        "to-left-top"
        // different order
      ]
    },
    boundsExpansion: {
      number: !0,
      multiple: !0,
      min: 0,
      validate: function(X) {
        var K = X.length;
        return K === 1 || K === 2 || K === 4;
      }
    }
  };
  var u = {
    zeroNonZero: function(X, K) {
      return (X == null || K == null) && X !== K || X == 0 && K != 0 ? !0 : X != 0 && K == 0;
    },
    any: function(X, K) {
      return X != K;
    },
    emptyNonEmpty: function(X, K) {
      var Z = Yt(X), te = Yt(K);
      return Z && !te || !Z && te;
    }
  }, l = qe.types, f = [{
    name: "label",
    type: l.text,
    triggersBounds: u.any,
    triggersZOrder: u.emptyNonEmpty
  }, {
    name: "text-rotation",
    type: l.textRotation,
    triggersBounds: u.any
  }, {
    name: "text-margin-x",
    type: l.bidirectionalSize,
    triggersBounds: u.any
  }, {
    name: "text-margin-y",
    type: l.bidirectionalSize,
    triggersBounds: u.any
  }], h = [{
    name: "source-label",
    type: l.text,
    triggersBounds: u.any
  }, {
    name: "source-text-rotation",
    type: l.textRotation,
    triggersBounds: u.any
  }, {
    name: "source-text-margin-x",
    type: l.bidirectionalSize,
    triggersBounds: u.any
  }, {
    name: "source-text-margin-y",
    type: l.bidirectionalSize,
    triggersBounds: u.any
  }, {
    name: "source-text-offset",
    type: l.size,
    triggersBounds: u.any
  }], c = [{
    name: "target-label",
    type: l.text,
    triggersBounds: u.any
  }, {
    name: "target-text-rotation",
    type: l.textRotation,
    triggersBounds: u.any
  }, {
    name: "target-text-margin-x",
    type: l.bidirectionalSize,
    triggersBounds: u.any
  }, {
    name: "target-text-margin-y",
    type: l.bidirectionalSize,
    triggersBounds: u.any
  }, {
    name: "target-text-offset",
    type: l.size,
    triggersBounds: u.any
  }], v = [{
    name: "font-family",
    type: l.fontFamily,
    triggersBounds: u.any
  }, {
    name: "font-style",
    type: l.fontStyle,
    triggersBounds: u.any
  }, {
    name: "font-weight",
    type: l.fontWeight,
    triggersBounds: u.any
  }, {
    name: "font-size",
    type: l.size,
    triggersBounds: u.any
  }, {
    name: "text-transform",
    type: l.textTransform,
    triggersBounds: u.any
  }, {
    name: "text-wrap",
    type: l.textWrap,
    triggersBounds: u.any
  }, {
    name: "text-overflow-wrap",
    type: l.textOverflowWrap,
    triggersBounds: u.any
  }, {
    name: "text-max-width",
    type: l.size,
    triggersBounds: u.any
  }, {
    name: "text-outline-width",
    type: l.size,
    triggersBounds: u.any
  }, {
    name: "line-height",
    type: l.positiveNumber,
    triggersBounds: u.any
  }], d = [{
    name: "text-valign",
    type: l.valign,
    triggersBounds: u.any
  }, {
    name: "text-halign",
    type: l.halign,
    triggersBounds: u.any
  }, {
    name: "color",
    type: l.color
  }, {
    name: "text-outline-color",
    type: l.color
  }, {
    name: "text-outline-opacity",
    type: l.zeroOneNumber
  }, {
    name: "text-background-color",
    type: l.color
  }, {
    name: "text-background-opacity",
    type: l.zeroOneNumber
  }, {
    name: "text-background-padding",
    type: l.size,
    triggersBounds: u.any
  }, {
    name: "text-border-opacity",
    type: l.zeroOneNumber
  }, {
    name: "text-border-color",
    type: l.color
  }, {
    name: "text-border-width",
    type: l.size,
    triggersBounds: u.any
  }, {
    name: "text-border-style",
    type: l.borderStyle,
    triggersBounds: u.any
  }, {
    name: "text-background-shape",
    type: l.textBackgroundShape,
    triggersBounds: u.any
  }, {
    name: "text-justification",
    type: l.justification
  }], g = [{
    name: "events",
    type: l.bool
  }, {
    name: "text-events",
    type: l.bool
  }], y = [{
    name: "display",
    type: l.display,
    triggersZOrder: u.any,
    triggersBounds: u.any,
    triggersBoundsOfParallelBeziers: !0
  }, {
    name: "visibility",
    type: l.visibility,
    triggersZOrder: u.any
  }, {
    name: "opacity",
    type: l.zeroOneNumber,
    triggersZOrder: u.zeroNonZero
  }, {
    name: "text-opacity",
    type: l.zeroOneNumber
  }, {
    name: "min-zoomed-font-size",
    type: l.size
  }, {
    name: "z-compound-depth",
    type: l.zCompoundDepth,
    triggersZOrder: u.any
  }, {
    name: "z-index-compare",
    type: l.zIndexCompare,
    triggersZOrder: u.any
  }, {
    name: "z-index",
    type: l.nonNegativeInt,
    triggersZOrder: u.any
  }], p = [{
    name: "overlay-padding",
    type: l.size,
    triggersBounds: u.any
  }, {
    name: "overlay-color",
    type: l.color
  }, {
    name: "overlay-opacity",
    type: l.zeroOneNumber,
    triggersBounds: u.zeroNonZero
  }, {
    name: "overlay-shape",
    type: l.overlayShape,
    triggersBounds: u.any
  }], E = [{
    name: "underlay-padding",
    type: l.size,
    triggersBounds: u.any
  }, {
    name: "underlay-color",
    type: l.color
  }, {
    name: "underlay-opacity",
    type: l.zeroOneNumber,
    triggersBounds: u.zeroNonZero
  }, {
    name: "underlay-shape",
    type: l.overlayShape,
    triggersBounds: u.any
  }], m = [{
    name: "transition-property",
    type: l.propList
  }, {
    name: "transition-duration",
    type: l.time
  }, {
    name: "transition-delay",
    type: l.time
  }, {
    name: "transition-timing-function",
    type: l.easing
  }], T = function(X, K) {
    return K.value === "label" ? -X.poolIndex() : K.pfValue;
  }, C = [{
    name: "height",
    type: l.nodeSize,
    triggersBounds: u.any,
    hashOverride: T
  }, {
    name: "width",
    type: l.nodeSize,
    triggersBounds: u.any,
    hashOverride: T
  }, {
    name: "shape",
    type: l.nodeShape,
    triggersBounds: u.any
  }, {
    name: "shape-polygon-points",
    type: l.polygonPointList,
    triggersBounds: u.any
  }, {
    name: "background-color",
    type: l.color
  }, {
    name: "background-fill",
    type: l.fill
  }, {
    name: "background-opacity",
    type: l.zeroOneNumber
  }, {
    name: "background-blacken",
    type: l.nOneOneNumber
  }, {
    name: "background-gradient-stop-colors",
    type: l.colors
  }, {
    name: "background-gradient-stop-positions",
    type: l.percentages
  }, {
    name: "background-gradient-direction",
    type: l.gradientDirection
  }, {
    name: "padding",
    type: l.sizeMaybePercent,
    triggersBounds: u.any
  }, {
    name: "padding-relative-to",
    type: l.paddingRelativeTo,
    triggersBounds: u.any
  }, {
    name: "bounds-expansion",
    type: l.boundsExpansion,
    triggersBounds: u.any
  }], S = [{
    name: "border-color",
    type: l.color
  }, {
    name: "border-opacity",
    type: l.zeroOneNumber
  }, {
    name: "border-width",
    type: l.size,
    triggersBounds: u.any
  }, {
    name: "border-style",
    type: l.borderStyle
  }], b = [{
    name: "background-image",
    type: l.urls
  }, {
    name: "background-image-crossorigin",
    type: l.bgCrossOrigin
  }, {
    name: "background-image-opacity",
    type: l.zeroOneNumbers
  }, {
    name: "background-image-containment",
    type: l.bgContainment
  }, {
    name: "background-image-smoothing",
    type: l.bools
  }, {
    name: "background-position-x",
    type: l.bgPos
  }, {
    name: "background-position-y",
    type: l.bgPos
  }, {
    name: "background-width-relative-to",
    type: l.bgRelativeTo
  }, {
    name: "background-height-relative-to",
    type: l.bgRelativeTo
  }, {
    name: "background-repeat",
    type: l.bgRepeat
  }, {
    name: "background-fit",
    type: l.bgFit
  }, {
    name: "background-clip",
    type: l.bgClip
  }, {
    name: "background-width",
    type: l.bgWH
  }, {
    name: "background-height",
    type: l.bgWH
  }, {
    name: "background-offset-x",
    type: l.bgPos
  }, {
    name: "background-offset-y",
    type: l.bgPos
  }], x = [{
    name: "position",
    type: l.position,
    triggersBounds: u.any
  }, {
    name: "compound-sizing-wrt-labels",
    type: l.compoundIncludeLabels,
    triggersBounds: u.any
  }, {
    name: "min-width",
    type: l.size,
    triggersBounds: u.any
  }, {
    name: "min-width-bias-left",
    type: l.sizeMaybePercent,
    triggersBounds: u.any
  }, {
    name: "min-width-bias-right",
    type: l.sizeMaybePercent,
    triggersBounds: u.any
  }, {
    name: "min-height",
    type: l.size,
    triggersBounds: u.any
  }, {
    name: "min-height-bias-top",
    type: l.sizeMaybePercent,
    triggersBounds: u.any
  }, {
    name: "min-height-bias-bottom",
    type: l.sizeMaybePercent,
    triggersBounds: u.any
  }], w = [{
    name: "line-style",
    type: l.lineStyle
  }, {
    name: "line-color",
    type: l.color
  }, {
    name: "line-fill",
    type: l.fill
  }, {
    name: "line-cap",
    type: l.lineCap
  }, {
    name: "line-opacity",
    type: l.zeroOneNumber
  }, {
    name: "line-dash-pattern",
    type: l.numbers
  }, {
    name: "line-dash-offset",
    type: l.number
  }, {
    name: "line-gradient-stop-colors",
    type: l.colors
  }, {
    name: "line-gradient-stop-positions",
    type: l.percentages
  }, {
    name: "curve-style",
    type: l.curveStyle,
    triggersBounds: u.any,
    triggersBoundsOfParallelBeziers: !0
  }, {
    name: "haystack-radius",
    type: l.zeroOneNumber,
    triggersBounds: u.any
  }, {
    name: "source-endpoint",
    type: l.edgeEndpoint,
    triggersBounds: u.any
  }, {
    name: "target-endpoint",
    type: l.edgeEndpoint,
    triggersBounds: u.any
  }, {
    name: "control-point-step-size",
    type: l.size,
    triggersBounds: u.any
  }, {
    name: "control-point-distances",
    type: l.bidirectionalSizes,
    triggersBounds: u.any
  }, {
    name: "control-point-weights",
    type: l.numbers,
    triggersBounds: u.any
  }, {
    name: "segment-distances",
    type: l.bidirectionalSizes,
    triggersBounds: u.any
  }, {
    name: "segment-weights",
    type: l.numbers,
    triggersBounds: u.any
  }, {
    name: "taxi-turn",
    type: l.bidirectionalSizeMaybePercent,
    triggersBounds: u.any
  }, {
    name: "taxi-turn-min-distance",
    type: l.size,
    triggersBounds: u.any
  }, {
    name: "taxi-direction",
    type: l.axisDirection,
    triggersBounds: u.any
  }, {
    name: "edge-distances",
    type: l.edgeDistances,
    triggersBounds: u.any
  }, {
    name: "arrow-scale",
    type: l.positiveNumber,
    triggersBounds: u.any
  }, {
    name: "loop-direction",
    type: l.angle,
    triggersBounds: u.any
  }, {
    name: "loop-sweep",
    type: l.angle,
    triggersBounds: u.any
  }, {
    name: "source-distance-from-node",
    type: l.size,
    triggersBounds: u.any
  }, {
    name: "target-distance-from-node",
    type: l.size,
    triggersBounds: u.any
  }], D = [{
    name: "ghost",
    type: l.bool,
    triggersBounds: u.any
  }, {
    name: "ghost-offset-x",
    type: l.bidirectionalSize,
    triggersBounds: u.any
  }, {
    name: "ghost-offset-y",
    type: l.bidirectionalSize,
    triggersBounds: u.any
  }, {
    name: "ghost-opacity",
    type: l.zeroOneNumber
  }], A = [{
    name: "selection-box-color",
    type: l.color
  }, {
    name: "selection-box-opacity",
    type: l.zeroOneNumber
  }, {
    name: "selection-box-border-color",
    type: l.color
  }, {
    name: "selection-box-border-width",
    type: l.size
  }, {
    name: "active-bg-color",
    type: l.color
  }, {
    name: "active-bg-opacity",
    type: l.zeroOneNumber
  }, {
    name: "active-bg-size",
    type: l.size
  }, {
    name: "outside-texture-bg-color",
    type: l.color
  }, {
    name: "outside-texture-bg-opacity",
    type: l.zeroOneNumber
  }], L = [];
  qe.pieBackgroundN = 16, L.push({
    name: "pie-size",
    type: l.sizeMaybePercent
  });
  for (var M = 1; M <= qe.pieBackgroundN; M++)
    L.push({
      name: "pie-" + M + "-background-color",
      type: l.color
    }), L.push({
      name: "pie-" + M + "-background-size",
      type: l.percent
    }), L.push({
      name: "pie-" + M + "-background-opacity",
      type: l.zeroOneNumber
    });
  var O = [], P = qe.arrowPrefixes = ["source", "mid-source", "target", "mid-target"];
  [{
    name: "arrow-shape",
    type: l.arrowShape,
    triggersBounds: u.any
  }, {
    name: "arrow-color",
    type: l.color
  }, {
    name: "arrow-fill",
    type: l.arrowFill
  }].forEach(function(G) {
    P.forEach(function(X) {
      var K = X + "-" + G.name, Z = G.type, te = G.triggersBounds;
      O.push({
        name: K,
        type: Z,
        triggersBounds: te
      });
    });
  }, {});
  var I = qe.properties = [].concat(g, m, y, p, E, D, d, v, f, h, c, C, S, b, L, x, w, O, A), k = qe.propertyGroups = {
    // common to all eles
    behavior: g,
    transition: m,
    visibility: y,
    overlay: p,
    underlay: E,
    ghost: D,
    // labels
    commonLabel: d,
    labelDimensions: v,
    mainLabel: f,
    sourceLabel: h,
    targetLabel: c,
    // node props
    nodeBody: C,
    nodeBorder: S,
    backgroundImage: b,
    pie: L,
    compound: x,
    // edge props
    edgeLine: w,
    edgeArrow: O,
    core: A
  }, R = qe.propertyGroupNames = {}, B = qe.propertyGroupKeys = Object.keys(k);
  B.forEach(function(G) {
    R[G] = k[G].map(function(X) {
      return X.name;
    }), k[G].forEach(function(X) {
      return X.groupKey = G;
    });
  });
  var z = qe.aliases = [{
    name: "content",
    pointsTo: "label"
  }, {
    name: "control-point-distance",
    pointsTo: "control-point-distances"
  }, {
    name: "control-point-weight",
    pointsTo: "control-point-weights"
  }, {
    name: "edge-text-rotation",
    pointsTo: "text-rotation"
  }, {
    name: "padding-left",
    pointsTo: "padding"
  }, {
    name: "padding-right",
    pointsTo: "padding"
  }, {
    name: "padding-top",
    pointsTo: "padding"
  }, {
    name: "padding-bottom",
    pointsTo: "padding"
  }];
  qe.propertyNames = I.map(function(G) {
    return G.name;
  });
  for (var F = 0; F < I.length; F++) {
    var $ = I[F];
    I[$.name] = $;
  }
  for (var U = 0; U < z.length; U++) {
    var V = z[U], H = I[V.pointsTo], Y = {
      name: V.name,
      alias: !0,
      pointsTo: H
    };
    I.push(Y), I[V.name] = Y;
  }
})();
qe.getDefaultProperty = function(t) {
  return this.getDefaultProperties()[t];
};
qe.getDefaultProperties = function() {
  var t = this._private;
  if (t.defaultProperties != null)
    return t.defaultProperties;
  for (var e = ce({
    // core props
    "selection-box-color": "#ddd",
    "selection-box-opacity": 0.65,
    "selection-box-border-color": "#aaa",
    "selection-box-border-width": 1,
    "active-bg-color": "black",
    "active-bg-opacity": 0.15,
    "active-bg-size": 30,
    "outside-texture-bg-color": "#000",
    "outside-texture-bg-opacity": 0.125,
    // common node/edge props
    events: "yes",
    "text-events": "no",
    "text-valign": "top",
    "text-halign": "center",
    "text-justification": "auto",
    "line-height": 1,
    color: "#000",
    "text-outline-color": "#000",
    "text-outline-width": 0,
    "text-outline-opacity": 1,
    "text-opacity": 1,
    "text-decoration": "none",
    "text-transform": "none",
    "text-wrap": "none",
    "text-overflow-wrap": "whitespace",
    "text-max-width": 9999,
    "text-background-color": "#000",
    "text-background-opacity": 0,
    "text-background-shape": "rectangle",
    "text-background-padding": 0,
    "text-border-opacity": 0,
    "text-border-width": 0,
    "text-border-style": "solid",
    "text-border-color": "#000",
    "font-family": "Helvetica Neue, Helvetica, sans-serif",
    "font-style": "normal",
    "font-weight": "normal",
    "font-size": 16,
    "min-zoomed-font-size": 0,
    "text-rotation": "none",
    "source-text-rotation": "none",
    "target-text-rotation": "none",
    visibility: "visible",
    display: "element",
    opacity: 1,
    "z-compound-depth": "auto",
    "z-index-compare": "auto",
    "z-index": 0,
    label: "",
    "text-margin-x": 0,
    "text-margin-y": 0,
    "source-label": "",
    "source-text-offset": 0,
    "source-text-margin-x": 0,
    "source-text-margin-y": 0,
    "target-label": "",
    "target-text-offset": 0,
    "target-text-margin-x": 0,
    "target-text-margin-y": 0,
    "overlay-opacity": 0,
    "overlay-color": "#000",
    "overlay-padding": 10,
    "overlay-shape": "round-rectangle",
    "underlay-opacity": 0,
    "underlay-color": "#000",
    "underlay-padding": 10,
    "underlay-shape": "round-rectangle",
    "transition-property": "none",
    "transition-duration": 0,
    "transition-delay": 0,
    "transition-timing-function": "linear",
    // node props
    "background-blacken": 0,
    "background-color": "#999",
    "background-fill": "solid",
    "background-opacity": 1,
    "background-image": "none",
    "background-image-crossorigin": "anonymous",
    "background-image-opacity": 1,
    "background-image-containment": "inside",
    "background-image-smoothing": "yes",
    "background-position-x": "50%",
    "background-position-y": "50%",
    "background-offset-x": 0,
    "background-offset-y": 0,
    "background-width-relative-to": "include-padding",
    "background-height-relative-to": "include-padding",
    "background-repeat": "no-repeat",
    "background-fit": "none",
    "background-clip": "node",
    "background-width": "auto",
    "background-height": "auto",
    "border-color": "#000",
    "border-opacity": 1,
    "border-width": 0,
    "border-style": "solid",
    height: 30,
    width: 30,
    shape: "ellipse",
    "shape-polygon-points": "-1, -1,   1, -1,   1, 1,   -1, 1",
    "bounds-expansion": 0,
    // node gradient
    "background-gradient-direction": "to-bottom",
    "background-gradient-stop-colors": "#999",
    "background-gradient-stop-positions": "0%",
    // ghost props
    ghost: "no",
    "ghost-offset-y": 0,
    "ghost-offset-x": 0,
    "ghost-opacity": 0,
    // compound props
    padding: 0,
    "padding-relative-to": "width",
    position: "origin",
    "compound-sizing-wrt-labels": "include",
    "min-width": 0,
    "min-width-bias-left": 0,
    "min-width-bias-right": 0,
    "min-height": 0,
    "min-height-bias-top": 0,
    "min-height-bias-bottom": 0
  }, {
    // node pie bg
    "pie-size": "100%"
  }, [{
    name: "pie-{{i}}-background-color",
    value: "black"
  }, {
    name: "pie-{{i}}-background-size",
    value: "0%"
  }, {
    name: "pie-{{i}}-background-opacity",
    value: 1
  }].reduce(function(u, l) {
    for (var f = 1; f <= qe.pieBackgroundN; f++) {
      var h = l.name.replace("{{i}}", f), c = l.value;
      u[h] = c;
    }
    return u;
  }, {}), {
    // edge props
    "line-style": "solid",
    "line-color": "#999",
    "line-fill": "solid",
    "line-cap": "butt",
    "line-opacity": 1,
    "line-gradient-stop-colors": "#999",
    "line-gradient-stop-positions": "0%",
    "control-point-step-size": 40,
    "control-point-weights": 0.5,
    "segment-weights": 0.5,
    "segment-distances": 20,
    "taxi-turn": "50%",
    "taxi-turn-min-distance": 10,
    "taxi-direction": "auto",
    "edge-distances": "intersection",
    "curve-style": "haystack",
    "haystack-radius": 0,
    "arrow-scale": 1,
    "loop-direction": "-45deg",
    "loop-sweep": "-90deg",
    "source-distance-from-node": 0,
    "target-distance-from-node": 0,
    "source-endpoint": "outside-to-node",
    "target-endpoint": "outside-to-node",
    "line-dash-pattern": [6, 3],
    "line-dash-offset": 0
  }, [{
    name: "arrow-shape",
    value: "none"
  }, {
    name: "arrow-color",
    value: "#999"
  }, {
    name: "arrow-fill",
    value: "filled"
  }].reduce(function(u, l) {
    return qe.arrowPrefixes.forEach(function(f) {
      var h = f + "-" + l.name, c = l.value;
      u[h] = c;
    }), u;
  }, {})), r = {}, a = 0; a < this.properties.length; a++) {
    var n = this.properties[a];
    if (!n.pointsTo) {
      var i = n.name, s = e[i], o = this.parse(i, s);
      r[i] = o;
    }
  }
  return t.defaultProperties = r, t.defaultProperties;
};
qe.addDefaultStylesheet = function() {
  this.selector(":parent").css({
    shape: "rectangle",
    padding: 10,
    "background-color": "#eee",
    "border-color": "#ccc",
    "border-width": 1
  }).selector("edge").css({
    width: 3
  }).selector(":loop").css({
    "curve-style": "bezier"
  }).selector("edge:compound").css({
    "curve-style": "bezier",
    "source-endpoint": "outside-to-line",
    "target-endpoint": "outside-to-line"
  }).selector(":selected").css({
    "background-color": "#0169D9",
    "line-color": "#0169D9",
    "source-arrow-color": "#0169D9",
    "target-arrow-color": "#0169D9",
    "mid-source-arrow-color": "#0169D9",
    "mid-target-arrow-color": "#0169D9"
  }).selector(":parent:selected").css({
    "background-color": "#CCE1F9",
    "border-color": "#aec8e5"
  }).selector(":active").css({
    "overlay-color": "black",
    "overlay-padding": 10,
    "overlay-opacity": 0.25
  }), this.defaultLength = this.length;
};
var pn = {};
pn.parse = function(t, e, r, a) {
  var n = this;
  if (Fe(e))
    return n.parseImplWarn(t, e, r, a);
  var i = a === "mapping" || a === !0 || a === !1 || a == null ? "dontcare" : a, s = r ? "t" : "f", o = "" + e, u = mo(t, o, s, i), l = n.propCache = n.propCache || [], f;
  return (f = l[u]) || (f = l[u] = n.parseImplWarn(t, e, r, a)), (r || a === "mapping") && (f = Ct(f), f && (f.value = Ct(f.value))), f;
};
pn.parseImplWarn = function(t, e, r, a) {
  var n = this.parseImpl(t, e, r, a);
  return !n && e != null && Ae("The style property `".concat(t, ": ").concat(e, "` is invalid")), n && (n.name === "width" || n.name === "height") && e === "label" && Ae("The style value of `label` is deprecated for `" + n.name + "`"), n;
};
pn.parseImpl = function(t, e, r, a) {
  var n = this;
  t = si(t);
  var i = n.properties[t], s = e, o = n.types;
  if (!i || e === void 0)
    return null;
  i.alias && (i = i.pointsTo, t = i.name);
  var u = le(e);
  u && (e = e.trim());
  var l = i.type;
  if (!l)
    return null;
  if (r && (e === "" || e === null))
    return {
      name: t,
      value: e,
      bypass: !0,
      deleteBypass: !0
    };
  if (Fe(e))
    return {
      name: t,
      value: e,
      strValue: "fn",
      mapped: o.fn,
      bypass: r
    };
  var f, h;
  if (!(!u || a || e.length < 7 || e[1] !== "a")) {
    if (e.length >= 7 && e[0] === "d" && (f = new RegExp(o.data.regex).exec(e))) {
      if (r)
        return !1;
      var c = o.data;
      return {
        name: t,
        value: f,
        strValue: "" + e,
        mapped: c,
        field: f[1],
        bypass: r
      };
    } else if (e.length >= 10 && e[0] === "m" && (h = new RegExp(o.mapData.regex).exec(e))) {
      if (r || l.multiple)
        return !1;
      var v = o.mapData;
      if (!(l.color || l.number))
        return !1;
      var d = this.parse(t, h[4]);
      if (!d || d.mapped)
        return !1;
      var g = this.parse(t, h[5]);
      if (!g || g.mapped)
        return !1;
      if (d.pfValue === g.pfValue || d.strValue === g.strValue)
        return Ae("`" + t + ": " + e + "` is not a valid mapper because the output range is zero; converting to `" + t + ": " + d.strValue + "`"), this.parse(t, d.strValue);
      if (l.color) {
        var y = d.value, p = g.value, E = y[0] === p[0] && y[1] === p[1] && y[2] === p[2] && // optional alpha
        (y[3] === p[3] || (y[3] == null || y[3] === 1) && (p[3] == null || p[3] === 1));
        if (E)
          return !1;
      }
      return {
        name: t,
        value: h,
        strValue: "" + e,
        mapped: v,
        field: h[1],
        fieldMin: parseFloat(h[2]),
        // min & max are numeric
        fieldMax: parseFloat(h[3]),
        valueMin: d.value,
        valueMax: g.value,
        bypass: r
      };
    }
  }
  if (l.multiple && a !== "multiple") {
    var m;
    if (u ? m = e.split(/\s+/) : Ie(e) ? m = e : m = [e], l.evenMultiple && m.length % 2 !== 0)
      return null;
    for (var T = [], C = [], S = [], b = "", x = !1, w = 0; w < m.length; w++) {
      var D = n.parse(t, m[w], r, "multiple");
      x = x || le(D.value), T.push(D.value), S.push(D.pfValue != null ? D.pfValue : D.value), C.push(D.units), b += (w > 0 ? " " : "") + D.strValue;
    }
    return l.validate && !l.validate(T, C) ? null : l.singleEnum && x ? T.length === 1 && le(T[0]) ? {
      name: t,
      value: T[0],
      strValue: T[0],
      bypass: r
    } : null : {
      name: t,
      value: T,
      pfValue: S,
      strValue: b,
      bypass: r,
      units: C
    };
  }
  var A = function() {
    for (var K = 0; K < l.enums.length; K++) {
      var Z = l.enums[K];
      if (Z === e)
        return {
          name: t,
          value: e,
          strValue: "" + e,
          bypass: r
        };
    }
    return null;
  };
  if (l.number) {
    var L, M = "px";
    if (l.units && (L = l.units), l.implicitUnits && (M = l.implicitUnits), !l.unitless)
      if (u) {
        var O = "px|em" + (l.allowPercent ? "|\\%" : "");
        L && (O = L);
        var P = e.match("^(" + Ve + ")(" + O + ")?$");
        P && (e = P[1], L = P[2] || M);
      } else
        (!L || l.implicitUnits) && (L = M);
    if (e = parseFloat(e), isNaN(e) && l.enums === void 0)
      return null;
    if (isNaN(e) && l.enums !== void 0)
      return e = s, A();
    if (l.integer && !td(e) || l.min !== void 0 && (e < l.min || l.strictMin && e === l.min) || l.max !== void 0 && (e > l.max || l.strictMax && e === l.max))
      return null;
    var I = {
      name: t,
      value: e,
      strValue: "" + e + (L || ""),
      units: L,
      bypass: r
    };
    return l.unitless || L !== "px" && L !== "em" ? I.pfValue = e : I.pfValue = L === "px" || !L ? e : this.getEmSizeInPixels() * e, (L === "ms" || L === "s") && (I.pfValue = L === "ms" ? e : 1e3 * e), (L === "deg" || L === "rad") && (I.pfValue = L === "rad" ? e : Zd(e)), L === "%" && (I.pfValue = e / 100), I;
  } else if (l.propList) {
    var k = [], R = "" + e;
    if (R !== "none") {
      for (var B = R.split(/\s*,\s*|\s+/), z = 0; z < B.length; z++) {
        var F = B[z].trim();
        n.properties[F] ? k.push(F) : Ae("`" + F + "` is not a valid property name");
      }
      if (k.length === 0)
        return null;
    }
    return {
      name: t,
      value: k,
      strValue: k.length === 0 ? "none" : k.join(" "),
      bypass: r
    };
  } else if (l.color) {
    var $ = md(e);
    return $ ? {
      name: t,
      value: $,
      pfValue: $,
      strValue: "rgb(" + $[0] + "," + $[1] + "," + $[2] + ")",
      // n.b. no spaces b/c of multiple support
      bypass: r
    } : null;
  } else if (l.regex || l.regexes) {
    if (l.enums) {
      var U = A();
      if (U)
        return U;
    }
    for (var V = l.regexes ? l.regexes : [l.regex], H = 0; H < V.length; H++) {
      var Y = new RegExp(V[H]), G = Y.exec(e);
      if (G)
        return {
          name: t,
          value: l.singleRegexMatchValue ? G[1] : G,
          strValue: "" + e,
          bypass: r
        };
    }
    return null;
  } else
    return l.string ? {
      name: t,
      value: "" + e,
      strValue: "" + e,
      bypass: r
    } : l.enums ? A() : null;
};
var je = function t(e) {
  if (!(this instanceof t))
    return new t(e);
  if (!ii(e)) {
    ze("A style must have a core reference");
    return;
  }
  this._private = {
    cy: e,
    coreStyle: {}
  }, this.length = 0, this.resetToDefault();
}, tt = je.prototype;
tt.instanceString = function() {
  return "style";
};
tt.clear = function() {
  for (var t = this._private, e = t.cy, r = e.elements(), a = 0; a < this.length; a++)
    this[a] = void 0;
  return this.length = 0, t.contextStyles = {}, t.propDiffs = {}, this.cleanElements(r, !0), r.forEach(function(n) {
    var i = n[0]._private;
    i.styleDirty = !0, i.appliedInitStyle = !1;
  }), this;
};
tt.resetToDefault = function() {
  return this.clear(), this.addDefaultStylesheet(), this;
};
tt.core = function(t) {
  return this._private.coreStyle[t] || this.getDefaultProperty(t);
};
tt.selector = function(t) {
  var e = t === "core" ? null : new Xt(t), r = this.length++;
  return this[r] = {
    selector: e,
    properties: [],
    mappedProperties: [],
    index: r
  }, this;
};
tt.css = function() {
  var t = this, e = arguments;
  if (e.length === 1)
    for (var r = e[0], a = 0; a < t.properties.length; a++) {
      var n = t.properties[a], i = r[n.name];
      i === void 0 && (i = r[on(n.name)]), i !== void 0 && this.cssRule(n.name, i);
    }
  else
    e.length === 2 && this.cssRule(e[0], e[1]);
  return this;
};
tt.style = tt.css;
tt.cssRule = function(t, e) {
  var r = this.parse(t, e);
  if (r) {
    var a = this.length - 1;
    this[a].properties.push(r), this[a].properties[r.name] = r, r.name.match(/pie-(\d+)-background-size/) && r.value && (this._private.hasPie = !0), r.mapped && this[a].mappedProperties.push(r);
    var n = !this[a].selector;
    n && (this._private.coreStyle[r.name] = r);
  }
  return this;
};
tt.append = function(t) {
  return lo(t) ? t.appendToStyle(this) : Ie(t) ? this.appendFromJson(t) : le(t) && this.appendFromString(t), this;
};
je.fromJson = function(t, e) {
  var r = new je(t);
  return r.fromJson(e), r;
};
je.fromString = function(t, e) {
  return new je(t).fromString(e);
};
[rt, ma, yi, St, gn, mi, qe, pn].forEach(function(t) {
  ce(tt, t);
});
je.types = tt.types;
je.properties = tt.properties;
je.propertyGroups = tt.propertyGroups;
je.propertyGroupNames = tt.propertyGroupNames;
je.propertyGroupKeys = tt.propertyGroupKeys;
var uy = {
  style: function(e) {
    if (e) {
      var r = this.setStyle(e);
      r.update();
    }
    return this._private.style;
  },
  setStyle: function(e) {
    var r = this._private;
    return lo(e) ? r.style = e.generateStyle(this) : Ie(e) ? r.style = je.fromJson(this, e) : le(e) ? r.style = je.fromString(this, e) : r.style = je(this), r.style;
  },
  // e.g. cy.data() changed => recalc ele mappers
  updateStyle: function() {
    this.mutableElements().updateStyle();
  }
}, ly = "single", sr = {
  autolock: function(e) {
    if (e !== void 0)
      this._private.autolock = !!e;
    else
      return this._private.autolock;
    return this;
  },
  autoungrabify: function(e) {
    if (e !== void 0)
      this._private.autoungrabify = !!e;
    else
      return this._private.autoungrabify;
    return this;
  },
  autounselectify: function(e) {
    if (e !== void 0)
      this._private.autounselectify = !!e;
    else
      return this._private.autounselectify;
    return this;
  },
  selectionType: function(e) {
    var r = this._private;
    if (r.selectionType == null && (r.selectionType = ly), e !== void 0)
      (e === "additive" || e === "single") && (r.selectionType = e);
    else
      return r.selectionType;
    return this;
  },
  panningEnabled: function(e) {
    if (e !== void 0)
      this._private.panningEnabled = !!e;
    else
      return this._private.panningEnabled;
    return this;
  },
  userPanningEnabled: function(e) {
    if (e !== void 0)
      this._private.userPanningEnabled = !!e;
    else
      return this._private.userPanningEnabled;
    return this;
  },
  zoomingEnabled: function(e) {
    if (e !== void 0)
      this._private.zoomingEnabled = !!e;
    else
      return this._private.zoomingEnabled;
    return this;
  },
  userZoomingEnabled: function(e) {
    if (e !== void 0)
      this._private.userZoomingEnabled = !!e;
    else
      return this._private.userZoomingEnabled;
    return this;
  },
  boxSelectionEnabled: function(e) {
    if (e !== void 0)
      this._private.boxSelectionEnabled = !!e;
    else
      return this._private.boxSelectionEnabled;
    return this;
  },
  pan: function() {
    var e = arguments, r = this._private.pan, a, n, i, s, o;
    switch (e.length) {
      case 0:
        return r;
      case 1:
        if (le(e[0]))
          return a = e[0], r[a];
        if (Te(e[0])) {
          if (!this._private.panningEnabled)
            return this;
          i = e[0], s = i.x, o = i.y, ae(s) && (r.x = s), ae(o) && (r.y = o), this.emit("pan viewport");
        }
        break;
      case 2:
        if (!this._private.panningEnabled)
          return this;
        a = e[0], n = e[1], (a === "x" || a === "y") && ae(n) && (r[a] = n), this.emit("pan viewport");
        break;
    }
    return this.notify("viewport"), this;
  },
  panBy: function(e, r) {
    var a = arguments, n = this._private.pan, i, s, o, u, l;
    if (!this._private.panningEnabled)
      return this;
    switch (a.length) {
      case 1:
        Te(e) && (o = a[0], u = o.x, l = o.y, ae(u) && (n.x += u), ae(l) && (n.y += l), this.emit("pan viewport"));
        break;
      case 2:
        i = e, s = r, (i === "x" || i === "y") && ae(s) && (n[i] += s), this.emit("pan viewport");
        break;
    }
    return this.notify("viewport"), this;
  },
  fit: function(e, r) {
    var a = this.getFitViewport(e, r);
    if (a) {
      var n = this._private;
      n.zoom = a.zoom, n.pan = a.pan, this.emit("pan zoom viewport"), this.notify("viewport");
    }
    return this;
  },
  getFitViewport: function(e, r) {
    if (ae(e) && r === void 0 && (r = e, e = void 0), !(!this._private.panningEnabled || !this._private.zoomingEnabled)) {
      var a;
      if (le(e)) {
        var n = e;
        e = this.$(n);
      } else if (nd(e)) {
        var i = e;
        a = {
          x1: i.x1,
          y1: i.y1,
          x2: i.x2,
          y2: i.y2
        }, a.w = a.x2 - a.x1, a.h = a.y2 - a.y1;
      } else
        ft(e) || (e = this.mutableElements());
      if (!(ft(e) && e.empty())) {
        a = a || e.boundingBox();
        var s = this.width(), o = this.height(), u;
        if (r = ae(r) ? r : 0, !isNaN(s) && !isNaN(o) && s > 0 && o > 0 && !isNaN(a.w) && !isNaN(a.h) && a.w > 0 && a.h > 0) {
          u = Math.min((s - 2 * r) / a.w, (o - 2 * r) / a.h), u = u > this._private.maxZoom ? this._private.maxZoom : u, u = u < this._private.minZoom ? this._private.minZoom : u;
          var l = {
            // now pan to middle
            x: (s - u * (a.x1 + a.x2)) / 2,
            y: (o - u * (a.y1 + a.y2)) / 2
          };
          return {
            zoom: u,
            pan: l
          };
        }
      }
    }
  },
  zoomRange: function(e, r) {
    var a = this._private;
    if (r == null) {
      var n = e;
      e = n.min, r = n.max;
    }
    return ae(e) && ae(r) && e <= r ? (a.minZoom = e, a.maxZoom = r) : ae(e) && r === void 0 && e <= a.maxZoom ? a.minZoom = e : ae(r) && e === void 0 && r >= a.minZoom && (a.maxZoom = r), this;
  },
  minZoom: function(e) {
    return e === void 0 ? this._private.minZoom : this.zoomRange({
      min: e
    });
  },
  maxZoom: function(e) {
    return e === void 0 ? this._private.maxZoom : this.zoomRange({
      max: e
    });
  },
  getZoomedViewport: function(e) {
    var r = this._private, a = r.pan, n = r.zoom, i, s, o = !1;
    if (r.zoomingEnabled || (o = !0), ae(e) ? s = e : Te(e) && (s = e.level, e.position != null ? i = ln(e.position, n, a) : e.renderedPosition != null && (i = e.renderedPosition), i != null && !r.panningEnabled && (o = !0)), s = s > r.maxZoom ? r.maxZoom : s, s = s < r.minZoom ? r.minZoom : s, o || !ae(s) || s === n || i != null && (!ae(i.x) || !ae(i.y)))
      return null;
    if (i != null) {
      var u = a, l = n, f = s, h = {
        x: -f / l * (i.x - u.x) + i.x,
        y: -f / l * (i.y - u.y) + i.y
      };
      return {
        zoomed: !0,
        panned: !0,
        zoom: f,
        pan: h
      };
    } else
      return {
        zoomed: !0,
        panned: !1,
        zoom: s,
        pan: a
      };
  },
  zoom: function(e) {
    if (e === void 0)
      return this._private.zoom;
    var r = this.getZoomedViewport(e), a = this._private;
    return r == null || !r.zoomed ? this : (a.zoom = r.zoom, r.panned && (a.pan.x = r.pan.x, a.pan.y = r.pan.y), this.emit("zoom" + (r.panned ? " pan" : "") + " viewport"), this.notify("viewport"), this);
  },
  viewport: function(e) {
    var r = this._private, a = !0, n = !0, i = [], s = !1, o = !1;
    if (!e)
      return this;
    if (ae(e.zoom) || (a = !1), Te(e.pan) || (n = !1), !a && !n)
      return this;
    if (a) {
      var u = e.zoom;
      u < r.minZoom || u > r.maxZoom || !r.zoomingEnabled ? s = !0 : (r.zoom = u, i.push("zoom"));
    }
    if (n && (!s || !e.cancelOnFailedZoom) && r.panningEnabled) {
      var l = e.pan;
      ae(l.x) && (r.pan.x = l.x, o = !1), ae(l.y) && (r.pan.y = l.y, o = !1), o || i.push("pan");
    }
    return i.length > 0 && (i.push("viewport"), this.emit(i.join(" ")), this.notify("viewport")), this;
  },
  center: function(e) {
    var r = this.getCenterPan(e);
    return r && (this._private.pan = r, this.emit("pan viewport"), this.notify("viewport")), this;
  },
  getCenterPan: function(e, r) {
    if (this._private.panningEnabled) {
      if (le(e)) {
        var a = e;
        e = this.mutableElements().filter(a);
      } else
        ft(e) || (e = this.mutableElements());
      if (e.length !== 0) {
        var n = e.boundingBox(), i = this.width(), s = this.height();
        r = r === void 0 ? this._private.zoom : r;
        var o = {
          // middle
          x: (i - r * (n.x1 + n.x2)) / 2,
          y: (s - r * (n.y1 + n.y2)) / 2
        };
        return o;
      }
    }
  },
  reset: function() {
    return !this._private.panningEnabled || !this._private.zoomingEnabled ? this : (this.viewport({
      pan: {
        x: 0,
        y: 0
      },
      zoom: 1
    }), this);
  },
  invalidateSize: function() {
    this._private.sizeCache = null;
  },
  size: function() {
    var e = this._private, r = e.container;
    return e.sizeCache = e.sizeCache || (r ? function() {
      var a = Be.getComputedStyle(r), n = function(s) {
        return parseFloat(a.getPropertyValue(s));
      };
      return {
        width: r.clientWidth - n("padding-left") - n("padding-right"),
        height: r.clientHeight - n("padding-top") - n("padding-bottom")
      };
    }() : {
      // fallback if no container (not 0 b/c can be used for dividing etc)
      width: 1,
      height: 1
    });
  },
  width: function() {
    return this.size().width;
  },
  height: function() {
    return this.size().height;
  },
  extent: function() {
    var e = this._private.pan, r = this._private.zoom, a = this.renderedExtent(), n = {
      x1: (a.x1 - e.x) / r,
      x2: (a.x2 - e.x) / r,
      y1: (a.y1 - e.y) / r,
      y2: (a.y2 - e.y) / r
    };
    return n.w = n.x2 - n.x1, n.h = n.y2 - n.y1, n;
  },
  renderedExtent: function() {
    var e = this.width(), r = this.height();
    return {
      x1: 0,
      y1: 0,
      x2: e,
      y2: r,
      w: e,
      h: r
    };
  },
  multiClickDebounceTime: function(e) {
    if (e)
      this._private.multiClickDebounceTime = e;
    else
      return this._private.multiClickDebounceTime;
    return this;
  }
};
sr.centre = sr.center;
sr.autolockNodes = sr.autolock;
sr.autoungrabifyNodes = sr.autoungrabify;
var la = {
  data: Le.data({
    field: "data",
    bindingEvent: "data",
    allowBinding: !0,
    allowSetting: !0,
    settingEvent: "data",
    settingTriggersEvent: !0,
    triggerFnName: "trigger",
    allowGetting: !0,
    updateStyle: !0
  }),
  removeData: Le.removeData({
    field: "data",
    event: "data",
    triggerFnName: "trigger",
    triggerEvent: !0,
    updateStyle: !0
  }),
  scratch: Le.data({
    field: "scratch",
    bindingEvent: "scratch",
    allowBinding: !0,
    allowSetting: !0,
    settingEvent: "scratch",
    settingTriggersEvent: !0,
    triggerFnName: "trigger",
    allowGetting: !0,
    updateStyle: !0
  }),
  removeScratch: Le.removeData({
    field: "scratch",
    event: "scratch",
    triggerFnName: "trigger",
    triggerEvent: !0,
    updateStyle: !0
  })
};
la.attr = la.data;
la.removeAttr = la.removeData;
var fa = function(e) {
  var r = this;
  e = ce({}, e);
  var a = e.container;
  a && !Ua(a) && Ua(a[0]) && (a = a[0]);
  var n = a ? a._cyreg : null;
  n = n || {}, n && n.cy && (n.cy.destroy(), n = {});
  var i = n.readies = n.readies || [];
  a && (a._cyreg = n), n.cy = r;
  var s = Be !== void 0 && a !== void 0 && !e.headless, o = e;
  o.layout = ce({
    name: s ? "grid" : "null"
  }, o.layout), o.renderer = ce({
    name: s ? "canvas" : "null"
  }, o.renderer);
  var u = function(d, g, y) {
    return g !== void 0 ? g : y !== void 0 ? y : d;
  }, l = this._private = {
    container: a,
    // html dom ele container
    ready: !1,
    // whether ready has been triggered
    options: o,
    // cached options
    elements: new Ke(this),
    // elements in the graph
    listeners: [],
    // list of listeners
    aniEles: new Ke(this),
    // elements being animated
    data: o.data || {},
    // data for the core
    scratch: {},
    // scratch object for core
    layout: null,
    renderer: null,
    destroyed: !1,
    // whether destroy was called
    notificationsEnabled: !0,
    // whether notifications are sent to the renderer
    minZoom: 1e-50,
    maxZoom: 1e50,
    zoomingEnabled: u(!0, o.zoomingEnabled),
    userZoomingEnabled: u(!0, o.userZoomingEnabled),
    panningEnabled: u(!0, o.panningEnabled),
    userPanningEnabled: u(!0, o.userPanningEnabled),
    boxSelectionEnabled: u(!0, o.boxSelectionEnabled),
    autolock: u(!1, o.autolock, o.autolockNodes),
    autoungrabify: u(!1, o.autoungrabify, o.autoungrabifyNodes),
    autounselectify: u(!1, o.autounselectify),
    styleEnabled: o.styleEnabled === void 0 ? s : o.styleEnabled,
    zoom: ae(o.zoom) ? o.zoom : 1,
    pan: {
      x: Te(o.pan) && ae(o.pan.x) ? o.pan.x : 0,
      y: Te(o.pan) && ae(o.pan.y) ? o.pan.y : 0
    },
    animation: {
      // object for currently-running animations
      current: [],
      queue: []
    },
    hasCompoundNodes: !1,
    multiClickDebounceTime: u(250, o.multiClickDebounceTime)
  };
  this.createEmitter(), this.selectionType(o.selectionType), this.zoomRange({
    min: o.minZoom,
    max: o.maxZoom
  });
  var f = function(d, g) {
    var y = d.some(id);
    if (y)
      return Rr.all(d).then(g);
    g(d);
  };
  l.styleEnabled && r.setStyle([]);
  var h = ce({}, o, o.renderer);
  r.initRenderer(h);
  var c = function(d, g, y) {
    r.notifications(!1);
    var p = r.mutableElements();
    p.length > 0 && p.remove(), d != null && (Te(d) || Ie(d)) && r.add(d), r.one("layoutready", function(m) {
      r.notifications(!0), r.emit(m), r.one("load", g), r.emitAndNotify("load");
    }).one("layoutstop", function() {
      r.one("done", y), r.emit("done");
    });
    var E = ce({}, r._private.options.layout);
    E.eles = r.elements(), r.layout(E).run();
  };
  f([o.style, o.elements], function(v) {
    var d = v[0], g = v[1];
    l.styleEnabled && r.style().append(d), c(g, function() {
      r.startAnimationLoop(), l.ready = !0, Fe(o.ready) && r.on("ready", o.ready);
      for (var y = 0; y < i.length; y++) {
        var p = i[y];
        r.on("ready", p);
      }
      n && (n.readies = []), r.emit("ready");
    }, o.done);
  });
}, Wa = fa.prototype;
ce(Wa, {
  instanceString: function() {
    return "core";
  },
  isReady: function() {
    return this._private.ready;
  },
  destroyed: function() {
    return this._private.destroyed;
  },
  ready: function(e) {
    return this.isReady() ? this.emitter().emit("ready", [], e) : this.on("ready", e), this;
  },
  destroy: function() {
    var e = this;
    if (!e.destroyed())
      return e.stopAnimationLoop(), e.destroyRenderer(), this.emit("destroy"), e._private.destroyed = !0, e;
  },
  hasElementWithId: function(e) {
    return this._private.elements.hasElementWithId(e);
  },
  getElementById: function(e) {
    return this._private.elements.getElementById(e);
  },
  hasCompoundNodes: function() {
    return this._private.hasCompoundNodes;
  },
  headless: function() {
    return this._private.renderer.isHeadless();
  },
  styleEnabled: function() {
    return this._private.styleEnabled;
  },
  addToPool: function(e) {
    return this._private.elements.merge(e), this;
  },
  removeFromPool: function(e) {
    return this._private.elements.unmerge(e), this;
  },
  container: function() {
    return this._private.container || null;
  },
  mount: function(e) {
    if (e != null) {
      var r = this, a = r._private, n = a.options;
      return !Ua(e) && Ua(e[0]) && (e = e[0]), r.stopAnimationLoop(), r.destroyRenderer(), a.container = e, a.styleEnabled = !0, r.invalidateSize(), r.initRenderer(ce({}, n, n.renderer, {
        // allow custom renderer name to be re-used, otherwise use canvas
        name: n.renderer.name === "null" ? "canvas" : n.renderer.name
      })), r.startAnimationLoop(), r.style(n.style), r.emit("mount"), r;
    }
  },
  unmount: function() {
    var e = this;
    return e.stopAnimationLoop(), e.destroyRenderer(), e.initRenderer({
      name: "null"
    }), e.emit("unmount"), e;
  },
  options: function() {
    return Ct(this._private.options);
  },
  json: function(e) {
    var r = this, a = r._private, n = r.mutableElements(), i = function(T) {
      return r.getElementById(T.id());
    };
    if (Te(e)) {
      if (r.startBatch(), e.elements) {
        var s = {}, o = function(T, C) {
          for (var S = [], b = [], x = 0; x < T.length; x++) {
            var w = T[x];
            if (!w.data.id) {
              Ae("cy.json() cannot handle elements without an ID attribute");
              continue;
            }
            var D = "" + w.data.id, A = r.getElementById(D);
            s[D] = !0, A.length !== 0 ? b.push({
              ele: A,
              json: w
            }) : (C && (w.group = C), S.push(w));
          }
          r.add(S);
          for (var L = 0; L < b.length; L++) {
            var M = b[L], O = M.ele, P = M.json;
            O.json(P);
          }
        };
        if (Ie(e.elements))
          o(e.elements);
        else
          for (var u = ["nodes", "edges"], l = 0; l < u.length; l++) {
            var f = u[l], h = e.elements[f];
            Ie(h) && o(h, f);
          }
        var c = r.collection();
        n.filter(function(m) {
          return !s[m.id()];
        }).forEach(function(m) {
          m.isParent() ? c.merge(m) : m.remove();
        }), c.forEach(function(m) {
          return m.children().move({
            parent: null
          });
        }), c.forEach(function(m) {
          return i(m).remove();
        });
      }
      e.style && r.style(e.style), e.zoom != null && e.zoom !== a.zoom && r.zoom(e.zoom), e.pan && (e.pan.x !== a.pan.x || e.pan.y !== a.pan.y) && r.pan(e.pan), e.data && r.data(e.data);
      for (var v = ["minZoom", "maxZoom", "zoomingEnabled", "userZoomingEnabled", "panningEnabled", "userPanningEnabled", "boxSelectionEnabled", "autolock", "autoungrabify", "autounselectify", "multiClickDebounceTime"], d = 0; d < v.length; d++) {
        var g = v[d];
        e[g] != null && r[g](e[g]);
      }
      return r.endBatch(), this;
    } else {
      var y = !!e, p = {};
      y ? p.elements = this.elements().map(function(m) {
        return m.json();
      }) : (p.elements = {}, n.forEach(function(m) {
        var T = m.group();
        p.elements[T] || (p.elements[T] = []), p.elements[T].push(m.json());
      })), this._private.styleEnabled && (p.style = r.style().json()), p.data = Ct(r.data());
      var E = a.options;
      return p.zoomingEnabled = a.zoomingEnabled, p.userZoomingEnabled = a.userZoomingEnabled, p.zoom = a.zoom, p.minZoom = a.minZoom, p.maxZoom = a.maxZoom, p.panningEnabled = a.panningEnabled, p.userPanningEnabled = a.userPanningEnabled, p.pan = Ct(a.pan), p.boxSelectionEnabled = a.boxSelectionEnabled, p.renderer = Ct(E.renderer), p.hideEdgesOnViewport = E.hideEdgesOnViewport, p.textureOnViewport = E.textureOnViewport, p.wheelSensitivity = E.wheelSensitivity, p.motionBlur = E.motionBlur, p.multiClickDebounceTime = E.multiClickDebounceTime, p;
    }
  }
});
Wa.$id = Wa.getElementById;
[Jp, ay, au, Yn, $a, iy, Hn, Va, uy, sr, la].forEach(function(t) {
  ce(Wa, t);
});
var fy = {
  fit: !0,
  // whether to fit the viewport to the graph
  directed: !1,
  // whether the tree is directed downwards (or edges can point in any direction if false)
  padding: 30,
  // padding on fit
  circle: !1,
  // put depths in concentric circles if true, put depths top down if false
  grid: !1,
  // whether to create an even grid into which the DAG is placed (circle:false only)
  spacingFactor: 1.75,
  // positive spacing factor, larger => more space between nodes (N.B. n/a if causes overlap)
  boundingBox: void 0,
  // constrain layout bounds; { x1, y1, x2, y2 } or { x1, y1, w, h }
  avoidOverlap: !0,
  // prevents node overlap, may overflow boundingBox if not enough space
  nodeDimensionsIncludeLabels: !1,
  // Excludes the label when calculating node bounding boxes for the layout algorithm
  roots: void 0,
  // the roots of the trees
  maximal: !1,
  // whether to shift nodes down their natural BFS depths in order to avoid upwards edges (DAGS only)
  depthSort: void 0,
  // a sorting function to order nodes at equal depth. e.g. function(a, b){ return a.data('weight') - b.data('weight') }
  animate: !1,
  // whether to transition the node positions
  animationDuration: 500,
  // duration of animation in ms if enabled
  animationEasing: void 0,
  // easing of animation if enabled,
  animateFilter: function(e, r) {
    return !0;
  },
  // a function that determines whether the node should be animated.  All nodes animated by default on animate enabled.  Non-animated nodes are positioned immediately when the layout starts
  ready: void 0,
  // callback on layoutready
  stop: void 0,
  // callback on layoutstop
  transform: function(e, r) {
    return r;
  }
  // transform a given node position. Useful for changing flow direction in discrete layouts
}, yr = function(e) {
  return e.scratch("breadthfirst");
}, Ls = function(e, r) {
  return e.scratch("breadthfirst", r);
};
function nu(t) {
  this.options = ce({}, fy, t);
}
nu.prototype.run = function() {
  var t = this.options, e = t, r = t.cy, a = e.eles, n = a.nodes().filter(function(ee) {
    return !ee.isParent();
  }), i = a, s = e.directed, o = e.maximal || e.maximalAdjustments > 0, u = lt(e.boundingBox ? e.boundingBox : {
    x1: 0,
    y1: 0,
    w: r.width(),
    h: r.height()
  }), l;
  if (ft(e.roots))
    l = e.roots;
  else if (Ie(e.roots)) {
    for (var f = [], h = 0; h < e.roots.length; h++) {
      var c = e.roots[h], v = r.getElementById(c);
      f.push(v);
    }
    l = r.collection(f);
  } else if (le(e.roots))
    l = r.$(e.roots);
  else if (s)
    l = n.roots();
  else {
    var d = a.components();
    l = r.collection();
    for (var g = function(re) {
      var fe = d[re], se = fe.maxDegree(!1), ne = fe.filter(function(ue) {
        return ue.degree(!1) === se;
      });
      l = l.add(ne);
    }, y = 0; y < d.length; y++)
      g(y);
  }
  var p = [], E = {}, m = function(re, fe) {
    p[fe] == null && (p[fe] = []);
    var se = p[fe].length;
    p[fe].push(re), Ls(re, {
      index: se,
      depth: fe
    });
  }, T = function(re, fe) {
    var se = yr(re), ne = se.depth, ue = se.index;
    p[ne][ue] = null, m(re, fe);
  };
  i.bfs({
    roots: l,
    directed: e.directed,
    visit: function(re, fe, se, ne, ue) {
      var Ee = re[0], ge = Ee.id();
      m(Ee, ue), E[ge] = !0;
    }
  });
  for (var C = [], S = 0; S < n.length; S++) {
    var b = n[S];
    E[b.id()] || C.push(b);
  }
  var x = function(re) {
    for (var fe = p[re], se = 0; se < fe.length; se++) {
      var ne = fe[se];
      if (ne == null) {
        fe.splice(se, 1), se--;
        continue;
      }
      Ls(ne, {
        depth: re,
        index: se
      });
    }
  }, w = function() {
    for (var re = 0; re < p.length; re++)
      x(re);
  }, D = function(re, fe) {
    for (var se = yr(re), ne = re.incomers().filter(function(N) {
      return N.isNode() && a.has(N);
    }), ue = -1, Ee = re.id(), ge = 0; ge < ne.length; ge++) {
      var ve = ne[ge], J = yr(ve);
      ue = Math.max(ue, J.depth);
    }
    return se.depth <= ue ? fe[Ee] ? null : (T(re, ue + 1), fe[Ee] = !0, !0) : !1;
  };
  if (s && o) {
    var A = [], L = {}, M = function(re) {
      return A.push(re);
    }, O = function() {
      return A.shift();
    };
    for (n.forEach(function(ee) {
      return A.push(ee);
    }); A.length > 0; ) {
      var P = O(), I = D(P, L);
      if (I)
        P.outgoers().filter(function(ee) {
          return ee.isNode() && a.has(ee);
        }).forEach(M);
      else if (I === null) {
        Ae("Detected double maximal shift for node `" + P.id() + "`.  Bailing maximal adjustment due to cycle.  Use `options.maximal: true` only on DAGs.");
        break;
      }
    }
  }
  w();
  var k = 0;
  if (e.avoidOverlap)
    for (var R = 0; R < n.length; R++) {
      var B = n[R], z = B.layoutDimensions(e), F = z.w, $ = z.h;
      k = Math.max(k, F, $);
    }
  var U = {}, V = function(re) {
    if (U[re.id()])
      return U[re.id()];
    for (var fe = yr(re).depth, se = re.neighborhood(), ne = 0, ue = 0, Ee = 0; Ee < se.length; Ee++) {
      var ge = se[Ee];
      if (!(ge.isEdge() || ge.isParent() || !n.has(ge))) {
        var ve = yr(ge);
        if (ve != null) {
          var J = ve.index, N = ve.depth;
          if (!(J == null || N == null)) {
            var _ = p[N].length;
            N < fe && (ne += J / _, ue++);
          }
        }
      }
    }
    return ue = Math.max(1, ue), ne = ne / ue, ue === 0 && (ne = 0), U[re.id()] = ne, ne;
  }, H = function(re, fe) {
    var se = V(re), ne = V(fe), ue = se - ne;
    return ue === 0 ? ho(re.id(), fe.id()) : ue;
  };
  e.depthSort !== void 0 && (H = e.depthSort);
  for (var Y = 0; Y < p.length; Y++)
    p[Y].sort(H), x(Y);
  for (var G = [], X = 0; X < C.length; X++)
    G.push(C[X]);
  p.unshift(G), w();
  for (var K = 0, Z = 0; Z < p.length; Z++)
    K = Math.max(p[Z].length, K);
  var te = {
    x: u.x1 + u.w / 2,
    y: u.x1 + u.h / 2
  }, he = p.reduce(function(ee, re) {
    return Math.max(ee, re.length);
  }, 0), de = function(re) {
    var fe = yr(re), se = fe.depth, ne = fe.index, ue = p[se].length, Ee = Math.max(u.w / ((e.grid ? he : ue) + 1), k), ge = Math.max(u.h / (p.length + 1), k), ve = Math.min(u.w / 2 / p.length, u.h / 2 / p.length);
    if (ve = Math.max(ve, k), e.circle) {
      var N = ve * se + ve - (p.length > 0 && p[0].length <= 3 ? ve / 2 : 0), _ = 2 * Math.PI / p[se].length * ne;
      return se === 0 && p[0].length === 1 && (N = 1), {
        x: te.x + N * Math.cos(_),
        y: te.y + N * Math.sin(_)
      };
    } else {
      var J = {
        x: te.x + (ne + 1 - (ue + 1) / 2) * Ee,
        y: (se + 1) * ge
      };
      return J;
    }
  };
  return a.nodes().layoutPositions(this, e, de), this;
};
var hy = {
  fit: !0,
  // whether to fit the viewport to the graph
  padding: 30,
  // the padding on fit
  boundingBox: void 0,
  // constrain layout bounds; { x1, y1, x2, y2 } or { x1, y1, w, h }
  avoidOverlap: !0,
  // prevents node overlap, may overflow boundingBox and radius if not enough space
  nodeDimensionsIncludeLabels: !1,
  // Excludes the label when calculating node bounding boxes for the layout algorithm
  spacingFactor: void 0,
  // Applies a multiplicative factor (>0) to expand or compress the overall area that the nodes take up
  radius: void 0,
  // the radius of the circle
  startAngle: 3 / 2 * Math.PI,
  // where nodes start in radians
  sweep: void 0,
  // how many radians should be between the first and last node (defaults to full circle)
  clockwise: !0,
  // whether the layout should go clockwise (true) or counterclockwise/anticlockwise (false)
  sort: void 0,
  // a sorting function to order the nodes; e.g. function(a, b){ return a.data('weight') - b.data('weight') }
  animate: !1,
  // whether to transition the node positions
  animationDuration: 500,
  // duration of animation in ms if enabled
  animationEasing: void 0,
  // easing of animation if enabled
  animateFilter: function(e, r) {
    return !0;
  },
  // a function that determines whether the node should be animated.  All nodes animated by default on animate enabled.  Non-animated nodes are positioned immediately when the layout starts
  ready: void 0,
  // callback on layoutready
  stop: void 0,
  // callback on layoutstop
  transform: function(e, r) {
    return r;
  }
  // transform a given node position. Useful for changing flow direction in discrete layouts 
};
function iu(t) {
  this.options = ce({}, hy, t);
}
iu.prototype.run = function() {
  var t = this.options, e = t, r = t.cy, a = e.eles, n = e.counterclockwise !== void 0 ? !e.counterclockwise : e.clockwise, i = a.nodes().not(":parent");
  e.sort && (i = i.sort(e.sort));
  for (var s = lt(e.boundingBox ? e.boundingBox : {
    x1: 0,
    y1: 0,
    w: r.width(),
    h: r.height()
  }), o = {
    x: s.x1 + s.w / 2,
    y: s.y1 + s.h / 2
  }, u = e.sweep === void 0 ? 2 * Math.PI - 2 * Math.PI / i.length : e.sweep, l = u / Math.max(1, i.length - 1), f, h = 0, c = 0; c < i.length; c++) {
    var v = i[c], d = v.layoutDimensions(e), g = d.w, y = d.h;
    h = Math.max(h, g, y);
  }
  if (ae(e.radius) ? f = e.radius : i.length <= 1 ? f = 0 : f = Math.min(s.h, s.w) / 2 - h, i.length > 1 && e.avoidOverlap) {
    h *= 1.75;
    var p = Math.cos(l) - Math.cos(0), E = Math.sin(l) - Math.sin(0), m = Math.sqrt(h * h / (p * p + E * E));
    f = Math.max(m, f);
  }
  var T = function(S, b) {
    var x = e.startAngle + b * l * (n ? 1 : -1), w = f * Math.cos(x), D = f * Math.sin(x), A = {
      x: o.x + w,
      y: o.y + D
    };
    return A;
  };
  return a.nodes().layoutPositions(this, e, T), this;
};
var vy = {
  fit: !0,
  // whether to fit the viewport to the graph
  padding: 30,
  // the padding on fit
  startAngle: 3 / 2 * Math.PI,
  // where nodes start in radians
  sweep: void 0,
  // how many radians should be between the first and last node (defaults to full circle)
  clockwise: !0,
  // whether the layout should go clockwise (true) or counterclockwise/anticlockwise (false)
  equidistant: !1,
  // whether levels have an equal radial distance betwen them, may cause bounding box overflow
  minNodeSpacing: 10,
  // min spacing between outside of nodes (used for radius adjustment)
  boundingBox: void 0,
  // constrain layout bounds; { x1, y1, x2, y2 } or { x1, y1, w, h }
  avoidOverlap: !0,
  // prevents node overlap, may overflow boundingBox if not enough space
  nodeDimensionsIncludeLabels: !1,
  // Excludes the label when calculating node bounding boxes for the layout algorithm
  height: void 0,
  // height of layout area (overrides container height)
  width: void 0,
  // width of layout area (overrides container width)
  spacingFactor: void 0,
  // Applies a multiplicative factor (>0) to expand or compress the overall area that the nodes take up
  concentric: function(e) {
    return e.degree();
  },
  levelWidth: function(e) {
    return e.maxDegree() / 4;
  },
  animate: !1,
  // whether to transition the node positions
  animationDuration: 500,
  // duration of animation in ms if enabled
  animationEasing: void 0,
  // easing of animation if enabled
  animateFilter: function(e, r) {
    return !0;
  },
  // a function that determines whether the node should be animated.  All nodes animated by default on animate enabled.  Non-animated nodes are positioned immediately when the layout starts
  ready: void 0,
  // callback on layoutready
  stop: void 0,
  // callback on layoutstop
  transform: function(e, r) {
    return r;
  }
  // transform a given node position. Useful for changing flow direction in discrete layouts
};
function su(t) {
  this.options = ce({}, vy, t);
}
su.prototype.run = function() {
  for (var t = this.options, e = t, r = e.counterclockwise !== void 0 ? !e.counterclockwise : e.clockwise, a = t.cy, n = e.eles, i = n.nodes().not(":parent"), s = lt(e.boundingBox ? e.boundingBox : {
    x1: 0,
    y1: 0,
    w: a.width(),
    h: a.height()
  }), o = {
    x: s.x1 + s.w / 2,
    y: s.y1 + s.h / 2
  }, u = [], l = 0, f = 0; f < i.length; f++) {
    var h = i[f], c = void 0;
    c = e.concentric(h), u.push({
      value: c,
      node: h
    }), h._private.scratch.concentric = c;
  }
  i.updateStyle();
  for (var v = 0; v < i.length; v++) {
    var d = i[v], g = d.layoutDimensions(e);
    l = Math.max(l, g.w, g.h);
  }
  u.sort(function(ee, re) {
    return re.value - ee.value;
  });
  for (var y = e.levelWidth(i), p = [[]], E = p[0], m = 0; m < u.length; m++) {
    var T = u[m];
    if (E.length > 0) {
      var C = Math.abs(E[0].value - T.value);
      C >= y && (E = [], p.push(E));
    }
    E.push(T);
  }
  var S = l + e.minNodeSpacing;
  if (!e.avoidOverlap) {
    var b = p.length > 0 && p[0].length > 1, x = Math.min(s.w, s.h) / 2 - S, w = x / (p.length + b ? 1 : 0);
    S = Math.min(S, w);
  }
  for (var D = 0, A = 0; A < p.length; A++) {
    var L = p[A], M = e.sweep === void 0 ? 2 * Math.PI - 2 * Math.PI / L.length : e.sweep, O = L.dTheta = M / Math.max(1, L.length - 1);
    if (L.length > 1 && e.avoidOverlap) {
      var P = Math.cos(O) - Math.cos(0), I = Math.sin(O) - Math.sin(0), k = Math.sqrt(S * S / (P * P + I * I));
      D = Math.max(k, D);
    }
    L.r = D, D += S;
  }
  if (e.equidistant) {
    for (var R = 0, B = 0, z = 0; z < p.length; z++) {
      var F = p[z], $ = F.r - B;
      R = Math.max(R, $);
    }
    B = 0;
    for (var U = 0; U < p.length; U++) {
      var V = p[U];
      U === 0 && (B = V.r), V.r = B, B += R;
    }
  }
  for (var H = {}, Y = 0; Y < p.length; Y++)
    for (var G = p[Y], X = G.dTheta, K = G.r, Z = 0; Z < G.length; Z++) {
      var te = G[Z], he = e.startAngle + (r ? 1 : -1) * X * Z, de = {
        x: o.x + K * Math.cos(he),
        y: o.y + K * Math.sin(he)
      };
      H[te.node.id()] = de;
    }
  return n.nodes().layoutPositions(this, e, function(ee) {
    var re = ee.id();
    return H[re];
  }), this;
};
var In, cy = {
  // Called on `layoutready`
  ready: function() {
  },
  // Called on `layoutstop`
  stop: function() {
  },
  // Whether to animate while running the layout
  // true : Animate continuously as the layout is running
  // false : Just show the end result
  // 'end' : Animate with the end result, from the initial positions to the end positions
  animate: !0,
  // Easing of the animation for animate:'end'
  animationEasing: void 0,
  // The duration of the animation for animate:'end'
  animationDuration: void 0,
  // A function that determines whether the node should be animated
  // All nodes animated by default on animate enabled
  // Non-animated nodes are positioned immediately when the layout starts
  animateFilter: function(e, r) {
    return !0;
  },
  // The layout animates only after this many milliseconds for animate:true
  // (prevents flashing on fast runs)
  animationThreshold: 250,
  // Number of iterations between consecutive screen positions update
  refresh: 20,
  // Whether to fit the network view after when done
  fit: !0,
  // Padding on fit
  padding: 30,
  // Constrain layout bounds; { x1, y1, x2, y2 } or { x1, y1, w, h }
  boundingBox: void 0,
  // Excludes the label when calculating node bounding boxes for the layout algorithm
  nodeDimensionsIncludeLabels: !1,
  // Randomize the initial positions of the nodes (true) or use existing positions (false)
  randomize: !1,
  // Extra spacing between components in non-compound graphs
  componentSpacing: 40,
  // Node repulsion (non overlapping) multiplier
  nodeRepulsion: function(e) {
    return 2048;
  },
  // Node repulsion (overlapping) multiplier
  nodeOverlap: 4,
  // Ideal edge (non nested) length
  idealEdgeLength: function(e) {
    return 32;
  },
  // Divisor to compute edge forces
  edgeElasticity: function(e) {
    return 32;
  },
  // Nesting factor (multiplier) to compute ideal edge length for nested edges
  nestingFactor: 1.2,
  // Gravity force (constant)
  gravity: 1,
  // Maximum number of iterations to perform
  numIter: 1e3,
  // Initial temperature (maximum node displacement)
  initialTemp: 1e3,
  // Cooling factor (how the temperature is reduced between consecutive iterations
  coolingFactor: 0.99,
  // Lower temperature threshold (below this point the layout will end)
  minTemp: 1
};
function yn(t) {
  this.options = ce({}, cy, t), this.options.layout = this;
}
yn.prototype.run = function() {
  var t = this.options, e = t.cy, r = this;
  r.stopped = !1, (t.animate === !0 || t.animate === !1) && r.emit({
    type: "layoutstart",
    layout: r
  }), t.debug === !0 ? In = !0 : In = !1;
  var a = dy(e, r, t);
  In && yy(a), t.randomize && my(a);
  var n = Mt(), i = function() {
    by(a, e, t), t.fit === !0 && e.fit(t.padding);
  }, s = function(c) {
    return !(r.stopped || c >= t.numIter || (Ey(a, t), a.temperature = a.temperature * t.coolingFactor, a.temperature < t.minTemp));
  }, o = function() {
    if (t.animate === !0 || t.animate === !1)
      i(), r.one("layoutstop", t.stop), r.emit({
        type: "layoutstop",
        layout: r
      });
    else {
      var c = t.eles.nodes(), v = ou(a, t, c);
      c.layoutPositions(r, t, v);
    }
  }, u = 0, l = !0;
  if (t.animate === !0) {
    var f = function h() {
      for (var c = 0; l && c < t.refresh; )
        l = s(u), u++, c++;
      if (!l)
        Os(a, t), o();
      else {
        var v = Mt();
        v - n >= t.animationThreshold && i(), Ya(h);
      }
    };
    f();
  } else {
    for (; l; )
      l = s(u), u++;
    Os(a, t), o();
  }
  return this;
};
yn.prototype.stop = function() {
  return this.stopped = !0, this.thread && this.thread.stop(), this.emit("layoutstop"), this;
};
yn.prototype.destroy = function() {
  return this.thread && this.thread.stop(), this;
};
var dy = function(e, r, a) {
  for (var n = a.eles.edges(), i = a.eles.nodes(), s = {
    isCompound: e.hasCompoundNodes(),
    layoutNodes: [],
    idToIndex: {},
    nodeSize: i.size(),
    graphSet: [],
    indexToGraph: [],
    layoutEdges: [],
    edgeSize: n.size(),
    temperature: a.initialTemp,
    clientWidth: e.width(),
    clientHeight: e.width(),
    boundingBox: lt(a.boundingBox ? a.boundingBox : {
      x1: 0,
      y1: 0,
      w: e.width(),
      h: e.height()
    })
  }, o = a.eles.components(), u = {}, l = 0; l < o.length; l++)
    for (var f = o[l], h = 0; h < f.length; h++) {
      var c = f[h];
      u[c.id()] = l;
    }
  for (var l = 0; l < s.nodeSize; l++) {
    var v = i[l], d = v.layoutDimensions(a), g = {};
    g.isLocked = v.locked(), g.id = v.data("id"), g.parentId = v.data("parent"), g.cmptId = u[v.id()], g.children = [], g.positionX = v.position("x"), g.positionY = v.position("y"), g.offsetX = 0, g.offsetY = 0, g.height = d.w, g.width = d.h, g.maxX = g.positionX + g.width / 2, g.minX = g.positionX - g.width / 2, g.maxY = g.positionY + g.height / 2, g.minY = g.positionY - g.height / 2, g.padLeft = parseFloat(v.style("padding")), g.padRight = parseFloat(v.style("padding")), g.padTop = parseFloat(v.style("padding")), g.padBottom = parseFloat(v.style("padding")), g.nodeRepulsion = Fe(a.nodeRepulsion) ? a.nodeRepulsion(v) : a.nodeRepulsion, s.layoutNodes.push(g), s.idToIndex[g.id] = l;
  }
  for (var y = [], p = 0, E = -1, m = [], l = 0; l < s.nodeSize; l++) {
    var v = s.layoutNodes[l], T = v.parentId;
    T != null ? s.layoutNodes[s.idToIndex[T]].children.push(v.id) : (y[++E] = v.id, m.push(v.id));
  }
  for (s.graphSet.push(m); p <= E; ) {
    var C = y[p++], S = s.idToIndex[C], c = s.layoutNodes[S], b = c.children;
    if (b.length > 0) {
      s.graphSet.push(b);
      for (var l = 0; l < b.length; l++)
        y[++E] = b[l];
    }
  }
  for (var l = 0; l < s.graphSet.length; l++)
    for (var x = s.graphSet[l], h = 0; h < x.length; h++) {
      var w = s.idToIndex[x[h]];
      s.indexToGraph[w] = l;
    }
  for (var l = 0; l < s.edgeSize; l++) {
    var D = n[l], A = {};
    A.id = D.data("id"), A.sourceId = D.data("source"), A.targetId = D.data("target");
    var L = Fe(a.idealEdgeLength) ? a.idealEdgeLength(D) : a.idealEdgeLength, M = Fe(a.edgeElasticity) ? a.edgeElasticity(D) : a.edgeElasticity, O = s.idToIndex[A.sourceId], P = s.idToIndex[A.targetId], I = s.indexToGraph[O], k = s.indexToGraph[P];
    if (I != k) {
      for (var R = gy(A.sourceId, A.targetId, s), B = s.graphSet[R], z = 0, g = s.layoutNodes[O]; B.indexOf(g.id) === -1; )
        g = s.layoutNodes[s.idToIndex[g.parentId]], z++;
      for (g = s.layoutNodes[P]; B.indexOf(g.id) === -1; )
        g = s.layoutNodes[s.idToIndex[g.parentId]], z++;
      L *= z * a.nestingFactor;
    }
    A.idealLength = L, A.elasticity = M, s.layoutEdges.push(A);
  }
  return s;
}, gy = function(e, r, a) {
  var n = py(e, r, 0, a);
  return 2 > n.count ? 0 : n.graph;
}, py = function t(e, r, a, n) {
  var i = n.graphSet[a];
  if (-1 < i.indexOf(e) && -1 < i.indexOf(r))
    return {
      count: 2,
      graph: a
    };
  for (var s = 0, o = 0; o < i.length; o++) {
    var u = i[o], l = n.idToIndex[u], f = n.layoutNodes[l].children;
    if (f.length !== 0) {
      var h = n.indexToGraph[n.idToIndex[f[0]]], c = t(e, r, h, n);
      if (c.count !== 0)
        if (c.count === 1) {
          if (s++, s === 2)
            break;
        } else
          return c;
    }
  }
  return {
    count: s,
    graph: a
  };
}, yy, my = function(e, r) {
  for (var a = e.clientWidth, n = e.clientHeight, i = 0; i < e.nodeSize; i++) {
    var s = e.layoutNodes[i];
    s.children.length === 0 && !s.isLocked && (s.positionX = Math.random() * a, s.positionY = Math.random() * n);
  }
}, ou = function(e, r, a) {
  var n = e.boundingBox, i = {
    x1: 1 / 0,
    x2: -1 / 0,
    y1: 1 / 0,
    y2: -1 / 0
  };
  return r.boundingBox && (a.forEach(function(s) {
    var o = e.layoutNodes[e.idToIndex[s.data("id")]];
    i.x1 = Math.min(i.x1, o.positionX), i.x2 = Math.max(i.x2, o.positionX), i.y1 = Math.min(i.y1, o.positionY), i.y2 = Math.max(i.y2, o.positionY);
  }), i.w = i.x2 - i.x1, i.h = i.y2 - i.y1), function(s, o) {
    var u = e.layoutNodes[e.idToIndex[s.data("id")]];
    if (r.boundingBox) {
      var l = (u.positionX - i.x1) / i.w, f = (u.positionY - i.y1) / i.h;
      return {
        x: n.x1 + l * n.w,
        y: n.y1 + f * n.h
      };
    } else
      return {
        x: u.positionX,
        y: u.positionY
      };
  };
}, by = function(e, r, a) {
  var n = a.layout, i = a.eles.nodes(), s = ou(e, a, i);
  i.positions(s), e.ready !== !0 && (e.ready = !0, n.one("layoutready", a.ready), n.emit({
    type: "layoutready",
    layout: this
  }));
}, Ey = function(e, r, a) {
  wy(e, r), Cy(e), Dy(e, r), Sy(e), Ly(e);
}, wy = function(e, r) {
  for (var a = 0; a < e.graphSet.length; a++)
    for (var n = e.graphSet[a], i = n.length, s = 0; s < i; s++)
      for (var o = e.layoutNodes[e.idToIndex[n[s]]], u = s + 1; u < i; u++) {
        var l = e.layoutNodes[e.idToIndex[n[u]]];
        xy(o, l, e, r);
      }
}, As = function(e) {
  return -e + 2 * e * Math.random();
}, xy = function(e, r, a, n) {
  var i = e.cmptId, s = r.cmptId;
  if (!(i !== s && !a.isCompound)) {
    var o = r.positionX - e.positionX, u = r.positionY - e.positionY, l = 1;
    o === 0 && u === 0 && (o = As(l), u = As(l));
    var f = Ty(e, r, o, u);
    if (f > 0)
      var h = n.nodeOverlap * f, c = Math.sqrt(o * o + u * u), v = h * o / c, d = h * u / c;
    else
      var g = Ka(e, o, u), y = Ka(r, -1 * o, -1 * u), p = y.x - g.x, E = y.y - g.y, m = p * p + E * E, c = Math.sqrt(m), h = (e.nodeRepulsion + r.nodeRepulsion) / m, v = h * p / c, d = h * E / c;
    e.isLocked || (e.offsetX -= v, e.offsetY -= d), r.isLocked || (r.offsetX += v, r.offsetY += d);
  }
}, Ty = function(e, r, a, n) {
  if (a > 0)
    var i = e.maxX - r.minX;
  else
    var i = r.maxX - e.minX;
  if (n > 0)
    var s = e.maxY - r.minY;
  else
    var s = r.maxY - e.minY;
  return i >= 0 && s >= 0 ? Math.sqrt(i * i + s * s) : 0;
}, Ka = function(e, r, a) {
  var n = e.positionX, i = e.positionY, s = e.height || 1, o = e.width || 1, u = a / r, l = s / o, f = {};
  return r === 0 && 0 < a || r === 0 && 0 > a ? (f.x = n, f.y = i + s / 2, f) : 0 < r && -1 * l <= u && u <= l ? (f.x = n + o / 2, f.y = i + o * a / 2 / r, f) : 0 > r && -1 * l <= u && u <= l ? (f.x = n - o / 2, f.y = i - o * a / 2 / r, f) : 0 < a && (u <= -1 * l || u >= l) ? (f.x = n + s * r / 2 / a, f.y = i + s / 2, f) : (0 > a && (u <= -1 * l || u >= l) && (f.x = n - s * r / 2 / a, f.y = i - s / 2), f);
}, Cy = function(e, r) {
  for (var a = 0; a < e.edgeSize; a++) {
    var n = e.layoutEdges[a], i = e.idToIndex[n.sourceId], s = e.layoutNodes[i], o = e.idToIndex[n.targetId], u = e.layoutNodes[o], l = u.positionX - s.positionX, f = u.positionY - s.positionY;
    if (!(l === 0 && f === 0)) {
      var h = Ka(s, l, f), c = Ka(u, -1 * l, -1 * f), v = c.x - h.x, d = c.y - h.y, g = Math.sqrt(v * v + d * d), y = Math.pow(n.idealLength - g, 2) / n.elasticity;
      if (g !== 0)
        var p = y * v / g, E = y * d / g;
      else
        var p = 0, E = 0;
      s.isLocked || (s.offsetX += p, s.offsetY += E), u.isLocked || (u.offsetX -= p, u.offsetY -= E);
    }
  }
}, Dy = function(e, r) {
  if (r.gravity !== 0)
    for (var a = 1, n = 0; n < e.graphSet.length; n++) {
      var i = e.graphSet[n], s = i.length;
      if (n === 0)
        var o = e.clientHeight / 2, u = e.clientWidth / 2;
      else
        var l = e.layoutNodes[e.idToIndex[i[0]]], f = e.layoutNodes[e.idToIndex[l.parentId]], o = f.positionX, u = f.positionY;
      for (var h = 0; h < s; h++) {
        var c = e.layoutNodes[e.idToIndex[i[h]]];
        if (!c.isLocked) {
          var v = o - c.positionX, d = u - c.positionY, g = Math.sqrt(v * v + d * d);
          if (g > a) {
            var y = r.gravity * v / g, p = r.gravity * d / g;
            c.offsetX += y, c.offsetY += p;
          }
        }
      }
    }
}, Sy = function(e, r) {
  var a = [], n = 0, i = -1;
  for (a.push.apply(a, e.graphSet[0]), i += e.graphSet[0].length; n <= i; ) {
    var s = a[n++], o = e.idToIndex[s], u = e.layoutNodes[o], l = u.children;
    if (0 < l.length && !u.isLocked) {
      for (var f = u.offsetX, h = u.offsetY, c = 0; c < l.length; c++) {
        var v = e.layoutNodes[e.idToIndex[l[c]]];
        v.offsetX += f, v.offsetY += h, a[++i] = l[c];
      }
      u.offsetX = 0, u.offsetY = 0;
    }
  }
}, Ly = function(e, r) {
  for (var a = 0; a < e.nodeSize; a++) {
    var n = e.layoutNodes[a];
    0 < n.children.length && (n.maxX = void 0, n.minX = void 0, n.maxY = void 0, n.minY = void 0);
  }
  for (var a = 0; a < e.nodeSize; a++) {
    var n = e.layoutNodes[a];
    if (!(0 < n.children.length || n.isLocked)) {
      var i = Ay(n.offsetX, n.offsetY, e.temperature);
      n.positionX += i.x, n.positionY += i.y, n.offsetX = 0, n.offsetY = 0, n.minX = n.positionX - n.width, n.maxX = n.positionX + n.width, n.minY = n.positionY - n.height, n.maxY = n.positionY + n.height, Oy(n, e);
    }
  }
  for (var a = 0; a < e.nodeSize; a++) {
    var n = e.layoutNodes[a];
    0 < n.children.length && !n.isLocked && (n.positionX = (n.maxX + n.minX) / 2, n.positionY = (n.maxY + n.minY) / 2, n.width = n.maxX - n.minX, n.height = n.maxY - n.minY);
  }
}, Ay = function(e, r, a) {
  var n = Math.sqrt(e * e + r * r);
  if (n > a)
    var i = {
      x: a * e / n,
      y: a * r / n
    };
  else
    var i = {
      x: e,
      y: r
    };
  return i;
}, Oy = function t(e, r) {
  var a = e.parentId;
  if (a != null) {
    var n = r.layoutNodes[r.idToIndex[a]], i = !1;
    if ((n.maxX == null || e.maxX + n.padRight > n.maxX) && (n.maxX = e.maxX + n.padRight, i = !0), (n.minX == null || e.minX - n.padLeft < n.minX) && (n.minX = e.minX - n.padLeft, i = !0), (n.maxY == null || e.maxY + n.padBottom > n.maxY) && (n.maxY = e.maxY + n.padBottom, i = !0), (n.minY == null || e.minY - n.padTop < n.minY) && (n.minY = e.minY - n.padTop, i = !0), i)
      return t(n, r);
  }
}, Os = function(e, r) {
  for (var a = e.layoutNodes, n = [], i = 0; i < a.length; i++) {
    var s = a[i], o = s.cmptId, u = n[o] = n[o] || [];
    u.push(s);
  }
  for (var l = 0, i = 0; i < n.length; i++) {
    var f = n[i];
    if (f) {
      f.x1 = 1 / 0, f.x2 = -1 / 0, f.y1 = 1 / 0, f.y2 = -1 / 0;
      for (var h = 0; h < f.length; h++) {
        var c = f[h];
        f.x1 = Math.min(f.x1, c.positionX - c.width / 2), f.x2 = Math.max(f.x2, c.positionX + c.width / 2), f.y1 = Math.min(f.y1, c.positionY - c.height / 2), f.y2 = Math.max(f.y2, c.positionY + c.height / 2);
      }
      f.w = f.x2 - f.x1, f.h = f.y2 - f.y1, l += f.w * f.h;
    }
  }
  n.sort(function(E, m) {
    return m.w * m.h - E.w * E.h;
  });
  for (var v = 0, d = 0, g = 0, y = 0, p = Math.sqrt(l) * e.clientWidth / e.clientHeight, i = 0; i < n.length; i++) {
    var f = n[i];
    if (f) {
      for (var h = 0; h < f.length; h++) {
        var c = f[h];
        c.isLocked || (c.positionX += v - f.x1, c.positionY += d - f.y1);
      }
      v += f.w + r.componentSpacing, g += f.w + r.componentSpacing, y = Math.max(y, f.h), g > p && (d += y + r.componentSpacing, v = 0, g = 0, y = 0);
    }
  }
}, Ny = {
  fit: !0,
  // whether to fit the viewport to the graph
  padding: 30,
  // padding used on fit
  boundingBox: void 0,
  // constrain layout bounds; { x1, y1, x2, y2 } or { x1, y1, w, h }
  avoidOverlap: !0,
  // prevents node overlap, may overflow boundingBox if not enough space
  avoidOverlapPadding: 10,
  // extra spacing around nodes when avoidOverlap: true
  nodeDimensionsIncludeLabels: !1,
  // Excludes the label when calculating node bounding boxes for the layout algorithm
  spacingFactor: void 0,
  // Applies a multiplicative factor (>0) to expand or compress the overall area that the nodes take up
  condense: !1,
  // uses all available space on false, uses minimal space on true
  rows: void 0,
  // force num of rows in the grid
  cols: void 0,
  // force num of columns in the grid
  position: function(e) {
  },
  // returns { row, col } for element
  sort: void 0,
  // a sorting function to order the nodes; e.g. function(a, b){ return a.data('weight') - b.data('weight') }
  animate: !1,
  // whether to transition the node positions
  animationDuration: 500,
  // duration of animation in ms if enabled
  animationEasing: void 0,
  // easing of animation if enabled
  animateFilter: function(e, r) {
    return !0;
  },
  // a function that determines whether the node should be animated.  All nodes animated by default on animate enabled.  Non-animated nodes are positioned immediately when the layout starts
  ready: void 0,
  // callback on layoutready
  stop: void 0,
  // callback on layoutstop
  transform: function(e, r) {
    return r;
  }
  // transform a given node position. Useful for changing flow direction in discrete layouts 
};
function uu(t) {
  this.options = ce({}, Ny, t);
}
uu.prototype.run = function() {
  var t = this.options, e = t, r = t.cy, a = e.eles, n = a.nodes().not(":parent");
  e.sort && (n = n.sort(e.sort));
  var i = lt(e.boundingBox ? e.boundingBox : {
    x1: 0,
    y1: 0,
    w: r.width(),
    h: r.height()
  });
  if (i.h === 0 || i.w === 0)
    a.nodes().layoutPositions(this, e, function(U) {
      return {
        x: i.x1,
        y: i.y1
      };
    });
  else {
    var s = n.size(), o = Math.sqrt(s * i.h / i.w), u = Math.round(o), l = Math.round(i.w / i.h * o), f = function(V) {
      if (V == null)
        return Math.min(u, l);
      var H = Math.min(u, l);
      H == u ? u = V : l = V;
    }, h = function(V) {
      if (V == null)
        return Math.max(u, l);
      var H = Math.max(u, l);
      H == u ? u = V : l = V;
    }, c = e.rows, v = e.cols != null ? e.cols : e.columns;
    if (c != null && v != null)
      u = c, l = v;
    else if (c != null && v == null)
      u = c, l = Math.ceil(s / u);
    else if (c == null && v != null)
      l = v, u = Math.ceil(s / l);
    else if (l * u > s) {
      var d = f(), g = h();
      (d - 1) * g >= s ? f(d - 1) : (g - 1) * d >= s && h(g - 1);
    } else
      for (; l * u < s; ) {
        var y = f(), p = h();
        (p + 1) * y >= s ? h(p + 1) : f(y + 1);
      }
    var E = i.w / l, m = i.h / u;
    if (e.condense && (E = 0, m = 0), e.avoidOverlap)
      for (var T = 0; T < n.length; T++) {
        var C = n[T], S = C._private.position;
        (S.x == null || S.y == null) && (S.x = 0, S.y = 0);
        var b = C.layoutDimensions(e), x = e.avoidOverlapPadding, w = b.w + x, D = b.h + x;
        E = Math.max(E, w), m = Math.max(m, D);
      }
    for (var A = {}, L = function(V, H) {
      return !!A["c-" + V + "-" + H];
    }, M = function(V, H) {
      A["c-" + V + "-" + H] = !0;
    }, O = 0, P = 0, I = function() {
      P++, P >= l && (P = 0, O++);
    }, k = {}, R = 0; R < n.length; R++) {
      var B = n[R], z = e.position(B);
      if (z && (z.row !== void 0 || z.col !== void 0)) {
        var F = {
          row: z.row,
          col: z.col
        };
        if (F.col === void 0)
          for (F.col = 0; L(F.row, F.col); )
            F.col++;
        else if (F.row === void 0)
          for (F.row = 0; L(F.row, F.col); )
            F.row++;
        k[B.id()] = F, M(F.row, F.col);
      }
    }
    var $ = function(V, H) {
      var Y, G;
      if (V.locked() || V.isParent())
        return !1;
      var X = k[V.id()];
      if (X)
        Y = X.col * E + E / 2 + i.x1, G = X.row * m + m / 2 + i.y1;
      else {
        for (; L(O, P); )
          I();
        Y = P * E + E / 2 + i.x1, G = O * m + m / 2 + i.y1, M(O, P), I();
      }
      return {
        x: Y,
        y: G
      };
    };
    n.layoutPositions(this, e, $);
  }
  return this;
};
var My = {
  ready: function() {
  },
  // on layoutready
  stop: function() {
  }
  // on layoutstop
};
function bi(t) {
  this.options = ce({}, My, t);
}
bi.prototype.run = function() {
  var t = this.options, e = t.eles, r = this;
  return t.cy, r.emit("layoutstart"), e.nodes().positions(function() {
    return {
      x: 0,
      y: 0
    };
  }), r.one("layoutready", t.ready), r.emit("layoutready"), r.one("layoutstop", t.stop), r.emit("layoutstop"), this;
};
bi.prototype.stop = function() {
  return this;
};
var Iy = {
  positions: void 0,
  // map of (node id) => (position obj); or function(node){ return somPos; }
  zoom: void 0,
  // the zoom level to set (prob want fit = false if set)
  pan: void 0,
  // the pan level to set (prob want fit = false if set)
  fit: !0,
  // whether to fit to viewport
  padding: 30,
  // padding on fit
  animate: !1,
  // whether to transition the node positions
  animationDuration: 500,
  // duration of animation in ms if enabled
  animationEasing: void 0,
  // easing of animation if enabled
  animateFilter: function(e, r) {
    return !0;
  },
  // a function that determines whether the node should be animated.  All nodes animated by default on animate enabled.  Non-animated nodes are positioned immediately when the layout starts
  ready: void 0,
  // callback on layoutready
  stop: void 0,
  // callback on layoutstop
  transform: function(e, r) {
    return r;
  }
  // transform a given node position. Useful for changing flow direction in discrete layouts
};
function lu(t) {
  this.options = ce({}, Iy, t);
}
lu.prototype.run = function() {
  var t = this.options, e = t.eles, r = e.nodes(), a = Fe(t.positions);
  function n(i) {
    if (t.positions == null)
      return Hd(i.position());
    if (a)
      return t.positions(i);
    var s = t.positions[i._private.data.id];
    return s ?? null;
  }
  return r.layoutPositions(this, t, function(i, s) {
    var o = n(i);
    return i.locked() || o == null ? !1 : o;
  }), this;
};
var Ry = {
  fit: !0,
  // whether to fit to viewport
  padding: 30,
  // fit padding
  boundingBox: void 0,
  // constrain layout bounds; { x1, y1, x2, y2 } or { x1, y1, w, h }
  animate: !1,
  // whether to transition the node positions
  animationDuration: 500,
  // duration of animation in ms if enabled
  animationEasing: void 0,
  // easing of animation if enabled
  animateFilter: function(e, r) {
    return !0;
  },
  // a function that determines whether the node should be animated.  All nodes animated by default on animate enabled.  Non-animated nodes are positioned immediately when the layout starts
  ready: void 0,
  // callback on layoutready
  stop: void 0,
  // callback on layoutstop
  transform: function(e, r) {
    return r;
  }
  // transform a given node position. Useful for changing flow direction in discrete layouts 
};
function fu(t) {
  this.options = ce({}, Ry, t);
}
fu.prototype.run = function() {
  var t = this.options, e = t.cy, r = t.eles, a = lt(t.boundingBox ? t.boundingBox : {
    x1: 0,
    y1: 0,
    w: e.width(),
    h: e.height()
  }), n = function(s, o) {
    return {
      x: a.x1 + Math.round(Math.random() * a.w),
      y: a.y1 + Math.round(Math.random() * a.h)
    };
  };
  return r.nodes().layoutPositions(this, t, n), this;
};
var ky = [{
  name: "breadthfirst",
  impl: nu
}, {
  name: "circle",
  impl: iu
}, {
  name: "concentric",
  impl: su
}, {
  name: "cose",
  impl: yn
}, {
  name: "grid",
  impl: uu
}, {
  name: "null",
  impl: bi
}, {
  name: "preset",
  impl: lu
}, {
  name: "random",
  impl: fu
}];
function hu(t) {
  this.options = t, this.notifications = 0;
}
var Ns = function() {
}, Ms = function() {
  throw new Error("A headless instance can not render images");
};
hu.prototype = {
  recalculateRenderedStyle: Ns,
  notify: function() {
    this.notifications++;
  },
  init: Ns,
  isHeadless: function() {
    return !0;
  },
  png: Ms,
  jpg: Ms
};
var Ei = {};
Ei.arrowShapeWidth = 0.3;
Ei.registerArrowShapes = function() {
  var t = this.arrowShapes = {}, e = this, r = function(l, f, h, c, v, d, g) {
    var y = v.x - h / 2 - g, p = v.x + h / 2 + g, E = v.y - h / 2 - g, m = v.y + h / 2 + g, T = y <= l && l <= p && E <= f && f <= m;
    return T;
  }, a = function(l, f, h, c, v) {
    var d = l * Math.cos(c) - f * Math.sin(c), g = l * Math.sin(c) + f * Math.cos(c), y = d * h, p = g * h, E = y + v.x, m = p + v.y;
    return {
      x: E,
      y: m
    };
  }, n = function(l, f, h, c) {
    for (var v = [], d = 0; d < l.length; d += 2) {
      var g = l[d], y = l[d + 1];
      v.push(a(g, y, f, h, c));
    }
    return v;
  }, i = function(l) {
    for (var f = [], h = 0; h < l.length; h++) {
      var c = l[h];
      f.push(c.x, c.y);
    }
    return f;
  }, s = function(l) {
    return l.pstyle("width").pfValue * l.pstyle("arrow-scale").pfValue * 2;
  }, o = function(l, f) {
    le(f) && (f = t[f]), t[l] = ce({
      name: l,
      points: [-0.15, -0.3, 0.15, -0.3, 0.15, 0.3, -0.15, 0.3],
      collide: function(c, v, d, g, y, p) {
        var E = i(n(this.points, d + 2 * p, g, y)), m = ut(c, v, E);
        return m;
      },
      roughCollide: r,
      draw: function(c, v, d, g) {
        var y = n(this.points, v, d, g);
        e.arrowShapeImpl("polygon")(c, y);
      },
      spacing: function(c) {
        return 0;
      },
      gap: s
    }, f);
  };
  o("none", {
    collide: Ha,
    roughCollide: Ha,
    draw: ui,
    spacing: Xi,
    gap: Xi
  }), o("triangle", {
    points: [-0.15, -0.3, 0, 0, 0.15, -0.3]
  }), o("arrow", "triangle"), o("triangle-backcurve", {
    points: t.triangle.points,
    controlPoint: [0, -0.15],
    roughCollide: r,
    draw: function(l, f, h, c, v) {
      var d = n(this.points, f, h, c), g = this.controlPoint, y = a(g[0], g[1], f, h, c);
      e.arrowShapeImpl(this.name)(l, d, y);
    },
    gap: function(l) {
      return s(l) * 0.8;
    }
  }), o("triangle-tee", {
    points: [0, 0, 0.15, -0.3, -0.15, -0.3, 0, 0],
    pointsTee: [-0.15, -0.4, -0.15, -0.5, 0.15, -0.5, 0.15, -0.4],
    collide: function(l, f, h, c, v, d, g) {
      var y = i(n(this.points, h + 2 * g, c, v)), p = i(n(this.pointsTee, h + 2 * g, c, v)), E = ut(l, f, y) || ut(l, f, p);
      return E;
    },
    draw: function(l, f, h, c, v) {
      var d = n(this.points, f, h, c), g = n(this.pointsTee, f, h, c);
      e.arrowShapeImpl(this.name)(l, d, g);
    }
  }), o("circle-triangle", {
    radius: 0.15,
    pointsTr: [0, -0.15, 0.15, -0.45, -0.15, -0.45, 0, -0.15],
    collide: function(l, f, h, c, v, d, g) {
      var y = v, p = Math.pow(y.x - l, 2) + Math.pow(y.y - f, 2) <= Math.pow((h + 2 * g) * this.radius, 2), E = i(n(this.points, h + 2 * g, c, v));
      return ut(l, f, E) || p;
    },
    draw: function(l, f, h, c, v) {
      var d = n(this.pointsTr, f, h, c);
      e.arrowShapeImpl(this.name)(l, d, c.x, c.y, this.radius * f);
    },
    spacing: function(l) {
      return e.getArrowWidth(l.pstyle("width").pfValue, l.pstyle("arrow-scale").value) * this.radius;
    }
  }), o("triangle-cross", {
    points: [0, 0, 0.15, -0.3, -0.15, -0.3, 0, 0],
    baseCrossLinePts: [
      -0.15,
      -0.4,
      // first half of the rectangle
      -0.15,
      -0.4,
      0.15,
      -0.4,
      // second half of the rectangle
      0.15,
      -0.4
    ],
    crossLinePts: function(l, f) {
      var h = this.baseCrossLinePts.slice(), c = f / l, v = 3, d = 5;
      return h[v] = h[v] - c, h[d] = h[d] - c, h;
    },
    collide: function(l, f, h, c, v, d, g) {
      var y = i(n(this.points, h + 2 * g, c, v)), p = i(n(this.crossLinePts(h, d), h + 2 * g, c, v)), E = ut(l, f, y) || ut(l, f, p);
      return E;
    },
    draw: function(l, f, h, c, v) {
      var d = n(this.points, f, h, c), g = n(this.crossLinePts(f, v), f, h, c);
      e.arrowShapeImpl(this.name)(l, d, g);
    }
  }), o("vee", {
    points: [-0.15, -0.3, 0, 0, 0.15, -0.3, 0, -0.15],
    gap: function(l) {
      return s(l) * 0.525;
    }
  }), o("circle", {
    radius: 0.15,
    collide: function(l, f, h, c, v, d, g) {
      var y = v, p = Math.pow(y.x - l, 2) + Math.pow(y.y - f, 2) <= Math.pow((h + 2 * g) * this.radius, 2);
      return p;
    },
    draw: function(l, f, h, c, v) {
      e.arrowShapeImpl(this.name)(l, c.x, c.y, this.radius * f);
    },
    spacing: function(l) {
      return e.getArrowWidth(l.pstyle("width").pfValue, l.pstyle("arrow-scale").value) * this.radius;
    }
  }), o("tee", {
    points: [-0.15, 0, -0.15, -0.1, 0.15, -0.1, 0.15, 0],
    spacing: function(l) {
      return 1;
    },
    gap: function(l) {
      return 1;
    }
  }), o("square", {
    points: [-0.15, 0, 0.15, 0, 0.15, -0.3, -0.15, -0.3]
  }), o("diamond", {
    points: [-0.15, -0.15, 0, -0.3, 0.15, -0.15, 0, 0],
    gap: function(l) {
      return l.pstyle("width").pfValue * l.pstyle("arrow-scale").value;
    }
  }), o("chevron", {
    points: [0, 0, -0.15, -0.15, -0.1, -0.2, 0, -0.1, 0.1, -0.2, 0.15, -0.15],
    gap: function(l) {
      return 0.95 * l.pstyle("width").pfValue * l.pstyle("arrow-scale").value;
    }
  });
};
var fr = {};
fr.projectIntoViewport = function(t, e) {
  var r = this.cy, a = this.findContainerClientCoords(), n = a[0], i = a[1], s = a[4], o = r.pan(), u = r.zoom(), l = ((t - n) / s - o.x) / u, f = ((e - i) / s - o.y) / u;
  return [l, f];
};
fr.findContainerClientCoords = function() {
  if (this.containerBB)
    return this.containerBB;
  var t = this.container, e = t.getBoundingClientRect(), r = Be.getComputedStyle(t), a = function(p) {
    return parseFloat(r.getPropertyValue(p));
  }, n = {
    left: a("padding-left"),
    right: a("padding-right"),
    top: a("padding-top"),
    bottom: a("padding-bottom")
  }, i = {
    left: a("border-left-width"),
    right: a("border-right-width"),
    top: a("border-top-width"),
    bottom: a("border-bottom-width")
  }, s = t.clientWidth, o = t.clientHeight, u = n.left + n.right, l = n.top + n.bottom, f = i.left + i.right, h = e.width / (s + f), c = s - u, v = o - l, d = e.left + n.left + i.left, g = e.top + n.top + i.top;
  return this.containerBB = [d, g, c, v, h];
};
fr.invalidateContainerClientCoordsCache = function() {
  this.containerBB = null;
};
fr.findNearestElement = function(t, e, r, a) {
  return this.findNearestElements(t, e, r, a)[0];
};
fr.findNearestElements = function(t, e, r, a) {
  var n = this, i = this, s = i.getCachedZSortedEles(), o = [], u = i.cy.zoom(), l = i.cy.hasCompoundNodes(), f = (a ? 24 : 8) / u, h = (a ? 8 : 2) / u, c = (a ? 8 : 2) / u, v = 1 / 0, d, g;
  r && (s = s.interactive);
  function y(b, x) {
    if (b.isNode()) {
      if (g)
        return;
      g = b, o.push(b);
    }
    if (b.isEdge() && (x == null || x < v))
      if (d) {
        if (d.pstyle("z-compound-depth").value === b.pstyle("z-compound-depth").value && d.pstyle("z-compound-depth").value === b.pstyle("z-compound-depth").value) {
          for (var w = 0; w < o.length; w++)
            if (o[w].isEdge()) {
              o[w] = b, d = b, v = x ?? v;
              break;
            }
        }
      } else
        o.push(b), d = b, v = x ?? v;
  }
  function p(b) {
    var x = b.outerWidth() + 2 * h, w = b.outerHeight() + 2 * h, D = x / 2, A = w / 2, L = b.position();
    if (L.x - D <= t && t <= L.x + D && L.y - A <= e && e <= L.y + A) {
      var M = i.nodeShapes[n.getNodeShape(b)];
      if (M.checkPoint(t, e, 0, x, w, L.x, L.y))
        return y(b, 0), !0;
    }
  }
  function E(b) {
    var x = b._private, w = x.rscratch, D = b.pstyle("width").pfValue, A = b.pstyle("arrow-scale").value, L = D / 2 + f, M = L * L, O = L * 2, R = x.source, B = x.target, P;
    if (w.edgeType === "segments" || w.edgeType === "straight" || w.edgeType === "haystack") {
      for (var I = w.allpts, k = 0; k + 3 < I.length; k += 2)
        if (ng(t, e, I[k], I[k + 1], I[k + 2], I[k + 3], O) && M > (P = lg(t, e, I[k], I[k + 1], I[k + 2], I[k + 3])))
          return y(b, P), !0;
    } else if (w.edgeType === "bezier" || w.edgeType === "multibezier" || w.edgeType === "self" || w.edgeType === "compound") {
      for (var I = w.allpts, k = 0; k + 5 < w.allpts.length; k += 4)
        if (ig(t, e, I[k], I[k + 1], I[k + 2], I[k + 3], I[k + 4], I[k + 5], O) && M > (P = ug(t, e, I[k], I[k + 1], I[k + 2], I[k + 3], I[k + 4], I[k + 5])))
          return y(b, P), !0;
    }
    for (var R = R || x.source, B = B || x.target, z = n.getArrowWidth(D, A), F = [{
      name: "source",
      x: w.arrowStartX,
      y: w.arrowStartY,
      angle: w.srcArrowAngle
    }, {
      name: "target",
      x: w.arrowEndX,
      y: w.arrowEndY,
      angle: w.tgtArrowAngle
    }, {
      name: "mid-source",
      x: w.midX,
      y: w.midY,
      angle: w.midsrcArrowAngle
    }, {
      name: "mid-target",
      x: w.midX,
      y: w.midY,
      angle: w.midtgtArrowAngle
    }], k = 0; k < F.length; k++) {
      var $ = F[k], U = i.arrowShapes[b.pstyle($.name + "-arrow-shape").value], V = b.pstyle("width").pfValue;
      if (U.roughCollide(t, e, z, $.angle, {
        x: $.x,
        y: $.y
      }, V, f) && U.collide(t, e, z, $.angle, {
        x: $.x,
        y: $.y
      }, V, f))
        return y(b), !0;
    }
    l && o.length > 0 && (p(R), p(B));
  }
  function m(b, x, w) {
    return wt(b, x, w);
  }
  function T(b, x) {
    var w = b._private, D = c, A;
    x ? A = x + "-" : A = "", b.boundingBox();
    var L = w.labelBounds[x || "main"], M = b.pstyle(A + "label").value, O = b.pstyle("text-events").strValue === "yes";
    if (!(!O || !M)) {
      var P = m(w.rscratch, "labelX", x), I = m(w.rscratch, "labelY", x), k = m(w.rscratch, "labelAngle", x), R = b.pstyle(A + "text-margin-x").pfValue, B = b.pstyle(A + "text-margin-y").pfValue, z = L.x1 - D - R, F = L.x2 + D - R, $ = L.y1 - D - B, U = L.y2 + D - B;
      if (k) {
        var V = Math.cos(k), H = Math.sin(k), Y = function(de, ee) {
          return de = de - P, ee = ee - I, {
            x: de * V - ee * H + P,
            y: de * H + ee * V + I
          };
        }, G = Y(z, $), X = Y(z, U), K = Y(F, $), Z = Y(F, U), te = [
          // with the margin added after the rotation is applied
          G.x + R,
          G.y + B,
          K.x + R,
          K.y + B,
          Z.x + R,
          Z.y + B,
          X.x + R,
          X.y + B
        ];
        if (ut(t, e, te))
          return y(b), !0;
      } else if (Sr(L, t, e))
        return y(b), !0;
    }
  }
  for (var C = s.length - 1; C >= 0; C--) {
    var S = s[C];
    S.isNode() ? p(S) || T(S) : E(S) || T(S) || T(S, "source") || T(S, "target");
  }
  return o;
};
fr.getAllInBox = function(t, e, r, a) {
  var n = this.getCachedZSortedEles().interactive, i = [], s = Math.min(t, r), o = Math.max(t, r), u = Math.min(e, a), l = Math.max(e, a);
  t = s, r = o, e = u, a = l;
  for (var f = lt({
    x1: t,
    y1: e,
    x2: r,
    y2: a
  }), h = 0; h < n.length; h++) {
    var c = n[h];
    if (c.isNode()) {
      var v = c, d = v.boundingBox({
        includeNodes: !0,
        includeEdges: !1,
        includeLabels: !1
      });
      hi(f, d) && !Do(d, f) && i.push(v);
    } else {
      var g = c, y = g._private, p = y.rscratch;
      if (p.startX != null && p.startY != null && !Sr(f, p.startX, p.startY) || p.endX != null && p.endY != null && !Sr(f, p.endX, p.endY))
        continue;
      if (p.edgeType === "bezier" || p.edgeType === "multibezier" || p.edgeType === "self" || p.edgeType === "compound" || p.edgeType === "segments" || p.edgeType === "haystack") {
        for (var E = y.rstyle.bezierPts || y.rstyle.linePts || y.rstyle.haystackPts, m = !0, T = 0; T < E.length; T++)
          if (!ag(f, E[T])) {
            m = !1;
            break;
          }
        m && i.push(g);
      } else
        (p.edgeType === "haystack" || p.edgeType === "straight") && i.push(g);
    }
  }
  return i;
};
var Za = {};
Za.calculateArrowAngles = function(t) {
  var e = t._private.rscratch, r = e.edgeType === "haystack", a = e.edgeType === "bezier", n = e.edgeType === "multibezier", i = e.edgeType === "segments", s = e.edgeType === "compound", o = e.edgeType === "self", u, l, f, h, c, v, p, E;
  if (r ? (f = e.haystackPts[0], h = e.haystackPts[1], c = e.haystackPts[2], v = e.haystackPts[3]) : (f = e.arrowStartX, h = e.arrowStartY, c = e.arrowEndX, v = e.arrowEndY), p = e.midX, E = e.midY, i)
    u = f - e.segpts[0], l = h - e.segpts[1];
  else if (n || s || o || a) {
    var d = e.allpts, g = Ye(d[0], d[2], d[4], 0.1), y = Ye(d[1], d[3], d[5], 0.1);
    u = f - g, l = h - y;
  } else
    u = f - p, l = h - E;
  e.srcArrowAngle = Sa(u, l);
  var p = e.midX, E = e.midY;
  if (r && (p = (f + c) / 2, E = (h + v) / 2), u = c - f, l = v - h, i) {
    var d = e.allpts;
    if (d.length / 2 % 2 === 0) {
      var m = d.length / 2, T = m - 2;
      u = d[m] - d[T], l = d[m + 1] - d[T + 1];
    } else {
      var m = d.length / 2 - 1, T = m - 2, C = m + 2;
      u = d[m] - d[T], l = d[m + 1] - d[T + 1];
    }
  } else if (n || s || o) {
    var d = e.allpts, S = e.ctrlpts, b, x, w, D;
    if (S.length / 2 % 2 === 0) {
      var A = d.length / 2 - 1, L = A + 2, M = L + 2;
      b = Ye(d[A], d[L], d[M], 0), x = Ye(d[A + 1], d[L + 1], d[M + 1], 0), w = Ye(d[A], d[L], d[M], 1e-4), D = Ye(d[A + 1], d[L + 1], d[M + 1], 1e-4);
    } else {
      var L = d.length / 2 - 1, A = L - 2, M = L + 2;
      b = Ye(d[A], d[L], d[M], 0.4999), x = Ye(d[A + 1], d[L + 1], d[M + 1], 0.4999), w = Ye(d[A], d[L], d[M], 0.5), D = Ye(d[A + 1], d[L + 1], d[M + 1], 0.5);
    }
    u = w - b, l = D - x;
  }
  if (e.midtgtArrowAngle = Sa(u, l), e.midDispX = u, e.midDispY = l, u *= -1, l *= -1, i) {
    var d = e.allpts;
    if (d.length / 2 % 2 !== 0) {
      var m = d.length / 2 - 1, C = m + 2;
      u = -(d[C] - d[m]), l = -(d[C + 1] - d[m + 1]);
    }
  }
  if (e.midsrcArrowAngle = Sa(u, l), i)
    u = c - e.segpts[e.segpts.length - 2], l = v - e.segpts[e.segpts.length - 1];
  else if (n || s || o || a) {
    var d = e.allpts, O = d.length, g = Ye(d[O - 6], d[O - 4], d[O - 2], 0.9), y = Ye(d[O - 5], d[O - 3], d[O - 1], 0.9);
    u = c - g, l = v - y;
  } else
    u = c - p, l = v - E;
  e.tgtArrowAngle = Sa(u, l);
};
Za.getArrowWidth = Za.getArrowHeight = function(t, e) {
  var r = this.arrowWidthCache = this.arrowWidthCache || {}, a = r[t + ", " + e];
  return a || (a = Math.max(Math.pow(t * 13.37, 0.9), 29) * e, r[t + ", " + e] = a, a);
};
var it = {};
it.findHaystackPoints = function(t) {
  for (var e = 0; e < t.length; e++) {
    var r = t[e], a = r._private, n = a.rscratch;
    if (!n.haystack) {
      var i = Math.random() * 2 * Math.PI;
      n.source = {
        x: Math.cos(i),
        y: Math.sin(i)
      }, i = Math.random() * 2 * Math.PI, n.target = {
        x: Math.cos(i),
        y: Math.sin(i)
      };
    }
    var s = a.source, o = a.target, u = s.position(), l = o.position(), f = s.width(), h = o.width(), c = s.height(), v = o.height(), d = r.pstyle("haystack-radius").value, g = d / 2;
    n.haystackPts = n.allpts = [n.source.x * f * g + u.x, n.source.y * c * g + u.y, n.target.x * h * g + l.x, n.target.y * v * g + l.y], n.midX = (n.allpts[0] + n.allpts[2]) / 2, n.midY = (n.allpts[1] + n.allpts[3]) / 2, n.edgeType = "haystack", n.haystack = !0, this.storeEdgeProjections(r), this.calculateArrowAngles(r), this.recalculateEdgeLabelProjections(r), this.calculateLabelAngles(r);
  }
};
it.findSegmentsPoints = function(t, e) {
  var r = t._private.rscratch, a = e.posPts, n = e.intersectionPts, i = e.vectorNormInverse, s = t.pstyle("edge-distances").value, o = t.pstyle("segment-weights"), u = t.pstyle("segment-distances"), l = Math.min(o.pfValue.length, u.pfValue.length);
  r.edgeType = "segments", r.segpts = [];
  for (var f = 0; f < l; f++) {
    var h = o.pfValue[f], c = u.pfValue[f], v = 1 - h, d = h, g = s === "node-position" ? a : n, y = {
      x: g.x1 * v + g.x2 * d,
      y: g.y1 * v + g.y2 * d
    };
    r.segpts.push(y.x + i.x * c, y.y + i.y * c);
  }
};
it.findLoopPoints = function(t, e, r, a) {
  var n = t._private.rscratch, i = e.dirCounts, s = e.srcPos, o = t.pstyle("control-point-distances"), u = o ? o.pfValue[0] : void 0, l = t.pstyle("loop-direction").pfValue, f = t.pstyle("loop-sweep").pfValue, h = t.pstyle("control-point-step-size").pfValue;
  n.edgeType = "self";
  var c = r, v = h;
  a && (c = 0, v = u);
  var d = l - Math.PI / 2, g = d - f / 2, y = d + f / 2, p = String(l + "_" + f);
  c = i[p] === void 0 ? i[p] = 0 : ++i[p], n.ctrlpts = [s.x + Math.cos(g) * 1.4 * v * (c / 3 + 1), s.y + Math.sin(g) * 1.4 * v * (c / 3 + 1), s.x + Math.cos(y) * 1.4 * v * (c / 3 + 1), s.y + Math.sin(y) * 1.4 * v * (c / 3 + 1)];
};
it.findCompoundLoopPoints = function(t, e, r, a) {
  var n = t._private.rscratch;
  n.edgeType = "compound";
  var i = e.srcPos, s = e.tgtPos, o = e.srcW, u = e.srcH, l = e.tgtW, f = e.tgtH, h = t.pstyle("control-point-step-size").pfValue, c = t.pstyle("control-point-distances"), v = c ? c.pfValue[0] : void 0, d = r, g = h;
  a && (d = 0, g = v);
  var y = 50, p = {
    x: i.x - o / 2,
    y: i.y - u / 2
  }, E = {
    x: s.x - l / 2,
    y: s.y - f / 2
  }, m = {
    x: Math.min(p.x, E.x),
    y: Math.min(p.y, E.y)
  }, T = 0.5, C = Math.max(T, Math.log(o * 0.01)), S = Math.max(T, Math.log(l * 0.01));
  n.ctrlpts = [m.x, m.y - (1 + Math.pow(y, 1.12) / 100) * g * (d / 3 + 1) * C, m.x - (1 + Math.pow(y, 1.12) / 100) * g * (d / 3 + 1) * S, m.y];
};
it.findStraightEdgePoints = function(t) {
  t._private.rscratch.edgeType = "straight";
};
it.findBezierPoints = function(t, e, r, a, n) {
  var i = t._private.rscratch, s = e.vectorNormInverse, o = e.posPts, u = e.intersectionPts, l = t.pstyle("edge-distances").value, f = t.pstyle("control-point-step-size").pfValue, h = t.pstyle("control-point-distances"), c = t.pstyle("control-point-weights"), v = h && c ? Math.min(h.value.length, c.value.length) : 1, d = h ? h.pfValue[0] : void 0, g = c.value[0], y = a;
  i.edgeType = y ? "multibezier" : "bezier", i.ctrlpts = [];
  for (var p = 0; p < v; p++) {
    var E = (0.5 - e.eles.length / 2 + r) * f * (n ? -1 : 1), m = void 0, T = Co(E);
    y && (d = h ? h.pfValue[p] : f, g = c.value[p]), a ? m = d : m = d !== void 0 ? T * d : void 0;
    var C = m !== void 0 ? m : E, S = 1 - g, b = g, x = l === "node-position" ? o : u, w = {
      x: x.x1 * S + x.x2 * b,
      y: x.y1 * S + x.y2 * b
    };
    i.ctrlpts.push(w.x + s.x * C, w.y + s.y * C);
  }
};
it.findTaxiPoints = function(t, e) {
  var r = t._private.rscratch;
  r.edgeType = "segments";
  var a = "vertical", n = "horizontal", i = "leftward", s = "rightward", o = "downward", u = "upward", l = "auto", f = e.posPts, h = e.srcW, c = e.srcH, v = e.tgtW, d = e.tgtH, g = t.pstyle("edge-distances").value, y = g !== "node-position", p = t.pstyle("taxi-direction").value, E = p, m = t.pstyle("taxi-turn"), T = m.units === "%", C = m.pfValue, S = C < 0, b = t.pstyle("taxi-turn-min-distance").pfValue, x = y ? (h + v) / 2 : 0, w = y ? (c + d) / 2 : 0, D = f.x2 - f.x1, A = f.y2 - f.y1, L = function(oe, we) {
    return oe > 0 ? Math.max(oe - we, 0) : Math.min(oe + we, 0);
  }, M = L(D, x), O = L(A, w), P = !1;
  E === l ? p = Math.abs(M) > Math.abs(O) ? n : a : E === u || E === o ? (p = a, P = !0) : (E === i || E === s) && (p = n, P = !0);
  var I = p === a, k = I ? O : M, R = I ? A : D, B = Co(R), z = !1;
  !(P && (T || S)) && (E === o && R < 0 || E === u && R > 0 || E === i && R > 0 || E === s && R < 0) && (B *= -1, k = B * Math.abs(k), z = !0);
  var F;
  if (T) {
    var $ = C < 0 ? 1 + C : C;
    F = $ * k;
  } else {
    var U = C < 0 ? k : 0;
    F = U + C * B;
  }
  var V = function(oe) {
    return Math.abs(oe) < b || Math.abs(oe) >= Math.abs(k);
  }, H = V(F), Y = V(Math.abs(k) - Math.abs(F)), G = H || Y;
  if (G && !z)
    if (I) {
      var X = Math.abs(R) <= c / 2, K = Math.abs(D) <= v / 2;
      if (X) {
        var Z = (f.x1 + f.x2) / 2, te = f.y1, he = f.y2;
        r.segpts = [Z, te, Z, he];
      } else if (K) {
        var de = (f.y1 + f.y2) / 2, ee = f.x1, re = f.x2;
        r.segpts = [ee, de, re, de];
      } else
        r.segpts = [f.x1, f.y2];
    } else {
      var fe = Math.abs(R) <= h / 2, se = Math.abs(A) <= d / 2;
      if (fe) {
        var ne = (f.y1 + f.y2) / 2, ue = f.x1, Ee = f.x2;
        r.segpts = [ue, ne, Ee, ne];
      } else if (se) {
        var ge = (f.x1 + f.x2) / 2, ve = f.y1, J = f.y2;
        r.segpts = [ge, ve, ge, J];
      } else
        r.segpts = [f.x2, f.y1];
    }
  else if (I) {
    var N = f.y1 + F + (y ? c / 2 * B : 0), _ = f.x1, Q = f.x2;
    r.segpts = [_, N, Q, N];
  } else {
    var q = f.x1 + F + (y ? h / 2 * B : 0), W = f.y1, pe = f.y2;
    r.segpts = [q, W, q, pe];
  }
};
it.tryToCorrectInvalidPoints = function(t, e) {
  var r = t._private.rscratch;
  if (r.edgeType === "bezier") {
    var a = e.srcPos, n = e.tgtPos, i = e.srcW, s = e.srcH, o = e.tgtW, u = e.tgtH, l = e.srcShape, f = e.tgtShape, h = !ae(r.startX) || !ae(r.startY), c = !ae(r.arrowStartX) || !ae(r.arrowStartY), v = !ae(r.endX) || !ae(r.endY), d = !ae(r.arrowEndX) || !ae(r.arrowEndY), g = 3, y = this.getArrowWidth(t.pstyle("width").pfValue, t.pstyle("arrow-scale").value) * this.arrowShapeWidth, p = g * y, E = nr({
      x: r.ctrlpts[0],
      y: r.ctrlpts[1]
    }, {
      x: r.startX,
      y: r.startY
    }), m = E < p, T = nr({
      x: r.ctrlpts[0],
      y: r.ctrlpts[1]
    }, {
      x: r.endX,
      y: r.endY
    }), C = T < p, S = !1;
    if (h || c || m) {
      S = !0;
      var b = {
        // delta
        x: r.ctrlpts[0] - a.x,
        y: r.ctrlpts[1] - a.y
      }, x = Math.sqrt(b.x * b.x + b.y * b.y), w = {
        // normalised delta
        x: b.x / x,
        y: b.y / x
      }, D = Math.max(i, s), A = {
        // *2 radius guarantees outside shape
        x: r.ctrlpts[0] + w.x * 2 * D,
        y: r.ctrlpts[1] + w.y * 2 * D
      }, L = l.intersectLine(a.x, a.y, i, s, A.x, A.y, 0);
      m ? (r.ctrlpts[0] = r.ctrlpts[0] + w.x * (p - E), r.ctrlpts[1] = r.ctrlpts[1] + w.y * (p - E)) : (r.ctrlpts[0] = L[0] + w.x * p, r.ctrlpts[1] = L[1] + w.y * p);
    }
    if (v || d || C) {
      S = !0;
      var M = {
        // delta
        x: r.ctrlpts[0] - n.x,
        y: r.ctrlpts[1] - n.y
      }, O = Math.sqrt(M.x * M.x + M.y * M.y), P = {
        // normalised delta
        x: M.x / O,
        y: M.y / O
      }, I = Math.max(i, s), k = {
        // *2 radius guarantees outside shape
        x: r.ctrlpts[0] + P.x * 2 * I,
        y: r.ctrlpts[1] + P.y * 2 * I
      }, R = f.intersectLine(n.x, n.y, o, u, k.x, k.y, 0);
      C ? (r.ctrlpts[0] = r.ctrlpts[0] + P.x * (p - T), r.ctrlpts[1] = r.ctrlpts[1] + P.y * (p - T)) : (r.ctrlpts[0] = R[0] + P.x * p, r.ctrlpts[1] = R[1] + P.y * p);
    }
    S && this.findEndpoints(t);
  }
};
it.storeAllpts = function(t) {
  var e = t._private.rscratch;
  if (e.edgeType === "multibezier" || e.edgeType === "bezier" || e.edgeType === "self" || e.edgeType === "compound") {
    e.allpts = [], e.allpts.push(e.startX, e.startY);
    for (var r = 0; r + 1 < e.ctrlpts.length; r += 2)
      e.allpts.push(e.ctrlpts[r], e.ctrlpts[r + 1]), r + 3 < e.ctrlpts.length && e.allpts.push((e.ctrlpts[r] + e.ctrlpts[r + 2]) / 2, (e.ctrlpts[r + 1] + e.ctrlpts[r + 3]) / 2);
    e.allpts.push(e.endX, e.endY);
    var a, n;
    e.ctrlpts.length / 2 % 2 === 0 ? (a = e.allpts.length / 2 - 1, e.midX = e.allpts[a], e.midY = e.allpts[a + 1]) : (a = e.allpts.length / 2 - 3, n = 0.5, e.midX = Ye(e.allpts[a], e.allpts[a + 2], e.allpts[a + 4], n), e.midY = Ye(e.allpts[a + 1], e.allpts[a + 3], e.allpts[a + 5], n));
  } else if (e.edgeType === "straight")
    e.allpts = [e.startX, e.startY, e.endX, e.endY], e.midX = (e.startX + e.endX + e.arrowStartX + e.arrowEndX) / 4, e.midY = (e.startY + e.endY + e.arrowStartY + e.arrowEndY) / 4;
  else if (e.edgeType === "segments")
    if (e.allpts = [], e.allpts.push(e.startX, e.startY), e.allpts.push.apply(e.allpts, e.segpts), e.allpts.push(e.endX, e.endY), e.segpts.length % 4 === 0) {
      var i = e.segpts.length / 2, s = i - 2;
      e.midX = (e.segpts[s] + e.segpts[i]) / 2, e.midY = (e.segpts[s + 1] + e.segpts[i + 1]) / 2;
    } else {
      var o = e.segpts.length / 2 - 1;
      e.midX = e.segpts[o], e.midY = e.segpts[o + 1];
    }
};
it.checkForInvalidEdgeWarning = function(t) {
  var e = t[0]._private.rscratch;
  e.nodesOverlap || ae(e.startX) && ae(e.startY) && ae(e.endX) && ae(e.endY) ? e.loggedErr = !1 : e.loggedErr || (e.loggedErr = !0, Ae("Edge `" + t.id() + "` has invalid endpoints and so it is impossible to draw.  Adjust your edge style (e.g. control points) accordingly or use an alternative edge type.  This is expected behaviour when the source node and the target node overlap."));
};
it.findEdgeControlPoints = function(t) {
  var e = this;
  if (!(!t || t.length === 0)) {
    for (var r = this, a = r.cy, n = a.hasCompoundNodes(), i = {
      map: new Dt(),
      get: function(b) {
        var x = this.map.get(b[0]);
        return x != null ? x.get(b[1]) : null;
      },
      set: function(b, x) {
        var w = this.map.get(b[0]);
        w == null && (w = new Dt(), this.map.set(b[0], w)), w.set(b[1], x);
      }
    }, s = [], o = [], u = 0; u < t.length; u++) {
      var l = t[u], f = l._private, h = l.pstyle("curve-style").value;
      if (!(l.removed() || !l.takesUpSpace())) {
        if (h === "haystack") {
          o.push(l);
          continue;
        }
        var c = h === "unbundled-bezier" || h === "segments" || h === "straight" || h === "straight-triangle" || h === "taxi", v = h === "unbundled-bezier" || h === "bezier", d = f.source, g = f.target, y = d.poolIndex(), p = g.poolIndex(), E = [y, p].sort(), m = i.get(E);
        m == null && (m = {
          eles: []
        }, i.set(E, m), s.push(E)), m.eles.push(l), c && (m.hasUnbundled = !0), v && (m.hasBezier = !0);
      }
    }
    for (var T = function(b) {
      var x = s[b], w = i.get(x), D = void 0;
      if (!w.hasUnbundled) {
        var A = w.eles[0].parallelEdges().filter(function(J) {
          return J.isBundledBezier();
        });
        li(w.eles), A.forEach(function(J) {
          return w.eles.push(J);
        }), w.eles.sort(function(J, N) {
          return J.poolIndex() - N.poolIndex();
        });
      }
      var L = w.eles[0], M = L.source(), O = L.target();
      if (M.poolIndex() > O.poolIndex()) {
        var P = M;
        M = O, O = P;
      }
      var I = w.srcPos = M.position(), k = w.tgtPos = O.position(), R = w.srcW = M.outerWidth(), B = w.srcH = M.outerHeight(), z = w.tgtW = O.outerWidth(), F = w.tgtH = O.outerHeight(), $ = w.srcShape = r.nodeShapes[e.getNodeShape(M)], U = w.tgtShape = r.nodeShapes[e.getNodeShape(O)];
      w.dirCounts = {
        north: 0,
        west: 0,
        south: 0,
        east: 0,
        northwest: 0,
        southwest: 0,
        northeast: 0,
        southeast: 0
      };
      for (var V = 0; V < w.eles.length; V++) {
        var H = w.eles[V], Y = H[0]._private.rscratch, G = H.pstyle("curve-style").value, X = G === "unbundled-bezier" || G === "segments" || G === "taxi", K = !M.same(H.source());
        if (!w.calculatedIntersection && M !== O && (w.hasBezier || w.hasUnbundled)) {
          w.calculatedIntersection = !0;
          var Z = $.intersectLine(I.x, I.y, R, B, k.x, k.y, 0), te = w.srcIntn = Z, he = U.intersectLine(k.x, k.y, z, F, I.x, I.y, 0), de = w.tgtIntn = he, ee = w.intersectionPts = {
            x1: Z[0],
            x2: he[0],
            y1: Z[1],
            y2: he[1]
          }, re = w.posPts = {
            x1: I.x,
            x2: k.x,
            y1: I.y,
            y2: k.y
          }, fe = he[1] - Z[1], se = he[0] - Z[0], ne = Math.sqrt(se * se + fe * fe), ue = w.vector = {
            x: se,
            y: fe
          }, Ee = w.vectorNorm = {
            x: ue.x / ne,
            y: ue.y / ne
          }, ge = {
            x: -Ee.y,
            y: Ee.x
          };
          w.nodesOverlap = !ae(ne) || U.checkPoint(Z[0], Z[1], 0, z, F, k.x, k.y) || $.checkPoint(he[0], he[1], 0, R, B, I.x, I.y), w.vectorNormInverse = ge, D = {
            nodesOverlap: w.nodesOverlap,
            dirCounts: w.dirCounts,
            calculatedIntersection: !0,
            hasBezier: w.hasBezier,
            hasUnbundled: w.hasUnbundled,
            eles: w.eles,
            srcPos: k,
            tgtPos: I,
            srcW: z,
            srcH: F,
            tgtW: R,
            tgtH: B,
            srcIntn: de,
            tgtIntn: te,
            srcShape: U,
            tgtShape: $,
            posPts: {
              x1: re.x2,
              y1: re.y2,
              x2: re.x1,
              y2: re.y1
            },
            intersectionPts: {
              x1: ee.x2,
              y1: ee.y2,
              x2: ee.x1,
              y2: ee.y1
            },
            vector: {
              x: -ue.x,
              y: -ue.y
            },
            vectorNorm: {
              x: -Ee.x,
              y: -Ee.y
            },
            vectorNormInverse: {
              x: -ge.x,
              y: -ge.y
            }
          };
        }
        var ve = K ? D : w;
        Y.nodesOverlap = ve.nodesOverlap, Y.srcIntn = ve.srcIntn, Y.tgtIntn = ve.tgtIntn, n && (M.isParent() || M.isChild() || O.isParent() || O.isChild()) && (M.parents().anySame(O) || O.parents().anySame(M) || M.same(O) && M.isParent()) ? e.findCompoundLoopPoints(H, ve, V, X) : M === O ? e.findLoopPoints(H, ve, V, X) : G === "segments" ? e.findSegmentsPoints(H, ve) : G === "taxi" ? e.findTaxiPoints(H, ve) : G === "straight" || !X && w.eles.length % 2 === 1 && V === Math.floor(w.eles.length / 2) ? e.findStraightEdgePoints(H) : e.findBezierPoints(H, ve, V, X, K), e.findEndpoints(H), e.tryToCorrectInvalidPoints(H, ve), e.checkForInvalidEdgeWarning(H), e.storeAllpts(H), e.storeEdgeProjections(H), e.calculateArrowAngles(H), e.recalculateEdgeLabelProjections(H), e.calculateLabelAngles(H);
      }
    }, C = 0; C < s.length; C++)
      T(C);
    this.findHaystackPoints(o);
  }
};
function vu(t) {
  var e = [];
  if (t != null) {
    for (var r = 0; r < t.length; r += 2) {
      var a = t[r], n = t[r + 1];
      e.push({
        x: a,
        y: n
      });
    }
    return e;
  }
}
it.getSegmentPoints = function(t) {
  var e = t[0]._private.rscratch, r = e.edgeType;
  if (r === "segments")
    return this.recalculateRenderedStyle(t), vu(e.segpts);
};
it.getControlPoints = function(t) {
  var e = t[0]._private.rscratch, r = e.edgeType;
  if (r === "bezier" || r === "multibezier" || r === "self" || r === "compound")
    return this.recalculateRenderedStyle(t), vu(e.ctrlpts);
};
it.getEdgeMidpoint = function(t) {
  var e = t[0]._private.rscratch;
  return this.recalculateRenderedStyle(t), {
    x: e.midX,
    y: e.midY
  };
};
var ba = {};
ba.manualEndptToPx = function(t, e) {
  var r = this, a = t.position(), n = t.outerWidth(), i = t.outerHeight();
  if (e.value.length === 2) {
    var s = [e.pfValue[0], e.pfValue[1]];
    return e.units[0] === "%" && (s[0] = s[0] * n), e.units[1] === "%" && (s[1] = s[1] * i), s[0] += a.x, s[1] += a.y, s;
  } else {
    var o = e.pfValue[0];
    o = -Math.PI / 2 + o;
    var u = 2 * Math.max(n, i), l = [a.x + Math.cos(o) * u, a.y + Math.sin(o) * u];
    return r.nodeShapes[this.getNodeShape(t)].intersectLine(a.x, a.y, n, i, l[0], l[1], 0);
  }
};
ba.findEndpoints = function(t) {
  var e = this, r, a = t.source()[0], n = t.target()[0], i = a.position(), s = n.position(), o = t.pstyle("target-arrow-shape").value, u = t.pstyle("source-arrow-shape").value, l = t.pstyle("target-distance-from-node").pfValue, f = t.pstyle("source-distance-from-node").pfValue, h = t.pstyle("curve-style").value, c = t._private.rscratch, v = c.edgeType, d = h === "taxi", g = v === "self" || v === "compound", y = v === "bezier" || v === "multibezier" || g, p = v !== "bezier", E = v === "straight" || v === "segments", m = v === "segments", T = y || p || E, C = g || d, S = t.pstyle("source-endpoint"), b = C ? "outside-to-node" : S.value, x = t.pstyle("target-endpoint"), w = C ? "outside-to-node" : x.value;
  c.srcManEndpt = S, c.tgtManEndpt = x;
  var D, A, L, M;
  if (y) {
    var O = [c.ctrlpts[0], c.ctrlpts[1]], P = p ? [c.ctrlpts[c.ctrlpts.length - 2], c.ctrlpts[c.ctrlpts.length - 1]] : O;
    D = P, A = O;
  } else if (E) {
    var I = m ? c.segpts.slice(0, 2) : [s.x, s.y], k = m ? c.segpts.slice(c.segpts.length - 2) : [i.x, i.y];
    D = k, A = I;
  }
  if (w === "inside-to-node")
    r = [s.x, s.y];
  else if (x.units)
    r = this.manualEndptToPx(n, x);
  else if (w === "outside-to-line")
    r = c.tgtIntn;
  else if (w === "outside-to-node" || w === "outside-to-node-or-label" ? L = D : (w === "outside-to-line" || w === "outside-to-line-or-label") && (L = [i.x, i.y]), r = e.nodeShapes[this.getNodeShape(n)].intersectLine(s.x, s.y, n.outerWidth(), n.outerHeight(), L[0], L[1], 0), w === "outside-to-node-or-label" || w === "outside-to-line-or-label") {
    var R = n._private.rscratch, B = R.labelWidth, z = R.labelHeight, F = R.labelX, $ = R.labelY, U = B / 2, V = z / 2, H = n.pstyle("text-valign").value;
    H === "top" ? $ -= V : H === "bottom" && ($ += V);
    var Y = n.pstyle("text-halign").value;
    Y === "left" ? F -= U : Y === "right" && (F += U);
    var G = sa(L[0], L[1], [F - U, $ - V, F + U, $ - V, F + U, $ + V, F - U, $ + V], s.x, s.y);
    if (G.length > 0) {
      var X = i, K = er(X, Er(r)), Z = er(X, Er(G)), te = K;
      if (Z < K && (r = G, te = Z), G.length > 2) {
        var he = er(X, {
          x: G[2],
          y: G[3]
        });
        he < te && (r = [G[2], G[3]]);
      }
    }
  }
  var de = La(r, D, e.arrowShapes[o].spacing(t) + l), ee = La(r, D, e.arrowShapes[o].gap(t) + l);
  if (c.endX = ee[0], c.endY = ee[1], c.arrowEndX = de[0], c.arrowEndY = de[1], b === "inside-to-node")
    r = [i.x, i.y];
  else if (S.units)
    r = this.manualEndptToPx(a, S);
  else if (b === "outside-to-line")
    r = c.srcIntn;
  else if (b === "outside-to-node" || b === "outside-to-node-or-label" ? M = A : (b === "outside-to-line" || b === "outside-to-line-or-label") && (M = [s.x, s.y]), r = e.nodeShapes[this.getNodeShape(a)].intersectLine(i.x, i.y, a.outerWidth(), a.outerHeight(), M[0], M[1], 0), b === "outside-to-node-or-label" || b === "outside-to-line-or-label") {
    var re = a._private.rscratch, fe = re.labelWidth, se = re.labelHeight, ne = re.labelX, ue = re.labelY, Ee = fe / 2, ge = se / 2, ve = a.pstyle("text-valign").value;
    ve === "top" ? ue -= ge : ve === "bottom" && (ue += ge);
    var J = a.pstyle("text-halign").value;
    J === "left" ? ne -= Ee : J === "right" && (ne += Ee);
    var N = sa(M[0], M[1], [ne - Ee, ue - ge, ne + Ee, ue - ge, ne + Ee, ue + ge, ne - Ee, ue + ge], i.x, i.y);
    if (N.length > 0) {
      var _ = s, Q = er(_, Er(r)), q = er(_, Er(N)), W = Q;
      if (q < Q && (r = [N[0], N[1]], W = q), N.length > 2) {
        var pe = er(_, {
          x: N[2],
          y: N[3]
        });
        pe < W && (r = [N[2], N[3]]);
      }
    }
  }
  var j = La(r, A, e.arrowShapes[u].spacing(t) + f), oe = La(r, A, e.arrowShapes[u].gap(t) + f);
  c.startX = oe[0], c.startY = oe[1], c.arrowStartX = j[0], c.arrowStartY = j[1], T && (!ae(c.startX) || !ae(c.startY) || !ae(c.endX) || !ae(c.endY) ? c.badLine = !0 : c.badLine = !1);
};
ba.getSourceEndpoint = function(t) {
  var e = t[0]._private.rscratch;
  switch (this.recalculateRenderedStyle(t), e.edgeType) {
    case "haystack":
      return {
        x: e.haystackPts[0],
        y: e.haystackPts[1]
      };
    default:
      return {
        x: e.arrowStartX,
        y: e.arrowStartY
      };
  }
};
ba.getTargetEndpoint = function(t) {
  var e = t[0]._private.rscratch;
  switch (this.recalculateRenderedStyle(t), e.edgeType) {
    case "haystack":
      return {
        x: e.haystackPts[2],
        y: e.haystackPts[3]
      };
    default:
      return {
        x: e.arrowEndX,
        y: e.arrowEndY
      };
  }
};
var wi = {};
function Py(t, e, r) {
  for (var a = function(l, f, h, c) {
    return Ye(l, f, h, c);
  }, n = e._private, i = n.rstyle.bezierPts, s = 0; s < t.bezierProjPcts.length; s++) {
    var o = t.bezierProjPcts[s];
    i.push({
      x: a(r[0], r[2], r[4], o),
      y: a(r[1], r[3], r[5], o)
    });
  }
}
wi.storeEdgeProjections = function(t) {
  var e = t._private, r = e.rscratch, a = r.edgeType;
  if (e.rstyle.bezierPts = null, e.rstyle.linePts = null, e.rstyle.haystackPts = null, a === "multibezier" || a === "bezier" || a === "self" || a === "compound") {
    e.rstyle.bezierPts = [];
    for (var n = 0; n + 5 < r.allpts.length; n += 4)
      Py(this, t, r.allpts.slice(n, n + 6));
  } else if (a === "segments")
    for (var i = e.rstyle.linePts = [], n = 0; n + 1 < r.allpts.length; n += 2)
      i.push({
        x: r.allpts[n],
        y: r.allpts[n + 1]
      });
  else if (a === "haystack") {
    var s = r.haystackPts;
    e.rstyle.haystackPts = [{
      x: s[0],
      y: s[1]
    }, {
      x: s[2],
      y: s[3]
    }];
  }
  e.rstyle.arrowWidth = this.getArrowWidth(t.pstyle("width").pfValue, t.pstyle("arrow-scale").value) * this.arrowShapeWidth;
};
wi.recalculateEdgeProjections = function(t) {
  this.findEdgeControlPoints(t);
};
var Lt = {};
Lt.recalculateNodeLabelProjection = function(t) {
  var e = t.pstyle("label").strValue;
  if (!Yt(e)) {
    var r, a, n = t._private, i = t.width(), s = t.height(), o = t.padding(), u = t.position(), l = t.pstyle("text-halign").strValue, f = t.pstyle("text-valign").strValue, h = n.rscratch, c = n.rstyle;
    switch (l) {
      case "left":
        r = u.x - i / 2 - o;
        break;
      case "right":
        r = u.x + i / 2 + o;
        break;
      default:
        r = u.x;
    }
    switch (f) {
      case "top":
        a = u.y - s / 2 - o;
        break;
      case "bottom":
        a = u.y + s / 2 + o;
        break;
      default:
        a = u.y;
    }
    h.labelX = r, h.labelY = a, c.labelX = r, c.labelY = a, this.calculateLabelAngles(t), this.applyLabelDimensions(t);
  }
};
var cu = function(e, r) {
  var a = Math.atan(r / e);
  return e === 0 && a < 0 && (a = a * -1), a;
}, du = function(e, r) {
  var a = r.x - e.x, n = r.y - e.y;
  return cu(a, n);
}, By = function(e, r, a, n) {
  var i = ia(0, n - 1e-3, 1), s = ia(0, n + 1e-3, 1), o = xr(e, r, a, i), u = xr(e, r, a, s);
  return du(o, u);
};
Lt.recalculateEdgeLabelProjections = function(t) {
  var e, r = t._private, a = r.rscratch, n = this, i = {
    mid: t.pstyle("label").strValue,
    source: t.pstyle("source-label").strValue,
    target: t.pstyle("target-label").strValue
  };
  if (i.mid || i.source || i.target) {
    e = {
      x: a.midX,
      y: a.midY
    };
    var s = function(h, c, v) {
      zt(r.rscratch, h, c, v), zt(r.rstyle, h, c, v);
    };
    s("labelX", null, e.x), s("labelY", null, e.y);
    var o = cu(a.midDispX, a.midDispY);
    s("labelAutoAngle", null, o);
    var u = function f() {
      if (f.cache)
        return f.cache;
      for (var h = [], c = 0; c + 5 < a.allpts.length; c += 4) {
        var v = {
          x: a.allpts[c],
          y: a.allpts[c + 1]
        }, d = {
          x: a.allpts[c + 2],
          y: a.allpts[c + 3]
        }, g = {
          x: a.allpts[c + 4],
          y: a.allpts[c + 5]
        };
        h.push({
          p0: v,
          p1: d,
          p2: g,
          startDist: 0,
          length: 0,
          segments: []
        });
      }
      var y = r.rstyle.bezierPts, p = n.bezierProjPcts.length;
      function E(b, x, w, D, A) {
        var L = nr(x, w), M = b.segments[b.segments.length - 1], O = {
          p0: x,
          p1: w,
          t0: D,
          t1: A,
          startDist: M ? M.startDist + M.length : 0,
          length: L
        };
        b.segments.push(O), b.length += L;
      }
      for (var m = 0; m < h.length; m++) {
        var T = h[m], C = h[m - 1];
        C && (T.startDist = C.startDist + C.length), E(T, T.p0, y[m * p], 0, n.bezierProjPcts[0]);
        for (var S = 0; S < p - 1; S++)
          E(T, y[m * p + S], y[m * p + S + 1], n.bezierProjPcts[S], n.bezierProjPcts[S + 1]);
        E(T, y[m * p + p - 1], T.p2, n.bezierProjPcts[p - 1], 1);
      }
      return f.cache = h;
    }, l = function(h) {
      var c, v = h === "source";
      if (i[h]) {
        var d = t.pstyle(h + "-text-offset").pfValue;
        switch (a.edgeType) {
          case "self":
          case "compound":
          case "bezier":
          case "multibezier": {
            for (var g = u(), y, p = 0, E = 0, m = 0; m < g.length; m++) {
              for (var T = g[v ? m : g.length - 1 - m], C = 0; C < T.segments.length; C++) {
                var S = T.segments[v ? C : T.segments.length - 1 - C], b = m === g.length - 1 && C === T.segments.length - 1;
                if (p = E, E += S.length, E >= d || b) {
                  y = {
                    cp: T,
                    segment: S
                  };
                  break;
                }
              }
              if (y)
                break;
            }
            var x = y.cp, w = y.segment, D = (d - p) / w.length, A = w.t1 - w.t0, L = v ? w.t0 + A * D : w.t1 - A * D;
            L = ia(0, L, 1), e = xr(x.p0, x.p1, x.p2, L), c = By(x.p0, x.p1, x.p2, L);
            break;
          }
          case "straight":
          case "segments":
          case "haystack": {
            for (var M = 0, O, P, I, k, R = a.allpts.length, B = 0; B + 3 < R && (v ? (I = {
              x: a.allpts[B],
              y: a.allpts[B + 1]
            }, k = {
              x: a.allpts[B + 2],
              y: a.allpts[B + 3]
            }) : (I = {
              x: a.allpts[R - 2 - B],
              y: a.allpts[R - 1 - B]
            }, k = {
              x: a.allpts[R - 4 - B],
              y: a.allpts[R - 3 - B]
            }), O = nr(I, k), P = M, M += O, !(M >= d)); B += 2)
              ;
            var z = d - P, F = z / O;
            F = ia(0, F, 1), e = Jd(I, k, F), c = du(I, k);
            break;
          }
        }
        s("labelX", h, e.x), s("labelY", h, e.y), s("labelAutoAngle", h, c);
      }
    };
    l("source"), l("target"), this.applyLabelDimensions(t);
  }
};
Lt.applyLabelDimensions = function(t) {
  this.applyPrefixedLabelDimensions(t), t.isEdge() && (this.applyPrefixedLabelDimensions(t, "source"), this.applyPrefixedLabelDimensions(t, "target"));
};
Lt.applyPrefixedLabelDimensions = function(t, e) {
  var r = t._private, a = this.getLabelText(t, e), n = this.calculateLabelDimensions(t, a), i = t.pstyle("line-height").pfValue, s = t.pstyle("text-wrap").strValue, o = wt(r.rscratch, "labelWrapCachedLines", e) || [], u = s !== "wrap" ? 1 : Math.max(o.length, 1), l = n.height / u, f = l * i, h = n.width, c = n.height + (u - 1) * (i - 1) * l;
  zt(r.rstyle, "labelWidth", e, h), zt(r.rscratch, "labelWidth", e, h), zt(r.rstyle, "labelHeight", e, c), zt(r.rscratch, "labelHeight", e, c), zt(r.rscratch, "labelLineHeight", e, f);
};
Lt.getLabelText = function(t, e) {
  var r = t._private, a = e ? e + "-" : "", n = t.pstyle(a + "label").strValue, i = t.pstyle("text-transform").value, s = function(z, F) {
    return F ? (zt(r.rscratch, z, e, F), F) : wt(r.rscratch, z, e);
  };
  if (!n)
    return "";
  i == "none" || (i == "uppercase" ? n = n.toUpperCase() : i == "lowercase" && (n = n.toLowerCase()));
  var o = t.pstyle("text-wrap").value;
  if (o === "wrap") {
    var u = s("labelKey");
    if (u != null && s("labelWrapKey") === u)
      return s("labelWrapCachedText");
    for (var l = "​", f = n.split(`
`), h = t.pstyle("text-max-width").pfValue, c = t.pstyle("text-overflow-wrap").value, v = c === "anywhere", d = [], g = /[\s\u200b]+/, y = v ? "" : " ", p = 0; p < f.length; p++) {
      var E = f[p], m = this.calculateLabelDimensions(t, E), T = m.width;
      if (v) {
        var C = E.split("").join(l);
        E = C;
      }
      if (T > h) {
        for (var S = E.split(g), b = "", x = 0; x < S.length; x++) {
          var w = S[x], D = b.length === 0 ? w : b + y + w, A = this.calculateLabelDimensions(t, D), L = A.width;
          L <= h ? b += w + y : (b && d.push(b), b = w + y);
        }
        b.match(/^[\s\u200b]+$/) || d.push(b);
      } else
        d.push(E);
    }
    s("labelWrapCachedLines", d), n = s("labelWrapCachedText", d.join(`
`)), s("labelWrapKey", u);
  } else if (o === "ellipsis") {
    var M = t.pstyle("text-max-width").pfValue, O = "", P = "…", I = !1;
    if (this.calculateLabelDimensions(t, n).width < M)
      return n;
    for (var k = 0; k < n.length; k++) {
      var R = this.calculateLabelDimensions(t, O + n[k] + P).width;
      if (R > M)
        break;
      O += n[k], k === n.length - 1 && (I = !0);
    }
    return I || (O += P), O;
  }
  return n;
};
Lt.getLabelJustification = function(t) {
  var e = t.pstyle("text-justification").strValue, r = t.pstyle("text-halign").strValue;
  if (e === "auto")
    if (t.isNode())
      switch (r) {
        case "left":
          return "right";
        case "right":
          return "left";
        default:
          return "center";
      }
    else
      return "center";
  else
    return e;
};
Lt.calculateLabelDimensions = function(t, e) {
  var r = this, a = ar(e, t._private.labelDimsKey), n = r.labelDimCache || (r.labelDimCache = []), i = n[a];
  if (i != null)
    return i;
  var s = 0, o = t.pstyle("font-style").strValue, u = t.pstyle("font-size").pfValue, l = t.pstyle("font-family").strValue, f = t.pstyle("font-weight").strValue, h = this.labelCalcCanvas, c = this.labelCalcCanvasContext;
  if (!h) {
    h = this.labelCalcCanvas = document.createElement("canvas"), c = this.labelCalcCanvasContext = h.getContext("2d");
    var v = h.style;
    v.position = "absolute", v.left = "-9999px", v.top = "-9999px", v.zIndex = "-1", v.visibility = "hidden", v.pointerEvents = "none";
  }
  c.font = "".concat(o, " ").concat(f, " ").concat(u, "px ").concat(l);
  for (var d = 0, g = 0, y = e.split(`
`), p = 0; p < y.length; p++) {
    var E = y[p], m = c.measureText(E), T = Math.ceil(m.width), C = u;
    d = Math.max(T, d), g += C;
  }
  return d += s, g += s, n[a] = {
    width: d,
    height: g
  };
};
Lt.calculateLabelAngle = function(t, e) {
  var r = t._private, a = r.rscratch, n = t.isEdge(), i = e ? e + "-" : "", s = t.pstyle(i + "text-rotation"), o = s.strValue;
  return o === "none" ? 0 : n && o === "autorotate" ? a.labelAutoAngle : o === "autorotate" ? 0 : s.pfValue;
};
Lt.calculateLabelAngles = function(t) {
  var e = this, r = t.isEdge(), a = t._private, n = a.rscratch;
  n.labelAngle = e.calculateLabelAngle(t), r && (n.sourceLabelAngle = e.calculateLabelAngle(t, "source"), n.targetLabelAngle = e.calculateLabelAngle(t, "target"));
};
var gu = {}, Is = 28, Rs = !1;
gu.getNodeShape = function(t) {
  var e = this, r = t.pstyle("shape").value;
  if (r === "cutrectangle" && (t.width() < Is || t.height() < Is))
    return Rs || (Ae("The `cutrectangle` node shape can not be used at small sizes so `rectangle` is used instead"), Rs = !0), "rectangle";
  if (t.isParent())
    return r === "rectangle" || r === "roundrectangle" || r === "round-rectangle" || r === "cutrectangle" || r === "cut-rectangle" || r === "barrel" ? r : "rectangle";
  if (r === "polygon") {
    var a = t.pstyle("shape-polygon-points").value;
    return e.nodeShapes.makePolygon(a).name;
  }
  return r;
};
var mn = {};
mn.registerCalculationListeners = function() {
  var t = this.cy, e = t.collection(), r = this, a = function(s) {
    var o = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0;
    if (e.merge(s), o)
      for (var u = 0; u < s.length; u++) {
        var l = s[u], f = l._private, h = f.rstyle;
        h.clean = !1, h.cleanConnected = !1;
      }
  };
  r.binder(t).on("bounds.* dirty.*", function(s) {
    var o = s.target;
    a(o);
  }).on("style.* background.*", function(s) {
    var o = s.target;
    a(o, !1);
  });
  var n = function(s) {
    if (s) {
      var o = r.onUpdateEleCalcsFns;
      e.cleanStyle();
      for (var u = 0; u < e.length; u++) {
        var l = e[u], f = l._private.rstyle;
        l.isNode() && !f.cleanConnected && (a(l.connectedEdges()), f.cleanConnected = !0);
      }
      if (o)
        for (var h = 0; h < o.length; h++) {
          var c = o[h];
          c(s, e);
        }
      r.recalculateRenderedStyle(e), e = t.collection();
    }
  };
  r.flushRenderedStyleQueue = function() {
    n(!0);
  }, r.beforeRender(n, r.beforeRenderPriorities.eleCalcs);
};
mn.onUpdateEleCalcs = function(t) {
  var e = this.onUpdateEleCalcsFns = this.onUpdateEleCalcsFns || [];
  e.push(t);
};
mn.recalculateRenderedStyle = function(t, e) {
  var r = function(T) {
    return T._private.rstyle.cleanConnected;
  }, a = [], n = [];
  if (!this.destroyed) {
    e === void 0 && (e = !0);
    for (var i = 0; i < t.length; i++) {
      var s = t[i], o = s._private, u = o.rstyle;
      s.isEdge() && (!r(s.source()) || !r(s.target())) && (u.clean = !1), !(e && u.clean || s.removed()) && s.pstyle("display").value !== "none" && (o.group === "nodes" ? n.push(s) : a.push(s), u.clean = !0);
    }
    for (var l = 0; l < n.length; l++) {
      var f = n[l], h = f._private, c = h.rstyle, v = f.position();
      this.recalculateNodeLabelProjection(f), c.nodeX = v.x, c.nodeY = v.y, c.nodeW = f.pstyle("width").pfValue, c.nodeH = f.pstyle("height").pfValue;
    }
    this.recalculateEdgeProjections(a);
    for (var d = 0; d < a.length; d++) {
      var g = a[d], y = g._private, p = y.rstyle, E = y.rscratch;
      p.srcX = E.arrowStartX, p.srcY = E.arrowStartY, p.tgtX = E.arrowEndX, p.tgtY = E.arrowEndY, p.midX = E.midX, p.midY = E.midY, p.labelAngle = E.labelAngle, p.sourceLabelAngle = E.sourceLabelAngle, p.targetLabelAngle = E.targetLabelAngle;
    }
  }
};
var bn = {};
bn.updateCachedGrabbedEles = function() {
  var t = this.cachedZSortedEles;
  if (t) {
    t.drag = [], t.nondrag = [];
    for (var e = [], r = 0; r < t.length; r++) {
      var a = t[r], n = a._private.rscratch;
      a.grabbed() && !a.isParent() ? e.push(a) : n.inDragLayer ? t.drag.push(a) : t.nondrag.push(a);
    }
    for (var r = 0; r < e.length; r++) {
      var a = e[r];
      t.drag.push(a);
    }
  }
};
bn.invalidateCachedZSortedEles = function() {
  this.cachedZSortedEles = null;
};
bn.getCachedZSortedEles = function(t) {
  if (t || !this.cachedZSortedEles) {
    var e = this.cy.mutableElements().toArray();
    e.sort(tu), e.interactive = e.filter(function(r) {
      return r.interactive();
    }), this.cachedZSortedEles = e, this.updateCachedGrabbedEles();
  } else
    e = this.cachedZSortedEles;
  return e;
};
var pu = {};
[fr, Za, it, ba, wi, Lt, gu, mn, bn].forEach(function(t) {
  ce(pu, t);
});
var yu = {};
yu.getCachedImage = function(t, e, r) {
  var a = this, n = a.imageCache = a.imageCache || {}, i = n[t];
  if (i)
    return i.image.complete || i.image.addEventListener("load", r), i.image;
  i = n[t] = n[t] || {};
  var s = i.image = new Image();
  s.addEventListener("load", r), s.addEventListener("error", function() {
    s.error = !0;
  });
  var o = "data:", u = t.substring(0, o.length).toLowerCase() === o;
  return u || (s.crossOrigin = e), s.src = t, s;
};
var Br = {};
Br.registerBinding = function(t, e, r, a) {
  var n = Array.prototype.slice.apply(arguments, [1]), i = this.binder(t);
  return i.on.apply(i, n);
};
Br.binder = function(t) {
  var e = this, r = t === window || t === document || t === document.body || ad(t);
  if (e.supportsPassiveEvents == null) {
    var a = !1;
    try {
      var n = Object.defineProperty({}, "passive", {
        get: function() {
          return a = !0, !0;
        }
      });
      window.addEventListener("test", null, n);
    } catch {
    }
    e.supportsPassiveEvents = a;
  }
  var i = function(o, u, l) {
    var f = Array.prototype.slice.call(arguments);
    return r && e.supportsPassiveEvents && (f[2] = {
      capture: l ?? !1,
      passive: !1,
      once: !1
    }), e.bindings.push({
      target: t,
      args: f
    }), (t.addEventListener || t.on).apply(t, f), this;
  };
  return {
    on: i,
    addEventListener: i,
    addListener: i,
    bind: i
  };
};
Br.nodeIsDraggable = function(t) {
  return t && t.isNode() && !t.locked() && t.grabbable();
};
Br.nodeIsGrabbable = function(t) {
  return this.nodeIsDraggable(t) && t.interactive();
};
Br.load = function() {
  var t = this, e = function(N) {
    return N.selected();
  }, r = function(N, _, Q, q) {
    N == null && (N = t.cy);
    for (var W = 0; W < _.length; W++) {
      var pe = _[W];
      N.emit({
        originalEvent: Q,
        type: pe,
        position: q
      });
    }
  }, a = function(N) {
    return N.shiftKey || N.metaKey || N.ctrlKey;
  }, n = function(N, _) {
    var Q = !0;
    if (t.cy.hasCompoundNodes() && N && N.pannable())
      for (var q = 0; _ && q < _.length; q++) {
        var N = _[q];
        if (N.isNode() && N.isParent() && !N.pannable()) {
          Q = !1;
          break;
        }
      }
    else
      Q = !0;
    return Q;
  }, i = function(N) {
    N[0]._private.grabbed = !0;
  }, s = function(N) {
    N[0]._private.grabbed = !1;
  }, o = function(N) {
    N[0]._private.rscratch.inDragLayer = !0;
  }, u = function(N) {
    N[0]._private.rscratch.inDragLayer = !1;
  }, l = function(N) {
    N[0]._private.rscratch.isGrabTarget = !0;
  }, f = function(N) {
    N[0]._private.rscratch.isGrabTarget = !1;
  }, h = function(N, _) {
    var Q = _.addToList, q = Q.has(N);
    !q && N.grabbable() && !N.locked() && (Q.merge(N), i(N));
  }, c = function(N, _) {
    if (N.cy().hasCompoundNodes() && !(_.inDragLayer == null && _.addToList == null)) {
      var Q = N.descendants();
      _.inDragLayer && (Q.forEach(o), Q.connectedEdges().forEach(o)), _.addToList && h(Q, _);
    }
  }, v = function(N, _) {
    _ = _ || {};
    var Q = N.cy().hasCompoundNodes();
    _.inDragLayer && (N.forEach(o), N.neighborhood().stdFilter(function(q) {
      return !Q || q.isEdge();
    }).forEach(o)), _.addToList && N.forEach(function(q) {
      h(q, _);
    }), c(N, _), y(N, {
      inDragLayer: _.inDragLayer
    }), t.updateCachedGrabbedEles();
  }, d = v, g = function(N) {
    N && (t.getCachedZSortedEles().forEach(function(_) {
      s(_), u(_), f(_);
    }), t.updateCachedGrabbedEles());
  }, y = function(N, _) {
    if (!(_.inDragLayer == null && _.addToList == null) && N.cy().hasCompoundNodes()) {
      var Q = N.ancestors().orphans();
      if (!Q.same(N)) {
        var q = Q.descendants().spawnSelf().merge(Q).unmerge(N).unmerge(N.descendants()), W = q.connectedEdges();
        _.inDragLayer && (W.forEach(o), q.forEach(o)), _.addToList && q.forEach(function(pe) {
          h(pe, _);
        });
      }
    }
  }, p = function() {
    document.activeElement != null && document.activeElement.blur != null && document.activeElement.blur();
  }, E = typeof MutationObserver < "u", m = typeof ResizeObserver < "u";
  E ? (t.removeObserver = new MutationObserver(function(J) {
    for (var N = 0; N < J.length; N++) {
      var _ = J[N], Q = _.removedNodes;
      if (Q)
        for (var q = 0; q < Q.length; q++) {
          var W = Q[q];
          if (W === t.container) {
            t.destroy();
            break;
          }
        }
    }
  }), t.container.parentNode && t.removeObserver.observe(t.container.parentNode, {
    childList: !0
  })) : t.registerBinding(t.container, "DOMNodeRemoved", function(J) {
    t.destroy();
  });
  var T = tn(function() {
    t.cy.resize();
  }, 100);
  E && (t.styleObserver = new MutationObserver(T), t.styleObserver.observe(t.container, {
    attributes: !0
  })), t.registerBinding(window, "resize", T), m && (t.resizeObserver = new ResizeObserver(T), t.resizeObserver.observe(t.container));
  var C = function(N, _) {
    for (; N != null; )
      _(N), N = N.parentNode;
  }, S = function() {
    t.invalidateContainerClientCoordsCache();
  };
  C(t.container, function(J) {
    t.registerBinding(J, "transitionend", S), t.registerBinding(J, "animationend", S), t.registerBinding(J, "scroll", S);
  }), t.registerBinding(t.container, "contextmenu", function(J) {
    J.preventDefault();
  });
  var b = function() {
    return t.selection[4] !== 0;
  }, x = function(N) {
    for (var _ = t.findContainerClientCoords(), Q = _[0], q = _[1], W = _[2], pe = _[3], j = N.touches ? N.touches : [N], oe = !1, we = 0; we < j.length; we++) {
      var Oe = j[we];
      if (Q <= Oe.clientX && Oe.clientX <= Q + W && q <= Oe.clientY && Oe.clientY <= q + pe) {
        oe = !0;
        break;
      }
    }
    if (!oe)
      return !1;
    for (var me = t.container, Se = N.target, ye = Se.parentNode, be = !1; ye; ) {
      if (ye === me) {
        be = !0;
        break;
      }
      ye = ye.parentNode;
    }
    return !!be;
  };
  t.registerBinding(t.container, "mousedown", function(N) {
    if (x(N)) {
      N.preventDefault(), p(), t.hoverData.capture = !0, t.hoverData.which = N.which;
      var _ = t.cy, Q = [N.clientX, N.clientY], q = t.projectIntoViewport(Q[0], Q[1]), W = t.selection, pe = t.findNearestElements(q[0], q[1], !0, !1), j = pe[0], oe = t.dragData.possibleDragElements;
      t.hoverData.mdownPos = q, t.hoverData.mdownGPos = Q;
      var we = function() {
        t.hoverData.tapholdCancelled = !1, clearTimeout(t.hoverData.tapholdTimeout), t.hoverData.tapholdTimeout = setTimeout(function() {
          if (!t.hoverData.tapholdCancelled) {
            var Ge = t.hoverData.down;
            Ge ? Ge.emit({
              originalEvent: N,
              type: "taphold",
              position: {
                x: q[0],
                y: q[1]
              }
            }) : _.emit({
              originalEvent: N,
              type: "taphold",
              position: {
                x: q[0],
                y: q[1]
              }
            });
          }
        }, t.tapholdDuration);
      };
      if (N.which == 3) {
        t.hoverData.cxtStarted = !0;
        var Oe = {
          originalEvent: N,
          type: "cxttapstart",
          position: {
            x: q[0],
            y: q[1]
          }
        };
        j ? (j.activate(), j.emit(Oe), t.hoverData.down = j) : _.emit(Oe), t.hoverData.downTime = new Date().getTime(), t.hoverData.cxtDragged = !1;
      } else if (N.which == 1) {
        j && j.activate();
        {
          if (j != null && t.nodeIsGrabbable(j)) {
            var me = function(Ge) {
              return {
                originalEvent: N,
                type: Ge,
                position: {
                  x: q[0],
                  y: q[1]
                }
              };
            }, Se = function(Ge) {
              Ge.emit(me("grab"));
            };
            if (l(j), !j.selected())
              oe = t.dragData.possibleDragElements = _.collection(), d(j, {
                addToList: oe
              }), j.emit(me("grabon")).emit(me("grab"));
            else {
              oe = t.dragData.possibleDragElements = _.collection();
              var ye = _.$(function(be) {
                return be.isNode() && be.selected() && t.nodeIsGrabbable(be);
              });
              v(ye, {
                addToList: oe
              }), j.emit(me("grabon")), ye.forEach(Se);
            }
            t.redrawHint("eles", !0), t.redrawHint("drag", !0);
          }
          t.hoverData.down = j, t.hoverData.downs = pe, t.hoverData.downTime = new Date().getTime();
        }
        r(j, ["mousedown", "tapstart", "vmousedown"], N, {
          x: q[0],
          y: q[1]
        }), j == null ? (W[4] = 1, t.data.bgActivePosistion = {
          x: q[0],
          y: q[1]
        }, t.redrawHint("select", !0), t.redraw()) : j.pannable() && (W[4] = 1), we();
      }
      W[0] = W[2] = q[0], W[1] = W[3] = q[1];
    }
  }, !1), t.registerBinding(window, "mousemove", function(N) {
    var _ = t.hoverData.capture;
    if (!(!_ && !x(N))) {
      var Q = !1, q = t.cy, W = q.zoom(), pe = [N.clientX, N.clientY], j = t.projectIntoViewport(pe[0], pe[1]), oe = t.hoverData.mdownPos, we = t.hoverData.mdownGPos, Oe = t.selection, me = null;
      !t.hoverData.draggingEles && !t.hoverData.dragging && !t.hoverData.selecting && (me = t.findNearestElement(j[0], j[1], !0, !1));
      var Se = t.hoverData.last, ye = t.hoverData.down, be = [j[0] - Oe[2], j[1] - Oe[3]], Ge = t.dragData.possibleDragElements, He;
      if (we) {
        var pt = pe[0] - we[0], yt = pt * pt, Xe = pe[1] - we[1], vt = Xe * Xe, at = yt + vt;
        t.hoverData.isOverThresholdDrag = He = at >= t.desktopTapThreshold2;
      }
      var Ot = a(N);
      He && (t.hoverData.tapholdCancelled = !0);
      var Bt = function() {
        var Tt = t.hoverData.dragDelta = t.hoverData.dragDelta || [];
        Tt.length === 0 ? (Tt.push(be[0]), Tt.push(be[1])) : (Tt[0] += be[0], Tt[1] += be[1]);
      };
      Q = !0, r(me, ["mousemove", "vmousemove", "tapdrag"], N, {
        x: j[0],
        y: j[1]
      });
      var vr = function() {
        t.data.bgActivePosistion = void 0, t.hoverData.selecting || q.emit({
          originalEvent: N,
          type: "boxstart",
          position: {
            x: j[0],
            y: j[1]
          }
        }), Oe[4] = 1, t.hoverData.selecting = !0, t.redrawHint("select", !0), t.redraw();
      };
      if (t.hoverData.which === 3) {
        if (He) {
          var Jt = {
            originalEvent: N,
            type: "cxtdrag",
            position: {
              x: j[0],
              y: j[1]
            }
          };
          ye ? ye.emit(Jt) : q.emit(Jt), t.hoverData.cxtDragged = !0, (!t.hoverData.cxtOver || me !== t.hoverData.cxtOver) && (t.hoverData.cxtOver && t.hoverData.cxtOver.emit({
            originalEvent: N,
            type: "cxtdragout",
            position: {
              x: j[0],
              y: j[1]
            }
          }), t.hoverData.cxtOver = me, me && me.emit({
            originalEvent: N,
            type: "cxtdragover",
            position: {
              x: j[0],
              y: j[1]
            }
          }));
        }
      } else if (t.hoverData.dragging) {
        if (Q = !0, q.panningEnabled() && q.userPanningEnabled()) {
          var cr;
          if (t.hoverData.justStartedPan) {
            var xa = t.hoverData.mdownPos;
            cr = {
              x: (j[0] - xa[0]) * W,
              y: (j[1] - xa[1]) * W
            }, t.hoverData.justStartedPan = !1;
          } else
            cr = {
              x: be[0] * W,
              y: be[1] * W
            };
          q.panBy(cr), q.emit("dragpan"), t.hoverData.dragged = !0;
        }
        j = t.projectIntoViewport(N.clientX, N.clientY);
      } else if (Oe[4] == 1 && (ye == null || ye.pannable())) {
        if (He) {
          if (!t.hoverData.dragging && q.boxSelectionEnabled() && (Ot || !q.panningEnabled() || !q.userPanningEnabled()))
            vr();
          else if (!t.hoverData.selecting && q.panningEnabled() && q.userPanningEnabled()) {
            var jt = n(ye, t.hoverData.downs);
            jt && (t.hoverData.dragging = !0, t.hoverData.justStartedPan = !0, Oe[4] = 0, t.data.bgActivePosistion = Er(oe), t.redrawHint("select", !0), t.redraw());
          }
          ye && ye.pannable() && ye.active() && ye.unactivate();
        }
      } else {
        if (ye && ye.pannable() && ye.active() && ye.unactivate(), (!ye || !ye.grabbed()) && me != Se && (Se && r(Se, ["mouseout", "tapdragout"], N, {
          x: j[0],
          y: j[1]
        }), me && r(me, ["mouseover", "tapdragover"], N, {
          x: j[0],
          y: j[1]
        }), t.hoverData.last = me), ye)
          if (He) {
            if (q.boxSelectionEnabled() && Ot)
              ye && ye.grabbed() && (g(Ge), ye.emit("freeon"), Ge.emit("free"), t.dragData.didDrag && (ye.emit("dragfreeon"), Ge.emit("dragfree"))), vr();
            else if (ye && ye.grabbed() && t.nodeIsDraggable(ye)) {
              var st = !t.dragData.didDrag;
              st && t.redrawHint("eles", !0), t.dragData.didDrag = !0, t.hoverData.draggingEles || v(Ge, {
                inDragLayer: !0
              });
              var Je = {
                x: 0,
                y: 0
              };
              if (ae(be[0]) && ae(be[1]) && (Je.x += be[0], Je.y += be[1], st)) {
                var ot = t.hoverData.dragDelta;
                ot && ae(ot[0]) && ae(ot[1]) && (Je.x += ot[0], Je.y += ot[1]);
              }
              t.hoverData.draggingEles = !0, Ge.silentShift(Je).emit("position drag"), t.redrawHint("drag", !0), t.redraw();
            }
          } else
            Bt();
        Q = !0;
      }
      if (Oe[2] = j[0], Oe[3] = j[1], Q)
        return N.stopPropagation && N.stopPropagation(), N.preventDefault && N.preventDefault(), !1;
    }
  }, !1);
  var w, D, A;
  t.registerBinding(window, "mouseup", function(N) {
    var _ = t.hoverData.capture;
    if (_) {
      t.hoverData.capture = !1;
      var Q = t.cy, q = t.projectIntoViewport(N.clientX, N.clientY), W = t.selection, pe = t.findNearestElement(q[0], q[1], !0, !1), j = t.dragData.possibleDragElements, oe = t.hoverData.down, we = a(N);
      if (t.data.bgActivePosistion && (t.redrawHint("select", !0), t.redraw()), t.hoverData.tapholdCancelled = !0, t.data.bgActivePosistion = void 0, oe && oe.unactivate(), t.hoverData.which === 3) {
        var Oe = {
          originalEvent: N,
          type: "cxttapend",
          position: {
            x: q[0],
            y: q[1]
          }
        };
        if (oe ? oe.emit(Oe) : Q.emit(Oe), !t.hoverData.cxtDragged) {
          var me = {
            originalEvent: N,
            type: "cxttap",
            position: {
              x: q[0],
              y: q[1]
            }
          };
          oe ? oe.emit(me) : Q.emit(me);
        }
        t.hoverData.cxtDragged = !1, t.hoverData.which = null;
      } else if (t.hoverData.which === 1) {
        if (r(pe, ["mouseup", "tapend", "vmouseup"], N, {
          x: q[0],
          y: q[1]
        }), !t.dragData.didDrag && // didn't move a node around
        !t.hoverData.dragged && // didn't pan
        !t.hoverData.selecting && // not box selection
        !t.hoverData.isOverThresholdDrag && (r(oe, ["click", "tap", "vclick"], N, {
          x: q[0],
          y: q[1]
        }), D = !1, N.timeStamp - A <= Q.multiClickDebounceTime() ? (w && clearTimeout(w), D = !0, A = null, r(oe, ["dblclick", "dbltap", "vdblclick"], N, {
          x: q[0],
          y: q[1]
        })) : (w = setTimeout(function() {
          D || r(oe, ["oneclick", "onetap", "voneclick"], N, {
            x: q[0],
            y: q[1]
          });
        }, Q.multiClickDebounceTime()), A = N.timeStamp)), oe == null && !t.dragData.didDrag && !t.hoverData.selecting && !t.hoverData.dragged && !a(N) && (Q.$(e).unselect(["tapunselect"]), j.length > 0 && t.redrawHint("eles", !0), t.dragData.possibleDragElements = j = Q.collection()), pe == oe && !t.dragData.didDrag && !t.hoverData.selecting && pe != null && pe._private.selectable && (t.hoverData.dragging || (Q.selectionType() === "additive" || we ? pe.selected() ? pe.unselect(["tapunselect"]) : pe.select(["tapselect"]) : we || (Q.$(e).unmerge(pe).unselect(["tapunselect"]), pe.select(["tapselect"]))), t.redrawHint("eles", !0)), t.hoverData.selecting) {
          var Se = Q.collection(t.getAllInBox(W[0], W[1], W[2], W[3]));
          t.redrawHint("select", !0), Se.length > 0 && t.redrawHint("eles", !0), Q.emit({
            type: "boxend",
            originalEvent: N,
            position: {
              x: q[0],
              y: q[1]
            }
          });
          var ye = function(He) {
            return He.selectable() && !He.selected();
          };
          Q.selectionType() === "additive" || we || Q.$(e).unmerge(Se).unselect(), Se.emit("box").stdFilter(ye).select().emit("boxselect"), t.redraw();
        }
        if (t.hoverData.dragging && (t.hoverData.dragging = !1, t.redrawHint("select", !0), t.redrawHint("eles", !0), t.redraw()), !W[4]) {
          t.redrawHint("drag", !0), t.redrawHint("eles", !0);
          var be = oe && oe.grabbed();
          g(j), be && (oe.emit("freeon"), j.emit("free"), t.dragData.didDrag && (oe.emit("dragfreeon"), j.emit("dragfree")));
        }
      }
      W[4] = 0, t.hoverData.down = null, t.hoverData.cxtStarted = !1, t.hoverData.draggingEles = !1, t.hoverData.selecting = !1, t.hoverData.isOverThresholdDrag = !1, t.dragData.didDrag = !1, t.hoverData.dragged = !1, t.hoverData.dragDelta = [], t.hoverData.mdownPos = null, t.hoverData.mdownGPos = null;
    }
  }, !1);
  var L = function(N) {
    if (!t.scrollingPage) {
      var _ = t.cy, Q = _.zoom(), q = _.pan(), W = t.projectIntoViewport(N.clientX, N.clientY), pe = [W[0] * Q + q.x, W[1] * Q + q.y];
      if (t.hoverData.draggingEles || t.hoverData.dragging || t.hoverData.cxtStarted || b()) {
        N.preventDefault();
        return;
      }
      if (_.panningEnabled() && _.userPanningEnabled() && _.zoomingEnabled() && _.userZoomingEnabled()) {
        N.preventDefault(), t.data.wheelZooming = !0, clearTimeout(t.data.wheelTimeout), t.data.wheelTimeout = setTimeout(function() {
          t.data.wheelZooming = !1, t.redrawHint("eles", !0), t.redraw();
        }, 150);
        var j;
        N.deltaY != null ? j = N.deltaY / -250 : N.wheelDeltaY != null ? j = N.wheelDeltaY / 1e3 : j = N.wheelDelta / 1e3, j = j * t.wheelSensitivity;
        var oe = N.deltaMode === 1;
        oe && (j *= 33);
        var we = _.zoom() * Math.pow(10, j);
        N.type === "gesturechange" && (we = t.gestureStartZoom * N.scale), _.zoom({
          level: we,
          renderedPosition: {
            x: pe[0],
            y: pe[1]
          }
        }), _.emit(N.type === "gesturechange" ? "pinchzoom" : "scrollzoom");
      }
    }
  };
  t.registerBinding(t.container, "wheel", L, !0), t.registerBinding(window, "scroll", function(N) {
    t.scrollingPage = !0, clearTimeout(t.scrollingPageTimeout), t.scrollingPageTimeout = setTimeout(function() {
      t.scrollingPage = !1;
    }, 250);
  }, !0), t.registerBinding(t.container, "gesturestart", function(N) {
    t.gestureStartZoom = t.cy.zoom(), t.hasTouchStarted || N.preventDefault();
  }, !0), t.registerBinding(t.container, "gesturechange", function(J) {
    t.hasTouchStarted || L(J);
  }, !0), t.registerBinding(t.container, "mouseout", function(N) {
    var _ = t.projectIntoViewport(N.clientX, N.clientY);
    t.cy.emit({
      originalEvent: N,
      type: "mouseout",
      position: {
        x: _[0],
        y: _[1]
      }
    });
  }, !1), t.registerBinding(t.container, "mouseover", function(N) {
    var _ = t.projectIntoViewport(N.clientX, N.clientY);
    t.cy.emit({
      originalEvent: N,
      type: "mouseover",
      position: {
        x: _[0],
        y: _[1]
      }
    });
  }, !1);
  var M, O, P, I, k, R, B, z, F, $, U, V, H, Y = function(N, _, Q, q) {
    return Math.sqrt((Q - N) * (Q - N) + (q - _) * (q - _));
  }, G = function(N, _, Q, q) {
    return (Q - N) * (Q - N) + (q - _) * (q - _);
  }, X;
  t.registerBinding(t.container, "touchstart", X = function(N) {
    if (t.hasTouchStarted = !0, !!x(N)) {
      p(), t.touchData.capture = !0, t.data.bgActivePosistion = void 0;
      var _ = t.cy, Q = t.touchData.now, q = t.touchData.earlier;
      if (N.touches[0]) {
        var W = t.projectIntoViewport(N.touches[0].clientX, N.touches[0].clientY);
        Q[0] = W[0], Q[1] = W[1];
      }
      if (N.touches[1]) {
        var W = t.projectIntoViewport(N.touches[1].clientX, N.touches[1].clientY);
        Q[2] = W[0], Q[3] = W[1];
      }
      if (N.touches[2]) {
        var W = t.projectIntoViewport(N.touches[2].clientX, N.touches[2].clientY);
        Q[4] = W[0], Q[5] = W[1];
      }
      if (N.touches[1]) {
        t.touchData.singleTouchMoved = !0, g(t.dragData.touchDragEles);
        var pe = t.findContainerClientCoords();
        F = pe[0], $ = pe[1], U = pe[2], V = pe[3], M = N.touches[0].clientX - F, O = N.touches[0].clientY - $, P = N.touches[1].clientX - F, I = N.touches[1].clientY - $, H = 0 <= M && M <= U && 0 <= P && P <= U && 0 <= O && O <= V && 0 <= I && I <= V;
        var j = _.pan(), oe = _.zoom();
        k = Y(M, O, P, I), R = G(M, O, P, I), B = [(M + P) / 2, (O + I) / 2], z = [(B[0] - j.x) / oe, (B[1] - j.y) / oe];
        var we = 200, Oe = we * we;
        if (R < Oe && !N.touches[2]) {
          var me = t.findNearestElement(Q[0], Q[1], !0, !0), Se = t.findNearestElement(Q[2], Q[3], !0, !0);
          me && me.isNode() ? (me.activate().emit({
            originalEvent: N,
            type: "cxttapstart",
            position: {
              x: Q[0],
              y: Q[1]
            }
          }), t.touchData.start = me) : Se && Se.isNode() ? (Se.activate().emit({
            originalEvent: N,
            type: "cxttapstart",
            position: {
              x: Q[0],
              y: Q[1]
            }
          }), t.touchData.start = Se) : _.emit({
            originalEvent: N,
            type: "cxttapstart",
            position: {
              x: Q[0],
              y: Q[1]
            }
          }), t.touchData.start && (t.touchData.start._private.grabbed = !1), t.touchData.cxt = !0, t.touchData.cxtDragged = !1, t.data.bgActivePosistion = void 0, t.redraw();
          return;
        }
      }
      if (N.touches[2])
        _.boxSelectionEnabled() && N.preventDefault();
      else if (!N.touches[1]) {
        if (N.touches[0]) {
          var ye = t.findNearestElements(Q[0], Q[1], !0, !0), be = ye[0];
          if (be != null && (be.activate(), t.touchData.start = be, t.touchData.starts = ye, t.nodeIsGrabbable(be))) {
            var Ge = t.dragData.touchDragEles = _.collection(), He = null;
            t.redrawHint("eles", !0), t.redrawHint("drag", !0), be.selected() ? (He = _.$(function(at) {
              return at.selected() && t.nodeIsGrabbable(at);
            }), v(He, {
              addToList: Ge
            })) : d(be, {
              addToList: Ge
            }), l(be);
            var pt = function(Ot) {
              return {
                originalEvent: N,
                type: Ot,
                position: {
                  x: Q[0],
                  y: Q[1]
                }
              };
            };
            be.emit(pt("grabon")), He ? He.forEach(function(at) {
              at.emit(pt("grab"));
            }) : be.emit(pt("grab"));
          }
          r(be, ["touchstart", "tapstart", "vmousedown"], N, {
            x: Q[0],
            y: Q[1]
          }), be == null && (t.data.bgActivePosistion = {
            x: W[0],
            y: W[1]
          }, t.redrawHint("select", !0), t.redraw()), t.touchData.singleTouchMoved = !1, t.touchData.singleTouchStartTime = +new Date(), clearTimeout(t.touchData.tapholdTimeout), t.touchData.tapholdTimeout = setTimeout(function() {
            t.touchData.singleTouchMoved === !1 && !t.pinching && !t.touchData.selecting && r(t.touchData.start, ["taphold"], N, {
              x: Q[0],
              y: Q[1]
            });
          }, t.tapholdDuration);
        }
      }
      if (N.touches.length >= 1) {
        for (var yt = t.touchData.startPosition = [], Xe = 0; Xe < Q.length; Xe++)
          yt[Xe] = q[Xe] = Q[Xe];
        var vt = N.touches[0];
        t.touchData.startGPosition = [vt.clientX, vt.clientY];
      }
    }
  }, !1);
  var K;
  t.registerBinding(window, "touchmove", K = function(N) {
    var _ = t.touchData.capture;
    if (!(!_ && !x(N))) {
      var Q = t.selection, q = t.cy, W = t.touchData.now, pe = t.touchData.earlier, j = q.zoom();
      if (N.touches[0]) {
        var oe = t.projectIntoViewport(N.touches[0].clientX, N.touches[0].clientY);
        W[0] = oe[0], W[1] = oe[1];
      }
      if (N.touches[1]) {
        var oe = t.projectIntoViewport(N.touches[1].clientX, N.touches[1].clientY);
        W[2] = oe[0], W[3] = oe[1];
      }
      if (N.touches[2]) {
        var oe = t.projectIntoViewport(N.touches[2].clientX, N.touches[2].clientY);
        W[4] = oe[0], W[5] = oe[1];
      }
      var we = t.touchData.startGPosition, Oe;
      if (_ && N.touches[0] && we) {
        for (var me = [], Se = 0; Se < W.length; Se++)
          me[Se] = W[Se] - pe[Se];
        var ye = N.touches[0].clientX - we[0], be = ye * ye, Ge = N.touches[0].clientY - we[1], He = Ge * Ge, pt = be + He;
        Oe = pt >= t.touchTapThreshold2;
      }
      if (_ && t.touchData.cxt) {
        N.preventDefault();
        var yt = N.touches[0].clientX - F, Xe = N.touches[0].clientY - $, vt = N.touches[1].clientX - F, at = N.touches[1].clientY - $, Ot = G(yt, Xe, vt, at), Bt = Ot / R, vr = 150, Jt = vr * vr, cr = 1.5, xa = cr * cr;
        if (Bt >= xa || Ot >= Jt) {
          t.touchData.cxt = !1, t.data.bgActivePosistion = void 0, t.redrawHint("select", !0);
          var jt = {
            originalEvent: N,
            type: "cxttapend",
            position: {
              x: W[0],
              y: W[1]
            }
          };
          t.touchData.start ? (t.touchData.start.unactivate().emit(jt), t.touchData.start = null) : q.emit(jt);
        }
      }
      if (_ && t.touchData.cxt) {
        var jt = {
          originalEvent: N,
          type: "cxtdrag",
          position: {
            x: W[0],
            y: W[1]
          }
        };
        t.data.bgActivePosistion = void 0, t.redrawHint("select", !0), t.touchData.start ? t.touchData.start.emit(jt) : q.emit(jt), t.touchData.start && (t.touchData.start._private.grabbed = !1), t.touchData.cxtDragged = !0;
        var st = t.findNearestElement(W[0], W[1], !0, !0);
        (!t.touchData.cxtOver || st !== t.touchData.cxtOver) && (t.touchData.cxtOver && t.touchData.cxtOver.emit({
          originalEvent: N,
          type: "cxtdragout",
          position: {
            x: W[0],
            y: W[1]
          }
        }), t.touchData.cxtOver = st, st && st.emit({
          originalEvent: N,
          type: "cxtdragover",
          position: {
            x: W[0],
            y: W[1]
          }
        }));
      } else if (_ && N.touches[2] && q.boxSelectionEnabled())
        N.preventDefault(), t.data.bgActivePosistion = void 0, this.lastThreeTouch = +new Date(), t.touchData.selecting || q.emit({
          originalEvent: N,
          type: "boxstart",
          position: {
            x: W[0],
            y: W[1]
          }
        }), t.touchData.selecting = !0, t.touchData.didSelect = !0, Q[4] = 1, !Q || Q.length === 0 || Q[0] === void 0 ? (Q[0] = (W[0] + W[2] + W[4]) / 3, Q[1] = (W[1] + W[3] + W[5]) / 3, Q[2] = (W[0] + W[2] + W[4]) / 3 + 1, Q[3] = (W[1] + W[3] + W[5]) / 3 + 1) : (Q[2] = (W[0] + W[2] + W[4]) / 3, Q[3] = (W[1] + W[3] + W[5]) / 3), t.redrawHint("select", !0), t.redraw();
      else if (_ && N.touches[1] && !t.touchData.didSelect && q.zoomingEnabled() && q.panningEnabled() && q.userZoomingEnabled() && q.userPanningEnabled()) {
        N.preventDefault(), t.data.bgActivePosistion = void 0, t.redrawHint("select", !0);
        var Je = t.dragData.touchDragEles;
        if (Je) {
          t.redrawHint("drag", !0);
          for (var ot = 0; ot < Je.length; ot++) {
            var Ta = Je[ot]._private;
            Ta.grabbed = !1, Ta.rscratch.inDragLayer = !1;
          }
        }
        var Tt = t.touchData.start, yt = N.touches[0].clientX - F, Xe = N.touches[0].clientY - $, vt = N.touches[1].clientX - F, at = N.touches[1].clientY - $, Ti = Y(yt, Xe, vt, at), Pu = Ti / k;
        if (H) {
          var Bu = yt - M, Fu = Xe - O, Gu = vt - P, zu = at - I, $u = (Bu + Gu) / 2, Vu = (Fu + zu) / 2, zr = q.zoom(), En = zr * Pu, Ca = q.pan(), Ci = z[0] * zr + Ca.x, Di = z[1] * zr + Ca.y, _u = {
            x: -En / zr * (Ci - Ca.x - $u) + Ci,
            y: -En / zr * (Di - Ca.y - Vu) + Di
          };
          if (Tt && Tt.active()) {
            var Je = t.dragData.touchDragEles;
            g(Je), t.redrawHint("drag", !0), t.redrawHint("eles", !0), Tt.unactivate().emit("freeon"), Je.emit("free"), t.dragData.didDrag && (Tt.emit("dragfreeon"), Je.emit("dragfree"));
          }
          q.viewport({
            zoom: En,
            pan: _u,
            cancelOnFailedZoom: !0
          }), q.emit("pinchzoom"), k = Ti, M = yt, O = Xe, P = vt, I = at, t.pinching = !0;
        }
        if (N.touches[0]) {
          var oe = t.projectIntoViewport(N.touches[0].clientX, N.touches[0].clientY);
          W[0] = oe[0], W[1] = oe[1];
        }
        if (N.touches[1]) {
          var oe = t.projectIntoViewport(N.touches[1].clientX, N.touches[1].clientY);
          W[2] = oe[0], W[3] = oe[1];
        }
        if (N.touches[2]) {
          var oe = t.projectIntoViewport(N.touches[2].clientX, N.touches[2].clientY);
          W[4] = oe[0], W[5] = oe[1];
        }
      } else if (N.touches[0] && !t.touchData.didSelect) {
        var mt = t.touchData.start, wn = t.touchData.last, st;
        if (!t.hoverData.draggingEles && !t.swipePanning && (st = t.findNearestElement(W[0], W[1], !0, !0)), _ && mt != null && N.preventDefault(), _ && mt != null && t.nodeIsDraggable(mt))
          if (Oe) {
            var Je = t.dragData.touchDragEles, Si = !t.dragData.didDrag;
            Si && v(Je, {
              inDragLayer: !0
            }), t.dragData.didDrag = !0;
            var $r = {
              x: 0,
              y: 0
            };
            if (ae(me[0]) && ae(me[1]) && ($r.x += me[0], $r.y += me[1], Si)) {
              t.redrawHint("eles", !0);
              var bt = t.touchData.dragDelta;
              bt && ae(bt[0]) && ae(bt[1]) && ($r.x += bt[0], $r.y += bt[1]);
            }
            t.hoverData.draggingEles = !0, Je.silentShift($r).emit("position drag"), t.redrawHint("drag", !0), t.touchData.startPosition[0] == pe[0] && t.touchData.startPosition[1] == pe[1] && t.redrawHint("eles", !0), t.redraw();
          } else {
            var bt = t.touchData.dragDelta = t.touchData.dragDelta || [];
            bt.length === 0 ? (bt.push(me[0]), bt.push(me[1])) : (bt[0] += me[0], bt[1] += me[1]);
          }
        if (r(mt || st, ["touchmove", "tapdrag", "vmousemove"], N, {
          x: W[0],
          y: W[1]
        }), (!mt || !mt.grabbed()) && st != wn && (wn && wn.emit({
          originalEvent: N,
          type: "tapdragout",
          position: {
            x: W[0],
            y: W[1]
          }
        }), st && st.emit({
          originalEvent: N,
          type: "tapdragover",
          position: {
            x: W[0],
            y: W[1]
          }
        })), t.touchData.last = st, _)
          for (var ot = 0; ot < W.length; ot++)
            W[ot] && t.touchData.startPosition[ot] && Oe && (t.touchData.singleTouchMoved = !0);
        if (_ && (mt == null || mt.pannable()) && q.panningEnabled() && q.userPanningEnabled()) {
          var Uu = n(mt, t.touchData.starts);
          Uu && (N.preventDefault(), t.data.bgActivePosistion || (t.data.bgActivePosistion = Er(t.touchData.startPosition)), t.swipePanning ? (q.panBy({
            x: me[0] * j,
            y: me[1] * j
          }), q.emit("dragpan")) : Oe && (t.swipePanning = !0, q.panBy({
            x: ye * j,
            y: Ge * j
          }), q.emit("dragpan"), mt && (mt.unactivate(), t.redrawHint("select", !0), t.touchData.start = null)));
          var oe = t.projectIntoViewport(N.touches[0].clientX, N.touches[0].clientY);
          W[0] = oe[0], W[1] = oe[1];
        }
      }
      for (var Se = 0; Se < W.length; Se++)
        pe[Se] = W[Se];
      _ && N.touches.length > 0 && !t.hoverData.draggingEles && !t.swipePanning && t.data.bgActivePosistion != null && (t.data.bgActivePosistion = void 0, t.redrawHint("select", !0), t.redraw());
    }
  }, !1);
  var Z;
  t.registerBinding(window, "touchcancel", Z = function(N) {
    var _ = t.touchData.start;
    t.touchData.capture = !1, _ && _.unactivate();
  });
  var te, he, de, ee;
  if (t.registerBinding(window, "touchend", te = function(N) {
    var _ = t.touchData.start, Q = t.touchData.capture;
    if (Q)
      N.touches.length === 0 && (t.touchData.capture = !1), N.preventDefault();
    else
      return;
    var q = t.selection;
    t.swipePanning = !1, t.hoverData.draggingEles = !1;
    var W = t.cy, pe = W.zoom(), j = t.touchData.now, oe = t.touchData.earlier;
    if (N.touches[0]) {
      var we = t.projectIntoViewport(N.touches[0].clientX, N.touches[0].clientY);
      j[0] = we[0], j[1] = we[1];
    }
    if (N.touches[1]) {
      var we = t.projectIntoViewport(N.touches[1].clientX, N.touches[1].clientY);
      j[2] = we[0], j[3] = we[1];
    }
    if (N.touches[2]) {
      var we = t.projectIntoViewport(N.touches[2].clientX, N.touches[2].clientY);
      j[4] = we[0], j[5] = we[1];
    }
    _ && _.unactivate();
    var Oe;
    if (t.touchData.cxt) {
      if (Oe = {
        originalEvent: N,
        type: "cxttapend",
        position: {
          x: j[0],
          y: j[1]
        }
      }, _ ? _.emit(Oe) : W.emit(Oe), !t.touchData.cxtDragged) {
        var me = {
          originalEvent: N,
          type: "cxttap",
          position: {
            x: j[0],
            y: j[1]
          }
        };
        _ ? _.emit(me) : W.emit(me);
      }
      t.touchData.start && (t.touchData.start._private.grabbed = !1), t.touchData.cxt = !1, t.touchData.start = null, t.redraw();
      return;
    }
    if (!N.touches[2] && W.boxSelectionEnabled() && t.touchData.selecting) {
      t.touchData.selecting = !1;
      var Se = W.collection(t.getAllInBox(q[0], q[1], q[2], q[3]));
      q[0] = void 0, q[1] = void 0, q[2] = void 0, q[3] = void 0, q[4] = 0, t.redrawHint("select", !0), W.emit({
        type: "boxend",
        originalEvent: N,
        position: {
          x: j[0],
          y: j[1]
        }
      });
      var ye = function(Jt) {
        return Jt.selectable() && !Jt.selected();
      };
      Se.emit("box").stdFilter(ye).select().emit("boxselect"), Se.nonempty() && t.redrawHint("eles", !0), t.redraw();
    }
    if (_ != null && _.unactivate(), N.touches[2])
      t.data.bgActivePosistion = void 0, t.redrawHint("select", !0);
    else if (!N.touches[1]) {
      if (!N.touches[0]) {
        if (!N.touches[0]) {
          t.data.bgActivePosistion = void 0, t.redrawHint("select", !0);
          var be = t.dragData.touchDragEles;
          if (_ != null) {
            var Ge = _._private.grabbed;
            g(be), t.redrawHint("drag", !0), t.redrawHint("eles", !0), Ge && (_.emit("freeon"), be.emit("free"), t.dragData.didDrag && (_.emit("dragfreeon"), be.emit("dragfree"))), r(_, ["touchend", "tapend", "vmouseup", "tapdragout"], N, {
              x: j[0],
              y: j[1]
            }), _.unactivate(), t.touchData.start = null;
          } else {
            var He = t.findNearestElement(j[0], j[1], !0, !0);
            r(He, ["touchend", "tapend", "vmouseup", "tapdragout"], N, {
              x: j[0],
              y: j[1]
            });
          }
          var pt = t.touchData.startPosition[0] - j[0], yt = pt * pt, Xe = t.touchData.startPosition[1] - j[1], vt = Xe * Xe, at = yt + vt, Ot = at * pe * pe;
          t.touchData.singleTouchMoved || (_ || W.$(":selected").unselect(["tapunselect"]), r(_, ["tap", "vclick"], N, {
            x: j[0],
            y: j[1]
          }), he = !1, N.timeStamp - ee <= W.multiClickDebounceTime() ? (de && clearTimeout(de), he = !0, ee = null, r(_, ["dbltap", "vdblclick"], N, {
            x: j[0],
            y: j[1]
          })) : (de = setTimeout(function() {
            he || r(_, ["onetap", "voneclick"], N, {
              x: j[0],
              y: j[1]
            });
          }, W.multiClickDebounceTime()), ee = N.timeStamp)), _ != null && !t.dragData.didDrag && _._private.selectable && Ot < t.touchTapThreshold2 && !t.pinching && (W.selectionType() === "single" ? (W.$(e).unmerge(_).unselect(["tapunselect"]), _.select(["tapselect"])) : _.selected() ? _.unselect(["tapunselect"]) : _.select(["tapselect"]), t.redrawHint("eles", !0)), t.touchData.singleTouchMoved = !0;
        }
      }
    }
    for (var Bt = 0; Bt < j.length; Bt++)
      oe[Bt] = j[Bt];
    t.dragData.didDrag = !1, N.touches.length === 0 && (t.touchData.dragDelta = [], t.touchData.startPosition = null, t.touchData.startGPosition = null, t.touchData.didSelect = !1), N.touches.length < 2 && (N.touches.length === 1 && (t.touchData.startGPosition = [N.touches[0].clientX, N.touches[0].clientY]), t.pinching = !1, t.redrawHint("eles", !0), t.redraw());
  }, !1), typeof TouchEvent > "u") {
    var re = [], fe = function(N) {
      return {
        clientX: N.clientX,
        clientY: N.clientY,
        force: 1,
        identifier: N.pointerId,
        pageX: N.pageX,
        pageY: N.pageY,
        radiusX: N.width / 2,
        radiusY: N.height / 2,
        screenX: N.screenX,
        screenY: N.screenY,
        target: N.target
      };
    }, se = function(N) {
      return {
        event: N,
        touch: fe(N)
      };
    }, ne = function(N) {
      re.push(se(N));
    }, ue = function(N) {
      for (var _ = 0; _ < re.length; _++) {
        var Q = re[_];
        if (Q.event.pointerId === N.pointerId) {
          re.splice(_, 1);
          return;
        }
      }
    }, Ee = function(N) {
      var _ = re.filter(function(Q) {
        return Q.event.pointerId === N.pointerId;
      })[0];
      _.event = N, _.touch = fe(N);
    }, ge = function(N) {
      N.touches = re.map(function(_) {
        return _.touch;
      });
    }, ve = function(N) {
      return N.pointerType === "mouse" || N.pointerType === 4;
    };
    t.registerBinding(t.container, "pointerdown", function(J) {
      ve(J) || (J.preventDefault(), ne(J), ge(J), X(J));
    }), t.registerBinding(t.container, "pointerup", function(J) {
      ve(J) || (ue(J), ge(J), te(J));
    }), t.registerBinding(t.container, "pointercancel", function(J) {
      ve(J) || (ue(J), ge(J), Z(J));
    }), t.registerBinding(t.container, "pointermove", function(J) {
      ve(J) || (J.preventDefault(), Ee(J), ge(J), K(J));
    });
  }
};
var kt = {};
kt.generatePolygon = function(t, e) {
  return this.nodeShapes[t] = {
    renderer: this,
    name: t,
    points: e,
    draw: function(a, n, i, s, o) {
      this.renderer.nodeShapeImpl("polygon", a, n, i, s, o, this.points);
    },
    intersectLine: function(a, n, i, s, o, u, l) {
      return sa(o, u, this.points, a, n, i / 2, s / 2, l);
    },
    checkPoint: function(a, n, i, s, o, u, l) {
      return It(a, n, this.points, u, l, s, o, [0, -1], i);
    }
  };
};
kt.generateEllipse = function() {
  return this.nodeShapes.ellipse = {
    renderer: this,
    name: "ellipse",
    draw: function(e, r, a, n, i) {
      this.renderer.nodeShapeImpl(this.name, e, r, a, n, i);
    },
    intersectLine: function(e, r, a, n, i, s, o) {
      return hg(i, s, e, r, a / 2 + o, n / 2 + o);
    },
    checkPoint: function(e, r, a, n, i, s, o) {
      return rr(e, r, n, i, s, o, a);
    }
  };
};
kt.generateRoundPolygon = function(t, e) {
  for (var r = new Array(e.length * 2), a = 0; a < e.length / 2; a++) {
    var n = a * 2, i = void 0;
    a < e.length / 2 - 1 ? i = (a + 1) * 2 : i = 0, r[a * 4] = e[n], r[a * 4 + 1] = e[n + 1];
    var s = e[i] - e[n], o = e[i + 1] - e[n + 1], u = Math.sqrt(s * s + o * o);
    r[a * 4 + 2] = s / u, r[a * 4 + 3] = o / u;
  }
  return this.nodeShapes[t] = {
    renderer: this,
    name: t,
    points: r,
    draw: function(f, h, c, v, d) {
      this.renderer.nodeShapeImpl("round-polygon", f, h, c, v, d, this.points);
    },
    intersectLine: function(f, h, c, v, d, g, y) {
      return vg(d, g, this.points, f, h, c, v);
    },
    checkPoint: function(f, h, c, v, d, g, y) {
      return fg(f, h, this.points, g, y, v, d);
    }
  };
};
kt.generateRoundRectangle = function() {
  return this.nodeShapes["round-rectangle"] = this.nodeShapes.roundrectangle = {
    renderer: this,
    name: "round-rectangle",
    points: nt(4, 0),
    draw: function(e, r, a, n, i) {
      this.renderer.nodeShapeImpl(this.name, e, r, a, n, i);
    },
    intersectLine: function(e, r, a, n, i, s, o) {
      return So(i, s, e, r, a, n, o);
    },
    checkPoint: function(e, r, a, n, i, s, o) {
      var u = pa(n, i), l = u * 2;
      return !!(It(e, r, this.points, s, o, n, i - l, [0, -1], a) || It(e, r, this.points, s, o, n - l, i, [0, -1], a) || rr(e, r, l, l, s - n / 2 + u, o - i / 2 + u, a) || rr(e, r, l, l, s + n / 2 - u, o - i / 2 + u, a) || rr(e, r, l, l, s + n / 2 - u, o + i / 2 - u, a) || rr(e, r, l, l, s - n / 2 + u, o + i / 2 - u, a));
    }
  };
};
kt.generateCutRectangle = function() {
  return this.nodeShapes["cut-rectangle"] = this.nodeShapes.cutrectangle = {
    renderer: this,
    name: "cut-rectangle",
    cornerLength: No(),
    points: nt(4, 0),
    draw: function(e, r, a, n, i) {
      this.renderer.nodeShapeImpl(this.name, e, r, a, n, i);
    },
    generateCutTrianglePts: function(e, r, a, n) {
      var i = this.cornerLength, s = r / 2, o = e / 2, u = a - o, l = a + o, f = n - s, h = n + s;
      return {
        topLeft: [u, f + i, u + i, f, u + i, f + i],
        topRight: [l - i, f, l, f + i, l - i, f + i],
        bottomRight: [l, h - i, l - i, h, l - i, h - i],
        bottomLeft: [u + i, h, u, h - i, u + i, h - i]
      };
    },
    intersectLine: function(e, r, a, n, i, s, o) {
      var u = this.generateCutTrianglePts(a + 2 * o, n + 2 * o, e, r), l = [].concat.apply([], [u.topLeft.splice(0, 4), u.topRight.splice(0, 4), u.bottomRight.splice(0, 4), u.bottomLeft.splice(0, 4)]);
      return sa(i, s, l, e, r);
    },
    checkPoint: function(e, r, a, n, i, s, o) {
      if (It(e, r, this.points, s, o, n, i - 2 * this.cornerLength, [0, -1], a) || It(e, r, this.points, s, o, n - 2 * this.cornerLength, i, [0, -1], a))
        return !0;
      var u = this.generateCutTrianglePts(n, i, s, o);
      return ut(e, r, u.topLeft) || ut(e, r, u.topRight) || ut(e, r, u.bottomRight) || ut(e, r, u.bottomLeft);
    }
  };
};
kt.generateBarrel = function() {
  return this.nodeShapes.barrel = {
    renderer: this,
    name: "barrel",
    points: nt(4, 0),
    draw: function(e, r, a, n, i) {
      this.renderer.nodeShapeImpl(this.name, e, r, a, n, i);
    },
    intersectLine: function(e, r, a, n, i, s, o) {
      var u = 0.15, l = 0.5, f = 0.85, h = this.generateBarrelBezierPts(a + 2 * o, n + 2 * o, e, r), c = function(g) {
        var y = xr({
          x: g[0],
          y: g[1]
        }, {
          x: g[2],
          y: g[3]
        }, {
          x: g[4],
          y: g[5]
        }, u), p = xr({
          x: g[0],
          y: g[1]
        }, {
          x: g[2],
          y: g[3]
        }, {
          x: g[4],
          y: g[5]
        }, l), E = xr({
          x: g[0],
          y: g[1]
        }, {
          x: g[2],
          y: g[3]
        }, {
          x: g[4],
          y: g[5]
        }, f);
        return [g[0], g[1], y.x, y.y, p.x, p.y, E.x, E.y, g[4], g[5]];
      }, v = [].concat(c(h.topLeft), c(h.topRight), c(h.bottomRight), c(h.bottomLeft));
      return sa(i, s, v, e, r);
    },
    generateBarrelBezierPts: function(e, r, a, n) {
      var i = r / 2, s = e / 2, o = a - s, u = a + s, l = n - i, f = n + i, h = zn(e, r), c = h.heightOffset, v = h.widthOffset, d = h.ctrlPtOffsetPct * e, g = {
        topLeft: [o, l + c, o + d, l, o + v, l],
        topRight: [u - v, l, u - d, l, u, l + c],
        bottomRight: [u, f - c, u - d, f, u - v, f],
        bottomLeft: [o + v, f, o + d, f, o, f - c]
      };
      return g.topLeft.isTop = !0, g.topRight.isTop = !0, g.bottomLeft.isBottom = !0, g.bottomRight.isBottom = !0, g;
    },
    checkPoint: function(e, r, a, n, i, s, o) {
      var u = zn(n, i), l = u.heightOffset, f = u.widthOffset;
      if (It(e, r, this.points, s, o, n, i - 2 * l, [0, -1], a) || It(e, r, this.points, s, o, n - 2 * f, i, [0, -1], a))
        return !0;
      for (var h = this.generateBarrelBezierPts(n, i, s, o), c = function(b, x, w) {
        var D = w[4], A = w[2], L = w[0], M = w[5], O = w[1], P = Math.min(D, L), I = Math.max(D, L), k = Math.min(M, O), R = Math.max(M, O);
        if (P <= b && b <= I && k <= x && x <= R) {
          var B = cg(D, A, L), z = sg(B[0], B[1], B[2], b), F = z.filter(function($) {
            return 0 <= $ && $ <= 1;
          });
          if (F.length > 0)
            return F[0];
        }
        return null;
      }, v = Object.keys(h), d = 0; d < v.length; d++) {
        var g = v[d], y = h[g], p = c(e, r, y);
        if (p != null) {
          var E = y[5], m = y[3], T = y[1], C = Ye(E, m, T, p);
          if (y.isTop && C <= r || y.isBottom && r <= C)
            return !0;
        }
      }
      return !1;
    }
  };
};
kt.generateBottomRoundrectangle = function() {
  return this.nodeShapes["bottom-round-rectangle"] = this.nodeShapes.bottomroundrectangle = {
    renderer: this,
    name: "bottom-round-rectangle",
    points: nt(4, 0),
    draw: function(e, r, a, n, i) {
      this.renderer.nodeShapeImpl(this.name, e, r, a, n, i);
    },
    intersectLine: function(e, r, a, n, i, s, o) {
      var u = e - (a / 2 + o), l = r - (n / 2 + o), f = l, h = e + (a / 2 + o), c = Vt(i, s, e, r, u, l, h, f, !1);
      return c.length > 0 ? c : So(i, s, e, r, a, n, o);
    },
    checkPoint: function(e, r, a, n, i, s, o) {
      var u = pa(n, i), l = 2 * u;
      if (It(e, r, this.points, s, o, n, i - l, [0, -1], a) || It(e, r, this.points, s, o, n - l, i, [0, -1], a))
        return !0;
      var f = n / 2 + 2 * a, h = i / 2 + 2 * a, c = [s - f, o - h, s - f, o, s + f, o, s + f, o - h];
      return !!(ut(e, r, c) || rr(e, r, l, l, s + n / 2 - u, o + i / 2 - u, a) || rr(e, r, l, l, s - n / 2 + u, o + i / 2 - u, a));
    }
  };
};
kt.registerNodeShapes = function() {
  var t = this.nodeShapes = {}, e = this;
  this.generateEllipse(), this.generatePolygon("triangle", nt(3, 0)), this.generateRoundPolygon("round-triangle", nt(3, 0)), this.generatePolygon("rectangle", nt(4, 0)), t.square = t.rectangle, this.generateRoundRectangle(), this.generateCutRectangle(), this.generateBarrel(), this.generateBottomRoundrectangle();
  {
    var r = [0, 1, 1, 0, 0, -1, -1, 0];
    this.generatePolygon("diamond", r), this.generateRoundPolygon("round-diamond", r);
  }
  this.generatePolygon("pentagon", nt(5, 0)), this.generateRoundPolygon("round-pentagon", nt(5, 0)), this.generatePolygon("hexagon", nt(6, 0)), this.generateRoundPolygon("round-hexagon", nt(6, 0)), this.generatePolygon("heptagon", nt(7, 0)), this.generateRoundPolygon("round-heptagon", nt(7, 0)), this.generatePolygon("octagon", nt(8, 0)), this.generateRoundPolygon("round-octagon", nt(8, 0));
  var a = new Array(20);
  {
    var n = Gn(5, 0), i = Gn(5, Math.PI / 5), s = 0.5 * (3 - Math.sqrt(5));
    s *= 1.57;
    for (var o = 0; o < i.length / 2; o++)
      i[o * 2] *= s, i[o * 2 + 1] *= s;
    for (var o = 0; o < 20 / 4; o++)
      a[o * 4] = n[o * 2], a[o * 4 + 1] = n[o * 2 + 1], a[o * 4 + 2] = i[o * 2], a[o * 4 + 3] = i[o * 2 + 1];
  }
  a = Oo(a), this.generatePolygon("star", a), this.generatePolygon("vee", [-1, -1, 0, -0.333, 1, -1, 0, 1]), this.generatePolygon("rhomboid", [-1, -1, 0.333, -1, 1, 1, -0.333, 1]), this.nodeShapes.concavehexagon = this.generatePolygon("concave-hexagon", [-1, -0.95, -0.75, 0, -1, 0.95, 1, 0.95, 0.75, 0, 1, -0.95]);
  {
    var u = [-1, -1, 0.25, -1, 1, 0, 0.25, 1, -1, 1];
    this.generatePolygon("tag", u), this.generateRoundPolygon("round-tag", u);
  }
  t.makePolygon = function(l) {
    var f = l.join("$"), h = "polygon-" + f, c;
    return (c = this[h]) ? c : e.generatePolygon(h, l);
  };
};
var Ea = {};
Ea.timeToRender = function() {
  return this.redrawTotalTime / this.redrawCount;
};
Ea.redraw = function(t) {
  t = t || xo();
  var e = this;
  e.averageRedrawTime === void 0 && (e.averageRedrawTime = 0), e.lastRedrawTime === void 0 && (e.lastRedrawTime = 0), e.lastDrawTime === void 0 && (e.lastDrawTime = 0), e.requestedFrame = !0, e.renderOptions = t;
};
Ea.beforeRender = function(t, e) {
  if (!this.destroyed) {
    e == null && ze("Priority is not optional for beforeRender");
    var r = this.beforeRenderCallbacks;
    r.push({
      fn: t,
      priority: e
    }), r.sort(function(a, n) {
      return n.priority - a.priority;
    });
  }
};
var ks = function(e, r, a) {
  for (var n = e.beforeRenderCallbacks, i = 0; i < n.length; i++)
    n[i].fn(r, a);
};
Ea.startRenderLoop = function() {
  var t = this, e = t.cy;
  if (!t.renderLoopStarted) {
    t.renderLoopStarted = !0;
    var r = function a(n) {
      if (!t.destroyed) {
        if (!e.batching())
          if (t.requestedFrame && !t.skipFrame) {
            ks(t, !0, n);
            var i = Mt();
            t.render(t.renderOptions);
            var s = t.lastDrawTime = Mt();
            t.averageRedrawTime === void 0 && (t.averageRedrawTime = s - i), t.redrawCount === void 0 && (t.redrawCount = 0), t.redrawCount++, t.redrawTotalTime === void 0 && (t.redrawTotalTime = 0);
            var o = s - i;
            t.redrawTotalTime += o, t.lastRedrawTime = o, t.averageRedrawTime = t.averageRedrawTime / 2 + o / 2, t.requestedFrame = !1;
          } else
            ks(t, !1, n);
        t.skipFrame = !1, Ya(a);
      }
    };
    Ya(r);
  }
};
var Fy = function(e) {
  this.init(e);
}, mu = Fy, Fr = mu.prototype;
Fr.clientFunctions = ["redrawHint", "render", "renderTo", "matchCanvasSize", "nodeShapeImpl", "arrowShapeImpl"];
Fr.init = function(t) {
  var e = this;
  e.options = t, e.cy = t.cy;
  var r = e.container = t.cy.container();
  if (Be) {
    var a = Be.document, n = a.head, i = "__________cytoscape_stylesheet", s = "__________cytoscape_container", o = a.getElementById(i) != null;
    if (r.className.indexOf(s) < 0 && (r.className = (r.className || "") + " " + s), !o) {
      var u = a.createElement("style");
      u.id = i, u.innerHTML = "." + s + " { position: relative; }", n.insertBefore(u, n.children[0]);
    }
    var l = Be.getComputedStyle(r), f = l.getPropertyValue("position");
    f === "static" && Ae("A Cytoscape container has style position:static and so can not use UI extensions properly");
  }
  e.selection = [void 0, void 0, void 0, void 0, 0], e.bezierProjPcts = [0.05, 0.225, 0.4, 0.5, 0.6, 0.775, 0.95], e.hoverData = {
    down: null,
    last: null,
    downTime: null,
    triggerMode: null,
    dragging: !1,
    initialPan: [null, null],
    capture: !1
  }, e.dragData = {
    possibleDragElements: []
  }, e.touchData = {
    start: null,
    capture: !1,
    // These 3 fields related to tap, taphold events
    startPosition: [null, null, null, null, null, null],
    singleTouchStartTime: null,
    singleTouchMoved: !0,
    now: [null, null, null, null, null, null],
    earlier: [null, null, null, null, null, null]
  }, e.redraws = 0, e.showFps = t.showFps, e.debug = t.debug, e.hideEdgesOnViewport = t.hideEdgesOnViewport, e.textureOnViewport = t.textureOnViewport, e.wheelSensitivity = t.wheelSensitivity, e.motionBlurEnabled = t.motionBlur, e.forcedPixelRatio = ae(t.pixelRatio) ? t.pixelRatio : null, e.motionBlur = t.motionBlur, e.motionBlurOpacity = t.motionBlurOpacity, e.motionBlurTransparency = 1 - e.motionBlurOpacity, e.motionBlurPxRatio = 1, e.mbPxRBlurry = 1, e.minMbLowQualFrames = 4, e.fullQualityMb = !1, e.clearedForMotionBlur = [], e.desktopTapThreshold = t.desktopTapThreshold, e.desktopTapThreshold2 = t.desktopTapThreshold * t.desktopTapThreshold, e.touchTapThreshold = t.touchTapThreshold, e.touchTapThreshold2 = t.touchTapThreshold * t.touchTapThreshold, e.tapholdDuration = 500, e.bindings = [], e.beforeRenderCallbacks = [], e.beforeRenderPriorities = {
    // higher priority execs before lower one
    animations: 400,
    eleCalcs: 300,
    eleTxrDeq: 200,
    lyrTxrDeq: 150,
    lyrTxrSkip: 100
  }, e.registerNodeShapes(), e.registerArrowShapes(), e.registerCalculationListeners();
};
Fr.notify = function(t, e) {
  var r = this, a = r.cy;
  if (!this.destroyed) {
    if (t === "init") {
      r.load();
      return;
    }
    if (t === "destroy") {
      r.destroy();
      return;
    }
    (t === "add" || t === "remove" || t === "move" && a.hasCompoundNodes() || t === "load" || t === "zorder" || t === "mount") && r.invalidateCachedZSortedEles(), t === "viewport" && r.redrawHint("select", !0), (t === "load" || t === "resize" || t === "mount") && (r.invalidateContainerClientCoordsCache(), r.matchCanvasSize(r.container)), r.redrawHint("eles", !0), r.redrawHint("drag", !0), this.startRenderLoop(), this.redraw();
  }
};
Fr.destroy = function() {
  var t = this;
  t.destroyed = !0, t.cy.stopAnimationLoop();
  for (var e = 0; e < t.bindings.length; e++) {
    var r = t.bindings[e], a = r, n = a.target;
    (n.off || n.removeEventListener).apply(n, a.args);
  }
  if (t.bindings = [], t.beforeRenderCallbacks = [], t.onUpdateEleCalcsFns = [], t.removeObserver && t.removeObserver.disconnect(), t.styleObserver && t.styleObserver.disconnect(), t.resizeObserver && t.resizeObserver.disconnect(), t.labelCalcDiv)
    try {
      document.body.removeChild(t.labelCalcDiv);
    } catch {
    }
};
Fr.isHeadless = function() {
  return !1;
};
[Ei, pu, yu, Br, kt, Ea].forEach(function(t) {
  ce(Fr, t);
});
var Rn = 1e3 / 60, bu = {
  setupDequeueing: function(e) {
    return function() {
      var a = this, n = this.renderer;
      if (!a.dequeueingSetup) {
        a.dequeueingSetup = !0;
        var i = tn(function() {
          n.redrawHint("eles", !0), n.redrawHint("drag", !0), n.redraw();
        }, e.deqRedrawThreshold), s = function(l, f) {
          var h = Mt(), c = n.averageRedrawTime, v = n.lastRedrawTime, d = [], g = n.cy.extent(), y = n.getPixelRatio();
          for (l || n.flushRenderedStyleQueue(); ; ) {
            var p = Mt(), E = p - h, m = p - f;
            if (v < Rn) {
              var T = Rn - (l ? c : 0);
              if (m >= e.deqFastCost * T)
                break;
            } else if (l) {
              if (E >= e.deqCost * v || E >= e.deqAvgCost * c)
                break;
            } else if (m >= e.deqNoDrawCost * Rn)
              break;
            var C = e.deq(a, y, g);
            if (C.length > 0)
              for (var S = 0; S < C.length; S++)
                d.push(C[S]);
            else
              break;
          }
          d.length > 0 && (e.onDeqd(a, d), !l && e.shouldRedraw(a, d, y, g) && i());
        }, o = e.priority || ui;
        n.beforeRender(s, o(a));
      }
    };
  }
}, Gy = /* @__PURE__ */ function() {
  function t(e) {
    var r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : Ha;
    ai(this, t), this.idsByKey = new Dt(), this.keyForId = new Dt(), this.cachesByLvl = new Dt(), this.lvls = [], this.getKey = e, this.doesEleInvalidateKey = r;
  }
  return ni(t, [{
    key: "getIdsFor",
    value: function(r) {
      r == null && ze("Can not get id list for null key");
      var a = this.idsByKey, n = this.idsByKey.get(r);
      return n || (n = new Ir(), a.set(r, n)), n;
    }
  }, {
    key: "addIdForKey",
    value: function(r, a) {
      r != null && this.getIdsFor(r).add(a);
    }
  }, {
    key: "deleteIdForKey",
    value: function(r, a) {
      r != null && this.getIdsFor(r).delete(a);
    }
  }, {
    key: "getNumberOfIdsForKey",
    value: function(r) {
      return r == null ? 0 : this.getIdsFor(r).size;
    }
  }, {
    key: "updateKeyMappingFor",
    value: function(r) {
      var a = r.id(), n = this.keyForId.get(a), i = this.getKey(r);
      this.deleteIdForKey(n, a), this.addIdForKey(i, a), this.keyForId.set(a, i);
    }
  }, {
    key: "deleteKeyMappingFor",
    value: function(r) {
      var a = r.id(), n = this.keyForId.get(a);
      this.deleteIdForKey(n, a), this.keyForId.delete(a);
    }
  }, {
    key: "keyHasChangedFor",
    value: function(r) {
      var a = r.id(), n = this.keyForId.get(a), i = this.getKey(r);
      return n !== i;
    }
  }, {
    key: "isInvalid",
    value: function(r) {
      return this.keyHasChangedFor(r) || this.doesEleInvalidateKey(r);
    }
  }, {
    key: "getCachesAt",
    value: function(r) {
      var a = this.cachesByLvl, n = this.lvls, i = a.get(r);
      return i || (i = new Dt(), a.set(r, i), n.push(r)), i;
    }
  }, {
    key: "getCache",
    value: function(r, a) {
      return this.getCachesAt(a).get(r);
    }
  }, {
    key: "get",
    value: function(r, a) {
      var n = this.getKey(r), i = this.getCache(n, a);
      return i != null && this.updateKeyMappingFor(r), i;
    }
  }, {
    key: "getForCachedKey",
    value: function(r, a) {
      var n = this.keyForId.get(r.id()), i = this.getCache(n, a);
      return i;
    }
  }, {
    key: "hasCache",
    value: function(r, a) {
      return this.getCachesAt(a).has(r);
    }
  }, {
    key: "has",
    value: function(r, a) {
      var n = this.getKey(r);
      return this.hasCache(n, a);
    }
  }, {
    key: "setCache",
    value: function(r, a, n) {
      n.key = r, this.getCachesAt(a).set(r, n);
    }
  }, {
    key: "set",
    value: function(r, a, n) {
      var i = this.getKey(r);
      this.setCache(i, a, n), this.updateKeyMappingFor(r);
    }
  }, {
    key: "deleteCache",
    value: function(r, a) {
      this.getCachesAt(a).delete(r);
    }
  }, {
    key: "delete",
    value: function(r, a) {
      var n = this.getKey(r);
      this.deleteCache(n, a);
    }
  }, {
    key: "invalidateKey",
    value: function(r) {
      var a = this;
      this.lvls.forEach(function(n) {
        return a.deleteCache(r, n);
      });
    }
    // returns true if no other eles reference the invalidated cache (n.b. other eles may need the cache with the same key)
  }, {
    key: "invalidate",
    value: function(r) {
      var a = r.id(), n = this.keyForId.get(a);
      this.deleteKeyMappingFor(r);
      var i = this.doesEleInvalidateKey(r);
      return i && this.invalidateKey(n), i || this.getNumberOfIdsForKey(n) === 0;
    }
  }]), t;
}(), Ps = 25, Pa = 50, _a = -4, Xn = 3, zy = 7.99, $y = 8, Vy = 1024, _y = 1024, Uy = 1024, Yy = 0.2, Hy = 0.8, Xy = 10, qy = 0.15, Wy = 0.1, Ky = 0.9, Zy = 0.9, Qy = 100, Jy = 1, wr = {
  dequeue: "dequeue",
  downscale: "downscale",
  highQuality: "highQuality"
}, jy = Ze({
  getKey: null,
  doesEleInvalidateKey: Ha,
  drawElement: null,
  getBoundingBox: null,
  getRotationPoint: null,
  getRotationOffset: null,
  isVisible: bo,
  allowEdgeTxrCaching: !0,
  allowParentTxrCaching: !0
}), Kr = function(e, r) {
  var a = this;
  a.renderer = e, a.onDequeues = [];
  var n = jy(r);
  ce(a, n), a.lookup = new Gy(n.getKey, n.doesEleInvalidateKey), a.setupDequeueing();
}, Ue = Kr.prototype;
Ue.reasons = wr;
Ue.getTextureQueue = function(t) {
  var e = this;
  return e.eleImgCaches = e.eleImgCaches || {}, e.eleImgCaches[t] = e.eleImgCaches[t] || [];
};
Ue.getRetiredTextureQueue = function(t) {
  var e = this, r = e.eleImgCaches.retired = e.eleImgCaches.retired || {}, a = r[t] = r[t] || [];
  return a;
};
Ue.getElementQueue = function() {
  var t = this, e = t.eleCacheQueue = t.eleCacheQueue || new ca(function(r, a) {
    return a.reqs - r.reqs;
  });
  return e;
};
Ue.getElementKeyToQueue = function() {
  var t = this, e = t.eleKeyToCacheQueue = t.eleKeyToCacheQueue || {};
  return e;
};
Ue.getElement = function(t, e, r, a, n) {
  var i = this, s = this.renderer, o = s.cy.zoom(), u = this.lookup;
  if (!e || e.w === 0 || e.h === 0 || isNaN(e.w) || isNaN(e.h) || !t.visible() || t.removed() || !i.allowEdgeTxrCaching && t.isEdge() || !i.allowParentTxrCaching && t.isParent())
    return null;
  if (a == null && (a = Math.ceil(fi(o * r))), a < _a)
    a = _a;
  else if (o >= zy || a > Xn)
    return null;
  var l = Math.pow(2, a), f = e.h * l, h = e.w * l, c = s.eleTextBiggerThanMin(t, l);
  if (!this.isVisible(t, c))
    return null;
  var v = u.get(t, a);
  if (v && v.invalidated && (v.invalidated = !1, v.texture.invalidatedWidth -= v.width), v)
    return v;
  var d;
  if (f <= Ps ? d = Ps : f <= Pa ? d = Pa : d = Math.ceil(f / Pa) * Pa, f > Uy || h > _y)
    return null;
  var g = i.getTextureQueue(d), y = g[g.length - 2], p = function() {
    return i.recycleTexture(d, h) || i.addTexture(d, h);
  };
  y || (y = g[g.length - 1]), y || (y = p()), y.width - y.usedWidth < h && (y = p());
  for (var E = function(I) {
    return I && I.scaledLabelShown === c;
  }, m = n && n === wr.dequeue, T = n && n === wr.highQuality, C = n && n === wr.downscale, S, b = a + 1; b <= Xn; b++) {
    var x = u.get(t, b);
    if (x) {
      S = x;
      break;
    }
  }
  var w = S && S.level === a + 1 ? S : null, D = function() {
    y.context.drawImage(w.texture.canvas, w.x, 0, w.width, w.height, y.usedWidth, 0, h, f);
  };
  if (y.context.setTransform(1, 0, 0, 1, 0, 0), y.context.clearRect(y.usedWidth, 0, h, d), E(w))
    D();
  else if (E(S))
    if (T) {
      for (var A = S.level; A > a; A--)
        w = i.getElement(t, e, r, A, wr.downscale);
      D();
    } else
      return i.queueElement(t, S.level - 1), S;
  else {
    var L;
    if (!m && !T && !C)
      for (var M = a - 1; M >= _a; M--) {
        var O = u.get(t, M);
        if (O) {
          L = O;
          break;
        }
      }
    if (E(L))
      return i.queueElement(t, a), L;
    y.context.translate(y.usedWidth, 0), y.context.scale(l, l), this.drawElement(y.context, t, e, c, !1), y.context.scale(1 / l, 1 / l), y.context.translate(-y.usedWidth, 0);
  }
  return v = {
    x: y.usedWidth,
    texture: y,
    level: a,
    scale: l,
    width: h,
    height: f,
    scaledLabelShown: c
  }, y.usedWidth += Math.ceil(h + $y), y.eleCaches.push(v), u.set(t, a, v), i.checkTextureFullness(y), v;
};
Ue.invalidateElements = function(t) {
  for (var e = 0; e < t.length; e++)
    this.invalidateElement(t[e]);
};
Ue.invalidateElement = function(t) {
  var e = this, r = e.lookup, a = [], n = r.isInvalid(t);
  if (n) {
    for (var i = _a; i <= Xn; i++) {
      var s = r.getForCachedKey(t, i);
      s && a.push(s);
    }
    var o = r.invalidate(t);
    if (o)
      for (var u = 0; u < a.length; u++) {
        var l = a[u], f = l.texture;
        f.invalidatedWidth += l.width, l.invalidated = !0, e.checkTextureUtility(f);
      }
    e.removeFromQueue(t);
  }
};
Ue.checkTextureUtility = function(t) {
  t.invalidatedWidth >= Yy * t.width && this.retireTexture(t);
};
Ue.checkTextureFullness = function(t) {
  var e = this, r = e.getTextureQueue(t.height);
  t.usedWidth / t.width > Hy && t.fullnessChecks >= Xy ? Ht(r, t) : t.fullnessChecks++;
};
Ue.retireTexture = function(t) {
  var e = this, r = t.height, a = e.getTextureQueue(r), n = this.lookup;
  Ht(a, t), t.retired = !0;
  for (var i = t.eleCaches, s = 0; s < i.length; s++) {
    var o = i[s];
    n.deleteCache(o.key, o.level);
  }
  li(i);
  var u = e.getRetiredTextureQueue(r);
  u.push(t);
};
Ue.addTexture = function(t, e) {
  var r = this, a = r.getTextureQueue(t), n = {};
  return a.push(n), n.eleCaches = [], n.height = t, n.width = Math.max(Vy, e), n.usedWidth = 0, n.invalidatedWidth = 0, n.fullnessChecks = 0, n.canvas = r.renderer.makeOffscreenCanvas(n.width, n.height), n.context = n.canvas.getContext("2d"), n;
};
Ue.recycleTexture = function(t, e) {
  for (var r = this, a = r.getTextureQueue(t), n = r.getRetiredTextureQueue(t), i = 0; i < n.length; i++) {
    var s = n[i];
    if (s.width >= e)
      return s.retired = !1, s.usedWidth = 0, s.invalidatedWidth = 0, s.fullnessChecks = 0, li(s.eleCaches), s.context.setTransform(1, 0, 0, 1, 0, 0), s.context.clearRect(0, 0, s.width, s.height), Ht(n, s), a.push(s), s;
  }
};
Ue.queueElement = function(t, e) {
  var r = this, a = r.getElementQueue(), n = r.getElementKeyToQueue(), i = this.getKey(t), s = n[i];
  if (s)
    s.level = Math.max(s.level, e), s.eles.merge(t), s.reqs++, a.updateItem(s);
  else {
    var o = {
      eles: t.spawn().merge(t),
      level: e,
      reqs: 1,
      key: i
    };
    a.push(o), n[i] = o;
  }
};
Ue.dequeue = function(t) {
  for (var e = this, r = e.getElementQueue(), a = e.getElementKeyToQueue(), n = [], i = e.lookup, s = 0; s < Jy && r.size() > 0; s++) {
    var o = r.pop(), u = o.key, l = o.eles[0], f = i.hasCache(l, o.level);
    if (a[u] = null, f)
      continue;
    n.push(o);
    var h = e.getBoundingBox(l);
    e.getElement(l, h, t, o.level, wr.dequeue);
  }
  return n;
};
Ue.removeFromQueue = function(t) {
  var e = this, r = e.getElementQueue(), a = e.getElementKeyToQueue(), n = this.getKey(t), i = a[n];
  i != null && (i.eles.length === 1 ? (i.reqs = oi, r.updateItem(i), r.pop(), a[n] = null) : i.eles.unmerge(t));
};
Ue.onDequeue = function(t) {
  this.onDequeues.push(t);
};
Ue.offDequeue = function(t) {
  Ht(this.onDequeues, t);
};
Ue.setupDequeueing = bu.setupDequeueing({
  deqRedrawThreshold: Qy,
  deqCost: qy,
  deqAvgCost: Wy,
  deqNoDrawCost: Ky,
  deqFastCost: Zy,
  deq: function(e, r, a) {
    return e.dequeue(r, a);
  },
  onDeqd: function(e, r) {
    for (var a = 0; a < e.onDequeues.length; a++) {
      var n = e.onDequeues[a];
      n(r);
    }
  },
  shouldRedraw: function(e, r, a, n) {
    for (var i = 0; i < r.length; i++)
      for (var s = r[i].eles, o = 0; o < s.length; o++) {
        var u = s[o].boundingBox();
        if (hi(u, n))
          return !0;
      }
    return !1;
  },
  priority: function(e) {
    return e.renderer.beforeRenderPriorities.eleTxrDeq;
  }
});
var em = 1, Jr = -4, Qa = 2, tm = 3.99, rm = 50, am = 50, nm = 0.15, im = 0.1, sm = 0.9, om = 0.9, um = 1, Bs = 250, lm = 4e3 * 4e3, fm = !0, Eu = function(e) {
  var r = this, a = r.renderer = e, n = a.cy;
  r.layersByLevel = {}, r.firstGet = !0, r.lastInvalidationTime = Mt() - 2 * Bs, r.skipping = !1, r.eleTxrDeqs = n.collection(), r.scheduleElementRefinement = tn(function() {
    r.refineElementTextures(r.eleTxrDeqs), r.eleTxrDeqs.unmerge(r.eleTxrDeqs);
  }, am), a.beforeRender(function(s, o) {
    o - r.lastInvalidationTime <= Bs ? r.skipping = !0 : r.skipping = !1;
  }, a.beforeRenderPriorities.lyrTxrSkip);
  var i = function(o, u) {
    return u.reqs - o.reqs;
  };
  r.layersQueue = new ca(i), r.setupDequeueing();
}, Qe = Eu.prototype, Fs = 0, hm = Math.pow(2, 53) - 1;
Qe.makeLayer = function(t, e) {
  var r = Math.pow(2, e), a = Math.ceil(t.w * r), n = Math.ceil(t.h * r), i = this.renderer.makeOffscreenCanvas(a, n), s = {
    id: Fs = ++Fs % hm,
    bb: t,
    level: e,
    width: a,
    height: n,
    canvas: i,
    context: i.getContext("2d"),
    eles: [],
    elesQueue: [],
    reqs: 0
  }, o = s.context, u = -s.bb.x1, l = -s.bb.y1;
  return o.scale(r, r), o.translate(u, l), s;
};
Qe.getLayers = function(t, e, r) {
  var a = this, n = a.renderer, i = n.cy, s = i.zoom(), o = a.firstGet;
  if (a.firstGet = !1, r == null) {
    if (r = Math.ceil(fi(s * e)), r < Jr)
      r = Jr;
    else if (s >= tm || r > Qa)
      return null;
  }
  a.validateLayersElesOrdering(r, t);
  var u = a.layersByLevel, l = Math.pow(2, r), f = u[r] = u[r] || [], h, c = a.levelIsComplete(r, t), v, d = function() {
    var D = function(P) {
      if (a.validateLayersElesOrdering(P, t), a.levelIsComplete(P, t))
        return v = u[P], !0;
    }, A = function(P) {
      if (!v)
        for (var I = r + P; Jr <= I && I <= Qa && !D(I); I += P)
          ;
    };
    A(1), A(-1);
    for (var L = f.length - 1; L >= 0; L--) {
      var M = f[L];
      M.invalid && Ht(f, M);
    }
  };
  if (!c)
    d();
  else
    return f;
  var g = function() {
    if (!h) {
      h = lt();
      for (var D = 0; D < t.length; D++)
        tg(h, t[D].boundingBox());
    }
    return h;
  }, y = function(D) {
    D = D || {};
    var A = D.after;
    g();
    var L = h.w * l * (h.h * l);
    if (L > lm)
      return null;
    var M = a.makeLayer(h, r);
    if (A != null) {
      var O = f.indexOf(A) + 1;
      f.splice(O, 0, M);
    } else
      (D.insert === void 0 || D.insert) && f.unshift(M);
    return M;
  };
  if (a.skipping && !o)
    return null;
  for (var p = null, E = t.length / em, m = !o, T = 0; T < t.length; T++) {
    var C = t[T], S = C._private.rscratch, b = S.imgLayerCaches = S.imgLayerCaches || {}, x = b[r];
    if (x) {
      p = x;
      continue;
    }
    if ((!p || p.eles.length >= E || !Do(p.bb, C.boundingBox())) && (p = y({
      insert: !0,
      after: p
    }), !p))
      return null;
    v || m ? a.queueLayer(p, C) : a.drawEleInLayer(p, C, r, e), p.eles.push(C), b[r] = p;
  }
  return v || (m ? null : f);
};
Qe.getEleLevelForLayerLevel = function(t, e) {
  return t;
};
Qe.drawEleInLayer = function(t, e, r, a) {
  var n = this, i = this.renderer, s = t.context, o = e.boundingBox();
  o.w === 0 || o.h === 0 || !e.visible() || (r = n.getEleLevelForLayerLevel(r, a), i.setImgSmoothing(s, !1), i.drawCachedElement(s, e, null, null, r, fm), i.setImgSmoothing(s, !0));
};
Qe.levelIsComplete = function(t, e) {
  var r = this, a = r.layersByLevel[t];
  if (!a || a.length === 0)
    return !1;
  for (var n = 0, i = 0; i < a.length; i++) {
    var s = a[i];
    if (s.reqs > 0 || s.invalid)
      return !1;
    n += s.eles.length;
  }
  return n === e.length;
};
Qe.validateLayersElesOrdering = function(t, e) {
  var r = this.layersByLevel[t];
  if (r)
    for (var a = 0; a < r.length; a++) {
      for (var n = r[a], i = -1, s = 0; s < e.length; s++)
        if (n.eles[0] === e[s]) {
          i = s;
          break;
        }
      if (i < 0) {
        this.invalidateLayer(n);
        continue;
      }
      for (var o = i, s = 0; s < n.eles.length; s++)
        if (n.eles[s] !== e[o + s]) {
          this.invalidateLayer(n);
          break;
        }
    }
};
Qe.updateElementsInLayers = function(t, e) {
  for (var r = this, a = ga(t[0]), n = 0; n < t.length; n++)
    for (var i = a ? null : t[n], s = a ? t[n] : t[n].ele, o = s._private.rscratch, u = o.imgLayerCaches = o.imgLayerCaches || {}, l = Jr; l <= Qa; l++) {
      var f = u[l];
      f && (i && r.getEleLevelForLayerLevel(f.level) !== i.level || e(f, s, i));
    }
};
Qe.haveLayers = function() {
  for (var t = this, e = !1, r = Jr; r <= Qa; r++) {
    var a = t.layersByLevel[r];
    if (a && a.length > 0) {
      e = !0;
      break;
    }
  }
  return e;
};
Qe.invalidateElements = function(t) {
  var e = this;
  t.length !== 0 && (e.lastInvalidationTime = Mt(), !(t.length === 0 || !e.haveLayers()) && e.updateElementsInLayers(t, function(a, n, i) {
    e.invalidateLayer(a);
  }));
};
Qe.invalidateLayer = function(t) {
  if (this.lastInvalidationTime = Mt(), !t.invalid) {
    var e = t.level, r = t.eles, a = this.layersByLevel[e];
    Ht(a, t), t.elesQueue = [], t.invalid = !0, t.replacement && (t.replacement.invalid = !0);
    for (var n = 0; n < r.length; n++) {
      var i = r[n]._private.rscratch.imgLayerCaches;
      i && (i[e] = null);
    }
  }
};
Qe.refineElementTextures = function(t) {
  var e = this;
  e.updateElementsInLayers(t, function(a, n, i) {
    var s = a.replacement;
    if (s || (s = a.replacement = e.makeLayer(a.bb, a.level), s.replaces = a, s.eles = a.eles), !s.reqs)
      for (var o = 0; o < s.eles.length; o++)
        e.queueLayer(s, s.eles[o]);
  });
};
Qe.enqueueElementRefinement = function(t) {
  this.eleTxrDeqs.merge(t), this.scheduleElementRefinement();
};
Qe.queueLayer = function(t, e) {
  var r = this, a = r.layersQueue, n = t.elesQueue, i = n.hasId = n.hasId || {};
  if (!t.replacement) {
    if (e) {
      if (i[e.id()])
        return;
      n.push(e), i[e.id()] = !0;
    }
    t.reqs ? (t.reqs++, a.updateItem(t)) : (t.reqs = 1, a.push(t));
  }
};
Qe.dequeue = function(t) {
  for (var e = this, r = e.layersQueue, a = [], n = 0; n < um && r.size() !== 0; ) {
    var i = r.peek();
    if (i.replacement) {
      r.pop();
      continue;
    }
    if (i.replaces && i !== i.replaces.replacement) {
      r.pop();
      continue;
    }
    if (i.invalid) {
      r.pop();
      continue;
    }
    var s = i.elesQueue.shift();
    s && (e.drawEleInLayer(i, s, i.level, t), n++), a.length === 0 && a.push(!0), i.elesQueue.length === 0 && (r.pop(), i.reqs = 0, i.replaces && e.applyLayerReplacement(i), e.requestRedraw());
  }
  return a;
};
Qe.applyLayerReplacement = function(t) {
  var e = this, r = e.layersByLevel[t.level], a = t.replaces, n = r.indexOf(a);
  if (!(n < 0 || a.invalid)) {
    r[n] = t;
    for (var i = 0; i < t.eles.length; i++) {
      var s = t.eles[i]._private, o = s.imgLayerCaches = s.imgLayerCaches || {};
      o && (o[t.level] = t);
    }
    e.requestRedraw();
  }
};
Qe.requestRedraw = tn(function() {
  var t = this.renderer;
  t.redrawHint("eles", !0), t.redrawHint("drag", !0), t.redraw();
}, 100);
Qe.setupDequeueing = bu.setupDequeueing({
  deqRedrawThreshold: rm,
  deqCost: nm,
  deqAvgCost: im,
  deqNoDrawCost: sm,
  deqFastCost: om,
  deq: function(e, r) {
    return e.dequeue(r);
  },
  onDeqd: ui,
  shouldRedraw: bo,
  priority: function(e) {
    return e.renderer.beforeRenderPriorities.lyrTxrDeq;
  }
});
var wu = {}, Gs;
function vm(t, e) {
  for (var r = 0; r < e.length; r++) {
    var a = e[r];
    t.lineTo(a.x, a.y);
  }
}
function cm(t, e, r) {
  for (var a, n = 0; n < e.length; n++) {
    var i = e[n];
    n === 0 && (a = i), t.lineTo(i.x, i.y);
  }
  t.quadraticCurveTo(r.x, r.y, a.x, a.y);
}
function zs(t, e, r) {
  t.beginPath && t.beginPath();
  for (var a = e, n = 0; n < a.length; n++) {
    var i = a[n];
    t.lineTo(i.x, i.y);
  }
  var s = r, o = r[0];
  t.moveTo(o.x, o.y);
  for (var n = 1; n < s.length; n++) {
    var i = s[n];
    t.lineTo(i.x, i.y);
  }
  t.closePath && t.closePath();
}
function dm(t, e, r, a, n) {
  t.beginPath && t.beginPath(), t.arc(r, a, n, 0, Math.PI * 2, !1);
  var i = e, s = i[0];
  t.moveTo(s.x, s.y);
  for (var o = 0; o < i.length; o++) {
    var u = i[o];
    t.lineTo(u.x, u.y);
  }
  t.closePath && t.closePath();
}
function gm(t, e, r, a) {
  t.arc(e, r, a, 0, Math.PI * 2, !1);
}
wu.arrowShapeImpl = function(t) {
  return (Gs || (Gs = {
    polygon: vm,
    "triangle-backcurve": cm,
    "triangle-tee": zs,
    "circle-triangle": dm,
    "triangle-cross": zs,
    circle: gm
  }))[t];
};
var At = {};
At.drawElement = function(t, e, r, a, n, i) {
  var s = this;
  e.isNode() ? s.drawNode(t, e, r, a, n, i) : s.drawEdge(t, e, r, a, n, i);
};
At.drawElementOverlay = function(t, e) {
  var r = this;
  e.isNode() ? r.drawNodeOverlay(t, e) : r.drawEdgeOverlay(t, e);
};
At.drawElementUnderlay = function(t, e) {
  var r = this;
  e.isNode() ? r.drawNodeUnderlay(t, e) : r.drawEdgeUnderlay(t, e);
};
At.drawCachedElementPortion = function(t, e, r, a, n, i, s, o) {
  var u = this, l = r.getBoundingBox(e);
  if (!(l.w === 0 || l.h === 0)) {
    var f = r.getElement(e, l, a, n, i);
    if (f != null) {
      var h = o(u, e);
      if (h === 0)
        return;
      var c = s(u, e), v = l.x1, d = l.y1, g = l.w, y = l.h, p, E, m, T, C;
      if (c !== 0) {
        var S = r.getRotationPoint(e);
        m = S.x, T = S.y, t.translate(m, T), t.rotate(c), C = u.getImgSmoothing(t), C || u.setImgSmoothing(t, !0);
        var b = r.getRotationOffset(e);
        p = b.x, E = b.y;
      } else
        p = v, E = d;
      var x;
      h !== 1 && (x = t.globalAlpha, t.globalAlpha = x * h), t.drawImage(f.texture.canvas, f.x, 0, f.width, f.height, p, E, g, y), h !== 1 && (t.globalAlpha = x), c !== 0 && (t.rotate(-c), t.translate(-m, -T), C || u.setImgSmoothing(t, !1));
    } else
      r.drawElement(t, e);
  }
};
var pm = function() {
  return 0;
}, ym = function(e, r) {
  return e.getTextAngle(r, null);
}, mm = function(e, r) {
  return e.getTextAngle(r, "source");
}, bm = function(e, r) {
  return e.getTextAngle(r, "target");
}, Em = function(e, r) {
  return r.effectiveOpacity();
}, kn = function(e, r) {
  return r.pstyle("text-opacity").pfValue * r.effectiveOpacity();
};
At.drawCachedElement = function(t, e, r, a, n, i) {
  var s = this, o = s.data, u = o.eleTxrCache, l = o.lblTxrCache, f = o.slbTxrCache, h = o.tlbTxrCache, c = e.boundingBox(), v = i === !0 ? u.reasons.highQuality : null;
  if (!(c.w === 0 || c.h === 0 || !e.visible()) && (!a || hi(c, a))) {
    var d = e.isEdge(), g = e.element()._private.rscratch.badLine;
    s.drawElementUnderlay(t, e), s.drawCachedElementPortion(t, e, u, r, n, v, pm, Em), (!d || !g) && s.drawCachedElementPortion(t, e, l, r, n, v, ym, kn), d && !g && (s.drawCachedElementPortion(t, e, f, r, n, v, mm, kn), s.drawCachedElementPortion(t, e, h, r, n, v, bm, kn)), s.drawElementOverlay(t, e);
  }
};
At.drawElements = function(t, e) {
  for (var r = this, a = 0; a < e.length; a++) {
    var n = e[a];
    r.drawElement(t, n);
  }
};
At.drawCachedElements = function(t, e, r, a) {
  for (var n = this, i = 0; i < e.length; i++) {
    var s = e[i];
    n.drawCachedElement(t, s, r, a);
  }
};
At.drawCachedNodes = function(t, e, r, a) {
  for (var n = this, i = 0; i < e.length; i++) {
    var s = e[i];
    s.isNode() && n.drawCachedElement(t, s, r, a);
  }
};
At.drawLayeredElements = function(t, e, r, a) {
  var n = this, i = n.data.lyrTxrCache.getLayers(e, r);
  if (i)
    for (var s = 0; s < i.length; s++) {
      var o = i[s], u = o.bb;
      u.w === 0 || u.h === 0 || t.drawImage(o.canvas, u.x1, u.y1, u.w, u.h);
    }
  else
    n.drawCachedElements(t, e, r, a);
};
var Pt = {};
Pt.drawEdge = function(t, e, r) {
  var a = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : !0, n = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : !0, i = arguments.length > 5 && arguments[5] !== void 0 ? arguments[5] : !0, s = this, o = e._private.rscratch;
  if (!(i && !e.visible()) && !(o.badLine || o.allpts == null || isNaN(o.allpts[0]))) {
    var u;
    r && (u = r, t.translate(-u.x1, -u.y1));
    var l = i ? e.pstyle("opacity").value : 1, f = i ? e.pstyle("line-opacity").value : 1, h = e.pstyle("curve-style").value, c = e.pstyle("line-style").value, v = e.pstyle("width").pfValue, d = e.pstyle("line-cap").value, g = l * f, y = l * f, p = function() {
      var L = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : g;
      h === "straight-triangle" ? (s.eleStrokeStyle(t, e, L), s.drawEdgeTrianglePath(e, t, o.allpts)) : (t.lineWidth = v, t.lineCap = d, s.eleStrokeStyle(t, e, L), s.drawEdgePath(e, t, o.allpts, c), t.lineCap = "butt");
    }, E = function() {
      n && s.drawEdgeOverlay(t, e);
    }, m = function() {
      n && s.drawEdgeUnderlay(t, e);
    }, T = function() {
      var L = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : y;
      s.drawArrowheads(t, e, L);
    }, C = function() {
      s.drawElementText(t, e, null, a);
    };
    t.lineJoin = "round";
    var S = e.pstyle("ghost").value === "yes";
    if (S) {
      var b = e.pstyle("ghost-offset-x").pfValue, x = e.pstyle("ghost-offset-y").pfValue, w = e.pstyle("ghost-opacity").value, D = g * w;
      t.translate(b, x), p(D), T(D), t.translate(-b, -x);
    }
    m(), p(), T(), E(), C(), r && t.translate(u.x1, u.y1);
  }
};
var xu = function(e) {
  if (!["overlay", "underlay"].includes(e))
    throw new Error("Invalid state");
  return function(r, a) {
    if (a.visible()) {
      var n = a.pstyle("".concat(e, "-opacity")).value;
      if (n !== 0) {
        var i = this, s = i.usePaths(), o = a._private.rscratch, u = a.pstyle("".concat(e, "-padding")).pfValue, l = 2 * u, f = a.pstyle("".concat(e, "-color")).value;
        r.lineWidth = l, o.edgeType === "self" && !s ? r.lineCap = "butt" : r.lineCap = "round", i.colorStrokeStyle(r, f[0], f[1], f[2], n), i.drawEdgePath(a, r, o.allpts, "solid");
      }
    }
  };
};
Pt.drawEdgeOverlay = xu("overlay");
Pt.drawEdgeUnderlay = xu("underlay");
Pt.drawEdgePath = function(t, e, r, a) {
  var n = t._private.rscratch, i = e, s, o = !1, u = this.usePaths(), l = t.pstyle("line-dash-pattern").pfValue, f = t.pstyle("line-dash-offset").pfValue;
  if (u) {
    var h = r.join("$"), c = n.pathCacheKey && n.pathCacheKey === h;
    c ? (s = e = n.pathCache, o = !0) : (s = e = new Path2D(), n.pathCacheKey = h, n.pathCache = s);
  }
  if (i.setLineDash)
    switch (a) {
      case "dotted":
        i.setLineDash([1, 1]);
        break;
      case "dashed":
        i.setLineDash(l), i.lineDashOffset = f;
        break;
      case "solid":
        i.setLineDash([]);
        break;
    }
  if (!o && !n.badLine)
    switch (e.beginPath && e.beginPath(), e.moveTo(r[0], r[1]), n.edgeType) {
      case "bezier":
      case "self":
      case "compound":
      case "multibezier":
        for (var v = 2; v + 3 < r.length; v += 4)
          e.quadraticCurveTo(r[v], r[v + 1], r[v + 2], r[v + 3]);
        break;
      case "straight":
      case "segments":
      case "haystack":
        for (var d = 2; d + 1 < r.length; d += 2)
          e.lineTo(r[d], r[d + 1]);
        break;
    }
  e = i, u ? e.stroke(s) : e.stroke(), e.setLineDash && e.setLineDash([]);
};
Pt.drawEdgeTrianglePath = function(t, e, r) {
  e.fillStyle = e.strokeStyle;
  for (var a = t.pstyle("width").pfValue, n = 0; n + 1 < r.length; n += 2) {
    var i = [r[n + 2] - r[n], r[n + 3] - r[n + 1]], s = Math.sqrt(i[0] * i[0] + i[1] * i[1]), o = [i[1] / s, -i[0] / s], u = [o[0] * a / 2, o[1] * a / 2];
    e.beginPath(), e.moveTo(r[n] - u[0], r[n + 1] - u[1]), e.lineTo(r[n] + u[0], r[n + 1] + u[1]), e.lineTo(r[n + 2], r[n + 3]), e.closePath(), e.fill();
  }
};
Pt.drawArrowheads = function(t, e, r) {
  var a = e._private.rscratch, n = a.edgeType === "haystack";
  n || this.drawArrowhead(t, e, "source", a.arrowStartX, a.arrowStartY, a.srcArrowAngle, r), this.drawArrowhead(t, e, "mid-target", a.midX, a.midY, a.midtgtArrowAngle, r), this.drawArrowhead(t, e, "mid-source", a.midX, a.midY, a.midsrcArrowAngle, r), n || this.drawArrowhead(t, e, "target", a.arrowEndX, a.arrowEndY, a.tgtArrowAngle, r);
};
Pt.drawArrowhead = function(t, e, r, a, n, i, s) {
  if (!(isNaN(a) || a == null || isNaN(n) || n == null || isNaN(i) || i == null)) {
    var o = this, u = e.pstyle(r + "-arrow-shape").value;
    if (u !== "none") {
      var l = e.pstyle(r + "-arrow-fill").value === "hollow" ? "both" : "filled", f = e.pstyle(r + "-arrow-fill").value, h = e.pstyle("width").pfValue, c = e.pstyle("opacity").value;
      s === void 0 && (s = c);
      var v = t.globalCompositeOperation;
      (s !== 1 || f === "hollow") && (t.globalCompositeOperation = "destination-out", o.colorFillStyle(t, 255, 255, 255, 1), o.colorStrokeStyle(t, 255, 255, 255, 1), o.drawArrowShape(e, t, l, h, u, a, n, i), t.globalCompositeOperation = v);
      var d = e.pstyle(r + "-arrow-color").value;
      o.colorFillStyle(t, d[0], d[1], d[2], s), o.colorStrokeStyle(t, d[0], d[1], d[2], s), o.drawArrowShape(e, t, f, h, u, a, n, i);
    }
  }
};
Pt.drawArrowShape = function(t, e, r, a, n, i, s, o) {
  var u = this, l = this.usePaths() && n !== "triangle-cross", f = !1, h, c = e, v = {
    x: i,
    y: s
  }, d = t.pstyle("arrow-scale").value, g = this.getArrowWidth(a, d), y = u.arrowShapes[n];
  if (l) {
    var p = u.arrowPathCache = u.arrowPathCache || [], E = ar(n), m = p[E];
    m != null ? (h = e = m, f = !0) : (h = e = new Path2D(), p[E] = h);
  }
  f || (e.beginPath && e.beginPath(), l ? y.draw(e, 1, 0, {
    x: 0,
    y: 0
  }, 1) : y.draw(e, g, o, v, a), e.closePath && e.closePath()), e = c, l && (e.translate(i, s), e.rotate(o), e.scale(g, g)), (r === "filled" || r === "both") && (l ? e.fill(h) : e.fill()), (r === "hollow" || r === "both") && (e.lineWidth = (y.matchEdgeWidth ? a : 1) / (l ? g : 1), e.lineJoin = "miter", l ? e.stroke(h) : e.stroke()), l && (e.scale(1 / g, 1 / g), e.rotate(-o), e.translate(-i, -s));
};
var xi = {};
xi.safeDrawImage = function(t, e, r, a, n, i, s, o, u, l) {
  if (!(n <= 0 || i <= 0 || u <= 0 || l <= 0))
    try {
      t.drawImage(e, r, a, n, i, s, o, u, l);
    } catch (f) {
      Ae(f);
    }
};
xi.drawInscribedImage = function(t, e, r, a, n) {
  var i = this, s = r.position(), o = s.x, u = s.y, l = r.cy().style(), f = l.getIndexedStyle.bind(l), h = f(r, "background-fit", "value", a), c = f(r, "background-repeat", "value", a), v = r.width(), d = r.height(), g = r.padding() * 2, y = v + (f(r, "background-width-relative-to", "value", a) === "inner" ? 0 : g), p = d + (f(r, "background-height-relative-to", "value", a) === "inner" ? 0 : g), E = r._private.rscratch, m = f(r, "background-clip", "value", a), T = m === "node", C = f(r, "background-image-opacity", "value", a) * n, S = f(r, "background-image-smoothing", "value", a), b = e.width || e.cachedW, x = e.height || e.cachedH;
  (b == null || x == null) && (document.body.appendChild(e), b = e.cachedW = e.width || e.offsetWidth, x = e.cachedH = e.height || e.offsetHeight, document.body.removeChild(e));
  var w = b, D = x;
  if (f(r, "background-width", "value", a) !== "auto" && (f(r, "background-width", "units", a) === "%" ? w = f(r, "background-width", "pfValue", a) * y : w = f(r, "background-width", "pfValue", a)), f(r, "background-height", "value", a) !== "auto" && (f(r, "background-height", "units", a) === "%" ? D = f(r, "background-height", "pfValue", a) * p : D = f(r, "background-height", "pfValue", a)), !(w === 0 || D === 0)) {
    if (h === "contain") {
      var A = Math.min(y / w, p / D);
      w *= A, D *= A;
    } else if (h === "cover") {
      var A = Math.max(y / w, p / D);
      w *= A, D *= A;
    }
    var L = o - y / 2, M = f(r, "background-position-x", "units", a), O = f(r, "background-position-x", "pfValue", a);
    M === "%" ? L += (y - w) * O : L += O;
    var P = f(r, "background-offset-x", "units", a), I = f(r, "background-offset-x", "pfValue", a);
    P === "%" ? L += (y - w) * I : L += I;
    var k = u - p / 2, R = f(r, "background-position-y", "units", a), B = f(r, "background-position-y", "pfValue", a);
    R === "%" ? k += (p - D) * B : k += B;
    var z = f(r, "background-offset-y", "units", a), F = f(r, "background-offset-y", "pfValue", a);
    z === "%" ? k += (p - D) * F : k += F, E.pathCache && (L -= o, k -= u, o = 0, u = 0);
    var $ = t.globalAlpha;
    t.globalAlpha = C;
    var U = i.getImgSmoothing(t), V = !1;
    if (S === "no" && U ? (i.setImgSmoothing(t, !1), V = !0) : S === "yes" && !U && (i.setImgSmoothing(t, !0), V = !0), c === "no-repeat")
      T && (t.save(), E.pathCache ? t.clip(E.pathCache) : (i.nodeShapes[i.getNodeShape(r)].draw(t, o, u, y, p), t.clip())), i.safeDrawImage(t, e, 0, 0, b, x, L, k, w, D), T && t.restore();
    else {
      var H = t.createPattern(e, c);
      t.fillStyle = H, i.nodeShapes[i.getNodeShape(r)].draw(t, o, u, y, p), t.translate(L, k), t.fill(), t.translate(-L, -k);
    }
    t.globalAlpha = $, V && i.setImgSmoothing(t, U);
  }
};
var hr = {};
hr.eleTextBiggerThanMin = function(t, e) {
  if (!e) {
    var r = t.cy().zoom(), a = this.getPixelRatio(), n = Math.ceil(fi(r * a));
    e = Math.pow(2, n);
  }
  var i = t.pstyle("font-size").pfValue * e, s = t.pstyle("min-zoomed-font-size").pfValue;
  return !(i < s);
};
hr.drawElementText = function(t, e, r, a, n) {
  var i = arguments.length > 5 && arguments[5] !== void 0 ? arguments[5] : !0, s = this;
  if (a == null) {
    if (i && !s.eleTextBiggerThanMin(e))
      return;
  } else if (a === !1)
    return;
  if (e.isNode()) {
    var o = e.pstyle("label");
    if (!o || !o.value)
      return;
    var u = s.getLabelJustification(e);
    t.textAlign = u, t.textBaseline = "bottom";
  } else {
    var l = e.element()._private.rscratch.badLine, f = e.pstyle("label"), h = e.pstyle("source-label"), c = e.pstyle("target-label");
    if (l || (!f || !f.value) && (!h || !h.value) && (!c || !c.value))
      return;
    t.textAlign = "center", t.textBaseline = "bottom";
  }
  var v = !r, d;
  r && (d = r, t.translate(-d.x1, -d.y1)), n == null ? (s.drawText(t, e, null, v, i), e.isEdge() && (s.drawText(t, e, "source", v, i), s.drawText(t, e, "target", v, i))) : s.drawText(t, e, n, v, i), r && t.translate(d.x1, d.y1);
};
hr.getFontCache = function(t) {
  var e;
  this.fontCaches = this.fontCaches || [];
  for (var r = 0; r < this.fontCaches.length; r++)
    if (e = this.fontCaches[r], e.context === t)
      return e;
  return e = {
    context: t
  }, this.fontCaches.push(e), e;
};
hr.setupTextStyle = function(t, e) {
  var r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !0, a = e.pstyle("font-style").strValue, n = e.pstyle("font-size").pfValue + "px", i = e.pstyle("font-family").strValue, s = e.pstyle("font-weight").strValue, o = r ? e.effectiveOpacity() * e.pstyle("text-opacity").value : 1, u = e.pstyle("text-outline-opacity").value * o, l = e.pstyle("color").value, f = e.pstyle("text-outline-color").value;
  t.font = a + " " + s + " " + n + " " + i, t.lineJoin = "round", this.colorFillStyle(t, l[0], l[1], l[2], o), this.colorStrokeStyle(t, f[0], f[1], f[2], u);
};
function wm(t, e, r, a, n) {
  var i = arguments.length > 5 && arguments[5] !== void 0 ? arguments[5] : 5;
  t.beginPath(), t.moveTo(e + i, r), t.lineTo(e + a - i, r), t.quadraticCurveTo(e + a, r, e + a, r + i), t.lineTo(e + a, r + n - i), t.quadraticCurveTo(e + a, r + n, e + a - i, r + n), t.lineTo(e + i, r + n), t.quadraticCurveTo(e, r + n, e, r + n - i), t.lineTo(e, r + i), t.quadraticCurveTo(e, r, e + i, r), t.closePath(), t.fill();
}
hr.getTextAngle = function(t, e) {
  var r, a = t._private, n = a.rscratch, i = e ? e + "-" : "", s = t.pstyle(i + "text-rotation"), o = wt(n, "labelAngle", e);
  return s.strValue === "autorotate" ? r = t.isEdge() ? o : 0 : s.strValue === "none" ? r = 0 : r = s.pfValue, r;
};
hr.drawText = function(t, e, r) {
  var a = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : !0, n = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : !0, i = e._private, s = i.rscratch, o = n ? e.effectiveOpacity() : 1;
  if (!(n && (o === 0 || e.pstyle("text-opacity").value === 0))) {
    r === "main" && (r = null);
    var u = wt(s, "labelX", r), l = wt(s, "labelY", r), f, h, c = this.getLabelText(e, r);
    if (c != null && c !== "" && !isNaN(u) && !isNaN(l)) {
      this.setupTextStyle(t, e, n);
      var v = r ? r + "-" : "", d = wt(s, "labelWidth", r), g = wt(s, "labelHeight", r), y = e.pstyle(v + "text-margin-x").pfValue, p = e.pstyle(v + "text-margin-y").pfValue, E = e.isEdge(), m = e.pstyle("text-halign").value, T = e.pstyle("text-valign").value;
      E && (m = "center", T = "center"), u += y, l += p;
      var C;
      switch (a ? C = this.getTextAngle(e, r) : C = 0, C !== 0 && (f = u, h = l, t.translate(f, h), t.rotate(C), u = 0, l = 0), T) {
        case "top":
          break;
        case "center":
          l += g / 2;
          break;
        case "bottom":
          l += g;
          break;
      }
      var S = e.pstyle("text-background-opacity").value, b = e.pstyle("text-border-opacity").value, x = e.pstyle("text-border-width").pfValue, w = e.pstyle("text-background-padding").pfValue;
      if (S > 0 || x > 0 && b > 0) {
        var D = u - w;
        switch (m) {
          case "left":
            D -= d;
            break;
          case "center":
            D -= d / 2;
            break;
        }
        var A = l - g - w, L = d + 2 * w, M = g + 2 * w;
        if (S > 0) {
          var O = t.fillStyle, P = e.pstyle("text-background-color").value;
          t.fillStyle = "rgba(" + P[0] + "," + P[1] + "," + P[2] + "," + S * o + ")";
          var I = e.pstyle("text-background-shape").strValue;
          I.indexOf("round") === 0 ? wm(t, D, A, L, M, 2) : t.fillRect(D, A, L, M), t.fillStyle = O;
        }
        if (x > 0 && b > 0) {
          var k = t.strokeStyle, R = t.lineWidth, B = e.pstyle("text-border-color").value, z = e.pstyle("text-border-style").value;
          if (t.strokeStyle = "rgba(" + B[0] + "," + B[1] + "," + B[2] + "," + b * o + ")", t.lineWidth = x, t.setLineDash)
            switch (z) {
              case "dotted":
                t.setLineDash([1, 1]);
                break;
              case "dashed":
                t.setLineDash([4, 2]);
                break;
              case "double":
                t.lineWidth = x / 4, t.setLineDash([]);
                break;
              case "solid":
                t.setLineDash([]);
                break;
            }
          if (t.strokeRect(D, A, L, M), z === "double") {
            var F = x / 2;
            t.strokeRect(D + F, A + F, L - F * 2, M - F * 2);
          }
          t.setLineDash && t.setLineDash([]), t.lineWidth = R, t.strokeStyle = k;
        }
      }
      var $ = 2 * e.pstyle("text-outline-width").pfValue;
      if ($ > 0 && (t.lineWidth = $), e.pstyle("text-wrap").value === "wrap") {
        var U = wt(s, "labelWrapCachedLines", r), V = wt(s, "labelLineHeight", r), H = d / 2, Y = this.getLabelJustification(e);
        switch (Y === "auto" || (m === "left" ? Y === "left" ? u += -d : Y === "center" && (u += -H) : m === "center" ? Y === "left" ? u += -H : Y === "right" && (u += H) : m === "right" && (Y === "center" ? u += H : Y === "right" && (u += d))), T) {
          case "top":
            l -= (U.length - 1) * V;
            break;
          case "center":
          case "bottom":
            l -= (U.length - 1) * V;
            break;
        }
        for (var G = 0; G < U.length; G++)
          $ > 0 && t.strokeText(U[G], u, l), t.fillText(U[G], u, l), l += V;
      } else
        $ > 0 && t.strokeText(c, u, l), t.fillText(c, u, l);
      C !== 0 && (t.rotate(-C), t.translate(-f, -h));
    }
  }
};
var Gr = {};
Gr.drawNode = function(t, e, r) {
  var a = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : !0, n = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : !0, i = arguments.length > 5 && arguments[5] !== void 0 ? arguments[5] : !0, s = this, o, u, l = e._private, f = l.rscratch, h = e.position();
  if (!(!ae(h.x) || !ae(h.y)) && !(i && !e.visible())) {
    var c = i ? e.effectiveOpacity() : 1, v = s.usePaths(), d, g = !1, y = e.padding();
    o = e.width() + 2 * y, u = e.height() + 2 * y;
    var p;
    r && (p = r, t.translate(-p.x1, -p.y1));
    for (var E = e.pstyle("background-image"), m = E.value, T = new Array(m.length), C = new Array(m.length), S = 0, b = 0; b < m.length; b++) {
      var x = m[b], w = T[b] = x != null && x !== "none";
      if (w) {
        var D = e.cy().style().getIndexedStyle(e, "background-image-crossorigin", "value", b);
        S++, C[b] = s.getCachedImage(x, D, function() {
          l.backgroundTimestamp = Date.now(), e.emitAndNotify("background");
        });
      }
    }
    var A = e.pstyle("background-blacken").value, L = e.pstyle("border-width").pfValue, M = e.pstyle("background-opacity").value * c, O = e.pstyle("border-color").value, P = e.pstyle("border-style").value, I = e.pstyle("border-opacity").value * c;
    t.lineJoin = "miter";
    var k = function() {
      var ne = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : M;
      s.eleFillStyle(t, e, ne);
    }, R = function() {
      var ne = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : I;
      s.colorStrokeStyle(t, O[0], O[1], O[2], ne);
    }, B = e.pstyle("shape").strValue, z = e.pstyle("shape-polygon-points").pfValue;
    if (v) {
      t.translate(h.x, h.y);
      var F = s.nodePathCache = s.nodePathCache || [], $ = mo(B === "polygon" ? B + "," + z.join(",") : B, "" + u, "" + o), U = F[$];
      U != null ? (d = U, g = !0, f.pathCache = d) : (d = new Path2D(), F[$] = f.pathCache = d);
    }
    var V = function() {
      if (!g) {
        var ne = h;
        v && (ne = {
          x: 0,
          y: 0
        }), s.nodeShapes[s.getNodeShape(e)].draw(d || t, ne.x, ne.y, o, u);
      }
      v ? t.fill(d) : t.fill();
    }, H = function() {
      for (var ne = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : c, ue = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0, Ee = l.backgrounding, ge = 0, ve = 0; ve < C.length; ve++) {
        var J = e.cy().style().getIndexedStyle(e, "background-image-containment", "value", ve);
        if (ue && J === "over" || !ue && J === "inside") {
          ge++;
          continue;
        }
        T[ve] && C[ve].complete && !C[ve].error && (ge++, s.drawInscribedImage(t, C[ve], e, ve, ne));
      }
      l.backgrounding = ge !== S, Ee !== l.backgrounding && e.updateStyle(!1);
    }, Y = function() {
      var ne = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !1, ue = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : c;
      s.hasPie(e) && (s.drawPie(t, e, ue), ne && (v || s.nodeShapes[s.getNodeShape(e)].draw(t, h.x, h.y, o, u)));
    }, G = function() {
      var ne = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : c, ue = (A > 0 ? A : -A) * ne, Ee = A > 0 ? 0 : 255;
      A !== 0 && (s.colorFillStyle(t, Ee, Ee, Ee, ue), v ? t.fill(d) : t.fill());
    }, X = function() {
      if (L > 0) {
        if (t.lineWidth = L, t.lineCap = "butt", t.setLineDash)
          switch (P) {
            case "dotted":
              t.setLineDash([1, 1]);
              break;
            case "dashed":
              t.setLineDash([4, 2]);
              break;
            case "solid":
            case "double":
              t.setLineDash([]);
              break;
          }
        if (v ? t.stroke(d) : t.stroke(), P === "double") {
          t.lineWidth = L / 3;
          var ne = t.globalCompositeOperation;
          t.globalCompositeOperation = "destination-out", v ? t.stroke(d) : t.stroke(), t.globalCompositeOperation = ne;
        }
        t.setLineDash && t.setLineDash([]);
      }
    }, K = function() {
      n && s.drawNodeOverlay(t, e, h, o, u);
    }, Z = function() {
      n && s.drawNodeUnderlay(t, e, h, o, u);
    }, te = function() {
      s.drawElementText(t, e, null, a);
    }, he = e.pstyle("ghost").value === "yes";
    if (he) {
      var de = e.pstyle("ghost-offset-x").pfValue, ee = e.pstyle("ghost-offset-y").pfValue, re = e.pstyle("ghost-opacity").value, fe = re * c;
      t.translate(de, ee), k(re * M), V(), H(fe, !0), R(re * I), X(), Y(A !== 0 || L !== 0), H(fe, !1), G(fe), t.translate(-de, -ee);
    }
    v && t.translate(-h.x, -h.y), Z(), v && t.translate(h.x, h.y), k(), V(), H(c, !0), R(), X(), Y(A !== 0 || L !== 0), H(c, !1), G(), v && t.translate(-h.x, -h.y), te(), K(), r && t.translate(p.x1, p.y1);
  }
};
var Tu = function(e) {
  if (!["overlay", "underlay"].includes(e))
    throw new Error("Invalid state");
  return function(r, a, n, i, s) {
    var o = this;
    if (a.visible()) {
      var u = a.pstyle("".concat(e, "-padding")).pfValue, l = a.pstyle("".concat(e, "-opacity")).value, f = a.pstyle("".concat(e, "-color")).value, h = a.pstyle("".concat(e, "-shape")).value;
      if (l > 0) {
        if (n = n || a.position(), i == null || s == null) {
          var c = a.padding();
          i = a.width() + 2 * c, s = a.height() + 2 * c;
        }
        o.colorFillStyle(r, f[0], f[1], f[2], l), o.nodeShapes[h].draw(r, n.x, n.y, i + u * 2, s + u * 2), r.fill();
      }
    }
  };
};
Gr.drawNodeOverlay = Tu("overlay");
Gr.drawNodeUnderlay = Tu("underlay");
Gr.hasPie = function(t) {
  return t = t[0], t._private.hasPie;
};
Gr.drawPie = function(t, e, r, a) {
  e = e[0], a = a || e.position();
  var n = e.cy().style(), i = e.pstyle("pie-size"), s = a.x, o = a.y, u = e.width(), l = e.height(), f = Math.min(u, l) / 2, h = 0, c = this.usePaths();
  c && (s = 0, o = 0), i.units === "%" ? f = f * i.pfValue : i.pfValue !== void 0 && (f = i.pfValue / 2);
  for (var v = 1; v <= n.pieBackgroundN; v++) {
    var d = e.pstyle("pie-" + v + "-background-size").value, g = e.pstyle("pie-" + v + "-background-color").value, y = e.pstyle("pie-" + v + "-background-opacity").value * r, p = d / 100;
    p + h > 1 && (p = 1 - h);
    var E = 1.5 * Math.PI + 2 * Math.PI * h, m = 2 * Math.PI * p, T = E + m;
    d === 0 || h >= 1 || h + p > 1 || (t.beginPath(), t.moveTo(s, o), t.arc(s, o, f, E, T), t.closePath(), this.colorFillStyle(t, g[0], g[1], g[2], y), t.fill(), h += p);
  }
};
var ht = {}, xm = 100;
ht.getPixelRatio = function() {
  var t = this.data.contexts[0];
  if (this.forcedPixelRatio != null)
    return this.forcedPixelRatio;
  var e = t.backingStorePixelRatio || t.webkitBackingStorePixelRatio || t.mozBackingStorePixelRatio || t.msBackingStorePixelRatio || t.oBackingStorePixelRatio || t.backingStorePixelRatio || 1;
  return (window.devicePixelRatio || 1) / e;
};
ht.paintCache = function(t) {
  for (var e = this.paintCaches = this.paintCaches || [], r = !0, a, n = 0; n < e.length; n++)
    if (a = e[n], a.context === t) {
      r = !1;
      break;
    }
  return r && (a = {
    context: t
  }, e.push(a)), a;
};
ht.createGradientStyleFor = function(t, e, r, a, n) {
  var i, s = this.usePaths(), o = r.pstyle(e + "-gradient-stop-colors").value, u = r.pstyle(e + "-gradient-stop-positions").pfValue;
  if (a === "radial-gradient")
    if (r.isEdge()) {
      var l = r.sourceEndpoint(), f = r.targetEndpoint(), h = r.midpoint(), c = nr(l, h), v = nr(f, h);
      i = t.createRadialGradient(h.x, h.y, 0, h.x, h.y, Math.max(c, v));
    } else {
      var d = s ? {
        x: 0,
        y: 0
      } : r.position(), g = r.paddedWidth(), y = r.paddedHeight();
      i = t.createRadialGradient(d.x, d.y, 0, d.x, d.y, Math.max(g, y));
    }
  else if (r.isEdge()) {
    var p = r.sourceEndpoint(), E = r.targetEndpoint();
    i = t.createLinearGradient(p.x, p.y, E.x, E.y);
  } else {
    var m = s ? {
      x: 0,
      y: 0
    } : r.position(), T = r.paddedWidth(), C = r.paddedHeight(), S = T / 2, b = C / 2, x = r.pstyle("background-gradient-direction").value;
    switch (x) {
      case "to-bottom":
        i = t.createLinearGradient(m.x, m.y - b, m.x, m.y + b);
        break;
      case "to-top":
        i = t.createLinearGradient(m.x, m.y + b, m.x, m.y - b);
        break;
      case "to-left":
        i = t.createLinearGradient(m.x + S, m.y, m.x - S, m.y);
        break;
      case "to-right":
        i = t.createLinearGradient(m.x - S, m.y, m.x + S, m.y);
        break;
      case "to-bottom-right":
      case "to-right-bottom":
        i = t.createLinearGradient(m.x - S, m.y - b, m.x + S, m.y + b);
        break;
      case "to-top-right":
      case "to-right-top":
        i = t.createLinearGradient(m.x - S, m.y + b, m.x + S, m.y - b);
        break;
      case "to-bottom-left":
      case "to-left-bottom":
        i = t.createLinearGradient(m.x + S, m.y - b, m.x - S, m.y + b);
        break;
      case "to-top-left":
      case "to-left-top":
        i = t.createLinearGradient(m.x + S, m.y + b, m.x - S, m.y - b);
        break;
    }
  }
  if (!i)
    return null;
  for (var w = u.length === o.length, D = o.length, A = 0; A < D; A++)
    i.addColorStop(w ? u[A] : A / (D - 1), "rgba(" + o[A][0] + "," + o[A][1] + "," + o[A][2] + "," + n + ")");
  return i;
};
ht.gradientFillStyle = function(t, e, r, a) {
  var n = this.createGradientStyleFor(t, "background", e, r, a);
  if (!n)
    return null;
  t.fillStyle = n;
};
ht.colorFillStyle = function(t, e, r, a, n) {
  t.fillStyle = "rgba(" + e + "," + r + "," + a + "," + n + ")";
};
ht.eleFillStyle = function(t, e, r) {
  var a = e.pstyle("background-fill").value;
  if (a === "linear-gradient" || a === "radial-gradient")
    this.gradientFillStyle(t, e, a, r);
  else {
    var n = e.pstyle("background-color").value;
    this.colorFillStyle(t, n[0], n[1], n[2], r);
  }
};
ht.gradientStrokeStyle = function(t, e, r, a) {
  var n = this.createGradientStyleFor(t, "line", e, r, a);
  if (!n)
    return null;
  t.strokeStyle = n;
};
ht.colorStrokeStyle = function(t, e, r, a, n) {
  t.strokeStyle = "rgba(" + e + "," + r + "," + a + "," + n + ")";
};
ht.eleStrokeStyle = function(t, e, r) {
  var a = e.pstyle("line-fill").value;
  if (a === "linear-gradient" || a === "radial-gradient")
    this.gradientStrokeStyle(t, e, a, r);
  else {
    var n = e.pstyle("line-color").value;
    this.colorStrokeStyle(t, n[0], n[1], n[2], r);
  }
};
ht.matchCanvasSize = function(t) {
  var e = this, r = e.data, a = e.findContainerClientCoords(), n = a[2], i = a[3], s = e.getPixelRatio(), o = e.motionBlurPxRatio;
  (t === e.data.bufferCanvases[e.MOTIONBLUR_BUFFER_NODE] || t === e.data.bufferCanvases[e.MOTIONBLUR_BUFFER_DRAG]) && (s = o);
  var u = n * s, l = i * s, f;
  if (!(u === e.canvasWidth && l === e.canvasHeight)) {
    e.fontCaches = null;
    var h = r.canvasContainer;
    h.style.width = n + "px", h.style.height = i + "px";
    for (var c = 0; c < e.CANVAS_LAYERS; c++)
      f = r.canvases[c], f.width = u, f.height = l, f.style.width = n + "px", f.style.height = i + "px";
    for (var c = 0; c < e.BUFFER_COUNT; c++)
      f = r.bufferCanvases[c], f.width = u, f.height = l, f.style.width = n + "px", f.style.height = i + "px";
    e.textureMult = 1, s <= 1 && (f = r.bufferCanvases[e.TEXTURE_BUFFER], e.textureMult = 2, f.width = u * e.textureMult, f.height = l * e.textureMult), e.canvasWidth = u, e.canvasHeight = l;
  }
};
ht.renderTo = function(t, e, r, a) {
  this.render({
    forcedContext: t,
    forcedZoom: e,
    forcedPan: r,
    drawAllLayers: !0,
    forcedPxRatio: a
  });
};
ht.render = function(t) {
  t = t || xo();
  var e = t.forcedContext, r = t.drawAllLayers, a = t.drawOnlyNodeLayer, n = t.forcedZoom, i = t.forcedPan, s = this, o = t.forcedPxRatio === void 0 ? this.getPixelRatio() : t.forcedPxRatio, u = s.cy, l = s.data, f = l.canvasNeedsRedraw, h = s.textureOnViewport && !e && (s.pinching || s.hoverData.dragging || s.swipePanning || s.data.wheelZooming), c = t.motionBlur !== void 0 ? t.motionBlur : s.motionBlur, v = s.motionBlurPxRatio, d = u.hasCompoundNodes(), g = s.hoverData.draggingEles, y = !!(s.hoverData.selecting || s.touchData.selecting);
  c = c && !e && s.motionBlurEnabled && !y;
  var p = c;
  e || (s.prevPxRatio !== o && (s.invalidateContainerClientCoordsCache(), s.matchCanvasSize(s.container), s.redrawHint("eles", !0), s.redrawHint("drag", !0)), s.prevPxRatio = o), !e && s.motionBlurTimeout && clearTimeout(s.motionBlurTimeout), c && (s.mbFrames == null && (s.mbFrames = 0), s.mbFrames++, s.mbFrames < 3 && (p = !1), s.mbFrames > s.minMbLowQualFrames && (s.motionBlurPxRatio = s.mbPxRBlurry)), s.clearingMotionBlur && (s.motionBlurPxRatio = 1), s.textureDrawLastFrame && !h && (f[s.NODE] = !0, f[s.SELECT_BOX] = !0);
  var E = u.style(), m = u.zoom(), T = n !== void 0 ? n : m, C = u.pan(), S = {
    x: C.x,
    y: C.y
  }, b = {
    zoom: m,
    pan: {
      x: C.x,
      y: C.y
    }
  }, x = s.prevViewport, w = x === void 0 || b.zoom !== x.zoom || b.pan.x !== x.pan.x || b.pan.y !== x.pan.y;
  !w && !(g && !d) && (s.motionBlurPxRatio = 1), i && (S = i), T *= o, S.x *= o, S.y *= o;
  var D = s.getCachedZSortedEles();
  function A(ee, re, fe, se, ne) {
    var ue = ee.globalCompositeOperation;
    ee.globalCompositeOperation = "destination-out", s.colorFillStyle(ee, 255, 255, 255, s.motionBlurTransparency), ee.fillRect(re, fe, se, ne), ee.globalCompositeOperation = ue;
  }
  function L(ee, re) {
    var fe, se, ne, ue;
    !s.clearingMotionBlur && (ee === l.bufferContexts[s.MOTIONBLUR_BUFFER_NODE] || ee === l.bufferContexts[s.MOTIONBLUR_BUFFER_DRAG]) ? (fe = {
      x: C.x * v,
      y: C.y * v
    }, se = m * v, ne = s.canvasWidth * v, ue = s.canvasHeight * v) : (fe = S, se = T, ne = s.canvasWidth, ue = s.canvasHeight), ee.setTransform(1, 0, 0, 1, 0, 0), re === "motionBlur" ? A(ee, 0, 0, ne, ue) : !e && (re === void 0 || re) && ee.clearRect(0, 0, ne, ue), r || (ee.translate(fe.x, fe.y), ee.scale(se, se)), i && ee.translate(i.x, i.y), n && ee.scale(n, n);
  }
  if (h || (s.textureDrawLastFrame = !1), h) {
    if (s.textureDrawLastFrame = !0, !s.textureCache) {
      s.textureCache = {}, s.textureCache.bb = u.mutableElements().boundingBox(), s.textureCache.texture = s.data.bufferCanvases[s.TEXTURE_BUFFER];
      var M = s.data.bufferContexts[s.TEXTURE_BUFFER];
      M.setTransform(1, 0, 0, 1, 0, 0), M.clearRect(0, 0, s.canvasWidth * s.textureMult, s.canvasHeight * s.textureMult), s.render({
        forcedContext: M,
        drawOnlyNodeLayer: !0,
        forcedPxRatio: o * s.textureMult
      });
      var b = s.textureCache.viewport = {
        zoom: u.zoom(),
        pan: u.pan(),
        width: s.canvasWidth,
        height: s.canvasHeight
      };
      b.mpan = {
        x: (0 - b.pan.x) / b.zoom,
        y: (0 - b.pan.y) / b.zoom
      };
    }
    f[s.DRAG] = !1, f[s.NODE] = !1;
    var O = l.contexts[s.NODE], P = s.textureCache.texture, b = s.textureCache.viewport;
    O.setTransform(1, 0, 0, 1, 0, 0), c ? A(O, 0, 0, b.width, b.height) : O.clearRect(0, 0, b.width, b.height);
    var I = E.core("outside-texture-bg-color").value, k = E.core("outside-texture-bg-opacity").value;
    s.colorFillStyle(O, I[0], I[1], I[2], k), O.fillRect(0, 0, b.width, b.height);
    var m = u.zoom();
    L(O, !1), O.clearRect(b.mpan.x, b.mpan.y, b.width / b.zoom / o, b.height / b.zoom / o), O.drawImage(P, b.mpan.x, b.mpan.y, b.width / b.zoom / o, b.height / b.zoom / o);
  } else
    s.textureOnViewport && !e && (s.textureCache = null);
  var R = u.extent(), B = s.pinching || s.hoverData.dragging || s.swipePanning || s.data.wheelZooming || s.hoverData.draggingEles || s.cy.animated(), z = s.hideEdgesOnViewport && B, F = [];
  if (F[s.NODE] = !f[s.NODE] && c && !s.clearedForMotionBlur[s.NODE] || s.clearingMotionBlur, F[s.NODE] && (s.clearedForMotionBlur[s.NODE] = !0), F[s.DRAG] = !f[s.DRAG] && c && !s.clearedForMotionBlur[s.DRAG] || s.clearingMotionBlur, F[s.DRAG] && (s.clearedForMotionBlur[s.DRAG] = !0), f[s.NODE] || r || a || F[s.NODE]) {
    var $ = c && !F[s.NODE] && v !== 1, O = e || ($ ? s.data.bufferContexts[s.MOTIONBLUR_BUFFER_NODE] : l.contexts[s.NODE]), U = c && !$ ? "motionBlur" : void 0;
    L(O, U), z ? s.drawCachedNodes(O, D.nondrag, o, R) : s.drawLayeredElements(O, D.nondrag, o, R), s.debug && s.drawDebugPoints(O, D.nondrag), !r && !c && (f[s.NODE] = !1);
  }
  if (!a && (f[s.DRAG] || r || F[s.DRAG])) {
    var $ = c && !F[s.DRAG] && v !== 1, O = e || ($ ? s.data.bufferContexts[s.MOTIONBLUR_BUFFER_DRAG] : l.contexts[s.DRAG]);
    L(O, c && !$ ? "motionBlur" : void 0), z ? s.drawCachedNodes(O, D.drag, o, R) : s.drawCachedElements(O, D.drag, o, R), s.debug && s.drawDebugPoints(O, D.drag), !r && !c && (f[s.DRAG] = !1);
  }
  if (s.showFps || !a && f[s.SELECT_BOX] && !r) {
    var O = e || l.contexts[s.SELECT_BOX];
    if (L(O), s.selection[4] == 1 && (s.hoverData.selecting || s.touchData.selecting)) {
      var m = s.cy.zoom(), V = E.core("selection-box-border-width").value / m;
      O.lineWidth = V, O.fillStyle = "rgba(" + E.core("selection-box-color").value[0] + "," + E.core("selection-box-color").value[1] + "," + E.core("selection-box-color").value[2] + "," + E.core("selection-box-opacity").value + ")", O.fillRect(s.selection[0], s.selection[1], s.selection[2] - s.selection[0], s.selection[3] - s.selection[1]), V > 0 && (O.strokeStyle = "rgba(" + E.core("selection-box-border-color").value[0] + "," + E.core("selection-box-border-color").value[1] + "," + E.core("selection-box-border-color").value[2] + "," + E.core("selection-box-opacity").value + ")", O.strokeRect(s.selection[0], s.selection[1], s.selection[2] - s.selection[0], s.selection[3] - s.selection[1]));
    }
    if (l.bgActivePosistion && !s.hoverData.selecting) {
      var m = s.cy.zoom(), H = l.bgActivePosistion;
      O.fillStyle = "rgba(" + E.core("active-bg-color").value[0] + "," + E.core("active-bg-color").value[1] + "," + E.core("active-bg-color").value[2] + "," + E.core("active-bg-opacity").value + ")", O.beginPath(), O.arc(H.x, H.y, E.core("active-bg-size").pfValue / m, 0, 2 * Math.PI), O.fill();
    }
    var Y = s.lastRedrawTime;
    if (s.showFps && Y) {
      Y = Math.round(Y);
      var G = Math.round(1e3 / Y);
      O.setTransform(1, 0, 0, 1, 0, 0), O.fillStyle = "rgba(255, 0, 0, 0.75)", O.strokeStyle = "rgba(255, 0, 0, 0.75)", O.lineWidth = 1, O.fillText("1 frame = " + Y + " ms = " + G + " fps", 0, 20);
      var X = 60;
      O.strokeRect(0, 30, 250, 20), O.fillRect(0, 30, 250 * Math.min(G / X, 1), 20);
    }
    r || (f[s.SELECT_BOX] = !1);
  }
  if (c && v !== 1) {
    var K = l.contexts[s.NODE], Z = s.data.bufferCanvases[s.MOTIONBLUR_BUFFER_NODE], te = l.contexts[s.DRAG], he = s.data.bufferCanvases[s.MOTIONBLUR_BUFFER_DRAG], de = function(re, fe, se) {
      re.setTransform(1, 0, 0, 1, 0, 0), se || !p ? re.clearRect(0, 0, s.canvasWidth, s.canvasHeight) : A(re, 0, 0, s.canvasWidth, s.canvasHeight);
      var ne = v;
      re.drawImage(
        fe,
        // img
        0,
        0,
        // sx, sy
        s.canvasWidth * ne,
        s.canvasHeight * ne,
        // sw, sh
        0,
        0,
        // x, y
        s.canvasWidth,
        s.canvasHeight
        // w, h
      );
    };
    (f[s.NODE] || F[s.NODE]) && (de(K, Z, F[s.NODE]), f[s.NODE] = !1), (f[s.DRAG] || F[s.DRAG]) && (de(te, he, F[s.DRAG]), f[s.DRAG] = !1);
  }
  s.prevViewport = b, s.clearingMotionBlur && (s.clearingMotionBlur = !1, s.motionBlurCleared = !0, s.motionBlur = !0), c && (s.motionBlurTimeout = setTimeout(function() {
    s.motionBlurTimeout = null, s.clearedForMotionBlur[s.NODE] = !1, s.clearedForMotionBlur[s.DRAG] = !1, s.motionBlur = !1, s.clearingMotionBlur = !h, s.mbFrames = 0, f[s.NODE] = !0, f[s.DRAG] = !0, s.redraw();
  }, xm)), e || u.emit("render");
};
var Qt = {};
Qt.drawPolygonPath = function(t, e, r, a, n, i) {
  var s = a / 2, o = n / 2;
  t.beginPath && t.beginPath(), t.moveTo(e + s * i[0], r + o * i[1]);
  for (var u = 1; u < i.length / 2; u++)
    t.lineTo(e + s * i[u * 2], r + o * i[u * 2 + 1]);
  t.closePath();
};
Qt.drawRoundPolygonPath = function(t, e, r, a, n, i) {
  var s = a / 2, o = n / 2, u = vi(a, n);
  t.beginPath && t.beginPath();
  for (var l = 0; l < i.length / 4; l++) {
    var f = void 0, h = void 0;
    l === 0 ? f = i.length - 2 : f = l * 4 - 2, h = l * 4 + 2;
    var c = e + s * i[l * 4], v = r + o * i[l * 4 + 1], d = -i[f] * i[h] - i[f + 1] * i[h + 1], g = u / Math.tan(Math.acos(d) / 2), y = c - g * i[f], p = v - g * i[f + 1], E = c + g * i[h], m = v + g * i[h + 1];
    l === 0 ? t.moveTo(y, p) : t.lineTo(y, p), t.arcTo(c, v, E, m, u);
  }
  t.closePath();
};
Qt.drawRoundRectanglePath = function(t, e, r, a, n) {
  var i = a / 2, s = n / 2, o = pa(a, n);
  t.beginPath && t.beginPath(), t.moveTo(e, r - s), t.arcTo(e + i, r - s, e + i, r, o), t.arcTo(e + i, r + s, e, r + s, o), t.arcTo(e - i, r + s, e - i, r, o), t.arcTo(e - i, r - s, e, r - s, o), t.lineTo(e, r - s), t.closePath();
};
Qt.drawBottomRoundRectanglePath = function(t, e, r, a, n) {
  var i = a / 2, s = n / 2, o = pa(a, n);
  t.beginPath && t.beginPath(), t.moveTo(e, r - s), t.lineTo(e + i, r - s), t.lineTo(e + i, r), t.arcTo(e + i, r + s, e, r + s, o), t.arcTo(e - i, r + s, e - i, r, o), t.lineTo(e - i, r - s), t.lineTo(e, r - s), t.closePath();
};
Qt.drawCutRectanglePath = function(t, e, r, a, n) {
  var i = a / 2, s = n / 2, o = No();
  t.beginPath && t.beginPath(), t.moveTo(e - i + o, r - s), t.lineTo(e + i - o, r - s), t.lineTo(e + i, r - s + o), t.lineTo(e + i, r + s - o), t.lineTo(e + i - o, r + s), t.lineTo(e - i + o, r + s), t.lineTo(e - i, r + s - o), t.lineTo(e - i, r - s + o), t.closePath();
};
Qt.drawBarrelPath = function(t, e, r, a, n) {
  var i = a / 2, s = n / 2, o = e - i, u = e + i, l = r - s, f = r + s, h = zn(a, n), c = h.widthOffset, v = h.heightOffset, d = h.ctrlPtOffsetPct * c;
  t.beginPath && t.beginPath(), t.moveTo(o, l + v), t.lineTo(o, f - v), t.quadraticCurveTo(o + d, f, o + c, f), t.lineTo(u - c, f), t.quadraticCurveTo(u - d, f, u, f - v), t.lineTo(u, l + v), t.quadraticCurveTo(u - d, l, u - c, l), t.lineTo(o + c, l), t.quadraticCurveTo(o + d, l, o, l + v), t.closePath();
};
var $s = Math.sin(0), Vs = Math.cos(0), qn = {}, Wn = {}, Cu = Math.PI / 40;
for (var mr = 0 * Math.PI; mr < 2 * Math.PI; mr += Cu)
  qn[mr] = Math.sin(mr), Wn[mr] = Math.cos(mr);
Qt.drawEllipsePath = function(t, e, r, a, n) {
  if (t.beginPath && t.beginPath(), t.ellipse)
    t.ellipse(e, r, a / 2, n / 2, 0, 0, 2 * Math.PI);
  else
    for (var i, s, o = a / 2, u = n / 2, l = 0 * Math.PI; l < 2 * Math.PI; l += Cu)
      i = e - o * qn[l] * $s + o * Wn[l] * Vs, s = r + u * Wn[l] * $s + u * qn[l] * Vs, l === 0 ? t.moveTo(i, s) : t.lineTo(i, s);
  t.closePath();
};
var wa = {};
wa.createBuffer = function(t, e) {
  var r = document.createElement("canvas");
  return r.width = t, r.height = e, [r, r.getContext("2d")];
};
wa.bufferCanvasImage = function(t) {
  var e = this.cy, r = e.mutableElements(), a = r.boundingBox(), n = this.findContainerClientCoords(), i = t.full ? Math.ceil(a.w) : n[2], s = t.full ? Math.ceil(a.h) : n[3], o = ae(t.maxWidth) || ae(t.maxHeight), u = this.getPixelRatio(), l = 1;
  if (t.scale !== void 0)
    i *= t.scale, s *= t.scale, l = t.scale;
  else if (o) {
    var f = 1 / 0, h = 1 / 0;
    ae(t.maxWidth) && (f = l * t.maxWidth / i), ae(t.maxHeight) && (h = l * t.maxHeight / s), l = Math.min(f, h), i *= l, s *= l;
  }
  o || (i *= u, s *= u, l *= u);
  var c = document.createElement("canvas");
  c.width = i, c.height = s, c.style.width = i + "px", c.style.height = s + "px";
  var v = c.getContext("2d");
  if (i > 0 && s > 0) {
    v.clearRect(0, 0, i, s), v.globalCompositeOperation = "source-over";
    var d = this.getCachedZSortedEles();
    if (t.full)
      v.translate(-a.x1 * l, -a.y1 * l), v.scale(l, l), this.drawElements(v, d), v.scale(1 / l, 1 / l), v.translate(a.x1 * l, a.y1 * l);
    else {
      var g = e.pan(), y = {
        x: g.x * l,
        y: g.y * l
      };
      l *= e.zoom(), v.translate(y.x, y.y), v.scale(l, l), this.drawElements(v, d), v.scale(1 / l, 1 / l), v.translate(-y.x, -y.y);
    }
    t.bg && (v.globalCompositeOperation = "destination-over", v.fillStyle = t.bg, v.rect(0, 0, i, s), v.fill());
  }
  return c;
};
function Tm(t, e) {
  for (var r = atob(t), a = new ArrayBuffer(r.length), n = new Uint8Array(a), i = 0; i < r.length; i++)
    n[i] = r.charCodeAt(i);
  return new Blob([a], {
    type: e
  });
}
function _s(t) {
  var e = t.indexOf(",");
  return t.substr(e + 1);
}
function Du(t, e, r) {
  var a = function() {
    return e.toDataURL(r, t.quality);
  };
  switch (t.output) {
    case "blob-promise":
      return new Rr(function(n, i) {
        try {
          e.toBlob(function(s) {
            s != null ? n(s) : i(new Error("`canvas.toBlob()` sent a null value in its callback"));
          }, r, t.quality);
        } catch (s) {
          i(s);
        }
      });
    case "blob":
      return Tm(_s(a()), r);
    case "base64":
      return _s(a());
    case "base64uri":
    default:
      return a();
  }
}
wa.png = function(t) {
  return Du(t, this.bufferCanvasImage(t), "image/png");
};
wa.jpg = function(t) {
  return Du(t, this.bufferCanvasImage(t), "image/jpeg");
};
var Su = {};
Su.nodeShapeImpl = function(t, e, r, a, n, i, s) {
  switch (t) {
    case "ellipse":
      return this.drawEllipsePath(e, r, a, n, i);
    case "polygon":
      return this.drawPolygonPath(e, r, a, n, i, s);
    case "round-polygon":
      return this.drawRoundPolygonPath(e, r, a, n, i, s);
    case "roundrectangle":
    case "round-rectangle":
      return this.drawRoundRectanglePath(e, r, a, n, i);
    case "cutrectangle":
    case "cut-rectangle":
      return this.drawCutRectanglePath(e, r, a, n, i);
    case "bottomroundrectangle":
    case "bottom-round-rectangle":
      return this.drawBottomRoundRectanglePath(e, r, a, n, i);
    case "barrel":
      return this.drawBarrelPath(e, r, a, n, i);
  }
};
var Cm = Lu, Ce = Lu.prototype;
Ce.CANVAS_LAYERS = 3;
Ce.SELECT_BOX = 0;
Ce.DRAG = 1;
Ce.NODE = 2;
Ce.BUFFER_COUNT = 3;
Ce.TEXTURE_BUFFER = 0;
Ce.MOTIONBLUR_BUFFER_NODE = 1;
Ce.MOTIONBLUR_BUFFER_DRAG = 2;
function Lu(t) {
  var e = this;
  e.data = {
    canvases: new Array(Ce.CANVAS_LAYERS),
    contexts: new Array(Ce.CANVAS_LAYERS),
    canvasNeedsRedraw: new Array(Ce.CANVAS_LAYERS),
    bufferCanvases: new Array(Ce.BUFFER_COUNT),
    bufferContexts: new Array(Ce.CANVAS_LAYERS)
  };
  var r = "-webkit-tap-highlight-color", a = "rgba(0,0,0,0)";
  e.data.canvasContainer = document.createElement("div");
  var n = e.data.canvasContainer.style;
  e.data.canvasContainer.style[r] = a, n.position = "relative", n.zIndex = "0", n.overflow = "hidden";
  var i = t.cy.container();
  i.appendChild(e.data.canvasContainer), i.style[r] = a;
  var s = {
    "-webkit-user-select": "none",
    "-moz-user-select": "-moz-none",
    "user-select": "none",
    "-webkit-tap-highlight-color": "rgba(0,0,0,0)",
    "outline-style": "none"
  };
  sd() && (s["-ms-touch-action"] = "none", s["touch-action"] = "none");
  for (var o = 0; o < Ce.CANVAS_LAYERS; o++) {
    var u = e.data.canvases[o] = document.createElement("canvas");
    e.data.contexts[o] = u.getContext("2d"), Object.keys(s).forEach(function(Y) {
      u.style[Y] = s[Y];
    }), u.style.position = "absolute", u.setAttribute("data-id", "layer" + o), u.style.zIndex = String(Ce.CANVAS_LAYERS - o), e.data.canvasContainer.appendChild(u), e.data.canvasNeedsRedraw[o] = !1;
  }
  e.data.topCanvas = e.data.canvases[0], e.data.canvases[Ce.NODE].setAttribute("data-id", "layer" + Ce.NODE + "-node"), e.data.canvases[Ce.SELECT_BOX].setAttribute("data-id", "layer" + Ce.SELECT_BOX + "-selectbox"), e.data.canvases[Ce.DRAG].setAttribute("data-id", "layer" + Ce.DRAG + "-drag");
  for (var o = 0; o < Ce.BUFFER_COUNT; o++)
    e.data.bufferCanvases[o] = document.createElement("canvas"), e.data.bufferContexts[o] = e.data.bufferCanvases[o].getContext("2d"), e.data.bufferCanvases[o].style.position = "absolute", e.data.bufferCanvases[o].setAttribute("data-id", "buffer" + o), e.data.bufferCanvases[o].style.zIndex = String(-o - 1), e.data.bufferCanvases[o].style.visibility = "hidden";
  e.pathsEnabled = !0;
  var l = lt(), f = function(G) {
    return {
      x: (G.x1 + G.x2) / 2,
      y: (G.y1 + G.y2) / 2
    };
  }, h = function(G) {
    return {
      x: -G.w / 2,
      y: -G.h / 2
    };
  }, c = function(G) {
    var X = G[0]._private, K = X.oldBackgroundTimestamp === X.backgroundTimestamp;
    return !K;
  }, v = function(G) {
    return G[0]._private.nodeKey;
  }, d = function(G) {
    return G[0]._private.labelStyleKey;
  }, g = function(G) {
    return G[0]._private.sourceLabelStyleKey;
  }, y = function(G) {
    return G[0]._private.targetLabelStyleKey;
  }, p = function(G, X, K, Z, te) {
    return e.drawElement(G, X, K, !1, !1, te);
  }, E = function(G, X, K, Z, te) {
    return e.drawElementText(G, X, K, Z, "main", te);
  }, m = function(G, X, K, Z, te) {
    return e.drawElementText(G, X, K, Z, "source", te);
  }, T = function(G, X, K, Z, te) {
    return e.drawElementText(G, X, K, Z, "target", te);
  }, C = function(G) {
    return G.boundingBox(), G[0]._private.bodyBounds;
  }, S = function(G) {
    return G.boundingBox(), G[0]._private.labelBounds.main || l;
  }, b = function(G) {
    return G.boundingBox(), G[0]._private.labelBounds.source || l;
  }, x = function(G) {
    return G.boundingBox(), G[0]._private.labelBounds.target || l;
  }, w = function(G, X) {
    return X;
  }, D = function(G) {
    return f(C(G));
  }, A = function(G, X, K) {
    var Z = G ? G + "-" : "";
    return {
      x: X.x + K.pstyle(Z + "text-margin-x").pfValue,
      y: X.y + K.pstyle(Z + "text-margin-y").pfValue
    };
  }, L = function(G, X, K) {
    var Z = G[0]._private.rscratch;
    return {
      x: Z[X],
      y: Z[K]
    };
  }, M = function(G) {
    return A("", L(G, "labelX", "labelY"), G);
  }, O = function(G) {
    return A("source", L(G, "sourceLabelX", "sourceLabelY"), G);
  }, P = function(G) {
    return A("target", L(G, "targetLabelX", "targetLabelY"), G);
  }, I = function(G) {
    return h(C(G));
  }, k = function(G) {
    return h(b(G));
  }, R = function(G) {
    return h(x(G));
  }, B = function(G) {
    var X = S(G), K = h(S(G));
    if (G.isNode()) {
      switch (G.pstyle("text-halign").value) {
        case "left":
          K.x = -X.w;
          break;
        case "right":
          K.x = 0;
          break;
      }
      switch (G.pstyle("text-valign").value) {
        case "top":
          K.y = -X.h;
          break;
        case "bottom":
          K.y = 0;
          break;
      }
    }
    return K;
  }, z = e.data.eleTxrCache = new Kr(e, {
    getKey: v,
    doesEleInvalidateKey: c,
    drawElement: p,
    getBoundingBox: C,
    getRotationPoint: D,
    getRotationOffset: I,
    allowEdgeTxrCaching: !1,
    allowParentTxrCaching: !1
  }), F = e.data.lblTxrCache = new Kr(e, {
    getKey: d,
    drawElement: E,
    getBoundingBox: S,
    getRotationPoint: M,
    getRotationOffset: B,
    isVisible: w
  }), $ = e.data.slbTxrCache = new Kr(e, {
    getKey: g,
    drawElement: m,
    getBoundingBox: b,
    getRotationPoint: O,
    getRotationOffset: k,
    isVisible: w
  }), U = e.data.tlbTxrCache = new Kr(e, {
    getKey: y,
    drawElement: T,
    getBoundingBox: x,
    getRotationPoint: P,
    getRotationOffset: R,
    isVisible: w
  }), V = e.data.lyrTxrCache = new Eu(e);
  e.onUpdateEleCalcs(function(G, X) {
    z.invalidateElements(X), F.invalidateElements(X), $.invalidateElements(X), U.invalidateElements(X), V.invalidateElements(X);
    for (var K = 0; K < X.length; K++) {
      var Z = X[K]._private;
      Z.oldBackgroundTimestamp = Z.backgroundTimestamp;
    }
  });
  var H = function(G) {
    for (var X = 0; X < G.length; X++)
      V.enqueueElementRefinement(G[X].ele);
  };
  z.onDequeue(H), F.onDequeue(H), $.onDequeue(H), U.onDequeue(H);
}
Ce.redrawHint = function(t, e) {
  var r = this;
  switch (t) {
    case "eles":
      r.data.canvasNeedsRedraw[Ce.NODE] = e;
      break;
    case "drag":
      r.data.canvasNeedsRedraw[Ce.DRAG] = e;
      break;
    case "select":
      r.data.canvasNeedsRedraw[Ce.SELECT_BOX] = e;
      break;
  }
};
var Dm = typeof Path2D < "u";
Ce.path2dEnabled = function(t) {
  if (t === void 0)
    return this.pathsEnabled;
  this.pathsEnabled = !!t;
};
Ce.usePaths = function() {
  return Dm && this.pathsEnabled;
};
Ce.setImgSmoothing = function(t, e) {
  t.imageSmoothingEnabled != null ? t.imageSmoothingEnabled = e : (t.webkitImageSmoothingEnabled = e, t.mozImageSmoothingEnabled = e, t.msImageSmoothingEnabled = e);
};
Ce.getImgSmoothing = function(t) {
  return t.imageSmoothingEnabled != null ? t.imageSmoothingEnabled : t.webkitImageSmoothingEnabled || t.mozImageSmoothingEnabled || t.msImageSmoothingEnabled;
};
Ce.makeOffscreenCanvas = function(t, e) {
  var r;
  return (typeof OffscreenCanvas > "u" ? "undefined" : _e(OffscreenCanvas)) !== "undefined" ? r = new OffscreenCanvas(t, e) : (r = document.createElement("canvas"), r.width = t, r.height = e), r;
};
[wu, At, Pt, xi, hr, Gr, ht, Qt, wa, Su].forEach(function(t) {
  ce(Ce, t);
});
var Sm = [{
  name: "null",
  impl: hu
}, {
  name: "base",
  impl: mu
}, {
  name: "canvas",
  impl: Cm
}], Lm = [{
  type: "layout",
  extensions: ky
}, {
  type: "renderer",
  extensions: Sm
}], Au = {}, Ou = {};
function Nu(t, e, r) {
  var a = r, n = function(x) {
    Ae("Can not register `" + e + "` for `" + t + "` since `" + x + "` already exists in the prototype and can not be overridden");
  };
  if (t === "core") {
    if (fa.prototype[e])
      return n(e);
    fa.prototype[e] = r;
  } else if (t === "collection") {
    if (Ke.prototype[e])
      return n(e);
    Ke.prototype[e] = r;
  } else if (t === "layout") {
    for (var i = function(x) {
      this.options = x, r.call(this, x), Te(this._private) || (this._private = {}), this._private.cy = x.cy, this._private.listeners = [], this.createEmitter();
    }, s = i.prototype = Object.create(r.prototype), o = [], u = 0; u < o.length; u++) {
      var l = o[u];
      s[l] = s[l] || function() {
        return this;
      };
    }
    s.start && !s.run ? s.run = function() {
      return this.start(), this;
    } : !s.start && s.run && (s.start = function() {
      return this.run(), this;
    });
    var f = r.prototype.stop;
    s.stop = function() {
      var b = this.options;
      if (b && b.animate) {
        var x = this.animations;
        if (x)
          for (var w = 0; w < x.length; w++)
            x[w].stop();
      }
      return f ? f.call(this) : this.emit("layoutstop"), this;
    }, s.destroy || (s.destroy = function() {
      return this;
    }), s.cy = function() {
      return this._private.cy;
    };
    var h = function(x) {
      return x._private.cy;
    }, c = {
      addEventFields: function(x, w) {
        w.layout = x, w.cy = h(x), w.target = x;
      },
      bubble: function() {
        return !0;
      },
      parent: function(x) {
        return h(x);
      }
    };
    ce(s, {
      createEmitter: function() {
        return this._private.emitter = new vn(c, this), this;
      },
      emitter: function() {
        return this._private.emitter;
      },
      on: function(x, w) {
        return this.emitter().on(x, w), this;
      },
      one: function(x, w) {
        return this.emitter().one(x, w), this;
      },
      once: function(x, w) {
        return this.emitter().one(x, w), this;
      },
      removeListener: function(x, w) {
        return this.emitter().removeListener(x, w), this;
      },
      removeAllListeners: function() {
        return this.emitter().removeAllListeners(), this;
      },
      emit: function(x, w) {
        return this.emitter().emit(x, w), this;
      }
    }), Le.eventAliasesOn(s), a = i;
  } else if (t === "renderer" && e !== "null" && e !== "base") {
    var v = Mu("renderer", "base"), d = v.prototype, g = r, y = r.prototype, p = function() {
      v.apply(this, arguments), g.apply(this, arguments);
    }, E = p.prototype;
    for (var m in d) {
      var T = d[m], C = y[m] != null;
      if (C)
        return n(m);
      E[m] = T;
    }
    for (var S in y)
      E[S] = y[S];
    d.clientFunctions.forEach(function(b) {
      E[b] = E[b] || function() {
        ze("Renderer does not implement `renderer." + b + "()` on its prototype");
      };
    }), a = p;
  } else if (t === "__proto__" || t === "constructor" || t === "prototype")
    return ze(t + " is an illegal type to be registered, possibly lead to prototype pollutions");
  return vo({
    map: Au,
    keys: [t, e],
    value: a
  });
}
function Mu(t, e) {
  return co({
    map: Au,
    keys: [t, e]
  });
}
function Am(t, e, r, a, n) {
  return vo({
    map: Ou,
    keys: [t, e, r, a],
    value: n
  });
}
function Om(t, e, r, a) {
  return co({
    map: Ou,
    keys: [t, e, r, a]
  });
}
var Kn = function() {
  if (arguments.length === 2)
    return Mu.apply(null, arguments);
  if (arguments.length === 3)
    return Nu.apply(null, arguments);
  if (arguments.length === 4)
    return Om.apply(null, arguments);
  if (arguments.length === 5)
    return Am.apply(null, arguments);
  ze("Invalid extension access syntax");
};
fa.prototype.extension = Kn;
Lm.forEach(function(t) {
  t.extensions.forEach(function(e) {
    Nu(t.type, e.name, e.impl);
  });
});
var Iu = function t() {
  if (!(this instanceof t))
    return new t();
  this.length = 0;
}, or = Iu.prototype;
or.instanceString = function() {
  return "stylesheet";
};
or.selector = function(t) {
  var e = this.length++;
  return this[e] = {
    selector: t,
    properties: []
  }, this;
};
or.css = function(t, e) {
  var r = this.length - 1;
  if (le(t))
    this[r].properties.push({
      name: t,
      value: e
    });
  else if (Te(t))
    for (var a = t, n = Object.keys(a), i = 0; i < n.length; i++) {
      var s = n[i], o = a[s];
      if (o != null) {
        var u = je.properties[s] || je.properties[on(s)];
        if (u != null) {
          var l = u.name, f = o;
          this[r].properties.push({
            name: l,
            value: f
          });
        }
      }
    }
  return this;
};
or.style = or.css;
or.generateStyle = function(t) {
  var e = new je(t);
  return this.appendToStyle(e);
};
or.appendToStyle = function(t) {
  for (var e = 0; e < this.length; e++) {
    var r = this[e], a = r.selector, n = r.properties;
    t.selector(a);
    for (var i = 0; i < n.length; i++) {
      var s = n[i];
      t.css(s.name, s.value);
    }
  }
  return t;
};
var Nm = "3.23.0", Kt = function(e) {
  if (e === void 0 && (e = {}), Te(e))
    return new fa(e);
  if (le(e))
    return Kn.apply(Kn, arguments);
};
Kt.use = function(t) {
  var e = Array.prototype.slice.call(arguments, 1);
  return e.unshift(Kt), t.apply(null, e), this;
};
Kt.warnings = function(t) {
  return Eo(t);
};
Kt.version = Nm;
Kt.stylesheet = Kt.Stylesheet = Iu;
var Zn = {}, Mm = {
  get exports() {
    return Zn;
  },
  set exports(t) {
    Zn = t;
  }
}, Ja = {}, Im = {
  get exports() {
    return Ja;
  },
  set exports(t) {
    Ja = t;
  }
}, ja = {}, Rm = {
  get exports() {
    return ja;
  },
  set exports(t) {
    ja = t;
  }
}, Us;
function km() {
  return Us || (Us = 1, function(t, e) {
    (function(a, n) {
      t.exports = n();
    })($t, function() {
      return (
        /******/
        function(r) {
          var a = {};
          function n(i) {
            if (a[i])
              return a[i].exports;
            var s = a[i] = {
              /******/
              i,
              /******/
              l: !1,
              /******/
              exports: {}
              /******/
            };
            return r[i].call(s.exports, s, s.exports, n), s.l = !0, s.exports;
          }
          return n.m = r, n.c = a, n.i = function(i) {
            return i;
          }, n.d = function(i, s, o) {
            n.o(i, s) || Object.defineProperty(i, s, {
              /******/
              configurable: !1,
              /******/
              enumerable: !0,
              /******/
              get: o
              /******/
            });
          }, n.n = function(i) {
            var s = i && i.__esModule ? (
              /******/
              function() {
                return i.default;
              }
            ) : (
              /******/
              function() {
                return i;
              }
            );
            return n.d(s, "a", s), s;
          }, n.o = function(i, s) {
            return Object.prototype.hasOwnProperty.call(i, s);
          }, n.p = "", n(n.s = 26);
        }([
          /* 0 */
          /***/
          function(r, a, n) {
            function i() {
            }
            i.QUALITY = 1, i.DEFAULT_CREATE_BENDS_AS_NEEDED = !1, i.DEFAULT_INCREMENTAL = !1, i.DEFAULT_ANIMATION_ON_LAYOUT = !0, i.DEFAULT_ANIMATION_DURING_LAYOUT = !1, i.DEFAULT_ANIMATION_PERIOD = 50, i.DEFAULT_UNIFORM_LEAF_NODE_SIZES = !1, i.DEFAULT_GRAPH_MARGIN = 15, i.NODE_DIMENSIONS_INCLUDE_LABELS = !1, i.SIMPLE_NODE_SIZE = 40, i.SIMPLE_NODE_HALF_SIZE = i.SIMPLE_NODE_SIZE / 2, i.EMPTY_COMPOUND_NODE_SIZE = 40, i.MIN_EDGE_LENGTH = 1, i.WORLD_BOUNDARY = 1e6, i.INITIAL_WORLD_BOUNDARY = i.WORLD_BOUNDARY / 1e3, i.WORLD_CENTER_X = 1200, i.WORLD_CENTER_Y = 900, r.exports = i;
          },
          /* 1 */
          /***/
          function(r, a, n) {
            var i = n(2), s = n(8), o = n(9);
            function u(f, h, c) {
              i.call(this, c), this.isOverlapingSourceAndTarget = !1, this.vGraphObject = c, this.bendpoints = [], this.source = f, this.target = h;
            }
            u.prototype = Object.create(i.prototype);
            for (var l in i)
              u[l] = i[l];
            u.prototype.getSource = function() {
              return this.source;
            }, u.prototype.getTarget = function() {
              return this.target;
            }, u.prototype.isInterGraph = function() {
              return this.isInterGraph;
            }, u.prototype.getLength = function() {
              return this.length;
            }, u.prototype.isOverlapingSourceAndTarget = function() {
              return this.isOverlapingSourceAndTarget;
            }, u.prototype.getBendpoints = function() {
              return this.bendpoints;
            }, u.prototype.getLca = function() {
              return this.lca;
            }, u.prototype.getSourceInLca = function() {
              return this.sourceInLca;
            }, u.prototype.getTargetInLca = function() {
              return this.targetInLca;
            }, u.prototype.getOtherEnd = function(f) {
              if (this.source === f)
                return this.target;
              if (this.target === f)
                return this.source;
              throw "Node is not incident with this edge";
            }, u.prototype.getOtherEndInGraph = function(f, h) {
              for (var c = this.getOtherEnd(f), v = h.getGraphManager().getRoot(); ; ) {
                if (c.getOwner() == h)
                  return c;
                if (c.getOwner() == v)
                  break;
                c = c.getOwner().getParent();
              }
              return null;
            }, u.prototype.updateLength = function() {
              var f = new Array(4);
              this.isOverlapingSourceAndTarget = s.getIntersection(this.target.getRect(), this.source.getRect(), f), this.isOverlapingSourceAndTarget || (this.lengthX = f[0] - f[2], this.lengthY = f[1] - f[3], Math.abs(this.lengthX) < 1 && (this.lengthX = o.sign(this.lengthX)), Math.abs(this.lengthY) < 1 && (this.lengthY = o.sign(this.lengthY)), this.length = Math.sqrt(this.lengthX * this.lengthX + this.lengthY * this.lengthY));
            }, u.prototype.updateLengthSimple = function() {
              this.lengthX = this.target.getCenterX() - this.source.getCenterX(), this.lengthY = this.target.getCenterY() - this.source.getCenterY(), Math.abs(this.lengthX) < 1 && (this.lengthX = o.sign(this.lengthX)), Math.abs(this.lengthY) < 1 && (this.lengthY = o.sign(this.lengthY)), this.length = Math.sqrt(this.lengthX * this.lengthX + this.lengthY * this.lengthY);
            }, r.exports = u;
          },
          /* 2 */
          /***/
          function(r, a, n) {
            function i(s) {
              this.vGraphObject = s;
            }
            r.exports = i;
          },
          /* 3 */
          /***/
          function(r, a, n) {
            var i = n(2), s = n(10), o = n(13), u = n(0), l = n(16), f = n(4);
            function h(v, d, g, y) {
              g == null && y == null && (y = d), i.call(this, y), v.graphManager != null && (v = v.graphManager), this.estimatedSize = s.MIN_VALUE, this.inclusionTreeDepth = s.MAX_VALUE, this.vGraphObject = y, this.edges = [], this.graphManager = v, g != null && d != null ? this.rect = new o(d.x, d.y, g.width, g.height) : this.rect = new o();
            }
            h.prototype = Object.create(i.prototype);
            for (var c in i)
              h[c] = i[c];
            h.prototype.getEdges = function() {
              return this.edges;
            }, h.prototype.getChild = function() {
              return this.child;
            }, h.prototype.getOwner = function() {
              return this.owner;
            }, h.prototype.getWidth = function() {
              return this.rect.width;
            }, h.prototype.setWidth = function(v) {
              this.rect.width = v;
            }, h.prototype.getHeight = function() {
              return this.rect.height;
            }, h.prototype.setHeight = function(v) {
              this.rect.height = v;
            }, h.prototype.getCenterX = function() {
              return this.rect.x + this.rect.width / 2;
            }, h.prototype.getCenterY = function() {
              return this.rect.y + this.rect.height / 2;
            }, h.prototype.getCenter = function() {
              return new f(this.rect.x + this.rect.width / 2, this.rect.y + this.rect.height / 2);
            }, h.prototype.getLocation = function() {
              return new f(this.rect.x, this.rect.y);
            }, h.prototype.getRect = function() {
              return this.rect;
            }, h.prototype.getDiagonal = function() {
              return Math.sqrt(this.rect.width * this.rect.width + this.rect.height * this.rect.height);
            }, h.prototype.getHalfTheDiagonal = function() {
              return Math.sqrt(this.rect.height * this.rect.height + this.rect.width * this.rect.width) / 2;
            }, h.prototype.setRect = function(v, d) {
              this.rect.x = v.x, this.rect.y = v.y, this.rect.width = d.width, this.rect.height = d.height;
            }, h.prototype.setCenter = function(v, d) {
              this.rect.x = v - this.rect.width / 2, this.rect.y = d - this.rect.height / 2;
            }, h.prototype.setLocation = function(v, d) {
              this.rect.x = v, this.rect.y = d;
            }, h.prototype.moveBy = function(v, d) {
              this.rect.x += v, this.rect.y += d;
            }, h.prototype.getEdgeListToNode = function(v) {
              var d = [], g = this;
              return g.edges.forEach(function(y) {
                if (y.target == v) {
                  if (y.source != g)
                    throw "Incorrect edge source!";
                  d.push(y);
                }
              }), d;
            }, h.prototype.getEdgesBetween = function(v) {
              var d = [], g = this;
              return g.edges.forEach(function(y) {
                if (!(y.source == g || y.target == g))
                  throw "Incorrect edge source and/or target";
                (y.target == v || y.source == v) && d.push(y);
              }), d;
            }, h.prototype.getNeighborsList = function() {
              var v = /* @__PURE__ */ new Set(), d = this;
              return d.edges.forEach(function(g) {
                if (g.source == d)
                  v.add(g.target);
                else {
                  if (g.target != d)
                    throw "Incorrect incidency!";
                  v.add(g.source);
                }
              }), v;
            }, h.prototype.withChildren = function() {
              var v = /* @__PURE__ */ new Set(), d, g;
              if (v.add(this), this.child != null)
                for (var y = this.child.getNodes(), p = 0; p < y.length; p++)
                  d = y[p], g = d.withChildren(), g.forEach(function(E) {
                    v.add(E);
                  });
              return v;
            }, h.prototype.getNoOfChildren = function() {
              var v = 0, d;
              if (this.child == null)
                v = 1;
              else
                for (var g = this.child.getNodes(), y = 0; y < g.length; y++)
                  d = g[y], v += d.getNoOfChildren();
              return v == 0 && (v = 1), v;
            }, h.prototype.getEstimatedSize = function() {
              if (this.estimatedSize == s.MIN_VALUE)
                throw "assert failed";
              return this.estimatedSize;
            }, h.prototype.calcEstimatedSize = function() {
              return this.child == null ? this.estimatedSize = (this.rect.width + this.rect.height) / 2 : (this.estimatedSize = this.child.calcEstimatedSize(), this.rect.width = this.estimatedSize, this.rect.height = this.estimatedSize, this.estimatedSize);
            }, h.prototype.scatter = function() {
              var v, d, g = -u.INITIAL_WORLD_BOUNDARY, y = u.INITIAL_WORLD_BOUNDARY;
              v = u.WORLD_CENTER_X + l.nextDouble() * (y - g) + g;
              var p = -u.INITIAL_WORLD_BOUNDARY, E = u.INITIAL_WORLD_BOUNDARY;
              d = u.WORLD_CENTER_Y + l.nextDouble() * (E - p) + p, this.rect.x = v, this.rect.y = d;
            }, h.prototype.updateBounds = function() {
              if (this.getChild() == null)
                throw "assert failed";
              if (this.getChild().getNodes().length != 0) {
                var v = this.getChild();
                if (v.updateBounds(!0), this.rect.x = v.getLeft(), this.rect.y = v.getTop(), this.setWidth(v.getRight() - v.getLeft()), this.setHeight(v.getBottom() - v.getTop()), u.NODE_DIMENSIONS_INCLUDE_LABELS) {
                  var d = v.getRight() - v.getLeft(), g = v.getBottom() - v.getTop();
                  this.labelWidth > d && (this.rect.x -= (this.labelWidth - d) / 2, this.setWidth(this.labelWidth)), this.labelHeight > g && (this.labelPos == "center" ? this.rect.y -= (this.labelHeight - g) / 2 : this.labelPos == "top" && (this.rect.y -= this.labelHeight - g), this.setHeight(this.labelHeight));
                }
              }
            }, h.prototype.getInclusionTreeDepth = function() {
              if (this.inclusionTreeDepth == s.MAX_VALUE)
                throw "assert failed";
              return this.inclusionTreeDepth;
            }, h.prototype.transform = function(v) {
              var d = this.rect.x;
              d > u.WORLD_BOUNDARY ? d = u.WORLD_BOUNDARY : d < -u.WORLD_BOUNDARY && (d = -u.WORLD_BOUNDARY);
              var g = this.rect.y;
              g > u.WORLD_BOUNDARY ? g = u.WORLD_BOUNDARY : g < -u.WORLD_BOUNDARY && (g = -u.WORLD_BOUNDARY);
              var y = new f(d, g), p = v.inverseTransformPoint(y);
              this.setLocation(p.x, p.y);
            }, h.prototype.getLeft = function() {
              return this.rect.x;
            }, h.prototype.getRight = function() {
              return this.rect.x + this.rect.width;
            }, h.prototype.getTop = function() {
              return this.rect.y;
            }, h.prototype.getBottom = function() {
              return this.rect.y + this.rect.height;
            }, h.prototype.getParent = function() {
              return this.owner == null ? null : this.owner.getParent();
            }, r.exports = h;
          },
          /* 4 */
          /***/
          function(r, a, n) {
            function i(s, o) {
              s == null && o == null ? (this.x = 0, this.y = 0) : (this.x = s, this.y = o);
            }
            i.prototype.getX = function() {
              return this.x;
            }, i.prototype.getY = function() {
              return this.y;
            }, i.prototype.setX = function(s) {
              this.x = s;
            }, i.prototype.setY = function(s) {
              this.y = s;
            }, i.prototype.getDifference = function(s) {
              return new DimensionD(this.x - s.x, this.y - s.y);
            }, i.prototype.getCopy = function() {
              return new i(this.x, this.y);
            }, i.prototype.translate = function(s) {
              return this.x += s.width, this.y += s.height, this;
            }, r.exports = i;
          },
          /* 5 */
          /***/
          function(r, a, n) {
            var i = n(2), s = n(10), o = n(0), u = n(6), l = n(3), f = n(1), h = n(13), c = n(12), v = n(11);
            function d(y, p, E) {
              i.call(this, E), this.estimatedSize = s.MIN_VALUE, this.margin = o.DEFAULT_GRAPH_MARGIN, this.edges = [], this.nodes = [], this.isConnected = !1, this.parent = y, p != null && p instanceof u ? this.graphManager = p : p != null && p instanceof Layout && (this.graphManager = p.graphManager);
            }
            d.prototype = Object.create(i.prototype);
            for (var g in i)
              d[g] = i[g];
            d.prototype.getNodes = function() {
              return this.nodes;
            }, d.prototype.getEdges = function() {
              return this.edges;
            }, d.prototype.getGraphManager = function() {
              return this.graphManager;
            }, d.prototype.getParent = function() {
              return this.parent;
            }, d.prototype.getLeft = function() {
              return this.left;
            }, d.prototype.getRight = function() {
              return this.right;
            }, d.prototype.getTop = function() {
              return this.top;
            }, d.prototype.getBottom = function() {
              return this.bottom;
            }, d.prototype.isConnected = function() {
              return this.isConnected;
            }, d.prototype.add = function(y, p, E) {
              if (p == null && E == null) {
                var m = y;
                if (this.graphManager == null)
                  throw "Graph has no graph mgr!";
                if (this.getNodes().indexOf(m) > -1)
                  throw "Node already in graph!";
                return m.owner = this, this.getNodes().push(m), m;
              } else {
                var T = y;
                if (!(this.getNodes().indexOf(p) > -1 && this.getNodes().indexOf(E) > -1))
                  throw "Source or target not in graph!";
                if (!(p.owner == E.owner && p.owner == this))
                  throw "Both owners must be this graph!";
                return p.owner != E.owner ? null : (T.source = p, T.target = E, T.isInterGraph = !1, this.getEdges().push(T), p.edges.push(T), E != p && E.edges.push(T), T);
              }
            }, d.prototype.remove = function(y) {
              var p = y;
              if (y instanceof l) {
                if (p == null)
                  throw "Node is null!";
                if (!(p.owner != null && p.owner == this))
                  throw "Owner graph is invalid!";
                if (this.graphManager == null)
                  throw "Owner graph manager is invalid!";
                for (var E = p.edges.slice(), m, T = E.length, C = 0; C < T; C++)
                  m = E[C], m.isInterGraph ? this.graphManager.remove(m) : m.source.owner.remove(m);
                var S = this.nodes.indexOf(p);
                if (S == -1)
                  throw "Node not in owner node list!";
                this.nodes.splice(S, 1);
              } else if (y instanceof f) {
                var m = y;
                if (m == null)
                  throw "Edge is null!";
                if (!(m.source != null && m.target != null))
                  throw "Source and/or target is null!";
                if (!(m.source.owner != null && m.target.owner != null && m.source.owner == this && m.target.owner == this))
                  throw "Source and/or target owner is invalid!";
                var b = m.source.edges.indexOf(m), x = m.target.edges.indexOf(m);
                if (!(b > -1 && x > -1))
                  throw "Source and/or target doesn't know this edge!";
                m.source.edges.splice(b, 1), m.target != m.source && m.target.edges.splice(x, 1);
                var S = m.source.owner.getEdges().indexOf(m);
                if (S == -1)
                  throw "Not in owner's edge list!";
                m.source.owner.getEdges().splice(S, 1);
              }
            }, d.prototype.updateLeftTop = function() {
              for (var y = s.MAX_VALUE, p = s.MAX_VALUE, E, m, T, C = this.getNodes(), S = C.length, b = 0; b < S; b++) {
                var x = C[b];
                E = x.getTop(), m = x.getLeft(), y > E && (y = E), p > m && (p = m);
              }
              return y == s.MAX_VALUE ? null : (C[0].getParent().paddingLeft != null ? T = C[0].getParent().paddingLeft : T = this.margin, this.left = p - T, this.top = y - T, new c(this.left, this.top));
            }, d.prototype.updateBounds = function(y) {
              for (var p = s.MAX_VALUE, E = -s.MAX_VALUE, m = s.MAX_VALUE, T = -s.MAX_VALUE, C, S, b, x, w, D = this.nodes, A = D.length, L = 0; L < A; L++) {
                var M = D[L];
                y && M.child != null && M.updateBounds(), C = M.getLeft(), S = M.getRight(), b = M.getTop(), x = M.getBottom(), p > C && (p = C), E < S && (E = S), m > b && (m = b), T < x && (T = x);
              }
              var O = new h(p, m, E - p, T - m);
              p == s.MAX_VALUE && (this.left = this.parent.getLeft(), this.right = this.parent.getRight(), this.top = this.parent.getTop(), this.bottom = this.parent.getBottom()), D[0].getParent().paddingLeft != null ? w = D[0].getParent().paddingLeft : w = this.margin, this.left = O.x - w, this.right = O.x + O.width + w, this.top = O.y - w, this.bottom = O.y + O.height + w;
            }, d.calculateBounds = function(y) {
              for (var p = s.MAX_VALUE, E = -s.MAX_VALUE, m = s.MAX_VALUE, T = -s.MAX_VALUE, C, S, b, x, w = y.length, D = 0; D < w; D++) {
                var A = y[D];
                C = A.getLeft(), S = A.getRight(), b = A.getTop(), x = A.getBottom(), p > C && (p = C), E < S && (E = S), m > b && (m = b), T < x && (T = x);
              }
              var L = new h(p, m, E - p, T - m);
              return L;
            }, d.prototype.getInclusionTreeDepth = function() {
              return this == this.graphManager.getRoot() ? 1 : this.parent.getInclusionTreeDepth();
            }, d.prototype.getEstimatedSize = function() {
              if (this.estimatedSize == s.MIN_VALUE)
                throw "assert failed";
              return this.estimatedSize;
            }, d.prototype.calcEstimatedSize = function() {
              for (var y = 0, p = this.nodes, E = p.length, m = 0; m < E; m++) {
                var T = p[m];
                y += T.calcEstimatedSize();
              }
              return y == 0 ? this.estimatedSize = o.EMPTY_COMPOUND_NODE_SIZE : this.estimatedSize = y / Math.sqrt(this.nodes.length), this.estimatedSize;
            }, d.prototype.updateConnected = function() {
              var y = this;
              if (this.nodes.length == 0) {
                this.isConnected = !0;
                return;
              }
              var p = new v(), E = /* @__PURE__ */ new Set(), m = this.nodes[0], T, C, S = m.withChildren();
              for (S.forEach(function(L) {
                p.push(L), E.add(L);
              }); p.length !== 0; ) {
                m = p.shift(), T = m.getEdges();
                for (var b = T.length, x = 0; x < b; x++) {
                  var w = T[x];
                  if (C = w.getOtherEndInGraph(m, this), C != null && !E.has(C)) {
                    var D = C.withChildren();
                    D.forEach(function(L) {
                      p.push(L), E.add(L);
                    });
                  }
                }
              }
              if (this.isConnected = !1, E.size >= this.nodes.length) {
                var A = 0;
                E.forEach(function(L) {
                  L.owner == y && A++;
                }), A == this.nodes.length && (this.isConnected = !0);
              }
            }, r.exports = d;
          },
          /* 6 */
          /***/
          function(r, a, n) {
            var i, s = n(1);
            function o(u) {
              i = n(5), this.layout = u, this.graphs = [], this.edges = [];
            }
            o.prototype.addRoot = function() {
              var u = this.layout.newGraph(), l = this.layout.newNode(null), f = this.add(u, l);
              return this.setRootGraph(f), this.rootGraph;
            }, o.prototype.add = function(u, l, f, h, c) {
              if (f == null && h == null && c == null) {
                if (u == null)
                  throw "Graph is null!";
                if (l == null)
                  throw "Parent node is null!";
                if (this.graphs.indexOf(u) > -1)
                  throw "Graph already in this graph mgr!";
                if (this.graphs.push(u), u.parent != null)
                  throw "Already has a parent!";
                if (l.child != null)
                  throw "Already has a child!";
                return u.parent = l, l.child = u, u;
              } else {
                c = f, h = l, f = u;
                var v = h.getOwner(), d = c.getOwner();
                if (!(v != null && v.getGraphManager() == this))
                  throw "Source not in this graph mgr!";
                if (!(d != null && d.getGraphManager() == this))
                  throw "Target not in this graph mgr!";
                if (v == d)
                  return f.isInterGraph = !1, v.add(f, h, c);
                if (f.isInterGraph = !0, f.source = h, f.target = c, this.edges.indexOf(f) > -1)
                  throw "Edge already in inter-graph edge list!";
                if (this.edges.push(f), !(f.source != null && f.target != null))
                  throw "Edge source and/or target is null!";
                if (!(f.source.edges.indexOf(f) == -1 && f.target.edges.indexOf(f) == -1))
                  throw "Edge already in source and/or target incidency list!";
                return f.source.edges.push(f), f.target.edges.push(f), f;
              }
            }, o.prototype.remove = function(u) {
              if (u instanceof i) {
                var l = u;
                if (l.getGraphManager() != this)
                  throw "Graph not in this graph mgr";
                if (!(l == this.rootGraph || l.parent != null && l.parent.graphManager == this))
                  throw "Invalid parent node!";
                var f = [];
                f = f.concat(l.getEdges());
                for (var h, c = f.length, v = 0; v < c; v++)
                  h = f[v], l.remove(h);
                var d = [];
                d = d.concat(l.getNodes());
                var g;
                c = d.length;
                for (var v = 0; v < c; v++)
                  g = d[v], l.remove(g);
                l == this.rootGraph && this.setRootGraph(null);
                var y = this.graphs.indexOf(l);
                this.graphs.splice(y, 1), l.parent = null;
              } else if (u instanceof s) {
                if (h = u, h == null)
                  throw "Edge is null!";
                if (!h.isInterGraph)
                  throw "Not an inter-graph edge!";
                if (!(h.source != null && h.target != null))
                  throw "Source and/or target is null!";
                if (!(h.source.edges.indexOf(h) != -1 && h.target.edges.indexOf(h) != -1))
                  throw "Source and/or target doesn't know this edge!";
                var y = h.source.edges.indexOf(h);
                if (h.source.edges.splice(y, 1), y = h.target.edges.indexOf(h), h.target.edges.splice(y, 1), !(h.source.owner != null && h.source.owner.getGraphManager() != null))
                  throw "Edge owner graph or owner graph manager is null!";
                if (h.source.owner.getGraphManager().edges.indexOf(h) == -1)
                  throw "Not in owner graph manager's edge list!";
                var y = h.source.owner.getGraphManager().edges.indexOf(h);
                h.source.owner.getGraphManager().edges.splice(y, 1);
              }
            }, o.prototype.updateBounds = function() {
              this.rootGraph.updateBounds(!0);
            }, o.prototype.getGraphs = function() {
              return this.graphs;
            }, o.prototype.getAllNodes = function() {
              if (this.allNodes == null) {
                for (var u = [], l = this.getGraphs(), f = l.length, h = 0; h < f; h++)
                  u = u.concat(l[h].getNodes());
                this.allNodes = u;
              }
              return this.allNodes;
            }, o.prototype.resetAllNodes = function() {
              this.allNodes = null;
            }, o.prototype.resetAllEdges = function() {
              this.allEdges = null;
            }, o.prototype.resetAllNodesToApplyGravitation = function() {
              this.allNodesToApplyGravitation = null;
            }, o.prototype.getAllEdges = function() {
              if (this.allEdges == null) {
                var u = [], l = this.getGraphs();
                l.length;
                for (var f = 0; f < l.length; f++)
                  u = u.concat(l[f].getEdges());
                u = u.concat(this.edges), this.allEdges = u;
              }
              return this.allEdges;
            }, o.prototype.getAllNodesToApplyGravitation = function() {
              return this.allNodesToApplyGravitation;
            }, o.prototype.setAllNodesToApplyGravitation = function(u) {
              if (this.allNodesToApplyGravitation != null)
                throw "assert failed";
              this.allNodesToApplyGravitation = u;
            }, o.prototype.getRoot = function() {
              return this.rootGraph;
            }, o.prototype.setRootGraph = function(u) {
              if (u.getGraphManager() != this)
                throw "Root not in this graph mgr!";
              this.rootGraph = u, u.parent == null && (u.parent = this.layout.newNode("Root node"));
            }, o.prototype.getLayout = function() {
              return this.layout;
            }, o.prototype.isOneAncestorOfOther = function(u, l) {
              if (!(u != null && l != null))
                throw "assert failed";
              if (u == l)
                return !0;
              var f = u.getOwner(), h;
              do {
                if (h = f.getParent(), h == null)
                  break;
                if (h == l)
                  return !0;
                if (f = h.getOwner(), f == null)
                  break;
              } while (!0);
              f = l.getOwner();
              do {
                if (h = f.getParent(), h == null)
                  break;
                if (h == u)
                  return !0;
                if (f = h.getOwner(), f == null)
                  break;
              } while (!0);
              return !1;
            }, o.prototype.calcLowestCommonAncestors = function() {
              for (var u, l, f, h, c, v = this.getAllEdges(), d = v.length, g = 0; g < d; g++) {
                if (u = v[g], l = u.source, f = u.target, u.lca = null, u.sourceInLca = l, u.targetInLca = f, l == f) {
                  u.lca = l.getOwner();
                  continue;
                }
                for (h = l.getOwner(); u.lca == null; ) {
                  for (u.targetInLca = f, c = f.getOwner(); u.lca == null; ) {
                    if (c == h) {
                      u.lca = c;
                      break;
                    }
                    if (c == this.rootGraph)
                      break;
                    if (u.lca != null)
                      throw "assert failed";
                    u.targetInLca = c.getParent(), c = u.targetInLca.getOwner();
                  }
                  if (h == this.rootGraph)
                    break;
                  u.lca == null && (u.sourceInLca = h.getParent(), h = u.sourceInLca.getOwner());
                }
                if (u.lca == null)
                  throw "assert failed";
              }
            }, o.prototype.calcLowestCommonAncestor = function(u, l) {
              if (u == l)
                return u.getOwner();
              var f = u.getOwner();
              do {
                if (f == null)
                  break;
                var h = l.getOwner();
                do {
                  if (h == null)
                    break;
                  if (h == f)
                    return h;
                  h = h.getParent().getOwner();
                } while (!0);
                f = f.getParent().getOwner();
              } while (!0);
              return f;
            }, o.prototype.calcInclusionTreeDepths = function(u, l) {
              u == null && l == null && (u = this.rootGraph, l = 1);
              for (var f, h = u.getNodes(), c = h.length, v = 0; v < c; v++)
                f = h[v], f.inclusionTreeDepth = l, f.child != null && this.calcInclusionTreeDepths(f.child, l + 1);
            }, o.prototype.includesInvalidEdge = function() {
              for (var u, l = this.edges.length, f = 0; f < l; f++)
                if (u = this.edges[f], this.isOneAncestorOfOther(u.source, u.target))
                  return !0;
              return !1;
            }, r.exports = o;
          },
          /* 7 */
          /***/
          function(r, a, n) {
            var i = n(0);
            function s() {
            }
            for (var o in i)
              s[o] = i[o];
            s.MAX_ITERATIONS = 2500, s.DEFAULT_EDGE_LENGTH = 50, s.DEFAULT_SPRING_STRENGTH = 0.45, s.DEFAULT_REPULSION_STRENGTH = 4500, s.DEFAULT_GRAVITY_STRENGTH = 0.4, s.DEFAULT_COMPOUND_GRAVITY_STRENGTH = 1, s.DEFAULT_GRAVITY_RANGE_FACTOR = 3.8, s.DEFAULT_COMPOUND_GRAVITY_RANGE_FACTOR = 1.5, s.DEFAULT_USE_SMART_IDEAL_EDGE_LENGTH_CALCULATION = !0, s.DEFAULT_USE_SMART_REPULSION_RANGE_CALCULATION = !0, s.DEFAULT_COOLING_FACTOR_INCREMENTAL = 0.3, s.COOLING_ADAPTATION_FACTOR = 0.33, s.ADAPTATION_LOWER_NODE_LIMIT = 1e3, s.ADAPTATION_UPPER_NODE_LIMIT = 5e3, s.MAX_NODE_DISPLACEMENT_INCREMENTAL = 100, s.MAX_NODE_DISPLACEMENT = s.MAX_NODE_DISPLACEMENT_INCREMENTAL * 3, s.MIN_REPULSION_DIST = s.DEFAULT_EDGE_LENGTH / 10, s.CONVERGENCE_CHECK_PERIOD = 100, s.PER_LEVEL_IDEAL_EDGE_LENGTH_FACTOR = 0.1, s.MIN_EDGE_LENGTH = 1, s.GRID_CALCULATION_CHECK_PERIOD = 10, r.exports = s;
          },
          /* 8 */
          /***/
          function(r, a, n) {
            var i = n(12);
            function s() {
            }
            s.calcSeparationAmount = function(o, u, l, f) {
              if (!o.intersects(u))
                throw "assert failed";
              var h = new Array(2);
              this.decideDirectionsForOverlappingNodes(o, u, h), l[0] = Math.min(o.getRight(), u.getRight()) - Math.max(o.x, u.x), l[1] = Math.min(o.getBottom(), u.getBottom()) - Math.max(o.y, u.y), o.getX() <= u.getX() && o.getRight() >= u.getRight() ? l[0] += Math.min(u.getX() - o.getX(), o.getRight() - u.getRight()) : u.getX() <= o.getX() && u.getRight() >= o.getRight() && (l[0] += Math.min(o.getX() - u.getX(), u.getRight() - o.getRight())), o.getY() <= u.getY() && o.getBottom() >= u.getBottom() ? l[1] += Math.min(u.getY() - o.getY(), o.getBottom() - u.getBottom()) : u.getY() <= o.getY() && u.getBottom() >= o.getBottom() && (l[1] += Math.min(o.getY() - u.getY(), u.getBottom() - o.getBottom()));
              var c = Math.abs((u.getCenterY() - o.getCenterY()) / (u.getCenterX() - o.getCenterX()));
              u.getCenterY() === o.getCenterY() && u.getCenterX() === o.getCenterX() && (c = 1);
              var v = c * l[0], d = l[1] / c;
              l[0] < d ? d = l[0] : v = l[1], l[0] = -1 * h[0] * (d / 2 + f), l[1] = -1 * h[1] * (v / 2 + f);
            }, s.decideDirectionsForOverlappingNodes = function(o, u, l) {
              o.getCenterX() < u.getCenterX() ? l[0] = -1 : l[0] = 1, o.getCenterY() < u.getCenterY() ? l[1] = -1 : l[1] = 1;
            }, s.getIntersection2 = function(o, u, l) {
              var f = o.getCenterX(), h = o.getCenterY(), c = u.getCenterX(), v = u.getCenterY();
              if (o.intersects(u))
                return l[0] = f, l[1] = h, l[2] = c, l[3] = v, !0;
              var d = o.getX(), g = o.getY(), y = o.getRight(), p = o.getX(), E = o.getBottom(), m = o.getRight(), T = o.getWidthHalf(), C = o.getHeightHalf(), S = u.getX(), b = u.getY(), x = u.getRight(), w = u.getX(), D = u.getBottom(), A = u.getRight(), L = u.getWidthHalf(), M = u.getHeightHalf(), O = !1, P = !1;
              if (f === c) {
                if (h > v)
                  return l[0] = f, l[1] = g, l[2] = c, l[3] = D, !1;
                if (h < v)
                  return l[0] = f, l[1] = E, l[2] = c, l[3] = b, !1;
              } else if (h === v) {
                if (f > c)
                  return l[0] = d, l[1] = h, l[2] = x, l[3] = v, !1;
                if (f < c)
                  return l[0] = y, l[1] = h, l[2] = S, l[3] = v, !1;
              } else {
                var I = o.height / o.width, k = u.height / u.width, R = (v - h) / (c - f), B = void 0, z = void 0, F = void 0, $ = void 0, U = void 0, V = void 0;
                if (-I === R ? f > c ? (l[0] = p, l[1] = E, O = !0) : (l[0] = y, l[1] = g, O = !0) : I === R && (f > c ? (l[0] = d, l[1] = g, O = !0) : (l[0] = m, l[1] = E, O = !0)), -k === R ? c > f ? (l[2] = w, l[3] = D, P = !0) : (l[2] = x, l[3] = b, P = !0) : k === R && (c > f ? (l[2] = S, l[3] = b, P = !0) : (l[2] = A, l[3] = D, P = !0)), O && P)
                  return !1;
                if (f > c ? h > v ? (B = this.getCardinalDirection(I, R, 4), z = this.getCardinalDirection(k, R, 2)) : (B = this.getCardinalDirection(-I, R, 3), z = this.getCardinalDirection(-k, R, 1)) : h > v ? (B = this.getCardinalDirection(-I, R, 1), z = this.getCardinalDirection(-k, R, 3)) : (B = this.getCardinalDirection(I, R, 2), z = this.getCardinalDirection(k, R, 4)), !O)
                  switch (B) {
                    case 1:
                      $ = g, F = f + -C / R, l[0] = F, l[1] = $;
                      break;
                    case 2:
                      F = m, $ = h + T * R, l[0] = F, l[1] = $;
                      break;
                    case 3:
                      $ = E, F = f + C / R, l[0] = F, l[1] = $;
                      break;
                    case 4:
                      F = p, $ = h + -T * R, l[0] = F, l[1] = $;
                      break;
                  }
                if (!P)
                  switch (z) {
                    case 1:
                      V = b, U = c + -M / R, l[2] = U, l[3] = V;
                      break;
                    case 2:
                      U = A, V = v + L * R, l[2] = U, l[3] = V;
                      break;
                    case 3:
                      V = D, U = c + M / R, l[2] = U, l[3] = V;
                      break;
                    case 4:
                      U = w, V = v + -L * R, l[2] = U, l[3] = V;
                      break;
                  }
              }
              return !1;
            }, s.getCardinalDirection = function(o, u, l) {
              return o > u ? l : 1 + l % 4;
            }, s.getIntersection = function(o, u, l, f) {
              if (f == null)
                return this.getIntersection2(o, u, l);
              var h = o.x, c = o.y, v = u.x, d = u.y, g = l.x, y = l.y, p = f.x, E = f.y, m = void 0, T = void 0, C = void 0, S = void 0, b = void 0, x = void 0, w = void 0, D = void 0, A = void 0;
              return C = d - c, b = h - v, w = v * c - h * d, S = E - y, x = g - p, D = p * y - g * E, A = C * x - S * b, A === 0 ? null : (m = (b * D - x * w) / A, T = (S * w - C * D) / A, new i(m, T));
            }, s.angleOfVector = function(o, u, l, f) {
              var h = void 0;
              return o !== l ? (h = Math.atan((f - u) / (l - o)), l < o ? h += Math.PI : f < u && (h += this.TWO_PI)) : f < u ? h = this.ONE_AND_HALF_PI : h = this.HALF_PI, h;
            }, s.doIntersect = function(o, u, l, f) {
              var h = o.x, c = o.y, v = u.x, d = u.y, g = l.x, y = l.y, p = f.x, E = f.y, m = (v - h) * (E - y) - (p - g) * (d - c);
              if (m === 0)
                return !1;
              var T = ((E - y) * (p - h) + (g - p) * (E - c)) / m, C = ((c - d) * (p - h) + (v - h) * (E - c)) / m;
              return 0 < T && T < 1 && 0 < C && C < 1;
            }, s.HALF_PI = 0.5 * Math.PI, s.ONE_AND_HALF_PI = 1.5 * Math.PI, s.TWO_PI = 2 * Math.PI, s.THREE_PI = 3 * Math.PI, r.exports = s;
          },
          /* 9 */
          /***/
          function(r, a, n) {
            function i() {
            }
            i.sign = function(s) {
              return s > 0 ? 1 : s < 0 ? -1 : 0;
            }, i.floor = function(s) {
              return s < 0 ? Math.ceil(s) : Math.floor(s);
            }, i.ceil = function(s) {
              return s < 0 ? Math.floor(s) : Math.ceil(s);
            }, r.exports = i;
          },
          /* 10 */
          /***/
          function(r, a, n) {
            function i() {
            }
            i.MAX_VALUE = 2147483647, i.MIN_VALUE = -2147483648, r.exports = i;
          },
          /* 11 */
          /***/
          function(r, a, n) {
            var i = function() {
              function h(c, v) {
                for (var d = 0; d < v.length; d++) {
                  var g = v[d];
                  g.enumerable = g.enumerable || !1, g.configurable = !0, "value" in g && (g.writable = !0), Object.defineProperty(c, g.key, g);
                }
              }
              return function(c, v, d) {
                return v && h(c.prototype, v), d && h(c, d), c;
              };
            }();
            function s(h, c) {
              if (!(h instanceof c))
                throw new TypeError("Cannot call a class as a function");
            }
            var o = function(c) {
              return { value: c, next: null, prev: null };
            }, u = function(c, v, d, g) {
              return c !== null ? c.next = v : g.head = v, d !== null ? d.prev = v : g.tail = v, v.prev = c, v.next = d, g.length++, v;
            }, l = function(c, v) {
              var d = c.prev, g = c.next;
              return d !== null ? d.next = g : v.head = g, g !== null ? g.prev = d : v.tail = d, c.prev = c.next = null, v.length--, c;
            }, f = function() {
              function h(c) {
                var v = this;
                s(this, h), this.length = 0, this.head = null, this.tail = null, c != null && c.forEach(function(d) {
                  return v.push(d);
                });
              }
              return i(h, [{
                key: "size",
                value: function() {
                  return this.length;
                }
              }, {
                key: "insertBefore",
                value: function(v, d) {
                  return u(d.prev, o(v), d, this);
                }
              }, {
                key: "insertAfter",
                value: function(v, d) {
                  return u(d, o(v), d.next, this);
                }
              }, {
                key: "insertNodeBefore",
                value: function(v, d) {
                  return u(d.prev, v, d, this);
                }
              }, {
                key: "insertNodeAfter",
                value: function(v, d) {
                  return u(d, v, d.next, this);
                }
              }, {
                key: "push",
                value: function(v) {
                  return u(this.tail, o(v), null, this);
                }
              }, {
                key: "unshift",
                value: function(v) {
                  return u(null, o(v), this.head, this);
                }
              }, {
                key: "remove",
                value: function(v) {
                  return l(v, this);
                }
              }, {
                key: "pop",
                value: function() {
                  return l(this.tail, this).value;
                }
              }, {
                key: "popNode",
                value: function() {
                  return l(this.tail, this);
                }
              }, {
                key: "shift",
                value: function() {
                  return l(this.head, this).value;
                }
              }, {
                key: "shiftNode",
                value: function() {
                  return l(this.head, this);
                }
              }, {
                key: "get_object_at",
                value: function(v) {
                  if (v <= this.length()) {
                    for (var d = 1, g = this.head; d < v; )
                      g = g.next, d++;
                    return g.value;
                  }
                }
              }, {
                key: "set_object_at",
                value: function(v, d) {
                  if (v <= this.length()) {
                    for (var g = 1, y = this.head; g < v; )
                      y = y.next, g++;
                    y.value = d;
                  }
                }
              }]), h;
            }();
            r.exports = f;
          },
          /* 12 */
          /***/
          function(r, a, n) {
            function i(s, o, u) {
              this.x = null, this.y = null, s == null && o == null && u == null ? (this.x = 0, this.y = 0) : typeof s == "number" && typeof o == "number" && u == null ? (this.x = s, this.y = o) : s.constructor.name == "Point" && o == null && u == null && (u = s, this.x = u.x, this.y = u.y);
            }
            i.prototype.getX = function() {
              return this.x;
            }, i.prototype.getY = function() {
              return this.y;
            }, i.prototype.getLocation = function() {
              return new i(this.x, this.y);
            }, i.prototype.setLocation = function(s, o, u) {
              s.constructor.name == "Point" && o == null && u == null ? (u = s, this.setLocation(u.x, u.y)) : typeof s == "number" && typeof o == "number" && u == null && (parseInt(s) == s && parseInt(o) == o ? this.move(s, o) : (this.x = Math.floor(s + 0.5), this.y = Math.floor(o + 0.5)));
            }, i.prototype.move = function(s, o) {
              this.x = s, this.y = o;
            }, i.prototype.translate = function(s, o) {
              this.x += s, this.y += o;
            }, i.prototype.equals = function(s) {
              if (s.constructor.name == "Point") {
                var o = s;
                return this.x == o.x && this.y == o.y;
              }
              return this == s;
            }, i.prototype.toString = function() {
              return new i().constructor.name + "[x=" + this.x + ",y=" + this.y + "]";
            }, r.exports = i;
          },
          /* 13 */
          /***/
          function(r, a, n) {
            function i(s, o, u, l) {
              this.x = 0, this.y = 0, this.width = 0, this.height = 0, s != null && o != null && u != null && l != null && (this.x = s, this.y = o, this.width = u, this.height = l);
            }
            i.prototype.getX = function() {
              return this.x;
            }, i.prototype.setX = function(s) {
              this.x = s;
            }, i.prototype.getY = function() {
              return this.y;
            }, i.prototype.setY = function(s) {
              this.y = s;
            }, i.prototype.getWidth = function() {
              return this.width;
            }, i.prototype.setWidth = function(s) {
              this.width = s;
            }, i.prototype.getHeight = function() {
              return this.height;
            }, i.prototype.setHeight = function(s) {
              this.height = s;
            }, i.prototype.getRight = function() {
              return this.x + this.width;
            }, i.prototype.getBottom = function() {
              return this.y + this.height;
            }, i.prototype.intersects = function(s) {
              return !(this.getRight() < s.x || this.getBottom() < s.y || s.getRight() < this.x || s.getBottom() < this.y);
            }, i.prototype.getCenterX = function() {
              return this.x + this.width / 2;
            }, i.prototype.getMinX = function() {
              return this.getX();
            }, i.prototype.getMaxX = function() {
              return this.getX() + this.width;
            }, i.prototype.getCenterY = function() {
              return this.y + this.height / 2;
            }, i.prototype.getMinY = function() {
              return this.getY();
            }, i.prototype.getMaxY = function() {
              return this.getY() + this.height;
            }, i.prototype.getWidthHalf = function() {
              return this.width / 2;
            }, i.prototype.getHeightHalf = function() {
              return this.height / 2;
            }, r.exports = i;
          },
          /* 14 */
          /***/
          function(r, a, n) {
            var i = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(o) {
              return typeof o;
            } : function(o) {
              return o && typeof Symbol == "function" && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
            };
            function s() {
            }
            s.lastID = 0, s.createID = function(o) {
              return s.isPrimitive(o) ? o : (o.uniqueID != null || (o.uniqueID = s.getString(), s.lastID++), o.uniqueID);
            }, s.getString = function(o) {
              return o == null && (o = s.lastID), "Object#" + o;
            }, s.isPrimitive = function(o) {
              var u = typeof o > "u" ? "undefined" : i(o);
              return o == null || u != "object" && u != "function";
            }, r.exports = s;
          },
          /* 15 */
          /***/
          function(r, a, n) {
            function i(g) {
              if (Array.isArray(g)) {
                for (var y = 0, p = Array(g.length); y < g.length; y++)
                  p[y] = g[y];
                return p;
              } else
                return Array.from(g);
            }
            var s = n(0), o = n(6), u = n(3), l = n(1), f = n(5), h = n(4), c = n(17), v = n(27);
            function d(g) {
              v.call(this), this.layoutQuality = s.QUALITY, this.createBendsAsNeeded = s.DEFAULT_CREATE_BENDS_AS_NEEDED, this.incremental = s.DEFAULT_INCREMENTAL, this.animationOnLayout = s.DEFAULT_ANIMATION_ON_LAYOUT, this.animationDuringLayout = s.DEFAULT_ANIMATION_DURING_LAYOUT, this.animationPeriod = s.DEFAULT_ANIMATION_PERIOD, this.uniformLeafNodeSizes = s.DEFAULT_UNIFORM_LEAF_NODE_SIZES, this.edgeToDummyNodes = /* @__PURE__ */ new Map(), this.graphManager = new o(this), this.isLayoutFinished = !1, this.isSubLayout = !1, this.isRemoteUse = !1, g != null && (this.isRemoteUse = g);
            }
            d.RANDOM_SEED = 1, d.prototype = Object.create(v.prototype), d.prototype.getGraphManager = function() {
              return this.graphManager;
            }, d.prototype.getAllNodes = function() {
              return this.graphManager.getAllNodes();
            }, d.prototype.getAllEdges = function() {
              return this.graphManager.getAllEdges();
            }, d.prototype.getAllNodesToApplyGravitation = function() {
              return this.graphManager.getAllNodesToApplyGravitation();
            }, d.prototype.newGraphManager = function() {
              var g = new o(this);
              return this.graphManager = g, g;
            }, d.prototype.newGraph = function(g) {
              return new f(null, this.graphManager, g);
            }, d.prototype.newNode = function(g) {
              return new u(this.graphManager, g);
            }, d.prototype.newEdge = function(g) {
              return new l(null, null, g);
            }, d.prototype.checkLayoutSuccess = function() {
              return this.graphManager.getRoot() == null || this.graphManager.getRoot().getNodes().length == 0 || this.graphManager.includesInvalidEdge();
            }, d.prototype.runLayout = function() {
              this.isLayoutFinished = !1, this.tilingPreLayout && this.tilingPreLayout(), this.initParameters();
              var g;
              return this.checkLayoutSuccess() ? g = !1 : g = this.layout(), s.ANIMATE === "during" ? !1 : (g && (this.isSubLayout || this.doPostLayout()), this.tilingPostLayout && this.tilingPostLayout(), this.isLayoutFinished = !0, g);
            }, d.prototype.doPostLayout = function() {
              this.incremental || this.transform(), this.update();
            }, d.prototype.update2 = function() {
              if (this.createBendsAsNeeded && (this.createBendpointsFromDummyNodes(), this.graphManager.resetAllEdges()), !this.isRemoteUse) {
                for (var g = this.graphManager.getAllEdges(), y = 0; y < g.length; y++)
                  g[y];
                for (var p = this.graphManager.getRoot().getNodes(), y = 0; y < p.length; y++)
                  p[y];
                this.update(this.graphManager.getRoot());
              }
            }, d.prototype.update = function(g) {
              if (g == null)
                this.update2();
              else if (g instanceof u) {
                var y = g;
                if (y.getChild() != null)
                  for (var p = y.getChild().getNodes(), E = 0; E < p.length; E++)
                    update(p[E]);
                if (y.vGraphObject != null) {
                  var m = y.vGraphObject;
                  m.update(y);
                }
              } else if (g instanceof l) {
                var T = g;
                if (T.vGraphObject != null) {
                  var C = T.vGraphObject;
                  C.update(T);
                }
              } else if (g instanceof f) {
                var S = g;
                if (S.vGraphObject != null) {
                  var b = S.vGraphObject;
                  b.update(S);
                }
              }
            }, d.prototype.initParameters = function() {
              this.isSubLayout || (this.layoutQuality = s.QUALITY, this.animationDuringLayout = s.DEFAULT_ANIMATION_DURING_LAYOUT, this.animationPeriod = s.DEFAULT_ANIMATION_PERIOD, this.animationOnLayout = s.DEFAULT_ANIMATION_ON_LAYOUT, this.incremental = s.DEFAULT_INCREMENTAL, this.createBendsAsNeeded = s.DEFAULT_CREATE_BENDS_AS_NEEDED, this.uniformLeafNodeSizes = s.DEFAULT_UNIFORM_LEAF_NODE_SIZES), this.animationDuringLayout && (this.animationOnLayout = !1);
            }, d.prototype.transform = function(g) {
              if (g == null)
                this.transform(new h(0, 0));
              else {
                var y = new c(), p = this.graphManager.getRoot().updateLeftTop();
                if (p != null) {
                  y.setWorldOrgX(g.x), y.setWorldOrgY(g.y), y.setDeviceOrgX(p.x), y.setDeviceOrgY(p.y);
                  for (var E = this.getAllNodes(), m, T = 0; T < E.length; T++)
                    m = E[T], m.transform(y);
                }
              }
            }, d.prototype.positionNodesRandomly = function(g) {
              if (g == null)
                this.positionNodesRandomly(this.getGraphManager().getRoot()), this.getGraphManager().getRoot().updateBounds(!0);
              else
                for (var y, p, E = g.getNodes(), m = 0; m < E.length; m++)
                  y = E[m], p = y.getChild(), p == null || p.getNodes().length == 0 ? y.scatter() : (this.positionNodesRandomly(p), y.updateBounds());
            }, d.prototype.getFlatForest = function() {
              for (var g = [], y = !0, p = this.graphManager.getRoot().getNodes(), E = !0, m = 0; m < p.length; m++)
                p[m].getChild() != null && (E = !1);
              if (!E)
                return g;
              var T = /* @__PURE__ */ new Set(), C = [], S = /* @__PURE__ */ new Map(), b = [];
              for (b = b.concat(p); b.length > 0 && y; ) {
                for (C.push(b[0]); C.length > 0 && y; ) {
                  var x = C[0];
                  C.splice(0, 1), T.add(x);
                  for (var w = x.getEdges(), m = 0; m < w.length; m++) {
                    var D = w[m].getOtherEnd(x);
                    if (S.get(x) != D)
                      if (!T.has(D))
                        C.push(D), S.set(D, x);
                      else {
                        y = !1;
                        break;
                      }
                  }
                }
                if (!y)
                  g = [];
                else {
                  var A = [].concat(i(T));
                  g.push(A);
                  for (var m = 0; m < A.length; m++) {
                    var L = A[m], M = b.indexOf(L);
                    M > -1 && b.splice(M, 1);
                  }
                  T = /* @__PURE__ */ new Set(), S = /* @__PURE__ */ new Map();
                }
              }
              return g;
            }, d.prototype.createDummyNodesForBendpoints = function(g) {
              for (var y = [], p = g.source, E = this.graphManager.calcLowestCommonAncestor(g.source, g.target), m = 0; m < g.bendpoints.length; m++) {
                var T = this.newNode(null);
                T.setRect(new Point(0, 0), new Dimension(1, 1)), E.add(T);
                var C = this.newEdge(null);
                this.graphManager.add(C, p, T), y.add(T), p = T;
              }
              var C = this.newEdge(null);
              return this.graphManager.add(C, p, g.target), this.edgeToDummyNodes.set(g, y), g.isInterGraph() ? this.graphManager.remove(g) : E.remove(g), y;
            }, d.prototype.createBendpointsFromDummyNodes = function() {
              var g = [];
              g = g.concat(this.graphManager.getAllEdges()), g = [].concat(i(this.edgeToDummyNodes.keys())).concat(g);
              for (var y = 0; y < g.length; y++) {
                var p = g[y];
                if (p.bendpoints.length > 0) {
                  for (var E = this.edgeToDummyNodes.get(p), m = 0; m < E.length; m++) {
                    var T = E[m], C = new h(T.getCenterX(), T.getCenterY()), S = p.bendpoints.get(m);
                    S.x = C.x, S.y = C.y, T.getOwner().remove(T);
                  }
                  this.graphManager.add(p, p.source, p.target);
                }
              }
            }, d.transform = function(g, y, p, E) {
              if (p != null && E != null) {
                var m = y;
                if (g <= 50) {
                  var T = y / p;
                  m -= (y - T) / 50 * (50 - g);
                } else {
                  var C = y * E;
                  m += (C - y) / 50 * (g - 50);
                }
                return m;
              } else {
                var S, b;
                return g <= 50 ? (S = 9 * y / 500, b = y / 10) : (S = 9 * y / 50, b = -8 * y), S * g + b;
              }
            }, d.findCenterOfTree = function(g) {
              var y = [];
              y = y.concat(g);
              var p = [], E = /* @__PURE__ */ new Map(), m = !1, T = null;
              (y.length == 1 || y.length == 2) && (m = !0, T = y[0]);
              for (var C = 0; C < y.length; C++) {
                var S = y[C], b = S.getNeighborsList().size;
                E.set(S, S.getNeighborsList().size), b == 1 && p.push(S);
              }
              var x = [];
              for (x = x.concat(p); !m; ) {
                var w = [];
                w = w.concat(x), x = [];
                for (var C = 0; C < y.length; C++) {
                  var S = y[C], D = y.indexOf(S);
                  D >= 0 && y.splice(D, 1);
                  var A = S.getNeighborsList();
                  A.forEach(function(O) {
                    if (p.indexOf(O) < 0) {
                      var P = E.get(O), I = P - 1;
                      I == 1 && x.push(O), E.set(O, I);
                    }
                  });
                }
                p = p.concat(x), (y.length == 1 || y.length == 2) && (m = !0, T = y[0]);
              }
              return T;
            }, d.prototype.setGraphManager = function(g) {
              this.graphManager = g;
            }, r.exports = d;
          },
          /* 16 */
          /***/
          function(r, a, n) {
            function i() {
            }
            i.seed = 1, i.x = 0, i.nextDouble = function() {
              return i.x = Math.sin(i.seed++) * 1e4, i.x - Math.floor(i.x);
            }, r.exports = i;
          },
          /* 17 */
          /***/
          function(r, a, n) {
            var i = n(4);
            function s(o, u) {
              this.lworldOrgX = 0, this.lworldOrgY = 0, this.ldeviceOrgX = 0, this.ldeviceOrgY = 0, this.lworldExtX = 1, this.lworldExtY = 1, this.ldeviceExtX = 1, this.ldeviceExtY = 1;
            }
            s.prototype.getWorldOrgX = function() {
              return this.lworldOrgX;
            }, s.prototype.setWorldOrgX = function(o) {
              this.lworldOrgX = o;
            }, s.prototype.getWorldOrgY = function() {
              return this.lworldOrgY;
            }, s.prototype.setWorldOrgY = function(o) {
              this.lworldOrgY = o;
            }, s.prototype.getWorldExtX = function() {
              return this.lworldExtX;
            }, s.prototype.setWorldExtX = function(o) {
              this.lworldExtX = o;
            }, s.prototype.getWorldExtY = function() {
              return this.lworldExtY;
            }, s.prototype.setWorldExtY = function(o) {
              this.lworldExtY = o;
            }, s.prototype.getDeviceOrgX = function() {
              return this.ldeviceOrgX;
            }, s.prototype.setDeviceOrgX = function(o) {
              this.ldeviceOrgX = o;
            }, s.prototype.getDeviceOrgY = function() {
              return this.ldeviceOrgY;
            }, s.prototype.setDeviceOrgY = function(o) {
              this.ldeviceOrgY = o;
            }, s.prototype.getDeviceExtX = function() {
              return this.ldeviceExtX;
            }, s.prototype.setDeviceExtX = function(o) {
              this.ldeviceExtX = o;
            }, s.prototype.getDeviceExtY = function() {
              return this.ldeviceExtY;
            }, s.prototype.setDeviceExtY = function(o) {
              this.ldeviceExtY = o;
            }, s.prototype.transformX = function(o) {
              var u = 0, l = this.lworldExtX;
              return l != 0 && (u = this.ldeviceOrgX + (o - this.lworldOrgX) * this.ldeviceExtX / l), u;
            }, s.prototype.transformY = function(o) {
              var u = 0, l = this.lworldExtY;
              return l != 0 && (u = this.ldeviceOrgY + (o - this.lworldOrgY) * this.ldeviceExtY / l), u;
            }, s.prototype.inverseTransformX = function(o) {
              var u = 0, l = this.ldeviceExtX;
              return l != 0 && (u = this.lworldOrgX + (o - this.ldeviceOrgX) * this.lworldExtX / l), u;
            }, s.prototype.inverseTransformY = function(o) {
              var u = 0, l = this.ldeviceExtY;
              return l != 0 && (u = this.lworldOrgY + (o - this.ldeviceOrgY) * this.lworldExtY / l), u;
            }, s.prototype.inverseTransformPoint = function(o) {
              var u = new i(this.inverseTransformX(o.x), this.inverseTransformY(o.y));
              return u;
            }, r.exports = s;
          },
          /* 18 */
          /***/
          function(r, a, n) {
            function i(v) {
              if (Array.isArray(v)) {
                for (var d = 0, g = Array(v.length); d < v.length; d++)
                  g[d] = v[d];
                return g;
              } else
                return Array.from(v);
            }
            var s = n(15), o = n(7), u = n(0), l = n(8), f = n(9);
            function h() {
              s.call(this), this.useSmartIdealEdgeLengthCalculation = o.DEFAULT_USE_SMART_IDEAL_EDGE_LENGTH_CALCULATION, this.idealEdgeLength = o.DEFAULT_EDGE_LENGTH, this.springConstant = o.DEFAULT_SPRING_STRENGTH, this.repulsionConstant = o.DEFAULT_REPULSION_STRENGTH, this.gravityConstant = o.DEFAULT_GRAVITY_STRENGTH, this.compoundGravityConstant = o.DEFAULT_COMPOUND_GRAVITY_STRENGTH, this.gravityRangeFactor = o.DEFAULT_GRAVITY_RANGE_FACTOR, this.compoundGravityRangeFactor = o.DEFAULT_COMPOUND_GRAVITY_RANGE_FACTOR, this.displacementThresholdPerNode = 3 * o.DEFAULT_EDGE_LENGTH / 100, this.coolingFactor = o.DEFAULT_COOLING_FACTOR_INCREMENTAL, this.initialCoolingFactor = o.DEFAULT_COOLING_FACTOR_INCREMENTAL, this.totalDisplacement = 0, this.oldTotalDisplacement = 0, this.maxIterations = o.MAX_ITERATIONS;
            }
            h.prototype = Object.create(s.prototype);
            for (var c in s)
              h[c] = s[c];
            h.prototype.initParameters = function() {
              s.prototype.initParameters.call(this, arguments), this.totalIterations = 0, this.notAnimatedIterations = 0, this.useFRGridVariant = o.DEFAULT_USE_SMART_REPULSION_RANGE_CALCULATION, this.grid = [];
            }, h.prototype.calcIdealEdgeLengths = function() {
              for (var v, d, g, y, p, E, m = this.getGraphManager().getAllEdges(), T = 0; T < m.length; T++)
                v = m[T], v.idealLength = this.idealEdgeLength, v.isInterGraph && (g = v.getSource(), y = v.getTarget(), p = v.getSourceInLca().getEstimatedSize(), E = v.getTargetInLca().getEstimatedSize(), this.useSmartIdealEdgeLengthCalculation && (v.idealLength += p + E - 2 * u.SIMPLE_NODE_SIZE), d = v.getLca().getInclusionTreeDepth(), v.idealLength += o.DEFAULT_EDGE_LENGTH * o.PER_LEVEL_IDEAL_EDGE_LENGTH_FACTOR * (g.getInclusionTreeDepth() + y.getInclusionTreeDepth() - 2 * d));
            }, h.prototype.initSpringEmbedder = function() {
              var v = this.getAllNodes().length;
              this.incremental ? (v > o.ADAPTATION_LOWER_NODE_LIMIT && (this.coolingFactor = Math.max(this.coolingFactor * o.COOLING_ADAPTATION_FACTOR, this.coolingFactor - (v - o.ADAPTATION_LOWER_NODE_LIMIT) / (o.ADAPTATION_UPPER_NODE_LIMIT - o.ADAPTATION_LOWER_NODE_LIMIT) * this.coolingFactor * (1 - o.COOLING_ADAPTATION_FACTOR))), this.maxNodeDisplacement = o.MAX_NODE_DISPLACEMENT_INCREMENTAL) : (v > o.ADAPTATION_LOWER_NODE_LIMIT ? this.coolingFactor = Math.max(o.COOLING_ADAPTATION_FACTOR, 1 - (v - o.ADAPTATION_LOWER_NODE_LIMIT) / (o.ADAPTATION_UPPER_NODE_LIMIT - o.ADAPTATION_LOWER_NODE_LIMIT) * (1 - o.COOLING_ADAPTATION_FACTOR)) : this.coolingFactor = 1, this.initialCoolingFactor = this.coolingFactor, this.maxNodeDisplacement = o.MAX_NODE_DISPLACEMENT), this.maxIterations = Math.max(this.getAllNodes().length * 5, this.maxIterations), this.totalDisplacementThreshold = this.displacementThresholdPerNode * this.getAllNodes().length, this.repulsionRange = this.calcRepulsionRange();
            }, h.prototype.calcSpringForces = function() {
              for (var v = this.getAllEdges(), d, g = 0; g < v.length; g++)
                d = v[g], this.calcSpringForce(d, d.idealLength);
            }, h.prototype.calcRepulsionForces = function() {
              var v = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !0, d = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1, g, y, p, E, m = this.getAllNodes(), T;
              if (this.useFRGridVariant)
                for (this.totalIterations % o.GRID_CALCULATION_CHECK_PERIOD == 1 && v && this.updateGrid(), T = /* @__PURE__ */ new Set(), g = 0; g < m.length; g++)
                  p = m[g], this.calculateRepulsionForceOfANode(p, T, v, d), T.add(p);
              else
                for (g = 0; g < m.length; g++)
                  for (p = m[g], y = g + 1; y < m.length; y++)
                    E = m[y], p.getOwner() == E.getOwner() && this.calcRepulsionForce(p, E);
            }, h.prototype.calcGravitationalForces = function() {
              for (var v, d = this.getAllNodesToApplyGravitation(), g = 0; g < d.length; g++)
                v = d[g], this.calcGravitationalForce(v);
            }, h.prototype.moveNodes = function() {
              for (var v = this.getAllNodes(), d, g = 0; g < v.length; g++)
                d = v[g], d.move();
            }, h.prototype.calcSpringForce = function(v, d) {
              var g = v.getSource(), y = v.getTarget(), p, E, m, T;
              if (this.uniformLeafNodeSizes && g.getChild() == null && y.getChild() == null)
                v.updateLengthSimple();
              else if (v.updateLength(), v.isOverlapingSourceAndTarget)
                return;
              p = v.getLength(), p != 0 && (E = this.springConstant * (p - d), m = E * (v.lengthX / p), T = E * (v.lengthY / p), g.springForceX += m, g.springForceY += T, y.springForceX -= m, y.springForceY -= T);
            }, h.prototype.calcRepulsionForce = function(v, d) {
              var g = v.getRect(), y = d.getRect(), p = new Array(2), E = new Array(4), m, T, C, S, b, x, w;
              if (g.intersects(y)) {
                l.calcSeparationAmount(g, y, p, o.DEFAULT_EDGE_LENGTH / 2), x = 2 * p[0], w = 2 * p[1];
                var D = v.noOfChildren * d.noOfChildren / (v.noOfChildren + d.noOfChildren);
                v.repulsionForceX -= D * x, v.repulsionForceY -= D * w, d.repulsionForceX += D * x, d.repulsionForceY += D * w;
              } else
                this.uniformLeafNodeSizes && v.getChild() == null && d.getChild() == null ? (m = y.getCenterX() - g.getCenterX(), T = y.getCenterY() - g.getCenterY()) : (l.getIntersection(g, y, E), m = E[2] - E[0], T = E[3] - E[1]), Math.abs(m) < o.MIN_REPULSION_DIST && (m = f.sign(m) * o.MIN_REPULSION_DIST), Math.abs(T) < o.MIN_REPULSION_DIST && (T = f.sign(T) * o.MIN_REPULSION_DIST), C = m * m + T * T, S = Math.sqrt(C), b = this.repulsionConstant * v.noOfChildren * d.noOfChildren / C, x = b * m / S, w = b * T / S, v.repulsionForceX -= x, v.repulsionForceY -= w, d.repulsionForceX += x, d.repulsionForceY += w;
            }, h.prototype.calcGravitationalForce = function(v) {
              var d, g, y, p, E, m, T, C;
              d = v.getOwner(), g = (d.getRight() + d.getLeft()) / 2, y = (d.getTop() + d.getBottom()) / 2, p = v.getCenterX() - g, E = v.getCenterY() - y, m = Math.abs(p) + v.getWidth() / 2, T = Math.abs(E) + v.getHeight() / 2, v.getOwner() == this.graphManager.getRoot() ? (C = d.getEstimatedSize() * this.gravityRangeFactor, (m > C || T > C) && (v.gravitationForceX = -this.gravityConstant * p, v.gravitationForceY = -this.gravityConstant * E)) : (C = d.getEstimatedSize() * this.compoundGravityRangeFactor, (m > C || T > C) && (v.gravitationForceX = -this.gravityConstant * p * this.compoundGravityConstant, v.gravitationForceY = -this.gravityConstant * E * this.compoundGravityConstant));
            }, h.prototype.isConverged = function() {
              var v, d = !1;
              return this.totalIterations > this.maxIterations / 3 && (d = Math.abs(this.totalDisplacement - this.oldTotalDisplacement) < 2), v = this.totalDisplacement < this.totalDisplacementThreshold, this.oldTotalDisplacement = this.totalDisplacement, v || d;
            }, h.prototype.animate = function() {
              this.animationDuringLayout && !this.isSubLayout && (this.notAnimatedIterations == this.animationPeriod ? (this.update(), this.notAnimatedIterations = 0) : this.notAnimatedIterations++);
            }, h.prototype.calcNoOfChildrenForAllNodes = function() {
              for (var v, d = this.graphManager.getAllNodes(), g = 0; g < d.length; g++)
                v = d[g], v.noOfChildren = v.getNoOfChildren();
            }, h.prototype.calcGrid = function(v) {
              var d = 0, g = 0;
              d = parseInt(Math.ceil((v.getRight() - v.getLeft()) / this.repulsionRange)), g = parseInt(Math.ceil((v.getBottom() - v.getTop()) / this.repulsionRange));
              for (var y = new Array(d), p = 0; p < d; p++)
                y[p] = new Array(g);
              for (var p = 0; p < d; p++)
                for (var E = 0; E < g; E++)
                  y[p][E] = new Array();
              return y;
            }, h.prototype.addNodeToGrid = function(v, d, g) {
              var y = 0, p = 0, E = 0, m = 0;
              y = parseInt(Math.floor((v.getRect().x - d) / this.repulsionRange)), p = parseInt(Math.floor((v.getRect().width + v.getRect().x - d) / this.repulsionRange)), E = parseInt(Math.floor((v.getRect().y - g) / this.repulsionRange)), m = parseInt(Math.floor((v.getRect().height + v.getRect().y - g) / this.repulsionRange));
              for (var T = y; T <= p; T++)
                for (var C = E; C <= m; C++)
                  this.grid[T][C].push(v), v.setGridCoordinates(y, p, E, m);
            }, h.prototype.updateGrid = function() {
              var v, d, g = this.getAllNodes();
              for (this.grid = this.calcGrid(this.graphManager.getRoot()), v = 0; v < g.length; v++)
                d = g[v], this.addNodeToGrid(d, this.graphManager.getRoot().getLeft(), this.graphManager.getRoot().getTop());
            }, h.prototype.calculateRepulsionForceOfANode = function(v, d, g, y) {
              if (this.totalIterations % o.GRID_CALCULATION_CHECK_PERIOD == 1 && g || y) {
                var p = /* @__PURE__ */ new Set();
                v.surrounding = new Array();
                for (var E, m = this.grid, T = v.startX - 1; T < v.finishX + 2; T++)
                  for (var C = v.startY - 1; C < v.finishY + 2; C++)
                    if (!(T < 0 || C < 0 || T >= m.length || C >= m[0].length)) {
                      for (var S = 0; S < m[T][C].length; S++)
                        if (E = m[T][C][S], !(v.getOwner() != E.getOwner() || v == E) && !d.has(E) && !p.has(E)) {
                          var b = Math.abs(v.getCenterX() - E.getCenterX()) - (v.getWidth() / 2 + E.getWidth() / 2), x = Math.abs(v.getCenterY() - E.getCenterY()) - (v.getHeight() / 2 + E.getHeight() / 2);
                          b <= this.repulsionRange && x <= this.repulsionRange && p.add(E);
                        }
                    }
                v.surrounding = [].concat(i(p));
              }
              for (T = 0; T < v.surrounding.length; T++)
                this.calcRepulsionForce(v, v.surrounding[T]);
            }, h.prototype.calcRepulsionRange = function() {
              return 0;
            }, r.exports = h;
          },
          /* 19 */
          /***/
          function(r, a, n) {
            var i = n(1), s = n(7);
            function o(l, f, h) {
              i.call(this, l, f, h), this.idealLength = s.DEFAULT_EDGE_LENGTH;
            }
            o.prototype = Object.create(i.prototype);
            for (var u in i)
              o[u] = i[u];
            r.exports = o;
          },
          /* 20 */
          /***/
          function(r, a, n) {
            var i = n(3);
            function s(u, l, f, h) {
              i.call(this, u, l, f, h), this.springForceX = 0, this.springForceY = 0, this.repulsionForceX = 0, this.repulsionForceY = 0, this.gravitationForceX = 0, this.gravitationForceY = 0, this.displacementX = 0, this.displacementY = 0, this.startX = 0, this.finishX = 0, this.startY = 0, this.finishY = 0, this.surrounding = [];
            }
            s.prototype = Object.create(i.prototype);
            for (var o in i)
              s[o] = i[o];
            s.prototype.setGridCoordinates = function(u, l, f, h) {
              this.startX = u, this.finishX = l, this.startY = f, this.finishY = h;
            }, r.exports = s;
          },
          /* 21 */
          /***/
          function(r, a, n) {
            function i(s, o) {
              this.width = 0, this.height = 0, s !== null && o !== null && (this.height = o, this.width = s);
            }
            i.prototype.getWidth = function() {
              return this.width;
            }, i.prototype.setWidth = function(s) {
              this.width = s;
            }, i.prototype.getHeight = function() {
              return this.height;
            }, i.prototype.setHeight = function(s) {
              this.height = s;
            }, r.exports = i;
          },
          /* 22 */
          /***/
          function(r, a, n) {
            var i = n(14);
            function s() {
              this.map = {}, this.keys = [];
            }
            s.prototype.put = function(o, u) {
              var l = i.createID(o);
              this.contains(l) || (this.map[l] = u, this.keys.push(o));
            }, s.prototype.contains = function(o) {
              return i.createID(o), this.map[o] != null;
            }, s.prototype.get = function(o) {
              var u = i.createID(o);
              return this.map[u];
            }, s.prototype.keySet = function() {
              return this.keys;
            }, r.exports = s;
          },
          /* 23 */
          /***/
          function(r, a, n) {
            var i = n(14);
            function s() {
              this.set = {};
            }
            s.prototype.add = function(o) {
              var u = i.createID(o);
              this.contains(u) || (this.set[u] = o);
            }, s.prototype.remove = function(o) {
              delete this.set[i.createID(o)];
            }, s.prototype.clear = function() {
              this.set = {};
            }, s.prototype.contains = function(o) {
              return this.set[i.createID(o)] == o;
            }, s.prototype.isEmpty = function() {
              return this.size() === 0;
            }, s.prototype.size = function() {
              return Object.keys(this.set).length;
            }, s.prototype.addAllTo = function(o) {
              for (var u = Object.keys(this.set), l = u.length, f = 0; f < l; f++)
                o.push(this.set[u[f]]);
            }, s.prototype.size = function() {
              return Object.keys(this.set).length;
            }, s.prototype.addAll = function(o) {
              for (var u = o.length, l = 0; l < u; l++) {
                var f = o[l];
                this.add(f);
              }
            }, r.exports = s;
          },
          /* 24 */
          /***/
          function(r, a, n) {
            var i = function() {
              function l(f, h) {
                for (var c = 0; c < h.length; c++) {
                  var v = h[c];
                  v.enumerable = v.enumerable || !1, v.configurable = !0, "value" in v && (v.writable = !0), Object.defineProperty(f, v.key, v);
                }
              }
              return function(f, h, c) {
                return h && l(f.prototype, h), c && l(f, c), f;
              };
            }();
            function s(l, f) {
              if (!(l instanceof f))
                throw new TypeError("Cannot call a class as a function");
            }
            var o = n(11), u = function() {
              function l(f, h) {
                s(this, l), (h !== null || h !== void 0) && (this.compareFunction = this._defaultCompareFunction);
                var c = void 0;
                f instanceof o ? c = f.size() : c = f.length, this._quicksort(f, 0, c - 1);
              }
              return i(l, [{
                key: "_quicksort",
                value: function(h, c, v) {
                  if (c < v) {
                    var d = this._partition(h, c, v);
                    this._quicksort(h, c, d), this._quicksort(h, d + 1, v);
                  }
                }
              }, {
                key: "_partition",
                value: function(h, c, v) {
                  for (var d = this._get(h, c), g = c, y = v; ; ) {
                    for (; this.compareFunction(d, this._get(h, y)); )
                      y--;
                    for (; this.compareFunction(this._get(h, g), d); )
                      g++;
                    if (g < y)
                      this._swap(h, g, y), g++, y--;
                    else
                      return y;
                  }
                }
              }, {
                key: "_get",
                value: function(h, c) {
                  return h instanceof o ? h.get_object_at(c) : h[c];
                }
              }, {
                key: "_set",
                value: function(h, c, v) {
                  h instanceof o ? h.set_object_at(c, v) : h[c] = v;
                }
              }, {
                key: "_swap",
                value: function(h, c, v) {
                  var d = this._get(h, c);
                  this._set(h, c, this._get(h, v)), this._set(h, v, d);
                }
              }, {
                key: "_defaultCompareFunction",
                value: function(h, c) {
                  return c > h;
                }
              }]), l;
            }();
            r.exports = u;
          },
          /* 25 */
          /***/
          function(r, a, n) {
            var i = function() {
              function u(l, f) {
                for (var h = 0; h < f.length; h++) {
                  var c = f[h];
                  c.enumerable = c.enumerable || !1, c.configurable = !0, "value" in c && (c.writable = !0), Object.defineProperty(l, c.key, c);
                }
              }
              return function(l, f, h) {
                return f && u(l.prototype, f), h && u(l, h), l;
              };
            }();
            function s(u, l) {
              if (!(u instanceof l))
                throw new TypeError("Cannot call a class as a function");
            }
            var o = function() {
              function u(l, f) {
                var h = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 1, c = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : -1, v = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : -1;
                s(this, u), this.sequence1 = l, this.sequence2 = f, this.match_score = h, this.mismatch_penalty = c, this.gap_penalty = v, this.iMax = l.length + 1, this.jMax = f.length + 1, this.grid = new Array(this.iMax);
                for (var d = 0; d < this.iMax; d++) {
                  this.grid[d] = new Array(this.jMax);
                  for (var g = 0; g < this.jMax; g++)
                    this.grid[d][g] = 0;
                }
                this.tracebackGrid = new Array(this.iMax);
                for (var y = 0; y < this.iMax; y++) {
                  this.tracebackGrid[y] = new Array(this.jMax);
                  for (var p = 0; p < this.jMax; p++)
                    this.tracebackGrid[y][p] = [null, null, null];
                }
                this.alignments = [], this.score = -1, this.computeGrids();
              }
              return i(u, [{
                key: "getScore",
                value: function() {
                  return this.score;
                }
              }, {
                key: "getAlignments",
                value: function() {
                  return this.alignments;
                }
                // Main dynamic programming procedure
              }, {
                key: "computeGrids",
                value: function() {
                  for (var f = 1; f < this.jMax; f++)
                    this.grid[0][f] = this.grid[0][f - 1] + this.gap_penalty, this.tracebackGrid[0][f] = [!1, !1, !0];
                  for (var h = 1; h < this.iMax; h++)
                    this.grid[h][0] = this.grid[h - 1][0] + this.gap_penalty, this.tracebackGrid[h][0] = [!1, !0, !1];
                  for (var c = 1; c < this.iMax; c++)
                    for (var v = 1; v < this.jMax; v++) {
                      var d = void 0;
                      this.sequence1[c - 1] === this.sequence2[v - 1] ? d = this.grid[c - 1][v - 1] + this.match_score : d = this.grid[c - 1][v - 1] + this.mismatch_penalty;
                      var g = this.grid[c - 1][v] + this.gap_penalty, y = this.grid[c][v - 1] + this.gap_penalty, p = [d, g, y], E = this.arrayAllMaxIndexes(p);
                      this.grid[c][v] = p[E[0]], this.tracebackGrid[c][v] = [E.includes(0), E.includes(1), E.includes(2)];
                    }
                  this.score = this.grid[this.iMax - 1][this.jMax - 1];
                }
                // Gets all possible valid sequence combinations
              }, {
                key: "alignmentTraceback",
                value: function() {
                  var f = [];
                  for (f.push({
                    pos: [this.sequence1.length, this.sequence2.length],
                    seq1: "",
                    seq2: ""
                  }); f[0]; ) {
                    var h = f[0], c = this.tracebackGrid[h.pos[0]][h.pos[1]];
                    c[0] && f.push({
                      pos: [h.pos[0] - 1, h.pos[1] - 1],
                      seq1: this.sequence1[h.pos[0] - 1] + h.seq1,
                      seq2: this.sequence2[h.pos[1] - 1] + h.seq2
                    }), c[1] && f.push({
                      pos: [h.pos[0] - 1, h.pos[1]],
                      seq1: this.sequence1[h.pos[0] - 1] + h.seq1,
                      seq2: "-" + h.seq2
                    }), c[2] && f.push({
                      pos: [h.pos[0], h.pos[1] - 1],
                      seq1: "-" + h.seq1,
                      seq2: this.sequence2[h.pos[1] - 1] + h.seq2
                    }), h.pos[0] === 0 && h.pos[1] === 0 && this.alignments.push({
                      sequence1: h.seq1,
                      sequence2: h.seq2
                    }), f.shift();
                  }
                  return this.alignments;
                }
                // Helper Functions
              }, {
                key: "getAllIndexes",
                value: function(f, h) {
                  for (var c = [], v = -1; (v = f.indexOf(h, v + 1)) !== -1; )
                    c.push(v);
                  return c;
                }
              }, {
                key: "arrayAllMaxIndexes",
                value: function(f) {
                  return this.getAllIndexes(f, Math.max.apply(null, f));
                }
              }]), u;
            }();
            r.exports = o;
          },
          /* 26 */
          /***/
          function(r, a, n) {
            var i = function() {
            };
            i.FDLayout = n(18), i.FDLayoutConstants = n(7), i.FDLayoutEdge = n(19), i.FDLayoutNode = n(20), i.DimensionD = n(21), i.HashMap = n(22), i.HashSet = n(23), i.IGeometry = n(8), i.IMath = n(9), i.Integer = n(10), i.Point = n(12), i.PointD = n(4), i.RandomSeed = n(16), i.RectangleD = n(13), i.Transform = n(17), i.UniqueIDGeneretor = n(14), i.Quicksort = n(24), i.LinkedList = n(11), i.LGraphObject = n(2), i.LGraph = n(5), i.LEdge = n(1), i.LGraphManager = n(6), i.LNode = n(3), i.Layout = n(15), i.LayoutConstants = n(0), i.NeedlemanWunsch = n(25), r.exports = i;
          },
          /* 27 */
          /***/
          function(r, a, n) {
            function i() {
              this.listeners = [];
            }
            var s = i.prototype;
            s.addListener = function(o, u) {
              this.listeners.push({
                event: o,
                callback: u
              });
            }, s.removeListener = function(o, u) {
              for (var l = this.listeners.length; l >= 0; l--) {
                var f = this.listeners[l];
                f.event === o && f.callback === u && this.listeners.splice(l, 1);
              }
            }, s.emit = function(o, u) {
              for (var l = 0; l < this.listeners.length; l++) {
                var f = this.listeners[l];
                o === f.event && f.callback(u);
              }
            }, r.exports = i;
          }
          /******/
        ])
      );
    });
  }(Rm)), ja;
}
var Ys;
function Pm() {
  return Ys || (Ys = 1, function(t, e) {
    (function(a, n) {
      t.exports = n(km());
    })($t, function(r) {
      return (
        /******/
        function(a) {
          var n = {};
          function i(s) {
            if (n[s])
              return n[s].exports;
            var o = n[s] = {
              /******/
              i: s,
              /******/
              l: !1,
              /******/
              exports: {}
              /******/
            };
            return a[s].call(o.exports, o, o.exports, i), o.l = !0, o.exports;
          }
          return i.m = a, i.c = n, i.i = function(s) {
            return s;
          }, i.d = function(s, o, u) {
            i.o(s, o) || Object.defineProperty(s, o, {
              /******/
              configurable: !1,
              /******/
              enumerable: !0,
              /******/
              get: u
              /******/
            });
          }, i.n = function(s) {
            var o = s && s.__esModule ? (
              /******/
              function() {
                return s.default;
              }
            ) : (
              /******/
              function() {
                return s;
              }
            );
            return i.d(o, "a", o), o;
          }, i.o = function(s, o) {
            return Object.prototype.hasOwnProperty.call(s, o);
          }, i.p = "", i(i.s = 7);
        }([
          /* 0 */
          /***/
          function(a, n) {
            a.exports = r;
          },
          /* 1 */
          /***/
          function(a, n, i) {
            var s = i(0).FDLayoutConstants;
            function o() {
            }
            for (var u in s)
              o[u] = s[u];
            o.DEFAULT_USE_MULTI_LEVEL_SCALING = !1, o.DEFAULT_RADIAL_SEPARATION = s.DEFAULT_EDGE_LENGTH, o.DEFAULT_COMPONENT_SEPERATION = 60, o.TILE = !0, o.TILING_PADDING_VERTICAL = 10, o.TILING_PADDING_HORIZONTAL = 10, o.TREE_REDUCTION_ON_INCREMENTAL = !1, a.exports = o;
          },
          /* 2 */
          /***/
          function(a, n, i) {
            var s = i(0).FDLayoutEdge;
            function o(l, f, h) {
              s.call(this, l, f, h);
            }
            o.prototype = Object.create(s.prototype);
            for (var u in s)
              o[u] = s[u];
            a.exports = o;
          },
          /* 3 */
          /***/
          function(a, n, i) {
            var s = i(0).LGraph;
            function o(l, f, h) {
              s.call(this, l, f, h);
            }
            o.prototype = Object.create(s.prototype);
            for (var u in s)
              o[u] = s[u];
            a.exports = o;
          },
          /* 4 */
          /***/
          function(a, n, i) {
            var s = i(0).LGraphManager;
            function o(l) {
              s.call(this, l);
            }
            o.prototype = Object.create(s.prototype);
            for (var u in s)
              o[u] = s[u];
            a.exports = o;
          },
          /* 5 */
          /***/
          function(a, n, i) {
            var s = i(0).FDLayoutNode, o = i(0).IMath;
            function u(f, h, c, v) {
              s.call(this, f, h, c, v);
            }
            u.prototype = Object.create(s.prototype);
            for (var l in s)
              u[l] = s[l];
            u.prototype.move = function() {
              var f = this.graphManager.getLayout();
              this.displacementX = f.coolingFactor * (this.springForceX + this.repulsionForceX + this.gravitationForceX) / this.noOfChildren, this.displacementY = f.coolingFactor * (this.springForceY + this.repulsionForceY + this.gravitationForceY) / this.noOfChildren, Math.abs(this.displacementX) > f.coolingFactor * f.maxNodeDisplacement && (this.displacementX = f.coolingFactor * f.maxNodeDisplacement * o.sign(this.displacementX)), Math.abs(this.displacementY) > f.coolingFactor * f.maxNodeDisplacement && (this.displacementY = f.coolingFactor * f.maxNodeDisplacement * o.sign(this.displacementY)), this.child == null ? this.moveBy(this.displacementX, this.displacementY) : this.child.getNodes().length == 0 ? this.moveBy(this.displacementX, this.displacementY) : this.propogateDisplacementToChildren(this.displacementX, this.displacementY), f.totalDisplacement += Math.abs(this.displacementX) + Math.abs(this.displacementY), this.springForceX = 0, this.springForceY = 0, this.repulsionForceX = 0, this.repulsionForceY = 0, this.gravitationForceX = 0, this.gravitationForceY = 0, this.displacementX = 0, this.displacementY = 0;
            }, u.prototype.propogateDisplacementToChildren = function(f, h) {
              for (var c = this.getChild().getNodes(), v, d = 0; d < c.length; d++)
                v = c[d], v.getChild() == null ? (v.moveBy(f, h), v.displacementX += f, v.displacementY += h) : v.propogateDisplacementToChildren(f, h);
            }, u.prototype.setPred1 = function(f) {
              this.pred1 = f;
            }, u.prototype.getPred1 = function() {
              return pred1;
            }, u.prototype.getPred2 = function() {
              return pred2;
            }, u.prototype.setNext = function(f) {
              this.next = f;
            }, u.prototype.getNext = function() {
              return next;
            }, u.prototype.setProcessed = function(f) {
              this.processed = f;
            }, u.prototype.isProcessed = function() {
              return processed;
            }, a.exports = u;
          },
          /* 6 */
          /***/
          function(a, n, i) {
            var s = i(0).FDLayout, o = i(4), u = i(3), l = i(5), f = i(2), h = i(1), c = i(0).FDLayoutConstants, v = i(0).LayoutConstants, d = i(0).Point, g = i(0).PointD, y = i(0).Layout, p = i(0).Integer, E = i(0).IGeometry, m = i(0).LGraph, T = i(0).Transform;
            function C() {
              s.call(this), this.toBeTiled = {};
            }
            C.prototype = Object.create(s.prototype);
            for (var S in s)
              C[S] = s[S];
            C.prototype.newGraphManager = function() {
              var b = new o(this);
              return this.graphManager = b, b;
            }, C.prototype.newGraph = function(b) {
              return new u(null, this.graphManager, b);
            }, C.prototype.newNode = function(b) {
              return new l(this.graphManager, b);
            }, C.prototype.newEdge = function(b) {
              return new f(null, null, b);
            }, C.prototype.initParameters = function() {
              s.prototype.initParameters.call(this, arguments), this.isSubLayout || (h.DEFAULT_EDGE_LENGTH < 10 ? this.idealEdgeLength = 10 : this.idealEdgeLength = h.DEFAULT_EDGE_LENGTH, this.useSmartIdealEdgeLengthCalculation = h.DEFAULT_USE_SMART_IDEAL_EDGE_LENGTH_CALCULATION, this.springConstant = c.DEFAULT_SPRING_STRENGTH, this.repulsionConstant = c.DEFAULT_REPULSION_STRENGTH, this.gravityConstant = c.DEFAULT_GRAVITY_STRENGTH, this.compoundGravityConstant = c.DEFAULT_COMPOUND_GRAVITY_STRENGTH, this.gravityRangeFactor = c.DEFAULT_GRAVITY_RANGE_FACTOR, this.compoundGravityRangeFactor = c.DEFAULT_COMPOUND_GRAVITY_RANGE_FACTOR, this.prunedNodesAll = [], this.growTreeIterations = 0, this.afterGrowthIterations = 0, this.isTreeGrowing = !1, this.isGrowthFinished = !1, this.coolingCycle = 0, this.maxCoolingCycle = this.maxIterations / c.CONVERGENCE_CHECK_PERIOD, this.finalTemperature = c.CONVERGENCE_CHECK_PERIOD / this.maxIterations, this.coolingAdjuster = 1);
            }, C.prototype.layout = function() {
              var b = v.DEFAULT_CREATE_BENDS_AS_NEEDED;
              return b && (this.createBendpoints(), this.graphManager.resetAllEdges()), this.level = 0, this.classicLayout();
            }, C.prototype.classicLayout = function() {
              if (this.nodesWithGravity = this.calculateNodesToApplyGravitationTo(), this.graphManager.setAllNodesToApplyGravitation(this.nodesWithGravity), this.calcNoOfChildrenForAllNodes(), this.graphManager.calcLowestCommonAncestors(), this.graphManager.calcInclusionTreeDepths(), this.graphManager.getRoot().calcEstimatedSize(), this.calcIdealEdgeLengths(), this.incremental) {
                if (h.TREE_REDUCTION_ON_INCREMENTAL) {
                  this.reduceTrees(), this.graphManager.resetAllNodesToApplyGravitation();
                  var x = new Set(this.getAllNodes()), w = this.nodesWithGravity.filter(function(L) {
                    return x.has(L);
                  });
                  this.graphManager.setAllNodesToApplyGravitation(w);
                }
              } else {
                var b = this.getFlatForest();
                if (b.length > 0)
                  this.positionNodesRadially(b);
                else {
                  this.reduceTrees(), this.graphManager.resetAllNodesToApplyGravitation();
                  var x = new Set(this.getAllNodes()), w = this.nodesWithGravity.filter(function(D) {
                    return x.has(D);
                  });
                  this.graphManager.setAllNodesToApplyGravitation(w), this.positionNodesRandomly();
                }
              }
              return this.initSpringEmbedder(), this.runSpringEmbedder(), !0;
            }, C.prototype.tick = function() {
              if (this.totalIterations++, this.totalIterations === this.maxIterations && !this.isTreeGrowing && !this.isGrowthFinished)
                if (this.prunedNodesAll.length > 0)
                  this.isTreeGrowing = !0;
                else
                  return !0;
              if (this.totalIterations % c.CONVERGENCE_CHECK_PERIOD == 0 && !this.isTreeGrowing && !this.isGrowthFinished) {
                if (this.isConverged())
                  if (this.prunedNodesAll.length > 0)
                    this.isTreeGrowing = !0;
                  else
                    return !0;
                this.coolingCycle++, this.layoutQuality == 0 ? this.coolingAdjuster = this.coolingCycle : this.layoutQuality == 1 && (this.coolingAdjuster = this.coolingCycle / 3), this.coolingFactor = Math.max(this.initialCoolingFactor - Math.pow(this.coolingCycle, Math.log(100 * (this.initialCoolingFactor - this.finalTemperature)) / Math.log(this.maxCoolingCycle)) / 100 * this.coolingAdjuster, this.finalTemperature), this.animationPeriod = Math.ceil(this.initialAnimationPeriod * Math.sqrt(this.coolingFactor));
              }
              if (this.isTreeGrowing) {
                if (this.growTreeIterations % 10 == 0)
                  if (this.prunedNodesAll.length > 0) {
                    this.graphManager.updateBounds(), this.updateGrid(), this.growTree(this.prunedNodesAll), this.graphManager.resetAllNodesToApplyGravitation();
                    var b = new Set(this.getAllNodes()), x = this.nodesWithGravity.filter(function(A) {
                      return b.has(A);
                    });
                    this.graphManager.setAllNodesToApplyGravitation(x), this.graphManager.updateBounds(), this.updateGrid(), this.coolingFactor = c.DEFAULT_COOLING_FACTOR_INCREMENTAL;
                  } else
                    this.isTreeGrowing = !1, this.isGrowthFinished = !0;
                this.growTreeIterations++;
              }
              if (this.isGrowthFinished) {
                if (this.isConverged())
                  return !0;
                this.afterGrowthIterations % 10 == 0 && (this.graphManager.updateBounds(), this.updateGrid()), this.coolingFactor = c.DEFAULT_COOLING_FACTOR_INCREMENTAL * ((100 - this.afterGrowthIterations) / 100), this.afterGrowthIterations++;
              }
              var w = !this.isTreeGrowing && !this.isGrowthFinished, D = this.growTreeIterations % 10 == 1 && this.isTreeGrowing || this.afterGrowthIterations % 10 == 1 && this.isGrowthFinished;
              return this.totalDisplacement = 0, this.graphManager.updateBounds(), this.calcSpringForces(), this.calcRepulsionForces(w, D), this.calcGravitationalForces(), this.moveNodes(), this.animate(), !1;
            }, C.prototype.getPositionsData = function() {
              for (var b = this.graphManager.getAllNodes(), x = {}, w = 0; w < b.length; w++) {
                var D = b[w].rect, A = b[w].id;
                x[A] = {
                  id: A,
                  x: D.getCenterX(),
                  y: D.getCenterY(),
                  w: D.width,
                  h: D.height
                };
              }
              return x;
            }, C.prototype.runSpringEmbedder = function() {
              this.initialAnimationPeriod = 25, this.animationPeriod = this.initialAnimationPeriod;
              var b = !1;
              if (c.ANIMATE === "during")
                this.emit("layoutstarted");
              else {
                for (; !b; )
                  b = this.tick();
                this.graphManager.updateBounds();
              }
            }, C.prototype.calculateNodesToApplyGravitationTo = function() {
              var b = [], x, w = this.graphManager.getGraphs(), D = w.length, A;
              for (A = 0; A < D; A++)
                x = w[A], x.updateConnected(), x.isConnected || (b = b.concat(x.getNodes()));
              return b;
            }, C.prototype.createBendpoints = function() {
              var b = [];
              b = b.concat(this.graphManager.getAllEdges());
              var x = /* @__PURE__ */ new Set(), w;
              for (w = 0; w < b.length; w++) {
                var D = b[w];
                if (!x.has(D)) {
                  var A = D.getSource(), L = D.getTarget();
                  if (A == L)
                    D.getBendpoints().push(new g()), D.getBendpoints().push(new g()), this.createDummyNodesForBendpoints(D), x.add(D);
                  else {
                    var M = [];
                    if (M = M.concat(A.getEdgeListToNode(L)), M = M.concat(L.getEdgeListToNode(A)), !x.has(M[0])) {
                      if (M.length > 1) {
                        var O;
                        for (O = 0; O < M.length; O++) {
                          var P = M[O];
                          P.getBendpoints().push(new g()), this.createDummyNodesForBendpoints(P);
                        }
                      }
                      M.forEach(function(I) {
                        x.add(I);
                      });
                    }
                  }
                }
                if (x.size == b.length)
                  break;
              }
            }, C.prototype.positionNodesRadially = function(b) {
              for (var x = new d(0, 0), w = Math.ceil(Math.sqrt(b.length)), D = 0, A = 0, L = 0, M = new g(0, 0), O = 0; O < b.length; O++) {
                O % w == 0 && (L = 0, A = D, O != 0 && (A += h.DEFAULT_COMPONENT_SEPERATION), D = 0);
                var P = b[O], I = y.findCenterOfTree(P);
                x.x = L, x.y = A, M = C.radialLayout(P, I, x), M.y > D && (D = Math.floor(M.y)), L = Math.floor(M.x + h.DEFAULT_COMPONENT_SEPERATION);
              }
              this.transform(new g(v.WORLD_CENTER_X - M.x / 2, v.WORLD_CENTER_Y - M.y / 2));
            }, C.radialLayout = function(b, x, w) {
              var D = Math.max(this.maxDiagonalInTree(b), h.DEFAULT_RADIAL_SEPARATION);
              C.branchRadialLayout(x, null, 0, 359, 0, D);
              var A = m.calculateBounds(b), L = new T();
              L.setDeviceOrgX(A.getMinX()), L.setDeviceOrgY(A.getMinY()), L.setWorldOrgX(w.x), L.setWorldOrgY(w.y);
              for (var M = 0; M < b.length; M++) {
                var O = b[M];
                O.transform(L);
              }
              var P = new g(A.getMaxX(), A.getMaxY());
              return L.inverseTransformPoint(P);
            }, C.branchRadialLayout = function(b, x, w, D, A, L) {
              var M = (D - w + 1) / 2;
              M < 0 && (M += 180);
              var O = (M + w) % 360, P = O * E.TWO_PI / 360, I = A * Math.cos(P), k = A * Math.sin(P);
              b.setCenter(I, k);
              var R = [];
              R = R.concat(b.getEdges());
              var B = R.length;
              x != null && B--;
              for (var z = 0, F = R.length, $, U = b.getEdgesBetween(x); U.length > 1; ) {
                var V = U[0];
                U.splice(0, 1);
                var H = R.indexOf(V);
                H >= 0 && R.splice(H, 1), F--, B--;
              }
              x != null ? $ = (R.indexOf(U[0]) + 1) % F : $ = 0;
              for (var Y = Math.abs(D - w) / B, G = $; z != B; G = ++G % F) {
                var X = R[G].getOtherEnd(b);
                if (X != x) {
                  var K = (w + z * Y) % 360, Z = (K + Y) % 360;
                  C.branchRadialLayout(X, b, K, Z, A + L, L), z++;
                }
              }
            }, C.maxDiagonalInTree = function(b) {
              for (var x = p.MIN_VALUE, w = 0; w < b.length; w++) {
                var D = b[w], A = D.getDiagonal();
                A > x && (x = A);
              }
              return x;
            }, C.prototype.calcRepulsionRange = function() {
              return 2 * (this.level + 1) * this.idealEdgeLength;
            }, C.prototype.groupZeroDegreeMembers = function() {
              var b = this, x = {};
              this.memberGroups = {}, this.idToDummyNode = {};
              for (var w = [], D = this.graphManager.getAllNodes(), A = 0; A < D.length; A++) {
                var L = D[A], M = L.getParent();
                this.getNodeDegreeWithChildren(L) === 0 && (M.id == null || !this.getToBeTiled(M)) && w.push(L);
              }
              for (var A = 0; A < w.length; A++) {
                var L = w[A], O = L.getParent().id;
                typeof x[O] > "u" && (x[O] = []), x[O] = x[O].concat(L);
              }
              Object.keys(x).forEach(function(P) {
                if (x[P].length > 1) {
                  var I = "DummyCompound_" + P;
                  b.memberGroups[I] = x[P];
                  var k = x[P][0].getParent(), R = new l(b.graphManager);
                  R.id = I, R.paddingLeft = k.paddingLeft || 0, R.paddingRight = k.paddingRight || 0, R.paddingBottom = k.paddingBottom || 0, R.paddingTop = k.paddingTop || 0, b.idToDummyNode[I] = R;
                  var B = b.getGraphManager().add(b.newGraph(), R), z = k.getChild();
                  z.add(R);
                  for (var F = 0; F < x[P].length; F++) {
                    var $ = x[P][F];
                    z.remove($), B.add($);
                  }
                }
              });
            }, C.prototype.clearCompounds = function() {
              var b = {}, x = {};
              this.performDFSOnCompounds();
              for (var w = 0; w < this.compoundOrder.length; w++)
                x[this.compoundOrder[w].id] = this.compoundOrder[w], b[this.compoundOrder[w].id] = [].concat(this.compoundOrder[w].getChild().getNodes()), this.graphManager.remove(this.compoundOrder[w].getChild()), this.compoundOrder[w].child = null;
              this.graphManager.resetAllNodes(), this.tileCompoundMembers(b, x);
            }, C.prototype.clearZeroDegreeMembers = function() {
              var b = this, x = this.tiledZeroDegreePack = [];
              Object.keys(this.memberGroups).forEach(function(w) {
                var D = b.idToDummyNode[w];
                x[w] = b.tileNodes(b.memberGroups[w], D.paddingLeft + D.paddingRight), D.rect.width = x[w].width, D.rect.height = x[w].height;
              });
            }, C.prototype.repopulateCompounds = function() {
              for (var b = this.compoundOrder.length - 1; b >= 0; b--) {
                var x = this.compoundOrder[b], w = x.id, D = x.paddingLeft, A = x.paddingTop;
                this.adjustLocations(this.tiledMemberPack[w], x.rect.x, x.rect.y, D, A);
              }
            }, C.prototype.repopulateZeroDegreeMembers = function() {
              var b = this, x = this.tiledZeroDegreePack;
              Object.keys(x).forEach(function(w) {
                var D = b.idToDummyNode[w], A = D.paddingLeft, L = D.paddingTop;
                b.adjustLocations(x[w], D.rect.x, D.rect.y, A, L);
              });
            }, C.prototype.getToBeTiled = function(b) {
              var x = b.id;
              if (this.toBeTiled[x] != null)
                return this.toBeTiled[x];
              var w = b.getChild();
              if (w == null)
                return this.toBeTiled[x] = !1, !1;
              for (var D = w.getNodes(), A = 0; A < D.length; A++) {
                var L = D[A];
                if (this.getNodeDegree(L) > 0)
                  return this.toBeTiled[x] = !1, !1;
                if (L.getChild() == null) {
                  this.toBeTiled[L.id] = !1;
                  continue;
                }
                if (!this.getToBeTiled(L))
                  return this.toBeTiled[x] = !1, !1;
              }
              return this.toBeTiled[x] = !0, !0;
            }, C.prototype.getNodeDegree = function(b) {
              b.id;
              for (var x = b.getEdges(), w = 0, D = 0; D < x.length; D++) {
                var A = x[D];
                A.getSource().id !== A.getTarget().id && (w = w + 1);
              }
              return w;
            }, C.prototype.getNodeDegreeWithChildren = function(b) {
              var x = this.getNodeDegree(b);
              if (b.getChild() == null)
                return x;
              for (var w = b.getChild().getNodes(), D = 0; D < w.length; D++) {
                var A = w[D];
                x += this.getNodeDegreeWithChildren(A);
              }
              return x;
            }, C.prototype.performDFSOnCompounds = function() {
              this.compoundOrder = [], this.fillCompexOrderByDFS(this.graphManager.getRoot().getNodes());
            }, C.prototype.fillCompexOrderByDFS = function(b) {
              for (var x = 0; x < b.length; x++) {
                var w = b[x];
                w.getChild() != null && this.fillCompexOrderByDFS(w.getChild().getNodes()), this.getToBeTiled(w) && this.compoundOrder.push(w);
              }
            }, C.prototype.adjustLocations = function(b, x, w, D, A) {
              x += D, w += A;
              for (var L = x, M = 0; M < b.rows.length; M++) {
                var O = b.rows[M];
                x = L;
                for (var P = 0, I = 0; I < O.length; I++) {
                  var k = O[I];
                  k.rect.x = x, k.rect.y = w, x += k.rect.width + b.horizontalPadding, k.rect.height > P && (P = k.rect.height);
                }
                w += P + b.verticalPadding;
              }
            }, C.prototype.tileCompoundMembers = function(b, x) {
              var w = this;
              this.tiledMemberPack = [], Object.keys(b).forEach(function(D) {
                var A = x[D];
                w.tiledMemberPack[D] = w.tileNodes(b[D], A.paddingLeft + A.paddingRight), A.rect.width = w.tiledMemberPack[D].width, A.rect.height = w.tiledMemberPack[D].height;
              });
            }, C.prototype.tileNodes = function(b, x) {
              var w = h.TILING_PADDING_VERTICAL, D = h.TILING_PADDING_HORIZONTAL, A = {
                rows: [],
                rowWidth: [],
                rowHeight: [],
                width: 0,
                height: x,
                // assume minHeight equals to minWidth
                verticalPadding: w,
                horizontalPadding: D
              };
              b.sort(function(O, P) {
                return O.rect.width * O.rect.height > P.rect.width * P.rect.height ? -1 : O.rect.width * O.rect.height < P.rect.width * P.rect.height ? 1 : 0;
              });
              for (var L = 0; L < b.length; L++) {
                var M = b[L];
                A.rows.length == 0 ? this.insertNodeToRow(A, M, 0, x) : this.canAddHorizontal(A, M.rect.width, M.rect.height) ? this.insertNodeToRow(A, M, this.getShortestRowIndex(A), x) : this.insertNodeToRow(A, M, A.rows.length, x), this.shiftToLastRow(A);
              }
              return A;
            }, C.prototype.insertNodeToRow = function(b, x, w, D) {
              var A = D;
              if (w == b.rows.length) {
                var L = [];
                b.rows.push(L), b.rowWidth.push(A), b.rowHeight.push(0);
              }
              var M = b.rowWidth[w] + x.rect.width;
              b.rows[w].length > 0 && (M += b.horizontalPadding), b.rowWidth[w] = M, b.width < M && (b.width = M);
              var O = x.rect.height;
              w > 0 && (O += b.verticalPadding);
              var P = 0;
              O > b.rowHeight[w] && (P = b.rowHeight[w], b.rowHeight[w] = O, P = b.rowHeight[w] - P), b.height += P, b.rows[w].push(x);
            }, C.prototype.getShortestRowIndex = function(b) {
              for (var x = -1, w = Number.MAX_VALUE, D = 0; D < b.rows.length; D++)
                b.rowWidth[D] < w && (x = D, w = b.rowWidth[D]);
              return x;
            }, C.prototype.getLongestRowIndex = function(b) {
              for (var x = -1, w = Number.MIN_VALUE, D = 0; D < b.rows.length; D++)
                b.rowWidth[D] > w && (x = D, w = b.rowWidth[D]);
              return x;
            }, C.prototype.canAddHorizontal = function(b, x, w) {
              var D = this.getShortestRowIndex(b);
              if (D < 0)
                return !0;
              var A = b.rowWidth[D];
              if (A + b.horizontalPadding + x <= b.width)
                return !0;
              var L = 0;
              b.rowHeight[D] < w && D > 0 && (L = w + b.verticalPadding - b.rowHeight[D]);
              var M;
              b.width - A >= x + b.horizontalPadding ? M = (b.height + L) / (A + x + b.horizontalPadding) : M = (b.height + L) / b.width, L = w + b.verticalPadding;
              var O;
              return b.width < x ? O = (b.height + L) / x : O = (b.height + L) / b.width, O < 1 && (O = 1 / O), M < 1 && (M = 1 / M), M < O;
            }, C.prototype.shiftToLastRow = function(b) {
              var x = this.getLongestRowIndex(b), w = b.rowWidth.length - 1, D = b.rows[x], A = D[D.length - 1], L = A.width + b.horizontalPadding;
              if (b.width - b.rowWidth[w] > L && x != w) {
                D.splice(-1, 1), b.rows[w].push(A), b.rowWidth[x] = b.rowWidth[x] - L, b.rowWidth[w] = b.rowWidth[w] + L, b.width = b.rowWidth[instance.getLongestRowIndex(b)];
                for (var M = Number.MIN_VALUE, O = 0; O < D.length; O++)
                  D[O].height > M && (M = D[O].height);
                x > 0 && (M += b.verticalPadding);
                var P = b.rowHeight[x] + b.rowHeight[w];
                b.rowHeight[x] = M, b.rowHeight[w] < A.height + b.verticalPadding && (b.rowHeight[w] = A.height + b.verticalPadding);
                var I = b.rowHeight[x] + b.rowHeight[w];
                b.height += I - P, this.shiftToLastRow(b);
              }
            }, C.prototype.tilingPreLayout = function() {
              h.TILE && (this.groupZeroDegreeMembers(), this.clearCompounds(), this.clearZeroDegreeMembers());
            }, C.prototype.tilingPostLayout = function() {
              h.TILE && (this.repopulateZeroDegreeMembers(), this.repopulateCompounds());
            }, C.prototype.reduceTrees = function() {
              for (var b = [], x = !0, w; x; ) {
                var D = this.graphManager.getAllNodes(), A = [];
                x = !1;
                for (var L = 0; L < D.length; L++)
                  w = D[L], w.getEdges().length == 1 && !w.getEdges()[0].isInterGraph && w.getChild() == null && (A.push([w, w.getEdges()[0], w.getOwner()]), x = !0);
                if (x == !0) {
                  for (var M = [], O = 0; O < A.length; O++)
                    A[O][0].getEdges().length == 1 && (M.push(A[O]), A[O][0].getOwner().remove(A[O][0]));
                  b.push(M), this.graphManager.resetAllNodes(), this.graphManager.resetAllEdges();
                }
              }
              this.prunedNodesAll = b;
            }, C.prototype.growTree = function(b) {
              for (var x = b.length, w = b[x - 1], D, A = 0; A < w.length; A++)
                D = w[A], this.findPlaceforPrunedNode(D), D[2].add(D[0]), D[2].add(D[1], D[1].source, D[1].target);
              b.splice(b.length - 1, 1), this.graphManager.resetAllNodes(), this.graphManager.resetAllEdges();
            }, C.prototype.findPlaceforPrunedNode = function(b) {
              var x, w, D = b[0];
              D == b[1].source ? w = b[1].target : w = b[1].source;
              var A = w.startX, L = w.finishX, M = w.startY, O = w.finishY, P = 0, I = 0, k = 0, R = 0, B = [P, k, I, R];
              if (M > 0)
                for (var z = A; z <= L; z++)
                  B[0] += this.grid[z][M - 1].length + this.grid[z][M].length - 1;
              if (L < this.grid.length - 1)
                for (var z = M; z <= O; z++)
                  B[1] += this.grid[L + 1][z].length + this.grid[L][z].length - 1;
              if (O < this.grid[0].length - 1)
                for (var z = A; z <= L; z++)
                  B[2] += this.grid[z][O + 1].length + this.grid[z][O].length - 1;
              if (A > 0)
                for (var z = M; z <= O; z++)
                  B[3] += this.grid[A - 1][z].length + this.grid[A][z].length - 1;
              for (var F = p.MAX_VALUE, $, U, V = 0; V < B.length; V++)
                B[V] < F ? (F = B[V], $ = 1, U = V) : B[V] == F && $++;
              if ($ == 3 && F == 0)
                B[0] == 0 && B[1] == 0 && B[2] == 0 ? x = 1 : B[0] == 0 && B[1] == 0 && B[3] == 0 ? x = 0 : B[0] == 0 && B[2] == 0 && B[3] == 0 ? x = 3 : B[1] == 0 && B[2] == 0 && B[3] == 0 && (x = 2);
              else if ($ == 2 && F == 0) {
                var H = Math.floor(Math.random() * 2);
                B[0] == 0 && B[1] == 0 ? H == 0 ? x = 0 : x = 1 : B[0] == 0 && B[2] == 0 ? H == 0 ? x = 0 : x = 2 : B[0] == 0 && B[3] == 0 ? H == 0 ? x = 0 : x = 3 : B[1] == 0 && B[2] == 0 ? H == 0 ? x = 1 : x = 2 : B[1] == 0 && B[3] == 0 ? H == 0 ? x = 1 : x = 3 : H == 0 ? x = 2 : x = 3;
              } else if ($ == 4 && F == 0) {
                var H = Math.floor(Math.random() * 4);
                x = H;
              } else
                x = U;
              x == 0 ? D.setCenter(w.getCenterX(), w.getCenterY() - w.getHeight() / 2 - c.DEFAULT_EDGE_LENGTH - D.getHeight() / 2) : x == 1 ? D.setCenter(w.getCenterX() + w.getWidth() / 2 + c.DEFAULT_EDGE_LENGTH + D.getWidth() / 2, w.getCenterY()) : x == 2 ? D.setCenter(w.getCenterX(), w.getCenterY() + w.getHeight() / 2 + c.DEFAULT_EDGE_LENGTH + D.getHeight() / 2) : D.setCenter(w.getCenterX() - w.getWidth() / 2 - c.DEFAULT_EDGE_LENGTH - D.getWidth() / 2, w.getCenterY());
            }, a.exports = C;
          },
          /* 7 */
          /***/
          function(a, n, i) {
            var s = {};
            s.layoutBase = i(0), s.CoSEConstants = i(1), s.CoSEEdge = i(2), s.CoSEGraph = i(3), s.CoSEGraphManager = i(4), s.CoSELayout = i(6), s.CoSENode = i(5), a.exports = s;
          }
          /******/
        ])
      );
    });
  }(Im)), Ja;
}
(function(t, e) {
  (function(a, n) {
    t.exports = n(Pm());
  })($t, function(r) {
    return (
      /******/
      function(a) {
        var n = {};
        function i(s) {
          if (n[s])
            return n[s].exports;
          var o = n[s] = {
            /******/
            i: s,
            /******/
            l: !1,
            /******/
            exports: {}
            /******/
          };
          return a[s].call(o.exports, o, o.exports, i), o.l = !0, o.exports;
        }
        return i.m = a, i.c = n, i.i = function(s) {
          return s;
        }, i.d = function(s, o, u) {
          i.o(s, o) || Object.defineProperty(s, o, {
            /******/
            configurable: !1,
            /******/
            enumerable: !0,
            /******/
            get: u
            /******/
          });
        }, i.n = function(s) {
          var o = s && s.__esModule ? (
            /******/
            function() {
              return s.default;
            }
          ) : (
            /******/
            function() {
              return s;
            }
          );
          return i.d(o, "a", o), o;
        }, i.o = function(s, o) {
          return Object.prototype.hasOwnProperty.call(s, o);
        }, i.p = "", i(i.s = 1);
      }([
        /* 0 */
        /***/
        function(a, n) {
          a.exports = r;
        },
        /* 1 */
        /***/
        function(a, n, i) {
          var s = i(0).layoutBase.LayoutConstants, o = i(0).layoutBase.FDLayoutConstants, u = i(0).CoSEConstants, l = i(0).CoSELayout, f = i(0).CoSENode, h = i(0).layoutBase.PointD, c = i(0).layoutBase.DimensionD, v = {
            // Called on `layoutready`
            ready: function() {
            },
            // Called on `layoutstop`
            stop: function() {
            },
            // 'draft', 'default' or 'proof" 
            // - 'draft' fast cooling rate 
            // - 'default' moderate cooling rate 
            // - "proof" slow cooling rate
            quality: "default",
            // include labels in node dimensions
            nodeDimensionsIncludeLabels: !1,
            // number of ticks per frame; higher is faster but more jerky
            refresh: 30,
            // Whether to fit the network view after when done
            fit: !0,
            // Padding on fit
            padding: 10,
            // Whether to enable incremental mode
            randomize: !0,
            // Node repulsion (non overlapping) multiplier
            nodeRepulsion: 4500,
            // Ideal edge (non nested) length
            idealEdgeLength: 50,
            // Divisor to compute edge forces
            edgeElasticity: 0.45,
            // Nesting factor (multiplier) to compute ideal edge length for nested edges
            nestingFactor: 0.1,
            // Gravity force (constant)
            gravity: 0.25,
            // Maximum number of iterations to perform
            numIter: 2500,
            // For enabling tiling
            tile: !0,
            // Type of layout animation. The option set is {'during', 'end', false}
            animate: "end",
            // Duration for animate:end
            animationDuration: 500,
            // Represents the amount of the vertical space to put between the zero degree members during the tiling operation(can also be a function)
            tilingPaddingVertical: 10,
            // Represents the amount of the horizontal space to put between the zero degree members during the tiling operation(can also be a function)
            tilingPaddingHorizontal: 10,
            // Gravity range (constant) for compounds
            gravityRangeCompound: 1.5,
            // Gravity force (constant) for compounds
            gravityCompound: 1,
            // Gravity range (constant)
            gravityRange: 3.8,
            // Initial cooling factor for incremental layout
            initialEnergyOnIncremental: 0.5
          };
          function d(E, m) {
            var T = {};
            for (var C in E)
              T[C] = E[C];
            for (var C in m)
              T[C] = m[C];
            return T;
          }
          function g(E) {
            this.options = d(v, E), y(this.options);
          }
          var y = function(m) {
            m.nodeRepulsion != null && (u.DEFAULT_REPULSION_STRENGTH = o.DEFAULT_REPULSION_STRENGTH = m.nodeRepulsion), m.idealEdgeLength != null && (u.DEFAULT_EDGE_LENGTH = o.DEFAULT_EDGE_LENGTH = m.idealEdgeLength), m.edgeElasticity != null && (u.DEFAULT_SPRING_STRENGTH = o.DEFAULT_SPRING_STRENGTH = m.edgeElasticity), m.nestingFactor != null && (u.PER_LEVEL_IDEAL_EDGE_LENGTH_FACTOR = o.PER_LEVEL_IDEAL_EDGE_LENGTH_FACTOR = m.nestingFactor), m.gravity != null && (u.DEFAULT_GRAVITY_STRENGTH = o.DEFAULT_GRAVITY_STRENGTH = m.gravity), m.numIter != null && (u.MAX_ITERATIONS = o.MAX_ITERATIONS = m.numIter), m.gravityRange != null && (u.DEFAULT_GRAVITY_RANGE_FACTOR = o.DEFAULT_GRAVITY_RANGE_FACTOR = m.gravityRange), m.gravityCompound != null && (u.DEFAULT_COMPOUND_GRAVITY_STRENGTH = o.DEFAULT_COMPOUND_GRAVITY_STRENGTH = m.gravityCompound), m.gravityRangeCompound != null && (u.DEFAULT_COMPOUND_GRAVITY_RANGE_FACTOR = o.DEFAULT_COMPOUND_GRAVITY_RANGE_FACTOR = m.gravityRangeCompound), m.initialEnergyOnIncremental != null && (u.DEFAULT_COOLING_FACTOR_INCREMENTAL = o.DEFAULT_COOLING_FACTOR_INCREMENTAL = m.initialEnergyOnIncremental), m.quality == "draft" ? s.QUALITY = 0 : m.quality == "proof" ? s.QUALITY = 2 : s.QUALITY = 1, u.NODE_DIMENSIONS_INCLUDE_LABELS = o.NODE_DIMENSIONS_INCLUDE_LABELS = s.NODE_DIMENSIONS_INCLUDE_LABELS = m.nodeDimensionsIncludeLabels, u.DEFAULT_INCREMENTAL = o.DEFAULT_INCREMENTAL = s.DEFAULT_INCREMENTAL = !m.randomize, u.ANIMATE = o.ANIMATE = s.ANIMATE = m.animate, u.TILE = m.tile, u.TILING_PADDING_VERTICAL = typeof m.tilingPaddingVertical == "function" ? m.tilingPaddingVertical.call() : m.tilingPaddingVertical, u.TILING_PADDING_HORIZONTAL = typeof m.tilingPaddingHorizontal == "function" ? m.tilingPaddingHorizontal.call() : m.tilingPaddingHorizontal;
          };
          g.prototype.run = function() {
            var E, m, T = this.options;
            this.idToLNode = {};
            var C = this.layout = new l(), S = this;
            S.stopped = !1, this.cy = this.options.cy, this.cy.trigger({ type: "layoutstart", layout: this });
            var b = C.newGraphManager();
            this.gm = b;
            var x = this.options.eles.nodes(), w = this.options.eles.edges();
            this.root = b.addRoot(), this.processChildrenList(this.root, this.getTopMostNodes(x), C);
            for (var D = 0; D < w.length; D++) {
              var A = w[D], L = this.idToLNode[A.data("source")], M = this.idToLNode[A.data("target")];
              if (L !== M && L.getEdgesBetween(M).length == 0) {
                var O = b.add(C.newEdge(), L, M);
                O.id = A.id();
              }
            }
            var P = function(R, B) {
              typeof R == "number" && (R = B);
              var z = R.data("id"), F = S.idToLNode[z];
              return {
                x: F.getRect().getCenterX(),
                y: F.getRect().getCenterY()
              };
            }, I = function k() {
              for (var R = function() {
                T.fit && T.cy.fit(T.eles, T.padding), E || (E = !0, S.cy.one("layoutready", T.ready), S.cy.trigger({ type: "layoutready", layout: S }));
              }, B = S.options.refresh, z, F = 0; F < B && !z; F++)
                z = S.stopped || S.layout.tick();
              if (z) {
                C.checkLayoutSuccess() && !C.isSubLayout && C.doPostLayout(), C.tilingPostLayout && C.tilingPostLayout(), C.isLayoutFinished = !0, S.options.eles.nodes().positions(P), R(), S.cy.one("layoutstop", S.options.stop), S.cy.trigger({ type: "layoutstop", layout: S }), m && cancelAnimationFrame(m), E = !1;
                return;
              }
              var $ = S.layout.getPositionsData();
              T.eles.nodes().positions(function(U, V) {
                if (typeof U == "number" && (U = V), !U.isParent()) {
                  for (var H = U.id(), Y = $[H], G = U; Y == null && (Y = $[G.data("parent")] || $["DummyCompound_" + G.data("parent")], $[H] = Y, G = G.parent()[0], G != null); )
                    ;
                  return Y != null ? {
                    x: Y.x,
                    y: Y.y
                  } : {
                    x: U.position("x"),
                    y: U.position("y")
                  };
                }
              }), R(), m = requestAnimationFrame(k);
            };
            return C.addListener("layoutstarted", function() {
              S.options.animate === "during" && (m = requestAnimationFrame(I));
            }), C.runLayout(), this.options.animate !== "during" && (S.options.eles.nodes().not(":parent").layoutPositions(S, S.options, P), E = !1), this;
          }, g.prototype.getTopMostNodes = function(E) {
            for (var m = {}, T = 0; T < E.length; T++)
              m[E[T].id()] = !0;
            var C = E.filter(function(S, b) {
              typeof S == "number" && (S = b);
              for (var x = S.parent()[0]; x != null; ) {
                if (m[x.id()])
                  return !1;
                x = x.parent()[0];
              }
              return !0;
            });
            return C;
          }, g.prototype.processChildrenList = function(E, m, T) {
            for (var C = m.length, S = 0; S < C; S++) {
              var b = m[S], x = b.children(), w, D = b.layoutDimensions({
                nodeDimensionsIncludeLabels: this.options.nodeDimensionsIncludeLabels
              });
              if (b.outerWidth() != null && b.outerHeight() != null ? w = E.add(new f(T.graphManager, new h(b.position("x") - D.w / 2, b.position("y") - D.h / 2), new c(parseFloat(D.w), parseFloat(D.h)))) : w = E.add(new f(this.graphManager)), w.id = b.data("id"), w.paddingLeft = parseInt(b.css("padding")), w.paddingTop = parseInt(b.css("padding")), w.paddingRight = parseInt(b.css("padding")), w.paddingBottom = parseInt(b.css("padding")), this.options.nodeDimensionsIncludeLabels && b.isParent()) {
                var A = b.boundingBox({ includeLabels: !0, includeNodes: !1 }).w, L = b.boundingBox({ includeLabels: !0, includeNodes: !1 }).h, M = b.css("text-halign");
                w.labelWidth = A, w.labelHeight = L, w.labelPos = M;
              }
              if (this.idToLNode[b.data("id")] = w, isNaN(w.rect.x) && (w.rect.x = 0), isNaN(w.rect.y) && (w.rect.y = 0), x != null && x.length > 0) {
                var O;
                O = T.getGraphManager().add(T.newGraph(), w), this.processChildrenList(O, x, T);
              }
            }
          }, g.prototype.stop = function() {
            return this.stopped = !0, this;
          };
          var p = function(m) {
            m("layout", "cose-bilkent", g);
          };
          typeof cytoscape < "u" && p(cytoscape), a.exports = p;
        }
        /******/
      ])
    );
  });
})(Mm);
const Bm = /* @__PURE__ */ Hs(Zn);
Kt.use(Bm);
function Ru(t, e, r, a) {
  Zs.drawNode(t, e, r, a), e.children && e.children.forEach((n, i) => {
    Ru(t, n, r < 0 ? i : r, a);
  });
}
function Fm(t, e) {
  e.edges().map((r, a) => {
    const n = r.data();
    if (r[0]._private.bodyBounds) {
      const i = r[0]._private.rscratch;
      ur.trace("Edge: ", a, n), t.insert("path").attr(
        "d",
        `M ${i.startX},${i.startY} L ${i.midX},${i.midY} L${i.endX},${i.endY} `
      ).attr("class", "edge section-edge-" + n.section + " edge-depth-" + n.depth);
    }
  });
}
function ku(t, e, r, a) {
  e.add({
    group: "nodes",
    data: {
      id: t.id,
      labelText: t.descr,
      height: t.height,
      width: t.width,
      level: a,
      nodeId: t.id,
      padding: t.padding,
      type: t.type
    },
    position: {
      x: t.x,
      y: t.y
    }
  }), t.children && t.children.forEach((n) => {
    ku(n, e, r, a + 1), e.add({
      group: "edges",
      data: {
        id: `${t.id}_${n.id}`,
        source: t.id,
        target: n.id,
        depth: a,
        section: n.section
      }
    });
  });
}
function Gm(t, e) {
  return new Promise((r) => {
    const a = Zr("body").append("div").attr("id", "cy").attr("style", "display:none"), n = Kt({
      container: document.getElementById("cy"),
      // container to render in
      style: [
        {
          selector: "edge",
          style: {
            "curve-style": "bezier"
          }
        }
      ]
    });
    a.remove(), ku(t, n, e, 0), n.nodes().forEach(function(i) {
      i.layoutDimensions = () => {
        const s = i.data();
        return { w: s.width, h: s.height };
      };
    }), n.layout({
      name: "cose-bilkent",
      quality: "proof",
      // headless: true,
      styleEnabled: !1,
      animate: !1
    }).run(), n.ready((i) => {
      ur.info("Ready", i), r(n);
    });
  });
}
function zm(t) {
  t.nodes().map((e, r) => {
    const a = e.data();
    a.x = e.position().x, a.y = e.position().y, Zs.positionNode(a);
    const n = Jn(a.nodeId);
    ur.info("Id:", r, "Position: (", e.position().x, ", ", e.position().y, ")", a), n.attr(
      "transform",
      `translate(${e.position().x - a.width / 2}, ${e.position().y - a.height / 2})`
    ), n.attr("attr", `apa-${r})`);
  });
}
const $m = async (t, e, r, a) => {
  const n = jr();
  a.db.clear(), a.parser.parse(t), ur.debug(`Renering info diagram
` + t);
  const i = jr().securityLevel;
  let s;
  i === "sandbox" && (s = Zr("#i" + e));
  const u = (i === "sandbox" ? Zr(s.nodes()[0].contentDocument.body) : Zr("body")).select("#" + e);
  u.append("g");
  const l = a.db.getMindmap(), f = u.append("g");
  f.attr("class", "mindmap-edges");
  const h = u.append("g");
  h.attr("class", "mindmap-nodes"), Ru(h, l, -1, n);
  const c = await Gm(l, n);
  Fm(f, c), zm(c), Hu(void 0, u, n.mindmap.padding, n.mindmap.useMaxWidth);
}, Vm = {
  draw: $m
}, _m = (t) => {
  let e = "";
  for (let r = 0; r < t.THEME_COLOR_LIMIT; r++)
    t["lineColor" + r] = t["lineColor" + r] || t["cScaleInv" + r], Wu(t["lineColor" + r]) ? t["lineColor" + r] = Xu(t["lineColor" + r], 20) : t["lineColor" + r] = qu(t["lineColor" + r], 20);
  for (let r = 0; r < t.THEME_COLOR_LIMIT; r++) {
    const a = "" + (17 - 3 * r);
    e += `
    .section-${r - 1} rect, .section-${r - 1} path, .section-${r - 1} circle, .section-${r - 1} polygon, .section-${r - 1} path  {
      fill: ${t["cScale" + r]};
    }
    .section-${r - 1} text {
     fill: ${t["cScaleLabel" + r]};
    }
    .node-icon-${r - 1} {
      font-size: 40px;
      color: ${t["cScaleLabel" + r]};
    }
    .section-edge-${r - 1}{
      stroke: ${t["cScale" + r]};
    }
    .edge-depth-${r - 1}{
      stroke-width: ${a};
    }
    .section-${r - 1} line {
      stroke: ${t["cScaleInv" + r]} ;
      stroke-width: 3;
    }

    .disabled, .disabled circle, .disabled text {
      fill: lightgray;
    }
    .disabled text {
      fill: #efefef;
    }
    `;
  }
  return e;
}, Um = (t) => `
  .edge {
    stroke-width: 3;
  }
  ${_m(t)}
  .section-root rect, .section-root path, .section-root circle, .section-root polygon  {
    fill: ${t.git0};
  }
  .section-root text {
    fill: ${t.gitBranchLabel0};
  }
  .icon-container {
    height:100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .edge {
    fill: none;
  }
`, Ym = Um, qm = {
  db: il,
  renderer: Vm,
  parser: Ku,
  styles: Ym
};
export {
  qm as diagram
};
//# sourceMappingURL=mindmap-definition-e7cd2555.js.map
