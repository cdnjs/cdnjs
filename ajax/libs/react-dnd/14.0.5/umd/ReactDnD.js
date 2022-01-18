(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('react')) :
  typeof define === 'function' && define.amd ? define(['exports', 'react'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.ReactDnD = {}, global.React));
})(this, (function (exports, f) { 'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  var f__default = /*#__PURE__*/_interopDefaultLegacy(f);

  /**
   * Create the React Context
   */

  var DndContext = f.createContext({
    dragDropManager: undefined
  });

  function createCommonjsModule(fn) {
    var module = { exports: {} };
  	return fn(module, module.exports), module.exports;
  }

  /*
  object-assign
  (c) Sindre Sorhus
  @license MIT
  */
  /* eslint-disable no-unused-vars */
  var getOwnPropertySymbols$1 = Object.getOwnPropertySymbols;
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

  		if (getOwnPropertySymbols$1) {
  			symbols = getOwnPropertySymbols$1(from);
  			for (var i = 0; i < symbols.length; i++) {
  				if (propIsEnumerable.call(from, symbols[i])) {
  					to[symbols[i]] = from[symbols[i]];
  				}
  			}
  		}
  	}

  	return to;
  };

  /** @license React v17.0.2
   * react-jsx-runtime.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */

  createCommonjsModule(function (module, exports) {
  var g=60103;exports.Fragment=60107;if("function"===typeof Symbol&&Symbol.for){var h=Symbol.for;g=h("react.element");exports.Fragment=h("react.fragment");}var m=f__default["default"].__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,n=Object.prototype.hasOwnProperty,p={key:!0,ref:!0,__self:!0,__source:!0};
  function q(c,a,k){var b,d={},e=null,l=null;void 0!==k&&(e=""+k);void 0!==a.key&&(e=""+a.key);void 0!==a.ref&&(l=a.ref);for(b in a)n.call(a,b)&&!p.hasOwnProperty(b)&&(d[b]=a[b]);if(c&&c.defaultProps)for(b in a=c.defaultProps,a)void 0===d[b]&&(d[b]=a[b]);return {$$typeof:g,type:c,key:e,ref:l,props:d,_owner:m.current}}exports.jsx=q;exports.jsxs=q;
  });

  /** @license React v17.0.2
   * react-jsx-runtime.development.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */

  var reactJsxRuntime_development = createCommonjsModule(function (module, exports) {

  {
    (function() {

  var React = f__default["default"];
  var _assign = objectAssign;

  // ATTENTION
  // When adding new symbols to this file,
  // Please consider also adding to 'react-devtools-shared/src/backend/ReactSymbols'
  // The Symbol used to tag the ReactElement-like types. If there is no native Symbol
  // nor polyfill, then a plain number is used for performance.
  var REACT_ELEMENT_TYPE = 0xeac7;
  var REACT_PORTAL_TYPE = 0xeaca;
  exports.Fragment = 0xeacb;
  var REACT_STRICT_MODE_TYPE = 0xeacc;
  var REACT_PROFILER_TYPE = 0xead2;
  var REACT_PROVIDER_TYPE = 0xeacd;
  var REACT_CONTEXT_TYPE = 0xeace;
  var REACT_FORWARD_REF_TYPE = 0xead0;
  var REACT_SUSPENSE_TYPE = 0xead1;
  var REACT_SUSPENSE_LIST_TYPE = 0xead8;
  var REACT_MEMO_TYPE = 0xead3;
  var REACT_LAZY_TYPE = 0xead4;
  var REACT_BLOCK_TYPE = 0xead9;
  var REACT_SERVER_BLOCK_TYPE = 0xeada;
  var REACT_FUNDAMENTAL_TYPE = 0xead5;
  var REACT_DEBUG_TRACING_MODE_TYPE = 0xeae1;
  var REACT_LEGACY_HIDDEN_TYPE = 0xeae3;

  if (typeof Symbol === 'function' && Symbol.for) {
    var symbolFor = Symbol.for;
    REACT_ELEMENT_TYPE = symbolFor('react.element');
    REACT_PORTAL_TYPE = symbolFor('react.portal');
    exports.Fragment = symbolFor('react.fragment');
    REACT_STRICT_MODE_TYPE = symbolFor('react.strict_mode');
    REACT_PROFILER_TYPE = symbolFor('react.profiler');
    REACT_PROVIDER_TYPE = symbolFor('react.provider');
    REACT_CONTEXT_TYPE = symbolFor('react.context');
    REACT_FORWARD_REF_TYPE = symbolFor('react.forward_ref');
    REACT_SUSPENSE_TYPE = symbolFor('react.suspense');
    REACT_SUSPENSE_LIST_TYPE = symbolFor('react.suspense_list');
    REACT_MEMO_TYPE = symbolFor('react.memo');
    REACT_LAZY_TYPE = symbolFor('react.lazy');
    REACT_BLOCK_TYPE = symbolFor('react.block');
    REACT_SERVER_BLOCK_TYPE = symbolFor('react.server.block');
    REACT_FUNDAMENTAL_TYPE = symbolFor('react.fundamental');
    symbolFor('react.scope');
    symbolFor('react.opaque.id');
    REACT_DEBUG_TRACING_MODE_TYPE = symbolFor('react.debug_trace_mode');
    symbolFor('react.offscreen');
    REACT_LEGACY_HIDDEN_TYPE = symbolFor('react.legacy_hidden');
  }

  var MAYBE_ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
  var FAUX_ITERATOR_SYMBOL = '@@iterator';
  function getIteratorFn(maybeIterable) {
    if (maybeIterable === null || typeof maybeIterable !== 'object') {
      return null;
    }

    var maybeIterator = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL];

    if (typeof maybeIterator === 'function') {
      return maybeIterator;
    }

    return null;
  }

  var ReactSharedInternals = React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;

  function error(format) {
    {
      for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        args[_key2 - 1] = arguments[_key2];
      }

      printWarning('error', format, args);
    }
  }

  function printWarning(level, format, args) {
    // When changing this logic, you might want to also
    // update consoleWithStackDev.www.js as well.
    {
      var ReactDebugCurrentFrame = ReactSharedInternals.ReactDebugCurrentFrame;
      var stack = ReactDebugCurrentFrame.getStackAddendum();

      if (stack !== '') {
        format += '%s';
        args = args.concat([stack]);
      }

      var argsWithFormat = args.map(function (item) {
        return '' + item;
      }); // Careful: RN currently depends on this prefix

      argsWithFormat.unshift('Warning: ' + format); // We intentionally don't use spread (or .apply) directly because it
      // breaks IE9: https://github.com/facebook/react/issues/13610
      // eslint-disable-next-line react-internal/no-production-logging

      Function.prototype.apply.call(console[level], console, argsWithFormat);
    }
  }

  // Filter certain DOM attributes (e.g. src, href) if their values are empty strings.

  var enableScopeAPI = false; // Experimental Create Event Handle API.

  function isValidElementType(type) {
    if (typeof type === 'string' || typeof type === 'function') {
      return true;
    } // Note: typeof might be other than 'symbol' or 'number' (e.g. if it's a polyfill).


    if (type === exports.Fragment || type === REACT_PROFILER_TYPE || type === REACT_DEBUG_TRACING_MODE_TYPE || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || type === REACT_LEGACY_HIDDEN_TYPE || enableScopeAPI ) {
      return true;
    }

    if (typeof type === 'object' && type !== null) {
      if (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || type.$$typeof === REACT_FUNDAMENTAL_TYPE || type.$$typeof === REACT_BLOCK_TYPE || type[0] === REACT_SERVER_BLOCK_TYPE) {
        return true;
      }
    }

    return false;
  }

  function getWrappedName(outerType, innerType, wrapperName) {
    var functionName = innerType.displayName || innerType.name || '';
    return outerType.displayName || (functionName !== '' ? wrapperName + "(" + functionName + ")" : wrapperName);
  }

  function getContextName(type) {
    return type.displayName || 'Context';
  }

  function getComponentName(type) {
    if (type == null) {
      // Host root, text node or just invalid type.
      return null;
    }

    {
      if (typeof type.tag === 'number') {
        error('Received an unexpected object in getComponentName(). ' + 'This is likely a bug in React. Please file an issue.');
      }
    }

    if (typeof type === 'function') {
      return type.displayName || type.name || null;
    }

    if (typeof type === 'string') {
      return type;
    }

    switch (type) {
      case exports.Fragment:
        return 'Fragment';

      case REACT_PORTAL_TYPE:
        return 'Portal';

      case REACT_PROFILER_TYPE:
        return 'Profiler';

      case REACT_STRICT_MODE_TYPE:
        return 'StrictMode';

      case REACT_SUSPENSE_TYPE:
        return 'Suspense';

      case REACT_SUSPENSE_LIST_TYPE:
        return 'SuspenseList';
    }

    if (typeof type === 'object') {
      switch (type.$$typeof) {
        case REACT_CONTEXT_TYPE:
          var context = type;
          return getContextName(context) + '.Consumer';

        case REACT_PROVIDER_TYPE:
          var provider = type;
          return getContextName(provider._context) + '.Provider';

        case REACT_FORWARD_REF_TYPE:
          return getWrappedName(type, type.render, 'ForwardRef');

        case REACT_MEMO_TYPE:
          return getComponentName(type.type);

        case REACT_BLOCK_TYPE:
          return getComponentName(type._render);

        case REACT_LAZY_TYPE:
          {
            var lazyComponent = type;
            var payload = lazyComponent._payload;
            var init = lazyComponent._init;

            try {
              return getComponentName(init(payload));
            } catch (x) {
              return null;
            }
          }
      }
    }

    return null;
  }

  // Helpers to patch console.logs to avoid logging during side-effect free
  // replaying on render function. This currently only patches the object
  // lazily which won't cover if the log function was extracted eagerly.
  // We could also eagerly patch the method.
  var disabledDepth = 0;
  var prevLog;
  var prevInfo;
  var prevWarn;
  var prevError;
  var prevGroup;
  var prevGroupCollapsed;
  var prevGroupEnd;

  function disabledLog() {}

  disabledLog.__reactDisabledLog = true;
  function disableLogs() {
    {
      if (disabledDepth === 0) {
        /* eslint-disable react-internal/no-production-logging */
        prevLog = console.log;
        prevInfo = console.info;
        prevWarn = console.warn;
        prevError = console.error;
        prevGroup = console.group;
        prevGroupCollapsed = console.groupCollapsed;
        prevGroupEnd = console.groupEnd; // https://github.com/facebook/react/issues/19099

        var props = {
          configurable: true,
          enumerable: true,
          value: disabledLog,
          writable: true
        }; // $FlowFixMe Flow thinks console is immutable.

        Object.defineProperties(console, {
          info: props,
          log: props,
          warn: props,
          error: props,
          group: props,
          groupCollapsed: props,
          groupEnd: props
        });
        /* eslint-enable react-internal/no-production-logging */
      }

      disabledDepth++;
    }
  }
  function reenableLogs() {
    {
      disabledDepth--;

      if (disabledDepth === 0) {
        /* eslint-disable react-internal/no-production-logging */
        var props = {
          configurable: true,
          enumerable: true,
          writable: true
        }; // $FlowFixMe Flow thinks console is immutable.

        Object.defineProperties(console, {
          log: _assign({}, props, {
            value: prevLog
          }),
          info: _assign({}, props, {
            value: prevInfo
          }),
          warn: _assign({}, props, {
            value: prevWarn
          }),
          error: _assign({}, props, {
            value: prevError
          }),
          group: _assign({}, props, {
            value: prevGroup
          }),
          groupCollapsed: _assign({}, props, {
            value: prevGroupCollapsed
          }),
          groupEnd: _assign({}, props, {
            value: prevGroupEnd
          })
        });
        /* eslint-enable react-internal/no-production-logging */
      }

      if (disabledDepth < 0) {
        error('disabledDepth fell below zero. ' + 'This is a bug in React. Please file an issue.');
      }
    }
  }

  var ReactCurrentDispatcher = ReactSharedInternals.ReactCurrentDispatcher;
  var prefix;
  function describeBuiltInComponentFrame(name, source, ownerFn) {
    {
      if (prefix === undefined) {
        // Extract the VM specific prefix used by each line.
        try {
          throw Error();
        } catch (x) {
          var match = x.stack.trim().match(/\n( *(at )?)/);
          prefix = match && match[1] || '';
        }
      } // We use the prefix to ensure our stacks line up with native stack frames.


      return '\n' + prefix + name;
    }
  }
  var reentry = false;
  var componentFrameCache;

  {
    var PossiblyWeakMap = typeof WeakMap === 'function' ? WeakMap : Map;
    componentFrameCache = new PossiblyWeakMap();
  }

  function describeNativeComponentFrame(fn, construct) {
    // If something asked for a stack inside a fake render, it should get ignored.
    if (!fn || reentry) {
      return '';
    }

    {
      var frame = componentFrameCache.get(fn);

      if (frame !== undefined) {
        return frame;
      }
    }

    var control;
    reentry = true;
    var previousPrepareStackTrace = Error.prepareStackTrace; // $FlowFixMe It does accept undefined.

    Error.prepareStackTrace = undefined;
    var previousDispatcher;

    {
      previousDispatcher = ReactCurrentDispatcher.current; // Set the dispatcher in DEV because this might be call in the render function
      // for warnings.

      ReactCurrentDispatcher.current = null;
      disableLogs();
    }

    try {
      // This should throw.
      if (construct) {
        // Something should be setting the props in the constructor.
        var Fake = function () {
          throw Error();
        }; // $FlowFixMe


        Object.defineProperty(Fake.prototype, 'props', {
          set: function () {
            // We use a throwing setter instead of frozen or non-writable props
            // because that won't throw in a non-strict mode function.
            throw Error();
          }
        });

        if (typeof Reflect === 'object' && Reflect.construct) {
          // We construct a different control for this case to include any extra
          // frames added by the construct call.
          try {
            Reflect.construct(Fake, []);
          } catch (x) {
            control = x;
          }

          Reflect.construct(fn, [], Fake);
        } else {
          try {
            Fake.call();
          } catch (x) {
            control = x;
          }

          fn.call(Fake.prototype);
        }
      } else {
        try {
          throw Error();
        } catch (x) {
          control = x;
        }

        fn();
      }
    } catch (sample) {
      // This is inlined manually because closure doesn't do it for us.
      if (sample && control && typeof sample.stack === 'string') {
        // This extracts the first frame from the sample that isn't also in the control.
        // Skipping one frame that we assume is the frame that calls the two.
        var sampleLines = sample.stack.split('\n');
        var controlLines = control.stack.split('\n');
        var s = sampleLines.length - 1;
        var c = controlLines.length - 1;

        while (s >= 1 && c >= 0 && sampleLines[s] !== controlLines[c]) {
          // We expect at least one stack frame to be shared.
          // Typically this will be the root most one. However, stack frames may be
          // cut off due to maximum stack limits. In this case, one maybe cut off
          // earlier than the other. We assume that the sample is longer or the same
          // and there for cut off earlier. So we should find the root most frame in
          // the sample somewhere in the control.
          c--;
        }

        for (; s >= 1 && c >= 0; s--, c--) {
          // Next we find the first one that isn't the same which should be the
          // frame that called our sample function and the control.
          if (sampleLines[s] !== controlLines[c]) {
            // In V8, the first line is describing the message but other VMs don't.
            // If we're about to return the first line, and the control is also on the same
            // line, that's a pretty good indicator that our sample threw at same line as
            // the control. I.e. before we entered the sample frame. So we ignore this result.
            // This can happen if you passed a class to function component, or non-function.
            if (s !== 1 || c !== 1) {
              do {
                s--;
                c--; // We may still have similar intermediate frames from the construct call.
                // The next one that isn't the same should be our match though.

                if (c < 0 || sampleLines[s] !== controlLines[c]) {
                  // V8 adds a "new" prefix for native classes. Let's remove it to make it prettier.
                  var _frame = '\n' + sampleLines[s].replace(' at new ', ' at ');

                  {
                    if (typeof fn === 'function') {
                      componentFrameCache.set(fn, _frame);
                    }
                  } // Return the line we found.


                  return _frame;
                }
              } while (s >= 1 && c >= 0);
            }

            break;
          }
        }
      }
    } finally {
      reentry = false;

      {
        ReactCurrentDispatcher.current = previousDispatcher;
        reenableLogs();
      }

      Error.prepareStackTrace = previousPrepareStackTrace;
    } // Fallback to just using the name if we couldn't make it throw.


    var name = fn ? fn.displayName || fn.name : '';
    var syntheticFrame = name ? describeBuiltInComponentFrame(name) : '';

    {
      if (typeof fn === 'function') {
        componentFrameCache.set(fn, syntheticFrame);
      }
    }

    return syntheticFrame;
  }
  function describeFunctionComponentFrame(fn, source, ownerFn) {
    {
      return describeNativeComponentFrame(fn, false);
    }
  }

  function shouldConstruct(Component) {
    var prototype = Component.prototype;
    return !!(prototype && prototype.isReactComponent);
  }

  function describeUnknownElementTypeFrameInDEV(type, source, ownerFn) {

    if (type == null) {
      return '';
    }

    if (typeof type === 'function') {
      {
        return describeNativeComponentFrame(type, shouldConstruct(type));
      }
    }

    if (typeof type === 'string') {
      return describeBuiltInComponentFrame(type);
    }

    switch (type) {
      case REACT_SUSPENSE_TYPE:
        return describeBuiltInComponentFrame('Suspense');

      case REACT_SUSPENSE_LIST_TYPE:
        return describeBuiltInComponentFrame('SuspenseList');
    }

    if (typeof type === 'object') {
      switch (type.$$typeof) {
        case REACT_FORWARD_REF_TYPE:
          return describeFunctionComponentFrame(type.render);

        case REACT_MEMO_TYPE:
          // Memo may contain any component type so we recursively resolve it.
          return describeUnknownElementTypeFrameInDEV(type.type, source, ownerFn);

        case REACT_BLOCK_TYPE:
          return describeFunctionComponentFrame(type._render);

        case REACT_LAZY_TYPE:
          {
            var lazyComponent = type;
            var payload = lazyComponent._payload;
            var init = lazyComponent._init;

            try {
              // Lazy may contain any component type so we recursively resolve it.
              return describeUnknownElementTypeFrameInDEV(init(payload), source, ownerFn);
            } catch (x) {}
          }
      }
    }

    return '';
  }

  var loggedTypeFailures = {};
  var ReactDebugCurrentFrame = ReactSharedInternals.ReactDebugCurrentFrame;

  function setCurrentlyValidatingElement(element) {
    {
      if (element) {
        var owner = element._owner;
        var stack = describeUnknownElementTypeFrameInDEV(element.type, element._source, owner ? owner.type : null);
        ReactDebugCurrentFrame.setExtraStackFrame(stack);
      } else {
        ReactDebugCurrentFrame.setExtraStackFrame(null);
      }
    }
  }

  function checkPropTypes(typeSpecs, values, location, componentName, element) {
    {
      // $FlowFixMe This is okay but Flow doesn't know it.
      var has = Function.call.bind(Object.prototype.hasOwnProperty);

      for (var typeSpecName in typeSpecs) {
        if (has(typeSpecs, typeSpecName)) {
          var error$1 = void 0; // Prop type validation may throw. In case they do, we don't want to
          // fail the render phase where it didn't fail before. So we log it.
          // After these have been cleaned up, we'll let them throw.

          try {
            // This is intentionally an invariant that gets caught. It's the same
            // behavior as without this statement except with a better message.
            if (typeof typeSpecs[typeSpecName] !== 'function') {
              var err = Error((componentName || 'React class') + ': ' + location + ' type `' + typeSpecName + '` is invalid; ' + 'it must be a function, usually from the `prop-types` package, but received `' + typeof typeSpecs[typeSpecName] + '`.' + 'This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.');
              err.name = 'Invariant Violation';
              throw err;
            }

            error$1 = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED');
          } catch (ex) {
            error$1 = ex;
          }

          if (error$1 && !(error$1 instanceof Error)) {
            setCurrentlyValidatingElement(element);

            error('%s: type specification of %s' + ' `%s` is invalid; the type checker ' + 'function must return `null` or an `Error` but returned a %s. ' + 'You may have forgotten to pass an argument to the type checker ' + 'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' + 'shape all require an argument).', componentName || 'React class', location, typeSpecName, typeof error$1);

            setCurrentlyValidatingElement(null);
          }

          if (error$1 instanceof Error && !(error$1.message in loggedTypeFailures)) {
            // Only monitor this failure once because there tends to be a lot of the
            // same error.
            loggedTypeFailures[error$1.message] = true;
            setCurrentlyValidatingElement(element);

            error('Failed %s type: %s', location, error$1.message);

            setCurrentlyValidatingElement(null);
          }
        }
      }
    }
  }

  var ReactCurrentOwner = ReactSharedInternals.ReactCurrentOwner;
  var hasOwnProperty = Object.prototype.hasOwnProperty;
  var RESERVED_PROPS = {
    key: true,
    ref: true,
    __self: true,
    __source: true
  };
  var specialPropKeyWarningShown;
  var specialPropRefWarningShown;
  var didWarnAboutStringRefs;

  {
    didWarnAboutStringRefs = {};
  }

  function hasValidRef(config) {
    {
      if (hasOwnProperty.call(config, 'ref')) {
        var getter = Object.getOwnPropertyDescriptor(config, 'ref').get;

        if (getter && getter.isReactWarning) {
          return false;
        }
      }
    }

    return config.ref !== undefined;
  }

  function hasValidKey(config) {
    {
      if (hasOwnProperty.call(config, 'key')) {
        var getter = Object.getOwnPropertyDescriptor(config, 'key').get;

        if (getter && getter.isReactWarning) {
          return false;
        }
      }
    }

    return config.key !== undefined;
  }

  function warnIfStringRefCannotBeAutoConverted(config, self) {
    {
      if (typeof config.ref === 'string' && ReactCurrentOwner.current && self && ReactCurrentOwner.current.stateNode !== self) {
        var componentName = getComponentName(ReactCurrentOwner.current.type);

        if (!didWarnAboutStringRefs[componentName]) {
          error('Component "%s" contains the string ref "%s". ' + 'Support for string refs will be removed in a future major release. ' + 'This case cannot be automatically converted to an arrow function. ' + 'We ask you to manually fix this case by using useRef() or createRef() instead. ' + 'Learn more about using refs safely here: ' + 'https://reactjs.org/link/strict-mode-string-ref', getComponentName(ReactCurrentOwner.current.type), config.ref);

          didWarnAboutStringRefs[componentName] = true;
        }
      }
    }
  }

  function defineKeyPropWarningGetter(props, displayName) {
    {
      var warnAboutAccessingKey = function () {
        if (!specialPropKeyWarningShown) {
          specialPropKeyWarningShown = true;

          error('%s: `key` is not a prop. Trying to access it will result ' + 'in `undefined` being returned. If you need to access the same ' + 'value within the child component, you should pass it as a different ' + 'prop. (https://reactjs.org/link/special-props)', displayName);
        }
      };

      warnAboutAccessingKey.isReactWarning = true;
      Object.defineProperty(props, 'key', {
        get: warnAboutAccessingKey,
        configurable: true
      });
    }
  }

  function defineRefPropWarningGetter(props, displayName) {
    {
      var warnAboutAccessingRef = function () {
        if (!specialPropRefWarningShown) {
          specialPropRefWarningShown = true;

          error('%s: `ref` is not a prop. Trying to access it will result ' + 'in `undefined` being returned. If you need to access the same ' + 'value within the child component, you should pass it as a different ' + 'prop. (https://reactjs.org/link/special-props)', displayName);
        }
      };

      warnAboutAccessingRef.isReactWarning = true;
      Object.defineProperty(props, 'ref', {
        get: warnAboutAccessingRef,
        configurable: true
      });
    }
  }
  /**
   * Factory method to create a new React element. This no longer adheres to
   * the class pattern, so do not use new to call it. Also, instanceof check
   * will not work. Instead test $$typeof field against Symbol.for('react.element') to check
   * if something is a React Element.
   *
   * @param {*} type
   * @param {*} props
   * @param {*} key
   * @param {string|object} ref
   * @param {*} owner
   * @param {*} self A *temporary* helper to detect places where `this` is
   * different from the `owner` when React.createElement is called, so that we
   * can warn. We want to get rid of owner and replace string `ref`s with arrow
   * functions, and as long as `this` and owner are the same, there will be no
   * change in behavior.
   * @param {*} source An annotation object (added by a transpiler or otherwise)
   * indicating filename, line number, and/or other information.
   * @internal
   */


  var ReactElement = function (type, key, ref, self, source, owner, props) {
    var element = {
      // This tag allows us to uniquely identify this as a React Element
      $$typeof: REACT_ELEMENT_TYPE,
      // Built-in properties that belong on the element
      type: type,
      key: key,
      ref: ref,
      props: props,
      // Record the component responsible for creating this element.
      _owner: owner
    };

    {
      // The validation flag is currently mutative. We put it on
      // an external backing store so that we can freeze the whole object.
      // This can be replaced with a WeakMap once they are implemented in
      // commonly used development environments.
      element._store = {}; // To make comparing ReactElements easier for testing purposes, we make
      // the validation flag non-enumerable (where possible, which should
      // include every environment we run tests in), so the test framework
      // ignores it.

      Object.defineProperty(element._store, 'validated', {
        configurable: false,
        enumerable: false,
        writable: true,
        value: false
      }); // self and source are DEV only properties.

      Object.defineProperty(element, '_self', {
        configurable: false,
        enumerable: false,
        writable: false,
        value: self
      }); // Two elements created in two different places should be considered
      // equal for testing purposes and therefore we hide it from enumeration.

      Object.defineProperty(element, '_source', {
        configurable: false,
        enumerable: false,
        writable: false,
        value: source
      });

      if (Object.freeze) {
        Object.freeze(element.props);
        Object.freeze(element);
      }
    }

    return element;
  };
  /**
   * https://github.com/reactjs/rfcs/pull/107
   * @param {*} type
   * @param {object} props
   * @param {string} key
   */

  function jsxDEV(type, config, maybeKey, source, self) {
    {
      var propName; // Reserved names are extracted

      var props = {};
      var key = null;
      var ref = null; // Currently, key can be spread in as a prop. This causes a potential
      // issue if key is also explicitly declared (ie. <div {...props} key="Hi" />
      // or <div key="Hi" {...props} /> ). We want to deprecate key spread,
      // but as an intermediary step, we will use jsxDEV for everything except
      // <div {...props} key="Hi" />, because we aren't currently able to tell if
      // key is explicitly declared to be undefined or not.

      if (maybeKey !== undefined) {
        key = '' + maybeKey;
      }

      if (hasValidKey(config)) {
        key = '' + config.key;
      }

      if (hasValidRef(config)) {
        ref = config.ref;
        warnIfStringRefCannotBeAutoConverted(config, self);
      } // Remaining properties are added to a new props object


      for (propName in config) {
        if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
          props[propName] = config[propName];
        }
      } // Resolve default props


      if (type && type.defaultProps) {
        var defaultProps = type.defaultProps;

        for (propName in defaultProps) {
          if (props[propName] === undefined) {
            props[propName] = defaultProps[propName];
          }
        }
      }

      if (key || ref) {
        var displayName = typeof type === 'function' ? type.displayName || type.name || 'Unknown' : type;

        if (key) {
          defineKeyPropWarningGetter(props, displayName);
        }

        if (ref) {
          defineRefPropWarningGetter(props, displayName);
        }
      }

      return ReactElement(type, key, ref, self, source, ReactCurrentOwner.current, props);
    }
  }

  var ReactCurrentOwner$1 = ReactSharedInternals.ReactCurrentOwner;
  var ReactDebugCurrentFrame$1 = ReactSharedInternals.ReactDebugCurrentFrame;

  function setCurrentlyValidatingElement$1(element) {
    {
      if (element) {
        var owner = element._owner;
        var stack = describeUnknownElementTypeFrameInDEV(element.type, element._source, owner ? owner.type : null);
        ReactDebugCurrentFrame$1.setExtraStackFrame(stack);
      } else {
        ReactDebugCurrentFrame$1.setExtraStackFrame(null);
      }
    }
  }

  var propTypesMisspellWarningShown;

  {
    propTypesMisspellWarningShown = false;
  }
  /**
   * Verifies the object is a ReactElement.
   * See https://reactjs.org/docs/react-api.html#isvalidelement
   * @param {?object} object
   * @return {boolean} True if `object` is a ReactElement.
   * @final
   */

  function isValidElement(object) {
    {
      return typeof object === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
    }
  }

  function getDeclarationErrorAddendum() {
    {
      if (ReactCurrentOwner$1.current) {
        var name = getComponentName(ReactCurrentOwner$1.current.type);

        if (name) {
          return '\n\nCheck the render method of `' + name + '`.';
        }
      }

      return '';
    }
  }

  function getSourceInfoErrorAddendum(source) {
    {
      if (source !== undefined) {
        var fileName = source.fileName.replace(/^.*[\\\/]/, '');
        var lineNumber = source.lineNumber;
        return '\n\nCheck your code at ' + fileName + ':' + lineNumber + '.';
      }

      return '';
    }
  }
  /**
   * Warn if there's no key explicitly set on dynamic arrays of children or
   * object keys are not valid. This allows us to keep track of children between
   * updates.
   */


  var ownerHasKeyUseWarning = {};

  function getCurrentComponentErrorInfo(parentType) {
    {
      var info = getDeclarationErrorAddendum();

      if (!info) {
        var parentName = typeof parentType === 'string' ? parentType : parentType.displayName || parentType.name;

        if (parentName) {
          info = "\n\nCheck the top-level render call using <" + parentName + ">.";
        }
      }

      return info;
    }
  }
  /**
   * Warn if the element doesn't have an explicit key assigned to it.
   * This element is in an array. The array could grow and shrink or be
   * reordered. All children that haven't already been validated are required to
   * have a "key" property assigned to it. Error statuses are cached so a warning
   * will only be shown once.
   *
   * @internal
   * @param {ReactElement} element Element that requires a key.
   * @param {*} parentType element's parent's type.
   */


  function validateExplicitKey(element, parentType) {
    {
      if (!element._store || element._store.validated || element.key != null) {
        return;
      }

      element._store.validated = true;
      var currentComponentErrorInfo = getCurrentComponentErrorInfo(parentType);

      if (ownerHasKeyUseWarning[currentComponentErrorInfo]) {
        return;
      }

      ownerHasKeyUseWarning[currentComponentErrorInfo] = true; // Usually the current owner is the offender, but if it accepts children as a
      // property, it may be the creator of the child that's responsible for
      // assigning it a key.

      var childOwner = '';

      if (element && element._owner && element._owner !== ReactCurrentOwner$1.current) {
        // Give the component that originally created this child.
        childOwner = " It was passed a child from " + getComponentName(element._owner.type) + ".";
      }

      setCurrentlyValidatingElement$1(element);

      error('Each child in a list should have a unique "key" prop.' + '%s%s See https://reactjs.org/link/warning-keys for more information.', currentComponentErrorInfo, childOwner);

      setCurrentlyValidatingElement$1(null);
    }
  }
  /**
   * Ensure that every element either is passed in a static location, in an
   * array with an explicit keys property defined, or in an object literal
   * with valid key property.
   *
   * @internal
   * @param {ReactNode} node Statically passed child of any type.
   * @param {*} parentType node's parent's type.
   */


  function validateChildKeys(node, parentType) {
    {
      if (typeof node !== 'object') {
        return;
      }

      if (Array.isArray(node)) {
        for (var i = 0; i < node.length; i++) {
          var child = node[i];

          if (isValidElement(child)) {
            validateExplicitKey(child, parentType);
          }
        }
      } else if (isValidElement(node)) {
        // This element was passed in a valid location.
        if (node._store) {
          node._store.validated = true;
        }
      } else if (node) {
        var iteratorFn = getIteratorFn(node);

        if (typeof iteratorFn === 'function') {
          // Entry iterators used to provide implicit keys,
          // but now we print a separate warning for them later.
          if (iteratorFn !== node.entries) {
            var iterator = iteratorFn.call(node);
            var step;

            while (!(step = iterator.next()).done) {
              if (isValidElement(step.value)) {
                validateExplicitKey(step.value, parentType);
              }
            }
          }
        }
      }
    }
  }
  /**
   * Given an element, validate that its props follow the propTypes definition,
   * provided by the type.
   *
   * @param {ReactElement} element
   */


  function validatePropTypes(element) {
    {
      var type = element.type;

      if (type === null || type === undefined || typeof type === 'string') {
        return;
      }

      var propTypes;

      if (typeof type === 'function') {
        propTypes = type.propTypes;
      } else if (typeof type === 'object' && (type.$$typeof === REACT_FORWARD_REF_TYPE || // Note: Memo only checks outer props here.
      // Inner props are checked in the reconciler.
      type.$$typeof === REACT_MEMO_TYPE)) {
        propTypes = type.propTypes;
      } else {
        return;
      }

      if (propTypes) {
        // Intentionally inside to avoid triggering lazy initializers:
        var name = getComponentName(type);
        checkPropTypes(propTypes, element.props, 'prop', name, element);
      } else if (type.PropTypes !== undefined && !propTypesMisspellWarningShown) {
        propTypesMisspellWarningShown = true; // Intentionally inside to avoid triggering lazy initializers:

        var _name = getComponentName(type);

        error('Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?', _name || 'Unknown');
      }

      if (typeof type.getDefaultProps === 'function' && !type.getDefaultProps.isReactClassApproved) {
        error('getDefaultProps is only used on classic React.createClass ' + 'definitions. Use a static property named `defaultProps` instead.');
      }
    }
  }
  /**
   * Given a fragment, validate that it can only be provided with fragment props
   * @param {ReactElement} fragment
   */


  function validateFragmentProps(fragment) {
    {
      var keys = Object.keys(fragment.props);

      for (var i = 0; i < keys.length; i++) {
        var key = keys[i];

        if (key !== 'children' && key !== 'key') {
          setCurrentlyValidatingElement$1(fragment);

          error('Invalid prop `%s` supplied to `React.Fragment`. ' + 'React.Fragment can only have `key` and `children` props.', key);

          setCurrentlyValidatingElement$1(null);
          break;
        }
      }

      if (fragment.ref !== null) {
        setCurrentlyValidatingElement$1(fragment);

        error('Invalid attribute `ref` supplied to `React.Fragment`.');

        setCurrentlyValidatingElement$1(null);
      }
    }
  }

  function jsxWithValidation(type, props, key, isStaticChildren, source, self) {
    {
      var validType = isValidElementType(type); // We warn in this case but don't throw. We expect the element creation to
      // succeed and there will likely be errors in render.

      if (!validType) {
        var info = '';

        if (type === undefined || typeof type === 'object' && type !== null && Object.keys(type).length === 0) {
          info += ' You likely forgot to export your component from the file ' + "it's defined in, or you might have mixed up default and named imports.";
        }

        var sourceInfo = getSourceInfoErrorAddendum(source);

        if (sourceInfo) {
          info += sourceInfo;
        } else {
          info += getDeclarationErrorAddendum();
        }

        var typeString;

        if (type === null) {
          typeString = 'null';
        } else if (Array.isArray(type)) {
          typeString = 'array';
        } else if (type !== undefined && type.$$typeof === REACT_ELEMENT_TYPE) {
          typeString = "<" + (getComponentName(type.type) || 'Unknown') + " />";
          info = ' Did you accidentally export a JSX literal instead of a component?';
        } else {
          typeString = typeof type;
        }

        error('React.jsx: type is invalid -- expected a string (for ' + 'built-in components) or a class/function (for composite ' + 'components) but got: %s.%s', typeString, info);
      }

      var element = jsxDEV(type, props, key, source, self); // The result can be nullish if a mock or a custom function is used.
      // TODO: Drop this when these are no longer allowed as the type argument.

      if (element == null) {
        return element;
      } // Skip key warning if the type isn't valid since our key validation logic
      // doesn't expect a non-string/function type and can throw confusing errors.
      // We don't want exception behavior to differ between dev and prod.
      // (Rendering will throw with a helpful message and as soon as the type is
      // fixed, the key warnings will appear.)


      if (validType) {
        var children = props.children;

        if (children !== undefined) {
          if (isStaticChildren) {
            if (Array.isArray(children)) {
              for (var i = 0; i < children.length; i++) {
                validateChildKeys(children[i], type);
              }

              if (Object.freeze) {
                Object.freeze(children);
              }
            } else {
              error('React.jsx: Static children should always be an array. ' + 'You are likely explicitly calling React.jsxs or React.jsxDEV. ' + 'Use the Babel transform instead.');
            }
          } else {
            validateChildKeys(children, type);
          }
        }
      }

      if (type === exports.Fragment) {
        validateFragmentProps(element);
      } else {
        validatePropTypes(element);
      }

      return element;
    }
  } // These two functions exist to still get child warnings in dev
  // even with the prod transform. This means that jsxDEV is purely
  // opt-in behavior for better messages but that we won't stop
  // giving you warnings if you use production apis.

  function jsxWithValidationStatic(type, props, key) {
    {
      return jsxWithValidation(type, props, key, true);
    }
  }
  function jsxWithValidationDynamic(type, props, key) {
    {
      return jsxWithValidation(type, props, key, false);
    }
  }

  var jsx =  jsxWithValidationDynamic ; // we may want to special case jsxs internally to take advantage of static children.
  // for now we can ship identical prod functions

  var jsxs =  jsxWithValidationStatic ;

  exports.jsx = jsx;
  exports.jsxs = jsxs;
    })();
  }
  });

  var jsxRuntime = createCommonjsModule(function (module) {

  {
    module.exports = reactJsxRuntime_development;
  }
  });

  var HandlerRole;

  (function (HandlerRole) {
    HandlerRole["SOURCE"] = "SOURCE";
    HandlerRole["TARGET"] = "TARGET";
  })(HandlerRole || (HandlerRole = {}));

  /**
   * Use invariant() to assert state which your program assumes to be true.
   *
   * Provide sprintf-style format (only %s is supported) and arguments
   * to provide information about what broke and what you were
   * expecting.
   *
   * The invariant message will be stripped in production, but the invariant
   * will remain to ensure logic does not differ in production.
   */
  function invariant(condition, format) {
    for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      args[_key - 2] = arguments[_key];
    }

    {
      if (format === undefined) {
        throw new Error('invariant requires an error message argument');
      }
    }

    if (!condition) {
      var error;

      if (format === undefined) {
        error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
      } else {
        var argIndex = 0;
        error = new Error(format.replace(/%s/g, function () {
          return args[argIndex++];
        }));
        error.name = 'Invariant Violation';
      }

      error.framesToPop = 1; // we don't care about invariant's own frame

      throw error;
    }
  }

  var INIT_COORDS = 'dnd-core/INIT_COORDS';
  var BEGIN_DRAG = 'dnd-core/BEGIN_DRAG';
  var PUBLISH_DRAG_SOURCE = 'dnd-core/PUBLISH_DRAG_SOURCE';
  var HOVER = 'dnd-core/HOVER';
  var DROP = 'dnd-core/DROP';
  var END_DRAG = 'dnd-core/END_DRAG';

  function setClientOffset(clientOffset, sourceClientOffset) {
    return {
      type: INIT_COORDS,
      payload: {
        sourceClientOffset: sourceClientOffset || null,
        clientOffset: clientOffset || null
      }
    };
  }

  function _typeof$6(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof$6 = function _typeof(obj) { return typeof obj; }; } else { _typeof$6 = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof$6(obj); }

  // cheap lodash replacements

  /**
   * drop-in replacement for _.get
   * @param obj
   * @param path
   * @param defaultValue
   */
  function get(obj, path, defaultValue) {
    return path.split('.').reduce(function (a, c) {
      return a && a[c] ? a[c] : defaultValue || null;
    }, obj);
  }
  /**
   * drop-in replacement for _.without
   */

  function without(items, item) {
    return items.filter(function (i) {
      return i !== item;
    });
  }
  /**
   * drop-in replacement for _.isString
   * @param input
   */

  function isObject(input) {
    return _typeof$6(input) === 'object';
  }
  /**
   * replacement for _.xor
   * @param itemsA
   * @param itemsB
   */

  function xor(itemsA, itemsB) {
    var map = new Map();

    var insertItem = function insertItem(item) {
      map.set(item, map.has(item) ? map.get(item) + 1 : 1);
    };

    itemsA.forEach(insertItem);
    itemsB.forEach(insertItem);
    var result = [];
    map.forEach(function (count, key) {
      if (count === 1) {
        result.push(key);
      }
    });
    return result;
  }
  /**
   * replacement for _.intersection
   * @param itemsA
   * @param itemsB
   */

  function intersection(itemsA, itemsB) {
    return itemsA.filter(function (t) {
      return itemsB.indexOf(t) > -1;
    });
  }

  var ResetCoordinatesAction = {
    type: INIT_COORDS,
    payload: {
      clientOffset: null,
      sourceClientOffset: null
    }
  };
  function createBeginDrag(manager) {
    return function beginDrag() {
      var sourceIds = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
        publishSource: true
      };
      var _options$publishSourc = options.publishSource,
          publishSource = _options$publishSourc === void 0 ? true : _options$publishSourc,
          clientOffset = options.clientOffset,
          getSourceClientOffset = options.getSourceClientOffset;
      var monitor = manager.getMonitor();
      var registry = manager.getRegistry(); // Initialize the coordinates using the client offset

      manager.dispatch(setClientOffset(clientOffset));
      verifyInvariants$1(sourceIds, monitor, registry); // Get the draggable source

      var sourceId = getDraggableSource(sourceIds, monitor);

      if (sourceId === null) {
        manager.dispatch(ResetCoordinatesAction);
        return;
      } // Get the source client offset


      var sourceClientOffset = null;

      if (clientOffset) {
        if (!getSourceClientOffset) {
          throw new Error('getSourceClientOffset must be defined');
        }

        verifyGetSourceClientOffsetIsFunction(getSourceClientOffset);
        sourceClientOffset = getSourceClientOffset(sourceId);
      } // Initialize the full coordinates


      manager.dispatch(setClientOffset(clientOffset, sourceClientOffset));
      var source = registry.getSource(sourceId);
      var item = source.beginDrag(monitor, sourceId); // If source.beginDrag returns null, this is an indicator to cancel the drag

      if (item == null) {
        return undefined;
      }

      verifyItemIsObject(item);
      registry.pinSource(sourceId);
      var itemType = registry.getSourceType(sourceId);
      return {
        type: BEGIN_DRAG,
        payload: {
          itemType: itemType,
          item: item,
          sourceId: sourceId,
          clientOffset: clientOffset || null,
          sourceClientOffset: sourceClientOffset || null,
          isSourcePublic: !!publishSource
        }
      };
    };
  }

  function verifyInvariants$1(sourceIds, monitor, registry) {
    invariant(!monitor.isDragging(), 'Cannot call beginDrag while dragging.');
    sourceIds.forEach(function (sourceId) {
      invariant(registry.getSource(sourceId), 'Expected sourceIds to be registered.');
    });
  }

  function verifyGetSourceClientOffsetIsFunction(getSourceClientOffset) {
    invariant(typeof getSourceClientOffset === 'function', 'When clientOffset is provided, getSourceClientOffset must be a function.');
  }

  function verifyItemIsObject(item) {
    invariant(isObject(item), 'Item must be an object.');
  }

  function getDraggableSource(sourceIds, monitor) {
    var sourceId = null;

    for (var i = sourceIds.length - 1; i >= 0; i--) {
      if (monitor.canDragSource(sourceIds[i])) {
        sourceId = sourceIds[i];
        break;
      }
    }

    return sourceId;
  }

  function createPublishDragSource(manager) {
    return function publishDragSource() {
      var monitor = manager.getMonitor();

      if (monitor.isDragging()) {
        return {
          type: PUBLISH_DRAG_SOURCE
        };
      }
    };
  }

  function matchesType(targetType, draggedItemType) {
    if (draggedItemType === null) {
      return targetType === null;
    }

    return Array.isArray(targetType) ? targetType.some(function (t) {
      return t === draggedItemType;
    }) : targetType === draggedItemType;
  }

  function createHover(manager) {
    return function hover(targetIdsArg) {
      var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
          clientOffset = _ref.clientOffset;

      verifyTargetIdsIsArray(targetIdsArg);
      var targetIds = targetIdsArg.slice(0);
      var monitor = manager.getMonitor();
      var registry = manager.getRegistry();
      checkInvariants(targetIds, monitor, registry);
      var draggedItemType = monitor.getItemType();
      removeNonMatchingTargetIds(targetIds, registry, draggedItemType);
      hoverAllTargets(targetIds, monitor, registry);
      return {
        type: HOVER,
        payload: {
          targetIds: targetIds,
          clientOffset: clientOffset || null
        }
      };
    };
  }

  function verifyTargetIdsIsArray(targetIdsArg) {
    invariant(Array.isArray(targetIdsArg), 'Expected targetIds to be an array.');
  }

  function checkInvariants(targetIds, monitor, registry) {
    invariant(monitor.isDragging(), 'Cannot call hover while not dragging.');
    invariant(!monitor.didDrop(), 'Cannot call hover after drop.');

    for (var i = 0; i < targetIds.length; i++) {
      var targetId = targetIds[i];
      invariant(targetIds.lastIndexOf(targetId) === i, 'Expected targetIds to be unique in the passed array.');
      var target = registry.getTarget(targetId);
      invariant(target, 'Expected targetIds to be registered.');
    }
  }

  function removeNonMatchingTargetIds(targetIds, registry, draggedItemType) {
    // Remove those targetIds that don't match the targetType.  This
    // fixes shallow isOver which would only be non-shallow because of
    // non-matching targets.
    for (var i = targetIds.length - 1; i >= 0; i--) {
      var targetId = targetIds[i];
      var targetType = registry.getTargetType(targetId);

      if (!matchesType(targetType, draggedItemType)) {
        targetIds.splice(i, 1);
      }
    }
  }

  function hoverAllTargets(targetIds, monitor, registry) {
    // Finally call hover on all matching targets.
    targetIds.forEach(function (targetId) {
      var target = registry.getTarget(targetId);
      target.hover(monitor, targetId);
    });
  }

  function ownKeys$3(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

  function _objectSpread$3(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$3(Object(source), true).forEach(function (key) { _defineProperty$h(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$3(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

  function _defineProperty$h(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
  function createDrop(manager) {
    return function drop() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var monitor = manager.getMonitor();
      var registry = manager.getRegistry();
      verifyInvariants(monitor);
      var targetIds = getDroppableTargets(monitor); // Multiple actions are dispatched here, which is why this doesn't return an action

      targetIds.forEach(function (targetId, index) {
        var dropResult = determineDropResult(targetId, index, registry, monitor);
        var action = {
          type: DROP,
          payload: {
            dropResult: _objectSpread$3(_objectSpread$3({}, options), dropResult)
          }
        };
        manager.dispatch(action);
      });
    };
  }

  function verifyInvariants(monitor) {
    invariant(monitor.isDragging(), 'Cannot call drop while not dragging.');
    invariant(!monitor.didDrop(), 'Cannot call drop twice during one drag operation.');
  }

  function determineDropResult(targetId, index, registry, monitor) {
    var target = registry.getTarget(targetId);
    var dropResult = target ? target.drop(monitor, targetId) : undefined;
    verifyDropResultType(dropResult);

    if (typeof dropResult === 'undefined') {
      dropResult = index === 0 ? {} : monitor.getDropResult();
    }

    return dropResult;
  }

  function verifyDropResultType(dropResult) {
    invariant(typeof dropResult === 'undefined' || isObject(dropResult), 'Drop result must either be an object or undefined.');
  }

  function getDroppableTargets(monitor) {
    var targetIds = monitor.getTargetIds().filter(monitor.canDropOnTarget, monitor);
    targetIds.reverse();
    return targetIds;
  }

  function createEndDrag(manager) {
    return function endDrag() {
      var monitor = manager.getMonitor();
      var registry = manager.getRegistry();
      verifyIsDragging(monitor);
      var sourceId = monitor.getSourceId();

      if (sourceId != null) {
        var source = registry.getSource(sourceId, true);
        source.endDrag(monitor, sourceId);
        registry.unpinSource();
      }

      return {
        type: END_DRAG
      };
    };
  }

  function verifyIsDragging(monitor) {
    invariant(monitor.isDragging(), 'Cannot call endDrag while not dragging.');
  }

  function createDragDropActions(manager) {
    return {
      beginDrag: createBeginDrag(manager),
      publishDragSource: createPublishDragSource(manager),
      hover: createHover(manager),
      drop: createDrop(manager),
      endDrag: createEndDrag(manager)
    };
  }

  function _classCallCheck$d(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties$d(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass$d(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties$d(Constructor.prototype, protoProps); if (staticProps) _defineProperties$d(Constructor, staticProps); return Constructor; }

  function _defineProperty$g(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
  var DragDropManagerImpl = /*#__PURE__*/function () {
    function DragDropManagerImpl(store, monitor) {
      var _this = this;

      _classCallCheck$d(this, DragDropManagerImpl);

      _defineProperty$g(this, "store", void 0);

      _defineProperty$g(this, "monitor", void 0);

      _defineProperty$g(this, "backend", void 0);

      _defineProperty$g(this, "isSetUp", false);

      _defineProperty$g(this, "handleRefCountChange", function () {
        var shouldSetUp = _this.store.getState().refCount > 0;

        if (_this.backend) {
          if (shouldSetUp && !_this.isSetUp) {
            _this.backend.setup();

            _this.isSetUp = true;
          } else if (!shouldSetUp && _this.isSetUp) {
            _this.backend.teardown();

            _this.isSetUp = false;
          }
        }
      });

      this.store = store;
      this.monitor = monitor;
      store.subscribe(this.handleRefCountChange);
    }

    _createClass$d(DragDropManagerImpl, [{
      key: "receiveBackend",
      value: function receiveBackend(backend) {
        this.backend = backend;
      }
    }, {
      key: "getMonitor",
      value: function getMonitor() {
        return this.monitor;
      }
    }, {
      key: "getBackend",
      value: function getBackend() {
        return this.backend;
      }
    }, {
      key: "getRegistry",
      value: function getRegistry() {
        return this.monitor.registry;
      }
    }, {
      key: "getActions",
      value: function getActions() {
        /* eslint-disable-next-line @typescript-eslint/no-this-alias */
        var manager = this;
        var dispatch = this.store.dispatch;

        function bindActionCreator(actionCreator) {
          return function () {
            for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
              args[_key] = arguments[_key];
            }

            var action = actionCreator.apply(manager, args);

            if (typeof action !== 'undefined') {
              dispatch(action);
            }
          };
        }

        var actions = createDragDropActions(this);
        return Object.keys(actions).reduce(function (boundActions, key) {
          var action = actions[key];
          boundActions[key] = bindActionCreator(action);
          return boundActions;
        }, {});
      }
    }, {
      key: "dispatch",
      value: function dispatch(action) {
        this.store.dispatch(action);
      }
    }]);

    return DragDropManagerImpl;
  }();

  // Inlined version of the `symbol-observable` polyfill
  var $$observable = (function () {
    return typeof Symbol === 'function' && Symbol.observable || '@@observable';
  })();

  /**
   * These are private action types reserved by Redux.
   * For any unknown actions, you must return the current state.
   * If the current state is undefined, you must return the initial state.
   * Do not reference these action types directly in your code.
   */
  var randomString = function randomString() {
    return Math.random().toString(36).substring(7).split('').join('.');
  };

  var ActionTypes = {
    INIT: "@@redux/INIT" + randomString(),
    REPLACE: "@@redux/REPLACE" + randomString(),
    PROBE_UNKNOWN_ACTION: function PROBE_UNKNOWN_ACTION() {
      return "@@redux/PROBE_UNKNOWN_ACTION" + randomString();
    }
  };

  /**
   * @param {any} obj The object to inspect.
   * @returns {boolean} True if the argument appears to be a plain object.
   */
  function isPlainObject$1(obj) {
    if (typeof obj !== 'object' || obj === null) return false;
    var proto = obj;

    while (Object.getPrototypeOf(proto) !== null) {
      proto = Object.getPrototypeOf(proto);
    }

    return Object.getPrototypeOf(obj) === proto;
  }

  // Inlined / shortened version of `kindOf` from https://github.com/jonschlinkert/kind-of
  function miniKindOf(val) {
    if (val === void 0) return 'undefined';
    if (val === null) return 'null';
    var type = typeof val;

    switch (type) {
      case 'boolean':
      case 'string':
      case 'number':
      case 'symbol':
      case 'function':
        {
          return type;
        }
    }

    if (Array.isArray(val)) return 'array';
    if (isDate(val)) return 'date';
    if (isError(val)) return 'error';
    var constructorName = ctorName(val);

    switch (constructorName) {
      case 'Symbol':
      case 'Promise':
      case 'WeakMap':
      case 'WeakSet':
      case 'Map':
      case 'Set':
        return constructorName;
    } // other


    return type.slice(8, -1).toLowerCase().replace(/\s/g, '');
  }

  function ctorName(val) {
    return typeof val.constructor === 'function' ? val.constructor.name : null;
  }

  function isError(val) {
    return val instanceof Error || typeof val.message === 'string' && val.constructor && typeof val.constructor.stackTraceLimit === 'number';
  }

  function isDate(val) {
    if (val instanceof Date) return true;
    return typeof val.toDateString === 'function' && typeof val.getDate === 'function' && typeof val.setDate === 'function';
  }

  function kindOf(val) {
    var typeOfVal = typeof val;

    {
      typeOfVal = miniKindOf(val);
    }

    return typeOfVal;
  }

  /**
   * Creates a Redux store that holds the state tree.
   * The only way to change the data in the store is to call `dispatch()` on it.
   *
   * There should only be a single store in your app. To specify how different
   * parts of the state tree respond to actions, you may combine several reducers
   * into a single reducer function by using `combineReducers`.
   *
   * @param {Function} reducer A function that returns the next state tree, given
   * the current state tree and the action to handle.
   *
   * @param {any} [preloadedState] The initial state. You may optionally specify it
   * to hydrate the state from the server in universal apps, or to restore a
   * previously serialized user session.
   * If you use `combineReducers` to produce the root reducer function, this must be
   * an object with the same shape as `combineReducers` keys.
   *
   * @param {Function} [enhancer] The store enhancer. You may optionally specify it
   * to enhance the store with third-party capabilities such as middleware,
   * time travel, persistence, etc. The only store enhancer that ships with Redux
   * is `applyMiddleware()`.
   *
   * @returns {Store} A Redux store that lets you read the state, dispatch actions
   * and subscribe to changes.
   */

  function createStore(reducer, preloadedState, enhancer) {
    var _ref2;

    if (typeof preloadedState === 'function' && typeof enhancer === 'function' || typeof enhancer === 'function' && typeof arguments[3] === 'function') {
      throw new Error('It looks like you are passing several store enhancers to ' + 'createStore(). This is not supported. Instead, compose them ' + 'together to a single function. See https://redux.js.org/tutorials/fundamentals/part-4-store#creating-a-store-with-enhancers for an example.');
    }

    if (typeof preloadedState === 'function' && typeof enhancer === 'undefined') {
      enhancer = preloadedState;
      preloadedState = undefined;
    }

    if (typeof enhancer !== 'undefined') {
      if (typeof enhancer !== 'function') {
        throw new Error("Expected the enhancer to be a function. Instead, received: '" + kindOf(enhancer) + "'");
      }

      return enhancer(createStore)(reducer, preloadedState);
    }

    if (typeof reducer !== 'function') {
      throw new Error("Expected the root reducer to be a function. Instead, received: '" + kindOf(reducer) + "'");
    }

    var currentReducer = reducer;
    var currentState = preloadedState;
    var currentListeners = [];
    var nextListeners = currentListeners;
    var isDispatching = false;
    /**
     * This makes a shallow copy of currentListeners so we can use
     * nextListeners as a temporary list while dispatching.
     *
     * This prevents any bugs around consumers calling
     * subscribe/unsubscribe in the middle of a dispatch.
     */

    function ensureCanMutateNextListeners() {
      if (nextListeners === currentListeners) {
        nextListeners = currentListeners.slice();
      }
    }
    /**
     * Reads the state tree managed by the store.
     *
     * @returns {any} The current state tree of your application.
     */


    function getState() {
      if (isDispatching) {
        throw new Error('You may not call store.getState() while the reducer is executing. ' + 'The reducer has already received the state as an argument. ' + 'Pass it down from the top reducer instead of reading it from the store.');
      }

      return currentState;
    }
    /**
     * Adds a change listener. It will be called any time an action is dispatched,
     * and some part of the state tree may potentially have changed. You may then
     * call `getState()` to read the current state tree inside the callback.
     *
     * You may call `dispatch()` from a change listener, with the following
     * caveats:
     *
     * 1. The subscriptions are snapshotted just before every `dispatch()` call.
     * If you subscribe or unsubscribe while the listeners are being invoked, this
     * will not have any effect on the `dispatch()` that is currently in progress.
     * However, the next `dispatch()` call, whether nested or not, will use a more
     * recent snapshot of the subscription list.
     *
     * 2. The listener should not expect to see all state changes, as the state
     * might have been updated multiple times during a nested `dispatch()` before
     * the listener is called. It is, however, guaranteed that all subscribers
     * registered before the `dispatch()` started will be called with the latest
     * state by the time it exits.
     *
     * @param {Function} listener A callback to be invoked on every dispatch.
     * @returns {Function} A function to remove this change listener.
     */


    function subscribe(listener) {
      if (typeof listener !== 'function') {
        throw new Error("Expected the listener to be a function. Instead, received: '" + kindOf(listener) + "'");
      }

      if (isDispatching) {
        throw new Error('You may not call store.subscribe() while the reducer is executing. ' + 'If you would like to be notified after the store has been updated, subscribe from a ' + 'component and invoke store.getState() in the callback to access the latest state. ' + 'See https://redux.js.org/api/store#subscribelistener for more details.');
      }

      var isSubscribed = true;
      ensureCanMutateNextListeners();
      nextListeners.push(listener);
      return function unsubscribe() {
        if (!isSubscribed) {
          return;
        }

        if (isDispatching) {
          throw new Error('You may not unsubscribe from a store listener while the reducer is executing. ' + 'See https://redux.js.org/api/store#subscribelistener for more details.');
        }

        isSubscribed = false;
        ensureCanMutateNextListeners();
        var index = nextListeners.indexOf(listener);
        nextListeners.splice(index, 1);
        currentListeners = null;
      };
    }
    /**
     * Dispatches an action. It is the only way to trigger a state change.
     *
     * The `reducer` function, used to create the store, will be called with the
     * current state tree and the given `action`. Its return value will
     * be considered the **next** state of the tree, and the change listeners
     * will be notified.
     *
     * The base implementation only supports plain object actions. If you want to
     * dispatch a Promise, an Observable, a thunk, or something else, you need to
     * wrap your store creating function into the corresponding middleware. For
     * example, see the documentation for the `redux-thunk` package. Even the
     * middleware will eventually dispatch plain object actions using this method.
     *
     * @param {Object} action A plain object representing “what changed”. It is
     * a good idea to keep actions serializable so you can record and replay user
     * sessions, or use the time travelling `redux-devtools`. An action must have
     * a `type` property which may not be `undefined`. It is a good idea to use
     * string constants for action types.
     *
     * @returns {Object} For convenience, the same action object you dispatched.
     *
     * Note that, if you use a custom middleware, it may wrap `dispatch()` to
     * return something else (for example, a Promise you can await).
     */


    function dispatch(action) {
      if (!isPlainObject$1(action)) {
        throw new Error("Actions must be plain objects. Instead, the actual type was: '" + kindOf(action) + "'. You may need to add middleware to your store setup to handle dispatching other values, such as 'redux-thunk' to handle dispatching functions. See https://redux.js.org/tutorials/fundamentals/part-4-store#middleware and https://redux.js.org/tutorials/fundamentals/part-6-async-logic#using-the-redux-thunk-middleware for examples.");
      }

      if (typeof action.type === 'undefined') {
        throw new Error('Actions may not have an undefined "type" property. You may have misspelled an action type string constant.');
      }

      if (isDispatching) {
        throw new Error('Reducers may not dispatch actions.');
      }

      try {
        isDispatching = true;
        currentState = currentReducer(currentState, action);
      } finally {
        isDispatching = false;
      }

      var listeners = currentListeners = nextListeners;

      for (var i = 0; i < listeners.length; i++) {
        var listener = listeners[i];
        listener();
      }

      return action;
    }
    /**
     * Replaces the reducer currently used by the store to calculate the state.
     *
     * You might need this if your app implements code splitting and you want to
     * load some of the reducers dynamically. You might also need this if you
     * implement a hot reloading mechanism for Redux.
     *
     * @param {Function} nextReducer The reducer for the store to use instead.
     * @returns {void}
     */


    function replaceReducer(nextReducer) {
      if (typeof nextReducer !== 'function') {
        throw new Error("Expected the nextReducer to be a function. Instead, received: '" + kindOf(nextReducer));
      }

      currentReducer = nextReducer; // This action has a similiar effect to ActionTypes.INIT.
      // Any reducers that existed in both the new and old rootReducer
      // will receive the previous state. This effectively populates
      // the new state tree with any relevant data from the old one.

      dispatch({
        type: ActionTypes.REPLACE
      });
    }
    /**
     * Interoperability point for observable/reactive libraries.
     * @returns {observable} A minimal observable of state changes.
     * For more information, see the observable proposal:
     * https://github.com/tc39/proposal-observable
     */


    function observable() {
      var _ref;

      var outerSubscribe = subscribe;
      return _ref = {
        /**
         * The minimal observable subscription method.
         * @param {Object} observer Any object that can be used as an observer.
         * The observer object should have a `next` method.
         * @returns {subscription} An object with an `unsubscribe` method that can
         * be used to unsubscribe the observable from the store, and prevent further
         * emission of values from the observable.
         */
        subscribe: function subscribe(observer) {
          if (typeof observer !== 'object' || observer === null) {
            throw new Error("Expected the observer to be an object. Instead, received: '" + kindOf(observer) + "'");
          }

          function observeState() {
            if (observer.next) {
              observer.next(getState());
            }
          }

          observeState();
          var unsubscribe = outerSubscribe(observeState);
          return {
            unsubscribe: unsubscribe
          };
        }
      }, _ref[$$observable] = function () {
        return this;
      }, _ref;
    } // When a store is created, an "INIT" action is dispatched so that every
    // reducer returns their initial state. This effectively populates
    // the initial state tree.


    dispatch({
      type: ActionTypes.INIT
    });
    return _ref2 = {
      dispatch: dispatch,
      subscribe: subscribe,
      getState: getState,
      replaceReducer: replaceReducer
    }, _ref2[$$observable] = observable, _ref2;
  }

  /**
   * Prints a warning in the console if it exists.
   *
   * @param {String} message The warning message.
   * @returns {void}
   */
  function warning(message) {
    /* eslint-disable no-console */
    if (typeof console !== 'undefined' && typeof console.error === 'function') {
      console.error(message);
    }
    /* eslint-enable no-console */


    try {
      // This error was thrown as a convenience so that if you enable
      // "break on all exceptions" in your console,
      // it would pause the execution at this line.
      throw new Error(message);
    } catch (e) {} // eslint-disable-line no-empty

  }

  /*
   * This is a dummy function to check if the function name has been altered by minification.
   * If the function has been minified and NODE_ENV !== 'production', warn the user.
   */

  function isCrushed() {}

  if (typeof isCrushed.name === 'string' && isCrushed.name !== 'isCrushed') {
    warning('You are currently using minified code outside of NODE_ENV === "production". ' + 'This means that you are running a slower development build of Redux. ' + 'You can use loose-envify (https://github.com/zertosh/loose-envify) for browserify ' + 'or setting mode to production in webpack (https://webpack.js.org/concepts/mode/) ' + 'to ensure you have the correct code for your production build.');
  }

  var strictEquality = function strictEquality(a, b) {
    return a === b;
  };
  /**
   * Determine if two cartesian coordinate offsets are equal
   * @param offsetA
   * @param offsetB
   */

  function areCoordsEqual(offsetA, offsetB) {
    if (!offsetA && !offsetB) {
      return true;
    } else if (!offsetA || !offsetB) {
      return false;
    } else {
      return offsetA.x === offsetB.x && offsetA.y === offsetB.y;
    }
  }
  /**
   * Determines if two arrays of items are equal
   * @param a The first array of items
   * @param b The second array of items
   */

  function areArraysEqual(a, b) {
    var isEqual = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : strictEquality;

    if (a.length !== b.length) {
      return false;
    }

    for (var i = 0; i < a.length; ++i) {
      if (!isEqual(a[i], b[i])) {
        return false;
      }
    }

    return true;
  }

  function ownKeys$2(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

  function _objectSpread$2(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$2(Object(source), true).forEach(function (key) { _defineProperty$f(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$2(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

  function _defineProperty$f(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
  var initialState$1 = {
    initialSourceClientOffset: null,
    initialClientOffset: null,
    clientOffset: null
  };
  function reduce$5() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState$1;
    var action = arguments.length > 1 ? arguments[1] : undefined;
    var payload = action.payload;

    switch (action.type) {
      case INIT_COORDS:
      case BEGIN_DRAG:
        return {
          initialSourceClientOffset: payload.sourceClientOffset,
          initialClientOffset: payload.clientOffset,
          clientOffset: payload.clientOffset
        };

      case HOVER:
        if (areCoordsEqual(state.clientOffset, payload.clientOffset)) {
          return state;
        }

        return _objectSpread$2(_objectSpread$2({}, state), {}, {
          clientOffset: payload.clientOffset
        });

      case END_DRAG:
      case DROP:
        return initialState$1;

      default:
        return state;
    }
  }

  var ADD_SOURCE = 'dnd-core/ADD_SOURCE';
  var ADD_TARGET = 'dnd-core/ADD_TARGET';
  var REMOVE_SOURCE = 'dnd-core/REMOVE_SOURCE';
  var REMOVE_TARGET = 'dnd-core/REMOVE_TARGET';
  function addSource(sourceId) {
    return {
      type: ADD_SOURCE,
      payload: {
        sourceId: sourceId
      }
    };
  }
  function addTarget(targetId) {
    return {
      type: ADD_TARGET,
      payload: {
        targetId: targetId
      }
    };
  }
  function removeSource(sourceId) {
    return {
      type: REMOVE_SOURCE,
      payload: {
        sourceId: sourceId
      }
    };
  }
  function removeTarget(targetId) {
    return {
      type: REMOVE_TARGET,
      payload: {
        targetId: targetId
      }
    };
  }

  function ownKeys$1(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

  function _objectSpread$1(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$1(Object(source), true).forEach(function (key) { _defineProperty$e(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$1(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

  function _defineProperty$e(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
  var initialState = {
    itemType: null,
    item: null,
    sourceId: null,
    targetIds: [],
    dropResult: null,
    didDrop: false,
    isSourcePublic: null
  };
  function reduce$4() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
    var action = arguments.length > 1 ? arguments[1] : undefined;
    var payload = action.payload;

    switch (action.type) {
      case BEGIN_DRAG:
        return _objectSpread$1(_objectSpread$1({}, state), {}, {
          itemType: payload.itemType,
          item: payload.item,
          sourceId: payload.sourceId,
          isSourcePublic: payload.isSourcePublic,
          dropResult: null,
          didDrop: false
        });

      case PUBLISH_DRAG_SOURCE:
        return _objectSpread$1(_objectSpread$1({}, state), {}, {
          isSourcePublic: true
        });

      case HOVER:
        return _objectSpread$1(_objectSpread$1({}, state), {}, {
          targetIds: payload.targetIds
        });

      case REMOVE_TARGET:
        if (state.targetIds.indexOf(payload.targetId) === -1) {
          return state;
        }

        return _objectSpread$1(_objectSpread$1({}, state), {}, {
          targetIds: without(state.targetIds, payload.targetId)
        });

      case DROP:
        return _objectSpread$1(_objectSpread$1({}, state), {}, {
          dropResult: payload.dropResult,
          didDrop: true,
          targetIds: []
        });

      case END_DRAG:
        return _objectSpread$1(_objectSpread$1({}, state), {}, {
          itemType: null,
          item: null,
          sourceId: null,
          dropResult: null,
          didDrop: false,
          isSourcePublic: null,
          targetIds: []
        });

      default:
        return state;
    }
  }

  function reduce$3() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var action = arguments.length > 1 ? arguments[1] : undefined;

    switch (action.type) {
      case ADD_SOURCE:
      case ADD_TARGET:
        return state + 1;

      case REMOVE_SOURCE:
      case REMOVE_TARGET:
        return state - 1;

      default:
        return state;
    }
  }

  var NONE = [];
  var ALL = [];
  NONE.__IS_NONE__ = true;
  ALL.__IS_ALL__ = true;
  /**
   * Determines if the given handler IDs are dirty or not.
   *
   * @param dirtyIds The set of dirty handler ids
   * @param handlerIds The set of handler ids to check
   */

  function areDirty(dirtyIds, handlerIds) {
    if (dirtyIds === NONE) {
      return false;
    }

    if (dirtyIds === ALL || typeof handlerIds === 'undefined') {
      return true;
    }

    var commonIds = intersection(handlerIds, dirtyIds);
    return commonIds.length > 0;
  }

  function reduce$2() {

    var action = arguments.length > 1 ? arguments[1] : undefined;

    switch (action.type) {
      case HOVER:
        break;

      case ADD_SOURCE:
      case ADD_TARGET:
      case REMOVE_TARGET:
      case REMOVE_SOURCE:
        return NONE;

      case BEGIN_DRAG:
      case PUBLISH_DRAG_SOURCE:
      case END_DRAG:
      case DROP:
      default:
        return ALL;
    }

    var _action$payload = action.payload,
        _action$payload$targe = _action$payload.targetIds,
        targetIds = _action$payload$targe === void 0 ? [] : _action$payload$targe,
        _action$payload$prevT = _action$payload.prevTargetIds,
        prevTargetIds = _action$payload$prevT === void 0 ? [] : _action$payload$prevT;
    var result = xor(targetIds, prevTargetIds);
    var didChange = result.length > 0 || !areArraysEqual(targetIds, prevTargetIds);

    if (!didChange) {
      return NONE;
    } // Check the target ids at the innermost position. If they are valid, add them
    // to the result


    var prevInnermostTargetId = prevTargetIds[prevTargetIds.length - 1];
    var innermostTargetId = targetIds[targetIds.length - 1];

    if (prevInnermostTargetId !== innermostTargetId) {
      if (prevInnermostTargetId) {
        result.push(prevInnermostTargetId);
      }

      if (innermostTargetId) {
        result.push(innermostTargetId);
      }
    }

    return result;
  }

  function reduce$1() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    return state + 1;
  }

  function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

  function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty$d(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

  function _defineProperty$d(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
  function reduce() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var action = arguments.length > 1 ? arguments[1] : undefined;
    return {
      dirtyHandlerIds: reduce$2(state.dirtyHandlerIds, {
        type: action.type,
        payload: _objectSpread(_objectSpread({}, action.payload), {}, {
          prevTargetIds: get(state, 'dragOperation.targetIds', [])
        })
      }),
      dragOffset: reduce$5(state.dragOffset, action),
      refCount: reduce$3(state.refCount, action),
      dragOperation: reduce$4(state.dragOperation, action),
      stateId: reduce$1(state.stateId)
    };
  }

  /**
   * Coordinate addition
   * @param a The first coordinate
   * @param b The second coordinate
   */
  function add(a, b) {
    return {
      x: a.x + b.x,
      y: a.y + b.y
    };
  }
  /**
   * Coordinate subtraction
   * @param a The first coordinate
   * @param b The second coordinate
   */

  function subtract(a, b) {
    return {
      x: a.x - b.x,
      y: a.y - b.y
    };
  }
  /**
   * Returns the cartesian distance of the drag source component's position, based on its position
   * at the time when the current drag operation has started, and the movement difference.
   *
   * Returns null if no item is being dragged.
   *
   * @param state The offset state to compute from
   */

  function getSourceClientOffset(state) {
    var clientOffset = state.clientOffset,
        initialClientOffset = state.initialClientOffset,
        initialSourceClientOffset = state.initialSourceClientOffset;

    if (!clientOffset || !initialClientOffset || !initialSourceClientOffset) {
      return null;
    }

    return subtract(add(clientOffset, initialSourceClientOffset), initialClientOffset);
  }
  /**
   * Determines the x,y offset between the client offset and the initial client offset
   *
   * @param state The offset state to compute from
   */

  function getDifferenceFromInitialOffset(state) {
    var clientOffset = state.clientOffset,
        initialClientOffset = state.initialClientOffset;

    if (!clientOffset || !initialClientOffset) {
      return null;
    }

    return subtract(clientOffset, initialClientOffset);
  }

  function _classCallCheck$c(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties$c(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass$c(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties$c(Constructor.prototype, protoProps); if (staticProps) _defineProperties$c(Constructor, staticProps); return Constructor; }

  function _defineProperty$c(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
  var DragDropMonitorImpl = /*#__PURE__*/function () {
    function DragDropMonitorImpl(store, registry) {
      _classCallCheck$c(this, DragDropMonitorImpl);

      _defineProperty$c(this, "store", void 0);

      _defineProperty$c(this, "registry", void 0);

      this.store = store;
      this.registry = registry;
    }

    _createClass$c(DragDropMonitorImpl, [{
      key: "subscribeToStateChange",
      value: function subscribeToStateChange(listener) {
        var _this = this;

        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
          handlerIds: undefined
        };
        var handlerIds = options.handlerIds;
        invariant(typeof listener === 'function', 'listener must be a function.');
        invariant(typeof handlerIds === 'undefined' || Array.isArray(handlerIds), 'handlerIds, when specified, must be an array of strings.');
        var prevStateId = this.store.getState().stateId;

        var handleChange = function handleChange() {
          var state = _this.store.getState();

          var currentStateId = state.stateId;

          try {
            var canSkipListener = currentStateId === prevStateId || currentStateId === prevStateId + 1 && !areDirty(state.dirtyHandlerIds, handlerIds);

            if (!canSkipListener) {
              listener();
            }
          } finally {
            prevStateId = currentStateId;
          }
        };

        return this.store.subscribe(handleChange);
      }
    }, {
      key: "subscribeToOffsetChange",
      value: function subscribeToOffsetChange(listener) {
        var _this2 = this;

        invariant(typeof listener === 'function', 'listener must be a function.');
        var previousState = this.store.getState().dragOffset;

        var handleChange = function handleChange() {
          var nextState = _this2.store.getState().dragOffset;

          if (nextState === previousState) {
            return;
          }

          previousState = nextState;
          listener();
        };

        return this.store.subscribe(handleChange);
      }
    }, {
      key: "canDragSource",
      value: function canDragSource(sourceId) {
        if (!sourceId) {
          return false;
        }

        var source = this.registry.getSource(sourceId);
        invariant(source, "Expected to find a valid source. sourceId=".concat(sourceId));

        if (this.isDragging()) {
          return false;
        }

        return source.canDrag(this, sourceId);
      }
    }, {
      key: "canDropOnTarget",
      value: function canDropOnTarget(targetId) {
        // undefined on initial render
        if (!targetId) {
          return false;
        }

        var target = this.registry.getTarget(targetId);
        invariant(target, "Expected to find a valid target. targetId=".concat(targetId));

        if (!this.isDragging() || this.didDrop()) {
          return false;
        }

        var targetType = this.registry.getTargetType(targetId);
        var draggedItemType = this.getItemType();
        return matchesType(targetType, draggedItemType) && target.canDrop(this, targetId);
      }
    }, {
      key: "isDragging",
      value: function isDragging() {
        return Boolean(this.getItemType());
      }
    }, {
      key: "isDraggingSource",
      value: function isDraggingSource(sourceId) {
        // undefined on initial render
        if (!sourceId) {
          return false;
        }

        var source = this.registry.getSource(sourceId, true);
        invariant(source, "Expected to find a valid source. sourceId=".concat(sourceId));

        if (!this.isDragging() || !this.isSourcePublic()) {
          return false;
        }

        var sourceType = this.registry.getSourceType(sourceId);
        var draggedItemType = this.getItemType();

        if (sourceType !== draggedItemType) {
          return false;
        }

        return source.isDragging(this, sourceId);
      }
    }, {
      key: "isOverTarget",
      value: function isOverTarget(targetId) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
          shallow: false
        };

        // undefined on initial render
        if (!targetId) {
          return false;
        }

        var shallow = options.shallow;

        if (!this.isDragging()) {
          return false;
        }

        var targetType = this.registry.getTargetType(targetId);
        var draggedItemType = this.getItemType();

        if (draggedItemType && !matchesType(targetType, draggedItemType)) {
          return false;
        }

        var targetIds = this.getTargetIds();

        if (!targetIds.length) {
          return false;
        }

        var index = targetIds.indexOf(targetId);

        if (shallow) {
          return index === targetIds.length - 1;
        } else {
          return index > -1;
        }
      }
    }, {
      key: "getItemType",
      value: function getItemType() {
        return this.store.getState().dragOperation.itemType;
      }
    }, {
      key: "getItem",
      value: function getItem() {
        return this.store.getState().dragOperation.item;
      }
    }, {
      key: "getSourceId",
      value: function getSourceId() {
        return this.store.getState().dragOperation.sourceId;
      }
    }, {
      key: "getTargetIds",
      value: function getTargetIds() {
        return this.store.getState().dragOperation.targetIds;
      }
    }, {
      key: "getDropResult",
      value: function getDropResult() {
        return this.store.getState().dragOperation.dropResult;
      }
    }, {
      key: "didDrop",
      value: function didDrop() {
        return this.store.getState().dragOperation.didDrop;
      }
    }, {
      key: "isSourcePublic",
      value: function isSourcePublic() {
        return Boolean(this.store.getState().dragOperation.isSourcePublic);
      }
    }, {
      key: "getInitialClientOffset",
      value: function getInitialClientOffset() {
        return this.store.getState().dragOffset.initialClientOffset;
      }
    }, {
      key: "getInitialSourceClientOffset",
      value: function getInitialSourceClientOffset() {
        return this.store.getState().dragOffset.initialSourceClientOffset;
      }
    }, {
      key: "getClientOffset",
      value: function getClientOffset() {
        return this.store.getState().dragOffset.clientOffset;
      }
    }, {
      key: "getSourceClientOffset",
      value: function getSourceClientOffset$1() {
        return getSourceClientOffset(this.store.getState().dragOffset);
      }
    }, {
      key: "getDifferenceFromInitialOffset",
      value: function getDifferenceFromInitialOffset$1() {
        return getDifferenceFromInitialOffset(this.store.getState().dragOffset);
      }
    }]);

    return DragDropMonitorImpl;
  }();

  var nextUniqueId = 0;
  function getNextUniqueId() {
    return nextUniqueId++;
  }

  function _typeof$5(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof$5 = function _typeof(obj) { return typeof obj; }; } else { _typeof$5 = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof$5(obj); }
  function validateSourceContract(source) {
    invariant(typeof source.canDrag === 'function', 'Expected canDrag to be a function.');
    invariant(typeof source.beginDrag === 'function', 'Expected beginDrag to be a function.');
    invariant(typeof source.endDrag === 'function', 'Expected endDrag to be a function.');
  }
  function validateTargetContract(target) {
    invariant(typeof target.canDrop === 'function', 'Expected canDrop to be a function.');
    invariant(typeof target.hover === 'function', 'Expected hover to be a function.');
    invariant(typeof target.drop === 'function', 'Expected beginDrag to be a function.');
  }
  function validateType(type, allowArray) {
    if (allowArray && Array.isArray(type)) {
      type.forEach(function (t) {
        return validateType(t, false);
      });
      return;
    }

    invariant(typeof type === 'string' || _typeof$5(type) === 'symbol', allowArray ? 'Type can only be a string, a symbol, or an array of either.' : 'Type can only be a string or a symbol.');
  }

  // Use the fastest means possible to execute a task in its own turn, with
  // priority over other events including IO, animation, reflow, and redraw
  // events in browsers.
  //
  // An exception thrown by a task will permanently interrupt the processing of
  // subsequent tasks. The higher level `asap` function ensures that if an
  // exception is thrown by a task, that the task queue will continue flushing as
  // soon as possible, but if you use `rawAsap` directly, you are responsible to
  // either ensure that no exceptions are thrown from your task, or to manually
  // call `rawAsap.requestFlush` if an exception is thrown.
  function rawAsap(task) {
    if (!queue.length) {
      requestFlush();
    } // Equivalent to push, but avoids a function call.


    queue[queue.length] = task;
  }
  var queue = []; // Once a flush has been requested, no further calls to `requestFlush` are
  // off a `flush` event as quickly as possible. `flush` will attempt to exhaust
  // the event queue before yielding to the browser's own event loop.

  var requestFlush; // The position of the next task to execute in the task queue. This is
  // preserved between calls to `flush` so that it can be resumed if
  // a task throws an exception.

  var index = 0; // If a task schedules additional tasks recursively, the task queue can grow
  // unbounded. To prevent memory exhaustion, the task queue will periodically
  // truncate already-completed tasks.

  var capacity = 1024; // The flush function processes all tasks that have been scheduled with
  // `rawAsap` unless and until one of those tasks throws an exception.
  // If a task throws an exception, `flush` ensures that its state will remain
  // consistent and will resume where it left off when called again.
  // However, `flush` does not make any arrangements to be called again if an
  // exception is thrown.

  function flush() {
    while (index < queue.length) {
      var currentIndex = index; // Advance the index before calling the task. This ensures that we will
      // begin flushing on the next task the task throws an error.

      index = index + 1;
      queue[currentIndex].call(); // Prevent leaking memory for long chains of recursive calls to `asap`.
      // If we call `asap` within tasks scheduled by `asap`, the queue will
      // grow, but to avoid an O(n) walk for every task we execute, we don't
      // shift tasks off the queue after they have been executed.
      // Instead, we periodically shift 1024 tasks off the queue.

      if (index > capacity) {
        // Manually shift all values starting at the index back to the
        // beginning of the queue.
        for (var scan = 0, newLength = queue.length - index; scan < newLength; scan++) {
          queue[scan] = queue[scan + index];
        }

        queue.length -= index;
        index = 0;
      }
    }

    queue.length = 0;
    index = 0;
  } // `requestFlush` is implemented using a strategy based on data collected from
  // every available SauceLabs Selenium web driver worker at time of writing.
  // https://docs.google.com/spreadsheets/d/1mG-5UYGup5qxGdEMWkhP6BWCz053NUb2E1QoUTU16uA/edit#gid=783724593
  // Safari 6 and 6.1 for desktop, iPad, and iPhone are the only browsers that
  // have WebKitMutationObserver but not un-prefixed MutationObserver.
  // Must use `global` or `self` instead of `window` to work in both frames and web
  // workers. `global` is a provision of Browserify, Mr, Mrs, or Mop.

  /* globals self */


  var scope = typeof global !== 'undefined' ? global : self;
  var BrowserMutationObserver = scope.MutationObserver || scope.WebKitMutationObserver; // MutationObservers are desirable because they have high priority and work
  // reliably everywhere they are implemented.
  // They are implemented in all modern browsers.
  //
  // - Android 4-4.3
  // - Chrome 26-34
  // - Firefox 14-29
  // - Internet Explorer 11
  // - iPad Safari 6-7.1
  // - iPhone Safari 7-7.1
  // - Safari 6-7

  if (typeof BrowserMutationObserver === 'function') {
    requestFlush = makeRequestCallFromMutationObserver(flush); // MessageChannels are desirable because they give direct access to the HTML
    // task queue, are implemented in Internet Explorer 10, Safari 5.0-1, and Opera
    // 11-12, and in web workers in many engines.
    // Although message channels yield to any queued rendering and IO tasks, they
    // would be better than imposing the 4ms delay of timers.
    // However, they do not work reliably in Internet Explorer or Safari.
    // Internet Explorer 10 is the only browser that has setImmediate but does
    // not have MutationObservers.
    // Although setImmediate yields to the browser's renderer, it would be
    // preferrable to falling back to setTimeout since it does not have
    // the minimum 4ms penalty.
    // Unfortunately there appears to be a bug in Internet Explorer 10 Mobile (and
    // Desktop to a lesser extent) that renders both setImmediate and
    // MessageChannel useless for the purposes of ASAP.
    // https://github.com/kriskowal/q/issues/396
    // Timers are implemented universally.
    // We fall back to timers in workers in most engines, and in foreground
    // contexts in the following browsers.
    // However, note that even this simple case requires nuances to operate in a
    // broad spectrum of browsers.
    //
    // - Firefox 3-13
    // - Internet Explorer 6-9
    // - iPad Safari 4.3
    // - Lynx 2.8.7
  } else {
    requestFlush = makeRequestCallFromTimer(flush);
  } // `requestFlush` requests that the high priority event queue be flushed as
  // soon as possible.
  // This is useful to prevent an error thrown in a task from stalling the event
  // queue if the exception handled by Node.js’s
  // `process.on("uncaughtException")` or by a domain.


  rawAsap.requestFlush = requestFlush; // To request a high priority event, we induce a mutation observer by toggling
  // the text of a text node between "1" and "-1".

  function makeRequestCallFromMutationObserver(callback) {
    var toggle = 1;
    var observer = new BrowserMutationObserver(callback);
    var node = document.createTextNode('');
    observer.observe(node, {
      characterData: true
    });
    return function requestCall() {
      toggle = -toggle;
      node.data = toggle;
    };
  } // The message channel technique was discovered by Malte Ubl and was the
  // original foundation for this library.
  // http://www.nonblocking.io/2011/06/windownexttick.html
  // Safari 6.0.5 (at least) intermittently fails to create message ports on a
  // page's first load. Thankfully, this version of Safari supports
  // MutationObservers, so we don't need to fall back in that case.
  // function makeRequestCallFromMessageChannel(callback) {
  //     var channel = new MessageChannel();
  //     channel.port1.onmessage = callback;
  //     return function requestCall() {
  //         channel.port2.postMessage(0);
  //     };
  // }
  // For reasons explained above, we are also unable to use `setImmediate`
  // under any circumstances.
  // Even if we were, there is another bug in Internet Explorer 10.
  // It is not sufficient to assign `setImmediate` to `requestFlush` because
  // `setImmediate` must be called *by name* and therefore must be wrapped in a
  // closure.
  // Never forget.
  // function makeRequestCallFromSetImmediate(callback) {
  //     return function requestCall() {
  //         setImmediate(callback);
  //     };
  // }
  // Safari 6.0 has a problem where timers will get lost while the user is
  // scrolling. This problem does not impact ASAP because Safari 6.0 supports
  // mutation observers, so that implementation is used instead.
  // However, if we ever elect to use timers in Safari, the prevalent work-around
  // is to add a scroll event listener that calls for a flush.
  // `setTimeout` does not call the passed callback if the delay is less than
  // approximately 7 in web workers in Firefox 8 through 18, and sometimes not
  // even then.


  function makeRequestCallFromTimer(callback) {
    return function requestCall() {
      // We dispatch a timeout with a specified delay of 0 for engines that
      // can reliably accommodate that request. This will usually be snapped
      // to a 4 milisecond delay, but once we're flushing, there's no delay
      // between events.
      var timeoutHandle = setTimeout(handleTimer, 0); // However, since this timer gets frequently dropped in Firefox
      // workers, we enlist an interval handle that will try to fire
      // an event 20 times per second until it succeeds.

      var intervalHandle = setInterval(handleTimer, 50);

      function handleTimer() {
        // Whichever timer succeeds will cancel both timers and
        // execute the callback.
        clearTimeout(timeoutHandle);
        clearInterval(intervalHandle);
        callback();
      }
    };
  } // This is for `asap.js` only.
  // Its name will be periodically randomized to break any code that depends on
  // its existence.


  rawAsap.makeRequestCallFromTimer = makeRequestCallFromTimer; // ASAP was originally a nextTick shim included in Q. This was factored out
  // into this ASAP package. It was later adapted to RSVP which made further
  // amendments. These decisions, particularly to marginalize MessageChannel and
  // to capture the MutationObserver implementation in a closure, were integrated
  // back into ASAP proper.
  // https://github.com/tildeio/rsvp.js/blob/cddf7232546a9cf858524b75cde6f9edf72620a7/lib/rsvp/asap.js

  // RawTasks are recycled to reduce GC churn.

  var freeTasks = []; // We queue errors to ensure they are thrown in right order (FIFO).
  // Array-as-queue is good enough here, since we are just dealing with exceptions.

  var pendingErrors = [];
  var requestErrorThrow = rawAsap.makeRequestCallFromTimer(throwFirstError);

  function throwFirstError() {
    if (pendingErrors.length) {
      throw pendingErrors.shift();
    }
  }
  /**
   * Calls a task as soon as possible after returning, in its own event, with priority
   * over other events like animation, reflow, and repaint. An error thrown from an
   * event will not interrupt, nor even substantially slow down the processing of
   * other events, but will be rather postponed to a lower priority event.
   * @param {{call}} task A callable object, typically a function that takes no
   * arguments.
   */


  function asap(task) {
    var rawTask;

    if (freeTasks.length) {
      rawTask = freeTasks.pop();
    } else {
      rawTask = new RawTask();
    }

    rawTask.task = task;
    rawAsap(rawTask);
  } // We wrap tasks with recyclable task objects.  A task object implements
  // `call`, just like a function.

  var RawTask =
  /** @class */
  function () {
    function RawTask() {}

    RawTask.prototype.call = function () {
      try {
        this.task.call();
      } catch (error) {
        if (asap.onerror) {
          // This hook exists purely for testing purposes.
          // Its name will be periodically randomized to break any code that
          // depends on its existence.
          asap.onerror(error);
        } else {
          // In a web browser, exceptions are not fatal. However, to avoid
          // slowing down the queue of pending tasks, we rethrow the error in a
          // lower priority turn.
          pendingErrors.push(error);
          requestErrorThrow();
        }
      } finally {
        this.task = null;
        freeTasks[freeTasks.length] = this;
      }
    };

    return RawTask;
  }();

  function _classCallCheck$b(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties$b(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass$b(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties$b(Constructor.prototype, protoProps); if (staticProps) _defineProperties$b(Constructor, staticProps); return Constructor; }

  function _defineProperty$b(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  function _slicedToArray$7(arr, i) { return _arrayWithHoles$7(arr) || _iterableToArrayLimit$7(arr, i) || _unsupportedIterableToArray$8(arr, i) || _nonIterableRest$7(); }

  function _nonIterableRest$7() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

  function _unsupportedIterableToArray$8(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$8(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$8(o, minLen); }

  function _arrayLikeToArray$8(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

  function _iterableToArrayLimit$7(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

  function _arrayWithHoles$7(arr) { if (Array.isArray(arr)) return arr; }

  function getNextHandlerId(role) {
    var id = getNextUniqueId().toString();

    switch (role) {
      case HandlerRole.SOURCE:
        return "S".concat(id);

      case HandlerRole.TARGET:
        return "T".concat(id);

      default:
        throw new Error("Unknown Handler Role: ".concat(role));
    }
  }

  function parseRoleFromHandlerId(handlerId) {
    switch (handlerId[0]) {
      case 'S':
        return HandlerRole.SOURCE;

      case 'T':
        return HandlerRole.TARGET;

      default:
        invariant(false, "Cannot parse handler ID: ".concat(handlerId));
    }
  }

  function mapContainsValue(map, searchValue) {
    var entries = map.entries();
    var isDone = false;

    do {
      var _entries$next = entries.next(),
          done = _entries$next.done,
          _entries$next$value = _slicedToArray$7(_entries$next.value, 2),
          value = _entries$next$value[1];

      if (value === searchValue) {
        return true;
      }

      isDone = !!done;
    } while (!isDone);

    return false;
  }

  var HandlerRegistryImpl = /*#__PURE__*/function () {
    function HandlerRegistryImpl(store) {
      _classCallCheck$b(this, HandlerRegistryImpl);

      _defineProperty$b(this, "types", new Map());

      _defineProperty$b(this, "dragSources", new Map());

      _defineProperty$b(this, "dropTargets", new Map());

      _defineProperty$b(this, "pinnedSourceId", null);

      _defineProperty$b(this, "pinnedSource", null);

      _defineProperty$b(this, "store", void 0);

      this.store = store;
    }

    _createClass$b(HandlerRegistryImpl, [{
      key: "addSource",
      value: function addSource$1(type, source) {
        validateType(type);
        validateSourceContract(source);
        var sourceId = this.addHandler(HandlerRole.SOURCE, type, source);
        this.store.dispatch(addSource(sourceId));
        return sourceId;
      }
    }, {
      key: "addTarget",
      value: function addTarget$1(type, target) {
        validateType(type, true);
        validateTargetContract(target);
        var targetId = this.addHandler(HandlerRole.TARGET, type, target);
        this.store.dispatch(addTarget(targetId));
        return targetId;
      }
    }, {
      key: "containsHandler",
      value: function containsHandler(handler) {
        return mapContainsValue(this.dragSources, handler) || mapContainsValue(this.dropTargets, handler);
      }
    }, {
      key: "getSource",
      value: function getSource(sourceId) {
        var includePinned = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
        invariant(this.isSourceId(sourceId), 'Expected a valid source ID.');
        var isPinned = includePinned && sourceId === this.pinnedSourceId;
        var source = isPinned ? this.pinnedSource : this.dragSources.get(sourceId);
        return source;
      }
    }, {
      key: "getTarget",
      value: function getTarget(targetId) {
        invariant(this.isTargetId(targetId), 'Expected a valid target ID.');
        return this.dropTargets.get(targetId);
      }
    }, {
      key: "getSourceType",
      value: function getSourceType(sourceId) {
        invariant(this.isSourceId(sourceId), 'Expected a valid source ID.');
        return this.types.get(sourceId);
      }
    }, {
      key: "getTargetType",
      value: function getTargetType(targetId) {
        invariant(this.isTargetId(targetId), 'Expected a valid target ID.');
        return this.types.get(targetId);
      }
    }, {
      key: "isSourceId",
      value: function isSourceId(handlerId) {
        var role = parseRoleFromHandlerId(handlerId);
        return role === HandlerRole.SOURCE;
      }
    }, {
      key: "isTargetId",
      value: function isTargetId(handlerId) {
        var role = parseRoleFromHandlerId(handlerId);
        return role === HandlerRole.TARGET;
      }
    }, {
      key: "removeSource",
      value: function removeSource$1(sourceId) {
        var _this = this;

        invariant(this.getSource(sourceId), 'Expected an existing source.');
        this.store.dispatch(removeSource(sourceId));
        asap(function () {
          _this.dragSources.delete(sourceId);

          _this.types.delete(sourceId);
        });
      }
    }, {
      key: "removeTarget",
      value: function removeTarget$1(targetId) {
        invariant(this.getTarget(targetId), 'Expected an existing target.');
        this.store.dispatch(removeTarget(targetId));
        this.dropTargets.delete(targetId);
        this.types.delete(targetId);
      }
    }, {
      key: "pinSource",
      value: function pinSource(sourceId) {
        var source = this.getSource(sourceId);
        invariant(source, 'Expected an existing source.');
        this.pinnedSourceId = sourceId;
        this.pinnedSource = source;
      }
    }, {
      key: "unpinSource",
      value: function unpinSource() {
        invariant(this.pinnedSource, 'No source is pinned at the time.');
        this.pinnedSourceId = null;
        this.pinnedSource = null;
      }
    }, {
      key: "addHandler",
      value: function addHandler(role, type, handler) {
        var id = getNextHandlerId(role);
        this.types.set(id, type);

        if (role === HandlerRole.SOURCE) {
          this.dragSources.set(id, handler);
        } else if (role === HandlerRole.TARGET) {
          this.dropTargets.set(id, handler);
        }

        return id;
      }
    }]);

    return HandlerRegistryImpl;
  }();

  function createDragDropManager(backendFactory) {
    var globalContext = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
    var backendOptions = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    var debugMode = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
    var store = makeStoreInstance(debugMode);
    var monitor = new DragDropMonitorImpl(store, new HandlerRegistryImpl(store));
    var manager = new DragDropManagerImpl(store, monitor);
    var backend = backendFactory(manager, globalContext, backendOptions);
    manager.receiveBackend(backend);
    return manager;
  }

  function makeStoreInstance(debugMode) {
    // TODO: if we ever make a react-native version of this,
    // we'll need to consider how to pull off dev-tooling
    var reduxDevTools = typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION__;
    return createStore(reduce, debugMode && reduxDevTools && reduxDevTools({
      name: 'dnd-core',
      instanceId: 'dnd-core'
    }));
  }

  var _excluded = ["children"];

  function _slicedToArray$6(arr, i) { return _arrayWithHoles$6(arr) || _iterableToArrayLimit$6(arr, i) || _unsupportedIterableToArray$7(arr, i) || _nonIterableRest$6(); }

  function _nonIterableRest$6() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

  function _unsupportedIterableToArray$7(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$7(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$7(o, minLen); }

  function _arrayLikeToArray$7(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

  function _iterableToArrayLimit$6(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

  function _arrayWithHoles$6(arr) { if (Array.isArray(arr)) return arr; }

  function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

  function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
  var refCount = 0;
  var INSTANCE_SYM = Symbol.for('__REACT_DND_CONTEXT_INSTANCE__');
  /**
   * A React component that provides the React-DnD context
   */

  var DndProvider = f.memo(function DndProvider(_ref) {
    var children = _ref.children,
        props = _objectWithoutProperties(_ref, _excluded);

    var _getDndContextValue = getDndContextValue(props),
        _getDndContextValue2 = _slicedToArray$6(_getDndContextValue, 2),
        manager = _getDndContextValue2[0],
        isGlobalInstance = _getDndContextValue2[1]; // memoized from props

    /**
     * If the global context was used to store the DND context
     * then where theres no more references to it we should
     * clean it up to avoid memory leaks
     */


    f.useEffect(function () {
      if (isGlobalInstance) {
        var context = getGlobalContext();
        ++refCount;
        return function () {
          if (--refCount === 0) {
            context[INSTANCE_SYM] = null;
          }
        };
      }
    }, []);
    return jsxRuntime.jsx(DndContext.Provider, Object.assign({
      value: manager
    }, {
      children: children
    }), void 0);
  });

  function getDndContextValue(props) {
    if ('manager' in props) {
      var _manager = {
        dragDropManager: props.manager
      };
      return [_manager, false];
    }

    var manager = createSingletonDndContext(props.backend, props.context, props.options, props.debugMode);
    var isGlobalInstance = !props.context;
    return [manager, isGlobalInstance];
  }

  function createSingletonDndContext(backend) {
    var context = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : getGlobalContext();
    var options = arguments.length > 2 ? arguments[2] : undefined;
    var debugMode = arguments.length > 3 ? arguments[3] : undefined;
    var ctx = context;

    if (!ctx[INSTANCE_SYM]) {
      ctx[INSTANCE_SYM] = {
        dragDropManager: createDragDropManager(backend, context, options, debugMode)
      };
    }

    return ctx[INSTANCE_SYM];
  }

  function getGlobalContext() {
    return typeof global !== 'undefined' ? global : window;
  }

  /**
   * A utility for rendering a drag preview image
   */

  var DragPreviewImage = f.memo(function DragPreviewImage(_ref) {
    var connect = _ref.connect,
        src = _ref.src;
    f.useEffect(function () {
      if (typeof Image === 'undefined') return;
      var connected = false;
      var img = new Image();
      img.src = src;

      img.onload = function () {
        connect(img);
        connected = true;
      };

      return function () {
        if (connected) {
          connect(null);
        }
      };
    });
    return null;
  });

  function _classCallCheck$a(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties$a(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass$a(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties$a(Constructor.prototype, protoProps); if (staticProps) _defineProperties$a(Constructor, staticProps); return Constructor; }

  function _defineProperty$a(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
  var isCallingCanDrag = false;
  var isCallingIsDragging = false;
  var DragSourceMonitorImpl = /*#__PURE__*/function () {
    function DragSourceMonitorImpl(manager) {
      _classCallCheck$a(this, DragSourceMonitorImpl);

      _defineProperty$a(this, "internalMonitor", void 0);

      _defineProperty$a(this, "sourceId", null);

      this.internalMonitor = manager.getMonitor();
    }

    _createClass$a(DragSourceMonitorImpl, [{
      key: "receiveHandlerId",
      value: function receiveHandlerId(sourceId) {
        this.sourceId = sourceId;
      }
    }, {
      key: "getHandlerId",
      value: function getHandlerId() {
        return this.sourceId;
      }
    }, {
      key: "canDrag",
      value: function canDrag() {
        invariant(!isCallingCanDrag, 'You may not call monitor.canDrag() inside your canDrag() implementation. ' + 'Read more: http://react-dnd.github.io/react-dnd/docs/api/drag-source-monitor');

        try {
          isCallingCanDrag = true;
          return this.internalMonitor.canDragSource(this.sourceId);
        } finally {
          isCallingCanDrag = false;
        }
      }
    }, {
      key: "isDragging",
      value: function isDragging() {
        if (!this.sourceId) {
          return false;
        }

        invariant(!isCallingIsDragging, 'You may not call monitor.isDragging() inside your isDragging() implementation. ' + 'Read more: http://react-dnd.github.io/react-dnd/docs/api/drag-source-monitor');

        try {
          isCallingIsDragging = true;
          return this.internalMonitor.isDraggingSource(this.sourceId);
        } finally {
          isCallingIsDragging = false;
        }
      }
    }, {
      key: "subscribeToStateChange",
      value: function subscribeToStateChange(listener, options) {
        return this.internalMonitor.subscribeToStateChange(listener, options);
      }
    }, {
      key: "isDraggingSource",
      value: function isDraggingSource(sourceId) {
        return this.internalMonitor.isDraggingSource(sourceId);
      }
    }, {
      key: "isOverTarget",
      value: function isOverTarget(targetId, options) {
        return this.internalMonitor.isOverTarget(targetId, options);
      }
    }, {
      key: "getTargetIds",
      value: function getTargetIds() {
        return this.internalMonitor.getTargetIds();
      }
    }, {
      key: "isSourcePublic",
      value: function isSourcePublic() {
        return this.internalMonitor.isSourcePublic();
      }
    }, {
      key: "getSourceId",
      value: function getSourceId() {
        return this.internalMonitor.getSourceId();
      }
    }, {
      key: "subscribeToOffsetChange",
      value: function subscribeToOffsetChange(listener) {
        return this.internalMonitor.subscribeToOffsetChange(listener);
      }
    }, {
      key: "canDragSource",
      value: function canDragSource(sourceId) {
        return this.internalMonitor.canDragSource(sourceId);
      }
    }, {
      key: "canDropOnTarget",
      value: function canDropOnTarget(targetId) {
        return this.internalMonitor.canDropOnTarget(targetId);
      }
    }, {
      key: "getItemType",
      value: function getItemType() {
        return this.internalMonitor.getItemType();
      }
    }, {
      key: "getItem",
      value: function getItem() {
        return this.internalMonitor.getItem();
      }
    }, {
      key: "getDropResult",
      value: function getDropResult() {
        return this.internalMonitor.getDropResult();
      }
    }, {
      key: "didDrop",
      value: function didDrop() {
        return this.internalMonitor.didDrop();
      }
    }, {
      key: "getInitialClientOffset",
      value: function getInitialClientOffset() {
        return this.internalMonitor.getInitialClientOffset();
      }
    }, {
      key: "getInitialSourceClientOffset",
      value: function getInitialSourceClientOffset() {
        return this.internalMonitor.getInitialSourceClientOffset();
      }
    }, {
      key: "getSourceClientOffset",
      value: function getSourceClientOffset() {
        return this.internalMonitor.getSourceClientOffset();
      }
    }, {
      key: "getClientOffset",
      value: function getClientOffset() {
        return this.internalMonitor.getClientOffset();
      }
    }, {
      key: "getDifferenceFromInitialOffset",
      value: function getDifferenceFromInitialOffset() {
        return this.internalMonitor.getDifferenceFromInitialOffset();
      }
    }]);

    return DragSourceMonitorImpl;
  }();

  function _classCallCheck$9(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties$9(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass$9(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties$9(Constructor.prototype, protoProps); if (staticProps) _defineProperties$9(Constructor, staticProps); return Constructor; }

  function _defineProperty$9(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
  var isCallingCanDrop = false;
  var DropTargetMonitorImpl = /*#__PURE__*/function () {
    function DropTargetMonitorImpl(manager) {
      _classCallCheck$9(this, DropTargetMonitorImpl);

      _defineProperty$9(this, "internalMonitor", void 0);

      _defineProperty$9(this, "targetId", null);

      this.internalMonitor = manager.getMonitor();
    }

    _createClass$9(DropTargetMonitorImpl, [{
      key: "receiveHandlerId",
      value: function receiveHandlerId(targetId) {
        this.targetId = targetId;
      }
    }, {
      key: "getHandlerId",
      value: function getHandlerId() {
        return this.targetId;
      }
    }, {
      key: "subscribeToStateChange",
      value: function subscribeToStateChange(listener, options) {
        return this.internalMonitor.subscribeToStateChange(listener, options);
      }
    }, {
      key: "canDrop",
      value: function canDrop() {
        // Cut out early if the target id has not been set. This should prevent errors
        // where the user has an older version of dnd-core like in
        // https://github.com/react-dnd/react-dnd/issues/1310
        if (!this.targetId) {
          return false;
        }

        invariant(!isCallingCanDrop, 'You may not call monitor.canDrop() inside your canDrop() implementation. ' + 'Read more: http://react-dnd.github.io/react-dnd/docs/api/drop-target-monitor');

        try {
          isCallingCanDrop = true;
          return this.internalMonitor.canDropOnTarget(this.targetId);
        } finally {
          isCallingCanDrop = false;
        }
      }
    }, {
      key: "isOver",
      value: function isOver(options) {
        if (!this.targetId) {
          return false;
        }

        return this.internalMonitor.isOverTarget(this.targetId, options);
      }
    }, {
      key: "getItemType",
      value: function getItemType() {
        return this.internalMonitor.getItemType();
      }
    }, {
      key: "getItem",
      value: function getItem() {
        return this.internalMonitor.getItem();
      }
    }, {
      key: "getDropResult",
      value: function getDropResult() {
        return this.internalMonitor.getDropResult();
      }
    }, {
      key: "didDrop",
      value: function didDrop() {
        return this.internalMonitor.didDrop();
      }
    }, {
      key: "getInitialClientOffset",
      value: function getInitialClientOffset() {
        return this.internalMonitor.getInitialClientOffset();
      }
    }, {
      key: "getInitialSourceClientOffset",
      value: function getInitialSourceClientOffset() {
        return this.internalMonitor.getInitialSourceClientOffset();
      }
    }, {
      key: "getSourceClientOffset",
      value: function getSourceClientOffset() {
        return this.internalMonitor.getSourceClientOffset();
      }
    }, {
      key: "getClientOffset",
      value: function getClientOffset() {
        return this.internalMonitor.getClientOffset();
      }
    }, {
      key: "getDifferenceFromInitialOffset",
      value: function getDifferenceFromInitialOffset() {
        return this.internalMonitor.getDifferenceFromInitialOffset();
      }
    }]);

    return DropTargetMonitorImpl;
  }();

  function throwIfCompositeComponentElement(element) {
    // Custom components can no longer be wrapped directly in React DnD 2.0
    // so that we don't need to depend on findDOMNode() from react-dom.
    if (typeof element.type === 'string') {
      return;
    }

    var displayName = element.type.displayName || element.type.name || 'the component';
    throw new Error('Only native element nodes can now be passed to React DnD connectors.' + "You can either wrap ".concat(displayName, " into a <div>, or turn it into a ") + 'drag source or a drop target itself.');
  }

  function wrapHookToRecognizeElement(hook) {
    return function () {
      var elementOrNode = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

      // When passed a node, call the hook straight away.
      if (!f.isValidElement(elementOrNode)) {
        var node = elementOrNode;
        hook(node, options); // return the node so it can be chained (e.g. when within callback refs
        // <div ref={node => connectDragSource(connectDropTarget(node))}/>

        return node;
      } // If passed a ReactElement, clone it and attach this function as a ref.
      // This helps us achieve a neat API where user doesn't even know that refs
      // are being used under the hood.


      var element = elementOrNode;
      throwIfCompositeComponentElement(element); // When no options are passed, use the hook directly

      var ref = options ? function (node) {
        return hook(node, options);
      } : hook;
      return cloneWithRef(element, ref);
    };
  }

  function wrapConnectorHooks(hooks) {
    var wrappedHooks = {};
    Object.keys(hooks).forEach(function (key) {
      var hook = hooks[key]; // ref objects should be passed straight through without wrapping

      if (key.endsWith('Ref')) {
        wrappedHooks[key] = hooks[key];
      } else {
        var wrappedHook = wrapHookToRecognizeElement(hook);

        wrappedHooks[key] = function () {
          return wrappedHook;
        };
      }
    });
    return wrappedHooks;
  }

  function setRef(ref, node) {
    if (typeof ref === 'function') {
      ref(node);
    } else {
      ref.current = node;
    }
  }

  function cloneWithRef(element, newRef) {
    var previousRef = element.ref;
    invariant(typeof previousRef !== 'string', 'Cannot connect React DnD to an element with an existing string ref. ' + 'Please convert it to use a callback ref instead, or wrap it into a <span> or <div>. ' + 'Read more: https://reactjs.org/docs/refs-and-the-dom.html#callback-refs');

    if (!previousRef) {
      // When there is no ref on the element, use the new ref directly
      return f.cloneElement(element, {
        ref: newRef
      });
    } else {
      return f.cloneElement(element, {
        ref: function ref(node) {
          setRef(previousRef, node);
          setRef(newRef, node);
        }
      });
    }
  }

  function _typeof$4(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof$4 = function _typeof(obj) { return typeof obj; }; } else { _typeof$4 = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof$4(obj); }

  function isRef(obj) {
    return (// eslint-disable-next-line no-prototype-builtins
      obj !== null && _typeof$4(obj) === 'object' && Object.prototype.hasOwnProperty.call(obj, 'current')
    );
  }

  function shallowEqual(objA, objB, compare, compareContext) {
    var compareResult = compare ? compare.call(compareContext, objA, objB) : void 0;

    if (compareResult !== void 0) {
      return !!compareResult;
    }

    if (objA === objB) {
      return true;
    }

    if (typeof objA !== 'object' || !objA || typeof objB !== 'object' || !objB) {
      return false;
    }

    var keysA = Object.keys(objA);
    var keysB = Object.keys(objB);

    if (keysA.length !== keysB.length) {
      return false;
    }

    var bHasOwnProperty = Object.prototype.hasOwnProperty.bind(objB); // Test for A's keys different from B.

    for (var idx = 0; idx < keysA.length; idx++) {
      var key = keysA[idx];

      if (!bHasOwnProperty(key)) {
        return false;
      }

      var valueA = objA[key];
      var valueB = objB[key];
      compareResult = compare ? compare.call(compareContext, valueA, valueB, key) : void 0;

      if (compareResult === false || compareResult === void 0 && valueA !== valueB) {
        return false;
      }
    }

    return true;
  }

  function _classCallCheck$8(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties$8(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass$8(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties$8(Constructor.prototype, protoProps); if (staticProps) _defineProperties$8(Constructor, staticProps); return Constructor; }

  function _defineProperty$8(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
  var SourceConnector = /*#__PURE__*/function () {
    // The drop target may either be attached via ref or connect function
    // The drag preview may either be attached via ref or connect function
    function SourceConnector(backend) {
      var _this = this;

      _classCallCheck$8(this, SourceConnector);

      _defineProperty$8(this, "hooks", wrapConnectorHooks({
        dragSource: function dragSource(node, options) {
          _this.clearDragSource();

          _this.dragSourceOptions = options || null;

          if (isRef(node)) {
            _this.dragSourceRef = node;
          } else {
            _this.dragSourceNode = node;
          }

          _this.reconnectDragSource();
        },
        dragPreview: function dragPreview(node, options) {
          _this.clearDragPreview();

          _this.dragPreviewOptions = options || null;

          if (isRef(node)) {
            _this.dragPreviewRef = node;
          } else {
            _this.dragPreviewNode = node;
          }

          _this.reconnectDragPreview();
        }
      }));

      _defineProperty$8(this, "handlerId", null);

      _defineProperty$8(this, "dragSourceRef", null);

      _defineProperty$8(this, "dragSourceNode", void 0);

      _defineProperty$8(this, "dragSourceOptionsInternal", null);

      _defineProperty$8(this, "dragSourceUnsubscribe", void 0);

      _defineProperty$8(this, "dragPreviewRef", null);

      _defineProperty$8(this, "dragPreviewNode", void 0);

      _defineProperty$8(this, "dragPreviewOptionsInternal", null);

      _defineProperty$8(this, "dragPreviewUnsubscribe", void 0);

      _defineProperty$8(this, "lastConnectedHandlerId", null);

      _defineProperty$8(this, "lastConnectedDragSource", null);

      _defineProperty$8(this, "lastConnectedDragSourceOptions", null);

      _defineProperty$8(this, "lastConnectedDragPreview", null);

      _defineProperty$8(this, "lastConnectedDragPreviewOptions", null);

      _defineProperty$8(this, "backend", void 0);

      this.backend = backend;
    }

    _createClass$8(SourceConnector, [{
      key: "receiveHandlerId",
      value: function receiveHandlerId(newHandlerId) {
        if (this.handlerId === newHandlerId) {
          return;
        }

        this.handlerId = newHandlerId;
        this.reconnect();
      }
    }, {
      key: "connectTarget",
      get: function get() {
        return this.dragSource;
      }
    }, {
      key: "dragSourceOptions",
      get: function get() {
        return this.dragSourceOptionsInternal;
      },
      set: function set(options) {
        this.dragSourceOptionsInternal = options;
      }
    }, {
      key: "dragPreviewOptions",
      get: function get() {
        return this.dragPreviewOptionsInternal;
      },
      set: function set(options) {
        this.dragPreviewOptionsInternal = options;
      }
    }, {
      key: "reconnect",
      value: function reconnect() {
        this.reconnectDragSource();
        this.reconnectDragPreview();
      }
    }, {
      key: "reconnectDragSource",
      value: function reconnectDragSource() {
        var dragSource = this.dragSource; // if nothing has changed then don't resubscribe

        var didChange = this.didHandlerIdChange() || this.didConnectedDragSourceChange() || this.didDragSourceOptionsChange();

        if (didChange) {
          this.disconnectDragSource();
        }

        if (!this.handlerId) {
          return;
        }

        if (!dragSource) {
          this.lastConnectedDragSource = dragSource;
          return;
        }

        if (didChange) {
          this.lastConnectedHandlerId = this.handlerId;
          this.lastConnectedDragSource = dragSource;
          this.lastConnectedDragSourceOptions = this.dragSourceOptions;
          this.dragSourceUnsubscribe = this.backend.connectDragSource(this.handlerId, dragSource, this.dragSourceOptions);
        }
      }
    }, {
      key: "reconnectDragPreview",
      value: function reconnectDragPreview() {
        var dragPreview = this.dragPreview; // if nothing has changed then don't resubscribe

        var didChange = this.didHandlerIdChange() || this.didConnectedDragPreviewChange() || this.didDragPreviewOptionsChange();

        if (didChange) {
          this.disconnectDragPreview();
        }

        if (!this.handlerId) {
          return;
        }

        if (!dragPreview) {
          this.lastConnectedDragPreview = dragPreview;
          return;
        }

        if (didChange) {
          this.lastConnectedHandlerId = this.handlerId;
          this.lastConnectedDragPreview = dragPreview;
          this.lastConnectedDragPreviewOptions = this.dragPreviewOptions;
          this.dragPreviewUnsubscribe = this.backend.connectDragPreview(this.handlerId, dragPreview, this.dragPreviewOptions);
        }
      }
    }, {
      key: "didHandlerIdChange",
      value: function didHandlerIdChange() {
        return this.lastConnectedHandlerId !== this.handlerId;
      }
    }, {
      key: "didConnectedDragSourceChange",
      value: function didConnectedDragSourceChange() {
        return this.lastConnectedDragSource !== this.dragSource;
      }
    }, {
      key: "didConnectedDragPreviewChange",
      value: function didConnectedDragPreviewChange() {
        return this.lastConnectedDragPreview !== this.dragPreview;
      }
    }, {
      key: "didDragSourceOptionsChange",
      value: function didDragSourceOptionsChange() {
        return !shallowEqual(this.lastConnectedDragSourceOptions, this.dragSourceOptions);
      }
    }, {
      key: "didDragPreviewOptionsChange",
      value: function didDragPreviewOptionsChange() {
        return !shallowEqual(this.lastConnectedDragPreviewOptions, this.dragPreviewOptions);
      }
    }, {
      key: "disconnectDragSource",
      value: function disconnectDragSource() {
        if (this.dragSourceUnsubscribe) {
          this.dragSourceUnsubscribe();
          this.dragSourceUnsubscribe = undefined;
        }
      }
    }, {
      key: "disconnectDragPreview",
      value: function disconnectDragPreview() {
        if (this.dragPreviewUnsubscribe) {
          this.dragPreviewUnsubscribe();
          this.dragPreviewUnsubscribe = undefined;
          this.dragPreviewNode = null;
          this.dragPreviewRef = null;
        }
      }
    }, {
      key: "dragSource",
      get: function get() {
        return this.dragSourceNode || this.dragSourceRef && this.dragSourceRef.current;
      }
    }, {
      key: "dragPreview",
      get: function get() {
        return this.dragPreviewNode || this.dragPreviewRef && this.dragPreviewRef.current;
      }
    }, {
      key: "clearDragSource",
      value: function clearDragSource() {
        this.dragSourceNode = null;
        this.dragSourceRef = null;
      }
    }, {
      key: "clearDragPreview",
      value: function clearDragPreview() {
        this.dragPreviewNode = null;
        this.dragPreviewRef = null;
      }
    }]);

    return SourceConnector;
  }();

  function _classCallCheck$7(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties$7(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass$7(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties$7(Constructor.prototype, protoProps); if (staticProps) _defineProperties$7(Constructor, staticProps); return Constructor; }

  function _defineProperty$7(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
  var TargetConnector = /*#__PURE__*/function () {
    // The drop target may either be attached via ref or connect function
    function TargetConnector(backend) {
      var _this = this;

      _classCallCheck$7(this, TargetConnector);

      _defineProperty$7(this, "hooks", wrapConnectorHooks({
        dropTarget: function dropTarget(node, options) {
          _this.clearDropTarget();

          _this.dropTargetOptions = options;

          if (isRef(node)) {
            _this.dropTargetRef = node;
          } else {
            _this.dropTargetNode = node;
          }

          _this.reconnect();
        }
      }));

      _defineProperty$7(this, "handlerId", null);

      _defineProperty$7(this, "dropTargetRef", null);

      _defineProperty$7(this, "dropTargetNode", void 0);

      _defineProperty$7(this, "dropTargetOptionsInternal", null);

      _defineProperty$7(this, "unsubscribeDropTarget", void 0);

      _defineProperty$7(this, "lastConnectedHandlerId", null);

      _defineProperty$7(this, "lastConnectedDropTarget", null);

      _defineProperty$7(this, "lastConnectedDropTargetOptions", null);

      _defineProperty$7(this, "backend", void 0);

      this.backend = backend;
    }

    _createClass$7(TargetConnector, [{
      key: "connectTarget",
      get: function get() {
        return this.dropTarget;
      }
    }, {
      key: "reconnect",
      value: function reconnect() {
        // if nothing has changed then don't resubscribe
        var didChange = this.didHandlerIdChange() || this.didDropTargetChange() || this.didOptionsChange();

        if (didChange) {
          this.disconnectDropTarget();
        }

        var dropTarget = this.dropTarget;

        if (!this.handlerId) {
          return;
        }

        if (!dropTarget) {
          this.lastConnectedDropTarget = dropTarget;
          return;
        }

        if (didChange) {
          this.lastConnectedHandlerId = this.handlerId;
          this.lastConnectedDropTarget = dropTarget;
          this.lastConnectedDropTargetOptions = this.dropTargetOptions;
          this.unsubscribeDropTarget = this.backend.connectDropTarget(this.handlerId, dropTarget, this.dropTargetOptions);
        }
      }
    }, {
      key: "receiveHandlerId",
      value: function receiveHandlerId(newHandlerId) {
        if (newHandlerId === this.handlerId) {
          return;
        }

        this.handlerId = newHandlerId;
        this.reconnect();
      }
    }, {
      key: "dropTargetOptions",
      get: function get() {
        return this.dropTargetOptionsInternal;
      },
      set: function set(options) {
        this.dropTargetOptionsInternal = options;
      }
    }, {
      key: "didHandlerIdChange",
      value: function didHandlerIdChange() {
        return this.lastConnectedHandlerId !== this.handlerId;
      }
    }, {
      key: "didDropTargetChange",
      value: function didDropTargetChange() {
        return this.lastConnectedDropTarget !== this.dropTarget;
      }
    }, {
      key: "didOptionsChange",
      value: function didOptionsChange() {
        return !shallowEqual(this.lastConnectedDropTargetOptions, this.dropTargetOptions);
      }
    }, {
      key: "disconnectDropTarget",
      value: function disconnectDropTarget() {
        if (this.unsubscribeDropTarget) {
          this.unsubscribeDropTarget();
          this.unsubscribeDropTarget = undefined;
        }
      }
    }, {
      key: "dropTarget",
      get: function get() {
        return this.dropTargetNode || this.dropTargetRef && this.dropTargetRef.current;
      }
    }, {
      key: "clearDropTarget",
      value: function clearDropTarget() {
        this.dropTargetRef = null;
        this.dropTargetNode = null;
      }
    }]);

    return TargetConnector;
  }();

  function registerTarget(type, target, manager) {
    var registry = manager.getRegistry();
    var targetId = registry.addTarget(type, target);
    return [targetId, function () {
      return registry.removeTarget(targetId);
    }];
  }
  function registerSource(type, source, manager) {
    var registry = manager.getRegistry();
    var sourceId = registry.addSource(type, source);
    return [sourceId, function () {
      return registry.removeSource(sourceId);
    }];
  }

  function _typeof$3(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof$3 = function _typeof(obj) { return typeof obj; }; } else { _typeof$3 = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof$3(obj); }

  function getDecoratedComponent(instanceRef) {
    var currentRef = instanceRef.current;

    if (currentRef == null) {
      return null;
    } else if (currentRef.decoratedRef) {
      // go through the private field in decorateHandler to avoid the invariant hit
      return currentRef.decoratedRef.current;
    } else {
      return currentRef;
    }
  }
  function isClassComponent(Component) {
    return Component && Component.prototype && typeof Component.prototype.render === 'function';
  }
  function isRefForwardingComponent(C) {
    var _item$$$typeof;

    var item = C;
    return (item === null || item === void 0 ? void 0 : (_item$$$typeof = item.$$typeof) === null || _item$$$typeof === void 0 ? void 0 : _item$$$typeof.toString()) === 'Symbol(react.forward_ref)';
  }
  function isRefable(C) {
    return isClassComponent(C) || isRefForwardingComponent(C);
  }
  function checkDecoratorArguments(functionName, signature) {
    {
      for (var i = 0; i < (arguments.length <= 2 ? 0 : arguments.length - 2); i++) {
        var arg = i + 2 < 2 || arguments.length <= i + 2 ? undefined : arguments[i + 2];

        if (arg && arg.prototype && arg.prototype.render) {
          // eslint-disable-next-line no-console
          console.error('You seem to be applying the arguments in the wrong order. ' + "It should be ".concat(functionName, "(").concat(signature, ")(Component), not the other way around. ") + 'Read more: http://react-dnd.github.io/react-dnd/docs/troubleshooting#you-seem-to-be-applying-the-arguments-in-the-wrong-order');
          return;
        }
      }
    }
  }
  function isFunction(input) {
    return typeof input === 'function';
  }
  function noop() {// noop
  }

  function isObjectLike(input) {
    return _typeof$3(input) === 'object' && input !== null;
  }

  function isPlainObject(input) {
    if (!isObjectLike(input)) {
      return false;
    }

    if (Object.getPrototypeOf(input) === null) {
      return true;
    }

    var proto = input;

    while (Object.getPrototypeOf(proto) !== null) {
      proto = Object.getPrototypeOf(proto);
    }

    return Object.getPrototypeOf(input) === proto;
  }
  function isValidType(type, allowArray) {
    return typeof type === 'string' || _typeof$3(type) === 'symbol' || !!allowArray && Array.isArray(type) && type.every(function (t) {
      return isValidType(t, false);
    });
  }

  function _classCallCheck$6(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties$6(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass$6(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties$6(Constructor.prototype, protoProps); if (staticProps) _defineProperties$6(Constructor, staticProps); return Constructor; }

  function _defineProperty$6(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
  /**
   * Provides a set of static methods for creating Disposables.
   * @param {Function} action Action to run during the first call to dispose.
   * The action is guaranteed to be run at most once.
   */

  var Disposable = /*#__PURE__*/function () {
    function Disposable(action) {
      _classCallCheck$6(this, Disposable);

      _defineProperty$6(this, "isDisposed", false);

      _defineProperty$6(this, "action", void 0);

      this.action = isFunction(action) ? action : noop;
    }
    /** Performs the task of cleaning up resources. */


    _createClass$6(Disposable, [{
      key: "dispose",
      value: function dispose() {
        if (!this.isDisposed) {
          this.action();
          this.isDisposed = true;
        }
      }
    }], [{
      key: "isDisposable",
      value:
      /**
       * Gets the disposable that does nothing when disposed.
       */

      /**
       * Validates whether the given object is a disposable
       * @param {Object} Object to test whether it has a dispose method
       * @returns {Boolean} true if a disposable object, else false.
       */
      function isDisposable(d) {
        return Boolean(d && isFunction(d.dispose));
      }
    }, {
      key: "_fixup",
      value: function _fixup(result) {
        return Disposable.isDisposable(result) ? result : Disposable.empty;
      }
      /**
       * Creates a disposable object that invokes the specified action when disposed.
       * @param {Function} dispose Action to run during the first call to dispose.
       * The action is guaranteed to be run at most once.
       * @return {Disposable} The disposable object that runs the given action upon disposal.
       */

    }, {
      key: "create",
      value: function create(action) {
        return new Disposable(action);
      }
    }]);

    return Disposable;
  }();
  /**
   * Represents a group of disposable resources that are disposed together.
   * @constructor
   */

  _defineProperty$6(Disposable, "empty", {
    dispose: noop
  });

  var CompositeDisposable = /*#__PURE__*/function () {
    function CompositeDisposable() {
      _classCallCheck$6(this, CompositeDisposable);

      _defineProperty$6(this, "isDisposed", false);

      _defineProperty$6(this, "disposables", void 0);

      for (var _len = arguments.length, disposables = new Array(_len), _key = 0; _key < _len; _key++) {
        disposables[_key] = arguments[_key];
      }

      this.disposables = disposables;
    }
    /**
     * Adds a disposable to the CompositeDisposable or disposes the disposable if the CompositeDisposable is disposed.
     * @param {Any} item Disposable to add.
     */


    _createClass$6(CompositeDisposable, [{
      key: "add",
      value: function add(item) {
        if (this.isDisposed) {
          item.dispose();
        } else {
          this.disposables.push(item);
        }
      }
      /**
       * Removes and disposes the first occurrence of a disposable from the CompositeDisposable.
       * @param {Any} item Disposable to remove.
       * @returns {Boolean} true if found; false otherwise.
       */

    }, {
      key: "remove",
      value: function remove(item) {
        var shouldDispose = false;

        if (!this.isDisposed) {
          var idx = this.disposables.indexOf(item);

          if (idx !== -1) {
            shouldDispose = true;
            this.disposables.splice(idx, 1);
            item.dispose();
          }
        }

        return shouldDispose;
      }
      /**
       *  Disposes all disposables in the group and removes them from the group but
       *  does not dispose the CompositeDisposable.
       */

    }, {
      key: "clear",
      value: function clear() {
        if (!this.isDisposed) {
          var len = this.disposables.length;
          var currentDisposables = new Array(len);

          for (var i = 0; i < len; i++) {
            currentDisposables[i] = this.disposables[i];
          }

          this.disposables = [];

          for (var _i = 0; _i < len; _i++) {
            currentDisposables[_i].dispose();
          }
        }
      }
      /**
       *  Disposes all disposables in the group and removes them from the group.
       */

    }, {
      key: "dispose",
      value: function dispose() {
        if (!this.isDisposed) {
          this.isDisposed = true;
          var len = this.disposables.length;
          var currentDisposables = new Array(len);

          for (var i = 0; i < len; i++) {
            currentDisposables[i] = this.disposables[i];
          }

          this.disposables = [];

          for (var _i2 = 0; _i2 < len; _i2++) {
            currentDisposables[_i2].dispose();
          }
        }
      }
    }]);

    return CompositeDisposable;
  }();
  /**
   * Represents a disposable resource whose underlying disposable resource can
   * be replaced by another disposable resource, causing automatic disposal of
   * the previous underlying disposable resource.
   */

  var SerialDisposable = /*#__PURE__*/function () {
    function SerialDisposable() {
      _classCallCheck$6(this, SerialDisposable);

      _defineProperty$6(this, "isDisposed", false);

      _defineProperty$6(this, "current", void 0);
    }

    _createClass$6(SerialDisposable, [{
      key: "getDisposable",
      value:
      /**
       * Gets the underlying disposable.
       * @returns {Any} the underlying disposable.
       */
      function getDisposable() {
        return this.current;
      }
    }, {
      key: "setDisposable",
      value: function setDisposable(value) {
        var shouldDispose = this.isDisposed;

        if (!shouldDispose) {
          var old = this.current;
          this.current = value;

          if (old) {
            old.dispose();
          }
        }

        if (shouldDispose && value) {
          value.dispose();
        }
      }
      /** Performs the task of cleaning up resources. */

    }, {
      key: "dispose",
      value: function dispose() {
        if (!this.isDisposed) {
          this.isDisposed = true;
          var old = this.current;
          this.current = undefined;

          if (old) {
            old.dispose();
          }
        }
      }
    }]);

    return SerialDisposable;
  }();

  /** @license React v16.13.1
   * react-is.development.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */

  var reactIs_development = createCommonjsModule(function (module, exports) {



  {
    (function() {

  // The Symbol used to tag the ReactElement-like types. If there is no native Symbol
  // nor polyfill, then a plain number is used for performance.
  var hasSymbol = typeof Symbol === 'function' && Symbol.for;
  var REACT_ELEMENT_TYPE = hasSymbol ? Symbol.for('react.element') : 0xeac7;
  var REACT_PORTAL_TYPE = hasSymbol ? Symbol.for('react.portal') : 0xeaca;
  var REACT_FRAGMENT_TYPE = hasSymbol ? Symbol.for('react.fragment') : 0xeacb;
  var REACT_STRICT_MODE_TYPE = hasSymbol ? Symbol.for('react.strict_mode') : 0xeacc;
  var REACT_PROFILER_TYPE = hasSymbol ? Symbol.for('react.profiler') : 0xead2;
  var REACT_PROVIDER_TYPE = hasSymbol ? Symbol.for('react.provider') : 0xeacd;
  var REACT_CONTEXT_TYPE = hasSymbol ? Symbol.for('react.context') : 0xeace; // TODO: We don't use AsyncMode or ConcurrentMode anymore. They were temporary
  // (unstable) APIs that have been removed. Can we remove the symbols?

  var REACT_ASYNC_MODE_TYPE = hasSymbol ? Symbol.for('react.async_mode') : 0xeacf;
  var REACT_CONCURRENT_MODE_TYPE = hasSymbol ? Symbol.for('react.concurrent_mode') : 0xeacf;
  var REACT_FORWARD_REF_TYPE = hasSymbol ? Symbol.for('react.forward_ref') : 0xead0;
  var REACT_SUSPENSE_TYPE = hasSymbol ? Symbol.for('react.suspense') : 0xead1;
  var REACT_SUSPENSE_LIST_TYPE = hasSymbol ? Symbol.for('react.suspense_list') : 0xead8;
  var REACT_MEMO_TYPE = hasSymbol ? Symbol.for('react.memo') : 0xead3;
  var REACT_LAZY_TYPE = hasSymbol ? Symbol.for('react.lazy') : 0xead4;
  var REACT_BLOCK_TYPE = hasSymbol ? Symbol.for('react.block') : 0xead9;
  var REACT_FUNDAMENTAL_TYPE = hasSymbol ? Symbol.for('react.fundamental') : 0xead5;
  var REACT_RESPONDER_TYPE = hasSymbol ? Symbol.for('react.responder') : 0xead6;
  var REACT_SCOPE_TYPE = hasSymbol ? Symbol.for('react.scope') : 0xead7;

  function isValidElementType(type) {
    return typeof type === 'string' || typeof type === 'function' || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
    type === REACT_FRAGMENT_TYPE || type === REACT_CONCURRENT_MODE_TYPE || type === REACT_PROFILER_TYPE || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || typeof type === 'object' && type !== null && (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || type.$$typeof === REACT_FUNDAMENTAL_TYPE || type.$$typeof === REACT_RESPONDER_TYPE || type.$$typeof === REACT_SCOPE_TYPE || type.$$typeof === REACT_BLOCK_TYPE);
  }

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
                case REACT_LAZY_TYPE:
                case REACT_MEMO_TYPE:
                case REACT_PROVIDER_TYPE:
                  return $$typeofType;

                default:
                  return $$typeof;
              }

          }

        case REACT_PORTAL_TYPE:
          return $$typeof;
      }
    }

    return undefined;
  } // AsyncMode is deprecated along with isAsyncMode

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
  var hasWarnedAboutDeprecatedIsAsyncMode = false; // AsyncMode should be deprecated

  function isAsyncMode(object) {
    {
      if (!hasWarnedAboutDeprecatedIsAsyncMode) {
        hasWarnedAboutDeprecatedIsAsyncMode = true; // Using console['warn'] to evade Babel and ESLint

        console['warn']('The ReactIs.isAsyncMode() alias has been deprecated, ' + 'and will be removed in React 17+. Update your code to use ' + 'ReactIs.isConcurrentMode() instead. It has the exact same API.');
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
  exports.isValidElementType = isValidElementType;
  exports.typeOf = typeOf;
    })();
  }
  });

  var reactIs = createCommonjsModule(function (module) {

  {
    module.exports = reactIs_development;
  }
  });

  /**
   * Copyright 2015, Yahoo! Inc.
   * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
   */
  var REACT_STATICS = {
    childContextTypes: true,
    contextType: true,
    contextTypes: true,
    defaultProps: true,
    displayName: true,
    getDefaultProps: true,
    getDerivedStateFromError: true,
    getDerivedStateFromProps: true,
    mixins: true,
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
  var FORWARD_REF_STATICS = {
    '$$typeof': true,
    render: true,
    defaultProps: true,
    displayName: true,
    propTypes: true
  };
  var MEMO_STATICS = {
    '$$typeof': true,
    compare: true,
    defaultProps: true,
    displayName: true,
    propTypes: true,
    type: true
  };
  var TYPE_STATICS = {};
  TYPE_STATICS[reactIs.ForwardRef] = FORWARD_REF_STATICS;
  TYPE_STATICS[reactIs.Memo] = MEMO_STATICS;

  function getStatics(component) {
    // React v16.11 and below
    if (reactIs.isMemo(component)) {
      return MEMO_STATICS;
    } // React v16.12 and above


    return TYPE_STATICS[component['$$typeof']] || REACT_STATICS;
  }

  var defineProperty = Object.defineProperty;
  var getOwnPropertyNames = Object.getOwnPropertyNames;
  var getOwnPropertySymbols = Object.getOwnPropertySymbols;
  var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
  var getPrototypeOf = Object.getPrototypeOf;
  var objectPrototype = Object.prototype;
  function hoistNonReactStatics(targetComponent, sourceComponent, blacklist) {
    if (typeof sourceComponent !== 'string') {
      // don't hoist over string (html) components
      if (objectPrototype) {
        var inheritedComponent = getPrototypeOf(sourceComponent);

        if (inheritedComponent && inheritedComponent !== objectPrototype) {
          hoistNonReactStatics(targetComponent, inheritedComponent, blacklist);
        }
      }

      var keys = getOwnPropertyNames(sourceComponent);

      if (getOwnPropertySymbols) {
        keys = keys.concat(getOwnPropertySymbols(sourceComponent));
      }

      var targetStatics = getStatics(targetComponent);
      var sourceStatics = getStatics(sourceComponent);

      for (var i = 0; i < keys.length; ++i) {
        var key = keys[i];

        if (!KNOWN_STATICS[key] && !(blacklist && blacklist[key]) && !(sourceStatics && sourceStatics[key]) && !(targetStatics && targetStatics[key])) {
          var descriptor = getOwnPropertyDescriptor(sourceComponent, key);

          try {
            // Avoid failures from read-only properties
            defineProperty(targetComponent, key, descriptor);
          } catch (e) {}
        }
      }
    }

    return targetComponent;
  }

  var hoistNonReactStatics_cjs = hoistNonReactStatics;

  var hoistStatics = hoistNonReactStatics_cjs;

  function _typeof$2(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof$2 = function _typeof(obj) { return typeof obj; }; } else { _typeof$2 = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof$2(obj); }

  function _slicedToArray$5(arr, i) { return _arrayWithHoles$5(arr) || _iterableToArrayLimit$5(arr, i) || _unsupportedIterableToArray$6(arr, i) || _nonIterableRest$5(); }

  function _nonIterableRest$5() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

  function _unsupportedIterableToArray$6(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$6(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$6(o, minLen); }

  function _arrayLikeToArray$6(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

  function _iterableToArrayLimit$5(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

  function _arrayWithHoles$5(arr) { if (Array.isArray(arr)) return arr; }

  function _classCallCheck$5(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties$5(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass$5(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties$5(Constructor.prototype, protoProps); if (staticProps) _defineProperties$5(Constructor, staticProps); return Constructor; }

  function _inherits$1(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf$1(subClass, superClass); }

  function _setPrototypeOf$1(o, p) { _setPrototypeOf$1 = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf$1(o, p); }

  function _createSuper$1(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$1(); return function _createSuperInternal() { var Super = _getPrototypeOf$1(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf$1(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn$1(this, result); }; }

  function _possibleConstructorReturn$1(self, call) { if (call && (_typeof$2(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized$1(self); }

  function _assertThisInitialized$1(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _isNativeReflectConstruct$1() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

  function _getPrototypeOf$1(o) { _getPrototypeOf$1 = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf$1(o); }

  function _defineProperty$5(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
  function decorateHandler(_ref) {
    var DecoratedComponent = _ref.DecoratedComponent,
        createHandler = _ref.createHandler,
        createMonitor = _ref.createMonitor,
        createConnector = _ref.createConnector,
        registerHandler = _ref.registerHandler,
        containerDisplayName = _ref.containerDisplayName,
        getType = _ref.getType,
        collect = _ref.collect,
        options = _ref.options;
    var _options$arePropsEqua = options.arePropsEqual,
        arePropsEqual = _options$arePropsEqua === void 0 ? shallowEqual : _options$arePropsEqua;
    var Decorated = DecoratedComponent;
    var displayName = DecoratedComponent.displayName || DecoratedComponent.name || 'Component';

    var DragDropContainer = /*#__PURE__*/function (_Component) {
      _inherits$1(DragDropContainer, _Component);

      var _super = _createSuper$1(DragDropContainer);

      function DragDropContainer(props) {
        var _this;

        _classCallCheck$5(this, DragDropContainer);

        _this = _super.call(this, props);

        _defineProperty$5(_assertThisInitialized$1(_this), "decoratedRef", f.createRef());

        _defineProperty$5(_assertThisInitialized$1(_this), "handlerId", void 0);

        _defineProperty$5(_assertThisInitialized$1(_this), "manager", void 0);

        _defineProperty$5(_assertThisInitialized$1(_this), "handlerMonitor", void 0);

        _defineProperty$5(_assertThisInitialized$1(_this), "handlerConnector", void 0);

        _defineProperty$5(_assertThisInitialized$1(_this), "handler", void 0);

        _defineProperty$5(_assertThisInitialized$1(_this), "disposable", void 0);

        _defineProperty$5(_assertThisInitialized$1(_this), "currentType", void 0);

        _defineProperty$5(_assertThisInitialized$1(_this), "handleChange", function () {
          var nextState = _this.getCurrentState();

          if (!shallowEqual(nextState, _this.state)) {
            _this.setState(nextState);
          }
        });

        _this.disposable = new SerialDisposable();

        _this.receiveProps(props);

        _this.dispose();

        return _this;
      }

      _createClass$5(DragDropContainer, [{
        key: "getHandlerId",
        value: function getHandlerId() {
          return this.handlerId;
        }
      }, {
        key: "getDecoratedComponentInstance",
        value: function getDecoratedComponentInstance() {
          invariant(this.decoratedRef.current, 'In order to access an instance of the decorated component, it must either be a class component or use React.forwardRef()');
          return this.decoratedRef.current;
        }
      }, {
        key: "shouldComponentUpdate",
        value: function shouldComponentUpdate(nextProps, nextState) {
          return !arePropsEqual(nextProps, this.props) || !shallowEqual(nextState, this.state);
        }
      }, {
        key: "componentDidMount",
        value: function componentDidMount() {
          this.disposable = new SerialDisposable();
          this.currentType = undefined;
          this.receiveProps(this.props);
          this.handleChange();
        }
      }, {
        key: "componentDidUpdate",
        value: function componentDidUpdate(prevProps) {
          if (!arePropsEqual(this.props, prevProps)) {
            this.receiveProps(this.props);
            this.handleChange();
          }
        }
      }, {
        key: "componentWillUnmount",
        value: function componentWillUnmount() {
          this.dispose();
        }
      }, {
        key: "receiveProps",
        value: function receiveProps(props) {
          if (!this.handler) {
            return;
          }

          this.handler.receiveProps(props);
          this.receiveType(getType(props));
        }
      }, {
        key: "receiveType",
        value: function receiveType(type) {
          if (!this.handlerMonitor || !this.manager || !this.handlerConnector) {
            return;
          }

          if (type === this.currentType) {
            return;
          }

          this.currentType = type;

          var _registerHandler = registerHandler(type, this.handler, this.manager),
              _registerHandler2 = _slicedToArray$5(_registerHandler, 2),
              handlerId = _registerHandler2[0],
              unregister = _registerHandler2[1];

          this.handlerId = handlerId;
          this.handlerMonitor.receiveHandlerId(handlerId);
          this.handlerConnector.receiveHandlerId(handlerId);
          var globalMonitor = this.manager.getMonitor();
          var unsubscribe = globalMonitor.subscribeToStateChange(this.handleChange, {
            handlerIds: [handlerId]
          });
          this.disposable.setDisposable(new CompositeDisposable(new Disposable(unsubscribe), new Disposable(unregister)));
        }
      }, {
        key: "dispose",
        value: function dispose() {
          this.disposable.dispose();

          if (this.handlerConnector) {
            this.handlerConnector.receiveHandlerId(null);
          }
        }
      }, {
        key: "getCurrentState",
        value: function getCurrentState() {
          if (!this.handlerConnector) {
            return {};
          }

          var nextState = collect(this.handlerConnector.hooks, this.handlerMonitor, this.props);

          {
            invariant(isPlainObject(nextState), 'Expected `collect` specified as the second argument to ' + '%s for %s to return a plain object of props to inject. ' + 'Instead, received %s.', containerDisplayName, displayName, nextState);
          }

          return nextState;
        }
      }, {
        key: "render",
        value: function render() {
          var _this2 = this;

          return jsxRuntime.jsx(DndContext.Consumer, {
            children: function children(_ref2) {
              var dragDropManager = _ref2.dragDropManager;

              _this2.receiveDragDropManager(dragDropManager);

              if (typeof requestAnimationFrame !== 'undefined') {
                requestAnimationFrame(function () {
                  var _this2$handlerConnect;

                  return (_this2$handlerConnect = _this2.handlerConnector) === null || _this2$handlerConnect === void 0 ? void 0 : _this2$handlerConnect.reconnect();
                });
              }

              return jsxRuntime.jsx(Decorated, Object.assign({}, _this2.props, _this2.getCurrentState(), {
                // NOTE: if Decorated is a Function Component, decoratedRef will not be populated unless it's a refforwarding component.
                ref: isRefable(Decorated) ? _this2.decoratedRef : null
              }), void 0);
            }
          }, void 0);
        }
      }, {
        key: "receiveDragDropManager",
        value: function receiveDragDropManager(dragDropManager) {
          if (this.manager !== undefined) {
            return;
          }

          invariant(dragDropManager !== undefined, 'Could not find the drag and drop manager in the context of %s. ' + 'Make sure to render a DndProvider component in your top-level component. ' + 'Read more: http://react-dnd.github.io/react-dnd/docs/troubleshooting#could-not-find-the-drag-and-drop-manager-in-the-context', displayName, displayName);

          if (dragDropManager === undefined) {
            return;
          }

          this.manager = dragDropManager;
          this.handlerMonitor = createMonitor(dragDropManager);
          this.handlerConnector = createConnector(dragDropManager.getBackend());
          this.handler = createHandler(this.handlerMonitor, this.decoratedRef);
        }
      }]);

      return DragDropContainer;
    }(f.Component);

    _defineProperty$5(DragDropContainer, "DecoratedComponent", DecoratedComponent);

    _defineProperty$5(DragDropContainer, "displayName", "".concat(containerDisplayName, "(").concat(displayName, ")"));

    return hoistStatics(DragDropContainer, DecoratedComponent);
  }

  function _classCallCheck$4(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties$4(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass$4(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties$4(Constructor.prototype, protoProps); if (staticProps) _defineProperties$4(Constructor, staticProps); return Constructor; }

  function _defineProperty$4(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
  var ALLOWED_SPEC_METHODS$1 = ['canDrag', 'beginDrag', 'isDragging', 'endDrag'];
  var REQUIRED_SPEC_METHODS = ['beginDrag'];

  var SourceImpl = /*#__PURE__*/function () {
    function SourceImpl(spec, monitor, ref) {
      var _this = this;

      _classCallCheck$4(this, SourceImpl);

      _defineProperty$4(this, "props", null);

      _defineProperty$4(this, "spec", void 0);

      _defineProperty$4(this, "monitor", void 0);

      _defineProperty$4(this, "ref", void 0);

      _defineProperty$4(this, "beginDrag", function () {
        if (!_this.props) {
          return;
        }

        var item = _this.spec.beginDrag(_this.props, _this.monitor, _this.ref.current);

        {
          invariant(isPlainObject(item), 'beginDrag() must return a plain object that represents the dragged item. ' + 'Instead received %s. ' + 'Read more: http://react-dnd.github.io/react-dnd/docs/api/drag-source', item);
        }

        return item;
      });

      this.spec = spec;
      this.monitor = monitor;
      this.ref = ref;
    }

    _createClass$4(SourceImpl, [{
      key: "receiveProps",
      value: function receiveProps(props) {
        this.props = props;
      }
    }, {
      key: "canDrag",
      value: function canDrag() {
        if (!this.props) {
          return false;
        }

        if (!this.spec.canDrag) {
          return true;
        }

        return this.spec.canDrag(this.props, this.monitor);
      }
    }, {
      key: "isDragging",
      value: function isDragging(globalMonitor, sourceId) {
        if (!this.props) {
          return false;
        }

        if (!this.spec.isDragging) {
          return sourceId === globalMonitor.getSourceId();
        }

        return this.spec.isDragging(this.props, this.monitor);
      }
    }, {
      key: "endDrag",
      value: function endDrag() {
        if (!this.props) {
          return;
        }

        if (!this.spec.endDrag) {
          return;
        }

        this.spec.endDrag(this.props, this.monitor, getDecoratedComponent(this.ref));
      }
    }]);

    return SourceImpl;
  }();

  function createSourceFactory(spec) {
    Object.keys(spec).forEach(function (key) {
      invariant(ALLOWED_SPEC_METHODS$1.indexOf(key) > -1, 'Expected the drag source specification to only have ' + 'some of the following keys: %s. ' + 'Instead received a specification with an unexpected "%s" key. ' + 'Read more: http://react-dnd.github.io/react-dnd/docs/api/drag-source', ALLOWED_SPEC_METHODS$1.join(', '), key);
      invariant(typeof spec[key] === 'function', 'Expected %s in the drag source specification to be a function. ' + 'Instead received a specification with %s: %s. ' + 'Read more: http://react-dnd.github.io/react-dnd/docs/api/drag-source', key, key, spec[key]);
    });
    REQUIRED_SPEC_METHODS.forEach(function (key) {
      invariant(typeof spec[key] === 'function', 'Expected %s in the drag source specification to be a function. ' + 'Instead received a specification with %s: %s. ' + 'Read more: http://react-dnd.github.io/react-dnd/docs/api/drag-source', key, key, spec[key]);
    });
    return function createSource(monitor, ref) {
      return new SourceImpl(spec, monitor, ref);
    };
  }

  /**
   * Decorates a component as a dragsource
   * @param type The dragsource type
   * @param spec The drag source specification
   * @param collect The props collector function
   * @param options DnD options
   */

  function DragSource(type, spec, collect) {
    var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
    checkDecoratorArguments('DragSource', 'type, spec, collect[, options]', type, spec, collect, options);
    var getType = type;

    if (typeof type !== 'function') {
      invariant(isValidType(type), 'Expected "type" provided as the first argument to DragSource to be ' + 'a string, or a function that returns a string given the current props. ' + 'Instead, received %s. ' + 'Read more: http://react-dnd.github.io/react-dnd/docs/api/drag-source', type);

      getType = function getType() {
        return type;
      };
    }

    invariant(isPlainObject(spec), 'Expected "spec" provided as the second argument to DragSource to be ' + 'a plain object. Instead, received %s. ' + 'Read more: http://react-dnd.github.io/react-dnd/docs/api/drag-source', spec);
    var createSource = createSourceFactory(spec);
    invariant(typeof collect === 'function', 'Expected "collect" provided as the third argument to DragSource to be ' + 'a function that returns a plain object of props to inject. ' + 'Instead, received %s. ' + 'Read more: http://react-dnd.github.io/react-dnd/docs/api/drag-source', collect);
    invariant(isPlainObject(options), 'Expected "options" provided as the fourth argument to DragSource to be ' + 'a plain object when specified. ' + 'Instead, received %s. ' + 'Read more: http://react-dnd.github.io/react-dnd/docs/api/drag-source', collect);
    return function decorateSource(DecoratedComponent) {
      return decorateHandler({
        containerDisplayName: 'DragSource',
        createHandler: createSource,
        registerHandler: registerSource,
        createConnector: function createConnector(backend) {
          return new SourceConnector(backend);
        },
        createMonitor: function createMonitor(manager) {
          return new DragSourceMonitorImpl(manager);
        },
        DecoratedComponent: DecoratedComponent,
        getType: getType,
        collect: collect,
        options: options
      });
    };
  }

  function _classCallCheck$3(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties$3(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass$3(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties$3(Constructor.prototype, protoProps); if (staticProps) _defineProperties$3(Constructor, staticProps); return Constructor; }

  function _defineProperty$3(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
  var ALLOWED_SPEC_METHODS = ['canDrop', 'hover', 'drop'];

  var TargetImpl = /*#__PURE__*/function () {
    function TargetImpl(spec, monitor, ref) {
      _classCallCheck$3(this, TargetImpl);

      _defineProperty$3(this, "props", null);

      _defineProperty$3(this, "spec", void 0);

      _defineProperty$3(this, "monitor", void 0);

      _defineProperty$3(this, "ref", void 0);

      this.spec = spec;
      this.monitor = monitor;
      this.ref = ref;
    }

    _createClass$3(TargetImpl, [{
      key: "receiveProps",
      value: function receiveProps(props) {
        this.props = props;
      }
    }, {
      key: "receiveMonitor",
      value: function receiveMonitor(monitor) {
        this.monitor = monitor;
      }
    }, {
      key: "canDrop",
      value: function canDrop() {
        if (!this.spec.canDrop) {
          return true;
        }

        return this.spec.canDrop(this.props, this.monitor);
      }
    }, {
      key: "hover",
      value: function hover() {
        if (!this.spec.hover || !this.props) {
          return;
        }

        this.spec.hover(this.props, this.monitor, getDecoratedComponent(this.ref));
      }
    }, {
      key: "drop",
      value: function drop() {
        if (!this.spec.drop) {
          return undefined;
        }

        var dropResult = this.spec.drop(this.props, this.monitor, this.ref.current);

        {
          invariant(typeof dropResult === 'undefined' || isPlainObject(dropResult), 'drop() must either return undefined, or an object that represents the drop result. ' + 'Instead received %s. ' + 'Read more: http://react-dnd.github.io/react-dnd/docs/api/drop-target', dropResult);
        }

        return dropResult;
      }
    }]);

    return TargetImpl;
  }();

  function createTargetFactory(spec) {
    Object.keys(spec).forEach(function (key) {
      invariant(ALLOWED_SPEC_METHODS.indexOf(key) > -1, 'Expected the drop target specification to only have ' + 'some of the following keys: %s. ' + 'Instead received a specification with an unexpected "%s" key. ' + 'Read more: http://react-dnd.github.io/react-dnd/docs/api/drop-target', ALLOWED_SPEC_METHODS.join(', '), key);
      invariant(typeof spec[key] === 'function', 'Expected %s in the drop target specification to be a function. ' + 'Instead received a specification with %s: %s. ' + 'Read more: http://react-dnd.github.io/react-dnd/docs/api/drop-target', key, key, spec[key]);
    });
    return function createTarget(monitor, ref) {
      return new TargetImpl(spec, monitor, ref);
    };
  }

  /**
   * @param type The accepted target type
   * @param spec The DropTarget specification
   * @param collect The props collector function
   * @param options Options
   */

  function DropTarget(type, spec, collect) {
    var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
    checkDecoratorArguments('DropTarget', 'type, spec, collect[, options]', type, spec, collect, options);
    var getType = type;

    if (typeof type !== 'function') {
      invariant(isValidType(type, true), 'Expected "type" provided as the first argument to DropTarget to be ' + 'a string, an array of strings, or a function that returns either given ' + 'the current props. Instead, received %s. ' + 'Read more: http://react-dnd.github.io/react-dnd/docs/api/drop-target', type);

      getType = function getType() {
        return type;
      };
    }

    invariant(isPlainObject(spec), 'Expected "spec" provided as the second argument to DropTarget to be ' + 'a plain object. Instead, received %s. ' + 'Read more: http://react-dnd.github.io/react-dnd/docs/api/drop-target', spec);
    var createTarget = createTargetFactory(spec);
    invariant(typeof collect === 'function', 'Expected "collect" provided as the third argument to DropTarget to be ' + 'a function that returns a plain object of props to inject. ' + 'Instead, received %s. ' + 'Read more: http://react-dnd.github.io/react-dnd/docs/api/drop-target', collect);
    invariant(isPlainObject(options), 'Expected "options" provided as the fourth argument to DropTarget to be ' + 'a plain object when specified. ' + 'Instead, received %s. ' + 'Read more: http://react-dnd.github.io/react-dnd/docs/api/drop-target', collect);
    return function decorateTarget(DecoratedComponent) {
      return decorateHandler({
        containerDisplayName: 'DropTarget',
        createHandler: createTarget,
        registerHandler: registerTarget,
        createMonitor: function createMonitor(manager) {
          return new DropTargetMonitorImpl(manager);
        },
        createConnector: function createConnector(backend) {
          return new TargetConnector(backend);
        },
        DecoratedComponent: DecoratedComponent,
        getType: getType,
        collect: collect,
        options: options
      });
    };
  }

  function _typeof$1(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof$1 = function _typeof(obj) { return typeof obj; }; } else { _typeof$1 = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof$1(obj); }

  function _classCallCheck$2(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties$2(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass$2(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties$2(Constructor.prototype, protoProps); if (staticProps) _defineProperties$2(Constructor, staticProps); return Constructor; }

  function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

  function _possibleConstructorReturn(self, call) { if (call && (_typeof$1(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

  function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

  function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

  function _defineProperty$2(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
  /**
   * @param collect The props collector function
   * @param options The DnD options
   */

  function DragLayer(collect) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    checkDecoratorArguments('DragLayer', 'collect[, options]', collect, options);
    invariant(typeof collect === 'function', 'Expected "collect" provided as the first argument to DragLayer to be a function that collects props to inject into the component. ', 'Instead, received %s. Read more: http://react-dnd.github.io/react-dnd/docs/api/drag-layer', collect);
    invariant(isPlainObject(options), 'Expected "options" provided as the second argument to DragLayer to be a plain object when specified. ' + 'Instead, received %s. Read more: http://react-dnd.github.io/react-dnd/docs/api/drag-layer', options);
    return function decorateLayer(DecoratedComponent) {
      var Decorated = DecoratedComponent;
      var _options$arePropsEqua = options.arePropsEqual,
          arePropsEqual = _options$arePropsEqua === void 0 ? shallowEqual : _options$arePropsEqua;
      var displayName = Decorated.displayName || Decorated.name || 'Component';

      var DragLayerContainer = /*#__PURE__*/function (_Component) {
        _inherits(DragLayerContainer, _Component);

        var _super = _createSuper(DragLayerContainer);

        function DragLayerContainer() {
          var _this;

          _classCallCheck$2(this, DragLayerContainer);

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _super.call.apply(_super, [this].concat(args));

          _defineProperty$2(_assertThisInitialized(_this), "manager", void 0);

          _defineProperty$2(_assertThisInitialized(_this), "isCurrentlyMounted", false);

          _defineProperty$2(_assertThisInitialized(_this), "unsubscribeFromOffsetChange", void 0);

          _defineProperty$2(_assertThisInitialized(_this), "unsubscribeFromStateChange", void 0);

          _defineProperty$2(_assertThisInitialized(_this), "ref", f.createRef());

          _defineProperty$2(_assertThisInitialized(_this), "handleChange", function () {
            if (!_this.isCurrentlyMounted) {
              return;
            }

            var nextState = _this.getCurrentState();

            if (!shallowEqual(nextState, _this.state)) {
              _this.setState(nextState);
            }
          });

          return _this;
        }

        _createClass$2(DragLayerContainer, [{
          key: "getDecoratedComponentInstance",
          value: function getDecoratedComponentInstance() {
            invariant(this.ref.current, 'In order to access an instance of the decorated component, it must either be a class component or use React.forwardRef()');
            return this.ref.current;
          }
        }, {
          key: "shouldComponentUpdate",
          value: function shouldComponentUpdate(nextProps, nextState) {
            return !arePropsEqual(nextProps, this.props) || !shallowEqual(nextState, this.state);
          }
        }, {
          key: "componentDidMount",
          value: function componentDidMount() {
            this.isCurrentlyMounted = true;
            this.handleChange();
          }
        }, {
          key: "componentWillUnmount",
          value: function componentWillUnmount() {
            this.isCurrentlyMounted = false;

            if (this.unsubscribeFromOffsetChange) {
              this.unsubscribeFromOffsetChange();
              this.unsubscribeFromOffsetChange = undefined;
            }

            if (this.unsubscribeFromStateChange) {
              this.unsubscribeFromStateChange();
              this.unsubscribeFromStateChange = undefined;
            }
          }
        }, {
          key: "render",
          value: function render() {
            var _this2 = this;

            return jsxRuntime.jsx(DndContext.Consumer, {
              children: function children(_ref) {
                var dragDropManager = _ref.dragDropManager;

                if (dragDropManager === undefined) {
                  return null;
                }

                _this2.receiveDragDropManager(dragDropManager); // Let componentDidMount fire to initialize the collected state


                if (!_this2.isCurrentlyMounted) {
                  return null;
                }

                return jsxRuntime.jsx(Decorated, Object.assign({}, _this2.props, _this2.state, {
                  ref: isRefable(Decorated) ? _this2.ref : null
                }), void 0);
              }
            }, void 0);
          }
        }, {
          key: "receiveDragDropManager",
          value: function receiveDragDropManager(dragDropManager) {
            if (this.manager !== undefined) {
              return;
            }

            this.manager = dragDropManager;
            invariant(_typeof$1(dragDropManager) === 'object', 'Could not find the drag and drop manager in the context of %s. ' + 'Make sure to render a DndProvider component in your top-level component. ' + 'Read more: http://react-dnd.github.io/react-dnd/docs/troubleshooting#could-not-find-the-drag-and-drop-manager-in-the-context', displayName, displayName);
            var monitor = this.manager.getMonitor();
            this.unsubscribeFromOffsetChange = monitor.subscribeToOffsetChange(this.handleChange);
            this.unsubscribeFromStateChange = monitor.subscribeToStateChange(this.handleChange);
          }
        }, {
          key: "getCurrentState",
          value: function getCurrentState() {
            if (!this.manager) {
              return {};
            }

            var monitor = this.manager.getMonitor();
            return collect(monitor, this.props);
          }
        }]);

        return DragLayerContainer;
      }(f.Component);

      _defineProperty$2(DragLayerContainer, "displayName", "DragLayer(".concat(displayName, ")"));

      _defineProperty$2(DragLayerContainer, "DecoratedComponent", DecoratedComponent);

      return hoistStatics(DragLayerContainer, DecoratedComponent);
    };
  }

  var useIsomorphicLayoutEffect = typeof window !== 'undefined' ? f.useLayoutEffect : f.useEffect;

  function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

  function _classCallCheck$1(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties$1(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass$1(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties$1(Constructor.prototype, protoProps); if (staticProps) _defineProperties$1(Constructor, staticProps); return Constructor; }

  function _defineProperty$1(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  var DragSourceImpl = /*#__PURE__*/function () {
    function DragSourceImpl(spec, monitor, connector) {
      _classCallCheck$1(this, DragSourceImpl);

      _defineProperty$1(this, "spec", void 0);

      _defineProperty$1(this, "monitor", void 0);

      _defineProperty$1(this, "connector", void 0);

      this.spec = spec;
      this.monitor = monitor;
      this.connector = connector;
    }

    _createClass$1(DragSourceImpl, [{
      key: "beginDrag",
      value: function beginDrag() {
        var _result;

        var spec = this.spec;
        var monitor = this.monitor;
        var result = null;

        if (_typeof(spec.item) === 'object') {
          result = spec.item;
        } else if (typeof spec.item === 'function') {
          result = spec.item(monitor);
        } else {
          result = {};
        }

        return (_result = result) !== null && _result !== void 0 ? _result : null;
      }
    }, {
      key: "canDrag",
      value: function canDrag() {
        var spec = this.spec;
        var monitor = this.monitor;

        if (typeof spec.canDrag === 'boolean') {
          return spec.canDrag;
        } else if (typeof spec.canDrag === 'function') {
          return spec.canDrag(monitor);
        } else {
          return true;
        }
      }
    }, {
      key: "isDragging",
      value: function isDragging(globalMonitor, target) {
        var spec = this.spec;
        var monitor = this.monitor;
        var isDragging = spec.isDragging;
        return isDragging ? isDragging(monitor) : target === globalMonitor.getSourceId();
      }
    }, {
      key: "endDrag",
      value: function endDrag() {
        var spec = this.spec;
        var monitor = this.monitor;
        var connector = this.connector;
        var end = spec.end;

        if (end) {
          end(monitor.getItem(), monitor);
        }

        connector.reconnect();
      }
    }]);

    return DragSourceImpl;
  }();

  function useDragSource(spec, monitor, connector) {
    var handler = f.useMemo(function () {
      return new DragSourceImpl(spec, monitor, connector);
    }, [monitor, connector]);
    f.useEffect(function () {
      handler.spec = spec;
    }, [spec]);
    return handler;
  }

  /**
   * A hook to retrieve the DragDropManager from Context
   */

  function useDragDropManager() {
    var _useContext = f.useContext(DndContext),
        dragDropManager = _useContext.dragDropManager;

    invariant(dragDropManager != null, 'Expected drag drop context');
    return dragDropManager;
  }

  function useDragType(spec) {
    return f.useMemo(function () {
      var result = spec.type;
      invariant(result != null, 'spec.type must be defined');
      return result;
    }, [spec]);
  }

  function _slicedToArray$4(arr, i) { return _arrayWithHoles$4(arr) || _iterableToArrayLimit$4(arr, i) || _unsupportedIterableToArray$5(arr, i) || _nonIterableRest$4(); }

  function _nonIterableRest$4() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

  function _unsupportedIterableToArray$5(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$5(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$5(o, minLen); }

  function _arrayLikeToArray$5(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

  function _iterableToArrayLimit$4(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

  function _arrayWithHoles$4(arr) { if (Array.isArray(arr)) return arr; }
  function useRegisteredDragSource(spec, monitor, connector) {
    var manager = useDragDropManager();
    var handler = useDragSource(spec, monitor, connector);
    var itemType = useDragType(spec);
    useIsomorphicLayoutEffect(function registerDragSource() {
      if (itemType != null) {
        var _registerSource = registerSource(itemType, handler, manager),
            _registerSource2 = _slicedToArray$4(_registerSource, 2),
            handlerId = _registerSource2[0],
            unregister = _registerSource2[1];

        monitor.receiveHandlerId(handlerId);
        connector.receiveHandlerId(handlerId);
        return unregister;
      }
    }, [manager, monitor, connector, handler, itemType]);
  }

  function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray$4(arr) || _nonIterableSpread(); }

  function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

  function _unsupportedIterableToArray$4(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$4(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$4(o, minLen); }

  function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

  function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray$4(arr); }

  function _arrayLikeToArray$4(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
  function useOptionalFactory(arg, deps) {
    var memoDeps = _toConsumableArray(deps || []);

    if (deps == null && typeof arg !== 'function') {
      memoDeps.push(arg);
    }

    return f.useMemo(function () {
      return typeof arg === 'function' ? arg() : arg;
    }, memoDeps);
  }

  function useDragSourceMonitor() {
    var manager = useDragDropManager();
    return f.useMemo(function () {
      return new DragSourceMonitorImpl(manager);
    }, [manager]);
  }

  function useDragSourceConnector(dragSourceOptions, dragPreviewOptions) {
    var manager = useDragDropManager();
    var connector = f.useMemo(function () {
      return new SourceConnector(manager.getBackend());
    }, [manager]);
    useIsomorphicLayoutEffect(function () {
      connector.dragSourceOptions = dragSourceOptions || null;
      connector.reconnect();
      return function () {
        return connector.disconnectDragSource();
      };
    }, [connector, dragSourceOptions]);
    useIsomorphicLayoutEffect(function () {
      connector.dragPreviewOptions = dragPreviewOptions || null;
      connector.reconnect();
      return function () {
        return connector.disconnectDragPreview();
      };
    }, [connector, dragPreviewOptions]);
    return connector;
  }

  // do not edit .js files directly - edit src/index.jst



  var fastDeepEqual = function equal(a, b) {
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



      if (a.constructor === RegExp) return a.source === b.source && a.flags === b.flags;
      if (a.valueOf !== Object.prototype.valueOf) return a.valueOf() === b.valueOf();
      if (a.toString !== Object.prototype.toString) return a.toString() === b.toString();

      keys = Object.keys(a);
      length = keys.length;
      if (length !== Object.keys(b).length) return false;

      for (i = length; i-- !== 0;)
        if (!Object.prototype.hasOwnProperty.call(b, keys[i])) return false;

      for (i = length; i-- !== 0;) {
        var key = keys[i];

        if (!equal(a[key], b[key])) return false;
      }

      return true;
    }

    // true if both NaN, false otherwise
    return a!==a && b!==b;
  };

  function _slicedToArray$3(arr, i) { return _arrayWithHoles$3(arr) || _iterableToArrayLimit$3(arr, i) || _unsupportedIterableToArray$3(arr, i) || _nonIterableRest$3(); }

  function _nonIterableRest$3() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

  function _unsupportedIterableToArray$3(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$3(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$3(o, minLen); }

  function _arrayLikeToArray$3(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

  function _iterableToArrayLimit$3(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

  function _arrayWithHoles$3(arr) { if (Array.isArray(arr)) return arr; }
  /**
   *
   * @param monitor The monitor to collect state from
   * @param collect The collecting function
   * @param onUpdate A method to invoke when updates occur
   */

  function useCollector(monitor, collect, onUpdate) {
    var _useState = f.useState(function () {
      return collect(monitor);
    }),
        _useState2 = _slicedToArray$3(_useState, 2),
        collected = _useState2[0],
        setCollected = _useState2[1];

    var updateCollected = f.useCallback(function () {
      var nextValue = collect(monitor); // This needs to be a deep-equality check because some monitor-collected values
      // include XYCoord objects that may be equivalent, but do not have instance equality.

      if (!fastDeepEqual(collected, nextValue)) {
        setCollected(nextValue);

        if (onUpdate) {
          onUpdate();
        }
      }
    }, [collected, monitor, onUpdate]); // update the collected properties after react renders.
    // Note that the "Dustbin Stress Test" fails if this is not
    // done when the component updates

    useIsomorphicLayoutEffect(updateCollected);
    return [collected, updateCollected];
  }

  function _slicedToArray$2(arr, i) { return _arrayWithHoles$2(arr) || _iterableToArrayLimit$2(arr, i) || _unsupportedIterableToArray$2(arr, i) || _nonIterableRest$2(); }

  function _nonIterableRest$2() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

  function _unsupportedIterableToArray$2(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$2(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$2(o, minLen); }

  function _arrayLikeToArray$2(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

  function _iterableToArrayLimit$2(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

  function _arrayWithHoles$2(arr) { if (Array.isArray(arr)) return arr; }
  function useMonitorOutput(monitor, collect, onCollect) {
    var _useCollector = useCollector(monitor, collect, onCollect),
        _useCollector2 = _slicedToArray$2(_useCollector, 2),
        collected = _useCollector2[0],
        updateCollected = _useCollector2[1];

    useIsomorphicLayoutEffect(function subscribeToMonitorStateChange() {
      var handlerId = monitor.getHandlerId();

      if (handlerId == null) {
        return;
      }

      return monitor.subscribeToStateChange(updateCollected, {
        handlerIds: [handlerId]
      });
    }, [monitor, updateCollected]);
    return collected;
  }

  function useCollectedProps(collector, monitor, connector) {
    return useMonitorOutput(monitor, collector || function () {
      return {};
    }, function () {
      return connector.reconnect();
    });
  }

  function useConnectDragSource(connector) {
    return f.useMemo(function () {
      return connector.hooks.dragSource();
    }, [connector]);
  }
  function useConnectDragPreview(connector) {
    return f.useMemo(function () {
      return connector.hooks.dragPreview();
    }, [connector]);
  }

  /**
   * useDragSource hook
   * @param sourceSpec The drag source specification (object or function, function preferred)
   * @param deps The memoization deps array to use when evaluating spec changes
   */

  function useDrag(specArg, deps) {
    var spec = useOptionalFactory(specArg, deps);
    invariant(!spec.begin, "useDrag::spec.begin was deprecated in v14. Replace spec.begin() with spec.item(). (see more here - https://react-dnd.github.io/react-dnd/docs/api/use-drag)");
    var monitor = useDragSourceMonitor();
    var connector = useDragSourceConnector(spec.options, spec.previewOptions);
    useRegisteredDragSource(spec, monitor, connector);
    return [useCollectedProps(spec.collect, monitor, connector), useConnectDragSource(connector), useConnectDragPreview(connector)];
  }

  /**
   * Internal utility hook to get an array-version of spec.accept.
   * The main utility here is that we aren't creating a new array on every render if a non-array spec.accept is passed in.
   * @param spec
   */

  function useAccept(spec) {
    var accept = spec.accept;
    return f.useMemo(function () {
      invariant(spec.accept != null, 'accept must be defined');
      return Array.isArray(accept) ? accept : [accept];
    }, [accept]);
  }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  var DropTargetImpl = /*#__PURE__*/function () {
    function DropTargetImpl(spec, monitor) {
      _classCallCheck(this, DropTargetImpl);

      _defineProperty(this, "spec", void 0);

      _defineProperty(this, "monitor", void 0);

      this.spec = spec;
      this.monitor = monitor;
    }

    _createClass(DropTargetImpl, [{
      key: "canDrop",
      value: function canDrop() {
        var spec = this.spec;
        var monitor = this.monitor;
        return spec.canDrop ? spec.canDrop(monitor.getItem(), monitor) : true;
      }
    }, {
      key: "hover",
      value: function hover() {
        var spec = this.spec;
        var monitor = this.monitor;

        if (spec.hover) {
          spec.hover(monitor.getItem(), monitor);
        }
      }
    }, {
      key: "drop",
      value: function drop() {
        var spec = this.spec;
        var monitor = this.monitor;

        if (spec.drop) {
          return spec.drop(monitor.getItem(), monitor);
        }
      }
    }]);

    return DropTargetImpl;
  }();

  function useDropTarget(spec, monitor) {
    var dropTarget = f.useMemo(function () {
      return new DropTargetImpl(spec, monitor);
    }, [monitor]);
    f.useEffect(function () {
      dropTarget.spec = spec;
    }, [spec]);
    return dropTarget;
  }

  function _slicedToArray$1(arr, i) { return _arrayWithHoles$1(arr) || _iterableToArrayLimit$1(arr, i) || _unsupportedIterableToArray$1(arr, i) || _nonIterableRest$1(); }

  function _nonIterableRest$1() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

  function _unsupportedIterableToArray$1(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$1(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$1(o, minLen); }

  function _arrayLikeToArray$1(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

  function _iterableToArrayLimit$1(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

  function _arrayWithHoles$1(arr) { if (Array.isArray(arr)) return arr; }
  function useRegisteredDropTarget(spec, monitor, connector) {
    var manager = useDragDropManager();
    var dropTarget = useDropTarget(spec, monitor);
    var accept = useAccept(spec);
    useIsomorphicLayoutEffect(function registerDropTarget() {
      var _registerTarget = registerTarget(accept, dropTarget, manager),
          _registerTarget2 = _slicedToArray$1(_registerTarget, 2),
          handlerId = _registerTarget2[0],
          unregister = _registerTarget2[1];

      monitor.receiveHandlerId(handlerId);
      connector.receiveHandlerId(handlerId);
      return unregister;
    }, [manager, monitor, dropTarget, connector, accept.map(function (a) {
      return a.toString();
    }).join('|')]);
  }

  function useDropTargetMonitor() {
    var manager = useDragDropManager();
    return f.useMemo(function () {
      return new DropTargetMonitorImpl(manager);
    }, [manager]);
  }

  function useDropTargetConnector(options) {
    var manager = useDragDropManager();
    var connector = f.useMemo(function () {
      return new TargetConnector(manager.getBackend());
    }, [manager]);
    useIsomorphicLayoutEffect(function () {
      connector.dropTargetOptions = options || null;
      connector.reconnect();
      return function () {
        return connector.disconnectDropTarget();
      };
    }, [options]);
    return connector;
  }

  function useConnectDropTarget(connector) {
    return f.useMemo(function () {
      return connector.hooks.dropTarget();
    }, [connector]);
  }

  /**
   * useDropTarget Hook
   * @param spec The drop target specification (object or function, function preferred)
   * @param deps The memoization deps array to use when evaluating spec changes
   */

  function useDrop(specArg, deps) {
    var spec = useOptionalFactory(specArg, deps);
    var monitor = useDropTargetMonitor();
    var connector = useDropTargetConnector(spec.options);
    useRegisteredDropTarget(spec, monitor, connector);
    return [useCollectedProps(spec.collect, monitor, connector), useConnectDropTarget(connector)];
  }

  function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

  function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

  function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

  function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

  function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

  function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
  /**
   * useDragLayer Hook
   * @param collector The property collector
   */

  function useDragLayer(collect) {
    var dragDropManager = useDragDropManager();
    var monitor = dragDropManager.getMonitor();

    var _useCollector = useCollector(monitor, collect),
        _useCollector2 = _slicedToArray(_useCollector, 2),
        collected = _useCollector2[0],
        updateCollected = _useCollector2[1];

    f.useEffect(function () {
      return monitor.subscribeToOffsetChange(updateCollected);
    });
    f.useEffect(function () {
      return monitor.subscribeToStateChange(updateCollected);
    });
    return collected;
  }

  exports.DndContext = DndContext;
  exports.DndProvider = DndProvider;
  exports.DragLayer = DragLayer;
  exports.DragPreviewImage = DragPreviewImage;
  exports.DragSource = DragSource;
  exports.DropTarget = DropTarget;
  exports.useDrag = useDrag;
  exports.useDragDropManager = useDragDropManager;
  exports.useDragLayer = useDragLayer;
  exports.useDrop = useDrop;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
