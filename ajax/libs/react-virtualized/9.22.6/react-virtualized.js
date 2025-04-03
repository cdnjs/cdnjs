((global, factory) => {
    "object" == typeof exports && "undefined" != typeof module ? factory(exports, require("react")) : "function" == typeof define && define.amd ? define([ "exports", "react" ], factory) : factory((global = global || self).ReactVirtualized = {}, global.React);
})(this, function(exports, React) {
    var React__default = "default" in React ? React.default : React;
    function _arrayLikeToArray(r, a) {
        (null == a || a > r.length) && (a = r.length);
        for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
        return n;
    }
    function _callSuper(t, o, e) {
        return o = _getPrototypeOf(o), ((t, e) => {
            if (e && ("object" == typeof e || "function" == typeof e)) return e;
            if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined");
            return (e => {
                if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return e;
            })(t);
        })(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e));
    }
    function _classCallCheck(a, n) {
        if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function");
    }
    function _defineProperties(e, r) {
        for (var t = 0; t < r.length; t++) {
            var o = r[t];
            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), 
            Object.defineProperty(e, _toPropertyKey(o.key), o);
        }
    }
    function _createClass(e, r, t) {
        return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), 
        Object.defineProperty(e, "prototype", {
            writable: !1
        }), e;
    }
    function _defineProperty(e, r, t) {
        return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
            value: t,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : e[r] = t, e;
    }
    function _extends() {
        return (_extends = Object.assign ? Object.assign.bind() : function(n) {
            for (var e = 1; e < arguments.length; e++) {
                var r, t = arguments[e];
                for (r in t) !{}.hasOwnProperty.call(t, r) || (n[r] = t[r]);
            }
            return n;
        }).apply(null, arguments);
    }
    function _getPrototypeOf(t) {
        return (_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(t) {
            return t.__proto__ || Object.getPrototypeOf(t);
        })(t);
    }
    function _inherits(t, e) {
        if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
        t.prototype = Object.create(e && e.prototype, {
            constructor: {
                value: t,
                writable: !0,
                configurable: !0
            }
        }), Object.defineProperty(t, "prototype", {
            writable: !1
        }), e && _setPrototypeOf(t, e);
    }
    function _isNativeReflectConstruct() {
        try {
            var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}));
        } catch (t) {}
        return (_isNativeReflectConstruct = function() {
            return !!t;
        })();
    }
    function ownKeys(e, r) {
        var o, t = Object.keys(e);
        return Object.getOwnPropertySymbols && (o = Object.getOwnPropertySymbols(e), 
        r && (o = o.filter(function(r) {
            return Object.getOwnPropertyDescriptor(e, r).enumerable;
        })), t.push.apply(t, o)), t;
    }
    function _objectSpread2(e) {
        for (var r = 1; r < arguments.length; r++) {
            var t = null != arguments[r] ? arguments[r] : {};
            r % 2 ? ownKeys(Object(t), !0).forEach(function(r) {
                _defineProperty(e, r, t[r]);
            }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function(r) {
                Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
            });
        }
        return e;
    }
    function _objectWithoutProperties(e, t) {
        if (null == e) return {};
        var o, i = ((r, e) => {
            if (null == r) return {};
            var n, t = {};
            for (n in r) if ({}.hasOwnProperty.call(r, n)) {
                if (e.includes(n)) continue;
                t[n] = r[n];
            }
            return t;
        })(e, t);
        if (Object.getOwnPropertySymbols) for (var s = Object.getOwnPropertySymbols(e), r = 0; r < s.length; r++) o = s[r], 
        t.includes(o) || {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]);
        return i;
    }
    function _setPrototypeOf(t, e) {
        return (_setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(t, e) {
            return t.__proto__ = e, t;
        })(t, e);
    }
    function _slicedToArray(r, e) {
        return (r => {
            if (Array.isArray(r)) return r;
        })(r) || ((r, l) => {
            var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
            if (null != t) {
                var e, n, i, u, a = [], f = !0, o = !1;
                try {
                    if (i = (t = t.call(r)).next, 0 === l) {
                        if (Object(t) !== t) return;
                        f = !1;
                    } else for (;!(f = (e = i.call(t)).done) && (a.push(e.value), 
                    a.length !== l); f = !0);
                } catch (r) {
                    o = !0, n = r;
                } finally {
                    try {
                        if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return;
                    } finally {
                        if (o) throw n;
                    }
                }
                return a;
            }
        })(r, e) || _unsupportedIterableToArray(r, e) || (() => {
            throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
        })();
    }
    function _toConsumableArray(r) {
        return (r => {
            if (Array.isArray(r)) return _arrayLikeToArray(r);
        })(r) || (r => {
            if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r);
        })(r) || _unsupportedIterableToArray(r) || (() => {
            throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
        })();
    }
    function _toPropertyKey(t) {
        t = ((t, r) => {
            if ("object" != typeof t || !t) return t;
            var e = t[Symbol.toPrimitive];
            if (void 0 === e) return ("string" === r ? String : Number)(t);
            if ("object" != typeof (e = e.call(t, r || "default"))) return e;
            throw new TypeError("@@toPrimitive must return a primitive value.");
        })(t, "string");
        return "symbol" == typeof t ? t : t + "";
    }
    function _typeof(o) {
        return (_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o) {
            return typeof o;
        } : function(o) {
            return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
        })(o);
    }
    function _unsupportedIterableToArray(r, a) {
        var t;
        if (r) return "string" == typeof r ? _arrayLikeToArray(r, a) : "Map" === (t = "Object" === (t = {}.toString.call(r).slice(8, -1)) && r.constructor ? r.constructor.name : t) || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;
    }
    /**
   * Copyright (c) 2013-present, Facebook, Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */
    function componentWillMount() {
        // Call this.constructor.gDSFP to support sub-classes.
        var state = this.constructor.getDerivedStateFromProps(this.props, this.state);
        null != state && this.setState(state);
    }
    function componentWillReceiveProps(nextProps) {
        // Binding "this" is important for shallow renderer support.
        this.setState(
        // Call this.constructor.gDSFP to support sub-classes.
        // Use the setState() updater to ensure state isn't stale in certain edge cases.
        function(prevState) {
            return null != (prevState = this.constructor.getDerivedStateFromProps(nextProps, prevState)) ? prevState : null;
        }.bind(this));
    }
    function componentWillUpdate(nextProps, nextState) {
        try {
            var prevProps = this.props, prevState = this.state;
            this.props = nextProps, this.state = nextState, this.__reactInternalSnapshotFlag = !0, 
            this.__reactInternalSnapshot = this.getSnapshotBeforeUpdate(prevProps, prevState);
        } finally {
            this.props = prevProps, this.state = prevState;
        }
    }
    // React may warn about cWM/cWRP/cWU methods being deprecated.
    // Add a flag to suppress these warnings for this special case.
    function polyfill(Component) {
        var prototype = Component.prototype;
        if (!prototype || !prototype.isReactComponent) throw new Error("Can only polyfill class components");
        if ("function" == typeof Component.getDerivedStateFromProps || "function" == typeof prototype.getSnapshotBeforeUpdate) {
            // If new component APIs are defined, "unsafe" lifecycles won't be called.
            // Error if any of these lifecycles are present,
            // Because they would work differently between older and newer (16.3+) versions of React.
            var componentName, foundWillMountName = null, foundWillReceivePropsName = null, foundWillUpdateName = null;
            if ("function" == typeof prototype.componentWillMount ? foundWillMountName = "componentWillMount" : "function" == typeof prototype.UNSAFE_componentWillMount && (foundWillMountName = "UNSAFE_componentWillMount"), 
            "function" == typeof prototype.componentWillReceiveProps ? foundWillReceivePropsName = "componentWillReceiveProps" : "function" == typeof prototype.UNSAFE_componentWillReceiveProps && (foundWillReceivePropsName = "UNSAFE_componentWillReceiveProps"), 
            "function" == typeof prototype.componentWillUpdate ? foundWillUpdateName = "componentWillUpdate" : "function" == typeof prototype.UNSAFE_componentWillUpdate && (foundWillUpdateName = "UNSAFE_componentWillUpdate"), 
            null !== foundWillMountName || null !== foundWillReceivePropsName || null !== foundWillUpdateName) throw componentName = Component.displayName || Component.name, 
            Error("Unsafe legacy lifecycles will not be called for components using new component APIs.\n\n" + componentName + " uses " + ("function" == typeof Component.getDerivedStateFromProps ? "getDerivedStateFromProps()" : "getSnapshotBeforeUpdate()") + " but also contains the following legacy lifecycles:" + (null !== foundWillMountName ? "\n  " + foundWillMountName : "") + (null !== foundWillReceivePropsName ? "\n  " + foundWillReceivePropsName : "") + (null !== foundWillUpdateName ? "\n  " + foundWillUpdateName : "") + "\n\nThe above lifecycles should be removed. Learn more about this warning here:\nhttps://fb.me/react-async-component-lifecycle-hooks");
            // React <= 16.2 does not support static getDerivedStateFromProps.
            // As a workaround, use cWM and cWRP to invoke the new static lifecycle.
            // Newer versions of React will ignore these lifecycles if gDSFP exists.
            // React <= 16.2 does not support getSnapshotBeforeUpdate.
            // As a workaround, use cWU to invoke the new lifecycle.
            // Newer versions of React will ignore that lifecycle if gSBU exists.
            if ("function" == typeof Component.getDerivedStateFromProps && (prototype.componentWillMount = componentWillMount, 
            prototype.componentWillReceiveProps = componentWillReceiveProps), "function" == typeof prototype.getSnapshotBeforeUpdate) {
                if ("function" != typeof prototype.componentDidUpdate) throw new Error("Cannot polyfill getSnapshotBeforeUpdate() for components that do not define componentDidUpdate() on the prototype");
                prototype.componentWillUpdate = componentWillUpdate;
                var componentDidUpdate = prototype.componentDidUpdate;
                prototype.componentDidUpdate = function(prevProps, prevState, maybeSnapshot) {
                    // 16.3+ will not execute our will-update method;
                    // It will pass a snapshot value to did-update though.
                    // Older versions will require our polyfilled will-update value.
                    // We need to handle both cases, but can't just check for the presence of "maybeSnapshot",
                    // Because for <= 15.x versions this might be a "prevContext" object.
                    // We also can't just check "__reactInternalSnapshot",
                    // Because get-snapshot might return a falsy value.
                    // So check for the explicit __reactInternalSnapshotFlag flag to determine behavior.
                    maybeSnapshot = this.__reactInternalSnapshotFlag ? this.__reactInternalSnapshot : maybeSnapshot;
                    componentDidUpdate.call(this, prevProps, prevState, maybeSnapshot);
                };
            }
        }
    }
    componentWillUpdate.__suppressDeprecationWarning = componentWillReceiveProps.__suppressDeprecationWarning = componentWillMount.__suppressDeprecationWarning = !0;
    var ArrowKeyStepper = (() => {
        function ArrowKeyStepper() {
            var _this;
            _classCallCheck(this, ArrowKeyStepper);
            for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) args[_key] = arguments[_key];
            return _defineProperty(_this = _callSuper(this, ArrowKeyStepper, [].concat(args)), "state", {
                scrollToColumn: 0,
                scrollToRow: 0,
                instanceProps: {
                    prevScrollToColumn: 0,
                    prevScrollToRow: 0
                }
            }), _defineProperty(_this, "_columnStartIndex", 0), _defineProperty(_this, "_columnStopIndex", 0), 
            _defineProperty(_this, "_rowStartIndex", 0), _defineProperty(_this, "_rowStopIndex", 0), 
            _defineProperty(_this, "_onKeyDown", function(event) {
                var _this$props = _this.props, columnCount = _this$props.columnCount, disabled = _this$props.disabled, mode = _this$props.mode, rowCount = _this$props.rowCount;
                if (!disabled) {
                    var _this$props = _this._getScrollState(), disabled = _this$props.scrollToColumn, _this$props = _this$props.scrollToRow, _this$_getScrollState2 = _this._getScrollState(), scrollToColumn = _this$_getScrollState2.scrollToColumn, scrollToRow = _this$_getScrollState2.scrollToRow;
                    switch (event.key) {
                      case "ArrowDown":
                        scrollToRow = "cells" === mode ? Math.min(scrollToRow + 1, rowCount - 1) : Math.min(_this._rowStopIndex + 1, rowCount - 1);
                        break;

                      case "ArrowLeft":
                        scrollToColumn = "cells" === mode ? Math.max(scrollToColumn - 1, 0) : Math.max(_this._columnStartIndex - 1, 0);
                        break;

                      case "ArrowRight":
                        scrollToColumn = "cells" === mode ? Math.min(scrollToColumn + 1, columnCount - 1) : Math.min(_this._columnStopIndex + 1, columnCount - 1);
                        break;

                      case "ArrowUp":
                        scrollToRow = "cells" === mode ? Math.max(scrollToRow - 1, 0) : Math.max(_this._rowStartIndex - 1, 0);
                    }
                    scrollToColumn === disabled && scrollToRow === _this$props || (event.preventDefault(), 
                    _this._updateScrollState({
                        scrollToColumn: scrollToColumn,
                        scrollToRow: scrollToRow
                    }));
                }
            }), _defineProperty(_this, "_onSectionRendered", function(_ref) {
                var columnStartIndex = _ref.columnStartIndex, columnStopIndex = _ref.columnStopIndex, rowStartIndex = _ref.rowStartIndex, _ref = _ref.rowStopIndex;
                _this._columnStartIndex = columnStartIndex, _this._columnStopIndex = columnStopIndex, 
                _this._rowStartIndex = rowStartIndex, _this._rowStopIndex = _ref;
            }), _this;
        }
        return _inherits(ArrowKeyStepper, React.PureComponent), _createClass(ArrowKeyStepper, [ {
            key: "setScrollIndexes",
            value: function(_ref2) {
                var scrollToColumn = _ref2.scrollToColumn;
                this.setState({
                    scrollToRow: _ref2.scrollToRow,
                    scrollToColumn: scrollToColumn
                });
            }
        }, {
            key: "render",
            value: function() {
                var _this$props2 = this.props, className = _this$props2.className, _this$props2 = _this$props2.children, _this$_getScrollState3 = this._getScrollState(), scrollToColumn = _this$_getScrollState3.scrollToColumn;
                return React.createElement("div", {
                    className: className,
                    onKeyDown: this._onKeyDown
                }, _this$props2({
                    onSectionRendered: this._onSectionRendered,
                    scrollToColumn: scrollToColumn,
                    scrollToRow: _this$_getScrollState3.scrollToRow
                }));
            }
        }, {
            key: "_getScrollState",
            value: function() {
                return this.props.isControlled ? this.props : this.state;
            }
        }, {
            key: "_updateScrollState",
            value: function(_ref3) {
                var scrollToColumn = _ref3.scrollToColumn, _ref3 = _ref3.scrollToRow, _this$props3 = this.props, isControlled = _this$props3.isControlled, _this$props3 = _this$props3.onScrollToChange;
                "function" == typeof _this$props3 && _this$props3({
                    scrollToColumn: scrollToColumn,
                    scrollToRow: _ref3
                }), isControlled || this.setState({
                    scrollToColumn: scrollToColumn,
                    scrollToRow: _ref3
                });
            }
        } ], [ {
            key: "getDerivedStateFromProps",
            value: function(nextProps, prevState) {
                return !nextProps.isControlled && (nextProps.scrollToColumn !== prevState.instanceProps.prevScrollToColumn || nextProps.scrollToRow !== prevState.instanceProps.prevScrollToRow) ? _objectSpread2(_objectSpread2({}, prevState), {}, {
                    scrollToColumn: nextProps.scrollToColumn,
                    scrollToRow: nextProps.scrollToRow,
                    instanceProps: {
                        prevScrollToColumn: nextProps.scrollToColumn,
                        prevScrollToRow: nextProps.scrollToRow
                    }
                }) : {};
            }
        } ]);
    })();
    function createDetectElementResize(nonce, hostWindow) {
        var cancel, raf, _window = void 0 !== hostWindow ? hostWindow : "undefined" != typeof window ? window : "undefined" != typeof self ? self : global, attachEvent = void 0 !== _window.document && _window.document.attachEvent;
        if (!attachEvent) {
            raf = _window.requestAnimationFrame || _window.mozRequestAnimationFrame || _window.webkitRequestAnimationFrame || function(fn) {
                return _window.setTimeout(fn, 20);
            };
            var requestFrame = function(fn) {
                return raf(fn);
            }, cancelFrame = (cancel = _window.cancelAnimationFrame || _window.mozCancelAnimationFrame || _window.webkitCancelAnimationFrame || _window.clearTimeout, 
            function(id) {
                return cancel(id);
            }), resetTriggers = function(element) {
                var element = element.__resizeTriggers__, expand = element.firstElementChild, element = element.lastElementChild, expandChild = expand.firstElementChild;
                element.scrollLeft = element.scrollWidth, element.scrollTop = element.scrollHeight, 
                expandChild.style.width = expand.offsetWidth + 1 + "px", expandChild.style.height = expand.offsetHeight + 1 + "px", 
                expand.scrollLeft = expand.scrollWidth, expand.scrollTop = expand.scrollHeight;
            }, checkTriggers = function(element) {
                return element.offsetWidth != element.__resizeLast__.width || element.offsetHeight != element.__resizeLast__.height;
            }, scrollListener = function(e) {
                var element;
                e.target.className && "function" == typeof e.target.className.indexOf && e.target.className.indexOf("contract-trigger") < 0 && e.target.className.indexOf("expand-trigger") < 0 || (resetTriggers(element = this), 
                this.__resizeRAF__ && cancelFrame(this.__resizeRAF__), this.__resizeRAF__ = requestFrame(function() {
                    checkTriggers(element) && (element.__resizeLast__.width = element.offsetWidth, 
                    element.__resizeLast__.height = element.offsetHeight, element.__resizeListeners__.forEach(function(fn) {
                        fn.call(element, e);
                    }));
                }));
            }, animation = !1, keyframeprefix = "", animationstartevent = "animationstart", domPrefixes = "Webkit Moz O ms".split(" "), startEvents = "webkitAnimationStart animationstart oAnimationStart MSAnimationStart".split(" "), elm = _window.document.createElement("fakeelement");
            if (!1 === (animation = void 0 !== elm.style.animationName ? !0 : animation)) for (var i = 0; i < domPrefixes.length; i++) if (void 0 !== elm.style[domPrefixes[i] + "AnimationName"]) {
                keyframeprefix = "-" + domPrefixes[i].toLowerCase() + "-", animationstartevent = startEvents[i], 
                animation = !0;
                break;
            }
            var animationName = "resizeanim", animationKeyframes = "@" + keyframeprefix + "keyframes " + animationName + " { from { opacity: 0; } to { opacity: 0; } } ", animationStyle = keyframeprefix + "animation: 1ms " + animationName + "; ";
        }
        return {
            addResizeListener: function(element, fn) {
                var elementStyle, doc;
                attachEvent ? element.attachEvent("onresize", fn) : (element.__resizeTriggers__ || (doc = element.ownerDocument, 
                (elementStyle = _window.getComputedStyle(element)) && "static" == elementStyle.position && (element.style.position = "relative"), 
                (doc => {
                    var css, head, style;
                    doc.getElementById("detectElementResize") || (css = (animationKeyframes || "") + ".resize-triggers { " + (animationStyle || "") + 'visibility: hidden; opacity: 0; } .resize-triggers, .resize-triggers > div, .contract-trigger:before { content: " "; display: block; position: absolute; top: 0; left: 0; height: 100%; width: 100%; overflow: hidden; z-index: -1; } .resize-triggers > div { background: #eee; overflow: auto; } .contract-trigger:before { width: 200%; height: 200%; }', 
                    head = doc.head || doc.getElementsByTagName("head")[0], (style = doc.createElement("style")).id = "detectElementResize", 
                    style.type = "text/css", null != nonce && style.setAttribute("nonce", nonce), 
                    style.styleSheet ? style.styleSheet.cssText = css : style.appendChild(doc.createTextNode(css)), 
                    head.appendChild(style));
                })(doc), element.__resizeLast__ = {}, element.__resizeListeners__ = [], 
                (element.__resizeTriggers__ = doc.createElement("div")).className = "resize-triggers", 
                (elementStyle = doc.createElement("div")).className = "expand-trigger", 
                elementStyle.appendChild(doc.createElement("div")), (doc = doc.createElement("div")).className = "contract-trigger", 
                element.__resizeTriggers__.appendChild(elementStyle), element.__resizeTriggers__.appendChild(doc), 
                element.appendChild(element.__resizeTriggers__), resetTriggers(element), 
                element.addEventListener("scroll", scrollListener, !0), animationstartevent && (element.__resizeTriggers__.__animationListener__ = function(e) {
                    e.animationName == animationName && resetTriggers(element);
                }, element.__resizeTriggers__.addEventListener(animationstartevent, element.__resizeTriggers__.__animationListener__))), 
                element.__resizeListeners__.push(fn));
            },
            removeResizeListener: function(element, fn) {
                if (attachEvent) element.detachEvent("onresize", fn); else if (element.__resizeListeners__.splice(element.__resizeListeners__.indexOf(fn), 1), 
                !element.__resizeListeners__.length) {
                    element.removeEventListener("scroll", scrollListener, !0), element.__resizeTriggers__.__animationListener__ && (element.__resizeTriggers__.removeEventListener(animationstartevent, element.__resizeTriggers__.__animationListener__), 
                    element.__resizeTriggers__.__animationListener__ = null);
                    try {
                        element.__resizeTriggers__ = !element.removeChild(element.__resizeTriggers__);
                    } catch (e) {}
                }
            }
        };
    }
    _defineProperty(ArrowKeyStepper, "defaultProps", {
        disabled: !1,
        isControlled: !1,
        mode: "edges",
        scrollToColumn: 0,
        scrollToRow: 0
    }), polyfill(ArrowKeyStepper);
    var AutoSizer = (() => {
        function AutoSizer() {
            var _this;
            _classCallCheck(this, AutoSizer);
            for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) args[_key] = arguments[_key];
            return _defineProperty(_this = _callSuper(this, AutoSizer, [].concat(args)), "state", {
                height: _this.props.defaultHeight || 0,
                width: _this.props.defaultWidth || 0
            }), _defineProperty(_this, "_parentNode", void 0), _defineProperty(_this, "_autoSizer", void 0), 
            _defineProperty(_this, "_window", void 0), _defineProperty(_this, "_detectElementResize", void 0), 
            _defineProperty(_this, "_onResize", function() {
                var height, width, paddingLeft, paddingRight, paddingTop, style, _this$props = _this.props, disableHeight = _this$props.disableHeight, disableWidth = _this$props.disableWidth, _this$props = _this$props.onResize;
                _this._parentNode && (height = _this._parentNode.offsetHeight || 0, 
                width = _this._parentNode.offsetWidth || 0, style = (_this._window || window).getComputedStyle(_this._parentNode) || {}, 
                paddingLeft = parseInt(style.paddingLeft, 10) || 0, paddingRight = parseInt(style.paddingRight, 10) || 0, 
                paddingTop = parseInt(style.paddingTop, 10) || 0, style = parseInt(style.paddingBottom, 10) || 0, 
                !disableHeight && _this.state.height !== height - paddingTop - style || !disableWidth && _this.state.width !== width - paddingLeft - paddingRight) && (_this.setState({
                    height: height - paddingTop - style,
                    width: width - paddingLeft - paddingRight
                }), _this$props({
                    height: height,
                    width: width
                }));
            }), _defineProperty(_this, "_setRef", function(autoSizer) {
                _this._autoSizer = autoSizer;
            }), _this;
        }
        return _inherits(AutoSizer, React.Component), _createClass(AutoSizer, [ {
            key: "componentDidMount",
            value: function() {
                var nonce = this.props.nonce;
                this._autoSizer && this._autoSizer.parentNode && this._autoSizer.parentNode.ownerDocument && this._autoSizer.parentNode.ownerDocument.defaultView && this._autoSizer.parentNode instanceof this._autoSizer.parentNode.ownerDocument.defaultView.HTMLElement && (this._parentNode = this._autoSizer.parentNode, 
                this._window = this._autoSizer.parentNode.ownerDocument.defaultView, 
                this._detectElementResize = createDetectElementResize(nonce, this._window), 
                this._detectElementResize.addResizeListener(this._parentNode, this._onResize), 
                this._onResize());
            }
        }, {
            key: "componentWillUnmount",
            value: function() {
                this._detectElementResize && this._parentNode && this._detectElementResize.removeResizeListener(this._parentNode, this._onResize);
            }
        }, {
            key: "render",
            value: function() {
                var _this$props2 = this.props, children = _this$props2.children, className = _this$props2.className, disableWidth = _this$props2.disableWidth, style = _this$props2.style, _this$state = this.state, height = _this$state.height, _this$state = _this$state.width, outerStyle = {
                    overflow: "visible"
                }, childParams = {};
                return _this$props2.disableHeight || (outerStyle.height = 0, childParams.height = height), 
                disableWidth || (outerStyle.width = 0, childParams.width = _this$state), 
                React.createElement("div", {
                    className: className,
                    ref: this._setRef,
                    style: _objectSpread2(_objectSpread2({}, outerStyle), style)
                }, children(childParams));
            }
        } ]);
    })(), CellMeasurer = (_defineProperty(AutoSizer, "defaultProps", {
        onResize: function() {},
        disableHeight: !1,
        disableWidth: !1,
        style: {}
    }), (() => {
        function CellMeasurer() {
            var _this;
            _classCallCheck(this, CellMeasurer);
            for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) args[_key] = arguments[_key];
            return _defineProperty(_this = _callSuper(this, CellMeasurer, [].concat(args)), "_child", React.createRef()), 
            _defineProperty(_this, "_measure", function() {
                var _this$props = _this.props, cache = _this$props.cache, _this$props$columnInd = _this$props.columnIndex, _this$props$columnInd = void 0 === _this$props$columnInd ? 0 : _this$props$columnInd, parent = _this$props.parent, _this$props = _this$props.rowIndex, _this$props = void 0 === _this$props ? _this.props.index || 0 : _this$props, _this$_getCellMeasure = _this._getCellMeasurements(), height = _this$_getCellMeasure.height, _this$_getCellMeasure = _this$_getCellMeasure.width;
                height === cache.getHeight(_this$props, _this$props$columnInd) && _this$_getCellMeasure === cache.getWidth(_this$props, _this$props$columnInd) || (cache.set(_this$props, _this$props$columnInd, _this$_getCellMeasure, height), 
                parent && "function" == typeof parent.recomputeGridSize && parent.recomputeGridSize({
                    columnIndex: _this$props$columnInd,
                    rowIndex: _this$props
                }));
            }), _defineProperty(_this, "_registerChild", function(element) {
                !element || element instanceof Element || console.warn("CellMeasurer registerChild expects to be passed Element or null"), 
                (_this._child.current = element) && _this._maybeMeasureCell();
            }), _this;
        }
        return _inherits(CellMeasurer, React.PureComponent), _createClass(CellMeasurer, [ {
            key: "componentDidMount",
            value: function() {
                this._maybeMeasureCell();
            }
        }, {
            key: "componentDidUpdate",
            value: function() {
                this._maybeMeasureCell();
            }
        }, {
            key: "render",
            value: function() {
                var _this2 = this, children = this.props.children, resolvedChildren = "function" == typeof children ? children({
                    measure: this._measure,
                    registerChild: this._registerChild
                }) : children;
                return null === resolvedChildren ? resolvedChildren : React.cloneElement(resolvedChildren, {
                    ref: function(node) {
                        "function" == typeof resolvedChildren.ref ? resolvedChildren.ref(node) : resolvedChildren.ref && (resolvedChildren.ref.current = node), 
                        _this2._child.current = node;
                    }
                });
            }
        }, {
            key: "_getCellMeasurements",
            value: function() {
                var styleWidth, styleHeight, width, cache = this.props.cache, node = this._child.current;
                return node && node.ownerDocument && node.ownerDocument.defaultView && node instanceof node.ownerDocument.defaultView.HTMLElement ? (styleWidth = node.style.width, 
                styleHeight = node.style.height, cache.hasFixedWidth() || (node.style.width = "auto"), 
                cache.hasFixedHeight() || (node.style.height = "auto"), cache = Math.ceil(node.offsetHeight), 
                width = Math.ceil(node.offsetWidth), styleWidth && (node.style.width = styleWidth), 
                styleHeight && (node.style.height = styleHeight), {
                    height: cache,
                    width: width
                }) : {
                    height: 0,
                    width: 0
                };
            }
        }, {
            key: "_maybeMeasureCell",
            value: function() {
                var _this$_getCellMeasure2, height, _this$props2 = this.props, cache = _this$props2.cache, _this$props2$columnIn = _this$props2.columnIndex, _this$props2$columnIn = void 0 === _this$props2$columnIn ? 0 : _this$props2$columnIn, parent = _this$props2.parent, _this$props2 = _this$props2.rowIndex, _this$props2 = void 0 === _this$props2 ? this.props.index || 0 : _this$props2;
                cache.has(_this$props2, _this$props2$columnIn) || (height = (_this$_getCellMeasure2 = this._getCellMeasurements()).height, 
                cache.set(_this$props2, _this$props2$columnIn, _this$_getCellMeasure2.width, height), 
                parent && "function" == typeof parent.invalidateCellSizeAfterRender && parent.invalidateCellSizeAfterRender({
                    columnIndex: _this$props2$columnIn,
                    rowIndex: _this$props2
                }));
            }
        } ]);
    })()), CellMeasurerCache = (_defineProperty(CellMeasurer, "__internalCellMeasurerFlag", !1), 
    CellMeasurer.__internalCellMeasurerFlag = !0, _createClass(function CellMeasurerCache() {
        var _this = this, params = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {}, defaultHeight = (_classCallCheck(this, CellMeasurerCache), 
        _defineProperty(this, "_cellHeightCache", {}), _defineProperty(this, "_cellWidthCache", {}), 
        _defineProperty(this, "_columnWidthCache", {}), _defineProperty(this, "_rowHeightCache", {}), 
        _defineProperty(this, "_defaultHeight", void 0), _defineProperty(this, "_defaultWidth", void 0), 
        _defineProperty(this, "_minHeight", void 0), _defineProperty(this, "_minWidth", void 0), 
        _defineProperty(this, "_keyMapper", void 0), _defineProperty(this, "_hasFixedHeight", void 0), 
        _defineProperty(this, "_hasFixedWidth", void 0), _defineProperty(this, "_columnCount", 0), 
        _defineProperty(this, "_rowCount", 0), _defineProperty(this, "columnWidth", function(_ref) {
            return _ref = _ref.index, _ref = _this._keyMapper(0, _ref), void 0 !== _this._columnWidthCache[_ref] ? _this._columnWidthCache[_ref] : _this._defaultWidth;
        }), _defineProperty(this, "rowHeight", function(_ref2) {
            return _ref2 = _ref2.index, _ref2 = _this._keyMapper(_ref2, 0), void 0 !== _this._rowHeightCache[_ref2] ? _this._rowHeightCache[_ref2] : _this._defaultHeight;
        }), params.defaultHeight), defaultWidth = params.defaultWidth, fixedWidth = params.fixedWidth, keyMapper = params.keyMapper, minHeight = params.minHeight, minWidth = params.minWidth;
        this._hasFixedHeight = !0 === params.fixedHeight, this._hasFixedWidth = !0 === fixedWidth, 
        this._minHeight = minHeight || 0, this._minWidth = minWidth || 0, this._keyMapper = keyMapper || defaultKeyMapper, 
        this._defaultHeight = Math.max(this._minHeight, "number" == typeof defaultHeight ? defaultHeight : 30), 
        this._defaultWidth = Math.max(this._minWidth, "number" == typeof defaultWidth ? defaultWidth : 100), 
        !1 === this._hasFixedHeight && !1 === this._hasFixedWidth && console.warn("CellMeasurerCache should only measure a cell's width or height. You have configured CellMeasurerCache to measure both. This will result in poor performance."), 
        !1 === this._hasFixedHeight && 0 === this._defaultHeight && console.warn("Fixed height CellMeasurerCache should specify a :defaultHeight greater than 0. Failing to do so will lead to unnecessary layout and poor performance."), 
        !1 === this._hasFixedWidth && 0 === this._defaultWidth && console.warn("Fixed width CellMeasurerCache should specify a :defaultWidth greater than 0. Failing to do so will lead to unnecessary layout and poor performance.");
    }, [ {
        key: "clear",
        value: function(rowIndex) {
            var columnIndex = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : 0, key = this._keyMapper(rowIndex, columnIndex);
            delete this._cellHeightCache[key], delete this._cellWidthCache[key], 
            this._updateCachedColumnAndRowSizes(rowIndex, columnIndex);
        }
    }, {
        key: "clearAll",
        value: function() {
            this._cellHeightCache = {}, this._cellWidthCache = {}, this._columnWidthCache = {}, 
            this._rowHeightCache = {}, this._rowCount = 0, this._columnCount = 0;
        }
    }, {
        key: "defaultHeight",
        get: function() {
            return this._defaultHeight;
        }
    }, {
        key: "defaultWidth",
        get: function() {
            return this._defaultWidth;
        }
    }, {
        key: "hasFixedHeight",
        value: function() {
            return this._hasFixedHeight;
        }
    }, {
        key: "hasFixedWidth",
        value: function() {
            return this._hasFixedWidth;
        }
    }, {
        key: "getHeight",
        value: function(rowIndex) {
            return !this._hasFixedHeight && (rowIndex = this._keyMapper(rowIndex, 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : 0), 
            void 0 !== this._cellHeightCache[rowIndex]) ? Math.max(this._minHeight, this._cellHeightCache[rowIndex]) : this._defaultHeight;
        }
    }, {
        key: "getWidth",
        value: function(rowIndex) {
            return !this._hasFixedWidth && (rowIndex = this._keyMapper(rowIndex, 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : 0), 
            void 0 !== this._cellWidthCache[rowIndex]) ? Math.max(this._minWidth, this._cellWidthCache[rowIndex]) : this._defaultWidth;
        }
    }, {
        key: "has",
        value: function(rowIndex) {
            rowIndex = this._keyMapper(rowIndex, 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : 0);
            return void 0 !== this._cellHeightCache[rowIndex];
        }
    }, {
        key: "set",
        value: function(rowIndex, columnIndex, width, height) {
            var key = this._keyMapper(rowIndex, columnIndex);
            columnIndex >= this._columnCount && (this._columnCount = columnIndex + 1), 
            rowIndex >= this._rowCount && (this._rowCount = rowIndex + 1), this._cellHeightCache[key] = height, 
            this._cellWidthCache[key] = width, this._updateCachedColumnAndRowSizes(rowIndex, columnIndex);
        }
    }, {
        key: "_updateCachedColumnAndRowSizes",
        value: function(rowIndex, columnIndex) {
            if (!this._hasFixedWidth) {
                for (var columnWidth = 0, i = 0; i < this._rowCount; i++) columnWidth = Math.max(columnWidth, this.getWidth(i, columnIndex));
                var columnKey = this._keyMapper(0, columnIndex);
                this._columnWidthCache[columnKey] = columnWidth;
            }
            if (!this._hasFixedHeight) {
                for (var rowHeight = 0, _i = 0; _i < this._columnCount; _i++) rowHeight = Math.max(rowHeight, this.getHeight(rowIndex, _i));
                columnKey = this._keyMapper(rowIndex, 0);
                this._rowHeightCache[columnKey] = rowHeight;
            }
        }
    } ]));
    function defaultKeyMapper(rowIndex, columnIndex) {
        return "".concat(rowIndex, "-").concat(columnIndex);
    }
    function createCommonjsModule(fn, module) {
        return fn(module = {
            exports: {}
        }, module.exports), module.exports;
    }
    var reactIs_development = createCommonjsModule(function(module, exports) {
        function typeOf(object) {
            if ("object" == typeof object && null !== object) {
                var $$typeof = object.$$typeof;
                switch ($$typeof) {
                  case REACT_ELEMENT_TYPE:
                    var type = object.type;
                    switch (type) {
                      case REACT_ASYNC_MODE_TYPE:
                      case REACT_CONCURRENT_MODE_TYPE:
                      case REACT_FRAGMENT_TYPE:
                      case REACT_PROFILER_TYPE:
                      case REACT_STRICT_MODE_TYPE:
                      case REACT_SUSPENSE_TYPE:
                        return type;

                      default:
                        var $$typeofType = type && type.$$typeof;
                        switch ($$typeofType) {
                          case REACT_CONTEXT_TYPE:
                          case REACT_FORWARD_REF_TYPE:
                          case REACT_LAZY_TYPE:
                          case REACT_MEMO_TYPE:
                          case REACT_PROVIDER_TYPE:
                            return $$typeofType;

                          default:
                            return $$typeof;
                        }
                    }

                  case REACT_PORTAL_TYPE:
                    return $$typeof;
                }
            }
        } // AsyncMode is deprecated along with isAsyncMode
        function isConcurrentMode(object) {
            return typeOf(object) === REACT_CONCURRENT_MODE_TYPE;
        }
        var hasSymbol, REACT_ELEMENT_TYPE, REACT_PORTAL_TYPE, REACT_FRAGMENT_TYPE, REACT_STRICT_MODE_TYPE, REACT_PROFILER_TYPE, REACT_PROVIDER_TYPE, REACT_CONTEXT_TYPE, REACT_ASYNC_MODE_TYPE, REACT_CONCURRENT_MODE_TYPE, REACT_FORWARD_REF_TYPE, REACT_SUSPENSE_TYPE, REACT_SUSPENSE_LIST_TYPE, REACT_MEMO_TYPE, REACT_LAZY_TYPE, REACT_BLOCK_TYPE, REACT_FUNDAMENTAL_TYPE, REACT_RESPONDER_TYPE, REACT_SCOPE_TYPE, ContextConsumer, ContextProvider, Element, ForwardRef, Fragment, Lazy, Memo, Portal, Profiler, StrictMode, Suspense, hasWarnedAboutDeprecatedIsAsyncMode;
        hasSymbol = "function" == typeof Symbol && Symbol.for, REACT_ELEMENT_TYPE = hasSymbol ? Symbol.for("react.element") : 60103, 
        REACT_PORTAL_TYPE = hasSymbol ? Symbol.for("react.portal") : 60106, REACT_FRAGMENT_TYPE = hasSymbol ? Symbol.for("react.fragment") : 60107, 
        REACT_STRICT_MODE_TYPE = hasSymbol ? Symbol.for("react.strict_mode") : 60108, 
        REACT_PROFILER_TYPE = hasSymbol ? Symbol.for("react.profiler") : 60114, 
        REACT_PROVIDER_TYPE = hasSymbol ? Symbol.for("react.provider") : 60109, 
        REACT_CONTEXT_TYPE = hasSymbol ? Symbol.for("react.context") : 60110, REACT_ASYNC_MODE_TYPE = hasSymbol ? Symbol.for("react.async_mode") : 60111, 
        REACT_CONCURRENT_MODE_TYPE = hasSymbol ? Symbol.for("react.concurrent_mode") : 60111, 
        REACT_FORWARD_REF_TYPE = hasSymbol ? Symbol.for("react.forward_ref") : 60112, 
        REACT_SUSPENSE_TYPE = hasSymbol ? Symbol.for("react.suspense") : 60113, 
        REACT_SUSPENSE_LIST_TYPE = hasSymbol ? Symbol.for("react.suspense_list") : 60120, 
        REACT_MEMO_TYPE = hasSymbol ? Symbol.for("react.memo") : 60115, REACT_LAZY_TYPE = hasSymbol ? Symbol.for("react.lazy") : 60116, 
        REACT_BLOCK_TYPE = hasSymbol ? Symbol.for("react.block") : 60121, REACT_FUNDAMENTAL_TYPE = hasSymbol ? Symbol.for("react.fundamental") : 60117, 
        REACT_RESPONDER_TYPE = hasSymbol ? Symbol.for("react.responder") : 60118, 
        REACT_SCOPE_TYPE = hasSymbol ? Symbol.for("react.scope") : 60119, hasSymbol = REACT_CONCURRENT_MODE_TYPE, 
        ContextConsumer = REACT_CONTEXT_TYPE, ContextProvider = REACT_PROVIDER_TYPE, 
        Element = REACT_ELEMENT_TYPE, ForwardRef = REACT_FORWARD_REF_TYPE, Fragment = REACT_FRAGMENT_TYPE, 
        Lazy = REACT_LAZY_TYPE, Memo = REACT_MEMO_TYPE, Portal = REACT_PORTAL_TYPE, 
        Profiler = REACT_PROFILER_TYPE, StrictMode = REACT_STRICT_MODE_TYPE, Suspense = REACT_SUSPENSE_TYPE, 
        hasWarnedAboutDeprecatedIsAsyncMode = !1, exports.AsyncMode = REACT_ASYNC_MODE_TYPE, 
        exports.ConcurrentMode = hasSymbol, exports.ContextConsumer = ContextConsumer, 
        exports.ContextProvider = ContextProvider, exports.Element = Element, exports.ForwardRef = ForwardRef, 
        exports.Fragment = Fragment, exports.Lazy = Lazy, exports.Memo = Memo, exports.Portal = Portal, 
        exports.Profiler = Profiler, exports.StrictMode = StrictMode, exports.Suspense = Suspense, 
        exports.isAsyncMode = // AsyncMode should be deprecated
        function(object) {
            return hasWarnedAboutDeprecatedIsAsyncMode || (hasWarnedAboutDeprecatedIsAsyncMode = !0, 
            // Using console['warn'] to evade Babel and ESLint
            console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.")), 
            isConcurrentMode(object) || typeOf(object) === REACT_ASYNC_MODE_TYPE;
        }, exports.isConcurrentMode = isConcurrentMode, exports.isContextConsumer = function(object) {
            return typeOf(object) === REACT_CONTEXT_TYPE;
        }, exports.isContextProvider = function(object) {
            return typeOf(object) === REACT_PROVIDER_TYPE;
        }, exports.isElement = function(object) {
            return "object" == typeof object && null !== object && object.$$typeof === REACT_ELEMENT_TYPE;
        }, exports.isForwardRef = function(object) {
            return typeOf(object) === REACT_FORWARD_REF_TYPE;
        }, exports.isFragment = function(object) {
            return typeOf(object) === REACT_FRAGMENT_TYPE;
        }, exports.isLazy = function(object) {
            return typeOf(object) === REACT_LAZY_TYPE;
        }, exports.isMemo = function(object) {
            return typeOf(object) === REACT_MEMO_TYPE;
        }, exports.isPortal = function(object) {
            return typeOf(object) === REACT_PORTAL_TYPE;
        }, exports.isProfiler = function(object) {
            return typeOf(object) === REACT_PROFILER_TYPE;
        }, exports.isStrictMode = function(object) {
            return typeOf(object) === REACT_STRICT_MODE_TYPE;
        }, exports.isSuspense = function(object) {
            return typeOf(object) === REACT_SUSPENSE_TYPE;
        }, exports.isValidElementType = function(type) {
            return "string" == typeof type || "function" == typeof type || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
            type === REACT_FRAGMENT_TYPE || type === REACT_CONCURRENT_MODE_TYPE || type === REACT_PROFILER_TYPE || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || "object" == typeof type && null !== type && (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || type.$$typeof === REACT_FUNDAMENTAL_TYPE || type.$$typeof === REACT_RESPONDER_TYPE || type.$$typeof === REACT_SCOPE_TYPE || type.$$typeof === REACT_BLOCK_TYPE);
        }, exports.typeOf = typeOf;
    }), reactIs = (reactIs_development.AsyncMode, createCommonjsModule(function(module) {
        module.exports = reactIs_development;
    })), getOwnPropertySymbols = Object.getOwnPropertySymbols, hasOwnProperty = Object.prototype.hasOwnProperty, propIsEnumerable = Object.prototype.propertyIsEnumerable;
    var objectAssign = (() => {
        try {
            if (Object.assign) {
                // Detect buggy property enumeration order in older V8 versions.
                // https://bugs.chromium.org/p/v8/issues/detail?id=4118
                var test1 = new String("abc"); // eslint-disable-line no-new-wrappers
                if (test1[5] = "de", "5" !== Object.getOwnPropertyNames(test1)[0]) {
                    for (
                    // https://bugs.chromium.org/p/v8/issues/detail?id=3056
                    var test2 = {}, i = 0; i < 10; i++) test2["_" + String.fromCharCode(i)] = i;
                    var test3, order2 = Object.getOwnPropertyNames(test2).map(function(n) {
                        return test2[n];
                    });
                    if ("0123456789" === order2.join("")) return test3 = {}, "abcdefghijklmnopqrst".split("").forEach(function(letter) {
                        test3[letter] = letter;
                    }), "abcdefghijklmnopqrst" === Object.keys(Object.assign({}, test3)).join("") ? 1 : void 0;
                    // https://bugs.chromium.org/p/v8/issues/detail?id=3056
                }
            }
        } catch (err) {}
    })() ? Object.assign : function(target, source) {
        for (var from, to = (val => {
            if (null == val) throw new TypeError("Object.assign cannot be called with null or undefined");
            return Object(val);
        })(target), s = 1; s < arguments.length; s++) {
            for (var key in from = Object(arguments[s])) hasOwnProperty.call(from, key) && (to[key] = from[key]);
            if (getOwnPropertySymbols) for (var symbols = getOwnPropertySymbols(from), i = 0; i < symbols.length; i++) propIsEnumerable.call(from, symbols[i]) && (to[symbols[i]] = from[symbols[i]]);
        }
        return to;
    }, ReactPropTypesSecret_1 = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED", has = Function.call.bind(Object.prototype.hasOwnProperty), loggedTypeFailures = {}, has$1 = has, printWarning = function(text) {
        text = "Warning: " + text;
        "undefined" != typeof console && console.error(text);
        try {
            // --- Welcome to debugging React ---
            // This error was thrown as a convenience so that you can use this stack
            // to find the callsite that caused this warning to fire.
            throw new Error(text);
        } catch (x) {/**/}
    };
    /**
   * Copyright (c) 2013-present, Facebook, Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */
    /**
   * Assert that the values match with the type specs.
   * Error messages are memorized and will only be shown once.
   *
   * @param {object} typeSpecs Map of name to a ReactPropType
   * @param {object} values Runtime values that need to be type-checked
   * @param {string} location e.g. "prop", "context", "child context"
   * @param {string} componentName Name of the component for error messages.
   * @param {?Function} getStack Returns the component stack.
   * @private
   */
    function checkPropTypes(typeSpecs, values, location, componentName, getStack) {
        for (var typeSpecName in typeSpecs) if (has$1(typeSpecs, typeSpecName)) {
            var error, err;
            // Prop type validation may throw. In case they do, we don't want to
            // fail the render phase where it didn't fail before. So we log it.
            // After these have been cleaned up, we'll let them throw.
            try {
                // This is intentionally an invariant that gets caught. It's the same
                // behavior as without this statement except with a better message.
                if ("function" != typeof typeSpecs[typeSpecName]) throw (err = Error((componentName || "React class") + ": " + location + " type `" + typeSpecName + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof typeSpecs[typeSpecName] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.")).name = "Invariant Violation", 
                err;
                error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (ex) {
                error = ex;
            }
            !error || error instanceof Error || printWarning((componentName || "React class") + ": type specification of " + location + " `" + typeSpecName + "` is invalid; the type checker function must return `null` or an `Error` but returned a " + typeof error + ". You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument)."), 
            error instanceof Error && !(error.message in loggedTypeFailures) && (
            // Only monitor this failure once because there tends to be a lot of the
            // same error.
            loggedTypeFailures[error.message] = !0, typeSpecName = getStack ? getStack() : "", 
            printWarning("Failed " + location + " type: " + error.message + (null != typeSpecName ? typeSpecName : "")));
        }
    }
    /**
   * Resets warning cache when testing.
   *
   * @private
   */
    checkPropTypes.resetWarningCache = function() {
        loggedTypeFailures = {};
    };
    var checkPropTypes_1 = checkPropTypes;
    function emptyFunctionThatReturnsNull() {
        return null;
    }
    function factoryWithTypeCheckers(isValidElement, throwOnDirectAccess) {
        /* global Symbol */
        var ITERATOR_SYMBOL = "function" == typeof Symbol && Symbol.iterator, FAUX_ITERATOR_SYMBOL = "@@iterator", ANONYMOUS = "<<anonymous>>", ReactPropTypes = {
            array: createPrimitiveTypeChecker("array"),
            bigint: createPrimitiveTypeChecker("bigint"),
            bool: createPrimitiveTypeChecker("boolean"),
            func: createPrimitiveTypeChecker("function"),
            number: createPrimitiveTypeChecker("number"),
            object: createPrimitiveTypeChecker("object"),
            string: createPrimitiveTypeChecker("string"),
            symbol: createPrimitiveTypeChecker("symbol"),
            any: createChainableTypeChecker(emptyFunctionThatReturnsNull),
            arrayOf: function(typeChecker) {
                return createChainableTypeChecker(function(props, propName, componentName, location, propFullName) {
                    if ("function" != typeof typeChecker) return new PropTypeError("Property `" + propFullName + "` of component `" + componentName + "` has invalid PropType notation inside arrayOf.");
                    var propValue = props[propName];
                    if (!Array.isArray(propValue)) return new PropTypeError("Invalid " + location + " `" + propFullName + "` of type `" + getPropType(propValue) + "` supplied to `" + componentName + "`, expected an array.");
                    for (var i = 0; i < propValue.length; i++) {
                        var error = typeChecker(propValue, i, componentName, location, propFullName + "[" + i + "]", ReactPropTypesSecret_1);
                        if (error instanceof Error) return error;
                    }
                    return null;
                });
            },
            element: createChainableTypeChecker(function(props, propName, componentName, location, propFullName) {
                return props = props[propName], isValidElement(props) ? null : new PropTypeError("Invalid " + location + " `" + propFullName + "` of type `" + getPropType(props) + "` supplied to `" + componentName + "`, expected a single ReactElement.");
            }),
            elementType: createChainableTypeChecker(function(props, propName, componentName, location, propFullName) {
                return props = props[propName], reactIs.isValidElementType(props) ? null : new PropTypeError("Invalid " + location + " `" + propFullName + "` of type `" + getPropType(props) + "` supplied to `" + componentName + "`, expected a single ReactElement type.");
            }),
            instanceOf: function(expectedClass) {
                return createChainableTypeChecker(function(props, propName, componentName, location, propFullName) {
                    var expectedClassName;
                    return props[propName] instanceof expectedClass ? null : (expectedClassName = expectedClass.name || ANONYMOUS, 
                    new PropTypeError("Invalid " + location + " `" + propFullName + "` of type `" + ((location = props[propName]).constructor && location.constructor.name ? location.constructor.name : ANONYMOUS) + "` supplied to `" + componentName + "`, expected instance of `" + expectedClassName + "`."));
                });
            },
            node: createChainableTypeChecker(function(props, propName, componentName, location, propFullName) {
                return isNode(props[propName]) ? null : new PropTypeError("Invalid " + location + " `" + propFullName + "` supplied to `" + componentName + "`, expected a ReactNode.");
            }),
            objectOf: function(typeChecker) {
                return createChainableTypeChecker(function(props, propName, componentName, location, propFullName) {
                    if ("function" != typeof typeChecker) return new PropTypeError("Property `" + propFullName + "` of component `" + componentName + "` has invalid PropType notation inside objectOf.");
                    var key, propValue = props[propName];
                    if ("object" !== (props = getPropType(propValue))) return new PropTypeError("Invalid " + location + " `" + propFullName + "` of type `" + props + "` supplied to `" + componentName + "`, expected an object.");
                    for (key in propValue) if (has(propValue, key)) {
                        var error = typeChecker(propValue, key, componentName, location, propFullName + "." + key, ReactPropTypesSecret_1);
                        if (error instanceof Error) return error;
                    }
                    return null;
                });
            },
            oneOf: function(expectedValues) {
                if (Array.isArray(expectedValues)) return createChainableTypeChecker(function(props, propName, componentName, location, propFullName) {
                    for (var propValue = props[propName], i = 0; i < expectedValues.length; i++) if ((
                    /**
     * inlined Object.is polyfill to avoid requiring consumers ship their own
     * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
     */
                    /*eslint-disable no-self-compare*/
                    (x, y) => 
                    // SameValue algorithm
                    x === y ? 0 !== x || 1 / x == 1 / y : x != x && y != y
                    /*eslint-enable no-self-compare*/
                    /**
     * We use an Error-like object for backward compatibility as people may call
     * PropTypes directly and inspect their output. However, we don't use real
     * Errors anymore. We don't inspect their stack anyway, and creating them
     * is prohibitively expensive if they are created too often, such as what
     * happens in oneOfType() for any type before the one that matched.
     */)(propValue, expectedValues[i])) return null;
                    props = JSON.stringify(expectedValues, function(key, value) {
                        return "symbol" === getPreciseType(value) ? String(value) : value;
                    });
                    return new PropTypeError("Invalid " + location + " `" + propFullName + "` of value `" + String(propValue) + "` supplied to `" + componentName + "`, expected one of " + props + ".");
                });
                printWarning$1(1 < arguments.length ? "Invalid arguments supplied to oneOf, expected an array, got " + arguments.length + " arguments. A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z])." : "Invalid argument supplied to oneOf, expected an array.");
                return emptyFunctionThatReturnsNull;
            },
            oneOfType: function(arrayOfTypeCheckers) {
                if (!Array.isArray(arrayOfTypeCheckers)) return printWarning$1("Invalid argument supplied to oneOfType, expected an instance of array."), 
                emptyFunctionThatReturnsNull;
                for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
                    var checker = arrayOfTypeCheckers[i];
                    if ("function" != typeof checker) return printWarning$1("Invalid argument supplied to oneOfType. Expected an array of check functions, but received " + (
                    // Returns a string that is postfixed to a warning about an invalid type.
                    // For example, "undefined" or "of type array"
                    value => {
                        var type = getPreciseType(value);
                        switch (type) {
                          case "array":
                          case "object":
                            return "an " + type;

                          case "boolean":
                          case "date":
                          case "regexp":
                            return "a " + type;

                          default:
                            return type;
                        }
                    }
                    // Returns class name of the object, if any.
                    )(checker) + " at index " + i + "."), emptyFunctionThatReturnsNull;
                }
                return createChainableTypeChecker(function(props, propName, componentName, location, propFullName) {
                    for (var expectedTypes = [], i = 0; i < arrayOfTypeCheckers.length; i++) {
                        var checkerResult = (0, arrayOfTypeCheckers[i])(props, propName, componentName, location, propFullName, ReactPropTypesSecret_1);
                        if (null == checkerResult) return null;
                        checkerResult.data && has(checkerResult.data, "expectedType") && expectedTypes.push(checkerResult.data.expectedType);
                    }
                    return new PropTypeError("Invalid " + location + " `" + propFullName + "` supplied to `" + componentName + "`" + (0 < expectedTypes.length ? ", expected one of type [" + expectedTypes.join(", ") + "]" : "") + ".");
                });
            },
            shape: function(shapeTypes) {
                return createChainableTypeChecker(function(props, propName, componentName, location, propFullName) {
                    var key, propValue = props[propName];
                    if ("object" !== (props = getPropType(propValue))) return new PropTypeError("Invalid " + location + " `" + propFullName + "` of type `" + props + "` supplied to `" + componentName + "`, expected `object`.");
                    for (key in shapeTypes) {
                        var checker = shapeTypes[key];
                        if ("function" != typeof checker) return invalidValidatorError(componentName, location, propFullName, key, getPreciseType(checker));
                        checker = checker(propValue, key, componentName, location, propFullName + "." + key, ReactPropTypesSecret_1);
                        if (checker) return checker;
                    }
                    return null;
                });
            },
            exact: function(shapeTypes) {
                return createChainableTypeChecker(function(props, propName, componentName, location, propFullName) {
                    var key, propValue = props[propName], propType = getPropType(propValue);
                    if ("object" !== propType) return new PropTypeError("Invalid " + location + " `" + propFullName + "` of type `" + propType + "` supplied to `" + componentName + "`, expected `object`.");
                    // We need to check all keys in case some are required but missing from props.
                    for (key in objectAssign({}, props[propName], shapeTypes)) {
                        var checker = shapeTypes[key];
                        if (has(shapeTypes, key) && "function" != typeof checker) return invalidValidatorError(componentName, location, propFullName, key, getPreciseType(checker));
                        if (!checker) return new PropTypeError("Invalid " + location + " `" + propFullName + "` key `" + key + "` supplied to `" + componentName + "`.\nBad object: " + JSON.stringify(props[propName], null, "  ") + "\nValid keys: " + JSON.stringify(Object.keys(shapeTypes), null, "  "));
                        checker = checker(propValue, key, componentName, location, propFullName + "." + key, ReactPropTypesSecret_1);
                        if (checker) return checker;
                    }
                    return null;
                });
            }
        };
        function PropTypeError(message, data) {
            this.message = message, this.data = data && "object" == typeof data ? data : {}, 
            this.stack = "";
        }
        // Make `instanceof Error` still work for returned errors.
        function createChainableTypeChecker(validate) {
            var manualPropTypeCallCache = {}, manualPropTypeWarningCount = 0;
            function checkType(isRequired, props, propName, componentName, location, propFullName, secret) {
                if (componentName = componentName || ANONYMOUS, propFullName = propFullName || propName, 
                secret !== ReactPropTypesSecret_1) {
                    if (throwOnDirectAccess) throw (secret = new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use `PropTypes.checkPropTypes()` to call them. Read more at http://fb.me/use-check-prop-types")).name = "Invariant Violation", 
                    secret;
                    "undefined" != typeof console && !manualPropTypeCallCache[secret = componentName + ":" + propName] && 
                    // Avoid spamming the console because they are often not actionable except for lib authors
                    manualPropTypeWarningCount < 3 && (printWarning$1("You are manually calling a React.PropTypes validation function for the `" + propFullName + "` prop on `" + componentName + "`. This is deprecated and will throw in the standalone `prop-types` package. You may be seeing this warning due to a third-party PropTypes library. See https://fb.me/react-warning-dont-call-proptypes for details."), 
                    manualPropTypeCallCache[secret] = !0, manualPropTypeWarningCount++);
                }
                return null == props[propName] ? isRequired ? null === props[propName] ? new PropTypeError("The " + location + " `" + propFullName + "` is marked as required in `" + componentName + "`, but its value is `null`.") : new PropTypeError("The " + location + " `" + propFullName + "` is marked as required in `" + componentName + "`, but its value is `undefined`.") : null : validate(props, propName, componentName, location, propFullName);
            }
            var chainedCheckType = checkType.bind(null, !1);
            return chainedCheckType.isRequired = checkType.bind(null, !0), chainedCheckType;
        }
        function createPrimitiveTypeChecker(expectedType) {
            return createChainableTypeChecker(function(props, propName, componentName, location, propFullName, secret) {
                return getPropType(props = props[propName]) !== expectedType ? new PropTypeError("Invalid " + location + " `" + propFullName + "` of type `" + getPreciseType(props) + "` supplied to `" + componentName + "`, expected `" + expectedType + "`.", {
                    expectedType: expectedType
                }) : null;
            });
        }
        function invalidValidatorError(componentName, location, propFullName, key, type) {
            return new PropTypeError((componentName || "React class") + ": " + location + " type `" + propFullName + "." + key + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + type + "`.");
        }
        function isNode(propValue) {
            switch (typeof propValue) {
              case "number":
              case "string":
              case "undefined":
                return !0;

              case "boolean":
                return !propValue;

              case "object":
                if (Array.isArray(propValue)) return propValue.every(isNode);
                if (null !== propValue && !isValidElement(propValue)) {
                    var iteratorFn = (// Before Symbol spec.
                    /**
     * Returns the iterator method function contained on the iterable object.
     *
     * Be sure to invoke the function with the iterable as context:
     *
     *     var iteratorFn = getIteratorFn(myIterable);
     *     if (iteratorFn) {
     *       var iterator = iteratorFn.call(myIterable);
     *       ...
     *     }
     *
     * @param {?object} maybeIterable
     * @return {?function}
     */
                    maybeIterable => {
                        if ("function" == typeof (maybeIterable = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]))) return maybeIterable;
                    }
                    /**
     * Collection of methods that allow declaration and validation of props that are
     * supplied to React components. Example usage:
     *
     *   var Props = require('ReactPropTypes');
     *   var MyArticle = React.createClass({
     *     propTypes: {
     *       // An optional string prop named "description".
     *       description: Props.string,
     *
     *       // A required enum prop named "category".
     *       category: Props.oneOf(['News','Photos']).isRequired,
     *
     *       // A prop named "dialog" that requires an instance of Dialog.
     *       dialog: Props.instanceOf(Dialog).isRequired
     *     },
     *     render: function() { ... }
     *   });
     *
     * A more formal specification of how these methods are used:
     *
     *   type := array|bool|func|object|number|string|oneOf([...])|instanceOf(...)
     *   decl := ReactPropTypes.{type}(.isRequired)?
     *
     * Each and every declaration produces a function with the same signature. This
     * allows the creation of custom validation functions. For example:
     *
     *  var MyLink = React.createClass({
     *    propTypes: {
     *      // An optional string or URI prop named "href".
     *      href: function(props, propName, componentName) {
     *        var propValue = props[propName];
     *        if (propValue != null && typeof propValue !== 'string' &&
     *            !(propValue instanceof URI)) {
     *          return new Error(
     *            'Expected a string or an URI for ' + propName + ' in ' +
     *            componentName
     *          );
     *        }
     *      }
     *    },
     *    render: function() {...}
     *  });
     *
     * @internal
     */)(propValue);
                    if (!iteratorFn) return !1;
                    var step, iterator = iteratorFn.call(propValue);
                    if (iteratorFn !== propValue.entries) {
                        for (;!(step = iterator.next()).done; ) if (!isNode(step.value)) return !1;
                    } else 
                    // Iterator will provide entry [k,v] tuples rather than values.
                    for (;!(step = iterator.next()).done; ) {
                        var entry = step.value;
                        if (entry && !isNode(entry[1])) return !1;
                    }
                }
                return !0;

              default:
                return !1;
            }
        }
        // Equivalent of `typeof` but with special handling for array and regexp.
        function getPropType(propValue) {
            var propType = typeof propValue;
            return Array.isArray(propValue) ? "array" : propValue instanceof RegExp ? "object" : ((propType, propValue) => 
            // Native Symbol.
            "symbol" === propType || 
            // falsy value can't be a Symbol
            propValue && (
            // 19.4.3.5 Symbol.prototype[@@toStringTag] === 'Symbol'
            "Symbol" === propValue["@@toStringTag"] || "function" == typeof Symbol && propValue instanceof Symbol))(propType, propValue) ? "symbol" : propType;
        }
        // This handles more types than `getPropType`. Only used for error messages.
        // See `createPrimitiveTypeChecker`.
        function getPreciseType(propValue) {
            if (null == propValue) return "" + propValue;
            var propType = getPropType(propValue);
            if ("object" === propType) {
                if (propValue instanceof Date) return "date";
                if (propValue instanceof RegExp) return "regexp";
            }
            return propType;
        }
        return PropTypeError.prototype = Error.prototype, ReactPropTypes.checkPropTypes = checkPropTypes_1, 
        ReactPropTypes.resetWarningCache = checkPropTypes_1.resetWarningCache, ReactPropTypes.PropTypes = ReactPropTypes;
    }
    var printWarning$1 = function(text) {
        text = "Warning: " + text;
        "undefined" != typeof console && console.error(text);
        try {
            // --- Welcome to debugging React ---
            // This error was thrown as a convenience so that you can use this stack
            // to find the callsite that caused this warning to fire.
            throw new Error(text);
        } catch (x) {}
    }, propTypes = createCommonjsModule(function(module) {
        var ReactIs = reactIs;
        // By explicitly using `prop-types` you are opting into new development behavior.
        // http://fb.me/prop-types-in-prod
        module.exports = factoryWithTypeCheckers(ReactIs.isElement, !0);
    });
    function clsx() {
        for (var e, f = 0, n = ""; f < arguments.length; ) (e = arguments[f++]) && (e = function r(e) {
            var t, f, n = "";
            if ("string" == typeof e || "number" == typeof e) n += e; else if ("object" == typeof e) if (Array.isArray(e)) for (t = 0; t < e.length; t++) e[t] && (f = r(e[t])) && (n && (n += " "), 
            n += f); else for (t in e) e[t] && (n && (n += " "), n += t);
            return n;
        }(e)) && (n && (n += " "), n += e);
        return n;
    }
    function createCallbackMemoizer(argument_0) {
        var requireAllKeys = !(0 < arguments.length && void 0 !== argument_0) || argument_0, cachedIndices = {};
        return function(_ref) {
            var callback = _ref.callback, indices = _ref.indices, _ref = Object.keys(indices), allInitialized = !requireAllKeys || _ref.every(function(key) {
                key = indices[key];
                return Array.isArray(key) ? 0 < key.length : 0 <= key;
            }), _ref = _ref.length !== Object.keys(cachedIndices).length || _ref.some(function(key) {
                var cachedValue = cachedIndices[key], key = indices[key];
                return Array.isArray(key) ? cachedValue.join(",") !== key.join(",") : cachedValue !== key;
            });
            cachedIndices = indices, allInitialized && _ref && callback(indices);
        };
    }
    var size, canUseDOM = !("undefined" == typeof window || !window.document || !window.document.createElement);
    function scrollbarSize(recalc) {
        return (!size && 0 !== size || recalc) && canUseDOM && ((recalc = document.createElement("div")).style.position = "absolute", 
        recalc.style.top = "-9999px", recalc.style.width = "50px", recalc.style.height = "50px", 
        recalc.style.overflow = "scroll", document.body.appendChild(recalc), size = recalc.offsetWidth - recalc.clientWidth, 
        document.body.removeChild(recalc)), size;
    }
    var SCROLL_POSITION_CHANGE_REASONS_OBSERVED = "observed", SCROLL_POSITION_CHANGE_REASONS_REQUESTED = "requested", CollectionView = (() => {
        function CollectionView() {
            var _this;
            _classCallCheck(this, CollectionView);
            for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) args[_key] = arguments[_key];
            return _defineProperty(_this = _callSuper(this, CollectionView, [].concat(args)), "state", {
                isScrolling: !1,
                scrollLeft: 0,
                scrollTop: 0
            }), _defineProperty(_this, "_calculateSizeAndPositionDataOnNextUpdate", !1), 
            _defineProperty(_this, "_onSectionRenderedMemoizer", createCallbackMemoizer()), 
            _defineProperty(_this, "_onScrollMemoizer", createCallbackMemoizer(!1)), 
            _defineProperty(_this, "_invokeOnSectionRenderedHelper", function() {
                var _this$props = _this.props, cellLayoutManager = _this$props.cellLayoutManager;
                _this._onSectionRenderedMemoizer({
                    callback: _this$props.onSectionRendered,
                    indices: {
                        indices: cellLayoutManager.getLastRenderedIndices()
                    }
                });
            }), _defineProperty(_this, "_setScrollingContainerRef", function(ref) {
                _this._scrollingContainer = ref;
            }), _defineProperty(_this, "_updateScrollPositionForScrollToCell", function() {
                var _this$props2 = _this.props, cellLayoutManager = _this$props2.cellLayoutManager, scrollToCell = _this$props2.scrollToCell, _this$state = _this.state, scrollLeft = _this$state.scrollLeft, _this$state = _this$state.scrollTop;
                0 <= scrollToCell && ((cellLayoutManager = cellLayoutManager.getScrollPositionForCell({
                    align: _this$props2.scrollToAlignment,
                    cellIndex: scrollToCell,
                    height: _this$props2.height,
                    scrollLeft: scrollLeft,
                    scrollTop: _this$state,
                    width: _this$props2.width
                })).scrollLeft === scrollLeft && cellLayoutManager.scrollTop === _this$state || _this._setScrollPosition(cellLayoutManager));
            }), _defineProperty(_this, "_onScroll", function(event) {
                var isScrollingChange, totalHeight, cellLayoutManager, _this$props3, height, scrollbarSize;
                event.target === _this._scrollingContainer && (_this._enablePointerEventsAfterDelay(), 
                cellLayoutManager = (_this$props3 = _this.props).cellLayoutManager, 
                height = _this$props3.height, isScrollingChange = _this$props3.isScrollingChange, 
                _this$props3 = _this$props3.width, scrollbarSize = _this._scrollbarSize, 
                totalHeight = (cellLayoutManager = cellLayoutManager.getTotalSize()).height, 
                cellLayoutManager = cellLayoutManager.width, _this$props3 = Math.max(0, Math.min(cellLayoutManager - _this$props3 + scrollbarSize, event.target.scrollLeft)), 
                height = Math.max(0, Math.min(totalHeight - height + scrollbarSize, event.target.scrollTop)), 
                _this.state.scrollLeft === _this$props3 && _this.state.scrollTop === height || (scrollbarSize = event.cancelable ? SCROLL_POSITION_CHANGE_REASONS_OBSERVED : SCROLL_POSITION_CHANGE_REASONS_REQUESTED, 
                _this.state.isScrolling || isScrollingChange(!0), _this.setState({
                    isScrolling: !0,
                    scrollLeft: _this$props3,
                    scrollPositionChangeReason: scrollbarSize,
                    scrollTop: height
                })), _this._invokeOnScrollMemoizer({
                    scrollLeft: _this$props3,
                    scrollTop: height,
                    totalWidth: cellLayoutManager,
                    totalHeight: totalHeight
                }));
            }), _this._scrollbarSize = scrollbarSize(), void 0 === _this._scrollbarSize ? (_this._scrollbarSizeMeasured = !1, 
            _this._scrollbarSize = 0) : _this._scrollbarSizeMeasured = !0, _this;
        }
        return _inherits(CollectionView, React.PureComponent), _createClass(CollectionView, [ {
            key: "recomputeCellSizesAndPositions",
            value: function() {
                this._calculateSizeAndPositionDataOnNextUpdate = !0, this.forceUpdate();
            }
        }, {
            key: "componentDidMount",
            value: function() {
                var _this$props4 = this.props, cellLayoutManager = _this$props4.cellLayoutManager, scrollLeft = _this$props4.scrollLeft, scrollToCell = _this$props4.scrollToCell, _this$props4 = _this$props4.scrollTop, scrollToCell = (this._scrollbarSizeMeasured || (this._scrollbarSize = scrollbarSize(), 
                this._scrollbarSizeMeasured = !0, this.setState({})), 0 <= scrollToCell ? this._updateScrollPositionForScrollToCell() : (0 <= scrollLeft || 0 <= _this$props4) && this._setScrollPosition({
                    scrollLeft: scrollLeft,
                    scrollTop: _this$props4
                }), this._invokeOnSectionRenderedHelper(), cellLayoutManager.getTotalSize()), cellLayoutManager = scrollToCell.height;
                this._invokeOnScrollMemoizer({
                    scrollLeft: scrollLeft || 0,
                    scrollTop: _this$props4 || 0,
                    totalHeight: cellLayoutManager,
                    totalWidth: scrollToCell.width
                });
            }
        }, {
            key: "componentDidUpdate",
            value: function(prevProps, prevState) {
                var _this$props5 = this.props, height = _this$props5.height, scrollToAlignment = _this$props5.scrollToAlignment, scrollToCell = _this$props5.scrollToCell, _this$props5 = _this$props5.width, _this$state2 = this.state, scrollLeft = _this$state2.scrollLeft, scrollTop = _this$state2.scrollTop;
                _this$state2.scrollPositionChangeReason === SCROLL_POSITION_CHANGE_REASONS_REQUESTED && (0 <= scrollLeft && scrollLeft !== prevState.scrollLeft && scrollLeft !== this._scrollingContainer.scrollLeft && (this._scrollingContainer.scrollLeft = scrollLeft), 
                0 <= scrollTop) && scrollTop !== prevState.scrollTop && scrollTop !== this._scrollingContainer.scrollTop && (this._scrollingContainer.scrollTop = scrollTop), 
                height === prevProps.height && scrollToAlignment === prevProps.scrollToAlignment && scrollToCell === prevProps.scrollToCell && _this$props5 === prevProps.width || this._updateScrollPositionForScrollToCell(), 
                this._invokeOnSectionRenderedHelper();
            }
        }, {
            key: "componentWillUnmount",
            value: function() {
                this._disablePointerEventsTimeoutId && clearTimeout(this._disablePointerEventsTimeoutId);
            }
        }, {
            key: "render",
            value: function() {
                var _this$props6 = this.props, autoHeight = _this$props6.autoHeight, cellCount = _this$props6.cellCount, cellLayoutManager = _this$props6.cellLayoutManager, className = _this$props6.className, height = _this$props6.height, horizontalOverscanSize = _this$props6.horizontalOverscanSize, id = _this$props6.id, noContentRenderer = _this$props6.noContentRenderer, style = _this$props6.style, verticalOverscanSize = _this$props6.verticalOverscanSize, _this$props6 = _this$props6.width, _this$state3 = this.state, isScrolling = _this$state3.isScrolling, scrollLeft = _this$state3.scrollLeft, _this$state3 = _this$state3.scrollTop, _cellLayoutManager$ge3 = (this._lastRenderedCellCount === cellCount && this._lastRenderedCellLayoutManager === cellLayoutManager && !this._calculateSizeAndPositionDataOnNextUpdate || (this._lastRenderedCellCount = cellCount, 
                this._lastRenderedCellLayoutManager = cellLayoutManager, this._calculateSizeAndPositionDataOnNextUpdate = !1, 
                cellLayoutManager.calculateSizeAndPositionData()), cellLayoutManager.getTotalSize()), totalHeight = _cellLayoutManager$ge3.height, _cellLayoutManager$ge3 = _cellLayoutManager$ge3.width, left = Math.max(0, scrollLeft - horizontalOverscanSize), top = Math.max(0, _this$state3 - verticalOverscanSize), scrollLeft = Math.min(_cellLayoutManager$ge3, scrollLeft + _this$props6 + horizontalOverscanSize), horizontalOverscanSize = Math.min(totalHeight, _this$state3 + height + verticalOverscanSize), _this$state3 = 0 < height && 0 < _this$props6 ? cellLayoutManager.cellRenderers({
                    height: horizontalOverscanSize - top,
                    isScrolling: isScrolling,
                    width: scrollLeft - left,
                    x: left,
                    y: top
                }) : [], verticalOverscanSize = {
                    boxSizing: "border-box",
                    direction: "ltr",
                    height: autoHeight ? "auto" : height,
                    position: "relative",
                    WebkitOverflowScrolling: "touch",
                    width: _this$props6,
                    willChange: "transform"
                }, cellLayoutManager = height < totalHeight ? this._scrollbarSize : 0, horizontalOverscanSize = _this$props6 < _cellLayoutManager$ge3 ? this._scrollbarSize : 0;
                return verticalOverscanSize.overflowX = _cellLayoutManager$ge3 + cellLayoutManager <= _this$props6 ? "hidden" : "auto", 
                verticalOverscanSize.overflowY = totalHeight + horizontalOverscanSize <= height ? "hidden" : "auto", 
                React.createElement("div", {
                    ref: this._setScrollingContainerRef,
                    "aria-label": this.props["aria-label"],
                    className: clsx("ReactVirtualized__Collection", className),
                    id: id,
                    onScroll: this._onScroll,
                    role: "grid",
                    style: _objectSpread2(_objectSpread2({}, verticalOverscanSize), style),
                    tabIndex: 0
                }, 0 < cellCount && React.createElement("div", {
                    className: "ReactVirtualized__Collection__innerScrollContainer",
                    style: {
                        height: totalHeight,
                        maxHeight: totalHeight,
                        maxWidth: _cellLayoutManager$ge3,
                        overflow: "hidden",
                        pointerEvents: isScrolling ? "none" : "",
                        width: _cellLayoutManager$ge3
                    }
                }, _this$state3), 0 === cellCount && noContentRenderer());
            }
        }, {
            key: "_enablePointerEventsAfterDelay",
            value: function() {
                var _this2 = this;
                this._disablePointerEventsTimeoutId && clearTimeout(this._disablePointerEventsTimeoutId), 
                this._disablePointerEventsTimeoutId = setTimeout(function() {
                    (0, _this2.props.isScrollingChange)(!1), _this2._disablePointerEventsTimeoutId = null, 
                    _this2.setState({
                        isScrolling: !1
                    });
                }, 150);
            }
        }, {
            key: "_invokeOnScrollMemoizer",
            value: function(_ref) {
                var _this3 = this, scrollLeft = _ref.scrollLeft, totalHeight = _ref.totalHeight, totalWidth = _ref.totalWidth;
                this._onScrollMemoizer({
                    callback: function(_ref2) {
                        var scrollLeft = _ref2.scrollLeft, _this3$props = _this3.props, height = _this3$props.height;
                        (0, _this3$props.onScroll)({
                            clientHeight: height,
                            clientWidth: _this3$props.width,
                            scrollHeight: totalHeight,
                            scrollLeft: scrollLeft,
                            scrollTop: _ref2.scrollTop,
                            scrollWidth: totalWidth
                        });
                    },
                    indices: {
                        scrollLeft: scrollLeft,
                        scrollTop: _ref.scrollTop
                    }
                });
            }
        }, {
            key: "_setScrollPosition",
            value: function(_ref3) {
                var scrollLeft = _ref3.scrollLeft, _ref3 = _ref3.scrollTop, newState = {
                    scrollPositionChangeReason: SCROLL_POSITION_CHANGE_REASONS_REQUESTED
                };
                0 <= scrollLeft && (newState.scrollLeft = scrollLeft), 0 <= _ref3 && (newState.scrollTop = _ref3), 
                (0 <= scrollLeft && scrollLeft !== this.state.scrollLeft || 0 <= _ref3 && _ref3 !== this.state.scrollTop) && this.setState(newState);
            }
        } ], [ {
            key: "getDerivedStateFromProps",
            value: function(nextProps, prevState) {
                return 0 !== nextProps.cellCount || 0 === prevState.scrollLeft && 0 === prevState.scrollTop ? nextProps.scrollLeft !== prevState.scrollLeft || nextProps.scrollTop !== prevState.scrollTop ? {
                    scrollLeft: (null != nextProps.scrollLeft ? nextProps : prevState).scrollLeft,
                    scrollTop: (null != nextProps.scrollTop ? nextProps : prevState).scrollTop,
                    scrollPositionChangeReason: SCROLL_POSITION_CHANGE_REASONS_REQUESTED
                } : null : {
                    scrollLeft: 0,
                    scrollTop: 0,
                    scrollPositionChangeReason: SCROLL_POSITION_CHANGE_REASONS_REQUESTED
                };
            }
        } ]);
    })(), Section = (_defineProperty(CollectionView, "propTypes", {
        "aria-label": propTypes.string,
        autoHeight: propTypes.bool,
        cellCount: propTypes.number.isRequired,
        cellLayoutManager: propTypes.object.isRequired,
        className: propTypes.string,
        height: propTypes.number.isRequired,
        id: propTypes.string,
        horizontalOverscanSize: propTypes.number.isRequired,
        isScrollingChange: propTypes.func,
        noContentRenderer: propTypes.func.isRequired,
        onScroll: propTypes.func.isRequired,
        onSectionRendered: propTypes.func.isRequired,
        scrollLeft: propTypes.number,
        scrollToAlignment: propTypes.oneOf([ "auto", "end", "start", "center" ]).isRequired,
        scrollToCell: propTypes.number.isRequired,
        scrollTop: propTypes.number,
        style: propTypes.object,
        verticalOverscanSize: propTypes.number.isRequired,
        width: propTypes.number.isRequired
    }), _defineProperty(CollectionView, "defaultProps", {
        "aria-label": "grid",
        horizontalOverscanSize: 0,
        noContentRenderer: function() {
            return null;
        },
        onScroll: function() {
            return null;
        },
        onSectionRendered: function() {
            return null;
        },
        scrollToAlignment: "auto",
        scrollToCell: -1,
        style: {},
        verticalOverscanSize: 0
    }), polyfill(CollectionView), _createClass(function Section(_ref) {
        var height = _ref.height, width = _ref.width, x = _ref.x, _ref = _ref.y;
        _classCallCheck(this, Section), this.height = height, this.width = width, 
        this.x = x, this.y = _ref, this._indexMap = {}, this._indices = [];
    }, [ {
        key: "addCellIndex",
        value: function(_ref2) {
            _ref2 = _ref2.index;
            this._indexMap[_ref2] || (this._indexMap[_ref2] = !0, this._indices.push(_ref2));
        }
    }, {
        key: "getCellIndices",
        value: function() {
            return this._indices;
        }
    }, {
        key: "toString",
        value: function() {
            return "".concat(this.x, ",").concat(this.y, " ").concat(this.width, "x").concat(this.height);
        }
    } ])), SectionManager = _createClass(function SectionManager() {
        var sectionSize = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : 100;
        _classCallCheck(this, SectionManager), this._sectionSize = sectionSize, 
        this._cellMetadata = [], this._sections = {};
    }, [ {
        key: "getCellIndices",
        value: function(_ref) {
            var height = _ref.height, indices = {};
            return this.getSections({
                height: height,
                width: _ref.width,
                x: _ref.x,
                y: _ref.y
            }).forEach(function(section) {
                return section.getCellIndices().forEach(function(index) {
                    indices[index] = index;
                });
            }), Object.keys(indices).map(function(index) {
                return indices[index];
            });
        }
    }, {
        key: "getCellMetadata",
        value: function(_ref2) {
            _ref2 = _ref2.index;
            return this._cellMetadata[_ref2];
        }
    }, {
        key: "getSections",
        value: function(_ref3) {
            for (var height = _ref3.height, width = _ref3.width, x = _ref3.x, _ref3 = _ref3.y, sectionXStart = Math.floor(x / this._sectionSize), sectionXStop = Math.floor((x + width - 1) / this._sectionSize), sectionYStart = Math.floor(_ref3 / this._sectionSize), sectionYStop = Math.floor((_ref3 + height - 1) / this._sectionSize), sections = [], sectionX = sectionXStart; sectionX <= sectionXStop; sectionX++) for (var sectionY = sectionYStart; sectionY <= sectionYStop; sectionY++) {
                var key = "".concat(sectionX, ".").concat(sectionY);
                this._sections[key] || (this._sections[key] = new Section({
                    height: this._sectionSize,
                    width: this._sectionSize,
                    x: sectionX * this._sectionSize,
                    y: sectionY * this._sectionSize
                })), sections.push(this._sections[key]);
            }
            return sections;
        }
    }, {
        key: "getTotalSectionCount",
        value: function() {
            return Object.keys(this._sections).length;
        }
    }, {
        key: "toString",
        value: function() {
            var _this = this;
            return Object.keys(this._sections).map(function(index) {
                return _this._sections[index].toString();
            });
        }
    }, {
        key: "registerCell",
        value: function(_ref4) {
            var cellMetadatum = _ref4.cellMetadatum, index = _ref4.index;
            this._cellMetadata[index] = cellMetadatum, this.getSections(cellMetadatum).forEach(function(section) {
                return section.addCellIndex({
                    index: index
                });
            });
        }
    } ]);
    function getUpdatedOffsetForIndex(_ref) {
        var _ref$align = _ref.align, cellSize = _ref.cellSize, containerSize = _ref.containerSize, currentOffset = _ref.currentOffset, maxOffset = _ref.cellOffset, minOffset = maxOffset - containerSize + cellSize;
        switch (void 0 === _ref$align ? "auto" : _ref$align) {
          case "start":
            return maxOffset;

          case "end":
            return minOffset;

          case "center":
            return maxOffset - (containerSize - cellSize) / 2;

          default:
            return Math.max(minOffset, Math.min(maxOffset, currentOffset));
        }
    }
    var Collection = (() => {
        function Collection(props, context) {
            return _classCallCheck(this, Collection), (props = _callSuper(this, Collection, [ props, context ]))._cellMetadata = [], 
            props._lastRenderedCellIndices = [], props._cellCache = [], props._isScrollingChange = props._isScrollingChange.bind(props), 
            props._setCollectionViewRef = props._setCollectionViewRef.bind(props), 
            props;
        }
        return _inherits(Collection, React.PureComponent), _createClass(Collection, [ {
            key: "forceUpdate",
            value: function() {
                void 0 !== this._collectionView && this._collectionView.forceUpdate();
            }
        }, {
            key: "recomputeCellSizesAndPositions",
            value: function() {
                this._cellCache = [], this._collectionView.recomputeCellSizesAndPositions();
            }
        }, {
            key: "render",
            value: function() {
                var props = _extends({}, ((t => {
                    if (null == t) throw new TypeError("Cannot destructure " + t);
                })(this.props), this.props));
                return React.createElement(CollectionView, _extends({
                    cellLayoutManager: this,
                    isScrollingChange: this._isScrollingChange,
                    ref: this._setCollectionViewRef
                }, props));
            }
        }, {
            key: "calculateSizeAndPositionData",
            value: function() {
                var _this$props = this.props, _this$props = (_ref => {
                    for (var cellCount = _ref.cellCount, cellSizeAndPositionGetter = _ref.cellSizeAndPositionGetter, cellMetadata = [], sectionManager = new SectionManager(_ref.sectionSize), height = 0, width = 0, index = 0; index < cellCount; index++) {
                        var cellMetadatum = cellSizeAndPositionGetter({
                            index: index
                        });
                        if (null == cellMetadatum.height || isNaN(cellMetadatum.height) || null == cellMetadatum.width || isNaN(cellMetadatum.width) || null == cellMetadatum.x || isNaN(cellMetadatum.x) || null == cellMetadatum.y || isNaN(cellMetadatum.y)) throw Error("Invalid metadata returned for cell ".concat(index, ":\n        x:").concat(cellMetadatum.x, ", y:").concat(cellMetadatum.y, ", width:").concat(cellMetadatum.width, ", height:").concat(cellMetadatum.height));
                        height = Math.max(height, cellMetadatum.y + cellMetadatum.height), 
                        width = Math.max(width, cellMetadatum.x + cellMetadatum.width), 
                        sectionManager.registerCell({
                            cellMetadatum: cellMetadata[index] = cellMetadatum,
                            index: index
                        });
                    }
                    return {
                        cellMetadata: cellMetadata,
                        height: height,
                        sectionManager: sectionManager,
                        width: width
                    };
                })({
                    cellCount: _this$props.cellCount,
                    cellSizeAndPositionGetter: _this$props.cellSizeAndPositionGetter,
                    sectionSize: _this$props.sectionSize
                });
                this._cellMetadata = _this$props.cellMetadata, this._sectionManager = _this$props.sectionManager, 
                this._height = _this$props.height, this._width = _this$props.width;
            }
        }, {
            key: "getLastRenderedIndices",
            value: function() {
                return this._lastRenderedCellIndices;
            }
        }, {
            key: "getScrollPositionForCell",
            value: function(_ref) {
                var align = _ref.align, cellIndex = _ref.cellIndex, height = _ref.height, scrollLeft = _ref.scrollLeft, scrollTop = _ref.scrollTop, cellCount = this.props.cellCount;
                return 0 <= cellIndex && cellIndex < cellCount && (scrollLeft = getUpdatedOffsetForIndex({
                    align: align,
                    cellOffset: (cellCount = this._cellMetadata[cellIndex]).x,
                    cellSize: cellCount.width,
                    containerSize: _ref.width,
                    currentOffset: scrollLeft,
                    targetIndex: cellIndex
                }), scrollTop = getUpdatedOffsetForIndex({
                    align: align,
                    cellOffset: cellCount.y,
                    cellSize: cellCount.height,
                    containerSize: height,
                    currentOffset: scrollTop,
                    targetIndex: cellIndex
                })), {
                    scrollLeft: scrollLeft,
                    scrollTop: scrollTop
                };
            }
        }, {
            key: "getTotalSize",
            value: function() {
                return {
                    height: this._height,
                    width: this._width
                };
            }
        }, {
            key: "cellRenderers",
            value: function(_ref2) {
                var _this2 = this, height = _ref2.height, isScrolling = _ref2.isScrolling, _this$props2 = this.props, cellGroupRenderer = _this$props2.cellGroupRenderer, _this$props2 = _this$props2.cellRenderer;
                return this._lastRenderedCellIndices = this._sectionManager.getCellIndices({
                    height: height,
                    width: _ref2.width,
                    x: _ref2.x,
                    y: _ref2.y
                }), cellGroupRenderer({
                    cellCache: this._cellCache,
                    cellRenderer: _this$props2,
                    cellSizeAndPositionGetter: function(_ref3) {
                        _ref3 = _ref3.index;
                        return _this2._sectionManager.getCellMetadata({
                            index: _ref3
                        });
                    },
                    indices: this._lastRenderedCellIndices,
                    isScrolling: isScrolling
                });
            }
        }, {
            key: "_isScrollingChange",
            value: function(isScrolling) {
                isScrolling || (this._cellCache = []);
            }
        }, {
            key: "_setCollectionViewRef",
            value: function(ref) {
                this._collectionView = ref;
            }
        } ]);
    })();
    _defineProperty(Collection, "propTypes", {
        "aria-label": propTypes.string,
        cellCount: propTypes.number.isRequired,
        cellGroupRenderer: propTypes.func.isRequired,
        cellRenderer: propTypes.func.isRequired,
        cellSizeAndPositionGetter: propTypes.func.isRequired,
        sectionSize: propTypes.number
    }), _defineProperty(Collection, "defaultProps", {
        "aria-label": "grid",
        cellGroupRenderer: function(_ref4) {
            var cellCache = _ref4.cellCache, cellRenderer = _ref4.cellRenderer, cellSizeAndPositionGetter = _ref4.cellSizeAndPositionGetter, indices = _ref4.indices, isScrolling = _ref4.isScrolling;
            return indices.map(function(index) {
                var cellMetadata = cellSizeAndPositionGetter({
                    index: index
                }), cellMetadata = {
                    index: index,
                    isScrolling: isScrolling,
                    key: index,
                    style: {
                        height: cellMetadata.height,
                        left: cellMetadata.x,
                        position: "absolute",
                        top: cellMetadata.y,
                        width: cellMetadata.width
                    }
                };
                return isScrolling ? (index in cellCache || (cellCache[index] = cellRenderer(cellMetadata)), 
                cellCache[index]) : cellRenderer(cellMetadata);
            }).filter(function(renderedCell) {
                return !!renderedCell;
            });
        }
    });
    var ColumnSizer = (() => {
        function ColumnSizer(props, context) {
            return _classCallCheck(this, ColumnSizer), (props = _callSuper(this, ColumnSizer, [ props, context ]))._registerChild = props._registerChild.bind(props), 
            props;
        }
        return _inherits(ColumnSizer, React.PureComponent), _createClass(ColumnSizer, [ {
            key: "componentDidUpdate",
            value: function(prevProps) {
                var _this$props = this.props;
                _this$props.columnMaxWidth === prevProps.columnMaxWidth && _this$props.columnMinWidth === prevProps.columnMinWidth && _this$props.columnCount === prevProps.columnCount && _this$props.width === prevProps.width || this._registeredChild && this._registeredChild.recomputeGridSize();
            }
        }, {
            key: "render",
            value: function() {
                var _this$props2 = this.props, children = _this$props2.children, columnMaxWidth = _this$props2.columnMaxWidth, columnCount = _this$props2.columnCount, width = _this$props2.width, _this$props2 = _this$props2.columnMinWidth || 1, columnMaxWidth = columnMaxWidth ? Math.min(columnMaxWidth, width) : width, columnWidth = width / columnCount, columnWidth = Math.max(_this$props2, columnWidth);
                return columnWidth = Math.min(columnMaxWidth, columnWidth), columnWidth = Math.floor(columnWidth), 
                children({
                    adjustedWidth: Math.min(width, columnWidth * columnCount),
                    columnWidth: columnWidth,
                    getColumnWidth: function() {
                        return columnWidth;
                    },
                    registerChild: this._registerChild
                });
            }
        }, {
            key: "_registerChild",
            value: function(child) {
                if (child && "function" != typeof child.recomputeGridSize) throw Error("Unexpected child type registered; only Grid/MultiGrid children are supported.");
                this._registeredChild = child, this._registeredChild && this._registeredChild.recomputeGridSize();
            }
        } ]);
    })();
    function calculateSizeAndPositionDataAndUpdateScrollOffset(_ref) {
        var cellCount = _ref.cellCount, cellSize = _ref.cellSize, computeMetadataCallback = _ref.computeMetadataCallback, nextCellSize = _ref.nextCellSize, nextScrollToIndex = _ref.nextScrollToIndex, scrollToIndex = _ref.scrollToIndex, updateScrollOffsetForScrollToIndex = _ref.updateScrollOffsetForScrollToIndex;
        cellCount === _ref.nextCellsCount && ("number" != typeof cellSize && "number" != typeof nextCellSize || cellSize === nextCellSize) || (computeMetadataCallback(_ref.computeMetadataCallbackProps), 
        0 <= scrollToIndex && scrollToIndex === nextScrollToIndex && updateScrollOffsetForScrollToIndex());
    }
    _defineProperty(ColumnSizer, "propTypes", {
        children: propTypes.func.isRequired,
        columnMaxWidth: propTypes.number,
        columnMinWidth: propTypes.number,
        columnCount: propTypes.number.isRequired,
        width: propTypes.number.isRequired
    });
    var CellSizeAndPositionManager = _createClass(function CellSizeAndPositionManager(_ref) {
        var cellCount = _ref.cellCount, cellSizeGetter = _ref.cellSizeGetter, _ref = _ref.estimatedCellSize;
        _classCallCheck(this, CellSizeAndPositionManager), _defineProperty(this, "_cellSizeAndPositionData", {}), 
        _defineProperty(this, "_lastMeasuredIndex", -1), _defineProperty(this, "_lastBatchedIndex", -1), 
        _defineProperty(this, "_cellCount", void 0), _defineProperty(this, "_cellSizeGetter", void 0), 
        _defineProperty(this, "_estimatedCellSize", void 0), this._cellSizeGetter = cellSizeGetter, 
        this._cellCount = cellCount, this._estimatedCellSize = _ref;
    }, [ {
        key: "areOffsetsAdjusted",
        value: function() {
            return !1;
        }
    }, {
        key: "configure",
        value: function(_ref2) {
            var cellCount = _ref2.cellCount, estimatedCellSize = _ref2.estimatedCellSize, _ref2 = _ref2.cellSizeGetter;
            this._cellCount = cellCount, this._estimatedCellSize = estimatedCellSize, 
            this._cellSizeGetter = _ref2;
        }
    }, {
        key: "getCellCount",
        value: function() {
            return this._cellCount;
        }
    }, {
        key: "getEstimatedCellSize",
        value: function() {
            return this._estimatedCellSize;
        }
    }, {
        key: "getLastMeasuredIndex",
        value: function() {
            return this._lastMeasuredIndex;
        }
    }, {
        key: "getOffsetAdjustment",
        value: function() {
            return 0;
        }
    }, {
        key: "getSizeAndPositionOfCell",
        value: function(index) {
            if (index < 0 || index >= this._cellCount) throw Error("Requested index ".concat(index, " is outside of range 0..").concat(this._cellCount));
            if (index > this._lastMeasuredIndex) for (var lastMeasuredCellSizeAndPosition = this.getSizeAndPositionOfLastMeasuredCell(), offset = lastMeasuredCellSizeAndPosition.offset + lastMeasuredCellSizeAndPosition.size, i = this._lastMeasuredIndex + 1; i <= index; i++) {
                var size = this._cellSizeGetter({
                    index: i
                });
                if (void 0 === size || isNaN(size)) throw Error("Invalid size returned for cell ".concat(i, " of value ").concat(size));
                null === size ? (this._cellSizeAndPositionData[i] = {
                    offset: offset,
                    size: 0
                }, this._lastBatchedIndex = index) : (this._cellSizeAndPositionData[i] = {
                    offset: offset,
                    size: size
                }, offset += size, this._lastMeasuredIndex = index);
            }
            return this._cellSizeAndPositionData[index];
        }
    }, {
        key: "getSizeAndPositionOfLastMeasuredCell",
        value: function() {
            return 0 <= this._lastMeasuredIndex ? this._cellSizeAndPositionData[this._lastMeasuredIndex] : {
                offset: 0,
                size: 0
            };
        }
    }, {
        key: "getTotalSize",
        value: function() {
            var lastMeasuredCellSizeAndPosition = this.getSizeAndPositionOfLastMeasuredCell();
            return lastMeasuredCellSizeAndPosition.offset + lastMeasuredCellSizeAndPosition.size + (this._cellCount - this._lastMeasuredIndex - 1) * this._estimatedCellSize;
        }
    }, {
        key: "getUpdatedOffsetForIndex",
        value: function(_ref3) {
            var _ref3$align = _ref3.align, _ref3$align = void 0 === _ref3$align ? "auto" : _ref3$align, containerSize = _ref3.containerSize, currentOffset = _ref3.currentOffset;
            if (containerSize <= 0) return 0;
            var idealOffset, datum = this.getSizeAndPositionOfCell(_ref3.targetIndex), maxOffset = datum.offset, minOffset = maxOffset - containerSize + datum.size;
            switch (_ref3$align) {
              case "start":
                idealOffset = maxOffset;
                break;

              case "end":
                idealOffset = minOffset;
                break;

              case "center":
                idealOffset = maxOffset - (containerSize - datum.size) / 2;
                break;

              default:
                idealOffset = Math.max(minOffset, Math.min(maxOffset, currentOffset));
            }
            _ref3 = this.getTotalSize();
            return Math.max(0, Math.min(_ref3 - containerSize, idealOffset));
        }
    }, {
        key: "getVisibleCellRange",
        value: function(params) {
            var containerSize = params.containerSize, offset = params.offset;
            if (0 === this.getTotalSize()) return {};
            for (var maxOffset = offset + containerSize, params = this._findNearestCell(offset), containerSize = this.getSizeAndPositionOfCell(params), offset = containerSize.offset + containerSize.size, stop = params; offset < maxOffset && stop < this._cellCount - 1; ) offset += this.getSizeAndPositionOfCell(++stop).size;
            return {
                start: params,
                stop: stop
            };
        }
    }, {
        key: "resetCell",
        value: function(index) {
            this._lastMeasuredIndex = Math.min(this._lastMeasuredIndex, index - 1);
        }
    }, {
        key: "_binarySearch",
        value: function(high, low, offset) {
            for (;low <= high; ) {
                var middle = low + Math.floor((high - low) / 2), currentOffset = this.getSizeAndPositionOfCell(middle).offset;
                if (currentOffset === offset) return middle;
                currentOffset < offset ? low = middle + 1 : offset < currentOffset && (high = middle - 1);
            }
            return 0 < low ? low - 1 : 0;
        }
    }, {
        key: "_exponentialSearch",
        value: function(index, offset) {
            for (var interval = 1; index < this._cellCount && this.getSizeAndPositionOfCell(index).offset < offset; ) index += interval, 
            interval *= 2;
            return this._binarySearch(Math.min(index, this._cellCount - 1), Math.floor(index / 2), offset);
        }
    }, {
        key: "_findNearestCell",
        value: function(offset) {
            if (isNaN(offset)) throw Error("Invalid offset ".concat(offset, " specified"));
            offset = Math.max(0, offset);
            var lastMeasuredCellSizeAndPosition = this.getSizeAndPositionOfLastMeasuredCell(), lastMeasuredIndex = Math.max(0, this._lastMeasuredIndex);
            return lastMeasuredCellSizeAndPosition.offset >= offset ? this._binarySearch(lastMeasuredIndex, 0, offset) : this._exponentialSearch(lastMeasuredIndex, offset);
        }
    } ]), DEFAULT_MAX_ELEMENT_SIZE = 15e5, CHROME_MAX_ELEMENT_SIZE = 16777100, isBrowser = function() {
        return "undefined" != typeof window;
    }, isChrome = function() {
        return !!window.chrome;
    }, _excluded = [ "maxScrollSize" ], ScalingCellSizeAndPositionManager = _createClass(function ScalingCellSizeAndPositionManager(_ref) {
        var _ref$maxScrollSize = _ref.maxScrollSize, _ref$maxScrollSize = void 0 === _ref$maxScrollSize ? isBrowser() && isChrome() ? CHROME_MAX_ELEMENT_SIZE : DEFAULT_MAX_ELEMENT_SIZE : _ref$maxScrollSize, _ref = _objectWithoutProperties(_ref, _excluded);
        _classCallCheck(this, ScalingCellSizeAndPositionManager), _defineProperty(this, "_cellSizeAndPositionManager", void 0), 
        _defineProperty(this, "_maxScrollSize", void 0), this._cellSizeAndPositionManager = new CellSizeAndPositionManager(_ref), 
        this._maxScrollSize = _ref$maxScrollSize;
    }, [ {
        key: "areOffsetsAdjusted",
        value: function() {
            return this._cellSizeAndPositionManager.getTotalSize() > this._maxScrollSize;
        }
    }, {
        key: "configure",
        value: function(params) {
            this._cellSizeAndPositionManager.configure(params);
        }
    }, {
        key: "getCellCount",
        value: function() {
            return this._cellSizeAndPositionManager.getCellCount();
        }
    }, {
        key: "getEstimatedCellSize",
        value: function() {
            return this._cellSizeAndPositionManager.getEstimatedCellSize();
        }
    }, {
        key: "getLastMeasuredIndex",
        value: function() {
            return this._cellSizeAndPositionManager.getLastMeasuredIndex();
        }
    }, {
        key: "getOffsetAdjustment",
        value: function(_ref2) {
            var containerSize = _ref2.containerSize, _ref2 = _ref2.offset, totalSize = this._cellSizeAndPositionManager.getTotalSize(), safeTotalSize = this.getTotalSize(), containerSize = this._getOffsetPercentage({
                containerSize: containerSize,
                offset: _ref2,
                totalSize: safeTotalSize
            });
            return Math.round(containerSize * (safeTotalSize - totalSize));
        }
    }, {
        key: "getSizeAndPositionOfCell",
        value: function(index) {
            return this._cellSizeAndPositionManager.getSizeAndPositionOfCell(index);
        }
    }, {
        key: "getSizeAndPositionOfLastMeasuredCell",
        value: function() {
            return this._cellSizeAndPositionManager.getSizeAndPositionOfLastMeasuredCell();
        }
    }, {
        key: "getTotalSize",
        value: function() {
            return Math.min(this._maxScrollSize, this._cellSizeAndPositionManager.getTotalSize());
        }
    }, {
        key: "getUpdatedOffsetForIndex",
        value: function(_ref3) {
            var _ref3$align = _ref3.align, _ref3$align = void 0 === _ref3$align ? "auto" : _ref3$align, containerSize = _ref3.containerSize, targetIndex = _ref3.targetIndex, _ref3 = this._safeOffsetToOffset({
                containerSize: containerSize,
                offset: _ref3.currentOffset
            }), _ref3$align = this._cellSizeAndPositionManager.getUpdatedOffsetForIndex({
                align: _ref3$align,
                containerSize: containerSize,
                currentOffset: _ref3,
                targetIndex: targetIndex
            });
            return this._offsetToSafeOffset({
                containerSize: containerSize,
                offset: _ref3$align
            });
        }
    }, {
        key: "getVisibleCellRange",
        value: function(_ref4) {
            var containerSize = _ref4.containerSize, _ref4 = this._safeOffsetToOffset({
                containerSize: containerSize,
                offset: _ref4.offset
            });
            return this._cellSizeAndPositionManager.getVisibleCellRange({
                containerSize: containerSize,
                offset: _ref4
            });
        }
    }, {
        key: "resetCell",
        value: function(index) {
            this._cellSizeAndPositionManager.resetCell(index);
        }
    }, {
        key: "_getOffsetPercentage",
        value: function(_ref5) {
            var containerSize = _ref5.containerSize, totalSize = _ref5.totalSize;
            return totalSize <= containerSize ? 0 : _ref5.offset / (totalSize - containerSize);
        }
    }, {
        key: "_offsetToSafeOffset",
        value: function(_ref6) {
            var containerSize = _ref6.containerSize, _ref6 = _ref6.offset, totalSize = this._cellSizeAndPositionManager.getTotalSize(), safeTotalSize = this.getTotalSize();
            return totalSize === safeTotalSize ? _ref6 : (_ref6 = this._getOffsetPercentage({
                containerSize: containerSize,
                offset: _ref6,
                totalSize: totalSize
            }), Math.round(_ref6 * (safeTotalSize - containerSize)));
        }
    }, {
        key: "_safeOffsetToOffset",
        value: function(_ref7) {
            var containerSize = _ref7.containerSize, _ref7 = _ref7.offset, totalSize = this._cellSizeAndPositionManager.getTotalSize(), safeTotalSize = this.getTotalSize();
            return totalSize === safeTotalSize ? _ref7 : (_ref7 = this._getOffsetPercentage({
                containerSize: containerSize,
                offset: _ref7,
                totalSize: safeTotalSize
            }), Math.round(_ref7 * (totalSize - containerSize)));
        }
    } ]);
    function defaultOverscanIndicesGetter(_ref) {
        var cellCount = _ref.cellCount, overscanCellsCount = _ref.overscanCellsCount, startIndex = _ref.startIndex, stopIndex = _ref.stopIndex;
        return 1 === _ref.scrollDirection ? {
            overscanStartIndex: Math.max(0, startIndex),
            overscanStopIndex: Math.min(cellCount - 1, stopIndex + overscanCellsCount)
        } : {
            overscanStartIndex: Math.max(0, startIndex - overscanCellsCount),
            overscanStopIndex: Math.min(cellCount - 1, stopIndex)
        };
    }
    function updateScrollIndexHelper(_ref) {
        var cellSize = _ref.cellSize, cellSizeAndPositionManager = _ref.cellSizeAndPositionManager, previousCellsCount = _ref.previousCellsCount, previousCellSize = _ref.previousCellSize, previousScrollToAlignment = _ref.previousScrollToAlignment, previousScrollToIndex = _ref.previousScrollToIndex, previousSize = _ref.previousSize, scrollOffset = _ref.scrollOffset, scrollToAlignment = _ref.scrollToAlignment, scrollToIndex = _ref.scrollToIndex, size = _ref.size, sizeJustIncreasedFromZero = _ref.sizeJustIncreasedFromZero, _ref = _ref.updateScrollIndexCallback, cellCount = cellSizeAndPositionManager.getCellCount(), hasScrollToIndex = 0 <= scrollToIndex && scrollToIndex < cellCount;
        hasScrollToIndex && (size !== previousSize || sizeJustIncreasedFromZero || !previousCellSize || "number" == typeof cellSize && cellSize !== previousCellSize || scrollToAlignment !== previousScrollToAlignment || scrollToIndex !== previousScrollToIndex) ? _ref(scrollToIndex) : !hasScrollToIndex && 0 < cellCount && (size < previousSize || cellCount < previousCellsCount) && scrollOffset > cellSizeAndPositionManager.getTotalSize() - size && _ref(cellCount - 1);
    }
    function defaultCellRangeRenderer(_ref) {
        for (var cellCache = _ref.cellCache, cellRenderer = _ref.cellRenderer, columnSizeAndPositionManager = _ref.columnSizeAndPositionManager, columnStartIndex = _ref.columnStartIndex, columnStopIndex = _ref.columnStopIndex, deferredMeasurementCache = _ref.deferredMeasurementCache, horizontalOffsetAdjustment = _ref.horizontalOffsetAdjustment, isScrolling = _ref.isScrolling, isScrollingOptOut = _ref.isScrollingOptOut, parent = _ref.parent, rowSizeAndPositionManager = _ref.rowSizeAndPositionManager, rowStartIndex = _ref.rowStartIndex, rowStopIndex = _ref.rowStopIndex, styleCache = _ref.styleCache, verticalOffsetAdjustment = _ref.verticalOffsetAdjustment, visibleColumnIndices = _ref.visibleColumnIndices, visibleRowIndices = _ref.visibleRowIndices, renderedCells = [], _ref = columnSizeAndPositionManager.areOffsetsAdjusted() || rowSizeAndPositionManager.areOffsetsAdjusted(), canCacheStyle = !isScrolling && !_ref, rowIndex = rowStartIndex; rowIndex <= rowStopIndex; rowIndex++) for (var rowDatum = rowSizeAndPositionManager.getSizeAndPositionOfCell(rowIndex), columnIndex = columnStartIndex; columnIndex <= columnStopIndex; columnIndex++) {
            var columnDatum = columnSizeAndPositionManager.getSizeAndPositionOfCell(columnIndex), isVisible = columnIndex >= visibleColumnIndices.start && columnIndex <= visibleColumnIndices.stop && rowIndex >= visibleRowIndices.start && rowIndex <= visibleRowIndices.stop, key = "".concat(rowIndex, "-").concat(columnIndex), style = void 0, columnDatum = (canCacheStyle && styleCache[key] ? style = styleCache[key] : deferredMeasurementCache && !deferredMeasurementCache.has(rowIndex, columnIndex) ? style = {
                height: "auto",
                left: 0,
                position: "absolute",
                top: 0,
                width: "auto"
            } : (style = {
                height: rowDatum.size,
                left: columnDatum.offset + horizontalOffsetAdjustment,
                position: "absolute",
                top: rowDatum.offset + verticalOffsetAdjustment,
                width: columnDatum.size
            }, styleCache[key] = style), {
                columnIndex: columnIndex,
                isScrolling: isScrolling,
                isVisible: isVisible,
                key: key,
                parent: parent,
                rowIndex: rowIndex,
                style: style
            }), isVisible = void 0;
            null != (isVisible = !isScrollingOptOut && !isScrolling || horizontalOffsetAdjustment || verticalOffsetAdjustment ? cellRenderer(columnDatum) : (cellCache[key] || (cellCache[key] = cellRenderer(columnDatum)), 
            cellCache[key])) && !1 !== isVisible && (((parent, renderedCell) => {
                (renderedCell = renderedCell && (renderedCell.type && renderedCell.type.__internalCellMeasurerFlag ? renderedCell.props.children : renderedCell)) && renderedCell.props && void 0 === renderedCell.props.style && !0 !== parent.__warnedAboutMissingStyle && (parent.__warnedAboutMissingStyle = !0, 
                console.warn("Rendered cell should include style property for positioning."));
            })(parent, isVisible), isVisible.props.role || (isVisible = React__default.cloneElement(isVisible, {
                role: "gridcell"
            })), renderedCells.push(isVisible));
        }
        return renderedCells;
    }
    var win, request = (win = "undefined" != typeof window ? window : "undefined" != typeof self ? self : {}).requestAnimationFrame || win.webkitRequestAnimationFrame || win.mozRequestAnimationFrame || win.oRequestAnimationFrame || win.msRequestAnimationFrame || function(callback) {
        return win.setTimeout(callback, 1e3 / 60);
    }, cancel = win.cancelAnimationFrame || win.webkitCancelAnimationFrame || win.mozCancelAnimationFrame || win.oCancelAnimationFrame || win.msCancelAnimationFrame || function(id) {
        win.clearTimeout(id);
    }, raf = request, caf = cancel, cancelAnimationTimeout = function(frame) {
        return caf(frame.id);
    }, requestAnimationTimeout = function(callback, delay) {
        function _timeout() {
            Date.now() - start >= delay ? callback.call() : frame.id = raf(_timeout);
        }
        Promise.resolve().then(function() {
            start = Date.now();
        });
        var start, frame = {
            id: raf(_timeout)
        };
        return frame;
    }, SCROLL_POSITION_CHANGE_REASONS$1_OBSERVED = "observed", SCROLL_POSITION_CHANGE_REASONS$1_REQUESTED = "requested", Grid = (() => {
        function Grid(props) {
            _classCallCheck(this, Grid), _defineProperty(_this = _callSuper(this, Grid, [ props ]), "_onGridRenderedMemoizer", createCallbackMemoizer()), 
            _defineProperty(_this, "_onScrollMemoizer", createCallbackMemoizer(!1)), 
            _defineProperty(_this, "_deferredInvalidateColumnIndex", null), _defineProperty(_this, "_deferredInvalidateRowIndex", null), 
            _defineProperty(_this, "_recomputeScrollLeftFlag", !1), _defineProperty(_this, "_recomputeScrollTopFlag", !1), 
            _defineProperty(_this, "_horizontalScrollBarSize", 0), _defineProperty(_this, "_verticalScrollBarSize", 0), 
            _defineProperty(_this, "_scrollbarPresenceChanged", !1), _defineProperty(_this, "_scrollingContainer", void 0), 
            _defineProperty(_this, "_childrenToDisplay", void 0), _defineProperty(_this, "_columnStartIndex", void 0), 
            _defineProperty(_this, "_columnStopIndex", void 0), _defineProperty(_this, "_rowStartIndex", void 0), 
            _defineProperty(_this, "_rowStopIndex", void 0), _defineProperty(_this, "_renderedColumnStartIndex", 0), 
            _defineProperty(_this, "_renderedColumnStopIndex", 0), _defineProperty(_this, "_renderedRowStartIndex", 0), 
            _defineProperty(_this, "_renderedRowStopIndex", 0), _defineProperty(_this, "_initialScrollTop", void 0), 
            _defineProperty(_this, "_initialScrollLeft", void 0), _defineProperty(_this, "_disablePointerEventsTimeoutId", void 0), 
            _defineProperty(_this, "_styleCache", {}), _defineProperty(_this, "_cellCache", {}), 
            _defineProperty(_this, "_debounceScrollEndedCallback", function() {
                _this._disablePointerEventsTimeoutId = null, _this.setState({
                    isScrolling: !1,
                    needToResetStyleCache: !1
                });
            }), _defineProperty(_this, "_invokeOnGridRenderedHelper", function() {
                var onSectionRendered = _this.props.onSectionRendered;
                _this._onGridRenderedMemoizer({
                    callback: onSectionRendered,
                    indices: {
                        columnOverscanStartIndex: _this._columnStartIndex,
                        columnOverscanStopIndex: _this._columnStopIndex,
                        columnStartIndex: _this._renderedColumnStartIndex,
                        columnStopIndex: _this._renderedColumnStopIndex,
                        rowOverscanStartIndex: _this._rowStartIndex,
                        rowOverscanStopIndex: _this._rowStopIndex,
                        rowStartIndex: _this._renderedRowStartIndex,
                        rowStopIndex: _this._renderedRowStopIndex
                    }
                });
            }), _defineProperty(_this, "_setScrollingContainerRef", function(ref) {
                _this._scrollingContainer = ref, "function" == typeof _this.props.elementRef ? _this.props.elementRef(ref) : "object" === _typeof(_this.props.elementRef) && (_this.props.elementRef.current = ref);
            }), _defineProperty(_this, "_onScroll", function(event) {
                event.target === _this._scrollingContainer && _this.handleScrollEvent(event.target);
            });
            var _this, columnSizeAndPositionManager = new ScalingCellSizeAndPositionManager({
                cellCount: props.columnCount,
                cellSizeGetter: function(params) {
                    return Grid._wrapSizeGetter(props.columnWidth)(params);
                },
                estimatedCellSize: Grid._getEstimatedColumnSize(props)
            }), rowSizeAndPositionManager = new ScalingCellSizeAndPositionManager({
                cellCount: props.rowCount,
                cellSizeGetter: function(params) {
                    return Grid._wrapSizeGetter(props.rowHeight)(params);
                },
                estimatedCellSize: Grid._getEstimatedRowSize(props)
            });
            return _this.state = {
                instanceProps: {
                    columnSizeAndPositionManager: columnSizeAndPositionManager,
                    rowSizeAndPositionManager: rowSizeAndPositionManager,
                    prevColumnWidth: props.columnWidth,
                    prevRowHeight: props.rowHeight,
                    prevColumnCount: props.columnCount,
                    prevRowCount: props.rowCount,
                    prevIsScrolling: !0 === props.isScrolling,
                    prevScrollToColumn: props.scrollToColumn,
                    prevScrollToRow: props.scrollToRow,
                    scrollbarSize: 0,
                    scrollbarSizeMeasured: !1
                },
                isScrolling: !1,
                scrollDirectionHorizontal: 1,
                scrollDirectionVertical: 1,
                scrollLeft: 0,
                scrollTop: 0,
                scrollPositionChangeReason: null,
                needToResetStyleCache: !1
            }, 0 < props.scrollToRow && (_this._initialScrollTop = _this._getCalculatedScrollTop(props, _this.state)), 
            0 < props.scrollToColumn && (_this._initialScrollLeft = _this._getCalculatedScrollLeft(props, _this.state)), 
            _this;
        }
        return _inherits(Grid, React.PureComponent), _createClass(Grid, [ {
            key: "getOffsetForCell",
            value: function() {
                var _ref = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {}, _ref$alignment = _ref.alignment, _ref$alignment = void 0 === _ref$alignment ? this.props.scrollToAlignment : _ref$alignment, _ref$columnIndex = _ref.columnIndex, _ref$columnIndex = void 0 === _ref$columnIndex ? this.props.scrollToColumn : _ref$columnIndex, _ref = _ref.rowIndex, _ref = void 0 === _ref ? this.props.scrollToRow : _ref, _ref$alignment = _objectSpread2(_objectSpread2({}, this.props), {}, {
                    scrollToAlignment: _ref$alignment,
                    scrollToColumn: _ref$columnIndex,
                    scrollToRow: _ref
                });
                return {
                    scrollLeft: this._getCalculatedScrollLeft(_ref$alignment),
                    scrollTop: this._getCalculatedScrollTop(_ref$alignment)
                };
            }
        }, {
            key: "getTotalRowsHeight",
            value: function() {
                return this.state.instanceProps.rowSizeAndPositionManager.getTotalSize();
            }
        }, {
            key: "getTotalColumnsWidth",
            value: function() {
                return this.state.instanceProps.columnSizeAndPositionManager.getTotalSize();
            }
        }, {
            key: "handleScrollEvent",
            value: function(_ref2) {
                var autoHeight, autoWidth, scrollbarSize, totalRowsHeight, instanceProps, _this$props, height, _ref2$scrollLeft = _ref2.scrollLeft, _ref2$scrollLeft = void 0 === _ref2$scrollLeft ? 0 : _ref2$scrollLeft, _ref2 = _ref2.scrollTop, _ref2 = void 0 === _ref2 ? 0 : _ref2;
                _ref2 < 0 || (this._debounceScrollEnded(), autoHeight = (_this$props = this.props).autoHeight, 
                autoWidth = _this$props.autoWidth, height = _this$props.height, 
                _this$props = _this$props.width, scrollbarSize = (instanceProps = this.state.instanceProps).scrollbarSize, 
                totalRowsHeight = instanceProps.rowSizeAndPositionManager.getTotalSize(), 
                instanceProps = instanceProps.columnSizeAndPositionManager.getTotalSize(), 
                _this$props = Math.min(Math.max(0, instanceProps - _this$props + scrollbarSize), _ref2$scrollLeft), 
                _ref2$scrollLeft = Math.min(Math.max(0, totalRowsHeight - height + scrollbarSize), _ref2), 
                this.state.scrollLeft === _this$props && this.state.scrollTop === _ref2$scrollLeft || (height = {
                    isScrolling: !0,
                    scrollDirectionHorizontal: _this$props !== this.state.scrollLeft ? _this$props > this.state.scrollLeft ? 1 : -1 : this.state.scrollDirectionHorizontal,
                    scrollDirectionVertical: _ref2$scrollLeft !== this.state.scrollTop ? _ref2$scrollLeft > this.state.scrollTop ? 1 : -1 : this.state.scrollDirectionVertical,
                    scrollPositionChangeReason: SCROLL_POSITION_CHANGE_REASONS$1_OBSERVED
                }, autoHeight || (height.scrollTop = _ref2$scrollLeft), autoWidth || (height.scrollLeft = _this$props), 
                height.needToResetStyleCache = !1, this.setState(height)), this._invokeOnScrollMemoizer({
                    scrollLeft: _this$props,
                    scrollTop: _ref2$scrollLeft,
                    totalColumnsWidth: instanceProps,
                    totalRowsHeight: totalRowsHeight
                }));
            }
        }, {
            key: "invalidateCellSizeAfterRender",
            value: function(_ref3) {
                var columnIndex = _ref3.columnIndex, _ref3 = _ref3.rowIndex;
                this._deferredInvalidateColumnIndex = "number" == typeof this._deferredInvalidateColumnIndex ? Math.min(this._deferredInvalidateColumnIndex, columnIndex) : columnIndex, 
                this._deferredInvalidateRowIndex = "number" == typeof this._deferredInvalidateRowIndex ? Math.min(this._deferredInvalidateRowIndex, _ref3) : _ref3;
            }
        }, {
            key: "measureAllCells",
            value: function() {
                var _this$props2 = this.props, columnCount = _this$props2.columnCount, _this$props2 = _this$props2.rowCount, instanceProps = this.state.instanceProps;
                instanceProps.columnSizeAndPositionManager.getSizeAndPositionOfCell(columnCount - 1), 
                instanceProps.rowSizeAndPositionManager.getSizeAndPositionOfCell(_this$props2 - 1);
            }
        }, {
            key: "recomputeGridSize",
            value: function() {
                var _ref4 = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {}, _ref4$columnIndex = _ref4.columnIndex, _ref4$columnIndex = void 0 === _ref4$columnIndex ? 0 : _ref4$columnIndex, _ref4 = _ref4.rowIndex, _ref4 = void 0 === _ref4 ? 0 : _ref4, _this$props3 = this.props, scrollToColumn = _this$props3.scrollToColumn, _this$props3 = _this$props3.scrollToRow, instanceProps = this.state.instanceProps;
                instanceProps.columnSizeAndPositionManager.resetCell(_ref4$columnIndex), 
                instanceProps.rowSizeAndPositionManager.resetCell(_ref4), this._recomputeScrollLeftFlag = 0 <= scrollToColumn && (1 === this.state.scrollDirectionHorizontal ? _ref4$columnIndex <= scrollToColumn : scrollToColumn <= _ref4$columnIndex), 
                this._recomputeScrollTopFlag = 0 <= _this$props3 && (1 === this.state.scrollDirectionVertical ? _ref4 <= _this$props3 : _this$props3 <= _ref4), 
                this._styleCache = {}, this._cellCache = {}, this.forceUpdate();
            }
        }, {
            key: "scrollToCell",
            value: function(_ref5) {
                var columnIndex = _ref5.columnIndex, _ref5 = _ref5.rowIndex, columnCount = this.props.columnCount, props = this.props;
                1 < columnCount && void 0 !== columnIndex && this._updateScrollLeftForScrollToColumn(_objectSpread2(_objectSpread2({}, props), {}, {
                    scrollToColumn: columnIndex
                })), void 0 !== _ref5 && this._updateScrollTopForScrollToRow(_objectSpread2(_objectSpread2({}, props), {}, {
                    scrollToRow: _ref5
                }));
            }
        }, {
            key: "componentDidMount",
            value: function() {
                var _this$props4 = this.props, getScrollbarSize = _this$props4.getScrollbarSize, height = _this$props4.height, scrollLeft = _this$props4.scrollLeft, scrollToColumn = _this$props4.scrollToColumn, scrollTop = _this$props4.scrollTop, scrollToRow = _this$props4.scrollToRow, _this$props4 = _this$props4.width, instanceProps = this.state.instanceProps, stateUpdate = (this._initialScrollTop = 0, 
                this._initialScrollLeft = 0, this._handleInvalidatedGridSize(), 
                instanceProps.scrollbarSizeMeasured || this.setState(function(prevState) {
                    prevState = _objectSpread2(_objectSpread2({}, prevState), {}, {
                        needToResetStyleCache: !1
                    });
                    return prevState.instanceProps.scrollbarSize = getScrollbarSize(), 
                    prevState.instanceProps.scrollbarSizeMeasured = !0, prevState;
                }), ("number" == typeof scrollLeft && 0 <= scrollLeft || "number" == typeof scrollTop && 0 <= scrollTop) && (stateUpdate = Grid._getScrollToPositionStateUpdate({
                    prevState: this.state,
                    scrollLeft: scrollLeft,
                    scrollTop: scrollTop
                })) && (stateUpdate.needToResetStyleCache = !1, this.setState(stateUpdate)), 
                this._scrollingContainer && (this._scrollingContainer.scrollLeft !== this.state.scrollLeft && (this._scrollingContainer.scrollLeft = this.state.scrollLeft), 
                this._scrollingContainer.scrollTop !== this.state.scrollTop) && (this._scrollingContainer.scrollTop = this.state.scrollTop), 
                0 < height && 0 < _this$props4);
                0 <= scrollToColumn && stateUpdate && this._updateScrollLeftForScrollToColumn(), 
                0 <= scrollToRow && stateUpdate && this._updateScrollTopForScrollToRow(), 
                this._invokeOnGridRenderedHelper(), this._invokeOnScrollMemoizer({
                    scrollLeft: scrollLeft || 0,
                    scrollTop: scrollTop || 0,
                    totalColumnsWidth: instanceProps.columnSizeAndPositionManager.getTotalSize(),
                    totalRowsHeight: instanceProps.rowSizeAndPositionManager.getTotalSize()
                }), this._maybeCallOnScrollbarPresenceChange();
            }
        }, {
            key: "componentDidUpdate",
            value: function(prevProps, prevState) {
                var _this2 = this, _this$props5 = this.props, autoHeight = _this$props5.autoHeight, autoWidth = _this$props5.autoWidth, columnCount = _this$props5.columnCount, height = _this$props5.height, rowCount = _this$props5.rowCount, scrollToAlignment = _this$props5.scrollToAlignment, scrollToColumn = _this$props5.scrollToColumn, scrollToRow = _this$props5.scrollToRow, _this$props5 = _this$props5.width, _this$state = this.state, scrollLeft = _this$state.scrollLeft, scrollPositionChangeReason = _this$state.scrollPositionChangeReason, scrollTop = _this$state.scrollTop, _this$state = _this$state.instanceProps, columnCount = (this._handleInvalidatedGridSize(), 
                0 < columnCount && 0 === prevProps.columnCount || 0 < rowCount && 0 === prevProps.rowCount), rowCount = (scrollPositionChangeReason === SCROLL_POSITION_CHANGE_REASONS$1_REQUESTED && (!autoWidth && 0 <= scrollLeft && (scrollLeft !== this._scrollingContainer.scrollLeft || columnCount) && (this._scrollingContainer.scrollLeft = scrollLeft), 
                !autoHeight) && 0 <= scrollTop && (scrollTop !== this._scrollingContainer.scrollTop || columnCount) && (this._scrollingContainer.scrollTop = scrollTop), 
                (0 === prevProps.width || 0 === prevProps.height) && 0 < height && 0 < _this$props5);
                this._recomputeScrollLeftFlag ? (this._recomputeScrollLeftFlag = !1, 
                this._updateScrollLeftForScrollToColumn(this.props)) : updateScrollIndexHelper({
                    cellSizeAndPositionManager: _this$state.columnSizeAndPositionManager,
                    previousCellsCount: prevProps.columnCount,
                    previousCellSize: prevProps.columnWidth,
                    previousScrollToAlignment: prevProps.scrollToAlignment,
                    previousScrollToIndex: prevProps.scrollToColumn,
                    previousSize: prevProps.width,
                    scrollOffset: scrollLeft,
                    scrollToAlignment: scrollToAlignment,
                    scrollToIndex: scrollToColumn,
                    size: _this$props5,
                    sizeJustIncreasedFromZero: rowCount,
                    updateScrollIndexCallback: function() {
                        return _this2._updateScrollLeftForScrollToColumn(_this2.props);
                    }
                }), this._recomputeScrollTopFlag ? (this._recomputeScrollTopFlag = !1, 
                this._updateScrollTopForScrollToRow(this.props)) : updateScrollIndexHelper({
                    cellSizeAndPositionManager: _this$state.rowSizeAndPositionManager,
                    previousCellsCount: prevProps.rowCount,
                    previousCellSize: prevProps.rowHeight,
                    previousScrollToAlignment: prevProps.scrollToAlignment,
                    previousScrollToIndex: prevProps.scrollToRow,
                    previousSize: prevProps.height,
                    scrollOffset: scrollTop,
                    scrollToAlignment: scrollToAlignment,
                    scrollToIndex: scrollToRow,
                    size: height,
                    sizeJustIncreasedFromZero: rowCount,
                    updateScrollIndexCallback: function() {
                        return _this2._updateScrollTopForScrollToRow(_this2.props);
                    }
                }), this._invokeOnGridRenderedHelper(), scrollLeft === prevState.scrollLeft && scrollTop === prevState.scrollTop || (scrollPositionChangeReason = _this$state.rowSizeAndPositionManager.getTotalSize(), 
                autoWidth = _this$state.columnSizeAndPositionManager.getTotalSize(), 
                this._invokeOnScrollMemoizer({
                    scrollLeft: scrollLeft,
                    scrollTop: scrollTop,
                    totalColumnsWidth: autoWidth,
                    totalRowsHeight: scrollPositionChangeReason
                })), this._maybeCallOnScrollbarPresenceChange();
            }
        }, {
            key: "componentWillUnmount",
            value: function() {
                this._disablePointerEventsTimeoutId && cancelAnimationTimeout(this._disablePointerEventsTimeoutId);
            }
        }, {
            key: "render",
            value: function() {
                var _this$props6 = this.props, autoContainerWidth = _this$props6.autoContainerWidth, autoHeight = _this$props6.autoHeight, autoWidth = _this$props6.autoWidth, className = _this$props6.className, containerProps = _this$props6.containerProps, containerRole = _this$props6.containerRole, containerStyle = _this$props6.containerStyle, height = _this$props6.height, id = _this$props6.id, noContentRenderer = _this$props6.noContentRenderer, role = _this$props6.role, style = _this$props6.style, tabIndex = _this$props6.tabIndex, _this$props6 = _this$props6.width, _this$state2 = this.state, instanceProps = _this$state2.instanceProps, _this$state2 = _this$state2.needToResetStyleCache, isScrolling = this._isScrolling(), autoHeight = {
                    boxSizing: "border-box",
                    direction: "ltr",
                    height: autoHeight ? "auto" : height,
                    position: "relative",
                    width: autoWidth ? "auto" : _this$props6,
                    WebkitOverflowScrolling: "touch",
                    willChange: "transform"
                }, autoWidth = (_this$state2 && (this._styleCache = {}), this.state.isScrolling || this._resetStyleCache(), 
                this._calculateChildrenToRender(this.props, this.state), instanceProps.columnSizeAndPositionManager.getTotalSize()), _this$state2 = instanceProps.rowSizeAndPositionManager.getTotalSize(), verticalScrollBarSize = height < _this$state2 ? instanceProps.scrollbarSize : 0, instanceProps = _this$props6 < autoWidth ? instanceProps.scrollbarSize : 0, verticalScrollBarSize = (instanceProps === this._horizontalScrollBarSize && verticalScrollBarSize === this._verticalScrollBarSize || (this._horizontalScrollBarSize = instanceProps, 
                this._verticalScrollBarSize = verticalScrollBarSize, this._scrollbarPresenceChanged = !0), 
                autoHeight.overflowX = autoWidth + verticalScrollBarSize <= _this$props6 ? "hidden" : "auto", 
                autoHeight.overflowY = _this$state2 + instanceProps <= height ? "hidden" : "auto", 
                this._childrenToDisplay), instanceProps = 0 === verticalScrollBarSize.length && 0 < height && 0 < _this$props6;
                return React.createElement("div", _extends({
                    ref: this._setScrollingContainerRef
                }, containerProps, {
                    "aria-label": this.props["aria-label"],
                    "aria-readonly": this.props["aria-readonly"],
                    className: clsx("ReactVirtualized__Grid", className),
                    id: id,
                    onScroll: this._onScroll,
                    role: role,
                    style: _objectSpread2(_objectSpread2({}, autoHeight), style),
                    tabIndex: tabIndex
                }), 0 < verticalScrollBarSize.length && React.createElement("div", {
                    className: "ReactVirtualized__Grid__innerScrollContainer",
                    role: containerRole,
                    style: _objectSpread2({
                        width: autoContainerWidth ? "auto" : autoWidth,
                        height: _this$state2,
                        maxWidth: autoWidth,
                        maxHeight: _this$state2,
                        overflow: "hidden",
                        pointerEvents: isScrolling ? "none" : "",
                        position: "relative"
                    }, containerStyle)
                }, verticalScrollBarSize), instanceProps && noContentRenderer());
            }
        }, {
            key: "_calculateChildrenToRender",
            value: function() {
                var props = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : this.props, state = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : this.state, cellRenderer = props.cellRenderer, cellRangeRenderer = props.cellRangeRenderer, columnCount = props.columnCount, deferredMeasurementCache = props.deferredMeasurementCache, height = props.height, overscanColumnCount = props.overscanColumnCount, overscanIndicesGetter = props.overscanIndicesGetter, overscanRowCount = props.overscanRowCount, rowCount = props.rowCount, width = props.width, isScrollingOptOut = props.isScrollingOptOut, scrollDirectionHorizontal = state.scrollDirectionHorizontal, scrollDirectionVertical = state.scrollDirectionVertical, instanceProps = state.instanceProps, scrollTop = 0 < this._initialScrollTop ? this._initialScrollTop : state.scrollTop, scrollLeft = 0 < this._initialScrollLeft ? this._initialScrollLeft : state.scrollLeft, props = this._isScrolling(props, state);
                if (this._childrenToDisplay = [], 0 < height && 0 < width) {
                    var state = instanceProps.columnSizeAndPositionManager.getVisibleCellRange({
                        containerSize: width,
                        offset: scrollLeft
                    }), visibleRowIndices = instanceProps.rowSizeAndPositionManager.getVisibleCellRange({
                        containerSize: height,
                        offset: scrollTop
                    }), width = instanceProps.columnSizeAndPositionManager.getOffsetAdjustment({
                        containerSize: width,
                        offset: scrollLeft
                    }), height = instanceProps.rowSizeAndPositionManager.getOffsetAdjustment({
                        containerSize: height,
                        offset: scrollTop
                    }), overscanColumnCount = (this._renderedColumnStartIndex = state.start, 
                    this._renderedColumnStopIndex = state.stop, this._renderedRowStartIndex = visibleRowIndices.start, 
                    this._renderedRowStopIndex = visibleRowIndices.stop, overscanIndicesGetter({
                        direction: "horizontal",
                        cellCount: columnCount,
                        overscanCellsCount: overscanColumnCount,
                        scrollDirection: scrollDirectionHorizontal,
                        startIndex: "number" == typeof state.start ? state.start : 0,
                        stopIndex: "number" == typeof state.stop ? state.stop : -1
                    })), scrollDirectionHorizontal = overscanIndicesGetter({
                        direction: "vertical",
                        cellCount: rowCount,
                        overscanCellsCount: overscanRowCount,
                        scrollDirection: scrollDirectionVertical,
                        startIndex: "number" == typeof visibleRowIndices.start ? visibleRowIndices.start : 0,
                        stopIndex: "number" == typeof visibleRowIndices.stop ? visibleRowIndices.stop : -1
                    }), columnStartIndex = overscanColumnCount.overscanStartIndex, columnStopIndex = overscanColumnCount.overscanStopIndex, rowStartIndex = scrollDirectionHorizontal.overscanStartIndex, rowStopIndex = scrollDirectionHorizontal.overscanStopIndex;
                    if (deferredMeasurementCache) {
                        if (!deferredMeasurementCache.hasFixedHeight()) for (var rowIndex = rowStartIndex; rowIndex <= rowStopIndex; rowIndex++) if (!deferredMeasurementCache.has(rowIndex, 0)) {
                            columnStartIndex = 0, columnStopIndex = columnCount - 1;
                            break;
                        }
                        if (!deferredMeasurementCache.hasFixedWidth()) for (var columnIndex = columnStartIndex; columnIndex <= columnStopIndex; columnIndex++) if (!deferredMeasurementCache.has(0, columnIndex)) {
                            rowStartIndex = 0, rowStopIndex = rowCount - 1;
                            break;
                        }
                    }
                    this._childrenToDisplay = cellRangeRenderer({
                        cellCache: this._cellCache,
                        cellRenderer: cellRenderer,
                        columnSizeAndPositionManager: instanceProps.columnSizeAndPositionManager,
                        columnStartIndex: columnStartIndex,
                        columnStopIndex: columnStopIndex,
                        deferredMeasurementCache: deferredMeasurementCache,
                        horizontalOffsetAdjustment: width,
                        isScrolling: props,
                        isScrollingOptOut: isScrollingOptOut,
                        parent: this,
                        rowSizeAndPositionManager: instanceProps.rowSizeAndPositionManager,
                        rowStartIndex: rowStartIndex,
                        rowStopIndex: rowStopIndex,
                        scrollLeft: scrollLeft,
                        scrollTop: scrollTop,
                        styleCache: this._styleCache,
                        verticalOffsetAdjustment: height,
                        visibleColumnIndices: state,
                        visibleRowIndices: visibleRowIndices
                    }), this._columnStartIndex = columnStartIndex, this._columnStopIndex = columnStopIndex, 
                    this._rowStartIndex = rowStartIndex, this._rowStopIndex = rowStopIndex;
                }
            }
        }, {
            key: "_debounceScrollEnded",
            value: function() {
                var scrollingResetTimeInterval = this.props.scrollingResetTimeInterval;
                this._disablePointerEventsTimeoutId && cancelAnimationTimeout(this._disablePointerEventsTimeoutId), 
                this._disablePointerEventsTimeoutId = requestAnimationTimeout(this._debounceScrollEndedCallback, scrollingResetTimeInterval);
            }
        }, {
            key: "_handleInvalidatedGridSize",
            value: function() {
                var columnIndex, rowIndex;
                "number" == typeof this._deferredInvalidateColumnIndex && "number" == typeof this._deferredInvalidateRowIndex && (columnIndex = this._deferredInvalidateColumnIndex, 
                rowIndex = this._deferredInvalidateRowIndex, this._deferredInvalidateColumnIndex = null, 
                this._deferredInvalidateRowIndex = null, this.recomputeGridSize({
                    columnIndex: columnIndex,
                    rowIndex: rowIndex
                }));
            }
        }, {
            key: "_invokeOnScrollMemoizer",
            value: function(_ref6) {
                var _this3 = this, scrollLeft = _ref6.scrollLeft, totalColumnsWidth = _ref6.totalColumnsWidth, totalRowsHeight = _ref6.totalRowsHeight;
                this._onScrollMemoizer({
                    callback: function(_ref7) {
                        var scrollLeft = _ref7.scrollLeft, _this3$props = _this3.props, height = _this3$props.height;
                        (0, _this3$props.onScroll)({
                            clientHeight: height,
                            clientWidth: _this3$props.width,
                            scrollHeight: totalRowsHeight,
                            scrollLeft: scrollLeft,
                            scrollTop: _ref7.scrollTop,
                            scrollWidth: totalColumnsWidth
                        });
                    },
                    indices: {
                        scrollLeft: scrollLeft,
                        scrollTop: _ref6.scrollTop
                    }
                });
            }
        }, {
            key: "_isScrolling",
            value: function() {
                var props = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : this.props, state = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : this.state;
                return Object.hasOwnProperty.call(props, "isScrolling") ? Boolean(props.isScrolling) : Boolean(state.isScrolling);
            }
        }, {
            key: "_maybeCallOnScrollbarPresenceChange",
            value: function() {
                var onScrollbarPresenceChange;
                this._scrollbarPresenceChanged && (onScrollbarPresenceChange = this.props.onScrollbarPresenceChange, 
                this._scrollbarPresenceChanged = !1, onScrollbarPresenceChange({
                    horizontal: 0 < this._horizontalScrollBarSize,
                    size: this.state.instanceProps.scrollbarSize,
                    vertical: 0 < this._verticalScrollBarSize
                }));
            }
        }, {
            key: "scrollToPosition",
            value: function(_ref8) {
                var scrollLeft = _ref8.scrollLeft, scrollLeft = Grid._getScrollToPositionStateUpdate({
                    prevState: this.state,
                    scrollLeft: scrollLeft,
                    scrollTop: _ref8.scrollTop
                });
                scrollLeft && (scrollLeft.needToResetStyleCache = !1, this.setState(scrollLeft));
            }
        }, {
            key: "_getCalculatedScrollLeft",
            value: function() {
                var props = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : this.props, state = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : this.state;
                return Grid._getCalculatedScrollLeft(props, state);
            }
        }, {
            key: "_updateScrollLeftForScrollToColumn",
            value: function() {
                var props = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : this.props, state = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : this.state, props = Grid._getScrollLeftForScrollToColumnStateUpdate(props, state);
                props && (props.needToResetStyleCache = !1, this.setState(props));
            }
        }, {
            key: "_getCalculatedScrollTop",
            value: function() {
                var props = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : this.props, state = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : this.state;
                return Grid._getCalculatedScrollTop(props, state);
            }
        }, {
            key: "_resetStyleCache",
            value: function() {
                var styleCache = this._styleCache, cellCache = this._cellCache, isScrollingOptOut = this.props.isScrollingOptOut;
                this._cellCache = {}, this._styleCache = {};
                for (var rowIndex = this._rowStartIndex; rowIndex <= this._rowStopIndex; rowIndex++) for (var columnIndex = this._columnStartIndex; columnIndex <= this._columnStopIndex; columnIndex++) {
                    var key = "".concat(rowIndex, "-").concat(columnIndex);
                    this._styleCache[key] = styleCache[key], isScrollingOptOut && (this._cellCache[key] = cellCache[key]);
                }
            }
        }, {
            key: "_updateScrollTopForScrollToRow",
            value: function() {
                var props = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : this.props, state = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : this.state, props = Grid._getScrollTopForScrollToRowStateUpdate(props, state);
                props && (props.needToResetStyleCache = !1, this.setState(props));
            }
        } ], [ {
            key: "getDerivedStateFromProps",
            value: function(nextProps, prevState) {
                var maybeStateA, maybeStateB, newState = {}, instanceProps = (0 === nextProps.columnCount && 0 !== prevState.scrollLeft || 0 === nextProps.rowCount && 0 !== prevState.scrollTop ? (newState.scrollLeft = 0, 
                newState.scrollTop = 0) : (nextProps.scrollLeft !== prevState.scrollLeft && nextProps.scrollToColumn < 0 || nextProps.scrollTop !== prevState.scrollTop && nextProps.scrollToRow < 0) && Object.assign(newState, Grid._getScrollToPositionStateUpdate({
                    prevState: prevState,
                    scrollLeft: nextProps.scrollLeft,
                    scrollTop: nextProps.scrollTop
                })), prevState.instanceProps);
                return newState.needToResetStyleCache = !1, nextProps.columnWidth === instanceProps.prevColumnWidth && nextProps.rowHeight === instanceProps.prevRowHeight || (newState.needToResetStyleCache = !0), 
                instanceProps.columnSizeAndPositionManager.configure({
                    cellCount: nextProps.columnCount,
                    estimatedCellSize: Grid._getEstimatedColumnSize(nextProps),
                    cellSizeGetter: Grid._wrapSizeGetter(nextProps.columnWidth)
                }), instanceProps.rowSizeAndPositionManager.configure({
                    cellCount: nextProps.rowCount,
                    estimatedCellSize: Grid._getEstimatedRowSize(nextProps),
                    cellSizeGetter: Grid._wrapSizeGetter(nextProps.rowHeight)
                }), 0 !== instanceProps.prevColumnCount && 0 !== instanceProps.prevRowCount || (instanceProps.prevColumnCount = 0, 
                instanceProps.prevRowCount = 0), nextProps.autoHeight && !1 === nextProps.isScrolling && !0 === instanceProps.prevIsScrolling && Object.assign(newState, {
                    isScrolling: !1
                }), calculateSizeAndPositionDataAndUpdateScrollOffset({
                    cellCount: instanceProps.prevColumnCount,
                    cellSize: "number" == typeof instanceProps.prevColumnWidth ? instanceProps.prevColumnWidth : null,
                    computeMetadataCallback: function() {
                        return instanceProps.columnSizeAndPositionManager.resetCell(0);
                    },
                    computeMetadataCallbackProps: nextProps,
                    nextCellsCount: nextProps.columnCount,
                    nextCellSize: "number" == typeof nextProps.columnWidth ? nextProps.columnWidth : null,
                    nextScrollToIndex: nextProps.scrollToColumn,
                    scrollToIndex: instanceProps.prevScrollToColumn,
                    updateScrollOffsetForScrollToIndex: function() {
                        maybeStateA = Grid._getScrollLeftForScrollToColumnStateUpdate(nextProps, prevState);
                    }
                }), calculateSizeAndPositionDataAndUpdateScrollOffset({
                    cellCount: instanceProps.prevRowCount,
                    cellSize: "number" == typeof instanceProps.prevRowHeight ? instanceProps.prevRowHeight : null,
                    computeMetadataCallback: function() {
                        return instanceProps.rowSizeAndPositionManager.resetCell(0);
                    },
                    computeMetadataCallbackProps: nextProps,
                    nextCellsCount: nextProps.rowCount,
                    nextCellSize: "number" == typeof nextProps.rowHeight ? nextProps.rowHeight : null,
                    nextScrollToIndex: nextProps.scrollToRow,
                    scrollToIndex: instanceProps.prevScrollToRow,
                    updateScrollOffsetForScrollToIndex: function() {
                        maybeStateB = Grid._getScrollTopForScrollToRowStateUpdate(nextProps, prevState);
                    }
                }), instanceProps.prevColumnCount = nextProps.columnCount, instanceProps.prevColumnWidth = nextProps.columnWidth, 
                instanceProps.prevIsScrolling = !0 === nextProps.isScrolling, instanceProps.prevRowCount = nextProps.rowCount, 
                instanceProps.prevRowHeight = nextProps.rowHeight, instanceProps.prevScrollToColumn = nextProps.scrollToColumn, 
                instanceProps.prevScrollToRow = nextProps.scrollToRow, instanceProps.scrollbarSize = nextProps.getScrollbarSize(), 
                void 0 === instanceProps.scrollbarSize ? (instanceProps.scrollbarSizeMeasured = !1, 
                instanceProps.scrollbarSize = 0) : instanceProps.scrollbarSizeMeasured = !0, 
                newState.instanceProps = instanceProps, _objectSpread2(_objectSpread2(_objectSpread2({}, newState), maybeStateA), maybeStateB);
            }
        }, {
            key: "_getEstimatedColumnSize",
            value: function(props) {
                return "number" == typeof props.columnWidth ? props.columnWidth : props.estimatedColumnSize;
            }
        }, {
            key: "_getEstimatedRowSize",
            value: function(props) {
                return "number" == typeof props.rowHeight ? props.rowHeight : props.estimatedRowSize;
            }
        }, {
            key: "_getScrollToPositionStateUpdate",
            value: function(_ref9) {
                var prevState = _ref9.prevState, scrollLeft = _ref9.scrollLeft, _ref9 = _ref9.scrollTop, newState = {
                    scrollPositionChangeReason: SCROLL_POSITION_CHANGE_REASONS$1_REQUESTED
                };
                return "number" == typeof scrollLeft && 0 <= scrollLeft && (newState.scrollDirectionHorizontal = scrollLeft > prevState.scrollLeft ? 1 : -1, 
                newState.scrollLeft = scrollLeft), "number" == typeof _ref9 && 0 <= _ref9 && (newState.scrollDirectionVertical = _ref9 > prevState.scrollTop ? 1 : -1, 
                newState.scrollTop = _ref9), "number" == typeof scrollLeft && 0 <= scrollLeft && scrollLeft !== prevState.scrollLeft || "number" == typeof _ref9 && 0 <= _ref9 && _ref9 !== prevState.scrollTop ? newState : {};
            }
        }, {
            key: "_wrapSizeGetter",
            value: function(value) {
                return "function" == typeof value ? value : function() {
                    return value;
                };
            }
        }, {
            key: "_getCalculatedScrollLeft",
            value: function(nextProps, prevState) {
                var columnCount = nextProps.columnCount, height = nextProps.height, scrollToAlignment = nextProps.scrollToAlignment, scrollToColumn = nextProps.scrollToColumn, nextProps = nextProps.width, scrollLeft = prevState.scrollLeft, prevState = prevState.instanceProps;
                return 0 < columnCount ? (columnCount = columnCount - 1, columnCount = scrollToColumn < 0 ? columnCount : Math.min(columnCount, scrollToColumn), 
                scrollToColumn = prevState.rowSizeAndPositionManager.getTotalSize(), 
                height = prevState.scrollbarSizeMeasured && height < scrollToColumn ? prevState.scrollbarSize : 0, 
                prevState.columnSizeAndPositionManager.getUpdatedOffsetForIndex({
                    align: scrollToAlignment,
                    containerSize: nextProps - height,
                    currentOffset: scrollLeft,
                    targetIndex: columnCount
                })) : 0;
            }
        }, {
            key: "_getScrollLeftForScrollToColumnStateUpdate",
            value: function(nextProps, prevState) {
                var scrollLeft = prevState.scrollLeft, nextProps = Grid._getCalculatedScrollLeft(nextProps, prevState);
                return "number" == typeof nextProps && 0 <= nextProps && scrollLeft !== nextProps ? Grid._getScrollToPositionStateUpdate({
                    prevState: prevState,
                    scrollLeft: nextProps,
                    scrollTop: -1
                }) : {};
            }
        }, {
            key: "_getCalculatedScrollTop",
            value: function(nextProps, prevState) {
                var height = nextProps.height, rowCount = nextProps.rowCount, scrollToAlignment = nextProps.scrollToAlignment, scrollToRow = nextProps.scrollToRow, nextProps = nextProps.width, scrollTop = prevState.scrollTop, prevState = prevState.instanceProps;
                return 0 < rowCount ? (rowCount = rowCount - 1, rowCount = scrollToRow < 0 ? rowCount : Math.min(rowCount, scrollToRow), 
                scrollToRow = prevState.columnSizeAndPositionManager.getTotalSize(), 
                nextProps = prevState.scrollbarSizeMeasured && nextProps < scrollToRow ? prevState.scrollbarSize : 0, 
                prevState.rowSizeAndPositionManager.getUpdatedOffsetForIndex({
                    align: scrollToAlignment,
                    containerSize: height - nextProps,
                    currentOffset: scrollTop,
                    targetIndex: rowCount
                })) : 0;
            }
        }, {
            key: "_getScrollTopForScrollToRowStateUpdate",
            value: function(nextProps, prevState) {
                var scrollTop = prevState.scrollTop, nextProps = Grid._getCalculatedScrollTop(nextProps, prevState);
                return "number" == typeof nextProps && 0 <= nextProps && scrollTop !== nextProps ? Grid._getScrollToPositionStateUpdate({
                    prevState: prevState,
                    scrollLeft: -1,
                    scrollTop: nextProps
                }) : {};
            }
        } ]);
    })();
    _defineProperty(Grid, "defaultProps", {
        "aria-label": "grid",
        "aria-readonly": !0,
        autoContainerWidth: !1,
        autoHeight: !1,
        autoWidth: !1,
        cellRangeRenderer: defaultCellRangeRenderer,
        containerRole: "row",
        containerStyle: {},
        estimatedColumnSize: 100,
        estimatedRowSize: 30,
        getScrollbarSize: scrollbarSize,
        noContentRenderer: function() {
            return null;
        },
        onScroll: function() {},
        onScrollbarPresenceChange: function() {},
        onSectionRendered: function() {},
        overscanColumnCount: 0,
        overscanIndicesGetter: defaultOverscanIndicesGetter,
        overscanRowCount: 10,
        role: "grid",
        scrollingResetTimeInterval: 150,
        scrollToAlignment: "auto",
        scrollToColumn: -1,
        scrollToRow: -1,
        style: {},
        tabIndex: 0,
        isScrollingOptOut: !1
    }), polyfill(Grid);
    function defaultOverscanIndicesGetter$1(_ref) {
        var cellCount = _ref.cellCount, overscanCellsCount = _ref.overscanCellsCount, scrollDirection = _ref.scrollDirection, startIndex = _ref.startIndex, _ref = _ref.stopIndex, overscanCellsCount = Math.max(1, overscanCellsCount);
        return 1 === scrollDirection ? {
            overscanStartIndex: Math.max(0, startIndex - 1),
            overscanStopIndex: Math.min(cellCount - 1, _ref + overscanCellsCount)
        } : {
            overscanStartIndex: Math.max(0, startIndex - overscanCellsCount),
            overscanStopIndex: Math.min(cellCount - 1, _ref + 1)
        };
    }
    request = (() => {
        function InfiniteLoader(props, context) {
            return _classCallCheck(this, InfiniteLoader), (props = _callSuper(this, InfiniteLoader, [ props, context ]))._loadMoreRowsMemoizer = createCallbackMemoizer(), 
            props._onRowsRendered = props._onRowsRendered.bind(props), props._registerChild = props._registerChild.bind(props), 
            props;
        }
        return _inherits(InfiniteLoader, React.PureComponent), _createClass(InfiniteLoader, [ {
            key: "resetLoadMoreRowsCache",
            value: function(autoReload) {
                this._loadMoreRowsMemoizer = createCallbackMemoizer(), autoReload && this._doStuff(this._lastRenderedStartIndex, this._lastRenderedStopIndex);
            }
        }, {
            key: "render",
            value: function() {
                return (0, this.props.children)({
                    onRowsRendered: this._onRowsRendered,
                    registerChild: this._registerChild
                });
            }
        }, {
            key: "_loadUnloadedRanges",
            value: function(unloadedRanges) {
                var _this2 = this, loadMoreRows = this.props.loadMoreRows;
                unloadedRanges.forEach(function(unloadedRange) {
                    var promise = loadMoreRows(unloadedRange);
                    promise && promise.then(function() {
                        var _ref4, lastRenderedStartIndex, lastRenderedStopIndex, stopIndex;
                        _ref4 = {
                            lastRenderedStartIndex: _this2._lastRenderedStartIndex,
                            lastRenderedStopIndex: _this2._lastRenderedStopIndex,
                            startIndex: unloadedRange.startIndex,
                            stopIndex: unloadedRange.stopIndex
                        }, lastRenderedStartIndex = _ref4.lastRenderedStartIndex, 
                        lastRenderedStopIndex = _ref4.lastRenderedStopIndex, stopIndex = _ref4.stopIndex, 
                        _ref4.startIndex > lastRenderedStopIndex || stopIndex < lastRenderedStartIndex || _this2._registeredChild && function(component) {
                            var currentIndex = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : 0, recomputeSize = "function" == typeof component.recomputeGridSize ? component.recomputeGridSize : component.recomputeRowHeights;
                            recomputeSize ? recomputeSize.call(component, currentIndex) : component.forceUpdate();
                        }(_this2._registeredChild, _this2._lastRenderedStartIndex);
                    });
                });
            }
        }, {
            key: "_onRowsRendered",
            value: function(_ref) {
                var startIndex = _ref.startIndex, _ref = _ref.stopIndex;
                this._lastRenderedStartIndex = startIndex, this._lastRenderedStopIndex = _ref, 
                this._doStuff(startIndex, _ref);
            }
        }, {
            key: "_doStuff",
            value: function(startIndex, stopIndex) {
                var _this3 = this, _this$props = this.props, isRowLoaded = _this$props.isRowLoaded, rowCount = _this$props.rowCount, threshold = _this$props.threshold, unloadedRanges = (_ref5 => {
                    for (var isRowLoaded = _ref5.isRowLoaded, minimumBatchSize = _ref5.minimumBatchSize, rowCount = _ref5.rowCount, stopIndex = _ref5.stopIndex, unloadedRanges = [], rangeStartIndex = null, rangeStopIndex = null, index = _ref5.startIndex; index <= stopIndex; index++) isRowLoaded({
                        index: index
                    }) ? null !== rangeStopIndex && (unloadedRanges.push({
                        startIndex: rangeStartIndex,
                        stopIndex: rangeStopIndex
                    }), rangeStartIndex = rangeStopIndex = null) : (rangeStopIndex = index, 
                    null === rangeStartIndex && (rangeStartIndex = index));
                    if (null !== rangeStopIndex) {
                        for (var potentialStopIndex = Math.min(Math.max(rangeStopIndex, rangeStartIndex + minimumBatchSize - 1), rowCount - 1), _index = rangeStopIndex + 1; _index <= potentialStopIndex && !isRowLoaded({
                            index: _index
                        }); _index++) rangeStopIndex = _index;
                        unloadedRanges.push({
                            startIndex: rangeStartIndex,
                            stopIndex: rangeStopIndex
                        });
                    }
                    if (unloadedRanges.length) for (var firstUnloadedRange = unloadedRanges[0]; firstUnloadedRange.stopIndex - firstUnloadedRange.startIndex + 1 < minimumBatchSize && 0 < firstUnloadedRange.startIndex; ) {
                        var _index2 = firstUnloadedRange.startIndex - 1;
                        if (isRowLoaded({
                            index: _index2
                        })) break;
                        firstUnloadedRange.startIndex = _index2;
                    }
                    return unloadedRanges;
                })({
                    isRowLoaded: isRowLoaded,
                    minimumBatchSize: _this$props.minimumBatchSize,
                    rowCount: rowCount,
                    startIndex: Math.max(0, startIndex - threshold),
                    stopIndex: Math.min(rowCount - 1, stopIndex + threshold)
                }), _this$props = (isRowLoaded = []).concat.apply(isRowLoaded, _toConsumableArray(unloadedRanges.map(function(_ref3) {
                    return [ _ref3.startIndex, _ref3.stopIndex ];
                })));
                this._loadMoreRowsMemoizer({
                    callback: function() {
                        _this3._loadUnloadedRanges(unloadedRanges);
                    },
                    indices: {
                        squashedUnloadedRanges: _this$props
                    }
                });
            }
        }, {
            key: "_registerChild",
            value: function(registeredChild) {
                this._registeredChild = registeredChild;
            }
        } ]);
    })();
    _defineProperty(request, "propTypes", {
        children: propTypes.func.isRequired,
        isRowLoaded: propTypes.func.isRequired,
        loadMoreRows: propTypes.func.isRequired,
        minimumBatchSize: propTypes.number.isRequired,
        rowCount: propTypes.number.isRequired,
        threshold: propTypes.number.isRequired
    }), _defineProperty(request, "defaultProps", {
        minimumBatchSize: 10,
        rowCount: 0,
        threshold: 15
    });
    cancel = (() => {
        function List() {
            var _this;
            _classCallCheck(this, List);
            for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) args[_key] = arguments[_key];
            return _defineProperty(_this = _callSuper(this, List, [].concat(args)), "Grid", void 0), 
            _defineProperty(_this, "_cellRenderer", function(_ref) {
                var parent = _ref.parent, rowIndex = _ref.rowIndex, style = _ref.style, isScrolling = _ref.isScrolling, isVisible = _ref.isVisible, _ref = _ref.key, rowRenderer = _this.props.rowRenderer, widthDescriptor = Object.getOwnPropertyDescriptor(style, "width");
                return widthDescriptor && widthDescriptor.writable && (style.width = "100%"), 
                rowRenderer({
                    index: rowIndex,
                    style: style,
                    isScrolling: isScrolling,
                    isVisible: isVisible,
                    key: _ref,
                    parent: parent
                });
            }), _defineProperty(_this, "_setRef", function(ref) {
                _this.Grid = ref;
            }), _defineProperty(_this, "_onScroll", function(_ref2) {
                var clientHeight = _ref2.clientHeight;
                (0, _this.props.onScroll)({
                    clientHeight: clientHeight,
                    scrollHeight: _ref2.scrollHeight,
                    scrollTop: _ref2.scrollTop
                });
            }), _defineProperty(_this, "_onSectionRendered", function(_ref3) {
                var rowOverscanStartIndex = _ref3.rowOverscanStartIndex;
                (0, _this.props.onRowsRendered)({
                    overscanStartIndex: rowOverscanStartIndex,
                    overscanStopIndex: _ref3.rowOverscanStopIndex,
                    startIndex: _ref3.rowStartIndex,
                    stopIndex: _ref3.rowStopIndex
                });
            }), _this;
        }
        return _inherits(List, React.PureComponent), _createClass(List, [ {
            key: "forceUpdateGrid",
            value: function() {
                this.Grid && this.Grid.forceUpdate();
            }
        }, {
            key: "getOffsetForRow",
            value: function(_ref4) {
                var alignment = _ref4.alignment;
                return this.Grid ? this.Grid.getOffsetForCell({
                    alignment: alignment,
                    rowIndex: _ref4.index,
                    columnIndex: 0
                }).scrollTop : 0;
            }
        }, {
            key: "invalidateCellSizeAfterRender",
            value: function(_ref5) {
                var columnIndex = _ref5.columnIndex;
                this.Grid && this.Grid.invalidateCellSizeAfterRender({
                    rowIndex: _ref5.rowIndex,
                    columnIndex: columnIndex
                });
            }
        }, {
            key: "measureAllRows",
            value: function() {
                this.Grid && this.Grid.measureAllCells();
            }
        }, {
            key: "recomputeGridSize",
            value: function() {
                var _ref6 = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {}, _ref6$columnIndex = _ref6.columnIndex, _ref6 = _ref6.rowIndex;
                this.Grid && this.Grid.recomputeGridSize({
                    rowIndex: void 0 === _ref6 ? 0 : _ref6,
                    columnIndex: void 0 === _ref6$columnIndex ? 0 : _ref6$columnIndex
                });
            }
        }, {
            key: "recomputeRowHeights",
            value: function() {
                this.Grid && this.Grid.recomputeGridSize({
                    rowIndex: 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : 0,
                    columnIndex: 0
                });
            }
        }, {
            key: "scrollToPosition",
            value: function() {
                this.Grid && this.Grid.scrollToPosition({
                    scrollTop: 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : 0
                });
            }
        }, {
            key: "scrollToRow",
            value: function() {
                this.Grid && this.Grid.scrollToCell({
                    columnIndex: 0,
                    rowIndex: 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : 0
                });
            }
        }, {
            key: "render",
            value: function() {
                var _this$props = this.props, className = _this$props.className, noRowsRenderer = _this$props.noRowsRenderer, scrollToIndex = _this$props.scrollToIndex, _this$props = _this$props.width, className = clsx("ReactVirtualized__List", className);
                return React.createElement(Grid, _extends({}, this.props, {
                    autoContainerWidth: !0,
                    cellRenderer: this._cellRenderer,
                    className: className,
                    columnWidth: _this$props,
                    columnCount: 1,
                    noContentRenderer: noRowsRenderer,
                    onScroll: this._onScroll,
                    onSectionRendered: this._onSectionRendered,
                    ref: this._setRef,
                    scrollToRow: scrollToIndex
                }));
            }
        } ]);
    })();
    _defineProperty(cancel, "defaultProps", {
        autoHeight: !1,
        estimatedRowSize: 30,
        onScroll: function() {},
        noRowsRenderer: function() {
            return null;
        },
        onRowsRendered: function() {},
        overscanIndicesGetter: defaultOverscanIndicesGetter$1,
        overscanRowCount: 10,
        scrollToAlignment: "auto",
        scrollToIndex: -1,
        style: {}
    });
    var bounds = {
        ge: function(a, y, c, l, h) {
            return "function" == typeof c ? ((a, l, h, y, c) => {
                for (var i = h + 1; l <= h; ) {
                    var m = l + h >>> 1;
                    0 <= c(a[m], y) ? h = (i = m) - 1 : l = 1 + m;
                }
                return i;
            })(a, void 0 === l ? 0 : 0 | l, void 0 === h ? a.length - 1 : 0 | h, y, c) : ((a, l, h, y) => {
                for (var i = h + 1; l <= h; ) {
                    var m = l + h >>> 1;
                    y <= a[m] ? h = (i = m) - 1 : l = 1 + m;
                }
                return i;
            })(a, void 0 === c ? 0 : 0 | c, void 0 === l ? a.length - 1 : 0 | l, y);
        },
        gt: function(a, y, c, l, h) {
            return "function" == typeof c ? ((a, l, h, y, c) => {
                for (var i = h + 1; l <= h; ) {
                    var m = l + h >>> 1;
                    0 < c(a[m], y) ? h = (i = m) - 1 : l = 1 + m;
                }
                return i;
            })(a, void 0 === l ? 0 : 0 | l, void 0 === h ? a.length - 1 : 0 | h, y, c) : ((a, l, h, y) => {
                for (var i = h + 1; l <= h; ) {
                    var m = l + h >>> 1;
                    y < a[m] ? h = (i = m) - 1 : l = 1 + m;
                }
                return i;
            })(a, void 0 === c ? 0 : 0 | c, void 0 === l ? a.length - 1 : 0 | l, y);
        },
        lt: function(a, y, c, l, h) {
            return "function" == typeof c ? ((a, l, h, y, c) => {
                for (var i = l - 1; l <= h; ) {
                    var m = l + h >>> 1;
                    c(a[m], y) < 0 ? l = 1 + (i = m) : h = m - 1;
                }
                return i;
            })(a, void 0 === l ? 0 : 0 | l, void 0 === h ? a.length - 1 : 0 | h, y, c) : ((a, l, h, y) => {
                for (var i = l - 1; l <= h; ) {
                    var m = l + h >>> 1;
                    a[m] < y ? l = 1 + (i = m) : h = m - 1;
                }
                return i;
            })(a, void 0 === c ? 0 : 0 | c, void 0 === l ? a.length - 1 : 0 | l, y);
        },
        le: function(a, y, c, l, h) {
            return "function" == typeof c ? ((a, l, h, y, c) => {
                for (var i = l - 1; l <= h; ) {
                    var m = l + h >>> 1;
                    c(a[m], y) <= 0 ? l = 1 + (i = m) : h = m - 1;
                }
                return i;
            })(a, void 0 === l ? 0 : 0 | l, void 0 === h ? a.length - 1 : 0 | h, y, c) : ((a, l, h, y) => {
                for (var i = l - 1; l <= h; ) {
                    var m = l + h >>> 1;
                    a[m] <= y ? l = 1 + (i = m) : h = m - 1;
                }
                return i;
            })(a, void 0 === c ? 0 : 0 | c, void 0 === l ? a.length - 1 : 0 | l, y);
        },
        eq: function(a, y, c, l, h) {
            return "function" == typeof c ? ((a, l, h, y, c) => {
                for (;l <= h; ) {
                    var m = l + h >>> 1, p = c(a[m], y);
                    if (0 === p) return m;
                    p <= 0 ? l = 1 + m : h = m - 1;
                }
                return -1;
            })(a, void 0 === l ? 0 : 0 | l, void 0 === h ? a.length - 1 : 0 | h, y, c) : ((a, l, h, y) => {
                for (;l <= h; ) {
                    var m = l + h >>> 1, x = a[m];
                    if (x === y) return m;
                    x <= y ? l = 1 + m : h = m - 1;
                }
                return -1;
            })(a, void 0 === c ? 0 : 0 | c, void 0 === l ? a.length - 1 : 0 | l, y);
        }
    };
    function IntervalTreeNode(mid, left, right, leftPoints, rightPoints) {
        this.mid = mid, this.left = left, this.right = right, this.leftPoints = leftPoints, 
        this.rightPoints = rightPoints, this.count = (left ? left.count : 0) + (right ? right.count : 0) + leftPoints.length;
    }
    var proto = IntervalTreeNode.prototype;
    function copy(a, b) {
        a.mid = b.mid, a.left = b.left, a.right = b.right, a.leftPoints = b.leftPoints, 
        a.rightPoints = b.rightPoints, a.count = b.count;
    }
    function rebuild(node, intervals) {
        intervals = createIntervalTree(intervals);
        node.mid = intervals.mid, node.left = intervals.left, node.right = intervals.right, 
        node.leftPoints = intervals.leftPoints, node.rightPoints = intervals.rightPoints, 
        node.count = intervals.count;
    }
    function rebuildWithInterval(node, interval) {
        var intervals = node.intervals([]);
        intervals.push(interval), rebuild(node, intervals);
    }
    function rebuildWithoutInterval(node, interval) {
        var intervals = node.intervals([]), interval = intervals.indexOf(interval);
        return interval < 0 ? 0 : (intervals.splice(interval, 1), rebuild(node, intervals), 
        1);
    }
    function reportLeftRange(arr, hi, cb) {
        for (var i = 0; i < arr.length && arr[i][0] <= hi; ++i) {
            var r = cb(arr[i]);
            if (r) return r;
        }
    }
    function reportRightRange(arr, lo, cb) {
        for (var i = arr.length - 1; 0 <= i && arr[i][1] >= lo; --i) {
            var r = cb(arr[i]);
            if (r) return r;
        }
    }
    function reportRange(arr, cb) {
        for (var i = 0; i < arr.length; ++i) {
            var r = cb(arr[i]);
            if (r) return r;
        }
    }
    function compareNumbers(a, b) {
        return a - b;
    }
    function compareBegin(a, b) {
        var d = a[0] - b[0];
        return d || a[1] - b[1];
    }
    function compareEnd(a, b) {
        var d = a[1] - b[1];
        return d || a[0] - b[0];
    }
    function createIntervalTree(intervals) {
        if (0 === intervals.length) return null;
        for (var pts = [], i = 0; i < intervals.length; ++i) pts.push(intervals[i][0], intervals[i][1]);
        pts.sort(compareNumbers);
        for (var mid = pts[pts.length >> 1], leftIntervals = [], rightIntervals = [], centerIntervals = [], i = 0; i < intervals.length; ++i) {
            var s = intervals[i];
            (s[1] < mid ? leftIntervals : mid < s[0] ? rightIntervals : centerIntervals).push(s);
        }
        var leftPoints = centerIntervals, rightPoints = centerIntervals.slice();
        return leftPoints.sort(compareBegin), rightPoints.sort(compareEnd), new IntervalTreeNode(mid, createIntervalTree(leftIntervals), createIntervalTree(rightIntervals), leftPoints, rightPoints);
    }
    function IntervalTree(root) {
        this.root = root;
    }
    proto.intervals = function(result) {
        return result.push.apply(result, this.leftPoints), this.left && this.left.intervals(result), 
        this.right && this.right.intervals(result), result;
    }, proto.insert = function(interval) {
        var r, weight = this.count - this.leftPoints.length;
        this.count += 1, interval[1] < this.mid ? this.left ? 4 * (this.left.count + 1) > 3 * (1 + weight) ? rebuildWithInterval(this, interval) : this.left.insert(interval) : this.left = createIntervalTree([ interval ]) : interval[0] > this.mid ? this.right ? 4 * (this.right.count + 1) > 3 * (1 + weight) ? rebuildWithInterval(this, interval) : this.right.insert(interval) : this.right = createIntervalTree([ interval ]) : (weight = bounds.ge(this.leftPoints, interval, compareBegin), 
        r = bounds.ge(this.rightPoints, interval, compareEnd), this.leftPoints.splice(weight, 0, interval), 
        this.rightPoints.splice(r, 0, interval));
    }, proto.remove = function(interval) {
        var weight = this.count - this.leftPoints;
        if (interval[1] < this.mid) return this.left ? 3 * (weight - 1) < 4 * (this.right ? this.right.count : 0) ? rebuildWithoutInterval(this, interval) : 2 === (r = this.left.remove(interval)) ? (this.left = null, 
        --this.count, 1) : (1 === r && --this.count, r) : 0;
        if (interval[0] > this.mid) return this.right ? 3 * (weight - 1) < 4 * (this.left ? this.left.count : 0) ? rebuildWithoutInterval(this, interval) : 2 === (r = this.right.remove(interval)) ? (this.right = null, 
        --this.count, 1) : (1 === r && --this.count, r) : 0;
        if (1 === this.count) return this.leftPoints[0] === interval ? 2 : 0;
        if (1 === this.leftPoints.length && this.leftPoints[0] === interval) {
            if (this.left && this.right) {
                for (var p = this, n = this.left; n.right; ) n = (p = n).right;
                p === this ? n.right = this.right : (l = this.left, r = this.right, 
                p.count -= n.count, p.right = n.left, n.left = l, n.right = r), 
                copy(this, n), this.count = (this.left ? this.left.count : 0) + (this.right ? this.right.count : 0) + this.leftPoints.length;
            } else this.left ? copy(this, this.left) : copy(this, this.right);
            return 1;
        }
        for (var l = bounds.ge(this.leftPoints, interval, compareBegin); l < this.leftPoints.length && this.leftPoints[l][0] === interval[0]; ++l) if (this.leftPoints[l] === interval) {
            --this.count, this.leftPoints.splice(l, 1);
            for (var r = bounds.ge(this.rightPoints, interval, compareEnd); r < this.rightPoints.length && this.rightPoints[r][1] === interval[1]; ++r) if (this.rightPoints[r] === interval) return this.rightPoints.splice(r, 1), 
            1;
        }
        return 0;
    }, proto.queryPoint = function(x, cb) {
        if (x < this.mid) {
            if (this.left) if (r = this.left.queryPoint(x, cb)) return r;
            return reportLeftRange(this.leftPoints, x, cb);
        }
        if (x > this.mid) {
            var r;
            if (this.right) if (r = this.right.queryPoint(x, cb)) return r;
            return reportRightRange(this.rightPoints, x, cb);
        }
        return reportRange(this.leftPoints, cb);
    }, proto.queryInterval = function(lo, hi, cb) {
        var r;
        if (lo < this.mid && this.left && (r = this.left.queryInterval(lo, hi, cb))) return r;
        if (hi > this.mid && this.right && (r = this.right.queryInterval(lo, hi, cb))) return r;
        return hi < this.mid ? reportLeftRange(this.leftPoints, hi, cb) : lo > this.mid ? reportRightRange(this.rightPoints, lo, cb) : reportRange(this.leftPoints, cb);
    };
    proto = IntervalTree.prototype;
    proto.insert = function(interval) {
        this.root ? this.root.insert(interval) : this.root = new IntervalTreeNode(interval[0], null, null, [ interval ], [ interval ]);
    }, proto.remove = function(interval) {
        return !!this.root && (2 === (interval = this.root.remove(interval)) && (this.root = null), 
        0 !== interval);
    }, proto.queryPoint = function(p, cb) {
        if (this.root) return this.root.queryPoint(p, cb);
    }, proto.queryInterval = function(lo, hi, cb) {
        if (lo <= hi && this.root) return this.root.queryInterval(lo, hi, cb);
    }, Object.defineProperty(proto, "count", {
        get: function() {
            return this.root ? this.root.count : 0;
        }
    }), Object.defineProperty(proto, "intervals", {
        get: function() {
            return this.root ? this.root.intervals([]) : [];
        }
    });
    var PositionCache = _createClass(function PositionCache() {
        var intervals;
        _classCallCheck(this, PositionCache), _defineProperty(this, "_columnSizeMap", {}), 
        _defineProperty(this, "_intervalTree", intervals && 0 !== intervals.length ? new IntervalTree(createIntervalTree(intervals)) : new IntervalTree(null)), 
        _defineProperty(this, "_leftMap", {});
    }, [ {
        key: "estimateTotalHeight",
        value: function(cellCount, columnCount, defaultCellHeight) {
            cellCount -= this.count;
            return this.tallestColumnSize + Math.ceil(cellCount / columnCount) * defaultCellHeight;
        }
    }, {
        key: "range",
        value: function(scrollTop, clientHeight, renderCallback) {
            var _this = this;
            this._intervalTree.queryInterval(scrollTop, scrollTop + clientHeight, function(_ref) {
                var _ref = _slicedToArray(_ref, 3), top = _ref[0], _ref = _ref[2];
                return renderCallback(_ref, _this._leftMap[_ref], top);
            });
        }
    }, {
        key: "setPosition",
        value: function(index, left, top, height) {
            this._intervalTree.insert([ top, top + height, index ]), this._leftMap[index] = left;
            var index = this._columnSizeMap, columnHeight = index[left];
            index[left] = void 0 === columnHeight ? top + height : Math.max(columnHeight, top + height);
        }
    }, {
        key: "count",
        get: function() {
            return this._intervalTree.count;
        }
    }, {
        key: "shortestColumnSize",
        get: function() {
            var i, columnSizeMap = this._columnSizeMap, size = 0;
            for (i in columnSizeMap) var height = columnSizeMap[i], size = 0 === size ? height : Math.min(size, height);
            return size;
        }
    }, {
        key: "tallestColumnSize",
        get: function() {
            var i, columnSizeMap = this._columnSizeMap, size = 0;
            for (i in columnSizeMap) var height = columnSizeMap[i], size = Math.max(size, height);
            return size;
        }
    } ]), proto = (() => {
        function Masonry() {
            var _this;
            _classCallCheck(this, Masonry);
            for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) args[_key] = arguments[_key];
            return _defineProperty(_this = _callSuper(this, Masonry, [].concat(args)), "state", {
                isScrolling: !1,
                scrollTop: 0
            }), _defineProperty(_this, "_debounceResetIsScrollingId", void 0), _defineProperty(_this, "_invalidateOnUpdateStartIndex", null), 
            _defineProperty(_this, "_invalidateOnUpdateStopIndex", null), _defineProperty(_this, "_positionCache", new PositionCache()), 
            _defineProperty(_this, "_startIndex", null), _defineProperty(_this, "_startIndexMemoized", null), 
            _defineProperty(_this, "_stopIndex", null), _defineProperty(_this, "_stopIndexMemoized", null), 
            _defineProperty(_this, "_debounceResetIsScrollingCallback", function() {
                _this.setState({
                    isScrolling: !1
                });
            }), _defineProperty(_this, "_setScrollingContainerRef", function(ref) {
                _this._scrollingContainer = ref;
            }), _defineProperty(_this, "_onScroll", function(event) {
                var height = _this.props.height, event = event.currentTarget.scrollTop, height = Math.min(Math.max(0, _this._getEstimatedTotalHeight() - height), event);
                event === height && (_this._debounceResetIsScrolling(), _this.state.scrollTop !== height) && _this.setState({
                    isScrolling: !0,
                    scrollTop: height
                });
            }), _this;
        }
        return _inherits(Masonry, React.PureComponent), _createClass(Masonry, [ {
            key: "clearCellPositions",
            value: function() {
                this._positionCache = new PositionCache(), this.forceUpdate();
            }
        }, {
            key: "invalidateCellSizeAfterRender",
            value: function(_ref) {
                _ref = _ref.rowIndex;
                null === this._invalidateOnUpdateStartIndex ? (this._invalidateOnUpdateStartIndex = _ref, 
                this._invalidateOnUpdateStopIndex = _ref) : (this._invalidateOnUpdateStartIndex = Math.min(this._invalidateOnUpdateStartIndex, _ref), 
                this._invalidateOnUpdateStopIndex = Math.max(this._invalidateOnUpdateStopIndex, _ref));
            }
        }, {
            key: "recomputeCellPositions",
            value: function() {
                var stopIndex = this._positionCache.count - 1;
                this._positionCache = new PositionCache(), this._populatePositionCache(0, stopIndex), 
                this.forceUpdate();
            }
        }, {
            key: "componentDidMount",
            value: function() {
                this._checkInvalidateOnUpdate(), this._invokeOnScrollCallback(), 
                this._invokeOnCellsRenderedCallback();
            }
        }, {
            key: "componentDidUpdate",
            value: function(prevProps, prevState) {
                this._checkInvalidateOnUpdate(), this._invokeOnScrollCallback(), 
                this._invokeOnCellsRenderedCallback(), this.props.scrollTop !== prevProps.scrollTop && this._debounceResetIsScrolling();
            }
        }, {
            key: "componentWillUnmount",
            value: function() {
                this._debounceResetIsScrollingId && cancelAnimationTimeout(this._debounceResetIsScrollingId);
            }
        }, {
            key: "render",
            value: function() {
                var stopIndex, _this2 = this, _this$props = this.props, autoHeight = _this$props.autoHeight, cellCount = _this$props.cellCount, cellMeasurerCache = _this$props.cellMeasurerCache, cellRenderer = _this$props.cellRenderer, className = _this$props.className, height = _this$props.height, id = _this$props.id, keyMapper = _this$props.keyMapper, overscanByPixels = _this$props.overscanByPixels, role = _this$props.role, style = _this$props.style, tabIndex = _this$props.tabIndex, width = _this$props.width, rowDirection = _this$props.rowDirection, _this$props = this.state, isScrolling = _this$props.isScrolling, _this$props = _this$props.scrollTop, children = [], estimateTotalHeight = this._getEstimatedTotalHeight(), shortestColumnSize = this._positionCache.shortestColumnSize, measuredCellCount = this._positionCache.count, startIndex = 0;
                if (this._positionCache.range(Math.max(0, _this$props - overscanByPixels), height + 2 * overscanByPixels, function(index, left, top) {
                    stopIndex = void 0 === stopIndex ? startIndex = index : (startIndex = Math.min(startIndex, index), 
                    Math.max(stopIndex, index)), children.push(cellRenderer({
                        index: index,
                        isScrolling: isScrolling,
                        key: keyMapper(index),
                        parent: _this2,
                        style: _defineProperty(_defineProperty(_defineProperty(_defineProperty({
                            height: cellMeasurerCache.getHeight(index)
                        }, "ltr" === rowDirection ? "left" : "right", left), "position", "absolute"), "top", top), "width", cellMeasurerCache.getWidth(index))
                    }));
                }), shortestColumnSize < _this$props + height + overscanByPixels && measuredCellCount < cellCount) for (var batchSize = Math.min(cellCount - measuredCellCount, Math.ceil((_this$props + height + overscanByPixels - shortestColumnSize) / cellMeasurerCache.defaultHeight * width / cellMeasurerCache.defaultWidth)), _index = measuredCellCount; _index < measuredCellCount + batchSize; _index++) stopIndex = _index, 
                children.push(cellRenderer({
                    index: _index,
                    isScrolling: isScrolling,
                    key: keyMapper(_index),
                    parent: this,
                    style: {
                        width: cellMeasurerCache.getWidth(_index)
                    }
                }));
                return this._startIndex = startIndex, this._stopIndex = stopIndex, 
                React.createElement("div", {
                    ref: this._setScrollingContainerRef,
                    "aria-label": this.props["aria-label"],
                    className: clsx("ReactVirtualized__Masonry", className),
                    id: id,
                    onScroll: this._onScroll,
                    role: role,
                    style: _objectSpread2({
                        boxSizing: "border-box",
                        direction: "ltr",
                        height: autoHeight ? "auto" : height,
                        overflowX: "hidden",
                        overflowY: estimateTotalHeight < height ? "hidden" : "auto",
                        position: "relative",
                        width: width,
                        WebkitOverflowScrolling: "touch",
                        willChange: "transform"
                    }, style),
                    tabIndex: tabIndex
                }, React.createElement("div", {
                    className: "ReactVirtualized__Masonry__innerScrollContainer",
                    style: {
                        width: "100%",
                        height: estimateTotalHeight,
                        maxWidth: "100%",
                        maxHeight: estimateTotalHeight,
                        overflow: "hidden",
                        pointerEvents: isScrolling ? "none" : "",
                        position: "relative"
                    }
                }, children));
            }
        }, {
            key: "_checkInvalidateOnUpdate",
            value: function() {
                var startIndex, stopIndex;
                "number" == typeof this._invalidateOnUpdateStartIndex && (startIndex = this._invalidateOnUpdateStartIndex, 
                stopIndex = this._invalidateOnUpdateStopIndex, this._invalidateOnUpdateStartIndex = null, 
                this._invalidateOnUpdateStopIndex = null, this._populatePositionCache(startIndex, stopIndex), 
                this.forceUpdate());
            }
        }, {
            key: "_debounceResetIsScrolling",
            value: function() {
                var scrollingResetTimeInterval = this.props.scrollingResetTimeInterval;
                this._debounceResetIsScrollingId && cancelAnimationTimeout(this._debounceResetIsScrollingId), 
                this._debounceResetIsScrollingId = requestAnimationTimeout(this._debounceResetIsScrollingCallback, scrollingResetTimeInterval);
            }
        }, {
            key: "_getEstimatedTotalHeight",
            value: function() {
                var _this$props2 = this.props, cellCount = _this$props2.cellCount, cellMeasurerCache = _this$props2.cellMeasurerCache, _this$props2 = Math.max(1, Math.floor(_this$props2.width / cellMeasurerCache.defaultWidth));
                return this._positionCache.estimateTotalHeight(cellCount, _this$props2, cellMeasurerCache.defaultHeight);
            }
        }, {
            key: "_invokeOnScrollCallback",
            value: function() {
                var _this$props3 = this.props, height = _this$props3.height, _this$props3 = _this$props3.onScroll, scrollTop = this.state.scrollTop;
                this._onScrollMemoized !== scrollTop && (_this$props3({
                    clientHeight: height,
                    scrollHeight: this._getEstimatedTotalHeight(),
                    scrollTop: scrollTop
                }), this._onScrollMemoized = scrollTop);
            }
        }, {
            key: "_invokeOnCellsRenderedCallback",
            value: function() {
                this._startIndexMemoized === this._startIndex && this._stopIndexMemoized === this._stopIndex || ((0, 
                this.props.onCellsRendered)({
                    startIndex: this._startIndex,
                    stopIndex: this._stopIndex
                }), this._startIndexMemoized = this._startIndex, this._stopIndexMemoized = this._stopIndex);
            }
        }, {
            key: "_populatePositionCache",
            value: function(startIndex, stopIndex) {
                for (var _this$props4 = this.props, cellMeasurerCache = _this$props4.cellMeasurerCache, cellPositioner = _this$props4.cellPositioner, _index2 = startIndex; _index2 <= stopIndex; _index2++) {
                    var _cellPositioner = cellPositioner(_index2), left = _cellPositioner.left;
                    this._positionCache.setPosition(_index2, left, _cellPositioner.top, cellMeasurerCache.getHeight(_index2));
                }
            }
        } ], [ {
            key: "getDerivedStateFromProps",
            value: function(nextProps, prevState) {
                return void 0 !== nextProps.scrollTop && prevState.scrollTop !== nextProps.scrollTop ? {
                    isScrolling: !0,
                    scrollTop: nextProps.scrollTop
                } : null;
            }
        } ]);
    })();
    function noop() {}
    _defineProperty(proto, "defaultProps", {
        autoHeight: !1,
        keyMapper: function(value) {
            return value;
        },
        onCellsRendered: noop,
        onScroll: noop,
        overscanByPixels: 20,
        role: "grid",
        scrollingResetTimeInterval: 150,
        style: {},
        tabIndex: 0,
        rowDirection: "ltr"
    }), polyfill(proto);
    var CellMeasurerCacheDecorator = _createClass(function CellMeasurerCacheDecorator() {
        var _this = this, params = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {}, cellMeasurerCache = (_classCallCheck(this, CellMeasurerCacheDecorator), 
        _defineProperty(this, "_cellMeasurerCache", void 0), _defineProperty(this, "_columnIndexOffset", void 0), 
        _defineProperty(this, "_rowIndexOffset", void 0), _defineProperty(this, "columnWidth", function(_ref) {
            _ref = _ref.index, _this._cellMeasurerCache.columnWidth({
                index: _ref + _this._columnIndexOffset
            });
        }), _defineProperty(this, "rowHeight", function(_ref2) {
            _ref2 = _ref2.index, _this._cellMeasurerCache.rowHeight({
                index: _ref2 + _this._rowIndexOffset
            });
        }), params.cellMeasurerCache), _params$columnIndexOf = params.columnIndexOffset, _params$columnIndexOf = void 0 === _params$columnIndexOf ? 0 : _params$columnIndexOf, params = params.rowIndexOffset, params = void 0 === params ? 0 : params;
        this._cellMeasurerCache = cellMeasurerCache, this._columnIndexOffset = _params$columnIndexOf, 
        this._rowIndexOffset = params;
    }, [ {
        key: "clear",
        value: function(rowIndex, columnIndex) {
            this._cellMeasurerCache.clear(rowIndex + this._rowIndexOffset, columnIndex + this._columnIndexOffset);
        }
    }, {
        key: "clearAll",
        value: function() {
            this._cellMeasurerCache.clearAll();
        }
    }, {
        key: "defaultHeight",
        get: function() {
            return this._cellMeasurerCache.defaultHeight;
        }
    }, {
        key: "defaultWidth",
        get: function() {
            return this._cellMeasurerCache.defaultWidth;
        }
    }, {
        key: "hasFixedHeight",
        value: function() {
            return this._cellMeasurerCache.hasFixedHeight();
        }
    }, {
        key: "hasFixedWidth",
        value: function() {
            return this._cellMeasurerCache.hasFixedWidth();
        }
    }, {
        key: "getHeight",
        value: function(rowIndex) {
            return this._cellMeasurerCache.getHeight(rowIndex + this._rowIndexOffset, (1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : 0) + this._columnIndexOffset);
        }
    }, {
        key: "getWidth",
        value: function(rowIndex) {
            return this._cellMeasurerCache.getWidth(rowIndex + this._rowIndexOffset, (1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : 0) + this._columnIndexOffset);
        }
    }, {
        key: "has",
        value: function(rowIndex) {
            return this._cellMeasurerCache.has(rowIndex + this._rowIndexOffset, (1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : 0) + this._columnIndexOffset);
        }
    }, {
        key: "set",
        value: function(rowIndex, columnIndex, width, height) {
            this._cellMeasurerCache.set(rowIndex + this._rowIndexOffset, columnIndex + this._columnIndexOffset, width, height);
        }
    } ]), _excluded$1 = [ "rowIndex" ], _excluded2 = [ "columnIndex", "rowIndex" ], _excluded3 = [ "columnIndex" ], _excluded4 = [ "onScroll", "onSectionRendered", "onScrollbarPresenceChange", "scrollLeft", "scrollToColumn", "scrollTop", "scrollToRow" ], MultiGrid = (() => {
        function MultiGrid(props, context) {
            _classCallCheck(this, MultiGrid), _defineProperty(_this = _callSuper(this, MultiGrid, [ props, context ]), "state", {
                scrollLeft: 0,
                scrollTop: 0,
                scrollbarSize: 0,
                showHorizontalScrollbar: !1,
                showVerticalScrollbar: !1
            }), _defineProperty(_this, "_deferredInvalidateColumnIndex", null), 
            _defineProperty(_this, "_deferredInvalidateRowIndex", null), _defineProperty(_this, "_bottomLeftGridRef", function(ref) {
                _this._bottomLeftGrid = ref;
            }), _defineProperty(_this, "_bottomRightGridRef", function(ref) {
                _this._bottomRightGrid = ref;
            }), _defineProperty(_this, "_cellRendererBottomLeftGrid", function(_ref) {
                var rowIndex = _ref.rowIndex, _ref = _objectWithoutProperties(_ref, _excluded$1), _this$props = _this.props, cellRenderer = _this$props.cellRenderer, fixedRowCount = _this$props.fixedRowCount;
                return rowIndex === _this$props.rowCount - fixedRowCount ? React.createElement("div", {
                    key: _ref.key,
                    style: _objectSpread2(_objectSpread2({}, _ref.style), {}, {
                        height: 20
                    })
                }) : cellRenderer(_objectSpread2(_objectSpread2({}, _ref), {}, {
                    parent: _this,
                    rowIndex: rowIndex + fixedRowCount
                }));
            }), _defineProperty(_this, "_cellRendererBottomRightGrid", function(_ref2) {
                var columnIndex = _ref2.columnIndex, rowIndex = _ref2.rowIndex, _ref2 = _objectWithoutProperties(_ref2, _excluded2), _this$props2 = _this.props, cellRenderer = _this$props2.cellRenderer, fixedColumnCount = _this$props2.fixedColumnCount, _this$props2 = _this$props2.fixedRowCount;
                return cellRenderer(_objectSpread2(_objectSpread2({}, _ref2), {}, {
                    columnIndex: columnIndex + fixedColumnCount,
                    parent: _this,
                    rowIndex: rowIndex + _this$props2
                }));
            }), _defineProperty(_this, "_cellRendererTopRightGrid", function(_ref3) {
                var columnIndex = _ref3.columnIndex, _ref3 = _objectWithoutProperties(_ref3, _excluded3), _this$props3 = _this.props, cellRenderer = _this$props3.cellRenderer, fixedColumnCount = _this$props3.fixedColumnCount;
                return columnIndex === _this$props3.columnCount - fixedColumnCount ? React.createElement("div", {
                    key: _ref3.key,
                    style: _objectSpread2(_objectSpread2({}, _ref3.style), {}, {
                        width: 20
                    })
                }) : cellRenderer(_objectSpread2(_objectSpread2({}, _ref3), {}, {
                    columnIndex: columnIndex + fixedColumnCount,
                    parent: _this
                }));
            }), _defineProperty(_this, "_columnWidthRightGrid", function(_ref4) {
                var _ref4 = _ref4.index, _this$props4 = _this.props, columnCount = _this$props4.columnCount, fixedColumnCount = _this$props4.fixedColumnCount, _this$props4 = _this$props4.columnWidth, _this$state = _this.state, scrollbarSize = _this$state.scrollbarSize;
                return _this$state.showHorizontalScrollbar && _ref4 === columnCount - fixedColumnCount ? scrollbarSize : "function" == typeof _this$props4 ? _this$props4({
                    index: _ref4 + fixedColumnCount
                }) : _this$props4;
            }), _defineProperty(_this, "_onScroll", function(scrollInfo) {
                var scrollLeft = scrollInfo.scrollLeft, scrollLeft = (_this.setState({
                    scrollLeft: scrollLeft,
                    scrollTop: scrollInfo.scrollTop
                }), _this.props.onScroll);
                scrollLeft && scrollLeft(scrollInfo);
            }), _defineProperty(_this, "_onScrollbarPresenceChange", function(_ref5) {
                var horizontal = _ref5.horizontal, size = _ref5.size, _ref5 = _ref5.vertical, _this$state2 = _this.state;
                horizontal === _this$state2.showHorizontalScrollbar && _ref5 === _this$state2.showVerticalScrollbar || (_this.setState({
                    scrollbarSize: size,
                    showHorizontalScrollbar: horizontal,
                    showVerticalScrollbar: _ref5
                }), "function" == typeof (_this$state2 = _this.props.onScrollbarPresenceChange) && _this$state2({
                    horizontal: horizontal,
                    size: size,
                    vertical: _ref5
                }));
            }), _defineProperty(_this, "_onScrollLeft", function(scrollInfo) {
                scrollInfo = scrollInfo.scrollLeft;
                _this._onScroll({
                    scrollLeft: scrollInfo,
                    scrollTop: _this.state.scrollTop
                });
            }), _defineProperty(_this, "_onScrollTop", function(scrollInfo) {
                scrollInfo = scrollInfo.scrollTop;
                _this._onScroll({
                    scrollTop: scrollInfo,
                    scrollLeft: _this.state.scrollLeft
                });
            }), _defineProperty(_this, "_rowHeightBottomGrid", function(_ref6) {
                var _ref6 = _ref6.index, _this$props5 = _this.props, fixedRowCount = _this$props5.fixedRowCount, rowHeight = _this$props5.rowHeight, _this$state3 = _this.state, scrollbarSize = _this$state3.scrollbarSize;
                return _this$state3.showVerticalScrollbar && _ref6 === _this$props5.rowCount - fixedRowCount ? scrollbarSize : "function" == typeof rowHeight ? rowHeight({
                    index: _ref6 + fixedRowCount
                }) : rowHeight;
            }), _defineProperty(_this, "_topLeftGridRef", function(ref) {
                _this._topLeftGrid = ref;
            }), _defineProperty(_this, "_topRightGridRef", function(ref) {
                _this._topRightGrid = ref;
            });
            var _this, context = props.deferredMeasurementCache, _fixedColumnCount = props.fixedColumnCount, props = props.fixedRowCount;
            return _this._maybeCalculateCachedStyles(!0), context && (_this._deferredMeasurementCacheBottomLeftGrid = 0 < props ? new CellMeasurerCacheDecorator({
                cellMeasurerCache: context,
                columnIndexOffset: 0,
                rowIndexOffset: props
            }) : context, _this._deferredMeasurementCacheBottomRightGrid = 0 < _fixedColumnCount || 0 < props ? new CellMeasurerCacheDecorator({
                cellMeasurerCache: context,
                columnIndexOffset: _fixedColumnCount,
                rowIndexOffset: props
            }) : context, _this._deferredMeasurementCacheTopRightGrid = 0 < _fixedColumnCount ? new CellMeasurerCacheDecorator({
                cellMeasurerCache: context,
                columnIndexOffset: _fixedColumnCount,
                rowIndexOffset: 0
            }) : context), _this;
        }
        return _inherits(MultiGrid, React.PureComponent), _createClass(MultiGrid, [ {
            key: "forceUpdateGrids",
            value: function() {
                this._bottomLeftGrid && this._bottomLeftGrid.forceUpdate(), this._bottomRightGrid && this._bottomRightGrid.forceUpdate(), 
                this._topLeftGrid && this._topLeftGrid.forceUpdate(), this._topRightGrid && this._topRightGrid.forceUpdate();
            }
        }, {
            key: "invalidateCellSizeAfterRender",
            value: function() {
                var _ref7 = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {}, _ref7$columnIndex = _ref7.columnIndex, _ref7$columnIndex = void 0 === _ref7$columnIndex ? 0 : _ref7$columnIndex, _ref7 = _ref7.rowIndex, _ref7 = void 0 === _ref7 ? 0 : _ref7;
                this._deferredInvalidateColumnIndex = "number" == typeof this._deferredInvalidateColumnIndex ? Math.min(this._deferredInvalidateColumnIndex, _ref7$columnIndex) : _ref7$columnIndex, 
                this._deferredInvalidateRowIndex = "number" == typeof this._deferredInvalidateRowIndex ? Math.min(this._deferredInvalidateRowIndex, _ref7) : _ref7;
            }
        }, {
            key: "measureAllCells",
            value: function() {
                this._bottomLeftGrid && this._bottomLeftGrid.measureAllCells(), 
                this._bottomRightGrid && this._bottomRightGrid.measureAllCells(), 
                this._topLeftGrid && this._topLeftGrid.measureAllCells(), this._topRightGrid && this._topRightGrid.measureAllCells();
            }
        }, {
            key: "recomputeGridSize",
            value: function() {
                var _ref8 = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {}, _ref8$columnIndex = _ref8.columnIndex, _ref8$columnIndex = void 0 === _ref8$columnIndex ? 0 : _ref8$columnIndex, _ref8 = _ref8.rowIndex, _ref8 = void 0 === _ref8 ? 0 : _ref8, _this$props6 = this.props, fixedColumnCount = _this$props6.fixedColumnCount, _this$props6 = _this$props6.fixedRowCount, fixedColumnCount = Math.max(0, _ref8$columnIndex - fixedColumnCount), _this$props6 = Math.max(0, _ref8 - _this$props6);
                this._bottomLeftGrid && this._bottomLeftGrid.recomputeGridSize({
                    columnIndex: _ref8$columnIndex,
                    rowIndex: _this$props6
                }), this._bottomRightGrid && this._bottomRightGrid.recomputeGridSize({
                    columnIndex: fixedColumnCount,
                    rowIndex: _this$props6
                }), this._topLeftGrid && this._topLeftGrid.recomputeGridSize({
                    columnIndex: _ref8$columnIndex,
                    rowIndex: _ref8
                }), this._topRightGrid && this._topRightGrid.recomputeGridSize({
                    columnIndex: fixedColumnCount,
                    rowIndex: _ref8
                }), this._leftGridWidth = null, this._topGridHeight = null, this._maybeCalculateCachedStyles(!0);
            }
        }, {
            key: "componentDidMount",
            value: function() {
                var newState, _this$props7 = this.props, scrollLeft = _this$props7.scrollLeft, _this$props7 = _this$props7.scrollTop;
                (0 < scrollLeft || 0 < _this$props7) && (newState = {}, 0 < scrollLeft && (newState.scrollLeft = scrollLeft), 
                0 < _this$props7 && (newState.scrollTop = _this$props7), this.setState(newState)), 
                this._handleInvalidatedGridSize();
            }
        }, {
            key: "componentDidUpdate",
            value: function() {
                this._handleInvalidatedGridSize();
            }
        }, {
            key: "render",
            value: function() {
                var scrollLeft, _this$state4, _this$props8 = this.props, onScroll = _this$props8.onScroll, onSectionRendered = _this$props8.onSectionRendered, scrollToColumn = _this$props8.scrollToColumn, scrollToRow = _this$props8.scrollToRow, _this$props8 = _objectWithoutProperties(_this$props8, _excluded4);
                return this._prepareForRender(), 0 === this.props.width || 0 === this.props.height ? null : (scrollLeft = (_this$state4 = this.state).scrollLeft, 
                _this$state4 = _this$state4.scrollTop, React.createElement("div", {
                    style: this._containerOuterStyle
                }, React.createElement("div", {
                    style: this._containerTopStyle
                }, this._renderTopLeftGrid(_this$props8), this._renderTopRightGrid(_objectSpread2(_objectSpread2({}, _this$props8), {}, {
                    onScroll: onScroll,
                    scrollLeft: scrollLeft
                }))), React.createElement("div", {
                    style: this._containerBottomStyle
                }, this._renderBottomLeftGrid(_objectSpread2(_objectSpread2({}, _this$props8), {}, {
                    onScroll: onScroll,
                    scrollTop: _this$state4
                })), this._renderBottomRightGrid(_objectSpread2(_objectSpread2({}, _this$props8), {}, {
                    onScroll: onScroll,
                    onSectionRendered: onSectionRendered,
                    scrollLeft: scrollLeft,
                    scrollToColumn: scrollToColumn,
                    scrollToRow: scrollToRow,
                    scrollTop: _this$state4
                })))));
            }
        }, {
            key: "_getBottomGridHeight",
            value: function(props) {
                return props.height - this._getTopGridHeight(props);
            }
        }, {
            key: "_getLeftGridWidth",
            value: function(props) {
                var fixedColumnCount = props.fixedColumnCount, columnWidth = props.columnWidth;
                if (null == this._leftGridWidth) if ("function" == typeof columnWidth) {
                    for (var leftGridWidth = 0, index = 0; index < fixedColumnCount; index++) leftGridWidth += columnWidth({
                        index: index
                    });
                    this._leftGridWidth = leftGridWidth;
                } else this._leftGridWidth = columnWidth * fixedColumnCount;
                return this._leftGridWidth;
            }
        }, {
            key: "_getRightGridWidth",
            value: function(props) {
                return props.width - this._getLeftGridWidth(props);
            }
        }, {
            key: "_getTopGridHeight",
            value: function(props) {
                var fixedRowCount = props.fixedRowCount, rowHeight = props.rowHeight;
                if (null == this._topGridHeight) if ("function" == typeof rowHeight) {
                    for (var topGridHeight = 0, index = 0; index < fixedRowCount; index++) topGridHeight += rowHeight({
                        index: index
                    });
                    this._topGridHeight = topGridHeight;
                } else this._topGridHeight = rowHeight * fixedRowCount;
                return this._topGridHeight;
            }
        }, {
            key: "_handleInvalidatedGridSize",
            value: function() {
                var columnIndex, rowIndex;
                "number" == typeof this._deferredInvalidateColumnIndex && (columnIndex = this._deferredInvalidateColumnIndex, 
                rowIndex = this._deferredInvalidateRowIndex, this._deferredInvalidateColumnIndex = null, 
                this._deferredInvalidateRowIndex = null, this.recomputeGridSize({
                    columnIndex: columnIndex,
                    rowIndex: rowIndex
                }), this.forceUpdate());
            }
        }, {
            key: "_maybeCalculateCachedStyles",
            value: function(resetAll) {
                var _this$props9 = this.props, columnWidth = _this$props9.columnWidth, enableFixedColumnScroll = _this$props9.enableFixedColumnScroll, enableFixedRowScroll = _this$props9.enableFixedRowScroll, height = _this$props9.height, fixedColumnCount = _this$props9.fixedColumnCount, fixedRowCount = _this$props9.fixedRowCount, rowHeight = _this$props9.rowHeight, style = _this$props9.style, styleBottomLeftGrid = _this$props9.styleBottomLeftGrid, styleBottomRightGrid = _this$props9.styleBottomRightGrid, styleTopLeftGrid = _this$props9.styleTopLeftGrid, styleTopRightGrid = _this$props9.styleTopRightGrid, _this$props9 = _this$props9.width, sizeChange = resetAll || height !== this._lastRenderedHeight || _this$props9 !== this._lastRenderedWidth, leftSizeChange = resetAll || columnWidth !== this._lastRenderedColumnWidth || fixedColumnCount !== this._lastRenderedFixedColumnCount, topSizeChange = resetAll || fixedRowCount !== this._lastRenderedFixedRowCount || rowHeight !== this._lastRenderedRowHeight;
                (resetAll || sizeChange || style !== this._lastRenderedStyle) && (this._containerOuterStyle = _objectSpread2({
                    height: height,
                    overflow: "visible",
                    width: _this$props9
                }, style)), (resetAll || sizeChange || topSizeChange) && (this._containerTopStyle = {
                    height: this._getTopGridHeight(this.props),
                    position: "relative",
                    width: _this$props9
                }, this._containerBottomStyle = {
                    height: height - this._getTopGridHeight(this.props),
                    overflow: "visible",
                    position: "relative",
                    width: _this$props9
                }), !resetAll && styleBottomLeftGrid === this._lastRenderedStyleBottomLeftGrid || (this._bottomLeftGridStyle = _objectSpread2({
                    left: 0,
                    overflowX: "hidden",
                    overflowY: enableFixedColumnScroll ? "auto" : "hidden",
                    position: "absolute"
                }, styleBottomLeftGrid)), (resetAll || leftSizeChange || styleBottomRightGrid !== this._lastRenderedStyleBottomRightGrid) && (this._bottomRightGridStyle = _objectSpread2({
                    left: this._getLeftGridWidth(this.props),
                    position: "absolute"
                }, styleBottomRightGrid)), !resetAll && styleTopLeftGrid === this._lastRenderedStyleTopLeftGrid || (this._topLeftGridStyle = _objectSpread2({
                    left: 0,
                    overflowX: "hidden",
                    overflowY: "hidden",
                    position: "absolute",
                    top: 0
                }, styleTopLeftGrid)), (resetAll || leftSizeChange || styleTopRightGrid !== this._lastRenderedStyleTopRightGrid) && (this._topRightGridStyle = _objectSpread2({
                    left: this._getLeftGridWidth(this.props),
                    overflowX: enableFixedRowScroll ? "auto" : "hidden",
                    overflowY: "hidden",
                    position: "absolute",
                    top: 0
                }, styleTopRightGrid)), this._lastRenderedColumnWidth = columnWidth, 
                this._lastRenderedFixedColumnCount = fixedColumnCount, this._lastRenderedFixedRowCount = fixedRowCount, 
                this._lastRenderedHeight = height, this._lastRenderedRowHeight = rowHeight, 
                this._lastRenderedStyle = style, this._lastRenderedStyleBottomLeftGrid = styleBottomLeftGrid, 
                this._lastRenderedStyleBottomRightGrid = styleBottomRightGrid, this._lastRenderedStyleTopLeftGrid = styleTopLeftGrid, 
                this._lastRenderedStyleTopRightGrid = styleTopRightGrid, this._lastRenderedWidth = _this$props9;
            }
        }, {
            key: "_prepareForRender",
            value: function() {
                this._lastRenderedColumnWidth === this.props.columnWidth && this._lastRenderedFixedColumnCount === this.props.fixedColumnCount || (this._leftGridWidth = null), 
                this._lastRenderedFixedRowCount === this.props.fixedRowCount && this._lastRenderedRowHeight === this.props.rowHeight || (this._topGridHeight = null), 
                this._maybeCalculateCachedStyles(), this._lastRenderedColumnWidth = this.props.columnWidth, 
                this._lastRenderedFixedColumnCount = this.props.fixedColumnCount, 
                this._lastRenderedFixedRowCount = this.props.fixedRowCount, this._lastRenderedRowHeight = this.props.rowHeight;
            }
        }, {
            key: "_renderBottomLeftGrid",
            value: function(props) {
                var height, width, scrollbarSize, enableFixedColumnScroll = props.enableFixedColumnScroll, fixedColumnCount = props.fixedColumnCount, fixedRowCount = props.fixedRowCount, rowCount = props.rowCount, hideBottomLeftGridScrollbar = props.hideBottomLeftGridScrollbar, showVerticalScrollbar = this.state.showVerticalScrollbar;
                return fixedColumnCount ? (showVerticalScrollbar = showVerticalScrollbar ? 1 : 0, 
                height = this._getBottomGridHeight(props), width = this._getLeftGridWidth(props), 
                scrollbarSize = this.state.showVerticalScrollbar ? this.state.scrollbarSize : 0, 
                scrollbarSize = hideBottomLeftGridScrollbar ? width + scrollbarSize : width, 
                props = React.createElement(Grid, _extends({}, props, {
                    cellRenderer: this._cellRendererBottomLeftGrid,
                    className: this.props.classNameBottomLeftGrid,
                    columnCount: fixedColumnCount,
                    deferredMeasurementCache: this._deferredMeasurementCacheBottomLeftGrid,
                    height: height,
                    onScroll: enableFixedColumnScroll ? this._onScrollTop : void 0,
                    ref: this._bottomLeftGridRef,
                    rowCount: Math.max(0, rowCount - fixedRowCount) + showVerticalScrollbar,
                    rowHeight: this._rowHeightBottomGrid,
                    style: this._bottomLeftGridStyle,
                    tabIndex: null,
                    width: scrollbarSize
                })), hideBottomLeftGridScrollbar ? React.createElement("div", {
                    className: "BottomLeftGrid_ScrollWrapper",
                    style: _objectSpread2(_objectSpread2({}, this._bottomLeftGridStyle), {}, {
                        height: height,
                        width: width,
                        overflowY: "hidden"
                    })
                }, props) : props) : null;
            }
        }, {
            key: "_renderBottomRightGrid",
            value: function(props) {
                var columnCount = props.columnCount, fixedColumnCount = props.fixedColumnCount, fixedRowCount = props.fixedRowCount, rowCount = props.rowCount, scrollToColumn = props.scrollToColumn, scrollToRow = props.scrollToRow;
                return React.createElement(Grid, _extends({}, props, {
                    cellRenderer: this._cellRendererBottomRightGrid,
                    className: this.props.classNameBottomRightGrid,
                    columnCount: Math.max(0, columnCount - fixedColumnCount),
                    columnWidth: this._columnWidthRightGrid,
                    deferredMeasurementCache: this._deferredMeasurementCacheBottomRightGrid,
                    height: this._getBottomGridHeight(props),
                    onScroll: this._onScroll,
                    onScrollbarPresenceChange: this._onScrollbarPresenceChange,
                    ref: this._bottomRightGridRef,
                    rowCount: Math.max(0, rowCount - fixedRowCount),
                    rowHeight: this._rowHeightBottomGrid,
                    scrollToColumn: scrollToColumn - fixedColumnCount,
                    scrollToRow: scrollToRow - fixedRowCount,
                    style: this._bottomRightGridStyle,
                    width: this._getRightGridWidth(props)
                }));
            }
        }, {
            key: "_renderTopLeftGrid",
            value: function(props) {
                var fixedColumnCount = props.fixedColumnCount, fixedRowCount = props.fixedRowCount;
                return fixedColumnCount && fixedRowCount ? React.createElement(Grid, _extends({}, props, {
                    className: this.props.classNameTopLeftGrid,
                    columnCount: fixedColumnCount,
                    height: this._getTopGridHeight(props),
                    ref: this._topLeftGridRef,
                    rowCount: fixedRowCount,
                    style: this._topLeftGridStyle,
                    tabIndex: null,
                    width: this._getLeftGridWidth(props)
                })) : null;
            }
        }, {
            key: "_renderTopRightGrid",
            value: function(props) {
                var additionalColumnCount, height, width, gridHeight, style, columnCount = props.columnCount, enableFixedRowScroll = props.enableFixedRowScroll, fixedColumnCount = props.fixedColumnCount, fixedRowCount = props.fixedRowCount, scrollLeft = props.scrollLeft, hideTopRightGridScrollbar = props.hideTopRightGridScrollbar, _this$state5 = this.state, showHorizontalScrollbar = _this$state5.showHorizontalScrollbar, _this$state5 = _this$state5.scrollbarSize;
                return fixedRowCount ? (additionalColumnCount = showHorizontalScrollbar ? 1 : 0, 
                height = this._getTopGridHeight(props), width = this._getRightGridWidth(props), 
                gridHeight = height, style = this._topRightGridStyle, hideTopRightGridScrollbar && (gridHeight = height + (showHorizontalScrollbar ? _this$state5 : 0), 
                style = _objectSpread2(_objectSpread2({}, this._topRightGridStyle), {}, {
                    left: 0
                })), showHorizontalScrollbar = React.createElement(Grid, _extends({}, props, {
                    cellRenderer: this._cellRendererTopRightGrid,
                    className: this.props.classNameTopRightGrid,
                    columnCount: Math.max(0, columnCount - fixedColumnCount) + additionalColumnCount,
                    columnWidth: this._columnWidthRightGrid,
                    deferredMeasurementCache: this._deferredMeasurementCacheTopRightGrid,
                    height: gridHeight,
                    onScroll: enableFixedRowScroll ? this._onScrollLeft : void 0,
                    ref: this._topRightGridRef,
                    rowCount: fixedRowCount,
                    scrollLeft: scrollLeft,
                    style: style,
                    tabIndex: null,
                    width: width
                })), hideTopRightGridScrollbar ? React.createElement("div", {
                    className: "TopRightGrid_ScrollWrapper",
                    style: _objectSpread2(_objectSpread2({}, this._topRightGridStyle), {}, {
                        height: height,
                        width: width,
                        overflowX: "hidden"
                    })
                }, showHorizontalScrollbar) : showHorizontalScrollbar) : null;
            }
        } ], [ {
            key: "getDerivedStateFromProps",
            value: function(nextProps, prevState) {
                return nextProps.scrollLeft !== prevState.scrollLeft || nextProps.scrollTop !== prevState.scrollTop ? {
                    scrollLeft: (null != nextProps.scrollLeft && 0 <= nextProps.scrollLeft ? nextProps : prevState).scrollLeft,
                    scrollTop: (null != nextProps.scrollTop && 0 <= nextProps.scrollTop ? nextProps : prevState).scrollTop
                } : null;
            }
        } ]);
    })(), ScrollSync = (_defineProperty(MultiGrid, "propTypes", {
        classNameBottomLeftGrid: propTypes.string.isRequired,
        classNameBottomRightGrid: propTypes.string.isRequired,
        classNameTopLeftGrid: propTypes.string.isRequired,
        classNameTopRightGrid: propTypes.string.isRequired,
        enableFixedColumnScroll: propTypes.bool.isRequired,
        enableFixedRowScroll: propTypes.bool.isRequired,
        fixedColumnCount: propTypes.number.isRequired,
        fixedRowCount: propTypes.number.isRequired,
        onScrollbarPresenceChange: propTypes.func,
        style: propTypes.object.isRequired,
        styleBottomLeftGrid: propTypes.object.isRequired,
        styleBottomRightGrid: propTypes.object.isRequired,
        styleTopLeftGrid: propTypes.object.isRequired,
        styleTopRightGrid: propTypes.object.isRequired,
        hideTopRightGridScrollbar: propTypes.bool,
        hideBottomLeftGridScrollbar: propTypes.bool
    }), _defineProperty(MultiGrid, "defaultProps", {
        classNameBottomLeftGrid: "",
        classNameBottomRightGrid: "",
        classNameTopLeftGrid: "",
        classNameTopRightGrid: "",
        enableFixedColumnScroll: !1,
        enableFixedRowScroll: !1,
        fixedColumnCount: 0,
        fixedRowCount: 0,
        scrollToColumn: -1,
        scrollToRow: -1,
        style: {},
        styleBottomLeftGrid: {},
        styleBottomRightGrid: {},
        styleTopLeftGrid: {},
        styleTopRightGrid: {},
        hideTopRightGridScrollbar: !1,
        hideBottomLeftGridScrollbar: !1
    }), polyfill(MultiGrid), (() => {
        function ScrollSync(props, context) {
            return _classCallCheck(this, ScrollSync), (props = _callSuper(this, ScrollSync, [ props, context ])).state = {
                clientHeight: 0,
                clientWidth: 0,
                scrollHeight: 0,
                scrollLeft: 0,
                scrollTop: 0,
                scrollWidth: 0
            }, props._onScroll = props._onScroll.bind(props), props;
        }
        return _inherits(ScrollSync, React.PureComponent), _createClass(ScrollSync, [ {
            key: "render",
            value: function() {
                var children = this.props.children, _this$state = this.state;
                return children({
                    clientHeight: _this$state.clientHeight,
                    clientWidth: _this$state.clientWidth,
                    onScroll: this._onScroll,
                    scrollHeight: _this$state.scrollHeight,
                    scrollLeft: _this$state.scrollLeft,
                    scrollTop: _this$state.scrollTop,
                    scrollWidth: _this$state.scrollWidth
                });
            }
        }, {
            key: "_onScroll",
            value: function(_ref) {
                var clientHeight = _ref.clientHeight;
                this.setState({
                    clientHeight: clientHeight,
                    clientWidth: _ref.clientWidth,
                    scrollHeight: _ref.scrollHeight,
                    scrollLeft: _ref.scrollLeft,
                    scrollTop: _ref.scrollTop,
                    scrollWidth: _ref.scrollWidth
                });
            }
        } ]);
    })());
    function defaultCellDataGetter(_ref) {
        var dataKey = _ref.dataKey, _ref = _ref.rowData;
        return "function" == typeof _ref.get ? _ref.get(dataKey) : _ref[dataKey];
    }
    function defaultCellRenderer(_ref) {
        _ref = _ref.cellData;
        return null == _ref ? "" : String(_ref);
    }
    function defaultHeaderRowRenderer(_ref) {
        var className = _ref.className;
        return React.createElement("div", {
            className: className,
            role: "row",
            style: _ref.style
        }, _ref.columns);
    }
    _defineProperty(ScrollSync, "propTypes", {
        children: propTypes.func.isRequired
    });
    var SortDirection = {
        ASC: "ASC",
        DESC: "DESC"
    };
    function SortIndicator(_ref) {
        var _ref = _ref.sortDirection, classNames = clsx("ReactVirtualized__Table__sortableHeaderIcon", {
            "ReactVirtualized__Table__sortableHeaderIcon--ASC": _ref === SortDirection.ASC,
            "ReactVirtualized__Table__sortableHeaderIcon--DESC": _ref === SortDirection.DESC
        });
        return React.createElement("svg", {
            className: classNames,
            width: 18,
            height: 18,
            viewBox: "0 0 24 24"
        }, _ref === SortDirection.ASC ? React.createElement("path", {
            d: "M7 14l5-5 5 5z"
        }) : React.createElement("path", {
            d: "M7 10l5 5 5-5z"
        }), React.createElement("path", {
            d: "M0 0h24v24H0z",
            fill: "none"
        }));
    }
    function defaultHeaderRenderer(_ref) {
        var dataKey = _ref.dataKey, label = _ref.label, sortDirection = _ref.sortDirection, _ref = _ref.sortBy === dataKey, dataKey = [ React.createElement("span", {
            className: "ReactVirtualized__Table__headerTruncatedText",
            key: "label",
            title: "string" == typeof label ? label : null
        }, label) ];
        return _ref && dataKey.push(React.createElement(SortIndicator, {
            key: "SortIndicator",
            sortDirection: sortDirection
        })), dataKey;
    }
    function defaultRowRenderer(_ref) {
        var className = _ref.className, columns = _ref.columns, index = _ref.index, key = _ref.key, onRowClick = _ref.onRowClick, onRowDoubleClick = _ref.onRowDoubleClick, onRowMouseOut = _ref.onRowMouseOut, onRowMouseOver = _ref.onRowMouseOver, onRowRightClick = _ref.onRowRightClick, rowData = _ref.rowData, _ref = _ref.style, a11yProps = {
            "aria-rowindex": index + 1
        };
        return (onRowClick || onRowDoubleClick || onRowMouseOut || onRowMouseOver || onRowRightClick) && (a11yProps["aria-label"] = "row", 
        a11yProps.tabIndex = 0, onRowClick && (a11yProps.onClick = function(event) {
            return onRowClick({
                event: event,
                index: index,
                rowData: rowData
            });
        }), onRowDoubleClick && (a11yProps.onDoubleClick = function(event) {
            return onRowDoubleClick({
                event: event,
                index: index,
                rowData: rowData
            });
        }), onRowMouseOut && (a11yProps.onMouseOut = function(event) {
            return onRowMouseOut({
                event: event,
                index: index,
                rowData: rowData
            });
        }), onRowMouseOver && (a11yProps.onMouseOver = function(event) {
            return onRowMouseOver({
                event: event,
                index: index,
                rowData: rowData
            });
        }), onRowRightClick) && (a11yProps.onContextMenu = function(event) {
            return onRowRightClick({
                event: event,
                index: index,
                rowData: rowData
            });
        }), React.createElement("div", _extends({}, a11yProps, {
            className: className,
            key: key,
            role: "row",
            style: _ref
        }), columns);
    }
    SortIndicator.propTypes = {
        sortDirection: propTypes.oneOf([ SortDirection.ASC, SortDirection.DESC ])
    };
    var Column = (() => {
        function Column() {
            return _classCallCheck(this, Column), _callSuper(this, Column, arguments);
        }
        return _inherits(Column, React.Component), _createClass(Column);
    })(), Table = (_defineProperty(Column, "propTypes", {
        "aria-label": propTypes.string,
        cellDataGetter: propTypes.func,
        cellRenderer: propTypes.func,
        className: propTypes.string,
        columnData: propTypes.object,
        dataKey: propTypes.any.isRequired,
        defaultSortDirection: propTypes.oneOf([ SortDirection.ASC, SortDirection.DESC ]),
        disableSort: propTypes.bool,
        flexGrow: propTypes.number,
        flexShrink: propTypes.number,
        headerClassName: propTypes.string,
        headerRenderer: propTypes.func.isRequired,
        headerStyle: propTypes.object,
        id: propTypes.string,
        label: propTypes.node,
        maxWidth: propTypes.number,
        minWidth: propTypes.number,
        style: propTypes.object,
        width: propTypes.number.isRequired
    }), _defineProperty(Column, "defaultProps", {
        cellDataGetter: defaultCellDataGetter,
        cellRenderer: defaultCellRenderer,
        defaultSortDirection: SortDirection.ASC,
        flexGrow: 0,
        flexShrink: 1,
        headerRenderer: defaultHeaderRenderer,
        style: {}
    }), (() => {
        function Table(props) {
            return _classCallCheck(this, Table), (props = _callSuper(this, Table, [ props ])).state = {
                scrollbarWidth: 0
            }, props._createColumn = props._createColumn.bind(props), props._createRow = props._createRow.bind(props), 
            props._onScroll = props._onScroll.bind(props), props._onSectionRendered = props._onSectionRendered.bind(props), 
            props._setRef = props._setRef.bind(props), props._setGridElementRef = props._setGridElementRef.bind(props), 
            props;
        }
        return _inherits(Table, React.PureComponent), _createClass(Table, [ {
            key: "forceUpdateGrid",
            value: function() {
                this.Grid && this.Grid.forceUpdate();
            }
        }, {
            key: "getOffsetForRow",
            value: function(_ref) {
                var alignment = _ref.alignment;
                return this.Grid ? this.Grid.getOffsetForCell({
                    alignment: alignment,
                    rowIndex: _ref.index
                }).scrollTop : 0;
            }
        }, {
            key: "invalidateCellSizeAfterRender",
            value: function(_ref2) {
                var columnIndex = _ref2.columnIndex;
                this.Grid && this.Grid.invalidateCellSizeAfterRender({
                    rowIndex: _ref2.rowIndex,
                    columnIndex: columnIndex
                });
            }
        }, {
            key: "measureAllRows",
            value: function() {
                this.Grid && this.Grid.measureAllCells();
            }
        }, {
            key: "recomputeGridSize",
            value: function() {
                var _ref3 = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {}, _ref3$columnIndex = _ref3.columnIndex, _ref3 = _ref3.rowIndex;
                this.Grid && this.Grid.recomputeGridSize({
                    rowIndex: void 0 === _ref3 ? 0 : _ref3,
                    columnIndex: void 0 === _ref3$columnIndex ? 0 : _ref3$columnIndex
                });
            }
        }, {
            key: "recomputeRowHeights",
            value: function() {
                this.Grid && this.Grid.recomputeGridSize({
                    rowIndex: 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : 0
                });
            }
        }, {
            key: "scrollToPosition",
            value: function() {
                this.Grid && this.Grid.scrollToPosition({
                    scrollTop: 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : 0
                });
            }
        }, {
            key: "scrollToRow",
            value: function() {
                this.Grid && this.Grid.scrollToCell({
                    columnIndex: 0,
                    rowIndex: 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : 0
                });
            }
        }, {
            key: "getScrollbarWidth",
            value: function() {
                var _Grid, clientWidth;
                return this.GridElement ? (clientWidth = (_Grid = this.GridElement).clientWidth || 0, 
                (_Grid.offsetWidth || 0) - clientWidth) : 0;
            }
        }, {
            key: "componentDidMount",
            value: function() {
                this._setScrollbarWidth();
            }
        }, {
            key: "componentDidUpdate",
            value: function() {
                this._setScrollbarWidth();
            }
        }, {
            key: "render",
            value: function() {
                var _this2 = this, _this$props = this.props, children = _this$props.children, className = _this$props.className, disableHeader = _this$props.disableHeader, gridClassName = _this$props.gridClassName, gridStyle = _this$props.gridStyle, headerHeight = _this$props.headerHeight, headerRowRenderer = _this$props.headerRowRenderer, height = _this$props.height, id = _this$props.id, noRowsRenderer = _this$props.noRowsRenderer, rowClassName = _this$props.rowClassName, rowStyle = _this$props.rowStyle, scrollToIndex = _this$props.scrollToIndex, style = _this$props.style, _this$props = _this$props.width, scrollbarWidth = this.state.scrollbarWidth, height = disableHeader ? height : height - headerHeight, rowClassName = "function" == typeof rowClassName ? rowClassName({
                    index: -1
                }) : rowClassName, rowStyle = "function" == typeof rowStyle ? rowStyle({
                    index: -1
                }) : rowStyle;
                return this._cachedColumnStyles = [], React.Children.toArray(children).forEach(function(column, index) {
                    column = _this2._getFlexStyleForColumn(column, column.props.style || Column.defaultProps.style);
                    _this2._cachedColumnStyles[index] = _objectSpread2({
                        overflow: "hidden"
                    }, column);
                }), React.createElement("div", {
                    "aria-label": this.props["aria-label"],
                    "aria-labelledby": this.props["aria-labelledby"],
                    "aria-colcount": React.Children.toArray(children).length,
                    "aria-rowcount": this.props.rowCount,
                    className: clsx("ReactVirtualized__Table", className),
                    id: id,
                    role: "grid",
                    style: style
                }, !disableHeader && headerRowRenderer({
                    className: clsx("ReactVirtualized__Table__headerRow", rowClassName),
                    columns: this._getHeaderColumns(),
                    style: _objectSpread2({
                        height: headerHeight,
                        overflow: "hidden",
                        paddingRight: scrollbarWidth,
                        width: _this$props
                    }, rowStyle)
                }), React.createElement(Grid, _extends({}, this.props, {
                    elementRef: this._setGridElementRef,
                    "aria-readonly": null,
                    autoContainerWidth: !0,
                    className: clsx("ReactVirtualized__Table__Grid", gridClassName),
                    cellRenderer: this._createRow,
                    columnWidth: _this$props,
                    columnCount: 1,
                    height: height,
                    id: void 0,
                    noContentRenderer: noRowsRenderer,
                    onScroll: this._onScroll,
                    onSectionRendered: this._onSectionRendered,
                    ref: this._setRef,
                    role: "rowgroup",
                    scrollbarWidth: scrollbarWidth,
                    scrollToRow: scrollToIndex,
                    style: _objectSpread2(_objectSpread2({}, gridStyle), {}, {
                        overflowX: "hidden"
                    })
                })));
            }
        }, {
            key: "_createColumn",
            value: function(_ref4) {
                var column = _ref4.column, columnIndex = _ref4.columnIndex, isScrolling = _ref4.isScrolling, parent = _ref4.parent, rowData = _ref4.rowData, _ref4 = _ref4.rowIndex, onColumnClick = this.props.onColumnClick, column = column.props, cellDataGetter = column.cellDataGetter, cellRenderer = column.cellRenderer, className = column.className, columnData = column.columnData, dataKey = column.dataKey, column = column.id, cellRenderer = cellRenderer({
                    cellData: cellDataGetter({
                        columnData: columnData,
                        dataKey: dataKey,
                        rowData: rowData
                    }),
                    columnData: columnData,
                    columnIndex: columnIndex,
                    dataKey: dataKey,
                    isScrolling: isScrolling,
                    parent: parent,
                    rowData: rowData,
                    rowIndex: _ref4
                }), cellDataGetter = this._cachedColumnStyles[columnIndex], isScrolling = "string" == typeof cellRenderer ? cellRenderer : null;
                return React.createElement("div", {
                    "aria-colindex": columnIndex + 1,
                    "aria-describedby": column,
                    className: clsx("ReactVirtualized__Table__rowColumn", className),
                    key: "Row" + _ref4 + "-Col" + columnIndex,
                    onClick: function(event) {
                        onColumnClick && onColumnClick({
                            columnData: columnData,
                            dataKey: dataKey,
                            event: event
                        });
                    },
                    role: "gridcell",
                    style: cellDataGetter,
                    title: isScrolling
                }, cellRenderer);
            }
        }, {
            key: "_createHeader",
            value: function(_ref5) {
                var newSortDirection, onClick, headerAriaLabel, headerAriaSort, headerTabIndex, headerOnClick, headerOnKeyDown, column = _ref5.column, _ref5 = _ref5.index, _this$props2 = this.props, headerClassName = _this$props2.headerClassName, headerStyle = _this$props2.headerStyle, onHeaderClick = _this$props2.onHeaderClick, sort = _this$props2.sort, sortBy = _this$props2.sortBy, _this$props2 = _this$props2.sortDirection, _column$props2 = column.props, columnData = _column$props2.columnData, dataKey = _column$props2.dataKey, defaultSortDirection = _column$props2.defaultSortDirection, disableSort = _column$props2.disableSort, headerRenderer = _column$props2.headerRenderer, id = _column$props2.id, _column$props2 = _column$props2.label, sortEnabled = !disableSort && sort, headerClassName = clsx("ReactVirtualized__Table__headerColumn", headerClassName, column.props.headerClassName, {
                    ReactVirtualized__Table__sortableHeaderColumn: sortEnabled
                }), headerStyle = this._getFlexStyleForColumn(column, _objectSpread2(_objectSpread2({}, headerStyle), column.props.headerStyle)), headerRenderer = headerRenderer({
                    columnData: columnData,
                    dataKey: dataKey,
                    disableSort: disableSort,
                    label: _column$props2,
                    sortBy: sortBy,
                    sortDirection: _this$props2
                });
                return (sortEnabled || onHeaderClick) && (newSortDirection = sortBy !== dataKey ? defaultSortDirection : _this$props2 === SortDirection.DESC ? SortDirection.ASC : SortDirection.DESC, 
                onClick = function(event) {
                    sortEnabled && sort({
                        defaultSortDirection: defaultSortDirection,
                        event: event,
                        sortBy: dataKey,
                        sortDirection: newSortDirection
                    }), onHeaderClick && onHeaderClick({
                        columnData: columnData,
                        dataKey: dataKey,
                        event: event
                    });
                }, headerAriaLabel = column.props["aria-label"] || _column$props2 || dataKey, 
                headerAriaSort = "none", headerTabIndex = 0, headerOnClick = onClick, 
                headerOnKeyDown = function(event) {
                    "Enter" !== event.key && " " !== event.key || onClick(event);
                }), React.createElement("div", {
                    "aria-label": headerAriaLabel,
                    "aria-sort": headerAriaSort = sortBy === dataKey ? _this$props2 === SortDirection.ASC ? "ascending" : "descending" : headerAriaSort,
                    className: headerClassName,
                    id: id,
                    key: "Header-Col" + _ref5,
                    onClick: headerOnClick,
                    onKeyDown: headerOnKeyDown,
                    role: "columnheader",
                    style: headerStyle,
                    tabIndex: headerTabIndex
                }, headerRenderer);
            }
        }, {
            key: "_createRow",
            value: function(_ref6) {
                var _this3 = this, index = _ref6.rowIndex, isScrolling = _ref6.isScrolling, key = _ref6.key, parent = _ref6.parent, _ref6 = _ref6.style, _this$props3 = this.props, children = _this$props3.children, onRowClick = _this$props3.onRowClick, onRowDoubleClick = _this$props3.onRowDoubleClick, onRowRightClick = _this$props3.onRowRightClick, onRowMouseOver = _this$props3.onRowMouseOver, onRowMouseOut = _this$props3.onRowMouseOut, rowClassName = _this$props3.rowClassName, rowGetter = _this$props3.rowGetter, rowRenderer = _this$props3.rowRenderer, _this$props3 = _this$props3.rowStyle, scrollbarWidth = this.state.scrollbarWidth, rowClassName = "function" == typeof rowClassName ? rowClassName({
                    index: index
                }) : rowClassName, _this$props3 = "function" == typeof _this$props3 ? _this$props3({
                    index: index
                }) : _this$props3, rowData = rowGetter({
                    index: index
                }), rowGetter = React.Children.toArray(children).map(function(column, columnIndex) {
                    return _this3._createColumn({
                        column: column,
                        columnIndex: columnIndex,
                        isScrolling: isScrolling,
                        parent: parent,
                        rowData: rowData,
                        rowIndex: index,
                        scrollbarWidth: scrollbarWidth
                    });
                }), children = clsx("ReactVirtualized__Table__row", rowClassName), rowClassName = _objectSpread2(_objectSpread2({}, _ref6), {}, {
                    height: this._getRowHeight(index),
                    overflow: "hidden",
                    paddingRight: scrollbarWidth
                }, _this$props3);
                return rowRenderer({
                    className: children,
                    columns: rowGetter,
                    index: index,
                    isScrolling: isScrolling,
                    key: key,
                    onRowClick: onRowClick,
                    onRowDoubleClick: onRowDoubleClick,
                    onRowRightClick: onRowRightClick,
                    onRowMouseOver: onRowMouseOver,
                    onRowMouseOut: onRowMouseOut,
                    rowData: rowData,
                    style: rowClassName
                });
            }
        }, {
            key: "_getFlexStyleForColumn",
            value: function(column) {
                var customStyle = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : {}, flexValue = "".concat(column.props.flexGrow, " ").concat(column.props.flexShrink, " ").concat(column.props.width, "px"), customStyle = _objectSpread2(_objectSpread2({}, customStyle), {}, {
                    flex: flexValue,
                    msFlex: flexValue,
                    WebkitFlex: flexValue
                });
                return column.props.maxWidth && (customStyle.maxWidth = column.props.maxWidth), 
                column.props.minWidth && (customStyle.minWidth = column.props.minWidth), 
                customStyle;
            }
        }, {
            key: "_getHeaderColumns",
            value: function() {
                var _this4 = this, _this$props4 = this.props, children = _this$props4.children;
                return (_this$props4.disableHeader ? [] : React.Children.toArray(children)).map(function(column, index) {
                    return _this4._createHeader({
                        column: column,
                        index: index
                    });
                });
            }
        }, {
            key: "_getRowHeight",
            value: function(rowIndex) {
                var rowHeight = this.props.rowHeight;
                return "function" == typeof rowHeight ? rowHeight({
                    index: rowIndex
                }) : rowHeight;
            }
        }, {
            key: "_onScroll",
            value: function(_ref7) {
                var clientHeight = _ref7.clientHeight;
                (0, this.props.onScroll)({
                    clientHeight: clientHeight,
                    scrollHeight: _ref7.scrollHeight,
                    scrollTop: _ref7.scrollTop
                });
            }
        }, {
            key: "_onSectionRendered",
            value: function(_ref8) {
                var rowOverscanStartIndex = _ref8.rowOverscanStartIndex;
                (0, this.props.onRowsRendered)({
                    overscanStartIndex: rowOverscanStartIndex,
                    overscanStopIndex: _ref8.rowOverscanStopIndex,
                    startIndex: _ref8.rowStartIndex,
                    stopIndex: _ref8.rowStopIndex
                });
            }
        }, {
            key: "_setRef",
            value: function(ref) {
                this.Grid = ref;
            }
        }, {
            key: "_setGridElementRef",
            value: function(ref) {
                this.GridElement = ref;
            }
        }, {
            key: "_setScrollbarWidth",
            value: function() {
                var scrollbarWidth = this.getScrollbarWidth();
                this.setState({
                    scrollbarWidth: scrollbarWidth
                });
            }
        } ]);
    })()), mountedInstances = (_defineProperty(Table, "propTypes", {
        "aria-label": propTypes.string,
        "aria-labelledby": propTypes.string,
        autoHeight: propTypes.bool,
        children: function(props) {
            for (var children = React.Children.toArray(props.children), i = 0; i < children.length; i++) {
                var childType = children[i].type;
                if (childType !== Column && !(childType.prototype instanceof Column)) return new Error("Table only accepts children of type Column");
            }
        },
        className: propTypes.string,
        disableHeader: propTypes.bool,
        estimatedRowSize: propTypes.number.isRequired,
        gridClassName: propTypes.string,
        gridStyle: propTypes.object,
        headerClassName: propTypes.string,
        headerHeight: propTypes.number.isRequired,
        headerRowRenderer: propTypes.func,
        headerStyle: propTypes.object,
        height: propTypes.number.isRequired,
        id: propTypes.string,
        noRowsRenderer: propTypes.func,
        onColumnClick: propTypes.func,
        onHeaderClick: propTypes.func,
        onRowClick: propTypes.func,
        onRowDoubleClick: propTypes.func,
        onRowMouseOut: propTypes.func,
        onRowMouseOver: propTypes.func,
        onRowRightClick: propTypes.func,
        onRowsRendered: propTypes.func,
        onScroll: propTypes.func.isRequired,
        overscanIndicesGetter: propTypes.func.isRequired,
        overscanRowCount: propTypes.number.isRequired,
        rowClassName: propTypes.oneOfType([ propTypes.string, propTypes.func ]),
        rowGetter: propTypes.func.isRequired,
        rowHeight: propTypes.oneOfType([ propTypes.number, propTypes.func ]).isRequired,
        rowCount: propTypes.number.isRequired,
        rowRenderer: propTypes.func,
        rowStyle: propTypes.oneOfType([ propTypes.object, propTypes.func ]).isRequired,
        scrollToAlignment: propTypes.oneOf([ "auto", "end", "start", "center" ]).isRequired,
        scrollToIndex: propTypes.number.isRequired,
        scrollTop: propTypes.number,
        sort: propTypes.func,
        sortBy: propTypes.string,
        sortDirection: propTypes.oneOf([ SortDirection.ASC, SortDirection.DESC ]),
        style: propTypes.object,
        tabIndex: propTypes.number,
        width: propTypes.number.isRequired
    }), _defineProperty(Table, "defaultProps", {
        disableHeader: !1,
        estimatedRowSize: 30,
        headerHeight: 0,
        headerStyle: {},
        noRowsRenderer: function() {
            return null;
        },
        onRowsRendered: function() {
            return null;
        },
        onScroll: function() {
            return null;
        },
        overscanIndicesGetter: defaultOverscanIndicesGetter$1,
        overscanRowCount: 10,
        rowRenderer: defaultRowRenderer,
        headerRowRenderer: defaultHeaderRowRenderer,
        rowStyle: {},
        scrollToAlignment: "auto",
        scrollToIndex: -1,
        style: {}
    }), []), originalBodyPointerEvents = null, disablePointerEventsTimeoutId = null;
    function enablePointerEventsIfDisabled() {
        disablePointerEventsTimeoutId && (disablePointerEventsTimeoutId = null, 
        document.body && null != originalBodyPointerEvents && (document.body.style.pointerEvents = originalBodyPointerEvents), 
        originalBodyPointerEvents = null);
    }
    function enablePointerEventsAfterDelayCallback() {
        enablePointerEventsIfDisabled(), mountedInstances.forEach(function(instance) {
            return instance.__resetIsScrolling();
        });
    }
    function onScrollWindow(event) {
        var maximumTimeout;
        event.currentTarget === window && null == originalBodyPointerEvents && document.body && (originalBodyPointerEvents = document.body.style.pointerEvents, 
        document.body.style.pointerEvents = "none"), disablePointerEventsTimeoutId && cancelAnimationTimeout(disablePointerEventsTimeoutId), 
        maximumTimeout = 0, mountedInstances.forEach(function(instance) {
            maximumTimeout = Math.max(maximumTimeout, instance.props.scrollingResetTimeInterval);
        }), disablePointerEventsTimeoutId = requestAnimationTimeout(enablePointerEventsAfterDelayCallback, maximumTimeout), 
        mountedInstances.forEach(function(instance) {
            instance.props.scrollElement === event.currentTarget && instance.__handleWindowScrollEvent();
        });
    }
    function registerScrollListener(component, element) {
        mountedInstances.some(function(instance) {
            return instance.props.scrollElement === element;
        }) || element.addEventListener("scroll", onScrollWindow), mountedInstances.push(component);
    }
    function unregisterScrollListener(component, element) {
        (mountedInstances = mountedInstances.filter(function(instance) {
            return instance !== component;
        })).length || (element.removeEventListener("scroll", onScrollWindow), disablePointerEventsTimeoutId && (cancelAnimationTimeout(disablePointerEventsTimeoutId), 
        enablePointerEventsIfDisabled()));
    }
    var isWindow = function(element) {
        return element === window;
    }, getBoundingBox = function(element) {
        return element.getBoundingClientRect();
    };
    function getDimensions(scrollElement, props) {
        var _window, innerHeight;
        return scrollElement ? isWindow(scrollElement) ? {
            height: "number" == typeof (innerHeight = (_window = window).innerHeight) ? innerHeight : 0,
            width: "number" == typeof (innerHeight = _window.innerWidth) ? innerHeight : 0
        } : getBoundingBox(scrollElement) : {
            height: props.serverHeight,
            width: props.serverWidth
        };
    }
    function getScrollOffset(element) {
        return isWindow(element) && document.documentElement ? {
            top: "scrollY" in window ? window.scrollY : document.documentElement.scrollTop,
            left: "scrollX" in window ? window.scrollX : document.documentElement.scrollLeft
        } : {
            top: element.scrollTop,
            left: element.scrollLeft
        };
    }
    function getWindow() {
        return "undefined" != typeof window ? window : void 0;
    }
    propTypes = (() => {
        function WindowScroller() {
            var _this;
            _classCallCheck(this, WindowScroller);
            for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) args[_key] = arguments[_key];
            return _defineProperty(_this = _callSuper(this, WindowScroller, [].concat(args)), "_window", getWindow()), 
            _defineProperty(_this, "_isMounted", !1), _defineProperty(_this, "_positionFromTop", 0), 
            _defineProperty(_this, "_positionFromLeft", 0), _defineProperty(_this, "_detectElementResize", void 0), 
            _defineProperty(_this, "_child", void 0), _defineProperty(_this, "_windowScrollerRef", React.createRef()), 
            _defineProperty(_this, "state", _objectSpread2(_objectSpread2({}, getDimensions(_this.props.scrollElement, _this.props)), {}, {
                isScrolling: !1,
                scrollLeft: 0,
                scrollTop: 0
            })), _defineProperty(_this, "_registerChild", function(element) {
                !element || element instanceof Element || console.warn("WindowScroller registerChild expects to be passed Element or null"), 
                _this._child = element, _this.updatePosition();
            }), _defineProperty(_this, "_onChildScroll", function(_ref) {
                var scrollElement, _ref = _ref.scrollTop;
                _this.state.scrollTop !== _ref && (scrollElement = _this.props.scrollElement) && ("function" == typeof scrollElement.scrollTo ? scrollElement.scrollTo(0, _ref + _this._positionFromTop) : scrollElement.scrollTop = _ref + _this._positionFromTop);
            }), _defineProperty(_this, "_registerResizeListener", function(element) {
                element === window ? window.addEventListener("resize", _this._onResize, !1) : _this._detectElementResize.addResizeListener(element, _this._onResize);
            }), _defineProperty(_this, "_unregisterResizeListener", function(element) {
                element === window ? window.removeEventListener("resize", _this._onResize, !1) : element && _this._detectElementResize.removeResizeListener(element, _this._onResize);
            }), _defineProperty(_this, "_onResize", function() {
                _this.updatePosition();
            }), _defineProperty(_this, "__handleWindowScrollEvent", function() {
                var onScroll, scrollLeft, scrollElement;
                _this._isMounted && (onScroll = _this.props.onScroll, scrollElement = _this.props.scrollElement) && (scrollElement = getScrollOffset(scrollElement), 
                scrollLeft = Math.max(0, scrollElement.left - _this._positionFromLeft), 
                scrollElement = Math.max(0, scrollElement.top - _this._positionFromTop), 
                _this.setState({
                    isScrolling: !0,
                    scrollLeft: scrollLeft,
                    scrollTop: scrollElement
                }), onScroll({
                    scrollLeft: scrollLeft,
                    scrollTop: scrollElement
                }));
            }), _defineProperty(_this, "__resetIsScrolling", function() {
                _this.setState({
                    isScrolling: !1
                });
            }), _this;
        }
        return _inherits(WindowScroller, React.PureComponent), _createClass(WindowScroller, [ {
            key: "updatePosition",
            value: function() {
                var container, elementRect, scrollElement = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : this.props.scrollElement, onResize = this.props.onResize, _this$state = this.state, height = _this$state.height, _this$state = _this$state.width, thisNode = this._child || this._windowScrollerRef.current, containerElement = (thisNode instanceof Element && scrollElement && (thisNode = thisNode, 
                container = isWindow(container = scrollElement) && document.documentElement ? (containerElement = document.documentElement, 
                elementRect = getBoundingBox(thisNode), containerElement = getBoundingBox(containerElement), 
                {
                    top: elementRect.top - containerElement.top,
                    left: elementRect.left - containerElement.left
                }) : (elementRect = getScrollOffset(container), containerElement = getBoundingBox(thisNode), 
                thisNode = getBoundingBox(container), {
                    top: containerElement.top + elementRect.top - thisNode.top,
                    left: containerElement.left + elementRect.left - thisNode.left
                }), this._positionFromTop = container.top, this._positionFromLeft = container.left), 
                getDimensions(scrollElement, this.props));
                height === containerElement.height && _this$state === containerElement.width || (this.setState({
                    height: containerElement.height,
                    width: containerElement.width
                }), onResize({
                    height: containerElement.height,
                    width: containerElement.width
                })), !0 === this.props.updateScrollTopOnUpdatePosition && (this.__handleWindowScrollEvent(), 
                this.__resetIsScrolling());
            }
        }, {
            key: "componentDidMount",
            value: function() {
                var scrollElement = this.props.scrollElement;
                this._detectElementResize = createDetectElementResize(), this.updatePosition(scrollElement), 
                scrollElement && (registerScrollListener(this, scrollElement), this._registerResizeListener(scrollElement)), 
                this._isMounted = !0;
            }
        }, {
            key: "componentDidUpdate",
            value: function(prevProps, prevState) {
                var scrollElement = this.props.scrollElement, prevProps = prevProps.scrollElement;
                prevProps !== scrollElement && null != prevProps && null != scrollElement && (this.updatePosition(scrollElement), 
                unregisterScrollListener(this, prevProps), registerScrollListener(this, scrollElement), 
                this._unregisterResizeListener(prevProps), this._registerResizeListener(scrollElement));
            }
        }, {
            key: "componentWillUnmount",
            value: function() {
                var scrollElement = this.props.scrollElement;
                scrollElement && (unregisterScrollListener(this, scrollElement), 
                this._unregisterResizeListener(scrollElement)), this._isMounted = !1;
            }
        }, {
            key: "render",
            value: function() {
                var children = this.props.children, _this$state2 = this.state, isScrolling = _this$state2.isScrolling;
                return React.createElement("div", {
                    ref: this._windowScrollerRef
                }, children({
                    onChildScroll: this._onChildScroll,
                    registerChild: this._registerChild,
                    height: _this$state2.height,
                    isScrolling: isScrolling,
                    scrollLeft: _this$state2.scrollLeft,
                    scrollTop: _this$state2.scrollTop,
                    width: _this$state2.width
                }));
            }
        } ]);
    })();
    _defineProperty(propTypes, "defaultProps", {
        onResize: function() {},
        onScroll: function() {},
        scrollingResetTimeInterval: 150,
        scrollElement: getWindow(),
        serverHeight: 0,
        serverWidth: 0
    }), exports.ArrowKeyStepper = ArrowKeyStepper, exports.AutoSizer = AutoSizer, 
    exports.CellMeasurer = CellMeasurer, exports.CellMeasurerCache = CellMeasurerCache, 
    exports.Collection = Collection, exports.Column = Column, exports.ColumnSizer = ColumnSizer, 
    exports.Grid = Grid, exports.InfiniteLoader = request, exports.List = cancel, 
    exports.Masonry = proto, exports.MultiGrid = MultiGrid, exports.ScrollSync = ScrollSync, 
    exports.SortDirection = SortDirection, exports.SortIndicator = SortIndicator, 
    exports.Table = Table, exports.WindowScroller = propTypes, exports.accessibilityOverscanIndicesGetter = defaultOverscanIndicesGetter$1, 
    exports.createMasonryCellPositioner = function(_ref) {
        var columnHeights, cellMeasurerCache = _ref.cellMeasurerCache, columnCount = _ref.columnCount, columnWidth = _ref.columnWidth, spacer = void 0 === (_ref = _ref.spacer) ? 0 : _ref;
        function cellPositioner(index) {
            for (var columnIndex = 0, i = 1; i < columnHeights.length; i++) columnHeights[i] < columnHeights[columnIndex] && (columnIndex = i);
            var left = columnIndex * (columnWidth + spacer), top = columnHeights[columnIndex] || 0;
            return columnHeights[columnIndex] = top + cellMeasurerCache.getHeight(index) + spacer, 
            {
                left: left,
                top: top
            };
        }
        function initOrResetDerivedValues() {
            columnHeights = [];
            for (var i = 0; i < columnCount; i++) columnHeights[i] = 0;
        }
        return initOrResetDerivedValues(), cellPositioner.reset = function(params) {
            columnCount = params.columnCount, columnWidth = params.columnWidth, 
            spacer = params.spacer, initOrResetDerivedValues();
        }, cellPositioner;
    }, exports.createTableMultiSort = function(sortCallback) {
        var sortBy, sortDirection, _ref = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : {}, defaultSortBy = _ref.defaultSortBy, defaultSortDirection = void 0 === (_ref = _ref.defaultSortDirection) ? {} : _ref;
        if (sortCallback) return sortDirection = {}, (sortBy = defaultSortBy || []).forEach(function(dataKey) {
            sortDirection[dataKey] = void 0 !== defaultSortDirection[dataKey] ? defaultSortDirection[dataKey] : "ASC";
        }), {
            sort: function(_ref2) {
                var defaultSortDirection = _ref2.defaultSortDirection, event = _ref2.event, dataKey = _ref2.sortBy;
                event.shiftKey ? void 0 !== sortDirection[dataKey] ? sortDirection[dataKey] = "ASC" === sortDirection[dataKey] ? "DESC" : "ASC" : (sortDirection[dataKey] = defaultSortDirection, 
                sortBy.push(dataKey)) : event.ctrlKey || event.metaKey ? 0 <= (_ref2 = sortBy.indexOf(dataKey)) && (sortBy.splice(_ref2, 1), 
                delete sortDirection[dataKey]) : (sortBy.length = 0, sortBy.push(dataKey), 
                Object.keys(sortDirection).forEach(function(key) {
                    key !== dataKey && delete sortDirection[key];
                }), sortDirection[dataKey] = void 0 !== sortDirection[dataKey] ? "ASC" === sortDirection[dataKey] ? "DESC" : "ASC" : defaultSortDirection), 
                sortCallback({
                    sortBy: sortBy,
                    sortDirection: sortDirection
                });
            },
            sortBy: sortBy,
            sortDirection: sortDirection
        };
        throw Error('Required parameter "sortCallback" not specified');
    }, exports.defaultCellRangeRenderer = defaultCellRangeRenderer, exports.defaultOverscanIndicesGetter = defaultOverscanIndicesGetter, 
    exports.defaultTableCellDataGetter = defaultCellDataGetter, exports.defaultTableCellRenderer = defaultCellRenderer, 
    exports.defaultTableHeaderRenderer = defaultHeaderRenderer, exports.defaultTableHeaderRowRenderer = defaultHeaderRowRenderer, 
    exports.defaultTableRowRenderer = defaultRowRenderer, Object.defineProperty(exports, "__esModule", {
        value: !0
    });
});
