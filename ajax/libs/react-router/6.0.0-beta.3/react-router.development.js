(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('react'), require('history')) :
  typeof define === 'function' && define.amd ? define(['exports', 'react', 'history'], factory) :
  (global = global || self, factory(global.ReactRouter = {}, global.React, global.HistoryLibrary));
}(this, (function (exports, React, history) { 'use strict';

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

  var readOnly =  function (obj) {
    return Object.freeze(obj);
  } ;

  function invariant(cond, message) {
    if (!cond) throw new Error(message);
  }

  function warning(cond, message) {
    if (!cond) {
      // eslint-disable-next-line no-console
      if (typeof console !== "undefined") console.warn(message);

      try {
        // Welcome to debugging React Router!
        //
        // This error is thrown as a convenience so you can more easily
        // find the source for a warning that appears in the console by
        // enabling "pause on exceptions" in your JavaScript debugger.
        throw new Error(message); // eslint-disable-next-line no-empty
      } catch (e) {}
    }
  }

  var alreadyWarned = {};

  function warningOnce(key, cond, message) {
    if (!cond && !alreadyWarned[key]) {
      alreadyWarned[key] = true;
       warning(false, message) ;
    }
  }

  var NavigatorContext = /*#__PURE__*/React.createContext(null);
  var LocationContext = /*#__PURE__*/React.createContext({
    static: false
  });

  {
    LocationContext.displayName = "Location";
  }

  var RouteContext = /*#__PURE__*/React.createContext({
    outlet: null,
    params: readOnly({}),
    pathname: "",
    basename: "",
    route: null
  });

  {
    RouteContext.displayName = "Route";
  }
  /**
   * A <Router> that stores all entries in memory.
   *
   * @see https://reactrouter.com/api/MemoryRouter
   */


  function MemoryRouter(_ref) {
    var children = _ref.children,
        initialEntries = _ref.initialEntries,
        initialIndex = _ref.initialIndex;
    var historyRef = React.useRef();

    if (historyRef.current == null) {
      historyRef.current = history.createMemoryHistory({
        initialEntries: initialEntries,
        initialIndex: initialIndex
      });
    }

    var history$1 = historyRef.current;

    var _React$useState = React.useState({
      action: history$1.action,
      location: history$1.location
    }),
        state = _React$useState[0],
        setState = _React$useState[1];

    React.useLayoutEffect(function () {
      return history$1.listen(setState);
    }, [history$1]);
    return /*#__PURE__*/React.createElement(Router, {
      children: children,
      action: state.action,
      location: state.location,
      navigator: history$1
    });
  }
  /**
   * Changes the current location.
   *
   * Note: This API is mostly useful in React.Component subclasses that are not
   * able to use hooks. In functional components, we recommend you use the
   * `useNavigate` hook instead.
   *
   * @see https://reactrouter.com/api/Navigate
   */

  function Navigate(_ref2) {
    var to = _ref2.to,
        replace = _ref2.replace,
        state = _ref2.state;
    !useInRouterContext() ?  invariant(false, // TODO: This error is probably because they somehow have 2 versions of
    // the router loaded. We can help them understand how to avoid that.
    "<Navigate> may be used only in the context of a <Router> component.")  : void 0;
     warning(!React.useContext(LocationContext).static, "<Navigate> must not be used on the initial render in a <StaticRouter>. " + "This is a no-op, but you should modify your code so the <Navigate> is " + "only ever rendered in response to some user interaction or state change.") ;
    var navigate = useNavigate();
    React.useEffect(function () {
      navigate(to, {
        replace: replace,
        state: state
      });
    });
    return null;
  }
  /**
   * Renders the child route's element, if there is one.
   *
   * @see https://reactrouter.com/api/Outlet
   */

  function Outlet(_props) {
    return useOutlet();
  }
  /**
   * Declares an element that should be rendered at a certain URL path.
   *
   * @see https://reactrouter.com/api/Route
   */

  function Route(_ref3) {
    var _ref3$element = _ref3.element,
        element = _ref3$element === void 0 ? /*#__PURE__*/React.createElement(Outlet, null) : _ref3$element;
    return element;
  }
  /**
   * Provides location context for the rest of the app.
   *
   * Note: You usually won't render a <Router> directly. Instead, you'll render a
   * router that is more specific to your environment such as a <BrowserRouter>
   * in web browsers or a <StaticRouter> for server rendering.
   *
   * @see https://reactrouter.com/api/Router
   */

  function Router(_ref4) {
    var _ref4$children = _ref4.children,
        children = _ref4$children === void 0 ? null : _ref4$children,
        _ref4$action = _ref4.action,
        action = _ref4$action === void 0 ? history.Action.Pop : _ref4$action,
        location = _ref4.location,
        navigator = _ref4.navigator,
        _ref4$static = _ref4.static,
        staticProp = _ref4$static === void 0 ? false : _ref4$static;
    !!useInRouterContext() ?  invariant(false, "You cannot render a <Router> inside another <Router>." + " You never need more than one.")  : void 0;
    return /*#__PURE__*/React.createElement(NavigatorContext.Provider, {
      value: navigator
    }, /*#__PURE__*/React.createElement(LocationContext.Provider, {
      children: children,
      value: {
        action: action,
        location: location,
        static: staticProp
      }
    }));
  }
  /**
   * A container for a nested tree of <Route> elements that renders the branch
   * that best matches the current location.
   *
   * @see https://reactrouter.com/api/Routes
   */

  function Routes(_ref5) {
    var _ref5$basename = _ref5.basename,
        basename = _ref5$basename === void 0 ? "" : _ref5$basename,
        children = _ref5.children,
        location = _ref5.location;
    var routes = createRoutesFromChildren(children);
    return useRoutes_(routes, location, basename);
  } ///////////////////////////////////////////////////////////////////////////////
  // HOOKS
  ///////////////////////////////////////////////////////////////////////////////

  /**
   * Blocks all navigation attempts. This is useful for preventing the page from
   * changing until some condition is met, like saving form data.
   *
   * @see https://reactrouter.com/api/useBlocker
   */

  function useBlocker(blocker, when) {
    if (when === void 0) {
      when = true;
    }

    !useInRouterContext() ?  invariant(false, // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useBlocker() may be used only in the context of a <Router> component.")  : void 0;
    var navigator = React.useContext(NavigatorContext);
    React.useEffect(function () {
      if (!when) return;
      var unblock = navigator.block(function (tx) {
        var autoUnblockingTx = _extends({}, tx, {
          retry: function retry() {
            // Automatically unblock the transition so it can play all the way
            // through before retrying it. TODO: Figure out how to re-enable
            // this block if the transition is cancelled for some reason.
            unblock();
            tx.retry();
          }
        });

        blocker(autoUnblockingTx);
      });
      return unblock;
    }, [navigator, blocker, when]);
  }
  /**
   * Returns the full href for the given "to" value. This is useful for building
   * custom links that are also accessible and preserve right-click behavior.
   *
   * @see https://reactrouter.com/api/useHref
   */

  function useHref(to) {
    !useInRouterContext() ?  invariant(false, // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useHref() may be used only in the context of a <Router> component.")  : void 0;
    var navigator = React.useContext(NavigatorContext);
    var path = useResolvedPath(to);
    return navigator.createHref(path);
  }
  /**
   * Returns true if this component is a descendant of a <Router>.
   *
   * @see https://reactrouter.com/api/useInRouterContext
   */

  function useInRouterContext() {
    return React.useContext(LocationContext).location != null;
  }
  /**
   * Returns the current location object, which represents the current URL in web
   * browsers.
   *
   * Note: If you're using this it may mean you're doing some of your own
   * "routing" in your app, and we'd like to know what your use case is. We may
   * be able to provide something higher-level to better suit your needs.
   *
   * @see https://reactrouter.com/api/useLocation
   */

  function useLocation() {
    !useInRouterContext() ?  invariant(false, // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useLocation() may be used only in the context of a <Router> component.")  : void 0;
    return React.useContext(LocationContext).location;
  }
  /**
   * Returns true if the URL for the given "to" value matches the current URL.
   * This is useful for components that need to know "active" state, e.g.
   * <NavLink>.
   *
   * @see https://reactrouter.com/api/useMatch
   */

  function useMatch(pattern) {
    !useInRouterContext() ?  invariant(false, // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useMatch() may be used only in the context of a <Router> component.")  : void 0;
    var location = useLocation();
    return matchPath(pattern, location.pathname);
  }
  /**
   * Returns an imperative method for changing the location. Used by <Link>s, but
   * may also be used by other elements to change the location.
   *
   * @see https://reactrouter.com/api/useNavigate
   */

  function useNavigate() {
    !useInRouterContext() ?  invariant(false, // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useNavigate() may be used only in the context of a <Router> component.")  : void 0;
    var navigator = React.useContext(NavigatorContext);

    var _React$useContext = React.useContext(RouteContext),
        basename = _React$useContext.basename;

    var _useLocation = useLocation(),
        pathname = _useLocation.pathname;

    var activeRef = React.useRef(false);
    React.useEffect(function () {
      activeRef.current = true;
    });
    var navigate = React.useCallback(function (to, options) {
      if (options === void 0) {
        options = {};
      }

      if (activeRef.current) {
        if (typeof to === "number") {
          navigator.go(to);
        } else {
          var path = resolvePath(to, pathname, basename);
          (!!options.replace ? navigator.replace : navigator.push)(path, options.state);
        }
      } else {
         warning(false, "You should call navigate() in a useEffect, not when " + "your component is first rendered.") ;
      }
    }, [basename, navigator, pathname]);
    return navigate;
  }
  /**
   * Returns the element for the child route at this level of the route
   * hierarchy. Used internally by <Outlet> to render child routes.
   *
   * @see https://reactrouter.com/api/useOutlet
   */

  function useOutlet() {
    return React.useContext(RouteContext).outlet;
  }
  /**
   * Returns an object of key/value pairs of the dynamic params from the current
   * URL that were matched by the route path.
   *
   * @see https://reactrouter.com/api/useParams
   */

  function useParams() {
    return React.useContext(RouteContext).params;
  }
  /**
   * Resolves the pathname of the given `to` value against the current location.
   *
   * @see https://reactrouter.com/api/useResolvedPath
   */

  function useResolvedPath(to) {
    var _React$useContext2 = React.useContext(RouteContext),
        pathname = _React$useContext2.pathname,
        basename = _React$useContext2.basename;

    return React.useMemo(function () {
      return resolvePath(to, pathname, basename);
    }, [to, pathname, basename]);
  }
  /**
   * Returns the element of the route that matched the current location, prepared
   * with the correct context to render the remainder of the route tree. Route
   * elements in the tree must render an <Outlet> to render their child route's
   * element.
   *
   * @see https://reactrouter.com/api/useRoutes
   */

  function useRoutes(partialRoutes, _temp) {
    var _ref6 = _temp === void 0 ? {} : _temp,
        _ref6$basename = _ref6.basename,
        basename = _ref6$basename === void 0 ? "" : _ref6$basename,
        location = _ref6.location;

    !useInRouterContext() ?  invariant(false, // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useRoutes() may be used only in the context of a <Router> component.")  : void 0;
    var routes = React.useMemo(function () {
      return createRoutesFromArray(partialRoutes);
    }, [partialRoutes]);
    return useRoutes_(routes, location, basename);
  }

  function useRoutes_(routes, locationOverride, basename) {
    if (basename === void 0) {
      basename = "";
    }

    var _React$useContext3 = React.useContext(RouteContext),
        parentRoute = _React$useContext3.route,
        parentPathname = _React$useContext3.pathname,
        parentParams = _React$useContext3.params;

    {
      // You won't get a warning about 2 different <Routes> under a <Route>
      // without a trailing *, but this is a best-effort warning anyway since we
      // cannot even give the warning unless they land at the parent route.
      var parentPath = parentRoute && parentRoute.path;
      warningOnce(parentPathname, !parentRoute || parentRoute.path.endsWith("*"), "You rendered descendant <Routes> (or called `useRoutes`) at " + ("\"" + parentPathname + "\" (under <Route path=\"" + parentPath + "\">) but the ") + "parent route path has no trailing \"*\". This means if you navigate " + "deeper, the parent won't match anymore and therefore the child " + "routes will never render.\n\n" + ("Please change the parent <Route path=\"" + parentPath + "\"> to <Route ") + ("path=\"" + parentPath + "/*\">."));
    }

    var basenameForMatching = basename ? joinPaths([parentPathname, basename]) : parentPathname;
    var contextLocation = useLocation();
    var location = locationOverride !== null && locationOverride !== void 0 ? locationOverride : contextLocation;
    var matches = React.useMemo(function () {
      return matchRoutes(routes, location, basenameForMatching);
    }, [location, routes, basenameForMatching]);

    if (!matches) {
      // TODO: Warn about nothing matching, suggest using a catch-all route.
      return null;
    } // Otherwise render an element.


    var allParams = {};
    var element = matches.reduceRight(function (outlet, _ref7) {
      var params = _ref7.params,
          pathname = _ref7.pathname,
          route = _ref7.route;
      allParams = _extends({}, allParams, params);
      return /*#__PURE__*/React.createElement(RouteContext.Provider, {
        children: route.element,
        value: {
          outlet: outlet,
          params: readOnly(_extends({}, parentParams, allParams)),
          pathname: joinPaths([basenameForMatching, pathname]),
          basename: basename,
          route: route
        }
      });
    }, null);
    return element;
  } ///////////////////////////////////////////////////////////////////////////////
  // UTILS
  ///////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a route config from an array of JavaScript objects. Used internally
   * by `useRoutes` to normalize the route config.
   *
   * @see https://reactrouter.com/api/createRoutesFromArray
   */


  function createRoutesFromArray(array) {
    return array.map(function (partialRoute) {
      var route = {
        path: partialRoute.path || "/",
        caseSensitive: partialRoute.caseSensitive === true,
        element: partialRoute.element || /*#__PURE__*/React.createElement(Outlet, null)
      };

      if (partialRoute.children) {
        route.children = createRoutesFromArray(partialRoute.children);
      }

      return route;
    });
  }
  /**
   * Creates a route config from a React "children" object, which is usually
   * either a `<Route>` element or an array of them. Used internally by
   * `<Routes>` to create a route config from its children.
   *
   * @see https://reactrouter.com/api/createRoutesFromChildren
   */

  function createRoutesFromChildren(children) {
    var routes = [];
    React.Children.forEach(children, function (element) {
      if (! /*#__PURE__*/React.isValidElement(element)) {
        // Ignore non-elements. This allows people to more easily inline
        // conditionals in their route config.
        return;
      }

      if (element.type === React.Fragment) {
        // Transparently support React.Fragment and its children.
        routes.push.apply(routes, createRoutesFromChildren(element.props.children));
        return;
      }

      var route = {
        path: element.props.path || "/",
        caseSensitive: element.props.caseSensitive === true,
        // Default behavior is to just render the element that was given. This
        // permits people to use any element they prefer, not just <Route> (though
        // all our official examples and docs use <Route> for clarity).
        element: element
      };

      if (element.props.children) {
        var childRoutes = createRoutesFromChildren(element.props.children);

        if (childRoutes.length) {
          route.children = childRoutes;
        }
      }

      routes.push(route);
    });
    return routes;
  }
  /**
   * Returns a path with params interpolated.
   *
   * @see https://reactrouter.com/api/generatePath
   */

  function generatePath(path, params) {
    if (params === void 0) {
      params = {};
    }

    return path.replace(/:(\w+)/g, function (_, key) {
      !(params[key] != null) ?  invariant(false, "Missing \":" + key + "\" param")  : void 0;
      return params[key];
    }).replace(/\/*\*$/, function (_) {
      return params["*"] == null ? "" : params["*"].replace(/^\/*/, "/");
    });
  }
  /**
   * Matches the given routes to a location and returns the match data.
   *
   * @see https://reactrouter.com/api/matchRoutes
   */

  function matchRoutes(routes, location, basename) {
    if (basename === void 0) {
      basename = "";
    }

    if (typeof location === "string") {
      location = history.parsePath(location);
    }

    var pathname = location.pathname || "/";

    if (basename) {
      var base = basename // // Basename should be case-insensitive
      // https://github.com/remix-run/react-router/issues/7997#issuecomment-911916907
      .toLowerCase().replace(/^\/*/, "/").replace(/\/+$/, "");

      if (pathname.toLowerCase().startsWith(base)) {
        pathname = pathname.slice(base.length) || "/";
      } else {
        // Pathname does not start with the basename, no match.
        return null;
      }
    }

    var branches = flattenRoutes(routes);
    rankRouteBranches(branches);
    var matches = null;

    for (var i = 0; matches == null && i < branches.length; ++i) {
      // TODO: Match on search, state too?
      matches = matchRouteBranch(branches[i], pathname);
    }

    return matches;
  }

  function flattenRoutes(routes, branches, parentPath, parentRoutes, parentIndexes) {
    if (branches === void 0) {
      branches = [];
    }

    if (parentPath === void 0) {
      parentPath = "";
    }

    if (parentRoutes === void 0) {
      parentRoutes = [];
    }

    if (parentIndexes === void 0) {
      parentIndexes = [];
    }

    routes.forEach(function (route, index) {
      route = _extends({}, route, {
        path: route.path || "/",
        caseSensitive: !!route.caseSensitive,
        element: route.element
      });
      var path = joinPaths([parentPath, route.path]);
      var routes = parentRoutes.concat(route);
      var indexes = parentIndexes.concat(index); // Add the children before adding this route to the array so we traverse the
      // route tree depth-first and child routes appear before their parents in
      // the "flattened" version.

      if (route.children) {
        flattenRoutes(route.children, branches, path, routes, indexes);
      }

      branches.push([path, routes, indexes]);
    });
    return branches;
  }

  function rankRouteBranches(branches) {
    var pathScores = branches.reduce(function (memo, _ref8) {
      var path = _ref8[0];
      memo[path] = computeScore(path);
      return memo;
    }, {}); // Sorting is stable in modern browsers, but we still support IE 11, so we
    // need this little helper.

    stableSort(branches, function (a, b) {
      var aPath = a[0],
          aIndexes = a[2];
      var aScore = pathScores[aPath];
      var bPath = b[0],
          bIndexes = b[2];
      var bScore = pathScores[bPath];
      return aScore !== bScore ? bScore - aScore // Higher score first
      : compareIndexes(aIndexes, bIndexes);
    });
  }

  var paramRe = /^:\w+$/;
  var dynamicSegmentValue = 2;
  var emptySegmentValue = 1;
  var staticSegmentValue = 10;
  var splatPenalty = -2;

  var isSplat = function isSplat(s) {
    return s === "*";
  };

  function computeScore(path) {
    var segments = path.split("/");
    var initialScore = segments.length;

    if (segments.some(isSplat)) {
      initialScore += splatPenalty;
    }

    return segments.filter(function (s) {
      return !isSplat(s);
    }).reduce(function (score, segment) {
      return score + (paramRe.test(segment) ? dynamicSegmentValue : segment === "" ? emptySegmentValue : staticSegmentValue);
    }, initialScore);
  }

  function compareIndexes(a, b) {
    var siblings = a.length === b.length && a.slice(0, -1).every(function (n, i) {
      return n === b[i];
    });
    return siblings ? // If two routes are siblings, we should try to match the earlier sibling
    // first. This allows people to have fine-grained control over the matching
    // behavior by simply putting routes with identical paths in the order they
    // want them tried.
    a[a.length - 1] - b[b.length - 1] : // Otherwise, it doesn't really make sense to rank non-siblings by index,
    // so they sort equally.
    0;
  }

  function stableSort(array, compareItems) {
    // This copy lets us get the original index of an item so we can preserve the
    // original ordering in the case that they sort equally.
    var copy = array.slice(0);
    array.sort(function (a, b) {
      return compareItems(a, b) || copy.indexOf(a) - copy.indexOf(b);
    });
  }

  function matchRouteBranch(branch, pathname) {
    var routes = branch[1];
    var matchedPathname = "/";
    var matchedParams = {};
    var matches = [];

    for (var i = 0; i < routes.length; ++i) {
      var route = routes[i];
      var remainingPathname = matchedPathname === "/" ? pathname : pathname.slice(matchedPathname.length) || "/";
      var routeMatch = matchPath({
        path: route.path,
        caseSensitive: route.caseSensitive,
        end: i === routes.length - 1
      }, remainingPathname);
      if (!routeMatch) return null;
      matchedPathname = joinPaths([matchedPathname, routeMatch.pathname]);
      matchedParams = _extends({}, matchedParams, routeMatch.params);
      matches.push({
        route: route,
        pathname: matchedPathname,
        params: readOnly(matchedParams)
      });
    }

    return matches;
  }
  /**
   * Performs pattern matching on a URL pathname and returns information about
   * the match.
   *
   * @see https://reactrouter.com/api/matchPath
   */


  function matchPath(pattern, pathname) {
    if (typeof pattern === "string") {
      pattern = {
        path: pattern
      };
    }

    var _pattern = pattern,
        path = _pattern.path,
        _pattern$caseSensitiv = _pattern.caseSensitive,
        caseSensitive = _pattern$caseSensitiv === void 0 ? false : _pattern$caseSensitiv,
        _pattern$end = _pattern.end,
        end = _pattern$end === void 0 ? true : _pattern$end;

    var _compilePath = compilePath(path, caseSensitive, end),
        matcher = _compilePath[0],
        paramNames = _compilePath[1];

    var match = pathname.match(matcher);
    if (!match) return null;
    var matchedPathname = match[1];
    var values = match.slice(2);
    var params = paramNames.reduce(function (memo, paramName, index) {
      memo[paramName] = safelyDecodeURIComponent(values[index] || "", paramName);
      return memo;
    }, {});
    return {
      path: path,
      pathname: matchedPathname,
      params: params
    };
  }

  function compilePath(path, caseSensitive, end) {
    var keys = [];
    var source = "^(" + path.replace(/^\/*/, "/") // Make sure it has a leading /
    .replace(/\/?\*?$/, "") // Ignore trailing / and /*, we'll handle it below
    .replace(/[\\.*+^$?{}|()[\]]/g, "\\$&") // Escape special regex chars
    .replace(/:(\w+)/g, function (_, key) {
      keys.push(key);
      return "([^\\/]+)";
    }) + ")";

    if (path.endsWith("*")) {
      if (path.endsWith("/*")) {
        source += "(?:\\/(.+)|\\/?)"; // Don't include the / in params['*']
      } else {
        source += "(.*)";
      }

      keys.push("*");
    } else if (end) {
      source += "\\/?";
    }

    if (end) source += "$";
    var flags = caseSensitive ? undefined : "i";
    var matcher = new RegExp(source, flags);
    return [matcher, keys];
  }

  function safelyDecodeURIComponent(value, paramName) {
    try {
      return decodeURIComponent(value);
    } catch (error) {
       warning(false, "The value for the URL param \"" + paramName + "\" will not be decoded because" + (" the string \"" + value + "\" is a malformed URL segment. This is probably") + (" due to a bad percent encoding (" + error + ").")) ;
      return value;
    }
  }
  /**
   * Returns a resolved path object relative to the given pathname.
   *
   * @see https://reactrouter.com/api/resolvePath
   */


  function resolvePath(to, fromPathname, basename) {
    if (fromPathname === void 0) {
      fromPathname = "/";
    }

    if (basename === void 0) {
      basename = "";
    }

    var _ref9 = typeof to === "string" ? history.parsePath(to) : to,
        toPathname = _ref9.pathname,
        _ref9$search = _ref9.search,
        search = _ref9$search === void 0 ? "" : _ref9$search,
        _ref9$hash = _ref9.hash,
        hash = _ref9$hash === void 0 ? "" : _ref9$hash;

    var pathname = toPathname ? resolvePathname(toPathname, toPathname.startsWith("/") ? basename ? normalizeSlashes("/" + basename) : "/" : fromPathname) : fromPathname;
    return {
      pathname: pathname,
      search: normalizeSearch(search),
      hash: normalizeHash(hash)
    };
  }

  var trimTrailingSlashes = function trimTrailingSlashes(path) {
    return path.replace(/\/+$/, "");
  };

  var normalizeSlashes = function normalizeSlashes(path) {
    return path.replace(/\/\/+/g, "/");
  };

  var joinPaths = function joinPaths(paths) {
    return normalizeSlashes(paths.join("/"));
  };

  var splitPath = function splitPath(path) {
    return normalizeSlashes(path).split("/");
  };

  var normalizeSearch = function normalizeSearch(search) {
    return !search || search === "?" ? "" : search.startsWith("?") ? search : "?" + search;
  };

  var normalizeHash = function normalizeHash(hash) {
    return !hash || hash === "#" ? "" : hash.startsWith("#") ? hash : "#" + hash;
  };

  function resolvePathname(toPathname, fromPathname) {
    var segments = splitPath(trimTrailingSlashes(fromPathname));
    var relativeSegments = splitPath(toPathname);
    relativeSegments.forEach(function (segment) {
      if (segment === "..") {
        // Keep the root "" segment so the pathname starts at /
        if (segments.length > 1) segments.pop();
      } else if (segment !== ".") {
        segments.push(segment);
      }
    });
    return segments.length > 1 ? joinPaths(segments) : "/";
  } ///////////////////////////////////////////////////////////////////////////////

  exports.MemoryRouter = MemoryRouter;
  exports.Navigate = Navigate;
  exports.Outlet = Outlet;
  exports.Route = Route;
  exports.Router = Router;
  exports.Routes = Routes;
  exports.UNSAFE_LocationContext = LocationContext;
  exports.UNSAFE_NavigatorContext = NavigatorContext;
  exports.UNSAFE_RouteContext = RouteContext;
  exports.createRoutesFromArray = createRoutesFromArray;
  exports.createRoutesFromChildren = createRoutesFromChildren;
  exports.generatePath = generatePath;
  exports.matchPath = matchPath;
  exports.matchRoutes = matchRoutes;
  exports.resolvePath = resolvePath;
  exports.useBlocker = useBlocker;
  exports.useHref = useHref;
  exports.useInRouterContext = useInRouterContext;
  exports.useLocation = useLocation;
  exports.useMatch = useMatch;
  exports.useNavigate = useNavigate;
  exports.useOutlet = useOutlet;
  exports.useParams = useParams;
  exports.useResolvedPath = useResolvedPath;
  exports.useRoutes = useRoutes;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=react-router.development.js.map
