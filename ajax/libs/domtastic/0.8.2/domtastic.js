!function(_e){function e(){return _e()["default"]};if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.$=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var _each = require('./util').each;
var toArray = require('./util').toArray;
var $ = require('./selector').$;
var matches = require('./selector').matches;


var ArrayProto = Array.prototype;

/**
 * Checks if the given callback returns a true(-ish) value for each element in the collection.
 *
 * @param {Function} callback Function to execute for each element, invoked with `element` as argument.
 * @param {Object} [thisArg] Value to use as `this` when executing `callback`.
 * @return {Boolean} Whether each element passed the callback check.
 * @example
 *     $('.items').every(function(element) {
 *         return element.hasAttribute('active')
 *     });
 *     // true/false
 */

var every = ArrayProto.every;

/**
 * Filter the collection by selector or function, and return a new collection with the result.
 *
 * @param {String|Function} selector Selector or function to filter the collection.
 * @param {Object} [thisArg] Value to use as `this` when executing `callback`.
 * @return {Object} A new wrapped collection
 * @chainable
 * @example
 *     $('.items').filter('.active');
 * @example
 *     $('.items').filter(function(element) {
 *         return element.hasAttribute('active')
 *     });
 */

function filter(selector, thisArg) {
  var callback = typeof selector === "function" ? selector : function (element) {
    return matches(element, selector);
  };
  return $(ArrayProto.filter.call(this, callback, thisArg));
}

/**
 * Execute a function for each element in the collection.
 *
 * @param {Function} callback Function to execute for each element, invoked with `element` as argument.
 * @param {Object} [thisArg] Value to use as `this` when executing `callback`.
 * @return {Object} The wrapped collection
 * @chainable
 * @example
 *     $('.items').forEach(function(element) {
 *         element.style.color = 'evergreen';
 *     );
 */

function forEach(callback, thisArg) {
  return _each(this, callback, thisArg);
}

var each = forEach;

/**
 * Returns the index of an element in the collection.
 *
 * @param {Node} element
 * @return {Number} The zero-based index, -1 if not found.
 * @example
 *     $('.items').indexOf(element);
 *     // 2
 */

var indexOf = ArrayProto.indexOf;

/**
 * Create a new collection by executing the callback for each element in the collection.
 *
 * @param {Function} callback Function to execute for each element, invoked with `element` as argument.
 * @param {Object} [thisArg] Value to use as `this` when executing `callback`.
 * @return {Array} Collection with the return value of the executed callback for each element.
 * @example
 *     $('.items').map(function(element) {
 *         return element.getAttribute('name')
 *     });
 *     // ['ever', 'green']
 */

var map = ArrayProto.map;

/**
 * Removes the last element from the collection, and returns that element.
 *
 * @return {Object} The last element from the collection.
 * @example
 *     var lastElement = $('.items').pop();
 */

var pop = ArrayProto.pop;

/**
 * Adds one or more elements to the end of the collection, and returns the new length of the collection.
 *
 * @param {Object} element Element(s) to add to the collection
 * @return {Number} The new length of the collection
 * @example
 *     $('.items').push(element);
 */

var push = ArrayProto.push;

/**
 * Reverses an array in place. The first array element becomes the last and the last becomes the first.
 *
 * @return {Object} The wrapped collection, reversed
 * @chainable
 * @example
 *     $('.items').reverse();
 */

function reverse() {
  return $(toArray(this).reverse());
}

/**
 * Removes the first element from the collection, and returns that element.
 *
 * @return {Object} The first element from the collection.
 * @example
 *     var firstElement = $('.items').shift();
 */

var shift = ArrayProto.shift;

/**
 * Checks if the given callback returns a true(-ish) value for any of the elements in the collection.
 *
 * @param {Function} callback Function to execute for each element, invoked with `element` as argument.
 * @return {Boolean} Whether any element passed the callback check.
 * @example
 *     $('.items').some(function(element) {
 *         return element.hasAttribute('active')
 *     });
 *     // true/false
 */

var some = ArrayProto.some;

/**
 * Adds one or more elements to the beginning of the collection, and returns the new length of the collection.
 *
 * @param {Object} element Element(s) to add to the collection
 * @return {Number} The new length of the collection
 * @example
 *     $('.items').unshift(element);
 */

var unshift = ArrayProto.unshift;

exports.each = each;
exports.every = every;
exports.filter = filter;
exports.forEach = forEach;
exports.indexOf = indexOf;
exports.map = map;
exports.pop = pop;
exports.push = push;
exports.reverse = reverse;
exports.shift = shift;
exports.some = some;
exports.unshift = unshift;

},{"./selector":14,"./util":18}],2:[function(require,module,exports){
"use strict";

var each = require('./util').each;


/**
 * Get the value of an attribute for the first element, or set one or more attributes for each element in the collection.
 *
 * @param {String|Object} key The name of the attribute to get or set. Or an object containing key-value pairs to set as attributes.
 * @param {String} [value] The value of the attribute to set.
 * @return {Object} The wrapped collection
 * @chainable
 * @example
 *     $('.item').attr('attrName'); // get
 *     $('.item').attr('attrName', 'attrValue'); // set
 *     $('.item').attr({'attr1', 'value1'}, {'attr2', 'value2}); // set multiple
 */

function attr(key, value) {
  if (typeof key === "string" && typeof value === "undefined") {
    var element = this.nodeType ? this : this[0];
    return element ? element.getAttribute(key) : undefined;
  }

  each(this, function (element) {
    if (typeof key === "object") {
      for (var attr in key) {
        element.setAttribute(attr, key[attr]);
      }
    } else {
      element.setAttribute(key, value);
    }
  });

  return this;
}

/**
 * Remove attribute from each element in the collection.
 *
 * @param {String} key Attribute name
 * @return {Object} The wrapped collection
 * @chainable
 * @example
 *     $('.items').removeAttr('attrName');
 */

function removeAttr(key) {
  each(this, function (element) {
    element.removeAttribute(key);
  });
  return this;
}

exports.attr = attr;
exports.removeAttr = removeAttr;

},{"./util":18}],3:[function(require,module,exports){
"use strict";

var makeIterable = require('./util').makeIterable;
var each = require('./util').each;


/**
 * Add a class to the element(s)
 *
 * @param {String} value Space-separated class name(s) to add to the element(s).
 * @return {Object} The wrapped collection
 * @chainable
 * @example
 *     $('.item').addClass('bar');
 *     $('.item').addClass('bar foo');
 */

function addClass(value) {
  if (value && value.length) {
    each(value.split(" "), function (className) {
      each(this, function (element) {
        element.classList.add(className);
      });
    }.bind(this));
  }
  return this;
}

/**
 * Remove a class from the element(s)
 *
 * @param {String} value Space-separated class name(s) to remove from the element(s).
 * @return {Object} The wrapped collection
 * @chainable
 * @example
 *     $('.items').removeClass('bar');
 *     $('.items').removeClass('bar foo');
 */

function removeClass(value) {
  if (value && value.length) {
    each(value.split(" "), function (className) {
      each(this, function (element) {
        element.classList.remove(className);
      });
    }.bind(this));
  }
  return this;
}

/**
 * Toggle a class at the element(s)
 *
 * @param {String} value Space-separated class name(s) to toggle at the element(s).
 * @return {Object} The wrapped collection
 * @chainable
 * @example
 *     $('.item').toggleClass('bar');
 *     $('.item').toggleClass('bar foo');
 */

function toggleClass(value) {
  if (value && value.length) {
    each(value.split(" "), function (className) {
      each(this, function (element) {
        element.classList.toggle(className);
      });
    }.bind(this));
  }
  return this;
}

/**
 * Check if the element(s) have a class.
 *
 * @param {String} value Check if the DOM element contains the class name. When applied to multiple elements,
 * returns `true` if _any_ of them contains the class name.
 * @return {Boolean} Whether the element's class attribute contains the class name.
 * @example
 *     $('.item').hasClass('bar');
 */

function hasClass(value) {
  return (this.nodeType ? [this] : this).some(function (element) {
    return element.classList.contains(value);
  });
}

exports.addClass = addClass;
exports.removeClass = removeClass;
exports.toggleClass = toggleClass;
exports.hasClass = hasClass;

},{"./util":18}],4:[function(require,module,exports){
"use strict";

/**
 * @module contains
 */

/**
 * Test whether an element contains another element in the DOM.
 *
 * @param {Element} container The element that may contain the other element.
 * @param {Element} element The element that may be a descendant of the other element.
 * @return {Boolean} Whether the `container` element contains the `element`.
 * @example
 *     $.contains(parentElement, childElement);
 *     // true/false
 */

function contains(container, element) {
  if (!container || !element || container === element) {
    return false;
  } else if (container.contains) {
    return container.contains(element);
  } else if (container.compareDocumentPosition) {
    return !(container.compareDocumentPosition(element) & Node.DOCUMENT_POSITION_DISCONNECTED);
  }
  return false;
}


exports.contains = contains;

},{}],5:[function(require,module,exports){
"use strict";

var each = require('./util').each;


function isNumeric(value) {
  return !isNaN(parseFloat(value)) && isFinite(value);
}

function camelize(value) {
  return value.replace(/-([\da-z])/gi, function (matches, letter) {
    return letter.toUpperCase();
  });
}

function dasherize(value) {
  return value.replace(/([a-z\d])([A-Z])/g, "$1-$2").toLowerCase();
}

/**
 * Get the value of a style property for the first element, or set one or more style properties for each element in the collection.
 *
 * @param {String|Object} key The name of the style property to get or set. Or an object containing key-value pairs to set as style properties.
 * @param {String} [value] The value of the style property to set.
 * @return {Object} The wrapped collection
 * @chainable
 * @example
 *     $('.item').css('padding-left'); // get
 *     $('.item').css('color', '#f00'); // set
 *     $('.item').css({'border-width', '1px'}, {'display', 'inline-block}); // set multiple
 */

function css(key, value) {
  var styleProps, prop, val;

  if (typeof key === "string") {
    key = camelize(key);

    if (typeof value === "undefined") {
      var element = this.nodeType ? this : this[0];
      if (element) {
        val = element.style[key];
        return isNumeric(val) ? parseFloat(val) : val;
      }
      return undefined;
    }

    styleProps = {};
    styleProps[key] = value;
  } else {
    styleProps = key;
    for (prop in styleProps) {
      val = styleProps[prop];
      delete styleProps[prop];
      styleProps[camelize(prop)] = val;
    }
  }

  each(this, function (element) {
    for (prop in styleProps) {
      if (styleProps[prop] || styleProps[prop] === 0) {
        element.style[prop] = styleProps[prop];
      } else {
        element.style.removeProperty(dasherize(prop));
      }
    }
  });

  return this;
}

exports.css = css;

},{"./util":18}],6:[function(require,module,exports){
"use strict";

var each = require('./util').each;


var dataKeyProp = "__domtastic_data__";

/**
 * Get data from first element, or set data for each element in the collection.
 *
 * @param {String} key The key for the data to get or set.
 * @param {String} [value] The data to set.
 * @return {Object} The wrapped collection
 * @chainable
 * @example
 *     $('.item').data('attrName'); // get
 *     $('.item').data('attrName', {any: 'data'}); // set
 */

function data(key, value) {
  if (typeof key === "string" && typeof value === "undefined") {
    var element = this.nodeType ? this : this[0];
    return element && element[dataKeyProp] ? element[dataKeyProp][key] : undefined;
  }

  each(this, function (element) {
    element[dataKeyProp] = element[dataKeyProp] || {};
    element[dataKeyProp][key] = value;
  });

  return this;
}

/**
 * Get property from first element, or set property on each element in the collection.
 *
 * @param {String} key The name of the property to get or set.
 * @param {String} [value] The value of the property to set.
 * @return {Object} The wrapped collection
 * @chainable
 * @example
 *     $('.item').prop('attrName'); // get
 *     $('.item').prop('attrName', 'attrValue'); // set
 */

function prop(key, value) {
  if (typeof key === "string" && typeof value === "undefined") {
    var element = this.nodeType ? this : this[0];
    return element && element ? element[key] : undefined;
  }

  each(this, function (element) {
    element[key] = value;
  });

  return this;
}


exports.data = data;
exports.prop = prop;

},{"./util":18}],7:[function(require,module,exports){
"use strict";

var toArray = require('./util').toArray;
var $ = require('./selector').$;


/**
 * Append element(s) to each element in the collection.
 *
 * @param {String|Node|NodeList|Object} element What to append to the element(s).
 * Clones elements as necessary.
 * @return {Object} The wrapped collection
 * @chainable
 * @example
 *     $('.item').append('<p>more</p>');
 */

function append(element) {
  if (this instanceof Node) {
    if (typeof element === "string") {
      this.insertAdjacentHTML("beforeend", element);
    } else {
      if (element instanceof Node) {
        this.appendChild(element);
      } else {
        var elements = element instanceof NodeList ? toArray(element) : element;
        elements.forEach(this.appendChild.bind(this));
      }
    }
  } else {
    var l = this.length;
    while (l--) {
      var elm = l === 0 ? element : _clone(element);
      append.call(this[l], elm);
    }
  }
  return this;
}

/**
 * Place element(s) at the beginning of each element in the collection.
 *
 * @param {String|Node|NodeList|Object} element What to place at the beginning of the element(s).
 * Clones elements as necessary.
 * @return {Object} The wrapped collection
 * @chainable
 * @example
 *     $('.item').prepend('<span>start</span>');
 */

function prepend(element) {
  if (this instanceof Node) {
    if (typeof element === "string") {
      this.insertAdjacentHTML("afterbegin", element);
    } else {
      if (element instanceof Node) {
        this.insertBefore(element, this.firstChild);
      } else {
        var elements = element instanceof NodeList ? toArray(element) : element;
        elements.reverse().forEach(prepend.bind(this));
      }
    }
  } else {
    var l = this.length;
    while (l--) {
      var elm = l === 0 ? element : _clone(element);
      prepend.call(this[l], elm);
    }
  }
  return this;
}

/**
 * Place element(s) before each element in the collection.
 *
 * @param {String|Node|NodeList|Object} element What to place as sibling(s) before to the element(s).
 * Clones elements as necessary.
 * @return {Object} The wrapped collection
 * @chainable
 * @example
 *     $('.items').before('<p>prefix</p>');
 */

function before(element) {
  if (this instanceof Node) {
    if (typeof element === "string") {
      this.insertAdjacentHTML("beforebegin", element);
    } else {
      if (element instanceof Node) {
        this.parentNode.insertBefore(element, this);
      } else {
        var elements = element instanceof NodeList ? toArray(element) : element;
        elements.forEach(before.bind(this));
      }
    }
  } else {
    var l = this.length;
    while (l--) {
      var elm = l === 0 ? element : _clone(element);
      before.call(this[l], elm);
    }
  }
  return this;
}

/**
 * Place element(s) after each element in the collection.
 *
 * @param {String|Node|NodeList|Object} element What to place as sibling(s) after to the element(s). Clones elements as necessary.
 * @return {Object} The wrapped collection
 * @chainable
 * @example
 *     $('.items').after('<span>suf</span><span>fix</span>');
 */

function after(element) {
  if (this instanceof Node) {
    if (typeof element === "string") {
      this.insertAdjacentHTML("afterend", element);
    } else {
      if (element instanceof Node) {
        this.parentNode.insertBefore(element, this.nextSibling);
      } else {
        var elements = element instanceof NodeList ? toArray(element) : element;
        elements.reverse().forEach(after.bind(this));
      }
    }
  } else {
    var l = this.length;
    while (l--) {
      var elm = l === 0 ? element : _clone(element);
      after.call(this[l], elm);
    }
  }
  return this;
}

/**
 * Clone a wrapped object.
 *
 * @return {Object} Wrapped collection of cloned nodes.
 * @example
 *     $(element).clone();
 */

function clone() {
  return $(_clone(this));
}

/**
 * Clone an object
 *
 * @param {String|Node|NodeList|Array} element The element(s) to clone.
 * @return {String|Node|NodeList|Array} The cloned element(s)
 * @private
 */

function _clone(element) {
  if (typeof element === "string") {
    return element;
  } else if (element instanceof Node) {
    return element.cloneNode(true);
  } else if ("length" in element) {
    return [].map.call(element, function (el) {
      return el.cloneNode(true);
    });
  }
  return element;
}

exports.append = append;
exports.prepend = prepend;
exports.before = before;
exports.after = after;
exports.clone = clone;

},{"./selector":14,"./util":18}],8:[function(require,module,exports){
"use strict";

var each = require('./util').each;
var append = require('./dom').append;
var before = require('./dom').before;
var after = require('./dom').after;
var $ = require('./selector').$;


/**
 * Append each element in the collection to the specified element(s).
 *
 * @param {Node|NodeList|Object} element What to append the element(s) to. Clones elements as necessary.
 * @return {Object} The wrapped collection
 * @chainable
 * @example
 *     $('.item').appendTo(container);
 */

function appendTo(element) {
  var context = typeof element === "string" ? $(element) : element;
  append.call(context, this);
  return this;
}

/*
 * Empty each element in the collection.
 *
 * @return {Object} The wrapped collection
 * @chainable
 * @example
 *     $('.item').empty();
 */

function empty() {
  return each(this, function (element) {
    element.innerHTML = "";
  });
}

/**
 * Remove the collection from the DOM.
 *
 * @return {Array} Array containing the removed elements
 * @example
 *     $('.item').remove();
 */

function remove() {
  return each(this, function (element) {
    if (element.parentNode) {
      element.parentNode.removeChild(element);
    }
  });
}

/**
 * Replace each element in the collection with the provided new content, and return the array of elements that were replaced.
 *
 * @return {Array} Array containing the replaced elements
 */

function replaceWith() {
  return before.apply(this, arguments).remove();
}

/**
 * Get the `textContent` from the first, or set the `textContent` of each element in the collection.
 *
 * @param {String} [value]
 * @return {Object} The wrapped collection
 * @chainable
 * @example
 *     $('.item').text('New content');
 */

function text(value) {
  if (value === undefined) {
    return this[0].textContent;
  }

  each(this, function (element) {
    element.textContent = "" + value;
  });

  return this;
}

/**
 * Get the `value` from the first, or set the `value` of each element in the collection.
 *
 * @param {String} [value]
 * @return {Object} The wrapped collection
 * @chainable
 * @example
 *     $('input.firstName').value('New value');
 */

function val(value) {
  if (value === undefined) {
    return this[0].value;
  }

  each(this, function (element) {
    element.value = value;
  });

  return this;
}

exports.appendTo = appendTo;
exports.empty = empty;
exports.remove = remove;
exports.replaceWith = replaceWith;
exports.text = text;
exports.val = val;

},{"./dom":7,"./selector":14,"./util":18}],9:[function(require,module,exports){
"use strict";

var each = require('./util').each;
var closest = require('./selector').closest;


/**
 * Shorthand for `addEventListener`. Supports event delegation if a filter (`selector`) is provided.
 *
 * @param {String} eventNames List of space-separated event types to be added to the element(s)
 * @param {String} [selector] Selector to filter descendants that delegate the event to this element.
 * @param {Function} handler Event handler
 * @param {Boolean} useCapture=false
 * @return {Object} The wrapped collection
 * @chainable
 * @example
 *     $('.item').on('click', callback);
 *     $('.container').on('click focus', '.item', handler);
 */

function on(eventNames, selector, handler, useCapture) {
  if (typeof selector === "function") {
    handler = selector;
    selector = null;
  }

  var parts, namespace, eventListener;

  eventNames.split(" ").forEach(function (eventName) {
    parts = eventName.split(".");
    eventName = parts[0] || null;
    namespace = parts[1] || null;

    eventListener = proxyHandler(handler);

    each(this, function (element) {
      if (selector) {
        eventListener = delegateHandler.bind(element, selector, eventListener);
      }

      element.addEventListener(eventName, eventListener, useCapture || false);

      getHandlers(element).push({
        eventName: eventName,
        handler: handler,
        eventListener: eventListener,
        selector: selector,
        namespace: namespace
      });
    });
  }, this);

  return this;
}

/**
 * Shorthand for `removeEventListener`. Delegates to `undelegate` if that signature is used.
 *
 * @param {String} eventNames List of space-separated event types to be removed from the element(s)
 * @param {String} [selector] Selector to filter descendants that undelegate the event to this element.
 * @param {Function} handler Event handler
 * @param {Boolean} useCapture=false
 * @return {Object} The wrapped collection
 * @chainable
 * @example
 *     $('.item').off('click', callback);
 *     $('#my-element').off('myEvent myOtherEvent');
 *     $('.item').off();
 */

function off(eventNames, selector, handler, useCapture) {
  if (eventNames === undefined) eventNames = "";


  if (typeof selector === "function") {
    handler = selector;
    selector = null;
  }

  var parts, namespace, handlers;

  eventNames.split(" ").forEach(function (eventName) {
    parts = eventName.split(".");
    eventName = parts[0] || null;
    namespace = parts[1] || null;

    each(this, function (element) {
      handlers = getHandlers(element);

      each(handlers.filter(function (item) {
        return ((!eventName || item.eventName === eventName) && (!namespace || item.namespace === namespace) && (!handler || item.handler === handler) && (!selector || item.selector === selector));
      }), function (item) {
        element.removeEventListener(item.eventName, item.eventListener, useCapture || false);
        handlers.splice(handlers.indexOf(item), 1);
      });

      if (!eventName && !namespace && !selector && !handler) {
        clearHandlers(element);
      } else if (handlers.length === 0) {
        clearHandlers(element);
      }
    });
  }, this);

  return this;
}

function delegate(selector, eventName, handler) {
  return on.call(this, eventName, selector, handler);
}

function undelegate(selector, eventName, handler) {
  return off.call(this, eventName, selector, handler);
}

/**
 * Get event handlers from an element
 *
 * @private
 * @param {Node} element
 * @return {Array}
 */

var eventKeyProp = "__domtastic_event__";
var id = 1;
var handlers = {};
var unusedKeys = [];

function getHandlers(element) {
  if (!element[eventKeyProp]) {
    element[eventKeyProp] = unusedKeys.length === 0 ? ++id : unusedKeys.pop();
  }
  var key = element[eventKeyProp];
  return handlers[key] || (handlers[key] = []);
}

/**
 * Clear event handlers for an element
 *
 * @private
 * @param {Node} element
 */

function clearHandlers(element) {
  var key = element[eventKeyProp];
  if (handlers[key]) {
    handlers[key] = null;
    element[key] = null;
    unusedKeys.push(key);
  }
}

/**
 * Function to create a handler that augments the event object with some extra methods,
 * and executes the callback with the event and the event data (i.e. `event.detail`).
 *
 * @private
 * @param handler Callback to execute as `handler(event, data)`
 * @return {Function}
 */

function proxyHandler(handler) {
  return function (event) {
    handler.call(this, augmentEvent(event), event.detail);
  };
}

/**
 * Attempt to augment events and implement something closer to DOM Level 3 Events.
 *
 * @private
 * @param {Object} event
 * @return {Function}
 */

var augmentEvent = (function () {
  var methodName, eventMethods = {
    preventDefault: "isDefaultPrevented",
    stopImmediatePropagation: "isImmediatePropagationStopped",
    stopPropagation: "isPropagationStopped"
  }, returnTrue = function () {
    return true;
  }, returnFalse = function () {
    return false;
  };

  return function (event) {
    if (!event.isDefaultPrevented || event.stopImmediatePropagation || event.stopPropagation) {
      for (methodName in eventMethods) {
        (function (methodName, testMethodName, originalMethod) {
          event[methodName] = function () {
            this[testMethodName] = returnTrue;
            return originalMethod && originalMethod.apply(this, arguments);
          };
          event[testMethodName] = returnFalse;
        }(methodName, eventMethods[methodName], event[methodName]));
      }
      if (event._preventDefault) {
        event.preventDefault();
      }
    }
    return event;
  };
})();

/**
 * Function to test whether delegated events match the provided `selector` (filter),
 * if the event propagation was stopped, and then actually call the provided event handler.
 * Use `this` instead of `event.currentTarget` on the event object.
 *
 * @private
 * @param {String} selector Selector to filter descendants that undelegate the event to this element.
 * @param {Function} handler Event handler
 * @param {Event} event
 */

function delegateHandler(selector, handler, event) {
  var eventTarget = event._target || event.target, currentTarget = closest.call([eventTarget], selector, this)[0];
  if (currentTarget && currentTarget !== this) {
    if (currentTarget === eventTarget || !(event.isPropagationStopped && event.isPropagationStopped())) {
      handler.call(currentTarget, event);
    }
  }
}

var bind = on, unbind = off;

exports.on = on;
exports.off = off;
exports.delegate = delegate;
exports.undelegate = undelegate;
exports.bind = bind;
exports.unbind = unbind;

},{"./selector":14,"./util":18}],10:[function(require,module,exports){
"use strict";

var each = require('./util').each;


/*
 * Get the HTML contents of the first element, or set the HTML contents for each element in the collection.
 *
 * @param {String} [fragment] HTML fragment to set for the element. If this argument is omitted, the HTML contents are returned.
 * @return {Object} The wrapped collection
 * @chainable
 * @example
 *     $('.item').html();
 *     $('.item').html('<span>more</span>');
 */

function html(fragment) {
  if (typeof fragment !== "string") {
    var element = this.nodeType ? this : this[0];
    return element ? element.innerHTML : undefined;
  }

  each(this, function (element) {
    element.innerHTML = fragment;
  });

  return this;
}

exports.html = html;

},{"./util":18}],11:[function(require,module,exports){
"use strict";

var global = require('./util').global;


var isNative = false;

function native(goNative) {
  if (goNative === undefined) goNative = true;
  var wasNative = isNative;
  isNative = goNative;
  if (global.$) {
    global.$.isNative = isNative;
  }
  if (!wasNative && isNative) {
    augmentNativePrototypes(this.fn, this.fnList);
  }
  if (wasNative && !isNative) {
    unaugmentNativePrototypes(this.fn, this.fnList);
  }
  return isNative;
}

var NodeProto = typeof Node !== "undefined" && Node.prototype, NodeListProto = typeof NodeList !== "undefined" && NodeList.prototype;

/*
 * Add a property (i.e. method) to an object in a safe and reversible manner.
 * Only add the method if object not already had it (non-inherited).
 *
 * @private
 */

function augment(obj, key, value) {
  if (!obj.hasOwnProperty(key)) {
    Object.defineProperty(obj, key, {
      value: value,
      configurable: true,
      enumerable: false
    });
  }
}

/*
 * Remove property from object (only inherited properties will be removed).
 *
 * @private
 */

var unaugment = function (obj, key) {
  delete obj[key];
};

/*
 * Augment native `Node` and `NodeList` objects in native mode.
 *
 * @private
 */

function augmentNativePrototypes(methodsNode, methodsNodeList) {
  var key;

  for (key in methodsNode) {
    augment(NodeProto, key, methodsNode[key]);
    augment(NodeListProto, key, methodsNode[key]);
  }

  for (key in methodsNodeList) {
    augment(NodeListProto, key, methodsNodeList[key]);
  }
}

/*
 * Unaugment native `Node` and `NodeList` objects to switch back to default mode.
 * Mainly used for tests.
 *
 * @private
 */

function unaugmentNativePrototypes(methodsNode, methodsNodeList) {
  var key;

  for (key in methodsNode) {
    unaugment(NodeProto, key);
    unaugment(NodeListProto, key);
  }

  for (key in methodsNodeList) {
    unaugment(NodeListProto, key);
  }
}

exports.isNative = isNative;
exports.native = native;

},{"./util":18}],12:[function(require,module,exports){
"use strict";

var global = require('./util').global;


/*
 * Save the previous value of the global `$` variable, so that it can be restored later on.
 * @private
 */

var previousLib = global.$;

/**
 * In case another library sets the global `$` variable before DOMtastic does,
 * this method can be used to return the global `$` to that other library.
 *
 * @return {Object} Reference to DOMtastic.
 * @example
 *     var $E = $.noConflict();
 */

function noConflict() {
  global.$ = previousLib;
  return this;
}

exports.noConflict = noConflict;

},{"./util":18}],13:[function(require,module,exports){
"use strict";

/**
 * @module Ready
 */

/**
 * Execute callback when `DOMContentLoaded` fires for `document`, or immediately if called afterwards.
 *
 * @param handler Callback to execute when initial DOM content is loaded.
 * @return {Object} The wrapped collection
 * @chainable
 * @example
 *     $(document).ready(callback);
 */

function ready(handler) {
  if (/complete|loaded|interactive/.test(document.readyState) && document.body) {
    handler();
  } else {
    document.addEventListener("DOMContentLoaded", handler, false);
  }
  return this;
}

exports.ready = ready;

},{}],14:[function(require,module,exports){
"use strict";

var global = require('./util').global;
var makeIterable = require('./util').makeIterable;


var isPrototypeSet = false, reFragment = /^\s*<(\w+|!)[^>]*>/, reSingleTag = /^<(\w+)\s*\/?>(?:<\/\1>|)$/, reSimpleSelector = /^[\.#]?[\w-]*$/;

/*
 * Versatile wrapper for `querySelectorAll`.
 *
 * @param {String|Node|NodeList|Array} selector Query selector, `Node`, `NodeList`, array of elements, or HTML fragment string.
 * @param {String|Node|NodeList} context=document The context for the selector to query elements.
 * @return {Object} The wrapped collection
 * @chainable
 * @example
 *     var $items = $(.items');
 * @example
 *     var $element = $(domElement);
 * @example
 *     var $list = $(nodeList, document.body);
 * @example
 *     var $element = $('<p>evergreen</p>');
 */

function $(selector, context) {
  if (context === undefined) context = document;


  var collection;

  if (!selector) {
    collection = document.querySelectorAll(null);
  } else if (selector instanceof Wrapper) {
    return selector;
  } else if (typeof selector !== "string") {
    collection = selector.nodeType || selector === window ? [selector] : selector;
  } else if (reFragment.test(selector)) {
    collection = createFragment(selector);
  } else {
    context = typeof context === "string" ? document.querySelector(context) : context.length ? context[0] : context;

    collection = querySelector(selector, context);
  }

  return $.isNative ? collection : wrap(collection);
}

/*
 * Chaining for the `$` wrapper (aliasing `find` for `$`).
 *
 * @param {String|Node|NodeList|Array} selector Query selector, `Node`, `NodeList`, array of elements, or HTML fragment string.
 * @return {Object} The wrapped collection
 * @example
 *     $('.selector').find('.deep').$('.deepest');
 */

function find(selector) {
  return $(selector, this);
}

/**
 * Return the closest element matching the selector (starting by itself).
 *
 * @param {String} selector Filter
 * @param {Object} [context] If provided, matching elements must be a descendant of this element
 * @return {Object} New wrapped collection (containing zero or one element)
 * @chainable
 * @example
 *     $('.selector').closest('.container');
 */

var closest = (function () {
  function closest(selector, context) {
    var node = this[0];
    while (node && node !== context) {
      if (matches(node, selector)) {
        return $(node);
      } else {
        node = node.parentElement;
      }
    }
    return $();
  }

  return !Element.prototype.closest ? closest : function (selector, context) {
    if (!context) {
      var node = this[0];
      return $(node.closest(selector));
    } else {
      return closest.call(this, selector, context);
    }
  };
})();

/*
 * Returns `true` if the element would be selected by the specified selector string; otherwise, returns `false`.
 *
 * @param {Node} element Element to test
 * @param {String} selector Selector to match against element
 * @return {Boolean}
 *
 * @example
 *     $.matches(element, '.match');
 */

var matches = (function () {
  var context = typeof Element !== "undefined" ? Element.prototype : global, _matches = context.matches || context.matchesSelector || context.mozMatchesSelector || context.msMatchesSelector || context.oMatchesSelector || context.webkitMatchesSelector;
  return function (element, selector) {
    return _matches.call(element, selector);
  };
})();

/*
 * Use the faster `getElementById`, `getElementsByClassName` or `getElementsByTagName` over `querySelectorAll` if possible.
 *
 * @private
 * @param {String} selector Query selector.
 * @param {Node} context The context for the selector to query elements.
 * @return {Object} NodeList, HTMLCollection, or Array of matching elements (depending on method used).
 */

function querySelector(selector, context) {
  var isSimpleSelector = reSimpleSelector.test(selector);

  if (isSimpleSelector && !$.isNative) {
    if (selector[0] === "#") {
      var element = (context.getElementById ? context : document).getElementById(selector.slice(1));
      return element ? [element] : [];
    }
    if (selector[0] === ".") {
      return context.getElementsByClassName(selector.slice(1));
    }
    return context.getElementsByTagName(selector);
  }

  return context.querySelectorAll(selector);
}

/*
 * Create DOM fragment from an HTML string
 *
 * @private
 * @param {String} html String representing HTML.
 * @return {NodeList}
 */

function createFragment(html) {
  if (reSingleTag.test(html)) {
    return [document.createElement(RegExp.$1)];
  }

  var elements = [], container = document.createElement("div"), children = container.childNodes;

  container.innerHTML = html;

  for (var i = 0, l = children.length; i < l; i++) {
    elements.push(children[i]);
  }

  return elements;
}

/*
 * Calling `$(selector)` returns a wrapped collection of elements.
 *
 * @private
 * @param {NodeList|Array} collection Element(s) to wrap.
 * @return (Object) The wrapped collection
 */

function wrap(collection) {
  if (!isPrototypeSet) {
    Wrapper.prototype = $.fn;
    Wrapper.prototype.constructor = Wrapper;
    isPrototypeSet = true;
  }

  return new Wrapper(collection);
}

/*
 * Constructor for the Object.prototype strategy
 *
 * @constructor
 * @private
 * @param {NodeList|Array} collection Element(s) to wrap.
 */

function Wrapper(collection) {
  var i = 0, length = collection.length;
  for (; i < length;) {
    this[i] = collection[i++];
  }
  this.length = length;
}

exports.$ = $;
exports.find = find;
exports.closest = closest;
exports.matches = matches;

},{"./util":18}],15:[function(require,module,exports){
"use strict";

var each = require('./util').each;
var toArray = require('./util').toArray;
var $ = require('./selector').$;
var matches = require('./selector').matches;


/**
 * Return children of each element in the collection, optionally filtered by a selector.
 *
 * @param {String} [selector] Filter
 * @return {Object} New wrapped collection
 * @chainable
 * @example
 *     $('.selector').children();
 *     $('.selector').children('.filter');
 */

function children(selector) {
  var nodes = [];
  each(this, function (element) {
    if (element.children) {
      each(element.children, function (child) {
        if (!selector || (selector && matches(child, selector))) {
          nodes.push(child);
        }
      });
    }
  });
  return $(nodes);
}

/**
 * Return child nodes of each element in the collection, including text and comment nodes.
 *
 * @return {Object} New wrapped collection
 * @example
 *     $('.selector').contents();
 */

function contents() {
  var nodes = [];
  each(this, function (element) {
    nodes.push.apply(nodes, toArray(element.childNodes));
  });
  return $(nodes);
}

/**
 * Return a collection containing only the one at the specified index.
 *
 * @param {Number} index
 * @return {Object} New wrapped collection
 * @chainable
 * @example
 *     $('.items').eq(1)
 *     // The second item; result is the same as doing $($('.items')[1]);
 */

function eq(index) {
  return slice.call(this, index, index + 1);
}

/**
 * Return the DOM element at the specified index.
 *
 * @param {Number} index
 * @return {Node} Element at the specified index
 * @example
 *     $('.items').get(1)
 *     // The second element; result is the same as doing $('.items')[1];
 */

function get(index) {
  return this[index];
}

/**
 * Return the parent elements of each element in the collection, optionally filtered by a selector.
 *
 * @param {String} [selector] Filter
 * @return {Object} New wrapped collection
 * @chainable
 * @example
 *     $('.selector').parent();
 *     $('.selector').parent('.filter');
 */

function parent(selector) {
  var nodes = [];
  each(this, function (element) {
    if (!selector || (selector && matches(element.parentNode, selector))) {
      nodes.push(element.parentNode);
    }
  });
  return $(nodes);
}

/**
 * Create a new, sliced collection.
 *
 * @param {Number} start
 * @param {Number} end
 * @return {Object} New wrapped collection
 * @example
 *     $('.items').slice(1, 3)
 *     // New wrapped collection containing the second, third, and fourth element.
 */

function slice(start, end) {
  return $([].slice.apply(this, arguments));
}

exports.children = children;
exports.contents = contents;
exports.eq = eq;
exports.get = get;
exports.parent = parent;
exports.slice = slice;

},{"./selector":14,"./util":18}],16:[function(require,module,exports){
"use strict";

var global = require('./util').global;
var each = require('./util').each;
var contains = require('./contains').contains;


var reMouseEvent = /^(?:mouse|pointer|contextmenu)|click/, reKeyEvent = /^key/;

/**
 * Trigger event at element(s)
 *
 * @param {String} type Type of the event
 * @param {Object} data Data to be sent with the event (`params.detail` will be set to this).
 * @param {Object} [params] Event parameters (optional)
 * @param {Boolean} params.bubbles=true Does the event bubble up through the DOM or not.
 * @param {Boolean} params.cancelable=true Is the event cancelable or not.
 * @param {Mixed} params.detail=undefined Additional information about the event.
 * @return {Object} The wrapped collection
 * @chainable
 * @example
 *     $('.item').trigger('anyEventType');
 */

function trigger(type, data, params) {
  if (params === undefined) params = {};


  params.bubbles = typeof params.bubbles === "boolean" ? params.bubbles : true;
  params.cancelable = typeof params.cancelable === "boolean" ? params.cancelable : true;
  params.preventDefault = typeof params.preventDefault === "boolean" ? params.preventDefault : false;
  params.detail = data;

  var EventConstructor = getEventConstructor(type), event = new EventConstructor(type, params);

  event._preventDefault = params.preventDefault;

  each(this, function (element) {
    if (!params.bubbles || isEventBubblingInDetachedTree || isAttachedToDocument(element)) {
      dispatchEvent(element, event);
    } else {
      triggerForPath(element, type, params);
    }
  });
  return this;
}

function getEventConstructor(type) {
  return supportsOtherEventConstructors ? (reMouseEvent.test(type) ? MouseEvent : (reKeyEvent.test(type) ? KeyboardEvent : CustomEvent)) : CustomEvent;
}

/**
 * Trigger event at first element in the collection. Similar to `trigger()`, except:
 *
 * - Event does not bubble
 * - Default event behavior is prevented
 * - Only triggers handler for first matching element
 *
 * @param {String} type Type of the event
 * @param {Object} data Data to be sent with the event
 * @example
 *     $('form').triggerHandler('submit');
 */

function triggerHandler(type, data) {
  if (this[0]) {
    trigger.call(this[0], type, data, { bubbles: false, preventDefault: true });
  }
}

/**
 * Check whether the element is attached to (or detached from) the document
 *
 * @private
 * @param {Node} element Element to test
 * @return {Boolean}
 */

function isAttachedToDocument(element) {
  if (element === window || element === document) {
    return true;
  }
  return contains(element.ownerDocument.documentElement, element);
}

/**
 * Dispatch the event at the element and its ancestors.
 * Required to support delegated events in browsers that don't bubble events in detached DOM trees.
 *
 * @private
 * @param {Node} element First element to dispatch the event at
 * @param {String} type Type of the event
 * @param {Object} [params] Event parameters (optional)
 * @param {Boolean} params.bubbles=true Does the event bubble up through the DOM or not.
 * Will be set to false (but shouldn't matter since events don't bubble anyway).
 * @param {Boolean} params.cancelable=true Is the event cancelable or not.
 * @param {Mixed} params.detail=undefined Additional information about the event.
 */

function triggerForPath(element, type, params) {
  if (params === undefined) params = {};
  params.bubbles = false;
  var event = new CustomEvent(type, params);
  event._target = element;
  do {
    dispatchEvent(element, event);
  } while (element = element.parentNode);
}

/**
 * Dispatch event to element, but call direct event methods instead if available
 * (e.g. "blur()", "submit()") and if the event is non-cancelable.
 *
 * @private
 * @param {Node} element Element to dispatch the event at
 * @param {Object} event Event to dispatch
 */

var directEventMethods = ["blur", "focus", "select", "submit"];

function dispatchEvent(element, event) {
  if (directEventMethods.indexOf(event.type) !== -1 && typeof element[event.type] === "function" && !event._preventDefault && !event.cancelable) {
    element[event.type]();
  } else {
    element.dispatchEvent(event);
  }
}

/**
 * Polyfill for CustomEvent, borrowed from [MDN](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent#Polyfill).
 * Needed to support IE (9, 10, 11) & PhantomJS
 */

(function () {
  function CustomEvent(event, params) {
    if (params === undefined) params = { bubbles: false, cancelable: false, detail: undefined };
    var customEvent = document.createEvent("CustomEvent");
    customEvent.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
    return customEvent;
  }

  CustomEvent.prototype = global.CustomEvent && global.CustomEvent.prototype;
  global.CustomEvent = CustomEvent;
})();

/*
 * Are events bubbling in detached DOM trees?
 * @private
 */

var isEventBubblingInDetachedTree = (function () {
  var isBubbling = false, doc = global.document;
  if (doc) {
    var parent = doc.createElement("div"), child = parent.cloneNode();
    parent.appendChild(child);
    parent.addEventListener("e", function () {
      isBubbling = true;
    });
    child.dispatchEvent(new CustomEvent("e", { bubbles: true }));
  }
  return isBubbling;
})();

var supportsOtherEventConstructors = (function () {
  try {
    new window.MouseEvent("click");
  } catch (e) {
    return false;
  }
  return true;
})();

exports.trigger = trigger;
exports.triggerHandler = triggerHandler;

},{"./contains":4,"./util":18}],17:[function(require,module,exports){
"use strict";

/**
 * @module Type
 */

/*
 * Determine if the argument passed is a Javascript function object.
 *
 * @param {Object} [obj] Object to test whether or not it is a function.
 * @return {boolean} 
 * @example
 *     $.isFunction(function(){});
 *     // true
 * @example
 *     $.isFunction({});
 *     // false
 */

function isFunction(obj) {
  return (typeof obj === "function");
}

/*
 * Determine whether the argument is an array.
 *
 * @param {Object} [obj] Object to test whether or not it is an array.
 * @return {boolean} 
 * @example
 *     $.isArray([]);
 *     // true
 * @example
 *     $.isArray({});
 *     // false
 */

var isArray = Array.isArray;

exports.isArray = isArray;
exports.isFunction = isFunction;

},{}],18:[function(require,module,exports){
"use strict";

var _slice = Array.prototype.slice;
/*
 * @module Util
 */

/*
 * Reference to the global scope
 * @private
 */

var global = new Function("return this")();

/**
 * Convert `NodeList` to `Array`.
 *
 * @param {NodeList|Array} collection
 * @return {Array}
 * @private
 */

function toArray(collection) {
  var length = collection.length, result = new Array(length);
  for (var i = 0; i < length; i++) {
    result[i] = collection[i];
  }
  return result;
}

/**
 * Faster alternative to [].forEach method
 *
 * @param {Node|NodeList|Array} collection
 * @param {Function} callback
 * @return {Node|NodeList|Array}
 * @private
 */

function each(collection, callback, thisArg) {
  var length = collection.length;
  if (length !== undefined && collection.nodeType === undefined) {
    for (var i = 0; i < length; i++) {
      callback.call(thisArg, collection[i], i, collection);
    }
  } else {
    callback.call(thisArg, collection, 0, collection);
  }
  return collection;
}

/**
 * Assign enumerable properties from source object(s) to target object
 *
 * @method extend
 * @param {Object} target Object to extend
 * @param {Object} [source] Object to extend from
 * @return {Object} Extended object
 * @example
 *     $.extend({a: 1}, {b: 2});
 *     // {a: 1, b: 2}
 * @example
 *     $.extend({a: 1}, {b: 2}, {a: 3});
 *     // {a: 3, b: 2}
 */

function extend(target) {
  var sources = _slice.call(arguments, 1);

  sources.forEach(function (src) {
    for (var prop in src) {
      target[prop] = src[prop];
    }
  });
  return target;
}

exports.global = global;
exports.toArray = toArray;
exports.each = each;
exports.extend = extend;

},{}],19:[function(require,module,exports){
"use strict";

var extend = require('./util').extend;


var api = {}, apiNodeList = {}, $ = {};

var array = require('./array');

var attr = require('./attr');

var class_ = require('./class');

var contains = require('./contains');

var css = require('./css');

var data = require('./data');

var dom = require('./dom');

var dom_extra = require('./dom_extra');

var event = require('./event');

var html = require('./html');

var mode = require('./mode');

var noconflict = require('./noconflict');

var ready = require('./ready');

var selector = require('./selector');

var selector_extra = require('./selector_extra');

var trigger = require('./trigger');

var type = require('./type');

if (typeof selector !== "undefined") {
  $ = selector.$;
  $.matches = selector.matches;
  api.find = selector.find;
  api.closest = selector.closest;
}

extend($, contains, mode, noconflict, type);
extend(api, array, attr, class_, css, data, dom, dom_extra, event, html, ready, selector_extra, trigger);
extend(apiNodeList, array);

// Version

$.version = "0.8.2";

// Util

$.extend = extend;

// Internal properties to switch between default and native mode

$.fn = api;
$.fnList = apiNodeList;

exports["default"] = $;

},{"./array":1,"./attr":2,"./class":3,"./contains":4,"./css":5,"./data":6,"./dom":7,"./dom_extra":8,"./event":9,"./html":10,"./mode":11,"./noconflict":12,"./ready":13,"./selector":14,"./selector_extra":15,"./trigger":16,"./type":17,"./util":18}]},{},[19])(19)
});


//# sourceMappingURL=domtastic.js.map