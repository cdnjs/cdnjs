if (typeof exports != "object" || typeof module != "object")
  throw new Error("This plugin works only in a CommonJS environment")

var infer = require("../lib/infer");
var tern = require("../lib/tern");
require("./commonjs");

var path = require("path");
var req = require("enhanced-resolve");
var DirectoryDescriptionFileFieldAliasPlugin = require("enhanced-resolve/lib/DirectoryDescriptionFileFieldAliasPlugin");

var resolver = new req.Resolver(new req.SyncNodeJsInputFileSystem());
resolver.apply(
  new DirectoryDescriptionFileFieldAliasPlugin("package.json", "browser"),
  new req.ModulesInDirectoriesPlugin("node", ["node_modules"]),
  new req.ModuleAsFilePlugin("node"),
  new req.ModuleAsDirectoryPlugin("node"),
  new req.DirectoryDescriptionFilePlugin("package.json", ["main", "browser"]),
  new req.DirectoryDefaultFilePlugin(["index"]),
  new req.FileAppendPlugin(["", ".js"])
);

function resolve(name, parentFile) {
  var resolved = resolveToFile(name, parentFile)
  return resolved && infer.cx().parent.normalizeFilename(resolved)
}

function resolveToFile(name, parentFile) {
  try {
    var projectDir = infer.cx().parent.projectDir;
    var fullParent = path.resolve(projectDir, parentFile);
    return resolver.resolveSync(fullParent, name);
  } catch(e) {
    return '';
  }
}

tern.registerPlugin("webpack", function(server) {
  server.loadPlugin("commonjs")
  server.mod.modules.resolvers.push(resolve)
})
