(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('inferno'), require('history'), require('path-to-regexp-es6'), require('hoist-non-inferno-statics')) :
    typeof define === 'function' && define.amd ? define(['exports', 'inferno', 'history', 'path-to-regexp-es6', 'hoist-non-inferno-statics'], factory) :
    (global = global || self, factory((global.Inferno = global.Inferno || {}, global.Inferno.Router = global.Inferno.Router || {}), global.Inferno, global.history, global.pathToRegexp, global.hoistNonReactStatics));
}(this, (function (exports, inferno, history, pathToRegexp, hoistNonReactStatics) { 'use strict';

    pathToRegexp = pathToRegexp && pathToRegexp.hasOwnProperty('default') ? pathToRegexp['default'] : pathToRegexp;
    hoistNonReactStatics = hoistNonReactStatics && hoistNonReactStatics.hasOwnProperty('default') ? hoistNonReactStatics['default'] : hoistNonReactStatics;

    var isArray = Array.isArray;
    function isInvalid(o) {
        return o === null || o === false || o === true || o === void 0;
    }
    function isFunction(o) {
        return typeof o === 'function';
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
    function invariant(condition, format, a, b, c, d, e, f) {
        if (!condition) {
            var error;
            if (format === undefined) {
                error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
            }
            else {
                var args = [a, b, c, d, e, f];
                var argIndex = 0;
                error = new Error(format.replace(/%s/g, function () {
                    return args[argIndex++];
                }));
                error.name = 'Invariant Violation';
            }
            error.framesToPop = 1; // we don't care about invariant's own frame
            throw error;
        }
    }

    /**
     * The public API for putting history on context.
     */
    var Router = /*@__PURE__*/(function (Component) {
        function Router(props, context) {
            Component.call(this, props, context);
            this.state = {
                match: this.computeMatch(props.history.location.pathname)
            };
        }

        if ( Component ) Router.__proto__ = Component;
        Router.prototype = Object.create( Component && Component.prototype );
        Router.prototype.constructor = Router;
        Router.prototype.getChildContext = function getChildContext () {
            var childContext = combineFrom(this.context.router, null);
            childContext.history = this.props.history;
            childContext.route = {
                location: childContext.history.location,
                match: this.state.match
            };
            return {
                router: childContext
            };
        };
        Router.prototype.computeMatch = function computeMatch (pathname) {
            return {
                isExact: pathname === '/',
                params: {},
                path: '/',
                url: '/'
            };
        };
        Router.prototype.componentWillMount = function componentWillMount () {
            var this$1 = this;

            var ref = this.props;
            var history = ref.history;
            // Do this here so we can setState when a <Redirect> changes the
            // location in componentWillMount. This happens e.g. when doing
            // server rendering using a <StaticRouter>.
            this.unlisten = history.listen(function () {
                this$1.setState({
                    match: this$1.computeMatch(history.location.pathname)
                });
            });
        };
        Router.prototype.componentWillUnmount = function componentWillUnmount () {
            this.unlisten();
        };
        Router.prototype.render = function render (props) {
            return props.children;
        };

        return Router;
    }(inferno.Component));
    {
        Router.prototype.componentWillReceiveProps = function (nextProps) {
            warning(this.props.history === nextProps.history, 'You cannot change <Router history>');
        };
    }

    function objectWithoutProperties (obj, exclude) { var target = {}; for (var k in obj) if (Object.prototype.hasOwnProperty.call(obj, k) && exclude.indexOf(k) === -1) target[k] = obj[k]; return target; }
    function addLeadingSlash(path) {
        return path.charAt(0) === '/' ? path : '/' + path;
    }
    // tslint:disable-next-line:no-empty
    var noop = function () { };
    var StaticRouter = /*@__PURE__*/(function (Component) {
        function StaticRouter() {
            var this$1 = this;

            Component.apply(this, arguments);
            this.createHref = function (path) { return addLeadingSlash(this$1.props.basename + createURL(path)); };
            this.handlePush = function (location) {
                var ref = this$1.props;
                var basename = ref.basename;
                var context = ref.context;
                context.action = 'PUSH';
                context.location = addBasename(basename, createLocation(location));
                context.url = createURL(context.location);
            };
            this.handleReplace = function (location) {
                var ref = this$1.props;
                var basename = ref.basename;
                var context = ref.context;
                context.action = 'REPLACE';
                context.location = addBasename(basename, createLocation(location));
                context.url = createURL(context.location);
            };
            // tslint:disable-next-line:no-empty
            this.handleListen = function () { return noop; };
            // tslint:disable-next-line:no-empty
            this.handleBlock = function () { return noop; };
        }

        if ( Component ) StaticRouter.__proto__ = Component;
        StaticRouter.prototype = Object.create( Component && Component.prototype );
        StaticRouter.prototype.constructor = StaticRouter;
        StaticRouter.prototype.getChildContext = function getChildContext () {
            return {
                router: {
                    staticContext: this.props.context
                }
            };
        };
        StaticRouter.prototype.render = function render (ref) {
            var basename = ref.basename;
            var context = ref.context;
            var location = ref.location;
            var rest = objectWithoutProperties( ref, ["basename", "context", "location"] );
            var props = rest;

            return inferno.createComponentVNode(4 /* ComponentClass */, Router, combineFrom(props, {
                history: {
                    action: 'POP',
                    block: this.handleBlock,
                    createHref: this.createHref,
                    go: staticHandler('go'),
                    goBack: staticHandler('goBack'),
                    goForward: staticHandler('goForward'),
                    listen: this.handleListen,
                    location: stripBasename(basename, createLocation(location)),
                    push: this.handlePush,
                    replace: this.handleReplace
                }
            }));
        };

        return StaticRouter;
    }(inferno.Component));
    StaticRouter.defaultProps = {
        basename: '',
        location: '/'
    };
    {
        StaticRouter.prototype.componentWillMount = function () {
            warning(!this.props.history, '<StaticRouter> ignores the history prop. To use a custom history, ' + 'use `import { Router }` instead of `import { StaticRouter as Router }`.');
        };
    }
    function normalizeLocation(ref) {
        var pathname = ref.pathname; if ( pathname === void 0 ) pathname = '/';
        var search = ref.search;
        var hash = ref.hash;

        return {
            hash: (hash || '') === '#' ? '' : hash,
            pathname: pathname,
            search: (search || '') === '?' ? '' : search
        };
    }
    function addBasename(basename, location) {
        if (!basename) {
            return location;
        }
        return combineFrom(location, { pathname: addLeadingSlash(basename) + location.pathname });
    }
    function stripBasename(basename, location) {
        if (!basename) {
            return location;
        }
        var base = addLeadingSlash(basename);
        if (location.pathname.indexOf(base) !== 0) {
            return location;
        }
        return combineFrom(location, { pathname: location.pathname.substr(base.length) });
    }
    function createLocation(location) {
        return typeof location === 'string' ? history.parsePath(location) : normalizeLocation(location);
    }
    function createURL(location) {
        return typeof location === 'string' ? location : history.createPath(location);
    }
    function staticHandler(methodName) {
        return function () {
            invariant(false, 'You cannot %s with <StaticRouter>', methodName);
        };
    }

    var BrowserRouter = /*@__PURE__*/(function (Component) {
        function BrowserRouter(props, context) {
            Component.call(this, props, context);
            this.history = history.createBrowserHistory(props);
        }

        if ( Component ) BrowserRouter.__proto__ = Component;
        BrowserRouter.prototype = Object.create( Component && Component.prototype );
        BrowserRouter.prototype.constructor = BrowserRouter;
        BrowserRouter.prototype.render = function render () {
            return inferno.createComponentVNode(4 /* ComponentClass */, Router, {
                children: this.props.children,
                history: this.history
            });
        };

        return BrowserRouter;
    }(inferno.Component));
    {
        BrowserRouter.prototype.componentWillMount = function () {
            warning(!this.props.history, '<BrowserRouter> ignores the history prop. To use a custom history, ' + 'use `import { Router }` instead of `import { BrowserRouter as Router }`.');
        };
    }

    var HashRouter = /*@__PURE__*/(function (Component) {
        function HashRouter(props, context) {
            Component.call(this, props, context);
            this.history = history.createHashHistory(props);
        }

        if ( Component ) HashRouter.__proto__ = Component;
        HashRouter.prototype = Object.create( Component && Component.prototype );
        HashRouter.prototype.constructor = HashRouter;
        HashRouter.prototype.render = function render () {
            return inferno.createComponentVNode(4 /* ComponentClass */, Router, {
                children: this.props.children,
                history: this.history
            });
        };

        return HashRouter;
    }(inferno.Component));
    {
        HashRouter.prototype.componentWillMount = function () {
            warning(!this.props.history, '<HashRouter> ignores the history prop. To use a custom history, ' + 'use `import { Router }` instead of `import { HashRouter as Router }`.');
        };
    }

    var MemoryRouter = /*@__PURE__*/(function (Component) {
        function MemoryRouter(props, context) {
            Component.call(this, props, context);
            this.history = history.createMemoryHistory(props);
        }

        if ( Component ) MemoryRouter.__proto__ = Component;
        MemoryRouter.prototype = Object.create( Component && Component.prototype );
        MemoryRouter.prototype.constructor = MemoryRouter;
        MemoryRouter.prototype.render = function render () {
            return inferno.createComponentVNode(4 /* ComponentClass */, Router, {
                children: this.props.children,
                history: this.history
            });
        };

        return MemoryRouter;
    }(inferno.Component));
    {
        MemoryRouter.prototype.componentWillMount = function () {
            warning(!this.props.history, '<MemoryRouter> ignores the history prop. To use a custom history, ' + 'use `import { Router }` instead of `import { MemoryRouter as Router }`.');
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
        if (typeof options === 'string') {
            options = { path: options };
        }
        var path = options.path; if ( path === void 0 ) path = '/';
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
            url: path === '/' && url === '' ? '/' : url // the matched portion of the URL
        };
    }

    /**
     * The public API for matching a single path and rendering.
     */
    var Route = /*@__PURE__*/(function (Component) {
        function Route(props, context) {
            Component.call(this, props, context);
            this.state = {
                match: this.computeMatch(props, context.router)
            };
        }

        if ( Component ) Route.__proto__ = Component;
        Route.prototype = Object.create( Component && Component.prototype );
        Route.prototype.constructor = Route;
        Route.prototype.getChildContext = function getChildContext () {
            var childContext = combineFrom(this.context.router, null);
            childContext.route = {
                location: this.props.location || this.context.router.route.location,
                match: this.state.match
            };
            return {
                router: childContext
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
            {
                invariant(router, 'You should not use <Route> or withRouter() outside a <Router>');
            }
            var route = router.route;
            var pathname = (location || route.location).pathname;
            return path ? matchPath(pathname, { path: path, strict: strict, exact: exact, sensitive: sensitive }) : route.match;
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
            var history = ref$2.history;
            var route = ref$2.route;
            var staticContext = ref$2.staticContext;
            var location = this.props.location || route.location;
            var props = { match: match, location: location, history: history, staticContext: staticContext };
            if (component) {
                {
                    if (!isFunction(component)) {
                        throw new Error("Inferno error: <Route /> - 'component' property must be prototype of class or functional component, not vNode.");
                    }
                }
                return match ? inferno.createComponentVNode(2 /* ComponentUnknown */, component, props) : null;
            }
            if (render) {
                return match ? render(props, this.context) : null;
            }
            if (typeof children === 'function') {
                return children(props);
            }
            return children;
        };

        return Route;
    }(inferno.Component));
    {
        Route.prototype.componentWillMount = function () {
            warning(!(this.props.component && this.props.render), 'You should not use <Route component> and <Route render> in the same route; <Route render> will be ignored');
            warning(!(this.props.component && this.props.children), 'You should not use <Route component> and <Route children> in the same route; <Route children> will be ignored');
            warning(!(this.props.render && this.props.children), 'You should not use <Route render> and <Route children> in the same route; <Route children> will be ignored');
        };
    }

    function getMatch(ref, route, location) {
        var path = ref.path;
        var exact = ref.exact;
        var strict = ref.strict;
        var sensitive = ref.sensitive;
        var from = ref.from;

        var pathProp = path || from;
        return pathProp ? matchPath(location.pathname, { path: pathProp, exact: exact, strict: strict, sensitive: sensitive }) : route.match;
    }
    function extractMatchFromChildren(children, route, location) {
        var match;
        var _child;
        if (isArray(children)) {
            for (var i = 0; i < children.length; ++i) {
                _child = children[i];
                if (isArray(_child)) {
                    var nestedMatch = extractMatchFromChildren(_child, route, location);
                    match = nestedMatch.match;
                    _child = nestedMatch._child;
                }
                else {
                    match = getMatch(_child.props, route, location);
                }
                if (match) {
                    break;
                }
            }
        }
        else {
            match = getMatch(children.props, route, location);
            _child = children;
        }
        return { match: match, _child: _child };
    }
    var Switch = /*@__PURE__*/(function (Component) {
        function Switch () {
            Component.apply(this, arguments);
        }

        if ( Component ) Switch.__proto__ = Component;
        Switch.prototype = Object.create( Component && Component.prototype );
        Switch.prototype.constructor = Switch;

        Switch.prototype.render = function render () {
            var ref = this.context.router;
            var route = ref.route;
            var ref$1 = this.props;
            var children = ref$1.children;
            var location = this.props.location || route.location;
            if (isInvalid(children)) {
                return null;
            }
            var ref$2 = extractMatchFromChildren(children, route, location);
            var match = ref$2.match;
            var _child = ref$2._child;
            if (match) {
                return inferno.createComponentVNode(_child.flags, _child.type, combineFrom(_child.props, { location: location, computedMatch: match }));
            }
            return null;
        };

        return Switch;
    }(inferno.Component));
    {
        Switch.prototype.componentWillMount = function () {
            invariant(this.context.router, 'You should not use <Switch> outside a <Router>');
        };
        Switch.prototype.componentWillReceiveProps = function (nextProps) {
            warning(!(nextProps.location && !this.props.location), '<Switch> elements should not change from uncontrolled to controlled (or vice versa). You initially used no "location" prop and then provided one on a subsequent render.');
            warning(!(!nextProps.location && this.props.location), '<Switch> elements should not change from controlled to uncontrolled (or vice versa). You provided a "location" prop initially but omitted it on a subsequent render.');
        };
    }

    function objectWithoutProperties$1 (obj, exclude) { var target = {}; for (var k in obj) if (Object.prototype.hasOwnProperty.call(obj, k) && exclude.indexOf(k) === -1) target[k] = obj[k]; return target; }
    var isModifiedEvent = function (event) { return Boolean(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey); };
    function handleClick(ref, event) {
        var props = ref.props;
        var context = ref.context;

        if (props.onClick) {
            props.onClick(event);
        }
        if (!event.defaultPrevented && // onClick prevented default
            event.button === 0 && // ignore everything but left clicks
            !props.target && // let browser handle "target=_blank" etc.
            !isModifiedEvent(event) // ignore clicks with modifier keys
        ) {
            event.preventDefault();
            var ref$1 = context.router;
            var history = ref$1.history;
            var replace = props.replace; if ( replace === void 0 ) replace = false;
            var to = props.to;
            if (replace) {
                history.replace(to);
            }
            else {
                history.push(to);
            }
        }
    }
    /**
     * The public API for rendering a history-aware <a>.
     */
    function Link(props, context) {
        var replace = props.replace;
        var children = props.children;
        var className = props.className;
        var to = props.to; if ( to === void 0 ) to = '';
        var innerRef = props.innerRef;
        var rest$1 = objectWithoutProperties$1( props, ["replace", "children", "className", "to", "innerRef"] );
        var rest = rest$1;
        invariant(context.router, 'You should not use <Link> outside a <Router>');
        var href = context.router.history.createHref(typeof to === 'string' ? { pathname: to } : to);
        var newProps = combineFrom(rest, null);
        newProps.href = href;
        newProps.onClick = inferno.linkEvent({
            context: context,
            props: props
        }, handleClick);
        return inferno.createVNode(1 /* HtmlElement */, 'a', className, children, 0 /* UnknownChildren */, newProps, null, innerRef);
    }

    function objectWithoutProperties$2 (obj, exclude) { var target = {}; for (var k in obj) if (Object.prototype.hasOwnProperty.call(obj, k) && exclude.indexOf(k) === -1) target[k] = obj[k]; return target; }
    function filter(i) {
        return i;
    }
    /**
     * A <Link> wrapper that knows if it's "active" or not.
     */
    function NavLink(ref) {
        var to = ref.to;
        var exact = ref.exact;
        var strict = ref.strict;
        var onClick = ref.onClick;
        var linkLocation = ref.location;
        var activeClassName = ref.activeClassName; if ( activeClassName === void 0 ) activeClassName = 'active';
        var className = ref.className;
        var activeStyle = ref.activeStyle;
        var style = ref.style;
        var getIsActive = ref.isActive;
        var ariaCurrent = ref.ariaCurrent; if ( ariaCurrent === void 0 ) ariaCurrent = 'true';
        var rest$1 = objectWithoutProperties$2( ref, ["to", "exact", "strict", "onClick", "location", "activeClassName", "className", "activeStyle", "style", "isActive", "ariaCurrent"] );
        var rest = rest$1;

        function linkComponent(ref) {
            var location = ref.location;
            var match = ref.match;

            var isActive = !!(getIsActive ? getIsActive(match, location) : match);
            return inferno.createComponentVNode(8 /* ComponentFunction */, Link, combineFrom({
                'aria-current': isActive && ariaCurrent,
                className: isActive ? [className, activeClassName].filter(filter).join(' ') : className,
                onClick: onClick,
                style: isActive ? combineFrom(style, activeStyle) : style,
                to: to
            }, rest));
        }
        return inferno.createComponentVNode(4 /* ComponentClass */, Route, {
            children: linkComponent,
            exact: exact,
            location: linkLocation,
            path: typeof to === 'object' ? to.pathname : to,
            strict: strict
        });
    }

    /**
     * The public API for matching a single path and rendering.
     */
    var Prompt = /*@__PURE__*/(function (Component) {
        function Prompt () {
            Component.apply(this, arguments);
        }

        if ( Component ) Prompt.__proto__ = Component;
        Prompt.prototype = Object.create( Component && Component.prototype );
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
            invariant(this.context.router, 'You should not use <Prompt> outside a <Router>');
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

    var Redirect = /*@__PURE__*/(function (Component) {
        function Redirect () {
            Component.apply(this, arguments);
        }

        if ( Component ) Redirect.__proto__ = Component;
        Redirect.prototype = Object.create( Component && Component.prototype );
        Redirect.prototype.constructor = Redirect;

        Redirect.prototype.isStatic = function isStatic () {
            return this.context.router && this.context.router.staticContext;
        };
        Redirect.prototype.componentWillMount = function componentWillMount () {
            invariant(this.context.router, 'You should not use <Redirect> outside a <Router>');
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
            var history = ref.history;
            var ref$1 = this.props;
            var push = ref$1.push; if ( push === void 0 ) push = false;
            var to = ref$1.to;
            if (push) {
                history.push(to);
            }
            else {
                history.replace(to);
            }
        };
        Redirect.prototype.render = function render () {
            return null;
        };

        return Redirect;
    }(inferno.Component));

    function objectWithoutProperties$3 (obj, exclude) { var target = {}; for (var k in obj) if (Object.prototype.hasOwnProperty.call(obj, k) && exclude.indexOf(k) === -1) target[k] = obj[k]; return target; }
    /**
     * A public higher-order component to access the imperative API
     */
    function withRouter(Com) {
        var C = function (props) {
            var wrappedComponentRef = props.wrappedComponentRef;
            var rest = objectWithoutProperties$3( props, ["wrappedComponentRef"] );
            var remainingProps = rest;
            return inferno.createComponentVNode(4 /* ComponentClass */, Route, {
                render: function render(routeComponentProps) {
                    return inferno.createComponentVNode(2 /* ComponentUnknown */, Com, combineFrom(remainingProps, routeComponentProps), null, wrappedComponentRef);
                }
            });
        };
        C.displayName = "withRouter(" + (Com.displayName || Com.name) + ")";
        C.WrappedComponent = Com;
        return hoistNonReactStatics(C, Com);
    }

    exports.BrowserRouter = BrowserRouter;
    exports.HashRouter = HashRouter;
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
