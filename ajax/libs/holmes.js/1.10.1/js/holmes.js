/**
 * search for dom elements on your page
 * @module holmes
 */
(function(root, factory) {
  'use strict';

  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define([], function() {
      return (root.holmes = factory(document));
    });
  } else if (typeof exports === 'object') {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    module.exports = factory(document);
  } else {
    // Browser globals
    root.holmes = factory(document);
  }
})(this, function(document) {
  // UMD Definition above, do not remove this line

  // To get to know more about the Universal Module Definition
  // visit: https://github.com/umdjs/umd

  'use strict';

  /**
   * search for dom elements on your page
   * @alias module:holmes
   * @param {string} [options.input='input[type=search]']
   *   A <code>querySelector</code> to find the <code>input</code>
   * @param {string} options.find
   *   A <code>querySelectorAll</code> rule to find each of the find terms
   * @param {string=} options.placeholder
   *   Text to show when there are no results (<code>innerHTML</code>)
   * @param {string} [options.class.visible=false]
   *   class to add to matched items
   * @param {string} [options.class.hidden='hidden']
   *   class to add to non-matched items
   * @param {boolean} [options.dynamic=false]
   *   Whether to query for the content of the elements on every input.
   *   If this is <code>false</code>, then only when initializing the script will
   *   fetch the content of the elements to search in. If this is <code>true</code>
   *   then it will refresh on every <code>input</code> event.
   * @param {boolean} [options.contenteditable=false]
   *   whether the input is a contenteditable or not. By default it's
   *   assumed that it's <code>&lt;input&gt;</code>, <code>true</code> here
   *   will use <code>&lt;div contenteditable&gt;</code>
   * @param {boolean} [options.instant=false]
   *   By default Holmes waits for the <code>DOMContentLoaded</code> event to fire
   *   before listening. This is to make sure that all content is available. However
   *   if you exactly know when all your content is available (ajax, your own event or
   *   other situations), you can put this option on <code>true</code>.
   */
  function holmes(options) {

    if (typeof options != 'object') {
      throw new Error('The options need to be given inside an object like this:\nholmes({\n\tfind:".result",\n\tdynamic:false\n});\n see also https://haroen.me/holmes/doc/module-holmes.html');
    }


    // if options.find is missing, the searching won't work so we'll thrown an exceptions
    if (typeof options.find == 'undefined') {
      throw new Error('A find argument is needed. That should be a querySelectorAll for each of the items you want to match individually. You should have something like: \nholmes({\n\tfind:".result"\n});\nsee also https://haroen.me/holmes/doc/module-holmes.html');
    }

    // whether to start immediately or wait on the load of DOMContent
    if (typeof options.instant == 'undefined') {
      options.instant = false;
    }

    if (options.instant) {
      start();
    } else {
      window.addEventListener('DOMContentLoaded', start);
    }

    // start listening
    function start() {

      // setting default values
      if (typeof options.input == 'undefined') {
        options.input = 'input[type=search]';
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
      if (typeof options.dynamic == 'undefined') {
        options.dynamic = false;
      }
      if (typeof options.contenteditable == 'undefined') {
        options.contenteditable = false;
      }

      // find the search and the elements
      var search = document.querySelector(options.input);
      var elements = document.querySelectorAll(options.find);
      var elementsLength = elements.length;

      // create a container for a placeholder
      if (options.placeholder) {
        var placeholder = document.createElement('div');
        placeholder.classList.add(options.class.hidden);
        placeholder.innerHTML = options.placeholder;
        elements[0].parentNode.appendChild(placeholder);
      }

      // if a visible class is given, give it to everything
      if (options.class.visible) {
        var i;
        for (i = 0; i < elementsLength; i++) {
          elements[i].classList.add(options.class.visible);
        }
      }

      // listen for input
      search.addEventListener('input', function() {

        // by default the value isn't found
        var found = false;

        // search in lowercase
        var searchString;
        if (options.contenteditable) {
          searchString = search.textContent.toLowerCase();
        } else {
          searchString = search.value.toLowerCase();
        }

        // if the dynamic option is enabled, then we should query
        // for the contents of `elements` on every input
        if (options.dynamic) {
          elements = document.querySelectorAll(options.find);
          elementsLength = elements.length;
        }

        // loop over all the elements
        // in case this should become dynamic, query for the elements here
        var i;
        for (i = 0; i < elementsLength; i++) {

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
    };
  };

  return holmes;

});
