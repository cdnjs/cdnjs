(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('inferno'), require('history'), require('path-to-regexp')) :
    typeof define === 'function' && define.amd ? define(['exports', 'inferno', 'history', 'path-to-regexp'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.Inferno = global.Inferno || {}, global.Inferno.Router = global.Inferno.Router || {}), global.Inferno, global.history, global.pathToRegexp));
})(this, (function (exports, inferno, history, pathToRegexp) { 'use strict';

    var isArray = Array.isArray;
    function isNullOrUndef(o) {
      return o === void 0 || o === null;
    }
    function isInvalid(o) {
      return o === null || o === false || o === true || o === void 0;
    }
    function isFunction(o) {
      return typeof o === 'function';
    }
    function isString(o) {
      return typeof o === 'string';
    }
    function isUndefined(o) {
      return o === void 0;
    }
    var KNOWN_STATICS = {
      childContextTypes: true,
      contextType: true,
      contextTypes: true,
      defaultProps: true,
      displayName: true,
      getDefaultProps: true,
      getDerivedStateFromError: true,
      getDerivedStateFromProps: true,
      mixins: true,
      propTypes: true,
      type: true,
      // KNOWN STATICS
      name: true,
      length: true,
      prototype: true,
      caller: true,
      callee: true,
      arguments: true,
      arity: true
    };
    function hoistStaticProperties(targetComponent, sourceComponent) {
      // don't hoist over string (html) components
      var keys = Object.getOwnPropertyNames(sourceComponent);
      for (var i = 0; i < keys.length; ++i) {
        var key = keys[i];
        if (!KNOWN_STATICS[key]) {
          targetComponent[key] = sourceComponent[key];
        }
      }
    }

    function warning(condition, message) {
      if (!condition) {
        console.error(message);
      }
    }
    function combinePath(_ref) {
      var _ref$pathname = _ref.pathname,
        pathname = _ref$pathname === void 0 ? '/' : _ref$pathname,
        _ref$search = _ref.search,
        search = _ref$search === void 0 ? '' : _ref$search,
        _ref$hash = _ref.hash,
        hash = _ref$hash === void 0 ? '' : _ref$hash;
      return pathname + search + hash;
    }
    function invariant(condition, format, a, b, c, d, e, f) {
      if (!condition) {
        var error;
        if (format === undefined) {
          error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
        } else {
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

    var patternCache = {};
    var cacheLimit = 10000;
    var cacheCount = 0;
    var compilePath = function compilePath(pattern, options) {
      var cacheKey = "" + options.end + options.strict + options.sensitive;
      var cache = patternCache[cacheKey] || (patternCache[cacheKey] = {});
      if (cache[pattern]) {
        return cache[pattern];
      }
      var keys = [];
      var re = pathToRegexp(pattern, keys, options);
      var compiledPattern = {
        re: re,
        keys: keys
      };
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
        options = {
          path: options
        };
      }
      var _options = options,
        _options$path = _options.path,
        path = _options$path === void 0 ? '/' : _options$path,
        _options$exact = _options.exact,
        exact = _options$exact === void 0 ? false : _options$exact,
        _options$strict = _options.strict,
        strict = _options$strict === void 0 ? false : _options$strict,
        _options$sensitive = _options.sensitive,
        sensitive = _options$sensitive === void 0 ? false : _options$sensitive,
        loader = _options.loader,
        _options$initialData = _options.initialData,
        initialData = _options$initialData === void 0 ? {} : _options$initialData;
      var _compilePath = compilePath(path, {
          end: exact,
          strict: strict,
          sensitive: sensitive
        }),
        re = _compilePath.re,
        keys = _compilePath.keys;
      var match = re.exec(pathname);
      if (!match) {
        return null;
      }
      var loaderData = initialData[path];
      var url = match[0],
        values = match.slice(1);
      var isExact = pathname === url;
      if (exact && !isExact) {
        return null;
      }
      return {
        isExact: isExact,
        loader: loader,
        loaderData: loaderData,
        params: keys.reduce(function (memo, key, index) {
          memo[key.name] = values[index];
          return memo;
        }, {}),
        path: path,
        // the path pattern used to match
        url: path === '/' && url === '' ? '/' : url // the matched portion of the URL
      };
    }

    function _extends$6() { return _extends$6 = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends$6.apply(null, arguments); }
    function _inheritsLoose$8(t, o) { t.prototype = Object.create(o.prototype), t.prototype.constructor = t, _setPrototypeOf$8(t, o); }
    function _setPrototypeOf$8(t, e) { return _setPrototypeOf$8 = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf$8(t, e); }
    function getMatch(pathname, _ref, router) {
      var path = _ref.path,
        exact = _ref.exact,
        strict = _ref.strict,
        sensitive = _ref.sensitive,
        loader = _ref.loader,
        from = _ref.from;
      path != null ? path : path = from;
      var initialData = router.initialData,
        route = router.route; // This is the parent route
      return path ? matchPath(pathname, {
        path: path,
        exact: exact,
        strict: strict,
        sensitive: sensitive,
        loader: loader,
        initialData: initialData
      }) : route.match;
    }
    function extractFirstMatchFromChildren(pathname, children, router) {
      if (isArray(children)) {
        for (var i = 0; i < children.length; ++i) {
          var nestedMatch = extractFirstMatchFromChildren(pathname, children[i], router);
          if (nestedMatch.match) {
            return nestedMatch;
          }
        }
        return {
          match: null,
          _child: null
        };
      }
      return {
        _child: children,
        match: getMatch(pathname, children.props, router)
      };
    }
    var Switch = /*#__PURE__*/function (_Component) {
      function Switch(props, context) {
        var _this;
        _this = _Component.call(this, props, context) || this;
        {
          invariant(context.router, 'You should not use <Switch> outside a <Router>');
        }
        var router = context.router;
        var location = props.location,
          children = props.children;
        var pathname = (location || router.route.location).pathname;
        var _extractFirstMatchFro = extractFirstMatchFromChildren(pathname, children, router),
          match = _extractFirstMatchFro.match,
          _child = _extractFirstMatchFro._child;
        _this.state = {
          _child: _child,
          match: match
        };
        return _this;
      }
      _inheritsLoose$8(Switch, _Component);
      var _proto = Switch.prototype;
      _proto.componentWillReceiveProps = function componentWillReceiveProps(nextProps, nextContext) {
        {
          warning(!(nextProps.location && !this.props.location), '<Switch> elements should not change from uncontrolled to controlled (or vice versa). You initially used no "location" prop and then provided one on a subsequent render.');
          warning(!(!nextProps.location && this.props.location), '<Switch> elements should not change from controlled to uncontrolled (or vice versa). You provided a "location" prop initially but omitted it on a subsequent render.');
        }
        var router = nextContext.router;
        var location = nextProps.location,
          children = nextProps.children;
        var pathname = (location || router.route.location).pathname;
        var _extractFirstMatchFro2 = extractFirstMatchFromChildren(pathname, children, router),
          match = _extractFirstMatchFro2.match,
          _child = _extractFirstMatchFro2._child;
        this.setState({
          match: match,
          _child: _child
        });
      };
      _proto.render = function render(_ref2, _ref3, context) {
        var children = _ref2.children,
          location = _ref2.location;
        var match = _ref3.match,
          _child = _ref3._child;
        if (isInvalid(children)) {
          return null;
        }
        if (match) {
          location != null ? location : location = context.router.route.location;
          return inferno.createComponentVNode(_child.flags, _child.type, _extends$6({}, _child.props, {
            location: location,
            computedMatch: match
          }));
        }
        return null;
      };
      return Switch;
    }(inferno.Component);

    var _excluded$5 = ["computedMatch"];
    function _objectWithoutPropertiesLoose$5(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
    function _extends$5() { return _extends$5 = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends$5.apply(null, arguments); }
    function _inheritsLoose$7(t, o) { t.prototype = Object.create(o.prototype), t.prototype.constructor = t, _setPrototypeOf$7(t, o); }
    function _setPrototypeOf$7(t, e) { return _setPrototypeOf$7 = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf$7(t, e); }
    var Route = /*#__PURE__*/function (_Component) {
      function Route(props, context) {
        var _this;
        _this = _Component.call(this, props, context) || this;
        var match = _this.computeMatch(props, context.router);
        _this.state = {
          __loaderData__: match == null ? void 0 : match.loaderData,
          match: match
        };
        return _this;
      }
      _inheritsLoose$7(Route, _Component);
      var _proto = Route.prototype;
      _proto.getChildContext = function getChildContext() {
        var parentRouter = this.context.router;
        var router = _extends$5({}, parentRouter);
        router.route = {
          location: this.props.location || parentRouter.route.location,
          match: this.state.match
        };
        return {
          router: router
        };
      };
      _proto.computeMatch = function computeMatch(_ref, router) {
        var computedMatch = _ref.computedMatch,
          props = _objectWithoutPropertiesLoose$5(_ref, _excluded$5);
        if (!isNullOrUndef(computedMatch)) {
          // <Switch> already computed the match for us
          return computedMatch;
        }
        var path = props.path,
          strict = props.strict,
          exact = props.exact,
          sensitive = props.sensitive,
          loader = props.loader;
        {
          invariant(router, 'You should not use <Route> or withRouter() outside a <Router>');
        }
        var route = router.route,
          initialData = router.initialData; // This is the parent route
        var pathname = (props.location || route.location).pathname;
        return path ? matchPath(pathname, {
          path: path,
          strict: strict,
          exact: exact,
          sensitive: sensitive,
          loader: loader,
          initialData: initialData
        }) : route.match;
      };
      _proto.componentWillReceiveProps = function componentWillReceiveProps(nextProps, nextContext) {
        {
          warning(!(nextProps.location && !this.props.location), '<Route> elements should not change from uncontrolled to controlled (or vice versa). You initially used no "location" prop and then provided one on a subsequent render.');
          warning(!(!nextProps.location && this.props.location), '<Route> elements should not change from controlled to uncontrolled (or vice versa). You provided a "location" prop initially but omitted it on a subsequent render.');
        }
        var match = this.computeMatch(nextProps, nextContext.router);
        this.setState({
          __loaderData__: match == null ? void 0 : match.loaderData,
          match: match
        });
      };
      _proto.render = function render(props, state, context) {
        var match = state.match,
          __loaderData__ = state.__loaderData__;
        var children = props.children,
          component = props.component,
          render = props.render,
          loader = props.loader;
        var _context$router = context.router,
          history = _context$router.history,
          route = _context$router.route,
          staticContext = _context$router.staticContext;
        var location = props.location || route.location;
        var renderProps = {
          match: match,
          location: location,
          history: history,
          staticContext: staticContext,
          component: component,
          render: render,
          loader: loader,
          __loaderData__: __loaderData__
        };
        // If we have a loader we don't render until it has been resolved
        if (!isUndefined(loader) && isUndefined(__loaderData__)) {
          return null;
        }
        if (component) {
          {
            if (!isFunction(component)) {
              throw new Error("Inferno error: <Route /> - 'component' property must be prototype of class or functional component, not vNode.");
            }
          }
          return match ? inferno.createComponentVNode(2 /* VNodeFlags.ComponentUnknown */, component, renderProps) : null;
        }
        if (render) {
          return match ? render(renderProps, this.context) : null;
        }
        if (typeof children === 'function') {
          return children(renderProps);
        }
        return children;
      };
      return Route;
    }(inferno.Component);
    {
      Route.prototype.componentWillMount = function () {
        warning(!(this.props.component && this.props.render), 'You should not use <Route component> and <Route render> in the same route; <Route render> will be ignored');
        warning(!(this.props.component && this.props.children), 'You should not use <Route component> and <Route children> in the same route; <Route children> will be ignored');
        warning(!(this.props.render && this.props.children), 'You should not use <Route render> and <Route children> in the same route; <Route children> will be ignored');
      };
    }

    function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = false, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = true, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), true), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
    function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
    function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
    function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
    function resolveLoaders(_x) {
      return _resolveLoaders.apply(this, arguments);
    }
    function _resolveLoaders() {
      _resolveLoaders = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(loaderEntries) {
        var promises;
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.n) {
            case 0:
              promises = loaderEntries.map(/*#__PURE__*/function () {
                var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(_ref) {
                  var path, params, request, loader;
                  return _regenerator().w(function (_context) {
                    while (1) switch (_context.n) {
                      case 0:
                        path = _ref.path, params = _ref.params, request = _ref.request, loader = _ref.loader;
                        _context.n = 1;
                        return resolveEntry(path, params, request, loader);
                      case 1:
                        return _context.a(2, _context.v);
                    }
                  }, _callee);
                }));
                return function (_x6) {
                  return _ref2.apply(this, arguments);
                };
              }());
              _context2.n = 1;
              return Promise.all(promises).then(function (result) {
                return Object.fromEntries(result);
              });
            case 1:
              return _context2.a(2, _context2.v);
          }
        }, _callee2);
      }));
      return _resolveLoaders.apply(this, arguments);
    }
    function traverseLoaders(location, tree, base) {
      return _traverseLoaders(location, tree, base, false);
    }
    function _isSwitch(node) {
      var _node$type;
      // Using the same patterns as for _isRoute, but I don't have a test where
      // I pass a Switch via an array, but it is better to be consistent.
      return (node == null || (_node$type = node.type) == null ? void 0 : _node$type.prototype) instanceof Switch || (node == null ? void 0 : node.type) === Switch;
    }
    function _isRoute(node) {
      var _node$type2;
      // So the === check is needed if routes are passed in an array,
      // the instanceof test if routes are passed as children to a Component
      // This feels inconsistent, but at least it works.
      return (node == null || (_node$type2 = node.type) == null ? void 0 : _node$type2.prototype) instanceof Route || (node == null ? void 0 : node.type) === Route;
    }
    // Optionally pass base param during SSR to get fully qualified request URI passed to loader in request param
    function _traverseLoaders(location, tree, base, parentIsSwitch) {
      var _tree$children, _tree$props4;
      if (parentIsSwitch === void 0) {
        parentIsSwitch = false;
      }
      // Make sure tree isn't null
      if (isNullOrUndef(tree)) return [];
      if (Array.isArray(tree)) {
        var hasMatch = false;
        var entriesOfArr = tree.reduce(function (res, node) {
          if (parentIsSwitch && hasMatch) return res;
          var outpArr = _traverseLoaders(location, node, base, _isSwitch(node));
          if (parentIsSwitch && outpArr.length > 0) {
            hasMatch = true;
          }
          return [].concat(res, outpArr);
        }, []);
        return entriesOfArr;
      }
      var outp = [];
      if (_isRoute(tree) && tree.props) {
        var _tree$props2, _tree$props3;
        // TODO: Should we check if we are in Router? It is defensive and could save a bit of time, but is it worth it?
        var _tree$props = tree.props,
          path = _tree$props.path,
          _tree$props$exact = _tree$props.exact,
          exact = _tree$props$exact === void 0 ? false : _tree$props$exact,
          _tree$props$strict = _tree$props.strict,
          strict = _tree$props$strict === void 0 ? false : _tree$props$strict,
          _tree$props$sensitive = _tree$props.sensitive,
          sensitive = _tree$props$sensitive === void 0 ? false : _tree$props$sensitive;
        var match = matchPath(location, {
          exact: exact,
          path: path,
          sensitive: sensitive,
          strict: strict
        });
        // So we can bail out of recursion it this was a Route which didn't match
        if (!match) {
          return outp;
        } else if (!tree.context && (_tree$props2 = tree.props) != null && _tree$props2.loader && (_tree$props3 = tree.props) != null && _tree$props3.path) {
          // Add any loader on this node (but only on the VNode)
          var params = match.params;
          var controller = new AbortController();
          var request = createClientSideRequest(location, controller.signal, base);
          outp.push({
            controller: controller,
            loader: tree.props.loader,
            params: params,
            path: path,
            request: request
          });
        }
      }
      // Traverse children
      var children = (_tree$children = tree.children) != null ? _tree$children : (_tree$props4 = tree.props) == null ? void 0 : _tree$props4.children;
      if (isNullOrUndef(children)) return outp;
      var entries = _traverseLoaders(location, children, base, _isSwitch(tree));
      return [].concat(outp, entries);
    }
    function resolveEntry(_x2, _x3, _x4, _x5) {
      return _resolveEntry.apply(this, arguments);
    }
    function _resolveEntry() {
      _resolveEntry = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(path, params, request, loader) {
        return _regenerator().w(function (_context4) {
          while (1) switch (_context4.n) {
            case 0:
              return _context4.a(2, loader({
                params: params,
                request: request
              }).then(/*#__PURE__*/function () {
                var _ref3 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(res) {
                  var contentType, dataPromise;
                  return _regenerator().w(function (_context3) {
                    while (1) switch (_context3.n) {
                      case 0:
                        if (!(typeof res.json !== 'function')) {
                          _context3.n = 1;
                          break;
                        }
                        return _context3.a(2, [path, {
                          res: res
                        }]);
                      case 1:
                        contentType = res.headers.get('Content-Type');
                        // Check between word boundaries instead of startsWith() due to the last
                        // paragraph of https://httpwg.org/specs/rfc9110.html#field.content-type
                        if (contentType && /\bapplication\/json\b/.test(contentType)) {
                          dataPromise = res.json();
                        } else {
                          dataPromise = res.text();
                        }
                        _context3.n = 2;
                        return dataPromise.then(function (body) {
                          // We got a JSON error
                          if (!res.ok) {
                            return [path, {
                              err: body
                            }];
                          }
                          // We got JSON response
                          return [path, {
                            res: body
                          }];
                        })
                        // Could not parse JSON
                        ["catch"](function (err) {
                          return [path, {
                            err: err
                          }];
                        });
                      case 2:
                        return _context3.a(2, _context3.v);
                    }
                  }, _callee3);
                }));
                return function (_x7) {
                  return _ref3.apply(this, arguments);
                };
              }())
              // Could not fetch data
              ["catch"](function (err) {
                return [path, {
                  err: err
                }];
              }));
          }
        }, _callee4);
      }));
      return _resolveEntry.apply(this, arguments);
    }
    var inBrowser = typeof window === 'undefined';
    function createClientSideRequest(location, signal,
    // submission?: Submission
    base) {
      var url = inBrowser || !isUndefined(base) ? createClientSideURL(location, base) : location.toString();
      var init = {
        signal: signal
      };
      // Content-Type is inferred (https://fetch.spec.whatwg.org/#dom-request)
      return new Request(url, init);
    }
    /**
     * Parses a string URL path into its separate pathname, search, and hash components.
     */
    function createClientSideURL(location, base) {
      if (base === undefined && typeof window !== 'undefined') {
        var _window;
        // window.location.origin is "null" (the literal string value) in Firefox
        // under certain conditions, notably when serving from a local HTML file
        // See https://bugzilla.mozilla.org/show_bug.cgi?id=878297
        base = ((_window = window) == null || (_window = _window.location) == null ? void 0 : _window.origin) !== 'null' ? window.location.origin : window.location.href;
      }
      var url = new URL(location.toString(), base);
      url.hash = '';
      return url;
    }
    // TODO: react-router supports submitting forms with loaders, this is related to that
    // function isMutationMethod(method?: string): method is MutationFormMethod {
    //   return validMutationMethods.has(method as MutationFormMethod);
    // }
    // function convertFormDataToSearchParams(formData: FormData): URLSearchParams {
    //   let searchParams = new URLSearchParams();
    //   for (let [key, value] of formData.entries()) {
    //     // invariant(
    //     //   typeof value === "string",
    //     //   'File inputs are not supported with encType "application/x-www-form-urlencoded", ' +
    //     //     'please use "multipart/form-data" instead.'
    //     // );
    //     if (typeof value === "string") {
    //       searchParams.append(key, value);
    //     }
    //   }
    //   return searchParams;
    // }

    function _createForOfIteratorHelperLoose(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (t) return (t = t.call(r)).next.bind(t); if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e) { t && (r = t); var o = 0; return function () { return o >= r.length ? { done: true } : { done: false, value: r[o++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
    function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
    function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
    function _extends$4() { return _extends$4 = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends$4.apply(null, arguments); }
    function _inheritsLoose$6(t, o) { t.prototype = Object.create(o.prototype), t.prototype.constructor = t, _setPrototypeOf$6(t, o); }
    function _setPrototypeOf$6(t, e) { return _setPrototypeOf$6 = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf$6(t, e); }
    /**
     * The public API for putting history on context.
     */
    var Router = /*#__PURE__*/function (_Component) {
      function Router(props, context) {
        var _this;
        _this = _Component.call(this, props, context) || this;
        _this.unlisten = void 0;
        _this._loaderFetchControllers = [];
        _this._loaderIteration = 0;
        var match = _this.computeMatch(props.history.location.pathname);
        _this.state = {
          initialData: _this.props.initialData,
          match: match
        };
        return _this;
      }
      _inheritsLoose$6(Router, _Component);
      var _proto = Router.prototype;
      _proto.getChildContext = function getChildContext() {
        var _this$state, _this$state2;
        var parentRouter = this.context.router;
        var router = _extends$4({}, parentRouter);
        router.history = this.props.history;
        router.route = {
          location: router.history.location,
          match: (_this$state = this.state) == null ? void 0 : _this$state.match // Why are we sending this? it appears useless.
        };
        router.initialData = (_this$state2 = this.state) == null ? void 0 : _this$state2.initialData; // this is a dictionary of all data available
        return {
          router: router
        };
      };
      _proto.computeMatch = function computeMatch(pathname) {
        return {
          isExact: pathname === '/',
          loader: undefined,
          params: {},
          path: '/',
          url: '/'
        };
      };
      _proto.componentWillMount = function componentWillMount() {
        var _this2 = this;
        var history = this.props.history;
        // Do this here so we can setState when a <Redirect> changes the
        // location in componentWillMount. This happens e.g. when doing
        // server rendering using a <StaticRouter>.
        this.unlisten = history.listen(function () {
          var match = _this2.computeMatch(history.location.pathname);
          _this2._matchAndResolveLoaders(match);
        });
        // First execution of loaders
        if (isUndefined(this.props.initialData)) {
          var _this$state3;
          this._matchAndResolveLoaders((_this$state3 = this.state) == null ? void 0 : _this$state3.match);
        }
      };
      _proto._matchAndResolveLoaders = function _matchAndResolveLoaders(match) {
        var _this3 = this;
        // Keep track of invokation order
        // Bumping the counter needs to be done first because calling abort
        // triggers promise to resolve with "aborted"
        this._loaderIteration = (this._loaderIteration + 1) % 10000;
        var currentIteration = this._loaderIteration;
        for (var _iterator = _createForOfIteratorHelperLoose(this._loaderFetchControllers), _step; !(_step = _iterator()).done;) {
          var controller = _step.value;
          controller.abort();
        }
        this._loaderFetchControllers = [];
        var _this$props = this.props,
          history = _this$props.history,
          children = _this$props.children;
        var loaderEntries = traverseLoaders(history.location.pathname, children);
        if (loaderEntries.length === 0) {
          this.setState({
            match: match
          });
          return;
        }
        // Store AbortController instances for each matched loader
        this._loaderFetchControllers = loaderEntries.map(function (e) {
          return e.controller;
        });
        void resolveLoaders(loaderEntries).then(function (initialData) {
          // On multiple pending navigations, only update interface with last
          // in case they resolve out of order
          if (currentIteration === _this3._loaderIteration) {
            _this3.setState({
              initialData: initialData,
              match: match
            });
          }
        });
      };
      _proto.componentWillUnmount = function componentWillUnmount() {
        this.unlisten();
      };
      _proto.render = function render(props) {
        return props.children;
      };
      return Router;
    }(inferno.Component);
    {
      Router.prototype.componentWillReceiveProps = function (nextProps) {
        warning(this.props.history === nextProps.history, 'You cannot change <Router history>');
      };
    }

    var _excluded$4 = ["basename", "context", "location"];
    function _extends$3() { return _extends$3 = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends$3.apply(null, arguments); }
    function _objectWithoutPropertiesLoose$4(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
    function _inheritsLoose$5(t, o) { t.prototype = Object.create(o.prototype), t.prototype.constructor = t, _setPrototypeOf$5(t, o); }
    function _setPrototypeOf$5(t, e) { return _setPrototypeOf$5 = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf$5(t, e); }
    function addLeadingSlash(path) {
      return path.charAt(0) === '/' ? path : '/' + path;
    }
    var noop = function noop() {};
    var StaticRouter = /*#__PURE__*/function (_Component) {
      function StaticRouter() {
        var _this;
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }
        _this = _Component.call.apply(_Component, [this].concat(args)) || this;
        _this.createHref = function (path) {
          return addLeadingSlash((_this.props.basename || '') + createURL(path));
        };
        _this.handlePush = function (location) {
          var _this$props = _this.props,
            basename = _this$props.basename,
            context = _this$props.context;
          context.action = 'PUSH';
          context.location = addBasename(basename, isString(location) ? history.parsePath(location) : location);
          context.url = createURL(context.location);
        };
        _this.handleReplace = function (location) {
          var _this$props2 = _this.props,
            basename = _this$props2.basename,
            context = _this$props2.context;
          context.action = 'REPLACE';
          context.location = addBasename(basename, isString(location) ? history.parsePath(location) : location);
          context.url = createURL(context.location);
        };
        _this.handleListen = function () {
          return noop;
        };
        _this.handleBlock = function () {
          return noop;
        };
        return _this;
      }
      _inheritsLoose$5(StaticRouter, _Component);
      var _proto = StaticRouter.prototype;
      _proto.getChildContext = function getChildContext() {
        return {
          router: {
            initialData: this.props.initialData,
            staticContext: this.props.context
          }
        };
      };
      _proto.render = function render(_ref) {
        var basename = _ref.basename;
          _ref.context;
          var location = _ref.location,
          props = _objectWithoutPropertiesLoose$4(_ref, _excluded$4);
        return inferno.createComponentVNode(4 /* VNodeFlags.ComponentClass */, Router, _extends$3({}, props, {
          history: {
            action: history.Action.Pop,
            block: this.handleBlock,
            createHref: this.createHref,
            go: staticHandler('go'),
            back: staticHandler('goBack'),
            forward: staticHandler('goForward'),
            listen: this.handleListen,
            location: stripBasename(basename, createLocation(location)),
            push: this.handlePush,
            replace: this.handleReplace
          }
        }));
      };
      return StaticRouter;
    }(inferno.Component);
    StaticRouter.defaultProps = {
      basename: '',
      location: '/'
    };
    {
      StaticRouter.prototype.componentWillMount = function () {
        warning(!this.props.history, '<StaticRouter> ignores the history prop. To use a custom history, ' + 'use `import { Router }` instead of `import { StaticRouter as Router }`.');
      };
    }
    function normalizeLocation(_ref2) {
      var _ref2$pathname = _ref2.pathname,
        pathname = _ref2$pathname === void 0 ? '/' : _ref2$pathname,
        search = _ref2.search,
        hash = _ref2.hash;
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
      return _extends$3({}, location, {
        pathname: addLeadingSlash(basename) + location.pathname
      });
    }
    function stripBasename(basename, location) {
      if (!basename) {
        return location;
      }
      var base = addLeadingSlash(basename);
      if (location.pathname.startsWith(base)) {
        return _extends$3({}, location, {
          pathname: location.pathname.substring(base.length)
        });
      } else {
        return location;
      }
    }
    function createLocation(location) {
      return typeof location === 'string' ? history.parsePath(location) : normalizeLocation(location);
    }
    function createURL(location) {
      return typeof location === 'string' ? location : combinePath(location);
    }
    function staticHandler(methodName) {
      return function () {
        invariant(false, 'You cannot %s with <StaticRouter>', methodName);
      };
    }

    function _inheritsLoose$4(t, o) { t.prototype = Object.create(o.prototype), t.prototype.constructor = t, _setPrototypeOf$4(t, o); }
    function _setPrototypeOf$4(t, e) { return _setPrototypeOf$4 = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf$4(t, e); }
    var BrowserRouter = /*#__PURE__*/function (_Component) {
      function BrowserRouter(props, context) {
        var _this;
        _this = _Component.call(this, props, context) || this;
        _this.history = void 0;
        _this.history = history.createBrowserHistory();
        return _this;
      }
      _inheritsLoose$4(BrowserRouter, _Component);
      var _proto = BrowserRouter.prototype;
      _proto.render = function render() {
        return inferno.createComponentVNode(4 /* VNodeFlags.ComponentClass */, Router, {
          children: this.props.children,
          history: this.history,
          initialData: this.props.initialData
        });
      };
      return BrowserRouter;
    }(inferno.Component);
    {
      BrowserRouter.prototype.componentWillMount = function () {
        warning(!this.props.history, '<BrowserRouter> ignores the history prop. To use a custom history, ' + 'use `import { Router }` instead of `import { BrowserRouter as Router }`.');
      };
    }

    function _inheritsLoose$3(t, o) { t.prototype = Object.create(o.prototype), t.prototype.constructor = t, _setPrototypeOf$3(t, o); }
    function _setPrototypeOf$3(t, e) { return _setPrototypeOf$3 = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf$3(t, e); }
    var HashRouter = /*#__PURE__*/function (_Component) {
      function HashRouter(props, context) {
        var _this;
        _this = _Component.call(this, props, context) || this;
        _this.history = void 0;
        _this.history = history.createHashHistory();
        return _this;
      }
      _inheritsLoose$3(HashRouter, _Component);
      var _proto = HashRouter.prototype;
      _proto.render = function render() {
        return inferno.createComponentVNode(4 /* VNodeFlags.ComponentClass */, Router, {
          children: this.props.children,
          history: this.history
        });
      };
      return HashRouter;
    }(inferno.Component);
    {
      HashRouter.prototype.componentWillMount = function () {
        warning(!this.props.history, '<HashRouter> ignores the history prop. To use a custom history, ' + 'use `import { Router }` instead of `import { HashRouter as Router }`.');
      };
    }

    function _inheritsLoose$2(t, o) { t.prototype = Object.create(o.prototype), t.prototype.constructor = t, _setPrototypeOf$2(t, o); }
    function _setPrototypeOf$2(t, e) { return _setPrototypeOf$2 = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf$2(t, e); }
    var MemoryRouter = /*#__PURE__*/function (_Component) {
      function MemoryRouter(props, context) {
        var _this;
        _this = _Component.call(this, props, context) || this;
        _this.history = void 0;
        _this.history = history.createMemoryHistory(props);
        return _this;
      }
      _inheritsLoose$2(MemoryRouter, _Component);
      var _proto = MemoryRouter.prototype;
      _proto.render = function render() {
        return inferno.createComponentVNode(4 /* VNodeFlags.ComponentClass */, Router, {
          children: this.props.children,
          history: this.history,
          initialData: this.props.initialData
        });
      };
      return MemoryRouter;
    }(inferno.Component);
    {
      MemoryRouter.prototype.componentWillMount = function () {
        warning(!this.props.history, '<MemoryRouter> ignores the history prop. To use a custom history, ' + 'use `import { Router }` instead of `import { MemoryRouter as Router }`.');
      };
    }

    var _excluded$3 = ["state"];
    function _objectWithoutPropertiesLoose$3(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
    var normalizeToLocation = function normalizeToLocation(to) {
      return isString(to) ? history.parsePath(to) : to;
    };
    var splitLocation = function splitLocation(location) {
      var state = location.state,
        to = _objectWithoutPropertiesLoose$3(location, _excluded$3);
      return {
        to: to,
        state: state
      };
    };

    var _excluded$2 = ["replace", "children", "className", "to", "innerRef"];
    function _extends$2() { return _extends$2 = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends$2.apply(null, arguments); }
    function _objectWithoutPropertiesLoose$2(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
    var isModifiedEvent = function isModifiedEvent(event) {
      return Boolean(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
    };
    function handleClick(_ref, event) {
      var props = _ref.props,
        context = _ref.context;
      if (props.onClick) {
        props.onClick(event);
      }
      if (!event.defaultPrevented &&
      // onClick prevented default
      event.button === 0 &&
      // ignore everything but left clicks
      !props.target &&
      // let browser handle "target=_blank" etc.
      !isModifiedEvent(event) // ignore clicks with modifier keys
      ) {
        event.preventDefault();
        var history = context.router.history;
        var _props$replace = props.replace,
          replace = _props$replace === void 0 ? false : _props$replace,
          toPropIn = props.to;
        var _splitLocation = splitLocation(normalizeToLocation(toPropIn)),
          to = _splitLocation.to,
          state = _splitLocation.state;
        if (replace) {
          history.replace(to, state);
        } else {
          history.push(to, state);
        }
      }
    }
    /**
     * The public API for rendering a history-aware <a>.
     */
    function Link(props, context) {
      // "replace" is not purpose left out by spreading the properties
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      props.replace;
        var children = props.children,
        className = props.className,
        _props$to = props.to,
        to = _props$to === void 0 ? '' : _props$to,
        innerRef = props.innerRef,
        rest = _objectWithoutPropertiesLoose$2(props, _excluded$2);
      invariant(context.router, 'You should not use <Link> outside a <Router>');
      var href = context.router.history.createHref(isString(to) ? history.parsePath(to) : to);
      var newProps = _extends$2({}, rest);
      newProps.href = href;
      newProps.onClick = inferno.linkEvent({
        context: context,
        props: props
      }, handleClick);
      return inferno.createVNode(1 /* VNodeFlags.HtmlElement */, 'a', className, children, 0 /* ChildFlags.UnknownChildren */, newProps, null, innerRef);
    }

    var _excluded$1 = ["to", "exact", "strict", "onClick", "location", "activeClassName", "className", "activeStyle", "style", "isActive", "ariaCurrent"];
    function _extends$1() { return _extends$1 = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends$1.apply(null, arguments); }
    function _objectWithoutPropertiesLoose$1(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
    function filter(i) {
      return i;
    }
    /**
     * A <Link> wrapper that knows if it's "active" or not.
     */
    function NavLink(_ref) {
      var to = _ref.to,
        exact = _ref.exact,
        strict = _ref.strict,
        onClick = _ref.onClick,
        linkLocation = _ref.location,
        _ref$activeClassName = _ref.activeClassName,
        activeClassName = _ref$activeClassName === void 0 ? 'active' : _ref$activeClassName,
        classNameProp = _ref.className,
        activeStyle = _ref.activeStyle,
        styleProp = _ref.style,
        getIsActive = _ref.isActive,
        _ref$ariaCurrent = _ref.ariaCurrent,
        ariaCurrent = _ref$ariaCurrent === void 0 ? 'true' : _ref$ariaCurrent,
        rest = _objectWithoutPropertiesLoose$1(_ref, _excluded$1);
      function linkComponent(_ref2) {
        var location = _ref2.location,
          match = _ref2.match;
        var isActive = Boolean(getIsActive ? getIsActive(match, location) : match);
        var className = typeof classNameProp === 'function' ? classNameProp(isActive) : classNameProp;
        var style = typeof styleProp === 'function' ? styleProp(isActive) : styleProp;
        return inferno.createComponentVNode(8 /* VNodeFlags.ComponentFunction */, Link, _extends$1({
          'aria-current': isActive && ariaCurrent || null,
          className: isActive ? [className, activeClassName].filter(filter).join(' ') : className,
          onClick: onClick,
          style: isActive ? _extends$1({}, style, activeStyle) : style,
          to: to
        }, rest));
      }
      return inferno.createComponentVNode(4 /* VNodeFlags.ComponentClass */, Route, {
        children: linkComponent,
        exact: exact,
        location: linkLocation,
        path: typeof to === 'object' ? to.pathname : to,
        strict: strict
      });
    }

    function _inheritsLoose$1(t, o) { t.prototype = Object.create(o.prototype), t.prototype.constructor = t, _setPrototypeOf$1(t, o); }
    function _setPrototypeOf$1(t, e) { return _setPrototypeOf$1 = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf$1(t, e); }
    /**
     * The public API for matching a single path and rendering.
     */
    var Prompt = /*#__PURE__*/function (_Component) {
      function Prompt() {
        var _this;
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }
        _this = _Component.call.apply(_Component, [this].concat(args)) || this;
        _this.unblock = void 0;
        return _this;
      }
      _inheritsLoose$1(Prompt, _Component);
      var _proto = Prompt.prototype;
      _proto.enable = function enable(message) {
        var _this2 = this;
        if (this.unblock) {
          this.unblock();
        }
        this.unblock = this.context.router.history.block(function (tx) {
          if (message && window.confirm(message)) {
            _this2.unblock();
            tx.retry();
          }
        });
      };
      _proto.disable = function disable() {
        if (this.unblock) {
          this.unblock();
          this.unblock = null;
        }
      };
      _proto.componentWillMount = function componentWillMount() {
        invariant(this.context.router, 'You should not use <Prompt> outside a <Router>');
        if (this.props.when) {
          this.enable(this.props.message);
        }
      };
      _proto.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
        if (nextProps.when) {
          if (!this.props.when || this.props.message !== nextProps.message) {
            this.enable(nextProps.message);
          }
        } else {
          this.disable();
        }
      };
      _proto.componentWillUnmount = function componentWillUnmount() {
        this.disable();
      };
      _proto.render = function render() {
        return null;
      };
      return Prompt;
    }(inferno.Component);

    function _inheritsLoose(t, o) { t.prototype = Object.create(o.prototype), t.prototype.constructor = t, _setPrototypeOf(t, o); }
    function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
    function getLocationTarget(to) {
      if (!isString(to)) {
        to = combinePath(to);
      }
      return history.parsePath(to);
    }
    var Redirect = /*#__PURE__*/function (_Component) {
      function Redirect() {
        return _Component.apply(this, arguments) || this;
      }
      _inheritsLoose(Redirect, _Component);
      var _proto = Redirect.prototype;
      _proto.isStatic = function isStatic() {
        var _this$context$router;
        return Boolean((_this$context$router = this.context.router) == null ? void 0 : _this$context$router.staticContext);
      };
      _proto.componentWillMount = function componentWillMount() {
        invariant(this.context.router, 'You should not use <Redirect> outside a <Router>');
        if (this.isStatic()) {
          this.perform();
        }
      };
      _proto.componentDidMount = function componentDidMount() {
        if (!this.isStatic()) {
          this.perform();
        }
      };
      _proto.componentDidUpdate = function componentDidUpdate(prevProps) {
        var prevTo = getLocationTarget(prevProps.to);
        var nextTo = getLocationTarget(this.props.to);
        if (prevTo.pathname === nextTo.pathname && prevTo.search === nextTo.search) {
          console.error("You tried to redirect to the same route you're currently on: \"" + nextTo.pathname + nextTo.search + "\"");
          return;
        }
        this.perform();
      };
      _proto.perform = function perform() {
        var history = this.context.router.history;
        var _this$props = this.props,
          _this$props$push = _this$props.push,
          push = _this$props$push === void 0 ? false : _this$props$push,
          to = _this$props.to;
        if (push) {
          history.push(to);
        } else {
          history.replace(to);
        }
      };
      _proto.render = function render() {
        return null;
      };
      return Redirect;
    }(inferno.Component);

    var _excluded = ["wrappedComponentRef"];
    function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
    function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
    /**
     * A public higher-order component to access the imperative API
     */
    function withRouter(Com) {
      var C = function C(props) {
        var wrappedComponentRef = props.wrappedComponentRef,
          remainingProps = _objectWithoutPropertiesLoose(props, _excluded);
        return inferno.createComponentVNode(4 /* VNodeFlags.ComponentClass */, Route, {
          render: function render(routeComponentProps) {
            return inferno.createComponentVNode(2 /* VNodeFlags.ComponentUnknown */, Com, _extends({}, remainingProps, routeComponentProps), null, wrappedComponentRef);
          }
        });
      };
      // @ts-expect-error function name property
      C.displayName = "withRouter(" + (Com.displayName || Com.name) + ")";
      C.WrappedComponent = Com;
      hoistStaticProperties(C, Com);
      return C;
    }

    function useLoaderData(props) {
      var _props$__loaderData__;
      return (_props$__loaderData__ = props.__loaderData__) == null ? void 0 : _props$__loaderData__.res;
    }
    function useLoaderError(props) {
      var _props$__loaderData__2;
      return (_props$__loaderData__2 = props.__loaderData__) == null ? void 0 : _props$__loaderData__2.err;
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
    exports.createClientSideURL = createClientSideURL;
    exports.matchPath = matchPath;
    exports.resolveLoaders = resolveLoaders;
    exports.traverseLoaders = traverseLoaders;
    exports.useLoaderData = useLoaderData;
    exports.useLoaderError = useLoaderError;
    exports.withRouter = withRouter;

}));
