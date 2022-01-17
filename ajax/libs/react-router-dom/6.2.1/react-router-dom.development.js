/**
 * React Router DOM v6.2.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('react'), require('history'), require('react-router')) :
  typeof define === 'function' && define.amd ? define(['exports', 'react', 'history', 'react-router'], factory) :
  (global = global || self, factory(global.ReactRouterDOM = {}, global.React, global.HistoryLibrary, global.ReactRouter));
}(this, (function (exports, React, history, reactRouter) { 'use strict';

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

  function _objectWithoutPropertiesLoose(source, excluded) {
    if (source == null) return {};
    var target = {};
    var sourceKeys = Object.keys(source);
    var key, i;

    for (i = 0; i < sourceKeys.length; i++) {
      key = sourceKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      target[key] = source[key];
    }

    return target;
  }

  const _excluded = ["onClick", "reloadDocument", "replace", "state", "target", "to"],
        _excluded2 = ["aria-current", "caseSensitive", "className", "end", "style", "to", "children"];

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
  } ////////////////////////////////////////////////////////////////////////////////
  // COMPONENTS
  ////////////////////////////////////////////////////////////////////////////////

  /**
   * A `<Router>` for use in web browsers. Provides the cleanest URLs.
   */
  function BrowserRouter(_ref) {
    let {
      basename,
      children,
      window
    } = _ref;
    let historyRef = React.useRef();

    if (historyRef.current == null) {
      historyRef.current = history.createBrowserHistory({
        window
      });
    }

    let history$1 = historyRef.current;
    let [state, setState] = React.useState({
      action: history$1.action,
      location: history$1.location
    });
    React.useLayoutEffect(() => history$1.listen(setState), [history$1]);
    return /*#__PURE__*/React.createElement(reactRouter.Router, {
      basename: basename,
      children: children,
      location: state.location,
      navigationType: state.action,
      navigator: history$1
    });
  }

  /**
   * A `<Router>` for use in web browsers. Stores the location in the hash
   * portion of the URL so it is not sent to the server.
   */
  function HashRouter(_ref2) {
    let {
      basename,
      children,
      window
    } = _ref2;
    let historyRef = React.useRef();

    if (historyRef.current == null) {
      historyRef.current = history.createHashHistory({
        window
      });
    }

    let history$1 = historyRef.current;
    let [state, setState] = React.useState({
      action: history$1.action,
      location: history$1.location
    });
    React.useLayoutEffect(() => history$1.listen(setState), [history$1]);
    return /*#__PURE__*/React.createElement(reactRouter.Router, {
      basename: basename,
      children: children,
      location: state.location,
      navigationType: state.action,
      navigator: history$1
    });
  }

  /**
   * A `<Router>` that accepts a pre-instantiated history object. It's important
   * to note that using your own history object is highly discouraged and may add
   * two versions of the history library to your bundles unless you use the same
   * version of the history library that React Router uses internally.
   */
  function HistoryRouter(_ref3) {
    let {
      basename,
      children,
      history
    } = _ref3;
    const [state, setState] = React.useState({
      action: history.action,
      location: history.location
    });
    React.useLayoutEffect(() => history.listen(setState), [history]);
    return /*#__PURE__*/React.createElement(reactRouter.Router, {
      basename: basename,
      children: children,
      location: state.location,
      navigationType: state.action,
      navigator: history
    });
  }

  {
    HistoryRouter.displayName = "unstable_HistoryRouter";
  }

  function isModifiedEvent(event) {
    return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
  }

  /**
   * The public API for rendering a history-aware <a>.
   */
  const Link = /*#__PURE__*/React.forwardRef(function LinkWithRef(_ref4, ref) {
    let {
      onClick,
      reloadDocument,
      replace = false,
      state,
      target,
      to
    } = _ref4,
        rest = _objectWithoutPropertiesLoose(_ref4, _excluded);

    let href = reactRouter.useHref(to);
    let internalOnClick = useLinkClickHandler(to, {
      replace,
      state,
      target
    });

    function handleClick(event) {
      if (onClick) onClick(event);

      if (!event.defaultPrevented && !reloadDocument) {
        internalOnClick(event);
      }
    }

    return (
      /*#__PURE__*/
      // eslint-disable-next-line jsx-a11y/anchor-has-content
      React.createElement("a", _extends({}, rest, {
        href: href,
        onClick: handleClick,
        ref: ref,
        target: target
      }))
    );
  });

  {
    Link.displayName = "Link";
  }

  /**
   * A <Link> wrapper that knows if it's "active" or not.
   */
  const NavLink = /*#__PURE__*/React.forwardRef(function NavLinkWithRef(_ref5, ref) {
    let {
      "aria-current": ariaCurrentProp = "page",
      caseSensitive = false,
      className: classNameProp = "",
      end = false,
      style: styleProp,
      to,
      children
    } = _ref5,
        rest = _objectWithoutPropertiesLoose(_ref5, _excluded2);

    let location = reactRouter.useLocation();
    let path = reactRouter.useResolvedPath(to);
    let locationPathname = location.pathname;
    let toPathname = path.pathname;

    if (!caseSensitive) {
      locationPathname = locationPathname.toLowerCase();
      toPathname = toPathname.toLowerCase();
    }

    let isActive = locationPathname === toPathname || !end && locationPathname.startsWith(toPathname) && locationPathname.charAt(toPathname.length) === "/";
    let ariaCurrent = isActive ? ariaCurrentProp : undefined;
    let className;

    if (typeof classNameProp === "function") {
      className = classNameProp({
        isActive
      });
    } else {
      // If the className prop is not a function, we use a default `active`
      // class for <NavLink />s that are active. In v5 `active` was the default
      // value for `activeClassName`, but we are removing that API and can still
      // use the old default behavior for a cleaner upgrade path and keep the
      // simple styling rules working as they currently do.
      className = [classNameProp, isActive ? "active" : null].filter(Boolean).join(" ");
    }

    let style = typeof styleProp === "function" ? styleProp({
      isActive
    }) : styleProp;
    return /*#__PURE__*/React.createElement(Link, _extends({}, rest, {
      "aria-current": ariaCurrent,
      className: className,
      ref: ref,
      style: style,
      to: to
    }), typeof children === "function" ? children({
      isActive
    }) : children);
  });

  {
    NavLink.displayName = "NavLink";
  } ////////////////////////////////////////////////////////////////////////////////
  // HOOKS
  ////////////////////////////////////////////////////////////////////////////////

  /**
   * Handles the click behavior for router `<Link>` components. This is useful if
   * you need to create custom `<Link>` components with the same click behavior we
   * use in our exported `<Link>`.
   */


  function useLinkClickHandler(to, _temp) {
    let {
      target,
      replace: replaceProp,
      state
    } = _temp === void 0 ? {} : _temp;
    let navigate = reactRouter.useNavigate();
    let location = reactRouter.useLocation();
    let path = reactRouter.useResolvedPath(to);
    return React.useCallback(event => {
      if (event.button === 0 && ( // Ignore everything but left clicks
      !target || target === "_self") && // Let browser handle "target=_blank" etc.
      !isModifiedEvent(event) // Ignore clicks with modifier keys
      ) {
        event.preventDefault(); // If the URL hasn't changed, a regular <a> will do a replace instead of
        // a push, so do the same here.

        let replace = !!replaceProp || history.createPath(location) === history.createPath(path);
        navigate(to, {
          replace,
          state
        });
      }
    }, [location, navigate, path, replaceProp, state, target, to]);
  }
  /**
   * A convenient wrapper for reading and writing search parameters via the
   * URLSearchParams interface.
   */

  function useSearchParams(defaultInit) {
     warning(typeof URLSearchParams !== "undefined", "You cannot use the `useSearchParams` hook in a browser that does not " + "support the URLSearchParams API. If you need to support Internet " + "Explorer 11, we recommend you load a polyfill such as " + "https://github.com/ungap/url-search-params\n\n" + "If you're unsure how to load polyfills, we recommend you check out " + "https://polyfill.io/v3/ which provides some recommendations about how " + "to load polyfills only for users that need them, instead of for every " + "user.") ;
    let defaultSearchParamsRef = React.useRef(createSearchParams(defaultInit));
    let location = reactRouter.useLocation();
    let searchParams = React.useMemo(() => {
      let searchParams = createSearchParams(location.search);

      for (let key of defaultSearchParamsRef.current.keys()) {
        if (!searchParams.has(key)) {
          defaultSearchParamsRef.current.getAll(key).forEach(value => {
            searchParams.append(key, value);
          });
        }
      }

      return searchParams;
    }, [location.search]);
    let navigate = reactRouter.useNavigate();
    let setSearchParams = React.useCallback((nextInit, navigateOptions) => {
      navigate("?" + createSearchParams(nextInit), navigateOptions);
    }, [navigate]);
    return [searchParams, setSearchParams];
  }

  /**
   * Creates a URLSearchParams object using the given initializer.
   *
   * This is identical to `new URLSearchParams(init)` except it also
   * supports arrays as values in the object form of the initializer
   * instead of just strings. This is convenient when you need multiple
   * values for a given key, but don't want to use an array initializer.
   *
   * For example, instead of:
   *
   *   let searchParams = new URLSearchParams([
   *     ['sort', 'name'],
   *     ['sort', 'price']
   *   ]);
   *
   * you can do:
   *
   *   let searchParams = createSearchParams({
   *     sort: ['name', 'price']
   *   });
   */
  function createSearchParams(init) {
    if (init === void 0) {
      init = "";
    }

    return new URLSearchParams(typeof init === "string" || Array.isArray(init) || init instanceof URLSearchParams ? init : Object.keys(init).reduce((memo, key) => {
      let value = init[key];
      return memo.concat(Array.isArray(value) ? value.map(v => [key, v]) : [[key, value]]);
    }, []));
  }

  Object.defineProperty(exports, 'MemoryRouter', {
    enumerable: true,
    get: function () {
      return reactRouter.MemoryRouter;
    }
  });
  Object.defineProperty(exports, 'Navigate', {
    enumerable: true,
    get: function () {
      return reactRouter.Navigate;
    }
  });
  Object.defineProperty(exports, 'Outlet', {
    enumerable: true,
    get: function () {
      return reactRouter.Outlet;
    }
  });
  Object.defineProperty(exports, 'Route', {
    enumerable: true,
    get: function () {
      return reactRouter.Route;
    }
  });
  Object.defineProperty(exports, 'Router', {
    enumerable: true,
    get: function () {
      return reactRouter.Router;
    }
  });
  Object.defineProperty(exports, 'Routes', {
    enumerable: true,
    get: function () {
      return reactRouter.Routes;
    }
  });
  Object.defineProperty(exports, 'UNSAFE_LocationContext', {
    enumerable: true,
    get: function () {
      return reactRouter.UNSAFE_LocationContext;
    }
  });
  Object.defineProperty(exports, 'UNSAFE_NavigationContext', {
    enumerable: true,
    get: function () {
      return reactRouter.UNSAFE_NavigationContext;
    }
  });
  Object.defineProperty(exports, 'UNSAFE_RouteContext', {
    enumerable: true,
    get: function () {
      return reactRouter.UNSAFE_RouteContext;
    }
  });
  Object.defineProperty(exports, 'createRoutesFromChildren', {
    enumerable: true,
    get: function () {
      return reactRouter.createRoutesFromChildren;
    }
  });
  Object.defineProperty(exports, 'generatePath', {
    enumerable: true,
    get: function () {
      return reactRouter.generatePath;
    }
  });
  Object.defineProperty(exports, 'matchPath', {
    enumerable: true,
    get: function () {
      return reactRouter.matchPath;
    }
  });
  Object.defineProperty(exports, 'matchRoutes', {
    enumerable: true,
    get: function () {
      return reactRouter.matchRoutes;
    }
  });
  Object.defineProperty(exports, 'renderMatches', {
    enumerable: true,
    get: function () {
      return reactRouter.renderMatches;
    }
  });
  Object.defineProperty(exports, 'resolvePath', {
    enumerable: true,
    get: function () {
      return reactRouter.resolvePath;
    }
  });
  Object.defineProperty(exports, 'useHref', {
    enumerable: true,
    get: function () {
      return reactRouter.useHref;
    }
  });
  Object.defineProperty(exports, 'useInRouterContext', {
    enumerable: true,
    get: function () {
      return reactRouter.useInRouterContext;
    }
  });
  Object.defineProperty(exports, 'useLocation', {
    enumerable: true,
    get: function () {
      return reactRouter.useLocation;
    }
  });
  Object.defineProperty(exports, 'useMatch', {
    enumerable: true,
    get: function () {
      return reactRouter.useMatch;
    }
  });
  Object.defineProperty(exports, 'useNavigate', {
    enumerable: true,
    get: function () {
      return reactRouter.useNavigate;
    }
  });
  Object.defineProperty(exports, 'useNavigationType', {
    enumerable: true,
    get: function () {
      return reactRouter.useNavigationType;
    }
  });
  Object.defineProperty(exports, 'useOutlet', {
    enumerable: true,
    get: function () {
      return reactRouter.useOutlet;
    }
  });
  Object.defineProperty(exports, 'useOutletContext', {
    enumerable: true,
    get: function () {
      return reactRouter.useOutletContext;
    }
  });
  Object.defineProperty(exports, 'useParams', {
    enumerable: true,
    get: function () {
      return reactRouter.useParams;
    }
  });
  Object.defineProperty(exports, 'useResolvedPath', {
    enumerable: true,
    get: function () {
      return reactRouter.useResolvedPath;
    }
  });
  Object.defineProperty(exports, 'useRoutes', {
    enumerable: true,
    get: function () {
      return reactRouter.useRoutes;
    }
  });
  exports.BrowserRouter = BrowserRouter;
  exports.HashRouter = HashRouter;
  exports.Link = Link;
  exports.NavLink = NavLink;
  exports.createSearchParams = createSearchParams;
  exports.unstable_HistoryRouter = HistoryRouter;
  exports.useLinkClickHandler = useLinkClickHandler;
  exports.useSearchParams = useSearchParams;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=react-router-dom.development.js.map
