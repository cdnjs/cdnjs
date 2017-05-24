(function(mod) {
  if (typeof exports == "object" && typeof module == "object") // CommonJS
    return mod(require("../lib/infer"), require("../lib/tern"));
  if (typeof define == "function" && define.amd) // AMD
    return define(["../lib/infer", "../lib/tern"], mod);
  mod(tern, tern);
})(function(infer, tern) {
  "use strict";

  function resolveName(name, data) {
    var opts = data.options;
    var base = opts.baseURL || "";
    if (base && base.charAt(base.length - 1) != "/") base += "/";
    if (!opts.paths) return base + name + ".js";
    var known = opts.paths[name];
    if (known) return base + known + ".js";
    var dir = name.match(/^([^\/]+)(\/.*)$/);
    if (dir) {
      var known = opts.paths[dir[0]];
      if (known) return base + known + dir[1] + ".js";
    }
    return base + name + ".js";
  }

  function flattenPath(path) {
    if (!/(^|\/)(\.\/|[^\/]+\/\.\.\/)/.test(path)) return path;
    var parts = path.split("/");
    for (var i = 0; i < parts.length; ++i) {
      if (parts[i] == ".") parts.splice(i--, 1);
      else if (i && parts[i] == "..") parts.splice(i-- - 1, 2);
    }
    return parts.join("/");
  }

  function getRequire(data) {
    if (!data.require) {
      data.require = new infer.Fn("require", infer.ANull, [infer.cx().str], ["module"], new infer.AVal);
      data.require.computeRet = function(_self, args, argNodes) {
        if (argNodes.length && argNodes[0].type == "Literal" && typeof argNodes[0].value == "string")
          return getInterface(argNodes[0].value, data);
        return infer.ANull;
      };
    }
    return data.require;
  }

  function getInterface(name, data) {
    if (name == "require") return getRequire(data);

    if (!/^(https?:|\/)|\.js$/.test(name))
      name = resolveName(name, data);
    name = flattenPath(name);
    var known = data.interfaces[name];
    if (!known) {
      known = data.interfaces[name] = new infer.AVal;
      data.server.addFile(name);
    }
    return known;
  }

  var EXPORT_OBJ_WEIGHT = 50;

  infer.registerFunction("requireJS", function(_self, args, argNodes) {
    var server = infer.cx().parent, data = server && server._requireJS;
    if (!data || !args.length) return infer.ANull;

    var name = data.currentFile;
    var out = data.interfaces[name];
    if (!out) out = data.interfaces[name] = new infer.AVal;

    var deps = [], fn;
    if (argNodes && args.length > 1) {
      var node = argNodes[args.length == 2 ? 0 : 1];
      if (node.type == "Literal" && typeof node.value == "string") {
        deps.push(getInterface(node.value, data));
      } else if (node.type == "ArrayExpression") for (var i = 0; i < node.elements.length; ++i) {
        var elt = node.elements[i];
        if (elt.type == "Literal" && typeof elt.value == "string") {
          if (elt.value == "exports") {
            var exports = new infer.Obj(true);
            deps.push(exports);
            out.addType(exports, EXPORT_OBJ_WEIGHT);
          } else {
            deps.push(getInterface(elt.value, data));
          }
        }
      }
    } else if (argNodes && args.length == 1 && argNodes[0].type == "FunctionExpression" && argNodes[0].params.length) {
      // Simplified CommonJS call
      var exports = new infer.Obj(true);
      deps.push(getInterface("require", data), exports);
      out.addType(exports, EXPORT_OBJ_WEIGHT);
      fn = args[0];
    }

    if (!fn) {
      fn = args[Math.min(args.length - 1, 2)];
      if (!fn.isEmpty() && !fn.getFunctionType()) fn = null;
    }

    if (fn) fn.propagate(new infer.IsCallee(infer.ANull, deps, null, out));
    else if (args.length) args[0].propagate(out);

    return infer.ANull;
  });

  tern.registerPlugin("requirejs", function(server, options) {
    server._requireJS = {
      interfaces: Object.create(null),
      options: options || {},
      currentFile: null,
      server: server
    };

    server.on("beforeLoad", function(file) {
      this._requireJS.currentFile = file.name;
    });
    server.on("reset", function(file) {
      this._requireJS.interfaces = Object.create(null);
      this._requireJS.require = null;
    });
    return {defs: defs};
  });

  var defs = {
    "!name": "requirejs.js",
    requirejs: {
      "!type": "fn(deps: [string], callback: fn(), errback: fn()) -> !custom:requireJS",
      onError: "fn(err: +Error)",
      load: "fn(context: ?, moduleName: string, url: string)",
      config: "fn(config: ?)",
      version: "string",
      isBrowser: "bool"
    },
    require: "requirejs",
    define: {
      "!type": "fn(deps: [string], callback: fn()) -> !custom:requireJS",
      amd: {
        jQuery: "bool"
      }
    }
  };
});
