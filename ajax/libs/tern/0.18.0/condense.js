// Condensing an inferred set of types to a JSON description document.

// This code can be used to, after a library has been analyzed,
// extract the types defined in that library and dump them as a JSON
// structure (as parsed by def.js).

// The idea being that big libraries can be analyzed once, dumped, and
// then cheaply included in later analysis.

(function(root, mod) {
  if (typeof exports == "object" && typeof module == "object") // CommonJS
    return mod(exports, require("./infer"));
  if (typeof define == "function" && define.amd) // AMD
    return define(["exports", "./infer"], mod);
  mod(root.tern || (root.tern = {}), tern); // Plain browser env
})(this, function(exports, infer) {
  "use strict";

  exports.condense = function(origins, name, options) {
    if (typeof origins == "string") origins = [origins];
    var state = new State(origins, name || origins[0], options || {});

    state.server.signal("preCondenseReach", state)

    state.cx.topScope.path = "<top>";
    state.cx.topScope.reached("", state);
    for (var path in state.roots)
      reach(state.roots[path], null, path, state);
    for (var i = 0; i < state.patchUp.length; ++i)
      patchUpSimpleInstance(state.patchUp[i], state);

    state.server.signal("postCondenseReach", state)

    for (var path in state.types)
      store(createPath(path.split("."), state), state.types[path], state);
    for (var path in state.altPaths)
      storeAlt(path, state.altPaths[path], state);
    var hasDef = false;
    for (var _def in state.output["!define"]) { hasDef = true; break; }
    if (!hasDef) delete state.output["!define"];

    state.server.signal("postCondense", state)

    return simplify(state.output, state.options.sortOutput);
  };

  function State(origins, name, options) {
    this.origins = origins;
    this.cx = infer.cx();
    this.server = options.server || this.cx.parent || {signal: function() {}}
    this.maxOrigin = -Infinity;
    for (var i = 0; i < origins.length; ++i)
      this.maxOrigin = Math.max(this.maxOrigin, this.cx.origins.indexOf(origins[i]));
    this.output = {"!name": name, "!define": {}};
    this.options = options;
    this.types = Object.create(null);
    this.altPaths = Object.create(null);
    this.patchUp = [];
    this.roots = Object.create(null);
  }

  State.prototype.isTarget = function(origin) {
    return this.origins.indexOf(origin) > -1;
  };

  State.prototype.getSpan = function(node) {
    if (this.options.spans == false || !this.isTarget(node.origin)) return null;
    if (node.span) return node.span;
    var srv = this.cx.parent, file;
    if (!srv || !node.originNode || !(file = srv.findFile(node.origin))) return null;
    var start = node.originNode.start, end = node.originNode.end;
    var pStart = file.asLineChar(start), pEnd = file.asLineChar(end);
    return start + "[" + pStart.line + ":" + pStart.ch + "]-" +
      end + "[" + pEnd.line + ":" + pEnd.ch + "]";
  };

  function pathLen(path) {
    var len = 1, pos = 0, dot;
    while ((dot = path.indexOf(".", pos)) != -1) {
      pos = dot + 1;
      len += path.charAt(pos) == "!" ? 10 : 1;
    }
    return len;
  }

  function hop(obj, prop) {
    return Object.prototype.hasOwnProperty.call(obj, prop);
  }

  function isSimpleInstance(o) {
    return o.proto && !(o instanceof infer.Fn) && o.proto != infer.cx().protos.Object &&
      o.proto.hasCtor && !o.hasCtor;
  }

  function reach(type, path, id, state, byName) {
    var actual = type.getType(false);
    if (!actual) return;
    var orig = type.origin || actual.origin, relevant = false;
    if (orig) {
      var origPos = state.cx.origins.indexOf(orig);
      // This is a path that is newer than the code we are interested in.
      if (origPos > state.maxOrigin) return;
      relevant = state.isTarget(orig);
    }
    var newPath = path ? path + "." + id : id, oldPath = actual.path;
    var shorter = !oldPath || pathLen(oldPath) > pathLen(newPath);
    if (shorter) {
      if (!(actual instanceof infer.Prim)) actual.path = newPath;
      if (actual.reached(newPath, state, !relevant) && relevant) {
        var data = state.types[oldPath];
        if (data) {
          delete state.types[oldPath];
          state.altPaths[oldPath] = actual;
        } else data = {type: actual};
        data.span = state.getSpan(type) || (actual != type && state.isTarget(actual.origin) && state.getSpan(actual)) || data.span;
        data.doc = type.doc || (actual != type && state.isTarget(actual.origin) && actual.doc) || data.doc;
        data.data = actual.metaData;
        data.byName = data.byName == null ? !!byName : data.byName && byName;
        state.types[newPath] = data;
      }
    } else {
      if (relevant) state.altPaths[newPath] = actual;
    }
  }
  function reachByName(aval, path, id, state) {
    var type = aval.getType();
    if (type) reach(type, path, id, state, true);
  }

  infer.Prim.prototype.reached = function() {return true;};

  infer.Arr.prototype.reached = function(path, state, concrete) {
    if (concrete) return true
    if (this.tuple) {
      for (var i = 0; i < this.tuple; i++)
        reachByName(this.getProp(String(i)), path, String(i), state)
    } else {
      reachByName(this.getProp("<i>"), path, "<i>", state)
    }
    return true;
  };

  infer.Fn.prototype.reached = function(path, state, concrete) {
    infer.Obj.prototype.reached.call(this, path, state, concrete);
    if (!concrete) {
      for (var i = 0; i < this.args.length; ++i)
        reachByName(this.args[i], path, "!" + i, state);
      reachByName(this.retval, path, "!ret", state);
    }
    return true;
  };

  infer.Obj.prototype.reached = function(path, state, concrete) {
    if (isSimpleInstance(this) && !this.condenseForceInclude) {
      if (state.patchUp.indexOf(this) == -1) state.patchUp.push(this);
      return true;
    } else if (this.proto && !concrete) {
      reach(this.proto, path, "!proto", state);
    }
    var hasProps = false;
    for (var prop in this.props) {
      reach(this.props[prop], path, prop, state);
      hasProps = true;
    }
    if (!hasProps && !this.condenseForceInclude && !(this instanceof infer.Fn)) {
      this.nameOverride = "?";
      return false;
    }
    return true;
  };

  function patchUpSimpleInstance(obj, state) {
    var path = obj.proto.hasCtor.path;
    if (path) {
      obj.nameOverride = "+" + path;
    } else {
      path = obj.path;
    }
    for (var prop in obj.props)
      reach(obj.props[prop], path, prop, state);
  }

  function createPath(parts, state) {
    var base = state.output, defs = state.output["!define"];
    for (var i = 0, path; i < parts.length; ++i) {
      var part = parts[i];
      path = path ? path + "." + part : part;
      var me = state.types[path];
      if (part.charAt(0) == "!" || me && me.byName) {
        if (hop(defs, path)) base = defs[path];
        else defs[path] = base = {};
      } else {
        if (hop(base, parts[i])) base = base[part];
        else base = base[part] = {};
      }
    }
    return base;
  }

  function store(out, info, state) {
    var name = typeName(info.type);
    if (name != info.type.path && name != "?") {
      out["!type"] = name;
    } else if (info.type.proto && info.type.proto != state.cx.protos.Object) {
      var protoName = typeName(info.type.proto);
      if (protoName != "?") out["!proto"] = protoName;
    }
    if (info.span) out["!span"] = info.span;
    if (info.doc) out["!doc"] = info.doc;
    if (info.data) out["!data"] = info.data;
  }

  function storeAlt(path, type, state) {
    var parts = path.split("."), last = parts.pop();
    if (last[0] == "!") return;
    var known = state.types[parts.join(".")];
    var base = createPath(parts, state);
    if (known && known.type.constructor != infer.Obj) return;
    if (!hop(base, last)) base[last] = type.nameOverride || type.path;
  }

  var typeNameStack = [];
  function typeName(value) {
    var isType = value instanceof infer.Type;
    if (isType) {
      if (typeNameStack.indexOf(value) > -1)
        return value.path || "?";
      typeNameStack.push(value);
    }
    var name = value.typeName();
    if (isType) typeNameStack.pop();
    return name;
  }

  infer.AVal.prototype.typeName = function() {
    if (this.types.length == 0) return "?";
    if (this.types.length == 1) return typeName(this.types[0]);
    var simplified = infer.simplifyTypes(this.types);
    if (simplified.length > 2) return "?";
    for (var strs = [], i = 0; i < simplified.length; i++)
      strs.push(typeName(simplified[i]));
    return strs.join("|");
  };

  infer.ANull.typeName = function() { return "?"; };

  infer.Prim.prototype.typeName = function() { return this.name; };

  infer.Sym.prototype.typeName = function() { return this.asPropName }

  infer.Arr.prototype.typeName = function() {
    if (!this.tuple) return "[" + typeName(this.getProp("<i>")) + "]"
    var content = []
    for (var i = 0; i < this.tuple; i++)
      content.push(typeName(this.getProp(String(i))))
    return "[" + content.join(", ") + "]"
  };

  infer.Fn.prototype.typeName = function() {
    var out = this.generator ? "fn*(" : "fn(";
    for (var i = 0; i < this.args.length; ++i) {
      if (i) out += ", ";
      var name = this.argNames[i];
      if (name && name != "?") out += name + ": ";
      out += typeName(this.args[i]);
    }
    out += ")";
    if (this.computeRetSource)
      out += " -> " + this.computeRetSource;
    else if (!this.retval.isEmpty())
      out += " -> " + typeName(this.retval);
    return out;
  };

  infer.Obj.prototype.typeName = function() {
    if (this.nameOverride) return this.nameOverride;
    if (!this.path) return "?";
    return this.path;
  };

  function simplify(data, sort) {
    if (typeof data != "object") return data;
    var sawType = false, sawOther = false;
    for (var prop in data) {
      if (prop == "!type") sawType = true;
      else sawOther = true;
      if (prop != "!data")
        data[prop] = simplify(data[prop], sort);
    }
    if (sawType && !sawOther) return data["!type"];
    return sort ? sortObject(data) : data;
  }

  function sortObject(obj) {
    var props = [], out = {};
    for (var prop in obj) props.push(prop);
    props.sort();
    for (var i = 0; i < props.length; ++i) {
      var prop = props[i];
      out[prop] = obj[prop];
    }
    return out;
  }
});
