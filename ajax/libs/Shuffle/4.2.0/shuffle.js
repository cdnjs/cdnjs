(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.shuffle = factory());
}(this, (function () { 'use strict';

// Polyfill for creating CustomEvents on IE9/10/11

// code pulled from:
// https://github.com/d4tocchini/customevent-polyfill
// https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent#Polyfill

try {
    var ce = new window.CustomEvent('test');
    ce.preventDefault();
    if (ce.defaultPrevented !== true) {
        // IE has problems with .preventDefault() on custom events
        // http://stackoverflow.com/questions/23349191
        throw new Error('Could not prevent default');
    }
} catch(e) {
  var CustomEvent$1 = function(event, params) {
    var evt, origPrevent;
    params = params || {
      bubbles: false,
      cancelable: false,
      detail: undefined
    };

    evt = document.createEvent("CustomEvent");
    evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
    origPrevent = evt.preventDefault;
    evt.preventDefault = function () {
      origPrevent.call(this);
      try {
        Object.defineProperty(this, 'defaultPrevented', {
          get: function () {
            return true;
          }
        });
      } catch(e) {
        this.defaultPrevented = true;
      }
    };
    return evt;
  };

  CustomEvent$1.prototype = window.Event.prototype;
  window.CustomEvent = CustomEvent$1; // expose definition to window
}

var proto = Element.prototype;
var vendor = proto.matches
  || proto.matchesSelector
  || proto.webkitMatchesSelector
  || proto.mozMatchesSelector
  || proto.msMatchesSelector
  || proto.oMatchesSelector;

var index = match;

/**
 * Match `el` to `selector`.
 *
 * @param {Element} el
 * @param {String} selector
 * @return {Boolean}
 * @api public
 */

function match(el, selector) {
  if (vendor) return vendor.call(el, selector);
  var nodes = el.parentNode.querySelectorAll(selector);
  for (var i = 0; i < nodes.length; i++) {
    if (nodes[i] == el) return true;
  }
  return false;
}

var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};





function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var index$1 = createCommonjsModule(function (module) {
'use strict';

// there's 3 implementations written in increasing order of efficiency

// 1 - no Set type is defined
function uniqNoSet(arr) {
	var ret = [];

	for (var i = 0; i < arr.length; i++) {
		if (ret.indexOf(arr[i]) === -1) {
			ret.push(arr[i]);
		}
	}

	return ret;
}

// 2 - a simple Set type is defined
function uniqSet(arr) {
	var seen = new Set();
	return arr.filter(function (el) {
		if (!seen.has(el)) {
			seen.add(el);
			return true;
		}

		return false;
	});
}

// 3 - a standard Set type is defined and it has a forEach method
function uniqSetWithForEach(arr) {
	var ret = [];

	(new Set(arr)).forEach(function (el) {
		ret.push(el);
	});

	return ret;
}

// V8 currently has a broken implementation
// https://github.com/joyent/node/issues/8449
function doesForEachActuallyWork() {
	var ret = false;

	(new Set([true])).forEach(function (el) {
		ret = el;
	});

	return ret === true;
}

if ('Set' in commonjsGlobal) {
	if (typeof Set.prototype.forEach === 'function' && doesForEachActuallyWork()) {
		module.exports = uniqSetWithForEach;
	} else {
		module.exports = uniqSet;
	}
} else {
	module.exports = uniqNoSet;
}
});

var immutable = extend;

var hasOwnProperty = Object.prototype.hasOwnProperty;

function extend() {
    var target = {};

    for (var i = 0; i < arguments.length; i++) {
        var source = arguments[i];

        for (var key in source) {
            if (hasOwnProperty.call(source, key)) {
                target[key] = source[key];
            }
        }
    }

    return target
}

var index$2 = throttle;

/**
 * Returns a new function that, when invoked, invokes `func` at most once per `wait` milliseconds.
 *
 * @param {Function} func Function to wrap.
 * @param {Number} wait Number of milliseconds that must elapse between `func` invocations.
 * @return {Function} A new function that wraps the `func` function passed in.
 */

function throttle (func, wait) {
  var ctx, args, rtn, timeoutID; // caching
  var last = 0;

  return function throttled () {
    ctx = this;
    args = arguments;
    var delta = new Date() - last;
    if (!timeoutID)
      if (delta >= wait) call();
      else timeoutID = setTimeout(call, wait - delta);
    return rtn;
  };

  function call () {
    timeoutID = 0;
    last = +new Date();
    rtn = func.apply(ctx, args);
    ctx = null;
    args = null;
  }
}

var index$3 = function parallel(fns, context, callback) {
  if (!callback) {
    if (typeof context === 'function') {
      callback = context;
      context = null;
    } else {
      callback = noop;
    }
  }

  var pending = fns && fns.length;
  if (!pending) return callback(null, []);

  var finished = false;
  var results = new Array(pending);

  fns.forEach(context ? function (fn, i) {
    fn.call(context, maybeDone(i));
  } : function (fn, i) {
    fn(maybeDone(i));
  });

  function maybeDone(i) {
    return function (err, result) {
      if (finished) return;

      if (err) {
        callback(err, results);
        finished = true;
        return
      }

      results[i] = result;

      if (!--pending) callback(null, results);
    }
  }
};

function noop() {}

/**
 * Always returns a numeric value, given a value. Logic from jQuery's `isNumeric`.
 * @param {*} value Possibly numeric value.
 * @return {number} `value` or zero if `value` isn't numeric.
 */
function getNumber(value) {
  return parseFloat(value) || 0;
}

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

var Point = function () {

  /**
   * Represents a coordinate pair.
   * @param {number} [x=0] X.
   * @param {number} [y=0] Y.
   */
  function Point(x, y) {
    classCallCheck(this, Point);

    this.x = getNumber(x);
    this.y = getNumber(y);
  }

  /**
   * Whether two points are equal.
   * @param {Point} a Point A.
   * @param {Point} b Point B.
   * @return {boolean}
   */


  createClass(Point, null, [{
    key: 'equals',
    value: function equals(a, b) {
      return a.x === b.x && a.y === b.y;
    }
  }]);
  return Point;
}();

var Classes = {
  BASE: 'shuffle',
  SHUFFLE_ITEM: 'shuffle-item',
  VISIBLE: 'shuffle-item--visible',
  HIDDEN: 'shuffle-item--hidden'
};

var id$1 = 0;

var ShuffleItem = function () {
  function ShuffleItem(element) {
    classCallCheck(this, ShuffleItem);

    id$1 += 1;
    this.id = id$1;
    this.element = element;
    this.isVisible = true;
  }

  createClass(ShuffleItem, [{
    key: 'show',
    value: function show() {
      this.isVisible = true;
      this.element.classList.remove(Classes.HIDDEN);
      this.element.classList.add(Classes.VISIBLE);
    }
  }, {
    key: 'hide',
    value: function hide() {
      this.isVisible = false;
      this.element.classList.remove(Classes.VISIBLE);
      this.element.classList.add(Classes.HIDDEN);
    }
  }, {
    key: 'init',
    value: function init() {
      this.addClasses([Classes.SHUFFLE_ITEM, Classes.VISIBLE]);
      this.applyCss(ShuffleItem.Css.INITIAL);
      this.scale = ShuffleItem.Scale.VISIBLE;
      this.point = new Point();
    }
  }, {
    key: 'addClasses',
    value: function addClasses(classes) {
      var _this = this;

      classes.forEach(function (className) {
        _this.element.classList.add(className);
      });
    }
  }, {
    key: 'removeClasses',
    value: function removeClasses(classes) {
      var _this2 = this;

      classes.forEach(function (className) {
        _this2.element.classList.remove(className);
      });
    }
  }, {
    key: 'applyCss',
    value: function applyCss(obj) {
      var _this3 = this;

      Object.keys(obj).forEach(function (key) {
        _this3.element.style[key] = obj[key];
      });
    }
  }, {
    key: 'dispose',
    value: function dispose() {
      this.removeClasses([Classes.HIDDEN, Classes.VISIBLE, Classes.SHUFFLE_ITEM]);

      this.element.removeAttribute('style');
      this.element = null;
    }
  }]);
  return ShuffleItem;
}();

ShuffleItem.Css = {
  INITIAL: {
    position: 'absolute',
    top: 0,
    left: 0,
    visibility: 'visible',
    'will-change': 'transform'
  },
  VISIBLE: {
    before: {
      opacity: 1,
      visibility: 'visible'
    },
    after: {}
  },
  HIDDEN: {
    before: {
      opacity: 0
    },
    after: {
      visibility: 'hidden'
    }
  }
};

ShuffleItem.Scale = {
  VISIBLE: 1,
  HIDDEN: 0.001
};

var element = document.body || document.documentElement;
var e$1 = document.createElement('div');
e$1.style.cssText = 'width:10px;padding:2px;box-sizing:border-box;';
element.appendChild(e$1);

var width = window.getComputedStyle(e$1, null).width;
var ret = width === '10px';

element.removeChild(e$1);

/**
 * Retrieve the computed style for an element, parsed as a float.
 * @param {Element} element Element to get style for.
 * @param {string} style Style property.
 * @param {CSSStyleDeclaration} [styles] Optionally include clean styles to
 *     use instead of asking for them again.
 * @return {number} The parsed computed value or zero if that fails because IE
 *     will return 'auto' when the element doesn't have margins instead of
 *     the computed style.
 */
function getNumberStyle(element, style) {
  var styles = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : window.getComputedStyle(element, null);

  var value = getNumber(styles[style]);

  // Support IE<=11 and W3C spec.
  if (!ret && style === 'width') {
    value += getNumber(styles.paddingLeft) + getNumber(styles.paddingRight) + getNumber(styles.borderLeftWidth) + getNumber(styles.borderRightWidth);
  } else if (!ret && style === 'height') {
    value += getNumber(styles.paddingTop) + getNumber(styles.paddingBottom) + getNumber(styles.borderTopWidth) + getNumber(styles.borderBottomWidth);
  }

  return value;
}

/**
 * Fisher-Yates shuffle.
 * http://stackoverflow.com/a/962890/373422
 * https://bost.ocks.org/mike/shuffle/
 * @param {Array} array Array to shuffle.
 * @return {Array} Randomly sorted array.
 */
function randomize(array) {
  var n = array.length;

  while (n) {
    n -= 1;
    var i = Math.floor(Math.random() * (n + 1));
    var temp = array[i];
    array[i] = array[n];
    array[n] = temp;
  }

  return array;
}

var defaults$1 = {
  // Use array.reverse() to reverse the results
  reverse: false,

  // Sorting function
  by: null,

  // If true, this will skip the sorting and return a randomized order in the array
  randomize: false,

  // Determines which property of each item in the array is passed to the
  // sorting method.
  key: 'element'
};

// You can return `undefined` from the `by` function to revert to DOM order.
function sorter(arr, options) {
  var opts = immutable(defaults$1, options);
  var original = [].slice.call(arr);
  var revert = false;

  if (!arr.length) {
    return [];
  }

  if (opts.randomize) {
    return randomize(arr);
  }

  // Sort the elements by the opts.by function.
  // If we don't have opts.by, default to DOM order
  if (typeof opts.by === 'function') {
    arr.sort(function (a, b) {
      // Exit early if we already know we want to revert
      if (revert) {
        return 0;
      }

      var valA = opts.by(a[opts.key]);
      var valB = opts.by(b[opts.key]);

      // If both values are undefined, use the DOM order
      if (valA === undefined && valB === undefined) {
        revert = true;
        return 0;
      }

      if (valA < valB || valA === 'sortFirst' || valB === 'sortLast') {
        return -1;
      }

      if (valA > valB || valA === 'sortLast' || valB === 'sortFirst') {
        return 1;
      }

      return 0;
    });
  }

  // Revert to the original array if necessary
  if (revert) {
    return original;
  }

  if (opts.reverse) {
    arr.reverse();
  }

  return arr;
}

var transitions = {};
var eventName = 'transitionend';
var count = 0;

function uniqueId() {
  count += 1;
  return eventName + count;
}

function cancelTransitionEnd(id) {
  if (transitions[id]) {
    transitions[id].element.removeEventListener(eventName, transitions[id].listener);
    transitions[id] = null;
    return true;
  }

  return false;
}

function onTransitionEnd(element, callback) {
  var id = uniqueId();
  var listener = function listener(evt) {
    if (evt.currentTarget === evt.target) {
      cancelTransitionEnd(id);
      callback(evt);
    }
  };

  element.addEventListener(eventName, listener);

  transitions[id] = { element: element, listener: listener };

  return id;
}

function arrayMax(array) {
  return Math.max.apply(Math, array); // eslint-disable-line prefer-spread
}

function arrayMin(array) {
  return Math.min.apply(Math, array); // eslint-disable-line prefer-spread
}

/**
 * Determine the number of columns an items spans.
 * @param {number} itemWidth Width of the item.
 * @param {number} columnWidth Width of the column (includes gutter).
 * @param {number} columns Total number of columns
 * @param {number} threshold A buffer value for the size of the column to fit.
 * @return {number}
 */
function getColumnSpan(itemWidth, columnWidth, columns, threshold) {
  var columnSpan = itemWidth / columnWidth;

  // If the difference between the rounded column span number and the
  // calculated column span number is really small, round the number to
  // make it fit.
  if (Math.abs(Math.round(columnSpan) - columnSpan) < threshold) {
    // e.g. columnSpan = 4.0089945390298745
    columnSpan = Math.round(columnSpan);
  }

  // Ensure the column span is not more than the amount of columns in the whole layout.
  return Math.min(Math.ceil(columnSpan), columns);
}

/**
 * Retrieves the column set to use for placement.
 * @param {number} columnSpan The number of columns this current item spans.
 * @param {number} columns The total columns in the grid.
 * @return {Array.<number>} An array of numbers represeting the column set.
 */
function getAvailablePositions(positions, columnSpan, columns) {
  // The item spans only one column.
  if (columnSpan === 1) {
    return positions;
  }

  // The item spans more than one column, figure out how many different
  // places it could fit horizontally.
  // The group count is the number of places within the positions this block
  // could fit, ignoring the current positions of items.
  // Imagine a 2 column brick as the second item in a 4 column grid with
  // 10px height each. Find the places it would fit:
  // [20, 10, 10, 0]
  //  |   |   |
  //  *   *   *
  //
  // Then take the places which fit and get the bigger of the two:
  // max([20, 10]), max([10, 10]), max([10, 0]) = [20, 10, 0]
  //
  // Next, find the first smallest number (the short column).
  // [20, 10, 0]
  //          |
  //          *
  //
  // And that's where it should be placed!
  //
  // Another example where the second column's item extends past the first:
  // [10, 20, 10, 0] => [20, 20, 10] => 10
  var available = [];

  // For how many possible positions for this item there are.
  for (var i = 0; i <= columns - columnSpan; i++) {
    // Find the bigger value for each place it could fit.
    available.push(arrayMax(positions.slice(i, i + columnSpan)));
  }

  return available;
}

/**
 * Find index of short column, the first from the left where this item will go.
 *
 * @param {Array.<number>} positions The array to search for the smallest number.
 * @param {number} buffer Optional buffer which is very useful when the height
 *     is a percentage of the width.
 * @return {number} Index of the short column.
 */
function getShortColumn(positions, buffer) {
  var minPosition = arrayMin(positions);
  for (var i = 0, len = positions.length; i < len; i++) {
    if (positions[i] >= minPosition - buffer && positions[i] <= minPosition + buffer) {
      return i;
    }
  }

  return 0;
}

/**
 * Determine the location of the next item, based on its size.
 * @param {Object} itemSize Object with width and height.
 * @param {Array.<number>} positions Positions of the other current items.
 * @param {number} gridSize The column width or row height.
 * @param {number} total The total number of columns or rows.
 * @param {number} threshold Buffer value for the column to fit.
 * @param {number} buffer Vertical buffer for the height of items.
 * @return {Point}
 */
function getItemPosition(_ref) {
  var itemSize = _ref.itemSize,
      positions = _ref.positions,
      gridSize = _ref.gridSize,
      total = _ref.total,
      threshold = _ref.threshold,
      buffer = _ref.buffer;

  var span = getColumnSpan(itemSize.width, gridSize, total, threshold);
  var setY = getAvailablePositions(positions, span, total);
  var shortColumnIndex = getShortColumn(setY, buffer);

  // Position the item
  var point = new Point(Math.round(gridSize * shortColumnIndex), Math.round(setY[shortColumnIndex]));

  // Update the columns array with the new values for each column.
  // e.g. before the update the columns could be [250, 0, 0, 0] for an item
  // which spans 2 columns. After it would be [250, itemHeight, itemHeight, 0].
  var setHeight = setY[shortColumnIndex] + itemSize.height;
  for (var i = 0; i < span; i++) {
    positions[shortColumnIndex + i] = setHeight;
  }

  return point;
}

function toArray$$1(arrayLike) {
  return Array.prototype.slice.call(arrayLike);
}

function arrayIncludes(array, obj) {
  return array.indexOf(obj) > -1;
}

// Used for unique instance variables
var id = 0;

var Shuffle = function () {

  /**
   * Categorize, sort, and filter a responsive grid of items.
   *
   * @param {Element} element An element which is the parent container for the grid items.
   * @param {Object} [options=Shuffle.options] Options object.
   * @constructor
   */
  function Shuffle(element) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    classCallCheck(this, Shuffle);

    this.options = immutable(Shuffle.options, options);

    this.useSizer = false;
    this.lastSort = {};
    this.group = Shuffle.ALL_ITEMS;
    this.lastFilter = Shuffle.ALL_ITEMS;
    this.isEnabled = true;
    this.isDestroyed = false;
    this.isInitialized = false;
    this._transitions = [];
    this.isTransitioning = false;
    this._queue = [];

    var el = this._getElementOption(element);

    if (!el) {
      throw new TypeError('Shuffle needs to be initialized with an element.');
    }

    this.element = el;
    this.id = 'shuffle_' + id;
    id += 1;

    this._init();
    this.isInitialized = true;
  }

  createClass(Shuffle, [{
    key: '_init',
    value: function _init() {
      this.items = this._getItems();

      this.options.sizer = this._getElementOption(this.options.sizer);

      if (this.options.sizer) {
        this.useSizer = true;
      }

      // Add class and invalidate styles
      this.element.classList.add(Shuffle.Classes.BASE);

      // Set initial css for each item
      this._initItems();

      // Bind resize events
      this._onResize = this._getResizeFunction();
      window.addEventListener('resize', this._onResize);

      // Get container css all in one request. Causes reflow
      var containerCss = window.getComputedStyle(this.element, null);
      var containerWidth = Shuffle.getSize(this.element).width;

      // Add styles to the container if it doesn't have them.
      this._validateStyles(containerCss);

      // We already got the container's width above, no need to cause another
      // reflow getting it again... Calculate the number of columns there will be
      this._setColumns(containerWidth);

      // Kick off!
      this.filter(this.options.group, this.options.initialSort);

      // The shuffle items haven't had transitions set on them yet so the user
      // doesn't see the first layout. Set them now that the first layout is done.
      // First, however, a synchronous layout must be caused for the previous
      // styles to be applied without transitions.
      this.element.offsetWidth; // eslint-disable-line no-unused-expressions
      this._setTransitions();
      this.element.style.transition = 'height ' + this.options.speed + 'ms ' + this.options.easing;
    }

    /**
     * Returns a throttled and proxied function for the resize handler.
     * @return {Function}
     * @private
     */

  }, {
    key: '_getResizeFunction',
    value: function _getResizeFunction() {
      var resizeFunction = this._handleResize.bind(this);
      return this.options.throttle ? this.options.throttle(resizeFunction, this.options.throttleTime) : resizeFunction;
    }

    /**
     * Retrieve an element from an option.
     * @param {string|jQuery|Element} option The option to check.
     * @return {?Element} The plain element or null.
     * @private
     */

  }, {
    key: '_getElementOption',
    value: function _getElementOption(option) {
      // If column width is a string, treat is as a selector and search for the
      // sizer element within the outermost container
      if (typeof option === 'string') {
        return this.element.querySelector(option);

        // Check for an element
      } else if (option && option.nodeType && option.nodeType === 1) {
        return option;

        // Check for jQuery object
      } else if (option && option.jquery) {
        return option[0];
      }

      return null;
    }

    /**
     * Ensures the shuffle container has the css styles it needs applied to it.
     * @param {Object} styles Key value pairs for position and overflow.
     * @private
     */

  }, {
    key: '_validateStyles',
    value: function _validateStyles(styles) {
      // Position cannot be static.
      if (styles.position === 'static') {
        this.element.style.position = 'relative';
      }

      // Overflow has to be hidden.
      if (styles.overflow !== 'hidden') {
        this.element.style.overflow = 'hidden';
      }
    }

    /**
     * Filter the elements by a category.
     * @param {string} [category] Category to filter by. If it's given, the last
     *     category will be used to filter the items.
     * @param {Array} [collection] Optionally filter a collection. Defaults to
     *     all the items.
     * @return {!{visible: Array, hidden: Array}}
     * @private
     */

  }, {
    key: '_filter',
    value: function _filter() {
      var category = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.lastFilter;
      var collection = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.items;

      var set$$1 = this._getFilteredSets(category, collection);

      // Individually add/remove hidden/visible classes
      this._toggleFilterClasses(set$$1);

      // Save the last filter in case elements are appended.
      this.lastFilter = category;

      // This is saved mainly because providing a filter function (like searching)
      // will overwrite the `lastFilter` property every time its called.
      if (typeof category === 'string') {
        this.group = category;
      }

      return set$$1;
    }

    /**
     * Returns an object containing the visible and hidden elements.
     * @param {string|Function} category Category or function to filter by.
     * @param {Array.<Element>} items A collection of items to filter.
     * @return {!{visible: Array, hidden: Array}}
     * @private
     */

  }, {
    key: '_getFilteredSets',
    value: function _getFilteredSets(category, items) {
      var _this = this;

      var visible = [];
      var hidden = [];

      // category === 'all', add visible class to everything
      if (category === Shuffle.ALL_ITEMS) {
        visible = items;

        // Loop through each item and use provided function to determine
        // whether to hide it or not.
      } else {
        items.forEach(function (item) {
          if (_this._doesPassFilter(category, item.element)) {
            visible.push(item);
          } else {
            hidden.push(item);
          }
        });
      }

      return {
        visible: visible,
        hidden: hidden
      };
    }

    /**
     * Test an item to see if it passes a category.
     * @param {string|Function} category Category or function to filter by.
     * @param {Element} element An element to test.
     * @return {boolean} Whether it passes the category/filter.
     * @private
     */

  }, {
    key: '_doesPassFilter',
    value: function _doesPassFilter(category, element) {
      if (typeof category === 'function') {
        return category.call(element, element, this);
      }

      // Check each element's data-groups attribute against the given category.
      var attr = element.getAttribute('data-' + Shuffle.FILTER_ATTRIBUTE_KEY);
      var keys = this.options.delimeter ? attr.split(this.options.delimeter) : JSON.parse(attr);

      function testCategory(category) {
        return arrayIncludes(keys, category);
      }

      if (Array.isArray(category)) {
        if (this.options.filterMode === Shuffle.FilterMode.ANY) {
          return category.some(testCategory);
        }
        return category.every(testCategory);
      }

      return arrayIncludes(keys, category);
    }

    /**
     * Toggles the visible and hidden class names.
     * @param {{visible, hidden}} Object with visible and hidden arrays.
     * @private
     */

  }, {
    key: '_toggleFilterClasses',
    value: function _toggleFilterClasses(_ref) {
      var visible = _ref.visible,
          hidden = _ref.hidden;

      visible.forEach(function (item) {
        item.show();
      });

      hidden.forEach(function (item) {
        item.hide();
      });
    }

    /**
     * Set the initial css for each item
     * @param {Array.<ShuffleItem>} [items] Optionally specifiy at set to initialize.
     * @private
     */

  }, {
    key: '_initItems',
    value: function _initItems() {
      var items = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.items;

      items.forEach(function (item) {
        item.init();
      });
    }

    /**
     * Remove element reference and styles.
     * @private
     */

  }, {
    key: '_disposeItems',
    value: function _disposeItems() {
      var items = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.items;

      items.forEach(function (item) {
        item.dispose();
      });
    }

    /**
     * Updates the visible item count.
     * @private
     */

  }, {
    key: '_updateItemCount',
    value: function _updateItemCount() {
      this.visibleItems = this._getFilteredItems().length;
    }

    /**
     * Sets css transform transition on a group of elements. This is not executed
     * at the same time as `item.init` so that transitions don't occur upon
     * initialization of Shuffle.
     * @param {Array.<ShuffleItem>} items Shuffle items to set transitions on.
     * @private
     */

  }, {
    key: '_setTransitions',
    value: function _setTransitions() {
      var items = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.items;

      var speed = this.options.speed;
      var easing = this.options.easing;

      var str = this.options.useTransforms ? 'transform ' + speed + 'ms ' + easing + ', opacity ' + speed + 'ms ' + easing : 'top ' + speed + 'ms ' + easing + ', left ' + speed + 'ms ' + easing + ', opacity ' + speed + 'ms ' + easing;

      items.forEach(function (item) {
        item.element.style.transition = str;
      });
    }
  }, {
    key: '_getItems',
    value: function _getItems() {
      var _this2 = this;

      return toArray$$1(this.element.children).filter(function (el) {
        return index(el, _this2.options.itemSelector);
      }).map(function (el) {
        return new ShuffleItem(el);
      });
    }

    /**
     * When new elements are added to the shuffle container, update the array of
     * items because that is the order `_layout` calls them.
     */

  }, {
    key: '_updateItemsOrder',
    value: function _updateItemsOrder() {
      var children = this.element.children;
      this.items = sorter(this.items, {
        by: function by(element) {
          return Array.prototype.indexOf.call(children, element);
        }
      });
    }
  }, {
    key: '_getFilteredItems',
    value: function _getFilteredItems() {
      return this.items.filter(function (item) {
        return item.isVisible;
      });
    }
  }, {
    key: '_getConcealedItems',
    value: function _getConcealedItems() {
      return this.items.filter(function (item) {
        return !item.isVisible;
      });
    }

    /**
     * Returns the column size, based on column width and sizer options.
     * @param {number} containerWidth Size of the parent container.
     * @param {number} gutterSize Size of the gutters.
     * @return {number}
     * @private
     */

  }, {
    key: '_getColumnSize',
    value: function _getColumnSize(containerWidth, gutterSize) {
      var size = void 0;

      // If the columnWidth property is a function, then the grid is fluid
      if (typeof this.options.columnWidth === 'function') {
        size = this.options.columnWidth(containerWidth);

        // columnWidth option isn't a function, are they using a sizing element?
      } else if (this.useSizer) {
        size = Shuffle.getSize(this.options.sizer).width;

        // if not, how about the explicitly set option?
      } else if (this.options.columnWidth) {
        size = this.options.columnWidth;

        // or use the size of the first item
      } else if (this.items.length > 0) {
        size = Shuffle.getSize(this.items[0].element, true).width;

        // if there's no items, use size of container
      } else {
        size = containerWidth;
      }

      // Don't let them set a column width of zero.
      if (size === 0) {
        size = containerWidth;
      }

      return size + gutterSize;
    }

    /**
     * Returns the gutter size, based on gutter width and sizer options.
     * @param {number} containerWidth Size of the parent container.
     * @return {number}
     * @private
     */

  }, {
    key: '_getGutterSize',
    value: function _getGutterSize(containerWidth) {
      var size = void 0;
      if (typeof this.options.gutterWidth === 'function') {
        size = this.options.gutterWidth(containerWidth);
      } else if (this.useSizer) {
        size = getNumberStyle(this.options.sizer, 'marginLeft');
      } else {
        size = this.options.gutterWidth;
      }

      return size;
    }

    /**
     * Calculate the number of columns to be used. Gets css if using sizer element.
     * @param {number} [containerWidth] Optionally specify a container width if
     *    it's already available.
     */

  }, {
    key: '_setColumns',
    value: function _setColumns() {
      var containerWidth = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : Shuffle.getSize(this.element).width;

      var gutter = this._getGutterSize(containerWidth);
      var columnWidth = this._getColumnSize(containerWidth, gutter);
      var calculatedColumns = (containerWidth + gutter) / columnWidth;

      // Widths given from getStyles are not precise enough...
      if (Math.abs(Math.round(calculatedColumns) - calculatedColumns) < this.options.columnThreshold) {
        // e.g. calculatedColumns = 11.998876
        calculatedColumns = Math.round(calculatedColumns);
      }

      this.cols = Math.max(Math.floor(calculatedColumns), 1);
      this.containerWidth = containerWidth;
      this.colWidth = columnWidth;
    }

    /**
     * Adjust the height of the grid
     */

  }, {
    key: '_setContainerSize',
    value: function _setContainerSize() {
      this.element.style.height = this._getContainerSize() + 'px';
    }

    /**
     * Based on the column heights, it returns the biggest one.
     * @return {number}
     * @private
     */

  }, {
    key: '_getContainerSize',
    value: function _getContainerSize() {
      return arrayMax(this.positions);
    }

    /**
     * Get the clamped stagger amount.
     * @param {number} index Index of the item to be staggered.
     * @return {number}
     */

  }, {
    key: '_getStaggerAmount',
    value: function _getStaggerAmount(index$$1) {
      return Math.min(index$$1 * this.options.staggerAmount, this.options.staggerAmountMax);
    }

    /**
     * @return {boolean} Whether the event was prevented or not.
     */

  }, {
    key: '_dispatch',
    value: function _dispatch(name) {
      var details = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      if (this.isDestroyed) {
        return false;
      }

      details.shuffle = this;
      return !this.element.dispatchEvent(new CustomEvent(name, {
        bubbles: true,
        cancelable: false,
        detail: details
      }));
    }

    /**
     * Zeros out the y columns array, which is used to determine item placement.
     * @private
     */

  }, {
    key: '_resetCols',
    value: function _resetCols() {
      var i = this.cols;
      this.positions = [];
      while (i) {
        i -= 1;
        this.positions.push(0);
      }
    }

    /**
     * Loops through each item that should be shown and calculates the x, y position.
     * @param {Array.<ShuffleItem>} items Array of items that will be shown/layed
     *     out in order in their array.
     */

  }, {
    key: '_layout',
    value: function _layout(items) {
      var _this3 = this;

      var count = 0;
      items.forEach(function (item) {
        var currPos = item.point;
        var currScale = item.scale;
        var itemSize = Shuffle.getSize(item.element, true);
        var pos = _this3._getItemPosition(itemSize);

        function callback() {
          item.element.style.transitionDelay = '';
          item.applyCss(ShuffleItem.Css.VISIBLE.after);
        }

        // If the item will not change its position, do not add it to the render
        // queue. Transitions don't fire when setting a property to the same value.
        if (Point.equals(currPos, pos) && currScale === ShuffleItem.Scale.VISIBLE) {
          item.applyCss(ShuffleItem.Css.VISIBLE.before);
          callback();
          return;
        }

        item.point = pos;
        item.scale = ShuffleItem.Scale.VISIBLE;

        // Use xtend here to clone the object so that the `before` object isn't
        // modified when the transition delay is added.
        var styles = immutable(ShuffleItem.Css.VISIBLE.before);
        styles.transitionDelay = _this3._getStaggerAmount(count) + 'ms';

        _this3._queue.push({
          item: item,
          styles: styles,
          callback: callback
        });

        count += 1;
      });
    }

    /**
     * Determine the location of the next item, based on its size.
     * @param {{width: number, height: number}} itemSize Object with width and height.
     * @return {Point}
     * @private
     */

  }, {
    key: '_getItemPosition',
    value: function _getItemPosition(itemSize) {
      return getItemPosition({
        itemSize: itemSize,
        positions: this.positions,
        gridSize: this.colWidth,
        total: this.cols,
        threshold: this.options.columnThreshold,
        buffer: this.options.buffer
      });
    }

    /**
     * Hides the elements that don't match our filter.
     * @param {Array.<ShuffleItem>} collection Collection to shrink.
     * @private
     */

  }, {
    key: '_shrink',
    value: function _shrink() {
      var _this4 = this;

      var collection = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this._getConcealedItems();

      var count = 0;
      collection.forEach(function (item) {
        function callback() {
          item.applyCss(ShuffleItem.Css.HIDDEN.after);
        }

        // Continuing would add a transitionend event listener to the element, but
        // that listener would not execute because the transform and opacity would
        // stay the same.
        // The callback is executed here because it is not guaranteed to be called
        // after the transitionend event because the transitionend could be
        // canceled if another animation starts.
        if (item.scale === ShuffleItem.Scale.HIDDEN) {
          item.applyCss(ShuffleItem.Css.HIDDEN.before);
          callback();
          return;
        }

        item.scale = ShuffleItem.Scale.HIDDEN;

        var styles = immutable(ShuffleItem.Css.HIDDEN.before);
        styles.transitionDelay = _this4._getStaggerAmount(count) + 'ms';

        _this4._queue.push({
          item: item,
          styles: styles,
          callback: callback
        });

        count += 1;
      });
    }

    /**
     * Resize handler.
     * @private
     */

  }, {
    key: '_handleResize',
    value: function _handleResize() {
      // If shuffle is disabled, destroyed, don't do anything
      if (!this.isEnabled || this.isDestroyed) {
        return;
      }

      // Will need to check height in the future if it's layed out horizontaly
      var containerWidth = Shuffle.getSize(this.element).width;

      // containerWidth hasn't changed, don't do anything
      if (containerWidth === this.containerWidth) {
        return;
      }

      this.update();
    }

    /**
     * Returns styles which will be applied to the an item for a transition.
     * @param {Object} obj Transition options.
     * @return {!Object} Transforms for transitions, left/top for animate.
     * @private
     */

  }, {
    key: '_getStylesForTransition',
    value: function _getStylesForTransition(_ref2) {
      var item = _ref2.item,
          styles = _ref2.styles;

      if (!styles.transitionDelay) {
        styles.transitionDelay = '0ms';
      }

      var x = item.point.x;
      var y = item.point.y;

      if (this.options.useTransforms) {
        styles.transform = 'translate(' + x + 'px, ' + y + 'px) scale(' + item.scale + ')';
      } else {
        styles.left = x + 'px';
        styles.top = y + 'px';
      }

      return styles;
    }

    /**
     * Listen for the transition end on an element and execute the itemCallback
     * when it finishes.
     * @param {Element} element Element to listen on.
     * @param {Function} itemCallback Callback for the item.
     * @param {Function} done Callback to notify `parallel` that this one is done.
     */

  }, {
    key: '_whenTransitionDone',
    value: function _whenTransitionDone(element, itemCallback, done) {
      var id = onTransitionEnd(element, function (evt) {
        itemCallback();
        done(null, evt);
      });

      this._transitions.push(id);
    }

    /**
     * Return a function which will set CSS styles and call the `done` function
     * when (if) the transition finishes.
     * @param {Object} opts Transition object.
     * @return {Function} A function to be called with a `done` function.
     */

  }, {
    key: '_getTransitionFunction',
    value: function _getTransitionFunction(opts) {
      var _this5 = this;

      return function (done) {
        opts.item.applyCss(_this5._getStylesForTransition(opts));
        _this5._whenTransitionDone(opts.item.element, opts.callback, done);
      };
    }

    /**
     * Execute the styles gathered in the style queue. This applies styles to elements,
     * triggering transitions.
     * @private
     */

  }, {
    key: '_processQueue',
    value: function _processQueue() {
      if (this.isTransitioning) {
        this._cancelMovement();
      }

      var hasSpeed = this.options.speed > 0;
      var hasQueue = this._queue.length > 0;

      if (hasQueue && hasSpeed && this.isInitialized) {
        this._startTransitions(this._queue);
      } else if (hasQueue) {
        this._styleImmediately(this._queue);
        this._dispatchLayout();

        // A call to layout happened, but none of the newly visible items will
        // change position or the transition duration is zero, which will not trigger
        // the transitionend event.
      } else {
        this._dispatchLayout();
      }

      // Remove everything in the style queue
      this._queue.length = 0;
    }

    /**
     * Wait for each transition to finish, the emit the layout event.
     * @param {Array.<Object>} transitions Array of transition objects.
     */

  }, {
    key: '_startTransitions',
    value: function _startTransitions(transitions) {
      var _this6 = this;

      // Set flag that shuffle is currently in motion.
      this.isTransitioning = true;

      // Create an array of functions to be called.
      var callbacks = transitions.map(function (obj) {
        return _this6._getTransitionFunction(obj);
      });

      index$3(callbacks, this._movementFinished.bind(this));
    }
  }, {
    key: '_cancelMovement',
    value: function _cancelMovement() {
      // Remove the transition end event for each listener.
      this._transitions.forEach(cancelTransitionEnd);

      // Reset the array.
      this._transitions.length = 0;

      // Show it's no longer active.
      this.isTransitioning = false;
    }

    /**
     * Apply styles without a transition.
     * @param {Array.<Object>} objects Array of transition objects.
     * @private
     */

  }, {
    key: '_styleImmediately',
    value: function _styleImmediately(objects) {
      var _this7 = this;

      if (objects.length) {
        var elements = objects.map(function (obj) {
          return obj.item.element;
        });

        Shuffle._skipTransitions(elements, function () {
          objects.forEach(function (obj) {
            obj.item.applyCss(_this7._getStylesForTransition(obj));
            obj.callback();
          });
        });
      }
    }
  }, {
    key: '_movementFinished',
    value: function _movementFinished() {
      this._transitions.length = 0;
      this.isTransitioning = false;
      this._dispatchLayout();
    }
  }, {
    key: '_dispatchLayout',
    value: function _dispatchLayout() {
      this._dispatch(Shuffle.EventType.LAYOUT);
    }

    /**
     * The magic. This is what makes the plugin 'shuffle'
     * @param {string|Function|Array.<string>} [category] Category to filter by.
     *     Can be a function, string, or array of strings.
     * @param {Object} [sortObj] A sort object which can sort the visible set
     */

  }, {
    key: 'filter',
    value: function filter(category, sortObj) {
      if (!this.isEnabled) {
        return;
      }

      if (!category || category && category.length === 0) {
        category = Shuffle.ALL_ITEMS; // eslint-disable-line no-param-reassign
      }

      this._filter(category);

      // Shrink each hidden item
      this._shrink();

      // How many visible elements?
      this._updateItemCount();

      // Update transforms on visible elements so they will animate to their new positions.
      this.sort(sortObj);
    }

    /**
     * Gets the visible elements, sorts them, and passes them to layout.
     * @param {Object} opts the options object for the sorted plugin
     */

  }, {
    key: 'sort',
    value: function sort() {
      var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.lastSort;

      if (!this.isEnabled) {
        return;
      }

      this._resetCols();

      var items = this._getFilteredItems();
      items = sorter(items, opts);

      this._layout(items);

      // `_layout` always happens after `_shrink`, so it's safe to process the style
      // queue here with styles from the shrink method.
      this._processQueue();

      // Adjust the height of the container.
      this._setContainerSize();

      this.lastSort = opts;
    }

    /**
     * Reposition everything.
     * @param {boolean} isOnlyLayout If true, column and gutter widths won't be
     *     recalculated.
     */

  }, {
    key: 'update',
    value: function update(isOnlyLayout) {
      if (this.isEnabled) {
        if (!isOnlyLayout) {
          // Get updated colCount
          this._setColumns();
        }

        // Layout items
        this.sort();
      }
    }

    /**
     * Use this instead of `update()` if you don't need the columns and gutters updated
     * Maybe an image inside `shuffle` loaded (and now has a height), which means calculations
     * could be off.
     */

  }, {
    key: 'layout',
    value: function layout() {
      this.update(true);
    }

    /**
     * New items have been appended to shuffle. Mix them in with the current
     * filter or sort status.
     * @param {Array.<Element>} newItems Collection of new items.
     */

  }, {
    key: 'add',
    value: function add(newItems) {
      var items = index$1(newItems).map(function (el) {
        return new ShuffleItem(el);
      });

      // Add classes and set initial positions.
      this._initItems(items);

      // Add transition to each item.
      this._setTransitions(items);

      // Update the list of items.
      this.items = this.items.concat(items);
      this._updateItemsOrder();
      this.filter(this.lastFilter);
    }

    /**
     * Disables shuffle from updating dimensions and layout on resize
     */

  }, {
    key: 'disable',
    value: function disable() {
      this.isEnabled = false;
    }

    /**
     * Enables shuffle again
     * @param {boolean} [isUpdateLayout=true] if undefined, shuffle will update columns and gutters
     */

  }, {
    key: 'enable',
    value: function enable(isUpdateLayout) {
      this.isEnabled = true;
      if (isUpdateLayout !== false) {
        this.update();
      }
    }

    /**
     * Remove 1 or more shuffle items
     * @param {Array.<Element>} elements An array containing one or more
     *     elements in shuffle
     * @return {Shuffle} The shuffle object
     */

  }, {
    key: 'remove',
    value: function remove(elements) {
      var _this8 = this;

      if (!elements.length) {
        return;
      }

      var collection = index$1(elements);

      var oldItems = collection.map(function (element) {
        return _this8.getItemByElement(element);
      }).filter(function (item) {
        return !!item;
      });

      var handleLayout = function handleLayout() {
        _this8.element.removeEventListener(Shuffle.EventType.LAYOUT, handleLayout);
        _this8._disposeItems(oldItems);

        // Remove the collection in the callback
        collection.forEach(function (element) {
          element.parentNode.removeChild(element);
        });

        _this8._dispatch(Shuffle.EventType.REMOVED, { collection: collection });
      };

      // Hide collection first.
      this._toggleFilterClasses({
        visible: [],
        hidden: oldItems
      });

      this._shrink(oldItems);

      this.sort();

      // Update the list of items here because `remove` could be called again
      // with an item that is in the process of being removed.
      this.items = this.items.filter(function (item) {
        return !arrayIncludes(oldItems, item);
      });
      this._updateItemCount();

      this.element.addEventListener(Shuffle.EventType.LAYOUT, handleLayout);
    }

    /**
     * Retrieve a shuffle item by its element.
     * @param {Element} element Element to look for.
     * @return {?ShuffleItem} A shuffle item or null if it's not found.
     */

  }, {
    key: 'getItemByElement',
    value: function getItemByElement(element) {
      for (var i = this.items.length - 1; i >= 0; i--) {
        if (this.items[i].element === element) {
          return this.items[i];
        }
      }

      return null;
    }

    /**
     * Destroys shuffle, removes events, styles, and classes
     */

  }, {
    key: 'destroy',
    value: function destroy() {
      this._cancelMovement();
      window.removeEventListener('resize', this._onResize);

      // Reset container styles
      this.element.classList.remove('shuffle');
      this.element.removeAttribute('style');

      // Reset individual item styles
      this._disposeItems();

      // Null DOM references
      this.items = null;
      this.options.sizer = null;
      this.element = null;
      this._transitions = null;

      // Set a flag so if a debounced resize has been triggered,
      // it can first check if it is actually isDestroyed and not doing anything
      this.isDestroyed = true;
    }

    /**
     * Returns the outer width of an element, optionally including its margins.
     *
     * There are a few different methods for getting the width of an element, none of
     * which work perfectly for all Shuffle's use cases.
     *
     * 1. getBoundingClientRect() `left` and `right` properties.
     *   - Accounts for transform scaled elements, making it useless for Shuffle
     *   elements which have shrunk.
     * 2. The `offsetWidth` property.
     *   - This value stays the same regardless of the elements transform property,
     *   however, it does not return subpixel values.
     * 3. getComputedStyle()
     *   - This works great Chrome, Firefox, Safari, but IE<=11 does not include
     *   padding and border when box-sizing: border-box is set, requiring a feature
     *   test and extra work to add the padding back for IE and other browsers which
     *   follow the W3C spec here.
     *
     * @param {Element} element The element.
     * @param {boolean} [includeMargins] Whether to include margins. Default is false.
     * @return {{width: number, height: number}} The width and height.
     */

  }], [{
    key: 'getSize',
    value: function getSize(element, includeMargins) {
      // Store the styles so that they can be used by others without asking for it again.
      var styles = window.getComputedStyle(element, null);
      var width = getNumberStyle(element, 'width', styles);
      var height = getNumberStyle(element, 'height', styles);

      if (includeMargins) {
        var marginLeft = getNumberStyle(element, 'marginLeft', styles);
        var marginRight = getNumberStyle(element, 'marginRight', styles);
        var marginTop = getNumberStyle(element, 'marginTop', styles);
        var marginBottom = getNumberStyle(element, 'marginBottom', styles);
        width += marginLeft + marginRight;
        height += marginTop + marginBottom;
      }

      return {
        width: width,
        height: height
      };
    }

    /**
     * Change a property or execute a function which will not have a transition
     * @param {Array.<Element>} elements DOM elements that won't be transitioned.
     * @param {Function} callback A function which will be called while transition
     *     is set to 0ms.
     * @private
     */

  }, {
    key: '_skipTransitions',
    value: function _skipTransitions(elements, callback) {
      var zero = '0ms';

      // Save current duration and delay.
      var data = elements.map(function (element) {
        var style = element.style;
        var duration = style.transitionDuration;
        var delay = style.transitionDelay;

        // Set the duration to zero so it happens immediately
        style.transitionDuration = zero;
        style.transitionDelay = zero;

        return {
          duration: duration,
          delay: delay
        };
      });

      callback();

      // Cause reflow.
      elements[0].offsetWidth; // eslint-disable-line no-unused-expressions

      // Put the duration back
      elements.forEach(function (element, i) {
        element.style.transitionDuration = data[i].duration;
        element.style.transitionDelay = data[i].delay;
      });
    }
  }]);
  return Shuffle;
}();

Shuffle.ShuffleItem = ShuffleItem;

Shuffle.ALL_ITEMS = 'all';
Shuffle.FILTER_ATTRIBUTE_KEY = 'groups';

/**
 * @enum {string}
 */
Shuffle.EventType = {
  LAYOUT: 'shuffle:layout',
  REMOVED: 'shuffle:removed'
};

/** @enum {string} */
Shuffle.Classes = Classes;

/**
 * @enum {string}
 */
Shuffle.FilterMode = {
  ANY: 'any',
  ALL: 'all'
};

// Overrideable options
Shuffle.options = {
  // Initial filter group.
  group: Shuffle.ALL_ITEMS,

  // Transition/animation speed (milliseconds).
  speed: 250,

  // CSS easing function to use.
  easing: 'ease',

  // e.g. '.picture-item'.
  itemSelector: '*',

  // Element or selector string. Use an element to determine the size of columns
  // and gutters.
  sizer: null,

  // A static number or function that tells the plugin how wide the gutters
  // between columns are (in pixels).
  gutterWidth: 0,

  // A static number or function that returns a number which tells the plugin
  // how wide the columns are (in pixels).
  columnWidth: 0,

  // If your group is not json, and is comma delimeted, you could set delimeter
  // to ','.
  delimeter: null,

  // Useful for percentage based heights when they might not always be exactly
  // the same (in pixels).
  buffer: 0,

  // Reading the width of elements isn't precise enough and can cause columns to
  // jump between values.
  columnThreshold: 0.01,

  // Shuffle can be isInitialized with a sort object. It is the same object
  // given to the sort method.
  initialSort: null,

  // By default, shuffle will throttle resize events. This can be changed or
  // removed.
  throttle: index$2,

  // How often shuffle can be called on resize (in milliseconds).
  throttleTime: 300,

  // Transition delay offset for each item in milliseconds.
  staggerAmount: 15,

  // Maximum stagger delay in milliseconds.
  staggerAmountMax: 250,

  // Whether to use transforms or absolute positioning.
  useTransforms: true,

  // Affects using an array with filter. e.g. `filter(['one', 'two'])`. With "any",
  // the element passes the test if any of its groups are in the array. With "all",
  // the element only passes if all groups are in the array.
  filterMode: Shuffle.FilterMode.ANY
};

// Expose for testing. Hack at your own risk.
Shuffle.__Point = Point;
Shuffle.__sorter = sorter;
Shuffle.__getColumnSpan = getColumnSpan;
Shuffle.__getAvailablePositions = getAvailablePositions;
Shuffle.__getShortColumn = getShortColumn;

return Shuffle;

})));
//# sourceMappingURL=shuffle.js.map
