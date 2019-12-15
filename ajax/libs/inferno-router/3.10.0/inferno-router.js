(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('inferno-create-element'), require('inferno-component'), require('inferno'), require('path-to-regexp')) :
	typeof define === 'function' && define.amd ? define(['exports', 'inferno-create-element', 'inferno-component', 'inferno', 'path-to-regexp'], factory) :
	(factory((global.Inferno = global.Inferno || {}, global.Inferno.Router = {}),global.Inferno.createElement,global.Inferno.Component,global.Inferno,global.pathToRegexp));
}(this, (function (exports,createElement,Component,Inferno,pathToRegexp) { 'use strict';

	createElement = createElement && createElement.hasOwnProperty('default') ? createElement['default'] : createElement;
	Component = Component && Component.hasOwnProperty('default') ? Component['default'] : Component;
	var Inferno__default = 'default' in Inferno ? Inferno['default'] : Inferno;
	pathToRegexp = pathToRegexp && pathToRegexp.hasOwnProperty('default') ? pathToRegexp['default'] : pathToRegexp;

	/**
	 * @module Inferno-Shared
	 */ /** TypeDoc Comment */
	// This should be boolean and not reference to window.document
	var isBrowser = !!(typeof window !== "undefined" && window.document);
	function toArray(children) {
	    return isArray(children) ? children : children ? [children] : children;
	}
	// this is MUCH faster than .constructor === Array and instanceof Array
	// in Node 7 and the later versions of V8, slower in older versions though
	var isArray = Array.isArray;
	function isString(o) {
	    return typeof o === "string";
	}
	function warning(message) {
	    // tslint:disable-next-line:no-console
	    console.warn(message);
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
	function Lifecycle() {
	    this.listeners = [];
	}
	Lifecycle.prototype.addListener = function addListener(callback) {
	    this.listeners.push(callback);
	};
	Lifecycle.prototype.trigger = function trigger() {
	    var listeners = this.listeners;
	    var listener;
	    // We need to remove current listener from array when calling it, because more listeners might be added
	    while ((listener = listeners.shift())) {
	        listener();
	    }
	};

	/**
	 * @module Inferno-Router
	 */ /** TypeDoc Comment */
	var emptyObject = {};
	function decode(val) {
	    return typeof val !== "string" ? val : decodeURIComponent(val);
	}
	function isEmpty(children) {
	    return (!children || !(isArray(children) ? children : Object.keys(children)).length);
	}
	function flatten(oldArray) {
	    var newArray = [];
	    flattenArray(oldArray, newArray);
	    return newArray;
	}
	function getURLString(location) {
	    return isString(location) ? location : location.pathname + location.search;
	}
	/**
	 * Maps a querystring to an object
	 * Supports arrays and utf-8 characters
	 * @param search
	 * @returns {any}
	 */
	function mapSearchParams(search) {
	    if (search === "") {
	        return {};
	    }
	    // Create an object with no prototype
	    var map = Object.create(null);
	    var fragments = search.split("&");
	    for (var i = 0, len = fragments.length; i < len; i++) {
	        var fragment = fragments[i];
	        var ref = fragment
	            .split("=")
	            .map(mapFragment)
	            .map(decodeURIComponent);
	        var k = ref[0];
	        var v = ref[1];
	        if (map[k]) {
	            map[k] = isArray(map[k]) ? map[k] : [map[k]];
	            map[k].push(v);
	        }
	        else {
	            map[k] = v;
	        }
	    }
	    return map;
	}
	/**
	 * Gets the relevant part of the URL for matching
	 * @param fullURL
	 * @param partURL
	 * @returns {string}
	 */
	function toPartialURL(fullURL, partURL) {
	    if (fullURL.indexOf(partURL) === 0) {
	        return fullURL.substr(partURL.length);
	    }
	    return fullURL;
	}
	/**
	 * Simulates ... operator by returning first argument
	 * with the keys in the second argument excluded
	 * @param _args
	 * @param excluded
	 * @returns {{}}
	 */
	function rest(_args, excluded) {
	    var t = {};
	    for (var p in _args) {
	        if (excluded.indexOf(p) < 0) {
	            t[p] = _args[p];
	        }
	    }
	    return t;
	}
	/**
	 * Sorts an array according to its `path` prop length
	 * @param a
	 * @param b
	 * @returns {number}
	 */
	function pathRankSort(a, b) {
	    var aAttr = a.props || emptyObject;
	    var bAttr = b.props || emptyObject;
	    var diff = rank(bAttr.path) - rank(aAttr.path);
	    return (diff ||
	        (bAttr.path && aAttr.path ? bAttr.path.length - aAttr.path.length : 0));
	}
	/**
	 * Helper function for parsing querystring arrays
	 */
	function mapFragment(p, isVal) {
	    return decodeURIComponent(isVal | 0 ? p : p.replace("[]", ""));
	}
	function strip(url) {
	    return url.replace(/(^\/+|\/+$)/g, "");
	}
	function rank(url) {
	    if ( url === void 0 ) url = "";

	    return (strip(url).match(/\/+/g) || "").length;
	}
	function flattenArray(oldArray, newArray) {
	    for (var i = 0, len = oldArray.length; i < len; i++) {
	        var item = oldArray[i];
	        if (isArray(item)) {
	            flattenArray(item, newArray);
	        }
	        else {
	            newArray.push(item);
	        }
	    }
	}

	/**
	 * @module Inferno-Router
	 */ /** TypeDoc Comment */
	var resolvedPromise = Promise.resolve();
	var Route = (function (Component$$1) {
	    function Route(props, context) {
	        var this$1 = this;

	        Component$$1.call(this, props, context);
	        this._onComponentResolved = function (error, component) {
	            this$1.setState({
	                asyncComponent: component
	            });
	        };
	        this.state = {
	            asyncComponent: null
	        };
	    }

	    if ( Component$$1 ) Route.__proto__ = Component$$1;
	    Route.prototype = Object.create( Component$$1 && Component$$1.prototype );
	    Route.prototype.constructor = Route;
	    Route.prototype.componentWillMount = function componentWillMount () {
	        var this$1 = this;

	        var ref = this.props;
	        var onEnter = ref.onEnter;
	        var ref$1 = this.context;
	        var router = ref$1.router;
	        if (onEnter) {
	            resolvedPromise.then((function () {
	                onEnter({ props: this$1.props, router: router });
	            }));
	        }
	        var ref$2 = this.props;
	        var getComponent = ref$2.getComponent;
	        if (getComponent) {
	            resolvedPromise.then((function () {
	                getComponent({ props: this$1.props, router: router }, this$1._onComponentResolved);
	            }));
	        }
	    };
	    Route.prototype.doAsyncBefore = function doAsyncBefore (params) {
	        if (this.props.asyncBefore) {
	            return this.props.asyncBefore(params);
	        }
	        else {
	            return Promise.resolve();
	        }
	    };
	    Route.prototype.onLeave = function onLeave (trigger) {
	        if ( trigger === void 0 ) trigger = false;

	        var ref = this.props;
	        var onLeave = ref.onLeave;
	        var ref$1 = this.context;
	        var router = ref$1.router;
	        if (onLeave && trigger) {
	            onLeave({ props: this.props, router: router });
	        }
	    };
	    Route.prototype.onEnter = function onEnter (nextProps) {
	        var onEnter = nextProps.onEnter;
	        var ref = this.context;
	        var router = ref.router;
	        if (this.props.path !== nextProps.path && onEnter) {
	            onEnter({ props: nextProps, router: router });
	        }
	    };
	    Route.prototype.getComponent = function getComponent (nextProps) {
	        var getComponent = nextProps.getComponent;
	        var ref = this.context;
	        var router = ref.router;
	        if (this.props.path !== nextProps.path && getComponent) {
	            getComponent({ props: nextProps, router: router }, this._onComponentResolved);
	        }
	    };
	    Route.prototype.componentWillUnmount = function componentWillUnmount () {
	        this.onLeave(true);
	    };
	    Route.prototype.componentWillReceiveProps = function componentWillReceiveProps (nextProps) {
	        this.getComponent(nextProps);
	        this.onEnter(nextProps);
	        this.onLeave(this.props.path !== nextProps.path);
	    };
	    Route.prototype.render = function render (_args) {
	        var component = _args.component;
	        var children = _args.children;
	        var props = rest(_args, [
	            "component",
	            "children",
	            "path",
	            "getComponent"
	        ]);
	        var ref = this.state;
	        var asyncComponent = ref.asyncComponent;
	        var resolvedComponent = component || asyncComponent;
	        if (!resolvedComponent) {
	            return !isArray(children) ? children : null;
	        }
	        return createElement(resolvedComponent, props, children);
	    };

	    return Route;
	}(Component));

	/**
	 * @module Inferno-Router
	 */ /** TypeDoc Comment */
	var handleIndexRoute = function (indexRouteNode) { return createElement(Route, indexRouteNode); };
	var handleChildRoute = function (childRouteNode) { return handleRouteNode(childRouteNode); };
	var handleChildRoutes = function (childRouteNodes) { return childRouteNodes.map(handleChildRoute); };
	function handleRouteNode(routeConfigNode) {
	    if (routeConfigNode.indexRoute && !routeConfigNode.childRoutes) {
	        return createElement(Route, routeConfigNode);
	    }
	    // create deep copy of config
	    var node = {};
	    for (var key in routeConfigNode) {
	        node[key] = routeConfigNode[key];
	    }
	    node.children = [];
	    // handle index route config
	    if (node.indexRoute) {
	        node.children.push(handleIndexRoute(node.indexRoute));
	        delete node.indexRoute;
	    }
	    // handle child routes config
	    if (node.childRoutes) {
	        var nodes = isArray(node.childRoutes)
	            ? node.childRoutes
	            : [node.childRoutes];
	        (ref = node.children).push.apply(ref, handleChildRoutes(nodes));
	        delete node.childRoutes;
	    }
	    // cleanup to match native rendered result
	    if (node.children.length === 1) {
	        node.children = node.children[0];
	    }
	    if ((isArray(node.children) && node.children.length === 0) ||
	        (!isArray(node.children) && Object.keys(node.children).length === 0)) {
	        delete node.children;
	    }
	    return createElement(Route, node);
	    var ref;
	}
	var createRoutes = function (routeConfig) { return routeConfig.map(handleRouteNode); };

	function doAllAsyncBefore(renderProps) {
	    var promises = [];
	    var getAsyncBefore = function (root) {
	        if (root) {
	            if (root.props && root.props.children) {
	                getAsyncBefore(root.props.children);
	            }
	            if (root.type.name === "Route" && root.props.asyncBefore) {
	                // Resolve asyncBefore
	                promises.push(root.type.prototype.doAsyncBefore.call(root, root.props.params));
	            }
	        }
	    };
	    getAsyncBefore(renderProps.matched);
	    return Promise.all(promises).then((function () { return Promise.resolve(true); }));
	}

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

	/**
	 * @module Inferno-Router
	 */ /** TypeDoc Comment */
	function renderLink(classNm, children, otherProps) {
	    return Inferno.createVNode(2 /* HtmlElement */, "a", classNm, children, otherProps);
	}
	function Link(props, ref) {
	    var router = ref.router;

	    var activeClassName = props.activeClassName;
	    var activeStyle = props.activeStyle;
	    var className = props.className;
	    var onClick = props.onClick;
	    var children = props.children;
	    var to = props.to;
	    var otherProps = __rest(props, ["activeClassName", "activeStyle", "className", "onClick", "children", "to"]);
	    var classNm;
	    if (className) {
	        classNm = className;
	    }
	    if (!router) {
	        {
	            warning("<Link/> component used outside of <Router/>. Fallback to <a> tag.");
	        }
	        otherProps.href = to;
	        otherProps.onClick = onClick;
	        return renderLink(classNm, children, otherProps);
	    }
	    otherProps.href = isBrowser
	        ? router.createHref({ pathname: to })
	        : router.location.baseUrl ? router.location.baseUrl + to : to;
	    if (router.location.pathname === to) {
	        if (activeClassName) {
	            classNm = (className ? className + " " : "") + activeClassName;
	        }
	        if (activeStyle) {
	            otherProps.style = combineFrom(props.style, activeStyle);
	        }
	    }
	    otherProps.onclick = function navigate(e) {
	        if (e.button !== 0 || e.ctrlKey || e.altKey || e.metaKey || e.shiftKey) {
	            return;
	        }
	        e.preventDefault();
	        if (typeof onClick === "function") {
	            onClick(e);
	        }
	        router.push(to, e.target.textContent);
	    };
	    return renderLink(classNm, children, otherProps);
	}

	/**
	 * @module Inferno-Router
	 */ /** TypeDoc Comment */
	function IndexLink(props) {
	    props.to = "/";
	    return Inferno.createVNode(8 /* ComponentFunction */, Link, null, null, props);
	}

	/**
	 * @module Inferno-Router
	 */ /** TypeDoc Comment */
	var IndexRoute = (function (Route$$1) {
	    function IndexRoute(props, context) {
	        Route$$1.call(this, props, context);
	        props.path = "/";
	    }

	    if ( Route$$1 ) IndexRoute.__proto__ = Route$$1;
	    IndexRoute.prototype = Object.create( Route$$1 && Route$$1.prototype );
	    IndexRoute.prototype.constructor = IndexRoute;

	    return IndexRoute;
	}(Route));

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	var pathToRegexpEs6 = createCommonjsModule((function (module) {
	/**
	 * Expose `pathToRegexp` as ES6 module
	 */
	module.exports = pathToRegexp;
	module.exports.parse = pathToRegexp.parse;
	module.exports.compile = pathToRegexp.compile;
	module.exports.tokensToFunction = pathToRegexp.tokensToFunction;
	module.exports.tokensToRegExp = pathToRegexp.tokensToRegExp;
	module.exports['default'] = module.exports;
	}));

	/**
	 * @module Inferno-Router
	 */ /** TypeDoc Comment */
	var cache = new Map();
	/**
	 * Returns a node containing only the matched components
	 * @param routes
	 * @param currentURL
	 * @returns {*}
	 */
	function match(routes, currentURL) {
	    var location = getURLString(currentURL);
	    return matchRoutes(toArray(routes), encodeURI(location), "/");
	}
	/**
	 * Go through every route and create a new node
	 * with the matched components
	 * @param _routes
	 * @param currentURL
	 * @param parentPath
	 * @param redirect
	 * @returns {object}
	 */
	function matchRoutes(_routes, currentURL, parentPath, redirect) {
	    if ( currentURL === void 0 ) currentURL = "/";
	    if ( parentPath === void 0 ) parentPath = "/";
	    if ( redirect === void 0 ) redirect = false;

	    var routes = isArray(_routes) ? flatten(_routes) : toArray(_routes);
	    var ref = currentURL.split("?");
	    var pathToMatch = ref[0]; if ( pathToMatch === void 0 ) pathToMatch = "/";
	    var search = ref[1]; if ( search === void 0 ) search = "";
	    var params = mapSearchParams(search);
	    routes.sort(pathRankSort);
	    for (var i = 0, len = routes.length; i < len; i++) {
	        var route = routes[i];
	        var props = route.props || emptyObject;
	        var routePath = props.from || props.path || "/";
	        var location = parentPath + toPartialURL(routePath, parentPath).replace(/\/\//g, "/");
	        var isLast = isEmpty(props.children);
	        var matchBase = matchPath(isLast, location, pathToMatch);
	        if (matchBase) {
	            var children = props.children;
	            if (props.from) {
	                redirect = props.to;
	            }
	            if (children) {
	                var matchChild = matchRoutes(children, currentURL, location, redirect);
	                if (matchChild) {
	                    if (matchChild.redirect) {
	                        return {
	                            location: location,
	                            redirect: matchChild.redirect
	                        };
	                    }
	                    children = matchChild.matched;
	                    var childProps = children.props.params;
	                    for (var key in childProps) {
	                        params[key] = childProps[key];
	                    }
	                }
	                else {
	                    children = null;
	                }
	            }
	            var matched = Inferno__default.cloneVNode(route, {
	                children: children,
	                params: combineFrom(params, matchBase.params)
	            });
	            return {
	                location: location,
	                matched: matched,
	                redirect: redirect
	            };
	        }
	    }
	}
	/**
	 * Converts path to a regex, if a match is found then we extract params from it
	 * @param end
	 * @param routePath
	 * @param pathToMatch
	 * @returns {any}
	 */
	function matchPath(end, routePath, pathToMatch) {
	    var key = routePath + "|" + end;
	    var regexp = cache.get(key);
	    if (regexp === void 0) {
	        var keys = [];
	        regexp = { pattern: pathToRegexpEs6(routePath, keys, { end: end }), keys: keys };
	        cache.set(key, regexp);
	    }
	    var m = regexp.pattern.exec(pathToMatch);
	    if (!m) {
	        return null;
	    }
	    var path = m[0];
	    var params = Object.create(null);
	    for (var i = 1, len = m.length; i < len; i += 1) {
	        params[regexp.keys[i - 1].name] = decode(m[i]);
	    }
	    return {
	        params: params,
	        path: path === "" ? "/" : path
	    };
	}

	/**
	 * @module Inferno-Router
	 */ /** TypeDoc Comment */
	var Redirect = (function (Route$$1) {
	    function Redirect(props, context) {
	        Route$$1.call(this, props, context);
	        if (!props.to) {
	            props.to = "/";
	        }
	    }

	    if ( Route$$1 ) Redirect.__proto__ = Route$$1;
	    Redirect.prototype = Object.create( Route$$1 && Route$$1.prototype );
	    Redirect.prototype.constructor = Redirect;

	    return Redirect;
	}(Route));

	/**
	 * @module Inferno-Router
	 */ /** TypeDoc Comment */
	var RouterContext = (function (Component$$1) {
	    function RouterContext(props, context) {
	        Component$$1.call(this, props, context);
	        {
	            if (!props.location || !props.matched) {
	                throw new TypeError('"inferno-router" requires a "location" and "matched" props passed');
	            }
	        }
	    }

	    if ( Component$$1 ) RouterContext.__proto__ = Component$$1;
	    RouterContext.prototype = Object.create( Component$$1 && Component$$1.prototype );
	    RouterContext.prototype.constructor = RouterContext;
	    RouterContext.prototype.getChildContext = function getChildContext () {
	        return {
	            router: this.props.router || {
	                location: {
	                    baseUrl: this.props.baseUrl,
	                    pathname: this.props.location
	                }
	            }
	        };
	    };
	    RouterContext.prototype.render = function render (props) {
	        return props.matched;
	    };

	    return RouterContext;
	}(Component));

	/**
	 * @module Inferno-Router
	 */ /** TypeDoc Comment */
	function createrRouter(history) {
	    if (!history) {
	        throw new TypeError('Inferno: Error "inferno-router" requires a history prop passed');
	    }
	    return {
	        createHref: history.createHref,
	        listen: history.listen,
	        push: history.push,
	        replace: history.replace,
	        isActive: function isActive(url) {
	            return matchPath(true, url, this.url);
	        },
	        get location() {
	            return history.location.pathname !== "blank"
	                ? history.location
	                : {
	                    pathname: "/",
	                    search: ""
	                };
	        },
	        get url() {
	            return this.location.pathname + this.location.search;
	        }
	    };
	}
	var Router = (function (Component$$1) {
	    function Router(props, context) {
	        Component$$1.call(this, props, context);
	        this.router = createrRouter(props.history);
	        this.state = {
	            url: props.url || this.router.url
	        };
	    }

	    if ( Component$$1 ) Router.__proto__ = Component$$1;
	    Router.prototype = Object.create( Component$$1 && Component$$1.prototype );
	    Router.prototype.constructor = Router;
	    Router.prototype.componentWillMount = function componentWillMount () {
	        var this$1 = this;

	        if (this.router) {
	            this.unlisten = this.router.listen((function () {
	                if (typeof this$1.props.asyncBefore === "function") {
	                    var self = this$1;
	                    this$1.props.asyncBefore(this$1.router.url).then((function () {
	                        self.routeTo(self.router.url);
	                    }));
	                }
	                else {
	                    this$1.routeTo(this$1.router.url);
	                }
	            }));
	        }
	    };
	    Router.prototype.componentWillReceiveProps = function componentWillReceiveProps (nextProps) {
	        var this$1 = this;

	        this.setState({ url: nextProps.url }, this.props.onUpdate ? function () { return this$1.props.onUpdate(); } : void 0);
	    };
	    Router.prototype.componentWillUnmount = function componentWillUnmount () {
	        if (this.unlisten) {
	            this.unlisten();
	        }
	    };
	    Router.prototype.routeTo = function routeTo (url) {
	        var this$1 = this;

	        this.setState({ url: url }, this.props.onUpdate ? function () { return this$1.props.onUpdate(); } : void 0);
	    };
	    Router.prototype.render = function render (props) {
	        var this$1 = this;

	        var hit = match(props.children, this.state.url);
	        if (hit.redirect) {
	            setTimeout((function () {
	                this$1.router.replace(hit.redirect);
	            }), 0);
	            return null;
	        }
	        return Inferno.createVNode(4 /* ComponentClass */, RouterContext, null, null, {
	            location: this.state.url,
	            matched: hit.matched,
	            router: this.router
	        });
	    };

	    return Router;
	}(Component));

	/**
	 * @module Inferno-Router
	 */ /** TypeDoc Comment */
	var index = {
	    IndexLink: IndexLink,
	    IndexRedirect: Redirect,
	    IndexRoute: IndexRoute,
	    Link: Link,
	    Redirect: Redirect,
	    Route: Route,
	    Router: Router,
	    RouterContext: RouterContext,
	    createRoutes: createRoutes,
	    doAllAsyncBefore: doAllAsyncBefore,
	    match: match
	};

	exports.IndexLink = IndexLink;
	exports.IndexRedirect = Redirect;
	exports.IndexRoute = IndexRoute;
	exports.Link = Link;
	exports.Redirect = Redirect;
	exports.Route = Route;
	exports.Router = Router;
	exports.RouterContext = RouterContext;
	exports.createRoutes = createRoutes;
	exports.doAllAsyncBefore = doAllAsyncBefore;
	exports.match = match;
	exports['default'] = index;

	Object.defineProperty(exports, '__esModule', { value: true });

})));
