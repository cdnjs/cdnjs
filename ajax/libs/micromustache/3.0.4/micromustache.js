(function(f) {
  if (typeof exports === "object" && typeof module !== "undefined") {
    module.exports = f()
  } else if (typeof define === "function" && define.amd) {
    define([], f)
  } else {
    var g;
    if (typeof window !== "undefined") {
      g = window
    } else if (typeof global !== "undefined") {
      g = global
    } else if (typeof self !== "undefined") {
      g = self
    } else {
      g = this
    }
    g.micromustache = f()
  }
})(function() {
  var define, module, exports;
  module = {
    exports: (exports = {})
  };
  /**
   * Replaces every {{variable}} inside the template with values provided by view
   * If the value is a function, call it passing the name of the variable as the only argument.
   *
   * @param template {string} the template containing one or more {{variableNames}}
   * @param [view={}] {object} an optional object containing values for every variable names
   *        that is used in the template
   * @return {string} template where its variable names replaced with corresponding values.
   *        If a value is not found or is invalid, it will be assumed empty string ''.
   *        If the value is an object itself, it'll be stringified by JSON. In case of a JSON error the result will look like "{JSON_ERROR: ... }".
   */
  function render(template, view) {
    //don't touch the template if it is not a string
    if (typeof template !== 'string') {
      return template;
    }
    //if view is not a valid object, assume it is an empty object
    //which effectively removes all variable interpolations
    if (typeof view !== 'object' || view === null) {
      view = {};
    }
    return template.replace(/\{\{\s*(.*?)\s*\}\}/g, function(match, varName) {
      var path = varName.split('.');

      function resolve(currentScope, pathIndex) {
        if (currentScope === null) {
          return '';
        }
        var key = path[pathIndex];
        var value = currentScope[key];
        var typeofValue = typeof value;
        if (typeofValue === 'function') {
          //if the value is a function, call it passing the variable name
          return valueFnResultToString(value.call(view, key, currentScope,
            path, pathIndex));
        } else if (typeofValue === 'object') {
          pathIndex++;
          // If it's a leaf and still an object, just stringify it
          return pathIndex < path.length ? resolve(value, pathIndex) :
            valueFnResultToString(value);
        } else {
          return valueFnResultToString(value);
        }
      }

      return resolve(view, 0);
    });
  }

  /**
   * This function makes repeated calls shorter by returning a compiler function
   * for a particular template that accepts data and returnes the rendered string.
   * It doesn't make the code faster since the compiler still uses render internally.
   *
   * @param template {string} same as the template parameter to render()
   * @return compiler(view) {function} a function that accepts a view and returns a rendered template
   */
  function compile(template) {
    //create and return a function that will always apply this template under the hood
    return function compiler(view) {
      return render(template, view);
    };
  }

  function valueFnResultToString(value) {
    switch (typeof value) {
      case 'string':
      case 'number':
      case 'boolean':
        return value;
      case 'object':
        // null is an object but is falsy. Swallow null
        return value ? toJsonPolitely(value) : '';
      default:
        // Anything else will be replaced with an empty string
        // For example: undefined, date, regexp, etc).
        return '';
    }
  }

  // Converts an object to json without throwing
  function toJsonPolitely(obj) {
    try {
      return JSON.stringify(obj);
    } catch (jsonError) {
      return '{...}';
    }
  }

  exports.to_html = exports.render = render;
  exports.compile = compile;

  return module.exports;
});
