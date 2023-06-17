import { l as log, h as select, g as getConfig, i as setConfig, j as getSiteConfig, u as updateSiteConfig, r as reset, k as defaultConfig, s as setLogLevel, a as addDirective, m as evaluate, p as purify, n as saveConfigFromInitialize, t as theme, o as setSiteConfig } from "./commonDb-89160e91.js";
import { g as getErrorMessage, a as registerDiagram, r as registerLazyLoadedDiagrams, d as detectType, b as getDiagram, c as getDiagramLoader, U as UnknownDiagramError, e as extractFrontMatter, f as getNative, h as root, t as toSource, j as baseGetTag, M as Map, k as isFunction, m as freeGlobal, p as parseDirective, u as utils, n as directiveSanitizer, o as getStyles$1 } from "./utils-1aebe9b6.js";
var COMMENT = "comm";
var RULESET = "rule";
var DECLARATION = "decl";
var IMPORT = "@import";
var KEYFRAMES = "@keyframes";
var abs = Math.abs;
var from = String.fromCharCode;
function trim(value) {
  return value.trim();
}
function replace(value, pattern, replacement) {
  return value.replace(pattern, replacement);
}
function indexof(value, search) {
  return value.indexOf(search);
}
function charat(value, index) {
  return value.charCodeAt(index) | 0;
}
function substr(value, begin, end) {
  return value.slice(begin, end);
}
function strlen(value) {
  return value.length;
}
function sizeof(value) {
  return value.length;
}
function append(value, array) {
  return array.push(value), value;
}
var line = 1;
var column = 1;
var length = 0;
var position = 0;
var character = 0;
var characters = "";
function node(value, root2, parent, type, props, children, length2) {
  return { value, root: root2, parent, type, props, children, line, column, length: length2, return: "" };
}
function char() {
  return character;
}
function prev() {
  character = position > 0 ? charat(characters, --position) : 0;
  if (column--, character === 10)
    column = 1, line--;
  return character;
}
function next() {
  character = position < length ? charat(characters, position++) : 0;
  if (column++, character === 10)
    column = 1, line++;
  return character;
}
function peek() {
  return charat(characters, position);
}
function caret() {
  return position;
}
function slice(begin, end) {
  return substr(characters, begin, end);
}
function token(type) {
  switch (type) {
    case 0:
    case 9:
    case 10:
    case 13:
    case 32:
      return 5;
    case 33:
    case 43:
    case 44:
    case 47:
    case 62:
    case 64:
    case 126:
    case 59:
    case 123:
    case 125:
      return 4;
    case 58:
      return 3;
    case 34:
    case 39:
    case 40:
    case 91:
      return 2;
    case 41:
    case 93:
      return 1;
  }
  return 0;
}
function alloc(value) {
  return line = column = 1, length = strlen(characters = value), position = 0, [];
}
function dealloc(value) {
  return characters = "", value;
}
function delimit(type) {
  return trim(slice(position - 1, delimiter(type === 91 ? type + 2 : type === 40 ? type + 1 : type)));
}
function whitespace(type) {
  while (character = peek())
    if (character < 33)
      next();
    else
      break;
  return token(type) > 2 || token(character) > 3 ? "" : " ";
}
function escaping(index, count) {
  while (--count && next())
    if (character < 48 || character > 102 || character > 57 && character < 65 || character > 70 && character < 97)
      break;
  return slice(index, caret() + (count < 6 && peek() == 32 && next() == 32));
}
function delimiter(type) {
  while (next())
    switch (character) {
      case type:
        return position;
      case 34:
      case 39:
        if (type !== 34 && type !== 39)
          delimiter(character);
        break;
      case 40:
        if (type === 41)
          delimiter(type);
        break;
      case 92:
        next();
        break;
    }
  return position;
}
function commenter(type, index) {
  while (next())
    if (type + character === 47 + 10)
      break;
    else if (type + character === 42 + 42 && peek() === 47)
      break;
  return "/*" + slice(index, position - 1) + "*" + from(type === 47 ? type : next());
}
function identifier(index) {
  while (!token(peek()))
    next();
  return slice(index, position);
}
function compile(value) {
  return dealloc(parse$1("", null, null, null, [""], value = alloc(value), 0, [0], value));
}
function parse$1(value, root2, parent, rule, rules, rulesets, pseudo, points, declarations) {
  var index = 0;
  var offset = 0;
  var length2 = pseudo;
  var atrule = 0;
  var property = 0;
  var previous = 0;
  var variable = 1;
  var scanning = 1;
  var ampersand = 1;
  var character2 = 0;
  var type = "";
  var props = rules;
  var children = rulesets;
  var reference = rule;
  var characters2 = type;
  while (scanning)
    switch (previous = character2, character2 = next()) {
      case 40:
        if (previous != 108 && charat(characters2, length2 - 1) == 58) {
          if (indexof(characters2 += replace(delimit(character2), "&", "&\f"), "&\f") != -1)
            ampersand = -1;
          break;
        }
      case 34:
      case 39:
      case 91:
        characters2 += delimit(character2);
        break;
      case 9:
      case 10:
      case 13:
      case 32:
        characters2 += whitespace(previous);
        break;
      case 92:
        characters2 += escaping(caret() - 1, 7);
        continue;
      case 47:
        switch (peek()) {
          case 42:
          case 47:
            append(comment(commenter(next(), caret()), root2, parent), declarations);
            break;
          default:
            characters2 += "/";
        }
        break;
      case 123 * variable:
        points[index++] = strlen(characters2) * ampersand;
      case 125 * variable:
      case 59:
      case 0:
        switch (character2) {
          case 0:
          case 125:
            scanning = 0;
          case 59 + offset:
            if (property > 0 && strlen(characters2) - length2)
              append(property > 32 ? declaration(characters2 + ";", rule, parent, length2 - 1) : declaration(replace(characters2, " ", "") + ";", rule, parent, length2 - 2), declarations);
            break;
          case 59:
            characters2 += ";";
          default:
            append(reference = ruleset(characters2, root2, parent, index, offset, rules, points, type, props = [], children = [], length2), rulesets);
            if (character2 === 123)
              if (offset === 0)
                parse$1(characters2, root2, reference, reference, props, rulesets, length2, points, children);
              else
                switch (atrule) {
                  case 100:
                  case 109:
                  case 115:
                    parse$1(value, reference, reference, rule && append(ruleset(value, reference, reference, 0, 0, rules, points, type, rules, props = [], length2), children), rules, children, length2, points, rule ? props : children);
                    break;
                  default:
                    parse$1(characters2, reference, reference, reference, [""], children, 0, points, children);
                }
        }
        index = offset = property = 0, variable = ampersand = 1, type = characters2 = "", length2 = pseudo;
        break;
      case 58:
        length2 = 1 + strlen(characters2), property = previous;
      default:
        if (variable < 1) {
          if (character2 == 123)
            --variable;
          else if (character2 == 125 && variable++ == 0 && prev() == 125)
            continue;
        }
        switch (characters2 += from(character2), character2 * variable) {
          case 38:
            ampersand = offset > 0 ? 1 : (characters2 += "\f", -1);
            break;
          case 44:
            points[index++] = (strlen(characters2) - 1) * ampersand, ampersand = 1;
            break;
          case 64:
            if (peek() === 45)
              characters2 += delimit(next());
            atrule = peek(), offset = length2 = strlen(type = characters2 += identifier(caret())), character2++;
            break;
          case 45:
            if (previous === 45 && strlen(characters2) == 2)
              variable = 0;
        }
    }
  return rulesets;
}
function ruleset(value, root2, parent, index, offset, rules, points, type, props, children, length2) {
  var post = offset - 1;
  var rule = offset === 0 ? rules : [""];
  var size = sizeof(rule);
  for (var i = 0, j = 0, k = 0; i < index; ++i)
    for (var x = 0, y = substr(value, post + 1, post = abs(j = points[i])), z = value; x < size; ++x)
      if (z = trim(j > 0 ? rule[x] + " " + y : replace(y, /&\f/g, rule[x])))
        props[k++] = z;
  return node(value, root2, parent, offset === 0 ? RULESET : type, props, children, length2);
}
function comment(value, root2, parent) {
  return node(value, root2, parent, COMMENT, from(char()), substr(value, 2, -2), 0);
}
function declaration(value, root2, parent, length2) {
  return node(value, root2, parent, DECLARATION, substr(value, 0, length2), substr(value, length2 + 1, -1), length2);
}
function serialize(children, callback) {
  var output = "";
  var length2 = sizeof(children);
  for (var i = 0; i < length2; i++)
    output += callback(children[i], i, children, callback) || "";
  return output;
}
function stringify(element, index, children, callback) {
  switch (element.type) {
    case IMPORT:
    case DECLARATION:
      return element.return = element.return || element.value;
    case COMMENT:
      return "";
    case KEYFRAMES:
      return element.return = element.value + "{" + serialize(element.children, callback) + "}";
    case RULESET:
      element.value = element.props.join(",");
  }
  return strlen(children = serialize(element.children, callback)) ? element.return = element.value + "{" + children + "}" : "";
}
const version = "10.1.0";
const id$h = "c4";
const detector$h = (txt) => {
  return txt.match(/^\s*C4Context|C4Container|C4Component|C4Dynamic|C4Deployment/) !== null;
};
const loader$h = async () => {
  const { diagram: diagram2 } = await import("./c4Diagram-be8b5c2c.js");
  return { id: id$h, diagram: diagram2 };
};
const plugin$h = {
  id: id$h,
  detector: detector$h,
  loader: loader$h
};
const c4 = plugin$h;
const id$g = "flowchart";
const detector$g = (txt, config) => {
  var _a, _b;
  if (((_a = config == null ? void 0 : config.flowchart) == null ? void 0 : _a.defaultRenderer) === "dagre-wrapper" || ((_b = config == null ? void 0 : config.flowchart) == null ? void 0 : _b.defaultRenderer) === "elk") {
    return false;
  }
  return txt.match(/^\s*graph/) !== null;
};
const loader$g = async () => {
  const { diagram: diagram2 } = await import("./flowDiagram-3d69eb42.js");
  return { id: id$g, diagram: diagram2 };
};
const plugin$g = {
  id: id$g,
  detector: detector$g,
  loader: loader$g
};
const flowchart = plugin$g;
const id$f = "flowchart-v2";
const detector$f = (txt, config) => {
  var _a, _b, _c;
  if (((_a = config == null ? void 0 : config.flowchart) == null ? void 0 : _a.defaultRenderer) === "dagre-d3" || ((_b = config == null ? void 0 : config.flowchart) == null ? void 0 : _b.defaultRenderer) === "elk") {
    return false;
  }
  if (txt.match(/^\s*graph/) !== null && ((_c = config == null ? void 0 : config.flowchart) == null ? void 0 : _c.defaultRenderer) === "dagre-wrapper") {
    return true;
  }
  return txt.match(/^\s*flowchart/) !== null;
};
const loader$f = async () => {
  const { diagram: diagram2 } = await import("./flowDiagram-v2-e9772692.js");
  return { id: id$f, diagram: diagram2 };
};
const plugin$f = {
  id: id$f,
  detector: detector$f,
  loader: loader$f
};
const flowchartV2 = plugin$f;
const id$e = "er";
const detector$e = (txt) => {
  return txt.match(/^\s*erDiagram/) !== null;
};
const loader$e = async () => {
  const { diagram: diagram2 } = await import("./erDiagram-dfd3761e.js");
  return { id: id$e, diagram: diagram2 };
};
const plugin$e = {
  id: id$e,
  detector: detector$e,
  loader: loader$e
};
const er = plugin$e;
const id$d = "gitGraph";
const detector$d = (txt) => {
  return txt.match(/^\s*gitGraph/) !== null;
};
const loader$d = async () => {
  const { diagram: diagram2 } = await import("./gitGraphDiagram-fb502d5b.js");
  return { id: id$d, diagram: diagram2 };
};
const plugin$d = {
  id: id$d,
  detector: detector$d,
  loader: loader$d
};
const git = plugin$d;
const id$c = "gantt";
const detector$c = (txt) => {
  return txt.match(/^\s*gantt/) !== null;
};
const loader$c = async () => {
  const { diagram: diagram2 } = await import("./ganttDiagram-536170c3.js");
  return { id: id$c, diagram: diagram2 };
};
const plugin$c = {
  id: id$c,
  detector: detector$c,
  loader: loader$c
};
const gantt = plugin$c;
const id$b = "info";
const detector$b = (txt) => {
  return txt.match(/^\s*info/) !== null;
};
const loader$b = async () => {
  const { diagram: diagram2 } = await import("./infoDiagram-24bbb26e.js");
  return { id: id$b, diagram: diagram2 };
};
const plugin$b = {
  id: id$b,
  detector: detector$b,
  loader: loader$b
};
const info = plugin$b;
const id$a = "pie";
const detector$a = (txt) => {
  return txt.match(/^\s*pie/) !== null;
};
const loader$a = async () => {
  const { diagram: diagram2 } = await import("./pieDiagram-9555168c.js");
  return { id: id$a, diagram: diagram2 };
};
const plugin$a = {
  id: id$a,
  detector: detector$a,
  loader: loader$a
};
const pie = plugin$a;
const id$9 = "requirement";
const detector$9 = (txt) => {
  return txt.match(/^\s*requirement(Diagram)?/) !== null;
};
const loader$9 = async () => {
  const { diagram: diagram2 } = await import("./requirementDiagram-ff8da15b.js");
  return { id: id$9, diagram: diagram2 };
};
const plugin$9 = {
  id: id$9,
  detector: detector$9,
  loader: loader$9
};
const requirement = plugin$9;
const id$8 = "sequence";
const detector$8 = (txt) => {
  return txt.match(/^\s*sequenceDiagram/) !== null;
};
const loader$8 = async () => {
  const { diagram: diagram2 } = await import("./sequenceDiagram-a52c6980.js");
  return { id: id$8, diagram: diagram2 };
};
const plugin$8 = {
  id: id$8,
  detector: detector$8,
  loader: loader$8
};
const sequence = plugin$8;
const id$7 = "class";
const detector$7 = (txt, config) => {
  var _a;
  if (((_a = config == null ? void 0 : config.class) == null ? void 0 : _a.defaultRenderer) === "dagre-wrapper") {
    return false;
  }
  return txt.match(/^\s*classDiagram/) !== null;
};
const loader$7 = async () => {
  const { diagram: diagram2 } = await import("./classDiagram-6d218cdd.js");
  return { id: id$7, diagram: diagram2 };
};
const plugin$7 = {
  id: id$7,
  detector: detector$7,
  loader: loader$7
};
const classDiagram = plugin$7;
const id$6 = "classDiagram";
const detector$6 = (txt, config) => {
  var _a;
  if (txt.match(/^\s*classDiagram/) !== null && ((_a = config == null ? void 0 : config.class) == null ? void 0 : _a.defaultRenderer) === "dagre-wrapper") {
    return true;
  }
  return txt.match(/^\s*classDiagram-v2/) !== null;
};
const loader$6 = async () => {
  const { diagram: diagram2 } = await import("./classDiagram-v2-6aaa1e9f.js");
  return { id: id$6, diagram: diagram2 };
};
const plugin$6 = {
  id: id$6,
  detector: detector$6,
  loader: loader$6
};
const classDiagramV2 = plugin$6;
const id$5 = "state";
const detector$5 = (txt, config) => {
  var _a;
  if (((_a = config == null ? void 0 : config.state) == null ? void 0 : _a.defaultRenderer) === "dagre-wrapper") {
    return false;
  }
  return txt.match(/^\s*stateDiagram/) !== null;
};
const loader$5 = async () => {
  const { diagram: diagram2 } = await import("./stateDiagram-2fc945a0.js");
  return { id: id$5, diagram: diagram2 };
};
const plugin$5 = {
  id: id$5,
  detector: detector$5,
  loader: loader$5
};
const state = plugin$5;
const id$4 = "stateDiagram";
const detector$4 = (text, config) => {
  var _a, _b;
  if (text.match(/^\s*stateDiagram-v2/) !== null) {
    return true;
  }
  if (text.match(/^\s*stateDiagram/) && ((_a = config == null ? void 0 : config.state) == null ? void 0 : _a.defaultRenderer) === "dagre-wrapper") {
    return true;
  }
  if (text.match(/^\s*stateDiagram/) && ((_b = config == null ? void 0 : config.state) == null ? void 0 : _b.defaultRenderer) === "dagre-wrapper") {
    return true;
  }
  return false;
};
const loader$4 = async () => {
  const { diagram: diagram2 } = await import("./stateDiagram-v2-660a5d6e.js");
  return { id: id$4, diagram: diagram2 };
};
const plugin$4 = {
  id: id$4,
  detector: detector$4,
  loader: loader$4
};
const stateV2 = plugin$4;
const id$3 = "journey";
const detector$3 = (txt) => {
  return txt.match(/^\s*journey/) !== null;
};
const loader$3 = async () => {
  const { diagram: diagram2 } = await import("./journeyDiagram-55528350.js");
  return { id: id$3, diagram: diagram2 };
};
const plugin$3 = {
  id: id$3,
  detector: detector$3,
  loader: loader$3
};
const journey = plugin$3;
const getStyles = () => ``;
const styles = getStyles;
const setConf = function() {
};
const draw = (_text, id2, mermaidVersion) => {
  try {
    log.debug("Renering svg for syntax error\n");
    const svg = select("#" + id2);
    const g = svg.append("g");
    g.append("path").attr("class", "error-icon").attr(
      "d",
      "m411.313,123.313c6.25-6.25 6.25-16.375 0-22.625s-16.375-6.25-22.625,0l-32,32-9.375,9.375-20.688-20.688c-12.484-12.5-32.766-12.5-45.25,0l-16,16c-1.261,1.261-2.304,2.648-3.31,4.051-21.739-8.561-45.324-13.426-70.065-13.426-105.867,0-192,86.133-192,192s86.133,192 192,192 192-86.133 192-192c0-24.741-4.864-48.327-13.426-70.065 1.402-1.007 2.79-2.049 4.051-3.31l16-16c12.5-12.492 12.5-32.758 0-45.25l-20.688-20.688 9.375-9.375 32.001-31.999zm-219.313,100.687c-52.938,0-96,43.063-96,96 0,8.836-7.164,16-16,16s-16-7.164-16-16c0-70.578 57.422-128 128-128 8.836,0 16,7.164 16,16s-7.164,16-16,16z"
    );
    g.append("path").attr("class", "error-icon").attr(
      "d",
      "m459.02,148.98c-6.25-6.25-16.375-6.25-22.625,0s-6.25,16.375 0,22.625l16,16c3.125,3.125 7.219,4.688 11.313,4.688 4.094,0 8.188-1.563 11.313-4.688 6.25-6.25 6.25-16.375 0-22.625l-16.001-16z"
    );
    g.append("path").attr("class", "error-icon").attr(
      "d",
      "m340.395,75.605c3.125,3.125 7.219,4.688 11.313,4.688 4.094,0 8.188-1.563 11.313-4.688 6.25-6.25 6.25-16.375 0-22.625l-16-16c-6.25-6.25-16.375-6.25-22.625,0s-6.25,16.375 0,22.625l15.999,16z"
    );
    g.append("path").attr("class", "error-icon").attr(
      "d",
      "m400,64c8.844,0 16-7.164 16-16v-32c0-8.836-7.156-16-16-16-8.844,0-16,7.164-16,16v32c0,8.836 7.156,16 16,16z"
    );
    g.append("path").attr("class", "error-icon").attr(
      "d",
      "m496,96.586h-32c-8.844,0-16,7.164-16,16 0,8.836 7.156,16 16,16h32c8.844,0 16-7.164 16-16 0-8.836-7.156-16-16-16z"
    );
    g.append("path").attr("class", "error-icon").attr(
      "d",
      "m436.98,75.605c3.125,3.125 7.219,4.688 11.313,4.688 4.094,0 8.188-1.563 11.313-4.688l32-32c6.25-6.25 6.25-16.375 0-22.625s-16.375-6.25-22.625,0l-32,32c-6.251,6.25-6.251,16.375-0.001,22.625z"
    );
    g.append("text").attr("class", "error-text").attr("x", 1440).attr("y", 250).attr("font-size", "150px").style("text-anchor", "middle").text("Syntax error in text");
    g.append("text").attr("class", "error-text").attr("x", 1250).attr("y", 400).attr("font-size", "100px").style("text-anchor", "middle").text("mermaid version " + mermaidVersion);
    svg.attr("height", 100);
    svg.attr("width", 500);
    svg.attr("viewBox", "768 0 912 512");
  } catch (e) {
    log.error("Error while rendering info diagram");
    log.error(getErrorMessage(e));
  }
};
const errorRenderer = {
  setConf,
  draw
};
const diagram = {
  db: {
    clear: () => {
    }
  },
  styles,
  renderer: errorRenderer,
  parser: {
    parser: { yy: {} },
    parse: () => {
    }
  },
  init: () => {
  }
};
const errorDiagram = diagram;
const id$2 = "flowchart-elk";
const detector$2 = (txt, config) => {
  var _a;
  if (
    // If diagram explicitly states flowchart-elk
    txt.match(/^\s*flowchart-elk/) || // If a flowchart/graph diagram has their default renderer set to elk
    txt.match(/^\s*flowchart|graph/) && ((_a = config == null ? void 0 : config.flowchart) == null ? void 0 : _a.defaultRenderer) === "elk"
  ) {
    return true;
  }
  return false;
};
const loader$2 = async () => {
  const { diagram: diagram2 } = await import("./flowchart-elk-definition-859d9cf8.js");
  return { id: id$2, diagram: diagram2 };
};
const plugin$2 = {
  id: id$2,
  detector: detector$2,
  loader: loader$2
};
const flowchartElk = plugin$2;
const id$1 = "timeline";
const detector$1 = (txt) => {
  return txt.match(/^\s*timeline/) !== null;
};
const loader$1 = async () => {
  const { diagram: diagram2 } = await import("./timeline-definition-472c301b.js");
  return { id: id$1, diagram: diagram2 };
};
const plugin$1 = {
  id: id$1,
  detector: detector$1,
  loader: loader$1
};
const timeline = plugin$1;
const id = "mindmap";
const detector = (txt) => {
  return txt.match(/^\s*mindmap/) !== null;
};
const loader = async () => {
  const { diagram: diagram2 } = await import("./mindmap-definition-57c198db.js");
  return { id, diagram: diagram2 };
};
const plugin = {
  id,
  detector,
  loader
};
const mindmap = plugin;
let hasLoadedDiagrams = false;
const addDiagrams = () => {
  if (hasLoadedDiagrams) {
    return;
  }
  hasLoadedDiagrams = true;
  registerDiagram("error", errorDiagram, (text) => {
    return text.toLowerCase().trim() === "error";
  });
  registerDiagram(
    "---",
    // --- diagram type may appear if YAML front-matter is not parsed correctly
    {
      db: {
        clear: () => {
        }
      },
      styles: {},
      // should never be used
      renderer: {},
      // should never be used
      parser: {
        parser: { yy: {} },
        parse: () => {
          throw new Error(
            "Diagrams beginning with --- are not valid. If you were trying to use a YAML front-matter, please ensure that you've correctly opened and closed the YAML front-matter with un-indented `---` blocks"
          );
        }
      },
      init: () => null
      // no op
    },
    (text) => {
      return text.toLowerCase().trimStart().startsWith("---");
    }
  );
  registerLazyLoadedDiagrams(
    c4,
    classDiagramV2,
    classDiagram,
    er,
    gantt,
    info,
    pie,
    requirement,
    sequence,
    flowchartElk,
    flowchartV2,
    flowchart,
    mindmap,
    timeline,
    git,
    stateV2,
    state,
    journey
  );
};
const cleanupComments = (text) => {
  return text.trimStart().replace(/^\s*%%(?!{)[^\n]+\n?/gm, "");
};
class Diagram {
  constructor(text) {
    var _a, _b;
    this.text = text;
    this.type = "graph";
    this.text += "\n";
    const cnf = getConfig();
    try {
      this.type = detectType(text, cnf);
    } catch (e) {
      this.type = "error";
      this.detectError = e;
    }
    const diagram2 = getDiagram(this.type);
    log.debug("Type " + this.type);
    this.db = diagram2.db;
    (_b = (_a = this.db).clear) == null ? void 0 : _b.call(_a);
    this.renderer = diagram2.renderer;
    this.parser = diagram2.parser;
    const originalParse = this.parser.parse.bind(this.parser);
    this.parser.parse = (text2) => originalParse(cleanupComments(extractFrontMatter(text2, this.db)));
    this.parser.parser.yy = this.db;
    if (diagram2.init) {
      diagram2.init(cnf);
      log.info("Initialized diagram " + this.type, cnf);
    }
    this.parse();
  }
  parse() {
    var _a, _b;
    if (this.detectError) {
      throw this.detectError;
    }
    (_b = (_a = this.db).clear) == null ? void 0 : _b.call(_a);
    this.parser.parse(this.text);
  }
  async render(id2, version2) {
    await this.renderer.draw(this.text, id2, version2, this);
  }
  getParser() {
    return this.parser;
  }
  getType() {
    return this.type;
  }
}
const getDiagramFromText = async (text) => {
  const type = detectType(text, getConfig());
  try {
    getDiagram(type);
  } catch (error) {
    const loader2 = getDiagramLoader(type);
    if (!loader2) {
      throw new UnknownDiagramError(`Diagram ${type} not found.`);
    }
    const { id: id2, diagram: diagram2 } = await loader2();
    registerDiagram(id2, diagram2);
  }
  return new Diagram(text);
};
let interactionFunctions = [];
const addFunction = (func) => {
  interactionFunctions.push(func);
};
const attachFunctions = () => {
  interactionFunctions.forEach((f) => {
    f();
  });
  interactionFunctions = [];
};
var objectProto$3 = Object.prototype;
function isPrototype(value) {
  var Ctor = value && value.constructor, proto = typeof Ctor == "function" && Ctor.prototype || objectProto$3;
  return value === proto;
}
function overArg(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}
var nativeKeys = overArg(Object.keys, Object);
const nativeKeys$1 = nativeKeys;
var objectProto$2 = Object.prototype;
var hasOwnProperty$2 = objectProto$2.hasOwnProperty;
function baseKeys(object) {
  if (!isPrototype(object)) {
    return nativeKeys$1(object);
  }
  var result = [];
  for (var key in Object(object)) {
    if (hasOwnProperty$2.call(object, key) && key != "constructor") {
      result.push(key);
    }
  }
  return result;
}
var DataView = getNative(root, "DataView");
const DataView$1 = DataView;
var Promise$1 = getNative(root, "Promise");
const Promise$2 = Promise$1;
var Set = getNative(root, "Set");
const Set$1 = Set;
var WeakMap = getNative(root, "WeakMap");
const WeakMap$1 = WeakMap;
var mapTag$2 = "[object Map]", objectTag$1 = "[object Object]", promiseTag = "[object Promise]", setTag$2 = "[object Set]", weakMapTag$1 = "[object WeakMap]";
var dataViewTag$1 = "[object DataView]";
var dataViewCtorString = toSource(DataView$1), mapCtorString = toSource(Map), promiseCtorString = toSource(Promise$2), setCtorString = toSource(Set$1), weakMapCtorString = toSource(WeakMap$1);
var getTag = baseGetTag;
if (DataView$1 && getTag(new DataView$1(new ArrayBuffer(1))) != dataViewTag$1 || Map && getTag(new Map()) != mapTag$2 || Promise$2 && getTag(Promise$2.resolve()) != promiseTag || Set$1 && getTag(new Set$1()) != setTag$2 || WeakMap$1 && getTag(new WeakMap$1()) != weakMapTag$1) {
  getTag = function(value) {
    var result = baseGetTag(value), Ctor = result == objectTag$1 ? value.constructor : void 0, ctorString = Ctor ? toSource(Ctor) : "";
    if (ctorString) {
      switch (ctorString) {
        case dataViewCtorString:
          return dataViewTag$1;
        case mapCtorString:
          return mapTag$2;
        case promiseCtorString:
          return promiseTag;
        case setCtorString:
          return setTag$2;
        case weakMapCtorString:
          return weakMapTag$1;
      }
    }
    return result;
  };
}
const getTag$1 = getTag;
function isObjectLike(value) {
  return value != null && typeof value == "object";
}
var argsTag$1 = "[object Arguments]";
function baseIsArguments(value) {
  return isObjectLike(value) && baseGetTag(value) == argsTag$1;
}
var objectProto$1 = Object.prototype;
var hasOwnProperty$1 = objectProto$1.hasOwnProperty;
var propertyIsEnumerable = objectProto$1.propertyIsEnumerable;
var isArguments = baseIsArguments(function() {
  return arguments;
}()) ? baseIsArguments : function(value) {
  return isObjectLike(value) && hasOwnProperty$1.call(value, "callee") && !propertyIsEnumerable.call(value, "callee");
};
const isArguments$1 = isArguments;
var isArray = Array.isArray;
const isArray$1 = isArray;
var MAX_SAFE_INTEGER = 9007199254740991;
function isLength(value) {
  return typeof value == "number" && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}
function isArrayLike(value) {
  return value != null && isLength(value.length) && !isFunction(value);
}
function stubFalse() {
  return false;
}
var freeExports$1 = typeof exports == "object" && exports && !exports.nodeType && exports;
var freeModule$1 = freeExports$1 && typeof module == "object" && module && !module.nodeType && module;
var moduleExports$1 = freeModule$1 && freeModule$1.exports === freeExports$1;
var Buffer = moduleExports$1 ? root.Buffer : void 0;
var nativeIsBuffer = Buffer ? Buffer.isBuffer : void 0;
var isBuffer = nativeIsBuffer || stubFalse;
const isBuffer$1 = isBuffer;
var argsTag = "[object Arguments]", arrayTag = "[object Array]", boolTag = "[object Boolean]", dateTag = "[object Date]", errorTag = "[object Error]", funcTag = "[object Function]", mapTag$1 = "[object Map]", numberTag = "[object Number]", objectTag = "[object Object]", regexpTag = "[object RegExp]", setTag$1 = "[object Set]", stringTag = "[object String]", weakMapTag = "[object WeakMap]";
var arrayBufferTag = "[object ArrayBuffer]", dataViewTag = "[object DataView]", float32Tag = "[object Float32Array]", float64Tag = "[object Float64Array]", int8Tag = "[object Int8Array]", int16Tag = "[object Int16Array]", int32Tag = "[object Int32Array]", uint8Tag = "[object Uint8Array]", uint8ClampedTag = "[object Uint8ClampedArray]", uint16Tag = "[object Uint16Array]", uint32Tag = "[object Uint32Array]";
var typedArrayTags = {};
typedArrayTags[float32Tag] = typedArrayTags[float64Tag] = typedArrayTags[int8Tag] = typedArrayTags[int16Tag] = typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] = typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] = typedArrayTags[uint32Tag] = true;
typedArrayTags[argsTag] = typedArrayTags[arrayTag] = typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] = typedArrayTags[dataViewTag] = typedArrayTags[dateTag] = typedArrayTags[errorTag] = typedArrayTags[funcTag] = typedArrayTags[mapTag$1] = typedArrayTags[numberTag] = typedArrayTags[objectTag] = typedArrayTags[regexpTag] = typedArrayTags[setTag$1] = typedArrayTags[stringTag] = typedArrayTags[weakMapTag] = false;
function baseIsTypedArray(value) {
  return isObjectLike(value) && isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
}
function baseUnary(func) {
  return function(value) {
    return func(value);
  };
}
var freeExports = typeof exports == "object" && exports && !exports.nodeType && exports;
var freeModule = freeExports && typeof module == "object" && module && !module.nodeType && module;
var moduleExports = freeModule && freeModule.exports === freeExports;
var freeProcess = moduleExports && freeGlobal.process;
var nodeUtil = function() {
  try {
    var types = freeModule && freeModule.require && freeModule.require("util").types;
    if (types) {
      return types;
    }
    return freeProcess && freeProcess.binding && freeProcess.binding("util");
  } catch (e) {
  }
}();
const nodeUtil$1 = nodeUtil;
var nodeIsTypedArray = nodeUtil$1 && nodeUtil$1.isTypedArray;
var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;
const isTypedArray$1 = isTypedArray;
var mapTag = "[object Map]", setTag = "[object Set]";
var objectProto = Object.prototype;
var hasOwnProperty = objectProto.hasOwnProperty;
function isEmpty(value) {
  if (value == null) {
    return true;
  }
  if (isArrayLike(value) && (isArray$1(value) || typeof value == "string" || typeof value.splice == "function" || isBuffer$1(value) || isTypedArray$1(value) || isArguments$1(value))) {
    return !value.length;
  }
  var tag = getTag$1(value);
  if (tag == mapTag || tag == setTag) {
    return !value.size;
  }
  if (isPrototype(value)) {
    return !baseKeys(value).length;
  }
  for (var key in value) {
    if (hasOwnProperty.call(value, key)) {
      return false;
    }
  }
  return true;
}
const SVG_ROLE = "graphics-document document";
function setA11yDiagramInfo(svg, diagramType) {
  svg.attr("role", SVG_ROLE);
  if (!isEmpty(diagramType)) {
    svg.attr("aria-roledescription", diagramType);
  }
}
function addSVGa11yTitleDescription(svg, a11yTitle, a11yDesc, baseId) {
  if (svg.insert === void 0) {
    return;
  }
  if (a11yTitle || a11yDesc) {
    if (a11yDesc) {
      const descId = "chart-desc-" + baseId;
      svg.attr("aria-describedby", descId);
      svg.insert("desc", ":first-child").attr("id", descId).text(a11yDesc);
    }
    if (a11yTitle) {
      const titleId = "chart-title-" + baseId;
      svg.attr("aria-labelledby", titleId);
      svg.insert("title", ":first-child").attr("id", titleId).text(a11yTitle);
    }
  } else {
    return;
  }
}
const CLASSDEF_DIAGRAMS = [
  "graph",
  "flowchart",
  "flowchart-v2",
  "flowchart-elk",
  "stateDiagram",
  "stateDiagram-v2"
];
const MAX_TEXTLENGTH = 5e4;
const MAX_TEXTLENGTH_EXCEEDED_MSG = "graph TB;a[Maximum text size in diagram exceeded];style a fill:#faa";
const SECURITY_LVL_SANDBOX = "sandbox";
const SECURITY_LVL_LOOSE = "loose";
const XMLNS_SVG_STD = "http://www.w3.org/2000/svg";
const XMLNS_XLINK_STD = "http://www.w3.org/1999/xlink";
const XMLNS_XHTML_STD = "http://www.w3.org/1999/xhtml";
const IFRAME_WIDTH = "100%";
const IFRAME_HEIGHT = "100%";
const IFRAME_STYLES = "border:0;margin:0;";
const IFRAME_BODY_STYLE = "margin:0";
const IFRAME_SANDBOX_OPTS = "allow-top-navigation-by-user-activation allow-popups";
const IFRAME_NOT_SUPPORTED_MSG = 'The "iframe" tag is not supported by your browser.';
const DOMPURIFY_TAGS = ["foreignobject"];
const DOMPURIFY_ATTR = ["dominant-baseline"];
async function parse(text, parseOptions) {
  addDiagrams();
  try {
    const diagram2 = await getDiagramFromText(text);
    diagram2.parse();
  } catch (error) {
    if (parseOptions == null ? void 0 : parseOptions.suppressErrors) {
      return false;
    }
    throw error;
  }
  return true;
}
const encodeEntities = function(text) {
  let txt = text;
  txt = txt.replace(/style.*:\S*#.*;/g, function(s) {
    return s.substring(0, s.length - 1);
  });
  txt = txt.replace(/classDef.*:\S*#.*;/g, function(s) {
    return s.substring(0, s.length - 1);
  });
  txt = txt.replace(/#\w+;/g, function(s) {
    const innerTxt = s.substring(1, s.length - 1);
    const isInt = /^\+?\d+$/.test(innerTxt);
    if (isInt) {
      return "ﬂ°°" + innerTxt + "¶ß";
    } else {
      return "ﬂ°" + innerTxt + "¶ß";
    }
  });
  return txt;
};
const decodeEntities = function(text) {
  let txt = text;
  txt = txt.replace(/ﬂ°°/g, "&#");
  txt = txt.replace(/ﬂ°/g, "&");
  txt = txt.replace(/¶ß/g, ";");
  return txt;
};
const cssImportantStyles = (cssClass, element, cssClasses = []) => {
  return `
.${cssClass} ${element} { ${cssClasses.join(" !important; ")} !important; }`;
};
const createCssStyles = (config, graphType, classDefs = {}) => {
  var _a;
  let cssStyles = "";
  if (config.themeCSS !== void 0) {
    cssStyles += `
${config.themeCSS}`;
  }
  if (config.fontFamily !== void 0) {
    cssStyles += `
:root { --mermaid-font-family: ${config.fontFamily}}`;
  }
  if (config.altFontFamily !== void 0) {
    cssStyles += `
:root { --mermaid-alt-font-family: ${config.altFontFamily}}`;
  }
  if (!isEmpty(classDefs) && CLASSDEF_DIAGRAMS.includes(graphType)) {
    const htmlLabels = config.htmlLabels || ((_a = config.flowchart) == null ? void 0 : _a.htmlLabels);
    const cssHtmlElements = ["> *", "span"];
    const cssShapeElements = ["rect", "polygon", "ellipse", "circle", "path"];
    const cssElements = htmlLabels ? cssHtmlElements : cssShapeElements;
    for (const classId in classDefs) {
      const styleClassDef = classDefs[classId];
      if (!isEmpty(styleClassDef.styles)) {
        cssElements.forEach((cssElement) => {
          cssStyles += cssImportantStyles(styleClassDef.id, cssElement, styleClassDef.styles);
        });
      }
      if (!isEmpty(styleClassDef.textStyles)) {
        cssStyles += cssImportantStyles(styleClassDef.id, "tspan", styleClassDef.textStyles);
      }
    }
  }
  return cssStyles;
};
const createUserStyles = (config, graphType, classDefs, svgId) => {
  const userCSSstyles = createCssStyles(config, graphType, classDefs);
  const allStyles = getStyles$1(graphType, userCSSstyles, config.themeVariables);
  return serialize(compile(`${svgId}{${allStyles}}`), stringify);
};
const cleanUpSvgCode = (svgCode = "", inSandboxMode, useArrowMarkerUrls) => {
  let cleanedUpSvg = svgCode;
  if (!useArrowMarkerUrls && !inSandboxMode) {
    cleanedUpSvg = cleanedUpSvg.replace(/marker-end="url\(.*?#/g, 'marker-end="url(#');
  }
  cleanedUpSvg = decodeEntities(cleanedUpSvg);
  cleanedUpSvg = cleanedUpSvg.replace(/<br>/g, "<br/>");
  return cleanedUpSvg;
};
const putIntoIFrame = (svgCode = "", svgElement) => {
  const height = svgElement ? svgElement.viewBox.baseVal.height + "px" : IFRAME_HEIGHT;
  const base64encodedSrc = btoa('<body style="' + IFRAME_BODY_STYLE + '">' + svgCode + "</body>");
  return `<iframe style="width:${IFRAME_WIDTH};height:${height};${IFRAME_STYLES}" src="data:text/html;base64,${base64encodedSrc}" sandbox="${IFRAME_SANDBOX_OPTS}">
  ${IFRAME_NOT_SUPPORTED_MSG}
</iframe>`;
};
const appendDivSvgG = (parentRoot, id2, enclosingDivId, divStyle, svgXlink) => {
  const enclosingDiv = parentRoot.append("div");
  enclosingDiv.attr("id", enclosingDivId);
  if (divStyle) {
    enclosingDiv.attr("style", divStyle);
  }
  const svgNode = enclosingDiv.append("svg").attr("id", id2).attr("width", "100%").attr("xmlns", XMLNS_SVG_STD);
  if (svgXlink) {
    svgNode.attr("xmlns:xlink", svgXlink);
  }
  svgNode.append("g");
  return parentRoot;
};
function sandboxedIframe(parentNode, iFrameId) {
  return parentNode.append("iframe").attr("id", iFrameId).attr("style", "width: 100%; height: 100%;").attr("sandbox", "");
}
const removeExistingElements = (doc, id2, divId, iFrameId) => {
  var _a, _b, _c;
  (_a = doc.getElementById(id2)) == null ? void 0 : _a.remove();
  (_b = doc.getElementById(divId)) == null ? void 0 : _b.remove();
  (_c = doc.getElementById(iFrameId)) == null ? void 0 : _c.remove();
};
const render = async function(id2, text, svgContainingElement) {
  var _a, _b, _c, _d;
  addDiagrams();
  reset();
  const graphInit = utils.detectInit(text);
  if (graphInit) {
    directiveSanitizer(graphInit);
    addDirective(graphInit);
  }
  const config = getConfig();
  log.debug(config);
  if (text.length > ((config == null ? void 0 : config.maxTextSize) ?? MAX_TEXTLENGTH)) {
    text = MAX_TEXTLENGTH_EXCEEDED_MSG;
  }
  text = text.replace(/\r\n?/g, "\n");
  const idSelector = "#" + id2;
  const iFrameID = "i" + id2;
  const iFrameID_selector = "#" + iFrameID;
  const enclosingDivID = "d" + id2;
  const enclosingDivID_selector = "#" + enclosingDivID;
  let root2 = select("body");
  const isSandboxed = config.securityLevel === SECURITY_LVL_SANDBOX;
  const isLooseSecurityLevel = config.securityLevel === SECURITY_LVL_LOOSE;
  const fontFamily = config.fontFamily;
  if (svgContainingElement !== void 0) {
    if (svgContainingElement) {
      svgContainingElement.innerHTML = "";
    }
    if (isSandboxed) {
      const iframe = sandboxedIframe(select(svgContainingElement), iFrameID);
      root2 = select(iframe.nodes()[0].contentDocument.body);
      root2.node().style.margin = 0;
    } else {
      root2 = select(svgContainingElement);
    }
    appendDivSvgG(root2, id2, enclosingDivID, `font-family: ${fontFamily}`, XMLNS_XLINK_STD);
  } else {
    removeExistingElements(document, id2, enclosingDivID, iFrameID);
    if (isSandboxed) {
      const iframe = sandboxedIframe(select("body"), iFrameID);
      root2 = select(iframe.nodes()[0].contentDocument.body);
      root2.node().style.margin = 0;
    } else {
      root2 = select("body");
    }
    appendDivSvgG(root2, id2, enclosingDivID);
  }
  text = encodeEntities(text);
  let diag;
  let parseEncounteredException;
  try {
    diag = await getDiagramFromText(text);
  } catch (error) {
    diag = new Diagram("error");
    parseEncounteredException = error;
  }
  const element = root2.select(enclosingDivID_selector).node();
  const graphType = diag.type;
  const svg = element.firstChild;
  const firstChild = svg.firstChild;
  const diagramClassDefs = CLASSDEF_DIAGRAMS.includes(graphType) ? diag.renderer.getClasses(text, diag) : {};
  const rules = createUserStyles(
    config,
    graphType,
    // @ts-ignore convert renderer to TS.
    diagramClassDefs,
    idSelector
  );
  const style1 = document.createElement("style");
  style1.innerHTML = rules;
  svg.insertBefore(style1, firstChild);
  try {
    await diag.renderer.draw(text, id2, version, diag);
  } catch (e) {
    errorRenderer.draw(text, id2, version);
    throw e;
  }
  const svgNode = root2.select(`${enclosingDivID_selector} svg`);
  const a11yTitle = (_b = (_a = diag.db).getAccTitle) == null ? void 0 : _b.call(_a);
  const a11yDescr = (_d = (_c = diag.db).getAccDescription) == null ? void 0 : _d.call(_c);
  addA11yInfo(graphType, svgNode, a11yTitle, a11yDescr);
  root2.select(`[id="${id2}"]`).selectAll("foreignobject > *").attr("xmlns", XMLNS_XHTML_STD);
  let svgCode = root2.select(enclosingDivID_selector).node().innerHTML;
  log.debug("config.arrowMarkerAbsolute", config.arrowMarkerAbsolute);
  svgCode = cleanUpSvgCode(svgCode, isSandboxed, evaluate(config.arrowMarkerAbsolute));
  if (isSandboxed) {
    const svgEl = root2.select(enclosingDivID_selector + " svg").node();
    svgCode = putIntoIFrame(svgCode, svgEl);
  } else if (!isLooseSecurityLevel) {
    svgCode = purify.sanitize(svgCode, {
      ADD_TAGS: DOMPURIFY_TAGS,
      ADD_ATTR: DOMPURIFY_ATTR
    });
  }
  attachFunctions();
  if (parseEncounteredException) {
    throw parseEncounteredException;
  }
  const tmpElementSelector = isSandboxed ? iFrameID_selector : enclosingDivID_selector;
  const node2 = select(tmpElementSelector).node();
  if (node2 && "remove" in node2) {
    node2.remove();
  }
  return {
    svg: svgCode,
    bindFunctions: diag.db.bindFunctions
  };
};
function initialize(options = {}) {
  var _a;
  if ((options == null ? void 0 : options.fontFamily) && !((_a = options.themeVariables) == null ? void 0 : _a.fontFamily)) {
    if (!options.themeVariables) {
      options.themeVariables = {};
    }
    options.themeVariables.fontFamily = options.fontFamily;
  }
  saveConfigFromInitialize(options);
  if ((options == null ? void 0 : options.theme) && options.theme in theme) {
    options.themeVariables = theme[options.theme].getThemeVariables(
      options.themeVariables
    );
  } else if (options) {
    options.themeVariables = theme.default.getThemeVariables(options.themeVariables);
  }
  const config = typeof options === "object" ? setSiteConfig(options) : getSiteConfig();
  setLogLevel(config.logLevel);
  addDiagrams();
}
function addA11yInfo(graphType, svgNode, a11yTitle, a11yDescr) {
  setA11yDiagramInfo(svgNode, graphType);
  addSVGa11yTitleDescription(svgNode, a11yTitle, a11yDescr, svgNode.attr("id"));
}
const mermaidAPI = Object.freeze({
  render,
  parse,
  parseDirective,
  getDiagramFromText,
  initialize,
  getConfig,
  setConfig,
  getSiteConfig,
  updateSiteConfig,
  reset: () => {
    reset();
  },
  globalReset: () => {
    reset(defaultConfig);
  },
  defaultConfig
});
setLogLevel(getConfig().logLevel);
reset(getConfig());
export {
  Set$1 as S,
  isArray$1 as a,
  isArrayLike as b,
  isArguments$1 as c,
  isBuffer$1 as d,
  isTypedArray$1 as e,
  baseKeys as f,
  isPrototype as g,
  getTag$1 as h,
  isObjectLike as i,
  baseUnary as j,
  isLength as k,
  isEmpty as l,
  mermaidAPI as m,
  nodeUtil$1 as n,
  overArg as o,
  decodeEntities as p,
  addFunction as q
};
//# sourceMappingURL=mermaidAPI-c841a67f.js.map
