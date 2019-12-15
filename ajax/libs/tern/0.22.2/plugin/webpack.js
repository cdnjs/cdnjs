if (typeof exports != "object" || typeof module != "object")
  throw new Error("This plugin works only in a CommonJS environment")

var infer = require("../lib/infer");
var tern = require("../lib/tern");
require("./commonjs");
require("./es_modules");

function isArray(v) {
  return Object.prototype.toString.call(v) == "[object Array]";
};

var fs = require('fs');
var path = require("path");
var ResolverFactory = require("enhanced-resolve").ResolverFactory;
var SyncNodeJsInputFileSystem = require("enhanced-resolve/lib/SyncNodeJsInputFileSystem");

function getResolver(modules, configPath) {
  var config = {
    unsafeCache: true,
    modules: modules || ["node_modules"],
    extensions: [".js", ".jsx", ".json"],
    aliasFields: ["browser"],
    mainFields: ["browser", "web", "browserify", "main"],
    fileSystem: new SyncNodeJsInputFileSystem()
  }
  var webpackConfig = (configPath && fs.existsSync(configPath)) ? require(configPath) : null
  if (typeof webpackConfig === 'function') {
    webpackConfig = webpackConfig()
  }
  var resolveConfig = webpackConfig && webpackConfig.resolve
  if (resolveConfig) {
    Object.keys(resolveConfig).forEach(function (key) {
      if (key === 'packageMains') {
        config.mainFields = resolveConfig[key]
      } else if (key === 'root') {
        var roots = resolveConfig[key]
        if (isArray(roots)) {
          config.modules = roots.concat(config.modules)
        } else {
          config.modules.unshift(roots)
        }
      } else if (key === 'fallback') {
        var fallback = resolveConfig[key]
        if (isArray(fallback)) {
          config.modules = config.modules.concat(fallback)
        } else {
          config.modules.push(fallback)
        }
      } else if (key === 'modules') {
        config.modules = config.modules.concat(resolveConfig[key])
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
  var modules = options.modules || ['node_modules']
  configPath = path.resolve(server.options.projectDir, configPath)
  var resolver = getResolver(modules, configPath)
  server.loadPlugin("commonjs")
  server.loadPlugin("es_modules")
  server.mod.modules.resolvers.push(function (name, parentFile) {
    var resolved = resolveToFile(resolver, name, parentFile)
    return resolved && infer.cx().parent.normalizeFilename(resolved)
  })
})
