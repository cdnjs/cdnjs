(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('react')) :
  typeof define === 'function' && define.amd ? define(['react'], factory) :
  (global = global || self, global.styled = factory(global.React));
}(this, function (React) { 'use strict';

  var React__default = 'default' in React ? React['default'] : React;

  // 
  function isStyledComponent(target) {
    return target && typeof target.styledComponentId === 'string';
  }

  // 
  var interleave = (function (strings, interpolations) {
    var result = [strings[0]];

    for (var i = 0, len = interpolations.length; i < len; i += 1) {
      result.push(interpolations[i], strings[i + 1]);
    }

    return result;
  });

  // 
  var isPlainObject = (function (x) {
    return typeof x === 'object' && x.constructor === Object;
  });

  // 
  var EMPTY_ARRAY = Object.freeze([]);
  var EMPTY_OBJECT = Object.freeze({});

  // 
  function isFunction(test) {
    return typeof test === 'function';
  }

  function unwrapExports (x) {
  	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
  }

  function createCommonjsModule(fn, module) {
  	return module = { exports: {} }, fn(module, module.exports), module.exports;
  }

  var reactIs_production_min = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports,"__esModule",{value:!0});
  var b="function"===typeof Symbol&&Symbol.for,c=b?Symbol.for("react.element"):60103,d=b?Symbol.for("react.portal"):60106,e=b?Symbol.for("react.fragment"):60107,f=b?Symbol.for("react.strict_mode"):60108,g=b?Symbol.for("react.profiler"):60114,h=b?Symbol.for("react.provider"):60109,k=b?Symbol.for("react.context"):60110,l=b?Symbol.for("react.async_mode"):60111,m=b?Symbol.for("react.concurrent_mode"):60111,n=b?Symbol.for("react.forward_ref"):60112,p=b?Symbol.for("react.suspense"):60113,q=b?Symbol.for("react.memo"):
  60115,r=b?Symbol.for("react.lazy"):60116;function t(a){if("object"===typeof a&&null!==a){var u=a.$$typeof;switch(u){case c:switch(a=a.type,a){case l:case m:case e:case g:case f:case p:return a;default:switch(a=a&&a.$$typeof,a){case k:case n:case h:return a;default:return u}}case r:case q:case d:return u}}}function v(a){return t(a)===m}exports.typeOf=t;exports.AsyncMode=l;exports.ConcurrentMode=m;exports.ContextConsumer=k;exports.ContextProvider=h;exports.Element=c;exports.ForwardRef=n;
  exports.Fragment=e;exports.Lazy=r;exports.Memo=q;exports.Portal=d;exports.Profiler=g;exports.StrictMode=f;exports.Suspense=p;exports.isValidElementType=function(a){return "string"===typeof a||"function"===typeof a||a===e||a===m||a===g||a===f||a===p||"object"===typeof a&&null!==a&&(a.$$typeof===r||a.$$typeof===q||a.$$typeof===h||a.$$typeof===k||a.$$typeof===n)};exports.isAsyncMode=function(a){return v(a)||t(a)===l};exports.isConcurrentMode=v;exports.isContextConsumer=function(a){return t(a)===k};
  exports.isContextProvider=function(a){return t(a)===h};exports.isElement=function(a){return "object"===typeof a&&null!==a&&a.$$typeof===c};exports.isForwardRef=function(a){return t(a)===n};exports.isFragment=function(a){return t(a)===e};exports.isLazy=function(a){return t(a)===r};exports.isMemo=function(a){return t(a)===q};exports.isPortal=function(a){return t(a)===d};exports.isProfiler=function(a){return t(a)===g};exports.isStrictMode=function(a){return t(a)===f};
  exports.isSuspense=function(a){return t(a)===p};
  });

  unwrapExports(reactIs_production_min);
  var reactIs_production_min_1 = reactIs_production_min.typeOf;
  var reactIs_production_min_2 = reactIs_production_min.AsyncMode;
  var reactIs_production_min_3 = reactIs_production_min.ConcurrentMode;
  var reactIs_production_min_4 = reactIs_production_min.ContextConsumer;
  var reactIs_production_min_5 = reactIs_production_min.ContextProvider;
  var reactIs_production_min_6 = reactIs_production_min.Element;
  var reactIs_production_min_7 = reactIs_production_min.ForwardRef;
  var reactIs_production_min_8 = reactIs_production_min.Fragment;
  var reactIs_production_min_9 = reactIs_production_min.Lazy;
  var reactIs_production_min_10 = reactIs_production_min.Memo;
  var reactIs_production_min_11 = reactIs_production_min.Portal;
  var reactIs_production_min_12 = reactIs_production_min.Profiler;
  var reactIs_production_min_13 = reactIs_production_min.StrictMode;
  var reactIs_production_min_14 = reactIs_production_min.Suspense;
  var reactIs_production_min_15 = reactIs_production_min.isValidElementType;
  var reactIs_production_min_16 = reactIs_production_min.isAsyncMode;
  var reactIs_production_min_17 = reactIs_production_min.isConcurrentMode;
  var reactIs_production_min_18 = reactIs_production_min.isContextConsumer;
  var reactIs_production_min_19 = reactIs_production_min.isContextProvider;
  var reactIs_production_min_20 = reactIs_production_min.isElement;
  var reactIs_production_min_21 = reactIs_production_min.isForwardRef;
  var reactIs_production_min_22 = reactIs_production_min.isFragment;
  var reactIs_production_min_23 = reactIs_production_min.isLazy;
  var reactIs_production_min_24 = reactIs_production_min.isMemo;
  var reactIs_production_min_25 = reactIs_production_min.isPortal;
  var reactIs_production_min_26 = reactIs_production_min.isProfiler;
  var reactIs_production_min_27 = reactIs_production_min.isStrictMode;
  var reactIs_production_min_28 = reactIs_production_min.isSuspense;

  var reactIs_development = createCommonjsModule(function (module, exports) {



  {
    (function() {

  Object.defineProperty(exports, '__esModule', { value: true });

  // The Symbol used to tag the ReactElement-like types. If there is no native Symbol
  // nor polyfill, then a plain number is used for performance.
  var hasSymbol = typeof Symbol === 'function' && Symbol.for;

  var REACT_ELEMENT_TYPE = hasSymbol ? Symbol.for('react.element') : 0xeac7;
  var REACT_PORTAL_TYPE = hasSymbol ? Symbol.for('react.portal') : 0xeaca;
  var REACT_FRAGMENT_TYPE = hasSymbol ? Symbol.for('react.fragment') : 0xeacb;
  var REACT_STRICT_MODE_TYPE = hasSymbol ? Symbol.for('react.strict_mode') : 0xeacc;
  var REACT_PROFILER_TYPE = hasSymbol ? Symbol.for('react.profiler') : 0xead2;
  var REACT_PROVIDER_TYPE = hasSymbol ? Symbol.for('react.provider') : 0xeacd;
  var REACT_CONTEXT_TYPE = hasSymbol ? Symbol.for('react.context') : 0xeace;
  var REACT_ASYNC_MODE_TYPE = hasSymbol ? Symbol.for('react.async_mode') : 0xeacf;
  var REACT_CONCURRENT_MODE_TYPE = hasSymbol ? Symbol.for('react.concurrent_mode') : 0xeacf;
  var REACT_FORWARD_REF_TYPE = hasSymbol ? Symbol.for('react.forward_ref') : 0xead0;
  var REACT_SUSPENSE_TYPE = hasSymbol ? Symbol.for('react.suspense') : 0xead1;
  var REACT_MEMO_TYPE = hasSymbol ? Symbol.for('react.memo') : 0xead3;
  var REACT_LAZY_TYPE = hasSymbol ? Symbol.for('react.lazy') : 0xead4;

  function isValidElementType(type) {
    return typeof type === 'string' || typeof type === 'function' ||
    // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
    type === REACT_FRAGMENT_TYPE || type === REACT_CONCURRENT_MODE_TYPE || type === REACT_PROFILER_TYPE || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || typeof type === 'object' && type !== null && (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE);
  }

  /**
   * Forked from fbjs/warning:
   * https://github.com/facebook/fbjs/blob/e66ba20ad5be433eb54423f2b097d829324d9de6/packages/fbjs/src/__forks__/warning.js
   *
   * Only change is we use console.warn instead of console.error,
   * and do nothing when 'console' is not supported.
   * This really simplifies the code.
   * ---
   * Similar to invariant but only logs a warning if the condition is not met.
   * This can be used to log issues in development environments in critical
   * paths. Removing the logging code for production environments will keep the
   * same logic and follow the same code paths.
   */

  var lowPriorityWarning = function () {};

  {
    var printWarning = function (format) {
      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      var argIndex = 0;
      var message = 'Warning: ' + format.replace(/%s/g, function () {
        return args[argIndex++];
      });
      if (typeof console !== 'undefined') {
        console.warn(message);
      }
      try {
        // --- Welcome to debugging React ---
        // This error was thrown as a convenience so that you can use this stack
        // to find the callsite that caused this warning to fire.
        throw new Error(message);
      } catch (x) {}
    };

    lowPriorityWarning = function (condition, format) {
      if (format === undefined) {
        throw new Error('`lowPriorityWarning(condition, format, ...args)` requires a warning ' + 'message argument');
      }
      if (!condition) {
        for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
          args[_key2 - 2] = arguments[_key2];
        }

        printWarning.apply(undefined, [format].concat(args));
      }
    };
  }

  var lowPriorityWarning$1 = lowPriorityWarning;

  function typeOf(object) {
    if (typeof object === 'object' && object !== null) {
      var $$typeof = object.$$typeof;
      switch ($$typeof) {
        case REACT_ELEMENT_TYPE:
          var type = object.type;

          switch (type) {
            case REACT_ASYNC_MODE_TYPE:
            case REACT_CONCURRENT_MODE_TYPE:
            case REACT_FRAGMENT_TYPE:
            case REACT_PROFILER_TYPE:
            case REACT_STRICT_MODE_TYPE:
            case REACT_SUSPENSE_TYPE:
              return type;
            default:
              var $$typeofType = type && type.$$typeof;

              switch ($$typeofType) {
                case REACT_CONTEXT_TYPE:
                case REACT_FORWARD_REF_TYPE:
                case REACT_PROVIDER_TYPE:
                  return $$typeofType;
                default:
                  return $$typeof;
              }
          }
        case REACT_LAZY_TYPE:
        case REACT_MEMO_TYPE:
        case REACT_PORTAL_TYPE:
          return $$typeof;
      }
    }

    return undefined;
  }

  // AsyncMode is deprecated along with isAsyncMode
  var AsyncMode = REACT_ASYNC_MODE_TYPE;
  var ConcurrentMode = REACT_CONCURRENT_MODE_TYPE;
  var ContextConsumer = REACT_CONTEXT_TYPE;
  var ContextProvider = REACT_PROVIDER_TYPE;
  var Element = REACT_ELEMENT_TYPE;
  var ForwardRef = REACT_FORWARD_REF_TYPE;
  var Fragment = REACT_FRAGMENT_TYPE;
  var Lazy = REACT_LAZY_TYPE;
  var Memo = REACT_MEMO_TYPE;
  var Portal = REACT_PORTAL_TYPE;
  var Profiler = REACT_PROFILER_TYPE;
  var StrictMode = REACT_STRICT_MODE_TYPE;
  var Suspense = REACT_SUSPENSE_TYPE;

  var hasWarnedAboutDeprecatedIsAsyncMode = false;

  // AsyncMode should be deprecated
  function isAsyncMode(object) {
    {
      if (!hasWarnedAboutDeprecatedIsAsyncMode) {
        hasWarnedAboutDeprecatedIsAsyncMode = true;
        lowPriorityWarning$1(false, 'The ReactIs.isAsyncMode() alias has been deprecated, ' + 'and will be removed in React 17+. Update your code to use ' + 'ReactIs.isConcurrentMode() instead. It has the exact same API.');
      }
    }
    return isConcurrentMode(object) || typeOf(object) === REACT_ASYNC_MODE_TYPE;
  }
  function isConcurrentMode(object) {
    return typeOf(object) === REACT_CONCURRENT_MODE_TYPE;
  }
  function isContextConsumer(object) {
    return typeOf(object) === REACT_CONTEXT_TYPE;
  }
  function isContextProvider(object) {
    return typeOf(object) === REACT_PROVIDER_TYPE;
  }
  function isElement(object) {
    return typeof object === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
  }
  function isForwardRef(object) {
    return typeOf(object) === REACT_FORWARD_REF_TYPE;
  }
  function isFragment(object) {
    return typeOf(object) === REACT_FRAGMENT_TYPE;
  }
  function isLazy(object) {
    return typeOf(object) === REACT_LAZY_TYPE;
  }
  function isMemo(object) {
    return typeOf(object) === REACT_MEMO_TYPE;
  }
  function isPortal(object) {
    return typeOf(object) === REACT_PORTAL_TYPE;
  }
  function isProfiler(object) {
    return typeOf(object) === REACT_PROFILER_TYPE;
  }
  function isStrictMode(object) {
    return typeOf(object) === REACT_STRICT_MODE_TYPE;
  }
  function isSuspense(object) {
    return typeOf(object) === REACT_SUSPENSE_TYPE;
  }

  exports.typeOf = typeOf;
  exports.AsyncMode = AsyncMode;
  exports.ConcurrentMode = ConcurrentMode;
  exports.ContextConsumer = ContextConsumer;
  exports.ContextProvider = ContextProvider;
  exports.Element = Element;
  exports.ForwardRef = ForwardRef;
  exports.Fragment = Fragment;
  exports.Lazy = Lazy;
  exports.Memo = Memo;
  exports.Portal = Portal;
  exports.Profiler = Profiler;
  exports.StrictMode = StrictMode;
  exports.Suspense = Suspense;
  exports.isValidElementType = isValidElementType;
  exports.isAsyncMode = isAsyncMode;
  exports.isConcurrentMode = isConcurrentMode;
  exports.isContextConsumer = isContextConsumer;
  exports.isContextProvider = isContextProvider;
  exports.isElement = isElement;
  exports.isForwardRef = isForwardRef;
  exports.isFragment = isFragment;
  exports.isLazy = isLazy;
  exports.isMemo = isMemo;
  exports.isPortal = isPortal;
  exports.isProfiler = isProfiler;
  exports.isStrictMode = isStrictMode;
  exports.isSuspense = isSuspense;
    })();
  }
  });

  unwrapExports(reactIs_development);
  var reactIs_development_1 = reactIs_development.typeOf;
  var reactIs_development_2 = reactIs_development.AsyncMode;
  var reactIs_development_3 = reactIs_development.ConcurrentMode;
  var reactIs_development_4 = reactIs_development.ContextConsumer;
  var reactIs_development_5 = reactIs_development.ContextProvider;
  var reactIs_development_6 = reactIs_development.Element;
  var reactIs_development_7 = reactIs_development.ForwardRef;
  var reactIs_development_8 = reactIs_development.Fragment;
  var reactIs_development_9 = reactIs_development.Lazy;
  var reactIs_development_10 = reactIs_development.Memo;
  var reactIs_development_11 = reactIs_development.Portal;
  var reactIs_development_12 = reactIs_development.Profiler;
  var reactIs_development_13 = reactIs_development.StrictMode;
  var reactIs_development_14 = reactIs_development.Suspense;
  var reactIs_development_15 = reactIs_development.isValidElementType;
  var reactIs_development_16 = reactIs_development.isAsyncMode;
  var reactIs_development_17 = reactIs_development.isConcurrentMode;
  var reactIs_development_18 = reactIs_development.isContextConsumer;
  var reactIs_development_19 = reactIs_development.isContextProvider;
  var reactIs_development_20 = reactIs_development.isElement;
  var reactIs_development_21 = reactIs_development.isForwardRef;
  var reactIs_development_22 = reactIs_development.isFragment;
  var reactIs_development_23 = reactIs_development.isLazy;
  var reactIs_development_24 = reactIs_development.isMemo;
  var reactIs_development_25 = reactIs_development.isPortal;
  var reactIs_development_26 = reactIs_development.isProfiler;
  var reactIs_development_27 = reactIs_development.isStrictMode;
  var reactIs_development_28 = reactIs_development.isSuspense;

  var reactIs = createCommonjsModule(function (module) {

  {
    module.exports = reactIs_development;
  }
  });
  var reactIs_1 = reactIs.isElement;
  var reactIs_2 = reactIs.isValidElementType;
  var reactIs_3 = reactIs.ForwardRef;

  // 
  function getComponentName(target) {
    return (typeof target === 'string' && target) || // $FlowFixMe
    target.displayName || // $FlowFixMe
    target.name || 'Component';
  }

  // 
  function isStatelessFunction(test) {
    return typeof test === 'function' && !(test.prototype && test.prototype.isReactComponent);
  }

  // 
  var SC_ATTR = typeof process !== 'undefined' && process.env.SC_ATTR || 'data-styled';
  var SC_ATTR_ACTIVE = 'active';
  var SC_VERSION_ATTR = 'data-styled-version';
  var SC_VERSION = "5.0.0-3.canary-sheet";
  var IS_BROWSER = typeof window !== 'undefined' && 'HTMLElement' in window;
  var DISABLE_SPEEDY = typeof SC_DISABLE_SPEEDY === 'boolean' && SC_DISABLE_SPEEDY || "development" !== 'production'; // Shared empty execution context when generating static styles

  var STATIC_EXECUTION_CONTEXT = {};

  // 
  var ELEMENT_TYPE = 1;
  /* Node.ELEMENT_TYPE */

  /** Find last style element if any inside target */

  var findLastStyleTag = function findLastStyleTag(target) {
    var childNodes = target.childNodes;

    for (var i = childNodes.length; i >= 0; i--) {
      var child = childNodes[i];

      if (child && child.nodeType === ELEMENT_TYPE && child.hasAttribute(SC_ATTR)) {
        return child;
      }
    }

    return undefined;
  };
  /** Create a style element inside `target` or <head> after the last */


  var makeStyleTag = function makeStyleTag(target) {
    var head = document.head;
    var parent = target || head;
    var style = document.createElement('style');
    var prevStyle = findLastStyleTag(parent);
    var nextSibling = prevStyle !== undefined ? prevStyle.nextSibling : null;
    style.setAttribute(SC_ATTR, SC_ATTR_ACTIVE);
    style.setAttribute(SC_VERSION_ATTR, SC_VERSION);
    parent.insertBefore(style, nextSibling);
    return style;
  };
  /** Get the CSSStyleSheet instance for a given style element */

  var getSheet = function getSheet(tag) {
    if (tag.sheet) {
      return tag.sheet;
    } // Avoid Firefox quirk where the style element might not have a sheet property


    var _document = document,
        styleSheets = _document.styleSheets;

    for (var i = 0, l = styleSheets.length; i < l; i++) {
      var sheet = styleSheets[i];

      if (sheet.ownerNode === tag) {
        return sheet;
      }
    }

    throw new TypeError("CSSStyleSheet could not be found on HTMLStyleElement");
  };

  // 
  /** CSSStyleSheet-like Tag abstraction for CSS rules */

  /** Create a CSSStyleSheet-like tag depending on the environment */

  var makeTag = function makeTag(isServer, target) {
    if (!IS_BROWSER) {
      return new VirtualTag(target);
    } else if (DISABLE_SPEEDY) {
      return new TextTag(target);
    } else {
      return new SpeedyTag(target);
    }
  };
  /** A Tag that wraps CSSOM's CSSStyleSheet API directly */

  var SpeedyTag =
  /*#__PURE__*/
  function () {
    function SpeedyTag(target) {
      var element = this.element = makeStyleTag(target); // Avoid Edge bug where empty style elements don't create sheets

      element.appendChild(document.createTextNode(''));
      this.sheet = getSheet(element);
      this.length = 0;
    }

    var _proto = SpeedyTag.prototype;

    _proto.insertRule = function insertRule(index, rule) {
      try {
        this.sheet.insertRule(rule, index);
        this.length++;
        return true;
      } catch (_error) {
        return false;
      }
    };

    _proto.deleteRule = function deleteRule(index) {
      this.sheet.deleteRule(index);
      this.length--;
    };

    _proto.getRule = function getRule(index) {
      if (index < this.length) {
        return this.sheet.cssRules[index].cssText;
      } else {
        return '';
      }
    };

    return SpeedyTag;
  }();
  /** A Tag that emulates the CSSStyleSheet API but uses text nodes */


  var TextTag =
  /*#__PURE__*/
  function () {
    function TextTag(target) {
      var element = this.element = makeStyleTag(target);
      this.nodes = element.childNodes;
      this.length = 0;
    }

    var _proto2 = TextTag.prototype;

    _proto2.insertRule = function insertRule(index, rule) {
      if (index <= this.length && index >= 0) {
        var node = document.createTextNode(rule);
        var refNode = this.nodes[index];
        this.element.insertBefore(node, refNode || null);
        this.length++;
        return true;
      } else {
        return false;
      }
    };

    _proto2.deleteRule = function deleteRule(index) {
      this.element.removeChild(this.nodes[index]);
      this.length--;
    };

    _proto2.getRule = function getRule(index) {
      if (index < this.length) {
        return this.nodes[index].textContent;
      } else {
        return '';
      }
    };

    return TextTag;
  }();
  /** A completely virtual (server-side) Tag that doesn't manipulate the DOM */


  var VirtualTag =
  /*#__PURE__*/
  function () {
    function VirtualTag(_target) {
      this.rules = [];
      this.length = 0;
    }

    var _proto3 = VirtualTag.prototype;

    _proto3.insertRule = function insertRule(index, rule) {
      if (index <= this.length) {
        this.rules.splice(index, 0, rule);
        this.length++;
        return true;
      } else {
        return false;
      }
    };

    _proto3.deleteRule = function deleteRule(index) {
      this.rules.splice(index, 1);
      this.length--;
    };

    _proto3.getRule = function getRule(index) {
      if (index < this.length) {
        return this.rules[index];
      } else {
        return '';
      }
    };

    return VirtualTag;
  }();

  // 

  /* eslint-disable no-use-before-define */

  /** Group-aware Tag that sorts rules by indices */

  /** Create a GroupedTag with an underlying Tag implementation */
  var makeGroupedTag = function makeGroupedTag(tag) {
    return new DefaultGroupedTag(tag);
  };
  var BASE_SIZE = 1 << 8;

  var DefaultGroupedTag =
  /*#__PURE__*/
  function () {
    function DefaultGroupedTag(tag) {
      this.groupSizes = new Uint32Array(BASE_SIZE);
      this.length = BASE_SIZE;
      this.tag = tag;
    }

    var _proto = DefaultGroupedTag.prototype;

    _proto.indexOfGroup = function indexOfGroup(group) {
      var index = 0;

      for (var i = 0; i < group; i++) {
        index += this.groupSizes[i];
      }

      return index;
    };

    _proto.insertRules = function insertRules(group, rules) {
      if (group >= this.groupSizes.length) {
        var oldBuffer = this.groupSizes;
        var oldSize = oldBuffer.length;
        var newSize = BASE_SIZE << (group / BASE_SIZE | 0);
        this.groupSizes = new Uint32Array(newSize);
        this.groupSizes.set(oldBuffer);
        this.length = newSize;

        for (var i = oldSize; i < newSize; i++) {
          this.groupSizes[i] = 0;
        }
      }

      var startIndex = this.indexOfGroup(group + 1);

      for (var _i = 0, l = rules.length; _i < l; _i++) {
        if (this.tag.insertRule(startIndex + _i, rules[_i])) {
          this.groupSizes[group]++;
        }
      }
    };

    _proto.clearGroup = function clearGroup(group) {
      if (group < this.length) {
        var length = this.groupSizes[group];
        var startIndex = this.indexOfGroup(group);
        var endIndex = startIndex + length;
        this.groupSizes[group] = 0;

        for (var i = startIndex; i < endIndex; i++) {
          this.tag.deleteRule(startIndex);
        }
      }
    };

    _proto.getGroup = function getGroup(group) {
      var css = '';

      if (group >= this.length || this.groupSizes[group] === 0) {
        return css;
      }

      var length = this.groupSizes[group];
      var startIndex = this.indexOfGroup(group);
      var endIndex = startIndex + length;

      for (var i = startIndex; i < endIndex; i++) {
        css += this.tag.getRule(i) + "\n";
      }

      return css;
    };

    return DefaultGroupedTag;
  }();

  // 
  var groupIDRegister = new Map();
  var reverseRegister = new Map();
  var nextFreeGroup = 1;
  var getGroupForId = function getGroupForId(id) {
    if (groupIDRegister.has(id)) {
      return groupIDRegister.get(id);
    }

    var group = nextFreeGroup++;
    groupIDRegister.set(id, group);
    reverseRegister.set(group, id);
    return group;
  };
  var getIdForGroup = function getIdForGroup(group) {
    return reverseRegister.get(group);
  };
  var setGroupForId = function setGroupForId(id, group) {
    if (group >= nextFreeGroup) {
      nextFreeGroup = group + 1;
    }

    groupIDRegister.set(id, group);
    reverseRegister.set(group, id);
  };

  // 
  var PLAIN_RULE_TYPE = 1;
  var SELECTOR = "style[" + SC_ATTR + "][" + SC_VERSION_ATTR + "=\"" + SC_VERSION + "\"]";
  var MARKER_RE = new RegExp("^" + SC_ATTR + "\\.g(\\d+)\\[id=\"([\\w\\d-]+)\"\\]");
  var outputSheet = function outputSheet(sheet) {
    var tag = sheet.getTag();
    var length = tag.length;
    var css = '';

    for (var group = 0; group < length; group++) {
      var id = getIdForGroup(group);
      if (id === undefined) continue;
      var names = sheet.names.get(id);
      var rules = tag.getGroup(group);
      if (names === undefined || rules.length === 0) continue;
      var selector = SC_ATTR + ".g" + group + "[id=\"" + id + "\"]";
      var content = '';

      if (names !== undefined) {
        names.forEach(function (name) {
          if (name.length > 0) {
            content += name + ",";
          }
        });
      } // NOTE: It's easier to collect rules and have the marker
      // after the actual rules to simplify the rehydration


      css += rules + selector;

      if (content.length > 0) {
        css += "{content:\"" + content + "\"}\n";
      } else {
        css += '{}\n';
      }
    }

    return css;
  };

  var rehydrateNamesFromContent = function rehydrateNamesFromContent(sheet, id, content) {
    var names = content.slice(1, -1).split(',');

    for (var i = 0, l = names.length; i < l; i++) {
      var name = names[i];

      if (name.length > 0) {
        sheet.registerName(id, name);
      }
    }
  };

  var rehydrateSheetFromTag = function rehydrateSheetFromTag(sheet, style) {
    var _getSheet = getSheet(style),
        cssRules = _getSheet.cssRules;

    var rules = [];

    for (var i = 0, l = cssRules.length; i < l; i++) {
      var cssRule = cssRules[i];

      if (cssRule.type !== PLAIN_RULE_TYPE) {
        rules.push(cssRule.cssText);
      } else {
        var marker = cssRule.selectorText.match(MARKER_RE);

        if (marker !== null) {
          var group = parseInt(marker[1], 10) | 0;
          var id = marker[2];
          var content = cssRule.style.content;

          if (group !== 0) {
            // Rehydrate componentId to group index mapping
            setGroupForId(id, group); // Rehydrate names and rules

            rehydrateNamesFromContent(sheet, id, content);
            sheet.getTag().insertRules(group, rules);
          }

          rules.length = 0;
        } else {
          rules.push(cssRule.cssText);
        }
      }
    }
  };

  var rehydrateSheet = function rehydrateSheet(sheet) {
    var nodes = document.querySelectorAll(SELECTOR);

    for (var i = 0, l = nodes.length; i < l; i++) {
      var node = nodes[i];

      if (node && node.getAttribute(SC_ATTR) !== SC_ATTR_ACTIVE) {
        rehydrateSheetFromTag(sheet, node);

        if (node.parentNode) {
          node.parentNode.removeChild(node);
        }
      }
    }
  };

  // 
  var SHOULD_REHYDRATE = IS_BROWSER;
  /** Contains the main stylesheet logic for stringification and caching */

  var StyleSheet =
  /*#__PURE__*/
  function () {
    /** Register a group ID to give it an index */
    StyleSheet.registerId = function registerId(id) {
      return getGroupForId(id);
    };

    function StyleSheet(isServer, target) {
      this.names = new Map();
      this.isServer = isServer;
      this.target = target; // We rehydrate only once and use the sheet that is
      // created first

      if (!isServer && IS_BROWSER && SHOULD_REHYDRATE) {
        SHOULD_REHYDRATE = false;
        rehydrateSheet(this);
      }
    }
    /** Lazily initialises a GroupedTag for when it's actually needed */


    var _proto = StyleSheet.prototype;

    _proto.getTag = function getTag() {
      if (this.tag === undefined) {
        var tag = makeTag(this.isServer, this.target);
        this.tag = makeGroupedTag(tag);
      }

      return this.tag;
    }
    /** Check whether a name is known for caching */
    ;

    _proto.hasNameForId = function hasNameForId(id, name) {
      return this.names.has(id) && this.names.get(id).has(name);
    }
    /** Mark a group's name as known for caching */
    ;

    _proto.registerName = function registerName(id, name) {
      getGroupForId(id);

      if (!this.names.has(id)) {
        var groupNames = new Set();
        groupNames.add(name);
        this.names.set(id, groupNames);
      } else {
        this.names.get(id).add(name);
      }
    }
    /** Insert new rules which also marks the name as known */
    ;

    _proto.insertRules = function insertRules(id, name, rules) {
      this.registerName(id, name);
      this.getTag().insertRules(getGroupForId(id), rules);
    }
    /** Clears all cached names for a given group ID */
    ;

    _proto.clearNames = function clearNames(id) {
      if (this.names.has(id)) {
        this.names.get(id).clear();
      }
    }
    /** Clears all rules for a given group ID */
    ;

    _proto.clearRules = function clearRules(id) {
      this.getTag().clearGroup(getGroupForId(id));
      this.clearNames(id);
    }
    /** Clears the entire tag which deletes all rules but not its names */
    ;

    _proto.clearTag = function clearTag() {
      // NOTE: This does not clear the names, since it's only used during SSR
      // so that we can continuously output only new rules
      this.tag = undefined;
    }
    /** Outputs the current sheet as a CSS string with markers for SSR */
    ;

    _proto.toString = function toString() {
      return outputSheet(this);
    };

    return StyleSheet;
  }();

  //

  function _extends() {
    _extends = Object.assign || function (target) {
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

    return _extends.apply(this, arguments);
  }

  function _inheritsLoose(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype);
    subClass.prototype.constructor = subClass;
    subClass.__proto__ = superClass;
  }

  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
  }

  function isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;

    try {
      Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
      return true;
    } catch (e) {
      return false;
    }
  }

  function _construct(Parent, args, Class) {
    if (isNativeReflectConstruct()) {
      _construct = Reflect.construct;
    } else {
      _construct = function _construct(Parent, args, Class) {
        var a = [null];
        a.push.apply(a, args);
        var Constructor = Function.bind.apply(Parent, a);
        var instance = new Constructor();
        if (Class) _setPrototypeOf(instance, Class.prototype);
        return instance;
      };
    }

    return _construct.apply(null, arguments);
  }

  function _isNativeFunction(fn) {
    return Function.toString.call(fn).indexOf("[native code]") !== -1;
  }

  function _wrapNativeSuper(Class) {
    var _cache = typeof Map === "function" ? new Map() : undefined;

    _wrapNativeSuper = function _wrapNativeSuper(Class) {
      if (Class === null || !_isNativeFunction(Class)) return Class;

      if (typeof Class !== "function") {
        throw new TypeError("Super expression must either be null or a function");
      }

      if (typeof _cache !== "undefined") {
        if (_cache.has(Class)) return _cache.get(Class);

        _cache.set(Class, Wrapper);
      }

      function Wrapper() {
        return _construct(Class, arguments, _getPrototypeOf(this).constructor);
      }

      Wrapper.prototype = Object.create(Class.prototype, {
        constructor: {
          value: Wrapper,
          enumerable: false,
          writable: true,
          configurable: true
        }
      });
      return _setPrototypeOf(Wrapper, Class);
    };

    return _wrapNativeSuper(Class);
  }

  function _objectWithoutPropertiesLoose(source, excluded) {
    if (source == null) return {};
    var target = {};
    var sourceKeys = Object.keys(source);
    var key, i;

    for (i = 0; i < sourceKeys.length; i++) {
      key = sourceKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      target[key] = source[key];
    }

    return target;
  }

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  // 

  /**
   * Parse errors.md and turn it into a simple hash of code: message
   */
  var ERRORS = {
    "1": "Cannot create styled-component for component: %s.\n\n",
    "2": "Can't collect styles once you've consumed a `ServerStyleSheet`'s styles! `ServerStyleSheet` is a one off instance for each server-side render cycle.\n\n- Are you trying to reuse it across renders?\n- Are you accidentally calling collectStyles twice?\n\n",
    "3": "Streaming SSR is only supported in a Node.js environment; Please do not try to call this method in the browser.\n\n",
    "4": "The `StyleSheetManager` expects a valid target or sheet prop!\n\n- Does this error occur on the client and is your target falsy?\n- Does this error occur on the server and is the sheet falsy?\n\n",
    "5": "The clone method cannot be used on the client!\n\n- Are you running in a client-like environment on the server?\n- Are you trying to run SSR on the client?\n\n",
    "6": "Trying to insert a new style tag, but the given Node is unmounted!\n\n- Are you using a custom target that isn't mounted?\n- Does your document not have a valid head element?\n- Have you accidentally removed a style tag manually?\n\n",
    "7": "ThemeProvider: Please return an object from your \"theme\" prop function, e.g.\n\n```js\ntheme={() => ({})}\n```\n\n",
    "8": "ThemeProvider: Please make your \"theme\" prop an object.\n\n",
    "9": "Missing document `<head>`\n\n",
    "10": "Cannot find a StyleSheet instance. Usually this happens if there are multiple copies of styled-components loaded at once. Check out this issue for how to troubleshoot and fix the common cases where this situation can happen: https://github.com/styled-components/styled-components/issues/1941#issuecomment-417862021\n\n",
    "11": "_This error was replaced with a dev-time warning, it will be deleted for v4 final._ [createGlobalStyle] received children which will not be rendered. Please use the component without passing children elements.\n\n",
    "12": "It seems you are interpolating a keyframe declaration (%s) into an untagged string. This was supported in styled-components v3, but is not longer supported in v4 as keyframes are now injected on-demand. Please wrap your string in the css\\`\\` helper (see https://www.styled-components.com/docs/api#css), which ensures the styles are injected correctly.\n\n",
    "13": "%s is not a styled component and cannot be referred to via component selector. See https://www.styled-components.com/docs/advanced#referring-to-other-components for more details.\n"
  };
  /**
   * super basic version of sprintf
   */

  function format() {
    var a = arguments.length <= 0 ? undefined : arguments[0];
    var b = [];

    for (var c = 1, len = arguments.length; c < len; c += 1) {
      b.push(c < 0 || arguments.length <= c ? undefined : arguments[c]);
    }

    b.forEach(function (d) {
      a = a.replace(/%[a-z]/, d);
    });
    return a;
  }
  /**
   * Create an error file out of errors.md for development and a simple web link to the full errors
   * in production mode.
   */


  var StyledComponentsError =
  /*#__PURE__*/
  function (_Error) {
    _inheritsLoose(StyledComponentsError, _Error);

    function StyledComponentsError(code) {
      var _this;

      for (var _len = arguments.length, interpolations = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        interpolations[_key - 1] = arguments[_key];
      }

      {
        _this = _Error.call(this, format.apply(void 0, [ERRORS[code]].concat(interpolations)).trim()) || this;
      }

      return _assertThisInitialized(_this);
    }

    return StyledComponentsError;
  }(_wrapNativeSuper(Error));

  // 

  var Keyframes =
  /*#__PURE__*/
  function () {
    function Keyframes(name, rules) {
      var _this = this;

      this.inject = function (styleSheet) {
        if (!styleSheet.hasNameForId(_this.id, _this.name)) {
          styleSheet.insertRules(_this.id, _this.name, _this.rules);
        }
      };

      this.toString = function () {
        throw new StyledComponentsError(12, String(_this.name));
      };

      this.name = name;
      this.rules = rules;
      this.id = "sc-keyframes-" + name;
    }

    var _proto = Keyframes.prototype;

    _proto.getName = function getName() {
      return this.name;
    };

    return Keyframes;
  }();

  // 

  /**
   * inlined version of
   * https://github.com/facebook/fbjs/blob/master/packages/fbjs/src/core/hyphenateStyleName.js
   */
  var uppercasePattern = /([A-Z])/g;
  var msPattern = /^ms-/;
  /**
   * Hyphenates a camelcased CSS property name, for example:
   *
   *   > hyphenateStyleName('backgroundColor')
   *   < "background-color"
   *   > hyphenateStyleName('MozTransition')
   *   < "-moz-transition"
   *   > hyphenateStyleName('msTransition')
   *   < "-ms-transition"
   *
   * As Modernizr suggests (http://modernizr.com/docs/#prefixed), an `ms` prefix
   * is converted to `-ms-`.
   *
   * @param {string} string
   * @return {string}
   */

  function hyphenateStyleName(string) {
    return string.replace(uppercasePattern, '-$1').toLowerCase().replace(msPattern, '-ms-');
  }

  var unitlessKeys = {
    animationIterationCount: 1,
    borderImageOutset: 1,
    borderImageSlice: 1,
    borderImageWidth: 1,
    boxFlex: 1,
    boxFlexGroup: 1,
    boxOrdinalGroup: 1,
    columnCount: 1,
    columns: 1,
    flex: 1,
    flexGrow: 1,
    flexPositive: 1,
    flexShrink: 1,
    flexNegative: 1,
    flexOrder: 1,
    gridRow: 1,
    gridRowEnd: 1,
    gridRowSpan: 1,
    gridRowStart: 1,
    gridColumn: 1,
    gridColumnEnd: 1,
    gridColumnSpan: 1,
    gridColumnStart: 1,
    msGridRow: 1,
    msGridRowSpan: 1,
    msGridColumn: 1,
    msGridColumnSpan: 1,
    fontWeight: 1,
    lineHeight: 1,
    opacity: 1,
    order: 1,
    orphans: 1,
    tabSize: 1,
    widows: 1,
    zIndex: 1,
    zoom: 1,
    WebkitLineClamp: 1,
    // SVG-related properties
    fillOpacity: 1,
    floodOpacity: 1,
    stopOpacity: 1,
    strokeDasharray: 1,
    strokeDashoffset: 1,
    strokeMiterlimit: 1,
    strokeOpacity: 1,
    strokeWidth: 1
  };

  // 

  function addUnitIfNeeded(name, value) {
    // https://github.com/amilajack/eslint-plugin-flowtype-errors/issues/133
    // $FlowFixMe
    if (value == null || typeof value === 'boolean' || value === '') {
      return '';
    }

    if (typeof value === 'number' && value !== 0 && !(name in unitlessKeys)) {
      return value + "px"; // Presumes implicit 'px' suffix for unitless numbers
    }

    return String(value).trim();
  }

  // 
  /**
   * It's falsish not falsy because 0 is allowed.
   */

  var isFalsish = function isFalsish(chunk) {
    return chunk === undefined || chunk === null || chunk === false || chunk === '';
  };

  var objToCss = function objToCss(obj, prevKey) {
    var css = Object.keys(obj).filter(function (key) {
      return !isFalsish(obj[key]);
    }).map(function (key) {
      if (isPlainObject(obj[key])) return objToCss(obj[key], key);
      return hyphenateStyleName(key) + ": " + addUnitIfNeeded(key, obj[key]) + ";";
    }).join(' ');
    return prevKey ? prevKey + " {\n  " + css + "\n}" : css;
  };
  function flatten(chunk, executionContext, styleSheet) {
    if (Array.isArray(chunk)) {
      var ruleSet = [];

      for (var i = 0, len = chunk.length, result; i < len; i += 1) {
        result = flatten(chunk[i], executionContext, styleSheet);
        if (result === '') continue;else if (Array.isArray(result)) ruleSet.push.apply(ruleSet, result);else ruleSet.push(result);
      }

      return ruleSet;
    }

    if (isFalsish(chunk)) {
      return '';
    }
    /* Handle other components */


    if (isStyledComponent(chunk)) {
      return "." + chunk.styledComponentId;
    }
    /* Either execute or defer the function */


    if (isFunction(chunk)) {
      if (isStatelessFunction(chunk) && executionContext) {
        var _result = chunk(executionContext);

        if (reactIs_1(_result)) {
          // eslint-disable-next-line no-console
          console.warn(getComponentName(chunk) + " is not a styled component and cannot be referred to via component selector. See https://www.styled-components.com/docs/advanced#referring-to-other-components for more details.");
        }

        return flatten(_result, executionContext, styleSheet);
      } else return chunk;
    }

    if (chunk instanceof Keyframes) {
      if (styleSheet) {
        chunk.inject(styleSheet);
        return chunk.getName();
      } else return chunk;
    }
    /* Handle objects */


    return isPlainObject(chunk) ? objToCss(chunk) : chunk.toString();
  }

  // 
  function css(styles) {
    for (var _len = arguments.length, interpolations = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      interpolations[_key - 1] = arguments[_key];
    }

    if (isFunction(styles) || isPlainObject(styles)) {
      // $FlowFixMe
      return flatten(interleave(EMPTY_ARRAY, [styles].concat(interpolations)));
    } // $FlowFixMe


    return flatten(interleave(styles, interpolations));
  }

  // 

  function hasFunctionObjectKey(obj) {
    // eslint-disable-next-line guard-for-in, no-restricted-syntax
    for (var key in obj) {
      if (isFunction(obj[key])) {
        return true;
      }
    }

    return false;
  }

  function isStaticRules(rules, attrs) {
    for (var i = 0; i < rules.length; i += 1) {
      var rule = rules[i]; // recursive case

      if (Array.isArray(rule) && !isStaticRules(rule, attrs)) {
        return false;
      } else if (isFunction(rule) && !isStyledComponent(rule)) {
        // functions are allowed to be static if they're just being
        // used to get the classname of a nested styled component
        return false;
      }
    }

    if (attrs.some(function (x) {
      return isFunction(x) || hasFunctionObjectKey(x);
    })) return false;
    return true;
  }

  var stylis_min = createCommonjsModule(function (module, exports) {
  !function(e){module.exports=e(null);}(function e(a){var r=/^\0+/g,c=/[\0\r\f]/g,s=/: */g,t=/zoo|gra/,i=/([,: ])(transform)/g,f=/,+\s*(?![^(]*[)])/g,n=/ +\s*(?![^(]*[)])/g,l=/ *[\0] */g,o=/,\r+?/g,h=/([\t\r\n ])*\f?&/g,u=/:global\(((?:[^\(\)\[\]]*|\[.*\]|\([^\(\)]*\))*)\)/g,d=/\W+/g,b=/@(k\w+)\s*(\S*)\s*/,p=/::(place)/g,k=/:(read-only)/g,g=/\s+(?=[{\];=:>])/g,A=/([[}=:>])\s+/g,C=/(\{[^{]+?);(?=\})/g,w=/\s{2,}/g,v=/([^\(])(:+) */g,m=/[svh]\w+-[tblr]{2}/,x=/\(\s*(.*)\s*\)/g,$=/([\s\S]*?);/g,y=/-self|flex-/g,O=/[^]*?(:[rp][el]a[\w-]+)[^]*/,j=/stretch|:\s*\w+\-(?:conte|avail)/,z=/([^-])(image-set\()/,N="-webkit-",S="-moz-",F="-ms-",W=59,q=125,B=123,D=40,E=41,G=91,H=93,I=10,J=13,K=9,L=64,M=32,P=38,Q=45,R=95,T=42,U=44,V=58,X=39,Y=34,Z=47,_=62,ee=43,ae=126,re=0,ce=12,se=11,te=107,ie=109,fe=115,ne=112,le=111,oe=105,he=99,ue=100,de=112,be=1,pe=1,ke=0,ge=1,Ae=1,Ce=1,we=0,ve=0,me=0,xe=[],$e=[],ye=0,Oe=null,je=-2,ze=-1,Ne=0,Se=1,Fe=2,We=3,qe=0,Be=1,De="",Ee="",Ge="";function He(e,a,s,t,i){for(var f,n,o=0,h=0,u=0,d=0,g=0,A=0,C=0,w=0,m=0,$=0,y=0,O=0,j=0,z=0,R=0,we=0,$e=0,Oe=0,je=0,ze=s.length,Je=ze-1,Re="",Te="",Ue="",Ve="",Xe="",Ye="";R<ze;){if(C=s.charCodeAt(R),R===Je)if(h+d+u+o!==0){if(0!==h)C=h===Z?I:Z;d=u=o=0,ze++,Je++;}if(h+d+u+o===0){if(R===Je){if(we>0)Te=Te.replace(c,"");if(Te.trim().length>0){switch(C){case M:case K:case W:case J:case I:break;default:Te+=s.charAt(R);}C=W;}}if(1===$e)switch(C){case B:case q:case W:case Y:case X:case D:case E:case U:$e=0;case K:case J:case I:case M:break;default:for($e=0,je=R,g=C,R--,C=W;je<ze;)switch(s.charCodeAt(je++)){case I:case J:case W:++R,C=g,je=ze;break;case V:if(we>0)++R,C=g;case B:je=ze;}}switch(C){case B:for(g=(Te=Te.trim()).charCodeAt(0),y=1,je=++R;R<ze;){switch(C=s.charCodeAt(R)){case B:y++;break;case q:y--;break;case Z:switch(A=s.charCodeAt(R+1)){case T:case Z:R=Qe(A,R,Je,s);}break;case G:C++;case D:C++;case Y:case X:for(;R++<Je&&s.charCodeAt(R)!==C;);}if(0===y)break;R++;}if(Ue=s.substring(je,R),g===re)g=(Te=Te.replace(r,"").trim()).charCodeAt(0);switch(g){case L:if(we>0)Te=Te.replace(c,"");switch(A=Te.charCodeAt(1)){case ue:case ie:case fe:case Q:f=a;break;default:f=xe;}if(je=(Ue=He(a,f,Ue,A,i+1)).length,me>0&&0===je)je=Te.length;if(ye>0)if(f=Ie(xe,Te,Oe),n=Pe(We,Ue,f,a,pe,be,je,A,i,t),Te=f.join(""),void 0!==n)if(0===(je=(Ue=n.trim()).length))A=0,Ue="";if(je>0)switch(A){case fe:Te=Te.replace(x,Me);case ue:case ie:case Q:Ue=Te+"{"+Ue+"}";break;case te:if(Ue=(Te=Te.replace(b,"$1 $2"+(Be>0?De:"")))+"{"+Ue+"}",1===Ae||2===Ae&&Le("@"+Ue,3))Ue="@"+N+Ue+"@"+Ue;else Ue="@"+Ue;break;default:if(Ue=Te+Ue,t===de)Ve+=Ue,Ue="";}else Ue="";break;default:Ue=He(a,Ie(a,Te,Oe),Ue,t,i+1);}Xe+=Ue,O=0,$e=0,z=0,we=0,Oe=0,j=0,Te="",Ue="",C=s.charCodeAt(++R);break;case q:case W:if((je=(Te=(we>0?Te.replace(c,""):Te).trim()).length)>1){if(0===z)if((g=Te.charCodeAt(0))===Q||g>96&&g<123)je=(Te=Te.replace(" ",":")).length;if(ye>0)if(void 0!==(n=Pe(Se,Te,a,e,pe,be,Ve.length,t,i,t)))if(0===(je=(Te=n.trim()).length))Te="\0\0";switch(g=Te.charCodeAt(0),A=Te.charCodeAt(1),g){case re:break;case L:if(A===oe||A===he){Ye+=Te+s.charAt(R);break}default:if(Te.charCodeAt(je-1)===V)break;Ve+=Ke(Te,g,A,Te.charCodeAt(2));}}O=0,$e=0,z=0,we=0,Oe=0,Te="",C=s.charCodeAt(++R);}}switch(C){case J:case I:if(h+d+u+o+ve===0)switch($){case E:case X:case Y:case L:case ae:case _:case T:case ee:case Z:case Q:case V:case U:case W:case B:case q:break;default:if(z>0)$e=1;}if(h===Z)h=0;else if(ge+O===0&&t!==te&&Te.length>0)we=1,Te+="\0";if(ye*qe>0)Pe(Ne,Te,a,e,pe,be,Ve.length,t,i,t);be=1,pe++;break;case W:case q:if(h+d+u+o===0){be++;break}default:switch(be++,Re=s.charAt(R),C){case K:case M:if(d+o+h===0)switch(w){case U:case V:case K:case M:Re="";break;default:if(C!==M)Re=" ";}break;case re:Re="\\0";break;case ce:Re="\\f";break;case se:Re="\\v";break;case P:if(d+h+o===0&&ge>0)Oe=1,we=1,Re="\f"+Re;break;case 108:if(d+h+o+ke===0&&z>0)switch(R-z){case 2:if(w===ne&&s.charCodeAt(R-3)===V)ke=w;case 8:if(m===le)ke=m;}break;case V:if(d+h+o===0)z=R;break;case U:if(h+u+d+o===0)we=1,Re+="\r";break;case Y:case X:if(0===h)d=d===C?0:0===d?C:d;break;case G:if(d+h+u===0)o++;break;case H:if(d+h+u===0)o--;break;case E:if(d+h+o===0)u--;break;case D:if(d+h+o===0){if(0===O)switch(2*w+3*m){case 533:break;default:y=0,O=1;}u++;}break;case L:if(h+u+d+o+z+j===0)j=1;break;case T:case Z:if(d+o+u>0)break;switch(h){case 0:switch(2*C+3*s.charCodeAt(R+1)){case 235:h=Z;break;case 220:je=R,h=T;}break;case T:if(C===Z&&w===T&&je+2!==R){if(33===s.charCodeAt(je+2))Ve+=s.substring(je,R+1);Re="",h=0;}}}if(0===h){if(ge+d+o+j===0&&t!==te&&C!==W)switch(C){case U:case ae:case _:case ee:case E:case D:if(0===O){switch(w){case K:case M:case I:case J:Re+="\0";break;default:Re="\0"+Re+(C===U?"":"\0");}we=1;}else switch(C){case D:if(z+7===R&&108===w)z=0;O=++y;break;case E:if(0==(O=--y))we=1,Re+="\0";}break;case K:case M:switch(w){case re:case B:case q:case W:case U:case ce:case K:case M:case I:case J:break;default:if(0===O)we=1,Re+="\0";}}if(Te+=Re,C!==M&&C!==K)$=C;}}m=w,w=C,R++;}if(je=Ve.length,me>0)if(0===je&&0===Xe.length&&0===a[0].length==false)if(t!==ie||1===a.length&&(ge>0?Ee:Ge)===a[0])je=a.join(",").length+2;if(je>0){if(f=0===ge&&t!==te?function(e){for(var a,r,s=0,t=e.length,i=Array(t);s<t;++s){for(var f=e[s].split(l),n="",o=0,h=0,u=0,d=0,b=f.length;o<b;++o){if(0===(h=(r=f[o]).length)&&b>1)continue;if(u=n.charCodeAt(n.length-1),d=r.charCodeAt(0),a="",0!==o)switch(u){case T:case ae:case _:case ee:case M:case D:break;default:a=" ";}switch(d){case P:r=a+Ee;case ae:case _:case ee:case M:case E:case D:break;case G:r=a+r+Ee;break;case V:switch(2*r.charCodeAt(1)+3*r.charCodeAt(2)){case 530:if(Ce>0){r=a+r.substring(8,h-1);break}default:if(o<1||f[o-1].length<1)r=a+Ee+r;}break;case U:a="";default:if(h>1&&r.indexOf(":")>0)r=a+r.replace(v,"$1"+Ee+"$2");else r=a+r+Ee;}n+=r;}i[s]=n.replace(c,"").trim();}return i}(a):a,ye>0)if(void 0!==(n=Pe(Fe,Ve,f,e,pe,be,je,t,i,t))&&0===(Ve=n).length)return Ye+Ve+Xe;if(Ve=f.join(",")+"{"+Ve+"}",Ae*ke!=0){if(2===Ae&&!Le(Ve,2))ke=0;switch(ke){case le:Ve=Ve.replace(k,":"+S+"$1")+Ve;break;case ne:Ve=Ve.replace(p,"::"+N+"input-$1")+Ve.replace(p,"::"+S+"$1")+Ve.replace(p,":"+F+"input-$1")+Ve;}ke=0;}}return Ye+Ve+Xe}function Ie(e,a,r){var c=a.trim().split(o),s=c,t=c.length,i=e.length;switch(i){case 0:case 1:for(var f=0,n=0===i?"":e[0]+" ";f<t;++f)s[f]=Je(n,s[f],r,i).trim();break;default:f=0;var l=0;for(s=[];f<t;++f)for(var h=0;h<i;++h)s[l++]=Je(e[h]+" ",c[f],r,i).trim();}return s}function Je(e,a,r,c){var s=a,t=s.charCodeAt(0);if(t<33)t=(s=s.trim()).charCodeAt(0);switch(t){case P:switch(ge+c){case 0:case 1:if(0===e.trim().length)break;default:return s.replace(h,"$1"+e.trim())}break;case V:switch(s.charCodeAt(1)){case 103:if(Ce>0&&ge>0)return s.replace(u,"$1").replace(h,"$1"+Ge);break;default:return e.trim()+s.replace(h,"$1"+e.trim())}default:if(r*ge>0&&s.indexOf("\f")>0)return s.replace(h,(e.charCodeAt(0)===V?"":"$1")+e.trim())}return e+s}function Ke(e,a,r,c){var l,o=0,h=e+";",u=2*a+3*r+4*c;if(944===u)return function(e){var a=e.length,r=e.indexOf(":",9)+1,c=e.substring(0,r).trim(),s=e.substring(r,a-1).trim();switch(e.charCodeAt(9)*Be){case 0:break;case Q:if(110!==e.charCodeAt(10))break;default:for(var t=s.split((s="",f)),i=0,r=0,a=t.length;i<a;r=0,++i){for(var l=t[i],o=l.split(n);l=o[r];){var h=l.charCodeAt(0);if(1===Be&&(h>L&&h<90||h>96&&h<123||h===R||h===Q&&l.charCodeAt(1)!==Q))switch(isNaN(parseFloat(l))+(-1!==l.indexOf("("))){case 1:switch(l){case"infinite":case"alternate":case"backwards":case"running":case"normal":case"forwards":case"both":case"none":case"linear":case"ease":case"ease-in":case"ease-out":case"ease-in-out":case"paused":case"reverse":case"alternate-reverse":case"inherit":case"initial":case"unset":case"step-start":case"step-end":break;default:l+=De;}}o[r++]=l;}s+=(0===i?"":",")+o.join(" ");}}if(s=c+s+";",1===Ae||2===Ae&&Le(s,1))return N+s+s;return s}(h);else if(0===Ae||2===Ae&&!Le(h,1))return h;switch(u){case 1015:return 97===h.charCodeAt(10)?N+h+h:h;case 951:return 116===h.charCodeAt(3)?N+h+h:h;case 963:return 110===h.charCodeAt(5)?N+h+h:h;case 1009:if(100!==h.charCodeAt(4))break;case 969:case 942:return N+h+h;case 978:return N+h+S+h+h;case 1019:case 983:return N+h+S+h+F+h+h;case 883:if(h.charCodeAt(8)===Q)return N+h+h;if(h.indexOf("image-set(",11)>0)return h.replace(z,"$1"+N+"$2")+h;return h;case 932:if(h.charCodeAt(4)===Q)switch(h.charCodeAt(5)){case 103:return N+"box-"+h.replace("-grow","")+N+h+F+h.replace("grow","positive")+h;case 115:return N+h+F+h.replace("shrink","negative")+h;case 98:return N+h+F+h.replace("basis","preferred-size")+h}return N+h+F+h+h;case 964:return N+h+F+"flex-"+h+h;case 1023:if(99!==h.charCodeAt(8))break;return l=h.substring(h.indexOf(":",15)).replace("flex-","").replace("space-between","justify"),N+"box-pack"+l+N+h+F+"flex-pack"+l+h;case 1005:return t.test(h)?h.replace(s,":"+N)+h.replace(s,":"+S)+h:h;case 1e3:switch(o=(l=h.substring(13).trim()).indexOf("-")+1,l.charCodeAt(0)+l.charCodeAt(o)){case 226:l=h.replace(m,"tb");break;case 232:l=h.replace(m,"tb-rl");break;case 220:l=h.replace(m,"lr");break;default:return h}return N+h+F+l+h;case 1017:if(-1===h.indexOf("sticky",9))return h;case 975:switch(o=(h=e).length-10,u=(l=(33===h.charCodeAt(o)?h.substring(0,o):h).substring(e.indexOf(":",7)+1).trim()).charCodeAt(0)+(0|l.charCodeAt(7))){case 203:if(l.charCodeAt(8)<111)break;case 115:h=h.replace(l,N+l)+";"+h;break;case 207:case 102:h=h.replace(l,N+(u>102?"inline-":"")+"box")+";"+h.replace(l,N+l)+";"+h.replace(l,F+l+"box")+";"+h;}return h+";";case 938:if(h.charCodeAt(5)===Q)switch(h.charCodeAt(6)){case 105:return l=h.replace("-items",""),N+h+N+"box-"+l+F+"flex-"+l+h;case 115:return N+h+F+"flex-item-"+h.replace(y,"")+h;default:return N+h+F+"flex-line-pack"+h.replace("align-content","").replace(y,"")+h}break;case 973:case 989:if(h.charCodeAt(3)!==Q||122===h.charCodeAt(4))break;case 931:case 953:if(true===j.test(e))if(115===(l=e.substring(e.indexOf(":")+1)).charCodeAt(0))return Ke(e.replace("stretch","fill-available"),a,r,c).replace(":fill-available",":stretch");else return h.replace(l,N+l)+h.replace(l,S+l.replace("fill-",""))+h;break;case 962:if(h=N+h+(102===h.charCodeAt(5)?F+h:"")+h,r+c===211&&105===h.charCodeAt(13)&&h.indexOf("transform",10)>0)return h.substring(0,h.indexOf(";",27)+1).replace(i,"$1"+N+"$2")+h}return h}function Le(e,a){var r=e.indexOf(1===a?":":"{"),c=e.substring(0,3!==a?r:10),s=e.substring(r+1,e.length-1);return Oe(2!==a?c:c.replace(O,"$1"),s,a)}function Me(e,a){var r=Ke(a,a.charCodeAt(0),a.charCodeAt(1),a.charCodeAt(2));return r!==a+";"?r.replace($," or ($1)").substring(4):"("+a+")"}function Pe(e,a,r,c,s,t,i,f,n,l){for(var o,h=0,u=a;h<ye;++h)switch(o=$e[h].call(Te,e,u,r,c,s,t,i,f,n,l)){case void 0:case false:case true:case null:break;default:u=o;}if(u!==a)return u}function Qe(e,a,r,c){for(var s=a+1;s<r;++s)switch(c.charCodeAt(s)){case Z:if(e===T)if(c.charCodeAt(s-1)===T&&a+2!==s)return s+1;break;case I:if(e===Z)return s+1}return s}function Re(e){for(var a in e){var r=e[a];switch(a){case"keyframe":Be=0|r;break;case"global":Ce=0|r;break;case"cascade":ge=0|r;break;case"compress":we=0|r;break;case"semicolon":ve=0|r;break;case"preserve":me=0|r;break;case"prefix":if(Oe=null,!r)Ae=0;else if("function"!=typeof r)Ae=1;else Ae=2,Oe=r;}}return Re}function Te(a,r){if(void 0!==this&&this.constructor===Te)return e(a);var s=a,t=s.charCodeAt(0);if(t<33)t=(s=s.trim()).charCodeAt(0);if(Be>0)De=s.replace(d,t===G?"":"-");if(t=1,1===ge)Ge=s;else Ee=s;var i,f=[Ge];if(ye>0)if(void 0!==(i=Pe(ze,r,f,f,pe,be,0,0,0,0))&&"string"==typeof i)r=i;var n=He(xe,f,r,0,0);if(ye>0)if(void 0!==(i=Pe(je,n,f,f,pe,be,n.length,0,0,0))&&"string"!=typeof(n=i))t=0;return De="",Ge="",Ee="",ke=0,pe=1,be=1,we*t==0?n:n.replace(c,"").replace(g,"").replace(A,"$1").replace(C,"$1").replace(w," ")}if(Te.use=function e(a){switch(a){case void 0:case null:ye=$e.length=0;break;default:if("function"==typeof a)$e[ye++]=a;else if("object"==typeof a)for(var r=0,c=a.length;r<c;++r)e(a[r]);else qe=0|!!a;}return e},Te.set=Re,void 0!==a)Re(a);return Te});

  });

  var stylisRuleSheet = createCommonjsModule(function (module, exports) {
  (function (factory) {
  	module['exports'] = factory();
  }(function () {

  	return function (insertRule) {
  		var delimiter = '/*|*/';
  		var needle = delimiter+'}';

  		function toSheet (block) {
  			if (block)
  				try {
  					insertRule(block + '}');
  				} catch (e) {}
  		}

  		return function ruleSheet (context, content, selectors, parents, line, column, length, ns, depth, at) {
  			switch (context) {
  				// property
  				case 1:
  					// @import
  					if (depth === 0 && content.charCodeAt(0) === 64)
  						return insertRule(content+';'), ''
  					break
  				// selector
  				case 2:
  					if (ns === 0)
  						return content + delimiter
  					break
  				// at-rule
  				case 3:
  					switch (ns) {
  						// @font-face, @page
  						case 102:
  						case 112:
  							return insertRule(selectors[0]+content), ''
  						default:
  							return content + (at === 0 ? delimiter : '')
  					}
  				case -2:
  					content.split(needle).forEach(toSheet);
  			}
  		}
  	}
  }));
  });

  // 
  var stylis = new stylis_min({
    global: false,
    cascade: true,
    keyframe: false,
    prefix: true,
    compress: false,
    semicolon: false // NOTE: This means "autocomplete missing semicolons"

  }); // Wrap `insertRulePlugin to build a list of rules,
  // and then make our own plugin to return the rules. This
  // makes it easier to hook into the existing SSR architecture

  var parsingRules = []; // eslint-disable-next-line consistent-return

  var returnRulesPlugin = function returnRulesPlugin(context) {
    if (context === -2) {
      var parsedRules = parsingRules;
      parsingRules = [];
      return parsedRules;
    }
  };

  var parseRulesPlugin = stylisRuleSheet(function (rule) {
    parsingRules.push(rule);
  });

  var _componentId;

  var _selector;

  var _selectorRegexp;

  var selfReferenceReplacer = function selfReferenceReplacer(match, offset, string) {
    if ( // the first self-ref is always untouched
    offset > 0 && // there should be at least two self-refs to do a replacement (.b > .b)
    string.slice(0, offset).indexOf(_selector) !== -1 && // no consecutive self refs (.b.b); that is a precedence boost and treated differently
    string.slice(offset - _selector.length, offset) !== _selector) {
      return "." + _componentId;
    }

    return match;
  };
  /**
   * When writing a style like
   *
   * & + & {
   *   color: red;
   * }
   *
   * The second ampersand should be a reference to the static component class. stylis
   * has no knowledge of static class so we have to intelligently replace the base selector.
   */


  var selfReferenceReplacementPlugin = function selfReferenceReplacementPlugin(context, _, selectors) {
    if (context === 2 && selectors.length && selectors[0].lastIndexOf(_selector) > 0) {
      // eslint-disable-next-line no-param-reassign
      selectors[0] = selectors[0].replace(_selectorRegexp, selfReferenceReplacer);
    }
  };

  stylis.use([selfReferenceReplacementPlugin, parseRulesPlugin, returnRulesPlugin]);
  var COMMENT_REGEX = /^\s*\/\/.*$/gm;
  function stringifyRules(css, selector, prefix, componentId) {
    if (componentId === void 0) {
      componentId = '&';
    }

    var flatCSS = css.replace(COMMENT_REGEX, '');
    var cssStr = selector && prefix ? prefix + " " + selector + " { " + flatCSS + " }" : flatCSS; // stylis has no concept of state to be passed to plugins
    // but since JS is single=threaded, we can rely on that to ensure
    // these properties stay in sync with the current stylis run

    _componentId = componentId;
    _selector = selector;
    _selectorRegexp = new RegExp("\\" + _selector + "\\b", 'g');
    return stylis(prefix || !selector ? '' : selector, cssStr);
  }

  // 

  var GlobalStyle =
  /*#__PURE__*/
  function () {
    function GlobalStyle(rules, componentId) {
      this.rules = rules;
      this.componentId = componentId;
      this.isStatic = isStaticRules(rules, EMPTY_ARRAY);
      StyleSheet.registerId(componentId);
    }

    var _proto = GlobalStyle.prototype;

    _proto.createStyles = function createStyles(executionContext, styleSheet) {
      var flatCSS = flatten(this.rules, executionContext, styleSheet);
      var css = stringifyRules(flatCSS.join(''), '');
      var id = this.componentId; // NOTE: We use the id as a name as well, since these rules never change

      styleSheet.insertRules(id, id, css);
    };

    _proto.removeStyles = function removeStyles(styleSheet) {
      styleSheet.clearRules(this.componentId);
    };

    _proto.renderStyles = function renderStyles(executionContext, styleSheet) {
      // NOTE: Remove old styles, then inject the new ones
      this.removeStyles(styleSheet);
      this.createStyles(executionContext, styleSheet);
    };

    return GlobalStyle;
  }();

  var reactIs_production_min$1 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports,"__esModule",{value:!0});
  var b="function"===typeof Symbol&&Symbol.for,c=b?Symbol.for("react.element"):60103,d=b?Symbol.for("react.portal"):60106,e=b?Symbol.for("react.fragment"):60107,f=b?Symbol.for("react.strict_mode"):60108,g=b?Symbol.for("react.profiler"):60114,h=b?Symbol.for("react.provider"):60109,k=b?Symbol.for("react.context"):60110,l=b?Symbol.for("react.async_mode"):60111,m=b?Symbol.for("react.concurrent_mode"):60111,n=b?Symbol.for("react.forward_ref"):60112,p=b?Symbol.for("react.suspense"):60113,q=b?Symbol.for("react.memo"):
  60115,r=b?Symbol.for("react.lazy"):60116;function t(a){if("object"===typeof a&&null!==a){var u=a.$$typeof;switch(u){case c:switch(a=a.type,a){case l:case m:case e:case g:case f:case p:return a;default:switch(a=a&&a.$$typeof,a){case k:case n:case h:return a;default:return u}}case r:case q:case d:return u}}}function v(a){return t(a)===m}exports.typeOf=t;exports.AsyncMode=l;exports.ConcurrentMode=m;exports.ContextConsumer=k;exports.ContextProvider=h;exports.Element=c;exports.ForwardRef=n;
  exports.Fragment=e;exports.Lazy=r;exports.Memo=q;exports.Portal=d;exports.Profiler=g;exports.StrictMode=f;exports.Suspense=p;exports.isValidElementType=function(a){return "string"===typeof a||"function"===typeof a||a===e||a===m||a===g||a===f||a===p||"object"===typeof a&&null!==a&&(a.$$typeof===r||a.$$typeof===q||a.$$typeof===h||a.$$typeof===k||a.$$typeof===n)};exports.isAsyncMode=function(a){return v(a)||t(a)===l};exports.isConcurrentMode=v;exports.isContextConsumer=function(a){return t(a)===k};
  exports.isContextProvider=function(a){return t(a)===h};exports.isElement=function(a){return "object"===typeof a&&null!==a&&a.$$typeof===c};exports.isForwardRef=function(a){return t(a)===n};exports.isFragment=function(a){return t(a)===e};exports.isLazy=function(a){return t(a)===r};exports.isMemo=function(a){return t(a)===q};exports.isPortal=function(a){return t(a)===d};exports.isProfiler=function(a){return t(a)===g};exports.isStrictMode=function(a){return t(a)===f};
  exports.isSuspense=function(a){return t(a)===p};
  });

  unwrapExports(reactIs_production_min$1);
  var reactIs_production_min_1$1 = reactIs_production_min$1.typeOf;
  var reactIs_production_min_2$1 = reactIs_production_min$1.AsyncMode;
  var reactIs_production_min_3$1 = reactIs_production_min$1.ConcurrentMode;
  var reactIs_production_min_4$1 = reactIs_production_min$1.ContextConsumer;
  var reactIs_production_min_5$1 = reactIs_production_min$1.ContextProvider;
  var reactIs_production_min_6$1 = reactIs_production_min$1.Element;
  var reactIs_production_min_7$1 = reactIs_production_min$1.ForwardRef;
  var reactIs_production_min_8$1 = reactIs_production_min$1.Fragment;
  var reactIs_production_min_9$1 = reactIs_production_min$1.Lazy;
  var reactIs_production_min_10$1 = reactIs_production_min$1.Memo;
  var reactIs_production_min_11$1 = reactIs_production_min$1.Portal;
  var reactIs_production_min_12$1 = reactIs_production_min$1.Profiler;
  var reactIs_production_min_13$1 = reactIs_production_min$1.StrictMode;
  var reactIs_production_min_14$1 = reactIs_production_min$1.Suspense;
  var reactIs_production_min_15$1 = reactIs_production_min$1.isValidElementType;
  var reactIs_production_min_16$1 = reactIs_production_min$1.isAsyncMode;
  var reactIs_production_min_17$1 = reactIs_production_min$1.isConcurrentMode;
  var reactIs_production_min_18$1 = reactIs_production_min$1.isContextConsumer;
  var reactIs_production_min_19$1 = reactIs_production_min$1.isContextProvider;
  var reactIs_production_min_20$1 = reactIs_production_min$1.isElement;
  var reactIs_production_min_21$1 = reactIs_production_min$1.isForwardRef;
  var reactIs_production_min_22$1 = reactIs_production_min$1.isFragment;
  var reactIs_production_min_23$1 = reactIs_production_min$1.isLazy;
  var reactIs_production_min_24$1 = reactIs_production_min$1.isMemo;
  var reactIs_production_min_25$1 = reactIs_production_min$1.isPortal;
  var reactIs_production_min_26$1 = reactIs_production_min$1.isProfiler;
  var reactIs_production_min_27$1 = reactIs_production_min$1.isStrictMode;
  var reactIs_production_min_28$1 = reactIs_production_min$1.isSuspense;

  var reactIs_development$1 = createCommonjsModule(function (module, exports) {



  {
    (function() {

  Object.defineProperty(exports, '__esModule', { value: true });

  // The Symbol used to tag the ReactElement-like types. If there is no native Symbol
  // nor polyfill, then a plain number is used for performance.
  var hasSymbol = typeof Symbol === 'function' && Symbol.for;

  var REACT_ELEMENT_TYPE = hasSymbol ? Symbol.for('react.element') : 0xeac7;
  var REACT_PORTAL_TYPE = hasSymbol ? Symbol.for('react.portal') : 0xeaca;
  var REACT_FRAGMENT_TYPE = hasSymbol ? Symbol.for('react.fragment') : 0xeacb;
  var REACT_STRICT_MODE_TYPE = hasSymbol ? Symbol.for('react.strict_mode') : 0xeacc;
  var REACT_PROFILER_TYPE = hasSymbol ? Symbol.for('react.profiler') : 0xead2;
  var REACT_PROVIDER_TYPE = hasSymbol ? Symbol.for('react.provider') : 0xeacd;
  var REACT_CONTEXT_TYPE = hasSymbol ? Symbol.for('react.context') : 0xeace;
  var REACT_ASYNC_MODE_TYPE = hasSymbol ? Symbol.for('react.async_mode') : 0xeacf;
  var REACT_CONCURRENT_MODE_TYPE = hasSymbol ? Symbol.for('react.concurrent_mode') : 0xeacf;
  var REACT_FORWARD_REF_TYPE = hasSymbol ? Symbol.for('react.forward_ref') : 0xead0;
  var REACT_SUSPENSE_TYPE = hasSymbol ? Symbol.for('react.suspense') : 0xead1;
  var REACT_MEMO_TYPE = hasSymbol ? Symbol.for('react.memo') : 0xead3;
  var REACT_LAZY_TYPE = hasSymbol ? Symbol.for('react.lazy') : 0xead4;

  function isValidElementType(type) {
    return typeof type === 'string' || typeof type === 'function' ||
    // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
    type === REACT_FRAGMENT_TYPE || type === REACT_CONCURRENT_MODE_TYPE || type === REACT_PROFILER_TYPE || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || typeof type === 'object' && type !== null && (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE);
  }

  /**
   * Forked from fbjs/warning:
   * https://github.com/facebook/fbjs/blob/e66ba20ad5be433eb54423f2b097d829324d9de6/packages/fbjs/src/__forks__/warning.js
   *
   * Only change is we use console.warn instead of console.error,
   * and do nothing when 'console' is not supported.
   * This really simplifies the code.
   * ---
   * Similar to invariant but only logs a warning if the condition is not met.
   * This can be used to log issues in development environments in critical
   * paths. Removing the logging code for production environments will keep the
   * same logic and follow the same code paths.
   */

  var lowPriorityWarning = function () {};

  {
    var printWarning = function (format) {
      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      var argIndex = 0;
      var message = 'Warning: ' + format.replace(/%s/g, function () {
        return args[argIndex++];
      });
      if (typeof console !== 'undefined') {
        console.warn(message);
      }
      try {
        // --- Welcome to debugging React ---
        // This error was thrown as a convenience so that you can use this stack
        // to find the callsite that caused this warning to fire.
        throw new Error(message);
      } catch (x) {}
    };

    lowPriorityWarning = function (condition, format) {
      if (format === undefined) {
        throw new Error('`lowPriorityWarning(condition, format, ...args)` requires a warning ' + 'message argument');
      }
      if (!condition) {
        for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
          args[_key2 - 2] = arguments[_key2];
        }

        printWarning.apply(undefined, [format].concat(args));
      }
    };
  }

  var lowPriorityWarning$1 = lowPriorityWarning;

  function typeOf(object) {
    if (typeof object === 'object' && object !== null) {
      var $$typeof = object.$$typeof;
      switch ($$typeof) {
        case REACT_ELEMENT_TYPE:
          var type = object.type;

          switch (type) {
            case REACT_ASYNC_MODE_TYPE:
            case REACT_CONCURRENT_MODE_TYPE:
            case REACT_FRAGMENT_TYPE:
            case REACT_PROFILER_TYPE:
            case REACT_STRICT_MODE_TYPE:
            case REACT_SUSPENSE_TYPE:
              return type;
            default:
              var $$typeofType = type && type.$$typeof;

              switch ($$typeofType) {
                case REACT_CONTEXT_TYPE:
                case REACT_FORWARD_REF_TYPE:
                case REACT_PROVIDER_TYPE:
                  return $$typeofType;
                default:
                  return $$typeof;
              }
          }
        case REACT_LAZY_TYPE:
        case REACT_MEMO_TYPE:
        case REACT_PORTAL_TYPE:
          return $$typeof;
      }
    }

    return undefined;
  }

  // AsyncMode is deprecated along with isAsyncMode
  var AsyncMode = REACT_ASYNC_MODE_TYPE;
  var ConcurrentMode = REACT_CONCURRENT_MODE_TYPE;
  var ContextConsumer = REACT_CONTEXT_TYPE;
  var ContextProvider = REACT_PROVIDER_TYPE;
  var Element = REACT_ELEMENT_TYPE;
  var ForwardRef = REACT_FORWARD_REF_TYPE;
  var Fragment = REACT_FRAGMENT_TYPE;
  var Lazy = REACT_LAZY_TYPE;
  var Memo = REACT_MEMO_TYPE;
  var Portal = REACT_PORTAL_TYPE;
  var Profiler = REACT_PROFILER_TYPE;
  var StrictMode = REACT_STRICT_MODE_TYPE;
  var Suspense = REACT_SUSPENSE_TYPE;

  var hasWarnedAboutDeprecatedIsAsyncMode = false;

  // AsyncMode should be deprecated
  function isAsyncMode(object) {
    {
      if (!hasWarnedAboutDeprecatedIsAsyncMode) {
        hasWarnedAboutDeprecatedIsAsyncMode = true;
        lowPriorityWarning$1(false, 'The ReactIs.isAsyncMode() alias has been deprecated, ' + 'and will be removed in React 17+. Update your code to use ' + 'ReactIs.isConcurrentMode() instead. It has the exact same API.');
      }
    }
    return isConcurrentMode(object) || typeOf(object) === REACT_ASYNC_MODE_TYPE;
  }
  function isConcurrentMode(object) {
    return typeOf(object) === REACT_CONCURRENT_MODE_TYPE;
  }
  function isContextConsumer(object) {
    return typeOf(object) === REACT_CONTEXT_TYPE;
  }
  function isContextProvider(object) {
    return typeOf(object) === REACT_PROVIDER_TYPE;
  }
  function isElement(object) {
    return typeof object === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
  }
  function isForwardRef(object) {
    return typeOf(object) === REACT_FORWARD_REF_TYPE;
  }
  function isFragment(object) {
    return typeOf(object) === REACT_FRAGMENT_TYPE;
  }
  function isLazy(object) {
    return typeOf(object) === REACT_LAZY_TYPE;
  }
  function isMemo(object) {
    return typeOf(object) === REACT_MEMO_TYPE;
  }
  function isPortal(object) {
    return typeOf(object) === REACT_PORTAL_TYPE;
  }
  function isProfiler(object) {
    return typeOf(object) === REACT_PROFILER_TYPE;
  }
  function isStrictMode(object) {
    return typeOf(object) === REACT_STRICT_MODE_TYPE;
  }
  function isSuspense(object) {
    return typeOf(object) === REACT_SUSPENSE_TYPE;
  }

  exports.typeOf = typeOf;
  exports.AsyncMode = AsyncMode;
  exports.ConcurrentMode = ConcurrentMode;
  exports.ContextConsumer = ContextConsumer;
  exports.ContextProvider = ContextProvider;
  exports.Element = Element;
  exports.ForwardRef = ForwardRef;
  exports.Fragment = Fragment;
  exports.Lazy = Lazy;
  exports.Memo = Memo;
  exports.Portal = Portal;
  exports.Profiler = Profiler;
  exports.StrictMode = StrictMode;
  exports.Suspense = Suspense;
  exports.isValidElementType = isValidElementType;
  exports.isAsyncMode = isAsyncMode;
  exports.isConcurrentMode = isConcurrentMode;
  exports.isContextConsumer = isContextConsumer;
  exports.isContextProvider = isContextProvider;
  exports.isElement = isElement;
  exports.isForwardRef = isForwardRef;
  exports.isFragment = isFragment;
  exports.isLazy = isLazy;
  exports.isMemo = isMemo;
  exports.isPortal = isPortal;
  exports.isProfiler = isProfiler;
  exports.isStrictMode = isStrictMode;
  exports.isSuspense = isSuspense;
    })();
  }
  });

  unwrapExports(reactIs_development$1);
  var reactIs_development_1$1 = reactIs_development$1.typeOf;
  var reactIs_development_2$1 = reactIs_development$1.AsyncMode;
  var reactIs_development_3$1 = reactIs_development$1.ConcurrentMode;
  var reactIs_development_4$1 = reactIs_development$1.ContextConsumer;
  var reactIs_development_5$1 = reactIs_development$1.ContextProvider;
  var reactIs_development_6$1 = reactIs_development$1.Element;
  var reactIs_development_7$1 = reactIs_development$1.ForwardRef;
  var reactIs_development_8$1 = reactIs_development$1.Fragment;
  var reactIs_development_9$1 = reactIs_development$1.Lazy;
  var reactIs_development_10$1 = reactIs_development$1.Memo;
  var reactIs_development_11$1 = reactIs_development$1.Portal;
  var reactIs_development_12$1 = reactIs_development$1.Profiler;
  var reactIs_development_13$1 = reactIs_development$1.StrictMode;
  var reactIs_development_14$1 = reactIs_development$1.Suspense;
  var reactIs_development_15$1 = reactIs_development$1.isValidElementType;
  var reactIs_development_16$1 = reactIs_development$1.isAsyncMode;
  var reactIs_development_17$1 = reactIs_development$1.isConcurrentMode;
  var reactIs_development_18$1 = reactIs_development$1.isContextConsumer;
  var reactIs_development_19$1 = reactIs_development$1.isContextProvider;
  var reactIs_development_20$1 = reactIs_development$1.isElement;
  var reactIs_development_21$1 = reactIs_development$1.isForwardRef;
  var reactIs_development_22$1 = reactIs_development$1.isFragment;
  var reactIs_development_23$1 = reactIs_development$1.isLazy;
  var reactIs_development_24$1 = reactIs_development$1.isMemo;
  var reactIs_development_25$1 = reactIs_development$1.isPortal;
  var reactIs_development_26$1 = reactIs_development$1.isProfiler;
  var reactIs_development_27$1 = reactIs_development$1.isStrictMode;
  var reactIs_development_28$1 = reactIs_development$1.isSuspense;

  var reactIs$1 = createCommonjsModule(function (module) {

  {
    module.exports = reactIs_development$1;
  }
  });

  /*
  object-assign
  (c) Sindre Sorhus
  @license MIT
  */
  /* eslint-disable no-unused-vars */
  var getOwnPropertySymbols = Object.getOwnPropertySymbols;
  var hasOwnProperty = Object.prototype.hasOwnProperty;
  var propIsEnumerable = Object.prototype.propertyIsEnumerable;

  function toObject(val) {
  	if (val === null || val === undefined) {
  		throw new TypeError('Object.assign cannot be called with null or undefined');
  	}

  	return Object(val);
  }

  function shouldUseNative() {
  	try {
  		if (!Object.assign) {
  			return false;
  		}

  		// Detect buggy property enumeration order in older V8 versions.

  		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
  		var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
  		test1[5] = 'de';
  		if (Object.getOwnPropertyNames(test1)[0] === '5') {
  			return false;
  		}

  		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
  		var test2 = {};
  		for (var i = 0; i < 10; i++) {
  			test2['_' + String.fromCharCode(i)] = i;
  		}
  		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
  			return test2[n];
  		});
  		if (order2.join('') !== '0123456789') {
  			return false;
  		}

  		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
  		var test3 = {};
  		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
  			test3[letter] = letter;
  		});
  		if (Object.keys(Object.assign({}, test3)).join('') !==
  				'abcdefghijklmnopqrst') {
  			return false;
  		}

  		return true;
  	} catch (err) {
  		// We don't expect any of the above to throw, but better to be safe.
  		return false;
  	}
  }

  var objectAssign = shouldUseNative() ? Object.assign : function (target, source) {
  	var from;
  	var to = toObject(target);
  	var symbols;

  	for (var s = 1; s < arguments.length; s++) {
  		from = Object(arguments[s]);

  		for (var key in from) {
  			if (hasOwnProperty.call(from, key)) {
  				to[key] = from[key];
  			}
  		}

  		if (getOwnPropertySymbols) {
  			symbols = getOwnPropertySymbols(from);
  			for (var i = 0; i < symbols.length; i++) {
  				if (propIsEnumerable.call(from, symbols[i])) {
  					to[symbols[i]] = from[symbols[i]];
  				}
  			}
  		}
  	}

  	return to;
  };

  /**
   * Copyright (c) 2013-present, Facebook, Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */

  var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

  var ReactPropTypesSecret_1 = ReactPropTypesSecret;

  var printWarning = function() {};

  {
    var ReactPropTypesSecret$1 = ReactPropTypesSecret_1;
    var loggedTypeFailures = {};
    var has = Function.call.bind(Object.prototype.hasOwnProperty);

    printWarning = function(text) {
      var message = 'Warning: ' + text;
      if (typeof console !== 'undefined') {
        console.error(message);
      }
      try {
        // --- Welcome to debugging React ---
        // This error was thrown as a convenience so that you can use this stack
        // to find the callsite that caused this warning to fire.
        throw new Error(message);
      } catch (x) {}
    };
  }

  /**
   * Assert that the values match with the type specs.
   * Error messages are memorized and will only be shown once.
   *
   * @param {object} typeSpecs Map of name to a ReactPropType
   * @param {object} values Runtime values that need to be type-checked
   * @param {string} location e.g. "prop", "context", "child context"
   * @param {string} componentName Name of the component for error messages.
   * @param {?Function} getStack Returns the component stack.
   * @private
   */
  function checkPropTypes(typeSpecs, values, location, componentName, getStack) {
    {
      for (var typeSpecName in typeSpecs) {
        if (has(typeSpecs, typeSpecName)) {
          var error;
          // Prop type validation may throw. In case they do, we don't want to
          // fail the render phase where it didn't fail before. So we log it.
          // After these have been cleaned up, we'll let them throw.
          try {
            // This is intentionally an invariant that gets caught. It's the same
            // behavior as without this statement except with a better message.
            if (typeof typeSpecs[typeSpecName] !== 'function') {
              var err = Error(
                (componentName || 'React class') + ': ' + location + ' type `' + typeSpecName + '` is invalid; ' +
                'it must be a function, usually from the `prop-types` package, but received `' + typeof typeSpecs[typeSpecName] + '`.'
              );
              err.name = 'Invariant Violation';
              throw err;
            }
            error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret$1);
          } catch (ex) {
            error = ex;
          }
          if (error && !(error instanceof Error)) {
            printWarning(
              (componentName || 'React class') + ': type specification of ' +
              location + ' `' + typeSpecName + '` is invalid; the type checker ' +
              'function must return `null` or an `Error` but returned a ' + typeof error + '. ' +
              'You may have forgotten to pass an argument to the type checker ' +
              'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' +
              'shape all require an argument).'
            );
          }
          if (error instanceof Error && !(error.message in loggedTypeFailures)) {
            // Only monitor this failure once because there tends to be a lot of the
            // same error.
            loggedTypeFailures[error.message] = true;

            var stack = getStack ? getStack() : '';

            printWarning(
              'Failed ' + location + ' type: ' + error.message + (stack != null ? stack : '')
            );
          }
        }
      }
    }
  }

  /**
   * Resets warning cache when testing.
   *
   * @private
   */
  checkPropTypes.resetWarningCache = function() {
    {
      loggedTypeFailures = {};
    }
  };

  var checkPropTypes_1 = checkPropTypes;

  var has$1 = Function.call.bind(Object.prototype.hasOwnProperty);
  var printWarning$1 = function() {};

  {
    printWarning$1 = function(text) {
      var message = 'Warning: ' + text;
      if (typeof console !== 'undefined') {
        console.error(message);
      }
      try {
        // --- Welcome to debugging React ---
        // This error was thrown as a convenience so that you can use this stack
        // to find the callsite that caused this warning to fire.
        throw new Error(message);
      } catch (x) {}
    };
  }

  function emptyFunctionThatReturnsNull() {
    return null;
  }

  var factoryWithTypeCheckers = function(isValidElement, throwOnDirectAccess) {
    /* global Symbol */
    var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
    var FAUX_ITERATOR_SYMBOL = '@@iterator'; // Before Symbol spec.

    /**
     * Returns the iterator method function contained on the iterable object.
     *
     * Be sure to invoke the function with the iterable as context:
     *
     *     var iteratorFn = getIteratorFn(myIterable);
     *     if (iteratorFn) {
     *       var iterator = iteratorFn.call(myIterable);
     *       ...
     *     }
     *
     * @param {?object} maybeIterable
     * @return {?function}
     */
    function getIteratorFn(maybeIterable) {
      var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
      if (typeof iteratorFn === 'function') {
        return iteratorFn;
      }
    }

    /**
     * Collection of methods that allow declaration and validation of props that are
     * supplied to React components. Example usage:
     *
     *   var Props = require('ReactPropTypes');
     *   var MyArticle = React.createClass({
     *     propTypes: {
     *       // An optional string prop named "description".
     *       description: Props.string,
     *
     *       // A required enum prop named "category".
     *       category: Props.oneOf(['News','Photos']).isRequired,
     *
     *       // A prop named "dialog" that requires an instance of Dialog.
     *       dialog: Props.instanceOf(Dialog).isRequired
     *     },
     *     render: function() { ... }
     *   });
     *
     * A more formal specification of how these methods are used:
     *
     *   type := array|bool|func|object|number|string|oneOf([...])|instanceOf(...)
     *   decl := ReactPropTypes.{type}(.isRequired)?
     *
     * Each and every declaration produces a function with the same signature. This
     * allows the creation of custom validation functions. For example:
     *
     *  var MyLink = React.createClass({
     *    propTypes: {
     *      // An optional string or URI prop named "href".
     *      href: function(props, propName, componentName) {
     *        var propValue = props[propName];
     *        if (propValue != null && typeof propValue !== 'string' &&
     *            !(propValue instanceof URI)) {
     *          return new Error(
     *            'Expected a string or an URI for ' + propName + ' in ' +
     *            componentName
     *          );
     *        }
     *      }
     *    },
     *    render: function() {...}
     *  });
     *
     * @internal
     */

    var ANONYMOUS = '<<anonymous>>';

    // Important!
    // Keep this list in sync with production version in `./factoryWithThrowingShims.js`.
    var ReactPropTypes = {
      array: createPrimitiveTypeChecker('array'),
      bool: createPrimitiveTypeChecker('boolean'),
      func: createPrimitiveTypeChecker('function'),
      number: createPrimitiveTypeChecker('number'),
      object: createPrimitiveTypeChecker('object'),
      string: createPrimitiveTypeChecker('string'),
      symbol: createPrimitiveTypeChecker('symbol'),

      any: createAnyTypeChecker(),
      arrayOf: createArrayOfTypeChecker,
      element: createElementTypeChecker(),
      elementType: createElementTypeTypeChecker(),
      instanceOf: createInstanceTypeChecker,
      node: createNodeChecker(),
      objectOf: createObjectOfTypeChecker,
      oneOf: createEnumTypeChecker,
      oneOfType: createUnionTypeChecker,
      shape: createShapeTypeChecker,
      exact: createStrictShapeTypeChecker,
    };

    /**
     * inlined Object.is polyfill to avoid requiring consumers ship their own
     * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
     */
    /*eslint-disable no-self-compare*/
    function is(x, y) {
      // SameValue algorithm
      if (x === y) {
        // Steps 1-5, 7-10
        // Steps 6.b-6.e: +0 != -0
        return x !== 0 || 1 / x === 1 / y;
      } else {
        // Step 6.a: NaN == NaN
        return x !== x && y !== y;
      }
    }
    /*eslint-enable no-self-compare*/

    /**
     * We use an Error-like object for backward compatibility as people may call
     * PropTypes directly and inspect their output. However, we don't use real
     * Errors anymore. We don't inspect their stack anyway, and creating them
     * is prohibitively expensive if they are created too often, such as what
     * happens in oneOfType() for any type before the one that matched.
     */
    function PropTypeError(message) {
      this.message = message;
      this.stack = '';
    }
    // Make `instanceof Error` still work for returned errors.
    PropTypeError.prototype = Error.prototype;

    function createChainableTypeChecker(validate) {
      {
        var manualPropTypeCallCache = {};
        var manualPropTypeWarningCount = 0;
      }
      function checkType(isRequired, props, propName, componentName, location, propFullName, secret) {
        componentName = componentName || ANONYMOUS;
        propFullName = propFullName || propName;

        if (secret !== ReactPropTypesSecret_1) {
          if (throwOnDirectAccess) {
            // New behavior only for users of `prop-types` package
            var err = new Error(
              'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
              'Use `PropTypes.checkPropTypes()` to call them. ' +
              'Read more at http://fb.me/use-check-prop-types'
            );
            err.name = 'Invariant Violation';
            throw err;
          } else if (typeof console !== 'undefined') {
            // Old behavior for people using React.PropTypes
            var cacheKey = componentName + ':' + propName;
            if (
              !manualPropTypeCallCache[cacheKey] &&
              // Avoid spamming the console because they are often not actionable except for lib authors
              manualPropTypeWarningCount < 3
            ) {
              printWarning$1(
                'You are manually calling a React.PropTypes validation ' +
                'function for the `' + propFullName + '` prop on `' + componentName  + '`. This is deprecated ' +
                'and will throw in the standalone `prop-types` package. ' +
                'You may be seeing this warning due to a third-party PropTypes ' +
                'library. See https://fb.me/react-warning-dont-call-proptypes ' + 'for details.'
              );
              manualPropTypeCallCache[cacheKey] = true;
              manualPropTypeWarningCount++;
            }
          }
        }
        if (props[propName] == null) {
          if (isRequired) {
            if (props[propName] === null) {
              return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required ' + ('in `' + componentName + '`, but its value is `null`.'));
            }
            return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required in ' + ('`' + componentName + '`, but its value is `undefined`.'));
          }
          return null;
        } else {
          return validate(props, propName, componentName, location, propFullName);
        }
      }

      var chainedCheckType = checkType.bind(null, false);
      chainedCheckType.isRequired = checkType.bind(null, true);

      return chainedCheckType;
    }

    function createPrimitiveTypeChecker(expectedType) {
      function validate(props, propName, componentName, location, propFullName, secret) {
        var propValue = props[propName];
        var propType = getPropType(propValue);
        if (propType !== expectedType) {
          // `propValue` being instance of, say, date/regexp, pass the 'object'
          // check, but we can offer a more precise error message here rather than
          // 'of type `object`'.
          var preciseType = getPreciseType(propValue);

          return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + preciseType + '` supplied to `' + componentName + '`, expected ') + ('`' + expectedType + '`.'));
        }
        return null;
      }
      return createChainableTypeChecker(validate);
    }

    function createAnyTypeChecker() {
      return createChainableTypeChecker(emptyFunctionThatReturnsNull);
    }

    function createArrayOfTypeChecker(typeChecker) {
      function validate(props, propName, componentName, location, propFullName) {
        if (typeof typeChecker !== 'function') {
          return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside arrayOf.');
        }
        var propValue = props[propName];
        if (!Array.isArray(propValue)) {
          var propType = getPropType(propValue);
          return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an array.'));
        }
        for (var i = 0; i < propValue.length; i++) {
          var error = typeChecker(propValue, i, componentName, location, propFullName + '[' + i + ']', ReactPropTypesSecret_1);
          if (error instanceof Error) {
            return error;
          }
        }
        return null;
      }
      return createChainableTypeChecker(validate);
    }

    function createElementTypeChecker() {
      function validate(props, propName, componentName, location, propFullName) {
        var propValue = props[propName];
        if (!isValidElement(propValue)) {
          var propType = getPropType(propValue);
          return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement.'));
        }
        return null;
      }
      return createChainableTypeChecker(validate);
    }

    function createElementTypeTypeChecker() {
      function validate(props, propName, componentName, location, propFullName) {
        var propValue = props[propName];
        if (!reactIs$1.isValidElementType(propValue)) {
          var propType = getPropType(propValue);
          return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement type.'));
        }
        return null;
      }
      return createChainableTypeChecker(validate);
    }

    function createInstanceTypeChecker(expectedClass) {
      function validate(props, propName, componentName, location, propFullName) {
        if (!(props[propName] instanceof expectedClass)) {
          var expectedClassName = expectedClass.name || ANONYMOUS;
          var actualClassName = getClassName(props[propName]);
          return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + actualClassName + '` supplied to `' + componentName + '`, expected ') + ('instance of `' + expectedClassName + '`.'));
        }
        return null;
      }
      return createChainableTypeChecker(validate);
    }

    function createEnumTypeChecker(expectedValues) {
      if (!Array.isArray(expectedValues)) {
        {
          if (arguments.length > 1) {
            printWarning$1(
              'Invalid arguments supplied to oneOf, expected an array, got ' + arguments.length + ' arguments. ' +
              'A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z]).'
            );
          } else {
            printWarning$1('Invalid argument supplied to oneOf, expected an array.');
          }
        }
        return emptyFunctionThatReturnsNull;
      }

      function validate(props, propName, componentName, location, propFullName) {
        var propValue = props[propName];
        for (var i = 0; i < expectedValues.length; i++) {
          if (is(propValue, expectedValues[i])) {
            return null;
          }
        }

        var valuesString = JSON.stringify(expectedValues, function replacer(key, value) {
          var type = getPreciseType(value);
          if (type === 'symbol') {
            return String(value);
          }
          return value;
        });
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of value `' + String(propValue) + '` ' + ('supplied to `' + componentName + '`, expected one of ' + valuesString + '.'));
      }
      return createChainableTypeChecker(validate);
    }

    function createObjectOfTypeChecker(typeChecker) {
      function validate(props, propName, componentName, location, propFullName) {
        if (typeof typeChecker !== 'function') {
          return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside objectOf.');
        }
        var propValue = props[propName];
        var propType = getPropType(propValue);
        if (propType !== 'object') {
          return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an object.'));
        }
        for (var key in propValue) {
          if (has$1(propValue, key)) {
            var error = typeChecker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret_1);
            if (error instanceof Error) {
              return error;
            }
          }
        }
        return null;
      }
      return createChainableTypeChecker(validate);
    }

    function createUnionTypeChecker(arrayOfTypeCheckers) {
      if (!Array.isArray(arrayOfTypeCheckers)) {
        printWarning$1('Invalid argument supplied to oneOfType, expected an instance of array.');
        return emptyFunctionThatReturnsNull;
      }

      for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
        var checker = arrayOfTypeCheckers[i];
        if (typeof checker !== 'function') {
          printWarning$1(
            'Invalid argument supplied to oneOfType. Expected an array of check functions, but ' +
            'received ' + getPostfixForTypeWarning(checker) + ' at index ' + i + '.'
          );
          return emptyFunctionThatReturnsNull;
        }
      }

      function validate(props, propName, componentName, location, propFullName) {
        for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
          var checker = arrayOfTypeCheckers[i];
          if (checker(props, propName, componentName, location, propFullName, ReactPropTypesSecret_1) == null) {
            return null;
          }
        }

        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`.'));
      }
      return createChainableTypeChecker(validate);
    }

    function createNodeChecker() {
      function validate(props, propName, componentName, location, propFullName) {
        if (!isNode(props[propName])) {
          return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`, expected a ReactNode.'));
        }
        return null;
      }
      return createChainableTypeChecker(validate);
    }

    function createShapeTypeChecker(shapeTypes) {
      function validate(props, propName, componentName, location, propFullName) {
        var propValue = props[propName];
        var propType = getPropType(propValue);
        if (propType !== 'object') {
          return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
        }
        for (var key in shapeTypes) {
          var checker = shapeTypes[key];
          if (!checker) {
            continue;
          }
          var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret_1);
          if (error) {
            return error;
          }
        }
        return null;
      }
      return createChainableTypeChecker(validate);
    }

    function createStrictShapeTypeChecker(shapeTypes) {
      function validate(props, propName, componentName, location, propFullName) {
        var propValue = props[propName];
        var propType = getPropType(propValue);
        if (propType !== 'object') {
          return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
        }
        // We need to check all keys in case some are required but missing from
        // props.
        var allKeys = objectAssign({}, props[propName], shapeTypes);
        for (var key in allKeys) {
          var checker = shapeTypes[key];
          if (!checker) {
            return new PropTypeError(
              'Invalid ' + location + ' `' + propFullName + '` key `' + key + '` supplied to `' + componentName + '`.' +
              '\nBad object: ' + JSON.stringify(props[propName], null, '  ') +
              '\nValid keys: ' +  JSON.stringify(Object.keys(shapeTypes), null, '  ')
            );
          }
          var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret_1);
          if (error) {
            return error;
          }
        }
        return null;
      }

      return createChainableTypeChecker(validate);
    }

    function isNode(propValue) {
      switch (typeof propValue) {
        case 'number':
        case 'string':
        case 'undefined':
          return true;
        case 'boolean':
          return !propValue;
        case 'object':
          if (Array.isArray(propValue)) {
            return propValue.every(isNode);
          }
          if (propValue === null || isValidElement(propValue)) {
            return true;
          }

          var iteratorFn = getIteratorFn(propValue);
          if (iteratorFn) {
            var iterator = iteratorFn.call(propValue);
            var step;
            if (iteratorFn !== propValue.entries) {
              while (!(step = iterator.next()).done) {
                if (!isNode(step.value)) {
                  return false;
                }
              }
            } else {
              // Iterator will provide entry [k,v] tuples rather than values.
              while (!(step = iterator.next()).done) {
                var entry = step.value;
                if (entry) {
                  if (!isNode(entry[1])) {
                    return false;
                  }
                }
              }
            }
          } else {
            return false;
          }

          return true;
        default:
          return false;
      }
    }

    function isSymbol(propType, propValue) {
      // Native Symbol.
      if (propType === 'symbol') {
        return true;
      }

      // falsy value can't be a Symbol
      if (!propValue) {
        return false;
      }

      // 19.4.3.5 Symbol.prototype[@@toStringTag] === 'Symbol'
      if (propValue['@@toStringTag'] === 'Symbol') {
        return true;
      }

      // Fallback for non-spec compliant Symbols which are polyfilled.
      if (typeof Symbol === 'function' && propValue instanceof Symbol) {
        return true;
      }

      return false;
    }

    // Equivalent of `typeof` but with special handling for array and regexp.
    function getPropType(propValue) {
      var propType = typeof propValue;
      if (Array.isArray(propValue)) {
        return 'array';
      }
      if (propValue instanceof RegExp) {
        // Old webkits (at least until Android 4.0) return 'function' rather than
        // 'object' for typeof a RegExp. We'll normalize this here so that /bla/
        // passes PropTypes.object.
        return 'object';
      }
      if (isSymbol(propType, propValue)) {
        return 'symbol';
      }
      return propType;
    }

    // This handles more types than `getPropType`. Only used for error messages.
    // See `createPrimitiveTypeChecker`.
    function getPreciseType(propValue) {
      if (typeof propValue === 'undefined' || propValue === null) {
        return '' + propValue;
      }
      var propType = getPropType(propValue);
      if (propType === 'object') {
        if (propValue instanceof Date) {
          return 'date';
        } else if (propValue instanceof RegExp) {
          return 'regexp';
        }
      }
      return propType;
    }

    // Returns a string that is postfixed to a warning about an invalid type.
    // For example, "undefined" or "of type array"
    function getPostfixForTypeWarning(value) {
      var type = getPreciseType(value);
      switch (type) {
        case 'array':
        case 'object':
          return 'an ' + type;
        case 'boolean':
        case 'date':
        case 'regexp':
          return 'a ' + type;
        default:
          return type;
      }
    }

    // Returns class name of the object, if any.
    function getClassName(propValue) {
      if (!propValue.constructor || !propValue.constructor.name) {
        return ANONYMOUS;
      }
      return propValue.constructor.name;
    }

    ReactPropTypes.checkPropTypes = checkPropTypes_1;
    ReactPropTypes.resetWarningCache = checkPropTypes_1.resetWarningCache;
    ReactPropTypes.PropTypes = ReactPropTypes;

    return ReactPropTypes;
  };

  var propTypes = createCommonjsModule(function (module) {
  /**
   * Copyright (c) 2013-present, Facebook, Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */

  {
    var ReactIs = reactIs$1;

    // By explicitly using `prop-types` you are opting into new development behavior.
    // http://fb.me/prop-types-in-prod
    var throwOnDirectAccess = true;
    module.exports = factoryWithTypeCheckers(ReactIs.isElement, throwOnDirectAccess);
  }
  });

  // 
  var StyleSheetContext = React__default.createContext();
  var StyleSheetConsumer = StyleSheetContext.Consumer;
  var masterSheet = new StyleSheet(false);
  function useStyleSheet() {
    var fromContext = React.useContext(StyleSheetContext);
    return fromContext !== undefined ? fromContext : masterSheet;
  }

  function useStyleSheetProvider(sheet, target) {
    return React.useMemo(function () {
      if (sheet) {
        return sheet;
      } else if (target) {
        return new StyleSheet(false, target);
      } else {
        throw new StyledComponentsError(4);
      }
    }, [sheet, target]);
  }

  function StyleSheetManager(props) {
    var sheet = useStyleSheetProvider(props.sheet, props.target);
    return React__default.createElement(StyleSheetContext.Provider, {
      value: sheet
    }, React__default.Children.only(props.children));
  }
  StyleSheetManager.propTypes = {
    sheet: propTypes.instanceOf(StyleSheet),
    target: propTypes.shape({
      appendChild: propTypes.func.isRequired
    })
  };

  // 
  var determineTheme = (function (props, fallbackTheme, defaultProps) {
    if (defaultProps === void 0) {
      defaultProps = EMPTY_OBJECT;
    }

    // Props should take precedence over ThemeProvider, which should take precedence over
    // defaultProps, but React automatically puts defaultProps on props.

    /* eslint-disable react/prop-types, flowtype-errors/show-errors */
    var isDefaultTheme = defaultProps ? props.theme === defaultProps.theme : false;
    var theme = props.theme && !isDefaultTheme ? props.theme : fallbackTheme || defaultProps.theme;
    /* eslint-enable */

    return theme;
  });

  var ThemeContext = React__default.createContext();
  var ThemeConsumer = ThemeContext.Consumer;

  function useMergedTheme(theme, outerTheme) {
    if (isFunction(theme)) {
      var mergedTheme = theme(outerTheme);

      if (mergedTheme === null || Array.isArray(mergedTheme) || typeof mergedTheme !== 'object') {
        throw new StyledComponentsError(7);
      }

      return mergedTheme;
    }

    if (theme === null || Array.isArray(theme) || typeof theme !== 'object') {
      throw new StyledComponentsError(8);
    }

    return outerTheme ? _extends({}, outerTheme, theme) : theme;
  }
  /**
   * Provide a theme to an entire react component tree via context
   */


  function ThemeProvider(props) {
    var outerTheme = React.useContext(ThemeContext); // NOTE: can't really memoize with props.theme as that'd cause incorrect memoization when it's a function

    var themeContext = useMergedTheme(props.theme, outerTheme);

    if (!props.children) {
      return null;
    }

    return React__default.createElement(ThemeContext.Provider, {
      value: themeContext
    }, React__default.Children.only(props.children));
  }

  // 

  /* eslint-disable no-bitwise */

  /* This is the "capacity" of our alphabet i.e. 2x26 for all letters plus their capitalised
   * counterparts */
  var charsLength = 52;
  /* start at 75 for 'a' until 'z' (25) and then start at 65 for capitalised letters */

  var getAlphabeticChar = function getAlphabeticChar(code) {
    return String.fromCharCode(code + (code > 25 ? 39 : 97));
  };
  /* input a number, usually a hash and convert it to base-52 */


  function generateAlphabeticName(code) {
    var name = '';
    var x;
    /* get a char and divide by alphabet-length */

    for (x = Math.abs(code); x > charsLength; x = x / charsLength | 0) {
      name = getAlphabeticChar(x % charsLength) + name;
    }

    return getAlphabeticChar(x % charsLength) + name;
  }

  // 
  var hash = function hash(x) {
    /* prettier-ignore */
    for (var h = 5381 | 0, i = 0, l = x.length | 0; i < l; i++) {
      h = (h << 5) + h + x.charCodeAt(i);
    }

    return h >>> 0;
  };

  var hasher = function hasher(str) {
    return generateAlphabeticName(hash(str));
  };

  if (IS_BROWSER) {
    window.scCGSHMRCache = {};
  }

  function createGlobalStyle(strings) {
    for (var _len = arguments.length, interpolations = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      interpolations[_key - 1] = arguments[_key];
    }

    var rules = css.apply(void 0, [strings].concat(interpolations));
    var styledComponentId = "sc-global-" + hasher(JSON.stringify(rules));
    var globalStyle = new GlobalStyle(rules, styledComponentId);

    function GlobalStyleComponent(props) {
      var styleSheet = useStyleSheet();
      var theme = React.useContext(ThemeContext);

      if (React__default.Children.count(props.children)) {
        // eslint-disable-next-line no-console
        console.warn("The global style component " + styledComponentId + " was given child JSX. createGlobalStyle does not render children.");
      }

      if (globalStyle.isStatic) {
        globalStyle.renderStyles(STATIC_EXECUTION_CONTEXT, styleSheet);
      } else {
        var context = _extends({}, props);

        if (typeof theme !== 'undefined') {
          context.theme = determineTheme(props, theme);
        }

        globalStyle.renderStyles(context, styleSheet);
      }

      React.useEffect(function () {
        if (IS_BROWSER) {
          window.scCGSHMRCache[styledComponentId] = (window.scCGSHMRCache[styledComponentId] || 0) + 1;
          return function () {
            if (window.scCGSHMRCache[styledComponentId]) {
              window.scCGSHMRCache[styledComponentId] -= 1;
            }
            /**
             * Depending on the order "render" is called this can cause the styles to be lost
             * until the next render pass of the remaining instance, which may
             * not be immediate.
             */


            if (window.scCGSHMRCache[styledComponentId] === 0) {
              globalStyle.removeStyles(styleSheet);
            }
          };
        }

        return undefined;
      }, []);
      return null;
    }

    return GlobalStyleComponent;
  }

  // 
  function keyframes(strings) {
    /* Warning if you've used keyframes on React Native */
    if (typeof navigator !== 'undefined' && navigator.product === 'ReactNative') {
      // eslint-disable-next-line no-console
      console.warn('`keyframes` cannot be used on ReactNative, only on the web. To do animation in ReactNative please use Animated.');
    }

    for (var _len = arguments.length, interpolations = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      interpolations[_key - 1] = arguments[_key];
    }

    var rules = css.apply(void 0, [strings].concat(interpolations)).join('');
    var name = hasher(rules);
    return new Keyframes(name, stringifyRules(rules, name, '@keyframes'));
  }

  // 

  /* eslint-disable camelcase, no-undef */
  var getNonce = function getNonce() {
    return typeof __webpack_nonce__ !== 'undefined' ? __webpack_nonce__ : null;
  };

  // 
  var CLOSING_TAG_R = /^\s*<\/[a-z]/i;

  var ServerStyleSheet =
  /*#__PURE__*/
  function () {
    function ServerStyleSheet() {
      var _this = this;

      this.getStyleTags = function () {
        var css = _this.sheet.toString();

        var nonce = getNonce();
        var attrs = [nonce && "nonce=\"" + nonce + "\"", SC_ATTR, SC_VERSION_ATTR + "=\"" + SC_VERSION + "\""];
        var htmlAttr = attrs.filter(Boolean).join(' ');
        return "<style " + htmlAttr + ">" + css + "</style>";
      };

      this.getStyleElement = function () {
        var _props;

        var props = (_props = {}, _props[SC_ATTR] = '', _props[SC_VERSION_ATTR] = SC_VERSION, _props.dangerouslySetInnerHTML = {
          __html: _this.sheet.toString()
        }, _props);
        var nonce = getNonce();

        if (nonce) {
          props.nonce = nonce;
        }

        return React__default.createElement("style", props);
      };

      this.sheet = new StyleSheet(true);
      this.sealed = false;
    }

    var _proto = ServerStyleSheet.prototype;

    _proto.collectStyles = function collectStyles(children) {
      if (this.sealed) {
        throw new StyledComponentsError(2);
      }

      this.sealed = true;
      return React__default.createElement(StyleSheetManager, {
        sheet: this.sheet
      }, children);
    };

    _proto.interleaveWithNodeStream = function interleaveWithNodeStream(input) {
      {
        throw new StyledComponentsError(3);
      } // eslint-disable-next-line global-require


      var _require = require('stream'),
          Readable = _require.Readable,
          Transform = _require.Transform;

      var readableStream = input;
      var sheet = this.sheet,
          getStyleTags = this.getStyleTags;
      var transformer = new Transform({
        transform: function appendStyleChunks(chunk,
        /* encoding */
        _, callback) {
          // Get the chunk and retrieve the sheet's CSS as an HTML chunk,
          // then reset its rules so we get only new ones for the next chunk
          var renderedHtml = chunk.toString();
          var html = getStyleTags();
          sheet.clearTag(); // prepend style html to chunk, unless the start of the chunk is a
          // closing tag in which case append right after that

          if (CLOSING_TAG_R.test(renderedHtml)) {
            var endOfClosingTag = renderedHtml.indexOf('>') + 1;
            var before = renderedHtml.slice(0, endOfClosingTag);
            var after = renderedHtml.slice(endOfClosingTag);
            this.push(before + html + after);
          } else {
            this.push(html + renderedHtml);
          }

          callback();
        }
      });
      readableStream.on('error', function (err) {
        // forward the error to the transform stream
        transformer.emit('error', err);
      });
      return readableStream.pipe(transformer);
    };

    return ServerStyleSheet;
  }();

  var _TYPE_STATICS;
  var REACT_STATICS = {
    childContextTypes: true,
    contextTypes: true,
    defaultProps: true,
    displayName: true,
    getDerivedStateFromProps: true,
    propTypes: true,
    type: true
  };
  var KNOWN_STATICS = {
    name: true,
    length: true,
    prototype: true,
    caller: true,
    callee: true,
    arguments: true,
    arity: true
  };
  var TYPE_STATICS = (_TYPE_STATICS = {}, _TYPE_STATICS[reactIs_3] = {
    $$typeof: true,
    render: true
  }, _TYPE_STATICS);
  var defineProperty = Object.defineProperty,
      getOwnPropertyNames = Object.getOwnPropertyNames,
      _Object$getOwnPropert = Object.getOwnPropertySymbols,
      getOwnPropertySymbols$1 = _Object$getOwnPropert === void 0 ? function () {
    return [];
  } : _Object$getOwnPropert,
      getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor,
      getPrototypeOf = Object.getPrototypeOf,
      objectPrototype = Object.prototype;
  var arrayPrototype = Array.prototype;
  function hoistNonReactStatics(targetComponent, sourceComponent, blacklist) {
    if (typeof sourceComponent !== 'string') {
      // don't hoist over string (html) components
      var inheritedComponent = getPrototypeOf(sourceComponent);

      if (inheritedComponent && inheritedComponent !== objectPrototype) {
        hoistNonReactStatics(targetComponent, inheritedComponent, blacklist);
      }

      var keys = arrayPrototype.concat(getOwnPropertyNames(sourceComponent), // $FlowFixMe
      getOwnPropertySymbols$1(sourceComponent));
      var targetStatics = TYPE_STATICS[targetComponent.$$typeof] || REACT_STATICS;
      var sourceStatics = TYPE_STATICS[sourceComponent.$$typeof] || REACT_STATICS;
      var i = keys.length;
      var descriptor;
      var key; // eslint-disable-next-line no-plusplus

      while (i--) {
        key = keys[i];

        if ( // $FlowFixMe
        !KNOWN_STATICS[key] && !(blacklist && blacklist[key]) && !(sourceStatics && sourceStatics[key]) && // $FlowFixMe
        !(targetStatics && targetStatics[key])) {
          descriptor = getOwnPropertyDescriptor(sourceComponent, key);

          if (descriptor) {
            try {
              // Avoid failures from read-only properties
              defineProperty(targetComponent, key, descriptor);
            } catch (e) {
              /* fail silently */
            }
          }
        }
      }

      return targetComponent;
    }

    return targetComponent;
  }

  // export default <Config: { theme?: any }, Instance>(
  //  Component: AbstractComponent<Config, Instance>
  // ): AbstractComponent<$Diff<Config, { theme?: any }> & { theme?: any }, Instance>
  //
  // but the old build system tooling doesn't support the syntax

  var withTheme = (function (Component) {
    // $FlowFixMe This should be React.forwardRef<Config, Instance>
    var WithTheme = React__default.forwardRef(function (props, ref) {
      var theme = React.useContext(ThemeContext); // $FlowFixMe defaultProps isn't declared so it can be inferrable

      var defaultProps = Component.defaultProps;
      var themeProp = determineTheme(props, theme, defaultProps);

      if (themeProp === undefined) {
        // eslint-disable-next-line no-console
        console.warn("[withTheme] You are not using a ThemeProvider nor passing a theme prop or a theme in defaultProps in component class \"" + getComponentName(Component) + "\"");
      }

      return React__default.createElement(Component, _extends({}, props, {
        theme: themeProp,
        ref: ref
      }));
    });
    hoistNonReactStatics(WithTheme, Component);
    WithTheme.displayName = "WithTheme(" + getComponentName(Component) + ")";
    return WithTheme;
  });

  // 
  var __DO_NOT_USE_OR_YOU_WILL_BE_HAUNTED_BY_SPOOKY_GHOSTS = {
    StyleSheet: StyleSheet,
    masterSheet: masterSheet
  };

  // 
  /* Warning if you've imported this file on React Native */

  if (typeof navigator !== 'undefined' && navigator.product === 'ReactNative') {
    // eslint-disable-next-line no-console
    console.warn("It looks like you've imported 'styled-components' on React Native.\n" + "Perhaps you're looking to import 'styled-components/native'?\n" + 'Read more about this at https://www.styled-components.com/docs/basics#react-native');
  }
  /* Warning if there are several instances of styled-components */


  if (typeof window !== 'undefined' && typeof navigator !== 'undefined' && typeof navigator.userAgent === 'string' && navigator.userAgent.indexOf('Node.js') === -1 && navigator.userAgent.indexOf('jsdom') === -1) {
    window['__styled-components-init__'] = window['__styled-components-init__'] || 0;

    if (window['__styled-components-init__'] === 1) {
      // eslint-disable-next-line no-console
      console.warn("It looks like there are several instances of 'styled-components' initialized in this application. " + 'This may cause dynamic styles not rendering properly, errors happening during rehydration process ' + 'and makes your application bigger without a good reason.\n\n' + 'See https://s-c.sh/2BAXzed for more info.');
    }

    window['__styled-components-init__'] += 1;
  }

  var secondary = /*#__PURE__*/Object.freeze({
    createGlobalStyle: createGlobalStyle,
    css: css,
    isStyledComponent: isStyledComponent,
    keyframes: keyframes,
    ServerStyleSheet: ServerStyleSheet,
    StyleSheetConsumer: StyleSheetConsumer,
    StyleSheetContext: StyleSheetContext,
    StyleSheetManager: StyleSheetManager,
    ThemeConsumer: ThemeConsumer,
    ThemeContext: ThemeContext,
    ThemeProvider: ThemeProvider,
    withTheme: withTheme,
    __DO_NOT_USE_OR_YOU_WILL_BE_HAUNTED_BY_SPOOKY_GHOSTS: __DO_NOT_USE_OR_YOU_WILL_BE_HAUNTED_BY_SPOOKY_GHOSTS
  });

  function constructWithOptions(componentConstructor, tag, options) {
    if (options === void 0) {
      options = EMPTY_OBJECT;
    }

    if (!reactIs_2(tag)) {
      throw new StyledComponentsError(1, String(tag));
    }
    /* This is callable directly as a template function */
    // $FlowFixMe: Not typed to avoid destructuring arguments


    var templateFunction = function templateFunction() {
      return componentConstructor(tag, options, css.apply(void 0, arguments));
    };
    /* If config methods are called, wrap up a new template function and merge options */


    templateFunction.withConfig = function (config) {
      return constructWithOptions(componentConstructor, tag, _extends({}, options, config));
    };
    /* Modify/inject new props at runtime */


    templateFunction.attrs = function (attrs) {
      return constructWithOptions(componentConstructor, tag, _extends({}, options, {
        attrs: Array.prototype.concat(options.attrs, attrs).filter(Boolean)
      }));
    };

    return templateFunction;
  }

  function memoize(fn) {
    var cache = {};
    return function (arg) {
      if (cache[arg] === undefined) cache[arg] = fn(arg);
      return cache[arg];
    };
  }

  var reactPropsRegex = /^((children|dangerouslySetInnerHTML|key|ref|autoFocus|defaultValue|defaultChecked|innerHTML|suppressContentEditableWarning|suppressHydrationWarning|valueLink|accept|acceptCharset|accessKey|action|allow|allowUserMedia|allowPaymentRequest|allowFullScreen|allowTransparency|alt|async|autoComplete|autoPlay|capture|cellPadding|cellSpacing|challenge|charSet|checked|cite|classID|className|cols|colSpan|content|contentEditable|contextMenu|controls|controlsList|coords|crossOrigin|data|dateTime|default|defer|dir|disabled|download|draggable|encType|form|formAction|formEncType|formMethod|formNoValidate|formTarget|frameBorder|headers|height|hidden|high|href|hrefLang|htmlFor|httpEquiv|id|inputMode|integrity|is|keyParams|keyType|kind|label|lang|list|loop|low|marginHeight|marginWidth|max|maxLength|media|mediaGroup|method|min|minLength|multiple|muted|name|nonce|noValidate|open|optimum|pattern|placeholder|playsInline|poster|preload|profile|radioGroup|readOnly|referrerPolicy|rel|required|reversed|role|rows|rowSpan|sandbox|scope|scoped|scrolling|seamless|selected|shape|size|sizes|slot|span|spellCheck|src|srcDoc|srcLang|srcSet|start|step|style|summary|tabIndex|target|title|type|useMap|value|width|wmode|wrap|about|datatype|inlist|prefix|property|resource|typeof|vocab|autoCapitalize|autoCorrect|autoSave|color|itemProp|itemScope|itemType|itemID|itemRef|results|security|unselectable|accentHeight|accumulate|additive|alignmentBaseline|allowReorder|alphabetic|amplitude|arabicForm|ascent|attributeName|attributeType|autoReverse|azimuth|baseFrequency|baselineShift|baseProfile|bbox|begin|bias|by|calcMode|capHeight|clip|clipPathUnits|clipPath|clipRule|colorInterpolation|colorInterpolationFilters|colorProfile|colorRendering|contentScriptType|contentStyleType|cursor|cx|cy|d|decelerate|descent|diffuseConstant|direction|display|divisor|dominantBaseline|dur|dx|dy|edgeMode|elevation|enableBackground|end|exponent|externalResourcesRequired|fill|fillOpacity|fillRule|filter|filterRes|filterUnits|floodColor|floodOpacity|focusable|fontFamily|fontSize|fontSizeAdjust|fontStretch|fontStyle|fontVariant|fontWeight|format|from|fr|fx|fy|g1|g2|glyphName|glyphOrientationHorizontal|glyphOrientationVertical|glyphRef|gradientTransform|gradientUnits|hanging|horizAdvX|horizOriginX|ideographic|imageRendering|in|in2|intercept|k|k1|k2|k3|k4|kernelMatrix|kernelUnitLength|kerning|keyPoints|keySplines|keyTimes|lengthAdjust|letterSpacing|lightingColor|limitingConeAngle|local|markerEnd|markerMid|markerStart|markerHeight|markerUnits|markerWidth|mask|maskContentUnits|maskUnits|mathematical|mode|numOctaves|offset|opacity|operator|order|orient|orientation|origin|overflow|overlinePosition|overlineThickness|panose1|paintOrder|pathLength|patternContentUnits|patternTransform|patternUnits|pointerEvents|points|pointsAtX|pointsAtY|pointsAtZ|preserveAlpha|preserveAspectRatio|primitiveUnits|r|radius|refX|refY|renderingIntent|repeatCount|repeatDur|requiredExtensions|requiredFeatures|restart|result|rotate|rx|ry|scale|seed|shapeRendering|slope|spacing|specularConstant|specularExponent|speed|spreadMethod|startOffset|stdDeviation|stemh|stemv|stitchTiles|stopColor|stopOpacity|strikethroughPosition|strikethroughThickness|string|stroke|strokeDasharray|strokeDashoffset|strokeLinecap|strokeLinejoin|strokeMiterlimit|strokeOpacity|strokeWidth|surfaceScale|systemLanguage|tableValues|targetX|targetY|textAnchor|textDecoration|textRendering|textLength|to|transform|u1|u2|underlinePosition|underlineThickness|unicode|unicodeBidi|unicodeRange|unitsPerEm|vAlphabetic|vHanging|vIdeographic|vMathematical|values|vectorEffect|version|vertAdvY|vertOriginX|vertOriginY|viewBox|viewTarget|visibility|widths|wordSpacing|writingMode|x|xHeight|x1|x2|xChannelSelector|xlinkActuate|xlinkArcrole|xlinkHref|xlinkRole|xlinkShow|xlinkTitle|xlinkType|xmlBase|xmlns|xmlnsXlink|xmlLang|xmlSpace|y|y1|y2|yChannelSelector|z|zoomAndPan|for|class|autofocus)|(([Dd][Aa][Tt][Aa]|[Aa][Rr][Ii][Aa]|x)-.*))$/; // https://esbench.com/bench/5bfee68a4cd7e6009ef61d23

  var index = memoize(function (prop) {
    return reactPropsRegex.test(prop) || prop.charCodeAt(0) === 111
    /* o */
    && prop.charCodeAt(1) === 110
    /* n */
    && prop.charCodeAt(2) < 91;
  }
  /* Z+1 */
  );

  // 
  var isHMREnabled = typeof module !== 'undefined' && module.hot;
  /*
   ComponentStyle is all the CSS-specific stuff, not
   the React-specific stuff.
   */

  var ComponentStyle =
  /*#__PURE__*/
  function () {
    function ComponentStyle(rules, attrs, componentId) {
      this.rules = rules;
      this.isStatic = !isHMREnabled && IS_BROWSER && isStaticRules(rules, attrs);
      this.componentId = componentId;
      this.baseHash = hash(componentId); // NOTE: This registers the componentId, which ensures a consistent order
      // for this component's styles compared to others

      StyleSheet.registerId(componentId);
    }
    /*
     * Flattens a rule set into valid CSS
     * Hashes it, wraps the whole chunk in a .hash1234 {}
     * Returns the hash to be injected on render()
     * */


    var _proto = ComponentStyle.prototype;

    _proto.generateAndInjectStyles = function generateAndInjectStyles(executionContext, styleSheet) {
      var componentId = this.componentId;

      if (this.isStatic) {
        if (!styleSheet.hasNameForId(componentId, componentId)) {
          var cssStatic = flatten(this.rules, executionContext, styleSheet).join('');
          var cssStaticFormatted = stringifyRules(cssStatic, "." + componentId, undefined, componentId);
          styleSheet.insertRules(componentId, componentId, cssStaticFormatted);
        }

        return componentId;
      } else {
        var length = this.rules.length;
        var i = 0;
        var dynamicHash = this.baseHash;
        var css = '';

        for (i = 0; i < length; i++) {
          var partRule = this.rules[i];

          if (typeof partRule === 'string') {
            css += partRule;
          } else {
            var partChunk = flatten(partRule, executionContext, styleSheet);
            var partString = Array.isArray(partChunk) ? partChunk.join('') : partChunk;
            dynamicHash ^= hash(partString + i);
            css += partString;
          }
        }

        var name = generateAlphabeticName(dynamicHash);

        if (!styleSheet.hasNameForId(componentId, name)) {
          var cssFormatted = stringifyRules(css, "." + name, undefined, componentId);
          styleSheet.insertRules(componentId, name, cssFormatted);
        }

        return name;
      }
    };

    return ComponentStyle;
  }();

  // 
  var LIMIT = 200;
  var createWarnTooManyClasses = (function (displayName) {
    var generatedClasses = {};
    var warningSeen = false;
    return function (className) {
      if (!warningSeen) {
        generatedClasses[className] = true;

        if (Object.keys(generatedClasses).length >= LIMIT) {
          // Unable to find latestRule in test environment.

          /* eslint-disable no-console, prefer-template */
          console.warn("Over " + LIMIT + " classes were generated for component " + displayName + ". \n" + 'Consider using the attrs method, together with a style object for frequently changed styles.\n' + 'Example:\n' + '  const Component = styled.div.attrs({\n' + '    style: ({ background }) => ({\n' + '      background,\n' + '    }),\n' + '  })`width: 100%;`\n\n' + '  <Component />');
          warningSeen = true;
          generatedClasses = {};
        }
      }
    };
  });

  // 
  var escapeRegex = /[[\].#*$><+~=|^:(),"'`-]+/g;
  var dashesAtEnds = /(^-|-$)/g;
  /**
   * TODO: Explore using CSS.escape when it becomes more available
   * in evergreen browsers.
   */

  function escape(str) {
    return str // Replace all possible CSS selectors
    .replace(escapeRegex, '-') // Remove extraneous hyphens at the start and end
    .replace(dashesAtEnds, '');
  }

  // 
  function isTag(target) {
    return typeof target === 'string' && (target.charAt(0) === target.charAt(0).toLowerCase());
  }

  // 
  function generateDisplayName(target) {
    // $FlowFixMe
    return isTag(target) ? "styled." + target : "Styled(" + getComponentName(target) + ")";
  }

  // 
  function isDerivedReactComponent(fn) {
    return !!(fn && fn.prototype && fn.prototype.isReactComponent);
  }

  // 
  // Helper to call a given function, only once
  var once = (function (cb) {
    var called = false; // $FlowFixMe this works if F is "(...any[]) => any" but that would imply the return value si forwarded

    return function () {
      if (!called) {
        called = true;
        cb.apply(void 0, arguments);
      }
    };
  });

  /* global $Call */

  var identifiers = {};
  /* We depend on components having unique IDs */

  function generateId(displayName, parentComponentId) {
    var name = typeof displayName !== 'string' ? 'sc' : escape(displayName); // Ensure that no displayName can lead to duplicate componentIds

    var nr = (identifiers[name] || 0) + 1;
    identifiers[name] = nr;
    var componentId = name + "-" + hasher(name + nr);
    return parentComponentId ? parentComponentId + "-" + componentId : componentId;
  }

  function useResolvedAttrs(theme, props, attrs, utils) {
    if (theme === void 0) {
      theme = EMPTY_OBJECT;
    }

    // NOTE: can't memoize this
    // returns [context, resolvedAttrs]
    // where resolvedAttrs is only the things injected by the attrs themselves
    var context = _extends({}, props, {
      theme: theme
    });

    var resolvedAttrs = {};
    attrs.forEach(function (attrDef) {
      var resolvedAttrDef = attrDef;
      var attrDefWasFn = false;
      var attr;
      var key;

      if (isFunction(resolvedAttrDef)) {
        resolvedAttrDef = resolvedAttrDef(context);
        attrDefWasFn = true;
      }
      /* eslint-disable guard-for-in */


      for (key in resolvedAttrDef) {
        attr = resolvedAttrDef[key];

        if (!attrDefWasFn) {
          if (isFunction(attr) && !isDerivedReactComponent(attr) && !isStyledComponent(attr)) {
            {
              utils.warnAttrsFnObjectKeyDeprecated(key);
            }

            attr = attr(context);

            if (React__default.isValidElement(attr)) {
              utils.warnNonStyledComponentAttrsObjectKey(key);
            }
          }
        }

        resolvedAttrs[key] = attr;
        context[key] = attr;
      }
      /* eslint-enable */

    });
    return [context, resolvedAttrs];
  }

  function useInjectedStyle(componentStyle, hasAttrs, resolvedAttrs, utils, warnTooManyClasses) {
    var styleSheet = useStyleSheet(); // statically styled-components don't need to build an execution context object,
    // and shouldn't be increasing the number of class names

    var isStatic = componentStyle.isStatic && !hasAttrs;
    var className = isStatic ? componentStyle.generateAndInjectStyles(EMPTY_OBJECT, styleSheet) : componentStyle.generateAndInjectStyles(resolvedAttrs, styleSheet);

    if (!isStatic && warnTooManyClasses) {
      warnTooManyClasses(className);
    }

    React.useDebugValue(className);
    return className;
  } // TODO: convert these all to individual hooks, if possible


  function developmentDeprecationWarningsFactory(displayNameArg) {
    var displayName = displayNameArg || 'Unknown';
    return {
      warnInnerRef: once(function () {
        return (// eslint-disable-next-line no-console
          console.warn("The \"innerRef\" API has been removed in styled-components v4 in favor of React 16 ref forwarding, use \"ref\" instead like a typical component. \"innerRef\" was detected on component \"" + displayName + "\".")
        );
      }),
      warnAttrsFnObjectKeyDeprecated: once(function (key) {
        return (// eslint-disable-next-line no-console
          console.warn("Functions as object-form attrs({}) keys are now deprecated and will be removed in a future version of styled-components. Switch to the new attrs(props => ({})) syntax instead for easier and more powerful composition. The attrs key in question is \"" + key + "\" on component \"" + displayName + "\".")
        );
      }),
      warnNonStyledComponentAttrsObjectKey: once(function (key) {
        return (// eslint-disable-next-line no-console
          console.warn("It looks like you've used a non styled-component as the value for the \"" + key + "\" prop in an object-form attrs constructor of \"" + displayName + "\".\n" + 'You should use the new function-form attrs constructor which avoids this issue: attrs(props => ({ yourStuff }))\n' + "To continue using the deprecated object syntax, you'll need to wrap your component prop in a function to make it available inside the styled component (you'll still get the deprecation warning though.)\n" + ("For example, { " + key + ": () => InnerComponent } instead of { " + key + ": InnerComponent }"))
        );
      })
    };
  }

  function useDevelopmentDeprecationWarnings(displayName) {
    return React.useState(function () {
      return developmentDeprecationWarningsFactory(displayName);
    })[0];
  }

  var useDeprecationWarnings = useDevelopmentDeprecationWarnings;

  function useStyledComponentImpl(forwardedComponent, props, forwardedRef) {
    var componentAttrs = forwardedComponent.attrs,
        componentStyle = forwardedComponent.componentStyle,
        defaultProps = forwardedComponent.defaultProps,
        displayName = forwardedComponent.displayName,
        foldedComponentIds = forwardedComponent.foldedComponentIds,
        styledComponentId = forwardedComponent.styledComponentId,
        target = forwardedComponent.target; // NOTE: the non-hooks version only subscribes to this when !componentStyle.isStatic,
    // but that'd be against the rules-of-hooks. We could be naughty and do it anyway as it
    // should be an immutable value, but behave for now.

    var theme = determineTheme(props, React.useContext(ThemeContext), defaultProps);
    var utils = useDeprecationWarnings(displayName);

    var _useResolvedAttrs = useResolvedAttrs(theme, props, componentAttrs, utils),
        context = _useResolvedAttrs[0],
        attrs = _useResolvedAttrs[1];

    var generatedClassName = useInjectedStyle(componentStyle, componentAttrs.length > 0, context, utils, forwardedComponent.warnTooManyClasses); // NOTE: this has to be called unconditionally due to the rules of hooks
    // it will just do nothing if it's not an in-browser development build
    // NOTE2: there is no (supported) way to know if the wrapped component actually can
    // receive refs -- just passing refs will trigger warnings on any function component child :(
    // -- this also means we can't keep doing this check unless StyledComponent is itself a class.
    //
    // const refToForward = useCheckClassNameUsage(
    //   forwardedRef,
    //   target,
    //   generatedClassName,
    //   attrs.suppressClassNameWarning
    // );

    var refToForward = forwardedRef;
    var elementToBeCreated = // $FlowFixMe
    props.as || // eslint-disable-line react/prop-types
    attrs.as || target;
    var isTargetTag = isTag(elementToBeCreated);
    var computedProps = attrs !== props ? _extends({}, attrs, props) : props;
    var shouldFilterProps = 'as' in computedProps || isTargetTag;
    var propsForElement = shouldFilterProps ? {} : _extends({}, computedProps);

    if ('innerRef' in computedProps && isTargetTag) {
      utils.warnInnerRef();
    }

    if (shouldFilterProps) {
      // eslint-disable-next-line guard-for-in
      for (var key in computedProps) {
        if (key !== 'as' && (!isTargetTag || index(key))) {
          // Don't pass through non HTML tags through to HTML elements
          propsForElement[key] = computedProps[key];
        }
      }
    }

    if ( // $FlowFixMe
    props.style && // eslint-disable-line react/prop-types
    attrs.style !== props.style // eslint-disable-line react/prop-types
    ) {
        // $FlowFixMe
        propsForElement.style = _extends({}, attrs.style, props.style); // eslint-disable-line react/prop-types
      } // $FlowFixMe


    propsForElement.className = Array.prototype.concat(foldedComponentIds, // $FlowFixMe
    props.className, // eslint-disable-line react/prop-types
    styledComponentId, attrs.className, generatedClassName).filter(Boolean).join(' '); // $FlowFixMe

    propsForElement.ref = refToForward;
    React.useDebugValue(styledComponentId);
    return React.createElement(elementToBeCreated, propsForElement);
  }

  function createStyledComponent(target, options, rules) {
    var isTargetStyledComp = isStyledComponent(target);
    var isCompositeComponent = !isTag(target);
    var _options$displayName = options.displayName,
        displayName = _options$displayName === void 0 ? generateDisplayName(target) : _options$displayName,
        _options$componentId = options.componentId,
        componentId = _options$componentId === void 0 ? generateId(options.displayName, options.parentComponentId) : _options$componentId,
        _options$attrs = options.attrs,
        attrs = _options$attrs === void 0 ? EMPTY_ARRAY : _options$attrs;
    var styledComponentId = options.displayName && options.componentId ? escape(options.displayName) + "-" + options.componentId : options.componentId || componentId; // fold the underlying StyledComponent attrs up (implicit extend)

    var finalAttrs = // $FlowFixMe
    isTargetStyledComp && target.attrs ? Array.prototype.concat(target.attrs, attrs).filter(Boolean) : attrs;
    var componentStyle = new ComponentStyle(isTargetStyledComp ? // fold the underlying StyledComponent rules up (implicit extend)
    // $FlowFixMe
    target.componentStyle.rules.concat(rules) : rules, finalAttrs, styledComponentId);
    /**
     * forwardRef creates a new interim component, which we'll take advantage of
     * instead of extending ParentComponent to create _another_ interim class
     */
    // $FlowFixMe this is a forced cast to merge it StyledComponentWrapperProperties

    var WrappedStyledComponent = React__default.forwardRef(function (props, ref) {
      return useStyledComponentImpl(WrappedStyledComponent, props, ref);
    });
    WrappedStyledComponent.attrs = finalAttrs;
    WrappedStyledComponent.componentStyle = componentStyle;
    WrappedStyledComponent.displayName = displayName;
    WrappedStyledComponent.foldedComponentIds = isTargetStyledComp ? // $FlowFixMe
    Array.prototype.concat(target.foldedComponentIds, target.styledComponentId) : EMPTY_ARRAY;
    WrappedStyledComponent.styledComponentId = styledComponentId; // fold the underlying StyledComponent target up since we folded the styles

    WrappedStyledComponent.target = isTargetStyledComp ? // $FlowFixMe
    target.target : target; // $FlowFixMe

    WrappedStyledComponent.withComponent = function withComponent(tag) {
      var previousComponentId = options.componentId,
          optionsToCopy = _objectWithoutPropertiesLoose(options, ["componentId"]);

      var newComponentId = previousComponentId && previousComponentId + "-" + (isTag(tag) ? tag : escape(getComponentName(tag)));

      var newOptions = _extends({}, optionsToCopy, {
        attrs: finalAttrs,
        componentId: newComponentId
      });

      return createStyledComponent(tag, newOptions, rules);
    };

    {
      WrappedStyledComponent.warnTooManyClasses = createWarnTooManyClasses(displayName);
    } // $FlowFixMe


    WrappedStyledComponent.toString = function () {
      return "." + WrappedStyledComponent.styledComponentId;
    };

    if (isCompositeComponent) {
      hoistNonReactStatics(WrappedStyledComponent, target, {
        // all SC-specific things should not be hoisted
        attrs: true,
        componentStyle: true,
        displayName: true,
        foldedComponentIds: true,
        styledComponentId: true,
        target: true,
        withComponent: true
      });
    }

    return WrappedStyledComponent;
  }

  // 
  // Thanks to ReactDOMFactories for this handy list!
  var domElements = ['a', 'abbr', 'address', 'area', 'article', 'aside', 'audio', 'b', 'base', 'bdi', 'bdo', 'big', 'blockquote', 'body', 'br', 'button', 'canvas', 'caption', 'cite', 'code', 'col', 'colgroup', 'data', 'datalist', 'dd', 'del', 'details', 'dfn', 'dialog', 'div', 'dl', 'dt', 'em', 'embed', 'fieldset', 'figcaption', 'figure', 'footer', 'form', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'head', 'header', 'hgroup', 'hr', 'html', 'i', 'iframe', 'img', 'input', 'ins', 'kbd', 'keygen', 'label', 'legend', 'li', 'link', 'main', 'map', 'mark', 'marquee', 'menu', 'menuitem', 'meta', 'meter', 'nav', 'noscript', 'object', 'ol', 'optgroup', 'option', 'output', 'p', 'param', 'picture', 'pre', 'progress', 'q', 'rp', 'rt', 'ruby', 's', 'samp', 'script', 'section', 'select', 'small', 'source', 'span', 'strong', 'style', 'sub', 'summary', 'sup', 'table', 'tbody', 'td', 'textarea', 'tfoot', 'th', 'thead', 'time', 'title', 'tr', 'track', 'u', 'ul', 'var', 'video', 'wbr', // SVG
  'circle', 'clipPath', 'defs', 'ellipse', 'foreignObject', 'g', 'image', 'line', 'linearGradient', 'marker', 'mask', 'path', 'pattern', 'polygon', 'polyline', 'radialGradient', 'rect', 'stop', 'svg', 'text', 'tspan'];

  // 

  var styled = function styled(tag) {
    return constructWithOptions(createStyledComponent, tag);
  }; // Shorthands for all valid HTML Elements


  domElements.forEach(function (domElement) {
    styled[domElement] = styled(domElement);
  });

  // 
  /**
   * eliminates the need to do styled.default since the other APIs
   * are directly assigned as properties to the main function
   * */
  // eslint-disable-next-line guard-for-in

  for (var key in secondary) {
    styled[key] = secondary[key];
  }

  return styled;

}));
//# sourceMappingURL=styled-components.js.map
