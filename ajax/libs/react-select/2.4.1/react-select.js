(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('react'), require('emotion'), require('react-dom'), require('prop-types'), require('react-input-autosize')) :
  typeof define === 'function' && define.amd ? define(['react', 'emotion', 'react-dom', 'prop-types', 'react-input-autosize'], factory) :
  (global = global || self, global.Select = factory(global.React, global.emotion, global.ReactDOM, global.PropTypes, global.AutosizeInput));
}(this, function (React, emotion, reactDom, PropTypes, AutosizeInput) { 'use strict';

  var React__default = 'default' in React ? React['default'] : React;
  PropTypes = PropTypes && PropTypes.hasOwnProperty('default') ? PropTypes['default'] : PropTypes;
  AutosizeInput = AutosizeInput && AutosizeInput.hasOwnProperty('default') ? AutosizeInput['default'] : AutosizeInput;

  function _typeof(obj) {
    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

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

  function _objectSpread(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};
      var ownKeys = Object.keys(source);

      if (typeof Object.getOwnPropertySymbols === 'function') {
        ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
          return Object.getOwnPropertyDescriptor(source, sym).enumerable;
        }));
      }

      ownKeys.forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    }

    return target;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
  }

  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
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

  function _objectWithoutProperties(source, excluded) {
    if (source == null) return {};

    var target = _objectWithoutPropertiesLoose(source, excluded);

    var key, i;

    if (Object.getOwnPropertySymbols) {
      var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

      for (i = 0; i < sourceSymbolKeys.length; i++) {
        key = sourceSymbolKeys[i];
        if (excluded.indexOf(key) >= 0) continue;
        if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
        target[key] = source[key];
      }
    }

    return target;
  }

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  function _possibleConstructorReturn(self, call) {
    if (call && (typeof call === "object" || typeof call === "function")) {
      return call;
    }

    return _assertThisInitialized(self);
  }

  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
  }

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

      return arr2;
    }
  }

  function _iterableToArray(iter) {
    if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
  }

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance");
  }

  var shallowEqual = function shallowEqual(newValue, oldValue) {
    return newValue === oldValue;
  };

  var simpleIsEqual = function simpleIsEqual(newArgs, lastArgs) {
    return newArgs.length === lastArgs.length && newArgs.every(function (newArg, index) {
      return shallowEqual(newArg, lastArgs[index]);
    });
  };

  function index(resultFn, isEqual) {
    if (isEqual === void 0) {
      isEqual = simpleIsEqual;
    }

    var lastThis;
    var lastArgs = [];
    var lastResult;
    var calledOnce = false;

    var result = function result() {
      for (var _len = arguments.length, newArgs = new Array(_len), _key = 0; _key < _len; _key++) {
        newArgs[_key] = arguments[_key];
      }

      if (calledOnce && lastThis === this && isEqual(newArgs, lastArgs)) {
        return lastResult;
      }

      lastResult = resultFn.apply(this, newArgs);
      calledOnce = true;
      lastThis = this;
      lastArgs = newArgs;
      return lastResult;
    };

    return result;
  }

  var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

  function createCommonjsModule(fn, module) {
  	return module = { exports: {} }, fn(module, module.exports), module.exports;
  }

  var performanceNow = createCommonjsModule(function (module) {
  // Generated by CoffeeScript 1.12.2
  (function () {
    var getNanoSeconds, hrtime, loadTime, moduleLoadTime, nodeLoadTime, upTime;

    if (typeof performance !== "undefined" && performance !== null && performance.now) {
      module.exports = function () {
        return performance.now();
      };
    } else if (typeof process !== "undefined" && process !== null && process.hrtime) {
      module.exports = function () {
        return (getNanoSeconds() - nodeLoadTime) / 1e6;
      };

      hrtime = process.hrtime;

      getNanoSeconds = function getNanoSeconds() {
        var hr;
        hr = hrtime();
        return hr[0] * 1e9 + hr[1];
      };

      moduleLoadTime = getNanoSeconds();
      upTime = process.uptime() * 1e9;
      nodeLoadTime = moduleLoadTime - upTime;
    } else if (Date.now) {
      module.exports = function () {
        return Date.now() - loadTime;
      };

      loadTime = Date.now();
    } else {
      module.exports = function () {
        return new Date().getTime() - loadTime;
      };

      loadTime = new Date().getTime();
    }
  }).call(commonjsGlobal);
  });

  var root = typeof window === 'undefined' ? commonjsGlobal : window,
      vendors = ['moz', 'webkit'],
      suffix = 'AnimationFrame',
      raf = root['request' + suffix],
      caf = root['cancel' + suffix] || root['cancelRequest' + suffix];

  for (var i = 0; !raf && i < vendors.length; i++) {
    raf = root[vendors[i] + 'Request' + suffix];
    caf = root[vendors[i] + 'Cancel' + suffix] || root[vendors[i] + 'CancelRequest' + suffix];
  } // Some versions of FF have rAF but not cAF


  if (!raf || !caf) {
    var last = 0,
        id$1 = 0,
        queue = [],
        frameDuration = 1000 / 60;

    raf = function raf(callback) {
      if (queue.length === 0) {
        var _now = performanceNow(),
            next = Math.max(0, frameDuration - (_now - last));

        last = next + _now;
        setTimeout(function () {
          var cp = queue.slice(0); // Clear queue here to prevent
          // callbacks from appending listeners
          // to the current frame's queue

          queue.length = 0;

          for (var i = 0; i < cp.length; i++) {
            if (!cp[i].cancelled) {
              try {
                cp[i].callback(last);
              } catch (e) {
                setTimeout(function () {
                  throw e;
                }, 0);
              }
            }
          }
        }, Math.round(next));
      }

      queue.push({
        handle: ++id$1,
        callback: callback,
        cancelled: false
      });
      return id$1;
    };

    caf = function caf(handle) {
      for (var i = 0; i < queue.length; i++) {
        if (queue[i].handle === handle) {
          queue[i].cancelled = true;
        }
      }
    };
  }

  var raf_1 = function (fn) {
    // Wrap in a new function to prevent
    // `cancel` potentially being assigned
    // to the native rAF function
    return raf.call(root, fn);
  };

  var cancel = function () {
    caf.apply(root, arguments);
  };

  var polyfill = function (object) {
    if (!object) {
      object = root;
    }

    object.requestAnimationFrame = raf;
    object.cancelAnimationFrame = caf;
  };
  raf_1.cancel = cancel;
  raf_1.polyfill = polyfill;

  // ==============================
  // NO OP
  // ==============================
  var noop = function noop() {};
  // Class Name Prefixer
  // ==============================

  /**
   String representation of component state for styling with class names.

   Expects an array of strings OR a string/object pair:
   - className(['comp', 'comp-arg', 'comp-arg-2'])
     @returns 'react-select__comp react-select__comp-arg react-select__comp-arg-2'
   - className('comp', { some: true, state: false })
     @returns 'react-select__comp react-select__comp--some'
  */

  function applyPrefixToName(prefix, name) {
    if (!name) {
      return prefix;
    } else if (name[0] === '-') {
      return prefix + name;
    } else {
      return prefix + '__' + name;
    }
  }

  function classNames(prefix, cssKey, state, className) {
    var arr = [cssKey, className];

    if (state && prefix) {
      for (var key in state) {
        if (state.hasOwnProperty(key) && state[key]) {
          arr.push("".concat(applyPrefixToName(prefix, key)));
        }
      }
    }

    return arr.filter(function (i) {
      return i;
    }).map(function (i) {
      return String(i).trim();
    }).join(' ');
  } // ==============================
  // Clean Value
  // ==============================

  var cleanValue = function cleanValue(value) {
    if (Array.isArray(value)) return value.filter(Boolean);
    if (_typeof(value) === 'object' && value !== null) return [value];
    return [];
  }; // ==============================
  // Handle Input Change
  // ==============================

  function handleInputChange(inputValue, actionMeta, onInputChange) {
    if (onInputChange) {
      var newValue = onInputChange(inputValue, actionMeta);
      if (typeof newValue === 'string') return newValue;
    }

    return inputValue;
  } // ==============================
  // Scroll Helpers
  // ==============================

  function isDocumentElement(el) {
    return [document.documentElement, document.body, window].indexOf(el) > -1;
  } // Normalized Scroll Top
  // ------------------------------

  function getScrollTop(el) {
    if (isDocumentElement(el)) {
      return window.pageYOffset;
    }

    return el.scrollTop;
  }
  function scrollTo(el, top) {
    // with a scroll distance, we perform scroll on the element
    if (isDocumentElement(el)) {
      window.scrollTo(0, top);
      return;
    }

    el.scrollTop = top;
  } // Get Scroll Parent
  // ------------------------------

  function getScrollParent(element) {
    var style = getComputedStyle(element);
    var excludeStaticParent = style.position === 'absolute';
    var overflowRx = /(auto|scroll)/;
    var docEl = document.documentElement; // suck it, flow...

    if (style.position === 'fixed') return docEl;

    for (var parent = element; parent = parent.parentElement;) {
      style = getComputedStyle(parent);

      if (excludeStaticParent && style.position === 'static') {
        continue;
      }

      if (overflowRx.test(style.overflow + style.overflowY + style.overflowX)) {
        return parent;
      }
    }

    return docEl;
  } // Animated Scroll To
  // ------------------------------

  /**
    @param t: time (elapsed)
    @param b: initial value
    @param c: amount of change
    @param d: duration
  */

  function easeOutCubic(t, b, c, d) {
    return c * ((t = t / d - 1) * t * t + 1) + b;
  }

  function animatedScrollTo(element, to) {
    var duration = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 200;
    var callback = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : noop;
    var start = getScrollTop(element);
    var change = to - start;
    var increment = 10;
    var currentTime = 0;

    function animateScroll() {
      currentTime += increment;
      var val = easeOutCubic(currentTime, start, change, duration);
      scrollTo(element, val);

      if (currentTime < duration) {
        raf_1(animateScroll);
      } else {
        callback(element);
      }
    }

    animateScroll();
  } // Scroll Into View
  // ------------------------------

  function scrollIntoView(menuEl, focusedEl) {
    var menuRect = menuEl.getBoundingClientRect();
    var focusedRect = focusedEl.getBoundingClientRect();
    var overScroll = focusedEl.offsetHeight / 3;

    if (focusedRect.bottom + overScroll > menuRect.bottom) {
      scrollTo(menuEl, Math.min(focusedEl.offsetTop + focusedEl.clientHeight - menuEl.offsetHeight + overScroll, menuEl.scrollHeight));
    } else if (focusedRect.top - overScroll < menuRect.top) {
      scrollTo(menuEl, Math.max(focusedEl.offsetTop - overScroll, 0));
    }
  } // ==============================
  // Get bounding client object
  // ==============================
  // cannot get keys using array notation with DOMRect

  function getBoundingClientObj(element) {
    var rect = element.getBoundingClientRect();
    return {
      bottom: rect.bottom,
      height: rect.height,
      left: rect.left,
      right: rect.right,
      top: rect.top,
      width: rect.width
    };
  }
  // Touch Capability Detector
  // ==============================

  function isTouchCapable() {
    try {
      document.createEvent('TouchEvent');
      return true;
    } catch (e) {
      return false;
    }
  } // ==============================
  // Mobile Device Detector
  // ==============================

  function isMobileDevice() {
    try {
      return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    } catch (e) {
      return false;
    }
  }

  function getMenuPlacement(_ref) {
    var maxHeight = _ref.maxHeight,
        menuEl = _ref.menuEl,
        minHeight = _ref.minHeight,
        placement = _ref.placement,
        shouldScroll = _ref.shouldScroll,
        isFixedPosition = _ref.isFixedPosition,
        theme = _ref.theme;
    var spacing = theme.spacing;
    var scrollParent = getScrollParent(menuEl);
    var defaultState = {
      placement: 'bottom',
      maxHeight: maxHeight
    }; // something went wrong, return default state

    if (!menuEl || !menuEl.offsetParent) return defaultState; // we can't trust `scrollParent.scrollHeight` --> it may increase when
    // the menu is rendered

    var _scrollParent$getBoun = scrollParent.getBoundingClientRect(),
        scrollHeight = _scrollParent$getBoun.height;

    var _menuEl$getBoundingCl = menuEl.getBoundingClientRect(),
        menuBottom = _menuEl$getBoundingCl.bottom,
        menuHeight = _menuEl$getBoundingCl.height,
        menuTop = _menuEl$getBoundingCl.top;

    var _menuEl$offsetParent$ = menuEl.offsetParent.getBoundingClientRect(),
        containerTop = _menuEl$offsetParent$.top;

    var viewHeight = window.innerHeight;
    var scrollTop = getScrollTop(scrollParent);
    var marginBottom = parseInt(getComputedStyle(menuEl).marginBottom, 10);
    var marginTop = parseInt(getComputedStyle(menuEl).marginTop, 10);
    var viewSpaceAbove = containerTop - marginTop;
    var viewSpaceBelow = viewHeight - menuTop;
    var scrollSpaceAbove = viewSpaceAbove + scrollTop;
    var scrollSpaceBelow = scrollHeight - scrollTop - menuTop;
    var scrollDown = menuBottom - viewHeight + scrollTop + marginBottom;
    var scrollUp = scrollTop + menuTop - marginTop;
    var scrollDuration = 160;

    switch (placement) {
      case 'auto':
      case 'bottom':
        // 1: the menu will fit, do nothing
        if (viewSpaceBelow >= menuHeight) {
          return {
            placement: 'bottom',
            maxHeight: maxHeight
          };
        } // 2: the menu will fit, if scrolled


        if (scrollSpaceBelow >= menuHeight && !isFixedPosition) {
          if (shouldScroll) {
            animatedScrollTo(scrollParent, scrollDown, scrollDuration);
          }

          return {
            placement: 'bottom',
            maxHeight: maxHeight
          };
        } // 3: the menu will fit, if constrained


        if (!isFixedPosition && scrollSpaceBelow >= minHeight || isFixedPosition && viewSpaceBelow >= minHeight) {
          if (shouldScroll) {
            animatedScrollTo(scrollParent, scrollDown, scrollDuration);
          } // we want to provide as much of the menu as possible to the user,
          // so give them whatever is available below rather than the minHeight.


          var constrainedHeight = isFixedPosition ? viewSpaceBelow - marginBottom : scrollSpaceBelow - marginBottom;
          return {
            placement: 'bottom',
            maxHeight: constrainedHeight
          };
        } // 4. Forked beviour when there isn't enough space below
        // AUTO: flip the menu, render above


        if (placement === 'auto' || isFixedPosition) {
          // may need to be constrained after flipping
          var _constrainedHeight = maxHeight;
          var spaceAbove = isFixedPosition ? viewSpaceAbove : scrollSpaceAbove;

          if (spaceAbove >= minHeight) {
            _constrainedHeight = Math.min(spaceAbove - marginBottom - spacing.controlHeight, maxHeight);
          }

          return {
            placement: 'top',
            maxHeight: _constrainedHeight
          };
        } // BOTTOM: allow browser to increase scrollable area and immediately set scroll


        if (placement === 'bottom') {
          scrollTo(scrollParent, scrollDown);
          return {
            placement: 'bottom',
            maxHeight: maxHeight
          };
        }

        break;

      case 'top':
        // 1: the menu will fit, do nothing
        if (viewSpaceAbove >= menuHeight) {
          return {
            placement: 'top',
            maxHeight: maxHeight
          };
        } // 2: the menu will fit, if scrolled


        if (scrollSpaceAbove >= menuHeight && !isFixedPosition) {
          if (shouldScroll) {
            animatedScrollTo(scrollParent, scrollUp, scrollDuration);
          }

          return {
            placement: 'top',
            maxHeight: maxHeight
          };
        } // 3: the menu will fit, if constrained


        if (!isFixedPosition && scrollSpaceAbove >= minHeight || isFixedPosition && viewSpaceAbove >= minHeight) {
          var _constrainedHeight2 = maxHeight; // we want to provide as much of the menu as possible to the user,
          // so give them whatever is available below rather than the minHeight.

          if (!isFixedPosition && scrollSpaceAbove >= minHeight || isFixedPosition && viewSpaceAbove >= minHeight) {
            _constrainedHeight2 = isFixedPosition ? viewSpaceAbove - marginTop : scrollSpaceAbove - marginTop;
          }

          if (shouldScroll) {
            animatedScrollTo(scrollParent, scrollUp, scrollDuration);
          }

          return {
            placement: 'top',
            maxHeight: _constrainedHeight2
          };
        } // 4. not enough space, the browser WILL NOT increase scrollable area when
        // absolutely positioned element rendered above the viewport (only below).
        // Flip the menu, render below


        return {
          placement: 'bottom',
          maxHeight: maxHeight
        };

      default:
        throw new Error("Invalid placement provided \"".concat(placement, "\"."));
    } // fulfil contract with flow: implicit return value of undefined


    return defaultState;
  } // Menu Component
  // ------------------------------

  function alignToControl(placement) {
    var placementToCSSProp = {
      bottom: 'top',
      top: 'bottom'
    };
    return placement ? placementToCSSProp[placement] : 'bottom';
  }

  var coercePlacement = function coercePlacement(p) {
    return p === 'auto' ? 'bottom' : p;
  };

  var menuCSS = function menuCSS(_ref2) {
    var _ref3;

    var placement = _ref2.placement,
        _ref2$theme = _ref2.theme,
        borderRadius = _ref2$theme.borderRadius,
        spacing = _ref2$theme.spacing,
        colors = _ref2$theme.colors;
    return _ref3 = {}, _defineProperty(_ref3, alignToControl(placement), '100%'), _defineProperty(_ref3, "backgroundColor", colors.neutral0), _defineProperty(_ref3, "borderRadius", borderRadius), _defineProperty(_ref3, "boxShadow", '0 0 0 1px hsla(0, 0%, 0%, 0.1), 0 4px 11px hsla(0, 0%, 0%, 0.1)'), _defineProperty(_ref3, "marginBottom", spacing.menuGutter), _defineProperty(_ref3, "marginTop", spacing.menuGutter), _defineProperty(_ref3, "position", 'absolute'), _defineProperty(_ref3, "width", '100%'), _defineProperty(_ref3, "zIndex", 1), _ref3;
  }; // NOTE: internal only

  var MenuPlacer =
  /*#__PURE__*/
  function (_Component) {
    _inherits(MenuPlacer, _Component);

    function MenuPlacer() {
      var _getPrototypeOf2;

      var _this;

      _classCallCheck(this, MenuPlacer);

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(MenuPlacer)).call.apply(_getPrototypeOf2, [this].concat(args)));

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "state", {
        maxHeight: _this.props.maxMenuHeight,
        placement: null
      });

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "getPlacement", function (ref) {
        var _this$props = _this.props,
            minMenuHeight = _this$props.minMenuHeight,
            maxMenuHeight = _this$props.maxMenuHeight,
            menuPlacement = _this$props.menuPlacement,
            menuPosition = _this$props.menuPosition,
            menuShouldScrollIntoView = _this$props.menuShouldScrollIntoView,
            theme = _this$props.theme;
        var getPortalPlacement = _this.context.getPortalPlacement;
        if (!ref) return; // DO NOT scroll if position is fixed

        var isFixedPosition = menuPosition === 'fixed';
        var shouldScroll = menuShouldScrollIntoView && !isFixedPosition;
        var state = getMenuPlacement({
          maxHeight: maxMenuHeight,
          menuEl: ref,
          minHeight: minMenuHeight,
          placement: menuPlacement,
          shouldScroll: shouldScroll,
          isFixedPosition: isFixedPosition,
          theme: theme
        });
        if (getPortalPlacement) getPortalPlacement(state);

        _this.setState(state);
      });

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "getUpdatedProps", function () {
        var menuPlacement = _this.props.menuPlacement;
        var placement = _this.state.placement || coercePlacement(menuPlacement);
        return _objectSpread({}, _this.props, {
          placement: placement,
          maxHeight: _this.state.maxHeight
        });
      });

      return _this;
    }

    _createClass(MenuPlacer, [{
      key: "render",
      value: function render() {
        var children = this.props.children;
        return children({
          ref: this.getPlacement,
          placerProps: this.getUpdatedProps()
        });
      }
    }]);

    return MenuPlacer;
  }(React.Component);

  _defineProperty(MenuPlacer, "contextTypes", {
    getPortalPlacement: PropTypes.func
  });

  var Menu = function Menu(props) {
    var children = props.children,
        className = props.className,
        cx = props.cx,
        getStyles = props.getStyles,
        innerRef = props.innerRef,
        innerProps = props.innerProps;
    var cn = cx(
    /*#__PURE__*/
    emotion.css(getStyles('menu', props)), {
      menu: true
    }, className);
    return React__default.createElement("div", _extends({
      className: cn
    }, innerProps, {
      ref: innerRef
    }), children);
  };
  // Menu List
  // ==============================

  var menuListCSS = function menuListCSS(_ref4) {
    var maxHeight = _ref4.maxHeight,
        baseUnit = _ref4.theme.spacing.baseUnit;
    return {
      maxHeight: maxHeight,
      overflowY: 'auto',
      paddingBottom: baseUnit,
      paddingTop: baseUnit,
      position: 'relative',
      // required for offset[Height, Top] > keyboard scroll
      WebkitOverflowScrolling: 'touch'
    };
  };
  var MenuList = function MenuList(props) {
    var children = props.children,
        className = props.className,
        cx = props.cx,
        getStyles = props.getStyles,
        isMulti = props.isMulti,
        innerRef = props.innerRef;
    return React__default.createElement("div", {
      className: cx(
      /*#__PURE__*/
      emotion.css(getStyles('menuList', props)), {
        'menu-list': true,
        'menu-list--is-multi': isMulti
      }, className),
      ref: innerRef
    }, children);
  }; // ==============================
  // Menu Notices
  // ==============================

  var noticeCSS = function noticeCSS(_ref5) {
    var _ref5$theme = _ref5.theme,
        baseUnit = _ref5$theme.spacing.baseUnit,
        colors = _ref5$theme.colors;
    return {
      color: colors.neutral40,
      padding: "".concat(baseUnit * 2, "px ").concat(baseUnit * 3, "px"),
      textAlign: 'center'
    };
  };

  var noOptionsMessageCSS = noticeCSS;
  var loadingMessageCSS = noticeCSS;
  var NoOptionsMessage = function NoOptionsMessage(props) {
    var children = props.children,
        className = props.className,
        cx = props.cx,
        getStyles = props.getStyles,
        innerProps = props.innerProps;
    return React__default.createElement("div", _extends({
      className: cx(
      /*#__PURE__*/
      emotion.css(getStyles('noOptionsMessage', props)), {
        'menu-notice': true,
        'menu-notice--no-options': true
      }, className)
    }, innerProps), children);
  };
  NoOptionsMessage.defaultProps = {
    children: 'No options'
  };
  var LoadingMessage = function LoadingMessage(props) {
    var children = props.children,
        className = props.className,
        cx = props.cx,
        getStyles = props.getStyles,
        innerProps = props.innerProps;
    return React__default.createElement("div", _extends({
      className: cx(
      /*#__PURE__*/
      emotion.css(getStyles('loadingMessage', props)), {
        'menu-notice': true,
        'menu-notice--loading': true
      }, className)
    }, innerProps), children);
  };
  LoadingMessage.defaultProps = {
    children: 'Loading...'
  }; // ==============================
  // Menu Portal
  // ==============================

  var menuPortalCSS = function menuPortalCSS(_ref6) {
    var rect = _ref6.rect,
        offset = _ref6.offset,
        position = _ref6.position;
    return {
      left: rect.left,
      position: position,
      top: offset,
      width: rect.width,
      zIndex: 1
    };
  };
  var MenuPortal =
  /*#__PURE__*/
  function (_Component2) {
    _inherits(MenuPortal, _Component2);

    function MenuPortal() {
      var _getPrototypeOf3;

      var _this2;

      _classCallCheck(this, MenuPortal);

      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      _this2 = _possibleConstructorReturn(this, (_getPrototypeOf3 = _getPrototypeOf(MenuPortal)).call.apply(_getPrototypeOf3, [this].concat(args)));

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this2)), "state", {
        placement: null
      });

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this2)), "getPortalPlacement", function (_ref7) {
        var placement = _ref7.placement;
        var initialPlacement = coercePlacement(_this2.props.menuPlacement); // avoid re-renders if the placement has not changed

        if (placement !== initialPlacement) {
          _this2.setState({
            placement: placement
          });
        }
      });

      return _this2;
    }

    _createClass(MenuPortal, [{
      key: "getChildContext",
      value: function getChildContext() {
        return {
          getPortalPlacement: this.getPortalPlacement
        };
      } // callback for occassions where the menu must "flip"

    }, {
      key: "render",
      value: function render() {
        var _this$props2 = this.props,
            appendTo = _this$props2.appendTo,
            children = _this$props2.children,
            controlElement = _this$props2.controlElement,
            menuPlacement = _this$props2.menuPlacement,
            position = _this$props2.menuPosition,
            getStyles = _this$props2.getStyles;
        var isFixed = position === 'fixed'; // bail early if required elements aren't present

        if (!appendTo && !isFixed || !controlElement) {
          return null;
        }

        var placement = this.state.placement || coercePlacement(menuPlacement);
        var rect = getBoundingClientObj(controlElement);
        var scrollDistance = isFixed ? 0 : window.pageYOffset;
        var offset = rect[placement] + scrollDistance;
        var state = {
          offset: offset,
          position: position,
          rect: rect
        }; // same wrapper element whether fixed or portalled

        var menuWrapper = React__default.createElement("div", {
          className:
          /*#__PURE__*/

          /*#__PURE__*/
          emotion.css(getStyles('menuPortal', state))
        }, children);
        return appendTo ? reactDom.createPortal(menuWrapper, appendTo) : menuWrapper;
      }
    }]);

    return MenuPortal;
  }(React.Component);

  _defineProperty(MenuPortal, "childContextTypes", {
    getPortalPlacement: PropTypes.func
  });

  var isArray = Array.isArray;
  var keyList = Object.keys;
  var hasProp = Object.prototype.hasOwnProperty;

  function equal(a, b) {
    // fast-deep-equal index.js 2.0.1
    if (a === b) return true;

    if (a && b && _typeof(a) == 'object' && _typeof(b) == 'object') {
      var arrA = isArray(a),
          arrB = isArray(b),
          i,
          length,
          key;

      if (arrA && arrB) {
        length = a.length;
        if (length != b.length) return false;

        for (i = length; i-- !== 0;) {
          if (!equal(a[i], b[i])) return false;
        }

        return true;
      }

      if (arrA != arrB) return false;
      var dateA = a instanceof Date,
          dateB = b instanceof Date;
      if (dateA != dateB) return false;
      if (dateA && dateB) return a.getTime() == b.getTime();
      var regexpA = a instanceof RegExp,
          regexpB = b instanceof RegExp;
      if (regexpA != regexpB) return false;
      if (regexpA && regexpB) return a.toString() == b.toString();
      var keys = keyList(a);
      length = keys.length;

      if (length !== keyList(b).length) {
        return false;
      }

      for (i = length; i-- !== 0;) {
        if (!hasProp.call(b, keys[i])) return false;
      } // end fast-deep-equal
      // Custom handling for React


      for (i = length; i-- !== 0;) {
        key = keys[i];

        if (key === '_owner' && a.$$typeof) {
          // React-specific: avoid traversing React elements' _owner.
          //  _owner contains circular references
          // and is not needed when comparing the actual elements (and not their owners)
          // .$$typeof and ._store on just reasonable markers of a react element
          continue;
        } else {
          // all other properties should be traversed as usual
          if (!equal(a[key], b[key])) return false;
        }
      } // fast-deep-equal index.js 2.0.1


      return true;
    }

    return a !== a && b !== b;
  } // end fast-deep-equal


  function exportedEqual(a, b) {
    try {
      return equal(a, b);
    } catch (error) {
      if (error.message && error.message.match(/stack|recursion/i)) {
        // warn on circular references, don't crash
        // browsers give this different errors name and messages:
        // chrome/safari: "RangeError", "Maximum call stack size exceeded"
        // firefox: "InternalError", too much recursion"
        // edge: "Error", "Out of stack space"
        console.warn('Warning: react-fast-compare does not handle circular references.', error.name, error.message);
        return false;
      } // some other error. we should definitely know about these


      throw error;
    }
  }

  var diacritics = [{
    base: 'A',
    letters: /[\u0041\u24B6\uFF21\u00C0\u00C1\u00C2\u1EA6\u1EA4\u1EAA\u1EA8\u00C3\u0100\u0102\u1EB0\u1EAE\u1EB4\u1EB2\u0226\u01E0\u00C4\u01DE\u1EA2\u00C5\u01FA\u01CD\u0200\u0202\u1EA0\u1EAC\u1EB6\u1E00\u0104\u023A\u2C6F]/g
  }, {
    base: 'AA',
    letters: /[\uA732]/g
  }, {
    base: 'AE',
    letters: /[\u00C6\u01FC\u01E2]/g
  }, {
    base: 'AO',
    letters: /[\uA734]/g
  }, {
    base: 'AU',
    letters: /[\uA736]/g
  }, {
    base: 'AV',
    letters: /[\uA738\uA73A]/g
  }, {
    base: 'AY',
    letters: /[\uA73C]/g
  }, {
    base: 'B',
    letters: /[\u0042\u24B7\uFF22\u1E02\u1E04\u1E06\u0243\u0182\u0181]/g
  }, {
    base: 'C',
    letters: /[\u0043\u24B8\uFF23\u0106\u0108\u010A\u010C\u00C7\u1E08\u0187\u023B\uA73E]/g
  }, {
    base: 'D',
    letters: /[\u0044\u24B9\uFF24\u1E0A\u010E\u1E0C\u1E10\u1E12\u1E0E\u0110\u018B\u018A\u0189\uA779]/g
  }, {
    base: 'DZ',
    letters: /[\u01F1\u01C4]/g
  }, {
    base: 'Dz',
    letters: /[\u01F2\u01C5]/g
  }, {
    base: 'E',
    letters: /[\u0045\u24BA\uFF25\u00C8\u00C9\u00CA\u1EC0\u1EBE\u1EC4\u1EC2\u1EBC\u0112\u1E14\u1E16\u0114\u0116\u00CB\u1EBA\u011A\u0204\u0206\u1EB8\u1EC6\u0228\u1E1C\u0118\u1E18\u1E1A\u0190\u018E]/g
  }, {
    base: 'F',
    letters: /[\u0046\u24BB\uFF26\u1E1E\u0191\uA77B]/g
  }, {
    base: 'G',
    letters: /[\u0047\u24BC\uFF27\u01F4\u011C\u1E20\u011E\u0120\u01E6\u0122\u01E4\u0193\uA7A0\uA77D\uA77E]/g
  }, {
    base: 'H',
    letters: /[\u0048\u24BD\uFF28\u0124\u1E22\u1E26\u021E\u1E24\u1E28\u1E2A\u0126\u2C67\u2C75\uA78D]/g
  }, {
    base: 'I',
    letters: /[\u0049\u24BE\uFF29\u00CC\u00CD\u00CE\u0128\u012A\u012C\u0130\u00CF\u1E2E\u1EC8\u01CF\u0208\u020A\u1ECA\u012E\u1E2C\u0197]/g
  }, {
    base: 'J',
    letters: /[\u004A\u24BF\uFF2A\u0134\u0248]/g
  }, {
    base: 'K',
    letters: /[\u004B\u24C0\uFF2B\u1E30\u01E8\u1E32\u0136\u1E34\u0198\u2C69\uA740\uA742\uA744\uA7A2]/g
  }, {
    base: 'L',
    letters: /[\u004C\u24C1\uFF2C\u013F\u0139\u013D\u1E36\u1E38\u013B\u1E3C\u1E3A\u0141\u023D\u2C62\u2C60\uA748\uA746\uA780]/g
  }, {
    base: 'LJ',
    letters: /[\u01C7]/g
  }, {
    base: 'Lj',
    letters: /[\u01C8]/g
  }, {
    base: 'M',
    letters: /[\u004D\u24C2\uFF2D\u1E3E\u1E40\u1E42\u2C6E\u019C]/g
  }, {
    base: 'N',
    letters: /[\u004E\u24C3\uFF2E\u01F8\u0143\u00D1\u1E44\u0147\u1E46\u0145\u1E4A\u1E48\u0220\u019D\uA790\uA7A4]/g
  }, {
    base: 'NJ',
    letters: /[\u01CA]/g
  }, {
    base: 'Nj',
    letters: /[\u01CB]/g
  }, {
    base: 'O',
    letters: /[\u004F\u24C4\uFF2F\u00D2\u00D3\u00D4\u1ED2\u1ED0\u1ED6\u1ED4\u00D5\u1E4C\u022C\u1E4E\u014C\u1E50\u1E52\u014E\u022E\u0230\u00D6\u022A\u1ECE\u0150\u01D1\u020C\u020E\u01A0\u1EDC\u1EDA\u1EE0\u1EDE\u1EE2\u1ECC\u1ED8\u01EA\u01EC\u00D8\u01FE\u0186\u019F\uA74A\uA74C]/g
  }, {
    base: 'OI',
    letters: /[\u01A2]/g
  }, {
    base: 'OO',
    letters: /[\uA74E]/g
  }, {
    base: 'OU',
    letters: /[\u0222]/g
  }, {
    base: 'P',
    letters: /[\u0050\u24C5\uFF30\u1E54\u1E56\u01A4\u2C63\uA750\uA752\uA754]/g
  }, {
    base: 'Q',
    letters: /[\u0051\u24C6\uFF31\uA756\uA758\u024A]/g
  }, {
    base: 'R',
    letters: /[\u0052\u24C7\uFF32\u0154\u1E58\u0158\u0210\u0212\u1E5A\u1E5C\u0156\u1E5E\u024C\u2C64\uA75A\uA7A6\uA782]/g
  }, {
    base: 'S',
    letters: /[\u0053\u24C8\uFF33\u1E9E\u015A\u1E64\u015C\u1E60\u0160\u1E66\u1E62\u1E68\u0218\u015E\u2C7E\uA7A8\uA784]/g
  }, {
    base: 'T',
    letters: /[\u0054\u24C9\uFF34\u1E6A\u0164\u1E6C\u021A\u0162\u1E70\u1E6E\u0166\u01AC\u01AE\u023E\uA786]/g
  }, {
    base: 'TZ',
    letters: /[\uA728]/g
  }, {
    base: 'U',
    letters: /[\u0055\u24CA\uFF35\u00D9\u00DA\u00DB\u0168\u1E78\u016A\u1E7A\u016C\u00DC\u01DB\u01D7\u01D5\u01D9\u1EE6\u016E\u0170\u01D3\u0214\u0216\u01AF\u1EEA\u1EE8\u1EEE\u1EEC\u1EF0\u1EE4\u1E72\u0172\u1E76\u1E74\u0244]/g
  }, {
    base: 'V',
    letters: /[\u0056\u24CB\uFF36\u1E7C\u1E7E\u01B2\uA75E\u0245]/g
  }, {
    base: 'VY',
    letters: /[\uA760]/g
  }, {
    base: 'W',
    letters: /[\u0057\u24CC\uFF37\u1E80\u1E82\u0174\u1E86\u1E84\u1E88\u2C72]/g
  }, {
    base: 'X',
    letters: /[\u0058\u24CD\uFF38\u1E8A\u1E8C]/g
  }, {
    base: 'Y',
    letters: /[\u0059\u24CE\uFF39\u1EF2\u00DD\u0176\u1EF8\u0232\u1E8E\u0178\u1EF6\u1EF4\u01B3\u024E\u1EFE]/g
  }, {
    base: 'Z',
    letters: /[\u005A\u24CF\uFF3A\u0179\u1E90\u017B\u017D\u1E92\u1E94\u01B5\u0224\u2C7F\u2C6B\uA762]/g
  }, {
    base: 'a',
    letters: /[\u0061\u24D0\uFF41\u1E9A\u00E0\u00E1\u00E2\u1EA7\u1EA5\u1EAB\u1EA9\u00E3\u0101\u0103\u1EB1\u1EAF\u1EB5\u1EB3\u0227\u01E1\u00E4\u01DF\u1EA3\u00E5\u01FB\u01CE\u0201\u0203\u1EA1\u1EAD\u1EB7\u1E01\u0105\u2C65\u0250]/g
  }, {
    base: 'aa',
    letters: /[\uA733]/g
  }, {
    base: 'ae',
    letters: /[\u00E6\u01FD\u01E3]/g
  }, {
    base: 'ao',
    letters: /[\uA735]/g
  }, {
    base: 'au',
    letters: /[\uA737]/g
  }, {
    base: 'av',
    letters: /[\uA739\uA73B]/g
  }, {
    base: 'ay',
    letters: /[\uA73D]/g
  }, {
    base: 'b',
    letters: /[\u0062\u24D1\uFF42\u1E03\u1E05\u1E07\u0180\u0183\u0253]/g
  }, {
    base: 'c',
    letters: /[\u0063\u24D2\uFF43\u0107\u0109\u010B\u010D\u00E7\u1E09\u0188\u023C\uA73F\u2184]/g
  }, {
    base: 'd',
    letters: /[\u0064\u24D3\uFF44\u1E0B\u010F\u1E0D\u1E11\u1E13\u1E0F\u0111\u018C\u0256\u0257\uA77A]/g
  }, {
    base: 'dz',
    letters: /[\u01F3\u01C6]/g
  }, {
    base: 'e',
    letters: /[\u0065\u24D4\uFF45\u00E8\u00E9\u00EA\u1EC1\u1EBF\u1EC5\u1EC3\u1EBD\u0113\u1E15\u1E17\u0115\u0117\u00EB\u1EBB\u011B\u0205\u0207\u1EB9\u1EC7\u0229\u1E1D\u0119\u1E19\u1E1B\u0247\u025B\u01DD]/g
  }, {
    base: 'f',
    letters: /[\u0066\u24D5\uFF46\u1E1F\u0192\uA77C]/g
  }, {
    base: 'g',
    letters: /[\u0067\u24D6\uFF47\u01F5\u011D\u1E21\u011F\u0121\u01E7\u0123\u01E5\u0260\uA7A1\u1D79\uA77F]/g
  }, {
    base: 'h',
    letters: /[\u0068\u24D7\uFF48\u0125\u1E23\u1E27\u021F\u1E25\u1E29\u1E2B\u1E96\u0127\u2C68\u2C76\u0265]/g
  }, {
    base: 'hv',
    letters: /[\u0195]/g
  }, {
    base: 'i',
    letters: /[\u0069\u24D8\uFF49\u00EC\u00ED\u00EE\u0129\u012B\u012D\u00EF\u1E2F\u1EC9\u01D0\u0209\u020B\u1ECB\u012F\u1E2D\u0268\u0131]/g
  }, {
    base: 'j',
    letters: /[\u006A\u24D9\uFF4A\u0135\u01F0\u0249]/g
  }, {
    base: 'k',
    letters: /[\u006B\u24DA\uFF4B\u1E31\u01E9\u1E33\u0137\u1E35\u0199\u2C6A\uA741\uA743\uA745\uA7A3]/g
  }, {
    base: 'l',
    letters: /[\u006C\u24DB\uFF4C\u0140\u013A\u013E\u1E37\u1E39\u013C\u1E3D\u1E3B\u017F\u0142\u019A\u026B\u2C61\uA749\uA781\uA747]/g
  }, {
    base: 'lj',
    letters: /[\u01C9]/g
  }, {
    base: 'm',
    letters: /[\u006D\u24DC\uFF4D\u1E3F\u1E41\u1E43\u0271\u026F]/g
  }, {
    base: 'n',
    letters: /[\u006E\u24DD\uFF4E\u01F9\u0144\u00F1\u1E45\u0148\u1E47\u0146\u1E4B\u1E49\u019E\u0272\u0149\uA791\uA7A5]/g
  }, {
    base: 'nj',
    letters: /[\u01CC]/g
  }, {
    base: 'o',
    letters: /[\u006F\u24DE\uFF4F\u00F2\u00F3\u00F4\u1ED3\u1ED1\u1ED7\u1ED5\u00F5\u1E4D\u022D\u1E4F\u014D\u1E51\u1E53\u014F\u022F\u0231\u00F6\u022B\u1ECF\u0151\u01D2\u020D\u020F\u01A1\u1EDD\u1EDB\u1EE1\u1EDF\u1EE3\u1ECD\u1ED9\u01EB\u01ED\u00F8\u01FF\u0254\uA74B\uA74D\u0275]/g
  }, {
    base: 'oi',
    letters: /[\u01A3]/g
  }, {
    base: 'ou',
    letters: /[\u0223]/g
  }, {
    base: 'oo',
    letters: /[\uA74F]/g
  }, {
    base: 'p',
    letters: /[\u0070\u24DF\uFF50\u1E55\u1E57\u01A5\u1D7D\uA751\uA753\uA755]/g
  }, {
    base: 'q',
    letters: /[\u0071\u24E0\uFF51\u024B\uA757\uA759]/g
  }, {
    base: 'r',
    letters: /[\u0072\u24E1\uFF52\u0155\u1E59\u0159\u0211\u0213\u1E5B\u1E5D\u0157\u1E5F\u024D\u027D\uA75B\uA7A7\uA783]/g
  }, {
    base: 's',
    letters: /[\u0073\u24E2\uFF53\u00DF\u015B\u1E65\u015D\u1E61\u0161\u1E67\u1E63\u1E69\u0219\u015F\u023F\uA7A9\uA785\u1E9B]/g
  }, {
    base: 't',
    letters: /[\u0074\u24E3\uFF54\u1E6B\u1E97\u0165\u1E6D\u021B\u0163\u1E71\u1E6F\u0167\u01AD\u0288\u2C66\uA787]/g
  }, {
    base: 'tz',
    letters: /[\uA729]/g
  }, {
    base: 'u',
    letters: /[\u0075\u24E4\uFF55\u00F9\u00FA\u00FB\u0169\u1E79\u016B\u1E7B\u016D\u00FC\u01DC\u01D8\u01D6\u01DA\u1EE7\u016F\u0171\u01D4\u0215\u0217\u01B0\u1EEB\u1EE9\u1EEF\u1EED\u1EF1\u1EE5\u1E73\u0173\u1E77\u1E75\u0289]/g
  }, {
    base: 'v',
    letters: /[\u0076\u24E5\uFF56\u1E7D\u1E7F\u028B\uA75F\u028C]/g
  }, {
    base: 'vy',
    letters: /[\uA761]/g
  }, {
    base: 'w',
    letters: /[\u0077\u24E6\uFF57\u1E81\u1E83\u0175\u1E87\u1E85\u1E98\u1E89\u2C73]/g
  }, {
    base: 'x',
    letters: /[\u0078\u24E7\uFF58\u1E8B\u1E8D]/g
  }, {
    base: 'y',
    letters: /[\u0079\u24E8\uFF59\u1EF3\u00FD\u0177\u1EF9\u0233\u1E8F\u00FF\u1EF7\u1E99\u1EF5\u01B4\u024F\u1EFF]/g
  }, {
    base: 'z',
    letters: /[\u007A\u24E9\uFF5A\u017A\u1E91\u017C\u017E\u1E93\u1E95\u01B6\u0225\u0240\u2C6C\uA763]/g
  }];
  var stripDiacritics = function stripDiacritics(str) {
    for (var i = 0; i < diacritics.length; i++) {
      str = str.replace(diacritics[i].letters, diacritics[i].base);
    }

    return str;
  };

  var trimString = function trimString(str) {
    return str.replace(/^\s+|\s+$/g, '');
  };

  var defaultStringify = function defaultStringify(option) {
    return "".concat(option.label, " ").concat(option.value);
  };

  var createFilter = function createFilter(config) {
    return function (option, rawInput) {
      var _ignoreCase$ignoreAcc = _objectSpread({
        ignoreCase: true,
        ignoreAccents: true,
        stringify: defaultStringify,
        trim: true,
        matchFrom: 'any'
      }, config),
          ignoreCase = _ignoreCase$ignoreAcc.ignoreCase,
          ignoreAccents = _ignoreCase$ignoreAcc.ignoreAccents,
          stringify = _ignoreCase$ignoreAcc.stringify,
          trim = _ignoreCase$ignoreAcc.trim,
          matchFrom = _ignoreCase$ignoreAcc.matchFrom;

      var input = trim ? trimString(rawInput) : rawInput;
      var candidate = trim ? trimString(stringify(option)) : stringify(option);

      if (ignoreCase) {
        input = input.toLowerCase();
        candidate = candidate.toLowerCase();
      }

      if (ignoreAccents) {
        input = stripDiacritics(input);
        candidate = stripDiacritics(candidate);
      }

      return matchFrom === 'start' ? candidate.substr(0, input.length) === input : candidate.indexOf(input) > -1;
    };
  };

  var A11yText = function A11yText(props) {
    return React__default.createElement("span", _extends({
      className:
      /*#__PURE__*/

      /*#__PURE__*/
      emotion.css({
        zIndex: 9999,
        border: 0,
        clip: 'rect(1px, 1px, 1px, 1px)',
        height: 1,
        width: 1,
        position: 'absolute',
        overflow: 'hidden',
        padding: 0,
        whiteSpace: 'nowrap',
        backgroundColor: 'red',
        color: 'blue'
      })
    }, props));
  };

  var DummyInput =
  /*#__PURE__*/
  function (_Component) {
    _inherits(DummyInput, _Component);

    function DummyInput() {
      _classCallCheck(this, DummyInput);

      return _possibleConstructorReturn(this, _getPrototypeOf(DummyInput).apply(this, arguments));
    }

    _createClass(DummyInput, [{
      key: "render",
      value: function render() {
        var _this$props = this.props,
            inProp = _this$props.in,
            out = _this$props.out,
            onExited = _this$props.onExited,
            appear = _this$props.appear,
            enter = _this$props.enter,
            exit = _this$props.exit,
            innerRef = _this$props.innerRef,
            emotion$$1 = _this$props.emotion,
            props = _objectWithoutProperties(_this$props, ["in", "out", "onExited", "appear", "enter", "exit", "innerRef", "emotion"]);

        return React__default.createElement("input", _extends({
          ref: innerRef
        }, props, {
          className:
          /*#__PURE__*/

          /*#__PURE__*/
          emotion.css({
            // get rid of any default styles
            background: 0,
            border: 0,
            fontSize: 'inherit',
            outline: 0,
            padding: 0,
            // important! without `width` browsers won't allow focus
            width: 1,
            // remove cursor on desktop
            color: 'transparent',
            // remove cursor on mobile whilst maintaining "scroll into view" behaviour
            left: -100,
            opacity: 0,
            position: 'relative',
            transform: 'scale(0)'
          })
        }));
      }
    }]);

    return DummyInput;
  }(React.Component);

  var NodeResolver =
  /*#__PURE__*/
  function (_Component) {
    _inherits(NodeResolver, _Component);

    function NodeResolver() {
      _classCallCheck(this, NodeResolver);

      return _possibleConstructorReturn(this, _getPrototypeOf(NodeResolver).apply(this, arguments));
    }

    _createClass(NodeResolver, [{
      key: "componentDidMount",
      value: function componentDidMount() {
        this.props.innerRef(reactDom.findDOMNode(this));
      }
    }, {
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
        this.props.innerRef(null);
      }
    }, {
      key: "render",
      value: function render() {
        return this.props.children;
      }
    }]);

    return NodeResolver;
  }(React.Component);

  var STYLE_KEYS = ['boxSizing', 'height', 'overflow', 'paddingRight', 'position'];
  var LOCK_STYLES = {
    boxSizing: 'border-box',
    // account for possible declaration `width: 100%;` on body
    overflow: 'hidden',
    position: 'relative',
    height: '100%'
  };

  function preventTouchMove(e) {
    e.preventDefault();
  }
  function allowTouchMove(e) {
    e.stopPropagation();
  }
  function preventInertiaScroll() {
    var top = this.scrollTop;
    var totalScroll = this.scrollHeight;
    var currentScroll = top + this.offsetHeight;

    if (top === 0) {
      this.scrollTop = 1;
    } else if (currentScroll === totalScroll) {
      this.scrollTop = top - 1;
    }
  } // `ontouchstart` check works on most browsers
  // `maxTouchPoints` works on IE10/11 and Surface

  function isTouchDevice() {
    return 'ontouchstart' in window || navigator.maxTouchPoints;
  }

  var canUseDOM = !!(typeof window !== 'undefined' && window.document && window.document.createElement);
  var activeScrollLocks = 0;

  var ScrollLock =
  /*#__PURE__*/
  function (_Component) {
    _inherits(ScrollLock, _Component);

    function ScrollLock() {
      var _getPrototypeOf2;

      var _this;

      _classCallCheck(this, ScrollLock);

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(ScrollLock)).call.apply(_getPrototypeOf2, [this].concat(args)));

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "originalStyles", {});

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "listenerOptions", {
        capture: false,
        passive: false
      });

      return _this;
    }

    _createClass(ScrollLock, [{
      key: "componentDidMount",
      value: function componentDidMount() {
        var _this2 = this;

        if (!canUseDOM) return;
        var _this$props = this.props,
            accountForScrollbars = _this$props.accountForScrollbars,
            touchScrollTarget = _this$props.touchScrollTarget;
        var target = document.body;
        var targetStyle = target && target.style;

        if (accountForScrollbars) {
          // store any styles already applied to the body
          STYLE_KEYS.forEach(function (key) {
            var val = targetStyle && targetStyle[key];
            _this2.originalStyles[key] = val;
          });
        } // apply the lock styles and padding if this is the first scroll lock


        if (accountForScrollbars && activeScrollLocks < 1) {
          var currentPadding = parseInt(this.originalStyles.paddingRight, 10) || 0;
          var clientWidth = document.body ? document.body.clientWidth : 0;
          var adjustedPadding = window.innerWidth - clientWidth + currentPadding || 0;
          Object.keys(LOCK_STYLES).forEach(function (key) {
            var val = LOCK_STYLES[key];

            if (targetStyle) {
              targetStyle[key] = val;
            }
          });

          if (targetStyle) {
            targetStyle.paddingRight = "".concat(adjustedPadding, "px");
          }
        } // account for touch devices


        if (target && isTouchDevice()) {
          // Mobile Safari ignores { overflow: hidden } declaration on the body.
          target.addEventListener('touchmove', preventTouchMove, this.listenerOptions); // Allow scroll on provided target

          if (touchScrollTarget) {
            touchScrollTarget.addEventListener('touchstart', preventInertiaScroll, this.listenerOptions);
            touchScrollTarget.addEventListener('touchmove', allowTouchMove, this.listenerOptions);
          }
        } // increment active scroll locks


        activeScrollLocks += 1;
      }
    }, {
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
        var _this3 = this;

        if (!canUseDOM) return;
        var _this$props2 = this.props,
            accountForScrollbars = _this$props2.accountForScrollbars,
            touchScrollTarget = _this$props2.touchScrollTarget;
        var target = document.body;
        var targetStyle = target && target.style; // safely decrement active scroll locks

        activeScrollLocks = Math.max(activeScrollLocks - 1, 0); // reapply original body styles, if any

        if (accountForScrollbars && activeScrollLocks < 1) {
          STYLE_KEYS.forEach(function (key) {
            var val = _this3.originalStyles[key];

            if (targetStyle) {
              targetStyle[key] = val;
            }
          });
        } // remove touch listeners


        if (target && isTouchDevice()) {
          target.removeEventListener('touchmove', preventTouchMove, this.listenerOptions);

          if (touchScrollTarget) {
            touchScrollTarget.removeEventListener('touchstart', preventInertiaScroll, this.listenerOptions);
            touchScrollTarget.removeEventListener('touchmove', allowTouchMove, this.listenerOptions);
          }
        }
      }
    }, {
      key: "render",
      value: function render() {
        return null;
      }
    }]);

    return ScrollLock;
  }(React.Component);

  _defineProperty(ScrollLock, "defaultProps", {
    accountForScrollbars: true
  });

  // NOTE:
  // We shouldn't need this after updating to React v16.3.0, which introduces:
  // - createRef() https://reactjs.org/docs/react-api.html#reactcreateref
  // - forwardRef() https://reactjs.org/docs/react-api.html#reactforwardref
  var ScrollBlock =
  /*#__PURE__*/
  function (_PureComponent) {
    _inherits(ScrollBlock, _PureComponent);

    function ScrollBlock() {
      var _getPrototypeOf2;

      var _this;

      _classCallCheck(this, ScrollBlock);

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(ScrollBlock)).call.apply(_getPrototypeOf2, [this].concat(args)));

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "state", {
        touchScrollTarget: null
      });

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "getScrollTarget", function (ref) {
        if (ref === _this.state.touchScrollTarget) return;

        _this.setState({
          touchScrollTarget: ref
        });
      });

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "blurSelectInput", function () {
        if (document.activeElement) {
          document.activeElement.blur();
        }
      });

      return _this;
    }

    _createClass(ScrollBlock, [{
      key: "render",
      value: function render() {
        var _this$props = this.props,
            children = _this$props.children,
            isEnabled = _this$props.isEnabled;
        var touchScrollTarget = this.state.touchScrollTarget; // bail early if not enabled

        if (!isEnabled) return children;
        /*
         * Div
         * ------------------------------
         * blocks scrolling on non-body elements behind the menu
          * NodeResolver
         * ------------------------------
         * we need a reference to the scrollable element to "unlock" scroll on
         * mobile devices
          * ScrollLock
         * ------------------------------
         * actually does the scroll locking
         */

        return React__default.createElement("div", null, React__default.createElement("div", {
          onClick: this.blurSelectInput,
          className:
          /*#__PURE__*/

          /*#__PURE__*/
          emotion.css({
            position: 'fixed',
            left: 0,
            bottom: 0,
            right: 0,
            top: 0
          })
        }), React__default.createElement(NodeResolver, {
          innerRef: this.getScrollTarget
        }, children), touchScrollTarget ? React__default.createElement(ScrollLock, {
          touchScrollTarget: touchScrollTarget
        }) : null);
      }
    }]);

    return ScrollBlock;
  }(React.PureComponent);

  var ScrollCaptor =
  /*#__PURE__*/
  function (_Component) {
    _inherits(ScrollCaptor, _Component);

    function ScrollCaptor() {
      var _getPrototypeOf2;

      var _this;

      _classCallCheck(this, ScrollCaptor);

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(ScrollCaptor)).call.apply(_getPrototypeOf2, [this].concat(args)));

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "isBottom", false);

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "isTop", false);

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "scrollTarget", void 0);

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "touchStart", void 0);

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "cancelScroll", function (event) {
        event.preventDefault();
        event.stopPropagation();
      });

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleEventDelta", function (event, delta) {
        var _this$props = _this.props,
            onBottomArrive = _this$props.onBottomArrive,
            onBottomLeave = _this$props.onBottomLeave,
            onTopArrive = _this$props.onTopArrive,
            onTopLeave = _this$props.onTopLeave;
        var _this$scrollTarget = _this.scrollTarget,
            scrollTop = _this$scrollTarget.scrollTop,
            scrollHeight = _this$scrollTarget.scrollHeight,
            clientHeight = _this$scrollTarget.clientHeight;
        var target = _this.scrollTarget;
        var isDeltaPositive = delta > 0;
        var availableScroll = scrollHeight - clientHeight - scrollTop;
        var shouldCancelScroll = false; // reset bottom/top flags

        if (availableScroll > delta && _this.isBottom) {
          if (onBottomLeave) onBottomLeave(event);
          _this.isBottom = false;
        }

        if (isDeltaPositive && _this.isTop) {
          if (onTopLeave) onTopLeave(event);
          _this.isTop = false;
        } // bottom limit


        if (isDeltaPositive && delta > availableScroll) {
          if (onBottomArrive && !_this.isBottom) {
            onBottomArrive(event);
          }

          target.scrollTop = scrollHeight;
          shouldCancelScroll = true;
          _this.isBottom = true; // top limit
        } else if (!isDeltaPositive && -delta > scrollTop) {
          if (onTopArrive && !_this.isTop) {
            onTopArrive(event);
          }

          target.scrollTop = 0;
          shouldCancelScroll = true;
          _this.isTop = true;
        } // cancel scroll


        if (shouldCancelScroll) {
          _this.cancelScroll(event);
        }
      });

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onWheel", function (event) {
        _this.handleEventDelta(event, event.deltaY);
      });

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onTouchStart", function (event) {
        // set touch start so we can calculate touchmove delta
        _this.touchStart = event.changedTouches[0].clientY;
      });

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onTouchMove", function (event) {
        var deltaY = _this.touchStart - event.changedTouches[0].clientY;

        _this.handleEventDelta(event, deltaY);
      });

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "getScrollTarget", function (ref) {
        _this.scrollTarget = ref;
      });

      return _this;
    }

    _createClass(ScrollCaptor, [{
      key: "componentDidMount",
      value: function componentDidMount() {
        this.startListening(this.scrollTarget);
      }
    }, {
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
        this.stopListening(this.scrollTarget);
      }
    }, {
      key: "startListening",
      value: function startListening(el) {
        // bail early if no scroll available
        if (!el) return;
        if (el.scrollHeight <= el.clientHeight) return; // all the if statements are to appease Flow 😢

        if (typeof el.addEventListener === 'function') {
          el.addEventListener('wheel', this.onWheel, false);
        }

        if (typeof el.addEventListener === 'function') {
          el.addEventListener('touchstart', this.onTouchStart, false);
        }

        if (typeof el.addEventListener === 'function') {
          el.addEventListener('touchmove', this.onTouchMove, false);
        }
      }
    }, {
      key: "stopListening",
      value: function stopListening(el) {
        // bail early if no scroll available
        if (el.scrollHeight <= el.clientHeight) return; // all the if statements are to appease Flow 😢

        if (typeof el.removeEventListener === 'function') {
          el.removeEventListener('wheel', this.onWheel, false);
        }

        if (typeof el.removeEventListener === 'function') {
          el.removeEventListener('touchstart', this.onTouchStart, false);
        }

        if (typeof el.removeEventListener === 'function') {
          el.removeEventListener('touchmove', this.onTouchMove, false);
        }
      }
    }, {
      key: "render",
      value: function render() {
        return React__default.createElement(NodeResolver, {
          innerRef: this.getScrollTarget
        }, this.props.children);
      }
    }]);

    return ScrollCaptor;
  }(React.Component);

  var ScrollCaptorSwitch =
  /*#__PURE__*/
  function (_Component2) {
    _inherits(ScrollCaptorSwitch, _Component2);

    function ScrollCaptorSwitch() {
      _classCallCheck(this, ScrollCaptorSwitch);

      return _possibleConstructorReturn(this, _getPrototypeOf(ScrollCaptorSwitch).apply(this, arguments));
    }

    _createClass(ScrollCaptorSwitch, [{
      key: "render",
      value: function render() {
        var _this$props2 = this.props,
            isEnabled = _this$props2.isEnabled,
            props = _objectWithoutProperties(_this$props2, ["isEnabled"]);

        return isEnabled ? React__default.createElement(ScrollCaptor, props) : this.props.children;
      }
    }]);

    return ScrollCaptorSwitch;
  }(React.Component);

  _defineProperty(ScrollCaptorSwitch, "defaultProps", {
    isEnabled: true
  });

  var instructionsAriaMessage = function instructionsAriaMessage(event) {
    var context = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var isSearchable = context.isSearchable,
        isMulti = context.isMulti,
        label = context.label;

    switch (event) {
      case 'menu':
        return 'Use Up and Down to choose options, press Enter to select the currently focused option, press Escape to exit the menu, press Tab to select the option and exit the menu.';

      case 'input':
        return "".concat(label ? label : 'Select', " is focused ").concat(isSearchable ? ',type to refine list' : '', ", press Down to open the menu, ").concat(isMulti ? ' press left to focus selected values' : '');

      case 'value':
        return 'Use left and right to toggle between focused values, press Backspace to remove the currently focused value';
    }
  };
  var valueEventAriaMessage = function valueEventAriaMessage(event, context) {
    var value = context.value;
    if (!value) return;

    switch (event) {
      case 'deselect-option':
      case 'pop-value':
      case 'remove-value':
        return "option ".concat(value, ", deselected.");

      case 'select-option':
        return "option ".concat(value, ", selected.");
    }
  };
  var valueFocusAriaMessage = function valueFocusAriaMessage(_ref) {
    var focusedValue = _ref.focusedValue,
        getOptionLabel = _ref.getOptionLabel,
        selectValue = _ref.selectValue;
    return "value ".concat(getOptionLabel(focusedValue), " focused, ").concat(selectValue.indexOf(focusedValue) + 1, " of ").concat(selectValue.length, ".");
  };
  var optionFocusAriaMessage = function optionFocusAriaMessage(_ref2) {
    var focusedOption = _ref2.focusedOption,
        getOptionLabel = _ref2.getOptionLabel,
        options = _ref2.options;
    return "option ".concat(getOptionLabel(focusedOption), " focused, ").concat(options.indexOf(focusedOption) + 1, " of ").concat(options.length, ".");
  };
  var resultsAriaMessage = function resultsAriaMessage(_ref3) {
    var inputValue = _ref3.inputValue,
        screenReaderMessage = _ref3.screenReaderMessage;
    return "".concat(screenReaderMessage).concat(inputValue ? ' for search term ' + inputValue : '', ".");
  };

  var formatGroupLabel = function formatGroupLabel(group) {
    return group.label;
  };
  var getOptionLabel = function getOptionLabel(option) {
    return option.label;
  };
  var getOptionValue = function getOptionValue(option) {
    return option.value;
  };
  var isOptionDisabled = function isOptionDisabled(option) {
    return !!option.isDisabled;
  };

  var containerCSS = function containerCSS(_ref) {
    var isDisabled = _ref.isDisabled,
        isRtl = _ref.isRtl;
    return {
      direction: isRtl ? 'rtl' : null,
      pointerEvents: isDisabled ? 'none' : null,
      // cancel mouse events when disabled
      position: 'relative'
    };
  };
  var SelectContainer = function SelectContainer(props) {
    var children = props.children,
        className = props.className,
        cx = props.cx,
        getStyles = props.getStyles,
        innerProps = props.innerProps,
        isDisabled = props.isDisabled,
        isRtl = props.isRtl;
    return React__default.createElement("div", _extends({
      className: cx(
      /*#__PURE__*/
      emotion.css(getStyles('container', props)), {
        '--is-disabled': isDisabled,
        '--is-rtl': isRtl
      }, className)
    }, innerProps), children);
  }; // ==============================
  // Value Container
  // ==============================

  var valueContainerCSS = function valueContainerCSS(_ref2) {
    var spacing = _ref2.theme.spacing;
    return {
      alignItems: 'center',
      display: 'flex',
      flex: 1,
      flexWrap: 'wrap',
      padding: "".concat(spacing.baseUnit / 2, "px ").concat(spacing.baseUnit * 2, "px"),
      WebkitOverflowScrolling: 'touch',
      position: 'relative',
      overflow: 'hidden'
    };
  };
  var ValueContainer =
  /*#__PURE__*/
  function (_Component) {
    _inherits(ValueContainer, _Component);

    function ValueContainer() {
      _classCallCheck(this, ValueContainer);

      return _possibleConstructorReturn(this, _getPrototypeOf(ValueContainer).apply(this, arguments));
    }

    _createClass(ValueContainer, [{
      key: "render",
      value: function render() {
        var _this$props = this.props,
            children = _this$props.children,
            className = _this$props.className,
            cx = _this$props.cx,
            isMulti = _this$props.isMulti,
            getStyles = _this$props.getStyles,
            hasValue = _this$props.hasValue;
        return React__default.createElement("div", {
          className: cx(
          /*#__PURE__*/
          emotion.css(getStyles('valueContainer', this.props)), {
            'value-container': true,
            'value-container--is-multi': isMulti,
            'value-container--has-value': hasValue
          }, className)
        }, children);
      }
    }]);

    return ValueContainer;
  }(React.Component); // ==============================
  // Indicator Container
  // ==============================

  var indicatorsContainerCSS = function indicatorsContainerCSS() {
    return {
      alignItems: 'center',
      alignSelf: 'stretch',
      display: 'flex',
      flexShrink: 0
    };
  };
  var IndicatorsContainer = function IndicatorsContainer(props) {
    var children = props.children,
        className = props.className,
        cx = props.cx,
        getStyles = props.getStyles;
    return React__default.createElement("div", {
      className: cx(
      /*#__PURE__*/
      emotion.css(getStyles('indicatorsContainer', props)), {
        'indicators': true
      }, className)
    }, children);
  };

  // ==============================
  // Dropdown & Clear Icons
  // ==============================
  var Svg = function Svg(_ref) {
    var size = _ref.size,
        props = _objectWithoutProperties(_ref, ["size"]);

    return React__default.createElement("svg", _extends({
      height: size,
      width: size,
      viewBox: "0 0 20 20",
      "aria-hidden": "true",
      focusable: "false",
      className:
      /*#__PURE__*/

      /*#__PURE__*/
      emotion.css({
        display: 'inline-block',
        fill: 'currentColor',
        lineHeight: 1,
        stroke: 'currentColor',
        strokeWidth: 0
      })
    }, props));
  };

  var CrossIcon = function CrossIcon(props) {
    return React__default.createElement(Svg, _extends({
      size: 20
    }, props), React__default.createElement("path", {
      d: "M14.348 14.849c-0.469 0.469-1.229 0.469-1.697 0l-2.651-3.030-2.651 3.029c-0.469 0.469-1.229 0.469-1.697 0-0.469-0.469-0.469-1.229 0-1.697l2.758-3.15-2.759-3.152c-0.469-0.469-0.469-1.228 0-1.697s1.228-0.469 1.697 0l2.652 3.031 2.651-3.031c0.469-0.469 1.228-0.469 1.697 0s0.469 1.229 0 1.697l-2.758 3.152 2.758 3.15c0.469 0.469 0.469 1.229 0 1.698z"
    }));
  };
  var DownChevron = function DownChevron(props) {
    return React__default.createElement(Svg, _extends({
      size: 20
    }, props), React__default.createElement("path", {
      d: "M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"
    }));
  }; // ==============================
  // Dropdown & Clear Buttons
  // ==============================

  var baseCSS = function baseCSS(_ref2) {
    var isFocused = _ref2.isFocused,
        _ref2$theme = _ref2.theme,
        baseUnit = _ref2$theme.spacing.baseUnit,
        colors = _ref2$theme.colors;
    return {
      color: isFocused ? colors.neutral60 : colors.neutral20,
      display: 'flex',
      padding: baseUnit * 2,
      transition: 'color 150ms',
      ':hover': {
        color: isFocused ? colors.neutral80 : colors.neutral40
      }
    };
  };

  var dropdownIndicatorCSS = baseCSS;
  var DropdownIndicator = function DropdownIndicator(props) {
    var children = props.children,
        className = props.className,
        cx = props.cx,
        getStyles = props.getStyles,
        innerProps = props.innerProps;
    return React__default.createElement("div", _extends({}, innerProps, {
      className: cx(
      /*#__PURE__*/
      emotion.css(getStyles('dropdownIndicator', props)), {
        'indicator': true,
        'dropdown-indicator': true
      }, className)
    }), children || React__default.createElement(DownChevron, null));
  };
  var clearIndicatorCSS = baseCSS;
  var ClearIndicator = function ClearIndicator(props) {
    var children = props.children,
        className = props.className,
        cx = props.cx,
        getStyles = props.getStyles,
        innerProps = props.innerProps;
    return React__default.createElement("div", _extends({}, innerProps, {
      className: cx(
      /*#__PURE__*/
      emotion.css(getStyles('clearIndicator', props)), {
        'indicator': true,
        'clear-indicator': true
      }, className)
    }), children || React__default.createElement(CrossIcon, null));
  }; // ==============================
  // Separator
  // ==============================

  var indicatorSeparatorCSS = function indicatorSeparatorCSS(_ref3) {
    var isDisabled = _ref3.isDisabled,
        _ref3$theme = _ref3.theme,
        baseUnit = _ref3$theme.spacing.baseUnit,
        colors = _ref3$theme.colors;
    return {
      alignSelf: 'stretch',
      backgroundColor: isDisabled ? colors.neutral10 : colors.neutral20,
      marginBottom: baseUnit * 2,
      marginTop: baseUnit * 2,
      width: 1
    };
  };
  var IndicatorSeparator = function IndicatorSeparator(props) {
    var className = props.className,
        cx = props.cx,
        getStyles = props.getStyles,
        innerProps = props.innerProps;
    return React__default.createElement("span", _extends({}, innerProps, {
      className: cx(
      /*#__PURE__*/
      emotion.css(getStyles('indicatorSeparator', props)), {
        'indicator-separator': true
      }, className)
    }));
  }; // ==============================
  // Loading
  // ==============================

  var keyframesName = 'react-select-loading-indicator';
  var keyframesInjected = false;
  var loadingIndicatorCSS = function loadingIndicatorCSS(_ref4) {
    var isFocused = _ref4.isFocused,
        size = _ref4.size,
        _ref4$theme = _ref4.theme,
        colors = _ref4$theme.colors,
        baseUnit = _ref4$theme.spacing.baseUnit;
    return {
      color: isFocused ? colors.neutral60 : colors.neutral20,
      display: 'flex',
      padding: baseUnit * 2,
      transition: 'color 150ms',
      alignSelf: 'center',
      fontSize: size,
      lineHeight: 1,
      marginRight: size,
      textAlign: 'center',
      verticalAlign: 'middle'
    };
  };

  var LoadingDot = function LoadingDot(_ref5) {
    var color = _ref5.color,
        delay = _ref5.delay,
        offset = _ref5.offset;
    return React__default.createElement("span", {
      className:
      /*#__PURE__*/

      /*#__PURE__*/
      emotion.css({
        animationDuration: '1s',
        animationDelay: "".concat(delay, "ms"),
        animationIterationCount: 'infinite',
        animationName: keyframesName,
        animationTimingFunction: 'ease-in-out',
        backgroundColor: color,
        borderRadius: '1em',
        display: 'inline-block',
        marginLeft: offset ? '1em' : null,
        height: '1em',
        verticalAlign: 'top',
        width: '1em'
      })
    });
  };

  var LoadingIndicator = function LoadingIndicator(props) {
    var className = props.className,
        cx = props.cx,
        getStyles = props.getStyles,
        innerProps = props.innerProps,
        isFocused = props.isFocused,
        isRtl = props.isRtl,
        colors = props.theme.colors;
    var color = isFocused ? colors.neutral80 : colors.neutral20;

    if (!keyframesInjected) {
      // eslint-disable-next-line no-unused-expressions
      emotion.injectGlobal("@keyframes ", keyframesName, "{0%,80%,100%{opacity:0;}40%{opacity:1;}};");
      keyframesInjected = true;
    }

    return React__default.createElement("div", _extends({}, innerProps, {
      className: cx(
      /*#__PURE__*/
      emotion.css(getStyles('loadingIndicator', props)), {
        'indicator': true,
        'loading-indicator': true
      }, className)
    }), React__default.createElement(LoadingDot, {
      color: color,
      delay: 0,
      offset: isRtl
    }), React__default.createElement(LoadingDot, {
      color: color,
      delay: 160,
      offset: true
    }), React__default.createElement(LoadingDot, {
      color: color,
      delay: 320,
      offset: !isRtl
    }));
  };
  LoadingIndicator.defaultProps = {
    size: 4
  };

  var css = function css(_ref) {
    var isDisabled = _ref.isDisabled,
        isFocused = _ref.isFocused,
        _ref$theme = _ref.theme,
        colors = _ref$theme.colors,
        borderRadius = _ref$theme.borderRadius,
        spacing = _ref$theme.spacing;
    return {
      alignItems: 'center',
      backgroundColor: isDisabled ? colors.neutral5 : colors.neutral0,
      borderColor: isDisabled ? colors.neutral10 : isFocused ? colors.primary : colors.neutral20,
      borderRadius: borderRadius,
      borderStyle: 'solid',
      borderWidth: 1,
      boxShadow: isFocused ? "0 0 0 1px ".concat(colors.primary) : null,
      cursor: 'default',
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      minHeight: spacing.controlHeight,
      outline: '0 !important',
      position: 'relative',
      transition: 'all 100ms',
      '&:hover': {
        borderColor: isFocused ? colors.primary : colors.neutral30
      }
    };
  };

  var Control = function Control(props) {
    var children = props.children,
        cx = props.cx,
        getStyles = props.getStyles,
        className = props.className,
        isDisabled = props.isDisabled,
        isFocused = props.isFocused,
        innerRef = props.innerRef,
        innerProps = props.innerProps,
        menuIsOpen = props.menuIsOpen;
    return React__default.createElement("div", _extends({
      ref: innerRef,
      className: cx(
      /*#__PURE__*/
      emotion.css(getStyles('control', props)), {
        'control': true,
        'control--is-disabled': isDisabled,
        'control--is-focused': isFocused,
        'control--menu-is-open': menuIsOpen
      }, className)
    }, innerProps), children);
  };

  var groupCSS = function groupCSS(_ref) {
    var spacing = _ref.theme.spacing;
    return {
      paddingBottom: spacing.baseUnit * 2,
      paddingTop: spacing.baseUnit * 2
    };
  };

  var Group = function Group(props) {
    var children = props.children,
        className = props.className,
        cx = props.cx,
        getStyles = props.getStyles,
        Heading = props.Heading,
        headingProps = props.headingProps,
        label = props.label,
        theme = props.theme,
        selectProps = props.selectProps;
    return React__default.createElement("div", {
      className: cx(
      /*#__PURE__*/
      emotion.css(getStyles('group', props)), {
        'group': true
      }, className)
    }, React__default.createElement(Heading, _extends({}, headingProps, {
      selectProps: selectProps,
      theme: theme,
      getStyles: getStyles,
      cx: cx
    }), label), React__default.createElement("div", null, children));
  };

  var groupHeadingCSS = function groupHeadingCSS(_ref2) {
    var spacing = _ref2.theme.spacing;
    return {
      color: '#999',
      cursor: 'default',
      display: 'block',
      fontSize: '75%',
      fontWeight: '500',
      marginBottom: '0.25em',
      paddingLeft: spacing.baseUnit * 3,
      paddingRight: spacing.baseUnit * 3,
      textTransform: 'uppercase'
    };
  };
  var GroupHeading = function GroupHeading(props) {
    var className = props.className,
        cx = props.cx,
        getStyles = props.getStyles,
        theme = props.theme,
        selectProps = props.selectProps,
        cleanProps = _objectWithoutProperties(props, ["className", "cx", "getStyles", "theme", "selectProps"]);

    return React__default.createElement("div", _extends({
      className: cx(
      /*#__PURE__*/
      emotion.css(getStyles('groupHeading', _objectSpread({
        theme: theme
      }, cleanProps))), {
        'group-heading': true
      }, className)
    }, cleanProps));
  };

  var inputCSS = function inputCSS(_ref) {
    var isDisabled = _ref.isDisabled,
        _ref$theme = _ref.theme,
        spacing = _ref$theme.spacing,
        colors = _ref$theme.colors;
    return {
      margin: spacing.baseUnit / 2,
      paddingBottom: spacing.baseUnit / 2,
      paddingTop: spacing.baseUnit / 2,
      visibility: isDisabled ? 'hidden' : 'visible',
      color: colors.neutral80
    };
  };

  var inputStyle = function inputStyle(isHidden) {
    return {
      background: 0,
      border: 0,
      fontSize: 'inherit',
      opacity: isHidden ? 0 : 1,
      outline: 0,
      padding: 0,
      color: 'inherit'
    };
  };

  var Input = function Input(_ref2) {
    var className = _ref2.className,
        cx = _ref2.cx,
        getStyles = _ref2.getStyles,
        innerRef = _ref2.innerRef,
        isHidden = _ref2.isHidden,
        isDisabled = _ref2.isDisabled,
        theme = _ref2.theme,
        selectProps = _ref2.selectProps,
        props = _objectWithoutProperties(_ref2, ["className", "cx", "getStyles", "innerRef", "isHidden", "isDisabled", "theme", "selectProps"]);

    return React__default.createElement("div", {
      className:
      /*#__PURE__*/

      /*#__PURE__*/
      emotion.css(getStyles('input', _objectSpread({
        theme: theme
      }, props)))
    }, React__default.createElement(AutosizeInput, _extends({
      className: cx(null, {
        'input': true
      }, className),
      inputRef: innerRef,
      inputStyle: inputStyle(isHidden),
      disabled: isDisabled
    }, props)));
  };

  var multiValueCSS = function multiValueCSS(_ref) {
    var _ref$theme = _ref.theme,
        spacing = _ref$theme.spacing,
        borderRadius = _ref$theme.borderRadius,
        colors = _ref$theme.colors;
    return {
      backgroundColor: colors.neutral10,
      borderRadius: borderRadius / 2,
      display: 'flex',
      margin: spacing.baseUnit / 2,
      minWidth: 0 // resolves flex/text-overflow bug

    };
  };
  var multiValueLabelCSS = function multiValueLabelCSS(_ref2) {
    var _ref2$theme = _ref2.theme,
        borderRadius = _ref2$theme.borderRadius,
        colors = _ref2$theme.colors,
        cropWithEllipsis = _ref2.cropWithEllipsis;
    return {
      borderRadius: borderRadius / 2,
      color: colors.neutral80,
      fontSize: '85%',
      overflow: 'hidden',
      padding: 3,
      paddingLeft: 6,
      textOverflow: cropWithEllipsis ? 'ellipsis' : null,
      whiteSpace: 'nowrap'
    };
  };
  var multiValueRemoveCSS = function multiValueRemoveCSS(_ref3) {
    var _ref3$theme = _ref3.theme,
        spacing = _ref3$theme.spacing,
        borderRadius = _ref3$theme.borderRadius,
        colors = _ref3$theme.colors,
        isFocused = _ref3.isFocused;
    return {
      alignItems: 'center',
      borderRadius: borderRadius / 2,
      backgroundColor: isFocused && colors.dangerLight,
      display: 'flex',
      paddingLeft: spacing.baseUnit,
      paddingRight: spacing.baseUnit,
      ':hover': {
        backgroundColor: colors.dangerLight,
        color: colors.danger
      }
    };
  };
  var MultiValueGeneric = function MultiValueGeneric(_ref4) {
    var children = _ref4.children,
        innerProps = _ref4.innerProps;
    return React__default.createElement("div", innerProps, children);
  };
  var MultiValueContainer = MultiValueGeneric;
  var MultiValueLabel = MultiValueGeneric;
  var MultiValueRemove =
  /*#__PURE__*/
  function (_Component) {
    _inherits(MultiValueRemove, _Component);

    function MultiValueRemove() {
      _classCallCheck(this, MultiValueRemove);

      return _possibleConstructorReturn(this, _getPrototypeOf(MultiValueRemove).apply(this, arguments));
    }

    _createClass(MultiValueRemove, [{
      key: "render",
      value: function render() {
        var _this$props = this.props,
            children = _this$props.children,
            innerProps = _this$props.innerProps;
        return React__default.createElement("div", innerProps, children || React__default.createElement(CrossIcon, {
          size: 14
        }));
      }
    }]);

    return MultiValueRemove;
  }(React.Component);

  var MultiValue =
  /*#__PURE__*/
  function (_Component2) {
    _inherits(MultiValue, _Component2);

    function MultiValue() {
      _classCallCheck(this, MultiValue);

      return _possibleConstructorReturn(this, _getPrototypeOf(MultiValue).apply(this, arguments));
    }

    _createClass(MultiValue, [{
      key: "render",
      value: function render() {
        var _this$props2 = this.props,
            children = _this$props2.children,
            className = _this$props2.className,
            components = _this$props2.components,
            cx = _this$props2.cx,
            data = _this$props2.data,
            getStyles = _this$props2.getStyles,
            innerProps = _this$props2.innerProps,
            isDisabled = _this$props2.isDisabled,
            removeProps = _this$props2.removeProps,
            selectProps = _this$props2.selectProps;
        var Container = components.Container,
            Label = components.Label,
            Remove = components.Remove;

        var containerInnerProps = _objectSpread({
          className: cx(
          /*#__PURE__*/
          emotion.css(getStyles('multiValue', this.props)), {
            'multi-value': true,
            'multi-value--is-disabled': isDisabled
          }, className)
        }, innerProps);

        var labelInnerProps = {
          className: cx(
          /*#__PURE__*/
          emotion.css(getStyles('multiValueLabel', this.props)), {
            'multi-value__label': true
          }, className)
        };

        var removeInnerProps = _objectSpread({
          className: cx(
          /*#__PURE__*/
          emotion.css(getStyles('multiValueRemove', this.props)), {
            'multi-value__remove': true
          }, className)
        }, removeProps);

        return React__default.createElement(Container, {
          data: data,
          innerProps: containerInnerProps,
          selectProps: selectProps
        }, React__default.createElement(Label, {
          data: data,
          innerProps: labelInnerProps,
          selectProps: selectProps
        }, children), React__default.createElement(Remove, {
          data: data,
          innerProps: removeInnerProps,
          selectProps: selectProps
        }));
      }
    }]);

    return MultiValue;
  }(React.Component);

  _defineProperty(MultiValue, "defaultProps", {
    cropWithEllipsis: true
  });

  var optionCSS = function optionCSS(_ref) {
    var isDisabled = _ref.isDisabled,
        isFocused = _ref.isFocused,
        isSelected = _ref.isSelected,
        _ref$theme = _ref.theme,
        spacing = _ref$theme.spacing,
        colors = _ref$theme.colors;
    return {
      backgroundColor: isSelected ? colors.primary : isFocused ? colors.primary25 : 'transparent',
      color: isDisabled ? colors.neutral20 : isSelected ? colors.neutral0 : 'inherit',
      cursor: 'default',
      display: 'block',
      fontSize: 'inherit',
      padding: "".concat(spacing.baseUnit * 2, "px ").concat(spacing.baseUnit * 3, "px"),
      width: '100%',
      userSelect: 'none',
      WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)',
      // provide some affordance on touch devices
      ':active': {
        backgroundColor: isSelected ? colors.primary : colors.primary50
      }
    };
  };

  var Option = function Option(props) {
    var children = props.children,
        className = props.className,
        cx = props.cx,
        getStyles = props.getStyles,
        isDisabled = props.isDisabled,
        isFocused = props.isFocused,
        isSelected = props.isSelected,
        innerRef = props.innerRef,
        innerProps = props.innerProps;
    return React__default.createElement("div", _extends({
      ref: innerRef,
      className: cx(
      /*#__PURE__*/
      emotion.css(getStyles('option', props)), {
        'option': true,
        'option--is-disabled': isDisabled,
        'option--is-focused': isFocused,
        'option--is-selected': isSelected
      }, className)
    }, innerProps), children);
  };

  var placeholderCSS = function placeholderCSS(_ref) {
    var _ref$theme = _ref.theme,
        spacing = _ref$theme.spacing,
        colors = _ref$theme.colors;
    return {
      color: colors.neutral50,
      marginLeft: spacing.baseUnit / 2,
      marginRight: spacing.baseUnit / 2,
      position: 'absolute',
      top: '50%',
      transform: 'translateY(-50%)'
    };
  };

  var Placeholder = function Placeholder(props) {
    var children = props.children,
        className = props.className,
        cx = props.cx,
        getStyles = props.getStyles,
        innerProps = props.innerProps;
    return React__default.createElement("div", _extends({
      className: cx(
      /*#__PURE__*/
      emotion.css(getStyles('placeholder', props)), {
        'placeholder': true
      }, className)
    }, innerProps), children);
  };

  var css$1 = function css(_ref) {
    var isDisabled = _ref.isDisabled,
        _ref$theme = _ref.theme,
        spacing = _ref$theme.spacing,
        colors = _ref$theme.colors;
    return {
      color: isDisabled ? colors.neutral40 : colors.neutral80,
      marginLeft: spacing.baseUnit / 2,
      marginRight: spacing.baseUnit / 2,
      maxWidth: "calc(100% - ".concat(spacing.baseUnit * 2, "px)"),
      overflow: 'hidden',
      position: 'absolute',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      top: '50%',
      transform: 'translateY(-50%)'
    };
  };

  var SingleValue = function SingleValue(props) {
    var children = props.children,
        className = props.className,
        cx = props.cx,
        getStyles = props.getStyles,
        isDisabled = props.isDisabled,
        innerProps = props.innerProps;
    return React__default.createElement("div", _extends({
      className: cx(
      /*#__PURE__*/
      emotion.css(getStyles('singleValue', props)), {
        'single-value': true,
        'single-value--is-disabled': isDisabled
      }, className)
    }, innerProps), children);
  };

  var components = {
    ClearIndicator: ClearIndicator,
    Control: Control,
    DropdownIndicator: DropdownIndicator,
    DownChevron: DownChevron,
    CrossIcon: CrossIcon,
    Group: Group,
    GroupHeading: GroupHeading,
    IndicatorsContainer: IndicatorsContainer,
    IndicatorSeparator: IndicatorSeparator,
    Input: Input,
    LoadingIndicator: LoadingIndicator,
    Menu: Menu,
    MenuList: MenuList,
    MenuPortal: MenuPortal,
    LoadingMessage: LoadingMessage,
    NoOptionsMessage: NoOptionsMessage,
    MultiValue: MultiValue,
    MultiValueContainer: MultiValueContainer,
    MultiValueLabel: MultiValueLabel,
    MultiValueRemove: MultiValueRemove,
    Option: Option,
    Placeholder: Placeholder,
    SelectContainer: SelectContainer,
    SingleValue: SingleValue,
    ValueContainer: ValueContainer
  };
  var defaultComponents = function defaultComponents(props) {
    return _objectSpread({}, components, props.components);
  };

  var defaultStyles = {
    clearIndicator: clearIndicatorCSS,
    container: containerCSS,
    control: css,
    dropdownIndicator: dropdownIndicatorCSS,
    group: groupCSS,
    groupHeading: groupHeadingCSS,
    indicatorsContainer: indicatorsContainerCSS,
    indicatorSeparator: indicatorSeparatorCSS,
    input: inputCSS,
    loadingIndicator: loadingIndicatorCSS,
    loadingMessage: loadingMessageCSS,
    menu: menuCSS,
    menuList: menuListCSS,
    menuPortal: menuPortalCSS,
    multiValue: multiValueCSS,
    multiValueLabel: multiValueLabelCSS,
    multiValueRemove: multiValueRemoveCSS,
    noOptionsMessage: noOptionsMessageCSS,
    option: optionCSS,
    placeholder: placeholderCSS,
    singleValue: css$1,
    valueContainer: valueContainerCSS
  }; // Merge Utility
  // Allows consumers to extend a base Select with additional styles

  function mergeStyles(source) {
    var target = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    // initialize with source styles
    var styles = _objectSpread({}, source); // massage in target styles


    Object.keys(target).forEach(function (key) {
      if (source[key]) {
        styles[key] = function (rsCss, props) {
          return target[key](source[key](rsCss, props), props);
        };
      } else {
        styles[key] = target[key];
      }
    });
    return styles;
  }

  var colors = {
    primary: '#2684FF',
    primary75: '#4C9AFF',
    primary50: '#B2D4FF',
    primary25: '#DEEBFF',
    danger: '#DE350B',
    dangerLight: '#FFBDAD',
    neutral0: 'hsl(0, 0%, 100%)',
    neutral5: 'hsl(0, 0%, 95%)',
    neutral10: 'hsl(0, 0%, 90%)',
    neutral20: 'hsl(0, 0%, 80%)',
    neutral30: 'hsl(0, 0%, 70%)',
    neutral40: 'hsl(0, 0%, 60%)',
    neutral50: 'hsl(0, 0%, 50%)',
    neutral60: 'hsl(0, 0%, 40%)',
    neutral70: 'hsl(0, 0%, 30%)',
    neutral80: 'hsl(0, 0%, 20%)',
    neutral90: 'hsl(0, 0%, 10%)'
  };
  var borderRadius = 4;
  var baseUnit = 4;
  /* Used to calculate consistent margin/padding on elements */

  var controlHeight = 38;
  /* The minimum height of the control */

  var menuGutter = baseUnit * 2;
  /* The amount of space between the control and menu */

  var spacing = {
    baseUnit: baseUnit,
    controlHeight: controlHeight,
    menuGutter: menuGutter
  };
  var defaultTheme = {
    borderRadius: borderRadius,
    colors: colors,
    spacing: spacing
  };

  var defaultProps = {
    backspaceRemovesValue: true,
    blurInputOnSelect: isTouchCapable(),
    captureMenuScroll: !isTouchCapable(),
    closeMenuOnSelect: true,
    closeMenuOnScroll: false,
    components: {},
    controlShouldRenderValue: true,
    escapeClearsValue: false,
    filterOption: createFilter(),
    formatGroupLabel: formatGroupLabel,
    getOptionLabel: getOptionLabel,
    getOptionValue: getOptionValue,
    isDisabled: false,
    isLoading: false,
    isMulti: false,
    isRtl: false,
    isSearchable: true,
    isOptionDisabled: isOptionDisabled,
    loadingMessage: function loadingMessage() {
      return 'Loading...';
    },
    maxMenuHeight: 300,
    minMenuHeight: 140,
    menuIsOpen: false,
    menuPlacement: 'bottom',
    menuPosition: 'absolute',
    menuShouldBlockScroll: false,
    menuShouldScrollIntoView: !isMobileDevice(),
    noOptionsMessage: function noOptionsMessage() {
      return 'No options';
    },
    openMenuOnFocus: false,
    openMenuOnClick: true,
    options: [],
    pageSize: 5,
    placeholder: 'Select...',
    screenReaderStatus: function screenReaderStatus(_ref) {
      var count = _ref.count;
      return "".concat(count, " result").concat(count !== 1 ? 's' : '', " available");
    },
    styles: {},
    tabIndex: '0',
    tabSelectsValue: true
  };
  var instanceId = 1;

  var Select =
  /*#__PURE__*/
  function (_Component) {
    _inherits(Select, _Component);

    // Misc. Instance Properties
    // ------------------------------
    // TODO
    // Refs
    // ------------------------------
    // Lifecycle
    // ------------------------------
    function Select(_props) {
      var _this;

      _classCallCheck(this, Select);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(Select).call(this, _props));

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "state", {
        ariaLiveSelection: '',
        ariaLiveContext: '',
        focusedOption: null,
        focusedValue: null,
        inputIsHidden: false,
        isFocused: false,
        isComposing: false,
        menuOptions: {
          render: [],
          focusable: []
        },
        selectValue: []
      });

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "blockOptionHover", false);

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "clearFocusValueOnUpdate", false);

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "commonProps", void 0);

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "components", void 0);

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "hasGroups", false);

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "initialTouchX", 0);

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "initialTouchY", 0);

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "inputIsHiddenAfterUpdate", void 0);

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "instancePrefix", '');

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "openAfterFocus", false);

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "scrollToFocusedOptionOnUpdate", false);

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "userIsDragging", void 0);

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "controlRef", null);

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "getControlRef", function (ref) {
        _this.controlRef = ref;
      });

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "focusedOptionRef", null);

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "getFocusedOptionRef", function (ref) {
        _this.focusedOptionRef = ref;
      });

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "menuListRef", null);

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "getMenuListRef", function (ref) {
        _this.menuListRef = ref;
      });

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "inputRef", null);

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "getInputRef", function (ref) {
        _this.inputRef = ref;
      });

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "cacheComponents", function (components$$1) {
        _this.components = defaultComponents({
          components: components$$1
        });
      });

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "focus", _this.focusInput);

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "blur", _this.blurInput);

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onChange", function (newValue, actionMeta) {
        var _this$props = _this.props,
            onChange = _this$props.onChange,
            name = _this$props.name;
        onChange(newValue, _objectSpread({}, actionMeta, {
          name: name
        }));
      });

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "setValue", function (newValue) {
        var action = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'set-value';
        var option = arguments.length > 2 ? arguments[2] : undefined;
        var _this$props2 = _this.props,
            closeMenuOnSelect = _this$props2.closeMenuOnSelect,
            isMulti = _this$props2.isMulti;

        _this.onInputChange('', {
          action: 'set-value'
        });

        if (closeMenuOnSelect) {
          _this.inputIsHiddenAfterUpdate = !isMulti;

          _this.onMenuClose();
        } // when the select value should change, we should reset focusedValue


        _this.clearFocusValueOnUpdate = true;

        _this.onChange(newValue, {
          action: action,
          option: option
        });
      });

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "selectOption", function (newValue) {
        var _this$props3 = _this.props,
            blurInputOnSelect = _this$props3.blurInputOnSelect,
            isMulti = _this$props3.isMulti;

        if (isMulti) {
          var selectValue = _this.state.selectValue;

          if (_this.isOptionSelected(newValue, selectValue)) {
            var candidate = _this.getOptionValue(newValue);

            _this.setValue(selectValue.filter(function (i) {
              return _this.getOptionValue(i) !== candidate;
            }), 'deselect-option', newValue);

            _this.announceAriaLiveSelection({
              event: 'deselect-option',
              context: {
                value: _this.getOptionLabel(newValue)
              }
            });
          } else {
            _this.setValue([].concat(_toConsumableArray(selectValue), [newValue]), 'select-option', newValue);

            _this.announceAriaLiveSelection({
              event: 'select-option',
              context: {
                value: _this.getOptionLabel(newValue)
              }
            });
          }
        } else {
          _this.setValue(newValue, 'select-option');

          _this.announceAriaLiveSelection({
            event: 'select-option',
            context: {
              value: _this.getOptionLabel(newValue)
            }
          });
        }

        if (blurInputOnSelect) {
          _this.blurInput();
        }
      });

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "removeValue", function (removedValue) {
        var selectValue = _this.state.selectValue;

        var candidate = _this.getOptionValue(removedValue);

        _this.onChange(selectValue.filter(function (i) {
          return _this.getOptionValue(i) !== candidate;
        }), {
          action: 'remove-value',
          removedValue: removedValue
        });

        _this.announceAriaLiveSelection({
          event: 'remove-value',
          context: {
            value: removedValue ? _this.getOptionLabel(removedValue) : ''
          }
        });

        _this.focusInput();
      });

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "clearValue", function () {
        var isMulti = _this.props.isMulti;

        _this.onChange(isMulti ? [] : null, {
          action: 'clear'
        });
      });

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "popValue", function () {
        var selectValue = _this.state.selectValue;
        var lastSelectedValue = selectValue[selectValue.length - 1];

        _this.announceAriaLiveSelection({
          event: 'pop-value',
          context: {
            value: lastSelectedValue ? _this.getOptionLabel(lastSelectedValue) : ''
          }
        });

        _this.onChange(selectValue.slice(0, selectValue.length - 1), {
          action: 'pop-value',
          removedValue: lastSelectedValue
        });
      });

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "getOptionLabel", function (data) {
        return _this.props.getOptionLabel(data);
      });

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "getOptionValue", function (data) {
        return _this.props.getOptionValue(data);
      });

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "getStyles", function (key, props) {
        var base = defaultStyles[key](props);
        base.boxSizing = 'border-box';
        var custom = _this.props.styles[key];
        return custom ? custom(base, props) : base;
      });

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "getElementId", function (element) {
        return "".concat(_this.instancePrefix, "-").concat(element);
      });

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "getActiveDescendentId", function () {
        var menuIsOpen = _this.props.menuIsOpen;
        var _this$state = _this.state,
            menuOptions = _this$state.menuOptions,
            focusedOption = _this$state.focusedOption;
        if (!focusedOption || !menuIsOpen) return undefined;
        var index$$1 = menuOptions.focusable.indexOf(focusedOption);
        var option = menuOptions.render[index$$1];
        return option && option.key;
      });

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "announceAriaLiveSelection", function (_ref2) {
        var event = _ref2.event,
            context = _ref2.context;

        _this.setState({
          ariaLiveSelection: valueEventAriaMessage(event, context)
        });
      });

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "announceAriaLiveContext", function (_ref3) {
        var event = _ref3.event,
            context = _ref3.context;

        _this.setState({
          ariaLiveContext: instructionsAriaMessage(event, _objectSpread({}, context, {
            label: _this.props['aria-label']
          }))
        });
      });

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onMenuMouseDown", function (event) {
        if (event.button !== 0) {
          return;
        }

        event.stopPropagation();
        event.preventDefault();

        _this.focusInput();
      });

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onMenuMouseMove", function (event) {
        _this.blockOptionHover = false;
      });

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onControlMouseDown", function (event) {
        var openMenuOnClick = _this.props.openMenuOnClick;

        if (!_this.state.isFocused) {
          if (openMenuOnClick) {
            _this.openAfterFocus = true;
          }

          _this.focusInput();
        } else if (!_this.props.menuIsOpen) {
          if (openMenuOnClick) {
            _this.openMenu('first');
          }
        } else {
          if (event.currentTarget.tagName !== 'INPUT') {
            _this.onMenuClose();
          }
        }

        if (event.currentTarget.tagName !== 'INPUT') {
          event.preventDefault();
        }
      });

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onDropdownIndicatorMouseDown", function (event) {
        // ignore mouse events that weren't triggered by the primary button
        if (event && event.type === 'mousedown' && event.button !== 0) {
          return;
        }

        if (_this.props.isDisabled) return;
        var _this$props4 = _this.props,
            isMulti = _this$props4.isMulti,
            menuIsOpen = _this$props4.menuIsOpen;

        _this.focusInput();

        if (menuIsOpen) {
          _this.inputIsHiddenAfterUpdate = !isMulti;

          _this.onMenuClose();
        } else {
          _this.openMenu('first');
        }

        event.preventDefault();
        event.stopPropagation();
      });

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onClearIndicatorMouseDown", function (event) {
        // ignore mouse events that weren't triggered by the primary button
        if (event && event.type === 'mousedown' && event.button !== 0) {
          return;
        }

        _this.clearValue();

        event.stopPropagation();
        _this.openAfterFocus = false;
        setTimeout(function () {
          return _this.focusInput();
        });
      });

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onScroll", function (event) {
        if (typeof _this.props.closeMenuOnScroll === 'boolean') {
          if (event.target instanceof HTMLElement && isDocumentElement(event.target)) {
            _this.props.onMenuClose();
          }
        } else if (typeof _this.props.closeMenuOnScroll === 'function') {
          if (_this.props.closeMenuOnScroll(event)) {
            _this.props.onMenuClose();
          }
        }
      });

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onCompositionStart", function () {
        _this.setState({
          isComposing: true
        });
      });

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onCompositionEnd", function () {
        _this.setState({
          isComposing: false
        });
      });

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onTouchStart", function (_ref4) {
        var touches = _ref4.touches;
        var touch = touches.item(0);

        if (!touch) {
          return;
        }

        _this.initialTouchX = touch.clientX;
        _this.initialTouchY = touch.clientY;
        _this.userIsDragging = false;
      });

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onTouchMove", function (_ref5) {
        var touches = _ref5.touches;
        var touch = touches.item(0);

        if (!touch) {
          return;
        }

        var deltaX = Math.abs(touch.clientX - _this.initialTouchX);
        var deltaY = Math.abs(touch.clientY - _this.initialTouchY);
        var moveThreshold = 5;
        _this.userIsDragging = deltaX > moveThreshold || deltaY > moveThreshold;
      });

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onTouchEnd", function (event) {
        if (_this.userIsDragging) return; // close the menu if the user taps outside
        // we're checking on event.target here instead of event.currentTarget, because we want to assert information
        // on events on child elements, not the document (which we've attached this handler to).

        if (_this.controlRef && !_this.controlRef.contains(event.target) && _this.menuListRef && !_this.menuListRef.contains(event.target)) {
          _this.blurInput();
        } // reset move vars


        _this.initialTouchX = 0;
        _this.initialTouchY = 0;
      });

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onControlTouchEnd", function (event) {
        if (_this.userIsDragging) return;

        _this.onControlMouseDown(event);
      });

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onClearIndicatorTouchEnd", function (event) {
        if (_this.userIsDragging) return;

        _this.onClearIndicatorMouseDown(event);
      });

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onDropdownIndicatorTouchEnd", function (event) {
        if (_this.userIsDragging) return;

        _this.onDropdownIndicatorMouseDown(event);
      });

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleInputChange", function (event) {
        var inputValue = event.currentTarget.value;
        _this.inputIsHiddenAfterUpdate = false;

        _this.onInputChange(inputValue, {
          action: 'input-change'
        });

        _this.onMenuOpen();
      });

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onInputFocus", function (event) {
        var _this$props5 = _this.props,
            isSearchable = _this$props5.isSearchable,
            isMulti = _this$props5.isMulti;

        if (_this.props.onFocus) {
          _this.props.onFocus(event);
        }

        _this.inputIsHiddenAfterUpdate = false;

        _this.announceAriaLiveContext({
          event: 'input',
          context: {
            isSearchable: isSearchable,
            isMulti: isMulti
          }
        });

        _this.setState({
          isFocused: true
        });

        if (_this.openAfterFocus || _this.props.openMenuOnFocus) {
          _this.openMenu('first');
        }

        _this.openAfterFocus = false;
      });

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onInputBlur", function (event) {
        if (_this.menuListRef && _this.menuListRef.contains(document.activeElement)) {
          _this.inputRef.focus();

          return;
        }

        if (_this.props.onBlur) {
          _this.props.onBlur(event);
        }

        _this.onInputChange('', {
          action: 'input-blur'
        });

        _this.onMenuClose();

        _this.setState({
          focusedValue: null,
          isFocused: false
        });
      });

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onOptionHover", function (focusedOption) {
        if (_this.blockOptionHover || _this.state.focusedOption === focusedOption) {
          return;
        }

        _this.setState({
          focusedOption: focusedOption
        });
      });

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "shouldHideSelectedOptions", function () {
        var _this$props6 = _this.props,
            hideSelectedOptions = _this$props6.hideSelectedOptions,
            isMulti = _this$props6.isMulti;
        if (hideSelectedOptions === undefined) return isMulti;
        return hideSelectedOptions;
      });

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onKeyDown", function (event) {
        var _this$props7 = _this.props,
            isMulti = _this$props7.isMulti,
            backspaceRemovesValue = _this$props7.backspaceRemovesValue,
            escapeClearsValue = _this$props7.escapeClearsValue,
            inputValue = _this$props7.inputValue,
            isClearable = _this$props7.isClearable,
            isDisabled = _this$props7.isDisabled,
            menuIsOpen = _this$props7.menuIsOpen,
            onKeyDown = _this$props7.onKeyDown,
            tabSelectsValue = _this$props7.tabSelectsValue,
            openMenuOnFocus = _this$props7.openMenuOnFocus;
        var _this$state2 = _this.state,
            isComposing = _this$state2.isComposing,
            focusedOption = _this$state2.focusedOption,
            focusedValue = _this$state2.focusedValue,
            selectValue = _this$state2.selectValue;
        if (isDisabled) return;

        if (typeof onKeyDown === 'function') {
          onKeyDown(event);

          if (event.defaultPrevented) {
            return;
          }
        } // Block option hover events when the user has just pressed a key


        _this.blockOptionHover = true;

        switch (event.key) {
          case 'ArrowLeft':
            if (!isMulti || inputValue) return;

            _this.focusValue('previous');

            break;

          case 'ArrowRight':
            if (!isMulti || inputValue) return;

            _this.focusValue('next');

            break;

          case 'Delete':
          case 'Backspace':
            if (inputValue) return;

            if (focusedValue) {
              _this.removeValue(focusedValue);
            } else {
              if (!backspaceRemovesValue) return;

              if (isMulti) {
                _this.popValue();
              } else if (isClearable) {
                _this.clearValue();
              }
            }

            break;

          case 'Tab':
            if (isComposing) return;

            if (event.shiftKey || !menuIsOpen || !tabSelectsValue || !focusedOption || // don't capture the event if the menu opens on focus and the focused
            // option is already selected; it breaks the flow of navigation
            openMenuOnFocus && _this.isOptionSelected(focusedOption, selectValue)) {
              return;
            }

            _this.selectOption(focusedOption);

            break;

          case 'Enter':
            if (menuIsOpen) {
              if (!focusedOption) return;
              if (isComposing) return;

              _this.selectOption(focusedOption);

              break;
            }

            return;

          case 'Escape':
            if (menuIsOpen) {
              _this.inputIsHiddenAfterUpdate = false;

              _this.onInputChange('', {
                action: 'menu-close'
              });

              _this.onMenuClose();
            } else if (isClearable && escapeClearsValue) {
              _this.clearValue();
            }

            break;

          case ' ':
            // space
            if (inputValue) {
              return;
            }

            if (!menuIsOpen) {
              _this.openMenu('first');

              break;
            }

            if (!focusedOption) return;

            _this.selectOption(focusedOption);

            break;

          case 'ArrowUp':
            if (menuIsOpen) {
              _this.focusOption('up');
            } else {
              _this.openMenu('last');
            }

            break;

          case 'ArrowDown':
            if (menuIsOpen) {
              _this.focusOption('down');
            } else {
              _this.openMenu('first');
            }

            break;

          case 'PageUp':
            if (!menuIsOpen) return;

            _this.focusOption('pageup');

            break;

          case 'PageDown':
            if (!menuIsOpen) return;

            _this.focusOption('pagedown');

            break;

          case 'Home':
            if (!menuIsOpen) return;

            _this.focusOption('first');

            break;

          case 'End':
            if (!menuIsOpen) return;

            _this.focusOption('last');

            break;

          default:
            return;
        }

        event.preventDefault();
      });

      var value = _props.value;
      _this.cacheComponents = index(_this.cacheComponents, exportedEqual).bind(_assertThisInitialized(_assertThisInitialized(_this)));

      _this.cacheComponents(_props.components);

      _this.instancePrefix = 'react-select-' + (_this.props.instanceId || ++instanceId);

      var _selectValue = cleanValue(value);

      var _menuOptions = _this.buildMenuOptions(_props, _selectValue);

      _this.state.menuOptions = _menuOptions;
      _this.state.selectValue = _selectValue;
      return _this;
    }

    _createClass(Select, [{
      key: "componentDidMount",
      value: function componentDidMount() {
        this.startListeningComposition();
        this.startListeningToTouch();

        if (this.props.closeMenuOnScroll && document && document.addEventListener) {
          // Listen to all scroll events, and filter them out inside of 'onScroll'
          document.addEventListener('scroll', this.onScroll, true);
        }

        if (this.props.autoFocus) {
          this.focusInput();
        }
      }
    }, {
      key: "componentWillReceiveProps",
      value: function componentWillReceiveProps(nextProps) {
        var _this$props8 = this.props,
            options = _this$props8.options,
            value = _this$props8.value,
            inputValue = _this$props8.inputValue; // re-cache custom components

        this.cacheComponents(nextProps.components); // rebuild the menu options

        if (nextProps.value !== value || nextProps.options !== options || nextProps.inputValue !== inputValue) {
          var selectValue = cleanValue(nextProps.value);
          var menuOptions = this.buildMenuOptions(nextProps, selectValue);
          var focusedValue = this.getNextFocusedValue(selectValue);
          var focusedOption = this.getNextFocusedOption(menuOptions.focusable);
          this.setState({
            menuOptions: menuOptions,
            selectValue: selectValue,
            focusedOption: focusedOption,
            focusedValue: focusedValue
          });
        } // some updates should toggle the state of the input visibility


        if (this.inputIsHiddenAfterUpdate != null) {
          this.setState({
            inputIsHidden: this.inputIsHiddenAfterUpdate
          });
          delete this.inputIsHiddenAfterUpdate;
        }
      }
    }, {
      key: "componentDidUpdate",
      value: function componentDidUpdate(prevProps) {
        var _this$props9 = this.props,
            isDisabled = _this$props9.isDisabled,
            menuIsOpen = _this$props9.menuIsOpen;
        var isFocused = this.state.isFocused;

        if ( // ensure focus is restored correctly when the control becomes enabled
        isFocused && !isDisabled && prevProps.isDisabled || // ensure focus is on the Input when the menu opens
        isFocused && menuIsOpen && !prevProps.menuIsOpen) {
          this.focusInput();
        } // scroll the focused option into view if necessary


        if (this.menuListRef && this.focusedOptionRef && this.scrollToFocusedOptionOnUpdate) {
          scrollIntoView(this.menuListRef, this.focusedOptionRef);
        }

        this.scrollToFocusedOptionOnUpdate = false;
      }
    }, {
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
        this.stopListeningComposition();
        this.stopListeningToTouch();
        document.removeEventListener('scroll', this.onScroll, true);
      }
    }, {
      key: "onMenuOpen",
      // ==============================
      // Consumer Handlers
      // ==============================
      value: function onMenuOpen() {
        this.props.onMenuOpen();
      }
    }, {
      key: "onMenuClose",
      value: function onMenuClose() {
        var _this$props10 = this.props,
            isSearchable = _this$props10.isSearchable,
            isMulti = _this$props10.isMulti;
        this.announceAriaLiveContext({
          event: 'input',
          context: {
            isSearchable: isSearchable,
            isMulti: isMulti
          }
        });
        this.onInputChange('', {
          action: 'menu-close'
        });
        this.props.onMenuClose();
      }
    }, {
      key: "onInputChange",
      value: function onInputChange(newValue, actionMeta) {
        this.props.onInputChange(newValue, actionMeta);
      } // ==============================
      // Methods
      // ==============================

    }, {
      key: "focusInput",
      value: function focusInput() {
        if (!this.inputRef) return;
        this.inputRef.focus();
      }
    }, {
      key: "blurInput",
      value: function blurInput() {
        if (!this.inputRef) return;
        this.inputRef.blur();
      } // aliased for consumers

    }, {
      key: "openMenu",
      value: function openMenu(focusOption) {
        var _this$state3 = this.state,
            menuOptions = _this$state3.menuOptions,
            selectValue = _this$state3.selectValue,
            isFocused = _this$state3.isFocused;
        var isMulti = this.props.isMulti;
        var openAtIndex = focusOption === 'first' ? 0 : menuOptions.focusable.length - 1;

        if (!isMulti) {
          var selectedIndex = menuOptions.focusable.indexOf(selectValue[0]);

          if (selectedIndex > -1) {
            openAtIndex = selectedIndex;
          }
        } // only scroll if the menu isn't already open


        this.scrollToFocusedOptionOnUpdate = !(isFocused && this.menuListRef);
        this.inputIsHiddenAfterUpdate = false;
        this.onMenuOpen();
        this.setState({
          focusedValue: null,
          focusedOption: menuOptions.focusable[openAtIndex]
        });
        this.announceAriaLiveContext({
          event: 'menu'
        });
      }
    }, {
      key: "focusValue",
      value: function focusValue(direction) {
        var _this$props11 = this.props,
            isMulti = _this$props11.isMulti,
            isSearchable = _this$props11.isSearchable;
        var _this$state4 = this.state,
            selectValue = _this$state4.selectValue,
            focusedValue = _this$state4.focusedValue; // Only multiselects support value focusing

        if (!isMulti) return;
        this.setState({
          focusedOption: null
        });
        var focusedIndex = selectValue.indexOf(focusedValue);

        if (!focusedValue) {
          focusedIndex = -1;
          this.announceAriaLiveContext({
            event: 'value'
          });
        }

        var lastIndex = selectValue.length - 1;
        var nextFocus = -1;
        if (!selectValue.length) return;

        switch (direction) {
          case 'previous':
            if (focusedIndex === 0) {
              // don't cycle from the start to the end
              nextFocus = 0;
            } else if (focusedIndex === -1) {
              // if nothing is focused, focus the last value first
              nextFocus = lastIndex;
            } else {
              nextFocus = focusedIndex - 1;
            }

            break;

          case 'next':
            if (focusedIndex > -1 && focusedIndex < lastIndex) {
              nextFocus = focusedIndex + 1;
            }

            break;
        }

        if (nextFocus === -1) {
          this.announceAriaLiveContext({
            event: 'input',
            context: {
              isSearchable: isSearchable,
              isMulti: isMulti
            }
          });
        }

        this.setState({
          inputIsHidden: nextFocus === -1 ? false : true,
          focusedValue: selectValue[nextFocus]
        });
      }
    }, {
      key: "focusOption",
      value: function focusOption() {
        var direction = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'first';
        var pageSize = this.props.pageSize;
        var _this$state5 = this.state,
            focusedOption = _this$state5.focusedOption,
            menuOptions = _this$state5.menuOptions;
        var options = menuOptions.focusable;
        if (!options.length) return;
        var nextFocus = 0; // handles 'first'

        var focusedIndex = options.indexOf(focusedOption);

        if (!focusedOption) {
          focusedIndex = -1;
          this.announceAriaLiveContext({
            event: 'menu'
          });
        }

        if (direction === 'up') {
          nextFocus = focusedIndex > 0 ? focusedIndex - 1 : options.length - 1;
        } else if (direction === 'down') {
          nextFocus = (focusedIndex + 1) % options.length;
        } else if (direction === 'pageup') {
          nextFocus = focusedIndex - pageSize;
          if (nextFocus < 0) nextFocus = 0;
        } else if (direction === 'pagedown') {
          nextFocus = focusedIndex + pageSize;
          if (nextFocus > options.length - 1) nextFocus = options.length - 1;
        } else if (direction === 'last') {
          nextFocus = options.length - 1;
        }

        this.scrollToFocusedOptionOnUpdate = true;
        this.setState({
          focusedOption: options[nextFocus],
          focusedValue: null
        });
      }
    }, {
      key: "getTheme",
      // ==============================
      // Getters
      // ==============================
      value: function getTheme() {
        // Use the default theme if there are no customizations.
        if (!this.props.theme) {
          return defaultTheme;
        } // If the theme prop is a function, assume the function
        // knows how to merge the passed-in default theme with
        // its own modifications.


        if (typeof this.props.theme === 'function') {
          return this.props.theme(defaultTheme);
        } // Otherwise, if a plain theme object was passed in,
        // overlay it with the default theme.


        return _objectSpread({}, defaultTheme, this.props.theme);
      }
    }, {
      key: "getCommonProps",
      value: function getCommonProps() {
        var clearValue = this.clearValue,
            getStyles = this.getStyles,
            setValue = this.setValue,
            selectOption = this.selectOption,
            props = this.props;
        var classNamePrefix = props.classNamePrefix,
            isMulti = props.isMulti,
            isRtl = props.isRtl,
            options = props.options;
        var selectValue = this.state.selectValue;
        var hasValue = this.hasValue();

        var getValue = function getValue() {
          return selectValue;
        };

        var cx = classNames.bind(null, classNamePrefix);
        return {
          cx: cx,
          clearValue: clearValue,
          getStyles: getStyles,
          getValue: getValue,
          hasValue: hasValue,
          isMulti: isMulti,
          isRtl: isRtl,
          options: options,
          selectOption: selectOption,
          setValue: setValue,
          selectProps: props,
          theme: this.getTheme()
        };
      }
    }, {
      key: "getNextFocusedValue",
      value: function getNextFocusedValue(nextSelectValue) {
        if (this.clearFocusValueOnUpdate) {
          this.clearFocusValueOnUpdate = false;
          return null;
        }

        var _this$state6 = this.state,
            focusedValue = _this$state6.focusedValue,
            lastSelectValue = _this$state6.selectValue;
        var lastFocusedIndex = lastSelectValue.indexOf(focusedValue);

        if (lastFocusedIndex > -1) {
          var nextFocusedIndex = nextSelectValue.indexOf(focusedValue);

          if (nextFocusedIndex > -1) {
            // the focused value is still in the selectValue, return it
            return focusedValue;
          } else if (lastFocusedIndex < nextSelectValue.length) {
            // the focusedValue is not present in the next selectValue array by
            // reference, so return the new value at the same index
            return nextSelectValue[lastFocusedIndex];
          }
        }

        return null;
      }
    }, {
      key: "getNextFocusedOption",
      value: function getNextFocusedOption(options) {
        var lastFocusedOption = this.state.focusedOption;
        return lastFocusedOption && options.indexOf(lastFocusedOption) > -1 ? lastFocusedOption : options[0];
      }
    }, {
      key: "hasValue",
      value: function hasValue() {
        var selectValue = this.state.selectValue;
        return selectValue.length > 0;
      }
    }, {
      key: "hasOptions",
      value: function hasOptions() {
        return !!this.state.menuOptions.render.length;
      }
    }, {
      key: "countOptions",
      value: function countOptions() {
        return this.state.menuOptions.focusable.length;
      }
    }, {
      key: "isClearable",
      value: function isClearable() {
        var _this$props12 = this.props,
            isClearable = _this$props12.isClearable,
            isMulti = _this$props12.isMulti; // single select, by default, IS NOT clearable
        // multi select, by default, IS clearable

        if (isClearable === undefined) return isMulti;
        return isClearable;
      }
    }, {
      key: "isOptionDisabled",
      value: function isOptionDisabled$$1(option, selectValue) {
        return typeof this.props.isOptionDisabled === 'function' ? this.props.isOptionDisabled(option, selectValue) : false;
      }
    }, {
      key: "isOptionSelected",
      value: function isOptionSelected(option, selectValue) {
        var _this2 = this;

        if (selectValue.indexOf(option) > -1) return true;

        if (typeof this.props.isOptionSelected === 'function') {
          return this.props.isOptionSelected(option, selectValue);
        }

        var candidate = this.getOptionValue(option);
        return selectValue.some(function (i) {
          return _this2.getOptionValue(i) === candidate;
        });
      }
    }, {
      key: "filterOption",
      value: function filterOption(option, inputValue) {
        return this.props.filterOption ? this.props.filterOption(option, inputValue) : true;
      }
    }, {
      key: "formatOptionLabel",
      value: function formatOptionLabel(data, context) {
        if (typeof this.props.formatOptionLabel === 'function') {
          var inputValue = this.props.inputValue;
          var selectValue = this.state.selectValue;
          return this.props.formatOptionLabel(data, {
            context: context,
            inputValue: inputValue,
            selectValue: selectValue
          });
        } else {
          return this.getOptionLabel(data);
        }
      }
    }, {
      key: "formatGroupLabel",
      value: function formatGroupLabel$$1(data) {
        return this.props.formatGroupLabel(data);
      } // ==============================
      // Mouse Handlers
      // ==============================

    }, {
      key: "startListeningComposition",
      // ==============================
      // Composition Handlers
      // ==============================
      value: function startListeningComposition() {
        if (document && document.addEventListener) {
          document.addEventListener('compositionstart', this.onCompositionStart, false);
          document.addEventListener('compositionend', this.onCompositionEnd, false);
        }
      }
    }, {
      key: "stopListeningComposition",
      value: function stopListeningComposition() {
        if (document && document.removeEventListener) {
          document.removeEventListener('compositionstart', this.onCompositionStart);
          document.removeEventListener('compositionend', this.onCompositionEnd);
        }
      }
    }, {
      key: "startListeningToTouch",
      // ==============================
      // Touch Handlers
      // ==============================
      value: function startListeningToTouch() {
        if (document && document.addEventListener) {
          document.addEventListener('touchstart', this.onTouchStart, false);
          document.addEventListener('touchmove', this.onTouchMove, false);
          document.addEventListener('touchend', this.onTouchEnd, false);
        }
      }
    }, {
      key: "stopListeningToTouch",
      value: function stopListeningToTouch() {
        if (document && document.removeEventListener) {
          document.removeEventListener('touchstart', this.onTouchStart);
          document.removeEventListener('touchmove', this.onTouchMove);
          document.removeEventListener('touchend', this.onTouchEnd);
        }
      }
    }, {
      key: "buildMenuOptions",
      // ==============================
      // Menu Options
      // ==============================
      value: function buildMenuOptions(props, selectValue) {
        var _this3 = this;

        var _props$inputValue = props.inputValue,
            inputValue = _props$inputValue === void 0 ? '' : _props$inputValue,
            options = props.options;

        var toOption = function toOption(option, id) {
          var isDisabled = _this3.isOptionDisabled(option, selectValue);

          var isSelected = _this3.isOptionSelected(option, selectValue);

          var label = _this3.getOptionLabel(option);

          var value = _this3.getOptionValue(option);

          if (_this3.shouldHideSelectedOptions() && isSelected || !_this3.filterOption({
            label: label,
            value: value,
            data: option
          }, inputValue)) {
            return;
          }

          var onHover = isDisabled ? undefined : function () {
            return _this3.onOptionHover(option);
          };
          var onSelect = isDisabled ? undefined : function () {
            return _this3.selectOption(option);
          };
          var optionId = "".concat(_this3.getElementId('option'), "-").concat(id);
          return {
            innerProps: {
              id: optionId,
              onClick: onSelect,
              onMouseMove: onHover,
              onMouseOver: onHover,
              tabIndex: -1
            },
            data: option,
            isDisabled: isDisabled,
            isSelected: isSelected,
            key: optionId,
            label: label,
            type: 'option',
            value: value
          };
        };

        return options.reduce(function (acc, item, itemIndex) {
          if (item.options) {
            // TODO needs a tidier implementation
            if (!_this3.hasGroups) _this3.hasGroups = true;
            var items = item.options;
            var children = items.map(function (child, i) {
              var option = toOption(child, "".concat(itemIndex, "-").concat(i));
              if (option && !option.isDisabled) acc.focusable.push(child);
              return option;
            }).filter(Boolean);

            if (children.length) {
              var groupId = "".concat(_this3.getElementId('group'), "-").concat(itemIndex);
              acc.render.push({
                type: 'group',
                key: groupId,
                data: item,
                options: children
              });
            }
          } else {
            var option = toOption(item, "".concat(itemIndex));

            if (option) {
              acc.render.push(option);
              if (!option.isDisabled) acc.focusable.push(item);
            }
          }

          return acc;
        }, {
          render: [],
          focusable: []
        });
      } // ==============================
      // Renderers
      // ==============================

    }, {
      key: "constructAriaLiveMessage",
      value: function constructAriaLiveMessage() {
        var _this$state7 = this.state,
            ariaLiveContext = _this$state7.ariaLiveContext,
            selectValue = _this$state7.selectValue,
            focusedValue = _this$state7.focusedValue,
            focusedOption = _this$state7.focusedOption;
        var _this$props13 = this.props,
            options = _this$props13.options,
            menuIsOpen = _this$props13.menuIsOpen,
            inputValue = _this$props13.inputValue,
            screenReaderStatus = _this$props13.screenReaderStatus; // An aria live message representing the currently focused value in the select.

        var focusedValueMsg = focusedValue ? valueFocusAriaMessage({
          focusedValue: focusedValue,
          getOptionLabel: this.getOptionLabel,
          selectValue: selectValue
        }) : ''; // An aria live message representing the currently focused option in the select.

        var focusedOptionMsg = focusedOption && menuIsOpen ? optionFocusAriaMessage({
          focusedOption: focusedOption,
          getOptionLabel: this.getOptionLabel,
          options: options
        }) : ''; // An aria live message representing the set of focusable results and current searchterm/inputvalue.

        var resultsMsg = resultsAriaMessage({
          inputValue: inputValue,
          screenReaderMessage: screenReaderStatus({
            count: this.countOptions()
          })
        });
        return "".concat(focusedValueMsg, " ").concat(focusedOptionMsg, " ").concat(resultsMsg, " ").concat(ariaLiveContext);
      }
    }, {
      key: "renderInput",
      value: function renderInput() {
        var _this$props14 = this.props,
            isDisabled = _this$props14.isDisabled,
            isSearchable = _this$props14.isSearchable,
            inputId = _this$props14.inputId,
            inputValue = _this$props14.inputValue,
            tabIndex = _this$props14.tabIndex;
        var Input = this.components.Input;
        var inputIsHidden = this.state.inputIsHidden;
        var id = inputId || this.getElementId('input');

        if (!isSearchable) {
          // use a dummy input to maintain focus/blur functionality
          return React__default.createElement(DummyInput, {
            id: id,
            innerRef: this.getInputRef,
            onBlur: this.onInputBlur,
            onChange: noop,
            onFocus: this.onInputFocus,
            readOnly: true,
            disabled: isDisabled,
            tabIndex: tabIndex,
            value: ""
          });
        } // aria attributes makes the JSX "noisy", separated for clarity


        var ariaAttributes = {
          'aria-autocomplete': 'list',
          'aria-label': this.props['aria-label'],
          'aria-labelledby': this.props['aria-labelledby']
        };
        var _this$commonProps = this.commonProps,
            cx = _this$commonProps.cx,
            theme = _this$commonProps.theme,
            selectProps = _this$commonProps.selectProps;
        return React__default.createElement(Input, _extends({
          autoCapitalize: "none",
          autoComplete: "off",
          autoCorrect: "off",
          cx: cx,
          getStyles: this.getStyles,
          id: id,
          innerRef: this.getInputRef,
          isDisabled: isDisabled,
          isHidden: inputIsHidden,
          onBlur: this.onInputBlur,
          onChange: this.handleInputChange,
          onFocus: this.onInputFocus,
          selectProps: selectProps,
          spellCheck: "false",
          tabIndex: tabIndex,
          theme: theme,
          type: "text",
          value: inputValue
        }, ariaAttributes));
      }
    }, {
      key: "renderPlaceholderOrValue",
      value: function renderPlaceholderOrValue() {
        var _this4 = this;

        var _this$components = this.components,
            MultiValue = _this$components.MultiValue,
            MultiValueContainer = _this$components.MultiValueContainer,
            MultiValueLabel = _this$components.MultiValueLabel,
            MultiValueRemove = _this$components.MultiValueRemove,
            SingleValue = _this$components.SingleValue,
            Placeholder = _this$components.Placeholder;
        var commonProps = this.commonProps;
        var _this$props15 = this.props,
            controlShouldRenderValue = _this$props15.controlShouldRenderValue,
            isDisabled = _this$props15.isDisabled,
            isMulti = _this$props15.isMulti,
            inputValue = _this$props15.inputValue,
            placeholder = _this$props15.placeholder;
        var _this$state8 = this.state,
            selectValue = _this$state8.selectValue,
            focusedValue = _this$state8.focusedValue,
            isFocused = _this$state8.isFocused;

        if (!this.hasValue() || !controlShouldRenderValue) {
          return inputValue ? null : React__default.createElement(Placeholder, _extends({}, commonProps, {
            key: "placeholder",
            isDisabled: isDisabled,
            isFocused: isFocused
          }), placeholder);
        }

        if (isMulti) {
          var selectValues = selectValue.map(function (opt) {
            var isFocused = opt === focusedValue;
            return React__default.createElement(MultiValue, _extends({}, commonProps, {
              components: {
                Container: MultiValueContainer,
                Label: MultiValueLabel,
                Remove: MultiValueRemove
              },
              isFocused: isFocused,
              isDisabled: isDisabled,
              key: _this4.getOptionValue(opt),
              removeProps: {
                onClick: function onClick() {
                  return _this4.removeValue(opt);
                },
                onTouchEnd: function onTouchEnd() {
                  return _this4.removeValue(opt);
                },
                onMouseDown: function onMouseDown(e) {
                  e.preventDefault();
                  e.stopPropagation();
                }
              },
              data: opt
            }), _this4.formatOptionLabel(opt, 'value'));
          });
          return selectValues;
        }

        if (inputValue) {
          return null;
        }

        var singleValue = selectValue[0];
        return React__default.createElement(SingleValue, _extends({}, commonProps, {
          data: singleValue,
          isDisabled: isDisabled
        }), this.formatOptionLabel(singleValue, 'value'));
      }
    }, {
      key: "renderClearIndicator",
      value: function renderClearIndicator() {
        var ClearIndicator = this.components.ClearIndicator;
        var commonProps = this.commonProps;
        var _this$props16 = this.props,
            isDisabled = _this$props16.isDisabled,
            isLoading = _this$props16.isLoading;
        var isFocused = this.state.isFocused;

        if (!this.isClearable() || !ClearIndicator || isDisabled || !this.hasValue() || isLoading) {
          return null;
        }

        var innerProps = {
          onMouseDown: this.onClearIndicatorMouseDown,
          onTouchEnd: this.onClearIndicatorTouchEnd,
          'aria-hidden': 'true'
        };
        return React__default.createElement(ClearIndicator, _extends({}, commonProps, {
          innerProps: innerProps,
          isFocused: isFocused
        }));
      }
    }, {
      key: "renderLoadingIndicator",
      value: function renderLoadingIndicator() {
        var LoadingIndicator = this.components.LoadingIndicator;
        var commonProps = this.commonProps;
        var _this$props17 = this.props,
            isDisabled = _this$props17.isDisabled,
            isLoading = _this$props17.isLoading;
        var isFocused = this.state.isFocused;
        if (!LoadingIndicator || !isLoading) return null;
        var innerProps = {
          'aria-hidden': 'true'
        };
        return React__default.createElement(LoadingIndicator, _extends({}, commonProps, {
          innerProps: innerProps,
          isDisabled: isDisabled,
          isFocused: isFocused
        }));
      }
    }, {
      key: "renderIndicatorSeparator",
      value: function renderIndicatorSeparator() {
        var _this$components2 = this.components,
            DropdownIndicator = _this$components2.DropdownIndicator,
            IndicatorSeparator = _this$components2.IndicatorSeparator; // separator doesn't make sense without the dropdown indicator

        if (!DropdownIndicator || !IndicatorSeparator) return null;
        var commonProps = this.commonProps;
        var isDisabled = this.props.isDisabled;
        var isFocused = this.state.isFocused;
        return React__default.createElement(IndicatorSeparator, _extends({}, commonProps, {
          isDisabled: isDisabled,
          isFocused: isFocused
        }));
      }
    }, {
      key: "renderDropdownIndicator",
      value: function renderDropdownIndicator() {
        var DropdownIndicator = this.components.DropdownIndicator;
        if (!DropdownIndicator) return null;
        var commonProps = this.commonProps;
        var isDisabled = this.props.isDisabled;
        var isFocused = this.state.isFocused;
        var innerProps = {
          onMouseDown: this.onDropdownIndicatorMouseDown,
          onTouchEnd: this.onDropdownIndicatorTouchEnd,
          'aria-hidden': 'true'
        };
        return React__default.createElement(DropdownIndicator, _extends({}, commonProps, {
          innerProps: innerProps,
          isDisabled: isDisabled,
          isFocused: isFocused
        }));
      }
    }, {
      key: "renderMenu",
      value: function renderMenu() {
        var _this5 = this;

        var _this$components3 = this.components,
            Group = _this$components3.Group,
            GroupHeading = _this$components3.GroupHeading,
            Menu$$1 = _this$components3.Menu,
            MenuList$$1 = _this$components3.MenuList,
            MenuPortal$$1 = _this$components3.MenuPortal,
            LoadingMessage$$1 = _this$components3.LoadingMessage,
            NoOptionsMessage$$1 = _this$components3.NoOptionsMessage,
            Option = _this$components3.Option;
        var commonProps = this.commonProps;
        var _this$state9 = this.state,
            focusedOption = _this$state9.focusedOption,
            menuOptions = _this$state9.menuOptions;
        var _this$props18 = this.props,
            captureMenuScroll = _this$props18.captureMenuScroll,
            inputValue = _this$props18.inputValue,
            isLoading = _this$props18.isLoading,
            loadingMessage = _this$props18.loadingMessage,
            minMenuHeight = _this$props18.minMenuHeight,
            maxMenuHeight = _this$props18.maxMenuHeight,
            menuIsOpen = _this$props18.menuIsOpen,
            menuPlacement = _this$props18.menuPlacement,
            menuPosition = _this$props18.menuPosition,
            menuPortalTarget = _this$props18.menuPortalTarget,
            menuShouldBlockScroll = _this$props18.menuShouldBlockScroll,
            menuShouldScrollIntoView = _this$props18.menuShouldScrollIntoView,
            noOptionsMessage = _this$props18.noOptionsMessage,
            onMenuScrollToTop = _this$props18.onMenuScrollToTop,
            onMenuScrollToBottom = _this$props18.onMenuScrollToBottom;
        if (!menuIsOpen) return null; // TODO: Internal Option Type here

        var render = function render(props) {
          // for performance, the menu options in state aren't changed when the
          // focused option changes so we calculate additional props based on that
          var isFocused = focusedOption === props.data;
          props.innerRef = isFocused ? _this5.getFocusedOptionRef : undefined;
          return React__default.createElement(Option, _extends({}, commonProps, props, {
            isFocused: isFocused
          }), _this5.formatOptionLabel(props.data, 'menu'));
        };

        var menuUI;

        if (this.hasOptions()) {
          menuUI = menuOptions.render.map(function (item) {
            if (item.type === 'group') {
              var type = item.type,
                  group = _objectWithoutProperties(item, ["type"]);

              var headingId = "".concat(item.key, "-heading");
              return React__default.createElement(Group, _extends({}, commonProps, group, {
                Heading: GroupHeading,
                headingProps: {
                  id: headingId
                },
                label: _this5.formatGroupLabel(item.data)
              }), item.options.map(function (option) {
                return render(option);
              }));
            } else if (item.type === 'option') {
              return render(item);
            }
          });
        } else if (isLoading) {
          var message = loadingMessage({
            inputValue: inputValue
          });
          if (message === null) return null;
          menuUI = React__default.createElement(LoadingMessage$$1, commonProps, message);
        } else {
          var _message = noOptionsMessage({
            inputValue: inputValue
          });

          if (_message === null) return null;
          menuUI = React__default.createElement(NoOptionsMessage$$1, commonProps, _message);
        }

        var menuPlacementProps = {
          minMenuHeight: minMenuHeight,
          maxMenuHeight: maxMenuHeight,
          menuPlacement: menuPlacement,
          menuPosition: menuPosition,
          menuShouldScrollIntoView: menuShouldScrollIntoView
        };
        var menuElement = React__default.createElement(MenuPlacer, _extends({}, commonProps, menuPlacementProps), function (_ref6) {
          var ref = _ref6.ref,
              _ref6$placerProps = _ref6.placerProps,
              placement = _ref6$placerProps.placement,
              maxHeight = _ref6$placerProps.maxHeight;
          return React__default.createElement(Menu$$1, _extends({}, commonProps, menuPlacementProps, {
            innerRef: ref,
            innerProps: {
              onMouseDown: _this5.onMenuMouseDown,
              onMouseMove: _this5.onMenuMouseMove
            },
            isLoading: isLoading,
            placement: placement
          }), React__default.createElement(ScrollCaptorSwitch, {
            isEnabled: captureMenuScroll,
            onTopArrive: onMenuScrollToTop,
            onBottomArrive: onMenuScrollToBottom
          }, React__default.createElement(ScrollBlock, {
            isEnabled: menuShouldBlockScroll
          }, React__default.createElement(MenuList$$1, _extends({}, commonProps, {
            innerRef: _this5.getMenuListRef,
            isLoading: isLoading,
            maxHeight: maxHeight
          }), menuUI))));
        }); // positioning behaviour is almost identical for portalled and fixed,
        // so we use the same component. the actual portalling logic is forked
        // within the component based on `menuPosition`

        return menuPortalTarget || menuPosition === 'fixed' ? React__default.createElement(MenuPortal$$1, _extends({}, commonProps, {
          appendTo: menuPortalTarget,
          controlElement: this.controlRef,
          menuPlacement: menuPlacement,
          menuPosition: menuPosition
        }), menuElement) : menuElement;
      }
    }, {
      key: "renderFormField",
      value: function renderFormField() {
        var _this6 = this;

        var _this$props19 = this.props,
            delimiter = _this$props19.delimiter,
            isDisabled = _this$props19.isDisabled,
            isMulti = _this$props19.isMulti,
            name = _this$props19.name;
        var selectValue = this.state.selectValue;
        if (!name || isDisabled) return;

        if (isMulti) {
          if (delimiter) {
            var value = selectValue.map(function (opt) {
              return _this6.getOptionValue(opt);
            }).join(delimiter);
            return React__default.createElement("input", {
              name: name,
              type: "hidden",
              value: value
            });
          } else {
            var input = selectValue.length > 0 ? selectValue.map(function (opt, i) {
              return React__default.createElement("input", {
                key: "i-".concat(i),
                name: name,
                type: "hidden",
                value: _this6.getOptionValue(opt)
              });
            }) : React__default.createElement("input", {
              name: name,
              type: "hidden"
            });
            return React__default.createElement("div", null, input);
          }
        } else {
          var _value = selectValue[0] ? this.getOptionValue(selectValue[0]) : '';

          return React__default.createElement("input", {
            name: name,
            type: "hidden",
            value: _value
          });
        }
      }
    }, {
      key: "renderLiveRegion",
      value: function renderLiveRegion() {
        if (!this.state.isFocused) return null;
        return React__default.createElement(A11yText, {
          "aria-live": "assertive"
        }, React__default.createElement("p", {
          id: "aria-selection-event"
        }, "\xA0", this.state.ariaLiveSelection), React__default.createElement("p", {
          id: "aria-context"
        }, "\xA0", this.constructAriaLiveMessage()));
      }
    }, {
      key: "render",
      value: function render() {
        var _this$components4 = this.components,
            Control = _this$components4.Control,
            IndicatorsContainer = _this$components4.IndicatorsContainer,
            SelectContainer = _this$components4.SelectContainer,
            ValueContainer = _this$components4.ValueContainer;
        var _this$props20 = this.props,
            className = _this$props20.className,
            id = _this$props20.id,
            isDisabled = _this$props20.isDisabled,
            menuIsOpen = _this$props20.menuIsOpen;
        var isFocused = this.state.isFocused;
        var commonProps = this.commonProps = this.getCommonProps();
        return React__default.createElement(SelectContainer, _extends({}, commonProps, {
          className: className,
          innerProps: {
            id: id,
            onKeyDown: this.onKeyDown
          },
          isDisabled: isDisabled,
          isFocused: isFocused
        }), this.renderLiveRegion(), React__default.createElement(Control, _extends({}, commonProps, {
          innerRef: this.getControlRef,
          innerProps: {
            onMouseDown: this.onControlMouseDown,
            onTouchEnd: this.onControlTouchEnd
          },
          isDisabled: isDisabled,
          isFocused: isFocused,
          menuIsOpen: menuIsOpen
        }), React__default.createElement(ValueContainer, _extends({}, commonProps, {
          isDisabled: isDisabled
        }), this.renderPlaceholderOrValue(), this.renderInput()), React__default.createElement(IndicatorsContainer, _extends({}, commonProps, {
          isDisabled: isDisabled
        }), this.renderClearIndicator(), this.renderLoadingIndicator(), this.renderIndicatorSeparator(), this.renderDropdownIndicator())), this.renderMenu(), this.renderFormField());
      }
    }]);

    return Select;
  }(React.Component);

  _defineProperty(Select, "defaultProps", defaultProps);

  var defaultProps$1 = {
    defaultInputValue: '',
    defaultMenuIsOpen: false,
    defaultValue: null
  };

  var manageState = function manageState(SelectComponent) {
    var _class, _temp;

    return _temp = _class =
    /*#__PURE__*/
    function (_Component) {
      _inherits(StateManager, _Component);

      function StateManager() {
        var _getPrototypeOf2;

        var _this;

        _classCallCheck(this, StateManager);

        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(StateManager)).call.apply(_getPrototypeOf2, [this].concat(args)));

        _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "select", void 0);

        _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "state", {
          inputValue: _this.props.inputValue !== undefined ? _this.props.inputValue : _this.props.defaultInputValue,
          menuIsOpen: _this.props.menuIsOpen !== undefined ? _this.props.menuIsOpen : _this.props.defaultMenuIsOpen,
          value: _this.props.value !== undefined ? _this.props.value : _this.props.defaultValue
        });

        _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onChange", function (value, actionMeta) {
          _this.callProp('onChange', value, actionMeta);

          _this.setState({
            value: value
          });
        });

        _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onInputChange", function (value, actionMeta) {
          // TODO: for backwards compatibility, we allow the prop to return a new
          // value, but now inputValue is a controllable prop we probably shouldn't
          var newValue = _this.callProp('onInputChange', value, actionMeta);

          _this.setState({
            inputValue: newValue !== undefined ? newValue : value
          });
        });

        _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onMenuOpen", function () {
          _this.callProp('onMenuOpen');

          _this.setState({
            menuIsOpen: true
          });
        });

        _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onMenuClose", function () {
          _this.callProp('onMenuClose');

          _this.setState({
            menuIsOpen: false
          });
        });

        return _this;
      }

      _createClass(StateManager, [{
        key: "focus",
        value: function focus() {
          this.select.focus();
        }
      }, {
        key: "blur",
        value: function blur() {
          this.select.blur();
        } // FIXME: untyped flow code, return any

      }, {
        key: "getProp",
        value: function getProp(key) {
          return this.props[key] !== undefined ? this.props[key] : this.state[key];
        } // FIXME: untyped flow code, return any

      }, {
        key: "callProp",
        value: function callProp(name) {
          if (typeof this.props[name] === 'function') {
            var _this$props;

            for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
              args[_key2 - 1] = arguments[_key2];
            }

            return (_this$props = this.props)[name].apply(_this$props, args);
          }
        }
      }, {
        key: "render",
        value: function render() {
          var _this2 = this;

          var _this$props2 = this.props,
              defaultInputValue = _this$props2.defaultInputValue,
              defaultMenuIsOpen = _this$props2.defaultMenuIsOpen,
              defaultValue = _this$props2.defaultValue,
              props = _objectWithoutProperties(_this$props2, ["defaultInputValue", "defaultMenuIsOpen", "defaultValue"]);

          return React__default.createElement(SelectComponent, _extends({}, props, {
            ref: function ref(_ref) {
              _this2.select = _ref;
            },
            inputValue: this.getProp('inputValue'),
            menuIsOpen: this.getProp('menuIsOpen'),
            onChange: this.onChange,
            onInputChange: this.onInputChange,
            onMenuClose: this.onMenuClose,
            onMenuOpen: this.onMenuOpen,
            value: this.getProp('value')
          }));
        }
      }]);

      return StateManager;
    }(React.Component), _defineProperty(_class, "defaultProps", defaultProps$1), _temp;
  };

  var defaultProps$2 = {
    cacheOptions: false,
    defaultOptions: false,
    filterOption: null
  };
  var makeAsyncSelect = function makeAsyncSelect(SelectComponent) {
    var _class, _temp;

    return _temp = _class =
    /*#__PURE__*/
    function (_Component) {
      _inherits(Async, _Component);

      function Async(props) {
        var _this;

        _classCallCheck(this, Async);

        _this = _possibleConstructorReturn(this, _getPrototypeOf(Async).call(this));

        _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "select", void 0);

        _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "lastRequest", void 0);

        _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "mounted", false);

        _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "optionsCache", {});

        _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleInputChange", function (newValue, actionMeta) {
          var _this$props = _this.props,
              cacheOptions = _this$props.cacheOptions,
              onInputChange = _this$props.onInputChange; // TODO

          var inputValue = handleInputChange(newValue, actionMeta, onInputChange);

          if (!inputValue) {
            delete _this.lastRequest;

            _this.setState({
              inputValue: '',
              loadedInputValue: '',
              loadedOptions: [],
              isLoading: false,
              passEmptyOptions: false
            });

            return;
          }

          if (cacheOptions && _this.optionsCache[inputValue]) {
            _this.setState({
              inputValue: inputValue,
              loadedInputValue: inputValue,
              loadedOptions: _this.optionsCache[inputValue],
              isLoading: false,
              passEmptyOptions: false
            });
          } else {
            var request = _this.lastRequest = {};

            _this.setState({
              inputValue: inputValue,
              isLoading: true,
              passEmptyOptions: !_this.state.loadedInputValue
            }, function () {
              _this.loadOptions(inputValue, function (options) {
                if (!_this.mounted) return;

                if (options) {
                  _this.optionsCache[inputValue] = options;
                }

                if (request !== _this.lastRequest) return;
                delete _this.lastRequest;

                _this.setState({
                  isLoading: false,
                  loadedInputValue: inputValue,
                  loadedOptions: options || [],
                  passEmptyOptions: false
                });
              });
            });
          }

          return inputValue;
        });

        _this.state = {
          defaultOptions: Array.isArray(props.defaultOptions) ? props.defaultOptions : undefined,
          inputValue: typeof props.inputValue !== 'undefined' ? props.inputValue : '',
          isLoading: props.defaultOptions === true ? true : false,
          loadedOptions: [],
          passEmptyOptions: false
        };
        return _this;
      }

      _createClass(Async, [{
        key: "componentDidMount",
        value: function componentDidMount() {
          var _this2 = this;

          this.mounted = true;
          var defaultOptions = this.props.defaultOptions;
          var inputValue = this.state.inputValue;

          if (defaultOptions === true) {
            this.loadOptions(inputValue, function (options) {
              if (!_this2.mounted) return;
              var isLoading = !!_this2.lastRequest;

              _this2.setState({
                defaultOptions: options || [],
                isLoading: isLoading
              });
            });
          }
        }
      }, {
        key: "componentWillReceiveProps",
        value: function componentWillReceiveProps(nextProps) {
          // if the cacheOptions prop changes, clear the cache
          if (nextProps.cacheOptions !== this.props.cacheOptions) {
            this.optionsCache = {};
          }

          if (nextProps.defaultOptions !== this.props.defaultOptions) {
            this.setState({
              defaultOptions: Array.isArray(nextProps.defaultOptions) ? nextProps.defaultOptions : undefined
            });
          }
        }
      }, {
        key: "componentWillUnmount",
        value: function componentWillUnmount() {
          this.mounted = false;
        }
      }, {
        key: "focus",
        value: function focus() {
          this.select.focus();
        }
      }, {
        key: "blur",
        value: function blur() {
          this.select.blur();
        }
      }, {
        key: "loadOptions",
        value: function loadOptions(inputValue, callback) {
          var loadOptions = this.props.loadOptions;
          if (!loadOptions) return callback();
          var loader = loadOptions(inputValue, callback);

          if (loader && typeof loader.then === 'function') {
            loader.then(callback, function () {
              return callback();
            });
          }
        }
      }, {
        key: "render",
        value: function render() {
          var _this3 = this;

          var _this$props2 = this.props,
              loadOptions = _this$props2.loadOptions,
              props = _objectWithoutProperties(_this$props2, ["loadOptions"]);

          var _this$state = this.state,
              defaultOptions = _this$state.defaultOptions,
              inputValue = _this$state.inputValue,
              isLoading = _this$state.isLoading,
              loadedInputValue = _this$state.loadedInputValue,
              loadedOptions = _this$state.loadedOptions,
              passEmptyOptions = _this$state.passEmptyOptions;
          var options = passEmptyOptions ? [] : inputValue && loadedInputValue ? loadedOptions : defaultOptions || [];
          return React__default.createElement(SelectComponent, _extends({}, props, {
            ref: function ref(_ref) {
              _this3.select = _ref;
            },
            options: options,
            isLoading: isLoading,
            onInputChange: this.handleInputChange
          }));
        }
      }]);

      return Async;
    }(React.Component), _defineProperty(_class, "defaultProps", defaultProps$2), _temp;
  };
  var SelectState = manageState(Select);
  var Async = makeAsyncSelect(SelectState);

  var compareOption = function compareOption() {
    var inputValue = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    var option = arguments.length > 1 ? arguments[1] : undefined;
    var candidate = String(inputValue).toLowerCase();
    var optionValue = String(option.value).toLowerCase();
    var optionLabel = String(option.label).toLowerCase();
    return optionValue === candidate || optionLabel === candidate;
  };

  var builtins = {
    formatCreateLabel: function formatCreateLabel(inputValue) {
      return "Create \"".concat(inputValue, "\"");
    },
    isValidNewOption: function isValidNewOption(inputValue, selectValue, selectOptions) {
      return !(!inputValue || selectValue.some(function (option) {
        return compareOption(inputValue, option);
      }) || selectOptions.some(function (option) {
        return compareOption(inputValue, option);
      }));
    },
    getNewOptionData: function getNewOptionData(inputValue, optionLabel) {
      return {
        label: optionLabel,
        value: inputValue,
        __isNew__: true
      };
    }
  };
  var defaultProps$3 = _objectSpread({
    allowCreateWhileLoading: false,
    createOptionPosition: 'last'
  }, builtins);
  var makeCreatableSelect = function makeCreatableSelect(SelectComponent) {
    var _class, _temp;

    return _temp = _class =
    /*#__PURE__*/
    function (_Component) {
      _inherits(Creatable, _Component);

      function Creatable(props) {
        var _this;

        _classCallCheck(this, Creatable);

        _this = _possibleConstructorReturn(this, _getPrototypeOf(Creatable).call(this, props));

        _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "select", void 0);

        _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onChange", function (newValue, actionMeta) {
          var _this$props = _this.props,
              getNewOptionData = _this$props.getNewOptionData,
              inputValue = _this$props.inputValue,
              isMulti = _this$props.isMulti,
              onChange = _this$props.onChange,
              onCreateOption = _this$props.onCreateOption,
              value = _this$props.value;

          if (actionMeta.action !== 'select-option') {
            return onChange(newValue, actionMeta);
          }

          var newOption = _this.state.newOption;
          var valueArray = Array.isArray(newValue) ? newValue : [newValue];

          if (valueArray[valueArray.length - 1] === newOption) {
            if (onCreateOption) onCreateOption(inputValue);else {
              var newOptionData = getNewOptionData(inputValue, inputValue);
              var newActionMeta = {
                action: 'create-option'
              };

              if (isMulti) {
                onChange([].concat(_toConsumableArray(cleanValue(value)), [newOptionData]), newActionMeta);
              } else {
                onChange(newOptionData, newActionMeta);
              }
            }
            return;
          }

          onChange(newValue, actionMeta);
        });

        var options = props.options || [];
        _this.state = {
          newOption: undefined,
          options: options
        };
        return _this;
      }

      _createClass(Creatable, [{
        key: "componentWillReceiveProps",
        value: function componentWillReceiveProps(nextProps) {
          var allowCreateWhileLoading = nextProps.allowCreateWhileLoading,
              createOptionPosition = nextProps.createOptionPosition,
              formatCreateLabel = nextProps.formatCreateLabel,
              getNewOptionData = nextProps.getNewOptionData,
              inputValue = nextProps.inputValue,
              isLoading = nextProps.isLoading,
              isValidNewOption = nextProps.isValidNewOption,
              value = nextProps.value;
          var options = nextProps.options || [];
          var newOption = this.state.newOption;

          if (isValidNewOption(inputValue, cleanValue(value), options)) {
            newOption = getNewOptionData(inputValue, formatCreateLabel(inputValue));
          } else {
            newOption = undefined;
          }

          this.setState({
            newOption: newOption,
            options: (allowCreateWhileLoading || !isLoading) && newOption ? createOptionPosition === 'first' ? [newOption].concat(_toConsumableArray(options)) : [].concat(_toConsumableArray(options), [newOption]) : options
          });
        }
      }, {
        key: "focus",
        value: function focus() {
          this.select.focus();
        }
      }, {
        key: "blur",
        value: function blur() {
          this.select.blur();
        }
      }, {
        key: "render",
        value: function render() {
          var _this2 = this;

          var props = _extends({}, this.props);

          var options = this.state.options;
          return React__default.createElement(SelectComponent, _extends({}, props, {
            ref: function ref(_ref) {
              _this2.select = _ref;
            },
            options: options,
            onChange: this.onChange
          }));
        }
      }]);

      return Creatable;
    }(React.Component), _defineProperty(_class, "defaultProps", defaultProps$3), _temp;
  }; // TODO: do this in package entrypoint

  var SelectCreatable = makeCreatableSelect(Select);
  var Creatable = manageState(SelectCreatable);

  var SelectCreatable$1 = makeCreatableSelect(Select);
  var SelectCreatableState = manageState(SelectCreatable$1);
  var AsyncCreatable = makeAsyncSelect(SelectCreatableState);

  // This file exists as an entry point for bundling our umd builds.
  var Select$1 = manageState(Select);
  Select$1.Async = Async;
  Select$1.AsyncCreatable = AsyncCreatable;
  Select$1.Creatable = Creatable;
  Select$1.SelectBase = Select;
  Select$1.createFilter = createFilter;
  Select$1.components = components;
  Select$1.mergeStyles = mergeStyles;
  Select$1.defaultTheme = defaultTheme;

  return Select$1;

}));
