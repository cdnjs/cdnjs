(function(mod) {
  if (typeof exports == "object" && typeof module == "object") // CommonJS
    return mod(require("../lib/infer"), require("../lib/tern"));
  if (typeof define == "function" && define.amd) // AMD
    return define(["../lib/infer", "../lib/tern"], mod);
  mod(tern, tern);
})(function(infer, tern) {
  "use strict";

  function flattenPath(path) {
    if (!/(^|\/)(\.\/|[^\/]+\/\.\.\/)/.test(path)) return path;
    var parts = path.split("/");
    for (var i = 0; i < parts.length; ++i) {
      if (parts[i] == ".") parts.splice(i--, 1);
      else if (i && parts[i] == "..") parts.splice(i-- - 1, 2);
    }
    return parts.join("/");
  }

  function resolveName(name, data) {
    var excl = name.indexOf("!");
    if (excl > -1) name = name.slice(0, excl);

    var opts = data.options;
    var hasExt = /\.js$/.test(name);
    if (hasExt || /^(?:\w+:|\/)/.test(name))
      return name + (hasExt ? "" : ".js");

    var base = opts.baseURL || "";
    if (base && base.charAt(base.length - 1) != "/") base += "/";
    if (opts.paths) {
      var known = opts.paths[name];
      if (known) return flattenPath(base + known + ".js");
      var dir = name.match(/^([^\/]+)(\/.*)$/);
      if (dir) {
        var known = opts.paths[dir[1]];
        if (known) return flattenPath(base + known + dir[2] + ".js");
      }
    }
    return flattenPath(base + name + ".js");
  }

  function getRequire(data) {
    if (!data.require) {
      data.require = new infer.Fn("require", infer.ANull, [infer.cx().str], ["module"], new infer.AVal);
      data.require.computeRet = function(_self, _args, argNodes) {
        if (argNodes.length && argNodes[0].type == "Literal" && typeof argNodes[0].value == "string")
          return getInterface(argNodes[0].value, data);
        return infer.ANull;
      };
    }
    return data.require;
  }

  function getInterface(name, data) {
    if (name == "require") return getRequire(data);
    if (name == "module") return infer.cx().definitions.requirejs.module;

    if (data.options.override && Object.prototype.hasOwnProperty.call(data.options.override, name)) {
      var over = data.options.override[name];
      if (typeof over == "string" && over.charAt(0) == "=") return infer.def.parsePath(over.slice(1));
      if (typeof over == "object") {
        if (data.interfaces[name]) return data.interfaces[name];
        var scope = data.interfaces[name] = new infer.Obj(null, name);
        infer.def.load(over, scope);
        return scope;
      }
      name = over;
    }

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

  // Parse simple ObjectExpression AST nodes to their corresponding JavaScript objects.
  function parseExprNode(node) {
    switch (node.type) {
    case "ArrayExpression":
      return node.elements.map(parseExprNode);
    case "Literal":
      return node.value;
    case "ObjectExpression":
      var obj = {};
      node.properties.forEach(function(prop) {
        var key = prop.key.name || prop.key.value;
        obj[key] = parseExprNode(prop.value);
      });
      return obj;
    }
  }

  infer.registerFunction("requireJSConfig", function(_self, _args, argNodes) {
    var server = infer.cx().parent, data = server && server._requireJS;
    if (data && argNodes && argNodes.length && argNodes[0].type == "ObjectExpression") {
      var config = parseExprNode(argNodes[0]);
      for (var key in config) if (config.hasOwnProperty(key)) {
        var value = config[key], exists = data.options[key];
        if (!exists) {
          data.options[key] = value;
        } else if (key == "paths") {
          for (var path in value) if (value.hasOwnProperty(path) && !data.options.paths[path])
            data.options.paths[path] = value[path];
        }
      }
    }
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
    server.on("reset", function() {
      this._requireJS.interfaces = Object.create(null);
      this._requireJS.require = null;
    });
    return {defs: defs};
  });

  var defs = {
    "!name": "requirejs",
    "!define": {
      module: {
        id: "string",
        uri: "string",
        config: "fn() -> ?",
        exports: "?"
      }
    },
    requirejs: {
      "!type": "fn(deps: [string], callback: fn(), errback: fn()) -> !custom:requireJS",
      onError: "fn(err: +Error)",
      load: "fn(context: ?, moduleName: string, url: string)",
      config: "fn(config: ?) -> !custom:requireJSConfig",
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
