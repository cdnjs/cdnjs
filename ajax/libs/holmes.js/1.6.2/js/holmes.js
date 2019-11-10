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
   * @param {string} [options.input='input[type=search]']
   *   A querySelector to find the input
   * @param {string} options.find
   *   A querySelectorAll rule to find each of the find terms
   * @param {string=} options.placeholder
   *   Text to show when there are no results (innerHTML)
   * @param {string} [options.class.visible=false]
   *   class to add to matched items
   * @param {string} [options.class.hidden='hidden']
   *   class to add to non-matched items
   */
  function holmes(options) {
    window.addEventListener('DOMContentLoaded', function() {
      // setting default values
      if (typeof options.input == 'undefined') {
        options.input = 'input[type=search]'
      }
      if (typeof options.placeholder == 'undefined') {
        options.placeholder = false;
      }
      if (typeof options.class == 'undefined') {
        options.class = {};
      }
      if (typeof options.class.visible == 'undefined') {
        options.class.visible = false;
      }
      if (typeof options.class.hidden == 'undefined') {
        options.class.hidden = 'hidden';
      }

      // find the search and the elements
      // in case you would support dynamic content, the elements qs needs to be moved
      var search = document.querySelector(options.input);
      var elements = document.querySelectorAll(options.find);

      // create a container for a placeholder
      if (options.placeholder) {
        var placeholder = document.createElement('div');
        placeholder.classList.add(options.class.hidden);
        placeholder.innerHTML = options.placeholder;
        elements[0].parentNode.appendChild(placeholder);
      }

      // if a visible class is given, give it to everything
      if (options.class.visible) {
        for (var i = 0; i < elements.length; i++) {
          elements[i].classList.add(options.class.visible);
        }
      }

      // listen for input
      search.addEventListener('input', function() {

        // by default the value isn't found
        var found = false;

        // search in lowercase
        var searchString = search.value.toLowerCase();

        // loop over all the elements
        // in case this should become dynamic, query for the elements here
        for (var i = 0; i < elements.length; i++) {

          // if the current element doesn't containt the search string
          // add the hidden class and remove the visbible class
          if (elements[i].textContent.toLowerCase().indexOf(searchString) === -1) {
            elements[i].classList.add(options.class.hidden);
            if (options.class.visible) {
              elements[i].classList.remove(options.class.visible);
            }
          // else
          // remove the hidden class and add the visible
          } else {
            elements[i].classList.remove(options.class.hidden);
            if (options.class.visible) {
              elements[i].classList.add(options.class.visible);
            }
            // the element is now found at least once
            found = true;
          }
        };
        // if the element wasn't found
        // and a placeholder is given,
        // stop hiding it now
        if (!found && options.placeholder) {
          placeholder.classList.remove(options.class.hidden);
        // otherwise hide it again
        } else {
          placeholder.classList.add(options.class.hidden);
        }
      });
    });
  };

  return holmes;

});
