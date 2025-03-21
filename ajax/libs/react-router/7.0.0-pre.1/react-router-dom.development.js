/**
 * React Router v7.0.0-pre.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('react'), require('react-dom'), require('react-router')) :
  typeof define === 'function' && define.amd ? define(['exports', 'react', 'react-dom', 'react-router'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.ReactRouterDOMExport = {}, global.React, global.ReactDOM, global.ReactRouter));
})(this, (function (exports, React, ReactDOM, reactRouter) { 'use strict';

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
  var ReactDOM__namespace = /*#__PURE__*/_interopNamespace(ReactDOM);

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

  let ssrInfo = null;
  let router = null;
  function initSsrInfo() {
    if (!ssrInfo && window.__reactRouterContext && window.__reactRouterManifest && window.__reactRouterRouteModules) {
      ssrInfo = {
        context: window.__reactRouterContext,
        manifest: window.__reactRouterManifest,
        routeModules: window.__reactRouterRouteModules,
        stateDecodingPromise: undefined,
        router: undefined,
        routerInitialized: false
      };
    }
  }
  function createHydratedRouter() {
    initSsrInfo();
    if (!ssrInfo) {
      throw new Error("You must be using the SSR features of React Router in order to skip " + "passing a `router` prop to `<RouterProvider>`");
    }

    // We need to suspend until the initial state snapshot is decoded into
    // window.__reactRouterContext.state

    let localSsrInfo = ssrInfo;
    // Note: `stateDecodingPromise` is not coupled to `router` - we'll reach this
    // code potentially many times waiting for our state to arrive, but we'll
    // then only get past here and create the `router` one time
    if (!ssrInfo.stateDecodingPromise) {
      let stream = ssrInfo.context.stream;
      !stream ? reactRouter.UNSAFE_invariant(false, "No stream found for single fetch decoding")  : void 0;
      ssrInfo.context.stream = undefined;
      ssrInfo.stateDecodingPromise = reactRouter.UNSAFE_decodeViaTurboStream(stream, window).then(value => {
        ssrInfo.context.state = value.value;
        localSsrInfo.stateDecodingPromise.value = true;
      }).catch(e => {
        localSsrInfo.stateDecodingPromise.error = e;
      });
    }
    if (ssrInfo.stateDecodingPromise.error) {
      throw ssrInfo.stateDecodingPromise.error;
    }
    if (!ssrInfo.stateDecodingPromise.value) {
      throw ssrInfo.stateDecodingPromise;
    }
    let routes = reactRouter.UNSAFE_createClientRoutes(ssrInfo.manifest.routes, ssrInfo.routeModules, ssrInfo.context.state, ssrInfo.context.isSpaMode);
    let hydrationData = undefined;
    if (!ssrInfo.context.isSpaMode) {
      var _window$__reactRouter;
      // Create a shallow clone of `loaderData` we can mutate for partial hydration.
      // When a route exports a `clientLoader` and a `HydrateFallback`, the SSR will
      // render the fallback so we need the client to do the same for hydration.
      // The server loader data has already been exposed to these route `clientLoader`'s
      // in `createClientRoutes` above, so we need to clear out the version we pass to
      // `createBrowserRouter` so it initializes and runs the client loaders.
      hydrationData = _extends({}, ssrInfo.context.state, {
        loaderData: _extends({}, ssrInfo.context.state.loaderData)
      });
      let initialMatches = reactRouter.matchRoutes(routes, window.location, (_window$__reactRouter = window.__reactRouterContext) == null ? void 0 : _window$__reactRouter.basename);
      if (initialMatches) {
        for (let match of initialMatches) {
          let routeId = match.route.id;
          let route = ssrInfo.routeModules[routeId];
          let manifestRoute = ssrInfo.manifest.routes[routeId];
          // Clear out the loaderData to avoid rendering the route component when the
          // route opted into clientLoader hydration and either:
          // * gave us a HydrateFallback
          // * or doesn't have a server loader and we have no data to render
          if (route && reactRouter.UNSAFE_shouldHydrateRouteLoader(manifestRoute, route, ssrInfo.context.isSpaMode) && (route.HydrateFallback || !manifestRoute.hasLoader)) {
            delete hydrationData.loaderData[routeId];
          } else if (manifestRoute && !manifestRoute.hasLoader) {
            // Since every Remix route gets a `loader` on the client side to load
            // the route JS module, we need to add a `null` value to `loaderData`
            // for any routes that don't have server loaders so our partial
            // hydration logic doesn't kick off the route module loaders during
            // hydration
            hydrationData.loaderData[routeId] = null;
          }
        }
      }
      if (hydrationData && hydrationData.errors) {
        // TODO: De-dup this or remove entirely in v7 where single fetch is the
        // only approach and we have already serialized or deserialized on the server
        hydrationData.errors = reactRouter.UNSAFE_deserializeErrors(hydrationData.errors);
      }
    }

    // We don't use createBrowserRouter here because we need fine-grained control
    // over initialization to support synchronous `clientLoader` flows.
    let router = reactRouter.UNSAFE_createRouter({
      routes,
      history: reactRouter.UNSAFE_createBrowserHistory(),
      basename: ssrInfo.context.basename,
      hydrationData,
      mapRouteProperties: reactRouter.UNSAFE_mapRouteProperties,
      dataStrategy: reactRouter.UNSAFE_getSingleFetchDataStrategy(ssrInfo.manifest, ssrInfo.routeModules, () => router),
      patchRoutesOnNavigation: reactRouter.UNSAFE_getPatchRoutesOnNavigationFunction(ssrInfo.manifest, ssrInfo.routeModules, ssrInfo.context.isSpaMode, ssrInfo.context.basename)
    });
    ssrInfo.router = router;

    // We can call initialize() immediately if the router doesn't have any
    // loaders to run on hydration
    if (router.state.initialized) {
      ssrInfo.routerInitialized = true;
      router.initialize();
    }

    // @ts-ignore
    router.createRoutesForHMR = /* spacer so ts-ignore does not affect the right hand of the assignment */
    reactRouter.UNSAFE_createClientRoutesWithHMRRevalidationOptOut;
    window.__reactRouterDataRouter = router;
    return router;
  }

  /**
   * @category Router Components
   */
  function HydratedRouter() {
    var _ssrInfo;
    if (!router) {
      router = createHydratedRouter();
    }

    // Critical CSS can become stale after code changes, e.g. styles might be
    // removed from a component, but the styles will still be present in the
    // server HTML. This allows our HMR logic to clear the critical CSS state.
    let [criticalCss, setCriticalCss] = React__namespace.useState((_ssrInfo = ssrInfo) == null ? void 0 : _ssrInfo.context.criticalCss );
    {
      if (ssrInfo) {
        window.__reactRouterClearCriticalCss = () => setCriticalCss(undefined);
      }
    }
    let [location, setLocation] = React__namespace.useState(router.state.location);
    React__namespace.useLayoutEffect(() => {
      // If we had to run clientLoaders on hydration, we delay initialization until
      // after we've hydrated to avoid hydration issues from synchronous client loaders
      if (ssrInfo && ssrInfo.router && !ssrInfo.routerInitialized) {
        ssrInfo.routerInitialized = true;
        ssrInfo.router.initialize();
      }
    }, []);
    React__namespace.useLayoutEffect(() => {
      if (ssrInfo && ssrInfo.router) {
        return ssrInfo.router.subscribe(newState => {
          if (newState.location !== location) {
            setLocation(newState.location);
          }
        });
      }
    }, [location]);
    !ssrInfo ? reactRouter.UNSAFE_invariant(false, "ssrInfo unavailable for HydratedRouter")  : void 0;
    reactRouter.UNSAFE_useFogOFWarDiscovery(router, ssrInfo.manifest, ssrInfo.routeModules, ssrInfo.context.isSpaMode);

    // We need to include a wrapper RemixErrorBoundary here in case the root error
    // boundary also throws and we need to bubble up outside of the router entirely.
    // Then we need a stateful location here so the user can back-button navigate
    // out of there
    return (
      /*#__PURE__*/
      // This fragment is important to ensure we match the <ServerRouter> JSX
      // structure so that useId values hydrate correctly
      React__namespace.createElement(React__namespace.Fragment, null, /*#__PURE__*/React__namespace.createElement(reactRouter.UNSAFE_FrameworkContext.Provider, {
        value: {
          manifest: ssrInfo.manifest,
          routeModules: ssrInfo.routeModules,
          future: ssrInfo.context.future,
          criticalCss,
          isSpaMode: ssrInfo.context.isSpaMode
        }
      }, /*#__PURE__*/React__namespace.createElement(reactRouter.UNSAFE_RemixErrorBoundary, {
        location: location
      }, /*#__PURE__*/React__namespace.createElement(RouterProvider, {
        router: router
      }))), /*#__PURE__*/React__namespace.createElement(React__namespace.Fragment, null))
    );
  }

  function RouterProvider(props) {
    return /*#__PURE__*/React__namespace.createElement(reactRouter.RouterProvider, _extends({
      flushSync: ReactDOM__namespace.flushSync
    }, props));
  }

  exports.HydratedRouter = HydratedRouter;
  exports.RouterProvider = RouterProvider;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=react-router-dom.development.js.map
