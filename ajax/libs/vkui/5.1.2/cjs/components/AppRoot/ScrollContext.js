"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useScrollLockEffect = exports.useScrollLock = exports.useScroll = exports.ScrollContext = exports.GlobalScrollController = exports.ElementScrollController = void 0;
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var React = _interopRequireWildcard(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var _useIsomorphicLayoutEffect = require("../../lib/useIsomorphicLayoutEffect");
var _math = require("../../helpers/math");
var _dom = require("../../lib/dom");
var clearDisableScrollStyle = function clearDisableScrollStyle(node) {
  Object.assign(node.style, {
    position: '',
    top: '',
    left: '',
    right: '',
    overflowY: '',
    overflowX: ''
  });
};
var getPageYOffsetWithoutKeyboardHeight = function getPageYOffsetWithoutKeyboardHeight(window) {
  // Note: здесь расчёт на то, что `clientHeight` равен `window.innerHeight`.
  //  Это достигается тем, что тегу `html` задали`height: 100%` и у него нет отступов сверху и снизу. Если есть отступы,
  //  то надо задать `box-sizing: border-box`, чтобы они не учитывались.
  var diffOfClientHeightAndViewportHeight = window.document.documentElement.clientHeight - window.innerHeight;
  return window.pageYOffset - diffOfClientHeightAndViewportHeight;
};
var ScrollContext = /*#__PURE__*/React.createContext({
  getScroll: function getScroll() {
    return {
      x: 0,
      y: 0
    };
  },
  scrollTo: _vkjs.noop,
  isScrollLock: false,
  enableScrollLock: _vkjs.noop,
  disableScrollLock: _vkjs.noop
});
exports.ScrollContext = ScrollContext;
var useScroll = function useScroll() {
  return React.useContext(ScrollContext);
};
exports.useScroll = useScroll;
var GlobalScrollController = function GlobalScrollController(_ref) {
  var children = _ref.children;
  var _useDOM = (0, _dom.useDOM)(),
    window = _useDOM.window,
    document = _useDOM.document;
  var _React$useState = React.useState(false),
    _React$useState2 = (0, _slicedToArray2.default)(_React$useState, 2),
    isScrollLock = _React$useState2[0],
    setScrollLock = _React$useState2[1];
  var beforeScrollLockFnSetRef = React.useRef(new Set());
  var getScroll = React.useCallback(function () {
    return {
      x: window.pageXOffset,
      y: getPageYOffsetWithoutKeyboardHeight(window)
    };
  }, [window]);
  var scrollTo = React.useCallback(function () {
    var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    // Some iOS versions do not normalize scroll — do it manually.
    window.scrollTo(x ? (0, _math.clamp)(x, 0, document.body.scrollWidth - window.innerWidth) : 0, y ? (0, _math.clamp)(y, 0, document.body.scrollHeight - window.innerHeight) : 0);
  }, [document, window]);
  var enableScrollLock = React.useCallback(function () {
    beforeScrollLockFnSetRef.current.forEach(function (fn) {
      fn();
    });
    var scrollY = window.pageYOffset;
    var scrollX = window.pageXOffset;
    var overflowY = window.innerWidth > document.documentElement.clientWidth ? 'scroll' : '';
    var overflowX = window.innerHeight > document.documentElement.clientHeight ? 'scroll' : '';
    Object.assign(document.body.style, {
      position: 'fixed',
      top: "-".concat(scrollY, "px"),
      left: "-".concat(scrollX, "px"),
      right: '0',
      overflowY: overflowY,
      overflowX: overflowX
    });
    setScrollLock(true);
  }, [document, window]);
  var disableScrollLock = React.useCallback(function () {
    var scrollY = document.body.style.top;
    var scrollX = document.body.style.left;
    clearDisableScrollStyle(document.body);
    window.scrollTo(-parseInt(scrollX || '0'), -parseInt(scrollY || '0'));
    setScrollLock(false);
  }, [document, window]);
  var scrollController = React.useMemo(function () {
    return {
      getScroll: getScroll,
      scrollTo: scrollTo,
      isScrollLock: isScrollLock,
      disableScrollLock: disableScrollLock,
      enableScrollLock: enableScrollLock,
      beforeScrollLockFnSetRef: beforeScrollLockFnSetRef
    };
  }, [getScroll, scrollTo, isScrollLock, disableScrollLock, enableScrollLock]);
  return /*#__PURE__*/React.createElement(ScrollContext.Provider, {
    value: scrollController
  }, children);
};
exports.GlobalScrollController = GlobalScrollController;
var ElementScrollController = function ElementScrollController(_ref2) {
  var elRef = _ref2.elRef,
    children = _ref2.children;
  var _React$useState3 = React.useState(false),
    _React$useState4 = (0, _slicedToArray2.default)(_React$useState3, 2),
    isScrollLock = _React$useState4[0],
    setScrollLock = _React$useState4[1];
  var beforeScrollLockFnSetRef = React.useRef(new Set());
  var getScroll = React.useCallback(function () {
    var _elRef$current$scroll, _elRef$current, _elRef$current$scroll2, _elRef$current2;
    return {
      x: (_elRef$current$scroll = (_elRef$current = elRef.current) === null || _elRef$current === void 0 ? void 0 : _elRef$current.scrollLeft) !== null && _elRef$current$scroll !== void 0 ? _elRef$current$scroll : 0,
      y: (_elRef$current$scroll2 = (_elRef$current2 = elRef.current) === null || _elRef$current2 === void 0 ? void 0 : _elRef$current2.scrollTop) !== null && _elRef$current$scroll2 !== void 0 ? _elRef$current$scroll2 : 0
    };
  }, [elRef]);
  var scrollTo = React.useCallback(function () {
    var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var el = elRef.current;
    // Some iOS versions do not normalize scroll — do it manually.
    el === null || el === void 0 ? void 0 : el.scrollTo(x ? (0, _math.clamp)(x, 0, el.scrollWidth - el.clientWidth) : 0, y ? (0, _math.clamp)(y, 0, el.scrollHeight - el.clientHeight) : 0);
  }, [elRef]);
  var enableScrollLock = React.useCallback(function () {
    var el = elRef.current;
    if (!el) {
      return;
    }
    beforeScrollLockFnSetRef.current.forEach(function (fn) {
      fn();
    });
    var scrollY = el.scrollTop;
    var scrollX = el.scrollLeft;
    var overflowY = el.scrollWidth > el.clientWidth ? 'scroll' : '';
    var overflowX = el.scrollHeight > el.clientHeight ? 'scroll' : '';
    Object.assign(el.style, {
      position: 'absolute',
      top: "-".concat(scrollY, "px"),
      left: "-".concat(scrollX, "px"),
      right: '0',
      overflowY: overflowY,
      overflowX: overflowX
    });
    setScrollLock(true);
  }, [elRef]);
  var disableScrollLock = React.useCallback(function () {
    var el = elRef.current;
    if (!el) {
      return;
    }
    var scrollY = el.style.top;
    var scrollX = el.style.left;
    clearDisableScrollStyle(el);
    el.scrollTo(-parseInt(scrollX || '0'), -parseInt(scrollY || '0'));
    setScrollLock(false);
  }, [elRef]);
  var scrollController = React.useMemo(function () {
    return {
      getScroll: getScroll,
      scrollTo: scrollTo,
      isScrollLock: isScrollLock,
      disableScrollLock: disableScrollLock,
      enableScrollLock: enableScrollLock,
      beforeScrollLockFnSetRef: beforeScrollLockFnSetRef
    };
  }, [getScroll, scrollTo, isScrollLock, disableScrollLock, enableScrollLock]);
  return /*#__PURE__*/React.createElement(ScrollContext.Provider, {
    value: scrollController
  }, children);
};

/**
 * Вызывает функцию effect, до блокировки прокрутки
 * @param effect функция, которая может возвращать функцию очистки
 * @param deps effect обновится только при изменении значений в списке.
 */
exports.ElementScrollController = ElementScrollController;
var useScrollLockEffect = function useScrollLockEffect(effect, deps) {
  var destructorRef = React.useRef(_vkjs.noop);
  var _useScroll = useScroll(),
    isScrollLock = _useScroll.isScrollLock,
    beforeScrollLockFnSetRef = _useScroll.beforeScrollLockFnSetRef;

  // Изменяем effectCallback только при изменении deps
  var effectCallback = React.useCallback(function () {
    destructorRef.current = effect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  // Добавляем effectCallback в список функций, которые необходимо вызвать
  // до блокировки
  React.useEffect(function () {
    var beforeSet = beforeScrollLockFnSetRef === null || beforeScrollLockFnSetRef === void 0 ? void 0 : beforeScrollLockFnSetRef.current;
    if (!beforeSet) {
      return _vkjs.noop;
    }
    beforeSet.add(effectCallback);
    return function () {
      beforeSet.delete(effectCallback);
    };
  }, [beforeScrollLockFnSetRef, effectCallback]);

  // Вызываем сбрасывающую функцию, после отключения блокировки
  React.useEffect(function () {
    if (!isScrollLock && destructorRef.current) {
      destructorRef.current();
    }
  }, [isScrollLock]);
};
exports.useScrollLockEffect = useScrollLockEffect;
var useScrollLock = function useScrollLock() {
  var enabled = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
  var _useScroll2 = useScroll(),
    enableScrollLock = _useScroll2.enableScrollLock,
    disableScrollLock = _useScroll2.disableScrollLock;
  (0, _useIsomorphicLayoutEffect.useIsomorphicLayoutEffect)(function () {
    if (enabled) {
      enableScrollLock();
      return disableScrollLock;
    }
    return _vkjs.noop;
  }, [enableScrollLock, disableScrollLock, enabled]);
};
exports.useScrollLock = useScrollLock;
//# sourceMappingURL=ScrollContext.js.map