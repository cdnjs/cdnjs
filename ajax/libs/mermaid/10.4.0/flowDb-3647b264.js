import { aS as defaultConfig, s as setAccTitle, g as getAccTitle, a as getAccDescription, b as setAccDescription, D as setDiagramTitle, E as getDiagramTitle, c as getConfig, m as mermaidAPI, l as log, A as utils, F as clear$1, f as common, j as d3select } from "./mermaid-f185fde2.js";
var parser = function() {
  var o = function(k, v, o2, l) {
    for (o2 = o2 || {}, l = k.length; l--; o2[k[l]] = v)
      ;
    return o2;
  }, $V0 = [1, 9], $V1 = [1, 7], $V2 = [1, 6], $V3 = [1, 8], $V4 = [1, 20, 21, 22, 23, 38, 45, 47, 49, 53, 69, 92, 93, 94, 95, 96, 97, 110, 113, 114, 117, 119, 122, 123, 124, 129, 130, 131, 132], $V5 = [2, 10], $V6 = [1, 20], $V7 = [1, 21], $V8 = [1, 22], $V9 = [1, 23], $Va = [1, 30], $Vb = [1, 32], $Vc = [1, 33], $Vd = [1, 34], $Ve = [1, 56], $Vf = [1, 55], $Vg = [1, 36], $Vh = [1, 37], $Vi = [1, 38], $Vj = [1, 39], $Vk = [1, 40], $Vl = [1, 51], $Vm = [1, 53], $Vn = [1, 49], $Vo = [1, 54], $Vp = [1, 50], $Vq = [1, 57], $Vr = [1, 52], $Vs = [1, 58], $Vt = [1, 59], $Vu = [1, 41], $Vv = [1, 42], $Vw = [1, 43], $Vx = [1, 44], $Vy = [1, 62], $Vz = [1, 67], $VA = [1, 20, 21, 22, 23, 38, 43, 45, 47, 49, 53, 69, 92, 93, 94, 95, 96, 97, 110, 113, 114, 117, 119, 122, 123, 124, 129, 130, 131, 132], $VB = [1, 71], $VC = [1, 70], $VD = [1, 72], $VE = [20, 21, 23, 84, 86], $VF = [1, 98], $VG = [1, 103], $VH = [1, 102], $VI = [1, 99], $VJ = [1, 95], $VK = [1, 101], $VL = [1, 97], $VM = [1, 104], $VN = [1, 100], $VO = [1, 105], $VP = [1, 96], $VQ = [20, 21, 22, 23, 84, 86], $VR = [20, 21, 22, 23, 55, 84, 86], $VS = [20, 21, 22, 23, 40, 53, 55, 57, 59, 61, 63, 65, 67, 69, 72, 74, 76, 77, 79, 84, 86, 97, 110, 113, 114, 117, 119, 122, 123, 124], $VT = [20, 21, 23], $VU = [20, 21, 23, 53, 69, 84, 86, 97, 110, 113, 114, 117, 119, 122, 123, 124], $VV = [1, 12, 20, 21, 22, 23, 24, 38, 43, 45, 47, 49, 53, 69, 92, 93, 94, 95, 96, 97, 110, 113, 114, 117, 119, 122, 123, 124, 129, 130, 131, 132], $VW = [53, 69, 97, 110, 113, 114, 117, 119, 122, 123, 124], $VX = [1, 134], $VY = [1, 133], $VZ = [1, 141], $V_ = [1, 155], $V$ = [1, 156], $V01 = [1, 157], $V11 = [1, 158], $V21 = [1, 143], $V31 = [1, 145], $V41 = [1, 149], $V51 = [1, 150], $V61 = [1, 151], $V71 = [1, 152], $V81 = [1, 153], $V91 = [1, 154], $Va1 = [1, 159], $Vb1 = [1, 160], $Vc1 = [1, 139], $Vd1 = [1, 140], $Ve1 = [1, 147], $Vf1 = [1, 142], $Vg1 = [1, 146], $Vh1 = [1, 144], $Vi1 = [20, 21, 22, 23, 38, 43, 45, 47, 49, 53, 69, 92, 93, 94, 95, 96, 97, 110, 113, 114, 117, 119, 122, 123, 124, 129, 130, 131, 132], $Vj1 = [1, 162], $Vk1 = [20, 21, 22, 23, 26, 53, 69, 97, 113, 114, 117, 119, 122, 123, 124], $Vl1 = [1, 182], $Vm1 = [1, 178], $Vn1 = [1, 179], $Vo1 = [1, 183], $Vp1 = [1, 180], $Vq1 = [1, 181], $Vr1 = [12, 21, 22, 24], $Vs1 = [86, 124, 127], $Vt1 = [20, 21, 22, 23, 24, 26, 38, 40, 43, 53, 69, 84, 92, 93, 94, 95, 96, 97, 98, 113, 117, 119, 122, 123, 124], $Vu1 = [22, 114], $Vv1 = [42, 58, 60, 62, 64, 66, 71, 73, 75, 76, 78, 80, 124, 125, 126], $Vw1 = [1, 250], $Vx1 = [1, 248], $Vy1 = [1, 252], $Vz1 = [1, 246], $VA1 = [1, 247], $VB1 = [1, 249], $VC1 = [1, 251], $VD1 = [1, 253], $VE1 = [1, 270], $VF1 = [20, 21, 23, 114], $VG1 = [20, 21, 22, 23, 69, 92, 113, 114, 117, 118, 119, 120];
  var parser2 = {
    trace: function trace() {
    },
    yy: {},
    symbols_: { "error": 2, "start": 3, "mermaidDoc": 4, "directive": 5, "openDirective": 6, "typeDirective": 7, "closeDirective": 8, "separator": 9, ":": 10, "argDirective": 11, "open_directive": 12, "type_directive": 13, "arg_directive": 14, "close_directive": 15, "graphConfig": 16, "document": 17, "line": 18, "statement": 19, "SEMI": 20, "NEWLINE": 21, "SPACE": 22, "EOF": 23, "GRAPH": 24, "NODIR": 25, "DIR": 26, "FirstStmtSeperator": 27, "ending": 28, "endToken": 29, "spaceList": 30, "spaceListNewline": 31, "verticeStatement": 32, "styleStatement": 33, "linkStyleStatement": 34, "classDefStatement": 35, "classStatement": 36, "clickStatement": 37, "subgraph": 38, "textNoTags": 39, "SQS": 40, "text": 41, "SQE": 42, "end": 43, "direction": 44, "acc_title": 45, "acc_title_value": 46, "acc_descr": 47, "acc_descr_value": 48, "acc_descr_multiline_value": 49, "link": 50, "node": 51, "styledVertex": 52, "AMP": 53, "vertex": 54, "STYLE_SEPARATOR": 55, "idString": 56, "DOUBLECIRCLESTART": 57, "DOUBLECIRCLEEND": 58, "PS": 59, "PE": 60, "(-": 61, "-)": 62, "STADIUMSTART": 63, "STADIUMEND": 64, "SUBROUTINESTART": 65, "SUBROUTINEEND": 66, "VERTEX_WITH_PROPS_START": 67, "NODE_STRING[field]": 68, "COLON": 69, "NODE_STRING[value]": 70, "PIPE": 71, "CYLINDERSTART": 72, "CYLINDEREND": 73, "DIAMOND_START": 74, "DIAMOND_STOP": 75, "TAGEND": 76, "TRAPSTART": 77, "TRAPEND": 78, "INVTRAPSTART": 79, "INVTRAPEND": 80, "linkStatement": 81, "arrowText": 82, "TESTSTR": 83, "START_LINK": 84, "edgeText": 85, "LINK": 86, "edgeTextToken": 87, "STR": 88, "MD_STR": 89, "textToken": 90, "keywords": 91, "STYLE": 92, "LINKSTYLE": 93, "CLASSDEF": 94, "CLASS": 95, "CLICK": 96, "DOWN": 97, "UP": 98, "textNoTagsToken": 99, "stylesOpt": 100, "idString[vertex]": 101, "idString[class]": 102, "CALLBACKNAME": 103, "CALLBACKARGS": 104, "HREF": 105, "LINK_TARGET": 106, "STR[link]": 107, "STR[tooltip]": 108, "alphaNum": 109, "DEFAULT": 110, "numList": 111, "INTERPOLATE": 112, "NUM": 113, "COMMA": 114, "style": 115, "styleComponent": 116, "NODE_STRING": 117, "UNIT": 118, "BRKT": 119, "PCT": 120, "idStringToken": 121, "MINUS": 122, "MULT": 123, "UNICODE_TEXT": 124, "TEXT": 125, "TAGSTART": 126, "EDGE_TEXT": 127, "alphaNumToken": 128, "direction_tb": 129, "direction_bt": 130, "direction_rl": 131, "direction_lr": 132, "$accept": 0, "$end": 1 },
    terminals_: { 2: "error", 10: ":", 12: "open_directive", 13: "type_directive", 14: "arg_directive", 15: "close_directive", 20: "SEMI", 21: "NEWLINE", 22: "SPACE", 23: "EOF", 24: "GRAPH", 25: "NODIR", 26: "DIR", 38: "subgraph", 40: "SQS", 42: "SQE", 43: "end", 45: "acc_title", 46: "acc_title_value", 47: "acc_descr", 48: "acc_descr_value", 49: "acc_descr_multiline_value", 53: "AMP", 55: "STYLE_SEPARATOR", 57: "DOUBLECIRCLESTART", 58: "DOUBLECIRCLEEND", 59: "PS", 60: "PE", 61: "(-", 62: "-)", 63: "STADIUMSTART", 64: "STADIUMEND", 65: "SUBROUTINESTART", 66: "SUBROUTINEEND", 67: "VERTEX_WITH_PROPS_START", 68: "NODE_STRING[field]", 69: "COLON", 70: "NODE_STRING[value]", 71: "PIPE", 72: "CYLINDERSTART", 73: "CYLINDEREND", 74: "DIAMOND_START", 75: "DIAMOND_STOP", 76: "TAGEND", 77: "TRAPSTART", 78: "TRAPEND", 79: "INVTRAPSTART", 80: "INVTRAPEND", 83: "TESTSTR", 84: "START_LINK", 86: "LINK", 88: "STR", 89: "MD_STR", 92: "STYLE", 93: "LINKSTYLE", 94: "CLASSDEF", 95: "CLASS", 96: "CLICK", 97: "DOWN", 98: "UP", 101: "idString[vertex]", 102: "idString[class]", 103: "CALLBACKNAME", 104: "CALLBACKARGS", 105: "HREF", 106: "LINK_TARGET", 107: "STR[link]", 108: "STR[tooltip]", 110: "DEFAULT", 112: "INTERPOLATE", 113: "NUM", 114: "COMMA", 117: "NODE_STRING", 118: "UNIT", 119: "BRKT", 120: "PCT", 122: "MINUS", 123: "MULT", 124: "UNICODE_TEXT", 125: "TEXT", 126: "TAGSTART", 127: "EDGE_TEXT", 129: "direction_tb", 130: "direction_bt", 131: "direction_rl", 132: "direction_lr" },
    productions_: [0, [3, 1], [3, 2], [5, 4], [5, 6], [6, 1], [7, 1], [11, 1], [8, 1], [4, 2], [17, 0], [17, 2], [18, 1], [18, 1], [18, 1], [18, 1], [18, 1], [16, 2], [16, 2], [16, 2], [16, 3], [28, 2], [28, 1], [29, 1], [29, 1], [29, 1], [27, 1], [27, 1], [27, 2], [31, 2], [31, 2], [31, 1], [31, 1], [30, 2], [30, 1], [19, 2], [19, 2], [19, 2], [19, 2], [19, 2], [19, 2], [19, 9], [19, 6], [19, 4], [19, 1], [19, 2], [19, 2], [19, 1], [9, 1], [9, 1], [9, 1], [32, 3], [32, 4], [32, 2], [32, 1], [51, 1], [51, 5], [52, 1], [52, 3], [54, 4], [54, 4], [54, 6], [54, 4], [54, 4], [54, 4], [54, 8], [54, 4], [54, 4], [54, 4], [54, 6], [54, 4], [54, 4], [54, 4], [54, 4], [54, 4], [54, 1], [50, 2], [50, 3], [50, 3], [50, 1], [50, 3], [85, 1], [85, 2], [85, 1], [85, 1], [81, 1], [82, 3], [41, 1], [41, 2], [41, 1], [41, 1], [91, 1], [91, 1], [91, 1], [91, 1], [91, 1], [91, 1], [91, 1], [91, 1], [91, 1], [91, 1], [91, 1], [39, 1], [39, 2], [39, 1], [39, 1], [35, 5], [36, 5], [37, 2], [37, 4], [37, 3], [37, 5], [37, 3], [37, 5], [37, 5], [37, 7], [37, 2], [37, 4], [37, 2], [37, 4], [37, 4], [37, 6], [33, 5], [34, 5], [34, 5], [34, 9], [34, 9], [34, 7], [34, 7], [111, 1], [111, 3], [100, 1], [100, 3], [115, 1], [115, 2], [116, 1], [116, 1], [116, 1], [116, 1], [116, 1], [116, 1], [116, 1], [116, 1], [121, 1], [121, 1], [121, 1], [121, 1], [121, 1], [121, 1], [121, 1], [121, 1], [121, 1], [121, 1], [121, 1], [90, 1], [90, 1], [90, 1], [90, 1], [99, 1], [99, 1], [99, 1], [99, 1], [99, 1], [99, 1], [99, 1], [99, 1], [99, 1], [99, 1], [99, 1], [87, 1], [87, 1], [128, 1], [128, 1], [128, 1], [128, 1], [128, 1], [128, 1], [128, 1], [128, 1], [128, 1], [128, 1], [128, 1], [56, 1], [56, 2], [109, 1], [109, 2], [44, 1], [44, 1], [44, 1], [44, 1]],
    performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate, $$, _$) {
      var $0 = $$.length - 1;
      switch (yystate) {
        case 5:
          yy.parseDirective("%%{", "open_directive");
          break;
        case 6:
          yy.parseDirective($$[$0], "type_directive");
          break;
        case 7:
          $$[$0] = $$[$0].trim().replace(/'/g, '"');
          yy.parseDirective($$[$0], "arg_directive");
          break;
        case 8:
          yy.parseDirective("}%%", "close_directive", "flowchart");
          break;
        case 10:
          this.$ = [];
          break;
        case 11:
          if (!Array.isArray($$[$0]) || $$[$0].length > 0) {
            $$[$0 - 1].push($$[$0]);
          }
          this.$ = $$[$0 - 1];
          break;
        case 12:
        case 184:
          this.$ = $$[$0];
          break;
        case 19:
          yy.setDirection("TB");
          this.$ = "TB";
          break;
        case 20:
          yy.setDirection($$[$0 - 1]);
          this.$ = $$[$0 - 1];
          break;
        case 35:
          this.$ = $$[$0 - 1].nodes;
          break;
        case 36:
        case 37:
        case 38:
        case 39:
        case 40:
          this.$ = [];
          break;
        case 41:
          this.$ = yy.addSubGraph($$[$0 - 6], $$[$0 - 1], $$[$0 - 4]);
          break;
        case 42:
          this.$ = yy.addSubGraph($$[$0 - 3], $$[$0 - 1], $$[$0 - 3]);
          break;
        case 43:
          this.$ = yy.addSubGraph(void 0, $$[$0 - 1], void 0);
          break;
        case 45:
          this.$ = $$[$0].trim();
          yy.setAccTitle(this.$);
          break;
        case 46:
        case 47:
          this.$ = $$[$0].trim();
          yy.setAccDescription(this.$);
          break;
        case 51:
          yy.addLink($$[$0 - 2].stmt, $$[$0], $$[$0 - 1]);
          this.$ = { stmt: $$[$0], nodes: $$[$0].concat($$[$0 - 2].nodes) };
          break;
        case 52:
          yy.addLink($$[$0 - 3].stmt, $$[$0 - 1], $$[$0 - 2]);
          this.$ = { stmt: $$[$0 - 1], nodes: $$[$0 - 1].concat($$[$0 - 3].nodes) };
          break;
        case 53:
          this.$ = { stmt: $$[$0 - 1], nodes: $$[$0 - 1] };
          break;
        case 54:
          this.$ = { stmt: $$[$0], nodes: $$[$0] };
          break;
        case 55:
          this.$ = [$$[$0]];
          break;
        case 56:
          this.$ = $$[$0 - 4].concat($$[$0]);
          break;
        case 57:
          this.$ = $$[$0];
          break;
        case 58:
          this.$ = $$[$0 - 2];
          yy.setClass($$[$0 - 2], $$[$0]);
          break;
        case 59:
          this.$ = $$[$0 - 3];
          yy.addVertex($$[$0 - 3], $$[$0 - 1], "square");
          break;
        case 60:
          this.$ = $$[$0 - 3];
          yy.addVertex($$[$0 - 3], $$[$0 - 1], "doublecircle");
          break;
        case 61:
          this.$ = $$[$0 - 5];
          yy.addVertex($$[$0 - 5], $$[$0 - 2], "circle");
          break;
        case 62:
          this.$ = $$[$0 - 3];
          yy.addVertex($$[$0 - 3], $$[$0 - 1], "ellipse");
          break;
        case 63:
          this.$ = $$[$0 - 3];
          yy.addVertex($$[$0 - 3], $$[$0 - 1], "stadium");
          break;
        case 64:
          this.$ = $$[$0 - 3];
          yy.addVertex($$[$0 - 3], $$[$0 - 1], "subroutine");
          break;
        case 65:
          this.$ = $$[$0 - 7];
          yy.addVertex($$[$0 - 7], $$[$0 - 1], "rect", void 0, void 0, void 0, Object.fromEntries([[$$[$0 - 5], $$[$0 - 3]]]));
          break;
        case 66:
          this.$ = $$[$0 - 3];
          yy.addVertex($$[$0 - 3], $$[$0 - 1], "cylinder");
          break;
        case 67:
          this.$ = $$[$0 - 3];
          yy.addVertex($$[$0 - 3], $$[$0 - 1], "round");
          break;
        case 68:
          this.$ = $$[$0 - 3];
          yy.addVertex($$[$0 - 3], $$[$0 - 1], "diamond");
          break;
        case 69:
          this.$ = $$[$0 - 5];
          yy.addVertex($$[$0 - 5], $$[$0 - 2], "hexagon");
          break;
        case 70:
          this.$ = $$[$0 - 3];
          yy.addVertex($$[$0 - 3], $$[$0 - 1], "odd");
          break;
        case 71:
          this.$ = $$[$0 - 3];
          yy.addVertex($$[$0 - 3], $$[$0 - 1], "trapezoid");
          break;
        case 72:
          this.$ = $$[$0 - 3];
          yy.addVertex($$[$0 - 3], $$[$0 - 1], "inv_trapezoid");
          break;
        case 73:
          this.$ = $$[$0 - 3];
          yy.addVertex($$[$0 - 3], $$[$0 - 1], "lean_right");
          break;
        case 74:
          this.$ = $$[$0 - 3];
          yy.addVertex($$[$0 - 3], $$[$0 - 1], "lean_left");
          break;
        case 75:
          this.$ = $$[$0];
          yy.addVertex($$[$0]);
          break;
        case 76:
          $$[$0 - 1].text = $$[$0];
          this.$ = $$[$0 - 1];
          break;
        case 77:
        case 78:
          $$[$0 - 2].text = $$[$0 - 1];
          this.$ = $$[$0 - 2];
          break;
        case 79:
          this.$ = $$[$0];
          break;
        case 80:
          var inf = yy.destructLink($$[$0], $$[$0 - 2]);
          this.$ = { "type": inf.type, "stroke": inf.stroke, "length": inf.length, "text": $$[$0 - 1] };
          break;
        case 81:
          this.$ = { text: $$[$0], type: "text" };
          break;
        case 82:
          this.$ = { text: $$[$0 - 1].text + "" + $$[$0], type: $$[$0 - 1].type };
          break;
        case 83:
          this.$ = { text: $$[$0], type: "string" };
          break;
        case 84:
          this.$ = { text: $$[$0], type: "markdown" };
          break;
        case 85:
          var inf = yy.destructLink($$[$0]);
          this.$ = { "type": inf.type, "stroke": inf.stroke, "length": inf.length };
          break;
        case 86:
          this.$ = $$[$0 - 1];
          break;
        case 87:
          this.$ = { text: $$[$0], type: "text" };
          break;
        case 88:
          this.$ = { text: $$[$0 - 1].text + "" + $$[$0], type: $$[$0 - 1].type };
          break;
        case 89:
          this.$ = { text: $$[$0], type: "string" };
          break;
        case 90:
        case 105:
          this.$ = { text: $$[$0], type: "markdown" };
          break;
        case 102:
          this.$ = { text: $$[$0], type: "text" };
          break;
        case 103:
          this.$ = { text: $$[$0 - 1].text + "" + $$[$0], type: $$[$0 - 1].type };
          break;
        case 104:
          this.$ = { text: $$[$0], type: "text" };
          break;
        case 106:
          this.$ = $$[$0 - 4];
          yy.addClass($$[$0 - 2], $$[$0]);
          break;
        case 107:
          this.$ = $$[$0 - 4];
          yy.setClass($$[$0 - 2], $$[$0]);
          break;
        case 108:
        case 116:
          this.$ = $$[$0 - 1];
          yy.setClickEvent($$[$0 - 1], $$[$0]);
          break;
        case 109:
        case 117:
          this.$ = $$[$0 - 3];
          yy.setClickEvent($$[$0 - 3], $$[$0 - 2]);
          yy.setTooltip($$[$0 - 3], $$[$0]);
          break;
        case 110:
          this.$ = $$[$0 - 2];
          yy.setClickEvent($$[$0 - 2], $$[$0 - 1], $$[$0]);
          break;
        case 111:
          this.$ = $$[$0 - 4];
          yy.setClickEvent($$[$0 - 4], $$[$0 - 3], $$[$0 - 2]);
          yy.setTooltip($$[$0 - 4], $$[$0]);
          break;
        case 112:
          this.$ = $$[$0 - 2];
          yy.setLink($$[$0 - 2], $$[$0]);
          break;
        case 113:
          this.$ = $$[$0 - 4];
          yy.setLink($$[$0 - 4], $$[$0 - 2]);
          yy.setTooltip($$[$0 - 4], $$[$0]);
          break;
        case 114:
          this.$ = $$[$0 - 4];
          yy.setLink($$[$0 - 4], $$[$0 - 2], $$[$0]);
          break;
        case 115:
          this.$ = $$[$0 - 6];
          yy.setLink($$[$0 - 6], $$[$0 - 4], $$[$0]);
          yy.setTooltip($$[$0 - 6], $$[$0 - 2]);
          break;
        case 118:
          this.$ = $$[$0 - 1];
          yy.setLink($$[$0 - 1], $$[$0]);
          break;
        case 119:
          this.$ = $$[$0 - 3];
          yy.setLink($$[$0 - 3], $$[$0 - 2]);
          yy.setTooltip($$[$0 - 3], $$[$0]);
          break;
        case 120:
          this.$ = $$[$0 - 3];
          yy.setLink($$[$0 - 3], $$[$0 - 2], $$[$0]);
          break;
        case 121:
          this.$ = $$[$0 - 5];
          yy.setLink($$[$0 - 5], $$[$0 - 4], $$[$0]);
          yy.setTooltip($$[$0 - 5], $$[$0 - 2]);
          break;
        case 122:
          this.$ = $$[$0 - 4];
          yy.addVertex($$[$0 - 2], void 0, void 0, $$[$0]);
          break;
        case 123:
          this.$ = $$[$0 - 4];
          yy.updateLink([$$[$0 - 2]], $$[$0]);
          break;
        case 124:
          this.$ = $$[$0 - 4];
          yy.updateLink($$[$0 - 2], $$[$0]);
          break;
        case 125:
          this.$ = $$[$0 - 8];
          yy.updateLinkInterpolate([$$[$0 - 6]], $$[$0 - 2]);
          yy.updateLink([$$[$0 - 6]], $$[$0]);
          break;
        case 126:
          this.$ = $$[$0 - 8];
          yy.updateLinkInterpolate($$[$0 - 6], $$[$0 - 2]);
          yy.updateLink($$[$0 - 6], $$[$0]);
          break;
        case 127:
          this.$ = $$[$0 - 6];
          yy.updateLinkInterpolate([$$[$0 - 4]], $$[$0]);
          break;
        case 128:
          this.$ = $$[$0 - 6];
          yy.updateLinkInterpolate($$[$0 - 4], $$[$0]);
          break;
        case 129:
        case 131:
          this.$ = [$$[$0]];
          break;
        case 130:
        case 132:
          $$[$0 - 2].push($$[$0]);
          this.$ = $$[$0 - 2];
          break;
        case 134:
          this.$ = $$[$0 - 1] + $$[$0];
          break;
        case 182:
          this.$ = $$[$0];
          break;
        case 183:
          this.$ = $$[$0 - 1] + "" + $$[$0];
          break;
        case 185:
          this.$ = $$[$0 - 1] + "" + $$[$0];
          break;
        case 186:
          this.$ = { stmt: "dir", value: "TB" };
          break;
        case 187:
          this.$ = { stmt: "dir", value: "BT" };
          break;
        case 188:
          this.$ = { stmt: "dir", value: "RL" };
          break;
        case 189:
          this.$ = { stmt: "dir", value: "LR" };
          break;
      }
    },
    table: [{ 3: 1, 4: 2, 5: 3, 6: 5, 12: $V0, 16: 4, 21: $V1, 22: $V2, 24: $V3 }, { 1: [3] }, { 1: [2, 1] }, { 3: 10, 4: 2, 5: 3, 6: 5, 12: $V0, 16: 4, 21: $V1, 22: $V2, 24: $V3 }, o($V4, $V5, { 17: 11 }), { 7: 12, 13: [1, 13] }, { 16: 14, 21: $V1, 22: $V2, 24: $V3 }, { 16: 15, 21: $V1, 22: $V2, 24: $V3 }, { 25: [1, 16], 26: [1, 17] }, { 13: [2, 5] }, { 1: [2, 2] }, { 1: [2, 9], 18: 18, 19: 19, 20: $V6, 21: $V7, 22: $V8, 23: $V9, 32: 24, 33: 25, 34: 26, 35: 27, 36: 28, 37: 29, 38: $Va, 44: 31, 45: $Vb, 47: $Vc, 49: $Vd, 51: 35, 52: 45, 53: $Ve, 54: 46, 56: 47, 69: $Vf, 92: $Vg, 93: $Vh, 94: $Vi, 95: $Vj, 96: $Vk, 97: $Vl, 110: $Vm, 113: $Vn, 114: $Vo, 117: $Vp, 119: $Vq, 121: 48, 122: $Vr, 123: $Vs, 124: $Vt, 129: $Vu, 130: $Vv, 131: $Vw, 132: $Vx }, { 8: 60, 10: [1, 61], 15: $Vy }, o([10, 15], [2, 6]), o($V4, [2, 17]), o($V4, [2, 18]), o($V4, [2, 19]), { 20: [1, 64], 21: [1, 65], 22: $Vz, 27: 63, 30: 66 }, o($VA, [2, 11]), o($VA, [2, 12]), o($VA, [2, 13]), o($VA, [2, 14]), o($VA, [2, 15]), o($VA, [2, 16]), { 9: 68, 20: $VB, 21: $VC, 23: $VD, 50: 69, 81: 73, 84: [1, 74], 86: [1, 75] }, { 9: 76, 20: $VB, 21: $VC, 23: $VD }, { 9: 77, 20: $VB, 21: $VC, 23: $VD }, { 9: 78, 20: $VB, 21: $VC, 23: $VD }, { 9: 79, 20: $VB, 21: $VC, 23: $VD }, { 9: 80, 20: $VB, 21: $VC, 23: $VD }, { 9: 82, 20: $VB, 21: $VC, 22: [1, 81], 23: $VD }, o($VA, [2, 44]), { 46: [1, 83] }, { 48: [1, 84] }, o($VA, [2, 47]), o($VE, [2, 54], { 30: 85, 22: $Vz }), { 22: [1, 86] }, { 22: [1, 87] }, { 22: [1, 88] }, { 22: [1, 89] }, { 26: $VF, 53: $VG, 69: $VH, 88: [1, 93], 97: $VI, 103: [1, 90], 105: [1, 91], 109: 92, 113: $VJ, 114: $VK, 117: $VL, 119: $VM, 122: $VN, 123: $VO, 124: $VP, 128: 94 }, o($VA, [2, 186]), o($VA, [2, 187]), o($VA, [2, 188]), o($VA, [2, 189]), o($VQ, [2, 55]), o($VQ, [2, 57], { 55: [1, 106] }), o($VR, [2, 75], { 121: 119, 40: [1, 107], 53: $Ve, 57: [1, 108], 59: [1, 109], 61: [1, 110], 63: [1, 111], 65: [1, 112], 67: [1, 113], 69: $Vf, 72: [1, 114], 74: [1, 115], 76: [1, 116], 77: [1, 117], 79: [1, 118], 97: $Vl, 110: $Vm, 113: $Vn, 114: $Vo, 117: $Vp, 119: $Vq, 122: $Vr, 123: $Vs, 124: $Vt }), o($VS, [2, 182]), o($VS, [2, 143]), o($VS, [2, 144]), o($VS, [2, 145]), o($VS, [2, 146]), o($VS, [2, 147]), o($VS, [2, 148]), o($VS, [2, 149]), o($VS, [2, 150]), o($VS, [2, 151]), o($VS, [2, 152]), o($VS, [2, 153]), { 9: 120, 20: $VB, 21: $VC, 23: $VD }, { 11: 121, 14: [1, 122] }, o($VT, [2, 8]), o($V4, [2, 20]), o($V4, [2, 26]), o($V4, [2, 27]), { 21: [1, 123] }, o($VU, [2, 34], { 30: 124, 22: $Vz }), o($VA, [2, 35]), { 51: 125, 52: 45, 53: $Ve, 54: 46, 56: 47, 69: $Vf, 97: $Vl, 110: $Vm, 113: $Vn, 114: $Vo, 117: $Vp, 119: $Vq, 121: 48, 122: $Vr, 123: $Vs, 124: $Vt }, o($VV, [2, 48]), o($VV, [2, 49]), o($VV, [2, 50]), o($VW, [2, 79], { 82: 126, 71: [1, 128], 83: [1, 127] }), { 85: 129, 87: 130, 88: [1, 131], 89: [1, 132], 124: $VX, 127: $VY }, o([53, 69, 71, 83, 97, 110, 113, 114, 117, 119, 122, 123, 124], [2, 85]), o($VA, [2, 36]), o($VA, [2, 37]), o($VA, [2, 38]), o($VA, [2, 39]), o($VA, [2, 40]), { 22: $VZ, 24: $V_, 26: $V$, 38: $V01, 39: 135, 43: $V11, 53: $V21, 69: $V31, 84: $V41, 88: [1, 137], 89: [1, 138], 91: 148, 92: $V51, 93: $V61, 94: $V71, 95: $V81, 96: $V91, 97: $Va1, 98: $Vb1, 99: 136, 113: $Vc1, 117: $Vd1, 119: $Ve1, 122: $Vf1, 123: $Vg1, 124: $Vh1 }, o($Vi1, $V5, { 17: 161 }), o($VA, [2, 45]), o($VA, [2, 46]), o($VE, [2, 53], { 53: $Vj1 }), { 53: $Ve, 56: 163, 69: $Vf, 97: $Vl, 110: $Vm, 113: $Vn, 114: $Vo, 117: $Vp, 119: $Vq, 121: 48, 122: $Vr, 123: $Vs, 124: $Vt }, { 110: [1, 164], 111: 165, 113: [1, 166] }, { 53: $Ve, 56: 167, 69: $Vf, 97: $Vl, 110: $Vm, 113: $Vn, 114: $Vo, 117: $Vp, 119: $Vq, 121: 48, 122: $Vr, 123: $Vs, 124: $Vt }, { 53: $Ve, 56: 168, 69: $Vf, 97: $Vl, 110: $Vm, 113: $Vn, 114: $Vo, 117: $Vp, 119: $Vq, 121: 48, 122: $Vr, 123: $Vs, 124: $Vt }, o($VT, [2, 108], { 22: [1, 169], 104: [1, 170] }), { 88: [1, 171] }, o($VT, [2, 116], { 128: 173, 22: [1, 172], 26: $VF, 53: $VG, 69: $VH, 97: $VI, 113: $VJ, 114: $VK, 117: $VL, 119: $VM, 122: $VN, 123: $VO, 124: $VP }), o($VT, [2, 118], { 22: [1, 174] }), o($Vk1, [2, 184]), o($Vk1, [2, 171]), o($Vk1, [2, 172]), o($Vk1, [2, 173]), o($Vk1, [2, 174]), o($Vk1, [2, 175]), o($Vk1, [2, 176]), o($Vk1, [2, 177]), o($Vk1, [2, 178]), o($Vk1, [2, 179]), o($Vk1, [2, 180]), o($Vk1, [2, 181]), { 53: $Ve, 56: 175, 69: $Vf, 97: $Vl, 110: $Vm, 113: $Vn, 114: $Vo, 117: $Vp, 119: $Vq, 121: 48, 122: $Vr, 123: $Vs, 124: $Vt }, { 41: 176, 76: $Vl1, 88: $Vm1, 89: $Vn1, 90: 177, 124: $Vo1, 125: $Vp1, 126: $Vq1 }, { 41: 184, 76: $Vl1, 88: $Vm1, 89: $Vn1, 90: 177, 124: $Vo1, 125: $Vp1, 126: $Vq1 }, { 41: 186, 59: [1, 185], 76: $Vl1, 88: $Vm1, 89: $Vn1, 90: 177, 124: $Vo1, 125: $Vp1, 126: $Vq1 }, { 41: 187, 76: $Vl1, 88: $Vm1, 89: $Vn1, 90: 177, 124: $Vo1, 125: $Vp1, 126: $Vq1 }, { 41: 188, 76: $Vl1, 88: $Vm1, 89: $Vn1, 90: 177, 124: $Vo1, 125: $Vp1, 126: $Vq1 }, { 41: 189, 76: $Vl1, 88: $Vm1, 89: $Vn1, 90: 177, 124: $Vo1, 125: $Vp1, 126: $Vq1 }, { 117: [1, 190] }, { 41: 191, 76: $Vl1, 88: $Vm1, 89: $Vn1, 90: 177, 124: $Vo1, 125: $Vp1, 126: $Vq1 }, { 41: 192, 74: [1, 193], 76: $Vl1, 88: $Vm1, 89: $Vn1, 90: 177, 124: $Vo1, 125: $Vp1, 126: $Vq1 }, { 41: 194, 76: $Vl1, 88: $Vm1, 89: $Vn1, 90: 177, 124: $Vo1, 125: $Vp1, 126: $Vq1 }, { 41: 195, 76: $Vl1, 88: $Vm1, 89: $Vn1, 90: 177, 124: $Vo1, 125: $Vp1, 126: $Vq1 }, { 41: 196, 76: $Vl1, 88: $Vm1, 89: $Vn1, 90: 177, 124: $Vo1, 125: $Vp1, 126: $Vq1 }, o($VS, [2, 183]), o($Vr1, [2, 3]), { 8: 197, 15: $Vy }, { 15: [2, 7] }, o($V4, [2, 28]), o($VU, [2, 33]), o($VE, [2, 51], { 30: 198, 22: $Vz }), o($VW, [2, 76], { 22: [1, 199] }), { 22: [1, 200] }, { 41: 201, 76: $Vl1, 88: $Vm1, 89: $Vn1, 90: 177, 124: $Vo1, 125: $Vp1, 126: $Vq1 }, { 86: [1, 202], 87: 203, 124: $VX, 127: $VY }, o($Vs1, [2, 81]), o($Vs1, [2, 83]), o($Vs1, [2, 84]), o($Vs1, [2, 169]), o($Vs1, [2, 170]), { 9: 205, 20: $VB, 21: $VC, 22: $VZ, 23: $VD, 24: $V_, 26: $V$, 38: $V01, 40: [1, 204], 43: $V11, 53: $V21, 69: $V31, 84: $V41, 91: 148, 92: $V51, 93: $V61, 94: $V71, 95: $V81, 96: $V91, 97: $Va1, 98: $Vb1, 99: 206, 113: $Vc1, 117: $Vd1, 119: $Ve1, 122: $Vf1, 123: $Vg1, 124: $Vh1 }, o($Vt1, [2, 102]), o($Vt1, [2, 104]), o($Vt1, [2, 105]), o($Vt1, [2, 158]), o($Vt1, [2, 159]), o($Vt1, [2, 160]), o($Vt1, [2, 161]), o($Vt1, [2, 162]), o($Vt1, [2, 163]), o($Vt1, [2, 164]), o($Vt1, [2, 165]), o($Vt1, [2, 166]), o($Vt1, [2, 167]), o($Vt1, [2, 168]), o($Vt1, [2, 91]), o($Vt1, [2, 92]), o($Vt1, [2, 93]), o($Vt1, [2, 94]), o($Vt1, [2, 95]), o($Vt1, [2, 96]), o($Vt1, [2, 97]), o($Vt1, [2, 98]), o($Vt1, [2, 99]), o($Vt1, [2, 100]), o($Vt1, [2, 101]), { 18: 18, 19: 19, 20: $V6, 21: $V7, 22: $V8, 23: $V9, 32: 24, 33: 25, 34: 26, 35: 27, 36: 28, 37: 29, 38: $Va, 43: [1, 207], 44: 31, 45: $Vb, 47: $Vc, 49: $Vd, 51: 35, 52: 45, 53: $Ve, 54: 46, 56: 47, 69: $Vf, 92: $Vg, 93: $Vh, 94: $Vi, 95: $Vj, 96: $Vk, 97: $Vl, 110: $Vm, 113: $Vn, 114: $Vo, 117: $Vp, 119: $Vq, 121: 48, 122: $Vr, 123: $Vs, 124: $Vt, 129: $Vu, 130: $Vv, 131: $Vw, 132: $Vx }, { 22: $Vz, 30: 208 }, { 22: [1, 209], 53: $Ve, 69: $Vf, 97: $Vl, 110: $Vm, 113: $Vn, 114: $Vo, 117: $Vp, 119: $Vq, 121: 119, 122: $Vr, 123: $Vs, 124: $Vt }, { 22: [1, 210] }, { 22: [1, 211], 114: [1, 212] }, o($Vu1, [2, 129]), { 22: [1, 213], 53: $Ve, 69: $Vf, 97: $Vl, 110: $Vm, 113: $Vn, 114: $Vo, 117: $Vp, 119: $Vq, 121: 119, 122: $Vr, 123: $Vs, 124: $Vt }, { 22: [1, 214], 53: $Ve, 69: $Vf, 97: $Vl, 110: $Vm, 113: $Vn, 114: $Vo, 117: $Vp, 119: $Vq, 121: 119, 122: $Vr, 123: $Vs, 124: $Vt }, { 88: [1, 215] }, o($VT, [2, 110], { 22: [1, 216] }), o($VT, [2, 112], { 22: [1, 217] }), { 88: [1, 218] }, o($Vk1, [2, 185]), { 88: [1, 219], 106: [1, 220] }, o($VQ, [2, 58], { 121: 119, 53: $Ve, 69: $Vf, 97: $Vl, 110: $Vm, 113: $Vn, 114: $Vo, 117: $Vp, 119: $Vq, 122: $Vr, 123: $Vs, 124: $Vt }), { 42: [1, 221], 76: $Vl1, 90: 222, 124: $Vo1, 125: $Vp1, 126: $Vq1 }, o($Vv1, [2, 87]), o($Vv1, [2, 89]), o($Vv1, [2, 90]), o($Vv1, [2, 154]), o($Vv1, [2, 155]), o($Vv1, [2, 156]), o($Vv1, [2, 157]), { 58: [1, 223], 76: $Vl1, 90: 222, 124: $Vo1, 125: $Vp1, 126: $Vq1 }, { 41: 224, 76: $Vl1, 88: $Vm1, 89: $Vn1, 90: 177, 124: $Vo1, 125: $Vp1, 126: $Vq1 }, { 60: [1, 225], 76: $Vl1, 90: 222, 124: $Vo1, 125: $Vp1, 126: $Vq1 }, { 62: [1, 226], 76: $Vl1, 90: 222, 124: $Vo1, 125: $Vp1, 126: $Vq1 }, { 64: [1, 227], 76: $Vl1, 90: 222, 124: $Vo1, 125: $Vp1, 126: $Vq1 }, { 66: [1, 228], 76: $Vl1, 90: 222, 124: $Vo1, 125: $Vp1, 126: $Vq1 }, { 69: [1, 229] }, { 73: [1, 230], 76: $Vl1, 90: 222, 124: $Vo1, 125: $Vp1, 126: $Vq1 }, { 75: [1, 231], 76: $Vl1, 90: 222, 124: $Vo1, 125: $Vp1, 126: $Vq1 }, { 41: 232, 76: $Vl1, 88: $Vm1, 89: $Vn1, 90: 177, 124: $Vo1, 125: $Vp1, 126: $Vq1 }, { 42: [1, 233], 76: $Vl1, 90: 222, 124: $Vo1, 125: $Vp1, 126: $Vq1 }, { 76: $Vl1, 78: [1, 234], 80: [1, 235], 90: 222, 124: $Vo1, 125: $Vp1, 126: $Vq1 }, { 76: $Vl1, 78: [1, 237], 80: [1, 236], 90: 222, 124: $Vo1, 125: $Vp1, 126: $Vq1 }, { 9: 238, 20: $VB, 21: $VC, 23: $VD }, o($VE, [2, 52], { 53: $Vj1 }), o($VW, [2, 78]), o($VW, [2, 77]), { 71: [1, 239], 76: $Vl1, 90: 222, 124: $Vo1, 125: $Vp1, 126: $Vq1 }, o($VW, [2, 80]), o($Vs1, [2, 82]), { 41: 240, 76: $Vl1, 88: $Vm1, 89: $Vn1, 90: 177, 124: $Vo1, 125: $Vp1, 126: $Vq1 }, o($Vi1, $V5, { 17: 241 }), o($Vt1, [2, 103]), o($VA, [2, 43]), { 52: 242, 53: $Ve, 54: 46, 56: 47, 69: $Vf, 97: $Vl, 110: $Vm, 113: $Vn, 114: $Vo, 117: $Vp, 119: $Vq, 121: 48, 122: $Vr, 123: $Vs, 124: $Vt }, { 22: $Vw1, 69: $Vx1, 92: $Vy1, 100: 243, 113: $Vz1, 115: 244, 116: 245, 117: $VA1, 118: $VB1, 119: $VC1, 120: $VD1 }, { 22: $Vw1, 69: $Vx1, 92: $Vy1, 100: 254, 112: [1, 255], 113: $Vz1, 115: 244, 116: 245, 117: $VA1, 118: $VB1, 119: $VC1, 120: $VD1 }, { 22: $Vw1, 69: $Vx1, 92: $Vy1, 100: 256, 112: [1, 257], 113: $Vz1, 115: 244, 116: 245, 117: $VA1, 118: $VB1, 119: $VC1, 120: $VD1 }, { 113: [1, 258] }, { 22: $Vw1, 69: $Vx1, 92: $Vy1, 100: 259, 113: $Vz1, 115: 244, 116: 245, 117: $VA1, 118: $VB1, 119: $VC1, 120: $VD1 }, { 53: $Ve, 56: 260, 69: $Vf, 97: $Vl, 110: $Vm, 113: $Vn, 114: $Vo, 117: $Vp, 119: $Vq, 121: 48, 122: $Vr, 123: $Vs, 124: $Vt }, o($VT, [2, 109]), { 88: [1, 261] }, { 88: [1, 262], 106: [1, 263] }, o($VT, [2, 117]), o($VT, [2, 119], { 22: [1, 264] }), o($VT, [2, 120]), o($VR, [2, 59]), o($Vv1, [2, 88]), o($VR, [2, 60]), { 60: [1, 265], 76: $Vl1, 90: 222, 124: $Vo1, 125: $Vp1, 126: $Vq1 }, o($VR, [2, 67]), o($VR, [2, 62]), o($VR, [2, 63]), o($VR, [2, 64]), { 117: [1, 266] }, o($VR, [2, 66]), o($VR, [2, 68]), { 75: [1, 267], 76: $Vl1, 90: 222, 124: $Vo1, 125: $Vp1, 126: $Vq1 }, o($VR, [2, 70]), o($VR, [2, 71]), o($VR, [2, 73]), o($VR, [2, 72]), o($VR, [2, 74]), o($Vr1, [2, 4]), o([22, 53, 69, 97, 110, 113, 114, 117, 119, 122, 123, 124], [2, 86]), { 42: [1, 268], 76: $Vl1, 90: 222, 124: $Vo1, 125: $Vp1, 126: $Vq1 }, { 18: 18, 19: 19, 20: $V6, 21: $V7, 22: $V8, 23: $V9, 32: 24, 33: 25, 34: 26, 35: 27, 36: 28, 37: 29, 38: $Va, 43: [1, 269], 44: 31, 45: $Vb, 47: $Vc, 49: $Vd, 51: 35, 52: 45, 53: $Ve, 54: 46, 56: 47, 69: $Vf, 92: $Vg, 93: $Vh, 94: $Vi, 95: $Vj, 96: $Vk, 97: $Vl, 110: $Vm, 113: $Vn, 114: $Vo, 117: $Vp, 119: $Vq, 121: 48, 122: $Vr, 123: $Vs, 124: $Vt, 129: $Vu, 130: $Vv, 131: $Vw, 132: $Vx }, o($VQ, [2, 56]), o($VT, [2, 122], { 114: $VE1 }), o($VF1, [2, 131], { 116: 271, 22: $Vw1, 69: $Vx1, 92: $Vy1, 113: $Vz1, 117: $VA1, 118: $VB1, 119: $VC1, 120: $VD1 }), o($VG1, [2, 133]), o($VG1, [2, 135]), o($VG1, [2, 136]), o($VG1, [2, 137]), o($VG1, [2, 138]), o($VG1, [2, 139]), o($VG1, [2, 140]), o($VG1, [2, 141]), o($VG1, [2, 142]), o($VT, [2, 123], { 114: $VE1 }), { 22: [1, 272] }, o($VT, [2, 124], { 114: $VE1 }), { 22: [1, 273] }, o($Vu1, [2, 130]), o($VT, [2, 106], { 114: $VE1 }), o($VT, [2, 107], { 121: 119, 53: $Ve, 69: $Vf, 97: $Vl, 110: $Vm, 113: $Vn, 114: $Vo, 117: $Vp, 119: $Vq, 122: $Vr, 123: $Vs, 124: $Vt }), o($VT, [2, 111]), o($VT, [2, 113], { 22: [1, 274] }), o($VT, [2, 114]), { 106: [1, 275] }, { 60: [1, 276] }, { 71: [1, 277] }, { 75: [1, 278] }, { 9: 279, 20: $VB, 21: $VC, 23: $VD }, o($VA, [2, 42]), { 22: $Vw1, 69: $Vx1, 92: $Vy1, 113: $Vz1, 115: 280, 116: 245, 117: $VA1, 118: $VB1, 119: $VC1, 120: $VD1 }, o($VG1, [2, 134]), { 26: $VF, 53: $VG, 69: $VH, 97: $VI, 109: 281, 113: $VJ, 114: $VK, 117: $VL, 119: $VM, 122: $VN, 123: $VO, 124: $VP, 128: 94 }, { 26: $VF, 53: $VG, 69: $VH, 97: $VI, 109: 282, 113: $VJ, 114: $VK, 117: $VL, 119: $VM, 122: $VN, 123: $VO, 124: $VP, 128: 94 }, { 106: [1, 283] }, o($VT, [2, 121]), o($VR, [2, 61]), { 41: 284, 76: $Vl1, 88: $Vm1, 89: $Vn1, 90: 177, 124: $Vo1, 125: $Vp1, 126: $Vq1 }, o($VR, [2, 69]), o($Vi1, $V5, { 17: 285 }), o($VF1, [2, 132], { 116: 271, 22: $Vw1, 69: $Vx1, 92: $Vy1, 113: $Vz1, 117: $VA1, 118: $VB1, 119: $VC1, 120: $VD1 }), o($VT, [2, 127], { 128: 173, 22: [1, 286], 26: $VF, 53: $VG, 69: $VH, 97: $VI, 113: $VJ, 114: $VK, 117: $VL, 119: $VM, 122: $VN, 123: $VO, 124: $VP }), o($VT, [2, 128], { 128: 173, 22: [1, 287], 26: $VF, 53: $VG, 69: $VH, 97: $VI, 113: $VJ, 114: $VK, 117: $VL, 119: $VM, 122: $VN, 123: $VO, 124: $VP }), o($VT, [2, 115]), { 42: [1, 288], 76: $Vl1, 90: 222, 124: $Vo1, 125: $Vp1, 126: $Vq1 }, { 18: 18, 19: 19, 20: $V6, 21: $V7, 22: $V8, 23: $V9, 32: 24, 33: 25, 34: 26, 35: 27, 36: 28, 37: 29, 38: $Va, 43: [1, 289], 44: 31, 45: $Vb, 47: $Vc, 49: $Vd, 51: 35, 52: 45, 53: $Ve, 54: 46, 56: 47, 69: $Vf, 92: $Vg, 93: $Vh, 94: $Vi, 95: $Vj, 96: $Vk, 97: $Vl, 110: $Vm, 113: $Vn, 114: $Vo, 117: $Vp, 119: $Vq, 121: 48, 122: $Vr, 123: $Vs, 124: $Vt, 129: $Vu, 130: $Vv, 131: $Vw, 132: $Vx }, { 22: $Vw1, 69: $Vx1, 92: $Vy1, 100: 290, 113: $Vz1, 115: 244, 116: 245, 117: $VA1, 118: $VB1, 119: $VC1, 120: $VD1 }, { 22: $Vw1, 69: $Vx1, 92: $Vy1, 100: 291, 113: $Vz1, 115: 244, 116: 245, 117: $VA1, 118: $VB1, 119: $VC1, 120: $VD1 }, o($VR, [2, 65]), o($VA, [2, 41]), o($VT, [2, 125], { 114: $VE1 }), o($VT, [2, 126], { 114: $VE1 })],
    defaultActions: { 2: [2, 1], 9: [2, 5], 10: [2, 2], 122: [2, 7] },
    parseError: function parseError(str, hash) {
      if (hash.recoverable) {
        this.trace(str);
      } else {
        var error = new Error(str);
        error.hash = hash;
        throw error;
      }
    },
    parse: function parse(input) {
      var self = this, stack = [0], tstack = [], vstack = [null], lstack = [], table = this.table, yytext = "", yylineno = 0, yyleng = 0, TERROR = 2, EOF = 1;
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
      function lex2() {
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
      var symbol, state, action, r, yyval = {}, p, len, newState, expected;
      while (true) {
        state = stack[stack.length - 1];
        if (this.defaultActions[state]) {
          action = this.defaultActions[state];
        } else {
          if (symbol === null || typeof symbol == "undefined") {
            symbol = lex2();
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
            {
              yyleng = lexer2.yyleng;
              yytext = lexer2.yytext;
              yylineno = lexer2.yylineno;
              yyloc = lexer2.yylloc;
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
    }
  };
  var lexer = function() {
    var lexer2 = {
      EOF: 1,
      parseError: function parseError(str, hash) {
        if (this.yy.parser) {
          this.yy.parser.parseError(str, hash);
        } else {
          throw new Error(str);
        }
      },
      // resets the lexer, sets new input
      setInput: function(input, yy) {
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
      },
      // consumes and returns one char from the input
      input: function() {
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
      },
      // unshifts one char (or a string) into the input
      unput: function(ch) {
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
      },
      // When called from action, caches matched text and appends it on next action
      more: function() {
        this._more = true;
        return this;
      },
      // When called from action, signals the lexer that this rule fails to match the input, so the next matching rule (regex) should be tested instead.
      reject: function() {
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
      },
      // retain first n characters of the match
      less: function(n) {
        this.unput(this.match.slice(n));
      },
      // displays already matched input, i.e. for error messages
      pastInput: function() {
        var past = this.matched.substr(0, this.matched.length - this.match.length);
        return (past.length > 20 ? "..." : "") + past.substr(-20).replace(/\n/g, "");
      },
      // displays upcoming input, i.e. for error messages
      upcomingInput: function() {
        var next = this.match;
        if (next.length < 20) {
          next += this._input.substr(0, 20 - next.length);
        }
        return (next.substr(0, 20) + (next.length > 20 ? "..." : "")).replace(/\n/g, "");
      },
      // displays the character position where the lexing error occurred, i.e. for error messages
      showPosition: function() {
        var pre = this.pastInput();
        var c = new Array(pre.length + 1).join("-");
        return pre + this.upcomingInput() + "\n" + c + "^";
      },
      // test the lexed token: return FALSE when not a match, otherwise return token
      test_match: function(match, indexed_rule) {
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
      },
      // return next match in input
      next: function() {
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
      },
      // return next match that has a token
      lex: function lex2() {
        var r = this.next();
        if (r) {
          return r;
        } else {
          return this.lex();
        }
      },
      // activates a new lexer condition state (pushes the new lexer condition state onto the condition stack)
      begin: function begin(condition) {
        this.conditionStack.push(condition);
      },
      // pop the previously active lexer condition state off the condition stack
      popState: function popState() {
        var n = this.conditionStack.length - 1;
        if (n > 0) {
          return this.conditionStack.pop();
        } else {
          return this.conditionStack[0];
        }
      },
      // produce the lexer rule set which is active for the currently active lexer condition state
      _currentRules: function _currentRules() {
        if (this.conditionStack.length && this.conditionStack[this.conditionStack.length - 1]) {
          return this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules;
        } else {
          return this.conditions["INITIAL"].rules;
        }
      },
      // return the currently active lexer condition state; when an index argument is provided it produces the N-th previous condition state, if available
      topState: function topState(n) {
        n = this.conditionStack.length - 1 - Math.abs(n || 0);
        if (n >= 0) {
          return this.conditionStack[n];
        } else {
          return "INITIAL";
        }
      },
      // alias for begin(condition)
      pushState: function pushState(condition) {
        this.begin(condition);
      },
      // return the number of states currently on the stack
      stateStackSize: function stateStackSize() {
        return this.conditionStack.length;
      },
      options: {},
      performAction: function anonymous(yy, yy_, $avoiding_name_collisions, YY_START) {
        switch ($avoiding_name_collisions) {
          case 0:
            this.begin("open_directive");
            return 12;
          case 1:
            this.begin("type_directive");
            return 13;
          case 2:
            this.popState();
            this.begin("arg_directive");
            return 10;
          case 3:
            this.popState();
            this.popState();
            return 15;
          case 4:
            return 14;
          case 5:
            this.begin("acc_title");
            return 45;
          case 6:
            this.popState();
            return "acc_title_value";
          case 7:
            this.begin("acc_descr");
            return 47;
          case 8:
            this.popState();
            return "acc_descr_value";
          case 9:
            this.begin("acc_descr_multiline");
            break;
          case 10:
            this.popState();
            break;
          case 11:
            return "acc_descr_multiline_value";
          case 12:
            this.begin("callbackname");
            break;
          case 13:
            this.popState();
            break;
          case 14:
            this.popState();
            this.begin("callbackargs");
            break;
          case 15:
            return 103;
          case 16:
            this.popState();
            break;
          case 17:
            return 104;
          case 18:
            return "MD_STR";
          case 19:
            this.popState();
            break;
          case 20:
            this.begin("md_string");
            break;
          case 21:
            return "STR";
          case 22:
            this.popState();
            break;
          case 23:
            this.pushState("string");
            break;
          case 24:
            return 92;
          case 25:
            return 110;
          case 26:
            return 93;
          case 27:
            return 112;
          case 28:
            return 94;
          case 29:
            return 95;
          case 30:
            return 105;
          case 31:
            this.begin("click");
            break;
          case 32:
            this.popState();
            break;
          case 33:
            return 96;
          case 34:
            if (yy.lex.firstGraph()) {
              this.begin("dir");
            }
            return 24;
          case 35:
            if (yy.lex.firstGraph()) {
              this.begin("dir");
            }
            return 24;
          case 36:
            if (yy.lex.firstGraph()) {
              this.begin("dir");
            }
            return 24;
          case 37:
            return 38;
          case 38:
            return 43;
          case 39:
            return 106;
          case 40:
            return 106;
          case 41:
            return 106;
          case 42:
            return 106;
          case 43:
            this.popState();
            return 25;
          case 44:
            this.popState();
            return 26;
          case 45:
            this.popState();
            return 26;
          case 46:
            this.popState();
            return 26;
          case 47:
            this.popState();
            return 26;
          case 48:
            this.popState();
            return 26;
          case 49:
            this.popState();
            return 26;
          case 50:
            this.popState();
            return 26;
          case 51:
            this.popState();
            return 26;
          case 52:
            this.popState();
            return 26;
          case 53:
            this.popState();
            return 26;
          case 54:
            return 129;
          case 55:
            return 130;
          case 56:
            return 131;
          case 57:
            return 132;
          case 58:
            return 113;
          case 59:
            return 119;
          case 60:
            return 55;
          case 61:
            return 69;
          case 62:
            return 53;
          case 63:
            return 20;
          case 64:
            return 114;
          case 65:
            return 123;
          case 66:
            this.popState();
            return 86;
          case 67:
            this.pushState("edgeText");
            return 84;
          case 68:
            return 127;
          case 69:
            this.popState();
            return 86;
          case 70:
            this.pushState("thickEdgeText");
            return 84;
          case 71:
            return 127;
          case 72:
            this.popState();
            return 86;
          case 73:
            this.pushState("dottedEdgeText");
            return 84;
          case 74:
            return 127;
          case 75:
            return 86;
          case 76:
            this.popState();
            return 62;
          case 77:
            return "TEXT";
          case 78:
            this.pushState("ellipseText");
            return 61;
          case 79:
            this.popState();
            return 64;
          case 80:
            this.pushState("text");
            return 63;
          case 81:
            this.popState();
            return 66;
          case 82:
            this.pushState("text");
            return 65;
          case 83:
            return 67;
          case 84:
            this.pushState("text");
            return 76;
          case 85:
            this.popState();
            return 73;
          case 86:
            this.pushState("text");
            return 72;
          case 87:
            this.popState();
            return 58;
          case 88:
            this.pushState("text");
            return 57;
          case 89:
            this.popState();
            return 78;
          case 90:
            this.popState();
            return 80;
          case 91:
            return 125;
          case 92:
            this.pushState("trapText");
            return 77;
          case 93:
            this.pushState("trapText");
            return 79;
          case 94:
            return 126;
          case 95:
            return 76;
          case 96:
            return 98;
          case 97:
            return "SEP";
          case 98:
            return 97;
          case 99:
            return 123;
          case 100:
            return 119;
          case 101:
            return 53;
          case 102:
            return 117;
          case 103:
            return 122;
          case 104:
            return 124;
          case 105:
            this.popState();
            return 71;
          case 106:
            this.pushState("text");
            return 71;
          case 107:
            this.popState();
            return 60;
          case 108:
            this.pushState("text");
            return 59;
          case 109:
            this.popState();
            return 42;
          case 110:
            this.pushState("text");
            return 40;
          case 111:
            this.popState();
            return 75;
          case 112:
            this.pushState("text");
            return 74;
          case 113:
            return "TEXT";
          case 114:
            return "QUOTE";
          case 115:
            return 21;
          case 116:
            return 22;
          case 117:
            return 23;
        }
      },
      rules: [/^(?:%%\{)/, /^(?:((?:(?!\}%%)[^:.])*))/, /^(?::)/, /^(?:\}%%)/, /^(?:((?:(?!\}%%).|\n)*))/, /^(?:accTitle\s*:\s*)/, /^(?:(?!\n||)*[^\n]*)/, /^(?:accDescr\s*:\s*)/, /^(?:(?!\n||)*[^\n]*)/, /^(?:accDescr\s*\{\s*)/, /^(?:[\}])/, /^(?:[^\}]*)/, /^(?:call[\s]+)/, /^(?:\([\s]*\))/, /^(?:\()/, /^(?:[^(]*)/, /^(?:\))/, /^(?:[^)]*)/, /^(?:[^`"]+)/, /^(?:[`]["])/, /^(?:["][`])/, /^(?:[^"]+)/, /^(?:["])/, /^(?:["])/, /^(?:style\b)/, /^(?:default\b)/, /^(?:linkStyle\b)/, /^(?:interpolate\b)/, /^(?:classDef\b)/, /^(?:class\b)/, /^(?:href[\s])/, /^(?:click[\s]+)/, /^(?:[\s\n])/, /^(?:[^\s\n]*)/, /^(?:flowchart-elk\b)/, /^(?:graph\b)/, /^(?:flowchart\b)/, /^(?:subgraph\b)/, /^(?:end\b\s*)/, /^(?:_self\b)/, /^(?:_blank\b)/, /^(?:_parent\b)/, /^(?:_top\b)/, /^(?:(\r?\n)*\s*\n)/, /^(?:\s*LR\b)/, /^(?:\s*RL\b)/, /^(?:\s*TB\b)/, /^(?:\s*BT\b)/, /^(?:\s*TD\b)/, /^(?:\s*BR\b)/, /^(?:\s*<)/, /^(?:\s*>)/, /^(?:\s*\^)/, /^(?:\s*v\b)/, /^(?:.*direction\s+TB[^\n]*)/, /^(?:.*direction\s+BT[^\n]*)/, /^(?:.*direction\s+RL[^\n]*)/, /^(?:.*direction\s+LR[^\n]*)/, /^(?:[0-9]+)/, /^(?:#)/, /^(?::::)/, /^(?::)/, /^(?:&)/, /^(?:;)/, /^(?:,)/, /^(?:\*)/, /^(?:\s*[xo<]?--+[-xo>]\s*)/, /^(?:\s*[xo<]?--\s*)/, /^(?:[^-]|-(?!-)+)/, /^(?:\s*[xo<]?==+[=xo>]\s*)/, /^(?:\s*[xo<]?==\s*)/, /^(?:[^=]|=(?!))/, /^(?:\s*[xo<]?-?\.+-[xo>]?\s*)/, /^(?:\s*[xo<]?-\.\s*)/, /^(?:[^\.]|\.(?!))/, /^(?:\s*~~[\~]+\s*)/, /^(?:[-/\)][\)])/, /^(?:[^\(\)\[\]\{\}]|(?!\)+))/, /^(?:\(-)/, /^(?:\]\))/, /^(?:\(\[)/, /^(?:\]\])/, /^(?:\[\[)/, /^(?:\[\|)/, /^(?:>)/, /^(?:\)\])/, /^(?:\[\()/, /^(?:\)\)\))/, /^(?:\(\(\()/, /^(?:[\\(?=\])][\]])/, /^(?:\/(?=\])\])/, /^(?:\/(?!\])|\\(?!\])|[^\\\[\]\(\)\{\}\/]+)/, /^(?:\[\/)/, /^(?:\[\\)/, /^(?:<)/, /^(?:>)/, /^(?:\^)/, /^(?:\\\|)/, /^(?:v\b)/, /^(?:\*)/, /^(?:#)/, /^(?:&)/, /^(?:([A-Za-z0-9!"\#$%&'*+\.`?\\_\/]|-(?=[^\>\-\.])|(?!))+)/, /^(?:-)/, /^(?:[\u00AA\u00B5\u00BA\u00C0-\u00D6\u00D8-\u00F6]|[\u00F8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377]|[\u037A-\u037D\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5]|[\u03F7-\u0481\u048A-\u0527\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA]|[\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE]|[\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA]|[\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u08A0]|[\u08A2-\u08AC\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0977]|[\u0979-\u097F\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2]|[\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A]|[\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39]|[\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8]|[\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0B05-\u0B0C]|[\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C]|[\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99]|[\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0]|[\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C33\u0C35-\u0C39\u0C3D]|[\u0C58\u0C59\u0C60\u0C61\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3]|[\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10]|[\u0D12-\u0D3A\u0D3D\u0D4E\u0D60\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1]|[\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81]|[\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3]|[\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6]|[\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A]|[\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081]|[\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D]|[\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0]|[\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310]|[\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F4\u1401-\u166C]|[\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u1700-\u170C\u170E-\u1711]|[\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7]|[\u17DC\u1820-\u1877\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191C]|[\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19C1-\u19C7\u1A00-\u1A16]|[\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF]|[\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1CE9-\u1CEC]|[\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D]|[\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D]|[\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3]|[\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F]|[\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128]|[\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2183\u2184]|[\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3]|[\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6]|[\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE]|[\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005\u3006\u3031-\u3035\u303B\u303C]|[\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D]|[\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FCC]|[\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B]|[\uA640-\uA66E\uA67F-\uA697\uA6A0-\uA6E5\uA717-\uA71F\uA722-\uA788]|[\uA78B-\uA78E\uA790-\uA793\uA7A0-\uA7AA\uA7F8-\uA801\uA803-\uA805]|[\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB]|[\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uAA00-\uAA28]|[\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA80-\uAAAF\uAAB1\uAAB5]|[\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4]|[\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E]|[\uABC0-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D]|[\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36]|[\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D]|[\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC]|[\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF]|[\uFFD2-\uFFD7\uFFDA-\uFFDC])/, /^(?:\|)/, /^(?:\|)/, /^(?:\))/, /^(?:\()/, /^(?:\])/, /^(?:\[)/, /^(?:(\}))/, /^(?:\{)/, /^(?:[^\[\]\(\)\{\}\|\"]+)/, /^(?:")/, /^(?:(\r?\n)+)/, /^(?:\s)/, /^(?:$)/],
      conditions: { "close_directive": { "rules": [20, 23, 75, 78, 80, 82, 86, 88, 92, 93, 106, 108, 110, 112], "inclusive": false }, "arg_directive": { "rules": [3, 4, 20, 23, 75, 78, 80, 82, 86, 88, 92, 93, 106, 108, 110, 112], "inclusive": false }, "type_directive": { "rules": [2, 3, 20, 23, 75, 78, 80, 82, 86, 88, 92, 93, 106, 108, 110, 112], "inclusive": false }, "open_directive": { "rules": [1, 20, 23, 75, 78, 80, 82, 86, 88, 92, 93, 106, 108, 110, 112], "inclusive": false }, "callbackargs": { "rules": [16, 17, 20, 23, 75, 78, 80, 82, 86, 88, 92, 93, 106, 108, 110, 112], "inclusive": false }, "callbackname": { "rules": [13, 14, 15, 20, 23, 75, 78, 80, 82, 86, 88, 92, 93, 106, 108, 110, 112], "inclusive": false }, "href": { "rules": [20, 23, 75, 78, 80, 82, 86, 88, 92, 93, 106, 108, 110, 112], "inclusive": false }, "click": { "rules": [20, 23, 32, 33, 75, 78, 80, 82, 86, 88, 92, 93, 106, 108, 110, 112], "inclusive": false }, "dottedEdgeText": { "rules": [20, 23, 72, 74, 75, 78, 80, 82, 86, 88, 92, 93, 106, 108, 110, 112], "inclusive": false }, "thickEdgeText": { "rules": [20, 23, 69, 71, 75, 78, 80, 82, 86, 88, 92, 93, 106, 108, 110, 112], "inclusive": false }, "edgeText": { "rules": [20, 23, 66, 68, 75, 78, 80, 82, 86, 88, 92, 93, 106, 108, 110, 112], "inclusive": false }, "trapText": { "rules": [20, 23, 75, 78, 80, 82, 86, 88, 89, 90, 91, 92, 93, 106, 108, 110, 112], "inclusive": false }, "ellipseText": { "rules": [20, 23, 75, 76, 77, 78, 80, 82, 86, 88, 92, 93, 106, 108, 110, 112], "inclusive": false }, "text": { "rules": [20, 23, 75, 78, 79, 80, 81, 82, 85, 86, 87, 88, 92, 93, 105, 106, 107, 108, 109, 110, 111, 112, 113], "inclusive": false }, "vertex": { "rules": [20, 23, 75, 78, 80, 82, 86, 88, 92, 93, 106, 108, 110, 112], "inclusive": false }, "dir": { "rules": [20, 23, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 75, 78, 80, 82, 86, 88, 92, 93, 106, 108, 110, 112], "inclusive": false }, "acc_descr_multiline": { "rules": [10, 11, 20, 23, 75, 78, 80, 82, 86, 88, 92, 93, 106, 108, 110, 112], "inclusive": false }, "acc_descr": { "rules": [8, 20, 23, 75, 78, 80, 82, 86, 88, 92, 93, 106, 108, 110, 112], "inclusive": false }, "acc_title": { "rules": [6, 20, 23, 75, 78, 80, 82, 86, 88, 92, 93, 106, 108, 110, 112], "inclusive": false }, "md_string": { "rules": [18, 19, 20, 23, 75, 78, 80, 82, 86, 88, 92, 93, 106, 108, 110, 112], "inclusive": false }, "string": { "rules": [20, 21, 22, 23, 75, 78, 80, 82, 86, 88, 92, 93, 106, 108, 110, 112], "inclusive": false }, "INITIAL": { "rules": [0, 5, 7, 9, 12, 20, 23, 24, 25, 26, 27, 28, 29, 30, 31, 34, 35, 36, 37, 38, 39, 40, 41, 42, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 69, 70, 72, 73, 75, 78, 80, 82, 83, 84, 86, 88, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 106, 108, 110, 112, 114, 115, 116, 117], "inclusive": true } }
    };
    return lexer2;
  }();
  parser2.lexer = lexer;
  function Parser() {
    this.yy = {};
  }
  Parser.prototype = parser2;
  parser2.Parser = Parser;
  return new Parser();
}();
parser.parser = parser;
const parser$1 = parser;
const MERMAID_DOM_ID_PREFIX = "flowchart-";
let vertexCounter = 0;
let config = getConfig();
let vertices = {};
let edges = [];
let classes = {};
let subGraphs = [];
let subGraphLookup = {};
let tooltips = {};
let subCount = 0;
let firstGraphFlag = true;
let direction;
let version;
let funs = [];
const sanitizeText = (txt) => common.sanitizeText(txt, config);
const parseDirective = function(statement, context, type) {
  mermaidAPI.parseDirective(this, statement, context, type);
};
const lookUpDomId = function(id) {
  const veritceKeys = Object.keys(vertices);
  for (const veritceKey of veritceKeys) {
    if (vertices[veritceKey].id === id) {
      return vertices[veritceKey].domId;
    }
  }
  return id;
};
const addVertex = function(_id, textObj, type, style, classes2, dir, props = {}) {
  let txt;
  let id = _id;
  if (id === void 0) {
    return;
  }
  if (id.trim().length === 0) {
    return;
  }
  if (vertices[id] === void 0) {
    vertices[id] = {
      id,
      labelType: "text",
      domId: MERMAID_DOM_ID_PREFIX + id + "-" + vertexCounter,
      styles: [],
      classes: []
    };
  }
  vertexCounter++;
  if (textObj !== void 0) {
    config = getConfig();
    txt = sanitizeText(textObj.text.trim());
    vertices[id].labelType = textObj.type;
    if (txt[0] === '"' && txt[txt.length - 1] === '"') {
      txt = txt.substring(1, txt.length - 1);
    }
    vertices[id].text = txt;
  } else {
    if (vertices[id].text === void 0) {
      vertices[id].text = _id;
    }
  }
  if (type !== void 0) {
    vertices[id].type = type;
  }
  if (style !== void 0 && style !== null) {
    style.forEach(function(s) {
      vertices[id].styles.push(s);
    });
  }
  if (classes2 !== void 0 && classes2 !== null) {
    classes2.forEach(function(s) {
      vertices[id].classes.push(s);
    });
  }
  if (dir !== void 0) {
    vertices[id].dir = dir;
  }
  if (vertices[id].props === void 0) {
    vertices[id].props = props;
  } else if (props !== void 0) {
    Object.assign(vertices[id].props, props);
  }
};
const addSingleLink = function(_start, _end, type) {
  let start = _start;
  let end = _end;
  const edge = { start, end, type: void 0, text: "", labelType: "text" };
  log.info("abc78 Got edge...", edge);
  const linkTextObj = type.text;
  if (linkTextObj !== void 0) {
    edge.text = sanitizeText(linkTextObj.text.trim());
    if (edge.text[0] === '"' && edge.text[edge.text.length - 1] === '"') {
      edge.text = edge.text.substring(1, edge.text.length - 1);
    }
    edge.labelType = linkTextObj.type;
  }
  if (type !== void 0) {
    edge.type = type.type;
    edge.stroke = type.stroke;
    edge.length = type.length;
  }
  edges.push(edge);
};
const addLink = function(_start, _end, type) {
  log.info("addLink (abc78)", _start, _end, type);
  let i, j;
  for (i = 0; i < _start.length; i++) {
    for (j = 0; j < _end.length; j++) {
      addSingleLink(_start[i], _end[j], type);
    }
  }
};
const updateLinkInterpolate = function(positions, interp) {
  positions.forEach(function(pos) {
    if (pos === "default") {
      edges.defaultInterpolate = interp;
    } else {
      edges[pos].interpolate = interp;
    }
  });
};
const updateLink = function(positions, style) {
  positions.forEach(function(pos) {
    if (pos === "default") {
      edges.defaultStyle = style;
    } else {
      if (utils.isSubstringInArray("fill", style) === -1) {
        style.push("fill:none");
      }
      edges[pos].style = style;
    }
  });
};
const addClass = function(ids, style) {
  ids.split(",").forEach(function(id) {
    if (classes[id] === void 0) {
      classes[id] = { id, styles: [], textStyles: [] };
    }
    if (style !== void 0 && style !== null) {
      style.forEach(function(s) {
        if (s.match("color")) {
          const newStyle = s.replace("fill", "bgFill").replace("color", "fill");
          classes[id].textStyles.push(newStyle);
        }
        classes[id].styles.push(s);
      });
    }
  });
};
const setDirection = function(dir) {
  direction = dir;
  if (direction.match(/.*</)) {
    direction = "RL";
  }
  if (direction.match(/.*\^/)) {
    direction = "BT";
  }
  if (direction.match(/.*>/)) {
    direction = "LR";
  }
  if (direction.match(/.*v/)) {
    direction = "TB";
  }
  if (direction === "TD") {
    direction = "TB";
  }
};
const setClass = function(ids, className) {
  ids.split(",").forEach(function(_id) {
    let id = _id;
    if (vertices[id] !== void 0) {
      vertices[id].classes.push(className);
    }
    if (subGraphLookup[id] !== void 0) {
      subGraphLookup[id].classes.push(className);
    }
  });
};
const setTooltip = function(ids, tooltip) {
  ids.split(",").forEach(function(id) {
    if (tooltip !== void 0) {
      tooltips[version === "gen-1" ? lookUpDomId(id) : id] = sanitizeText(tooltip);
    }
  });
};
const setClickFun = function(id, functionName, functionArgs) {
  let domId = lookUpDomId(id);
  if (getConfig().securityLevel !== "loose") {
    return;
  }
  if (functionName === void 0) {
    return;
  }
  let argList = [];
  if (typeof functionArgs === "string") {
    argList = functionArgs.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
    for (let i = 0; i < argList.length; i++) {
      let item = argList[i].trim();
      if (item.charAt(0) === '"' && item.charAt(item.length - 1) === '"') {
        item = item.substr(1, item.length - 2);
      }
      argList[i] = item;
    }
  }
  if (argList.length === 0) {
    argList.push(id);
  }
  if (vertices[id] !== void 0) {
    vertices[id].haveCallback = true;
    funs.push(function() {
      const elem = document.querySelector(`[id="${domId}"]`);
      if (elem !== null) {
        elem.addEventListener(
          "click",
          function() {
            utils.runFunc(functionName, ...argList);
          },
          false
        );
      }
    });
  }
};
const setLink = function(ids, linkStr, target) {
  ids.split(",").forEach(function(id) {
    if (vertices[id] !== void 0) {
      vertices[id].link = utils.formatUrl(linkStr, config);
      vertices[id].linkTarget = target;
    }
  });
  setClass(ids, "clickable");
};
const getTooltip = function(id) {
  if (tooltips.hasOwnProperty(id)) {
    return tooltips[id];
  }
  return void 0;
};
const setClickEvent = function(ids, functionName, functionArgs) {
  ids.split(",").forEach(function(id) {
    setClickFun(id, functionName, functionArgs);
  });
  setClass(ids, "clickable");
};
const bindFunctions = function(element) {
  funs.forEach(function(fun) {
    fun(element);
  });
};
const getDirection = function() {
  return direction.trim();
};
const getVertices = function() {
  return vertices;
};
const getEdges = function() {
  return edges;
};
const getClasses = function() {
  return classes;
};
const setupToolTips = function(element) {
  let tooltipElem = d3select(".mermaidTooltip");
  if ((tooltipElem._groups || tooltipElem)[0][0] === null) {
    tooltipElem = d3select("body").append("div").attr("class", "mermaidTooltip").style("opacity", 0);
  }
  const svg = d3select(element).select("svg");
  const nodes = svg.selectAll("g.node");
  nodes.on("mouseover", function() {
    const el = d3select(this);
    const title = el.attr("title");
    if (title === null) {
      return;
    }
    const rect = this.getBoundingClientRect();
    tooltipElem.transition().duration(200).style("opacity", ".9");
    tooltipElem.text(el.attr("title")).style("left", window.scrollX + rect.left + (rect.right - rect.left) / 2 + "px").style("top", window.scrollY + rect.top - 14 + document.body.scrollTop + "px");
    tooltipElem.html(tooltipElem.html().replace(/&lt;br\/&gt;/g, "<br/>"));
    el.classed("hover", true);
  }).on("mouseout", function() {
    tooltipElem.transition().duration(500).style("opacity", 0);
    const el = d3select(this);
    el.classed("hover", false);
  });
};
funs.push(setupToolTips);
const clear = function(ver = "gen-1") {
  vertices = {};
  classes = {};
  edges = [];
  funs = [setupToolTips];
  subGraphs = [];
  subGraphLookup = {};
  subCount = 0;
  tooltips = {};
  firstGraphFlag = true;
  version = ver;
  clear$1();
};
const setGen = (ver) => {
  version = ver || "gen-2";
};
const defaultStyle = function() {
  return "fill:#ffa;stroke: #f66; stroke-width: 3px; stroke-dasharray: 5, 5;fill:#ffa;stroke: #666;";
};
const addSubGraph = function(_id, list, _title) {
  let id = _id.text.trim();
  let title = _title.text;
  if (_id === _title && _title.text.match(/\s/)) {
    id = void 0;
  }
  function uniq(a) {
    const prims = { boolean: {}, number: {}, string: {} };
    const objs = [];
    let dir2;
    const nodeList2 = a.filter(function(item) {
      const type = typeof item;
      if (item.stmt && item.stmt === "dir") {
        dir2 = item.value;
        return false;
      }
      if (item.trim() === "") {
        return false;
      }
      if (type in prims) {
        return prims[type].hasOwnProperty(item) ? false : prims[type][item] = true;
      } else {
        return objs.includes(item) ? false : objs.push(item);
      }
    });
    return { nodeList: nodeList2, dir: dir2 };
  }
  let nodeList = [];
  const { nodeList: nl, dir } = uniq(nodeList.concat.apply(nodeList, list));
  nodeList = nl;
  if (version === "gen-1") {
    for (let i = 0; i < nodeList.length; i++) {
      nodeList[i] = lookUpDomId(nodeList[i]);
    }
  }
  id = id || "subGraph" + subCount;
  title = title || "";
  title = sanitizeText(title);
  subCount = subCount + 1;
  const subGraph = {
    id,
    nodes: nodeList,
    title: title.trim(),
    classes: [],
    dir,
    labelType: _title.type
  };
  log.info("Adding", subGraph.id, subGraph.nodes, subGraph.dir);
  subGraph.nodes = makeUniq(subGraph, subGraphs).nodes;
  subGraphs.push(subGraph);
  subGraphLookup[id] = subGraph;
  return id;
};
const getPosForId = function(id) {
  for (const [i, subGraph] of subGraphs.entries()) {
    if (subGraph.id === id) {
      return i;
    }
  }
  return -1;
};
let secCount = -1;
const posCrossRef = [];
const indexNodes2 = function(id, pos) {
  const nodes = subGraphs[pos].nodes;
  secCount = secCount + 1;
  if (secCount > 2e3) {
    return;
  }
  posCrossRef[secCount] = pos;
  if (subGraphs[pos].id === id) {
    return {
      result: true,
      count: 0
    };
  }
  let count = 0;
  let posCount = 1;
  while (count < nodes.length) {
    const childPos = getPosForId(nodes[count]);
    if (childPos >= 0) {
      const res = indexNodes2(id, childPos);
      if (res.result) {
        return {
          result: true,
          count: posCount + res.count
        };
      } else {
        posCount = posCount + res.count;
      }
    }
    count = count + 1;
  }
  return {
    result: false,
    count: posCount
  };
};
const getDepthFirstPos = function(pos) {
  return posCrossRef[pos];
};
const indexNodes = function() {
  secCount = -1;
  if (subGraphs.length > 0) {
    indexNodes2("none", subGraphs.length - 1);
  }
};
const getSubGraphs = function() {
  return subGraphs;
};
const firstGraph = () => {
  if (firstGraphFlag) {
    firstGraphFlag = false;
    return true;
  }
  return false;
};
const destructStartLink = (_str) => {
  let str = _str.trim();
  let type = "arrow_open";
  switch (str[0]) {
    case "<":
      type = "arrow_point";
      str = str.slice(1);
      break;
    case "x":
      type = "arrow_cross";
      str = str.slice(1);
      break;
    case "o":
      type = "arrow_circle";
      str = str.slice(1);
      break;
  }
  let stroke = "normal";
  if (str.includes("=")) {
    stroke = "thick";
  }
  if (str.includes(".")) {
    stroke = "dotted";
  }
  return { type, stroke };
};
const countChar = (char, str) => {
  const length = str.length;
  let count = 0;
  for (let i = 0; i < length; ++i) {
    if (str[i] === char) {
      ++count;
    }
  }
  return count;
};
const destructEndLink = (_str) => {
  const str = _str.trim();
  let line = str.slice(0, -1);
  let type = "arrow_open";
  switch (str.slice(-1)) {
    case "x":
      type = "arrow_cross";
      if (str[0] === "x") {
        type = "double_" + type;
        line = line.slice(1);
      }
      break;
    case ">":
      type = "arrow_point";
      if (str[0] === "<") {
        type = "double_" + type;
        line = line.slice(1);
      }
      break;
    case "o":
      type = "arrow_circle";
      if (str[0] === "o") {
        type = "double_" + type;
        line = line.slice(1);
      }
      break;
  }
  let stroke = "normal";
  let length = line.length - 1;
  if (line[0] === "=") {
    stroke = "thick";
  }
  if (line[0] === "~") {
    stroke = "invisible";
  }
  let dots = countChar(".", line);
  if (dots) {
    stroke = "dotted";
    length = dots;
  }
  return { type, stroke, length };
};
const destructLink = (_str, _startStr) => {
  const info = destructEndLink(_str);
  let startInfo;
  if (_startStr) {
    startInfo = destructStartLink(_startStr);
    if (startInfo.stroke !== info.stroke) {
      return { type: "INVALID", stroke: "INVALID" };
    }
    if (startInfo.type === "arrow_open") {
      startInfo.type = info.type;
    } else {
      if (startInfo.type !== info.type) {
        return { type: "INVALID", stroke: "INVALID" };
      }
      startInfo.type = "double_" + startInfo.type;
    }
    if (startInfo.type === "double_arrow") {
      startInfo.type = "double_arrow_point";
    }
    startInfo.length = info.length;
    return startInfo;
  }
  return info;
};
const exists = (allSgs, _id) => {
  let res = false;
  allSgs.forEach((sg) => {
    const pos = sg.nodes.indexOf(_id);
    if (pos >= 0) {
      res = true;
    }
  });
  return res;
};
const makeUniq = (sg, allSubgraphs) => {
  const res = [];
  sg.nodes.forEach((_id, pos) => {
    if (!exists(allSubgraphs, _id)) {
      res.push(sg.nodes[pos]);
    }
  });
  return { nodes: res };
};
const lex = {
  firstGraph
};
const flowDb = {
  parseDirective,
  defaultConfig: () => defaultConfig.flowchart,
  setAccTitle,
  getAccTitle,
  getAccDescription,
  setAccDescription,
  addVertex,
  lookUpDomId,
  addLink,
  updateLinkInterpolate,
  updateLink,
  addClass,
  setDirection,
  setClass,
  setTooltip,
  getTooltip,
  setClickEvent,
  setLink,
  bindFunctions,
  getDirection,
  getVertices,
  getEdges,
  getClasses,
  clear,
  setGen,
  defaultStyle,
  addSubGraph,
  getDepthFirstPos,
  indexNodes,
  getSubGraphs,
  destructLink,
  lex,
  exists,
  makeUniq,
  setDiagramTitle,
  getDiagramTitle
};
const db = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  addClass,
  addLink,
  addSingleLink,
  addSubGraph,
  addVertex,
  bindFunctions,
  clear,
  default: flowDb,
  defaultStyle,
  destructLink,
  firstGraph,
  getClasses,
  getDepthFirstPos,
  getDirection,
  getEdges,
  getSubGraphs,
  getTooltip,
  getVertices,
  indexNodes,
  lex,
  lookUpDomId,
  parseDirective,
  setClass,
  setClickEvent,
  setDirection,
  setGen,
  setLink,
  updateLink,
  updateLinkInterpolate
}, Symbol.toStringTag, { value: "Module" }));
export {
  db as d,
  flowDb as f,
  parser$1 as p
};
