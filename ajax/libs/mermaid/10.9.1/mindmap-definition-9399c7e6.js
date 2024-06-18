import { l as qr, c as Ji, W as ti, d as ri, P as Ca, Q as $l, Y as pp, U as yp, t as mp, j as bp, at as Ep, au as wp, av as xp } from "./mermaid-9f2aa176.js";
import { a as Tp } from "./createText-03b82060.js";
var Qi = function() {
  var de = function(ee, H, te, S) {
    for (te = te || {}, S = ee.length; S--; te[ee[S]] = H)
      ;
    return te;
  }, Pe = [1, 4], _ = [1, 13], fe = [1, 12], Q = [1, 15], C = [1, 16], T = [1, 20], x = [1, 19], I = [6, 7, 8], z = [1, 26], Y = [1, 24], P = [1, 25], Z = [6, 7, 11], A = [1, 6, 13, 15, 16, 19, 22], $ = [1, 33], U = [1, 34], J = [1, 6, 7, 11, 13, 15, 16, 19, 22], ne = {
    trace: function() {
    },
    yy: {},
    symbols_: { error: 2, start: 3, mindMap: 4, spaceLines: 5, SPACELINE: 6, NL: 7, MINDMAP: 8, document: 9, stop: 10, EOF: 11, statement: 12, SPACELIST: 13, node: 14, ICON: 15, CLASS: 16, nodeWithId: 17, nodeWithoutId: 18, NODE_DSTART: 19, NODE_DESCR: 20, NODE_DEND: 21, NODE_ID: 22, $accept: 0, $end: 1 },
    terminals_: { 2: "error", 6: "SPACELINE", 7: "NL", 8: "MINDMAP", 11: "EOF", 13: "SPACELIST", 15: "ICON", 16: "CLASS", 19: "NODE_DSTART", 20: "NODE_DESCR", 21: "NODE_DEND", 22: "NODE_ID" },
    productions_: [0, [3, 1], [3, 2], [5, 1], [5, 2], [5, 2], [4, 2], [4, 3], [10, 1], [10, 1], [10, 1], [10, 2], [10, 2], [9, 3], [9, 2], [12, 2], [12, 2], [12, 2], [12, 1], [12, 1], [12, 1], [12, 1], [12, 1], [14, 1], [14, 1], [18, 3], [17, 1], [17, 4]],
    performAction: function(H, te, S, V, R, q, ve) {
      var pe = q.length - 1;
      switch (R) {
        case 6:
        case 7:
          return V;
        case 8:
          V.getLogger().trace("Stop NL ");
          break;
        case 9:
          V.getLogger().trace("Stop EOF ");
          break;
        case 11:
          V.getLogger().trace("Stop NL2 ");
          break;
        case 12:
          V.getLogger().trace("Stop EOF2 ");
          break;
        case 15:
          V.getLogger().info("Node: ", q[pe].id), V.addNode(q[pe - 1].length, q[pe].id, q[pe].descr, q[pe].type);
          break;
        case 16:
          V.getLogger().trace("Icon: ", q[pe]), V.decorateNode({ icon: q[pe] });
          break;
        case 17:
        case 21:
          V.decorateNode({ class: q[pe] });
          break;
        case 18:
          V.getLogger().trace("SPACELIST");
          break;
        case 19:
          V.getLogger().trace("Node: ", q[pe].id), V.addNode(0, q[pe].id, q[pe].descr, q[pe].type);
          break;
        case 20:
          V.decorateNode({ icon: q[pe] });
          break;
        case 25:
          V.getLogger().trace("node found ..", q[pe - 2]), this.$ = { id: q[pe - 1], descr: q[pe - 1], type: V.getType(q[pe - 2], q[pe]) };
          break;
        case 26:
          this.$ = { id: q[pe], descr: q[pe], type: V.nodeType.DEFAULT };
          break;
        case 27:
          V.getLogger().trace("node found ..", q[pe - 3]), this.$ = { id: q[pe - 3], descr: q[pe - 1], type: V.getType(q[pe - 2], q[pe]) };
          break;
      }
    },
    table: [{ 3: 1, 4: 2, 5: 3, 6: [1, 5], 8: Pe }, { 1: [3] }, { 1: [2, 1] }, { 4: 6, 6: [1, 7], 7: [1, 8], 8: Pe }, { 6: _, 7: [1, 10], 9: 9, 12: 11, 13: fe, 14: 14, 15: Q, 16: C, 17: 17, 18: 18, 19: T, 22: x }, de(I, [2, 3]), { 1: [2, 2] }, de(I, [2, 4]), de(I, [2, 5]), { 1: [2, 6], 6: _, 12: 21, 13: fe, 14: 14, 15: Q, 16: C, 17: 17, 18: 18, 19: T, 22: x }, { 6: _, 9: 22, 12: 11, 13: fe, 14: 14, 15: Q, 16: C, 17: 17, 18: 18, 19: T, 22: x }, { 6: z, 7: Y, 10: 23, 11: P }, de(Z, [2, 22], { 17: 17, 18: 18, 14: 27, 15: [1, 28], 16: [1, 29], 19: T, 22: x }), de(Z, [2, 18]), de(Z, [2, 19]), de(Z, [2, 20]), de(Z, [2, 21]), de(Z, [2, 23]), de(Z, [2, 24]), de(Z, [2, 26], { 19: [1, 30] }), { 20: [1, 31] }, { 6: z, 7: Y, 10: 32, 11: P }, { 1: [2, 7], 6: _, 12: 21, 13: fe, 14: 14, 15: Q, 16: C, 17: 17, 18: 18, 19: T, 22: x }, de(A, [2, 14], { 7: $, 11: U }), de(J, [2, 8]), de(J, [2, 9]), de(J, [2, 10]), de(Z, [2, 15]), de(Z, [2, 16]), de(Z, [2, 17]), { 20: [1, 35] }, { 21: [1, 36] }, de(A, [2, 13], { 7: $, 11: U }), de(J, [2, 11]), de(J, [2, 12]), { 21: [1, 37] }, de(Z, [2, 25]), de(Z, [2, 27])],
    defaultActions: { 2: [2, 1], 6: [2, 2] },
    parseError: function(H, te) {
      if (te.recoverable)
        this.trace(H);
      else {
        var S = new Error(H);
        throw S.hash = te, S;
      }
    },
    parse: function(H) {
      var te = this, S = [0], V = [], R = [null], q = [], ve = this.table, pe = "", Ae = 0, Ne = 0, Ye = 2, at = 1, dt = q.slice.call(arguments, 1), Re = Object.create(this.lexer), Ve = { yy: {} };
      for (var Ze in this.yy)
        Object.prototype.hasOwnProperty.call(this.yy, Ze) && (Ve.yy[Ze] = this.yy[Ze]);
      Re.setInput(H, Ve.yy), Ve.yy.lexer = Re, Ve.yy.parser = this, typeof Re.yylloc > "u" && (Re.yylloc = {});
      var nt = Re.yylloc;
      q.push(nt);
      var ht = Re.options && Re.options.ranges;
      typeof Ve.yy.parseError == "function" ? this.parseError = Ve.yy.parseError : this.parseError = Object.getPrototypeOf(this).parseError;
      function it() {
        var jt;
        return jt = V.pop() || Re.lex() || at, typeof jt != "number" && (jt instanceof Array && (V = jt, jt = V.pop()), jt = te.symbols_[jt] || jt), jt;
      }
      for (var tt, yt, Et, Pt, gt = {}, dr, qt, nn, Kr; ; ) {
        if (yt = S[S.length - 1], this.defaultActions[yt] ? Et = this.defaultActions[yt] : ((tt === null || typeof tt > "u") && (tt = it()), Et = ve[yt] && ve[yt][tt]), typeof Et > "u" || !Et.length || !Et[0]) {
          var Da = "";
          Kr = [];
          for (dr in ve[yt])
            this.terminals_[dr] && dr > Ye && Kr.push("'" + this.terminals_[dr] + "'");
          Re.showPosition ? Da = "Parse error on line " + (Ae + 1) + `:
` + Re.showPosition() + `
Expecting ` + Kr.join(", ") + ", got '" + (this.terminals_[tt] || tt) + "'" : Da = "Parse error on line " + (Ae + 1) + ": Unexpected " + (tt == at ? "end of input" : "'" + (this.terminals_[tt] || tt) + "'"), this.parseError(Da, {
            text: Re.match,
            token: this.terminals_[tt] || tt,
            line: Re.yylineno,
            loc: nt,
            expected: Kr
          });
        }
        if (Et[0] instanceof Array && Et.length > 1)
          throw new Error("Parse Error: multiple actions possible at state: " + yt + ", token: " + tt);
        switch (Et[0]) {
          case 1:
            S.push(tt), R.push(Re.yytext), q.push(Re.yylloc), S.push(Et[1]), tt = null, Ne = Re.yyleng, pe = Re.yytext, Ae = Re.yylineno, nt = Re.yylloc;
            break;
          case 2:
            if (qt = this.productions_[Et[1]][1], gt.$ = R[R.length - qt], gt._$ = {
              first_line: q[q.length - (qt || 1)].first_line,
              last_line: q[q.length - 1].last_line,
              first_column: q[q.length - (qt || 1)].first_column,
              last_column: q[q.length - 1].last_column
            }, ht && (gt._$.range = [
              q[q.length - (qt || 1)].range[0],
              q[q.length - 1].range[1]
            ]), Pt = this.performAction.apply(gt, [
              pe,
              Ne,
              Ae,
              Ve.yy,
              Et[1],
              R,
              q
            ].concat(dt)), typeof Pt < "u")
              return Pt;
            qt && (S = S.slice(0, -1 * qt * 2), R = R.slice(0, -1 * qt), q = q.slice(0, -1 * qt)), S.push(this.productions_[Et[1]][0]), R.push(gt.$), q.push(gt._$), nn = ve[S[S.length - 2]][S[S.length - 1]], S.push(nn);
            break;
          case 3:
            return !0;
        }
      }
      return !0;
    }
  }, le = function() {
    var ee = {
      EOF: 1,
      parseError: function(te, S) {
        if (this.yy.parser)
          this.yy.parser.parseError(te, S);
        else
          throw new Error(te);
      },
      // resets the lexer, sets new input
      setInput: function(H, te) {
        return this.yy = te || this.yy || {}, this._input = H, this._more = this._backtrack = this.done = !1, this.yylineno = this.yyleng = 0, this.yytext = this.matched = this.match = "", this.conditionStack = ["INITIAL"], this.yylloc = {
          first_line: 1,
          first_column: 0,
          last_line: 1,
          last_column: 0
        }, this.options.ranges && (this.yylloc.range = [0, 0]), this.offset = 0, this;
      },
      // consumes and returns one char from the input
      input: function() {
        var H = this._input[0];
        this.yytext += H, this.yyleng++, this.offset++, this.match += H, this.matched += H;
        var te = H.match(/(?:\r\n?|\n).*/g);
        return te ? (this.yylineno++, this.yylloc.last_line++) : this.yylloc.last_column++, this.options.ranges && this.yylloc.range[1]++, this._input = this._input.slice(1), H;
      },
      // unshifts one char (or a string) into the input
      unput: function(H) {
        var te = H.length, S = H.split(/(?:\r\n?|\n)/g);
        this._input = H + this._input, this.yytext = this.yytext.substr(0, this.yytext.length - te), this.offset -= te;
        var V = this.match.split(/(?:\r\n?|\n)/g);
        this.match = this.match.substr(0, this.match.length - 1), this.matched = this.matched.substr(0, this.matched.length - 1), S.length - 1 && (this.yylineno -= S.length - 1);
        var R = this.yylloc.range;
        return this.yylloc = {
          first_line: this.yylloc.first_line,
          last_line: this.yylineno + 1,
          first_column: this.yylloc.first_column,
          last_column: S ? (S.length === V.length ? this.yylloc.first_column : 0) + V[V.length - S.length].length - S[0].length : this.yylloc.first_column - te
        }, this.options.ranges && (this.yylloc.range = [R[0], R[0] + this.yyleng - te]), this.yyleng = this.yytext.length, this;
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
      less: function(H) {
        this.unput(this.match.slice(H));
      },
      // displays already matched input, i.e. for error messages
      pastInput: function() {
        var H = this.matched.substr(0, this.matched.length - this.match.length);
        return (H.length > 20 ? "..." : "") + H.substr(-20).replace(/\n/g, "");
      },
      // displays upcoming input, i.e. for error messages
      upcomingInput: function() {
        var H = this.match;
        return H.length < 20 && (H += this._input.substr(0, 20 - H.length)), (H.substr(0, 20) + (H.length > 20 ? "..." : "")).replace(/\n/g, "");
      },
      // displays the character position where the lexing error occurred, i.e. for error messages
      showPosition: function() {
        var H = this.pastInput(), te = new Array(H.length + 1).join("-");
        return H + this.upcomingInput() + `
` + te + "^";
      },
      // test the lexed token: return FALSE when not a match, otherwise return token
      test_match: function(H, te) {
        var S, V, R;
        if (this.options.backtrack_lexer && (R = {
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
        }, this.options.ranges && (R.yylloc.range = this.yylloc.range.slice(0))), V = H[0].match(/(?:\r\n?|\n).*/g), V && (this.yylineno += V.length), this.yylloc = {
          first_line: this.yylloc.last_line,
          last_line: this.yylineno + 1,
          first_column: this.yylloc.last_column,
          last_column: V ? V[V.length - 1].length - V[V.length - 1].match(/\r?\n?/)[0].length : this.yylloc.last_column + H[0].length
        }, this.yytext += H[0], this.match += H[0], this.matches = H, this.yyleng = this.yytext.length, this.options.ranges && (this.yylloc.range = [this.offset, this.offset += this.yyleng]), this._more = !1, this._backtrack = !1, this._input = this._input.slice(H[0].length), this.matched += H[0], S = this.performAction.call(this, this.yy, this, te, this.conditionStack[this.conditionStack.length - 1]), this.done && this._input && (this.done = !1), S)
          return S;
        if (this._backtrack) {
          for (var q in R)
            this[q] = R[q];
          return !1;
        }
        return !1;
      },
      // return next match in input
      next: function() {
        if (this.done)
          return this.EOF;
        this._input || (this.done = !0);
        var H, te, S, V;
        this._more || (this.yytext = "", this.match = "");
        for (var R = this._currentRules(), q = 0; q < R.length; q++)
          if (S = this._input.match(this.rules[R[q]]), S && (!te || S[0].length > te[0].length)) {
            if (te = S, V = q, this.options.backtrack_lexer) {
              if (H = this.test_match(S, R[q]), H !== !1)
                return H;
              if (this._backtrack) {
                te = !1;
                continue;
              } else
                return !1;
            } else if (!this.options.flex)
              break;
          }
        return te ? (H = this.test_match(te, R[V]), H !== !1 ? H : !1) : this._input === "" ? this.EOF : this.parseError("Lexical error on line " + (this.yylineno + 1) + `. Unrecognized text.
` + this.showPosition(), {
          text: "",
          token: null,
          line: this.yylineno
        });
      },
      // return next match that has a token
      lex: function() {
        var te = this.next();
        return te || this.lex();
      },
      // activates a new lexer condition state (pushes the new lexer condition state onto the condition stack)
      begin: function(te) {
        this.conditionStack.push(te);
      },
      // pop the previously active lexer condition state off the condition stack
      popState: function() {
        var te = this.conditionStack.length - 1;
        return te > 0 ? this.conditionStack.pop() : this.conditionStack[0];
      },
      // produce the lexer rule set which is active for the currently active lexer condition state
      _currentRules: function() {
        return this.conditionStack.length && this.conditionStack[this.conditionStack.length - 1] ? this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules : this.conditions.INITIAL.rules;
      },
      // return the currently active lexer condition state; when an index argument is provided it produces the N-th previous condition state, if available
      topState: function(te) {
        return te = this.conditionStack.length - 1 - Math.abs(te || 0), te >= 0 ? this.conditionStack[te] : "INITIAL";
      },
      // alias for begin(condition)
      pushState: function(te) {
        this.begin(te);
      },
      // return the number of states currently on the stack
      stateStackSize: function() {
        return this.conditionStack.length;
      },
      options: { "case-insensitive": !0 },
      performAction: function(te, S, V, R) {
        switch (V) {
          case 0:
            return te.getLogger().trace("Found comment", S.yytext), 6;
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
            te.getLogger().trace("Begin icon"), this.begin("ICON");
            break;
          case 6:
            return te.getLogger().trace("SPACELINE"), 6;
          case 7:
            return 7;
          case 8:
            return 15;
          case 9:
            te.getLogger().trace("end icon"), this.popState();
            break;
          case 10:
            return te.getLogger().trace("Exploding node"), this.begin("NODE"), 19;
          case 11:
            return te.getLogger().trace("Cloud"), this.begin("NODE"), 19;
          case 12:
            return te.getLogger().trace("Explosion Bang"), this.begin("NODE"), 19;
          case 13:
            return te.getLogger().trace("Cloud Bang"), this.begin("NODE"), 19;
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
            this.begin("NSTR2");
            break;
          case 22:
            return "NODE_DESCR";
          case 23:
            this.popState();
            break;
          case 24:
            te.getLogger().trace("Starting NSTR"), this.begin("NSTR");
            break;
          case 25:
            return te.getLogger().trace("description:", S.yytext), "NODE_DESCR";
          case 26:
            this.popState();
            break;
          case 27:
            return this.popState(), te.getLogger().trace("node end ))"), "NODE_DEND";
          case 28:
            return this.popState(), te.getLogger().trace("node end )"), "NODE_DEND";
          case 29:
            return this.popState(), te.getLogger().trace("node end ...", S.yytext), "NODE_DEND";
          case 30:
            return this.popState(), te.getLogger().trace("node end (("), "NODE_DEND";
          case 31:
            return this.popState(), te.getLogger().trace("node end (-"), "NODE_DEND";
          case 32:
            return this.popState(), te.getLogger().trace("node end (-"), "NODE_DEND";
          case 33:
            return this.popState(), te.getLogger().trace("node end (("), "NODE_DEND";
          case 34:
            return this.popState(), te.getLogger().trace("node end (("), "NODE_DEND";
          case 35:
            return te.getLogger().trace("Long description:", S.yytext), 20;
          case 36:
            return te.getLogger().trace("Long description:", S.yytext), 20;
        }
      },
      rules: [/^(?:\s*%%.*)/i, /^(?:mindmap\b)/i, /^(?::::)/i, /^(?:.+)/i, /^(?:\n)/i, /^(?:::icon\()/i, /^(?:[\s]+[\n])/i, /^(?:[\n]+)/i, /^(?:[^\)]+)/i, /^(?:\))/i, /^(?:-\))/i, /^(?:\(-)/i, /^(?:\)\))/i, /^(?:\))/i, /^(?:\(\()/i, /^(?:\{\{)/i, /^(?:\()/i, /^(?:\[)/i, /^(?:[\s]+)/i, /^(?:[^\(\[\n\)\{\}]+)/i, /^(?:$)/i, /^(?:["][`])/i, /^(?:[^`"]+)/i, /^(?:[`]["])/i, /^(?:["])/i, /^(?:[^"]+)/i, /^(?:["])/i, /^(?:[\)]\))/i, /^(?:[\)])/i, /^(?:[\]])/i, /^(?:\}\})/i, /^(?:\(-)/i, /^(?:-\))/i, /^(?:\(\()/i, /^(?:\()/i, /^(?:[^\)\]\(\}]+)/i, /^(?:.+(?!\(\())/i],
      conditions: { CLASS: { rules: [3, 4], inclusive: !1 }, ICON: { rules: [8, 9], inclusive: !1 }, NSTR2: { rules: [22, 23], inclusive: !1 }, NSTR: { rules: [25, 26], inclusive: !1 }, NODE: { rules: [21, 24, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36], inclusive: !1 }, INITIAL: { rules: [0, 1, 2, 5, 6, 7, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20], inclusive: !0 } }
    };
    return ee;
  }();
  ne.lexer = le;
  function j() {
    this.yy = {};
  }
  return j.prototype = ne, ne.Parser = j, new j();
}();
Qi.parser = Qi;
const Cp = Qi;
let or = [], _l = 0, ji = {};
const Dp = () => {
  or = [], _l = 0, ji = {};
}, Sp = function(de) {
  for (let Pe = or.length - 1; Pe >= 0; Pe--)
    if (or[Pe].level < de)
      return or[Pe];
  return null;
}, Lp = () => or.length > 0 ? or[0] : null, Ap = (de, Pe, _, fe) => {
  var I, z;
  qr.info("addNode", de, Pe, _, fe);
  const Q = Ji();
  let C = ((I = Q.mindmap) == null ? void 0 : I.padding) ?? ti.mindmap.padding;
  switch (fe) {
    case St.ROUNDED_RECT:
    case St.RECT:
    case St.HEXAGON:
      C *= 2;
  }
  const T = {
    id: _l++,
    nodeId: ri(Pe, Q),
    level: de,
    descr: ri(_, Q),
    type: fe,
    children: [],
    width: ((z = Q.mindmap) == null ? void 0 : z.maxNodeWidth) ?? ti.mindmap.maxNodeWidth,
    padding: C
  }, x = Sp(de);
  if (x)
    x.children.push(T), or.push(T);
  else if (or.length === 0)
    or.push(T);
  else
    throw new Error(
      'There can be only one root. No parent could be found for ("' + T.descr + '")'
    );
}, St = {
  DEFAULT: 0,
  NO_BORDER: 0,
  ROUNDED_RECT: 1,
  RECT: 2,
  CIRCLE: 3,
  CLOUD: 4,
  BANG: 5,
  HEXAGON: 6
}, Op = (de, Pe) => {
  switch (qr.debug("In get type", de, Pe), de) {
    case "[":
      return St.RECT;
    case "(":
      return Pe === ")" ? St.ROUNDED_RECT : St.CLOUD;
    case "((":
      return St.CIRCLE;
    case ")":
      return St.CLOUD;
    case "))":
      return St.BANG;
    case "{{":
      return St.HEXAGON;
    default:
      return St.DEFAULT;
  }
}, Np = (de, Pe) => {
  ji[de] = Pe;
}, Ip = (de) => {
  if (!de)
    return;
  const Pe = Ji(), _ = or[or.length - 1];
  de.icon && (_.icon = ri(de.icon, Pe)), de.class && (_.class = ri(de.class, Pe));
}, Mp = (de) => {
  switch (de) {
    case St.DEFAULT:
      return "no-border";
    case St.RECT:
      return "rect";
    case St.ROUNDED_RECT:
      return "rounded-rect";
    case St.CIRCLE:
      return "circle";
    case St.CLOUD:
      return "cloud";
    case St.BANG:
      return "bang";
    case St.HEXAGON:
      return "hexgon";
    default:
      return "no-border";
  }
}, Rp = () => qr, kp = (de) => ji[de], Pp = {
  clear: Dp,
  addNode: Ap,
  getMindmap: Lp,
  nodeType: St,
  getType: Op,
  setElementForId: Np,
  decorateNode: Ip,
  type2Str: Mp,
  getLogger: Rp,
  getElementById: kp
}, Bp = Pp;
var Yl = { exports: {} };
(function(de, Pe) {
  (function(_, fe) {
    de.exports = fe();
  })(Ca, function() {
    function _(t) {
      "@babel/helpers - typeof";
      return _ = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
        return typeof e;
      } : function(e) {
        return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
      }, _(t);
    }
    function fe(t, e) {
      if (!(t instanceof e))
        throw new TypeError("Cannot call a class as a function");
    }
    function Q(t, e) {
      for (var r = 0; r < e.length; r++) {
        var a = e[r];
        a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), Object.defineProperty(t, a.key, a);
      }
    }
    function C(t, e, r) {
      return e && Q(t.prototype, e), r && Q(t, r), Object.defineProperty(t, "prototype", {
        writable: !1
      }), t;
    }
    function T(t, e, r) {
      return e in t ? Object.defineProperty(t, e, {
        value: r,
        enumerable: !0,
        configurable: !0,
        writable: !0
      }) : t[e] = r, t;
    }
    function x(t, e) {
      return I(t) || z(t, e) || Y(t, e) || Z();
    }
    function I(t) {
      if (Array.isArray(t))
        return t;
    }
    function z(t, e) {
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
    function Y(t, e) {
      if (t) {
        if (typeof t == "string")
          return P(t, e);
        var r = Object.prototype.toString.call(t).slice(8, -1);
        if (r === "Object" && t.constructor && (r = t.constructor.name), r === "Map" || r === "Set")
          return Array.from(t);
        if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))
          return P(t, e);
      }
    }
    function P(t, e) {
      (e == null || e > t.length) && (e = t.length);
      for (var r = 0, a = new Array(e); r < e; r++)
        a[r] = t[r];
      return a;
    }
    function Z() {
      throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
    }
    var A = typeof window > "u" ? null : window, $ = A ? A.navigator : null;
    A && A.document;
    var U = _(""), J = _({}), ne = _(function() {
    }), le = typeof HTMLElement > "u" ? "undefined" : _(HTMLElement), j = function(e) {
      return e && e.instanceString && H(e.instanceString) ? e.instanceString() : null;
    }, ee = function(e) {
      return e != null && _(e) == U;
    }, H = function(e) {
      return e != null && _(e) === ne;
    }, te = function(e) {
      return !pe(e) && (Array.isArray ? Array.isArray(e) : e != null && e instanceof Array);
    }, S = function(e) {
      return e != null && _(e) === J && !te(e) && e.constructor === Object;
    }, V = function(e) {
      return e != null && _(e) === J;
    }, R = function(e) {
      return e != null && _(e) === _(1) && !isNaN(e);
    }, q = function(e) {
      return R(e) && Math.floor(e) === e;
    }, ve = function(e) {
      if (le !== "undefined")
        return e != null && e instanceof HTMLElement;
    }, pe = function(e) {
      return Ae(e) || Ne(e);
    }, Ae = function(e) {
      return j(e) === "collection" && e._private.single;
    }, Ne = function(e) {
      return j(e) === "collection" && !e._private.single;
    }, Ye = function(e) {
      return j(e) === "core";
    }, at = function(e) {
      return j(e) === "stylesheet";
    }, dt = function(e) {
      return j(e) === "event";
    }, Re = function(e) {
      return e == null ? !0 : !!(e === "" || e.match(/^\s+$/));
    }, Ve = function(e) {
      return typeof HTMLElement > "u" ? !1 : e instanceof HTMLElement;
    }, Ze = function(e) {
      return S(e) && R(e.x1) && R(e.x2) && R(e.y1) && R(e.y2);
    }, nt = function(e) {
      return V(e) && H(e.then);
    }, ht = function() {
      return $ && $.userAgent.match(/msie|trident|edge/i);
    }, it = function(e, r) {
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
    }, tt = it(function(t) {
      return t.replace(/([A-Z])/g, function(e) {
        return "-" + e.toLowerCase();
      });
    }), yt = it(function(t) {
      return t.replace(/(-\w)/g, function(e) {
        return e[1].toUpperCase();
      });
    }), Et = it(function(t, e) {
      return t + e[0].toUpperCase() + e.substring(1);
    }, function(t, e) {
      return t + "$" + e;
    }), Pt = function(e) {
      return Re(e) ? e : e.charAt(0).toUpperCase() + e.substring(1);
    }, gt = "(?:[-+]?(?:(?:\\d+|\\d*\\.\\d+)(?:[Ee][+-]?\\d+)?))", dr = "rgb[a]?\\((" + gt + "[%]?)\\s*,\\s*(" + gt + "[%]?)\\s*,\\s*(" + gt + "[%]?)(?:\\s*,\\s*(" + gt + "))?\\)", qt = "rgb[a]?\\((?:" + gt + "[%]?)\\s*,\\s*(?:" + gt + "[%]?)\\s*,\\s*(?:" + gt + "[%]?)(?:\\s*,\\s*(?:" + gt + "))?\\)", nn = "hsl[a]?\\((" + gt + ")\\s*,\\s*(" + gt + "[%])\\s*,\\s*(" + gt + "[%])(?:\\s*,\\s*(" + gt + "))?\\)", Kr = "hsl[a]?\\((?:" + gt + ")\\s*,\\s*(?:" + gt + "[%])\\s*,\\s*(?:" + gt + "[%])(?:\\s*,\\s*(?:" + gt + "))?\\)", Da = "\\#[0-9a-fA-F]{3}", jt = "\\#[0-9a-fA-F]{6}", es = function(e, r) {
      return e < r ? -1 : e > r ? 1 : 0;
    }, Kl = function(e, r) {
      return -1 * es(e, r);
    }, He = Object.assign != null ? Object.assign.bind(Object) : function(t) {
      for (var e = arguments, r = 1; r < e.length; r++) {
        var a = e[r];
        if (a != null)
          for (var n = Object.keys(a), i = 0; i < n.length; i++) {
            var s = n[i];
            t[s] = a[s];
          }
      }
      return t;
    }, Zl = function(e) {
      if (!(!(e.length === 4 || e.length === 7) || e[0] !== "#")) {
        var r = e.length === 4, a, n, i, s = 16;
        return r ? (a = parseInt(e[1] + e[1], s), n = parseInt(e[2] + e[2], s), i = parseInt(e[3] + e[3], s)) : (a = parseInt(e[1] + e[2], s), n = parseInt(e[3] + e[4], s), i = parseInt(e[5] + e[6], s)), [a, n, i];
      }
    }, Ql = function(e) {
      var r, a, n, i, s, o, u, l;
      function f(c, y, p) {
        return p < 0 && (p += 1), p > 1 && (p -= 1), p < 1 / 6 ? c + (y - c) * 6 * p : p < 1 / 2 ? y : p < 2 / 3 ? c + (y - c) * (2 / 3 - p) * 6 : c;
      }
      var h = new RegExp("^" + nn + "$").exec(e);
      if (h) {
        if (a = parseInt(h[1]), a < 0 ? a = (360 - -1 * a % 360) % 360 : a > 360 && (a = a % 360), a /= 360, n = parseFloat(h[2]), n < 0 || n > 100 || (n = n / 100, i = parseFloat(h[3]), i < 0 || i > 100) || (i = i / 100, s = h[4], s !== void 0 && (s = parseFloat(s), s < 0 || s > 1)))
          return;
        if (n === 0)
          o = u = l = Math.round(i * 255);
        else {
          var v = i < 0.5 ? i * (1 + n) : i + n - i * n, d = 2 * i - v;
          o = Math.round(255 * f(d, v, a + 1 / 3)), u = Math.round(255 * f(d, v, a)), l = Math.round(255 * f(d, v, a - 1 / 3));
        }
        r = [o, u, l, s];
      }
      return r;
    }, Jl = function(e) {
      var r, a = new RegExp("^" + dr + "$").exec(e);
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
    }, jl = function(e) {
      return tu[e.toLowerCase()];
    }, eu = function(e) {
      return (te(e) ? e : null) || jl(e) || Zl(e) || Jl(e) || Ql(e);
    }, tu = {
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
    }, ts = function(e) {
      for (var r = e.map, a = e.keys, n = a.length, i = 0; i < n; i++) {
        var s = a[i];
        if (S(s))
          throw Error("Tried to set map with object key");
        i < a.length - 1 ? (r[s] == null && (r[s] = {}), r = r[s]) : r[s] = e.value;
      }
    }, rs = function(e) {
      for (var r = e.map, a = e.keys, n = a.length, i = 0; i < n; i++) {
        var s = a[i];
        if (S(s))
          throw Error("Tried to get map with object key");
        if (r = r[s], r == null)
          return r;
      }
      return r;
    };
    function ru(t) {
      var e = typeof t;
      return t != null && (e == "object" || e == "function");
    }
    var kr = ru, Sa = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof Ca < "u" ? Ca : typeof self < "u" ? self : {};
    function au(t, e) {
      return e = { exports: {} }, t(e, e.exports), e.exports;
    }
    var nu = typeof Sa == "object" && Sa && Sa.Object === Object && Sa, iu = nu, su = typeof self == "object" && self && self.Object === Object && self, ou = iu || su || Function("return this")(), sn = ou, lu = function() {
      return sn.Date.now();
    }, ai = lu, uu = /\s/;
    function fu(t) {
      for (var e = t.length; e-- && uu.test(t.charAt(e)); )
        ;
      return e;
    }
    var hu = fu, vu = /^\s+/;
    function cu(t) {
      return t && t.slice(0, hu(t) + 1).replace(vu, "");
    }
    var du = cu, gu = sn.Symbol, Zr = gu, as = Object.prototype, pu = as.hasOwnProperty, yu = as.toString, La = Zr ? Zr.toStringTag : void 0;
    function mu(t) {
      var e = pu.call(t, La), r = t[La];
      try {
        t[La] = void 0;
        var a = !0;
      } catch {
      }
      var n = yu.call(t);
      return a && (e ? t[La] = r : delete t[La]), n;
    }
    var bu = mu, Eu = Object.prototype, wu = Eu.toString;
    function xu(t) {
      return wu.call(t);
    }
    var Tu = xu, Cu = "[object Null]", Du = "[object Undefined]", ns = Zr ? Zr.toStringTag : void 0;
    function Su(t) {
      return t == null ? t === void 0 ? Du : Cu : ns && ns in Object(t) ? bu(t) : Tu(t);
    }
    var is = Su;
    function Lu(t) {
      return t != null && typeof t == "object";
    }
    var Au = Lu, Ou = "[object Symbol]";
    function Nu(t) {
      return typeof t == "symbol" || Au(t) && is(t) == Ou;
    }
    var Aa = Nu, ss = 0 / 0, Iu = /^[-+]0x[0-9a-f]+$/i, Mu = /^0b[01]+$/i, Ru = /^0o[0-7]+$/i, ku = parseInt;
    function Pu(t) {
      if (typeof t == "number")
        return t;
      if (Aa(t))
        return ss;
      if (kr(t)) {
        var e = typeof t.valueOf == "function" ? t.valueOf() : t;
        t = kr(e) ? e + "" : e;
      }
      if (typeof t != "string")
        return t === 0 ? t : +t;
      t = du(t);
      var r = Mu.test(t);
      return r || Ru.test(t) ? ku(t.slice(2), r ? 2 : 8) : Iu.test(t) ? ss : +t;
    }
    var os = Pu, Bu = "Expected a function", Fu = Math.max, Gu = Math.min;
    function zu(t, e, r) {
      var a, n, i, s, o, u, l = 0, f = !1, h = !1, v = !0;
      if (typeof t != "function")
        throw new TypeError(Bu);
      e = os(e) || 0, kr(r) && (f = !!r.leading, h = "maxWait" in r, i = h ? Fu(os(r.maxWait) || 0, e) : i, v = "trailing" in r ? !!r.trailing : v);
      function d(L) {
        var w = a, k = n;
        return a = n = void 0, l = L, s = t.apply(k, w), s;
      }
      function c(L) {
        return l = L, o = setTimeout(g, e), f ? d(L) : s;
      }
      function y(L) {
        var w = L - u, k = L - l, D = e - w;
        return h ? Gu(D, i - k) : D;
      }
      function p(L) {
        var w = L - u, k = L - l;
        return u === void 0 || w >= e || w < 0 || h && k >= i;
      }
      function g() {
        var L = ai();
        if (p(L))
          return m(L);
        o = setTimeout(g, y(L));
      }
      function m(L) {
        return o = void 0, v && a ? d(L) : (a = n = void 0, s);
      }
      function b() {
        o !== void 0 && clearTimeout(o), l = 0, a = u = n = o = void 0;
      }
      function E() {
        return o === void 0 ? s : m(ai());
      }
      function M() {
        var L = ai(), w = p(L);
        if (a = arguments, n = this, u = L, w) {
          if (o === void 0)
            return c(u);
          if (h)
            return clearTimeout(o), o = setTimeout(g, e), d(u);
        }
        return o === void 0 && (o = setTimeout(g, e)), s;
      }
      return M.cancel = b, M.flush = E, M;
    }
    var on = zu, ni = A ? A.performance : null, ls = ni && ni.now ? function() {
      return ni.now();
    } : function() {
      return Date.now();
    }, Vu = function() {
      if (A) {
        if (A.requestAnimationFrame)
          return function(t) {
            A.requestAnimationFrame(t);
          };
        if (A.mozRequestAnimationFrame)
          return function(t) {
            A.mozRequestAnimationFrame(t);
          };
        if (A.webkitRequestAnimationFrame)
          return function(t) {
            A.webkitRequestAnimationFrame(t);
          };
        if (A.msRequestAnimationFrame)
          return function(t) {
            A.msRequestAnimationFrame(t);
          };
      }
      return function(t) {
        t && setTimeout(function() {
          t(ls());
        }, 1e3 / 60);
      };
    }(), ln = function(e) {
      return Vu(e);
    }, gr = ls, Qr = 9261, us = 65599, Oa = 5381, fs = function(e) {
      for (var r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : Qr, a = r, n; n = e.next(), !n.done; )
        a = a * us + n.value | 0;
      return a;
    }, Na = function(e) {
      var r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : Qr;
      return r * us + e | 0;
    }, Ia = function(e) {
      var r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : Oa;
      return (r << 5) + r + e | 0;
    }, Uu = function(e, r) {
      return e * 2097152 + r;
    }, wr = function(e) {
      return e[0] * 2097152 + e[1];
    }, un = function(e, r) {
      return [Na(e[0], r[0]), Ia(e[1], r[1])];
    }, $u = function(e, r) {
      var a = {
        value: 0,
        done: !1
      }, n = 0, i = e.length, s = {
        next: function() {
          return n < i ? a.value = e[n++] : a.done = !0, a;
        }
      };
      return fs(s, r);
    }, Pr = function(e, r) {
      var a = {
        value: 0,
        done: !1
      }, n = 0, i = e.length, s = {
        next: function() {
          return n < i ? a.value = e.charCodeAt(n++) : a.done = !0, a;
        }
      };
      return fs(s, r);
    }, hs = function() {
      return _u(arguments);
    }, _u = function(e) {
      for (var r, a = 0; a < e.length; a++) {
        var n = e[a];
        a === 0 ? r = Pr(n) : r = Pr(n, r);
      }
      return r;
    }, vs = !0, Yu = console.warn != null, Hu = console.trace != null, ii = Number.MAX_SAFE_INTEGER || 9007199254740991, cs = function() {
      return !0;
    }, fn = function() {
      return !1;
    }, ds = function() {
      return 0;
    }, si = function() {
    }, xt = function(e) {
      throw new Error(e);
    }, gs = function(e) {
      if (e !== void 0)
        vs = !!e;
      else
        return vs;
    }, vt = function(e) {
      gs() && (Yu ? console.warn(e) : (console.log(e), Hu && console.trace()));
    }, Xu = function(e) {
      return He({}, e);
    }, lr = function(e) {
      return e == null ? e : te(e) ? e.slice() : S(e) ? Xu(e) : e;
    }, Wu = function(e) {
      return e.slice();
    }, ps = function(e, r) {
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
    }, qu = {}, ys = function() {
      return qu;
    }, At = function(e) {
      var r = Object.keys(e);
      return function(a) {
        for (var n = {}, i = 0; i < r.length; i++) {
          var s = r[i], o = a == null ? void 0 : a[s];
          n[s] = o === void 0 ? e[s] : o;
        }
        return n;
      };
    }, xr = function(e, r, a) {
      for (var n = e.length - 1; n >= 0 && !(e[n] === r && (e.splice(n, 1), a)); n--)
        ;
    }, oi = function(e) {
      e.splice(0, e.length);
    }, Ku = function(e, r) {
      for (var a = 0; a < r.length; a++) {
        var n = r[a];
        e.push(n);
      }
    }, er = function(e, r, a) {
      return a && (r = Et(a, r)), e[r];
    }, Tr = function(e, r, a, n) {
      a && (r = Et(a, r)), e[r] = n;
    }, Zu = /* @__PURE__ */ function() {
      function t() {
        fe(this, t), this._obj = {};
      }
      return C(t, [{
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
    }(), ur = typeof Map < "u" ? Map : Zu, Qu = "undefined", Ju = /* @__PURE__ */ function() {
      function t(e) {
        if (fe(this, t), this._obj = /* @__PURE__ */ Object.create(null), this.size = 0, e != null) {
          var r;
          e.instanceString != null && e.instanceString() === this.instanceString() ? r = e.toArray() : r = e;
          for (var a = 0; a < r.length; a++)
            this.add(r[a]);
        }
      }
      return C(t, [{
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
    }(), Jr = (typeof Set > "u" ? "undefined" : _(Set)) !== Qu ? Set : Ju, hn = function(e, r) {
      var a = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !0;
      if (e === void 0 || r === void 0 || !Ye(e)) {
        xt("An element must have a core reference and parameters set");
        return;
      }
      var n = r.group;
      if (n == null && (r.data && r.data.source != null && r.data.target != null ? n = "edges" : n = "nodes"), n !== "nodes" && n !== "edges") {
        xt("An element must be of type `nodes` or `edges`; you specified `" + n + "`");
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
        classes: new Jr(),
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
      te(r.classes) ? l = r.classes : ee(r.classes) && (l = r.classes.split(/\s+/));
      for (var f = 0, h = l.length; f < h; f++) {
        var v = l[f];
        !v || v === "" || i.classes.add(v);
      }
      this.createEmitter();
      var d = r.style || r.css;
      d && (vt("Setting a `style` bypass at element creation should be done only when absolutely necessary.  Try to use the stylesheet instead."), this.style(d)), (a === void 0 || a) && this.restore();
    }, ms = function(e) {
      return e = {
        bfs: e.bfs || !e.dfs,
        dfs: e.dfs || !e.bfs
      }, function(a, n, i) {
        var s;
        S(a) && !pe(a) && (s = a, a = s.roots || s.root, n = s.visit, i = s.directed), i = arguments.length === 2 && !H(n) ? n : i, n = H(n) ? n : function() {
        };
        for (var o = this._private.cy, u = a = ee(a) ? this.filter(a) : a, l = [], f = [], h = {}, v = {}, d = {}, c = 0, y, p = this.byGroup(), g = p.nodes, m = p.edges, b = 0; b < u.length; b++) {
          var E = u[b], M = E.id();
          E.isNode() && (l.unshift(E), e.bfs && (d[M] = !0, f.push(E)), v[M] = 0);
        }
        for (var L = function() {
          var X = e.bfs ? l.shift() : l.pop(), B = X.id();
          if (e.dfs) {
            if (d[B])
              return "continue";
            d[B] = !0, f.push(X);
          }
          var re = v[B], K = h[B], W = K != null ? K.source() : null, ae = K != null ? K.target() : null, ue = K == null ? void 0 : X.same(W) ? ae[0] : W[0], me = void 0;
          if (me = n(X, K, ue, c++, re), me === !0)
            return y = X, "break";
          if (me === !1)
            return "break";
          for (var ie = X.connectedEdges().filter(function(De) {
            return (!i || De.source().same(X)) && m.has(De);
          }), ge = 0; ge < ie.length; ge++) {
            var Ee = ie[ge], Ce = Ee.connectedNodes().filter(function(De) {
              return !De.same(X) && g.has(De);
            }), we = Ce.id();
            Ce.length !== 0 && !d[we] && (Ce = Ce[0], l.push(Ce), e.bfs && (d[we] = !0, f.push(Ce)), h[we] = Ee, v[we] = v[B] + 1);
          }
        }; l.length !== 0; ) {
          var w = L();
          if (w !== "continue" && w === "break")
            break;
        }
        for (var k = o.collection(), D = 0; D < f.length; D++) {
          var F = f[D], G = h[F.id()];
          G != null && k.push(G), k.push(F);
        }
        return {
          path: o.collection(k),
          found: o.collection(y)
        };
      };
    }, Ma = {
      breadthFirstSearch: ms({
        bfs: !0
      }),
      depthFirstSearch: ms({
        dfs: !0
      })
    };
    Ma.bfs = Ma.breadthFirstSearch, Ma.dfs = Ma.depthFirstSearch;
    var ju = au(function(t, e) {
      (function() {
        var r, a, n, i, s, o, u, l, f, h, v, d, c, y, p;
        n = Math.floor, h = Math.min, a = function(g, m) {
          return g < m ? -1 : g > m ? 1 : 0;
        }, f = function(g, m, b, E, M) {
          var L;
          if (b == null && (b = 0), M == null && (M = a), b < 0)
            throw new Error("lo must be non-negative");
          for (E == null && (E = g.length); b < E; )
            L = n((b + E) / 2), M(m, g[L]) < 0 ? E = L : b = L + 1;
          return [].splice.apply(g, [b, b - b].concat(m)), m;
        }, o = function(g, m, b) {
          return b == null && (b = a), g.push(m), y(g, 0, g.length - 1, b);
        }, s = function(g, m) {
          var b, E;
          return m == null && (m = a), b = g.pop(), g.length ? (E = g[0], g[0] = b, p(g, 0, m)) : E = b, E;
        }, l = function(g, m, b) {
          var E;
          return b == null && (b = a), E = g[0], g[0] = m, p(g, 0, b), E;
        }, u = function(g, m, b) {
          var E;
          return b == null && (b = a), g.length && b(g[0], m) < 0 && (E = [g[0], m], m = E[0], g[0] = E[1], p(g, 0, b)), m;
        }, i = function(g, m) {
          var b, E, M, L, w, k;
          for (m == null && (m = a), L = (function() {
            k = [];
            for (var D = 0, F = n(g.length / 2); 0 <= F ? D < F : D > F; 0 <= F ? D++ : D--)
              k.push(D);
            return k;
          }).apply(this).reverse(), w = [], E = 0, M = L.length; E < M; E++)
            b = L[E], w.push(p(g, b, m));
          return w;
        }, c = function(g, m, b) {
          var E;
          if (b == null && (b = a), E = g.indexOf(m), E !== -1)
            return y(g, 0, E, b), p(g, E, b);
        }, v = function(g, m, b) {
          var E, M, L, w, k;
          if (b == null && (b = a), M = g.slice(0, m), !M.length)
            return M;
          for (i(M, b), k = g.slice(m), L = 0, w = k.length; L < w; L++)
            E = k[L], u(M, E, b);
          return M.sort(b).reverse();
        }, d = function(g, m, b) {
          var E, M, L, w, k, D, F, G, N;
          if (b == null && (b = a), m * 10 <= g.length) {
            if (L = g.slice(0, m).sort(b), !L.length)
              return L;
            for (M = L[L.length - 1], F = g.slice(m), w = 0, D = F.length; w < D; w++)
              E = F[w], b(E, M) < 0 && (f(L, E, 0, null, b), L.pop(), M = L[L.length - 1]);
            return L;
          }
          for (i(g, b), N = [], k = 0, G = h(m, g.length); 0 <= G ? k < G : k > G; 0 <= G ? ++k : --k)
            N.push(s(g, b));
          return N;
        }, y = function(g, m, b, E) {
          var M, L, w;
          for (E == null && (E = a), M = g[b]; b > m; ) {
            if (w = b - 1 >> 1, L = g[w], E(M, L) < 0) {
              g[b] = L, b = w;
              continue;
            }
            break;
          }
          return g[b] = M;
        }, p = function(g, m, b) {
          var E, M, L, w, k;
          for (b == null && (b = a), M = g.length, k = m, L = g[m], E = 2 * m + 1; E < M; )
            w = E + 1, w < M && !(b(g[E], g[w]) < 0) && (E = w), g[m] = g[E], m = E, E = 2 * m + 1;
          return g[m] = L, y(g, k, m, b);
        }, r = function() {
          g.push = o, g.pop = s, g.replace = l, g.pushpop = u, g.heapify = i, g.updateItem = c, g.nlargest = v, g.nsmallest = d;
          function g(m) {
            this.cmp = m ?? a, this.nodes = [];
          }
          return g.prototype.push = function(m) {
            return o(this.nodes, m, this.cmp);
          }, g.prototype.pop = function() {
            return s(this.nodes, this.cmp);
          }, g.prototype.peek = function() {
            return this.nodes[0];
          }, g.prototype.contains = function(m) {
            return this.nodes.indexOf(m) !== -1;
          }, g.prototype.replace = function(m) {
            return l(this.nodes, m, this.cmp);
          }, g.prototype.pushpop = function(m) {
            return u(this.nodes, m, this.cmp);
          }, g.prototype.heapify = function() {
            return i(this.nodes, this.cmp);
          }, g.prototype.updateItem = function(m) {
            return c(this.nodes, m, this.cmp);
          }, g.prototype.clear = function() {
            return this.nodes = [];
          }, g.prototype.empty = function() {
            return this.nodes.length === 0;
          }, g.prototype.size = function() {
            return this.nodes.length;
          }, g.prototype.clone = function() {
            var m;
            return m = new g(), m.nodes = this.nodes.slice(0), m;
          }, g.prototype.toArray = function() {
            return this.nodes.slice(0);
          }, g.prototype.insert = g.prototype.push, g.prototype.top = g.prototype.peek, g.prototype.front = g.prototype.peek, g.prototype.has = g.prototype.contains, g.prototype.copy = g.prototype.clone, g;
        }(), function(g, m) {
          return t.exports = m();
        }(this, function() {
          return r;
        });
      }).call(Sa);
    }), Ra = ju, ef = At({
      root: null,
      weight: function(e) {
        return 1;
      },
      directed: !1
    }), tf = {
      dijkstra: function(e) {
        if (!S(e)) {
          var r = arguments;
          e = {
            root: r[0],
            weight: r[1],
            directed: r[2]
          };
        }
        var a = ef(e), n = a.root, i = a.weight, s = a.directed, o = this, u = i, l = ee(n) ? this.filter(n)[0] : n[0], f = {}, h = {}, v = {}, d = this.byGroup(), c = d.nodes, y = d.edges;
        y.unmergeBy(function(re) {
          return re.isLoop();
        });
        for (var p = function(K) {
          return f[K.id()];
        }, g = function(K, W) {
          f[K.id()] = W, m.updateItem(K);
        }, m = new Ra(function(re, K) {
          return p(re) - p(K);
        }), b = 0; b < c.length; b++) {
          var E = c[b];
          f[E.id()] = E.same(l) ? 0 : 1 / 0, m.push(E);
        }
        for (var M = function(K, W) {
          for (var ae = (s ? K.edgesTo(W) : K.edgesWith(W)).intersect(y), ue = 1 / 0, me, ie = 0; ie < ae.length; ie++) {
            var ge = ae[ie], Ee = u(ge);
            (Ee < ue || !me) && (ue = Ee, me = ge);
          }
          return {
            edge: me,
            dist: ue
          };
        }; m.size() > 0; ) {
          var L = m.pop(), w = p(L), k = L.id();
          if (v[k] = w, w !== 1 / 0)
            for (var D = L.neighborhood().intersect(c), F = 0; F < D.length; F++) {
              var G = D[F], N = G.id(), X = M(L, G), B = w + X.dist;
              B < p(G) && (g(G, B), h[N] = {
                node: L,
                edge: X.edge
              });
            }
        }
        return {
          distanceTo: function(K) {
            var W = ee(K) ? c.filter(K)[0] : K[0];
            return v[W.id()];
          },
          pathTo: function(K) {
            var W = ee(K) ? c.filter(K)[0] : K[0], ae = [], ue = W, me = ue.id();
            if (W.length > 0)
              for (ae.unshift(W); h[me]; ) {
                var ie = h[me];
                ae.unshift(ie.edge), ae.unshift(ie.node), ue = ie.node, me = ue.id();
              }
            return o.spawn(ae);
          }
        };
      }
    }, rf = {
      // kruskal's algorithm (finds min spanning tree, assuming undirected graph)
      // implemented from pseudocode from wikipedia
      kruskal: function(e) {
        e = e || function(b) {
          return 1;
        };
        for (var r = this.byGroup(), a = r.nodes, n = r.edges, i = a.length, s = new Array(i), o = a, u = function(E) {
          for (var M = 0; M < s.length; M++) {
            var L = s[M];
            if (L.has(E))
              return M;
          }
        }, l = 0; l < i; l++)
          s[l] = this.spawn(a[l]);
        for (var f = n.sort(function(b, E) {
          return e(b) - e(E);
        }), h = 0; h < f.length; h++) {
          var v = f[h], d = v.source()[0], c = v.target()[0], y = u(d), p = u(c), g = s[y], m = s[p];
          y !== p && (o.merge(v), g.merge(m), s.splice(p, 1));
        }
        return o;
      }
    }, af = At({
      root: null,
      goal: null,
      weight: function(e) {
        return 1;
      },
      heuristic: function(e) {
        return 0;
      },
      directed: !1
    }), nf = {
      // Implemented from pseudocode from wikipedia
      aStar: function(e) {
        var r = this.cy(), a = af(e), n = a.root, i = a.goal, s = a.heuristic, o = a.directed, u = a.weight;
        n = r.collection(n)[0], i = r.collection(i)[0];
        var l = n.id(), f = i.id(), h = {}, v = {}, d = {}, c = new Ra(function(me, ie) {
          return v[me.id()] - v[ie.id()];
        }), y = new Jr(), p = {}, g = {}, m = function(ie, ge) {
          c.push(ie), y.add(ge);
        }, b, E, M = function() {
          b = c.pop(), E = b.id(), y.delete(E);
        }, L = function(ie) {
          return y.has(ie);
        };
        m(n, l), h[l] = 0, v[l] = s(n);
        for (var w = 0; c.size() > 0; ) {
          if (M(), w++, E === f) {
            for (var k = [], D = i, F = f, G = g[F]; k.unshift(D), G != null && k.unshift(G), D = p[F], D != null; )
              F = D.id(), G = g[F];
            return {
              found: !0,
              distance: h[E],
              path: this.spawn(k),
              steps: w
            };
          }
          d[E] = !0;
          for (var N = b._private.edges, X = 0; X < N.length; X++) {
            var B = N[X];
            if (this.hasElementWithId(B.id()) && !(o && B.data("source") !== E)) {
              var re = B.source(), K = B.target(), W = re.id() !== E ? re : K, ae = W.id();
              if (this.hasElementWithId(ae) && !d[ae]) {
                var ue = h[E] + u(B);
                if (!L(ae)) {
                  h[ae] = ue, v[ae] = ue + s(W), m(W, ae), p[ae] = b, g[ae] = B;
                  continue;
                }
                ue < h[ae] && (h[ae] = ue, v[ae] = ue + s(W), p[ae] = b, g[ae] = B);
              }
            }
          }
        }
        return {
          found: !1,
          distance: void 0,
          path: void 0,
          steps: w
        };
      }
    }, sf = At({
      weight: function(e) {
        return 1;
      },
      directed: !1
    }), of = {
      // Implemented from pseudocode from wikipedia
      floydWarshall: function(e) {
        for (var r = this.cy(), a = sf(e), n = a.weight, i = a.directed, s = n, o = this.byGroup(), u = o.nodes, l = o.edges, f = u.length, h = f * f, v = function(Ee) {
          return u.indexOf(Ee);
        }, d = function(Ee) {
          return u[Ee];
        }, c = new Array(h), y = 0; y < h; y++) {
          var p = y % f, g = (y - p) / f;
          g === p ? c[y] = 0 : c[y] = 1 / 0;
        }
        for (var m = new Array(h), b = new Array(h), E = 0; E < l.length; E++) {
          var M = l[E], L = M.source()[0], w = M.target()[0];
          if (L !== w) {
            var k = v(L), D = v(w), F = k * f + D, G = s(M);
            if (c[F] > G && (c[F] = G, m[F] = D, b[F] = M), !i) {
              var N = D * f + k;
              !i && c[N] > G && (c[N] = G, m[N] = k, b[N] = M);
            }
          }
        }
        for (var X = 0; X < f; X++)
          for (var B = 0; B < f; B++)
            for (var re = B * f + X, K = 0; K < f; K++) {
              var W = B * f + K, ae = X * f + K;
              c[re] + c[ae] < c[W] && (c[W] = c[re] + c[ae], m[W] = m[re]);
            }
        var ue = function(Ee) {
          return (ee(Ee) ? r.filter(Ee) : Ee)[0];
        }, me = function(Ee) {
          return v(ue(Ee));
        }, ie = {
          distance: function(Ee, Ce) {
            var we = me(Ee), De = me(Ce);
            return c[we * f + De];
          },
          path: function(Ee, Ce) {
            var we = me(Ee), De = me(Ce), se = d(we);
            if (we === De)
              return se.collection();
            if (m[we * f + De] == null)
              return r.collection();
            var xe = r.collection(), Le = we, Se;
            for (xe.merge(se); we !== De; )
              Le = we, we = m[we * f + De], Se = b[Le * f + we], xe.merge(Se), xe.merge(d(we));
            return xe;
          }
        };
        return ie;
      }
      // floydWarshall
    }, lf = At({
      weight: function(e) {
        return 1;
      },
      directed: !1,
      root: null
    }), uf = {
      // Implemented from pseudocode from wikipedia
      bellmanFord: function(e) {
        var r = this, a = lf(e), n = a.weight, i = a.directed, s = a.root, o = n, u = this, l = this.cy(), f = this.byGroup(), h = f.edges, v = f.nodes, d = v.length, c = new ur(), y = !1, p = [];
        s = l.collection(s)[0], h.unmergeBy(function(ze) {
          return ze.isLoop();
        });
        for (var g = h.length, m = function(Be) {
          var $e = c.get(Be.id());
          return $e || ($e = {}, c.set(Be.id(), $e)), $e;
        }, b = function(Be) {
          return (ee(Be) ? l.$(Be) : Be)[0];
        }, E = function(Be) {
          return m(b(Be)).dist;
        }, M = function(Be) {
          for (var $e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : s, rt = b(Be), je = [], We = rt; ; ) {
            if (We == null)
              return r.spawn();
            var et = m(We), he = et.edge, O = et.pred;
            if (je.unshift(We[0]), We.same($e) && je.length > 0)
              break;
            he != null && je.unshift(he), We = O;
          }
          return u.spawn(je);
        }, L = 0; L < d; L++) {
          var w = v[L], k = m(w);
          w.same(s) ? k.dist = 0 : k.dist = 1 / 0, k.pred = null, k.edge = null;
        }
        for (var D = !1, F = function(Be, $e, rt, je, We, et) {
          var he = je.dist + et;
          he < We.dist && !rt.same(je.edge) && (We.dist = he, We.pred = Be, We.edge = rt, D = !0);
        }, G = 1; G < d; G++) {
          D = !1;
          for (var N = 0; N < g; N++) {
            var X = h[N], B = X.source(), re = X.target(), K = o(X), W = m(B), ae = m(re);
            F(B, re, X, W, ae, K), i || F(re, B, X, ae, W, K);
          }
          if (!D)
            break;
        }
        if (D)
          for (var ue = [], me = 0; me < g; me++) {
            var ie = h[me], ge = ie.source(), Ee = ie.target(), Ce = o(ie), we = m(ge).dist, De = m(Ee).dist;
            if (we + Ce < De || !i && De + Ce < we)
              if (y || (vt("Graph contains a negative weight cycle for Bellman-Ford"), y = !0), e.findNegativeWeightCycles !== !1) {
                var se = [];
                we + Ce < De && se.push(ge), !i && De + Ce < we && se.push(Ee);
                for (var xe = se.length, Le = 0; Le < xe; Le++) {
                  var Se = se[Le], Oe = [Se];
                  Oe.push(m(Se).edge);
                  for (var Fe = m(Se).pred; Oe.indexOf(Fe) === -1; )
                    Oe.push(Fe), Oe.push(m(Fe).edge), Fe = m(Fe).pred;
                  Oe = Oe.slice(Oe.indexOf(Fe));
                  for (var Xe = Oe[0].id(), Ie = 0, Me = 2; Me < Oe.length; Me += 2)
                    Oe[Me].id() < Xe && (Xe = Oe[Me].id(), Ie = Me);
                  Oe = Oe.slice(Ie).concat(Oe.slice(0, Ie)), Oe.push(Oe[0]);
                  var Ue = Oe.map(function(ze) {
                    return ze.id();
                  }).join(",");
                  ue.indexOf(Ue) === -1 && (p.push(u.spawn(Oe)), ue.push(Ue));
                }
              } else
                break;
          }
        return {
          distanceTo: E,
          pathTo: M,
          hasNegativeWeightCycle: y,
          negativeWeightCycles: p
        };
      }
      // bellmanFord
    }, ff = Math.sqrt(2), hf = function(e, r, a) {
      a.length === 0 && xt("Karger-Stein must be run on a connected (sub)graph");
      for (var n = a[e], i = n[1], s = n[2], o = r[i], u = r[s], l = a, f = l.length - 1; f >= 0; f--) {
        var h = l[f], v = h[1], d = h[2];
        (r[v] === o && r[d] === u || r[v] === u && r[d] === o) && l.splice(f, 1);
      }
      for (var c = 0; c < l.length; c++) {
        var y = l[c];
        y[1] === u ? (l[c] = y.slice(), l[c][1] = o) : y[2] === u && (l[c] = y.slice(), l[c][2] = o);
      }
      for (var p = 0; p < r.length; p++)
        r[p] === u && (r[p] = o);
      return l;
    }, li = function(e, r, a, n) {
      for (; a > n; ) {
        var i = Math.floor(Math.random() * r.length);
        r = hf(i, e, r), a--;
      }
      return r;
    }, vf = {
      // Computes the minimum cut of an undirected graph
      // Returns the correct answer with high probability
      kargerStein: function() {
        var e = this, r = this.byGroup(), a = r.nodes, n = r.edges;
        n.unmergeBy(function(ae) {
          return ae.isLoop();
        });
        var i = a.length, s = n.length, o = Math.ceil(Math.pow(Math.log(i) / Math.LN2, 2)), u = Math.floor(i / ff);
        if (i < 2) {
          xt("At least 2 nodes are required for Karger-Stein algorithm");
          return;
        }
        for (var l = [], f = 0; f < s; f++) {
          var h = n[f];
          l.push([f, a.indexOf(h.source()), a.indexOf(h.target())]);
        }
        for (var v = 1 / 0, d = [], c = new Array(i), y = new Array(i), p = new Array(i), g = function(ue, me) {
          for (var ie = 0; ie < i; ie++)
            me[ie] = ue[ie];
        }, m = 0; m <= o; m++) {
          for (var b = 0; b < i; b++)
            y[b] = b;
          var E = li(y, l.slice(), i, u), M = E.slice();
          g(y, p);
          var L = li(y, E, u, 2), w = li(p, M, u, 2);
          L.length <= w.length && L.length < v ? (v = L.length, d = L, g(y, c)) : w.length <= L.length && w.length < v && (v = w.length, d = w, g(p, c));
        }
        for (var k = this.spawn(d.map(function(ae) {
          return n[ae[0]];
        })), D = this.spawn(), F = this.spawn(), G = c[0], N = 0; N < c.length; N++) {
          var X = c[N], B = a[N];
          X === G ? D.merge(B) : F.merge(B);
        }
        var re = function(ue) {
          var me = e.spawn();
          return ue.forEach(function(ie) {
            me.merge(ie), ie.connectedEdges().forEach(function(ge) {
              e.contains(ge) && !k.contains(ge) && me.merge(ge);
            });
          }), me;
        }, K = [re(D), re(F)], W = {
          cut: k,
          components: K,
          // n.b. partitions are included to be compatible with the old api spec
          // (could be removed in a future major version)
          partition1: D,
          partition2: F
        };
        return W;
      }
    }, cf = function(e) {
      return {
        x: e.x,
        y: e.y
      };
    }, vn = function(e, r, a) {
      return {
        x: e.x * r + a.x,
        y: e.y * r + a.y
      };
    }, bs = function(e, r, a) {
      return {
        x: (e.x - a.x) / r,
        y: (e.y - a.y) / r
      };
    }, jr = function(e) {
      return {
        x: e[0],
        y: e[1]
      };
    }, df = function(e) {
      for (var r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0, a = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : e.length, n = 1 / 0, i = r; i < a; i++) {
        var s = e[i];
        isFinite(s) && (n = Math.min(s, n));
      }
      return n;
    }, gf = function(e) {
      for (var r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0, a = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : e.length, n = -1 / 0, i = r; i < a; i++) {
        var s = e[i];
        isFinite(s) && (n = Math.max(s, n));
      }
      return n;
    }, pf = function(e) {
      for (var r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0, a = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : e.length, n = 0, i = 0, s = r; s < a; s++) {
        var o = e[s];
        isFinite(o) && (n += o, i++);
      }
      return n / i;
    }, yf = function(e) {
      var r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0, a = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : e.length, n = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : !0, i = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : !0, s = arguments.length > 5 && arguments[5] !== void 0 ? arguments[5] : !0;
      n ? e = e.slice(r, a) : (a < e.length && e.splice(a, e.length - a), r > 0 && e.splice(0, r));
      for (var o = 0, u = e.length - 1; u >= 0; u--) {
        var l = e[u];
        s ? isFinite(l) || (e[u] = -1 / 0, o++) : e.splice(u, 1);
      }
      i && e.sort(function(v, d) {
        return v - d;
      });
      var f = e.length, h = Math.floor(f / 2);
      return f % 2 !== 0 ? e[h + 1 + o] : (e[h - 1 + o] + e[h + o]) / 2;
    }, mf = function(e) {
      return Math.PI * e / 180;
    }, cn = function(e, r) {
      return Math.atan2(r, e) - Math.PI / 2;
    }, ui = Math.log2 || function(t) {
      return Math.log(t) / Math.log(2);
    }, Es = function(e) {
      return e > 0 ? 1 : e < 0 ? -1 : 0;
    }, Br = function(e, r) {
      return Math.sqrt(Fr(e, r));
    }, Fr = function(e, r) {
      var a = r.x - e.x, n = r.y - e.y;
      return a * a + n * n;
    }, bf = function(e) {
      for (var r = e.length, a = 0, n = 0; n < r; n++)
        a += e[n];
      for (var i = 0; i < r; i++)
        e[i] = e[i] / a;
      return e;
    }, Lt = function(e, r, a, n) {
      return (1 - n) * (1 - n) * e + 2 * (1 - n) * n * r + n * n * a;
    }, ea = function(e, r, a, n) {
      return {
        x: Lt(e.x, r.x, a.x, n),
        y: Lt(e.y, r.y, a.y, n)
      };
    }, Ef = function(e, r, a, n) {
      var i = {
        x: r.x - e.x,
        y: r.y - e.y
      }, s = Br(e, r), o = {
        x: i.x / s,
        y: i.y / s
      };
      return a = a ?? 0, n = n ?? a * s, {
        x: e.x + o.x * n,
        y: e.y + o.y * n
      };
    }, ka = function(e, r, a) {
      return Math.max(e, Math.min(a, r));
    }, Yt = function(e) {
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
    }, wf = function(e) {
      return {
        x1: e.x1,
        x2: e.x2,
        w: e.w,
        y1: e.y1,
        y2: e.y2,
        h: e.h
      };
    }, xf = function(e) {
      e.x1 = 1 / 0, e.y1 = 1 / 0, e.x2 = -1 / 0, e.y2 = -1 / 0, e.w = 0, e.h = 0;
    }, Tf = function(e, r, a) {
      return {
        x1: e.x1 + r,
        x2: e.x2 + r,
        y1: e.y1 + a,
        y2: e.y2 + a,
        w: e.w,
        h: e.h
      };
    }, ws = function(e, r) {
      e.x1 = Math.min(e.x1, r.x1), e.x2 = Math.max(e.x2, r.x2), e.w = e.x2 - e.x1, e.y1 = Math.min(e.y1, r.y1), e.y2 = Math.max(e.y2, r.y2), e.h = e.y2 - e.y1;
    }, Cf = function(e, r, a) {
      e.x1 = Math.min(e.x1, r), e.x2 = Math.max(e.x2, r), e.w = e.x2 - e.x1, e.y1 = Math.min(e.y1, a), e.y2 = Math.max(e.y2, a), e.h = e.y2 - e.y1;
    }, dn = function(e) {
      var r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
      return e.x1 -= r, e.x2 += r, e.y1 -= r, e.y2 += r, e.w = e.x2 - e.x1, e.h = e.y2 - e.y1, e;
    }, gn = function(e) {
      var r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [0], a, n, i, s;
      if (r.length === 1)
        a = n = i = s = r[0];
      else if (r.length === 2)
        a = i = r[0], s = n = r[1];
      else if (r.length === 4) {
        var o = x(r, 4);
        a = o[0], n = o[1], i = o[2], s = o[3];
      }
      return e.x1 -= s, e.x2 += n, e.y1 -= a, e.y2 += i, e.w = e.x2 - e.x1, e.h = e.y2 - e.y1, e;
    }, xs = function(e, r) {
      e.x1 = r.x1, e.y1 = r.y1, e.x2 = r.x2, e.y2 = r.y2, e.w = e.x2 - e.x1, e.h = e.y2 - e.y1;
    }, fi = function(e, r) {
      return !(e.x1 > r.x2 || r.x1 > e.x2 || e.x2 < r.x1 || r.x2 < e.x1 || e.y2 < r.y1 || r.y2 < e.y1 || e.y1 > r.y2 || r.y1 > e.y2);
    }, ta = function(e, r, a) {
      return e.x1 <= r && r <= e.x2 && e.y1 <= a && a <= e.y2;
    }, Df = function(e, r) {
      return ta(e, r.x, r.y);
    }, Ts = function(e, r) {
      return ta(e, r.x1, r.y1) && ta(e, r.x2, r.y2);
    }, Cs = function(e, r, a, n, i, s, o) {
      var u = Fa(i, s), l = i / 2, f = s / 2, h;
      {
        var v = a - l + u - o, d = n - f - o, c = a + l - u + o, y = d;
        if (h = Cr(e, r, a, n, v, d, c, y, !1), h.length > 0)
          return h;
      }
      {
        var p = a + l + o, g = n - f + u - o, m = p, b = n + f - u + o;
        if (h = Cr(e, r, a, n, p, g, m, b, !1), h.length > 0)
          return h;
      }
      {
        var E = a - l + u - o, M = n + f + o, L = a + l - u + o, w = M;
        if (h = Cr(e, r, a, n, E, M, L, w, !1), h.length > 0)
          return h;
      }
      {
        var k = a - l - o, D = n - f + u - o, F = k, G = n + f - u + o;
        if (h = Cr(e, r, a, n, k, D, F, G, !1), h.length > 0)
          return h;
      }
      var N;
      {
        var X = a - l + u, B = n - f + u;
        if (N = Pa(e, r, a, n, X, B, u + o), N.length > 0 && N[0] <= X && N[1] <= B)
          return [N[0], N[1]];
      }
      {
        var re = a + l - u, K = n - f + u;
        if (N = Pa(e, r, a, n, re, K, u + o), N.length > 0 && N[0] >= re && N[1] <= K)
          return [N[0], N[1]];
      }
      {
        var W = a + l - u, ae = n + f - u;
        if (N = Pa(e, r, a, n, W, ae, u + o), N.length > 0 && N[0] >= W && N[1] >= ae)
          return [N[0], N[1]];
      }
      {
        var ue = a - l + u, me = n + f - u;
        if (N = Pa(e, r, a, n, ue, me, u + o), N.length > 0 && N[0] <= ue && N[1] >= me)
          return [N[0], N[1]];
      }
      return [];
    }, Sf = function(e, r, a, n, i, s, o) {
      var u = o, l = Math.min(a, i), f = Math.max(a, i), h = Math.min(n, s), v = Math.max(n, s);
      return l - u <= e && e <= f + u && h - u <= r && r <= v + u;
    }, Lf = function(e, r, a, n, i, s, o, u, l) {
      var f = {
        x1: Math.min(a, o, i) - l,
        x2: Math.max(a, o, i) + l,
        y1: Math.min(n, u, s) - l,
        y2: Math.max(n, u, s) + l
      };
      return !(e < f.x1 || e > f.x2 || r < f.y1 || r > f.y2);
    }, Af = function(e, r, a, n) {
      a -= n;
      var i = r * r - 4 * e * a;
      if (i < 0)
        return [];
      var s = Math.sqrt(i), o = 2 * e, u = (-r + s) / o, l = (-r - s) / o;
      return [u, l];
    }, Of = function(e, r, a, n, i) {
      var s = 1e-5;
      e === 0 && (e = s), r /= e, a /= e, n /= e;
      var o, u, l, f, h, v, d, c;
      if (u = (3 * a - r * r) / 9, l = -(27 * n) + r * (9 * a - 2 * (r * r)), l /= 54, o = u * u * u + l * l, i[1] = 0, d = r / 3, o > 0) {
        h = l + Math.sqrt(o), h = h < 0 ? -Math.pow(-h, 1 / 3) : Math.pow(h, 1 / 3), v = l - Math.sqrt(o), v = v < 0 ? -Math.pow(-v, 1 / 3) : Math.pow(v, 1 / 3), i[0] = -d + h + v, d += (h + v) / 2, i[4] = i[2] = -d, d = Math.sqrt(3) * (-v + h) / 2, i[3] = d, i[5] = -d;
        return;
      }
      if (i[5] = i[3] = 0, o === 0) {
        c = l < 0 ? -Math.pow(-l, 1 / 3) : Math.pow(l, 1 / 3), i[0] = -d + 2 * c, i[4] = i[2] = -(c + d);
        return;
      }
      u = -u, f = u * u * u, f = Math.acos(l / Math.sqrt(f)), c = 2 * Math.sqrt(u), i[0] = -d + c * Math.cos(f / 3), i[2] = -d + c * Math.cos((f + 2 * Math.PI) / 3), i[4] = -d + c * Math.cos((f + 4 * Math.PI) / 3);
    }, Nf = function(e, r, a, n, i, s, o, u) {
      var l = 1 * a * a - 4 * a * i + 2 * a * o + 4 * i * i - 4 * i * o + o * o + n * n - 4 * n * s + 2 * n * u + 4 * s * s - 4 * s * u + u * u, f = 1 * 9 * a * i - 3 * a * a - 3 * a * o - 6 * i * i + 3 * i * o + 9 * n * s - 3 * n * n - 3 * n * u - 6 * s * s + 3 * s * u, h = 1 * 3 * a * a - 6 * a * i + a * o - a * e + 2 * i * i + 2 * i * e - o * e + 3 * n * n - 6 * n * s + n * u - n * r + 2 * s * s + 2 * s * r - u * r, v = 1 * a * i - a * a + a * e - i * e + n * s - n * n + n * r - s * r, d = [];
      Of(l, f, h, v, d);
      for (var c = 1e-7, y = [], p = 0; p < 6; p += 2)
        Math.abs(d[p + 1]) < c && d[p] >= 0 && d[p] <= 1 && y.push(d[p]);
      y.push(1), y.push(0);
      for (var g = -1, m, b, E, M = 0; M < y.length; M++)
        m = Math.pow(1 - y[M], 2) * a + 2 * (1 - y[M]) * y[M] * i + y[M] * y[M] * o, b = Math.pow(1 - y[M], 2) * n + 2 * (1 - y[M]) * y[M] * s + y[M] * y[M] * u, E = Math.pow(m - e, 2) + Math.pow(b - r, 2), g >= 0 ? E < g && (g = E) : g = E;
      return g;
    }, If = function(e, r, a, n, i, s) {
      var o = [e - a, r - n], u = [i - a, s - n], l = u[0] * u[0] + u[1] * u[1], f = o[0] * o[0] + o[1] * o[1], h = o[0] * u[0] + o[1] * u[1], v = h * h / l;
      return h < 0 ? f : v > l ? (e - i) * (e - i) + (r - s) * (r - s) : f - v;
    }, Ht = function(e, r, a) {
      for (var n, i, s, o, u, l = 0, f = 0; f < a.length / 2; f++)
        if (n = a[f * 2], i = a[f * 2 + 1], f + 1 < a.length / 2 ? (s = a[(f + 1) * 2], o = a[(f + 1) * 2 + 1]) : (s = a[(f + 1 - a.length / 2) * 2], o = a[(f + 1 - a.length / 2) * 2 + 1]), !(n == e && s == e))
          if (n >= e && e >= s || n <= e && e <= s)
            u = (e - n) / (s - n) * (o - i) + i, u > r && l++;
          else
            continue;
      return l % 2 !== 0;
    }, pr = function(e, r, a, n, i, s, o, u, l) {
      var f = new Array(a.length), h;
      u[0] != null ? (h = Math.atan(u[1] / u[0]), u[0] < 0 ? h = h + Math.PI / 2 : h = -h - Math.PI / 2) : h = u;
      for (var v = Math.cos(-h), d = Math.sin(-h), c = 0; c < f.length / 2; c++)
        f[c * 2] = s / 2 * (a[c * 2] * v - a[c * 2 + 1] * d), f[c * 2 + 1] = o / 2 * (a[c * 2 + 1] * v + a[c * 2] * d), f[c * 2] += n, f[c * 2 + 1] += i;
      var y;
      if (l > 0) {
        var p = yn(f, -l);
        y = pn(p);
      } else
        y = f;
      return Ht(e, r, y);
    }, Mf = function(e, r, a, n, i, s, o) {
      for (var u = new Array(a.length), l = s / 2, f = o / 2, h = ci(s, o), v = h * h, d = 0; d < a.length / 4; d++) {
        var c = void 0, y = void 0;
        d === 0 ? c = a.length - 2 : c = d * 4 - 2, y = d * 4 + 2;
        var p = n + l * a[d * 4], g = i + f * a[d * 4 + 1], m = -a[c] * a[y] - a[c + 1] * a[y + 1], b = h / Math.tan(Math.acos(m) / 2), E = p - b * a[c], M = g - b * a[c + 1], L = p + b * a[y], w = g + b * a[y + 1];
        u[d * 4] = E, u[d * 4 + 1] = M, u[d * 4 + 2] = L, u[d * 4 + 3] = w;
        var k = a[c + 1], D = -a[c], F = k * a[y] + D * a[y + 1];
        F < 0 && (k *= -1, D *= -1);
        var G = E + k * h, N = M + D * h, X = Math.pow(G - e, 2) + Math.pow(N - r, 2);
        if (X <= v)
          return !0;
      }
      return Ht(e, r, u);
    }, pn = function(e) {
      for (var r = new Array(e.length / 2), a, n, i, s, o, u, l, f, h = 0; h < e.length / 4; h++) {
        a = e[h * 4], n = e[h * 4 + 1], i = e[h * 4 + 2], s = e[h * 4 + 3], h < e.length / 4 - 1 ? (o = e[(h + 1) * 4], u = e[(h + 1) * 4 + 1], l = e[(h + 1) * 4 + 2], f = e[(h + 1) * 4 + 3]) : (o = e[0], u = e[1], l = e[2], f = e[3]);
        var v = Cr(a, n, i, s, o, u, l, f, !0);
        r[h * 2] = v[0], r[h * 2 + 1] = v[1];
      }
      return r;
    }, yn = function(e, r) {
      for (var a = new Array(e.length * 2), n, i, s, o, u = 0; u < e.length / 2; u++) {
        n = e[u * 2], i = e[u * 2 + 1], u < e.length / 2 - 1 ? (s = e[(u + 1) * 2], o = e[(u + 1) * 2 + 1]) : (s = e[0], o = e[1]);
        var l = o - i, f = -(s - n), h = Math.sqrt(l * l + f * f), v = l / h, d = f / h;
        a[u * 4] = n + v * r, a[u * 4 + 1] = i + d * r, a[u * 4 + 2] = s + v * r, a[u * 4 + 3] = o + d * r;
      }
      return a;
    }, Rf = function(e, r, a, n, i, s) {
      var o = a - e, u = n - r;
      o /= i, u /= s;
      var l = Math.sqrt(o * o + u * u), f = l - 1;
      if (f < 0)
        return [];
      var h = f / l;
      return [(a - e) * h + e, (n - r) * h + r];
    }, Gr = function(e, r, a, n, i, s, o) {
      return e -= i, r -= s, e /= a / 2 + o, r /= n / 2 + o, e * e + r * r <= 1;
    }, Pa = function(e, r, a, n, i, s, o) {
      var u = [a - e, n - r], l = [e - i, r - s], f = u[0] * u[0] + u[1] * u[1], h = 2 * (l[0] * u[0] + l[1] * u[1]), v = l[0] * l[0] + l[1] * l[1] - o * o, d = h * h - 4 * f * v;
      if (d < 0)
        return [];
      var c = (-h + Math.sqrt(d)) / (2 * f), y = (-h - Math.sqrt(d)) / (2 * f), p = Math.min(c, y), g = Math.max(c, y), m = [];
      if (p >= 0 && p <= 1 && m.push(p), g >= 0 && g <= 1 && m.push(g), m.length === 0)
        return [];
      var b = m[0] * u[0] + e, E = m[0] * u[1] + r;
      if (m.length > 1) {
        if (m[0] == m[1])
          return [b, E];
        var M = m[1] * u[0] + e, L = m[1] * u[1] + r;
        return [b, E, M, L];
      } else
        return [b, E];
    }, hi = function(e, r, a) {
      return r <= e && e <= a || a <= e && e <= r ? e : e <= r && r <= a || a <= r && r <= e ? r : a;
    }, Cr = function(e, r, a, n, i, s, o, u, l) {
      var f = e - i, h = a - e, v = o - i, d = r - s, c = n - r, y = u - s, p = v * d - y * f, g = h * d - c * f, m = y * h - v * c;
      if (m !== 0) {
        var b = p / m, E = g / m, M = 1e-3, L = 0 - M, w = 1 + M;
        return L <= b && b <= w && L <= E && E <= w ? [e + b * h, r + b * c] : l ? [e + b * h, r + b * c] : [];
      } else
        return p === 0 || g === 0 ? hi(e, a, o) === o ? [o, u] : hi(e, a, i) === i ? [i, s] : hi(i, o, a) === a ? [a, n] : [] : [];
    }, Ba = function(e, r, a, n, i, s, o, u) {
      var l = [], f, h = new Array(a.length), v = !0;
      s == null && (v = !1);
      var d;
      if (v) {
        for (var c = 0; c < h.length / 2; c++)
          h[c * 2] = a[c * 2] * s + n, h[c * 2 + 1] = a[c * 2 + 1] * o + i;
        if (u > 0) {
          var y = yn(h, -u);
          d = pn(y);
        } else
          d = h;
      } else
        d = a;
      for (var p, g, m, b, E = 0; E < d.length / 2; E++)
        p = d[E * 2], g = d[E * 2 + 1], E < d.length / 2 - 1 ? (m = d[(E + 1) * 2], b = d[(E + 1) * 2 + 1]) : (m = d[0], b = d[1]), f = Cr(e, r, n, i, p, g, m, b), f.length !== 0 && l.push(f[0], f[1]);
      return l;
    }, kf = function(e, r, a, n, i, s, o, u) {
      for (var l = [], f, h = new Array(a.length), v = s / 2, d = o / 2, c = ci(s, o), y = 0; y < a.length / 4; y++) {
        var p = void 0, g = void 0;
        y === 0 ? p = a.length - 2 : p = y * 4 - 2, g = y * 4 + 2;
        var m = n + v * a[y * 4], b = i + d * a[y * 4 + 1], E = -a[p] * a[g] - a[p + 1] * a[g + 1], M = c / Math.tan(Math.acos(E) / 2), L = m - M * a[p], w = b - M * a[p + 1], k = m + M * a[g], D = b + M * a[g + 1];
        y === 0 ? (h[a.length - 2] = L, h[a.length - 1] = w) : (h[y * 4 - 2] = L, h[y * 4 - 1] = w), h[y * 4] = k, h[y * 4 + 1] = D;
        var F = a[p + 1], G = -a[p], N = F * a[g] + G * a[g + 1];
        N < 0 && (F *= -1, G *= -1);
        var X = L + F * c, B = w + G * c;
        f = Pa(e, r, n, i, X, B, c), f.length !== 0 && l.push(f[0], f[1]);
      }
      for (var re = 0; re < h.length / 4; re++)
        f = Cr(e, r, n, i, h[re * 4], h[re * 4 + 1], h[re * 4 + 2], h[re * 4 + 3], !1), f.length !== 0 && l.push(f[0], f[1]);
      if (l.length > 2) {
        for (var K = [l[0], l[1]], W = Math.pow(K[0] - e, 2) + Math.pow(K[1] - r, 2), ae = 1; ae < l.length / 2; ae++) {
          var ue = Math.pow(l[ae * 2] - e, 2) + Math.pow(l[ae * 2 + 1] - r, 2);
          ue <= W && (K[0] = l[ae * 2], K[1] = l[ae * 2 + 1], W = ue);
        }
        return K;
      }
      return l;
    }, mn = function(e, r, a) {
      var n = [e[0] - r[0], e[1] - r[1]], i = Math.sqrt(n[0] * n[0] + n[1] * n[1]), s = (i - a) / i;
      return s < 0 && (s = 1e-5), [r[0] + s * n[0], r[1] + s * n[1]];
    }, $t = function(e, r) {
      var a = vi(e, r);
      return a = Ds(a), a;
    }, Ds = function(e) {
      for (var r, a, n = e.length / 2, i = 1 / 0, s = 1 / 0, o = -1 / 0, u = -1 / 0, l = 0; l < n; l++)
        r = e[2 * l], a = e[2 * l + 1], i = Math.min(i, r), o = Math.max(o, r), s = Math.min(s, a), u = Math.max(u, a);
      for (var f = 2 / (o - i), h = 2 / (u - s), v = 0; v < n; v++)
        r = e[2 * v] = e[2 * v] * f, a = e[2 * v + 1] = e[2 * v + 1] * h, i = Math.min(i, r), o = Math.max(o, r), s = Math.min(s, a), u = Math.max(u, a);
      if (s < -1)
        for (var d = 0; d < n; d++)
          a = e[2 * d + 1] = e[2 * d + 1] + (-1 - s);
      return e;
    }, vi = function(e, r) {
      var a = 1 / e * 2 * Math.PI, n = e % 2 === 0 ? Math.PI / 2 + a / 2 : Math.PI / 2;
      n += r;
      for (var i = new Array(e * 2), s, o = 0; o < e; o++)
        s = o * a + n, i[2 * o] = Math.cos(s), i[2 * o + 1] = Math.sin(-s);
      return i;
    }, Fa = function(e, r) {
      return Math.min(e / 4, r / 4, 8);
    }, ci = function(e, r) {
      return Math.min(e / 10, r / 10, 8);
    }, Ss = function() {
      return 8;
    }, Pf = function(e, r, a) {
      return [e - 2 * r + a, 2 * (r - e), e];
    }, di = function(e, r) {
      return {
        heightOffset: Math.min(15, 0.05 * r),
        widthOffset: Math.min(100, 0.25 * e),
        ctrlPtOffsetPct: 0.05
      };
    }, Bf = At({
      dampingFactor: 0.8,
      precision: 1e-6,
      iterations: 200,
      weight: function(e) {
        return 1;
      }
    }), Ff = {
      pageRank: function(e) {
        for (var r = Bf(e), a = r.dampingFactor, n = r.precision, i = r.iterations, s = r.weight, o = this._private.cy, u = this.byGroup(), l = u.nodes, f = u.edges, h = l.length, v = h * h, d = f.length, c = new Array(v), y = new Array(h), p = (1 - a) / h, g = 0; g < h; g++) {
          for (var m = 0; m < h; m++) {
            var b = g * h + m;
            c[b] = 0;
          }
          y[g] = 0;
        }
        for (var E = 0; E < d; E++) {
          var M = f[E], L = M.data("source"), w = M.data("target");
          if (L !== w) {
            var k = l.indexOfId(L), D = l.indexOfId(w), F = s(M), G = D * h + k;
            c[G] += F, y[k] += F;
          }
        }
        for (var N = 1 / h + p, X = 0; X < h; X++)
          if (y[X] === 0)
            for (var B = 0; B < h; B++) {
              var re = B * h + X;
              c[re] = N;
            }
          else
            for (var K = 0; K < h; K++) {
              var W = K * h + X;
              c[W] = c[W] / y[X] + p;
            }
        for (var ae = new Array(h), ue = new Array(h), me, ie = 0; ie < h; ie++)
          ae[ie] = 1;
        for (var ge = 0; ge < i; ge++) {
          for (var Ee = 0; Ee < h; Ee++)
            ue[Ee] = 0;
          for (var Ce = 0; Ce < h; Ce++)
            for (var we = 0; we < h; we++) {
              var De = Ce * h + we;
              ue[Ce] += c[De] * ae[we];
            }
          bf(ue), me = ae, ae = ue, ue = me;
          for (var se = 0, xe = 0; xe < h; xe++) {
            var Le = me[xe] - ae[xe];
            se += Le * Le;
          }
          if (se < n)
            break;
        }
        var Se = {
          rank: function(Fe) {
            return Fe = o.collection(Fe)[0], ae[l.indexOf(Fe)];
          }
        };
        return Se;
      }
      // pageRank
    }, Ls = At({
      root: null,
      weight: function(e) {
        return 1;
      },
      directed: !1,
      alpha: 0
    }), ra = {
      degreeCentralityNormalized: function(e) {
        e = Ls(e);
        var r = this.cy(), a = this.nodes(), n = a.length;
        if (e.directed) {
          for (var f = {}, h = {}, v = 0, d = 0, c = 0; c < n; c++) {
            var y = a[c], p = y.id();
            e.root = y;
            var g = this.degreeCentrality(e);
            v < g.indegree && (v = g.indegree), d < g.outdegree && (d = g.outdegree), f[p] = g.indegree, h[p] = g.outdegree;
          }
          return {
            indegree: function(b) {
              return v == 0 ? 0 : (ee(b) && (b = r.filter(b)), f[b.id()] / v);
            },
            outdegree: function(b) {
              return d === 0 ? 0 : (ee(b) && (b = r.filter(b)), h[b.id()] / d);
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
            degree: function(b) {
              return s === 0 ? 0 : (ee(b) && (b = r.filter(b)), i[b.id()] / s);
            }
          };
        }
      },
      // degreeCentralityNormalized
      // Implemented from the algorithm in Opsahl's paper
      // "Node centrality in weighted networks: Generalizing degree and shortest paths"
      // check the heading 2 "Degree"
      degreeCentrality: function(e) {
        e = Ls(e);
        var r = this.cy(), a = this, n = e, i = n.root, s = n.weight, o = n.directed, u = n.alpha;
        if (i = r.collection(i)[0], o) {
          for (var d = i.connectedEdges(), c = d.filter(function(L) {
            return L.target().same(i) && a.has(L);
          }), y = d.filter(function(L) {
            return L.source().same(i) && a.has(L);
          }), p = c.length, g = y.length, m = 0, b = 0, E = 0; E < c.length; E++)
            m += s(c[E]);
          for (var M = 0; M < y.length; M++)
            b += s(y[M]);
          return {
            indegree: Math.pow(p, 1 - u) * Math.pow(m, u),
            outdegree: Math.pow(g, 1 - u) * Math.pow(b, u)
          };
        } else {
          for (var l = i.connectedEdges().intersection(a), f = l.length, h = 0, v = 0; v < l.length; v++)
            h += s(l[v]);
          return {
            degree: Math.pow(f, 1 - u) * Math.pow(h, u)
          };
        }
      }
      // degreeCentrality
    };
    ra.dc = ra.degreeCentrality, ra.dcn = ra.degreeCentralityNormalised = ra.degreeCentralityNormalized;
    var As = At({
      harmonic: !0,
      weight: function() {
        return 1;
      },
      directed: !1,
      root: null
    }), aa = {
      closenessCentralityNormalized: function(e) {
        for (var r = As(e), a = r.harmonic, n = r.weight, i = r.directed, s = this.cy(), o = {}, u = 0, l = this.nodes(), f = this.floydWarshall({
          weight: n,
          directed: i
        }), h = 0; h < l.length; h++) {
          for (var v = 0, d = l[h], c = 0; c < l.length; c++)
            if (h !== c) {
              var y = f.distance(d, l[c]);
              a ? v += 1 / y : v += y;
            }
          a || (v = 1 / v), u < v && (u = v), o[d.id()] = v;
        }
        return {
          closeness: function(g) {
            return u == 0 ? 0 : (ee(g) ? g = s.filter(g)[0].id() : g = g.id(), o[g] / u);
          }
        };
      },
      // Implemented from pseudocode from wikipedia
      closenessCentrality: function(e) {
        var r = As(e), a = r.root, n = r.weight, i = r.directed, s = r.harmonic;
        a = this.filter(a)[0];
        for (var o = this.dijkstra({
          root: a,
          weight: n,
          directed: i
        }), u = 0, l = this.nodes(), f = 0; f < l.length; f++) {
          var h = l[f];
          if (!h.same(a)) {
            var v = o.distanceTo(h);
            s ? u += 1 / v : u += v;
          }
        }
        return s ? u : 1 / u;
      }
      // closenessCentrality
    };
    aa.cc = aa.closenessCentrality, aa.ccn = aa.closenessCentralityNormalised = aa.closenessCentralityNormalized;
    var Gf = At({
      weight: null,
      directed: !1
    }), gi = {
      // Implemented from the algorithm in the paper "On Variants of Shortest-Path Betweenness Centrality and their Generic Computation" by Ulrik Brandes
      betweennessCentrality: function(e) {
        for (var r = Gf(e), a = r.directed, n = r.weight, i = n != null, s = this.cy(), o = this.nodes(), u = {}, l = {}, f = 0, h = {
          set: function(b, E) {
            l[b] = E, E > f && (f = E);
          },
          get: function(b) {
            return l[b];
          }
        }, v = 0; v < o.length; v++) {
          var d = o[v], c = d.id();
          a ? u[c] = d.outgoers().nodes() : u[c] = d.openNeighborhood().nodes(), h.set(c, 0);
        }
        for (var y = function(b) {
          for (var E = o[b].id(), M = [], L = {}, w = {}, k = {}, D = new Ra(function(we, De) {
            return k[we] - k[De];
          }), F = 0; F < o.length; F++) {
            var G = o[F].id();
            L[G] = [], w[G] = 0, k[G] = 1 / 0;
          }
          for (w[E] = 1, k[E] = 0, D.push(E); !D.empty(); ) {
            var N = D.pop();
            if (M.push(N), i)
              for (var X = 0; X < u[N].length; X++) {
                var B = u[N][X], re = s.getElementById(N), K = void 0;
                re.edgesTo(B).length > 0 ? K = re.edgesTo(B)[0] : K = B.edgesTo(re)[0];
                var W = n(K);
                B = B.id(), k[B] > k[N] + W && (k[B] = k[N] + W, D.nodes.indexOf(B) < 0 ? D.push(B) : D.updateItem(B), w[B] = 0, L[B] = []), k[B] == k[N] + W && (w[B] = w[B] + w[N], L[B].push(N));
              }
            else
              for (var ae = 0; ae < u[N].length; ae++) {
                var ue = u[N][ae].id();
                k[ue] == 1 / 0 && (D.push(ue), k[ue] = k[N] + 1), k[ue] == k[N] + 1 && (w[ue] = w[ue] + w[N], L[ue].push(N));
              }
          }
          for (var me = {}, ie = 0; ie < o.length; ie++)
            me[o[ie].id()] = 0;
          for (; M.length > 0; ) {
            for (var ge = M.pop(), Ee = 0; Ee < L[ge].length; Ee++) {
              var Ce = L[ge][Ee];
              me[Ce] = me[Ce] + w[Ce] / w[ge] * (1 + me[ge]);
            }
            ge != o[b].id() && h.set(ge, h.get(ge) + me[ge]);
          }
        }, p = 0; p < o.length; p++)
          y(p);
        var g = {
          betweenness: function(b) {
            var E = s.collection(b).id();
            return h.get(E);
          },
          betweennessNormalized: function(b) {
            if (f == 0)
              return 0;
            var E = s.collection(b).id();
            return h.get(E) / f;
          }
        };
        return g.betweennessNormalised = g.betweennessNormalized, g;
      }
      // betweennessCentrality
    };
    gi.bc = gi.betweennessCentrality;
    var zf = At({
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
    }), Vf = function(e) {
      return zf(e);
    }, Uf = function(e, r) {
      for (var a = 0, n = 0; n < r.length; n++)
        a += r[n](e);
      return a;
    }, $f = function(e, r, a) {
      for (var n = 0; n < r; n++)
        e[n * r + n] = a;
    }, Os = function(e, r) {
      for (var a, n = 0; n < r; n++) {
        a = 0;
        for (var i = 0; i < r; i++)
          a += e[i * r + n];
        for (var s = 0; s < r; s++)
          e[s * r + n] = e[s * r + n] / a;
      }
    }, _f = function(e, r, a) {
      for (var n = new Array(a * a), i = 0; i < a; i++) {
        for (var s = 0; s < a; s++)
          n[i * a + s] = 0;
        for (var o = 0; o < a; o++)
          for (var u = 0; u < a; u++)
            n[i * a + u] += e[i * a + o] * r[o * a + u];
      }
      return n;
    }, Yf = function(e, r, a) {
      for (var n = e.slice(0), i = 1; i < a; i++)
        e = _f(e, n, r);
      return e;
    }, Hf = function(e, r, a) {
      for (var n = new Array(r * r), i = 0; i < r * r; i++)
        n[i] = Math.pow(e[i], a);
      return Os(n, r), n;
    }, Xf = function(e, r, a, n) {
      for (var i = 0; i < a; i++) {
        var s = Math.round(e[i] * Math.pow(10, n)) / Math.pow(10, n), o = Math.round(r[i] * Math.pow(10, n)) / Math.pow(10, n);
        if (s !== o)
          return !1;
      }
      return !0;
    }, Wf = function(e, r, a, n) {
      for (var i = [], s = 0; s < r; s++) {
        for (var o = [], u = 0; u < r; u++)
          Math.round(e[s * r + u] * 1e3) / 1e3 > 0 && o.push(a[u]);
        o.length !== 0 && i.push(n.collection(o));
      }
      return i;
    }, qf = function(e, r) {
      for (var a = 0; a < e.length; a++)
        if (!r[a] || e[a].id() !== r[a].id())
          return !1;
      return !0;
    }, Kf = function(e) {
      for (var r = 0; r < e.length; r++)
        for (var a = 0; a < e.length; a++)
          r != a && qf(e[r], e[a]) && e.splice(a, 1);
      return e;
    }, Ns = function(e) {
      for (var r = this.nodes(), a = this.edges(), n = this.cy(), i = Vf(e), s = {}, o = 0; o < r.length; o++)
        s[r[o].id()] = o;
      for (var u = r.length, l = u * u, f = new Array(l), h, v = 0; v < l; v++)
        f[v] = 0;
      for (var d = 0; d < a.length; d++) {
        var c = a[d], y = s[c.source().id()], p = s[c.target().id()], g = Uf(c, i.attributes);
        f[y * u + p] += g, f[p * u + y] += g;
      }
      $f(f, u, i.multFactor), Os(f, u);
      for (var m = !0, b = 0; m && b < i.maxIterations; )
        m = !1, h = Yf(f, u, i.expandFactor), f = Hf(h, u, i.inflateFactor), Xf(f, h, l, 4) || (m = !0), b++;
      var E = Wf(f, u, r, n);
      return E = Kf(E), E;
    }, Zf = {
      markovClustering: Ns,
      mcl: Ns
    }, Qf = function(e) {
      return e;
    }, Is = function(e, r) {
      return Math.abs(r - e);
    }, Ms = function(e, r, a) {
      return e + Is(r, a);
    }, Rs = function(e, r, a) {
      return e + Math.pow(a - r, 2);
    }, Jf = function(e) {
      return Math.sqrt(e);
    }, jf = function(e, r, a) {
      return Math.max(e, Is(r, a));
    }, Ga = function(e, r, a, n, i) {
      for (var s = arguments.length > 5 && arguments[5] !== void 0 ? arguments[5] : Qf, o = n, u, l, f = 0; f < e; f++)
        u = r(f), l = a(f), o = i(o, u, l);
      return s(o);
    }, na = {
      euclidean: function(e, r, a) {
        return e >= 2 ? Ga(e, r, a, 0, Rs, Jf) : Ga(e, r, a, 0, Ms);
      },
      squaredEuclidean: function(e, r, a) {
        return Ga(e, r, a, 0, Rs);
      },
      manhattan: function(e, r, a) {
        return Ga(e, r, a, 0, Ms);
      },
      max: function(e, r, a) {
        return Ga(e, r, a, -1 / 0, jf);
      }
    };
    na["squared-euclidean"] = na.squaredEuclidean, na.squaredeuclidean = na.squaredEuclidean;
    function bn(t, e, r, a, n, i) {
      var s;
      return H(t) ? s = t : s = na[t] || na.euclidean, e === 0 && H(t) ? s(n, i) : s(e, r, a, n, i);
    }
    var eh = At({
      k: 2,
      m: 2,
      sensitivityThreshold: 1e-4,
      distance: "euclidean",
      maxIterations: 10,
      attributes: [],
      testMode: !1,
      testCentroids: null
    }), pi = function(e) {
      return eh(e);
    }, En = function(e, r, a, n, i) {
      var s = i !== "kMedoids", o = s ? function(h) {
        return a[h];
      } : function(h) {
        return n[h](a);
      }, u = function(v) {
        return n[v](r);
      }, l = a, f = r;
      return bn(e, n.length, o, u, l, f);
    }, yi = function(e, r, a) {
      for (var n = a.length, i = new Array(n), s = new Array(n), o = new Array(r), u = null, l = 0; l < n; l++)
        i[l] = e.min(a[l]).value, s[l] = e.max(a[l]).value;
      for (var f = 0; f < r; f++) {
        u = [];
        for (var h = 0; h < n; h++)
          u[h] = Math.random() * (s[h] - i[h]) + i[h];
        o[f] = u;
      }
      return o;
    }, ks = function(e, r, a, n, i) {
      for (var s = 1 / 0, o = 0, u = 0; u < r.length; u++) {
        var l = En(a, e, r[u], n, i);
        l < s && (s = l, o = u);
      }
      return o;
    }, Ps = function(e, r, a) {
      for (var n = [], i = null, s = 0; s < r.length; s++)
        i = r[s], a[i.id()] === e && n.push(i);
      return n;
    }, th = function(e, r, a) {
      return Math.abs(r - e) <= a;
    }, rh = function(e, r, a) {
      for (var n = 0; n < e.length; n++)
        for (var i = 0; i < e[n].length; i++) {
          var s = Math.abs(e[n][i] - r[n][i]);
          if (s > a)
            return !1;
        }
      return !0;
    }, ah = function(e, r, a) {
      for (var n = 0; n < a; n++)
        if (e === r[n])
          return !0;
      return !1;
    }, Bs = function(e, r) {
      var a = new Array(r);
      if (e.length < 50)
        for (var n = 0; n < r; n++) {
          for (var i = e[Math.floor(Math.random() * e.length)]; ah(i, a, n); )
            i = e[Math.floor(Math.random() * e.length)];
          a[n] = i;
        }
      else
        for (var s = 0; s < r; s++)
          a[s] = e[Math.floor(Math.random() * e.length)];
      return a;
    }, Fs = function(e, r, a) {
      for (var n = 0, i = 0; i < r.length; i++)
        n += En("manhattan", r[i], e, a, "kMedoids");
      return n;
    }, nh = function(e) {
      var r = this.cy(), a = this.nodes(), n = null, i = pi(e), s = new Array(i.k), o = {}, u;
      i.testMode ? typeof i.testCentroids == "number" ? (i.testCentroids, u = yi(a, i.k, i.attributes)) : _(i.testCentroids) === "object" ? u = i.testCentroids : u = yi(a, i.k, i.attributes) : u = yi(a, i.k, i.attributes);
      for (var l = !0, f = 0; l && f < i.maxIterations; ) {
        for (var h = 0; h < a.length; h++)
          n = a[h], o[n.id()] = ks(n, u, i.distance, i.attributes, "kMeans");
        l = !1;
        for (var v = 0; v < i.k; v++) {
          var d = Ps(v, a, o);
          if (d.length !== 0) {
            for (var c = i.attributes.length, y = u[v], p = new Array(c), g = new Array(c), m = 0; m < c; m++) {
              g[m] = 0;
              for (var b = 0; b < d.length; b++)
                n = d[b], g[m] += i.attributes[m](n);
              p[m] = g[m] / d.length, th(p[m], y[m], i.sensitivityThreshold) || (l = !0);
            }
            u[v] = p, s[v] = r.collection(d);
          }
        }
        f++;
      }
      return s;
    }, ih = function(e) {
      var r = this.cy(), a = this.nodes(), n = null, i = pi(e), s = new Array(i.k), o, u = {}, l, f = new Array(i.k);
      i.testMode ? typeof i.testCentroids == "number" || (_(i.testCentroids) === "object" ? o = i.testCentroids : o = Bs(a, i.k)) : o = Bs(a, i.k);
      for (var h = !0, v = 0; h && v < i.maxIterations; ) {
        for (var d = 0; d < a.length; d++)
          n = a[d], u[n.id()] = ks(n, o, i.distance, i.attributes, "kMedoids");
        h = !1;
        for (var c = 0; c < o.length; c++) {
          var y = Ps(c, a, u);
          if (y.length !== 0) {
            f[c] = Fs(o[c], y, i.attributes);
            for (var p = 0; p < y.length; p++)
              l = Fs(y[p], y, i.attributes), l < f[c] && (f[c] = l, o[c] = y[p], h = !0);
            s[c] = r.collection(y);
          }
        }
        v++;
      }
      return s;
    }, sh = function(e, r, a, n, i) {
      for (var s, o, u = 0; u < r.length; u++)
        for (var l = 0; l < e.length; l++)
          n[u][l] = Math.pow(a[u][l], i.m);
      for (var f = 0; f < e.length; f++)
        for (var h = 0; h < i.attributes.length; h++) {
          s = 0, o = 0;
          for (var v = 0; v < r.length; v++)
            s += n[v][f] * i.attributes[h](r[v]), o += n[v][f];
          e[f][h] = s / o;
        }
    }, oh = function(e, r, a, n, i) {
      for (var s = 0; s < e.length; s++)
        r[s] = e[s].slice();
      for (var o, u, l, f = 2 / (i.m - 1), h = 0; h < a.length; h++)
        for (var v = 0; v < n.length; v++) {
          o = 0;
          for (var d = 0; d < a.length; d++)
            u = En(i.distance, n[v], a[h], i.attributes, "cmeans"), l = En(i.distance, n[v], a[d], i.attributes, "cmeans"), o += Math.pow(u / l, f);
          e[v][h] = 1 / o;
        }
    }, lh = function(e, r, a, n) {
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
    }, Gs = function(e) {
      var r = this.cy(), a = this.nodes(), n = pi(e), i, s, o, u, l;
      u = new Array(a.length);
      for (var f = 0; f < a.length; f++)
        u[f] = new Array(n.k);
      o = new Array(a.length);
      for (var h = 0; h < a.length; h++)
        o[h] = new Array(n.k);
      for (var v = 0; v < a.length; v++) {
        for (var d = 0, c = 0; c < n.k; c++)
          o[v][c] = Math.random(), d += o[v][c];
        for (var y = 0; y < n.k; y++)
          o[v][y] = o[v][y] / d;
      }
      s = new Array(n.k);
      for (var p = 0; p < n.k; p++)
        s[p] = new Array(n.attributes.length);
      l = new Array(a.length);
      for (var g = 0; g < a.length; g++)
        l[g] = new Array(n.k);
      for (var m = !0, b = 0; m && b < n.maxIterations; )
        m = !1, sh(s, a, o, l, n), oh(o, u, s, a, n), rh(o, u, n.sensitivityThreshold) || (m = !0), b++;
      return i = lh(a, o, n, r), {
        clusters: i,
        degreeOfMembership: o
      };
    }, uh = {
      kMeans: nh,
      kMedoids: ih,
      fuzzyCMeans: Gs,
      fcm: Gs
    }, fh = At({
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
    }), hh = {
      single: "min",
      complete: "max"
    }, vh = function(e) {
      var r = fh(e), a = hh[r.linkage];
      return a != null && (r.linkage = a), r;
    }, zs = function(e, r, a, n, i) {
      for (var s = 0, o = 1 / 0, u, l = i.attributes, f = function(D, F) {
        return bn(i.distance, l.length, function(G) {
          return l[G](D);
        }, function(G) {
          return l[G](F);
        }, D, F);
      }, h = 0; h < e.length; h++) {
        var v = e[h].key, d = a[v][n[v]];
        d < o && (s = v, o = d);
      }
      if (i.mode === "threshold" && o >= i.threshold || i.mode === "dendrogram" && e.length === 1)
        return !1;
      var c = r[s], y = r[n[s]], p;
      i.mode === "dendrogram" ? p = {
        left: c,
        right: y,
        key: c.key
      } : p = {
        value: c.value.concat(y.value),
        key: c.key
      }, e[c.index] = p, e.splice(y.index, 1), r[c.key] = p;
      for (var g = 0; g < e.length; g++) {
        var m = e[g];
        c.key === m.key ? u = 1 / 0 : i.linkage === "min" ? (u = a[c.key][m.key], a[c.key][m.key] > a[y.key][m.key] && (u = a[y.key][m.key])) : i.linkage === "max" ? (u = a[c.key][m.key], a[c.key][m.key] < a[y.key][m.key] && (u = a[y.key][m.key])) : i.linkage === "mean" ? u = (a[c.key][m.key] * c.size + a[y.key][m.key] * y.size) / (c.size + y.size) : i.mode === "dendrogram" ? u = f(m.value, c.value) : u = f(m.value[0], c.value[0]), a[c.key][m.key] = a[m.key][c.key] = u;
      }
      for (var b = 0; b < e.length; b++) {
        var E = e[b].key;
        if (n[E] === c.key || n[E] === y.key) {
          for (var M = E, L = 0; L < e.length; L++) {
            var w = e[L].key;
            a[E][w] < a[E][M] && (M = w);
          }
          n[E] = M;
        }
        e[b].index = b;
      }
      return c.key = y.key = c.index = y.index = null, !0;
    }, wn = function t(e, r, a) {
      e && (e.value ? r.push(e.value) : (e.left && t(e.left, r), e.right && t(e.right, r)));
    }, ch = function t(e, r) {
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
    }, dh = function t(e, r, a) {
      if (!e)
        return [];
      var n = [], i = [], s = [];
      return r === 0 ? (e.left && wn(e.left, n), e.right && wn(e.right, i), s = n.concat(i), [a.collection(s)]) : r === 1 ? e.value ? [a.collection(e.value)] : (e.left && wn(e.left, n), e.right && wn(e.right, i), [a.collection(n), a.collection(i)]) : e.value ? [a.collection(e.value)] : (e.left && (n = t(e.left, r - 1, a)), e.right && (i = t(e.right, r - 1, a)), n.concat(i));
    }, Vs = function(e) {
      for (var r = this.cy(), a = this.nodes(), n = vh(e), i = n.attributes, s = function(b, E) {
        return bn(n.distance, i.length, function(M) {
          return i[M](b);
        }, function(M) {
          return i[M](E);
        }, b, E);
      }, o = [], u = [], l = [], f = [], h = 0; h < a.length; h++) {
        var v = {
          value: n.mode === "dendrogram" ? a[h] : [a[h]],
          key: h,
          index: h
        };
        o[h] = v, f[h] = v, u[h] = [], l[h] = 0;
      }
      for (var d = 0; d < o.length; d++)
        for (var c = 0; c <= d; c++) {
          var y = void 0;
          n.mode === "dendrogram" ? y = d === c ? 1 / 0 : s(o[d].value, o[c].value) : y = d === c ? 1 / 0 : s(o[d].value[0], o[c].value[0]), u[d][c] = y, u[c][d] = y, y < u[d][l[d]] && (l[d] = c);
        }
      for (var p = zs(o, f, u, l, n); p; )
        p = zs(o, f, u, l, n);
      var g;
      return n.mode === "dendrogram" ? (g = dh(o[0], n.dendrogramDepth, r), n.addDendrogram && ch(o[0], r)) : (g = new Array(o.length), o.forEach(function(m, b) {
        m.key = m.index = null, g[b] = r.collection(m.value);
      })), g;
    }, gh = {
      hierarchicalClustering: Vs,
      hca: Vs
    }, ph = At({
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
    }), yh = function(e) {
      var r = e.damping, a = e.preference;
      0.5 <= r && r < 1 || xt("Damping must range on [0.5, 1).  Got: ".concat(r));
      var n = ["median", "mean", "min", "max"];
      return n.some(function(i) {
        return i === a;
      }) || R(a) || xt("Preference must be one of [".concat(n.map(function(i) {
        return "'".concat(i, "'");
      }).join(", "), "] or a number.  Got: ").concat(a)), ph(e);
    }, mh = function(e, r, a, n) {
      var i = function(o, u) {
        return n[u](o);
      };
      return -bn(e, n.length, function(s) {
        return i(r, s);
      }, function(s) {
        return i(a, s);
      }, r, a);
    }, bh = function(e, r) {
      var a = null;
      return r === "median" ? a = yf(e) : r === "mean" ? a = pf(e) : r === "min" ? a = df(e) : r === "max" ? a = gf(e) : a = r, a;
    }, Eh = function(e, r, a) {
      for (var n = [], i = 0; i < e; i++)
        r[i * e + i] + a[i * e + i] > 0 && n.push(i);
      return n;
    }, Us = function(e, r, a) {
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
    }, wh = function(e, r, a) {
      for (var n = Us(e, r, a), i = 0; i < a.length; i++) {
        for (var s = [], o = 0; o < n.length; o++)
          n[o] === a[i] && s.push(o);
        for (var u = -1, l = -1 / 0, f = 0; f < s.length; f++) {
          for (var h = 0, v = 0; v < s.length; v++)
            h += r[s[v] * e + s[f]];
          h > l && (u = f, l = h);
        }
        a[i] = s[u];
      }
      return n = Us(e, r, a), n;
    }, $s = function(e) {
      for (var r = this.cy(), a = this.nodes(), n = yh(e), i = {}, s = 0; s < a.length; s++)
        i[a[s].id()] = s;
      var o, u, l, f, h, v;
      o = a.length, u = o * o, l = new Array(u);
      for (var d = 0; d < u; d++)
        l[d] = -1 / 0;
      for (var c = 0; c < o; c++)
        for (var y = 0; y < o; y++)
          c !== y && (l[c * o + y] = mh(n.distance, a[c], a[y], n.attributes));
      f = bh(l, n.preference);
      for (var p = 0; p < o; p++)
        l[p * o + p] = f;
      h = new Array(u);
      for (var g = 0; g < u; g++)
        h[g] = 0;
      v = new Array(u);
      for (var m = 0; m < u; m++)
        v[m] = 0;
      for (var b = new Array(o), E = new Array(o), M = new Array(o), L = 0; L < o; L++)
        b[L] = 0, E[L] = 0, M[L] = 0;
      for (var w = new Array(o * n.minIterations), k = 0; k < w.length; k++)
        w[k] = 0;
      var D;
      for (D = 0; D < n.maxIterations; D++) {
        for (var F = 0; F < o; F++) {
          for (var G = -1 / 0, N = -1 / 0, X = -1, B = 0, re = 0; re < o; re++)
            b[re] = h[F * o + re], B = v[F * o + re] + l[F * o + re], B >= G ? (N = G, G = B, X = re) : B > N && (N = B);
          for (var K = 0; K < o; K++)
            h[F * o + K] = (1 - n.damping) * (l[F * o + K] - G) + n.damping * b[K];
          h[F * o + X] = (1 - n.damping) * (l[F * o + X] - N) + n.damping * b[X];
        }
        for (var W = 0; W < o; W++) {
          for (var ae = 0, ue = 0; ue < o; ue++)
            b[ue] = v[ue * o + W], E[ue] = Math.max(0, h[ue * o + W]), ae += E[ue];
          ae -= E[W], E[W] = h[W * o + W], ae += E[W];
          for (var me = 0; me < o; me++)
            v[me * o + W] = (1 - n.damping) * Math.min(0, ae - E[me]) + n.damping * b[me];
          v[W * o + W] = (1 - n.damping) * (ae - E[W]) + n.damping * b[W];
        }
        for (var ie = 0, ge = 0; ge < o; ge++) {
          var Ee = v[ge * o + ge] + h[ge * o + ge] > 0 ? 1 : 0;
          w[D % n.minIterations * o + ge] = Ee, ie += Ee;
        }
        if (ie > 0 && (D >= n.minIterations - 1 || D == n.maxIterations - 1)) {
          for (var Ce = 0, we = 0; we < o; we++) {
            M[we] = 0;
            for (var De = 0; De < n.minIterations; De++)
              M[we] += w[De * o + we];
            (M[we] === 0 || M[we] === n.minIterations) && Ce++;
          }
          if (Ce === o)
            break;
        }
      }
      for (var se = Eh(o, h, v), xe = wh(o, l, se), Le = {}, Se = 0; Se < se.length; Se++)
        Le[se[Se]] = [];
      for (var Oe = 0; Oe < a.length; Oe++) {
        var Fe = i[a[Oe].id()], Xe = xe[Fe];
        Xe != null && Le[Xe].push(a[Oe]);
      }
      for (var Ie = new Array(se.length), Me = 0; Me < se.length; Me++)
        Ie[Me] = r.collection(Le[se[Me]]);
      return Ie;
    }, xh = {
      affinityPropagation: $s,
      ap: $s
    }, Th = At({
      root: void 0,
      directed: !1
    }), Ch = {
      hierholzer: function(e) {
        if (!S(e)) {
          var r = arguments;
          e = {
            root: r[0],
            directed: r[1]
          };
        }
        var a = Th(e), n = a.root, i = a.directed, s = this, o = !1, u, l, f;
        n && (f = ee(n) ? this.filter(n)[0].id() : n[0].id());
        var h = {}, v = {};
        i ? s.forEach(function(m) {
          var b = m.id();
          if (m.isNode()) {
            var E = m.indegree(!0), M = m.outdegree(!0), L = E - M, w = M - E;
            L == 1 ? u ? o = !0 : u = b : w == 1 ? l ? o = !0 : l = b : (w > 1 || L > 1) && (o = !0), h[b] = [], m.outgoers().forEach(function(k) {
              k.isEdge() && h[b].push(k.id());
            });
          } else
            v[b] = [void 0, m.target().id()];
        }) : s.forEach(function(m) {
          var b = m.id();
          if (m.isNode()) {
            var E = m.degree(!0);
            E % 2 && (u ? l ? o = !0 : l = b : u = b), h[b] = [], m.connectedEdges().forEach(function(M) {
              return h[b].push(M.id());
            });
          } else
            v[b] = [m.source().id(), m.target().id()];
        });
        var d = {
          found: !1,
          trail: void 0
        };
        if (o)
          return d;
        if (l && u)
          if (i) {
            if (f && l != f)
              return d;
            f = l;
          } else {
            if (f && l != f && u != f)
              return d;
            f || (f = l);
          }
        else
          f || (f = s[0].id());
        var c = function(b) {
          for (var E = b, M = [b], L, w, k; h[E].length; )
            L = h[E].shift(), w = v[L][0], k = v[L][1], E != k ? (h[k] = h[k].filter(function(D) {
              return D != L;
            }), E = k) : !i && E != w && (h[w] = h[w].filter(function(D) {
              return D != L;
            }), E = w), M.unshift(L), M.unshift(E);
          return M;
        }, y = [], p = [];
        for (p = c(f); p.length != 1; )
          h[p[0]].length == 0 ? (y.unshift(s.getElementById(p.shift())), y.unshift(s.getElementById(p.shift()))) : p = c(p.shift()).concat(p);
        y.unshift(s.getElementById(p.shift()));
        for (var g in h)
          if (h[g].length)
            return d;
        return d.found = !0, d.trail = this.spawn(y, !0), d;
      }
    }, xn = function() {
      var e = this, r = {}, a = 0, n = 0, i = [], s = [], o = {}, u = function(v, d) {
        for (var c = s.length - 1, y = [], p = e.spawn(); s[c].x != v || s[c].y != d; )
          y.push(s.pop().edge), c--;
        y.push(s.pop().edge), y.forEach(function(g) {
          var m = g.connectedNodes().intersection(e);
          p.merge(g), m.forEach(function(b) {
            var E = b.id(), M = b.connectedEdges().intersection(e);
            p.merge(b), r[E].cutVertex ? p.merge(M.filter(function(L) {
              return L.isLoop();
            })) : p.merge(M);
          });
        }), i.push(p);
      }, l = function h(v, d, c) {
        v === c && (n += 1), r[d] = {
          id: a,
          low: a++,
          cutVertex: !1
        };
        var y = e.getElementById(d).connectedEdges().intersection(e);
        if (y.size() === 0)
          i.push(e.spawn(e.getElementById(d)));
        else {
          var p, g, m, b;
          y.forEach(function(E) {
            p = E.source().id(), g = E.target().id(), m = p === d ? g : p, m !== c && (b = E.id(), o[b] || (o[b] = !0, s.push({
              x: d,
              y: m,
              edge: E
            })), m in r ? r[d].low = Math.min(r[d].low, r[m].id) : (h(v, m, d), r[d].low = Math.min(r[d].low, r[m].low), r[d].id <= r[m].low && (r[d].cutVertex = !0, u(d, m))));
          });
        }
      };
      e.forEach(function(h) {
        if (h.isNode()) {
          var v = h.id();
          v in r || (n = 0, l(v, v), r[v].cutVertex = n > 1);
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
    }, Dh = {
      hopcroftTarjanBiconnected: xn,
      htbc: xn,
      htb: xn,
      hopcroftTarjanBiconnectedComponents: xn
    }, Tn = function() {
      var e = this, r = {}, a = 0, n = [], i = [], s = e.spawn(e), o = function u(l) {
        i.push(l), r[l] = {
          index: a,
          low: a++,
          explored: !1
        };
        var f = e.getElementById(l).connectedEdges().intersection(e);
        if (f.forEach(function(y) {
          var p = y.target().id();
          p !== l && (p in r || u(p), r[p].explored || (r[l].low = Math.min(r[l].low, r[p].low)));
        }), r[l].index === r[l].low) {
          for (var h = e.spawn(); ; ) {
            var v = i.pop();
            if (h.merge(e.getElementById(v)), r[v].low = r[l].index, r[v].explored = !0, v === l)
              break;
          }
          var d = h.edgesWith(h), c = h.merge(d);
          n.push(c), s = s.difference(c);
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
    }, Sh = {
      tarjanStronglyConnected: Tn,
      tsc: Tn,
      tscc: Tn,
      tarjanStronglyConnectedComponents: Tn
    }, _s = {};
    [Ma, tf, rf, nf, of, uf, vf, Ff, ra, aa, gi, Zf, uh, gh, xh, Ch, Dh, Sh].forEach(function(t) {
      He(_s, t);
    });
    /*!
    Embeddable Minimum Strictly-Compliant Promises/A+ 1.1.1 Thenable
    Copyright (c) 2013-2014 Ralf S. Engelschall (http://engelschall.com)
    Licensed under The MIT License (http://opensource.org/licenses/MIT)
    */
    var Ys = 0, Hs = 1, Xs = 2, yr = function t(e) {
      if (!(this instanceof t))
        return new t(e);
      this.id = "Thenable/1.0.7", this.state = Ys, this.fulfillValue = void 0, this.rejectReason = void 0, this.onFulfilled = [], this.onRejected = [], this.proxy = {
        then: this.then.bind(this)
      }, typeof e == "function" && e.call(this, this.fulfill.bind(this), this.reject.bind(this));
    };
    yr.prototype = {
      /*  promise resolving methods  */
      fulfill: function(e) {
        return Ws(this, Hs, "fulfillValue", e);
      },
      reject: function(e) {
        return Ws(this, Xs, "rejectReason", e);
      },
      /*  "The then Method" [Promises/A+ 1.1, 1.2, 2.2]  */
      then: function(e, r) {
        var a = this, n = new yr();
        return a.onFulfilled.push(Zs(e, n, "fulfill")), a.onRejected.push(Zs(r, n, "reject")), qs(a), n.proxy;
      }
    };
    var Ws = function(e, r, a, n) {
      return e.state === Ys && (e.state = r, e[a] = n, qs(e)), e;
    }, qs = function(e) {
      e.state === Hs ? Ks(e, "onFulfilled", e.fulfillValue) : e.state === Xs && Ks(e, "onRejected", e.rejectReason);
    }, Ks = function(e, r, a) {
      if (e[r].length !== 0) {
        var n = e[r];
        e[r] = [];
        var i = function() {
          for (var o = 0; o < n.length; o++)
            n[o](a);
        };
        typeof setImmediate == "function" ? setImmediate(i) : setTimeout(i, 0);
      }
    }, Zs = function(e, r, a) {
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
          Lh(r, i);
        }
      };
    }, Lh = function t(e, r) {
      if (e === r || e.proxy === r) {
        e.reject(new TypeError("cannot resolve promise with itself"));
        return;
      }
      var a;
      if (_(r) === "object" && r !== null || typeof r == "function")
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
    yr.all = function(t) {
      return new yr(function(e, r) {
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
    }, yr.resolve = function(t) {
      return new yr(function(e, r) {
        e(t);
      });
    }, yr.reject = function(t) {
      return new yr(function(e, r) {
        r(t);
      });
    };
    var ia = typeof Promise < "u" ? Promise : yr, mi = function(e, r, a) {
      var n = Ye(e), i = !n, s = this._private = He({
        duration: 1e3
      }, r, a);
      if (s.target = e, s.style = s.style || s.css, s.started = !1, s.playing = !1, s.hooked = !1, s.applying = !1, s.progress = 0, s.completes = [], s.frames = [], s.complete && H(s.complete) && s.completes.push(s.complete), i) {
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
    }, zr = mi.prototype;
    He(zr, {
      instanceString: function() {
        return "animation";
      },
      hook: function() {
        var e = this._private;
        if (!e.hooked) {
          var r, a = e.target._private.animation;
          e.queue ? r = a.queue : r = a.current, r.push(this), pe(e.target) && e.target.cy().addToAnimationPool(e.target), e.hooked = !0;
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
        return new ia(function(n, i) {
          a.push(function() {
            n();
          });
        });
      }
    }), zr.complete = zr.completed, zr.run = zr.play, zr.running = zr.playing;
    var Ah = {
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
          r = He({}, r, a);
          var h = Object.keys(r).length === 0;
          if (h)
            return new mi(s[0], r);
          switch (r.duration === void 0 && (r.duration = 400), r.duration) {
            case "slow":
              r.duration = 600;
              break;
            case "fast":
              r.duration = 200;
              break;
          }
          if (l && (r.style = f.getPropsList(r.style || r.css), r.css = void 0), l && r.renderedPosition != null) {
            var v = r.renderedPosition, d = o.pan(), c = o.zoom();
            r.position = bs(v, c, d);
          }
          if (u && r.panBy != null) {
            var y = r.panBy, p = o.pan();
            r.pan = {
              x: p.x + y.x,
              y: p.y + y.y
            };
          }
          var g = r.center || r.centre;
          if (u && g != null) {
            var m = o.getCenterPan(g.eles, r.zoom);
            m != null && (r.pan = m);
          }
          if (u && r.fit != null) {
            var b = r.fit, E = o.getFitViewport(b.eles || b.boundingBox, b.padding);
            E != null && (r.pan = E.pan, r.zoom = E.zoom);
          }
          if (u && S(r.zoom)) {
            var M = o.getZoomedViewport(r.zoom);
            M != null ? (M.zoomed && (r.zoom = M.zoom), M.panned && (r.pan = M.pan)) : r.zoom = null;
          }
          return new mi(s[0], r);
        };
      },
      // animate
      animate: function() {
        return function(r, a) {
          var n = this, i = n.length !== void 0, s = i ? n : [n], o = this._private.cy || this;
          if (!o.styleEnabled())
            return this;
          a && (r = He({}, r, a));
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
            for (var l = s[u], f = l._private, h = f.animation.current, v = 0; v < h.length; v++) {
              var d = h[v], c = d._private;
              a && (c.duration = 0);
            }
            r && (f.animation.queue = []), a || (f.animation.current = []);
          }
          return o.notify("draw"), this;
        };
      }
      // stop
    }, Oh = Array.isArray, Cn = Oh, Nh = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, Ih = /^\w*$/;
    function Mh(t, e) {
      if (Cn(t))
        return !1;
      var r = typeof t;
      return r == "number" || r == "symbol" || r == "boolean" || t == null || Aa(t) ? !0 : Ih.test(t) || !Nh.test(t) || e != null && t in Object(e);
    }
    var Rh = Mh, kh = "[object AsyncFunction]", Ph = "[object Function]", Bh = "[object GeneratorFunction]", Fh = "[object Proxy]";
    function Gh(t) {
      if (!kr(t))
        return !1;
      var e = is(t);
      return e == Ph || e == Bh || e == kh || e == Fh;
    }
    var zh = Gh, Vh = sn["__core-js_shared__"], bi = Vh, Qs = function() {
      var t = /[^.]+$/.exec(bi && bi.keys && bi.keys.IE_PROTO || "");
      return t ? "Symbol(src)_1." + t : "";
    }();
    function Uh(t) {
      return !!Qs && Qs in t;
    }
    var $h = Uh, _h = Function.prototype, Yh = _h.toString;
    function Hh(t) {
      if (t != null) {
        try {
          return Yh.call(t);
        } catch {
        }
        try {
          return t + "";
        } catch {
        }
      }
      return "";
    }
    var Xh = Hh, Wh = /[\\^$.*+?()[\]{}|]/g, qh = /^\[object .+?Constructor\]$/, Kh = Function.prototype, Zh = Object.prototype, Qh = Kh.toString, Jh = Zh.hasOwnProperty, jh = RegExp(
      "^" + Qh.call(Jh).replace(Wh, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
    );
    function ev(t) {
      if (!kr(t) || $h(t))
        return !1;
      var e = zh(t) ? jh : qh;
      return e.test(Xh(t));
    }
    var tv = ev;
    function rv(t, e) {
      return t == null ? void 0 : t[e];
    }
    var av = rv;
    function nv(t, e) {
      var r = av(t, e);
      return tv(r) ? r : void 0;
    }
    var Ei = nv, iv = Ei(Object, "create"), za = iv;
    function sv() {
      this.__data__ = za ? za(null) : {}, this.size = 0;
    }
    var ov = sv;
    function lv(t) {
      var e = this.has(t) && delete this.__data__[t];
      return this.size -= e ? 1 : 0, e;
    }
    var uv = lv, fv = "__lodash_hash_undefined__", hv = Object.prototype, vv = hv.hasOwnProperty;
    function cv(t) {
      var e = this.__data__;
      if (za) {
        var r = e[t];
        return r === fv ? void 0 : r;
      }
      return vv.call(e, t) ? e[t] : void 0;
    }
    var dv = cv, gv = Object.prototype, pv = gv.hasOwnProperty;
    function yv(t) {
      var e = this.__data__;
      return za ? e[t] !== void 0 : pv.call(e, t);
    }
    var mv = yv, bv = "__lodash_hash_undefined__";
    function Ev(t, e) {
      var r = this.__data__;
      return this.size += this.has(t) ? 0 : 1, r[t] = za && e === void 0 ? bv : e, this;
    }
    var wv = Ev;
    function sa(t) {
      var e = -1, r = t == null ? 0 : t.length;
      for (this.clear(); ++e < r; ) {
        var a = t[e];
        this.set(a[0], a[1]);
      }
    }
    sa.prototype.clear = ov, sa.prototype.delete = uv, sa.prototype.get = dv, sa.prototype.has = mv, sa.prototype.set = wv;
    var Js = sa;
    function xv() {
      this.__data__ = [], this.size = 0;
    }
    var Tv = xv;
    function Cv(t, e) {
      return t === e || t !== t && e !== e;
    }
    var js = Cv;
    function Dv(t, e) {
      for (var r = t.length; r--; )
        if (js(t[r][0], e))
          return r;
      return -1;
    }
    var Dn = Dv, Sv = Array.prototype, Lv = Sv.splice;
    function Av(t) {
      var e = this.__data__, r = Dn(e, t);
      if (r < 0)
        return !1;
      var a = e.length - 1;
      return r == a ? e.pop() : Lv.call(e, r, 1), --this.size, !0;
    }
    var Ov = Av;
    function Nv(t) {
      var e = this.__data__, r = Dn(e, t);
      return r < 0 ? void 0 : e[r][1];
    }
    var Iv = Nv;
    function Mv(t) {
      return Dn(this.__data__, t) > -1;
    }
    var Rv = Mv;
    function kv(t, e) {
      var r = this.__data__, a = Dn(r, t);
      return a < 0 ? (++this.size, r.push([t, e])) : r[a][1] = e, this;
    }
    var Pv = kv;
    function oa(t) {
      var e = -1, r = t == null ? 0 : t.length;
      for (this.clear(); ++e < r; ) {
        var a = t[e];
        this.set(a[0], a[1]);
      }
    }
    oa.prototype.clear = Tv, oa.prototype.delete = Ov, oa.prototype.get = Iv, oa.prototype.has = Rv, oa.prototype.set = Pv;
    var Bv = oa, Fv = Ei(sn, "Map"), Gv = Fv;
    function zv() {
      this.size = 0, this.__data__ = {
        hash: new Js(),
        map: new (Gv || Bv)(),
        string: new Js()
      };
    }
    var Vv = zv;
    function Uv(t) {
      var e = typeof t;
      return e == "string" || e == "number" || e == "symbol" || e == "boolean" ? t !== "__proto__" : t === null;
    }
    var $v = Uv;
    function _v(t, e) {
      var r = t.__data__;
      return $v(e) ? r[typeof e == "string" ? "string" : "hash"] : r.map;
    }
    var Sn = _v;
    function Yv(t) {
      var e = Sn(this, t).delete(t);
      return this.size -= e ? 1 : 0, e;
    }
    var Hv = Yv;
    function Xv(t) {
      return Sn(this, t).get(t);
    }
    var Wv = Xv;
    function qv(t) {
      return Sn(this, t).has(t);
    }
    var Kv = qv;
    function Zv(t, e) {
      var r = Sn(this, t), a = r.size;
      return r.set(t, e), this.size += r.size == a ? 0 : 1, this;
    }
    var Qv = Zv;
    function la(t) {
      var e = -1, r = t == null ? 0 : t.length;
      for (this.clear(); ++e < r; ) {
        var a = t[e];
        this.set(a[0], a[1]);
      }
    }
    la.prototype.clear = Vv, la.prototype.delete = Hv, la.prototype.get = Wv, la.prototype.has = Kv, la.prototype.set = Qv;
    var eo = la, Jv = "Expected a function";
    function wi(t, e) {
      if (typeof t != "function" || e != null && typeof e != "function")
        throw new TypeError(Jv);
      var r = function() {
        var a = arguments, n = e ? e.apply(this, a) : a[0], i = r.cache;
        if (i.has(n))
          return i.get(n);
        var s = t.apply(this, a);
        return r.cache = i.set(n, s) || i, s;
      };
      return r.cache = new (wi.Cache || eo)(), r;
    }
    wi.Cache = eo;
    var jv = wi, ec = 500;
    function tc(t) {
      var e = jv(t, function(a) {
        return r.size === ec && r.clear(), a;
      }), r = e.cache;
      return e;
    }
    var rc = tc, ac = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, nc = /\\(\\)?/g, ic = rc(function(t) {
      var e = [];
      return t.charCodeAt(0) === 46 && e.push(""), t.replace(ac, function(r, a, n, i) {
        e.push(n ? i.replace(nc, "$1") : a || r);
      }), e;
    }), to = ic;
    function sc(t, e) {
      for (var r = -1, a = t == null ? 0 : t.length, n = Array(a); ++r < a; )
        n[r] = e(t[r], r, t);
      return n;
    }
    var ro = sc, oc = 1 / 0, ao = Zr ? Zr.prototype : void 0, no = ao ? ao.toString : void 0;
    function io(t) {
      if (typeof t == "string")
        return t;
      if (Cn(t))
        return ro(t, io) + "";
      if (Aa(t))
        return no ? no.call(t) : "";
      var e = t + "";
      return e == "0" && 1 / t == -oc ? "-0" : e;
    }
    var lc = io;
    function uc(t) {
      return t == null ? "" : lc(t);
    }
    var so = uc;
    function fc(t, e) {
      return Cn(t) ? t : Rh(t, e) ? [t] : to(so(t));
    }
    var oo = fc, hc = 1 / 0;
    function vc(t) {
      if (typeof t == "string" || Aa(t))
        return t;
      var e = t + "";
      return e == "0" && 1 / t == -hc ? "-0" : e;
    }
    var xi = vc;
    function cc(t, e) {
      e = oo(e, t);
      for (var r = 0, a = e.length; t != null && r < a; )
        t = t[xi(e[r++])];
      return r && r == a ? t : void 0;
    }
    var dc = cc;
    function gc(t, e, r) {
      var a = t == null ? void 0 : dc(t, e);
      return a === void 0 ? r : a;
    }
    var pc = gc, yc = function() {
      try {
        var t = Ei(Object, "defineProperty");
        return t({}, "", {}), t;
      } catch {
      }
    }(), lo = yc;
    function mc(t, e, r) {
      e == "__proto__" && lo ? lo(t, e, {
        configurable: !0,
        enumerable: !0,
        value: r,
        writable: !0
      }) : t[e] = r;
    }
    var bc = mc, Ec = Object.prototype, wc = Ec.hasOwnProperty;
    function xc(t, e, r) {
      var a = t[e];
      (!(wc.call(t, e) && js(a, r)) || r === void 0 && !(e in t)) && bc(t, e, r);
    }
    var Tc = xc, Cc = 9007199254740991, Dc = /^(?:0|[1-9]\d*)$/;
    function Sc(t, e) {
      var r = typeof t;
      return e = e ?? Cc, !!e && (r == "number" || r != "symbol" && Dc.test(t)) && t > -1 && t % 1 == 0 && t < e;
    }
    var Lc = Sc;
    function Ac(t, e, r, a) {
      if (!kr(t))
        return t;
      e = oo(e, t);
      for (var n = -1, i = e.length, s = i - 1, o = t; o != null && ++n < i; ) {
        var u = xi(e[n]), l = r;
        if (u === "__proto__" || u === "constructor" || u === "prototype")
          return t;
        if (n != s) {
          var f = o[u];
          l = a ? a(f, u, o) : void 0, l === void 0 && (l = kr(f) ? f : Lc(e[n + 1]) ? [] : {});
        }
        Tc(o, u, l), o = o[u];
      }
      return t;
    }
    var Oc = Ac;
    function Nc(t, e, r) {
      return t == null ? t : Oc(t, e, r);
    }
    var Ic = Nc;
    function Mc(t, e) {
      var r = -1, a = t.length;
      for (e || (e = Array(a)); ++r < a; )
        e[r] = t[r];
      return e;
    }
    var Rc = Mc;
    function kc(t) {
      return Cn(t) ? ro(t, xi) : Aa(t) ? [t] : Rc(to(so(t)));
    }
    var Pc = kc, Bc = {
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
        return e = He({}, r, e), function(n, i) {
          var s = e, o = this, u = o.length !== void 0, l = u ? o : [o], f = u ? o[0] : o;
          if (ee(n)) {
            var h = n.indexOf(".") !== -1, v = h && Pc(n);
            if (s.allowGetting && i === void 0) {
              var d;
              return f && (s.beforeGet(f), v && f._private[s.field][n] === void 0 ? d = pc(f._private[s.field], v) : d = f._private[s.field][n]), d;
            } else if (s.allowSetting && i !== void 0) {
              var c = !s.immutableKeys[n];
              if (c) {
                var y = T({}, n, i);
                s.beforeSet(o, y);
                for (var p = 0, g = l.length; p < g; p++) {
                  var m = l[p];
                  s.canSet(m) && (v && f._private[s.field][n] === void 0 ? Ic(m._private[s.field], v, i) : m._private[s.field][n] = i);
                }
                s.updateStyle && o.updateStyle(), s.onSet(o), s.settingTriggersEvent && o[s.triggerFnName](s.settingEvent);
              }
            }
          } else if (s.allowSetting && S(n)) {
            var b = n, E, M, L = Object.keys(b);
            s.beforeSet(o, b);
            for (var w = 0; w < L.length; w++) {
              E = L[w], M = b[E];
              var k = !s.immutableKeys[E];
              if (k)
                for (var D = 0; D < l.length; D++) {
                  var F = l[D];
                  s.canSet(F) && (F._private[s.field][E] = M);
                }
            }
            s.updateStyle && o.updateStyle(), s.onSet(o), s.settingTriggersEvent && o[s.triggerFnName](s.settingEvent);
          } else if (s.allowBinding && H(n)) {
            var G = n;
            o.on(s.bindingEvent, G);
          } else if (s.allowGetting && n === void 0) {
            var N;
            return f && (s.beforeGet(f), N = f._private[s.field]), N;
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
        return e = He({}, r, e), function(n) {
          var i = e, s = this, o = s.length !== void 0, u = o ? s : [s];
          if (ee(n)) {
            for (var l = n.split(/\s+/), f = l.length, h = 0; h < f; h++) {
              var v = l[h];
              if (!Re(v)) {
                var d = !i.immutableKeys[v];
                if (d)
                  for (var c = 0, y = u.length; c < y; c++)
                    u[c]._private[i.field][v] = void 0;
              }
            }
            i.triggerEvent && s[i.triggerFnName](i.event);
          } else if (n === void 0) {
            for (var p = 0, g = u.length; p < g; p++)
              for (var m = u[p]._private[i.field], b = Object.keys(m), E = 0; E < b.length; E++) {
                var M = b[E], L = !i.immutableKeys[M];
                L && (m[M] = void 0);
              }
            i.triggerEvent && s[i.triggerFnName](i.event);
          }
          return s;
        };
      }
      // removeData
    }, Fc = {
      eventAliasesOn: function(e) {
        var r = e;
        r.addListener = r.listen = r.bind = r.on, r.unlisten = r.unbind = r.off = r.removeListener, r.trigger = r.emit, r.pon = r.promiseOn = function(a, n) {
          var i = this, s = Array.prototype.slice.call(arguments, 0);
          return new ia(function(o, u) {
            var l = function(d) {
              i.off.apply(i, h), o(d);
            }, f = s.concat([l]), h = f.concat([]);
            i.on.apply(i, f);
          });
        };
      }
    }, ct = {};
    [Ah, Bc, Fc].forEach(function(t) {
      He(ct, t);
    });
    var Gc = {
      animate: ct.animate(),
      animation: ct.animation(),
      animated: ct.animated(),
      clearQueue: ct.clearQueue(),
      delay: ct.delay(),
      delayAnimation: ct.delayAnimation(),
      stop: ct.stop()
    }, Ln = {
      classes: function(e) {
        var r = this;
        if (e === void 0) {
          var a = [];
          return r[0]._private.classes.forEach(function(c) {
            return a.push(c);
          }), a;
        } else
          te(e) || (e = (e || "").match(/\S+/g) || []);
        for (var n = [], i = new Jr(e), s = 0; s < r.length; s++) {
          for (var o = r[s], u = o._private, l = u.classes, f = !1, h = 0; h < e.length; h++) {
            var v = e[h], d = l.has(v);
            if (!d) {
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
        te(e) || (e = e.match(/\S+/g) || []);
        for (var a = this, n = r === void 0, i = [], s = 0, o = a.length; s < o; s++)
          for (var u = a[s], l = u._private.classes, f = !1, h = 0; h < e.length; h++) {
            var v = e[h], d = l.has(v), c = !1;
            r || n && !d ? (l.add(v), c = !0) : (!r || n && d) && (l.delete(v), c = !0), !f && c && (i.push(u), f = !0);
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
    Ln.className = Ln.classNames = Ln.classes;
    var st = {
      metaChar: "[\\!\\\"\\#\\$\\%\\&\\'\\(\\)\\*\\+\\,\\.\\/\\:\\;\\<\\=\\>\\?\\@\\[\\]\\^\\`\\{\\|\\}\\~]",
      // chars we need to escape in let names, etc
      comparatorOp: "=|\\!=|>|>=|<|<=|\\$=|\\^=|\\*=",
      // binary comparison op (used in data selectors)
      boolOp: "\\?|\\!|\\^",
      // boolean (unary) operators (used in data selectors)
      string: `"(?:\\\\"|[^"])*"|'(?:\\\\'|[^'])*'`,
      // string literals (used in data selectors) -- doublequotes | singlequotes
      number: gt,
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
    st.variable = "(?:[\\w-.]|(?:\\\\" + st.metaChar + "))+", st.className = "(?:[\\w-]|(?:\\\\" + st.metaChar + "))+", st.value = st.string + "|" + st.number, st.id = st.variable, function() {
      var t, e, r;
      for (t = st.comparatorOp.split("|"), r = 0; r < t.length; r++)
        e = t[r], st.comparatorOp += "|@" + e;
      for (t = st.comparatorOp.split("|"), r = 0; r < t.length; r++)
        e = t[r], !(e.indexOf("!") >= 0) && e !== "=" && (st.comparatorOp += "|\\!" + e);
    }();
    var pt = function() {
      return {
        checks: []
      };
    }, ke = {
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
    }, Ti = [{
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
      return Kl(t.selector, e.selector);
    }), zc = function() {
      for (var t = {}, e, r = 0; r < Ti.length; r++)
        e = Ti[r], t[e.selector] = e.matches;
      return t;
    }(), Vc = function(e, r) {
      return zc[e](r);
    }, Uc = "(" + Ti.map(function(t) {
      return t.selector;
    }).join("|") + ")", ua = function(e) {
      return e.replace(new RegExp("\\\\(" + st.metaChar + ")", "g"), function(r, a) {
        return a;
      });
    }, Dr = function(e, r, a) {
      e[e.length - 1] = a;
    }, Ci = [{
      name: "group",
      // just used for identifying when debugging
      query: !0,
      regex: "(" + st.group + ")",
      populate: function(e, r, a) {
        var n = x(a, 1), i = n[0];
        r.checks.push({
          type: ke.GROUP,
          value: i === "*" ? i : i + "s"
        });
      }
    }, {
      name: "state",
      query: !0,
      regex: Uc,
      populate: function(e, r, a) {
        var n = x(a, 1), i = n[0];
        r.checks.push({
          type: ke.STATE,
          value: i
        });
      }
    }, {
      name: "id",
      query: !0,
      regex: "\\#(" + st.id + ")",
      populate: function(e, r, a) {
        var n = x(a, 1), i = n[0];
        r.checks.push({
          type: ke.ID,
          value: ua(i)
        });
      }
    }, {
      name: "className",
      query: !0,
      regex: "\\.(" + st.className + ")",
      populate: function(e, r, a) {
        var n = x(a, 1), i = n[0];
        r.checks.push({
          type: ke.CLASS,
          value: ua(i)
        });
      }
    }, {
      name: "dataExists",
      query: !0,
      regex: "\\[\\s*(" + st.variable + ")\\s*\\]",
      populate: function(e, r, a) {
        var n = x(a, 1), i = n[0];
        r.checks.push({
          type: ke.DATA_EXIST,
          field: ua(i)
        });
      }
    }, {
      name: "dataCompare",
      query: !0,
      regex: "\\[\\s*(" + st.variable + ")\\s*(" + st.comparatorOp + ")\\s*(" + st.value + ")\\s*\\]",
      populate: function(e, r, a) {
        var n = x(a, 3), i = n[0], s = n[1], o = n[2], u = new RegExp("^" + st.string + "$").exec(o) != null;
        u ? o = o.substring(1, o.length - 1) : o = parseFloat(o), r.checks.push({
          type: ke.DATA_COMPARE,
          field: ua(i),
          operator: s,
          value: o
        });
      }
    }, {
      name: "dataBool",
      query: !0,
      regex: "\\[\\s*(" + st.boolOp + ")\\s*(" + st.variable + ")\\s*\\]",
      populate: function(e, r, a) {
        var n = x(a, 2), i = n[0], s = n[1];
        r.checks.push({
          type: ke.DATA_BOOL,
          field: ua(s),
          operator: i
        });
      }
    }, {
      name: "metaCompare",
      query: !0,
      regex: "\\[\\[\\s*(" + st.meta + ")\\s*(" + st.comparatorOp + ")\\s*(" + st.number + ")\\s*\\]\\]",
      populate: function(e, r, a) {
        var n = x(a, 3), i = n[0], s = n[1], o = n[2];
        r.checks.push({
          type: ke.META_COMPARE,
          field: ua(i),
          operator: s,
          value: parseFloat(o)
        });
      }
    }, {
      name: "nextQuery",
      separator: !0,
      regex: st.separator,
      populate: function(e, r) {
        var a = e.currentSubject, n = e.edgeCount, i = e.compoundCount, s = e[e.length - 1];
        a != null && (s.subject = a, e.currentSubject = null), s.edgeCount = n, s.compoundCount = i, e.edgeCount = 0, e.compoundCount = 0;
        var o = e[e.length++] = pt();
        return o;
      }
    }, {
      name: "directedEdge",
      separator: !0,
      regex: st.directedEdge,
      populate: function(e, r) {
        if (e.currentSubject == null) {
          var a = pt(), n = r, i = pt();
          return a.checks.push({
            type: ke.DIRECTED_EDGE,
            source: n,
            target: i
          }), Dr(e, r, a), e.edgeCount++, i;
        } else {
          var s = pt(), o = r, u = pt();
          return s.checks.push({
            type: ke.NODE_SOURCE,
            source: o,
            target: u
          }), Dr(e, r, s), e.edgeCount++, u;
        }
      }
    }, {
      name: "undirectedEdge",
      separator: !0,
      regex: st.undirectedEdge,
      populate: function(e, r) {
        if (e.currentSubject == null) {
          var a = pt(), n = r, i = pt();
          return a.checks.push({
            type: ke.UNDIRECTED_EDGE,
            nodes: [n, i]
          }), Dr(e, r, a), e.edgeCount++, i;
        } else {
          var s = pt(), o = r, u = pt();
          return s.checks.push({
            type: ke.NODE_NEIGHBOR,
            node: o,
            neighbor: u
          }), Dr(e, r, s), u;
        }
      }
    }, {
      name: "child",
      separator: !0,
      regex: st.child,
      populate: function(e, r) {
        if (e.currentSubject == null) {
          var a = pt(), n = pt(), i = e[e.length - 1];
          return a.checks.push({
            type: ke.CHILD,
            parent: i,
            child: n
          }), Dr(e, r, a), e.compoundCount++, n;
        } else if (e.currentSubject === r) {
          var s = pt(), o = e[e.length - 1], u = pt(), l = pt(), f = pt(), h = pt();
          return s.checks.push({
            type: ke.COMPOUND_SPLIT,
            left: o,
            right: u,
            subject: l
          }), l.checks = r.checks, r.checks = [{
            type: ke.TRUE
          }], h.checks.push({
            type: ke.TRUE
          }), u.checks.push({
            type: ke.PARENT,
            // type is swapped on right side queries
            parent: h,
            child: f
            // empty for now
          }), Dr(e, o, s), e.currentSubject = l, e.compoundCount++, f;
        } else {
          var v = pt(), d = pt(), c = [{
            type: ke.PARENT,
            parent: v,
            child: d
          }];
          return v.checks = r.checks, r.checks = c, e.compoundCount++, d;
        }
      }
    }, {
      name: "descendant",
      separator: !0,
      regex: st.descendant,
      populate: function(e, r) {
        if (e.currentSubject == null) {
          var a = pt(), n = pt(), i = e[e.length - 1];
          return a.checks.push({
            type: ke.DESCENDANT,
            ancestor: i,
            descendant: n
          }), Dr(e, r, a), e.compoundCount++, n;
        } else if (e.currentSubject === r) {
          var s = pt(), o = e[e.length - 1], u = pt(), l = pt(), f = pt(), h = pt();
          return s.checks.push({
            type: ke.COMPOUND_SPLIT,
            left: o,
            right: u,
            subject: l
          }), l.checks = r.checks, r.checks = [{
            type: ke.TRUE
          }], h.checks.push({
            type: ke.TRUE
          }), u.checks.push({
            type: ke.ANCESTOR,
            // type is swapped on right side queries
            ancestor: h,
            descendant: f
            // empty for now
          }), Dr(e, o, s), e.currentSubject = l, e.compoundCount++, f;
        } else {
          var v = pt(), d = pt(), c = [{
            type: ke.ANCESTOR,
            ancestor: v,
            descendant: d
          }];
          return v.checks = r.checks, r.checks = c, e.compoundCount++, d;
        }
      }
    }, {
      name: "subject",
      modifier: !0,
      regex: st.subject,
      populate: function(e, r) {
        if (e.currentSubject != null && e.currentSubject !== r)
          return vt("Redefinition of subject in selector `" + e.toString() + "`"), !1;
        e.currentSubject = r;
        var a = e[e.length - 1], n = a.checks[0], i = n == null ? null : n.type;
        i === ke.DIRECTED_EDGE ? n.type = ke.NODE_TARGET : i === ke.UNDIRECTED_EDGE && (n.type = ke.NODE_NEIGHBOR, n.node = n.nodes[1], n.neighbor = n.nodes[0], n.nodes = null);
      }
    }];
    Ci.forEach(function(t) {
      return t.regexObj = new RegExp("^" + t.regex);
    });
    var $c = function(e) {
      for (var r, a, n, i = 0; i < Ci.length; i++) {
        var s = Ci[i], o = s.name, u = e.match(s.regexObj);
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
    }, _c = function(e) {
      var r = e.match(/^\s+/);
      if (r) {
        var a = r[0];
        e = e.substring(a.length);
      }
      return e;
    }, Yc = function(e) {
      var r = this, a = r.inputText = e, n = r[0] = pt();
      for (r.length = 1, a = _c(a); ; ) {
        var i = $c(a);
        if (i.expr == null)
          return vt("The selector `" + e + "`is invalid"), !1;
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
          return vt("The selector `" + e + "` is invalid because it uses both a compound selector and an edge selector"), !1;
        if (f.edgeCount > 1)
          return vt("The selector `" + e + "` is invalid because it uses multiple edge selectors"), !1;
        f.edgeCount === 1 && vt("The selector `" + e + "` is deprecated.  Edge selectors do not take effect on changes to source and target nodes after an edge is added, for performance reasons.  Use a class or data selector on edges instead, updating the class or data of an edge when your app detects a change in source or target nodes.");
      }
      return !0;
    }, Hc = function() {
      if (this.toStringCache != null)
        return this.toStringCache;
      for (var e = function(f) {
        return f ?? "";
      }, r = function(f) {
        return ee(f) ? '"' + f + '"' : e(f);
      }, a = function(f) {
        return " " + f + " ";
      }, n = function(f, h) {
        var v = f.type, d = f.value;
        switch (v) {
          case ke.GROUP: {
            var c = e(d);
            return c.substring(0, c.length - 1);
          }
          case ke.DATA_COMPARE: {
            var y = f.field, p = f.operator;
            return "[" + y + a(e(p)) + r(d) + "]";
          }
          case ke.DATA_BOOL: {
            var g = f.operator, m = f.field;
            return "[" + e(g) + m + "]";
          }
          case ke.DATA_EXIST: {
            var b = f.field;
            return "[" + b + "]";
          }
          case ke.META_COMPARE: {
            var E = f.operator, M = f.field;
            return "[[" + M + a(e(E)) + r(d) + "]]";
          }
          case ke.STATE:
            return d;
          case ke.ID:
            return "#" + d;
          case ke.CLASS:
            return "." + d;
          case ke.PARENT:
          case ke.CHILD:
            return i(f.parent, h) + a(">") + i(f.child, h);
          case ke.ANCESTOR:
          case ke.DESCENDANT:
            return i(f.ancestor, h) + " " + i(f.descendant, h);
          case ke.COMPOUND_SPLIT: {
            var L = i(f.left, h), w = i(f.subject, h), k = i(f.right, h);
            return L + (L.length > 0 ? " " : "") + w + k;
          }
          case ke.TRUE:
            return "";
        }
      }, i = function(f, h) {
        return f.checks.reduce(function(v, d, c) {
          return v + (h === f && c === 0 ? "$" : "") + n(d, h);
        }, "");
      }, s = "", o = 0; o < this.length; o++) {
        var u = this[o];
        s += i(u, u.subject), this.length > 1 && o < this.length - 1 && (s += ", ");
      }
      return this.toStringCache = s, s;
    }, Xc = {
      parse: Yc,
      toString: Hc
    }, uo = function(e, r, a) {
      var n, i = ee(e), s = R(e), o = ee(a), u, l, f = !1, h = !1, v = !1;
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
          v = !0, n = e > a;
          break;
        case ">=":
          v = !0, n = e >= a;
          break;
        case "<":
          v = !0, n = e < a;
          break;
        case "<=":
          v = !0, n = e <= a;
          break;
        default:
          n = !1;
          break;
      }
      return h && (e != null || !v) && (n = !n), n;
    }, Wc = function(e, r) {
      switch (r) {
        case "?":
          return !!e;
        case "!":
          return !e;
        case "^":
          return e === void 0;
      }
    }, qc = function(e) {
      return e !== void 0;
    }, Di = function(e, r) {
      return e.data(r);
    }, Kc = function(e, r) {
      return e[r]();
    }, Tt = [], wt = function(e, r) {
      return e.checks.every(function(a) {
        return Tt[a.type](a, r);
      });
    };
    Tt[ke.GROUP] = function(t, e) {
      var r = t.value;
      return r === "*" || r === e.group();
    }, Tt[ke.STATE] = function(t, e) {
      var r = t.value;
      return Vc(r, e);
    }, Tt[ke.ID] = function(t, e) {
      var r = t.value;
      return e.id() === r;
    }, Tt[ke.CLASS] = function(t, e) {
      var r = t.value;
      return e.hasClass(r);
    }, Tt[ke.META_COMPARE] = function(t, e) {
      var r = t.field, a = t.operator, n = t.value;
      return uo(Kc(e, r), a, n);
    }, Tt[ke.DATA_COMPARE] = function(t, e) {
      var r = t.field, a = t.operator, n = t.value;
      return uo(Di(e, r), a, n);
    }, Tt[ke.DATA_BOOL] = function(t, e) {
      var r = t.field, a = t.operator;
      return Wc(Di(e, r), a);
    }, Tt[ke.DATA_EXIST] = function(t, e) {
      var r = t.field;
      return t.operator, qc(Di(e, r));
    }, Tt[ke.UNDIRECTED_EDGE] = function(t, e) {
      var r = t.nodes[0], a = t.nodes[1], n = e.source(), i = e.target();
      return wt(r, n) && wt(a, i) || wt(a, n) && wt(r, i);
    }, Tt[ke.NODE_NEIGHBOR] = function(t, e) {
      return wt(t.node, e) && e.neighborhood().some(function(r) {
        return r.isNode() && wt(t.neighbor, r);
      });
    }, Tt[ke.DIRECTED_EDGE] = function(t, e) {
      return wt(t.source, e.source()) && wt(t.target, e.target());
    }, Tt[ke.NODE_SOURCE] = function(t, e) {
      return wt(t.source, e) && e.outgoers().some(function(r) {
        return r.isNode() && wt(t.target, r);
      });
    }, Tt[ke.NODE_TARGET] = function(t, e) {
      return wt(t.target, e) && e.incomers().some(function(r) {
        return r.isNode() && wt(t.source, r);
      });
    }, Tt[ke.CHILD] = function(t, e) {
      return wt(t.child, e) && wt(t.parent, e.parent());
    }, Tt[ke.PARENT] = function(t, e) {
      return wt(t.parent, e) && e.children().some(function(r) {
        return wt(t.child, r);
      });
    }, Tt[ke.DESCENDANT] = function(t, e) {
      return wt(t.descendant, e) && e.ancestors().some(function(r) {
        return wt(t.ancestor, r);
      });
    }, Tt[ke.ANCESTOR] = function(t, e) {
      return wt(t.ancestor, e) && e.descendants().some(function(r) {
        return wt(t.descendant, r);
      });
    }, Tt[ke.COMPOUND_SPLIT] = function(t, e) {
      return wt(t.subject, e) && wt(t.left, e) && wt(t.right, e);
    }, Tt[ke.TRUE] = function() {
      return !0;
    }, Tt[ke.COLLECTION] = function(t, e) {
      var r = t.value;
      return r.has(e);
    }, Tt[ke.FILTER] = function(t, e) {
      var r = t.value;
      return r(e);
    };
    var Zc = function(e) {
      var r = this;
      if (r.length === 1 && r[0].checks.length === 1 && r[0].checks[0].type === ke.ID)
        return e.getElementById(r[0].checks[0].value).collection();
      var a = function(i) {
        for (var s = 0; s < r.length; s++) {
          var o = r[s];
          if (wt(o, i))
            return !0;
        }
        return !1;
      };
      return r.text() == null && (a = function() {
        return !0;
      }), e.filter(a);
    }, Qc = function(e) {
      for (var r = this, a = 0; a < r.length; a++) {
        var n = r[a];
        if (wt(n, e))
          return !0;
      }
      return !1;
    }, Jc = {
      matches: Qc,
      filter: Zc
    }, Sr = function(e) {
      this.inputText = e, this.currentSubject = null, this.compoundCount = 0, this.edgeCount = 0, this.length = 0, e == null || ee(e) && e.match(/^\s*$/) || (pe(e) ? this.addQuery({
        checks: [{
          type: ke.COLLECTION,
          value: e.collection()
        }]
      }) : H(e) ? this.addQuery({
        checks: [{
          type: ke.FILTER,
          value: e
        }]
      }) : ee(e) ? this.parse(e) || (this.invalid = !0) : xt("A selector must be created from a string; found "));
    }, Lr = Sr.prototype;
    [Xc, Jc].forEach(function(t) {
      return He(Lr, t);
    }), Lr.text = function() {
      return this.inputText;
    }, Lr.size = function() {
      return this.length;
    }, Lr.eq = function(t) {
      return this[t];
    }, Lr.sameText = function(t) {
      return !this.invalid && !t.invalid && this.text() === t.text();
    }, Lr.addQuery = function(t) {
      this[this.length++] = t;
    }, Lr.selector = Lr.toString;
    var Ar = {
      allAre: function(e) {
        var r = new Sr(e);
        return this.every(function(a) {
          return r.matches(a);
        });
      },
      is: function(e) {
        var r = new Sr(e);
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
    Ar.allAreNeighbours = Ar.allAreNeighbors, Ar.has = Ar.contains, Ar.equal = Ar.equals = Ar.same;
    var Zt = function(e, r) {
      return function(n, i, s, o) {
        var u = n, l = this, f;
        if (u == null ? f = "" : pe(u) && u.length === 1 && (f = u.id()), l.length === 1 && f) {
          var h = l[0]._private, v = h.traversalCache = h.traversalCache || {}, d = v[r] = v[r] || [], c = Pr(f), y = d[c];
          return y || (d[c] = e.call(l, n, i, s, o));
        } else
          return e.call(l, n, i, s, o);
      };
    }, fa = {
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
      children: Zt(function(t) {
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
    function Si(t, e, r, a) {
      for (var n = [], i = new Jr(), s = t.cy(), o = s.hasCompoundNodes(), u = 0; u < t.length; u++) {
        var l = t[u];
        r ? n.push(l) : o && a(n, i, l);
      }
      for (; n.length > 0; ) {
        var f = n.shift();
        e(f), i.add(f.id()), o && a(n, i, f);
      }
      return t;
    }
    function fo(t, e, r) {
      if (r.isParent())
        for (var a = r._private.children, n = 0; n < a.length; n++) {
          var i = a[n];
          e.has(i.id()) || t.push(i);
        }
    }
    fa.forEachDown = function(t) {
      var e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0;
      return Si(this, t, e, fo);
    };
    function ho(t, e, r) {
      if (r.isChild()) {
        var a = r._private.parent;
        e.has(a.id()) || t.push(a);
      }
    }
    fa.forEachUp = function(t) {
      var e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0;
      return Si(this, t, e, ho);
    };
    function jc(t, e, r) {
      ho(t, e, r), fo(t, e, r);
    }
    fa.forEachUpAndDown = function(t) {
      var e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0;
      return Si(this, t, e, jc);
    }, fa.ancestors = fa.parents;
    var Va, vo;
    Va = vo = {
      data: ct.data({
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
      removeData: ct.removeData({
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
      scratch: ct.data({
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
      removeScratch: ct.removeData({
        field: "scratch",
        event: "scratch",
        triggerFnName: "trigger",
        triggerEvent: !0,
        updateStyle: !0
      }),
      rscratch: ct.data({
        field: "rscratch",
        allowBinding: !1,
        allowSetting: !0,
        settingTriggersEvent: !1,
        allowGetting: !0
      }),
      removeRscratch: ct.removeData({
        field: "rscratch",
        triggerEvent: !1
      }),
      id: function() {
        var e = this[0];
        if (e)
          return e._private.data.id;
      }
    }, Va.attr = Va.data, Va.removeAttr = Va.removeData;
    var ed = vo, An = {};
    function Li(t) {
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
    He(An, {
      degree: Li(function(t, e) {
        return e.source().same(e.target()) ? 2 : 1;
      }),
      indegree: Li(function(t, e) {
        return e.target().same(t) ? 1 : 0;
      }),
      outdegree: Li(function(t, e) {
        return e.source().same(t) ? 1 : 0;
      })
    });
    function ha(t, e) {
      return function(r) {
        for (var a, n = this.nodes(), i = 0; i < n.length; i++) {
          var s = n[i], o = s[t](r);
          o !== void 0 && (a === void 0 || e(o, a)) && (a = o);
        }
        return a;
      };
    }
    He(An, {
      minDegree: ha("degree", function(t, e) {
        return t < e;
      }),
      maxDegree: ha("degree", function(t, e) {
        return t > e;
      }),
      minIndegree: ha("indegree", function(t, e) {
        return t < e;
      }),
      maxIndegree: ha("indegree", function(t, e) {
        return t > e;
      }),
      minOutdegree: ha("outdegree", function(t, e) {
        return t < e;
      }),
      maxOutdegree: ha("outdegree", function(t, e) {
        return t > e;
      })
    }), He(An, {
      totalDegree: function(e) {
        for (var r = 0, a = this.nodes(), n = 0; n < a.length; n++)
          r += a[n].degree(e);
        return r;
      }
    });
    var tr, co, go = function(e, r, a) {
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
    }, po = {
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
        go(e, r, !1);
      },
      onSet: function(e) {
        e.dirtyCompoundBoundsCache();
      },
      canSet: function(e) {
        return !e.locked();
      }
    };
    tr = co = {
      position: ct.data(po),
      // position but no notification to renderer
      silentPosition: ct.data(He({}, po, {
        allowBinding: !1,
        allowSetting: !0,
        settingTriggersEvent: !1,
        allowGetting: !1,
        beforeSet: function(e, r) {
          go(e, r, !0);
        },
        onSet: function(e) {
          e.dirtyCompoundBoundsCache();
        }
      })),
      positions: function(e, r) {
        if (S(e))
          r ? this.silentPosition(e) : this.position(e);
        else if (H(e)) {
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
        if (S(e) ? (n = {
          x: R(e.x) ? e.x : 0,
          y: R(e.y) ? e.y : 0
        }, a = r) : ee(e) && R(r) && (n = {
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
        return S(e) ? this.shift(e, !0) : ee(e) && R(r) && this.shift(e, r, !0), this;
      },
      // get/set the rendered (i.e. on screen) positon of the element
      renderedPosition: function(e, r) {
        var a = this[0], n = this.cy(), i = n.zoom(), s = n.pan(), o = S(e) ? e : void 0, u = o !== void 0 || r !== void 0 && ee(e);
        if (a && a.isNode())
          if (u)
            for (var l = 0; l < this.length; l++) {
              var f = this[l];
              r !== void 0 ? f.position(e, (r - s[e]) / i) : o !== void 0 && f.position(bs(o, i, s));
            }
          else {
            var h = a.position();
            return o = vn(h, i, s), e === void 0 ? o : o[e];
          }
        else if (!u)
          return;
        return this;
      },
      // get/set the position relative to the parent
      relativePosition: function(e, r) {
        var a = this[0], n = this.cy(), i = S(e) ? e : void 0, s = i !== void 0 || r !== void 0 && ee(e), o = n.hasCompoundNodes();
        if (a && a.isNode())
          if (s)
            for (var u = 0; u < this.length; u++) {
              var l = this[u], f = o ? l.parent() : null, h = f && f.length > 0, v = h;
              h && (f = f[0]);
              var d = v ? f.position() : {
                x: 0,
                y: 0
              };
              r !== void 0 ? l.position(e, r + d[e]) : i !== void 0 && l.position({
                x: i.x + d.x,
                y: i.y + d.y
              });
            }
          else {
            var c = a.position(), y = o ? a.parent() : null, p = y && y.length > 0, g = p;
            p && (y = y[0]);
            var m = g ? y.position() : {
              x: 0,
              y: 0
            };
            return i = {
              x: c.x - m.x,
              y: c.y - m.y
            }, e === void 0 ? i : i[e];
          }
        else if (!s)
          return;
        return this;
      }
    }, tr.modelPosition = tr.point = tr.position, tr.modelPositions = tr.points = tr.positions, tr.renderedPoint = tr.renderedPosition, tr.relativePoint = tr.relativePosition;
    var td = co, va, Or;
    va = Or = {}, Or.renderedBoundingBox = function(t) {
      var e = this.boundingBox(t), r = this.cy(), a = r.zoom(), n = r.pan(), i = e.x1 * a + n.x, s = e.x2 * a + n.x, o = e.y1 * a + n.y, u = e.y2 * a + n.y;
      return {
        x1: i,
        x2: s,
        y1: o,
        y2: u,
        w: s - i,
        h: u - o
      };
    }, Or.dirtyCompoundBoundsCache = function() {
      var t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !1, e = this.cy();
      return !e.styleEnabled() || !e.hasCompoundNodes() ? this : (this.forEachUp(function(r) {
        if (r.isParent()) {
          var a = r._private;
          a.compoundBoundsClean = !1, a.bbCache = null, t || r.emitAndNotify("bounds");
        }
      }), this);
    }, Or.updateCompoundBounds = function() {
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
        }), v = o.position;
        (h.w === 0 || h.h === 0) && (h = {
          w: s.pstyle("width").pfValue,
          h: s.pstyle("height").pfValue
        }, h.x1 = v.x - h.w / 2, h.x2 = v.x + h.w / 2, h.y1 = v.y - h.h / 2, h.y2 = v.y + h.h / 2);
        function d(D, F, G) {
          var N = 0, X = 0, B = F + G;
          return D > 0 && B > 0 && (N = F / B * D, X = G / B * D), {
            biasDiff: N,
            biasComplementDiff: X
          };
        }
        function c(D, F, G, N) {
          if (G.units === "%")
            switch (N) {
              case "width":
                return D > 0 ? G.pfValue * D : 0;
              case "height":
                return F > 0 ? G.pfValue * F : 0;
              case "average":
                return D > 0 && F > 0 ? G.pfValue * (D + F) / 2 : 0;
              case "min":
                return D > 0 && F > 0 ? D > F ? G.pfValue * F : G.pfValue * D : 0;
              case "max":
                return D > 0 && F > 0 ? D > F ? G.pfValue * D : G.pfValue * F : 0;
              default:
                return 0;
            }
          else
            return G.units === "px" ? G.pfValue : 0;
        }
        var y = f.width.left.value;
        f.width.left.units === "px" && f.width.val > 0 && (y = y * 100 / f.width.val);
        var p = f.width.right.value;
        f.width.right.units === "px" && f.width.val > 0 && (p = p * 100 / f.width.val);
        var g = f.height.top.value;
        f.height.top.units === "px" && f.height.val > 0 && (g = g * 100 / f.height.val);
        var m = f.height.bottom.value;
        f.height.bottom.units === "px" && f.height.val > 0 && (m = m * 100 / f.height.val);
        var b = d(f.width.val - h.w, y, p), E = b.biasDiff, M = b.biasComplementDiff, L = d(f.height.val - h.h, g, m), w = L.biasDiff, k = L.biasComplementDiff;
        o.autoPadding = c(h.w, h.h, s.pstyle("padding"), s.pstyle("padding-relative-to").value), o.autoWidth = Math.max(h.w, f.width.val), v.x = (-E + h.x1 + h.x2 + M) / 2, o.autoHeight = Math.max(h.h, f.height.val), v.y = (-w + h.y1 + h.y2 + k) / 2;
      }
      for (var a = 0; a < this.length; a++) {
        var n = this[a], i = n._private;
        (!i.compoundBoundsClean || t) && (r(n), e.batching() || (i.compoundBoundsClean = !0));
      }
      return this;
    };
    var Qt = function(e) {
      return e === 1 / 0 || e === -1 / 0 ? 0 : e;
    }, rr = function(e, r, a, n, i) {
      n - r === 0 || i - a === 0 || r == null || a == null || n == null || i == null || (e.x1 = r < e.x1 ? r : e.x1, e.x2 = n > e.x2 ? n : e.x2, e.y1 = a < e.y1 ? a : e.y1, e.y2 = i > e.y2 ? i : e.y2, e.w = e.x2 - e.x1, e.h = e.y2 - e.y1);
    }, Vr = function(e, r) {
      return r == null ? e : rr(e, r.x1, r.y1, r.x2, r.y2);
    }, Ua = function(e, r, a) {
      return er(e, r, a);
    }, On = function(e, r, a) {
      if (!r.cy().headless()) {
        var n = r._private, i = n.rstyle, s = i.arrowWidth / 2, o = r.pstyle(a + "-arrow-shape").value, u, l;
        if (o !== "none") {
          a === "source" ? (u = i.srcX, l = i.srcY) : a === "target" ? (u = i.tgtX, l = i.tgtY) : (u = i.midX, l = i.midY);
          var f = n.arrowBounds = n.arrowBounds || {}, h = f[a] = f[a] || {};
          h.x1 = u - s, h.y1 = l - s, h.x2 = u + s, h.y2 = l + s, h.w = h.x2 - h.x1, h.h = h.y2 - h.y1, dn(h, 1), rr(e, h.x1, h.y1, h.x2, h.y2);
        }
      }
    }, Ai = function(e, r, a) {
      if (!r.cy().headless()) {
        var n;
        a ? n = a + "-" : n = "";
        var i = r._private, s = i.rstyle, o = r.pstyle(n + "label").strValue;
        if (o) {
          var u = r.pstyle("text-halign"), l = r.pstyle("text-valign"), f = Ua(s, "labelWidth", a), h = Ua(s, "labelHeight", a), v = Ua(s, "labelX", a), d = Ua(s, "labelY", a), c = r.pstyle(n + "text-margin-x").pfValue, y = r.pstyle(n + "text-margin-y").pfValue, p = r.isEdge(), g = r.pstyle(n + "text-rotation"), m = r.pstyle("text-outline-width").pfValue, b = r.pstyle("text-border-width").pfValue, E = b / 2, M = r.pstyle("text-background-padding").pfValue, L = 2, w = h, k = f, D = k / 2, F = w / 2, G, N, X, B;
          if (p)
            G = v - D, N = v + D, X = d - F, B = d + F;
          else {
            switch (u.value) {
              case "left":
                G = v - k, N = v;
                break;
              case "center":
                G = v - D, N = v + D;
                break;
              case "right":
                G = v, N = v + k;
                break;
            }
            switch (l.value) {
              case "top":
                X = d - w, B = d;
                break;
              case "center":
                X = d - F, B = d + F;
                break;
              case "bottom":
                X = d, B = d + w;
                break;
            }
          }
          G += c - Math.max(m, E) - M - L, N += c + Math.max(m, E) + M + L, X += y - Math.max(m, E) - M - L, B += y + Math.max(m, E) + M + L;
          var re = a || "main", K = i.labelBounds, W = K[re] = K[re] || {};
          W.x1 = G, W.y1 = X, W.x2 = N, W.y2 = B, W.w = N - G, W.h = B - X;
          var ae = p && g.strValue === "autorotate", ue = g.pfValue != null && g.pfValue !== 0;
          if (ae || ue) {
            var me = ae ? Ua(i.rstyle, "labelAngle", a) : g.pfValue, ie = Math.cos(me), ge = Math.sin(me), Ee = (G + N) / 2, Ce = (X + B) / 2;
            if (!p) {
              switch (u.value) {
                case "left":
                  Ee = N;
                  break;
                case "right":
                  Ee = G;
                  break;
              }
              switch (l.value) {
                case "top":
                  Ce = B;
                  break;
                case "bottom":
                  Ce = X;
                  break;
              }
            }
            var we = function(Xe, Ie) {
              return Xe = Xe - Ee, Ie = Ie - Ce, {
                x: Xe * ie - Ie * ge + Ee,
                y: Xe * ge + Ie * ie + Ce
              };
            }, De = we(G, X), se = we(G, B), xe = we(N, X), Le = we(N, B);
            G = Math.min(De.x, se.x, xe.x, Le.x), N = Math.max(De.x, se.x, xe.x, Le.x), X = Math.min(De.y, se.y, xe.y, Le.y), B = Math.max(De.y, se.y, xe.y, Le.y);
          }
          var Se = re + "Rot", Oe = K[Se] = K[Se] || {};
          Oe.x1 = G, Oe.y1 = X, Oe.x2 = N, Oe.y2 = B, Oe.w = N - G, Oe.h = B - X, rr(e, G, X, N, B), rr(i.labelBounds.all, G, X, N, B);
        }
        return e;
      }
    }, rd = function(e, r) {
      if (!r.cy().headless()) {
        var a = r.pstyle("outline-opacity").value, n = r.pstyle("outline-width").value;
        if (a > 0 && n > 0) {
          var i = r.pstyle("outline-offset").value, s = r.pstyle("shape").value, o = n + i, u = (e.w + o * 2) / e.w, l = (e.h + o * 2) / e.h, f = 0, h = 0;
          ["diamond", "pentagon", "round-triangle"].includes(s) ? (u = (e.w + o * 2.4) / e.w, h = -o / 3.6) : ["concave-hexagon", "rhomboid", "right-rhomboid"].includes(s) ? u = (e.w + o * 2.4) / e.w : s === "star" ? (u = (e.w + o * 2.8) / e.w, l = (e.h + o * 2.6) / e.h, h = -o / 3.8) : s === "triangle" ? (u = (e.w + o * 2.8) / e.w, l = (e.h + o * 2.4) / e.h, h = -o / 1.4) : s === "vee" && (u = (e.w + o * 4.4) / e.w, l = (e.h + o * 3.8) / e.h, h = -o * 0.5);
          var v = e.h * l - e.h, d = e.w * u - e.w;
          if (gn(e, [Math.ceil(v / 2), Math.ceil(d / 2)]), f != 0 || h !== 0) {
            var c = Tf(e, f, h);
            ws(e, c);
          }
        }
      }
    }, ad = function(e, r) {
      var a = e._private.cy, n = a.styleEnabled(), i = a.headless(), s = Yt(), o = e._private, u = e.isNode(), l = e.isEdge(), f, h, v, d, c, y, p = o.rstyle, g = u && n ? e.pstyle("bounds-expansion").pfValue : [0], m = function(Ue) {
        return Ue.pstyle("display").value !== "none";
      }, b = !n || m(e) && (!l || m(e.source()) && m(e.target()));
      if (b) {
        var E = 0, M = 0;
        n && r.includeOverlays && (E = e.pstyle("overlay-opacity").value, E !== 0 && (M = e.pstyle("overlay-padding").value));
        var L = 0, w = 0;
        n && r.includeUnderlays && (L = e.pstyle("underlay-opacity").value, L !== 0 && (w = e.pstyle("underlay-padding").value));
        var k = Math.max(M, w), D = 0, F = 0;
        if (n && (D = e.pstyle("width").pfValue, F = D / 2), u && r.includeNodes) {
          var G = e.position();
          c = G.x, y = G.y;
          var N = e.outerWidth(), X = N / 2, B = e.outerHeight(), re = B / 2;
          f = c - X, h = c + X, v = y - re, d = y + re, rr(s, f, v, h, d), n && r.includeOutlines && rd(s, e);
        } else if (l && r.includeEdges)
          if (n && !i) {
            var K = e.pstyle("curve-style").strValue;
            if (f = Math.min(p.srcX, p.midX, p.tgtX), h = Math.max(p.srcX, p.midX, p.tgtX), v = Math.min(p.srcY, p.midY, p.tgtY), d = Math.max(p.srcY, p.midY, p.tgtY), f -= F, h += F, v -= F, d += F, rr(s, f, v, h, d), K === "haystack") {
              var W = p.haystackPts;
              if (W && W.length === 2) {
                if (f = W[0].x, v = W[0].y, h = W[1].x, d = W[1].y, f > h) {
                  var ae = f;
                  f = h, h = ae;
                }
                if (v > d) {
                  var ue = v;
                  v = d, d = ue;
                }
                rr(s, f - F, v - F, h + F, d + F);
              }
            } else if (K === "bezier" || K === "unbundled-bezier" || K === "segments" || K === "taxi") {
              var me;
              switch (K) {
                case "bezier":
                case "unbundled-bezier":
                  me = p.bezierPts;
                  break;
                case "segments":
                case "taxi":
                  me = p.linePts;
                  break;
              }
              if (me != null)
                for (var ie = 0; ie < me.length; ie++) {
                  var ge = me[ie];
                  f = ge.x - F, h = ge.x + F, v = ge.y - F, d = ge.y + F, rr(s, f, v, h, d);
                }
            }
          } else {
            var Ee = e.source(), Ce = Ee.position(), we = e.target(), De = we.position();
            if (f = Ce.x, h = De.x, v = Ce.y, d = De.y, f > h) {
              var se = f;
              f = h, h = se;
            }
            if (v > d) {
              var xe = v;
              v = d, d = xe;
            }
            f -= F, h += F, v -= F, d += F, rr(s, f, v, h, d);
          }
        if (n && r.includeEdges && l && (On(s, e, "mid-source"), On(s, e, "mid-target"), On(s, e, "source"), On(s, e, "target")), n) {
          var Le = e.pstyle("ghost").value === "yes";
          if (Le) {
            var Se = e.pstyle("ghost-offset-x").pfValue, Oe = e.pstyle("ghost-offset-y").pfValue;
            rr(s, s.x1 + Se, s.y1 + Oe, s.x2 + Se, s.y2 + Oe);
          }
        }
        var Fe = o.bodyBounds = o.bodyBounds || {};
        xs(Fe, s), gn(Fe, g), dn(Fe, 1), n && (f = s.x1, h = s.x2, v = s.y1, d = s.y2, rr(s, f - k, v - k, h + k, d + k));
        var Xe = o.overlayBounds = o.overlayBounds || {};
        xs(Xe, s), gn(Xe, g), dn(Xe, 1);
        var Ie = o.labelBounds = o.labelBounds || {};
        Ie.all != null ? xf(Ie.all) : Ie.all = Yt(), n && r.includeLabels && (r.includeMainLabels && Ai(s, e, null), l && (r.includeSourceLabels && Ai(s, e, "source"), r.includeTargetLabels && Ai(s, e, "target")));
      }
      return s.x1 = Qt(s.x1), s.y1 = Qt(s.y1), s.x2 = Qt(s.x2), s.y2 = Qt(s.y2), s.w = Qt(s.x2 - s.x1), s.h = Qt(s.y2 - s.y1), s.w > 0 && s.h > 0 && b && (gn(s, g), dn(s, 1)), s;
    }, yo = function(e) {
      var r = 0, a = function(s) {
        return (s ? 1 : 0) << r++;
      }, n = 0;
      return n += a(e.incudeNodes), n += a(e.includeEdges), n += a(e.includeLabels), n += a(e.includeMainLabels), n += a(e.includeSourceLabels), n += a(e.includeTargetLabels), n += a(e.includeOverlays), n += a(e.includeOutlines), n;
    }, mo = function(e) {
      if (e.isEdge()) {
        var r = e.source().position(), a = e.target().position(), n = function(s) {
          return Math.round(s);
        };
        return $u([n(r.x), n(r.y), n(a.x), n(a.y)]);
      } else
        return 0;
    }, bo = function(e, r) {
      var a = e._private, n, i = e.isEdge(), s = r == null ? Eo : yo(r), o = s === Eo, u = mo(e), l = a.bbCachePosKey === u, f = r.useCache && l, h = function(y) {
        return y._private.bbCache == null || y._private.styleDirty;
      }, v = !f || h(e) || i && h(e.source()) || h(e.target());
      if (v ? (l || e.recalculateRenderedStyle(f), n = ad(e, $a), a.bbCache = n, a.bbCachePosKey = u) : n = a.bbCache, !o) {
        var d = e.isNode();
        n = Yt(), (r.includeNodes && d || r.includeEdges && !d) && (r.includeOverlays ? Vr(n, a.overlayBounds) : Vr(n, a.bodyBounds)), r.includeLabels && (r.includeMainLabels && (!i || r.includeSourceLabels && r.includeTargetLabels) ? Vr(n, a.labelBounds.all) : (r.includeMainLabels && Vr(n, a.labelBounds.mainRot), r.includeSourceLabels && Vr(n, a.labelBounds.sourceRot), r.includeTargetLabels && Vr(n, a.labelBounds.targetRot))), n.w = n.x2 - n.x1, n.h = n.y2 - n.y1;
      }
      return n;
    }, $a = {
      includeNodes: !0,
      includeEdges: !0,
      includeLabels: !0,
      includeMainLabels: !0,
      includeSourceLabels: !0,
      includeTargetLabels: !0,
      includeOverlays: !0,
      includeUnderlays: !0,
      includeOutlines: !0,
      useCache: !0
    }, Eo = yo($a), wo = At($a);
    Or.boundingBox = function(t) {
      var e;
      if (this.length === 1 && this[0]._private.bbCache != null && !this[0]._private.styleDirty && (t === void 0 || t.useCache === void 0 || t.useCache === !0))
        t === void 0 ? t = $a : t = wo(t), e = bo(this[0], t);
      else {
        e = Yt(), t = t || $a;
        var r = wo(t), a = this, n = a.cy(), i = n.styleEnabled();
        if (i)
          for (var s = 0; s < a.length; s++) {
            var o = a[s], u = o._private, l = mo(o), f = u.bbCachePosKey === l, h = r.useCache && f && !u.styleDirty;
            o.recalculateRenderedStyle(h);
          }
        this.updateCompoundBounds(!t.useCache);
        for (var v = 0; v < a.length; v++) {
          var d = a[v];
          Vr(e, bo(d, r));
        }
      }
      return e.x1 = Qt(e.x1), e.y1 = Qt(e.y1), e.x2 = Qt(e.x2), e.y2 = Qt(e.y2), e.w = Qt(e.x2 - e.x1), e.h = Qt(e.y2 - e.y1), e;
    }, Or.dirtyBoundingBoxCache = function() {
      for (var t = 0; t < this.length; t++) {
        var e = this[t]._private;
        e.bbCache = null, e.bbCachePosKey = null, e.bodyBounds = null, e.overlayBounds = null, e.labelBounds.all = null, e.labelBounds.source = null, e.labelBounds.target = null, e.labelBounds.main = null, e.labelBounds.sourceRot = null, e.labelBounds.targetRot = null, e.labelBounds.mainRot = null, e.arrowBounds.source = null, e.arrowBounds.target = null, e.arrowBounds["mid-source"] = null, e.arrowBounds["mid-target"] = null;
      }
      return this.emitAndNotify("bounds"), this;
    }, Or.boundingBoxAt = function(t) {
      var e = this.nodes(), r = this.cy(), a = r.hasCompoundNodes(), n = r.collection();
      if (a && (n = e.filter(function(l) {
        return l.isParent();
      }), e = e.not(n)), S(t)) {
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
      var u = wf(this.boundingBox({
        useCache: !1
      }));
      return e.silentPositions(o), a && (n.dirtyCompoundBoundsCache(), n.dirtyBoundingBoxCache(), n.updateCompoundBounds(!0)), r.endBatch(), u;
    }, va.boundingbox = va.bb = va.boundingBox, va.renderedBoundingbox = va.renderedBoundingBox;
    var nd = Or, _a, Ya;
    _a = Ya = {};
    var xo = function(e) {
      e.uppercaseName = Pt(e.name), e.autoName = "auto" + e.uppercaseName, e.labelName = "label" + e.uppercaseName, e.outerName = "outer" + e.uppercaseName, e.uppercaseOuterName = Pt(e.outerName), _a[e.name] = function() {
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
      }, _a["outer" + e.uppercaseName] = function() {
        var a = this[0], n = a._private, i = n.cy, s = i._private.styleEnabled;
        if (a)
          if (s) {
            var o = a[e.name](), u = a.pstyle("border-width").pfValue, l = 2 * a.padding();
            return o + u + l;
          } else
            return 1;
      }, _a["rendered" + e.uppercaseName] = function() {
        var a = this[0];
        if (a) {
          var n = a[e.name]();
          return n * this.cy().zoom();
        }
      }, _a["rendered" + e.uppercaseOuterName] = function() {
        var a = this[0];
        if (a) {
          var n = a[e.outerName]();
          return n * this.cy().zoom();
        }
      };
    };
    xo({
      name: "width"
    }), xo({
      name: "height"
    }), Ya.padding = function() {
      var t = this[0], e = t._private;
      return t.isParent() ? (t.updateCompoundBounds(), e.autoPadding !== void 0 ? e.autoPadding : t.pstyle("padding").pfValue) : t.pstyle("padding").pfValue;
    }, Ya.paddedHeight = function() {
      var t = this[0];
      return t.height() + 2 * t.padding();
    }, Ya.paddedWidth = function() {
      var t = this[0];
      return t.width() + 2 * t.padding();
    };
    var id = Ya, sd = function(e, r) {
      if (e.isEdge())
        return r(e);
    }, od = function(e, r) {
      if (e.isEdge()) {
        var a = e.cy();
        return vn(r(e), a.zoom(), a.pan());
      }
    }, ld = function(e, r) {
      if (e.isEdge()) {
        var a = e.cy(), n = a.pan(), i = a.zoom();
        return r(e).map(function(s) {
          return vn(s, i, n);
        });
      }
    }, ud = function(e) {
      return e.renderer().getControlPoints(e);
    }, fd = function(e) {
      return e.renderer().getSegmentPoints(e);
    }, hd = function(e) {
      return e.renderer().getSourceEndpoint(e);
    }, vd = function(e) {
      return e.renderer().getTargetEndpoint(e);
    }, cd = function(e) {
      return e.renderer().getEdgeMidpoint(e);
    }, To = {
      controlPoints: {
        get: ud,
        mult: !0
      },
      segmentPoints: {
        get: fd,
        mult: !0
      },
      sourceEndpoint: {
        get: hd
      },
      targetEndpoint: {
        get: vd
      },
      midpoint: {
        get: cd
      }
    }, dd = function(e) {
      return "rendered" + e[0].toUpperCase() + e.substr(1);
    }, gd = Object.keys(To).reduce(function(t, e) {
      var r = To[e], a = dd(e);
      return t[e] = function() {
        return sd(this, r.get);
      }, r.mult ? t[a] = function() {
        return ld(this, r.get);
      } : t[a] = function() {
        return od(this, r.get);
      }, t;
    }, {}), pd = He({}, td, nd, id, gd);
    /*!
    	  Event object based on jQuery events, MIT license
    
    	  https://jquery.org/license/
    	  https://tldrlegal.com/license/mit-license
    	  https://github.com/jquery/jquery/blob/master/src/event.js
    	  */
    var Co = function(e, r) {
      this.recycle(e, r);
    };
    function Ha() {
      return !1;
    }
    function Nn() {
      return !0;
    }
    Co.prototype = {
      instanceString: function() {
        return "event";
      },
      recycle: function(e, r) {
        if (this.isImmediatePropagationStopped = this.isPropagationStopped = this.isDefaultPrevented = Ha, e != null && e.preventDefault ? (this.type = e.type, this.isDefaultPrevented = e.defaultPrevented ? Nn : Ha) : e != null && e.type ? r = e : this.type = e, r != null && (this.originalEvent = r.originalEvent, this.type = r.type != null ? r.type : this.type, this.cy = r.cy, this.target = r.target, this.position = r.position, this.renderedPosition = r.renderedPosition, this.namespace = r.namespace, this.layout = r.layout), this.cy != null && this.position != null && this.renderedPosition == null) {
          var a = this.position, n = this.cy.zoom(), i = this.cy.pan();
          this.renderedPosition = {
            x: a.x * n + i.x,
            y: a.y * n + i.y
          };
        }
        this.timeStamp = e && e.timeStamp || Date.now();
      },
      preventDefault: function() {
        this.isDefaultPrevented = Nn;
        var e = this.originalEvent;
        e && e.preventDefault && e.preventDefault();
      },
      stopPropagation: function() {
        this.isPropagationStopped = Nn;
        var e = this.originalEvent;
        e && e.stopPropagation && e.stopPropagation();
      },
      stopImmediatePropagation: function() {
        this.isImmediatePropagationStopped = Nn, this.stopPropagation();
      },
      isDefaultPrevented: Ha,
      isPropagationStopped: Ha,
      isImmediatePropagationStopped: Ha
    };
    var Do = /^([^.]+)(\.(?:[^.]+))?$/, yd = ".*", So = {
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
    }, Lo = Object.keys(So), md = {};
    function In() {
      for (var t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : md, e = arguments.length > 1 ? arguments[1] : void 0, r = 0; r < Lo.length; r++) {
        var a = Lo[r];
        this[a] = t[a] || So[a];
      }
      this.context = e || this.context, this.listeners = [], this.emitting = 0;
    }
    var Nr = In.prototype, Ao = function(e, r, a, n, i, s, o) {
      H(n) && (i = n, n = null), o && (s == null ? s = o : s = He({}, s, o));
      for (var u = te(a) ? a : a.split(/\s+/), l = 0; l < u.length; l++) {
        var f = u[l];
        if (!Re(f)) {
          var h = f.match(Do);
          if (h) {
            var v = h[1], d = h[2] ? h[2] : null, c = r(e, f, v, d, n, i, s);
            if (c === !1)
              break;
          }
        }
      }
    }, Oo = function(e, r) {
      return e.addEventFields(e.context, r), new Co(r.type, r);
    }, bd = function(e, r, a) {
      if (dt(a)) {
        r(e, a);
        return;
      } else if (S(a)) {
        r(e, Oo(e, a));
        return;
      }
      for (var n = te(a) ? a : a.split(/\s+/), i = 0; i < n.length; i++) {
        var s = n[i];
        if (!Re(s)) {
          var o = s.match(Do);
          if (o) {
            var u = o[1], l = o[2] ? o[2] : null, f = Oo(e, {
              type: u,
              namespace: l,
              target: e.context
            });
            r(e, f);
          }
        }
      }
    };
    Nr.on = Nr.addListener = function(t, e, r, a, n) {
      return Ao(this, function(i, s, o, u, l, f, h) {
        H(f) && i.listeners.push({
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
    }, Nr.one = function(t, e, r, a) {
      return this.on(t, e, r, a, {
        one: !0
      });
    }, Nr.removeListener = Nr.off = function(t, e, r, a) {
      var n = this;
      this.emitting !== 0 && (this.listeners = Wu(this.listeners));
      for (var i = this.listeners, s = function(l) {
        var f = i[l];
        Ao(n, function(h, v, d, c, y, p) {
          if ((f.type === d || t === "*") && (!c && f.namespace !== ".*" || f.namespace === c) && (!y || h.qualifierCompare(f.qualifier, y)) && (!p || f.callback === p))
            return i.splice(l, 1), !1;
        }, t, e, r, a);
      }, o = i.length - 1; o >= 0; o--)
        s(o);
      return this;
    }, Nr.removeAllListeners = function() {
      return this.removeListener("*");
    }, Nr.emit = Nr.trigger = function(t, e, r) {
      var a = this.listeners, n = a.length;
      return this.emitting++, te(e) || (e = [e]), bd(this, function(i, s) {
        r != null && (a = [{
          event: s.event,
          type: s.type,
          namespace: s.namespace,
          callback: r
        }], n = a.length);
        for (var o = function(f) {
          var h = a[f];
          if (h.type === s.type && (!h.namespace || h.namespace === s.namespace || h.namespace === yd) && i.eventMatches(i.context, h, s)) {
            var v = [s];
            e != null && Ku(v, e), i.beforeEmit(i.context, h, s), h.conf && h.conf.one && (i.listeners = i.listeners.filter(function(y) {
              return y !== h;
            }));
            var d = i.callbackContext(i.context, h, s), c = h.callback.apply(d, v);
            i.afterEmit(i.context, h, s), c === !1 && (s.stopPropagation(), s.preventDefault());
          }
        }, u = 0; u < n; u++)
          o(u);
        i.bubble(i.context) && !s.isPropagationStopped() && i.parent(i.context).emit(s, e);
      }, t), this.emitting--, this;
    };
    var Ed = {
      qualifierCompare: function(e, r) {
        return e == null || r == null ? e == null && r == null : e.sameText(r);
      },
      eventMatches: function(e, r, a) {
        var n = r.qualifier;
        return n != null ? e !== a.target && Ae(a.target) && n.matches(a.target) : !0;
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
    }, Mn = function(e) {
      return ee(e) ? new Sr(e) : e;
    }, No = {
      createEmitter: function() {
        for (var e = 0; e < this.length; e++) {
          var r = this[e], a = r._private;
          a.emitter || (a.emitter = new In(Ed, r));
        }
        return this;
      },
      emitter: function() {
        return this._private.emitter;
      },
      on: function(e, r, a) {
        for (var n = Mn(r), i = 0; i < this.length; i++) {
          var s = this[i];
          s.emitter().on(e, n, a);
        }
        return this;
      },
      removeListener: function(e, r, a) {
        for (var n = Mn(r), i = 0; i < this.length; i++) {
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
        for (var n = Mn(r), i = 0; i < this.length; i++) {
          var s = this[i];
          s.emitter().one(e, n, a);
        }
        return this;
      },
      once: function(e, r, a) {
        for (var n = Mn(r), i = 0; i < this.length; i++) {
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
    ct.eventAliasesOn(No);
    var Io = {
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
        if (ee(e) || pe(e))
          return new Sr(e).filter(this);
        if (H(e)) {
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
          ee(e) && (e = this.filter(e));
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
        if (ee(e)) {
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
        ee(e) && (e = r.$(e));
        var a = this.spawn(), n = this, i = e, s = function(u, l) {
          for (var f = 0; f < u.length; f++) {
            var h = u[f], v = h._private.data.id, d = l.hasElementWithId(v);
            d || a.push(h);
          }
        };
        return s(n, i), s(i, n), a;
      },
      diff: function(e) {
        var r = this._private.cy;
        ee(e) && (e = r.$(e));
        var a = this.spawn(), n = this.spawn(), i = this.spawn(), s = this, o = e, u = function(f, h, v) {
          for (var d = 0; d < f.length; d++) {
            var c = f[d], y = c._private.data.id, p = h.hasElementWithId(y);
            p ? i.merge(c) : v.push(c);
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
        if (ee(e)) {
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
        if (e && ee(e)) {
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
        if (e && ee(e)) {
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
    }, lt = Io;
    lt.u = lt["|"] = lt["+"] = lt.union = lt.or = lt.add, lt["\\"] = lt["!"] = lt["-"] = lt.difference = lt.relativeComplement = lt.subtract = lt.not, lt.n = lt["&"] = lt["."] = lt.and = lt.intersection = lt.intersect, lt["^"] = lt["(+)"] = lt["(-)"] = lt.symmetricDifference = lt.symdiff = lt.xor, lt.fnFilter = lt.filterFn = lt.stdFilter = lt.filter, lt.complement = lt.abscomp = lt.absoluteComplement;
    var wd = {
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
    }, Mo = function(e, r) {
      var a = e.cy(), n = a.hasCompoundNodes();
      function i(f) {
        var h = f.pstyle("z-compound-depth");
        return h.value === "auto" ? n ? f.zDepth() : 0 : h.value === "bottom" ? -1 : h.value === "top" ? ii : 0;
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
    }, Rn = {
      forEach: function(e, r) {
        if (H(e))
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
        if (!H(e))
          return this;
        var r = this.toArray().sort(e);
        return this.spawn(r);
      },
      sortByZIndex: function() {
        return this.sort(Mo);
      },
      zDepth: function() {
        var e = this[0];
        if (e) {
          var r = e._private, a = r.group;
          if (a === "nodes") {
            var n = r.data.parent ? e.parents().size() : 0;
            return e.isParent() ? n : ii - 1;
          } else {
            var i = r.source, s = r.target, o = i.zDepth(), u = s.zDepth();
            return Math.max(o, u, 0);
          }
        }
      }
    };
    Rn.each = Rn.forEach;
    var xd = function() {
      var e = "undefined", r = (typeof Symbol > "u" ? "undefined" : _(Symbol)) != e && _(Symbol.iterator) != e;
      r && (Rn[Symbol.iterator] = function() {
        var a = this, n = {
          value: void 0,
          done: !1
        }, i = 0, s = this.length;
        return T({
          next: function() {
            return i < s ? n.value = a[i++] : (n.value = void 0, n.done = !0), n;
          }
        }, Symbol.iterator, function() {
          return this;
        });
      });
    };
    xd();
    var Td = At({
      nodeDimensionsIncludeLabels: !1
    }), kn = {
      // Calculates and returns node dimensions { x, y } based on options given
      layoutDimensions: function(e) {
        e = Td(e);
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
        var n = this.nodes().filter(function(M) {
          return !M.isParent();
        }), i = this.cy(), s = r.eles, o = function(L) {
          return L.id();
        }, u = it(a, o);
        e.emit({
          type: "layoutstart",
          layout: e
        }), e.animations = [];
        var l = function(L, w, k) {
          var D = {
            x: w.x1 + w.w / 2,
            y: w.y1 + w.h / 2
          }, F = {
            // scale from center of bounding box (not necessarily 0,0)
            x: (k.x - D.x) * L,
            y: (k.y - D.y) * L
          };
          return {
            x: D.x + F.x,
            y: D.y + F.y
          };
        }, f = r.spacingFactor && r.spacingFactor !== 1, h = function() {
          if (!f)
            return null;
          for (var L = Yt(), w = 0; w < n.length; w++) {
            var k = n[w], D = u(k, w);
            Cf(L, D.x, D.y);
          }
          return L;
        }, v = h(), d = it(function(M, L) {
          var w = u(M, L);
          if (f) {
            var k = Math.abs(r.spacingFactor);
            w = l(k, v, w);
          }
          return r.transform != null && (w = r.transform(M, w)), w;
        }, o);
        if (r.animate) {
          for (var c = 0; c < n.length; c++) {
            var y = n[c], p = d(y, c), g = r.animateFilter == null || r.animateFilter(y, c);
            if (g) {
              var m = y.animation({
                position: p,
                duration: r.animationDuration,
                easing: r.animationEasing
              });
              e.animations.push(m);
            } else
              y.position(p);
          }
          if (r.fit) {
            var b = i.animation({
              fit: {
                boundingBox: s.boundingBoxAt(d),
                padding: r.padding
              },
              duration: r.animationDuration,
              easing: r.animationEasing
            });
            e.animations.push(b);
          } else if (r.zoom !== void 0 && r.pan !== void 0) {
            var E = i.animation({
              zoom: r.zoom,
              pan: r.pan,
              duration: r.animationDuration,
              easing: r.animationEasing
            });
            e.animations.push(E);
          }
          e.animations.forEach(function(M) {
            return M.play();
          }), e.one("layoutready", r.ready), e.emit({
            type: "layoutready",
            layout: e
          }), ia.all(e.animations.map(function(M) {
            return M.promise();
          })).then(function() {
            e.one("layoutstop", r.stop), e.emit({
              type: "layoutstop",
              layout: e
            });
          });
        } else
          n.positions(d), r.fit && i.fit(r.eles, r.padding), r.zoom != null && i.zoom(r.zoom), r.pan && i.pan(r.pan), e.one("layoutready", r.ready), e.emit({
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
        return r.makeLayout(He({}, e, {
          eles: this
        }));
      }
    };
    kn.createLayout = kn.makeLayout = kn.layout;
    function Ro(t, e, r) {
      var a = r._private, n = a.styleCache = a.styleCache || [], i;
      return (i = n[t]) != null || (i = n[t] = e(r)), i;
    }
    function Pn(t, e) {
      return t = Pr(t), function(a) {
        return Ro(t, e, a);
      };
    }
    function Bn(t, e) {
      t = Pr(t);
      var r = function(n) {
        return e.call(n);
      };
      return function() {
        var n = this[0];
        if (n)
          return Ro(t, r, n);
      };
    }
    var Ot = {
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
        if (S(e)) {
          var s = e;
          i.applyBypass(this, s, n), this.emitAndNotify("style");
        } else if (ee(e))
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
    function Oi(t, e) {
      var r = t._private, a = r.data.parent ? t.parents() : null;
      if (a)
        for (var n = 0; n < a.length; n++) {
          var i = a[n];
          if (!e(i))
            return !1;
        }
      return !0;
    }
    function Ni(t) {
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
            return !s || Oi(i, a);
          var u = o.source, l = o.target;
          return r(u) && (!s || Oi(u, r)) && (u === l || r(l) && (!s || Oi(l, r)));
        }
      };
    }
    var ca = Pn("eleTakesUpSpace", function(t) {
      return t.pstyle("display").value === "element" && t.width() !== 0 && (t.isNode() ? t.height() !== 0 : !0);
    });
    Ot.takesUpSpace = Bn("takesUpSpace", Ni({
      ok: ca
    }));
    var Cd = Pn("eleInteractive", function(t) {
      return t.pstyle("events").value === "yes" && t.pstyle("visibility").value === "visible" && ca(t);
    }), Dd = Pn("parentInteractive", function(t) {
      return t.pstyle("visibility").value === "visible" && ca(t);
    });
    Ot.interactive = Bn("interactive", Ni({
      ok: Cd,
      parentOk: Dd,
      edgeOkViaNode: ca
    })), Ot.noninteractive = function() {
      var t = this[0];
      if (t)
        return !t.interactive();
    };
    var Sd = Pn("eleVisible", function(t) {
      return t.pstyle("visibility").value === "visible" && t.pstyle("opacity").pfValue !== 0 && ca(t);
    }), Ld = ca;
    Ot.visible = Bn("visible", Ni({
      ok: Sd,
      edgeOkViaNode: Ld
    })), Ot.hidden = function() {
      var t = this[0];
      if (t)
        return !t.visible();
    }, Ot.isBundledBezier = Bn("isBundledBezier", function() {
      return this.cy().styleEnabled() ? !this.removed() && this.pstyle("curve-style").value === "bezier" && this.takesUpSpace() : !1;
    }), Ot.bypass = Ot.css = Ot.style, Ot.renderedCss = Ot.renderedStyle, Ot.removeBypass = Ot.removeCss = Ot.removeStyle, Ot.pstyle = Ot.parsedStyle;
    var Ir = {};
    function ko(t) {
      return function() {
        var e = arguments, r = [];
        if (e.length === 2) {
          var a = e[0], n = e[1];
          this.on(t.event, a, n);
        } else if (e.length === 1 && H(e[0])) {
          var i = e[0];
          this.on(t.event, i);
        } else if (e.length === 0 || e.length === 1 && te(e[0])) {
          for (var s = e.length === 1 ? e[0] : null, o = 0; o < this.length; o++) {
            var u = this[o], l = !t.ableField || u._private[t.ableField], f = u._private[t.field] != t.value;
            if (t.overrideAble) {
              var h = t.overrideAble(u);
              if (h !== void 0 && (l = h, !h))
                return this;
            }
            l && (u._private[t.field] = t.value, f && r.push(u));
          }
          var v = this.spawn(r);
          v.updateStyle(), v.emit(t.event), s && v.emit(s);
        }
        return this;
      };
    }
    function da(t) {
      Ir[t.field] = function() {
        var e = this[0];
        if (e) {
          if (t.overrideField) {
            var r = t.overrideField(e);
            if (r !== void 0)
              return r;
          }
          return e._private[t.field];
        }
      }, Ir[t.on] = ko({
        event: t.on,
        field: t.field,
        ableField: t.ableField,
        overrideAble: t.overrideAble,
        value: !0
      }), Ir[t.off] = ko({
        event: t.off,
        field: t.field,
        ableField: t.ableField,
        overrideAble: t.overrideAble,
        value: !1
      });
    }
    da({
      field: "locked",
      overrideField: function(e) {
        return e.cy().autolock() ? !0 : void 0;
      },
      on: "lock",
      off: "unlock"
    }), da({
      field: "grabbable",
      overrideField: function(e) {
        return e.cy().autoungrabify() || e.pannable() ? !1 : void 0;
      },
      on: "grabify",
      off: "ungrabify"
    }), da({
      field: "selected",
      ableField: "selectable",
      overrideAble: function(e) {
        return e.cy().autounselectify() ? !1 : void 0;
      },
      on: "select",
      off: "unselect"
    }), da({
      field: "selectable",
      overrideField: function(e) {
        return e.cy().autounselectify() ? !1 : void 0;
      },
      on: "selectify",
      off: "unselectify"
    }), Ir.deselect = Ir.unselect, Ir.grabbed = function() {
      var t = this[0];
      if (t)
        return t._private.grabbed;
    }, da({
      field: "active",
      on: "activate",
      off: "unactivate"
    }), da({
      field: "pannable",
      on: "panify",
      off: "unpanify"
    }), Ir.inactive = function() {
      var t = this[0];
      if (t)
        return !t._private.active;
    };
    var Bt = {}, Po = function(e) {
      return function(a) {
        for (var n = this, i = [], s = 0; s < n.length; s++) {
          var o = n[s];
          if (o.isNode()) {
            for (var u = !1, l = o.connectedEdges(), f = 0; f < l.length; f++) {
              var h = l[f], v = h.source(), d = h.target();
              if (e.noIncomingEdges && d === o && v !== o || e.noOutgoingEdges && v === o && d !== o) {
                u = !0;
                break;
              }
            }
            u || i.push(o);
          }
        }
        return this.spawn(i, !0).filter(a);
      };
    }, Bo = function(e) {
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
    }, Fo = function(e) {
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
    Bt.clearTraversalCache = function() {
      for (var t = 0; t < this.length; t++)
        this[t]._private.traversalCache = null;
    }, He(Bt, {
      // get the root nodes in the DAG
      roots: Po({
        noIncomingEdges: !0
      }),
      // get the leaf nodes in the DAG
      leaves: Po({
        noOutgoingEdges: !0
      }),
      // normally called children in graph theory
      // these nodes =edges=> outgoing nodes
      outgoers: Zt(Bo({
        outgoing: !0
      }), "outgoers"),
      // aka DAG descendants
      successors: Fo({
        outgoing: !0
      }),
      // normally called parents in graph theory
      // these nodes <=edges= incoming nodes
      incomers: Zt(Bo({
        incoming: !0
      }), "incomers"),
      // aka DAG ancestors
      predecessors: Fo({
        incoming: !0
      })
    }), He(Bt, {
      neighborhood: Zt(function(t) {
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
    }), Bt.neighbourhood = Bt.neighborhood, Bt.closedNeighbourhood = Bt.closedNeighborhood, Bt.openNeighbourhood = Bt.openNeighborhood, He(Bt, {
      source: Zt(function(e) {
        var r = this[0], a;
        return r && (a = r._private.source || r.cy().collection()), a && e ? a.filter(e) : a;
      }, "source"),
      target: Zt(function(e) {
        var r = this[0], a;
        return r && (a = r._private.target || r.cy().collection()), a && e ? a.filter(e) : a;
      }, "target"),
      sources: Go({
        attr: "source"
      }),
      targets: Go({
        attr: "target"
      })
    });
    function Go(t) {
      return function(r) {
        for (var a = [], n = 0; n < this.length; n++) {
          var i = this[n], s = i._private[t.attr];
          s && a.push(s);
        }
        return this.spawn(a, !0).filter(r);
      };
    }
    He(Bt, {
      edgesWith: Zt(zo(), "edgesWith"),
      edgesTo: Zt(zo({
        thisIsSrc: !0
      }), "edgesTo")
    });
    function zo(t) {
      return function(r) {
        var a = [], n = this._private.cy, i = t || {};
        ee(r) && (r = n.$(r));
        for (var s = 0; s < r.length; s++)
          for (var o = r[s]._private.edges, u = 0; u < o.length; u++) {
            var l = o[u], f = l._private.data, h = this.hasElementWithId(f.source) && r.hasElementWithId(f.target), v = r.hasElementWithId(f.source) && this.hasElementWithId(f.target), d = h || v;
            d && ((i.thisIsSrc || i.thisIsTgt) && (i.thisIsSrc && !h || i.thisIsTgt && !v) || a.push(l));
          }
        return this.spawn(a, !0);
      };
    }
    He(Bt, {
      connectedEdges: Zt(function(t) {
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
      connectedNodes: Zt(function(t) {
        for (var e = [], r = this, a = 0; a < r.length; a++) {
          var n = r[a];
          n.isEdge() && (e.push(n.source()[0]), e.push(n.target()[0]));
        }
        return this.spawn(e, !0).filter(t);
      }, "connectedNodes"),
      parallelEdges: Zt(Vo(), "parallelEdges"),
      codirectedEdges: Zt(Vo({
        codirected: !0
      }), "codirectedEdges")
    });
    function Vo(t) {
      var e = {
        codirected: !1
      };
      return t = He({}, e, t), function(a) {
        for (var n = [], i = this.edges(), s = t, o = 0; o < i.length; o++)
          for (var u = i[o], l = u._private, f = l.source, h = f._private.data.id, v = l.data.target, d = f._private.edges, c = 0; c < d.length; c++) {
            var y = d[c], p = y._private.data, g = p.target, m = p.source, b = g === v && m === h, E = h === g && v === m;
            (s.codirected && b || !s.codirected && (b || E)) && n.push(y);
          }
        return this.spawn(n, !0).filter(a);
      };
    }
    He(Bt, {
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
            visit: function(d) {
              return o(d, f);
            }
          }), f.forEach(function(v) {
            v.connectedEdges().forEach(function(d) {
              r.has(d) && f.has(d.source()) && f.has(d.target()) && f.merge(d);
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
    }), Bt.componentsOf = Bt.components;
    var Nt = function(e, r) {
      var a = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !1, n = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : !1;
      if (e === void 0) {
        xt("A collection must have a reference to the core");
        return;
      }
      var i = new ur(), s = !1;
      if (!r)
        r = [];
      else if (r.length > 0 && S(r[0]) && !Ae(r[0])) {
        s = !0;
        for (var o = [], u = new Jr(), l = 0, f = r.length; l < f; l++) {
          var h = r[l];
          h.data == null && (h.data = {});
          var v = h.data;
          if (v.id == null)
            v.id = ps();
          else if (e.hasElementWithId(v.id) || u.has(v.id))
            continue;
          var d = new hn(e, h, !1);
          o.push(d), u.add(v.id);
        }
        r = o;
      }
      this.length = 0;
      for (var c = 0, y = r.length; c < y; c++) {
        var p = r[c][0];
        if (p != null) {
          var g = p._private.data.id;
          (!a || !i.has(g)) && (a && i.set(g, {
            index: this.length,
            ele: p
          }), this[this.length] = p, this.length++);
        }
      }
      this._private = {
        eles: this,
        cy: e,
        get map() {
          return this.lazyMap == null && this.rebuildMap(), this.lazyMap;
        },
        set map(m) {
          this.lazyMap = m;
        },
        rebuildMap: function() {
          for (var b = this.lazyMap = new ur(), E = this.eles, M = 0; M < E.length; M++) {
            var L = E[M];
            b.set(L.id(), {
              index: M,
              ele: L
            });
          }
        }
      }, a && (this._private.map = i), s && !n && this.restore();
    }, mt = hn.prototype = Nt.prototype = Object.create(Array.prototype);
    mt.instanceString = function() {
      return "collection";
    }, mt.spawn = function(t, e) {
      return new Nt(this.cy(), t, e);
    }, mt.spawnSelf = function() {
      return this.spawn(this);
    }, mt.cy = function() {
      return this._private.cy;
    }, mt.renderer = function() {
      return this._private.cy.renderer();
    }, mt.element = function() {
      return this[0];
    }, mt.collection = function() {
      return Ne(this) ? this : new Nt(this._private.cy, [this]);
    }, mt.unique = function() {
      return new Nt(this._private.cy, this, !0);
    }, mt.hasElementWithId = function(t) {
      return t = "" + t, this._private.map.has(t);
    }, mt.getElementById = function(t) {
      t = "" + t;
      var e = this._private.cy, r = this._private.map.get(t);
      return r ? r.ele : new Nt(e);
    }, mt.$id = mt.getElementById, mt.poolIndex = function() {
      var t = this._private.cy, e = t._private.elements, r = this[0]._private.data.id;
      return e._private.map.get(r).index;
    }, mt.indexOf = function(t) {
      var e = t[0]._private.data.id;
      return this._private.map.get(e).index;
    }, mt.indexOfId = function(t) {
      return t = "" + t, this._private.map.get(t).index;
    }, mt.json = function(t) {
      var e = this.element(), r = this.cy();
      if (e == null && t)
        return this;
      if (e != null) {
        var a = e._private;
        if (S(t)) {
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
          var h = function(y, p, g) {
            var m = t[y];
            m != null && m !== a[y] && (m ? e[p]() : e[g]());
          };
          return h("removed", "remove", "restore"), h("selected", "select", "unselect"), h("selectable", "selectify", "unselectify"), h("locked", "lock", "unlock"), h("grabbable", "grabify", "ungrabify"), h("pannable", "panify", "unpanify"), t.classes != null && e.classes(t.classes), r.endBatch(), this;
        } else if (t === void 0) {
          var v = {
            data: lr(a.data),
            position: lr(a.position),
            group: a.group,
            removed: a.removed,
            selected: a.selected,
            selectable: a.selectable,
            locked: a.locked,
            grabbable: a.grabbable,
            pannable: a.pannable,
            classes: null
          };
          v.classes = "";
          var d = 0;
          return a.classes.forEach(function(c) {
            return v.classes += d++ === 0 ? c : " " + c;
          }), v;
        }
      }
    }, mt.jsons = function() {
      for (var t = [], e = 0; e < this.length; e++) {
        var r = this[e], a = r.json();
        t.push(a);
      }
      return t;
    }, mt.clone = function() {
      for (var t = this.cy(), e = [], r = 0; r < this.length; r++) {
        var a = this[r], n = a.json(), i = new hn(t, n, !1);
        e.push(i);
      }
      return new Nt(t, e);
    }, mt.copy = mt.clone, mt.restore = function() {
      for (var t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !0, e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0, r = this, a = r.cy(), n = a._private, i = [], s = [], o, u = 0, l = r.length; u < l; u++) {
        var f = r[u];
        e && !f.removed() || (f.isNode() ? i.push(f) : s.push(f));
      }
      o = i.concat(s);
      var h, v = function() {
        o.splice(h, 1), h--;
      };
      for (h = 0; h < o.length; h++) {
        var d = o[h], c = d._private, y = c.data;
        if (d.clearTraversalCache(), !(!e && !c.removed)) {
          if (y.id === void 0)
            y.id = ps();
          else if (R(y.id))
            y.id = "" + y.id;
          else if (Re(y.id) || !ee(y.id)) {
            xt("Can not create element with invalid string ID `" + y.id + "`"), v();
            continue;
          } else if (a.hasElementWithId(y.id)) {
            xt("Can not create second element with ID `" + y.id + "`"), v();
            continue;
          }
        }
        var p = y.id;
        if (d.isNode()) {
          var g = c.position;
          g.x == null && (g.x = 0), g.y == null && (g.y = 0);
        }
        if (d.isEdge()) {
          for (var m = d, b = ["source", "target"], E = b.length, M = !1, L = 0; L < E; L++) {
            var w = b[L], k = y[w];
            R(k) && (k = y[w] = "" + y[w]), k == null || k === "" ? (xt("Can not create edge `" + p + "` with unspecified " + w), M = !0) : a.hasElementWithId(k) || (xt("Can not create edge `" + p + "` with nonexistant " + w + " `" + k + "`"), M = !0);
          }
          if (M) {
            v();
            continue;
          }
          var D = a.getElementById(y.source), F = a.getElementById(y.target);
          D.same(F) ? D._private.edges.push(m) : (D._private.edges.push(m), F._private.edges.push(m)), m._private.source = D, m._private.target = F;
        }
        c.map = new ur(), c.map.set(p, {
          ele: d,
          index: 0
        }), c.removed = !1, e && a.addToPool(d);
      }
      for (var G = 0; G < i.length; G++) {
        var N = i[G], X = N._private.data;
        R(X.parent) && (X.parent = "" + X.parent);
        var B = X.parent, re = B != null;
        if (re || N._private.parent) {
          var K = N._private.parent ? a.collection().merge(N._private.parent) : a.getElementById(B);
          if (K.empty())
            X.parent = void 0;
          else if (K[0].removed())
            vt("Node added with missing parent, reference to parent removed"), X.parent = void 0, N._private.parent = null;
          else {
            for (var W = !1, ae = K; !ae.empty(); ) {
              if (N.same(ae)) {
                W = !0, X.parent = void 0;
                break;
              }
              ae = ae.parent();
            }
            W || (K[0]._private.children.push(N), N._private.parent = K[0], n.hasCompoundNodes = !0);
          }
        }
      }
      if (o.length > 0) {
        for (var ue = o.length === r.length ? r : new Nt(a, o), me = 0; me < ue.length; me++) {
          var ie = ue[me];
          ie.isNode() || (ie.parallelEdges().clearTraversalCache(), ie.source().clearTraversalCache(), ie.target().clearTraversalCache());
        }
        var ge;
        n.hasCompoundNodes ? ge = a.collection().merge(ue).merge(ue.connectedNodes()).merge(ue.parent()) : ge = ue, ge.dirtyCompoundBoundsCache().dirtyBoundingBoxCache().updateStyle(t), t ? ue.emitAndNotify("add") : e && ue.emit("add");
      }
      return r;
    }, mt.removed = function() {
      var t = this[0];
      return t && t._private.removed;
    }, mt.inside = function() {
      var t = this[0];
      return t && !t._private.removed;
    }, mt.remove = function() {
      var t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !0, e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0, r = this, a = [], n = {}, i = r._private.cy;
      function s(B) {
        for (var re = B._private.edges, K = 0; K < re.length; K++)
          u(re[K]);
      }
      function o(B) {
        for (var re = B._private.children, K = 0; K < re.length; K++)
          u(re[K]);
      }
      function u(B) {
        var re = n[B.id()];
        e && B.removed() || re || (n[B.id()] = !0, B.isNode() ? (a.push(B), s(B), o(B)) : a.unshift(B));
      }
      for (var l = 0, f = r.length; l < f; l++) {
        var h = r[l];
        u(h);
      }
      function v(B, re) {
        var K = B._private.edges;
        xr(K, re), B.clearTraversalCache();
      }
      function d(B) {
        B.clearTraversalCache();
      }
      var c = [];
      c.ids = {};
      function y(B, re) {
        re = re[0], B = B[0];
        var K = B._private.children, W = B.id();
        xr(K, re), re._private.parent = null, c.ids[W] || (c.ids[W] = !0, c.push(B));
      }
      r.dirtyCompoundBoundsCache(), e && i.removeFromPool(a);
      for (var p = 0; p < a.length; p++) {
        var g = a[p];
        if (g.isEdge()) {
          var m = g.source()[0], b = g.target()[0];
          v(m, g), v(b, g);
          for (var E = g.parallelEdges(), M = 0; M < E.length; M++) {
            var L = E[M];
            d(L), L.isBundledBezier() && L.dirtyBoundingBoxCache();
          }
        } else {
          var w = g.parent();
          w.length !== 0 && y(w, g);
        }
        e && (g._private.removed = !0);
      }
      var k = i._private.elements;
      i._private.hasCompoundNodes = !1;
      for (var D = 0; D < k.length; D++) {
        var F = k[D];
        if (F.isParent()) {
          i._private.hasCompoundNodes = !0;
          break;
        }
      }
      var G = new Nt(this.cy(), a);
      G.size() > 0 && (t ? G.emitAndNotify("remove") : e && G.emit("remove"));
      for (var N = 0; N < c.length; N++) {
        var X = c[N];
        (!e || !X.removed()) && X.updateStyle();
      }
      return G;
    }, mt.move = function(t) {
      var e = this._private.cy, r = this, a = !1, n = !1, i = function(c) {
        return c == null ? c : "" + c;
      };
      if (t.source !== void 0 || t.target !== void 0) {
        var s = i(t.source), o = i(t.target), u = s != null && e.hasElementWithId(s), l = o != null && e.hasElementWithId(o);
        (u || l) && (e.batch(function() {
          r.remove(a, n), r.emitAndNotify("moveout");
          for (var d = 0; d < r.length; d++) {
            var c = r[d], y = c._private.data;
            c.isEdge() && (u && (y.source = s), l && (y.target = o));
          }
          r.restore(a, n);
        }), r.emitAndNotify("move"));
      } else if (t.parent !== void 0) {
        var f = i(t.parent), h = f === null || e.hasElementWithId(f);
        if (h) {
          var v = f === null ? void 0 : f;
          e.batch(function() {
            var d = r.remove(a, n);
            d.emitAndNotify("moveout");
            for (var c = 0; c < r.length; c++) {
              var y = r[c], p = y._private.data;
              y.isNode() && (p.parent = v);
            }
            d.restore(a, n);
          }), r.emitAndNotify("move");
        }
      }
      return this;
    }, [_s, Gc, Ln, Ar, fa, ed, An, pd, No, Io, wd, Rn, kn, Ot, Ir, Bt].forEach(function(t) {
      He(mt, t);
    });
    var Ad = {
      add: function(e) {
        var r, a = this;
        if (pe(e)) {
          var n = e;
          if (n._private.cy === a)
            r = n.restore();
          else {
            for (var i = [], s = 0; s < n.length; s++) {
              var o = n[s];
              i.push(o.json());
            }
            r = new Nt(a, i);
          }
        } else if (te(e)) {
          var u = e;
          r = new Nt(a, u);
        } else if (S(e) && (te(e.nodes) || te(e.edges))) {
          for (var l = e, f = [], h = ["nodes", "edges"], v = 0, d = h.length; v < d; v++) {
            var c = h[v], y = l[c];
            if (te(y))
              for (var p = 0, g = y.length; p < g; p++) {
                var m = He({
                  group: c
                }, y[p]);
                f.push(m);
              }
          }
          r = new Nt(a, f);
        } else {
          var b = e;
          r = new hn(a, b).collection();
        }
        return r;
      },
      remove: function(e) {
        if (!pe(e)) {
          if (ee(e)) {
            var r = e;
            e = this.$(r);
          }
        }
        return e.remove();
      }
    };
    /*! Bezier curve function generator. Copyright Gaetan Renaudeau. MIT License: http://en.wikipedia.org/wiki/MIT_License */
    function Od(t, e, r, a) {
      var n = 4, i = 1e-3, s = 1e-7, o = 10, u = 11, l = 1 / (u - 1), f = typeof Float32Array < "u";
      if (arguments.length !== 4)
        return !1;
      for (var h = 0; h < 4; ++h)
        if (typeof arguments[h] != "number" || isNaN(arguments[h]) || !isFinite(arguments[h]))
          return !1;
      t = Math.min(t, 1), r = Math.min(r, 1), t = Math.max(t, 0), r = Math.max(r, 0);
      var v = f ? new Float32Array(u) : new Array(u);
      function d(F, G) {
        return 1 - 3 * G + 3 * F;
      }
      function c(F, G) {
        return 3 * G - 6 * F;
      }
      function y(F) {
        return 3 * F;
      }
      function p(F, G, N) {
        return ((d(G, N) * F + c(G, N)) * F + y(G)) * F;
      }
      function g(F, G, N) {
        return 3 * d(G, N) * F * F + 2 * c(G, N) * F + y(G);
      }
      function m(F, G) {
        for (var N = 0; N < n; ++N) {
          var X = g(G, t, r);
          if (X === 0)
            return G;
          var B = p(G, t, r) - F;
          G -= B / X;
        }
        return G;
      }
      function b() {
        for (var F = 0; F < u; ++F)
          v[F] = p(F * l, t, r);
      }
      function E(F, G, N) {
        var X, B, re = 0;
        do
          B = G + (N - G) / 2, X = p(B, t, r) - F, X > 0 ? N = B : G = B;
        while (Math.abs(X) > s && ++re < o);
        return B;
      }
      function M(F) {
        for (var G = 0, N = 1, X = u - 1; N !== X && v[N] <= F; ++N)
          G += l;
        --N;
        var B = (F - v[N]) / (v[N + 1] - v[N]), re = G + B * l, K = g(re, t, r);
        return K >= i ? m(F, re) : K === 0 ? re : E(F, G, G + l);
      }
      var L = !1;
      function w() {
        L = !0, (t !== e || r !== a) && b();
      }
      var k = function(G) {
        return L || w(), t === e && r === a ? G : G === 0 ? 0 : G === 1 ? 1 : p(M(G), e, a);
      };
      k.getControlPoints = function() {
        return [{
          x: t,
          y: e
        }, {
          x: r,
          y: a
        }];
      };
      var D = "generateBezier(" + [t, e, r, a] + ")";
      return k.toString = function() {
        return D;
      }, k;
    }
    /*! Runge-Kutta spring physics function generator. Adapted from Framer.js, copyright Koen Bok. MIT License: http://en.wikipedia.org/wiki/MIT_License */
    var Nd = function() {
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
        }, u = [0], l = 0, f = 1 / 1e4, h = 16 / 1e3, v, d, c;
        for (n = parseFloat(n) || 500, i = parseFloat(i) || 20, s = s || null, o.tension = n, o.friction = i, v = s !== null, v ? (l = a(n, i), d = l / s * h) : d = h; c = r(c || o, d), u.push(1 + c.x), l += 16, Math.abs(c.x) > f && Math.abs(c.v) > f; )
          ;
        return v ? function(y) {
          return u[y * (u.length - 1) | 0];
        } : l;
      };
    }(), bt = function(e, r, a, n) {
      var i = Od(e, r, a, n);
      return function(s, o, u) {
        return s + (o - s) * i(u);
      };
    }, Fn = {
      linear: function(e, r, a) {
        return e + (r - e) * a;
      },
      // default easings
      ease: bt(0.25, 0.1, 0.25, 1),
      "ease-in": bt(0.42, 0, 1, 1),
      "ease-out": bt(0, 0, 0.58, 1),
      "ease-in-out": bt(0.42, 0, 0.58, 1),
      // sine
      "ease-in-sine": bt(0.47, 0, 0.745, 0.715),
      "ease-out-sine": bt(0.39, 0.575, 0.565, 1),
      "ease-in-out-sine": bt(0.445, 0.05, 0.55, 0.95),
      // quad
      "ease-in-quad": bt(0.55, 0.085, 0.68, 0.53),
      "ease-out-quad": bt(0.25, 0.46, 0.45, 0.94),
      "ease-in-out-quad": bt(0.455, 0.03, 0.515, 0.955),
      // cubic
      "ease-in-cubic": bt(0.55, 0.055, 0.675, 0.19),
      "ease-out-cubic": bt(0.215, 0.61, 0.355, 1),
      "ease-in-out-cubic": bt(0.645, 0.045, 0.355, 1),
      // quart
      "ease-in-quart": bt(0.895, 0.03, 0.685, 0.22),
      "ease-out-quart": bt(0.165, 0.84, 0.44, 1),
      "ease-in-out-quart": bt(0.77, 0, 0.175, 1),
      // quint
      "ease-in-quint": bt(0.755, 0.05, 0.855, 0.06),
      "ease-out-quint": bt(0.23, 1, 0.32, 1),
      "ease-in-out-quint": bt(0.86, 0, 0.07, 1),
      // expo
      "ease-in-expo": bt(0.95, 0.05, 0.795, 0.035),
      "ease-out-expo": bt(0.19, 1, 0.22, 1),
      "ease-in-out-expo": bt(1, 0, 0, 1),
      // circ
      "ease-in-circ": bt(0.6, 0.04, 0.98, 0.335),
      "ease-out-circ": bt(0.075, 0.82, 0.165, 1),
      "ease-in-out-circ": bt(0.785, 0.135, 0.15, 0.86),
      // user param easings...
      spring: function(e, r, a) {
        if (a === 0)
          return Fn.linear;
        var n = Nd(e, r, a);
        return function(i, s, o) {
          return i + (s - i) * n(o);
        };
      },
      "cubic-bezier": bt
    };
    function Uo(t, e, r, a, n) {
      if (a === 1 || e === r)
        return r;
      var i = n(e, r, a);
      return t == null || ((t.roundValue || t.color) && (i = Math.round(i)), t.min !== void 0 && (i = Math.max(i, t.min)), t.max !== void 0 && (i = Math.min(i, t.max))), i;
    }
    function $o(t, e) {
      return t.pfValue != null || t.value != null ? t.pfValue != null && (e == null || e.type.units !== "%") ? t.pfValue : t.value : t;
    }
    function ga(t, e, r, a, n) {
      var i = n != null ? n.type : null;
      r < 0 ? r = 0 : r > 1 && (r = 1);
      var s = $o(t, n), o = $o(e, n);
      if (R(s) && R(o))
        return Uo(i, s, o, r, a);
      if (te(s) && te(o)) {
        for (var u = [], l = 0; l < o.length; l++) {
          var f = s[l], h = o[l];
          if (f != null && h != null) {
            var v = Uo(i, f, h, r, a);
            u.push(v);
          } else
            u.push(h);
        }
        return u;
      }
    }
    function Id(t, e, r, a) {
      var n = !a, i = t._private, s = e._private, o = s.easing, u = s.startTime, l = a ? t : t.cy(), f = l.style();
      if (!s.easingImpl)
        if (o == null)
          s.easingImpl = Fn.linear;
        else {
          var h;
          if (ee(o)) {
            var v = f.parse("transition-timing-function", o);
            h = v.value;
          } else
            h = o;
          var d, c;
          ee(h) ? (d = h, c = []) : (d = h[1], c = h.slice(2).map(function(ue) {
            return +ue;
          })), c.length > 0 ? (d === "spring" && c.push(s.duration), s.easingImpl = Fn[d].apply(null, c)) : s.easingImpl = Fn[d];
        }
      var y = s.easingImpl, p;
      if (s.duration === 0 ? p = 1 : p = (r - u) / s.duration, s.applying && (p = s.progress), p < 0 ? p = 0 : p > 1 && (p = 1), s.delay == null) {
        var g = s.startPosition, m = s.position;
        if (m && n && !t.locked()) {
          var b = {};
          Xa(g.x, m.x) && (b.x = ga(g.x, m.x, p, y)), Xa(g.y, m.y) && (b.y = ga(g.y, m.y, p, y)), t.position(b);
        }
        var E = s.startPan, M = s.pan, L = i.pan, w = M != null && a;
        w && (Xa(E.x, M.x) && (L.x = ga(E.x, M.x, p, y)), Xa(E.y, M.y) && (L.y = ga(E.y, M.y, p, y)), t.emit("pan"));
        var k = s.startZoom, D = s.zoom, F = D != null && a;
        F && (Xa(k, D) && (i.zoom = ka(i.minZoom, ga(k, D, p, y), i.maxZoom)), t.emit("zoom")), (w || F) && t.emit("viewport");
        var G = s.style;
        if (G && G.length > 0 && n) {
          for (var N = 0; N < G.length; N++) {
            var X = G[N], B = X.name, re = X, K = s.startStyle[B], W = f.properties[K.name], ae = ga(K, re, p, y, W);
            f.overrideBypass(t, B, ae);
          }
          t.emit("style");
        }
      }
      return s.progress = p, p;
    }
    function Xa(t, e) {
      return t == null || e == null ? !1 : R(t) && R(e) ? !0 : !!(t && e);
    }
    function Md(t, e, r, a) {
      var n = e._private;
      n.started = !0, n.startTime = r - n.progress * n.duration;
    }
    function _o(t, e) {
      var r = e._private.aniEles, a = [];
      function n(f, h) {
        var v = f._private, d = v.animation.current, c = v.animation.queue, y = !1;
        if (d.length === 0) {
          var p = c.shift();
          p && d.push(p);
        }
        for (var g = function(L) {
          for (var w = L.length - 1; w >= 0; w--) {
            var k = L[w];
            k();
          }
          L.splice(0, L.length);
        }, m = d.length - 1; m >= 0; m--) {
          var b = d[m], E = b._private;
          if (E.stopped) {
            d.splice(m, 1), E.hooked = !1, E.playing = !1, E.started = !1, g(E.frames);
            continue;
          }
          !E.playing && !E.applying || (E.playing && E.applying && (E.applying = !1), E.started || Md(f, b, t), Id(f, b, t, h), E.applying && (E.applying = !1), g(E.frames), E.step != null && E.step(t), b.completed() && (d.splice(m, 1), E.hooked = !1, E.playing = !1, E.started = !1, g(E.completes)), y = !0);
        }
        return !h && d.length === 0 && c.length === 0 && a.push(f), y;
      }
      for (var i = !1, s = 0; s < r.length; s++) {
        var o = r[s], u = n(o);
        i = i || u;
      }
      var l = n(e, !0);
      (i || l) && (r.length > 0 ? e.notify("draw", r) : e.notify("draw")), r.unmerge(a), e.emit("step");
    }
    var Rd = {
      // pull in animation functions
      animate: ct.animate(),
      animation: ct.animation(),
      animated: ct.animated(),
      clearQueue: ct.clearQueue(),
      delay: ct.delay(),
      delayAnimation: ct.delayAnimation(),
      stop: ct.stop(),
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
          e._private.animationsRunning && ln(function(i) {
            _o(i, e), r();
          });
        }
        var a = e.renderer();
        a && a.beforeRender ? a.beforeRender(function(i, s) {
          _o(s, e);
        }, a.beforeRenderPriorities.animations) : r();
      }
    }, kd = {
      qualifierCompare: function(e, r) {
        return e == null || r == null ? e == null && r == null : e.sameText(r);
      },
      eventMatches: function(e, r, a) {
        var n = r.qualifier;
        return n != null ? e !== a.target && Ae(a.target) && n.matches(a.target) : !0;
      },
      addEventFields: function(e, r) {
        r.cy = e, r.target = e;
      },
      callbackContext: function(e, r, a) {
        return r.qualifier != null ? a.target : e;
      }
    }, Gn = function(e) {
      return ee(e) ? new Sr(e) : e;
    }, Yo = {
      createEmitter: function() {
        var e = this._private;
        return e.emitter || (e.emitter = new In(kd, this)), this;
      },
      emitter: function() {
        return this._private.emitter;
      },
      on: function(e, r, a) {
        return this.emitter().on(e, Gn(r), a), this;
      },
      removeListener: function(e, r, a) {
        return this.emitter().removeListener(e, Gn(r), a), this;
      },
      removeAllListeners: function() {
        return this.emitter().removeAllListeners(), this;
      },
      one: function(e, r, a) {
        return this.emitter().one(e, Gn(r), a), this;
      },
      once: function(e, r, a) {
        return this.emitter().one(e, Gn(r), a), this;
      },
      emit: function(e, r) {
        return this.emitter().emit(e, r), this;
      },
      emitAndNotify: function(e, r) {
        return this.emit(e), this.notify(e, r), this;
      }
    };
    ct.eventAliasesOn(Yo);
    var Ii = {
      png: function(e) {
        var r = this._private.renderer;
        return e = e || {}, r.png(e);
      },
      jpg: function(e) {
        var r = this._private.renderer;
        return e = e || {}, e.bg = e.bg || "#fff", r.jpg(e);
      }
    };
    Ii.jpeg = Ii.jpg;
    var zn = {
      layout: function(e) {
        var r = this;
        if (e == null) {
          xt("Layout options must be specified to make a layout");
          return;
        }
        if (e.name == null) {
          xt("A `name` must be specified to make a layout");
          return;
        }
        var a = e.name, n = r.extension("layout", a);
        if (n == null) {
          xt("No such layout `" + a + "` found.  Did you forget to import it and `cytoscape.use()` it?");
          return;
        }
        var i;
        ee(e.eles) ? i = r.$(e.eles) : i = e.eles != null ? e.eles : r.$();
        var s = new n(He({}, e, {
          cy: r,
          eles: i
        }));
        return s;
      }
    };
    zn.createLayout = zn.makeLayout = zn.layout;
    var Pd = {
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
    }, Bd = At({
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
    }), Mi = {
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
          xt("Can not initialise: No such renderer `".concat(e.name, "` found. Did you forget to import it and `cytoscape.use()` it?"));
          return;
        }
        e.wheelSensitivity !== void 0 && vt("You have set a custom wheel sensitivity.  This will make your app zoom unnaturally when using mainstream mice.  You should change this value from the default only if you can guarantee that all your users will use the same hardware and OS configuration as your current machine.");
        var n = Bd(e);
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
    Mi.invalidateDimensions = Mi.resize;
    var Vn = {
      // get a collection
      // - empty collection on no args
      // - collection of elements in the graph on selector arg
      // - guarantee a returned collection when elements or collection specified
      collection: function(e, r) {
        return ee(e) ? this.$(e) : pe(e) ? e.collection() : te(e) ? (r || (r = {}), new Nt(this, e, r.unique, r.removed)) : new Nt(this);
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
    Vn.elements = Vn.filter = Vn.$;
    var Ft = {}, Wa = "t", Fd = "f";
    Ft.apply = function(t) {
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
    }, Ft.getPropertiesDiff = function(t, e) {
      var r = this, a = r._private.propDiffs = r._private.propDiffs || {}, n = t + "-" + e, i = a[n];
      if (i)
        return i;
      for (var s = [], o = {}, u = 0; u < r.length; u++) {
        var l = r[u], f = t[u] === Wa, h = e[u] === Wa, v = f !== h, d = l.mappedProperties.length > 0;
        if (v || h && d) {
          var c = void 0;
          v && d || v ? c = l.properties : d && (c = l.mappedProperties);
          for (var y = 0; y < c.length; y++) {
            for (var p = c[y], g = p.name, m = !1, b = u + 1; b < r.length; b++) {
              var E = r[b], M = e[b] === Wa;
              if (M && (m = E.properties[p.name] != null, m))
                break;
            }
            !o[g] && !m && (o[g] = !0, s.push(g));
          }
        }
      }
      return a[n] = s, s;
    }, Ft.getContextMeta = function(t) {
      for (var e = this, r = "", a, n = t._private.styleCxtKey || "", i = 0; i < e.length; i++) {
        var s = e[i], o = s.selector && s.selector.matches(t);
        o ? r += Wa : r += Fd;
      }
      return a = e.getPropertiesDiff(n, r), t._private.styleCxtKey = r, {
        key: r,
        diffPropNames: a,
        empty: a.length === 0
      };
    }, Ft.getContextStyle = function(t) {
      var e = t.key, r = this, a = this._private.contextStyles = this._private.contextStyles || {};
      if (a[e])
        return a[e];
      for (var n = {
        _private: {
          key: e
        }
      }, i = 0; i < r.length; i++) {
        var s = r[i], o = e[i] === Wa;
        if (o)
          for (var u = 0; u < s.properties.length; u++) {
            var l = s.properties[u];
            n[l.name] = l;
          }
      }
      return a[e] = n, n;
    }, Ft.applyContextStyle = function(t, e, r) {
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
            var h = f.mapping, v = h.fnValue = l.value(r);
            if (v === h.prevFnValue)
              continue;
          }
          var d = i[u] = {
            prev: f
          };
          a.applyParsedProperty(r, l), d.next = r.pstyle(u), d.next && d.next.bypass && (d.next = d.next.bypassed);
        }
      }
      return {
        diffProps: i
      };
    }, Ft.updateStyleHints = function(t) {
      var e = t._private, r = this, a = r.propertyGroupNames, n = r.propertyGroupKeys, i = function(Oe, Fe, Xe) {
        return r.getPropertiesHash(Oe, Fe, Xe);
      }, s = e.styleKey;
      if (t.removed())
        return !1;
      var o = e.group === "nodes", u = t._private.style;
      a = Object.keys(u);
      for (var l = 0; l < n.length; l++) {
        var f = n[l];
        e.styleKeys[f] = [Qr, Oa];
      }
      for (var h = function(Oe, Fe) {
        return e.styleKeys[Fe][0] = Na(Oe, e.styleKeys[Fe][0]);
      }, v = function(Oe, Fe) {
        return e.styleKeys[Fe][1] = Ia(Oe, e.styleKeys[Fe][1]);
      }, d = function(Oe, Fe) {
        h(Oe, Fe), v(Oe, Fe);
      }, c = function(Oe, Fe) {
        for (var Xe = 0; Xe < Oe.length; Xe++) {
          var Ie = Oe.charCodeAt(Xe);
          h(Ie, Fe), v(Ie, Fe);
        }
      }, y = 2e9, p = function(Oe) {
        return -128 < Oe && Oe < 128 && Math.floor(Oe) !== Oe ? y - (Oe * 1024 | 0) : Oe;
      }, g = 0; g < a.length; g++) {
        var m = a[g], b = u[m];
        if (b != null) {
          var E = this.properties[m], M = E.type, L = E.groupKey, w = void 0;
          E.hashOverride != null ? w = E.hashOverride(t, b) : b.pfValue != null && (w = b.pfValue);
          var k = E.enums == null ? b.value : null, D = w != null, F = k != null, G = D || F, N = b.units;
          if (M.number && G && !M.multiple) {
            var X = D ? w : k;
            d(p(X), L), !D && N != null && c(N, L);
          } else
            c(b.strValue, L);
        }
      }
      for (var B = [Qr, Oa], re = 0; re < n.length; re++) {
        var K = n[re], W = e.styleKeys[K];
        B[0] = Na(W[0], B[0]), B[1] = Ia(W[1], B[1]);
      }
      e.styleKey = Uu(B[0], B[1]);
      var ae = e.styleKeys;
      e.labelDimsKey = wr(ae.labelDimensions);
      var ue = i(t, ["label"], ae.labelDimensions);
      if (e.labelKey = wr(ue), e.labelStyleKey = wr(un(ae.commonLabel, ue)), !o) {
        var me = i(t, ["source-label"], ae.labelDimensions);
        e.sourceLabelKey = wr(me), e.sourceLabelStyleKey = wr(un(ae.commonLabel, me));
        var ie = i(t, ["target-label"], ae.labelDimensions);
        e.targetLabelKey = wr(ie), e.targetLabelStyleKey = wr(un(ae.commonLabel, ie));
      }
      if (o) {
        var ge = e.styleKeys, Ee = ge.nodeBody, Ce = ge.nodeBorder, we = ge.nodeOutline, De = ge.backgroundImage, se = ge.compound, xe = ge.pie, Le = [Ee, Ce, we, De, se, xe].filter(function(Se) {
          return Se != null;
        }).reduce(un, [Qr, Oa]);
        e.nodeKey = wr(Le), e.hasPie = xe != null && xe[0] !== Qr && xe[1] !== Oa;
      }
      return s !== e.styleKey;
    }, Ft.clearStyleHints = function(t) {
      var e = t._private;
      e.styleCxtKey = "", e.styleKeys = {}, e.styleKey = null, e.labelKey = null, e.labelStyleKey = null, e.sourceLabelKey = null, e.sourceLabelStyleKey = null, e.targetLabelKey = null, e.targetLabelStyleKey = null, e.nodeKey = null, e.hasPie = null;
    }, Ft.applyParsedProperty = function(t, e) {
      var r = this, a = e, n = t._private.style, i, s = r.types, o = r.properties[a.name].type, u = a.bypass, l = n[a.name], f = l && l.bypass, h = t._private, v = "mapping", d = function(Ee) {
        return Ee == null ? null : Ee.pfValue != null ? Ee.pfValue : Ee.value;
      }, c = function() {
        var Ee = d(l), Ce = d(a);
        r.checkTriggers(t, a.name, Ee, Ce);
      };
      if (e.name === "curve-style" && t.isEdge() && // loops must be bundled beziers
      (e.value !== "bezier" && t.isLoop() || // edges connected to compound nodes can not be haystacks
      e.value === "haystack" && (t.source().isParent() || t.target().isParent())) && (a = e = this.parse(e.name, "bezier", u)), a.delete)
        return n[a.name] = void 0, c(), !0;
      if (a.deleteBypassed)
        return l ? l.bypass ? (l.bypassed = void 0, c(), !0) : !1 : (c(), !0);
      if (a.deleteBypass)
        return l ? l.bypass ? (n[a.name] = l.bypassed, c(), !0) : !1 : (c(), !0);
      var y = function() {
        vt("Do not assign mappings to elements without corresponding data (i.e. ele `" + t.id() + "` has no mapping for property `" + a.name + "` with data field `" + a.field + "`); try a `[" + a.field + "]` selector to limit scope to elements with `" + a.field + "` defined");
      };
      switch (a.mapped) {
        case s.mapData: {
          for (var p = a.field.split("."), g = h.data, m = 0; m < p.length && g; m++) {
            var b = p[m];
            g = g[b];
          }
          if (g == null)
            return y(), !1;
          var E;
          if (R(g)) {
            var M = a.fieldMax - a.fieldMin;
            M === 0 ? E = 0 : E = (g - a.fieldMin) / M;
          } else
            return vt("Do not use continuous mappers without specifying numeric data (i.e. `" + a.field + ": " + g + "` for `" + t.id() + "` is non-numeric)"), !1;
          if (E < 0 ? E = 0 : E > 1 && (E = 1), o.color) {
            var L = a.valueMin[0], w = a.valueMax[0], k = a.valueMin[1], D = a.valueMax[1], F = a.valueMin[2], G = a.valueMax[2], N = a.valueMin[3] == null ? 1 : a.valueMin[3], X = a.valueMax[3] == null ? 1 : a.valueMax[3], B = [Math.round(L + (w - L) * E), Math.round(k + (D - k) * E), Math.round(F + (G - F) * E), Math.round(N + (X - N) * E)];
            i = {
              // colours are simple, so just create the flat property instead of expensive string parsing
              bypass: a.bypass,
              // we're a bypass if the mapping property is a bypass
              name: a.name,
              value: B,
              strValue: "rgb(" + B[0] + ", " + B[1] + ", " + B[2] + ")"
            };
          } else if (o.number) {
            var re = a.valueMin + (a.valueMax - a.valueMin) * E;
            i = this.parse(a.name, re, a.bypass, v);
          } else
            return !1;
          if (!i)
            return y(), !1;
          i.mapping = a, a = i;
          break;
        }
        case s.data: {
          for (var K = a.field.split("."), W = h.data, ae = 0; ae < K.length && W; ae++) {
            var ue = K[ae];
            W = W[ue];
          }
          if (W != null && (i = this.parse(a.name, W, a.bypass, v)), !i)
            return y(), !1;
          i.mapping = a, a = i;
          break;
        }
        case s.fn: {
          var me = a.value, ie = a.fnValue != null ? a.fnValue : me(t);
          if (a.prevFnValue = ie, ie == null)
            return vt("Custom function mappers may not return null (i.e. `" + a.name + "` for ele `" + t.id() + "` is null)"), !1;
          if (i = this.parse(a.name, ie, a.bypass, v), !i)
            return vt("Custom function mappers may not return invalid values for the property type (i.e. `" + a.name + "` for ele `" + t.id() + "` is invalid)"), !1;
          i.mapping = lr(a), a = i;
          break;
        }
        case void 0:
          break;
        default:
          return !1;
      }
      return u ? (f ? a.bypassed = l.bypassed : a.bypassed = l, n[a.name] = a) : f ? l.bypassed = a : n[a.name] = a, c(), !0;
    }, Ft.cleanElements = function(t, e) {
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
    }, Ft.update = function() {
      var t = this._private.cy, e = t.mutableElements();
      e.updateStyle();
    }, Ft.updateTransitions = function(t, e) {
      var r = this, a = t._private, n = t.pstyle("transition-property").value, i = t.pstyle("transition-duration").pfValue, s = t.pstyle("transition-delay").pfValue;
      if (n.length > 0 && i > 0) {
        for (var o = {}, u = !1, l = 0; l < n.length; l++) {
          var f = n[l], h = t.pstyle(f), v = e[f];
          if (v) {
            var d = v.prev, c = d, y = v.next != null ? v.next : h, p = !1, g = void 0, m = 1e-6;
            c && (R(c.pfValue) && R(y.pfValue) ? (p = y.pfValue - c.pfValue, g = c.pfValue + m * p) : R(c.value) && R(y.value) ? (p = y.value - c.value, g = c.value + m * p) : te(c.value) && te(y.value) && (p = c.value[0] !== y.value[0] || c.value[1] !== y.value[1] || c.value[2] !== y.value[2], g = c.strValue), p && (o[f] = y.strValue, this.applyBypass(t, f, g), u = !0));
          }
        }
        if (!u)
          return;
        a.transitioning = !0, new ia(function(b) {
          s > 0 ? t.delayAnimation(s).play().promise().then(b) : b();
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
    }, Ft.checkTrigger = function(t, e, r, a, n, i) {
      var s = this.properties[e], o = n(s);
      o != null && o(r, a) && i(s);
    }, Ft.checkZOrderTrigger = function(t, e, r, a) {
      var n = this;
      this.checkTrigger(t, e, r, a, function(i) {
        return i.triggersZOrder;
      }, function() {
        n._private.cy.notify("zorder", t);
      });
    }, Ft.checkBoundsTrigger = function(t, e, r, a) {
      this.checkTrigger(t, e, r, a, function(n) {
        return n.triggersBounds;
      }, function(n) {
        t.dirtyCompoundBoundsCache(), t.dirtyBoundingBoxCache(), // only for beziers -- so performance of other edges isn't affected
        n.triggersBoundsOfParallelBeziers && e === "curve-style" && (r === "bezier" || a === "bezier") && t.parallelEdges().forEach(function(i) {
          i.isBundledBezier() && i.dirtyBoundingBoxCache();
        }), n.triggersBoundsOfConnectedEdges && e === "display" && (r === "none" || a === "none") && t.connectedEdges().forEach(function(i) {
          i.dirtyBoundingBoxCache();
        });
      });
    }, Ft.checkTriggers = function(t, e, r, a) {
      t.dirtyStyleCache(), this.checkZOrderTrigger(t, e, r, a), this.checkBoundsTrigger(t, e, r, a);
    };
    var qa = {};
    qa.applyBypass = function(t, e, r, a) {
      var n = this, i = [], s = !0;
      if (e === "*" || e === "**") {
        if (r !== void 0)
          for (var o = 0; o < n.properties.length; o++) {
            var u = n.properties[o], l = u.name, f = this.parse(l, r, !0);
            f && i.push(f);
          }
      } else if (ee(e)) {
        var h = this.parse(e, r, !0);
        h && i.push(h);
      } else if (S(e)) {
        var v = e;
        a = r;
        for (var d = Object.keys(v), c = 0; c < d.length; c++) {
          var y = d[c], p = v[y];
          if (p === void 0 && (p = v[yt(y)]), p !== void 0) {
            var g = this.parse(y, p, !0);
            g && i.push(g);
          }
        }
      } else
        return !1;
      if (i.length === 0)
        return !1;
      for (var m = !1, b = 0; b < t.length; b++) {
        for (var E = t[b], M = {}, L = void 0, w = 0; w < i.length; w++) {
          var k = i[w];
          if (a) {
            var D = E.pstyle(k.name);
            L = M[k.name] = {
              prev: D
            };
          }
          m = this.applyParsedProperty(E, lr(k)) || m, a && (L.next = E.pstyle(k.name));
        }
        m && this.updateStyleHints(E), a && this.updateTransitions(E, M, s);
      }
      return m;
    }, qa.overrideBypass = function(t, e, r) {
      e = tt(e);
      for (var a = 0; a < t.length; a++) {
        var n = t[a], i = n._private.style[e], s = this.properties[e].type, o = s.color, u = s.mutiple, l = i ? i.pfValue != null ? i.pfValue : i.value : null;
        !i || !i.bypass ? this.applyBypass(n, e, r) : (i.value = r, i.pfValue != null && (i.pfValue = r), o ? i.strValue = "rgb(" + r.join(",") + ")" : u ? i.strValue = r.join(" ") : i.strValue = "" + r, this.updateStyleHints(n)), this.checkTriggers(n, e, l, r);
      }
    }, qa.removeAllBypasses = function(t, e) {
      return this.removeBypasses(t, this.propertyNames, e);
    }, qa.removeBypasses = function(t, e, r) {
      for (var a = !0, n = 0; n < t.length; n++) {
        for (var i = t[n], s = {}, o = 0; o < e.length; o++) {
          var u = e[o], l = this.properties[u], f = i.pstyle(l.name);
          if (!(!f || !f.bypass)) {
            var h = "", v = this.parse(u, h, !0), d = s[l.name] = {
              prev: f
            };
            this.applyParsedProperty(i, v), d.next = i.pstyle(l.name);
          }
        }
        this.updateStyleHints(i), r && this.updateTransitions(i, s, a);
      }
    };
    var Ri = {};
    Ri.getEmSizeInPixels = function() {
      var t = this.containerCss("font-size");
      return t != null ? parseFloat(t) : 1;
    }, Ri.containerCss = function(t) {
      var e = this._private.cy, r = e.container(), a = e.window();
      if (a && r && a.getComputedStyle)
        return a.getComputedStyle(r).getPropertyValue(t);
    };
    var fr = {};
    fr.getRenderedStyle = function(t, e) {
      return e ? this.getStylePropertyValue(t, e, !0) : this.getRawStyle(t, !0);
    }, fr.getRawStyle = function(t, e) {
      var r = this;
      if (t = t[0], t) {
        for (var a = {}, n = 0; n < r.properties.length; n++) {
          var i = r.properties[n], s = r.getStylePropertyValue(t, i.name, e);
          s != null && (a[i.name] = s, a[yt(i.name)] = s);
        }
        return a;
      }
    }, fr.getIndexedStyle = function(t, e, r, a) {
      var n = t.pstyle(e)[r][a];
      return n ?? t.cy().style().getDefaultProperty(e)[r][0];
    }, fr.getStylePropertyValue = function(t, e, r) {
      var a = this;
      if (t = t[0], t) {
        var n = a.properties[e];
        n.alias && (n = n.pointsTo);
        var i = n.type, s = t.pstyle(n.name);
        if (s) {
          var o = s.value, u = s.units, l = s.strValue;
          if (r && i.number && o != null && R(o)) {
            var f = t.cy().zoom(), h = function(p) {
              return p * f;
            }, v = function(p, g) {
              return h(p) + g;
            }, d = te(o), c = d ? u.every(function(y) {
              return y != null;
            }) : u != null;
            return c ? d ? o.map(function(y, p) {
              return v(y, u[p]);
            }).join(" ") : v(o, u) : d ? o.map(function(y) {
              return ee(y) ? y : "" + h(y);
            }).join(" ") : "" + h(o);
          } else if (l != null)
            return l;
        }
        return null;
      }
    }, fr.getAnimationStartStyle = function(t, e) {
      for (var r = {}, a = 0; a < e.length; a++) {
        var n = e[a], i = n.name, s = t.pstyle(i);
        s !== void 0 && (S(s) ? s = this.parse(i, s.strValue) : s = this.parse(i, s)), s && (r[i] = s);
      }
      return r;
    }, fr.getPropsList = function(t) {
      var e = this, r = [], a = t, n = e.properties;
      if (a)
        for (var i = Object.keys(a), s = 0; s < i.length; s++) {
          var o = i[s], u = a[o], l = n[o] || n[tt(o)], f = this.parse(l.name, u);
          f && r.push(f);
        }
      return r;
    }, fr.getNonDefaultPropertiesHash = function(t, e, r) {
      var a = r.slice(), n, i, s, o, u, l;
      for (u = 0; u < e.length; u++)
        if (n = e[u], i = t.pstyle(n, !1), i != null)
          if (i.pfValue != null)
            a[0] = Na(o, a[0]), a[1] = Ia(o, a[1]);
          else
            for (s = i.strValue, l = 0; l < s.length; l++)
              o = s.charCodeAt(l), a[0] = Na(o, a[0]), a[1] = Ia(o, a[1]);
      return a;
    }, fr.getPropertiesHash = fr.getNonDefaultPropertiesHash;
    var Un = {};
    Un.appendFromJson = function(t) {
      for (var e = this, r = 0; r < t.length; r++) {
        var a = t[r], n = a.selector, i = a.style || a.css, s = Object.keys(i);
        e.selector(n);
        for (var o = 0; o < s.length; o++) {
          var u = s[o], l = i[u];
          e.css(u, l);
        }
      }
      return e;
    }, Un.fromJson = function(t) {
      var e = this;
      return e.resetToDefault(), e.appendFromJson(t), e;
    }, Un.json = function() {
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
    var ki = {};
    ki.appendFromString = function(t) {
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
          vt("Halting stylesheet parsing: String stylesheet contains more to parse but no selector and block found in: " + a);
          break;
        }
        n = f[0];
        var h = f[1];
        if (h !== "core") {
          var v = new Sr(h);
          if (v.invalid) {
            vt("Skipping parsing of block: Invalid selector found in string stylesheet: " + h), o();
            continue;
          }
        }
        var d = f[2], c = !1;
        i = d;
        for (var y = []; ; ) {
          var p = i.match(/^\s*$/);
          if (p)
            break;
          var g = i.match(/^\s*(.+?)\s*:\s*(.+?)(?:\s*;|\s*$)/);
          if (!g) {
            vt("Skipping parsing of block: Invalid formatting of style property and value definitions found in:" + d), c = !0;
            break;
          }
          s = g[0];
          var m = g[1], b = g[2], E = e.properties[m];
          if (!E) {
            vt("Skipping property: Invalid property name in: " + s), u();
            continue;
          }
          var M = r.parse(m, b);
          if (!M) {
            vt("Skipping property: Invalid property definition in: " + s), u();
            continue;
          }
          y.push({
            name: m,
            val: b
          }), u();
        }
        if (c) {
          o();
          break;
        }
        r.selector(h);
        for (var L = 0; L < y.length; L++) {
          var w = y[L];
          r.css(w.name, w.val);
        }
        o();
      }
      return r;
    }, ki.fromString = function(t) {
      var e = this;
      return e.resetToDefault(), e.appendFromString(t), e;
    };
    var It = {};
    (function() {
      var t = gt, e = qt, r = Kr, a = Da, n = jt, i = function(Le) {
        return "^" + Le + "\\s*\\(\\s*([\\w\\.]+)\\s*\\)$";
      }, s = function(Le) {
        var Se = t + "|\\w+|" + e + "|" + r + "|" + a + "|" + n;
        return "^" + Le + "\\s*\\(([\\w\\.]+)\\s*\\,\\s*(" + t + ")\\s*\\,\\s*(" + t + ")\\s*,\\s*(" + Se + ")\\s*\\,\\s*(" + Se + ")\\)$";
      }, o = [`^url\\s*\\(\\s*['"]?(.+?)['"]?\\s*\\)$`, "^(none)$", "^(.+)$"];
      It.types = {
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
        nonNegativeNumber: {
          number: !0,
          min: 0,
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
          enums: ["anonymous", "use-credentials", "null"],
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
          enums: ["rectangle", "roundrectangle", "round-rectangle", "cutrectangle", "cut-rectangle", "bottomroundrectangle", "bottom-round-rectangle", "barrel", "ellipse", "triangle", "round-triangle", "square", "pentagon", "round-pentagon", "hexagon", "round-hexagon", "concavehexagon", "concave-hexagon", "heptagon", "round-heptagon", "octagon", "round-octagon", "tag", "round-tag", "star", "diamond", "round-diamond", "vee", "rhomboid", "right-rhomboid", "polygon"]
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
        arrowWidth: {
          number: !0,
          units: "%|px|em",
          implicitUnits: "px",
          enums: ["match-line"]
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
          enums: ["intersection", "node-position", "endpoints"]
        },
        edgeEndpoint: {
          number: !0,
          multiple: !0,
          units: "%|px|em|deg|rad",
          implicitUnits: "px",
          enums: ["inside-to-node", "outside-to-node", "outside-to-node-or-label", "outside-to-line", "outside-to-line-or-label"],
          singleEnum: !0,
          validate: function(Le, Se) {
            switch (Le.length) {
              case 2:
                return Se[0] !== "deg" && Se[0] !== "rad" && Se[1] !== "deg" && Se[1] !== "rad";
              case 1:
                return ee(Le[0]) || Se[0] === "deg" || Se[0] === "rad";
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
          validate: function(Le) {
            var Se = Le.length;
            return Se === 1 || Se === 2 || Se === 4;
          }
        }
      };
      var u = {
        zeroNonZero: function(Le, Se) {
          return (Le == null || Se == null) && Le !== Se || Le == 0 && Se != 0 ? !0 : Le != 0 && Se == 0;
        },
        any: function(Le, Se) {
          return Le != Se;
        },
        emptyNonEmpty: function(Le, Se) {
          var Oe = Re(Le), Fe = Re(Se);
          return Oe && !Fe || !Oe && Fe;
        }
      }, l = It.types, f = [{
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
      }], v = [{
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
      }], d = [{
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
      }], c = [{
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
      }], y = [{
        name: "events",
        type: l.bool,
        triggersZOrder: u.any
      }, {
        name: "text-events",
        type: l.bool,
        triggersZOrder: u.any
      }], p = [{
        name: "display",
        type: l.display,
        triggersZOrder: u.any,
        triggersBounds: u.any,
        triggersBoundsOfConnectedEdges: !0
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
        type: l.number,
        triggersZOrder: u.any
      }], g = [{
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
      }], m = [{
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
      }], b = [{
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
      }], E = function(Le, Se) {
        return Se.value === "label" ? -Le.poolIndex() : Se.pfValue;
      }, M = [{
        name: "height",
        type: l.nodeSize,
        triggersBounds: u.any,
        hashOverride: E
      }, {
        name: "width",
        type: l.nodeSize,
        triggersBounds: u.any,
        hashOverride: E
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
      }], L = [{
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
      }], w = [{
        name: "outline-color",
        type: l.color
      }, {
        name: "outline-opacity",
        type: l.zeroOneNumber
      }, {
        name: "outline-width",
        type: l.size,
        triggersBounds: u.any
      }, {
        name: "outline-style",
        type: l.borderStyle
      }, {
        name: "outline-offset",
        type: l.size,
        triggersBounds: u.any
      }], k = [{
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
      }], D = [{
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
      }], F = [{
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
      }], G = [{
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
      }], N = [{
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
      }], X = [];
      It.pieBackgroundN = 16, X.push({
        name: "pie-size",
        type: l.sizeMaybePercent
      });
      for (var B = 1; B <= It.pieBackgroundN; B++)
        X.push({
          name: "pie-" + B + "-background-color",
          type: l.color
        }), X.push({
          name: "pie-" + B + "-background-size",
          type: l.percent
        }), X.push({
          name: "pie-" + B + "-background-opacity",
          type: l.zeroOneNumber
        });
      var re = [], K = It.arrowPrefixes = ["source", "mid-source", "target", "mid-target"];
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
      }, {
        name: "arrow-width",
        type: l.arrowWidth
      }].forEach(function(xe) {
        K.forEach(function(Le) {
          var Se = Le + "-" + xe.name, Oe = xe.type, Fe = xe.triggersBounds;
          re.push({
            name: Se,
            type: Oe,
            triggersBounds: Fe
          });
        });
      }, {});
      var W = It.properties = [].concat(y, b, p, g, m, G, c, d, f, h, v, M, L, w, k, X, D, F, re, N), ae = It.propertyGroups = {
        // common to all eles
        behavior: y,
        transition: b,
        visibility: p,
        overlay: g,
        underlay: m,
        ghost: G,
        // labels
        commonLabel: c,
        labelDimensions: d,
        mainLabel: f,
        sourceLabel: h,
        targetLabel: v,
        // node props
        nodeBody: M,
        nodeBorder: L,
        nodeOutline: w,
        backgroundImage: k,
        pie: X,
        compound: D,
        // edge props
        edgeLine: F,
        edgeArrow: re,
        core: N
      }, ue = It.propertyGroupNames = {}, me = It.propertyGroupKeys = Object.keys(ae);
      me.forEach(function(xe) {
        ue[xe] = ae[xe].map(function(Le) {
          return Le.name;
        }), ae[xe].forEach(function(Le) {
          return Le.groupKey = xe;
        });
      });
      var ie = It.aliases = [{
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
      It.propertyNames = W.map(function(xe) {
        return xe.name;
      });
      for (var ge = 0; ge < W.length; ge++) {
        var Ee = W[ge];
        W[Ee.name] = Ee;
      }
      for (var Ce = 0; Ce < ie.length; Ce++) {
        var we = ie[Ce], De = W[we.pointsTo], se = {
          name: we.name,
          alias: !0,
          pointsTo: De
        };
        W.push(se), W[we.name] = se;
      }
    })(), It.getDefaultProperty = function(t) {
      return this.getDefaultProperties()[t];
    }, It.getDefaultProperties = function() {
      var t = this._private;
      if (t.defaultProperties != null)
        return t.defaultProperties;
      for (var e = He({
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
        "outline-color": "#999",
        "outline-opacity": 1,
        "outline-width": 0,
        "outline-offset": 0,
        "outline-style": "solid",
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
        for (var f = 1; f <= It.pieBackgroundN; f++) {
          var h = l.name.replace("{{i}}", f), v = l.value;
          u[h] = v;
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
      }, {
        name: "arrow-width",
        value: 1
      }].reduce(function(u, l) {
        return It.arrowPrefixes.forEach(function(f) {
          var h = f + "-" + l.name, v = l.value;
          u[h] = v;
        }), u;
      }, {})), r = {}, a = 0; a < this.properties.length; a++) {
        var n = this.properties[a];
        if (!n.pointsTo) {
          var i = n.name, s = e[i], o = this.parse(i, s);
          r[i] = o;
        }
      }
      return t.defaultProperties = r, t.defaultProperties;
    }, It.addDefaultStylesheet = function() {
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
    var $n = {};
    $n.parse = function(t, e, r, a) {
      var n = this;
      if (H(e))
        return n.parseImplWarn(t, e, r, a);
      var i = a === "mapping" || a === !0 || a === !1 || a == null ? "dontcare" : a, s = r ? "t" : "f", o = "" + e, u = hs(t, o, s, i), l = n.propCache = n.propCache || [], f;
      return (f = l[u]) || (f = l[u] = n.parseImplWarn(t, e, r, a)), (r || a === "mapping") && (f = lr(f), f && (f.value = lr(f.value))), f;
    }, $n.parseImplWarn = function(t, e, r, a) {
      var n = this.parseImpl(t, e, r, a);
      return !n && e != null && vt("The style property `".concat(t, ": ").concat(e, "` is invalid")), n && (n.name === "width" || n.name === "height") && e === "label" && vt("The style value of `label` is deprecated for `" + n.name + "`"), n;
    }, $n.parseImpl = function(t, e, r, a) {
      var n = this;
      t = tt(t);
      var i = n.properties[t], s = e, o = n.types;
      if (!i || e === void 0)
        return null;
      i.alias && (i = i.pointsTo, t = i.name);
      var u = ee(e);
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
      if (H(e))
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
          var v = o.data;
          return {
            name: t,
            value: f,
            strValue: "" + e,
            mapped: v,
            field: f[1],
            bypass: r
          };
        } else if (e.length >= 10 && e[0] === "m" && (h = new RegExp(o.mapData.regex).exec(e))) {
          if (r || l.multiple)
            return !1;
          var d = o.mapData;
          if (!(l.color || l.number))
            return !1;
          var c = this.parse(t, h[4]);
          if (!c || c.mapped)
            return !1;
          var y = this.parse(t, h[5]);
          if (!y || y.mapped)
            return !1;
          if (c.pfValue === y.pfValue || c.strValue === y.strValue)
            return vt("`" + t + ": " + e + "` is not a valid mapper because the output range is zero; converting to `" + t + ": " + c.strValue + "`"), this.parse(t, c.strValue);
          if (l.color) {
            var p = c.value, g = y.value, m = p[0] === g[0] && p[1] === g[1] && p[2] === g[2] && // optional alpha
            (p[3] === g[3] || (p[3] == null || p[3] === 1) && (g[3] == null || g[3] === 1));
            if (m)
              return !1;
          }
          return {
            name: t,
            value: h,
            strValue: "" + e,
            mapped: d,
            field: h[1],
            fieldMin: parseFloat(h[2]),
            // min & max are numeric
            fieldMax: parseFloat(h[3]),
            valueMin: c.value,
            valueMax: y.value,
            bypass: r
          };
        }
      }
      if (l.multiple && a !== "multiple") {
        var b;
        if (u ? b = e.split(/\s+/) : te(e) ? b = e : b = [e], l.evenMultiple && b.length % 2 !== 0)
          return null;
        for (var E = [], M = [], L = [], w = "", k = !1, D = 0; D < b.length; D++) {
          var F = n.parse(t, b[D], r, "multiple");
          k = k || ee(F.value), E.push(F.value), L.push(F.pfValue != null ? F.pfValue : F.value), M.push(F.units), w += (D > 0 ? " " : "") + F.strValue;
        }
        return l.validate && !l.validate(E, M) ? null : l.singleEnum && k ? E.length === 1 && ee(E[0]) ? {
          name: t,
          value: E[0],
          strValue: E[0],
          bypass: r
        } : null : {
          name: t,
          value: E,
          pfValue: L,
          strValue: w,
          bypass: r,
          units: M
        };
      }
      var G = function() {
        for (var Le = 0; Le < l.enums.length; Le++) {
          var Se = l.enums[Le];
          if (Se === e)
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
        var N, X = "px";
        if (l.units && (N = l.units), l.implicitUnits && (X = l.implicitUnits), !l.unitless)
          if (u) {
            var B = "px|em" + (l.allowPercent ? "|\\%" : "");
            N && (B = N);
            var re = e.match("^(" + gt + ")(" + B + ")?$");
            re && (e = re[1], N = re[2] || X);
          } else
            (!N || l.implicitUnits) && (N = X);
        if (e = parseFloat(e), isNaN(e) && l.enums === void 0)
          return null;
        if (isNaN(e) && l.enums !== void 0)
          return e = s, G();
        if (l.integer && !q(e) || l.min !== void 0 && (e < l.min || l.strictMin && e === l.min) || l.max !== void 0 && (e > l.max || l.strictMax && e === l.max))
          return null;
        var K = {
          name: t,
          value: e,
          strValue: "" + e + (N || ""),
          units: N,
          bypass: r
        };
        return l.unitless || N !== "px" && N !== "em" ? K.pfValue = e : K.pfValue = N === "px" || !N ? e : this.getEmSizeInPixels() * e, (N === "ms" || N === "s") && (K.pfValue = N === "ms" ? e : 1e3 * e), (N === "deg" || N === "rad") && (K.pfValue = N === "rad" ? e : mf(e)), N === "%" && (K.pfValue = e / 100), K;
      } else if (l.propList) {
        var W = [], ae = "" + e;
        if (ae !== "none") {
          for (var ue = ae.split(/\s*,\s*|\s+/), me = 0; me < ue.length; me++) {
            var ie = ue[me].trim();
            n.properties[ie] ? W.push(ie) : vt("`" + ie + "` is not a valid property name");
          }
          if (W.length === 0)
            return null;
        }
        return {
          name: t,
          value: W,
          strValue: W.length === 0 ? "none" : W.join(" "),
          bypass: r
        };
      } else if (l.color) {
        var ge = eu(e);
        return ge ? {
          name: t,
          value: ge,
          pfValue: ge,
          strValue: "rgb(" + ge[0] + "," + ge[1] + "," + ge[2] + ")",
          // n.b. no spaces b/c of multiple support
          bypass: r
        } : null;
      } else if (l.regex || l.regexes) {
        if (l.enums) {
          var Ee = G();
          if (Ee)
            return Ee;
        }
        for (var Ce = l.regexes ? l.regexes : [l.regex], we = 0; we < Ce.length; we++) {
          var De = new RegExp(Ce[we]), se = De.exec(e);
          if (se)
            return {
              name: t,
              value: l.singleRegexMatchValue ? se[1] : se,
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
        } : l.enums ? G() : null;
    };
    var Gt = function t(e) {
      if (!(this instanceof t))
        return new t(e);
      if (!Ye(e)) {
        xt("A style must have a core reference");
        return;
      }
      this._private = {
        cy: e,
        coreStyle: {}
      }, this.length = 0, this.resetToDefault();
    }, zt = Gt.prototype;
    zt.instanceString = function() {
      return "style";
    }, zt.clear = function() {
      for (var t = this._private, e = t.cy, r = e.elements(), a = 0; a < this.length; a++)
        this[a] = void 0;
      return this.length = 0, t.contextStyles = {}, t.propDiffs = {}, this.cleanElements(r, !0), r.forEach(function(n) {
        var i = n[0]._private;
        i.styleDirty = !0, i.appliedInitStyle = !1;
      }), this;
    }, zt.resetToDefault = function() {
      return this.clear(), this.addDefaultStylesheet(), this;
    }, zt.core = function(t) {
      return this._private.coreStyle[t] || this.getDefaultProperty(t);
    }, zt.selector = function(t) {
      var e = t === "core" ? null : new Sr(t), r = this.length++;
      return this[r] = {
        selector: e,
        properties: [],
        mappedProperties: [],
        index: r
      }, this;
    }, zt.css = function() {
      var t = this, e = arguments;
      if (e.length === 1)
        for (var r = e[0], a = 0; a < t.properties.length; a++) {
          var n = t.properties[a], i = r[n.name];
          i === void 0 && (i = r[yt(n.name)]), i !== void 0 && this.cssRule(n.name, i);
        }
      else
        e.length === 2 && this.cssRule(e[0], e[1]);
      return this;
    }, zt.style = zt.css, zt.cssRule = function(t, e) {
      var r = this.parse(t, e);
      if (r) {
        var a = this.length - 1;
        this[a].properties.push(r), this[a].properties[r.name] = r, r.name.match(/pie-(\d+)-background-size/) && r.value && (this._private.hasPie = !0), r.mapped && this[a].mappedProperties.push(r);
        var n = !this[a].selector;
        n && (this._private.coreStyle[r.name] = r);
      }
      return this;
    }, zt.append = function(t) {
      return at(t) ? t.appendToStyle(this) : te(t) ? this.appendFromJson(t) : ee(t) && this.appendFromString(t), this;
    }, Gt.fromJson = function(t, e) {
      var r = new Gt(t);
      return r.fromJson(e), r;
    }, Gt.fromString = function(t, e) {
      return new Gt(t).fromString(e);
    }, [Ft, qa, Ri, fr, Un, ki, It, $n].forEach(function(t) {
      He(zt, t);
    }), Gt.types = zt.types, Gt.properties = zt.properties, Gt.propertyGroups = zt.propertyGroups, Gt.propertyGroupNames = zt.propertyGroupNames, Gt.propertyGroupKeys = zt.propertyGroupKeys;
    var Gd = {
      style: function(e) {
        if (e) {
          var r = this.setStyle(e);
          r.update();
        }
        return this._private.style;
      },
      setStyle: function(e) {
        var r = this._private;
        return at(e) ? r.style = e.generateStyle(this) : te(e) ? r.style = Gt.fromJson(this, e) : ee(e) ? r.style = Gt.fromString(this, e) : r.style = Gt(this), r.style;
      },
      // e.g. cy.data() changed => recalc ele mappers
      updateStyle: function() {
        this.mutableElements().updateStyle();
      }
    }, zd = "single", Ur = {
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
        if (r.selectionType == null && (r.selectionType = zd), e !== void 0)
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
            if (ee(e[0]))
              return a = e[0], r[a];
            if (S(e[0])) {
              if (!this._private.panningEnabled)
                return this;
              i = e[0], s = i.x, o = i.y, R(s) && (r.x = s), R(o) && (r.y = o), this.emit("pan viewport");
            }
            break;
          case 2:
            if (!this._private.panningEnabled)
              return this;
            a = e[0], n = e[1], (a === "x" || a === "y") && R(n) && (r[a] = n), this.emit("pan viewport");
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
            S(e) && (o = a[0], u = o.x, l = o.y, R(u) && (n.x += u), R(l) && (n.y += l), this.emit("pan viewport"));
            break;
          case 2:
            i = e, s = r, (i === "x" || i === "y") && R(s) && (n[i] += s), this.emit("pan viewport");
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
        if (R(e) && r === void 0 && (r = e, e = void 0), !(!this._private.panningEnabled || !this._private.zoomingEnabled)) {
          var a;
          if (ee(e)) {
            var n = e;
            e = this.$(n);
          } else if (Ze(e)) {
            var i = e;
            a = {
              x1: i.x1,
              y1: i.y1,
              x2: i.x2,
              y2: i.y2
            }, a.w = a.x2 - a.x1, a.h = a.y2 - a.y1;
          } else
            pe(e) || (e = this.mutableElements());
          if (!(pe(e) && e.empty())) {
            a = a || e.boundingBox();
            var s = this.width(), o = this.height(), u;
            if (r = R(r) ? r : 0, !isNaN(s) && !isNaN(o) && s > 0 && o > 0 && !isNaN(a.w) && !isNaN(a.h) && a.w > 0 && a.h > 0) {
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
        return R(e) && R(r) && e <= r ? (a.minZoom = e, a.maxZoom = r) : R(e) && r === void 0 && e <= a.maxZoom ? a.minZoom = e : R(r) && e === void 0 && r >= a.minZoom && (a.maxZoom = r), this;
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
        if (r.zoomingEnabled || (o = !0), R(e) ? s = e : S(e) && (s = e.level, e.position != null ? i = vn(e.position, n, a) : e.renderedPosition != null && (i = e.renderedPosition), i != null && !r.panningEnabled && (o = !0)), s = s > r.maxZoom ? r.maxZoom : s, s = s < r.minZoom ? r.minZoom : s, o || !R(s) || s === n || i != null && (!R(i.x) || !R(i.y)))
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
        if (R(e.zoom) || (a = !1), S(e.pan) || (n = !1), !a && !n)
          return this;
        if (a) {
          var u = e.zoom;
          u < r.minZoom || u > r.maxZoom || !r.zoomingEnabled ? s = !0 : (r.zoom = u, i.push("zoom"));
        }
        if (n && (!s || !e.cancelOnFailedZoom) && r.panningEnabled) {
          var l = e.pan;
          R(l.x) && (r.pan.x = l.x, o = !1), R(l.y) && (r.pan.y = l.y, o = !1), o || i.push("pan");
        }
        return i.length > 0 && (i.push("viewport"), this.emit(i.join(" ")), this.notify("viewport")), this;
      },
      center: function(e) {
        var r = this.getCenterPan(e);
        return r && (this._private.pan = r, this.emit("pan viewport"), this.notify("viewport")), this;
      },
      getCenterPan: function(e, r) {
        if (this._private.panningEnabled) {
          if (ee(e)) {
            var a = e;
            e = this.mutableElements().filter(a);
          } else
            pe(e) || (e = this.mutableElements());
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
        var e = this._private, r = e.container, a = this;
        return e.sizeCache = e.sizeCache || (r ? function() {
          var n = a.window().getComputedStyle(r), i = function(o) {
            return parseFloat(n.getPropertyValue(o));
          };
          return {
            width: r.clientWidth - i("padding-left") - i("padding-right"),
            height: r.clientHeight - i("padding-top") - i("padding-bottom")
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
    Ur.centre = Ur.center, Ur.autolockNodes = Ur.autolock, Ur.autoungrabifyNodes = Ur.autoungrabify;
    var Ka = {
      data: ct.data({
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
      removeData: ct.removeData({
        field: "data",
        event: "data",
        triggerFnName: "trigger",
        triggerEvent: !0,
        updateStyle: !0
      }),
      scratch: ct.data({
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
      removeScratch: ct.removeData({
        field: "scratch",
        event: "scratch",
        triggerFnName: "trigger",
        triggerEvent: !0,
        updateStyle: !0
      })
    };
    Ka.attr = Ka.data, Ka.removeAttr = Ka.removeData;
    var Za = function(e) {
      var r = this;
      e = He({}, e);
      var a = e.container;
      a && !ve(a) && ve(a[0]) && (a = a[0]);
      var n = a ? a._cyreg : null;
      n = n || {}, n && n.cy && (n.cy.destroy(), n = {});
      var i = n.readies = n.readies || [];
      a && (a._cyreg = n), n.cy = r;
      var s = A !== void 0 && a !== void 0 && !e.headless, o = e;
      o.layout = He({
        name: s ? "grid" : "null"
      }, o.layout), o.renderer = He({
        name: s ? "canvas" : "null"
      }, o.renderer);
      var u = function(c, y, p) {
        return y !== void 0 ? y : p !== void 0 ? p : c;
      }, l = this._private = {
        container: a,
        // html dom ele container
        ready: !1,
        // whether ready has been triggered
        options: o,
        // cached options
        elements: new Nt(this),
        // elements in the graph
        listeners: [],
        // list of listeners
        aniEles: new Nt(this),
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
        zoom: R(o.zoom) ? o.zoom : 1,
        pan: {
          x: S(o.pan) && R(o.pan.x) ? o.pan.x : 0,
          y: S(o.pan) && R(o.pan.y) ? o.pan.y : 0
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
      var f = function(c, y) {
        var p = c.some(nt);
        if (p)
          return ia.all(c).then(y);
        y(c);
      };
      l.styleEnabled && r.setStyle([]);
      var h = He({}, o, o.renderer);
      r.initRenderer(h);
      var v = function(c, y, p) {
        r.notifications(!1);
        var g = r.mutableElements();
        g.length > 0 && g.remove(), c != null && (S(c) || te(c)) && r.add(c), r.one("layoutready", function(b) {
          r.notifications(!0), r.emit(b), r.one("load", y), r.emitAndNotify("load");
        }).one("layoutstop", function() {
          r.one("done", p), r.emit("done");
        });
        var m = He({}, r._private.options.layout);
        m.eles = r.elements(), r.layout(m).run();
      };
      f([o.style, o.elements], function(d) {
        var c = d[0], y = d[1];
        l.styleEnabled && r.style().append(c), v(y, function() {
          r.startAnimationLoop(), l.ready = !0, H(o.ready) && r.on("ready", o.ready);
          for (var p = 0; p < i.length; p++) {
            var g = i[p];
            r.on("ready", g);
          }
          n && (n.readies = []), r.emit("ready");
        }, o.done);
      });
    }, _n = Za.prototype;
    He(_n, {
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
      window: function() {
        var e = this._private.container;
        if (e == null)
          return A;
        var r = this._private.container.ownerDocument;
        return r === void 0 || r == null ? A : r.defaultView || A;
      },
      mount: function(e) {
        if (e != null) {
          var r = this, a = r._private, n = a.options;
          return !ve(e) && ve(e[0]) && (e = e[0]), r.stopAnimationLoop(), r.destroyRenderer(), a.container = e, a.styleEnabled = !0, r.invalidateSize(), r.initRenderer(He({}, n, n.renderer, {
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
        return lr(this._private.options);
      },
      json: function(e) {
        var r = this, a = r._private, n = r.mutableElements(), i = function(E) {
          return r.getElementById(E.id());
        };
        if (S(e)) {
          if (r.startBatch(), e.elements) {
            var s = {}, o = function(E, M) {
              for (var L = [], w = [], k = 0; k < E.length; k++) {
                var D = E[k];
                if (!D.data.id) {
                  vt("cy.json() cannot handle elements without an ID attribute");
                  continue;
                }
                var F = "" + D.data.id, G = r.getElementById(F);
                s[F] = !0, G.length !== 0 ? w.push({
                  ele: G,
                  json: D
                }) : (M && (D.group = M), L.push(D));
              }
              r.add(L);
              for (var N = 0; N < w.length; N++) {
                var X = w[N], B = X.ele, re = X.json;
                B.json(re);
              }
            };
            if (te(e.elements))
              o(e.elements);
            else
              for (var u = ["nodes", "edges"], l = 0; l < u.length; l++) {
                var f = u[l], h = e.elements[f];
                te(h) && o(h, f);
              }
            var v = r.collection();
            n.filter(function(b) {
              return !s[b.id()];
            }).forEach(function(b) {
              b.isParent() ? v.merge(b) : b.remove();
            }), v.forEach(function(b) {
              return b.children().move({
                parent: null
              });
            }), v.forEach(function(b) {
              return i(b).remove();
            });
          }
          e.style && r.style(e.style), e.zoom != null && e.zoom !== a.zoom && r.zoom(e.zoom), e.pan && (e.pan.x !== a.pan.x || e.pan.y !== a.pan.y) && r.pan(e.pan), e.data && r.data(e.data);
          for (var d = ["minZoom", "maxZoom", "zoomingEnabled", "userZoomingEnabled", "panningEnabled", "userPanningEnabled", "boxSelectionEnabled", "autolock", "autoungrabify", "autounselectify", "multiClickDebounceTime"], c = 0; c < d.length; c++) {
            var y = d[c];
            e[y] != null && r[y](e[y]);
          }
          return r.endBatch(), this;
        } else {
          var p = !!e, g = {};
          p ? g.elements = this.elements().map(function(b) {
            return b.json();
          }) : (g.elements = {}, n.forEach(function(b) {
            var E = b.group();
            g.elements[E] || (g.elements[E] = []), g.elements[E].push(b.json());
          })), this._private.styleEnabled && (g.style = r.style().json()), g.data = lr(r.data());
          var m = a.options;
          return g.zoomingEnabled = a.zoomingEnabled, g.userZoomingEnabled = a.userZoomingEnabled, g.zoom = a.zoom, g.minZoom = a.minZoom, g.maxZoom = a.maxZoom, g.panningEnabled = a.panningEnabled, g.userPanningEnabled = a.userPanningEnabled, g.pan = lr(a.pan), g.boxSelectionEnabled = a.boxSelectionEnabled, g.renderer = lr(m.renderer), g.hideEdgesOnViewport = m.hideEdgesOnViewport, g.textureOnViewport = m.textureOnViewport, g.wheelSensitivity = m.wheelSensitivity, g.motionBlur = m.motionBlur, g.multiClickDebounceTime = m.multiClickDebounceTime, g;
        }
      }
    }), _n.$id = _n.getElementById, [Ad, Rd, Yo, Ii, zn, Pd, Mi, Vn, Gd, Ur, Ka].forEach(function(t) {
      He(_n, t);
    });
    var Vd = {
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
    }, Ud = {
      maximal: !1,
      // whether to shift nodes down their natural BFS depths in order to avoid upwards edges (DAGS only); setting acyclic to true sets maximal to true also
      acyclic: !1
      // whether the tree is acyclic and thus a node could be shifted (due to the maximal option) multiple times without causing an infinite loop; setting to true sets maximal to true also; if you are uncertain whether a tree is acyclic, set to false to avoid potential infinite loops
    }, pa = function(e) {
      return e.scratch("breadthfirst");
    }, Ho = function(e, r) {
      return e.scratch("breadthfirst", r);
    };
    function Xo(t) {
      this.options = He({}, Vd, Ud, t);
    }
    Xo.prototype.run = function() {
      var t = this.options, e = t, r = t.cy, a = e.eles, n = a.nodes().filter(function(Ie) {
        return !Ie.isParent();
      }), i = a, s = e.directed, o = e.acyclic || e.maximal || e.maximalAdjustments > 0, u = Yt(e.boundingBox ? e.boundingBox : {
        x1: 0,
        y1: 0,
        w: r.width(),
        h: r.height()
      }), l;
      if (pe(e.roots))
        l = e.roots;
      else if (te(e.roots)) {
        for (var f = [], h = 0; h < e.roots.length; h++) {
          var v = e.roots[h], d = r.getElementById(v);
          f.push(d);
        }
        l = r.collection(f);
      } else if (ee(e.roots))
        l = r.$(e.roots);
      else if (s)
        l = n.roots();
      else {
        var c = a.components();
        l = r.collection();
        for (var y = function(Me) {
          var Ue = c[Me], ze = Ue.maxDegree(!1), Be = Ue.filter(function($e) {
            return $e.degree(!1) === ze;
          });
          l = l.add(Be);
        }, p = 0; p < c.length; p++)
          y(p);
      }
      var g = [], m = {}, b = function(Me, Ue) {
        g[Ue] == null && (g[Ue] = []);
        var ze = g[Ue].length;
        g[Ue].push(Me), Ho(Me, {
          index: ze,
          depth: Ue
        });
      }, E = function(Me, Ue) {
        var ze = pa(Me), Be = ze.depth, $e = ze.index;
        g[Be][$e] = null, b(Me, Ue);
      };
      i.bfs({
        roots: l,
        directed: e.directed,
        visit: function(Me, Ue, ze, Be, $e) {
          var rt = Me[0], je = rt.id();
          b(rt, $e), m[je] = !0;
        }
      });
      for (var M = [], L = 0; L < n.length; L++) {
        var w = n[L];
        m[w.id()] || M.push(w);
      }
      var k = function(Me) {
        for (var Ue = g[Me], ze = 0; ze < Ue.length; ze++) {
          var Be = Ue[ze];
          if (Be == null) {
            Ue.splice(ze, 1), ze--;
            continue;
          }
          Ho(Be, {
            depth: Me,
            index: ze
          });
        }
      }, D = function() {
        for (var Me = 0; Me < g.length; Me++)
          k(Me);
      }, F = function(Me, Ue) {
        for (var ze = pa(Me), Be = Me.incomers().filter(function(O) {
          return O.isNode() && a.has(O);
        }), $e = -1, rt = Me.id(), je = 0; je < Be.length; je++) {
          var We = Be[je], et = pa(We);
          $e = Math.max($e, et.depth);
        }
        if (ze.depth <= $e) {
          if (!e.acyclic && Ue[rt])
            return null;
          var he = $e + 1;
          return E(Me, he), Ue[rt] = he, !0;
        }
        return !1;
      };
      if (s && o) {
        var G = [], N = {}, X = function(Me) {
          return G.push(Me);
        }, B = function() {
          return G.shift();
        };
        for (n.forEach(function(Ie) {
          return G.push(Ie);
        }); G.length > 0; ) {
          var re = B(), K = F(re, N);
          if (K)
            re.outgoers().filter(function(Ie) {
              return Ie.isNode() && a.has(Ie);
            }).forEach(X);
          else if (K === null) {
            vt("Detected double maximal shift for node `" + re.id() + "`.  Bailing maximal adjustment due to cycle.  Use `options.maximal: true` only on DAGs.");
            break;
          }
        }
      }
      D();
      var W = 0;
      if (e.avoidOverlap)
        for (var ae = 0; ae < n.length; ae++) {
          var ue = n[ae], me = ue.layoutDimensions(e), ie = me.w, ge = me.h;
          W = Math.max(W, ie, ge);
        }
      var Ee = {}, Ce = function(Me) {
        if (Ee[Me.id()])
          return Ee[Me.id()];
        for (var Ue = pa(Me).depth, ze = Me.neighborhood(), Be = 0, $e = 0, rt = 0; rt < ze.length; rt++) {
          var je = ze[rt];
          if (!(je.isEdge() || je.isParent() || !n.has(je))) {
            var We = pa(je);
            if (We != null) {
              var et = We.index, he = We.depth;
              if (!(et == null || he == null)) {
                var O = g[he].length;
                he < Ue && (Be += et / O, $e++);
              }
            }
          }
        }
        return $e = Math.max(1, $e), Be = Be / $e, $e === 0 && (Be = 0), Ee[Me.id()] = Be, Be;
      }, we = function(Me, Ue) {
        var ze = Ce(Me), Be = Ce(Ue), $e = ze - Be;
        return $e === 0 ? es(Me.id(), Ue.id()) : $e;
      };
      e.depthSort !== void 0 && (we = e.depthSort);
      for (var De = 0; De < g.length; De++)
        g[De].sort(we), k(De);
      for (var se = [], xe = 0; xe < M.length; xe++)
        se.push(M[xe]);
      g.unshift(se), D();
      for (var Le = 0, Se = 0; Se < g.length; Se++)
        Le = Math.max(g[Se].length, Le);
      var Oe = {
        x: u.x1 + u.w / 2,
        y: u.x1 + u.h / 2
      }, Fe = g.reduce(function(Ie, Me) {
        return Math.max(Ie, Me.length);
      }, 0), Xe = function(Me) {
        var Ue = pa(Me), ze = Ue.depth, Be = Ue.index, $e = g[ze].length, rt = Math.max(u.w / ((e.grid ? Fe : $e) + 1), W), je = Math.max(u.h / (g.length + 1), W), We = Math.min(u.w / 2 / g.length, u.h / 2 / g.length);
        if (We = Math.max(We, W), e.circle) {
          var he = We * ze + We - (g.length > 0 && g[0].length <= 3 ? We / 2 : 0), O = 2 * Math.PI / g[ze].length * Be;
          return ze === 0 && g[0].length === 1 && (he = 1), {
            x: Oe.x + he * Math.cos(O),
            y: Oe.y + he * Math.sin(O)
          };
        } else {
          var et = {
            x: Oe.x + (Be + 1 - ($e + 1) / 2) * rt,
            y: (ze + 1) * je
          };
          return et;
        }
      };
      return a.nodes().layoutPositions(this, e, Xe), this;
    };
    var $d = {
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
    function Wo(t) {
      this.options = He({}, $d, t);
    }
    Wo.prototype.run = function() {
      var t = this.options, e = t, r = t.cy, a = e.eles, n = e.counterclockwise !== void 0 ? !e.counterclockwise : e.clockwise, i = a.nodes().not(":parent");
      e.sort && (i = i.sort(e.sort));
      for (var s = Yt(e.boundingBox ? e.boundingBox : {
        x1: 0,
        y1: 0,
        w: r.width(),
        h: r.height()
      }), o = {
        x: s.x1 + s.w / 2,
        y: s.y1 + s.h / 2
      }, u = e.sweep === void 0 ? 2 * Math.PI - 2 * Math.PI / i.length : e.sweep, l = u / Math.max(1, i.length - 1), f, h = 0, v = 0; v < i.length; v++) {
        var d = i[v], c = d.layoutDimensions(e), y = c.w, p = c.h;
        h = Math.max(h, y, p);
      }
      if (R(e.radius) ? f = e.radius : i.length <= 1 ? f = 0 : f = Math.min(s.h, s.w) / 2 - h, i.length > 1 && e.avoidOverlap) {
        h *= 1.75;
        var g = Math.cos(l) - Math.cos(0), m = Math.sin(l) - Math.sin(0), b = Math.sqrt(h * h / (g * g + m * m));
        f = Math.max(b, f);
      }
      var E = function(L, w) {
        var k = e.startAngle + w * l * (n ? 1 : -1), D = f * Math.cos(k), F = f * Math.sin(k), G = {
          x: o.x + D,
          y: o.y + F
        };
        return G;
      };
      return a.nodes().layoutPositions(this, e, E), this;
    };
    var _d = {
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
    function qo(t) {
      this.options = He({}, _d, t);
    }
    qo.prototype.run = function() {
      for (var t = this.options, e = t, r = e.counterclockwise !== void 0 ? !e.counterclockwise : e.clockwise, a = t.cy, n = e.eles, i = n.nodes().not(":parent"), s = Yt(e.boundingBox ? e.boundingBox : {
        x1: 0,
        y1: 0,
        w: a.width(),
        h: a.height()
      }), o = {
        x: s.x1 + s.w / 2,
        y: s.y1 + s.h / 2
      }, u = [], l = 0, f = 0; f < i.length; f++) {
        var h = i[f], v = void 0;
        v = e.concentric(h), u.push({
          value: v,
          node: h
        }), h._private.scratch.concentric = v;
      }
      i.updateStyle();
      for (var d = 0; d < i.length; d++) {
        var c = i[d], y = c.layoutDimensions(e);
        l = Math.max(l, y.w, y.h);
      }
      u.sort(function(Ie, Me) {
        return Me.value - Ie.value;
      });
      for (var p = e.levelWidth(i), g = [[]], m = g[0], b = 0; b < u.length; b++) {
        var E = u[b];
        if (m.length > 0) {
          var M = Math.abs(m[0].value - E.value);
          M >= p && (m = [], g.push(m));
        }
        m.push(E);
      }
      var L = l + e.minNodeSpacing;
      if (!e.avoidOverlap) {
        var w = g.length > 0 && g[0].length > 1, k = Math.min(s.w, s.h) / 2 - L, D = k / (g.length + w ? 1 : 0);
        L = Math.min(L, D);
      }
      for (var F = 0, G = 0; G < g.length; G++) {
        var N = g[G], X = e.sweep === void 0 ? 2 * Math.PI - 2 * Math.PI / N.length : e.sweep, B = N.dTheta = X / Math.max(1, N.length - 1);
        if (N.length > 1 && e.avoidOverlap) {
          var re = Math.cos(B) - Math.cos(0), K = Math.sin(B) - Math.sin(0), W = Math.sqrt(L * L / (re * re + K * K));
          F = Math.max(W, F);
        }
        N.r = F, F += L;
      }
      if (e.equidistant) {
        for (var ae = 0, ue = 0, me = 0; me < g.length; me++) {
          var ie = g[me], ge = ie.r - ue;
          ae = Math.max(ae, ge);
        }
        ue = 0;
        for (var Ee = 0; Ee < g.length; Ee++) {
          var Ce = g[Ee];
          Ee === 0 && (ue = Ce.r), Ce.r = ue, ue += ae;
        }
      }
      for (var we = {}, De = 0; De < g.length; De++)
        for (var se = g[De], xe = se.dTheta, Le = se.r, Se = 0; Se < se.length; Se++) {
          var Oe = se[Se], Fe = e.startAngle + (r ? 1 : -1) * xe * Se, Xe = {
            x: o.x + Le * Math.cos(Fe),
            y: o.y + Le * Math.sin(Fe)
          };
          we[Oe.node.id()] = Xe;
        }
      return n.nodes().layoutPositions(this, e, function(Ie) {
        var Me = Ie.id();
        return we[Me];
      }), this;
    };
    var Pi, Yd = {
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
    function Yn(t) {
      this.options = He({}, Yd, t), this.options.layout = this;
      var e = this.options.eles.nodes(), r = this.options.eles.edges(), a = r.filter(function(n) {
        var i = n.source().data("id"), s = n.target().data("id"), o = e.some(function(l) {
          return l.data("id") === i;
        }), u = e.some(function(l) {
          return l.data("id") === s;
        });
        return !o || !u;
      });
      this.options.eles = this.options.eles.not(a);
    }
    Yn.prototype.run = function() {
      var t = this.options, e = t.cy, r = this;
      r.stopped = !1, (t.animate === !0 || t.animate === !1) && r.emit({
        type: "layoutstart",
        layout: r
      }), t.debug === !0 ? Pi = !0 : Pi = !1;
      var a = Hd(e, r, t);
      Pi && qd(a), t.randomize && Kd(a);
      var n = gr(), i = function() {
        Zd(a, e, t), t.fit === !0 && e.fit(t.padding);
      }, s = function(v) {
        return !(r.stopped || v >= t.numIter || (Qd(a, t), a.temperature = a.temperature * t.coolingFactor, a.temperature < t.minTemp));
      }, o = function() {
        if (t.animate === !0 || t.animate === !1)
          i(), r.one("layoutstop", t.stop), r.emit({
            type: "layoutstop",
            layout: r
          });
        else {
          var v = t.eles.nodes(), d = Ko(a, t, v);
          v.layoutPositions(r, t, d);
        }
      }, u = 0, l = !0;
      if (t.animate === !0) {
        var f = function h() {
          for (var v = 0; l && v < t.refresh; )
            l = s(u), u++, v++;
          if (!l)
            Qo(a, t), o();
          else {
            var d = gr();
            d - n >= t.animationThreshold && i(), ln(h);
          }
        };
        f();
      } else {
        for (; l; )
          l = s(u), u++;
        Qo(a, t), o();
      }
      return this;
    }, Yn.prototype.stop = function() {
      return this.stopped = !0, this.thread && this.thread.stop(), this.emit("layoutstop"), this;
    }, Yn.prototype.destroy = function() {
      return this.thread && this.thread.stop(), this;
    };
    var Hd = function(e, r, a) {
      for (var n = a.eles.edges(), i = a.eles.nodes(), s = Yt(a.boundingBox ? a.boundingBox : {
        x1: 0,
        y1: 0,
        w: e.width(),
        h: e.height()
      }), o = {
        isCompound: e.hasCompoundNodes(),
        layoutNodes: [],
        idToIndex: {},
        nodeSize: i.size(),
        graphSet: [],
        indexToGraph: [],
        layoutEdges: [],
        edgeSize: n.size(),
        temperature: a.initialTemp,
        clientWidth: s.w,
        clientHeight: s.h,
        boundingBox: s
      }, u = a.eles.components(), l = {}, f = 0; f < u.length; f++)
        for (var h = u[f], v = 0; v < h.length; v++) {
          var d = h[v];
          l[d.id()] = f;
        }
      for (var f = 0; f < o.nodeSize; f++) {
        var c = i[f], y = c.layoutDimensions(a), p = {};
        p.isLocked = c.locked(), p.id = c.data("id"), p.parentId = c.data("parent"), p.cmptId = l[c.id()], p.children = [], p.positionX = c.position("x"), p.positionY = c.position("y"), p.offsetX = 0, p.offsetY = 0, p.height = y.w, p.width = y.h, p.maxX = p.positionX + p.width / 2, p.minX = p.positionX - p.width / 2, p.maxY = p.positionY + p.height / 2, p.minY = p.positionY - p.height / 2, p.padLeft = parseFloat(c.style("padding")), p.padRight = parseFloat(c.style("padding")), p.padTop = parseFloat(c.style("padding")), p.padBottom = parseFloat(c.style("padding")), p.nodeRepulsion = H(a.nodeRepulsion) ? a.nodeRepulsion(c) : a.nodeRepulsion, o.layoutNodes.push(p), o.idToIndex[p.id] = f;
      }
      for (var g = [], m = 0, b = -1, E = [], f = 0; f < o.nodeSize; f++) {
        var c = o.layoutNodes[f], M = c.parentId;
        M != null ? o.layoutNodes[o.idToIndex[M]].children.push(c.id) : (g[++b] = c.id, E.push(c.id));
      }
      for (o.graphSet.push(E); m <= b; ) {
        var L = g[m++], w = o.idToIndex[L], d = o.layoutNodes[w], k = d.children;
        if (k.length > 0) {
          o.graphSet.push(k);
          for (var f = 0; f < k.length; f++)
            g[++b] = k[f];
        }
      }
      for (var f = 0; f < o.graphSet.length; f++)
        for (var D = o.graphSet[f], v = 0; v < D.length; v++) {
          var F = o.idToIndex[D[v]];
          o.indexToGraph[F] = f;
        }
      for (var f = 0; f < o.edgeSize; f++) {
        var G = n[f], N = {};
        N.id = G.data("id"), N.sourceId = G.data("source"), N.targetId = G.data("target");
        var X = H(a.idealEdgeLength) ? a.idealEdgeLength(G) : a.idealEdgeLength, B = H(a.edgeElasticity) ? a.edgeElasticity(G) : a.edgeElasticity, re = o.idToIndex[N.sourceId], K = o.idToIndex[N.targetId], W = o.indexToGraph[re], ae = o.indexToGraph[K];
        if (W != ae) {
          for (var ue = Xd(N.sourceId, N.targetId, o), me = o.graphSet[ue], ie = 0, p = o.layoutNodes[re]; me.indexOf(p.id) === -1; )
            p = o.layoutNodes[o.idToIndex[p.parentId]], ie++;
          for (p = o.layoutNodes[K]; me.indexOf(p.id) === -1; )
            p = o.layoutNodes[o.idToIndex[p.parentId]], ie++;
          X *= ie * a.nestingFactor;
        }
        N.idealLength = X, N.elasticity = B, o.layoutEdges.push(N);
      }
      return o;
    }, Xd = function(e, r, a) {
      var n = Wd(e, r, 0, a);
      return 2 > n.count ? 0 : n.graph;
    }, Wd = function t(e, r, a, n) {
      var i = n.graphSet[a];
      if (-1 < i.indexOf(e) && -1 < i.indexOf(r))
        return {
          count: 2,
          graph: a
        };
      for (var s = 0, o = 0; o < i.length; o++) {
        var u = i[o], l = n.idToIndex[u], f = n.layoutNodes[l].children;
        if (f.length !== 0) {
          var h = n.indexToGraph[n.idToIndex[f[0]]], v = t(e, r, h, n);
          if (v.count !== 0)
            if (v.count === 1) {
              if (s++, s === 2)
                break;
            } else
              return v;
        }
      }
      return {
        count: s,
        graph: a
      };
    }, qd, Kd = function(e, r) {
      for (var a = e.clientWidth, n = e.clientHeight, i = 0; i < e.nodeSize; i++) {
        var s = e.layoutNodes[i];
        s.children.length === 0 && !s.isLocked && (s.positionX = Math.random() * a, s.positionY = Math.random() * n);
      }
    }, Ko = function(e, r, a) {
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
    }, Zd = function(e, r, a) {
      var n = a.layout, i = a.eles.nodes(), s = Ko(e, a, i);
      i.positions(s), e.ready !== !0 && (e.ready = !0, n.one("layoutready", a.ready), n.emit({
        type: "layoutready",
        layout: this
      }));
    }, Qd = function(e, r, a) {
      Jd(e, r), tg(e), rg(e, r), ag(e), ng(e);
    }, Jd = function(e, r) {
      for (var a = 0; a < e.graphSet.length; a++)
        for (var n = e.graphSet[a], i = n.length, s = 0; s < i; s++)
          for (var o = e.layoutNodes[e.idToIndex[n[s]]], u = s + 1; u < i; u++) {
            var l = e.layoutNodes[e.idToIndex[n[u]]];
            jd(o, l, e, r);
          }
    }, Zo = function(e) {
      return -e + 2 * e * Math.random();
    }, jd = function(e, r, a, n) {
      var i = e.cmptId, s = r.cmptId;
      if (!(i !== s && !a.isCompound)) {
        var o = r.positionX - e.positionX, u = r.positionY - e.positionY, l = 1;
        o === 0 && u === 0 && (o = Zo(l), u = Zo(l));
        var f = eg(e, r, o, u);
        if (f > 0)
          var h = n.nodeOverlap * f, v = Math.sqrt(o * o + u * u), d = h * o / v, c = h * u / v;
        else
          var y = Hn(e, o, u), p = Hn(r, -1 * o, -1 * u), g = p.x - y.x, m = p.y - y.y, b = g * g + m * m, v = Math.sqrt(b), h = (e.nodeRepulsion + r.nodeRepulsion) / b, d = h * g / v, c = h * m / v;
        e.isLocked || (e.offsetX -= d, e.offsetY -= c), r.isLocked || (r.offsetX += d, r.offsetY += c);
      }
    }, eg = function(e, r, a, n) {
      if (a > 0)
        var i = e.maxX - r.minX;
      else
        var i = r.maxX - e.minX;
      if (n > 0)
        var s = e.maxY - r.minY;
      else
        var s = r.maxY - e.minY;
      return i >= 0 && s >= 0 ? Math.sqrt(i * i + s * s) : 0;
    }, Hn = function(e, r, a) {
      var n = e.positionX, i = e.positionY, s = e.height || 1, o = e.width || 1, u = a / r, l = s / o, f = {};
      return r === 0 && 0 < a || r === 0 && 0 > a ? (f.x = n, f.y = i + s / 2, f) : 0 < r && -1 * l <= u && u <= l ? (f.x = n + o / 2, f.y = i + o * a / 2 / r, f) : 0 > r && -1 * l <= u && u <= l ? (f.x = n - o / 2, f.y = i - o * a / 2 / r, f) : 0 < a && (u <= -1 * l || u >= l) ? (f.x = n + s * r / 2 / a, f.y = i + s / 2, f) : (0 > a && (u <= -1 * l || u >= l) && (f.x = n - s * r / 2 / a, f.y = i - s / 2), f);
    }, tg = function(e, r) {
      for (var a = 0; a < e.edgeSize; a++) {
        var n = e.layoutEdges[a], i = e.idToIndex[n.sourceId], s = e.layoutNodes[i], o = e.idToIndex[n.targetId], u = e.layoutNodes[o], l = u.positionX - s.positionX, f = u.positionY - s.positionY;
        if (!(l === 0 && f === 0)) {
          var h = Hn(s, l, f), v = Hn(u, -1 * l, -1 * f), d = v.x - h.x, c = v.y - h.y, y = Math.sqrt(d * d + c * c), p = Math.pow(n.idealLength - y, 2) / n.elasticity;
          if (y !== 0)
            var g = p * d / y, m = p * c / y;
          else
            var g = 0, m = 0;
          s.isLocked || (s.offsetX += g, s.offsetY += m), u.isLocked || (u.offsetX -= g, u.offsetY -= m);
        }
      }
    }, rg = function(e, r) {
      if (r.gravity !== 0)
        for (var a = 1, n = 0; n < e.graphSet.length; n++) {
          var i = e.graphSet[n], s = i.length;
          if (n === 0)
            var o = e.clientHeight / 2, u = e.clientWidth / 2;
          else
            var l = e.layoutNodes[e.idToIndex[i[0]]], f = e.layoutNodes[e.idToIndex[l.parentId]], o = f.positionX, u = f.positionY;
          for (var h = 0; h < s; h++) {
            var v = e.layoutNodes[e.idToIndex[i[h]]];
            if (!v.isLocked) {
              var d = o - v.positionX, c = u - v.positionY, y = Math.sqrt(d * d + c * c);
              if (y > a) {
                var p = r.gravity * d / y, g = r.gravity * c / y;
                v.offsetX += p, v.offsetY += g;
              }
            }
          }
        }
    }, ag = function(e, r) {
      var a = [], n = 0, i = -1;
      for (a.push.apply(a, e.graphSet[0]), i += e.graphSet[0].length; n <= i; ) {
        var s = a[n++], o = e.idToIndex[s], u = e.layoutNodes[o], l = u.children;
        if (0 < l.length && !u.isLocked) {
          for (var f = u.offsetX, h = u.offsetY, v = 0; v < l.length; v++) {
            var d = e.layoutNodes[e.idToIndex[l[v]]];
            d.offsetX += f, d.offsetY += h, a[++i] = l[v];
          }
          u.offsetX = 0, u.offsetY = 0;
        }
      }
    }, ng = function(e, r) {
      for (var a = 0; a < e.nodeSize; a++) {
        var n = e.layoutNodes[a];
        0 < n.children.length && (n.maxX = void 0, n.minX = void 0, n.maxY = void 0, n.minY = void 0);
      }
      for (var a = 0; a < e.nodeSize; a++) {
        var n = e.layoutNodes[a];
        if (!(0 < n.children.length || n.isLocked)) {
          var i = ig(n.offsetX, n.offsetY, e.temperature);
          n.positionX += i.x, n.positionY += i.y, n.offsetX = 0, n.offsetY = 0, n.minX = n.positionX - n.width, n.maxX = n.positionX + n.width, n.minY = n.positionY - n.height, n.maxY = n.positionY + n.height, sg(n, e);
        }
      }
      for (var a = 0; a < e.nodeSize; a++) {
        var n = e.layoutNodes[a];
        0 < n.children.length && !n.isLocked && (n.positionX = (n.maxX + n.minX) / 2, n.positionY = (n.maxY + n.minY) / 2, n.width = n.maxX - n.minX, n.height = n.maxY - n.minY);
      }
    }, ig = function(e, r, a) {
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
    }, sg = function t(e, r) {
      var a = e.parentId;
      if (a != null) {
        var n = r.layoutNodes[r.idToIndex[a]], i = !1;
        if ((n.maxX == null || e.maxX + n.padRight > n.maxX) && (n.maxX = e.maxX + n.padRight, i = !0), (n.minX == null || e.minX - n.padLeft < n.minX) && (n.minX = e.minX - n.padLeft, i = !0), (n.maxY == null || e.maxY + n.padBottom > n.maxY) && (n.maxY = e.maxY + n.padBottom, i = !0), (n.minY == null || e.minY - n.padTop < n.minY) && (n.minY = e.minY - n.padTop, i = !0), i)
          return t(n, r);
      }
    }, Qo = function(e, r) {
      for (var a = e.layoutNodes, n = [], i = 0; i < a.length; i++) {
        var s = a[i], o = s.cmptId, u = n[o] = n[o] || [];
        u.push(s);
      }
      for (var l = 0, i = 0; i < n.length; i++) {
        var f = n[i];
        if (f) {
          f.x1 = 1 / 0, f.x2 = -1 / 0, f.y1 = 1 / 0, f.y2 = -1 / 0;
          for (var h = 0; h < f.length; h++) {
            var v = f[h];
            f.x1 = Math.min(f.x1, v.positionX - v.width / 2), f.x2 = Math.max(f.x2, v.positionX + v.width / 2), f.y1 = Math.min(f.y1, v.positionY - v.height / 2), f.y2 = Math.max(f.y2, v.positionY + v.height / 2);
          }
          f.w = f.x2 - f.x1, f.h = f.y2 - f.y1, l += f.w * f.h;
        }
      }
      n.sort(function(m, b) {
        return b.w * b.h - m.w * m.h;
      });
      for (var d = 0, c = 0, y = 0, p = 0, g = Math.sqrt(l) * e.clientWidth / e.clientHeight, i = 0; i < n.length; i++) {
        var f = n[i];
        if (f) {
          for (var h = 0; h < f.length; h++) {
            var v = f[h];
            v.isLocked || (v.positionX += d - f.x1, v.positionY += c - f.y1);
          }
          d += f.w + r.componentSpacing, y += f.w + r.componentSpacing, p = Math.max(p, f.h), y > g && (c += p + r.componentSpacing, d = 0, y = 0, p = 0);
        }
      }
    }, og = {
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
    function Jo(t) {
      this.options = He({}, og, t);
    }
    Jo.prototype.run = function() {
      var t = this.options, e = t, r = t.cy, a = e.eles, n = a.nodes().not(":parent");
      e.sort && (n = n.sort(e.sort));
      var i = Yt(e.boundingBox ? e.boundingBox : {
        x1: 0,
        y1: 0,
        w: r.width(),
        h: r.height()
      });
      if (i.h === 0 || i.w === 0)
        a.nodes().layoutPositions(this, e, function(Ee) {
          return {
            x: i.x1,
            y: i.y1
          };
        });
      else {
        var s = n.size(), o = Math.sqrt(s * i.h / i.w), u = Math.round(o), l = Math.round(i.w / i.h * o), f = function(Ce) {
          if (Ce == null)
            return Math.min(u, l);
          var we = Math.min(u, l);
          we == u ? u = Ce : l = Ce;
        }, h = function(Ce) {
          if (Ce == null)
            return Math.max(u, l);
          var we = Math.max(u, l);
          we == u ? u = Ce : l = Ce;
        }, v = e.rows, d = e.cols != null ? e.cols : e.columns;
        if (v != null && d != null)
          u = v, l = d;
        else if (v != null && d == null)
          u = v, l = Math.ceil(s / u);
        else if (v == null && d != null)
          l = d, u = Math.ceil(s / l);
        else if (l * u > s) {
          var c = f(), y = h();
          (c - 1) * y >= s ? f(c - 1) : (y - 1) * c >= s && h(y - 1);
        } else
          for (; l * u < s; ) {
            var p = f(), g = h();
            (g + 1) * p >= s ? h(g + 1) : f(p + 1);
          }
        var m = i.w / l, b = i.h / u;
        if (e.condense && (m = 0, b = 0), e.avoidOverlap)
          for (var E = 0; E < n.length; E++) {
            var M = n[E], L = M._private.position;
            (L.x == null || L.y == null) && (L.x = 0, L.y = 0);
            var w = M.layoutDimensions(e), k = e.avoidOverlapPadding, D = w.w + k, F = w.h + k;
            m = Math.max(m, D), b = Math.max(b, F);
          }
        for (var G = {}, N = function(Ce, we) {
          return !!G["c-" + Ce + "-" + we];
        }, X = function(Ce, we) {
          G["c-" + Ce + "-" + we] = !0;
        }, B = 0, re = 0, K = function() {
          re++, re >= l && (re = 0, B++);
        }, W = {}, ae = 0; ae < n.length; ae++) {
          var ue = n[ae], me = e.position(ue);
          if (me && (me.row !== void 0 || me.col !== void 0)) {
            var ie = {
              row: me.row,
              col: me.col
            };
            if (ie.col === void 0)
              for (ie.col = 0; N(ie.row, ie.col); )
                ie.col++;
            else if (ie.row === void 0)
              for (ie.row = 0; N(ie.row, ie.col); )
                ie.row++;
            W[ue.id()] = ie, X(ie.row, ie.col);
          }
        }
        var ge = function(Ce, we) {
          var De, se;
          if (Ce.locked() || Ce.isParent())
            return !1;
          var xe = W[Ce.id()];
          if (xe)
            De = xe.col * m + m / 2 + i.x1, se = xe.row * b + b / 2 + i.y1;
          else {
            for (; N(B, re); )
              K();
            De = re * m + m / 2 + i.x1, se = B * b + b / 2 + i.y1, X(B, re), K();
          }
          return {
            x: De,
            y: se
          };
        };
        n.layoutPositions(this, e, ge);
      }
      return this;
    };
    var lg = {
      ready: function() {
      },
      // on layoutready
      stop: function() {
      }
      // on layoutstop
    };
    function Bi(t) {
      this.options = He({}, lg, t);
    }
    Bi.prototype.run = function() {
      var t = this.options, e = t.eles, r = this;
      return t.cy, r.emit("layoutstart"), e.nodes().positions(function() {
        return {
          x: 0,
          y: 0
        };
      }), r.one("layoutready", t.ready), r.emit("layoutready"), r.one("layoutstop", t.stop), r.emit("layoutstop"), this;
    }, Bi.prototype.stop = function() {
      return this;
    };
    var ug = {
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
      spacingFactor: void 0,
      // Applies a multiplicative factor (>0) to expand or compress the overall area that the nodes take up
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
    function jo(t) {
      this.options = He({}, ug, t);
    }
    jo.prototype.run = function() {
      var t = this.options, e = t.eles, r = e.nodes(), a = H(t.positions);
      function n(i) {
        if (t.positions == null)
          return cf(i.position());
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
    var fg = {
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
    function el(t) {
      this.options = He({}, fg, t);
    }
    el.prototype.run = function() {
      var t = this.options, e = t.cy, r = t.eles, a = Yt(t.boundingBox ? t.boundingBox : {
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
    var hg = [{
      name: "breadthfirst",
      impl: Xo
    }, {
      name: "circle",
      impl: Wo
    }, {
      name: "concentric",
      impl: qo
    }, {
      name: "cose",
      impl: Yn
    }, {
      name: "grid",
      impl: Jo
    }, {
      name: "null",
      impl: Bi
    }, {
      name: "preset",
      impl: jo
    }, {
      name: "random",
      impl: el
    }];
    function tl(t) {
      this.options = t, this.notifications = 0;
    }
    var rl = function() {
    }, al = function() {
      throw new Error("A headless instance can not render images");
    };
    tl.prototype = {
      recalculateRenderedStyle: rl,
      notify: function() {
        this.notifications++;
      },
      init: rl,
      isHeadless: function() {
        return !0;
      },
      png: al,
      jpg: al
    };
    var Fi = {};
    Fi.arrowShapeWidth = 0.3, Fi.registerArrowShapes = function() {
      var t = this.arrowShapes = {}, e = this, r = function(l, f, h, v, d, c, y) {
        var p = d.x - h / 2 - y, g = d.x + h / 2 + y, m = d.y - h / 2 - y, b = d.y + h / 2 + y, E = p <= l && l <= g && m <= f && f <= b;
        return E;
      }, a = function(l, f, h, v, d) {
        var c = l * Math.cos(v) - f * Math.sin(v), y = l * Math.sin(v) + f * Math.cos(v), p = c * h, g = y * h, m = p + d.x, b = g + d.y;
        return {
          x: m,
          y: b
        };
      }, n = function(l, f, h, v) {
        for (var d = [], c = 0; c < l.length; c += 2) {
          var y = l[c], p = l[c + 1];
          d.push(a(y, p, f, h, v));
        }
        return d;
      }, i = function(l) {
        for (var f = [], h = 0; h < l.length; h++) {
          var v = l[h];
          f.push(v.x, v.y);
        }
        return f;
      }, s = function(l) {
        return l.pstyle("width").pfValue * l.pstyle("arrow-scale").pfValue * 2;
      }, o = function(l, f) {
        ee(f) && (f = t[f]), t[l] = He({
          name: l,
          points: [-0.15, -0.3, 0.15, -0.3, 0.15, 0.3, -0.15, 0.3],
          collide: function(v, d, c, y, p, g) {
            var m = i(n(this.points, c + 2 * g, y, p)), b = Ht(v, d, m);
            return b;
          },
          roughCollide: r,
          draw: function(v, d, c, y) {
            var p = n(this.points, d, c, y);
            e.arrowShapeImpl("polygon")(v, p);
          },
          spacing: function(v) {
            return 0;
          },
          gap: s
        }, f);
      };
      o("none", {
        collide: fn,
        roughCollide: fn,
        draw: si,
        spacing: ds,
        gap: ds
      }), o("triangle", {
        points: [-0.15, -0.3, 0, 0, 0.15, -0.3]
      }), o("arrow", "triangle"), o("triangle-backcurve", {
        points: t.triangle.points,
        controlPoint: [0, -0.15],
        roughCollide: r,
        draw: function(l, f, h, v, d) {
          var c = n(this.points, f, h, v), y = this.controlPoint, p = a(y[0], y[1], f, h, v);
          e.arrowShapeImpl(this.name)(l, c, p);
        },
        gap: function(l) {
          return s(l) * 0.8;
        }
      }), o("triangle-tee", {
        points: [0, 0, 0.15, -0.3, -0.15, -0.3, 0, 0],
        pointsTee: [-0.15, -0.4, -0.15, -0.5, 0.15, -0.5, 0.15, -0.4],
        collide: function(l, f, h, v, d, c, y) {
          var p = i(n(this.points, h + 2 * y, v, d)), g = i(n(this.pointsTee, h + 2 * y, v, d)), m = Ht(l, f, p) || Ht(l, f, g);
          return m;
        },
        draw: function(l, f, h, v, d) {
          var c = n(this.points, f, h, v), y = n(this.pointsTee, f, h, v);
          e.arrowShapeImpl(this.name)(l, c, y);
        }
      }), o("circle-triangle", {
        radius: 0.15,
        pointsTr: [0, -0.15, 0.15, -0.45, -0.15, -0.45, 0, -0.15],
        collide: function(l, f, h, v, d, c, y) {
          var p = d, g = Math.pow(p.x - l, 2) + Math.pow(p.y - f, 2) <= Math.pow((h + 2 * y) * this.radius, 2), m = i(n(this.points, h + 2 * y, v, d));
          return Ht(l, f, m) || g;
        },
        draw: function(l, f, h, v, d) {
          var c = n(this.pointsTr, f, h, v);
          e.arrowShapeImpl(this.name)(l, c, v.x, v.y, this.radius * f);
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
          var h = this.baseCrossLinePts.slice(), v = f / l, d = 3, c = 5;
          return h[d] = h[d] - v, h[c] = h[c] - v, h;
        },
        collide: function(l, f, h, v, d, c, y) {
          var p = i(n(this.points, h + 2 * y, v, d)), g = i(n(this.crossLinePts(h, c), h + 2 * y, v, d)), m = Ht(l, f, p) || Ht(l, f, g);
          return m;
        },
        draw: function(l, f, h, v, d) {
          var c = n(this.points, f, h, v), y = n(this.crossLinePts(f, d), f, h, v);
          e.arrowShapeImpl(this.name)(l, c, y);
        }
      }), o("vee", {
        points: [-0.15, -0.3, 0, 0, 0.15, -0.3, 0, -0.15],
        gap: function(l) {
          return s(l) * 0.525;
        }
      }), o("circle", {
        radius: 0.15,
        collide: function(l, f, h, v, d, c, y) {
          var p = d, g = Math.pow(p.x - l, 2) + Math.pow(p.y - f, 2) <= Math.pow((h + 2 * y) * this.radius, 2);
          return g;
        },
        draw: function(l, f, h, v, d) {
          e.arrowShapeImpl(this.name)(l, v.x, v.y, this.radius * f);
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
    var $r = {};
    $r.projectIntoViewport = function(t, e) {
      var r = this.cy, a = this.findContainerClientCoords(), n = a[0], i = a[1], s = a[4], o = r.pan(), u = r.zoom(), l = ((t - n) / s - o.x) / u, f = ((e - i) / s - o.y) / u;
      return [l, f];
    }, $r.findContainerClientCoords = function() {
      if (this.containerBB)
        return this.containerBB;
      var t = this.container, e = t.getBoundingClientRect(), r = this.cy.window().getComputedStyle(t), a = function(g) {
        return parseFloat(r.getPropertyValue(g));
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
      }, s = t.clientWidth, o = t.clientHeight, u = n.left + n.right, l = n.top + n.bottom, f = i.left + i.right, h = e.width / (s + f), v = s - u, d = o - l, c = e.left + n.left + i.left, y = e.top + n.top + i.top;
      return this.containerBB = [c, y, v, d, h];
    }, $r.invalidateContainerClientCoordsCache = function() {
      this.containerBB = null;
    }, $r.findNearestElement = function(t, e, r, a) {
      return this.findNearestElements(t, e, r, a)[0];
    }, $r.findNearestElements = function(t, e, r, a) {
      var n = this, i = this, s = i.getCachedZSortedEles(), o = [], u = i.cy.zoom(), l = i.cy.hasCompoundNodes(), f = (a ? 24 : 8) / u, h = (a ? 8 : 2) / u, v = (a ? 8 : 2) / u, d = 1 / 0, c, y;
      r && (s = s.interactive);
      function p(w, k) {
        if (w.isNode()) {
          if (y)
            return;
          y = w, o.push(w);
        }
        if (w.isEdge() && (k == null || k < d))
          if (c) {
            if (c.pstyle("z-compound-depth").value === w.pstyle("z-compound-depth").value && c.pstyle("z-compound-depth").value === w.pstyle("z-compound-depth").value) {
              for (var D = 0; D < o.length; D++)
                if (o[D].isEdge()) {
                  o[D] = w, c = w, d = k ?? d;
                  break;
                }
            }
          } else
            o.push(w), c = w, d = k ?? d;
      }
      function g(w) {
        var k = w.outerWidth() + 2 * h, D = w.outerHeight() + 2 * h, F = k / 2, G = D / 2, N = w.position();
        if (N.x - F <= t && t <= N.x + F && N.y - G <= e && e <= N.y + G) {
          var X = i.nodeShapes[n.getNodeShape(w)];
          if (X.checkPoint(t, e, 0, k, D, N.x, N.y))
            return p(w, 0), !0;
        }
      }
      function m(w) {
        var k = w._private, D = k.rscratch, F = w.pstyle("width").pfValue, G = w.pstyle("arrow-scale").value, N = F / 2 + f, X = N * N, B = N * 2, ae = k.source, ue = k.target, re;
        if (D.edgeType === "segments" || D.edgeType === "straight" || D.edgeType === "haystack") {
          for (var K = D.allpts, W = 0; W + 3 < K.length; W += 2)
            if (Sf(t, e, K[W], K[W + 1], K[W + 2], K[W + 3], B) && X > (re = If(t, e, K[W], K[W + 1], K[W + 2], K[W + 3])))
              return p(w, re), !0;
        } else if (D.edgeType === "bezier" || D.edgeType === "multibezier" || D.edgeType === "self" || D.edgeType === "compound") {
          for (var K = D.allpts, W = 0; W + 5 < D.allpts.length; W += 4)
            if (Lf(t, e, K[W], K[W + 1], K[W + 2], K[W + 3], K[W + 4], K[W + 5], B) && X > (re = Nf(t, e, K[W], K[W + 1], K[W + 2], K[W + 3], K[W + 4], K[W + 5])))
              return p(w, re), !0;
        }
        for (var ae = ae || k.source, ue = ue || k.target, me = n.getArrowWidth(F, G), ie = [{
          name: "source",
          x: D.arrowStartX,
          y: D.arrowStartY,
          angle: D.srcArrowAngle
        }, {
          name: "target",
          x: D.arrowEndX,
          y: D.arrowEndY,
          angle: D.tgtArrowAngle
        }, {
          name: "mid-source",
          x: D.midX,
          y: D.midY,
          angle: D.midsrcArrowAngle
        }, {
          name: "mid-target",
          x: D.midX,
          y: D.midY,
          angle: D.midtgtArrowAngle
        }], W = 0; W < ie.length; W++) {
          var ge = ie[W], Ee = i.arrowShapes[w.pstyle(ge.name + "-arrow-shape").value], Ce = w.pstyle("width").pfValue;
          if (Ee.roughCollide(t, e, me, ge.angle, {
            x: ge.x,
            y: ge.y
          }, Ce, f) && Ee.collide(t, e, me, ge.angle, {
            x: ge.x,
            y: ge.y
          }, Ce, f))
            return p(w), !0;
        }
        l && o.length > 0 && (g(ae), g(ue));
      }
      function b(w, k, D) {
        return er(w, k, D);
      }
      function E(w, k) {
        var D = w._private, F = v, G;
        k ? G = k + "-" : G = "", w.boundingBox();
        var N = D.labelBounds[k || "main"], X = w.pstyle(G + "label").value, B = w.pstyle("text-events").strValue === "yes";
        if (!(!B || !X)) {
          var re = b(D.rscratch, "labelX", k), K = b(D.rscratch, "labelY", k), W = b(D.rscratch, "labelAngle", k), ae = w.pstyle(G + "text-margin-x").pfValue, ue = w.pstyle(G + "text-margin-y").pfValue, me = N.x1 - F - ae, ie = N.x2 + F - ae, ge = N.y1 - F - ue, Ee = N.y2 + F - ue;
          if (W) {
            var Ce = Math.cos(W), we = Math.sin(W), De = function(Xe, Ie) {
              return Xe = Xe - re, Ie = Ie - K, {
                x: Xe * Ce - Ie * we + re,
                y: Xe * we + Ie * Ce + K
              };
            }, se = De(me, ge), xe = De(me, Ee), Le = De(ie, ge), Se = De(ie, Ee), Oe = [
              // with the margin added after the rotation is applied
              se.x + ae,
              se.y + ue,
              Le.x + ae,
              Le.y + ue,
              Se.x + ae,
              Se.y + ue,
              xe.x + ae,
              xe.y + ue
            ];
            if (Ht(t, e, Oe))
              return p(w), !0;
          } else if (ta(N, t, e))
            return p(w), !0;
        }
      }
      for (var M = s.length - 1; M >= 0; M--) {
        var L = s[M];
        L.isNode() ? g(L) || E(L) : m(L) || E(L) || E(L, "source") || E(L, "target");
      }
      return o;
    }, $r.getAllInBox = function(t, e, r, a) {
      var n = this.getCachedZSortedEles().interactive, i = [], s = Math.min(t, r), o = Math.max(t, r), u = Math.min(e, a), l = Math.max(e, a);
      t = s, r = o, e = u, a = l;
      for (var f = Yt({
        x1: t,
        y1: e,
        x2: r,
        y2: a
      }), h = 0; h < n.length; h++) {
        var v = n[h];
        if (v.isNode()) {
          var d = v, c = d.boundingBox({
            includeNodes: !0,
            includeEdges: !1,
            includeLabels: !1
          });
          fi(f, c) && !Ts(c, f) && i.push(d);
        } else {
          var y = v, p = y._private, g = p.rscratch;
          if (g.startX != null && g.startY != null && !ta(f, g.startX, g.startY) || g.endX != null && g.endY != null && !ta(f, g.endX, g.endY))
            continue;
          if (g.edgeType === "bezier" || g.edgeType === "multibezier" || g.edgeType === "self" || g.edgeType === "compound" || g.edgeType === "segments" || g.edgeType === "haystack") {
            for (var m = p.rstyle.bezierPts || p.rstyle.linePts || p.rstyle.haystackPts, b = !0, E = 0; E < m.length; E++)
              if (!Df(f, m[E])) {
                b = !1;
                break;
              }
            b && i.push(y);
          } else
            (g.edgeType === "haystack" || g.edgeType === "straight") && i.push(y);
        }
      }
      return i;
    };
    var Xn = {};
    Xn.calculateArrowAngles = function(t) {
      var e = t._private.rscratch, r = e.edgeType === "haystack", a = e.edgeType === "bezier", n = e.edgeType === "multibezier", i = e.edgeType === "segments", s = e.edgeType === "compound", o = e.edgeType === "self", u, l, f, h, v, d, g, m;
      if (r ? (f = e.haystackPts[0], h = e.haystackPts[1], v = e.haystackPts[2], d = e.haystackPts[3]) : (f = e.arrowStartX, h = e.arrowStartY, v = e.arrowEndX, d = e.arrowEndY), g = e.midX, m = e.midY, i)
        u = f - e.segpts[0], l = h - e.segpts[1];
      else if (n || s || o || a) {
        var c = e.allpts, y = Lt(c[0], c[2], c[4], 0.1), p = Lt(c[1], c[3], c[5], 0.1);
        u = f - y, l = h - p;
      } else
        u = f - g, l = h - m;
      e.srcArrowAngle = cn(u, l);
      var g = e.midX, m = e.midY;
      if (r && (g = (f + v) / 2, m = (h + d) / 2), u = v - f, l = d - h, i) {
        var c = e.allpts;
        if (c.length / 2 % 2 === 0) {
          var b = c.length / 2, E = b - 2;
          u = c[b] - c[E], l = c[b + 1] - c[E + 1];
        } else {
          var b = c.length / 2 - 1, E = b - 2, M = b + 2;
          u = c[b] - c[E], l = c[b + 1] - c[E + 1];
        }
      } else if (n || s || o) {
        var c = e.allpts, L = e.ctrlpts, w, k, D, F;
        if (L.length / 2 % 2 === 0) {
          var G = c.length / 2 - 1, N = G + 2, X = N + 2;
          w = Lt(c[G], c[N], c[X], 0), k = Lt(c[G + 1], c[N + 1], c[X + 1], 0), D = Lt(c[G], c[N], c[X], 1e-4), F = Lt(c[G + 1], c[N + 1], c[X + 1], 1e-4);
        } else {
          var N = c.length / 2 - 1, G = N - 2, X = N + 2;
          w = Lt(c[G], c[N], c[X], 0.4999), k = Lt(c[G + 1], c[N + 1], c[X + 1], 0.4999), D = Lt(c[G], c[N], c[X], 0.5), F = Lt(c[G + 1], c[N + 1], c[X + 1], 0.5);
        }
        u = D - w, l = F - k;
      }
      if (e.midtgtArrowAngle = cn(u, l), e.midDispX = u, e.midDispY = l, u *= -1, l *= -1, i) {
        var c = e.allpts;
        if (c.length / 2 % 2 !== 0) {
          var b = c.length / 2 - 1, M = b + 2;
          u = -(c[M] - c[b]), l = -(c[M + 1] - c[b + 1]);
        }
      }
      if (e.midsrcArrowAngle = cn(u, l), i)
        u = v - e.segpts[e.segpts.length - 2], l = d - e.segpts[e.segpts.length - 1];
      else if (n || s || o || a) {
        var c = e.allpts, B = c.length, y = Lt(c[B - 6], c[B - 4], c[B - 2], 0.9), p = Lt(c[B - 5], c[B - 3], c[B - 1], 0.9);
        u = v - y, l = d - p;
      } else
        u = v - g, l = d - m;
      e.tgtArrowAngle = cn(u, l);
    }, Xn.getArrowWidth = Xn.getArrowHeight = function(t, e) {
      var r = this.arrowWidthCache = this.arrowWidthCache || {}, a = r[t + ", " + e];
      return a || (a = Math.max(Math.pow(t * 13.37, 0.9), 29) * e, r[t + ", " + e] = a, a);
    };
    var Vt = {};
    Vt.findMidptPtsEtc = function(t, e) {
      var r = e.posPts, a = e.intersectionPts, n = e.vectorNormInverse, i, s = t.pstyle("source-endpoint"), o = t.pstyle("target-endpoint"), u = s.units != null && o.units != null, l = function(M, L, w, k) {
        var D = k - L, F = w - M, G = Math.sqrt(F * F + D * D);
        return {
          x: -D / G,
          y: F / G
        };
      }, f = t.pstyle("edge-distances").value;
      switch (f) {
        case "node-position":
          i = r;
          break;
        case "intersection":
          i = a;
          break;
        case "endpoints": {
          if (u) {
            var h = this.manualEndptToPx(t.source()[0], s), v = x(h, 2), d = v[0], c = v[1], y = this.manualEndptToPx(t.target()[0], o), p = x(y, 2), g = p[0], m = p[1], b = {
              x1: d,
              y1: c,
              x2: g,
              y2: m
            };
            n = l(d, c, g, m), i = b;
          } else
            vt("Edge ".concat(t.id(), " has edge-distances:endpoints specified without manual endpoints specified via source-endpoint and target-endpoint.  Falling back on edge-distances:intersection (default).")), i = a;
          break;
        }
      }
      return {
        midptPts: i,
        vectorNormInverse: n
      };
    }, Vt.findHaystackPoints = function(t) {
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
        var s = a.source, o = a.target, u = s.position(), l = o.position(), f = s.width(), h = o.width(), v = s.height(), d = o.height(), c = r.pstyle("haystack-radius").value, y = c / 2;
        n.haystackPts = n.allpts = [n.source.x * f * y + u.x, n.source.y * v * y + u.y, n.target.x * h * y + l.x, n.target.y * d * y + l.y], n.midX = (n.allpts[0] + n.allpts[2]) / 2, n.midY = (n.allpts[1] + n.allpts[3]) / 2, n.edgeType = "haystack", n.haystack = !0, this.storeEdgeProjections(r), this.calculateArrowAngles(r), this.recalculateEdgeLabelProjections(r), this.calculateLabelAngles(r);
      }
    }, Vt.findSegmentsPoints = function(t, e) {
      var r = t._private.rscratch, a = t.pstyle("segment-weights"), n = t.pstyle("segment-distances"), i = Math.min(a.pfValue.length, n.pfValue.length);
      r.edgeType = "segments", r.segpts = [];
      for (var s = 0; s < i; s++) {
        var o = a.pfValue[s], u = n.pfValue[s], l = 1 - o, f = o, h = this.findMidptPtsEtc(t, e), v = h.midptPts, d = h.vectorNormInverse, c = {
          x: v.x1 * l + v.x2 * f,
          y: v.y1 * l + v.y2 * f
        };
        r.segpts.push(c.x + d.x * u, c.y + d.y * u);
      }
    }, Vt.findLoopPoints = function(t, e, r, a) {
      var n = t._private.rscratch, i = e.dirCounts, s = e.srcPos, o = t.pstyle("control-point-distances"), u = o ? o.pfValue[0] : void 0, l = t.pstyle("loop-direction").pfValue, f = t.pstyle("loop-sweep").pfValue, h = t.pstyle("control-point-step-size").pfValue;
      n.edgeType = "self";
      var v = r, d = h;
      a && (v = 0, d = u);
      var c = l - Math.PI / 2, y = c - f / 2, p = c + f / 2, g = l + "_" + f;
      v = i[g] === void 0 ? i[g] = 0 : ++i[g], n.ctrlpts = [s.x + Math.cos(y) * 1.4 * d * (v / 3 + 1), s.y + Math.sin(y) * 1.4 * d * (v / 3 + 1), s.x + Math.cos(p) * 1.4 * d * (v / 3 + 1), s.y + Math.sin(p) * 1.4 * d * (v / 3 + 1)];
    }, Vt.findCompoundLoopPoints = function(t, e, r, a) {
      var n = t._private.rscratch;
      n.edgeType = "compound";
      var i = e.srcPos, s = e.tgtPos, o = e.srcW, u = e.srcH, l = e.tgtW, f = e.tgtH, h = t.pstyle("control-point-step-size").pfValue, v = t.pstyle("control-point-distances"), d = v ? v.pfValue[0] : void 0, c = r, y = h;
      a && (c = 0, y = d);
      var p = 50, g = {
        x: i.x - o / 2,
        y: i.y - u / 2
      }, m = {
        x: s.x - l / 2,
        y: s.y - f / 2
      }, b = {
        x: Math.min(g.x, m.x),
        y: Math.min(g.y, m.y)
      }, E = 0.5, M = Math.max(E, Math.log(o * 0.01)), L = Math.max(E, Math.log(l * 0.01));
      n.ctrlpts = [b.x, b.y - (1 + Math.pow(p, 1.12) / 100) * y * (c / 3 + 1) * M, b.x - (1 + Math.pow(p, 1.12) / 100) * y * (c / 3 + 1) * L, b.y];
    }, Vt.findStraightEdgePoints = function(t) {
      t._private.rscratch.edgeType = "straight";
    }, Vt.findBezierPoints = function(t, e, r, a, n) {
      var i = t._private.rscratch, s = t.pstyle("control-point-step-size").pfValue, o = t.pstyle("control-point-distances"), u = t.pstyle("control-point-weights"), l = o && u ? Math.min(o.value.length, u.value.length) : 1, f = o ? o.pfValue[0] : void 0, h = u.value[0], v = a;
      i.edgeType = v ? "multibezier" : "bezier", i.ctrlpts = [];
      for (var d = 0; d < l; d++) {
        var c = (0.5 - e.eles.length / 2 + r) * s * (n ? -1 : 1), y = void 0, p = Es(c);
        v && (f = o ? o.pfValue[d] : s, h = u.value[d]), a ? y = f : y = f !== void 0 ? p * f : void 0;
        var g = y !== void 0 ? y : c, m = 1 - h, b = h, E = this.findMidptPtsEtc(t, e), M = E.midptPts, L = E.vectorNormInverse, w = {
          x: M.x1 * m + M.x2 * b,
          y: M.y1 * m + M.y2 * b
        };
        i.ctrlpts.push(w.x + L.x * g, w.y + L.y * g);
      }
    }, Vt.findTaxiPoints = function(t, e) {
      var r = t._private.rscratch;
      r.edgeType = "segments";
      var a = "vertical", n = "horizontal", i = "leftward", s = "rightward", o = "downward", u = "upward", l = "auto", f = e.posPts, h = e.srcW, v = e.srcH, d = e.tgtW, c = e.tgtH, y = t.pstyle("edge-distances").value, p = y !== "node-position", g = t.pstyle("taxi-direction").value, m = g, b = t.pstyle("taxi-turn"), E = b.units === "%", M = b.pfValue, L = M < 0, w = t.pstyle("taxi-turn-min-distance").pfValue, k = p ? (h + d) / 2 : 0, D = p ? (v + c) / 2 : 0, F = f.x2 - f.x1, G = f.y2 - f.y1, N = function(be, Ge) {
        return be > 0 ? Math.max(be - Ge, 0) : Math.min(be + Ge, 0);
      }, X = N(F, k), B = N(G, D), re = !1;
      m === l ? g = Math.abs(X) > Math.abs(B) ? n : a : m === u || m === o ? (g = a, re = !0) : (m === i || m === s) && (g = n, re = !0);
      var K = g === a, W = K ? B : X, ae = K ? G : F, ue = Es(ae), me = !1;
      !(re && (E || L)) && (m === o && ae < 0 || m === u && ae > 0 || m === i && ae > 0 || m === s && ae < 0) && (ue *= -1, W = ue * Math.abs(W), me = !0);
      var ie;
      if (E) {
        var ge = M < 0 ? 1 + M : M;
        ie = ge * W;
      } else {
        var Ee = M < 0 ? W : 0;
        ie = Ee + M * ue;
      }
      var Ce = function(be) {
        return Math.abs(be) < w || Math.abs(be) >= Math.abs(W);
      }, we = Ce(ie), De = Ce(Math.abs(W) - Math.abs(ie)), se = we || De;
      if (se && !me)
        if (K) {
          var xe = Math.abs(ae) <= v / 2, Le = Math.abs(F) <= d / 2;
          if (xe) {
            var Se = (f.x1 + f.x2) / 2, Oe = f.y1, Fe = f.y2;
            r.segpts = [Se, Oe, Se, Fe];
          } else if (Le) {
            var Xe = (f.y1 + f.y2) / 2, Ie = f.x1, Me = f.x2;
            r.segpts = [Ie, Xe, Me, Xe];
          } else
            r.segpts = [f.x1, f.y2];
        } else {
          var Ue = Math.abs(ae) <= h / 2, ze = Math.abs(G) <= c / 2;
          if (Ue) {
            var Be = (f.y1 + f.y2) / 2, $e = f.x1, rt = f.x2;
            r.segpts = [$e, Be, rt, Be];
          } else if (ze) {
            var je = (f.x1 + f.x2) / 2, We = f.y1, et = f.y2;
            r.segpts = [je, We, je, et];
          } else
            r.segpts = [f.x2, f.y1];
        }
      else if (K) {
        var he = f.y1 + ie + (p ? v / 2 * ue : 0), O = f.x1, oe = f.x2;
        r.segpts = [O, he, oe, he];
      } else {
        var Te = f.x1 + ie + (p ? h / 2 * ue : 0), ce = f.y1, ye = f.y2;
        r.segpts = [Te, ce, Te, ye];
      }
    }, Vt.tryToCorrectInvalidPoints = function(t, e) {
      var r = t._private.rscratch;
      if (r.edgeType === "bezier") {
        var a = e.srcPos, n = e.tgtPos, i = e.srcW, s = e.srcH, o = e.tgtW, u = e.tgtH, l = e.srcShape, f = e.tgtShape, h = !R(r.startX) || !R(r.startY), v = !R(r.arrowStartX) || !R(r.arrowStartY), d = !R(r.endX) || !R(r.endY), c = !R(r.arrowEndX) || !R(r.arrowEndY), y = 3, p = this.getArrowWidth(t.pstyle("width").pfValue, t.pstyle("arrow-scale").value) * this.arrowShapeWidth, g = y * p, m = Br({
          x: r.ctrlpts[0],
          y: r.ctrlpts[1]
        }, {
          x: r.startX,
          y: r.startY
        }), b = m < g, E = Br({
          x: r.ctrlpts[0],
          y: r.ctrlpts[1]
        }, {
          x: r.endX,
          y: r.endY
        }), M = E < g, L = !1;
        if (h || v || b) {
          L = !0;
          var w = {
            // delta
            x: r.ctrlpts[0] - a.x,
            y: r.ctrlpts[1] - a.y
          }, k = Math.sqrt(w.x * w.x + w.y * w.y), D = {
            // normalised delta
            x: w.x / k,
            y: w.y / k
          }, F = Math.max(i, s), G = {
            // *2 radius guarantees outside shape
            x: r.ctrlpts[0] + D.x * 2 * F,
            y: r.ctrlpts[1] + D.y * 2 * F
          }, N = l.intersectLine(a.x, a.y, i, s, G.x, G.y, 0);
          b ? (r.ctrlpts[0] = r.ctrlpts[0] + D.x * (g - m), r.ctrlpts[1] = r.ctrlpts[1] + D.y * (g - m)) : (r.ctrlpts[0] = N[0] + D.x * g, r.ctrlpts[1] = N[1] + D.y * g);
        }
        if (d || c || M) {
          L = !0;
          var X = {
            // delta
            x: r.ctrlpts[0] - n.x,
            y: r.ctrlpts[1] - n.y
          }, B = Math.sqrt(X.x * X.x + X.y * X.y), re = {
            // normalised delta
            x: X.x / B,
            y: X.y / B
          }, K = Math.max(i, s), W = {
            // *2 radius guarantees outside shape
            x: r.ctrlpts[0] + re.x * 2 * K,
            y: r.ctrlpts[1] + re.y * 2 * K
          }, ae = f.intersectLine(n.x, n.y, o, u, W.x, W.y, 0);
          M ? (r.ctrlpts[0] = r.ctrlpts[0] + re.x * (g - E), r.ctrlpts[1] = r.ctrlpts[1] + re.y * (g - E)) : (r.ctrlpts[0] = ae[0] + re.x * g, r.ctrlpts[1] = ae[1] + re.y * g);
        }
        L && this.findEndpoints(t);
      }
    }, Vt.storeAllpts = function(t) {
      var e = t._private.rscratch;
      if (e.edgeType === "multibezier" || e.edgeType === "bezier" || e.edgeType === "self" || e.edgeType === "compound") {
        e.allpts = [], e.allpts.push(e.startX, e.startY);
        for (var r = 0; r + 1 < e.ctrlpts.length; r += 2)
          e.allpts.push(e.ctrlpts[r], e.ctrlpts[r + 1]), r + 3 < e.ctrlpts.length && e.allpts.push((e.ctrlpts[r] + e.ctrlpts[r + 2]) / 2, (e.ctrlpts[r + 1] + e.ctrlpts[r + 3]) / 2);
        e.allpts.push(e.endX, e.endY);
        var a, n;
        e.ctrlpts.length / 2 % 2 === 0 ? (a = e.allpts.length / 2 - 1, e.midX = e.allpts[a], e.midY = e.allpts[a + 1]) : (a = e.allpts.length / 2 - 3, n = 0.5, e.midX = Lt(e.allpts[a], e.allpts[a + 2], e.allpts[a + 4], n), e.midY = Lt(e.allpts[a + 1], e.allpts[a + 3], e.allpts[a + 5], n));
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
    }, Vt.checkForInvalidEdgeWarning = function(t) {
      var e = t[0]._private.rscratch;
      e.nodesOverlap || R(e.startX) && R(e.startY) && R(e.endX) && R(e.endY) ? e.loggedErr = !1 : e.loggedErr || (e.loggedErr = !0, vt("Edge `" + t.id() + "` has invalid endpoints and so it is impossible to draw.  Adjust your edge style (e.g. control points) accordingly or use an alternative edge type.  This is expected behaviour when the source node and the target node overlap."));
    }, Vt.findEdgeControlPoints = function(t) {
      var e = this;
      if (!(!t || t.length === 0)) {
        for (var r = this, a = r.cy, n = a.hasCompoundNodes(), i = {
          map: new ur(),
          get: function(w) {
            var k = this.map.get(w[0]);
            return k != null ? k.get(w[1]) : null;
          },
          set: function(w, k) {
            var D = this.map.get(w[0]);
            D == null && (D = new ur(), this.map.set(w[0], D)), D.set(w[1], k);
          }
        }, s = [], o = [], u = 0; u < t.length; u++) {
          var l = t[u], f = l._private, h = l.pstyle("curve-style").value;
          if (!(l.removed() || !l.takesUpSpace())) {
            if (h === "haystack") {
              o.push(l);
              continue;
            }
            var v = h === "unbundled-bezier" || h === "segments" || h === "straight" || h === "straight-triangle" || h === "taxi", d = h === "unbundled-bezier" || h === "bezier", c = f.source, y = f.target, p = c.poolIndex(), g = y.poolIndex(), m = [p, g].sort(), b = i.get(m);
            b == null && (b = {
              eles: []
            }, i.set(m, b), s.push(m)), b.eles.push(l), v && (b.hasUnbundled = !0), d && (b.hasBezier = !0);
          }
        }
        for (var E = function(w) {
          var k = s[w], D = i.get(k), F = void 0;
          if (!D.hasUnbundled) {
            var G = D.eles[0].parallelEdges().filter(function(et) {
              return et.isBundledBezier();
            });
            oi(D.eles), G.forEach(function(et) {
              return D.eles.push(et);
            }), D.eles.sort(function(et, he) {
              return et.poolIndex() - he.poolIndex();
            });
          }
          var N = D.eles[0], X = N.source(), B = N.target();
          if (X.poolIndex() > B.poolIndex()) {
            var re = X;
            X = B, B = re;
          }
          var K = D.srcPos = X.position(), W = D.tgtPos = B.position(), ae = D.srcW = X.outerWidth(), ue = D.srcH = X.outerHeight(), me = D.tgtW = B.outerWidth(), ie = D.tgtH = B.outerHeight(), ge = D.srcShape = r.nodeShapes[e.getNodeShape(X)], Ee = D.tgtShape = r.nodeShapes[e.getNodeShape(B)];
          D.dirCounts = {
            north: 0,
            west: 0,
            south: 0,
            east: 0,
            northwest: 0,
            southwest: 0,
            northeast: 0,
            southeast: 0
          };
          for (var Ce = 0; Ce < D.eles.length; Ce++) {
            var we = D.eles[Ce], De = we[0]._private.rscratch, se = we.pstyle("curve-style").value, xe = se === "unbundled-bezier" || se === "segments" || se === "taxi", Le = !X.same(we.source());
            if (!D.calculatedIntersection && X !== B && (D.hasBezier || D.hasUnbundled)) {
              D.calculatedIntersection = !0;
              var Se = ge.intersectLine(K.x, K.y, ae, ue, W.x, W.y, 0), Oe = D.srcIntn = Se, Fe = Ee.intersectLine(W.x, W.y, me, ie, K.x, K.y, 0), Xe = D.tgtIntn = Fe, Ie = D.intersectionPts = {
                x1: Se[0],
                x2: Fe[0],
                y1: Se[1],
                y2: Fe[1]
              }, Me = D.posPts = {
                x1: K.x,
                x2: W.x,
                y1: K.y,
                y2: W.y
              }, Ue = Fe[1] - Se[1], ze = Fe[0] - Se[0], Be = Math.sqrt(ze * ze + Ue * Ue), $e = D.vector = {
                x: ze,
                y: Ue
              }, rt = D.vectorNorm = {
                x: $e.x / Be,
                y: $e.y / Be
              }, je = {
                x: -rt.y,
                y: rt.x
              };
              D.nodesOverlap = !R(Be) || Ee.checkPoint(Se[0], Se[1], 0, me, ie, W.x, W.y) || ge.checkPoint(Fe[0], Fe[1], 0, ae, ue, K.x, K.y), D.vectorNormInverse = je, F = {
                nodesOverlap: D.nodesOverlap,
                dirCounts: D.dirCounts,
                calculatedIntersection: !0,
                hasBezier: D.hasBezier,
                hasUnbundled: D.hasUnbundled,
                eles: D.eles,
                srcPos: W,
                tgtPos: K,
                srcW: me,
                srcH: ie,
                tgtW: ae,
                tgtH: ue,
                srcIntn: Xe,
                tgtIntn: Oe,
                srcShape: Ee,
                tgtShape: ge,
                posPts: {
                  x1: Me.x2,
                  y1: Me.y2,
                  x2: Me.x1,
                  y2: Me.y1
                },
                intersectionPts: {
                  x1: Ie.x2,
                  y1: Ie.y2,
                  x2: Ie.x1,
                  y2: Ie.y1
                },
                vector: {
                  x: -$e.x,
                  y: -$e.y
                },
                vectorNorm: {
                  x: -rt.x,
                  y: -rt.y
                },
                vectorNormInverse: {
                  x: -je.x,
                  y: -je.y
                }
              };
            }
            var We = Le ? F : D;
            De.nodesOverlap = We.nodesOverlap, De.srcIntn = We.srcIntn, De.tgtIntn = We.tgtIntn, n && (X.isParent() || X.isChild() || B.isParent() || B.isChild()) && (X.parents().anySame(B) || B.parents().anySame(X) || X.same(B) && X.isParent()) ? e.findCompoundLoopPoints(we, We, Ce, xe) : X === B ? e.findLoopPoints(we, We, Ce, xe) : se === "segments" ? e.findSegmentsPoints(we, We) : se === "taxi" ? e.findTaxiPoints(we, We) : se === "straight" || !xe && D.eles.length % 2 === 1 && Ce === Math.floor(D.eles.length / 2) ? e.findStraightEdgePoints(we) : e.findBezierPoints(we, We, Ce, xe, Le), e.findEndpoints(we), e.tryToCorrectInvalidPoints(we, We), e.checkForInvalidEdgeWarning(we), e.storeAllpts(we), e.storeEdgeProjections(we), e.calculateArrowAngles(we), e.recalculateEdgeLabelProjections(we), e.calculateLabelAngles(we);
          }
        }, M = 0; M < s.length; M++)
          E(M);
        this.findHaystackPoints(o);
      }
    };
    function nl(t) {
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
    Vt.getSegmentPoints = function(t) {
      var e = t[0]._private.rscratch, r = e.edgeType;
      if (r === "segments")
        return this.recalculateRenderedStyle(t), nl(e.segpts);
    }, Vt.getControlPoints = function(t) {
      var e = t[0]._private.rscratch, r = e.edgeType;
      if (r === "bezier" || r === "multibezier" || r === "self" || r === "compound")
        return this.recalculateRenderedStyle(t), nl(e.ctrlpts);
    }, Vt.getEdgeMidpoint = function(t) {
      var e = t[0]._private.rscratch;
      return this.recalculateRenderedStyle(t), {
        x: e.midX,
        y: e.midY
      };
    };
    var Qa = {};
    Qa.manualEndptToPx = function(t, e) {
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
    }, Qa.findEndpoints = function(t) {
      var e = this, r, a = t.source()[0], n = t.target()[0], i = a.position(), s = n.position(), o = t.pstyle("target-arrow-shape").value, u = t.pstyle("source-arrow-shape").value, l = t.pstyle("target-distance-from-node").pfValue, f = t.pstyle("source-distance-from-node").pfValue, h = t.pstyle("curve-style").value, v = t._private.rscratch, d = v.edgeType, c = h === "taxi", y = d === "self" || d === "compound", p = d === "bezier" || d === "multibezier" || y, g = d !== "bezier", m = d === "straight" || d === "segments", b = d === "segments", E = p || g || m, M = y || c, L = t.pstyle("source-endpoint"), w = M ? "outside-to-node" : L.value, k = t.pstyle("target-endpoint"), D = M ? "outside-to-node" : k.value;
      v.srcManEndpt = L, v.tgtManEndpt = k;
      var F, G, N, X;
      if (p) {
        var B = [v.ctrlpts[0], v.ctrlpts[1]], re = g ? [v.ctrlpts[v.ctrlpts.length - 2], v.ctrlpts[v.ctrlpts.length - 1]] : B;
        F = re, G = B;
      } else if (m) {
        var K = b ? v.segpts.slice(0, 2) : [s.x, s.y], W = b ? v.segpts.slice(v.segpts.length - 2) : [i.x, i.y];
        F = W, G = K;
      }
      if (D === "inside-to-node")
        r = [s.x, s.y];
      else if (k.units)
        r = this.manualEndptToPx(n, k);
      else if (D === "outside-to-line")
        r = v.tgtIntn;
      else if (D === "outside-to-node" || D === "outside-to-node-or-label" ? N = F : (D === "outside-to-line" || D === "outside-to-line-or-label") && (N = [i.x, i.y]), r = e.nodeShapes[this.getNodeShape(n)].intersectLine(s.x, s.y, n.outerWidth(), n.outerHeight(), N[0], N[1], 0), D === "outside-to-node-or-label" || D === "outside-to-line-or-label") {
        var ae = n._private.rscratch, ue = ae.labelWidth, me = ae.labelHeight, ie = ae.labelX, ge = ae.labelY, Ee = ue / 2, Ce = me / 2, we = n.pstyle("text-valign").value;
        we === "top" ? ge -= Ce : we === "bottom" && (ge += Ce);
        var De = n.pstyle("text-halign").value;
        De === "left" ? ie -= Ee : De === "right" && (ie += Ee);
        var se = Ba(N[0], N[1], [ie - Ee, ge - Ce, ie + Ee, ge - Ce, ie + Ee, ge + Ce, ie - Ee, ge + Ce], s.x, s.y);
        if (se.length > 0) {
          var xe = i, Le = Fr(xe, jr(r)), Se = Fr(xe, jr(se)), Oe = Le;
          if (Se < Le && (r = se, Oe = Se), se.length > 2) {
            var Fe = Fr(xe, {
              x: se[2],
              y: se[3]
            });
            Fe < Oe && (r = [se[2], se[3]]);
          }
        }
      }
      var Xe = mn(r, F, e.arrowShapes[o].spacing(t) + l), Ie = mn(r, F, e.arrowShapes[o].gap(t) + l);
      if (v.endX = Ie[0], v.endY = Ie[1], v.arrowEndX = Xe[0], v.arrowEndY = Xe[1], w === "inside-to-node")
        r = [i.x, i.y];
      else if (L.units)
        r = this.manualEndptToPx(a, L);
      else if (w === "outside-to-line")
        r = v.srcIntn;
      else if (w === "outside-to-node" || w === "outside-to-node-or-label" ? X = G : (w === "outside-to-line" || w === "outside-to-line-or-label") && (X = [s.x, s.y]), r = e.nodeShapes[this.getNodeShape(a)].intersectLine(i.x, i.y, a.outerWidth(), a.outerHeight(), X[0], X[1], 0), w === "outside-to-node-or-label" || w === "outside-to-line-or-label") {
        var Me = a._private.rscratch, Ue = Me.labelWidth, ze = Me.labelHeight, Be = Me.labelX, $e = Me.labelY, rt = Ue / 2, je = ze / 2, We = a.pstyle("text-valign").value;
        We === "top" ? $e -= je : We === "bottom" && ($e += je);
        var et = a.pstyle("text-halign").value;
        et === "left" ? Be -= rt : et === "right" && (Be += rt);
        var he = Ba(X[0], X[1], [Be - rt, $e - je, Be + rt, $e - je, Be + rt, $e + je, Be - rt, $e + je], i.x, i.y);
        if (he.length > 0) {
          var O = s, oe = Fr(O, jr(r)), Te = Fr(O, jr(he)), ce = oe;
          if (Te < oe && (r = [he[0], he[1]], ce = Te), he.length > 2) {
            var ye = Fr(O, {
              x: he[2],
              y: he[3]
            });
            ye < ce && (r = [he[2], he[3]]);
          }
        }
      }
      var _e = mn(r, G, e.arrowShapes[u].spacing(t) + f), be = mn(r, G, e.arrowShapes[u].gap(t) + f);
      v.startX = be[0], v.startY = be[1], v.arrowStartX = _e[0], v.arrowStartY = _e[1], E && (!R(v.startX) || !R(v.startY) || !R(v.endX) || !R(v.endY) ? v.badLine = !0 : v.badLine = !1);
    }, Qa.getSourceEndpoint = function(t) {
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
    }, Qa.getTargetEndpoint = function(t) {
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
    var Gi = {};
    function vg(t, e, r) {
      for (var a = function(l, f, h, v) {
        return Lt(l, f, h, v);
      }, n = e._private, i = n.rstyle.bezierPts, s = 0; s < t.bezierProjPcts.length; s++) {
        var o = t.bezierProjPcts[s];
        i.push({
          x: a(r[0], r[2], r[4], o),
          y: a(r[1], r[3], r[5], o)
        });
      }
    }
    Gi.storeEdgeProjections = function(t) {
      var e = t._private, r = e.rscratch, a = r.edgeType;
      if (e.rstyle.bezierPts = null, e.rstyle.linePts = null, e.rstyle.haystackPts = null, a === "multibezier" || a === "bezier" || a === "self" || a === "compound") {
        e.rstyle.bezierPts = [];
        for (var n = 0; n + 5 < r.allpts.length; n += 4)
          vg(this, t, r.allpts.slice(n, n + 6));
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
    }, Gi.recalculateEdgeProjections = function(t) {
      this.findEdgeControlPoints(t);
    };
    var hr = {};
    hr.recalculateNodeLabelProjection = function(t) {
      var e = t.pstyle("label").strValue;
      if (!Re(e)) {
        var r, a, n = t._private, i = t.width(), s = t.height(), o = t.padding(), u = t.position(), l = t.pstyle("text-halign").strValue, f = t.pstyle("text-valign").strValue, h = n.rscratch, v = n.rstyle;
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
        h.labelX = r, h.labelY = a, v.labelX = r, v.labelY = a, this.calculateLabelAngles(t), this.applyLabelDimensions(t);
      }
    };
    var il = function(e, r) {
      var a = Math.atan(r / e);
      return e === 0 && a < 0 && (a = a * -1), a;
    }, sl = function(e, r) {
      var a = r.x - e.x, n = r.y - e.y;
      return il(a, n);
    }, cg = function(e, r, a, n) {
      var i = ka(0, n - 1e-3, 1), s = ka(0, n + 1e-3, 1), o = ea(e, r, a, i), u = ea(e, r, a, s);
      return sl(o, u);
    };
    hr.recalculateEdgeLabelProjections = function(t) {
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
        var s = function(h, v, d) {
          Tr(r.rscratch, h, v, d), Tr(r.rstyle, h, v, d);
        };
        s("labelX", null, e.x), s("labelY", null, e.y);
        var o = il(a.midDispX, a.midDispY);
        s("labelAutoAngle", null, o);
        var u = function f() {
          if (f.cache)
            return f.cache;
          for (var h = [], v = 0; v + 5 < a.allpts.length; v += 4) {
            var d = {
              x: a.allpts[v],
              y: a.allpts[v + 1]
            }, c = {
              x: a.allpts[v + 2],
              y: a.allpts[v + 3]
            }, y = {
              x: a.allpts[v + 4],
              y: a.allpts[v + 5]
            };
            h.push({
              p0: d,
              p1: c,
              p2: y,
              startDist: 0,
              length: 0,
              segments: []
            });
          }
          var p = r.rstyle.bezierPts, g = n.bezierProjPcts.length;
          function m(w, k, D, F, G) {
            var N = Br(k, D), X = w.segments[w.segments.length - 1], B = {
              p0: k,
              p1: D,
              t0: F,
              t1: G,
              startDist: X ? X.startDist + X.length : 0,
              length: N
            };
            w.segments.push(B), w.length += N;
          }
          for (var b = 0; b < h.length; b++) {
            var E = h[b], M = h[b - 1];
            M && (E.startDist = M.startDist + M.length), m(E, E.p0, p[b * g], 0, n.bezierProjPcts[0]);
            for (var L = 0; L < g - 1; L++)
              m(E, p[b * g + L], p[b * g + L + 1], n.bezierProjPcts[L], n.bezierProjPcts[L + 1]);
            m(E, p[b * g + g - 1], E.p2, n.bezierProjPcts[g - 1], 1);
          }
          return f.cache = h;
        }, l = function(h) {
          var v, d = h === "source";
          if (i[h]) {
            var c = t.pstyle(h + "-text-offset").pfValue;
            switch (a.edgeType) {
              case "self":
              case "compound":
              case "bezier":
              case "multibezier": {
                for (var y = u(), p, g = 0, m = 0, b = 0; b < y.length; b++) {
                  for (var E = y[d ? b : y.length - 1 - b], M = 0; M < E.segments.length; M++) {
                    var L = E.segments[d ? M : E.segments.length - 1 - M], w = b === y.length - 1 && M === E.segments.length - 1;
                    if (g = m, m += L.length, m >= c || w) {
                      p = {
                        cp: E,
                        segment: L
                      };
                      break;
                    }
                  }
                  if (p)
                    break;
                }
                var k = p.cp, D = p.segment, F = (c - g) / D.length, G = D.t1 - D.t0, N = d ? D.t0 + G * F : D.t1 - G * F;
                N = ka(0, N, 1), e = ea(k.p0, k.p1, k.p2, N), v = cg(k.p0, k.p1, k.p2, N);
                break;
              }
              case "straight":
              case "segments":
              case "haystack": {
                for (var X = 0, B, re, K, W, ae = a.allpts.length, ue = 0; ue + 3 < ae && (d ? (K = {
                  x: a.allpts[ue],
                  y: a.allpts[ue + 1]
                }, W = {
                  x: a.allpts[ue + 2],
                  y: a.allpts[ue + 3]
                }) : (K = {
                  x: a.allpts[ae - 2 - ue],
                  y: a.allpts[ae - 1 - ue]
                }, W = {
                  x: a.allpts[ae - 4 - ue],
                  y: a.allpts[ae - 3 - ue]
                }), B = Br(K, W), re = X, X += B, !(X >= c)); ue += 2)
                  ;
                var me = c - re, ie = me / B;
                ie = ka(0, ie, 1), e = Ef(K, W, ie), v = sl(K, W);
                break;
              }
            }
            s("labelX", h, e.x), s("labelY", h, e.y), s("labelAutoAngle", h, v);
          }
        };
        l("source"), l("target"), this.applyLabelDimensions(t);
      }
    }, hr.applyLabelDimensions = function(t) {
      this.applyPrefixedLabelDimensions(t), t.isEdge() && (this.applyPrefixedLabelDimensions(t, "source"), this.applyPrefixedLabelDimensions(t, "target"));
    }, hr.applyPrefixedLabelDimensions = function(t, e) {
      var r = t._private, a = this.getLabelText(t, e), n = this.calculateLabelDimensions(t, a), i = t.pstyle("line-height").pfValue, s = t.pstyle("text-wrap").strValue, o = er(r.rscratch, "labelWrapCachedLines", e) || [], u = s !== "wrap" ? 1 : Math.max(o.length, 1), l = n.height / u, f = l * i, h = n.width, v = n.height + (u - 1) * (i - 1) * l;
      Tr(r.rstyle, "labelWidth", e, h), Tr(r.rscratch, "labelWidth", e, h), Tr(r.rstyle, "labelHeight", e, v), Tr(r.rscratch, "labelHeight", e, v), Tr(r.rscratch, "labelLineHeight", e, f);
    }, hr.getLabelText = function(t, e) {
      var r = t._private, a = e ? e + "-" : "", n = t.pstyle(a + "label").strValue, i = t.pstyle("text-transform").value, s = function(me, ie) {
        return ie ? (Tr(r.rscratch, me, e, ie), ie) : er(r.rscratch, me, e);
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
`), h = t.pstyle("text-max-width").pfValue, v = t.pstyle("text-overflow-wrap").value, d = v === "anywhere", c = [], y = /[\s\u200b]+/, p = d ? "" : " ", g = 0; g < f.length; g++) {
          var m = f[g], b = this.calculateLabelDimensions(t, m), E = b.width;
          if (d) {
            var M = m.split("").join(l);
            m = M;
          }
          if (E > h) {
            for (var L = m.split(y), w = "", k = 0; k < L.length; k++) {
              var D = L[k], F = w.length === 0 ? D : w + p + D, G = this.calculateLabelDimensions(t, F), N = G.width;
              N <= h ? w += D + p : (w && c.push(w), w = D + p);
            }
            w.match(/^[\s\u200b]+$/) || c.push(w);
          } else
            c.push(m);
        }
        s("labelWrapCachedLines", c), n = s("labelWrapCachedText", c.join(`
`)), s("labelWrapKey", u);
      } else if (o === "ellipsis") {
        var X = t.pstyle("text-max-width").pfValue, B = "", re = "…", K = !1;
        if (this.calculateLabelDimensions(t, n).width < X)
          return n;
        for (var W = 0; W < n.length; W++) {
          var ae = this.calculateLabelDimensions(t, B + n[W] + re).width;
          if (ae > X)
            break;
          B += n[W], W === n.length - 1 && (K = !0);
        }
        return K || (B += re), B;
      }
      return n;
    }, hr.getLabelJustification = function(t) {
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
    }, hr.calculateLabelDimensions = function(t, e) {
      var r = this, a = Pr(e, t._private.labelDimsKey), n = r.labelDimCache || (r.labelDimCache = []), i = n[a];
      if (i != null)
        return i;
      var s = 0, o = t.pstyle("font-style").strValue, u = t.pstyle("font-size").pfValue, l = t.pstyle("font-family").strValue, f = t.pstyle("font-weight").strValue, h = this.labelCalcCanvas, v = this.labelCalcCanvasContext;
      if (!h) {
        h = this.labelCalcCanvas = document.createElement("canvas"), v = this.labelCalcCanvasContext = h.getContext("2d");
        var d = h.style;
        d.position = "absolute", d.left = "-9999px", d.top = "-9999px", d.zIndex = "-1", d.visibility = "hidden", d.pointerEvents = "none";
      }
      v.font = "".concat(o, " ").concat(f, " ").concat(u, "px ").concat(l);
      for (var c = 0, y = 0, p = e.split(`
`), g = 0; g < p.length; g++) {
        var m = p[g], b = v.measureText(m), E = Math.ceil(b.width), M = u;
        c = Math.max(E, c), y += M;
      }
      return c += s, y += s, n[a] = {
        width: c,
        height: y
      };
    }, hr.calculateLabelAngle = function(t, e) {
      var r = t._private, a = r.rscratch, n = t.isEdge(), i = e ? e + "-" : "", s = t.pstyle(i + "text-rotation"), o = s.strValue;
      return o === "none" ? 0 : n && o === "autorotate" ? a.labelAutoAngle : o === "autorotate" ? 0 : s.pfValue;
    }, hr.calculateLabelAngles = function(t) {
      var e = this, r = t.isEdge(), a = t._private, n = a.rscratch;
      n.labelAngle = e.calculateLabelAngle(t), r && (n.sourceLabelAngle = e.calculateLabelAngle(t, "source"), n.targetLabelAngle = e.calculateLabelAngle(t, "target"));
    };
    var ol = {}, ll = 28, ul = !1;
    ol.getNodeShape = function(t) {
      var e = this, r = t.pstyle("shape").value;
      if (r === "cutrectangle" && (t.width() < ll || t.height() < ll))
        return ul || (vt("The `cutrectangle` node shape can not be used at small sizes so `rectangle` is used instead"), ul = !0), "rectangle";
      if (t.isParent())
        return r === "rectangle" || r === "roundrectangle" || r === "round-rectangle" || r === "cutrectangle" || r === "cut-rectangle" || r === "barrel" ? r : "rectangle";
      if (r === "polygon") {
        var a = t.pstyle("shape-polygon-points").value;
        return e.nodeShapes.makePolygon(a).name;
      }
      return r;
    };
    var Wn = {};
    Wn.registerCalculationListeners = function() {
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
              var v = o[h];
              v(s, e);
            }
          r.recalculateRenderedStyle(e), e = t.collection();
        }
      };
      r.flushRenderedStyleQueue = function() {
        n(!0);
      }, r.beforeRender(n, r.beforeRenderPriorities.eleCalcs);
    }, Wn.onUpdateEleCalcs = function(t) {
      var e = this.onUpdateEleCalcsFns = this.onUpdateEleCalcsFns || [];
      e.push(t);
    }, Wn.recalculateRenderedStyle = function(t, e) {
      var r = function(E) {
        return E._private.rstyle.cleanConnected;
      }, a = [], n = [];
      if (!this.destroyed) {
        e === void 0 && (e = !0);
        for (var i = 0; i < t.length; i++) {
          var s = t[i], o = s._private, u = o.rstyle;
          s.isEdge() && (!r(s.source()) || !r(s.target())) && (u.clean = !1), !(e && u.clean || s.removed()) && s.pstyle("display").value !== "none" && (o.group === "nodes" ? n.push(s) : a.push(s), u.clean = !0);
        }
        for (var l = 0; l < n.length; l++) {
          var f = n[l], h = f._private, v = h.rstyle, d = f.position();
          this.recalculateNodeLabelProjection(f), v.nodeX = d.x, v.nodeY = d.y, v.nodeW = f.pstyle("width").pfValue, v.nodeH = f.pstyle("height").pfValue;
        }
        this.recalculateEdgeProjections(a);
        for (var c = 0; c < a.length; c++) {
          var y = a[c], p = y._private, g = p.rstyle, m = p.rscratch;
          g.srcX = m.arrowStartX, g.srcY = m.arrowStartY, g.tgtX = m.arrowEndX, g.tgtY = m.arrowEndY, g.midX = m.midX, g.midY = m.midY, g.labelAngle = m.labelAngle, g.sourceLabelAngle = m.sourceLabelAngle, g.targetLabelAngle = m.targetLabelAngle;
        }
      }
    };
    var qn = {};
    qn.updateCachedGrabbedEles = function() {
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
    }, qn.invalidateCachedZSortedEles = function() {
      this.cachedZSortedEles = null;
    }, qn.getCachedZSortedEles = function(t) {
      if (t || !this.cachedZSortedEles) {
        var e = this.cy.mutableElements().toArray();
        e.sort(Mo), e.interactive = e.filter(function(r) {
          return r.interactive();
        }), this.cachedZSortedEles = e, this.updateCachedGrabbedEles();
      } else
        e = this.cachedZSortedEles;
      return e;
    };
    var fl = {};
    [$r, Xn, Vt, Qa, Gi, hr, ol, Wn, qn].forEach(function(t) {
      He(fl, t);
    });
    var hl = {};
    hl.getCachedImage = function(t, e, r) {
      var a = this, n = a.imageCache = a.imageCache || {}, i = n[t];
      if (i)
        return i.image.complete || i.image.addEventListener("load", r), i.image;
      i = n[t] = n[t] || {};
      var s = i.image = new Image();
      s.addEventListener("load", r), s.addEventListener("error", function() {
        s.error = !0;
      });
      var o = "data:", u = t.substring(0, o.length).toLowerCase() === o;
      return u || (e = e === "null" ? null : e, s.crossOrigin = e), s.src = t, s;
    };
    var ya = {};
    ya.registerBinding = function(t, e, r, a) {
      var n = Array.prototype.slice.apply(arguments, [1]), i = this.binder(t);
      return i.on.apply(i, n);
    }, ya.binder = function(t) {
      var e = this, r = e.cy.window(), a = t === r || t === r.document || t === r.document.body || Ve(t);
      if (e.supportsPassiveEvents == null) {
        var n = !1;
        try {
          var i = Object.defineProperty({}, "passive", {
            get: function() {
              return n = !0, !0;
            }
          });
          r.addEventListener("test", null, i);
        } catch {
        }
        e.supportsPassiveEvents = n;
      }
      var s = function(u, l, f) {
        var h = Array.prototype.slice.call(arguments);
        return a && e.supportsPassiveEvents && (h[2] = {
          capture: f ?? !1,
          passive: !1,
          once: !1
        }), e.bindings.push({
          target: t,
          args: h
        }), (t.addEventListener || t.on).apply(t, h), this;
      };
      return {
        on: s,
        addEventListener: s,
        addListener: s,
        bind: s
      };
    }, ya.nodeIsDraggable = function(t) {
      return t && t.isNode() && !t.locked() && t.grabbable();
    }, ya.nodeIsGrabbable = function(t) {
      return this.nodeIsDraggable(t) && t.interactive();
    }, ya.load = function() {
      var t = this, e = t.cy.window(), r = function(O) {
        return O.selected();
      }, a = function(O, oe, Te, ce) {
        O == null && (O = t.cy);
        for (var ye = 0; ye < oe.length; ye++) {
          var _e = oe[ye];
          O.emit({
            originalEvent: Te,
            type: _e,
            position: ce
          });
        }
      }, n = function(O) {
        return O.shiftKey || O.metaKey || O.ctrlKey;
      }, i = function(O, oe) {
        var Te = !0;
        if (t.cy.hasCompoundNodes() && O && O.pannable())
          for (var ce = 0; oe && ce < oe.length; ce++) {
            var O = oe[ce];
            if (O.isNode() && O.isParent() && !O.pannable()) {
              Te = !1;
              break;
            }
          }
        else
          Te = !0;
        return Te;
      }, s = function(O) {
        O[0]._private.grabbed = !0;
      }, o = function(O) {
        O[0]._private.grabbed = !1;
      }, u = function(O) {
        O[0]._private.rscratch.inDragLayer = !0;
      }, l = function(O) {
        O[0]._private.rscratch.inDragLayer = !1;
      }, f = function(O) {
        O[0]._private.rscratch.isGrabTarget = !0;
      }, h = function(O) {
        O[0]._private.rscratch.isGrabTarget = !1;
      }, v = function(O, oe) {
        var Te = oe.addToList, ce = Te.has(O);
        !ce && O.grabbable() && !O.locked() && (Te.merge(O), s(O));
      }, d = function(O, oe) {
        if (O.cy().hasCompoundNodes() && !(oe.inDragLayer == null && oe.addToList == null)) {
          var Te = O.descendants();
          oe.inDragLayer && (Te.forEach(u), Te.connectedEdges().forEach(u)), oe.addToList && v(Te, oe);
        }
      }, c = function(O, oe) {
        oe = oe || {};
        var Te = O.cy().hasCompoundNodes();
        oe.inDragLayer && (O.forEach(u), O.neighborhood().stdFilter(function(ce) {
          return !Te || ce.isEdge();
        }).forEach(u)), oe.addToList && O.forEach(function(ce) {
          v(ce, oe);
        }), d(O, oe), g(O, {
          inDragLayer: oe.inDragLayer
        }), t.updateCachedGrabbedEles();
      }, y = c, p = function(O) {
        O && (t.getCachedZSortedEles().forEach(function(oe) {
          o(oe), l(oe), h(oe);
        }), t.updateCachedGrabbedEles());
      }, g = function(O, oe) {
        if (!(oe.inDragLayer == null && oe.addToList == null) && O.cy().hasCompoundNodes()) {
          var Te = O.ancestors().orphans();
          if (!Te.same(O)) {
            var ce = Te.descendants().spawnSelf().merge(Te).unmerge(O).unmerge(O.descendants()), ye = ce.connectedEdges();
            oe.inDragLayer && (ye.forEach(u), ce.forEach(u)), oe.addToList && ce.forEach(function(_e) {
              v(_e, oe);
            });
          }
        }
      }, m = function() {
        document.activeElement != null && document.activeElement.blur != null && document.activeElement.blur();
      }, b = typeof MutationObserver < "u", E = typeof ResizeObserver < "u";
      b ? (t.removeObserver = new MutationObserver(function(he) {
        for (var O = 0; O < he.length; O++) {
          var oe = he[O], Te = oe.removedNodes;
          if (Te)
            for (var ce = 0; ce < Te.length; ce++) {
              var ye = Te[ce];
              if (ye === t.container) {
                t.destroy();
                break;
              }
            }
        }
      }), t.container.parentNode && t.removeObserver.observe(t.container.parentNode, {
        childList: !0
      })) : t.registerBinding(t.container, "DOMNodeRemoved", function(he) {
        t.destroy();
      });
      var M = on(function() {
        t.cy.resize();
      }, 100);
      b && (t.styleObserver = new MutationObserver(M), t.styleObserver.observe(t.container, {
        attributes: !0
      })), t.registerBinding(e, "resize", M), E && (t.resizeObserver = new ResizeObserver(M), t.resizeObserver.observe(t.container));
      var L = function(O, oe) {
        for (; O != null; )
          oe(O), O = O.parentNode;
      }, w = function() {
        t.invalidateContainerClientCoordsCache();
      };
      L(t.container, function(he) {
        t.registerBinding(he, "transitionend", w), t.registerBinding(he, "animationend", w), t.registerBinding(he, "scroll", w);
      }), t.registerBinding(t.container, "contextmenu", function(he) {
        he.preventDefault();
      });
      var k = function() {
        return t.selection[4] !== 0;
      }, D = function(O) {
        for (var oe = t.findContainerClientCoords(), Te = oe[0], ce = oe[1], ye = oe[2], _e = oe[3], be = O.touches ? O.touches : [O], Ge = !1, Qe = 0; Qe < be.length; Qe++) {
          var ft = be[Qe];
          if (Te <= ft.clientX && ft.clientX <= Te + ye && ce <= ft.clientY && ft.clientY <= ce + _e) {
            Ge = !0;
            break;
          }
        }
        if (!Ge)
          return !1;
        for (var qe = t.container, ot = O.target, Ke = ot.parentNode, Je = !1; Ke; ) {
          if (Ke === qe) {
            Je = !0;
            break;
          }
          Ke = Ke.parentNode;
        }
        return !!Je;
      };
      t.registerBinding(t.container, "mousedown", function(O) {
        if (D(O)) {
          O.preventDefault(), m(), t.hoverData.capture = !0, t.hoverData.which = O.which;
          var oe = t.cy, Te = [O.clientX, O.clientY], ce = t.projectIntoViewport(Te[0], Te[1]), ye = t.selection, _e = t.findNearestElements(ce[0], ce[1], !0, !1), be = _e[0], Ge = t.dragData.possibleDragElements;
          t.hoverData.mdownPos = ce, t.hoverData.mdownGPos = Te;
          var Qe = function() {
            t.hoverData.tapholdCancelled = !1, clearTimeout(t.hoverData.tapholdTimeout), t.hoverData.tapholdTimeout = setTimeout(function() {
              if (!t.hoverData.tapholdCancelled) {
                var Ct = t.hoverData.down;
                Ct ? Ct.emit({
                  originalEvent: O,
                  type: "taphold",
                  position: {
                    x: ce[0],
                    y: ce[1]
                  }
                }) : oe.emit({
                  originalEvent: O,
                  type: "taphold",
                  position: {
                    x: ce[0],
                    y: ce[1]
                  }
                });
              }
            }, t.tapholdDuration);
          };
          if (O.which == 3) {
            t.hoverData.cxtStarted = !0;
            var ft = {
              originalEvent: O,
              type: "cxttapstart",
              position: {
                x: ce[0],
                y: ce[1]
              }
            };
            be ? (be.activate(), be.emit(ft), t.hoverData.down = be) : oe.emit(ft), t.hoverData.downTime = (/* @__PURE__ */ new Date()).getTime(), t.hoverData.cxtDragged = !1;
          } else if (O.which == 1) {
            be && be.activate();
            {
              if (be != null && t.nodeIsGrabbable(be)) {
                var qe = function(Ct) {
                  return {
                    originalEvent: O,
                    type: Ct,
                    position: {
                      x: ce[0],
                      y: ce[1]
                    }
                  };
                }, ot = function(Ct) {
                  Ct.emit(qe("grab"));
                };
                if (f(be), !be.selected())
                  Ge = t.dragData.possibleDragElements = oe.collection(), y(be, {
                    addToList: Ge
                  }), be.emit(qe("grabon")).emit(qe("grab"));
                else {
                  Ge = t.dragData.possibleDragElements = oe.collection();
                  var Ke = oe.$(function(Je) {
                    return Je.isNode() && Je.selected() && t.nodeIsGrabbable(Je);
                  });
                  c(Ke, {
                    addToList: Ge
                  }), be.emit(qe("grabon")), Ke.forEach(ot);
                }
                t.redrawHint("eles", !0), t.redrawHint("drag", !0);
              }
              t.hoverData.down = be, t.hoverData.downs = _e, t.hoverData.downTime = (/* @__PURE__ */ new Date()).getTime();
            }
            a(be, ["mousedown", "tapstart", "vmousedown"], O, {
              x: ce[0],
              y: ce[1]
            }), be == null ? (ye[4] = 1, t.data.bgActivePosistion = {
              x: ce[0],
              y: ce[1]
            }, t.redrawHint("select", !0), t.redraw()) : be.pannable() && (ye[4] = 1), Qe();
          }
          ye[0] = ye[2] = ce[0], ye[1] = ye[3] = ce[1];
        }
      }, !1), t.registerBinding(e, "mousemove", function(O) {
        var oe = t.hoverData.capture;
        if (!(!oe && !D(O))) {
          var Te = !1, ce = t.cy, ye = ce.zoom(), _e = [O.clientX, O.clientY], be = t.projectIntoViewport(_e[0], _e[1]), Ge = t.hoverData.mdownPos, Qe = t.hoverData.mdownGPos, ft = t.selection, qe = null;
          !t.hoverData.draggingEles && !t.hoverData.dragging && !t.hoverData.selecting && (qe = t.findNearestElement(be[0], be[1], !0, !1));
          var ot = t.hoverData.last, Ke = t.hoverData.down, Je = [be[0] - ft[2], be[1] - ft[3]], Ct = t.dragData.possibleDragElements, Rt;
          if (Qe) {
            var ar = _e[0] - Qe[0], nr = ar * ar, kt = _e[1] - Qe[1], Jt = kt * kt, _t = nr + Jt;
            t.hoverData.isOverThresholdDrag = Rt = _t >= t.desktopTapThreshold2;
          }
          var Er = n(O);
          Rt && (t.hoverData.tapholdCancelled = !0);
          var Rr = function() {
            var cr = t.hoverData.dragDelta = t.hoverData.dragDelta || [];
            cr.length === 0 ? (cr.push(Je[0]), cr.push(Je[1])) : (cr[0] += Je[0], cr[1] += Je[1]);
          };
          Te = !0, a(qe, ["mousemove", "vmousemove", "tapdrag"], O, {
            x: be[0],
            y: be[1]
          });
          var xa = function() {
            t.data.bgActivePosistion = void 0, t.hoverData.selecting || ce.emit({
              originalEvent: O,
              type: "boxstart",
              position: {
                x: be[0],
                y: be[1]
              }
            }), ft[4] = 1, t.hoverData.selecting = !0, t.redrawHint("select", !0), t.redraw();
          };
          if (t.hoverData.which === 3) {
            if (Rt) {
              var Xr = {
                originalEvent: O,
                type: "cxtdrag",
                position: {
                  x: be[0],
                  y: be[1]
                }
              };
              Ke ? Ke.emit(Xr) : ce.emit(Xr), t.hoverData.cxtDragged = !0, (!t.hoverData.cxtOver || qe !== t.hoverData.cxtOver) && (t.hoverData.cxtOver && t.hoverData.cxtOver.emit({
                originalEvent: O,
                type: "cxtdragout",
                position: {
                  x: be[0],
                  y: be[1]
                }
              }), t.hoverData.cxtOver = qe, qe && qe.emit({
                originalEvent: O,
                type: "cxtdragover",
                position: {
                  x: be[0],
                  y: be[1]
                }
              }));
            }
          } else if (t.hoverData.dragging) {
            if (Te = !0, ce.panningEnabled() && ce.userPanningEnabled()) {
              var Ta;
              if (t.hoverData.justStartedPan) {
                var Jn = t.hoverData.mdownPos;
                Ta = {
                  x: (be[0] - Jn[0]) * ye,
                  y: (be[1] - Jn[1]) * ye
                }, t.hoverData.justStartedPan = !1;
              } else
                Ta = {
                  x: Je[0] * ye,
                  y: Je[1] * ye
                };
              ce.panBy(Ta), ce.emit("dragpan"), t.hoverData.dragged = !0;
            }
            be = t.projectIntoViewport(O.clientX, O.clientY);
          } else if (ft[4] == 1 && (Ke == null || Ke.pannable())) {
            if (Rt) {
              if (!t.hoverData.dragging && ce.boxSelectionEnabled() && (Er || !ce.panningEnabled() || !ce.userPanningEnabled()))
                xa();
              else if (!t.hoverData.selecting && ce.panningEnabled() && ce.userPanningEnabled()) {
                var Wr = i(Ke, t.hoverData.downs);
                Wr && (t.hoverData.dragging = !0, t.hoverData.justStartedPan = !0, ft[4] = 0, t.data.bgActivePosistion = jr(Ge), t.redrawHint("select", !0), t.redraw());
              }
              Ke && Ke.pannable() && Ke.active() && Ke.unactivate();
            }
          } else {
            if (Ke && Ke.pannable() && Ke.active() && Ke.unactivate(), (!Ke || !Ke.grabbed()) && qe != ot && (ot && a(ot, ["mouseout", "tapdragout"], O, {
              x: be[0],
              y: be[1]
            }), qe && a(qe, ["mouseover", "tapdragover"], O, {
              x: be[0],
              y: be[1]
            }), t.hoverData.last = qe), Ke)
              if (Rt) {
                if (ce.boxSelectionEnabled() && Er)
                  Ke && Ke.grabbed() && (p(Ct), Ke.emit("freeon"), Ct.emit("free"), t.dragData.didDrag && (Ke.emit("dragfreeon"), Ct.emit("dragfree"))), xa();
                else if (Ke && Ke.grabbed() && t.nodeIsDraggable(Ke)) {
                  var Xt = !t.dragData.didDrag;
                  Xt && t.redrawHint("eles", !0), t.dragData.didDrag = !0, t.hoverData.draggingEles || c(Ct, {
                    inDragLayer: !0
                  });
                  var Ut = {
                    x: 0,
                    y: 0
                  };
                  if (R(Je[0]) && R(Je[1]) && (Ut.x += Je[0], Ut.y += Je[1], Xt)) {
                    var Wt = t.hoverData.dragDelta;
                    Wt && R(Wt[0]) && R(Wt[1]) && (Ut.x += Wt[0], Ut.y += Wt[1]);
                  }
                  t.hoverData.draggingEles = !0, Ct.silentShift(Ut).emit("position drag"), t.redrawHint("drag", !0), t.redraw();
                }
              } else
                Rr();
            Te = !0;
          }
          if (ft[2] = be[0], ft[3] = be[1], Te)
            return O.stopPropagation && O.stopPropagation(), O.preventDefault && O.preventDefault(), !1;
        }
      }, !1);
      var F, G, N;
      t.registerBinding(e, "mouseup", function(O) {
        var oe = t.hoverData.capture;
        if (oe) {
          t.hoverData.capture = !1;
          var Te = t.cy, ce = t.projectIntoViewport(O.clientX, O.clientY), ye = t.selection, _e = t.findNearestElement(ce[0], ce[1], !0, !1), be = t.dragData.possibleDragElements, Ge = t.hoverData.down, Qe = n(O);
          if (t.data.bgActivePosistion && (t.redrawHint("select", !0), t.redraw()), t.hoverData.tapholdCancelled = !0, t.data.bgActivePosistion = void 0, Ge && Ge.unactivate(), t.hoverData.which === 3) {
            var ft = {
              originalEvent: O,
              type: "cxttapend",
              position: {
                x: ce[0],
                y: ce[1]
              }
            };
            if (Ge ? Ge.emit(ft) : Te.emit(ft), !t.hoverData.cxtDragged) {
              var qe = {
                originalEvent: O,
                type: "cxttap",
                position: {
                  x: ce[0],
                  y: ce[1]
                }
              };
              Ge ? Ge.emit(qe) : Te.emit(qe);
            }
            t.hoverData.cxtDragged = !1, t.hoverData.which = null;
          } else if (t.hoverData.which === 1) {
            if (a(_e, ["mouseup", "tapend", "vmouseup"], O, {
              x: ce[0],
              y: ce[1]
            }), !t.dragData.didDrag && // didn't move a node around
            !t.hoverData.dragged && // didn't pan
            !t.hoverData.selecting && // not box selection
            !t.hoverData.isOverThresholdDrag && (a(Ge, ["click", "tap", "vclick"], O, {
              x: ce[0],
              y: ce[1]
            }), G = !1, O.timeStamp - N <= Te.multiClickDebounceTime() ? (F && clearTimeout(F), G = !0, N = null, a(Ge, ["dblclick", "dbltap", "vdblclick"], O, {
              x: ce[0],
              y: ce[1]
            })) : (F = setTimeout(function() {
              G || a(Ge, ["oneclick", "onetap", "voneclick"], O, {
                x: ce[0],
                y: ce[1]
              });
            }, Te.multiClickDebounceTime()), N = O.timeStamp)), Ge == null && !t.dragData.didDrag && !t.hoverData.selecting && !t.hoverData.dragged && !n(O) && (Te.$(r).unselect(["tapunselect"]), be.length > 0 && t.redrawHint("eles", !0), t.dragData.possibleDragElements = be = Te.collection()), _e == Ge && !t.dragData.didDrag && !t.hoverData.selecting && _e != null && _e._private.selectable && (t.hoverData.dragging || (Te.selectionType() === "additive" || Qe ? _e.selected() ? _e.unselect(["tapunselect"]) : _e.select(["tapselect"]) : Qe || (Te.$(r).unmerge(_e).unselect(["tapunselect"]), _e.select(["tapselect"]))), t.redrawHint("eles", !0)), t.hoverData.selecting) {
              var ot = Te.collection(t.getAllInBox(ye[0], ye[1], ye[2], ye[3]));
              t.redrawHint("select", !0), ot.length > 0 && t.redrawHint("eles", !0), Te.emit({
                type: "boxend",
                originalEvent: O,
                position: {
                  x: ce[0],
                  y: ce[1]
                }
              });
              var Ke = function(Rt) {
                return Rt.selectable() && !Rt.selected();
              };
              Te.selectionType() === "additive" || Qe || Te.$(r).unmerge(ot).unselect(), ot.emit("box").stdFilter(Ke).select().emit("boxselect"), t.redraw();
            }
            if (t.hoverData.dragging && (t.hoverData.dragging = !1, t.redrawHint("select", !0), t.redrawHint("eles", !0), t.redraw()), !ye[4]) {
              t.redrawHint("drag", !0), t.redrawHint("eles", !0);
              var Je = Ge && Ge.grabbed();
              p(be), Je && (Ge.emit("freeon"), be.emit("free"), t.dragData.didDrag && (Ge.emit("dragfreeon"), be.emit("dragfree")));
            }
          }
          ye[4] = 0, t.hoverData.down = null, t.hoverData.cxtStarted = !1, t.hoverData.draggingEles = !1, t.hoverData.selecting = !1, t.hoverData.isOverThresholdDrag = !1, t.dragData.didDrag = !1, t.hoverData.dragged = !1, t.hoverData.dragDelta = [], t.hoverData.mdownPos = null, t.hoverData.mdownGPos = null;
        }
      }, !1);
      var X = function(O) {
        if (!t.scrollingPage) {
          var oe = t.cy, Te = oe.zoom(), ce = oe.pan(), ye = t.projectIntoViewport(O.clientX, O.clientY), _e = [ye[0] * Te + ce.x, ye[1] * Te + ce.y];
          if (t.hoverData.draggingEles || t.hoverData.dragging || t.hoverData.cxtStarted || k()) {
            O.preventDefault();
            return;
          }
          if (oe.panningEnabled() && oe.userPanningEnabled() && oe.zoomingEnabled() && oe.userZoomingEnabled()) {
            O.preventDefault(), t.data.wheelZooming = !0, clearTimeout(t.data.wheelTimeout), t.data.wheelTimeout = setTimeout(function() {
              t.data.wheelZooming = !1, t.redrawHint("eles", !0), t.redraw();
            }, 150);
            var be;
            O.deltaY != null ? be = O.deltaY / -250 : O.wheelDeltaY != null ? be = O.wheelDeltaY / 1e3 : be = O.wheelDelta / 1e3, be = be * t.wheelSensitivity;
            var Ge = O.deltaMode === 1;
            Ge && (be *= 33);
            var Qe = oe.zoom() * Math.pow(10, be);
            O.type === "gesturechange" && (Qe = t.gestureStartZoom * O.scale), oe.zoom({
              level: Qe,
              renderedPosition: {
                x: _e[0],
                y: _e[1]
              }
            }), oe.emit(O.type === "gesturechange" ? "pinchzoom" : "scrollzoom");
          }
        }
      };
      t.registerBinding(t.container, "wheel", X, !0), t.registerBinding(e, "scroll", function(O) {
        t.scrollingPage = !0, clearTimeout(t.scrollingPageTimeout), t.scrollingPageTimeout = setTimeout(function() {
          t.scrollingPage = !1;
        }, 250);
      }, !0), t.registerBinding(t.container, "gesturestart", function(O) {
        t.gestureStartZoom = t.cy.zoom(), t.hasTouchStarted || O.preventDefault();
      }, !0), t.registerBinding(t.container, "gesturechange", function(he) {
        t.hasTouchStarted || X(he);
      }, !0), t.registerBinding(t.container, "mouseout", function(O) {
        var oe = t.projectIntoViewport(O.clientX, O.clientY);
        t.cy.emit({
          originalEvent: O,
          type: "mouseout",
          position: {
            x: oe[0],
            y: oe[1]
          }
        });
      }, !1), t.registerBinding(t.container, "mouseover", function(O) {
        var oe = t.projectIntoViewport(O.clientX, O.clientY);
        t.cy.emit({
          originalEvent: O,
          type: "mouseover",
          position: {
            x: oe[0],
            y: oe[1]
          }
        });
      }, !1);
      var B, re, K, W, ae, ue, me, ie, ge, Ee, Ce, we, De, se = function(O, oe, Te, ce) {
        return Math.sqrt((Te - O) * (Te - O) + (ce - oe) * (ce - oe));
      }, xe = function(O, oe, Te, ce) {
        return (Te - O) * (Te - O) + (ce - oe) * (ce - oe);
      }, Le;
      t.registerBinding(t.container, "touchstart", Le = function(O) {
        if (t.hasTouchStarted = !0, !!D(O)) {
          m(), t.touchData.capture = !0, t.data.bgActivePosistion = void 0;
          var oe = t.cy, Te = t.touchData.now, ce = t.touchData.earlier;
          if (O.touches[0]) {
            var ye = t.projectIntoViewport(O.touches[0].clientX, O.touches[0].clientY);
            Te[0] = ye[0], Te[1] = ye[1];
          }
          if (O.touches[1]) {
            var ye = t.projectIntoViewport(O.touches[1].clientX, O.touches[1].clientY);
            Te[2] = ye[0], Te[3] = ye[1];
          }
          if (O.touches[2]) {
            var ye = t.projectIntoViewport(O.touches[2].clientX, O.touches[2].clientY);
            Te[4] = ye[0], Te[5] = ye[1];
          }
          if (O.touches[1]) {
            t.touchData.singleTouchMoved = !0, p(t.dragData.touchDragEles);
            var _e = t.findContainerClientCoords();
            ge = _e[0], Ee = _e[1], Ce = _e[2], we = _e[3], B = O.touches[0].clientX - ge, re = O.touches[0].clientY - Ee, K = O.touches[1].clientX - ge, W = O.touches[1].clientY - Ee, De = 0 <= B && B <= Ce && 0 <= K && K <= Ce && 0 <= re && re <= we && 0 <= W && W <= we;
            var be = oe.pan(), Ge = oe.zoom();
            ae = se(B, re, K, W), ue = xe(B, re, K, W), me = [(B + K) / 2, (re + W) / 2], ie = [(me[0] - be.x) / Ge, (me[1] - be.y) / Ge];
            var Qe = 200, ft = Qe * Qe;
            if (ue < ft && !O.touches[2]) {
              var qe = t.findNearestElement(Te[0], Te[1], !0, !0), ot = t.findNearestElement(Te[2], Te[3], !0, !0);
              qe && qe.isNode() ? (qe.activate().emit({
                originalEvent: O,
                type: "cxttapstart",
                position: {
                  x: Te[0],
                  y: Te[1]
                }
              }), t.touchData.start = qe) : ot && ot.isNode() ? (ot.activate().emit({
                originalEvent: O,
                type: "cxttapstart",
                position: {
                  x: Te[0],
                  y: Te[1]
                }
              }), t.touchData.start = ot) : oe.emit({
                originalEvent: O,
                type: "cxttapstart",
                position: {
                  x: Te[0],
                  y: Te[1]
                }
              }), t.touchData.start && (t.touchData.start._private.grabbed = !1), t.touchData.cxt = !0, t.touchData.cxtDragged = !1, t.data.bgActivePosistion = void 0, t.redraw();
              return;
            }
          }
          if (O.touches[2])
            oe.boxSelectionEnabled() && O.preventDefault();
          else if (!O.touches[1]) {
            if (O.touches[0]) {
              var Ke = t.findNearestElements(Te[0], Te[1], !0, !0), Je = Ke[0];
              if (Je != null && (Je.activate(), t.touchData.start = Je, t.touchData.starts = Ke, t.nodeIsGrabbable(Je))) {
                var Ct = t.dragData.touchDragEles = oe.collection(), Rt = null;
                t.redrawHint("eles", !0), t.redrawHint("drag", !0), Je.selected() ? (Rt = oe.$(function(_t) {
                  return _t.selected() && t.nodeIsGrabbable(_t);
                }), c(Rt, {
                  addToList: Ct
                })) : y(Je, {
                  addToList: Ct
                }), f(Je);
                var ar = function(Er) {
                  return {
                    originalEvent: O,
                    type: Er,
                    position: {
                      x: Te[0],
                      y: Te[1]
                    }
                  };
                };
                Je.emit(ar("grabon")), Rt ? Rt.forEach(function(_t) {
                  _t.emit(ar("grab"));
                }) : Je.emit(ar("grab"));
              }
              a(Je, ["touchstart", "tapstart", "vmousedown"], O, {
                x: Te[0],
                y: Te[1]
              }), Je == null && (t.data.bgActivePosistion = {
                x: ye[0],
                y: ye[1]
              }, t.redrawHint("select", !0), t.redraw()), t.touchData.singleTouchMoved = !1, t.touchData.singleTouchStartTime = +/* @__PURE__ */ new Date(), clearTimeout(t.touchData.tapholdTimeout), t.touchData.tapholdTimeout = setTimeout(function() {
                t.touchData.singleTouchMoved === !1 && !t.pinching && !t.touchData.selecting && a(t.touchData.start, ["taphold"], O, {
                  x: Te[0],
                  y: Te[1]
                });
              }, t.tapholdDuration);
            }
          }
          if (O.touches.length >= 1) {
            for (var nr = t.touchData.startPosition = [null, null, null, null, null, null], kt = 0; kt < Te.length; kt++)
              nr[kt] = ce[kt] = Te[kt];
            var Jt = O.touches[0];
            t.touchData.startGPosition = [Jt.clientX, Jt.clientY];
          }
        }
      }, !1);
      var Se;
      t.registerBinding(window, "touchmove", Se = function(O) {
        var oe = t.touchData.capture;
        if (!(!oe && !D(O))) {
          var Te = t.selection, ce = t.cy, ye = t.touchData.now, _e = t.touchData.earlier, be = ce.zoom();
          if (O.touches[0]) {
            var Ge = t.projectIntoViewport(O.touches[0].clientX, O.touches[0].clientY);
            ye[0] = Ge[0], ye[1] = Ge[1];
          }
          if (O.touches[1]) {
            var Ge = t.projectIntoViewport(O.touches[1].clientX, O.touches[1].clientY);
            ye[2] = Ge[0], ye[3] = Ge[1];
          }
          if (O.touches[2]) {
            var Ge = t.projectIntoViewport(O.touches[2].clientX, O.touches[2].clientY);
            ye[4] = Ge[0], ye[5] = Ge[1];
          }
          var Qe = t.touchData.startGPosition, ft;
          if (oe && O.touches[0] && Qe) {
            for (var qe = [], ot = 0; ot < ye.length; ot++)
              qe[ot] = ye[ot] - _e[ot];
            var Ke = O.touches[0].clientX - Qe[0], Je = Ke * Ke, Ct = O.touches[0].clientY - Qe[1], Rt = Ct * Ct, ar = Je + Rt;
            ft = ar >= t.touchTapThreshold2;
          }
          if (oe && t.touchData.cxt) {
            O.preventDefault();
            var nr = O.touches[0].clientX - ge, kt = O.touches[0].clientY - Ee, Jt = O.touches[1].clientX - ge, _t = O.touches[1].clientY - Ee, Er = xe(nr, kt, Jt, _t), Rr = Er / ue, xa = 150, Xr = xa * xa, Ta = 1.5, Jn = Ta * Ta;
            if (Rr >= Jn || Er >= Xr) {
              t.touchData.cxt = !1, t.data.bgActivePosistion = void 0, t.redrawHint("select", !0);
              var Wr = {
                originalEvent: O,
                type: "cxttapend",
                position: {
                  x: ye[0],
                  y: ye[1]
                }
              };
              t.touchData.start ? (t.touchData.start.unactivate().emit(Wr), t.touchData.start = null) : ce.emit(Wr);
            }
          }
          if (oe && t.touchData.cxt) {
            var Wr = {
              originalEvent: O,
              type: "cxtdrag",
              position: {
                x: ye[0],
                y: ye[1]
              }
            };
            t.data.bgActivePosistion = void 0, t.redrawHint("select", !0), t.touchData.start ? t.touchData.start.emit(Wr) : ce.emit(Wr), t.touchData.start && (t.touchData.start._private.grabbed = !1), t.touchData.cxtDragged = !0;
            var Xt = t.findNearestElement(ye[0], ye[1], !0, !0);
            (!t.touchData.cxtOver || Xt !== t.touchData.cxtOver) && (t.touchData.cxtOver && t.touchData.cxtOver.emit({
              originalEvent: O,
              type: "cxtdragout",
              position: {
                x: ye[0],
                y: ye[1]
              }
            }), t.touchData.cxtOver = Xt, Xt && Xt.emit({
              originalEvent: O,
              type: "cxtdragover",
              position: {
                x: ye[0],
                y: ye[1]
              }
            }));
          } else if (oe && O.touches[2] && ce.boxSelectionEnabled())
            O.preventDefault(), t.data.bgActivePosistion = void 0, this.lastThreeTouch = +/* @__PURE__ */ new Date(), t.touchData.selecting || ce.emit({
              originalEvent: O,
              type: "boxstart",
              position: {
                x: ye[0],
                y: ye[1]
              }
            }), t.touchData.selecting = !0, t.touchData.didSelect = !0, Te[4] = 1, !Te || Te.length === 0 || Te[0] === void 0 ? (Te[0] = (ye[0] + ye[2] + ye[4]) / 3, Te[1] = (ye[1] + ye[3] + ye[5]) / 3, Te[2] = (ye[0] + ye[2] + ye[4]) / 3 + 1, Te[3] = (ye[1] + ye[3] + ye[5]) / 3 + 1) : (Te[2] = (ye[0] + ye[2] + ye[4]) / 3, Te[3] = (ye[1] + ye[3] + ye[5]) / 3), t.redrawHint("select", !0), t.redraw();
          else if (oe && O.touches[1] && !t.touchData.didSelect && ce.zoomingEnabled() && ce.panningEnabled() && ce.userZoomingEnabled() && ce.userPanningEnabled()) {
            O.preventDefault(), t.data.bgActivePosistion = void 0, t.redrawHint("select", !0);
            var Ut = t.dragData.touchDragEles;
            if (Ut) {
              t.redrawHint("drag", !0);
              for (var Wt = 0; Wt < Ut.length; Wt++) {
                var jn = Ut[Wt]._private;
                jn.grabbed = !1, jn.rscratch.inDragLayer = !1;
              }
            }
            var cr = t.touchData.start, nr = O.touches[0].clientX - ge, kt = O.touches[0].clientY - Ee, Jt = O.touches[1].clientX - ge, _t = O.touches[1].clientY - Ee, Bl = se(nr, kt, Jt, _t), op = Bl / ae;
            if (De) {
              var lp = nr - B, up = kt - re, fp = Jt - K, hp = _t - W, vp = (lp + fp) / 2, cp = (up + hp) / 2, rn = ce.zoom(), Wi = rn * op, ei = ce.pan(), Fl = ie[0] * rn + ei.x, Gl = ie[1] * rn + ei.y, dp = {
                x: -Wi / rn * (Fl - ei.x - vp) + Fl,
                y: -Wi / rn * (Gl - ei.y - cp) + Gl
              };
              if (cr && cr.active()) {
                var Ut = t.dragData.touchDragEles;
                p(Ut), t.redrawHint("drag", !0), t.redrawHint("eles", !0), cr.unactivate().emit("freeon"), Ut.emit("free"), t.dragData.didDrag && (cr.emit("dragfreeon"), Ut.emit("dragfree"));
              }
              ce.viewport({
                zoom: Wi,
                pan: dp,
                cancelOnFailedZoom: !0
              }), ce.emit("pinchzoom"), ae = Bl, B = nr, re = kt, K = Jt, W = _t, t.pinching = !0;
            }
            if (O.touches[0]) {
              var Ge = t.projectIntoViewport(O.touches[0].clientX, O.touches[0].clientY);
              ye[0] = Ge[0], ye[1] = Ge[1];
            }
            if (O.touches[1]) {
              var Ge = t.projectIntoViewport(O.touches[1].clientX, O.touches[1].clientY);
              ye[2] = Ge[0], ye[3] = Ge[1];
            }
            if (O.touches[2]) {
              var Ge = t.projectIntoViewport(O.touches[2].clientX, O.touches[2].clientY);
              ye[4] = Ge[0], ye[5] = Ge[1];
            }
          } else if (O.touches[0] && !t.touchData.didSelect) {
            var ir = t.touchData.start, qi = t.touchData.last, Xt;
            if (!t.hoverData.draggingEles && !t.swipePanning && (Xt = t.findNearestElement(ye[0], ye[1], !0, !0)), oe && ir != null && O.preventDefault(), oe && ir != null && t.nodeIsDraggable(ir))
              if (ft) {
                var Ut = t.dragData.touchDragEles, zl = !t.dragData.didDrag;
                zl && c(Ut, {
                  inDragLayer: !0
                }), t.dragData.didDrag = !0;
                var an = {
                  x: 0,
                  y: 0
                };
                if (R(qe[0]) && R(qe[1]) && (an.x += qe[0], an.y += qe[1], zl)) {
                  t.redrawHint("eles", !0);
                  var sr = t.touchData.dragDelta;
                  sr && R(sr[0]) && R(sr[1]) && (an.x += sr[0], an.y += sr[1]);
                }
                t.hoverData.draggingEles = !0, Ut.silentShift(an).emit("position drag"), t.redrawHint("drag", !0), t.touchData.startPosition[0] == _e[0] && t.touchData.startPosition[1] == _e[1] && t.redrawHint("eles", !0), t.redraw();
              } else {
                var sr = t.touchData.dragDelta = t.touchData.dragDelta || [];
                sr.length === 0 ? (sr.push(qe[0]), sr.push(qe[1])) : (sr[0] += qe[0], sr[1] += qe[1]);
              }
            if (a(ir || Xt, ["touchmove", "tapdrag", "vmousemove"], O, {
              x: ye[0],
              y: ye[1]
            }), (!ir || !ir.grabbed()) && Xt != qi && (qi && qi.emit({
              originalEvent: O,
              type: "tapdragout",
              position: {
                x: ye[0],
                y: ye[1]
              }
            }), Xt && Xt.emit({
              originalEvent: O,
              type: "tapdragover",
              position: {
                x: ye[0],
                y: ye[1]
              }
            })), t.touchData.last = Xt, oe)
              for (var Wt = 0; Wt < ye.length; Wt++)
                ye[Wt] && t.touchData.startPosition[Wt] && ft && (t.touchData.singleTouchMoved = !0);
            if (oe && (ir == null || ir.pannable()) && ce.panningEnabled() && ce.userPanningEnabled()) {
              var gp = i(ir, t.touchData.starts);
              gp && (O.preventDefault(), t.data.bgActivePosistion || (t.data.bgActivePosistion = jr(t.touchData.startPosition)), t.swipePanning ? (ce.panBy({
                x: qe[0] * be,
                y: qe[1] * be
              }), ce.emit("dragpan")) : ft && (t.swipePanning = !0, ce.panBy({
                x: Ke * be,
                y: Ct * be
              }), ce.emit("dragpan"), ir && (ir.unactivate(), t.redrawHint("select", !0), t.touchData.start = null)));
              var Ge = t.projectIntoViewport(O.touches[0].clientX, O.touches[0].clientY);
              ye[0] = Ge[0], ye[1] = Ge[1];
            }
          }
          for (var ot = 0; ot < ye.length; ot++)
            _e[ot] = ye[ot];
          oe && O.touches.length > 0 && !t.hoverData.draggingEles && !t.swipePanning && t.data.bgActivePosistion != null && (t.data.bgActivePosistion = void 0, t.redrawHint("select", !0), t.redraw());
        }
      }, !1);
      var Oe;
      t.registerBinding(e, "touchcancel", Oe = function(O) {
        var oe = t.touchData.start;
        t.touchData.capture = !1, oe && oe.unactivate();
      });
      var Fe, Xe, Ie, Me;
      if (t.registerBinding(e, "touchend", Fe = function(O) {
        var oe = t.touchData.start, Te = t.touchData.capture;
        if (Te)
          O.touches.length === 0 && (t.touchData.capture = !1), O.preventDefault();
        else
          return;
        var ce = t.selection;
        t.swipePanning = !1, t.hoverData.draggingEles = !1;
        var ye = t.cy, _e = ye.zoom(), be = t.touchData.now, Ge = t.touchData.earlier;
        if (O.touches[0]) {
          var Qe = t.projectIntoViewport(O.touches[0].clientX, O.touches[0].clientY);
          be[0] = Qe[0], be[1] = Qe[1];
        }
        if (O.touches[1]) {
          var Qe = t.projectIntoViewport(O.touches[1].clientX, O.touches[1].clientY);
          be[2] = Qe[0], be[3] = Qe[1];
        }
        if (O.touches[2]) {
          var Qe = t.projectIntoViewport(O.touches[2].clientX, O.touches[2].clientY);
          be[4] = Qe[0], be[5] = Qe[1];
        }
        oe && oe.unactivate();
        var ft;
        if (t.touchData.cxt) {
          if (ft = {
            originalEvent: O,
            type: "cxttapend",
            position: {
              x: be[0],
              y: be[1]
            }
          }, oe ? oe.emit(ft) : ye.emit(ft), !t.touchData.cxtDragged) {
            var qe = {
              originalEvent: O,
              type: "cxttap",
              position: {
                x: be[0],
                y: be[1]
              }
            };
            oe ? oe.emit(qe) : ye.emit(qe);
          }
          t.touchData.start && (t.touchData.start._private.grabbed = !1), t.touchData.cxt = !1, t.touchData.start = null, t.redraw();
          return;
        }
        if (!O.touches[2] && ye.boxSelectionEnabled() && t.touchData.selecting) {
          t.touchData.selecting = !1;
          var ot = ye.collection(t.getAllInBox(ce[0], ce[1], ce[2], ce[3]));
          ce[0] = void 0, ce[1] = void 0, ce[2] = void 0, ce[3] = void 0, ce[4] = 0, t.redrawHint("select", !0), ye.emit({
            type: "boxend",
            originalEvent: O,
            position: {
              x: be[0],
              y: be[1]
            }
          });
          var Ke = function(Xr) {
            return Xr.selectable() && !Xr.selected();
          };
          ot.emit("box").stdFilter(Ke).select().emit("boxselect"), ot.nonempty() && t.redrawHint("eles", !0), t.redraw();
        }
        if (oe != null && oe.unactivate(), O.touches[2])
          t.data.bgActivePosistion = void 0, t.redrawHint("select", !0);
        else if (!O.touches[1]) {
          if (!O.touches[0]) {
            if (!O.touches[0]) {
              t.data.bgActivePosistion = void 0, t.redrawHint("select", !0);
              var Je = t.dragData.touchDragEles;
              if (oe != null) {
                var Ct = oe._private.grabbed;
                p(Je), t.redrawHint("drag", !0), t.redrawHint("eles", !0), Ct && (oe.emit("freeon"), Je.emit("free"), t.dragData.didDrag && (oe.emit("dragfreeon"), Je.emit("dragfree"))), a(oe, ["touchend", "tapend", "vmouseup", "tapdragout"], O, {
                  x: be[0],
                  y: be[1]
                }), oe.unactivate(), t.touchData.start = null;
              } else {
                var Rt = t.findNearestElement(be[0], be[1], !0, !0);
                a(Rt, ["touchend", "tapend", "vmouseup", "tapdragout"], O, {
                  x: be[0],
                  y: be[1]
                });
              }
              var ar = t.touchData.startPosition[0] - be[0], nr = ar * ar, kt = t.touchData.startPosition[1] - be[1], Jt = kt * kt, _t = nr + Jt, Er = _t * _e * _e;
              t.touchData.singleTouchMoved || (oe || ye.$(":selected").unselect(["tapunselect"]), a(oe, ["tap", "vclick"], O, {
                x: be[0],
                y: be[1]
              }), Xe = !1, O.timeStamp - Me <= ye.multiClickDebounceTime() ? (Ie && clearTimeout(Ie), Xe = !0, Me = null, a(oe, ["dbltap", "vdblclick"], O, {
                x: be[0],
                y: be[1]
              })) : (Ie = setTimeout(function() {
                Xe || a(oe, ["onetap", "voneclick"], O, {
                  x: be[0],
                  y: be[1]
                });
              }, ye.multiClickDebounceTime()), Me = O.timeStamp)), oe != null && !t.dragData.didDrag && oe._private.selectable && Er < t.touchTapThreshold2 && !t.pinching && (ye.selectionType() === "single" ? (ye.$(r).unmerge(oe).unselect(["tapunselect"]), oe.select(["tapselect"])) : oe.selected() ? oe.unselect(["tapunselect"]) : oe.select(["tapselect"]), t.redrawHint("eles", !0)), t.touchData.singleTouchMoved = !0;
            }
          }
        }
        for (var Rr = 0; Rr < be.length; Rr++)
          Ge[Rr] = be[Rr];
        t.dragData.didDrag = !1, O.touches.length === 0 && (t.touchData.dragDelta = [], t.touchData.startPosition = [null, null, null, null, null, null], t.touchData.startGPosition = null, t.touchData.didSelect = !1), O.touches.length < 2 && (O.touches.length === 1 && (t.touchData.startGPosition = [O.touches[0].clientX, O.touches[0].clientY]), t.pinching = !1, t.redrawHint("eles", !0), t.redraw());
      }, !1), typeof TouchEvent > "u") {
        var Ue = [], ze = function(O) {
          return {
            clientX: O.clientX,
            clientY: O.clientY,
            force: 1,
            identifier: O.pointerId,
            pageX: O.pageX,
            pageY: O.pageY,
            radiusX: O.width / 2,
            radiusY: O.height / 2,
            screenX: O.screenX,
            screenY: O.screenY,
            target: O.target
          };
        }, Be = function(O) {
          return {
            event: O,
            touch: ze(O)
          };
        }, $e = function(O) {
          Ue.push(Be(O));
        }, rt = function(O) {
          for (var oe = 0; oe < Ue.length; oe++) {
            var Te = Ue[oe];
            if (Te.event.pointerId === O.pointerId) {
              Ue.splice(oe, 1);
              return;
            }
          }
        }, je = function(O) {
          var oe = Ue.filter(function(Te) {
            return Te.event.pointerId === O.pointerId;
          })[0];
          oe.event = O, oe.touch = ze(O);
        }, We = function(O) {
          O.touches = Ue.map(function(oe) {
            return oe.touch;
          });
        }, et = function(O) {
          return O.pointerType === "mouse" || O.pointerType === 4;
        };
        t.registerBinding(t.container, "pointerdown", function(he) {
          et(he) || (he.preventDefault(), $e(he), We(he), Le(he));
        }), t.registerBinding(t.container, "pointerup", function(he) {
          et(he) || (rt(he), We(he), Fe(he));
        }), t.registerBinding(t.container, "pointercancel", function(he) {
          et(he) || (rt(he), We(he), Oe(he));
        }), t.registerBinding(t.container, "pointermove", function(he) {
          et(he) || (he.preventDefault(), je(he), We(he), Se(he));
        });
      }
    };
    var mr = {};
    mr.generatePolygon = function(t, e) {
      return this.nodeShapes[t] = {
        renderer: this,
        name: t,
        points: e,
        draw: function(a, n, i, s, o) {
          this.renderer.nodeShapeImpl("polygon", a, n, i, s, o, this.points);
        },
        intersectLine: function(a, n, i, s, o, u, l) {
          return Ba(o, u, this.points, a, n, i / 2, s / 2, l);
        },
        checkPoint: function(a, n, i, s, o, u, l) {
          return pr(a, n, this.points, u, l, s, o, [0, -1], i);
        }
      };
    }, mr.generateEllipse = function() {
      return this.nodeShapes.ellipse = {
        renderer: this,
        name: "ellipse",
        draw: function(e, r, a, n, i) {
          this.renderer.nodeShapeImpl(this.name, e, r, a, n, i);
        },
        intersectLine: function(e, r, a, n, i, s, o) {
          return Rf(i, s, e, r, a / 2 + o, n / 2 + o);
        },
        checkPoint: function(e, r, a, n, i, s, o) {
          return Gr(e, r, n, i, s, o, a);
        }
      };
    }, mr.generateRoundPolygon = function(t, e) {
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
        draw: function(f, h, v, d, c) {
          this.renderer.nodeShapeImpl("round-polygon", f, h, v, d, c, this.points);
        },
        intersectLine: function(f, h, v, d, c, y, p) {
          return kf(c, y, this.points, f, h, v, d);
        },
        checkPoint: function(f, h, v, d, c, y, p) {
          return Mf(f, h, this.points, y, p, d, c);
        }
      };
    }, mr.generateRoundRectangle = function() {
      return this.nodeShapes["round-rectangle"] = this.nodeShapes.roundrectangle = {
        renderer: this,
        name: "round-rectangle",
        points: $t(4, 0),
        draw: function(e, r, a, n, i) {
          this.renderer.nodeShapeImpl(this.name, e, r, a, n, i);
        },
        intersectLine: function(e, r, a, n, i, s, o) {
          return Cs(i, s, e, r, a, n, o);
        },
        checkPoint: function(e, r, a, n, i, s, o) {
          var u = Fa(n, i), l = u * 2;
          return !!(pr(e, r, this.points, s, o, n, i - l, [0, -1], a) || pr(e, r, this.points, s, o, n - l, i, [0, -1], a) || Gr(e, r, l, l, s - n / 2 + u, o - i / 2 + u, a) || Gr(e, r, l, l, s + n / 2 - u, o - i / 2 + u, a) || Gr(e, r, l, l, s + n / 2 - u, o + i / 2 - u, a) || Gr(e, r, l, l, s - n / 2 + u, o + i / 2 - u, a));
        }
      };
    }, mr.generateCutRectangle = function() {
      return this.nodeShapes["cut-rectangle"] = this.nodeShapes.cutrectangle = {
        renderer: this,
        name: "cut-rectangle",
        cornerLength: Ss(),
        points: $t(4, 0),
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
          return Ba(i, s, l, e, r);
        },
        checkPoint: function(e, r, a, n, i, s, o) {
          if (pr(e, r, this.points, s, o, n, i - 2 * this.cornerLength, [0, -1], a) || pr(e, r, this.points, s, o, n - 2 * this.cornerLength, i, [0, -1], a))
            return !0;
          var u = this.generateCutTrianglePts(n, i, s, o);
          return Ht(e, r, u.topLeft) || Ht(e, r, u.topRight) || Ht(e, r, u.bottomRight) || Ht(e, r, u.bottomLeft);
        }
      };
    }, mr.generateBarrel = function() {
      return this.nodeShapes.barrel = {
        renderer: this,
        name: "barrel",
        points: $t(4, 0),
        draw: function(e, r, a, n, i) {
          this.renderer.nodeShapeImpl(this.name, e, r, a, n, i);
        },
        intersectLine: function(e, r, a, n, i, s, o) {
          var u = 0.15, l = 0.5, f = 0.85, h = this.generateBarrelBezierPts(a + 2 * o, n + 2 * o, e, r), v = function(y) {
            var p = ea({
              x: y[0],
              y: y[1]
            }, {
              x: y[2],
              y: y[3]
            }, {
              x: y[4],
              y: y[5]
            }, u), g = ea({
              x: y[0],
              y: y[1]
            }, {
              x: y[2],
              y: y[3]
            }, {
              x: y[4],
              y: y[5]
            }, l), m = ea({
              x: y[0],
              y: y[1]
            }, {
              x: y[2],
              y: y[3]
            }, {
              x: y[4],
              y: y[5]
            }, f);
            return [y[0], y[1], p.x, p.y, g.x, g.y, m.x, m.y, y[4], y[5]];
          }, d = [].concat(v(h.topLeft), v(h.topRight), v(h.bottomRight), v(h.bottomLeft));
          return Ba(i, s, d, e, r);
        },
        generateBarrelBezierPts: function(e, r, a, n) {
          var i = r / 2, s = e / 2, o = a - s, u = a + s, l = n - i, f = n + i, h = di(e, r), v = h.heightOffset, d = h.widthOffset, c = h.ctrlPtOffsetPct * e, y = {
            topLeft: [o, l + v, o + c, l, o + d, l],
            topRight: [u - d, l, u - c, l, u, l + v],
            bottomRight: [u, f - v, u - c, f, u - d, f],
            bottomLeft: [o + d, f, o + c, f, o, f - v]
          };
          return y.topLeft.isTop = !0, y.topRight.isTop = !0, y.bottomLeft.isBottom = !0, y.bottomRight.isBottom = !0, y;
        },
        checkPoint: function(e, r, a, n, i, s, o) {
          var u = di(n, i), l = u.heightOffset, f = u.widthOffset;
          if (pr(e, r, this.points, s, o, n, i - 2 * l, [0, -1], a) || pr(e, r, this.points, s, o, n - 2 * f, i, [0, -1], a))
            return !0;
          for (var h = this.generateBarrelBezierPts(n, i, s, o), v = function(w, k, D) {
            var F = D[4], G = D[2], N = D[0], X = D[5], B = D[1], re = Math.min(F, N), K = Math.max(F, N), W = Math.min(X, B), ae = Math.max(X, B);
            if (re <= w && w <= K && W <= k && k <= ae) {
              var ue = Pf(F, G, N), me = Af(ue[0], ue[1], ue[2], w), ie = me.filter(function(ge) {
                return 0 <= ge && ge <= 1;
              });
              if (ie.length > 0)
                return ie[0];
            }
            return null;
          }, d = Object.keys(h), c = 0; c < d.length; c++) {
            var y = d[c], p = h[y], g = v(e, r, p);
            if (g != null) {
              var m = p[5], b = p[3], E = p[1], M = Lt(m, b, E, g);
              if (p.isTop && M <= r || p.isBottom && r <= M)
                return !0;
            }
          }
          return !1;
        }
      };
    }, mr.generateBottomRoundrectangle = function() {
      return this.nodeShapes["bottom-round-rectangle"] = this.nodeShapes.bottomroundrectangle = {
        renderer: this,
        name: "bottom-round-rectangle",
        points: $t(4, 0),
        draw: function(e, r, a, n, i) {
          this.renderer.nodeShapeImpl(this.name, e, r, a, n, i);
        },
        intersectLine: function(e, r, a, n, i, s, o) {
          var u = e - (a / 2 + o), l = r - (n / 2 + o), f = l, h = e + (a / 2 + o), v = Cr(i, s, e, r, u, l, h, f, !1);
          return v.length > 0 ? v : Cs(i, s, e, r, a, n, o);
        },
        checkPoint: function(e, r, a, n, i, s, o) {
          var u = Fa(n, i), l = 2 * u;
          if (pr(e, r, this.points, s, o, n, i - l, [0, -1], a) || pr(e, r, this.points, s, o, n - l, i, [0, -1], a))
            return !0;
          var f = n / 2 + 2 * a, h = i / 2 + 2 * a, v = [s - f, o - h, s - f, o, s + f, o, s + f, o - h];
          return !!(Ht(e, r, v) || Gr(e, r, l, l, s + n / 2 - u, o + i / 2 - u, a) || Gr(e, r, l, l, s - n / 2 + u, o + i / 2 - u, a));
        }
      };
    }, mr.registerNodeShapes = function() {
      var t = this.nodeShapes = {}, e = this;
      this.generateEllipse(), this.generatePolygon("triangle", $t(3, 0)), this.generateRoundPolygon("round-triangle", $t(3, 0)), this.generatePolygon("rectangle", $t(4, 0)), t.square = t.rectangle, this.generateRoundRectangle(), this.generateCutRectangle(), this.generateBarrel(), this.generateBottomRoundrectangle();
      {
        var r = [0, 1, 1, 0, 0, -1, -1, 0];
        this.generatePolygon("diamond", r), this.generateRoundPolygon("round-diamond", r);
      }
      this.generatePolygon("pentagon", $t(5, 0)), this.generateRoundPolygon("round-pentagon", $t(5, 0)), this.generatePolygon("hexagon", $t(6, 0)), this.generateRoundPolygon("round-hexagon", $t(6, 0)), this.generatePolygon("heptagon", $t(7, 0)), this.generateRoundPolygon("round-heptagon", $t(7, 0)), this.generatePolygon("octagon", $t(8, 0)), this.generateRoundPolygon("round-octagon", $t(8, 0));
      var a = new Array(20);
      {
        var n = vi(5, 0), i = vi(5, Math.PI / 5), s = 0.5 * (3 - Math.sqrt(5));
        s *= 1.57;
        for (var o = 0; o < i.length / 2; o++)
          i[o * 2] *= s, i[o * 2 + 1] *= s;
        for (var o = 0; o < 20 / 4; o++)
          a[o * 4] = n[o * 2], a[o * 4 + 1] = n[o * 2 + 1], a[o * 4 + 2] = i[o * 2], a[o * 4 + 3] = i[o * 2 + 1];
      }
      a = Ds(a), this.generatePolygon("star", a), this.generatePolygon("vee", [-1, -1, 0, -0.333, 1, -1, 0, 1]), this.generatePolygon("rhomboid", [-1, -1, 0.333, -1, 1, 1, -0.333, 1]), this.generatePolygon("right-rhomboid", [-0.333, -1, 1, -1, 0.333, 1, -1, 1]), this.nodeShapes.concavehexagon = this.generatePolygon("concave-hexagon", [-1, -0.95, -0.75, 0, -1, 0.95, 1, 0.95, 0.75, 0, 1, -0.95]);
      {
        var u = [-1, -1, 0.25, -1, 1, 0, 0.25, 1, -1, 1];
        this.generatePolygon("tag", u), this.generateRoundPolygon("round-tag", u);
      }
      t.makePolygon = function(l) {
        var f = l.join("$"), h = "polygon-" + f, v;
        return (v = this[h]) ? v : e.generatePolygon(h, l);
      };
    };
    var Ja = {};
    Ja.timeToRender = function() {
      return this.redrawTotalTime / this.redrawCount;
    }, Ja.redraw = function(t) {
      t = t || ys();
      var e = this;
      e.averageRedrawTime === void 0 && (e.averageRedrawTime = 0), e.lastRedrawTime === void 0 && (e.lastRedrawTime = 0), e.lastDrawTime === void 0 && (e.lastDrawTime = 0), e.requestedFrame = !0, e.renderOptions = t;
    }, Ja.beforeRender = function(t, e) {
      if (!this.destroyed) {
        e == null && xt("Priority is not optional for beforeRender");
        var r = this.beforeRenderCallbacks;
        r.push({
          fn: t,
          priority: e
        }), r.sort(function(a, n) {
          return n.priority - a.priority;
        });
      }
    };
    var vl = function(e, r, a) {
      for (var n = e.beforeRenderCallbacks, i = 0; i < n.length; i++)
        n[i].fn(r, a);
    };
    Ja.startRenderLoop = function() {
      var t = this, e = t.cy;
      if (!t.renderLoopStarted) {
        t.renderLoopStarted = !0;
        var r = function a(n) {
          if (!t.destroyed) {
            if (!e.batching())
              if (t.requestedFrame && !t.skipFrame) {
                vl(t, !0, n);
                var i = gr();
                t.render(t.renderOptions);
                var s = t.lastDrawTime = gr();
                t.averageRedrawTime === void 0 && (t.averageRedrawTime = s - i), t.redrawCount === void 0 && (t.redrawCount = 0), t.redrawCount++, t.redrawTotalTime === void 0 && (t.redrawTotalTime = 0);
                var o = s - i;
                t.redrawTotalTime += o, t.lastRedrawTime = o, t.averageRedrawTime = t.averageRedrawTime / 2 + o / 2, t.requestedFrame = !1;
              } else
                vl(t, !1, n);
            t.skipFrame = !1, ln(a);
          }
        };
        ln(r);
      }
    };
    var dg = function(e) {
      this.init(e);
    }, cl = dg, ma = cl.prototype;
    ma.clientFunctions = ["redrawHint", "render", "renderTo", "matchCanvasSize", "nodeShapeImpl", "arrowShapeImpl"], ma.init = function(t) {
      var e = this;
      e.options = t, e.cy = t.cy;
      var r = e.container = t.cy.container(), a = e.cy.window();
      if (a) {
        var n = a.document, i = n.head, s = "__________cytoscape_stylesheet", o = "__________cytoscape_container", u = n.getElementById(s) != null;
        if (r.className.indexOf(o) < 0 && (r.className = (r.className || "") + " " + o), !u) {
          var l = n.createElement("style");
          l.id = s, l.textContent = "." + o + " { position: relative; }", i.insertBefore(l, i.children[0]);
        }
        var f = a.getComputedStyle(r), h = f.getPropertyValue("position");
        h === "static" && vt("A Cytoscape container has style position:static and so can not use UI extensions properly");
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
      }, e.redraws = 0, e.showFps = t.showFps, e.debug = t.debug, e.hideEdgesOnViewport = t.hideEdgesOnViewport, e.textureOnViewport = t.textureOnViewport, e.wheelSensitivity = t.wheelSensitivity, e.motionBlurEnabled = t.motionBlur, e.forcedPixelRatio = R(t.pixelRatio) ? t.pixelRatio : null, e.motionBlur = t.motionBlur, e.motionBlurOpacity = t.motionBlurOpacity, e.motionBlurTransparency = 1 - e.motionBlurOpacity, e.motionBlurPxRatio = 1, e.mbPxRBlurry = 1, e.minMbLowQualFrames = 4, e.fullQualityMb = !1, e.clearedForMotionBlur = [], e.desktopTapThreshold = t.desktopTapThreshold, e.desktopTapThreshold2 = t.desktopTapThreshold * t.desktopTapThreshold, e.touchTapThreshold = t.touchTapThreshold, e.touchTapThreshold2 = t.touchTapThreshold * t.touchTapThreshold, e.tapholdDuration = 500, e.bindings = [], e.beforeRenderCallbacks = [], e.beforeRenderPriorities = {
        // higher priority execs before lower one
        animations: 400,
        eleCalcs: 300,
        eleTxrDeq: 200,
        lyrTxrDeq: 150,
        lyrTxrSkip: 100
      }, e.registerNodeShapes(), e.registerArrowShapes(), e.registerCalculationListeners();
    }, ma.notify = function(t, e) {
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
    }, ma.destroy = function() {
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
    }, ma.isHeadless = function() {
      return !1;
    }, [Fi, fl, hl, ya, mr, Ja].forEach(function(t) {
      He(ma, t);
    });
    var zi = 1e3 / 60, dl = {
      setupDequeueing: function(e) {
        return function() {
          var a = this, n = this.renderer;
          if (!a.dequeueingSetup) {
            a.dequeueingSetup = !0;
            var i = on(function() {
              n.redrawHint("eles", !0), n.redrawHint("drag", !0), n.redraw();
            }, e.deqRedrawThreshold), s = function(l, f) {
              var h = gr(), v = n.averageRedrawTime, d = n.lastRedrawTime, c = [], y = n.cy.extent(), p = n.getPixelRatio();
              for (l || n.flushRenderedStyleQueue(); ; ) {
                var g = gr(), m = g - h, b = g - f;
                if (d < zi) {
                  var E = zi - (l ? v : 0);
                  if (b >= e.deqFastCost * E)
                    break;
                } else if (l) {
                  if (m >= e.deqCost * d || m >= e.deqAvgCost * v)
                    break;
                } else if (b >= e.deqNoDrawCost * zi)
                  break;
                var M = e.deq(a, p, y);
                if (M.length > 0)
                  for (var L = 0; L < M.length; L++)
                    c.push(M[L]);
                else
                  break;
              }
              c.length > 0 && (e.onDeqd(a, c), !l && e.shouldRedraw(a, c, p, y) && i());
            }, o = e.priority || si;
            n.beforeRender(s, o(a));
          }
        };
      }
    }, gg = /* @__PURE__ */ function() {
      function t(e) {
        var r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : fn;
        fe(this, t), this.idsByKey = new ur(), this.keyForId = new ur(), this.cachesByLvl = new ur(), this.lvls = [], this.getKey = e, this.doesEleInvalidateKey = r;
      }
      return C(t, [{
        key: "getIdsFor",
        value: function(r) {
          r == null && xt("Can not get id list for null key");
          var a = this.idsByKey, n = this.idsByKey.get(r);
          return n || (n = new Jr(), a.set(r, n)), n;
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
          return i || (i = new ur(), a.set(r, i), n.push(r)), i;
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
    }(), gl = 25, Kn = 50, Zn = -4, Vi = 3, pg = 7.99, yg = 8, mg = 1024, bg = 1024, Eg = 1024, wg = 0.2, xg = 0.8, Tg = 10, Cg = 0.15, Dg = 0.1, Sg = 0.9, Lg = 0.9, Ag = 100, Og = 1, ba = {
      dequeue: "dequeue",
      downscale: "downscale",
      highQuality: "highQuality"
    }, Ng = At({
      getKey: null,
      doesEleInvalidateKey: fn,
      drawElement: null,
      getBoundingBox: null,
      getRotationPoint: null,
      getRotationOffset: null,
      isVisible: cs,
      allowEdgeTxrCaching: !0,
      allowParentTxrCaching: !0
    }), ja = function(e, r) {
      var a = this;
      a.renderer = e, a.onDequeues = [];
      var n = Ng(r);
      He(a, n), a.lookup = new gg(n.getKey, n.doesEleInvalidateKey), a.setupDequeueing();
    }, Dt = ja.prototype;
    Dt.reasons = ba, Dt.getTextureQueue = function(t) {
      var e = this;
      return e.eleImgCaches = e.eleImgCaches || {}, e.eleImgCaches[t] = e.eleImgCaches[t] || [];
    }, Dt.getRetiredTextureQueue = function(t) {
      var e = this, r = e.eleImgCaches.retired = e.eleImgCaches.retired || {}, a = r[t] = r[t] || [];
      return a;
    }, Dt.getElementQueue = function() {
      var t = this, e = t.eleCacheQueue = t.eleCacheQueue || new Ra(function(r, a) {
        return a.reqs - r.reqs;
      });
      return e;
    }, Dt.getElementKeyToQueue = function() {
      var t = this, e = t.eleKeyToCacheQueue = t.eleKeyToCacheQueue || {};
      return e;
    }, Dt.getElement = function(t, e, r, a, n) {
      var i = this, s = this.renderer, o = s.cy.zoom(), u = this.lookup;
      if (!e || e.w === 0 || e.h === 0 || isNaN(e.w) || isNaN(e.h) || !t.visible() || t.removed() || !i.allowEdgeTxrCaching && t.isEdge() || !i.allowParentTxrCaching && t.isParent())
        return null;
      if (a == null && (a = Math.ceil(ui(o * r))), a < Zn)
        a = Zn;
      else if (o >= pg || a > Vi)
        return null;
      var l = Math.pow(2, a), f = e.h * l, h = e.w * l, v = s.eleTextBiggerThanMin(t, l);
      if (!this.isVisible(t, v))
        return null;
      var d = u.get(t, a);
      if (d && d.invalidated && (d.invalidated = !1, d.texture.invalidatedWidth -= d.width), d)
        return d;
      var c;
      if (f <= gl ? c = gl : f <= Kn ? c = Kn : c = Math.ceil(f / Kn) * Kn, f > Eg || h > bg)
        return null;
      var y = i.getTextureQueue(c), p = y[y.length - 2], g = function() {
        return i.recycleTexture(c, h) || i.addTexture(c, h);
      };
      p || (p = y[y.length - 1]), p || (p = g()), p.width - p.usedWidth < h && (p = g());
      for (var m = function(K) {
        return K && K.scaledLabelShown === v;
      }, b = n && n === ba.dequeue, E = n && n === ba.highQuality, M = n && n === ba.downscale, L, w = a + 1; w <= Vi; w++) {
        var k = u.get(t, w);
        if (k) {
          L = k;
          break;
        }
      }
      var D = L && L.level === a + 1 ? L : null, F = function() {
        p.context.drawImage(D.texture.canvas, D.x, 0, D.width, D.height, p.usedWidth, 0, h, f);
      };
      if (p.context.setTransform(1, 0, 0, 1, 0, 0), p.context.clearRect(p.usedWidth, 0, h, c), m(D))
        F();
      else if (m(L))
        if (E) {
          for (var G = L.level; G > a; G--)
            D = i.getElement(t, e, r, G, ba.downscale);
          F();
        } else
          return i.queueElement(t, L.level - 1), L;
      else {
        var N;
        if (!b && !E && !M)
          for (var X = a - 1; X >= Zn; X--) {
            var B = u.get(t, X);
            if (B) {
              N = B;
              break;
            }
          }
        if (m(N))
          return i.queueElement(t, a), N;
        p.context.translate(p.usedWidth, 0), p.context.scale(l, l), this.drawElement(p.context, t, e, v, !1), p.context.scale(1 / l, 1 / l), p.context.translate(-p.usedWidth, 0);
      }
      return d = {
        x: p.usedWidth,
        texture: p,
        level: a,
        scale: l,
        width: h,
        height: f,
        scaledLabelShown: v
      }, p.usedWidth += Math.ceil(h + yg), p.eleCaches.push(d), u.set(t, a, d), i.checkTextureFullness(p), d;
    }, Dt.invalidateElements = function(t) {
      for (var e = 0; e < t.length; e++)
        this.invalidateElement(t[e]);
    }, Dt.invalidateElement = function(t) {
      var e = this, r = e.lookup, a = [], n = r.isInvalid(t);
      if (n) {
        for (var i = Zn; i <= Vi; i++) {
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
    }, Dt.checkTextureUtility = function(t) {
      t.invalidatedWidth >= wg * t.width && this.retireTexture(t);
    }, Dt.checkTextureFullness = function(t) {
      var e = this, r = e.getTextureQueue(t.height);
      t.usedWidth / t.width > xg && t.fullnessChecks >= Tg ? xr(r, t) : t.fullnessChecks++;
    }, Dt.retireTexture = function(t) {
      var e = this, r = t.height, a = e.getTextureQueue(r), n = this.lookup;
      xr(a, t), t.retired = !0;
      for (var i = t.eleCaches, s = 0; s < i.length; s++) {
        var o = i[s];
        n.deleteCache(o.key, o.level);
      }
      oi(i);
      var u = e.getRetiredTextureQueue(r);
      u.push(t);
    }, Dt.addTexture = function(t, e) {
      var r = this, a = r.getTextureQueue(t), n = {};
      return a.push(n), n.eleCaches = [], n.height = t, n.width = Math.max(mg, e), n.usedWidth = 0, n.invalidatedWidth = 0, n.fullnessChecks = 0, n.canvas = r.renderer.makeOffscreenCanvas(n.width, n.height), n.context = n.canvas.getContext("2d"), n;
    }, Dt.recycleTexture = function(t, e) {
      for (var r = this, a = r.getTextureQueue(t), n = r.getRetiredTextureQueue(t), i = 0; i < n.length; i++) {
        var s = n[i];
        if (s.width >= e)
          return s.retired = !1, s.usedWidth = 0, s.invalidatedWidth = 0, s.fullnessChecks = 0, oi(s.eleCaches), s.context.setTransform(1, 0, 0, 1, 0, 0), s.context.clearRect(0, 0, s.width, s.height), xr(n, s), a.push(s), s;
      }
    }, Dt.queueElement = function(t, e) {
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
    }, Dt.dequeue = function(t) {
      for (var e = this, r = e.getElementQueue(), a = e.getElementKeyToQueue(), n = [], i = e.lookup, s = 0; s < Og && r.size() > 0; s++) {
        var o = r.pop(), u = o.key, l = o.eles[0], f = i.hasCache(l, o.level);
        if (a[u] = null, f)
          continue;
        n.push(o);
        var h = e.getBoundingBox(l);
        e.getElement(l, h, t, o.level, ba.dequeue);
      }
      return n;
    }, Dt.removeFromQueue = function(t) {
      var e = this, r = e.getElementQueue(), a = e.getElementKeyToQueue(), n = this.getKey(t), i = a[n];
      i != null && (i.eles.length === 1 ? (i.reqs = ii, r.updateItem(i), r.pop(), a[n] = null) : i.eles.unmerge(t));
    }, Dt.onDequeue = function(t) {
      this.onDequeues.push(t);
    }, Dt.offDequeue = function(t) {
      xr(this.onDequeues, t);
    }, Dt.setupDequeueing = dl.setupDequeueing({
      deqRedrawThreshold: Ag,
      deqCost: Cg,
      deqAvgCost: Dg,
      deqNoDrawCost: Sg,
      deqFastCost: Lg,
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
            if (fi(u, n))
              return !0;
          }
        return !1;
      },
      priority: function(e) {
        return e.renderer.beforeRenderPriorities.eleTxrDeq;
      }
    });
    var Ig = 1, en = -4, Qn = 2, Mg = 3.99, Rg = 50, kg = 50, Pg = 0.15, Bg = 0.1, Fg = 0.9, Gg = 0.9, zg = 1, pl = 250, Vg = 4e3 * 4e3, Ug = !0, yl = function(e) {
      var r = this, a = r.renderer = e, n = a.cy;
      r.layersByLevel = {}, r.firstGet = !0, r.lastInvalidationTime = gr() - 2 * pl, r.skipping = !1, r.eleTxrDeqs = n.collection(), r.scheduleElementRefinement = on(function() {
        r.refineElementTextures(r.eleTxrDeqs), r.eleTxrDeqs.unmerge(r.eleTxrDeqs);
      }, kg), a.beforeRender(function(s, o) {
        o - r.lastInvalidationTime <= pl ? r.skipping = !0 : r.skipping = !1;
      }, a.beforeRenderPriorities.lyrTxrSkip);
      var i = function(o, u) {
        return u.reqs - o.reqs;
      };
      r.layersQueue = new Ra(i), r.setupDequeueing();
    }, Mt = yl.prototype, ml = 0, $g = Math.pow(2, 53) - 1;
    Mt.makeLayer = function(t, e) {
      var r = Math.pow(2, e), a = Math.ceil(t.w * r), n = Math.ceil(t.h * r), i = this.renderer.makeOffscreenCanvas(a, n), s = {
        id: ml = ++ml % $g,
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
    }, Mt.getLayers = function(t, e, r) {
      var a = this, n = a.renderer, i = n.cy, s = i.zoom(), o = a.firstGet;
      if (a.firstGet = !1, r == null) {
        if (r = Math.ceil(ui(s * e)), r < en)
          r = en;
        else if (s >= Mg || r > Qn)
          return null;
      }
      a.validateLayersElesOrdering(r, t);
      var u = a.layersByLevel, l = Math.pow(2, r), f = u[r] = u[r] || [], h, v = a.levelIsComplete(r, t), d, c = function() {
        var F = function(re) {
          if (a.validateLayersElesOrdering(re, t), a.levelIsComplete(re, t))
            return d = u[re], !0;
        }, G = function(re) {
          if (!d)
            for (var K = r + re; en <= K && K <= Qn && !F(K); K += re)
              ;
        };
        G(1), G(-1);
        for (var N = f.length - 1; N >= 0; N--) {
          var X = f[N];
          X.invalid && xr(f, X);
        }
      };
      if (!v)
        c();
      else
        return f;
      var y = function() {
        if (!h) {
          h = Yt();
          for (var F = 0; F < t.length; F++)
            ws(h, t[F].boundingBox());
        }
        return h;
      }, p = function(F) {
        F = F || {};
        var G = F.after;
        y();
        var N = h.w * l * (h.h * l);
        if (N > Vg)
          return null;
        var X = a.makeLayer(h, r);
        if (G != null) {
          var B = f.indexOf(G) + 1;
          f.splice(B, 0, X);
        } else
          (F.insert === void 0 || F.insert) && f.unshift(X);
        return X;
      };
      if (a.skipping && !o)
        return null;
      for (var g = null, m = t.length / Ig, b = !o, E = 0; E < t.length; E++) {
        var M = t[E], L = M._private.rscratch, w = L.imgLayerCaches = L.imgLayerCaches || {}, k = w[r];
        if (k) {
          g = k;
          continue;
        }
        if ((!g || g.eles.length >= m || !Ts(g.bb, M.boundingBox())) && (g = p({
          insert: !0,
          after: g
        }), !g))
          return null;
        d || b ? a.queueLayer(g, M) : a.drawEleInLayer(g, M, r, e), g.eles.push(M), w[r] = g;
      }
      return d || (b ? null : f);
    }, Mt.getEleLevelForLayerLevel = function(t, e) {
      return t;
    }, Mt.drawEleInLayer = function(t, e, r, a) {
      var n = this, i = this.renderer, s = t.context, o = e.boundingBox();
      o.w === 0 || o.h === 0 || !e.visible() || (r = n.getEleLevelForLayerLevel(r, a), i.setImgSmoothing(s, !1), i.drawCachedElement(s, e, null, null, r, Ug), i.setImgSmoothing(s, !0));
    }, Mt.levelIsComplete = function(t, e) {
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
    }, Mt.validateLayersElesOrdering = function(t, e) {
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
    }, Mt.updateElementsInLayers = function(t, e) {
      for (var r = this, a = Ae(t[0]), n = 0; n < t.length; n++)
        for (var i = a ? null : t[n], s = a ? t[n] : t[n].ele, o = s._private.rscratch, u = o.imgLayerCaches = o.imgLayerCaches || {}, l = en; l <= Qn; l++) {
          var f = u[l];
          f && (i && r.getEleLevelForLayerLevel(f.level) !== i.level || e(f, s, i));
        }
    }, Mt.haveLayers = function() {
      for (var t = this, e = !1, r = en; r <= Qn; r++) {
        var a = t.layersByLevel[r];
        if (a && a.length > 0) {
          e = !0;
          break;
        }
      }
      return e;
    }, Mt.invalidateElements = function(t) {
      var e = this;
      t.length !== 0 && (e.lastInvalidationTime = gr(), !(t.length === 0 || !e.haveLayers()) && e.updateElementsInLayers(t, function(a, n, i) {
        e.invalidateLayer(a);
      }));
    }, Mt.invalidateLayer = function(t) {
      if (this.lastInvalidationTime = gr(), !t.invalid) {
        var e = t.level, r = t.eles, a = this.layersByLevel[e];
        xr(a, t), t.elesQueue = [], t.invalid = !0, t.replacement && (t.replacement.invalid = !0);
        for (var n = 0; n < r.length; n++) {
          var i = r[n]._private.rscratch.imgLayerCaches;
          i && (i[e] = null);
        }
      }
    }, Mt.refineElementTextures = function(t) {
      var e = this;
      e.updateElementsInLayers(t, function(a, n, i) {
        var s = a.replacement;
        if (s || (s = a.replacement = e.makeLayer(a.bb, a.level), s.replaces = a, s.eles = a.eles), !s.reqs)
          for (var o = 0; o < s.eles.length; o++)
            e.queueLayer(s, s.eles[o]);
      });
    }, Mt.enqueueElementRefinement = function(t) {
      this.eleTxrDeqs.merge(t), this.scheduleElementRefinement();
    }, Mt.queueLayer = function(t, e) {
      var r = this, a = r.layersQueue, n = t.elesQueue, i = n.hasId = n.hasId || {};
      if (!t.replacement) {
        if (e) {
          if (i[e.id()])
            return;
          n.push(e), i[e.id()] = !0;
        }
        t.reqs ? (t.reqs++, a.updateItem(t)) : (t.reqs = 1, a.push(t));
      }
    }, Mt.dequeue = function(t) {
      for (var e = this, r = e.layersQueue, a = [], n = 0; n < zg && r.size() !== 0; ) {
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
    }, Mt.applyLayerReplacement = function(t) {
      var e = this, r = e.layersByLevel[t.level], a = t.replaces, n = r.indexOf(a);
      if (!(n < 0 || a.invalid)) {
        r[n] = t;
        for (var i = 0; i < t.eles.length; i++) {
          var s = t.eles[i]._private, o = s.imgLayerCaches = s.imgLayerCaches || {};
          o && (o[t.level] = t);
        }
        e.requestRedraw();
      }
    }, Mt.requestRedraw = on(function() {
      var t = this.renderer;
      t.redrawHint("eles", !0), t.redrawHint("drag", !0), t.redraw();
    }, 100), Mt.setupDequeueing = dl.setupDequeueing({
      deqRedrawThreshold: Rg,
      deqCost: Pg,
      deqAvgCost: Bg,
      deqNoDrawCost: Fg,
      deqFastCost: Gg,
      deq: function(e, r) {
        return e.dequeue(r);
      },
      onDeqd: si,
      shouldRedraw: cs,
      priority: function(e) {
        return e.renderer.beforeRenderPriorities.lyrTxrDeq;
      }
    });
    var bl = {}, El;
    function _g(t, e) {
      for (var r = 0; r < e.length; r++) {
        var a = e[r];
        t.lineTo(a.x, a.y);
      }
    }
    function Yg(t, e, r) {
      for (var a, n = 0; n < e.length; n++) {
        var i = e[n];
        n === 0 && (a = i), t.lineTo(i.x, i.y);
      }
      t.quadraticCurveTo(r.x, r.y, a.x, a.y);
    }
    function wl(t, e, r) {
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
    function Hg(t, e, r, a, n) {
      t.beginPath && t.beginPath(), t.arc(r, a, n, 0, Math.PI * 2, !1);
      var i = e, s = i[0];
      t.moveTo(s.x, s.y);
      for (var o = 0; o < i.length; o++) {
        var u = i[o];
        t.lineTo(u.x, u.y);
      }
      t.closePath && t.closePath();
    }
    function Xg(t, e, r, a) {
      t.arc(e, r, a, 0, Math.PI * 2, !1);
    }
    bl.arrowShapeImpl = function(t) {
      return (El || (El = {
        polygon: _g,
        "triangle-backcurve": Yg,
        "triangle-tee": wl,
        "circle-triangle": Hg,
        "triangle-cross": wl,
        circle: Xg
      }))[t];
    };
    var vr = {};
    vr.drawElement = function(t, e, r, a, n, i) {
      var s = this;
      e.isNode() ? s.drawNode(t, e, r, a, n, i) : s.drawEdge(t, e, r, a, n, i);
    }, vr.drawElementOverlay = function(t, e) {
      var r = this;
      e.isNode() ? r.drawNodeOverlay(t, e) : r.drawEdgeOverlay(t, e);
    }, vr.drawElementUnderlay = function(t, e) {
      var r = this;
      e.isNode() ? r.drawNodeUnderlay(t, e) : r.drawEdgeUnderlay(t, e);
    }, vr.drawCachedElementPortion = function(t, e, r, a, n, i, s, o) {
      var u = this, l = r.getBoundingBox(e);
      if (!(l.w === 0 || l.h === 0)) {
        var f = r.getElement(e, l, a, n, i);
        if (f != null) {
          var h = o(u, e);
          if (h === 0)
            return;
          var v = s(u, e), d = l.x1, c = l.y1, y = l.w, p = l.h, g, m, b, E, M;
          if (v !== 0) {
            var L = r.getRotationPoint(e);
            b = L.x, E = L.y, t.translate(b, E), t.rotate(v), M = u.getImgSmoothing(t), M || u.setImgSmoothing(t, !0);
            var w = r.getRotationOffset(e);
            g = w.x, m = w.y;
          } else
            g = d, m = c;
          var k;
          h !== 1 && (k = t.globalAlpha, t.globalAlpha = k * h), t.drawImage(f.texture.canvas, f.x, 0, f.width, f.height, g, m, y, p), h !== 1 && (t.globalAlpha = k), v !== 0 && (t.rotate(-v), t.translate(-b, -E), M || u.setImgSmoothing(t, !1));
        } else
          r.drawElement(t, e);
      }
    };
    var Wg = function() {
      return 0;
    }, qg = function(e, r) {
      return e.getTextAngle(r, null);
    }, Kg = function(e, r) {
      return e.getTextAngle(r, "source");
    }, Zg = function(e, r) {
      return e.getTextAngle(r, "target");
    }, Qg = function(e, r) {
      return r.effectiveOpacity();
    }, Ui = function(e, r) {
      return r.pstyle("text-opacity").pfValue * r.effectiveOpacity();
    };
    vr.drawCachedElement = function(t, e, r, a, n, i) {
      var s = this, o = s.data, u = o.eleTxrCache, l = o.lblTxrCache, f = o.slbTxrCache, h = o.tlbTxrCache, v = e.boundingBox(), d = i === !0 ? u.reasons.highQuality : null;
      if (!(v.w === 0 || v.h === 0 || !e.visible()) && (!a || fi(v, a))) {
        var c = e.isEdge(), y = e.element()._private.rscratch.badLine;
        s.drawElementUnderlay(t, e), s.drawCachedElementPortion(t, e, u, r, n, d, Wg, Qg), (!c || !y) && s.drawCachedElementPortion(t, e, l, r, n, d, qg, Ui), c && !y && (s.drawCachedElementPortion(t, e, f, r, n, d, Kg, Ui), s.drawCachedElementPortion(t, e, h, r, n, d, Zg, Ui)), s.drawElementOverlay(t, e);
      }
    }, vr.drawElements = function(t, e) {
      for (var r = this, a = 0; a < e.length; a++) {
        var n = e[a];
        r.drawElement(t, n);
      }
    }, vr.drawCachedElements = function(t, e, r, a) {
      for (var n = this, i = 0; i < e.length; i++) {
        var s = e[i];
        n.drawCachedElement(t, s, r, a);
      }
    }, vr.drawCachedNodes = function(t, e, r, a) {
      for (var n = this, i = 0; i < e.length; i++) {
        var s = e[i];
        s.isNode() && n.drawCachedElement(t, s, r, a);
      }
    }, vr.drawLayeredElements = function(t, e, r, a) {
      var n = this, i = n.data.lyrTxrCache.getLayers(e, r);
      if (i)
        for (var s = 0; s < i.length; s++) {
          var o = i[s], u = o.bb;
          u.w === 0 || u.h === 0 || t.drawImage(o.canvas, u.x1, u.y1, u.w, u.h);
        }
      else
        n.drawCachedElements(t, e, r, a);
    };
    var br = {};
    br.drawEdge = function(t, e, r) {
      var a = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : !0, n = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : !0, i = arguments.length > 5 && arguments[5] !== void 0 ? arguments[5] : !0, s = this, o = e._private.rscratch;
      if (!(i && !e.visible()) && !(o.badLine || o.allpts == null || isNaN(o.allpts[0]))) {
        var u;
        r && (u = r, t.translate(-u.x1, -u.y1));
        var l = i ? e.pstyle("opacity").value : 1, f = i ? e.pstyle("line-opacity").value : 1, h = e.pstyle("curve-style").value, v = e.pstyle("line-style").value, d = e.pstyle("width").pfValue, c = e.pstyle("line-cap").value, y = l * f, p = l * f, g = function() {
          var N = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : y;
          h === "straight-triangle" ? (s.eleStrokeStyle(t, e, N), s.drawEdgeTrianglePath(e, t, o.allpts)) : (t.lineWidth = d, t.lineCap = c, s.eleStrokeStyle(t, e, N), s.drawEdgePath(e, t, o.allpts, v), t.lineCap = "butt");
        }, m = function() {
          n && s.drawEdgeOverlay(t, e);
        }, b = function() {
          n && s.drawEdgeUnderlay(t, e);
        }, E = function() {
          var N = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : p;
          s.drawArrowheads(t, e, N);
        }, M = function() {
          s.drawElementText(t, e, null, a);
        };
        t.lineJoin = "round";
        var L = e.pstyle("ghost").value === "yes";
        if (L) {
          var w = e.pstyle("ghost-offset-x").pfValue, k = e.pstyle("ghost-offset-y").pfValue, D = e.pstyle("ghost-opacity").value, F = y * D;
          t.translate(w, k), g(F), E(F), t.translate(-w, -k);
        }
        b(), g(), E(), m(), M(), r && t.translate(u.x1, u.y1);
      }
    };
    var xl = function(e) {
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
    br.drawEdgeOverlay = xl("overlay"), br.drawEdgeUnderlay = xl("underlay"), br.drawEdgePath = function(t, e, r, a) {
      var n = t._private.rscratch, i = e, s, o = !1, u = this.usePaths(), l = t.pstyle("line-dash-pattern").pfValue, f = t.pstyle("line-dash-offset").pfValue;
      if (u) {
        var h = r.join("$"), v = n.pathCacheKey && n.pathCacheKey === h;
        v ? (s = e = n.pathCache, o = !0) : (s = e = new Path2D(), n.pathCacheKey = h, n.pathCache = s);
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
            for (var d = 2; d + 3 < r.length; d += 4)
              e.quadraticCurveTo(r[d], r[d + 1], r[d + 2], r[d + 3]);
            break;
          case "straight":
          case "segments":
          case "haystack":
            for (var c = 2; c + 1 < r.length; c += 2)
              e.lineTo(r[c], r[c + 1]);
            break;
        }
      e = i, u ? e.stroke(s) : e.stroke(), e.setLineDash && e.setLineDash([]);
    }, br.drawEdgeTrianglePath = function(t, e, r) {
      e.fillStyle = e.strokeStyle;
      for (var a = t.pstyle("width").pfValue, n = 0; n + 1 < r.length; n += 2) {
        var i = [r[n + 2] - r[n], r[n + 3] - r[n + 1]], s = Math.sqrt(i[0] * i[0] + i[1] * i[1]), o = [i[1] / s, -i[0] / s], u = [o[0] * a / 2, o[1] * a / 2];
        e.beginPath(), e.moveTo(r[n] - u[0], r[n + 1] - u[1]), e.lineTo(r[n] + u[0], r[n + 1] + u[1]), e.lineTo(r[n + 2], r[n + 3]), e.closePath(), e.fill();
      }
    }, br.drawArrowheads = function(t, e, r) {
      var a = e._private.rscratch, n = a.edgeType === "haystack";
      n || this.drawArrowhead(t, e, "source", a.arrowStartX, a.arrowStartY, a.srcArrowAngle, r), this.drawArrowhead(t, e, "mid-target", a.midX, a.midY, a.midtgtArrowAngle, r), this.drawArrowhead(t, e, "mid-source", a.midX, a.midY, a.midsrcArrowAngle, r), n || this.drawArrowhead(t, e, "target", a.arrowEndX, a.arrowEndY, a.tgtArrowAngle, r);
    }, br.drawArrowhead = function(t, e, r, a, n, i, s) {
      if (!(isNaN(a) || a == null || isNaN(n) || n == null || isNaN(i) || i == null)) {
        var o = this, u = e.pstyle(r + "-arrow-shape").value;
        if (u !== "none") {
          var l = e.pstyle(r + "-arrow-fill").value === "hollow" ? "both" : "filled", f = e.pstyle(r + "-arrow-fill").value, h = e.pstyle("width").pfValue, v = e.pstyle(r + "-arrow-width"), d = v.value === "match-line" ? h : v.pfValue;
          v.units === "%" && (d *= h);
          var c = e.pstyle("opacity").value;
          s === void 0 && (s = c);
          var y = t.globalCompositeOperation;
          (s !== 1 || f === "hollow") && (t.globalCompositeOperation = "destination-out", o.colorFillStyle(t, 255, 255, 255, 1), o.colorStrokeStyle(t, 255, 255, 255, 1), o.drawArrowShape(e, t, l, h, u, d, a, n, i), t.globalCompositeOperation = y);
          var p = e.pstyle(r + "-arrow-color").value;
          o.colorFillStyle(t, p[0], p[1], p[2], s), o.colorStrokeStyle(t, p[0], p[1], p[2], s), o.drawArrowShape(e, t, f, h, u, d, a, n, i);
        }
      }
    }, br.drawArrowShape = function(t, e, r, a, n, i, s, o, u) {
      var l = this, f = this.usePaths() && n !== "triangle-cross", h = !1, v, d = e, c = {
        x: s,
        y: o
      }, y = t.pstyle("arrow-scale").value, p = this.getArrowWidth(a, y), g = l.arrowShapes[n];
      if (f) {
        var m = l.arrowPathCache = l.arrowPathCache || [], b = Pr(n), E = m[b];
        E != null ? (v = e = E, h = !0) : (v = e = new Path2D(), m[b] = v);
      }
      h || (e.beginPath && e.beginPath(), f ? g.draw(e, 1, 0, {
        x: 0,
        y: 0
      }, 1) : g.draw(e, p, u, c, a), e.closePath && e.closePath()), e = d, f && (e.translate(s, o), e.rotate(u), e.scale(p, p)), (r === "filled" || r === "both") && (f ? e.fill(v) : e.fill()), (r === "hollow" || r === "both") && (e.lineWidth = i / (f ? p : 1), e.lineJoin = "miter", f ? e.stroke(v) : e.stroke()), f && (e.scale(1 / p, 1 / p), e.rotate(-u), e.translate(-s, -o));
    };
    var $i = {};
    $i.safeDrawImage = function(t, e, r, a, n, i, s, o, u, l) {
      if (!(n <= 0 || i <= 0 || u <= 0 || l <= 0))
        try {
          t.drawImage(e, r, a, n, i, s, o, u, l);
        } catch (f) {
          vt(f);
        }
    }, $i.drawInscribedImage = function(t, e, r, a, n) {
      var i = this, s = r.position(), o = s.x, u = s.y, l = r.cy().style(), f = l.getIndexedStyle.bind(l), h = f(r, "background-fit", "value", a), v = f(r, "background-repeat", "value", a), d = r.width(), c = r.height(), y = r.padding() * 2, p = d + (f(r, "background-width-relative-to", "value", a) === "inner" ? 0 : y), g = c + (f(r, "background-height-relative-to", "value", a) === "inner" ? 0 : y), m = r._private.rscratch, b = f(r, "background-clip", "value", a), E = b === "node", M = f(r, "background-image-opacity", "value", a) * n, L = f(r, "background-image-smoothing", "value", a), w = e.width || e.cachedW, k = e.height || e.cachedH;
      (w == null || k == null) && (document.body.appendChild(e), w = e.cachedW = e.width || e.offsetWidth, k = e.cachedH = e.height || e.offsetHeight, document.body.removeChild(e));
      var D = w, F = k;
      if (f(r, "background-width", "value", a) !== "auto" && (f(r, "background-width", "units", a) === "%" ? D = f(r, "background-width", "pfValue", a) * p : D = f(r, "background-width", "pfValue", a)), f(r, "background-height", "value", a) !== "auto" && (f(r, "background-height", "units", a) === "%" ? F = f(r, "background-height", "pfValue", a) * g : F = f(r, "background-height", "pfValue", a)), !(D === 0 || F === 0)) {
        if (h === "contain") {
          var G = Math.min(p / D, g / F);
          D *= G, F *= G;
        } else if (h === "cover") {
          var G = Math.max(p / D, g / F);
          D *= G, F *= G;
        }
        var N = o - p / 2, X = f(r, "background-position-x", "units", a), B = f(r, "background-position-x", "pfValue", a);
        X === "%" ? N += (p - D) * B : N += B;
        var re = f(r, "background-offset-x", "units", a), K = f(r, "background-offset-x", "pfValue", a);
        re === "%" ? N += (p - D) * K : N += K;
        var W = u - g / 2, ae = f(r, "background-position-y", "units", a), ue = f(r, "background-position-y", "pfValue", a);
        ae === "%" ? W += (g - F) * ue : W += ue;
        var me = f(r, "background-offset-y", "units", a), ie = f(r, "background-offset-y", "pfValue", a);
        me === "%" ? W += (g - F) * ie : W += ie, m.pathCache && (N -= o, W -= u, o = 0, u = 0);
        var ge = t.globalAlpha;
        t.globalAlpha = M;
        var Ee = i.getImgSmoothing(t), Ce = !1;
        if (L === "no" && Ee ? (i.setImgSmoothing(t, !1), Ce = !0) : L === "yes" && !Ee && (i.setImgSmoothing(t, !0), Ce = !0), v === "no-repeat")
          E && (t.save(), m.pathCache ? t.clip(m.pathCache) : (i.nodeShapes[i.getNodeShape(r)].draw(t, o, u, p, g), t.clip())), i.safeDrawImage(t, e, 0, 0, w, k, N, W, D, F), E && t.restore();
        else {
          var we = t.createPattern(e, v);
          t.fillStyle = we, i.nodeShapes[i.getNodeShape(r)].draw(t, o, u, p, g), t.translate(N, W), t.fill(), t.translate(-N, -W);
        }
        t.globalAlpha = ge, Ce && i.setImgSmoothing(t, Ee);
      }
    };
    var _r = {};
    _r.eleTextBiggerThanMin = function(t, e) {
      if (!e) {
        var r = t.cy().zoom(), a = this.getPixelRatio(), n = Math.ceil(ui(r * a));
        e = Math.pow(2, n);
      }
      var i = t.pstyle("font-size").pfValue * e, s = t.pstyle("min-zoomed-font-size").pfValue;
      return !(i < s);
    }, _r.drawElementText = function(t, e, r, a, n) {
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
        var l = e.element()._private.rscratch.badLine, f = e.pstyle("label"), h = e.pstyle("source-label"), v = e.pstyle("target-label");
        if (l || (!f || !f.value) && (!h || !h.value) && (!v || !v.value))
          return;
        t.textAlign = "center", t.textBaseline = "bottom";
      }
      var d = !r, c;
      r && (c = r, t.translate(-c.x1, -c.y1)), n == null ? (s.drawText(t, e, null, d, i), e.isEdge() && (s.drawText(t, e, "source", d, i), s.drawText(t, e, "target", d, i))) : s.drawText(t, e, n, d, i), r && t.translate(c.x1, c.y1);
    }, _r.getFontCache = function(t) {
      var e;
      this.fontCaches = this.fontCaches || [];
      for (var r = 0; r < this.fontCaches.length; r++)
        if (e = this.fontCaches[r], e.context === t)
          return e;
      return e = {
        context: t
      }, this.fontCaches.push(e), e;
    }, _r.setupTextStyle = function(t, e) {
      var r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !0, a = e.pstyle("font-style").strValue, n = e.pstyle("font-size").pfValue + "px", i = e.pstyle("font-family").strValue, s = e.pstyle("font-weight").strValue, o = r ? e.effectiveOpacity() * e.pstyle("text-opacity").value : 1, u = e.pstyle("text-outline-opacity").value * o, l = e.pstyle("color").value, f = e.pstyle("text-outline-color").value;
      t.font = a + " " + s + " " + n + " " + i, t.lineJoin = "round", this.colorFillStyle(t, l[0], l[1], l[2], o), this.colorStrokeStyle(t, f[0], f[1], f[2], u);
    };
    function _i(t, e, r, a, n) {
      var i = arguments.length > 5 && arguments[5] !== void 0 ? arguments[5] : 5, s = arguments.length > 6 ? arguments[6] : void 0;
      t.beginPath(), t.moveTo(e + i, r), t.lineTo(e + a - i, r), t.quadraticCurveTo(e + a, r, e + a, r + i), t.lineTo(e + a, r + n - i), t.quadraticCurveTo(e + a, r + n, e + a - i, r + n), t.lineTo(e + i, r + n), t.quadraticCurveTo(e, r + n, e, r + n - i), t.lineTo(e, r + i), t.quadraticCurveTo(e, r, e + i, r), t.closePath(), s ? t.stroke() : t.fill();
    }
    _r.getTextAngle = function(t, e) {
      var r, a = t._private, n = a.rscratch, i = e ? e + "-" : "", s = t.pstyle(i + "text-rotation"), o = er(n, "labelAngle", e);
      return s.strValue === "autorotate" ? r = t.isEdge() ? o : 0 : s.strValue === "none" ? r = 0 : r = s.pfValue, r;
    }, _r.drawText = function(t, e, r) {
      var a = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : !0, n = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : !0, i = e._private, s = i.rscratch, o = n ? e.effectiveOpacity() : 1;
      if (!(n && (o === 0 || e.pstyle("text-opacity").value === 0))) {
        r === "main" && (r = null);
        var u = er(s, "labelX", r), l = er(s, "labelY", r), f, h, v = this.getLabelText(e, r);
        if (v != null && v !== "" && !isNaN(u) && !isNaN(l)) {
          this.setupTextStyle(t, e, n);
          var d = r ? r + "-" : "", c = er(s, "labelWidth", r), y = er(s, "labelHeight", r), p = e.pstyle(d + "text-margin-x").pfValue, g = e.pstyle(d + "text-margin-y").pfValue, m = e.isEdge(), b = e.pstyle("text-halign").value, E = e.pstyle("text-valign").value;
          m && (b = "center", E = "center"), u += p, l += g;
          var M;
          switch (a ? M = this.getTextAngle(e, r) : M = 0, M !== 0 && (f = u, h = l, t.translate(f, h), t.rotate(M), u = 0, l = 0), E) {
            case "top":
              break;
            case "center":
              l += y / 2;
              break;
            case "bottom":
              l += y;
              break;
          }
          var L = e.pstyle("text-background-opacity").value, w = e.pstyle("text-border-opacity").value, k = e.pstyle("text-border-width").pfValue, D = e.pstyle("text-background-padding").pfValue, F = e.pstyle("text-background-shape").strValue, G = F.indexOf("round") === 0, N = 2;
          if (L > 0 || k > 0 && w > 0) {
            var X = u - D;
            switch (b) {
              case "left":
                X -= c;
                break;
              case "center":
                X -= c / 2;
                break;
            }
            var B = l - y - D, re = c + 2 * D, K = y + 2 * D;
            if (L > 0) {
              var W = t.fillStyle, ae = e.pstyle("text-background-color").value;
              t.fillStyle = "rgba(" + ae[0] + "," + ae[1] + "," + ae[2] + "," + L * o + ")", G ? _i(t, X, B, re, K, N) : t.fillRect(X, B, re, K), t.fillStyle = W;
            }
            if (k > 0 && w > 0) {
              var ue = t.strokeStyle, me = t.lineWidth, ie = e.pstyle("text-border-color").value, ge = e.pstyle("text-border-style").value;
              if (t.strokeStyle = "rgba(" + ie[0] + "," + ie[1] + "," + ie[2] + "," + w * o + ")", t.lineWidth = k, t.setLineDash)
                switch (ge) {
                  case "dotted":
                    t.setLineDash([1, 1]);
                    break;
                  case "dashed":
                    t.setLineDash([4, 2]);
                    break;
                  case "double":
                    t.lineWidth = k / 4, t.setLineDash([]);
                    break;
                  case "solid":
                    t.setLineDash([]);
                    break;
                }
              if (G ? _i(t, X, B, re, K, N, "stroke") : t.strokeRect(X, B, re, K), ge === "double") {
                var Ee = k / 2;
                G ? _i(t, X + Ee, B + Ee, re - Ee * 2, K - Ee * 2, N, "stroke") : t.strokeRect(X + Ee, B + Ee, re - Ee * 2, K - Ee * 2);
              }
              t.setLineDash && t.setLineDash([]), t.lineWidth = me, t.strokeStyle = ue;
            }
          }
          var Ce = 2 * e.pstyle("text-outline-width").pfValue;
          if (Ce > 0 && (t.lineWidth = Ce), e.pstyle("text-wrap").value === "wrap") {
            var we = er(s, "labelWrapCachedLines", r), De = er(s, "labelLineHeight", r), se = c / 2, xe = this.getLabelJustification(e);
            switch (xe === "auto" || (b === "left" ? xe === "left" ? u += -c : xe === "center" && (u += -se) : b === "center" ? xe === "left" ? u += -se : xe === "right" && (u += se) : b === "right" && (xe === "center" ? u += se : xe === "right" && (u += c))), E) {
              case "top":
                l -= (we.length - 1) * De;
                break;
              case "center":
              case "bottom":
                l -= (we.length - 1) * De;
                break;
            }
            for (var Le = 0; Le < we.length; Le++)
              Ce > 0 && t.strokeText(we[Le], u, l), t.fillText(we[Le], u, l), l += De;
          } else
            Ce > 0 && t.strokeText(v, u, l), t.fillText(v, u, l);
          M !== 0 && (t.rotate(-M), t.translate(-f, -h));
        }
      }
    };
    var Ea = {};
    Ea.drawNode = function(t, e, r) {
      var a = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : !0, n = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : !0, i = arguments.length > 5 && arguments[5] !== void 0 ? arguments[5] : !0, s = this, o, u, l = e._private, f = l.rscratch, h = e.position();
      if (!(!R(h.x) || !R(h.y)) && !(i && !e.visible())) {
        var v = i ? e.effectiveOpacity() : 1, d = s.usePaths(), c, y = !1, p = e.padding();
        o = e.width() + 2 * p, u = e.height() + 2 * p;
        var g;
        r && (g = r, t.translate(-g.x1, -g.y1));
        for (var m = e.pstyle("background-image"), b = m.value, E = new Array(b.length), M = new Array(b.length), L = 0, w = 0; w < b.length; w++) {
          var k = b[w], D = E[w] = k != null && k !== "none";
          if (D) {
            var F = e.cy().style().getIndexedStyle(e, "background-image-crossorigin", "value", w);
            L++, M[w] = s.getCachedImage(k, F, function() {
              l.backgroundTimestamp = Date.now(), e.emitAndNotify("background");
            });
          }
        }
        var G = e.pstyle("background-blacken").value, N = e.pstyle("border-width").pfValue, X = e.pstyle("background-opacity").value * v, B = e.pstyle("border-color").value, re = e.pstyle("border-style").value, K = e.pstyle("border-opacity").value * v, W = e.pstyle("outline-width").pfValue, ae = e.pstyle("outline-color").value, ue = e.pstyle("outline-style").value, me = e.pstyle("outline-opacity").value * v, ie = e.pstyle("outline-offset").value;
        t.lineJoin = "miter";
        var ge = function() {
          var he = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : X;
          s.eleFillStyle(t, e, he);
        }, Ee = function() {
          var he = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : K;
          s.colorStrokeStyle(t, B[0], B[1], B[2], he);
        }, Ce = function() {
          var he = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : me;
          s.colorStrokeStyle(t, ae[0], ae[1], ae[2], he);
        }, we = function(he, O, oe, Te) {
          var ce = s.nodePathCache = s.nodePathCache || [], ye = hs(oe === "polygon" ? oe + "," + Te.join(",") : oe, "" + O, "" + he), _e = ce[ye], be, Ge = !1;
          return _e != null ? (be = _e, Ge = !0, f.pathCache = be) : (be = new Path2D(), ce[ye] = f.pathCache = be), {
            path: be,
            cacheHit: Ge
          };
        }, De = e.pstyle("shape").strValue, se = e.pstyle("shape-polygon-points").pfValue;
        if (d) {
          t.translate(h.x, h.y);
          var xe = we(o, u, De, se);
          c = xe.path, y = xe.cacheHit;
        }
        var Le = function() {
          if (!y) {
            var he = h;
            d && (he = {
              x: 0,
              y: 0
            }), s.nodeShapes[s.getNodeShape(e)].draw(c || t, he.x, he.y, o, u);
          }
          d ? t.fill(c) : t.fill();
        }, Se = function() {
          for (var he = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : v, O = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0, oe = l.backgrounding, Te = 0, ce = 0; ce < M.length; ce++) {
            var ye = e.cy().style().getIndexedStyle(e, "background-image-containment", "value", ce);
            if (O && ye === "over" || !O && ye === "inside") {
              Te++;
              continue;
            }
            E[ce] && M[ce].complete && !M[ce].error && (Te++, s.drawInscribedImage(t, M[ce], e, ce, he));
          }
          l.backgrounding = Te !== L, oe !== l.backgrounding && e.updateStyle(!1);
        }, Oe = function() {
          var he = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !1, O = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : v;
          s.hasPie(e) && (s.drawPie(t, e, O), he && (d || s.nodeShapes[s.getNodeShape(e)].draw(t, h.x, h.y, o, u)));
        }, Fe = function() {
          var he = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : v, O = (G > 0 ? G : -G) * he, oe = G > 0 ? 0 : 255;
          G !== 0 && (s.colorFillStyle(t, oe, oe, oe, O), d ? t.fill(c) : t.fill());
        }, Xe = function() {
          if (N > 0) {
            if (t.lineWidth = N, t.lineCap = "butt", t.setLineDash)
              switch (re) {
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
            if (d ? t.stroke(c) : t.stroke(), re === "double") {
              t.lineWidth = N / 3;
              var he = t.globalCompositeOperation;
              t.globalCompositeOperation = "destination-out", d ? t.stroke(c) : t.stroke(), t.globalCompositeOperation = he;
            }
            t.setLineDash && t.setLineDash([]);
          }
        }, Ie = function() {
          if (W > 0) {
            if (t.lineWidth = W, t.lineCap = "butt", t.setLineDash)
              switch (ue) {
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
            var he = h;
            d && (he = {
              x: 0,
              y: 0
            });
            var O = s.getNodeShape(e), oe = (o + N + (W + ie)) / o, Te = (u + N + (W + ie)) / u, ce = o * oe, ye = u * Te, _e = s.nodeShapes[O].points, be;
            if (d) {
              var Ge = we(ce, ye, O, _e);
              be = Ge.path;
            }
            if (O === "ellipse")
              s.drawEllipsePath(be || t, he.x, he.y, ce, ye);
            else if (["round-diamond", "round-heptagon", "round-hexagon", "round-octagon", "round-pentagon", "round-polygon", "round-triangle", "round-tag"].includes(O)) {
              var Qe = 0, ft = 0, qe = 0;
              O === "round-diamond" ? Qe = (N + ie + W) * 1.4 : O === "round-heptagon" ? (Qe = (N + ie + W) * 1.075, qe = -(N / 2 + ie + W) / 35) : O === "round-hexagon" ? Qe = (N + ie + W) * 1.12 : O === "round-pentagon" ? (Qe = (N + ie + W) * 1.13, qe = -(N / 2 + ie + W) / 15) : O === "round-tag" ? (Qe = (N + ie + W) * 1.12, ft = (N / 2 + W + ie) * 0.07) : O === "round-triangle" && (Qe = (N + ie + W) * (Math.PI / 2), qe = -(N + ie / 2 + W) / Math.PI), Qe !== 0 && (oe = (o + Qe) / o, Te = (u + Qe) / u), s.drawRoundPolygonPath(be || t, he.x + ft, he.y + qe, o * oe, u * Te, _e);
            } else if (["roundrectangle", "round-rectangle"].includes(O))
              s.drawRoundRectanglePath(be || t, he.x, he.y, ce, ye);
            else if (["cutrectangle", "cut-rectangle"].includes(O))
              s.drawCutRectanglePath(be || t, he.x, he.y, ce, ye);
            else if (["bottomroundrectangle", "bottom-round-rectangle"].includes(O))
              s.drawBottomRoundRectanglePath(be || t, he.x, he.y, ce, ye);
            else if (O === "barrel")
              s.drawBarrelPath(be || t, he.x, he.y, ce, ye);
            else if (O.startsWith("polygon") || ["rhomboid", "right-rhomboid", "round-tag", "tag", "vee"].includes(O)) {
              var ot = (N + W + ie) / o;
              _e = pn(yn(_e, ot)), s.drawPolygonPath(be || t, he.x, he.y, o, u, _e);
            } else {
              var Ke = (N + W + ie) / o;
              _e = pn(yn(_e, -Ke)), s.drawPolygonPath(be || t, he.x, he.y, o, u, _e);
            }
            if (d ? t.stroke(be) : t.stroke(), ue === "double") {
              t.lineWidth = N / 3;
              var Je = t.globalCompositeOperation;
              t.globalCompositeOperation = "destination-out", d ? t.stroke(be) : t.stroke(), t.globalCompositeOperation = Je;
            }
            t.setLineDash && t.setLineDash([]);
          }
        }, Me = function() {
          n && s.drawNodeOverlay(t, e, h, o, u);
        }, Ue = function() {
          n && s.drawNodeUnderlay(t, e, h, o, u);
        }, ze = function() {
          s.drawElementText(t, e, null, a);
        }, Be = e.pstyle("ghost").value === "yes";
        if (Be) {
          var $e = e.pstyle("ghost-offset-x").pfValue, rt = e.pstyle("ghost-offset-y").pfValue, je = e.pstyle("ghost-opacity").value, We = je * v;
          t.translate($e, rt), Ce(), Ie(), ge(je * X), Le(), Se(We, !0), Ee(je * K), Xe(), Oe(G !== 0 || N !== 0), Se(We, !1), Fe(We), t.translate(-$e, -rt);
        }
        d && t.translate(-h.x, -h.y), Ue(), d && t.translate(h.x, h.y), Ce(), Ie(), ge(), Le(), Se(v, !0), Ee(), Xe(), Oe(G !== 0 || N !== 0), Se(v, !1), Fe(), d && t.translate(-h.x, -h.y), ze(), Me(), r && t.translate(g.x1, g.y1);
      }
    };
    var Tl = function(e) {
      if (!["overlay", "underlay"].includes(e))
        throw new Error("Invalid state");
      return function(r, a, n, i, s) {
        var o = this;
        if (a.visible()) {
          var u = a.pstyle("".concat(e, "-padding")).pfValue, l = a.pstyle("".concat(e, "-opacity")).value, f = a.pstyle("".concat(e, "-color")).value, h = a.pstyle("".concat(e, "-shape")).value;
          if (l > 0) {
            if (n = n || a.position(), i == null || s == null) {
              var v = a.padding();
              i = a.width() + 2 * v, s = a.height() + 2 * v;
            }
            o.colorFillStyle(r, f[0], f[1], f[2], l), o.nodeShapes[h].draw(r, n.x, n.y, i + u * 2, s + u * 2), r.fill();
          }
        }
      };
    };
    Ea.drawNodeOverlay = Tl("overlay"), Ea.drawNodeUnderlay = Tl("underlay"), Ea.hasPie = function(t) {
      return t = t[0], t._private.hasPie;
    }, Ea.drawPie = function(t, e, r, a) {
      e = e[0], a = a || e.position();
      var n = e.cy().style(), i = e.pstyle("pie-size"), s = a.x, o = a.y, u = e.width(), l = e.height(), f = Math.min(u, l) / 2, h = 0, v = this.usePaths();
      v && (s = 0, o = 0), i.units === "%" ? f = f * i.pfValue : i.pfValue !== void 0 && (f = i.pfValue / 2);
      for (var d = 1; d <= n.pieBackgroundN; d++) {
        var c = e.pstyle("pie-" + d + "-background-size").value, y = e.pstyle("pie-" + d + "-background-color").value, p = e.pstyle("pie-" + d + "-background-opacity").value * r, g = c / 100;
        g + h > 1 && (g = 1 - h);
        var m = 1.5 * Math.PI + 2 * Math.PI * h, b = 2 * Math.PI * g, E = m + b;
        c === 0 || h >= 1 || h + g > 1 || (t.beginPath(), t.moveTo(s, o), t.arc(s, o, f, m, E), t.closePath(), this.colorFillStyle(t, y[0], y[1], y[2], p), t.fill(), h += g);
      }
    };
    var Kt = {}, Jg = 100;
    Kt.getPixelRatio = function() {
      var t = this.data.contexts[0];
      if (this.forcedPixelRatio != null)
        return this.forcedPixelRatio;
      var e = t.backingStorePixelRatio || t.webkitBackingStorePixelRatio || t.mozBackingStorePixelRatio || t.msBackingStorePixelRatio || t.oBackingStorePixelRatio || t.backingStorePixelRatio || 1;
      return (window.devicePixelRatio || 1) / e;
    }, Kt.paintCache = function(t) {
      for (var e = this.paintCaches = this.paintCaches || [], r = !0, a, n = 0; n < e.length; n++)
        if (a = e[n], a.context === t) {
          r = !1;
          break;
        }
      return r && (a = {
        context: t
      }, e.push(a)), a;
    }, Kt.createGradientStyleFor = function(t, e, r, a, n) {
      var i, s = this.usePaths(), o = r.pstyle(e + "-gradient-stop-colors").value, u = r.pstyle(e + "-gradient-stop-positions").pfValue;
      if (a === "radial-gradient")
        if (r.isEdge()) {
          var l = r.sourceEndpoint(), f = r.targetEndpoint(), h = r.midpoint(), v = Br(l, h), d = Br(f, h);
          i = t.createRadialGradient(h.x, h.y, 0, h.x, h.y, Math.max(v, d));
        } else {
          var c = s ? {
            x: 0,
            y: 0
          } : r.position(), y = r.paddedWidth(), p = r.paddedHeight();
          i = t.createRadialGradient(c.x, c.y, 0, c.x, c.y, Math.max(y, p));
        }
      else if (r.isEdge()) {
        var g = r.sourceEndpoint(), m = r.targetEndpoint();
        i = t.createLinearGradient(g.x, g.y, m.x, m.y);
      } else {
        var b = s ? {
          x: 0,
          y: 0
        } : r.position(), E = r.paddedWidth(), M = r.paddedHeight(), L = E / 2, w = M / 2, k = r.pstyle("background-gradient-direction").value;
        switch (k) {
          case "to-bottom":
            i = t.createLinearGradient(b.x, b.y - w, b.x, b.y + w);
            break;
          case "to-top":
            i = t.createLinearGradient(b.x, b.y + w, b.x, b.y - w);
            break;
          case "to-left":
            i = t.createLinearGradient(b.x + L, b.y, b.x - L, b.y);
            break;
          case "to-right":
            i = t.createLinearGradient(b.x - L, b.y, b.x + L, b.y);
            break;
          case "to-bottom-right":
          case "to-right-bottom":
            i = t.createLinearGradient(b.x - L, b.y - w, b.x + L, b.y + w);
            break;
          case "to-top-right":
          case "to-right-top":
            i = t.createLinearGradient(b.x - L, b.y + w, b.x + L, b.y - w);
            break;
          case "to-bottom-left":
          case "to-left-bottom":
            i = t.createLinearGradient(b.x + L, b.y - w, b.x - L, b.y + w);
            break;
          case "to-top-left":
          case "to-left-top":
            i = t.createLinearGradient(b.x + L, b.y + w, b.x - L, b.y - w);
            break;
        }
      }
      if (!i)
        return null;
      for (var D = u.length === o.length, F = o.length, G = 0; G < F; G++)
        i.addColorStop(D ? u[G] : G / (F - 1), "rgba(" + o[G][0] + "," + o[G][1] + "," + o[G][2] + "," + n + ")");
      return i;
    }, Kt.gradientFillStyle = function(t, e, r, a) {
      var n = this.createGradientStyleFor(t, "background", e, r, a);
      if (!n)
        return null;
      t.fillStyle = n;
    }, Kt.colorFillStyle = function(t, e, r, a, n) {
      t.fillStyle = "rgba(" + e + "," + r + "," + a + "," + n + ")";
    }, Kt.eleFillStyle = function(t, e, r) {
      var a = e.pstyle("background-fill").value;
      if (a === "linear-gradient" || a === "radial-gradient")
        this.gradientFillStyle(t, e, a, r);
      else {
        var n = e.pstyle("background-color").value;
        this.colorFillStyle(t, n[0], n[1], n[2], r);
      }
    }, Kt.gradientStrokeStyle = function(t, e, r, a) {
      var n = this.createGradientStyleFor(t, "line", e, r, a);
      if (!n)
        return null;
      t.strokeStyle = n;
    }, Kt.colorStrokeStyle = function(t, e, r, a, n) {
      t.strokeStyle = "rgba(" + e + "," + r + "," + a + "," + n + ")";
    }, Kt.eleStrokeStyle = function(t, e, r) {
      var a = e.pstyle("line-fill").value;
      if (a === "linear-gradient" || a === "radial-gradient")
        this.gradientStrokeStyle(t, e, a, r);
      else {
        var n = e.pstyle("line-color").value;
        this.colorStrokeStyle(t, n[0], n[1], n[2], r);
      }
    }, Kt.matchCanvasSize = function(t) {
      var e = this, r = e.data, a = e.findContainerClientCoords(), n = a[2], i = a[3], s = e.getPixelRatio(), o = e.motionBlurPxRatio;
      (t === e.data.bufferCanvases[e.MOTIONBLUR_BUFFER_NODE] || t === e.data.bufferCanvases[e.MOTIONBLUR_BUFFER_DRAG]) && (s = o);
      var u = n * s, l = i * s, f;
      if (!(u === e.canvasWidth && l === e.canvasHeight)) {
        e.fontCaches = null;
        var h = r.canvasContainer;
        h.style.width = n + "px", h.style.height = i + "px";
        for (var v = 0; v < e.CANVAS_LAYERS; v++)
          f = r.canvases[v], f.width = u, f.height = l, f.style.width = n + "px", f.style.height = i + "px";
        for (var v = 0; v < e.BUFFER_COUNT; v++)
          f = r.bufferCanvases[v], f.width = u, f.height = l, f.style.width = n + "px", f.style.height = i + "px";
        e.textureMult = 1, s <= 1 && (f = r.bufferCanvases[e.TEXTURE_BUFFER], e.textureMult = 2, f.width = u * e.textureMult, f.height = l * e.textureMult), e.canvasWidth = u, e.canvasHeight = l;
      }
    }, Kt.renderTo = function(t, e, r, a) {
      this.render({
        forcedContext: t,
        forcedZoom: e,
        forcedPan: r,
        drawAllLayers: !0,
        forcedPxRatio: a
      });
    }, Kt.render = function(t) {
      t = t || ys();
      var e = t.forcedContext, r = t.drawAllLayers, a = t.drawOnlyNodeLayer, n = t.forcedZoom, i = t.forcedPan, s = this, o = t.forcedPxRatio === void 0 ? this.getPixelRatio() : t.forcedPxRatio, u = s.cy, l = s.data, f = l.canvasNeedsRedraw, h = s.textureOnViewport && !e && (s.pinching || s.hoverData.dragging || s.swipePanning || s.data.wheelZooming), v = t.motionBlur !== void 0 ? t.motionBlur : s.motionBlur, d = s.motionBlurPxRatio, c = u.hasCompoundNodes(), y = s.hoverData.draggingEles, p = !!(s.hoverData.selecting || s.touchData.selecting);
      v = v && !e && s.motionBlurEnabled && !p;
      var g = v;
      e || (s.prevPxRatio !== o && (s.invalidateContainerClientCoordsCache(), s.matchCanvasSize(s.container), s.redrawHint("eles", !0), s.redrawHint("drag", !0)), s.prevPxRatio = o), !e && s.motionBlurTimeout && clearTimeout(s.motionBlurTimeout), v && (s.mbFrames == null && (s.mbFrames = 0), s.mbFrames++, s.mbFrames < 3 && (g = !1), s.mbFrames > s.minMbLowQualFrames && (s.motionBlurPxRatio = s.mbPxRBlurry)), s.clearingMotionBlur && (s.motionBlurPxRatio = 1), s.textureDrawLastFrame && !h && (f[s.NODE] = !0, f[s.SELECT_BOX] = !0);
      var m = u.style(), b = u.zoom(), E = n !== void 0 ? n : b, M = u.pan(), L = {
        x: M.x,
        y: M.y
      }, w = {
        zoom: b,
        pan: {
          x: M.x,
          y: M.y
        }
      }, k = s.prevViewport, D = k === void 0 || w.zoom !== k.zoom || w.pan.x !== k.pan.x || w.pan.y !== k.pan.y;
      !D && !(y && !c) && (s.motionBlurPxRatio = 1), i && (L = i), E *= o, L.x *= o, L.y *= o;
      var F = s.getCachedZSortedEles();
      function G(Ie, Me, Ue, ze, Be) {
        var $e = Ie.globalCompositeOperation;
        Ie.globalCompositeOperation = "destination-out", s.colorFillStyle(Ie, 255, 255, 255, s.motionBlurTransparency), Ie.fillRect(Me, Ue, ze, Be), Ie.globalCompositeOperation = $e;
      }
      function N(Ie, Me) {
        var Ue, ze, Be, $e;
        !s.clearingMotionBlur && (Ie === l.bufferContexts[s.MOTIONBLUR_BUFFER_NODE] || Ie === l.bufferContexts[s.MOTIONBLUR_BUFFER_DRAG]) ? (Ue = {
          x: M.x * d,
          y: M.y * d
        }, ze = b * d, Be = s.canvasWidth * d, $e = s.canvasHeight * d) : (Ue = L, ze = E, Be = s.canvasWidth, $e = s.canvasHeight), Ie.setTransform(1, 0, 0, 1, 0, 0), Me === "motionBlur" ? G(Ie, 0, 0, Be, $e) : !e && (Me === void 0 || Me) && Ie.clearRect(0, 0, Be, $e), r || (Ie.translate(Ue.x, Ue.y), Ie.scale(ze, ze)), i && Ie.translate(i.x, i.y), n && Ie.scale(n, n);
      }
      if (h || (s.textureDrawLastFrame = !1), h) {
        if (s.textureDrawLastFrame = !0, !s.textureCache) {
          s.textureCache = {}, s.textureCache.bb = u.mutableElements().boundingBox(), s.textureCache.texture = s.data.bufferCanvases[s.TEXTURE_BUFFER];
          var X = s.data.bufferContexts[s.TEXTURE_BUFFER];
          X.setTransform(1, 0, 0, 1, 0, 0), X.clearRect(0, 0, s.canvasWidth * s.textureMult, s.canvasHeight * s.textureMult), s.render({
            forcedContext: X,
            drawOnlyNodeLayer: !0,
            forcedPxRatio: o * s.textureMult
          });
          var w = s.textureCache.viewport = {
            zoom: u.zoom(),
            pan: u.pan(),
            width: s.canvasWidth,
            height: s.canvasHeight
          };
          w.mpan = {
            x: (0 - w.pan.x) / w.zoom,
            y: (0 - w.pan.y) / w.zoom
          };
        }
        f[s.DRAG] = !1, f[s.NODE] = !1;
        var B = l.contexts[s.NODE], re = s.textureCache.texture, w = s.textureCache.viewport;
        B.setTransform(1, 0, 0, 1, 0, 0), v ? G(B, 0, 0, w.width, w.height) : B.clearRect(0, 0, w.width, w.height);
        var K = m.core("outside-texture-bg-color").value, W = m.core("outside-texture-bg-opacity").value;
        s.colorFillStyle(B, K[0], K[1], K[2], W), B.fillRect(0, 0, w.width, w.height);
        var b = u.zoom();
        N(B, !1), B.clearRect(w.mpan.x, w.mpan.y, w.width / w.zoom / o, w.height / w.zoom / o), B.drawImage(re, w.mpan.x, w.mpan.y, w.width / w.zoom / o, w.height / w.zoom / o);
      } else
        s.textureOnViewport && !e && (s.textureCache = null);
      var ae = u.extent(), ue = s.pinching || s.hoverData.dragging || s.swipePanning || s.data.wheelZooming || s.hoverData.draggingEles || s.cy.animated(), me = s.hideEdgesOnViewport && ue, ie = [];
      if (ie[s.NODE] = !f[s.NODE] && v && !s.clearedForMotionBlur[s.NODE] || s.clearingMotionBlur, ie[s.NODE] && (s.clearedForMotionBlur[s.NODE] = !0), ie[s.DRAG] = !f[s.DRAG] && v && !s.clearedForMotionBlur[s.DRAG] || s.clearingMotionBlur, ie[s.DRAG] && (s.clearedForMotionBlur[s.DRAG] = !0), f[s.NODE] || r || a || ie[s.NODE]) {
        var ge = v && !ie[s.NODE] && d !== 1, B = e || (ge ? s.data.bufferContexts[s.MOTIONBLUR_BUFFER_NODE] : l.contexts[s.NODE]), Ee = v && !ge ? "motionBlur" : void 0;
        N(B, Ee), me ? s.drawCachedNodes(B, F.nondrag, o, ae) : s.drawLayeredElements(B, F.nondrag, o, ae), s.debug && s.drawDebugPoints(B, F.nondrag), !r && !v && (f[s.NODE] = !1);
      }
      if (!a && (f[s.DRAG] || r || ie[s.DRAG])) {
        var ge = v && !ie[s.DRAG] && d !== 1, B = e || (ge ? s.data.bufferContexts[s.MOTIONBLUR_BUFFER_DRAG] : l.contexts[s.DRAG]);
        N(B, v && !ge ? "motionBlur" : void 0), me ? s.drawCachedNodes(B, F.drag, o, ae) : s.drawCachedElements(B, F.drag, o, ae), s.debug && s.drawDebugPoints(B, F.drag), !r && !v && (f[s.DRAG] = !1);
      }
      if (s.showFps || !a && f[s.SELECT_BOX] && !r) {
        var B = e || l.contexts[s.SELECT_BOX];
        if (N(B), s.selection[4] == 1 && (s.hoverData.selecting || s.touchData.selecting)) {
          var b = s.cy.zoom(), Ce = m.core("selection-box-border-width").value / b;
          B.lineWidth = Ce, B.fillStyle = "rgba(" + m.core("selection-box-color").value[0] + "," + m.core("selection-box-color").value[1] + "," + m.core("selection-box-color").value[2] + "," + m.core("selection-box-opacity").value + ")", B.fillRect(s.selection[0], s.selection[1], s.selection[2] - s.selection[0], s.selection[3] - s.selection[1]), Ce > 0 && (B.strokeStyle = "rgba(" + m.core("selection-box-border-color").value[0] + "," + m.core("selection-box-border-color").value[1] + "," + m.core("selection-box-border-color").value[2] + "," + m.core("selection-box-opacity").value + ")", B.strokeRect(s.selection[0], s.selection[1], s.selection[2] - s.selection[0], s.selection[3] - s.selection[1]));
        }
        if (l.bgActivePosistion && !s.hoverData.selecting) {
          var b = s.cy.zoom(), we = l.bgActivePosistion;
          B.fillStyle = "rgba(" + m.core("active-bg-color").value[0] + "," + m.core("active-bg-color").value[1] + "," + m.core("active-bg-color").value[2] + "," + m.core("active-bg-opacity").value + ")", B.beginPath(), B.arc(we.x, we.y, m.core("active-bg-size").pfValue / b, 0, 2 * Math.PI), B.fill();
        }
        var De = s.lastRedrawTime;
        if (s.showFps && De) {
          De = Math.round(De);
          var se = Math.round(1e3 / De);
          B.setTransform(1, 0, 0, 1, 0, 0), B.fillStyle = "rgba(255, 0, 0, 0.75)", B.strokeStyle = "rgba(255, 0, 0, 0.75)", B.lineWidth = 1, B.fillText("1 frame = " + De + " ms = " + se + " fps", 0, 20);
          var xe = 60;
          B.strokeRect(0, 30, 250, 20), B.fillRect(0, 30, 250 * Math.min(se / xe, 1), 20);
        }
        r || (f[s.SELECT_BOX] = !1);
      }
      if (v && d !== 1) {
        var Le = l.contexts[s.NODE], Se = s.data.bufferCanvases[s.MOTIONBLUR_BUFFER_NODE], Oe = l.contexts[s.DRAG], Fe = s.data.bufferCanvases[s.MOTIONBLUR_BUFFER_DRAG], Xe = function(Me, Ue, ze) {
          Me.setTransform(1, 0, 0, 1, 0, 0), ze || !g ? Me.clearRect(0, 0, s.canvasWidth, s.canvasHeight) : G(Me, 0, 0, s.canvasWidth, s.canvasHeight);
          var Be = d;
          Me.drawImage(
            Ue,
            // img
            0,
            0,
            // sx, sy
            s.canvasWidth * Be,
            s.canvasHeight * Be,
            // sw, sh
            0,
            0,
            // x, y
            s.canvasWidth,
            s.canvasHeight
            // w, h
          );
        };
        (f[s.NODE] || ie[s.NODE]) && (Xe(Le, Se, ie[s.NODE]), f[s.NODE] = !1), (f[s.DRAG] || ie[s.DRAG]) && (Xe(Oe, Fe, ie[s.DRAG]), f[s.DRAG] = !1);
      }
      s.prevViewport = w, s.clearingMotionBlur && (s.clearingMotionBlur = !1, s.motionBlurCleared = !0, s.motionBlur = !0), v && (s.motionBlurTimeout = setTimeout(function() {
        s.motionBlurTimeout = null, s.clearedForMotionBlur[s.NODE] = !1, s.clearedForMotionBlur[s.DRAG] = !1, s.motionBlur = !1, s.clearingMotionBlur = !h, s.mbFrames = 0, f[s.NODE] = !0, f[s.DRAG] = !0, s.redraw();
      }, Jg)), e || u.emit("render");
    };
    var Mr = {};
    Mr.drawPolygonPath = function(t, e, r, a, n, i) {
      var s = a / 2, o = n / 2;
      t.beginPath && t.beginPath(), t.moveTo(e + s * i[0], r + o * i[1]);
      for (var u = 1; u < i.length / 2; u++)
        t.lineTo(e + s * i[u * 2], r + o * i[u * 2 + 1]);
      t.closePath();
    }, Mr.drawRoundPolygonPath = function(t, e, r, a, n, i) {
      var s = a / 2, o = n / 2, u = ci(a, n);
      t.beginPath && t.beginPath();
      for (var l = 0; l < i.length / 4; l++) {
        var f = void 0, h = void 0;
        l === 0 ? f = i.length - 2 : f = l * 4 - 2, h = l * 4 + 2;
        var v = e + s * i[l * 4], d = r + o * i[l * 4 + 1], c = -i[f] * i[h] - i[f + 1] * i[h + 1], y = u / Math.tan(Math.acos(c) / 2), p = v - y * i[f], g = d - y * i[f + 1], m = v + y * i[h], b = d + y * i[h + 1];
        l === 0 ? t.moveTo(p, g) : t.lineTo(p, g), t.arcTo(v, d, m, b, u);
      }
      t.closePath();
    }, Mr.drawRoundRectanglePath = function(t, e, r, a, n) {
      var i = a / 2, s = n / 2, o = Fa(a, n);
      t.beginPath && t.beginPath(), t.moveTo(e, r - s), t.arcTo(e + i, r - s, e + i, r, o), t.arcTo(e + i, r + s, e, r + s, o), t.arcTo(e - i, r + s, e - i, r, o), t.arcTo(e - i, r - s, e, r - s, o), t.lineTo(e, r - s), t.closePath();
    }, Mr.drawBottomRoundRectanglePath = function(t, e, r, a, n) {
      var i = a / 2, s = n / 2, o = Fa(a, n);
      t.beginPath && t.beginPath(), t.moveTo(e, r - s), t.lineTo(e + i, r - s), t.lineTo(e + i, r), t.arcTo(e + i, r + s, e, r + s, o), t.arcTo(e - i, r + s, e - i, r, o), t.lineTo(e - i, r - s), t.lineTo(e, r - s), t.closePath();
    }, Mr.drawCutRectanglePath = function(t, e, r, a, n) {
      var i = a / 2, s = n / 2, o = Ss();
      t.beginPath && t.beginPath(), t.moveTo(e - i + o, r - s), t.lineTo(e + i - o, r - s), t.lineTo(e + i, r - s + o), t.lineTo(e + i, r + s - o), t.lineTo(e + i - o, r + s), t.lineTo(e - i + o, r + s), t.lineTo(e - i, r + s - o), t.lineTo(e - i, r - s + o), t.closePath();
    }, Mr.drawBarrelPath = function(t, e, r, a, n) {
      var i = a / 2, s = n / 2, o = e - i, u = e + i, l = r - s, f = r + s, h = di(a, n), v = h.widthOffset, d = h.heightOffset, c = h.ctrlPtOffsetPct * v;
      t.beginPath && t.beginPath(), t.moveTo(o, l + d), t.lineTo(o, f - d), t.quadraticCurveTo(o + c, f, o + v, f), t.lineTo(u - v, f), t.quadraticCurveTo(u - c, f, u, f - d), t.lineTo(u, l + d), t.quadraticCurveTo(u - c, l, u - v, l), t.lineTo(o + v, l), t.quadraticCurveTo(o + c, l, o, l + d), t.closePath();
    };
    for (var Cl = Math.sin(0), Dl = Math.cos(0), Yi = {}, Hi = {}, Sl = Math.PI / 40, wa = 0 * Math.PI; wa < 2 * Math.PI; wa += Sl)
      Yi[wa] = Math.sin(wa), Hi[wa] = Math.cos(wa);
    Mr.drawEllipsePath = function(t, e, r, a, n) {
      if (t.beginPath && t.beginPath(), t.ellipse)
        t.ellipse(e, r, a / 2, n / 2, 0, 0, 2 * Math.PI);
      else
        for (var i, s, o = a / 2, u = n / 2, l = 0 * Math.PI; l < 2 * Math.PI; l += Sl)
          i = e - o * Yi[l] * Cl + o * Hi[l] * Dl, s = r + u * Hi[l] * Cl + u * Yi[l] * Dl, l === 0 ? t.moveTo(i, s) : t.lineTo(i, s);
      t.closePath();
    };
    var tn = {};
    tn.createBuffer = function(t, e) {
      var r = document.createElement("canvas");
      return r.width = t, r.height = e, [r, r.getContext("2d")];
    }, tn.bufferCanvasImage = function(t) {
      var e = this.cy, r = e.mutableElements(), a = r.boundingBox(), n = this.findContainerClientCoords(), i = t.full ? Math.ceil(a.w) : n[2], s = t.full ? Math.ceil(a.h) : n[3], o = R(t.maxWidth) || R(t.maxHeight), u = this.getPixelRatio(), l = 1;
      if (t.scale !== void 0)
        i *= t.scale, s *= t.scale, l = t.scale;
      else if (o) {
        var f = 1 / 0, h = 1 / 0;
        R(t.maxWidth) && (f = l * t.maxWidth / i), R(t.maxHeight) && (h = l * t.maxHeight / s), l = Math.min(f, h), i *= l, s *= l;
      }
      o || (i *= u, s *= u, l *= u);
      var v = document.createElement("canvas");
      v.width = i, v.height = s, v.style.width = i + "px", v.style.height = s + "px";
      var d = v.getContext("2d");
      if (i > 0 && s > 0) {
        d.clearRect(0, 0, i, s), d.globalCompositeOperation = "source-over";
        var c = this.getCachedZSortedEles();
        if (t.full)
          d.translate(-a.x1 * l, -a.y1 * l), d.scale(l, l), this.drawElements(d, c), d.scale(1 / l, 1 / l), d.translate(a.x1 * l, a.y1 * l);
        else {
          var y = e.pan(), p = {
            x: y.x * l,
            y: y.y * l
          };
          l *= e.zoom(), d.translate(p.x, p.y), d.scale(l, l), this.drawElements(d, c), d.scale(1 / l, 1 / l), d.translate(-p.x, -p.y);
        }
        t.bg && (d.globalCompositeOperation = "destination-over", d.fillStyle = t.bg, d.rect(0, 0, i, s), d.fill());
      }
      return v;
    };
    function jg(t, e) {
      for (var r = atob(t), a = new ArrayBuffer(r.length), n = new Uint8Array(a), i = 0; i < r.length; i++)
        n[i] = r.charCodeAt(i);
      return new Blob([a], {
        type: e
      });
    }
    function Ll(t) {
      var e = t.indexOf(",");
      return t.substr(e + 1);
    }
    function Al(t, e, r) {
      var a = function() {
        return e.toDataURL(r, t.quality);
      };
      switch (t.output) {
        case "blob-promise":
          return new ia(function(n, i) {
            try {
              e.toBlob(function(s) {
                s != null ? n(s) : i(new Error("`canvas.toBlob()` sent a null value in its callback"));
              }, r, t.quality);
            } catch (s) {
              i(s);
            }
          });
        case "blob":
          return jg(Ll(a()), r);
        case "base64":
          return Ll(a());
        case "base64uri":
        default:
          return a();
      }
    }
    tn.png = function(t) {
      return Al(t, this.bufferCanvasImage(t), "image/png");
    }, tn.jpg = function(t) {
      return Al(t, this.bufferCanvasImage(t), "image/jpeg");
    };
    var Ol = {};
    Ol.nodeShapeImpl = function(t, e, r, a, n, i, s) {
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
    var ep = Nl, ut = Nl.prototype;
    ut.CANVAS_LAYERS = 3, ut.SELECT_BOX = 0, ut.DRAG = 1, ut.NODE = 2, ut.BUFFER_COUNT = 3, ut.TEXTURE_BUFFER = 0, ut.MOTIONBLUR_BUFFER_NODE = 1, ut.MOTIONBLUR_BUFFER_DRAG = 2;
    function Nl(t) {
      var e = this;
      e.data = {
        canvases: new Array(ut.CANVAS_LAYERS),
        contexts: new Array(ut.CANVAS_LAYERS),
        canvasNeedsRedraw: new Array(ut.CANVAS_LAYERS),
        bufferCanvases: new Array(ut.BUFFER_COUNT),
        bufferContexts: new Array(ut.CANVAS_LAYERS)
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
      ht() && (s["-ms-touch-action"] = "none", s["touch-action"] = "none");
      for (var o = 0; o < ut.CANVAS_LAYERS; o++) {
        var u = e.data.canvases[o] = document.createElement("canvas");
        e.data.contexts[o] = u.getContext("2d"), Object.keys(s).forEach(function(De) {
          u.style[De] = s[De];
        }), u.style.position = "absolute", u.setAttribute("data-id", "layer" + o), u.style.zIndex = String(ut.CANVAS_LAYERS - o), e.data.canvasContainer.appendChild(u), e.data.canvasNeedsRedraw[o] = !1;
      }
      e.data.topCanvas = e.data.canvases[0], e.data.canvases[ut.NODE].setAttribute("data-id", "layer" + ut.NODE + "-node"), e.data.canvases[ut.SELECT_BOX].setAttribute("data-id", "layer" + ut.SELECT_BOX + "-selectbox"), e.data.canvases[ut.DRAG].setAttribute("data-id", "layer" + ut.DRAG + "-drag");
      for (var o = 0; o < ut.BUFFER_COUNT; o++)
        e.data.bufferCanvases[o] = document.createElement("canvas"), e.data.bufferContexts[o] = e.data.bufferCanvases[o].getContext("2d"), e.data.bufferCanvases[o].style.position = "absolute", e.data.bufferCanvases[o].setAttribute("data-id", "buffer" + o), e.data.bufferCanvases[o].style.zIndex = String(-o - 1), e.data.bufferCanvases[o].style.visibility = "hidden";
      e.pathsEnabled = !0;
      var l = Yt(), f = function(se) {
        return {
          x: (se.x1 + se.x2) / 2,
          y: (se.y1 + se.y2) / 2
        };
      }, h = function(se) {
        return {
          x: -se.w / 2,
          y: -se.h / 2
        };
      }, v = function(se) {
        var xe = se[0]._private, Le = xe.oldBackgroundTimestamp === xe.backgroundTimestamp;
        return !Le;
      }, d = function(se) {
        return se[0]._private.nodeKey;
      }, c = function(se) {
        return se[0]._private.labelStyleKey;
      }, y = function(se) {
        return se[0]._private.sourceLabelStyleKey;
      }, p = function(se) {
        return se[0]._private.targetLabelStyleKey;
      }, g = function(se, xe, Le, Se, Oe) {
        return e.drawElement(se, xe, Le, !1, !1, Oe);
      }, m = function(se, xe, Le, Se, Oe) {
        return e.drawElementText(se, xe, Le, Se, "main", Oe);
      }, b = function(se, xe, Le, Se, Oe) {
        return e.drawElementText(se, xe, Le, Se, "source", Oe);
      }, E = function(se, xe, Le, Se, Oe) {
        return e.drawElementText(se, xe, Le, Se, "target", Oe);
      }, M = function(se) {
        return se.boundingBox(), se[0]._private.bodyBounds;
      }, L = function(se) {
        return se.boundingBox(), se[0]._private.labelBounds.main || l;
      }, w = function(se) {
        return se.boundingBox(), se[0]._private.labelBounds.source || l;
      }, k = function(se) {
        return se.boundingBox(), se[0]._private.labelBounds.target || l;
      }, D = function(se, xe) {
        return xe;
      }, F = function(se) {
        return f(M(se));
      }, G = function(se, xe, Le) {
        var Se = se ? se + "-" : "";
        return {
          x: xe.x + Le.pstyle(Se + "text-margin-x").pfValue,
          y: xe.y + Le.pstyle(Se + "text-margin-y").pfValue
        };
      }, N = function(se, xe, Le) {
        var Se = se[0]._private.rscratch;
        return {
          x: Se[xe],
          y: Se[Le]
        };
      }, X = function(se) {
        return G("", N(se, "labelX", "labelY"), se);
      }, B = function(se) {
        return G("source", N(se, "sourceLabelX", "sourceLabelY"), se);
      }, re = function(se) {
        return G("target", N(se, "targetLabelX", "targetLabelY"), se);
      }, K = function(se) {
        return h(M(se));
      }, W = function(se) {
        return h(w(se));
      }, ae = function(se) {
        return h(k(se));
      }, ue = function(se) {
        var xe = L(se), Le = h(L(se));
        if (se.isNode()) {
          switch (se.pstyle("text-halign").value) {
            case "left":
              Le.x = -xe.w;
              break;
            case "right":
              Le.x = 0;
              break;
          }
          switch (se.pstyle("text-valign").value) {
            case "top":
              Le.y = -xe.h;
              break;
            case "bottom":
              Le.y = 0;
              break;
          }
        }
        return Le;
      }, me = e.data.eleTxrCache = new ja(e, {
        getKey: d,
        doesEleInvalidateKey: v,
        drawElement: g,
        getBoundingBox: M,
        getRotationPoint: F,
        getRotationOffset: K,
        allowEdgeTxrCaching: !1,
        allowParentTxrCaching: !1
      }), ie = e.data.lblTxrCache = new ja(e, {
        getKey: c,
        drawElement: m,
        getBoundingBox: L,
        getRotationPoint: X,
        getRotationOffset: ue,
        isVisible: D
      }), ge = e.data.slbTxrCache = new ja(e, {
        getKey: y,
        drawElement: b,
        getBoundingBox: w,
        getRotationPoint: B,
        getRotationOffset: W,
        isVisible: D
      }), Ee = e.data.tlbTxrCache = new ja(e, {
        getKey: p,
        drawElement: E,
        getBoundingBox: k,
        getRotationPoint: re,
        getRotationOffset: ae,
        isVisible: D
      }), Ce = e.data.lyrTxrCache = new yl(e);
      e.onUpdateEleCalcs(function(se, xe) {
        me.invalidateElements(xe), ie.invalidateElements(xe), ge.invalidateElements(xe), Ee.invalidateElements(xe), Ce.invalidateElements(xe);
        for (var Le = 0; Le < xe.length; Le++) {
          var Se = xe[Le]._private;
          Se.oldBackgroundTimestamp = Se.backgroundTimestamp;
        }
      });
      var we = function(se) {
        for (var xe = 0; xe < se.length; xe++)
          Ce.enqueueElementRefinement(se[xe].ele);
      };
      me.onDequeue(we), ie.onDequeue(we), ge.onDequeue(we), Ee.onDequeue(we);
    }
    ut.redrawHint = function(t, e) {
      var r = this;
      switch (t) {
        case "eles":
          r.data.canvasNeedsRedraw[ut.NODE] = e;
          break;
        case "drag":
          r.data.canvasNeedsRedraw[ut.DRAG] = e;
          break;
        case "select":
          r.data.canvasNeedsRedraw[ut.SELECT_BOX] = e;
          break;
      }
    };
    var tp = typeof Path2D < "u";
    ut.path2dEnabled = function(t) {
      if (t === void 0)
        return this.pathsEnabled;
      this.pathsEnabled = !!t;
    }, ut.usePaths = function() {
      return tp && this.pathsEnabled;
    }, ut.setImgSmoothing = function(t, e) {
      t.imageSmoothingEnabled != null ? t.imageSmoothingEnabled = e : (t.webkitImageSmoothingEnabled = e, t.mozImageSmoothingEnabled = e, t.msImageSmoothingEnabled = e);
    }, ut.getImgSmoothing = function(t) {
      return t.imageSmoothingEnabled != null ? t.imageSmoothingEnabled : t.webkitImageSmoothingEnabled || t.mozImageSmoothingEnabled || t.msImageSmoothingEnabled;
    }, ut.makeOffscreenCanvas = function(t, e) {
      var r;
      return (typeof OffscreenCanvas > "u" ? "undefined" : _(OffscreenCanvas)) !== "undefined" ? r = new OffscreenCanvas(t, e) : (r = document.createElement("canvas"), r.width = t, r.height = e), r;
    }, [bl, vr, br, $i, _r, Ea, Kt, Mr, tn, Ol].forEach(function(t) {
      He(ut, t);
    });
    var rp = [{
      name: "null",
      impl: tl
    }, {
      name: "base",
      impl: cl
    }, {
      name: "canvas",
      impl: ep
    }], ap = [{
      type: "layout",
      extensions: hg
    }, {
      type: "renderer",
      extensions: rp
    }], Il = {}, Ml = {};
    function Rl(t, e, r) {
      var a = r, n = function(k) {
        vt("Can not register `" + e + "` for `" + t + "` since `" + k + "` already exists in the prototype and can not be overridden");
      };
      if (t === "core") {
        if (Za.prototype[e])
          return n(e);
        Za.prototype[e] = r;
      } else if (t === "collection") {
        if (Nt.prototype[e])
          return n(e);
        Nt.prototype[e] = r;
      } else if (t === "layout") {
        for (var i = function(k) {
          this.options = k, r.call(this, k), S(this._private) || (this._private = {}), this._private.cy = k.cy, this._private.listeners = [], this.createEmitter();
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
          var w = this.options;
          if (w && w.animate) {
            var k = this.animations;
            if (k)
              for (var D = 0; D < k.length; D++)
                k[D].stop();
          }
          return f ? f.call(this) : this.emit("layoutstop"), this;
        }, s.destroy || (s.destroy = function() {
          return this;
        }), s.cy = function() {
          return this._private.cy;
        };
        var h = function(k) {
          return k._private.cy;
        }, v = {
          addEventFields: function(k, D) {
            D.layout = k, D.cy = h(k), D.target = k;
          },
          bubble: function() {
            return !0;
          },
          parent: function(k) {
            return h(k);
          }
        };
        He(s, {
          createEmitter: function() {
            return this._private.emitter = new In(v, this), this;
          },
          emitter: function() {
            return this._private.emitter;
          },
          on: function(k, D) {
            return this.emitter().on(k, D), this;
          },
          one: function(k, D) {
            return this.emitter().one(k, D), this;
          },
          once: function(k, D) {
            return this.emitter().one(k, D), this;
          },
          removeListener: function(k, D) {
            return this.emitter().removeListener(k, D), this;
          },
          removeAllListeners: function() {
            return this.emitter().removeAllListeners(), this;
          },
          emit: function(k, D) {
            return this.emitter().emit(k, D), this;
          }
        }), ct.eventAliasesOn(s), a = i;
      } else if (t === "renderer" && e !== "null" && e !== "base") {
        var d = kl("renderer", "base"), c = d.prototype, y = r, p = r.prototype, g = function() {
          d.apply(this, arguments), y.apply(this, arguments);
        }, m = g.prototype;
        for (var b in c) {
          var E = c[b], M = p[b] != null;
          if (M)
            return n(b);
          m[b] = E;
        }
        for (var L in p)
          m[L] = p[L];
        c.clientFunctions.forEach(function(w) {
          m[w] = m[w] || function() {
            xt("Renderer does not implement `renderer." + w + "()` on its prototype");
          };
        }), a = g;
      } else if (t === "__proto__" || t === "constructor" || t === "prototype")
        return xt(t + " is an illegal type to be registered, possibly lead to prototype pollutions");
      return ts({
        map: Il,
        keys: [t, e],
        value: a
      });
    }
    function kl(t, e) {
      return rs({
        map: Il,
        keys: [t, e]
      });
    }
    function np(t, e, r, a, n) {
      return ts({
        map: Ml,
        keys: [t, e, r, a],
        value: n
      });
    }
    function ip(t, e, r, a) {
      return rs({
        map: Ml,
        keys: [t, e, r, a]
      });
    }
    var Xi = function() {
      if (arguments.length === 2)
        return kl.apply(null, arguments);
      if (arguments.length === 3)
        return Rl.apply(null, arguments);
      if (arguments.length === 4)
        return ip.apply(null, arguments);
      if (arguments.length === 5)
        return np.apply(null, arguments);
      xt("Invalid extension access syntax");
    };
    Za.prototype.extension = Xi, ap.forEach(function(t) {
      t.extensions.forEach(function(e) {
        Rl(t.type, e.name, e.impl);
      });
    });
    var Pl = function t() {
      if (!(this instanceof t))
        return new t();
      this.length = 0;
    }, Yr = Pl.prototype;
    Yr.instanceString = function() {
      return "stylesheet";
    }, Yr.selector = function(t) {
      var e = this.length++;
      return this[e] = {
        selector: t,
        properties: []
      }, this;
    }, Yr.css = function(t, e) {
      var r = this.length - 1;
      if (ee(t))
        this[r].properties.push({
          name: t,
          value: e
        });
      else if (S(t))
        for (var a = t, n = Object.keys(a), i = 0; i < n.length; i++) {
          var s = n[i], o = a[s];
          if (o != null) {
            var u = Gt.properties[s] || Gt.properties[yt(s)];
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
    }, Yr.style = Yr.css, Yr.generateStyle = function(t) {
      var e = new Gt(t);
      return this.appendToStyle(e);
    }, Yr.appendToStyle = function(t) {
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
    var sp = "3.28.1", Hr = function(e) {
      if (e === void 0 && (e = {}), S(e))
        return new Za(e);
      if (ee(e))
        return Xi.apply(Xi, arguments);
    };
    return Hr.use = function(t) {
      var e = Array.prototype.slice.call(arguments, 1);
      return e.unshift(Hr), t.apply(null, e), this;
    }, Hr.warnings = function(t) {
      return gs(t);
    }, Hr.version = sp, Hr.stylesheet = Hr.Stylesheet = Pl, Hr;
  });
})(Yl);
var Fp = Yl.exports;
const Hl = /* @__PURE__ */ $l(Fp);
var Xl = { exports: {} }, Ki = { exports: {} }, Zi = { exports: {} }, Vl;
function Gp() {
  return Vl || (Vl = 1, function(de, Pe) {
    (function(fe, Q) {
      de.exports = Q();
    })(Ca, function() {
      return (
        /******/
        function(_) {
          var fe = {};
          function Q(C) {
            if (fe[C])
              return fe[C].exports;
            var T = fe[C] = {
              /******/
              i: C,
              /******/
              l: !1,
              /******/
              exports: {}
              /******/
            };
            return _[C].call(T.exports, T, T.exports, Q), T.l = !0, T.exports;
          }
          return Q.m = _, Q.c = fe, Q.i = function(C) {
            return C;
          }, Q.d = function(C, T, x) {
            Q.o(C, T) || Object.defineProperty(C, T, {
              /******/
              configurable: !1,
              /******/
              enumerable: !0,
              /******/
              get: x
              /******/
            });
          }, Q.n = function(C) {
            var T = C && C.__esModule ? (
              /******/
              function() {
                return C.default;
              }
            ) : (
              /******/
              function() {
                return C;
              }
            );
            return Q.d(T, "a", T), T;
          }, Q.o = function(C, T) {
            return Object.prototype.hasOwnProperty.call(C, T);
          }, Q.p = "", Q(Q.s = 26);
        }([
          /* 0 */
          /***/
          function(_, fe, Q) {
            function C() {
            }
            C.QUALITY = 1, C.DEFAULT_CREATE_BENDS_AS_NEEDED = !1, C.DEFAULT_INCREMENTAL = !1, C.DEFAULT_ANIMATION_ON_LAYOUT = !0, C.DEFAULT_ANIMATION_DURING_LAYOUT = !1, C.DEFAULT_ANIMATION_PERIOD = 50, C.DEFAULT_UNIFORM_LEAF_NODE_SIZES = !1, C.DEFAULT_GRAPH_MARGIN = 15, C.NODE_DIMENSIONS_INCLUDE_LABELS = !1, C.SIMPLE_NODE_SIZE = 40, C.SIMPLE_NODE_HALF_SIZE = C.SIMPLE_NODE_SIZE / 2, C.EMPTY_COMPOUND_NODE_SIZE = 40, C.MIN_EDGE_LENGTH = 1, C.WORLD_BOUNDARY = 1e6, C.INITIAL_WORLD_BOUNDARY = C.WORLD_BOUNDARY / 1e3, C.WORLD_CENTER_X = 1200, C.WORLD_CENTER_Y = 900, _.exports = C;
          },
          /* 1 */
          /***/
          function(_, fe, Q) {
            var C = Q(2), T = Q(8), x = Q(9);
            function I(Y, P, Z) {
              C.call(this, Z), this.isOverlapingSourceAndTarget = !1, this.vGraphObject = Z, this.bendpoints = [], this.source = Y, this.target = P;
            }
            I.prototype = Object.create(C.prototype);
            for (var z in C)
              I[z] = C[z];
            I.prototype.getSource = function() {
              return this.source;
            }, I.prototype.getTarget = function() {
              return this.target;
            }, I.prototype.isInterGraph = function() {
              return this.isInterGraph;
            }, I.prototype.getLength = function() {
              return this.length;
            }, I.prototype.isOverlapingSourceAndTarget = function() {
              return this.isOverlapingSourceAndTarget;
            }, I.prototype.getBendpoints = function() {
              return this.bendpoints;
            }, I.prototype.getLca = function() {
              return this.lca;
            }, I.prototype.getSourceInLca = function() {
              return this.sourceInLca;
            }, I.prototype.getTargetInLca = function() {
              return this.targetInLca;
            }, I.prototype.getOtherEnd = function(Y) {
              if (this.source === Y)
                return this.target;
              if (this.target === Y)
                return this.source;
              throw "Node is not incident with this edge";
            }, I.prototype.getOtherEndInGraph = function(Y, P) {
              for (var Z = this.getOtherEnd(Y), A = P.getGraphManager().getRoot(); ; ) {
                if (Z.getOwner() == P)
                  return Z;
                if (Z.getOwner() == A)
                  break;
                Z = Z.getOwner().getParent();
              }
              return null;
            }, I.prototype.updateLength = function() {
              var Y = new Array(4);
              this.isOverlapingSourceAndTarget = T.getIntersection(this.target.getRect(), this.source.getRect(), Y), this.isOverlapingSourceAndTarget || (this.lengthX = Y[0] - Y[2], this.lengthY = Y[1] - Y[3], Math.abs(this.lengthX) < 1 && (this.lengthX = x.sign(this.lengthX)), Math.abs(this.lengthY) < 1 && (this.lengthY = x.sign(this.lengthY)), this.length = Math.sqrt(this.lengthX * this.lengthX + this.lengthY * this.lengthY));
            }, I.prototype.updateLengthSimple = function() {
              this.lengthX = this.target.getCenterX() - this.source.getCenterX(), this.lengthY = this.target.getCenterY() - this.source.getCenterY(), Math.abs(this.lengthX) < 1 && (this.lengthX = x.sign(this.lengthX)), Math.abs(this.lengthY) < 1 && (this.lengthY = x.sign(this.lengthY)), this.length = Math.sqrt(this.lengthX * this.lengthX + this.lengthY * this.lengthY);
            }, _.exports = I;
          },
          /* 2 */
          /***/
          function(_, fe, Q) {
            function C(T) {
              this.vGraphObject = T;
            }
            _.exports = C;
          },
          /* 3 */
          /***/
          function(_, fe, Q) {
            var C = Q(2), T = Q(10), x = Q(13), I = Q(0), z = Q(16), Y = Q(4);
            function P(A, $, U, J) {
              U == null && J == null && (J = $), C.call(this, J), A.graphManager != null && (A = A.graphManager), this.estimatedSize = T.MIN_VALUE, this.inclusionTreeDepth = T.MAX_VALUE, this.vGraphObject = J, this.edges = [], this.graphManager = A, U != null && $ != null ? this.rect = new x($.x, $.y, U.width, U.height) : this.rect = new x();
            }
            P.prototype = Object.create(C.prototype);
            for (var Z in C)
              P[Z] = C[Z];
            P.prototype.getEdges = function() {
              return this.edges;
            }, P.prototype.getChild = function() {
              return this.child;
            }, P.prototype.getOwner = function() {
              return this.owner;
            }, P.prototype.getWidth = function() {
              return this.rect.width;
            }, P.prototype.setWidth = function(A) {
              this.rect.width = A;
            }, P.prototype.getHeight = function() {
              return this.rect.height;
            }, P.prototype.setHeight = function(A) {
              this.rect.height = A;
            }, P.prototype.getCenterX = function() {
              return this.rect.x + this.rect.width / 2;
            }, P.prototype.getCenterY = function() {
              return this.rect.y + this.rect.height / 2;
            }, P.prototype.getCenter = function() {
              return new Y(this.rect.x + this.rect.width / 2, this.rect.y + this.rect.height / 2);
            }, P.prototype.getLocation = function() {
              return new Y(this.rect.x, this.rect.y);
            }, P.prototype.getRect = function() {
              return this.rect;
            }, P.prototype.getDiagonal = function() {
              return Math.sqrt(this.rect.width * this.rect.width + this.rect.height * this.rect.height);
            }, P.prototype.getHalfTheDiagonal = function() {
              return Math.sqrt(this.rect.height * this.rect.height + this.rect.width * this.rect.width) / 2;
            }, P.prototype.setRect = function(A, $) {
              this.rect.x = A.x, this.rect.y = A.y, this.rect.width = $.width, this.rect.height = $.height;
            }, P.prototype.setCenter = function(A, $) {
              this.rect.x = A - this.rect.width / 2, this.rect.y = $ - this.rect.height / 2;
            }, P.prototype.setLocation = function(A, $) {
              this.rect.x = A, this.rect.y = $;
            }, P.prototype.moveBy = function(A, $) {
              this.rect.x += A, this.rect.y += $;
            }, P.prototype.getEdgeListToNode = function(A) {
              var $ = [], U = this;
              return U.edges.forEach(function(J) {
                if (J.target == A) {
                  if (J.source != U)
                    throw "Incorrect edge source!";
                  $.push(J);
                }
              }), $;
            }, P.prototype.getEdgesBetween = function(A) {
              var $ = [], U = this;
              return U.edges.forEach(function(J) {
                if (!(J.source == U || J.target == U))
                  throw "Incorrect edge source and/or target";
                (J.target == A || J.source == A) && $.push(J);
              }), $;
            }, P.prototype.getNeighborsList = function() {
              var A = /* @__PURE__ */ new Set(), $ = this;
              return $.edges.forEach(function(U) {
                if (U.source == $)
                  A.add(U.target);
                else {
                  if (U.target != $)
                    throw "Incorrect incidency!";
                  A.add(U.source);
                }
              }), A;
            }, P.prototype.withChildren = function() {
              var A = /* @__PURE__ */ new Set(), $, U;
              if (A.add(this), this.child != null)
                for (var J = this.child.getNodes(), ne = 0; ne < J.length; ne++)
                  $ = J[ne], U = $.withChildren(), U.forEach(function(le) {
                    A.add(le);
                  });
              return A;
            }, P.prototype.getNoOfChildren = function() {
              var A = 0, $;
              if (this.child == null)
                A = 1;
              else
                for (var U = this.child.getNodes(), J = 0; J < U.length; J++)
                  $ = U[J], A += $.getNoOfChildren();
              return A == 0 && (A = 1), A;
            }, P.prototype.getEstimatedSize = function() {
              if (this.estimatedSize == T.MIN_VALUE)
                throw "assert failed";
              return this.estimatedSize;
            }, P.prototype.calcEstimatedSize = function() {
              return this.child == null ? this.estimatedSize = (this.rect.width + this.rect.height) / 2 : (this.estimatedSize = this.child.calcEstimatedSize(), this.rect.width = this.estimatedSize, this.rect.height = this.estimatedSize, this.estimatedSize);
            }, P.prototype.scatter = function() {
              var A, $, U = -I.INITIAL_WORLD_BOUNDARY, J = I.INITIAL_WORLD_BOUNDARY;
              A = I.WORLD_CENTER_X + z.nextDouble() * (J - U) + U;
              var ne = -I.INITIAL_WORLD_BOUNDARY, le = I.INITIAL_WORLD_BOUNDARY;
              $ = I.WORLD_CENTER_Y + z.nextDouble() * (le - ne) + ne, this.rect.x = A, this.rect.y = $;
            }, P.prototype.updateBounds = function() {
              if (this.getChild() == null)
                throw "assert failed";
              if (this.getChild().getNodes().length != 0) {
                var A = this.getChild();
                if (A.updateBounds(!0), this.rect.x = A.getLeft(), this.rect.y = A.getTop(), this.setWidth(A.getRight() - A.getLeft()), this.setHeight(A.getBottom() - A.getTop()), I.NODE_DIMENSIONS_INCLUDE_LABELS) {
                  var $ = A.getRight() - A.getLeft(), U = A.getBottom() - A.getTop();
                  this.labelWidth > $ && (this.rect.x -= (this.labelWidth - $) / 2, this.setWidth(this.labelWidth)), this.labelHeight > U && (this.labelPos == "center" ? this.rect.y -= (this.labelHeight - U) / 2 : this.labelPos == "top" && (this.rect.y -= this.labelHeight - U), this.setHeight(this.labelHeight));
                }
              }
            }, P.prototype.getInclusionTreeDepth = function() {
              if (this.inclusionTreeDepth == T.MAX_VALUE)
                throw "assert failed";
              return this.inclusionTreeDepth;
            }, P.prototype.transform = function(A) {
              var $ = this.rect.x;
              $ > I.WORLD_BOUNDARY ? $ = I.WORLD_BOUNDARY : $ < -I.WORLD_BOUNDARY && ($ = -I.WORLD_BOUNDARY);
              var U = this.rect.y;
              U > I.WORLD_BOUNDARY ? U = I.WORLD_BOUNDARY : U < -I.WORLD_BOUNDARY && (U = -I.WORLD_BOUNDARY);
              var J = new Y($, U), ne = A.inverseTransformPoint(J);
              this.setLocation(ne.x, ne.y);
            }, P.prototype.getLeft = function() {
              return this.rect.x;
            }, P.prototype.getRight = function() {
              return this.rect.x + this.rect.width;
            }, P.prototype.getTop = function() {
              return this.rect.y;
            }, P.prototype.getBottom = function() {
              return this.rect.y + this.rect.height;
            }, P.prototype.getParent = function() {
              return this.owner == null ? null : this.owner.getParent();
            }, _.exports = P;
          },
          /* 4 */
          /***/
          function(_, fe, Q) {
            function C(T, x) {
              T == null && x == null ? (this.x = 0, this.y = 0) : (this.x = T, this.y = x);
            }
            C.prototype.getX = function() {
              return this.x;
            }, C.prototype.getY = function() {
              return this.y;
            }, C.prototype.setX = function(T) {
              this.x = T;
            }, C.prototype.setY = function(T) {
              this.y = T;
            }, C.prototype.getDifference = function(T) {
              return new DimensionD(this.x - T.x, this.y - T.y);
            }, C.prototype.getCopy = function() {
              return new C(this.x, this.y);
            }, C.prototype.translate = function(T) {
              return this.x += T.width, this.y += T.height, this;
            }, _.exports = C;
          },
          /* 5 */
          /***/
          function(_, fe, Q) {
            var C = Q(2), T = Q(10), x = Q(0), I = Q(6), z = Q(3), Y = Q(1), P = Q(13), Z = Q(12), A = Q(11);
            function $(J, ne, le) {
              C.call(this, le), this.estimatedSize = T.MIN_VALUE, this.margin = x.DEFAULT_GRAPH_MARGIN, this.edges = [], this.nodes = [], this.isConnected = !1, this.parent = J, ne != null && ne instanceof I ? this.graphManager = ne : ne != null && ne instanceof Layout && (this.graphManager = ne.graphManager);
            }
            $.prototype = Object.create(C.prototype);
            for (var U in C)
              $[U] = C[U];
            $.prototype.getNodes = function() {
              return this.nodes;
            }, $.prototype.getEdges = function() {
              return this.edges;
            }, $.prototype.getGraphManager = function() {
              return this.graphManager;
            }, $.prototype.getParent = function() {
              return this.parent;
            }, $.prototype.getLeft = function() {
              return this.left;
            }, $.prototype.getRight = function() {
              return this.right;
            }, $.prototype.getTop = function() {
              return this.top;
            }, $.prototype.getBottom = function() {
              return this.bottom;
            }, $.prototype.isConnected = function() {
              return this.isConnected;
            }, $.prototype.add = function(J, ne, le) {
              if (ne == null && le == null) {
                var j = J;
                if (this.graphManager == null)
                  throw "Graph has no graph mgr!";
                if (this.getNodes().indexOf(j) > -1)
                  throw "Node already in graph!";
                return j.owner = this, this.getNodes().push(j), j;
              } else {
                var ee = J;
                if (!(this.getNodes().indexOf(ne) > -1 && this.getNodes().indexOf(le) > -1))
                  throw "Source or target not in graph!";
                if (!(ne.owner == le.owner && ne.owner == this))
                  throw "Both owners must be this graph!";
                return ne.owner != le.owner ? null : (ee.source = ne, ee.target = le, ee.isInterGraph = !1, this.getEdges().push(ee), ne.edges.push(ee), le != ne && le.edges.push(ee), ee);
              }
            }, $.prototype.remove = function(J) {
              var ne = J;
              if (J instanceof z) {
                if (ne == null)
                  throw "Node is null!";
                if (!(ne.owner != null && ne.owner == this))
                  throw "Owner graph is invalid!";
                if (this.graphManager == null)
                  throw "Owner graph manager is invalid!";
                for (var le = ne.edges.slice(), j, ee = le.length, H = 0; H < ee; H++)
                  j = le[H], j.isInterGraph ? this.graphManager.remove(j) : j.source.owner.remove(j);
                var te = this.nodes.indexOf(ne);
                if (te == -1)
                  throw "Node not in owner node list!";
                this.nodes.splice(te, 1);
              } else if (J instanceof Y) {
                var j = J;
                if (j == null)
                  throw "Edge is null!";
                if (!(j.source != null && j.target != null))
                  throw "Source and/or target is null!";
                if (!(j.source.owner != null && j.target.owner != null && j.source.owner == this && j.target.owner == this))
                  throw "Source and/or target owner is invalid!";
                var S = j.source.edges.indexOf(j), V = j.target.edges.indexOf(j);
                if (!(S > -1 && V > -1))
                  throw "Source and/or target doesn't know this edge!";
                j.source.edges.splice(S, 1), j.target != j.source && j.target.edges.splice(V, 1);
                var te = j.source.owner.getEdges().indexOf(j);
                if (te == -1)
                  throw "Not in owner's edge list!";
                j.source.owner.getEdges().splice(te, 1);
              }
            }, $.prototype.updateLeftTop = function() {
              for (var J = T.MAX_VALUE, ne = T.MAX_VALUE, le, j, ee, H = this.getNodes(), te = H.length, S = 0; S < te; S++) {
                var V = H[S];
                le = V.getTop(), j = V.getLeft(), J > le && (J = le), ne > j && (ne = j);
              }
              return J == T.MAX_VALUE ? null : (H[0].getParent().paddingLeft != null ? ee = H[0].getParent().paddingLeft : ee = this.margin, this.left = ne - ee, this.top = J - ee, new Z(this.left, this.top));
            }, $.prototype.updateBounds = function(J) {
              for (var ne = T.MAX_VALUE, le = -T.MAX_VALUE, j = T.MAX_VALUE, ee = -T.MAX_VALUE, H, te, S, V, R, q = this.nodes, ve = q.length, pe = 0; pe < ve; pe++) {
                var Ae = q[pe];
                J && Ae.child != null && Ae.updateBounds(), H = Ae.getLeft(), te = Ae.getRight(), S = Ae.getTop(), V = Ae.getBottom(), ne > H && (ne = H), le < te && (le = te), j > S && (j = S), ee < V && (ee = V);
              }
              var Ne = new P(ne, j, le - ne, ee - j);
              ne == T.MAX_VALUE && (this.left = this.parent.getLeft(), this.right = this.parent.getRight(), this.top = this.parent.getTop(), this.bottom = this.parent.getBottom()), q[0].getParent().paddingLeft != null ? R = q[0].getParent().paddingLeft : R = this.margin, this.left = Ne.x - R, this.right = Ne.x + Ne.width + R, this.top = Ne.y - R, this.bottom = Ne.y + Ne.height + R;
            }, $.calculateBounds = function(J) {
              for (var ne = T.MAX_VALUE, le = -T.MAX_VALUE, j = T.MAX_VALUE, ee = -T.MAX_VALUE, H, te, S, V, R = J.length, q = 0; q < R; q++) {
                var ve = J[q];
                H = ve.getLeft(), te = ve.getRight(), S = ve.getTop(), V = ve.getBottom(), ne > H && (ne = H), le < te && (le = te), j > S && (j = S), ee < V && (ee = V);
              }
              var pe = new P(ne, j, le - ne, ee - j);
              return pe;
            }, $.prototype.getInclusionTreeDepth = function() {
              return this == this.graphManager.getRoot() ? 1 : this.parent.getInclusionTreeDepth();
            }, $.prototype.getEstimatedSize = function() {
              if (this.estimatedSize == T.MIN_VALUE)
                throw "assert failed";
              return this.estimatedSize;
            }, $.prototype.calcEstimatedSize = function() {
              for (var J = 0, ne = this.nodes, le = ne.length, j = 0; j < le; j++) {
                var ee = ne[j];
                J += ee.calcEstimatedSize();
              }
              return J == 0 ? this.estimatedSize = x.EMPTY_COMPOUND_NODE_SIZE : this.estimatedSize = J / Math.sqrt(this.nodes.length), this.estimatedSize;
            }, $.prototype.updateConnected = function() {
              var J = this;
              if (this.nodes.length == 0) {
                this.isConnected = !0;
                return;
              }
              var ne = new A(), le = /* @__PURE__ */ new Set(), j = this.nodes[0], ee, H, te = j.withChildren();
              for (te.forEach(function(pe) {
                ne.push(pe), le.add(pe);
              }); ne.length !== 0; ) {
                j = ne.shift(), ee = j.getEdges();
                for (var S = ee.length, V = 0; V < S; V++) {
                  var R = ee[V];
                  if (H = R.getOtherEndInGraph(j, this), H != null && !le.has(H)) {
                    var q = H.withChildren();
                    q.forEach(function(pe) {
                      ne.push(pe), le.add(pe);
                    });
                  }
                }
              }
              if (this.isConnected = !1, le.size >= this.nodes.length) {
                var ve = 0;
                le.forEach(function(pe) {
                  pe.owner == J && ve++;
                }), ve == this.nodes.length && (this.isConnected = !0);
              }
            }, _.exports = $;
          },
          /* 6 */
          /***/
          function(_, fe, Q) {
            var C, T = Q(1);
            function x(I) {
              C = Q(5), this.layout = I, this.graphs = [], this.edges = [];
            }
            x.prototype.addRoot = function() {
              var I = this.layout.newGraph(), z = this.layout.newNode(null), Y = this.add(I, z);
              return this.setRootGraph(Y), this.rootGraph;
            }, x.prototype.add = function(I, z, Y, P, Z) {
              if (Y == null && P == null && Z == null) {
                if (I == null)
                  throw "Graph is null!";
                if (z == null)
                  throw "Parent node is null!";
                if (this.graphs.indexOf(I) > -1)
                  throw "Graph already in this graph mgr!";
                if (this.graphs.push(I), I.parent != null)
                  throw "Already has a parent!";
                if (z.child != null)
                  throw "Already has a child!";
                return I.parent = z, z.child = I, I;
              } else {
                Z = Y, P = z, Y = I;
                var A = P.getOwner(), $ = Z.getOwner();
                if (!(A != null && A.getGraphManager() == this))
                  throw "Source not in this graph mgr!";
                if (!($ != null && $.getGraphManager() == this))
                  throw "Target not in this graph mgr!";
                if (A == $)
                  return Y.isInterGraph = !1, A.add(Y, P, Z);
                if (Y.isInterGraph = !0, Y.source = P, Y.target = Z, this.edges.indexOf(Y) > -1)
                  throw "Edge already in inter-graph edge list!";
                if (this.edges.push(Y), !(Y.source != null && Y.target != null))
                  throw "Edge source and/or target is null!";
                if (!(Y.source.edges.indexOf(Y) == -1 && Y.target.edges.indexOf(Y) == -1))
                  throw "Edge already in source and/or target incidency list!";
                return Y.source.edges.push(Y), Y.target.edges.push(Y), Y;
              }
            }, x.prototype.remove = function(I) {
              if (I instanceof C) {
                var z = I;
                if (z.getGraphManager() != this)
                  throw "Graph not in this graph mgr";
                if (!(z == this.rootGraph || z.parent != null && z.parent.graphManager == this))
                  throw "Invalid parent node!";
                var Y = [];
                Y = Y.concat(z.getEdges());
                for (var P, Z = Y.length, A = 0; A < Z; A++)
                  P = Y[A], z.remove(P);
                var $ = [];
                $ = $.concat(z.getNodes());
                var U;
                Z = $.length;
                for (var A = 0; A < Z; A++)
                  U = $[A], z.remove(U);
                z == this.rootGraph && this.setRootGraph(null);
                var J = this.graphs.indexOf(z);
                this.graphs.splice(J, 1), z.parent = null;
              } else if (I instanceof T) {
                if (P = I, P == null)
                  throw "Edge is null!";
                if (!P.isInterGraph)
                  throw "Not an inter-graph edge!";
                if (!(P.source != null && P.target != null))
                  throw "Source and/or target is null!";
                if (!(P.source.edges.indexOf(P) != -1 && P.target.edges.indexOf(P) != -1))
                  throw "Source and/or target doesn't know this edge!";
                var J = P.source.edges.indexOf(P);
                if (P.source.edges.splice(J, 1), J = P.target.edges.indexOf(P), P.target.edges.splice(J, 1), !(P.source.owner != null && P.source.owner.getGraphManager() != null))
                  throw "Edge owner graph or owner graph manager is null!";
                if (P.source.owner.getGraphManager().edges.indexOf(P) == -1)
                  throw "Not in owner graph manager's edge list!";
                var J = P.source.owner.getGraphManager().edges.indexOf(P);
                P.source.owner.getGraphManager().edges.splice(J, 1);
              }
            }, x.prototype.updateBounds = function() {
              this.rootGraph.updateBounds(!0);
            }, x.prototype.getGraphs = function() {
              return this.graphs;
            }, x.prototype.getAllNodes = function() {
              if (this.allNodes == null) {
                for (var I = [], z = this.getGraphs(), Y = z.length, P = 0; P < Y; P++)
                  I = I.concat(z[P].getNodes());
                this.allNodes = I;
              }
              return this.allNodes;
            }, x.prototype.resetAllNodes = function() {
              this.allNodes = null;
            }, x.prototype.resetAllEdges = function() {
              this.allEdges = null;
            }, x.prototype.resetAllNodesToApplyGravitation = function() {
              this.allNodesToApplyGravitation = null;
            }, x.prototype.getAllEdges = function() {
              if (this.allEdges == null) {
                var I = [], z = this.getGraphs();
                z.length;
                for (var Y = 0; Y < z.length; Y++)
                  I = I.concat(z[Y].getEdges());
                I = I.concat(this.edges), this.allEdges = I;
              }
              return this.allEdges;
            }, x.prototype.getAllNodesToApplyGravitation = function() {
              return this.allNodesToApplyGravitation;
            }, x.prototype.setAllNodesToApplyGravitation = function(I) {
              if (this.allNodesToApplyGravitation != null)
                throw "assert failed";
              this.allNodesToApplyGravitation = I;
            }, x.prototype.getRoot = function() {
              return this.rootGraph;
            }, x.prototype.setRootGraph = function(I) {
              if (I.getGraphManager() != this)
                throw "Root not in this graph mgr!";
              this.rootGraph = I, I.parent == null && (I.parent = this.layout.newNode("Root node"));
            }, x.prototype.getLayout = function() {
              return this.layout;
            }, x.prototype.isOneAncestorOfOther = function(I, z) {
              if (!(I != null && z != null))
                throw "assert failed";
              if (I == z)
                return !0;
              var Y = I.getOwner(), P;
              do {
                if (P = Y.getParent(), P == null)
                  break;
                if (P == z)
                  return !0;
                if (Y = P.getOwner(), Y == null)
                  break;
              } while (!0);
              Y = z.getOwner();
              do {
                if (P = Y.getParent(), P == null)
                  break;
                if (P == I)
                  return !0;
                if (Y = P.getOwner(), Y == null)
                  break;
              } while (!0);
              return !1;
            }, x.prototype.calcLowestCommonAncestors = function() {
              for (var I, z, Y, P, Z, A = this.getAllEdges(), $ = A.length, U = 0; U < $; U++) {
                if (I = A[U], z = I.source, Y = I.target, I.lca = null, I.sourceInLca = z, I.targetInLca = Y, z == Y) {
                  I.lca = z.getOwner();
                  continue;
                }
                for (P = z.getOwner(); I.lca == null; ) {
                  for (I.targetInLca = Y, Z = Y.getOwner(); I.lca == null; ) {
                    if (Z == P) {
                      I.lca = Z;
                      break;
                    }
                    if (Z == this.rootGraph)
                      break;
                    if (I.lca != null)
                      throw "assert failed";
                    I.targetInLca = Z.getParent(), Z = I.targetInLca.getOwner();
                  }
                  if (P == this.rootGraph)
                    break;
                  I.lca == null && (I.sourceInLca = P.getParent(), P = I.sourceInLca.getOwner());
                }
                if (I.lca == null)
                  throw "assert failed";
              }
            }, x.prototype.calcLowestCommonAncestor = function(I, z) {
              if (I == z)
                return I.getOwner();
              var Y = I.getOwner();
              do {
                if (Y == null)
                  break;
                var P = z.getOwner();
                do {
                  if (P == null)
                    break;
                  if (P == Y)
                    return P;
                  P = P.getParent().getOwner();
                } while (!0);
                Y = Y.getParent().getOwner();
              } while (!0);
              return Y;
            }, x.prototype.calcInclusionTreeDepths = function(I, z) {
              I == null && z == null && (I = this.rootGraph, z = 1);
              for (var Y, P = I.getNodes(), Z = P.length, A = 0; A < Z; A++)
                Y = P[A], Y.inclusionTreeDepth = z, Y.child != null && this.calcInclusionTreeDepths(Y.child, z + 1);
            }, x.prototype.includesInvalidEdge = function() {
              for (var I, z = this.edges.length, Y = 0; Y < z; Y++)
                if (I = this.edges[Y], this.isOneAncestorOfOther(I.source, I.target))
                  return !0;
              return !1;
            }, _.exports = x;
          },
          /* 7 */
          /***/
          function(_, fe, Q) {
            var C = Q(0);
            function T() {
            }
            for (var x in C)
              T[x] = C[x];
            T.MAX_ITERATIONS = 2500, T.DEFAULT_EDGE_LENGTH = 50, T.DEFAULT_SPRING_STRENGTH = 0.45, T.DEFAULT_REPULSION_STRENGTH = 4500, T.DEFAULT_GRAVITY_STRENGTH = 0.4, T.DEFAULT_COMPOUND_GRAVITY_STRENGTH = 1, T.DEFAULT_GRAVITY_RANGE_FACTOR = 3.8, T.DEFAULT_COMPOUND_GRAVITY_RANGE_FACTOR = 1.5, T.DEFAULT_USE_SMART_IDEAL_EDGE_LENGTH_CALCULATION = !0, T.DEFAULT_USE_SMART_REPULSION_RANGE_CALCULATION = !0, T.DEFAULT_COOLING_FACTOR_INCREMENTAL = 0.3, T.COOLING_ADAPTATION_FACTOR = 0.33, T.ADAPTATION_LOWER_NODE_LIMIT = 1e3, T.ADAPTATION_UPPER_NODE_LIMIT = 5e3, T.MAX_NODE_DISPLACEMENT_INCREMENTAL = 100, T.MAX_NODE_DISPLACEMENT = T.MAX_NODE_DISPLACEMENT_INCREMENTAL * 3, T.MIN_REPULSION_DIST = T.DEFAULT_EDGE_LENGTH / 10, T.CONVERGENCE_CHECK_PERIOD = 100, T.PER_LEVEL_IDEAL_EDGE_LENGTH_FACTOR = 0.1, T.MIN_EDGE_LENGTH = 1, T.GRID_CALCULATION_CHECK_PERIOD = 10, _.exports = T;
          },
          /* 8 */
          /***/
          function(_, fe, Q) {
            var C = Q(12);
            function T() {
            }
            T.calcSeparationAmount = function(x, I, z, Y) {
              if (!x.intersects(I))
                throw "assert failed";
              var P = new Array(2);
              this.decideDirectionsForOverlappingNodes(x, I, P), z[0] = Math.min(x.getRight(), I.getRight()) - Math.max(x.x, I.x), z[1] = Math.min(x.getBottom(), I.getBottom()) - Math.max(x.y, I.y), x.getX() <= I.getX() && x.getRight() >= I.getRight() ? z[0] += Math.min(I.getX() - x.getX(), x.getRight() - I.getRight()) : I.getX() <= x.getX() && I.getRight() >= x.getRight() && (z[0] += Math.min(x.getX() - I.getX(), I.getRight() - x.getRight())), x.getY() <= I.getY() && x.getBottom() >= I.getBottom() ? z[1] += Math.min(I.getY() - x.getY(), x.getBottom() - I.getBottom()) : I.getY() <= x.getY() && I.getBottom() >= x.getBottom() && (z[1] += Math.min(x.getY() - I.getY(), I.getBottom() - x.getBottom()));
              var Z = Math.abs((I.getCenterY() - x.getCenterY()) / (I.getCenterX() - x.getCenterX()));
              I.getCenterY() === x.getCenterY() && I.getCenterX() === x.getCenterX() && (Z = 1);
              var A = Z * z[0], $ = z[1] / Z;
              z[0] < $ ? $ = z[0] : A = z[1], z[0] = -1 * P[0] * ($ / 2 + Y), z[1] = -1 * P[1] * (A / 2 + Y);
            }, T.decideDirectionsForOverlappingNodes = function(x, I, z) {
              x.getCenterX() < I.getCenterX() ? z[0] = -1 : z[0] = 1, x.getCenterY() < I.getCenterY() ? z[1] = -1 : z[1] = 1;
            }, T.getIntersection2 = function(x, I, z) {
              var Y = x.getCenterX(), P = x.getCenterY(), Z = I.getCenterX(), A = I.getCenterY();
              if (x.intersects(I))
                return z[0] = Y, z[1] = P, z[2] = Z, z[3] = A, !0;
              var $ = x.getX(), U = x.getY(), J = x.getRight(), ne = x.getX(), le = x.getBottom(), j = x.getRight(), ee = x.getWidthHalf(), H = x.getHeightHalf(), te = I.getX(), S = I.getY(), V = I.getRight(), R = I.getX(), q = I.getBottom(), ve = I.getRight(), pe = I.getWidthHalf(), Ae = I.getHeightHalf(), Ne = !1, Ye = !1;
              if (Y === Z) {
                if (P > A)
                  return z[0] = Y, z[1] = U, z[2] = Z, z[3] = q, !1;
                if (P < A)
                  return z[0] = Y, z[1] = le, z[2] = Z, z[3] = S, !1;
              } else if (P === A) {
                if (Y > Z)
                  return z[0] = $, z[1] = P, z[2] = V, z[3] = A, !1;
                if (Y < Z)
                  return z[0] = J, z[1] = P, z[2] = te, z[3] = A, !1;
              } else {
                var at = x.height / x.width, dt = I.height / I.width, Re = (A - P) / (Z - Y), Ve = void 0, Ze = void 0, nt = void 0, ht = void 0, it = void 0, tt = void 0;
                if (-at === Re ? Y > Z ? (z[0] = ne, z[1] = le, Ne = !0) : (z[0] = J, z[1] = U, Ne = !0) : at === Re && (Y > Z ? (z[0] = $, z[1] = U, Ne = !0) : (z[0] = j, z[1] = le, Ne = !0)), -dt === Re ? Z > Y ? (z[2] = R, z[3] = q, Ye = !0) : (z[2] = V, z[3] = S, Ye = !0) : dt === Re && (Z > Y ? (z[2] = te, z[3] = S, Ye = !0) : (z[2] = ve, z[3] = q, Ye = !0)), Ne && Ye)
                  return !1;
                if (Y > Z ? P > A ? (Ve = this.getCardinalDirection(at, Re, 4), Ze = this.getCardinalDirection(dt, Re, 2)) : (Ve = this.getCardinalDirection(-at, Re, 3), Ze = this.getCardinalDirection(-dt, Re, 1)) : P > A ? (Ve = this.getCardinalDirection(-at, Re, 1), Ze = this.getCardinalDirection(-dt, Re, 3)) : (Ve = this.getCardinalDirection(at, Re, 2), Ze = this.getCardinalDirection(dt, Re, 4)), !Ne)
                  switch (Ve) {
                    case 1:
                      ht = U, nt = Y + -H / Re, z[0] = nt, z[1] = ht;
                      break;
                    case 2:
                      nt = j, ht = P + ee * Re, z[0] = nt, z[1] = ht;
                      break;
                    case 3:
                      ht = le, nt = Y + H / Re, z[0] = nt, z[1] = ht;
                      break;
                    case 4:
                      nt = ne, ht = P + -ee * Re, z[0] = nt, z[1] = ht;
                      break;
                  }
                if (!Ye)
                  switch (Ze) {
                    case 1:
                      tt = S, it = Z + -Ae / Re, z[2] = it, z[3] = tt;
                      break;
                    case 2:
                      it = ve, tt = A + pe * Re, z[2] = it, z[3] = tt;
                      break;
                    case 3:
                      tt = q, it = Z + Ae / Re, z[2] = it, z[3] = tt;
                      break;
                    case 4:
                      it = R, tt = A + -pe * Re, z[2] = it, z[3] = tt;
                      break;
                  }
              }
              return !1;
            }, T.getCardinalDirection = function(x, I, z) {
              return x > I ? z : 1 + z % 4;
            }, T.getIntersection = function(x, I, z, Y) {
              if (Y == null)
                return this.getIntersection2(x, I, z);
              var P = x.x, Z = x.y, A = I.x, $ = I.y, U = z.x, J = z.y, ne = Y.x, le = Y.y, j = void 0, ee = void 0, H = void 0, te = void 0, S = void 0, V = void 0, R = void 0, q = void 0, ve = void 0;
              return H = $ - Z, S = P - A, R = A * Z - P * $, te = le - J, V = U - ne, q = ne * J - U * le, ve = H * V - te * S, ve === 0 ? null : (j = (S * q - V * R) / ve, ee = (te * R - H * q) / ve, new C(j, ee));
            }, T.angleOfVector = function(x, I, z, Y) {
              var P = void 0;
              return x !== z ? (P = Math.atan((Y - I) / (z - x)), z < x ? P += Math.PI : Y < I && (P += this.TWO_PI)) : Y < I ? P = this.ONE_AND_HALF_PI : P = this.HALF_PI, P;
            }, T.doIntersect = function(x, I, z, Y) {
              var P = x.x, Z = x.y, A = I.x, $ = I.y, U = z.x, J = z.y, ne = Y.x, le = Y.y, j = (A - P) * (le - J) - (ne - U) * ($ - Z);
              if (j === 0)
                return !1;
              var ee = ((le - J) * (ne - P) + (U - ne) * (le - Z)) / j, H = ((Z - $) * (ne - P) + (A - P) * (le - Z)) / j;
              return 0 < ee && ee < 1 && 0 < H && H < 1;
            }, T.HALF_PI = 0.5 * Math.PI, T.ONE_AND_HALF_PI = 1.5 * Math.PI, T.TWO_PI = 2 * Math.PI, T.THREE_PI = 3 * Math.PI, _.exports = T;
          },
          /* 9 */
          /***/
          function(_, fe, Q) {
            function C() {
            }
            C.sign = function(T) {
              return T > 0 ? 1 : T < 0 ? -1 : 0;
            }, C.floor = function(T) {
              return T < 0 ? Math.ceil(T) : Math.floor(T);
            }, C.ceil = function(T) {
              return T < 0 ? Math.floor(T) : Math.ceil(T);
            }, _.exports = C;
          },
          /* 10 */
          /***/
          function(_, fe, Q) {
            function C() {
            }
            C.MAX_VALUE = 2147483647, C.MIN_VALUE = -2147483648, _.exports = C;
          },
          /* 11 */
          /***/
          function(_, fe, Q) {
            var C = function() {
              function P(Z, A) {
                for (var $ = 0; $ < A.length; $++) {
                  var U = A[$];
                  U.enumerable = U.enumerable || !1, U.configurable = !0, "value" in U && (U.writable = !0), Object.defineProperty(Z, U.key, U);
                }
              }
              return function(Z, A, $) {
                return A && P(Z.prototype, A), $ && P(Z, $), Z;
              };
            }();
            function T(P, Z) {
              if (!(P instanceof Z))
                throw new TypeError("Cannot call a class as a function");
            }
            var x = function(Z) {
              return { value: Z, next: null, prev: null };
            }, I = function(Z, A, $, U) {
              return Z !== null ? Z.next = A : U.head = A, $ !== null ? $.prev = A : U.tail = A, A.prev = Z, A.next = $, U.length++, A;
            }, z = function(Z, A) {
              var $ = Z.prev, U = Z.next;
              return $ !== null ? $.next = U : A.head = U, U !== null ? U.prev = $ : A.tail = $, Z.prev = Z.next = null, A.length--, Z;
            }, Y = function() {
              function P(Z) {
                var A = this;
                T(this, P), this.length = 0, this.head = null, this.tail = null, Z != null && Z.forEach(function($) {
                  return A.push($);
                });
              }
              return C(P, [{
                key: "size",
                value: function() {
                  return this.length;
                }
              }, {
                key: "insertBefore",
                value: function(A, $) {
                  return I($.prev, x(A), $, this);
                }
              }, {
                key: "insertAfter",
                value: function(A, $) {
                  return I($, x(A), $.next, this);
                }
              }, {
                key: "insertNodeBefore",
                value: function(A, $) {
                  return I($.prev, A, $, this);
                }
              }, {
                key: "insertNodeAfter",
                value: function(A, $) {
                  return I($, A, $.next, this);
                }
              }, {
                key: "push",
                value: function(A) {
                  return I(this.tail, x(A), null, this);
                }
              }, {
                key: "unshift",
                value: function(A) {
                  return I(null, x(A), this.head, this);
                }
              }, {
                key: "remove",
                value: function(A) {
                  return z(A, this);
                }
              }, {
                key: "pop",
                value: function() {
                  return z(this.tail, this).value;
                }
              }, {
                key: "popNode",
                value: function() {
                  return z(this.tail, this);
                }
              }, {
                key: "shift",
                value: function() {
                  return z(this.head, this).value;
                }
              }, {
                key: "shiftNode",
                value: function() {
                  return z(this.head, this);
                }
              }, {
                key: "get_object_at",
                value: function(A) {
                  if (A <= this.length()) {
                    for (var $ = 1, U = this.head; $ < A; )
                      U = U.next, $++;
                    return U.value;
                  }
                }
              }, {
                key: "set_object_at",
                value: function(A, $) {
                  if (A <= this.length()) {
                    for (var U = 1, J = this.head; U < A; )
                      J = J.next, U++;
                    J.value = $;
                  }
                }
              }]), P;
            }();
            _.exports = Y;
          },
          /* 12 */
          /***/
          function(_, fe, Q) {
            function C(T, x, I) {
              this.x = null, this.y = null, T == null && x == null && I == null ? (this.x = 0, this.y = 0) : typeof T == "number" && typeof x == "number" && I == null ? (this.x = T, this.y = x) : T.constructor.name == "Point" && x == null && I == null && (I = T, this.x = I.x, this.y = I.y);
            }
            C.prototype.getX = function() {
              return this.x;
            }, C.prototype.getY = function() {
              return this.y;
            }, C.prototype.getLocation = function() {
              return new C(this.x, this.y);
            }, C.prototype.setLocation = function(T, x, I) {
              T.constructor.name == "Point" && x == null && I == null ? (I = T, this.setLocation(I.x, I.y)) : typeof T == "number" && typeof x == "number" && I == null && (parseInt(T) == T && parseInt(x) == x ? this.move(T, x) : (this.x = Math.floor(T + 0.5), this.y = Math.floor(x + 0.5)));
            }, C.prototype.move = function(T, x) {
              this.x = T, this.y = x;
            }, C.prototype.translate = function(T, x) {
              this.x += T, this.y += x;
            }, C.prototype.equals = function(T) {
              if (T.constructor.name == "Point") {
                var x = T;
                return this.x == x.x && this.y == x.y;
              }
              return this == T;
            }, C.prototype.toString = function() {
              return new C().constructor.name + "[x=" + this.x + ",y=" + this.y + "]";
            }, _.exports = C;
          },
          /* 13 */
          /***/
          function(_, fe, Q) {
            function C(T, x, I, z) {
              this.x = 0, this.y = 0, this.width = 0, this.height = 0, T != null && x != null && I != null && z != null && (this.x = T, this.y = x, this.width = I, this.height = z);
            }
            C.prototype.getX = function() {
              return this.x;
            }, C.prototype.setX = function(T) {
              this.x = T;
            }, C.prototype.getY = function() {
              return this.y;
            }, C.prototype.setY = function(T) {
              this.y = T;
            }, C.prototype.getWidth = function() {
              return this.width;
            }, C.prototype.setWidth = function(T) {
              this.width = T;
            }, C.prototype.getHeight = function() {
              return this.height;
            }, C.prototype.setHeight = function(T) {
              this.height = T;
            }, C.prototype.getRight = function() {
              return this.x + this.width;
            }, C.prototype.getBottom = function() {
              return this.y + this.height;
            }, C.prototype.intersects = function(T) {
              return !(this.getRight() < T.x || this.getBottom() < T.y || T.getRight() < this.x || T.getBottom() < this.y);
            }, C.prototype.getCenterX = function() {
              return this.x + this.width / 2;
            }, C.prototype.getMinX = function() {
              return this.getX();
            }, C.prototype.getMaxX = function() {
              return this.getX() + this.width;
            }, C.prototype.getCenterY = function() {
              return this.y + this.height / 2;
            }, C.prototype.getMinY = function() {
              return this.getY();
            }, C.prototype.getMaxY = function() {
              return this.getY() + this.height;
            }, C.prototype.getWidthHalf = function() {
              return this.width / 2;
            }, C.prototype.getHeightHalf = function() {
              return this.height / 2;
            }, _.exports = C;
          },
          /* 14 */
          /***/
          function(_, fe, Q) {
            var C = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(x) {
              return typeof x;
            } : function(x) {
              return x && typeof Symbol == "function" && x.constructor === Symbol && x !== Symbol.prototype ? "symbol" : typeof x;
            };
            function T() {
            }
            T.lastID = 0, T.createID = function(x) {
              return T.isPrimitive(x) ? x : (x.uniqueID != null || (x.uniqueID = T.getString(), T.lastID++), x.uniqueID);
            }, T.getString = function(x) {
              return x == null && (x = T.lastID), "Object#" + x;
            }, T.isPrimitive = function(x) {
              var I = typeof x > "u" ? "undefined" : C(x);
              return x == null || I != "object" && I != "function";
            }, _.exports = T;
          },
          /* 15 */
          /***/
          function(_, fe, Q) {
            function C(U) {
              if (Array.isArray(U)) {
                for (var J = 0, ne = Array(U.length); J < U.length; J++)
                  ne[J] = U[J];
                return ne;
              } else
                return Array.from(U);
            }
            var T = Q(0), x = Q(6), I = Q(3), z = Q(1), Y = Q(5), P = Q(4), Z = Q(17), A = Q(27);
            function $(U) {
              A.call(this), this.layoutQuality = T.QUALITY, this.createBendsAsNeeded = T.DEFAULT_CREATE_BENDS_AS_NEEDED, this.incremental = T.DEFAULT_INCREMENTAL, this.animationOnLayout = T.DEFAULT_ANIMATION_ON_LAYOUT, this.animationDuringLayout = T.DEFAULT_ANIMATION_DURING_LAYOUT, this.animationPeriod = T.DEFAULT_ANIMATION_PERIOD, this.uniformLeafNodeSizes = T.DEFAULT_UNIFORM_LEAF_NODE_SIZES, this.edgeToDummyNodes = /* @__PURE__ */ new Map(), this.graphManager = new x(this), this.isLayoutFinished = !1, this.isSubLayout = !1, this.isRemoteUse = !1, U != null && (this.isRemoteUse = U);
            }
            $.RANDOM_SEED = 1, $.prototype = Object.create(A.prototype), $.prototype.getGraphManager = function() {
              return this.graphManager;
            }, $.prototype.getAllNodes = function() {
              return this.graphManager.getAllNodes();
            }, $.prototype.getAllEdges = function() {
              return this.graphManager.getAllEdges();
            }, $.prototype.getAllNodesToApplyGravitation = function() {
              return this.graphManager.getAllNodesToApplyGravitation();
            }, $.prototype.newGraphManager = function() {
              var U = new x(this);
              return this.graphManager = U, U;
            }, $.prototype.newGraph = function(U) {
              return new Y(null, this.graphManager, U);
            }, $.prototype.newNode = function(U) {
              return new I(this.graphManager, U);
            }, $.prototype.newEdge = function(U) {
              return new z(null, null, U);
            }, $.prototype.checkLayoutSuccess = function() {
              return this.graphManager.getRoot() == null || this.graphManager.getRoot().getNodes().length == 0 || this.graphManager.includesInvalidEdge();
            }, $.prototype.runLayout = function() {
              this.isLayoutFinished = !1, this.tilingPreLayout && this.tilingPreLayout(), this.initParameters();
              var U;
              return this.checkLayoutSuccess() ? U = !1 : U = this.layout(), T.ANIMATE === "during" ? !1 : (U && (this.isSubLayout || this.doPostLayout()), this.tilingPostLayout && this.tilingPostLayout(), this.isLayoutFinished = !0, U);
            }, $.prototype.doPostLayout = function() {
              this.incremental || this.transform(), this.update();
            }, $.prototype.update2 = function() {
              if (this.createBendsAsNeeded && (this.createBendpointsFromDummyNodes(), this.graphManager.resetAllEdges()), !this.isRemoteUse) {
                for (var U = this.graphManager.getAllEdges(), J = 0; J < U.length; J++)
                  U[J];
                for (var ne = this.graphManager.getRoot().getNodes(), J = 0; J < ne.length; J++)
                  ne[J];
                this.update(this.graphManager.getRoot());
              }
            }, $.prototype.update = function(U) {
              if (U == null)
                this.update2();
              else if (U instanceof I) {
                var J = U;
                if (J.getChild() != null)
                  for (var ne = J.getChild().getNodes(), le = 0; le < ne.length; le++)
                    update(ne[le]);
                if (J.vGraphObject != null) {
                  var j = J.vGraphObject;
                  j.update(J);
                }
              } else if (U instanceof z) {
                var ee = U;
                if (ee.vGraphObject != null) {
                  var H = ee.vGraphObject;
                  H.update(ee);
                }
              } else if (U instanceof Y) {
                var te = U;
                if (te.vGraphObject != null) {
                  var S = te.vGraphObject;
                  S.update(te);
                }
              }
            }, $.prototype.initParameters = function() {
              this.isSubLayout || (this.layoutQuality = T.QUALITY, this.animationDuringLayout = T.DEFAULT_ANIMATION_DURING_LAYOUT, this.animationPeriod = T.DEFAULT_ANIMATION_PERIOD, this.animationOnLayout = T.DEFAULT_ANIMATION_ON_LAYOUT, this.incremental = T.DEFAULT_INCREMENTAL, this.createBendsAsNeeded = T.DEFAULT_CREATE_BENDS_AS_NEEDED, this.uniformLeafNodeSizes = T.DEFAULT_UNIFORM_LEAF_NODE_SIZES), this.animationDuringLayout && (this.animationOnLayout = !1);
            }, $.prototype.transform = function(U) {
              if (U == null)
                this.transform(new P(0, 0));
              else {
                var J = new Z(), ne = this.graphManager.getRoot().updateLeftTop();
                if (ne != null) {
                  J.setWorldOrgX(U.x), J.setWorldOrgY(U.y), J.setDeviceOrgX(ne.x), J.setDeviceOrgY(ne.y);
                  for (var le = this.getAllNodes(), j, ee = 0; ee < le.length; ee++)
                    j = le[ee], j.transform(J);
                }
              }
            }, $.prototype.positionNodesRandomly = function(U) {
              if (U == null)
                this.positionNodesRandomly(this.getGraphManager().getRoot()), this.getGraphManager().getRoot().updateBounds(!0);
              else
                for (var J, ne, le = U.getNodes(), j = 0; j < le.length; j++)
                  J = le[j], ne = J.getChild(), ne == null || ne.getNodes().length == 0 ? J.scatter() : (this.positionNodesRandomly(ne), J.updateBounds());
            }, $.prototype.getFlatForest = function() {
              for (var U = [], J = !0, ne = this.graphManager.getRoot().getNodes(), le = !0, j = 0; j < ne.length; j++)
                ne[j].getChild() != null && (le = !1);
              if (!le)
                return U;
              var ee = /* @__PURE__ */ new Set(), H = [], te = /* @__PURE__ */ new Map(), S = [];
              for (S = S.concat(ne); S.length > 0 && J; ) {
                for (H.push(S[0]); H.length > 0 && J; ) {
                  var V = H[0];
                  H.splice(0, 1), ee.add(V);
                  for (var R = V.getEdges(), j = 0; j < R.length; j++) {
                    var q = R[j].getOtherEnd(V);
                    if (te.get(V) != q)
                      if (!ee.has(q))
                        H.push(q), te.set(q, V);
                      else {
                        J = !1;
                        break;
                      }
                  }
                }
                if (!J)
                  U = [];
                else {
                  var ve = [].concat(C(ee));
                  U.push(ve);
                  for (var j = 0; j < ve.length; j++) {
                    var pe = ve[j], Ae = S.indexOf(pe);
                    Ae > -1 && S.splice(Ae, 1);
                  }
                  ee = /* @__PURE__ */ new Set(), te = /* @__PURE__ */ new Map();
                }
              }
              return U;
            }, $.prototype.createDummyNodesForBendpoints = function(U) {
              for (var J = [], ne = U.source, le = this.graphManager.calcLowestCommonAncestor(U.source, U.target), j = 0; j < U.bendpoints.length; j++) {
                var ee = this.newNode(null);
                ee.setRect(new Point(0, 0), new Dimension(1, 1)), le.add(ee);
                var H = this.newEdge(null);
                this.graphManager.add(H, ne, ee), J.add(ee), ne = ee;
              }
              var H = this.newEdge(null);
              return this.graphManager.add(H, ne, U.target), this.edgeToDummyNodes.set(U, J), U.isInterGraph() ? this.graphManager.remove(U) : le.remove(U), J;
            }, $.prototype.createBendpointsFromDummyNodes = function() {
              var U = [];
              U = U.concat(this.graphManager.getAllEdges()), U = [].concat(C(this.edgeToDummyNodes.keys())).concat(U);
              for (var J = 0; J < U.length; J++) {
                var ne = U[J];
                if (ne.bendpoints.length > 0) {
                  for (var le = this.edgeToDummyNodes.get(ne), j = 0; j < le.length; j++) {
                    var ee = le[j], H = new P(ee.getCenterX(), ee.getCenterY()), te = ne.bendpoints.get(j);
                    te.x = H.x, te.y = H.y, ee.getOwner().remove(ee);
                  }
                  this.graphManager.add(ne, ne.source, ne.target);
                }
              }
            }, $.transform = function(U, J, ne, le) {
              if (ne != null && le != null) {
                var j = J;
                if (U <= 50) {
                  var ee = J / ne;
                  j -= (J - ee) / 50 * (50 - U);
                } else {
                  var H = J * le;
                  j += (H - J) / 50 * (U - 50);
                }
                return j;
              } else {
                var te, S;
                return U <= 50 ? (te = 9 * J / 500, S = J / 10) : (te = 9 * J / 50, S = -8 * J), te * U + S;
              }
            }, $.findCenterOfTree = function(U) {
              var J = [];
              J = J.concat(U);
              var ne = [], le = /* @__PURE__ */ new Map(), j = !1, ee = null;
              (J.length == 1 || J.length == 2) && (j = !0, ee = J[0]);
              for (var H = 0; H < J.length; H++) {
                var te = J[H], S = te.getNeighborsList().size;
                le.set(te, te.getNeighborsList().size), S == 1 && ne.push(te);
              }
              var V = [];
              for (V = V.concat(ne); !j; ) {
                var R = [];
                R = R.concat(V), V = [];
                for (var H = 0; H < J.length; H++) {
                  var te = J[H], q = J.indexOf(te);
                  q >= 0 && J.splice(q, 1);
                  var ve = te.getNeighborsList();
                  ve.forEach(function(Ne) {
                    if (ne.indexOf(Ne) < 0) {
                      var Ye = le.get(Ne), at = Ye - 1;
                      at == 1 && V.push(Ne), le.set(Ne, at);
                    }
                  });
                }
                ne = ne.concat(V), (J.length == 1 || J.length == 2) && (j = !0, ee = J[0]);
              }
              return ee;
            }, $.prototype.setGraphManager = function(U) {
              this.graphManager = U;
            }, _.exports = $;
          },
          /* 16 */
          /***/
          function(_, fe, Q) {
            function C() {
            }
            C.seed = 1, C.x = 0, C.nextDouble = function() {
              return C.x = Math.sin(C.seed++) * 1e4, C.x - Math.floor(C.x);
            }, _.exports = C;
          },
          /* 17 */
          /***/
          function(_, fe, Q) {
            var C = Q(4);
            function T(x, I) {
              this.lworldOrgX = 0, this.lworldOrgY = 0, this.ldeviceOrgX = 0, this.ldeviceOrgY = 0, this.lworldExtX = 1, this.lworldExtY = 1, this.ldeviceExtX = 1, this.ldeviceExtY = 1;
            }
            T.prototype.getWorldOrgX = function() {
              return this.lworldOrgX;
            }, T.prototype.setWorldOrgX = function(x) {
              this.lworldOrgX = x;
            }, T.prototype.getWorldOrgY = function() {
              return this.lworldOrgY;
            }, T.prototype.setWorldOrgY = function(x) {
              this.lworldOrgY = x;
            }, T.prototype.getWorldExtX = function() {
              return this.lworldExtX;
            }, T.prototype.setWorldExtX = function(x) {
              this.lworldExtX = x;
            }, T.prototype.getWorldExtY = function() {
              return this.lworldExtY;
            }, T.prototype.setWorldExtY = function(x) {
              this.lworldExtY = x;
            }, T.prototype.getDeviceOrgX = function() {
              return this.ldeviceOrgX;
            }, T.prototype.setDeviceOrgX = function(x) {
              this.ldeviceOrgX = x;
            }, T.prototype.getDeviceOrgY = function() {
              return this.ldeviceOrgY;
            }, T.prototype.setDeviceOrgY = function(x) {
              this.ldeviceOrgY = x;
            }, T.prototype.getDeviceExtX = function() {
              return this.ldeviceExtX;
            }, T.prototype.setDeviceExtX = function(x) {
              this.ldeviceExtX = x;
            }, T.prototype.getDeviceExtY = function() {
              return this.ldeviceExtY;
            }, T.prototype.setDeviceExtY = function(x) {
              this.ldeviceExtY = x;
            }, T.prototype.transformX = function(x) {
              var I = 0, z = this.lworldExtX;
              return z != 0 && (I = this.ldeviceOrgX + (x - this.lworldOrgX) * this.ldeviceExtX / z), I;
            }, T.prototype.transformY = function(x) {
              var I = 0, z = this.lworldExtY;
              return z != 0 && (I = this.ldeviceOrgY + (x - this.lworldOrgY) * this.ldeviceExtY / z), I;
            }, T.prototype.inverseTransformX = function(x) {
              var I = 0, z = this.ldeviceExtX;
              return z != 0 && (I = this.lworldOrgX + (x - this.ldeviceOrgX) * this.lworldExtX / z), I;
            }, T.prototype.inverseTransformY = function(x) {
              var I = 0, z = this.ldeviceExtY;
              return z != 0 && (I = this.lworldOrgY + (x - this.ldeviceOrgY) * this.lworldExtY / z), I;
            }, T.prototype.inverseTransformPoint = function(x) {
              var I = new C(this.inverseTransformX(x.x), this.inverseTransformY(x.y));
              return I;
            }, _.exports = T;
          },
          /* 18 */
          /***/
          function(_, fe, Q) {
            function C(A) {
              if (Array.isArray(A)) {
                for (var $ = 0, U = Array(A.length); $ < A.length; $++)
                  U[$] = A[$];
                return U;
              } else
                return Array.from(A);
            }
            var T = Q(15), x = Q(7), I = Q(0), z = Q(8), Y = Q(9);
            function P() {
              T.call(this), this.useSmartIdealEdgeLengthCalculation = x.DEFAULT_USE_SMART_IDEAL_EDGE_LENGTH_CALCULATION, this.idealEdgeLength = x.DEFAULT_EDGE_LENGTH, this.springConstant = x.DEFAULT_SPRING_STRENGTH, this.repulsionConstant = x.DEFAULT_REPULSION_STRENGTH, this.gravityConstant = x.DEFAULT_GRAVITY_STRENGTH, this.compoundGravityConstant = x.DEFAULT_COMPOUND_GRAVITY_STRENGTH, this.gravityRangeFactor = x.DEFAULT_GRAVITY_RANGE_FACTOR, this.compoundGravityRangeFactor = x.DEFAULT_COMPOUND_GRAVITY_RANGE_FACTOR, this.displacementThresholdPerNode = 3 * x.DEFAULT_EDGE_LENGTH / 100, this.coolingFactor = x.DEFAULT_COOLING_FACTOR_INCREMENTAL, this.initialCoolingFactor = x.DEFAULT_COOLING_FACTOR_INCREMENTAL, this.totalDisplacement = 0, this.oldTotalDisplacement = 0, this.maxIterations = x.MAX_ITERATIONS;
            }
            P.prototype = Object.create(T.prototype);
            for (var Z in T)
              P[Z] = T[Z];
            P.prototype.initParameters = function() {
              T.prototype.initParameters.call(this, arguments), this.totalIterations = 0, this.notAnimatedIterations = 0, this.useFRGridVariant = x.DEFAULT_USE_SMART_REPULSION_RANGE_CALCULATION, this.grid = [];
            }, P.prototype.calcIdealEdgeLengths = function() {
              for (var A, $, U, J, ne, le, j = this.getGraphManager().getAllEdges(), ee = 0; ee < j.length; ee++)
                A = j[ee], A.idealLength = this.idealEdgeLength, A.isInterGraph && (U = A.getSource(), J = A.getTarget(), ne = A.getSourceInLca().getEstimatedSize(), le = A.getTargetInLca().getEstimatedSize(), this.useSmartIdealEdgeLengthCalculation && (A.idealLength += ne + le - 2 * I.SIMPLE_NODE_SIZE), $ = A.getLca().getInclusionTreeDepth(), A.idealLength += x.DEFAULT_EDGE_LENGTH * x.PER_LEVEL_IDEAL_EDGE_LENGTH_FACTOR * (U.getInclusionTreeDepth() + J.getInclusionTreeDepth() - 2 * $));
            }, P.prototype.initSpringEmbedder = function() {
              var A = this.getAllNodes().length;
              this.incremental ? (A > x.ADAPTATION_LOWER_NODE_LIMIT && (this.coolingFactor = Math.max(this.coolingFactor * x.COOLING_ADAPTATION_FACTOR, this.coolingFactor - (A - x.ADAPTATION_LOWER_NODE_LIMIT) / (x.ADAPTATION_UPPER_NODE_LIMIT - x.ADAPTATION_LOWER_NODE_LIMIT) * this.coolingFactor * (1 - x.COOLING_ADAPTATION_FACTOR))), this.maxNodeDisplacement = x.MAX_NODE_DISPLACEMENT_INCREMENTAL) : (A > x.ADAPTATION_LOWER_NODE_LIMIT ? this.coolingFactor = Math.max(x.COOLING_ADAPTATION_FACTOR, 1 - (A - x.ADAPTATION_LOWER_NODE_LIMIT) / (x.ADAPTATION_UPPER_NODE_LIMIT - x.ADAPTATION_LOWER_NODE_LIMIT) * (1 - x.COOLING_ADAPTATION_FACTOR)) : this.coolingFactor = 1, this.initialCoolingFactor = this.coolingFactor, this.maxNodeDisplacement = x.MAX_NODE_DISPLACEMENT), this.maxIterations = Math.max(this.getAllNodes().length * 5, this.maxIterations), this.totalDisplacementThreshold = this.displacementThresholdPerNode * this.getAllNodes().length, this.repulsionRange = this.calcRepulsionRange();
            }, P.prototype.calcSpringForces = function() {
              for (var A = this.getAllEdges(), $, U = 0; U < A.length; U++)
                $ = A[U], this.calcSpringForce($, $.idealLength);
            }, P.prototype.calcRepulsionForces = function() {
              var A = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !0, $ = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1, U, J, ne, le, j = this.getAllNodes(), ee;
              if (this.useFRGridVariant)
                for (this.totalIterations % x.GRID_CALCULATION_CHECK_PERIOD == 1 && A && this.updateGrid(), ee = /* @__PURE__ */ new Set(), U = 0; U < j.length; U++)
                  ne = j[U], this.calculateRepulsionForceOfANode(ne, ee, A, $), ee.add(ne);
              else
                for (U = 0; U < j.length; U++)
                  for (ne = j[U], J = U + 1; J < j.length; J++)
                    le = j[J], ne.getOwner() == le.getOwner() && this.calcRepulsionForce(ne, le);
            }, P.prototype.calcGravitationalForces = function() {
              for (var A, $ = this.getAllNodesToApplyGravitation(), U = 0; U < $.length; U++)
                A = $[U], this.calcGravitationalForce(A);
            }, P.prototype.moveNodes = function() {
              for (var A = this.getAllNodes(), $, U = 0; U < A.length; U++)
                $ = A[U], $.move();
            }, P.prototype.calcSpringForce = function(A, $) {
              var U = A.getSource(), J = A.getTarget(), ne, le, j, ee;
              if (this.uniformLeafNodeSizes && U.getChild() == null && J.getChild() == null)
                A.updateLengthSimple();
              else if (A.updateLength(), A.isOverlapingSourceAndTarget)
                return;
              ne = A.getLength(), ne != 0 && (le = this.springConstant * (ne - $), j = le * (A.lengthX / ne), ee = le * (A.lengthY / ne), U.springForceX += j, U.springForceY += ee, J.springForceX -= j, J.springForceY -= ee);
            }, P.prototype.calcRepulsionForce = function(A, $) {
              var U = A.getRect(), J = $.getRect(), ne = new Array(2), le = new Array(4), j, ee, H, te, S, V, R;
              if (U.intersects(J)) {
                z.calcSeparationAmount(U, J, ne, x.DEFAULT_EDGE_LENGTH / 2), V = 2 * ne[0], R = 2 * ne[1];
                var q = A.noOfChildren * $.noOfChildren / (A.noOfChildren + $.noOfChildren);
                A.repulsionForceX -= q * V, A.repulsionForceY -= q * R, $.repulsionForceX += q * V, $.repulsionForceY += q * R;
              } else
                this.uniformLeafNodeSizes && A.getChild() == null && $.getChild() == null ? (j = J.getCenterX() - U.getCenterX(), ee = J.getCenterY() - U.getCenterY()) : (z.getIntersection(U, J, le), j = le[2] - le[0], ee = le[3] - le[1]), Math.abs(j) < x.MIN_REPULSION_DIST && (j = Y.sign(j) * x.MIN_REPULSION_DIST), Math.abs(ee) < x.MIN_REPULSION_DIST && (ee = Y.sign(ee) * x.MIN_REPULSION_DIST), H = j * j + ee * ee, te = Math.sqrt(H), S = this.repulsionConstant * A.noOfChildren * $.noOfChildren / H, V = S * j / te, R = S * ee / te, A.repulsionForceX -= V, A.repulsionForceY -= R, $.repulsionForceX += V, $.repulsionForceY += R;
            }, P.prototype.calcGravitationalForce = function(A) {
              var $, U, J, ne, le, j, ee, H;
              $ = A.getOwner(), U = ($.getRight() + $.getLeft()) / 2, J = ($.getTop() + $.getBottom()) / 2, ne = A.getCenterX() - U, le = A.getCenterY() - J, j = Math.abs(ne) + A.getWidth() / 2, ee = Math.abs(le) + A.getHeight() / 2, A.getOwner() == this.graphManager.getRoot() ? (H = $.getEstimatedSize() * this.gravityRangeFactor, (j > H || ee > H) && (A.gravitationForceX = -this.gravityConstant * ne, A.gravitationForceY = -this.gravityConstant * le)) : (H = $.getEstimatedSize() * this.compoundGravityRangeFactor, (j > H || ee > H) && (A.gravitationForceX = -this.gravityConstant * ne * this.compoundGravityConstant, A.gravitationForceY = -this.gravityConstant * le * this.compoundGravityConstant));
            }, P.prototype.isConverged = function() {
              var A, $ = !1;
              return this.totalIterations > this.maxIterations / 3 && ($ = Math.abs(this.totalDisplacement - this.oldTotalDisplacement) < 2), A = this.totalDisplacement < this.totalDisplacementThreshold, this.oldTotalDisplacement = this.totalDisplacement, A || $;
            }, P.prototype.animate = function() {
              this.animationDuringLayout && !this.isSubLayout && (this.notAnimatedIterations == this.animationPeriod ? (this.update(), this.notAnimatedIterations = 0) : this.notAnimatedIterations++);
            }, P.prototype.calcNoOfChildrenForAllNodes = function() {
              for (var A, $ = this.graphManager.getAllNodes(), U = 0; U < $.length; U++)
                A = $[U], A.noOfChildren = A.getNoOfChildren();
            }, P.prototype.calcGrid = function(A) {
              var $ = 0, U = 0;
              $ = parseInt(Math.ceil((A.getRight() - A.getLeft()) / this.repulsionRange)), U = parseInt(Math.ceil((A.getBottom() - A.getTop()) / this.repulsionRange));
              for (var J = new Array($), ne = 0; ne < $; ne++)
                J[ne] = new Array(U);
              for (var ne = 0; ne < $; ne++)
                for (var le = 0; le < U; le++)
                  J[ne][le] = new Array();
              return J;
            }, P.prototype.addNodeToGrid = function(A, $, U) {
              var J = 0, ne = 0, le = 0, j = 0;
              J = parseInt(Math.floor((A.getRect().x - $) / this.repulsionRange)), ne = parseInt(Math.floor((A.getRect().width + A.getRect().x - $) / this.repulsionRange)), le = parseInt(Math.floor((A.getRect().y - U) / this.repulsionRange)), j = parseInt(Math.floor((A.getRect().height + A.getRect().y - U) / this.repulsionRange));
              for (var ee = J; ee <= ne; ee++)
                for (var H = le; H <= j; H++)
                  this.grid[ee][H].push(A), A.setGridCoordinates(J, ne, le, j);
            }, P.prototype.updateGrid = function() {
              var A, $, U = this.getAllNodes();
              for (this.grid = this.calcGrid(this.graphManager.getRoot()), A = 0; A < U.length; A++)
                $ = U[A], this.addNodeToGrid($, this.graphManager.getRoot().getLeft(), this.graphManager.getRoot().getTop());
            }, P.prototype.calculateRepulsionForceOfANode = function(A, $, U, J) {
              if (this.totalIterations % x.GRID_CALCULATION_CHECK_PERIOD == 1 && U || J) {
                var ne = /* @__PURE__ */ new Set();
                A.surrounding = new Array();
                for (var le, j = this.grid, ee = A.startX - 1; ee < A.finishX + 2; ee++)
                  for (var H = A.startY - 1; H < A.finishY + 2; H++)
                    if (!(ee < 0 || H < 0 || ee >= j.length || H >= j[0].length)) {
                      for (var te = 0; te < j[ee][H].length; te++)
                        if (le = j[ee][H][te], !(A.getOwner() != le.getOwner() || A == le) && !$.has(le) && !ne.has(le)) {
                          var S = Math.abs(A.getCenterX() - le.getCenterX()) - (A.getWidth() / 2 + le.getWidth() / 2), V = Math.abs(A.getCenterY() - le.getCenterY()) - (A.getHeight() / 2 + le.getHeight() / 2);
                          S <= this.repulsionRange && V <= this.repulsionRange && ne.add(le);
                        }
                    }
                A.surrounding = [].concat(C(ne));
              }
              for (ee = 0; ee < A.surrounding.length; ee++)
                this.calcRepulsionForce(A, A.surrounding[ee]);
            }, P.prototype.calcRepulsionRange = function() {
              return 0;
            }, _.exports = P;
          },
          /* 19 */
          /***/
          function(_, fe, Q) {
            var C = Q(1), T = Q(7);
            function x(z, Y, P) {
              C.call(this, z, Y, P), this.idealLength = T.DEFAULT_EDGE_LENGTH;
            }
            x.prototype = Object.create(C.prototype);
            for (var I in C)
              x[I] = C[I];
            _.exports = x;
          },
          /* 20 */
          /***/
          function(_, fe, Q) {
            var C = Q(3);
            function T(I, z, Y, P) {
              C.call(this, I, z, Y, P), this.springForceX = 0, this.springForceY = 0, this.repulsionForceX = 0, this.repulsionForceY = 0, this.gravitationForceX = 0, this.gravitationForceY = 0, this.displacementX = 0, this.displacementY = 0, this.startX = 0, this.finishX = 0, this.startY = 0, this.finishY = 0, this.surrounding = [];
            }
            T.prototype = Object.create(C.prototype);
            for (var x in C)
              T[x] = C[x];
            T.prototype.setGridCoordinates = function(I, z, Y, P) {
              this.startX = I, this.finishX = z, this.startY = Y, this.finishY = P;
            }, _.exports = T;
          },
          /* 21 */
          /***/
          function(_, fe, Q) {
            function C(T, x) {
              this.width = 0, this.height = 0, T !== null && x !== null && (this.height = x, this.width = T);
            }
            C.prototype.getWidth = function() {
              return this.width;
            }, C.prototype.setWidth = function(T) {
              this.width = T;
            }, C.prototype.getHeight = function() {
              return this.height;
            }, C.prototype.setHeight = function(T) {
              this.height = T;
            }, _.exports = C;
          },
          /* 22 */
          /***/
          function(_, fe, Q) {
            var C = Q(14);
            function T() {
              this.map = {}, this.keys = [];
            }
            T.prototype.put = function(x, I) {
              var z = C.createID(x);
              this.contains(z) || (this.map[z] = I, this.keys.push(x));
            }, T.prototype.contains = function(x) {
              return C.createID(x), this.map[x] != null;
            }, T.prototype.get = function(x) {
              var I = C.createID(x);
              return this.map[I];
            }, T.prototype.keySet = function() {
              return this.keys;
            }, _.exports = T;
          },
          /* 23 */
          /***/
          function(_, fe, Q) {
            var C = Q(14);
            function T() {
              this.set = {};
            }
            T.prototype.add = function(x) {
              var I = C.createID(x);
              this.contains(I) || (this.set[I] = x);
            }, T.prototype.remove = function(x) {
              delete this.set[C.createID(x)];
            }, T.prototype.clear = function() {
              this.set = {};
            }, T.prototype.contains = function(x) {
              return this.set[C.createID(x)] == x;
            }, T.prototype.isEmpty = function() {
              return this.size() === 0;
            }, T.prototype.size = function() {
              return Object.keys(this.set).length;
            }, T.prototype.addAllTo = function(x) {
              for (var I = Object.keys(this.set), z = I.length, Y = 0; Y < z; Y++)
                x.push(this.set[I[Y]]);
            }, T.prototype.size = function() {
              return Object.keys(this.set).length;
            }, T.prototype.addAll = function(x) {
              for (var I = x.length, z = 0; z < I; z++) {
                var Y = x[z];
                this.add(Y);
              }
            }, _.exports = T;
          },
          /* 24 */
          /***/
          function(_, fe, Q) {
            var C = function() {
              function z(Y, P) {
                for (var Z = 0; Z < P.length; Z++) {
                  var A = P[Z];
                  A.enumerable = A.enumerable || !1, A.configurable = !0, "value" in A && (A.writable = !0), Object.defineProperty(Y, A.key, A);
                }
              }
              return function(Y, P, Z) {
                return P && z(Y.prototype, P), Z && z(Y, Z), Y;
              };
            }();
            function T(z, Y) {
              if (!(z instanceof Y))
                throw new TypeError("Cannot call a class as a function");
            }
            var x = Q(11), I = function() {
              function z(Y, P) {
                T(this, z), (P !== null || P !== void 0) && (this.compareFunction = this._defaultCompareFunction);
                var Z = void 0;
                Y instanceof x ? Z = Y.size() : Z = Y.length, this._quicksort(Y, 0, Z - 1);
              }
              return C(z, [{
                key: "_quicksort",
                value: function(P, Z, A) {
                  if (Z < A) {
                    var $ = this._partition(P, Z, A);
                    this._quicksort(P, Z, $), this._quicksort(P, $ + 1, A);
                  }
                }
              }, {
                key: "_partition",
                value: function(P, Z, A) {
                  for (var $ = this._get(P, Z), U = Z, J = A; ; ) {
                    for (; this.compareFunction($, this._get(P, J)); )
                      J--;
                    for (; this.compareFunction(this._get(P, U), $); )
                      U++;
                    if (U < J)
                      this._swap(P, U, J), U++, J--;
                    else
                      return J;
                  }
                }
              }, {
                key: "_get",
                value: function(P, Z) {
                  return P instanceof x ? P.get_object_at(Z) : P[Z];
                }
              }, {
                key: "_set",
                value: function(P, Z, A) {
                  P instanceof x ? P.set_object_at(Z, A) : P[Z] = A;
                }
              }, {
                key: "_swap",
                value: function(P, Z, A) {
                  var $ = this._get(P, Z);
                  this._set(P, Z, this._get(P, A)), this._set(P, A, $);
                }
              }, {
                key: "_defaultCompareFunction",
                value: function(P, Z) {
                  return Z > P;
                }
              }]), z;
            }();
            _.exports = I;
          },
          /* 25 */
          /***/
          function(_, fe, Q) {
            var C = function() {
              function I(z, Y) {
                for (var P = 0; P < Y.length; P++) {
                  var Z = Y[P];
                  Z.enumerable = Z.enumerable || !1, Z.configurable = !0, "value" in Z && (Z.writable = !0), Object.defineProperty(z, Z.key, Z);
                }
              }
              return function(z, Y, P) {
                return Y && I(z.prototype, Y), P && I(z, P), z;
              };
            }();
            function T(I, z) {
              if (!(I instanceof z))
                throw new TypeError("Cannot call a class as a function");
            }
            var x = function() {
              function I(z, Y) {
                var P = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 1, Z = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : -1, A = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : -1;
                T(this, I), this.sequence1 = z, this.sequence2 = Y, this.match_score = P, this.mismatch_penalty = Z, this.gap_penalty = A, this.iMax = z.length + 1, this.jMax = Y.length + 1, this.grid = new Array(this.iMax);
                for (var $ = 0; $ < this.iMax; $++) {
                  this.grid[$] = new Array(this.jMax);
                  for (var U = 0; U < this.jMax; U++)
                    this.grid[$][U] = 0;
                }
                this.tracebackGrid = new Array(this.iMax);
                for (var J = 0; J < this.iMax; J++) {
                  this.tracebackGrid[J] = new Array(this.jMax);
                  for (var ne = 0; ne < this.jMax; ne++)
                    this.tracebackGrid[J][ne] = [null, null, null];
                }
                this.alignments = [], this.score = -1, this.computeGrids();
              }
              return C(I, [{
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
                  for (var Y = 1; Y < this.jMax; Y++)
                    this.grid[0][Y] = this.grid[0][Y - 1] + this.gap_penalty, this.tracebackGrid[0][Y] = [!1, !1, !0];
                  for (var P = 1; P < this.iMax; P++)
                    this.grid[P][0] = this.grid[P - 1][0] + this.gap_penalty, this.tracebackGrid[P][0] = [!1, !0, !1];
                  for (var Z = 1; Z < this.iMax; Z++)
                    for (var A = 1; A < this.jMax; A++) {
                      var $ = void 0;
                      this.sequence1[Z - 1] === this.sequence2[A - 1] ? $ = this.grid[Z - 1][A - 1] + this.match_score : $ = this.grid[Z - 1][A - 1] + this.mismatch_penalty;
                      var U = this.grid[Z - 1][A] + this.gap_penalty, J = this.grid[Z][A - 1] + this.gap_penalty, ne = [$, U, J], le = this.arrayAllMaxIndexes(ne);
                      this.grid[Z][A] = ne[le[0]], this.tracebackGrid[Z][A] = [le.includes(0), le.includes(1), le.includes(2)];
                    }
                  this.score = this.grid[this.iMax - 1][this.jMax - 1];
                }
                // Gets all possible valid sequence combinations
              }, {
                key: "alignmentTraceback",
                value: function() {
                  var Y = [];
                  for (Y.push({
                    pos: [this.sequence1.length, this.sequence2.length],
                    seq1: "",
                    seq2: ""
                  }); Y[0]; ) {
                    var P = Y[0], Z = this.tracebackGrid[P.pos[0]][P.pos[1]];
                    Z[0] && Y.push({
                      pos: [P.pos[0] - 1, P.pos[1] - 1],
                      seq1: this.sequence1[P.pos[0] - 1] + P.seq1,
                      seq2: this.sequence2[P.pos[1] - 1] + P.seq2
                    }), Z[1] && Y.push({
                      pos: [P.pos[0] - 1, P.pos[1]],
                      seq1: this.sequence1[P.pos[0] - 1] + P.seq1,
                      seq2: "-" + P.seq2
                    }), Z[2] && Y.push({
                      pos: [P.pos[0], P.pos[1] - 1],
                      seq1: "-" + P.seq1,
                      seq2: this.sequence2[P.pos[1] - 1] + P.seq2
                    }), P.pos[0] === 0 && P.pos[1] === 0 && this.alignments.push({
                      sequence1: P.seq1,
                      sequence2: P.seq2
                    }), Y.shift();
                  }
                  return this.alignments;
                }
                // Helper Functions
              }, {
                key: "getAllIndexes",
                value: function(Y, P) {
                  for (var Z = [], A = -1; (A = Y.indexOf(P, A + 1)) !== -1; )
                    Z.push(A);
                  return Z;
                }
              }, {
                key: "arrayAllMaxIndexes",
                value: function(Y) {
                  return this.getAllIndexes(Y, Math.max.apply(null, Y));
                }
              }]), I;
            }();
            _.exports = x;
          },
          /* 26 */
          /***/
          function(_, fe, Q) {
            var C = function() {
            };
            C.FDLayout = Q(18), C.FDLayoutConstants = Q(7), C.FDLayoutEdge = Q(19), C.FDLayoutNode = Q(20), C.DimensionD = Q(21), C.HashMap = Q(22), C.HashSet = Q(23), C.IGeometry = Q(8), C.IMath = Q(9), C.Integer = Q(10), C.Point = Q(12), C.PointD = Q(4), C.RandomSeed = Q(16), C.RectangleD = Q(13), C.Transform = Q(17), C.UniqueIDGeneretor = Q(14), C.Quicksort = Q(24), C.LinkedList = Q(11), C.LGraphObject = Q(2), C.LGraph = Q(5), C.LEdge = Q(1), C.LGraphManager = Q(6), C.LNode = Q(3), C.Layout = Q(15), C.LayoutConstants = Q(0), C.NeedlemanWunsch = Q(25), _.exports = C;
          },
          /* 27 */
          /***/
          function(_, fe, Q) {
            function C() {
              this.listeners = [];
            }
            var T = C.prototype;
            T.addListener = function(x, I) {
              this.listeners.push({
                event: x,
                callback: I
              });
            }, T.removeListener = function(x, I) {
              for (var z = this.listeners.length; z >= 0; z--) {
                var Y = this.listeners[z];
                Y.event === x && Y.callback === I && this.listeners.splice(z, 1);
              }
            }, T.emit = function(x, I) {
              for (var z = 0; z < this.listeners.length; z++) {
                var Y = this.listeners[z];
                x === Y.event && Y.callback(I);
              }
            }, _.exports = C;
          }
          /******/
        ])
      );
    });
  }(Zi)), Zi.exports;
}
var Ul;
function zp() {
  return Ul || (Ul = 1, function(de, Pe) {
    (function(fe, Q) {
      de.exports = Q(Gp());
    })(Ca, function(_) {
      return (
        /******/
        function(fe) {
          var Q = {};
          function C(T) {
            if (Q[T])
              return Q[T].exports;
            var x = Q[T] = {
              /******/
              i: T,
              /******/
              l: !1,
              /******/
              exports: {}
              /******/
            };
            return fe[T].call(x.exports, x, x.exports, C), x.l = !0, x.exports;
          }
          return C.m = fe, C.c = Q, C.i = function(T) {
            return T;
          }, C.d = function(T, x, I) {
            C.o(T, x) || Object.defineProperty(T, x, {
              /******/
              configurable: !1,
              /******/
              enumerable: !0,
              /******/
              get: I
              /******/
            });
          }, C.n = function(T) {
            var x = T && T.__esModule ? (
              /******/
              function() {
                return T.default;
              }
            ) : (
              /******/
              function() {
                return T;
              }
            );
            return C.d(x, "a", x), x;
          }, C.o = function(T, x) {
            return Object.prototype.hasOwnProperty.call(T, x);
          }, C.p = "", C(C.s = 7);
        }([
          /* 0 */
          /***/
          function(fe, Q) {
            fe.exports = _;
          },
          /* 1 */
          /***/
          function(fe, Q, C) {
            var T = C(0).FDLayoutConstants;
            function x() {
            }
            for (var I in T)
              x[I] = T[I];
            x.DEFAULT_USE_MULTI_LEVEL_SCALING = !1, x.DEFAULT_RADIAL_SEPARATION = T.DEFAULT_EDGE_LENGTH, x.DEFAULT_COMPONENT_SEPERATION = 60, x.TILE = !0, x.TILING_PADDING_VERTICAL = 10, x.TILING_PADDING_HORIZONTAL = 10, x.TREE_REDUCTION_ON_INCREMENTAL = !1, fe.exports = x;
          },
          /* 2 */
          /***/
          function(fe, Q, C) {
            var T = C(0).FDLayoutEdge;
            function x(z, Y, P) {
              T.call(this, z, Y, P);
            }
            x.prototype = Object.create(T.prototype);
            for (var I in T)
              x[I] = T[I];
            fe.exports = x;
          },
          /* 3 */
          /***/
          function(fe, Q, C) {
            var T = C(0).LGraph;
            function x(z, Y, P) {
              T.call(this, z, Y, P);
            }
            x.prototype = Object.create(T.prototype);
            for (var I in T)
              x[I] = T[I];
            fe.exports = x;
          },
          /* 4 */
          /***/
          function(fe, Q, C) {
            var T = C(0).LGraphManager;
            function x(z) {
              T.call(this, z);
            }
            x.prototype = Object.create(T.prototype);
            for (var I in T)
              x[I] = T[I];
            fe.exports = x;
          },
          /* 5 */
          /***/
          function(fe, Q, C) {
            var T = C(0).FDLayoutNode, x = C(0).IMath;
            function I(Y, P, Z, A) {
              T.call(this, Y, P, Z, A);
            }
            I.prototype = Object.create(T.prototype);
            for (var z in T)
              I[z] = T[z];
            I.prototype.move = function() {
              var Y = this.graphManager.getLayout();
              this.displacementX = Y.coolingFactor * (this.springForceX + this.repulsionForceX + this.gravitationForceX) / this.noOfChildren, this.displacementY = Y.coolingFactor * (this.springForceY + this.repulsionForceY + this.gravitationForceY) / this.noOfChildren, Math.abs(this.displacementX) > Y.coolingFactor * Y.maxNodeDisplacement && (this.displacementX = Y.coolingFactor * Y.maxNodeDisplacement * x.sign(this.displacementX)), Math.abs(this.displacementY) > Y.coolingFactor * Y.maxNodeDisplacement && (this.displacementY = Y.coolingFactor * Y.maxNodeDisplacement * x.sign(this.displacementY)), this.child == null ? this.moveBy(this.displacementX, this.displacementY) : this.child.getNodes().length == 0 ? this.moveBy(this.displacementX, this.displacementY) : this.propogateDisplacementToChildren(this.displacementX, this.displacementY), Y.totalDisplacement += Math.abs(this.displacementX) + Math.abs(this.displacementY), this.springForceX = 0, this.springForceY = 0, this.repulsionForceX = 0, this.repulsionForceY = 0, this.gravitationForceX = 0, this.gravitationForceY = 0, this.displacementX = 0, this.displacementY = 0;
            }, I.prototype.propogateDisplacementToChildren = function(Y, P) {
              for (var Z = this.getChild().getNodes(), A, $ = 0; $ < Z.length; $++)
                A = Z[$], A.getChild() == null ? (A.moveBy(Y, P), A.displacementX += Y, A.displacementY += P) : A.propogateDisplacementToChildren(Y, P);
            }, I.prototype.setPred1 = function(Y) {
              this.pred1 = Y;
            }, I.prototype.getPred1 = function() {
              return pred1;
            }, I.prototype.getPred2 = function() {
              return pred2;
            }, I.prototype.setNext = function(Y) {
              this.next = Y;
            }, I.prototype.getNext = function() {
              return next;
            }, I.prototype.setProcessed = function(Y) {
              this.processed = Y;
            }, I.prototype.isProcessed = function() {
              return processed;
            }, fe.exports = I;
          },
          /* 6 */
          /***/
          function(fe, Q, C) {
            var T = C(0).FDLayout, x = C(4), I = C(3), z = C(5), Y = C(2), P = C(1), Z = C(0).FDLayoutConstants, A = C(0).LayoutConstants, $ = C(0).Point, U = C(0).PointD, J = C(0).Layout, ne = C(0).Integer, le = C(0).IGeometry, j = C(0).LGraph, ee = C(0).Transform;
            function H() {
              T.call(this), this.toBeTiled = {};
            }
            H.prototype = Object.create(T.prototype);
            for (var te in T)
              H[te] = T[te];
            H.prototype.newGraphManager = function() {
              var S = new x(this);
              return this.graphManager = S, S;
            }, H.prototype.newGraph = function(S) {
              return new I(null, this.graphManager, S);
            }, H.prototype.newNode = function(S) {
              return new z(this.graphManager, S);
            }, H.prototype.newEdge = function(S) {
              return new Y(null, null, S);
            }, H.prototype.initParameters = function() {
              T.prototype.initParameters.call(this, arguments), this.isSubLayout || (P.DEFAULT_EDGE_LENGTH < 10 ? this.idealEdgeLength = 10 : this.idealEdgeLength = P.DEFAULT_EDGE_LENGTH, this.useSmartIdealEdgeLengthCalculation = P.DEFAULT_USE_SMART_IDEAL_EDGE_LENGTH_CALCULATION, this.springConstant = Z.DEFAULT_SPRING_STRENGTH, this.repulsionConstant = Z.DEFAULT_REPULSION_STRENGTH, this.gravityConstant = Z.DEFAULT_GRAVITY_STRENGTH, this.compoundGravityConstant = Z.DEFAULT_COMPOUND_GRAVITY_STRENGTH, this.gravityRangeFactor = Z.DEFAULT_GRAVITY_RANGE_FACTOR, this.compoundGravityRangeFactor = Z.DEFAULT_COMPOUND_GRAVITY_RANGE_FACTOR, this.prunedNodesAll = [], this.growTreeIterations = 0, this.afterGrowthIterations = 0, this.isTreeGrowing = !1, this.isGrowthFinished = !1, this.coolingCycle = 0, this.maxCoolingCycle = this.maxIterations / Z.CONVERGENCE_CHECK_PERIOD, this.finalTemperature = Z.CONVERGENCE_CHECK_PERIOD / this.maxIterations, this.coolingAdjuster = 1);
            }, H.prototype.layout = function() {
              var S = A.DEFAULT_CREATE_BENDS_AS_NEEDED;
              return S && (this.createBendpoints(), this.graphManager.resetAllEdges()), this.level = 0, this.classicLayout();
            }, H.prototype.classicLayout = function() {
              if (this.nodesWithGravity = this.calculateNodesToApplyGravitationTo(), this.graphManager.setAllNodesToApplyGravitation(this.nodesWithGravity), this.calcNoOfChildrenForAllNodes(), this.graphManager.calcLowestCommonAncestors(), this.graphManager.calcInclusionTreeDepths(), this.graphManager.getRoot().calcEstimatedSize(), this.calcIdealEdgeLengths(), this.incremental) {
                if (P.TREE_REDUCTION_ON_INCREMENTAL) {
                  this.reduceTrees(), this.graphManager.resetAllNodesToApplyGravitation();
                  var V = new Set(this.getAllNodes()), R = this.nodesWithGravity.filter(function(pe) {
                    return V.has(pe);
                  });
                  this.graphManager.setAllNodesToApplyGravitation(R);
                }
              } else {
                var S = this.getFlatForest();
                if (S.length > 0)
                  this.positionNodesRadially(S);
                else {
                  this.reduceTrees(), this.graphManager.resetAllNodesToApplyGravitation();
                  var V = new Set(this.getAllNodes()), R = this.nodesWithGravity.filter(function(q) {
                    return V.has(q);
                  });
                  this.graphManager.setAllNodesToApplyGravitation(R), this.positionNodesRandomly();
                }
              }
              return this.initSpringEmbedder(), this.runSpringEmbedder(), !0;
            }, H.prototype.tick = function() {
              if (this.totalIterations++, this.totalIterations === this.maxIterations && !this.isTreeGrowing && !this.isGrowthFinished)
                if (this.prunedNodesAll.length > 0)
                  this.isTreeGrowing = !0;
                else
                  return !0;
              if (this.totalIterations % Z.CONVERGENCE_CHECK_PERIOD == 0 && !this.isTreeGrowing && !this.isGrowthFinished) {
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
                    var S = new Set(this.getAllNodes()), V = this.nodesWithGravity.filter(function(ve) {
                      return S.has(ve);
                    });
                    this.graphManager.setAllNodesToApplyGravitation(V), this.graphManager.updateBounds(), this.updateGrid(), this.coolingFactor = Z.DEFAULT_COOLING_FACTOR_INCREMENTAL;
                  } else
                    this.isTreeGrowing = !1, this.isGrowthFinished = !0;
                this.growTreeIterations++;
              }
              if (this.isGrowthFinished) {
                if (this.isConverged())
                  return !0;
                this.afterGrowthIterations % 10 == 0 && (this.graphManager.updateBounds(), this.updateGrid()), this.coolingFactor = Z.DEFAULT_COOLING_FACTOR_INCREMENTAL * ((100 - this.afterGrowthIterations) / 100), this.afterGrowthIterations++;
              }
              var R = !this.isTreeGrowing && !this.isGrowthFinished, q = this.growTreeIterations % 10 == 1 && this.isTreeGrowing || this.afterGrowthIterations % 10 == 1 && this.isGrowthFinished;
              return this.totalDisplacement = 0, this.graphManager.updateBounds(), this.calcSpringForces(), this.calcRepulsionForces(R, q), this.calcGravitationalForces(), this.moveNodes(), this.animate(), !1;
            }, H.prototype.getPositionsData = function() {
              for (var S = this.graphManager.getAllNodes(), V = {}, R = 0; R < S.length; R++) {
                var q = S[R].rect, ve = S[R].id;
                V[ve] = {
                  id: ve,
                  x: q.getCenterX(),
                  y: q.getCenterY(),
                  w: q.width,
                  h: q.height
                };
              }
              return V;
            }, H.prototype.runSpringEmbedder = function() {
              this.initialAnimationPeriod = 25, this.animationPeriod = this.initialAnimationPeriod;
              var S = !1;
              if (Z.ANIMATE === "during")
                this.emit("layoutstarted");
              else {
                for (; !S; )
                  S = this.tick();
                this.graphManager.updateBounds();
              }
            }, H.prototype.calculateNodesToApplyGravitationTo = function() {
              var S = [], V, R = this.graphManager.getGraphs(), q = R.length, ve;
              for (ve = 0; ve < q; ve++)
                V = R[ve], V.updateConnected(), V.isConnected || (S = S.concat(V.getNodes()));
              return S;
            }, H.prototype.createBendpoints = function() {
              var S = [];
              S = S.concat(this.graphManager.getAllEdges());
              var V = /* @__PURE__ */ new Set(), R;
              for (R = 0; R < S.length; R++) {
                var q = S[R];
                if (!V.has(q)) {
                  var ve = q.getSource(), pe = q.getTarget();
                  if (ve == pe)
                    q.getBendpoints().push(new U()), q.getBendpoints().push(new U()), this.createDummyNodesForBendpoints(q), V.add(q);
                  else {
                    var Ae = [];
                    if (Ae = Ae.concat(ve.getEdgeListToNode(pe)), Ae = Ae.concat(pe.getEdgeListToNode(ve)), !V.has(Ae[0])) {
                      if (Ae.length > 1) {
                        var Ne;
                        for (Ne = 0; Ne < Ae.length; Ne++) {
                          var Ye = Ae[Ne];
                          Ye.getBendpoints().push(new U()), this.createDummyNodesForBendpoints(Ye);
                        }
                      }
                      Ae.forEach(function(at) {
                        V.add(at);
                      });
                    }
                  }
                }
                if (V.size == S.length)
                  break;
              }
            }, H.prototype.positionNodesRadially = function(S) {
              for (var V = new $(0, 0), R = Math.ceil(Math.sqrt(S.length)), q = 0, ve = 0, pe = 0, Ae = new U(0, 0), Ne = 0; Ne < S.length; Ne++) {
                Ne % R == 0 && (pe = 0, ve = q, Ne != 0 && (ve += P.DEFAULT_COMPONENT_SEPERATION), q = 0);
                var Ye = S[Ne], at = J.findCenterOfTree(Ye);
                V.x = pe, V.y = ve, Ae = H.radialLayout(Ye, at, V), Ae.y > q && (q = Math.floor(Ae.y)), pe = Math.floor(Ae.x + P.DEFAULT_COMPONENT_SEPERATION);
              }
              this.transform(new U(A.WORLD_CENTER_X - Ae.x / 2, A.WORLD_CENTER_Y - Ae.y / 2));
            }, H.radialLayout = function(S, V, R) {
              var q = Math.max(this.maxDiagonalInTree(S), P.DEFAULT_RADIAL_SEPARATION);
              H.branchRadialLayout(V, null, 0, 359, 0, q);
              var ve = j.calculateBounds(S), pe = new ee();
              pe.setDeviceOrgX(ve.getMinX()), pe.setDeviceOrgY(ve.getMinY()), pe.setWorldOrgX(R.x), pe.setWorldOrgY(R.y);
              for (var Ae = 0; Ae < S.length; Ae++) {
                var Ne = S[Ae];
                Ne.transform(pe);
              }
              var Ye = new U(ve.getMaxX(), ve.getMaxY());
              return pe.inverseTransformPoint(Ye);
            }, H.branchRadialLayout = function(S, V, R, q, ve, pe) {
              var Ae = (q - R + 1) / 2;
              Ae < 0 && (Ae += 180);
              var Ne = (Ae + R) % 360, Ye = Ne * le.TWO_PI / 360, at = ve * Math.cos(Ye), dt = ve * Math.sin(Ye);
              S.setCenter(at, dt);
              var Re = [];
              Re = Re.concat(S.getEdges());
              var Ve = Re.length;
              V != null && Ve--;
              for (var Ze = 0, nt = Re.length, ht, it = S.getEdgesBetween(V); it.length > 1; ) {
                var tt = it[0];
                it.splice(0, 1);
                var yt = Re.indexOf(tt);
                yt >= 0 && Re.splice(yt, 1), nt--, Ve--;
              }
              V != null ? ht = (Re.indexOf(it[0]) + 1) % nt : ht = 0;
              for (var Et = Math.abs(q - R) / Ve, Pt = ht; Ze != Ve; Pt = ++Pt % nt) {
                var gt = Re[Pt].getOtherEnd(S);
                if (gt != V) {
                  var dr = (R + Ze * Et) % 360, qt = (dr + Et) % 360;
                  H.branchRadialLayout(gt, S, dr, qt, ve + pe, pe), Ze++;
                }
              }
            }, H.maxDiagonalInTree = function(S) {
              for (var V = ne.MIN_VALUE, R = 0; R < S.length; R++) {
                var q = S[R], ve = q.getDiagonal();
                ve > V && (V = ve);
              }
              return V;
            }, H.prototype.calcRepulsionRange = function() {
              return 2 * (this.level + 1) * this.idealEdgeLength;
            }, H.prototype.groupZeroDegreeMembers = function() {
              var S = this, V = {};
              this.memberGroups = {}, this.idToDummyNode = {};
              for (var R = [], q = this.graphManager.getAllNodes(), ve = 0; ve < q.length; ve++) {
                var pe = q[ve], Ae = pe.getParent();
                this.getNodeDegreeWithChildren(pe) === 0 && (Ae.id == null || !this.getToBeTiled(Ae)) && R.push(pe);
              }
              for (var ve = 0; ve < R.length; ve++) {
                var pe = R[ve], Ne = pe.getParent().id;
                typeof V[Ne] > "u" && (V[Ne] = []), V[Ne] = V[Ne].concat(pe);
              }
              Object.keys(V).forEach(function(Ye) {
                if (V[Ye].length > 1) {
                  var at = "DummyCompound_" + Ye;
                  S.memberGroups[at] = V[Ye];
                  var dt = V[Ye][0].getParent(), Re = new z(S.graphManager);
                  Re.id = at, Re.paddingLeft = dt.paddingLeft || 0, Re.paddingRight = dt.paddingRight || 0, Re.paddingBottom = dt.paddingBottom || 0, Re.paddingTop = dt.paddingTop || 0, S.idToDummyNode[at] = Re;
                  var Ve = S.getGraphManager().add(S.newGraph(), Re), Ze = dt.getChild();
                  Ze.add(Re);
                  for (var nt = 0; nt < V[Ye].length; nt++) {
                    var ht = V[Ye][nt];
                    Ze.remove(ht), Ve.add(ht);
                  }
                }
              });
            }, H.prototype.clearCompounds = function() {
              var S = {}, V = {};
              this.performDFSOnCompounds();
              for (var R = 0; R < this.compoundOrder.length; R++)
                V[this.compoundOrder[R].id] = this.compoundOrder[R], S[this.compoundOrder[R].id] = [].concat(this.compoundOrder[R].getChild().getNodes()), this.graphManager.remove(this.compoundOrder[R].getChild()), this.compoundOrder[R].child = null;
              this.graphManager.resetAllNodes(), this.tileCompoundMembers(S, V);
            }, H.prototype.clearZeroDegreeMembers = function() {
              var S = this, V = this.tiledZeroDegreePack = [];
              Object.keys(this.memberGroups).forEach(function(R) {
                var q = S.idToDummyNode[R];
                V[R] = S.tileNodes(S.memberGroups[R], q.paddingLeft + q.paddingRight), q.rect.width = V[R].width, q.rect.height = V[R].height;
              });
            }, H.prototype.repopulateCompounds = function() {
              for (var S = this.compoundOrder.length - 1; S >= 0; S--) {
                var V = this.compoundOrder[S], R = V.id, q = V.paddingLeft, ve = V.paddingTop;
                this.adjustLocations(this.tiledMemberPack[R], V.rect.x, V.rect.y, q, ve);
              }
            }, H.prototype.repopulateZeroDegreeMembers = function() {
              var S = this, V = this.tiledZeroDegreePack;
              Object.keys(V).forEach(function(R) {
                var q = S.idToDummyNode[R], ve = q.paddingLeft, pe = q.paddingTop;
                S.adjustLocations(V[R], q.rect.x, q.rect.y, ve, pe);
              });
            }, H.prototype.getToBeTiled = function(S) {
              var V = S.id;
              if (this.toBeTiled[V] != null)
                return this.toBeTiled[V];
              var R = S.getChild();
              if (R == null)
                return this.toBeTiled[V] = !1, !1;
              for (var q = R.getNodes(), ve = 0; ve < q.length; ve++) {
                var pe = q[ve];
                if (this.getNodeDegree(pe) > 0)
                  return this.toBeTiled[V] = !1, !1;
                if (pe.getChild() == null) {
                  this.toBeTiled[pe.id] = !1;
                  continue;
                }
                if (!this.getToBeTiled(pe))
                  return this.toBeTiled[V] = !1, !1;
              }
              return this.toBeTiled[V] = !0, !0;
            }, H.prototype.getNodeDegree = function(S) {
              S.id;
              for (var V = S.getEdges(), R = 0, q = 0; q < V.length; q++) {
                var ve = V[q];
                ve.getSource().id !== ve.getTarget().id && (R = R + 1);
              }
              return R;
            }, H.prototype.getNodeDegreeWithChildren = function(S) {
              var V = this.getNodeDegree(S);
              if (S.getChild() == null)
                return V;
              for (var R = S.getChild().getNodes(), q = 0; q < R.length; q++) {
                var ve = R[q];
                V += this.getNodeDegreeWithChildren(ve);
              }
              return V;
            }, H.prototype.performDFSOnCompounds = function() {
              this.compoundOrder = [], this.fillCompexOrderByDFS(this.graphManager.getRoot().getNodes());
            }, H.prototype.fillCompexOrderByDFS = function(S) {
              for (var V = 0; V < S.length; V++) {
                var R = S[V];
                R.getChild() != null && this.fillCompexOrderByDFS(R.getChild().getNodes()), this.getToBeTiled(R) && this.compoundOrder.push(R);
              }
            }, H.prototype.adjustLocations = function(S, V, R, q, ve) {
              V += q, R += ve;
              for (var pe = V, Ae = 0; Ae < S.rows.length; Ae++) {
                var Ne = S.rows[Ae];
                V = pe;
                for (var Ye = 0, at = 0; at < Ne.length; at++) {
                  var dt = Ne[at];
                  dt.rect.x = V, dt.rect.y = R, V += dt.rect.width + S.horizontalPadding, dt.rect.height > Ye && (Ye = dt.rect.height);
                }
                R += Ye + S.verticalPadding;
              }
            }, H.prototype.tileCompoundMembers = function(S, V) {
              var R = this;
              this.tiledMemberPack = [], Object.keys(S).forEach(function(q) {
                var ve = V[q];
                R.tiledMemberPack[q] = R.tileNodes(S[q], ve.paddingLeft + ve.paddingRight), ve.rect.width = R.tiledMemberPack[q].width, ve.rect.height = R.tiledMemberPack[q].height;
              });
            }, H.prototype.tileNodes = function(S, V) {
              var R = P.TILING_PADDING_VERTICAL, q = P.TILING_PADDING_HORIZONTAL, ve = {
                rows: [],
                rowWidth: [],
                rowHeight: [],
                width: 0,
                height: V,
                // assume minHeight equals to minWidth
                verticalPadding: R,
                horizontalPadding: q
              };
              S.sort(function(Ne, Ye) {
                return Ne.rect.width * Ne.rect.height > Ye.rect.width * Ye.rect.height ? -1 : Ne.rect.width * Ne.rect.height < Ye.rect.width * Ye.rect.height ? 1 : 0;
              });
              for (var pe = 0; pe < S.length; pe++) {
                var Ae = S[pe];
                ve.rows.length == 0 ? this.insertNodeToRow(ve, Ae, 0, V) : this.canAddHorizontal(ve, Ae.rect.width, Ae.rect.height) ? this.insertNodeToRow(ve, Ae, this.getShortestRowIndex(ve), V) : this.insertNodeToRow(ve, Ae, ve.rows.length, V), this.shiftToLastRow(ve);
              }
              return ve;
            }, H.prototype.insertNodeToRow = function(S, V, R, q) {
              var ve = q;
              if (R == S.rows.length) {
                var pe = [];
                S.rows.push(pe), S.rowWidth.push(ve), S.rowHeight.push(0);
              }
              var Ae = S.rowWidth[R] + V.rect.width;
              S.rows[R].length > 0 && (Ae += S.horizontalPadding), S.rowWidth[R] = Ae, S.width < Ae && (S.width = Ae);
              var Ne = V.rect.height;
              R > 0 && (Ne += S.verticalPadding);
              var Ye = 0;
              Ne > S.rowHeight[R] && (Ye = S.rowHeight[R], S.rowHeight[R] = Ne, Ye = S.rowHeight[R] - Ye), S.height += Ye, S.rows[R].push(V);
            }, H.prototype.getShortestRowIndex = function(S) {
              for (var V = -1, R = Number.MAX_VALUE, q = 0; q < S.rows.length; q++)
                S.rowWidth[q] < R && (V = q, R = S.rowWidth[q]);
              return V;
            }, H.prototype.getLongestRowIndex = function(S) {
              for (var V = -1, R = Number.MIN_VALUE, q = 0; q < S.rows.length; q++)
                S.rowWidth[q] > R && (V = q, R = S.rowWidth[q]);
              return V;
            }, H.prototype.canAddHorizontal = function(S, V, R) {
              var q = this.getShortestRowIndex(S);
              if (q < 0)
                return !0;
              var ve = S.rowWidth[q];
              if (ve + S.horizontalPadding + V <= S.width)
                return !0;
              var pe = 0;
              S.rowHeight[q] < R && q > 0 && (pe = R + S.verticalPadding - S.rowHeight[q]);
              var Ae;
              S.width - ve >= V + S.horizontalPadding ? Ae = (S.height + pe) / (ve + V + S.horizontalPadding) : Ae = (S.height + pe) / S.width, pe = R + S.verticalPadding;
              var Ne;
              return S.width < V ? Ne = (S.height + pe) / V : Ne = (S.height + pe) / S.width, Ne < 1 && (Ne = 1 / Ne), Ae < 1 && (Ae = 1 / Ae), Ae < Ne;
            }, H.prototype.shiftToLastRow = function(S) {
              var V = this.getLongestRowIndex(S), R = S.rowWidth.length - 1, q = S.rows[V], ve = q[q.length - 1], pe = ve.width + S.horizontalPadding;
              if (S.width - S.rowWidth[R] > pe && V != R) {
                q.splice(-1, 1), S.rows[R].push(ve), S.rowWidth[V] = S.rowWidth[V] - pe, S.rowWidth[R] = S.rowWidth[R] + pe, S.width = S.rowWidth[instance.getLongestRowIndex(S)];
                for (var Ae = Number.MIN_VALUE, Ne = 0; Ne < q.length; Ne++)
                  q[Ne].height > Ae && (Ae = q[Ne].height);
                V > 0 && (Ae += S.verticalPadding);
                var Ye = S.rowHeight[V] + S.rowHeight[R];
                S.rowHeight[V] = Ae, S.rowHeight[R] < ve.height + S.verticalPadding && (S.rowHeight[R] = ve.height + S.verticalPadding);
                var at = S.rowHeight[V] + S.rowHeight[R];
                S.height += at - Ye, this.shiftToLastRow(S);
              }
            }, H.prototype.tilingPreLayout = function() {
              P.TILE && (this.groupZeroDegreeMembers(), this.clearCompounds(), this.clearZeroDegreeMembers());
            }, H.prototype.tilingPostLayout = function() {
              P.TILE && (this.repopulateZeroDegreeMembers(), this.repopulateCompounds());
            }, H.prototype.reduceTrees = function() {
              for (var S = [], V = !0, R; V; ) {
                var q = this.graphManager.getAllNodes(), ve = [];
                V = !1;
                for (var pe = 0; pe < q.length; pe++)
                  R = q[pe], R.getEdges().length == 1 && !R.getEdges()[0].isInterGraph && R.getChild() == null && (ve.push([R, R.getEdges()[0], R.getOwner()]), V = !0);
                if (V == !0) {
                  for (var Ae = [], Ne = 0; Ne < ve.length; Ne++)
                    ve[Ne][0].getEdges().length == 1 && (Ae.push(ve[Ne]), ve[Ne][0].getOwner().remove(ve[Ne][0]));
                  S.push(Ae), this.graphManager.resetAllNodes(), this.graphManager.resetAllEdges();
                }
              }
              this.prunedNodesAll = S;
            }, H.prototype.growTree = function(S) {
              for (var V = S.length, R = S[V - 1], q, ve = 0; ve < R.length; ve++)
                q = R[ve], this.findPlaceforPrunedNode(q), q[2].add(q[0]), q[2].add(q[1], q[1].source, q[1].target);
              S.splice(S.length - 1, 1), this.graphManager.resetAllNodes(), this.graphManager.resetAllEdges();
            }, H.prototype.findPlaceforPrunedNode = function(S) {
              var V, R, q = S[0];
              q == S[1].source ? R = S[1].target : R = S[1].source;
              var ve = R.startX, pe = R.finishX, Ae = R.startY, Ne = R.finishY, Ye = 0, at = 0, dt = 0, Re = 0, Ve = [Ye, dt, at, Re];
              if (Ae > 0)
                for (var Ze = ve; Ze <= pe; Ze++)
                  Ve[0] += this.grid[Ze][Ae - 1].length + this.grid[Ze][Ae].length - 1;
              if (pe < this.grid.length - 1)
                for (var Ze = Ae; Ze <= Ne; Ze++)
                  Ve[1] += this.grid[pe + 1][Ze].length + this.grid[pe][Ze].length - 1;
              if (Ne < this.grid[0].length - 1)
                for (var Ze = ve; Ze <= pe; Ze++)
                  Ve[2] += this.grid[Ze][Ne + 1].length + this.grid[Ze][Ne].length - 1;
              if (ve > 0)
                for (var Ze = Ae; Ze <= Ne; Ze++)
                  Ve[3] += this.grid[ve - 1][Ze].length + this.grid[ve][Ze].length - 1;
              for (var nt = ne.MAX_VALUE, ht, it, tt = 0; tt < Ve.length; tt++)
                Ve[tt] < nt ? (nt = Ve[tt], ht = 1, it = tt) : Ve[tt] == nt && ht++;
              if (ht == 3 && nt == 0)
                Ve[0] == 0 && Ve[1] == 0 && Ve[2] == 0 ? V = 1 : Ve[0] == 0 && Ve[1] == 0 && Ve[3] == 0 ? V = 0 : Ve[0] == 0 && Ve[2] == 0 && Ve[3] == 0 ? V = 3 : Ve[1] == 0 && Ve[2] == 0 && Ve[3] == 0 && (V = 2);
              else if (ht == 2 && nt == 0) {
                var yt = Math.floor(Math.random() * 2);
                Ve[0] == 0 && Ve[1] == 0 ? yt == 0 ? V = 0 : V = 1 : Ve[0] == 0 && Ve[2] == 0 ? yt == 0 ? V = 0 : V = 2 : Ve[0] == 0 && Ve[3] == 0 ? yt == 0 ? V = 0 : V = 3 : Ve[1] == 0 && Ve[2] == 0 ? yt == 0 ? V = 1 : V = 2 : Ve[1] == 0 && Ve[3] == 0 ? yt == 0 ? V = 1 : V = 3 : yt == 0 ? V = 2 : V = 3;
              } else if (ht == 4 && nt == 0) {
                var yt = Math.floor(Math.random() * 4);
                V = yt;
              } else
                V = it;
              V == 0 ? q.setCenter(R.getCenterX(), R.getCenterY() - R.getHeight() / 2 - Z.DEFAULT_EDGE_LENGTH - q.getHeight() / 2) : V == 1 ? q.setCenter(R.getCenterX() + R.getWidth() / 2 + Z.DEFAULT_EDGE_LENGTH + q.getWidth() / 2, R.getCenterY()) : V == 2 ? q.setCenter(R.getCenterX(), R.getCenterY() + R.getHeight() / 2 + Z.DEFAULT_EDGE_LENGTH + q.getHeight() / 2) : q.setCenter(R.getCenterX() - R.getWidth() / 2 - Z.DEFAULT_EDGE_LENGTH - q.getWidth() / 2, R.getCenterY());
            }, fe.exports = H;
          },
          /* 7 */
          /***/
          function(fe, Q, C) {
            var T = {};
            T.layoutBase = C(0), T.CoSEConstants = C(1), T.CoSEEdge = C(2), T.CoSEGraph = C(3), T.CoSEGraphManager = C(4), T.CoSELayout = C(6), T.CoSENode = C(5), fe.exports = T;
          }
          /******/
        ])
      );
    });
  }(Ki)), Ki.exports;
}
(function(de, Pe) {
  (function(fe, Q) {
    de.exports = Q(zp());
  })(Ca, function(_) {
    return (
      /******/
      function(fe) {
        var Q = {};
        function C(T) {
          if (Q[T])
            return Q[T].exports;
          var x = Q[T] = {
            /******/
            i: T,
            /******/
            l: !1,
            /******/
            exports: {}
            /******/
          };
          return fe[T].call(x.exports, x, x.exports, C), x.l = !0, x.exports;
        }
        return C.m = fe, C.c = Q, C.i = function(T) {
          return T;
        }, C.d = function(T, x, I) {
          C.o(T, x) || Object.defineProperty(T, x, {
            /******/
            configurable: !1,
            /******/
            enumerable: !0,
            /******/
            get: I
            /******/
          });
        }, C.n = function(T) {
          var x = T && T.__esModule ? (
            /******/
            function() {
              return T.default;
            }
          ) : (
            /******/
            function() {
              return T;
            }
          );
          return C.d(x, "a", x), x;
        }, C.o = function(T, x) {
          return Object.prototype.hasOwnProperty.call(T, x);
        }, C.p = "", C(C.s = 1);
      }([
        /* 0 */
        /***/
        function(fe, Q) {
          fe.exports = _;
        },
        /* 1 */
        /***/
        function(fe, Q, C) {
          var T = C(0).layoutBase.LayoutConstants, x = C(0).layoutBase.FDLayoutConstants, I = C(0).CoSEConstants, z = C(0).CoSELayout, Y = C(0).CoSENode, P = C(0).layoutBase.PointD, Z = C(0).layoutBase.DimensionD, A = {
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
          function $(le, j) {
            var ee = {};
            for (var H in le)
              ee[H] = le[H];
            for (var H in j)
              ee[H] = j[H];
            return ee;
          }
          function U(le) {
            this.options = $(A, le), J(this.options);
          }
          var J = function(j) {
            j.nodeRepulsion != null && (I.DEFAULT_REPULSION_STRENGTH = x.DEFAULT_REPULSION_STRENGTH = j.nodeRepulsion), j.idealEdgeLength != null && (I.DEFAULT_EDGE_LENGTH = x.DEFAULT_EDGE_LENGTH = j.idealEdgeLength), j.edgeElasticity != null && (I.DEFAULT_SPRING_STRENGTH = x.DEFAULT_SPRING_STRENGTH = j.edgeElasticity), j.nestingFactor != null && (I.PER_LEVEL_IDEAL_EDGE_LENGTH_FACTOR = x.PER_LEVEL_IDEAL_EDGE_LENGTH_FACTOR = j.nestingFactor), j.gravity != null && (I.DEFAULT_GRAVITY_STRENGTH = x.DEFAULT_GRAVITY_STRENGTH = j.gravity), j.numIter != null && (I.MAX_ITERATIONS = x.MAX_ITERATIONS = j.numIter), j.gravityRange != null && (I.DEFAULT_GRAVITY_RANGE_FACTOR = x.DEFAULT_GRAVITY_RANGE_FACTOR = j.gravityRange), j.gravityCompound != null && (I.DEFAULT_COMPOUND_GRAVITY_STRENGTH = x.DEFAULT_COMPOUND_GRAVITY_STRENGTH = j.gravityCompound), j.gravityRangeCompound != null && (I.DEFAULT_COMPOUND_GRAVITY_RANGE_FACTOR = x.DEFAULT_COMPOUND_GRAVITY_RANGE_FACTOR = j.gravityRangeCompound), j.initialEnergyOnIncremental != null && (I.DEFAULT_COOLING_FACTOR_INCREMENTAL = x.DEFAULT_COOLING_FACTOR_INCREMENTAL = j.initialEnergyOnIncremental), j.quality == "draft" ? T.QUALITY = 0 : j.quality == "proof" ? T.QUALITY = 2 : T.QUALITY = 1, I.NODE_DIMENSIONS_INCLUDE_LABELS = x.NODE_DIMENSIONS_INCLUDE_LABELS = T.NODE_DIMENSIONS_INCLUDE_LABELS = j.nodeDimensionsIncludeLabels, I.DEFAULT_INCREMENTAL = x.DEFAULT_INCREMENTAL = T.DEFAULT_INCREMENTAL = !j.randomize, I.ANIMATE = x.ANIMATE = T.ANIMATE = j.animate, I.TILE = j.tile, I.TILING_PADDING_VERTICAL = typeof j.tilingPaddingVertical == "function" ? j.tilingPaddingVertical.call() : j.tilingPaddingVertical, I.TILING_PADDING_HORIZONTAL = typeof j.tilingPaddingHorizontal == "function" ? j.tilingPaddingHorizontal.call() : j.tilingPaddingHorizontal;
          };
          U.prototype.run = function() {
            var le, j, ee = this.options;
            this.idToLNode = {};
            var H = this.layout = new z(), te = this;
            te.stopped = !1, this.cy = this.options.cy, this.cy.trigger({ type: "layoutstart", layout: this });
            var S = H.newGraphManager();
            this.gm = S;
            var V = this.options.eles.nodes(), R = this.options.eles.edges();
            this.root = S.addRoot(), this.processChildrenList(this.root, this.getTopMostNodes(V), H);
            for (var q = 0; q < R.length; q++) {
              var ve = R[q], pe = this.idToLNode[ve.data("source")], Ae = this.idToLNode[ve.data("target")];
              if (pe !== Ae && pe.getEdgesBetween(Ae).length == 0) {
                var Ne = S.add(H.newEdge(), pe, Ae);
                Ne.id = ve.id();
              }
            }
            var Ye = function(Re, Ve) {
              typeof Re == "number" && (Re = Ve);
              var Ze = Re.data("id"), nt = te.idToLNode[Ze];
              return {
                x: nt.getRect().getCenterX(),
                y: nt.getRect().getCenterY()
              };
            }, at = function dt() {
              for (var Re = function() {
                ee.fit && ee.cy.fit(ee.eles, ee.padding), le || (le = !0, te.cy.one("layoutready", ee.ready), te.cy.trigger({ type: "layoutready", layout: te }));
              }, Ve = te.options.refresh, Ze, nt = 0; nt < Ve && !Ze; nt++)
                Ze = te.stopped || te.layout.tick();
              if (Ze) {
                H.checkLayoutSuccess() && !H.isSubLayout && H.doPostLayout(), H.tilingPostLayout && H.tilingPostLayout(), H.isLayoutFinished = !0, te.options.eles.nodes().positions(Ye), Re(), te.cy.one("layoutstop", te.options.stop), te.cy.trigger({ type: "layoutstop", layout: te }), j && cancelAnimationFrame(j), le = !1;
                return;
              }
              var ht = te.layout.getPositionsData();
              ee.eles.nodes().positions(function(it, tt) {
                if (typeof it == "number" && (it = tt), !it.isParent()) {
                  for (var yt = it.id(), Et = ht[yt], Pt = it; Et == null && (Et = ht[Pt.data("parent")] || ht["DummyCompound_" + Pt.data("parent")], ht[yt] = Et, Pt = Pt.parent()[0], Pt != null); )
                    ;
                  return Et != null ? {
                    x: Et.x,
                    y: Et.y
                  } : {
                    x: it.position("x"),
                    y: it.position("y")
                  };
                }
              }), Re(), j = requestAnimationFrame(dt);
            };
            return H.addListener("layoutstarted", function() {
              te.options.animate === "during" && (j = requestAnimationFrame(at));
            }), H.runLayout(), this.options.animate !== "during" && (te.options.eles.nodes().not(":parent").layoutPositions(te, te.options, Ye), le = !1), this;
          }, U.prototype.getTopMostNodes = function(le) {
            for (var j = {}, ee = 0; ee < le.length; ee++)
              j[le[ee].id()] = !0;
            var H = le.filter(function(te, S) {
              typeof te == "number" && (te = S);
              for (var V = te.parent()[0]; V != null; ) {
                if (j[V.id()])
                  return !1;
                V = V.parent()[0];
              }
              return !0;
            });
            return H;
          }, U.prototype.processChildrenList = function(le, j, ee) {
            for (var H = j.length, te = 0; te < H; te++) {
              var S = j[te], V = S.children(), R, q = S.layoutDimensions({
                nodeDimensionsIncludeLabels: this.options.nodeDimensionsIncludeLabels
              });
              if (S.outerWidth() != null && S.outerHeight() != null ? R = le.add(new Y(ee.graphManager, new P(S.position("x") - q.w / 2, S.position("y") - q.h / 2), new Z(parseFloat(q.w), parseFloat(q.h)))) : R = le.add(new Y(this.graphManager)), R.id = S.data("id"), R.paddingLeft = parseInt(S.css("padding")), R.paddingTop = parseInt(S.css("padding")), R.paddingRight = parseInt(S.css("padding")), R.paddingBottom = parseInt(S.css("padding")), this.options.nodeDimensionsIncludeLabels && S.isParent()) {
                var ve = S.boundingBox({ includeLabels: !0, includeNodes: !1 }).w, pe = S.boundingBox({ includeLabels: !0, includeNodes: !1 }).h, Ae = S.css("text-halign");
                R.labelWidth = ve, R.labelHeight = pe, R.labelPos = Ae;
              }
              if (this.idToLNode[S.data("id")] = R, isNaN(R.rect.x) && (R.rect.x = 0), isNaN(R.rect.y) && (R.rect.y = 0), V != null && V.length > 0) {
                var Ne;
                Ne = ee.getGraphManager().add(ee.newGraph(), R), this.processChildrenList(Ne, V, ee);
              }
            }
          }, U.prototype.stop = function() {
            return this.stopped = !0, this;
          };
          var ne = function(j) {
            j("layout", "cose-bilkent", U);
          };
          typeof cytoscape < "u" && ne(cytoscape), fe.exports = ne;
        }
        /******/
      ])
    );
  });
})(Xl);
var Vp = Xl.exports;
const Up = /* @__PURE__ */ $l(Vp), $p = 12, _p = function(de, Pe, _, fe) {
  Pe.append("path").attr("id", "node-" + _.id).attr("class", "node-bkg node-" + de.type2Str(_.type)).attr(
    "d",
    `M0 ${_.height - 5} v${-_.height + 2 * 5} q0,-5 5,-5 h${_.width - 2 * 5} q5,0 5,5 v${_.height - 5} H0 Z`
  ), Pe.append("line").attr("class", "node-line-" + fe).attr("x1", 0).attr("y1", _.height).attr("x2", _.width).attr("y2", _.height);
}, Yp = function(de, Pe, _) {
  Pe.append("rect").attr("id", "node-" + _.id).attr("class", "node-bkg node-" + de.type2Str(_.type)).attr("height", _.height).attr("width", _.width);
}, Hp = function(de, Pe, _) {
  const fe = _.width, Q = _.height, C = 0.15 * fe, T = 0.25 * fe, x = 0.35 * fe, I = 0.2 * fe;
  Pe.append("path").attr("id", "node-" + _.id).attr("class", "node-bkg node-" + de.type2Str(_.type)).attr(
    "d",
    `M0 0 a${C},${C} 0 0,1 ${fe * 0.25},${-1 * fe * 0.1}
      a${x},${x} 1 0,1 ${fe * 0.4},${-1 * fe * 0.1}
      a${T},${T} 1 0,1 ${fe * 0.35},${1 * fe * 0.2}

      a${C},${C} 1 0,1 ${fe * 0.15},${1 * Q * 0.35}
      a${I},${I} 1 0,1 ${-1 * fe * 0.15},${1 * Q * 0.65}

      a${T},${C} 1 0,1 ${-1 * fe * 0.25},${fe * 0.15}
      a${x},${x} 1 0,1 ${-1 * fe * 0.5},0
      a${C},${C} 1 0,1 ${-1 * fe * 0.25},${-1 * fe * 0.15}

      a${C},${C} 1 0,1 ${-1 * fe * 0.1},${-1 * Q * 0.35}
      a${I},${I} 1 0,1 ${fe * 0.1},${-1 * Q * 0.65}

    H0 V0 Z`
  );
}, Xp = function(de, Pe, _) {
  const fe = _.width, Q = _.height, C = 0.15 * fe;
  Pe.append("path").attr("id", "node-" + _.id).attr("class", "node-bkg node-" + de.type2Str(_.type)).attr(
    "d",
    `M0 0 a${C},${C} 1 0,0 ${fe * 0.25},${-1 * Q * 0.1}
      a${C},${C} 1 0,0 ${fe * 0.25},0
      a${C},${C} 1 0,0 ${fe * 0.25},0
      a${C},${C} 1 0,0 ${fe * 0.25},${1 * Q * 0.1}

      a${C},${C} 1 0,0 ${fe * 0.15},${1 * Q * 0.33}
      a${C * 0.8},${C * 0.8} 1 0,0 0,${1 * Q * 0.34}
      a${C},${C} 1 0,0 ${-1 * fe * 0.15},${1 * Q * 0.33}

      a${C},${C} 1 0,0 ${-1 * fe * 0.25},${Q * 0.15}
      a${C},${C} 1 0,0 ${-1 * fe * 0.25},0
      a${C},${C} 1 0,0 ${-1 * fe * 0.25},0
      a${C},${C} 1 0,0 ${-1 * fe * 0.25},${-1 * Q * 0.15}

      a${C},${C} 1 0,0 ${-1 * fe * 0.1},${-1 * Q * 0.33}
      a${C * 0.8},${C * 0.8} 1 0,0 0,${-1 * Q * 0.34}
      a${C},${C} 1 0,0 ${fe * 0.1},${-1 * Q * 0.33}

    H0 V0 Z`
  );
}, Wp = function(de, Pe, _) {
  Pe.append("circle").attr("id", "node-" + _.id).attr("class", "node-bkg node-" + de.type2Str(_.type)).attr("r", _.width / 2);
};
function qp(de, Pe, _, fe, Q) {
  return de.insert("polygon", ":first-child").attr(
    "points",
    fe.map(function(C) {
      return C.x + "," + C.y;
    }).join(" ")
  ).attr("transform", "translate(" + (Q.width - Pe) / 2 + ", " + _ + ")");
}
const Kp = function(de, Pe, _) {
  const fe = _.height, C = fe / 4, T = _.width - _.padding + 2 * C, x = [
    { x: C, y: 0 },
    { x: T - C, y: 0 },
    { x: T, y: -fe / 2 },
    { x: T - C, y: -fe },
    { x: C, y: -fe },
    { x: 0, y: -fe / 2 }
  ];
  qp(Pe, T, fe, x, _);
}, Zp = function(de, Pe, _) {
  Pe.append("rect").attr("id", "node-" + _.id).attr("class", "node-bkg node-" + de.type2Str(_.type)).attr("height", _.height).attr("rx", _.padding).attr("ry", _.padding).attr("width", _.width);
}, Qp = function(de, Pe, _, fe, Q) {
  const C = Q.htmlLabels, T = fe % ($p - 1), x = Pe.append("g");
  _.section = T;
  let I = "section-" + T;
  T < 0 && (I += " section-root"), x.attr("class", (_.class ? _.class + " " : "") + "mindmap-node " + I);
  const z = x.append("g"), Y = x.append("g"), P = _.descr.replace(/(<br\/*>)/g, `
`);
  Tp(Y, P, {
    useHtmlLabels: C,
    width: _.width,
    classes: "mindmap-node-label"
  }), C || Y.attr("dy", "1em").attr("alignment-baseline", "middle").attr("dominant-baseline", "middle").attr("text-anchor", "middle");
  const Z = Y.node().getBBox(), [A] = pp(Q.fontSize);
  if (_.height = Z.height + A * 1.1 * 0.5 + _.padding, _.width = Z.width + 2 * _.padding, _.icon)
    if (_.type === de.nodeType.CIRCLE)
      _.height += 50, _.width += 50, x.append("foreignObject").attr("height", "50px").attr("width", _.width).attr("style", "text-align: center;").append("div").attr("class", "icon-container").append("i").attr("class", "node-icon-" + T + " " + _.icon), Y.attr(
        "transform",
        "translate(" + _.width / 2 + ", " + (_.height / 2 - 1.5 * _.padding) + ")"
      );
    else {
      _.width += 50;
      const $ = _.height;
      _.height = Math.max($, 60);
      const U = Math.abs(_.height - $);
      x.append("foreignObject").attr("width", "60px").attr("height", _.height).attr("style", "text-align: center;margin-top:" + U / 2 + "px;").append("div").attr("class", "icon-container").append("i").attr("class", "node-icon-" + T + " " + _.icon), Y.attr(
        "transform",
        "translate(" + (25 + _.width / 2) + ", " + (U / 2 + _.padding / 2) + ")"
      );
    }
  else if (C) {
    const $ = (_.width - Z.width) / 2, U = (_.height - Z.height) / 2;
    Y.attr("transform", "translate(" + $ + ", " + U + ")");
  } else {
    const $ = _.width / 2, U = _.padding / 2;
    Y.attr("transform", "translate(" + $ + ", " + U + ")");
  }
  switch (_.type) {
    case de.nodeType.DEFAULT:
      _p(de, z, _, T);
      break;
    case de.nodeType.ROUNDED_RECT:
      Zp(de, z, _);
      break;
    case de.nodeType.RECT:
      Yp(de, z, _);
      break;
    case de.nodeType.CIRCLE:
      z.attr("transform", "translate(" + _.width / 2 + ", " + +_.height / 2 + ")"), Wp(de, z, _);
      break;
    case de.nodeType.CLOUD:
      Hp(de, z, _);
      break;
    case de.nodeType.BANG:
      Xp(de, z, _);
      break;
    case de.nodeType.HEXAGON:
      Kp(de, z, _);
      break;
  }
  return de.setElementForId(_.id, x), _.height;
}, Jp = function(de, Pe) {
  const _ = de.getElementById(Pe.id), fe = Pe.x || 0, Q = Pe.y || 0;
  _.attr("transform", "translate(" + fe + "," + Q + ")");
};
Hl.use(Up);
function Wl(de, Pe, _, fe, Q) {
  Qp(de, Pe, _, fe, Q), _.children && _.children.forEach((C, T) => {
    Wl(de, Pe, C, fe < 0 ? T : fe, Q);
  });
}
function jp(de, Pe) {
  Pe.edges().map((_, fe) => {
    const Q = _.data();
    if (_[0]._private.bodyBounds) {
      const C = _[0]._private.rscratch;
      qr.trace("Edge: ", fe, Q), de.insert("path").attr(
        "d",
        `M ${C.startX},${C.startY} L ${C.midX},${C.midY} L${C.endX},${C.endY} `
      ).attr("class", "edge section-edge-" + Q.section + " edge-depth-" + Q.depth);
    }
  });
}
function ql(de, Pe, _, fe) {
  Pe.add({
    group: "nodes",
    data: {
      id: de.id.toString(),
      labelText: de.descr,
      height: de.height,
      width: de.width,
      level: fe,
      nodeId: de.id,
      padding: de.padding,
      type: de.type
    },
    position: {
      x: de.x,
      y: de.y
    }
  }), de.children && de.children.forEach((Q) => {
    ql(Q, Pe, _, fe + 1), Pe.add({
      group: "edges",
      data: {
        id: `${de.id}_${Q.id}`,
        source: de.id,
        target: Q.id,
        depth: fe,
        section: Q.section
      }
    });
  });
}
function ey(de, Pe) {
  return new Promise((_) => {
    const fe = bp("body").append("div").attr("id", "cy").attr("style", "display:none"), Q = Hl({
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
    fe.remove(), ql(de, Q, Pe, 0), Q.nodes().forEach(function(C) {
      C.layoutDimensions = () => {
        const T = C.data();
        return { w: T.width, h: T.height };
      };
    }), Q.layout({
      name: "cose-bilkent",
      // @ts-ignore Types for cose-bilkent are not correct?
      quality: "proof",
      styleEnabled: !1,
      animate: !1
    }).run(), Q.ready((C) => {
      qr.info("Ready", C), _(Q);
    });
  });
}
function ty(de, Pe) {
  Pe.nodes().map((_, fe) => {
    const Q = _.data();
    Q.x = _.position().x, Q.y = _.position().y, Jp(de, Q);
    const C = de.getElementById(Q.nodeId);
    qr.info("Id:", fe, "Position: (", _.position().x, ", ", _.position().y, ")", Q), C.attr(
      "transform",
      `translate(${_.position().x - Q.width / 2}, ${_.position().y - Q.height / 2})`
    ), C.attr("attr", `apa-${fe})`);
  });
}
const ry = async (de, Pe, _, fe) => {
  var P, Z;
  qr.debug(`Rendering mindmap diagram
` + de);
  const Q = fe.db, C = Q.getMindmap();
  if (!C)
    return;
  const T = Ji();
  T.htmlLabels = !1;
  const x = yp(Pe), I = x.append("g");
  I.attr("class", "mindmap-edges");
  const z = x.append("g");
  z.attr("class", "mindmap-nodes"), Wl(Q, z, C, -1, T);
  const Y = await ey(C, T);
  jp(I, Y), ty(Q, Y), mp(
    void 0,
    x,
    ((P = T.mindmap) == null ? void 0 : P.padding) ?? ti.mindmap.padding,
    ((Z = T.mindmap) == null ? void 0 : Z.useMaxWidth) ?? ti.mindmap.useMaxWidth
  );
}, ay = {
  draw: ry
}, ny = (de) => {
  let Pe = "";
  for (let _ = 0; _ < de.THEME_COLOR_LIMIT; _++)
    de["lineColor" + _] = de["lineColor" + _] || de["cScaleInv" + _], Ep(de["lineColor" + _]) ? de["lineColor" + _] = wp(de["lineColor" + _], 20) : de["lineColor" + _] = xp(de["lineColor" + _], 20);
  for (let _ = 0; _ < de.THEME_COLOR_LIMIT; _++) {
    const fe = "" + (17 - 3 * _);
    Pe += `
    .section-${_ - 1} rect, .section-${_ - 1} path, .section-${_ - 1} circle, .section-${_ - 1} polygon, .section-${_ - 1} path  {
      fill: ${de["cScale" + _]};
    }
    .section-${_ - 1} text {
     fill: ${de["cScaleLabel" + _]};
    }
    .node-icon-${_ - 1} {
      font-size: 40px;
      color: ${de["cScaleLabel" + _]};
    }
    .section-edge-${_ - 1}{
      stroke: ${de["cScale" + _]};
    }
    .edge-depth-${_ - 1}{
      stroke-width: ${fe};
    }
    .section-${_ - 1} line {
      stroke: ${de["cScaleInv" + _]} ;
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
  return Pe;
}, iy = (de) => `
  .edge {
    stroke-width: 3;
  }
  ${ny(de)}
  .section-root rect, .section-root path, .section-root circle, .section-root polygon  {
    fill: ${de.git0};
  }
  .section-root text {
    fill: ${de.gitBranchLabel0};
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
  .mindmap-node-label {
    dy: 1em;
    alignment-baseline: middle;
    text-anchor: middle;
    dominant-baseline: middle;
    text-align: center;
  }
`, sy = iy, uy = {
  db: Bp,
  renderer: ay,
  parser: Cp,
  styles: sy
};
export {
  uy as diagram
};
