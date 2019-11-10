// @flow
/**
 * search for dom elements on your page
 * @module holmes
 */
(function (root, factory) {
  'use strict';

  /* $FlowIssue - doesn't work with umd */
  if (typeof define === 'function' && define.amd) { // eslint-disable-line no-undef
    // AMD. Register as an anonymous module.
    define([], function () { // eslint-disable-line no-undef
      /* $FlowIssue - doesn't work with umd */
      return (root.holmes = factory(document)); // eslint-disable-line no-undef, no-return-assign
    });
  } else if (typeof exports === 'object') { // eslint-disable-line no-undef
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    module.exports = factory(document); // eslint-disable-line no-undef
  } else {
    // Browser globals
    /* $FlowIssue - doesn't work with umd */
    root.holmes = factory(document);
  }
})(this, (function (document) {
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

    if (typeof options !== 'object') {
      throw new Error('The options need to be given inside an object like this:\nholmes({\n\tfind:".result"\n});\nsee also https://haroen.me/holmes/doc/module-holmes.html');
    }

    // if holmes.prototype.options.find is missing, the searching won't work so we'll thrown an exceptions
    if (typeof options.find !== 'string') {
      throw new Error('A find argument is needed. That should be a querySelectorAll for each of the items you want to match individually. You should have something like: \nholmes({\n\tfind:".result"\n});\nsee also https://haroen.me/holmes/doc/module-holmes.html');
    }

    /**
     * Options
     * @type {Object}
     */
    holmes.prototype.options = {
      input: 'input[type=search]',
      find: undefined,
      placeholder: undefined,
      mark: false,
      class: {
        visible: undefined,
        hidden: 'hidden'
      },
      dynamic: false,
      instant: false,
      minCharacters: 0,
      onHidden: undefined,
      onVisible: undefined,
      onEmpty: undefined,
      onFound: undefined,
      onInput: undefined
    };

    /**
     * Merges two objects
     * @param  {Object} Obj1 Object to merge
     * @param  {Object} Obj2 Object to merge
     */
    holmes.prototype._mergeObj = function (Obj1, Obj2) {
      if (!(Obj1 instanceof Object) || !(Obj2 instanceof Object)) {
        throw new Error('One of both arguments isn\'t an object.');
      }
      Object.keys(Obj1).forEach(function (k) {
        if (typeof Obj2[k] === typeof Obj1[k] || Obj1[k] === undefined) {
          if (Obj2[k] instanceof Object) {
            holmes.prototype._mergeObj(Obj1[k], Obj2[k]);
          } else {
            Obj1[k] = Obj2[k];
          }
        }
      });
    };

    // set default options
    holmes.prototype._mergeObj(holmes.prototype.options, options);

    /**
     * Start an event listener with the specified options
     */
    holmes.prototype.start = function () {
      holmes.prototype.running = true;

      /**
       * The input element
       * @type {NodeList}
       */
      holmes.prototype.input = document.querySelector(holmes.prototype.options.input);

      /**
       * All of the elements that are searched
       * @type {NodeList}
       */
      if (holmes.prototype.options.find) {
        holmes.prototype.elements = document.querySelectorAll(holmes.prototype.options.find);
      } else {
        throw new Error('A find argument is needed. That should be a querySelectorAll for each of the items you want to match individually. You should have something like: \nholmes({\n\tfind:".result"\n});\nsee also https://haroen.me/holmes/doc/module-holmes.html');
      }

      /**
       * amount of elements to search
       * @type {Number}
       */
      holmes.prototype.elementsLength = holmes.prototype.elements.length;

      /**
       * all of the elements that are searched as an array
       * @type {Array}
       */
      holmes.prototype.elementsArray = Array.prototype.slice.call(holmes.prototype.elements);

      /**
       * The amount of elements that are hidden
       * @type {Number}
       */
      holmes.prototype.hidden = 0;

      // create a container for a placeholder if needed
      if (holmes.prototype.options.placeholder) {
        /**
         * Placeholder element
         * @type {Element}
         */
        holmes.prototype.placeholderNode = document.createElement('div');
        holmes.prototype.placeholderNode.id = 'holmes-placeholder';
        holmes.prototype.placeholderNode.classList.add(holmes.prototype.options.class.hidden);
        /* $FlowIssue - flow assumes that placeholder can change here */
        holmes.prototype.placeholderNode.innerHTML = holmes.prototype.options.placeholder;
        if (holmes.prototype.elements[0].parentNode instanceof Element) {
          holmes.prototype.elements[0].parentNode.appendChild(holmes.prototype.placeholderNode);
        } else {
          throw new Error('The Holmes placeholder could\'t be put; the elements had no parent.');
        }
      }

      // if a visible class is given, give it to everything
      if (holmes.prototype.options.class.visible) {
        holmes.prototype.elementsArray.forEach((function (element) {
          element.classList.add(holmes.prototype.options.class.visible);
        }));
      }

      // listen for input
      holmes.prototype.input.addEventListener('input', inputHandler);
    };

    /**
     * The current search input in lower case
     * @return {String} the input as a string
     */
    function inputString() {
      if (holmes.prototype.input instanceof HTMLInputElement) {
        return holmes.prototype.input.value.toLowerCase();
      }
      if (holmes.prototype.input.contentEditable) {
        return holmes.prototype.input.textContent.toLowerCase();
      }
      throw new Error('The Holmes input was no <input> or contenteditable.');
    }

    /**
     * Sets an input string
     * @param {string} value the string to set
     */
    inputString.prototype.set = function (value) {
      if (holmes.prototype.input instanceof HTMLInputElement) {
        holmes.prototype.input.value = value;
      } else if (holmes.prototype.input.contentEditable) {
        holmes.prototype.input.textContent = value;
      } else {
        throw new Error('The Holmes input was no <input> or contenteditable.');
      }
    };

    /**
     * hide an element
     * @param  {HTMLElement} element the element to hide
     */
    function hideElement(element) {
      if (holmes.prototype.options.class.visible) {
        element.classList.remove(holmes.prototype.options.class.visible);
      }
      if (!element.classList.contains(holmes.prototype.options.class.hidden)) {
        element.classList.add(holmes.prototype.options.class.hidden);
        holmes.prototype.hidden++;

        if (typeof holmes.prototype.options.onHidden === 'function') {
          holmes.prototype.options.onHidden(element);
        }
      }
      if (holmes.prototype.options.mark) {
        element.innerHTML = element.innerHTML.replace(/<\/?mark>/g, '');
      }
    }

    /**
     * show an element
     * @param  {HTMLElement} element the element to show
     */
    function showElement(element) {
      if (holmes.prototype.options.class.visible) {
        element.classList.add(holmes.prototype.options.class.visible);
      }
      if (element.classList.contains(holmes.prototype.options.class.hidden)) {
        element.classList.remove(holmes.prototype.options.class.hidden);
        holmes.prototype.hidden--;

        if (typeof holmes.prototype.options.onVisible === 'function') {
          holmes.prototype.options.onVisible(element);
        }
      }

      // if we need to mark it:
      // remove all <mark> tags
      // add new <mark> tags around the text
      if (holmes.prototype.options.mark) {
        element.innerHTML = element.innerHTML.replace(/<\/?mark>/g, '');
        if (holmes.prototype.searchString.length) {
          element.innerHTML = element.innerHTML.replace(holmes.prototype.regex, '<mark>$1</mark>');
        }
      }
    }

    /**
     * input event handler
     */
    function inputHandler() {
      // by default the value isn't found
      var found = false;

      /**
       * Lowercase string holmes searces for
       * @type {string}
       */
      holmes.prototype.searchString = inputString();

      // if a minimum of characters is required
      // check if that limit has been reached
      if (holmes.prototype.options.minCharacters) {
        if (holmes.prototype.searchString.length !== 0) {
          if (holmes.prototype.options.minCharacters > holmes.prototype.searchString.length) {
            return;
          }
        }
      }

      // if the dynamic option is enabled, then we should query
      // for the contents of `elements` on every input
      if (holmes.prototype.options.dynamic) {
        holmes.prototype.elements = document.querySelectorAll(holmes.prototype.options.find);
        holmes.prototype.elementsLength = holmes.prototype.elements.length;
        holmes.prototype.elementsArray = Array.prototype.slice.call(holmes.prototype.elements);
      }

      // loop over all the elements
      // in case this should become dynamic, query for the elements here
      if (holmes.prototype.options.mark) {
        holmes.prototype.regex = new RegExp('(' + holmes.prototype.searchString + ')(?![^<]*>)', 'gi');
      }

      holmes.prototype.elementsArray.forEach((function (element) {
        // if the current element doesn't contain the search string
        // add the hidden class and remove the visbible class
        if (element.textContent.toLowerCase().indexOf(holmes.prototype.searchString) === -1) {
          hideElement(element);
        } else {
          showElement(element);

          if (empty && typeof holmes.prototype.options.onFound === 'function') {
            holmes.prototype.options.onFound(holmes.prototype.placeholderNode);
          }
          empty = false;
          // the element is now found at least once
          found = true;
        }
      }));

      if (typeof holmes.prototype.options.onInput === 'function') {
        holmes.prototype.options.onInput(holmes.prototype.searchString);
      }

      // No results were found and last time we checked it wasn't empty
      if (!found && !empty) {
        empty = true;

        if (holmes.prototype.options.placeholder) {
          holmes.prototype.placeholderNode.classList.remove(holmes.prototype.options.class.hidden);
        }
        if (typeof holmes.prototype.options.onEmpty === 'function') {
          holmes.prototype.options.onEmpty(holmes.prototype.placeholderNode);
        }
      } else if (!empty) {
        if (holmes.prototype.options.placeholder) {
          holmes.prototype.placeholderNode.classList.add(holmes.prototype.options.class.hidden);
        }
      }
    }

    // whether to start immediately or wait on the load of DOMContent
    if (typeof holmes.prototype.options.instant !== 'boolean') {
      holmes.prototype.options.instant = false;
    }

    if (holmes.prototype.options.instant) {
      holmes.prototype.start(options);
    } else {
      window.addEventListener('DOMContentLoaded', function () {
        holmes.prototype.start(options);
      });
    }

    /**
     * remove the current event listener
     * @see holmes.prototype.start
     * @return {Promise} resolves when the event is removed
     */
    holmes.prototype.stop = function () {
      return new Promise(function (resolve, reject) {
        try {
          holmes.prototype.input.removeEventListener('input', inputHandler);

          // remove placeholderNode
          if (holmes.prototype.options.placeholder) {
            if (holmes.prototype.placeholderNode.parentNode) {
              holmes.prototype.placeholderNode.parentNode.removeChild(holmes.prototype.placeholderNode);
            } else {
              throw new Error('The Holmes placeholderNode has no parent.');
            }
          }

          // remove marks
          if (holmes.prototype.options.mark) {
            holmes.prototype.elementsArray.forEach(function (element) {
              element.innerHTML = element.innerHTML.replace(/<\/?mark>/g, '');
            });
          }

          // done
          holmes.prototype.running = false;
          resolve('This instance of Holmes has been stopped.');
        } catch (err) {
          reject(err);
        }
      });
    };

    /**
     * empty the search string programmatically.
     * This avoids having to send a new `input` event
     */
    holmes.prototype.clear = function () {
      inputString.prototype.set('');
      // if a visible class is given, give it to everything
      if (holmes.prototype.options.class.visible) {
        holmes.prototype.elementsArray.forEach(function (element) {
          element.classList.remove(holmes.prototype.options.class.hidden);
          element.classList.add(holmes.prototype.options.class.visible);
        });
      } else {
        holmes.prototype.elementsArray.forEach(function (element) {
          element.classList.remove(holmes.prototype.options.class.hidden);
        });
      }
      if (holmes.prototype.options.placeholder) {
        holmes.prototype.placeholderNode.classList.add(holmes.prototype.options.class.hidden);
        if (holmes.prototype.options.class.visible) {
          holmes.prototype.placeholderNode.classList.remove(holmes.prototype.options.class.visible);
        }
      }

      holmes.prototype.hidden = 0;
    };

    /**
     * Show the amount of elements, and those hidden and visible
     * @return {object} all matching elements, the amount of hidden and the amount of visible elements
     */
    holmes.prototype.count = function () {
      return {
        all: holmes.prototype.elementsLength,
        hidden: holmes.prototype.hidden,
        visible: holmes.prototype.elementsLength - holmes.prototype.hidden
      };
    };
  }

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
}));
