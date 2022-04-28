(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('react'), require('react-dom'), require('@popperjs/core')) :
  typeof define === 'function' && define.amd ? define(['exports', 'react', 'react-dom', '@popperjs/core'], factory) :
  (global = global || self, factory(global.ReactPopper = {}, global.React, global.ReactDOM, global.Popper));
}(this, (function (exports, React, ReactDOM, core) { 'use strict';

  var ManagerReferenceNodeContext = React.createContext();
  var ManagerReferenceNodeSetterContext = React.createContext();
  function Manager(_ref) {
    var children = _ref.children;

    var _React$useState = React.useState(null),
        referenceNode = _React$useState[0],
        setReferenceNode = _React$useState[1];

    var hasUnmounted = React.useRef(false);
    React.useEffect(function () {
      return function () {
        hasUnmounted.current = true;
      };
    }, []);
    var handleSetReferenceNode = React.useCallback(function (node) {
      if (!hasUnmounted.current) {
        setReferenceNode(node);
      }
    }, []);
    return /*#__PURE__*/React.createElement(ManagerReferenceNodeContext.Provider, {
      value: referenceNode
    }, /*#__PURE__*/React.createElement(ManagerReferenceNodeSetterContext.Provider, {
      value: handleSetReferenceNode
    }, children));
  }

  /**
   * Takes an argument and if it's an array, returns the first item in the array,
   * otherwise returns the argument. Used for Preact compatibility.
   */
  var unwrapArray = function unwrapArray(arg) {
    return Array.isArray(arg) ? arg[0] : arg;
  };
  /**
   * Takes a maybe-undefined function and arbitrary args and invokes the function
   * only if it is defined.
   */

  var safeInvoke = function safeInvoke(fn) {
    if (typeof fn === 'function') {
      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      return fn.apply(void 0, args);
    }
  };
  /**
   * Sets a ref using either a ref callback or a ref object
   */

  var setRef = function setRef(ref, node) {
    // if its a function call it
    if (typeof ref === 'function') {
      return safeInvoke(ref, node);
    } // otherwise we should treat it as a ref object
    else if (ref != null) {
        ref.current = node;
      }
  };
  /**
   * Simple ponyfill for Object.fromEntries
   */

  var fromEntries = function fromEntries(entries) {
    return entries.reduce(function (acc, _ref) {
      var key = _ref[0],
          value = _ref[1];
      acc[key] = value;
      return acc;
    }, {});
  };
  /**
   * Small wrapper around `useLayoutEffect` to get rid of the warning on SSR envs
   */

  var useIsomorphicLayoutEffect = typeof window !== 'undefined' && window.document && window.document.createElement ? React.useLayoutEffect : React.useEffect;

  /* global Map:readonly, Set:readonly, ArrayBuffer:readonly */

  var hasElementType = typeof Element !== 'undefined';
  var hasMap = typeof Map === 'function';
  var hasSet = typeof Set === 'function';
  var hasArrayBuffer = typeof ArrayBuffer === 'function';

  // Note: We **don't** need `envHasBigInt64Array` in fde es6/index.js

  function equal(a, b) {
    // START: fast-deep-equal es6/index.js 3.1.1
    if (a === b) return true;

    if (a && b && typeof a == 'object' && typeof b == 'object') {
      if (a.constructor !== b.constructor) return false;

      var length, i, keys;
      if (Array.isArray(a)) {
        length = a.length;
        if (length != b.length) return false;
        for (i = length; i-- !== 0;)
          if (!equal(a[i], b[i])) return false;
        return true;
      }

      // START: Modifications:
      // 1. Extra `has<Type> &&` helpers in initial condition allow es6 code
      //    to co-exist with es5.
      // 2. Replace `for of` with es5 compliant iteration using `for`.
      //    Basically, take:
      //
      //    ```js
      //    for (i of a.entries())
      //      if (!b.has(i[0])) return false;
      //    ```
      //
      //    ... and convert to:
      //
      //    ```js
      //    it = a.entries();
      //    while (!(i = it.next()).done)
      //      if (!b.has(i.value[0])) return false;
      //    ```
      //
      //    **Note**: `i` access switches to `i.value`.
      var it;
      if (hasMap && (a instanceof Map) && (b instanceof Map)) {
        if (a.size !== b.size) return false;
        it = a.entries();
        while (!(i = it.next()).done)
          if (!b.has(i.value[0])) return false;
        it = a.entries();
        while (!(i = it.next()).done)
          if (!equal(i.value[1], b.get(i.value[0]))) return false;
        return true;
      }

      if (hasSet && (a instanceof Set) && (b instanceof Set)) {
        if (a.size !== b.size) return false;
        it = a.entries();
        while (!(i = it.next()).done)
          if (!b.has(i.value[0])) return false;
        return true;
      }
      // END: Modifications

      if (hasArrayBuffer && ArrayBuffer.isView(a) && ArrayBuffer.isView(b)) {
        length = a.length;
        if (length != b.length) return false;
        for (i = length; i-- !== 0;)
          if (a[i] !== b[i]) return false;
        return true;
      }

      if (a.constructor === RegExp) return a.source === b.source && a.flags === b.flags;
      if (a.valueOf !== Object.prototype.valueOf) return a.valueOf() === b.valueOf();
      if (a.toString !== Object.prototype.toString) return a.toString() === b.toString();

      keys = Object.keys(a);
      length = keys.length;
      if (length !== Object.keys(b).length) return false;

      for (i = length; i-- !== 0;)
        if (!Object.prototype.hasOwnProperty.call(b, keys[i])) return false;
      // END: fast-deep-equal

      // START: react-fast-compare
      // custom handling for DOM elements
      if (hasElementType && a instanceof Element) return false;

      // custom handling for React
      for (i = length; i-- !== 0;) {
        if (keys[i] === '_owner' && a.$$typeof) {
          // React-specific: avoid traversing React elements' _owner.
          //  _owner contains circular references
          // and is not needed when comparing the actual elements (and not their owners)
          // .$$typeof and ._store on just reasonable markers of a react element
          continue;
        }

        // all other properties should be traversed as usual
        if (!equal(a[keys[i]], b[keys[i]])) return false;
      }
      // END: react-fast-compare

      // START: fast-deep-equal
      return true;
    }

    return a !== a && b !== b;
  }
  // end fast-deep-equal

  var reactFastCompare = function isEqual(a, b) {
    try {
      return equal(a, b);
    } catch (error) {
      if (((error.message || '').match(/stack|recursion/i))) {
        // warn on circular references, don't crash
        // browsers give this different errors name and messages:
        // chrome/safari: "RangeError", "Maximum call stack size exceeded"
        // firefox: "InternalError", too much recursion"
        // edge: "Error", "Out of stack space"
        console.warn('react-fast-compare cannot handle circular refs');
        return false;
      }
      // some other error. we should definitely know about these
      throw error;
    }
  };

  var EMPTY_MODIFIERS = [];
  var usePopper = function usePopper(referenceElement, popperElement, options) {
    if (options === void 0) {
      options = {};
    }

    var prevOptions = React.useRef(null);
    var optionsWithDefaults = {
      onFirstUpdate: options.onFirstUpdate,
      placement: options.placement || 'bottom',
      strategy: options.strategy || 'absolute',
      modifiers: options.modifiers || EMPTY_MODIFIERS
    };

    var _React$useState = React.useState({
      styles: {
        popper: {
          position: optionsWithDefaults.strategy,
          left: '0',
          top: '0'
        },
        arrow: {
          position: 'absolute'
        }
      },
      attributes: {}
    }),
        state = _React$useState[0],
        setState = _React$useState[1];

    var updateStateModifier = React.useMemo(function () {
      return {
        name: 'updateState',
        enabled: true,
        phase: 'write',
        fn: function fn(_ref) {
          var state = _ref.state;
          var elements = Object.keys(state.elements);
          ReactDOM.flushSync(function () {
            setState({
              styles: fromEntries(elements.map(function (element) {
                return [element, state.styles[element] || {}];
              })),
              attributes: fromEntries(elements.map(function (element) {
                return [element, state.attributes[element]];
              }))
            });
          });
        },
        requires: ['computeStyles']
      };
    }, []);
    var popperOptions = React.useMemo(function () {
      var newOptions = {
        onFirstUpdate: optionsWithDefaults.onFirstUpdate,
        placement: optionsWithDefaults.placement,
        strategy: optionsWithDefaults.strategy,
        modifiers: [].concat(optionsWithDefaults.modifiers, [updateStateModifier, {
          name: 'applyStyles',
          enabled: false
        }])
      };

      if (reactFastCompare(prevOptions.current, newOptions)) {
        return prevOptions.current || newOptions;
      } else {
        prevOptions.current = newOptions;
        return newOptions;
      }
    }, [optionsWithDefaults.onFirstUpdate, optionsWithDefaults.placement, optionsWithDefaults.strategy, optionsWithDefaults.modifiers, updateStateModifier]);
    var popperInstanceRef = React.useRef();
    useIsomorphicLayoutEffect(function () {
      if (popperInstanceRef.current) {
        popperInstanceRef.current.setOptions(popperOptions);
      }
    }, [popperOptions]);
    useIsomorphicLayoutEffect(function () {
      if (referenceElement == null || popperElement == null) {
        return;
      }

      var createPopper = options.createPopper || core.createPopper;
      var popperInstance = createPopper(referenceElement, popperElement, popperOptions);
      popperInstanceRef.current = popperInstance;
      return function () {
        popperInstance.destroy();
        popperInstanceRef.current = null;
      };
    }, [referenceElement, popperElement, options.createPopper]);
    return {
      state: popperInstanceRef.current ? popperInstanceRef.current.state : null,
      styles: state.styles,
      attributes: state.attributes,
      update: popperInstanceRef.current ? popperInstanceRef.current.update : null,
      forceUpdate: popperInstanceRef.current ? popperInstanceRef.current.forceUpdate : null
    };
  };

  var NOOP = function NOOP() {
    return void 0;
  };

  var NOOP_PROMISE = function NOOP_PROMISE() {
    return Promise.resolve(null);
  };

  var EMPTY_MODIFIERS$1 = [];
  function Popper(_ref) {
    var _ref$placement = _ref.placement,
        placement = _ref$placement === void 0 ? 'bottom' : _ref$placement,
        _ref$strategy = _ref.strategy,
        strategy = _ref$strategy === void 0 ? 'absolute' : _ref$strategy,
        _ref$modifiers = _ref.modifiers,
        modifiers = _ref$modifiers === void 0 ? EMPTY_MODIFIERS$1 : _ref$modifiers,
        referenceElement = _ref.referenceElement,
        onFirstUpdate = _ref.onFirstUpdate,
        innerRef = _ref.innerRef,
        children = _ref.children;
    var referenceNode = React.useContext(ManagerReferenceNodeContext);

    var _React$useState = React.useState(null),
        popperElement = _React$useState[0],
        setPopperElement = _React$useState[1];

    var _React$useState2 = React.useState(null),
        arrowElement = _React$useState2[0],
        setArrowElement = _React$useState2[1];

    React.useEffect(function () {
      setRef(innerRef, popperElement);
    }, [innerRef, popperElement]);
    var options = React.useMemo(function () {
      return {
        placement: placement,
        strategy: strategy,
        onFirstUpdate: onFirstUpdate,
        modifiers: [].concat(modifiers, [{
          name: 'arrow',
          enabled: arrowElement != null,
          options: {
            element: arrowElement
          }
        }])
      };
    }, [placement, strategy, onFirstUpdate, modifiers, arrowElement]);

    var _usePopper = usePopper(referenceElement || referenceNode, popperElement, options),
        state = _usePopper.state,
        styles = _usePopper.styles,
        forceUpdate = _usePopper.forceUpdate,
        update = _usePopper.update;

    var childrenProps = React.useMemo(function () {
      return {
        ref: setPopperElement,
        style: styles.popper,
        placement: state ? state.placement : placement,
        hasPopperEscaped: state && state.modifiersData.hide ? state.modifiersData.hide.hasPopperEscaped : null,
        isReferenceHidden: state && state.modifiersData.hide ? state.modifiersData.hide.isReferenceHidden : null,
        arrowProps: {
          style: styles.arrow,
          ref: setArrowElement
        },
        forceUpdate: forceUpdate || NOOP,
        update: update || NOOP_PROMISE
      };
    }, [setPopperElement, setArrowElement, placement, state, styles, update, forceUpdate]);
    return unwrapArray(children)(childrenProps);
  }

  /**
   * Copyright (c) 2014-present, Facebook, Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */

  var warning = function() {};

  {
    var printWarning = function printWarning(format, args) {
      var len = arguments.length;
      args = new Array(len > 1 ? len - 1 : 0);
      for (var key = 1; key < len; key++) {
        args[key - 1] = arguments[key];
      }
      var argIndex = 0;
      var message = 'Warning: ' +
        format.replace(/%s/g, function() {
          return args[argIndex++];
        });
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

    warning = function(condition, format, args) {
      var len = arguments.length;
      args = new Array(len > 2 ? len - 2 : 0);
      for (var key = 2; key < len; key++) {
        args[key - 2] = arguments[key];
      }
      if (format === undefined) {
        throw new Error(
            '`warning(condition, format, ...args)` requires a warning ' +
            'message argument'
        );
      }
      if (!condition) {
        printWarning.apply(null, [format].concat(args));
      }
    };
  }

  var warning_1 = warning;

  function Reference(_ref) {
    var children = _ref.children,
        innerRef = _ref.innerRef;
    var setReferenceNode = React.useContext(ManagerReferenceNodeSetterContext);
    var refHandler = React.useCallback(function (node) {
      setRef(innerRef, node);
      safeInvoke(setReferenceNode, node);
    }, [innerRef, setReferenceNode]); // ran on unmount
    // eslint-disable-next-line react-hooks/exhaustive-deps

    React.useEffect(function () {
      return function () {
        return setRef(innerRef, null);
      };
    }, []);
    React.useEffect(function () {
      warning_1(Boolean(setReferenceNode), '`Reference` should not be used outside of a `Manager` component.');
    }, [setReferenceNode]);
    return unwrapArray(children)({
      ref: refHandler
    });
  }

  exports.Manager = Manager;
  exports.Popper = Popper;
  exports.Reference = Reference;
  exports.usePopper = usePopper;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
