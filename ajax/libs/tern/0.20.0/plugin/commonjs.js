(function(mod) {
  if (typeof exports == "object" && typeof module == "object") // CommonJS
    return mod(require("../lib/infer"), require("../lib/tern"), require("./modules"))
  if (typeof define == "function" && define.amd) // AMD
    return define(["../lib/infer", "../lib/tern", "./modules"], mod)
  mod(tern, tern)
})(function(infer, tern) {
  "use strict"

  var WG_DEFAULT_EXPORT = 95

  function initScope(scope) {
    var defs = infer.cx().definitions.commonjs
    defs.require.propagate(scope.defProp("require"))
    var module = new infer.Obj(defs.Module.getProp("prototype").getType())
    module.propagate(scope.defProp("module"))
    var exports = new infer.Obj(true)
    module.origin = exports.origin = scope.origin
    module.originNode = exports.originNode = scope.originNode
    exports.propagate(scope.defProp("exports"))
    var moduleExports = scope.exports = module.defProp("exports")
    exports.propagate(moduleExports, WG_DEFAULT_EXPORT)
  }

  infer.registerFunction("require", function(_self, _args, argNodes) {
    if (!argNodes || !argNodes.length || argNodes[0].type != "Literal" || typeof argNodes[0].value != "string")
      return infer.ANull
    var cx = infer.cx(), server = cx.parent
    var currentFile = argNodes[0].sourceFile.name

    var name = argNodes[0].value
    var resolved = server.mod.modules.resolveModule(name, currentFile)
    return resolved
  })

  function isStaticRequire(node) {
    if (node.type != "CallExpression" || node.callee.type != "Identifier" || node.callee.name != "require") return
    var arg = node.arguments[0]
    if (arg && arg.type == "Literal" && typeof arg.value == "string") return arg.value
  }

  function isModuleName(node) {
    if (node.type != "Literal" || typeof node.value != "string") return

    var call = infer.findExpressionAround(node.sourceFile.ast, null, node.end, null,
                                          function(_, n) { return isStaticRequire(n) != null })
    if (call && call.node.arguments[0] == node) return node.value
  }

  function isImport(node) {
    if (node.type != "Identifier") return
    var decl = infer.findExpressionAround(node.sourceFile.ast, null, node.end, null, "VariableDeclarator"), name
    if (!decl || decl.node.id != node) return
    var init = decl.node.init
    if (init && (name = isStaticRequire(init)) != null)
      return {name: name, prop: null}
    if (init && init.type == "MemberExpression" && !init.computed && (name = isStaticRequire(init.object)) != null)
      return {name: name, prop: init.property.name}
  }

  function hasProps(obj) {
    if (obj) for (var _prop in obj) return true
  }

  tern.registerPlugin("commonjs", function(server) {
    server.loadPlugin("modules")
    server.mod.modules.on("wrapScope", initScope)
    server.mod.modules.on("getExports", function(file, mod) {
      var exports = file.scope.exports
      if (exports.types.length > 1 || hasProps(exports.getObjType()))
        exports.propagate(mod)
    })

    server.mod.modules.modNameTests.push(isModuleName)
    server.mod.modules.importTests.push(isImport)
    server.mod.modules.completableTypes.Identifier = true
    server.mod.modules.completableTypes.Literal = true

    server.addDefs(defs)
  })

  var defs = {
    "!name": "commonjs",
    "!define": {
      require: {
        "!type": "fn(id: string) -> !custom:require",
        resolve: {
          "!type": "fn() -> string",
          "!url": "https://nodejs.org/api/globals.html#globals_require_resolve",
          "!doc": "Use the internal require() machinery to look up the location of a module, but rather than loading the module, just return the resolved filename."
        },
        cache: {
          "!url": "https://nodejs.org/api/globals.html#globals_require_cache",
          "!doc": "Modules are cached in this object when they are required. By deleting a key value from this object, the next require will reload the module."
        },
        extensions: {
          "!url": "https://nodejs.org/api/globals.html#globals_require_extensions",
          "!doc": "Instruct require on how to handle certain file extensions."
        },
        "!url": "https://nodejs.org/api/globals.html#globals_require",
        "!doc": "To require modules."
      },
      Module: {
        "!type": "fn()",
        "!url": "https://nodejs.org/api/modules.html",
        "!doc": "Node has a simple module loading system. In Node, files and modules are in one-to-one correspondence.",
        prototype: {
          exports: {
            "!type": "?",
            "!url": "https://nodejs.org/api/modules.html#modules_module_exports",
            "!doc": "The exports object is created by the Module system. Sometimes this is not acceptable, many want their module to be an instance of some class. To do this assign the desired export object to module.exports. For example suppose we were making a module called a.js"
          },
          require: {
            "!type": "require",
            "!url": "https://nodejs.org/api/modules.html#modules_module_require_id",
            "!doc": "The module.require method provides a way to load a module as if require() was called from the original module."
          },
          id: {
            "!type": "string",
            "!url": "https://nodejs.org/api/modules.html#modules_module_id",
            "!doc": "The identifier for the module. Typically this is the fully resolved filename."
          },
          filename: {
            "!type": "string",
            "!url": "https://nodejs.org/api/modules.html#modules_module_filename",
            "!doc": "The fully resolved filename to the module."
          },
          loaded: {
            "!type": "bool",
            "!url": "https://nodejs.org/api/modules.html#modules_module_loaded",
            "!doc": "Whether or not the module is done loading, or is in the process of loading."
          },
          parent: {
            "!type": "+Module",
            "!url": "https://nodejs.org/api/modules.html#modules_module_parent",
            "!doc": "The module that required this one."
          },
          children: {
            "!type": "[+Module]",
            "!url": "https://nodejs.org/api/modules.html#modules_module_children",
            "!doc": "The module objects required by this one."
          }
        }
      },
      module: {}
    },
    module: {
      "!type": "+Module",
      "!url": "https://nodejs.org/api/globals.html#globals_module",
      "!doc": "A reference to the current module. In particular module.exports is the same as the exports object. module isn't actually a global but rather local to each module."
    }
  }
})
