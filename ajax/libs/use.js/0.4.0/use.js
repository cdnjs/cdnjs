/* Use AMD Plugin v0.4.0
 * Copyright 2013, Tim Branyen (@tbranyen)
 * use.js may be freely distributed under the MIT license.
 */
(function(global) {

// Cache used to map configuration options between load and write.
var buildMap = {};

define({
  version: "0.4.0",

  // Invoked by the AMD builder, passed the path to resolve, the require
  // function, done callback, and the configuration options.
  load: function(name, req, load, config) {
    // Dojo provides access to the config object through the req function.
    if (!config) {
      config = require.rawConfig;
    }

    // Configuration is namespaced under use object.
    var module = config.use && config.use[name];

    // No module to load, throw.
    if (!module) {
      throw new TypeError("Module '" + name + "' is undefined or does not" +
        " have a `use` config. Make sure it exists, add a `use` config, or" +
        " don't use use! on it");
    }

    // Attach to the build map for use in the write method below.
    var settings = buildMap[name] = {
      deps: module.deps || [],
      attach: module.attach || module.exports || module.init
    };

    // Determine if shim parity is necessary to handle passed dependency array.
    // Browsers that don't support Array.isArray do not have my sympathy.
    if (Array.isArray ? Array.isArray(module) : module.length) {
      settings.deps = module;
      settings.attach = undefined;
    }

    // Read the current module configuration for any dependencies that are
    // required to run this particular non-AMD module.
    req(settings.deps || [], function() {
      var depArgs = arguments;

      // Utilize the `js!` plugin within Curl to load the source file.  It's
      // not recommended that this is used, but it's built in and accessible.
      if (global.curl) {
        name = "js!" + name;
      }

      // Require this module
      req([name], function() {
        // Attach property
        var attach = settings.attach;

        // If doing a build don't care about loading
        if (config.isBuild) { 
          return load();
        }

        // Return the correct attached object
        if (typeof attach === "function") {
          return load(attach.apply(global, depArgs));
        }

        // Use global for now (maybe this?)
        return load(global[attach]);
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
	
    // Normalize the attach to global[name] or function() { }
    if (typeof module.attach === "function") {
      normalize.attach = module.attach.toString();
    } else {
      normalize.attach = [
        "function() {",
          "return typeof ", String(module.attach),
            " !== \"undefined\" ? ", String(module.attach), " : void 0;",
        "}"
      ].join("");
    }

    // Normalize the dependencies to have proper string characters
    if (deps.length) {
      normalize.deps = "'" + deps.toString().split(",").join("','") + "'";
    }

    // Write out the actual definition
    write([
      "define('", pluginName, "!", moduleName, "', ",
        "[", normalize.deps, "], ", normalize.attach,
      ");\n"
    ].join(""));
  }
});

})(this);
