(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('inferno'), require('inferno-shared'), require('hoist-non-inferno-statics')) :
	typeof define === 'function' && define.amd ? define(['exports', 'inferno', 'inferno-shared', 'hoist-non-inferno-statics'], factory) :
	(factory((global.Inferno = global.Inferno || {}, global.Inferno.Router = {}),global.Inferno,global.Inferno.Shared,global.hoistStatics));
}(this, (function (exports,inferno,infernoShared,hoistStatics) { 'use strict';

	hoistStatics = hoistStatics && hoistStatics.hasOwnProperty('default') ? hoistStatics['default'] : hoistStatics;

	/*! *****************************************************************************
	Copyright (c) Microsoft Corporation. All rights reserved.
	Licensed under the Apache License, Version 2.0 (the "License"); you may not use
	this file except in compliance with the License. You may obtain a copy of the
	License at http://www.apache.org/licenses/LICENSE-2.0

	THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
	KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
	WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
	MERCHANTABLITY OR NON-INFRINGEMENT.

	See the Apache Version 2.0 License for specific language governing permissions
	and limitations under the License.
	***************************************************************************** */
	/* global Reflect, Promise */





	function __rest(s, e) {
	    var t = {};
	    for (var p in s) { if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
	        { t[p] = s[p]; } }
	    if (s != null && typeof Object.getOwnPropertySymbols === "function")
	        { for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) { if (e.indexOf(p[i]) < 0)
	            { t[p[i]] = s[p[i]]; } } }
	    return t;
	}

	function unwrapExports (x) {
		return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
	}

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	var PathUtils = createCommonjsModule((function (module, exports) {
	exports.__esModule = true;
	var addLeadingSlash = exports.addLeadingSlash = function addLeadingSlash(path) {
	  return path.charAt(0) === '/' ? path : '/' + path;
	};

	var stripLeadingSlash = exports.stripLeadingSlash = function stripLeadingSlash(path) {
	  return path.charAt(0) === '/' ? path.substr(1) : path;
	};

	var hasBasename = exports.hasBasename = function hasBasename(path, prefix) {
	  return new RegExp('^' + prefix + '(\\/|\\?|#|$)', 'i').test(path);
	};

	var stripBasename = exports.stripBasename = function stripBasename(path, prefix) {
	  return hasBasename(path, prefix) ? path.substr(prefix.length) : path;
	};

	var stripTrailingSlash = exports.stripTrailingSlash = function stripTrailingSlash(path) {
	  return path.charAt(path.length - 1) === '/' ? path.slice(0, -1) : path;
	};

	var parsePath = exports.parsePath = function parsePath(path) {
	  var pathname = path || '/';
	  var search = '';
	  var hash = '';

	  var hashIndex = pathname.indexOf('#');
	  if (hashIndex !== -1) {
	    hash = pathname.substr(hashIndex);
	    pathname = pathname.substr(0, hashIndex);
	  }

	  var searchIndex = pathname.indexOf('?');
	  if (searchIndex !== -1) {
	    search = pathname.substr(searchIndex);
	    pathname = pathname.substr(0, searchIndex);
	  }

	  return {
	    pathname: pathname,
	    search: search === '?' ? '' : search,
	    hash: hash === '#' ? '' : hash
	  };
	};

	var createPath = exports.createPath = function createPath(location) {
	  var pathname = location.pathname,
	      search = location.search,
	      hash = location.hash;


	  var path = pathname || '/';

	  if (search && search !== '?') { path += search.charAt(0) === '?' ? search : '?' + search; }

	  if (hash && hash !== '#') { path += hash.charAt(0) === '#' ? hash : '#' + hash; }

	  return path;
	};
	}));

	unwrapExports(PathUtils);
	var PathUtils_1 = PathUtils.addLeadingSlash;
	var PathUtils_2 = PathUtils.stripLeadingSlash;
	var PathUtils_3 = PathUtils.hasBasename;
	var PathUtils_4 = PathUtils.stripBasename;
	var PathUtils_5 = PathUtils.stripTrailingSlash;
	var PathUtils_6 = PathUtils.parsePath;
	var PathUtils_7 = PathUtils.createPath;

	function warning(condition, message) {
	    if (!condition) {
	        // tslint:disable-next-line:no-console
	        console.error(message);
	    }
	}
	function isValidElement(obj) {
	    var isNotANullObject = infernoShared.isObject(obj) && infernoShared.isNull(obj) === false;
	    if (isNotANullObject === false) {
	        return false;
	    }
	    var flags = obj.flags;
	    return (flags & (28 /* Component */ | 3970 /* Element */)) > 0;
	}
	function invariant(condition, format, a, b, c, d, e, f) {
	    if (!condition) {
	        var error;
	        if (format === undefined) {
	            error = new Error("Minified exception occurred; use the non-minified dev environment " +
	                "for the full error message and additional helpful warnings.");
	        }
	        else {
	            var args = [a, b, c, d, e, f];
	            var argIndex = 0;
	            error = new Error(format.replace(/%s/g, (function () {
	                return args[argIndex++];
	            })));
	            error.name = "Invariant Violation";
	        }
	        error.framesToPop = 1; // we don't care about invariant's own frame
	        throw error;
	    }
	}
	var ARR = [];
	var Children = {
	    forEach: function forEach(children, fn) {
	        if (infernoShared.isNullOrUndef(children)) {
	            return;
	        }
	        children = Children.toArray(children);
	        for (var i = 0, len = children.length; i < len; i++) {
	            fn(children[i], i, children);
	        }
	    },
	    count: function count(children) {
	        return Children.toArray(children).length;
	    },
	    only: function only(children) {
	        children = Children.toArray(children);
	        if (children.length !== 1) {
	            throw new Error("Children.only() expects only one child.");
	        }
	        return children[0];
	    },
	    toArray: function toArray(children) {
	        return infernoShared.isNullOrUndef(children)
	            ? []
	            : infernoShared.isArray(children) ? children : ARR.concat(children);
	    }
	};

	/**
	 * @module Inferno-Router
	 */ /** TypeDoc Comment */
	/**
	 * The public API for putting history on context.
	 */
	var Router = (function (Component$$1) {
	    function Router(props, context) {
	        Component$$1.call(this, props, context);
	        this.state = {
	            match: this.computeMatch(props.history.location.pathname)
	        };
	    }

	    if ( Component$$1 ) Router.__proto__ = Component$$1;
	    Router.prototype = Object.create( Component$$1 && Component$$1.prototype );
	    Router.prototype.constructor = Router;
	    Router.prototype.getChildContext = function getChildContext () {
	        return {
	            router: Object.assign({}, this.context.router, { history: this.props.history, route: {
	                    location: this.props.history.location,
	                    match: this.state.match
	                } })
	        };
	    };
	    Router.prototype.computeMatch = function computeMatch (pathname) {
	        return {
	            isExact: pathname === "/",
	            params: {},
	            path: "/",
	            url: "/"
	        };
	    };
	    Router.prototype.componentWillMount = function componentWillMount () {
	        var this$1 = this;

	        var ref = this.props;
	        var children = ref.children;
	        var history = ref.history;
	        invariant(children == null || Children.count(children) === 1, "A <Router> may have only one child element");
	        // Do this here so we can setState when a <Redirect> changes the
	        // location in componentWillMount. This happens e.g. when doing
	        // server rendering using a <StaticRouter>.
	        this.unlisten = history.listen((function () {
	            this$1.setState({
	                match: this$1.computeMatch(history.location.pathname)
	            });
	        }));
	    };
	    Router.prototype.componentWillReceiveProps = function componentWillReceiveProps (nextProps) {
	        warning(this.props.history === nextProps.history, "You cannot change <Router history>");
	    };
	    Router.prototype.componentWillUnmount = function componentWillUnmount () {
	        this.unlisten();
	    };
	    Router.prototype.render = function render (props) {
	        return props.children;
	    };

	    return Router;
	}(inferno.Component));

	/**
	 * @module Inferno-Router
	 */ /** TypeDoc Comment */
	// tslint:disable-next-line:no-empty
	var noop = function () { };
	var StaticRouter = (function (Component$$1) {
	    function StaticRouter() {
	        var this$1 = this;

	        Component$$1.apply(this, arguments);
	        this.createHref = function (path) { return PathUtils_1(this$1.props.basename + createURL(path)); };
	        this.handlePush = function (location) {
	            var ref = this$1.props;
	            var basename = ref.basename;
	            var context = ref.context;
	            context.action = "PUSH";
	            context.location = addBasename(basename, createLocation(location));
	            context.url = createURL(context.location);
	        };
	        this.handleReplace = function (location) {
	            var ref = this$1.props;
	            var basename = ref.basename;
	            var context = ref.context;
	            context.action = "REPLACE";
	            context.location = addBasename(basename, createLocation(location));
	            context.url = createURL(context.location);
	        };
	        // tslint:disable-next-line:no-empty
	        this.handleListen = function () { return noop; };
	        // tslint:disable-next-line:no-empty
	        this.handleBlock = function () { return noop; };
	    }

	    if ( Component$$1 ) StaticRouter.__proto__ = Component$$1;
	    StaticRouter.prototype = Object.create( Component$$1 && Component$$1.prototype );
	    StaticRouter.prototype.constructor = StaticRouter;
	    StaticRouter.prototype.getChildContext = function getChildContext () {
	        return {
	            router: {
	                staticContext: this.props.context
	            }
	        };
	    };
	    StaticRouter.prototype.render = function render () {
	        var _a = this.props;
	        var basename = _a.basename;
	        var context = _a.context;
	        var location = _a.location;
	        var props = __rest(_a, ["basename", "context", "location"]);
	        var history = {
	            action: "POP",
	            block: this.handleBlock,
	            createHref: this.createHref,
	            go: staticHandler("go"),
	            goBack: staticHandler("goBack"),
	            goForward: staticHandler("goForward"),
	            listen: this.handleListen,
	            location: stripBasename(basename, createLocation(location)),
	            push: this.handlePush,
	            replace: this.handleReplace
	        };
	        return inferno.createVNode(4 /* ComponentClass */, Router, null, null, Object.assign({}, props, { history: history }));
	    };

	    return StaticRouter;
	}(inferno.Component));

	StaticRouter.defaultProps = {
	    basename: "",
	    location: "/"
	};
	{
	    StaticRouter.prototype.componentWillMount = function () {
	        warning(!this.props.history, "<StaticRouter> ignores the history prop. To use a custom history, " +
	            "use `import { Router }` instead of `import { StaticRouter as Router }`.");
	    };
	}
	function normalizeLocation(ref) {
	    var pathname = ref.pathname; if ( pathname === void 0 ) pathname = "/";
	    var search = ref.search;
	    var hash = ref.hash;

	    return {
	        hash: (hash || "") === "#" ? "" : hash,
	        pathname: pathname,
	        search: (search || "") === "?" ? "" : search
	    };
	}
	function addBasename(basename, location) {
	    if (!basename) {
	        return location;
	    }
	    return Object.assign({}, location, { pathname: PathUtils_1(basename) + location.pathname });
	}
	function stripBasename(basename, location) {
	    if (!basename) {
	        return location;
	    }
	    var base = PathUtils_1(basename);
	    if (location.pathname.indexOf(base) !== 0) {
	        return location;
	    }
	    return Object.assign({}, location, { pathname: location.pathname.substr(base.length) });
	}
	function createLocation(location) {
	    return typeof location === "string"
	        ? PathUtils_6(location)
	        : normalizeLocation(location);
	}
	function createURL(location) {
	    return typeof location === "string" ? location : PathUtils_7(location);
	}
	function staticHandler(methodName) {
	    return function () {
	        invariant(false, "You cannot %s with <StaticRouter>", methodName);
	    };
	}

	/**
	 * Copyright 2014-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 */

	/**
	 * Similar to invariant but only logs a warning if the condition is not met.
	 * This can be used to log issues in development environments in critical
	 * paths. Removing the logging code for production environments will keep the
	 * same logic and follow the same code paths.
	 */

	var __DEV__ = "development" !== 'production';

	var warning$1 = function() {};

	if (__DEV__) {
	  warning$1 = function(condition, format, args) {
	    var arguments$1 = arguments;

	    var len = arguments.length;
	    args = new Array(len > 2 ? len - 2 : 0);
	    for (var key = 2; key < len; key++) {
	      args[key - 2] = arguments$1[key];
	    }
	    if (format === undefined) {
	      throw new Error(
	        '`warning(condition, format, ...args)` requires a warning ' +
	        'message argument'
	      );
	    }

	    if (format.length < 10 || (/^[s\W]*$/).test(format)) {
	      throw new Error(
	        'The warning format should be able to uniquely identify this ' +
	        'warning. Please, use a more descriptive format than: ' + format
	      );
	    }

	    if (!condition) {
	      var argIndex = 0;
	      var message = 'Warning: ' +
	        format.replace(/%s/g, (function() {
	          return args[argIndex++];
	        }));
	      if (typeof console !== 'undefined') {
	        console.error(message);
	      }
	      try {
	        // This error was thrown as a convenience so that you can use this stack
	        // to find the callsite that caused this warning to fire.
	        throw new Error(message);
	      } catch(x) {}
	    }
	  };
	}

	var warning_1 = warning$1;

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 */

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

	var NODE_ENV = "development";

	var invariant$1 = function(condition, format, a, b, c, d, e, f) {
	  if (NODE_ENV !== 'production') {
	    if (format === undefined) {
	      throw new Error('invariant requires an error message argument');
	    }
	  }

	  if (!condition) {
	    var error;
	    if (format === undefined) {
	      error = new Error(
	        'Minified exception occurred; use the non-minified dev environment ' +
	        'for the full error message and additional helpful warnings.'
	      );
	    } else {
	      var args = [a, b, c, d, e, f];
	      var argIndex = 0;
	      error = new Error(
	        format.replace(/%s/g, (function() { return args[argIndex++]; }))
	      );
	      error.name = 'Invariant Violation';
	    }

	    error.framesToPop = 1; // we don't care about invariant's own frame
	    throw error;
	  }
	};

	var invariant_1 = invariant$1;

	function isAbsolute(pathname) {
	  return pathname.charAt(0) === '/';
	}

	// About 1.5x faster than the two-arg version of Array#splice()
	function spliceOne(list, index) {
	  for (var i = index, k = i + 1, n = list.length; k < n; i += 1, k += 1) {
	    list[i] = list[k];
	  }

	  list.pop();
	}

	// This implementation is based heavily on node's url.parse
	function resolvePathname(to) {
	  var from = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

	  var toParts = to && to.split('/') || [];
	  var fromParts = from && from.split('/') || [];

	  var isToAbs = to && isAbsolute(to);
	  var isFromAbs = from && isAbsolute(from);
	  var mustEndAbs = isToAbs || isFromAbs;

	  if (to && isAbsolute(to)) {
	    // to is absolute
	    fromParts = toParts;
	  } else if (toParts.length) {
	    // to is relative, drop the filename
	    fromParts.pop();
	    fromParts = fromParts.concat(toParts);
	  }

	  if (!fromParts.length) { return '/'; }

	  var hasTrailingSlash = void 0;
	  if (fromParts.length) {
	    var last = fromParts[fromParts.length - 1];
	    hasTrailingSlash = last === '.' || last === '..' || last === '';
	  } else {
	    hasTrailingSlash = false;
	  }

	  var up = 0;
	  for (var i = fromParts.length; i >= 0; i--) {
	    var part = fromParts[i];

	    if (part === '.') {
	      spliceOne(fromParts, i);
	    } else if (part === '..') {
	      spliceOne(fromParts, i);
	      up++;
	    } else if (up) {
	      spliceOne(fromParts, i);
	      up--;
	    }
	  }

	  if (!mustEndAbs) { for (; up--; up) {
	    fromParts.unshift('..');
	  } }if (mustEndAbs && fromParts[0] !== '' && (!fromParts[0] || !isAbsolute(fromParts[0]))) { fromParts.unshift(''); }

	  var result = fromParts.join('/');

	  if (hasTrailingSlash && result.substr(-1) !== '/') { result += '/'; }

	  return result;
	}



	var resolvePathname$2 = Object.freeze({
		default: resolvePathname
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	function valueEqual(a, b) {
	  if (a === b) { return true; }

	  if (a == null || b == null) { return false; }

	  if (Array.isArray(a)) {
	    return Array.isArray(b) && a.length === b.length && a.every((function (item, index) {
	      return valueEqual(item, b[index]);
	    }));
	  }

	  var aType = typeof a === 'undefined' ? 'undefined' : _typeof(a);
	  var bType = typeof b === 'undefined' ? 'undefined' : _typeof(b);

	  if (aType !== bType) { return false; }

	  if (aType === 'object') {
	    var aValue = a.valueOf();
	    var bValue = b.valueOf();

	    if (aValue !== a || bValue !== b) { return valueEqual(aValue, bValue); }

	    var aKeys = Object.keys(a);
	    var bKeys = Object.keys(b);

	    if (aKeys.length !== bKeys.length) { return false; }

	    return aKeys.every((function (key) {
	      return valueEqual(a[key], b[key]);
	    }));
	  }

	  return false;
	}



	var valueEqual$2 = Object.freeze({
		default: valueEqual
	});

	var _resolvePathname = ( resolvePathname$2 && resolvePathname ) || resolvePathname$2;

	var _valueEqual = ( valueEqual$2 && valueEqual ) || valueEqual$2;

	var LocationUtils = createCommonjsModule((function (module, exports) {
	exports.__esModule = true;
	exports.locationsAreEqual = exports.createLocation = undefined;

	var _extends = Object.assign || function (target) {
	var arguments$1 = arguments;
	 for (var i = 1; i < arguments.length; i++) { var source = arguments$1[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



	var _resolvePathname2 = _interopRequireDefault(_resolvePathname);



	var _valueEqual2 = _interopRequireDefault(_valueEqual);



	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var createLocation = exports.createLocation = function createLocation(path, state, key, currentLocation) {
	  var location = void 0;
	  if (typeof path === 'string') {
	    // Two-arg form: push(path, state)
	    location = (0, PathUtils.parsePath)(path);
	    location.state = state;
	  } else {
	    // One-arg form: push(location)
	    location = _extends({}, path);

	    if (location.pathname === undefined) { location.pathname = ''; }

	    if (location.search) {
	      if (location.search.charAt(0) !== '?') { location.search = '?' + location.search; }
	    } else {
	      location.search = '';
	    }

	    if (location.hash) {
	      if (location.hash.charAt(0) !== '#') { location.hash = '#' + location.hash; }
	    } else {
	      location.hash = '';
	    }

	    if (state !== undefined && location.state === undefined) { location.state = state; }
	  }

	  try {
	    location.pathname = decodeURI(location.pathname);
	  } catch (e) {
	    if (e instanceof URIError) {
	      throw new URIError('Pathname "' + location.pathname + '" could not be decoded. ' + 'This is likely caused by an invalid percent-encoding.');
	    } else {
	      throw e;
	    }
	  }

	  if (key) { location.key = key; }

	  if (currentLocation) {
	    // Resolve incomplete/relative pathname relative to current location.
	    if (!location.pathname) {
	      location.pathname = currentLocation.pathname;
	    } else if (location.pathname.charAt(0) !== '/') {
	      location.pathname = (0, _resolvePathname2.default)(location.pathname, currentLocation.pathname);
	    }
	  } else {
	    // When there is no prior location and pathname is empty, set it to /
	    if (!location.pathname) {
	      location.pathname = '/';
	    }
	  }

	  return location;
	};

	var locationsAreEqual = exports.locationsAreEqual = function locationsAreEqual(a, b) {
	  return a.pathname === b.pathname && a.search === b.search && a.hash === b.hash && a.key === b.key && (0, _valueEqual2.default)(a.state, b.state);
	};
	}));

	unwrapExports(LocationUtils);
	var LocationUtils_1 = LocationUtils.locationsAreEqual;
	var LocationUtils_2 = LocationUtils.createLocation;

	var createTransitionManager_1 = createCommonjsModule((function (module, exports) {
	exports.__esModule = true;



	var _warning2 = _interopRequireDefault(warning_1);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var createTransitionManager = function createTransitionManager() {
	  var prompt = null;

	  var setPrompt = function setPrompt(nextPrompt) {
	    (0, _warning2.default)(prompt == null, 'A history supports only one prompt at a time');

	    prompt = nextPrompt;

	    return function () {
	      if (prompt === nextPrompt) { prompt = null; }
	    };
	  };

	  var confirmTransitionTo = function confirmTransitionTo(location, action, getUserConfirmation, callback) {
	    // TODO: If another transition starts while we're still confirming
	    // the previous one, we may end up in a weird state. Figure out the
	    // best way to handle this.
	    if (prompt != null) {
	      var result = typeof prompt === 'function' ? prompt(location, action) : prompt;

	      if (typeof result === 'string') {
	        if (typeof getUserConfirmation === 'function') {
	          getUserConfirmation(result, callback);
	        } else {
	          (0, _warning2.default)(false, 'A history needs a getUserConfirmation function in order to use a prompt message');

	          callback(true);
	        }
	      } else {
	        // Return false from a transition hook to cancel the transition.
	        callback(result !== false);
	      }
	    } else {
	      callback(true);
	    }
	  };

	  var listeners = [];

	  var appendListener = function appendListener(fn) {
	    var isActive = true;

	    var listener = function listener() {
	      if (isActive) { fn.apply(undefined, arguments); }
	    };

	    listeners.push(listener);

	    return function () {
	      isActive = false;
	      listeners = listeners.filter((function (item) {
	        return item !== listener;
	      }));
	    };
	  };

	  var notifyListeners = function notifyListeners() {
	    var arguments$1 = arguments;

	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments$1[_key];
	    }

	    listeners.forEach((function (listener) {
	      return listener.apply(undefined, args);
	    }));
	  };

	  return {
	    setPrompt: setPrompt,
	    confirmTransitionTo: confirmTransitionTo,
	    appendListener: appendListener,
	    notifyListeners: notifyListeners
	  };
	};

	exports.default = createTransitionManager;
	}));

	unwrapExports(createTransitionManager_1);

	var DOMUtils = createCommonjsModule((function (module, exports) {
	exports.__esModule = true;
	var canUseDOM = exports.canUseDOM = !!(typeof window !== 'undefined' && window.document && window.document.createElement);

	var addEventListener = exports.addEventListener = function addEventListener(node, event, listener) {
	  return node.addEventListener ? node.addEventListener(event, listener, false) : node.attachEvent('on' + event, listener);
	};

	var removeEventListener = exports.removeEventListener = function removeEventListener(node, event, listener) {
	  return node.removeEventListener ? node.removeEventListener(event, listener, false) : node.detachEvent('on' + event, listener);
	};

	var getConfirmation = exports.getConfirmation = function getConfirmation(message, callback) {
	  return callback(window.confirm(message));
	}; // eslint-disable-line no-alert

	/**
	 * Returns true if the HTML5 history API is supported. Taken from Modernizr.
	 *
	 * https://github.com/Modernizr/Modernizr/blob/master/LICENSE
	 * https://github.com/Modernizr/Modernizr/blob/master/feature-detects/history.js
	 * changed to avoid false negatives for Windows Phones: https://github.com/reactjs/react-router/issues/586
	 */
	var supportsHistory = exports.supportsHistory = function supportsHistory() {
	  var ua = window.navigator.userAgent;

	  if ((ua.indexOf('Android 2.') !== -1 || ua.indexOf('Android 4.0') !== -1) && ua.indexOf('Mobile Safari') !== -1 && ua.indexOf('Chrome') === -1 && ua.indexOf('Windows Phone') === -1) { return false; }

	  return window.history && 'pushState' in window.history;
	};

	/**
	 * Returns true if browser fires popstate on hash change.
	 * IE10 and IE11 do not.
	 */
	var supportsPopStateOnHashChange = exports.supportsPopStateOnHashChange = function supportsPopStateOnHashChange() {
	  return window.navigator.userAgent.indexOf('Trident') === -1;
	};

	/**
	 * Returns false if using go(n) with hash history causes a full page reload.
	 */
	var supportsGoWithoutReloadUsingHash = exports.supportsGoWithoutReloadUsingHash = function supportsGoWithoutReloadUsingHash() {
	  return window.navigator.userAgent.indexOf('Firefox') === -1;
	};

	/**
	 * Returns true if a given popstate event is an extraneous WebKit event.
	 * Accounts for the fact that Chrome on iOS fires real popstate events
	 * containing undefined state when pressing the back button.
	 */
	var isExtraneousPopstateEvent = exports.isExtraneousPopstateEvent = function isExtraneousPopstateEvent(event) {
	  return event.state === undefined && navigator.userAgent.indexOf('CriOS') === -1;
	};
	}));

	unwrapExports(DOMUtils);
	var DOMUtils_1 = DOMUtils.canUseDOM;
	var DOMUtils_2 = DOMUtils.addEventListener;
	var DOMUtils_3 = DOMUtils.removeEventListener;
	var DOMUtils_4 = DOMUtils.getConfirmation;
	var DOMUtils_5 = DOMUtils.supportsHistory;
	var DOMUtils_6 = DOMUtils.supportsPopStateOnHashChange;
	var DOMUtils_7 = DOMUtils.supportsGoWithoutReloadUsingHash;
	var DOMUtils_8 = DOMUtils.isExtraneousPopstateEvent;

	var createBrowserHistory_1 = createCommonjsModule((function (module, exports) {
	exports.__esModule = true;

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var _extends = Object.assign || function (target) {
	var arguments$1 = arguments;
	 for (var i = 1; i < arguments.length; i++) { var source = arguments$1[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



	var _warning2 = _interopRequireDefault(warning_1);



	var _invariant2 = _interopRequireDefault(invariant_1);







	var _createTransitionManager2 = _interopRequireDefault(createTransitionManager_1);



	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var PopStateEvent = 'popstate';
	var HashChangeEvent = 'hashchange';

	var getHistoryState = function getHistoryState() {
	  try {
	    return window.history.state || {};
	  } catch (e) {
	    // IE 11 sometimes throws when accessing window.history.state
	    // See https://github.com/ReactTraining/history/pull/289
	    return {};
	  }
	};

	/**
	 * Creates a history object that uses the HTML5 history API including
	 * pushState, replaceState, and the popstate event.
	 */
	var createBrowserHistory = function createBrowserHistory() {
	  var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	  (0, _invariant2.default)(DOMUtils.canUseDOM, 'Browser history needs a DOM');

	  var globalHistory = window.history;
	  var canUseHistory = (0, DOMUtils.supportsHistory)();
	  var needsHashChangeListener = !(0, DOMUtils.supportsPopStateOnHashChange)();

	  var _props$forceRefresh = props.forceRefresh,
	      forceRefresh = _props$forceRefresh === undefined ? false : _props$forceRefresh,
	      _props$getUserConfirm = props.getUserConfirmation,
	      getUserConfirmation = _props$getUserConfirm === undefined ? DOMUtils.getConfirmation : _props$getUserConfirm,
	      _props$keyLength = props.keyLength,
	      keyLength = _props$keyLength === undefined ? 6 : _props$keyLength;

	  var basename = props.basename ? (0, PathUtils.stripTrailingSlash)((0, PathUtils.addLeadingSlash)(props.basename)) : '';

	  var getDOMLocation = function getDOMLocation(historyState) {
	    var _ref = historyState || {},
	        key = _ref.key,
	        state = _ref.state;

	    var _window$location = window.location,
	        pathname = _window$location.pathname,
	        search = _window$location.search,
	        hash = _window$location.hash;


	    var path = pathname + search + hash;

	    (0, _warning2.default)(!basename || (0, PathUtils.hasBasename)(path, basename), 'You are attempting to use a basename on a page whose URL path does not begin ' + 'with the basename. Expected path "' + path + '" to begin with "' + basename + '".');

	    if (basename) { path = (0, PathUtils.stripBasename)(path, basename); }

	    return (0, LocationUtils.createLocation)(path, state, key);
	  };

	  var createKey = function createKey() {
	    return Math.random().toString(36).substr(2, keyLength);
	  };

	  var transitionManager = (0, _createTransitionManager2.default)();

	  var setState = function setState(nextState) {
	    _extends(history, nextState);

	    history.length = globalHistory.length;

	    transitionManager.notifyListeners(history.location, history.action);
	  };

	  var handlePopState = function handlePopState(event) {
	    // Ignore extraneous popstate events in WebKit.
	    if ((0, DOMUtils.isExtraneousPopstateEvent)(event)) { return; }

	    handlePop(getDOMLocation(event.state));
	  };

	  var handleHashChange = function handleHashChange() {
	    handlePop(getDOMLocation(getHistoryState()));
	  };

	  var forceNextPop = false;

	  var handlePop = function handlePop(location) {
	    if (forceNextPop) {
	      forceNextPop = false;
	      setState();
	    } else {
	      var action = 'POP';

	      transitionManager.confirmTransitionTo(location, action, getUserConfirmation, (function (ok) {
	        if (ok) {
	          setState({ action: action, location: location });
	        } else {
	          revertPop(location);
	        }
	      }));
	    }
	  };

	  var revertPop = function revertPop(fromLocation) {
	    var toLocation = history.location;

	    // TODO: We could probably make this more reliable by
	    // keeping a list of keys we've seen in sessionStorage.
	    // Instead, we just default to 0 for keys we don't know.

	    var toIndex = allKeys.indexOf(toLocation.key);

	    if (toIndex === -1) { toIndex = 0; }

	    var fromIndex = allKeys.indexOf(fromLocation.key);

	    if (fromIndex === -1) { fromIndex = 0; }

	    var delta = toIndex - fromIndex;

	    if (delta) {
	      forceNextPop = true;
	      go(delta);
	    }
	  };

	  var initialLocation = getDOMLocation(getHistoryState());
	  var allKeys = [initialLocation.key];

	  // Public interface

	  var createHref = function createHref(location) {
	    return basename + (0, PathUtils.createPath)(location);
	  };

	  var push = function push(path, state) {
	    (0, _warning2.default)(!((typeof path === 'undefined' ? 'undefined' : _typeof(path)) === 'object' && path.state !== undefined && state !== undefined), 'You should avoid providing a 2nd state argument to push when the 1st ' + 'argument is a location-like object that already has state; it is ignored');

	    var action = 'PUSH';
	    var location = (0, LocationUtils.createLocation)(path, state, createKey(), history.location);

	    transitionManager.confirmTransitionTo(location, action, getUserConfirmation, (function (ok) {
	      if (!ok) { return; }

	      var href = createHref(location);
	      var key = location.key,
	          state = location.state;


	      if (canUseHistory) {
	        globalHistory.pushState({ key: key, state: state }, null, href);

	        if (forceRefresh) {
	          window.location.href = href;
	        } else {
	          var prevIndex = allKeys.indexOf(history.location.key);
	          var nextKeys = allKeys.slice(0, prevIndex === -1 ? 0 : prevIndex + 1);

	          nextKeys.push(location.key);
	          allKeys = nextKeys;

	          setState({ action: action, location: location });
	        }
	      } else {
	        (0, _warning2.default)(state === undefined, 'Browser history cannot push state in browsers that do not support HTML5 history');

	        window.location.href = href;
	      }
	    }));
	  };

	  var replace = function replace(path, state) {
	    (0, _warning2.default)(!((typeof path === 'undefined' ? 'undefined' : _typeof(path)) === 'object' && path.state !== undefined && state !== undefined), 'You should avoid providing a 2nd state argument to replace when the 1st ' + 'argument is a location-like object that already has state; it is ignored');

	    var action = 'REPLACE';
	    var location = (0, LocationUtils.createLocation)(path, state, createKey(), history.location);

	    transitionManager.confirmTransitionTo(location, action, getUserConfirmation, (function (ok) {
	      if (!ok) { return; }

	      var href = createHref(location);
	      var key = location.key,
	          state = location.state;


	      if (canUseHistory) {
	        globalHistory.replaceState({ key: key, state: state }, null, href);

	        if (forceRefresh) {
	          window.location.replace(href);
	        } else {
	          var prevIndex = allKeys.indexOf(history.location.key);

	          if (prevIndex !== -1) { allKeys[prevIndex] = location.key; }

	          setState({ action: action, location: location });
	        }
	      } else {
	        (0, _warning2.default)(state === undefined, 'Browser history cannot replace state in browsers that do not support HTML5 history');

	        window.location.replace(href);
	      }
	    }));
	  };

	  var go = function go(n) {
	    globalHistory.go(n);
	  };

	  var goBack = function goBack() {
	    return go(-1);
	  };

	  var goForward = function goForward() {
	    return go(1);
	  };

	  var listenerCount = 0;

	  var checkDOMListeners = function checkDOMListeners(delta) {
	    listenerCount += delta;

	    if (listenerCount === 1) {
	      (0, DOMUtils.addEventListener)(window, PopStateEvent, handlePopState);

	      if (needsHashChangeListener) { (0, DOMUtils.addEventListener)(window, HashChangeEvent, handleHashChange); }
	    } else if (listenerCount === 0) {
	      (0, DOMUtils.removeEventListener)(window, PopStateEvent, handlePopState);

	      if (needsHashChangeListener) { (0, DOMUtils.removeEventListener)(window, HashChangeEvent, handleHashChange); }
	    }
	  };

	  var isBlocked = false;

	  var block = function block() {
	    var prompt = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

	    var unblock = transitionManager.setPrompt(prompt);

	    if (!isBlocked) {
	      checkDOMListeners(1);
	      isBlocked = true;
	    }

	    return function () {
	      if (isBlocked) {
	        isBlocked = false;
	        checkDOMListeners(-1);
	      }

	      return unblock();
	    };
	  };

	  var listen = function listen(listener) {
	    var unlisten = transitionManager.appendListener(listener);
	    checkDOMListeners(1);

	    return function () {
	      checkDOMListeners(-1);
	      unlisten();
	    };
	  };

	  var history = {
	    length: globalHistory.length,
	    action: 'POP',
	    location: initialLocation,
	    createHref: createHref,
	    push: push,
	    replace: replace,
	    go: go,
	    goBack: goBack,
	    goForward: goForward,
	    block: block,
	    listen: listen
	  };

	  return history;
	};

	exports.default = createBrowserHistory;
	}));

	var createHistory = unwrapExports(createBrowserHistory_1);

	/**
	 * @module Inferno-Router
	 */ /** TypeDoc Comment */
	var BrowserRouter = (function (Component$$1) {
	    function BrowserRouter(props, context) {
	        Component$$1.call(this, props, context);
	        this.history = createHistory(props);
	    }

	    if ( Component$$1 ) BrowserRouter.__proto__ = Component$$1;
	    BrowserRouter.prototype = Object.create( Component$$1 && Component$$1.prototype );
	    BrowserRouter.prototype.constructor = BrowserRouter;
	    BrowserRouter.prototype.render = function render () {
	        return inferno.createVNode(4 /* ComponentClass */, Router, null, null, {
	            children: this.props.children,
	            history: this.history
	        });
	    };

	    return BrowserRouter;
	}(inferno.Component));

	{
	    BrowserRouter.prototype.componentWillMount = function () {
	        warning(!this.props.history, "<BrowserRouter> ignores the history prop. To use a custom history, " +
	            "use `import { Router }` instead of `import { BrowserRouter as Router }`.");
	    };
	}

	var createHashHistory_1 = createCommonjsModule((function (module, exports) {
	exports.__esModule = true;

	var _extends = Object.assign || function (target) {
	var arguments$1 = arguments;
	 for (var i = 1; i < arguments.length; i++) { var source = arguments$1[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



	var _warning2 = _interopRequireDefault(warning_1);



	var _invariant2 = _interopRequireDefault(invariant_1);







	var _createTransitionManager2 = _interopRequireDefault(createTransitionManager_1);



	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var HashChangeEvent = 'hashchange';

	var HashPathCoders = {
	  hashbang: {
	    encodePath: function encodePath(path) {
	      return path.charAt(0) === '!' ? path : '!/' + (0, PathUtils.stripLeadingSlash)(path);
	    },
	    decodePath: function decodePath(path) {
	      return path.charAt(0) === '!' ? path.substr(1) : path;
	    }
	  },
	  noslash: {
	    encodePath: PathUtils.stripLeadingSlash,
	    decodePath: PathUtils.addLeadingSlash
	  },
	  slash: {
	    encodePath: PathUtils.addLeadingSlash,
	    decodePath: PathUtils.addLeadingSlash
	  }
	};

	var getHashPath = function getHashPath() {
	  // We can't use window.location.hash here because it's not
	  // consistent across browsers - Firefox will pre-decode it!
	  var href = window.location.href;
	  var hashIndex = href.indexOf('#');
	  return hashIndex === -1 ? '' : href.substring(hashIndex + 1);
	};

	var pushHashPath = function pushHashPath(path) {
	  return window.location.hash = path;
	};

	var replaceHashPath = function replaceHashPath(path) {
	  var hashIndex = window.location.href.indexOf('#');

	  window.location.replace(window.location.href.slice(0, hashIndex >= 0 ? hashIndex : 0) + '#' + path);
	};

	var createHashHistory = function createHashHistory() {
	  var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	  (0, _invariant2.default)(DOMUtils.canUseDOM, 'Hash history needs a DOM');

	  var globalHistory = window.history;
	  var canGoWithoutReload = (0, DOMUtils.supportsGoWithoutReloadUsingHash)();

	  var _props$getUserConfirm = props.getUserConfirmation,
	      getUserConfirmation = _props$getUserConfirm === undefined ? DOMUtils.getConfirmation : _props$getUserConfirm,
	      _props$hashType = props.hashType,
	      hashType = _props$hashType === undefined ? 'slash' : _props$hashType;

	  var basename = props.basename ? (0, PathUtils.stripTrailingSlash)((0, PathUtils.addLeadingSlash)(props.basename)) : '';

	  var _HashPathCoders$hashT = HashPathCoders[hashType],
	      encodePath = _HashPathCoders$hashT.encodePath,
	      decodePath = _HashPathCoders$hashT.decodePath;


	  var getDOMLocation = function getDOMLocation() {
	    var path = decodePath(getHashPath());

	    (0, _warning2.default)(!basename || (0, PathUtils.hasBasename)(path, basename), 'You are attempting to use a basename on a page whose URL path does not begin ' + 'with the basename. Expected path "' + path + '" to begin with "' + basename + '".');

	    if (basename) { path = (0, PathUtils.stripBasename)(path, basename); }

	    return (0, LocationUtils.createLocation)(path);
	  };

	  var transitionManager = (0, _createTransitionManager2.default)();

	  var setState = function setState(nextState) {
	    _extends(history, nextState);

	    history.length = globalHistory.length;

	    transitionManager.notifyListeners(history.location, history.action);
	  };

	  var forceNextPop = false;
	  var ignorePath = null;

	  var handleHashChange = function handleHashChange() {
	    var path = getHashPath();
	    var encodedPath = encodePath(path);

	    if (path !== encodedPath) {
	      // Ensure we always have a properly-encoded hash.
	      replaceHashPath(encodedPath);
	    } else {
	      var location = getDOMLocation();
	      var prevLocation = history.location;

	      if (!forceNextPop && (0, LocationUtils.locationsAreEqual)(prevLocation, location)) { return; } // A hashchange doesn't always == location change.

	      if (ignorePath === (0, PathUtils.createPath)(location)) { return; } // Ignore this change; we already setState in push/replace.

	      ignorePath = null;

	      handlePop(location);
	    }
	  };

	  var handlePop = function handlePop(location) {
	    if (forceNextPop) {
	      forceNextPop = false;
	      setState();
	    } else {
	      var action = 'POP';

	      transitionManager.confirmTransitionTo(location, action, getUserConfirmation, (function (ok) {
	        if (ok) {
	          setState({ action: action, location: location });
	        } else {
	          revertPop(location);
	        }
	      }));
	    }
	  };

	  var revertPop = function revertPop(fromLocation) {
	    var toLocation = history.location;

	    // TODO: We could probably make this more reliable by
	    // keeping a list of paths we've seen in sessionStorage.
	    // Instead, we just default to 0 for paths we don't know.

	    var toIndex = allPaths.lastIndexOf((0, PathUtils.createPath)(toLocation));

	    if (toIndex === -1) { toIndex = 0; }

	    var fromIndex = allPaths.lastIndexOf((0, PathUtils.createPath)(fromLocation));

	    if (fromIndex === -1) { fromIndex = 0; }

	    var delta = toIndex - fromIndex;

	    if (delta) {
	      forceNextPop = true;
	      go(delta);
	    }
	  };

	  // Ensure the hash is encoded properly before doing anything else.
	  var path = getHashPath();
	  var encodedPath = encodePath(path);

	  if (path !== encodedPath) { replaceHashPath(encodedPath); }

	  var initialLocation = getDOMLocation();
	  var allPaths = [(0, PathUtils.createPath)(initialLocation)];

	  // Public interface

	  var createHref = function createHref(location) {
	    return '#' + encodePath(basename + (0, PathUtils.createPath)(location));
	  };

	  var push = function push(path, state) {
	    (0, _warning2.default)(state === undefined, 'Hash history cannot push state; it is ignored');

	    var action = 'PUSH';
	    var location = (0, LocationUtils.createLocation)(path, undefined, undefined, history.location);

	    transitionManager.confirmTransitionTo(location, action, getUserConfirmation, (function (ok) {
	      if (!ok) { return; }

	      var path = (0, PathUtils.createPath)(location);
	      var encodedPath = encodePath(basename + path);
	      var hashChanged = getHashPath() !== encodedPath;

	      if (hashChanged) {
	        // We cannot tell if a hashchange was caused by a PUSH, so we'd
	        // rather setState here and ignore the hashchange. The caveat here
	        // is that other hash histories in the page will consider it a POP.
	        ignorePath = path;
	        pushHashPath(encodedPath);

	        var prevIndex = allPaths.lastIndexOf((0, PathUtils.createPath)(history.location));
	        var nextPaths = allPaths.slice(0, prevIndex === -1 ? 0 : prevIndex + 1);

	        nextPaths.push(path);
	        allPaths = nextPaths;

	        setState({ action: action, location: location });
	      } else {
	        (0, _warning2.default)(false, 'Hash history cannot PUSH the same path; a new entry will not be added to the history stack');

	        setState();
	      }
	    }));
	  };

	  var replace = function replace(path, state) {
	    (0, _warning2.default)(state === undefined, 'Hash history cannot replace state; it is ignored');

	    var action = 'REPLACE';
	    var location = (0, LocationUtils.createLocation)(path, undefined, undefined, history.location);

	    transitionManager.confirmTransitionTo(location, action, getUserConfirmation, (function (ok) {
	      if (!ok) { return; }

	      var path = (0, PathUtils.createPath)(location);
	      var encodedPath = encodePath(basename + path);
	      var hashChanged = getHashPath() !== encodedPath;

	      if (hashChanged) {
	        // We cannot tell if a hashchange was caused by a REPLACE, so we'd
	        // rather setState here and ignore the hashchange. The caveat here
	        // is that other hash histories in the page will consider it a POP.
	        ignorePath = path;
	        replaceHashPath(encodedPath);
	      }

	      var prevIndex = allPaths.indexOf((0, PathUtils.createPath)(history.location));

	      if (prevIndex !== -1) { allPaths[prevIndex] = path; }

	      setState({ action: action, location: location });
	    }));
	  };

	  var go = function go(n) {
	    (0, _warning2.default)(canGoWithoutReload, 'Hash history go(n) causes a full page reload in this browser');

	    globalHistory.go(n);
	  };

	  var goBack = function goBack() {
	    return go(-1);
	  };

	  var goForward = function goForward() {
	    return go(1);
	  };

	  var listenerCount = 0;

	  var checkDOMListeners = function checkDOMListeners(delta) {
	    listenerCount += delta;

	    if (listenerCount === 1) {
	      (0, DOMUtils.addEventListener)(window, HashChangeEvent, handleHashChange);
	    } else if (listenerCount === 0) {
	      (0, DOMUtils.removeEventListener)(window, HashChangeEvent, handleHashChange);
	    }
	  };

	  var isBlocked = false;

	  var block = function block() {
	    var prompt = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

	    var unblock = transitionManager.setPrompt(prompt);

	    if (!isBlocked) {
	      checkDOMListeners(1);
	      isBlocked = true;
	    }

	    return function () {
	      if (isBlocked) {
	        isBlocked = false;
	        checkDOMListeners(-1);
	      }

	      return unblock();
	    };
	  };

	  var listen = function listen(listener) {
	    var unlisten = transitionManager.appendListener(listener);
	    checkDOMListeners(1);

	    return function () {
	      checkDOMListeners(-1);
	      unlisten();
	    };
	  };

	  var history = {
	    length: globalHistory.length,
	    action: 'POP',
	    location: initialLocation,
	    createHref: createHref,
	    push: push,
	    replace: replace,
	    go: go,
	    goBack: goBack,
	    goForward: goForward,
	    block: block,
	    listen: listen
	  };

	  return history;
	};

	exports.default = createHashHistory;
	}));

	var createHistory$1 = unwrapExports(createHashHistory_1);

	/**
	 * @module Inferno-Router
	 */ /** TypeDoc Comment */
	var HashRouter = (function (Component$$1) {
	    function HashRouter(props, context) {
	        Component$$1.call(this, props, context);
	        this.history = createHistory$1(props);
	    }

	    if ( Component$$1 ) HashRouter.__proto__ = Component$$1;
	    HashRouter.prototype = Object.create( Component$$1 && Component$$1.prototype );
	    HashRouter.prototype.constructor = HashRouter;
	    HashRouter.prototype.render = function render () {
	        return inferno.createVNode(4 /* ComponentClass */, Router, null, null, {
	            children: this.props.children,
	            history: this.history
	        });
	    };

	    return HashRouter;
	}(inferno.Component));

	{
	    HashRouter.prototype.componentWillMount = function () {
	        warning(!this.props.history, "<HashRouter> ignores the history prop. To use a custom history, " +
	            "use `import { Router }` instead of `import { HashRouter as Router }`.");
	    };
	}

	var isarray = Array.isArray || function (arr) {
	  return Object.prototype.toString.call(arr) == '[object Array]';
	};

	/**
	 * Expose `pathToRegexp`.
	 */
	var pathToRegexp_1 = pathToRegexp$1;
	var parse_1 = parse;
	var compile_1 = compile;
	var tokensToFunction_1 = tokensToFunction;
	var tokensToRegExp_1 = tokensToRegExp;

	/**
	 * The main path matching regexp utility.
	 *
	 * @type {RegExp}
	 */
	var PATH_REGEXP = new RegExp([
	  // Match escaped characters that would otherwise appear in future matches.
	  // This allows the user to escape special characters that won't transform.
	  '(\\\\.)',
	  // Match Express-style parameters and un-named parameters with a prefix
	  // and optional suffixes. Matches appear as:
	  //
	  // "/:test(\\d+)?" => ["/", "test", "\d+", undefined, "?", undefined]
	  // "/route(\\d+)"  => [undefined, undefined, undefined, "\d+", undefined, undefined]
	  // "/*"            => ["/", undefined, undefined, undefined, undefined, "*"]
	  '([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?|(\\*))'
	].join('|'), 'g');

	/**
	 * Parse a string for the raw tokens.
	 *
	 * @param  {string}  str
	 * @param  {Object=} options
	 * @return {!Array}
	 */
	function parse (str, options) {
	  var tokens = [];
	  var key = 0;
	  var index = 0;
	  var path = '';
	  var defaultDelimiter = options && options.delimiter || '/';
	  var res;

	  while ((res = PATH_REGEXP.exec(str)) != null) {
	    var m = res[0];
	    var escaped = res[1];
	    var offset = res.index;
	    path += str.slice(index, offset);
	    index = offset + m.length;

	    // Ignore already escaped sequences.
	    if (escaped) {
	      path += escaped[1];
	      continue
	    }

	    var next = str[index];
	    var prefix = res[2];
	    var name = res[3];
	    var capture = res[4];
	    var group = res[5];
	    var modifier = res[6];
	    var asterisk = res[7];

	    // Push the current path onto the tokens.
	    if (path) {
	      tokens.push(path);
	      path = '';
	    }

	    var partial = prefix != null && next != null && next !== prefix;
	    var repeat = modifier === '+' || modifier === '*';
	    var optional = modifier === '?' || modifier === '*';
	    var delimiter = res[2] || defaultDelimiter;
	    var pattern = capture || group;

	    tokens.push({
	      name: name || key++,
	      prefix: prefix || '',
	      delimiter: delimiter,
	      optional: optional,
	      repeat: repeat,
	      partial: partial,
	      asterisk: !!asterisk,
	      pattern: pattern ? escapeGroup(pattern) : (asterisk ? '.*' : '[^' + escapeString(delimiter) + ']+?')
	    });
	  }

	  // Match any characters still remaining.
	  if (index < str.length) {
	    path += str.substr(index);
	  }

	  // If the path exists, push it onto the end.
	  if (path) {
	    tokens.push(path);
	  }

	  return tokens
	}

	/**
	 * Compile a string to a template function for the path.
	 *
	 * @param  {string}             str
	 * @param  {Object=}            options
	 * @return {!function(Object=, Object=)}
	 */
	function compile (str, options) {
	  return tokensToFunction(parse(str, options))
	}

	/**
	 * Prettier encoding of URI path segments.
	 *
	 * @param  {string}
	 * @return {string}
	 */
	function encodeURIComponentPretty (str) {
	  return encodeURI(str).replace(/[\/?#]/g, (function (c) {
	    return '%' + c.charCodeAt(0).toString(16).toUpperCase()
	  }))
	}

	/**
	 * Encode the asterisk parameter. Similar to `pretty`, but allows slashes.
	 *
	 * @param  {string}
	 * @return {string}
	 */
	function encodeAsterisk (str) {
	  return encodeURI(str).replace(/[?#]/g, (function (c) {
	    return '%' + c.charCodeAt(0).toString(16).toUpperCase()
	  }))
	}

	/**
	 * Expose a method for transforming tokens into the path function.
	 */
	function tokensToFunction (tokens) {
	  // Compile all the tokens into regexps.
	  var matches = new Array(tokens.length);

	  // Compile all the patterns before compilation.
	  for (var i = 0; i < tokens.length; i++) {
	    if (typeof tokens[i] === 'object') {
	      matches[i] = new RegExp('^(?:' + tokens[i].pattern + ')$');
	    }
	  }

	  return function (obj, opts) {
	    var path = '';
	    var data = obj || {};
	    var options = opts || {};
	    var encode = options.pretty ? encodeURIComponentPretty : encodeURIComponent;

	    for (var i = 0; i < tokens.length; i++) {
	      var token = tokens[i];

	      if (typeof token === 'string') {
	        path += token;

	        continue
	      }

	      var value = data[token.name];
	      var segment;

	      if (value == null) {
	        if (token.optional) {
	          // Prepend partial segment prefixes.
	          if (token.partial) {
	            path += token.prefix;
	          }

	          continue
	        } else {
	          throw new TypeError('Expected "' + token.name + '" to be defined')
	        }
	      }

	      if (isarray(value)) {
	        if (!token.repeat) {
	          throw new TypeError('Expected "' + token.name + '" to not repeat, but received `' + JSON.stringify(value) + '`')
	        }

	        if (value.length === 0) {
	          if (token.optional) {
	            continue
	          } else {
	            throw new TypeError('Expected "' + token.name + '" to not be empty')
	          }
	        }

	        for (var j = 0; j < value.length; j++) {
	          segment = encode(value[j]);

	          if (!matches[i].test(segment)) {
	            throw new TypeError('Expected all "' + token.name + '" to match "' + token.pattern + '", but received `' + JSON.stringify(segment) + '`')
	          }

	          path += (j === 0 ? token.prefix : token.delimiter) + segment;
	        }

	        continue
	      }

	      segment = token.asterisk ? encodeAsterisk(value) : encode(value);

	      if (!matches[i].test(segment)) {
	        throw new TypeError('Expected "' + token.name + '" to match "' + token.pattern + '", but received "' + segment + '"')
	      }

	      path += token.prefix + segment;
	    }

	    return path
	  }
	}

	/**
	 * Escape a regular expression string.
	 *
	 * @param  {string} str
	 * @return {string}
	 */
	function escapeString (str) {
	  return str.replace(/([.+*?=^!:${}()[\]|\/\\])/g, '\\$1')
	}

	/**
	 * Escape the capturing group by escaping special characters and meaning.
	 *
	 * @param  {string} group
	 * @return {string}
	 */
	function escapeGroup (group) {
	  return group.replace(/([=!:$\/()])/g, '\\$1')
	}

	/**
	 * Attach the keys as a property of the regexp.
	 *
	 * @param  {!RegExp} re
	 * @param  {Array}   keys
	 * @return {!RegExp}
	 */
	function attachKeys (re, keys) {
	  re.keys = keys;
	  return re
	}

	/**
	 * Get the flags for a regexp from the options.
	 *
	 * @param  {Object} options
	 * @return {string}
	 */
	function flags (options) {
	  return options.sensitive ? '' : 'i'
	}

	/**
	 * Pull out keys from a regexp.
	 *
	 * @param  {!RegExp} path
	 * @param  {!Array}  keys
	 * @return {!RegExp}
	 */
	function regexpToRegexp (path, keys) {
	  // Use a negative lookahead to match only capturing groups.
	  var groups = path.source.match(/\((?!\?)/g);

	  if (groups) {
	    for (var i = 0; i < groups.length; i++) {
	      keys.push({
	        name: i,
	        prefix: null,
	        delimiter: null,
	        optional: false,
	        repeat: false,
	        partial: false,
	        asterisk: false,
	        pattern: null
	      });
	    }
	  }

	  return attachKeys(path, keys)
	}

	/**
	 * Transform an array into a regexp.
	 *
	 * @param  {!Array}  path
	 * @param  {Array}   keys
	 * @param  {!Object} options
	 * @return {!RegExp}
	 */
	function arrayToRegexp (path, keys, options) {
	  var parts = [];

	  for (var i = 0; i < path.length; i++) {
	    parts.push(pathToRegexp$1(path[i], keys, options).source);
	  }

	  var regexp = new RegExp('(?:' + parts.join('|') + ')', flags(options));

	  return attachKeys(regexp, keys)
	}

	/**
	 * Create a path regexp from string input.
	 *
	 * @param  {string}  path
	 * @param  {!Array}  keys
	 * @param  {!Object} options
	 * @return {!RegExp}
	 */
	function stringToRegexp (path, keys, options) {
	  return tokensToRegExp(parse(path, options), keys, options)
	}

	/**
	 * Expose a function for taking tokens and returning a RegExp.
	 *
	 * @param  {!Array}          tokens
	 * @param  {(Array|Object)=} keys
	 * @param  {Object=}         options
	 * @return {!RegExp}
	 */
	function tokensToRegExp (tokens, keys, options) {
	  if (!isarray(keys)) {
	    options = /** @type {!Object} */ (keys || options);
	    keys = [];
	  }

	  options = options || {};

	  var strict = options.strict;
	  var end = options.end !== false;
	  var route = '';

	  // Iterate over the tokens and create our regexp string.
	  for (var i = 0; i < tokens.length; i++) {
	    var token = tokens[i];

	    if (typeof token === 'string') {
	      route += escapeString(token);
	    } else {
	      var prefix = escapeString(token.prefix);
	      var capture = '(?:' + token.pattern + ')';

	      keys.push(token);

	      if (token.repeat) {
	        capture += '(?:' + prefix + capture + ')*';
	      }

	      if (token.optional) {
	        if (!token.partial) {
	          capture = '(?:' + prefix + '(' + capture + '))?';
	        } else {
	          capture = prefix + '(' + capture + ')?';
	        }
	      } else {
	        capture = prefix + '(' + capture + ')';
	      }

	      route += capture;
	    }
	  }

	  var delimiter = escapeString(options.delimiter || '/');
	  var endsWithDelimiter = route.slice(-delimiter.length) === delimiter;

	  // In non-strict mode we allow a slash at the end of match. If the path to
	  // match already ends with a slash, we remove it for consistency. The slash
	  // is valid at the end of a path match, not in the middle. This is important
	  // in non-ending mode, where "/test/" shouldn't match "/test//route".
	  if (!strict) {
	    route = (endsWithDelimiter ? route.slice(0, -delimiter.length) : route) + '(?:' + delimiter + '(?=$))?';
	  }

	  if (end) {
	    route += '$';
	  } else {
	    // In non-ending mode, we need the capturing groups to match as much as
	    // possible by using a positive lookahead to the end or next path segment.
	    route += strict && endsWithDelimiter ? '' : '(?=' + delimiter + '|$)';
	  }

	  return attachKeys(new RegExp('^' + route, flags(options)), keys)
	}

	/**
	 * Normalize the given path string, returning a regular expression.
	 *
	 * An empty array can be passed in for the keys, which will hold the
	 * placeholder key descriptions. For example, using `/user/:id`, `keys` will
	 * contain `[{ name: 'id', delimiter: '/', optional: false, repeat: false }]`.
	 *
	 * @param  {(string|RegExp|Array)} path
	 * @param  {(Array|Object)=}       keys
	 * @param  {Object=}               options
	 * @return {!RegExp}
	 */
	function pathToRegexp$1 (path, keys, options) {
	  if (!isarray(keys)) {
	    options = /** @type {!Object} */ (keys || options);
	    keys = [];
	  }

	  options = options || {};

	  if (path instanceof RegExp) {
	    return regexpToRegexp(path, /** @type {!Array} */ (keys))
	  }

	  if (isarray(path)) {
	    return arrayToRegexp(/** @type {!Array} */ (path), /** @type {!Array} */ (keys), options)
	  }

	  return stringToRegexp(/** @type {string} */ (path), /** @type {!Array} */ (keys), options)
	}

	pathToRegexp_1.parse = parse_1;
	pathToRegexp_1.compile = compile_1;
	pathToRegexp_1.tokensToFunction = tokensToFunction_1;
	pathToRegexp_1.tokensToRegExp = tokensToRegExp_1;

	var pathToRegexpEs6 = createCommonjsModule((function (module) {
	/**
	 * Expose `pathToRegexp` as ES6 module
	 */
	module.exports = pathToRegexp_1;
	module.exports.parse = pathToRegexp_1.parse;
	module.exports.compile = pathToRegexp_1.compile;
	module.exports.tokensToFunction = pathToRegexp_1.tokensToFunction;
	module.exports.tokensToRegExp = pathToRegexp_1.tokensToRegExp;
	module.exports['default'] = module.exports;
	}));

	var pathToRegexpEs6_1 = pathToRegexpEs6.parse;
	var pathToRegexpEs6_2 = pathToRegexpEs6.compile;
	var pathToRegexpEs6_3 = pathToRegexpEs6.tokensToFunction;
	var pathToRegexpEs6_4 = pathToRegexpEs6.tokensToRegExp;

	var patternCache = {};
	var cacheLimit = 10000;
	var cacheCount = 0;
	var compilePath = function (pattern, options) {
	    var cacheKey = "" + (options.end) + (options.strict) + (options.sensitive);
	    var cache = patternCache[cacheKey] || (patternCache[cacheKey] = {});
	    if (cache[pattern]) {
	        return cache[pattern];
	    }
	    var keys = [];
	    var re = pathToRegexpEs6(pattern, keys, options);
	    var compiledPattern = { re: re, keys: keys };
	    if (cacheCount < cacheLimit) {
	        cache[pattern] = compiledPattern;
	        cacheCount++;
	    }
	    return compiledPattern;
	};
	/**
	 * Public API for matching a URL pathname to a path pattern.
	 */
	function matchPath(pathname, options) {
	    if (typeof options === "string") {
	        options = { path: options };
	    }
	    var path = options.path; if ( path === void 0 ) path = "/";
	    var exact = options.exact; if ( exact === void 0 ) exact = false;
	    var strict = options.strict; if ( strict === void 0 ) strict = false;
	    var sensitive = options.sensitive; if ( sensitive === void 0 ) sensitive = false;
	    var ref = compilePath(path, { end: exact, strict: strict, sensitive: sensitive });
	    var re = ref.re;
	    var keys = ref.keys;
	    var match = re.exec(pathname);
	    if (!match) {
	        return null;
	    }
	    var url = match[0];
	    var values = match.slice(1);
	    var isExact = pathname === url;
	    if (exact && !isExact) {
	        return null;
	    }
	    return {
	        isExact: isExact,
	        params: keys.reduce((function (memo, key, index) {
	            memo[key.name] = values[index];
	            return memo;
	        }), {}),
	        path: path,
	        url: path === "/" && url === "" ? "/" : url // the matched portion of the URL
	    };
	}

	/**
	 * @module Inferno-Router
	 */
	/** TypeDoc Comment */
	var isEmptyChildren = function (children) { return Children.count(children) === 0; };
	/**
	 * The public API for matching a single path and rendering.
	 */
	var Route = (function (Component$$1) {
	    function Route(props, context) {
	        Component$$1.call(this, props, context);
	        this.state = {
	            match: this.computeMatch(props, context.router)
	        };
	    }

	    if ( Component$$1 ) Route.__proto__ = Component$$1;
	    Route.prototype = Object.create( Component$$1 && Component$$1.prototype );
	    Route.prototype.constructor = Route;
	    Route.prototype.getChildContext = function getChildContext () {
	        return {
	            router: Object.assign({}, this.context.router, { route: {
	                    location: this.props.location || this.context.router.route.location,
	                    match: this.state.match
	                } })
	        };
	    };

	    Route.prototype.computeMatch = function computeMatch (ref, router) {
	        var computedMatch = ref.computedMatch;
	        var location = ref.location;
	        var path = ref.path;
	        var strict = ref.strict;
	        var exact = ref.exact;
	        var sensitive = ref.sensitive;

	        if (computedMatch) {
	            // <Switch> already computed the match for us
	            return computedMatch;
	        }
	        invariant(router, "You should not use <Route> or withRouter() outside a <Router>");
	        var route = router.route;
	        var pathname = (location || route.location).pathname;
	        return path
	            ? matchPath(pathname, { path: path, strict: strict, exact: exact, sensitive: sensitive })
	            : route.match;
	    };
	    Route.prototype.componentWillReceiveProps = function componentWillReceiveProps (nextProps, nextContext) {
	        {
	            warning(!(nextProps.location && !this.props.location), '<Route> elements should not change from uncontrolled to controlled (or vice versa). You initially used no "location" prop and then provided one on a subsequent render.');
	            warning(!(!nextProps.location && this.props.location), '<Route> elements should not change from controlled to uncontrolled (or vice versa). You provided a "location" prop initially but omitted it on a subsequent render.');
	        }
	        this.setState({
	            match: this.computeMatch(nextProps, nextContext.router)
	        });
	    };
	    Route.prototype.render = function render () {
	        var ref = this.state;
	        var match = ref.match;
	        var ref$1 = this.props;
	        var children = ref$1.children;
	        var component = ref$1.component;
	        var render = ref$1.render;
	        var ref$2 = this.context.router;
	        var history = ref$2.history;
	        var route = ref$2.route;
	        var staticContext = ref$2.staticContext;
	        var location = this.props.location || route.location;
	        var props = { match: match, location: location, history: history, staticContext: staticContext };
	        if (component) {
	            return match
	                ? inferno.createVNode(16 /* ComponentUnknown */, component, null, null, props)
	                : null;
	        }
	        if (render) {
	            return match ? render(props) : null;
	        }
	        if (typeof children === "function") {
	            return children(props);
	        }
	        if (children && !isEmptyChildren(children)) {
	            return Children.only(children);
	        }
	        return null;
	    };

	    return Route;
	}(inferno.Component));
	{
	    Route.prototype.componentWillMount = function () {
	        warning(!(this.props.component && this.props.render), "You should not use <Route component> and <Route render> in the same route; <Route render> will be ignored");
	        warning(!(this.props.component &&
	            this.props.children &&
	            !isEmptyChildren(this.props.children)), "You should not use <Route component> and <Route children> in the same route; <Route children> will be ignored");
	        warning(!(this.props.render &&
	            this.props.children &&
	            !isEmptyChildren(this.props.children)), "You should not use <Route render> and <Route children> in the same route; <Route children> will be ignored");
	    };
	}

	/**
	 * @module Inferno-Router
	 */ /** TypeDoc Comment */
	var isModifiedEvent = function (event) { return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey); };
	/**
	 * The public API for rendering a history-aware <a>.
	 */
	var Link = (function (Component$$1) {
	    function Link() {
	        var this$1 = this;

	        Component$$1.apply(this, arguments);
	        this.handleClick = function (event) {
	            if (this$1.props.onClick) {
	                this$1.props.onClick(event);
	            }
	            if (!event.defaultPrevented && // onClick prevented default
	                event.button === 0 && // ignore everything but left clicks
	                !this$1.props.target && // let browser handle "target=_blank" etc.
	                !isModifiedEvent(event) // ignore clicks with modifier keys
	            ) {
	                event.preventDefault();
	                var ref = this$1.context.router;
	                var history = ref.history;
	                var ref$1 = this$1.props;
	                var replace = ref$1.replace; if ( replace === void 0 ) replace = false;
	                var to = ref$1.to;
	                if (replace) {
	                    history.replace(to);
	                }
	                else {
	                    history.push(to);
	                }
	            }
	        };
	    }

	    if ( Component$$1 ) Link.__proto__ = Component$$1;
	    Link.prototype = Object.create( Component$$1 && Component$$1.prototype );
	    Link.prototype.constructor = Link;
	    Link.prototype.render = function render (_a) {
	        var replace = _a.replace;
	        var className = _a.className;
	        var to = _a.to; if ( to === void 0 ) to = "";
	        var innerRef = _a.innerRef;
	        var rest = __rest(_a, ["replace", "className", "to", "innerRef"]);
	        invariant(this.context.router, "You should not use <Link> outside a <Router>");
	        var href = this.context.router.history.createHref(typeof to === "string" ? { pathname: to } : to);
	        return inferno.createVNode(2 /* HtmlElement */, "a", className, null, Object.assign({}, rest, { href: href, onClick: this.handleClick }), null, innerRef ? function (x) { return innerRef(x); } : null);
	    };

	    return Link;
	}(inferno.Component));

	/**
	 * @module Inferno-Router
	 */ /** TypeDoc Comment */
	/**
	 * A <Link> wrapper that knows if it's "active" or not.
	 */
	var NavLink = function (_a) {
	    var to = _a.to;
	    var exact = _a.exact;
	    var strict = _a.strict;
	    var onClick = _a.onClick;
	    var linkLocation = _a.location;
	    var activeClassName = _a.activeClassName; if ( activeClassName === void 0 ) activeClassName = "active";
	    var className = _a.className;
	    var activeStyle = _a.activeStyle;
	    var style = _a.style;
	    var getIsActive = _a.isActive;
	    var ariaCurrent = _a.ariaCurrent; if ( ariaCurrent === void 0 ) ariaCurrent = "true";
	    var rest = __rest(_a, ["to", "exact", "strict", "onClick", "location", "activeClassName", "className", "activeStyle", "style", "isActive", "ariaCurrent"]);
	    function linkComponent(ref) {
	        var location = ref.location;
	        var match = ref.match;

	        var isActive = !!(getIsActive ? getIsActive(match, location) : match);
	        return inferno.createVNode(4 /* ComponentClass */, Link, null, null, Object.assign({ "aria-current": isActive && ariaCurrent, className: isActive
	                ? [className, activeClassName].filter((function (i) { return i; })).join(" ")
	                : className, exact: exact,
	            onClick: onClick, style: isActive ? Object.assign({}, style, activeStyle) : style, to: to }, rest));
	    }
	    return inferno.createVNode(4 /* ComponentClass */, Route, null, null, {
	        children: linkComponent,
	        exact: exact,
	        location: linkLocation,
	        path: typeof to === "object" ? to.pathname : to,
	        strict: strict
	    });
	};

	/**
	 * @module Inferno-Router
	 */ /** TypeDoc Comment */
	/**
	 * @deprecated
	 */
	var IndexLink = function (props) {
	    {
	        // tslint:disable-next-line:no-console
	        console.error("Using IndexLink is deprecated. Please use Link or NavLink instead.");
	    }
	    return inferno.createVNode(8 /* ComponentFunction */, NavLink, null, null, props);
	};

	/**
	 * @module Inferno-Router
	 */ /** TypeDoc Comment */
	/**
	 * @deprecated
	 */
	var IndexRoute = function (props) {
	    {
	        // tslint:disable-next-line:no-console
	        console.error("Using IndexRoute is deprecated. Please use Route instead.");
	    }
	    return inferno.createVNode(4 /* ComponentClass */, Route, null, null, props);
	};

	var createMemoryHistory_1 = createCommonjsModule((function (module, exports) {
	exports.__esModule = true;

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var _extends = Object.assign || function (target) {
	var arguments$1 = arguments;
	 for (var i = 1; i < arguments.length; i++) { var source = arguments$1[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



	var _warning2 = _interopRequireDefault(warning_1);







	var _createTransitionManager2 = _interopRequireDefault(createTransitionManager_1);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var clamp = function clamp(n, lowerBound, upperBound) {
	  return Math.min(Math.max(n, lowerBound), upperBound);
	};

	/**
	 * Creates a history object that stores locations in memory.
	 */
	var createMemoryHistory = function createMemoryHistory() {
	  var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	  var getUserConfirmation = props.getUserConfirmation,
	      _props$initialEntries = props.initialEntries,
	      initialEntries = _props$initialEntries === undefined ? ['/'] : _props$initialEntries,
	      _props$initialIndex = props.initialIndex,
	      initialIndex = _props$initialIndex === undefined ? 0 : _props$initialIndex,
	      _props$keyLength = props.keyLength,
	      keyLength = _props$keyLength === undefined ? 6 : _props$keyLength;


	  var transitionManager = (0, _createTransitionManager2.default)();

	  var setState = function setState(nextState) {
	    _extends(history, nextState);

	    history.length = history.entries.length;

	    transitionManager.notifyListeners(history.location, history.action);
	  };

	  var createKey = function createKey() {
	    return Math.random().toString(36).substr(2, keyLength);
	  };

	  var index = clamp(initialIndex, 0, initialEntries.length - 1);
	  var entries = initialEntries.map((function (entry) {
	    return typeof entry === 'string' ? (0, LocationUtils.createLocation)(entry, undefined, createKey()) : (0, LocationUtils.createLocation)(entry, undefined, entry.key || createKey());
	  }));

	  // Public interface

	  var createHref = PathUtils.createPath;

	  var push = function push(path, state) {
	    (0, _warning2.default)(!((typeof path === 'undefined' ? 'undefined' : _typeof(path)) === 'object' && path.state !== undefined && state !== undefined), 'You should avoid providing a 2nd state argument to push when the 1st ' + 'argument is a location-like object that already has state; it is ignored');

	    var action = 'PUSH';
	    var location = (0, LocationUtils.createLocation)(path, state, createKey(), history.location);

	    transitionManager.confirmTransitionTo(location, action, getUserConfirmation, (function (ok) {
	      if (!ok) { return; }

	      var prevIndex = history.index;
	      var nextIndex = prevIndex + 1;

	      var nextEntries = history.entries.slice(0);
	      if (nextEntries.length > nextIndex) {
	        nextEntries.splice(nextIndex, nextEntries.length - nextIndex, location);
	      } else {
	        nextEntries.push(location);
	      }

	      setState({
	        action: action,
	        location: location,
	        index: nextIndex,
	        entries: nextEntries
	      });
	    }));
	  };

	  var replace = function replace(path, state) {
	    (0, _warning2.default)(!((typeof path === 'undefined' ? 'undefined' : _typeof(path)) === 'object' && path.state !== undefined && state !== undefined), 'You should avoid providing a 2nd state argument to replace when the 1st ' + 'argument is a location-like object that already has state; it is ignored');

	    var action = 'REPLACE';
	    var location = (0, LocationUtils.createLocation)(path, state, createKey(), history.location);

	    transitionManager.confirmTransitionTo(location, action, getUserConfirmation, (function (ok) {
	      if (!ok) { return; }

	      history.entries[history.index] = location;

	      setState({ action: action, location: location });
	    }));
	  };

	  var go = function go(n) {
	    var nextIndex = clamp(history.index + n, 0, history.entries.length - 1);

	    var action = 'POP';
	    var location = history.entries[nextIndex];

	    transitionManager.confirmTransitionTo(location, action, getUserConfirmation, (function (ok) {
	      if (ok) {
	        setState({
	          action: action,
	          location: location,
	          index: nextIndex
	        });
	      } else {
	        // Mimic the behavior of DOM histories by
	        // causing a render after a cancelled POP.
	        setState();
	      }
	    }));
	  };

	  var goBack = function goBack() {
	    return go(-1);
	  };

	  var goForward = function goForward() {
	    return go(1);
	  };

	  var canGo = function canGo(n) {
	    var nextIndex = history.index + n;
	    return nextIndex >= 0 && nextIndex < history.entries.length;
	  };

	  var block = function block() {
	    var prompt = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
	    return transitionManager.setPrompt(prompt);
	  };

	  var listen = function listen(listener) {
	    return transitionManager.appendListener(listener);
	  };

	  var history = {
	    length: entries.length,
	    action: 'POP',
	    location: entries[index],
	    index: index,
	    entries: entries,
	    createHref: createHref,
	    push: push,
	    replace: replace,
	    go: go,
	    goBack: goBack,
	    goForward: goForward,
	    canGo: canGo,
	    block: block,
	    listen: listen
	  };

	  return history;
	};

	exports.default = createMemoryHistory;
	}));

	var createHistory$2 = unwrapExports(createMemoryHistory_1);

	/**
	 * @module Inferno-Router
	 */ /** TypeDoc Comment */
	var MemoryRouter = (function (Component$$1) {
	    function MemoryRouter(props, context) {
	        Component$$1.call(this, props, context);
	        this.history = createHistory$2(props);
	    }

	    if ( Component$$1 ) MemoryRouter.__proto__ = Component$$1;
	    MemoryRouter.prototype = Object.create( Component$$1 && Component$$1.prototype );
	    MemoryRouter.prototype.constructor = MemoryRouter;
	    MemoryRouter.prototype.render = function render () {
	        return inferno.createVNode(4 /* ComponentClass */, Router, null, null, {
	            children: this.props.children,
	            history: this.history
	        });
	    };

	    return MemoryRouter;
	}(inferno.Component));

	{
	    MemoryRouter.prototype.componentWillMount = function () {
	        warning(!this.props.history, "<MemoryRouter> ignores the history prop. To use a custom history, " +
	            "use `import { Router }` instead of `import { MemoryRouter as Router }`.");
	    };
	}

	/**
	 * @module Inferno-Router
	 */ /** TypeDoc Comment */
	/**
	 * The public API for rendering the first <Route> that matches.
	 */
	var Switch = (function (Component$$1) {
	    function Switch () {
	        Component$$1.apply(this, arguments);
	    }

	    if ( Component$$1 ) Switch.__proto__ = Component$$1;
	    Switch.prototype = Object.create( Component$$1 && Component$$1.prototype );
	    Switch.prototype.constructor = Switch;

	    Switch.prototype.componentWillMount = function componentWillMount () {
	        invariant(this.context.router, "You should not use <Switch> outside a <Router>");
	    };
	    Switch.prototype.componentWillReceiveProps = function componentWillReceiveProps (nextProps) {
	        warning(!(nextProps.location && !this.props.location), '<Switch> elements should not change from uncontrolled to controlled (or vice versa). You initially used no "location" prop and then provided one on a subsequent render.');
	        warning(!(!nextProps.location && this.props.location), '<Switch> elements should not change from controlled to uncontrolled (or vice versa). You provided a "location" prop initially but omitted it on a subsequent render.');
	    };
	    Switch.prototype.render = function render () {
	        var ref = this.context.router;
	        var route = ref.route;
	        var ref$1 = this.props;
	        var children = ref$1.children;
	        var location = this.props.location || route.location;
	        var match;
	        var child;
	        // optimization: Better to use for loop here so we can return when match found, instead looping through everything
	        Children.forEach(children, (function (element) {
	            if (!isValidElement(element)) {
	                return;
	            }
	            var ref = element.props;
	            var pathProp = ref.path;
	            var exact = ref.exact;
	            var strict = ref.strict;
	            var sensitive = ref.sensitive;
	            var from = ref.from;
	            var path = pathProp || from;
	            if (match == null) {
	                child = element;
	                match = path
	                    ? matchPath(location.pathname, { path: path, exact: exact, strict: strict, sensitive: sensitive })
	                    : route.match;
	            }
	        }));
	        return match
	            ? inferno.createVNode(child.flags, child.type, null, null, infernoShared.combineFrom(child.props, { location: location, computedMatch: match }), null, child.ref, true)
	            : null;
	    };

	    return Switch;
	}(inferno.Component));

	/**
	 * @module Inferno-Router
	 */
	/** TypeDoc Comment */
	/**
	 * The public API for matching a single path and rendering.
	 */
	var Prompt = (function (Component$$1) {
	    function Prompt () {
	        Component$$1.apply(this, arguments);
	    }

	    if ( Component$$1 ) Prompt.__proto__ = Component$$1;
	    Prompt.prototype = Object.create( Component$$1 && Component$$1.prototype );
	    Prompt.prototype.constructor = Prompt;

	    Prompt.prototype.enable = function enable (message) {
	        if (this.unblock) {
	            this.unblock();
	        }
	        this.unblock = this.context.router.history.block(message);
	    };
	    Prompt.prototype.disable = function disable () {
	        if (this.unblock) {
	            this.unblock();
	            this.unblock = null;
	        }
	    };
	    Prompt.prototype.componentWillMount = function componentWillMount () {
	        invariant(this.context.router, "You should not use <Prompt> outside a <Router>");
	        if (this.props.when) {
	            this.enable(this.props.message);
	        }
	    };
	    Prompt.prototype.componentWillReceiveProps = function componentWillReceiveProps (nextProps) {
	        if (nextProps.when) {
	            if (!this.props.when || this.props.message !== nextProps.message) {
	                this.enable(nextProps.message);
	            }
	        }
	        else {
	            this.disable();
	        }
	    };
	    Prompt.prototype.componentWillUnmount = function componentWillUnmount () {
	        this.disable();
	    };
	    Prompt.prototype.render = function render () {
	        return null;
	    };

	    return Prompt;
	}(inferno.Component));

	/**
	 * @module Inferno-Router
	 */ /** TypeDoc Comment */
	var Redirect = (function (Component$$1) {
	    function Redirect () {
	        Component$$1.apply(this, arguments);
	    }

	    if ( Component$$1 ) Redirect.__proto__ = Component$$1;
	    Redirect.prototype = Object.create( Component$$1 && Component$$1.prototype );
	    Redirect.prototype.constructor = Redirect;

	    Redirect.prototype.isStatic = function isStatic () {
	        return this.context.router && this.context.router.staticContext;
	    };
	    Redirect.prototype.componentWillMount = function componentWillMount () {
	        invariant(this.context.router, "You should not use <Redirect> outside a <Router>");
	        if (this.isStatic()) {
	            this.perform();
	        }
	    };
	    Redirect.prototype.componentDidMount = function componentDidMount () {
	        if (!this.isStatic()) {
	            this.perform();
	        }
	    };
	    Redirect.prototype.componentDidUpdate = function componentDidUpdate (prevProps) {
	        var prevTo = LocationUtils_2(prevProps.to);
	        var nextTo = LocationUtils_2(this.props.to);
	        if (LocationUtils_1(prevTo, nextTo)) {
	            // tslint:disable-next-line:no-console
	            console.error(("You tried to redirect to the same route you're currently on: \"" + (nextTo.pathname) + (nextTo.search) + "\""));
	            return;
	        }
	        this.perform();
	    };
	    Redirect.prototype.perform = function perform () {
	        var ref = this.context.router;
	        var history = ref.history;
	        var ref$1 = this.props;
	        var push = ref$1.push; if ( push === void 0 ) push = false;
	        var to = ref$1.to;
	        if (push) {
	            history.push(to);
	        }
	        else {
	            history.replace(to);
	        }
	    };
	    Redirect.prototype.render = function render () {
	        return null;
	    };

	    return Redirect;
	}(inferno.Component));

	/**
	 * @module Inferno-Router
	 */ /** TypeDoc Comment */
	/**
	 * A public higher-order component to access the imperative API
	 */
	function withRouter(Com) {
	    var C = function (props) {
	        var wrappedComponentRef = props.wrappedComponentRef;
	        var remainingProps = __rest(props, ["wrappedComponentRef"]);
	        return inferno.createVNode(4 /* ComponentClass */, Route, null, null, {
	            render: function render(routeComponentProps) {
	                return inferno.createVNode(16 /* ComponentUnknown */, Com, null, null, Object.assign({}, remainingProps, routeComponentProps), null, wrappedComponentRef);
	            }
	        });
	    };
	    C.displayName = "withRouter(" + (Com.displayName || Com.name) + ")";
	    C.WrappedComponent = Com;
	    return hoistStatics(C, Com);
	}

	/**
	 * @module Inferno-Router
	 */ /** TypeDoc Comment */
	var index = {
	    BrowserRouter: BrowserRouter,
	    HashRouter: HashRouter,
	    IndexLink: IndexLink,
	    IndexRoute: IndexRoute,
	    Link: Link,
	    MemoryRouter: MemoryRouter,
	    NavLink: NavLink,
	    Prompt: Prompt,
	    Redirect: Redirect,
	    Route: Route,
	    Router: Router,
	    StaticRouter: StaticRouter,
	    Switch: Switch,
	    matchPath: matchPath,
	    withRouter: withRouter
	};

	exports.BrowserRouter = BrowserRouter;
	exports.HashRouter = HashRouter;
	exports.IndexLink = IndexLink;
	exports.IndexRoute = IndexRoute;
	exports.Link = Link;
	exports.MemoryRouter = MemoryRouter;
	exports.NavLink = NavLink;
	exports.Prompt = Prompt;
	exports.Redirect = Redirect;
	exports.Route = Route;
	exports.Router = Router;
	exports.StaticRouter = StaticRouter;
	exports.Switch = Switch;
	exports.matchPath = matchPath;
	exports.withRouter = withRouter;
	exports['default'] = index;

	Object.defineProperty(exports, '__esModule', { value: true });

})));
