(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('inferno'), require('history'), require('path-to-regexp-es6'), require('hoist-non-inferno-statics')) :
    typeof define === 'function' && define.amd ? define(['exports', 'inferno', 'history', 'path-to-regexp-es6', 'hoist-non-inferno-statics'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.Inferno = global.Inferno || {}, global.Inferno.Router = global.Inferno.Router || {}), global.Inferno, global.history, global.pathToRegexp, global.hoistNonReactStatics));
})(this, (function (exports, inferno, history, pathToRegexp, hoistNonReactStatics) { 'use strict';

    var isArray = Array.isArray;
    function isNullOrUndef(o) {
      return isUndefined(o) || isNull(o);
    }
    function isNull(o) {
      return o === null;
    }
    function isUndefined(o) {
      return o === void 0;
    }
    function isObject(o) {
      return typeof o === 'object';
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
    function isValidElement(obj) {
      var isNotANullObject = isObject(obj) && isNull(obj) === false;
      if (!isNotANullObject) {
        return false;
      }
      var flags = obj.flags;
      return (flags & (14 /* VNodeFlags.Component */ | 481 /* VNodeFlags.Element */)) > 0;
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
    var ARR = [];
    var Children = {
      forEach: function forEach(children, fn) {
        if (isNullOrUndef(children)) {
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
          throw new Error('Children.only() expects only one child.');
        }
        return children[0];
      },
      toArray: function toArray(children) {
        return isNullOrUndef(children) ? [] : isArray(children) ? children : ARR.concat(children);
      }
    };

    function _inheritsLoose$8(t, o) { t.prototype = Object.create(o.prototype), t.prototype.constructor = t, _setPrototypeOf$8(t, o); }
    function _setPrototypeOf$8(t, e) { return _setPrototypeOf$8 = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf$8(t, e); }
    /**
     * The public API for putting history on context.
     */
    var Router = /*#__PURE__*/function (_Component) {
      function Router(props, context) {
        var _this;
        _this = _Component.call(this, props, context) || this;
        _this.unlisten = void 0;
        _this.state = {
          match: _this.computeMatch(props.history.location.pathname)
        };
        return _this;
      }
      _inheritsLoose$8(Router, _Component);
      var _proto = Router.prototype;
      _proto.getChildContext = function getChildContext() {
        var childContext = combineFrom(this.context.router);
        childContext.history = this.props.history;
        childContext.route = {
          location: childContext.history.location,
          match: this.state.match
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
        var _this$props = this.props,
          children = _this$props.children,
          history = _this$props.history;
        invariant(children == null || Children.count(children) === 1, 'A <Router> may have only one child element');
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

    var _excluded$3 = ["basename", "context", "location"];
    function _objectWithoutPropertiesLoose$3(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (e.includes(n)) continue; t[n] = r[n]; } return t; }
    function _inheritsLoose$7(t, o) { t.prototype = Object.create(o.prototype), t.prototype.constructor = t, _setPrototypeOf$7(t, o); }
    function _setPrototypeOf$7(t, e) { return _setPrototypeOf$7 = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf$7(t, e); }
    function addLeadingSlash(path) {
      return path.charAt(0) === '/' ? path : '/' + path;
    }
    // tslint:disable-next-line:no-empty
    var noop = function noop() {};
    var StaticRouter = /*#__PURE__*/function (_Component) {
      function StaticRouter() {
        var _this;
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }
        _this = _Component.call.apply(_Component, [this].concat(args)) || this;
        _this.createHref = function (path) {
          return addLeadingSlash(_this.props.basename + createURL(path));
        };
        _this.handlePush = function (location) {
          var _this$props = _this.props,
            basename = _this$props.basename,
            context = _this$props.context;
          context.action = 'PUSH';
          context.location = addBasename(basename, createLocation(location));
          context.url = createURL(context.location);
        };
        _this.handleReplace = function (location) {
          var _this$props2 = _this.props,
            basename = _this$props2.basename,
            context = _this$props2.context;
          context.action = 'REPLACE';
          context.location = addBasename(basename, createLocation(location));
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
      _inheritsLoose$7(StaticRouter, _Component);
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
          props = _objectWithoutPropertiesLoose$3(_ref, _excluded$3);
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
      return typeof location === 'string' ? location : history.createPath(location);
    }
    function staticHandler(methodName) {
      return function () {
        invariant(false, 'You cannot %s with <StaticRouter>', methodName);
      };
    }

    function _inheritsLoose$6(t, o) { t.prototype = Object.create(o.prototype), t.prototype.constructor = t, _setPrototypeOf$6(t, o); }
    function _setPrototypeOf$6(t, e) { return _setPrototypeOf$6 = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf$6(t, e); }
    var BrowserRouter = /*#__PURE__*/function (_Component) {
      function BrowserRouter(props, context) {
        var _this;
        _this = _Component.call(this, props, context) || this;
        _this.history = void 0;
        _this.history = history.createBrowserHistory(props);
        return _this;
      }
      _inheritsLoose$6(BrowserRouter, _Component);
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

    function _inheritsLoose$5(t, o) { t.prototype = Object.create(o.prototype), t.prototype.constructor = t, _setPrototypeOf$5(t, o); }
    function _setPrototypeOf$5(t, e) { return _setPrototypeOf$5 = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf$5(t, e); }
    var HashRouter = /*#__PURE__*/function (_Component) {
      function HashRouter(props, context) {
        var _this;
        _this = _Component.call(this, props, context) || this;
        _this.history = void 0;
        _this.history = history.createHashHistory(props);
        return _this;
      }
      _inheritsLoose$5(HashRouter, _Component);
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

    function _inheritsLoose$4(t, o) { t.prototype = Object.create(o.prototype), t.prototype.constructor = t, _setPrototypeOf$4(t, o); }
    function _setPrototypeOf$4(t, e) { return _setPrototypeOf$4 = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf$4(t, e); }
    var MemoryRouter = /*#__PURE__*/function (_Component) {
      function MemoryRouter(props, context) {
        var _this;
        _this = _Component.call(this, props, context) || this;
        _this.history = void 0;
        _this.history = history.createMemoryHistory(props);
        return _this;
      }
      _inheritsLoose$4(MemoryRouter, _Component);
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
        // whether or not we matched exactly
        params: keys.reduce(function (memo, key, index) {
          memo[key.name] = values[index];
          return memo;
        }, {}),
        path: path,
        // the path pattern used to match
        url: path === '/' && url === '' ? '/' : url // the matched portion of the URL
      };
    }

    function _inheritsLoose$3(t, o) { t.prototype = Object.create(o.prototype), t.prototype.constructor = t, _setPrototypeOf$3(t, o); }
    function _setPrototypeOf$3(t, e) { return _setPrototypeOf$3 = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf$3(t, e); }
    var isEmptyChildren = function isEmptyChildren(children) {
      return Children.count(children) === 0;
    };
    /**
     * The public API for matching a single path and rendering.
     */
    var Route = /*#__PURE__*/function (_Component) {
      function Route(props, context) {
        var _this;
        _this = _Component.call(this, props, context) || this;
        _this.state = {
          match: _this.computeMatch(props, context.router)
        };
        return _this;
      }
      _inheritsLoose$3(Route, _Component);
      var _proto = Route.prototype;
      _proto.getChildContext = function getChildContext() {
        var childContext = combineFrom(this.context.router);
        childContext.route = {
          location: this.props.location || this.context.router.route.location,
          match: this.state.match
        };
        return {
          router: childContext
        };
      };
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
        invariant(router, 'You should not use <Route> or withRouter() outside a <Router>');
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
          return match ? inferno.createComponentVNode(2 /* VNodeFlags.ComponentUnknown */, component, props) : null;
        }
        if (render) {
          return match ? render(props, this.context) : null;
        }
        if (typeof children === 'function') {
          return children(props);
        }
        if (children && !isEmptyChildren(children)) {
          return Children.only(children);
        }
        return null;
      };
      return Route;
    }(inferno.Component);
    {
      Route.prototype.componentWillMount = function () {
        warning(!(this.props.component && this.props.render), 'You should not use <Route component> and <Route render> in the same route; <Route render> will be ignored');
        warning(!(this.props.component && this.props.children && !isEmptyChildren(this.props.children)), 'You should not use <Route component> and <Route children> in the same route; <Route children> will be ignored');
        warning(!(this.props.render && this.props.children && !isEmptyChildren(this.props.children)), 'You should not use <Route render> and <Route children> in the same route; <Route children> will be ignored');
      };
    }

    function _inheritsLoose$2(t, o) { t.prototype = Object.create(o.prototype), t.prototype.constructor = t, _setPrototypeOf$2(t, o); }
    function _setPrototypeOf$2(t, e) { return _setPrototypeOf$2 = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf$2(t, e); }
    /**
     * The public API for rendering the first <Route> that matches.
     */
    var Switch = /*#__PURE__*/function (_Component) {
      function Switch() {
        return _Component.apply(this, arguments) || this;
      }
      _inheritsLoose$2(Switch, _Component);
      var _proto = Switch.prototype;
      _proto.componentWillMount = function componentWillMount() {
        invariant(this.context.router, 'You should not use <Switch> outside a <Router>');
      };
      _proto.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
        warning(!(nextProps.location && !this.props.location), '<Switch> elements should not change from uncontrolled to controlled (or vice versa). You initially used no "location" prop and then provided one on a subsequent render.');
        warning(!(!nextProps.location && this.props.location), '<Switch> elements should not change from controlled to uncontrolled (or vice versa). You provided a "location" prop initially but omitted it on a subsequent render.');
      };
      _proto.render = function render() {
        var route = this.context.router.route;
        var children = this.props.children;
        var location = this.props.location || route.location;
        var match;
        var child;
        // optimization: Better to use for loop here so we can return when match found, instead looping through everything
        Children.forEach(children, function (element) {
          if (!isValidElement(element)) {
            return;
          }
          var _element$props = element.props,
            pathProp = _element$props.path,
            exact = _element$props.exact,
            strict = _element$props.strict,
            sensitive = _element$props.sensitive,
            from = _element$props.from;
          var path = pathProp || from;
          if (match == null) {
            child = element;
            match = path ? matchPath(location.pathname, {
              path: path,
              exact: exact,
              strict: strict,
              sensitive: sensitive
            }) : route.match;
          }
        });
        return match ? inferno.createComponentVNode(child.flags, child.type, combineFrom(child.props, {
          location: location,
          computedMatch: match
        }), null, child.ref) : null;
      };
      return Switch;
    }(inferno.Component);

    var _excluded$2 = ["replace", "children", "className", "to", "innerRef"];
    function _objectWithoutPropertiesLoose$2(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (e.includes(n)) continue; t[n] = r[n]; } return t; }
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
          to = props.to;
        if (replace) {
          history.replace(to);
        } else {
          history.push(to);
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
      var href = context.router.history.createHref(typeof to === 'string' ? {
        pathname: to
      } : to);
      var newProps = combineFrom(rest);
      newProps.href = href;
      newProps.onClick = inferno.linkEvent({
        context: context,
        props: props
      }, handleClick);
      return inferno.createVNode(1 /* VNodeFlags.HtmlElement */, 'a', className, children, 0 /* ChildFlags.UnknownChildren */, newProps, null, innerRef);
    }

    var _excluded$1 = ["to", "exact", "strict", "onClick", "location", "activeClassName", "className", "activeStyle", "style", "isActive", "ariaCurrent"];
    function _objectWithoutPropertiesLoose$1(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (e.includes(n)) continue; t[n] = r[n]; } return t; }
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
        className = _ref.className,
        activeStyle = _ref.activeStyle,
        style = _ref.style,
        getIsActive = _ref.isActive,
        _ref$ariaCurrent = _ref.ariaCurrent,
        ariaCurrent = _ref$ariaCurrent === void 0 ? 'true' : _ref$ariaCurrent,
        rest = _objectWithoutPropertiesLoose$1(_ref, _excluded$1);
      function linkComponent(_ref2) {
        var location = _ref2.location,
          match = _ref2.match;
        var isActive = !!(getIsActive ? getIsActive(match, location) : match);
        return inferno.createComponentVNode(8 /* VNodeFlags.ComponentFunction */, Link, combineFrom({
          'aria-current': isActive && ariaCurrent,
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

    function _inheritsLoose$1(t, o) { t.prototype = Object.create(o.prototype), t.prototype.constructor = t, _setPrototypeOf$1(t, o); }
    function _setPrototypeOf$1(t, e) { return _setPrototypeOf$1 = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf$1(t, e); }
    /**
     * The public API for matching a single path and rendering.
     */
    var Prompt = /*#__PURE__*/function (_Component) {
      function Prompt() {
        var _this;
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }
        _this = _Component.call.apply(_Component, [this].concat(args)) || this;
        _this.unblock = void 0;
        return _this;
      }
      _inheritsLoose$1(Prompt, _Component);
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

    function _inheritsLoose(t, o) { t.prototype = Object.create(o.prototype), t.prototype.constructor = t, _setPrototypeOf(t, o); }
    function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
    var Redirect = /*#__PURE__*/function (_Component) {
      function Redirect() {
        return _Component.apply(this, arguments) || this;
      }
      _inheritsLoose(Redirect, _Component);
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
        var prevTo = history.createLocation(prevProps.to);
        var nextTo = history.createLocation(this.props.to);
        if (history.locationsAreEqual(prevTo, nextTo)) {
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
    function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (e.includes(n)) continue; t[n] = r[n]; } return t; }
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
