/**
 * React Router v6.4.0-pre.2
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@remix-run/router'), require('react')) :
  typeof define === 'function' && define.amd ? define(['exports', '@remix-run/router', 'react'], factory) :
  (global = global || self, factory(global.ReactRouter = {}, global.Router, global.React));
}(this, (function (exports, router, React) { 'use strict';

  /**
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */
  /**
   * inlined Object.is polyfill to avoid requiring consumers ship their own
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
   */

  function isPolyfill(x, y) {
    return x === y && (x !== 0 || 1 / x === 1 / y) || x !== x && y !== y // eslint-disable-line no-self-compare
    ;
  }

  const is = typeof Object.is === "function" ? Object.is : isPolyfill; // Intentionally not using named imports because Rollup uses dynamic
  // dispatch for CommonJS interop named imports.

  const {
    useState,
    useEffect,
    useLayoutEffect,
    useDebugValue
  } = React;
  let didWarnOld18Alpha = false;
  let didWarnUncachedGetSnapshot = false; // Disclaimer: This shim breaks many of the rules of React, and only works
  // because of a very particular set of implementation details and assumptions
  // -- change any one of them and it will break. The most important assumption
  // is that updates are always synchronous, because concurrent rendering is
  // only available in versions of React that also have a built-in
  // useSyncExternalStore API. And we only use this shim when the built-in API
  // does not exist.
  //
  // Do not assume that the clever hacks used by this hook also work in general.
  // The point of this shim is to replace the need for hacks by other libraries.

  function useSyncExternalStore(subscribe, getSnapshot, // Note: The shim does not use getServerSnapshot, because pre-18 versions of
  // React do not expose a way to check if we're hydrating. So users of the shim
  // will need to track that themselves and return the correct value
  // from `getSnapshot`.
  getServerSnapshot) {
    {
      if (!didWarnOld18Alpha) {
        // @ts-expect-error
        if (React.startTransition !== undefined) {
          didWarnOld18Alpha = true;
          console.error("You are using an outdated, pre-release alpha of React 18 that " + "does not support useSyncExternalStore. The " + "use-sync-external-store shim will not work correctly. Upgrade " + "to a newer pre-release.");
        }
      }
    } // Read the current snapshot from the store on every render. Again, this
    // breaks the rules of React, and only works here because of specific
    // implementation details, most importantly that updates are
    // always synchronous.


    const value = getSnapshot();

    {
      if (!didWarnUncachedGetSnapshot) {
        const cachedValue = getSnapshot();

        if (!is(value, cachedValue)) {
          console.error("The result of getSnapshot should be cached to avoid an infinite loop");
          didWarnUncachedGetSnapshot = true;
        }
      }
    } // Because updates are synchronous, we don't queue them. Instead we force a
    // re-render whenever the subscribed state changes by updating an some
    // arbitrary useState hook. Then, during render, we call getSnapshot to read
    // the current value.
    //
    // Because we don't actually use the state returned by the useState hook, we
    // can save a bit of memory by storing other stuff in that slot.
    //
    // To implement the early bailout, we need to track some things on a mutable
    // object. Usually, we would put that in a useRef hook, but we can stash it in
    // our useState hook instead.
    //
    // To force a re-render, we call forceUpdate({inst}). That works because the
    // new object always fails an equality check.


    const [{
      inst
    }, forceUpdate] = useState({
      inst: {
        value,
        getSnapshot
      }
    }); // Track the latest getSnapshot function with a ref. This needs to be updated
    // in the layout phase so we can access it during the tearing check that
    // happens on subscribe.

    useLayoutEffect(() => {
      inst.value = value;
      inst.getSnapshot = getSnapshot; // Whenever getSnapshot or subscribe changes, we need to check in the
      // commit phase if there was an interleaved mutation. In concurrent mode
      // this can happen all the time, but even in synchronous mode, an earlier
      // effect may have mutated the store.

      if (checkIfSnapshotChanged(inst)) {
        // Force a re-render.
        forceUpdate({
          inst
        });
      } // eslint-disable-next-line react-hooks/exhaustive-deps

    }, [subscribe, value, getSnapshot]);
    useEffect(() => {
      // Check for changes right before subscribing. Subsequent changes will be
      // detected in the subscription handler.
      if (checkIfSnapshotChanged(inst)) {
        // Force a re-render.
        forceUpdate({
          inst
        });
      }

      const handleStoreChange = () => {
        // TODO: Because there is no cross-renderer API for batching updates, it's
        // up to the consumer of this library to wrap their subscription event
        // with unstable_batchedUpdates. Should we try to detect when this isn't
        // the case and print a warning in development?
        // The store changed. Check if the snapshot changed since the last time we
        // read from the store.
        if (checkIfSnapshotChanged(inst)) {
          // Force a re-render.
          forceUpdate({
            inst
          });
        }
      }; // Subscribe to the store and return a clean-up function.


      return subscribe(handleStoreChange); // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [subscribe]);
    useDebugValue(value);
    return value;
  }

  function checkIfSnapshotChanged(inst) {
    const latestGetSnapshot = inst.getSnapshot;
    const prevValue = inst.value;

    try {
      const nextValue = latestGetSnapshot();
      return !is(prevValue, nextValue);
    } catch (error) {
      return true;
    }
  }

  /**
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *
   * @flow
   */
  function useSyncExternalStore$1(subscribe, getSnapshot, getServerSnapshot) {
    // Note: The shim does not use getServerSnapshot, because pre-18 versions of
    // React do not expose a way to check if we're hydrating. So users of the shim
    // will need to track that themselves and return the correct value
    // from `getSnapshot`.
    return getSnapshot();
  }

  /**
   * Inlined into the react-router repo since use-sync-external-store does not
   * provide a UMD-compatible package, so we need this to be able to distribute
   * UMD react-router bundles
   */
  const canUseDOM = !!(typeof window !== "undefined" && typeof window.document !== "undefined" && typeof window.document.createElement !== "undefined");
  const isServerEnvironment = !canUseDOM;
  const shim = isServerEnvironment ? useSyncExternalStore$1 : useSyncExternalStore;
  const useSyncExternalStore$2 = // @ts-expect-error
  React.useSyncExternalStore !== undefined ? React.useSyncExternalStore : shim;

  // Contexts for data routers
  const DataRouterContext = /*#__PURE__*/React.createContext(null);

  {
    DataRouterContext.displayName = "DataRouter";
  }

  const DataRouterStateContext = /*#__PURE__*/React.createContext(null);

  {
    DataRouterStateContext.displayName = "DataRouterState";
  }
  /**
   * A Navigator is a "location changer"; it's how you get to different locations.
   *
   * Every history instance conforms to the Navigator interface, but the
   * distinction is useful primarily when it comes to the low-level <Router> API
   * where both the location and a navigator must be provided separately in order
   * to avoid "tearing" that may occur in a suspense-enabled app if the action
   * and/or location were to be read directly from the history instance.
   */


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
    matches: []
  });

  {
    RouteContext.displayName = "Route";
  }

  const RouteErrorContext = /*#__PURE__*/React.createContext(null);

  {
    RouteErrorContext.displayName = "RouteError";
  }

  /**
   * Returns the full href for the given "to" value. This is useful for building
   * custom links that are also accessible and preserve right-click behavior.
   *
   * @see https://reactrouter.com/docs/en/v6/hooks/use-href
   */

  function useHref(to) {
    !useInRouterContext() ?  router.invariant(false, // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useHref() may be used only in the context of a <Router> component.")  : void 0;
    let {
      basename,
      navigator
    } = React.useContext(NavigationContext);
    let {
      hash,
      pathname,
      search
    } = useResolvedPath(to);
    let joinedPathname = pathname;

    if (basename !== "/") {
      let toPathname = router.getToPathname(to);
      let endsWithSlash = toPathname != null && toPathname.endsWith("/");
      joinedPathname = pathname === "/" ? basename + (endsWithSlash ? "/" : "") : router.joinPaths([basename, pathname]);
    }

    return navigator.createHref({
      pathname: joinedPathname,
      search,
      hash
    });
  }
  /**
   * Returns true if this component is a descendant of a <Router>.
   *
   * @see https://reactrouter.com/docs/en/v6/hooks/use-in-router-context
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
   * @see https://reactrouter.com/docs/en/v6/hooks/use-location
   */

  function useLocation() {
    !useInRouterContext() ?  router.invariant(false, // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useLocation() may be used only in the context of a <Router> component.")  : void 0;
    return React.useContext(LocationContext).location;
  }
  /**
   * Returns the current navigation action which describes how the router came to
   * the current location, either by a pop, push, or replace on the history stack.
   *
   * @see https://reactrouter.com/docs/en/v6/hooks/use-navigation-type
   */

  function useNavigationType() {
    return React.useContext(LocationContext).navigationType;
  }
  /**
   * Returns true if the URL for the given "to" value matches the current URL.
   * This is useful for components that need to know "active" state, e.g.
   * <NavLink>.
   *
   * @see https://reactrouter.com/docs/en/v6/hooks/use-match
   */

  function useMatch(pattern) {
    !useInRouterContext() ?  router.invariant(false, // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useMatch() may be used only in the context of a <Router> component.")  : void 0;
    let {
      pathname
    } = useLocation();
    return React.useMemo(() => router.matchPath(pattern, pathname), [pathname, pattern]);
  }
  /**
   * The interface for the navigate() function returned from useNavigate().
   */

  /**
   * Returns an imperative method for changing the location. Used by <Link>s, but
   * may also be used by other elements to change the location.
   *
   * @see https://reactrouter.com/docs/en/v6/hooks/use-navigate
   */
  function useNavigate() {
    !useInRouterContext() ?  router.invariant(false, // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useNavigate() may be used only in the context of a <Router> component.")  : void 0;
    let {
      basename,
      navigator
    } = React.useContext(NavigationContext);
    let {
      matches
    } = React.useContext(RouteContext);
    let {
      pathname: locationPathname
    } = useLocation();
    let routePathnamesJson = JSON.stringify(matches.map(match => match.pathnameBase));
    let activeRef = React.useRef(false);
    React.useEffect(() => {
      activeRef.current = true;
    });
    let navigate = React.useCallback(function (to, options) {
      if (options === void 0) {
        options = {};
      }

       router.warning(activeRef.current, "You should call navigate() in a React.useEffect(), not when " + "your component is first rendered.") ;
      if (!activeRef.current) return;

      if (typeof to === "number") {
        navigator.go(to);
        return;
      }

      let path = router.resolveTo(to, JSON.parse(routePathnamesJson), locationPathname);

      if (basename !== "/") {
        path.pathname = router.joinPaths([basename, path.pathname]);
      }

      (!!options.replace ? navigator.replace : navigator.push)(path, options.state);
    }, [basename, navigator, routePathnamesJson, locationPathname]);
    return navigate;
  }
  const OutletContext = /*#__PURE__*/React.createContext(null);
  /**
   * Returns the context (if provided) for the child route at this level of the route
   * hierarchy.
   * @see https://reactrouter.com/docs/en/v6/hooks/use-outlet-context
   */

  function useOutletContext() {
    return React.useContext(OutletContext);
  }
  /**
   * Returns the element for the child route at this level of the route
   * hierarchy. Used internally by <Outlet> to render child routes.
   *
   * @see https://reactrouter.com/docs/en/v6/hooks/use-outlet
   */

  function useOutlet(context) {
    let outlet = React.useContext(RouteContext).outlet;

    if (outlet) {
      return /*#__PURE__*/React.createElement(OutletContext.Provider, {
        value: context
      }, outlet);
    }

    return outlet;
  }
  /**
   * Returns an object of key/value pairs of the dynamic params from the current
   * URL that were matched by the route path.
   *
   * @see https://reactrouter.com/docs/en/v6/hooks/use-params
   */

  function useParams() {
    let {
      matches
    } = React.useContext(RouteContext);
    let routeMatch = matches[matches.length - 1];
    return routeMatch ? routeMatch.params : {};
  }
  /**
   * Resolves the pathname of the given `to` value against the current location.
   *
   * @see https://reactrouter.com/docs/en/v6/hooks/use-resolved-path
   */

  function useResolvedPath(to) {
    let {
      matches
    } = React.useContext(RouteContext);
    let {
      pathname: locationPathname
    } = useLocation();
    let routePathnamesJson = JSON.stringify(matches.map(match => match.pathnameBase));
    return React.useMemo(() => router.resolveTo(to, JSON.parse(routePathnamesJson), locationPathname), [to, routePathnamesJson, locationPathname]);
  }
  /**
   * Returns the element of the route that matched the current location, prepared
   * with the correct context to render the remainder of the route tree. Route
   * elements in the tree must render an <Outlet> to render their child route's
   * element.
   *
   * @see https://reactrouter.com/docs/en/v6/hooks/use-routes
   */

  function useRoutes(routes, locationArg) {
    !useInRouterContext() ?  router.invariant(false, // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useRoutes() may be used only in the context of a <Router> component.")  : void 0;
    let dataRouterStateContext = React.useContext(DataRouterStateContext);
    let {
      matches: parentMatches
    } = React.useContext(RouteContext);
    let routeMatch = parentMatches[parentMatches.length - 1];
    let parentParams = routeMatch ? routeMatch.params : {};
    let parentPathname = routeMatch ? routeMatch.pathname : "/";
    let parentPathnameBase = routeMatch ? routeMatch.pathnameBase : "/";
    let parentRoute = routeMatch && routeMatch.route;

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
      warningOnce(parentPathname, !parentRoute || parentPath.endsWith("*"), "You rendered descendant <Routes> (or called `useRoutes()`) at " + ("\"" + parentPathname + "\" (under <Route path=\"" + parentPath + "\">) but the ") + "parent route path has no trailing \"*\". This means if you navigate " + "deeper, the parent won't match anymore and therefore the child " + "routes will never render.\n\n" + ("Please change the parent <Route path=\"" + parentPath + "\"> to <Route ") + ("path=\"" + (parentPath === "/" ? "*" : parentPath + "/*") + "\">."));
    }

    let locationFromContext = useLocation();
    let location;

    if (locationArg) {
      var _parsedLocationArg$pa;

      let parsedLocationArg = typeof locationArg === "string" ? router.parsePath(locationArg) : locationArg;
      !(parentPathnameBase === "/" || ((_parsedLocationArg$pa = parsedLocationArg.pathname) == null ? void 0 : _parsedLocationArg$pa.startsWith(parentPathnameBase))) ?  router.invariant(false, "When overriding the location using `<Routes location>` or `useRoutes(routes, location)`, " + "the location pathname must begin with the portion of the URL pathname that was " + ("matched by all parent routes. The current pathname base is \"" + parentPathnameBase + "\" ") + ("but pathname \"" + parsedLocationArg.pathname + "\" was given in the `location` prop."))  : void 0;
      location = parsedLocationArg;
    } else {
      location = locationFromContext;
    }

    let pathname = location.pathname || "/";
    let remainingPathname = parentPathnameBase === "/" ? pathname : pathname.slice(parentPathnameBase.length) || "/";
    let matches = router.matchRoutes(routes, {
      pathname: remainingPathname
    });

    {
       router.warning(parentRoute || matches != null, "No routes matched location \"" + location.pathname + location.search + location.hash + "\" ") ;
       router.warning(matches == null || matches[matches.length - 1].route.element !== undefined, "Matched leaf route at location \"" + location.pathname + location.search + location.hash + "\" does not have an element. " + "This means it will render an <Outlet /> with a null value by default resulting in an \"empty\" page.") ;
    }

    return _renderMatches(matches && matches.map(match => Object.assign({}, match, {
      params: Object.assign({}, parentParams, match.params),
      pathname: router.joinPaths([parentPathnameBase, match.pathname]),
      pathnameBase: match.pathnameBase === "/" ? parentPathnameBase : router.joinPaths([parentPathnameBase, match.pathnameBase])
    })), parentMatches, dataRouterStateContext);
  }

  function DefaultErrorElement() {
    let error = useRouteError();
    let lightgrey = "rgba(200,200,200, 0.5)";
    let preStyles = {
      padding: "0.5rem",
      backgroundColor: lightgrey
    };
    let codeStyles = {
      padding: "2px 4px",
      backgroundColor: lightgrey
    };
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("h2", null, "Unhandled Thrown Error!"), /*#__PURE__*/React.createElement("p", {
      style: {
        fontStyle: "italic"
      }
    }, (error == null ? void 0 : error.message) || error), error != null && error.stack ? /*#__PURE__*/React.createElement("pre", {
      style: preStyles
    }, error == null ? void 0 : error.stack) : null, /*#__PURE__*/React.createElement("p", null, "\uD83D\uDCBF Hey developer \uD83D\uDC4B"), /*#__PURE__*/React.createElement("p", null, "You can provide a way better UX than this when your app throws errors by providing your own\xA0", /*#__PURE__*/React.createElement("code", {
      style: codeStyles
    }, "errorElement"), " props on\xA0", /*#__PURE__*/React.createElement("code", {
      style: codeStyles
    }, "<Route>")));
  }

  class RenderErrorBoundary extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        location: props.location,
        error: props.error
      };
    }

    static getDerivedStateFromError(error) {
      return {
        error: error
      };
    }

    static getDerivedStateFromProps(props, state) {
      // When we get into an error state, the user will likely click "back" to the
      // previous page that didn't have an error. Because this wraps the entire
      // application, that will have no effect--the error page continues to display.
      // This gives us a mechanism to recover from the error when the location changes.
      //
      // Whether we're in an error state or not, we update the location in state
      // so that when we are in an error state, it gets reset when a new location
      // comes in and the user recovers from the error.
      if (state.location !== props.location) {
        return {
          error: props.error,
          location: props.location
        };
      } // If we're not changing locations, preserve the location but still surface
      // any new errors that may come through. We retain the existing error, we do
      // this because the error provided from the app state may be cleared without
      // the location changing.


      return {
        error: props.error || state.error,
        location: state.location
      };
    }

    componentDidCatch(error, errorInfo) {
      console.error("React Router caught the following error during render", error, errorInfo);
    }

    render() {
      return this.state.error ? /*#__PURE__*/React.createElement(RouteErrorContext.Provider, {
        value: this.state.error,
        children: this.props.component
      }) : this.props.children;
    }

  }
  function _renderMatches(matches, parentMatches, dataRouterState) {
    if (parentMatches === void 0) {
      parentMatches = [];
    }

    if (matches == null) return null;
    let renderedMatches = matches; // If we have data errors, trim matches to the highest error boundary

    let errors = dataRouterState == null ? void 0 : dataRouterState.errors;

    if (errors != null) {
      let errorIndex = renderedMatches.findIndex(m => m.route.id && (errors == null ? void 0 : errors[m.route.id]));
      !(errorIndex >= 0) ?  router.invariant(false, "Could not find a matching route for the current errors: " + errors)  : void 0;
      renderedMatches = renderedMatches.slice(0, Math.min(renderedMatches.length, errorIndex + 1));
    }

    return renderedMatches.reduceRight((outlet, match, index) => {
      let error = match.route.id ? errors == null ? void 0 : errors[match.route.id] : null; // Only data routers handle errors

      let errorElement = dataRouterState ? match.route.errorElement || /*#__PURE__*/React.createElement(DefaultErrorElement, null) : null;

      let getChildren = () => /*#__PURE__*/React.createElement(RouteContext.Provider, {
        children: error ? errorElement : match.route.element !== undefined ? match.route.element : outlet,
        value: {
          outlet,
          matches: parentMatches.concat(renderedMatches.slice(0, index + 1))
        }
      }); // Only wrap in an error boundary within data router usages when we have an
      // errorElement on this route.  Otherwise let it bubble up to an ancestor
      // errorElement


      return dataRouterState && (match.route.errorElement || index === 0) ? /*#__PURE__*/React.createElement(RenderErrorBoundary, {
        location: dataRouterState.location,
        component: errorElement,
        error: error,
        children: getChildren()
      }) : getChildren();
    }, null);
  }
  var DataRouterHook;

  (function (DataRouterHook) {
    DataRouterHook["UseLoaderData"] = "useLoaderData";
    DataRouterHook["UseActionData"] = "useActionData";
    DataRouterHook["UseRouteError"] = "useRouteError";
    DataRouterHook["UseNavigation"] = "useNavigation";
    DataRouterHook["UseRouteLoaderData"] = "useRouteLoaderData";
    DataRouterHook["UseMatches"] = "useMatches";
    DataRouterHook["UseRevalidator"] = "useRevalidator";
  })(DataRouterHook || (DataRouterHook = {}));

  function useDataRouterState(hookName) {
    let state = React.useContext(DataRouterStateContext);
    !state ?  router.invariant(false, hookName + " must be used within a DataRouter")  : void 0;
    return state;
  }
  /**
   * Returns the current navigation, defaulting to an "idle" navigation when
   * no navigation is in progress
   */


  function useNavigation() {
    let state = useDataRouterState(DataRouterHook.UseNavigation);
    return state.navigation;
  }
  /**
   * Returns a revalidate function for manually triggering revalidation, as well
   * as the current state of any manual revalidations
   */

  function useRevalidator() {
    let router$1 = React.useContext(DataRouterContext);
    !router$1 ?  router.invariant(false, "useRevalidator must be used within a DataRouter")  : void 0;
    let state = useDataRouterState(DataRouterHook.UseRevalidator);
    return {
      revalidate: router$1.revalidate,
      state: state.revalidation
    };
  }
  /**
   * Returns the active route matches, useful for accessing loaderData for
   * parent/child routes or the route "handle" property
   */

  function useMatches() {
    let {
      matches,
      loaderData
    } = useDataRouterState(DataRouterHook.UseMatches);
    return React.useMemo(() => matches.map(match => {
      let {
        pathname,
        params
      } = match;
      return {
        id: match.route.id,
        pathname,
        params,
        data: loaderData[match.route.id],
        handle: match.route.handle
      };
    }), [matches, loaderData]);
  }
  /**
   * Returns the loader data for the nearest ancestor Route loader
   */

  function useLoaderData() {
    var _state$loaderData;

    let state = useDataRouterState(DataRouterHook.UseLoaderData);
    let route = React.useContext(RouteContext);
    !route ?  router.invariant(false, "useLoaderData must be used inside a RouteContext")  : void 0;
    let thisRoute = route.matches[route.matches.length - 1];
    !thisRoute.route.id ?  router.invariant(false, useLoaderData + " can only be used on routes that contain a unique \"id\"")  : void 0;
    return (_state$loaderData = state.loaderData) == null ? void 0 : _state$loaderData[thisRoute.route.id];
  }
  /**
   * Returns the loaderData for the given routeId
   */

  function useRouteLoaderData(routeId) {
    var _state$loaderData2;

    let state = useDataRouterState(DataRouterHook.UseRouteLoaderData);
    return (_state$loaderData2 = state.loaderData) == null ? void 0 : _state$loaderData2[routeId];
  }
  /**
   * Returns the action data for the nearest ancestor Route action
   */

  function useActionData() {
    let state = useDataRouterState(DataRouterHook.UseRouteError);
    let route = React.useContext(RouteContext);
    !route ?  router.invariant(false, "useRouteError must be used inside a RouteContext")  : void 0;
    return Object.values((state == null ? void 0 : state.actionData) || {})[0];
  }
  /**
   * Returns the nearest ancestor Route error, which could be a loader/action
   * error or a render error.  This is intended to be called from your
   * errorElement to display a proper error message.
   */

  function useRouteError() {
    var _state$errors;

    let error = React.useContext(RouteErrorContext);
    let state = useDataRouterState(DataRouterHook.UseRouteError);
    let route = React.useContext(RouteContext);
    let thisRoute = route.matches[route.matches.length - 1]; // If this was a render error, we put it in a RouteError context inside
    // of RenderErrorBoundary

    if (error) {
      return error;
    }

    !route ?  router.invariant(false, "useRouteError must be used inside a RouteContext")  : void 0;
    !thisRoute.route.id ?  router.invariant(false, "useRouteError can only be used on routes that contain a unique \"id\"")  : void 0; // Otherwise look for errors from our data router state

    return (_state$errors = state.errors) == null ? void 0 : _state$errors[thisRoute.route.id];
  }
  const alreadyWarned = {};

  function warningOnce(key, cond, message) {
    if (!cond && !alreadyWarned[key]) {
      alreadyWarned[key] = true;
       router.warning(false, message) ;
    }
  }

  // to avoid issues w.r.t. dual initialization fetches in concurrent rendering.
  // Data router apps are expected to have a static route tree and are not intended
  // to be unmounted/remounted at runtime.

  let routerSingleton;
  /**
   * @private
   */

  function useRenderDataRouter(_ref) {
    let {
      children,
      fallbackElement,
      routes,
      createRouter
    } = _ref;

    if (!routerSingleton) {
      routerSingleton = createRouter(routes || createRoutesFromChildren(children)).initialize();
    }

    let router = routerSingleton; // Sync router state to our component state to force re-renders

    let state = useSyncExternalStore$2(router.subscribe, () => router.state);
    let navigator = React.useMemo(() => {
      return {
        createHref: router.createHref,
        go: n => router.navigate(n),
        push: (to, state) => router.navigate(to, {
          state
        }),
        replace: (to, state) => router.navigate(to, {
          replace: true,
          state
        })
      };
    }, [router]);

    if (!state.initialized) {
      return fallbackElement || null;
    }

    return /*#__PURE__*/React.createElement(DataRouterContext.Provider, {
      value: router
    }, /*#__PURE__*/React.createElement(DataRouterStateContext.Provider, {
      value: state
    }, /*#__PURE__*/React.createElement(Router, {
      location: state.location,
      navigationType: state.historyAction,
      navigator: navigator
    }, /*#__PURE__*/React.createElement(DataRoutes, {
      routes: routes,
      children: children
    }))));
  }
  function DataMemoryRouter(_ref2) {
    let {
      children,
      initialEntries,
      initialIndex,
      hydrationData,
      fallbackElement,
      routes
    } = _ref2;
    return useRenderDataRouter({
      children,
      fallbackElement,
      routes,
      createRouter: routes => router.createMemoryRouter({
        initialEntries,
        initialIndex,
        routes,
        hydrationData
      })
    });
  }

  /**
   * A <Router> that stores all entries in memory.
   *
   * @see https://reactrouter.com/docs/en/v6/routers/memory-router
   */
  function MemoryRouter(_ref3) {
    let {
      basename,
      children,
      initialEntries,
      initialIndex
    } = _ref3;
    let historyRef = React.useRef();

    if (historyRef.current == null) {
      historyRef.current = router.createMemoryHistory({
        initialEntries,
        initialIndex,
        v5Compat: true
      });
    }

    let history = historyRef.current;
    let [state, setState] = React.useState({
      action: history.action,
      location: history.location
    });
    React.useLayoutEffect(() => history.listen(setState), [history]);
    return /*#__PURE__*/React.createElement(Router, {
      basename: basename,
      children: children,
      location: state.location,
      navigationType: state.action,
      navigator: history
    });
  }

  /**
   * Changes the current location.
   *
   * Note: This API is mostly useful in React.Component subclasses that are not
   * able to use hooks. In functional components, we recommend you use the
   * `useNavigate` hook instead.
   *
   * @see https://reactrouter.com/docs/en/v6/components/navigate
   */
  function Navigate(_ref4) {
    let {
      to,
      replace,
      state
    } = _ref4;
    !useInRouterContext() ?  router.invariant(false, // TODO: This error is probably because they somehow have 2 versions of
    // the router loaded. We can help them understand how to avoid that.
    "<Navigate> may be used only in the context of a <Router> component.")  : void 0;
     router.warning(!React.useContext(NavigationContext).static, "<Navigate> must not be used on the initial render in a <StaticRouter>. " + "This is a no-op, but you should modify your code so the <Navigate> is " + "only ever rendered in response to some user interaction or state change.") ;
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
   * @see https://reactrouter.com/docs/en/v6/components/outlet
   */
  function Outlet(props) {
    return useOutlet(props.context);
  }

  /**
   * Declares an element that should be rendered at a certain URL path.
   *
   * @see https://reactrouter.com/docs/en/v6/components/route
   */
  function Route(_props) {
      router.invariant(false, "A <Route> is only ever to be used as the child of <Routes> element, " + "never rendered directly. Please wrap your <Route> in a <Routes>.")  ;
  }

  /**
   * Provides location context for the rest of the app.
   *
   * Note: You usually won't render a <Router> directly. Instead, you'll render a
   * router that is more specific to your environment such as a <BrowserRouter>
   * in web browsers or a <StaticRouter> for server rendering.
   *
   * @see https://reactrouter.com/docs/en/v6/routers/router
   */
  function Router(_ref5) {
    let {
      basename: basenameProp = "/",
      children = null,
      location: locationProp,
      navigationType = router.Action.Pop,
      navigator,
      static: staticProp = false
    } = _ref5;
    !!useInRouterContext() ?  router.invariant(false, "You cannot render a <Router> inside another <Router>." + " You should never have more than one in your app.")  : void 0;
    let basename = router.normalizePathname(basenameProp);
    let navigationContext = React.useMemo(() => ({
      basename,
      navigator,
      static: staticProp
    }), [basename, navigator, staticProp]);

    if (typeof locationProp === "string") {
      locationProp = router.parsePath(locationProp);
    }

    let {
      pathname = "/",
      search = "",
      hash = "",
      state = null,
      key = "default"
    } = locationProp;
    let location = React.useMemo(() => {
      let trailingPathname = router.stripBasename(pathname, basename);

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
     router.warning(location != null, "<Router basename=\"" + basename + "\"> is not able to match the URL " + ("\"" + pathname + search + hash + "\" because it does not start with the ") + "basename, so the <Router> won't render anything.") ;

    if (location == null) {
      return null;
    }

    return /*#__PURE__*/React.createElement(NavigationContext.Provider, {
      value: navigationContext
    }, /*#__PURE__*/React.createElement(LocationContext.Provider, {
      children: children,
      value: {
        location,
        navigationType
      }
    }));
  }

  /**
   * A container for a nested tree of <Route> elements that renders the branch
   * that best matches the current location.
   *
   * @see https://reactrouter.com/docs/en/v6/components/routes
   */
  function Routes(_ref6) {
    let {
      children,
      location
    } = _ref6;
    return useRoutes(createRoutesFromChildren(children), location);
  }

  /**
   * @private
   * Used as an extension to <Routes> and accepts a manual `routes` array to be
   * instead of using JSX children.  Extracted to it's own component to avoid
   * conditional usage of `useRoutes` if we have to render a `fallbackElement`
   */
  function DataRoutes(_ref7) {
    let {
      children,
      location,
      routes
    } = _ref7;
    return useRoutes(routes || createRoutesFromChildren(children), location);
  } ///////////////////////////////////////////////////////////////////////////////
  // UTILS
  ///////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a route config from a React "children" object, which is usually
   * either a `<Route>` element or an array of them. Used internally by
   * `<Routes>` to create a route config from its children.
   *
   * @see https://reactrouter.com/docs/en/v6/utils/create-routes-from-children
   */


  function createRoutesFromChildren(children, parentPath) {
    if (parentPath === void 0) {
      parentPath = [];
    }

    let routes = [];
    React.Children.forEach(children, (element, index) => {
      if (! /*#__PURE__*/React.isValidElement(element)) {
        // Ignore non-elements. This allows people to more easily inline
        // conditionals in their route config.
        return;
      }

      if (element.type === React.Fragment) {
        // Transparently support React.Fragment and its children.
        routes.push.apply(routes, createRoutesFromChildren(element.props.children, parentPath));
        return;
      }

      !(element.type === Route) ?  router.invariant(false, "[" + (typeof element.type === "string" ? element.type : element.type.name) + "] is not a <Route> component. All component children of <Routes> must be a <Route> or <React.Fragment>")  : void 0;
      let treePath = [...parentPath, index];
      let route = {
        id: element.props.id || treePath.join("-"),
        caseSensitive: element.props.caseSensitive,
        element: element.props.element,
        index: element.props.index,
        path: element.props.path,
        loader: element.props.loader,
        action: element.props.action,
        errorElement: element.props.errorElement,
        shouldRevalidate: element.props.shouldRevalidate,
        handle: element.props.handle
      };

      if (element.props.children) {
        route.children = createRoutesFromChildren(element.props.children, treePath);
      }

      routes.push(route);
    });
    return routes;
  }
  /**
   * Renders the result of `matchRoutes()` into a React element.
   */

  function renderMatches(matches, dataRouterState) {
    return _renderMatches(matches, undefined, dataRouterState);
  }

  Object.defineProperty(exports, 'NavigationType', {
    enumerable: true,
    get: function () {
      return router.Action;
    }
  });
  Object.defineProperty(exports, 'createPath', {
    enumerable: true,
    get: function () {
      return router.createPath;
    }
  });
  Object.defineProperty(exports, 'generatePath', {
    enumerable: true,
    get: function () {
      return router.generatePath;
    }
  });
  Object.defineProperty(exports, 'isRouteErrorResponse', {
    enumerable: true,
    get: function () {
      return router.isRouteErrorResponse;
    }
  });
  Object.defineProperty(exports, 'json', {
    enumerable: true,
    get: function () {
      return router.json;
    }
  });
  Object.defineProperty(exports, 'matchPath', {
    enumerable: true,
    get: function () {
      return router.matchPath;
    }
  });
  Object.defineProperty(exports, 'matchRoutes', {
    enumerable: true,
    get: function () {
      return router.matchRoutes;
    }
  });
  Object.defineProperty(exports, 'parsePath', {
    enumerable: true,
    get: function () {
      return router.parsePath;
    }
  });
  Object.defineProperty(exports, 'redirect', {
    enumerable: true,
    get: function () {
      return router.redirect;
    }
  });
  Object.defineProperty(exports, 'resolvePath', {
    enumerable: true,
    get: function () {
      return router.resolvePath;
    }
  });
  exports.DataMemoryRouter = DataMemoryRouter;
  exports.MemoryRouter = MemoryRouter;
  exports.Navigate = Navigate;
  exports.Outlet = Outlet;
  exports.Route = Route;
  exports.Router = Router;
  exports.Routes = Routes;
  exports.UNSAFE_DataRouterContext = DataRouterContext;
  exports.UNSAFE_DataRouterStateContext = DataRouterStateContext;
  exports.UNSAFE_LocationContext = LocationContext;
  exports.UNSAFE_NavigationContext = NavigationContext;
  exports.UNSAFE_RouteContext = RouteContext;
  exports.createRoutesFromChildren = createRoutesFromChildren;
  exports.renderMatches = renderMatches;
  exports.useActionData = useActionData;
  exports.useHref = useHref;
  exports.useInRouterContext = useInRouterContext;
  exports.useLoaderData = useLoaderData;
  exports.useLocation = useLocation;
  exports.useMatch = useMatch;
  exports.useMatches = useMatches;
  exports.useNavigate = useNavigate;
  exports.useNavigation = useNavigation;
  exports.useNavigationType = useNavigationType;
  exports.useOutlet = useOutlet;
  exports.useOutletContext = useOutletContext;
  exports.useParams = useParams;
  exports.useRenderDataRouter = useRenderDataRouter;
  exports.useResolvedPath = useResolvedPath;
  exports.useRevalidator = useRevalidator;
  exports.useRouteError = useRouteError;
  exports.useRouteLoaderData = useRouteLoaderData;
  exports.useRoutes = useRoutes;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=react-router.development.js.map
