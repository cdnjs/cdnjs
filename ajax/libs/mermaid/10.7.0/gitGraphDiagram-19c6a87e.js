import { c as C, s as Ce, g as ve, a as Oe, b as Ae, B as Ie, D as Pe, l as S, f as D, E as Se, H as Ge, j as Ne, z as He, I as Be } from "./mermaid-ee29d047.js";
var me = function() {
  var r = function(q, u, g, x) {
    for (g = g || {}, x = q.length; x--; g[q[x]] = u)
      ;
    return g;
  }, n = [1, 3], o = [1, 6], m = [1, 4], a = [1, 5], c = [2, 5], l = [1, 12], h = [5, 7, 13, 19, 21, 23, 24, 26, 28, 31, 37, 40, 47], y = [7, 13, 19, 21, 23, 24, 26, 28, 31, 37, 40], k = [7, 12, 13, 19, 21, 23, 24, 26, 28, 31, 37, 40], i = [7, 13, 47], b = [1, 42], f = [1, 41], _ = [7, 13, 29, 32, 35, 38, 47], p = [1, 55], d = [1, 56], E = [1, 57], H = [7, 13, 32, 35, 42, 47], T = {
    trace: function() {
    },
    yy: {},
    symbols_: { error: 2, start: 3, eol: 4, GG: 5, document: 6, EOF: 7, ":": 8, DIR: 9, options: 10, body: 11, OPT: 12, NL: 13, line: 14, statement: 15, commitStatement: 16, mergeStatement: 17, cherryPickStatement: 18, acc_title: 19, acc_title_value: 20, acc_descr: 21, acc_descr_value: 22, acc_descr_multiline_value: 23, section: 24, branchStatement: 25, CHECKOUT: 26, ref: 27, BRANCH: 28, ORDER: 29, NUM: 30, CHERRY_PICK: 31, COMMIT_ID: 32, STR: 33, PARENT_COMMIT: 34, COMMIT_TAG: 35, EMPTYSTR: 36, MERGE: 37, COMMIT_TYPE: 38, commitType: 39, COMMIT: 40, commit_arg: 41, COMMIT_MSG: 42, NORMAL: 43, REVERSE: 44, HIGHLIGHT: 45, ID: 46, ";": 47, $accept: 0, $end: 1 },
    terminals_: { 2: "error", 5: "GG", 7: "EOF", 8: ":", 9: "DIR", 12: "OPT", 13: "NL", 19: "acc_title", 20: "acc_title_value", 21: "acc_descr", 22: "acc_descr_value", 23: "acc_descr_multiline_value", 24: "section", 26: "CHECKOUT", 28: "BRANCH", 29: "ORDER", 30: "NUM", 31: "CHERRY_PICK", 32: "COMMIT_ID", 33: "STR", 34: "PARENT_COMMIT", 35: "COMMIT_TAG", 36: "EMPTYSTR", 37: "MERGE", 38: "COMMIT_TYPE", 40: "COMMIT", 42: "COMMIT_MSG", 43: "NORMAL", 44: "REVERSE", 45: "HIGHLIGHT", 46: "ID", 47: ";" },
    productions_: [0, [3, 2], [3, 3], [3, 4], [3, 5], [6, 0], [6, 2], [10, 2], [10, 1], [11, 0], [11, 2], [14, 2], [14, 1], [15, 1], [15, 1], [15, 1], [15, 2], [15, 2], [15, 1], [15, 1], [15, 1], [15, 2], [25, 2], [25, 4], [18, 3], [18, 5], [18, 5], [18, 7], [18, 7], [18, 5], [18, 5], [18, 5], [18, 7], [18, 7], [18, 7], [18, 7], [17, 2], [17, 4], [17, 4], [17, 4], [17, 6], [17, 6], [17, 6], [17, 6], [17, 6], [17, 6], [17, 8], [17, 8], [17, 8], [17, 8], [17, 8], [17, 8], [16, 2], [16, 3], [16, 3], [16, 5], [16, 5], [16, 3], [16, 5], [16, 5], [16, 5], [16, 5], [16, 7], [16, 7], [16, 7], [16, 7], [16, 7], [16, 7], [16, 3], [16, 5], [16, 5], [16, 5], [16, 5], [16, 5], [16, 5], [16, 7], [16, 7], [16, 7], [16, 7], [16, 7], [16, 7], [16, 7], [16, 7], [16, 7], [16, 7], [16, 7], [16, 7], [16, 7], [16, 7], [16, 7], [16, 7], [16, 7], [16, 7], [16, 9], [16, 9], [16, 9], [16, 9], [16, 9], [16, 9], [16, 9], [16, 9], [16, 9], [16, 9], [16, 9], [16, 9], [16, 9], [16, 9], [16, 9], [16, 9], [16, 9], [16, 9], [16, 9], [16, 9], [16, 9], [16, 9], [16, 9], [16, 9], [41, 0], [41, 1], [39, 1], [39, 1], [39, 1], [27, 1], [27, 1], [4, 1], [4, 1], [4, 1]],
    performAction: function(u, g, x, s, w, e, Q) {
      var t = e.length - 1;
      switch (w) {
        case 2:
          return e[t];
        case 3:
          return e[t - 1];
        case 4:
          return s.setDirection(e[t - 3]), e[t - 1];
        case 6:
          s.setOptions(e[t - 1]), this.$ = e[t];
          break;
        case 7:
          e[t - 1] += e[t], this.$ = e[t - 1];
          break;
        case 9:
          this.$ = [];
          break;
        case 10:
          e[t - 1].push(e[t]), this.$ = e[t - 1];
          break;
        case 11:
          this.$ = e[t - 1];
          break;
        case 16:
          this.$ = e[t].trim(), s.setAccTitle(this.$);
          break;
        case 17:
        case 18:
          this.$ = e[t].trim(), s.setAccDescription(this.$);
          break;
        case 19:
          s.addSection(e[t].substr(8)), this.$ = e[t].substr(8);
          break;
        case 21:
          s.checkout(e[t]);
          break;
        case 22:
          s.branch(e[t]);
          break;
        case 23:
          s.branch(e[t - 2], e[t]);
          break;
        case 24:
          s.cherryPick(e[t], "", void 0);
          break;
        case 25:
          s.cherryPick(e[t - 2], "", void 0, e[t]);
          break;
        case 26:
          s.cherryPick(e[t - 2], "", e[t]);
          break;
        case 27:
          s.cherryPick(e[t - 4], "", e[t], e[t - 2]);
          break;
        case 28:
          s.cherryPick(e[t - 4], "", e[t - 2], e[t]);
          break;
        case 29:
          s.cherryPick(e[t], "", e[t - 2]);
          break;
        case 30:
          s.cherryPick(e[t], "", "");
          break;
        case 31:
          s.cherryPick(e[t - 2], "", "");
          break;
        case 32:
          s.cherryPick(e[t - 4], "", "", e[t - 2]);
          break;
        case 33:
          s.cherryPick(e[t - 4], "", "", e[t]);
          break;
        case 34:
          s.cherryPick(e[t - 2], "", e[t - 4], e[t]);
          break;
        case 35:
          s.cherryPick(e[t - 2], "", "", e[t]);
          break;
        case 36:
          s.merge(e[t], "", "", "");
          break;
        case 37:
          s.merge(e[t - 2], e[t], "", "");
          break;
        case 38:
          s.merge(e[t - 2], "", e[t], "");
          break;
        case 39:
          s.merge(e[t - 2], "", "", e[t]);
          break;
        case 40:
          s.merge(e[t - 4], e[t], "", e[t - 2]);
          break;
        case 41:
          s.merge(e[t - 4], "", e[t], e[t - 2]);
          break;
        case 42:
          s.merge(e[t - 4], "", e[t - 2], e[t]);
          break;
        case 43:
          s.merge(e[t - 4], e[t - 2], e[t], "");
          break;
        case 44:
          s.merge(e[t - 4], e[t - 2], "", e[t]);
          break;
        case 45:
          s.merge(e[t - 4], e[t], e[t - 2], "");
          break;
        case 46:
          s.merge(e[t - 6], e[t - 4], e[t - 2], e[t]);
          break;
        case 47:
          s.merge(e[t - 6], e[t], e[t - 4], e[t - 2]);
          break;
        case 48:
          s.merge(e[t - 6], e[t - 4], e[t], e[t - 2]);
          break;
        case 49:
          s.merge(e[t - 6], e[t - 2], e[t - 4], e[t]);
          break;
        case 50:
          s.merge(e[t - 6], e[t], e[t - 2], e[t - 4]);
          break;
        case 51:
          s.merge(e[t - 6], e[t - 2], e[t], e[t - 4]);
          break;
        case 52:
          s.commit(e[t]);
          break;
        case 53:
          s.commit("", "", s.commitType.NORMAL, e[t]);
          break;
        case 54:
          s.commit("", "", e[t], "");
          break;
        case 55:
          s.commit("", "", e[t], e[t - 2]);
          break;
        case 56:
          s.commit("", "", e[t - 2], e[t]);
          break;
        case 57:
          s.commit("", e[t], s.commitType.NORMAL, "");
          break;
        case 58:
          s.commit("", e[t - 2], s.commitType.NORMAL, e[t]);
          break;
        case 59:
          s.commit("", e[t], s.commitType.NORMAL, e[t - 2]);
          break;
        case 60:
          s.commit("", e[t - 2], e[t], "");
          break;
        case 61:
          s.commit("", e[t], e[t - 2], "");
          break;
        case 62:
          s.commit("", e[t - 4], e[t - 2], e[t]);
          break;
        case 63:
          s.commit("", e[t - 4], e[t], e[t - 2]);
          break;
        case 64:
          s.commit("", e[t - 2], e[t - 4], e[t]);
          break;
        case 65:
          s.commit("", e[t], e[t - 4], e[t - 2]);
          break;
        case 66:
          s.commit("", e[t], e[t - 2], e[t - 4]);
          break;
        case 67:
          s.commit("", e[t - 2], e[t], e[t - 4]);
          break;
        case 68:
          s.commit(e[t], "", s.commitType.NORMAL, "");
          break;
        case 69:
          s.commit(e[t], "", s.commitType.NORMAL, e[t - 2]);
          break;
        case 70:
          s.commit(e[t - 2], "", s.commitType.NORMAL, e[t]);
          break;
        case 71:
          s.commit(e[t - 2], "", e[t], "");
          break;
        case 72:
          s.commit(e[t], "", e[t - 2], "");
          break;
        case 73:
          s.commit(e[t], e[t - 2], s.commitType.NORMAL, "");
          break;
        case 74:
          s.commit(e[t - 2], e[t], s.commitType.NORMAL, "");
          break;
        case 75:
          s.commit(e[t - 4], "", e[t - 2], e[t]);
          break;
        case 76:
          s.commit(e[t - 4], "", e[t], e[t - 2]);
          break;
        case 77:
          s.commit(e[t - 2], "", e[t - 4], e[t]);
          break;
        case 78:
          s.commit(e[t], "", e[t - 4], e[t - 2]);
          break;
        case 79:
          s.commit(e[t], "", e[t - 2], e[t - 4]);
          break;
        case 80:
          s.commit(e[t - 2], "", e[t], e[t - 4]);
          break;
        case 81:
          s.commit(e[t - 4], e[t], e[t - 2], "");
          break;
        case 82:
          s.commit(e[t - 4], e[t - 2], e[t], "");
          break;
        case 83:
          s.commit(e[t - 2], e[t], e[t - 4], "");
          break;
        case 84:
          s.commit(e[t], e[t - 2], e[t - 4], "");
          break;
        case 85:
          s.commit(e[t], e[t - 4], e[t - 2], "");
          break;
        case 86:
          s.commit(e[t - 2], e[t - 4], e[t], "");
          break;
        case 87:
          s.commit(e[t - 4], e[t], s.commitType.NORMAL, e[t - 2]);
          break;
        case 88:
          s.commit(e[t - 4], e[t - 2], s.commitType.NORMAL, e[t]);
          break;
        case 89:
          s.commit(e[t - 2], e[t], s.commitType.NORMAL, e[t - 4]);
          break;
        case 90:
          s.commit(e[t], e[t - 2], s.commitType.NORMAL, e[t - 4]);
          break;
        case 91:
          s.commit(e[t], e[t - 4], s.commitType.NORMAL, e[t - 2]);
          break;
        case 92:
          s.commit(e[t - 2], e[t - 4], s.commitType.NORMAL, e[t]);
          break;
        case 93:
          s.commit(e[t - 6], e[t - 4], e[t - 2], e[t]);
          break;
        case 94:
          s.commit(e[t - 6], e[t - 4], e[t], e[t - 2]);
          break;
        case 95:
          s.commit(e[t - 6], e[t - 2], e[t - 4], e[t]);
          break;
        case 96:
          s.commit(e[t - 6], e[t], e[t - 4], e[t - 2]);
          break;
        case 97:
          s.commit(e[t - 6], e[t - 2], e[t], e[t - 4]);
          break;
        case 98:
          s.commit(e[t - 6], e[t], e[t - 2], e[t - 4]);
          break;
        case 99:
          s.commit(e[t - 4], e[t - 6], e[t - 2], e[t]);
          break;
        case 100:
          s.commit(e[t - 4], e[t - 6], e[t], e[t - 2]);
          break;
        case 101:
          s.commit(e[t - 2], e[t - 6], e[t - 4], e[t]);
          break;
        case 102:
          s.commit(e[t], e[t - 6], e[t - 4], e[t - 2]);
          break;
        case 103:
          s.commit(e[t - 2], e[t - 6], e[t], e[t - 4]);
          break;
        case 104:
          s.commit(e[t], e[t - 6], e[t - 2], e[t - 4]);
          break;
        case 105:
          s.commit(e[t], e[t - 4], e[t - 2], e[t - 6]);
          break;
        case 106:
          s.commit(e[t - 2], e[t - 4], e[t], e[t - 6]);
          break;
        case 107:
          s.commit(e[t], e[t - 2], e[t - 4], e[t - 6]);
          break;
        case 108:
          s.commit(e[t - 2], e[t], e[t - 4], e[t - 6]);
          break;
        case 109:
          s.commit(e[t - 4], e[t - 2], e[t], e[t - 6]);
          break;
        case 110:
          s.commit(e[t - 4], e[t], e[t - 2], e[t - 6]);
          break;
        case 111:
          s.commit(e[t - 2], e[t - 4], e[t - 6], e[t]);
          break;
        case 112:
          s.commit(e[t], e[t - 4], e[t - 6], e[t - 2]);
          break;
        case 113:
          s.commit(e[t - 2], e[t], e[t - 6], e[t - 4]);
          break;
        case 114:
          s.commit(e[t], e[t - 2], e[t - 6], e[t - 4]);
          break;
        case 115:
          s.commit(e[t - 4], e[t - 2], e[t - 6], e[t]);
          break;
        case 116:
          s.commit(e[t - 4], e[t], e[t - 6], e[t - 2]);
          break;
        case 117:
          this.$ = "";
          break;
        case 118:
          this.$ = e[t];
          break;
        case 119:
          this.$ = s.commitType.NORMAL;
          break;
        case 120:
          this.$ = s.commitType.REVERSE;
          break;
        case 121:
          this.$ = s.commitType.HIGHLIGHT;
          break;
      }
    },
    table: [{ 3: 1, 4: 2, 5: n, 7: o, 13: m, 47: a }, { 1: [3] }, { 3: 7, 4: 2, 5: n, 7: o, 13: m, 47: a }, { 6: 8, 7: c, 8: [1, 9], 9: [1, 10], 10: 11, 13: l }, r(h, [2, 124]), r(h, [2, 125]), r(h, [2, 126]), { 1: [2, 1] }, { 7: [1, 13] }, { 6: 14, 7: c, 10: 11, 13: l }, { 8: [1, 15] }, r(y, [2, 9], { 11: 16, 12: [1, 17] }), r(k, [2, 8]), { 1: [2, 2] }, { 7: [1, 18] }, { 6: 19, 7: c, 10: 11, 13: l }, { 7: [2, 6], 13: [1, 22], 14: 20, 15: 21, 16: 23, 17: 24, 18: 25, 19: [1, 26], 21: [1, 27], 23: [1, 28], 24: [1, 29], 25: 30, 26: [1, 31], 28: [1, 35], 31: [1, 34], 37: [1, 33], 40: [1, 32] }, r(k, [2, 7]), { 1: [2, 3] }, { 7: [1, 36] }, r(y, [2, 10]), { 4: 37, 7: o, 13: m, 47: a }, r(y, [2, 12]), r(i, [2, 13]), r(i, [2, 14]), r(i, [2, 15]), { 20: [1, 38] }, { 22: [1, 39] }, r(i, [2, 18]), r(i, [2, 19]), r(i, [2, 20]), { 27: 40, 33: b, 46: f }, r(i, [2, 117], { 41: 43, 32: [1, 46], 33: [1, 48], 35: [1, 44], 38: [1, 45], 42: [1, 47] }), { 27: 49, 33: b, 46: f }, { 32: [1, 50], 35: [1, 51] }, { 27: 52, 33: b, 46: f }, { 1: [2, 4] }, r(y, [2, 11]), r(i, [2, 16]), r(i, [2, 17]), r(i, [2, 21]), r(_, [2, 122]), r(_, [2, 123]), r(i, [2, 52]), { 33: [1, 53] }, { 39: 54, 43: p, 44: d, 45: E }, { 33: [1, 58] }, { 33: [1, 59] }, r(i, [2, 118]), r(i, [2, 36], { 32: [1, 60], 35: [1, 62], 38: [1, 61] }), { 33: [1, 63] }, { 33: [1, 64], 36: [1, 65] }, r(i, [2, 22], { 29: [1, 66] }), r(i, [2, 53], { 32: [1, 68], 38: [1, 67], 42: [1, 69] }), r(i, [2, 54], { 32: [1, 71], 35: [1, 70], 42: [1, 72] }), r(H, [2, 119]), r(H, [2, 120]), r(H, [2, 121]), r(i, [2, 57], { 35: [1, 73], 38: [1, 74], 42: [1, 75] }), r(i, [2, 68], { 32: [1, 78], 35: [1, 76], 38: [1, 77] }), { 33: [1, 79] }, { 39: 80, 43: p, 44: d, 45: E }, { 33: [1, 81] }, r(i, [2, 24], { 34: [1, 82], 35: [1, 83] }), { 32: [1, 84] }, { 32: [1, 85] }, { 30: [1, 86] }, { 39: 87, 43: p, 44: d, 45: E }, { 33: [1, 88] }, { 33: [1, 89] }, { 33: [1, 90] }, { 33: [1, 91] }, { 33: [1, 92] }, { 33: [1, 93] }, { 39: 94, 43: p, 44: d, 45: E }, { 33: [1, 95] }, { 33: [1, 96] }, { 39: 97, 43: p, 44: d, 45: E }, { 33: [1, 98] }, r(i, [2, 37], { 35: [1, 100], 38: [1, 99] }), r(i, [2, 38], { 32: [1, 102], 35: [1, 101] }), r(i, [2, 39], { 32: [1, 103], 38: [1, 104] }), { 33: [1, 105] }, { 33: [1, 106], 36: [1, 107] }, { 33: [1, 108] }, { 33: [1, 109] }, r(i, [2, 23]), r(i, [2, 55], { 32: [1, 110], 42: [1, 111] }), r(i, [2, 59], { 38: [1, 112], 42: [1, 113] }), r(i, [2, 69], { 32: [1, 115], 38: [1, 114] }), r(i, [2, 56], { 32: [1, 116], 42: [1, 117] }), r(i, [2, 61], { 35: [1, 118], 42: [1, 119] }), r(i, [2, 72], { 32: [1, 121], 35: [1, 120] }), r(i, [2, 58], { 38: [1, 122], 42: [1, 123] }), r(i, [2, 60], { 35: [1, 124], 42: [1, 125] }), r(i, [2, 73], { 35: [1, 127], 38: [1, 126] }), r(i, [2, 70], { 32: [1, 129], 38: [1, 128] }), r(i, [2, 71], { 32: [1, 131], 35: [1, 130] }), r(i, [2, 74], { 35: [1, 133], 38: [1, 132] }), { 39: 134, 43: p, 44: d, 45: E }, { 33: [1, 135] }, { 33: [1, 136] }, { 33: [1, 137] }, { 33: [1, 138] }, { 39: 139, 43: p, 44: d, 45: E }, r(i, [2, 25], { 35: [1, 140] }), r(i, [2, 26], { 34: [1, 141] }), r(i, [2, 31], { 34: [1, 142] }), r(i, [2, 29], { 34: [1, 143] }), r(i, [2, 30], { 34: [1, 144] }), { 33: [1, 145] }, { 33: [1, 146] }, { 39: 147, 43: p, 44: d, 45: E }, { 33: [1, 148] }, { 39: 149, 43: p, 44: d, 45: E }, { 33: [1, 150] }, { 33: [1, 151] }, { 33: [1, 152] }, { 33: [1, 153] }, { 33: [1, 154] }, { 33: [1, 155] }, { 33: [1, 156] }, { 39: 157, 43: p, 44: d, 45: E }, { 33: [1, 158] }, { 33: [1, 159] }, { 33: [1, 160] }, { 39: 161, 43: p, 44: d, 45: E }, { 33: [1, 162] }, { 39: 163, 43: p, 44: d, 45: E }, { 33: [1, 164] }, { 33: [1, 165] }, { 33: [1, 166] }, { 39: 167, 43: p, 44: d, 45: E }, { 33: [1, 168] }, r(i, [2, 43], { 35: [1, 169] }), r(i, [2, 44], { 38: [1, 170] }), r(i, [2, 42], { 32: [1, 171] }), r(i, [2, 45], { 35: [1, 172] }), r(i, [2, 40], { 38: [1, 173] }), r(i, [2, 41], { 32: [1, 174] }), { 33: [1, 175], 36: [1, 176] }, { 33: [1, 177] }, { 33: [1, 178] }, { 33: [1, 179] }, { 33: [1, 180] }, r(i, [2, 66], { 42: [1, 181] }), r(i, [2, 79], { 32: [1, 182] }), r(i, [2, 67], { 42: [1, 183] }), r(i, [2, 90], { 38: [1, 184] }), r(i, [2, 80], { 32: [1, 185] }), r(i, [2, 89], { 38: [1, 186] }), r(i, [2, 65], { 42: [1, 187] }), r(i, [2, 78], { 32: [1, 188] }), r(i, [2, 64], { 42: [1, 189] }), r(i, [2, 84], { 35: [1, 190] }), r(i, [2, 77], { 32: [1, 191] }), r(i, [2, 83], { 35: [1, 192] }), r(i, [2, 63], { 42: [1, 193] }), r(i, [2, 91], { 38: [1, 194] }), r(i, [2, 62], { 42: [1, 195] }), r(i, [2, 85], { 35: [1, 196] }), r(i, [2, 86], { 35: [1, 197] }), r(i, [2, 92], { 38: [1, 198] }), r(i, [2, 76], { 32: [1, 199] }), r(i, [2, 87], { 38: [1, 200] }), r(i, [2, 75], { 32: [1, 201] }), r(i, [2, 81], { 35: [1, 202] }), r(i, [2, 82], { 35: [1, 203] }), r(i, [2, 88], { 38: [1, 204] }), { 33: [1, 205] }, { 39: 206, 43: p, 44: d, 45: E }, { 33: [1, 207] }, { 33: [1, 208] }, { 39: 209, 43: p, 44: d, 45: E }, { 33: [1, 210] }, r(i, [2, 27]), r(i, [2, 32]), r(i, [2, 28]), r(i, [2, 33]), r(i, [2, 34]), r(i, [2, 35]), { 33: [1, 211] }, { 33: [1, 212] }, { 33: [1, 213] }, { 39: 214, 43: p, 44: d, 45: E }, { 33: [1, 215] }, { 39: 216, 43: p, 44: d, 45: E }, { 33: [1, 217] }, { 33: [1, 218] }, { 33: [1, 219] }, { 33: [1, 220] }, { 33: [1, 221] }, { 33: [1, 222] }, { 33: [1, 223] }, { 39: 224, 43: p, 44: d, 45: E }, { 33: [1, 225] }, { 33: [1, 226] }, { 33: [1, 227] }, { 39: 228, 43: p, 44: d, 45: E }, { 33: [1, 229] }, { 39: 230, 43: p, 44: d, 45: E }, { 33: [1, 231] }, { 33: [1, 232] }, { 33: [1, 233] }, { 39: 234, 43: p, 44: d, 45: E }, r(i, [2, 46]), r(i, [2, 48]), r(i, [2, 47]), r(i, [2, 49]), r(i, [2, 51]), r(i, [2, 50]), r(i, [2, 107]), r(i, [2, 108]), r(i, [2, 105]), r(i, [2, 106]), r(i, [2, 110]), r(i, [2, 109]), r(i, [2, 114]), r(i, [2, 113]), r(i, [2, 112]), r(i, [2, 111]), r(i, [2, 116]), r(i, [2, 115]), r(i, [2, 104]), r(i, [2, 103]), r(i, [2, 102]), r(i, [2, 101]), r(i, [2, 99]), r(i, [2, 100]), r(i, [2, 98]), r(i, [2, 97]), r(i, [2, 96]), r(i, [2, 95]), r(i, [2, 93]), r(i, [2, 94])],
    defaultActions: { 7: [2, 1], 13: [2, 2], 18: [2, 3], 36: [2, 4] },
    parseError: function(u, g) {
      if (g.recoverable)
        this.trace(u);
      else {
        var x = new Error(u);
        throw x.hash = g, x;
      }
    },
    parse: function(u) {
      var g = this, x = [0], s = [], w = [null], e = [], Q = this.table, t = "", re = 0, fe = 0, we = 2, pe = 1, Re = e.slice.call(arguments, 1), v = Object.create(this.lexer), Y = { yy: {} };
      for (var ce in this.yy)
        Object.prototype.hasOwnProperty.call(this.yy, ce) && (Y.yy[ce] = this.yy[ce]);
      v.setInput(u, Y.yy), Y.yy.lexer = v, Y.yy.parser = this, typeof v.yylloc > "u" && (v.yylloc = {});
      var oe = v.yylloc;
      e.push(oe);
      var Le = v.options && v.options.ranges;
      typeof Y.yy.parseError == "function" ? this.parseError = Y.yy.parseError : this.parseError = Object.getPrototypeOf(this).parseError;
      function Me() {
        var j;
        return j = s.pop() || v.lex() || pe, typeof j != "number" && (j instanceof Array && (s = j, j = s.pop()), j = g.symbols_[j] || j), j;
      }
      for (var P, F, V, le, W = {}, ie, z, be, se; ; ) {
        if (F = x[x.length - 1], this.defaultActions[F] ? V = this.defaultActions[F] : ((P === null || typeof P > "u") && (P = Me()), V = Q[F] && Q[F][P]), typeof V > "u" || !V.length || !V[0]) {
          var he = "";
          se = [];
          for (ie in Q[F])
            this.terminals_[ie] && ie > we && se.push("'" + this.terminals_[ie] + "'");
          v.showPosition ? he = "Parse error on line " + (re + 1) + `:
` + v.showPosition() + `
Expecting ` + se.join(", ") + ", got '" + (this.terminals_[P] || P) + "'" : he = "Parse error on line " + (re + 1) + ": Unexpected " + (P == pe ? "end of input" : "'" + (this.terminals_[P] || P) + "'"), this.parseError(he, {
            text: v.match,
            token: this.terminals_[P] || P,
            line: v.yylineno,
            loc: oe,
            expected: se
          });
        }
        if (V[0] instanceof Array && V.length > 1)
          throw new Error("Parse Error: multiple actions possible at state: " + F + ", token: " + P);
        switch (V[0]) {
          case 1:
            x.push(P), w.push(v.yytext), e.push(v.yylloc), x.push(V[1]), P = null, fe = v.yyleng, t = v.yytext, re = v.yylineno, oe = v.yylloc;
            break;
          case 2:
            if (z = this.productions_[V[1]][1], W.$ = w[w.length - z], W._$ = {
              first_line: e[e.length - (z || 1)].first_line,
              last_line: e[e.length - 1].last_line,
              first_column: e[e.length - (z || 1)].first_column,
              last_column: e[e.length - 1].last_column
            }, Le && (W._$.range = [
              e[e.length - (z || 1)].range[0],
              e[e.length - 1].range[1]
            ]), le = this.performAction.apply(W, [
              t,
              fe,
              re,
              Y.yy,
              V[1],
              w,
              e
            ].concat(Re)), typeof le < "u")
              return le;
            z && (x = x.slice(0, -1 * z * 2), w = w.slice(0, -1 * z), e = e.slice(0, -1 * z)), x.push(this.productions_[V[1]][0]), w.push(W.$), e.push(W._$), be = Q[x[x.length - 2]][x[x.length - 1]], x.push(be);
            break;
          case 3:
            return !0;
        }
      }
      return !0;
    }
  }, B = function() {
    var q = {
      EOF: 1,
      parseError: function(g, x) {
        if (this.yy.parser)
          this.yy.parser.parseError(g, x);
        else
          throw new Error(g);
      },
      // resets the lexer, sets new input
      setInput: function(u, g) {
        return this.yy = g || this.yy || {}, this._input = u, this._more = this._backtrack = this.done = !1, this.yylineno = this.yyleng = 0, this.yytext = this.matched = this.match = "", this.conditionStack = ["INITIAL"], this.yylloc = {
          first_line: 1,
          first_column: 0,
          last_line: 1,
          last_column: 0
        }, this.options.ranges && (this.yylloc.range = [0, 0]), this.offset = 0, this;
      },
      // consumes and returns one char from the input
      input: function() {
        var u = this._input[0];
        this.yytext += u, this.yyleng++, this.offset++, this.match += u, this.matched += u;
        var g = u.match(/(?:\r\n?|\n).*/g);
        return g ? (this.yylineno++, this.yylloc.last_line++) : this.yylloc.last_column++, this.options.ranges && this.yylloc.range[1]++, this._input = this._input.slice(1), u;
      },
      // unshifts one char (or a string) into the input
      unput: function(u) {
        var g = u.length, x = u.split(/(?:\r\n?|\n)/g);
        this._input = u + this._input, this.yytext = this.yytext.substr(0, this.yytext.length - g), this.offset -= g;
        var s = this.match.split(/(?:\r\n?|\n)/g);
        this.match = this.match.substr(0, this.match.length - 1), this.matched = this.matched.substr(0, this.matched.length - 1), x.length - 1 && (this.yylineno -= x.length - 1);
        var w = this.yylloc.range;
        return this.yylloc = {
          first_line: this.yylloc.first_line,
          last_line: this.yylineno + 1,
          first_column: this.yylloc.first_column,
          last_column: x ? (x.length === s.length ? this.yylloc.first_column : 0) + s[s.length - x.length].length - x[0].length : this.yylloc.first_column - g
        }, this.options.ranges && (this.yylloc.range = [w[0], w[0] + this.yyleng - g]), this.yyleng = this.yytext.length, this;
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
      less: function(u) {
        this.unput(this.match.slice(u));
      },
      // displays already matched input, i.e. for error messages
      pastInput: function() {
        var u = this.matched.substr(0, this.matched.length - this.match.length);
        return (u.length > 20 ? "..." : "") + u.substr(-20).replace(/\n/g, "");
      },
      // displays upcoming input, i.e. for error messages
      upcomingInput: function() {
        var u = this.match;
        return u.length < 20 && (u += this._input.substr(0, 20 - u.length)), (u.substr(0, 20) + (u.length > 20 ? "..." : "")).replace(/\n/g, "");
      },
      // displays the character position where the lexing error occurred, i.e. for error messages
      showPosition: function() {
        var u = this.pastInput(), g = new Array(u.length + 1).join("-");
        return u + this.upcomingInput() + `
` + g + "^";
      },
      // test the lexed token: return FALSE when not a match, otherwise return token
      test_match: function(u, g) {
        var x, s, w;
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
        }, this.options.ranges && (w.yylloc.range = this.yylloc.range.slice(0))), s = u[0].match(/(?:\r\n?|\n).*/g), s && (this.yylineno += s.length), this.yylloc = {
          first_line: this.yylloc.last_line,
          last_line: this.yylineno + 1,
          first_column: this.yylloc.last_column,
          last_column: s ? s[s.length - 1].length - s[s.length - 1].match(/\r?\n?/)[0].length : this.yylloc.last_column + u[0].length
        }, this.yytext += u[0], this.match += u[0], this.matches = u, this.yyleng = this.yytext.length, this.options.ranges && (this.yylloc.range = [this.offset, this.offset += this.yyleng]), this._more = !1, this._backtrack = !1, this._input = this._input.slice(u[0].length), this.matched += u[0], x = this.performAction.call(this, this.yy, this, g, this.conditionStack[this.conditionStack.length - 1]), this.done && this._input && (this.done = !1), x)
          return x;
        if (this._backtrack) {
          for (var e in w)
            this[e] = w[e];
          return !1;
        }
        return !1;
      },
      // return next match in input
      next: function() {
        if (this.done)
          return this.EOF;
        this._input || (this.done = !0);
        var u, g, x, s;
        this._more || (this.yytext = "", this.match = "");
        for (var w = this._currentRules(), e = 0; e < w.length; e++)
          if (x = this._input.match(this.rules[w[e]]), x && (!g || x[0].length > g[0].length)) {
            if (g = x, s = e, this.options.backtrack_lexer) {
              if (u = this.test_match(x, w[e]), u !== !1)
                return u;
              if (this._backtrack) {
                g = !1;
                continue;
              } else
                return !1;
            } else if (!this.options.flex)
              break;
          }
        return g ? (u = this.test_match(g, w[s]), u !== !1 ? u : !1) : this._input === "" ? this.EOF : this.parseError("Lexical error on line " + (this.yylineno + 1) + `. Unrecognized text.
` + this.showPosition(), {
          text: "",
          token: null,
          line: this.yylineno
        });
      },
      // return next match that has a token
      lex: function() {
        var g = this.next();
        return g || this.lex();
      },
      // activates a new lexer condition state (pushes the new lexer condition state onto the condition stack)
      begin: function(g) {
        this.conditionStack.push(g);
      },
      // pop the previously active lexer condition state off the condition stack
      popState: function() {
        var g = this.conditionStack.length - 1;
        return g > 0 ? this.conditionStack.pop() : this.conditionStack[0];
      },
      // produce the lexer rule set which is active for the currently active lexer condition state
      _currentRules: function() {
        return this.conditionStack.length && this.conditionStack[this.conditionStack.length - 1] ? this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules : this.conditions.INITIAL.rules;
      },
      // return the currently active lexer condition state; when an index argument is provided it produces the N-th previous condition state, if available
      topState: function(g) {
        return g = this.conditionStack.length - 1 - Math.abs(g || 0), g >= 0 ? this.conditionStack[g] : "INITIAL";
      },
      // alias for begin(condition)
      pushState: function(g) {
        this.begin(g);
      },
      // return the number of states currently on the stack
      stateStackSize: function() {
        return this.conditionStack.length;
      },
      options: { "case-insensitive": !0 },
      performAction: function(g, x, s, w) {
        switch (s) {
          case 0:
            return this.begin("acc_title"), 19;
          case 1:
            return this.popState(), "acc_title_value";
          case 2:
            return this.begin("acc_descr"), 21;
          case 3:
            return this.popState(), "acc_descr_value";
          case 4:
            this.begin("acc_descr_multiline");
            break;
          case 5:
            this.popState();
            break;
          case 6:
            return "acc_descr_multiline_value";
          case 7:
            return 13;
          case 8:
            break;
          case 9:
            break;
          case 10:
            return 5;
          case 11:
            return 40;
          case 12:
            return 32;
          case 13:
            return 38;
          case 14:
            return 42;
          case 15:
            return 43;
          case 16:
            return 44;
          case 17:
            return 45;
          case 18:
            return 35;
          case 19:
            return 28;
          case 20:
            return 29;
          case 21:
            return 37;
          case 22:
            return 31;
          case 23:
            return 34;
          case 24:
            return 26;
          case 25:
            return 9;
          case 26:
            return 9;
          case 27:
            return 8;
          case 28:
            return "CARET";
          case 29:
            this.begin("options");
            break;
          case 30:
            this.popState();
            break;
          case 31:
            return 12;
          case 32:
            return 36;
          case 33:
            this.begin("string");
            break;
          case 34:
            this.popState();
            break;
          case 35:
            return 33;
          case 36:
            return 30;
          case 37:
            return 46;
          case 38:
            return 7;
        }
      },
      rules: [/^(?:accTitle\s*:\s*)/i, /^(?:(?!\n||)*[^\n]*)/i, /^(?:accDescr\s*:\s*)/i, /^(?:(?!\n||)*[^\n]*)/i, /^(?:accDescr\s*\{\s*)/i, /^(?:[\}])/i, /^(?:[^\}]*)/i, /^(?:(\r?\n)+)/i, /^(?:#[^\n]*)/i, /^(?:%[^\n]*)/i, /^(?:gitGraph\b)/i, /^(?:commit(?=\s|$))/i, /^(?:id:)/i, /^(?:type:)/i, /^(?:msg:)/i, /^(?:NORMAL\b)/i, /^(?:REVERSE\b)/i, /^(?:HIGHLIGHT\b)/i, /^(?:tag:)/i, /^(?:branch(?=\s|$))/i, /^(?:order:)/i, /^(?:merge(?=\s|$))/i, /^(?:cherry-pick(?=\s|$))/i, /^(?:parent:)/i, /^(?:checkout(?=\s|$))/i, /^(?:LR\b)/i, /^(?:TB\b)/i, /^(?::)/i, /^(?:\^)/i, /^(?:options\r?\n)/i, /^(?:[ \r\n\t]+end\b)/i, /^(?:[\s\S]+(?=[ \r\n\t]+end))/i, /^(?:["]["])/i, /^(?:["])/i, /^(?:["])/i, /^(?:[^"]*)/i, /^(?:[0-9]+(?=\s|$))/i, /^(?:\w([-\./\w]*[-\w])?)/i, /^(?:$)/i, /^(?:\s+)/i],
      conditions: { acc_descr_multiline: { rules: [5, 6], inclusive: !1 }, acc_descr: { rules: [3], inclusive: !1 }, acc_title: { rules: [1], inclusive: !1 }, options: { rules: [30, 31], inclusive: !1 }, string: { rules: [34, 35], inclusive: !1 }, INITIAL: { rules: [0, 2, 4, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 32, 33, 36, 37, 38, 39], inclusive: !0 } }
    };
    return q;
  }();
  T.lexer = B;
  function G() {
    this.yy = {};
  }
  return G.prototype = T, T.Parser = G, new G();
}();
me.parser = me;
const Ve = me;
let ae = C().gitGraph.mainBranchName, De = C().gitGraph.mainBranchOrder, M = {}, I = null, $ = {};
$[ae] = { name: ae, order: De };
let L = {};
L[ae] = I;
let O = ae, ke = "LR", U = 0;
function ue() {
  return Ge({ length: 7 });
}
function ze(r, n) {
  const o = /* @__PURE__ */ Object.create(null);
  return r.reduce((m, a) => {
    const c = n(a);
    return o[c] || (o[c] = !0, m.push(a)), m;
  }, []);
}
const je = function(r) {
  ke = r;
};
let xe = {};
const qe = function(r) {
  S.debug("options str", r), r = r && r.trim(), r = r || "{}";
  try {
    xe = JSON.parse(r);
  } catch (n) {
    S.error("error while parsing gitGraph options", n.message);
  }
}, Ye = function() {
  return xe;
}, Fe = function(r, n, o, m) {
  S.debug("Entering commit:", r, n, o, m), n = D.sanitizeText(n, C()), r = D.sanitizeText(r, C()), m = D.sanitizeText(m, C());
  const a = {
    id: n || U + "-" + ue(),
    message: r,
    seq: U++,
    type: o || J.NORMAL,
    tag: m || "",
    parents: I == null ? [] : [I.id],
    branch: O
  };
  I = a, M[a.id] = a, L[O] = a.id, S.debug("in pushCommit " + a.id);
}, Ke = function(r, n) {
  if (r = D.sanitizeText(r, C()), L[r] === void 0)
    L[r] = I != null ? I.id : null, $[r] = { name: r, order: n ? parseInt(n, 10) : null }, ye(r), S.debug("in createBranch");
  else {
    let o = new Error(
      'Trying to create an existing branch. (Help: Either use a new name if you want create a new branch or try using "checkout ' + r + '")'
    );
    throw o.hash = {
      text: "branch " + r,
      token: "branch " + r,
      line: "1",
      loc: { first_line: 1, last_line: 1, first_column: 1, last_column: 1 },
      expected: ['"checkout ' + r + '"']
    }, o;
  }
}, Ue = function(r, n, o, m) {
  r = D.sanitizeText(r, C()), n = D.sanitizeText(n, C());
  const a = M[L[O]], c = M[L[r]];
  if (O === r) {
    let h = new Error('Incorrect usage of "merge". Cannot merge a branch to itself');
    throw h.hash = {
      text: "merge " + r,
      token: "merge " + r,
      line: "1",
      loc: { first_line: 1, last_line: 1, first_column: 1, last_column: 1 },
      expected: ["branch abc"]
    }, h;
  } else if (a === void 0 || !a) {
    let h = new Error(
      'Incorrect usage of "merge". Current branch (' + O + ")has no commits"
    );
    throw h.hash = {
      text: "merge " + r,
      token: "merge " + r,
      line: "1",
      loc: { first_line: 1, last_line: 1, first_column: 1, last_column: 1 },
      expected: ["commit"]
    }, h;
  } else if (L[r] === void 0) {
    let h = new Error(
      'Incorrect usage of "merge". Branch to be merged (' + r + ") does not exist"
    );
    throw h.hash = {
      text: "merge " + r,
      token: "merge " + r,
      line: "1",
      loc: { first_line: 1, last_line: 1, first_column: 1, last_column: 1 },
      expected: ["branch " + r]
    }, h;
  } else if (c === void 0 || !c) {
    let h = new Error(
      'Incorrect usage of "merge". Branch to be merged (' + r + ") has no commits"
    );
    throw h.hash = {
      text: "merge " + r,
      token: "merge " + r,
      line: "1",
      loc: { first_line: 1, last_line: 1, first_column: 1, last_column: 1 },
      expected: ['"commit"']
    }, h;
  } else if (a === c) {
    let h = new Error('Incorrect usage of "merge". Both branches have same head');
    throw h.hash = {
      text: "merge " + r,
      token: "merge " + r,
      line: "1",
      loc: { first_line: 1, last_line: 1, first_column: 1, last_column: 1 },
      expected: ["branch abc"]
    }, h;
  } else if (n && M[n] !== void 0) {
    let h = new Error(
      'Incorrect usage of "merge". Commit with id:' + n + " already exists, use different custom Id"
    );
    throw h.hash = {
      text: "merge " + r + n + o + m,
      token: "merge " + r + n + o + m,
      line: "1",
      loc: { first_line: 1, last_line: 1, first_column: 1, last_column: 1 },
      expected: [
        "merge " + r + " " + n + "_UNIQUE " + o + " " + m
      ]
    }, h;
  }
  const l = {
    id: n || U + "-" + ue(),
    message: "merged branch " + r + " into " + O,
    seq: U++,
    parents: [I == null ? null : I.id, L[r]],
    branch: O,
    type: J.MERGE,
    customType: o,
    customId: !!n,
    tag: m || ""
  };
  I = l, M[l.id] = l, L[O] = l.id, S.debug(L), S.debug("in mergeBranch");
}, We = function(r, n, o, m) {
  if (S.debug("Entering cherryPick:", r, n, o), r = D.sanitizeText(r, C()), n = D.sanitizeText(n, C()), o = D.sanitizeText(o, C()), m = D.sanitizeText(m, C()), !r || M[r] === void 0) {
    let l = new Error(
      'Incorrect usage of "cherryPick". Source commit id should exist and provided'
    );
    throw l.hash = {
      text: "cherryPick " + r + " " + n,
      token: "cherryPick " + r + " " + n,
      line: "1",
      loc: { first_line: 1, last_line: 1, first_column: 1, last_column: 1 },
      expected: ["cherry-pick abc"]
    }, l;
  }
  let a = M[r], c = a.branch;
  if (m && !(Array.isArray(a.parents) && a.parents.includes(m)))
    throw new Error(
      "Invalid operation: The specified parent commit is not an immediate parent of the cherry-picked commit."
    );
  if (a.type === J.MERGE && !m)
    throw new Error(
      "Incorrect usage of cherry-pick: If the source commit is a merge commit, an immediate parent commit must be specified."
    );
  if (!n || M[n] === void 0) {
    if (c === O) {
      let y = new Error(
        'Incorrect usage of "cherryPick". Source commit is already on current branch'
      );
      throw y.hash = {
        text: "cherryPick " + r + " " + n,
        token: "cherryPick " + r + " " + n,
        line: "1",
        loc: { first_line: 1, last_line: 1, first_column: 1, last_column: 1 },
        expected: ["cherry-pick abc"]
      }, y;
    }
    const l = M[L[O]];
    if (l === void 0 || !l) {
      let y = new Error(
        'Incorrect usage of "cherry-pick". Current branch (' + O + ")has no commits"
      );
      throw y.hash = {
        text: "cherryPick " + r + " " + n,
        token: "cherryPick " + r + " " + n,
        line: "1",
        loc: { first_line: 1, last_line: 1, first_column: 1, last_column: 1 },
        expected: ["cherry-pick abc"]
      }, y;
    }
    const h = {
      id: U + "-" + ue(),
      message: "cherry-picked " + a + " into " + O,
      seq: U++,
      parents: [I == null ? null : I.id, a.id],
      branch: O,
      type: J.CHERRY_PICK,
      tag: o ?? `cherry-pick:${a.id}${a.type === J.MERGE ? `|parent:${m}` : ""}`
    };
    I = h, M[h.id] = h, L[O] = h.id, S.debug(L), S.debug("in cherryPick");
  }
}, ye = function(r) {
  if (r = D.sanitizeText(r, C()), L[r] === void 0) {
    let n = new Error(
      'Trying to checkout branch which is not yet created. (Help try using "branch ' + r + '")'
    );
    throw n.hash = {
      text: "checkout " + r,
      token: "checkout " + r,
      line: "1",
      loc: { first_line: 1, last_line: 1, first_column: 1, last_column: 1 },
      expected: ['"branch ' + r + '"']
    }, n;
  } else {
    O = r;
    const n = L[O];
    I = M[n];
  }
};
function ge(r, n, o) {
  const m = r.indexOf(n);
  m === -1 ? r.push(o) : r.splice(m, 1, o);
}
function _e(r) {
  const n = r.reduce((a, c) => a.seq > c.seq ? a : c, r[0]);
  let o = "";
  r.forEach(function(a) {
    a === n ? o += "	*" : o += "	|";
  });
  const m = [o, n.id, n.seq];
  for (let a in L)
    L[a] === n.id && m.push(a);
  if (S.debug(m.join(" ")), n.parents && n.parents.length == 2) {
    const a = M[n.parents[0]];
    ge(r, n, a), r.push(M[n.parents[1]]);
  } else {
    if (n.parents.length == 0)
      return;
    {
      const a = M[n.parents];
      ge(r, n, a);
    }
  }
  r = ze(r, (a) => a.id), _e(r);
}
const Je = function() {
  S.debug(M);
  const r = Ee()[0];
  _e([r]);
}, Qe = function() {
  M = {}, I = null;
  let r = C().gitGraph.mainBranchName, n = C().gitGraph.mainBranchOrder;
  L = {}, L[r] = null, $ = {}, $[r] = { name: r, order: n }, O = r, U = 0, Se();
}, Xe = function() {
  return Object.values($).map((n, o) => n.order !== null ? n : {
    ...n,
    order: parseFloat(`0.${o}`, 10)
  }).sort((n, o) => n.order - o.order).map(({ name: n }) => ({ name: n }));
}, Ze = function() {
  return L;
}, $e = function() {
  return M;
}, Ee = function() {
  const r = Object.keys(M).map(function(n) {
    return M[n];
  });
  return r.forEach(function(n) {
    S.debug(n.id);
  }), r.sort((n, o) => n.seq - o.seq), r;
}, et = function() {
  return O;
}, tt = function() {
  return ke;
}, rt = function() {
  return I;
}, J = {
  NORMAL: 0,
  REVERSE: 1,
  HIGHLIGHT: 2,
  MERGE: 3,
  CHERRY_PICK: 4
}, it = {
  getConfig: () => C().gitGraph,
  setDirection: je,
  setOptions: qe,
  getOptions: Ye,
  commit: Fe,
  branch: Ke,
  merge: Ue,
  cherryPick: We,
  checkout: ye,
  //reset,
  prettyPrint: Je,
  clear: Qe,
  getBranchesAsObjArray: Xe,
  getBranches: Ze,
  getCommits: $e,
  getCommitsArray: Ee,
  getCurrentBranch: et,
  getDirection: tt,
  getHead: rt,
  setAccTitle: Ce,
  getAccTitle: ve,
  getAccDescription: Oe,
  setAccDescription: Ae,
  setDiagramTitle: Ie,
  getDiagramTitle: Pe,
  commitType: J
};
let X = {};
const N = {
  NORMAL: 0,
  REVERSE: 1,
  HIGHLIGHT: 2,
  MERGE: 3,
  CHERRY_PICK: 4
}, K = 8;
let R = {}, ee = {}, ne = [], te = 0, A = "LR";
const st = () => {
  R = {}, ee = {}, X = {}, te = 0, ne = [], A = "LR";
}, Te = (r) => {
  const n = document.createElementNS("http://www.w3.org/2000/svg", "text");
  let o = [];
  typeof r == "string" ? o = r.split(/\\n|\n|<br\s*\/?>/gi) : Array.isArray(r) ? o = r : o = [];
  for (const m of o) {
    const a = document.createElementNS("http://www.w3.org/2000/svg", "tspan");
    a.setAttributeNS("http://www.w3.org/XML/1998/namespace", "xml:space", "preserve"), a.setAttribute("dy", "1em"), a.setAttribute("x", "0"), a.setAttribute("class", "row"), a.textContent = m.trim(), n.appendChild(a);
  }
  return n;
}, de = (r, n, o) => {
  const m = C().gitGraph, a = r.append("g").attr("class", "commit-bullets"), c = r.append("g").attr("class", "commit-labels");
  let l = 0;
  A === "TB" && (l = 30), Object.keys(n).sort((k, i) => n[k].seq - n[i].seq).forEach((k) => {
    const i = n[k], b = A === "TB" ? l + 10 : R[i.branch].pos, f = A === "TB" ? R[i.branch].pos : l + 10;
    if (o) {
      let _, p = i.customType !== void 0 && i.customType !== "" ? i.customType : i.type;
      switch (p) {
        case N.NORMAL:
          _ = "commit-normal";
          break;
        case N.REVERSE:
          _ = "commit-reverse";
          break;
        case N.HIGHLIGHT:
          _ = "commit-highlight";
          break;
        case N.MERGE:
          _ = "commit-merge";
          break;
        case N.CHERRY_PICK:
          _ = "commit-cherry-pick";
          break;
        default:
          _ = "commit-normal";
      }
      if (p === N.HIGHLIGHT) {
        const d = a.append("rect");
        d.attr("x", f - 10), d.attr("y", b - 10), d.attr("height", 20), d.attr("width", 20), d.attr(
          "class",
          `commit ${i.id} commit-highlight${R[i.branch].index % K} ${_}-outer`
        ), a.append("rect").attr("x", f - 6).attr("y", b - 6).attr("height", 12).attr("width", 12).attr(
          "class",
          `commit ${i.id} commit${R[i.branch].index % K} ${_}-inner`
        );
      } else if (p === N.CHERRY_PICK)
        a.append("circle").attr("cx", f).attr("cy", b).attr("r", 10).attr("class", `commit ${i.id} ${_}`), a.append("circle").attr("cx", f - 3).attr("cy", b + 2).attr("r", 2.75).attr("fill", "#fff").attr("class", `commit ${i.id} ${_}`), a.append("circle").attr("cx", f + 3).attr("cy", b + 2).attr("r", 2.75).attr("fill", "#fff").attr("class", `commit ${i.id} ${_}`), a.append("line").attr("x1", f + 3).attr("y1", b + 1).attr("x2", f).attr("y2", b - 5).attr("stroke", "#fff").attr("class", `commit ${i.id} ${_}`), a.append("line").attr("x1", f - 3).attr("y1", b + 1).attr("x2", f).attr("y2", b - 5).attr("stroke", "#fff").attr("class", `commit ${i.id} ${_}`);
      else {
        const d = a.append("circle");
        if (d.attr("cx", f), d.attr("cy", b), d.attr("r", i.type === N.MERGE ? 9 : 10), d.attr(
          "class",
          `commit ${i.id} commit${R[i.branch].index % K}`
        ), p === N.MERGE) {
          const E = a.append("circle");
          E.attr("cx", f), E.attr("cy", b), E.attr("r", 6), E.attr(
            "class",
            `commit ${_} ${i.id} commit${R[i.branch].index % K}`
          );
        }
        p === N.REVERSE && a.append("path").attr("d", `M ${f - 5},${b - 5}L${f + 5},${b + 5}M${f - 5},${b + 5}L${f + 5},${b - 5}`).attr(
          "class",
          `commit ${_} ${i.id} commit${R[i.branch].index % K}`
        );
      }
    }
    if (A === "TB" ? ee[i.id] = { x: f, y: l + 10 } : ee[i.id] = { x: l + 10, y: b }, o) {
      if (i.type !== N.CHERRY_PICK && (i.customId && i.type === N.MERGE || i.type !== N.MERGE) && m.showCommitLabel) {
        const d = c.append("g"), E = d.insert("rect").attr("class", "commit-label-bkg"), H = d.append("text").attr("x", l).attr("y", b + 25).attr("class", "commit-label").text(i.id);
        let T = H.node().getBBox();
        if (E.attr("x", l + 10 - T.width / 2 - 2).attr("y", b + 13.5).attr("width", T.width + 2 * 2).attr("height", T.height + 2 * 2), A === "TB" && (E.attr("x", f - (T.width + 4 * 4 + 5)).attr("y", b - 12), H.attr("x", f - (T.width + 4 * 4)).attr("y", b + T.height - 12)), A !== "TB" && H.attr("x", l + 10 - T.width / 2), m.rotateCommitLabel)
          if (A === "TB")
            H.attr("transform", "rotate(-45, " + f + ", " + b + ")"), E.attr("transform", "rotate(-45, " + f + ", " + b + ")");
          else {
            let B = -7.5 - (T.width + 10) / 25 * 9.5, G = 10 + T.width / 25 * 8.5;
            d.attr(
              "transform",
              "translate(" + B + ", " + G + ") rotate(-45, " + l + ", " + b + ")"
            );
          }
      }
      if (i.tag) {
        const d = c.insert("polygon"), E = c.append("circle"), H = c.append("text").attr("y", b - 16).attr("class", "tag-label").text(i.tag);
        let T = H.node().getBBox();
        H.attr("x", l + 10 - T.width / 2);
        const B = T.height / 2, G = b - 19.2;
        d.attr("class", "tag-label-bkg").attr(
          "points",
          `
          ${l - T.width / 2 - 4 / 2},${G + 2}
          ${l - T.width / 2 - 4 / 2},${G - 2}
          ${l + 10 - T.width / 2 - 4},${G - B - 2}
          ${l + 10 + T.width / 2 + 4},${G - B - 2}
          ${l + 10 + T.width / 2 + 4},${G + B + 2}
          ${l + 10 - T.width / 2 - 4},${G + B + 2}`
        ), E.attr("cx", l - T.width / 2 + 4 / 2).attr("cy", G).attr("r", 1.5).attr("class", "tag-hole"), A === "TB" && (d.attr("class", "tag-label-bkg").attr(
          "points",
          `
            ${f},${l + 2}
            ${f},${l - 2}
            ${f + 10},${l - B - 2}
            ${f + 10 + T.width + 4},${l - B - 2}
            ${f + 10 + T.width + 4},${l + B + 2}
            ${f + 10},${l + B + 2}`
        ).attr("transform", "translate(12,12) rotate(45, " + f + "," + l + ")"), E.attr("cx", f + 4 / 2).attr("cy", l).attr("transform", "translate(12,12) rotate(45, " + f + "," + l + ")"), H.attr("x", f + 5).attr("y", l + 3).attr("transform", "translate(14,14) rotate(45, " + f + "," + l + ")"));
      }
    }
    l += 50, l > te && (te = l);
  });
}, at = (r, n, o, m, a) => {
  const l = (A === "TB" ? o.x < m.x : o.y < m.y) ? n.branch : r.branch, h = (k) => k.branch === l, y = (k) => k.seq > r.seq && k.seq < n.seq;
  return Object.values(a).some((k) => y(k) && h(k));
}, Z = (r, n, o = 0) => {
  const m = r + Math.abs(r - n) / 2;
  if (o > 5)
    return m;
  if (ne.every((l) => Math.abs(l - m) >= 10))
    return ne.push(m), m;
  const c = Math.abs(r - n);
  return Z(r, n - c / 5, o + 1);
}, nt = (r, n, o, m) => {
  const a = ee[n.id], c = ee[o.id], l = at(n, o, a, c, m);
  let h = "", y = "", k = 0, i = 0, b = R[o.branch].index, f;
  if (l) {
    h = "A 10 10, 0, 0, 0,", y = "A 10 10, 0, 0, 1,", k = 10, i = 10;
    const _ = a.y < c.y ? Z(a.y, c.y) : Z(c.y, a.y), p = a.x < c.x ? Z(a.x, c.x) : Z(c.x, a.x);
    A === "TB" ? a.x < c.x ? (b = R[o.branch].index, f = `M ${a.x} ${a.y} L ${p - k} ${a.y} ${y} ${p} ${a.y + i} L ${p} ${c.y - k} ${h} ${p + i} ${c.y} L ${c.x} ${c.y}`) : (b = R[n.branch].index, f = `M ${a.x} ${a.y} L ${p + k} ${a.y} ${h} ${p} ${a.y + i} L ${p} ${c.y - k} ${y} ${p - i} ${c.y} L ${c.x} ${c.y}`) : a.y < c.y ? (b = R[o.branch].index, f = `M ${a.x} ${a.y} L ${a.x} ${_ - k} ${h} ${a.x + i} ${_} L ${c.x - k} ${_} ${y} ${c.x} ${_ + i} L ${c.x} ${c.y}`) : (b = R[n.branch].index, f = `M ${a.x} ${a.y} L ${a.x} ${_ + k} ${y} ${a.x + i} ${_} L ${c.x - k} ${_} ${h} ${c.x} ${_ - i} L ${c.x} ${c.y}`);
  } else
    A === "TB" ? (a.x < c.x && (h = "A 20 20, 0, 0, 0,", y = "A 20 20, 0, 0, 1,", k = 20, i = 20, b = R[o.branch].index, f = `M ${a.x} ${a.y} L ${c.x - k} ${a.y} ${y} ${c.x} ${a.y + i} L ${c.x} ${c.y}`), a.x > c.x && (h = "A 20 20, 0, 0, 0,", y = "A 20 20, 0, 0, 1,", k = 20, i = 20, b = R[n.branch].index, f = `M ${a.x} ${a.y} L ${a.x} ${c.y - k} ${y} ${a.x - i} ${c.y} L ${c.x} ${c.y}`), a.x === c.x && (b = R[n.branch].index, f = `M ${a.x} ${a.y} L ${a.x + k} ${a.y} ${h} ${a.x + i} ${c.y + k} L ${c.x} ${c.y}`)) : (a.y < c.y && (h = "A 20 20, 0, 0, 0,", k = 20, i = 20, b = R[o.branch].index, f = `M ${a.x} ${a.y} L ${a.x} ${c.y - k} ${h} ${a.x + i} ${c.y} L ${c.x} ${c.y}`), a.y > c.y && (h = "A 20 20, 0, 0, 0,", k = 20, i = 20, b = R[n.branch].index, f = `M ${a.x} ${a.y} L ${c.x - k} ${a.y} ${h} ${c.x} ${a.y - i} L ${c.x} ${c.y}`), a.y === c.y && (b = R[n.branch].index, f = `M ${a.x} ${a.y} L ${a.x} ${c.y - k} ${h} ${a.x + i} ${c.y} L ${c.x} ${c.y}`));
  r.append("path").attr("d", f).attr("class", "arrow arrow" + b % K);
}, ct = (r, n) => {
  const o = r.append("g").attr("class", "commit-arrows");
  Object.keys(n).forEach((m) => {
    const a = n[m];
    a.parents && a.parents.length > 0 && a.parents.forEach((c) => {
      nt(o, n[c], a, n);
    });
  });
}, ot = (r, n) => {
  const o = C().gitGraph, m = r.append("g");
  n.forEach((a, c) => {
    const l = c % K, h = R[a.name].pos, y = m.append("line");
    y.attr("x1", 0), y.attr("y1", h), y.attr("x2", te), y.attr("y2", h), y.attr("class", "branch branch" + l), A === "TB" && (y.attr("y1", 30), y.attr("x1", h), y.attr("y2", te), y.attr("x2", h)), ne.push(h);
    let k = a.name;
    const i = Te(k), b = m.insert("rect"), _ = m.insert("g").attr("class", "branchLabel").insert("g").attr("class", "label branch-label" + l);
    _.node().appendChild(i);
    let p = i.getBBox();
    b.attr("class", "branchLabelBkg label" + l).attr("rx", 4).attr("ry", 4).attr("x", -p.width - 4 - (o.rotateCommitLabel === !0 ? 30 : 0)).attr("y", -p.height / 2 + 8).attr("width", p.width + 18).attr("height", p.height + 4), _.attr(
      "transform",
      "translate(" + (-p.width - 14 - (o.rotateCommitLabel === !0 ? 30 : 0)) + ", " + (h - p.height / 2 - 1) + ")"
    ), A === "TB" && (b.attr("x", h - p.width / 2 - 10).attr("y", 0), _.attr("transform", "translate(" + (h - p.width / 2 - 5) + ", 0)")), A !== "TB" && b.attr("transform", "translate(-19, " + (h - p.height / 2) + ")");
  });
}, lt = function(r, n, o, m) {
  st();
  const a = C(), c = a.gitGraph;
  S.debug("in gitgraph renderer", r + `
`, "id:", n, o), X = m.db.getCommits();
  const l = m.db.getBranchesAsObjArray();
  A = m.db.getDirection();
  const h = Ne(`[id="${n}"]`);
  let y = 0;
  l.forEach((k, i) => {
    const b = Te(k.name), f = h.append("g"), _ = f.insert("g").attr("class", "branchLabel"), p = _.insert("g").attr("class", "label branch-label");
    p.node().appendChild(b);
    let d = b.getBBox();
    R[k.name] = { pos: y, index: i }, y += 50 + (c.rotateCommitLabel ? 40 : 0) + (A === "TB" ? d.width / 2 : 0), p.remove(), _.remove(), f.remove();
  }), de(h, X, !1), c.showBranches && ot(h, l), ct(h, X), de(h, X, !0), He.insertTitle(
    h,
    "gitTitleText",
    c.titleTopMargin,
    m.db.getDiagramTitle()
  ), Be(
    void 0,
    h,
    c.diagramPadding,
    c.useMaxWidth ?? a.useMaxWidth
  );
}, ht = {
  draw: lt
}, mt = (r) => `
  .commit-id,
  .commit-msg,
  .branch-label {
    fill: lightgrey;
    color: lightgrey;
    font-family: 'trebuchet ms', verdana, arial, sans-serif;
    font-family: var(--mermaid-font-family);
  }
  ${[0, 1, 2, 3, 4, 5, 6, 7].map(
  (n) => `
        .branch-label${n} { fill: ${r["gitBranchLabel" + n]}; }
        .commit${n} { stroke: ${r["git" + n]}; fill: ${r["git" + n]}; }
        .commit-highlight${n} { stroke: ${r["gitInv" + n]}; fill: ${r["gitInv" + n]}; }
        .label${n}  { fill: ${r["git" + n]}; }
        .arrow${n} { stroke: ${r["git" + n]}; }
        `
).join(`
`)}

  .branch {
    stroke-width: 1;
    stroke: ${r.lineColor};
    stroke-dasharray: 2;
  }
  .commit-label { font-size: ${r.commitLabelFontSize}; fill: ${r.commitLabelColor};}
  .commit-label-bkg { font-size: ${r.commitLabelFontSize}; fill: ${r.commitLabelBackground}; opacity: 0.5; }
  .tag-label { font-size: ${r.tagLabelFontSize}; fill: ${r.tagLabelColor};}
  .tag-label-bkg { fill: ${r.tagLabelBackground}; stroke: ${r.tagLabelBorder}; }
  .tag-hole { fill: ${r.textColor}; }

  .commit-merge {
    stroke: ${r.primaryColor};
    fill: ${r.primaryColor};
  }
  .commit-reverse {
    stroke: ${r.primaryColor};
    fill: ${r.primaryColor};
    stroke-width: 3;
  }
  .commit-highlight-outer {
  }
  .commit-highlight-inner {
    stroke: ${r.primaryColor};
    fill: ${r.primaryColor};
  }

  .arrow { stroke-width: 8; stroke-linecap: round; fill: none}
  .gitTitleText {
    text-anchor: middle;
    font-size: 18px;
    fill: ${r.textColor};
  }
`, ut = mt, pt = {
  parser: Ve,
  db: it,
  renderer: ht,
  styles: ut
};
export {
  pt as diagram
};
