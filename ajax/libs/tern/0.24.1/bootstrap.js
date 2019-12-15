var tern = require("./tern");
var fs = require("fs"), path = require("path"), url = require("url");
var glob = require("glob"), minimatch = require("minimatch");
var resolveFrom = require("resolve-from");

var projectFileName = ".tern-project", portFileName = ".tern-port";

function findProjectDir() {
  var dir = process.cwd();
  for (;;) {
    try {
      if (fs.statSync(path.resolve(dir, projectFileName)).isFile()) return dir;
    } catch(e) {}
    var shorter = path.dirname(dir);
    if (shorter == dir) return null;
    dir = shorter;
  }
}

var defaultConfig = {
  libs: [],
  loadEagerly: false,
  plugins: {doc_comment: true},
  ecmaScript: true,
  ecmaVersion: 9,
  dependencyBudget: tern.defaultOptions.dependencyBudget
};
var homeDir = process.env.HOME || process.env.USERPROFILE;
if (homeDir && fs.existsSync(path.resolve(homeDir, ".tern-config")))
  defaultConfig = readProjectFile(path.resolve(homeDir, ".tern-config"));

function readJSON(fileName) {
  var file = fs.readFileSync(fileName, "utf8");
  try {
    return JSON.parse(file);
  } catch (e) {
    console.error("Bad JSON in " + fileName + ": " + e.message);
    process.exit(1);
  }
}

function readProjectFile(fileName) {
  var data = readJSON(fileName), name;
  for (var option in defaultConfig) {
    if (!data.hasOwnProperty(option))
      data[option] = defaultConfig[option];
    else if (option == "plugins")
      for (name in defaultConfig.plugins)
        if (!Object.prototype.hasOwnProperty.call(data.plugins, name))
          data.plugins[name] = defaultConfig.plugins[name];
  }
  return data;
}

function findFile(file, projectDir, fallbackDir, options) {
  var local = path.resolve(projectDir, file);
  if (!options.disableLoadingLocal && fs.existsSync(local)) return local;
  var shared = path.resolve(fallbackDir, file);
  if (fs.existsSync(shared)) return shared;
}

var distDir = path.resolve(__dirname, "..");

function findDefs(projectDir, config, options) {
  var defs = [], src = config.libs.slice();
  if (config.ecmaScript && src.indexOf("ecmascript") == -1)
    src.unshift("ecmascript");
  for (var i = 0; i < src.length; ++i) {
    var file = src[i];
    if (!/\.json$/.test(file)) file = file + ".json";
    var found = findFile(file, projectDir, path.resolve(distDir, "defs"), options)
        || resolveFrom(projectDir, "tern-" + src[i]);
    if (!found) {
      try {
        found = require.resolve("tern-" + src[i]);
      } catch (e) {
        process.stderr.write("Failed to find library " + src[i] + ".\n");
        continue;
      }
    }
    if (found) defs.push(readJSON(found));
  }
  return defs;
}

function loadPlugins(projectDir, config, options) {
  var plugins = config.plugins, options = {};
  for (var plugin in plugins) {
    var val = plugins[plugin];
    if (!val) continue;
    var found = findFile(plugin + ".js", projectDir, path.resolve(distDir, "plugin"), options)
        || resolveFrom(projectDir, "tern-" + plugin);
    if (!found) {
      try {
        found = require.resolve("tern-" + plugin);
      } catch (e) {
        process.stderr.write("Failed to find plugin " + plugin + ".\n");
        continue;
      }
    }
    var mod = require(found);
    if (mod.hasOwnProperty("initialize")) mod.initialize(distDir);
    options[path.basename(plugin)] = val;
  }

  return options;
}

function startServer(dir, config, options) {
  var defs = findDefs(dir, config, options);
  var plugins = loadPlugins(dir, config, options);
  var ternConfig = {
    getFile: function(name, c) {
      if (config.dontLoad && config.dontLoad.some(function(pat) {return minimatch(name, pat)}))
        c(null, "");
      else
        fs.readFile(path.resolve(dir, name), "utf8", c);
    },
    normalizeFilename: function(name) {
      var pt = path.resolve(dir, name);
      try { pt = fs.realPathSync(path.resolve(dir, name), true) }
      catch(e) {}
      return path.relative(dir, pt);
    },
    async: true,
    defs: defs,
    plugins: plugins,
    projectDir: dir,
    ecmaVersion: config.ecmaVersion,
    dependencyBudget: config.dependencyBudget,
  };
  if (options.tern) {
    for (var option in options.tern) {
      if (options.tern.hasOwnProperty(option)) {
        ternConfig[option] = options.tern[option];
      }
    }
  }
  var server = new tern.Server(ternConfig);

  if (config.loadEagerly) config.loadEagerly.forEach(function(pat) {
    glob.sync(pat, { cwd: dir }).forEach(function(file) {
      server.addFile(file);
    });
  });
  server.flush(function(){});
  return server;
}

module.exports = function bootstrapServer(options) {
  var projectDir = options.projectDir;
  if (!projectDir) {
    projectDir = findProjectDir();
  }

  if (projectDir) {
    var config = readProjectFile(path.resolve(projectDir, projectFileName));
  } else {
    projectDir = process.cwd();
    var config = defaultConfig;
  }
  return startServer(projectDir, config, options);
}
