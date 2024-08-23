import {
  random,
  utils_default
} from "./chunk-54IALGMX.mjs";
import "./chunk-GKOISANM.mjs";
import "./chunk-HD3LK5B5.mjs";
import {
  clear,
  common_default,
  getAccDescription,
  getAccTitle,
  getConfig2 as getConfig,
  getDiagramTitle,
  log,
  select_default,
  setAccDescription,
  setAccTitle,
  setDiagramTitle,
  setupGraphViewbox2 as setupGraphViewbox
} from "./chunk-DD37ZF33.mjs";
import {
  __name
} from "./chunk-DLQEHMXD.mjs";

// src/diagrams/git/parser/gitGraph.jison
var parser = function() {
  var o = /* @__PURE__ */ __name(function(k, v, o2, l) {
    for (o2 = o2 || {}, l = k.length; l--; o2[k[l]] = v) ;
    return o2;
  }, "o"), $V0 = [1, 3], $V1 = [1, 6], $V2 = [1, 4], $V3 = [1, 5], $V4 = [2, 5], $V5 = [1, 12], $V6 = [5, 7, 13, 19, 21, 23, 24, 26, 28, 31, 36, 39, 48], $V7 = [7, 13, 19, 21, 23, 24, 26, 28, 31, 36, 39], $V8 = [7, 12, 13, 19, 21, 23, 24, 26, 28, 31, 36, 39], $V9 = [7, 13, 48], $Va = [1, 42], $Vb = [1, 41], $Vc = [1, 49], $Vd = [7, 13, 29, 32, 37, 45, 48], $Ve = [1, 57], $Vf = [1, 59], $Vg = [1, 60], $Vh = [1, 61], $Vi = [7, 13, 32, 41, 45, 48], $Vj = [7, 13, 32, 34, 37, 41, 45, 48];
  var parser2 = {
    trace: /* @__PURE__ */ __name(function trace() {
    }, "trace"),
    yy: {},
    symbols_: { "error": 2, "start": 3, "eol": 4, "GG": 5, "document": 6, "EOF": 7, ":": 8, "DIR": 9, "options": 10, "body": 11, "OPT": 12, "NL": 13, "line": 14, "statement": 15, "commitStatement": 16, "mergeStatement": 17, "cherryPickStatement": 18, "acc_title": 19, "acc_title_value": 20, "acc_descr": 21, "acc_descr_value": 22, "acc_descr_multiline_value": 23, "section": 24, "branchStatement": 25, "CHECKOUT": 26, "ref": 27, "BRANCH": 28, "ORDER": 29, "NUM": 30, "CHERRY_PICK": 31, "COMMIT_ID": 32, "STR": 33, "PARENT_COMMIT": 34, "commitTags": 35, "MERGE": 36, "COMMIT_TYPE": 37, "commitType": 38, "COMMIT": 39, "commit_arg": 40, "COMMIT_MSG": 41, "NORMAL": 42, "REVERSE": 43, "HIGHLIGHT": 44, "COMMIT_TAG": 45, "EMPTYSTR": 46, "ID": 47, ";": 48, "$accept": 0, "$end": 1 },
    terminals_: { 2: "error", 5: "GG", 7: "EOF", 8: ":", 9: "DIR", 12: "OPT", 13: "NL", 19: "acc_title", 20: "acc_title_value", 21: "acc_descr", 22: "acc_descr_value", 23: "acc_descr_multiline_value", 24: "section", 26: "CHECKOUT", 28: "BRANCH", 29: "ORDER", 30: "NUM", 31: "CHERRY_PICK", 32: "COMMIT_ID", 33: "STR", 34: "PARENT_COMMIT", 36: "MERGE", 37: "COMMIT_TYPE", 39: "COMMIT", 41: "COMMIT_MSG", 42: "NORMAL", 43: "REVERSE", 44: "HIGHLIGHT", 45: "COMMIT_TAG", 46: "EMPTYSTR", 47: "ID", 48: ";" },
    productions_: [0, [3, 2], [3, 3], [3, 4], [3, 5], [6, 0], [6, 2], [10, 2], [10, 1], [11, 0], [11, 2], [14, 2], [14, 1], [15, 1], [15, 1], [15, 1], [15, 2], [15, 2], [15, 1], [15, 1], [15, 1], [15, 2], [25, 2], [25, 4], [18, 3], [18, 5], [18, 4], [18, 6], [18, 6], [18, 4], [18, 6], [17, 2], [17, 4], [17, 4], [17, 3], [17, 5], [17, 5], [17, 5], [17, 6], [17, 5], [17, 6], [17, 7], [17, 7], [17, 7], [17, 7], [17, 7], [17, 7], [16, 2], [16, 2], [16, 3], [16, 4], [16, 4], [16, 3], [16, 4], [16, 4], [16, 5], [16, 5], [16, 6], [16, 6], [16, 6], [16, 6], [16, 6], [16, 6], [16, 3], [16, 4], [16, 4], [16, 5], [16, 5], [16, 5], [16, 5], [16, 6], [16, 6], [16, 6], [16, 6], [16, 6], [16, 6], [16, 7], [16, 7], [16, 7], [16, 7], [16, 7], [16, 7], [16, 6], [16, 6], [16, 6], [16, 6], [16, 6], [16, 6], [16, 8], [16, 8], [16, 8], [16, 8], [16, 8], [16, 8], [16, 8], [16, 8], [16, 8], [16, 8], [16, 8], [16, 8], [16, 8], [16, 8], [16, 8], [16, 8], [16, 8], [16, 8], [16, 8], [16, 8], [16, 8], [16, 8], [16, 8], [16, 8], [40, 0], [40, 1], [38, 1], [38, 1], [38, 1], [35, 2], [35, 2], [35, 3], [35, 3], [27, 1], [27, 1], [4, 1], [4, 1], [4, 1]],
    performAction: /* @__PURE__ */ __name(function anonymous(yytext, yyleng, yylineno, yy, yystate, $$, _$) {
      var $0 = $$.length - 1;
      switch (yystate) {
        case 2:
          return $$[$0];
          break;
        case 3:
          return $$[$0 - 1];
          break;
        case 4:
          yy.setDirection($$[$0 - 3]);
          return $$[$0 - 1];
          break;
        case 6:
          yy.setOptions($$[$0 - 1]);
          this.$ = $$[$0];
          break;
        case 7:
          $$[$0 - 1] += $$[$0];
          this.$ = $$[$0 - 1];
          break;
        case 9:
          this.$ = [];
          break;
        case 10:
          $$[$0 - 1].push($$[$0]);
          this.$ = $$[$0 - 1];
          break;
        case 11:
          this.$ = $$[$0 - 1];
          break;
        case 16:
          this.$ = $$[$0].trim();
          yy.setAccTitle(this.$);
          break;
        case 17:
        case 18:
          this.$ = $$[$0].trim();
          yy.setAccDescription(this.$);
          break;
        case 19:
          yy.addSection($$[$0].substr(8));
          this.$ = $$[$0].substr(8);
          break;
        case 21:
          yy.checkout($$[$0]);
          break;
        case 22:
          yy.branch($$[$0]);
          break;
        case 23:
          yy.branch($$[$0 - 2], $$[$0]);
          break;
        case 24:
          yy.cherryPick($$[$0], "", void 0);
          break;
        case 25:
          yy.cherryPick($$[$0 - 2], "", void 0, $$[$0]);
          break;
        case 26:
          yy.cherryPick($$[$0 - 1], "", $$[$0]);
          break;
        case 27:
          yy.cherryPick($$[$0 - 3], "", $$[$0], $$[$0 - 1]);
          break;
        case 28:
          yy.cherryPick($$[$0 - 3], "", $$[$0 - 2], $$[$0]);
          break;
        case 29:
          yy.cherryPick($$[$0], "", $$[$0 - 2]);
          break;
        case 30:
          yy.cherryPick($$[$0 - 2], "", $$[$0 - 4], $$[$0]);
          break;
        case 31:
          yy.merge($$[$0], "", "", void 0);
          break;
        case 32:
          yy.merge($$[$0 - 2], $$[$0], "", void 0);
          break;
        case 33:
          yy.merge($$[$0 - 2], "", $$[$0], void 0);
          break;
        case 34:
          yy.merge($$[$0 - 1], "", "", $$[$0]);
          break;
        case 35:
          yy.merge($$[$0 - 3], $$[$0], "", $$[$0 - 2]);
          break;
        case 36:
          yy.merge($$[$0 - 3], "", $$[$0], $$[$0 - 2]);
          break;
        case 37:
          yy.merge($$[$0 - 3], "", $$[$0 - 1], $$[$0]);
          break;
        case 38:
          yy.merge($$[$0 - 4], $$[$0 - 2], $$[$0], void 0);
          break;
        case 39:
          yy.merge($$[$0 - 3], $$[$0 - 1], "", $$[$0]);
          break;
        case 40:
          yy.merge($$[$0 - 4], $$[$0], $$[$0 - 2], void 0);
          break;
        case 41:
          yy.merge($$[$0 - 5], $$[$0 - 3], $$[$0 - 1], $$[$0]);
          break;
        case 42:
          yy.merge($$[$0 - 5], $$[$0], $$[$0 - 3], $$[$0 - 2]);
          break;
        case 43:
          yy.merge($$[$0 - 5], $$[$0 - 3], $$[$0], $$[$0 - 2]);
          break;
        case 44:
          yy.merge($$[$0 - 5], $$[$0 - 1], $$[$0 - 3], $$[$0]);
          break;
        case 45:
          yy.merge($$[$0 - 5], $$[$0], $$[$0 - 2], $$[$0 - 4]);
          break;
        case 46:
          yy.merge($$[$0 - 5], $$[$0 - 2], $$[$0], $$[$0 - 4]);
          break;
        case 47:
          yy.commit($$[$0]);
          break;
        case 48:
          yy.commit("", "", yy.commitType.NORMAL, $$[$0]);
          break;
        case 49:
          yy.commit("", "", $$[$0], void 0);
          break;
        case 50:
          yy.commit("", "", $$[$0], $$[$0 - 2]);
          break;
        case 51:
          yy.commit("", "", $$[$0 - 1], $$[$0]);
          break;
        case 52:
          yy.commit("", $$[$0], yy.commitType.NORMAL, void 0);
          break;
        case 53:
          yy.commit("", $$[$0 - 1], yy.commitType.NORMAL, $$[$0]);
          break;
        case 54:
          yy.commit("", $$[$0], yy.commitType.NORMAL, $$[$0 - 2]);
          break;
        case 55:
          yy.commit("", $$[$0 - 2], $$[$0], void 0);
          break;
        case 56:
          yy.commit("", $$[$0], $$[$0 - 2], void 0);
          break;
        case 57:
          yy.commit("", $$[$0 - 3], $$[$0 - 1], $$[$0]);
          break;
        case 58:
          yy.commit("", $$[$0 - 3], $$[$0], $$[$0 - 2]);
          break;
        case 59:
          yy.commit("", $$[$0 - 1], $$[$0 - 3], $$[$0]);
          break;
        case 60:
          yy.commit("", $$[$0], $$[$0 - 3], $$[$0 - 2]);
          break;
        case 61:
          yy.commit("", $$[$0], $$[$0 - 2], $$[$0 - 4]);
          break;
        case 62:
          yy.commit("", $$[$0 - 2], $$[$0], $$[$0 - 4]);
          break;
        case 63:
          yy.commit($$[$0], "", yy.commitType.NORMAL, void 0);
          break;
        case 64:
          yy.commit($$[$0], "", yy.commitType.NORMAL, $$[$0 - 2]);
          break;
        case 65:
          yy.commit($$[$0 - 1], "", yy.commitType.NORMAL, $$[$0]);
          break;
        case 66:
          yy.commit($$[$0 - 2], "", $$[$0], void 0);
          break;
        case 67:
          yy.commit($$[$0], "", $$[$0 - 2], void 0);
          break;
        case 68:
          yy.commit($$[$0], $$[$0 - 2], yy.commitType.NORMAL, void 0);
          break;
        case 69:
          yy.commit($$[$0 - 2], $$[$0], yy.commitType.NORMAL, void 0);
          break;
        case 70:
          yy.commit($$[$0 - 3], "", $$[$0 - 1], $$[$0]);
          break;
        case 71:
          yy.commit($$[$0 - 3], "", $$[$0], $$[$0 - 2]);
          break;
        case 72:
          yy.commit($$[$0 - 1], "", $$[$0 - 3], $$[$0]);
          break;
        case 73:
          yy.commit($$[$0], "", $$[$0 - 3], $$[$0 - 2]);
          break;
        case 74:
          yy.commit($$[$0], "", $$[$0 - 2], $$[$0 - 4]);
          break;
        case 75:
          yy.commit($$[$0 - 2], "", $$[$0], $$[$0 - 4]);
          break;
        case 76:
          yy.commit($$[$0 - 4], $$[$0], $$[$0 - 2], void 0);
          break;
        case 77:
          yy.commit($$[$0 - 4], $$[$0 - 2], $$[$0], void 0);
          break;
        case 78:
          yy.commit($$[$0 - 2], $$[$0], $$[$0 - 4], void 0);
          break;
        case 79:
          yy.commit($$[$0], $$[$0 - 2], $$[$0 - 4], void 0);
          break;
        case 80:
          yy.commit($$[$0], $$[$0 - 4], $$[$0 - 2], void 0);
          break;
        case 81:
          yy.commit($$[$0 - 2], $$[$0 - 4], $$[$0], void 0);
          break;
        case 82:
          yy.commit($$[$0 - 3], $$[$0], yy.commitType.NORMAL, $$[$0 - 2]);
          break;
        case 83:
          yy.commit($$[$0 - 3], $$[$0 - 1], yy.commitType.NORMAL, $$[$0]);
          break;
        case 84:
          yy.commit($$[$0 - 2], $$[$0], yy.commitType.NORMAL, $$[$0 - 4]);
          break;
        case 85:
          yy.commit($$[$0], $$[$0 - 2], yy.commitType.NORMAL, $$[$0 - 4]);
          break;
        case 86:
          yy.commit($$[$0], $$[$0 - 3], yy.commitType.NORMAL, $$[$0 - 2]);
          break;
        case 87:
          yy.commit($$[$0 - 1], $$[$0 - 3], yy.commitType.NORMAL, $$[$0]);
          break;
        case 88:
          yy.commit($$[$0 - 5], $$[$0 - 3], $$[$0 - 1], $$[$0]);
          break;
        case 89:
          yy.commit($$[$0 - 5], $$[$0 - 3], $$[$0], $$[$0 - 2]);
          break;
        case 90:
          yy.commit($$[$0 - 5], $$[$0 - 1], $$[$0 - 3], $$[$0]);
          break;
        case 91:
          yy.commit($$[$0 - 5], $$[$0], $$[$0 - 3], $$[$0 - 2]);
          break;
        case 92:
          yy.commit($$[$0 - 5], $$[$0 - 2], $$[$0], $$[$0 - 4]);
          break;
        case 93:
          yy.commit($$[$0 - 5], $$[$0], $$[$0 - 2], $$[$0 - 4]);
          break;
        case 94:
          yy.commit($$[$0 - 3], $$[$0 - 5], $$[$0 - 1], $$[$0]);
          break;
        case 95:
          yy.commit($$[$0 - 3], $$[$0 - 5], $$[$0], $$[$0 - 2]);
          break;
        case 96:
          yy.commit($$[$0 - 1], $$[$0 - 5], $$[$0 - 3], $$[$0]);
          break;
        case 97:
          yy.commit($$[$0], $$[$0 - 5], $$[$0 - 3], $$[$0 - 2]);
          break;
        case 98:
          yy.commit($$[$0 - 2], $$[$0 - 5], $$[$0], $$[$0 - 4]);
          break;
        case 99:
          yy.commit($$[$0], $$[$0 - 5], $$[$0 - 2], $$[$0 - 4]);
          break;
        case 100:
          yy.commit($$[$0], $$[$0 - 4], $$[$0 - 2], $$[$0 - 6]);
          break;
        case 101:
          yy.commit($$[$0 - 2], $$[$0 - 4], $$[$0], $$[$0 - 6]);
          break;
        case 102:
          yy.commit($$[$0], $$[$0 - 2], $$[$0 - 4], $$[$0 - 6]);
          break;
        case 103:
          yy.commit($$[$0 - 2], $$[$0], $$[$0 - 4], $$[$0 - 6]);
          break;
        case 104:
          yy.commit($$[$0 - 4], $$[$0 - 2], $$[$0], $$[$0 - 6]);
          break;
        case 105:
          yy.commit($$[$0 - 4], $$[$0], $$[$0 - 2], $$[$0 - 6]);
          break;
        case 106:
          yy.commit($$[$0 - 1], $$[$0 - 3], $$[$0 - 5], $$[$0]);
          break;
        case 107:
          yy.commit($$[$0], $$[$0 - 3], $$[$0 - 5], $$[$0 - 2]);
          break;
        case 108:
          yy.commit($$[$0 - 2], $$[$0], $$[$0 - 5], $$[$0 - 4]);
          break;
        case 109:
          yy.commit($$[$0], $$[$0 - 2], $$[$0 - 5], $$[$0 - 4]);
          break;
        case 110:
          yy.commit($$[$0 - 3], $$[$0 - 1], $$[$0 - 5], $$[$0]);
          break;
        case 111:
          yy.commit($$[$0 - 3], $$[$0], $$[$0 - 5], $$[$0 - 2]);
          break;
        case 112:
          this.$ = "";
          break;
        case 113:
          this.$ = $$[$0];
          break;
        case 114:
          this.$ = yy.commitType.NORMAL;
          break;
        case 115:
          this.$ = yy.commitType.REVERSE;
          break;
        case 116:
          this.$ = yy.commitType.HIGHLIGHT;
          break;
        case 117:
          this.$ = [$$[$0]];
          break;
        case 118:
          this.$ = [""];
          break;
        case 119:
          $$[$0 - 2].push($$[$0]);
          this.$ = $$[$0 - 2];
          break;
        case 120:
          $$[$0 - 2].push("");
          this.$ = $$[$0 - 2];
          break;
      }
    }, "anonymous"),
    table: [{ 3: 1, 4: 2, 5: $V0, 7: $V1, 13: $V2, 48: $V3 }, { 1: [3] }, { 3: 7, 4: 2, 5: $V0, 7: $V1, 13: $V2, 48: $V3 }, { 6: 8, 7: $V4, 8: [1, 9], 9: [1, 10], 10: 11, 13: $V5 }, o($V6, [2, 123]), o($V6, [2, 124]), o($V6, [2, 125]), { 1: [2, 1] }, { 7: [1, 13] }, { 6: 14, 7: $V4, 10: 11, 13: $V5 }, { 8: [1, 15] }, o($V7, [2, 9], { 11: 16, 12: [1, 17] }), o($V8, [2, 8]), { 1: [2, 2] }, { 7: [1, 18] }, { 6: 19, 7: $V4, 10: 11, 13: $V5 }, { 7: [2, 6], 13: [1, 22], 14: 20, 15: 21, 16: 23, 17: 24, 18: 25, 19: [1, 26], 21: [1, 27], 23: [1, 28], 24: [1, 29], 25: 30, 26: [1, 31], 28: [1, 35], 31: [1, 34], 36: [1, 33], 39: [1, 32] }, o($V8, [2, 7]), { 1: [2, 3] }, { 7: [1, 36] }, o($V7, [2, 10]), { 4: 37, 7: $V1, 13: $V2, 48: $V3 }, o($V7, [2, 12]), o($V9, [2, 13]), o($V9, [2, 14]), o($V9, [2, 15]), { 20: [1, 38] }, { 22: [1, 39] }, o($V9, [2, 18]), o($V9, [2, 19]), o($V9, [2, 20]), { 27: 40, 33: $Va, 47: $Vb }, o($V9, [2, 112], { 40: 43, 35: 44, 32: [1, 46], 33: [1, 48], 37: [1, 45], 41: [1, 47], 45: $Vc }), { 27: 50, 33: $Va, 47: $Vb }, { 32: [1, 51], 35: 52, 45: $Vc }, { 27: 53, 33: $Va, 47: $Vb }, { 1: [2, 4] }, o($V7, [2, 11]), o($V9, [2, 16]), o($V9, [2, 17]), o($V9, [2, 21]), o($Vd, [2, 121]), o($Vd, [2, 122]), o($V9, [2, 47]), o($V9, [2, 48], { 32: [1, 55], 37: [1, 54], 41: [1, 56], 45: $Ve }), { 38: 58, 42: $Vf, 43: $Vg, 44: $Vh }, { 33: [1, 62] }, { 33: [1, 63] }, o($V9, [2, 113]), { 33: [1, 64], 46: [1, 65] }, o($V9, [2, 31], { 35: 68, 32: [1, 66], 37: [1, 67], 45: $Vc }), { 33: [1, 69] }, { 32: [1, 70], 45: $Ve }, o($V9, [2, 22], { 29: [1, 71] }), { 38: 72, 42: $Vf, 43: $Vg, 44: $Vh }, { 33: [1, 73] }, { 33: [1, 74] }, { 33: [1, 75], 46: [1, 76] }, o($V9, [2, 49], { 35: 77, 32: [1, 78], 41: [1, 79], 45: $Vc }), o($Vi, [2, 114]), o($Vi, [2, 115]), o($Vi, [2, 116]), o($V9, [2, 52], { 35: 80, 37: [1, 81], 41: [1, 82], 45: $Vc }), o($V9, [2, 63], { 35: 83, 32: [1, 85], 37: [1, 84], 45: $Vc }), o($Vj, [2, 117]), o($Vj, [2, 118]), { 33: [1, 86] }, { 38: 87, 42: $Vf, 43: $Vg, 44: $Vh }, o($V9, [2, 34], { 32: [1, 88], 37: [1, 89], 45: $Ve }), o($V9, [2, 24], { 35: 91, 34: [1, 90], 45: $Vc }), { 33: [1, 92] }, { 30: [1, 93] }, o($V9, [2, 50], { 32: [1, 94], 41: [1, 95] }), o($V9, [2, 54], { 37: [1, 96], 41: [1, 97] }), o($V9, [2, 64], { 32: [1, 99], 37: [1, 98] }), o($Vj, [2, 119]), o($Vj, [2, 120]), o($V9, [2, 51], { 32: [1, 100], 41: [1, 101], 45: $Ve }), { 33: [1, 102] }, { 33: [1, 103] }, o($V9, [2, 53], { 37: [1, 104], 41: [1, 105], 45: $Ve }), { 38: 106, 42: $Vf, 43: $Vg, 44: $Vh }, { 33: [1, 107] }, o($V9, [2, 65], { 32: [1, 109], 37: [1, 108], 45: $Ve }), { 38: 110, 42: $Vf, 43: $Vg, 44: $Vh }, { 33: [1, 111] }, o($V9, [2, 32], { 35: 113, 37: [1, 112], 45: $Vc }), o($V9, [2, 33], { 35: 114, 32: [1, 115], 45: $Vc }), { 33: [1, 116] }, { 38: 117, 42: $Vf, 43: $Vg, 44: $Vh }, { 33: [1, 118] }, o($V9, [2, 26], { 34: [1, 119], 45: $Ve }), o($V9, [2, 29], { 34: [1, 120] }), o($V9, [2, 23]), { 33: [1, 121] }, { 33: [1, 122] }, { 38: 123, 42: $Vf, 43: $Vg, 44: $Vh }, { 33: [1, 124] }, { 38: 125, 42: $Vf, 43: $Vg, 44: $Vh }, { 33: [1, 126] }, { 33: [1, 127] }, { 33: [1, 128] }, o($V9, [2, 56], { 35: 129, 41: [1, 130], 45: $Vc }), o($V9, [2, 67], { 35: 131, 32: [1, 132], 45: $Vc }), { 38: 133, 42: $Vf, 43: $Vg, 44: $Vh }, { 33: [1, 134] }, o($V9, [2, 55], { 35: 135, 41: [1, 136], 45: $Vc }), o($V9, [2, 68], { 35: 138, 37: [1, 137], 45: $Vc }), { 38: 139, 42: $Vf, 43: $Vg, 44: $Vh }, { 33: [1, 140] }, o($V9, [2, 66], { 35: 141, 32: [1, 142], 45: $Vc }), o($V9, [2, 69], { 35: 144, 37: [1, 143], 45: $Vc }), { 38: 145, 42: $Vf, 43: $Vg, 44: $Vh }, o($V9, [2, 39], { 37: [1, 146], 45: $Ve }), o($V9, [2, 37], { 32: [1, 147], 45: $Ve }), { 33: [1, 148] }, o($V9, [2, 35], { 37: [1, 149] }), o($V9, [2, 36], { 32: [1, 150] }), o($V9, [2, 25], { 35: 151, 45: $Vc }), { 33: [1, 152] }, { 33: [1, 153] }, o($V9, [2, 61], { 41: [1, 154] }), o($V9, [2, 74], { 32: [1, 155] }), o($V9, [2, 62], { 41: [1, 156] }), o($V9, [2, 85], { 37: [1, 157] }), o($V9, [2, 75], { 32: [1, 158] }), o($V9, [2, 84], { 37: [1, 159] }), o($V9, [2, 60], { 41: [1, 160] }), o($V9, [2, 73], { 32: [1, 161] }), o($V9, [2, 59], { 41: [1, 162], 45: $Ve }), { 33: [1, 163] }, o($V9, [2, 72], { 32: [1, 164], 45: $Ve }), { 33: [1, 165] }, o($V9, [2, 58], { 41: [1, 166] }), o($V9, [2, 86], { 37: [1, 167] }), o($V9, [2, 57], { 41: [1, 168], 45: $Ve }), { 33: [1, 169] }, { 38: 170, 42: $Vf, 43: $Vg, 44: $Vh }, o($V9, [2, 87], { 37: [1, 171], 45: $Ve }), o($V9, [2, 71], { 32: [1, 172] }), o($V9, [2, 82], { 37: [1, 173] }), o($V9, [2, 70], { 32: [1, 174], 45: $Ve }), { 33: [1, 175] }, { 38: 176, 42: $Vf, 43: $Vg, 44: $Vh }, o($V9, [2, 83], { 37: [1, 177], 45: $Ve }), o($V9, [2, 38], { 35: 178, 45: $Vc }), { 38: 179, 42: $Vf, 43: $Vg, 44: $Vh }, { 33: [1, 180] }, o($V9, [2, 40], { 35: 181, 45: $Vc }), { 38: 182, 42: $Vf, 43: $Vg, 44: $Vh }, { 33: [1, 183] }, o($V9, [2, 27], { 45: $Ve }), o($V9, [2, 28]), o($V9, [2, 30]), { 33: [1, 184] }, { 33: [1, 185] }, { 33: [1, 186] }, { 38: 187, 42: $Vf, 43: $Vg, 44: $Vh }, { 33: [1, 188] }, { 38: 189, 42: $Vf, 43: $Vg, 44: $Vh }, { 33: [1, 190] }, { 33: [1, 191] }, { 33: [1, 192] }, o($V9, [2, 79], { 35: 193, 45: $Vc }), { 33: [1, 194] }, o($V9, [2, 78], { 35: 195, 45: $Vc }), { 33: [1, 196] }, { 38: 197, 42: $Vf, 43: $Vg, 44: $Vh }, { 33: [1, 198] }, o($V9, [2, 80], { 35: 199, 45: $Vc }), o($V9, [2, 81], { 35: 200, 45: $Vc }), { 38: 201, 42: $Vf, 43: $Vg, 44: $Vh }, { 33: [1, 202] }, { 38: 203, 42: $Vf, 43: $Vg, 44: $Vh }, { 33: [1, 204] }, o($V9, [2, 76], { 35: 205, 45: $Vc }), o($V9, [2, 77], { 35: 206, 45: $Vc }), { 38: 207, 42: $Vf, 43: $Vg, 44: $Vh }, o($V9, [2, 41], { 45: $Ve }), o($V9, [2, 43]), o($V9, [2, 42]), o($V9, [2, 44], { 45: $Ve }), o($V9, [2, 46]), o($V9, [2, 45]), o($V9, [2, 102]), o($V9, [2, 103]), o($V9, [2, 100]), o($V9, [2, 101]), o($V9, [2, 105]), o($V9, [2, 104]), o($V9, [2, 109]), o($V9, [2, 108]), o($V9, [2, 107]), o($V9, [2, 106], { 45: $Ve }), o($V9, [2, 111]), o($V9, [2, 110], { 45: $Ve }), o($V9, [2, 99]), o($V9, [2, 98]), o($V9, [2, 97]), o($V9, [2, 96], { 45: $Ve }), o($V9, [2, 94], { 45: $Ve }), o($V9, [2, 95]), o($V9, [2, 93]), o($V9, [2, 92]), o($V9, [2, 91]), o($V9, [2, 90], { 45: $Ve }), o($V9, [2, 88], { 45: $Ve }), o($V9, [2, 89])],
    defaultActions: { 7: [2, 1], 13: [2, 2], 18: [2, 3], 36: [2, 4] },
    parseError: /* @__PURE__ */ __name(function parseError(str, hash) {
      if (hash.recoverable) {
        this.trace(str);
      } else {
        var error = new Error(str);
        error.hash = hash;
        throw error;
      }
    }, "parseError"),
    parse: /* @__PURE__ */ __name(function parse(input) {
      var self = this, stack = [0], tstack = [], vstack = [null], lstack = [], table = this.table, yytext = "", yylineno = 0, yyleng = 0, recovering = 0, TERROR = 2, EOF = 1;
      var args = lstack.slice.call(arguments, 1);
      var lexer2 = Object.create(this.lexer);
      var sharedState = { yy: {} };
      for (var k in this.yy) {
        if (Object.prototype.hasOwnProperty.call(this.yy, k)) {
          sharedState.yy[k] = this.yy[k];
        }
      }
      lexer2.setInput(input, sharedState.yy);
      sharedState.yy.lexer = lexer2;
      sharedState.yy.parser = this;
      if (typeof lexer2.yylloc == "undefined") {
        lexer2.yylloc = {};
      }
      var yyloc = lexer2.yylloc;
      lstack.push(yyloc);
      var ranges = lexer2.options && lexer2.options.ranges;
      if (typeof sharedState.yy.parseError === "function") {
        this.parseError = sharedState.yy.parseError;
      } else {
        this.parseError = Object.getPrototypeOf(this).parseError;
      }
      function popStack(n) {
        stack.length = stack.length - 2 * n;
        vstack.length = vstack.length - n;
        lstack.length = lstack.length - n;
      }
      __name(popStack, "popStack");
      function lex() {
        var token;
        token = tstack.pop() || lexer2.lex() || EOF;
        if (typeof token !== "number") {
          if (token instanceof Array) {
            tstack = token;
            token = tstack.pop();
          }
          token = self.symbols_[token] || token;
        }
        return token;
      }
      __name(lex, "lex");
      var symbol, preErrorSymbol, state, action, a, r, yyval = {}, p, len, newState, expected;
      while (true) {
        state = stack[stack.length - 1];
        if (this.defaultActions[state]) {
          action = this.defaultActions[state];
        } else {
          if (symbol === null || typeof symbol == "undefined") {
            symbol = lex();
          }
          action = table[state] && table[state][symbol];
        }
        if (typeof action === "undefined" || !action.length || !action[0]) {
          var errStr = "";
          expected = [];
          for (p in table[state]) {
            if (this.terminals_[p] && p > TERROR) {
              expected.push("'" + this.terminals_[p] + "'");
            }
          }
          if (lexer2.showPosition) {
            errStr = "Parse error on line " + (yylineno + 1) + ":\n" + lexer2.showPosition() + "\nExpecting " + expected.join(", ") + ", got '" + (this.terminals_[symbol] || symbol) + "'";
          } else {
            errStr = "Parse error on line " + (yylineno + 1) + ": Unexpected " + (symbol == EOF ? "end of input" : "'" + (this.terminals_[symbol] || symbol) + "'");
          }
          this.parseError(errStr, {
            text: lexer2.match,
            token: this.terminals_[symbol] || symbol,
            line: lexer2.yylineno,
            loc: yyloc,
            expected
          });
        }
        if (action[0] instanceof Array && action.length > 1) {
          throw new Error("Parse Error: multiple actions possible at state: " + state + ", token: " + symbol);
        }
        switch (action[0]) {
          case 1:
            stack.push(symbol);
            vstack.push(lexer2.yytext);
            lstack.push(lexer2.yylloc);
            stack.push(action[1]);
            symbol = null;
            if (!preErrorSymbol) {
              yyleng = lexer2.yyleng;
              yytext = lexer2.yytext;
              yylineno = lexer2.yylineno;
              yyloc = lexer2.yylloc;
              if (recovering > 0) {
                recovering--;
              }
            } else {
              symbol = preErrorSymbol;
              preErrorSymbol = null;
            }
            break;
          case 2:
            len = this.productions_[action[1]][1];
            yyval.$ = vstack[vstack.length - len];
            yyval._$ = {
              first_line: lstack[lstack.length - (len || 1)].first_line,
              last_line: lstack[lstack.length - 1].last_line,
              first_column: lstack[lstack.length - (len || 1)].first_column,
              last_column: lstack[lstack.length - 1].last_column
            };
            if (ranges) {
              yyval._$.range = [
                lstack[lstack.length - (len || 1)].range[0],
                lstack[lstack.length - 1].range[1]
              ];
            }
            r = this.performAction.apply(yyval, [
              yytext,
              yyleng,
              yylineno,
              sharedState.yy,
              action[1],
              vstack,
              lstack
            ].concat(args));
            if (typeof r !== "undefined") {
              return r;
            }
            if (len) {
              stack = stack.slice(0, -1 * len * 2);
              vstack = vstack.slice(0, -1 * len);
              lstack = lstack.slice(0, -1 * len);
            }
            stack.push(this.productions_[action[1]][0]);
            vstack.push(yyval.$);
            lstack.push(yyval._$);
            newState = table[stack[stack.length - 2]][stack[stack.length - 1]];
            stack.push(newState);
            break;
          case 3:
            return true;
        }
      }
      return true;
    }, "parse")
  };
  var lexer = /* @__PURE__ */ function() {
    var lexer2 = {
      EOF: 1,
      parseError: /* @__PURE__ */ __name(function parseError(str, hash) {
        if (this.yy.parser) {
          this.yy.parser.parseError(str, hash);
        } else {
          throw new Error(str);
        }
      }, "parseError"),
      // resets the lexer, sets new input
      setInput: /* @__PURE__ */ __name(function(input, yy) {
        this.yy = yy || this.yy || {};
        this._input = input;
        this._more = this._backtrack = this.done = false;
        this.yylineno = this.yyleng = 0;
        this.yytext = this.matched = this.match = "";
        this.conditionStack = ["INITIAL"];
        this.yylloc = {
          first_line: 1,
          first_column: 0,
          last_line: 1,
          last_column: 0
        };
        if (this.options.ranges) {
          this.yylloc.range = [0, 0];
        }
        this.offset = 0;
        return this;
      }, "setInput"),
      // consumes and returns one char from the input
      input: /* @__PURE__ */ __name(function() {
        var ch = this._input[0];
        this.yytext += ch;
        this.yyleng++;
        this.offset++;
        this.match += ch;
        this.matched += ch;
        var lines = ch.match(/(?:\r\n?|\n).*/g);
        if (lines) {
          this.yylineno++;
          this.yylloc.last_line++;
        } else {
          this.yylloc.last_column++;
        }
        if (this.options.ranges) {
          this.yylloc.range[1]++;
        }
        this._input = this._input.slice(1);
        return ch;
      }, "input"),
      // unshifts one char (or a string) into the input
      unput: /* @__PURE__ */ __name(function(ch) {
        var len = ch.length;
        var lines = ch.split(/(?:\r\n?|\n)/g);
        this._input = ch + this._input;
        this.yytext = this.yytext.substr(0, this.yytext.length - len);
        this.offset -= len;
        var oldLines = this.match.split(/(?:\r\n?|\n)/g);
        this.match = this.match.substr(0, this.match.length - 1);
        this.matched = this.matched.substr(0, this.matched.length - 1);
        if (lines.length - 1) {
          this.yylineno -= lines.length - 1;
        }
        var r = this.yylloc.range;
        this.yylloc = {
          first_line: this.yylloc.first_line,
          last_line: this.yylineno + 1,
          first_column: this.yylloc.first_column,
          last_column: lines ? (lines.length === oldLines.length ? this.yylloc.first_column : 0) + oldLines[oldLines.length - lines.length].length - lines[0].length : this.yylloc.first_column - len
        };
        if (this.options.ranges) {
          this.yylloc.range = [r[0], r[0] + this.yyleng - len];
        }
        this.yyleng = this.yytext.length;
        return this;
      }, "unput"),
      // When called from action, caches matched text and appends it on next action
      more: /* @__PURE__ */ __name(function() {
        this._more = true;
        return this;
      }, "more"),
      // When called from action, signals the lexer that this rule fails to match the input, so the next matching rule (regex) should be tested instead.
      reject: /* @__PURE__ */ __name(function() {
        if (this.options.backtrack_lexer) {
          this._backtrack = true;
        } else {
          return this.parseError("Lexical error on line " + (this.yylineno + 1) + ". You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).\n" + this.showPosition(), {
            text: "",
            token: null,
            line: this.yylineno
          });
        }
        return this;
      }, "reject"),
      // retain first n characters of the match
      less: /* @__PURE__ */ __name(function(n) {
        this.unput(this.match.slice(n));
      }, "less"),
      // displays already matched input, i.e. for error messages
      pastInput: /* @__PURE__ */ __name(function() {
        var past = this.matched.substr(0, this.matched.length - this.match.length);
        return (past.length > 20 ? "..." : "") + past.substr(-20).replace(/\n/g, "");
      }, "pastInput"),
      // displays upcoming input, i.e. for error messages
      upcomingInput: /* @__PURE__ */ __name(function() {
        var next = this.match;
        if (next.length < 20) {
          next += this._input.substr(0, 20 - next.length);
        }
        return (next.substr(0, 20) + (next.length > 20 ? "..." : "")).replace(/\n/g, "");
      }, "upcomingInput"),
      // displays the character position where the lexing error occurred, i.e. for error messages
      showPosition: /* @__PURE__ */ __name(function() {
        var pre = this.pastInput();
        var c = new Array(pre.length + 1).join("-");
        return pre + this.upcomingInput() + "\n" + c + "^";
      }, "showPosition"),
      // test the lexed token: return FALSE when not a match, otherwise return token
      test_match: /* @__PURE__ */ __name(function(match, indexed_rule) {
        var token, lines, backup;
        if (this.options.backtrack_lexer) {
          backup = {
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
          };
          if (this.options.ranges) {
            backup.yylloc.range = this.yylloc.range.slice(0);
          }
        }
        lines = match[0].match(/(?:\r\n?|\n).*/g);
        if (lines) {
          this.yylineno += lines.length;
        }
        this.yylloc = {
          first_line: this.yylloc.last_line,
          last_line: this.yylineno + 1,
          first_column: this.yylloc.last_column,
          last_column: lines ? lines[lines.length - 1].length - lines[lines.length - 1].match(/\r?\n?/)[0].length : this.yylloc.last_column + match[0].length
        };
        this.yytext += match[0];
        this.match += match[0];
        this.matches = match;
        this.yyleng = this.yytext.length;
        if (this.options.ranges) {
          this.yylloc.range = [this.offset, this.offset += this.yyleng];
        }
        this._more = false;
        this._backtrack = false;
        this._input = this._input.slice(match[0].length);
        this.matched += match[0];
        token = this.performAction.call(this, this.yy, this, indexed_rule, this.conditionStack[this.conditionStack.length - 1]);
        if (this.done && this._input) {
          this.done = false;
        }
        if (token) {
          return token;
        } else if (this._backtrack) {
          for (var k in backup) {
            this[k] = backup[k];
          }
          return false;
        }
        return false;
      }, "test_match"),
      // return next match in input
      next: /* @__PURE__ */ __name(function() {
        if (this.done) {
          return this.EOF;
        }
        if (!this._input) {
          this.done = true;
        }
        var token, match, tempMatch, index;
        if (!this._more) {
          this.yytext = "";
          this.match = "";
        }
        var rules = this._currentRules();
        for (var i = 0; i < rules.length; i++) {
          tempMatch = this._input.match(this.rules[rules[i]]);
          if (tempMatch && (!match || tempMatch[0].length > match[0].length)) {
            match = tempMatch;
            index = i;
            if (this.options.backtrack_lexer) {
              token = this.test_match(tempMatch, rules[i]);
              if (token !== false) {
                return token;
              } else if (this._backtrack) {
                match = false;
                continue;
              } else {
                return false;
              }
            } else if (!this.options.flex) {
              break;
            }
          }
        }
        if (match) {
          token = this.test_match(match, rules[index]);
          if (token !== false) {
            return token;
          }
          return false;
        }
        if (this._input === "") {
          return this.EOF;
        } else {
          return this.parseError("Lexical error on line " + (this.yylineno + 1) + ". Unrecognized text.\n" + this.showPosition(), {
            text: "",
            token: null,
            line: this.yylineno
          });
        }
      }, "next"),
      // return next match that has a token
      lex: /* @__PURE__ */ __name(function lex() {
        var r = this.next();
        if (r) {
          return r;
        } else {
          return this.lex();
        }
      }, "lex"),
      // activates a new lexer condition state (pushes the new lexer condition state onto the condition stack)
      begin: /* @__PURE__ */ __name(function begin(condition) {
        this.conditionStack.push(condition);
      }, "begin"),
      // pop the previously active lexer condition state off the condition stack
      popState: /* @__PURE__ */ __name(function popState() {
        var n = this.conditionStack.length - 1;
        if (n > 0) {
          return this.conditionStack.pop();
        } else {
          return this.conditionStack[0];
        }
      }, "popState"),
      // produce the lexer rule set which is active for the currently active lexer condition state
      _currentRules: /* @__PURE__ */ __name(function _currentRules() {
        if (this.conditionStack.length && this.conditionStack[this.conditionStack.length - 1]) {
          return this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules;
        } else {
          return this.conditions["INITIAL"].rules;
        }
      }, "_currentRules"),
      // return the currently active lexer condition state; when an index argument is provided it produces the N-th previous condition state, if available
      topState: /* @__PURE__ */ __name(function topState(n) {
        n = this.conditionStack.length - 1 - Math.abs(n || 0);
        if (n >= 0) {
          return this.conditionStack[n];
        } else {
          return "INITIAL";
        }
      }, "topState"),
      // alias for begin(condition)
      pushState: /* @__PURE__ */ __name(function pushState(condition) {
        this.begin(condition);
      }, "pushState"),
      // return the number of states currently on the stack
      stateStackSize: /* @__PURE__ */ __name(function stateStackSize() {
        return this.conditionStack.length;
      }, "stateStackSize"),
      options: { "case-insensitive": true },
      performAction: /* @__PURE__ */ __name(function anonymous(yy, yy_, $avoiding_name_collisions, YY_START) {
        var YYSTATE = YY_START;
        switch ($avoiding_name_collisions) {
          case 0:
            this.begin("acc_title");
            return 19;
            break;
          case 1:
            this.popState();
            return "acc_title_value";
            break;
          case 2:
            this.begin("acc_descr");
            return 21;
            break;
          case 3:
            this.popState();
            return "acc_descr_value";
            break;
          case 4:
            this.begin("acc_descr_multiline");
            break;
          case 5:
            this.popState();
            break;
          case 6:
            return "acc_descr_multiline_value";
            break;
          case 7:
            return 13;
            break;
          case 8:
            break;
          case 9:
            break;
          case 10:
            return 5;
            break;
          case 11:
            return 39;
            break;
          case 12:
            return 32;
            break;
          case 13:
            return 37;
            break;
          case 14:
            return 41;
            break;
          case 15:
            return 42;
            break;
          case 16:
            return 43;
            break;
          case 17:
            return 44;
            break;
          case 18:
            return 45;
            break;
          case 19:
            return 28;
            break;
          case 20:
            return 29;
            break;
          case 21:
            return 36;
            break;
          case 22:
            return 31;
            break;
          case 23:
            return 34;
            break;
          case 24:
            return 26;
            break;
          case 25:
            return 9;
            break;
          case 26:
            return 9;
            break;
          case 27:
            return 9;
            break;
          case 28:
            return 8;
            break;
          case 29:
            return "CARET";
            break;
          case 30:
            this.begin("options");
            break;
          case 31:
            this.popState();
            break;
          case 32:
            return 12;
            break;
          case 33:
            return 46;
            break;
          case 34:
            this.begin("string");
            break;
          case 35:
            this.popState();
            break;
          case 36:
            return 33;
            break;
          case 37:
            return 30;
            break;
          case 38:
            return 47;
            break;
          case 39:
            return 7;
            break;
          case 40:
            break;
        }
      }, "anonymous"),
      rules: [/^(?:accTitle\s*:\s*)/i, /^(?:(?!\n||)*[^\n]*)/i, /^(?:accDescr\s*:\s*)/i, /^(?:(?!\n||)*[^\n]*)/i, /^(?:accDescr\s*\{\s*)/i, /^(?:[\}])/i, /^(?:[^\}]*)/i, /^(?:(\r?\n)+)/i, /^(?:#[^\n]*)/i, /^(?:%[^\n]*)/i, /^(?:gitGraph\b)/i, /^(?:commit(?=\s|$))/i, /^(?:id:)/i, /^(?:type:)/i, /^(?:msg:)/i, /^(?:NORMAL\b)/i, /^(?:REVERSE\b)/i, /^(?:HIGHLIGHT\b)/i, /^(?:tag:)/i, /^(?:branch(?=\s|$))/i, /^(?:order:)/i, /^(?:merge(?=\s|$))/i, /^(?:cherry-pick(?=\s|$))/i, /^(?:parent:)/i, /^(?:\b(checkout|switch)(?=\s|$))/i, /^(?:LR\b)/i, /^(?:TB\b)/i, /^(?:BT\b)/i, /^(?::)/i, /^(?:\^)/i, /^(?:options\r?\n)/i, /^(?:[ \r\n\t]+end\b)/i, /^(?:[\s\S]+(?=[ \r\n\t]+end))/i, /^(?:["]["])/i, /^(?:["])/i, /^(?:["])/i, /^(?:[^"]*)/i, /^(?:[0-9]+(?=\s|$))/i, /^(?:\w([-\./\w]*[-\w])?)/i, /^(?:$)/i, /^(?:\s+)/i],
      conditions: { "acc_descr_multiline": { "rules": [5, 6], "inclusive": false }, "acc_descr": { "rules": [3], "inclusive": false }, "acc_title": { "rules": [1], "inclusive": false }, "options": { "rules": [31, 32], "inclusive": false }, "string": { "rules": [35, 36], "inclusive": false }, "INITIAL": { "rules": [0, 2, 4, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 33, 34, 37, 38, 39, 40], "inclusive": true } }
    };
    return lexer2;
  }();
  parser2.lexer = lexer;
  function Parser() {
    this.yy = {};
  }
  __name(Parser, "Parser");
  Parser.prototype = parser2;
  parser2.Parser = Parser;
  return new Parser();
}();
parser.parser = parser;
var gitGraph_default = parser;

// src/diagrams/git/gitGraphAst.js
var { mainBranchName, mainBranchOrder } = getConfig().gitGraph;
var commits = /* @__PURE__ */ new Map();
var head = null;
var branchesConfig = /* @__PURE__ */ new Map();
branchesConfig.set(mainBranchName, { name: mainBranchName, order: mainBranchOrder });
var branches = /* @__PURE__ */ new Map();
branches.set(mainBranchName, head);
var curBranch = mainBranchName;
var direction = "LR";
var seq = 0;
function getId() {
  return random({ length: 7 });
}
__name(getId, "getId");
function uniqBy(list, fn) {
  const recordMap = /* @__PURE__ */ Object.create(null);
  return list.reduce((out, item) => {
    const key = fn(item);
    if (!recordMap[key]) {
      recordMap[key] = true;
      out.push(item);
    }
    return out;
  }, []);
}
__name(uniqBy, "uniqBy");
var setDirection = /* @__PURE__ */ __name(function(dir2) {
  direction = dir2;
}, "setDirection");
var options = {};
var setOptions = /* @__PURE__ */ __name(function(rawOptString) {
  log.debug("options str", rawOptString);
  rawOptString = rawOptString?.trim();
  rawOptString = rawOptString || "{}";
  try {
    options = JSON.parse(rawOptString);
  } catch (e) {
    log.error("error while parsing gitGraph options", e.message);
  }
}, "setOptions");
var getOptions = /* @__PURE__ */ __name(function() {
  return options;
}, "getOptions");
var commit = /* @__PURE__ */ __name(function(msg, id, type, tags) {
  log.debug("Entering commit:", msg, id, type, tags);
  const config = getConfig();
  id = common_default.sanitizeText(id, config);
  msg = common_default.sanitizeText(msg, config);
  tags = tags?.map((tag) => common_default.sanitizeText(tag, config));
  const commit2 = {
    id: id ? id : seq + "-" + getId(),
    message: msg,
    seq: seq++,
    type: type ? type : commitType.NORMAL,
    tags: tags ?? [],
    parents: head == null ? [] : [head.id],
    branch: curBranch
  };
  head = commit2;
  commits.set(commit2.id, commit2);
  branches.set(curBranch, commit2.id);
  log.debug("in pushCommit " + commit2.id);
}, "commit");
var branch = /* @__PURE__ */ __name(function(name, order) {
  name = common_default.sanitizeText(name, getConfig());
  if (!branches.has(name)) {
    branches.set(name, head != null ? head.id : null);
    branchesConfig.set(name, { name, order: order ? parseInt(order, 10) : null });
    checkout(name);
    log.debug("in createBranch");
  } else {
    let error = new Error(
      'Trying to create an existing branch. (Help: Either use a new name if you want create a new branch or try using "checkout ' + name + '")'
    );
    error.hash = {
      text: "branch " + name,
      token: "branch " + name,
      line: "1",
      loc: { first_line: 1, last_line: 1, first_column: 1, last_column: 1 },
      expected: ['"checkout ' + name + '"']
    };
    throw error;
  }
}, "branch");
var merge = /* @__PURE__ */ __name(function(otherBranch, custom_id, override_type, custom_tags) {
  const config = getConfig();
  otherBranch = common_default.sanitizeText(otherBranch, config);
  custom_id = common_default.sanitizeText(custom_id, config);
  const currentCommit = commits.get(branches.get(curBranch));
  const otherCommit = commits.get(branches.get(otherBranch));
  if (curBranch === otherBranch) {
    let error = new Error('Incorrect usage of "merge". Cannot merge a branch to itself');
    error.hash = {
      text: "merge " + otherBranch,
      token: "merge " + otherBranch,
      line: "1",
      loc: { first_line: 1, last_line: 1, first_column: 1, last_column: 1 },
      expected: ["branch abc"]
    };
    throw error;
  } else if (currentCommit === void 0 || !currentCommit) {
    let error = new Error(
      'Incorrect usage of "merge". Current branch (' + curBranch + ")has no commits"
    );
    error.hash = {
      text: "merge " + otherBranch,
      token: "merge " + otherBranch,
      line: "1",
      loc: { first_line: 1, last_line: 1, first_column: 1, last_column: 1 },
      expected: ["commit"]
    };
    throw error;
  } else if (!branches.has(otherBranch)) {
    let error = new Error(
      'Incorrect usage of "merge". Branch to be merged (' + otherBranch + ") does not exist"
    );
    error.hash = {
      text: "merge " + otherBranch,
      token: "merge " + otherBranch,
      line: "1",
      loc: { first_line: 1, last_line: 1, first_column: 1, last_column: 1 },
      expected: ["branch " + otherBranch]
    };
    throw error;
  } else if (otherCommit === void 0 || !otherCommit) {
    let error = new Error(
      'Incorrect usage of "merge". Branch to be merged (' + otherBranch + ") has no commits"
    );
    error.hash = {
      text: "merge " + otherBranch,
      token: "merge " + otherBranch,
      line: "1",
      loc: { first_line: 1, last_line: 1, first_column: 1, last_column: 1 },
      expected: ['"commit"']
    };
    throw error;
  } else if (currentCommit === otherCommit) {
    let error = new Error('Incorrect usage of "merge". Both branches have same head');
    error.hash = {
      text: "merge " + otherBranch,
      token: "merge " + otherBranch,
      line: "1",
      loc: { first_line: 1, last_line: 1, first_column: 1, last_column: 1 },
      expected: ["branch abc"]
    };
    throw error;
  } else if (custom_id && commits.has(custom_id)) {
    let error = new Error(
      'Incorrect usage of "merge". Commit with id:' + custom_id + " already exists, use different custom Id"
    );
    error.hash = {
      text: "merge " + otherBranch + custom_id + override_type + custom_tags?.join(","),
      token: "merge " + otherBranch + custom_id + override_type + custom_tags?.join(","),
      line: "1",
      loc: { first_line: 1, last_line: 1, first_column: 1, last_column: 1 },
      expected: [
        `merge ${otherBranch} ${custom_id}_UNIQUE ${override_type} ${custom_tags?.join(",")}`
      ]
    };
    throw error;
  }
  const commit2 = {
    id: custom_id ? custom_id : seq + "-" + getId(),
    message: "merged branch " + otherBranch + " into " + curBranch,
    seq: seq++,
    parents: [head == null ? null : head.id, branches.get(otherBranch)],
    branch: curBranch,
    type: commitType.MERGE,
    customType: override_type,
    customId: custom_id ? true : false,
    tags: custom_tags ? custom_tags : []
  };
  head = commit2;
  commits.set(commit2.id, commit2);
  branches.set(curBranch, commit2.id);
  log.debug(branches);
  log.debug("in mergeBranch");
}, "merge");
var cherryPick = /* @__PURE__ */ __name(function(sourceId, targetId, tags, parentCommitId) {
  log.debug("Entering cherryPick:", sourceId, targetId, tags);
  const config = getConfig();
  sourceId = common_default.sanitizeText(sourceId, config);
  targetId = common_default.sanitizeText(targetId, config);
  tags = tags?.map((tag) => common_default.sanitizeText(tag, config));
  parentCommitId = common_default.sanitizeText(parentCommitId, config);
  if (!sourceId || !commits.has(sourceId)) {
    let error = new Error(
      'Incorrect usage of "cherryPick". Source commit id should exist and provided'
    );
    error.hash = {
      text: "cherryPick " + sourceId + " " + targetId,
      token: "cherryPick " + sourceId + " " + targetId,
      line: "1",
      loc: { first_line: 1, last_line: 1, first_column: 1, last_column: 1 },
      expected: ["cherry-pick abc"]
    };
    throw error;
  }
  let sourceCommit = commits.get(sourceId);
  let sourceCommitBranch = sourceCommit.branch;
  if (parentCommitId && !(Array.isArray(sourceCommit.parents) && sourceCommit.parents.includes(parentCommitId))) {
    let error = new Error(
      "Invalid operation: The specified parent commit is not an immediate parent of the cherry-picked commit."
    );
    throw error;
  }
  if (sourceCommit.type === commitType.MERGE && !parentCommitId) {
    let error = new Error(
      "Incorrect usage of cherry-pick: If the source commit is a merge commit, an immediate parent commit must be specified."
    );
    throw error;
  }
  if (!targetId || !commits.has(targetId)) {
    if (sourceCommitBranch === curBranch) {
      let error = new Error(
        'Incorrect usage of "cherryPick". Source commit is already on current branch'
      );
      error.hash = {
        text: "cherryPick " + sourceId + " " + targetId,
        token: "cherryPick " + sourceId + " " + targetId,
        line: "1",
        loc: { first_line: 1, last_line: 1, first_column: 1, last_column: 1 },
        expected: ["cherry-pick abc"]
      };
      throw error;
    }
    const currentCommit = commits.get(branches.get(curBranch));
    if (currentCommit === void 0 || !currentCommit) {
      let error = new Error(
        'Incorrect usage of "cherry-pick". Current branch (' + curBranch + ")has no commits"
      );
      error.hash = {
        text: "cherryPick " + sourceId + " " + targetId,
        token: "cherryPick " + sourceId + " " + targetId,
        line: "1",
        loc: { first_line: 1, last_line: 1, first_column: 1, last_column: 1 },
        expected: ["cherry-pick abc"]
      };
      throw error;
    }
    const commit2 = {
      id: seq + "-" + getId(),
      message: "cherry-picked " + sourceCommit + " into " + curBranch,
      seq: seq++,
      parents: [head == null ? null : head.id, sourceCommit.id],
      branch: curBranch,
      type: commitType.CHERRY_PICK,
      tags: tags ? tags.filter(Boolean) : [
        `cherry-pick:${sourceCommit.id}${sourceCommit.type === commitType.MERGE ? `|parent:${parentCommitId}` : ""}`
      ]
    };
    head = commit2;
    commits.set(commit2.id, commit2);
    branches.set(curBranch, commit2.id);
    log.debug(branches);
    log.debug("in cherryPick");
  }
}, "cherryPick");
var checkout = /* @__PURE__ */ __name(function(branch2) {
  branch2 = common_default.sanitizeText(branch2, getConfig());
  if (!branches.has(branch2)) {
    let error = new Error(
      'Trying to checkout branch which is not yet created. (Help try using "branch ' + branch2 + '")'
    );
    error.hash = {
      text: "checkout " + branch2,
      token: "checkout " + branch2,
      line: "1",
      loc: { first_line: 1, last_line: 1, first_column: 1, last_column: 1 },
      expected: ['"branch ' + branch2 + '"']
    };
    throw error;
  } else {
    curBranch = branch2;
    const id = branches.get(curBranch);
    head = commits.get(id);
  }
}, "checkout");
function upsert(arr, key, newVal) {
  const index = arr.indexOf(key);
  if (index === -1) {
    arr.push(newVal);
  } else {
    arr.splice(index, 1, newVal);
  }
}
__name(upsert, "upsert");
function prettyPrintCommitHistory(commitArr) {
  const commit2 = commitArr.reduce((out, commit3) => {
    if (out.seq > commit3.seq) {
      return out;
    }
    return commit3;
  }, commitArr[0]);
  let line = "";
  commitArr.forEach(function(c) {
    if (c === commit2) {
      line += "	*";
    } else {
      line += "	|";
    }
  });
  const label = [line, commit2.id, commit2.seq];
  for (let branch2 in branches) {
    if (branches.get(branch2) === commit2.id) {
      label.push(branch2);
    }
  }
  log.debug(label.join(" "));
  if (commit2.parents && commit2.parents.length == 2) {
    const newCommit = commits.get(commit2.parents[0]);
    upsert(commitArr, commit2, newCommit);
    commitArr.push(commits.get(commit2.parents[1]));
  } else if (commit2.parents.length == 0) {
    return;
  } else {
    const nextCommit = commits.get(commit2.parents);
    upsert(commitArr, commit2, nextCommit);
  }
  commitArr = uniqBy(commitArr, (c) => c.id);
  prettyPrintCommitHistory(commitArr);
}
__name(prettyPrintCommitHistory, "prettyPrintCommitHistory");
var prettyPrint = /* @__PURE__ */ __name(function() {
  log.debug(commits);
  const node = getCommitsArray()[0];
  prettyPrintCommitHistory([node]);
}, "prettyPrint");
var clear2 = /* @__PURE__ */ __name(function() {
  commits = /* @__PURE__ */ new Map();
  head = null;
  const { mainBranchName: mainBranchName2, mainBranchOrder: mainBranchOrder2 } = getConfig().gitGraph;
  branches = /* @__PURE__ */ new Map();
  branches.set(mainBranchName2, null);
  branchesConfig = /* @__PURE__ */ new Map();
  branchesConfig.set(mainBranchName2, { name: mainBranchName2, order: mainBranchOrder2 });
  curBranch = mainBranchName2;
  seq = 0;
  clear();
}, "clear");
var getBranchesAsObjArray = /* @__PURE__ */ __name(function() {
  const branchesArray = [...branchesConfig.values()].map((branchConfig, i) => {
    if (branchConfig.order !== null) {
      return branchConfig;
    }
    return {
      ...branchConfig,
      order: parseFloat(`0.${i}`, 10)
    };
  }).sort((a, b) => a.order - b.order).map(({ name }) => ({ name }));
  return branchesArray;
}, "getBranchesAsObjArray");
var getBranches = /* @__PURE__ */ __name(function() {
  return branches;
}, "getBranches");
var getCommits = /* @__PURE__ */ __name(function() {
  return commits;
}, "getCommits");
var getCommitsArray = /* @__PURE__ */ __name(function() {
  const commitArr = [...commits.values()];
  commitArr.forEach(function(o) {
    log.debug(o.id);
  });
  commitArr.sort((a, b) => a.seq - b.seq);
  return commitArr;
}, "getCommitsArray");
var getCurrentBranch = /* @__PURE__ */ __name(function() {
  return curBranch;
}, "getCurrentBranch");
var getDirection = /* @__PURE__ */ __name(function() {
  return direction;
}, "getDirection");
var getHead = /* @__PURE__ */ __name(function() {
  return head;
}, "getHead");
var commitType = {
  NORMAL: 0,
  REVERSE: 1,
  HIGHLIGHT: 2,
  MERGE: 3,
  CHERRY_PICK: 4
};
var gitGraphAst_default = {
  getConfig: /* @__PURE__ */ __name(() => getConfig().gitGraph, "getConfig"),
  setDirection,
  setOptions,
  getOptions,
  commit,
  branch,
  merge,
  cherryPick,
  checkout,
  //reset,
  prettyPrint,
  clear: clear2,
  getBranchesAsObjArray,
  getBranches,
  getCommits,
  getCommitsArray,
  getCurrentBranch,
  getDirection,
  getHead,
  setAccTitle,
  getAccTitle,
  getAccDescription,
  setAccDescription,
  setDiagramTitle,
  getDiagramTitle,
  commitType
};

// src/diagrams/git/gitGraphRenderer.js
var allCommitsDict = /* @__PURE__ */ new Map();
var commitType2 = {
  NORMAL: 0,
  REVERSE: 1,
  HIGHLIGHT: 2,
  MERGE: 3,
  CHERRY_PICK: 4
};
var THEME_COLOR_LIMIT = 8;
var branchPos = {};
var commitPos = {};
var lanes = [];
var maxPos = 0;
var dir = "LR";
var defaultPos = 30;
var clear3 = /* @__PURE__ */ __name(() => {
  branchPos = /* @__PURE__ */ new Map();
  commitPos = /* @__PURE__ */ new Map();
  allCommitsDict = /* @__PURE__ */ new Map();
  maxPos = 0;
  lanes = [];
  dir = "LR";
}, "clear");
var drawText = /* @__PURE__ */ __name((txt) => {
  const svgLabel = document.createElementNS("http://www.w3.org/2000/svg", "text");
  let rows = [];
  if (typeof txt === "string") {
    rows = txt.split(/\\n|\n|<br\s*\/?>/gi);
  } else if (Array.isArray(txt)) {
    rows = txt;
  } else {
    rows = [];
  }
  for (const row of rows) {
    const tspan = document.createElementNS("http://www.w3.org/2000/svg", "tspan");
    tspan.setAttributeNS("http://www.w3.org/XML/1998/namespace", "xml:space", "preserve");
    tspan.setAttribute("dy", "1em");
    tspan.setAttribute("x", "0");
    tspan.setAttribute("class", "row");
    tspan.textContent = row.trim();
    svgLabel.appendChild(tspan);
  }
  return svgLabel;
}, "drawText");
var findClosestParent = /* @__PURE__ */ __name((parents) => {
  let closestParent = "";
  let maxPosition = 0;
  parents.forEach((parent) => {
    const parentPosition = dir === "TB" || dir === "BT" ? commitPos.get(parent).y : commitPos.get(parent).x;
    if (parentPosition >= maxPosition) {
      closestParent = parent;
      maxPosition = parentPosition;
    }
  });
  return closestParent || void 0;
}, "findClosestParent");
var findClosestParentBT = /* @__PURE__ */ __name((parents) => {
  let closestParent = "";
  let maxPosition = Infinity;
  parents.forEach((parent) => {
    const parentPosition = commitPos.get(parent).y;
    if (parentPosition <= maxPosition) {
      closestParent = parent;
      maxPosition = parentPosition;
    }
  });
  return closestParent || void 0;
}, "findClosestParentBT");
var setParallelBTPos = /* @__PURE__ */ __name((sortedKeys, commits2, defaultPos2, commitStep, layoutOffset) => {
  let curPos = defaultPos2;
  let maxPosition = defaultPos2;
  let roots = [];
  sortedKeys.forEach((key) => {
    const commit2 = commits2.get(key);
    if (commit2.parents.length) {
      const closestParent = findClosestParent(commit2.parents);
      curPos = commitPos.get(closestParent).y + commitStep;
      if (curPos >= maxPosition) {
        maxPosition = curPos;
      }
    } else {
      roots.push(commit2);
    }
    const x = branchPos.get(commit2.branch).pos;
    const y = curPos + layoutOffset;
    commitPos.set(commit2.id, { x, y });
  });
  curPos = maxPosition;
  roots.forEach((commit2) => {
    const posWithOffset = curPos + defaultPos2;
    const y = posWithOffset;
    const x = branchPos.get(commit2.branch).pos;
    commitPos.set(commit2.id, { x, y });
  });
  sortedKeys.forEach((key) => {
    const commit2 = commits2.get(key);
    if (commit2.parents.length) {
      const closestParent = findClosestParentBT(commit2.parents);
      curPos = commitPos.get(closestParent).y - commitStep;
      if (curPos <= maxPosition) {
        maxPosition = curPos;
      }
      const x = branchPos.get(commit2.branch).pos;
      const y = curPos - layoutOffset;
      commitPos.set(commit2.id, { x, y });
    }
  });
}, "setParallelBTPos");
var drawCommits = /* @__PURE__ */ __name((svg, commits2, modifyGraph) => {
  const gitGraphConfig = getConfig().gitGraph;
  const gBullets = svg.append("g").attr("class", "commit-bullets");
  const gLabels = svg.append("g").attr("class", "commit-labels");
  let pos = 0;
  if (dir === "TB" || dir === "BT") {
    pos = defaultPos;
  }
  const keys = [...commits2.keys()];
  const isParallelCommits = gitGraphConfig.parallelCommits;
  const layoutOffset = 10;
  const commitStep = 40;
  let sortedKeys = dir !== "BT" || dir === "BT" && isParallelCommits ? keys.sort((a, b) => {
    return commits2.get(a).seq - commits2.get(b).seq;
  }) : keys.sort((a, b) => {
    return commits2.get(a).seq - commits2.get(b).seq;
  }).reverse();
  if (dir === "BT" && isParallelCommits) {
    setParallelBTPos(sortedKeys, commits2, pos, commitStep, layoutOffset);
    sortedKeys = sortedKeys.reverse();
  }
  sortedKeys.forEach((key) => {
    const commit2 = commits2.get(key);
    if (isParallelCommits) {
      if (commit2.parents.length) {
        const closestParent = dir === "BT" ? findClosestParentBT(commit2.parents) : findClosestParent(commit2.parents);
        if (dir === "TB") {
          pos = commitPos.get(closestParent).y + commitStep;
        } else if (dir === "BT") {
          pos = commitPos.get(key).y - commitStep;
        } else {
          pos = commitPos.get(closestParent).x + commitStep;
        }
      } else {
        if (dir === "TB") {
          pos = defaultPos;
        } else if (dir === "BT") {
          pos = commitPos.get(key).y - commitStep;
        } else {
          pos = 0;
        }
      }
    }
    const posWithOffset = dir === "BT" && isParallelCommits ? pos : pos + layoutOffset;
    const y = dir === "TB" || dir === "BT" ? posWithOffset : branchPos.get(commit2.branch).pos;
    const x = dir === "TB" || dir === "BT" ? branchPos.get(commit2.branch).pos : posWithOffset;
    if (modifyGraph) {
      let typeClass;
      let commitSymbolType = commit2.customType !== void 0 && commit2.customType !== "" ? commit2.customType : commit2.type;
      switch (commitSymbolType) {
        case commitType2.NORMAL:
          typeClass = "commit-normal";
          break;
        case commitType2.REVERSE:
          typeClass = "commit-reverse";
          break;
        case commitType2.HIGHLIGHT:
          typeClass = "commit-highlight";
          break;
        case commitType2.MERGE:
          typeClass = "commit-merge";
          break;
        case commitType2.CHERRY_PICK:
          typeClass = "commit-cherry-pick";
          break;
        default:
          typeClass = "commit-normal";
      }
      if (commitSymbolType === commitType2.HIGHLIGHT) {
        const circle = gBullets.append("rect");
        circle.attr("x", x - 10);
        circle.attr("y", y - 10);
        circle.attr("height", 20);
        circle.attr("width", 20);
        circle.attr(
          "class",
          `commit ${commit2.id} commit-highlight${branchPos.get(commit2.branch).index % THEME_COLOR_LIMIT} ${typeClass}-outer`
        );
        gBullets.append("rect").attr("x", x - 6).attr("y", y - 6).attr("height", 12).attr("width", 12).attr(
          "class",
          `commit ${commit2.id} commit${branchPos.get(commit2.branch).index % THEME_COLOR_LIMIT} ${typeClass}-inner`
        );
      } else if (commitSymbolType === commitType2.CHERRY_PICK) {
        gBullets.append("circle").attr("cx", x).attr("cy", y).attr("r", 10).attr("class", `commit ${commit2.id} ${typeClass}`);
        gBullets.append("circle").attr("cx", x - 3).attr("cy", y + 2).attr("r", 2.75).attr("fill", "#fff").attr("class", `commit ${commit2.id} ${typeClass}`);
        gBullets.append("circle").attr("cx", x + 3).attr("cy", y + 2).attr("r", 2.75).attr("fill", "#fff").attr("class", `commit ${commit2.id} ${typeClass}`);
        gBullets.append("line").attr("x1", x + 3).attr("y1", y + 1).attr("x2", x).attr("y2", y - 5).attr("stroke", "#fff").attr("class", `commit ${commit2.id} ${typeClass}`);
        gBullets.append("line").attr("x1", x - 3).attr("y1", y + 1).attr("x2", x).attr("y2", y - 5).attr("stroke", "#fff").attr("class", `commit ${commit2.id} ${typeClass}`);
      } else {
        const circle = gBullets.append("circle");
        circle.attr("cx", x);
        circle.attr("cy", y);
        circle.attr("r", commit2.type === commitType2.MERGE ? 9 : 10);
        circle.attr(
          "class",
          `commit ${commit2.id} commit${branchPos.get(commit2.branch).index % THEME_COLOR_LIMIT}`
        );
        if (commitSymbolType === commitType2.MERGE) {
          const circle2 = gBullets.append("circle");
          circle2.attr("cx", x);
          circle2.attr("cy", y);
          circle2.attr("r", 6);
          circle2.attr(
            "class",
            `commit ${typeClass} ${commit2.id} commit${branchPos.get(commit2.branch).index % THEME_COLOR_LIMIT}`
          );
        }
        if (commitSymbolType === commitType2.REVERSE) {
          const cross = gBullets.append("path");
          cross.attr("d", `M ${x - 5},${y - 5}L${x + 5},${y + 5}M${x - 5},${y + 5}L${x + 5},${y - 5}`).attr(
            "class",
            `commit ${typeClass} ${commit2.id} commit${branchPos.get(commit2.branch).index % THEME_COLOR_LIMIT}`
          );
        }
      }
    }
    if (dir === "TB" || dir === "BT") {
      commitPos.set(commit2.id, { x, y: posWithOffset });
    } else {
      commitPos.set(commit2.id, { x: posWithOffset, y });
    }
    if (modifyGraph) {
      const px = 4;
      const py = 2;
      if (commit2.type !== commitType2.CHERRY_PICK && (commit2.customId && commit2.type === commitType2.MERGE || commit2.type !== commitType2.MERGE) && gitGraphConfig.showCommitLabel) {
        const wrapper = gLabels.append("g");
        const labelBkg = wrapper.insert("rect").attr("class", "commit-label-bkg");
        const text = wrapper.append("text").attr("x", pos).attr("y", y + 25).attr("class", "commit-label").text(commit2.id);
        let bbox = text.node().getBBox();
        labelBkg.attr("x", posWithOffset - bbox.width / 2 - py).attr("y", y + 13.5).attr("width", bbox.width + 2 * py).attr("height", bbox.height + 2 * py);
        if (dir === "TB" || dir === "BT") {
          labelBkg.attr("x", x - (bbox.width + 4 * px + 5)).attr("y", y - 12);
          text.attr("x", x - (bbox.width + 4 * px)).attr("y", y + bbox.height - 12);
        } else {
          text.attr("x", posWithOffset - bbox.width / 2);
        }
        if (gitGraphConfig.rotateCommitLabel) {
          if (dir === "TB" || dir === "BT") {
            text.attr("transform", "rotate(-45, " + x + ", " + y + ")");
            labelBkg.attr("transform", "rotate(-45, " + x + ", " + y + ")");
          } else {
            let r_x = -7.5 - (bbox.width + 10) / 25 * 9.5;
            let r_y = 10 + bbox.width / 25 * 8.5;
            wrapper.attr(
              "transform",
              "translate(" + r_x + ", " + r_y + ") rotate(-45, " + pos + ", " + y + ")"
            );
          }
        }
      }
      if (commit2.tags.length > 0) {
        let yOffset = 0;
        let maxTagBboxWidth = 0;
        let maxTagBboxHeight = 0;
        const tagElements = [];
        for (const tagValue of commit2.tags.reverse()) {
          const rect = gLabels.insert("polygon");
          const hole = gLabels.append("circle");
          const tag = gLabels.append("text").attr("y", y - 16 - yOffset).attr("class", "tag-label").text(tagValue);
          let tagBbox = tag.node().getBBox();
          maxTagBboxWidth = Math.max(maxTagBboxWidth, tagBbox.width);
          maxTagBboxHeight = Math.max(maxTagBboxHeight, tagBbox.height);
          tag.attr("x", posWithOffset - tagBbox.width / 2);
          tagElements.push({
            tag,
            hole,
            rect,
            yOffset
          });
          yOffset += 20;
        }
        for (const { tag, hole, rect, yOffset: yOffset2 } of tagElements) {
          const h2 = maxTagBboxHeight / 2;
          const ly = y - 19.2 - yOffset2;
          rect.attr("class", "tag-label-bkg").attr(
            "points",
            `
            ${pos - maxTagBboxWidth / 2 - px / 2},${ly + py}
            ${pos - maxTagBboxWidth / 2 - px / 2},${ly - py}
            ${posWithOffset - maxTagBboxWidth / 2 - px},${ly - h2 - py}
            ${posWithOffset + maxTagBboxWidth / 2 + px},${ly - h2 - py}
            ${posWithOffset + maxTagBboxWidth / 2 + px},${ly + h2 + py}
            ${posWithOffset - maxTagBboxWidth / 2 - px},${ly + h2 + py}`
          );
          hole.attr("cy", ly).attr("cx", pos - maxTagBboxWidth / 2 + px / 2).attr("r", 1.5).attr("class", "tag-hole");
          if (dir === "TB" || dir === "BT") {
            const yOrigin = pos + yOffset2;
            rect.attr("class", "tag-label-bkg").attr(
              "points",
              `
              ${x},${yOrigin + py}
              ${x},${yOrigin - py}
              ${x + layoutOffset},${yOrigin - h2 - py}
              ${x + layoutOffset + maxTagBboxWidth + px},${yOrigin - h2 - py}
              ${x + layoutOffset + maxTagBboxWidth + px},${yOrigin + h2 + py}
              ${x + layoutOffset},${yOrigin + h2 + py}`
            ).attr("transform", "translate(12,12) rotate(45, " + x + "," + pos + ")");
            hole.attr("cx", x + px / 2).attr("cy", yOrigin).attr("transform", "translate(12,12) rotate(45, " + x + "," + pos + ")");
            tag.attr("x", x + 5).attr("y", yOrigin + 3).attr("transform", "translate(14,14) rotate(45, " + x + "," + pos + ")");
          }
        }
      }
    }
    pos = dir === "BT" && isParallelCommits ? pos + commitStep : pos + commitStep + layoutOffset;
    if (pos > maxPos) {
      maxPos = pos;
    }
  });
}, "drawCommits");
var shouldRerouteArrow = /* @__PURE__ */ __name((commitA, commitB, p1, p2, allCommits) => {
  const commitBIsFurthest = dir === "TB" || dir === "BT" ? p1.x < p2.x : p1.y < p2.y;
  const branchToGetCurve = commitBIsFurthest ? commitB.branch : commitA.branch;
  const isOnBranchToGetCurve = /* @__PURE__ */ __name((x) => x.branch === branchToGetCurve, "isOnBranchToGetCurve");
  const isBetweenCommits = /* @__PURE__ */ __name((x) => x.seq > commitA.seq && x.seq < commitB.seq, "isBetweenCommits");
  return [...allCommits.values()].some((commitX) => {
    return isBetweenCommits(commitX) && isOnBranchToGetCurve(commitX);
  });
}, "shouldRerouteArrow");
var findLane = /* @__PURE__ */ __name((y1, y2, depth = 0) => {
  const candidate = y1 + Math.abs(y1 - y2) / 2;
  if (depth > 5) {
    return candidate;
  }
  let ok = lanes.every((lane) => Math.abs(lane - candidate) >= 10);
  if (ok) {
    lanes.push(candidate);
    return candidate;
  }
  const diff = Math.abs(y1 - y2);
  return findLane(y1, y2 - diff / 5, depth + 1);
}, "findLane");
var drawArrow = /* @__PURE__ */ __name((svg, commitA, commitB, allCommits) => {
  const p1 = commitPos.get(commitA.id);
  const p2 = commitPos.get(commitB.id);
  const arrowNeedsRerouting = shouldRerouteArrow(commitA, commitB, p1, p2, allCommits);
  let arc = "";
  let arc2 = "";
  let radius = 0;
  let offset = 0;
  let colorClassNum = branchPos.get(commitB.branch).index;
  if (commitB.type === commitType2.MERGE && commitA.id !== commitB.parents[0]) {
    colorClassNum = branchPos.get(commitA.branch).index;
  }
  let lineDef;
  if (arrowNeedsRerouting) {
    arc = "A 10 10, 0, 0, 0,";
    arc2 = "A 10 10, 0, 0, 1,";
    radius = 10;
    offset = 10;
    const lineY = p1.y < p2.y ? findLane(p1.y, p2.y) : findLane(p2.y, p1.y);
    const lineX = p1.x < p2.x ? findLane(p1.x, p2.x) : findLane(p2.x, p1.x);
    if (dir === "TB") {
      if (p1.x < p2.x) {
        lineDef = `M ${p1.x} ${p1.y} L ${lineX - radius} ${p1.y} ${arc2} ${lineX} ${p1.y + offset} L ${lineX} ${p2.y - radius} ${arc} ${lineX + offset} ${p2.y} L ${p2.x} ${p2.y}`;
      } else {
        colorClassNum = branchPos.get(commitA.branch).index;
        lineDef = `M ${p1.x} ${p1.y} L ${lineX + radius} ${p1.y} ${arc} ${lineX} ${p1.y + offset} L ${lineX} ${p2.y - radius} ${arc2} ${lineX - offset} ${p2.y} L ${p2.x} ${p2.y}`;
      }
    } else if (dir === "BT") {
      if (p1.x < p2.x) {
        lineDef = `M ${p1.x} ${p1.y} L ${lineX - radius} ${p1.y} ${arc} ${lineX} ${p1.y - offset} L ${lineX} ${p2.y + radius} ${arc2} ${lineX + offset} ${p2.y} L ${p2.x} ${p2.y}`;
      } else {
        colorClassNum = branchPos.get(commitA.branch).index;
        lineDef = `M ${p1.x} ${p1.y} L ${lineX + radius} ${p1.y} ${arc2} ${lineX} ${p1.y - offset} L ${lineX} ${p2.y + radius} ${arc} ${lineX - offset} ${p2.y} L ${p2.x} ${p2.y}`;
      }
    } else {
      if (p1.y < p2.y) {
        lineDef = `M ${p1.x} ${p1.y} L ${p1.x} ${lineY - radius} ${arc} ${p1.x + offset} ${lineY} L ${p2.x - radius} ${lineY} ${arc2} ${p2.x} ${lineY + offset} L ${p2.x} ${p2.y}`;
      } else {
        colorClassNum = branchPos.get(commitA.branch).index;
        lineDef = `M ${p1.x} ${p1.y} L ${p1.x} ${lineY + radius} ${arc2} ${p1.x + offset} ${lineY} L ${p2.x - radius} ${lineY} ${arc} ${p2.x} ${lineY - offset} L ${p2.x} ${p2.y}`;
      }
    }
  } else {
    arc = "A 20 20, 0, 0, 0,";
    arc2 = "A 20 20, 0, 0, 1,";
    radius = 20;
    offset = 20;
    if (dir === "TB") {
      if (p1.x < p2.x) {
        if (commitB.type === commitType2.MERGE && commitA.id !== commitB.parents[0]) {
          lineDef = `M ${p1.x} ${p1.y} L ${p1.x} ${p2.y - radius} ${arc} ${p1.x + offset} ${p2.y} L ${p2.x} ${p2.y}`;
        } else {
          lineDef = `M ${p1.x} ${p1.y} L ${p2.x - radius} ${p1.y} ${arc2} ${p2.x} ${p1.y + offset} L ${p2.x} ${p2.y}`;
        }
      }
      if (p1.x > p2.x) {
        arc = "A 20 20, 0, 0, 0,";
        arc2 = "A 20 20, 0, 0, 1,";
        radius = 20;
        offset = 20;
        if (commitB.type === commitType2.MERGE && commitA.id !== commitB.parents[0]) {
          lineDef = `M ${p1.x} ${p1.y} L ${p1.x} ${p2.y - radius} ${arc2} ${p1.x - offset} ${p2.y} L ${p2.x} ${p2.y}`;
        } else {
          lineDef = `M ${p1.x} ${p1.y} L ${p2.x + radius} ${p1.y} ${arc} ${p2.x} ${p1.y + offset} L ${p2.x} ${p2.y}`;
        }
      }
      if (p1.x === p2.x) {
        lineDef = `M ${p1.x} ${p1.y} L ${p2.x} ${p2.y}`;
      }
    } else if (dir === "BT") {
      if (p1.x < p2.x) {
        if (commitB.type === commitType2.MERGE && commitA.id !== commitB.parents[0]) {
          lineDef = `M ${p1.x} ${p1.y} L ${p1.x} ${p2.y + radius} ${arc2} ${p1.x + offset} ${p2.y} L ${p2.x} ${p2.y}`;
        } else {
          lineDef = `M ${p1.x} ${p1.y} L ${p2.x - radius} ${p1.y} ${arc} ${p2.x} ${p1.y - offset} L ${p2.x} ${p2.y}`;
        }
      }
      if (p1.x > p2.x) {
        arc = "A 20 20, 0, 0, 0,";
        arc2 = "A 20 20, 0, 0, 1,";
        radius = 20;
        offset = 20;
        if (commitB.type === commitType2.MERGE && commitA.id !== commitB.parents[0]) {
          lineDef = `M ${p1.x} ${p1.y} L ${p1.x} ${p2.y + radius} ${arc} ${p1.x - offset} ${p2.y} L ${p2.x} ${p2.y}`;
        } else {
          lineDef = `M ${p1.x} ${p1.y} L ${p2.x - radius} ${p1.y} ${arc} ${p2.x} ${p1.y - offset} L ${p2.x} ${p2.y}`;
        }
      }
      if (p1.x === p2.x) {
        lineDef = `M ${p1.x} ${p1.y} L ${p2.x} ${p2.y}`;
      }
    } else {
      if (p1.y < p2.y) {
        if (commitB.type === commitType2.MERGE && commitA.id !== commitB.parents[0]) {
          lineDef = `M ${p1.x} ${p1.y} L ${p2.x - radius} ${p1.y} ${arc2} ${p2.x} ${p1.y + offset} L ${p2.x} ${p2.y}`;
        } else {
          lineDef = `M ${p1.x} ${p1.y} L ${p1.x} ${p2.y - radius} ${arc} ${p1.x + offset} ${p2.y} L ${p2.x} ${p2.y}`;
        }
      }
      if (p1.y > p2.y) {
        if (commitB.type === commitType2.MERGE && commitA.id !== commitB.parents[0]) {
          lineDef = `M ${p1.x} ${p1.y} L ${p2.x - radius} ${p1.y} ${arc} ${p2.x} ${p1.y - offset} L ${p2.x} ${p2.y}`;
        } else {
          lineDef = `M ${p1.x} ${p1.y} L ${p1.x} ${p2.y + radius} ${arc2} ${p1.x + offset} ${p2.y} L ${p2.x} ${p2.y}`;
        }
      }
      if (p1.y === p2.y) {
        lineDef = `M ${p1.x} ${p1.y} L ${p2.x} ${p2.y}`;
      }
    }
  }
  svg.append("path").attr("d", lineDef).attr("class", "arrow arrow" + colorClassNum % THEME_COLOR_LIMIT);
}, "drawArrow");
var drawArrows = /* @__PURE__ */ __name((svg, commits2) => {
  const gArrows = svg.append("g").attr("class", "commit-arrows");
  [...commits2.keys()].forEach((key) => {
    const commit2 = commits2.get(key);
    if (commit2.parents && commit2.parents.length > 0) {
      commit2.parents.forEach((parent) => {
        drawArrow(gArrows, commits2.get(parent), commit2, commits2);
      });
    }
  });
}, "drawArrows");
var drawBranches = /* @__PURE__ */ __name((svg, branches2) => {
  const gitGraphConfig = getConfig().gitGraph;
  const g = svg.append("g");
  branches2.forEach((branch2, index) => {
    const adjustIndexForTheme = index % THEME_COLOR_LIMIT;
    const pos = branchPos.get(branch2.name).pos;
    const line = g.append("line");
    line.attr("x1", 0);
    line.attr("y1", pos);
    line.attr("x2", maxPos);
    line.attr("y2", pos);
    line.attr("class", "branch branch" + adjustIndexForTheme);
    if (dir === "TB") {
      line.attr("y1", defaultPos);
      line.attr("x1", pos);
      line.attr("y2", maxPos);
      line.attr("x2", pos);
    } else if (dir === "BT") {
      line.attr("y1", maxPos);
      line.attr("x1", pos);
      line.attr("y2", defaultPos);
      line.attr("x2", pos);
    }
    lanes.push(pos);
    let name = branch2.name;
    const labelElement = drawText(name);
    const bkg = g.insert("rect");
    const branchLabel = g.insert("g").attr("class", "branchLabel");
    const label = branchLabel.insert("g").attr("class", "label branch-label" + adjustIndexForTheme);
    label.node().appendChild(labelElement);
    let bbox = labelElement.getBBox();
    bkg.attr("class", "branchLabelBkg label" + adjustIndexForTheme).attr("rx", 4).attr("ry", 4).attr("x", -bbox.width - 4 - (gitGraphConfig.rotateCommitLabel === true ? 30 : 0)).attr("y", -bbox.height / 2 + 8).attr("width", bbox.width + 18).attr("height", bbox.height + 4);
    label.attr(
      "transform",
      "translate(" + (-bbox.width - 14 - (gitGraphConfig.rotateCommitLabel === true ? 30 : 0)) + ", " + (pos - bbox.height / 2 - 1) + ")"
    );
    if (dir === "TB") {
      bkg.attr("x", pos - bbox.width / 2 - 10).attr("y", 0);
      label.attr("transform", "translate(" + (pos - bbox.width / 2 - 5) + ", 0)");
    } else if (dir === "BT") {
      bkg.attr("x", pos - bbox.width / 2 - 10).attr("y", maxPos);
      label.attr("transform", "translate(" + (pos - bbox.width / 2 - 5) + ", " + maxPos + ")");
    } else {
      bkg.attr("transform", "translate(-19, " + (pos - bbox.height / 2) + ")");
    }
  });
}, "drawBranches");
var draw = /* @__PURE__ */ __name(function(txt, id, ver, diagObj) {
  clear3();
  const conf = getConfig();
  const gitGraphConfig = conf.gitGraph;
  log.debug("in gitgraph renderer", txt + "\n", "id:", id, ver);
  allCommitsDict = diagObj.db.getCommits();
  const branches2 = diagObj.db.getBranchesAsObjArray();
  dir = diagObj.db.getDirection();
  const diagram2 = select_default(`[id="${id}"]`);
  let pos = 0;
  branches2.forEach((branch2, index) => {
    const labelElement = drawText(branch2.name);
    const g = diagram2.append("g");
    const branchLabel = g.insert("g").attr("class", "branchLabel");
    const label = branchLabel.insert("g").attr("class", "label branch-label");
    label.node().appendChild(labelElement);
    let bbox = labelElement.getBBox();
    branchPos.set(branch2.name, { pos, index });
    pos += 50 + (gitGraphConfig.rotateCommitLabel ? 40 : 0) + (dir === "TB" || dir === "BT" ? bbox.width / 2 : 0);
    label.remove();
    branchLabel.remove();
    g.remove();
  });
  drawCommits(diagram2, allCommitsDict, false);
  if (gitGraphConfig.showBranches) {
    drawBranches(diagram2, branches2);
  }
  drawArrows(diagram2, allCommitsDict);
  drawCommits(diagram2, allCommitsDict, true);
  utils_default.insertTitle(
    diagram2,
    "gitTitleText",
    gitGraphConfig.titleTopMargin,
    diagObj.db.getDiagramTitle()
  );
  setupGraphViewbox(
    void 0,
    diagram2,
    gitGraphConfig.diagramPadding,
    gitGraphConfig.useMaxWidth ?? conf.useMaxWidth
  );
}, "draw");
var gitGraphRenderer_default = {
  draw
};

// src/diagrams/git/styles.js
var getStyles = /* @__PURE__ */ __name((options2) => `
  .commit-id,
  .commit-msg,
  .branch-label {
    fill: lightgrey;
    color: lightgrey;
    font-family: 'trebuchet ms', verdana, arial, sans-serif;
    font-family: var(--mermaid-font-family);
  }
  ${[0, 1, 2, 3, 4, 5, 6, 7].map(
  (i) => `
        .branch-label${i} { fill: ${options2["gitBranchLabel" + i]}; }
        .commit${i} { stroke: ${options2["git" + i]}; fill: ${options2["git" + i]}; }
        .commit-highlight${i} { stroke: ${options2["gitInv" + i]}; fill: ${options2["gitInv" + i]}; }
        .label${i}  { fill: ${options2["git" + i]}; }
        .arrow${i} { stroke: ${options2["git" + i]}; }
        `
).join("\n")}

  .branch {
    stroke-width: 1;
    stroke: ${options2.lineColor};
    stroke-dasharray: 2;
  }
  .commit-label { font-size: ${options2.commitLabelFontSize}; fill: ${options2.commitLabelColor};}
  .commit-label-bkg { font-size: ${options2.commitLabelFontSize}; fill: ${options2.commitLabelBackground}; opacity: 0.5; }
  .tag-label { font-size: ${options2.tagLabelFontSize}; fill: ${options2.tagLabelColor};}
  .tag-label-bkg { fill: ${options2.tagLabelBackground}; stroke: ${options2.tagLabelBorder}; }
  .tag-hole { fill: ${options2.textColor}; }

  .commit-merge {
    stroke: ${options2.primaryColor};
    fill: ${options2.primaryColor};
  }
  .commit-reverse {
    stroke: ${options2.primaryColor};
    fill: ${options2.primaryColor};
    stroke-width: 3;
  }
  .commit-highlight-outer {
  }
  .commit-highlight-inner {
    stroke: ${options2.primaryColor};
    fill: ${options2.primaryColor};
  }

  .arrow { stroke-width: 8; stroke-linecap: round; fill: none}
  .gitTitleText {
    text-anchor: middle;
    font-size: 18px;
    fill: ${options2.textColor};
  }
`, "getStyles");
var styles_default = getStyles;

// src/diagrams/git/gitGraphDiagram.ts
var diagram = {
  parser: gitGraph_default,
  db: gitGraphAst_default,
  renderer: gitGraphRenderer_default,
  styles: styles_default
};
export {
  diagram
};
