// Condensing an inferred set of types to a JSON description document.

// This code can be used to, after a library has been analyzed,
// extract the types defined in that library and dump them as a JSON
// structure (as parsed by def.js).

// The idea being that big libraries can be analyzed once, dumped, and
// then cheaply included in later analysis.

(function(mod) {
  if (typeof exports == "object" && typeof module == "object") // CommonJS
    return mod(exports, require("./infer"));
  if (typeof define == "function" && define.amd) // AMD
    return define(["exports", "./infer"], mod);
  mod(self.tern || (self.tern = {}), tern); // Plain browser env
})(function(exports, infer) {
  "use strict";

  function pathLen(path) {
    var len = 1, pos = 0, dot;
    while ((dot = path.indexOf(".", pos)) != -1) {
      pos = dot + 1;
      len += path.charAt(pos) == "!" ? 10 : 1;
    }
    return len;
  }

  function isTarget(state, orig) {
    return state.sources.indexOf(orig) > -1;
  }

  function setPath(type, path, state, maxOrigin) {
    var actual = type.getType(false);
    if (!actual) return;
    var orig = type.origin || actual && actual.origin;
    if (orig) {
      var origPos = state.cx.origins.indexOf(orig);
      if (origPos < maxOrigin || (path && origPos > state.maxOrigin)) return;
      if (maxOrigin < state.minOrigin && isTarget(state, orig) && path.indexOf("!") < 0 &&
          state.addedToForeign.indexOf(actual) < 0)
        state.addedToForeign.push(actual);
      maxOrigin = origPos;
    }
    if (actual.path && pathLen(actual.path) <= pathLen(path)) return;
    actual.setPath(path, state, maxOrigin);
  }

  infer.Prim.prototype.setPath = function() {};

  infer.Arr.prototype.setPath = function(path, state, maxOrigin) {
    this.path = path;
    setPath(this.getProp("<i>"), path + ".<i>", state, maxOrigin);
  };

  infer.Fn.prototype.setPath = function(path, state, maxOrigin) {
    infer.Obj.prototype.setPath.call(this, path, state, maxOrigin);
    for (var i = 0; i < this.args.length; ++i) setPath(this.args[i], path + ".!" + i, state, maxOrigin);
    setPath(this.retval, path + ".!ret", state, maxOrigin);
  };

  infer.Obj.prototype.setPath = function(path, state, maxOrigin) {
    this.path = path || "<top>";
    var start = path ? path + "." : "";
    for (var prop in this.props)
      setPath(this.props[prop], start + prop, state, maxOrigin);
    if (this.proto) setPath(this.proto, start + "!proto", state, maxOrigin);
  };

  // FIXME maybe cut off output at a certain path length? the long
  // paths tend to be uninteresting internals
  function desc(type, state) {
    var actual = type.getType(false);
    if (!actual) return "?";
    var inForeign = state.addedToForeign.indexOf(actual);
    if (inForeign >= 0) state.addedToForeign.splice(inForeign, 1);

    var found = actual.path && state.paths[actual.path];
    if (found) return actual.path;

    if (state.seen.indexOf(type) > -1) return type.path || "?";
    state.seen.push(type);
    var d = actual.getDesc(state);
    state.seen.pop();
    return d;
  }

  infer.Prim.prototype.getDesc = function() { return this.name; };

  infer.Arr.prototype.getDesc = function(state) {
    return "[" + desc(this.getProp("<i>"), state) + "]";
  };

  infer.Fn.prototype.getDesc = function(state) {
    if (this.path && !isTarget(state, this.origin)) return this.path;

    var out = "fn(";
    for (var i = 0; i < this.args.length; ++i) {
      if (i) out += ", ";
      var name = this.argNames[i];
      if (name && name != "?") out += name + ": ";
      out += desc(this.args[i], state);
    }
    out += ")";
    if (this.computeRetSource) {
      out += " -> " + this.computeRetSource;
    } else if (!this.retval.isEmpty()) {
      var rettype = this.retval.getType();
      if (rettype) out += " -> " + desc(rettype, state);
    }

    if (!hasProps(this)) return out;

    var obj = {"!type": out};
    state.paths[this.path] = {structure: obj};
    setProps(this, obj, state);
    return this.path;
  };

  function hasProps(obj) {
    for (var prop in obj.props) return true;
  }

  function setProps(source, target, state) {
    for (var prop in source.props) {
      var val = source.props[prop];
      if (isTarget(state, val.origin)) target[prop] = desc(val, state);
    }
  }

  function isSimpleInstance(o, state) {
    if (o._fromProto) return true;

    if (o.proto && o.proto != state.cx.protos.Object && o.proto.hasCtor &&
        !o.hasCtor && o.proto.hasCtor.path) {
      desc(o.proto, state);
      o._fromProto = true;
      var protoDesc = state.paths[o.proto.path];
      if (protoDesc) {
        setProps(o, protoDesc.structure, state);
        protoDesc.mayCull = false;
      }
      return true;
    }
  }

  infer.Obj.prototype.getDesc = function(state) {
    if (isSimpleInstance(this, state)) return "+" + this.proto.hasCtor.path;
    if (!isTarget(state, this.origin)) return this.path;

    var structure = {}, proto;
    var rec = state.paths[this.path] = {structure: structure};

    if (this.proto && this.proto != state.cx.protos.Object) {
      proto = desc(this.proto, state);
      if (proto == "?") proto = null;
    }

    if (rec.mayCull == null && !proto && !hasProps(this)) rec.mayCull = true;
    if (proto) structure["!proto"] = proto;
    setProps(this, structure, state);
    return this.path;
  };

  function sanitize(desc, state, path) {
    if (typeof desc == "string") {
      var found;
      if (desc == path && (found = state.paths[desc])) {
        if (found.mayCull) return "?";
        found.inlined = true;
        return sanitize(found.structure, state, path);
      } else {
        return desc;
      }
    }

    for (var v in desc) if (!/^!(?:define|name|proto)$/.test(v))
      desc[v] = sanitize(desc[v], state, path == null ? null : path ? path + "." + v : v);
    return desc;
  }

  exports.condense = function(sources, name) {
    if (typeof sources == "string") sources = [sources];
    if (!name) name = sources[0];

    var cx = infer.cx(), defs = {}, minOrigin = Infinity, maxOrigin = -Infinity;
    for (var i = 0; i < sources.length; ++i) {
      var pos = cx.origins.indexOf(sources[i]);
      if (pos < 0) continue;
      minOrigin = Math.min(pos, minOrigin);
      maxOrigin = Math.max(pos, maxOrigin);
    }
    var output = {"!name": name, "!define": defs};
    var state = {sources: sources,
                 paths: Object.create(null),
                 cx: cx,
                 minOrigin: minOrigin, maxOrigin: maxOrigin,
                 addedToForeign: [],
                 seen: []};

    setPath(cx.topScope, "", state, 0);

    for (var v in cx.topScope.props) {
      var av = cx.topScope.props[v];
      if (!isTarget(state, av.origin)) continue;
      var typ = av.getType(false);
      if (typ && isTarget(state, typ.origin)) output[v] = desc(typ, state);
    }

    if (state.addedToForeign.length > 0) {
      var list = state.addedToForeign;
      state.addedToForeign = [];
      for (var i = 0; i < list.length; ++i) {
        var d = list[i], parts = d.path.split(".");
        var parent = infer.def.parsePath(parts.slice(0, parts.length - 1).join("."));
        if (isSimpleInstance(parent, state))
          parts = parent.proto.path.split(".").concat(parts[parts.length - 1]);
        var val = desc(list[i], state);
        if (val == "?" || parts.some(function(s) {return s.charAt(0) == "!";})) continue;
        for (var j = 0, cur = output; j < parts.length - 1; ++j) {
          var part = parts[j];
          if (Object.prototype.hasOwnProperty.call(cur, part)) cur = cur[part];
          else cur = cur[part] = {};
        }
        cur[parts[parts.length - 1]] = val;
      }
    }

    sanitize(output, state, "");
    var toAdd = [];
    for (var path in state.paths) {
      var elt = state.paths[path];
      if (!elt.inlined && !elt.mayCull)
        toAdd.push(path, sanitize(elt.structure, state, null));
    }
    if (toAdd.length)
      // Invert order to minimize forward references
      for (var i = toAdd.length - 2; i >= 0; i -= 2) defs[toAdd[i]] = toAdd[i + 1];
    else
      delete output["!define"];

    return output;
  };
});
