/*!
 * HTML Inspector - v0.7.0
 *
 * Copyright (c) 2013 Philip Walton <http://philipwalton.com>
 * Released under the MIT license
 *
 * Date: 2013-11-09
 */

!function(e){"object"==typeof exports?module.exports=e():"function"==typeof define&&define.amd?define(e):"undefined"!=typeof window?window.HTMLInspector=e():"undefined"!=typeof global?global.HTMLInspector=e():"undefined"!=typeof self&&(self.HTMLInspector=e())}(function(){var define,module,exports;
return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * Get an object representation of an element's attributes
 */
function getAttributes(element) {
  var map = element.attributes
    , len = map.length
    , i = 0
    , attr
    , attrs = {}

  // return an empty array if there are no attributes
  if (len === 0) return {}

  while (attr = map[i++]) {
    attrs[attr.name] = attr.value
  }
  return attrs
}

module.exports = getAttributes


},{}],2:[function(require,module,exports){
var toArray = require("mout/lang/toArray")

/**
 * Detects the browser's native matches() implementation
 * and calls that. Error if not found.
 */
function matchesSelector(element, selector) {
  var i = 0
    , method
    , methods = [
        "matches",
        "matchesSelector",
        "webkitMatchesSelector",
        "mozMatchesSelector",
        "msMatchesSelector",
        "oMatchesSelector"
      ]
  while (method = methods[i++]) {
    if (typeof element[method] == "function")
      return element[method](selector)
  }
  throw new Error("You are using a browser that doesn't not support"
    + " element.matches() or element.matchesSelector()")
}

/**
 * Similar to jQuery's .is() method
 * Accepts a DOM element and an object to test against
 *
 * The test object can be a DOM element, a string selector, an array of
 * DOM elements or string selectors.
 *
 * Returns true if the element matches any part of the test
 */
function matches(element, test) {
  // test can be null, but if it is, it never matches
  if (test == null) {
    return false
  }
  // if test is a string or DOM element convert it to an array,
  else if (typeof test == "string" || test.nodeType) {
    test = [test]
  }
  // if it has a length property call toArray in case it's array-like
  else if ("length" in test) {
    test = toArray(test)
  }

  return test.some(function(item) {
    if (typeof item == "string")
      return matchesSelector(element, item)
    else
      return element === item
  })
}

module.exports = matches


},{"mout/lang/toArray":13}],3:[function(require,module,exports){
/**
 * Returns an array of the element's parent elements
 */

function parents(element) {
  var list = []
  while (element.parentNode && element.parentNode.nodeType == 1) {
    list.push(element = element.parentNode)
  }
  return list
}

module.exports = parents

},{}],4:[function(require,module,exports){
var makeIterator = require('../function/makeIterator_');

    /**
     * Array filter
     */
    function filter(arr, callback, thisObj) {
        callback = makeIterator(callback, thisObj);
        var results = [];
        if (arr == null) {
            return results;
        }

        var i = -1, len = arr.length, value;
        while (++i < len) {
            value = arr[i];
            if (callback(value, i, arr)) {
                results.push(value);
            }
        }

        return results;
    }

    module.exports = filter;



},{"../function/makeIterator_":7}],5:[function(require,module,exports){


    /**
     * Array.indexOf
     */
    function indexOf(arr, item, fromIndex) {
        fromIndex = fromIndex || 0;
        if (arr == null) {
            return -1;
        }

        var len = arr.length,
            i = fromIndex < 0 ? len + fromIndex : fromIndex;
        while (i < len) {
            // we iterate over sparse items since there is no way to make it
            // work properly on IE 7-8. see #64
            if (arr[i] === item) {
                return i;
            }

            i++;
        }

        return -1;
    }

    module.exports = indexOf;


},{}],6:[function(require,module,exports){
var indexOf = require('./indexOf');
var filter = require('./filter');

    /**
     * @return {array} Array of unique items
     */
    function unique(arr){
        return filter(arr, isUnique);
    }

    function isUnique(item, i, arr){
        return indexOf(arr, item, i+1) === -1;
    }

    module.exports = unique;



},{"./filter":4,"./indexOf":5}],7:[function(require,module,exports){
var prop = require('./prop');
var deepMatches = require('../object/deepMatches');

    /**
     * Converts argument into a valid iterator.
     * Used internally on most array/object/collection methods that receives a
     * callback/iterator providing a shortcut syntax.
     */
    function makeIterator(src, thisObj){
        switch(typeof src) {
            case 'function':
                // function is the first to improve perf (most common case)
                return (typeof thisObj !== 'undefined')? function(val, i, arr){
                    return src.call(thisObj, val, i, arr);
                } : src;
            case 'object':
                // typeof null == "object"
                return (src != null)? function(val){
                    return deepMatches(val, src);
                } : src;
            case 'string':
            case 'number':
                return prop(src);
            default:
                return src;
        }
    }

    module.exports = makeIterator;



},{"../object/deepMatches":14,"./prop":8}],8:[function(require,module,exports){


    /**
     * Returns a function that gets a property of the passed object
     */
    function prop(name){
        return function(obj){
            return obj[name];
        };
    }

    module.exports = prop;



},{}],9:[function(require,module,exports){
var isKind = require('./isKind');
    /**
     */
    var isArray = Array.isArray || function (val) {
        return isKind(val, 'Array');
    };
    module.exports = isArray;


},{"./isKind":10}],10:[function(require,module,exports){
var kindOf = require('./kindOf');
    /**
     * Check if value is from a specific "kind".
     */
    function isKind(val, kind){
        return kindOf(val) === kind;
    }
    module.exports = isKind;


},{"./kindOf":12}],11:[function(require,module,exports){
var isKind = require('./isKind');
    /**
     */
    function isRegExp(val) {
        return isKind(val, 'RegExp');
    }
    module.exports = isRegExp;


},{"./isKind":10}],12:[function(require,module,exports){


    var _rKind = /^\[object (.*)\]$/,
        _toString = Object.prototype.toString,
        UNDEF;

    /**
     * Gets the "kind" of value. (e.g. "String", "Number", etc)
     */
    function kindOf(val) {
        if (val === null) {
            return 'Null';
        } else if (val === UNDEF) {
            return 'Undefined';
        } else {
            return _rKind.exec( _toString.call(val) )[1];
        }
    }
    module.exports = kindOf;


},{}],13:[function(require,module,exports){
var kindOf = require('./kindOf');

    var _win = this;

    /**
     * Convert array-like object into array
     */
    function toArray(val){
        var ret = [],
            kind = kindOf(val),
            n;

        if (val != null) {
            if ( val.length == null || kind === 'String' || kind === 'Function' || kind === 'RegExp' || val === _win ) {
                //string, regexp, function have .length but user probably just want
                //to wrap value into an array..
                ret[ret.length] = val;
            } else {
                //window returns true on isObject in IE7 and may have length
                //property. `typeof NodeList` returns `function` on Safari so
                //we can't use it (#58)
                n = val.length;
                while (n--) {
                    ret[n] = val[n];
                }
            }
        }
        return ret;
    }
    module.exports = toArray;


},{"./kindOf":12}],14:[function(require,module,exports){
var forOwn = require('./forOwn');
var isArray = require('../lang/isArray');

    function containsMatch(array, pattern) {
        var i = -1, length = array.length;
        while (++i < length) {
            if (deepMatches(array[i], pattern)) {
                return true;
            }
        }

        return false;
    }

    function matchArray(target, pattern) {
        var i = -1, patternLength = pattern.length;
        while (++i < patternLength) {
            if (!containsMatch(target, pattern[i])) {
                return false;
            }
        }

        return true;
    }

    function matchObject(target, pattern) {
        var result = true;
        forOwn(pattern, function(val, key) {
            if (!deepMatches(target[key], val)) {
                // Return false to break out of forOwn early
                return (result = false);
            }
        });

        return result;
    }

    /**
     * Recursively check if the objects match.
     */
    function deepMatches(target, pattern){
        if (target && typeof target === 'object') {
            if (isArray(target) && isArray(pattern)) {
                return matchArray(target, pattern);
            } else {
                return matchObject(target, pattern);
            }
        } else {
            return target === pattern;
        }
    }

    module.exports = deepMatches;



},{"../lang/isArray":9,"./forOwn":16}],15:[function(require,module,exports){


    var _hasDontEnumBug,
        _dontEnums;

    function checkDontEnum(){
        _dontEnums = [
                'toString',
                'toLocaleString',
                'valueOf',
                'hasOwnProperty',
                'isPrototypeOf',
                'propertyIsEnumerable',
                'constructor'
            ];

        _hasDontEnumBug = true;

        for (var key in {'toString': null}) {
            _hasDontEnumBug = false;
        }
    }

    /**
     * Similar to Array/forEach but works over object properties and fixes Don't
     * Enum bug on IE.
     * based on: http://whattheheadsaid.com/2010/10/a-safer-object-keys-compatibility-implementation
     */
    function forIn(obj, fn, thisObj){
        var key, i = 0;
        // no need to check if argument is a real object that way we can use
        // it for arrays, functions, date, etc.

        //post-pone check till needed
        if (_hasDontEnumBug == null) checkDontEnum();

        for (key in obj) {
            if (exec(fn, obj, key, thisObj) === false) {
                break;
            }
        }

        if (_hasDontEnumBug) {
            while (key = _dontEnums[i++]) {
                // since we aren't using hasOwn check we need to make sure the
                // property was overwritten
                if (obj[key] !== Object.prototype[key]) {
                    if (exec(fn, obj, key, thisObj) === false) {
                        break;
                    }
                }
            }
        }
    }

    function exec(fn, obj, key, thisObj){
        return fn.call(thisObj, obj[key], key, obj);
    }

    module.exports = forIn;



},{}],16:[function(require,module,exports){
var hasOwn = require('./hasOwn');
var forIn = require('./forIn');

    /**
     * Similar to Array/forEach but works over object properties and fixes Don't
     * Enum bug on IE.
     * based on: http://whattheheadsaid.com/2010/10/a-safer-object-keys-compatibility-implementation
     */
    function forOwn(obj, fn, thisObj){
        forIn(obj, function(val, key){
            if (hasOwn(obj, key)) {
                return fn.call(thisObj, obj[key], key, obj);
            }
        });
    }

    module.exports = forOwn;



},{"./forIn":15,"./hasOwn":17}],17:[function(require,module,exports){


    /**
     * Safer Object.hasOwnProperty
     */
     function hasOwn(obj, prop){
         return Object.prototype.hasOwnProperty.call(obj, prop);
     }

     module.exports = hasOwn;



},{}],18:[function(require,module,exports){
var forOwn = require('./forOwn');

    /**
    * Combine properties from all the objects into first one.
    * - This method affects target object in place, if you want to create a new Object pass an empty object as first param.
    * @param {object} target    Target Object
    * @param {...object} objects    Objects to be combined (0...n objects).
    * @return {object} Target Object.
    */
    function mixIn(target, objects){
        var i = 0,
            n = arguments.length,
            obj;
        while(++i < n){
            obj = arguments[i];
            if (obj != null) {
                forOwn(obj, copyProp, target);
            }
        }
        return target;
    }

    function copyProp(val, key){
        this[key] = val;
    }

    module.exports = mixIn;


},{"./forOwn":16}],19:[function(require,module,exports){
function Callbacks() {
  this.handlers = []
}

Callbacks.prototype.add = function(fn) {
  this.handlers.push(fn)
}

Callbacks.prototype.remove = function(fn) {
  this.handlers = this.handlers.filter(function(handler) {
    return handler != fn
  })
}

Callbacks.prototype.fire = function(context, args) {
  this.handlers.forEach(function(handler) {
    handler.apply(context, args)
  })
}

module.exports = Callbacks

},{}],20:[function(require,module,exports){
var Listener = require("./listener")
  , Modules = require("./modules")
  , Reporter = require("./reporter")
  , Rules = require("./rules")

  , toArray = require("mout/lang/toArray")
  , isRegExp = require("mout/lang/isRegExp")
  , unique = require("mout/array/unique")
  , mixIn = require("mout/object/mixIn")

  , matches = require("dom-utils/src/matches")
  , getAttributes = require("dom-utils/src/get-attributes")

  , isCrossOrigin = require("./utils/cross-origin")

/**
 * Set (or reset) all data back to its original value
 * and initialize the specified rules
 */
function setup(listener, reporter, useRules, excludeRules) {
  var rules = useRules == null
    ? Object.keys(HTMLInspector.rules)
    : useRules
  if (excludeRules) {
    rules = rules.filter(function(rule) {
      return excludeRules.indexOf(rule) < 0
    })
  }
  rules.forEach(function(rule) {
    if (HTMLInspector.rules[rule]) {
      HTMLInspector.rules[rule].func.call(
        HTMLInspector,
        listener,
        reporter,
        HTMLInspector.rules[rule].config
      )
    }
  })
}

function traverseDOM(listener, node, excludeElements, excludeSubTrees) {

  // only deal with element nodes
  if (node.nodeType != 1) return

  var attrs = getAttributes(node)

  // trigger events for this element unless it's been excluded
  if (!matches(node, excludeElements)) {
    listener.trigger("element", node, [node.nodeName.toLowerCase(), node])
    if (node.id) {
      listener.trigger("id", node, [node.id, node])
    }
    toArray(node.classList).forEach(function(name) {
      listener.trigger("class", node, [name, node])
    })
    Object.keys(attrs).sort().forEach(function(name) {
      listener.trigger("attribute", node, [name, attrs[name], node])
    })
  }

  // recurse through the subtree unless it's been excluded
  if (!matches(node, excludeSubTrees)) {
    toArray(node.childNodes).forEach(function(node) {
      traverseDOM(listener, node, excludeElements, excludeSubTrees)
    })
  }
}

function mergeOptions(options) {
  // allow config to be individual properties of the defaults object
  if (options) {
    if (typeof options == "string" || options.nodeType == 1) {
      options = { domRoot: options }
    } else if (Array.isArray(options)) {
      options = { useRules: options }
    } else if (typeof options == "function") {
      options = { onComplete: options }
    }
  }

  // merge options with the defaults
  options = mixIn({}, HTMLInspector.defaults, options)

  // set the domRoot to an HTMLElement if it's not
  options.domRoot = typeof options.domRoot == "string"
    ? document.querySelector(options.domRoot)
    : options.domRoot

  return options
}

/**
 * cross-origin iframe elements throw errors when being
 * logged to the console.
 * This function removes them from the context before
 * logging them to the console.
 */
function filterCrossOrigin(elements) {
  // convert elements to an array if it's not already
  if (!Array.isArray(elements)) elements = [elements]
  elements = elements.map(function(el) {
    if (el
      && el.nodeName
      && el.nodeName.toLowerCase() == "iframe"
      && isCrossOrigin(el.src)
    )
      return "(can't display iframe with cross-origin source: " + el.src + ")"
    else
      return el
  })
  return elements.length === 1 ? elements[0] : elements
}


var HTMLInspector = {

  defaults: {
    domRoot: "html",
    useRules: null,
    excludeRules: null,
    excludeElements: "svg",
    excludeSubTrees: ["svg", "iframe"],
    onComplete: function(errors) {
      errors.forEach(function(error) {
        console.warn(error.message, filterCrossOrigin(error.context))
      })
    }
  },

  rules: new Rules(),

  modules: new Modules(),

  inspect: function(options) {
    var config = mergeOptions(options)
      , listener = new Listener()
      , reporter = new Reporter()

    setup(listener, reporter, config.useRules, config.excludeRules)

    listener.trigger("beforeInspect", config.domRoot)
    traverseDOM(listener, config.domRoot, config.excludeElements, config.excludeSubTrees)
    listener.trigger("afterInspect", config.domRoot)

    config.onComplete(reporter.getWarnings())
  }
}

HTMLInspector.modules.add( require("./modules/css.js") )
HTMLInspector.modules.add( require("./modules/validation.js") )

HTMLInspector.rules.add( require("./rules/best-practices/inline-event-handlers.js") )
HTMLInspector.rules.add( require("./rules/best-practices/script-placement.js") )
HTMLInspector.rules.add( require("./rules/best-practices/unnecessary-elements.js") )
HTMLInspector.rules.add( require("./rules/best-practices/unused-classes.js") )
HTMLInspector.rules.add( require("./rules/convention/bem-conventions.js") )
HTMLInspector.rules.add( require("./rules/validation/duplicate-ids.js") )
HTMLInspector.rules.add( require("./rules/validation/unique-elements.js") )
HTMLInspector.rules.add( require("./rules/validation/validate-attributes.js") )
HTMLInspector.rules.add( require("./rules/validation/validate-element-location.js") )
HTMLInspector.rules.add( require("./rules/validation/validate-elements.js") )

module.exports = HTMLInspector

},{"./listener":21,"./modules":22,"./modules/css.js":23,"./modules/validation.js":24,"./reporter":25,"./rules":26,"./rules/best-practices/inline-event-handlers.js":27,"./rules/best-practices/script-placement.js":28,"./rules/best-practices/unnecessary-elements.js":29,"./rules/best-practices/unused-classes.js":30,"./rules/convention/bem-conventions.js":31,"./rules/validation/duplicate-ids.js":32,"./rules/validation/unique-elements.js":33,"./rules/validation/validate-attributes.js":34,"./rules/validation/validate-element-location.js":35,"./rules/validation/validate-elements.js":36,"./utils/cross-origin":37,"dom-utils/src/get-attributes":1,"dom-utils/src/matches":2,"mout/array/unique":6,"mout/lang/isRegExp":11,"mout/lang/toArray":13,"mout/object/mixIn":18}],21:[function(require,module,exports){
var Callbacks = require("./callbacks")

function Listener() {
  this._events = {}
}

Listener.prototype.on = function(event, fn) {
  this._events[event] || (this._events[event] = new Callbacks())
  this._events[event].add(fn)
}

Listener.prototype.off = function(event, fn) {
  this._events[event] && this._events[event].remove(fn)
}

Listener.prototype.trigger = function(event, context, args) {
  this._events[event] && this._events[event].fire(context, args)
}

module.exports = Listener
},{"./callbacks":19}],22:[function(require,module,exports){
var mixIn = require("mout/object/mixIn")

function Modules() {}

Modules.prototype.add = function(obj) {
  this[obj.name] = obj.module
}

Modules.prototype.extend = function(name, options) {
  if (typeof options == "function")
    options = options.call(this[name], this[name])
  mixIn(this[name], options)
}

module.exports = Modules
},{"mout/object/mixIn":18}],23:[function(require,module,exports){
var reClassSelector = /\.[a-z0-9_\-]+/ig
  , toArray = require("mout/lang/toArray")
  , unique = require("mout/array/unique")
  , matches = require("dom-utils/src/matches")
  , isCrossOrigin = require("../utils/cross-origin")

/**
 * Get an array of class selectors from a CSSRuleList object
 */
function getClassesFromRuleList(rulelist) {
  return rulelist.reduce(function(classes, rule) {
    var matches
    if (rule.styleSheet) { // from @import rules
      return classes.concat(getClassesFromStyleSheets([rule.styleSheet]))
    }
    else if (rule.cssRules) { // from @media rules (or other conditionals)
      return classes.concat(getClassesFromRuleList(toArray(rule.cssRules)))
    }
    else if (rule.selectorText) {
      matches = rule.selectorText.match(reClassSelector) || []
      return classes.concat(matches.map(function(cls) { return cls.slice(1) } ))
    }
    return classes
  }, [])
}

/**
 * Get an array of class selectors from a CSSSytleSheetList object
 */
function getClassesFromStyleSheets(styleSheets) {
  return styleSheets.reduce(function(classes, sheet) {
    // cross origin stylesheets don't expose their cssRules property
    return sheet.href && isCrossOrigin(sheet.href)
      ? classes
      : classes.concat(getClassesFromRuleList(toArray(sheet.cssRules)))
  }, [])
}

function getStyleSheets() {
  return toArray(document.styleSheets).filter(function(sheet) {
    return matches(sheet.ownerNode, css.styleSheets)
  })
}

var css = {
  getClassSelectors: function() {
    return unique(getClassesFromStyleSheets(getStyleSheets()))
  },
  // getSelectors: function() {
  //   return []
  // },
  styleSheets: 'link[rel="stylesheet"], style'
}

module.exports = {
  name: "css",
  module: css
}

},{"../utils/cross-origin":37,"dom-utils/src/matches":2,"mout/array/unique":6,"mout/lang/toArray":13}],24:[function(require,module,exports){
var foundIn = require("../utils/string-matcher")

// ============================================================
// A data map of all valid HTML elements, their attributes
// and what type of children they may contain
//
// http://drafts.htmlwg.org/html/master/iana.html#index
// ============================================================

var elementData = {
  "a": {
    children: "transparent*",
    attributes: "globals; href; target; download; rel; hreflang; type"
  },
  "abbr": {
    children: "phrasing",
    attributes: "globals"
  },
  "address": {
    children: "flow*",
    attributes: "globals"
  },
  "area": {
    children: "empty",
    attributes: "globals; alt; coords; shape; href; target; download; rel; hreflang; type"
  },
  "article": {
    children: "flow",
    attributes: "globals"
  },
  "aside": {
    children: "flow",
    attributes: "globals"
  },
  "audio": {
    children: "source*; transparent*",
    attributes: "globals; src; crossorigin; preload; autoplay; mediagroup; loop; muted; controls"
  },
  "b": {
    children: "phrasing",
    attributes: "globals"
  },
  "base": {
    children: "empty",
    attributes: "globals; href; target"
  },
  "bdi": {
    children: "phrasing",
    attributes: "globals"
  },
  "bdo": {
    children: "phrasing",
    attributes: "globals"
  },
  "blockquote": {
    children: "flow",
    attributes: "globals; cite"
  },
  "body": {
    children: "flow",
    attributes: "globals; onafterprint; onbeforeprint; onbeforeunload; onfullscreenchange; onfullscreenerror; onhashchange; onmessage; onoffline; ononline; onpagehide; onpageshow; onpopstate; onresize; onstorage; onunload"
  },
  "br": {
    children: "empty",
    attributes: "globals"
  },
  "button": {
    children: "phrasing*",
    attributes: "globals; autofocus; disabled; form; formaction; formenctype; formmethod; formnovalidate; formtarget; name; type; value"
  },
  "canvas": {
    children: "transparent",
    attributes: "globals; width; height"
  },
  "caption": {
    children: "flow*",
    attributes: "globals"
  },
  "cite": {
    children: "phrasing",
    attributes: "globals"
  },
  "code": {
    children: "phrasing",
    attributes: "globals"
  },
  "col": {
    children: "empty",
    attributes: "globals; span"
  },
  "colgroup": {
    children: "col",
    attributes: "globals; span"
  },
  "menuitem": {
    children: "empty",
    attributes: "globals; type; label; icon; disabled; checked; radiogroup; command"
  },
  "data": {
    children: "phrasing",
    attributes: "globals; value"
  },
  "datalist": {
    children: "phrasing; option",
    attributes: "globals"
  },
  "dd": {
    children: "flow",
    attributes: "globals"
  },
  "del": {
    children: "transparent",
    attributes: "globals; cite; datetime"
  },
  "details": {
    children: "summary*; flow",
    attributes: "globals; open"
  },
  "dfn": {
    children: "phrasing*",
    attributes: "globals"
  },
  "dialog": {
    children: "flow",
    attributes: "globals; open"
  },
  "div": {
    children: "flow",
    attributes: "globals"
  },
  "dl": {
    children: "dt*; dd*",
    attributes: "globals"
  },
  "dt": {
    children: "flow*",
    attributes: "globals"
  },
  "em": {
    children: "phrasing",
    attributes: "globals"
  },
  "embed": {
    children: "empty",
    attributes: "globals; src; type; width; height; any*"
  },
  "fieldset": {
    children: "legend*; flow",
    attributes: "globals; disabled; form; name"
  },
  "figcaption": {
    children: "flow",
    attributes: "globals"
  },
  "figure": {
    children: "figcaption*; flow",
    attributes: "globals"
  },
  "footer": {
    children: "flow*",
    attributes: "globals"
  },
  "form": {
    children: "flow*",
    attributes: "globals; accept-charset; action; autocomplete; enctype; method; name; novalidate; target"
  },
  "h1": {
    children: "phrasing",
    attributes: "globals"
  },
  "h2": {
    children: "phrasing",
    attributes: "globals"
  },
  "h3": {
    children: "phrasing",
    attributes: "globals"
  },
  "h4": {
    children: "phrasing",
    attributes: "globals"
  },
  "h5": {
    children: "phrasing",
    attributes: "globals"
  },
  "h6": {
    children: "phrasing",
    attributes: "globals"
  },
  "head": {
    children: "metadata content*",
    attributes: "globals"
  },
  "header": {
    children: "flow*",
    attributes: "globals"
  },
  "hr": {
    children: "empty",
    attributes: "globals"
  },
  "html": {
    children: "head*; body*",
    attributes: "globals; manifest"
  },
  "i": {
    children: "phrasing",
    attributes: "globals"
  },
  "iframe": {
    children: "text*",
    attributes: "globals; src; srcdoc; name; sandbox; seamless; allowfullscreen; width; height"
  },
  "img": {
    children: "empty",
    attributes: "globals; alt; src; crossorigin; usemap; ismap; width; height"
  },
  "input": {
    children: "empty",
    attributes: "globals; accept; alt; autocomplete; autofocus; checked; dirname; disabled; form; formaction; formenctype; formmethod; formnovalidate; formtarget; height; list; max; maxlength; min; multiple; name; pattern; placeholder; readonly; required; size; src; step; type; value; width"
  },
  "ins": {
    children: "transparent",
    attributes: "globals; cite; datetime"
  },
  "kbd": {
    children: "phrasing",
    attributes: "globals"
  },
  "keygen": {
    children: "empty",
    attributes: "globals; autofocus; challenge; disabled; form; keytype; name"
  },
  "label": {
    children: "phrasing*",
    attributes: "globals; form; for"
  },
  "legend": {
    children: "phrasing",
    attributes: "globals"
  },
  "li": {
    children: "flow",
    attributes: "globals; value*"
  },
  "link": {
    children: "empty",
    attributes: "globals; href; crossorigin; rel; media; hreflang; type; sizes"
  },
  "main": {
    children: "flow*",
    attributes: "globals"
  },
  "map": {
    children: "transparent; area*",
    attributes: "globals; name"
  },
  "mark": {
    children: "phrasing",
    attributes: "globals"
  },
  "menu": {
    children: "li*; flow*; menuitem*; hr*; menu*",
    attributes: "globals; type; label"
  },
  "meta": {
    children: "empty",
    attributes: "globals; name; http-equiv; content; charset"
  },
  "meter": {
    children: "phrasing*",
    attributes: "globals; value; min; max; low; high; optimum"
  },
  "nav": {
    children: "flow",
    attributes: "globals"
  },
  "noscript": {
    children: "varies*",
    attributes: "globals"
  },
  "object": {
    children: "param*; transparent",
    attributes: "globals; data; type; typemustmatch; name; usemap; form; width; height"
  },
  "ol": {
    children: "li",
    attributes: "globals; reversed; start; type"
  },
  "optgroup": {
    children: "option",
    attributes: "globals; disabled; label"
  },
  "option": {
    children: "text*",
    attributes: "globals; disabled; label; selected; value"
  },
  "output": {
    children: "phrasing",
    attributes: "globals; for; form; name"
  },
  "p": {
    children: "phrasing",
    attributes: "globals"
  },
  "param": {
    children: "empty",
    attributes: "globals; name; value"
  },
  "pre": {
    children: "phrasing",
    attributes: "globals"
  },
  "progress": {
    children: "phrasing*",
    attributes: "globals; value; max"
  },
  "q": {
    children: "phrasing",
    attributes: "globals; cite"
  },
  "rp": {
    children: "phrasing",
    attributes: "globals"
  },
  "rt": {
    children: "phrasing",
    attributes: "globals"
  },
  "ruby": {
    children: "phrasing; rt; rp*",
    attributes: "globals"
  },
  "s": {
    children: "phrasing",
    attributes: "globals"
  },
  "samp": {
    children: "phrasing",
    attributes: "globals"
  },
  "script": {
    children: "script, data, or script documentation*",
    attributes: "globals; src; type; charset; async; defer; crossorigin"
  },
  "section": {
    children: "flow",
    attributes: "globals"
  },
  "select": {
    children: "option; optgroup",
    attributes: "globals; autofocus; disabled; form; multiple; name; required; size"
  },
  "small": {
    children: "phrasing",
    attributes: "globals"
  },
  "source": {
    children: "empty",
    attributes: "globals; src; type; media"
  },
  "span": {
    children: "phrasing",
    attributes: "globals"
  },
  "strong": {
    children: "phrasing",
    attributes: "globals"
  },
  "style": {
    children: "varies*",
    attributes: "globals; media; type; scoped"
  },
  "sub": {
    children: "phrasing",
    attributes: "globals"
  },
  "summary": {
    children: "phrasing",
    attributes: "globals"
  },
  "sup": {
    children: "phrasing",
    attributes: "globals"
  },
  "table": {
    children: "caption*; colgroup*; thead*; tbody*; tfoot*; tr*",
    attributes: "globals; border"
  },
  "tbody": {
    children: "tr",
    attributes: "globals"
  },
  "td": {
    children: "flow",
    attributes: "globals; colspan; rowspan; headers"
  },
  "template": {
    children: "flow; metadata",
    attributes: "globals"
  },
  "textarea": {
    children: "text",
    attributes: "globals; autofocus; cols; dirname; disabled; form; maxlength; name; placeholder; readonly; required; rows; wrap"
  },
  "tfoot": {
    children: "tr",
    attributes: "globals"
  },
  "th": {
    children: "flow*",
    attributes: "globals; colspan; rowspan; headers; scope; abbr"
  },
  "thead": {
    children: "tr",
    attributes: "globals"
  },
  "time": {
    children: "phrasing",
    attributes: "globals; datetime"
  },
  "title": {
    children: "text*",
    attributes: "globals"
  },
  "tr": {
    children: "th*; td",
    attributes: "globals"
  },
  "track": {
    children: "empty",
    attributes: "globals; default; kind; label; src; srclang"
  },
  "u": {
    children: "phrasing",
    attributes: "globals"
  },
  "ul": {
    children: "li",
    attributes: "globals"
  },
  "var": {
    children: "phrasing",
    attributes: "globals"
  },
  "video": {
    children: "source*; transparent*",
    attributes: "globals; src; crossorigin; poster; preload; autoplay; mediagroup; loop; muted; controls; width; height"
  },
  "wbr": {
    children: "empty",
    attributes: "globals"
  }
}

// ============================================================
// Element categories and the elements tht are in those
// categories. Elements may be in more than one category
//
// http://drafts.htmlwg.org/html/master/iana.html#element-content-categories
// ============================================================

var elementCategories = {
  "metadata": {
    elements: ["base", "link", "meta", "noscript", "script", "style", "title"]
  },
  "flow": {
    elements: ["a", "abbr", "address", "article", "aside", "audio", "b", "bdi", "bdo", "blockquote", "br", "button", "canvas", "cite", "code", "data", "datalist", "del", "details", "dfn", "dialog", "div", "dl", "em", "embed", "fieldset", "figure", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "header", "hr", "i", "iframe", "img", "input", "ins", "kbd", "keygen", "label", "main", "map", "mark", "math", "menu", "meter", "nav", "noscript", "object", "ol", "output", "p", "pre", "progress", "q", "ruby", "s", "samp", "script", "section", "select", "small", "span", "strong", "sub", "sup", "svg", "table", "textarea", "time", "u", "ul", "var", "video", "wbr"],
    exceptions: ["area", "link", "meta", "style"],
    exceptionsSelectors: ["map area", "link[itemprop]", "meta[itemprop]", "style[scoped]"]
  },
  "sectioning": {
    elements: ["article", "aside", "nav", "section"]
  },
  "heading": {
    elements: ["h1", "h2", "h3", "h4", "h5", "h6"]
  },
  "phrasing": {
    elements: ["a", "abbr", "audio", "b", "bdi", "bdo", "br", "button", "canvas", "cite", "code", "data", "datalist", "del", "dfn", "em", "embed", "i", "iframe", "img", "input", "ins", "kbd", "keygen", "label", "map", "mark", "math", "meter", "noscript", "object", "output", "progress", "q", "ruby", "s", "samp", "script", "select", "small", "span", "strong", "sub", "sup", "svg", "textarea", "time", "u", "var", "video", "wbr"],
    exceptions: ["area", "link", "meta"],
    exceptionsSelectors: ["map area", "link[itemprop]", "meta[itemprop]"]
  },
  "embedded": {
    elements: ["audio", "canvas", "embed", "iframe", "img", "math", "object", "svg", "video"]
  },
  "interactive": {
    elements: ["a", "button", "details", "embed", "iframe", "keygen", "label", "select", "textarea"],
    exceptions: ["audio", "img", "input", "object", "video"],
    exceptionsSelectors: ["audio[controls]", "img[usemap]", "input:not([type=hidden])", "object[usemap]", "video[controls]"]
  },
  "sectioning roots": {
    elements: ["blockquote", "body", "details", "dialog", "fieldset", "figure", "td"]
  },
  "form-associated": {
    elements: ["button", "fieldset", "input", "keygen", "label", "object", "output", "select", "textarea"]
  },
  "listed": {
    elements: ["button", "fieldset", "input", "keygen", "object", "output", "select", "textarea"]
  },
  "submittable": {
    elements: ["button", "input", "keygen", "object", "select", "textarea"]
  },
  "resettable": {
    elements: ["input", "keygen", "output", "select", "textarea"]
  },
  "labelable": {
    elements: ["button", "input", "keygen", "meter", "output", "progress", "select", "textarea"]
  },
  "palpable": {
    elements: ["a", "abbr", "address", "article", "aside", "b", "bdi", "bdo", "blockquote", "button", "canvas", "cite", "code", "data", "details", "dfn", "div", "em", "embed", "fieldset", "figure", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "header", "i", "iframe", "img", "ins", "kbd", "keygen", "label", "map", "mark", "math", "meter", "nav", "object", "output", "p", "pre", "progress", "q", "ruby", "s", "samp", "section", "select", "small", "span", "strong", "sub", "sup", "svg", "table", "textarea", "time", "u", "var", "video"],
    exceptions: ["audio", "dl", "input", "menu", "ol", "ul"],
    exceptionsSelectors: ["audio[controls]", "dl", "input:not([type=hidden])", "menu[type=toolbar]", "ol", "ul"]
  }
}

// ============================================================
// Attributes that may be used on any valid HTML element
//
// http://drafts.htmlwg.org/html/master/dom.html#global-attributes
// ============================================================

var globalAttributes = [
  // primary
  "accesskey",
  "class",
  "contenteditable",
  "contextmenu",
  "dir",
  "draggable",
  "dropzone",
  "hidden",
  "id",
  "inert",
  "itemid",
  "itemprop",
  "itemref",
  "itemscope",
  "itemtype",
  "lang",
  "spellcheck",
  "style",
  "tabindex",
  "title",
  "translate",
  // additional
  "role",
  /aria-[a-z\-]+/,
  /data-[a-z\-]+/,
  /on[a-z\-]+/
]

// ============================================================
// HTML elements that are obsolete and no longer allowed
//
// http://drafts.htmlwg.org/html/master/obsolete.html#obsolete
// ============================================================

var obsoluteElements = [
  "applet",
  "acronym",
  "bgsound",
  "dir",
  "frame",
  "frameset",
  "noframes",
  "hgroup",
  "isindex",
  "listing",
  "nextid",
  "noembed",
  "plaintext",
  "rb",
  "strike",
  "xmp",
  "basefont",
  "big",
  "blink",
  "center",
  "font",
  "marquee",
  "multicol",
  "nobr",
  "spacer",
  "tt"
]

// ============================================================
// Attributes that are obsolete on certain elements
//
// http://drafts.htmlwg.org/html/master/obsolete.html#obsolete
// ============================================================

var obsoleteAttributes = [
  { attribute: "charset", elements: "a" },
  { attribute: "charset", elements: "link" },
  { attribute: "coords", elements: "a" },
  { attribute: "shape", elements: "a" },
  { attribute: "methods", elements: "a" },
  { attribute: "methods", elements: "link" },
  { attribute: "name", elements: "a" },
  { attribute: "name", elements: "embed" },
  { attribute: "name", elements: "img" },
  { attribute: "name", elements: "option" },
  { attribute: "rev", elements: "a" },
  { attribute: "rev", elements: "link" },
  { attribute: "urn", elements: "a" },
  { attribute: "urn", elements: "link" },
  { attribute: "accept", elements: "form" },
  { attribute: "nohref", elements: "area" },
  { attribute: "profile", elements: "head" },
  { attribute: "version", elements: "html" },
  { attribute: "ismap", elements: "input" },
  { attribute: "usemap", elements: "input" },
  { attribute: "longdesc", elements: "iframe" },
  { attribute: "longdesc", elements: "img" },
  { attribute: "lowsrc", elements: "img" },
  { attribute: "target", elements: "link" },
  { attribute: "scheme", elements: "meta" },
  { attribute: "archive", elements: "object" },
  { attribute: "classid", elements: "object" },
  { attribute: "code", elements: "object" },
  { attribute: "codebase", elements: "object" },
  { attribute: "codetype", elements: "object" },
  { attribute: "declare", elements: "object" },
  { attribute: "standby", elements: "object" },
  { attribute: "type", elements: "param" },
  { attribute: "valuetype", elements: "param" },
  { attribute: "language", elements: "script" },
  { attribute: "event", elements: "script" },
  { attribute: "for", elements: "script" },
  { attribute: "datapagesize", elements: "table" },
  { attribute: "summary", elements: "table" },
  { attribute: "axis", elements: "td; th" },
  { attribute: "scope", elements: "td" },
  { attribute: "datasrc", elements: "a; applet; button; div; frame; iframe; img; input; label; legend; marquee; object; option; select; span; table; textarea" },
  { attribute: "datafld", elements: "a; applet; button; div; fieldset; frame; iframe; img; input; label; legend; marquee; object; param; select; span; textarea" },
  { attribute: "dataformatas", elements: "button; div; input; label; legend; marquee; object; option; select; span; table" },
  { attribute: "alink", elements: "body" },
  { attribute: "bgcolor", elements: "body" },
  { attribute: "link", elements: "body" },
  { attribute: "marginbottom", elements: "body" },
  { attribute: "marginheight", elements: "body" },
  { attribute: "marginleft", elements: "body" },
  { attribute: "marginright", elements: "body" },
  { attribute: "margintop", elements: "body" },
  { attribute: "marginwidth", elements: "body" },
  { attribute: "text", elements: "body" },
  { attribute: "vlink", elements: "body" },
  { attribute: "clear", elements: "br" },
  { attribute: "align", elements: "caption" },
  { attribute: "align", elements: "col" },
  { attribute: "char", elements: "col" },
  { attribute: "charoff", elements: "col" },
  { attribute: "valign", elements: "col" },
  { attribute: "width", elements: "col" },
  { attribute: "align", elements: "div" },
  { attribute: "compact", elements: "dl" },
  { attribute: "align", elements: "embed" },
  { attribute: "hspace", elements: "embed" },
  { attribute: "vspace", elements: "embed" },
  { attribute: "align", elements: "hr" },
  { attribute: "color", elements: "hr" },
  { attribute: "noshade", elements: "hr" },
  { attribute: "size", elements: "hr" },
  { attribute: "width", elements: "hr" },
  { attribute: "align", elements: "h1; h2; h3; h4; h5; h6" },
  { attribute: "align", elements: "iframe" },
  { attribute: "allowtransparency", elements: "iframe" },
  { attribute: "frameborder", elements: "iframe" },
  { attribute: "hspace", elements: "iframe" },
  { attribute: "marginheight", elements: "iframe" },
  { attribute: "marginwidth", elements: "iframe" },
  { attribute: "scrolling", elements: "iframe" },
  { attribute: "vspace", elements: "iframe" },
  { attribute: "align", elements: "input" },
  { attribute: "hspace", elements: "input" },
  { attribute: "vspace", elements: "input" },
  { attribute: "align", elements: "img" },
  { attribute: "border", elements: "img" },
  { attribute: "hspace", elements: "img" },
  { attribute: "vspace", elements: "img" },
  { attribute: "align", elements: "legend" },
  { attribute: "type", elements: "li" },
  { attribute: "compact", elements: "menu" },
  { attribute: "align", elements: "object" },
  { attribute: "border", elements: "object" },
  { attribute: "hspace", elements: "object" },
  { attribute: "vspace", elements: "object" },
  { attribute: "compact", elements: "ol" },
  { attribute: "align", elements: "p" },
  { attribute: "width", elements: "pre" },
  { attribute: "align", elements: "table" },
  { attribute: "bgcolor", elements: "table" },
  { attribute: "cellpadding", elements: "table" },
  { attribute: "cellspacing", elements: "table" },
  { attribute: "frame", elements: "table" },
  { attribute: "rules", elements: "table" },
  { attribute: "width", elements: "table" },
  { attribute: "align", elements: "tbody; thead; tfoot" },
  { attribute: "char", elements: "tbody; thead; tfoot" },
  { attribute: "charoff", elements: "tbody; thead; tfoot" },
  { attribute: "valign", elements: "tbody; thead; tfoot" },
  { attribute: "align", elements: "td; th" },
  { attribute: "bgcolor", elements: "td; th" },
  { attribute: "char", elements: "td; th" },
  { attribute: "charoff", elements: "td; th" },
  { attribute: "height", elements: "td; th" },
  { attribute: "nowrap", elements: "td; th" },
  { attribute: "valign", elements: "td; th" },
  { attribute: "width", elements: "td; th" },
  { attribute: "align", elements: "tr" },
  { attribute: "bgcolor", elements: "tr" },
  { attribute: "char", elements: "tr" },
  { attribute: "charoff", elements: "tr" },
  { attribute: "valign", elements: "tr" },
  { attribute: "compact", elements: "ul" },
  { attribute: "type", elements: "ul" },
  { attribute: "background", elements: "body; table; thead; tbody; tfoot; tr; td; th" }
]

// ============================================================
// Attributes that are required to be on particular elements
//
// http://www.w3.org/TR/html4/index/attributes.html
// http://www.w3.org/TR/html5-diff/#changed-attributes
//
// TODO: find a better, more comprehensive source for this
// ============================================================

var requiredAttributes = [
  { attributes: ["alt"], element: "area" },
  { attributes: ["height", "width"], element: "applet" },
  { attributes: ["dir"], element: "bdo" },
  { attributes: ["action"], element: "form" },
  { attributes: ["alt", "src"], element: "img" },
  { attributes: ["name"], element: "map" },
  { attributes: ["label"], element: "optgroup" },
  { attributes: ["name"], element: "param" },
  { attributes: ["cols", "rows"], element: "textarea" }
]

// ============================================================
// A complete list of valid elements in HTML. This is
// programatically generated form the elementData variable
// ============================================================

var elements = Object.keys(elementData).sort()

// TODO: memoize these functions

function elementName(element) {
  if (typeof element == "string")
    return element
  if (element.nodeType)
    return element.nodeName.toLowerCase()
}

function allowedAttributesForElement(element) {
  // return an empty array if the element is invalid
  if (elementData[element])
    return elementData[element].attributes.replace(/\*/g, "").split(/\s*;\s*/)
  else
    return []
}

function elementsForCategory(category) {
  return elementCategories[category].split(/\s*;\s*/)
}

function isGlobalAttribute(attribute) {
  return foundIn(attribute, globalAttributes)
}

function getAllowedChildElements(parent) {
  var contents
    , contentModel = []

  // ignore children properties that contain an asterisk for now
  contents = elementData[parent].children
  contents = contents.indexOf("*") >= 0 ? [] : contents.split(/\s*\;\s*/)

  // replace content categories with their elements
  contents.forEach(function(item) {
    if (elementCategories[item]) {
      contentModel = contentModel.concat(elementCategories[item].elements)
      contentModel = contentModel.concat(elementCategories[item].exceptions || [])
    } else {
      contentModel.push(item)
    }
  })
  // return a guaranteed match (to be safe) when there's no children
  return contentModel.length ? contentModel : [/[\s\S]+/]
}

var spec = {

  isElementValid: function(element) {
    return elements.indexOf(element) >= 0
  },

  isElementObsolete: function(element) {
    return obsoluteElements.indexOf(element) >= 0
  },

  isAttributeValidForElement: function(attribute, element) {
    if (isGlobalAttribute(attribute)) return true

    // some elements (like embed) accept any attribute
    // http://drafts.htmlwg.org/html/master/embedded-content-0.html#the-embed-element
    if (allowedAttributesForElement(element).indexOf("any") >= 0) return true
    return allowedAttributesForElement(element).indexOf(attribute) >= 0
  },

  isAttributeObsoleteForElement: function(attribute, element) {
    return obsoleteAttributes.some(function(item) {
      if (item.attribute !== attribute) return false
      return item.elements.split(/\s*;\s*/).some(function(name) {
        return name === element
      })
    })
  },

  isAttributeRequiredForElement: function(attribute, element) {
    return requiredAttributes.some(function(item) {
      return element == item.element && item.attributes.indexOf(attribute) >= 0
    })
  },

  getRequiredAttributesForElement: function(element) {
    var filtered = requiredAttributes.filter(function(item) {
      return item.element == element
    })
    return (filtered[0] && filtered[0].attributes) || []
  },

  isChildAllowedInParent: function(child, parent) {
    // only check if both elements are valid elements
    if (!elementData[child] || !elementData[parent])
      return true
    else
      return foundIn(child, getAllowedChildElements(parent))
  }

}

module.exports = {
  name: "validation",
  module: spec
}

},{"../utils/string-matcher":38}],25:[function(require,module,exports){
function Reporter() {
  this._errors = []
}

Reporter.prototype.warn = function(rule, message, context) {
  this._errors.push({
    rule: rule,
    message: message,
    context: context
  })
}

Reporter.prototype.getWarnings = function() {
  return this._errors
}

module.exports = Reporter
},{}],26:[function(require,module,exports){
var mixIn = require("mout/object/mixIn")

function Rules() {}

Rules.prototype.add = function(rule, config, func) {
  if (typeof rule == "string") {
    if (typeof config == "function") {
      func = config
      config = {}
    }
    this[rule] = {
      name: rule,
      config: config,
      func: func
    }
  }
  else {
    this[rule.name] = {
      name: rule.name,
      config: rule.config,
      func: rule.func
    }
  }
}

Rules.prototype.extend = function(name, options) {
  if (typeof options == "function")
    options = options.call(this[name].config, this[name].config)
  mixIn(this[name].config, options)
}

module.exports = Rules

},{"mout/object/mixIn":18}],27:[function(require,module,exports){
var foundIn = require("../../utils/string-matcher")

module.exports = {

  name: "inline-event-handlers",

  config: {
    whitelist: []
  },

  func: function(listener, reporter, config) {
    listener.on('attribute', function(name, value) {
      if (name.indexOf("on") === 0 && !foundIn(name, config.whitelist)) {
        reporter.warn(
          "inline-event-handlers",
          "An '" + name + "' attribute was found in the HTML. Use external scripts for event binding instead.",
          this
        )
      }
    })
  }
}

},{"../../utils/string-matcher":38}],28:[function(require,module,exports){
module.exports = {

  name: "script-placement",

  config: {
    whitelist: []
  },

  func: function(listener, reporter, config) {

    var elements = []
      , whitelist = config.whitelist
      , matches = require("dom-utils/src/matches")

    function isWhitelisted(el) {
      if (!whitelist) return false
      if (typeof whitelist == "string") return matches(el, whitelist)
      if (Array.isArray(whitelist)) {
        return whitelist.length && whitelist.some(function(item) {
          return matches(el, item)
        })
      }
      return false
    }

    listener.on("element", function(name) {
      elements.push(this)
    })

    listener.on("afterInspect", function() {
      var el
      // scripts at the end of the elements are safe
      while (el = elements.pop()) {
        if (el.nodeName.toLowerCase() != "script") break
      }
      elements.forEach(function(el) {
        if (el.nodeName.toLowerCase() == "script") {
          // scripts with the async or defer attributes are safe
          if (el.async === true || el.defer === true) return
          // at this point, if the script isn't whitelisted, throw an error
          if (!isWhitelisted(el)) {
            reporter.warn(
              "script-placement",
              "<script> elements should appear right before "
              + "the closing </body> tag for optimal performance.",
              el
            )
          }
        }
      })
    })
  }
}
},{"dom-utils/src/matches":2}],29:[function(require,module,exports){
module.exports = {

  name: "unnecessary-elements",

  config: {
    isUnnecessary: function(element) {
      var name = element.nodeName.toLowerCase()
        , isUnsemantic = name == "div" || name == "span"
        , isAttributed = element.attributes.length === 0
      return isUnsemantic && isAttributed
    }
  },

  func: function(listener, reporter, config) {
    listener.on('element', function(name) {
      if (config.isUnnecessary(this)) {
        reporter.warn(
          "unnecessary-elements",
          "Do not use <div> or <span> elements without any attributes.",
          this
        )
      }
    })
  }
}

},{}],30:[function(require,module,exports){
module.exports = {

  name: "unused-classes",

  config: {
    whitelist: [
      /^js\-/,
      /^supports\-/,
      /^language\-/,
      /^lang\-/
    ]
  },

  func: function(listener, reporter, config) {

    var classes = this.modules.css.getClassSelectors()
      , foundIn = require("../../utils/string-matcher")

    listener.on("class", function(name) {
      if (!foundIn(name, config.whitelist) && classes.indexOf(name) < 0) {
        reporter.warn(
          "unused-classes",
          "The class '"
          + name
          + "' is used in the HTML but not found in any stylesheet.",
          this
        )
      }
    })
  }
}

},{"../../utils/string-matcher":38}],31:[function(require,module,exports){
// ============================================================
// There are several different BEM  naming conventions that
// I'm aware of. To make things easier, I refer to the
// methodologies by the name of projects that utilize them.
//
// suit: https://github.com/necolas/suit
// -------------------------------------
// BlockName
// BlockName--modifierName
// BlockName-elementName
// BlockName-elementName--modifierName
//
// inuit: http://inuitcss.com/
// ---------------------------
// block-name
// block-name--modifier-name
// block-name__element-name
// block-name__element-name--modifier-name
//
// yandex: http://bem.info/
// ------------------------
// block-name
// block-name__elemement-name
// block-name_modifier_name
// block-name__element-name_modifier_name
//
// ============================================================

var methodologies = {
  "suit": {
    modifier: /^([A-Z][a-zA-Z]*(?:\-[a-zA-Z]+)?)\-\-[a-zA-Z]+$/,
    element: /^([A-Z][a-zA-Z]*)\-[a-zA-Z]+$/
  },
  "inuit": {
    modifier: /^((?:[a-z]+\-)*[a-z]+(?:__(?:[a-z]+\-)*[a-z]+)?)\-\-(?:[a-z]+\-)*[a-z]+$/,
    element: /^((?:[a-z]+\-)*[a-z]+)__(?:[a-z]+\-)*[a-z]+$/
  },
  "yandex": {
    modifier: /^((?:[a-z]+\-)*[a-z]+(?:__(?:[a-z]+\-)*[a-z]+)?)_(?:[a-z]+_)*[a-z]+$/,
    element: /^((?:[a-z]+\-)*[a-z]+)__(?:[a-z]+\-)*[a-z]+$/
  }
}

function getMethodology() {
  if (typeof config.methodology == "string") {
    return methodologies[config.methodology]
  }
  return config.methodology
}

var config = {

  methodology: "suit",

  getBlockName: function(elementOrModifier) {
    var block
      , methodology = getMethodology()
    if (methodology.modifier.test(elementOrModifier))
      return block = RegExp.$1
    if (methodology.element.test(elementOrModifier))
      return block = RegExp.$1
    return block || false
  },

  isElement: function(cls) {
    return getMethodology().element.test(cls)
  },

  isModifier: function(cls) {
    return getMethodology().modifier.test(cls)
  }
}

module.exports = {

  name: "bem-conventions",

  config: config,

  func: function(listener, reporter, config) {

    var parents = require("dom-utils/src/parents")
      , matches = require("dom-utils/src/matches")

    listener.on('class', function(name) {
      if (config.isElement(name)) {
        // check the ancestors for the block class
        var ancestorIsBlock = parents(this).some(function(el) {
          return matches(el, "." + config.getBlockName(name))
        })
        if (!ancestorIsBlock) {
          reporter.warn(
            "bem-conventions",
            "The BEM element '" + name
            + "' must be a descendent of '" + config.getBlockName(name)
            + "'.",
            this
          )
        }
      }
      if (config.isModifier(name)) {
        if (!matches(this, "." + config.getBlockName(name))) {
          reporter.warn(
            "bem-conventions",
            "The BEM modifier class '" + name
            + "' was found without the unmodified class '" + config.getBlockName(name)
            +  "'.",
            this
          )
        }
      }
    })
  }
}

},{"dom-utils/src/matches":2,"dom-utils/src/parents":3}],32:[function(require,module,exports){
var foundIn = require("../../utils/string-matcher")

module.exports = {

  name: "duplicate-ids",

  config: {
    whitelist: []
  },

  func: function(listener, reporter, config) {

    var elements = []

    listener.on("id", function(name) {
      // ignore whitelisted attributes
      if (!foundIn(name, config.whitelist)) {
        elements.push({id: name, context: this})
      }
    })

    listener.on("afterInspect", function() {

      var duplicates = []
        , element
        , offenders

      while (element = elements.shift()) {
        // find other elements with the same ID
        duplicates = elements.filter(function(el) {
          return element.id === el.id
        })
        // remove elements with the same ID from the elements array
        elements = elements.filter(function(el) {
          return element.id !== el.id
        })
        // report duplicates
        if (duplicates.length) {
          offenders = [element.context].concat(duplicates.map(function(dup) {
            return dup.context
          }))
          reporter.warn(
            "duplicate-ids",
            "The id '" + element.id + "' appears more than once in the document.",
            offenders
          )
        }
      }
    })
  }
}

},{"../../utils/string-matcher":38}],33:[function(require,module,exports){
module.exports = {

  name: "unique-elements",

  config: {
    elements: ["title", "main"]
  },

  func: function(listener, reporter, config) {

    var map = {}
      , elements = config.elements

    // create the map where the keys are elements that must be unique
    elements.forEach(function(item) {
      map[item] = []
    })

    listener.on("element", function(name) {
      if (elements.indexOf(name) >= 0) {
        map[name].push(this)
      }
    })

    listener.on("afterInspect", function() {
      var offenders
      elements.forEach(function(item) {
        if (map[item].length > 1) {
          reporter.warn(
            "unique-elements",
            "The <" + item + "> element may only appear once in the document.",
            map[item]
          )
        }
      })
    })
  }
}

},{}],34:[function(require,module,exports){
var foundIn = require("../../utils/string-matcher")

module.exports = {

  name: "validate-attributes",

  config: {
    whitelist: [
      /ng\-[a-z\-]+/ // AngularJS
    ]
  },

  func: function(listener, reporter, config) {

    var validation = this.modules.validation

    listener.on("element", function(name) {
      var required = validation.getRequiredAttributesForElement(name)

      required.forEach(function(attr) {
        // ignore whitelisted attributes
        if (foundIn(attr, config.whitelist)) return

        if (!this.hasAttribute(attr)) {
          reporter.warn(
            "validate-attributes",
            "The '" + attr + "' attribute is required for <"
            + name + "> elements.",
            this
          )
        }
      }, this)
    })

    listener.on("attribute", function(name) {
      var element = this.nodeName.toLowerCase()

      // don't validate the attributes of invalid elements
      if (!validation.isElementValid(element)) return

      // ignore whitelisted attributes
      if (foundIn(name, config.whitelist)) return

      if (validation.isAttributeObsoleteForElement(name, element)) {
        reporter.warn(
          "validate-attributes",
          "The '" + name + "' attribute is no longer valid on the <"
          + element + "> element and should not be used.",
          this
        )
      }
      else if (!validation.isAttributeValidForElement(name, element)) {
        reporter.warn(
          "validate-attributes",
          "'" + name + "' is not a valid attribute of the <"
          + element + "> element.",
          this
        )
      }
    })
  }
}

},{"../../utils/string-matcher":38}],35:[function(require,module,exports){
module.exports = {

  name: "validate-element-location",

  config: {
    whitelist: []
  },

  func: function(listener, reporter, config) {

    var validation = this.modules.validation
      , matches = require("dom-utils/src/matches")
      , parents = require("dom-utils/src/parents")
      , warned = [] // store already-warned elements to prevent double warning


    // ===========================================================================
    // Elements with clear-cut location rules are tested here.
    // More complicated cases are tested below
    // ===========================================================================

    function testGeneralElementLocation(name) {
      var child = name
        , parent = this.parentNode.nodeName.toLowerCase()

      if (!validation.isChildAllowedInParent(child, parent)) {
        warned.push(this)
        reporter.warn(
          "validate-element-location",
          "The <" + child + "> element cannot be a child of the <" + parent + "> element.",
          this
        )
      }
    }

    // ===========================================================================
    // Make sure <style> elements inside <body> have the 'scoped' attribute.
    // They must also be the first element child of their parent.
    // ===========================================================================

    function testUnscopedStyles(name) {
      if (matches(this, "body style:not([scoped])")) {
        reporter.warn(
          "validate-element-location",
          "<style> elements inside <body> must contain the 'scoped' attribute.",
          this
        )
      }
      else if (matches(this, "body style[scoped]:not(:first-child)")) {
        reporter.warn(
          "validate-element-location",
          "Scoped <style> elements must be the first child of their parent element.",
          this
        )
      }
    }

    // ===========================================================================
    // Make sure <meta> and <link> elements inside <body> have the 'itemprop'
    // attribute
    // ===========================================================================

    function testItemProp(name) {
      if (matches(this, "body meta:not([itemprop]), body link:not([itemprop])")) {
        reporter.warn(
          "validate-element-location",
          "<" + name + "> elements inside <body> must contain the"
          + " 'itemprop' attribute.",
          this
        )
      }
    }


    listener.on("element", function(name) {

      // ignore whitelisted elements
      if (matches(this, config.whitelist)) return

      // skip elements without a DOM element for a parent
      if (!(this.parentNode && this.parentNode.nodeType == 1)) return

      // don't double warn if the elements already has a location warning
      if (warned.indexOf(this) > -1) return

      testGeneralElementLocation.call(this, name)
      testUnscopedStyles.call(this, name)
      testItemProp.call(this, name)
    })

  }
}

},{"dom-utils/src/matches":2,"dom-utils/src/parents":3}],36:[function(require,module,exports){
var foundIn = require("../../utils/string-matcher")

module.exports = {

  name: "validate-elements",

  config: {
    whitelist: []
  },

  func: function(listener, reporter, config) {

    var validation = this.modules.validation

    listener.on("element", function(name) {

      // ignore whitelisted elements
      if (foundIn(name, config.whitelist)) return

      if (validation.isElementObsolete(name)) {
        reporter.warn(
          "validate-elements",
          "The <" + name + "> element is obsolete and should not be used.",
          this
        )
      }
      else if (!validation.isElementValid(name)) {
        reporter.warn(
          "validate-elements",
          "The <" + name + "> element is not a valid HTML element.",
          this
        )
      }
    })
  }
}

},{"../../utils/string-matcher":38}],37:[function(require,module,exports){
// used to parse URLs
var link = document.createElement("a")

/**
 * Tests whether a URL is cross-origin
 * Same origin URLs must have the same protocol and host
 * (note: host include hostname and port)
 */
module.exports = function(url) {
  link.href = url
  return !(link.protocol == location.protocol && link.host == location.host)
}

},{}],38:[function(require,module,exports){
var isRegExp = require("mout/lang/isRegExp")

/**
 * Given a string and a RegExp or a list of strings or RegExps,
 * does the string match any of the items in the list?
 */
function foundIn(needle, haystack) {
  // if haystack is a RegExp and not an array, just compare againt it
  if (isRegExp(haystack)) return haystack.test(needle)

  // if haystack is a String, just compare against it
  if (typeof haystack == "string") return needle == haystack

  // otherwise check each item in the list
  return haystack.some(function(item) {
    return isRegExp(item) ? item.test(needle) : needle === item
  })
}

module.exports = foundIn

},{"mout/lang/isRegExp":11}]},{},[20])
(20)
});
;