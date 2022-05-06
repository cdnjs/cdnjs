"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useScrollLock = exports.useScroll = exports.globalScrollController = exports.elementScrollController = exports.ScrollContext = void 0;

var React = _interopRequireWildcard(require("react"));

var _utils = require("../../lib/utils");

var _useIsomorphicLayoutEffect = require("../../lib/useIsomorphicLayoutEffect");

var _math = require("../../helpers/math");

var clearDisableScrollStyle = function clearDisableScrollStyle(node) {
  Object.assign(node.style, {
    position: "",
    top: "",
    left: "",
    right: "",
    overflowY: "",
    overflowX: ""
  });
};

var ScrollContext = /*#__PURE__*/React.createContext({
  getScroll: function getScroll() {
    return {
      x: 0,
      y: 0
    };
  },
  scrollTo: _utils.noop,
  enableScrollLock: _utils.noop,
  disableScrollLock: _utils.noop
});
exports.ScrollContext = ScrollContext;

var useScroll = function useScroll() {
  return React.useContext(ScrollContext);
};

exports.useScroll = useScroll;

var globalScrollController = function globalScrollController(window, document) {
  return {
    getScroll: function getScroll() {
      return {
        x: window.pageXOffset,
        y: window.pageYOffset
      };
    },
    scrollTo: function scrollTo() {
      var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      // Some iOS versions do not normalize scroll — do it manually.
      window.scrollTo(x ? (0, _math.clamp)(x, 0, document.body.scrollWidth - window.innerWidth) : 0, y ? (0, _math.clamp)(y, 0, document.body.scrollHeight - window.innerHeight) : 0);
    },
    enableScrollLock: function enableScrollLock() {
      var scrollY = window.pageYOffset;
      var scrollX = window.pageXOffset;
      var overflowY = window.innerWidth > document.documentElement.clientWidth ? "scroll" : "";
      var overflowX = window.innerHeight > document.documentElement.clientHeight ? "scroll" : "";
      Object.assign(document.body.style, {
        position: "fixed",
        top: "-".concat(scrollY, "px"),
        left: "-".concat(scrollX, "px"),
        right: "0",
        overflowY: overflowY,
        overflowX: overflowX
      });
    },
    disableScrollLock: function disableScrollLock() {
      var scrollY = document.body.style.top;
      var scrollX = document.body.style.left;
      clearDisableScrollStyle(document.body);
      window.scrollTo(-parseInt(scrollX || "0"), -parseInt(scrollY || "0"));
    }
  };
};

exports.globalScrollController = globalScrollController;

var elementScrollController = function elementScrollController(elRef) {
  return {
    getScroll: function getScroll() {
      var _elRef$current$scroll, _elRef$current, _elRef$current$scroll2, _elRef$current2;

      return {
        x: (_elRef$current$scroll = (_elRef$current = elRef.current) === null || _elRef$current === void 0 ? void 0 : _elRef$current.scrollLeft) !== null && _elRef$current$scroll !== void 0 ? _elRef$current$scroll : 0,
        y: (_elRef$current$scroll2 = (_elRef$current2 = elRef.current) === null || _elRef$current2 === void 0 ? void 0 : _elRef$current2.scrollTop) !== null && _elRef$current$scroll2 !== void 0 ? _elRef$current$scroll2 : 0
      };
    },
    scrollTo: function scrollTo() {
      var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      var el = elRef.current; // Some iOS versions do not normalize scroll — do it manually.

      el === null || el === void 0 ? void 0 : el.scrollTo(x ? (0, _math.clamp)(x, 0, el.scrollWidth - el.clientWidth) : 0, y ? (0, _math.clamp)(y, 0, el.scrollHeight - el.clientHeight) : 0);
    },
    enableScrollLock: function enableScrollLock() {
      var el = elRef.current;

      if (!el) {
        return;
      }

      var scrollY = el.scrollTop;
      var scrollX = el.scrollLeft;
      var overflowY = el.scrollWidth > el.clientWidth ? "scroll" : "";
      var overflowX = el.scrollHeight > el.clientHeight ? "scroll" : "";
      Object.assign(el.style, {
        position: "absolute",
        top: "-".concat(scrollY, "px"),
        left: "-".concat(scrollX, "px"),
        right: "0",
        overflowY: overflowY,
        overflowX: overflowX
      });
    },
    disableScrollLock: function disableScrollLock() {
      var el = elRef.current;

      if (!el) {
        return;
      }

      var scrollY = el.style.top;
      var scrollX = el.style.left;
      clearDisableScrollStyle(el);
      el.scrollTo(-parseInt(scrollX || "0"), -parseInt(scrollY || "0"));
    }
  };
};

exports.elementScrollController = elementScrollController;

var useScrollLock = function useScrollLock() {
  var enabled = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

  var _useScroll = useScroll(),
      enableScrollLock = _useScroll.enableScrollLock,
      disableScrollLock = _useScroll.disableScrollLock;

  (0, _useIsomorphicLayoutEffect.useIsomorphicLayoutEffect)(function () {
    if (enabled) {
      enableScrollLock();
      return disableScrollLock;
    }

    return _utils.noop;
  }, [enableScrollLock, disableScrollLock, enabled]);
};

exports.useScrollLock = useScrollLock;
//# sourceMappingURL=ScrollContext.js.map