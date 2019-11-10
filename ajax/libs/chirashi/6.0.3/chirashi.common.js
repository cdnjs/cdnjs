/**
 * Chirashi.js v6.0.2
 * (c) 2017 Alex Toudic
 * Released under MIT License.
 **/

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};



















var defineProperty = function (obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
};

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

/**
 * Iterates over items and apply callback on each one.
 * @param {*} items - The iterable.
 * @param {forEachCallback} callback - The callback to call for each iteratee.
 * @param {boolean} [forceOrder=false] - Respect items order.
 * @return {(Array|NodeList|HTMLCollection)} items for chaining.
 * @example //esnext
 * import { forEach } from 'chirashi'
 *
 * const items = forEach([0, 1, 2], (item, i) => console.log(`${i}: ${item + 1}`)) //returns: [0, 1, 2]
 * // logs:
 * //   2: 3
 * //   1: 2
 * //   0: 1
 * forEach(items, (item, i) => console.log(`${i}: ${item + 1}`), true) //returns: [0, 1, 2]
 * // logs:
 * //   0: 1
 * //   1: 2
 * //   2: 3
 * forEach(0, (item, i) => console.log(`${i}: ${item + 1}`)) //returns: [0]
 * //   0: 1
 * @example //es5
 * var items = Chirashi.forEach([0, 1, 2], function (item, i) { console.log(i+': '+(item + 1)) }) //returns: [0, 1, 2]
 * // logs:
 * //   2: 3
 * //   1: 2
 * //   0: 1
 * Chirashi.forEach(items, function (item, i) { console.log(i+': '+(item + 1)) }, true) //returns: [0, 1, 2]
 * // logs:
 * //   0: 1
 * //   1: 2
 * //   2: 3
 * Chirashi.forEach(0, function (item, i) { console.log(i+': '+(item + 1)) }) //returns: [0]
 * // logs:
 * //   0: 1
 */
function forEach(items, callback) {
  var forceOrder = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

  if (!items) return [];

  if ((typeof items === 'undefined' ? 'undefined' : _typeof(items)) !== 'object' || !('length' in items)) {
    items = [items];
  }

  if (!forceOrder) {
    var i = items.length;
    while (i--) {
      callback(items[i], i);
    }
  } else {
    var _i = -1;
    var len = items.length;
    while (++_i < len) {
      callback(items[_i], _i);
    }
  }

  return items;
}

/**
* Callback to apply on item.
* @callback forEachCallback
* @param {*} item
* @param {number} index - Index of item in items.
*/

var _breakingMethods = ['push', 'splice', 'unshift'];

function _chirasizeArray(array) {
  forEach(_breakingMethods, function (method) {
    array[method] = function () {
      this['_chrsh-valid'] = false;

      return Array.prototype[method].apply(this, arguments);
    };
  });

  array['_chrsh-valid'] = true;

  return array;
}

/**
 * Test if element is a dom element. Doesn't resolve selectors.
 * @param {*} element - The element to test.
 * @return {boolean} isDomElement - true if element is HTMLElement, SVGElement, window, document or Text.
 * @example //esnext
 * import { createElement, append, isDomElement } from 'chirashi'
 * const sushi = createElement('.sushi')
 * append(document.body, sushi)
 * isDomElement(window) //returns: true
 * isDomElement(sushi) //returns: true
 * isDomElement('.sushi') //returns: false
 * @example //es5
 * var sushi = Chirashi.createElement('.sushi')
 * Chirashi.append(document.body, sushi)
 * Chirashi.isDomElement(window) //returns: true
 * Chirashi.isDomElement(sushi) //returns: true
 * Chirashi.isDomElement('.sushi') //returns: false
 */
function isDomElement(element) {
  return element instanceof window.HTMLElement || element === window || element === document || element instanceof window.SVGElement || element instanceof window.Text;
}

/**
 * Get dom element recursively from iterable or selector.
 * @param {(string|Array|NodeList|HTMLCollection|window|document|HTMLElement|SVGElement|Text)} input - The iterable, selector or elements.
 * @return {(Array|NodeList|HTMLCollection)} domElements - The array or nodelist of dom elements from input.
 * @example //esnext
 * import { createElement, append, getElements } from 'chirashi'
 * const sushi = createElement('.sushi')
 * const unagi = createElement('.unagi')
 * const yakitori = createElement('.yakitori')
 * const sashimi = createElement('.sashimi')
 * append(document.body, [sushi, unagi, yakitori, sashimi])
 * getElements('div') //returns: [<div class="sushi"></div>, <div class="unagi"></div>, <div class="yakitori"></div>, <div class="sashimi"></div>]
 * getElements('.yakitori, .sashimi') //returns: [<div class="yakitori"></div>, <div class="sashimi"></div>]
 * getElements([sushi, unagi, '.sashimi', '.wasabi']) //returns: [<div class="sushi"></div>, <div class="unagi"></div>, <div class="sashimi"></div>]
 * getElements('.wasabi') //returns: []
 * @example //es5
 * var sushi = Chirashi.createElement('.sushi')
 * var unagi = Chirashi.createElement('.unagi')
 * var yakitori = Chirashi.createElement('.yakitori')
 * var sashimi = Chirashi.createElement('.sashimi')
 * Chirashi.append(document.body, [sushi, unagi, yakitori, sashimi])
 * Chirashi.getElements('div') //returns: [<div class="sushi"></div>, <div class="unagi"></div>, <div class="yakitori"></div>, <div class="sashimi"></div>]
 * Chirashi.getElements('.yakitori, .sashimi') //returns: [<div class="yakitori"></div>, <div class="sashimi"></div>]
 * Chirashi.getElements([sushi, unagi, '.sashimi', '.wasabi']) //returns: [<div class="sushi"></div>, <div class="unagi"></div>, <div class="sashimi"></div>]
 * Chirashi.getElements('.wasabi') //returns: []
 */

function getElements(input) {
  if (typeof input === 'string') {
    return document.querySelectorAll(input);
  }

  if (input instanceof window.NodeList || input instanceof window.HTMLCollection) {
    return input;
  }

  if (input instanceof Array) {
    var _ret = function () {
      if (input['_chrsh-valid']) {
        return {
          v: input
        };
      }

      var output = [];
      forEach(input, function (element) {
        output.push.apply(output, getElements(element));
      });

      return {
        v: _chirasizeArray(output)
      };
    }();

    if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
  }

  return _chirasizeArray(isDomElement(input) ? [input] : []);
}

/**
 * Iterates over dom elements and apply callback on each one.
 * @param {(string|Array|NodeList|HTMLCollection|window|document|HTMLElement|SVGElement|Text)} elements - The iterable, selector or elements.
 * @param {forElementsCallback} callback - The function to call for each element.
 * @param {boolean} [forceOrder=false] - Respect elements order.
 * @return {(Array|NodeList|HTMLCollection)} items for chaining.
 * @example //esnext
 * import { createElement, append, forElements } from 'chirashi'
 * const sushi = createElement('.sushi')
 * const unagi = createElement('.unagi')
 * const yakitori = createElement('.yakitori')
 * const sashimi = createElement('.sashimi')
 * append(document.body, [sushi, unagi, yakitori, sashimi])
 * forElements('div', console.log) //returns: [<div class="sushi"></div>, <div class="unagi"></div>, <div class="yakitori"></div>, <div class="sashimi"></div>]
 * // logs:
 * // <div class="sashimi"></div> 3
 * // <div class="yakitori"></div> 2
 * // <div class="unagi"></div> 1
 * // <div class="sushi"></div> 0
 * forElements([yakitori, sashimi], console.log, true) //returns: [<div class="yakitori"></div>, <div class="sashimi"></div>]
 * // logs:
 * // <div class="yakitori"></div> 0
 * // <div class="sashimi"></div> 1
 * @example //es5
 * var sushi = Chirashi.createElement('.sushi')
 * var unagi = Chirashi.createElement('.unagi')
 * var yakitori = Chirashi.createElement('.yakitori')
 * var sashimi = Chirashi.createElement('.sashimi')
 * Chirashi.append(document.body, [sushi, unagi, yakitori, sashimi])
 * Chirashi.forElements('div', console.log) //returns: [<div class="sushi"></div>, <div class="unagi"></div>, <div class="yakitori"></div>, <div class="sashimi"></div>]
 * // logs:
 * // <div class="sashimi"></div> 3
 * // <div class="yakitori"></div> 2
 * // <div class="unagi"></div> 1
 * // <div class="sushi"></div> 0
 * Chirashi.forElements([yakitori, sashimi], console.log, true) //returns: [<div class="yakitori"></div>, <div class="sashimi"></div>]
 * // logs:
 * // <div class="yakitori"></div> 0
 * // <div class="sashimi"></div> 1
 */
function forElements(elements, callback) {
  var forceOrder = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

  return forEach(getElements(elements), callback, forceOrder);
}

/**
 * Callback to apply on element.
 * @callback forElementsCallback
 * @param {window | document | HTMLElement | SVGElement | Text} element
 * @param {number} index - Index of element in elements.
 */

/**
 * Iterates over object's keys and apply callback on each one.
 * @param {Object} object - The iterable.
 * @param {forInCallback} callback - The function to call for each key-value pair.
 * @param {boolean} [forceOrder=false] - Respect keys order.
 * @return {Object} object - The iterable for chaining.
 * @example //esnext
 * import { forIn } from 'chirashi'
 * const californiaRoll = { name: 'California Roll', price: 4.25, recipe: ['avocado', 'cucumber', 'crab', 'mayonnaise', 'sushi rice', 'seaweed'] }
 * forIn(californiaRoll, (key, value) => {
 *   console.log(`${key} -> ${value}`)
 * }) //returns: { name: 'California Roll', price: 4.25, recipe: ['avocado', 'cucumber', 'crab', 'mayonnaise', 'sushi rice', 'seaweed'] }
 * // LOGS:
 * // recipe -> ['avocado', 'cucumber', 'crab', 'mayonnaise', 'sushi rice', 'seaweed']
 * // price -> 4.25
 * // name -> California Roll
 * forIn(californiaRoll, (key, value) => {
 *   console.log(`${key} -> ${value}`)
 * }, true) //returns: { name: 'California Roll', price: 4.25, recipe: ['avocado', 'cucumber', 'crab', 'mayonnaise', 'sushi rice', 'seaweed'] }
 * // LOGS:
 * // name -> California Roll
 * // price -> 4.25
 * // recipe -> ['avocado', 'cucumber', 'crab', 'mayonnaise', 'sushi rice', 'seaweed']
 * @example //es5
 * var californiaRoll = { name: 'California Roll', price: 4.25, recipe: ['avocado', 'cucumber', 'crab', 'mayonnaise', 'sushi rice', 'seaweed'] }
 * Chirashi.forIn(californiaRoll, (key, value) => {
 *   console.log(key + ' -> ' + value)
 * }) //returns: { name: 'California Roll', price: 4.25, recipe: ['avocado', 'cucumber', 'crab', 'mayonnaise', 'sushi rice', 'seaweed'] }
 * // LOGS:
 * // recipe -> ['avocado', 'cucumber', 'crab', 'mayonnaise', 'sushi rice', 'seaweed']
 * // price -> 4.25
 * // name -> California Roll
 * Chirashi.forIn(californiaRoll, (key, value) => {
 *   console.log(key + ' -> ' + value)
 * }, true) //returns: { name: 'California Roll', price: 4.25, recipe: ['avocado', 'cucumber', 'crab', 'mayonnaise', 'sushi rice', 'seaweed'] }
 * // LOGS:
 * // name -> California Roll
 * // price -> 4.25
 * // recipe -> ['avocado', 'cucumber', 'crab', 'mayonnaise', 'sushi rice', 'seaweed']
 */
function forIn(object, callback) {
  var forceOrder = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

  if ((typeof object === 'undefined' ? 'undefined' : _typeof(object)) !== 'object') return;

  forEach(Object.keys(object), function (key) {
    return callback(key, object[key]);
  }, forceOrder);

  return object;
}

/**
 * Callback to apply on each key-value pair.
 * @callback forInCallback
 * @param {string} key
 * @param {*} value
 */

/**
 * Get first dom element from iterable or selector.
 * @param {(string|Array|NodeList|HTMLCollection|window|document|HTMLElement|SVGElement|Text)} input - The iterable, selector or elements.
 * @return {(window|document|HTMLElement|SVGElement|Text|boolean)} element - The dom element from input.
 * @example //esnext
 * import { createElement, append, getElement } from 'chirashi'
 * const sushi = createElement('.sushi')
 * const unagi = createElement('.unagi')
 * const yakitori = createElement('.yakitori')
 * const sashimi = createElement('.sashimi')
 * append(document.body, [sushi, unagi, yakitori, sashimi])
 * getElement('div') //returns: <div class="sushi"></div>
 * getElement('.yakitori, .sashimi') //returns: <div class="yakitori"></div>
 * getElement([sushi, unagi, '.sashimi', '.unknown']) //returns: <div class="sushi"></div>
 * getElement('.wasabi') //returns: undefined
 * @example //es5
 * var sushi = Chirashi.createElement('.sushi')
 * var unagi = Chirashi.createElement('.unagi')
 * var yakitori = Chirashi.createElement('.yakitori')
 * var sashimi = Chirashi.createElement('.sashimi')
 * Chirashi.append(document.body, [sushi, unagi, yakitori, sashimi])
 * Chirashi.getElement('div') //returns: <div class="sushi"></div>
 * Chirashi.getElement('.yakitori, .sashimi') //returns: <div class="yakitori"></div>
 * Chirashi.getElement([sushi, unagi, '.sashimi', '.unknown']) //returns: <div class="sushi"></div>
 * Chirashi.getElement('.wasabi') //returns: undefined
 */

function getElement(input) {
  if (typeof input === 'string') {
    return document.querySelector(input);
  }

  if (input instanceof window.NodeList || input instanceof window.HTMLCollection) {
    return input[0];
  }

  if (input instanceof Array) {
    return getElement(input[0]);
  }

  return isDomElement(input) && input;
}

function _updateClassList(elements, method, classes) {
  return forElements(elements, function (element) {
    if (!element.classList) return;

    element.classList[method].apply(element.classList, classes);
  });
}

/**
 * Iterates over classes and add it on each element of elements.
 * @param {(string|Array|NodeList|HTMLCollection|HTMLElement|SVGElement)} elements - The iterable, selector or elements.
 * @param {(string|string[])} classes - Array of classes or string of classes seperated with comma and/or spaces.
 * @return {(Array|NodeList|HTMLCollection)} domElements - The array or nodelist of dom elements from elements.
 * @example //esnext
 * import { createElement, addClass } from 'chirashi'
 * const maki = createElement('div')
 * addClass(maki, 'wasabi') //returns: <div class="wasabi"></div>
 * addClass(maki, 'seaweed', 'cheese') //returns: <div class="wasabi seaweed cheese"></div>
 * addClass(maki, 'avocado', 'salmon') //returns: <div class="wasabi seaweed cheese avocado salmon"></div>
 * @example //es5
 * var maki = Chirashi.createElement('div')
 * Chirashi.addClass(maki, 'wasabi') //returns: <div class="wasabi"></div>
 * Chirashi.addClass(maki, 'seaweed', 'cheese') //returns: <div class="wasabi seaweed cheese"></div>
 * Chirashi.addClass(maki, 'avocado', 'salmon') //returns: <div class="wasabi seaweed cheese avocado salmon"></div>
 */
function addClass(elements) {
  for (var _len = arguments.length, classes = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    classes[_key - 1] = arguments[_key];
  }

  return _updateClassList(elements, 'add', classes);
}

/**
 * Creates a dom element from an HTML string, tag or css selector.
 * @param {string} string - The html string, tag or css selector.
 * @return {(HTMLElement|SVGElement)} element - The dom element created from the string.
 * @example //esnext
 * import { createElement } from 'chirashi'
 * const maki = createElement('a#sushi.link[data-href="chirashijs.org"][data-link]') //returns: <a class="link" id="sushi" data-href="chirashijs.org" data-link></a>
 * const greetings = createElement('<h1>Hello <strong>World</strong>!</h1>') //returns: <h1>Hello <strong>World</strong>!</h1>
 * @example //es5
 * var maki = Chirashi.createElement('a#sushi.link[data-href="chirashijs.org"][data-link]') //returns: <a class="link" id="sushi" data-href="chirashijs.org" data-link></a>
 * var greetings = Chirashi.createElement('<h1>Hello <strong>World</strong>!</h1>') //returns: <h1>Hello <strong>World</strong>!</h1>
 */
var regex = /([#.]?)([\w-_]+)|\[([\w-_]+)(=([\w.{}:'"\s]+))?]/g;
function createElement(string) {
  regex.lastIndex = 0;

  if (string.indexOf('<') === -1) {
    var core = null;

    var attributes = '';
    var className = '';

    var segment = void 0;
    while (segment = regex.exec(string)) {
      var attribute = segment[3];
      if (typeof attribute !== 'undefined') {
        // attribute
        var value = segment[5];
        attributes += ' ' + attribute + (typeof value !== 'undefined' ? '=' + value : '');
      } else {
        var prefix = segment[1];
        var _value = segment[2];
        if (prefix === '.') {
          // className
          className += ' ' + _value;
        } else if (prefix === '#') {
          // id
          attributes += ' id="' + _value + '"';
        } else {
          // tag
          core = _value;
        }
      }
    }

    if (core === null) core = 'div';

    string = '<' + core + (className ? ' class="' + className.slice(1) + '"' : '') + attributes + '></' + core + '>';
  }

  var temp = document.createElement('div');
  temp.innerHTML = string;

  var element = temp.firstChild;

  return element;
}

/**
 * Appends each node to element.
 * @param {(string|HTMLElement|SVGElement)} element - Selector or element.
 * @param {(Array|string|HTMLElement|SVGElement|Text)} nodes - Dom element, string or array of dom elements or strings. Strings will be passed to createElement then append.
 * @return {(HTMLElement|SVGElement|boolean)} element - The element for chaining or false if nodes can't be appended.
 * @example //esnext
 * import { createElement, append } from 'chirashi'
 * const maki = createElement('.maki')
 * append(maki, '.salmon[data-fish="salmon"]') //returns: <div class="maki"><div class="salmon" data-fish="salmon"></div></div>
 * const avocado = createElement('.avocado')
 * append(maki, [avocado, '.cheese[data-cheese="cream"]']) //returns: <div class="maki"><div class="salmon" data-fish="salmon"></div><div class="avocado"></div><div class="cheese" data-cheese="cream"></div></div>
 * @example //es5
 * var maki = Chirashi.createElement('.maki')
 * Chirashi.append(maki, '.salmon[data-fish="salmon"]') //returns: <div class="maki"><div class="salmon" data-fish="salmon"></div></div>
 * var avocado = Chirashi.createElement('.avocado')
 * Chirashi.append(maki, [avocado, '.cheese[data-cheese="cream"]']) //returns: <div class="maki"><div class="salmon" data-fish="salmon"></div><div class="avocado"></div><div class="cheese" data-cheese="cream"></div></div>
 */
function append(element, nodes) {
  element = getElement(element);

  if (!element || !element.appendChild) return false;

  forEach(nodes, function (node, index) {
    if (typeof node === 'string') {
      element.appendChild(createElement(node));
    } else if (isDomElement(node)) {
      element.appendChild(node);
    }
  }, true);

  return element;
}

/**
 * Get the value for the property name on the element.
 * @param {(string|Array|NodeList|HTMLCollection|document|HTMLElement|SVGElement)} element - The selector or dom element.
 * @param {string} property - The name of the property.
 * @return {*} value - The value for the property or null if no element found.
 * @example //esnext
 * import { createElement, append, getProp } from 'chirashi'
 * const maki = createElement('.maki')
 * append(maki, '.salmon')
 * getProp(maki, 'firstChild') //returns: <div class="salmon"></div>
 * @example //es5
 * var maki = Chirashi.createElement('.maki')
 * Chirashi.append(maki, '.salmon')
 * Chirashi.getProp(maki, 'firstChild') //returns: <div class="salmon"></div>
 */
function getProp(element, property) {
  element = getElement(element);

  return element ? element[property] : null;
}

/**
 * Returns an element's children.
 * @param {(string|HTMLElement|SVGElement)} element - Selector or element.
 * @return {HTMLCollection} children - Element's children or null if elements has no children property or isn't a dom element.
 * @example //esnext
 * import { createElement, append, children } from 'chirashi'
 * const maki = createElement('.maki')
 * append(maki, ['.salmon', '.avocado'])
 * children(maki) //returns: [<div class="salmon"></div>, <div class="avocado"></div>]
 * @example //es5
 * const maki = Chirashi.createElement('.maki')
 * Chirashi.append(maki, ['.salmon', '.avocado'])
 * Chirashi.children(maki) //returns: [<div class="salmon"></div>, <div class="avocado"></div>]
 */
function children(element) {
  return getProp(element, 'children');
}

/**
 * Clones element.
 * @param {(string|HTMLElement|SVGElement)} element - Selector or element.
 * @return {(string|HTMLElement|SVGElement|boolean)} clone - element's clone or false if element isn't a dom element or can't be cloned.
 * @example //esnext
 * import { createElement, append, clone } from 'chirashi'
 * const maki = createElement('.maki')
 * clone(maki) //returns: <div class="maki"></div>
 * const sushi = createElement('.sushi')
 * append(document.body, sushi)
 * clone('.sushi') //returns: <div class="sushi"></div>
 * @example //es5
 * var maki = Chirashi.createElement('.maki')
 * Chirashi.clone(maki) //returns: <div class="maki"></div>
 * var sushi = Chirashi.createElement('.sushi')
 * Chirashi.append(document.body, sushi)
 * Chirashi.clone('.sushi') //returns: <div class="sushi"></div>
 */
function clone(element) {
  element = getElement(element);

  return !!element && 'cloneNode' in element && element.cloneNode(true);
}

/**
 * Get closest element matching the tested selector or tested element traveling up the DOM tree from element to limit.
 * @param {(string|HTMLElement|SVGElement|Text)} element - Selector or element.
 * @param {(string|HTMLElement|SVGElement|Text)} tested - The selector or dom element to match.
 * @param {(string|document|HTMLElement|SVGElement)} [limit=document] - Returns false when this selector or element is reached.
 * @return {(boolean|HTMLElement|SVGElement|Text)} matchedElement - The matched element or false.
 * @example //esnext
 * import { createElement, append, closest } from 'chirashi'
 * const maki = createElement('.maki')
 * const cheese = createElement('.cheese')
 * append(maki, cheese)
 * append(cheese, '.avocado')
 * append(document.body, maki)
 * closest('.avocado', '.maki') //returns: <div class="maki"></div>
 * closest('.avocado', '.maki', '.cheese') //returns: false
 * @example //es5
 * var maki = Chirashi.createElement('.maki')
 * var cheese = Chirashi.createElement('.cheese')
 * Chirashi.append(maki, cheese)
 * Chirashi.append(cheese, '.avocado')
 * Chirashi.append(document.body, maki)
 * Chirashi.closest('.avocado', '.maki') //returns: <div class="maki"></div>
 * Chirashi.closest('.avocado', '.maki', '.cheese') //returns: false
 */
function closest(element, tested) {
  var limit = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : document;

  element = getElement(element);

  if (!element || (typeof limit === 'string' ? element.matches(limit) : element === limit)) {
    return false;
  }

  if (typeof tested === 'string' ? element.matches(tested) : element === tested) {
    return element;
  }

  return !!element.parentNode && closest(element.parentNode, tested, limit);
}

/**
 * Iterates over elements, returning an array of all elements matching tested selector.
 * @param {(string|Array|NodeList|HTMLCollection|window|document|HTMLElement|SVGElement|Text)} elements - The iterable, selector or elements.
 * @param {(string|HTMLElement|SVGElement|Text)} tested - The selector or dom element to match.
 * @return {Array} matching - The array of filtered elements.
 * @example //esnext
 * import { createElement, append, filter } from 'chirashi'
 * const salmonMaki = createElement('.salmon.maki')
 * const tunaMaki = createElement('.tuna.maki')
 * const salmonSushi = createElement('.salmon.sushi')
 * const tunaSushi = createElement('.tuna.sushi')
 * append(document.body, [salmonMaki, tunaMaki, salmonSushi, tunaSushi])
 * filter('div', '.salmon') //returns: [<div class="salmon sushi"></div>, <div class="salmon maki"></div>]
 * filter([salmonMaki, tunaMaki, salmonSushi, tunaSushi], '.maki') //returns: [<div class="salmon maki"></div>, <div class="tuna maki"></div>]
 * filter('div', '.salmon') //returns: [<div class="salmon sushi"></div>, <div class="salmon maki"></div>]
 * @example //es5
 * var salmonMaki = Chirashi.createElement('.salmon.maki')
 * var tunaMaki = Chirashi.createElement('.tuna.maki')
 * var salmonSushi = Chirashi.createElement('.salmon.sushi')
 * var tunaSushi = Chirashi.createElement('.tuna.sushi')
 * Chirashi.append(document.body, [salmonMaki, tunaMaki, salmonSushi, tunaSushi])
 * Chirashi.filter('div', '.salmon') //returns: [<div class="salmon sushi"></div>, <div class="salmon maki"></div>]
 * Chirashi.filter([salmonMaki, tunaMaki, salmonSushi, tunaSushi], '.maki') //returns: [<div class="salmon maki"></div>, <div class="tuna maki"></div>]
 * Chirashi.filter('div', '.salmon') //returns: [<div class="salmon sushi"></div>, <div class="salmon maki"></div>]
 */
function filter(elements, tested) {
  var matching = [];

  forElements(elements, function (element) {
    if (typeof tested === 'string' && 'matches' in element && element.matches(tested) || element === tested) {
      matching.push(element);
    }
  });

  return _chirasizeArray(matching);
}

/**
 * Iterates over each element of elements and returns an array containing all elements' children matching a selector.
 * @param {(string|Array|NodeList|HTMLCollection|document|HTMLElement|SVGElement)} elements - The iterable, selector or elements.
 * @param {string} selector - The selector.
 * @return {(Array|NodeList|HTMLCollection)} found - The elements' descendants matching the selector.
 * @example //esnext
 * import { createElement, append, find } from 'chirashi'
 * const maki = createElement('.maki')
 * append(maki, ['.salmon[data-fish][data-inside]', '.avocado[data-inside]'])
 * const roll = createElement('.roll')
 * append(roll, '.tuna[data-fish][data-inside]')
 * append(document.body, [maki, roll])
 * find('div', '[data-fish]') //returns: [<div class="salmon" data-fish data-inside></div>, <div class="tuna" data-fish data-inside></div>]
 * find(maki, '[data-inside]') //returns: [<div class="salmon" data-fish data-inside></div>, <div class="avocado" data-inside></div>]
 * @example //es5
 * var maki = Chirashi.createElement('.maki')
 * Chirashi.append(maki, ['.salmon[data-fish][data-inside]', '.avocado[data-inside]'])
 * var roll = Chirashi.createElement('.roll')
 * Chirashi.append(roll, '.tuna[data-fish][data-inside]')
 * Chirashi.append(document.body, [maki, roll])
 * Chirashi.find('div', '[data-fish]') //returns: [<div class="salmon" data-fish data-inside></div>, <div class="tuna" data-fish data-inside></div>]
 * Chirashi.find(maki, '[data-inside]') //returns: [<div class="salmon" data-fish data-inside></div>, <div class="avocado" data-inside></div>]
 */
function find(elements, selector) {
  if (elements.length) {
    var _ret = function () {
      var found = [];

      forElements(elements, function (element) {
        found.push.apply(found, [].slice.call(element.querySelectorAll(selector)));
      });

      return {
        v: _chirasizeArray(found)
      };
    }();

    if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
  } else {
    return elements.querySelectorAll(selector);
  }
}

/**
 * Find the first element's child matching the selector.
 * @param {(string|Array|NodeList|HTMLCollection|document|HTMLElement|SVGElement)} elements - The iterable, selector or elements.
 * @param {string} selector - The selector to match.
 * @return {(HTMLElement|SVGElement|null)} element - The first child of elements matching the selector or null.
 * @example //esnext
 * import { createElement, append, find } from 'chirashi'
 * const maki = createElement('.maki')
 * append(maki, ['.salmon[data-fish][data-inside]', '.avocado[data-inside]'])
 * const roll = createElement('.roll')
 * append(roll, '.tuna[data-fish][data-inside]')
 * append(document.body, [maki, roll])
 * findOne('div', '[data-fish]') //returns: <div class="salmon" data-fish data-inside></div>
 * findOne(maki, '[data-inside]') //returns: <div class="salmon" data-fish data-inside></div>
 * @example //es5
 * var maki = Chirashi.createElement('.maki')
 * Chirashi.append(maki, ['.salmon[data-fish][data-inside]', '.avocado[data-inside]'])
 * var roll = Chirashi.createElement('.roll')
 * Chirashi.append(roll, '.tuna[data-fish][data-inside]')
 * Chirashi.append(document.body, [maki, roll])
 * Chirashi.findOne('div', '[data-fish]') //returns: <div class="salmon" data-fish data-inside></div>
 * Chirashi.findOne(maki, '[data-inside]') //returns: <div class="salmon" data-fish data-inside></div>
 */
function findOne(element, selector) {
  element = getElement(element);

  return element ? element.querySelector(selector) : null;
}

/**
 * Get value for named attribute of element.
 * @param {(string|Array|NodeList|HTMLCollection|document|HTMLElement|SVGElement)} element - The selector or dom element.
 * @param {string} name - The attribute's name.
 * @return {(string|boolean)} value - The value for the attribute or false if no element found.
 * @example //esnext
 * import { createElement, getAttr } from 'chirashi'
 * const maki = createElement('.maki[data-fish="salmon"]')
 * getAttr(maki, 'data-fish') //returns: "salmon"
 * @example //es5
 * const maki = Chirashi.createElement('.maki[data-fish="salmon"]')
 * Chirashi.getAttr(maki, 'data-fish') //returns: "salmon"
 */
function getAttr(element, name) {
  element = getElement(element);

  return !!element && element.getAttribute(name);
}

/**
 * Alias on getAttr prefixing name with 'data-'.
 * @param {(string|Array|NodeList|HTMLCollection|document|HTMLElement|SVGElement)} element - The selector or dom element.
 * @param {string} name - The data-attribute's name.
 * @return {(string|boolean)} value - The value for the data-attribute or false if no element found.
 * @example //esnext
 * import { createElement, getData } from 'chirashi'
 * const maki = createElement('.maki[data-fish="salmon"]')
 * getData(maki, 'fish') //returns: "salmon"
 * @example //es5
 * const maki = Chirashi.createElement('.maki[data-fish="salmon"]')
 * Chirashi.getData(maki, 'fish') //returns: "salmon"
 */
function getData(element, name) {
  return getAttr(element, 'data-' + name);
}

/**
 * Get the inner html of an element.
 * @param {(string|Array|NodeList|HTMLCollection|document|HTMLElement|SVGElement)} element - The selector or dom element.
 * @return {(string|null)} innerHTML - The inner html of the element or null if no element found.
 * @example //esnext
 * import { createElement, setHtml, getHtml } from 'chirashi'
 * const maki = createElement('p.maki')
 * setHtml(maki, 'salmon')
 * getHtml(maki) //returns: "salmon"
 * @example //es5
 * var maki = createElement('p.maki')
 * setHtml(maki, 'salmon')
 * getHtml(maki) //returns: "salmon"
 */
function getHtml(element) {
  return getProp(element, 'innerHTML');
}

var reg = /[,\s]+/g;
function _stringToArray(input) {
  reg.lastIndex = 0;

  if (typeof input === 'string') {
    return input.search(reg) !== -1 ? input.split(reg) : [input];
  }

  return input;
}

/**
 * Iterates over classes and test if element has each.
 * @param {(string|HTMLElement|SVGElement)} element - The selector or dom element.
 * @param {(string|string[])} classes - Array of classes, classes seperated by coma and/or spaces or single class.
 * @return {boolean} hasClass - Is true if element has all classes.
 * @example //esnext
 * import { createElement, hasClass } from 'chirashi'
 * const maki = createElement('.salmon.cheese.maki')
 * hasClass(maki, 'salmon cheese') //returns: true
 * hasClass(maki, ['salmon', 'avocado']) //returns: false
 * @example //es5
 * var maki = Chirashi.createElement('.salmon.cheese.maki')
 * Chirashi.hasClass(maki, 'salmon cheese') //returns: true
 * Chirashi.hasClass(maki, ['salmon', 'avocado']) //returns: false
 */
function hasClass(element, classes) {
  element = getElement(element);
  if (!element || !element.classList) return;

  classes = _stringToArray(classes);

  var i = classes.length;
  var found = void 0;
  while (i-- && (found = element.classList.contains(classes[i]))) {}

  return found;
}

/**
 * Returns index of element in parent's children.
 * @param {(string|HTMLElement|SVGElement|Text)} element - The selector or dom element.
 * @return {(number|null)} index - The position of element in his parent's children or null if no element found.
 * @example //esnext
 * import { createElement, append, indexInParent } from 'chirashi'
 * const maki = createElement('.maki')
 * append(document.body, maki)
 * append(maki, ['.salmon[data-fish="salmon"]', '.cheese[data-cheese="cream"]']) //returns: <div class="maki"><div class="salmon" data-fish="salmon"></div><div class="cheese" data-cheese="cream"></div></div>
 * indexInParent('.cheese') //returns: 1
 * @example //es5
 * var maki = Chirashi.createElement('.maki')
 * Chirashi.append(document.body, maki)
 * Chirashi.append(maki, ['.salmon[data-fish="salmon"]', '.cheese[data-cheese="cream"]']) //returns: <div class="maki"><div class="salmon" data-fish="salmon"></div><div class="cheese" data-cheese="cream"></div></div>
 * Chirashi.indexInParent('.cheese') //returns: 1
 */
function indexInParent(element) {
  element = getElement(element);

  if (!element) return null;

  var current = element;
  var i = 0;
  while (current = current.previousElementSibling) {
    ++i;
  }return i;
}

/**
 * Insert nodes after element in his parent.
 * @param {(string|HTMLElement|SVGElement|Text)} element - The selector or dom element.
 * @param {(Array|string|HTMLElement|SVGElement|Text)} nodes - Array of dom elements or string to create it using createElement.
 * @return {(HTMLElement|SVGElement|undefined)} element - The element for chaining or undefined if no element found or element has no parent.
 * @example //esnext
 * import { createElement, append, insertAfter } from 'chirashi'
 * const maki = createElement('.maki')
 * append(document.body, maki)
 * append(maki, ['.salmon[data-fish="salmon"]', '.cheese[data-cheese="cream"]'])
 * insertAfter('.salmon', ['.avocado', '.wasabi']) //returns: <div class="maki"><div class="salmon" data-fish="salmon"></div><div class="avocado"></div><div class="wasabi"></div><div class="cheese" data-cheese="cream"></div></div>
 * @example //es5
 * var maki = Chirashi.createElement('.maki')
 * Chirashi.append(document.body, maki)
 * Chirashi.append(maki, ['.salmon[data-fish="salmon"]', '.cheese[data-cheese="cream"]'])
 * Chirashi.insertAfter('.salmon', ['.avocado', '.wasabi']) //returns: <div class="maki"><div class="salmon" data-fish="salmon"></div><div class="avocado"></div><div class="wasabi"></div><div class="cheese" data-cheese="cream"></div></div>
 */
function insertAfter(element, nodes) {
  element = getElement(element);

  if (!element || !('parentNode' in element)) return;

  var parent = element.parentNode;

  forEach(nodes, function (node, index) {
    if (typeof node === 'string') {
      node = createElement(node);
    }

    if (isDomElement(node)) parent.insertBefore(node, element.nextElementSibling);
  }, true);

  return element;
}

/**
 * Insert nodes before element in his parent.
 * @param {(string|HTMLElement|SVGElement|Text)} element - The selector or dom element.
 * @param {(Array|string|HTMLElement|SVGElement|Text)} nodes - Array of dom elements or string to create it using createElement.
 * @return {(HTMLElement|SVGElement|undefined)} element - The element for chaining or undefined if no element found or element has no parent.
 * @example //esnext
 * import { createElement, append, insertBefore } from 'chirashi'
 * const maki = createElement('.maki')
 * append(document.body, maki)
 * append(maki, ['.salmon[data-fish="salmon"]', '.cheese[data-cheese="cream"]'])
 * insertBefore('.cheese', ['.avocado', '.wasabi']) //returns: <div class="maki"><div class="salmon" data-fish="salmon"></div><div class="avocado"></div><div class="wasabi"></div><div class="cheese" data-cheese="cream"></div></div>
 * @example //es5
 * var maki = Chirashi.createElement('.maki')
 * Chirashi.append(document.body, maki)
 * Chirashi.append(maki, ['.salmon[data-fish="salmon"]', '.cheese[data-cheese="cream"]'])
 * Chirashi.insertBefore('.cheese', ['.avocado', '.wasabi']) //returns: <div class="maki"><div class="salmon" data-fish="salmon"></div><div class="avocado"></div><div class="wasabi"></div><div class="cheese" data-cheese="cream"></div></div>
 */
function insertBefore(element, nodes) {
  element = getElement(element);

  if (!element || !('parentNode' in element)) return;

  var parent = element.parentNode;

  forEach(nodes, function (node, index) {
    if (typeof node === 'string') {
      node = createElement(node);
    }

    if (isDomElement(node)) parent.insertBefore(node, element);
  }, true);

  return element;
}

/**
 * Get the next sibling of element.
 * @param {(string|HTMLElement|SVGElement|Text)} element - The selector or dom element.
 * @return {(HTMLElement|SVGElement|Text|null)} nextElement - The element's next sibling or null if no element found.
 * @example //esnext
 * import { createElement, append, next } from 'chirashi'
 * const maki = createElement('.maki')
 * append(maki, '.salmon[data-fish="salmon"]') //returns: <div class="maki"><div class="salmon" data-fish="salmon"></div></div>
 * const avocado = createElement('.avocado')
 * append(maki, [avocado, '.cheese[data-cheese="cream"]']) //returns: <div class="maki"><div class="salmon" data-fish="salmon"></div><div class="avocado"></div><div class="cheese" data-cheese="cream"></div></div>
 * next(avocado) //returns: <div class="cheese" data-cheese="cream"></div>
 * @example //es5
 * var maki = Chirashi.createElement('.maki')
 * Chirashi.append(maki, '.salmon[data-fish="salmon"]') //returns: <div class="maki"><div class="salmon" data-fish="salmon"></div></div>
 * var avocado = Chirashi.createElement('.avocado')
 * Chirashi.append(maki, [avocado, '.cheese[data-cheese="cream"]']) //returns: <div class="maki"><div class="salmon" data-fish="salmon"></div><div class="avocado"></div><div class="cheese" data-cheese="cream"></div></div>
 * Chirashi.next(avocado) //returns: <div class="cheese" data-cheese="cream"></div>
 */
function next(element) {
  return getProp(element, 'nextElementSibling');
}

/**
 * Returns the parent node of the element.
 * @param {(string|document|HTMLElement|SVGElement|Text)} element - The selector or dom element.
 * @return {(document|HTMLElement|SVGElement|null)} parentElement - The parent node or null if no element found.
 * @example //esnext
 * import { createElement, append, parent } from 'chirashi'
 * const maki = createElement('.maki')
 * append(document.body, maki)
 * append(maki, '.salmon[data-fish="salmon"]') //returns: <div class="maki"><div class="salmon" data-fish="salmon"></div></div>
 * parent('.salmon') //returns: <div class="maki"><div class="salmon" data-fish="salmon"></div></div>
 * @example //es5
 * var maki = Chirashi.createElement('.maki')
 * append(maki
 * Chirashi.append(document.body, maki)
 * Chirashi.append(maki, '.salmon[data-fish="salmon"]') //returns: <div class="maki"><div class="salmon" data-fish="salmon"></div></div>
 * Chirashi.parent('.salmon') //returns: <div class="maki"><div class="salmon" data-fish="salmon"></div></div>
 */
function parent(element) {
  return getProp(element, 'parentNode');
}

/**
 * Get the previous sibling of element.
 * @param {(string|HTMLElement|SVGElement|Text)} element - The selector or dom element.
 * @return {(HTMLElement|SVGElement|Text|null)} previousElement - The element's previous sibling or null if no element found.
 * @example //esnext
 * import { createElement, append, prev } from 'chirashi'
 * const maki = createElement('.maki')
 * append(maki, '.salmon[data-fish="salmon"]') //returns: <div class="maki"><div class="salmon" data-fish="salmon"></div></div>
 * const avocado = createElement('.avocado')
 * append(maki, [avocado, '.cheese[data-cheese="cream"]']) //returns: <div class="maki"><div class="salmon" data-fish="salmon"></div><div class="avocado"></div><div class="cheese" data-cheese="cream"></div></div>
 * prev(avocado) //returns: <div class="salmon" data-fish="salmon"></div>
 * @example //es5
 * var maki = Chirashi.createElement('.maki')
 * Chirashi.append(maki, '.salmon[data-fish="salmon"]') //returns: <div class="maki"><div class="salmon" data-fish="salmon"></div></div>
 * var avocado = Chirashi.createElement('.avocado')
 * Chirashi.append(maki, [avocado, '.cheese[data-cheese="cream"]']) //returns: <div class="maki"><div class="salmon" data-fish="salmon"></div><div class="avocado"></div><div class="cheese" data-cheese="cream"></div></div>
 * Chirashi.prev(avocado) //returns: <div class="salmon" data-fish="salmon"></div>
 */
function prev(element) {
  return getProp(element, 'previousElementSibling');
}

/**
 * Iterates over elements and removes it from DOM.
 * @param {(string|HTMLElement|SVGElement|Text)} element - The selector or dom element.
 * @return {(Array|NodeList|HTMLCollection)} removedElements - The array or nodelist of removed dom elements.
 * @example //esnext
 * import { createElement, append, remove } from 'chirashi'
 * const maki = createElement('.maki')
 * append(document.body, maki)
 * append(maki, '.salmon[data-fish="salmon"]') //returns: <div class="maki"><div class="salmon" data-fish="salmon"></div></div>
 * const avocado = createElement('.avocado')
 * append(maki, [avocado, '.cheese[data-cheese="cream"]']) //returns: <div class="maki"><div class="salmon" data-fish="salmon"></div><div class="avocado"></div><div class="cheese" data-cheese="cream"></div></div>
 * remove('.cheese') //returns: [<div class="cheese" data-cheese="cream"></div>]
 * @example //es5
 * var maki = Chirashi.createElement('.maki')
 * Chirashi.append(document.body, maki)
 * Chirashi.append(maki, '.salmon[data-fish="salmon"]') //returns: <div class="maki"><div class="salmon" data-fish="salmon"></div></div>
 * var avocado = Chirashi.createElement('.avocado')
 * Chirashi.append(maki, [avocado, '.cheese[data-cheese="cream"]']) //returns: <div class="maki"><div class="salmon" data-fish="salmon"></div><div class="avocado"></div><div class="cheese" data-cheese="cream"></div></div>
 * Chirashi.remove('.cheese') //returns: [<div class="cheese" data-cheese="cream"></div>]
 */
function remove(elements) {
  return forElements(elements, function (element) {
    if (!element.parentNode) return;

    element.parentNode.removeChild(element);
  });
}

function _applyForEach(elements, method, args) {
  return forElements(elements, function (element) {
    if (!element[method]) return;

    forEach(args, function (arg) {
      element[method](arg);
    });
  });
}

/**
 * Iterates over attributes and removes it from each element of elements.
 * @param {(string|Array|NodeList|HTMLCollection|HTMLElement|SVGElement)} elements - The iterable, selector or elements.
 * @param {Array | string} attributes - Array of attributes' name, string of attributes' name seperated by space and/or comas or name of a single attribute.
 * @return {(Array|NodeList|HTMLCollection)} domElements - The array or nodelist of dom elements from elements.
 * @example //esnext
 * import { createElement, append, removeAttr } from 'chirashi'
 * const maki = createElement('.maki')
 * append(document.body, maki)
 * append(maki, ['.salmon[data-fish="salmon"]', '.cheese[data-cheese="cream"]']) //returns: <div class="maki"><div class="salmon" data-fish="salmon"></div><div class="cheese" data-cheese="cream"></div></div>
 * removeAttr('.salmon', 'data-fish') //returns: [<div class="salmon"></div>]
 * @example //es5
 * var maki = Chirashi.createElement('.maki')
 * Chirashi.append(document.body, maki)
 * Chirashi.append(maki, ['.salmon[data-fish="salmon"]', '.cheese[data-cheese="cream"]']) //returns: <div class="maki"><div class="salmon" data-fish="salmon"></div><div class="cheese" data-cheese="cream"></div></div>
 * Chirashi.removeAttr('.salmon', 'data-fish') //returns: [<div class="salmon"></div>]
 */
function removeAttr(elements, attributes) {
  return _applyForEach(elements, 'removeAttribute', _stringToArray(attributes));
}

/**
 * Iterates over classes and remove it from each element of elements.
 * @param {(string|Array|NodeList|HTMLCollection|window|document|HTMLElement|SVGElement|Text)} elements - The iterable, selector or elements.
 * @param {(string|string[])} classes - Array of classes or string of classes seperated with comma and/or spaces.
 * @return {(Array|NodeList|HTMLCollection)} domElements - The array or nodelist of dom elements from elements.
 * @example //esnext
 * import { createElement, removeClass } from 'chirashi'
 * const maki = createElement('.maki.salmon.cheese.wasabi') //returns: <div class="maki salmon cheese wasabi"></div>
 * removeClass(maki, 'cheese', 'wasabi') //returns: [<div class="maki salmon"></div>]
 * @example //es5
 * var maki = Chirashi.createElement('.maki.salmon.cheese.wasabi') //returns: <div class="maki salmon cheese wasabi"></div>
 * Chirashi.removeClass(maki, 'cheese', 'wasabi') //returns: [<div class="maki salmon"></div>]
 */
function removeClass(elements) {
  for (var _len = arguments.length, classes = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    classes[_key - 1] = arguments[_key];
  }

  return _updateClassList(elements, 'remove', classes);
}

/**
 * Iterates over attributes and removes it from each element of elements.
 * @param {(string|Array|NodeList|HTMLCollection|HTMLElement|SVGElement)} elements - The iterable, selector or elements.
 * @param {(string|string[])} attributes - Array of attributes' name, string of attributes' name seperated by space and/or comas or name of a single attribute.
 * @return {(Array|NodeList|HTMLCollection)} domElements - The array or nodelist of dom elements from elements.
 * @example //esnext
 * import { createElement, append, removeData } from 'chirashi'
 * const maki = createElement('.maki')
 * append(document.body, maki)
 * append(maki, ['.salmon[data-fish="salmon"]', '.cheese[data-cheese="cream"]']) //returns: <div class="maki"><div class="salmon" data-fish="salmon"></div><div class="cheese" data-cheese="cream"></div></div>
 * removeData('.salmon', 'fish') //returns: [<div class="salmon"></div>]
 * @example //es5
 * var maki = Chirashi.createElement('.maki')
 * Chirashi.append(document.body, maki)
 * Chirashi.append(maki, ['.salmon[data-fish="salmon"]', '.cheese[data-cheese="cream"]']) //returns: <div class="maki"><div class="salmon" data-fish="salmon"></div><div class="cheese" data-cheese="cream"></div></div>
 * Chirashi.removeData('.salmon', 'fish') //returns: [<div class="salmon"></div>]
 */
function removeData(elements, attributes) {
  attributes = _stringToArray(attributes);
  forEach(attributes, function (attr, index) {
    attributes[index] = 'data-' + attr;
  });

  return _applyForEach(elements, 'removeAttribute', attributes);
}

/**
 * Iterates over attributes as key value pairs and apply on each element of elements.
 * @param {Array | string | HTMLElement | SVGElement} elements - The iterable, selector or elements.
 * @param {Object} - The attributes key value pairs.
 * @return {(Array|NodeList|HTMLCollection)} domElements - The array or nodelist of dom elements from elements.
 * @example //esnext
 * import { createElement, setAttr } from 'chirashi'
 * const maki = createElement('.maki')
 * setAttr(maki, {
 *   dataFish: 'salmon'
 * }) //returns: [<div class="maki" data-fish="salmon">]
 * @example //es5
 * var maki = Chirashi.createElement('.maki')
 * Chirashi.setAttr(maki, {
 *   dataFish: 'salmon'
 * }) //returns: [<div class="maki" data-fish="salmon">]
 */
function setAttr(elements, attributes) {
  forIn(attributes, function (name, value) {
    if (typeof value !== 'string' && !(value instanceof Array)) {
      attributes[name] = JSON.stringify(value);
    }
  });

  return forElements(elements, function (element) {
    forIn(attributes, function (name, value) {
      element.setAttribute(name, value);
    });
  });
}

/**
 * Iterates over data-attributes as key value pairs and apply on each element of elements.
 * @param {Array | string | HTMLElement | SVGElement} elements - The iterable, selector or elements.
 * @param {Object} - The data-attributes key value pairs.
 * @return {(Array|NodeList|HTMLCollection)} domElements - The array or nodelist of dom elements from elements.
 * @example //esnext
 * import { createElement, setData } from 'chirashi'
 * const maki = createElement('.maki')
 * setData(maki, {
 *   fish: 'salmon'
 * }) //returns: [<div class="maki" data-fish="salmon">]
 * @example //es5
 * var maki = Chirashi.createElement('.maki')
 * Chirashi.setData(maki, {
 *   fish: 'salmon'
 * }) //returns: [<div class="maki" data-fish="salmon">]
 */
function setData(elements, dataAttributes) {
  var attributes = {};

  forIn(dataAttributes, function (name, value) {
    attributes['data-' + name] = value;
  });

  return setAttr(elements, attributes);
}

/**
 * Apply props as key value pairs on each element of elements.
 * @param {(string|Array|NodeList|HTMLCollection|document|HTMLElement|SVGElement)} elements - The iterable, selector or elements.
 * @param {Object} - The props key value pairs.
 * @return {(Array|NodeList|HTMLCollection)} domElements - The array or nodelist of dom elements from elements.
 * @example //esnext
 * import { createElement, setProp, getProp } from 'chirashi'
 * const maki = createElement('input.maki')
 * setProp(maki, { value: 'こんにちは世界' })
 * getProp(maki, 'value') //returns: こんにちは世界
 * @example //es5
 * var maki = Chirashi.createElement('input.maki')
 * Chirashi.setProp(maki, { value: 'こんにちは世界' })
 * Chirashi.getProp(maki, 'value') //returns: こんにちは世界
 */
function setProp(elements, props) {
  return forElements(elements, function (element) {
    return Object.assign(element, props);
  });
}

/**
 * Set the inner html of elements.
 * @param {Array | string | HTMLElement | SVGElement} elements - The iterable, selector or elements.
 * @param {string} html - The html to insert.
 * @return {(Array|NodeList|HTMLCollection)} domElements - The array or nodelist of dom elements from elements.
 * @example //esnext
* import { createElement, setHtml, getHtml } from 'chirashi'
* const maki = createElement('p.maki')
* setHtml(maki, 'salmon') //returns: [<p class="maki">salmon</p>]
* getHtml(maki) //returns: "salmon"
* @example //es5
* var maki = createElement('p.maki')
* setHtml(maki, 'salmon') //returns: [<p class="maki">salmon</p>]
* getHtml(maki) //returns: "salmon"
 */
function setHtml(elements, html) {
  return setProp(elements, { 'innerHTML': html });
}

/**
 * Iterates over classes and toggle it on each element of elements.
 * @param {(string|Array|NodeList|HTMLCollection|window|document|HTMLElement|SVGElement|Text)} elements - The iterable, selector or elements.
 * @param {(string|Array|Object)} classes - Array of classes or string of classes seperated with comma and/or spaces. Or object with keys being the string of classes seperated with comma and/or spaces and values function returning a booleanean.
 * @return {(Array|NodeList|HTMLCollection)} domElements - The array or nodelist of dom elements from elements.
 * @example //esnext
 * import { createElement, toggleClass, clone, setData, getData } from 'chirashi'
 * const maki = createElement('.wasabi.salmon.maki') //returns: <div class="maki salmon wasabi"></div>
 * const sushi = createElement('.salmon.sushi') //returns: <div class="sushi salmon"></div>
 * toggleClass([maki, sushi], 'wasabi') //returns: [<div class="maki salmon"></div>, <div class="sushi salmon wasabi"></div>]
 * const scdMaki = clone(maki)
 * setData(maki, { for: 'leonard' })
 * setData(scdMaki, { for: 'sheldon' })
 * toggleClass([maki, scdMaki], {
 *   cheese: element => {
 *     return getData(element, 'for') !== 'leonard'
 *   }
 * }) //returns: [<div class="maki salmon cheese" data-for="sheldon"></div>, <div class="maki salmon" data-for="leonard"></div>]
 * @example //es5
 * var maki = Chirashi.createElement('.wasabi.salmon.maki') //returns: <div class="wasabi salmon maki"></div>
 * var sushi = Chirashi.createElement('.salmon.sushi') //returns: <div class="salmon sushi"></div>
 * Chirashi.toggleClass([maki, sushi], 'wasabi') //returns: [<div class="maki salmon"></div>, <div class="sushi salmon wasabi"></div>]
 * var scdMaki = Chirashi.clone(maki)
 * Chirashi.setData(maki, { for: 'leonard' })
 * Chirashi.setData(scdMaki, { for: 'sheldon' })
 * Chirashi.toggleClass([maki, scdMaki], {
 *   cheese: function (element) {
 *     return Chirashi.getData(element, 'for') !== 'leonard'
 *   }
 * }) //returns: [<div class="maki salmon cheese" data-for="sheldon"></div>, <div class="maki salmon" data-for="leonard"></div>]
 */
function toggleClass(elements, input) {
  if (input instanceof Array || typeof input === 'string') {
    var _ret = function () {
      var classes = _stringToArray(input);

      return {
        v: forElements(elements, function (element) {
          if (!element.classList) return;

          forEach(classes, function (className) {
            element.classList.toggle(className);
          });
        })
      };
    }();

    if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
  } else {
    return forElements(elements, function (element) {
      if (!element.classList) return;

      forIn(input, function (classes, condition) {
        var toggle = condition(element);
        forEach(_stringToArray(classes), function (className) {
          element.classList.toggle(className, toggle);
        });
      });
    });
  }
}

function _setEvents(elements, method, input) {
  method += 'EventListener';

  return forElements(elements, function (element) {
    forIn(input, function (events, callback) {
      forEach(_stringToArray(events), function (event) {
        return element[method](event, callback);
      });
    });
  });
}

/**
 * Bind events listener on each element of elements.
 * @param {(string|Array|NodeList|HTMLCollection|window|document|HTMLElement|SVGElement)} elements - The iterable, selector or elements.
 * @param {Object.<string, eventCallback>} input - An object in which keys are events to bind seperated with coma and/or spaces and values are eventCallbacks.
 * @return {Object} object - An object with off method to remove events listeners.
 * @return {offCallback} object.off - The off method.
 * @example //esnext
 * import { createElement, append, on, trigger } from 'chirashi'
 * const maki = createElement('a.cheese.maki')
 * const sushi = createElement('a.wasabi.sushi')
 * append(document.body, [maki, sushi])
 * const listener = on('.cheese, .wasabi', {
 *   click(e, target) {
 *     console.log('clicked', target)
 *   },
 *   'mouseenter mousemove': (e, target) => {
 *     console.log('mouse in', target)
 *   }
 * })
 * trigger(maki, 'click') //simulate user's click
 * // LOGS: "clicked" <a class="maki cheese"></a>
 * trigger(sushi, 'click') //simulate user's click
 * // LOGS: "clicked" <a class="sushi wasabi"></a>
 * listener.off(maki, 'click') //remove click event listener on maki
 * listener.off() //remove all listeners from all elements
 * @example //es5
 * var listener = Chirashi.bind('.cheese, .wasabi', {
 *   'click': function (e, target) {
 *     console.log('clicked', target)
 *   },
 *   'mouseenter mousemove': function(e, target) {
 *     console.log('mouse in', target)
 *   }
 * })
 * var maki = Chirashi.createElement('a.cheese.maki')
 * var sushi = Chirashi.createElement('a.wasabi.sushi')
 * Chirashi.append(document.body, [maki, sushi])
 * Chirashi.trigger(maki, 'click') //simulate user's click
 * // LOGS: "clicked" <a class="maki cheese"></a>
 * Chirashi.trigger(sushi, 'click') //simulate user's click
 * // LOGS: "clicked" <a class="sushi wasabi"></a>
 * listener.off(maki, 'click') //remove click event listener on maki
 * listener.off() //remove all listeners from all elements
 */
function on(elements, input) {
  elements = _setEvents(elements, 'add', input);

  return {
    off: function off(offElements, events) {
      _setEvents(offElements || elements, 'remove', events ? defineProperty({}, events, input[events]) : input);
    }
  };
}

/**
* Callback to execute on event.
* @callback eventCallback
* @param {Event} event - Triggered event.
*/

/**
* Called to remove one or all events listeners of one or all elements.
* @callback offCallback
* @param {(string|Array|NodeList|HTMLCollection|window|document|HTMLElement|SVGElement)} [offElements] - The iterable, selector or elements to unbind.
* @param {string} [events] - The events to unbind. Must be provided in the same syntax as in input.
*/

/**
 * Bind events listener on delegate and execute callback when target matches selector (targets doesn't have to be in the DOM at binding).
 * @param {string} selector - The selector to match.
 * @param {Object.<string, bindCallback>} input - An object in which keys are events to bind seperated with coma and/or spaces and values are bindCallbacks.
 * @return {Object} object - An object with unbind method for unbinding.
 * @return {unbindCallback} object.unbind - The unbind method.
 * @example //esnext
 * import { createElement, append, bind, trigger } from 'chirashi'
 * const listener = bind('.cheese, .wasabi', {
 *   click(e, target) => {
 *     console.log('clicked', target)
 *   },
 *   'mouseenter mousemove': (e, target) => {
 *     console.log('mouse in', target)
 *   }
 * })
 * const maki = createElement('a.cheese.maki')
 * const sushi = createElement('a.wasabi.sushi')
 * append(document.body, [maki, sushi])
 * trigger(maki, 'click') //simulate user's click
 * // LOGS: "clicked" <a class="maki cheese"></a>
 * trigger(sushi, 'click') //simulate user's click
 * // LOGS: "clicked" <a class="sushi wasabi"></a>
 * listener.unbind('mouseenter mousemove') //remove mouseenter and mousemove listeners
 * listener.unbind() //remove all listeners
 * @example //es5
 * var listener = Chirashi.bind('.cheese, .wasabi', {
 *   'click': function (e, target) {
 *     console.log('clicked', target)
 *   },
 *   'mouseenter mousemove': function(e, target) {
 *     console.log('mouse in', target)
 *   }
 * })
 * var maki = Chirashi.createElement('a.cheese.maki')
 * var sushi = Chirashi.createElement('a.wasabi.sushi')
 * Chirashi.append(document.body, [maki, sushi])
 * Chirashi.trigger(maki, 'click') //simulate user's click
 * // LOGS: "clicked" <a class="maki cheese"></a>
 * Chirashi.trigger(sushi, 'click') //simulate user's click
 * // LOGS: "clicked" <a class="sushi wasabi"></a>
 * listener.unbind('mouseenter mousemove') //remove mouseenter and mousemove listeners
 * listener.unbind() //remove all listeners
 */
function bind(selector, input) {
  var delegate = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : document.body;

  var eventsObj = {};
  forIn(input, function (events, callback) {
    eventsObj[events] = function (event) {
      var target = closest(event.target, selector, delegate);
      if (target) callback(event, target);
    };
  });

  var bound = on(delegate, eventsObj);

  return {
    unbind: function unbind(events) {
      bound.off(delegate, events);
    }
  };
}

/**
* Callback to execute on event using delegate.
* @callback bindCallback
* @param {Event} event - Triggered event.
* @param {HTMLElement | SVGElement} target - Target of the event.
*/

/**
* Called to unbind one or all events.
* @callback unbindCallback
* @param {string} [events] - The events to unbind. Must be provided in the same syntax as in input.
*/

/**
 * Bind events listener on each element of elements and unbind after first triggered.
 * @param {(string|Array|NodeList|HTMLCollection)} elements - The iterable or selector
 * @param {Object.<string, eventCallback>} input - An object in which keys are events to bind seperated with coma and/or spaces and values are eventCallbacks.
 * @param {boolean} [eachElement=false] - If true only current target's events listeners will be removed after trigger.
 * @param {boolean} [eachEvent=false] - If true only triggered event group of events listeners will be removed.
 * @return {Object} cancelObject - An object with cancel method for unbinding.
 * @return {Object.cancel} cancel - cancel method.
 * @example //esnext
 * import { createElement, append, once, trigger } from 'chirashi'
 * const maki = createElement('a.cheese.maki')
 * const sushi = createElement('a.wasabi.sushi')
 * append(document.body, [maki, sushi])
 * const listener = once('.cheese, .wasabi', {
 *   click(e, target) => {
 *     console.log('clicked', target)
 *   },
 *   'mouseenter mousemove': (e, target) => {
 *     console.log('mouse in', target)
 *   }
 * }, true, true)
 * trigger(maki, 'click') //simulate user's click
 * // LOGS: "clicked" <a class="maki cheese"></a>
 * // click event listener was auto-removed from maki
 * trigger(sushi, 'click') //simulate user's click
 * // LOGS: "clicked" <a class="sushi wasabi"></a>
 * // click event listener was auto-removed from sushi
 * listener.cancel() //remove all listeners from all elements
 * const listener2 = once('.cheese, .wasabi', {
 *   click(e, target) => {
 *     console.log('clicked', target)
 *   }
 * })
 * trigger(maki, 'click') //simulate user's click
 * // LOGS: "clicked" <a class="maki cheese"></a>
 * // all events listeners were auto-removed from all elements
 * trigger(sushi, 'click') //simulate user's click
 * // won't log anything
 * @example //es5
 * var maki = Chirashi.createElement('a.cheese.maki')
 * var sushi = Chirashi.createElement('a.wasabi.sushi')
 * Chirashi.append(document.body, [maki, sushi])
 * var listener = Chirashi.once('.cheese, .wasabi', {
 *   click: function (e, target) {
 *     console.log('clicked', target)
 *   },
 *   'mouseenter mousemove': function (e, target) {
 *     console.log('mouse in', target)
 *   }
 * }, true, true)
 * Chirashi.trigger(maki, 'click') //simulate user's click
 * // LOGS: "clicked" <a class="maki cheese"></a>
 * // click event listener was auto-removed from maki
 * Chirashi.trigger(sushi, 'click') //simulate user's click
 * // LOGS: "clicked" <a class="sushi wasabi"></a>
 * // click event listener was auto-removed from sushi
 * listener.cancel() //remove all listeners from all elements
 * var listener2 = Chirashi.once('.cheese, .wasabi', {
 *   click: function (e, target) {
 *     console.log('clicked', target)
 *   }
 * })
 * Chirashi.trigger(maki, 'click') //simulate user's click
 * // LOGS: "clicked" <a class="maki cheese"></a>
 * // all events listeners were auto-removed from all elements
 * Chirashi.trigger(sushi, 'click') //simulate user's click
 * // won't log anything
 */
function once(elements, input) {
  var eachElement = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  var eachEvent = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

  var listener = void 0;
  var eventsObj = {};

  forIn(input, function (events, callback) {
    eventsObj[events] = function (event) {
      callback(event);

      listener.off(eachElement && event.currentTarget, eachEvent && events);
    };
  });

  listener = on(elements, eventsObj);

  return {
    cancel: listener.off
  };
}

/**
 * Execute callback when dom is ready.
 * @param {eventCallback} callback - The callback.
 * @example //esnext
 * import { ready } from 'chirashi'
 * ready(() => {
 *   console.log('Hello World!')
 * })
 * // Dom already complete or event fired.
 * // LOGS: "Hello World!"
 * @example //es5
 * Chirashi.ready(function () {
 *   console.log('Hello World!')
 * })
 * // Dom already complete or event fired.
 * // LOGS: "Hello World!"
 */
function ready(callback) {
  // arguments[1] is used for test purpose only
  if ((arguments[1] || document.readyState) === 'complete') {
    callback();
  } else {
    once(document, {
      'DOMContentLoaded': callback
    });
  }
}

var defaults$1 = {
  bubbles: true,
  cancelable: true
};

/**
 * Trigger events on elements with data
 * @param {(string|Array|NodeList|HTMLCollection)} elements - The iterable or selector
 * @param {string} events - The events that should be tiggered seperated with spaces
 * @param {Object} data - The events' data
 * @return {(string|Array|NodeList|HTMLCollection)} elements - The iterable for chaining
 * @example //esnext
 * import { createElement, append, on, trigger } from 'chirashi'
 * const maki = createElement('a.cheese.maki')
 * const sushi = createElement('a.wasabi.sushi')
 * append(document.body, [maki, sushi])
 * const listener = on('.cheese, .wasabi', {
 *   click(e, target) => {
 *     console.log('clicked', target)
 *   }
 * })
 * trigger(maki, 'click') //simulate user's click
 * // LOGS: "clicked" <a class="maki cheese"></a>
 * trigger(sushi, 'click') //simulate user's click
 * // LOGS: "clicked" <a class="sushi wasabi"></a>
 * @example //es5
 * var listener = Chirashi.bind('.cheese, .wasabi', {
 *   'click': function (e, target) {
 *     console.log('clicked', target)
 *   }
 * })
 * var maki = Chirashi.createElement('a.cheese.maki')
 * var sushi = Chirashi.createElement('a.wasabi.sushi')
 * Chirashi.append(document.body, [maki, sushi])
 * Chirashi.trigger(maki, 'click') //simulate user's click
 * // LOGS: "clicked" <a class="maki cheese"></a>
 * Chirashi.trigger(sushi, 'click') //simulate user's click
 * // LOGS: "clicked" <a class="sushi wasabi"></a>
 */
function trigger(elements, events) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  elements = getElements(elements);

  if (!elements.length) return;

  options = _extends({}, options, defaults$1);

  forEach(_stringToArray(events), function (event) {
    event = new window.CustomEvent(event, options);

    forEach(elements, function (element) {
      return element.dispatchEvent(event);
    });
  });

  return elements;
}

var caps = /[A-Z]/g;

function _kebabCase(input) {
  var output = '' + input;

  var next = void 0;
  while (next = caps.exec(input)) {
    output = output.replace(new RegExp(next, 'g'), '-' + next[0].toLowerCase());
  }

  return output;
}

var unitless = ['z-index', 'zoom', 'font-weight', 'line-height', 'counter-reset', 'counter-increment', 'volume', 'stress', 'pitch-range', 'richness', 'opacity'];

/**
 * Set the provided style to elements.
 * @param {(string|Array|NodeList|HTMLCollection)} elements - The iterable, selector or elements.
 * @param {Object.<string, (number|string)>} style - The style options as object with keys the css property and values, string values or number. If the value is a number and property doesn't support unitless values, pixels will be used.
 * @return {(Array|NodeList|HTMLCollection)} domElements - The array or nodelist of dom elements from elements.
 * @example //esnext
 * import { append, setStyle, position } from 'chirashi'
 *
 * append(document.body, '.maki')
 * append('.maki', '.salmon')
 *
 * setStyle('.maki', {
 *   display: 'block',
 *   position: 'absolute',
 *   top: 200,
 *   left: 240,
 *   width: 100,
 *   height: 100,
 *   borderRadius: '50%',
 *   background: 'black'
 * }) // returns: [<div class="maki" style="display: block; position: absolute; top: 200px; left: 240px; width: 100px; height: 100px; border-radius: 50%; background: black;"><div class="salmon"></div></div>]
 *
 * const salmon = setStyle('.salmon', {
 *   display: 'block',
 *   position: 'absolute',
 *   top: 20,
 *   left: 10,
 *   width: 10,
 *   height: 10,
 *   borderRadius: '50%',
 *   background: 'pink'
 * }) // returns: [<div class="salmon" style="display: block; position: absolute; top: 20px; left: 10px; width: 10px; height: 10px; border-radius: 50%; background: pink;"></div>]
 * @example //es5
 * Chirashi.append(document.body, '.maki')
 * Chirashi.append('.maki', '.salmon')
 *
 * Chirashi.setStyle('.maki', {
 *   display: 'block',
 *   position: 'absolute',
 *   top: 200,
 *   left: 240,
 *   width: 100,
 *   height: 100,
 *   borderRadius: '50%',
 *   background: 'black'
 * }) // returns: [<div class="maki" style="display: block; position: absolute; top: 200px; left: 240px; width: 100px; height: 100px; border-radius: 50%; background: black;"><div class="salmon"></div></div>]
 *
 * const salmon = Chirashi.setStyle('.salmon', {
 *   display: 'block',
 *   position: 'absolute',
 *   top: 20,
 *   left: 10,
 *   width: 10,
 *   height: 10,
 *   borderRadius: '50%',
 *   background: 'pink'
 * }) // returns: [<div class="salmon" style="display: block; position: absolute; top: 20px; left: 10px; width: 10px; height: 10px; border-radius: 50%; background: pink;"></div>]
 */
function setStyle(elements, style) {
  forIn(style, function (prop, value) {
    if (unitless.indexOf(_kebabCase(prop)) === -1 && typeof value === 'number') {
      style[prop] += 'px';
    }
  });

  return forElements(elements, function (element) {
    if (!element.style) return;

    Object.assign(element.style, style);
  });
}

/**
 * Clear inline style properties from elements.
 * @param {(string|Array|NodeList|HTMLCollection)} elements - The iterable, selector or elements.
 * @param {Object.<string, string>} style - The style options as object with key the property and value the string value.
 * @return {(Array|NodeList|HTMLCollection)} domElements - The array or nodelist of dom elements from elements.
 * @example //esnext
 * import { createElement, setStyle, clearStyle } from 'chirashi'
 * const maki = createElement('a.cheese.maki')
 * setStyle(maki, {
 *   position: 'absolute',
 *   top: 10,
 *   width: 200,
 *   height: 200,
 *   background: 'red'
 * })
 * clearStyle(maki, ['position', top])
 * clearStyle(maki, 'width, height, background')
 * @example //es5
 * var maki = Chirashi.createElement('a.cheese.maki')
 * Chirashi.setStyle(maki, {
 *   position: 'absolute',
 *   top: 10,
 *   width: 200,
 *   height: 200,
 *   background: 'red'
 * })
 * Chirashi.clearStyle(maki, ['position', top])
 * Chirashi.clearStyle(maki, 'width, height, background')
 */
function clearStyle(elements, props) {
  props = _stringToArray(props);

  var style = {};
  forEach(props, function (prop) {
    style[prop] = '';
  });

  return setStyle(elements, style);
}

/**
 * Return the screen relative position of an element.
 * @param {(string|Array|NodeList|HTMLCollection|document|HTMLElement|SVGElement)} element - The selector or dom element.
 * @return {(Object|boolean)} clientRect - Element's screen position or false if no element found.
 * @return {Object.bottom} bottom - Y-coordinate, relative to the viewport origin, of the bottom of the rectangle box.
 * @return {Object.height} height - Height of the rectangle box (This is identical to bottom minus top).
 * @return {Object.left} left - X-coordinate, relative to the viewport origin, of the left of the rectangle box.
 * @return {Object.right} right - X-coordinate, relative to the viewport origin, of the right of the rectangle box.
 * @return {Object.top} top - Y-coordinate, relative to the viewport origin, of the top of the rectangle box.
 * @return {Object.width} width - Width of the rectangle box (This is identical to right minus left).
 * @example esnext
 * import { setStyle, append, clientRect } from 'chirashi'
 *
 * setStyle([document.documentElement, document.body], {
 *   position: 'relative',
 *   margin: 0,
 *   padding: 0
 * })
 *
 * append(document.body, '.poulp')
 *
 * const poulp = setStyle('.poulp', {
 *   display: 'block',
 *   position: 'absolute',
 *   top: 200,
 *   left: 240,
 *   width: 100,
 *   height: 100,
 *   background: 'red'
 * })
 *
 * clientRect(poulp) // returns: { bottom: 300, height: 100, left: 240, right: 0, top: 200, width: 100 }
 * @example es5
 * Chirashi.setStyle([document.documentElement, document.body], {
 *   position: 'relative',
 *   margin: 0,
 *   padding: 0
 * })
 *
 * Chirashi.append(document.body, '.poulp')
 *
 * var poulp = Chirashi.setStyle('.poulp', {
 *   display: 'block',
 *   position: 'absolute',
 *   top: 200,
 *   left: 240,
 *   width: 100,
 *   height: 100,
 *   background: 'red'
 * })
 *
 * Chirashi.clientRect(poulp) // returns: { bottom: 300, height: 100, left: 240, right: 0, top: 200, width: 100 }
 */
function clientRect(element) {
  element = getElement(element);

  if (!element) return false;

  var rect = element.getBoundingClientRect();
  return {
    bottom: rect.bottom,
    height: rect.height,
    left: rect.left,
    right: rect.right,
    top: rect.top,
    width: rect.width
  };
}

function _getLength(element, direction, offset) {
  return getProp(element, '' + (offset ? 'offset' : 'client') + direction);
}

/**
 * Get element's height in pixels.
 * @param {(string|HTMLElement|SVGElement)} element - Selector or element.
 * @param {boolean} [offset=false] - If true height will include scrollbar and borders to size.
 * @return {number} height - The height in pixels.
 * @example //esnext
 * import { append, setStyle, getHeight } from 'chirashi'
 * append(document.body, '.maki')
 * const maki = setStyle('.maki', {
 *   display: 'block',
 *   border: '20px solid red',
 *   padding: 10,
 *   height: 200,
 *   width: 200
 * })
 * getHeight(maki, true) //returns: 260
 * getHeight(maki) //returns: 220
 * @example //es5
 * Chirashi.append(document.body, '.maki')
 * var maki = Chirashi.setStyle('.maki', {
 *   display: 'block',
 *   border: '20px solid red',
 *   padding: 10,
 *   height: 200,
 *   width: 200
 * })
 * Chirashi.getHeight(maki, true) //returns: 260
 * Chirashi.getHeight(maki) //returns: 220
 */
function getHeight(element) {
  var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  return _getLength(element, 'Height', offset);
}

/**
 * Get element's width in pixels.
 * @param {(string|HTMLElement|SVGElement)} element - Selector or element.
 * @param {boolean} [offset=false] - If true width will include scrollbar and borders to size.
 * @return {number} width - The width in pixels.
 * @example //esnext
 * import { append, setStyle, getWidth } from 'chirashi'
 * append(document.body, '.maki')
 * const maki = setStyle('.maki', {
 *   display: 'block',
 *   border: '20px solid red',
 *   padding: 10,
 *   height: 200,
 *   width: 200
 * })
 * getWidth(maki, true) //returns: 260
 * getWidth(maki) //returns: 220
 * @example //es5
 * Chirashi.append(document.body, '.maki')
 * var maki = Chirashi.setStyle('.maki', {
 *   display: 'block',
 *   border: '20px solid red',
 *   padding: 10,
 *   height: 200,
 *   width: 200
 * })
 * Chirashi.getWidth(maki, true) //returns: 260
 * Chirashi.getWidth(maki) //returns: 220
 */
function getWidth(element) {
  var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  return _getLength(element, 'Width', offset);
}

/**
 * Get element's size in pixels.
 * @param {(string|Array|NodeList|HTMLCollection|document|HTMLElement|SVGElement)} element - The selector or dom element
 * @param {boolean} [offset=false] - If true size will include scrollbar and borders.
 * @return {number} size - The size in pixels.
 * @example //esnext
 * import { append, setStyle, getSize } from 'chirashi'
 * append(document.body, '.maki')
 * const maki = setStyle('.maki', {
 *   display: 'block',
 *   border: '20px solid red',
 *   padding: 10,
 *   height: 200,
 *   width: 200
 * })
 * getSize(maki, true) //returns: { width: 260, height: 260 }
 * getSize(maki) //returns: { width: 220, height: 220 }
 * @example //es5
 * Chirashi.append(document.body, '.maki')
 * var maki = Chirashi.setStyle('.maki', {
 *   display: 'block',
 *   border: '20px solid red',
 *   padding: 10,
 *   height: 200,
 *   width: 200
 * })
 * Chirashi.getSize(maki, true) //returns: { width: 260, height: 260 }
 * Chirashi.getSize(maki) //returns: { width: 220, height: 220 }
 */
function getSize(element) {
  var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  return {
    width: getWidth(element, offset),
    height: getHeight(element, offset)
  };
}

/**
 * Get style property of element.
 * @param {(string|Array|NodeList|HTMLCollection|document|HTMLElement|SVGElement)} element - The selector or dom element
 * @return {number} value - The value for the property
 * @example //esnext
 * import { append, setStyle, getStyle } from 'chirashi'
 * append(document.body, '.maki')
 * const maki = setStyle('.maki', {
 *   display: 'block',
 *   position: 'relative',
 *   top: 10
 * })
 * getStyle(maki, 'display') //returns: "block"
 * getStyle(maki, 'top') //returns: 10
 * @example //es5
 * Chirashi.append(document.body, '.maki')
 * var maki = Chirashi.setStyle('.maki', {
 *   display: 'block',
 *   position: 'relative',
 *   top: 10
 * })
 * Chirashi.getStyle(maki, 'display') //returns: "block"
 * Chirashi.getStyle(maki, 'top') //returns: 10
 */
function getStyle(element, property) {
  element = getElement(element);
  if (!element) return;

  var ret = window.getComputedStyle(element)[property];

  return ret.indexOf('px') === -1 ? ret : parseFloat(ret);
}

/**
 * Hide each element of elements using visibility.
 * @param {(string|Array|NodeList|HTMLCollection)} elements - The iterable, selector or elements.
 * @return {(Array|NodeList|HTMLCollection)} domElements - The array or nodelist of dom elements from elements.
 * @example //esnext
 * import { append, hide, getStyle }
 * append(document.body, '.maki')
 * const maki = hide('.maki')
 * getStyle(maki, 'visibility') // returns: "hidden"
 * @example //es5
 * Chirashi.append(document.body, '.maki')
 * var maki = Chirashi.hide('.maki')
 * Chirashi.getStyle(maki, 'visibility') // returns: "hidden"
 */
function hide(elements) {
  return setStyle(elements, { visibility: 'hidden' });
}

/**
 * Return the screen relative position of an element.
 * @param {(string|Array|NodeList|HTMLCollection|document|HTMLElement|SVGElement)} element - The selector or dom element.
 * @return {(Object|boolean)} screenPosition - Element's screen position or false if no element found.
 * @return {Object.top} top - Y-coordinate, relative to the viewport origin, of the top of the rectangle box.
 * @return {Object.left} left - X-coordinate, relative to the viewport origin, of the left of the rectangle box.
 * @example esnext
 * import { setStyle, append, screenPosition } from 'chirashi'
 *
 * setStyle([document.documentElement, document.body], {
 *   position: 'relative',
 *   margin: 0,
 *   padding: 0
 * })
 *
 * append(document.body, '.poulp')
 *
 * const poulp = setStyle('.poulp', {
 *   display: 'block',
 *   position: 'absolute',
 *   top: 200,
 *   left: 240,
 *   width: 100,
 *   height: 100,
 *   background: 'red'
 * })
 *
 * screenPosition(poulp) // returns: { top: 200, left: 240 }
 * @example es5
 * Chirashi.setStyle([document.documentElement, document.body], {
 *   position: 'relative',
 *   margin: 0,
 *   padding: 0
 * })
 *
 * Chirashi.append(document.body, '.poulp')
 *
 * var poulp = Chirashi.setStyle('.poulp', {
 *   display: 'block',
 *   position: 'absolute',
 *   top: 200,
 *   left: 240,
 *   width: 100,
 *   height: 100,
 *   background: 'red'
 * })
 *
 * Chirashi.screenPosition(poulp) // returns: { top: 200, left: 240 }
 */
function screenPosition(element) {
  var rect = clientRect(element);

  return rect && {
    top: rect.top,
    left: rect.left
  };
}

/**
 * Returns the top and left offset of an element. Offset is relative to web page.
 * @param {(string|Array|NodeList|HTMLCollection|document|HTMLElement|SVGElement)} element - The selector or dom element.
 * @return {(Object|boolean)} offset - Offset object or false if no element found.
 * @return {Object.top} top - Top offset in pixels.
 * @return {Object.left} left - Left offset in pixels.
 * @example //esnext
 * import { setStyle, append, offset }
 * setStyle([document.documentElement, document.body], {
 *   position: 'relative',
 *   margin: 0,
 *   padding: 0
 * })
 * append(document.body, '.sushi')
 * const sushi = setStyle('.sushi', {
 *   display: 'block',
 *   width: 100,
 *   height: 100,
 *   position: 'absolute',
 *   top: 200,
 *   left: 240,
 *   background: 'red'
 * })
 * offset(sushi) // returns: { top: 200, left: 240 }
 * @example //es5
 * Chirashi.setStyle([document.documentElement, document.body], {
 *   position: 'relative',
 *   margin: 0,
 *   padding: 0
 * })
 * Chirashi.append(document.body, '.sushi')
 * var sushi = Chirashi.setStyle('.sushi', {
 *   display: 'block',
 *   width: 100,
 *   height: 100,
 *   position: 'absolute',
 *   top: 200,
 *   left: 240,
 *   background: 'red'
 * })
 * Chirashi.offset(sushi) // returns: { top: 200, left: 240 }
 */
function offset(element) {
  var screenPos = screenPosition(element);

  return screenPos && {
    top: screenPos.top + window.scrollY,
    left: screenPos.left + window.scrollX
  };
}

/**
 * Return the top and left position of an element. Position is relative to parent.
 * @param {(string|Array|NodeList|HTMLCollection|document|HTMLElement|SVGElement)} element - The selector or dom element.
 * @return {(Object|boolean)} offset - Offset object or false if no element found.
 * @return {Object.top} top - Top position in pixels.
 * @return {Object.left} left - Left position in pixels.
 * @example //esnext
 * import { append, setStyle, position } from 'chirashi'
 *
 * setStyle([document.documentElement, document.body], {
 *   position: 'relative',
 *   margin: 0,
 *   padding: 0
 * })
 *
 * append(document.body, '.maki')
 * append('.maki', '.salmon')
 *
 * setStyle('.maki', {
 *   display: 'block',
 *   position: 'absolute',
 *   top: 200,
 *   left: 240,
 *   width: 100,
 *   height: 100,
 *   borderRadius: '50%',
 *   background: 'black'
 * })
 *
 * const salmon = setStyle('.salmon', {
 *   display: 'block',
 *   position: 'absolute',
 *   top: 20,
 *   left: 10,
 *   width: 10,
 *   height: 10,
 *   borderRadius: '50%',
 *   background: 'pink'
 * })
 *
 * position(salmon) // returns: { top: 20, left: 10 }
 * @example //es5
 * Chirashi.setStyle([document.documentElement, document.body], {
 *   position: 'relative',
 *   margin: 0,
 *   padding: 0
 * })
 *
 * Chirashi.append(document.body, '.maki')
 * Chirashi.append('.maki', '.salmon')
 *
 * Chirashi.setStyle('.maki', {
 *   display: 'block',
 *   position: 'absolute',
 *   top: 200,
 *   left: 240,
 *   width: 100,
 *   height: 100,
 *   borderRadius: '50%',
 *   background: 'black'
 * })
 *
 * var salmon = Chirashi.setStyle('.salmon', {
 *   display: 'block',
 *   position: 'absolute',
 *   top: 20,
 *   left: 10,
 *   width: 10,
 *   height: 10,
 *   borderRadius: '50%',
 *   background: 'pink'
 * })
 *
 * Chirashi.position(salmon) // returns: { top: 20, left: 10 }
 */
function position(element) {
  element = getElement(element);

  return !!element && {
    top: element.offsetTop,
    left: element.offsetLeft
  };
}

/**
 * Set the provided height to elements.
 * @param {(string|Array|NodeList|HTMLCollection)} elements - The iterable, selector or elements.
 * @param {(number|string)} height - The height as number or string. For number, unit used will be pixels.
 * @return {(Array|NodeList|HTMLCollection)} domElements - The array or nodelist of dom elements from elements.
 * @example //esnext
 * import { append, setHeight } from 'chirashi'
 *
 * append(document.body, '.maki')
 *
 * setHeight('.maki', 20) // returns: [<div class="maki" style="height: 20px;"></div>]
 * setHeight('.maki', '100%') // returns: [<div class="maki" style="height: 100%;"></div>]
 * @example //es5
 * Chirashi.append(document.body, '.maki')
 *
 * Chirashi.setHeight('.maki', 20) // returns: [<div class="maki" style="height: 20px;"></div>]
 * Chirashi.setHeight('.maki', '100%') // returns: [<div class="maki" style="height: 100%;"></div>]
 */
function setHeight(elements, height) {
  return setStyle(elements, { height: height });
}

/**
 * Set the provided size to elements.
 * @param {(string|Array|NodeList|HTMLCollection)} elements - The iterable, selector or elements.
 * @param {(number|string)} width - The width as number or string. For number, unit used will be pixels.
 * @param {(number|string)} height - The height as number or string. For number, unit used will be pixels.
 * @return {(Array|NodeList|HTMLCollection)} domElements - The array or nodelist of dom elements from elements.
 * @example //esnext
 * import { append, setSize } from 'chirashi'
 *
 * append(document.body, '.maki')
 *
 * setSize('.maki', 20, '100%') // returns: [<div class="maki" style="width: 20px; height: 100%;"></div>]
 * @example //es5
 * Chirashi.append(document.body, '.maki')
 *
 * Chirashi.setSize('.maki', 20, '100%') // returns: [<div class="maki" style="width: 20px; height: 100%;"></div>]
 */
function setSize(elements, width, height) {
  return setStyle(elements, { width: width, height: height });
}

/**
 * Set the provided width to elements.
 * @param {(string|Array|NodeList|HTMLCollection)} elements - The iterable, selector or elements.
 * @param {(number|string)} width - The width as number or string. For number, unit used will be pixels.
 * @return {(Array|NodeList|HTMLCollection)} domElements - The array or nodelist of dom elements from elements.
 * @example //esnext
 * import { append, setWidth } from 'chirashi'
 *
 * append(document.body, '.maki')
 *
 * setWidth('.maki', 20) // returns: [<div class="maki" style="width: 20px;"></div>]
 * setWidth('.maki', '100%') // returns: [<div class="maki" style="width: 100%;"></div>]
 * @example //es5
 * Chirashi.append(document.body, '.maki')
 *
 * Chirashi.setWidth('.maki', 20) // returns: [<div class="maki" style="width: 20px;"></div>]
 * Chirashi.setWidth('.maki', '100%') // returns: [<div class="maki" style="width: 100%;"></div>]
 */
function setWidth(elements, width) {
  return setStyle(elements, { width: width });
}

/**
 * Show each element of elements using visibility.
 * @param {(string|Array|NodeList|HTMLCollection)} elements - The iterable, selector or elements.
 * @return {(Array|NodeList|HTMLCollection)} domElements - The array or nodelist of dom elements from elements.
 * @example //esnext
 * import { append, show, getStyle }
 * append(document.body, '.maki')
 * const maki = show('.maki')
 * getStyle(maki, 'visibility') // returns: "hidden"
 * @example //es5
 * Chirashi.append(document.body, '.maki')
 * var maki = Chirashi.show('.maki')
 * Chirashi.getStyle(maki, 'visibility') // returns: "visible"
 */
function show(elements) {
  return setStyle(elements, { visibility: 'visible' });
}

function _getValues(transformation, axes, name, defaultVal, defaultAxes) {
  var values = {};

  if (name in transformation) {
    if (_typeof(transformation[name]) === 'object') {
      forEach(axes, function (axe) {
        values['' + name + axe.toUpperCase()] = axe in transformation[name] ? transformation[name][axe] : defaultVal;
      });
    } else {
      forEach(axes, function (axe) {
        values['' + name + axe.toUpperCase()] = defaultAxes[axe];
      });
    }
  } else {
    forEach(axes, function (axe) {
      values['' + name + axe.toUpperCase()] = defaultVal;
    });
  }

  return values;
}

function _transformMatrix(transformation) {
  var x = 'x' in transformation ? transformation.x : 0;
  var y = 'y' in transformation ? transformation.y : 0;
  var z = 'z' in transformation ? transformation.z : 0;

  var _getValues2 = _getValues(transformation, ['x', 'y', 'z'], 'scale', 1, { x: transformation.scale, y: transformation.scale, z: 1 }),
      scaleX = _getValues2.scaleX,
      scaleY = _getValues2.scaleY,
      scaleZ = _getValues2.scaleZ;

  var _getValues3 = _getValues(transformation, ['x', 'y', 'z'], 'rotate', 0, { x: 0, y: 0, z: transformation.rotate }),
      rotateX = _getValues3.rotateX,
      rotateY = _getValues3.rotateY,
      rotateZ = _getValues3.rotateZ;

  var _getValues4 = _getValues(transformation, ['x', 'y'], 'skew', 0, { x: transformation.skew, y: transformation.skew }),
      skewX = _getValues4.skewX,
      skewY = _getValues4.skewY;

  var cosRotateX = Math.cos(rotateX);
  var sinRotateX = Math.sin(rotateX);
  var cosRotateY = Math.cos(rotateY);
  var sinRotateY = Math.sin(rotateY);
  var cosRotateZ = Math.cos(rotateZ);
  var sinRotateZ = Math.sin(rotateZ);
  var tanSkewX = Math.tan(skewX);
  var tanSkewY = Math.tan(skewY);

  var matrix = [scaleX * cosRotateY * cosRotateZ, sinRotateZ + tanSkewY, -sinRotateY, 0, -sinRotateZ + tanSkewX, scaleY * cosRotateX * cosRotateZ, sinRotateX, 0, sinRotateY, -sinRotateX, scaleZ * cosRotateX * cosRotateY, 0, x, y, z, 1];

  forEach(matrix, function (item, index) {
    matrix[index] = +item.toFixed(2);
  });

  return matrix;
}

/**
 * Compute and apply 3d transform matrix from provided transformation to each element of elements.
 * @param {(string|Array|NodeList|HTMLCollection)} elements - The iterable or selector.
 * @param {Transformation} transformation - The transformation as an object
 * @return {(Array|NodeList|HTMLCollection)} domElements - The array or nodelist of dom elements from elements.
 * @return {function} domElements.chrshPush - Methods to push dom elements into the array. Accepts same input as getElements.
 * @example //esnext
 * import { createElement, setHtml, transform } from 'chirashi'
 * const wasabiPea = createElement('p')
 * setHtml(wasabiPea, 'Wasabi')
 * transform(wasabiPea, {}) // returns: [<p style="transform: "matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1)">Wasabi</p>]
 * transform(wasabiPea, {x: 5, y: 6, z: 7}) // returns: [<p style="transform: "matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,5,6,7,1)">Wasabi</p>]
 * transform(wasabiPea, {scale: 2}) // returns: [<p style="transform: "matrix3d(2,0,0,0,0,2,0,0,0,0,1,0,0,0,0,1)">Wasabi</p>]
 * transform(wasabiPea, {scale: {x: 2, y: 3, z: 4}}) // returns: [<p style="transform: "matrix3d(2,0,0,0,0,3,0,0,0,0,4,0,0,0,0,1)">Wasabi</p>]
 * transform(wasabiPea, {rotate: 45}) // returns: [<p style="transform: "matrix3d(0.53,0.85,0,0,-0.85,0.53,0,0,0,0,1,0,0,0,0,1)">Wasabi</p>]
 * transform(wasabiPea, {rotate: {x: 45, y: 20, z: 15}}) // returns: [<p style="transform: "matrix3d(-0.31,0.65,-0.91,0,-0.65,-0.4,0.85,0,0.91,-0.85,0.21,0,0,0,0,1)">Wasabi</p>]
 * transform(wasabiPea, {skew: 45}) // returns: [<p style="transform: "matrix3d(1,1.62,0,0,1.62,1,0,0,0,0,1,0,0,0,0,1)">Wasabi</p>]
 * transform(wasabiPea, {skew: {x: 25, y: 45}}) // returns: [<p style="transform: "matrix3d(1,1.62,0,0,-0.13,1,0,0,0,0,1,0,0,0,0,1)">Wasabi</p>]
 * transform(wasabiPea, {x: 5, y: 6, z: 7, scale: {x: 2, y: 3}, rotate: {x: 45, y: 20, z: 15}, skew: {x: 25, y: 45}}) // returns: [<p style="transform: "matrix3d(-0.62,2.27,-0.91,0,-0.78,-1.2,0.85,0,0.91,-0.85,0.21,0,5,6,7,1)">Wasabi</p>]
 * @example //es5
 * var wasabiPea = Chirashi.createElement('p')
 * Chirashi.setHtml(wasabiPea, 'Wasabi')
 * Chirashi.transform(wasabiPea, {}) // returns: [<p style="transform: "matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1)">Wasabi</p>]
 * Chirashi.transform(wasabiPea, {x: 5, y: 6, z: 7}) // returns: [<p style="transform: "matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,5,6,7,1)">Wasabi</p>]
 * Chirashi.transform(wasabiPea, {scale: 2}) // returns: [<p style="transform: "matrix3d(2,0,0,0,0,2,0,0,0,0,1,0,0,0,0,1)">Wasabi</p>]
 * Chirashi.transform(wasabiPea, {scale: {x: 2, y: 3, z: 4}}) // returns: [<p style="transform: "matrix3d(2,0,0,0,0,3,0,0,0,0,4,0,0,0,0,1)">Wasabi</p>]
 * Chirashi.transform(wasabiPea, {rotate: 45}) // returns: [<p style="transform: "matrix3d(0.53,0.85,0,0,-0.85,0.53,0,0,0,0,1,0,0,0,0,1)">Wasabi</p>]
 * Chirashi.transform(wasabiPea, {rotate: {x: 45, y: 20, z: 15}}) // returns: [<p style="transform: "matrix3d(-0.31,0.65,-0.91,0,-0.65,-0.4,0.85,0,0.91,-0.85,0.21,0,0,0,0,1)">Wasabi</p>]
 * Chirashi.transform(wasabiPea, {skew: 45}) // returns: [<p style="transform: "matrix3d(1,1.62,0,0,1.62,1,0,0,0,0,1,0,0,0,0,1)">Wasabi</p>]
 * Chirashi.transform(wasabiPea, {skew: {x: 25, y: 45}}) // returns: [<p style="transform: "matrix3d(1,1.62,0,0,-0.13,1,0,0,0,0,1,0,0,0,0,1)">Wasabi</p>]
 * Chirashi.transform(wasabiPea, {x: 5, y: 6, z: 7, scale: {x: 2, y: 3}, rotate: {x: 45, y: 20, z: 15}, skew: {x: 25, y: 45}}) // returns: [<p style="transform: "matrix3d(-0.62,2.27,-0.91,0,-0.78,-1.2,0.85,0,0.91,-0.85,0.21,0,5,6,7,1)">Wasabi</p>]
 */
function transform(elements, transformation) {
  return setStyle(elements, { transform: 'matrix3d(' + _transformMatrix(transformation).join(',') + ')' });
}

/**
 * @typedef {Object} Transformation
 * @property {number} [x=0] - Translation value on x axis in pixels.
 * @property {number} [y=0] - Translation value on y axis in pixels.
 * @property {number} [z=0] - Translation value on z axis in pixels.
 * @property {(number|object)} [scale=1] - Scale value for x and y axes or object of values for axes.
 * @property {number} [scale.x=1] - Scale value on x axis.
 * @property {number} [scale.y=1] - Scale value on y axis.
 * @property {number} [scale.z=1] - Scale value on z axis.
 * @property {(number|object)} [rotate=0] - Rotation value for z axis in radians or object of values for axes.
 * @property {number} [rotate.x=0] - Rotation value on x axis in radians.
 * @property {number} [rotate.y=0] - Rotation value on y axis in radians.
 * @property {number} [rotate.z=0] - Rotation value on z axis in radians.
 * @property {(number|object)} [skew=0] - Skew value for x and y axes in radians or object of values for axes.
 * @property {number} [skew.x=0] - Skew value on x axis in radians.
 * @property {number} [skew.y=0] - Skew value on y axis in radians.
 */

exports.forEach = forEach;
exports.forElements = forElements;
exports.forIn = forIn;
exports.getElement = getElement;
exports.getElements = getElements;
exports.isDomElement = isDomElement;
exports.addClass = addClass;
exports.append = append;
exports.children = children;
exports.clone = clone;
exports.closest = closest;
exports.createElement = createElement;
exports.filter = filter;
exports.find = find;
exports.findOne = findOne;
exports.getAttr = getAttr;
exports.getData = getData;
exports.getHtml = getHtml;
exports.getProp = getProp;
exports.hasClass = hasClass;
exports.indexInParent = indexInParent;
exports.insertAfter = insertAfter;
exports.insertBefore = insertBefore;
exports.next = next;
exports.parent = parent;
exports.prev = prev;
exports.remove = remove;
exports.removeAttr = removeAttr;
exports.removeClass = removeClass;
exports.removeData = removeData;
exports.setAttr = setAttr;
exports.setData = setData;
exports.setHtml = setHtml;
exports.setProp = setProp;
exports.toggleClass = toggleClass;
exports.bind = bind;
exports.on = on;
exports.once = once;
exports.ready = ready;
exports.trigger = trigger;
exports.clearStyle = clearStyle;
exports.clientRect = clientRect;
exports.getHeight = getHeight;
exports.getSize = getSize;
exports.getStyle = getStyle;
exports.getWidth = getWidth;
exports.hide = hide;
exports.offset = offset;
exports.position = position;
exports.screenPosition = screenPosition;
exports.setHeight = setHeight;
exports.setSize = setSize;
exports.setStyle = setStyle;
exports.setWidth = setWidth;
exports.show = show;
exports.transform = transform;
