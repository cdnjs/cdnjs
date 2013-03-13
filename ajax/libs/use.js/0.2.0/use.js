/* RequireJS Use Plugin v0.2.0
 * Copyright 2012, Tim Branyen (@tbranyen)
 * use.js may be freely distributed under the MIT license.
 */
(function() {

// Cache used to map configuration options between load and write.
var buildMap = {};

define({
  version: "0.2.0",

  // Invoked by the AMD builder, passed the path to resolve, the require
  // function, done callback, and the configuration options.
  load: function(name, req, load, config) {
    // Dojo provides access to the config object through the req function.
    if (!config) {
      config = require.rawConfig;
    }

    var module = config.use && config.use[name];

    // No module to load, throw.
    if (!module) {
      throw new TypeError("Module '" + name + "' is undefined or does not" +
        " have a `use` config. Make sure it exists, add a `use` config, or" +
        " don't use use! on it");
    }

    // Attach to the build map for use in the write method below.
    buildMap[name] = { deps: module.deps || [], attach: module.attach };

    // Read the current module configuration for any dependencies that are
    // required to run this particular non-AMD module.
    req(module.deps || [], function() {
      var depArgs = arguments;
      // Require this module
      req([name], function() {
        // Attach property
        var attach = module.attach;

        // If doing a build don't care about loading
        if (config.isBuild) { 
          return load();
        }

        // Return the correct attached object
        if (typeof attach === "function") {
          return load(attach.apply(window, depArgs));
        }

        // Use window for now (maybe this?)
        return load(window[attach]);
      });
    });
  },

  // Also invoked by the AMD builder, this writes out a compatible define
  // call that will work with loaders such as almond.js that cannot read
  // the configuration data.
  write: function(pluginName, moduleName, write) {
    var module = buildMap[moduleName];
    var deps = module.deps;
    var normalize = { attach: null, deps: "" };

    // Normalize the attach to window[name] or function() { }
    if (typeof attach === "function") {
      normalize.attach = "return " + module.attach.toString() + ";";
    } else {
      normalize.attach = "return window['" + module.attach + "'];";
    }

    // Normalize the dependencies to have proper string characters
    if (deps.length) {
      normalize.deps = "'" + deps.toString().split(",").join("','") + "'";
    }

    // Write out the actual definition
    write([
      "define('", pluginName, "!", moduleName, "', ",
        "[", normalize.deps, "],",

        "function() {",
          normalize.attach,
        "}",

      ");\n"
    ].join(""));
  }
});

})();
