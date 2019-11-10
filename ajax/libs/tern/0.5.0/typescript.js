// Parser for TypeScript-style definition files
//
// Takes a TypeScript file as, for example, found in
// github.com/borisyankov/DefinitelyTyped , and spits out Tern type
// description JSON data.

var fs = require("fs");

// The TypeScript code is all there in the npm package, but it's not
// exporting anything as a CommonJS module, so we use this kludge to
// get at its internals.
var ts = new Function(fs.readFileSync(__dirname + "/../node_modules/typescript/bin/typescript.js", "utf8")
                      + ";return TypeScript;")();
var nt = ts.NodeType;

var definitions;

function parseFile(text, name) {
  if (text.charCodeAt(0) == 0xfeff) text = text.slice(1); // Kill byte-order-mark
  return new ts.Parser().quickParse(new ts.StringSourceText(text), name);
}

function lookup(name, cx) {
  for (; cx; cx = cx.prev)
    if (cx.name == name) return cx.value;
}

function buildPath(cx) {
  for (var path = ""; cx; cx = cx.prev) if (cx.enter)
    path = path ? cx.enter + "." + path : cx.enter;
  return path;
}

function functionType(node, cx) {
  var type = "fn(";
  var args = node.arguments.members, ret = node.returnTypeAnnotation;
  for (var i = 0, e = args.length - (node.variableArgList ? 1 : 0); i < e; ++i) {
    if (i) type += ", ";
    var arg = args[i], name = arg.id.text;
    if (arg.isOptional) name += "?";
    type += name + ": " + flat(arg.typeExpr, {enter: name, prev: cx});
  }
  type += ")";
  if (ret && (ret.nodeType != 26 || ret.term.text != "void"))
    type += " -> " + flat(ret, {enter: "!ret", prev: cx});
  return type;
}

function objType(node, cx) {
  var data = {}, fields = node.members;
  for (var i = 0; i < fields.length; ++i) {
    var field = fields[i], name;
    if (field.nodeType == nt.ImportDeclaration) {
      cx = {name: field.id.text, value: field.alias.text.replace(/"/g, ""), prev: cx};
    } else if (name = field.name || field.id) {
      var str = field.nodeType == nt.ModuleDefinition ? name.text : name.text.replace(/"/g, "");
      data[str] = walk(field, {enter: str, prev: cx});
    } else if (!data["!type"]) {
      data["!type"] = walk(field, cx);
    }
  }
  return data;
}

function walk(node, cx) {
  if (!node) return "?";

  switch (node.nodeType) {
  case nt.List:
    return objType(node, cx);
  case nt.Name:
    return lookup(node.text, cx) || node.text;
  case nt.VarDecl:
    return walk(node.typeExpr, cx);
  case nt.TypeRef:
    if (!node.arrayCount) return walk(node.term, cx);
    var inner = flat(node.term, {enter: "<i>", prev: cx});
    for (var i = 0; i < node.arrayCount; ++i) inner = "[" + inner + "]";
    return inner;
  case nt.ModuleDeclaration:
  case nt.ClassDeclaration:
  case nt.InterfaceDeclaration:
    return objType(node.members, cx);
  case nt.FuncDecl:
    return functionType(node, cx);
  case nt.Dot:
    return flat(node.operand1, cx) + "." + flat(node.operand2, cx);
  default:
    throw new Error("Unrecognized type: " + nt._map[node.nodeType]);
  }
}

function flat(node, cx) {
  var type = walk(node, cx);
  if (typeof type == "string") return type;
  var name = buildPath(cx);
  for (var i = 0; ; ++i) {
    var uniq = name + (i || "");
    if (!definitions.hasOwnProperty(uniq)) { name = uniq; break; }
  }
  definitions[name] = type;
  return name;
}

var defaultCx = {name: "any", value: "?", prev: {name: "null", value: "?", prev: null}};

exports.translate = function(text, name) {
  definitions = {};
  var tree = parseFile(text, name).Script.bod;
  var data = walk(tree, defaultCx);
  data["!name"] = name;
  var hasDefs = false;
  for (var _d in definitions) { hasDefs = true; break; }
  if (hasDefs) data["!define"] = definitions;
  return data;
};
