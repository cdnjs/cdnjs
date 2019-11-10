/**
 * Chirashi.js v6.5.0-rc
 * (c) 2017 Alex Toudic
 * Released under MIT License.
 **/

(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.Chirashi = global.Chirashi || {})));
}(this, (function (exports) { 'use strict';

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
 * @return {*} iterable - items if it's an array-like or an array containing items.
 * @example //esnext
 * import { forEach } from 'chirashi'
 *
 * const items = forEach([0, 1, 2], (item, i) => console.log(`${i}: ${item + 1}`)) //returns: [0, 1, 2]
 * // logs:
 * //   0: 1
 * //   1: 2
 * //   2: 3
 * forEach(0, (item, i) => console.log(`${i}: ${item + 1}`)) //returns: [0]
 * //   0: 1
 * @example //es5
 * var items = Chirashi.forEach([0, 1, 2], function (item, i) { console.log(i+': '+(item + 1)) }) //returns: [0, 1, 2]
 * // logs:
 * //   0: 1
 * //   1: 2
 * //   2: 3
 * Chirashi.forEach(0, function (item, i) { console.log(i+': '+(item + 1)) }) //returns: [0]
 * // logs:
 * //   0: 1
 */
function forEach(items, callback) {
  if (!items) return [];

  if ((typeof items === 'undefined' ? 'undefined' : _typeof(items)) !== 'object' || !('length' in items)) {
    items = [items];
  }

  var n = items.length;
  for (var i = 0; i < n; ++i) {
    callback(items[i], i);
  }return items;
}

/**
* Callback to apply on item.
* @callback forEachCallback
* @param {*} item
* @param {number} index - Index of item in items.
*/

var _breakingMethods = ['push', 'splice', 'unshift'];

function _overloadMethod(array, method) {
  array[method] = function () {
    this['_chrsh-valid'] = false;

    return Array.prototype[method].apply(this, arguments);
  };
}

function _chirasizeArray(array) {
  forEach(_breakingMethods, _overloadMethod.bind(null, array));

  array['_chrsh-valid'] = true;

  return array;
}

function _nodelistToArray(collection) {
  var arr = [];

  var i = -1;
  while (arr[++i] = collection[i]) {}

  arr.length--;

  return _chirasizeArray(arr);
}

var reg = /^[.#]?[\w-_]+$/;

function _getElements(from, selector) {
  if (selector.search(reg) === 0) {
    switch (selector[0]) {
      case '.':
        return _nodelistToArray(from.getElementsByClassName(selector.slice(1)));
      case '#':
        var element = from === document ? from.getElementById(selector.slice(1)) : from.querySelector(selector);
        return _chirasizeArray(element ? [element] : []);
      default:
        return _nodelistToArray(from.getElementsByTagName(selector));
    }
  }

  return _nodelistToArray(from.querySelectorAll(selector));
}

/**
 * Test if element is a dom element. Doesn't resolve selectors.
 * @param {*} element - The element to test.
 * @return {boolean} isDomElement - true if element is an instance of Node or Window.
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
  return !!element && (!!element.nodeType || element === window);
}

/**
 * Get dom element recursively from iterable or selector.
 * @param {(string|Array|NodeList|HTMLCollection|Window|Node)} input - The iterable, selector or elements.
 * @return {Array} domElements - The array of dom elements from input.
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
    return _getElements(document, input);
  }

  if (input instanceof window.NodeList || input instanceof window.HTMLCollection) {
    return _nodelistToArray(input);
  }

  if (input instanceof Array) {
    if (input['_chrsh-valid']) {
      return input;
    }

    var output = [];
    forEach(input, _pushRecursive.bind(null, output));

    return _chirasizeArray(output);
  }

  return _chirasizeArray(isDomElement(input) ? [input] : []);
}

function _pushRecursive(output, element) {
  output.push.apply(output, getElements(element));
}

/**
 * Iterates over dom elements and apply callback on each one.
 * @param {(string|Array|NodeList|HTMLCollection|Window|Node)} elements - The iterable, selector or elements. Note that it'll be passed to getElements.
 * @param {forElementsCallback} callback - The function to call for each element.
 * @return {Array} iterable - The getElements' result for chaining.
 * @example //esnext
 * import { createElement, append, forElements } from 'chirashi'
 * const sushi = createElement('.sushi')
 * const unagi = createElement('.unagi')
 * const yakitori = createElement('.yakitori')
 * const sashimi = createElement('.sashimi')
 * append(document.body, [sushi, unagi, yakitori, sashimi])
 * forElements('div', console.log) //returns: [<div class="sushi"></div>, <div class="unagi"></div>, <div class="yakitori"></div>, <div class="sashimi"></div>]
 * // logs:
 * // <div class="sushi"></div> 0
 * // <div class="unagi"></div> 1
 * // <div class="yakitori"></div> 2
 * // <div class="sashimi"></div> 3
 * forElements([yakitori, sashimi], console.log) //returns: [<div class="yakitori"></div>, <div class="sashimi"></div>]
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
 * // <div class="sushi"></div> 0
 * // <div class="unagi"></div> 1
 * // <div class="yakitori"></div> 2
 * // <div class="sashimi"></div> 3
 * Chirashi.forElements([yakitori, sashimi], console.log) //returns: [<div class="yakitori"></div>, <div class="sashimi"></div>]
 * // logs:
 * // <div class="yakitori"></div> 0
 * // <div class="sashimi"></div> 1
 */
function forElements(elements, callback) {
  return forEach(getElements(elements), callback);
}

/**
 * Callback to apply on element.
 * @callback forElementsCallback
 * @param {Window | document | HTMLElement | SVGElement | Text} element
 * @param {number} index - Index of element in elements.
 */

/**
 * Iterates over object's keys and apply callback on each one.
 * @param {Object} object - The iterable.
 * @param {forInCallback} callback - The function to call for each key-value pair.
 * @return {Object} object - The iterable for chaining.
 * @example //esnext
 * import { forIn } from 'chirashi'
 * const californiaRoll = { name: 'California Roll', price: 4.25, recipe: ['avocado', 'cucumber', 'crab', 'mayonnaise', 'sushi rice', 'seaweed'] }
 * forIn(californiaRoll, (key, value) => {
 *   console.log(`${key} -> ${value}`)
 * }) //returns: { name: 'California Roll', price: 4.25, recipe: ['avocado', 'cucumber', 'crab', 'mayonnaise', 'sushi rice', 'seaweed'] }
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
 * // name -> California Roll
 * // price -> 4.25
 * // recipe -> ['avocado', 'cucumber', 'crab', 'mayonnaise', 'sushi rice', 'seaweed']
 */
function forIn(object, callback) {
  if ((typeof object === 'undefined' ? 'undefined' : _typeof(object)) !== 'object') return;

  forEach(Object.keys(object), _forKey.bind(null, object, callback));

  return object;
}

function _forKey(object, callback, key) {
  callback(key, object[key]);
}

/**
 * Callback to apply on each key-value pair.
 * @callback forInCallback
 * @param {string} key
 * @param {*} value
 */

var reg$1 = /^[.#]?[\w-_]+$/;

function _getElement(from, selector) {
  if (selector.search(reg$1) === 0) {
    switch (selector[0]) {
      case '.':
        return from.getElementsByClassName(selector.slice(1))[0];
      case '#':
        return from === document ? from.getElementById(selector.slice(1)) : from.querySelector(selector);
      default:
        return from.getElementsByTagName(selector)[0];
    }
  }

  return from.querySelector(selector);
}

/**
 * Get first dom element from iterable or selector.
 * @param {(string|Array|NodeList|HTMLCollection|Window|Node)} input - The iterable, selector or elements.
 * @return {(Window|Node|boolean)} element - The dom element from input.
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
    return _getElement(document, input);
  }

  if (input instanceof window.NodeList || input instanceof window.HTMLCollection) {
    return input[0];
  }

  if (input instanceof Array) {
    return getElement(input[0]);
  }

  return isDomElement(input) && input;
}

function _updateOne(method, classes, element) {
  element.classList[method].apply(element.classList, classes);
}

function _updateClassList(elements, method, classes) {
  return forElements(elements, _updateOne.bind(null, method, classes));
}

/**
 * Iterates over classes and add it on each element of elements or ignore it if already set.
 * @param {(string|Array|NodeList|HTMLCollection|Element)} elements - The iterable, selector or elements.
 * @param {...string} classes - Classes to add.
 * @return {Array} iterable - The getElements' result for chaining.
 * @example //esnext
 * import { createElement, addClass } from 'chirashi'
 * const maki = createElement('.maki')
 * addClass(maki, 'wasabi') //returns: <div class="wasabi"></div>
 * addClass(maki, 'seaweed', 'cheese') //returns: <div class="wasabi seaweed cheese"></div>
 * addClass('.maki', 'avocado', 'salmon') //returns: <div class="wasabi seaweed cheese avocado salmon"></div>
 * @example //es5
 * var maki = Chirashi.createElement('.maki')
 * Chirashi.addClass(maki, 'wasabi') //returns: <div class="wasabi"></div>
 * Chirashi.addClass(maki, 'seaweed', 'cheese') //returns: <div class="wasabi seaweed cheese"></div>
 * Chirashi.addClass('.maki', 'avocado', 'salmon') //returns: <div class="wasabi seaweed cheese avocado salmon"></div>
 */
function addClass(elements) {
  for (var _len = arguments.length, classes = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    classes[_key - 1] = arguments[_key];
  }

  return _updateClassList(elements, 'add', classes);
}

var regex = /[#.]?([\w-_]+)|\[([\w-_]+)(="([\w.,;:{}'/\\#!@_&?%=<>-\s]+)?")?]|{([\w.,;:{}/\\'"#!@_&?%=<>-\s]+)}/g;

/**
 * Creates a dom element from an HTML string, tag or css like selector with text between {} if needed.
 * @param {string} string - The html string, tag or css like selector.
 * @return {Element} element - The dom element created from the string.
 * @example //esnext
 * import { createElement } from 'chirashi'
 * const maki = createElement('a#sushi.link[data-href="chirashijs.org"][data-link]{click me!}') //returns: <a class="link" id="sushi" data-href="chirashijs.org" data-link>click me!</a>
 * const greetings = createElement('<h1>Hello <strong>World</strong>!</h1>') //returns: <h1>Hello <strong>World</strong>!</h1>
 * @example //es5
 * var maki = Chirashi.createElement('a#sushi.link[data-href="chirashijs.org"][data-link]{click me!}') //returns: <a class="link" id="sushi" data-href="chirashijs.org" data-link>click me!</a>
 * var greetings = Chirashi.createElement('<h1>Hello <strong>World</strong>!</h1>') //returns: <h1>Hello <strong>World</strong>!</h1>
 */
function createElement(string) {
  regex.lastIndex = 0;

  if (string.indexOf('<') !== 0) {
    var core = null;

    var attributes = '';
    var className = '';
    var text = '';

    var segment = void 0;
    while (segment = regex.exec(string)) {
      if (segment[1]) {
        switch (segment[0][0]) {
          case '#':
            attributes += ' id="' + segment[1] + '"';
            break;

          case '.':
            className += ' ' + segment[1];
            break;

          default:
            core = segment[1];
        }
      } else if (segment[2]) {
        attributes += ' ' + segment[2] + (segment[4] ? '="' + segment[4] + '"' : '');
      } else {
        text = segment[5];
      }
    }

    if (core === null) core = 'div';

    string = '<' + core + (className ? ' class="' + className.slice(1) + '"' : '') + attributes + '>' + text + '</' + core + '>';
  }

  var temp = document.createElement('div');
  temp.innerHTML = string;

  var element = temp.firstChild;

  return element;
}

/**
 * Appends each node to a parent node.
 * @param {(string|Array|NodeList|HTMLCollection|Node)} element - The parent node. Note that it'll be passed to getElement to ensure there's only one.
 * @param {(string|Array.<(string|Node)>|Node)} nodes - String, node or array of nodes and/or strings. Each string will be passed to createElement then append.
 * @return {(Node|boolean)} node - The node for chaining or false if nodes can't be appended.
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

  forEach(nodes, _appendOne.bind(null, element));

  return element;
}

function _appendOne(element, node) {
  element.appendChild(typeof node === 'string' ? createElement(node) : node);
}

function _getOneOrMore(args, execute) {
  if (args.length === 1) {
    return execute(args[0]);
  } else {
    var ret = {};
    forEach(args, _injectIntoObject.bind(null, ret, execute));

    return ret;
  }
}

function _injectIntoObject(ret, execute, arg) {
  ret[arg] = execute(arg);
}

function _getOneOrMoreFromElement(execute, element) {
  for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    args[_key - 2] = arguments[_key];
  }

  return !!(element = getElement(element)) && _getOneOrMore(args, execute.bind(null, element));
}

/**
 * Get the value for the property name on the element.
 * @param {(string|Array|NodeList|HTMLCollection|Window|Node)} element - The element. Note that it'll be passed to getElement to ensure there's only one.
 * @param {string} ...properties - The properties' names.
 * @return {*} value - The value for property on element if only one property, object of property-value pairs or false if no element found.
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
var getProp = _getOneOrMoreFromElement.bind(null, _getProperty);
function _getProperty(element, property) {
  return element[property];
}

/**
 * Returns an element's children as Array.
 * @param {(string|Array|NodeList|HTMLCollection|Node)} element - The parent node. Note that it'll be passed to getElement to ensure there's only one.
 * @return {Array.<Element>} children - Element's children as array.
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
  return _nodelistToArray(getProp(element, 'children'));
}

/**
 * Clones element.
 * @param {(string|Array|NodeList|HTMLCollection|Node)} element - The node to clone. Note that it'll be passed to getElement to ensure there's only one.
 * @return {(Node|boolean)} clone - element's clone or false if element isn't a node.
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
  return !!(element = getElement(element)) && 'cloneNode' in element && element.cloneNode(true);
}

/**
 * Get closest element matching the tested selector or tested element traveling up the DOM tree from element to limit.
 * @param {(string|Array|NodeList|HTMLCollection|Element)} element - First tested element. Note that it'll be passed to getElement to ensure there's only one.
 * @param {(string|Element)} tested - The selector or dom element to match.
 * @param {(string|Node)} [limit=document] - Returns false when this selector or element is reached.
 * @return {(Element|boolean)} matchedElement - The matched element or false.
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
 * Remove every child of elements.
 * @param {(string|Array|NodeList|HTMLCollection|Node)} elements - The iterable, selector or elements. Note that it'll be passed to getElements.
 * @return {Array} iterable - The getElements' result for chaining.
 * @example //esnext
 * import { createElement, append, empty } from 'chirashi'
 * const maki = createElement('.maki') //returns: <div class="maki"></div>
 * append(maki, '.cheese') //returns: <div class="maki"><div class="cheese"></div></div>
 * empty(maki) //returns: [<div class="maki"></div>]
 * @example //es5
 * const maki = Chirashi.createElement('.maki') //returns: <div class="maki"></div>
 * Chirashi.append(maki, '.cheese') //returns: <div class="maki"><div class="cheese"></div></div>
 * Chirashi.empty(maki) //returns: [<div class="maki"></div>]
 */
function empty(elements) {
  return forElements(elements, _removeChildren);
}

function _removeChildren(element) {
  var child = void 0;
  while (child = element.firstChild) {
    element.removeChild(child);
  }
}

function _applyOnElements(method, elements, selector) {
  var found = [];

  forElements(elements, method.bind(null, found, selector));

  return _chirasizeArray(found);
}

/**
 * Iterates over elements, returning an array of all elements matching tested selector.
 * @param {(string|Array|NodeList|HTMLCollection|Element)} elements - The iterable, selector or elements. Note that it'll be passed to getElements.
 * @param {(string|Element)} tested - The selector or dom element to match.
 * @return {Array.<Element>} matching - The array of filtered elements.
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
var filter = _applyOnElements.bind(null, _checkOne);
function _checkOne(matching, tested, element) {
  if (typeof tested === 'string' && 'matches' in element && element.matches(tested) || element === tested) {
    matching.push(element);
  }
}

/**
 * Iterates over each element of elements and returns an array containing all elements' children matching a selector.
 * @param {(string|Array|NodeList|HTMLCollection|Element|Document|ParentNode)} elements - The iterable, selector or parent elements. Note that it'll be passed to getElements.
 * @param {string} selector - The selector.
 * @return {Array.<Element>} found - The array of elements' descendants matching the selector.
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
var find = _applyOnElements.bind(null, _findFromOne);
function _findFromOne(found, selector, element) {
  found.push.apply(found, _getElements(element, selector));
}

/**
 * Find the first element's child matching the selector.
 * @param {(string|Array|NodeList|HTMLCollection|Element|Document|ParentNode)} element - The parent node. Note that it'll be passed to getElement to ensure there's only one.
 * @param {string} selector - The selector to match.
 * @return {(Element|null)} element - The first child of elements matching the selector or null.
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
  return (element = getElement(element)) ? _getElement(element, selector) : null;
}

/**
 * Get value for named attribute of element.
 * @param {(string|Array|NodeList|HTMLCollection|Element)} element - The element. Note that it'll be passed to getElement to ensure there's only one.
 * @param {...string} names - The attributes' names.
 * @return {(Object<string, (string|boolean)>|string|boolean)} value - The value for the attribute if only one name, object of attributes' name-value pairs or false if no element found.
 * @example //esnext
 * import { createElement, getAttr } from 'chirashi'
 * const maki = createElement('.maki[data-fish="salmon"]')
 * getAttr(maki, 'data-fish') //returns: "salmon"
 * @example //es5
 * const maki = Chirashi.createElement('.maki[data-fish="salmon"]')
 * Chirashi.getAttr(maki, 'data-fish') //returns: "salmon"
 */
var getAttr = _getOneOrMoreFromElement.bind(null, _getAttribute);
function _getAttribute(element, name) {
  return element.getAttribute(name);
}

/**
 * Alias on getAttr prefixing name with 'data-'.
 * @param {(string|Array|NodeList|HTMLCollection|Element)} element - The element. Note that it'll be passed to getElement to ensure there's only one.
 * @param {...string} names - The data-attributes' names.
 * @return {(Object<string, (string|boolean)>|string|boolean)} value - The value for the data-attribute if only one name, object of data-attributes' name-value pairs or false if no element found.
 * @example //esnext
 * import { createElement, getData } from 'chirashi'
 * const maki = createElement('.maki[data-fish="salmon"]')
 * getData(maki, 'fish') //returns: "salmon"
 * @example //es5
 * const maki = Chirashi.createElement('.maki[data-fish="salmon"]')
 * Chirashi.getData(maki, 'fish') //returns: "salmon"
 */
var getData = _getOneOrMoreFromElement.bind(null, _getDataAttribute);
function _getDataAttribute(element, name) {
  return element.getAttribute('data-' + name);
}

/**
 * Get the inner html of an element.
 * @param {(string|Array|NodeList|HTMLCollection|Element)} element - The element. Note that it'll be passed to getElement to ensure there's only one.
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

/**
 * Iterates over classes and test if element has each.
 * @param {(string|Array|NodeList|HTMLCollection|Element)} elements - The iterable, selector or elements.
 * @param {...string} classes - Classes to test.
 * @return {boolean} hasClass - Is true if element has all classes.
 * @example //esnext
 * import { createElement, hasClass } from 'chirashi'
 * const maki = createElement('.salmon.cheese.maki')
 * hasClass(maki, 'salmon', 'cheese') //returns: true
 * hasClass(maki, 'salmon', 'avocado') //returns: false
 * @example //es5
 * var maki = Chirashi.createElement('.salmon.cheese.maki')
 * Chirashi.hasClass(maki, 'salmon', 'cheese') //returns: true
 * Chirashi.hasClass(maki, 'salmon', 'avocado') //returns: false
 */
function hasClass(element) {
  element = getElement(element);
  if (!element) return;

  var n = arguments.length <= 1 ? 0 : arguments.length - 1;
  var found = void 0;
  var i = 0;
  while (i < n && (found = element.classList.contains((_ref = i++ + 1, arguments.length <= _ref ? undefined : arguments[_ref])))) {
    var _ref;
  }

  return found;
}

/**
 * Returns index of element in parent's children.
 * * @param {(string|Array|NodeList|HTMLCollection|NonDocumentTypeChildNode)} element - The element. Note that it'll be passed to getElement to ensure there's only one.
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

  var i = void 0,
      current = void 0;
  for (i = 0, current = element; current = current.previousElementSibling; ++i) {}

  return i;
}

function _nodeInsertion(method, element, nodes) {
  element = getElement(element);

  if (!element || !('parentNode' in element)) return;

  var parent = element.parentNode;

  forEach(nodes, method.bind(null, parent, element));

  return element;
}

/**
 * Insert nodes after element in his parent.
 * @param {(string|Array|NodeList|HTMLCollection|NonDocumentTypeChildNode)} element - The element. Note that it'll be passed to getElement to ensure there's only one.
 * @param {(Array<(string|Node)>|string|Node)} nodes - Array of dom elements or string to create it using createElement.
 * @return {(Node|undefined)} element - The element for chaining or undefined if no element found or element has no parent.
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
var insertAfter = _nodeInsertion.bind(null, _insertAfter);
function _insertAfter(parent, element, node) {
  parent.insertBefore(typeof node === 'string' ? createElement(node) : node, element.nextElementSibling);
}

/**
 * Insert nodes before element in his parent.
 * @param {(string|Array|NodeList|HTMLCollection|NonDocumentTypeChildNode)} element - The element. Note that it'll be passed to getElement to ensure there's only one.
 * @param {(Array<(string|Node)>|string|Node)} nodes - Array of dom elements or string to create it using createElement.
 * @return {(Node|undefined)} element - The element for chaining or undefined if no element found or element has no parent.
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
var insertBefore = _nodeInsertion.bind(null, _insertBefore);
function _insertBefore(parent, element, node) {
  parent.insertBefore(typeof node === 'string' ? createElement(node) : node, element);
}

/**
 * Get the next sibling of element.
 * @param {(string|Array|NodeList|HTMLCollection|NonDocumentTypeChildNode)} element - The element. Note that it'll be passed to getElement to ensure there's only one.
 * @return {(Node|null)} nextElement - The element's next sibling or null if no element found.
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
 * @param {(string|Array|NodeList|HTMLCollection|Node)} element - The element. Note that it'll be passed to getElement to ensure there's only one.
 * @return {(document|Element|null)} parentElement - The parent node or null if no element found.
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
 * Returns an array of every element's ancestors.
 * @param {(string|Array|NodeList|HTMLCollection|Node)} element - The element. Note that it'll be passed to getElement to ensure there's only one.
 * @return {Array.<Node>} parents - Array of element's ancestors.
 * @example //esnext
 * import { createElement, append, parents } from 'chirashi'
 * const maki = createElement('.maki')
 * append(document.body, maki)
 * append(maki, '.salmon[data-fish="salmon"]') //returns: <div class="maki"><div class="salmon" data-fish="salmon"></div></div>
 * parents('.salmon') //returns: [<div class="maki">...</div>, <body>...</body>, <html>...</html>, document]
 * @example //es5
 * var maki = Chirashi.createElement('.maki')
 * append(maki
 * Chirashi.append(document.body, maki)
 * Chirashi.append(maki, '.salmon[data-fish="salmon"]') //returns: <div class="maki"><div class="salmon" data-fish="salmon"></div></div>
 * Chirashi.parents('.salmon') //returns: [<div class="maki">...</div>, <body>...</body>, <html>...</html>, document]
 */
function parents(element) {
  return _chirasizeArray(_getParents(getElement(element)));
}

function _getParents(element) {
  var arr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

  var parent = void 0;
  if (element && (parent = element.parentNode)) {
    arr.push(parent);

    return _getParents(parent, arr);
  }

  return arr;
}

/**
 * Get the previous sibling of element.
 * @param {(string|Array|NodeList|HTMLCollection|NonDocumentTypeChildNode)} element - The element. Note that it'll be passed to getElement to ensure there's only one.
 * @return {(Node|null)} previousElement - The element's previous sibling or null if no element found.
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
 * @param {(string|Array|NodeList|HTMLCollection|Element)} elements - The iterable, selector or elements.
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
  return forElements(elements, _removeOne);
}

function _removeOne(element) {
  if (!element.parentNode) return;

  element.parentNode.removeChild(element);
}

function _applyArg(element, method, arg) {
  element[method](arg);
}

function _applyElement(method, args, element) {
  if (!element[method]) return;

  forEach(args, _applyArg.bind(null, element, method));
}

function _applyForEach(elements, method, args) {
  return forElements(elements, _applyElement.bind(null, method, args));
}

/**
 * Iterates over attributes and removes it from each element of elements.
 * @param {(string|Array|NodeList|HTMLCollection|Element)} elements - The iterable, selector or elements.
 * @param {...string} attributes - Names of attributes to remove.
 * @return {Array} iterable - The getElements' result for chaining.
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
function removeAttr(elements) {
  for (var _len = arguments.length, attributes = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    attributes[_key - 1] = arguments[_key];
  }

  return _applyForEach(elements, 'removeAttribute', attributes);
}

/**
 * Iterates over classes and remove it from each element of elements.
 * @param {(string|Array|NodeList|HTMLCollection|Element)} elements - The iterable, selector or elements.
 * @param {...string} classes - Classes to remove.
 * @return {Array} iterable - The getElements' result for chaining.
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
 * @param {(string|Array|NodeList|HTMLCollection|Element)} elements - The iterable, selector or elements.
 * @param {...string} attributes - Names of data attributes to remove.
 * @return {Array} iterable - The getElements' result for chaining.
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
function removeData(elements) {
  for (var _len = arguments.length, attributes = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    attributes[_key - 1] = arguments[_key];
  }

  forEach(attributes, _prefixAttr.bind(null, attributes));

  return _applyForEach(elements, 'removeAttribute', attributes);
}

function _prefixAttr(attributes, attr, index) {
  attributes[index] = 'data-' + attr;
}

function _parseAndApply(parse, apply, elements, options) {
  forIn(options, parse.bind(null, options));

  return forElements(elements, apply.bind(null, options));
}

/**
 * Iterates over attributes as key value pairs and apply on each element of elements.
 * @param {(string|Array|NodeList|HTMLCollection|Element)} elements - The iterable, selector or elements.
 * @param {Object.<string, (number|string)>} attributes - The attributes key value pairs.
 * @return {Array} iterable - The getElements' result for chaining.
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
var setAttr = _parseAndApply.bind(null, _stringifyValue, _setAttributes);
function _setAttributes(attributes, element) {
  forIn(attributes, element.setAttribute.bind(element));
}

function _stringifyValue(attributes, name, value) {
  if (typeof value !== 'string' && !(value instanceof Array)) {
    attributes[name] = JSON.stringify(value);
  }
}

/**
 * Iterates over data-attributes as key value pairs and apply on each element of elements.
 * @param {(string|Array|NodeList|HTMLCollection|Element)} elements - The iterable, selector or elements.
 * @param {Object.<string, (number|string)>} dataAttributes - The data-attributes key value pairs
 * @return {Array} iterable - The getElements' result for chaining.
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

  forIn(dataAttributes, _prefixAttribute.bind(null, attributes));

  return setAttr(elements, attributes);
}

function _prefixAttribute(attributes, name, value) {
  attributes['data-' + name] = value;
}

/**
 * Apply props as key value pairs on each element of elements.
 * @param {(string|Array|NodeList|HTMLCollection|Window|Node)} elements - The iterable, selector or elements.
 * @param {Object} props - The props key value pairs.
 * @return {Array} iterable - The getElements' result for chaining.
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
  return forElements(elements, _apply.bind(null, props));
}

function _apply(props, element) {
  Object.assign(element, props);
}

/**
 * Set the inner html of elements.
 * @param {(string|Array|NodeList|HTMLCollection|Element)} elements - The iterable, selector or elements.
 * @param {string} html - The html to insert.
 * @return {Array} iterable - The getElements' result for chaining.
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

var reg$2 = /[,\s]+/g;
function _stringToArray(input) {
  reg$2.lastIndex = 0;

  if (typeof input === 'string') {
    return input.search(reg$2) !== -1 ? input.split(reg$2) : [input];
  }

  return input;
}

/**
 * Iterates over classes and toggle it on each element of elements.
 * @param {(string|Array|NodeList|HTMLCollection|Element)} elements - The iterable, selector or elements.
 * @param {(string|Array|Object)} classes - Array of classes or string of classes seperated with comma and/or spaces. Or object with keys being the string of classes seperated with comma and/or spaces and values function returning a booleanean.
 * @return {Array} iterable - The getElements' result for chaining.
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
function toggleClass(elements) {
  for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  if (_typeof(args[0]) === 'object') {
    forIn(args[0], _toggleClassesWithForce.bind(null, elements));
  } else {
    forEach(args, _toggleClassName.bind(null, elements));
  }
}

function _toggleOne(className, element) {
  element.classList.toggle(className);
}

function _toggleClassName(elements, className) {
  forElements(elements, _toggleOne.bind(null, className));
}

function _toggleOneWithForce(className, force, element) {
  element.classList.toggle(className, force(element));
}

function _toggleClassNameWithForce(elements, force, className) {
  forElements(elements, _toggleOneWithForce.bind(null, className, force));
}

function _toggleClassesWithForce(elements, classNames, force) {
  forEach(_stringToArray(classNames), _toggleClassNameWithForce.bind(null, elements, force));
}

function _setEvent(method, callback, options, event, element) {
  element[method](event, callback, options);
}

function _setEventOnEach(elements, method, callback, options, event) {
  forEach(elements, _setEvent.bind(null, method, callback, options, event));
}

function _setInput(elements, method, events, options) {
  var callback = void 0;
  var passedOptions = void 0;
  if (typeof options === 'function') {
    callback = options;
    passedOptions = false;
  } else {
    callback = options.handler;
    passedOptions = _extends({}, options);
  }

  forEach(_stringToArray(events), _setEventOnEach.bind(null, elements, method, callback, passedOptions));
}

function _setEvents(elements, method, input) {
  method += 'EventListener';

  elements = getElements(elements);
  forIn(input, _setInput.bind(null, elements, method));

  return elements;
}

/**
 * Bind events listener on each element of elements.
 * @param {(string|Array|NodeList|HTMLCollection|EventTarget)} elements - The iterable, selector or elements.
 * @param {Object.<string, (eventCallback|EventObject)>} input - An object in which keys are events to bind seperated with coma and/or spaces and values are eventCallbacks or EventObjects.
 * @return {offCallback} off - The unbinding function.
 * @example //esnext
 * import { createElement, append, on, trigger } from 'chirashi'
 * const maki = createElement('a.cheese.maki')
 * const sushi = createElement('a.wasabi.sushi')
 * append(document.body, [maki, sushi])
 * const off = on('.cheese, .wasabi', {
 *   click(e, target) {
 *     console.log('clicked', target)
 *   },
 *   'mouseenter mousemove': {
 *     handler: (e, target) => {
 *       console.log('mouse in', target)
 *     },
 *     passive: true
 *   }
 * })
 * trigger(maki, 'click') //simulate user's click
 * // LOGS: "clicked" <a class="maki cheese"></a>
 * trigger(sushi, 'click') //simulate user's click
 * // LOGS: "clicked" <a class="sushi wasabi"></a>
 * off(maki, 'click') //remove click event listener on maki
 * off() //remove all listeners from all elements
 * @example //es5
 * var off = Chirashi.bind('.cheese, .wasabi', {
 *   'click': function (e, target) {
 *     console.log('clicked', target)
 *   },
 *   'mouseenter mousemove': {
 *     handler: (e, target) => {
 *       console.log('mouse in', target)
 *     },
 *     passive: true
 *   }
 * })
 * var maki = Chirashi.createElement('a.cheese.maki')
 * var sushi = Chirashi.createElement('a.wasabi.sushi')
 * Chirashi.append(document.body, [maki, sushi])
 * Chirashi.trigger(maki, 'click') //simulate user's click
 * // LOGS: "clicked" <a class="maki cheese"></a>
 * Chirashi.trigger(sushi, 'click') //simulate user's click
 * // LOGS: "clicked" <a class="sushi wasabi"></a>
 * off(maki, 'click') //remove click event listener on maki
 * off() //remove all listeners from all elements
 */
function on(elements, input) {
  elements = _setEvents(elements, 'add', input);

  return function (offElements, events) {
    _setEvents(offElements || elements, 'remove', events ? defineProperty({}, events, input[events]) : input);
  };
}

/**
 * Options to bind event.
 * @typedef {Object} EventObject
 * @property {eventCallback} handler - The callback to execute on event.
 * @property {boolean} [capture=false] - Indicates that events of this type will be dispatched to the registered listener before being dispatched to any EventTarget beneath it in the DOM tree.
 * @property {boolean} [once=false] - Indicates that the listener should be invoked at most once after being added. If it is true, the listener would be removed automatically when it is invoked.
 * @property {boolean} [passive=false] - Indicates that the listener will never call preventDefault(). If it does, the user agent should ignore it and generate a console warning.
 */

/**
 * Callback to execute on event.
 * @callback eventCallback
 * @param {Event} event - Triggered event.
 */

/**
 * Called to remove one or all events listeners of one or all elements.
 * @callback offCallback
 * @param {(string|Array|NodeList|HTMLCollection|EventTarget)} [offElements] - The iterable, selector or elements to unbind.
 * @param {string} [events] - The events to unbind. Must be provided in the same syntax as in input.
 */

/**
 * Delegate events listener on delegate and execute callback when target matches selector (targets doesn't have to be in the DOM).
 * @param {string} selector - The selector to match.
 * @param {Object.<string, delegateCallback>} input - An object in which keys are events to delegate seperated with coma and/or spaces and values are delegateCallbacks.
 * @param {(string|Array|NodeList|HTMLCollection|EventTarget)} [target=document.body] - The event target. Note that it'll be passed to getElement to ensure there's only one.
 * @return {offCallback} off - The unbind function.
 * @example //esnext
 * import { createElement, append, delegate, trigger } from 'chirashi'
 * const off = delegate('.cheese, .wasabi', {
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
 * off('mouseenter mousemove') //remove mouseenter and mousemove listeners
 * off() //remove all listeners
 * @example //es5
 * var off = Chirashi.delegate('.cheese, .wasabi', {
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
 * off('mouseenter mousemove') //remove mouseenter and mousemove listeners
 * off() //remove all listeners
 */
function delegate(selector, input) {
  var target = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : document.body;

  target = getElement(target);

  var eventsObj = {};
  forIn(input, _wrapOptions.bind(null, selector, target, eventsObj));

  var off = on(target, eventsObj);

  return function (events) {
    off(target, events);
  };
}

function _wrapOptions(selector, target, eventsObj, events, options) {
  if (typeof options === 'function') {
    eventsObj[events] = _wrapCallback(selector, target, options);
  } else {
    eventsObj[events] = _extends({}, options, {
      handler: _wrapCallback(selector, target, options.handler)
    });
  }
}

function _wrapCallback(selector, target, callback) {
  return function (event) {
    var currentTarget = closest(event.target, selector, target);
    if (currentTarget) callback(event, currentTarget);
  };
}

/**
* Callback to execute on event using delegate.
* @callback delegateCallback
* @param {Event} event - Triggered event.
* @param {HTMLElement | SVGElement} target - Target of the event.
*/

/**
* Called to off one or all events.
* @callback offCallback
* @param {string} [events] - The events to off. Must be provided in the same syntax as in input.
*/

/**
 * Bind events listener on each element of elements and unbind after first triggered.
 * @param {(string|Array|NodeList|HTMLCollection|EventTarget)} elements - The iterable, selector or elements.
 * @param {Object.<string, eventCallback>} input - An object in which keys are events to bind seperated with coma and/or spaces and values are eventCallbacks.
 * @param {boolean} [eachElement=false] - If true only current target's events listeners will be removed after trigger.
 * @param {boolean} [eachEvent=false] - If true only triggered event group of events listeners will be removed.
 * @return {offCallback} cancel - cancel function for unbinding.
 * @example //esnext
 * import { createElement, append, once, trigger } from 'chirashi'
 * const maki = createElement('a.cheese.maki')
 * const sushi = createElement('a.wasabi.sushi')
 * append(document.body, [maki, sushi])
 * const cancel = once('.cheese, .wasabi', {
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
 * cancel() //remove all listeners from all elements
 * once('.cheese, .wasabi', {
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
 * var cancel = Chirashi.once('.cheese, .wasabi', {
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
 * cancel() //remove all listeners from all elements
 * Chirashi.once('.cheese, .wasabi', {
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

  var off = void 0;
  var eventsObj = {};

  forIn(input, function (events, callback) {
    eventsObj[events] = function (event) {
      callback(event);

      off(eachElement && event.currentTarget, eachEvent && events);
    };
  });

  return off = on(elements, eventsObj);
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
 * @param {(string|Array|NodeList|HTMLCollection|EventTarget)} elements - The iterable, selector or elements.
 * @param {string} events - The events that should be tiggered seperated with spaces
 * @param {Object} data - The events' data
 * @return {Array} iterable - The getElements' result for chaining.
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

  forEach(_stringToArray(events), _createEvent.bind(null, elements, options));

  return elements;
}

function _createEvent(elements, options, event) {
  event = new window.CustomEvent(event, options);

  forEach(elements, _dispatchEvent.bind(null, event));
}

function _dispatchEvent(event, element) {
  element.dispatchEvent(event);
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
 * @return {Array} iterable - The getElements' result for chaining.
 * @example //esnext
 * import { append, setStyleProp } from 'chirashi'
 *
 * append(document.body, '.maki')
 * append('.maki', '.salmon')
 *
 * setStyleProp('.maki', {
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
 * const salmon = setStyleProp('.salmon', {
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
 * Chirashi.setStyleProp('.maki', {
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
 * const salmon = Chirashi.setStyleProp('.salmon', {
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
var setStyleProp = _parseAndApply.bind(null, _applyUnit, _applyStyle);
function _applyUnit(style, prop, value) {
  if (unitless.indexOf(_kebabCase(prop)) === -1 && typeof value === 'number') {
    style[prop] += 'px';
  }
}

function _applyStyle(style, element) {
  if (!element.style) return;

  Object.assign(element.style, style);
}

/**
 * Clear inline style properties from elements.
 * @param {(string|Array|NodeList|HTMLCollection|HTMLElement)} elements - The iterable, selector or elements.
 * @param {...string} props - The style properties to clear.
 * @return {Array} iterable - The getElements' result for chaining.
 * @example //esnext
 * import { createElement, setStyle, clearStyle } from 'chirashi'
 * const maki = createElement('a.cheese.maki')
 * setStyleProp(maki, {
 *   position: 'absolute',
 *   top: 10,
 *   width: 200,
 *   height: 200,
 *   background: 'red'
 * }) // returns: [<a class="cheese maki" style="position: 'absolute'; top: '10px'; width: '200px'; height: '200px'; background: 'red';"></a>]
 * clearStyle(maki, 'width', 'height', 'background') // returns: [<a class="cheese maki" style="position: 'absolute'; top: '10px';"></a>]
 * @example //es5
 * var maki = Chirashi.createElement('a.cheese.maki')
 * Chirashi.setStyleProp(maki, {
 *   position: 'absolute',
 *   top: 10,
 *   width: 200,
 *   height: 200,
 *   background: 'red'
 * }) // returns: [<a class="cheese maki" style="position: 'absolute'; top: '10px'; width: '200px'; height: '200px'; background: 'red';"></a>]
 * Chirashi.clearStyle(maki, 'width', 'height', 'background') // returns: [<a class="cheese maki" style="position: 'absolute'; top: '10px';"></a>]
 */
function clearStyle(elements) {
  var style = {};

  for (var _len = arguments.length, props = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    props[_key - 1] = arguments[_key];
  }

  forEach(props, _resetProp.bind(null, style));

  return setStyleProp(elements, style);
}

function _resetProp(style, prop) {
  style[prop] = '';
}

/**
 * Return the screen relative position of an element.
 * @param {(string|Array|NodeList|HTMLCollection|Element)} element - The element. Note that it'll be passed to getElement to ensure there's only one.
 * @return {(Object|boolean)} clientRect - Element's screen position or false if no element found.
 * @return {number} clientRect.bottom - Y-coordinate, relative to the viewport origin, of the bottom of the rectangle box.
 * @return {number} clientRect.height - Height of the rectangle box (This is identical to bottom minus top).
 * @return {number} clientRect.left - X-coordinate, relative to the viewport origin, of the left of the rectangle box.
 * @return {number} clientRect.right - X-coordinate, relative to the viewport origin, of the right of the rectangle box.
 * @return {number} clientRect.top - Y-coordinate, relative to the viewport origin, of the top of the rectangle box.
 * @return {number} clientRect.width - Width of the rectangle box (This is identical to right minus left).
 * @example esnext
 * import { setStyleProp, append, clientRect } from 'chirashi'
 *
 * setStyleProp([document.documentElement, document.body], {
 *   position: 'relative',
 *   margin: 0,
 *   padding: 0
 * })
 *
 * append(document.body, '.poulp')
 *
 * const poulp = setStyleProp('.poulp', {
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
 * Chirashi.setStyleProp([document.documentElement, document.body], {
 *   position: 'relative',
 *   margin: 0,
 *   padding: 0
 * })
 *
 * Chirashi.append(document.body, '.poulp')
 *
 * var poulp = Chirashi.setStyleProp('.poulp', {
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

  // exhaustive because ClientRect use only getters breaking simple copies
  return {
    bottom: rect.bottom,
    height: rect.height,
    left: rect.left,
    right: rect.right,
    top: rect.top,
    width: rect.width
  };
}

/**
 * Get computed style of an element.
 * @param {(string|Array|NodeList|HTMLCollection|Element)} element - The element. Note that it'll be passed to getElement to ensure there's only one.
 * @return {Object<string, string>} computedStyle - the computed style of the element.
 * @example //esnext
 * import { append, setStyleProp, getComputedStyle } from 'chirashi'
 * append(document.body, '.maki')
 * const maki = setStyleProp('.maki', {
 *   display: 'block',
 *   position: 'relative',
 *   top: 10
 * })
 * getComputedStyle(maki) //returns: { display: 'block', position: 'relative', top: '10px', [... other properties according to the browser] }
 * @example //es5
 * Chirashi.append(document.body, '.maki')
 * var maki = Chirashi.setStyleProp('.maki', {
 *   display: 'block',
 *   position: 'relative',
 *   top: 10
 * })
 * Chirashi.getComputedStyle(maki) //returns: { display: 'block', position: 'relative', top: '10px', [... other properties according to the browser] }
 */
function getComputedStyle(element) {
  return !!(element = getElement(element)) && window.getComputedStyle(element);
}

function _getLength(element, direction, offset) {
  return getProp(element, (offset ? 'offset' : 'client') + direction);
}

/**
 * Get element's height in pixels.
 * @param {(string|Array|NodeList|HTMLCollection|Element|HTMLElement)} element - The element. Note that it'll be passed to getElement to ensure there's only one.
 * @param {boolean} [offset=false] - If true height will include scrollbar and borders to size.
 * @return {number} height - The height in pixels.
 * @example //esnext
 * import { append, setStyleProp, getHeight } from 'chirashi'
 * append(document.body, '.maki')
 * const maki = setStyleProp('.maki', {
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
 * var maki = Chirashi.setStyleProp('.maki', {
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
 * @param {(string|Array|NodeList|HTMLCollection|Element|HTMLElement)} element - The element. Note that it'll be passed to getElement to ensure there's only one.
 * @param {boolean} [offset=false] - If true width will include scrollbar and borders to size.
 * @return {number} width - The width in pixels.
 * @example //esnext
 * import { append, setStyleProp, getWidth } from 'chirashi'
 * append(document.body, '.maki')
 * const maki = setStyleProp('.maki', {
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
 * var maki = Chirashi.setStyleProp('.maki', {
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
 * @param {(string|Array|NodeList|HTMLCollection|Element|HTMLElement)} element - The element. Note that it'll be passed to getElement to ensure there's only one.
 * @param {boolean} [offset=false] - If true size will include scrollbar and borders.
 * @return {number} size - The size in pixels.
 * @example //esnext
 * import { append, setStyleProp, getSize } from 'chirashi'
 * append(document.body, '.maki')
 * const maki = setStyleProp('.maki', {
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
 * var maki = Chirashi.setStyleProp('.maki', {
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
 * Get computed style props of an element. While getComputedStyle returns all properties, getStyleProp returns only needed and convert unitless numeric values or pixels values into numbers.
 * @param {(string|Array|NodeList|HTMLCollection|Element)} element - The element. Note that it'll be passed to getElement to ensure there's only one.
 * @return {(string|number|Object<string, (string|number)>)} computedStyle - Value of computed for provided prop if only one or parsed copy of element's computed style if several.
 * @example //esnext
 * import { append, setStyleProp, getStyleProp } from 'chirashi'
 * append(document.body, '.maki')
 * const maki = setStyleProp('.maki', {
 *   display: 'block',
 *   position: 'relative',
 *   top: 10
 * })
 * getStyleProp(maki, 'display', 'top') //returns: { display: "block", top: 10 }
 * @example //es5
 * Chirashi.append(document.body, '.maki')
 * var maki = Chirashi.setStyleProp('.maki', {
 *   display: 'block',
 *   position: 'relative',
 *   top: 10
 * })
 * Chirashi.getStyleProp(maki, 'display', 'top') //returns: { display: "block", top: 10 }
 */
function getStyleProp(element) {
  var computedStyle = getComputedStyle(element);

  if (!computedStyle) return false;

  for (var _len = arguments.length, props = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    props[_key - 1] = arguments[_key];
  }

  return _getOneOrMore(props, _parseProp.bind(null, computedStyle));
}

function _parseProp(input, prop) {
  var value = input[prop];
  return value && (!isNaN(+value) || value.indexOf('px') !== -1) ? parseFloat(value) : value;
}

/**
 * Hide each element of elements using visibility.
 * @param {(string|Array|NodeList|HTMLCollection|HTMLElement)} elements - The iterable, selector or elements.
 * @return {Array} iterable - The getElements' result for chaining.
 * @example //esnext
 * import { append, hide, getStyleProp }
 * append(document.body, '.maki')
 * const maki = hide('.maki')
 * getStyleProp(maki, 'visibility') // returns: "hidden"
 * @example //es5
 * Chirashi.append(document.body, '.maki')
 * var maki = Chirashi.hide('.maki')
 * Chirashi.getStyleProp(maki, 'visibility') // returns: "hidden"
 */
function hide(elements) {
  return setStyleProp(elements, { visibility: 'hidden' });
}

/**
 * Return the screen relative position of an element.
 * @param {(string|Array|NodeList|HTMLCollection|Element)} element - The element. Note that it'll be passed to getElement to ensure there's only one.
 * @return {(Object|boolean)} screenPosition - Element's screen position or false if no element found.
 * @return {Object.top} top - Y-coordinate, relative to the viewport origin, of the top of the rectangle box.
 * @return {Object.left} left - X-coordinate, relative to the viewport origin, of the left of the rectangle box.
 * @example esnext
 * import { setStyleProp, append, screenPosition } from 'chirashi'
 *
 * setStyleProp([document.documentElement, document.body], {
 *   position: 'relative',
 *   margin: 0,
 *   padding: 0
 * })
 *
 * append(document.body, '.poulp')
 *
 * const poulp = setStyleProp('.poulp', {
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
 * Chirashi.setStyleProp([document.documentElement, document.body], {
 *   position: 'relative',
 *   margin: 0,
 *   padding: 0
 * })
 *
 * Chirashi.append(document.body, '.poulp')
 *
 * var poulp = Chirashi.setStyleProp('.poulp', {
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
 * @param {(string|Array|NodeList|HTMLCollection|Element)} element - The element. Note that it'll be passed to getElement to ensure there's only one.
 * @return {(Object|boolean)} offset - Offset object or false if no element found.
 * @return {Object.top} top - Top offset in pixels.
 * @return {Object.left} left - Left offset in pixels.
 * @example //esnext
 * import { setStyleProp, append, offset }
 * setStyleProp([document.documentElement, document.body], {
 *   position: 'relative',
 *   margin: 0,
 *   padding: 0
 * })
 * append(document.body, '.sushi')
 * const sushi = setStyleProp('.sushi', {
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
 * Chirashi.setStyleProp([document.documentElement, document.body], {
 *   position: 'relative',
 *   margin: 0,
 *   padding: 0
 * })
 * Chirashi.append(document.body, '.sushi')
 * var sushi = Chirashi.setStyleProp('.sushi', {
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
 * @param {(string|Array|NodeList|HTMLCollection|document|Element)} element - The selector or dom element.
 * @return {(Object|boolean)} offset - Offset object or false if no element found.
 * @return {Object.top} top - Top position in pixels.
 * @return {Object.left} left - Left position in pixels.
 * @example //esnext
 * import { append, setStyleProp, position } from 'chirashi'
 *
 * setStyleProp([document.documentElement, document.body], {
 *   position: 'relative',
 *   margin: 0,
 *   padding: 0
 * })
 *
 * append(document.body, '.maki')
 * append('.maki', '.salmon')
 *
 * setStyleProp('.maki', {
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
 * const salmon = setStyleProp('.salmon', {
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
 * Chirashi.setStyleProp([document.documentElement, document.body], {
 *   position: 'relative',
 *   margin: 0,
 *   padding: 0
 * })
 *
 * Chirashi.append(document.body, '.maki')
 * Chirashi.append('.maki', '.salmon')
 *
 * Chirashi.setStyleProp('.maki', {
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
 * var salmon = Chirashi.setStyleProp('.salmon', {
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
  return !!(element = getElement(element)) && {
    top: element.offsetTop,
    left: element.offsetLeft
  };
}

/**
 * Set the provided css variables to elements.
 * @param {(string|Array|NodeList|HTMLCollection)} elements - The iterable, selector or elements.
 * @param {Object.<string, (number|string)>} variables - The key-value pairs of variables to set, the variable name shouldn't be prefixed with -- and can be in camelCase.
 * @return {Array} iterable - The getElements' result for chaining.
 * @example //esnext
 * import { append, setCssVariable } from 'chirashi'
 *
 * append(document.body, '.maki')
 *
 * setCssVariable('.maki', {
 *   opacity: 0.5,
 *   textColor: 'blue'
 * }) // returns: [<div class="maki" style="--opacity: 0.5; --text-color: 'rgb(0,0,255)'"></div>]
 * @example //es5
 * Chirashi.append(document.body, '.maki')
 *
 * Chirashi.setCssVariable('.maki', {
 *   opacity: 0.5,
 *   textColor: 'blue'
 * }) // returns: [<div class="maki" style="--opacity: 0.5; --text-color: 'rgb(0,0,255)'"></div>]
 */
var setCssVariable = _parseAndApply.bind(null, _applyPrefix, _applyVariables);
function _applyPrefix(variables, prop, value) {
  variables['--' + _kebabCase(prop)] = value;
}

function _applyVariables(variables, element) {
  if (!element.style) return;

  forIn(variables, _applyVariable.bind(null, element));
}

function _applyVariable(element, key, value) {
  element.style.setProperty(key, value);
}

/**
 * Set the provided height to elements.
 * @param {(string|Array|NodeList|HTMLCollection|HTMLElement)} elements - The iterable, selector or elements.
 * @param {(number|string)} height - The height as number or string. For number, unit used will be pixels.
 * @return {Array} iterable - The getElements' result for chaining.
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
  return setStyleProp(elements, { height: height });
}

/**
 * Set the provided size to elements.
 * @param {(string|Array|NodeList|HTMLCollection)} elements - The iterable, selector or elements.
 * @param {(number|string)} width - The width as number or string. For number, unit used will be pixels.
 * @param {(number|string)} height - The height as number or string. For number, unit used will be pixels.
 * @return {Array} iterable - The getElements' result for chaining.
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
  return setStyleProp(elements, { width: width, height: height });
}

/**
 * Set the provided width to elements.
 * @param {(string|Array|NodeList|HTMLCollection|HTMLElement)} elements - The iterable, selector or elements.
 * @param {(number|string)} width - The width as number or string. For number, unit used will be pixels.
 * @return {Array} iterable - The getElements' result for chaining.
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
  return setStyleProp(elements, { width: width });
}

/**
 * Show each element of elements using visibility.
 * @param {(string|Array|NodeList|HTMLCollection|HTMLElement)} elements - The iterable, selector or elements.
 * @return {Array} iterable - The getElements' result for chaining.
 * @example //esnext
 * import { append, show, getStyleProp }
 * append(document.body, '.maki')
 * const maki = show('.maki')
 * getStyleProp(maki, 'visibility') // returns: "visible"
 * @example //es5
 * Chirashi.append(document.body, '.maki')
 * var maki = Chirashi.show('.maki')
 * Chirashi.getStyleProp(maki, 'visibility') // returns: "visible"
 */
function show(elements) {
  return setStyleProp(elements, { visibility: 'visible' });
}

/**
 * Compute and apply 3d transform matrix from provided transformation to each element of elements.
 * @param {(string|Array|NodeList|HTMLCollection)} elements - The iterable or selector.
 * @param {Transformation} transformation - The transformation as an object
 * @return {Array} iterable - The getElements' result for chaining.
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
  return setStyleProp(elements, { transform: 'matrix3d(' + _transformMatrix(transformation).join(',') + ')' });
}

function _transformFromObj(values, transformation, name, defaultVal, axe) {
  values[name + axe.toUpperCase()] = axe in transformation[name] ? transformation[name][axe] : defaultVal;
}

function _transformFromGlobal(values, name, defaultAxes, axe) {
  values[name + axe.toUpperCase()] = defaultAxes[axe];
}

function _transformFromDefault(values, name, defaultVal, axe) {
  values[name + axe.toUpperCase()] = defaultVal;
}

function _getValues(transformation, axes, name, defaultVal, defaultAxes) {
  var values = {};

  if (name in transformation) {
    if (_typeof(transformation[name]) === 'object') {
      // set transformation on axes from object
      forEach(axes, _transformFromObj.bind(null, values, transformation, name, defaultVal));
    } else {
      // set transformation on each axes from global value
      forEach(axes, _transformFromGlobal.bind(null, values, name, defaultAxes));
    }
  } else {
    // set default transformation
    forEach(axes, _transformFromDefault.bind(null, values, name, defaultVal));
  }

  return values;
}

function _roundMatrix(matrix, item, index) {
  matrix[index] = +item.toFixed(2);
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

  forEach(matrix, _roundMatrix.bind(null, matrix));

  return matrix;
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
exports.empty = empty;
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
exports.parents = parents;
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
exports.delegate = delegate;
exports.on = on;
exports.once = once;
exports.ready = ready;
exports.trigger = trigger;
exports.clearStyle = clearStyle;
exports.clientRect = clientRect;
exports.getComputedStyle = getComputedStyle;
exports.getHeight = getHeight;
exports.getSize = getSize;
exports.getStyleProp = getStyleProp;
exports.getWidth = getWidth;
exports.hide = hide;
exports.offset = offset;
exports.position = position;
exports.screenPosition = screenPosition;
exports.setCssVariable = setCssVariable;
exports.setHeight = setHeight;
exports.setSize = setSize;
exports.setStyleProp = setStyleProp;
exports.setWidth = setWidth;
exports.show = show;
exports.transform = transform;

Object.defineProperty(exports, '__esModule', { value: true });

})));
