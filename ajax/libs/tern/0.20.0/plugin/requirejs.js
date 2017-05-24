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
      if (parts[i] == "." || !parts[i]) parts.splice(i--, 1);
      else if (i && parts[i] == "..") { parts.splice(i - 1, 2); i -= 2; }
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
          return getInterface(path.join(path.dirname(data.currentFile), argNodes[0].value), data);
        return infer.ANull;
      };
    }
    return data.require;
  }

  function getModuleInterface(data, exports) {
    var mod = new infer.Obj(infer.cx().definitions.requirejs.module, "module");
    var expProp = mod.defProp("exports");
    expProp.propagate(getModule(data.currentFile, data));
    exports.propagate(expProp, EXPORT_OBJ_WEIGHT);
    return mod;
  }

  function getExports(data) {
    var exports = new infer.Obj(true, "exports");
    getModule(data.currentFile, data).addType(exports, EXPORT_OBJ_WEIGHT);
    return exports;
  }

  function getInterface(name, data) {
    if (data.options.override && Object.prototype.hasOwnProperty.call(data.options.override, name)) {
      var over = data.options.override[name];
      if (typeof over == "string" && over.charAt(0) == "=") return infer.def.parsePath(over.slice(1));
      if (typeof over == "object") {
        var known = getKnownModule(name, data);
        if (known) return known;
        var scope = data.interfaces[stripJSExt(name)] = new infer.Obj(null, stripJSExt(name));
        infer.def.load(over, scope);
        return scope;
      }
      name = over;
    }

    if (!/^(https?:|\/)|\.js$/.test(name))
      name = resolveName(name, data);
    name = flattenPath(name);

    var known = getKnownModule(name, data);

    if (!known) {
      known = getModule(name, data);
      data.server.addFile(name, null, data.currentFile);
    }
    return known;
  }

  function getKnownModule(name, data) {
    return data.interfaces[stripJSExt(name)];
  }

  function getModule(name, data) {
    var known = getKnownModule(name, data);
    if (!known) {
      known = data.interfaces[stripJSExt(name)] = new infer.AVal;
      known.origin = name;
    }
    return known;
  }

  var EXPORT_OBJ_WEIGHT = 50;

  function stripJSExt(f) {
    return f.replace(/\.js$/, '');
  }

  var path = {
    dirname: function(path) {
      var lastSep = path.lastIndexOf("/");
      return lastSep == -1 ? "" : path.slice(0, lastSep);
    },
    relative: function(from, to) {
      if (to.indexOf(from) == 0) return to.slice(from.length);
      else return to;
    },
    join: function(a, b) {
      if (b && b.charAt(0) != ".") return b;
      if (a && b) return a + "/" + b;
      else return (a || "") + (b || "");
    }
  };

  function runModule(server, args, argNodes, out) {
    var data = server.mod.requireJS;
    var deps = [], fn, exports, mod;

    function interf(name) {
      if (name == "require") return getRequire(data);
      if (name == "exports") return exports || (exports = getExports(data));
      if (name == "module") return mod || (mod = getModuleInterface(data, exports || (exports = getExports(data))));
      return getInterface(name, data);
    }

    if (argNodes && args.length > 1) {
      var node = argNodes[args.length == 2 ? 0 : 1];
      var base = path.relative(server.projectDir, path.dirname(node.sourceFile.name));
      if (node.type == "Literal" && typeof node.value == "string") {
        node.required = interf(path.join(base, node.value), data);
        deps.push(node.required);
      } else if (node.type == "ArrayExpression") for (var i = 0; i < node.elements.length; ++i) {
        var elt = node.elements[i];
        if (elt.type == "Literal" && typeof elt.value == "string") {
          elt.required = interf(path.join(base, elt.value), data);
          deps.push(elt.required);
        }
      }
    } else if (argNodes && args.length == 1 &&
               /FunctionExpression/.test(argNodes[0].type) &&
               argNodes[0].params.length) {
      // Simplified CommonJS call
      deps.push(interf("require", data), interf("exports", data), interf("module", data));
      fn = args[0];
    }

    if (!fn) {
      fn = args[Math.min(args.length - 1, 2)];
      if (!fn.isEmpty() && !fn.getFunctionType()) fn = null;
    }

    if (fn) {
      fn.propagate(new infer.IsCallee(infer.ANull, deps, null, out || infer.ANull));
      if (out) out.originNode = fn.originNode;
    } else if (out) {
      args[0].propagate(out)
    }

    return infer.ANull;
  }

  infer.registerFunction("requirejs_define", function(_self, args, argNodes) {
    if (!args.length) return infer.ANull

    var server = infer.cx().parent, data = server.mod.requireJS
    return runModule(server, args, argNodes, getModule(data.currentFile, data))
  });

  infer.registerFunction("requirejs_require", function(_self, args, argNodes) {
    if (!args.length) return infer.ANull
    return runModule(infer.cx().parent, args, argNodes)
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

  infer.registerFunction("requirejs_config", function(_self, _args, argNodes) {
    var server = infer.cx().parent, data = server && server.mod.requireJS;
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

  function preCondenseReach(state) {
    var interfaces = infer.cx().parent.mod.requireJS.interfaces;
    var rjs = state.roots["!requirejs"] = new infer.Obj(null);
    for (var name in interfaces) {
      var prop = rjs.defProp(name.replace(/\./g, "`"));
      interfaces[name].propagate(prop);
      prop.origin = interfaces[name].origin;
    }
  }

  function postLoadDef(data) {
    var cx = infer.cx(), interfaces = cx.definitions[data["!name"]]["!requirejs"];
    var data = cx.parent.mod.requireJS;
    if (interfaces) for (var name in interfaces.props) {
      interfaces.props[name].propagate(getInterface(name, data));
    }
  }

  tern.registerPlugin("requirejs", function(server, options) {
    server.mod.requireJS = {
      interfaces: Object.create(null),
      options: options || {},
      currentFile: null,
      server: server
    };

    server.on("beforeLoad", function(file) {
      this.mod.requireJS.currentFile = file.name;
    });
    server.on("reset", function() {
      this.mod.requireJS.interfaces = Object.create(null);
      this.mod.requireJS.require = null;
    });

    server.on("preCondenseReach", preCondenseReach)
    server.on("postLoadDef", postLoadDef)
    server.on("typeAt", findTypeAt)
    server.on("completion", findCompletions)

    server.addDefs(defs)
  });

  function findTypeAt(_file, _pos, expr, type) {
    if (!expr || expr.node.type != "Literal" ||
        typeof expr.node.value != "string" || !expr.node.required)
      return type;

    // The `type` is a value shared for all string literals.
    // We must create a copy before modifying `origin` and `originNode`.
    // Otherwise all string literals would point to the last jump location
    type = Object.create(type);

    // Provide a custom origin location pointing to the require()d file
    var exportedType = expr.node.required;
    type.origin = exportedType.origin;
    type.originNode = exportedType.originNode;
    if (exportedType.doc) type.doc = exportedType.doc
    if (exportedType.url) type.url = exportedType.url
    return type;
  }

  function findCompletions(file, query) {
    var wordEnd = tern.resolvePos(file, query.end);
    var callExpr = infer.findExpressionAround(file.ast, null, wordEnd, file.scope, "CallExpression");
    if (!callExpr) return;
    var callNode = callExpr.node;
    if (callNode.callee.type != "Identifier" ||
        !(callNode.callee.name == "define" || callNode.callee.name == "require" || callNode.callee.name == "requirejs")||
        callNode.arguments.length < 1 || callNode.arguments[0].type != "ArrayExpression") return;
    var argNode = findRequireModule(callNode.arguments[0].elements, wordEnd);
    if (!argNode) return;
    var word = argNode.raw.slice(1, wordEnd - argNode.start), quote = argNode.raw.charAt(0);
    if (word && word.charAt(word.length - 1) == quote)
      word = word.slice(0, word.length - 1);
    var completions = completeModuleName(query, word, file.name);
    if (argNode.end == wordEnd + 1 && file.text.charAt(wordEnd) == quote)
      ++wordEnd;
    return {
      start: tern.outputPos(query, file, argNode.start),
      end: tern.outputPos(query, file, wordEnd),
      isProperty: false,
      isObjectKey: false,
      completions: completions.map(function(rec) {
        var name = typeof rec == "string" ? rec : rec.name;
        var string = JSON.stringify(name);
        if (quote == "'") string = quote + string.slice(1, string.length -1).replace(/'/g, "\\'") + quote;
        if (typeof rec == "string") return string;
        rec.displayName = name;
        rec.name = string;
        return rec;
      })
    };
  }

  function findRequireModule(argsNode, wordEnd) {
    for (var i = 0; i < argsNode.length; i++) {
      var argNode = argsNode[i];
      if (argNode.type == "Literal" && typeof argNode.value == "string" &&
          argNode.start < wordEnd && argNode.end > wordEnd) return argNode;
    }
  }

  function completeModuleName(query, word, parentFile) {
    var cx = infer.cx(), server = cx.parent, data = server.mod.requireJS;
    var currentName = stripJSExt(parentFile);
    var base = data.options.baseURL || "";
    if (base && base.charAt(base.length - 1) != "/") base += "/";

    if (query.caseInsensitive) word = word.toLowerCase();

    var completions = [], modules = data.interfaces;
    for (var name in modules) {
      if (name == currentName || !modules[name].getType()) continue;

      var moduleName = name.substring(base.length, name.length);
      if (moduleName &&
          !(query.filter !== false && word &&
            (query.caseInsensitive ? moduleName.toLowerCase() : moduleName).indexOf(word) !== 0))
        tern.addCompletion(query, completions, moduleName, modules[name]);
    }
    return completions;
  }

  var defs = {
    "!name": "requirejs",
    "!define": {
      module: {
        id: "string",
        uri: "string",
        config: "fn() -> ?"
      },
      config: {
        "!url": "http://requirejs.org/docs/api.html#config",
        baseUrl: {
          "!type": "string",
          "!doc": "the root path to use for all module lookups",
          "!url": "http://requirejs.org/docs/api.html#config-baseUrl"
        },
        paths: {
          "!type": "?",
          "!doc": "path mappings for module names not found directly under baseUrl. The path settings are assumed to be relative to baseUrl, unless the paths setting starts with a '/' or has a URL protocol in it ('like http:').",
          "!url": "http://requirejs.org/docs/api.html#config-paths"
        },
        shim: {
          "!type": "?",
          "!doc": "Configure the dependencies, exports, and custom initialization for older, traditional 'browser globals' scripts that do not use define() to declare the dependencies and set a module value.",
          "!url": "http://requirejs.org/docs/api.html#config-shim"
        },
        map: {
          "!type": "?",
          "!doc": "For the given module prefix, instead of loading the module with the given ID, substitute a different module ID.",
          "!url": "http://requirejs.org/docs/api.html#config-map"
        },
        config: {
          "!type": "?",
          "!doc": "There is a common need to pass configuration info to a module. That configuration info is usually known as part of the application, and there needs to be a way to pass that down to a module. In RequireJS, that is done with the config option for requirejs.config(). Modules can then read that info by asking for the special dependency 'module' and calling module.config().",
          "!url": "http://requirejs.org/docs/api.html#config-moduleconfig"
        },
        packages: {
          "!type": "?",
          "!doc": "configures loading modules from CommonJS packages. See the packages topic for more information.",
          "!url": "http://requirejs.org/docs/api.html#config-packages"
        },
        nodeIdCompat: {
          "!type": "?",
          "!doc": "Node treats module ID example.js and example the same. By default these are two different IDs in RequireJS. If you end up using modules installed from npm, then you may need to set this config value to true to avoid resolution issues.",
          "!url": "http://requirejs.org/docs/api.html#config-nodeIdCompat"
        },
        waitSeconds: {
          "!type": "number",
          "!doc": "The number of seconds to wait before giving up on loading a script. Setting it to 0 disables the timeout. The default is 7 seconds.",
          "!url": "http://requirejs.org/docs/api.html#config-waitSeconds"
        },
        context: {
          "!type": "number",
          "!doc": "A name to give to a loading context. This allows require.js to load multiple versions of modules in a page, as long as each top-level require call specifies a unique context string. To use it correctly, see the Multiversion Support section.",
          "!url": "http://requirejs.org/docs/api.html#config-context"
        },
        deps: {
          "!type": "?",
          "!doc": "An array of dependencies to load. Useful when require is defined as a config object before require.js is loaded, and you want to specify dependencies to load as soon as require() is defined. Using deps is just like doing a require([]) call, but done as soon as the loader has processed the configuration. It does not block any other require() calls from starting their requests for modules, it is just a way to specify some modules to load asynchronously as part of a config block.",
          "!url": "http://requirejs.org/docs/api.html#config-deps"
        },
        callback: {
          "!type": "fn()",
          "!doc": "A function to execute after deps have been loaded. Useful when require is defined as a config object before require.js is loaded, and you want to specify a function to require after the configuration's deps array has been loaded.",
          "!url": "http://requirejs.org/docs/api.html#config-callback"
        },
        enforceDefine: {
          "!type": "bool",
          "!doc": "If set to true, an error will be thrown if a script loads that does not call define() or have a shim exports string value that can be checked. See Catching load failures in IE for more information.",
          "!url": "http://requirejs.org/docs/api.html#config-enforceDefine"
        },
        xhtml: {
          "!type": "bool",
          "!doc": "If set to true, document.createElementNS() will be used to create script elements.",
          "!url": "http://requirejs.org/docs/api.html#config-xhtml"
        },
        urlArgs: {
          "!type": "string",
          "!doc": "Extra query string arguments appended to URLs that RequireJS uses to fetch resources. Most useful to cache bust when the browser or server is not configured correctly.",
          "!url": "http://requirejs.org/docs/api.html#config-urlArgs"
        },
        scriptType: {
          "!type": "string",
          "!doc": "Specify the value for the type='' attribute used for script tags inserted into the document by RequireJS. Default is 'text/javascript'. To use Firefox's JavaScript 1.8 features, use 'text/javascript;version=1.8'.",
          "!url": "http://requirejs.org/docs/api.html#config-scriptType"
        },
        skipDataMain: {
          "!type": "bool",
          "!doc": "Introduced in RequireJS 2.1.9: If set to true, skips the data-main attribute scanning done to start module loading. Useful if RequireJS is embedded in a utility library that may interact with other RequireJS library on the page, and the embedded version should not do data-main loading.",
          "!url": "http://requirejs.org/docs/api.html#config-skipDataMain"
        }
      },
      RequireJSError: {
        "prototype" : {
          "!proto": "Error.prototype",
          "requireType": {
            "!type": "string",
            "!doc": "A string value with a general classification, like 'timeout', 'nodefine', 'scripterror'.",
            "!url": "http://requirejs.org/docs/api.html#errors"
          },
          "requireModules": {
            "!type": "[string]",
            "!doc": "An array of module names/URLs that timed out.",
            "!url": "http://requirejs.org/docs/api.html#errors"
          }
        }
      }
    },
    requirejs: {
      "!type": "fn(deps: [string], callback: fn(), errback?: fn(err: +RequireJSError)) -> !custom:requirejs_require",
      onError: {
        "!type": "fn(err: +RequireJSError)",
        "!doc": "To detect errors that are not caught by local errbacks, you can override requirejs.onError()",
        "!url": "http://requirejs.org/docs/api.html#requirejsonerror"
      },
      load: {
        "!type": "fn(context: ?, moduleName: string, url: string)"
      },
      config: "fn(config: config) -> !custom:requirejs_config",
      version: "string",
      isBrowser: "bool"
    },
    require: "requirejs",
    define: {
      "!type": "fn(deps: [string], callback: fn()) -> !custom:requirejs_define",
      amd: {
        jQuery: "bool"
      }
    }
  };
});
