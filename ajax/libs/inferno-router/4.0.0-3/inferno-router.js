(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('inferno'), require('history'), require('path-to-regexp-es6'), require('hoist-non-inferno-statics')) :
  typeof define === 'function' && define.amd ? define(['exports', 'inferno', 'history', 'path-to-regexp-es6', 'hoist-non-inferno-statics'], factory) :
  (factory((global.Inferno = global.Inferno || {}, global.Inferno.Router = global.Inferno.Router || {}),global.Inferno,global.history,global.pathToRegexp,global.hoistNonReactStatics));
}(this, (function (exports,inferno,history,pathToRegexp,hoistNonReactStatics) { 'use strict';

  pathToRegexp = pathToRegexp && pathToRegexp.hasOwnProperty('default') ? pathToRegexp['default'] : pathToRegexp;
  hoistNonReactStatics = hoistNonReactStatics && hoistNonReactStatics.hasOwnProperty('default') ? hoistNonReactStatics['default'] : hoistNonReactStatics;

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

  var addLeadingSlash = function addLeadingSlash(path) {
    return path.charAt(0) === '/' ? path : '/' + path;
  };

  /**
   * @module Inferno-Shared
   */ /** TypeDoc Comment */
  // This should be boolean and not reference to window.document
  var isBrowser = !!(typeof window !== "undefined" && window.document);
  // this is MUCH faster than .constructor === Array and instanceof Array
  // in Node 7 and the later versions of V8, slower in older versions though
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
      return typeof o === "object";
  }
  function combineFrom(first, second) {
      var out = {};
      if (first) {
          for (var key in first) {
              out[key] = first[key];
          }
      }
      if (second) {
          for (var key$1 in second) {
              out[key$1] = second[key$1];
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
              error = new Error(format.replace(/%s/g, function () {
                  return args[argIndex++];
              }));
              error.name = "Invariant Violation";
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
              throw new Error("Children.only() expects only one child.");
          }
          return children[0];
      },
      toArray: function toArray$$1(children) {
          return isNullOrUndef(children)
              ? []
              : isArray(children) ? children : ARR.concat(children);
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
          var history$$1 = ref.history;
          invariant(children == null || Children.count(children) === 1, "A <Router> may have only one child element");
          // Do this here so we can setState when a <Redirect> changes the
          // location in componentWillMount. This happens e.g. when doing
          // server rendering using a <StaticRouter>.
          this.unlisten = history$$1.listen(function () {
              this$1.setState({
                  match: this$1.computeMatch(history$$1.location.pathname)
              });
          });
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
          this.createHref = function (path) { return addLeadingSlash(this$1.props.basename + createURL(path)); };
          this.handlePush = function (location) {
              var ref = this$1.props;
              var basename = ref.basename;
              var context = ref.context;
              context.action = "PUSH";
              context.location = addBasename(basename, createLocation$1(location));
              context.url = createURL(context.location);
          };
          this.handleReplace = function (location) {
              var ref = this$1.props;
              var basename = ref.basename;
              var context = ref.context;
              context.action = "REPLACE";
              context.location = addBasename(basename, createLocation$1(location));
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
          var history$$1 = {
              action: "POP",
              block: this.handleBlock,
              createHref: this.createHref,
              go: staticHandler("go"),
              goBack: staticHandler("goBack"),
              goForward: staticHandler("goForward"),
              listen: this.handleListen,
              location: stripBasename(basename, createLocation$1(location)),
              push: this.handlePush,
              replace: this.handleReplace
          };
          return inferno.createVNode(4 /* ComponentClass */, Router, null, null, Object.assign({}, props, { history: history$$1 }));
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
      return Object.assign({}, location, { pathname: addLeadingSlash(basename) + location.pathname });
  }
  function stripBasename(basename, location) {
      if (!basename) {
          return location;
      }
      var base = addLeadingSlash(basename);
      if (location.pathname.indexOf(base) !== 0) {
          return location;
      }
      return Object.assign({}, location, { pathname: location.pathname.substr(base.length) });
  }
  function createLocation$1(location) {
      return typeof location === "string"
          ? history.parsePath(location)
          : normalizeLocation(location);
  }
  function createURL(location) {
      return typeof location === "string" ? location : history.createPath(location);
  }
  function staticHandler(methodName) {
      return function () {
          invariant(false, "You cannot %s with <StaticRouter>", methodName);
      };
  }

  /**
   * @module Inferno-Router
   */ /** TypeDoc Comment */
  var BrowserRouter = (function (Component$$1) {
      function BrowserRouter(props, context) {
          Component$$1.call(this, props, context);
          this.history = history.createBrowserHistory(props);
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

  /**
   * @module Inferno-Router
   */ /** TypeDoc Comment */
  var HashRouter = (function (Component$$1) {
      function HashRouter(props, context) {
          Component$$1.call(this, props, context);
          this.history = history.createHashHistory(props);
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
      var re = pathToRegexp(pattern, keys, options);
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
          params: keys.reduce(function (memo, key, index) {
              memo[key.name] = values[index];
              return memo;
          }, {}),
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
          var history$$1 = ref$2.history;
          var route = ref$2.route;
          var staticContext = ref$2.staticContext;
          var location = this.props.location || route.location;
          var props = { match: match, location: location, history: history$$1, staticContext: staticContext };
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
  var isModifiedEvent = function (event) { return Boolean(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey); };
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
                  var history$$1 = ref.history;
                  var ref$1 = this$1.props;
                  var replace = ref$1.replace; if ( replace === void 0 ) replace = false;
                  var to = ref$1.to;
                  if (replace) {
                      history$$1.replace(to);
                  }
                  else {
                      history$$1.push(to);
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
  function NavLink(_a) {
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
                  ? [className, activeClassName].filter(function (i) { return i; }).join(" ")
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
  }

  /**
   * @module Inferno-Router
   */ /** TypeDoc Comment */
  /**
   * @deprecated
   */
  function IndexLink(props) {
      {
          // tslint:disable-next-line:no-console
          console.error("Using IndexLink is deprecated. Please use Link or NavLink instead.");
      }
      return inferno.createVNode(8 /* ComponentFunction */, NavLink, null, null, props);
  }

  /**
   * @module Inferno-Router
   */ /** TypeDoc Comment */
  /**
   * @deprecated
   */
  function IndexRoute(props) {
      {
          // tslint:disable-next-line:no-console
          console.error("Using IndexRoute is deprecated. Please use Route instead.");
      }
      return inferno.createVNode(4 /* ComponentClass */, Route, null, null, props);
  }

  /**
   * @module Inferno-Router
   */ /** TypeDoc Comment */
  var MemoryRouter = (function (Component$$1) {
      function MemoryRouter(props, context) {
          Component$$1.call(this, props, context);
          this.history = history.createMemoryHistory(props);
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
          Children.forEach(children, function (element) {
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
          });
          return match
              ? inferno.createVNode(child.flags, child.type, null, null, combineFrom(child.props, { location: location, computedMatch: match }), null, child.ref)
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
          var prevTo = history.createLocation(prevProps.to);
          var nextTo = history.createLocation(this.props.to);
          if (history.locationsAreEqual(prevTo, nextTo)) {
              // tslint:disable-next-line:no-console
              console.error(("You tried to redirect to the same route you're currently on: \"" + (nextTo.pathname) + (nextTo.search) + "\""));
              return;
          }
          this.perform();
      };
      Redirect.prototype.perform = function perform () {
          var ref = this.context.router;
          var history$$1 = ref.history;
          var ref$1 = this.props;
          var push = ref$1.push; if ( push === void 0 ) push = false;
          var to = ref$1.to;
          if (push) {
              history$$1.push(to);
          }
          else {
              history$$1.replace(to);
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
      return hoistNonReactStatics(C, Com);
  }

  /**
   * @module Inferno-Router
   */ /** TypeDoc Comment */

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

  Object.defineProperty(exports, '__esModule', { value: true });

})));
