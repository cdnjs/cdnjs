(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.micromustache = f()}})(function(){var define,module,exports;module={exports:(exports={})};
/**
 * @callback GeneralValueFn
 *
 * @param {string} key - variable name before being parsed.
 *        For example: {a.b.c} ->  'a.b.c', {  x  } -> 'x'
 * @returns {string|number|boolean|Object|undefined} the value to be
 *        interpolated. If the function returns undefined, the value resolution
 *        algorithm will go ahead with the default behaviour (resolving the
 *        variable name from the provided object).
 */

 /**
 * @callback ValueFn
 *
 * @param {string} key - variable name for the current scope.
 *        For hierarchical names like {{a.b.c}} the key can be 'a' or 'b' or 'c'
 * @param {Object} currentScope - the current object that the variable is
 *        supposed to resolved from
 * @param {string[]} path - useful for hierarchical objects.
 *        for example a variable name like {{a.b.c}} sets the
 *        path to ['a', 'b', 'c']
 * @param {number} currentPointer - the array index to where in the path we are
 *        at the moment. This is usually path.length - 1
 * @returns {string|number|boolean|Object} the value to be interpolated
 */

/**
 * Replaces every {{variable}} inside the template with values provided by view
 * If the value is a function, call it passing the name of the variable as the
 * only argument.
 *
 * @param {string} template - the template containing one or
 *        more {{variableNames}}
 * @param {Object} [view={}] - an optional object containing values for
 *        every variable names that is used in the template. If it's omitted,
 *        it'll be assumed an empty object.
 * @param {GeneralValueFn} [generalValueFn] - an optional function that will be
 *        called for every key to generate a value. If the result is undefined
 *        we'll proceed with the default value resolution algorithm.
 *        This function runs in the context of view.
 * @returns {string} - template where its variable names replaced with
 *        corresponding values. If a value is not found or is invalid, it will
 *        be assumed empty string ''. If the value is an object itself, it'll
 *        be stringified by JSON.
 *        In case of a JSON error the result will look like "{...}".
 */
function render (template, view, generalValueFn) {
  //don't touch the template if it is not a string
  if (typeof template !== 'string') {
    return template;
  }

  // if view is omitted but generalValueFn is set
  if (typeof view === 'function' && typeof generalValueFn === 'undefined') {
    generalValueFn = view;
  }

  //if view is not a valid object, assume it is an empty object
  //which effectively removes all variable interpolations
  if (typeof view !== 'object' || view === null) {
    view = {};
  }

  return template.replace(/\{\{\s*(.*?)\s*\}\}/g, function (match, varName) {
    if (generalValueFn) {
      var generalValueFnResult = generalValueFn(view, varName);
      if (typeof generalValueFnResult !== 'undefined') {
        return valueFnResultToString(generalValueFnResult);
      }
    }

    var path = varName.split('.');

    function resolve (currentScope, pathIndex) {
      if (currentScope === null) {
        return '';
      }

      var key = path[pathIndex];
      var value = currentScope[key];
      var typeofValue = typeof value;

      if (typeofValue === 'function') {
        //if the value is a function, call it passing the variable name
        return valueFnResultToString(
          value.call(view, key, currentScope, path, pathIndex)
        );
      } else if (typeofValue === 'object') {
        pathIndex++;
        // If it's a leaf and still an object, just stringify it
        return pathIndex < path.length ?
          resolve(value, pathIndex) :
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
 * It doesn't make the code faster since the compiler still uses render
 * internally.
 *
 * @param {string} template - same as the template parameter to .render()
 * @param {GeneralValueFn} [generalValueFn] - same as the parameter to .render()
 * @returns {function} - a function that accepts a view object and returns a
 *        rendered template string template
 */
function compile (template, generalValueFn) {
  // Create and return a function that will always apply this template
  // and generalValueFn under the hood
  return function compiler (view) {
    return render (template, view, generalValueFn);
  };
}

function valueFnResultToString (value) {
  switch (typeof value) {
    case 'string':
    case 'number':
    case 'boolean':
      return value;
    case 'object':
      // null is an object but is falsy. Swallow null
      if (value === null) {
        return '';
      } else {
        // Convert the object to json without throwing
        try {
          return JSON.stringify(value);
        } catch (jsonError) {
          return '{...}';
        }
      }
      return value ? toJsonPolitely(value) : '';
    default:
      // Anything else will be replaced with an empty string
      // For example: undefined, Symbol, etc.
      return '';
  }
}

exports.to_html = exports.render = render;
exports.compile = compile;

return module.exports;});
