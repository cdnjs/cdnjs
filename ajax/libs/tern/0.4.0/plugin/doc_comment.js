// Parses comments above variable declarations, function declarations,
// and object properties as docstrings and JSDoc-style type
// annotations.

(function(mod) {
  if (typeof exports == "object" && typeof module == "object") // CommonJS
    return mod(require("../lib/infer"), require("../lib/tern"), require("../lib/comment"),
               require("acorn/util/walk"));
  if (typeof define == "function" && define.amd) // AMD
    return define(["../lib/infer", "../lib/tern", "../lib/comment", "acorn/util/walk"], mod);
  mod(tern, tern, tern.comment, acorn.walk);
})(function(infer, tern, comment, walk) {
  "use strict";

  tern.registerPlugin("doc_comment", function() {
    return {
      passes: {
        "postParse": postParse,
        "postInfer": postInfer
      }
    };
  });

  function postParse(ast, text) {
    function attachComments(node) { comment.ensureCommentsBefore(text, node); }

    walk.simple(ast, {
      VariableDeclaration: attachComments,
      FunctionDeclaration: attachComments,
      AssignmentExpression: function(node) {
        if (node.operator == "=") attachComments(node);
      },
      ObjectExpression: function(node) {
        for (var i = 0; i < node.properties.length; ++i)
          attachComments(node.properties[i].key);
      }
    });
  }

  function postInfer(ast, scope) {
    walk.simple(ast, {
      VariableDeclaration: function(node, scope) {
        if (node.commentsBefore)
          interpretComments(node, node.commentsBefore, scope,
                            scope.getProp(node.declarations[0].id.name));
      },
      FunctionDeclaration: function(node, scope) {
        if (node.commentsBefore)
          interpretComments(node, node.commentsBefore, scope,
                            scope.getProp(node.id.name),
                            node.body.scope.fnType);
      },
      AssignmentExpression: function(node, scope) {
        if (node.commentsBefore)
          interpretComments(node, node.commentsBefore, scope,
                            infer.expressionType({node: node.left, state: scope}));
      },
      ObjectExpression: function(node, scope) {
        for (var i = 0; i < node.properties.length; ++i) {
          var prop = node.properties[i], key = prop.key;
          if (key.commentsBefore)
            interpretComments(prop, key.commentsBefore, scope,
                              node.objType.getProp(key.name));
        }
      }
    }, infer.searchVisitor, scope);
  }

  // COMMENT INTERPRETATION

  function interpretComments(node, comments, scope, aval, type) {
    jsdocInterpretComments(node, scope, aval, comments);

    if (!type && aval instanceof infer.AVal && aval.types.length) {
      type = aval.types[aval.types.length - 1];
      if (!(type instanceof infer.Obj) || type.origin != infer.cx().curOrigin || type.doc)
        type = null;
    }

    var first = comments[0], dot = first.search(/\.\s/);
    if (dot > 5) first = first.slice(0, dot + 1);
    first = first.trim().replace(/\s*\n\s*\*\s*|\s{1,}/g, " ");
    if (aval instanceof infer.AVal) aval.doc = first;
    if (type) type.doc = first;
  }

  // Parses a subset of JSDoc-style comments in order to include the
  // explicitly defined types in the analysis.

  function skipSpace(str, pos) {
    while (/\s/.test(str.charAt(pos))) ++pos;
    return pos;
  }

  function parseLabelList(scope, str, pos, close) {
    var labels = [], types = [];
    for (var first = true; ; first = false) {
      pos = skipSpace(str, pos);
      if (first && str.charAt(pos) == close) break;
      var colon = str.indexOf(":", pos);
      if (colon < 0) return null;
      var label = str.slice(pos, colon);
      if (!/^[\w$]+$/.test(label)) return null;
      labels.push(label);
      pos = colon + 1;
      var type = parseType(scope, str, pos);
      if (!type) return null;
      pos = type.end;
      types.push(type.type);
      pos = skipSpace(str, pos);
      var next = str.charAt(pos);
      ++pos;
      if (next == close) break;
      if (next != ",") return null;
    }
    return {labels: labels, types: types, end: pos};
  }

  function parseType(scope, str, pos) {
    pos = skipSpace(str, pos);
    var type;

    if (str.indexOf("function(", pos) == pos) {
      var args = parseLabelList(scope, str, pos + 9, ")"), ret = infer.ANull;
      if (!args) return null;
      pos = skipSpace(str, args.end);
      if (str.charAt(pos) == ":") {
        ++pos;
        var retType = parseType(scope, str, pos + 1);
        if (!retType) return null;
        pos = retType.end;
        ret = retType.type;
      }
      type = new infer.Fn(null, infer.ANull, args.types, args.labels, ret);
    } else if (str.charAt(pos) == "[") {
      var inner = parseType(scope, str, pos + 1);
      if (!inner) return null;
      pos = skipSpace(str, inner.end);
      if (str.charAt(pos) != "]") return null;
      ++pos;
      type = new infer.Arr(inner.type);
    } else if (str.charAt(pos) == "{") {
      var fields = parseLabelList(scope, str, pos + 1, "}");
      if (!fields) return null;
      type = new infer.Obj(true);
      for (var i = 0; i < fields.types.length; ++i) {
        var field = type.defProp(fields.labels[i]);
        field.initializer = true;
        fields.types[i].propagate(field);
      }
      pos = fields.end;
    } else {
      var start = pos;
      while (/[\w$]/.test(str.charAt(pos))) ++pos;
      if (start == pos) return null;
      var word = str.slice(start, pos);
      if (/^(number|integer)$/i.test(word)) type = infer.cx().num;
      else if (/^bool(ean)?$/i.test(word)) type = infer.cx().bool;
      else if (/^string$/i.test(word)) type = infer.cx().str;
      else {
        var found = scope.hasProp(word);
        if (found) found = found.getType();
        if (!found) {
          type = infer.ANull;
        } else if (found instanceof infer.Fn && /^[A-Z]/.test(word)) {
          var proto = found.getProp("prototype").getType();
          if (proto instanceof infer.Obj) type = infer.getInstance(proto);
        } else {
          type = found;
        }
      }
    }

    var isOptional = false;
    if (str.charAt(pos) == "=") {
        ++pos;
        isOptional = true;
    }
    return {type: type, end: pos, isOptional: isOptional};
  }

  function parseTypeOuter(scope, str, pos) {
    pos = skipSpace(str, pos || 0);
    if (str.charAt(pos) != "{") return null;
    var result = parseType(scope, str, pos + 1);
    if (!result || str.charAt(result.end) != "}") return null;
    ++result.end;
    return result;
  }

  function jsdocInterpretComments(node, scope, aval, comments) {
    var type, args, ret, foundOne;

    for (var i = 0; i < comments.length; ++i) {
      var comment = comments[i];
      var decl = /(?:\n|$|\*)\s*@(type|param|arg(?:ument)?|returns?)\s+(.*)/g, m;
      while (m = decl.exec(comment)) {
        var parsed = parseTypeOuter(scope, m[2]);
        if (!parsed) continue;
        foundOne = true;

        switch(m[1]) {
        case "returns": case "return":
          ret = parsed.type; break;
        case "type":
          type = parsed.type; break;
        case "param": case "arg": case "argument":
          var name = m[2].slice(parsed.end).match(/^\s*([\w$]+)/);
          if (!name) continue;
          (args || (args = Object.create(null)))[name[1]] = parsed.type;
          if (args) args[name[1]].isOptional = parsed.isOptional;
          break;
        }
      }
    }

    if (foundOne) applyType(type, args, ret, node, aval);
  };

  function applyType(type, args, ret, node, aval) {
    var fn;
    if (node.type == "VariableDeclaration") {
      var decl = node.declarations[0];
      if (decl.init && decl.init.type == "FunctionExpression") fn = decl.init.body.scope.fnType;
    } else if (node.type == "FunctionDeclaration") {
      fn = node.body.scope.fnType;
    } else if (node.type == "AssignmentExpression") {
      if (node.right.type == "FunctionExpression")
        fn = node.right.body.scope.fnType;
    } else { // An object property
      if (node.value.type == "FunctionExpression") fn = node.value.body.scope.fnType;
    }

    if (fn && (args || ret)) {
      if (args) for (var i = 0; i < fn.argNames.length; ++i) {
        var name = fn.argNames[i], known = args[name];
        if (known) {
            known.propagate(fn.args[i]);
            if (args[name].isOptional) fn.argNames[i] += "?";
        }
      }
      if (ret) ret.propagate(fn.retval);
    } else if (type) {
      type.propagate(aval);
    }
  };
});
