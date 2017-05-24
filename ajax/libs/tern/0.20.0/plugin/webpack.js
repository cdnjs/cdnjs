if (typeof exports != "object" || typeof module != "object")
  throw new Error("This plugin works only in a CommonJS environment")

var infer = require("../lib/infer");
var tern = require("../lib/tern");
require("./commonjs");
require("./es_modules");

var fs = require('fs');
var path = require("path");
var ResolverFactory = require("enhanced-resolve").ResolverFactory;
var SyncNodeJsInputFileSystem = require("enhanced-resolve/lib/SyncNodeJsInputFileSystem");

function getResolver(configPath) {
  var config = {
    unsafeCache: true,
    modules: ["node_modules"],
    extensions: [".js", ".jsx", ".json"],
    aliasFields: ["browser"],
    mainFields: ["browser", "web", "browserify", "main"],
    fileSystem: new SyncNodeJsInputFileSystem()
  }
  var resolveConfig = fs.existsSync(configPath) ? require(configPath).resolve : null
  if (resolveConfig) {
    Object.keys(resolveConfig).forEach(function (key) {
      if (key === 'packageMains') {
        config.mainFields = resolveConfig[key]
      } else if (key === 'root') {
        config.modules.unshift(resolveConfig[key])
      } else {
        config[key] = resolveConfig[key]
      }
    })
  }

  return ResolverFactory.createResolver(config);
}

function resolveToFile(resolver, name, parentFile) {
    var projectDir = infer.cx().parent.projectDir;
    var fullParent = path.resolve(projectDir, parentFile);
    try {
      return resolver.resolveSync({}, path.dirname(fullParent), name);
    } catch(e) {
      console.log(e.stack)
      return ''
    }
}

tern.registerPlugin("webpack", function(server, options) {
  var configPath = options.configPath || './webpack.config.js'
  configPath = path.resolve(server.options.projectDir, configPath)
  var resolver = getResolver(configPath)
  server.loadPlugin("commonjs")
  server.loadPlugin("es_modules")
  server.mod.modules.resolvers.push(function (name, parentFile) {
    var resolved = resolveToFile(resolver, name, parentFile)
    return resolved && infer.cx().parent.normalizeFilename(resolved)
  })
})
