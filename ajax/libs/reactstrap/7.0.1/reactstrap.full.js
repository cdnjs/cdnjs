(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('react'), require('react-dom')) :
  typeof define === 'function' && define.amd ? define(['exports', 'react', 'react-dom'], factory) :
  (global = global || self, factory(global.Reactstrap = {}, global.React, global.ReactDOM));
}(this, function (exports, React, ReactDOM) { 'use strict';

  var React__default = 'default' in React ? React['default'] : React;
  ReactDOM = ReactDOM && ReactDOM.hasOwnProperty('default') ? ReactDOM['default'] : ReactDOM;

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

  var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

  function unwrapExports (x) {
  	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x.default : x;
  }

  function createCommonjsModule(fn, module) {
  	return module = { exports: {} }, fn(module, module.exports), module.exports;
  }

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
      } // Detect buggy property enumeration order in older V8 versions.
      // https://bugs.chromium.org/p/v8/issues/detail?id=4118


      var test1 = new String('abc'); // eslint-disable-line no-new-wrappers

      test1[5] = 'de';

      if (Object.getOwnPropertyNames(test1)[0] === '5') {
        return false;
      } // https://bugs.chromium.org/p/v8/issues/detail?id=3056


      var test2 = {};

      for (var i = 0; i < 10; i++) {
        test2['_' + String.fromCharCode(i)] = i;
      }

      var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
        return test2[n];
      });

      if (order2.join('') !== '0123456789') {
        return false;
      } // https://bugs.chromium.org/p/v8/issues/detail?id=3056


      var test3 = {};
      'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
        test3[letter] = letter;
      });

      if (Object.keys(Object.assign({}, test3)).join('') !== 'abcdefghijklmnopqrst') {
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

  function emptyFunction() {}

  var factoryWithThrowingShims = function factoryWithThrowingShims() {
    function shim(props, propName, componentName, location, propFullName, secret) {
      if (secret === ReactPropTypesSecret_1) {
        // It is still safe when called from React.
        return;
      }

      var err = new Error('Calling PropTypes validators directly is not supported by the `prop-types` package. ' + 'Use PropTypes.checkPropTypes() to call them. ' + 'Read more at http://fb.me/use-check-prop-types');
      err.name = 'Invariant Violation';
      throw err;
    }
    shim.isRequired = shim;

    function getShim() {
      return shim;
    }
    // Keep this list in sync with production version in `./factoryWithTypeCheckers.js`.

    var ReactPropTypes = {
      array: shim,
      bool: shim,
      func: shim,
      number: shim,
      object: shim,
      string: shim,
      symbol: shim,
      any: shim,
      arrayOf: getShim,
      element: shim,
      instanceOf: getShim,
      node: shim,
      objectOf: getShim,
      oneOf: getShim,
      oneOfType: getShim,
      shape: getShim,
      exact: getShim
    };
    ReactPropTypes.checkPropTypes = emptyFunction;
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
      // By explicitly using `prop-types` you are opting into new production behavior.
      // http://fb.me/prop-types-in-prod
      module.exports = factoryWithThrowingShims();
    }
  });

  var classnames = createCommonjsModule(function (module) {
    /*!
      Copyright (c) 2017 Jed Watson.
      Licensed under the MIT License (MIT), see
      http://jedwatson.github.io/classnames
    */

    /* global define */
    (function () {

      var hasOwn = {}.hasOwnProperty;

      function classNames() {
        var classes = [];

        for (var i = 0; i < arguments.length; i++) {
          var arg = arguments[i];
          if (!arg) continue;
          var argType = typeof arg;

          if (argType === 'string' || argType === 'number') {
            classes.push(arg);
          } else if (Array.isArray(arg) && arg.length) {
            var inner = classNames.apply(null, arg);

            if (inner) {
              classes.push(inner);
            }
          } else if (argType === 'object') {
            for (var key in arg) {
              if (hasOwn.call(arg, key) && arg[key]) {
                classes.push(key);
              }
            }
          }
        }

        return classes.join(' ');
      }

      if (module.exports) {
        classNames.default = classNames;
        module.exports = classNames;
      } else {
        window.classNames = classNames;
      }
    })();
  });

  /**
   * Lodash (Custom Build) <https://lodash.com/>
   * Build: `lodash modularize exports="npm" -o ./`
   * Copyright JS Foundation and other contributors <https://js.foundation/>
   * Released under MIT license <https://lodash.com/license>
   * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
   * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
   */

  /** `Object#toString` result references. */

  var asyncTag = '[object AsyncFunction]',
      funcTag = '[object Function]',
      genTag = '[object GeneratorFunction]',
      nullTag = '[object Null]',
      proxyTag = '[object Proxy]',
      undefinedTag = '[object Undefined]';
  /** Detect free variable `global` from Node.js. */

  var freeGlobal = typeof commonjsGlobal == 'object' && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;
  /** Detect free variable `self`. */

  var freeSelf = typeof self == 'object' && self && self.Object === Object && self;
  /** Used as a reference to the global object. */

  var root = freeGlobal || freeSelf || Function('return this')();
  /** Used for built-in method references. */

  var objectProto = Object.prototype;
  /** Used to check objects for own properties. */

  var hasOwnProperty$1 = objectProto.hasOwnProperty;
  /**
   * Used to resolve the
   * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
   * of values.
   */

  var nativeObjectToString = objectProto.toString;
  /** Built-in value references. */

  var Symbol$1 = root.Symbol,
      symToStringTag = Symbol$1 ? Symbol$1.toStringTag : undefined;
  /**
   * The base implementation of `getTag` without fallbacks for buggy environments.
   *
   * @private
   * @param {*} value The value to query.
   * @returns {string} Returns the `toStringTag`.
   */

  function baseGetTag(value) {
    if (value == null) {
      return value === undefined ? undefinedTag : nullTag;
    }

    return symToStringTag && symToStringTag in Object(value) ? getRawTag(value) : objectToString(value);
  }
  /**
   * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
   *
   * @private
   * @param {*} value The value to query.
   * @returns {string} Returns the raw `toStringTag`.
   */


  function getRawTag(value) {
    var isOwn = hasOwnProperty$1.call(value, symToStringTag),
        tag = value[symToStringTag];

    try {
      value[symToStringTag] = undefined;
      var unmasked = true;
    } catch (e) {}

    var result = nativeObjectToString.call(value);

    if (unmasked) {
      if (isOwn) {
        value[symToStringTag] = tag;
      } else {
        delete value[symToStringTag];
      }
    }

    return result;
  }
  /**
   * Converts `value` to a string using `Object.prototype.toString`.
   *
   * @private
   * @param {*} value The value to convert.
   * @returns {string} Returns the converted string.
   */


  function objectToString(value) {
    return nativeObjectToString.call(value);
  }
  /**
   * Checks if `value` is classified as a `Function` object.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a function, else `false`.
   * @example
   *
   * _.isFunction(_);
   * // => true
   *
   * _.isFunction(/abc/);
   * // => false
   */


  function isFunction(value) {
    if (!isObject(value)) {
      return false;
    } // The use of `Object#toString` avoids issues with the `typeof` operator
    // in Safari 9 which returns 'object' for typed arrays and other constructors.


    var tag = baseGetTag(value);
    return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
  }
  /**
   * Checks if `value` is the
   * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
   * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is an object, else `false`.
   * @example
   *
   * _.isObject({});
   * // => true
   *
   * _.isObject([1, 2, 3]);
   * // => true
   *
   * _.isObject(_.noop);
   * // => true
   *
   * _.isObject(null);
   * // => false
   */


  function isObject(value) {
    var type = typeof value;
    return value != null && (type == 'object' || type == 'function');
  }

  var lodash_isfunction = isFunction;

  function getScrollbarWidth() {
    var scrollDiv = document.createElement('div'); // .modal-scrollbar-measure styles // https://github.com/twbs/bootstrap/blob/v4.0.0-alpha.4/scss/_modal.scss#L106-L113

    scrollDiv.style.position = 'absolute';
    scrollDiv.style.top = '-9999px';
    scrollDiv.style.width = '50px';
    scrollDiv.style.height = '50px';
    scrollDiv.style.overflow = 'scroll';
    document.body.appendChild(scrollDiv);
    var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
    document.body.removeChild(scrollDiv);
    return scrollbarWidth;
  }
  function setScrollbarWidth(padding) {
    document.body.style.paddingRight = padding > 0 ? padding + "px" : null;
  }
  function isBodyOverflowing() {
    return document.body.clientWidth < window.innerWidth;
  }
  function getOriginalBodyPadding() {
    var style = window.getComputedStyle(document.body, null);
    return parseInt(style && style.getPropertyValue('padding-right') || 0, 10);
  }
  function conditionallyUpdateScrollbar() {
    var scrollbarWidth = getScrollbarWidth(); // https://github.com/twbs/bootstrap/blob/v4.0.0-alpha.6/js/src/modal.js#L433

    var fixedContent = document.querySelectorAll('.fixed-top, .fixed-bottom, .is-fixed, .sticky-top')[0];
    var bodyPadding = fixedContent ? parseInt(fixedContent.style.paddingRight || 0, 10) : 0;

    if (isBodyOverflowing()) {
      setScrollbarWidth(bodyPadding + scrollbarWidth);
    }
  }
  var globalCssModule;
  function setGlobalCssModule(cssModule) {
    globalCssModule = cssModule;
  }
  function mapToCssModules(className, cssModule) {
    if (className === void 0) {
      className = '';
    }

    if (cssModule === void 0) {
      cssModule = globalCssModule;
    }

    if (!cssModule) return className;
    return className.split(' ').map(function (c) {
      return cssModule[c] || c;
    }).join(' ');
  }
  /**
   * Returns a new object with the key/value pairs from `obj` that are not in the array `omitKeys`.
   */

  function omit(obj, omitKeys) {
    var result = {};
    Object.keys(obj).forEach(function (key) {
      if (omitKeys.indexOf(key) === -1) {
        result[key] = obj[key];
      }
    });
    return result;
  }
  /**
   * Returns a filtered copy of an object with only the specified keys.
   */

  function pick(obj, keys) {
    var pickKeys = Array.isArray(keys) ? keys : [keys];
    var length = pickKeys.length;
    var key;
    var result = {};

    while (length > 0) {
      length -= 1;
      key = pickKeys[length];
      result[key] = obj[key];
    }

    return result;
  }
  var warned = {};
  function warnOnce(message) {
    if (!warned[message]) {
      /* istanbul ignore else */
      if (typeof console !== 'undefined') {
        console.error(message); // eslint-disable-line no-console
      }

      warned[message] = true;
    }
  }
  function deprecated(propType, explanation) {
    return function validate(props, propName, componentName) {
      if (props[propName] !== null && typeof props[propName] !== 'undefined') {
        warnOnce("\"" + propName + "\" property of \"" + componentName + "\" has been deprecated.\n" + explanation);
      }

      for (var _len = arguments.length, rest = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
        rest[_key - 3] = arguments[_key];
      }

      return propType.apply(void 0, [props, propName, componentName].concat(rest));
    };
  }
  function DOMElement(props, propName, componentName) {
    if (!(props[propName] instanceof Element)) {
      return new Error('Invalid prop `' + propName + '` supplied to `' + componentName + '`. Expected prop to be an instance of Element. Validation failed.');
    }
  }
  var targetPropType = propTypes.oneOfType([propTypes.string, propTypes.func, DOMElement, propTypes.shape({
    current: propTypes.any
  })]);
  /* eslint key-spacing: ["error", { afterColon: true, align: "value" }] */
  // These are all setup to match what is in the bootstrap _variables.scss
  // https://github.com/twbs/bootstrap/blob/v4-dev/scss/_variables.scss

  var TransitionTimeouts = {
    Fade: 150,
    // $transition-fade
    Collapse: 350,
    // $transition-collapse
    Modal: 300,
    // $modal-transition
    Carousel: 600 // $carousel-transition

  }; // Duplicated Transition.propType keys to ensure that Reactstrap builds
  // for distribution properly exclude these keys for nested child HTML attributes
  // since `react-transition-group` removes propTypes in production builds.

  var TransitionPropTypeKeys = ['in', 'mountOnEnter', 'unmountOnExit', 'appear', 'enter', 'exit', 'timeout', 'onEnter', 'onEntering', 'onEntered', 'onExit', 'onExiting', 'onExited'];
  var TransitionStatuses = {
    ENTERING: 'entering',
    ENTERED: 'entered',
    EXITING: 'exiting',
    EXITED: 'exited'
  };
  var keyCodes = {
    esc: 27,
    space: 32,
    enter: 13,
    tab: 9,
    up: 38,
    down: 40,
    home: 36,
    end: 35,
    n: 78,
    p: 80
  };
  var PopperPlacements = ['auto-start', 'auto', 'auto-end', 'top-start', 'top', 'top-end', 'right-start', 'right', 'right-end', 'bottom-end', 'bottom', 'bottom-start', 'left-end', 'left', 'left-start'];
  var canUseDOM = !!(typeof window !== 'undefined' && window.document && window.document.createElement);
  function isReactRefObj(target) {
    if (target && typeof target === 'object') {
      return 'current' in target;
    }

    return false;
  }
  function findDOMElements(target) {
    if (isReactRefObj(target)) {
      return target.current;
    }

    if (lodash_isfunction(target)) {
      return target();
    }

    if (typeof target === 'string' && canUseDOM) {
      var selection = document.querySelectorAll(target);

      if (!selection.length) {
        selection = document.querySelectorAll("#" + target);
      }

      if (!selection.length) {
        throw new Error("The target '" + target + "' could not be identified in the dom, tip: check spelling");
      }

      return selection;
    }

    return target;
  }
  function isArrayOrNodeList(els) {
    if (els === null) {
      return false;
    }

    return Array.isArray(els) || canUseDOM && typeof els.length === 'number';
  }
  function getTarget(target) {
    var els = findDOMElements(target);

    if (isArrayOrNodeList(els)) {
      return els[0];
    }

    return els;
  }
  var defaultToggleEvents = ['touchstart', 'click'];
  function addMultipleEventListeners(_els, handler, _events, useCapture) {
    var els = _els;

    if (!isArrayOrNodeList(els)) {
      els = [els];
    }

    var events = _events;

    if (typeof events === 'string') {
      events = events.split(/\s+/);
    }

    if (!isArrayOrNodeList(els) || typeof handler !== 'function' || !Array.isArray(events)) {
      throw new Error("\n      The first argument of this function must be DOM node or an array on DOM nodes or NodeList.\n      The second must be a function.\n      The third is a string or an array of strings that represents DOM events\n    ");
    }

    Array.prototype.forEach.call(events, function (event) {
      Array.prototype.forEach.call(els, function (el) {
        el.addEventListener(event, handler, useCapture);
      });
    });
    return function removeEvents() {
      Array.prototype.forEach.call(events, function (event) {
        Array.prototype.forEach.call(els, function (el) {
          el.removeEventListener(event, handler, useCapture);
        });
      });
    };
  }
  var focusableElements = ['a[href]', 'area[href]', 'input:not([disabled]):not([type=hidden])', 'select:not([disabled])', 'textarea:not([disabled])', 'button:not([disabled])', 'object', 'embed', '[tabindex]:not(.modal)', 'audio[controls]', 'video[controls]', '[contenteditable]:not([contenteditable="false"])'];

  var utils = /*#__PURE__*/Object.freeze({
    getScrollbarWidth: getScrollbarWidth,
    setScrollbarWidth: setScrollbarWidth,
    isBodyOverflowing: isBodyOverflowing,
    getOriginalBodyPadding: getOriginalBodyPadding,
    conditionallyUpdateScrollbar: conditionallyUpdateScrollbar,
    setGlobalCssModule: setGlobalCssModule,
    mapToCssModules: mapToCssModules,
    omit: omit,
    pick: pick,
    warnOnce: warnOnce,
    deprecated: deprecated,
    DOMElement: DOMElement,
    targetPropType: targetPropType,
    TransitionTimeouts: TransitionTimeouts,
    TransitionPropTypeKeys: TransitionPropTypeKeys,
    TransitionStatuses: TransitionStatuses,
    keyCodes: keyCodes,
    PopperPlacements: PopperPlacements,
    canUseDOM: canUseDOM,
    isReactRefObj: isReactRefObj,
    findDOMElements: findDOMElements,
    isArrayOrNodeList: isArrayOrNodeList,
    getTarget: getTarget,
    defaultToggleEvents: defaultToggleEvents,
    addMultipleEventListeners: addMultipleEventListeners,
    focusableElements: focusableElements
  });

  var propTypes$1 = {
    tag: propTypes.oneOfType([propTypes.func, propTypes.string]),
    fluid: propTypes.bool,
    className: propTypes.string,
    cssModule: propTypes.object
  };
  var defaultProps = {
    tag: 'div'
  };

  var Container = function Container(props) {
    var className = props.className,
        cssModule = props.cssModule,
        fluid = props.fluid,
        Tag = props.tag,
        attributes = _objectWithoutPropertiesLoose(props, ["className", "cssModule", "fluid", "tag"]);

    var classes = mapToCssModules(classnames(className, fluid ? 'container-fluid' : 'container'), cssModule);
    return React__default.createElement(Tag, _extends({}, attributes, {
      className: classes
    }));
  };

  Container.propTypes = propTypes$1;
  Container.defaultProps = defaultProps;

  var propTypes$2 = {
    tag: propTypes.oneOfType([propTypes.func, propTypes.string]),
    noGutters: propTypes.bool,
    className: propTypes.string,
    cssModule: propTypes.object,
    form: propTypes.bool
  };
  var defaultProps$1 = {
    tag: 'div'
  };

  var Row = function Row(props) {
    var className = props.className,
        cssModule = props.cssModule,
        noGutters = props.noGutters,
        Tag = props.tag,
        form = props.form,
        attributes = _objectWithoutPropertiesLoose(props, ["className", "cssModule", "noGutters", "tag", "form"]);

    var classes = mapToCssModules(classnames(className, noGutters ? 'no-gutters' : null, form ? 'form-row' : 'row'), cssModule);
    return React__default.createElement(Tag, _extends({}, attributes, {
      className: classes
    }));
  };

  Row.propTypes = propTypes$2;
  Row.defaultProps = defaultProps$1;

  /**
   * lodash 3.0.2 (Custom Build) <https://lodash.com/>
   * Build: `lodash modern modularize exports="npm" -o ./`
   * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
   * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
   * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
   * Available under MIT license <https://lodash.com/license>
   */

  /**
   * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
   * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
   *
   * @static
   * @memberOf _
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is an object, else `false`.
   * @example
   *
   * _.isObject({});
   * // => true
   *
   * _.isObject([1, 2, 3]);
   * // => true
   *
   * _.isObject(1);
   * // => false
   */
  function isObject$1(value) {
    // Avoid a V8 JIT bug in Chrome 19-20.
    // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
    var type = typeof value;
    return !!value && (type == 'object' || type == 'function');
  }

  var lodash_isobject = isObject$1;

  var colWidths = ['xs', 'sm', 'md', 'lg', 'xl'];
  var stringOrNumberProp = propTypes.oneOfType([propTypes.number, propTypes.string]);
  var columnProps = propTypes.oneOfType([propTypes.bool, propTypes.number, propTypes.string, propTypes.shape({
    size: propTypes.oneOfType([propTypes.bool, propTypes.number, propTypes.string]),
    push: deprecated(stringOrNumberProp, 'Please use the prop "order"'),
    pull: deprecated(stringOrNumberProp, 'Please use the prop "order"'),
    order: stringOrNumberProp,
    offset: stringOrNumberProp
  })]);
  var propTypes$3 = {
    tag: propTypes.oneOfType([propTypes.func, propTypes.string]),
    xs: columnProps,
    sm: columnProps,
    md: columnProps,
    lg: columnProps,
    xl: columnProps,
    className: propTypes.string,
    cssModule: propTypes.object,
    widths: propTypes.array
  };
  var defaultProps$2 = {
    tag: 'div',
    widths: colWidths
  };

  var getColumnSizeClass = function getColumnSizeClass(isXs, colWidth, colSize) {
    if (colSize === true || colSize === '') {
      return isXs ? 'col' : "col-" + colWidth;
    } else if (colSize === 'auto') {
      return isXs ? 'col-auto' : "col-" + colWidth + "-auto";
    }

    return isXs ? "col-" + colSize : "col-" + colWidth + "-" + colSize;
  };

  var Col = function Col(props) {
    var className = props.className,
        cssModule = props.cssModule,
        widths = props.widths,
        Tag = props.tag,
        attributes = _objectWithoutPropertiesLoose(props, ["className", "cssModule", "widths", "tag"]);

    var colClasses = [];
    widths.forEach(function (colWidth, i) {
      var columnProp = props[colWidth];
      delete attributes[colWidth];

      if (!columnProp && columnProp !== '') {
        return;
      }

      var isXs = !i;

      if (lodash_isobject(columnProp)) {
        var _classNames;

        var colSizeInterfix = isXs ? '-' : "-" + colWidth + "-";
        var colClass = getColumnSizeClass(isXs, colWidth, columnProp.size);
        colClasses.push(mapToCssModules(classnames((_classNames = {}, _classNames[colClass] = columnProp.size || columnProp.size === '', _classNames["order" + colSizeInterfix + columnProp.order] = columnProp.order || columnProp.order === 0, _classNames["offset" + colSizeInterfix + columnProp.offset] = columnProp.offset || columnProp.offset === 0, _classNames)), cssModule));
      } else {
        var _colClass = getColumnSizeClass(isXs, colWidth, columnProp);

        colClasses.push(_colClass);
      }
    });

    if (!colClasses.length) {
      colClasses.push('col');
    }

    var classes = mapToCssModules(classnames(className, colClasses), cssModule);
    return React__default.createElement(Tag, _extends({}, attributes, {
      className: classes
    }));
  };

  Col.propTypes = propTypes$3;
  Col.defaultProps = defaultProps$2;

  var propTypes$4 = {
    light: propTypes.bool,
    dark: propTypes.bool,
    inverse: deprecated(propTypes.bool, 'Please use the prop "dark"'),
    full: propTypes.bool,
    fixed: propTypes.string,
    sticky: propTypes.string,
    color: propTypes.string,
    role: propTypes.string,
    tag: propTypes.oneOfType([propTypes.func, propTypes.string]),
    className: propTypes.string,
    cssModule: propTypes.object,
    toggleable: deprecated(propTypes.oneOfType([propTypes.bool, propTypes.string]), 'Please use the prop "expand"'),
    expand: propTypes.oneOfType([propTypes.bool, propTypes.string])
  };
  var defaultProps$3 = {
    tag: 'nav',
    expand: false
  };

  var getExpandClass = function getExpandClass(expand) {
    if (expand === false) {
      return false;
    } else if (expand === true || expand === 'xs') {
      return 'navbar-expand';
    }

    return "navbar-expand-" + expand;
  }; // To better maintain backwards compatibility while toggleable is deprecated.
  // We must map breakpoints to the next breakpoint so that toggleable and expand do the same things at the same breakpoint.


  var toggleableToExpand = {
    xs: 'sm',
    sm: 'md',
    md: 'lg',
    lg: 'xl'
  };

  var getToggleableClass = function getToggleableClass(toggleable) {
    if (toggleable === undefined || toggleable === 'xl') {
      return false;
    } else if (toggleable === false) {
      return 'navbar-expand';
    }

    return "navbar-expand-" + (toggleable === true ? 'sm' : toggleableToExpand[toggleable] || toggleable);
  };

  var Navbar = function Navbar(props) {
    var _classNames;

    var toggleable = props.toggleable,
        expand = props.expand,
        className = props.className,
        cssModule = props.cssModule,
        light = props.light,
        dark = props.dark,
        inverse = props.inverse,
        fixed = props.fixed,
        sticky = props.sticky,
        color = props.color,
        Tag = props.tag,
        attributes = _objectWithoutPropertiesLoose(props, ["toggleable", "expand", "className", "cssModule", "light", "dark", "inverse", "fixed", "sticky", "color", "tag"]);

    var classes = mapToCssModules(classnames(className, 'navbar', getExpandClass(expand) || getToggleableClass(toggleable), (_classNames = {
      'navbar-light': light,
      'navbar-dark': inverse || dark
    }, _classNames["bg-" + color] = color, _classNames["fixed-" + fixed] = fixed, _classNames["sticky-" + sticky] = sticky, _classNames)), cssModule);
    return React__default.createElement(Tag, _extends({}, attributes, {
      className: classes
    }));
  };

  Navbar.propTypes = propTypes$4;
  Navbar.defaultProps = defaultProps$3;

  var propTypes$5 = {
    tag: propTypes.oneOfType([propTypes.func, propTypes.string]),
    className: propTypes.string,
    cssModule: propTypes.object
  };
  var defaultProps$4 = {
    tag: 'a'
  };

  var NavbarBrand = function NavbarBrand(props) {
    var className = props.className,
        cssModule = props.cssModule,
        Tag = props.tag,
        attributes = _objectWithoutPropertiesLoose(props, ["className", "cssModule", "tag"]);

    var classes = mapToCssModules(classnames(className, 'navbar-brand'), cssModule);
    return React__default.createElement(Tag, _extends({}, attributes, {
      className: classes
    }));
  };

  NavbarBrand.propTypes = propTypes$5;
  NavbarBrand.defaultProps = defaultProps$4;

  var propTypes$6 = {
    tag: propTypes.oneOfType([propTypes.func, propTypes.string]),
    type: propTypes.string,
    className: propTypes.string,
    cssModule: propTypes.object,
    children: propTypes.node
  };
  var defaultProps$5 = {
    tag: 'button',
    type: 'button'
  };

  var NavbarToggler = function NavbarToggler(props) {
    var className = props.className,
        cssModule = props.cssModule,
        children = props.children,
        Tag = props.tag,
        attributes = _objectWithoutPropertiesLoose(props, ["className", "cssModule", "children", "tag"]);

    var classes = mapToCssModules(classnames(className, 'navbar-toggler'), cssModule);
    return React__default.createElement(Tag, _extends({}, attributes, {
      className: classes
    }), children || React__default.createElement("span", {
      className: mapToCssModules('navbar-toggler-icon', cssModule)
    }));
  };

  NavbarToggler.propTypes = propTypes$6;
  NavbarToggler.defaultProps = defaultProps$5;

  var propTypes$7 = {
    tabs: propTypes.bool,
    pills: propTypes.bool,
    vertical: propTypes.oneOfType([propTypes.bool, propTypes.string]),
    horizontal: propTypes.string,
    justified: propTypes.bool,
    fill: propTypes.bool,
    navbar: propTypes.bool,
    card: propTypes.bool,
    tag: propTypes.oneOfType([propTypes.func, propTypes.string]),
    className: propTypes.string,
    cssModule: propTypes.object
  };
  var defaultProps$6 = {
    tag: 'ul',
    vertical: false
  };

  var getVerticalClass = function getVerticalClass(vertical) {
    if (vertical === false) {
      return false;
    } else if (vertical === true || vertical === 'xs') {
      return 'flex-column';
    }

    return "flex-" + vertical + "-column";
  };

  var Nav = function Nav(props) {
    var className = props.className,
        cssModule = props.cssModule,
        tabs = props.tabs,
        pills = props.pills,
        vertical = props.vertical,
        horizontal = props.horizontal,
        justified = props.justified,
        fill = props.fill,
        navbar = props.navbar,
        card = props.card,
        Tag = props.tag,
        attributes = _objectWithoutPropertiesLoose(props, ["className", "cssModule", "tabs", "pills", "vertical", "horizontal", "justified", "fill", "navbar", "card", "tag"]);

    var classes = mapToCssModules(classnames(className, navbar ? 'navbar-nav' : 'nav', horizontal ? "justify-content-" + horizontal : false, getVerticalClass(vertical), {
      'nav-tabs': tabs,
      'card-header-tabs': card && tabs,
      'nav-pills': pills,
      'card-header-pills': card && pills,
      'nav-justified': justified,
      'nav-fill': fill
    }), cssModule);
    return React__default.createElement(Tag, _extends({}, attributes, {
      className: classes
    }));
  };

  Nav.propTypes = propTypes$7;
  Nav.defaultProps = defaultProps$6;

  var propTypes$8 = {
    tag: propTypes.oneOfType([propTypes.func, propTypes.string]),
    active: propTypes.bool,
    className: propTypes.string,
    cssModule: propTypes.object
  };
  var defaultProps$7 = {
    tag: 'li'
  };

  var NavItem = function NavItem(props) {
    var className = props.className,
        cssModule = props.cssModule,
        active = props.active,
        Tag = props.tag,
        attributes = _objectWithoutPropertiesLoose(props, ["className", "cssModule", "active", "tag"]);

    var classes = mapToCssModules(classnames(className, 'nav-item', active ? 'active' : false), cssModule);
    return React__default.createElement(Tag, _extends({}, attributes, {
      className: classes
    }));
  };

  NavItem.propTypes = propTypes$8;
  NavItem.defaultProps = defaultProps$7;

  var _createClass$1 = function () {
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

  function _objectWithoutProperties$1(obj, keys) {
    var target = {};

    for (var i in obj) {
      if (keys.indexOf(i) >= 0) continue;
      if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
      target[i] = obj[i];
    }

    return target;
  }

  function _classCallCheck$1(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _possibleConstructorReturn$1(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  function _inherits$1(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  var Manager = function (_Component) {
    _inherits$1(Manager, _Component);

    function Manager() {
      var _ref;

      var _temp, _this, _ret;

      _classCallCheck$1(this, Manager);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _ret = (_temp = (_this = _possibleConstructorReturn$1(this, (_ref = Manager.__proto__ || Object.getPrototypeOf(Manager)).call.apply(_ref, [this].concat(args))), _this), _this._setTargetNode = function (node) {
        _this._targetNode = node;
      }, _this._getTargetNode = function () {
        return _this._targetNode;
      }, _temp), _possibleConstructorReturn$1(_this, _ret);
    }

    _createClass$1(Manager, [{
      key: 'getChildContext',
      value: function getChildContext() {
        return {
          popperManager: {
            setTargetNode: this._setTargetNode,
            getTargetNode: this._getTargetNode
          }
        };
      }
    }, {
      key: 'render',
      value: function render() {
        var _props = this.props,
            tag = _props.tag,
            children = _props.children,
            restProps = _objectWithoutProperties$1(_props, ['tag', 'children']);

        if (tag !== false) {
          return React.createElement(tag, restProps, children);
        } else {
          return children;
        }
      }
    }]);

    return Manager;
  }(React.Component);

  Manager.childContextTypes = {
    popperManager: propTypes.object.isRequired
  };
  Manager.propTypes = {
    tag: propTypes.oneOfType([propTypes.string, propTypes.bool]),
    children: propTypes.oneOfType([propTypes.node, propTypes.func])
  };
  Manager.defaultProps = {
    tag: 'div'
  };

  var _extends$1 = Object.assign || function (target) {
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

  function _objectWithoutProperties$2(obj, keys) {
    var target = {};

    for (var i in obj) {
      if (keys.indexOf(i) >= 0) continue;
      if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
      target[i] = obj[i];
    }

    return target;
  }

  var Target = function Target(props, context) {
    var _props$component = props.component,
        component = _props$component === undefined ? 'div' : _props$component,
        innerRef = props.innerRef,
        children = props.children,
        restProps = _objectWithoutProperties$2(props, ['component', 'innerRef', 'children']);

    var popperManager = context.popperManager;

    var targetRef = function targetRef(node) {
      popperManager.setTargetNode(node);

      if (typeof innerRef === 'function') {
        innerRef(node);
      }
    };

    if (typeof children === 'function') {
      var targetProps = {
        ref: targetRef
      };
      return children({
        targetProps: targetProps,
        restProps: restProps
      });
    }

    var componentProps = _extends$1({}, restProps);

    if (typeof component === 'string') {
      componentProps.ref = targetRef;
    } else {
      componentProps.innerRef = targetRef;
    }

    return React.createElement(component, componentProps, children);
  };

  Target.contextTypes = {
    popperManager: propTypes.object.isRequired
  };
  Target.propTypes = {
    component: propTypes.oneOfType([propTypes.node, propTypes.func]),
    innerRef: propTypes.func,
    children: propTypes.oneOfType([propTypes.node, propTypes.func])
  };

  /**!
   * @fileOverview Kickass library to create and place poppers near their reference elements.
   * @version 1.14.6
   * @license
   * Copyright (c) 2016 Federico Zivolo and contributors
   *
   * Permission is hereby granted, free of charge, to any person obtaining a copy
   * of this software and associated documentation files (the "Software"), to deal
   * in the Software without restriction, including without limitation the rights
   * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
   * copies of the Software, and to permit persons to whom the Software is
   * furnished to do so, subject to the following conditions:
   *
   * The above copyright notice and this permission notice shall be included in all
   * copies or substantial portions of the Software.
   *
   * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
   * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
   * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
   * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
   * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
   * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
   * SOFTWARE.
   */
  var isBrowser = typeof window !== 'undefined' && typeof document !== 'undefined';
  var longerTimeoutBrowsers = ['Edge', 'Trident', 'Firefox'];
  var timeoutDuration = 0;

  for (var i = 0; i < longerTimeoutBrowsers.length; i += 1) {
    if (isBrowser && navigator.userAgent.indexOf(longerTimeoutBrowsers[i]) >= 0) {
      timeoutDuration = 1;
      break;
    }
  }

  function microtaskDebounce(fn) {
    var called = false;
    return function () {
      if (called) {
        return;
      }

      called = true;
      window.Promise.resolve().then(function () {
        called = false;
        fn();
      });
    };
  }

  function taskDebounce(fn) {
    var scheduled = false;
    return function () {
      if (!scheduled) {
        scheduled = true;
        setTimeout(function () {
          scheduled = false;
          fn();
        }, timeoutDuration);
      }
    };
  }

  var supportsMicroTasks = isBrowser && window.Promise;
  /**
  * Create a debounced version of a method, that's asynchronously deferred
  * but called in the minimum time possible.
  *
  * @method
  * @memberof Popper.Utils
  * @argument {Function} fn
  * @returns {Function}
  */

  var debounce = supportsMicroTasks ? microtaskDebounce : taskDebounce;
  /**
   * Check if the given variable is a function
   * @method
   * @memberof Popper.Utils
   * @argument {Any} functionToCheck - variable to check
   * @returns {Boolean} answer to: is a function?
   */

  function isFunction$1(functionToCheck) {
    var getType = {};
    return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
  }
  /**
   * Get CSS computed property of the given element
   * @method
   * @memberof Popper.Utils
   * @argument {Eement} element
   * @argument {String} property
   */


  function getStyleComputedProperty(element, property) {
    if (element.nodeType !== 1) {
      return [];
    } // NOTE: 1 DOM access here


    var window = element.ownerDocument.defaultView;
    var css = window.getComputedStyle(element, null);
    return property ? css[property] : css;
  }
  /**
   * Returns the parentNode or the host of the element
   * @method
   * @memberof Popper.Utils
   * @argument {Element} element
   * @returns {Element} parent
   */


  function getParentNode(element) {
    if (element.nodeName === 'HTML') {
      return element;
    }

    return element.parentNode || element.host;
  }
  /**
   * Returns the scrolling parent of the given element
   * @method
   * @memberof Popper.Utils
   * @argument {Element} element
   * @returns {Element} scroll parent
   */


  function getScrollParent(element) {
    // Return body, `getScroll` will take care to get the correct `scrollTop` from it
    if (!element) {
      return document.body;
    }

    switch (element.nodeName) {
      case 'HTML':
      case 'BODY':
        return element.ownerDocument.body;

      case '#document':
        return element.body;
    } // Firefox want us to check `-x` and `-y` variations as well


    var _getStyleComputedProp = getStyleComputedProperty(element),
        overflow = _getStyleComputedProp.overflow,
        overflowX = _getStyleComputedProp.overflowX,
        overflowY = _getStyleComputedProp.overflowY;

    if (/(auto|scroll|overlay)/.test(overflow + overflowY + overflowX)) {
      return element;
    }

    return getScrollParent(getParentNode(element));
  }

  var isIE11 = isBrowser && !!(window.MSInputMethodContext && document.documentMode);
  var isIE10 = isBrowser && /MSIE 10/.test(navigator.userAgent);
  /**
   * Determines if the browser is Internet Explorer
   * @method
   * @memberof Popper.Utils
   * @param {Number} version to check
   * @returns {Boolean} isIE
   */

  function isIE(version) {
    if (version === 11) {
      return isIE11;
    }

    if (version === 10) {
      return isIE10;
    }

    return isIE11 || isIE10;
  }
  /**
   * Returns the offset parent of the given element
   * @method
   * @memberof Popper.Utils
   * @argument {Element} element
   * @returns {Element} offset parent
   */


  function getOffsetParent(element) {
    if (!element) {
      return document.documentElement;
    }

    var noOffsetParent = isIE(10) ? document.body : null; // NOTE: 1 DOM access here

    var offsetParent = element.offsetParent || null; // Skip hidden elements which don't have an offsetParent

    while (offsetParent === noOffsetParent && element.nextElementSibling) {
      offsetParent = (element = element.nextElementSibling).offsetParent;
    }

    var nodeName = offsetParent && offsetParent.nodeName;

    if (!nodeName || nodeName === 'BODY' || nodeName === 'HTML') {
      return element ? element.ownerDocument.documentElement : document.documentElement;
    } // .offsetParent will return the closest TH, TD or TABLE in case
    // no offsetParent is present, I hate this job...


    if (['TH', 'TD', 'TABLE'].indexOf(offsetParent.nodeName) !== -1 && getStyleComputedProperty(offsetParent, 'position') === 'static') {
      return getOffsetParent(offsetParent);
    }

    return offsetParent;
  }

  function isOffsetContainer(element) {
    var nodeName = element.nodeName;

    if (nodeName === 'BODY') {
      return false;
    }

    return nodeName === 'HTML' || getOffsetParent(element.firstElementChild) === element;
  }
  /**
   * Finds the root node (document, shadowDOM root) of the given element
   * @method
   * @memberof Popper.Utils
   * @argument {Element} node
   * @returns {Element} root node
   */


  function getRoot(node) {
    if (node.parentNode !== null) {
      return getRoot(node.parentNode);
    }

    return node;
  }
  /**
   * Finds the offset parent common to the two provided nodes
   * @method
   * @memberof Popper.Utils
   * @argument {Element} element1
   * @argument {Element} element2
   * @returns {Element} common offset parent
   */


  function findCommonOffsetParent(element1, element2) {
    // This check is needed to avoid errors in case one of the elements isn't defined for any reason
    if (!element1 || !element1.nodeType || !element2 || !element2.nodeType) {
      return document.documentElement;
    } // Here we make sure to give as "start" the element that comes first in the DOM


    var order = element1.compareDocumentPosition(element2) & Node.DOCUMENT_POSITION_FOLLOWING;
    var start = order ? element1 : element2;
    var end = order ? element2 : element1; // Get common ancestor container

    var range = document.createRange();
    range.setStart(start, 0);
    range.setEnd(end, 0);
    var commonAncestorContainer = range.commonAncestorContainer; // Both nodes are inside #document

    if (element1 !== commonAncestorContainer && element2 !== commonAncestorContainer || start.contains(end)) {
      if (isOffsetContainer(commonAncestorContainer)) {
        return commonAncestorContainer;
      }

      return getOffsetParent(commonAncestorContainer);
    } // one of the nodes is inside shadowDOM, find which one


    var element1root = getRoot(element1);

    if (element1root.host) {
      return findCommonOffsetParent(element1root.host, element2);
    } else {
      return findCommonOffsetParent(element1, getRoot(element2).host);
    }
  }
  /**
   * Gets the scroll value of the given element in the given side (top and left)
   * @method
   * @memberof Popper.Utils
   * @argument {Element} element
   * @argument {String} side `top` or `left`
   * @returns {number} amount of scrolled pixels
   */


  function getScroll(element) {
    var side = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'top';
    var upperSide = side === 'top' ? 'scrollTop' : 'scrollLeft';
    var nodeName = element.nodeName;

    if (nodeName === 'BODY' || nodeName === 'HTML') {
      var html = element.ownerDocument.documentElement;
      var scrollingElement = element.ownerDocument.scrollingElement || html;
      return scrollingElement[upperSide];
    }

    return element[upperSide];
  }
  /*
   * Sum or subtract the element scroll values (left and top) from a given rect object
   * @method
   * @memberof Popper.Utils
   * @param {Object} rect - Rect object you want to change
   * @param {HTMLElement} element - The element from the function reads the scroll values
   * @param {Boolean} subtract - set to true if you want to subtract the scroll values
   * @return {Object} rect - The modifier rect object
   */


  function includeScroll(rect, element) {
    var subtract = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    var scrollTop = getScroll(element, 'top');
    var scrollLeft = getScroll(element, 'left');
    var modifier = subtract ? -1 : 1;
    rect.top += scrollTop * modifier;
    rect.bottom += scrollTop * modifier;
    rect.left += scrollLeft * modifier;
    rect.right += scrollLeft * modifier;
    return rect;
  }
  /*
   * Helper to detect borders of a given element
   * @method
   * @memberof Popper.Utils
   * @param {CSSStyleDeclaration} styles
   * Result of `getStyleComputedProperty` on the given element
   * @param {String} axis - `x` or `y`
   * @return {number} borders - The borders size of the given axis
   */


  function getBordersSize(styles, axis) {
    var sideA = axis === 'x' ? 'Left' : 'Top';
    var sideB = sideA === 'Left' ? 'Right' : 'Bottom';
    return parseFloat(styles['border' + sideA + 'Width'], 10) + parseFloat(styles['border' + sideB + 'Width'], 10);
  }

  function getSize(axis, body, html, computedStyle) {
    return Math.max(body['offset' + axis], body['scroll' + axis], html['client' + axis], html['offset' + axis], html['scroll' + axis], isIE(10) ? parseInt(html['offset' + axis]) + parseInt(computedStyle['margin' + (axis === 'Height' ? 'Top' : 'Left')]) + parseInt(computedStyle['margin' + (axis === 'Height' ? 'Bottom' : 'Right')]) : 0);
  }

  function getWindowSizes(document) {
    var body = document.body;
    var html = document.documentElement;
    var computedStyle = isIE(10) && getComputedStyle(html);
    return {
      height: getSize('Height', body, html, computedStyle),
      width: getSize('Width', body, html, computedStyle)
    };
  }

  var classCallCheck = function classCallCheck(instance, Constructor) {
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

  var defineProperty = function defineProperty(obj, key, value) {
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

  var _extends$2 = Object.assign || function (target) {
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
   * Given element offsets, generate an output similar to getBoundingClientRect
   * @method
   * @memberof Popper.Utils
   * @argument {Object} offsets
   * @returns {Object} ClientRect like output
   */


  function getClientRect(offsets) {
    return _extends$2({}, offsets, {
      right: offsets.left + offsets.width,
      bottom: offsets.top + offsets.height
    });
  }
  /**
   * Get bounding client rect of given element
   * @method
   * @memberof Popper.Utils
   * @param {HTMLElement} element
   * @return {Object} client rect
   */


  function getBoundingClientRect(element) {
    var rect = {}; // IE10 10 FIX: Please, don't ask, the element isn't
    // considered in DOM in some circumstances...
    // This isn't reproducible in IE10 compatibility mode of IE11

    try {
      if (isIE(10)) {
        rect = element.getBoundingClientRect();
        var scrollTop = getScroll(element, 'top');
        var scrollLeft = getScroll(element, 'left');
        rect.top += scrollTop;
        rect.left += scrollLeft;
        rect.bottom += scrollTop;
        rect.right += scrollLeft;
      } else {
        rect = element.getBoundingClientRect();
      }
    } catch (e) {}

    var result = {
      left: rect.left,
      top: rect.top,
      width: rect.right - rect.left,
      height: rect.bottom - rect.top
    }; // subtract scrollbar size from sizes

    var sizes = element.nodeName === 'HTML' ? getWindowSizes(element.ownerDocument) : {};
    var width = sizes.width || element.clientWidth || result.right - result.left;
    var height = sizes.height || element.clientHeight || result.bottom - result.top;
    var horizScrollbar = element.offsetWidth - width;
    var vertScrollbar = element.offsetHeight - height; // if an hypothetical scrollbar is detected, we must be sure it's not a `border`
    // we make this check conditional for performance reasons

    if (horizScrollbar || vertScrollbar) {
      var styles = getStyleComputedProperty(element);
      horizScrollbar -= getBordersSize(styles, 'x');
      vertScrollbar -= getBordersSize(styles, 'y');
      result.width -= horizScrollbar;
      result.height -= vertScrollbar;
    }

    return getClientRect(result);
  }

  function getOffsetRectRelativeToArbitraryNode(children, parent) {
    var fixedPosition = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    var isIE10 = isIE(10);
    var isHTML = parent.nodeName === 'HTML';
    var childrenRect = getBoundingClientRect(children);
    var parentRect = getBoundingClientRect(parent);
    var scrollParent = getScrollParent(children);
    var styles = getStyleComputedProperty(parent);
    var borderTopWidth = parseFloat(styles.borderTopWidth, 10);
    var borderLeftWidth = parseFloat(styles.borderLeftWidth, 10); // In cases where the parent is fixed, we must ignore negative scroll in offset calc

    if (fixedPosition && isHTML) {
      parentRect.top = Math.max(parentRect.top, 0);
      parentRect.left = Math.max(parentRect.left, 0);
    }

    var offsets = getClientRect({
      top: childrenRect.top - parentRect.top - borderTopWidth,
      left: childrenRect.left - parentRect.left - borderLeftWidth,
      width: childrenRect.width,
      height: childrenRect.height
    });
    offsets.marginTop = 0;
    offsets.marginLeft = 0; // Subtract margins of documentElement in case it's being used as parent
    // we do this only on HTML because it's the only element that behaves
    // differently when margins are applied to it. The margins are included in
    // the box of the documentElement, in the other cases not.

    if (!isIE10 && isHTML) {
      var marginTop = parseFloat(styles.marginTop, 10);
      var marginLeft = parseFloat(styles.marginLeft, 10);
      offsets.top -= borderTopWidth - marginTop;
      offsets.bottom -= borderTopWidth - marginTop;
      offsets.left -= borderLeftWidth - marginLeft;
      offsets.right -= borderLeftWidth - marginLeft; // Attach marginTop and marginLeft because in some circumstances we may need them

      offsets.marginTop = marginTop;
      offsets.marginLeft = marginLeft;
    }

    if (isIE10 && !fixedPosition ? parent.contains(scrollParent) : parent === scrollParent && scrollParent.nodeName !== 'BODY') {
      offsets = includeScroll(offsets, parent);
    }

    return offsets;
  }

  function getViewportOffsetRectRelativeToArtbitraryNode(element) {
    var excludeScroll = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    var html = element.ownerDocument.documentElement;
    var relativeOffset = getOffsetRectRelativeToArbitraryNode(element, html);
    var width = Math.max(html.clientWidth, window.innerWidth || 0);
    var height = Math.max(html.clientHeight, window.innerHeight || 0);
    var scrollTop = !excludeScroll ? getScroll(html) : 0;
    var scrollLeft = !excludeScroll ? getScroll(html, 'left') : 0;
    var offset = {
      top: scrollTop - relativeOffset.top + relativeOffset.marginTop,
      left: scrollLeft - relativeOffset.left + relativeOffset.marginLeft,
      width: width,
      height: height
    };
    return getClientRect(offset);
  }
  /**
   * Check if the given element is fixed or is inside a fixed parent
   * @method
   * @memberof Popper.Utils
   * @argument {Element} element
   * @argument {Element} customContainer
   * @returns {Boolean} answer to "isFixed?"
   */


  function isFixed(element) {
    var nodeName = element.nodeName;

    if (nodeName === 'BODY' || nodeName === 'HTML') {
      return false;
    }

    if (getStyleComputedProperty(element, 'position') === 'fixed') {
      return true;
    }

    return isFixed(getParentNode(element));
  }
  /**
   * Finds the first parent of an element that has a transformed property defined
   * @method
   * @memberof Popper.Utils
   * @argument {Element} element
   * @returns {Element} first transformed parent or documentElement
   */


  function getFixedPositionOffsetParent(element) {
    // This check is needed to avoid errors in case one of the elements isn't defined for any reason
    if (!element || !element.parentElement || isIE()) {
      return document.documentElement;
    }

    var el = element.parentElement;

    while (el && getStyleComputedProperty(el, 'transform') === 'none') {
      el = el.parentElement;
    }

    return el || document.documentElement;
  }
  /**
   * Computed the boundaries limits and return them
   * @method
   * @memberof Popper.Utils
   * @param {HTMLElement} popper
   * @param {HTMLElement} reference
   * @param {number} padding
   * @param {HTMLElement} boundariesElement - Element used to define the boundaries
   * @param {Boolean} fixedPosition - Is in fixed position mode
   * @returns {Object} Coordinates of the boundaries
   */


  function getBoundaries(popper, reference, padding, boundariesElement) {
    var fixedPosition = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false; // NOTE: 1 DOM access here

    var boundaries = {
      top: 0,
      left: 0
    };
    var offsetParent = fixedPosition ? getFixedPositionOffsetParent(popper) : findCommonOffsetParent(popper, reference); // Handle viewport case

    if (boundariesElement === 'viewport') {
      boundaries = getViewportOffsetRectRelativeToArtbitraryNode(offsetParent, fixedPosition);
    } else {
      // Handle other cases based on DOM element used as boundaries
      var boundariesNode = void 0;

      if (boundariesElement === 'scrollParent') {
        boundariesNode = getScrollParent(getParentNode(reference));

        if (boundariesNode.nodeName === 'BODY') {
          boundariesNode = popper.ownerDocument.documentElement;
        }
      } else if (boundariesElement === 'window') {
        boundariesNode = popper.ownerDocument.documentElement;
      } else {
        boundariesNode = boundariesElement;
      }

      var offsets = getOffsetRectRelativeToArbitraryNode(boundariesNode, offsetParent, fixedPosition); // In case of HTML, we need a different computation

      if (boundariesNode.nodeName === 'HTML' && !isFixed(offsetParent)) {
        var _getWindowSizes = getWindowSizes(popper.ownerDocument),
            height = _getWindowSizes.height,
            width = _getWindowSizes.width;

        boundaries.top += offsets.top - offsets.marginTop;
        boundaries.bottom = height + offsets.top;
        boundaries.left += offsets.left - offsets.marginLeft;
        boundaries.right = width + offsets.left;
      } else {
        // for all the other DOM elements, this one is good
        boundaries = offsets;
      }
    } // Add paddings


    padding = padding || 0;
    var isPaddingNumber = typeof padding === 'number';
    boundaries.left += isPaddingNumber ? padding : padding.left || 0;
    boundaries.top += isPaddingNumber ? padding : padding.top || 0;
    boundaries.right -= isPaddingNumber ? padding : padding.right || 0;
    boundaries.bottom -= isPaddingNumber ? padding : padding.bottom || 0;
    return boundaries;
  }

  function getArea(_ref) {
    var width = _ref.width,
        height = _ref.height;
    return width * height;
  }
  /**
   * Utility used to transform the `auto` placement to the placement with more
   * available space.
   * @method
   * @memberof Popper.Utils
   * @argument {Object} data - The data object generated by update method
   * @argument {Object} options - Modifiers configuration and options
   * @returns {Object} The data object, properly modified
   */


  function computeAutoPlacement(placement, refRect, popper, reference, boundariesElement) {
    var padding = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 0;

    if (placement.indexOf('auto') === -1) {
      return placement;
    }

    var boundaries = getBoundaries(popper, reference, padding, boundariesElement);
    var rects = {
      top: {
        width: boundaries.width,
        height: refRect.top - boundaries.top
      },
      right: {
        width: boundaries.right - refRect.right,
        height: boundaries.height
      },
      bottom: {
        width: boundaries.width,
        height: boundaries.bottom - refRect.bottom
      },
      left: {
        width: refRect.left - boundaries.left,
        height: boundaries.height
      }
    };
    var sortedAreas = Object.keys(rects).map(function (key) {
      return _extends$2({
        key: key
      }, rects[key], {
        area: getArea(rects[key])
      });
    }).sort(function (a, b) {
      return b.area - a.area;
    });
    var filteredAreas = sortedAreas.filter(function (_ref2) {
      var width = _ref2.width,
          height = _ref2.height;
      return width >= popper.clientWidth && height >= popper.clientHeight;
    });
    var computedPlacement = filteredAreas.length > 0 ? filteredAreas[0].key : sortedAreas[0].key;
    var variation = placement.split('-')[1];
    return computedPlacement + (variation ? '-' + variation : '');
  }
  /**
   * Get offsets to the reference element
   * @method
   * @memberof Popper.Utils
   * @param {Object} state
   * @param {Element} popper - the popper element
   * @param {Element} reference - the reference element (the popper will be relative to this)
   * @param {Element} fixedPosition - is in fixed position mode
   * @returns {Object} An object containing the offsets which will be applied to the popper
   */


  function getReferenceOffsets(state, popper, reference) {
    var fixedPosition = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
    var commonOffsetParent = fixedPosition ? getFixedPositionOffsetParent(popper) : findCommonOffsetParent(popper, reference);
    return getOffsetRectRelativeToArbitraryNode(reference, commonOffsetParent, fixedPosition);
  }
  /**
   * Get the outer sizes of the given element (offset size + margins)
   * @method
   * @memberof Popper.Utils
   * @argument {Element} element
   * @returns {Object} object containing width and height properties
   */


  function getOuterSizes(element) {
    var window = element.ownerDocument.defaultView;
    var styles = window.getComputedStyle(element);
    var x = parseFloat(styles.marginTop || 0) + parseFloat(styles.marginBottom || 0);
    var y = parseFloat(styles.marginLeft || 0) + parseFloat(styles.marginRight || 0);
    var result = {
      width: element.offsetWidth + y,
      height: element.offsetHeight + x
    };
    return result;
  }
  /**
   * Get the opposite placement of the given one
   * @method
   * @memberof Popper.Utils
   * @argument {String} placement
   * @returns {String} flipped placement
   */


  function getOppositePlacement(placement) {
    var hash = {
      left: 'right',
      right: 'left',
      bottom: 'top',
      top: 'bottom'
    };
    return placement.replace(/left|right|bottom|top/g, function (matched) {
      return hash[matched];
    });
  }
  /**
   * Get offsets to the popper
   * @method
   * @memberof Popper.Utils
   * @param {Object} position - CSS position the Popper will get applied
   * @param {HTMLElement} popper - the popper element
   * @param {Object} referenceOffsets - the reference offsets (the popper will be relative to this)
   * @param {String} placement - one of the valid placement options
   * @returns {Object} popperOffsets - An object containing the offsets which will be applied to the popper
   */


  function getPopperOffsets(popper, referenceOffsets, placement) {
    placement = placement.split('-')[0]; // Get popper node sizes

    var popperRect = getOuterSizes(popper); // Add position, width and height to our offsets object

    var popperOffsets = {
      width: popperRect.width,
      height: popperRect.height
    }; // depending by the popper placement we have to compute its offsets slightly differently

    var isHoriz = ['right', 'left'].indexOf(placement) !== -1;
    var mainSide = isHoriz ? 'top' : 'left';
    var secondarySide = isHoriz ? 'left' : 'top';
    var measurement = isHoriz ? 'height' : 'width';
    var secondaryMeasurement = !isHoriz ? 'height' : 'width';
    popperOffsets[mainSide] = referenceOffsets[mainSide] + referenceOffsets[measurement] / 2 - popperRect[measurement] / 2;

    if (placement === secondarySide) {
      popperOffsets[secondarySide] = referenceOffsets[secondarySide] - popperRect[secondaryMeasurement];
    } else {
      popperOffsets[secondarySide] = referenceOffsets[getOppositePlacement(secondarySide)];
    }

    return popperOffsets;
  }
  /**
   * Mimics the `find` method of Array
   * @method
   * @memberof Popper.Utils
   * @argument {Array} arr
   * @argument prop
   * @argument value
   * @returns index or -1
   */


  function find(arr, check) {
    // use native find if supported
    if (Array.prototype.find) {
      return arr.find(check);
    } // use `filter` to obtain the same behavior of `find`


    return arr.filter(check)[0];
  }
  /**
   * Return the index of the matching object
   * @method
   * @memberof Popper.Utils
   * @argument {Array} arr
   * @argument prop
   * @argument value
   * @returns index or -1
   */


  function findIndex(arr, prop, value) {
    // use native findIndex if supported
    if (Array.prototype.findIndex) {
      return arr.findIndex(function (cur) {
        return cur[prop] === value;
      });
    } // use `find` + `indexOf` if `findIndex` isn't supported


    var match = find(arr, function (obj) {
      return obj[prop] === value;
    });
    return arr.indexOf(match);
  }
  /**
   * Loop trough the list of modifiers and run them in order,
   * each of them will then edit the data object.
   * @method
   * @memberof Popper.Utils
   * @param {dataObject} data
   * @param {Array} modifiers
   * @param {String} ends - Optional modifier name used as stopper
   * @returns {dataObject}
   */


  function runModifiers(modifiers, data, ends) {
    var modifiersToRun = ends === undefined ? modifiers : modifiers.slice(0, findIndex(modifiers, 'name', ends));
    modifiersToRun.forEach(function (modifier) {
      if (modifier['function']) {
        // eslint-disable-line dot-notation
        console.warn('`modifier.function` is deprecated, use `modifier.fn`!');
      }

      var fn = modifier['function'] || modifier.fn; // eslint-disable-line dot-notation

      if (modifier.enabled && isFunction$1(fn)) {
        // Add properties to offsets to make them a complete clientRect object
        // we do this before each modifier to make sure the previous one doesn't
        // mess with these values
        data.offsets.popper = getClientRect(data.offsets.popper);
        data.offsets.reference = getClientRect(data.offsets.reference);
        data = fn(data, modifier);
      }
    });
    return data;
  }
  /**
   * Updates the position of the popper, computing the new offsets and applying
   * the new style.<br />
   * Prefer `scheduleUpdate` over `update` because of performance reasons.
   * @method
   * @memberof Popper
   */


  function update() {
    // if popper is destroyed, don't perform any further update
    if (this.state.isDestroyed) {
      return;
    }

    var data = {
      instance: this,
      styles: {},
      arrowStyles: {},
      attributes: {},
      flipped: false,
      offsets: {}
    }; // compute reference element offsets

    data.offsets.reference = getReferenceOffsets(this.state, this.popper, this.reference, this.options.positionFixed); // compute auto placement, store placement inside the data object,
    // modifiers will be able to edit `placement` if needed
    // and refer to originalPlacement to know the original value

    data.placement = computeAutoPlacement(this.options.placement, data.offsets.reference, this.popper, this.reference, this.options.modifiers.flip.boundariesElement, this.options.modifiers.flip.padding); // store the computed placement inside `originalPlacement`

    data.originalPlacement = data.placement;
    data.positionFixed = this.options.positionFixed; // compute the popper offsets

    data.offsets.popper = getPopperOffsets(this.popper, data.offsets.reference, data.placement);
    data.offsets.popper.position = this.options.positionFixed ? 'fixed' : 'absolute'; // run the modifiers

    data = runModifiers(this.modifiers, data); // the first `update` will call `onCreate` callback
    // the other ones will call `onUpdate` callback

    if (!this.state.isCreated) {
      this.state.isCreated = true;
      this.options.onCreate(data);
    } else {
      this.options.onUpdate(data);
    }
  }
  /**
   * Helper used to know if the given modifier is enabled.
   * @method
   * @memberof Popper.Utils
   * @returns {Boolean}
   */


  function isModifierEnabled(modifiers, modifierName) {
    return modifiers.some(function (_ref) {
      var name = _ref.name,
          enabled = _ref.enabled;
      return enabled && name === modifierName;
    });
  }
  /**
   * Get the prefixed supported property name
   * @method
   * @memberof Popper.Utils
   * @argument {String} property (camelCase)
   * @returns {String} prefixed property (camelCase or PascalCase, depending on the vendor prefix)
   */


  function getSupportedPropertyName(property) {
    var prefixes = [false, 'ms', 'Webkit', 'Moz', 'O'];
    var upperProp = property.charAt(0).toUpperCase() + property.slice(1);

    for (var i = 0; i < prefixes.length; i++) {
      var prefix = prefixes[i];
      var toCheck = prefix ? '' + prefix + upperProp : property;

      if (typeof document.body.style[toCheck] !== 'undefined') {
        return toCheck;
      }
    }

    return null;
  }
  /**
   * Destroys the popper.
   * @method
   * @memberof Popper
   */


  function destroy() {
    this.state.isDestroyed = true; // touch DOM only if `applyStyle` modifier is enabled

    if (isModifierEnabled(this.modifiers, 'applyStyle')) {
      this.popper.removeAttribute('x-placement');
      this.popper.style.position = '';
      this.popper.style.top = '';
      this.popper.style.left = '';
      this.popper.style.right = '';
      this.popper.style.bottom = '';
      this.popper.style.willChange = '';
      this.popper.style[getSupportedPropertyName('transform')] = '';
    }

    this.disableEventListeners(); // remove the popper if user explicity asked for the deletion on destroy
    // do not use `remove` because IE11 doesn't support it

    if (this.options.removeOnDestroy) {
      this.popper.parentNode.removeChild(this.popper);
    }

    return this;
  }
  /**
   * Get the window associated with the element
   * @argument {Element} element
   * @returns {Window}
   */


  function getWindow(element) {
    var ownerDocument = element.ownerDocument;
    return ownerDocument ? ownerDocument.defaultView : window;
  }

  function attachToScrollParents(scrollParent, event, callback, scrollParents) {
    var isBody = scrollParent.nodeName === 'BODY';
    var target = isBody ? scrollParent.ownerDocument.defaultView : scrollParent;
    target.addEventListener(event, callback, {
      passive: true
    });

    if (!isBody) {
      attachToScrollParents(getScrollParent(target.parentNode), event, callback, scrollParents);
    }

    scrollParents.push(target);
  }
  /**
   * Setup needed event listeners used to update the popper position
   * @method
   * @memberof Popper.Utils
   * @private
   */


  function setupEventListeners(reference, options, state, updateBound) {
    // Resize event listener on window
    state.updateBound = updateBound;
    getWindow(reference).addEventListener('resize', state.updateBound, {
      passive: true
    }); // Scroll event listener on scroll parents

    var scrollElement = getScrollParent(reference);
    attachToScrollParents(scrollElement, 'scroll', state.updateBound, state.scrollParents);
    state.scrollElement = scrollElement;
    state.eventsEnabled = true;
    return state;
  }
  /**
   * It will add resize/scroll events and start recalculating
   * position of the popper element when they are triggered.
   * @method
   * @memberof Popper
   */


  function enableEventListeners() {
    if (!this.state.eventsEnabled) {
      this.state = setupEventListeners(this.reference, this.options, this.state, this.scheduleUpdate);
    }
  }
  /**
   * Remove event listeners used to update the popper position
   * @method
   * @memberof Popper.Utils
   * @private
   */


  function removeEventListeners(reference, state) {
    // Remove resize event listener on window
    getWindow(reference).removeEventListener('resize', state.updateBound); // Remove scroll event listener on scroll parents

    state.scrollParents.forEach(function (target) {
      target.removeEventListener('scroll', state.updateBound);
    }); // Reset state

    state.updateBound = null;
    state.scrollParents = [];
    state.scrollElement = null;
    state.eventsEnabled = false;
    return state;
  }
  /**
   * It will remove resize/scroll events and won't recalculate popper position
   * when they are triggered. It also won't trigger `onUpdate` callback anymore,
   * unless you call `update` method manually.
   * @method
   * @memberof Popper
   */


  function disableEventListeners() {
    if (this.state.eventsEnabled) {
      cancelAnimationFrame(this.scheduleUpdate);
      this.state = removeEventListeners(this.reference, this.state);
    }
  }
  /**
   * Tells if a given input is a number
   * @method
   * @memberof Popper.Utils
   * @param {*} input to check
   * @return {Boolean}
   */


  function isNumeric(n) {
    return n !== '' && !isNaN(parseFloat(n)) && isFinite(n);
  }
  /**
   * Set the style to the given popper
   * @method
   * @memberof Popper.Utils
   * @argument {Element} element - Element to apply the style to
   * @argument {Object} styles
   * Object with a list of properties and values which will be applied to the element
   */


  function setStyles(element, styles) {
    Object.keys(styles).forEach(function (prop) {
      var unit = ''; // add unit if the value is numeric and is one of the following

      if (['width', 'height', 'top', 'right', 'bottom', 'left'].indexOf(prop) !== -1 && isNumeric(styles[prop])) {
        unit = 'px';
      }

      element.style[prop] = styles[prop] + unit;
    });
  }
  /**
   * Set the attributes to the given popper
   * @method
   * @memberof Popper.Utils
   * @argument {Element} element - Element to apply the attributes to
   * @argument {Object} styles
   * Object with a list of properties and values which will be applied to the element
   */


  function setAttributes(element, attributes) {
    Object.keys(attributes).forEach(function (prop) {
      var value = attributes[prop];

      if (value !== false) {
        element.setAttribute(prop, attributes[prop]);
      } else {
        element.removeAttribute(prop);
      }
    });
  }
  /**
   * @function
   * @memberof Modifiers
   * @argument {Object} data - The data object generated by `update` method
   * @argument {Object} data.styles - List of style properties - values to apply to popper element
   * @argument {Object} data.attributes - List of attribute properties - values to apply to popper element
   * @argument {Object} options - Modifiers configuration and options
   * @returns {Object} The same data object
   */


  function applyStyle(data) {
    // any property present in `data.styles` will be applied to the popper,
    // in this way we can make the 3rd party modifiers add custom styles to it
    // Be aware, modifiers could override the properties defined in the previous
    // lines of this modifier!
    setStyles(data.instance.popper, data.styles); // any property present in `data.attributes` will be applied to the popper,
    // they will be set as HTML attributes of the element

    setAttributes(data.instance.popper, data.attributes); // if arrowElement is defined and arrowStyles has some properties

    if (data.arrowElement && Object.keys(data.arrowStyles).length) {
      setStyles(data.arrowElement, data.arrowStyles);
    }

    return data;
  }
  /**
   * Set the x-placement attribute before everything else because it could be used
   * to add margins to the popper margins needs to be calculated to get the
   * correct popper offsets.
   * @method
   * @memberof Popper.modifiers
   * @param {HTMLElement} reference - The reference element used to position the popper
   * @param {HTMLElement} popper - The HTML element used as popper
   * @param {Object} options - Popper.js options
   */


  function applyStyleOnLoad(reference, popper, options, modifierOptions, state) {
    // compute reference element offsets
    var referenceOffsets = getReferenceOffsets(state, popper, reference, options.positionFixed); // compute auto placement, store placement inside the data object,
    // modifiers will be able to edit `placement` if needed
    // and refer to originalPlacement to know the original value

    var placement = computeAutoPlacement(options.placement, referenceOffsets, popper, reference, options.modifiers.flip.boundariesElement, options.modifiers.flip.padding);
    popper.setAttribute('x-placement', placement); // Apply `position` to popper before anything else because
    // without the position applied we can't guarantee correct computations

    setStyles(popper, {
      position: options.positionFixed ? 'fixed' : 'absolute'
    });
    return options;
  }
  /**
   * @function
   * @memberof Popper.Utils
   * @argument {Object} data - The data object generated by `update` method
   * @argument {Boolean} shouldRound - If the offsets should be rounded at all
   * @returns {Object} The popper's position offsets rounded
   *
   * The tale of pixel-perfect positioning. It's still not 100% perfect, but as
   * good as it can be within reason.
   * Discussion here: https://github.com/FezVrasta/popper.js/pull/715
   *
   * Low DPI screens cause a popper to be blurry if not using full pixels (Safari
   * as well on High DPI screens).
   *
   * Firefox prefers no rounding for positioning and does not have blurriness on
   * high DPI screens.
   *
   * Only horizontal placement and left/right values need to be considered.
   */


  function getRoundedOffsets(data, shouldRound) {
    var _data$offsets = data.offsets,
        popper = _data$offsets.popper,
        reference = _data$offsets.reference;
    var isVertical = ['left', 'right'].indexOf(data.placement) !== -1;
    var isVariation = data.placement.indexOf('-') !== -1;
    var sameWidthOddness = reference.width % 2 === popper.width % 2;
    var bothOddWidth = reference.width % 2 === 1 && popper.width % 2 === 1;

    var noRound = function noRound(v) {
      return v;
    };

    var horizontalToInteger = !shouldRound ? noRound : isVertical || isVariation || sameWidthOddness ? Math.round : Math.floor;
    var verticalToInteger = !shouldRound ? noRound : Math.round;
    return {
      left: horizontalToInteger(bothOddWidth && !isVariation && shouldRound ? popper.left - 1 : popper.left),
      top: verticalToInteger(popper.top),
      bottom: verticalToInteger(popper.bottom),
      right: horizontalToInteger(popper.right)
    };
  }

  var isFirefox = isBrowser && /Firefox/i.test(navigator.userAgent);
  /**
   * @function
   * @memberof Modifiers
   * @argument {Object} data - The data object generated by `update` method
   * @argument {Object} options - Modifiers configuration and options
   * @returns {Object} The data object, properly modified
   */

  function computeStyle(data, options) {
    var x = options.x,
        y = options.y;
    var popper = data.offsets.popper; // Remove this legacy support in Popper.js v2

    var legacyGpuAccelerationOption = find(data.instance.modifiers, function (modifier) {
      return modifier.name === 'applyStyle';
    }).gpuAcceleration;

    if (legacyGpuAccelerationOption !== undefined) {
      console.warn('WARNING: `gpuAcceleration` option moved to `computeStyle` modifier and will not be supported in future versions of Popper.js!');
    }

    var gpuAcceleration = legacyGpuAccelerationOption !== undefined ? legacyGpuAccelerationOption : options.gpuAcceleration;
    var offsetParent = getOffsetParent(data.instance.popper);
    var offsetParentRect = getBoundingClientRect(offsetParent); // Styles

    var styles = {
      position: popper.position
    };
    var offsets = getRoundedOffsets(data, window.devicePixelRatio < 2 || !isFirefox);
    var sideA = x === 'bottom' ? 'top' : 'bottom';
    var sideB = y === 'right' ? 'left' : 'right'; // if gpuAcceleration is set to `true` and transform is supported,
    //  we use `translate3d` to apply the position to the popper we
    // automatically use the supported prefixed version if needed

    var prefixedProperty = getSupportedPropertyName('transform'); // now, let's make a step back and look at this code closely (wtf?)
    // If the content of the popper grows once it's been positioned, it
    // may happen that the popper gets misplaced because of the new content
    // overflowing its reference element
    // To avoid this problem, we provide two options (x and y), which allow
    // the consumer to define the offset origin.
    // If we position a popper on top of a reference element, we can set
    // `x` to `top` to make the popper grow towards its top instead of
    // its bottom.

    var left = void 0,
        top = void 0;

    if (sideA === 'bottom') {
      // when offsetParent is <html> the positioning is relative to the bottom of the screen (excluding the scrollbar)
      // and not the bottom of the html element
      if (offsetParent.nodeName === 'HTML') {
        top = -offsetParent.clientHeight + offsets.bottom;
      } else {
        top = -offsetParentRect.height + offsets.bottom;
      }
    } else {
      top = offsets.top;
    }

    if (sideB === 'right') {
      if (offsetParent.nodeName === 'HTML') {
        left = -offsetParent.clientWidth + offsets.right;
      } else {
        left = -offsetParentRect.width + offsets.right;
      }
    } else {
      left = offsets.left;
    }

    if (gpuAcceleration && prefixedProperty) {
      styles[prefixedProperty] = 'translate3d(' + left + 'px, ' + top + 'px, 0)';
      styles[sideA] = 0;
      styles[sideB] = 0;
      styles.willChange = 'transform';
    } else {
      // othwerise, we use the standard `top`, `left`, `bottom` and `right` properties
      var invertTop = sideA === 'bottom' ? -1 : 1;
      var invertLeft = sideB === 'right' ? -1 : 1;
      styles[sideA] = top * invertTop;
      styles[sideB] = left * invertLeft;
      styles.willChange = sideA + ', ' + sideB;
    } // Attributes


    var attributes = {
      'x-placement': data.placement
    }; // Update `data` attributes, styles and arrowStyles

    data.attributes = _extends$2({}, attributes, data.attributes);
    data.styles = _extends$2({}, styles, data.styles);
    data.arrowStyles = _extends$2({}, data.offsets.arrow, data.arrowStyles);
    return data;
  }
  /**
   * Helper used to know if the given modifier depends from another one.<br />
   * It checks if the needed modifier is listed and enabled.
   * @method
   * @memberof Popper.Utils
   * @param {Array} modifiers - list of modifiers
   * @param {String} requestingName - name of requesting modifier
   * @param {String} requestedName - name of requested modifier
   * @returns {Boolean}
   */


  function isModifierRequired(modifiers, requestingName, requestedName) {
    var requesting = find(modifiers, function (_ref) {
      var name = _ref.name;
      return name === requestingName;
    });
    var isRequired = !!requesting && modifiers.some(function (modifier) {
      return modifier.name === requestedName && modifier.enabled && modifier.order < requesting.order;
    });

    if (!isRequired) {
      var _requesting = '`' + requestingName + '`';

      var requested = '`' + requestedName + '`';
      console.warn(requested + ' modifier is required by ' + _requesting + ' modifier in order to work, be sure to include it before ' + _requesting + '!');
    }

    return isRequired;
  }
  /**
   * @function
   * @memberof Modifiers
   * @argument {Object} data - The data object generated by update method
   * @argument {Object} options - Modifiers configuration and options
   * @returns {Object} The data object, properly modified
   */


  function arrow(data, options) {
    var _data$offsets$arrow; // arrow depends on keepTogether in order to work


    if (!isModifierRequired(data.instance.modifiers, 'arrow', 'keepTogether')) {
      return data;
    }

    var arrowElement = options.element; // if arrowElement is a string, suppose it's a CSS selector

    if (typeof arrowElement === 'string') {
      arrowElement = data.instance.popper.querySelector(arrowElement); // if arrowElement is not found, don't run the modifier

      if (!arrowElement) {
        return data;
      }
    } else {
      // if the arrowElement isn't a query selector we must check that the
      // provided DOM node is child of its popper node
      if (!data.instance.popper.contains(arrowElement)) {
        console.warn('WARNING: `arrow.element` must be child of its popper element!');
        return data;
      }
    }

    var placement = data.placement.split('-')[0];
    var _data$offsets = data.offsets,
        popper = _data$offsets.popper,
        reference = _data$offsets.reference;
    var isVertical = ['left', 'right'].indexOf(placement) !== -1;
    var len = isVertical ? 'height' : 'width';
    var sideCapitalized = isVertical ? 'Top' : 'Left';
    var side = sideCapitalized.toLowerCase();
    var altSide = isVertical ? 'left' : 'top';
    var opSide = isVertical ? 'bottom' : 'right';
    var arrowElementSize = getOuterSizes(arrowElement)[len]; //
    // extends keepTogether behavior making sure the popper and its
    // reference have enough pixels in conjunction
    //
    // top/left side

    if (reference[opSide] - arrowElementSize < popper[side]) {
      data.offsets.popper[side] -= popper[side] - (reference[opSide] - arrowElementSize);
    } // bottom/right side


    if (reference[side] + arrowElementSize > popper[opSide]) {
      data.offsets.popper[side] += reference[side] + arrowElementSize - popper[opSide];
    }

    data.offsets.popper = getClientRect(data.offsets.popper); // compute center of the popper

    var center = reference[side] + reference[len] / 2 - arrowElementSize / 2; // Compute the sideValue using the updated popper offsets
    // take popper margin in account because we don't have this info available

    var css = getStyleComputedProperty(data.instance.popper);
    var popperMarginSide = parseFloat(css['margin' + sideCapitalized], 10);
    var popperBorderSide = parseFloat(css['border' + sideCapitalized + 'Width'], 10);
    var sideValue = center - data.offsets.popper[side] - popperMarginSide - popperBorderSide; // prevent arrowElement from being placed not contiguously to its popper

    sideValue = Math.max(Math.min(popper[len] - arrowElementSize, sideValue), 0);
    data.arrowElement = arrowElement;
    data.offsets.arrow = (_data$offsets$arrow = {}, defineProperty(_data$offsets$arrow, side, Math.round(sideValue)), defineProperty(_data$offsets$arrow, altSide, ''), _data$offsets$arrow);
    return data;
  }
  /**
   * Get the opposite placement variation of the given one
   * @method
   * @memberof Popper.Utils
   * @argument {String} placement variation
   * @returns {String} flipped placement variation
   */


  function getOppositeVariation(variation) {
    if (variation === 'end') {
      return 'start';
    } else if (variation === 'start') {
      return 'end';
    }

    return variation;
  }
  /**
   * List of accepted placements to use as values of the `placement` option.<br />
   * Valid placements are:
   * - `auto`
   * - `top`
   * - `right`
   * - `bottom`
   * - `left`
   *
   * Each placement can have a variation from this list:
   * - `-start`
   * - `-end`
   *
   * Variations are interpreted easily if you think of them as the left to right
   * written languages. Horizontally (`top` and `bottom`), `start` is left and `end`
   * is right.<br />
   * Vertically (`left` and `right`), `start` is top and `end` is bottom.
   *
   * Some valid examples are:
   * - `top-end` (on top of reference, right aligned)
   * - `right-start` (on right of reference, top aligned)
   * - `bottom` (on bottom, centered)
   * - `auto-end` (on the side with more space available, alignment depends by placement)
   *
   * @static
   * @type {Array}
   * @enum {String}
   * @readonly
   * @method placements
   * @memberof Popper
   */


  var placements = ['auto-start', 'auto', 'auto-end', 'top-start', 'top', 'top-end', 'right-start', 'right', 'right-end', 'bottom-end', 'bottom', 'bottom-start', 'left-end', 'left', 'left-start']; // Get rid of `auto` `auto-start` and `auto-end`

  var validPlacements = placements.slice(3);
  /**
   * Given an initial placement, returns all the subsequent placements
   * clockwise (or counter-clockwise).
   *
   * @method
   * @memberof Popper.Utils
   * @argument {String} placement - A valid placement (it accepts variations)
   * @argument {Boolean} counter - Set to true to walk the placements counterclockwise
   * @returns {Array} placements including their variations
   */

  function clockwise(placement) {
    var counter = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    var index = validPlacements.indexOf(placement);
    var arr = validPlacements.slice(index + 1).concat(validPlacements.slice(0, index));
    return counter ? arr.reverse() : arr;
  }

  var BEHAVIORS = {
    FLIP: 'flip',
    CLOCKWISE: 'clockwise',
    COUNTERCLOCKWISE: 'counterclockwise'
  };
  /**
   * @function
   * @memberof Modifiers
   * @argument {Object} data - The data object generated by update method
   * @argument {Object} options - Modifiers configuration and options
   * @returns {Object} The data object, properly modified
   */

  function flip(data, options) {
    // if `inner` modifier is enabled, we can't use the `flip` modifier
    if (isModifierEnabled(data.instance.modifiers, 'inner')) {
      return data;
    }

    if (data.flipped && data.placement === data.originalPlacement) {
      // seems like flip is trying to loop, probably there's not enough space on any of the flippable sides
      return data;
    }

    var boundaries = getBoundaries(data.instance.popper, data.instance.reference, options.padding, options.boundariesElement, data.positionFixed);
    var placement = data.placement.split('-')[0];
    var placementOpposite = getOppositePlacement(placement);
    var variation = data.placement.split('-')[1] || '';
    var flipOrder = [];

    switch (options.behavior) {
      case BEHAVIORS.FLIP:
        flipOrder = [placement, placementOpposite];
        break;

      case BEHAVIORS.CLOCKWISE:
        flipOrder = clockwise(placement);
        break;

      case BEHAVIORS.COUNTERCLOCKWISE:
        flipOrder = clockwise(placement, true);
        break;

      default:
        flipOrder = options.behavior;
    }

    flipOrder.forEach(function (step, index) {
      if (placement !== step || flipOrder.length === index + 1) {
        return data;
      }

      placement = data.placement.split('-')[0];
      placementOpposite = getOppositePlacement(placement);
      var popperOffsets = data.offsets.popper;
      var refOffsets = data.offsets.reference; // using floor because the reference offsets may contain decimals we are not going to consider here

      var floor = Math.floor;
      var overlapsRef = placement === 'left' && floor(popperOffsets.right) > floor(refOffsets.left) || placement === 'right' && floor(popperOffsets.left) < floor(refOffsets.right) || placement === 'top' && floor(popperOffsets.bottom) > floor(refOffsets.top) || placement === 'bottom' && floor(popperOffsets.top) < floor(refOffsets.bottom);
      var overflowsLeft = floor(popperOffsets.left) < floor(boundaries.left);
      var overflowsRight = floor(popperOffsets.right) > floor(boundaries.right);
      var overflowsTop = floor(popperOffsets.top) < floor(boundaries.top);
      var overflowsBottom = floor(popperOffsets.bottom) > floor(boundaries.bottom);
      var overflowsBoundaries = placement === 'left' && overflowsLeft || placement === 'right' && overflowsRight || placement === 'top' && overflowsTop || placement === 'bottom' && overflowsBottom; // flip the variation if required

      var isVertical = ['top', 'bottom'].indexOf(placement) !== -1;
      var flippedVariation = !!options.flipVariations && (isVertical && variation === 'start' && overflowsLeft || isVertical && variation === 'end' && overflowsRight || !isVertical && variation === 'start' && overflowsTop || !isVertical && variation === 'end' && overflowsBottom);

      if (overlapsRef || overflowsBoundaries || flippedVariation) {
        // this boolean to detect any flip loop
        data.flipped = true;

        if (overlapsRef || overflowsBoundaries) {
          placement = flipOrder[index + 1];
        }

        if (flippedVariation) {
          variation = getOppositeVariation(variation);
        }

        data.placement = placement + (variation ? '-' + variation : ''); // this object contains `position`, we want to preserve it along with
        // any additional property we may add in the future

        data.offsets.popper = _extends$2({}, data.offsets.popper, getPopperOffsets(data.instance.popper, data.offsets.reference, data.placement));
        data = runModifiers(data.instance.modifiers, data, 'flip');
      }
    });
    return data;
  }
  /**
   * @function
   * @memberof Modifiers
   * @argument {Object} data - The data object generated by update method
   * @argument {Object} options - Modifiers configuration and options
   * @returns {Object} The data object, properly modified
   */


  function keepTogether(data) {
    var _data$offsets = data.offsets,
        popper = _data$offsets.popper,
        reference = _data$offsets.reference;
    var placement = data.placement.split('-')[0];
    var floor = Math.floor;
    var isVertical = ['top', 'bottom'].indexOf(placement) !== -1;
    var side = isVertical ? 'right' : 'bottom';
    var opSide = isVertical ? 'left' : 'top';
    var measurement = isVertical ? 'width' : 'height';

    if (popper[side] < floor(reference[opSide])) {
      data.offsets.popper[opSide] = floor(reference[opSide]) - popper[measurement];
    }

    if (popper[opSide] > floor(reference[side])) {
      data.offsets.popper[opSide] = floor(reference[side]);
    }

    return data;
  }
  /**
   * Converts a string containing value + unit into a px value number
   * @function
   * @memberof {modifiers~offset}
   * @private
   * @argument {String} str - Value + unit string
   * @argument {String} measurement - `height` or `width`
   * @argument {Object} popperOffsets
   * @argument {Object} referenceOffsets
   * @returns {Number|String}
   * Value in pixels, or original string if no values were extracted
   */


  function toValue(str, measurement, popperOffsets, referenceOffsets) {
    // separate value from unit
    var split = str.match(/((?:\-|\+)?\d*\.?\d*)(.*)/);
    var value = +split[1];
    var unit = split[2]; // If it's not a number it's an operator, I guess

    if (!value) {
      return str;
    }

    if (unit.indexOf('%') === 0) {
      var element = void 0;

      switch (unit) {
        case '%p':
          element = popperOffsets;
          break;

        case '%':
        case '%r':
        default:
          element = referenceOffsets;
      }

      var rect = getClientRect(element);
      return rect[measurement] / 100 * value;
    } else if (unit === 'vh' || unit === 'vw') {
      // if is a vh or vw, we calculate the size based on the viewport
      var size = void 0;

      if (unit === 'vh') {
        size = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
      } else {
        size = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
      }

      return size / 100 * value;
    } else {
      // if is an explicit pixel unit, we get rid of the unit and keep the value
      // if is an implicit unit, it's px, and we return just the value
      return value;
    }
  }
  /**
   * Parse an `offset` string to extrapolate `x` and `y` numeric offsets.
   * @function
   * @memberof {modifiers~offset}
   * @private
   * @argument {String} offset
   * @argument {Object} popperOffsets
   * @argument {Object} referenceOffsets
   * @argument {String} basePlacement
   * @returns {Array} a two cells array with x and y offsets in numbers
   */


  function parseOffset(offset, popperOffsets, referenceOffsets, basePlacement) {
    var offsets = [0, 0]; // Use height if placement is left or right and index is 0 otherwise use width
    // in this way the first offset will use an axis and the second one
    // will use the other one

    var useHeight = ['right', 'left'].indexOf(basePlacement) !== -1; // Split the offset string to obtain a list of values and operands
    // The regex addresses values with the plus or minus sign in front (+10, -20, etc)

    var fragments = offset.split(/(\+|\-)/).map(function (frag) {
      return frag.trim();
    }); // Detect if the offset string contains a pair of values or a single one
    // they could be separated by comma or space

    var divider = fragments.indexOf(find(fragments, function (frag) {
      return frag.search(/,|\s/) !== -1;
    }));

    if (fragments[divider] && fragments[divider].indexOf(',') === -1) {
      console.warn('Offsets separated by white space(s) are deprecated, use a comma (,) instead.');
    } // If divider is found, we divide the list of values and operands to divide
    // them by ofset X and Y.


    var splitRegex = /\s*,\s*|\s+/;
    var ops = divider !== -1 ? [fragments.slice(0, divider).concat([fragments[divider].split(splitRegex)[0]]), [fragments[divider].split(splitRegex)[1]].concat(fragments.slice(divider + 1))] : [fragments]; // Convert the values with units to absolute pixels to allow our computations

    ops = ops.map(function (op, index) {
      // Most of the units rely on the orientation of the popper
      var measurement = (index === 1 ? !useHeight : useHeight) ? 'height' : 'width';
      var mergeWithPrevious = false;
      return op // This aggregates any `+` or `-` sign that aren't considered operators
      // e.g.: 10 + +5 => [10, +, +5]
      .reduce(function (a, b) {
        if (a[a.length - 1] === '' && ['+', '-'].indexOf(b) !== -1) {
          a[a.length - 1] = b;
          mergeWithPrevious = true;
          return a;
        } else if (mergeWithPrevious) {
          a[a.length - 1] += b;
          mergeWithPrevious = false;
          return a;
        } else {
          return a.concat(b);
        }
      }, []) // Here we convert the string values into number values (in px)
      .map(function (str) {
        return toValue(str, measurement, popperOffsets, referenceOffsets);
      });
    }); // Loop trough the offsets arrays and execute the operations

    ops.forEach(function (op, index) {
      op.forEach(function (frag, index2) {
        if (isNumeric(frag)) {
          offsets[index] += frag * (op[index2 - 1] === '-' ? -1 : 1);
        }
      });
    });
    return offsets;
  }
  /**
   * @function
   * @memberof Modifiers
   * @argument {Object} data - The data object generated by update method
   * @argument {Object} options - Modifiers configuration and options
   * @argument {Number|String} options.offset=0
   * The offset value as described in the modifier description
   * @returns {Object} The data object, properly modified
   */


  function offset(data, _ref) {
    var offset = _ref.offset;
    var placement = data.placement,
        _data$offsets = data.offsets,
        popper = _data$offsets.popper,
        reference = _data$offsets.reference;
    var basePlacement = placement.split('-')[0];
    var offsets = void 0;

    if (isNumeric(+offset)) {
      offsets = [+offset, 0];
    } else {
      offsets = parseOffset(offset, popper, reference, basePlacement);
    }

    if (basePlacement === 'left') {
      popper.top += offsets[0];
      popper.left -= offsets[1];
    } else if (basePlacement === 'right') {
      popper.top += offsets[0];
      popper.left += offsets[1];
    } else if (basePlacement === 'top') {
      popper.left += offsets[0];
      popper.top -= offsets[1];
    } else if (basePlacement === 'bottom') {
      popper.left += offsets[0];
      popper.top += offsets[1];
    }

    data.popper = popper;
    return data;
  }
  /**
   * @function
   * @memberof Modifiers
   * @argument {Object} data - The data object generated by `update` method
   * @argument {Object} options - Modifiers configuration and options
   * @returns {Object} The data object, properly modified
   */


  function preventOverflow(data, options) {
    var boundariesElement = options.boundariesElement || getOffsetParent(data.instance.popper); // If offsetParent is the reference element, we really want to
    // go one step up and use the next offsetParent as reference to
    // avoid to make this modifier completely useless and look like broken

    if (data.instance.reference === boundariesElement) {
      boundariesElement = getOffsetParent(boundariesElement);
    } // NOTE: DOM access here
    // resets the popper's position so that the document size can be calculated excluding
    // the size of the popper element itself


    var transformProp = getSupportedPropertyName('transform');
    var popperStyles = data.instance.popper.style; // assignment to help minification

    var top = popperStyles.top,
        left = popperStyles.left,
        transform = popperStyles[transformProp];
    popperStyles.top = '';
    popperStyles.left = '';
    popperStyles[transformProp] = '';
    var boundaries = getBoundaries(data.instance.popper, data.instance.reference, options.padding, boundariesElement, data.positionFixed); // NOTE: DOM access here
    // restores the original style properties after the offsets have been computed

    popperStyles.top = top;
    popperStyles.left = left;
    popperStyles[transformProp] = transform;
    options.boundaries = boundaries;
    var order = options.priority;
    var popper = data.offsets.popper;
    var check = {
      primary: function primary(placement) {
        var value = popper[placement];

        if (popper[placement] < boundaries[placement] && !options.escapeWithReference) {
          value = Math.max(popper[placement], boundaries[placement]);
        }

        return defineProperty({}, placement, value);
      },
      secondary: function secondary(placement) {
        var mainSide = placement === 'right' ? 'left' : 'top';
        var value = popper[mainSide];

        if (popper[placement] > boundaries[placement] && !options.escapeWithReference) {
          value = Math.min(popper[mainSide], boundaries[placement] - (placement === 'right' ? popper.width : popper.height));
        }

        return defineProperty({}, mainSide, value);
      }
    };
    order.forEach(function (placement) {
      var side = ['left', 'top'].indexOf(placement) !== -1 ? 'primary' : 'secondary';
      popper = _extends$2({}, popper, check[side](placement));
    });
    data.offsets.popper = popper;
    return data;
  }
  /**
   * @function
   * @memberof Modifiers
   * @argument {Object} data - The data object generated by `update` method
   * @argument {Object} options - Modifiers configuration and options
   * @returns {Object} The data object, properly modified
   */


  function shift(data) {
    var placement = data.placement;
    var basePlacement = placement.split('-')[0];
    var shiftvariation = placement.split('-')[1]; // if shift shiftvariation is specified, run the modifier

    if (shiftvariation) {
      var _data$offsets = data.offsets,
          reference = _data$offsets.reference,
          popper = _data$offsets.popper;
      var isVertical = ['bottom', 'top'].indexOf(basePlacement) !== -1;
      var side = isVertical ? 'left' : 'top';
      var measurement = isVertical ? 'width' : 'height';
      var shiftOffsets = {
        start: defineProperty({}, side, reference[side]),
        end: defineProperty({}, side, reference[side] + reference[measurement] - popper[measurement])
      };
      data.offsets.popper = _extends$2({}, popper, shiftOffsets[shiftvariation]);
    }

    return data;
  }
  /**
   * @function
   * @memberof Modifiers
   * @argument {Object} data - The data object generated by update method
   * @argument {Object} options - Modifiers configuration and options
   * @returns {Object} The data object, properly modified
   */


  function hide(data) {
    if (!isModifierRequired(data.instance.modifiers, 'hide', 'preventOverflow')) {
      return data;
    }

    var refRect = data.offsets.reference;
    var bound = find(data.instance.modifiers, function (modifier) {
      return modifier.name === 'preventOverflow';
    }).boundaries;

    if (refRect.bottom < bound.top || refRect.left > bound.right || refRect.top > bound.bottom || refRect.right < bound.left) {
      // Avoid unnecessary DOM access if visibility hasn't changed
      if (data.hide === true) {
        return data;
      }

      data.hide = true;
      data.attributes['x-out-of-boundaries'] = '';
    } else {
      // Avoid unnecessary DOM access if visibility hasn't changed
      if (data.hide === false) {
        return data;
      }

      data.hide = false;
      data.attributes['x-out-of-boundaries'] = false;
    }

    return data;
  }
  /**
   * @function
   * @memberof Modifiers
   * @argument {Object} data - The data object generated by `update` method
   * @argument {Object} options - Modifiers configuration and options
   * @returns {Object} The data object, properly modified
   */


  function inner(data) {
    var placement = data.placement;
    var basePlacement = placement.split('-')[0];
    var _data$offsets = data.offsets,
        popper = _data$offsets.popper,
        reference = _data$offsets.reference;
    var isHoriz = ['left', 'right'].indexOf(basePlacement) !== -1;
    var subtractLength = ['top', 'left'].indexOf(basePlacement) === -1;
    popper[isHoriz ? 'left' : 'top'] = reference[basePlacement] - (subtractLength ? popper[isHoriz ? 'width' : 'height'] : 0);
    data.placement = getOppositePlacement(placement);
    data.offsets.popper = getClientRect(popper);
    return data;
  }
  /**
   * Modifier function, each modifier can have a function of this type assigned
   * to its `fn` property.<br />
   * These functions will be called on each update, this means that you must
   * make sure they are performant enough to avoid performance bottlenecks.
   *
   * @function ModifierFn
   * @argument {dataObject} data - The data object generated by `update` method
   * @argument {Object} options - Modifiers configuration and options
   * @returns {dataObject} The data object, properly modified
   */

  /**
   * Modifiers are plugins used to alter the behavior of your poppers.<br />
   * Popper.js uses a set of 9 modifiers to provide all the basic functionalities
   * needed by the library.
   *
   * Usually you don't want to override the `order`, `fn` and `onLoad` props.
   * All the other properties are configurations that could be tweaked.
   * @namespace modifiers
   */


  var modifiers = {
    /**
     * Modifier used to shift the popper on the start or end of its reference
     * element.<br />
     * It will read the variation of the `placement` property.<br />
     * It can be one either `-end` or `-start`.
     * @memberof modifiers
     * @inner
     */
    shift: {
      /** @prop {number} order=100 - Index used to define the order of execution */
      order: 100,

      /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
      enabled: true,

      /** @prop {ModifierFn} */
      fn: shift
    },

    /**
     * The `offset` modifier can shift your popper on both its axis.
     *
     * It accepts the following units:
     * - `px` or unit-less, interpreted as pixels
     * - `%` or `%r`, percentage relative to the length of the reference element
     * - `%p`, percentage relative to the length of the popper element
     * - `vw`, CSS viewport width unit
     * - `vh`, CSS viewport height unit
     *
     * For length is intended the main axis relative to the placement of the popper.<br />
     * This means that if the placement is `top` or `bottom`, the length will be the
     * `width`. In case of `left` or `right`, it will be the `height`.
     *
     * You can provide a single value (as `Number` or `String`), or a pair of values
     * as `String` divided by a comma or one (or more) white spaces.<br />
     * The latter is a deprecated method because it leads to confusion and will be
     * removed in v2.<br />
     * Additionally, it accepts additions and subtractions between different units.
     * Note that multiplications and divisions aren't supported.
     *
     * Valid examples are:
     * ```
     * 10
     * '10%'
     * '10, 10'
     * '10%, 10'
     * '10 + 10%'
     * '10 - 5vh + 3%'
     * '-10px + 5vh, 5px - 6%'
     * ```
     * > **NB**: If you desire to apply offsets to your poppers in a way that may make them overlap
     * > with their reference element, unfortunately, you will have to disable the `flip` modifier.
     * > You can read more on this at this [issue](https://github.com/FezVrasta/popper.js/issues/373).
     *
     * @memberof modifiers
     * @inner
     */
    offset: {
      /** @prop {number} order=200 - Index used to define the order of execution */
      order: 200,

      /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
      enabled: true,

      /** @prop {ModifierFn} */
      fn: offset,

      /** @prop {Number|String} offset=0
       * The offset value as described in the modifier description
       */
      offset: 0
    },

    /**
     * Modifier used to prevent the popper from being positioned outside the boundary.
     *
     * A scenario exists where the reference itself is not within the boundaries.<br />
     * We can say it has "escaped the boundaries" — or just "escaped".<br />
     * In this case we need to decide whether the popper should either:
     *
     * - detach from the reference and remain "trapped" in the boundaries, or
     * - if it should ignore the boundary and "escape with its reference"
     *
     * When `escapeWithReference` is set to`true` and reference is completely
     * outside its boundaries, the popper will overflow (or completely leave)
     * the boundaries in order to remain attached to the edge of the reference.
     *
     * @memberof modifiers
     * @inner
     */
    preventOverflow: {
      /** @prop {number} order=300 - Index used to define the order of execution */
      order: 300,

      /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
      enabled: true,

      /** @prop {ModifierFn} */
      fn: preventOverflow,

      /**
       * @prop {Array} [priority=['left','right','top','bottom']]
       * Popper will try to prevent overflow following these priorities by default,
       * then, it could overflow on the left and on top of the `boundariesElement`
       */
      priority: ['left', 'right', 'top', 'bottom'],

      /**
       * @prop {number} padding=5
       * Amount of pixel used to define a minimum distance between the boundaries
       * and the popper. This makes sure the popper always has a little padding
       * between the edges of its container
       */
      padding: 5,

      /**
       * @prop {String|HTMLElement} boundariesElement='scrollParent'
       * Boundaries used by the modifier. Can be `scrollParent`, `window`,
       * `viewport` or any DOM element.
       */
      boundariesElement: 'scrollParent'
    },

    /**
     * Modifier used to make sure the reference and its popper stay near each other
     * without leaving any gap between the two. Especially useful when the arrow is
     * enabled and you want to ensure that it points to its reference element.
     * It cares only about the first axis. You can still have poppers with margin
     * between the popper and its reference element.
     * @memberof modifiers
     * @inner
     */
    keepTogether: {
      /** @prop {number} order=400 - Index used to define the order of execution */
      order: 400,

      /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
      enabled: true,

      /** @prop {ModifierFn} */
      fn: keepTogether
    },

    /**
     * This modifier is used to move the `arrowElement` of the popper to make
     * sure it is positioned between the reference element and its popper element.
     * It will read the outer size of the `arrowElement` node to detect how many
     * pixels of conjunction are needed.
     *
     * It has no effect if no `arrowElement` is provided.
     * @memberof modifiers
     * @inner
     */
    arrow: {
      /** @prop {number} order=500 - Index used to define the order of execution */
      order: 500,

      /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
      enabled: true,

      /** @prop {ModifierFn} */
      fn: arrow,

      /** @prop {String|HTMLElement} element='[x-arrow]' - Selector or node used as arrow */
      element: '[x-arrow]'
    },

    /**
     * Modifier used to flip the popper's placement when it starts to overlap its
     * reference element.
     *
     * Requires the `preventOverflow` modifier before it in order to work.
     *
     * **NOTE:** this modifier will interrupt the current update cycle and will
     * restart it if it detects the need to flip the placement.
     * @memberof modifiers
     * @inner
     */
    flip: {
      /** @prop {number} order=600 - Index used to define the order of execution */
      order: 600,

      /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
      enabled: true,

      /** @prop {ModifierFn} */
      fn: flip,

      /**
       * @prop {String|Array} behavior='flip'
       * The behavior used to change the popper's placement. It can be one of
       * `flip`, `clockwise`, `counterclockwise` or an array with a list of valid
       * placements (with optional variations)
       */
      behavior: 'flip',

      /**
       * @prop {number} padding=5
       * The popper will flip if it hits the edges of the `boundariesElement`
       */
      padding: 5,

      /**
       * @prop {String|HTMLElement} boundariesElement='viewport'
       * The element which will define the boundaries of the popper position.
       * The popper will never be placed outside of the defined boundaries
       * (except if `keepTogether` is enabled)
       */
      boundariesElement: 'viewport'
    },

    /**
     * Modifier used to make the popper flow toward the inner of the reference element.
     * By default, when this modifier is disabled, the popper will be placed outside
     * the reference element.
     * @memberof modifiers
     * @inner
     */
    inner: {
      /** @prop {number} order=700 - Index used to define the order of execution */
      order: 700,

      /** @prop {Boolean} enabled=false - Whether the modifier is enabled or not */
      enabled: false,

      /** @prop {ModifierFn} */
      fn: inner
    },

    /**
     * Modifier used to hide the popper when its reference element is outside of the
     * popper boundaries. It will set a `x-out-of-boundaries` attribute which can
     * be used to hide with a CSS selector the popper when its reference is
     * out of boundaries.
     *
     * Requires the `preventOverflow` modifier before it in order to work.
     * @memberof modifiers
     * @inner
     */
    hide: {
      /** @prop {number} order=800 - Index used to define the order of execution */
      order: 800,

      /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
      enabled: true,

      /** @prop {ModifierFn} */
      fn: hide
    },

    /**
     * Computes the style that will be applied to the popper element to gets
     * properly positioned.
     *
     * Note that this modifier will not touch the DOM, it just prepares the styles
     * so that `applyStyle` modifier can apply it. This separation is useful
     * in case you need to replace `applyStyle` with a custom implementation.
     *
     * This modifier has `850` as `order` value to maintain backward compatibility
     * with previous versions of Popper.js. Expect the modifiers ordering method
     * to change in future major versions of the library.
     *
     * @memberof modifiers
     * @inner
     */
    computeStyle: {
      /** @prop {number} order=850 - Index used to define the order of execution */
      order: 850,

      /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
      enabled: true,

      /** @prop {ModifierFn} */
      fn: computeStyle,

      /**
       * @prop {Boolean} gpuAcceleration=true
       * If true, it uses the CSS 3D transformation to position the popper.
       * Otherwise, it will use the `top` and `left` properties
       */
      gpuAcceleration: true,

      /**
       * @prop {string} [x='bottom']
       * Where to anchor the X axis (`bottom` or `top`). AKA X offset origin.
       * Change this if your popper should grow in a direction different from `bottom`
       */
      x: 'bottom',

      /**
       * @prop {string} [x='left']
       * Where to anchor the Y axis (`left` or `right`). AKA Y offset origin.
       * Change this if your popper should grow in a direction different from `right`
       */
      y: 'right'
    },

    /**
     * Applies the computed styles to the popper element.
     *
     * All the DOM manipulations are limited to this modifier. This is useful in case
     * you want to integrate Popper.js inside a framework or view library and you
     * want to delegate all the DOM manipulations to it.
     *
     * Note that if you disable this modifier, you must make sure the popper element
     * has its position set to `absolute` before Popper.js can do its work!
     *
     * Just disable this modifier and define your own to achieve the desired effect.
     *
     * @memberof modifiers
     * @inner
     */
    applyStyle: {
      /** @prop {number} order=900 - Index used to define the order of execution */
      order: 900,

      /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
      enabled: true,

      /** @prop {ModifierFn} */
      fn: applyStyle,

      /** @prop {Function} */
      onLoad: applyStyleOnLoad,

      /**
       * @deprecated since version 1.10.0, the property moved to `computeStyle` modifier
       * @prop {Boolean} gpuAcceleration=true
       * If true, it uses the CSS 3D transformation to position the popper.
       * Otherwise, it will use the `top` and `left` properties
       */
      gpuAcceleration: undefined
    }
  };
  /**
   * The `dataObject` is an object containing all the information used by Popper.js.
   * This object is passed to modifiers and to the `onCreate` and `onUpdate` callbacks.
   * @name dataObject
   * @property {Object} data.instance The Popper.js instance
   * @property {String} data.placement Placement applied to popper
   * @property {String} data.originalPlacement Placement originally defined on init
   * @property {Boolean} data.flipped True if popper has been flipped by flip modifier
   * @property {Boolean} data.hide True if the reference element is out of boundaries, useful to know when to hide the popper
   * @property {HTMLElement} data.arrowElement Node used as arrow by arrow modifier
   * @property {Object} data.styles Any CSS property defined here will be applied to the popper. It expects the JavaScript nomenclature (eg. `marginBottom`)
   * @property {Object} data.arrowStyles Any CSS property defined here will be applied to the popper arrow. It expects the JavaScript nomenclature (eg. `marginBottom`)
   * @property {Object} data.boundaries Offsets of the popper boundaries
   * @property {Object} data.offsets The measurements of popper, reference and arrow elements
   * @property {Object} data.offsets.popper `top`, `left`, `width`, `height` values
   * @property {Object} data.offsets.reference `top`, `left`, `width`, `height` values
   * @property {Object} data.offsets.arrow] `top` and `left` offsets, only one of them will be different from 0
   */

  /**
   * Default options provided to Popper.js constructor.<br />
   * These can be overridden using the `options` argument of Popper.js.<br />
   * To override an option, simply pass an object with the same
   * structure of the `options` object, as the 3rd argument. For example:
   * ```
   * new Popper(ref, pop, {
   *   modifiers: {
   *     preventOverflow: { enabled: false }
   *   }
   * })
   * ```
   * @type {Object}
   * @static
   * @memberof Popper
   */

  var Defaults = {
    /**
     * Popper's placement.
     * @prop {Popper.placements} placement='bottom'
     */
    placement: 'bottom',

    /**
     * Set this to true if you want popper to position it self in 'fixed' mode
     * @prop {Boolean} positionFixed=false
     */
    positionFixed: false,

    /**
     * Whether events (resize, scroll) are initially enabled.
     * @prop {Boolean} eventsEnabled=true
     */
    eventsEnabled: true,

    /**
     * Set to true if you want to automatically remove the popper when
     * you call the `destroy` method.
     * @prop {Boolean} removeOnDestroy=false
     */
    removeOnDestroy: false,

    /**
     * Callback called when the popper is created.<br />
     * By default, it is set to no-op.<br />
     * Access Popper.js instance with `data.instance`.
     * @prop {onCreate}
     */
    onCreate: function onCreate() {},

    /**
     * Callback called when the popper is updated. This callback is not called
     * on the initialization/creation of the popper, but only on subsequent
     * updates.<br />
     * By default, it is set to no-op.<br />
     * Access Popper.js instance with `data.instance`.
     * @prop {onUpdate}
     */
    onUpdate: function onUpdate() {},

    /**
     * List of modifiers used to modify the offsets before they are applied to the popper.
     * They provide most of the functionalities of Popper.js.
     * @prop {modifiers}
     */
    modifiers: modifiers
  };
  /**
   * @callback onCreate
   * @param {dataObject} data
   */

  /**
   * @callback onUpdate
   * @param {dataObject} data
   */
  // Utils
  // Methods

  var Popper = function () {
    /**
     * Creates a new Popper.js instance.
     * @class Popper
     * @param {HTMLElement|referenceObject} reference - The reference element used to position the popper
     * @param {HTMLElement} popper - The HTML element used as the popper
     * @param {Object} options - Your custom options to override the ones defined in [Defaults](#defaults)
     * @return {Object} instance - The generated Popper.js instance
     */
    function Popper(reference, popper) {
      var _this = this;

      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      classCallCheck(this, Popper);

      this.scheduleUpdate = function () {
        return requestAnimationFrame(_this.update);
      }; // make update() debounced, so that it only runs at most once-per-tick


      this.update = debounce(this.update.bind(this)); // with {} we create a new object with the options inside it

      this.options = _extends$2({}, Popper.Defaults, options); // init state

      this.state = {
        isDestroyed: false,
        isCreated: false,
        scrollParents: []
      }; // get reference and popper elements (allow jQuery wrappers)

      this.reference = reference && reference.jquery ? reference[0] : reference;
      this.popper = popper && popper.jquery ? popper[0] : popper; // Deep merge modifiers options

      this.options.modifiers = {};
      Object.keys(_extends$2({}, Popper.Defaults.modifiers, options.modifiers)).forEach(function (name) {
        _this.options.modifiers[name] = _extends$2({}, Popper.Defaults.modifiers[name] || {}, options.modifiers ? options.modifiers[name] : {});
      }); // Refactoring modifiers' list (Object => Array)

      this.modifiers = Object.keys(this.options.modifiers).map(function (name) {
        return _extends$2({
          name: name
        }, _this.options.modifiers[name]);
      }) // sort the modifiers by order
      .sort(function (a, b) {
        return a.order - b.order;
      }); // modifiers have the ability to execute arbitrary code when Popper.js get inited
      // such code is executed in the same order of its modifier
      // they could add new properties to their options configuration
      // BE AWARE: don't add options to `options.modifiers.name` but to `modifierOptions`!

      this.modifiers.forEach(function (modifierOptions) {
        if (modifierOptions.enabled && isFunction$1(modifierOptions.onLoad)) {
          modifierOptions.onLoad(_this.reference, _this.popper, _this.options, modifierOptions, _this.state);
        }
      }); // fire the first update to position the popper in the right place

      this.update();
      var eventsEnabled = this.options.eventsEnabled;

      if (eventsEnabled) {
        // setup event listeners, they will take care of update the position in specific situations
        this.enableEventListeners();
      }

      this.state.eventsEnabled = eventsEnabled;
    } // We can't use class properties because they don't get listed in the
    // class prototype and break stuff like Sinon stubs


    createClass(Popper, [{
      key: 'update',
      value: function update$$1() {
        return update.call(this);
      }
    }, {
      key: 'destroy',
      value: function destroy$$1() {
        return destroy.call(this);
      }
    }, {
      key: 'enableEventListeners',
      value: function enableEventListeners$$1() {
        return enableEventListeners.call(this);
      }
    }, {
      key: 'disableEventListeners',
      value: function disableEventListeners$$1() {
        return disableEventListeners.call(this);
      }
      /**
       * Schedules an update. It will run on the next UI update available.
       * @method scheduleUpdate
       * @memberof Popper
       */

      /**
       * Collection of utilities useful when writing custom modifiers.
       * Starting from version 1.7, this method is available only if you
       * include `popper-utils.js` before `popper.js`.
       *
       * **DEPRECATION**: This way to access PopperUtils is deprecated
       * and will be removed in v2! Use the PopperUtils module directly instead.
       * Due to the high instability of the methods contained in Utils, we can't
       * guarantee them to follow semver. Use them at your own risk!
       * @static
       * @private
       * @type {Object}
       * @deprecated since version 1.8
       * @member Utils
       * @memberof Popper
       */

    }]);
    return Popper;
  }();
  /**
   * The `referenceObject` is an object that provides an interface compatible with Popper.js
   * and lets you use it as replacement of a real DOM node.<br />
   * You can use this method to position a popper relatively to a set of coordinates
   * in case you don't have a DOM node to use as reference.
   *
   * ```
   * new Popper(referenceObject, popperNode);
   * ```
   *
   * NB: This feature isn't supported in Internet Explorer 10.
   * @name referenceObject
   * @property {Function} data.getBoundingClientRect
   * A function that returns a set of coordinates compatible with the native `getBoundingClientRect` method.
   * @property {number} data.clientWidth
   * An ES6 getter that will return the width of the virtual reference element.
   * @property {number} data.clientHeight
   * An ES6 getter that will return the height of the virtual reference element.
   */


  Popper.Utils = (typeof window !== 'undefined' ? window : global).PopperUtils;
  Popper.placements = placements;
  Popper.Defaults = Defaults;

  var _extends$3 = Object.assign || function (target) {
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

  var _createClass$2 = function () {
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

  function _objectWithoutProperties$3(obj, keys) {
    var target = {};

    for (var i in obj) {
      if (keys.indexOf(i) >= 0) continue;
      if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
      target[i] = obj[i];
    }

    return target;
  }

  function _classCallCheck$2(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _possibleConstructorReturn$2(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  function _inherits$2(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }
  var placements$1 = Popper.placements;

  var Popper$1 = function (_Component) {
    _inherits$2(Popper$$1, _Component);

    function Popper$$1() {
      var _ref;

      var _temp, _this, _ret;

      _classCallCheck$2(this, Popper$$1);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _ret = (_temp = (_this = _possibleConstructorReturn$2(this, (_ref = Popper$$1.__proto__ || Object.getPrototypeOf(Popper$$1)).call.apply(_ref, [this].concat(args))), _this), _this.state = {}, _this._setArrowNode = function (node) {
        _this._arrowNode = node;
      }, _this._getTargetNode = function () {
        if (_this.props.target) {
          return _this.props.target;
        } else if (!_this.context.popperManager || !_this.context.popperManager.getTargetNode()) {
          throw new Error('Target missing. Popper must be given a target from the Popper Manager, or as a prop.');
        }

        return _this.context.popperManager.getTargetNode();
      }, _this._getOffsets = function (data) {
        return Object.keys(data.offsets).map(function (key) {
          return data.offsets[key];
        });
      }, _this._isDataDirty = function (data) {
        if (_this.state.data) {
          return JSON.stringify(_this._getOffsets(_this.state.data)) !== JSON.stringify(_this._getOffsets(data));
        } else {
          return true;
        }
      }, _this._updateStateModifier = {
        enabled: true,
        order: 900,
        fn: function fn(data) {
          if (_this._isDataDirty(data)) {
            _this.setState({
              data: data
            });
          }

          return data;
        }
      }, _this._getPopperStyle = function () {
        var data = _this.state.data;

        if (!_this._popper || !data) {
          return {
            position: 'absolute',
            pointerEvents: 'none',
            opacity: 0
          };
        }

        return _extends$3({
          position: data.offsets.popper.position
        }, data.styles);
      }, _this._getPopperPlacement = function () {
        return _this.state.data ? _this.state.data.placement : undefined;
      }, _this._getPopperHide = function () {
        return !!_this.state.data && _this.state.data.hide ? '' : undefined;
      }, _this._getArrowStyle = function () {
        if (!_this.state.data || !_this.state.data.offsets.arrow) {
          return {};
        } else {
          var _this$state$data$offs = _this.state.data.offsets.arrow,
              top = _this$state$data$offs.top,
              left = _this$state$data$offs.left;
          return {
            top: top,
            left: left
          };
        }
      }, _this._handlePopperRef = function (node) {
        _this._popperNode = node;

        if (node) {
          _this._createPopper();
        } else {
          _this._destroyPopper();
        }

        if (_this.props.innerRef) {
          _this.props.innerRef(node);
        }
      }, _this._scheduleUpdate = function () {
        _this._popper && _this._popper.scheduleUpdate();
      }, _temp), _possibleConstructorReturn$2(_this, _ret);
    }

    _createClass$2(Popper$$1, [{
      key: 'getChildContext',
      value: function getChildContext() {
        return {
          popper: {
            setArrowNode: this._setArrowNode,
            getArrowStyle: this._getArrowStyle
          }
        };
      }
    }, {
      key: 'componentDidUpdate',
      value: function componentDidUpdate(lastProps) {
        if (lastProps.placement !== this.props.placement || lastProps.eventsEnabled !== this.props.eventsEnabled || lastProps.target !== this.props.target) {
          this._destroyPopper();

          this._createPopper();
        }

        if (lastProps.children !== this.props.children) {
          this._scheduleUpdate();
        }
      }
    }, {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        this._destroyPopper();
      }
    }, {
      key: '_createPopper',
      value: function _createPopper() {
        var _this2 = this;

        var _props = this.props,
            placement = _props.placement,
            eventsEnabled = _props.eventsEnabled,
            positionFixed = _props.positionFixed;

        var modifiers = _extends$3({}, this.props.modifiers, {
          applyStyle: {
            enabled: false
          },
          updateState: this._updateStateModifier
        });

        if (this._arrowNode) {
          modifiers.arrow = _extends$3({}, this.props.modifiers.arrow || {}, {
            element: this._arrowNode
          });
        }

        this._popper = new Popper(this._getTargetNode(), this._popperNode, {
          placement: placement,
          positionFixed: positionFixed,
          eventsEnabled: eventsEnabled,
          modifiers: modifiers
        }); // TODO: look into setTimeout scheduleUpdate call, without it, the popper will not position properly on creation

        setTimeout(function () {
          return _this2._scheduleUpdate();
        });
      }
    }, {
      key: '_destroyPopper',
      value: function _destroyPopper() {
        if (this._popper) {
          this._popper.destroy();
        }
      }
    }, {
      key: 'render',
      value: function render() {
        var _props2 = this.props,
            component = _props2.component,
            innerRef = _props2.innerRef,
            placement = _props2.placement,
            eventsEnabled = _props2.eventsEnabled,
            positionFixed = _props2.positionFixed,
            modifiers = _props2.modifiers,
            children = _props2.children,
            restProps = _objectWithoutProperties$3(_props2, ['component', 'innerRef', 'placement', 'eventsEnabled', 'positionFixed', 'modifiers', 'children']);

        var popperStyle = this._getPopperStyle();

        var popperPlacement = this._getPopperPlacement();

        var popperHide = this._getPopperHide();

        if (typeof children === 'function') {
          var popperProps = {
            ref: this._handlePopperRef,
            style: popperStyle,
            'data-placement': popperPlacement,
            'data-x-out-of-boundaries': popperHide
          };
          return children({
            popperProps: popperProps,
            restProps: restProps,
            scheduleUpdate: this._scheduleUpdate
          });
        }

        var componentProps = _extends$3({}, restProps, {
          style: _extends$3({}, restProps.style, popperStyle),
          'data-placement': popperPlacement,
          'data-x-out-of-boundaries': popperHide
        });

        if (typeof component === 'string') {
          componentProps.ref = this._handlePopperRef;
        } else {
          componentProps.innerRef = this._handlePopperRef;
        }

        return React.createElement(component, componentProps, children);
      }
    }]);

    return Popper$$1;
  }(React.Component);

  Popper$1.contextTypes = {
    popperManager: propTypes.object
  };
  Popper$1.childContextTypes = {
    popper: propTypes.object.isRequired
  };
  Popper$1.propTypes = {
    component: propTypes.oneOfType([propTypes.node, propTypes.func]),
    innerRef: propTypes.func,
    placement: propTypes.oneOf(placements$1),
    eventsEnabled: propTypes.bool,
    positionFixed: propTypes.bool,
    modifiers: propTypes.object,
    children: propTypes.oneOfType([propTypes.node, propTypes.func]),
    target: propTypes.oneOfType([// the following check is needed for SSR
    propTypes.instanceOf(typeof Element !== 'undefined' ? Element : Object), propTypes.shape({
      getBoundingClientRect: propTypes.func.isRequired,
      clientWidth: propTypes.number.isRequired,
      clientHeight: propTypes.number.isRequired
    })])
  };
  Popper$1.defaultProps = {
    component: 'div',
    placement: 'bottom',
    eventsEnabled: true,
    positionFixed: false,
    modifiers: {}
  };

  var _extends$4 = Object.assign || function (target) {
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

  function _objectWithoutProperties$4(obj, keys) {
    var target = {};

    for (var i in obj) {
      if (keys.indexOf(i) >= 0) continue;
      if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
      target[i] = obj[i];
    }

    return target;
  }

  var Arrow = function Arrow(props, context) {
    var _props$component = props.component,
        component = _props$component === undefined ? 'span' : _props$component,
        innerRef = props.innerRef,
        children = props.children,
        restProps = _objectWithoutProperties$4(props, ['component', 'innerRef', 'children']);

    var popper = context.popper;

    var arrowRef = function arrowRef(node) {
      popper.setArrowNode(node);

      if (typeof innerRef === 'function') {
        innerRef(node);
      }
    };

    var arrowStyle = popper.getArrowStyle();

    if (typeof children === 'function') {
      var arrowProps = {
        ref: arrowRef,
        style: arrowStyle
      };
      return children({
        arrowProps: arrowProps,
        restProps: restProps
      });
    }

    var componentProps = _extends$4({}, restProps, {
      style: _extends$4({}, arrowStyle, restProps.style)
    });

    if (typeof component === 'string') {
      componentProps.ref = arrowRef;
    } else {
      componentProps.innerRef = arrowRef;
    }

    return React.createElement(component, componentProps, children);
  };

  Arrow.contextTypes = {
    popper: propTypes.object.isRequired
  };
  Arrow.propTypes = {
    component: propTypes.oneOfType([propTypes.node, propTypes.func]),
    innerRef: propTypes.func,
    children: propTypes.oneOfType([propTypes.node, propTypes.func])
  };

  var propTypes$9 = {
    disabled: propTypes.bool,
    dropup: deprecated(propTypes.bool, 'Please use the prop "direction" with the value "up".'),
    direction: propTypes.oneOf(['up', 'down', 'left', 'right']),
    group: propTypes.bool,
    isOpen: propTypes.bool,
    nav: propTypes.bool,
    active: propTypes.bool,
    addonType: propTypes.oneOfType([propTypes.bool, propTypes.oneOf(['prepend', 'append'])]),
    size: propTypes.string,
    tag: propTypes.string,
    toggle: propTypes.func,
    children: propTypes.node,
    className: propTypes.string,
    cssModule: propTypes.object,
    inNavbar: propTypes.bool,
    setActiveFromChild: propTypes.bool
  };
  var defaultProps$8 = {
    isOpen: false,
    direction: 'down',
    nav: false,
    active: false,
    addonType: false,
    inNavbar: false,
    setActiveFromChild: false
  };
  var childContextTypes = {
    toggle: propTypes.func.isRequired,
    isOpen: propTypes.bool.isRequired,
    direction: propTypes.oneOf(['up', 'down', 'left', 'right']).isRequired,
    inNavbar: propTypes.bool.isRequired
  };

  var Dropdown =
  /*#__PURE__*/
  function (_React$Component) {
    _inheritsLoose(Dropdown, _React$Component);

    function Dropdown(props) {
      var _this;

      _this = _React$Component.call(this, props) || this;
      _this.addEvents = _this.addEvents.bind(_assertThisInitialized(_assertThisInitialized(_this)));
      _this.handleDocumentClick = _this.handleDocumentClick.bind(_assertThisInitialized(_assertThisInitialized(_this)));
      _this.handleKeyDown = _this.handleKeyDown.bind(_assertThisInitialized(_assertThisInitialized(_this)));
      _this.removeEvents = _this.removeEvents.bind(_assertThisInitialized(_assertThisInitialized(_this)));
      _this.toggle = _this.toggle.bind(_assertThisInitialized(_assertThisInitialized(_this)));
      return _this;
    }

    var _proto = Dropdown.prototype;

    _proto.getChildContext = function getChildContext() {
      return {
        toggle: this.props.toggle,
        isOpen: this.props.isOpen,
        direction: this.props.direction === 'down' && this.props.dropup ? 'up' : this.props.direction,
        inNavbar: this.props.inNavbar
      };
    };

    _proto.componentDidMount = function componentDidMount() {
      this.handleProps();
    };

    _proto.componentDidUpdate = function componentDidUpdate(prevProps) {
      if (this.props.isOpen !== prevProps.isOpen) {
        this.handleProps();
      }
    };

    _proto.componentWillUnmount = function componentWillUnmount() {
      this.removeEvents();
    };

    _proto.getContainer = function getContainer() {
      if (this._$container) return this._$container;
      this._$container = ReactDOM.findDOMNode(this);
      return ReactDOM.findDOMNode(this);
    };

    _proto.getMenuCtrl = function getMenuCtrl() {
      if (this._$menuCtrl) return this._$menuCtrl;
      this._$menuCtrl = this.getContainer().querySelector('[aria-expanded]');
      return this._$menuCtrl;
    };

    _proto.getMenuItems = function getMenuItems() {
      return [].slice.call(this.getContainer().querySelectorAll('[role="menuitem"]'));
    };

    _proto.addEvents = function addEvents() {
      var _this2 = this;

      ['click', 'touchstart', 'keyup'].forEach(function (event) {
        return document.addEventListener(event, _this2.handleDocumentClick, true);
      });
    };

    _proto.removeEvents = function removeEvents() {
      var _this3 = this;

      ['click', 'touchstart', 'keyup'].forEach(function (event) {
        return document.removeEventListener(event, _this3.handleDocumentClick, true);
      });
    };

    _proto.handleDocumentClick = function handleDocumentClick(e) {
      if (e && (e.which === 3 || e.type === 'keyup' && e.which !== keyCodes.tab)) return;
      var container = this.getContainer();

      if (container.contains(e.target) && container !== e.target && (e.type !== 'keyup' || e.which === keyCodes.tab)) {
        return;
      }

      this.toggle(e);
    };

    _proto.handleKeyDown = function handleKeyDown(e) {
      var _this4 = this;

      if (/input|textarea/i.test(e.target.tagName) || keyCodes.tab === e.which && e.target.getAttribute('role') !== 'menuitem') {
        return;
      }

      e.preventDefault();
      if (this.props.disabled) return;

      if (this.getMenuCtrl() === e.target) {
        if (!this.props.isOpen && [keyCodes.space, keyCodes.enter, keyCodes.up, keyCodes.down].indexOf(e.which) > -1) {
          this.toggle(e);
          setTimeout(function () {
            return _this4.getMenuItems()[0].focus();
          });
        }
      }

      if (this.props.isOpen && e.target.getAttribute('role') === 'menuitem') {
        if ([keyCodes.tab, keyCodes.esc].indexOf(e.which) > -1) {
          this.toggle(e);
          this.getMenuCtrl().focus();
        } else if ([keyCodes.space, keyCodes.enter].indexOf(e.which) > -1) {
          e.target.click();
          this.getMenuCtrl().focus();
        } else if ([keyCodes.down, keyCodes.up].indexOf(e.which) > -1 || [keyCodes.n, keyCodes.p].indexOf(e.which) > -1 && e.ctrlKey) {
          var $menuitems = this.getMenuItems();
          var index = $menuitems.indexOf(e.target);

          if (keyCodes.up === e.which || keyCodes.p === e.which && e.ctrlKey) {
            index = index !== 0 ? index - 1 : $menuitems.length - 1;
          } else if (keyCodes.down === e.which || keyCodes.n === e.which && e.ctrlKey) {
            index = index === $menuitems.length - 1 ? 0 : index + 1;
          }

          $menuitems[index].focus();
        } else if (keyCodes.end === e.which) {
          var _$menuitems = this.getMenuItems();

          _$menuitems[_$menuitems.length - 1].focus();
        } else if (keyCodes.home === e.which) {
          var _$menuitems2 = this.getMenuItems();

          _$menuitems2[0].focus();
        } else if (e.which >= 48 && e.which <= 90) {
          var _$menuitems3 = this.getMenuItems();

          var charPressed = String.fromCharCode(e.which).toLowerCase();

          for (var i = 0; i < _$menuitems3.length; i += 1) {
            var firstLetter = _$menuitems3[i].textContent && _$menuitems3[i].textContent[0].toLowerCase();

            if (firstLetter === charPressed) {
              _$menuitems3[i].focus();

              break;
            }
          }
        }
      }
    };

    _proto.handleProps = function handleProps() {
      if (this.props.isOpen) {
        this.addEvents();
      } else {
        this.removeEvents();
      }
    };

    _proto.toggle = function toggle(e) {
      if (this.props.disabled) {
        return e && e.preventDefault();
      }

      return this.props.toggle(e);
    };

    _proto.render = function render() {
      var _classNames;

      var _omit = omit(this.props, ['toggle', 'disabled', 'inNavbar', 'direction']),
          className = _omit.className,
          cssModule = _omit.cssModule,
          dropup = _omit.dropup,
          isOpen = _omit.isOpen,
          group = _omit.group,
          size = _omit.size,
          nav = _omit.nav,
          setActiveFromChild = _omit.setActiveFromChild,
          active = _omit.active,
          addonType = _omit.addonType,
          attrs = _objectWithoutPropertiesLoose(_omit, ["className", "cssModule", "dropup", "isOpen", "group", "size", "nav", "setActiveFromChild", "active", "addonType"]);

      var direction = this.props.direction === 'down' && dropup ? 'up' : this.props.direction;
      attrs.tag = attrs.tag || (nav ? 'li' : 'div');
      var subItemIsActive = false;

      if (setActiveFromChild) {
        React__default.Children.map(this.props.children[1].props.children, function (dropdownItem) {
          if (dropdownItem && dropdownItem.props.active) subItemIsActive = true;
        });
      }

      var classes = mapToCssModules(classnames(className, direction !== 'down' && "drop" + direction, nav && active ? 'active' : false, setActiveFromChild && subItemIsActive ? 'active' : false, (_classNames = {}, _classNames["input-group-" + addonType] = addonType, _classNames['btn-group'] = group, _classNames["btn-group-" + size] = !!size, _classNames.dropdown = !group && !addonType, _classNames.show = isOpen, _classNames['nav-item'] = nav, _classNames)), cssModule);
      return React__default.createElement(Manager, _extends({}, attrs, {
        className: classes,
        onKeyDown: this.handleKeyDown
      }));
    };

    return Dropdown;
  }(React__default.Component);

  Dropdown.propTypes = propTypes$9;
  Dropdown.defaultProps = defaultProps$8;
  Dropdown.childContextTypes = childContextTypes;

  function NavDropdown(props) {
    warnOnce('The "NavDropdown" component has been deprecated.\nPlease use component "Dropdown" with nav prop.');
    return React__default.createElement(Dropdown, _extends({
      nav: true
    }, props));
  }

  var propTypes$a = {
    tag: propTypes.oneOfType([propTypes.func, propTypes.string]),
    innerRef: propTypes.oneOfType([propTypes.object, propTypes.func, propTypes.string]),
    disabled: propTypes.bool,
    active: propTypes.bool,
    className: propTypes.string,
    cssModule: propTypes.object,
    onClick: propTypes.func,
    href: propTypes.any
  };
  var defaultProps$9 = {
    tag: 'a'
  };

  var NavLink =
  /*#__PURE__*/
  function (_React$Component) {
    _inheritsLoose(NavLink, _React$Component);

    function NavLink(props) {
      var _this;

      _this = _React$Component.call(this, props) || this;
      _this.onClick = _this.onClick.bind(_assertThisInitialized(_assertThisInitialized(_this)));
      return _this;
    }

    var _proto = NavLink.prototype;

    _proto.onClick = function onClick(e) {
      if (this.props.disabled) {
        e.preventDefault();
        return;
      }

      if (this.props.href === '#') {
        e.preventDefault();
      }

      if (this.props.onClick) {
        this.props.onClick(e);
      }
    };

    _proto.render = function render() {
      var _this$props = this.props,
          className = _this$props.className,
          cssModule = _this$props.cssModule,
          active = _this$props.active,
          Tag = _this$props.tag,
          innerRef = _this$props.innerRef,
          attributes = _objectWithoutPropertiesLoose(_this$props, ["className", "cssModule", "active", "tag", "innerRef"]);

      var classes = mapToCssModules(classnames(className, 'nav-link', {
        disabled: attributes.disabled,
        active: active
      }), cssModule);
      return React__default.createElement(Tag, _extends({}, attributes, {
        ref: innerRef,
        onClick: this.onClick,
        className: classes
      }));
    };

    return NavLink;
  }(React__default.Component);

  NavLink.propTypes = propTypes$a;
  NavLink.defaultProps = defaultProps$9;

  var propTypes$b = {
    tag: propTypes.oneOfType([propTypes.func, propTypes.string]),
    listTag: propTypes.oneOfType([propTypes.func, propTypes.string]),
    className: propTypes.string,
    listClassName: propTypes.string,
    cssModule: propTypes.object,
    children: propTypes.node,
    'aria-label': propTypes.string
  };
  var defaultProps$a = {
    tag: 'nav',
    listTag: 'ol',
    'aria-label': 'breadcrumb'
  };

  var Breadcrumb = function Breadcrumb(props) {
    var className = props.className,
        listClassName = props.listClassName,
        cssModule = props.cssModule,
        children = props.children,
        Tag = props.tag,
        ListTag = props.listTag,
        label = props['aria-label'],
        attributes = _objectWithoutPropertiesLoose(props, ["className", "listClassName", "cssModule", "children", "tag", "listTag", "aria-label"]);

    var classes = mapToCssModules(classnames(className), cssModule);
    var listClasses = mapToCssModules(classnames('breadcrumb', listClassName), cssModule);
    return React__default.createElement(Tag, _extends({}, attributes, {
      className: classes,
      "aria-label": label
    }), React__default.createElement(ListTag, {
      className: listClasses
    }, children));
  };

  Breadcrumb.propTypes = propTypes$b;
  Breadcrumb.defaultProps = defaultProps$a;

  var propTypes$c = {
    tag: propTypes.oneOfType([propTypes.func, propTypes.string]),
    active: propTypes.bool,
    className: propTypes.string,
    cssModule: propTypes.object
  };
  var defaultProps$b = {
    tag: 'li'
  };

  var BreadcrumbItem = function BreadcrumbItem(props) {
    var className = props.className,
        cssModule = props.cssModule,
        active = props.active,
        Tag = props.tag,
        attributes = _objectWithoutPropertiesLoose(props, ["className", "cssModule", "active", "tag"]);

    var classes = mapToCssModules(classnames(className, active ? 'active' : false, 'breadcrumb-item'), cssModule);
    return React__default.createElement(Tag, _extends({}, attributes, {
      className: classes,
      "aria-current": active ? 'page' : undefined
    }));
  };

  BreadcrumbItem.propTypes = propTypes$c;
  BreadcrumbItem.defaultProps = defaultProps$b;

  var propTypes$d = {
    active: propTypes.bool,
    'aria-label': propTypes.string,
    block: propTypes.bool,
    color: propTypes.string,
    disabled: propTypes.bool,
    outline: propTypes.bool,
    tag: propTypes.oneOfType([propTypes.func, propTypes.string]),
    innerRef: propTypes.oneOfType([propTypes.object, propTypes.func, propTypes.string]),
    onClick: propTypes.func,
    size: propTypes.string,
    children: propTypes.node,
    className: propTypes.string,
    cssModule: propTypes.object,
    close: propTypes.bool
  };
  var defaultProps$c = {
    color: 'secondary',
    tag: 'button'
  };

  var Button =
  /*#__PURE__*/
  function (_React$Component) {
    _inheritsLoose(Button, _React$Component);

    function Button(props) {
      var _this;

      _this = _React$Component.call(this, props) || this;
      _this.onClick = _this.onClick.bind(_assertThisInitialized(_assertThisInitialized(_this)));
      return _this;
    }

    var _proto = Button.prototype;

    _proto.onClick = function onClick(e) {
      if (this.props.disabled) {
        e.preventDefault();
        return;
      }

      if (this.props.onClick) {
        this.props.onClick(e);
      }
    };

    _proto.render = function render() {
      var _this$props = this.props,
          active = _this$props.active,
          ariaLabel = _this$props['aria-label'],
          block = _this$props.block,
          className = _this$props.className,
          close = _this$props.close,
          cssModule = _this$props.cssModule,
          color = _this$props.color,
          outline = _this$props.outline,
          size = _this$props.size,
          Tag = _this$props.tag,
          innerRef = _this$props.innerRef,
          attributes = _objectWithoutPropertiesLoose(_this$props, ["active", "aria-label", "block", "className", "close", "cssModule", "color", "outline", "size", "tag", "innerRef"]);

      if (close && typeof attributes.children === 'undefined') {
        attributes.children = React__default.createElement("span", {
          "aria-hidden": true
        }, "\xD7");
      }

      var btnOutlineColor = "btn" + (outline ? '-outline' : '') + "-" + color;
      var classes = mapToCssModules(classnames(className, {
        close: close
      }, close || 'btn', close || btnOutlineColor, size ? "btn-" + size : false, block ? 'btn-block' : false, {
        active: active,
        disabled: this.props.disabled
      }), cssModule);

      if (attributes.href && Tag === 'button') {
        Tag = 'a';
      }

      var defaultAriaLabel = close ? 'Close' : null;
      return React__default.createElement(Tag, _extends({
        type: Tag === 'button' && attributes.onClick ? 'button' : undefined
      }, attributes, {
        className: classes,
        ref: innerRef,
        onClick: this.onClick,
        "aria-label": ariaLabel || defaultAriaLabel
      }));
    };

    return Button;
  }(React__default.Component);

  Button.propTypes = propTypes$d;
  Button.defaultProps = defaultProps$c;

  var propTypes$e = {
    children: propTypes.node
  };

  var ButtonDropdown = function ButtonDropdown(props) {
    return React__default.createElement(Dropdown, _extends({
      group: true
    }, props));
  };

  ButtonDropdown.propTypes = propTypes$e;

  var propTypes$f = {
    tag: propTypes.oneOfType([propTypes.func, propTypes.string]),
    'aria-label': propTypes.string,
    className: propTypes.string,
    cssModule: propTypes.object,
    role: propTypes.string,
    size: propTypes.string,
    vertical: propTypes.bool
  };
  var defaultProps$d = {
    tag: 'div',
    role: 'group'
  };

  var ButtonGroup = function ButtonGroup(props) {
    var className = props.className,
        cssModule = props.cssModule,
        size = props.size,
        vertical = props.vertical,
        Tag = props.tag,
        attributes = _objectWithoutPropertiesLoose(props, ["className", "cssModule", "size", "vertical", "tag"]);

    var classes = mapToCssModules(classnames(className, size ? 'btn-group-' + size : false, vertical ? 'btn-group-vertical' : 'btn-group'), cssModule);
    return React__default.createElement(Tag, _extends({}, attributes, {
      className: classes
    }));
  };

  ButtonGroup.propTypes = propTypes$f;
  ButtonGroup.defaultProps = defaultProps$d;

  var propTypes$g = {
    tag: propTypes.oneOfType([propTypes.func, propTypes.string]),
    'aria-label': propTypes.string,
    className: propTypes.string,
    cssModule: propTypes.object,
    role: propTypes.string
  };
  var defaultProps$e = {
    tag: 'div',
    role: 'toolbar'
  };

  var ButtonToolbar = function ButtonToolbar(props) {
    var className = props.className,
        cssModule = props.cssModule,
        Tag = props.tag,
        attributes = _objectWithoutPropertiesLoose(props, ["className", "cssModule", "tag"]);

    var classes = mapToCssModules(classnames(className, 'btn-toolbar'), cssModule);
    return React__default.createElement(Tag, _extends({}, attributes, {
      className: classes
    }));
  };

  ButtonToolbar.propTypes = propTypes$g;
  ButtonToolbar.defaultProps = defaultProps$e;

  var propTypes$h = {
    children: propTypes.node,
    active: propTypes.bool,
    disabled: propTypes.bool,
    divider: propTypes.bool,
    tag: propTypes.oneOfType([propTypes.func, propTypes.string]),
    header: propTypes.bool,
    onClick: propTypes.func,
    className: propTypes.string,
    cssModule: propTypes.object,
    toggle: propTypes.bool
  };
  var contextTypes = {
    toggle: propTypes.func
  };
  var defaultProps$f = {
    tag: 'button',
    toggle: true
  };

  var DropdownItem =
  /*#__PURE__*/
  function (_React$Component) {
    _inheritsLoose(DropdownItem, _React$Component);

    function DropdownItem(props) {
      var _this;

      _this = _React$Component.call(this, props) || this;
      _this.onClick = _this.onClick.bind(_assertThisInitialized(_assertThisInitialized(_this)));
      _this.getTabIndex = _this.getTabIndex.bind(_assertThisInitialized(_assertThisInitialized(_this)));
      return _this;
    }

    var _proto = DropdownItem.prototype;

    _proto.onClick = function onClick(e) {
      if (this.props.disabled || this.props.header || this.props.divider) {
        e.preventDefault();
        return;
      }

      if (this.props.onClick) {
        this.props.onClick(e);
      }

      if (this.props.toggle) {
        this.context.toggle(e);
      }
    };

    _proto.getTabIndex = function getTabIndex() {
      if (this.props.disabled || this.props.header || this.props.divider) {
        return '-1';
      }

      return '0';
    };

    _proto.render = function render() {
      var tabIndex = this.getTabIndex();
      var role = tabIndex > -1 ? 'menuitem' : undefined;

      var _omit = omit(this.props, ['toggle']),
          className = _omit.className,
          cssModule = _omit.cssModule,
          divider = _omit.divider,
          Tag = _omit.tag,
          header = _omit.header,
          active = _omit.active,
          props = _objectWithoutPropertiesLoose(_omit, ["className", "cssModule", "divider", "tag", "header", "active"]);

      var classes = mapToCssModules(classnames(className, {
        disabled: props.disabled,
        'dropdown-item': !divider && !header,
        active: active,
        'dropdown-header': header,
        'dropdown-divider': divider
      }), cssModule);

      if (Tag === 'button') {
        if (header) {
          Tag = 'h6';
        } else if (divider) {
          Tag = 'div';
        } else if (props.href) {
          Tag = 'a';
        }
      }

      return React__default.createElement(Tag, _extends({
        type: Tag === 'button' && (props.onClick || this.props.toggle) ? 'button' : undefined
      }, props, {
        tabIndex: tabIndex,
        role: role,
        className: classes,
        onClick: this.onClick
      }));
    };

    return DropdownItem;
  }(React__default.Component);

  DropdownItem.propTypes = propTypes$h;
  DropdownItem.defaultProps = defaultProps$f;
  DropdownItem.contextTypes = contextTypes;

  var propTypes$i = {
    tag: propTypes.string,
    children: propTypes.node.isRequired,
    right: propTypes.bool,
    flip: propTypes.bool,
    modifiers: propTypes.object,
    className: propTypes.string,
    cssModule: propTypes.object,
    persist: propTypes.bool
  };
  var defaultProps$g = {
    tag: 'div',
    flip: true
  };
  var contextTypes$1 = {
    isOpen: propTypes.bool.isRequired,
    direction: propTypes.oneOf(['up', 'down', 'left', 'right']).isRequired,
    inNavbar: propTypes.bool.isRequired
  };
  var noFlipModifier = {
    flip: {
      enabled: false
    }
  };
  var directionPositionMap = {
    up: 'top',
    left: 'left',
    right: 'right',
    down: 'bottom'
  };

  var DropdownMenu = function DropdownMenu(props, context) {
    var className = props.className,
        cssModule = props.cssModule,
        right = props.right,
        tag = props.tag,
        flip = props.flip,
        modifiers = props.modifiers,
        persist = props.persist,
        attrs = _objectWithoutPropertiesLoose(props, ["className", "cssModule", "right", "tag", "flip", "modifiers", "persist"]);

    var classes = mapToCssModules(classnames(className, 'dropdown-menu', {
      'dropdown-menu-right': right,
      show: context.isOpen
    }), cssModule);
    var Tag = tag;

    if (persist || context.isOpen && !context.inNavbar) {
      Tag = Popper$1;
      var position1 = directionPositionMap[context.direction] || 'bottom';
      var position2 = right ? 'end' : 'start';
      attrs.placement = position1 + "-" + position2;
      attrs.component = tag;
      attrs.modifiers = !flip ? _extends({}, modifiers, noFlipModifier) : modifiers;
    }

    return React__default.createElement(Tag, _extends({
      tabIndex: "-1",
      role: "menu"
    }, attrs, {
      "aria-hidden": !context.isOpen,
      className: classes,
      "x-placement": attrs.placement
    }));
  };

  DropdownMenu.propTypes = propTypes$i;
  DropdownMenu.defaultProps = defaultProps$g;
  DropdownMenu.contextTypes = contextTypes$1;

  var propTypes$j = {
    caret: propTypes.bool,
    color: propTypes.string,
    children: propTypes.node,
    className: propTypes.string,
    cssModule: propTypes.object,
    disabled: propTypes.bool,
    onClick: propTypes.func,
    'aria-haspopup': propTypes.bool,
    split: propTypes.bool,
    tag: propTypes.oneOfType([propTypes.func, propTypes.string]),
    nav: propTypes.bool
  };
  var defaultProps$h = {
    'aria-haspopup': true,
    color: 'secondary'
  };
  var contextTypes$2 = {
    isOpen: propTypes.bool.isRequired,
    toggle: propTypes.func.isRequired,
    inNavbar: propTypes.bool.isRequired
  };

  var DropdownToggle =
  /*#__PURE__*/
  function (_React$Component) {
    _inheritsLoose(DropdownToggle, _React$Component);

    function DropdownToggle(props) {
      var _this;

      _this = _React$Component.call(this, props) || this;
      _this.onClick = _this.onClick.bind(_assertThisInitialized(_assertThisInitialized(_this)));
      return _this;
    }

    var _proto = DropdownToggle.prototype;

    _proto.onClick = function onClick(e) {
      if (this.props.disabled) {
        e.preventDefault();
        return;
      }

      if (this.props.nav && !this.props.tag) {
        e.preventDefault();
      }

      if (this.props.onClick) {
        this.props.onClick(e);
      }

      this.context.toggle(e);
    };

    _proto.render = function render() {
      var _this$props = this.props,
          className = _this$props.className,
          color = _this$props.color,
          cssModule = _this$props.cssModule,
          caret = _this$props.caret,
          split = _this$props.split,
          nav = _this$props.nav,
          tag = _this$props.tag,
          props = _objectWithoutPropertiesLoose(_this$props, ["className", "color", "cssModule", "caret", "split", "nav", "tag"]);

      var ariaLabel = props['aria-label'] || 'Toggle Dropdown';
      var classes = mapToCssModules(classnames(className, {
        'dropdown-toggle': caret || split,
        'dropdown-toggle-split': split,
        'nav-link': nav
      }), cssModule);
      var children = props.children || React__default.createElement("span", {
        className: "sr-only"
      }, ariaLabel);
      var Tag;

      if (nav && !tag) {
        Tag = 'a';
        props.href = '#';
      } else if (!tag) {
        Tag = Button;
        props.color = color;
        props.cssModule = cssModule;
      } else {
        Tag = tag;
      }

      if (this.context.inNavbar) {
        return React__default.createElement(Tag, _extends({}, props, {
          className: classes,
          onClick: this.onClick,
          "aria-expanded": this.context.isOpen,
          children: children
        }));
      }

      return React__default.createElement(Target, _extends({}, props, {
        className: classes,
        component: Tag,
        onClick: this.onClick,
        "aria-expanded": this.context.isOpen,
        children: children
      }));
    };

    return DropdownToggle;
  }(React__default.Component);

  DropdownToggle.propTypes = propTypes$j;
  DropdownToggle.defaultProps = defaultProps$h;
  DropdownToggle.contextTypes = contextTypes$2;

  var interopRequireDefault = createCommonjsModule(function (module) {
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {
        default: obj
      };
    }

    module.exports = _interopRequireDefault;
  });
  unwrapExports(interopRequireDefault);

  var hasClass_1 = createCommonjsModule(function (module, exports) {

    exports.__esModule = true;
    exports.default = hasClass;

    function hasClass(element, className) {
      if (element.classList) return !!className && element.classList.contains(className);else return (" " + (element.className.baseVal || element.className) + " ").indexOf(" " + className + " ") !== -1;
    }

    module.exports = exports["default"];
  });
  unwrapExports(hasClass_1);

  var addClass_1 = createCommonjsModule(function (module, exports) {

    exports.__esModule = true;
    exports.default = addClass;

    var _hasClass = interopRequireDefault(hasClass_1);

    function addClass(element, className) {
      if (element.classList) element.classList.add(className);else if (!(0, _hasClass.default)(element, className)) if (typeof element.className === 'string') element.className = element.className + ' ' + className;else element.setAttribute('class', (element.className && element.className.baseVal || '') + ' ' + className);
    }

    module.exports = exports["default"];
  });
  unwrapExports(addClass_1);

  function replaceClassName(origClass, classToRemove) {
    return origClass.replace(new RegExp('(^|\\s)' + classToRemove + '(?:\\s|$)', 'g'), '$1').replace(/\s+/g, ' ').replace(/^\s*|\s*$/g, '');
  }

  var removeClass = function removeClass(element, className) {
    if (element.classList) element.classList.remove(className);else if (typeof element.className === 'string') element.className = replaceClassName(element.className, className);else element.setAttribute('class', replaceClassName(element.className && element.className.baseVal || '', className));
  };

  /**
   * Copyright (c) 2013-present, Facebook, Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */
  function componentWillMount() {
    // Call this.constructor.gDSFP to support sub-classes.
    var state = this.constructor.getDerivedStateFromProps(this.props, this.state);

    if (state !== null && state !== undefined) {
      this.setState(state);
    }
  }

  function componentWillReceiveProps(nextProps) {
    // Call this.constructor.gDSFP to support sub-classes.
    // Use the setState() updater to ensure state isn't stale in certain edge cases.
    function updater(prevState) {
      var state = this.constructor.getDerivedStateFromProps(nextProps, prevState);
      return state !== null && state !== undefined ? state : null;
    } // Binding "this" is important for shallow renderer support.


    this.setState(updater.bind(this));
  }

  function componentWillUpdate(nextProps, nextState) {
    try {
      var prevProps = this.props;
      var prevState = this.state;
      this.props = nextProps;
      this.state = nextState;
      this.__reactInternalSnapshotFlag = true;
      this.__reactInternalSnapshot = this.getSnapshotBeforeUpdate(prevProps, prevState);
    } finally {
      this.props = prevProps;
      this.state = prevState;
    }
  } // React may warn about cWM/cWRP/cWU methods being deprecated.
  // Add a flag to suppress these warnings for this special case.


  componentWillMount.__suppressDeprecationWarning = true;
  componentWillReceiveProps.__suppressDeprecationWarning = true;
  componentWillUpdate.__suppressDeprecationWarning = true;

  function polyfill(Component) {
    var prototype = Component.prototype;

    if (!prototype || !prototype.isReactComponent) {
      throw new Error('Can only polyfill class components');
    }

    if (typeof Component.getDerivedStateFromProps !== 'function' && typeof prototype.getSnapshotBeforeUpdate !== 'function') {
      return Component;
    } // If new component APIs are defined, "unsafe" lifecycles won't be called.
    // Error if any of these lifecycles are present,
    // Because they would work differently between older and newer (16.3+) versions of React.


    var foundWillMountName = null;
    var foundWillReceivePropsName = null;
    var foundWillUpdateName = null;

    if (typeof prototype.componentWillMount === 'function') {
      foundWillMountName = 'componentWillMount';
    } else if (typeof prototype.UNSAFE_componentWillMount === 'function') {
      foundWillMountName = 'UNSAFE_componentWillMount';
    }

    if (typeof prototype.componentWillReceiveProps === 'function') {
      foundWillReceivePropsName = 'componentWillReceiveProps';
    } else if (typeof prototype.UNSAFE_componentWillReceiveProps === 'function') {
      foundWillReceivePropsName = 'UNSAFE_componentWillReceiveProps';
    }

    if (typeof prototype.componentWillUpdate === 'function') {
      foundWillUpdateName = 'componentWillUpdate';
    } else if (typeof prototype.UNSAFE_componentWillUpdate === 'function') {
      foundWillUpdateName = 'UNSAFE_componentWillUpdate';
    }

    if (foundWillMountName !== null || foundWillReceivePropsName !== null || foundWillUpdateName !== null) {
      var componentName = Component.displayName || Component.name;
      var newApiName = typeof Component.getDerivedStateFromProps === 'function' ? 'getDerivedStateFromProps()' : 'getSnapshotBeforeUpdate()';
      throw Error('Unsafe legacy lifecycles will not be called for components using new component APIs.\n\n' + componentName + ' uses ' + newApiName + ' but also contains the following legacy lifecycles:' + (foundWillMountName !== null ? '\n  ' + foundWillMountName : '') + (foundWillReceivePropsName !== null ? '\n  ' + foundWillReceivePropsName : '') + (foundWillUpdateName !== null ? '\n  ' + foundWillUpdateName : '') + '\n\nThe above lifecycles should be removed. Learn more about this warning here:\n' + 'https://fb.me/react-async-component-lifecycle-hooks');
    } // React <= 16.2 does not support static getDerivedStateFromProps.
    // As a workaround, use cWM and cWRP to invoke the new static lifecycle.
    // Newer versions of React will ignore these lifecycles if gDSFP exists.


    if (typeof Component.getDerivedStateFromProps === 'function') {
      prototype.componentWillMount = componentWillMount;
      prototype.componentWillReceiveProps = componentWillReceiveProps;
    } // React <= 16.2 does not support getSnapshotBeforeUpdate.
    // As a workaround, use cWU to invoke the new lifecycle.
    // Newer versions of React will ignore that lifecycle if gSBU exists.


    if (typeof prototype.getSnapshotBeforeUpdate === 'function') {
      if (typeof prototype.componentDidUpdate !== 'function') {
        throw new Error('Cannot polyfill getSnapshotBeforeUpdate() for components that do not define componentDidUpdate() on the prototype');
      }

      prototype.componentWillUpdate = componentWillUpdate;
      var componentDidUpdate = prototype.componentDidUpdate;

      prototype.componentDidUpdate = function componentDidUpdatePolyfill(prevProps, prevState, maybeSnapshot) {
        // 16.3+ will not execute our will-update method;
        // It will pass a snapshot value to did-update though.
        // Older versions will require our polyfilled will-update value.
        // We need to handle both cases, but can't just check for the presence of "maybeSnapshot",
        // Because for <= 15.x versions this might be a "prevContext" object.
        // We also can't just check "__reactInternalSnapshot",
        // Because get-snapshot might return a falsy value.
        // So check for the explicit __reactInternalSnapshotFlag flag to determine behavior.
        var snapshot = this.__reactInternalSnapshotFlag ? this.__reactInternalSnapshot : maybeSnapshot;
        componentDidUpdate.call(this, prevProps, prevState, snapshot);
      };
    }

    return Component;
  }

  var reactLifecyclesCompat_es = /*#__PURE__*/Object.freeze({
    polyfill: polyfill
  });

  var PropTypes = createCommonjsModule(function (module, exports) {

    exports.__esModule = true;
    exports.transitionTimeout = transitionTimeout;
    exports.classNamesShape = exports.timeoutsShape = void 0;

    var _propTypes = _interopRequireDefault(propTypes);

    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {
        default: obj
      };
    }

    function transitionTimeout(transitionType) {
      var timeoutPropName = 'transition' + transitionType + 'Timeout';
      var enabledPropName = 'transition' + transitionType;
      return function (props) {
        // If the transition is enabled
        if (props[enabledPropName]) {
          // If no timeout duration is provided
          if (props[timeoutPropName] == null) {
            return new Error(timeoutPropName + ' wasn\'t supplied to CSSTransitionGroup: ' + 'this can cause unreliable animations and won\'t be supported in ' + 'a future version of React. See ' + 'https://fb.me/react-animation-transition-group-timeout for more ' + 'information.'); // If the duration isn't a number
          } else if (typeof props[timeoutPropName] !== 'number') {
            return new Error(timeoutPropName + ' must be a number (in milliseconds)');
          }
        }

        return null;
      };
    }

    var timeoutsShape = _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.shape({
      enter: _propTypes.default.number,
      exit: _propTypes.default.number
    }).isRequired]);

    exports.timeoutsShape = timeoutsShape;

    var classNamesShape = _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.shape({
      enter: _propTypes.default.string,
      exit: _propTypes.default.string,
      active: _propTypes.default.string
    }), _propTypes.default.shape({
      enter: _propTypes.default.string,
      enterDone: _propTypes.default.string,
      enterActive: _propTypes.default.string,
      exit: _propTypes.default.string,
      exitDone: _propTypes.default.string,
      exitActive: _propTypes.default.string
    })]);

    exports.classNamesShape = classNamesShape;
  });
  unwrapExports(PropTypes);
  var PropTypes_1 = PropTypes.transitionTimeout;
  var PropTypes_2 = PropTypes.classNamesShape;
  var PropTypes_3 = PropTypes.timeoutsShape;

  var Transition_1 = createCommonjsModule(function (module, exports) {

    exports.__esModule = true;
    exports.default = exports.EXITING = exports.ENTERED = exports.ENTERING = exports.EXITED = exports.UNMOUNTED = void 0;

    var PropTypes$$1 = _interopRequireWildcard(propTypes);

    var _react = _interopRequireDefault(React__default);

    var _reactDom = _interopRequireDefault(ReactDOM);

    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {
        default: obj
      };
    }

    function _interopRequireWildcard(obj) {
      if (obj && obj.__esModule) {
        return obj;
      } else {
        var newObj = {};

        if (obj != null) {
          for (var key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
              var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {};

              if (desc.get || desc.set) {
                Object.defineProperty(newObj, key, desc);
              } else {
                newObj[key] = obj[key];
              }
            }
          }
        }

        newObj.default = obj;
        return newObj;
      }
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

    function _inheritsLoose(subClass, superClass) {
      subClass.prototype = Object.create(superClass.prototype);
      subClass.prototype.constructor = subClass;
      subClass.__proto__ = superClass;
    }

    var UNMOUNTED = 'unmounted';
    exports.UNMOUNTED = UNMOUNTED;
    var EXITED = 'exited';
    exports.EXITED = EXITED;
    var ENTERING = 'entering';
    exports.ENTERING = ENTERING;
    var ENTERED = 'entered';
    exports.ENTERED = ENTERED;
    var EXITING = 'exiting';
    /**
     * The Transition component lets you describe a transition from one component
     * state to another _over time_ with a simple declarative API. Most commonly
     * it's used to animate the mounting and unmounting of a component, but can also
     * be used to describe in-place transition states as well.
     *
     * By default the `Transition` component does not alter the behavior of the
     * component it renders, it only tracks "enter" and "exit" states for the components.
     * It's up to you to give meaning and effect to those states. For example we can
     * add styles to a component when it enters or exits:
     *
     * ```jsx
     * import Transition from 'react-transition-group/Transition';
     *
     * const duration = 300;
     *
     * const defaultStyle = {
     *   transition: `opacity ${duration}ms ease-in-out`,
     *   opacity: 0,
     * }
     *
     * const transitionStyles = {
     *   entering: { opacity: 0 },
     *   entered:  { opacity: 1 },
     * };
     *
     * const Fade = ({ in: inProp }) => (
     *   <Transition in={inProp} timeout={duration}>
     *     {(state) => (
     *       <div style={{
     *         ...defaultStyle,
     *         ...transitionStyles[state]
     *       }}>
     *         I'm a fade Transition!
     *       </div>
     *     )}
     *   </Transition>
     * );
     * ```
     *
     * As noted the `Transition` component doesn't _do_ anything by itself to its child component.
     * What it does do is track transition states over time so you can update the
     * component (such as by adding styles or classes) when it changes states.
     *
     * There are 4 main states a Transition can be in:
     *  - `'entering'`
     *  - `'entered'`
     *  - `'exiting'`
     *  - `'exited'`
     *
     * Transition state is toggled via the `in` prop. When `true` the component begins the
     * "Enter" stage. During this stage, the component will shift from its current transition state,
     * to `'entering'` for the duration of the transition and then to the `'entered'` stage once
     * it's complete. Let's take the following example:
     *
     * ```jsx
     * state = { in: false };
     *
     * toggleEnterState = () => {
     *   this.setState({ in: true });
     * }
     *
     * render() {
     *   return (
     *     <div>
     *       <Transition in={this.state.in} timeout={500} />
     *       <button onClick={this.toggleEnterState}>Click to Enter</button>
     *     </div>
     *   );
     * }
     * ```
     *
     * When the button is clicked the component will shift to the `'entering'` state and
     * stay there for 500ms (the value of `timeout`) before it finally switches to `'entered'`.
     *
     * When `in` is `false` the same thing happens except the state moves from `'exiting'` to `'exited'`.
     *
     * ## Timing
     *
     * Timing is often the trickiest part of animation, mistakes can result in slight delays
     * that are hard to pin down. A common example is when you want to add an exit transition,
     * you should set the desired final styles when the state is `'exiting'`. That's when the
     * transition to those styles will start and, if you matched the `timeout` prop with the
     * CSS Transition duration, it will end exactly when the state changes to `'exited'`.
     *
     * > **Note**: For simpler transitions the `Transition` component might be enough, but
     * > take into account that it's platform-agnostic, while the `CSSTransition` component
     * > [forces reflows](https://github.com/reactjs/react-transition-group/blob/5007303e729a74be66a21c3e2205e4916821524b/src/CSSTransition.js#L208-L215)
     * > in order to make more complex transitions more predictable. For example, even though
     * > classes `example-enter` and `example-enter-active` are applied immediately one after
     * > another, you can still transition from one to the other because of the forced reflow
     * > (read [this issue](https://github.com/reactjs/react-transition-group/issues/159#issuecomment-322761171)
     * > for more info). Take this into account when choosing between `Transition` and
     * > `CSSTransition`.
     */

    exports.EXITING = EXITING;

    var Transition =
    /*#__PURE__*/
    function (_React$Component) {
      _inheritsLoose(Transition, _React$Component);

      function Transition(props, context) {
        var _this;

        _this = _React$Component.call(this, props, context) || this;
        var parentGroup = context.transitionGroup; // In the context of a TransitionGroup all enters are really appears

        var appear = parentGroup && !parentGroup.isMounting ? props.enter : props.appear;
        var initialStatus;
        _this.appearStatus = null;

        if (props.in) {
          if (appear) {
            initialStatus = EXITED;
            _this.appearStatus = ENTERING;
          } else {
            initialStatus = ENTERED;
          }
        } else {
          if (props.unmountOnExit || props.mountOnEnter) {
            initialStatus = UNMOUNTED;
          } else {
            initialStatus = EXITED;
          }
        }

        _this.state = {
          status: initialStatus
        };
        _this.nextCallback = null;
        return _this;
      }

      var _proto = Transition.prototype;

      _proto.getChildContext = function getChildContext() {
        return {
          transitionGroup: null // allows for nested Transitions

        };
      };

      Transition.getDerivedStateFromProps = function getDerivedStateFromProps(_ref, prevState) {
        var nextIn = _ref.in;

        if (nextIn && prevState.status === UNMOUNTED) {
          return {
            status: EXITED
          };
        }

        return null;
      }; // getSnapshotBeforeUpdate(prevProps) {
      //   let nextStatus = null
      //   if (prevProps !== this.props) {
      //     const { status } = this.state
      //     if (this.props.in) {
      //       if (status !== ENTERING && status !== ENTERED) {
      //         nextStatus = ENTERING
      //       }
      //     } else {
      //       if (status === ENTERING || status === ENTERED) {
      //         nextStatus = EXITING
      //       }
      //     }
      //   }
      //   return { nextStatus }
      // }


      _proto.componentDidMount = function componentDidMount() {
        this.updateStatus(true, this.appearStatus);
      };

      _proto.componentDidUpdate = function componentDidUpdate(prevProps) {
        var nextStatus = null;

        if (prevProps !== this.props) {
          var status = this.state.status;

          if (this.props.in) {
            if (status !== ENTERING && status !== ENTERED) {
              nextStatus = ENTERING;
            }
          } else {
            if (status === ENTERING || status === ENTERED) {
              nextStatus = EXITING;
            }
          }
        }

        this.updateStatus(false, nextStatus);
      };

      _proto.componentWillUnmount = function componentWillUnmount() {
        this.cancelNextCallback();
      };

      _proto.getTimeouts = function getTimeouts() {
        var timeout = this.props.timeout;
        var exit, enter, appear;
        exit = enter = appear = timeout;

        if (timeout != null && typeof timeout !== 'number') {
          exit = timeout.exit;
          enter = timeout.enter;
          appear = timeout.appear;
        }

        return {
          exit: exit,
          enter: enter,
          appear: appear
        };
      };

      _proto.updateStatus = function updateStatus(mounting, nextStatus) {
        if (mounting === void 0) {
          mounting = false;
        }

        if (nextStatus !== null) {
          // nextStatus will always be ENTERING or EXITING.
          this.cancelNextCallback();

          var node = _reactDom.default.findDOMNode(this);

          if (nextStatus === ENTERING) {
            this.performEnter(node, mounting);
          } else {
            this.performExit(node);
          }
        } else if (this.props.unmountOnExit && this.state.status === EXITED) {
          this.setState({
            status: UNMOUNTED
          });
        }
      };

      _proto.performEnter = function performEnter(node, mounting) {
        var _this2 = this;

        var enter = this.props.enter;
        var appearing = this.context.transitionGroup ? this.context.transitionGroup.isMounting : mounting;
        var timeouts = this.getTimeouts(); // no enter animation skip right to ENTERED
        // if we are mounting and running this it means appear _must_ be set

        if (!mounting && !enter) {
          this.safeSetState({
            status: ENTERED
          }, function () {
            _this2.props.onEntered(node);
          });
          return;
        }

        this.props.onEnter(node, appearing);
        this.safeSetState({
          status: ENTERING
        }, function () {
          _this2.props.onEntering(node, appearing); // FIXME: appear timeout?


          _this2.onTransitionEnd(node, timeouts.enter, function () {
            _this2.safeSetState({
              status: ENTERED
            }, function () {
              _this2.props.onEntered(node, appearing);
            });
          });
        });
      };

      _proto.performExit = function performExit(node) {
        var _this3 = this;

        var exit = this.props.exit;
        var timeouts = this.getTimeouts(); // no exit animation skip right to EXITED

        if (!exit) {
          this.safeSetState({
            status: EXITED
          }, function () {
            _this3.props.onExited(node);
          });
          return;
        }

        this.props.onExit(node);
        this.safeSetState({
          status: EXITING
        }, function () {
          _this3.props.onExiting(node);

          _this3.onTransitionEnd(node, timeouts.exit, function () {
            _this3.safeSetState({
              status: EXITED
            }, function () {
              _this3.props.onExited(node);
            });
          });
        });
      };

      _proto.cancelNextCallback = function cancelNextCallback() {
        if (this.nextCallback !== null) {
          this.nextCallback.cancel();
          this.nextCallback = null;
        }
      };

      _proto.safeSetState = function safeSetState(nextState, callback) {
        // This shouldn't be necessary, but there are weird race conditions with
        // setState callbacks and unmounting in testing, so always make sure that
        // we can cancel any pending setState callbacks after we unmount.
        callback = this.setNextCallback(callback);
        this.setState(nextState, callback);
      };

      _proto.setNextCallback = function setNextCallback(callback) {
        var _this4 = this;

        var active = true;

        this.nextCallback = function (event) {
          if (active) {
            active = false;
            _this4.nextCallback = null;
            callback(event);
          }
        };

        this.nextCallback.cancel = function () {
          active = false;
        };

        return this.nextCallback;
      };

      _proto.onTransitionEnd = function onTransitionEnd(node, timeout, handler) {
        this.setNextCallback(handler);

        if (node) {
          if (this.props.addEndListener) {
            this.props.addEndListener(node, this.nextCallback);
          }

          if (timeout != null) {
            setTimeout(this.nextCallback, timeout);
          }
        } else {
          setTimeout(this.nextCallback, 0);
        }
      };

      _proto.render = function render() {
        var status = this.state.status;

        if (status === UNMOUNTED) {
          return null;
        }

        var _this$props = this.props,
            children = _this$props.children,
            childProps = _objectWithoutPropertiesLoose(_this$props, ["children"]); // filter props for Transtition


        delete childProps.in;
        delete childProps.mountOnEnter;
        delete childProps.unmountOnExit;
        delete childProps.appear;
        delete childProps.enter;
        delete childProps.exit;
        delete childProps.timeout;
        delete childProps.addEndListener;
        delete childProps.onEnter;
        delete childProps.onEntering;
        delete childProps.onEntered;
        delete childProps.onExit;
        delete childProps.onExiting;
        delete childProps.onExited;

        if (typeof children === 'function') {
          return children(status, childProps);
        }

        var child = _react.default.Children.only(children);

        return _react.default.cloneElement(child, childProps);
      };

      return Transition;
    }(_react.default.Component);

    Transition.contextTypes = {
      transitionGroup: PropTypes$$1.object
    };
    Transition.childContextTypes = {
      transitionGroup: function transitionGroup() {}
    };
    Transition.propTypes = {};

    function noop() {}

    Transition.defaultProps = {
      in: false,
      mountOnEnter: false,
      unmountOnExit: false,
      appear: false,
      enter: true,
      exit: true,
      onEnter: noop,
      onEntering: noop,
      onEntered: noop,
      onExit: noop,
      onExiting: noop,
      onExited: noop
    };
    Transition.UNMOUNTED = 0;
    Transition.EXITED = 1;
    Transition.ENTERING = 2;
    Transition.ENTERED = 3;
    Transition.EXITING = 4;

    var _default = (0, reactLifecyclesCompat_es.polyfill)(Transition);

    exports.default = _default;
  });
  unwrapExports(Transition_1);
  var Transition_2 = Transition_1.EXITING;
  var Transition_3 = Transition_1.ENTERED;
  var Transition_4 = Transition_1.ENTERING;
  var Transition_5 = Transition_1.EXITED;
  var Transition_6 = Transition_1.UNMOUNTED;

  var CSSTransition_1 = createCommonjsModule(function (module, exports) {

    exports.__esModule = true;
    exports.default = void 0;

    var PropTypes$$1 = _interopRequireWildcard(propTypes);

    var _addClass = _interopRequireDefault(addClass_1);

    var _removeClass = _interopRequireDefault(removeClass);

    var _react = _interopRequireDefault(React__default);

    var _Transition = _interopRequireDefault(Transition_1);

    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {
        default: obj
      };
    }

    function _interopRequireWildcard(obj) {
      if (obj && obj.__esModule) {
        return obj;
      } else {
        var newObj = {};

        if (obj != null) {
          for (var key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
              var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {};

              if (desc.get || desc.set) {
                Object.defineProperty(newObj, key, desc);
              } else {
                newObj[key] = obj[key];
              }
            }
          }
        }

        newObj.default = obj;
        return newObj;
      }
    }

    function _inheritsLoose(subClass, superClass) {
      subClass.prototype = Object.create(superClass.prototype);
      subClass.prototype.constructor = subClass;
      subClass.__proto__ = superClass;
    }

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

    var addClass = function addClass(node, classes) {
      return node && classes && classes.split(' ').forEach(function (c) {
        return (0, _addClass.default)(node, c);
      });
    };

    var removeClass$$1 = function removeClass$$1(node, classes) {
      return node && classes && classes.split(' ').forEach(function (c) {
        return (0, _removeClass.default)(node, c);
      });
    };
    /**
     * A `Transition` component using CSS transitions and animations.
     * It's inspired by the excellent [ng-animate](http://www.nganimate.org/) library.
     *
     * `CSSTransition` applies a pair of class names during the `appear`, `enter`,
     * and `exit` stages of the transition. The first class is applied and then a
     * second "active" class in order to activate the css animation. After the animation,
     * matching `done` class names are applied to persist the animation state.
     *
     * When the `in` prop is toggled to `true` the Component will get
     * the `example-enter` CSS class and the `example-enter-active` CSS class
     * added in the next tick. This is a convention based on the `classNames` prop.
     */

    var CSSTransition =
    /*#__PURE__*/
    function (_React$Component) {
      _inheritsLoose(CSSTransition, _React$Component);

      function CSSTransition() {
        var _this;

        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;

        _this.onEnter = function (node, appearing) {
          var _this$getClassNames = _this.getClassNames(appearing ? 'appear' : 'enter'),
              className = _this$getClassNames.className;

          _this.removeClasses(node, 'exit');

          addClass(node, className);

          if (_this.props.onEnter) {
            _this.props.onEnter(node, appearing);
          }
        };

        _this.onEntering = function (node, appearing) {
          var _this$getClassNames2 = _this.getClassNames(appearing ? 'appear' : 'enter'),
              activeClassName = _this$getClassNames2.activeClassName;

          _this.reflowAndAddClass(node, activeClassName);

          if (_this.props.onEntering) {
            _this.props.onEntering(node, appearing);
          }
        };

        _this.onEntered = function (node, appearing) {
          var _this$getClassNames3 = _this.getClassNames('enter'),
              doneClassName = _this$getClassNames3.doneClassName;

          _this.removeClasses(node, appearing ? 'appear' : 'enter');

          addClass(node, doneClassName);

          if (_this.props.onEntered) {
            _this.props.onEntered(node, appearing);
          }
        };

        _this.onExit = function (node) {
          var _this$getClassNames4 = _this.getClassNames('exit'),
              className = _this$getClassNames4.className;

          _this.removeClasses(node, 'appear');

          _this.removeClasses(node, 'enter');

          addClass(node, className);

          if (_this.props.onExit) {
            _this.props.onExit(node);
          }
        };

        _this.onExiting = function (node) {
          var _this$getClassNames5 = _this.getClassNames('exit'),
              activeClassName = _this$getClassNames5.activeClassName;

          _this.reflowAndAddClass(node, activeClassName);

          if (_this.props.onExiting) {
            _this.props.onExiting(node);
          }
        };

        _this.onExited = function (node) {
          var _this$getClassNames6 = _this.getClassNames('exit'),
              doneClassName = _this$getClassNames6.doneClassName;

          _this.removeClasses(node, 'exit');

          addClass(node, doneClassName);

          if (_this.props.onExited) {
            _this.props.onExited(node);
          }
        };

        _this.getClassNames = function (type) {
          var classNames = _this.props.classNames;
          var className = typeof classNames !== 'string' ? classNames[type] : classNames + '-' + type;
          var activeClassName = typeof classNames !== 'string' ? classNames[type + 'Active'] : className + '-active';
          var doneClassName = typeof classNames !== 'string' ? classNames[type + 'Done'] : className + '-done';
          return {
            className: className,
            activeClassName: activeClassName,
            doneClassName: doneClassName
          };
        };

        return _this;
      }

      var _proto = CSSTransition.prototype;

      _proto.removeClasses = function removeClasses(node, type) {
        var _this$getClassNames7 = this.getClassNames(type),
            className = _this$getClassNames7.className,
            activeClassName = _this$getClassNames7.activeClassName,
            doneClassName = _this$getClassNames7.doneClassName;

        className && removeClass$$1(node, className);
        activeClassName && removeClass$$1(node, activeClassName);
        doneClassName && removeClass$$1(node, doneClassName);
      };

      _proto.reflowAndAddClass = function reflowAndAddClass(node, className) {
        // This is for to force a repaint,
        // which is necessary in order to transition styles when adding a class name.
        if (className) {
          /* eslint-disable no-unused-expressions */
          node && node.scrollTop;
          /* eslint-enable no-unused-expressions */

          addClass(node, className);
        }
      };

      _proto.render = function render() {
        var props = _extends({}, this.props);

        delete props.classNames;
        return _react.default.createElement(_Transition.default, _extends({}, props, {
          onEnter: this.onEnter,
          onEntered: this.onEntered,
          onEntering: this.onEntering,
          onExit: this.onExit,
          onExiting: this.onExiting,
          onExited: this.onExited
        }));
      };

      return CSSTransition;
    }(_react.default.Component);

    CSSTransition.propTypes = {};
    var _default = CSSTransition;
    exports.default = _default;
    module.exports = exports["default"];
  });
  unwrapExports(CSSTransition_1);

  var ChildMapping = createCommonjsModule(function (module, exports) {

    exports.__esModule = true;
    exports.getChildMapping = getChildMapping;
    exports.mergeChildMappings = mergeChildMappings;
    exports.getInitialChildMapping = getInitialChildMapping;
    exports.getNextChildMapping = getNextChildMapping;
    /**
     * Given `this.props.children`, return an object mapping key to child.
     *
     * @param {*} children `this.props.children`
     * @return {object} Mapping of key to child
     */

    function getChildMapping(children, mapFn) {
      var mapper = function mapper(child) {
        return mapFn && (0, React__default.isValidElement)(child) ? mapFn(child) : child;
      };

      var result = Object.create(null);
      if (children) React__default.Children.map(children, function (c) {
        return c;
      }).forEach(function (child) {
        // run the map function here instead so that the key is the computed one
        result[child.key] = mapper(child);
      });
      return result;
    }
    /**
     * When you're adding or removing children some may be added or removed in the
     * same render pass. We want to show *both* since we want to simultaneously
     * animate elements in and out. This function takes a previous set of keys
     * and a new set of keys and merges them with its best guess of the correct
     * ordering. In the future we may expose some of the utilities in
     * ReactMultiChild to make this easy, but for now React itself does not
     * directly have this concept of the union of prevChildren and nextChildren
     * so we implement it here.
     *
     * @param {object} prev prev children as returned from
     * `ReactTransitionChildMapping.getChildMapping()`.
     * @param {object} next next children as returned from
     * `ReactTransitionChildMapping.getChildMapping()`.
     * @return {object} a key set that contains all keys in `prev` and all keys
     * in `next` in a reasonable order.
     */


    function mergeChildMappings(prev, next) {
      prev = prev || {};
      next = next || {};

      function getValueForKey(key) {
        return key in next ? next[key] : prev[key];
      } // For each key of `next`, the list of keys to insert before that key in
      // the combined list


      var nextKeysPending = Object.create(null);
      var pendingKeys = [];

      for (var prevKey in prev) {
        if (prevKey in next) {
          if (pendingKeys.length) {
            nextKeysPending[prevKey] = pendingKeys;
            pendingKeys = [];
          }
        } else {
          pendingKeys.push(prevKey);
        }
      }

      var i;
      var childMapping = {};

      for (var nextKey in next) {
        if (nextKeysPending[nextKey]) {
          for (i = 0; i < nextKeysPending[nextKey].length; i++) {
            var pendingNextKey = nextKeysPending[nextKey][i];
            childMapping[nextKeysPending[nextKey][i]] = getValueForKey(pendingNextKey);
          }
        }

        childMapping[nextKey] = getValueForKey(nextKey);
      } // Finally, add the keys which didn't appear before any key in `next`


      for (i = 0; i < pendingKeys.length; i++) {
        childMapping[pendingKeys[i]] = getValueForKey(pendingKeys[i]);
      }

      return childMapping;
    }

    function getProp(child, prop, props) {
      return props[prop] != null ? props[prop] : child.props[prop];
    }

    function getInitialChildMapping(props, onExited) {
      return getChildMapping(props.children, function (child) {
        return (0, React__default.cloneElement)(child, {
          onExited: onExited.bind(null, child),
          in: true,
          appear: getProp(child, 'appear', props),
          enter: getProp(child, 'enter', props),
          exit: getProp(child, 'exit', props)
        });
      });
    }

    function getNextChildMapping(nextProps, prevChildMapping, onExited) {
      var nextChildMapping = getChildMapping(nextProps.children);
      var children = mergeChildMappings(prevChildMapping, nextChildMapping);
      Object.keys(children).forEach(function (key) {
        var child = children[key];
        if (!(0, React__default.isValidElement)(child)) return;
        var hasPrev = key in prevChildMapping;
        var hasNext = key in nextChildMapping;
        var prevChild = prevChildMapping[key];
        var isLeaving = (0, React__default.isValidElement)(prevChild) && !prevChild.props.in; // item is new (entering)

        if (hasNext && (!hasPrev || isLeaving)) {
          // console.log('entering', key)
          children[key] = (0, React__default.cloneElement)(child, {
            onExited: onExited.bind(null, child),
            in: true,
            exit: getProp(child, 'exit', nextProps),
            enter: getProp(child, 'enter', nextProps)
          });
        } else if (!hasNext && hasPrev && !isLeaving) {
          // item is old (exiting)
          // console.log('leaving', key)
          children[key] = (0, React__default.cloneElement)(child, {
            in: false
          });
        } else if (hasNext && hasPrev && (0, React__default.isValidElement)(prevChild)) {
          // item hasn't changed transition states
          // copy over the last transition props;
          // console.log('unchanged', key)
          children[key] = (0, React__default.cloneElement)(child, {
            onExited: onExited.bind(null, child),
            in: prevChild.props.in,
            exit: getProp(child, 'exit', nextProps),
            enter: getProp(child, 'enter', nextProps)
          });
        }
      });
      return children;
    }
  });
  unwrapExports(ChildMapping);
  var ChildMapping_1 = ChildMapping.getChildMapping;
  var ChildMapping_2 = ChildMapping.mergeChildMappings;
  var ChildMapping_3 = ChildMapping.getInitialChildMapping;
  var ChildMapping_4 = ChildMapping.getNextChildMapping;

  var TransitionGroup_1 = createCommonjsModule(function (module, exports) {

    exports.__esModule = true;
    exports.default = void 0;

    var _propTypes = _interopRequireDefault(propTypes);

    var _react = _interopRequireDefault(React__default);

    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {
        default: obj
      };
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

    function _assertThisInitialized(self) {
      if (self === void 0) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      }

      return self;
    }

    var values = Object.values || function (obj) {
      return Object.keys(obj).map(function (k) {
        return obj[k];
      });
    };
    var defaultProps = {
      component: 'div',
      childFactory: function childFactory(child) {
        return child;
      }
      /**
       * The `<TransitionGroup>` component manages a set of transition components
       * (`<Transition>` and `<CSSTransition>`) in a list. Like with the transition
       * components, `<TransitionGroup>` is a state machine for managing the mounting
       * and unmounting of components over time.
       *
       * Consider the example below. As items are removed or added to the TodoList the
       * `in` prop is toggled automatically by the `<TransitionGroup>`.
       *
       * Note that `<TransitionGroup>`  does not define any animation behavior!
       * Exactly _how_ a list item animates is up to the individual transition
       * component. This means you can mix and match animations across different list
       * items.
       */

    };

    var TransitionGroup =
    /*#__PURE__*/
    function (_React$Component) {
      _inheritsLoose(TransitionGroup, _React$Component);

      function TransitionGroup(props, context) {
        var _this;

        _this = _React$Component.call(this, props, context) || this;

        var handleExited = _this.handleExited.bind(_assertThisInitialized(_assertThisInitialized(_this))); // Initial children should all be entering, dependent on appear


        _this.state = {
          handleExited: handleExited,
          firstRender: true
        };
        return _this;
      }

      var _proto = TransitionGroup.prototype;

      _proto.getChildContext = function getChildContext() {
        return {
          transitionGroup: {
            isMounting: !this.appeared
          }
        };
      };

      _proto.componentDidMount = function componentDidMount() {
        this.appeared = true;
        this.mounted = true;
      };

      _proto.componentWillUnmount = function componentWillUnmount() {
        this.mounted = false;
      };

      TransitionGroup.getDerivedStateFromProps = function getDerivedStateFromProps(nextProps, _ref) {
        var prevChildMapping = _ref.children,
            handleExited = _ref.handleExited,
            firstRender = _ref.firstRender;
        return {
          children: firstRender ? (0, ChildMapping.getInitialChildMapping)(nextProps, handleExited) : (0, ChildMapping.getNextChildMapping)(nextProps, prevChildMapping, handleExited),
          firstRender: false
        };
      };

      _proto.handleExited = function handleExited(child, node) {
        var currentChildMapping = (0, ChildMapping.getChildMapping)(this.props.children);
        if (child.key in currentChildMapping) return;

        if (child.props.onExited) {
          child.props.onExited(node);
        }

        if (this.mounted) {
          this.setState(function (state) {
            var children = _extends({}, state.children);

            delete children[child.key];
            return {
              children: children
            };
          });
        }
      };

      _proto.render = function render() {
        var _this$props = this.props,
            Component = _this$props.component,
            childFactory = _this$props.childFactory,
            props = _objectWithoutPropertiesLoose(_this$props, ["component", "childFactory"]);

        var children = values(this.state.children).map(childFactory);
        delete props.appear;
        delete props.enter;
        delete props.exit;

        if (Component === null) {
          return children;
        }

        return _react.default.createElement(Component, props, children);
      };

      return TransitionGroup;
    }(_react.default.Component);

    TransitionGroup.childContextTypes = {
      transitionGroup: _propTypes.default.object.isRequired
    };
    TransitionGroup.propTypes = {};
    TransitionGroup.defaultProps = defaultProps;

    var _default = (0, reactLifecyclesCompat_es.polyfill)(TransitionGroup);

    exports.default = _default;
    module.exports = exports["default"];
  });
  unwrapExports(TransitionGroup_1);

  var ReplaceTransition_1 = createCommonjsModule(function (module, exports) {

    exports.__esModule = true;
    exports.default = void 0;

    var _propTypes = _interopRequireDefault(propTypes);

    var _react = _interopRequireDefault(React__default);

    var _TransitionGroup = _interopRequireDefault(TransitionGroup_1);

    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {
        default: obj
      };
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

    function _inheritsLoose(subClass, superClass) {
      subClass.prototype = Object.create(superClass.prototype);
      subClass.prototype.constructor = subClass;
      subClass.__proto__ = superClass;
    }
    /**
     * The `<ReplaceTransition>` component is a specialized `Transition` component
     * that animates between two children.
     *
     * ```jsx
     * <ReplaceTransition in>
     *   <Fade><div>I appear first</div></Fade>
     *   <Fade><div>I replace the above</div></Fade>
     * </ReplaceTransition>
     * ```
     */

    var ReplaceTransition =
    /*#__PURE__*/
    function (_React$Component) {
      _inheritsLoose(ReplaceTransition, _React$Component);

      function ReplaceTransition() {
        var _this;

        for (var _len = arguments.length, _args = new Array(_len), _key = 0; _key < _len; _key++) {
          _args[_key] = arguments[_key];
        }

        _this = _React$Component.call.apply(_React$Component, [this].concat(_args)) || this;

        _this.handleEnter = function () {
          for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            args[_key2] = arguments[_key2];
          }

          return _this.handleLifecycle('onEnter', 0, args);
        };

        _this.handleEntering = function () {
          for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
            args[_key3] = arguments[_key3];
          }

          return _this.handleLifecycle('onEntering', 0, args);
        };

        _this.handleEntered = function () {
          for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
            args[_key4] = arguments[_key4];
          }

          return _this.handleLifecycle('onEntered', 0, args);
        };

        _this.handleExit = function () {
          for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
            args[_key5] = arguments[_key5];
          }

          return _this.handleLifecycle('onExit', 1, args);
        };

        _this.handleExiting = function () {
          for (var _len6 = arguments.length, args = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
            args[_key6] = arguments[_key6];
          }

          return _this.handleLifecycle('onExiting', 1, args);
        };

        _this.handleExited = function () {
          for (var _len7 = arguments.length, args = new Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
            args[_key7] = arguments[_key7];
          }

          return _this.handleLifecycle('onExited', 1, args);
        };

        return _this;
      }

      var _proto = ReplaceTransition.prototype;

      _proto.handleLifecycle = function handleLifecycle(handler, idx, originalArgs) {
        var _child$props;

        var children = this.props.children;

        var child = _react.default.Children.toArray(children)[idx];

        if (child.props[handler]) (_child$props = child.props)[handler].apply(_child$props, originalArgs);
        if (this.props[handler]) this.props[handler]((0, ReactDOM.findDOMNode)(this));
      };

      _proto.render = function render() {
        var _this$props = this.props,
            children = _this$props.children,
            inProp = _this$props.in,
            props = _objectWithoutPropertiesLoose(_this$props, ["children", "in"]);

        var _React$Children$toArr = _react.default.Children.toArray(children),
            first = _React$Children$toArr[0],
            second = _React$Children$toArr[1];

        delete props.onEnter;
        delete props.onEntering;
        delete props.onEntered;
        delete props.onExit;
        delete props.onExiting;
        delete props.onExited;
        return _react.default.createElement(_TransitionGroup.default, props, inProp ? _react.default.cloneElement(first, {
          key: 'first',
          onEnter: this.handleEnter,
          onEntering: this.handleEntering,
          onEntered: this.handleEntered
        }) : _react.default.cloneElement(second, {
          key: 'second',
          onEnter: this.handleExit,
          onEntering: this.handleExiting,
          onEntered: this.handleExited
        }));
      };

      return ReplaceTransition;
    }(_react.default.Component);

    ReplaceTransition.propTypes = {};
    var _default = ReplaceTransition;
    exports.default = _default;
    module.exports = exports["default"];
  });
  unwrapExports(ReplaceTransition_1);

  var reactTransitionGroup = createCommonjsModule(function (module) {

    var _CSSTransition = _interopRequireDefault(CSSTransition_1);

    var _ReplaceTransition = _interopRequireDefault(ReplaceTransition_1);

    var _TransitionGroup = _interopRequireDefault(TransitionGroup_1);

    var _Transition = _interopRequireDefault(Transition_1);

    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {
        default: obj
      };
    }

    module.exports = {
      Transition: _Transition.default,
      TransitionGroup: _TransitionGroup.default,
      ReplaceTransition: _ReplaceTransition.default,
      CSSTransition: _CSSTransition.default
    };
  });
  unwrapExports(reactTransitionGroup);
  var reactTransitionGroup_1 = reactTransitionGroup.Transition;
  var reactTransitionGroup_2 = reactTransitionGroup.TransitionGroup;
  var reactTransitionGroup_3 = reactTransitionGroup.ReplaceTransition;
  var reactTransitionGroup_4 = reactTransitionGroup.CSSTransition;

  var propTypes$k = _extends({}, reactTransitionGroup_1.propTypes, {
    children: propTypes.oneOfType([propTypes.arrayOf(propTypes.node), propTypes.node]),
    tag: propTypes.oneOfType([propTypes.string, propTypes.func]),
    baseClass: propTypes.string,
    baseClassActive: propTypes.string,
    className: propTypes.string,
    cssModule: propTypes.object,
    innerRef: propTypes.oneOfType([propTypes.object, propTypes.string, propTypes.func])
  });

  var defaultProps$i = _extends({}, reactTransitionGroup_1.defaultProps, {
    tag: 'div',
    baseClass: 'fade',
    baseClassActive: 'show',
    timeout: TransitionTimeouts.Fade,
    appear: true,
    enter: true,
    exit: true,
    in: true
  });

  function Fade(props) {
    var Tag = props.tag,
        baseClass = props.baseClass,
        baseClassActive = props.baseClassActive,
        className = props.className,
        cssModule = props.cssModule,
        children = props.children,
        innerRef = props.innerRef,
        otherProps = _objectWithoutPropertiesLoose(props, ["tag", "baseClass", "baseClassActive", "className", "cssModule", "children", "innerRef"]);

    var transitionProps = pick(otherProps, TransitionPropTypeKeys);
    var childProps = omit(otherProps, TransitionPropTypeKeys);
    return React__default.createElement(reactTransitionGroup_1, transitionProps, function (status) {
      var isActive = status === 'entered';
      var classes = mapToCssModules(classnames(className, baseClass, isActive && baseClassActive), cssModule);
      return React__default.createElement(Tag, _extends({
        className: classes
      }, childProps, {
        ref: innerRef
      }), children);
    });
  }

  Fade.propTypes = propTypes$k;
  Fade.defaultProps = defaultProps$i;

  var propTypes$l = {
    color: propTypes.string,
    pill: propTypes.bool,
    tag: propTypes.oneOfType([propTypes.func, propTypes.string]),
    innerRef: propTypes.oneOfType([propTypes.object, propTypes.func, propTypes.string]),
    children: propTypes.node,
    className: propTypes.string,
    cssModule: propTypes.object
  };
  var defaultProps$j = {
    color: 'secondary',
    pill: false,
    tag: 'span'
  };

  var Badge = function Badge(props) {
    var className = props.className,
        cssModule = props.cssModule,
        color = props.color,
        innerRef = props.innerRef,
        pill = props.pill,
        Tag = props.tag,
        attributes = _objectWithoutPropertiesLoose(props, ["className", "cssModule", "color", "innerRef", "pill", "tag"]);

    var classes = mapToCssModules(classnames(className, 'badge', 'badge-' + color, pill ? 'badge-pill' : false), cssModule);

    if (attributes.href && Tag === 'span') {
      Tag = 'a';
    }

    return React__default.createElement(Tag, _extends({}, attributes, {
      className: classes,
      ref: innerRef
    }));
  };

  Badge.propTypes = propTypes$l;
  Badge.defaultProps = defaultProps$j;

  var propTypes$m = {
    tag: propTypes.oneOfType([propTypes.func, propTypes.string]),
    inverse: propTypes.bool,
    color: propTypes.string,
    block: deprecated(propTypes.bool, 'Please use the props "body"'),
    body: propTypes.bool,
    outline: propTypes.bool,
    className: propTypes.string,
    cssModule: propTypes.object,
    innerRef: propTypes.oneOfType([propTypes.object, propTypes.string, propTypes.func])
  };
  var defaultProps$k = {
    tag: 'div'
  };

  var Card = function Card(props) {
    var className = props.className,
        cssModule = props.cssModule,
        color = props.color,
        block = props.block,
        body = props.body,
        inverse = props.inverse,
        outline = props.outline,
        Tag = props.tag,
        innerRef = props.innerRef,
        attributes = _objectWithoutPropertiesLoose(props, ["className", "cssModule", "color", "block", "body", "inverse", "outline", "tag", "innerRef"]);

    var classes = mapToCssModules(classnames(className, 'card', inverse ? 'text-white' : false, block || body ? 'card-body' : false, color ? (outline ? 'border' : 'bg') + "-" + color : false), cssModule);
    return React__default.createElement(Tag, _extends({}, attributes, {
      className: classes,
      ref: innerRef
    }));
  };

  Card.propTypes = propTypes$m;
  Card.defaultProps = defaultProps$k;

  var propTypes$n = {
    tag: propTypes.oneOfType([propTypes.func, propTypes.string]),
    className: propTypes.string,
    cssModule: propTypes.object
  };
  var defaultProps$l = {
    tag: 'div'
  };

  var CardGroup = function CardGroup(props) {
    var className = props.className,
        cssModule = props.cssModule,
        Tag = props.tag,
        attributes = _objectWithoutPropertiesLoose(props, ["className", "cssModule", "tag"]);

    var classes = mapToCssModules(classnames(className, 'card-group'), cssModule);
    return React__default.createElement(Tag, _extends({}, attributes, {
      className: classes
    }));
  };

  CardGroup.propTypes = propTypes$n;
  CardGroup.defaultProps = defaultProps$l;

  var propTypes$o = {
    tag: propTypes.oneOfType([propTypes.func, propTypes.string]),
    className: propTypes.string,
    cssModule: propTypes.object
  };
  var defaultProps$m = {
    tag: 'div'
  };

  var CardDeck = function CardDeck(props) {
    var className = props.className,
        cssModule = props.cssModule,
        Tag = props.tag,
        attributes = _objectWithoutPropertiesLoose(props, ["className", "cssModule", "tag"]);

    var classes = mapToCssModules(classnames(className, 'card-deck'), cssModule);
    return React__default.createElement(Tag, _extends({}, attributes, {
      className: classes
    }));
  };

  CardDeck.propTypes = propTypes$o;
  CardDeck.defaultProps = defaultProps$m;

  var propTypes$p = {
    tag: propTypes.oneOfType([propTypes.func, propTypes.string]),
    className: propTypes.string,
    cssModule: propTypes.object
  };
  var defaultProps$n = {
    tag: 'div'
  };

  var CardColumns = function CardColumns(props) {
    var className = props.className,
        cssModule = props.cssModule,
        Tag = props.tag,
        attributes = _objectWithoutPropertiesLoose(props, ["className", "cssModule", "tag"]);

    var classes = mapToCssModules(classnames(className, 'card-columns'), cssModule);
    return React__default.createElement(Tag, _extends({}, attributes, {
      className: classes
    }));
  };

  CardColumns.propTypes = propTypes$p;
  CardColumns.defaultProps = defaultProps$n;

  var propTypes$q = {
    tag: propTypes.oneOfType([propTypes.func, propTypes.string]),
    className: propTypes.string,
    cssModule: propTypes.object,
    innerRef: propTypes.oneOfType([propTypes.object, propTypes.string, propTypes.func])
  };
  var defaultProps$o = {
    tag: 'div'
  };

  var CardBody = function CardBody(props) {
    var className = props.className,
        cssModule = props.cssModule,
        innerRef = props.innerRef,
        Tag = props.tag,
        attributes = _objectWithoutPropertiesLoose(props, ["className", "cssModule", "innerRef", "tag"]);

    var classes = mapToCssModules(classnames(className, 'card-body'), cssModule);
    return React__default.createElement(Tag, _extends({}, attributes, {
      className: classes,
      ref: innerRef
    }));
  };

  CardBody.propTypes = propTypes$q;
  CardBody.defaultProps = defaultProps$o;

  function CardBlock(props) {
    warnOnce('The "CardBlock" component has been deprecated.\nPlease use component "CardBody".');
    return React__default.createElement(CardBody, props);
  }

  var propTypes$r = {
    tag: propTypes.oneOfType([propTypes.func, propTypes.string]),
    innerRef: propTypes.oneOfType([propTypes.object, propTypes.func, propTypes.string]),
    className: propTypes.string,
    cssModule: propTypes.object
  };
  var defaultProps$p = {
    tag: 'a'
  };

  var CardLink = function CardLink(props) {
    var className = props.className,
        cssModule = props.cssModule,
        Tag = props.tag,
        innerRef = props.innerRef,
        attributes = _objectWithoutPropertiesLoose(props, ["className", "cssModule", "tag", "innerRef"]);

    var classes = mapToCssModules(classnames(className, 'card-link'), cssModule);
    return React__default.createElement(Tag, _extends({}, attributes, {
      ref: innerRef,
      className: classes
    }));
  };

  CardLink.propTypes = propTypes$r;
  CardLink.defaultProps = defaultProps$p;

  var propTypes$s = {
    tag: propTypes.oneOfType([propTypes.func, propTypes.string]),
    className: propTypes.string,
    cssModule: propTypes.object
  };
  var defaultProps$q = {
    tag: 'div'
  };

  var CardFooter = function CardFooter(props) {
    var className = props.className,
        cssModule = props.cssModule,
        Tag = props.tag,
        attributes = _objectWithoutPropertiesLoose(props, ["className", "cssModule", "tag"]);

    var classes = mapToCssModules(classnames(className, 'card-footer'), cssModule);
    return React__default.createElement(Tag, _extends({}, attributes, {
      className: classes
    }));
  };

  CardFooter.propTypes = propTypes$s;
  CardFooter.defaultProps = defaultProps$q;

  var propTypes$t = {
    tag: propTypes.oneOfType([propTypes.func, propTypes.string]),
    className: propTypes.string,
    cssModule: propTypes.object
  };
  var defaultProps$r = {
    tag: 'div'
  };

  var CardHeader = function CardHeader(props) {
    var className = props.className,
        cssModule = props.cssModule,
        Tag = props.tag,
        attributes = _objectWithoutPropertiesLoose(props, ["className", "cssModule", "tag"]);

    var classes = mapToCssModules(classnames(className, 'card-header'), cssModule);
    return React__default.createElement(Tag, _extends({}, attributes, {
      className: classes
    }));
  };

  CardHeader.propTypes = propTypes$t;
  CardHeader.defaultProps = defaultProps$r;

  var propTypes$u = {
    tag: propTypes.oneOfType([propTypes.func, propTypes.string]),
    top: propTypes.bool,
    bottom: propTypes.bool,
    className: propTypes.string,
    cssModule: propTypes.object
  };
  var defaultProps$s = {
    tag: 'img'
  };

  var CardImg = function CardImg(props) {
    var className = props.className,
        cssModule = props.cssModule,
        top = props.top,
        bottom = props.bottom,
        Tag = props.tag,
        attributes = _objectWithoutPropertiesLoose(props, ["className", "cssModule", "top", "bottom", "tag"]);

    var cardImgClassName = 'card-img';

    if (top) {
      cardImgClassName = 'card-img-top';
    }

    if (bottom) {
      cardImgClassName = 'card-img-bottom';
    }

    var classes = mapToCssModules(classnames(className, cardImgClassName), cssModule);
    return React__default.createElement(Tag, _extends({}, attributes, {
      className: classes
    }));
  };

  CardImg.propTypes = propTypes$u;
  CardImg.defaultProps = defaultProps$s;

  var propTypes$v = {
    tag: propTypes.oneOfType([propTypes.func, propTypes.string]),
    className: propTypes.string,
    cssModule: propTypes.object
  };
  var defaultProps$t = {
    tag: 'div'
  };

  var CardImgOverlay = function CardImgOverlay(props) {
    var className = props.className,
        cssModule = props.cssModule,
        Tag = props.tag,
        attributes = _objectWithoutPropertiesLoose(props, ["className", "cssModule", "tag"]);

    var classes = mapToCssModules(classnames(className, 'card-img-overlay'), cssModule);
    return React__default.createElement(Tag, _extends({}, attributes, {
      className: classes
    }));
  };

  CardImgOverlay.propTypes = propTypes$v;
  CardImgOverlay.defaultProps = defaultProps$t;

  var CarouselItem =
  /*#__PURE__*/
  function (_React$Component) {
    _inheritsLoose(CarouselItem, _React$Component);

    function CarouselItem(props) {
      var _this;

      _this = _React$Component.call(this, props) || this;
      _this.state = {
        startAnimation: false
      };
      _this.onEnter = _this.onEnter.bind(_assertThisInitialized(_assertThisInitialized(_this)));
      _this.onEntering = _this.onEntering.bind(_assertThisInitialized(_assertThisInitialized(_this)));
      _this.onExit = _this.onExit.bind(_assertThisInitialized(_assertThisInitialized(_this)));
      _this.onExiting = _this.onExiting.bind(_assertThisInitialized(_assertThisInitialized(_this)));
      _this.onExited = _this.onExited.bind(_assertThisInitialized(_assertThisInitialized(_this)));
      return _this;
    }

    var _proto = CarouselItem.prototype;

    _proto.onEnter = function onEnter(node, isAppearing) {
      this.setState({
        startAnimation: false
      });
      this.props.onEnter(node, isAppearing);
    };

    _proto.onEntering = function onEntering(node, isAppearing) {
      // getting this variable triggers a reflow
      var offsetHeight = node.offsetHeight;
      this.setState({
        startAnimation: true
      });
      this.props.onEntering(node, isAppearing);
      return offsetHeight;
    };

    _proto.onExit = function onExit(node) {
      this.setState({
        startAnimation: false
      });
      this.props.onExit(node);
    };

    _proto.onExiting = function onExiting(node) {
      this.setState({
        startAnimation: true
      });
      node.dispatchEvent(new CustomEvent('slide.bs.carousel'));
      this.props.onExiting(node);
    };

    _proto.onExited = function onExited(node) {
      node.dispatchEvent(new CustomEvent('slid.bs.carousel'));
      this.props.onExited(node);
    };

    _proto.render = function render() {
      var _this2 = this;

      var _this$props = this.props,
          isIn = _this$props.in,
          children = _this$props.children,
          cssModule = _this$props.cssModule,
          slide = _this$props.slide,
          Tag = _this$props.tag,
          className = _this$props.className,
          transitionProps = _objectWithoutPropertiesLoose(_this$props, ["in", "children", "cssModule", "slide", "tag", "className"]);

      return React__default.createElement(reactTransitionGroup_1, _extends({}, transitionProps, {
        enter: slide,
        exit: slide,
        in: isIn,
        onEnter: this.onEnter,
        onEntering: this.onEntering,
        onExit: this.onExit,
        onExiting: this.onExiting,
        onExited: this.onExited
      }), function (status) {
        var direction = _this2.context.direction;
        var isActive = status === TransitionStatuses.ENTERED || status === TransitionStatuses.EXITING;
        var directionClassName = (status === TransitionStatuses.ENTERING || status === TransitionStatuses.EXITING) && _this2.state.startAnimation && (direction === 'right' ? 'carousel-item-left' : 'carousel-item-right');
        var orderClassName = status === TransitionStatuses.ENTERING && (direction === 'right' ? 'carousel-item-next' : 'carousel-item-prev');
        var itemClasses = mapToCssModules(classnames(className, 'carousel-item', isActive && 'active', directionClassName, orderClassName), cssModule);
        return React__default.createElement(Tag, {
          className: itemClasses
        }, children);
      });
    };

    return CarouselItem;
  }(React__default.Component);

  CarouselItem.propTypes = _extends({}, reactTransitionGroup_1.propTypes, {
    tag: propTypes.oneOfType([propTypes.func, propTypes.string]),
    in: propTypes.bool,
    cssModule: propTypes.object,
    children: propTypes.node,
    slide: propTypes.bool,
    className: propTypes.string
  });
  CarouselItem.defaultProps = _extends({}, reactTransitionGroup_1.defaultProps, {
    tag: 'div',
    timeout: TransitionTimeouts.Carousel,
    slide: true
  });
  CarouselItem.contextTypes = {
    direction: propTypes.string
  };

  var Carousel =
  /*#__PURE__*/
  function (_React$Component) {
    _inheritsLoose(Carousel, _React$Component);

    function Carousel(props) {
      var _this;

      _this = _React$Component.call(this, props) || this;
      _this.handleKeyPress = _this.handleKeyPress.bind(_assertThisInitialized(_assertThisInitialized(_this)));
      _this.renderItems = _this.renderItems.bind(_assertThisInitialized(_assertThisInitialized(_this)));
      _this.hoverStart = _this.hoverStart.bind(_assertThisInitialized(_assertThisInitialized(_this)));
      _this.hoverEnd = _this.hoverEnd.bind(_assertThisInitialized(_assertThisInitialized(_this)));
      _this.state = {
        direction: 'right',
        indicatorClicked: false
      };
      return _this;
    }

    var _proto = Carousel.prototype;

    _proto.getChildContext = function getChildContext() {
      return {
        direction: this.state.direction
      };
    };

    _proto.componentDidMount = function componentDidMount() {
      // Set up the cycle
      if (this.props.ride === 'carousel') {
        this.setInterval();
      } // TODO: move this to the specific carousel like bootstrap. Currently it will trigger ALL carousels on the page.


      document.addEventListener('keyup', this.handleKeyPress);
    };

    _proto.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
      this.setInterval(nextProps); // Calculate the direction to turn

      if (this.props.activeIndex + 1 === nextProps.activeIndex) {
        this.setState({
          direction: 'right'
        });
      } else if (this.props.activeIndex - 1 === nextProps.activeIndex) {
        this.setState({
          direction: 'left'
        });
      } else if (this.props.activeIndex > nextProps.activeIndex) {
        this.setState({
          direction: this.state.indicatorClicked ? 'left' : 'right'
        });
      } else if (this.props.activeIndex !== nextProps.activeIndex) {
        this.setState({
          direction: this.state.indicatorClicked ? 'right' : 'left'
        });
      }

      this.setState({
        indicatorClicked: false
      });
    };

    _proto.componentWillUnmount = function componentWillUnmount() {
      this.clearInterval();
      document.removeEventListener('keyup', this.handleKeyPress);
    };

    _proto.setInterval = function (_setInterval) {
      function setInterval() {
        return _setInterval.apply(this, arguments);
      }

      setInterval.toString = function () {
        return _setInterval.toString();
      };

      return setInterval;
    }(function (props) {
      if (props === void 0) {
        props = this.props;
      }

      // make sure not to have multiple intervals going...
      this.clearInterval();

      if (props.interval) {
        this.cycleInterval = setInterval(function () {
          props.next();
        }, parseInt(props.interval, 10));
      }
    });

    _proto.clearInterval = function (_clearInterval) {
      function clearInterval() {
        return _clearInterval.apply(this, arguments);
      }

      clearInterval.toString = function () {
        return _clearInterval.toString();
      };

      return clearInterval;
    }(function () {
      clearInterval(this.cycleInterval);
    });

    _proto.hoverStart = function hoverStart() {
      if (this.props.pause === 'hover') {
        this.clearInterval();
      }

      if (this.props.mouseEnter) {
        var _this$props;

        (_this$props = this.props).mouseEnter.apply(_this$props, arguments);
      }
    };

    _proto.hoverEnd = function hoverEnd() {
      if (this.props.pause === 'hover') {
        this.setInterval();
      }

      if (this.props.mouseLeave) {
        var _this$props2;

        (_this$props2 = this.props).mouseLeave.apply(_this$props2, arguments);
      }
    };

    _proto.handleKeyPress = function handleKeyPress(evt) {
      if (this.props.keyboard) {
        if (evt.keyCode === 37) {
          this.props.previous();
        } else if (evt.keyCode === 39) {
          this.props.next();
        }
      }
    };

    _proto.renderItems = function renderItems(carouselItems, className) {
      var _this2 = this;

      var slide = this.props.slide;
      return React__default.createElement("div", {
        role: "listbox",
        className: className
      }, carouselItems.map(function (item, index) {
        var isIn = index === _this2.props.activeIndex;
        return React__default.cloneElement(item, {
          in: isIn,
          slide: slide
        });
      }));
    };

    _proto.render = function render() {
      var _this3 = this;

      var _this$props3 = this.props,
          cssModule = _this$props3.cssModule,
          slide = _this$props3.slide,
          className = _this$props3.className;
      var outerClasses = mapToCssModules(classnames(className, 'carousel', slide && 'slide'), cssModule);
      var innerClasses = mapToCssModules(classnames('carousel-inner'), cssModule); // filter out booleans, null, or undefined

      var children = this.props.children.filter(function (child) {
        return child !== null && child !== undefined && typeof child !== 'boolean';
      });
      var slidesOnly = children.every(function (child) {
        return child.type === CarouselItem;
      }); // Rendering only slides

      if (slidesOnly) {
        return React__default.createElement("div", {
          className: outerClasses,
          onMouseEnter: this.hoverStart,
          onMouseLeave: this.hoverEnd
        }, this.renderItems(children, innerClasses));
      } // Rendering slides and controls


      if (children[0] instanceof Array) {
        var _carouselItems = children[0];
        var _controlLeft = children[1];
        var _controlRight = children[2];
        return React__default.createElement("div", {
          className: outerClasses,
          onMouseEnter: this.hoverStart,
          onMouseLeave: this.hoverEnd
        }, this.renderItems(_carouselItems, innerClasses), _controlLeft, _controlRight);
      } // Rendering indicators, slides and controls


      var indicators = children[0];

      var wrappedOnClick = function wrappedOnClick(e) {
        if (typeof indicators.props.onClickHandler === 'function') {
          _this3.setState({
            indicatorClicked: true
          }, function () {
            return indicators.props.onClickHandler(e);
          });
        }
      };

      var wrappedIndicators = React__default.cloneElement(indicators, {
        onClickHandler: wrappedOnClick
      });
      var carouselItems = children[1];
      var controlLeft = children[2];
      var controlRight = children[3];
      return React__default.createElement("div", {
        className: outerClasses,
        onMouseEnter: this.hoverStart,
        onMouseLeave: this.hoverEnd
      }, wrappedIndicators, this.renderItems(carouselItems, innerClasses), controlLeft, controlRight);
    };

    return Carousel;
  }(React__default.Component);

  Carousel.propTypes = {
    // the current active slide of the carousel
    activeIndex: propTypes.number,
    // a function which should advance the carousel to the next slide (via activeIndex)
    next: propTypes.func.isRequired,
    // a function which should advance the carousel to the previous slide (via activeIndex)
    previous: propTypes.func.isRequired,
    // controls if the left and right arrow keys should control the carousel
    keyboard: propTypes.bool,

    /* If set to "hover", pauses the cycling of the carousel on mouseenter and resumes the cycling of the carousel on
     * mouseleave. If set to false, hovering over the carousel won't pause it. (default: "hover")
     */
    pause: propTypes.oneOf(['hover', false]),
    // Autoplays the carousel after the user manually cycles the first item. If "carousel", autoplays the carousel on load.
    // This is how bootstrap defines it... I would prefer a bool named autoplay or something...
    ride: propTypes.oneOf(['carousel']),
    // the interval at which the carousel automatically cycles (default: 5000)
    // eslint-disable-next-line react/no-unused-prop-types
    interval: propTypes.oneOfType([propTypes.number, propTypes.string, propTypes.bool]),
    children: propTypes.array,
    // called when the mouse enters the Carousel
    mouseEnter: propTypes.func,
    // called when the mouse exits the Carousel
    mouseLeave: propTypes.func,
    // controls whether the slide animation on the Carousel works or not
    slide: propTypes.bool,
    cssModule: propTypes.object,
    className: propTypes.string
  };
  Carousel.defaultProps = {
    interval: 5000,
    pause: 'hover',
    keyboard: true,
    slide: true
  };
  Carousel.childContextTypes = {
    direction: propTypes.string
  };

  var CarouselControl = function CarouselControl(props) {
    var direction = props.direction,
        onClickHandler = props.onClickHandler,
        cssModule = props.cssModule,
        directionText = props.directionText,
        className = props.className;
    var anchorClasses = mapToCssModules(classnames(className, "carousel-control-" + direction), cssModule);
    var iconClasses = mapToCssModules(classnames("carousel-control-" + direction + "-icon"), cssModule);
    var screenReaderClasses = mapToCssModules(classnames('sr-only'), cssModule);
    return React__default.createElement("a", {
      className: anchorClasses,
      role: "button",
      tabIndex: "0",
      onClick: function onClick(e) {
        e.preventDefault();
        onClickHandler();
      }
    }, React__default.createElement("span", {
      className: iconClasses,
      "aria-hidden": "true"
    }), React__default.createElement("span", {
      className: screenReaderClasses
    }, directionText || direction));
  };

  CarouselControl.propTypes = {
    direction: propTypes.oneOf(['prev', 'next']).isRequired,
    onClickHandler: propTypes.func.isRequired,
    cssModule: propTypes.object,
    directionText: propTypes.string,
    className: propTypes.string
  };

  var CarouselIndicators = function CarouselIndicators(props) {
    var items = props.items,
        activeIndex = props.activeIndex,
        cssModule = props.cssModule,
        onClickHandler = props.onClickHandler,
        className = props.className;
    var listClasses = mapToCssModules(classnames(className, 'carousel-indicators'), cssModule);
    var indicators = items.map(function (item, idx) {
      var indicatorClasses = mapToCssModules(classnames({
        active: activeIndex === idx
      }), cssModule);
      return React__default.createElement("li", {
        key: "" + (item.key || Object.values(item).join('')),
        onClick: function onClick(e) {
          e.preventDefault();
          onClickHandler(idx);
        },
        className: indicatorClasses
      });
    });
    return React__default.createElement("ol", {
      className: listClasses
    }, indicators);
  };

  CarouselIndicators.propTypes = {
    items: propTypes.array.isRequired,
    activeIndex: propTypes.number.isRequired,
    cssModule: propTypes.object,
    onClickHandler: propTypes.func.isRequired,
    className: propTypes.string
  };

  var CarouselCaption = function CarouselCaption(props) {
    var captionHeader = props.captionHeader,
        captionText = props.captionText,
        cssModule = props.cssModule,
        className = props.className;
    var classes = mapToCssModules(classnames(className, 'carousel-caption', 'd-none', 'd-md-block'), cssModule);
    return React__default.createElement("div", {
      className: classes
    }, React__default.createElement("h3", null, captionHeader), React__default.createElement("p", null, captionText));
  };

  CarouselCaption.propTypes = {
    captionHeader: propTypes.string,
    captionText: propTypes.string.isRequired,
    cssModule: propTypes.object,
    className: propTypes.string
  };

  var propTypes$w = {
    items: propTypes.array.isRequired,
    indicators: propTypes.bool,
    controls: propTypes.bool,
    autoPlay: propTypes.bool,
    defaultActiveIndex: propTypes.number,
    activeIndex: propTypes.number,
    next: propTypes.func,
    previous: propTypes.func,
    goToIndex: propTypes.func
  };

  var UncontrolledCarousel =
  /*#__PURE__*/
  function (_Component) {
    _inheritsLoose(UncontrolledCarousel, _Component);

    function UncontrolledCarousel(props) {
      var _this;

      _this = _Component.call(this, props) || this;
      _this.animating = false;
      _this.state = {
        activeIndex: props.defaultActiveIndex || 0
      };
      _this.next = _this.next.bind(_assertThisInitialized(_assertThisInitialized(_this)));
      _this.previous = _this.previous.bind(_assertThisInitialized(_assertThisInitialized(_this)));
      _this.goToIndex = _this.goToIndex.bind(_assertThisInitialized(_assertThisInitialized(_this)));
      _this.onExiting = _this.onExiting.bind(_assertThisInitialized(_assertThisInitialized(_this)));
      _this.onExited = _this.onExited.bind(_assertThisInitialized(_assertThisInitialized(_this)));
      return _this;
    }

    var _proto = UncontrolledCarousel.prototype;

    _proto.onExiting = function onExiting() {
      this.animating = true;
    };

    _proto.onExited = function onExited() {
      this.animating = false;
    };

    _proto.next = function next() {
      if (this.animating) return;
      var nextIndex = this.state.activeIndex === this.props.items.length - 1 ? 0 : this.state.activeIndex + 1;
      this.setState({
        activeIndex: nextIndex
      });
    };

    _proto.previous = function previous() {
      if (this.animating) return;
      var nextIndex = this.state.activeIndex === 0 ? this.props.items.length - 1 : this.state.activeIndex - 1;
      this.setState({
        activeIndex: nextIndex
      });
    };

    _proto.goToIndex = function goToIndex(newIndex) {
      if (this.animating) return;
      this.setState({
        activeIndex: newIndex
      });
    };

    _proto.render = function render() {
      var _this2 = this;

      var _this$props = this.props,
          defaultActiveIndex = _this$props.defaultActiveIndex,
          autoPlay = _this$props.autoPlay,
          indicators = _this$props.indicators,
          controls = _this$props.controls,
          items = _this$props.items,
          goToIndex = _this$props.goToIndex,
          props = _objectWithoutPropertiesLoose(_this$props, ["defaultActiveIndex", "autoPlay", "indicators", "controls", "items", "goToIndex"]);

      var activeIndex = this.state.activeIndex;
      var slides = items.map(function (item) {
        return React__default.createElement(CarouselItem, {
          onExiting: _this2.onExiting,
          onExited: _this2.onExited,
          key: item.src
        }, React__default.createElement("img", {
          className: "d-block w-100",
          src: item.src,
          alt: item.altText
        }), React__default.createElement(CarouselCaption, {
          captionText: item.caption,
          captionHeader: item.header || item.caption
        }));
      });
      return React__default.createElement(Carousel, _extends({
        activeIndex: activeIndex,
        next: this.next,
        previous: this.previous,
        ride: autoPlay ? 'carousel' : undefined
      }, props), indicators && React__default.createElement(CarouselIndicators, {
        items: items,
        activeIndex: props.activeIndex || activeIndex,
        onClickHandler: goToIndex || this.goToIndex
      }), slides, controls && React__default.createElement(CarouselControl, {
        direction: "prev",
        directionText: "Previous",
        onClickHandler: props.previous || this.previous
      }), controls && React__default.createElement(CarouselControl, {
        direction: "next",
        directionText: "Next",
        onClickHandler: props.next || this.next
      }));
    };

    return UncontrolledCarousel;
  }(React.Component);

  UncontrolledCarousel.propTypes = propTypes$w;
  UncontrolledCarousel.defaultProps = {
    controls: true,
    indicators: true,
    autoPlay: true
  };

  var propTypes$x = {
    tag: propTypes.oneOfType([propTypes.func, propTypes.string]),
    className: propTypes.string,
    cssModule: propTypes.object
  };
  var defaultProps$u = {
    tag: 'div'
  };

  var CardSubtitle = function CardSubtitle(props) {
    var className = props.className,
        cssModule = props.cssModule,
        Tag = props.tag,
        attributes = _objectWithoutPropertiesLoose(props, ["className", "cssModule", "tag"]);

    var classes = mapToCssModules(classnames(className, 'card-subtitle'), cssModule);
    return React__default.createElement(Tag, _extends({}, attributes, {
      className: classes
    }));
  };

  CardSubtitle.propTypes = propTypes$x;
  CardSubtitle.defaultProps = defaultProps$u;

  var propTypes$y = {
    tag: propTypes.oneOfType([propTypes.func, propTypes.string]),
    className: propTypes.string,
    cssModule: propTypes.object
  };
  var defaultProps$v = {
    tag: 'p'
  };

  var CardText = function CardText(props) {
    var className = props.className,
        cssModule = props.cssModule,
        Tag = props.tag,
        attributes = _objectWithoutPropertiesLoose(props, ["className", "cssModule", "tag"]);

    var classes = mapToCssModules(classnames(className, 'card-text'), cssModule);
    return React__default.createElement(Tag, _extends({}, attributes, {
      className: classes
    }));
  };

  CardText.propTypes = propTypes$y;
  CardText.defaultProps = defaultProps$v;

  var propTypes$z = {
    tag: propTypes.oneOfType([propTypes.func, propTypes.string]),
    className: propTypes.string,
    cssModule: propTypes.object
  };
  var defaultProps$w = {
    tag: 'div'
  };

  var CardTitle = function CardTitle(props) {
    var className = props.className,
        cssModule = props.cssModule,
        Tag = props.tag,
        attributes = _objectWithoutPropertiesLoose(props, ["className", "cssModule", "tag"]);

    var classes = mapToCssModules(classnames(className, 'card-title'), cssModule);
    return React__default.createElement(Tag, _extends({}, attributes, {
      className: classes
    }));
  };

  CardTitle.propTypes = propTypes$z;
  CardTitle.defaultProps = defaultProps$w;

  var propTypes$A = {
    className: propTypes.string,
    id: propTypes.oneOfType([propTypes.string, propTypes.number]).isRequired,
    type: propTypes.string.isRequired,
    label: propTypes.node,
    inline: propTypes.bool,
    valid: propTypes.bool,
    invalid: propTypes.bool,
    bsSize: propTypes.string,
    cssModule: propTypes.object,
    children: propTypes.oneOfType([propTypes.node, propTypes.array, propTypes.func]),
    innerRef: propTypes.oneOfType([propTypes.object, propTypes.string, propTypes.func])
  };

  function CustomInput(props) {
    var className = props.className,
        label = props.label,
        inline = props.inline,
        valid = props.valid,
        invalid = props.invalid,
        cssModule = props.cssModule,
        children = props.children,
        bsSize = props.bsSize,
        innerRef = props.innerRef,
        attributes = _objectWithoutPropertiesLoose(props, ["className", "label", "inline", "valid", "invalid", "cssModule", "children", "bsSize", "innerRef"]);

    var type = attributes.type;
    var customClass = mapToCssModules(classnames(className, "custom-" + type, bsSize ? "custom-" + type + "-" + bsSize : false), cssModule);
    var validationClassNames = mapToCssModules(classnames(invalid && 'is-invalid', valid && 'is-valid'), cssModule);

    if (type === 'select') {
      return React__default.createElement("select", _extends({}, attributes, {
        ref: innerRef,
        className: classnames(validationClassNames, customClass)
      }), children);
    }

    if (type === 'file') {
      return React__default.createElement("div", {
        className: customClass
      }, React__default.createElement("input", _extends({}, attributes, {
        ref: innerRef,
        className: classnames(validationClassNames, mapToCssModules('custom-file-input', cssModule))
      })), React__default.createElement("label", {
        className: mapToCssModules('custom-file-label', cssModule),
        htmlFor: attributes.id
      }, label || 'Choose file'));
    }

    if (type !== 'checkbox' && type !== 'radio') {
      return React__default.createElement("input", _extends({}, attributes, {
        ref: innerRef,
        className: classnames(validationClassNames, customClass)
      }));
    }

    var wrapperClasses = classnames(customClass, mapToCssModules(classnames('custom-control', {
      'custom-control-inline': inline
    }), cssModule));
    return React__default.createElement("div", {
      className: wrapperClasses
    }, React__default.createElement("input", _extends({}, attributes, {
      ref: innerRef,
      className: classnames(validationClassNames, mapToCssModules('custom-control-input', cssModule))
    })), React__default.createElement("label", {
      className: mapToCssModules('custom-control-label', cssModule),
      htmlFor: attributes.id
    }, label), children);
  }

  CustomInput.propTypes = propTypes$A;

  var propTypes$B = {
    children: propTypes.node.isRequired,
    className: propTypes.string,
    placement: propTypes.string,
    placementPrefix: propTypes.string,
    arrowClassName: propTypes.string,
    hideArrow: propTypes.bool,
    tag: propTypes.string,
    isOpen: propTypes.bool.isRequired,
    cssModule: propTypes.object,
    offset: propTypes.oneOfType([propTypes.string, propTypes.number]),
    fallbackPlacement: propTypes.oneOfType([propTypes.string, propTypes.array]),
    flip: propTypes.bool,
    container: targetPropType,
    target: targetPropType.isRequired,
    modifiers: propTypes.object,
    boundariesElement: propTypes.oneOfType([propTypes.string, DOMElement])
  };
  var defaultProps$x = {
    boundariesElement: 'scrollParent',
    placement: 'auto',
    hideArrow: false,
    isOpen: false,
    offset: 0,
    fallbackPlacement: 'flip',
    flip: true,
    container: 'body',
    modifiers: {}
  };
  var childContextTypes$1 = {
    popperManager: propTypes.object.isRequired
  };

  var PopperContent =
  /*#__PURE__*/
  function (_React$Component) {
    _inheritsLoose(PopperContent, _React$Component);

    function PopperContent(props) {
      var _this;

      _this = _React$Component.call(this, props) || this;
      _this.handlePlacementChange = _this.handlePlacementChange.bind(_assertThisInitialized(_assertThisInitialized(_this)));
      _this.setTargetNode = _this.setTargetNode.bind(_assertThisInitialized(_assertThisInitialized(_this)));
      _this.getTargetNode = _this.getTargetNode.bind(_assertThisInitialized(_assertThisInitialized(_this)));
      _this.getRef = _this.getRef.bind(_assertThisInitialized(_assertThisInitialized(_this)));
      _this.state = {};
      return _this;
    }

    var _proto = PopperContent.prototype;

    _proto.getChildContext = function getChildContext() {
      return {
        popperManager: {
          setTargetNode: this.setTargetNode,
          getTargetNode: this.getTargetNode
        }
      };
    };

    _proto.componentDidUpdate = function componentDidUpdate() {
      if (this._element && this._element.childNodes && this._element.childNodes[0] && this._element.childNodes[0].focus) {
        this._element.childNodes[0].focus();
      }
    };

    _proto.setTargetNode = function setTargetNode(node) {
      this.targetNode = node;
    };

    _proto.getTargetNode = function getTargetNode() {
      return this.targetNode;
    };

    _proto.getContainerNode = function getContainerNode() {
      return getTarget(this.props.container);
    };

    _proto.getRef = function getRef(ref) {
      this._element = ref;
    };

    _proto.handlePlacementChange = function handlePlacementChange(data) {
      if (this.state.placement !== data.placement) {
        this.setState({
          placement: data.placement
        });
      }

      return data;
    };

    _proto.renderChildren = function renderChildren() {
      var _this$props = this.props,
          cssModule = _this$props.cssModule,
          children = _this$props.children,
          isOpen = _this$props.isOpen,
          flip = _this$props.flip,
          target = _this$props.target,
          offset = _this$props.offset,
          fallbackPlacement = _this$props.fallbackPlacement,
          placementPrefix = _this$props.placementPrefix,
          _arrowClassName = _this$props.arrowClassName,
          hideArrow = _this$props.hideArrow,
          className = _this$props.className,
          tag = _this$props.tag,
          container = _this$props.container,
          modifiers = _this$props.modifiers,
          boundariesElement = _this$props.boundariesElement,
          attrs = _objectWithoutPropertiesLoose(_this$props, ["cssModule", "children", "isOpen", "flip", "target", "offset", "fallbackPlacement", "placementPrefix", "arrowClassName", "hideArrow", "className", "tag", "container", "modifiers", "boundariesElement"]);

      var arrowClassName = mapToCssModules(classnames('arrow', _arrowClassName), cssModule);
      var placement = (this.state.placement || attrs.placement).split('-')[0];
      var popperClassName = mapToCssModules(classnames(className, placementPrefix ? placementPrefix + "-" + placement : placement), this.props.cssModule);

      var extendedModifiers = _extends({
        offset: {
          offset: offset
        },
        flip: {
          enabled: flip,
          behavior: fallbackPlacement
        },
        preventOverflow: {
          boundariesElement: boundariesElement
        },
        update: {
          enabled: true,
          order: 950,
          fn: this.handlePlacementChange
        }
      }, modifiers);

      return React__default.createElement(Popper$1, _extends({
        modifiers: extendedModifiers
      }, attrs, {
        component: tag,
        className: popperClassName,
        "x-placement": this.state.placement || attrs.placement
      }), children, !hideArrow && React__default.createElement(Arrow, {
        className: arrowClassName
      }));
    };

    _proto.render = function render() {
      this.setTargetNode(getTarget(this.props.target));

      if (this.props.isOpen) {
        return this.props.container === 'inline' ? this.renderChildren() : ReactDOM.createPortal(React__default.createElement("div", {
          ref: this.getRef
        }, this.renderChildren()), this.getContainerNode());
      }

      return null;
    };

    return PopperContent;
  }(React__default.Component);

  PopperContent.propTypes = propTypes$B;
  PopperContent.defaultProps = defaultProps$x;
  PopperContent.childContextTypes = childContextTypes$1;

  var PopperTargetHelper = function PopperTargetHelper(props, context) {
    context.popperManager.setTargetNode(getTarget(props.target));
    return null;
  };

  PopperTargetHelper.contextTypes = {
    popperManager: propTypes.object.isRequired
  };
  PopperTargetHelper.propTypes = {
    target: targetPropType.isRequired
  };

  var propTypes$C = {
    placement: propTypes.oneOf(PopperPlacements),
    target: targetPropType.isRequired,
    container: targetPropType,
    isOpen: propTypes.bool,
    disabled: propTypes.bool,
    hideArrow: propTypes.bool,
    boundariesElement: propTypes.oneOfType([propTypes.string, DOMElement]),
    className: propTypes.string,
    innerClassName: propTypes.string,
    arrowClassName: propTypes.string,
    cssModule: propTypes.object,
    toggle: propTypes.func,
    autohide: propTypes.bool,
    placementPrefix: propTypes.string,
    delay: propTypes.oneOfType([propTypes.shape({
      show: propTypes.number,
      hide: propTypes.number
    }), propTypes.number]),
    modifiers: propTypes.object,
    offset: propTypes.oneOfType([propTypes.string, propTypes.number]),
    innerRef: propTypes.oneOfType([propTypes.func, propTypes.string, propTypes.object]),
    trigger: propTypes.string
  };
  var DEFAULT_DELAYS = {
    show: 0,
    hide: 250
  };
  var defaultProps$y = {
    isOpen: false,
    hideArrow: false,
    autohide: false,
    delay: DEFAULT_DELAYS,
    toggle: function toggle() {},
    trigger: 'click'
  };

  var TooltipPopoverWrapper =
  /*#__PURE__*/
  function (_React$Component) {
    _inheritsLoose(TooltipPopoverWrapper, _React$Component);

    function TooltipPopoverWrapper(props) {
      var _this;

      _this = _React$Component.call(this, props) || this;
      _this._target = null;
      _this.addTargetEvents = _this.addTargetEvents.bind(_assertThisInitialized(_assertThisInitialized(_this)));
      _this.handleDocumentClick = _this.handleDocumentClick.bind(_assertThisInitialized(_assertThisInitialized(_this)));
      _this.removeTargetEvents = _this.removeTargetEvents.bind(_assertThisInitialized(_assertThisInitialized(_this)));
      _this.toggle = _this.toggle.bind(_assertThisInitialized(_assertThisInitialized(_this)));
      _this.showWithDelay = _this.showWithDelay.bind(_assertThisInitialized(_assertThisInitialized(_this)));
      _this.hideWithDelay = _this.hideWithDelay.bind(_assertThisInitialized(_assertThisInitialized(_this)));
      _this.onMouseOverTooltipContent = _this.onMouseOverTooltipContent.bind(_assertThisInitialized(_assertThisInitialized(_this)));
      _this.onMouseLeaveTooltipContent = _this.onMouseLeaveTooltipContent.bind(_assertThisInitialized(_assertThisInitialized(_this)));
      _this.show = _this.show.bind(_assertThisInitialized(_assertThisInitialized(_this)));
      _this.hide = _this.hide.bind(_assertThisInitialized(_assertThisInitialized(_this)));
      _this.onEscKeyDown = _this.onEscKeyDown.bind(_assertThisInitialized(_assertThisInitialized(_this)));
      _this.getRef = _this.getRef.bind(_assertThisInitialized(_assertThisInitialized(_this)));
      return _this;
    }

    var _proto = TooltipPopoverWrapper.prototype;

    _proto.componentDidMount = function componentDidMount() {
      this.updateTarget();
    };

    _proto.componentWillUnmount = function componentWillUnmount() {
      this.removeTargetEvents();
    };

    _proto.onMouseOverTooltipContent = function onMouseOverTooltipContent() {
      if (this.props.trigger.indexOf('hover') > -1 && !this.props.autohide) {
        if (this._hideTimeout) {
          this.clearHideTimeout();
        }
      }
    };

    _proto.onMouseLeaveTooltipContent = function onMouseLeaveTooltipContent(e) {
      if (this.props.trigger.indexOf('hover') > -1 && !this.props.autohide) {
        if (this._showTimeout) {
          this.clearShowTimeout();
        }

        e.persist();
        this._hideTimeout = setTimeout(this.hide.bind(this, e), this.getDelay('hide'));
      }
    };

    _proto.onEscKeyDown = function onEscKeyDown(e) {
      if (e.key === 'Escape') {
        this.hide(e);
      }
    };

    _proto.getRef = function getRef(ref) {
      var innerRef = this.props.innerRef;

      if (innerRef) {
        if (typeof innerRef === 'function') {
          innerRef(ref);
        } else if (typeof innerRef === 'object') {
          innerRef.current = ref;
        }
      }

      this._popover = ref;
    };

    _proto.getDelay = function getDelay(key) {
      var delay = this.props.delay;

      if (typeof delay === 'object') {
        return isNaN(delay[key]) ? DEFAULT_DELAYS[key] : delay[key];
      }

      return delay;
    };

    _proto.show = function show(e) {
      if (!this.props.isOpen) {
        this.clearShowTimeout();
        this.toggle(e);
      }
    };

    _proto.showWithDelay = function showWithDelay(e) {
      if (this._hideTimeout) {
        this.clearHideTimeout();
      }

      this._showTimeout = setTimeout(this.show.bind(this, e), this.getDelay('show'));
    };

    _proto.hide = function hide(e) {
      if (this.props.isOpen) {
        this.clearHideTimeout();
        this.toggle(e);
      }
    };

    _proto.hideWithDelay = function hideWithDelay(e) {
      if (this._showTimeout) {
        this.clearShowTimeout();
      }

      this._hideTimeout = setTimeout(this.hide.bind(this, e), this.getDelay('hide'));
    };

    _proto.clearShowTimeout = function clearShowTimeout() {
      clearTimeout(this._showTimeout);
      this._showTimeout = undefined;
    };

    _proto.clearHideTimeout = function clearHideTimeout() {
      clearTimeout(this._hideTimeout);
      this._hideTimeout = undefined;
    };

    _proto.handleDocumentClick = function handleDocumentClick(e) {
      if (this._target && this.props.trigger.indexOf('click') > -1) {
        if (e.target === this._target || this._target.contains(e.target)) {
          if (this._hideTimeout) {
            this.clearHideTimeout();
          }

          if (!this.props.isOpen) {
            this.showWithDelay(e);
          } else {
            this.hideWithDelay(e);
          }
        }
      }
    };

    _proto.addTargetEvents = function addTargetEvents() {
      var _this2 = this;

      if (this.props.trigger) {
        var triggers = this.props.trigger.split(' ');

        if (triggers.indexOf('manual') === -1) {
          if (triggers.indexOf('click') > -1) {
            ['click', 'touchstart'].forEach(function (event) {
              return document.addEventListener(event, _this2.handleDocumentClick, true);
            });
          }

          if (this._target) {
            if (triggers.indexOf('hover') > -1) {
              this._target.addEventListener('mouseover', this.showWithDelay, true);

              this._target.addEventListener('mouseout', this.hideWithDelay, true);
            }

            if (triggers.indexOf('focus') > -1) {
              this._target.addEventListener('focusin', this.show, true);

              this._target.addEventListener('focusout', this.hide, true);
            }

            this._target.addEventListener('keydown', this.onEscKeyDown, true);
          }
        }
      }
    };

    _proto.removeTargetEvents = function removeTargetEvents() {
      var _this3 = this;

      if (this._target) {
        this._target.removeEventListener('mouseover', this.showWithDelay, true);

        this._target.removeEventListener('mouseout', this.hideWithDelay, true);

        this._target.addEventListener('keydown', this.onEscKeyDown, true);

        this._target.addEventListener('focusin', this.show, true);

        this._target.addEventListener('focusout', this.hide, true);
      }

      ['click', 'touchstart'].forEach(function (event) {
        return document.removeEventListener(event, _this3.handleDocumentClick, true);
      });
    };

    _proto.updateTarget = function updateTarget() {
      var newTarget = getTarget(this.props.target);

      if (newTarget !== this._target) {
        this.removeTargetEvents();
        this._target = newTarget;
        this.addTargetEvents();
      }
    };

    _proto.toggle = function toggle(e) {
      if (this.props.disabled) {
        return e && e.preventDefault();
      }

      return this.props.toggle(e);
    };

    _proto.render = function render() {
      if (!this.props.isOpen) {
        return null;
      }

      this.updateTarget();
      var _this$props = this.props,
          className = _this$props.className,
          cssModule = _this$props.cssModule,
          innerClassName = _this$props.innerClassName,
          target = _this$props.target,
          isOpen = _this$props.isOpen,
          hideArrow = _this$props.hideArrow,
          boundariesElement = _this$props.boundariesElement,
          placement = _this$props.placement,
          placementPrefix = _this$props.placementPrefix,
          arrowClassName = _this$props.arrowClassName,
          container = _this$props.container,
          modifiers = _this$props.modifiers,
          offset = _this$props.offset;
      var attributes = omit(this.props, Object.keys(propTypes$C));
      var popperClasses = mapToCssModules(className, cssModule);
      var classes = mapToCssModules(innerClassName, cssModule);
      return React__default.createElement(PopperContent, {
        className: popperClasses,
        target: target,
        isOpen: isOpen,
        hideArrow: hideArrow,
        boundariesElement: boundariesElement,
        placement: placement,
        placementPrefix: placementPrefix,
        arrowClassName: arrowClassName,
        container: container,
        modifiers: modifiers,
        offset: offset,
        cssModule: cssModule
      }, React__default.createElement("div", _extends({}, attributes, {
        ref: this.getRef,
        className: classes,
        role: "tooltip",
        "aria-hidden": isOpen,
        onMouseOver: this.onMouseOverTooltipContent,
        onMouseLeave: this.onMouseLeaveTooltipContent,
        onKeyDown: this.onEscKeyDown
      })));
    };

    return TooltipPopoverWrapper;
  }(React__default.Component);

  TooltipPopoverWrapper.propTypes = propTypes$C;
  TooltipPopoverWrapper.defaultProps = defaultProps$y;

  var defaultProps$z = {
    placement: 'right',
    placementPrefix: 'bs-popover',
    trigger: 'click'
  };

  var Popover = function Popover(props) {
    var popperClasses = classnames('popover', 'show', props.className);
    var classes = classnames('popover-inner', props.innerClassName);
    return React__default.createElement(TooltipPopoverWrapper, _extends({}, props, {
      className: popperClasses,
      innerClassName: classes
    }));
  };

  Popover.propTypes = propTypes$C;
  Popover.defaultProps = defaultProps$z;

  var omitKeys = ['defaultOpen'];

  var UncontrolledPopover =
  /*#__PURE__*/
  function (_Component) {
    _inheritsLoose(UncontrolledPopover, _Component);

    function UncontrolledPopover(props) {
      var _this;

      _this = _Component.call(this, props) || this;
      _this.state = {
        isOpen: props.defaultOpen || false
      };
      _this.toggle = _this.toggle.bind(_assertThisInitialized(_assertThisInitialized(_this)));
      return _this;
    }

    var _proto = UncontrolledPopover.prototype;

    _proto.toggle = function toggle() {
      this.setState({
        isOpen: !this.state.isOpen
      });
    };

    _proto.render = function render() {
      return React__default.createElement(Popover, _extends({
        isOpen: this.state.isOpen,
        toggle: this.toggle
      }, omit(this.props, omitKeys)));
    };

    return UncontrolledPopover;
  }(React.Component);
  UncontrolledPopover.propTypes = _extends({
    defaultOpen: propTypes.bool
  }, Popover.propTypes);

  var propTypes$D = {
    tag: propTypes.oneOfType([propTypes.func, propTypes.string]),
    className: propTypes.string,
    cssModule: propTypes.object
  };
  var defaultProps$A = {
    tag: 'h3'
  };

  var PopoverHeader = function PopoverHeader(props) {
    var className = props.className,
        cssModule = props.cssModule,
        Tag = props.tag,
        attributes = _objectWithoutPropertiesLoose(props, ["className", "cssModule", "tag"]);

    var classes = mapToCssModules(classnames(className, 'popover-header'), cssModule);
    return React__default.createElement(Tag, _extends({}, attributes, {
      className: classes
    }));
  };

  PopoverHeader.propTypes = propTypes$D;
  PopoverHeader.defaultProps = defaultProps$A;

  function PopoverTitle(props) {
    warnOnce('The "PopoverTitle" component has been deprecated.\nPlease use component "PopoverHeader".');
    return React__default.createElement(PopoverHeader, props);
  }

  var propTypes$E = {
    tag: propTypes.oneOfType([propTypes.func, propTypes.string]),
    className: propTypes.string,
    cssModule: propTypes.object
  };
  var defaultProps$B = {
    tag: 'div'
  };

  var PopoverBody = function PopoverBody(props) {
    var className = props.className,
        cssModule = props.cssModule,
        Tag = props.tag,
        attributes = _objectWithoutPropertiesLoose(props, ["className", "cssModule", "tag"]);

    var classes = mapToCssModules(classnames(className, 'popover-body'), cssModule);
    return React__default.createElement(Tag, _extends({}, attributes, {
      className: classes
    }));
  };

  PopoverBody.propTypes = propTypes$E;
  PopoverBody.defaultProps = defaultProps$B;

  function PopoverContent(props) {
    warnOnce('The "PopoverContent" component has been deprecated.\nPlease use component "PopoverBody".');
    return React__default.createElement(PopoverBody, props);
  }

  /**
   * lodash (Custom Build) <https://lodash.com/>
   * Build: `lodash modularize exports="npm" -o ./`
   * Copyright jQuery Foundation and other contributors <https://jquery.org/>
   * Released under MIT license <https://lodash.com/license>
   * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
   * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
   */

  /** Used as references for various `Number` constants. */
  var NAN = 0 / 0;
  /** `Object#toString` result references. */

  var symbolTag = '[object Symbol]';
  /** Used to match leading and trailing whitespace. */

  var reTrim = /^\s+|\s+$/g;
  /** Used to detect bad signed hexadecimal string values. */

  var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;
  /** Used to detect binary string values. */

  var reIsBinary = /^0b[01]+$/i;
  /** Used to detect octal string values. */

  var reIsOctal = /^0o[0-7]+$/i;
  /** Built-in method references without a dependency on `root`. */

  var freeParseInt = parseInt;
  /** Used for built-in method references. */

  var objectProto$1 = Object.prototype;
  /**
   * Used to resolve the
   * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
   * of values.
   */

  var objectToString$1 = objectProto$1.toString;
  /**
   * Checks if `value` is the
   * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
   * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is an object, else `false`.
   * @example
   *
   * _.isObject({});
   * // => true
   *
   * _.isObject([1, 2, 3]);
   * // => true
   *
   * _.isObject(_.noop);
   * // => true
   *
   * _.isObject(null);
   * // => false
   */

  function isObject$2(value) {
    var type = typeof value;
    return !!value && (type == 'object' || type == 'function');
  }
  /**
   * Checks if `value` is object-like. A value is object-like if it's not `null`
   * and has a `typeof` result of "object".
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
   * @example
   *
   * _.isObjectLike({});
   * // => true
   *
   * _.isObjectLike([1, 2, 3]);
   * // => true
   *
   * _.isObjectLike(_.noop);
   * // => false
   *
   * _.isObjectLike(null);
   * // => false
   */


  function isObjectLike(value) {
    return !!value && typeof value == 'object';
  }
  /**
   * Checks if `value` is classified as a `Symbol` primitive or object.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
   * @example
   *
   * _.isSymbol(Symbol.iterator);
   * // => true
   *
   * _.isSymbol('abc');
   * // => false
   */


  function isSymbol(value) {
    return typeof value == 'symbol' || isObjectLike(value) && objectToString$1.call(value) == symbolTag;
  }
  /**
   * Converts `value` to a number.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to process.
   * @returns {number} Returns the number.
   * @example
   *
   * _.toNumber(3.2);
   * // => 3.2
   *
   * _.toNumber(Number.MIN_VALUE);
   * // => 5e-324
   *
   * _.toNumber(Infinity);
   * // => Infinity
   *
   * _.toNumber('3.2');
   * // => 3.2
   */


  function toNumber(value) {
    if (typeof value == 'number') {
      return value;
    }

    if (isSymbol(value)) {
      return NAN;
    }

    if (isObject$2(value)) {
      var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
      value = isObject$2(other) ? other + '' : other;
    }

    if (typeof value != 'string') {
      return value === 0 ? value : +value;
    }

    value = value.replace(reTrim, '');
    var isBinary = reIsBinary.test(value);
    return isBinary || reIsOctal.test(value) ? freeParseInt(value.slice(2), isBinary ? 2 : 8) : reIsBadHex.test(value) ? NAN : +value;
  }

  var lodash_tonumber = toNumber;

  var propTypes$F = {
    children: propTypes.node,
    bar: propTypes.bool,
    multi: propTypes.bool,
    tag: propTypes.string,
    value: propTypes.oneOfType([propTypes.string, propTypes.number]),
    max: propTypes.oneOfType([propTypes.string, propTypes.number]),
    animated: propTypes.bool,
    striped: propTypes.bool,
    color: propTypes.string,
    className: propTypes.string,
    barClassName: propTypes.string,
    cssModule: propTypes.object
  };
  var defaultProps$C = {
    tag: 'div',
    value: 0,
    max: 100
  };

  var Progress = function Progress(props) {
    var children = props.children,
        className = props.className,
        barClassName = props.barClassName,
        cssModule = props.cssModule,
        value = props.value,
        max = props.max,
        animated = props.animated,
        striped = props.striped,
        color = props.color,
        bar = props.bar,
        multi = props.multi,
        Tag = props.tag,
        attributes = _objectWithoutPropertiesLoose(props, ["children", "className", "barClassName", "cssModule", "value", "max", "animated", "striped", "color", "bar", "multi", "tag"]);

    var percent = lodash_tonumber(value) / lodash_tonumber(max) * 100;
    var progressClasses = mapToCssModules(classnames(className, 'progress'), cssModule);
    var progressBarClasses = mapToCssModules(classnames('progress-bar', bar ? className || barClassName : barClassName, animated ? 'progress-bar-animated' : null, color ? "bg-" + color : null, striped || animated ? 'progress-bar-striped' : null), cssModule);
    var ProgressBar = multi ? children : React__default.createElement("div", {
      className: progressBarClasses,
      style: {
        width: percent + "%"
      },
      role: "progressbar",
      "aria-valuenow": value,
      "aria-valuemin": "0",
      "aria-valuemax": max,
      children: children
    });

    if (bar) {
      return ProgressBar;
    }

    return React__default.createElement(Tag, _extends({}, attributes, {
      className: progressClasses,
      children: ProgressBar
    }));
  };

  Progress.propTypes = propTypes$F;
  Progress.defaultProps = defaultProps$C;

  var propTypes$G = {
    children: propTypes.node.isRequired,
    node: propTypes.any
  };

  var Portal =
  /*#__PURE__*/
  function (_React$Component) {
    _inheritsLoose(Portal, _React$Component);

    function Portal() {
      return _React$Component.apply(this, arguments) || this;
    }

    var _proto = Portal.prototype;

    _proto.componentWillUnmount = function componentWillUnmount() {
      if (this.defaultNode) {
        document.body.removeChild(this.defaultNode);
      }

      this.defaultNode = null;
    };

    _proto.render = function render() {
      if (!canUseDOM) {
        return null;
      }

      if (!this.props.node && !this.defaultNode) {
        this.defaultNode = document.createElement('div');
        document.body.appendChild(this.defaultNode);
      }

      return ReactDOM.createPortal(this.props.children, this.props.node || this.defaultNode);
    };

    return Portal;
  }(React__default.Component);

  Portal.propTypes = propTypes$G;

  function noop() {}

  var FadePropTypes = propTypes.shape(Fade.propTypes);
  var propTypes$H = {
    isOpen: propTypes.bool,
    autoFocus: propTypes.bool,
    centered: propTypes.bool,
    size: propTypes.string,
    toggle: propTypes.func,
    keyboard: propTypes.bool,
    role: propTypes.string,
    labelledBy: propTypes.string,
    backdrop: propTypes.oneOfType([propTypes.bool, propTypes.oneOf(['static'])]),
    onEnter: propTypes.func,
    onExit: propTypes.func,
    onOpened: propTypes.func,
    onClosed: propTypes.func,
    children: propTypes.node,
    className: propTypes.string,
    wrapClassName: propTypes.string,
    modalClassName: propTypes.string,
    backdropClassName: propTypes.string,
    contentClassName: propTypes.string,
    external: propTypes.node,
    fade: propTypes.bool,
    cssModule: propTypes.object,
    zIndex: propTypes.oneOfType([propTypes.number, propTypes.string]),
    backdropTransition: FadePropTypes,
    modalTransition: FadePropTypes,
    innerRef: propTypes.oneOfType([propTypes.object, propTypes.string, propTypes.func])
  };
  var propsToOmit = Object.keys(propTypes$H);
  var defaultProps$D = {
    isOpen: false,
    autoFocus: true,
    centered: false,
    role: 'dialog',
    backdrop: true,
    keyboard: true,
    zIndex: 1050,
    fade: true,
    onOpened: noop,
    onClosed: noop,
    modalTransition: {
      timeout: TransitionTimeouts.Modal
    },
    backdropTransition: {
      mountOnEnter: true,
      timeout: TransitionTimeouts.Fade // uses standard fade transition

    }
  };

  var Modal =
  /*#__PURE__*/
  function (_React$Component) {
    _inheritsLoose(Modal, _React$Component);

    function Modal(props) {
      var _this;

      _this = _React$Component.call(this, props) || this;
      _this._element = null;
      _this._originalBodyPadding = null;
      _this.getFocusableChildren = _this.getFocusableChildren.bind(_assertThisInitialized(_assertThisInitialized(_this)));
      _this.handleBackdropClick = _this.handleBackdropClick.bind(_assertThisInitialized(_assertThisInitialized(_this)));
      _this.handleBackdropMouseDown = _this.handleBackdropMouseDown.bind(_assertThisInitialized(_assertThisInitialized(_this)));
      _this.handleEscape = _this.handleEscape.bind(_assertThisInitialized(_assertThisInitialized(_this)));
      _this.handleTab = _this.handleTab.bind(_assertThisInitialized(_assertThisInitialized(_this)));
      _this.onOpened = _this.onOpened.bind(_assertThisInitialized(_assertThisInitialized(_this)));
      _this.onClosed = _this.onClosed.bind(_assertThisInitialized(_assertThisInitialized(_this)));
      _this.state = {
        isOpen: props.isOpen
      };

      if (props.isOpen) {
        _this.init();
      }

      return _this;
    }

    var _proto = Modal.prototype;

    _proto.componentDidMount = function componentDidMount() {
      if (this.props.onEnter) {
        this.props.onEnter();
      }

      if (this.state.isOpen && this.props.autoFocus) {
        this.setFocus();
      }

      this._isMounted = true;
    };

    _proto.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
      if (nextProps.isOpen && !this.props.isOpen) {
        this.setState({
          isOpen: nextProps.isOpen
        });
      }
    };

    _proto.componentWillUpdate = function componentWillUpdate(nextProps, nextState) {
      if (nextState.isOpen && !this.state.isOpen) {
        this.init();
      }
    };

    _proto.componentDidUpdate = function componentDidUpdate(prevProps, prevState) {
      if (this.props.autoFocus && this.state.isOpen && !prevState.isOpen) {
        this.setFocus();
      }

      if (this._element && prevProps.zIndex !== this.props.zIndex) {
        this._element.style.zIndex = this.props.zIndex;
      }
    };

    _proto.componentWillUnmount = function componentWillUnmount() {
      if (this.props.onExit) {
        this.props.onExit();
      }

      if (this.state.isOpen) {
        this.destroy();
      }

      this._isMounted = false;
    };

    _proto.onOpened = function onOpened(node, isAppearing) {
      this.props.onOpened();
      (this.props.modalTransition.onEntered || noop)(node, isAppearing);
    };

    _proto.onClosed = function onClosed(node) {
      // so all methods get called before it is unmounted
      this.props.onClosed();
      (this.props.modalTransition.onExited || noop)(node);
      this.destroy();

      if (this._isMounted) {
        this.setState({
          isOpen: false
        });
      }
    };

    _proto.setFocus = function setFocus() {
      if (this._dialog && this._dialog.parentNode && typeof this._dialog.parentNode.focus === 'function') {
        this._dialog.parentNode.focus();
      }
    };

    _proto.getFocusableChildren = function getFocusableChildren() {
      return this._element.querySelectorAll(focusableElements.join(', '));
    };

    _proto.getFocusedChild = function getFocusedChild() {
      var currentFocus;
      var focusableChildren = this.getFocusableChildren();

      try {
        currentFocus = document.activeElement;
      } catch (err) {
        currentFocus = focusableChildren[0];
      }

      return currentFocus;
    } // not mouseUp because scrollbar fires it, shouldn't close when user scrolls
    ;

    _proto.handleBackdropClick = function handleBackdropClick(e) {
      if (e.target === this._mouseDownElement) {
        e.stopPropagation();
        if (!this.props.isOpen || this.props.backdrop !== true) return;
        var container = this._dialog;

        if (e.target && !container.contains(e.target) && this.props.toggle) {
          this.props.toggle(e);
        }
      }
    };

    _proto.handleTab = function handleTab(e) {
      if (e.which !== 9) return;
      var focusableChildren = this.getFocusableChildren();
      var totalFocusable = focusableChildren.length;
      var currentFocus = this.getFocusedChild();
      var focusedIndex = 0;

      for (var i = 0; i < totalFocusable; i += 1) {
        if (focusableChildren[i] === currentFocus) {
          focusedIndex = i;
          break;
        }
      }

      if (e.shiftKey && focusedIndex === 0) {
        e.preventDefault();
        focusableChildren[totalFocusable - 1].focus();
      } else if (!e.shiftKey && focusedIndex === totalFocusable - 1) {
        e.preventDefault();
        focusableChildren[0].focus();
      }
    };

    _proto.handleBackdropMouseDown = function handleBackdropMouseDown(e) {
      this._mouseDownElement = e.target;
    };

    _proto.handleEscape = function handleEscape(e) {
      if (this.props.isOpen && this.props.keyboard && e.keyCode === 27 && this.props.toggle) {
        e.preventDefault();
        e.stopPropagation();
        this.props.toggle(e);
      }
    };

    _proto.init = function init() {
      try {
        this._triggeringElement = document.activeElement;
      } catch (err) {
        this._triggeringElement = null;
      }

      this._element = document.createElement('div');

      this._element.setAttribute('tabindex', '-1');

      this._element.style.position = 'relative';
      this._element.style.zIndex = this.props.zIndex;
      this._originalBodyPadding = getOriginalBodyPadding();
      conditionallyUpdateScrollbar();
      document.body.appendChild(this._element);

      if (Modal.openCount === 0) {
        document.body.className = classnames(document.body.className, mapToCssModules('modal-open', this.props.cssModule));
      }

      Modal.openCount += 1;
    };

    _proto.destroy = function destroy() {
      if (this._element) {
        document.body.removeChild(this._element);
        this._element = null;
      }

      if (this._triggeringElement) {
        if (this._triggeringElement.focus) this._triggeringElement.focus();
        this._triggeringElement = null;
      }

      if (Modal.openCount <= 1) {
        var modalOpenClassName = mapToCssModules('modal-open', this.props.cssModule); // Use regex to prevent matching `modal-open` as part of a different class, e.g. `my-modal-opened`

        var modalOpenClassNameRegex = new RegExp("(^| )" + modalOpenClassName + "( |$)");
        document.body.className = document.body.className.replace(modalOpenClassNameRegex, ' ').trim();
      }

      Modal.openCount -= 1;
      setScrollbarWidth(this._originalBodyPadding);
    };

    _proto.renderModalDialog = function renderModalDialog() {
      var _classNames,
          _this2 = this;

      var attributes = omit(this.props, propsToOmit);
      var dialogBaseClass = 'modal-dialog';
      return React__default.createElement("div", _extends({}, attributes, {
        className: mapToCssModules(classnames(dialogBaseClass, this.props.className, (_classNames = {}, _classNames["modal-" + this.props.size] = this.props.size, _classNames[dialogBaseClass + "-centered"] = this.props.centered, _classNames)), this.props.cssModule),
        role: "document",
        ref: function ref(c) {
          _this2._dialog = c;
        }
      }), React__default.createElement("div", {
        className: mapToCssModules(classnames('modal-content', this.props.contentClassName), this.props.cssModule)
      }, this.props.children));
    };

    _proto.render = function render() {
      if (this.state.isOpen) {
        var _this$props = this.props,
            wrapClassName = _this$props.wrapClassName,
            modalClassName = _this$props.modalClassName,
            backdropClassName = _this$props.backdropClassName,
            cssModule = _this$props.cssModule,
            isOpen = _this$props.isOpen,
            backdrop = _this$props.backdrop,
            role = _this$props.role,
            labelledBy = _this$props.labelledBy,
            external = _this$props.external,
            innerRef = _this$props.innerRef;
        var modalAttributes = {
          onClick: this.handleBackdropClick,
          onMouseDown: this.handleBackdropMouseDown,
          onKeyUp: this.handleEscape,
          onKeyDown: this.handleTab,
          style: {
            display: 'block'
          },
          'aria-labelledby': labelledBy,
          role: role,
          tabIndex: '-1'
        };
        var hasTransition = this.props.fade;

        var modalTransition = _extends({}, Fade.defaultProps, this.props.modalTransition, {
          baseClass: hasTransition ? this.props.modalTransition.baseClass : '',
          timeout: hasTransition ? this.props.modalTransition.timeout : 0
        });

        var backdropTransition = _extends({}, Fade.defaultProps, this.props.backdropTransition, {
          baseClass: hasTransition ? this.props.backdropTransition.baseClass : '',
          timeout: hasTransition ? this.props.backdropTransition.timeout : 0
        });

        var Backdrop = backdrop && (hasTransition ? React__default.createElement(Fade, _extends({}, backdropTransition, {
          in: isOpen && !!backdrop,
          cssModule: cssModule,
          className: mapToCssModules(classnames('modal-backdrop', backdropClassName), cssModule)
        })) : React__default.createElement("div", {
          className: mapToCssModules(classnames('modal-backdrop', 'show', backdropClassName), cssModule)
        }));
        return React__default.createElement(Portal, {
          node: this._element
        }, React__default.createElement("div", {
          className: mapToCssModules(wrapClassName)
        }, React__default.createElement(Fade, _extends({}, modalAttributes, modalTransition, {
          in: isOpen,
          onEntered: this.onOpened,
          onExited: this.onClosed,
          cssModule: cssModule,
          className: mapToCssModules(classnames('modal', modalClassName), cssModule),
          innerRef: innerRef
        }), external, this.renderModalDialog()), Backdrop));
      }

      return null;
    };

    return Modal;
  }(React__default.Component);

  Modal.propTypes = propTypes$H;
  Modal.defaultProps = defaultProps$D;
  Modal.openCount = 0;

  var propTypes$I = {
    tag: propTypes.oneOfType([propTypes.func, propTypes.string]),
    wrapTag: propTypes.oneOfType([propTypes.func, propTypes.string]),
    toggle: propTypes.func,
    className: propTypes.string,
    cssModule: propTypes.object,
    children: propTypes.node,
    closeAriaLabel: propTypes.string,
    charCode: propTypes.oneOfType([propTypes.string, propTypes.number]),
    close: propTypes.object
  };
  var defaultProps$E = {
    tag: 'h5',
    wrapTag: 'div',
    closeAriaLabel: 'Close',
    charCode: 215
  };

  var ModalHeader = function ModalHeader(props) {
    var closeButton;

    var className = props.className,
        cssModule = props.cssModule,
        children = props.children,
        toggle = props.toggle,
        Tag = props.tag,
        WrapTag = props.wrapTag,
        closeAriaLabel = props.closeAriaLabel,
        charCode = props.charCode,
        close = props.close,
        attributes = _objectWithoutPropertiesLoose(props, ["className", "cssModule", "children", "toggle", "tag", "wrapTag", "closeAriaLabel", "charCode", "close"]);

    var classes = mapToCssModules(classnames(className, 'modal-header'), cssModule);

    if (!close && toggle) {
      var closeIcon = typeof charCode === 'number' ? String.fromCharCode(charCode) : charCode;
      closeButton = React__default.createElement("button", {
        type: "button",
        onClick: toggle,
        className: mapToCssModules('close', cssModule),
        "aria-label": closeAriaLabel
      }, React__default.createElement("span", {
        "aria-hidden": "true"
      }, closeIcon));
    }

    return React__default.createElement(WrapTag, _extends({}, attributes, {
      className: classes
    }), React__default.createElement(Tag, {
      className: mapToCssModules('modal-title', cssModule)
    }, children), close || closeButton);
  };

  ModalHeader.propTypes = propTypes$I;
  ModalHeader.defaultProps = defaultProps$E;

  var propTypes$J = {
    tag: propTypes.oneOfType([propTypes.func, propTypes.string]),
    className: propTypes.string,
    cssModule: propTypes.object
  };
  var defaultProps$F = {
    tag: 'div'
  };

  var ModalBody = function ModalBody(props) {
    var className = props.className,
        cssModule = props.cssModule,
        Tag = props.tag,
        attributes = _objectWithoutPropertiesLoose(props, ["className", "cssModule", "tag"]);

    var classes = mapToCssModules(classnames(className, 'modal-body'), cssModule);
    return React__default.createElement(Tag, _extends({}, attributes, {
      className: classes
    }));
  };

  ModalBody.propTypes = propTypes$J;
  ModalBody.defaultProps = defaultProps$F;

  var propTypes$K = {
    tag: propTypes.oneOfType([propTypes.func, propTypes.string]),
    className: propTypes.string,
    cssModule: propTypes.object
  };
  var defaultProps$G = {
    tag: 'div'
  };

  var ModalFooter = function ModalFooter(props) {
    var className = props.className,
        cssModule = props.cssModule,
        Tag = props.tag,
        attributes = _objectWithoutPropertiesLoose(props, ["className", "cssModule", "tag"]);

    var classes = mapToCssModules(classnames(className, 'modal-footer'), cssModule);
    return React__default.createElement(Tag, _extends({}, attributes, {
      className: classes
    }));
  };

  ModalFooter.propTypes = propTypes$K;
  ModalFooter.defaultProps = defaultProps$G;

  var defaultProps$H = {
    placement: 'top',
    autohide: true,
    placementPrefix: 'bs-tooltip',
    trigger: 'click hover focus'
  };

  var Tooltip = function Tooltip(props) {
    var popperClasses = classnames('tooltip', 'show', props.className);
    var classes = classnames('tooltip-inner', props.innerClassName);
    return React__default.createElement(TooltipPopoverWrapper, _extends({}, props, {
      className: popperClasses,
      innerClassName: classes
    }));
  };

  Tooltip.propTypes = propTypes$C;
  Tooltip.defaultProps = defaultProps$H;

  var propTypes$L = {
    className: propTypes.string,
    cssModule: propTypes.object,
    size: propTypes.string,
    bordered: propTypes.bool,
    borderless: propTypes.bool,
    striped: propTypes.bool,
    inverse: deprecated(propTypes.bool, 'Please use the prop "dark"'),
    dark: propTypes.bool,
    hover: propTypes.bool,
    responsive: propTypes.oneOfType([propTypes.bool, propTypes.string]),
    tag: propTypes.oneOfType([propTypes.func, propTypes.string]),
    responsiveTag: propTypes.oneOfType([propTypes.func, propTypes.string]),
    innerRef: propTypes.oneOfType([propTypes.func, propTypes.string, propTypes.object])
  };
  var defaultProps$I = {
    tag: 'table',
    responsiveTag: 'div'
  };

  var Table = function Table(props) {
    var className = props.className,
        cssModule = props.cssModule,
        size = props.size,
        bordered = props.bordered,
        borderless = props.borderless,
        striped = props.striped,
        inverse = props.inverse,
        dark = props.dark,
        hover = props.hover,
        responsive = props.responsive,
        Tag = props.tag,
        ResponsiveTag = props.responsiveTag,
        innerRef = props.innerRef,
        attributes = _objectWithoutPropertiesLoose(props, ["className", "cssModule", "size", "bordered", "borderless", "striped", "inverse", "dark", "hover", "responsive", "tag", "responsiveTag", "innerRef"]);

    var classes = mapToCssModules(classnames(className, 'table', size ? 'table-' + size : false, bordered ? 'table-bordered' : false, borderless ? 'table-borderless' : false, striped ? 'table-striped' : false, dark || inverse ? 'table-dark' : false, hover ? 'table-hover' : false), cssModule);
    var table = React__default.createElement(Tag, _extends({}, attributes, {
      ref: innerRef,
      className: classes
    }));

    if (responsive) {
      var responsiveClassName = responsive === true ? 'table-responsive' : "table-responsive-" + responsive;
      return React__default.createElement(ResponsiveTag, {
        className: responsiveClassName
      }, table);
    }

    return table;
  };

  Table.propTypes = propTypes$L;
  Table.defaultProps = defaultProps$I;

  var propTypes$M = {
    tag: propTypes.oneOfType([propTypes.func, propTypes.string]),
    flush: propTypes.bool,
    className: propTypes.string,
    cssModule: propTypes.object
  };
  var defaultProps$J = {
    tag: 'ul'
  };

  var ListGroup = function ListGroup(props) {
    var className = props.className,
        cssModule = props.cssModule,
        Tag = props.tag,
        flush = props.flush,
        attributes = _objectWithoutPropertiesLoose(props, ["className", "cssModule", "tag", "flush"]);

    var classes = mapToCssModules(classnames(className, 'list-group', flush ? 'list-group-flush' : false), cssModule);
    return React__default.createElement(Tag, _extends({}, attributes, {
      className: classes
    }));
  };

  ListGroup.propTypes = propTypes$M;
  ListGroup.defaultProps = defaultProps$J;

  var propTypes$N = {
    children: propTypes.node,
    inline: propTypes.bool,
    tag: propTypes.oneOfType([propTypes.func, propTypes.string]),
    innerRef: propTypes.oneOfType([propTypes.object, propTypes.func, propTypes.string]),
    className: propTypes.string,
    cssModule: propTypes.object
  };
  var defaultProps$K = {
    tag: 'form'
  };

  var Form =
  /*#__PURE__*/
  function (_Component) {
    _inheritsLoose(Form, _Component);

    function Form(props) {
      var _this;

      _this = _Component.call(this, props) || this;
      _this.getRef = _this.getRef.bind(_assertThisInitialized(_assertThisInitialized(_this)));
      _this.submit = _this.submit.bind(_assertThisInitialized(_assertThisInitialized(_this)));
      return _this;
    }

    var _proto = Form.prototype;

    _proto.getRef = function getRef(ref) {
      if (this.props.innerRef) {
        this.props.innerRef(ref);
      }

      this.ref = ref;
    };

    _proto.submit = function submit() {
      if (this.ref) {
        this.ref.submit();
      }
    };

    _proto.render = function render() {
      var _this$props = this.props,
          className = _this$props.className,
          cssModule = _this$props.cssModule,
          inline = _this$props.inline,
          Tag = _this$props.tag,
          innerRef = _this$props.innerRef,
          attributes = _objectWithoutPropertiesLoose(_this$props, ["className", "cssModule", "inline", "tag", "innerRef"]);

      var classes = mapToCssModules(classnames(className, inline ? 'form-inline' : false), cssModule);
      return React__default.createElement(Tag, _extends({}, attributes, {
        ref: innerRef,
        className: classes
      }));
    };

    return Form;
  }(React.Component);

  Form.propTypes = propTypes$N;
  Form.defaultProps = defaultProps$K;

  var propTypes$O = {
    children: propTypes.node,
    tag: propTypes.string,
    className: propTypes.string,
    cssModule: propTypes.object,
    valid: propTypes.bool,
    tooltip: propTypes.bool
  };
  var defaultProps$L = {
    tag: 'div',
    valid: undefined
  };

  var FormFeedback = function FormFeedback(props) {
    var className = props.className,
        cssModule = props.cssModule,
        valid = props.valid,
        tooltip = props.tooltip,
        Tag = props.tag,
        attributes = _objectWithoutPropertiesLoose(props, ["className", "cssModule", "valid", "tooltip", "tag"]);

    var validMode = tooltip ? 'tooltip' : 'feedback';
    var classes = mapToCssModules(classnames(className, valid ? "valid-" + validMode : "invalid-" + validMode), cssModule);
    return React__default.createElement(Tag, _extends({}, attributes, {
      className: classes
    }));
  };

  FormFeedback.propTypes = propTypes$O;
  FormFeedback.defaultProps = defaultProps$L;

  var propTypes$P = {
    children: propTypes.node,
    row: propTypes.bool,
    check: propTypes.bool,
    inline: propTypes.bool,
    disabled: propTypes.bool,
    tag: propTypes.string,
    className: propTypes.string,
    cssModule: propTypes.object
  };
  var defaultProps$M = {
    tag: 'div'
  };

  var FormGroup = function FormGroup(props) {
    var className = props.className,
        cssModule = props.cssModule,
        row = props.row,
        disabled = props.disabled,
        check = props.check,
        inline = props.inline,
        Tag = props.tag,
        attributes = _objectWithoutPropertiesLoose(props, ["className", "cssModule", "row", "disabled", "check", "inline", "tag"]);

    var classes = mapToCssModules(classnames(className, row ? 'row' : false, check ? 'form-check' : 'form-group', check && inline ? 'form-check-inline' : false, check && disabled ? 'disabled' : false), cssModule);
    return React__default.createElement(Tag, _extends({}, attributes, {
      className: classes
    }));
  };

  FormGroup.propTypes = propTypes$P;
  FormGroup.defaultProps = defaultProps$M;

  var propTypes$Q = {
    children: propTypes.node,
    inline: propTypes.bool,
    tag: propTypes.oneOfType([propTypes.func, propTypes.string]),
    color: propTypes.string,
    className: propTypes.string,
    cssModule: propTypes.object
  };
  var defaultProps$N = {
    tag: 'small',
    color: 'muted'
  };

  var FormText = function FormText(props) {
    var className = props.className,
        cssModule = props.cssModule,
        inline = props.inline,
        color = props.color,
        Tag = props.tag,
        attributes = _objectWithoutPropertiesLoose(props, ["className", "cssModule", "inline", "color", "tag"]);

    var classes = mapToCssModules(classnames(className, !inline ? 'form-text' : false, color ? "text-" + color : false), cssModule);
    return React__default.createElement(Tag, _extends({}, attributes, {
      className: classes
    }));
  };

  FormText.propTypes = propTypes$Q;
  FormText.defaultProps = defaultProps$N;

  var propTypes$R = {
    children: propTypes.node,
    type: propTypes.string,
    size: propTypes.string,
    bsSize: propTypes.string,
    state: deprecated(propTypes.string, 'Please use the props "valid" and "invalid" to indicate the state.'),
    valid: propTypes.bool,
    invalid: propTypes.bool,
    tag: propTypes.oneOfType([propTypes.func, propTypes.string]),
    innerRef: propTypes.oneOfType([propTypes.object, propTypes.func, propTypes.string]),
    static: deprecated(propTypes.bool, 'Please use the prop "plaintext"'),
    plaintext: propTypes.bool,
    addon: propTypes.bool,
    className: propTypes.string,
    cssModule: propTypes.object
  };
  var defaultProps$O = {
    type: 'text'
  };

  var Input =
  /*#__PURE__*/
  function (_React$Component) {
    _inheritsLoose(Input, _React$Component);

    function Input(props) {
      var _this;

      _this = _React$Component.call(this, props) || this;
      _this.getRef = _this.getRef.bind(_assertThisInitialized(_assertThisInitialized(_this)));
      _this.focus = _this.focus.bind(_assertThisInitialized(_assertThisInitialized(_this)));
      return _this;
    }

    var _proto = Input.prototype;

    _proto.getRef = function getRef(ref) {
      if (this.props.innerRef) {
        this.props.innerRef(ref);
      }

      this.ref = ref;
    };

    _proto.focus = function focus() {
      if (this.ref) {
        this.ref.focus();
      }
    };

    _proto.render = function render() {
      var _this$props = this.props,
          className = _this$props.className,
          cssModule = _this$props.cssModule,
          type = _this$props.type,
          bsSize = _this$props.bsSize,
          state = _this$props.state,
          valid = _this$props.valid,
          invalid = _this$props.invalid,
          tag = _this$props.tag,
          addon = _this$props.addon,
          staticInput = _this$props.static,
          plaintext = _this$props.plaintext,
          innerRef = _this$props.innerRef,
          attributes = _objectWithoutPropertiesLoose(_this$props, ["className", "cssModule", "type", "bsSize", "state", "valid", "invalid", "tag", "addon", "static", "plaintext", "innerRef"]);

      var checkInput = ['radio', 'checkbox'].indexOf(type) > -1;
      var isNotaNumber = new RegExp('\\D', 'g');
      var fileInput = type === 'file';
      var textareaInput = type === 'textarea';
      var selectInput = type === 'select';
      var Tag = tag || (selectInput || textareaInput ? type : 'input');
      var formControlClass = 'form-control';

      if (plaintext || staticInput) {
        formControlClass = formControlClass + "-plaintext";
        Tag = tag || 'input';
      } else if (fileInput) {
        formControlClass = formControlClass + "-file";
      } else if (checkInput) {
        if (addon) {
          formControlClass = null;
        } else {
          formControlClass = 'form-check-input';
        }
      }

      if (state && typeof valid === 'undefined' && typeof invalid === 'undefined') {
        if (state === 'danger') {
          invalid = true;
        } else if (state === 'success') {
          valid = true;
        }
      }

      if (attributes.size && isNotaNumber.test(attributes.size)) {
        warnOnce('Please use the prop "bsSize" instead of the "size" to bootstrap\'s input sizing.');
        bsSize = attributes.size;
        delete attributes.size;
      }

      var classes = mapToCssModules(classnames(className, invalid && 'is-invalid', valid && 'is-valid', bsSize ? "form-control-" + bsSize : false, formControlClass), cssModule);

      if (Tag === 'input' || tag && typeof tag === 'function') {
        attributes.type = type;
      }

      if (attributes.children && !(plaintext || staticInput || type === 'select' || typeof Tag !== 'string' || Tag === 'select')) {
        warnOnce("Input with a type of \"" + type + "\" cannot have children. Please use \"value\"/\"defaultValue\" instead.");
        delete attributes.children;
      }

      return React__default.createElement(Tag, _extends({}, attributes, {
        ref: innerRef,
        className: classes
      }));
    };

    return Input;
  }(React__default.Component);

  Input.propTypes = propTypes$R;
  Input.defaultProps = defaultProps$O;

  var propTypes$S = {
    tag: propTypes.oneOfType([propTypes.func, propTypes.string]),
    size: propTypes.string,
    className: propTypes.string,
    cssModule: propTypes.object
  };
  var defaultProps$P = {
    tag: 'div'
  };

  var InputGroup = function InputGroup(props) {
    var className = props.className,
        cssModule = props.cssModule,
        Tag = props.tag,
        size = props.size,
        attributes = _objectWithoutPropertiesLoose(props, ["className", "cssModule", "tag", "size"]);

    var classes = mapToCssModules(classnames(className, 'input-group', size ? "input-group-" + size : null), cssModule);
    return React__default.createElement(Tag, _extends({}, attributes, {
      className: classes
    }));
  };

  InputGroup.propTypes = propTypes$S;
  InputGroup.defaultProps = defaultProps$P;

  var propTypes$T = {
    tag: propTypes.oneOfType([propTypes.func, propTypes.string]),
    className: propTypes.string,
    cssModule: propTypes.object
  };
  var defaultProps$Q = {
    tag: 'span'
  };

  var InputGroupText = function InputGroupText(props) {
    var className = props.className,
        cssModule = props.cssModule,
        Tag = props.tag,
        attributes = _objectWithoutPropertiesLoose(props, ["className", "cssModule", "tag"]);

    var classes = mapToCssModules(classnames(className, 'input-group-text'), cssModule);
    return React__default.createElement(Tag, _extends({}, attributes, {
      className: classes
    }));
  };

  InputGroupText.propTypes = propTypes$T;
  InputGroupText.defaultProps = defaultProps$Q;

  var propTypes$U = {
    tag: propTypes.oneOfType([propTypes.func, propTypes.string]),
    addonType: propTypes.oneOf(['prepend', 'append']).isRequired,
    children: propTypes.node,
    className: propTypes.string,
    cssModule: propTypes.object
  };
  var defaultProps$R = {
    tag: 'div'
  };

  var InputGroupAddon = function InputGroupAddon(props) {
    var className = props.className,
        cssModule = props.cssModule,
        Tag = props.tag,
        addonType = props.addonType,
        children = props.children,
        attributes = _objectWithoutPropertiesLoose(props, ["className", "cssModule", "tag", "addonType", "children"]);

    var classes = mapToCssModules(classnames(className, 'input-group-' + addonType), cssModule); // Convenience to assist with transition

    if (typeof children === 'string') {
      return React__default.createElement(Tag, _extends({}, attributes, {
        className: classes
      }), React__default.createElement(InputGroupText, {
        children: children
      }));
    }

    return React__default.createElement(Tag, _extends({}, attributes, {
      className: classes,
      children: children
    }));
  };

  InputGroupAddon.propTypes = propTypes$U;
  InputGroupAddon.defaultProps = defaultProps$R;

  var propTypes$V = {
    tag: propTypes.oneOfType([propTypes.func, propTypes.string]),
    addonType: propTypes.oneOf(['prepend', 'append']).isRequired,
    children: propTypes.node,
    groupClassName: propTypes.string,
    groupAttributes: propTypes.object,
    className: propTypes.string,
    cssModule: propTypes.object
  };

  var InputGroupButton = function InputGroupButton(props) {
    warnOnce('The "InputGroupButton" component has been deprecated.\nPlease use component "InputGroupAddon".');

    var children = props.children,
        groupClassName = props.groupClassName,
        groupAttributes = props.groupAttributes,
        propsWithoutGroup = _objectWithoutPropertiesLoose(props, ["children", "groupClassName", "groupAttributes"]);

    if (typeof children === 'string') {
      var cssModule = propsWithoutGroup.cssModule,
          tag = propsWithoutGroup.tag,
          addonType = propsWithoutGroup.addonType,
          attributes = _objectWithoutPropertiesLoose(propsWithoutGroup, ["cssModule", "tag", "addonType"]);

      var allGroupAttributes = _extends({}, groupAttributes, {
        cssModule: cssModule,
        tag: tag,
        addonType: addonType
      });

      return React__default.createElement(InputGroupAddon, _extends({}, allGroupAttributes, {
        className: groupClassName
      }), React__default.createElement(Button, _extends({}, attributes, {
        children: children
      })));
    }

    return React__default.createElement(InputGroupAddon, _extends({}, props, {
      children: children
    }));
  };

  InputGroupButton.propTypes = propTypes$V;

  var propTypes$W = {
    addonType: propTypes.oneOf(['prepend', 'append']).isRequired,
    children: propTypes.node
  };

  var InputGroupButtonDropdown = function InputGroupButtonDropdown(props) {
    return React__default.createElement(Dropdown, props);
  };

  InputGroupButtonDropdown.propTypes = propTypes$W;

  var colWidths$1 = ['xs', 'sm', 'md', 'lg', 'xl'];
  var stringOrNumberProp$1 = propTypes.oneOfType([propTypes.number, propTypes.string]);
  var columnProps$1 = propTypes.oneOfType([propTypes.string, propTypes.number, propTypes.shape({
    size: stringOrNumberProp$1,
    push: deprecated(stringOrNumberProp$1, 'Please use the prop "order"'),
    pull: deprecated(stringOrNumberProp$1, 'Please use the prop "order"'),
    order: stringOrNumberProp$1,
    offset: stringOrNumberProp$1
  })]);
  var propTypes$X = {
    children: propTypes.node,
    hidden: propTypes.bool,
    check: propTypes.bool,
    size: propTypes.string,
    for: propTypes.string,
    tag: propTypes.string,
    className: propTypes.string,
    cssModule: propTypes.object,
    xs: columnProps$1,
    sm: columnProps$1,
    md: columnProps$1,
    lg: columnProps$1,
    xl: columnProps$1,
    widths: propTypes.array
  };
  var defaultProps$S = {
    tag: 'label',
    widths: colWidths$1
  };

  var getColumnSizeClass$1 = function getColumnSizeClass(isXs, colWidth, colSize) {
    if (colSize === true || colSize === '') {
      return isXs ? 'col' : "col-" + colWidth;
    } else if (colSize === 'auto') {
      return isXs ? 'col-auto' : "col-" + colWidth + "-auto";
    }

    return isXs ? "col-" + colSize : "col-" + colWidth + "-" + colSize;
  };

  var Label = function Label(props) {
    var className = props.className,
        cssModule = props.cssModule,
        hidden = props.hidden,
        widths = props.widths,
        Tag = props.tag,
        check = props.check,
        size = props.size,
        htmlFor = props.for,
        attributes = _objectWithoutPropertiesLoose(props, ["className", "cssModule", "hidden", "widths", "tag", "check", "size", "for"]);

    var colClasses = [];
    widths.forEach(function (colWidth, i) {
      var columnProp = props[colWidth];
      delete attributes[colWidth];

      if (!columnProp && columnProp !== '') {
        return;
      }

      var isXs = !i;
      var colClass;

      if (lodash_isobject(columnProp)) {
        var _classNames;

        var colSizeInterfix = isXs ? '-' : "-" + colWidth + "-";
        colClass = getColumnSizeClass$1(isXs, colWidth, columnProp.size);
        colClasses.push(mapToCssModules(classnames((_classNames = {}, _classNames[colClass] = columnProp.size || columnProp.size === '', _classNames["order" + colSizeInterfix + columnProp.order] = columnProp.order || columnProp.order === 0, _classNames["offset" + colSizeInterfix + columnProp.offset] = columnProp.offset || columnProp.offset === 0, _classNames))), cssModule);
      } else {
        colClass = getColumnSizeClass$1(isXs, colWidth, columnProp);
        colClasses.push(colClass);
      }
    });
    var classes = mapToCssModules(classnames(className, hidden ? 'sr-only' : false, check ? 'form-check-label' : false, size ? "col-form-label-" + size : false, colClasses, colClasses.length ? 'col-form-label' : false), cssModule);
    return React__default.createElement(Tag, _extends({
      htmlFor: htmlFor
    }, attributes, {
      className: classes
    }));
  };

  Label.propTypes = propTypes$X;
  Label.defaultProps = defaultProps$S;

  var propTypes$Y = {
    body: propTypes.bool,
    bottom: propTypes.bool,
    children: propTypes.node,
    className: propTypes.string,
    cssModule: propTypes.object,
    heading: propTypes.bool,
    left: propTypes.bool,
    list: propTypes.bool,
    middle: propTypes.bool,
    object: propTypes.bool,
    right: propTypes.bool,
    tag: propTypes.oneOfType([propTypes.func, propTypes.string]),
    top: propTypes.bool
  };

  var Media = function Media(props) {
    var body = props.body,
        bottom = props.bottom,
        className = props.className,
        cssModule = props.cssModule,
        heading = props.heading,
        left = props.left,
        list = props.list,
        middle = props.middle,
        object = props.object,
        right = props.right,
        tag = props.tag,
        top = props.top,
        attributes = _objectWithoutPropertiesLoose(props, ["body", "bottom", "className", "cssModule", "heading", "left", "list", "middle", "object", "right", "tag", "top"]);

    var defaultTag;

    if (heading) {
      defaultTag = 'h4';
    } else if (attributes.href) {
      defaultTag = 'a';
    } else if (attributes.src || object) {
      defaultTag = 'img';
    } else if (list) {
      defaultTag = 'ul';
    } else {
      defaultTag = 'div';
    }

    var Tag = tag || defaultTag;
    var classes = mapToCssModules(classnames(className, {
      'media-body': body,
      'media-heading': heading,
      'media-left': left,
      'media-right': right,
      'media-top': top,
      'media-bottom': bottom,
      'media-middle': middle,
      'media-object': object,
      'media-list': list,
      media: !body && !heading && !left && !right && !top && !bottom && !middle && !object && !list
    }), cssModule);
    return React__default.createElement(Tag, _extends({}, attributes, {
      className: classes
    }));
  };

  Media.propTypes = propTypes$Y;

  var propTypes$Z = {
    children: propTypes.node,
    className: propTypes.string,
    listClassName: propTypes.string,
    cssModule: propTypes.object,
    size: propTypes.string,
    tag: propTypes.oneOfType([propTypes.func, propTypes.string]),
    listTag: propTypes.oneOfType([propTypes.func, propTypes.string]),
    'aria-label': propTypes.string
  };
  var defaultProps$T = {
    tag: 'nav',
    listTag: 'ul',
    'aria-label': 'pagination'
  };

  var Pagination = function Pagination(props) {
    var _classNames;

    var className = props.className,
        listClassName = props.listClassName,
        cssModule = props.cssModule,
        size = props.size,
        Tag = props.tag,
        ListTag = props.listTag,
        label = props['aria-label'],
        attributes = _objectWithoutPropertiesLoose(props, ["className", "listClassName", "cssModule", "size", "tag", "listTag", "aria-label"]);

    var classes = mapToCssModules(classnames(className), cssModule);
    var listClasses = mapToCssModules(classnames(listClassName, 'pagination', (_classNames = {}, _classNames["pagination-" + size] = !!size, _classNames)), cssModule);
    return React__default.createElement(Tag, {
      className: classes,
      "aria-label": label
    }, React__default.createElement(ListTag, _extends({}, attributes, {
      className: listClasses
    })));
  };

  Pagination.propTypes = propTypes$Z;
  Pagination.defaultProps = defaultProps$T;

  var propTypes$_ = {
    active: propTypes.bool,
    children: propTypes.node,
    className: propTypes.string,
    cssModule: propTypes.object,
    disabled: propTypes.bool,
    tag: propTypes.oneOfType([propTypes.func, propTypes.string])
  };
  var defaultProps$U = {
    tag: 'li'
  };

  var PaginationItem = function PaginationItem(props) {
    var active = props.active,
        className = props.className,
        cssModule = props.cssModule,
        disabled = props.disabled,
        Tag = props.tag,
        attributes = _objectWithoutPropertiesLoose(props, ["active", "className", "cssModule", "disabled", "tag"]);

    var classes = mapToCssModules(classnames(className, 'page-item', {
      active: active,
      disabled: disabled
    }), cssModule);
    return React__default.createElement(Tag, _extends({}, attributes, {
      className: classes
    }));
  };

  PaginationItem.propTypes = propTypes$_;
  PaginationItem.defaultProps = defaultProps$U;

  var propTypes$10 = {
    'aria-label': propTypes.string,
    children: propTypes.node,
    className: propTypes.string,
    cssModule: propTypes.object,
    next: propTypes.bool,
    previous: propTypes.bool,
    tag: propTypes.oneOfType([propTypes.func, propTypes.string])
  };
  var defaultProps$V = {
    tag: 'a'
  };

  var PaginationLink = function PaginationLink(props) {
    var className = props.className,
        cssModule = props.cssModule,
        next = props.next,
        previous = props.previous,
        Tag = props.tag,
        attributes = _objectWithoutPropertiesLoose(props, ["className", "cssModule", "next", "previous", "tag"]);

    var classes = mapToCssModules(classnames(className, 'page-link'), cssModule);
    var defaultAriaLabel;

    if (previous) {
      defaultAriaLabel = 'Previous';
    } else if (next) {
      defaultAriaLabel = 'Next';
    }

    var ariaLabel = props['aria-label'] || defaultAriaLabel;
    var defaultCaret;

    if (previous) {
      defaultCaret = "\xAB";
    } else if (next) {
      defaultCaret = "\xBB";
    }

    var children = props.children;

    if (children && Array.isArray(children) && children.length === 0) {
      children = null;
    }

    if (!attributes.href && Tag === 'a') {
      Tag = 'button';
    }

    if (previous || next) {
      children = [React__default.createElement("span", {
        "aria-hidden": "true",
        key: "caret"
      }, children || defaultCaret), React__default.createElement("span", {
        className: "sr-only",
        key: "sr"
      }, ariaLabel)];
    }

    return React__default.createElement(Tag, _extends({}, attributes, {
      className: classes,
      "aria-label": ariaLabel
    }), children);
  };

  PaginationLink.propTypes = propTypes$10;
  PaginationLink.defaultProps = defaultProps$V;

  var propTypes$11 = {
    tag: propTypes.oneOfType([propTypes.func, propTypes.string]),
    activeTab: propTypes.any,
    className: propTypes.string,
    cssModule: propTypes.object
  };
  var defaultProps$W = {
    tag: 'div'
  };
  var childContextTypes$2 = {
    activeTabId: propTypes.any
  };

  var TabContent =
  /*#__PURE__*/
  function (_Component) {
    _inheritsLoose(TabContent, _Component);

    TabContent.getDerivedStateFromProps = function getDerivedStateFromProps(nextProps, prevState) {
      if (prevState.activeTab !== nextProps.activeTab) {
        return {
          activeTab: nextProps.activeTab
        };
      }

      return null;
    };

    function TabContent(props) {
      var _this;

      _this = _Component.call(this, props) || this;
      _this.state = {
        activeTab: _this.props.activeTab
      };
      return _this;
    }

    var _proto = TabContent.prototype;

    _proto.getChildContext = function getChildContext() {
      return {
        activeTabId: this.state.activeTab
      };
    };

    _proto.render = function render() {
      var _this$props = this.props,
          className = _this$props.className,
          cssModule = _this$props.cssModule,
          Tag = _this$props.tag;
      var attributes = omit(this.props, Object.keys(propTypes$11));
      var classes = mapToCssModules(classnames('tab-content', className), cssModule);
      return React__default.createElement(Tag, _extends({}, attributes, {
        className: classes
      }));
    };

    return TabContent;
  }(React.Component);

  polyfill(TabContent);
  TabContent.propTypes = propTypes$11;
  TabContent.defaultProps = defaultProps$W;
  TabContent.childContextTypes = childContextTypes$2;

  var propTypes$12 = {
    tag: propTypes.oneOfType([propTypes.func, propTypes.string]),
    className: propTypes.string,
    cssModule: propTypes.object,
    tabId: propTypes.any
  };
  var defaultProps$X = {
    tag: 'div'
  };
  var contextTypes$3 = {
    activeTabId: propTypes.any
  };
  function TabPane(props, context) {
    var className = props.className,
        cssModule = props.cssModule,
        tabId = props.tabId,
        Tag = props.tag,
        attributes = _objectWithoutPropertiesLoose(props, ["className", "cssModule", "tabId", "tag"]);

    var classes = mapToCssModules(classnames('tab-pane', className, {
      active: tabId === context.activeTabId
    }), cssModule);
    return React__default.createElement(Tag, _extends({}, attributes, {
      className: classes
    }));
  }
  TabPane.propTypes = propTypes$12;
  TabPane.defaultProps = defaultProps$X;
  TabPane.contextTypes = contextTypes$3;

  var propTypes$13 = {
    tag: propTypes.oneOfType([propTypes.func, propTypes.string]),
    fluid: propTypes.bool,
    className: propTypes.string,
    cssModule: propTypes.object
  };
  var defaultProps$Y = {
    tag: 'div'
  };

  var Jumbotron = function Jumbotron(props) {
    var className = props.className,
        cssModule = props.cssModule,
        Tag = props.tag,
        fluid = props.fluid,
        attributes = _objectWithoutPropertiesLoose(props, ["className", "cssModule", "tag", "fluid"]);

    var classes = mapToCssModules(classnames(className, 'jumbotron', fluid ? 'jumbotron-fluid' : false), cssModule);
    return React__default.createElement(Tag, _extends({}, attributes, {
      className: classes
    }));
  };

  Jumbotron.propTypes = propTypes$13;
  Jumbotron.defaultProps = defaultProps$Y;

  var propTypes$14 = {
    children: propTypes.node,
    className: propTypes.string,
    closeClassName: propTypes.string,
    closeAriaLabel: propTypes.string,
    cssModule: propTypes.object,
    color: propTypes.string,
    fade: propTypes.bool,
    isOpen: propTypes.bool,
    toggle: propTypes.func,
    tag: propTypes.oneOfType([propTypes.func, propTypes.string]),
    transition: propTypes.shape(Fade.propTypes),
    innerRef: propTypes.oneOfType([propTypes.object, propTypes.string, propTypes.func])
  };
  var defaultProps$Z = {
    color: 'success',
    isOpen: true,
    tag: 'div',
    closeAriaLabel: 'Close',
    fade: true,
    transition: _extends({}, Fade.defaultProps, {
      unmountOnExit: true
    })
  };

  function Alert(props) {
    var className = props.className,
        closeClassName = props.closeClassName,
        closeAriaLabel = props.closeAriaLabel,
        cssModule = props.cssModule,
        Tag = props.tag,
        color = props.color,
        isOpen = props.isOpen,
        toggle = props.toggle,
        children = props.children,
        transition = props.transition,
        fade = props.fade,
        innerRef = props.innerRef,
        attributes = _objectWithoutPropertiesLoose(props, ["className", "closeClassName", "closeAriaLabel", "cssModule", "tag", "color", "isOpen", "toggle", "children", "transition", "fade", "innerRef"]);

    var classes = mapToCssModules(classnames(className, 'alert', "alert-" + color, {
      'alert-dismissible': toggle
    }), cssModule);
    var closeClasses = mapToCssModules(classnames('close', closeClassName), cssModule);

    var alertTransition = _extends({}, Fade.defaultProps, transition, {
      baseClass: fade ? transition.baseClass : '',
      timeout: fade ? transition.timeout : 0
    });

    return React__default.createElement(Fade, _extends({}, attributes, alertTransition, {
      tag: Tag,
      className: classes,
      in: isOpen,
      role: "alert",
      innerRef: innerRef
    }), toggle ? React__default.createElement("button", {
      type: "button",
      className: closeClasses,
      "aria-label": closeAriaLabel,
      onClick: toggle
    }, React__default.createElement("span", {
      "aria-hidden": "true"
    }, "\xD7")) : null, children);
  }

  Alert.propTypes = propTypes$14;
  Alert.defaultProps = defaultProps$Z;

  var _transitionStatusToCl;

  var propTypes$15 = _extends({}, reactTransitionGroup_1.propTypes, {
    isOpen: propTypes.bool,
    children: propTypes.oneOfType([propTypes.arrayOf(propTypes.node), propTypes.node]),
    tag: propTypes.oneOfType([propTypes.func, propTypes.string]),
    className: propTypes.node,
    navbar: propTypes.bool,
    cssModule: propTypes.object,
    innerRef: propTypes.oneOfType([propTypes.func, propTypes.string, propTypes.object])
  });

  var defaultProps$_ = _extends({}, reactTransitionGroup_1.defaultProps, {
    isOpen: false,
    appear: false,
    enter: true,
    exit: true,
    tag: 'div',
    timeout: TransitionTimeouts.Collapse
  });

  var transitionStatusToClassHash = (_transitionStatusToCl = {}, _transitionStatusToCl[TransitionStatuses.ENTERING] = 'collapsing', _transitionStatusToCl[TransitionStatuses.ENTERED] = 'collapse show', _transitionStatusToCl[TransitionStatuses.EXITING] = 'collapsing', _transitionStatusToCl[TransitionStatuses.EXITED] = 'collapse', _transitionStatusToCl);

  function getTransitionClass(status) {
    return transitionStatusToClassHash[status] || 'collapse';
  }

  function getHeight(node) {
    return node.scrollHeight;
  }

  var Collapse =
  /*#__PURE__*/
  function (_Component) {
    _inheritsLoose(Collapse, _Component);

    function Collapse(props) {
      var _this;

      _this = _Component.call(this, props) || this;
      _this.state = {
        height: null
      };
      ['onEntering', 'onEntered', 'onExit', 'onExiting', 'onExited'].forEach(function (name) {
        _this[name] = _this[name].bind(_assertThisInitialized(_assertThisInitialized(_this)));
      });
      return _this;
    }

    var _proto = Collapse.prototype;

    _proto.onEntering = function onEntering(node, isAppearing) {
      this.setState({
        height: getHeight(node)
      });
      this.props.onEntering(node, isAppearing);
    };

    _proto.onEntered = function onEntered(node, isAppearing) {
      this.setState({
        height: null
      });
      this.props.onEntered(node, isAppearing);
    };

    _proto.onExit = function onExit(node) {
      this.setState({
        height: getHeight(node)
      });
      this.props.onExit(node);
    };

    _proto.onExiting = function onExiting(node) {
      // getting this variable triggers a reflow
      var _unused = node.offsetHeight; // eslint-disable-line no-unused-vars

      this.setState({
        height: 0
      });
      this.props.onExiting(node);
    };

    _proto.onExited = function onExited(node) {
      this.setState({
        height: null
      });
      this.props.onExited(node);
    };

    _proto.render = function render() {
      var _this2 = this;

      var _this$props = this.props,
          Tag = _this$props.tag,
          isOpen = _this$props.isOpen,
          className = _this$props.className,
          navbar = _this$props.navbar,
          cssModule = _this$props.cssModule,
          children = _this$props.children,
          innerRef = _this$props.innerRef,
          otherProps = _objectWithoutPropertiesLoose(_this$props, ["tag", "isOpen", "className", "navbar", "cssModule", "children", "innerRef"]);

      var height = this.state.height;
      var transitionProps = pick(otherProps, TransitionPropTypeKeys);
      var childProps = omit(otherProps, TransitionPropTypeKeys);
      return React__default.createElement(reactTransitionGroup_1, _extends({}, transitionProps, {
        in: isOpen,
        onEntering: this.onEntering,
        onEntered: this.onEntered,
        onExit: this.onExit,
        onExiting: this.onExiting,
        onExited: this.onExited
      }), function (status) {
        var collapseClass = getTransitionClass(status);
        var classes = mapToCssModules(classnames(className, collapseClass, navbar && 'navbar-collapse'), cssModule);
        var style = height === null ? null : {
          height: height
        };
        return React__default.createElement(Tag, _extends({}, childProps, {
          style: _extends({}, childProps.style, style),
          className: classes,
          ref: _this2.props.innerRef
        }), children);
      });
    };

    return Collapse;
  }(React.Component);

  Collapse.propTypes = propTypes$15;
  Collapse.defaultProps = defaultProps$_;

  var propTypes$16 = {
    tag: propTypes.oneOfType([propTypes.func, propTypes.string]),
    active: propTypes.bool,
    disabled: propTypes.bool,
    color: propTypes.string,
    action: propTypes.bool,
    className: propTypes.any,
    cssModule: propTypes.object
  };
  var defaultProps$10 = {
    tag: 'li'
  };

  var handleDisabledOnClick = function handleDisabledOnClick(e) {
    e.preventDefault();
  };

  var ListGroupItem = function ListGroupItem(props) {
    var className = props.className,
        cssModule = props.cssModule,
        Tag = props.tag,
        active = props.active,
        disabled = props.disabled,
        action = props.action,
        color = props.color,
        attributes = _objectWithoutPropertiesLoose(props, ["className", "cssModule", "tag", "active", "disabled", "action", "color"]);

    var classes = mapToCssModules(classnames(className, active ? 'active' : false, disabled ? 'disabled' : false, action ? 'list-group-item-action' : false, color ? "list-group-item-" + color : false, 'list-group-item'), cssModule); // Prevent click event when disabled.

    if (disabled) {
      attributes.onClick = handleDisabledOnClick;
    }

    return React__default.createElement(Tag, _extends({}, attributes, {
      className: classes
    }));
  };

  ListGroupItem.propTypes = propTypes$16;
  ListGroupItem.defaultProps = defaultProps$10;

  var propTypes$17 = {
    tag: propTypes.oneOfType([propTypes.func, propTypes.string]),
    className: propTypes.any,
    cssModule: propTypes.object
  };
  var defaultProps$11 = {
    tag: 'h5'
  };

  var ListGroupItemHeading = function ListGroupItemHeading(props) {
    var className = props.className,
        cssModule = props.cssModule,
        Tag = props.tag,
        attributes = _objectWithoutPropertiesLoose(props, ["className", "cssModule", "tag"]);

    var classes = mapToCssModules(classnames(className, 'list-group-item-heading'), cssModule);
    return React__default.createElement(Tag, _extends({}, attributes, {
      className: classes
    }));
  };

  ListGroupItemHeading.propTypes = propTypes$17;
  ListGroupItemHeading.defaultProps = defaultProps$11;

  var propTypes$18 = {
    tag: propTypes.oneOfType([propTypes.func, propTypes.string]),
    className: propTypes.any,
    cssModule: propTypes.object
  };
  var defaultProps$12 = {
    tag: 'p'
  };

  var ListGroupItemText = function ListGroupItemText(props) {
    var className = props.className,
        cssModule = props.cssModule,
        Tag = props.tag,
        attributes = _objectWithoutPropertiesLoose(props, ["className", "cssModule", "tag"]);

    var classes = mapToCssModules(classnames(className, 'list-group-item-text'), cssModule);
    return React__default.createElement(Tag, _extends({}, attributes, {
      className: classes
    }));
  };

  ListGroupItemText.propTypes = propTypes$18;
  ListGroupItemText.defaultProps = defaultProps$12;

  var UncontrolledAlert =
  /*#__PURE__*/
  function (_Component) {
    _inheritsLoose(UncontrolledAlert, _Component);

    function UncontrolledAlert(props) {
      var _this;

      _this = _Component.call(this, props) || this;
      _this.state = {
        isOpen: true
      };
      _this.toggle = _this.toggle.bind(_assertThisInitialized(_assertThisInitialized(_this)));
      return _this;
    }

    var _proto = UncontrolledAlert.prototype;

    _proto.toggle = function toggle() {
      this.setState({
        isOpen: !this.state.isOpen
      });
    };

    _proto.render = function render() {
      return React__default.createElement(Alert, _extends({
        isOpen: this.state.isOpen,
        toggle: this.toggle
      }, this.props));
    };

    return UncontrolledAlert;
  }(React.Component);

  var omitKeys$1 = ['defaultOpen'];

  var UncontrolledButtonDropdown =
  /*#__PURE__*/
  function (_Component) {
    _inheritsLoose(UncontrolledButtonDropdown, _Component);

    function UncontrolledButtonDropdown(props) {
      var _this;

      _this = _Component.call(this, props) || this;
      _this.state = {
        isOpen: props.defaultOpen || false
      };
      _this.toggle = _this.toggle.bind(_assertThisInitialized(_assertThisInitialized(_this)));
      return _this;
    }

    var _proto = UncontrolledButtonDropdown.prototype;

    _proto.toggle = function toggle() {
      this.setState({
        isOpen: !this.state.isOpen
      });
    };

    _proto.render = function render() {
      return React__default.createElement(ButtonDropdown, _extends({
        isOpen: this.state.isOpen,
        toggle: this.toggle
      }, omit(this.props, omitKeys$1)));
    };

    return UncontrolledButtonDropdown;
  }(React.Component);
  UncontrolledButtonDropdown.propTypes = _extends({
    defaultOpen: propTypes.bool
  }, ButtonDropdown.propTypes);

  var omitKeys$2 = ['toggleEvents', 'defaultOpen'];
  var propTypes$19 = {
    defaultOpen: propTypes.bool,
    toggler: propTypes.string.isRequired,
    toggleEvents: propTypes.arrayOf(propTypes.string)
  };
  var defaultProps$13 = {
    toggleEvents: defaultToggleEvents
  };

  var UncontrolledCollapse =
  /*#__PURE__*/
  function (_Component) {
    _inheritsLoose(UncontrolledCollapse, _Component);

    function UncontrolledCollapse(props) {
      var _this;

      _this = _Component.call(this, props) || this;
      _this.togglers = null;
      _this.removeEventListeners = null;
      _this.toggle = _this.toggle.bind(_assertThisInitialized(_assertThisInitialized(_this)));
      _this.state = {
        isOpen: props.defaultOpen || false
      };
      return _this;
    }

    var _proto = UncontrolledCollapse.prototype;

    _proto.componentDidMount = function componentDidMount() {
      this.togglers = findDOMElements(this.props.toggler);

      if (this.togglers.length) {
        this.removeEventListeners = addMultipleEventListeners(this.togglers, this.toggle, this.props.toggleEvents);
      }
    };

    _proto.componentWillUnmount = function componentWillUnmount() {
      if (this.togglers.length && this.removeEventListeners) {
        this.removeEventListeners();
      }
    };

    _proto.toggle = function toggle(e) {
      this.setState(function (_ref) {
        var isOpen = _ref.isOpen;
        return {
          isOpen: !isOpen
        };
      });
      e.preventDefault();
    };

    _proto.render = function render() {
      return React__default.createElement(Collapse, _extends({
        isOpen: this.state.isOpen
      }, omit(this.props, omitKeys$2)));
    };

    return UncontrolledCollapse;
  }(React.Component);

  UncontrolledCollapse.propTypes = propTypes$19;
  UncontrolledCollapse.defaultProps = defaultProps$13;

  var omitKeys$3 = ['defaultOpen'];

  var UncontrolledDropdown =
  /*#__PURE__*/
  function (_Component) {
    _inheritsLoose(UncontrolledDropdown, _Component);

    function UncontrolledDropdown(props) {
      var _this;

      _this = _Component.call(this, props) || this;
      _this.state = {
        isOpen: props.defaultOpen || false
      };
      _this.toggle = _this.toggle.bind(_assertThisInitialized(_assertThisInitialized(_this)));
      return _this;
    }

    var _proto = UncontrolledDropdown.prototype;

    _proto.toggle = function toggle() {
      this.setState({
        isOpen: !this.state.isOpen
      });
    };

    _proto.render = function render() {
      return React__default.createElement(Dropdown, _extends({
        isOpen: this.state.isOpen,
        toggle: this.toggle
      }, omit(this.props, omitKeys$3)));
    };

    return UncontrolledDropdown;
  }(React.Component);
  UncontrolledDropdown.propTypes = _extends({
    defaultOpen: propTypes.bool
  }, Dropdown.propTypes);

  var UncontrolledNavDropdown = function UncontrolledNavDropdown(props) {
    warnOnce('The "UncontrolledNavDropdown" component has been deprecated.\nPlease use component "UncontrolledDropdown" with nav prop.');
    return React__default.createElement(UncontrolledDropdown, _extends({
      nav: true
    }, props));
  };

  var omitKeys$4 = ['defaultOpen'];

  var UncontrolledTooltip =
  /*#__PURE__*/
  function (_Component) {
    _inheritsLoose(UncontrolledTooltip, _Component);

    function UncontrolledTooltip(props) {
      var _this;

      _this = _Component.call(this, props) || this;
      _this.state = {
        isOpen: props.defaultOpen || false
      };
      _this.toggle = _this.toggle.bind(_assertThisInitialized(_assertThisInitialized(_this)));
      return _this;
    }

    var _proto = UncontrolledTooltip.prototype;

    _proto.toggle = function toggle() {
      this.setState({
        isOpen: !this.state.isOpen
      });
    };

    _proto.render = function render() {
      return React__default.createElement(Tooltip, _extends({
        isOpen: this.state.isOpen,
        toggle: this.toggle
      }, omit(this.props, omitKeys$4)));
    };

    return UncontrolledTooltip;
  }(React.Component);
  UncontrolledTooltip.propTypes = _extends({
    defaultOpen: propTypes.bool
  }, Tooltip.propTypes);

  exports.Container = Container;
  exports.Row = Row;
  exports.Col = Col;
  exports.Navbar = Navbar;
  exports.NavbarBrand = NavbarBrand;
  exports.NavbarToggler = NavbarToggler;
  exports.Nav = Nav;
  exports.NavItem = NavItem;
  exports.NavDropdown = NavDropdown;
  exports.NavLink = NavLink;
  exports.Breadcrumb = Breadcrumb;
  exports.BreadcrumbItem = BreadcrumbItem;
  exports.Button = Button;
  exports.ButtonDropdown = ButtonDropdown;
  exports.ButtonGroup = ButtonGroup;
  exports.ButtonToolbar = ButtonToolbar;
  exports.Dropdown = Dropdown;
  exports.DropdownItem = DropdownItem;
  exports.DropdownMenu = DropdownMenu;
  exports.DropdownToggle = DropdownToggle;
  exports.Fade = Fade;
  exports.Badge = Badge;
  exports.Card = Card;
  exports.CardGroup = CardGroup;
  exports.CardDeck = CardDeck;
  exports.CardColumns = CardColumns;
  exports.CardBody = CardBody;
  exports.CardBlock = CardBlock;
  exports.CardLink = CardLink;
  exports.CardFooter = CardFooter;
  exports.CardHeader = CardHeader;
  exports.CardImg = CardImg;
  exports.CardImgOverlay = CardImgOverlay;
  exports.Carousel = Carousel;
  exports.UncontrolledCarousel = UncontrolledCarousel;
  exports.CarouselControl = CarouselControl;
  exports.CarouselItem = CarouselItem;
  exports.CarouselIndicators = CarouselIndicators;
  exports.CarouselCaption = CarouselCaption;
  exports.CardSubtitle = CardSubtitle;
  exports.CardText = CardText;
  exports.CardTitle = CardTitle;
  exports.CustomInput = CustomInput;
  exports.PopperContent = PopperContent;
  exports.PopperTargetHelper = PopperTargetHelper;
  exports.Popover = Popover;
  exports.UncontrolledPopover = UncontrolledPopover;
  exports.PopoverHeader = PopoverHeader;
  exports.PopoverTitle = PopoverTitle;
  exports.PopoverBody = PopoverBody;
  exports.PopoverContent = PopoverContent;
  exports.Progress = Progress;
  exports.Modal = Modal;
  exports.ModalHeader = ModalHeader;
  exports.ModalBody = ModalBody;
  exports.ModalFooter = ModalFooter;
  exports.Tooltip = Tooltip;
  exports.Table = Table;
  exports.ListGroup = ListGroup;
  exports.Form = Form;
  exports.FormFeedback = FormFeedback;
  exports.FormGroup = FormGroup;
  exports.FormText = FormText;
  exports.Input = Input;
  exports.InputGroup = InputGroup;
  exports.InputGroupAddon = InputGroupAddon;
  exports.InputGroupButton = InputGroupButton;
  exports.InputGroupButtonDropdown = InputGroupButtonDropdown;
  exports.InputGroupText = InputGroupText;
  exports.Label = Label;
  exports.Media = Media;
  exports.Pagination = Pagination;
  exports.PaginationItem = PaginationItem;
  exports.PaginationLink = PaginationLink;
  exports.TabContent = TabContent;
  exports.TabPane = TabPane;
  exports.Jumbotron = Jumbotron;
  exports.Alert = Alert;
  exports.Collapse = Collapse;
  exports.ListGroupItem = ListGroupItem;
  exports.ListGroupItemHeading = ListGroupItemHeading;
  exports.ListGroupItemText = ListGroupItemText;
  exports.UncontrolledAlert = UncontrolledAlert;
  exports.UncontrolledButtonDropdown = UncontrolledButtonDropdown;
  exports.UncontrolledCollapse = UncontrolledCollapse;
  exports.UncontrolledDropdown = UncontrolledDropdown;
  exports.UncontrolledNavDropdown = UncontrolledNavDropdown;
  exports.UncontrolledTooltip = UncontrolledTooltip;
  exports.Util = utils;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=reactstrap.full.js.map
