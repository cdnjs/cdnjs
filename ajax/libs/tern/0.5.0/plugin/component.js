(function(mod) {
  if (typeof exports == "object" && typeof module == "object") // CommonJS
    return mod(require("../lib/infer"), require("../lib/tern"), require);
  if (typeof define == "function" && define.amd) // AMD
    return define(["../lib/infer", "../lib/tern"], mod);
  mod(tern, tern);
})(function(infer, tern, require) {
  "use strict";

  function resolvePath(base, path) {
    var slash = base.lastIndexOf("/");
    var m;

    if (slash >= 0) path = base.slice(0, slash + 1) + path;
    while (m = /[^\/]*[^\/\.][^\/]*\/\.\.\//.exec(path))
      path = path.slice(0, m.index) + path.slice(m.index + m[0].length);

    return path.replace(/(^|[^\.])\.\//g, "$1");
  }

  function resolveModule(server, name) {
    server.addFile(name);
    return getModule(server._component, name);
  }

  function getModule(data, name) {
    return data.modules[name] || (data.modules[name] = new infer.AVal);
  }

  function exportsFromScope(scope) {
    var mType = scope.getProp("module").getType();
    var exportsVal = mType && mType.getProp("exports");

    if (!(exportsVal instanceof infer.AVal) || exportsVal.isEmpty())
      return scope.getProp("exports");
    else
      return exportsVal.types[exportsVal.types.length - 1];
  }

  function buildWrappingScope(parent, origin, node) {
    var scope = new infer.Scope(parent);
    var cx = infer.cx();
    scope.node = node;
    cx.definitions.component.require.propagate(scope.defProp("require"));

    var type = cx.definitions.component.Module.getProp("prototype").getType();
    var module = new infer.Obj(type);
    module.propagate(scope.defProp("module"));

    var exports = new infer.Obj(true, "exports", origin);
    exports.propagate(scope.defProp("exports"));
    exports.propagate(module.defProp("exports"));

    return scope;
  }

  // Assume node.js & access to local file system
  if (require) (function() {
    var fs = require("fs");
    var path = require("path");

    var win = /win/.test(process.platform);
    var resolve = path.resolve;

    if (win) resolve = function(base, file) {
      return path.resolve(base, file).replace(/\\/g, "/");
    };

    resolveModule = function(server, name, relative) {
      var data = server._component;
      var dir = server.options.projectDir || "";
      var file = name;

      if (data.options.dontLoad == true)
        return infer.ANull;

      if (data.options.dontLoad && new RegExp(data.options.dontLoad).test(name))
        return infer.ANull;

      if (data.options.load && !new RegExp(data.options.load).test(name))
        return infer.ANull;

      if (!relative) {
        try {
          var cmp = JSON.parse(fs.readFileSync(resolve(dir, "component.json")));
          if(!cmp.dependencies) return infer.ANull;
          var dpx = new RegExp("(.*?)\/" + name, 'i');
          var dep = Object.keys(cmp.dependencies).filter(function(dependency) {
            return dpx.test(dependency);
          }).pop();
          var author = dep.match(/(.*?)\/.*?/i).shift();
          author =  author.substring(0, author.length - 1);
          file = resolve(dir, "components/" + author + "-" + name);
        } catch(e) {}
      }

      try {
        var pkg = JSON.parse(fs.readFileSync(resolve(modDir, file + "/component.json")));
      } catch(e) {}

      if (pkg && pkg.main) {
        file += "/" + pkg.main;
      } else {
        try {
          if (fs.statSync(resolve(dir, file)).isDirectory())
            file += "/index.js";
        } catch(e) {}
      }

      if (!/\.js$/.test(file)) file += ".js";

      try {
        if (!fs.statSync(resolve(dir, file)).isFile()) return infer.ANull;
      } catch(e) { return infer.ANull; }

      server.addFile(file);
      return data.modules[file] = data.modules[name] = new infer.AVal;
    };
  })();

  tern.registerPlugin("component", function(server, options) {
    server._component = {
      modules: Object.create(null),
      options: options || {},
      currentFile: null,
      server: server
    };

    server.on("beforeLoad", function(file) {
      this._component.currentFile = file.name.replace(/\\/g, "/");
      file.scope = buildWrappingScope(file.scope, file.name, file.ast);
    });

    server.on("afterLoad", function(file) {
      this._component.currentFile = null;
      exportsFromScope(file.scope).propagate(getModule(this._component, file.name));
    });

    server.on("reset", function() {
      this._component.modules = Object.create(null);
    });

    return {defs: defs};
  });

  infer.registerFunction("componentRequire", function(_self, _args, argNodes) {
    if (!argNodes || !argNodes.length || argNodes[0].type != "Literal" || typeof argNodes[0].value != "string")
      return infer.ANull;

    var cx = infer.cx();
    var server = cx.parent;
    var data = server._component;
    var name = argNodes[0].value;

    var locals = cx.definitions.component;
    if (locals[name] && /^[a-z_]*$/.test(name)) return locals[name];

    var relative = /^\.{0,2}\//.test(name);
    if (relative) {
      if (!data.currentFile) return argNodes[0].required || infer.ANull;
      name = resolvePath(data.currentFile, name);
    }

    if (name in data.modules) return data.modules[name];

    var result;
    if (data.options.modules && data.options.modules.hasOwnProperty(name)) {
      var scope = buildWrappingScope(cx.topScope, name);
      infer.def.load(data.options.modules[name], scope);
      result = data.modules[name] = exportsFromScope(scope);
    } else {
      result = resolveModule(server, name, relative);
    }

    return argNodes[0].required = result;
  });

  var defs = {
    "!name": "component",
    "!define": {
      require: {
        "!type": "fn(id: string) -> !custom:componentRequire",
        "!doc": "Require the given path/module",
        modules: {
          "!doc": "Registered modules"
        },
        aliases: {
          "!doc": "Registered aliases"
        },
        resolve: {
          "!type": "fn(path: string) -> string",
          "!doc": "Resolve path"
        },
        normalize: {
          "!type": "fn(curr: string, path: string) -> string",
          "!doc": "Normalize `path` relative to the current path"
        },
        register: {
          "!type": "fn(path: string, definition: fn())",
          "!doc": "Register module at `path` with callback `definition`"
        },
        alias: {
          "!type": "fn(from: string, to: string)",
          "!doc": "Alias a module definition"
        },
        relative: {
          "!type": "fn(parent: string) -> fn()",
          "!doc": "Return a require function relative to the `parent` path"
        }
      },
      Module: {
        "!type": "fn()",
        prototype: {
          exports: {
            "!type": "?",
            "!doc": "The exports object is created by the Module system. Sometimes this is not acceptable, many want their module to be an instance of some class. To do this assign the desired export object to module.exports. For example suppose we were making a module called a.js"
          },
          require: {
            "!type": "require",
            "!doc": "The module.require method provides a way to load a module as if require() was called from the original module."
          },
          id: {
            "!type": "string",
            "!doc": "The identifier for the module. Typically this is the fully resolved filename."
          },
          filename: {
            "!type": "string",
            "!doc": "The fully resolved filename to the module."
          },
          loaded: {
            "!type": "bool",
            "!doc": "Whether or not the module is done loading, or is in the process of loading."
          },
          parent: {
            "!type": "+Module",
            "!doc": "The module that required this one."
          },
          children: {
            "!type": "[+Module]",
            "!doc": "The module objects required by this one."
          }
        }
      }
    }
  };
});
