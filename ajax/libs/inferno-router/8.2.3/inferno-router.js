(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('inferno'), require('history'), require('path-to-regexp-es6'), require('hoist-non-inferno-statics')) :
    typeof define === 'function' && define.amd ? define(['exports', 'inferno', 'history', 'path-to-regexp-es6', 'hoist-non-inferno-statics'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.Inferno = global.Inferno || {}, global.Inferno.Router = global.Inferno.Router || {}), global.Inferno, global.history, global.pathToRegexp, global.hoistNonReactStatics));
})(this, (function (exports, inferno, history, pathToRegexp, hoistNonReactStatics) { 'use strict';

    var isArray = Array.isArray;
    function isNullOrUndef(o) {
      return o === void 0 || o === null;
    }
    function isInvalid(o) {
      return o === null || o === false || o === true || o === void 0;
    }
    function isFunction(o) {
      return typeof o === 'function';
    }
    function isString(o) {
      return typeof o === 'string';
    }
    function isUndefined(o) {
      return o === void 0;
    }
    function combineFrom(first, second) {
      var out = {};
      if (first) {
        for (var key in first) {
          out[key] = first[key];
        }
      }
      if (second) {
        for (var _key in second) {
          out[_key] = second[_key];
        }
      }
      return out;
    }

    function warning(condition, message) {
      if (!condition) {
        // tslint:disable-next-line:no-console
        console.error(message);
      }
    }
    function combinePath(_ref) {
      var _ref$pathname = _ref.pathname,
        pathname = _ref$pathname === void 0 ? '/' : _ref$pathname,
        _ref$search = _ref.search,
        search = _ref$search === void 0 ? '' : _ref$search,
        _ref$hash = _ref.hash,
        hash = _ref$hash === void 0 ? '' : _ref$hash;
      return pathname + search + hash;
    }
    function invariant(condition, format, a, b, c, d, e, f) {
      if (!condition) {
        var error;
        if (format === undefined) {
          error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
        } else {
          var args = [a, b, c, d, e, f];
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

    var patternCache = {};
    var cacheLimit = 10000;
    var cacheCount = 0;
    var compilePath = function compilePath(pattern, options) {
      var cacheKey = "" + options.end + options.strict + options.sensitive;
      var cache = patternCache[cacheKey] || (patternCache[cacheKey] = {});
      if (cache[pattern]) {
        return cache[pattern];
      }
      var keys = [];
      var re = pathToRegexp(pattern, keys, options);
      var compiledPattern = {
        re: re,
        keys: keys
      };
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
      if (typeof options === 'string') {
        options = {
          path: options
        };
      }
      var _options = options,
        _options$path = _options.path,
        path = _options$path === void 0 ? '/' : _options$path,
        _options$exact = _options.exact,
        exact = _options$exact === void 0 ? false : _options$exact,
        _options$strict = _options.strict,
        strict = _options$strict === void 0 ? false : _options$strict,
        _options$sensitive = _options.sensitive,
        sensitive = _options$sensitive === void 0 ? false : _options$sensitive,
        loader = _options.loader,
        _options$initialData = _options.initialData,
        initialData = _options$initialData === void 0 ? {} : _options$initialData;
      var _compilePath = compilePath(path, {
          end: exact,
          strict: strict,
          sensitive: sensitive
        }),
        re = _compilePath.re,
        keys = _compilePath.keys;
      var match = re.exec(pathname);
      if (!match) {
        return null;
      }
      var loaderData = initialData[path];
      var url = match[0],
        values = match.slice(1);
      var isExact = pathname === url;
      if (exact && !isExact) {
        return null;
      }
      return {
        isExact: isExact,
        loader: loader,
        loaderData: loaderData,
        params: keys.reduce(function (memo, key, index) {
          memo[key.name] = values[index];
          return memo;
        }, {}),
        path: path,
        url: path === '/' && url === '' ? '/' : url // the matched portion of the URL
      };
    }

    function _inheritsLoose$8(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf$8(subClass, superClass); }
    function _setPrototypeOf$8(o, p) { _setPrototypeOf$8 = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf$8(o, p); }
    function getMatch(pathname, _ref, router) {
      var _path;
      var path = _ref.path,
        exact = _ref.exact,
        strict = _ref.strict,
        sensitive = _ref.sensitive,
        loader = _ref.loader,
        from = _ref.from;
      (_path = path) != null ? _path : path = from;
      var initialData = router.initialData,
        route = router.route; // This is the parent route
      return path ? matchPath(pathname, {
        path: path,
        exact: exact,
        strict: strict,
        sensitive: sensitive,
        loader: loader,
        initialData: initialData
      }) : route.match;
    }
    function extractFirstMatchFromChildren(pathname, children, router) {
      if (isArray(children)) {
        for (var i = 0; i < children.length; ++i) {
          var nestedMatch = extractFirstMatchFromChildren(pathname, children[i], router);
          if (nestedMatch.match) return nestedMatch;
        }
        return {};
      }
      return {
        _child: children,
        match: getMatch(pathname, children.props, router)
      };
    }
    var Switch = /*#__PURE__*/function (_Component) {
      _inheritsLoose$8(Switch, _Component);
      function Switch(props, context) {
        var _this;
        _this = _Component.call(this, props, context) || this;
        {
          invariant(context.router, 'You should not use <Switch> outside a <Router>');
        }
        var router = context.router;
        var location = props.location,
          children = props.children;
        var pathname = (location || router.route.location).pathname;
        var _extractFirstMatchFro = extractFirstMatchFromChildren(pathname, children, router),
          match = _extractFirstMatchFro.match,
          _child = _extractFirstMatchFro._child;
        _this.state = {
          _child: _child,
          match: match
        };
        return _this;
      }
      var _proto = Switch.prototype;
      _proto.componentWillReceiveProps = function componentWillReceiveProps(nextProps, nextContext) {
        {
          warning(!(nextProps.location && !this.props.location), '<Switch> elements should not change from uncontrolled to controlled (or vice versa). You initially used no "location" prop and then provided one on a subsequent render.');
          warning(!(!nextProps.location && this.props.location), '<Switch> elements should not change from controlled to uncontrolled (or vice versa). You provided a "location" prop initially but omitted it on a subsequent render.');
        }
        var router = nextContext.router;
        var location = nextProps.location,
          children = nextProps.children;
        var pathname = (location || router.route.location).pathname;
        var _extractFirstMatchFro2 = extractFirstMatchFromChildren(pathname, children, router),
          match = _extractFirstMatchFro2.match,
          _child = _extractFirstMatchFro2._child;
        this.setState({
          match: match,
          _child: _child
        });
      };
      _proto.render = function render(_ref2, _ref3, context) {
        var children = _ref2.children,
          location = _ref2.location;
        var match = _ref3.match,
          _child = _ref3._child;
        if (isInvalid(children)) {
          return null;
        }
        if (match) {
          var _location;
          (_location = location) != null ? _location : location = context.router.route.location;
          return inferno.createComponentVNode(_child.flags, _child.type, combineFrom(_child.props, {
            location: location,
            computedMatch: match
          }));
        }
        return null;
      };
      return Switch;
    }(inferno.Component);

    var _excluded$5 = ["computedMatch"];
    function _objectWithoutPropertiesLoose$5(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
    function _inheritsLoose$7(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf$7(subClass, superClass); }
    function _setPrototypeOf$7(o, p) { _setPrototypeOf$7 = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf$7(o, p); }
    var Route = /*#__PURE__*/function (_Component) {
      _inheritsLoose$7(Route, _Component);
      function Route(props, context) {
        var _this;
        _this = _Component.call(this, props, context) || this;
        var match = _this.computeMatch(props, context.router);
        _this.state = {
          __loaderData__: match == null ? void 0 : match.loaderData,
          match: match
        };
        return _this;
      }
      var _proto = Route.prototype;
      _proto.getChildContext = function getChildContext() {
        var parentRouter = this.context.router;
        var router = combineFrom(parentRouter, null);
        router.route = {
          location: this.props.location || parentRouter.route.location,
          match: this.state.match
        };
        return {
          router: router
        };
      };
      _proto.computeMatch = function computeMatch(_ref, router) {
        var computedMatch = _ref.computedMatch,
          props = _objectWithoutPropertiesLoose$5(_ref, _excluded$5);
        if (!isNullOrUndef(computedMatch)) {
          // <Switch> already computed the match for us
          return computedMatch;
        }
        var path = props.path,
          strict = props.strict,
          exact = props.exact,
          sensitive = props.sensitive,
          loader = props.loader;
        {
          invariant(router, 'You should not use <Route> or withRouter() outside a <Router>');
        }
        var route = router.route,
          initialData = router.initialData; // This is the parent route
        var pathname = (props.location || route.location).pathname;
        return path ? matchPath(pathname, {
          path: path,
          strict: strict,
          exact: exact,
          sensitive: sensitive,
          loader: loader,
          initialData: initialData
        }) : route.match;
      };
      _proto.componentWillReceiveProps = function componentWillReceiveProps(nextProps, nextContext) {
        {
          warning(!(nextProps.location && !this.props.location), '<Route> elements should not change from uncontrolled to controlled (or vice versa). You initially used no "location" prop and then provided one on a subsequent render.');
          warning(!(!nextProps.location && this.props.location), '<Route> elements should not change from controlled to uncontrolled (or vice versa). You provided a "location" prop initially but omitted it on a subsequent render.');
        }
        var match = this.computeMatch(nextProps, nextContext.router);
        this.setState({
          __loaderData__: match == null ? void 0 : match.loaderData,
          match: match
        });
      };
      _proto.render = function render(props, state, context) {
        var match = state.match,
          __loaderData__ = state.__loaderData__;
        var children = props.children,
          component = props.component,
          render = props.render,
          loader = props.loader;
        var _context$router = context.router,
          history = _context$router.history,
          route = _context$router.route,
          staticContext = _context$router.staticContext;
        var location = props.location || route.location;
        var renderProps = {
          match: match,
          location: location,
          history: history,
          staticContext: staticContext,
          component: component,
          render: render,
          loader: loader,
          __loaderData__: __loaderData__
        };
        // If we have a loader we don't render until it has been resolved
        if (!isUndefined(loader) && isUndefined(__loaderData__)) {
          return null;
        }
        if (component) {
          {
            if (!isFunction(component)) {
              throw new Error("Inferno error: <Route /> - 'component' property must be prototype of class or functional component, not vNode.");
            }
          }
          return match ? inferno.createComponentVNode(2 /* VNodeFlags.ComponentUnknown */, component, renderProps) : null;
        }
        if (render) {
          // @ts-ignore
          return match ? render(renderProps, this.context) : null;
        }
        if (typeof children === 'function') {
          return children(renderProps);
        }
        return children;
      };
      return Route;
    }(inferno.Component);
    {
      Route.prototype.componentWillMount = function () {
        warning(!(this.props.component && this.props.render), 'You should not use <Route component> and <Route render> in the same route; <Route render> will be ignored');
        warning(!(this.props.component && this.props.children), 'You should not use <Route component> and <Route children> in the same route; <Route children> will be ignored');
        warning(!(this.props.render && this.props.children), 'You should not use <Route render> and <Route children> in the same route; <Route children> will be ignored');
      };
    }

    function resolveLoaders(loaderEntries) {
      var promises = loaderEntries.map(function (_ref) {
        var path = _ref.path,
          params = _ref.params,
          request = _ref.request,
          loader = _ref.loader;
        return resolveEntry(path, params, request, loader);
      });
      return Promise.all(promises).then(function (result) {
        return Object.fromEntries(result);
      });
    }
    function traverseLoaders(location, tree, base) {
      return _traverseLoaders(location, tree, base, false);
    }
    function _isSwitch(node) {
      var _node$type;
      // Using the same patterns as for _isRoute, but I don't have a test where
      // I pass a Switch via an array, but it is better to be consistent.
      return (node == null ? void 0 : (_node$type = node.type) == null ? void 0 : _node$type.prototype) instanceof Switch || (node == null ? void 0 : node.type) === Switch;
    }
    function _isRoute(node) {
      var _node$type2;
      // So the === check is needed if routes are passed in an array,
      // the instanceof test if routes are passed as children to a Component
      // This feels inconsistent, but at least it works.
      return (node == null ? void 0 : (_node$type2 = node.type) == null ? void 0 : _node$type2.prototype) instanceof Route || (node == null ? void 0 : node.type) === Route;
    }
    // Optionally pass base param during SSR to get fully qualified request URI passed to loader in request param
    function _traverseLoaders(location, tree, base, parentIsSwitch) {
      var _tree$children, _tree$props4;
      if (parentIsSwitch === void 0) {
        parentIsSwitch = false;
      }
      // Make sure tree isn't null
      if (isNullOrUndef(tree)) return [];
      if (Array.isArray(tree)) {
        var hasMatch = false;
        var entriesOfArr = tree.reduce(function (res, node) {
          if (parentIsSwitch && hasMatch) return res;
          var outpArr = _traverseLoaders(location, node, base, _isSwitch(node));
          if (parentIsSwitch && outpArr.length > 0) {
            hasMatch = true;
          }
          return [].concat(res, outpArr);
        }, []);
        return entriesOfArr;
      }
      var outp = [];
      if (_isRoute(tree) && tree.props) {
        var _tree$props2, _tree$props3;
        // TODO: Should we check if we are in Router? It is defensive and could save a bit of time, but is it worth it?
        var _tree$props = tree.props,
          path = _tree$props.path,
          _tree$props$exact = _tree$props.exact,
          exact = _tree$props$exact === void 0 ? false : _tree$props$exact,
          _tree$props$strict = _tree$props.strict,
          strict = _tree$props$strict === void 0 ? false : _tree$props$strict,
          _tree$props$sensitive = _tree$props.sensitive,
          sensitive = _tree$props$sensitive === void 0 ? false : _tree$props$sensitive;
        var match = matchPath(location, {
          exact: exact,
          path: path,
          sensitive: sensitive,
          strict: strict
        });
        // So we can bail out of recursion it this was a Route which didn't match
        if (!match) {
          return outp;
        } else if (!tree.context && (_tree$props2 = tree.props) != null && _tree$props2.loader && (_tree$props3 = tree.props) != null && _tree$props3.path) {
          // Add any loader on this node (but only on the VNode)
          var params = match.params;
          var controller = new AbortController();
          var request = createClientSideRequest(location, controller.signal, base);
          outp.push({
            controller: controller,
            loader: tree.props.loader,
            params: params,
            path: path,
            request: request
          });
        }
      }
      // Traverse children
      var children = (_tree$children = tree.children) != null ? _tree$children : (_tree$props4 = tree.props) == null ? void 0 : _tree$props4.children;
      if (isNullOrUndef(children)) return outp;
      var entries = _traverseLoaders(location, children, base, _isSwitch(tree));
      return [].concat(outp, entries);
    }
    function resolveEntry(path, params, request, loader) {
      return loader({
        params: params,
        request: request
      }).then(function (res) {
        // This implementation is based on:
        // https://github.com/remix-run/react-router/blob/4f3ad7b96e6e0228cc952cd7eafe2c265c7393c7/packages/router/router.ts#L2787-L2879
        // Check if regular data object (from tests or initialData)
        if (typeof res.json !== 'function') {
          return [path, {
            res: res
          }];
        }
        var contentType = res.headers.get('Content-Type');
        var dataPromise;
        // Check between word boundaries instead of startsWith() due to the last
        // paragraph of https://httpwg.org/specs/rfc9110.html#field.content-type
        if (contentType && /\bapplication\/json\b/.test(contentType)) {
          dataPromise = res.json();
        } else {
          dataPromise = res.text();
        }
        return dataPromise.then(function (body) {
          // We got a JSON error
          if (!res.ok) {
            return [path, {
              err: body
            }];
          }
          // We got JSON response
          return [path, {
            res: body
          }];
        })
        // Could not parse JSON
        ["catch"](function (err) {
          return [path, {
            err: err
          }];
        });
      })
      // Could not fetch data
      ["catch"](function (err) {
        return [path, {
          err: err
        }];
      });
    }
    var inBrowser = typeof window === 'undefined';
    function createClientSideRequest(location, signal,
    // submission?: Submission
    base) {
      var url = inBrowser || !isUndefined(base) ? createClientSideURL(location, base) : location.toString();
      var init = {
        signal: signal
      };
      // Content-Type is inferred (https://fetch.spec.whatwg.org/#dom-request)
      return new Request(url, init);
    }
    /**
     * Parses a string URL path into its separate pathname, search, and hash components.
     */
    function createClientSideURL(location, base) {
      if (base === undefined && typeof window !== 'undefined') {
        var _window, _window$location;
        // window.location.origin is "null" (the literal string value) in Firefox
        // under certain conditions, notably when serving from a local HTML file
        // See https://bugzilla.mozilla.org/show_bug.cgi?id=878297
        base = ((_window = window) == null ? void 0 : (_window$location = _window.location) == null ? void 0 : _window$location.origin) !== 'null' ? window.location.origin : window.location.href;
      }
      var url = new URL(location.toString(), base);
      url.hash = '';
      return url;
    }
    // TODO: react-router supports submitting forms with loaders, this is related to that
    // function isMutationMethod(method?: string): method is MutationFormMethod {
    //   return validMutationMethods.has(method as MutationFormMethod);
    // }
    // function convertFormDataToSearchParams(formData: FormData): URLSearchParams {
    //   let searchParams = new URLSearchParams();
    //   for (let [key, value] of formData.entries()) {
    //     // invariant(
    //     //   typeof value === "string",
    //     //   'File inputs are not supported with encType "application/x-www-form-urlencoded", ' +
    //     //     'please use "multipart/form-data" instead.'
    //     // );
    //     if (typeof value === "string") {
    //       searchParams.append(key, value);
    //     }
    //   }
    //   return searchParams;
    // }

    function _createForOfIteratorHelperLoose(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (it) return (it = it.call(o)).next.bind(it); if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; return function () { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
    function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
    function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
    function _inheritsLoose$6(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf$6(subClass, superClass); }
    function _setPrototypeOf$6(o, p) { _setPrototypeOf$6 = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf$6(o, p); }
    /**
     * The public API for putting history on context.
     */
    var Router = /*#__PURE__*/function (_Component) {
      _inheritsLoose$6(Router, _Component);
      function Router(props, context) {
        var _this;
        _this = _Component.call(this, props, context) || this;
        _this.unlisten = void 0;
        _this._loaderFetchControllers = [];
        _this._loaderIteration = 0;
        var match = _this.computeMatch(props.history.location.pathname);
        _this.state = {
          initialData: _this.props.initialData,
          match: match
        };
        return _this;
      }
      var _proto = Router.prototype;
      _proto.getChildContext = function getChildContext() {
        var _this$state, _this$state2;
        var parentRouter = this.context.router;
        var router = combineFrom(parentRouter, null);
        router.history = this.props.history;
        router.route = {
          location: router.history.location,
          match: (_this$state = this.state) == null ? void 0 : _this$state.match // Why are we sending this? it appears useless.
        };

        router.initialData = (_this$state2 = this.state) == null ? void 0 : _this$state2.initialData; // this is a dictionary of all data available
        return {
          router: router
        };
      };
      _proto.computeMatch = function computeMatch(pathname) {
        return {
          isExact: pathname === '/',
          loader: undefined,
          params: {},
          path: '/',
          url: '/'
        };
      };
      _proto.componentWillMount = function componentWillMount() {
        var _this2 = this;
        var history = this.props.history;
        // Do this here so we can setState when a <Redirect> changes the
        // location in componentWillMount. This happens e.g. when doing
        // server rendering using a <StaticRouter>.
        this.unlisten = history.listen(function () {
          var match = _this2.computeMatch(history.location.pathname);
          _this2._matchAndResolveLoaders(match);
        });
        // First execution of loaders
        if (isUndefined(this.props.initialData)) {
          var _this$state3;
          this._matchAndResolveLoaders((_this$state3 = this.state) == null ? void 0 : _this$state3.match);
        }
      };
      _proto._matchAndResolveLoaders = function _matchAndResolveLoaders(match) {
        var _this3 = this;
        // Keep track of invokation order
        // Bumping the counter needs to be done first because calling abort
        // triggers promise to resolve with "aborted"
        this._loaderIteration = (this._loaderIteration + 1) % 10000;
        var currentIteration = this._loaderIteration;
        for (var _iterator = _createForOfIteratorHelperLoose(this._loaderFetchControllers), _step; !(_step = _iterator()).done;) {
          var controller = _step.value;
          controller.abort();
        }
        this._loaderFetchControllers = [];
        var _this$props = this.props,
          history = _this$props.history,
          children = _this$props.children;
        var loaderEntries = traverseLoaders(history.location.pathname, children);
        if (loaderEntries.length === 0) {
          this.setState({
            match: match
          });
          return;
        }
        // Store AbortController instances for each matched loader
        this._loaderFetchControllers = loaderEntries.map(function (e) {
          return e.controller;
        });
        resolveLoaders(loaderEntries).then(function (initialData) {
          // On multiple pending navigations, only update interface with last
          // in case they resolve out of order
          if (currentIteration === _this3._loaderIteration) {
            _this3.setState({
              initialData: initialData,
              match: match
            });
          }
        });
      };
      _proto.componentWillUnmount = function componentWillUnmount() {
        this.unlisten();
      };
      _proto.render = function render(props) {
        return props.children;
      };
      return Router;
    }(inferno.Component);
    {
      Router.prototype.componentWillReceiveProps = function (nextProps) {
        warning(this.props.history === nextProps.history, 'You cannot change <Router history>');
      };
    }

    var _excluded$4 = ["basename", "context", "location"];
    function _objectWithoutPropertiesLoose$4(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
    function _inheritsLoose$5(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf$5(subClass, superClass); }
    function _setPrototypeOf$5(o, p) { _setPrototypeOf$5 = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf$5(o, p); }
    function addLeadingSlash(path) {
      return path.charAt(0) === '/' ? path : '/' + path;
    }
    // tslint:disable-next-line:no-empty
    var noop = function noop() {};
    var StaticRouter = /*#__PURE__*/function (_Component) {
      _inheritsLoose$5(StaticRouter, _Component);
      function StaticRouter() {
        var _this;
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }
        _this = _Component.call.apply(_Component, [this].concat(args)) || this;
        _this.createHref = function (path) {
          return addLeadingSlash((_this.props.basename || '') + createURL(path));
        };
        _this.handlePush = function (location) {
          var _this$props = _this.props,
            basename = _this$props.basename,
            context = _this$props.context;
          context.action = 'PUSH';
          context.location = addBasename(basename, isString(location) ? history.parsePath(location) : location);
          context.url = createURL(context.location);
        };
        _this.handleReplace = function (location) {
          var _this$props2 = _this.props,
            basename = _this$props2.basename,
            context = _this$props2.context;
          context.action = 'REPLACE';
          context.location = addBasename(basename, isString(location) ? history.parsePath(location) : location);
          context.url = createURL(context.location);
        };
        // tslint:disable-next-line:no-empty
        _this.handleListen = function () {
          return noop;
        };
        // tslint:disable-next-line:no-empty
        _this.handleBlock = function () {
          return noop;
        };
        return _this;
      }
      var _proto = StaticRouter.prototype;
      _proto.getChildContext = function getChildContext() {
        return {
          router: {
            initialData: this.props.initialData,
            staticContext: this.props.context
          }
        };
      };
      _proto.render = function render(_ref) {
        var basename = _ref.basename;
          _ref.context;
          var location = _ref.location,
          props = _objectWithoutPropertiesLoose$4(_ref, _excluded$4);
        return inferno.createComponentVNode(4 /* VNodeFlags.ComponentClass */, Router, combineFrom(props, {
          history: {
            action: 'POP',
            block: this.handleBlock,
            createHref: this.createHref,
            go: staticHandler('go'),
            goBack: staticHandler('goBack'),
            goForward: staticHandler('goForward'),
            listen: this.handleListen,
            location: stripBasename(basename, createLocation(location)),
            push: this.handlePush,
            replace: this.handleReplace
          }
        }));
      };
      return StaticRouter;
    }(inferno.Component);
    StaticRouter.defaultProps = {
      basename: '',
      location: '/'
    };
    {
      StaticRouter.prototype.componentWillMount = function () {
        warning(!this.props.history, '<StaticRouter> ignores the history prop. To use a custom history, ' + 'use `import { Router }` instead of `import { StaticRouter as Router }`.');
      };
    }
    function normalizeLocation(_ref2) {
      var _ref2$pathname = _ref2.pathname,
        pathname = _ref2$pathname === void 0 ? '/' : _ref2$pathname,
        search = _ref2.search,
        hash = _ref2.hash;
      return {
        hash: (hash || '') === '#' ? '' : hash,
        pathname: pathname,
        search: (search || '') === '?' ? '' : search
      };
    }
    function addBasename(basename, location) {
      if (!basename) {
        return location;
      }
      return combineFrom(location, {
        pathname: addLeadingSlash(basename) + location.pathname
      });
    }
    function stripBasename(basename, location) {
      if (!basename) {
        return location;
      }
      var base = addLeadingSlash(basename);
      if (location.pathname.indexOf(base) !== 0) {
        return location;
      }
      return combineFrom(location, {
        pathname: location.pathname.substring(base.length)
      });
    }
    function createLocation(location) {
      return typeof location === 'string' ? history.parsePath(location) : normalizeLocation(location);
    }
    function createURL(location) {
      return typeof location === 'string' ? location : combinePath(location);
    }
    function staticHandler(methodName) {
      return function () {
        invariant(false, 'You cannot %s with <StaticRouter>', methodName);
      };
    }

    function _inheritsLoose$4(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf$4(subClass, superClass); }
    function _setPrototypeOf$4(o, p) { _setPrototypeOf$4 = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf$4(o, p); }
    var BrowserRouter = /*#__PURE__*/function (_Component) {
      _inheritsLoose$4(BrowserRouter, _Component);
      function BrowserRouter(props, context) {
        var _this;
        _this = _Component.call(this, props, context) || this;
        _this.history = void 0;
        _this.history = history.createBrowserHistory();
        return _this;
      }
      var _proto = BrowserRouter.prototype;
      _proto.render = function render() {
        return inferno.createComponentVNode(4 /* VNodeFlags.ComponentClass */, Router, {
          children: this.props.children,
          history: this.history,
          initialData: this.props.initialData
        });
      };
      return BrowserRouter;
    }(inferno.Component);
    {
      BrowserRouter.prototype.componentWillMount = function () {
        warning(!this.props.history, '<BrowserRouter> ignores the history prop. To use a custom history, ' + 'use `import { Router }` instead of `import { BrowserRouter as Router }`.');
      };
    }

    function _inheritsLoose$3(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf$3(subClass, superClass); }
    function _setPrototypeOf$3(o, p) { _setPrototypeOf$3 = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf$3(o, p); }
    var HashRouter = /*#__PURE__*/function (_Component) {
      _inheritsLoose$3(HashRouter, _Component);
      function HashRouter(props, context) {
        var _this;
        _this = _Component.call(this, props, context) || this;
        _this.history = void 0;
        _this.history = history.createHashHistory();
        return _this;
      }
      var _proto = HashRouter.prototype;
      _proto.render = function render() {
        return inferno.createComponentVNode(4 /* VNodeFlags.ComponentClass */, Router, {
          children: this.props.children,
          history: this.history
        });
      };
      return HashRouter;
    }(inferno.Component);
    {
      HashRouter.prototype.componentWillMount = function () {
        warning(!this.props.history, '<HashRouter> ignores the history prop. To use a custom history, ' + 'use `import { Router }` instead of `import { HashRouter as Router }`.');
      };
    }

    function _inheritsLoose$2(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf$2(subClass, superClass); }
    function _setPrototypeOf$2(o, p) { _setPrototypeOf$2 = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf$2(o, p); }
    var MemoryRouter = /*#__PURE__*/function (_Component) {
      _inheritsLoose$2(MemoryRouter, _Component);
      function MemoryRouter(props, context) {
        var _this;
        _this = _Component.call(this, props, context) || this;
        _this.history = void 0;
        _this.history = history.createMemoryHistory(props);
        return _this;
      }
      var _proto = MemoryRouter.prototype;
      _proto.render = function render() {
        return inferno.createComponentVNode(4 /* VNodeFlags.ComponentClass */, Router, {
          children: this.props.children,
          history: this.history,
          initialData: this.props.initialData
        });
      };
      return MemoryRouter;
    }(inferno.Component);
    {
      MemoryRouter.prototype.componentWillMount = function () {
        warning(!this.props.history, '<MemoryRouter> ignores the history prop. To use a custom history, ' + 'use `import { Router }` instead of `import { MemoryRouter as Router }`.');
      };
    }

    var _excluded$3 = ["key", "state"];
    function _objectWithoutPropertiesLoose$3(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
    var normalizeToLocation = function normalizeToLocation(to) {
      return isString(to) ? history.parsePath(to) : to;
    };
    var splitLocation = function splitLocation(location) {
      location.key;
        var state = location.state,
        to = _objectWithoutPropertiesLoose$3(location, _excluded$3);
      return {
        to: to,
        state: state
      };
    };

    var _excluded$2 = ["replace", "children", "className", "to", "innerRef"];
    function _objectWithoutPropertiesLoose$2(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
    var isModifiedEvent = function isModifiedEvent(event) {
      return Boolean(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
    };
    function handleClick(_ref, event) {
      var props = _ref.props,
        context = _ref.context;
      if (props.onClick) {
        props.onClick(event);
      }
      if (!event.defaultPrevented &&
      // onClick prevented default
      event.button === 0 &&
      // ignore everything but left clicks
      !props.target &&
      // let browser handle "target=_blank" etc.
      !isModifiedEvent(event) // ignore clicks with modifier keys
      ) {
        event.preventDefault();
        var history = context.router.history;
        var _props$replace = props.replace,
          replace = _props$replace === void 0 ? false : _props$replace,
          toPropIn = props.to;
        var _splitLocation = splitLocation(normalizeToLocation(toPropIn)),
          to = _splitLocation.to,
          state = _splitLocation.state;
        if (replace) {
          history.replace(to, state);
        } else {
          history.push(to, state);
        }
      }
    }
    /**
     * The public API for rendering a history-aware <a>.
     */
    function Link(props, context) {
      props.replace;
        var children = props.children,
        className = props.className,
        _props$to = props.to,
        to = _props$to === void 0 ? '' : _props$to,
        innerRef = props.innerRef,
        rest = _objectWithoutPropertiesLoose$2(props, _excluded$2);
      invariant(context.router, 'You should not use <Link> outside a <Router>');
      var href = context.router.history.createHref(isString(to) ? history.parsePath(to) : to);
      var newProps = combineFrom(rest, null);
      newProps.href = href;
      newProps.onClick = inferno.linkEvent({
        context: context,
        props: props
      }, handleClick);
      return inferno.createVNode(1 /* VNodeFlags.HtmlElement */, 'a', className, children, 0 /* ChildFlags.UnknownChildren */, newProps, null, innerRef);
    }

    var _excluded$1 = ["to", "exact", "strict", "onClick", "location", "activeClassName", "className", "activeStyle", "style", "isActive", "ariaCurrent"];
    function _objectWithoutPropertiesLoose$1(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
    function filter(i) {
      return i;
    }
    /**
     * A <Link> wrapper that knows if it's "active" or not.
     */
    function NavLink(_ref) {
      var to = _ref.to,
        exact = _ref.exact,
        strict = _ref.strict,
        onClick = _ref.onClick,
        linkLocation = _ref.location,
        _ref$activeClassName = _ref.activeClassName,
        activeClassName = _ref$activeClassName === void 0 ? 'active' : _ref$activeClassName,
        classNameProp = _ref.className,
        activeStyle = _ref.activeStyle,
        styleProp = _ref.style,
        getIsActive = _ref.isActive,
        _ref$ariaCurrent = _ref.ariaCurrent,
        ariaCurrent = _ref$ariaCurrent === void 0 ? 'true' : _ref$ariaCurrent,
        rest = _objectWithoutPropertiesLoose$1(_ref, _excluded$1);
      function linkComponent(_ref2) {
        var location = _ref2.location,
          match = _ref2.match;
        var isActive = Boolean(getIsActive ? getIsActive(match, location) : match);
        var className = typeof classNameProp === 'function' ? classNameProp(isActive) : classNameProp;
        var style = typeof styleProp === 'function' ? styleProp(isActive) : styleProp;
        return inferno.createComponentVNode(8 /* VNodeFlags.ComponentFunction */, Link, combineFrom({
          'aria-current': isActive && ariaCurrent || null,
          className: isActive ? [className, activeClassName].filter(filter).join(' ') : className,
          onClick: onClick,
          style: isActive ? combineFrom(style, activeStyle) : style,
          to: to
        }, rest));
      }
      return inferno.createComponentVNode(4 /* VNodeFlags.ComponentClass */, Route, {
        children: linkComponent,
        exact: exact,
        location: linkLocation,
        path: typeof to === 'object' ? to.pathname : to,
        strict: strict
      });
    }

    function _inheritsLoose$1(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf$1(subClass, superClass); }
    function _setPrototypeOf$1(o, p) { _setPrototypeOf$1 = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf$1(o, p); }
    /**
     * The public API for matching a single path and rendering.
     */
    var Prompt = /*#__PURE__*/function (_Component) {
      _inheritsLoose$1(Prompt, _Component);
      function Prompt() {
        var _this;
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }
        _this = _Component.call.apply(_Component, [this].concat(args)) || this;
        _this.unblock = void 0;
        return _this;
      }
      var _proto = Prompt.prototype;
      _proto.enable = function enable(message) {
        var _this2 = this;
        if (this.unblock) {
          this.unblock();
        }
        this.unblock = this.context.router.history.block(function (tx) {
          if (message && window.confirm(message)) {
            _this2.unblock();
            tx.retry();
          }
        });
      };
      _proto.disable = function disable() {
        if (this.unblock) {
          this.unblock();
          this.unblock = null;
        }
      };
      _proto.componentWillMount = function componentWillMount() {
        invariant(this.context.router, 'You should not use <Prompt> outside a <Router>');
        if (this.props.when) {
          this.enable(this.props.message);
        }
      };
      _proto.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
        if (nextProps.when) {
          if (!this.props.when || this.props.message !== nextProps.message) {
            this.enable(nextProps.message);
          }
        } else {
          this.disable();
        }
      };
      _proto.componentWillUnmount = function componentWillUnmount() {
        this.disable();
      };
      _proto.render = function render() {
        return null;
      };
      return Prompt;
    }(inferno.Component);

    function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
    function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
    function getLocationTarget(to) {
      if (!isString(to)) {
        to = combinePath(to);
      }
      return history.parsePath(to);
    }
    var Redirect = /*#__PURE__*/function (_Component) {
      _inheritsLoose(Redirect, _Component);
      function Redirect() {
        return _Component.apply(this, arguments) || this;
      }
      var _proto = Redirect.prototype;
      _proto.isStatic = function isStatic() {
        return this.context.router && this.context.router.staticContext;
      };
      _proto.componentWillMount = function componentWillMount() {
        invariant(this.context.router, 'You should not use <Redirect> outside a <Router>');
        if (this.isStatic()) {
          this.perform();
        }
      };
      _proto.componentDidMount = function componentDidMount() {
        if (!this.isStatic()) {
          this.perform();
        }
      };
      _proto.componentDidUpdate = function componentDidUpdate(prevProps) {
        var prevTo = getLocationTarget(prevProps.to);
        var nextTo = getLocationTarget(this.props.to);
        if (prevTo.pathname === nextTo.pathname && prevTo.search === nextTo.search) {
          // tslint:disable-next-line:no-console
          console.error("You tried to redirect to the same route you're currently on: \"" + nextTo.pathname + nextTo.search + "\"");
          return;
        }
        this.perform();
      };
      _proto.perform = function perform() {
        var history = this.context.router.history;
        var _this$props = this.props,
          _this$props$push = _this$props.push,
          push = _this$props$push === void 0 ? false : _this$props$push,
          to = _this$props.to;
        if (push) {
          history.push(to);
        } else {
          history.replace(to);
        }
      };
      _proto.render = function render() {
        return null;
      };
      return Redirect;
    }(inferno.Component);

    var _excluded = ["wrappedComponentRef"];
    function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
    /**
     * A public higher-order component to access the imperative API
     */
    function withRouter(Com) {
      var C = function C(props) {
        var wrappedComponentRef = props.wrappedComponentRef,
          remainingProps = _objectWithoutPropertiesLoose(props, _excluded);
        return inferno.createComponentVNode(4 /* VNodeFlags.ComponentClass */, Route, {
          render: function render(routeComponentProps) {
            return inferno.createComponentVNode(2 /* VNodeFlags.ComponentUnknown */, Com, combineFrom(remainingProps, routeComponentProps), null, wrappedComponentRef);
          }
        });
      };
      C.displayName = "withRouter(" + (Com.displayName || Com.name) + ")";
      C.WrappedComponent = Com;
      return hoistNonReactStatics(C, Com);
    }

    function useLoaderData(props) {
      var _props$__loaderData__;
      return (_props$__loaderData__ = props.__loaderData__) == null ? void 0 : _props$__loaderData__.res;
    }
    function useLoaderError(props) {
      var _props$__loaderData__2;
      return (_props$__loaderData__2 = props.__loaderData__) == null ? void 0 : _props$__loaderData__2.err;
    }

    exports.BrowserRouter = BrowserRouter;
    exports.HashRouter = HashRouter;
    exports.Link = Link;
    exports.MemoryRouter = MemoryRouter;
    exports.NavLink = NavLink;
    exports.Prompt = Prompt;
    exports.Redirect = Redirect;
    exports.Route = Route;
    exports.Router = Router;
    exports.StaticRouter = StaticRouter;
    exports.Switch = Switch;
    exports.createClientSideURL = createClientSideURL;
    exports.matchPath = matchPath;
    exports.resolveLoaders = resolveLoaders;
    exports.traverseLoaders = traverseLoaders;
    exports.useLoaderData = useLoaderData;
    exports.useLoaderError = useLoaderError;
    exports.withRouter = withRouter;

}));
