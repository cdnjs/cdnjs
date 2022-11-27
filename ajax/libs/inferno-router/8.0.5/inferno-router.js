(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('inferno'), require('history'), require('path-to-regexp-es6'), require('hoist-non-inferno-statics')) :
    typeof define === 'function' && define.amd ? define(['exports', 'inferno', 'history', 'path-to-regexp-es6', 'hoist-non-inferno-statics'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.Inferno = global.Inferno || {}, global.Inferno.Router = global.Inferno.Router || {}), global.Inferno, global.history, global.pathToRegexp, global.hoistNonReactStatics));
})(this, (function (exports, inferno, history, pathToRegexp, hoistNonReactStatics) { 'use strict';

    var isArray = Array.isArray;
    function isInvalid(o) {
      return o === null || o === false || o === true || o === void 0;
    }
    function isFunction(o) {
      return typeof o === 'function';
    }
    function isString(o) {
      return typeof o === 'string';
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

    function _inheritsLoose$8(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf$8(subClass, superClass); }
    function _setPrototypeOf$8(o, p) { _setPrototypeOf$8 = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf$8(o, p); }
    /**
     * The public API for putting history on context.
     */
    var Router = /*#__PURE__*/function (_Component) {
      _inheritsLoose$8(Router, _Component);
      function Router(props, context) {
        var _this;
        _this = _Component.call(this, props, context) || this;
        _this.unlisten = void 0;
        _this.state = {
          match: _this.computeMatch(props.history.location.pathname)
        };
        return _this;
      }
      var _proto = Router.prototype;
      _proto.getChildContext = function getChildContext() {
        var _this$state;
        var childContext = combineFrom(this.context.router, null);
        childContext.history = this.props.history;
        childContext.route = {
          location: childContext.history.location,
          match: (_this$state = this.state) == null ? void 0 : _this$state.match
        };
        return {
          router: childContext
        };
      };
      _proto.computeMatch = function computeMatch(pathname) {
        return {
          isExact: pathname === '/',
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
          _this2.setState({
            match: _this2.computeMatch(history.location.pathname)
          });
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
    function _inheritsLoose$7(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf$7(subClass, superClass); }
    function _setPrototypeOf$7(o, p) { _setPrototypeOf$7 = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf$7(o, p); }
    function addLeadingSlash(path) {
      return path.charAt(0) === '/' ? path : '/' + path;
    }
    // tslint:disable-next-line:no-empty
    var noop = function noop() {};
    var StaticRouter = /*#__PURE__*/function (_Component) {
      _inheritsLoose$7(StaticRouter, _Component);
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
        _this.handleListen = function () {
          return noop;
        };
        _this.handleBlock = function () {
          return noop;
        };
        return _this;
      }
      var _proto = StaticRouter.prototype;
      _proto.getChildContext = function getChildContext() {
        return {
          router: {
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
        pathname: location.pathname.substr(base.length)
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

    function _inheritsLoose$6(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf$6(subClass, superClass); }
    function _setPrototypeOf$6(o, p) { _setPrototypeOf$6 = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf$6(o, p); }
    var BrowserRouter = /*#__PURE__*/function (_Component) {
      _inheritsLoose$6(BrowserRouter, _Component);
      function BrowserRouter(props, context) {
        var _this;
        _this = _Component.call(this, props, context) || this;
        _this.history = void 0;
        _this.history = history.createBrowserHistory(props);
        return _this;
      }
      var _proto = BrowserRouter.prototype;
      _proto.render = function render() {
        return inferno.createComponentVNode(4 /* VNodeFlags.ComponentClass */, Router, {
          children: this.props.children,
          history: this.history
        });
      };
      return BrowserRouter;
    }(inferno.Component);
    {
      BrowserRouter.prototype.componentWillMount = function () {
        warning(!this.props.history, '<BrowserRouter> ignores the history prop. To use a custom history, ' + 'use `import { Router }` instead of `import { BrowserRouter as Router }`.');
      };
    }

    function _inheritsLoose$5(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf$5(subClass, superClass); }
    function _setPrototypeOf$5(o, p) { _setPrototypeOf$5 = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf$5(o, p); }
    var HashRouter = /*#__PURE__*/function (_Component) {
      _inheritsLoose$5(HashRouter, _Component);
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

    function _inheritsLoose$4(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf$4(subClass, superClass); }
    function _setPrototypeOf$4(o, p) { _setPrototypeOf$4 = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf$4(o, p); }
    var MemoryRouter = /*#__PURE__*/function (_Component) {
      _inheritsLoose$4(MemoryRouter, _Component);
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
          history: this.history
        });
      };
      return MemoryRouter;
    }(inferno.Component);
    {
      MemoryRouter.prototype.componentWillMount = function () {
        warning(!this.props.history, '<MemoryRouter> ignores the history prop. To use a custom history, ' + 'use `import { Router }` instead of `import { MemoryRouter as Router }`.');
      };
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
        sensitive = _options$sensitive === void 0 ? false : _options$sensitive;
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
      var url = match[0],
        values = match.slice(1);
      var isExact = pathname === url;
      if (exact && !isExact) {
        return null;
      }
      return {
        isExact: isExact,
        params: keys.reduce(function (memo, key, index) {
          memo[key.name] = values[index];
          return memo;
        }, {}),
        path: path,
        url: path === '/' && url === '' ? '/' : url // the matched portion of the URL
      };
    }

    function _inheritsLoose$3(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf$3(subClass, superClass); }
    function _setPrototypeOf$3(o, p) { _setPrototypeOf$3 = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf$3(o, p); }
    var Route = /*#__PURE__*/function (_Component) {
      _inheritsLoose$3(Route, _Component);
      var _proto = Route.prototype;
      _proto.getChildContext = function getChildContext() {
        var childContext = combineFrom(this.context.router, null);
        childContext.route = {
          location: this.props.location || this.context.router.route.location,
          match: this.state.match
        };
        return {
          router: childContext
        };
      };
      function Route(props, context) {
        var _this;
        _this = _Component.call(this, props, context) || this;
        _this.state = {
          match: _this.computeMatch(props, context.router)
        };
        return _this;
      }
      _proto.computeMatch = function computeMatch(_ref, router) {
        var computedMatch = _ref.computedMatch,
          location = _ref.location,
          path = _ref.path,
          strict = _ref.strict,
          exact = _ref.exact,
          sensitive = _ref.sensitive;
        if (computedMatch) {
          // <Switch> already computed the match for us
          return computedMatch;
        }
        {
          invariant(router, 'You should not use <Route> or withRouter() outside a <Router>');
        }
        var route = router.route;
        var pathname = (location || route.location).pathname;
        return path ? matchPath(pathname, {
          path: path,
          strict: strict,
          exact: exact,
          sensitive: sensitive
        }) : route.match;
      };
      _proto.componentWillReceiveProps = function componentWillReceiveProps(nextProps, nextContext) {
        {
          warning(!(nextProps.location && !this.props.location), '<Route> elements should not change from uncontrolled to controlled (or vice versa). You initially used no "location" prop and then provided one on a subsequent render.');
          warning(!(!nextProps.location && this.props.location), '<Route> elements should not change from controlled to uncontrolled (or vice versa). You provided a "location" prop initially but omitted it on a subsequent render.');
        }
        this.setState({
          match: this.computeMatch(nextProps, nextContext.router)
        });
      };
      _proto.render = function render() {
        var match = this.state.match;
        var _this$props = this.props,
          children = _this$props.children,
          component = _this$props.component,
          render = _this$props.render;
        var _this$context$router = this.context.router,
          history = _this$context$router.history,
          route = _this$context$router.route,
          staticContext = _this$context$router.staticContext;
        var location = this.props.location || route.location;
        var props = {
          match: match,
          location: location,
          history: history,
          staticContext: staticContext
        };
        if (component) {
          {
            if (!isFunction(component)) {
              throw new Error("Inferno error: <Route /> - 'component' property must be prototype of class or functional component, not vNode.");
            }
          }
          return match ? inferno.createComponentVNode(2 /* VNodeFlags.ComponentUnknown */, component, props) : null;
        }
        if (render) {
          // @ts-ignore
          return match ? render(props, this.context) : null;
        }
        if (typeof children === 'function') {
          return children(props);
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

    function _inheritsLoose$2(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf$2(subClass, superClass); }
    function _setPrototypeOf$2(o, p) { _setPrototypeOf$2 = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf$2(o, p); }
    function getMatch(_ref, route, location) {
      var path = _ref.path,
        exact = _ref.exact,
        strict = _ref.strict,
        sensitive = _ref.sensitive,
        from = _ref.from;
      var pathProp = path || from;
      return pathProp ? matchPath(location.pathname, {
        path: pathProp,
        exact: exact,
        strict: strict,
        sensitive: sensitive
      }) : route.match;
    }
    function extractMatchFromChildren(children, route, location) {
      var match;
      var _child;
      if (isArray(children)) {
        for (var i = 0; i < children.length; ++i) {
          _child = children[i];
          if (isArray(_child)) {
            var nestedMatch = extractMatchFromChildren(_child, route, location);
            match = nestedMatch.match;
            _child = nestedMatch._child;
          } else {
            match = getMatch(_child.props, route, location);
          }
          if (match) {
            break;
          }
        }
      } else {
        match = getMatch(children.props, route, location);
        _child = children;
      }
      return {
        match: match,
        _child: _child
      };
    }
    var Switch = /*#__PURE__*/function (_Component) {
      _inheritsLoose$2(Switch, _Component);
      function Switch() {
        return _Component.apply(this, arguments) || this;
      }
      var _proto = Switch.prototype;
      _proto.render = function render() {
        var route = this.context.router.route;
        var children = this.props.children;
        var location = this.props.location || route.location;
        if (isInvalid(children)) {
          return null;
        }
        var _extractMatchFromChil = extractMatchFromChildren(children, route, location),
          match = _extractMatchFromChil.match,
          _child = _extractMatchFromChil._child;
        if (match) {
          return inferno.createComponentVNode(_child.flags, _child.type, combineFrom(_child.props, {
            location: location,
            computedMatch: match
          }));
        }
        return null;
      };
      return Switch;
    }(inferno.Component);
    {
      Switch.prototype.componentWillMount = function () {
        invariant(this.context.router, 'You should not use <Switch> outside a <Router>');
      };
      Switch.prototype.componentWillReceiveProps = function (nextProps) {
        warning(!(nextProps.location && !this.props.location), '<Switch> elements should not change from uncontrolled to controlled (or vice versa). You initially used no "location" prop and then provided one on a subsequent render.');
        warning(!(!nextProps.location && this.props.location), '<Switch> elements should not change from controlled to uncontrolled (or vice versa). You provided a "location" prop initially but omitted it on a subsequent render.');
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
        if (this.unblock) {
          this.unblock();
        }
        this.unblock = this.context.router.history.block(message);
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
    exports.matchPath = matchPath;
    exports.withRouter = withRouter;

}));
