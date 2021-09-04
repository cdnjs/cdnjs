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

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

    return arr2;
  }

  function _createForOfIteratorHelperLoose(o, allowArrayLike) {
    var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
    if (it) return (it = it.call(o)).next.bind(it);

    if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
      if (it) o = it;
      var i = 0;
      return function () {
        if (i >= o.length) return {
          done: true
        };
        return {
          done: false,
          value: o[i++]
        };
      };
    }

    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  var _excluded = ["onClick", "replace", "state", "target", "to"],
      _excluded2 = ["aria-current", "caseSensitive", "className", "end", "style", "to"];

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
  /**
   * A <Router> for use in web browsers. Provides the cleanest URLs.
   */

  function BrowserRouter(_ref) {
    var children = _ref.children,
        window = _ref.window;
    var historyRef = React.useRef();

    if (historyRef.current == null) {
      historyRef.current = history.createBrowserHistory({
        window: window
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
    return /*#__PURE__*/React.createElement(reactRouter.Router, {
      children: children,
      action: state.action,
      location: state.location,
      navigator: history$1
    });
  }
  /**
   * A <Router> for use in web browsers. Stores the location in the hash
   * portion of the URL so it is not sent to the server.
   */

  function HashRouter(_ref2) {
    var children = _ref2.children,
        window = _ref2.window;
    var historyRef = React.useRef();

    if (historyRef.current == null) {
      historyRef.current = history.createHashHistory({
        window: window
      });
    }

    var history$1 = historyRef.current;

    var _React$useState2 = React.useState({
      action: history$1.action,
      location: history$1.location
    }),
        state = _React$useState2[0],
        setState = _React$useState2[1];

    React.useLayoutEffect(function () {
      return history$1.listen(setState);
    }, [history$1]);
    return /*#__PURE__*/React.createElement(reactRouter.Router, {
      children: children,
      action: state.action,
      location: state.location,
      navigator: history$1
    });
  }

  function isModifiedEvent(event) {
    return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
  }
  /**
   * The public API for rendering a history-aware <a>.
   */


  var Link = /*#__PURE__*/React.forwardRef(function LinkWithRef(_ref3, ref) {
    var onClick = _ref3.onClick,
        _ref3$replace = _ref3.replace,
        replace = _ref3$replace === void 0 ? false : _ref3$replace,
        state = _ref3.state,
        target = _ref3.target,
        to = _ref3.to,
        rest = _objectWithoutPropertiesLoose(_ref3, _excluded);

    var href = reactRouter.useHref(to);
    var internalOnClick = useLinkClickHandler(to, {
      replace: replace,
      state: state,
      target: target
    });

    function handleClick(event) {
      if (onClick) onClick(event);

      if (!event.defaultPrevented) {
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


  var NavLink = /*#__PURE__*/React.forwardRef(function NavLinkWithRef(_ref4, ref) {
    var _ref4$ariaCurrent = _ref4["aria-current"],
        ariaCurrentProp = _ref4$ariaCurrent === void 0 ? "page" : _ref4$ariaCurrent,
        _ref4$caseSensitive = _ref4.caseSensitive,
        caseSensitive = _ref4$caseSensitive === void 0 ? false : _ref4$caseSensitive,
        _ref4$className = _ref4.className,
        classNameProp = _ref4$className === void 0 ? "" : _ref4$className,
        _ref4$end = _ref4.end,
        end = _ref4$end === void 0 ? false : _ref4$end,
        styleProp = _ref4.style,
        to = _ref4.to,
        rest = _objectWithoutPropertiesLoose(_ref4, _excluded2);

    var location = reactRouter.useLocation();
    var path = reactRouter.useResolvedPath(to);
    var locationPathname = location.pathname;
    var toPathname = path.pathname;

    if (!caseSensitive) {
      locationPathname = locationPathname.toLowerCase();
      toPathname = toPathname.toLowerCase();
    }

    var isActive = end ? locationPathname === toPathname : locationPathname.startsWith(toPathname);
    var ariaCurrent = isActive ? ariaCurrentProp : undefined;
    var className;

    if (typeof classNameProp === "function") {
      className = classNameProp({
        isActive: isActive
      });
    } else {
      // If the className prop is not a function, we use a default `active`
      // class for <NavLink />s that are active. In v5 `active` was the default
      // value for `activeClassName`, but we are removing that API and can still
      // use the old default behavior for a cleraner upgrade path and keep the
      // simple styling rules working as the currently do.
      className = [classNameProp, isActive ? "active" : null].filter(Boolean).join(" ");
    }

    var style = typeof styleProp === "function" ? styleProp({
      isActive: isActive
    }) : styleProp;
    return /*#__PURE__*/React.createElement(Link, _extends({}, rest, {
      "aria-current": ariaCurrent,
      className: className,
      ref: ref,
      style: style,
      to: to
    }));
  });

  {
    NavLink.displayName = "NavLink";
  }
  /**
   * A declarative interface for showing a window.confirm dialog with the given
   * message when the user tries to navigate away from the current page.
   *
   * This also serves as a reference implementation for anyone who wants to
   * create their own custom prompt component.
   */


  function Prompt(_ref5) {
    var message = _ref5.message,
        when = _ref5.when;
    usePrompt(message, when);
    return null;
  } ////////////////////////////////////////////////////////////////////////////////
  // HOOKS
  ////////////////////////////////////////////////////////////////////////////////

  /**
   * Handles the click behavior for router `<Link>` components. This is useful if
   * you need to create custom `<Link>` compoments with the same click behavior we
   * use in our exported `<Link>`.
   */

  function useLinkClickHandler(to, _temp) {
    var _ref6 = _temp === void 0 ? {} : _temp,
        target = _ref6.target,
        replaceProp = _ref6.replace,
        state = _ref6.state;

    var navigate = reactRouter.useNavigate();
    var location = reactRouter.useLocation();
    var path = reactRouter.useResolvedPath(to);
    return function handleClick(event) {
      if (event.button === 0 && ( // Ignore everything but left clicks
      !target || target === "_self") && // Let browser handle "target=_blank" etc.
      !isModifiedEvent(event) // Ignore clicks with modifier keys
      ) {
          event.preventDefault(); // If the URL hasn't changed, a regular <a> will do a replace instead of
          // a push, so do the same here.

          var replace = !!replaceProp || history.createPath(location) === history.createPath(path);
          navigate(to, {
            replace: replace,
            state: state
          });
        }
    };
  }
  /**
   * Prevents navigation away from the current page using a window.confirm prompt
   * with the given message.
   */

  function usePrompt(message, when) {
    if (when === void 0) {
      when = true;
    }

    var blocker = React.useCallback(function (tx) {
      if (window.confirm(message)) tx.retry();
    }, [message]);
    reactRouter.useBlocker(blocker, when);
  }
  /**
   * A convenient wrapper for reading and writing search parameters via the
   * URLSearchParams interface.
   */

  function useSearchParams(defaultInit) {
     warning(typeof URLSearchParams !== "undefined", "You cannot use the `useSearchParams` hook in a browser that does not " + "support the URLSearchParams API. If you need to support Internet " + "Explorer 11, we recommend you load a polyfill such as " + "https://github.com/ungap/url-search-params\n\n" + "If you're unsure how to load polyfills, we recommend you check out " + "https://polyfill.io/v3/ which provides some recommendations about how " + "to load polyfills only for users that need them, instead of for every " + "user.") ;
    var defaultSearchParamsRef = React.useRef(createSearchParams(defaultInit));
    var location = reactRouter.useLocation();
    var searchParams = React.useMemo(function () {
      var searchParams = createSearchParams(location.search);

      var _loop = function _loop() {
        var key = _step.value;

        if (!searchParams.has(key)) {
          defaultSearchParamsRef.current.getAll(key).forEach(function (value) {
            searchParams.append(key, value);
          });
        }
      };

      for (var _iterator = _createForOfIteratorHelperLoose(defaultSearchParamsRef.current.keys()), _step; !(_step = _iterator()).done;) {
        _loop();
      }

      return searchParams;
    }, [location.search]);
    var navigate = reactRouter.useNavigate();
    var setSearchParams = React.useCallback(function (nextInit, navigateOptions) {
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

    return new URLSearchParams(typeof init === "string" || Array.isArray(init) || init instanceof URLSearchParams ? init : Object.keys(init).reduce(function (memo, key) {
      var value = init[key];
      return memo.concat(Array.isArray(value) ? value.map(function (v) {
        return [key, v];
      }) : [[key, value]]);
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
  Object.defineProperty(exports, 'UNSAFE_NavigatorContext', {
    enumerable: true,
    get: function () {
      return reactRouter.UNSAFE_NavigatorContext;
    }
  });
  Object.defineProperty(exports, 'UNSAFE_RouteContext', {
    enumerable: true,
    get: function () {
      return reactRouter.UNSAFE_RouteContext;
    }
  });
  Object.defineProperty(exports, 'createRoutesFromArray', {
    enumerable: true,
    get: function () {
      return reactRouter.createRoutesFromArray;
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
  Object.defineProperty(exports, 'resolvePath', {
    enumerable: true,
    get: function () {
      return reactRouter.resolvePath;
    }
  });
  Object.defineProperty(exports, 'useBlocker', {
    enumerable: true,
    get: function () {
      return reactRouter.useBlocker;
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
  Object.defineProperty(exports, 'useOutlet', {
    enumerable: true,
    get: function () {
      return reactRouter.useOutlet;
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
  exports.Prompt = Prompt;
  exports.createSearchParams = createSearchParams;
  exports.useLinkClickHandler = useLinkClickHandler;
  exports.usePrompt = usePrompt;
  exports.useSearchParams = useSearchParams;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=react-router-dom.development.js.map
