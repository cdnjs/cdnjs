(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.micromustache = f()}})(function(){var define,module,exports;module={exports:(exports={})};
/**
* Replaces every {{variable}} inside the template with values provided by view
* If the value is a function, call it passing the name of the variable as the only argument.
* @param template {string} the template containing one or more {{key}}
* @param view {object} an object containing string (or number) values for every key that is used in the template
* @return {string} template with its valid variable names replaced with corresponding values
*/
function render (template, view) {
  //don't touch the template if it is not a string
  if (typeof template !== 'string') {
      return template;
  }
  //if view is not a valid object, assume it is an empty object which effectively removes all variable assignments
  if (typeof view !== 'object' || view === null) {
      view = {};
  }
  return template.replace(/\{?\{\{\s*(.*?)\s*\}\}\}?/g, function (match, varName) {
      var value = view[varName];
      switch (typeof value) {
          case 'string':
          case 'number':
          case 'boolean':
              return value;
          case 'function':
              //if the value is a function, call it passing the variable name
              return value(varName);
          default:
              //anything else will be replaced with an empty string. This includes object, array, date, regexp and null.
              return '';
      }
  });
}

/**
 * This function really doesn't make things particularly faster.
 * However it makes the repeated calls shorter!
 * @param template {string} the template containing one or more {{key}}
 * @return {function} a function that calls render(template, view) under the hood
 */
function compile (template) {
    //create and return a function that will always apply this template under the hood
    return function (view) {
        return render(template, view);
    };
}

exports.render = render;
exports.to_html = render;
exports.compile =compile;

return module.exports;});
