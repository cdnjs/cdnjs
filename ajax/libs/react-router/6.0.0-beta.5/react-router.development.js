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

  const alreadyWarned = {};

  function warningOnce(key, cond, message) {
    if (!cond && !alreadyWarned[key]) {
      alreadyWarned[key] = true;
       warning(false, message) ;
    }
  }

  const NavigationContext = /*#__PURE__*/React.createContext(null);

  {
    NavigationContext.displayName = "Navigation";
  }

  const LocationContext = /*#__PURE__*/React.createContext(null);

  {
    LocationContext.displayName = "Location";
  }

  const RouteContext = /*#__PURE__*/React.createContext({
    outlet: null,
    params: {},
    pathname: "/",
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
    let {
      basename,
      children,
      initialEntries,
      initialIndex
    } = _ref;
    let historyRef = React.useRef();

    if (historyRef.current == null) {
      historyRef.current = history.createMemoryHistory({
        initialEntries,
        initialIndex
      });
    }

    let history$1 = historyRef.current;
    let [state, setState] = React.useState({
      action: history$1.action,
      location: history$1.location
    });
    React.useLayoutEffect(() => history$1.listen(setState), [history$1]);
    return /*#__PURE__*/React.createElement(Router, {
      basename: basename,
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
    let {
      to,
      replace,
      state
    } = _ref2;
    !useInRouterContext() ?  invariant(false, // TODO: This error is probably because they somehow have 2 versions of
    // the router loaded. We can help them understand how to avoid that.
    "<Navigate> may be used only in the context of a <Router> component.")  : void 0;
     warning(!React.useContext(NavigationContext).static, "<Navigate> must not be used on the initial render in a <StaticRouter>. " + "This is a no-op, but you should modify your code so the <Navigate> is " + "only ever rendered in response to some user interaction or state change.") ;
    let navigate = useNavigate();
    React.useEffect(() => {
      navigate(to, {
        replace,
        state
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

  function Route(_props) {
      invariant(false, "A <Route> is only ever to be used as the child of <Routes> element, " + "never rendered directly. Please wrap your <Route> in a <Routes>.")  ;
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

  function Router(_ref3) {
    let {
      action = history.Action.Pop,
      basename: basenameProp = "/",
      children = null,
      location: locationProp,
      navigator,
      static: staticProp = false
    } = _ref3;
    !!useInRouterContext() ?  invariant(false, "You cannot render a <Router> inside another <Router>." + " You should never have more than one in your app.")  : void 0;
    let basename = normalizePathname(basenameProp);
    let navigationContext = React.useMemo(() => ({
      basename,
      navigator,
      static: staticProp
    }), [basename, navigator, staticProp]);

    if (typeof locationProp === "string") {
      locationProp = history.parsePath(locationProp);
    }

    let {
      pathname = "/",
      search = "",
      hash = "",
      state = null,
      key = "default"
    } = locationProp;
    let location = React.useMemo(() => {
      let trailingPathname = stripBasename(pathname, basename);

      if (trailingPathname == null) {
        return null;
      }

      return {
        pathname: trailingPathname,
        search,
        hash,
        state,
        key
      };
    }, [basename, pathname, search, hash, state, key]);
     warning(location != null, "<Router basename=\"" + basename + "\"> is not able to match the URL " + ("\"" + pathname + search + hash + "\" because it does not start with the ") + "basename, so the <Router> won't render anything.") ;

    if (location == null) {
      return null;
    }

    return /*#__PURE__*/React.createElement(NavigationContext.Provider, {
      value: navigationContext
    }, /*#__PURE__*/React.createElement(LocationContext.Provider, {
      children: children,
      value: {
        action,
        location
      }
    }));
  }
  /**
   * A container for a nested tree of <Route> elements that renders the branch
   * that best matches the current location.
   *
   * @see https://reactrouter.com/api/Routes
   */

  function Routes(_ref4) {
    let {
      children,
      location
    } = _ref4;
    return useRoutes(createRoutesFromChildren(children), location);
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
    let {
      navigator
    } = React.useContext(NavigationContext);
    React.useEffect(() => {
      if (!when) return;
      let unblock = navigator.block(tx => {
        let autoUnblockingTx = _extends({}, tx, {
          retry() {
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
    let {
      basename,
      navigator
    } = React.useContext(NavigationContext);
    let path = useResolvedPath(to);

    if (basename !== "/") {
      let toPathname = getToPathname(to);
      let endsWithSlash = toPathname != null && toPathname.endsWith("/");
      path.pathname = path.pathname === "/" ? basename + (endsWithSlash ? "/" : "") : joinPaths([basename, path.pathname]);
    }

    return navigator.createHref(path);
  }
  /**
   * Returns true if this component is a descendant of a <Router>.
   *
   * @see https://reactrouter.com/api/useInRouterContext
   */

  function useInRouterContext() {
    return React.useContext(LocationContext) != null;
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
    return matchPath(pattern, useLocation().pathname);
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
    let {
      basename,
      navigator
    } = React.useContext(NavigationContext);
    let {
      pathname: routePathname
    } = React.useContext(RouteContext);
    let {
      pathname: locationPathname
    } = useLocation();
    let activeRef = React.useRef(false);
    React.useEffect(() => {
      activeRef.current = true;
    });
    let navigate = React.useCallback(function (to, options) {
      if (options === void 0) {
        options = {};
      }

       warning(activeRef.current, "You should call navigate() in a React.useEffect(), not when " + "your component is first rendered.") ;
      if (!activeRef.current) return;

      if (typeof to === "number") {
        navigator.go(to);
        return;
      }

      let path = resolveTo(to, routePathname, locationPathname);

      if (basename !== "/") {
        path.pathname = joinPaths([basename, path.pathname]);
      }

      (!!options.replace ? navigator.replace : navigator.push)(path, options.state);
    }, [basename, navigator, routePathname, locationPathname]);
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
    let {
      pathname: locationPathname
    } = useLocation();
    let {
      pathname: routePathname
    } = React.useContext(RouteContext);
    return React.useMemo(() => resolveTo(to, routePathname, locationPathname), [to, routePathname, locationPathname]);
  }
  /**
   * Returns the element of the route that matched the current location, prepared
   * with the correct context to render the remainder of the route tree. Route
   * elements in the tree must render an <Outlet> to render their child route's
   * element.
   *
   * @see https://reactrouter.com/api/useRoutes
   */

  function useRoutes(routes, locationArg) {
    !useInRouterContext() ?  invariant(false, // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useRoutes() may be used only in the context of a <Router> component.")  : void 0;
    let {
      params: parentParams,
      pathname: parentPathname,
      route: parentRoute
    } = React.useContext(RouteContext);

    {
      // You won't get a warning about 2 different <Routes> under a <Route>
      // without a trailing *, but this is a best-effort warning anyway since we
      // cannot even give the warning unless they land at the parent route.
      //
      // Example:
      //
      // <Routes>
      //   {/* This route path MUST end with /* because otherwise
      //       it will never match /blog/post/123 */}
      //   <Route path="blog" element={<Blog />} />
      //   <Route path="blog/feed" element={<BlogFeed />} />
      // </Routes>
      //
      // function Blog() {
      //   return (
      //     <Routes>
      //       <Route path="post/:id" element={<Post />} />
      //     </Routes>
      //   );
      // }
      let parentPath = parentRoute && parentRoute.path || "";
      warningOnce(parentPathname, !parentRoute || parentPath.endsWith("*"), "You rendered descendant <Routes> (or called `useRoutes()`) at " + ("\"" + parentPathname + "\" (under <Route path=\"" + parentPath + "\">) but the ") + "parent route path has no trailing \"*\". This means if you navigate " + "deeper, the parent won't match anymore and therefore the child " + "routes will never render.\n\n" + ("Please change the parent <Route path=\"" + parentPath + "\"> to <Route ") + ("path=\"" + parentPath + "/*\">."));
    }

    let locationFromContext = useLocation();
    let location = locationArg ? typeof locationArg === "string" ? history.parsePath(locationArg) : locationArg : locationFromContext;
    let pathname = location.pathname || "/";
    let parentPathnameStart = getPathnameStart(parentPathname, parentParams);
    let remainingPathname = parentPathnameStart === "/" ? pathname : pathname.slice(parentPathnameStart.length);
    let matches = matchRoutes(routes, {
      pathname: remainingPathname
    });

    {
       warning(parentRoute || matches != null, "No routes matched location \"" + location.pathname + location.search + location.hash + "\" ") ;
    }

    return renderMatches(matches && matches.map(match => Object.assign({}, match, {
      pathname: joinPaths([parentPathnameStart, match.pathname])
    })));
  } ///////////////////////////////////////////////////////////////////////////////
  // UTILS
  ///////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a route config from a React "children" object, which is usually
   * either a `<Route>` element or an array of them. Used internally by
   * `<Routes>` to create a route config from its children.
   *
   * @see https://reactrouter.com/api/createRoutesFromChildren
   */

  function createRoutesFromChildren(children) {
    let routes = [];
    React.Children.forEach(children, element => {
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

      let route = {
        path: element.props.path,
        caseSensitive: element.props.caseSensitive,
        index: element.props.index,
        element: element.props.element
      };

      if (element.props.children) {
        route.children = createRoutesFromChildren(element.props.children);
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

    return path.replace(/:(\w+)/g, (_, key) => {
      !(params[key] != null) ?  invariant(false, "Missing \":" + key + "\" param")  : void 0;
      return params[key];
    }).replace(/\/*\*$/, _ => params["*"] == null ? "" : params["*"].replace(/^\/*/, "/"));
  }
  /**
   * Matches the given routes to a location and returns the match data.
   *
   * @see https://reactrouter.com/api/matchRoutes
   */

  function matchRoutes(routes, locationArg, basename) {
    if (basename === void 0) {
      basename = "/";
    }

    let location = typeof locationArg === "string" ? history.parsePath(locationArg) : locationArg;
    let pathname = stripBasename(location.pathname || "/", basename);

    if (pathname == null) {
      return null;
    }

    let branches = flattenRoutes(routes);
    rankRouteBranches(branches);
    let matches = null;

    for (let i = 0; matches == null && i < branches.length; ++i) {
      matches = matchRouteBranch(branches[i], routes, pathname);
    }

    return matches;
  }

  function flattenRoutes(routes, branches, parentsMeta, parentPath) {
    if (branches === void 0) {
      branches = [];
    }

    if (parentsMeta === void 0) {
      parentsMeta = [];
    }

    if (parentPath === void 0) {
      parentPath = "";
    }

    routes.forEach((route, index) => {
      let meta = {
        relativePath: route.path || "",
        caseSensitive: route.caseSensitive === true,
        childrenIndex: index
      };

      if (meta.relativePath.startsWith("/")) {
        !meta.relativePath.startsWith(parentPath) ?  invariant(false, "Absolute route path \"" + meta.relativePath + "\" nested under path " + ("\"" + parentPath + "\" is not valid. An absolute child route path ") + "must start with the combined path of all its parent routes.")  : void 0;
        meta.relativePath = meta.relativePath.slice(parentPath.length);
      }

      let path = joinPaths([parentPath, meta.relativePath]);
      let routesMeta = parentsMeta.concat(meta); // Add the children before adding this route to the array so we traverse the
      // route tree depth-first and child routes appear before their parents in
      // the "flattened" version.

      if (route.children && route.children.length > 0) {
        !(route.index !== true) ?  invariant(false, "Index routes must not have child routes. Please remove " + ("all child routes from route path \"" + path + "\"."))  : void 0;
        flattenRoutes(route.children, branches, routesMeta, path);
      }

      branches.push({
        path,
        score: computeScore(path),
        routesMeta
      });
    });
    return branches;
  }

  function rankRouteBranches(branches) {
    branches.sort((a, b) => a.score !== b.score ? b.score - a.score // Higher score first
    : compareIndexes(a.routesMeta.map(meta => meta.childrenIndex), b.routesMeta.map(meta => meta.childrenIndex)));
  }

  const paramRe = /^:\w+$/;
  const dynamicSegmentValue = 2;
  const emptySegmentValue = 1;
  const staticSegmentValue = 10;
  const splatPenalty = -2;

  const isSplat = s => s === "*";

  function computeScore(path) {
    let segments = path.split("/");
    let initialScore = segments.length;

    if (segments.some(isSplat)) {
      initialScore += splatPenalty;
    }

    return segments.filter(s => !isSplat(s)).reduce((score, segment) => score + (paramRe.test(segment) ? dynamicSegmentValue : segment === "" ? emptySegmentValue : staticSegmentValue), initialScore);
  }

  function compareIndexes(a, b) {
    let siblings = a.length === b.length && a.slice(0, -1).every((n, i) => n === b[i]);
    return siblings ? // If two routes are siblings, we should try to match the earlier sibling
    // first. This allows people to have fine-grained control over the matching
    // behavior by simply putting routes with identical paths in the order they
    // want them tried.
    a[a.length - 1] - b[b.length - 1] : // Otherwise, it doesn't really make sense to rank non-siblings by index,
    // so they sort equally.
    0;
  }

  function matchRouteBranch(branch, routesArg, pathname) {
    let routes = routesArg;
    let {
      routesMeta
    } = branch;
    let matchedParams = {};
    let matchedPathname = "/";
    let matches = [];

    for (let i = 0; i < routesMeta.length; ++i) {
      let meta = routesMeta[i];
      let trailingPathname = matchedPathname === "/" ? pathname : pathname.slice(matchedPathname.length) || "/";
      let match = matchPath({
        path: meta.relativePath,
        caseSensitive: meta.caseSensitive,
        end: i === routesMeta.length - 1
      }, trailingPathname);
      if (!match) return null;
      Object.assign(matchedParams, match.params);
      let route = routes[meta.childrenIndex];
      matches.push({
        params: matchedParams,
        pathname: match.pathname === "/" ? matchedPathname : joinPaths([matchedPathname, match.pathname]),
        route
      });
      let pathnameStart = getPathnameStart(match.pathname, match.params);

      if (pathnameStart !== "/") {
        // Add only the portion of the match.pathname that comes before the * to
        // the matchedPathname. This allows child routes to match against the
        // portion of the pathname that was matched by the *.
        matchedPathname = joinPaths([matchedPathname, pathnameStart]);
      }

      routes = route.children;
    }

    return matches;
  }
  /**
   * Renders the result of `matchRoutes()` into a React element.
   */


  function renderMatches(matches) {
    if (matches == null) return null;
    return matches.reduceRight((outlet, match) => {
      return /*#__PURE__*/React.createElement(RouteContext.Provider, {
        children: match.route.element || /*#__PURE__*/React.createElement(Outlet, null),
        value: {
          outlet,
          params: match.params,
          pathname: match.pathname,
          route: match.route
        }
      });
    }, null);
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
        path: pattern,
        caseSensitive: false,
        end: true
      };
    }

    let [matcher, paramNames] = compilePath(pattern.path, pattern.caseSensitive, pattern.end);
    let match = pathname.match(matcher);
    if (!match) return null;
    let matchedPathname = match[0];
    let values = match.slice(1);
    let params = paramNames.reduce((memo, paramName, index) => {
      memo[paramName] = safelyDecodeURIComponent(values[index] || "", paramName);
      return memo;
    }, {});
    return {
      params,
      pathname: matchedPathname,
      pattern
    };
  }

  function compilePath(path, caseSensitive, end) {
    if (caseSensitive === void 0) {
      caseSensitive = false;
    }

    if (end === void 0) {
      end = true;
    }

    let keys = [];
    let source = "^" + path.replace(/\/?\*?$/, "") // Ignore trailing / and /*, we'll handle it below
    .replace(/^\/*/, "/") // Make sure it has a leading /
    .replace(/[\\.*+^$?{}|()[\]]/g, "\\$&") // Escape special regex chars
    .replace(/:(\w+)/g, (_, key) => {
      keys.push(key);
      return "([^\\/]+)";
    });

    if (path.endsWith("*")) {
      if (path.endsWith("/*")) {
        source += "(?:\\/(.+)|\\/?)$"; // Don't include the / in params['*']
      } else {
        source += "(.*)$";
      }

      keys.push("*");
    } else if (end) {
      // When matching to the end, ignore trailing slashes.
      source += "\\/?$";
    } else {
      // If not matching to the end (as parent routes do), at least match a word
      // boundary. This restricts a parent route to matching only its own words
      // and nothing more, e.g. parent route "/home" should not match "/home2".
      source += "(?:\\b|$)";
    }

    let matcher = new RegExp(source, caseSensitive ? undefined : "i");
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


  function resolvePath(to, fromPathname) {
    if (fromPathname === void 0) {
      fromPathname = "/";
    }

    let {
      pathname: toPathname,
      search = "",
      hash = ""
    } = typeof to === "string" ? history.parsePath(to) : to;
    let pathname = toPathname ? toPathname.startsWith("/") ? toPathname : resolvePathname(toPathname, fromPathname) : fromPathname;
    return {
      pathname,
      search: normalizeSearch(search),
      hash: normalizeHash(hash)
    };
  }

  function resolvePathname(relativePath, fromPathname) {
    let segments = fromPathname.replace(/\/+$/, "").split("/");
    let relativeSegments = relativePath.split("/");
    relativeSegments.forEach(segment => {
      if (segment === "..") {
        // Keep the root "" segment so the pathname starts at /
        if (segments.length > 1) segments.pop();
      } else if (segment !== ".") {
        segments.push(segment);
      }
    });
    return segments.length > 1 ? segments.join("/") : "/";
  }

  function resolveTo(to, routePathname, locationPathname) {
    return resolvePath(to, // If a pathname is explicitly provided in `to`, it should be
    // relative to the route context. This is explained in `Note on
    // `<Link to>` values` in our migration guide from v5 as a means of
    // disambiguation between `to` values that begin with `/` and those
    // that do not. However, this is problematic for `to` values that do
    // not provide a pathname. `to` can simply be a search or hash
    // string, in which case we should assume that the navigation is
    // relative to the current location's pathname and *not* the
    // route pathname.
    getToPathname(to) == null ? locationPathname : routePathname);
  }

  function getToPathname(to) {
    // Empty strings should be treated the same as / paths
    return to === "" || to.pathname === "" ? "/" : typeof to === "string" ? history.parsePath(to).pathname : to.pathname;
  }

  function getPathnameStart(pathname, params) {
    let splat = params["*"];
    if (!splat) return pathname;
    let pathnameStart = pathname.slice(0, -splat.length);
    if (splat.startsWith("/")) return pathnameStart;
    let index = pathnameStart.lastIndexOf("/");
    if (index > 0) return pathnameStart.slice(0, index);
    return "/";
  }

  function stripBasename(pathname, basename) {
    if (basename === "/") return pathname;

    if (!pathname.toLowerCase().startsWith(basename.toLowerCase())) {
      return null;
    }

    let nextChar = pathname.charAt(basename.length);

    if (nextChar && nextChar !== "/") {
      // pathname does not start with basename/
      return null;
    }

    return pathname.slice(basename.length) || "/";
  }

  const joinPaths = paths => paths.join("/").replace(/\/\/+/g, "/");

  const normalizePathname = pathname => pathname.replace(/\/+$/, "").replace(/^\/*/, "/");

  const normalizeSearch = search => !search || search === "?" ? "" : search.startsWith("?") ? search : "?" + search;

  const normalizeHash = hash => !hash || hash === "#" ? "" : hash.startsWith("#") ? hash : "#" + hash; ///////////////////////////////////////////////////////////////////////////////

  exports.MemoryRouter = MemoryRouter;
  exports.Navigate = Navigate;
  exports.Outlet = Outlet;
  exports.Route = Route;
  exports.Router = Router;
  exports.Routes = Routes;
  exports.UNSAFE_LocationContext = LocationContext;
  exports.UNSAFE_NavigationContext = NavigationContext;
  exports.UNSAFE_RouteContext = RouteContext;
  exports.createRoutesFromChildren = createRoutesFromChildren;
  exports.generatePath = generatePath;
  exports.matchPath = matchPath;
  exports.matchRoutes = matchRoutes;
  exports.renderMatches = renderMatches;
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
