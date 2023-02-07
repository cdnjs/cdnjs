/**
 * React Router DOM v6.8.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('react'), require('react-router'), require('@remix-run/router')) :
  typeof define === 'function' && define.amd ? define(['exports', 'react', 'react-router', '@remix-run/router'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.ReactRouterDOM = {}, global.React, global.ReactRouter, global.RemixRouter));
})(this, (function (exports, React, reactRouter, router) { 'use strict';

  function _interopNamespace(e) {
    if (e && e.__esModule) return e;
    var n = Object.create(null);
    if (e) {
      Object.keys(e).forEach(function (k) {
        if (k !== 'default') {
          var d = Object.getOwnPropertyDescriptor(e, k);
          Object.defineProperty(n, k, d.get ? d : {
            enumerable: true,
            get: function () { return e[k]; }
          });
        }
      });
    }
    n["default"] = e;
    return Object.freeze(n);
  }

  var React__namespace = /*#__PURE__*/_interopNamespace(React);

  function _extends() {
    _extends = Object.assign ? Object.assign.bind() : function (target) {
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

  const defaultMethod = "get";
  const defaultEncType = "application/x-www-form-urlencoded";
  function isHtmlElement(object) {
    return object != null && typeof object.tagName === "string";
  }
  function isButtonElement(object) {
    return isHtmlElement(object) && object.tagName.toLowerCase() === "button";
  }
  function isFormElement(object) {
    return isHtmlElement(object) && object.tagName.toLowerCase() === "form";
  }
  function isInputElement(object) {
    return isHtmlElement(object) && object.tagName.toLowerCase() === "input";
  }

  function isModifiedEvent(event) {
    return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
  }

  function shouldProcessLinkClick(event, target) {
    return event.button === 0 && ( // Ignore everything but left clicks
    !target || target === "_self") && // Let browser handle "target=_blank" etc.
    !isModifiedEvent(event) // Ignore clicks with modifier keys
    ;
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
  function getSearchParamsForLocation(locationSearch, defaultSearchParams) {
    let searchParams = createSearchParams(locationSearch);

    if (defaultSearchParams) {
      for (let key of defaultSearchParams.keys()) {
        if (!searchParams.has(key)) {
          defaultSearchParams.getAll(key).forEach(value => {
            searchParams.append(key, value);
          });
        }
      }
    }

    return searchParams;
  }
  function getFormSubmissionInfo(target, defaultAction, options) {
    let method;
    let action;
    let encType;
    let formData;

    if (isFormElement(target)) {
      let submissionTrigger = options.submissionTrigger;
      method = options.method || target.getAttribute("method") || defaultMethod;
      action = options.action || target.getAttribute("action") || defaultAction;
      encType = options.encType || target.getAttribute("enctype") || defaultEncType;
      formData = new FormData(target);

      if (submissionTrigger && submissionTrigger.name) {
        formData.append(submissionTrigger.name, submissionTrigger.value);
      }
    } else if (isButtonElement(target) || isInputElement(target) && (target.type === "submit" || target.type === "image")) {
      let form = target.form;

      if (form == null) {
        throw new Error("Cannot submit a <button> or <input type=\"submit\"> without a <form>");
      } // <button>/<input type="submit"> may override attributes of <form>


      method = options.method || target.getAttribute("formmethod") || form.getAttribute("method") || defaultMethod;
      action = options.action || target.getAttribute("formaction") || form.getAttribute("action") || defaultAction;
      encType = options.encType || target.getAttribute("formenctype") || form.getAttribute("enctype") || defaultEncType;
      formData = new FormData(form); // Include name + value from a <button>, appending in case the button name
      // matches an existing input name

      if (target.name) {
        formData.append(target.name, target.value);
      }
    } else if (isHtmlElement(target)) {
      throw new Error("Cannot submit element that is not <form>, <button>, or " + "<input type=\"submit|image\">");
    } else {
      method = options.method || defaultMethod;
      action = options.action || defaultAction;
      encType = options.encType || defaultEncType;

      if (target instanceof FormData) {
        formData = target;
      } else {
        formData = new FormData();

        if (target instanceof URLSearchParams) {
          for (let [name, value] of target) {
            formData.append(name, value);
          }
        } else if (target != null) {
          for (let name of Object.keys(target)) {
            formData.append(name, target[name]);
          }
        }
      }
    }

    let {
      protocol,
      host
    } = window.location;
    let url = new URL(action, protocol + "//" + host);
    return {
      url,
      method: method.toLowerCase(),
      encType,
      formData
    };
  }

  const _excluded = ["onClick", "relative", "reloadDocument", "replace", "state", "target", "to", "preventScrollReset"],
        _excluded2 = ["aria-current", "caseSensitive", "className", "end", "style", "to", "children"],
        _excluded3 = ["reloadDocument", "replace", "method", "action", "onSubmit", "fetcherKey", "routeId", "relative", "preventScrollReset"];

  ////////////////////////////////////////////////////////////////////////////////
  //#region Routers
  ////////////////////////////////////////////////////////////////////////////////
  function createBrowserRouter(routes, opts) {
    return router.createRouter({
      basename: opts == null ? void 0 : opts.basename,
      history: router.createBrowserHistory({
        window: opts == null ? void 0 : opts.window
      }),
      hydrationData: (opts == null ? void 0 : opts.hydrationData) || parseHydrationData(),
      routes: reactRouter.UNSAFE_enhanceManualRouteObjects(routes)
    }).initialize();
  }
  function createHashRouter(routes, opts) {
    return router.createRouter({
      basename: opts == null ? void 0 : opts.basename,
      history: router.createHashHistory({
        window: opts == null ? void 0 : opts.window
      }),
      hydrationData: (opts == null ? void 0 : opts.hydrationData) || parseHydrationData(),
      routes: reactRouter.UNSAFE_enhanceManualRouteObjects(routes)
    }).initialize();
  }

  function parseHydrationData() {
    var _window;

    let state = (_window = window) == null ? void 0 : _window.__staticRouterHydrationData;

    if (state && state.errors) {
      state = _extends({}, state, {
        errors: deserializeErrors(state.errors)
      });
    }

    return state;
  }

  function deserializeErrors(errors) {
    if (!errors) return null;
    let entries = Object.entries(errors);
    let serialized = {};

    for (let [key, val] of entries) {
      // Hey you!  If you change this, please change the corresponding logic in
      // serializeErrors in react-router-dom/server.tsx :)
      if (val && val.__type === "RouteErrorResponse") {
        serialized[key] = new router.ErrorResponse(val.status, val.statusText, val.data, val.internal === true);
      } else if (val && val.__type === "Error") {
        let error = new Error(val.message); // Wipe away the client-side stack trace.  Nothing to fill it in with
        // because we don't serialize SSR stack traces for security reasons

        error.stack = "";
        serialized[key] = error;
      } else {
        serialized[key] = val;
      }
    }

    return serialized;
  } //#endregion
  ////////////////////////////////////////////////////////////////////////////////
  //#region Components
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
    let historyRef = React__namespace.useRef();

    if (historyRef.current == null) {
      historyRef.current = router.createBrowserHistory({
        window,
        v5Compat: true
      });
    }

    let history = historyRef.current;
    let [state, setState] = React__namespace.useState({
      action: history.action,
      location: history.location
    });
    React__namespace.useLayoutEffect(() => history.listen(setState), [history]);
    return /*#__PURE__*/React__namespace.createElement(reactRouter.Router, {
      basename: basename,
      children: children,
      location: state.location,
      navigationType: state.action,
      navigator: history
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
    let historyRef = React__namespace.useRef();

    if (historyRef.current == null) {
      historyRef.current = router.createHashHistory({
        window,
        v5Compat: true
      });
    }

    let history = historyRef.current;
    let [state, setState] = React__namespace.useState({
      action: history.action,
      location: history.location
    });
    React__namespace.useLayoutEffect(() => history.listen(setState), [history]);
    return /*#__PURE__*/React__namespace.createElement(reactRouter.Router, {
      basename: basename,
      children: children,
      location: state.location,
      navigationType: state.action,
      navigator: history
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
    const [state, setState] = React__namespace.useState({
      action: history.action,
      location: history.location
    });
    React__namespace.useLayoutEffect(() => history.listen(setState), [history]);
    return /*#__PURE__*/React__namespace.createElement(reactRouter.Router, {
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
  const isBrowser = typeof window !== "undefined" && typeof window.document !== "undefined" && typeof window.document.createElement !== "undefined";
  /**
   * The public API for rendering a history-aware <a>.
   */

  const Link = /*#__PURE__*/React__namespace.forwardRef(function LinkWithRef(_ref4, ref) {
    let {
      onClick,
      relative,
      reloadDocument,
      replace,
      state,
      target,
      to,
      preventScrollReset
    } = _ref4,
        rest = _objectWithoutPropertiesLoose(_ref4, _excluded);

    // Rendered into <a href> for absolute URLs
    let absoluteHref;
    let isExternal = false;

    if (isBrowser && typeof to === "string" && /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(to)) {
      absoluteHref = to;
      let currentUrl = new URL(window.location.href);
      let targetUrl = to.startsWith("//") ? new URL(currentUrl.protocol + to) : new URL(to);

      if (targetUrl.origin === currentUrl.origin) {
        // Strip the protocol/origin for same-origin absolute URLs
        to = targetUrl.pathname + targetUrl.search + targetUrl.hash;
      } else {
        isExternal = true;
      }
    } // Rendered into <a href> for relative URLs


    let href = reactRouter.useHref(to, {
      relative
    });
    let internalOnClick = useLinkClickHandler(to, {
      replace,
      state,
      target,
      preventScrollReset,
      relative
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
      React__namespace.createElement("a", _extends({}, rest, {
        href: absoluteHref || href,
        onClick: isExternal || reloadDocument ? onClick : handleClick,
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
  const NavLink = /*#__PURE__*/React__namespace.forwardRef(function NavLinkWithRef(_ref5, ref) {
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

    let path = reactRouter.useResolvedPath(to, {
      relative: rest.relative
    });
    let location = reactRouter.useLocation();
    let routerState = React__namespace.useContext(reactRouter.UNSAFE_DataRouterStateContext);
    let {
      navigator
    } = React__namespace.useContext(reactRouter.UNSAFE_NavigationContext);
    let toPathname = navigator.encodeLocation ? navigator.encodeLocation(path).pathname : path.pathname;
    let locationPathname = location.pathname;
    let nextLocationPathname = routerState && routerState.navigation && routerState.navigation.location ? routerState.navigation.location.pathname : null;

    if (!caseSensitive) {
      locationPathname = locationPathname.toLowerCase();
      nextLocationPathname = nextLocationPathname ? nextLocationPathname.toLowerCase() : null;
      toPathname = toPathname.toLowerCase();
    }

    let isActive = locationPathname === toPathname || !end && locationPathname.startsWith(toPathname) && locationPathname.charAt(toPathname.length) === "/";
    let isPending = nextLocationPathname != null && (nextLocationPathname === toPathname || !end && nextLocationPathname.startsWith(toPathname) && nextLocationPathname.charAt(toPathname.length) === "/");
    let ariaCurrent = isActive ? ariaCurrentProp : undefined;
    let className;

    if (typeof classNameProp === "function") {
      className = classNameProp({
        isActive,
        isPending
      });
    } else {
      // If the className prop is not a function, we use a default `active`
      // class for <NavLink />s that are active. In v5 `active` was the default
      // value for `activeClassName`, but we are removing that API and can still
      // use the old default behavior for a cleaner upgrade path and keep the
      // simple styling rules working as they currently do.
      className = [classNameProp, isActive ? "active" : null, isPending ? "pending" : null].filter(Boolean).join(" ");
    }

    let style = typeof styleProp === "function" ? styleProp({
      isActive,
      isPending
    }) : styleProp;
    return /*#__PURE__*/React__namespace.createElement(Link, _extends({}, rest, {
      "aria-current": ariaCurrent,
      className: className,
      ref: ref,
      style: style,
      to: to
    }), typeof children === "function" ? children({
      isActive,
      isPending
    }) : children);
  });

  {
    NavLink.displayName = "NavLink";
  }

  /**
   * A `@remix-run/router`-aware `<form>`. It behaves like a normal form except
   * that the interaction with the server is with `fetch` instead of new document
   * requests, allowing components to add nicer UX to the page as the form is
   * submitted and returns with data.
   */
  const Form = /*#__PURE__*/React__namespace.forwardRef((props, ref) => {
    return /*#__PURE__*/React__namespace.createElement(FormImpl, _extends({}, props, {
      ref: ref
    }));
  });

  {
    Form.displayName = "Form";
  }

  const FormImpl = /*#__PURE__*/React__namespace.forwardRef((_ref6, forwardedRef) => {
    let {
      reloadDocument,
      replace,
      method = defaultMethod,
      action,
      onSubmit,
      fetcherKey,
      routeId,
      relative,
      preventScrollReset
    } = _ref6,
        props = _objectWithoutPropertiesLoose(_ref6, _excluded3);

    let submit = useSubmitImpl(fetcherKey, routeId);
    let formMethod = method.toLowerCase() === "get" ? "get" : "post";
    let formAction = useFormAction(action, {
      relative
    });

    let submitHandler = event => {
      onSubmit && onSubmit(event);
      if (event.defaultPrevented) return;
      event.preventDefault();
      let submitter = event.nativeEvent.submitter;
      let submitMethod = (submitter == null ? void 0 : submitter.getAttribute("formmethod")) || method;
      submit(submitter || event.currentTarget, {
        method: submitMethod,
        replace,
        relative,
        preventScrollReset
      });
    };

    return /*#__PURE__*/React__namespace.createElement("form", _extends({
      ref: forwardedRef,
      method: formMethod,
      action: formAction,
      onSubmit: reloadDocument ? onSubmit : submitHandler
    }, props));
  });

  {
    FormImpl.displayName = "FormImpl";
  }

  /**
   * This component will emulate the browser's scroll restoration on location
   * changes.
   */
  function ScrollRestoration(_ref7) {
    let {
      getKey,
      storageKey
    } = _ref7;
    useScrollRestoration({
      getKey,
      storageKey
    });
    return null;
  }

  {
    ScrollRestoration.displayName = "ScrollRestoration";
  } //#endregion
  ////////////////////////////////////////////////////////////////////////////////
  //#region Hooks
  ////////////////////////////////////////////////////////////////////////////////


  var DataRouterHook;

  (function (DataRouterHook) {
    DataRouterHook["UseScrollRestoration"] = "useScrollRestoration";
    DataRouterHook["UseSubmitImpl"] = "useSubmitImpl";
    DataRouterHook["UseFetcher"] = "useFetcher";
  })(DataRouterHook || (DataRouterHook = {}));

  var DataRouterStateHook;

  (function (DataRouterStateHook) {
    DataRouterStateHook["UseFetchers"] = "useFetchers";
    DataRouterStateHook["UseScrollRestoration"] = "useScrollRestoration";
  })(DataRouterStateHook || (DataRouterStateHook = {}));

  function getDataRouterConsoleError(hookName) {
    return hookName + " must be used within a data router.  See https://reactrouter.com/routers/picking-a-router.";
  }

  function useDataRouterContext(hookName) {
    let ctx = React__namespace.useContext(reactRouter.UNSAFE_DataRouterContext);
    !ctx ? router.invariant(false, getDataRouterConsoleError(hookName))  : void 0;
    return ctx;
  }

  function useDataRouterState(hookName) {
    let state = React__namespace.useContext(reactRouter.UNSAFE_DataRouterStateContext);
    !state ? router.invariant(false, getDataRouterConsoleError(hookName))  : void 0;
    return state;
  }
  /**
   * Handles the click behavior for router `<Link>` components. This is useful if
   * you need to create custom `<Link>` components with the same click behavior we
   * use in our exported `<Link>`.
   */


  function useLinkClickHandler(to, _temp) {
    let {
      target,
      replace: replaceProp,
      state,
      preventScrollReset,
      relative
    } = _temp === void 0 ? {} : _temp;
    let navigate = reactRouter.useNavigate();
    let location = reactRouter.useLocation();
    let path = reactRouter.useResolvedPath(to, {
      relative
    });
    return React__namespace.useCallback(event => {
      if (shouldProcessLinkClick(event, target)) {
        event.preventDefault(); // If the URL hasn't changed, a regular <a> will do a replace instead of
        // a push, so do the same here unless the replace prop is explicitly set

        let replace = replaceProp !== undefined ? replaceProp : reactRouter.createPath(location) === reactRouter.createPath(path);
        navigate(to, {
          replace,
          state,
          preventScrollReset,
          relative
        });
      }
    }, [location, navigate, path, replaceProp, state, target, to, preventScrollReset, relative]);
  }
  /**
   * A convenient wrapper for reading and writing search parameters via the
   * URLSearchParams interface.
   */

  function useSearchParams(defaultInit) {
    warning(typeof URLSearchParams !== "undefined", "You cannot use the `useSearchParams` hook in a browser that does not " + "support the URLSearchParams API. If you need to support Internet " + "Explorer 11, we recommend you load a polyfill such as " + "https://github.com/ungap/url-search-params\n\n" + "If you're unsure how to load polyfills, we recommend you check out " + "https://polyfill.io/v3/ which provides some recommendations about how " + "to load polyfills only for users that need them, instead of for every " + "user.") ;
    let defaultSearchParamsRef = React__namespace.useRef(createSearchParams(defaultInit));
    let hasSetSearchParamsRef = React__namespace.useRef(false);
    let location = reactRouter.useLocation();
    let searchParams = React__namespace.useMemo(() => // Only merge in the defaults if we haven't yet called setSearchParams.
    // Once we call that we want those to take precedence, otherwise you can't
    // remove a param with setSearchParams({}) if it has an initial value
    getSearchParamsForLocation(location.search, hasSetSearchParamsRef.current ? null : defaultSearchParamsRef.current), [location.search]);
    let navigate = reactRouter.useNavigate();
    let setSearchParams = React__namespace.useCallback((nextInit, navigateOptions) => {
      const newSearchParams = createSearchParams(typeof nextInit === "function" ? nextInit(searchParams) : nextInit);
      hasSetSearchParamsRef.current = true;
      navigate("?" + newSearchParams, navigateOptions);
    }, [navigate, searchParams]);
    return [searchParams, setSearchParams];
  }

  /**
   * Returns a function that may be used to programmatically submit a form (or
   * some arbitrary data) to the server.
   */
  function useSubmit() {
    return useSubmitImpl();
  }

  function useSubmitImpl(fetcherKey, routeId) {
    let {
      router: router$1
    } = useDataRouterContext(DataRouterHook.UseSubmitImpl);
    let defaultAction = useFormAction();
    return React__namespace.useCallback(function (target, options) {
      if (options === void 0) {
        options = {};
      }

      if (typeof document === "undefined") {
        throw new Error("You are calling submit during the server render. " + "Try calling submit within a `useEffect` or callback instead.");
      }

      let {
        method,
        encType,
        formData,
        url
      } = getFormSubmissionInfo(target, defaultAction, options);
      let href = url.pathname + url.search;
      let opts = {
        replace: options.replace,
        preventScrollReset: options.preventScrollReset,
        formData,
        formMethod: method,
        formEncType: encType
      };

      if (fetcherKey) {
        !(routeId != null) ? router.invariant(false, "No routeId available for useFetcher()")  : void 0;
        router$1.fetch(fetcherKey, routeId, href, opts);
      } else {
        router$1.navigate(href, opts);
      }
    }, [defaultAction, router$1, fetcherKey, routeId]);
  }

  function useFormAction(action, _temp2) {
    let {
      relative
    } = _temp2 === void 0 ? {} : _temp2;
    let {
      basename
    } = React__namespace.useContext(reactRouter.UNSAFE_NavigationContext);
    let routeContext = React__namespace.useContext(reactRouter.UNSAFE_RouteContext);
    !routeContext ? router.invariant(false, "useFormAction must be used inside a RouteContext")  : void 0;
    let [match] = routeContext.matches.slice(-1); // Shallow clone path so we can modify it below, otherwise we modify the
    // object referenced by useMemo inside useResolvedPath

    let path = _extends({}, reactRouter.useResolvedPath(action ? action : ".", {
      relative
    })); // Previously we set the default action to ".". The problem with this is that
    // `useResolvedPath(".")` excludes search params and the hash of the resolved
    // URL. This is the intended behavior of when "." is specifically provided as
    // the form action, but inconsistent w/ browsers when the action is omitted.
    // https://github.com/remix-run/remix/issues/927


    let location = reactRouter.useLocation();

    if (action == null) {
      // Safe to write to these directly here since if action was undefined, we
      // would have called useResolvedPath(".") which will never include a search
      // or hash
      path.search = location.search;
      path.hash = location.hash; // When grabbing search params from the URL, remove the automatically
      // inserted ?index param so we match the useResolvedPath search behavior
      // which would not include ?index

      if (match.route.index) {
        let params = new URLSearchParams(path.search);
        params.delete("index");
        path.search = params.toString() ? "?" + params.toString() : "";
      }
    }

    if ((!action || action === ".") && match.route.index) {
      path.search = path.search ? path.search.replace(/^\?/, "?index&") : "?index";
    } // If we're operating within a basename, prepend it to the pathname prior
    // to creating the form action.  If this is a root navigation, then just use
    // the raw basename which allows the basename to have full control over the
    // presence of a trailing slash on root actions


    if (basename !== "/") {
      path.pathname = path.pathname === "/" ? basename : router.joinPaths([basename, path.pathname]);
    }

    return reactRouter.createPath(path);
  }

  function createFetcherForm(fetcherKey, routeId) {
    let FetcherForm = /*#__PURE__*/React__namespace.forwardRef((props, ref) => {
      return /*#__PURE__*/React__namespace.createElement(FormImpl, _extends({}, props, {
        ref: ref,
        fetcherKey: fetcherKey,
        routeId: routeId
      }));
    });

    {
      FetcherForm.displayName = "fetcher.Form";
    }

    return FetcherForm;
  }

  let fetcherId = 0;

  /**
   * Interacts with route loaders and actions without causing a navigation. Great
   * for any interaction that stays on the same page.
   */
  function useFetcher() {
    var _route$matches;

    let {
      router: router$1
    } = useDataRouterContext(DataRouterHook.UseFetcher);
    let route = React__namespace.useContext(reactRouter.UNSAFE_RouteContext);
    !route ? router.invariant(false, "useFetcher must be used inside a RouteContext")  : void 0;
    let routeId = (_route$matches = route.matches[route.matches.length - 1]) == null ? void 0 : _route$matches.route.id;
    !(routeId != null) ? router.invariant(false, "useFetcher can only be used on routes that contain a unique \"id\"")  : void 0;
    let [fetcherKey] = React__namespace.useState(() => String(++fetcherId));
    let [Form] = React__namespace.useState(() => {
      !routeId ? router.invariant(false, "No routeId available for fetcher.Form()")  : void 0;
      return createFetcherForm(fetcherKey, routeId);
    });
    let [load] = React__namespace.useState(() => href => {
      !router$1 ? router.invariant(false, "No router available for fetcher.load()")  : void 0;
      !routeId ? router.invariant(false, "No routeId available for fetcher.load()")  : void 0;
      router$1.fetch(fetcherKey, routeId, href);
    });
    let submit = useSubmitImpl(fetcherKey, routeId);
    let fetcher = router$1.getFetcher(fetcherKey);
    let fetcherWithComponents = React__namespace.useMemo(() => _extends({
      Form,
      submit,
      load
    }, fetcher), [fetcher, Form, submit, load]);
    React__namespace.useEffect(() => {
      // Is this busted when the React team gets real weird and calls effects
      // twice on mount?  We really just need to garbage collect here when this
      // fetcher is no longer around.
      return () => {
        if (!router$1) {
          console.warn("No fetcher available to clean up from useFetcher()");
          return;
        }

        router$1.deleteFetcher(fetcherKey);
      };
    }, [router$1, fetcherKey]);
    return fetcherWithComponents;
  }
  /**
   * Provides all fetchers currently on the page. Useful for layouts and parent
   * routes that need to provide pending/optimistic UI regarding the fetch.
   */

  function useFetchers() {
    let state = useDataRouterState(DataRouterStateHook.UseFetchers);
    return [...state.fetchers.values()];
  }
  const SCROLL_RESTORATION_STORAGE_KEY = "react-router-scroll-positions";
  let savedScrollPositions = {};
  /**
   * When rendered inside a RouterProvider, will restore scroll positions on navigations
   */

  function useScrollRestoration(_temp3) {
    let {
      getKey,
      storageKey
    } = _temp3 === void 0 ? {} : _temp3;
    let {
      router
    } = useDataRouterContext(DataRouterHook.UseScrollRestoration);
    let {
      restoreScrollPosition,
      preventScrollReset
    } = useDataRouterState(DataRouterStateHook.UseScrollRestoration);
    let location = reactRouter.useLocation();
    let matches = reactRouter.useMatches();
    let navigation = reactRouter.useNavigation(); // Trigger manual scroll restoration while we're active

    React__namespace.useEffect(() => {
      window.history.scrollRestoration = "manual";
      return () => {
        window.history.scrollRestoration = "auto";
      };
    }, []); // Save positions on pagehide

    usePageHide(React__namespace.useCallback(() => {
      if (navigation.state === "idle") {
        let key = (getKey ? getKey(location, matches) : null) || location.key;
        savedScrollPositions[key] = window.scrollY;
      }

      sessionStorage.setItem(storageKey || SCROLL_RESTORATION_STORAGE_KEY, JSON.stringify(savedScrollPositions));
      window.history.scrollRestoration = "auto";
    }, [storageKey, getKey, navigation.state, location, matches])); // Read in any saved scroll locations

    if (typeof document !== "undefined") {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      React__namespace.useLayoutEffect(() => {
        try {
          let sessionPositions = sessionStorage.getItem(storageKey || SCROLL_RESTORATION_STORAGE_KEY);

          if (sessionPositions) {
            savedScrollPositions = JSON.parse(sessionPositions);
          }
        } catch (e) {// no-op, use default empty object
        }
      }, [storageKey]); // Enable scroll restoration in the router
      // eslint-disable-next-line react-hooks/rules-of-hooks

      React__namespace.useLayoutEffect(() => {
        let disableScrollRestoration = router == null ? void 0 : router.enableScrollRestoration(savedScrollPositions, () => window.scrollY, getKey);
        return () => disableScrollRestoration && disableScrollRestoration();
      }, [router, getKey]); // Restore scrolling when state.restoreScrollPosition changes
      // eslint-disable-next-line react-hooks/rules-of-hooks

      React__namespace.useLayoutEffect(() => {
        // Explicit false means don't do anything (used for submissions)
        if (restoreScrollPosition === false) {
          return;
        } // been here before, scroll to it


        if (typeof restoreScrollPosition === "number") {
          window.scrollTo(0, restoreScrollPosition);
          return;
        } // try to scroll to the hash


        if (location.hash) {
          let el = document.getElementById(location.hash.slice(1));

          if (el) {
            el.scrollIntoView();
            return;
          }
        } // Don't reset if this navigation opted out


        if (preventScrollReset === true) {
          return;
        } // otherwise go to the top on new locations


        window.scrollTo(0, 0);
      }, [location, restoreScrollPosition, preventScrollReset]);
    }
  }
  /**
   * Setup a callback to be fired on the window's `beforeunload` event. This is
   * useful for saving some data to `window.localStorage` just before the page
   * refreshes.
   *
   * Note: The `callback` argument should be a function created with
   * `React.useCallback()`.
   */


  function useBeforeUnload(callback, options) {
    let {
      capture
    } = options || {};
    React__namespace.useEffect(() => {
      let opts = capture != null ? {
        capture
      } : undefined;
      window.addEventListener("beforeunload", callback, opts);
      return () => {
        window.removeEventListener("beforeunload", callback, opts);
      };
    }, [callback, capture]);
  }
  /**
   * Setup a callback to be fired on the window's `pagehide` event. This is
   * useful for saving some data to `window.localStorage` just before the page
   * refreshes.  This event is better supported than beforeunload across browsers.
   *
   * Note: The `callback` argument should be a function created with
   * `React.useCallback()`.
   */

  function usePageHide(callback, options) {
    let {
      capture
    } = options || {};
    React__namespace.useEffect(() => {
      let opts = capture != null ? {
        capture
      } : undefined;
      window.addEventListener("pagehide", callback, opts);
      return () => {
        window.removeEventListener("pagehide", callback, opts);
      };
    }, [callback, capture]);
  }
  /**
   * Wrapper around useBlocker to show a window.confirm prompt to users instead
   * of building a custom UI with useBlocker.
   *
   * Warning: This has *a lot of rough edges* and behaves very differently (and
   * very incorrectly in some cases) across browsers if user click addition
   * back/forward navigations while the confirm is open.  Use at your own risk.
   */


  function usePrompt(_ref8) {
    let {
      when,
      message
    } = _ref8;
    let blocker = reactRouter.unstable_useBlocker(when);
    React__namespace.useEffect(() => {
      if (blocker.state === "blocked" && !when) {
        blocker.reset();
      }
    }, [blocker, when]);
    React__namespace.useEffect(() => {
      if (blocker.state === "blocked") {
        let proceed = window.confirm(message);

        if (proceed) {
          setTimeout(blocker.proceed, 0);
        } else {
          blocker.reset();
        }
      }
    }, [blocker, message]);
  }
  ////////////////////////////////////////////////////////////////////////////////
  //#region Utils
  ////////////////////////////////////////////////////////////////////////////////

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
  } //#endregion

  Object.defineProperty(exports, 'AbortedDeferredError', {
    enumerable: true,
    get: function () { return reactRouter.AbortedDeferredError; }
  });
  Object.defineProperty(exports, 'Await', {
    enumerable: true,
    get: function () { return reactRouter.Await; }
  });
  Object.defineProperty(exports, 'MemoryRouter', {
    enumerable: true,
    get: function () { return reactRouter.MemoryRouter; }
  });
  Object.defineProperty(exports, 'Navigate', {
    enumerable: true,
    get: function () { return reactRouter.Navigate; }
  });
  Object.defineProperty(exports, 'NavigationType', {
    enumerable: true,
    get: function () { return reactRouter.NavigationType; }
  });
  Object.defineProperty(exports, 'Outlet', {
    enumerable: true,
    get: function () { return reactRouter.Outlet; }
  });
  Object.defineProperty(exports, 'Route', {
    enumerable: true,
    get: function () { return reactRouter.Route; }
  });
  Object.defineProperty(exports, 'Router', {
    enumerable: true,
    get: function () { return reactRouter.Router; }
  });
  Object.defineProperty(exports, 'RouterProvider', {
    enumerable: true,
    get: function () { return reactRouter.RouterProvider; }
  });
  Object.defineProperty(exports, 'Routes', {
    enumerable: true,
    get: function () { return reactRouter.Routes; }
  });
  Object.defineProperty(exports, 'UNSAFE_DataRouterContext', {
    enumerable: true,
    get: function () { return reactRouter.UNSAFE_DataRouterContext; }
  });
  Object.defineProperty(exports, 'UNSAFE_DataRouterStateContext', {
    enumerable: true,
    get: function () { return reactRouter.UNSAFE_DataRouterStateContext; }
  });
  Object.defineProperty(exports, 'UNSAFE_LocationContext', {
    enumerable: true,
    get: function () { return reactRouter.UNSAFE_LocationContext; }
  });
  Object.defineProperty(exports, 'UNSAFE_NavigationContext', {
    enumerable: true,
    get: function () { return reactRouter.UNSAFE_NavigationContext; }
  });
  Object.defineProperty(exports, 'UNSAFE_RouteContext', {
    enumerable: true,
    get: function () { return reactRouter.UNSAFE_RouteContext; }
  });
  Object.defineProperty(exports, 'UNSAFE_enhanceManualRouteObjects', {
    enumerable: true,
    get: function () { return reactRouter.UNSAFE_enhanceManualRouteObjects; }
  });
  Object.defineProperty(exports, 'createMemoryRouter', {
    enumerable: true,
    get: function () { return reactRouter.createMemoryRouter; }
  });
  Object.defineProperty(exports, 'createPath', {
    enumerable: true,
    get: function () { return reactRouter.createPath; }
  });
  Object.defineProperty(exports, 'createRoutesFromChildren', {
    enumerable: true,
    get: function () { return reactRouter.createRoutesFromChildren; }
  });
  Object.defineProperty(exports, 'createRoutesFromElements', {
    enumerable: true,
    get: function () { return reactRouter.createRoutesFromElements; }
  });
  Object.defineProperty(exports, 'defer', {
    enumerable: true,
    get: function () { return reactRouter.defer; }
  });
  Object.defineProperty(exports, 'generatePath', {
    enumerable: true,
    get: function () { return reactRouter.generatePath; }
  });
  Object.defineProperty(exports, 'isRouteErrorResponse', {
    enumerable: true,
    get: function () { return reactRouter.isRouteErrorResponse; }
  });
  Object.defineProperty(exports, 'json', {
    enumerable: true,
    get: function () { return reactRouter.json; }
  });
  Object.defineProperty(exports, 'matchPath', {
    enumerable: true,
    get: function () { return reactRouter.matchPath; }
  });
  Object.defineProperty(exports, 'matchRoutes', {
    enumerable: true,
    get: function () { return reactRouter.matchRoutes; }
  });
  Object.defineProperty(exports, 'parsePath', {
    enumerable: true,
    get: function () { return reactRouter.parsePath; }
  });
  Object.defineProperty(exports, 'redirect', {
    enumerable: true,
    get: function () { return reactRouter.redirect; }
  });
  Object.defineProperty(exports, 'renderMatches', {
    enumerable: true,
    get: function () { return reactRouter.renderMatches; }
  });
  Object.defineProperty(exports, 'resolvePath', {
    enumerable: true,
    get: function () { return reactRouter.resolvePath; }
  });
  Object.defineProperty(exports, 'unstable_useBlocker', {
    enumerable: true,
    get: function () { return reactRouter.unstable_useBlocker; }
  });
  Object.defineProperty(exports, 'useActionData', {
    enumerable: true,
    get: function () { return reactRouter.useActionData; }
  });
  Object.defineProperty(exports, 'useAsyncError', {
    enumerable: true,
    get: function () { return reactRouter.useAsyncError; }
  });
  Object.defineProperty(exports, 'useAsyncValue', {
    enumerable: true,
    get: function () { return reactRouter.useAsyncValue; }
  });
  Object.defineProperty(exports, 'useHref', {
    enumerable: true,
    get: function () { return reactRouter.useHref; }
  });
  Object.defineProperty(exports, 'useInRouterContext', {
    enumerable: true,
    get: function () { return reactRouter.useInRouterContext; }
  });
  Object.defineProperty(exports, 'useLoaderData', {
    enumerable: true,
    get: function () { return reactRouter.useLoaderData; }
  });
  Object.defineProperty(exports, 'useLocation', {
    enumerable: true,
    get: function () { return reactRouter.useLocation; }
  });
  Object.defineProperty(exports, 'useMatch', {
    enumerable: true,
    get: function () { return reactRouter.useMatch; }
  });
  Object.defineProperty(exports, 'useMatches', {
    enumerable: true,
    get: function () { return reactRouter.useMatches; }
  });
  Object.defineProperty(exports, 'useNavigate', {
    enumerable: true,
    get: function () { return reactRouter.useNavigate; }
  });
  Object.defineProperty(exports, 'useNavigation', {
    enumerable: true,
    get: function () { return reactRouter.useNavigation; }
  });
  Object.defineProperty(exports, 'useNavigationType', {
    enumerable: true,
    get: function () { return reactRouter.useNavigationType; }
  });
  Object.defineProperty(exports, 'useOutlet', {
    enumerable: true,
    get: function () { return reactRouter.useOutlet; }
  });
  Object.defineProperty(exports, 'useOutletContext', {
    enumerable: true,
    get: function () { return reactRouter.useOutletContext; }
  });
  Object.defineProperty(exports, 'useParams', {
    enumerable: true,
    get: function () { return reactRouter.useParams; }
  });
  Object.defineProperty(exports, 'useResolvedPath', {
    enumerable: true,
    get: function () { return reactRouter.useResolvedPath; }
  });
  Object.defineProperty(exports, 'useRevalidator', {
    enumerable: true,
    get: function () { return reactRouter.useRevalidator; }
  });
  Object.defineProperty(exports, 'useRouteError', {
    enumerable: true,
    get: function () { return reactRouter.useRouteError; }
  });
  Object.defineProperty(exports, 'useRouteLoaderData', {
    enumerable: true,
    get: function () { return reactRouter.useRouteLoaderData; }
  });
  Object.defineProperty(exports, 'useRoutes', {
    enumerable: true,
    get: function () { return reactRouter.useRoutes; }
  });
  exports.BrowserRouter = BrowserRouter;
  exports.Form = Form;
  exports.HashRouter = HashRouter;
  exports.Link = Link;
  exports.NavLink = NavLink;
  exports.ScrollRestoration = ScrollRestoration;
  exports.UNSAFE_useScrollRestoration = useScrollRestoration;
  exports.createBrowserRouter = createBrowserRouter;
  exports.createHashRouter = createHashRouter;
  exports.createSearchParams = createSearchParams;
  exports.unstable_HistoryRouter = HistoryRouter;
  exports.unstable_usePrompt = usePrompt;
  exports.useBeforeUnload = useBeforeUnload;
  exports.useFetcher = useFetcher;
  exports.useFetchers = useFetchers;
  exports.useFormAction = useFormAction;
  exports.useLinkClickHandler = useLinkClickHandler;
  exports.useSearchParams = useSearchParams;
  exports.useSubmit = useSubmit;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=react-router-dom.development.js.map
