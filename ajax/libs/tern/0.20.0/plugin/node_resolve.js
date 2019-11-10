(function(mod) {
  if (typeof exports == "object" && typeof module == "object") // CommonJS
    return mod(require("../lib/infer"), require("../lib/tern"), require("./commonjs"), require)
  if (typeof define == "function" && define.amd) // AMD
    return define(["../lib/infer", "../lib/tern", "./commonjs"], mod)
  mod(tern, tern)
})(function(infer, tern, _, require) {
  "use strict"

  function resolve(name, parentFile) {
    var resolved = resolveToFile(name, parentFile)
    return resolved && infer.cx().parent.normalizeFilename(resolved)
  }

  function findDeclaredDeps() {}

  var resolveToFile
  if (require) (function() {
    var module_ = require("module"), path = require("path"), fs = require("fs")

    resolveToFile = function(name, parentFile) {
      var projectDir = infer.cx().parent.projectDir
      var fullParent = path.resolve(projectDir, parentFile)
      var parentDir = path.dirname(fullParent)
      if (/^\.\.?\//.test(name))
        name = path.resolve(projectDir, parentDir, name)

      var parentModule = {
        id: fullParent,
        paths: module_._nodeModulePaths(parentDir).concat(module_.globalPaths)
      }
      try {
        return module_._resolveFilename(name, parentModule)
      } catch(e) {
        return null
      }
    }

    function findPackageFile(dir) {
      for (;;) {
        try {
          return JSON.parse(fs.readFileSync(path.resolve(dir, "package.json")))
        } catch(e) {}
        var shorter = path.dirname(dir)
        if (shorter == dir) return null
        dir = shorter
      }
    }

    findDeclaredDeps = function(path, knownModules) {
      var packageFile = findPackageFile(path)
      if (!packageFile) return null

      function add(obj) {
        for (var name in obj) if (!(name in knownModules)) knownModules[name] = null
      }
      add(packageFile.dependencies)
      add(packageFile.devDependencies)
      add(packageFile.peerDependencies)
    }

  })(); else (function() {
    function resolvePath(base, path) {
      if (path[0] == "/") return path;
      var slash = base.lastIndexOf("/"), m;
      if (slash >= 0) path = base.slice(0, slash + 1) + path;
      while (m = /[^\/]*[^\/\.][^\/]*\/\.\.\//.exec(path))
        path = path.slice(0, m.index) + path.slice(m.index + m[0].length);
      return path.replace(/(^|[^\.])\.\//g, "$1");
    }

    resolveToFile = function(name, parentFile) {
      return /^\.\.?\//.test(name) ? resolvePath(parentFile, name) : name
    }
  })()

  tern.registerPlugin("node_resolve", function(server) {
    server.loadPlugin("commonjs")
    server.mod.modules.resolvers.push(resolve)
    findDeclaredDeps(server.projectDir, server.mod.modules.knownModules)
  })
})
