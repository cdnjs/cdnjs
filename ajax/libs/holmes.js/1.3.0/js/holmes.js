/**
 * search for dom elements on your page
 * @module holmes
 */
(function(root, factory) {
  'use strict';

  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define([], function() {
      return (root.holmes = factory());
    });
  } else if (typeof exports === 'object') {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    module.exports = factory();
  } else {
    // Browser globals
    root.holmes = factory();
  }
})(this, function() {
  // UMD Definition above, do not remove this line

  // To get to know more about the Universal Module Definition
  // visit: https://github.com/umdjs/umd

  'use strict';

  /**
   * search for dom elements on your page
   * @alias module:holmes
   * @param {Object} options
   * @param {string} [options.input='input[type=search]']
   *   A querySelector to find the input
   * @param {string} options.find
   *   A querySelectorAll rule to find each of the find terms
   * @param {string=} options.placeholder
   *   Text to show when there are no results
   */
  function holmes(options) {
    window.addEventListener('DOMContentLoaded',function(){
      options.parents = options.parents || 0;
      options.input = options.input || 'input[type=search]';
      options.placeholder = options.placeholder || false;
      var search = document.querySelector(options.input);
      var elements = document.querySelectorAll(options.find);

      if (options.placeholder) {
        var placeholder = document.createElement('span');
        placeholder.classList.add('hidden');
        placeholder.textContent = options.placeholder;
        elements[0].parentNode.appendChild(placeholder);
      }

      search.addEventListener('input',function(){
        var found = false;
        for (var i = 0; i < elements.length; i++) {
          var searchString = search.value.toLowerCase();
          if (elements[i].textContent.toLowerCase().indexOf(searchString) === -1) {
            elements[i].classList.add('hidden');
          } else {
            elements[i].classList.remove('hidden');
            found = true;
          }
        };
        if (!found && options.placeholder) {
          placeholder.classList.remove('hidden');
        } else {
          placeholder.classList.add('hidden');
        }
      });
    });
  };

  return holmes;

});
