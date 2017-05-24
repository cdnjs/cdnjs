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

  function setPath(type, path, state, curOrigin) {
    var actual = type.getType(false);
    if (!actual) return;
    var orig = path ? type.origin || actual.origin : -1;
    if (orig) {
      var origPos = state.cx.origins.indexOf(orig);
      if (origPos < curOrigin || (path && origPos > state.maxOrigin)) return;
      // If the path leading up to this does not contain elements that
      // are in (or younger than) the set of origins we are interested
      // in, and this object is in the set of target origins, and it's
      // not a 'magic' path (!ret and such), add this entity to the
      // set of things added to foreign/external objects.
      if (curOrigin != -1 && curOrigin < state.minOrigin && isTarget(state, orig) && path.indexOf("!") < 0 &&
          state.addedToForeign.indexOf(path) < 0)
        state.addedToForeign.push(actual, path);
      curOrigin = origPos;
    }
    if (path && actual.path && pathLen(actual.path) <= pathLen(path)) return;
    actual.setPath(path, state, curOrigin);
  }

  infer.Prim.prototype.setPath = function() {};

  infer.Arr.prototype.setPath = function(path, state, curOrigin) {
    this.path = path;
    setPath(this.getProp("<i>"), path + ".<i>", state, curOrigin);
  };

  infer.Fn.prototype.setPath = function(path, state, curOrigin) {
    infer.Obj.prototype.setPath.call(this, path, state, curOrigin);
    for (var i = 0; i < this.args.length; ++i) setPath(this.args[i], path + ".!" + i, state, curOrigin);
    setPath(this.retval, path + ".!ret", state, curOrigin);
  };

  infer.Obj.prototype.setPath = function(path, state, curOrigin) {
    this.path = path || "<top>";
    var start = path ? path + "." : "";
    for (var prop in this.props)
      setPath(this.props[prop], start + prop, state, curOrigin);
    if (this.proto) setPath(this.proto, start + "!proto", state, curOrigin);
  };

  // FIXME maybe cut off output at a certain path length? the long
  // paths tend to be uninteresting internals
  function desc(type, state, asStr) {
    var actual = type.getType(false);
    if (!actual) return "?";

    var found = actual.path && state.paths[actual.path];
    if (found) return actual.path;

    if (state.seen.indexOf(type) > -1) return type.path || "?";
    state.seen.push(type);
    var d = actual.getDesc(state, !asStr && getSpan(state, type), asStr);
    state.seen.pop();
    return d;
  }

  infer.Prim.prototype.getDesc = function(_state, span, asStr) {
    return asStr ? this.name : addSpan(this.name, span);
  };

  infer.Arr.prototype.getDesc = function(state, span, asStr) {
    var str = "[" + desc(this.getProp("<i>"), state, true) + "]";
    return asStr ? str : addSpan(str, getSpan(state, this, span));
  };

  infer.Fn.prototype.getDesc = function(state, span) {
    if (this.path && !isTarget(state, this.origin)) return this.path;

    var out = "fn(";
    for (var i = 0; i < this.args.length; ++i) {
      if (i) out += ", ";
      var name = this.argNames[i];
      if (name && name != "?") out += name + ": ";
      out += desc(this.args[i], state, true);
    }
    out += ")";
    if (this.computeRetSource) {
      out += " -> " + this.computeRetSource;
    } else if (!this.retval.isEmpty()) {
      var rettype = this.retval.getType();
      if (rettype) out += " -> " + desc(rettype, state, true);
    }

    if (!hasProps(this)) return out;

    var obj = {"!type": out};
    if (this.doc) obj["!doc"] = this.doc;
    addSpan(obj, getSpan(state, this, span));
    state.paths[this.path] = {structure: obj};
    setProps(this, obj, state);
    return this.path;
  };

  function getSpan(state, node, deflt) {
    if (state.options.spans == false) return null;
    if (node.span) return node.span;
    if (!node.originNode) return deflt;
    var srv = state.cx.parent, file = srv && srv.findFile(node.origin);
    if (!file) return deflt;
    var pStart = file.asLineChar(node.originNode.start), pEnd = file.asLineChar(node.originNode.end);
    return node.originNode.start + "[" + pStart.line + ":" + pStart.ch + "]-" +
      node.originNode.end + "[" + pEnd.line + ":" + pEnd.ch + "]";
  }

  function addSpan(target, span) {
    if (span) {
      if (typeof target == "string") target = {"!type": target};
      target["!span"] = span;
    }
    return target;
  }

  function hasProps(obj) {
    if (obj.doc || obj.originNode) return true;
    for (var _prop in obj.props) return true;
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

  infer.Obj.prototype.getDesc = function(state, span) {
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
    if (this.doc) structure["!doc"] = this.doc;
    addSpan(structure, getSpan(state, structure, span));
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

    for (var v in desc) if (!/^!(?:define|name|proto|doc|span|url)$/.test(v))
      desc[v] = sanitize(desc[v], state, path == null ? null : path ? path + "." + v : v);
    return desc;
  }

  exports.condense = function(sources, name, options) {
    if (!options) options = {};
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
                 seen: [],
                 options: options};

    setPath(cx.topScope, "", state, -1);

    for (var v in cx.topScope.props) {
      var av = cx.topScope.props[v];
      if (!isTarget(state, av.origin)) continue;
      var d = desc(av, state);
      if (d != "?") output[v] = d;
    }

    if (state.addedToForeign.length > 0) {
      var list = state.addedToForeign;
      state.addedToForeign = [];
      for (var i = 0; i < list.length; i += 2) {
        var d = list[i], parts = list[i + 1].split(".");
        var parent = infer.def.parsePath(parts.slice(0, parts.length - 1).join("."));
        if (isSimpleInstance(parent, state))
          parts = parent.proto.path.split(".").concat(parts[parts.length - 1]);
        var val = desc(d, state);
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
