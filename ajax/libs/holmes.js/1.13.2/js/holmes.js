// @flow
/**
 * search for dom elements on your page
 * @module holmes
 */
(function(root, factory) {
  'use strict';

  /* $FlowIssue - doesn't work with umd */
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define([], function() {
      /* $FlowIssue - doesn't work with umd */
      return (root.holmes = factory(document));
    });
  } else if (typeof exports === 'object') {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    module.exports = factory(document);
  } else {
    // Browser globals
    /* $FlowIssue - doesn't work with umd */
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
   * @constructor
   * @param {string} [options.input='input[type=search]']
   *   A <code>querySelector</code> to find the <code>input</code>
   * @param {string} options.find
   *   A <code>querySelectorAll</code> rule to find each of the find terms
   * @param {string=} options.placeholder
   *   Text to show when there are no results (innerHTML)
   * @param {bool} [options.mark=false]
   *   Whether to <code>&lt;mark&gt;&lt;/mark&gt;</code> the matching text
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
   *   DEPRECATED (now handled automatically) whether the input is a contenteditable or
   *   not. By default it's assumed that it's <code>&lt;input&gt;</code>, <code>true</code> here
   *   will use <code>&lt;div contenteditable&gt;</code>
   * @param {boolean} [options.instant=false]
   *   By default Holmes waits for the <code>DOMContentLoaded</code> event to fire
   *   before listening. This is to make sure that all content is available. However
   *   if you exactly know when all your content is available (ajax, your own event or
   *   other situations), you can put this option on <code>true</code>.
   * @param {number} [options.minCharacters=0] The minimum amount of characters to be typed before
   *   Holmes starts searching. Beware that this also counts when backspacing.
   * @param {onChange} [options.onHidden]
   *   Callback for when an item is hidden.
   * @param {onChange} [options.onVisible]
   *   Callback for when an item is visible again.
   * @param {onChange} [options.onEmpty]
   *   Callback for when no items were found.
   * @param {onChange} [options.onFound]
   *   Callback for when items are found after being empty.
   * @param {function} [options.onInput]
   *   Callback for every input.
   */
  function holmes(options) {

    var empty = false;

    if (typeof options != 'object') {
      throw new Error('The options need to be given inside an object like this:\nholmes({\n\tfind:".result",\n\tdynamic:false\n});\n see also https://haroen.me/holmes/doc/module-holmes.html');
    }

    /**
     * Options
     * @type {Object}
     */
    holmes.prototype.options = options;

    // if holmes.prototype.options.find is missing, the searching won't work so we'll thrown an exceptions
    if (typeof holmes.prototype.options.find == 'undefined') {
      throw new Error('A find argument is needed. That should be a querySelectorAll for each of the items you want to match individually. You should have something like: \nholmes({\n\tfind:".result"\n});\nsee also https://haroen.me/holmes/doc/module-holmes.html');
    }


    /**
     * Start an event listener with the specified options
     */
    holmes.prototype.start = function() {

      // setting default values
      if (typeof holmes.prototype.options.input == 'undefined') {
        holmes.prototype.options.input = 'input[type=search]';
      }
      if (typeof holmes.prototype.options.placeholder == 'undefined') {
        holmes.prototype.options.placeholder = false;
      }
      if (typeof holmes.prototype.options.mark == 'undefined') {
        holmes.prototype.options.mark = false;
      }
      if (typeof holmes.prototype.options.class == 'undefined') {
        holmes.prototype.options.class = {};
      }
      if (typeof holmes.prototype.options.class.visible == 'undefined') {
        holmes.prototype.options.class.visible = false;
      }
      if (typeof holmes.prototype.options.class.hidden == 'undefined') {
        holmes.prototype.options.class.hidden = 'hidden';
      }
      if (typeof holmes.prototype.options.dynamic == 'undefined') {
        holmes.prototype.options.dynamic = false;
      }
      if (typeof holmes.prototype.options.minCharacters == 'undefined') {
        holmes.prototype.options.minCharacters = 0;
      }

      /**
       * The input element
       * @type {NodeList}
       */
      holmes.prototype.input = document.querySelector(holmes.prototype.options.input);
      /**
       * All of the elements that are searched
       * @type {NodeList}
       */
      holmes.prototype.elements = document.querySelectorAll(holmes.prototype.options.find);
      /**
       * amount of elements to search
       * @type {Number}
       */
      holmes.prototype.elementsLength = holmes.prototype.elements.length;

      /**
       * The amount of elements that are hidden
       * @type {Number}
       */
      holmes.prototype.hidden = 0;

      // create a container for a placeholder
      if (holmes.prototype.options.placeholder) {
        /**
         * Placeholder element
         * @type {Element}
         */
        holmes.prototype.placeholder = document.createElement('div');
        holmes.prototype.placeholder.id = "holmes-placeholder";
        holmes.prototype.placeholder.classList.add(holmes.prototype.options.class.hidden);
        holmes.prototype.placeholder.innerHTML = holmes.prototype.options.placeholder;
        if (holmes.prototype.elements[0].parentNode) {
          holmes.prototype.elements[0].parentNode.appendChild(holmes.prototype.placeholder);
        } else {
          throw new Error('The Holmes placeholder could\'t be put; the elements had no parent.');
        }
      }

      // if a visible class is given, give it to everything
      if (holmes.prototype.options.class.visible) {
        var i;
        for (i = 0; i < holmes.prototype.elementsLength; i++) {
          holmes.prototype.elements[i].classList.add(holmes.prototype.options.class.visible);
        }
      }

      // listen for input
      holmes.prototype.input.addEventListener('input', inputHandler);
    };

    /**
     * input event handler
     */
    function inputHandler() {

      // by default the value isn't found
      var found = false;

      // if a minimum of characters is required
      // check if that limit has been reached
      if (holmes.prototype.options.minCharacters) {
        var length;
        if (holmes.prototype.input instanceof HTMLInputElement) {
          length = holmes.prototype.input.value.toLowerCase().length;
        } else if (holmes.prototype.input.contentEditable) {
          length = holmes.prototype.input.textContent.toLowerCase().length;
        } else {
          throw new Error("The Holmes input was no <input> or contenteditable.");
        }
        if (holmes.prototype.options.minCharacters > length && length !== 0) {
          return;
        }
      }

      // search in lowercase
      /**
       * Lowercase string holmes searces for
       * @type {string}
       */
      holmes.prototype.searchString;
      if (holmes.prototype.input instanceof HTMLInputElement) {
        holmes.prototype.searchString = holmes.prototype.input.value.toLowerCase();
      } else if (holmes.prototype.input.contentEditable) {
        holmes.prototype.searchString = holmes.prototype.input.textContent.toLowerCase();
      } else {
        throw new Error("The Holmes input was no <input> or contenteditable.");
      }

      // if the dynamic option is enabled, then we should query
      // for the contents of `elements` on every input
      if (holmes.prototype.options.dynamic) {
        holmes.prototype.elements = document.querySelectorAll(holmes.prototype.options.find);
        holmes.prototype.elementsLength = holmes.prototype.elements.length;
      }

      // loop over all the elements
      // in case this should become dynamic, query for the elements here
      var i;
      var regex = new RegExp('(' + holmes.prototype.searchString + ')(?![^<]*>)', 'gi');
      for (i = 0; i < holmes.prototype.elementsLength; i++) {

        // if the current element doesn't contain the search string
        // add the hidden class and remove the visbible class
        if (holmes.prototype.elements[i].textContent.toLowerCase().indexOf(holmes.prototype.searchString) === -1) {
          if (holmes.prototype.options.class.visible) {
            holmes.prototype.elements[i].classList.remove(holmes.prototype.options.class.visible);
          }
          if (!holmes.prototype.elements[i].classList.contains(holmes.prototype.options.class.hidden)) {
            holmes.prototype.elements[i].classList.add(holmes.prototype.options.class.hidden);
            holmes.prototype.hidden++;

            if (typeof holmes.prototype.options.onHidden === 'function') {
              holmes.prototype.options.onHidden(holmes.prototype.elements[i]);
            }
          }
          // else
          // remove the hidden class and add the visible
        } else {
          if (holmes.prototype.options.class.visible) {
            holmes.prototype.elements[i].classList.add(holmes.prototype.options.class.visible);
          }
          if (holmes.prototype.elements[i].classList.contains(holmes.prototype.options.class.hidden)) {
            holmes.prototype.elements[i].classList.remove(holmes.prototype.options.class.hidden);
            holmes.prototype.hidden--;

            if (empty && typeof holmes.prototype.options.onFound === 'function') {
              holmes.prototype.options.onFound(holmes.prototype.placeholder);
            }
            if (typeof holmes.prototype.options.onVisible === 'function') {
              holmes.prototype.options.onVisible(holmes.prototype.elements[i]);
            }

            empty = false;
          }

          // if we need to mark it:
          // remove all <mark> tags
          // add new <mark> tags around the text
          if (holmes.prototype.options.mark) {
            holmes.prototype.elements[i].innerHTML = holmes.prototype.elements[i].innerHTML.replace(/<\/?mark>/g, '');
            if (holmes.prototype.searchString.length) {
              holmes.prototype.elements[i].innerHTML = holmes.prototype.elements[i].innerHTML.replace(regex, '<mark>$1</mark>');
            }
          }

          // the element is now found at least once
          found = true;
        }
      };

      if (typeof holmes.prototype.options.onInput === 'function') {
        holmes.prototype.options.onInput(holmes.prototype.searchString);
      }

      // No results were found and last time we checked it wasn't empty
      if (!found && !empty) {
        empty = true;

        if (holmes.prototype.options.placeholder) {
          holmes.prototype.placeholder.classList.remove(holmes.prototype.options.class.hidden);
        }
        if (typeof holmes.prototype.options.onEmpty === 'function') {
          holmes.prototype.options.onEmpty(holmes.prototype.placeholder);
        }
      } else if (!empty) {
        if (holmes.prototype.options.placeholder) {
          holmes.prototype.placeholder.classList.add(holmes.prototype.options.class.hidden);
        }
      }
    }


    // whether to start immediately or wait on the load of DOMContent
    if (typeof holmes.prototype.options.instant == 'undefined') {
      holmes.prototype.options.instant = false;
    }

    if (holmes.prototype.options.instant) {
      holmes.prototype.start();
    } else {
      window.addEventListener('DOMContentLoaded', holmes.prototype.start);
    }

    /**
     * remove the current event listener
     * @see holmes.prototype.start
     * @return {Promise} resolves when the event is removed
     */
    holmes.prototype.stop = function() {
      return new Promise(function(resolve, reject) {
        holmes.prototype.input.removeEventListener('input', inputHandler);

        // remove placeholder
        if (holmes.prototype.placeholder.parentNode) {
          holmes.prototype.placeholder.parentNode.removeChild(holmes.prototype.placeholder);
        } else {
          throw new Error('The Holmes placeholder has no parent.');
        }

        // remove marks
        if (holmes.prototype.options.mark) {
          var i;
          for (i = 0; i < holmes.prototype.elementsLength; i++) {
            holmes.prototype.elements[i].innerHTML = holmes.prototype.elements[i].innerHTML.replace(/<\/?mark>/g, '');
          }
        }

        // done
        resolve('This instance of Holmes has been stopped.');
      });
    };

    /**
     * empty the search string programmatically.
     * This avoids having to send a new `input` event
     */
    holmes.prototype.clear = function() {
      console.log(holmes.prototype.input);
      if (holmes.prototype.input instanceof HTMLInputElement) {
        holmes.prototype.input.value = '';
      } else if (holmes.prototype.input.contentEditable) {
        holmes.prototype.input.textContent = '';
      } else {
        throw new Error("The Holmes input was no <input> or contenteditable.");
      }
      // if a visible class is given, give it to everything
      if (holmes.prototype.options.class.visible) {
        for (var i = 0; i < holmes.prototype.elementsLength; i++) {
          holmes.prototype.elements[i].classList.remove(holmes.prototype.options.class.hidden);
          holmes.prototype.elements[i].classList.add(holmes.prototype.options.class.visible);
        }
      } else {
        for (var i = 0; i < holmes.prototype.elementsLength; i++) {
          holmes.prototype.elements[i].classList.remove(holmes.prototype.options.class.hidden);
        }
      }
      if (holmes.prototype.options.placeholder) {
        holmes.prototype.placeholder.classList.add(holmes.prototype.options.class.hidden);
        if (holmes.prototype.options.class.visible) {
          holmes.prototype.placeholder.classList.remove(holmes.prototype.options.class.visible);
        }
      }

      holmes.prototype.hidden = 0;
    };

    /**
     * Show the amount of elements, and those hidden and visible
     * @return {object} all matching elements, the amount of hidden and the amount of visible elements
     */
    holmes.prototype.count = function() {
      return {
        all: holmes.prototype.elementsLength,
        hidden: holmes.prototype.hidden,
        visible: holmes.prototype.elementsLength - holmes.prototype.hidden
      };
    }

  };

  /**
   * Callback used for changes in item en list states.
   * @callback onChange
   * @param {object} [element]
   *   Element affected by the event. This is the item found by
   *   <code>onVisible</code> and <code>onHidden</code> and the placeholder
   *   (or <code>undefined</code>) for <code>onEmpty</code> and
   *   <code>onFound</code>.
   */

  return holmes;

});
