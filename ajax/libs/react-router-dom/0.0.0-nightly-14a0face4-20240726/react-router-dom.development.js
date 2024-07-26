/**
 * React Router DOM v0.0.0-nightly-14a0face4-20240726
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('react-router')) :
  typeof define === 'function' && define.amd ? define(['exports', 'react-router'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.ReactRouterDOM = {}, global.ReactRouter));
})(this, (function (exports, reactRouter) { 'use strict';

  let alreadyWarned = false;
  if (!alreadyWarned && typeof console !== "undefined") {
    alreadyWarned = true;
    console.warn("The `react-router-dom` package is deprecated in v7, you can change all " + "of your imports to load directly from the `react-router` package.");
  }

  Object.defineProperty(exports, 'Await', {
    enumerable: true,
    get: function () { return reactRouter.Await; }
  });
  Object.defineProperty(exports, 'BrowserRouter', {
    enumerable: true,
    get: function () { return reactRouter.BrowserRouter; }
  });
  Object.defineProperty(exports, 'Form', {
    enumerable: true,
    get: function () { return reactRouter.Form; }
  });
  Object.defineProperty(exports, 'HashRouter', {
    enumerable: true,
    get: function () { return reactRouter.HashRouter; }
  });
  Object.defineProperty(exports, 'HydratedRouter', {
    enumerable: true,
    get: function () { return reactRouter.HydratedRouter; }
  });
  Object.defineProperty(exports, 'Link', {
    enumerable: true,
    get: function () { return reactRouter.Link; }
  });
  Object.defineProperty(exports, 'Links', {
    enumerable: true,
    get: function () { return reactRouter.Links; }
  });
  Object.defineProperty(exports, 'MemoryRouter', {
    enumerable: true,
    get: function () { return reactRouter.MemoryRouter; }
  });
  Object.defineProperty(exports, 'Meta', {
    enumerable: true,
    get: function () { return reactRouter.Meta; }
  });
  Object.defineProperty(exports, 'NavLink', {
    enumerable: true,
    get: function () { return reactRouter.NavLink; }
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
  Object.defineProperty(exports, 'PrefetchPageLinks', {
    enumerable: true,
    get: function () { return reactRouter.PrefetchPageLinks; }
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
  Object.defineProperty(exports, 'Scripts', {
    enumerable: true,
    get: function () { return reactRouter.Scripts; }
  });
  Object.defineProperty(exports, 'ScrollRestoration', {
    enumerable: true,
    get: function () { return reactRouter.ScrollRestoration; }
  });
  Object.defineProperty(exports, 'ServerRouter', {
    enumerable: true,
    get: function () { return reactRouter.ServerRouter; }
  });
  Object.defineProperty(exports, 'StaticRouter', {
    enumerable: true,
    get: function () { return reactRouter.StaticRouter; }
  });
  Object.defineProperty(exports, 'StaticRouterProvider', {
    enumerable: true,
    get: function () { return reactRouter.StaticRouterProvider; }
  });
  Object.defineProperty(exports, 'UNSAFE_DataRouterContext', {
    enumerable: true,
    get: function () { return reactRouter.UNSAFE_DataRouterContext; }
  });
  Object.defineProperty(exports, 'UNSAFE_DataRouterStateContext', {
    enumerable: true,
    get: function () { return reactRouter.UNSAFE_DataRouterStateContext; }
  });
  Object.defineProperty(exports, 'UNSAFE_ErrorResponseImpl', {
    enumerable: true,
    get: function () { return reactRouter.UNSAFE_ErrorResponseImpl; }
  });
  Object.defineProperty(exports, 'UNSAFE_FetchersContext', {
    enumerable: true,
    get: function () { return reactRouter.UNSAFE_FetchersContext; }
  });
  Object.defineProperty(exports, 'UNSAFE_LocationContext', {
    enumerable: true,
    get: function () { return reactRouter.UNSAFE_LocationContext; }
  });
  Object.defineProperty(exports, 'UNSAFE_NavigationContext', {
    enumerable: true,
    get: function () { return reactRouter.UNSAFE_NavigationContext; }
  });
  Object.defineProperty(exports, 'UNSAFE_RemixContext', {
    enumerable: true,
    get: function () { return reactRouter.UNSAFE_FrameworkContext; }
  });
  Object.defineProperty(exports, 'UNSAFE_RouteContext', {
    enumerable: true,
    get: function () { return reactRouter.UNSAFE_RouteContext; }
  });
  Object.defineProperty(exports, 'UNSAFE_SingleFetchRedirectSymbol', {
    enumerable: true,
    get: function () { return reactRouter.UNSAFE_SingleFetchRedirectSymbol; }
  });
  Object.defineProperty(exports, 'UNSAFE_ViewTransitionContext', {
    enumerable: true,
    get: function () { return reactRouter.UNSAFE_ViewTransitionContext; }
  });
  Object.defineProperty(exports, 'UNSAFE_convertRoutesToDataRoutes', {
    enumerable: true,
    get: function () { return reactRouter.UNSAFE_convertRoutesToDataRoutes; }
  });
  Object.defineProperty(exports, 'UNSAFE_decodeViaTurboStream', {
    enumerable: true,
    get: function () { return reactRouter.UNSAFE_decodeViaTurboStream; }
  });
  Object.defineProperty(exports, 'UNSAFE_mapRouteProperties', {
    enumerable: true,
    get: function () { return reactRouter.UNSAFE_mapRouteProperties; }
  });
  Object.defineProperty(exports, 'UNSAFE_useRouteId', {
    enumerable: true,
    get: function () { return reactRouter.UNSAFE_useRouteId; }
  });
  Object.defineProperty(exports, 'UNSAFE_useRoutesImpl', {
    enumerable: true,
    get: function () { return reactRouter.UNSAFE_useRoutesImpl; }
  });
  Object.defineProperty(exports, 'UNSAFE_useScrollRestoration', {
    enumerable: true,
    get: function () { return reactRouter.UNSAFE_useScrollRestoration; }
  });
  Object.defineProperty(exports, 'createBrowserRouter', {
    enumerable: true,
    get: function () { return reactRouter.createBrowserRouter; }
  });
  Object.defineProperty(exports, 'createHashRouter', {
    enumerable: true,
    get: function () { return reactRouter.createHashRouter; }
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
    get: function () { return reactRouter.createRoutesFromChildren; }
  });
  Object.defineProperty(exports, 'createRoutesStub', {
    enumerable: true,
    get: function () { return reactRouter.createRoutesStub; }
  });
  Object.defineProperty(exports, 'createSearchParams', {
    enumerable: true,
    get: function () { return reactRouter.createSearchParams; }
  });
  Object.defineProperty(exports, 'createStaticHandler', {
    enumerable: true,
    get: function () { return reactRouter.createStaticHandler; }
  });
  Object.defineProperty(exports, 'createStaticRouter', {
    enumerable: true,
    get: function () { return reactRouter.createStaticRouter; }
  });
  Object.defineProperty(exports, 'generatePath', {
    enumerable: true,
    get: function () { return reactRouter.generatePath; }
  });
  Object.defineProperty(exports, 'getStaticContextFromError', {
    enumerable: true,
    get: function () { return reactRouter.getStaticContextFromError; }
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
  Object.defineProperty(exports, 'redirectDocument', {
    enumerable: true,
    get: function () { return reactRouter.redirectDocument; }
  });
  Object.defineProperty(exports, 'renderMatches', {
    enumerable: true,
    get: function () { return reactRouter.renderMatches; }
  });
  Object.defineProperty(exports, 'resolvePath', {
    enumerable: true,
    get: function () { return reactRouter.resolvePath; }
  });
  Object.defineProperty(exports, 'stripBasename', {
    enumerable: true,
    get: function () { return reactRouter.stripBasename; }
  });
  Object.defineProperty(exports, 'unstable_HistoryRouter', {
    enumerable: true,
    get: function () { return reactRouter.unstable_HistoryRouter; }
  });
  Object.defineProperty(exports, 'unstable_usePrompt', {
    enumerable: true,
    get: function () { return reactRouter.unstable_usePrompt; }
  });
  Object.defineProperty(exports, 'unstable_useViewTransitionState', {
    enumerable: true,
    get: function () { return reactRouter.unstable_useViewTransitionState; }
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
  Object.defineProperty(exports, 'useBeforeUnload', {
    enumerable: true,
    get: function () { return reactRouter.useBeforeUnload; }
  });
  Object.defineProperty(exports, 'useBlocker', {
    enumerable: true,
    get: function () { return reactRouter.useBlocker; }
  });
  Object.defineProperty(exports, 'useFetcher', {
    enumerable: true,
    get: function () { return reactRouter.useFetcher; }
  });
  Object.defineProperty(exports, 'useFetchers', {
    enumerable: true,
    get: function () { return reactRouter.useFetchers; }
  });
  Object.defineProperty(exports, 'useFormAction', {
    enumerable: true,
    get: function () { return reactRouter.useFormAction; }
  });
  Object.defineProperty(exports, 'useHref', {
    enumerable: true,
    get: function () { return reactRouter.useHref; }
  });
  Object.defineProperty(exports, 'useInRouterContext', {
    enumerable: true,
    get: function () { return reactRouter.useInRouterContext; }
  });
  Object.defineProperty(exports, 'useLinkClickHandler', {
    enumerable: true,
    get: function () { return reactRouter.useLinkClickHandler; }
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
  Object.defineProperty(exports, 'useSearchParams', {
    enumerable: true,
    get: function () { return reactRouter.useSearchParams; }
  });
  Object.defineProperty(exports, 'useSubmit', {
    enumerable: true,
    get: function () { return reactRouter.useSubmit; }
  });

  Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=react-router-dom.development.js.map
