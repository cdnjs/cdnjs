// Parser for TypeScript-style definition files
//
// Takes a TypeScript file as, for example, found in
// github.com/borisyankov/DefinitelyTyped , and spits out Tern type
// description JSON data.

var fs = require("fs");

// The TypeScript code is all there in the npm package, but it's not
// exporting anything as a CommonJS module, so we use this kludge to
// get at its internals.
var tsFileName = __dirname + "/../node_modules/typescript/bin/typescript.js";
var box = {};
for (var prop in global) box[prop] = global[prop];
require('vm').runInNewContext(fs.readFileSync(tsFileName, "utf8"), box, {filename: tsFileName});

var ts = box.TypeScript;
var nt = ts.SyntaxKind;

var definitions;

function parseFile(text, name) {
  if (text.charCodeAt(0) == 0xfeff) text = text.slice(1); // Kill byte-order-mark
  return new ts.Parser.parse(name, new ts.SimpleText.fromString(text), false, new ts.ParseOptions(null, true));
}

function lookup(name, cx) {
  for (; cx; cx = cx.prev)
    if (cx.name == name) return cx.value;
}

function buildPath(cx) {
  for (var path = ""; cx; cx = cx.prev) {
    var part = cx.enter && cx.enter.replace(/[^\w$]/g, "");
    if (part) path = path ? part + "." + path : part;
  }
  return path;
}

function functionType(node, cx) {
  var type = "fn(";
  var args = node.parameterList.parameters;
  for (var i = 0, e = args.childCount(); i < e; ++i) {
    var arg = args.childAt(i);
    if (!arg.identifier) continue;
    if (i) type += ", ";
    var name = arg.identifier.text();
    if (arg.questionToken) name += "?";
    type += name + ": " + walk_(arg.typeAnnotation, {enter: name, prev: cx});
  }
  type += ")";
  var ret = node.typeAnnotation && node.typeAnnotation.type;
  if (ret && ret.kind() != nt.VoidKeyword) // FIXME filter out void
    type += " -> " + flat(ret, {enter: "!ret", prev: cx});
  return type;
}

function addToObj(data, identifier, val) {
  var known = data[name];
  var name = identifier.text();
  if (/^".*"$/.test(name)) name = name.slice(1, name.length - 1);
  if (known) {
    if (typeof known != "string" && typeof val == "string" && !known["!type"]) {
      known["!type"] = val;
    } else if (typeof known == "string" && typeof val != "string") {
      data[name] = val;
      val["!type"] = known;
    }
  } else {
    data[name] = val;
  }
}

function isStatic(node) {
  if (node.modifiers) for (var i = 0, e = node.modifiers.childCount(); i < e; i++)
    if (node.modifiers.childAt(i).value() == "static") return true;
}

function objType(list, cx, cls) {
  var data = {};
  for (var i = 0, e = list.childCount(); i < e; ++i) {
    var field = list.childAt(i);
    var target = cls && isStatic(field) ? cls : data;
    switch (field.kind()) {
    case nt.ImportDeclaration:
      var mod = flat(field.moduleReference(), cx);
      cx = {name: field.identifier.text(), value: mod, prev: cx};
      break;
    case nt.FunctionDeclaration:
      addToObj(target, field.identifier, functionType(field.callSignature, cx));
      break;
    case nt.MemberFunctionDeclaration:
    case nt.MethodSignature:
      addToObj(target, field.propertyName, functionType(field.callSignature, cx));
      break;
    case nt.ModuleDeclaration:
      addToObj(target, field.name || field.stringLiteral, objType(field.moduleElements, cx));
      break;
    case nt.InterfaceDeclaration:
      addToObj(target, field.identifier, objType(field.body.typeMembers, cx));
      break;
    case nt.ClassDeclaration:
      var inner = {};
      inner.prototype = objType(field.classElements, cx, inner);
      addToObj(target, field.identifier, inner);
      break;
    case nt.PropertySignature:
      addToObj(target, field.propertyName, walk_(field.typeAnnotation, cx));
      break;
    case nt.MemberVariableDeclaration:
      addToObj(target, field.variableDeclarator.propertyName, walk_(field.variableDeclarator.typeAnnotation, cx));
      break;
    case nt.EnumDeclaration:
      addToObj(target, field.identifier, "number");
      break;
    case nt.VariableStatement:
      var decls = field.variableDeclaration.variableDeclarators;
      for (var j = 0, ej = decls.childCount(); j < ej; j++) {
        var decl = decls.childAt(j);
        addToObj(target, decl.propertyName, walk_(decl.typeAnnotation, cx));
      }
      break;
    case nt.ConstructorDeclaration:
      if (cls && !cls["!type"]) cls["!type"] = functionType(field, cx);
      break;
    case nt.ExportAssignment:
      return walk(field.identifier, cx);
    // FIXME not sure what these are doing in declaration files
    case nt.CallSignature:
    case nt.ConstructSignature:
    case nt.IndexSignature:
    case nt.SemicolonToken:
    case nt.EmptyStatement:
      break;
    default:
      throw new Error("Unknown field type: " + nt[field.kind()]);
    }
  }
  return data;
}

function walk(node, cx) {
  switch (node.kind()) {
  case nt.IdentifierName:
    return lookup(node.text(), cx) || node.text();
  case nt.QualifiedName:
    return flat(node.left, cx) + "." + flat(node.right, null);
  case nt.ObjectType:
    return objType(node.typeMembers, cx);
  case nt.ArrayType:
    return "[" + flat(node.type, cx) + "]";
  case nt.FunctionType:
    return functionType(node, cx);
  case nt.DotToken:
    return flat(node.operand1, cx) + "." + flat(node.operand2, cx);
  case nt.StringLiteral:
  case nt.StringKeyword:
    return "string";
  case nt.NumberKeyword:
    return "number";
  case nt.BooleanKeyword:
    return "bool";
  case nt.AnyKeyword:
  case nt.VoidKeyword:
    return "?";
  case nt.TypeQuery:
    return walk(node.name);
  case nt.FirstTypeScriptKeyword:
  case nt.LastTypeScriptKeyword:
  case nt.FirstKeyword:
  case nt.LastKeyword:
    return node.value();
  default:
    throw new Error("Unrecognized type: " + nt[node.kind()]);
  }
}

function walk_(typeAnn, cx) {
  if (typeAnn && typeAnn.type) return walk(typeAnn.type, cx);
  return "?";
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
  var tree = parseFile(text, name).sourceUnit();
  var data = objType(tree.moduleElements, defaultCx);
  data["!name"] = name;
  var hasDefs = false;
  for (var _d in definitions) { hasDefs = true; break; }
  if (hasDefs) data["!define"] = definitions;
  return data;
};
