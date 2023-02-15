"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PopoutWrapper = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var React = _interopRequireWildcard(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var _platform = require("../../lib/platform");
var _useTimeout = require("../../hooks/useTimeout");
var _usePlatform = require("../../hooks/usePlatform");
var _useGlobalEventListener = require("../../hooks/useGlobalEventListener");
var _dom = require("../../lib/dom");
var _excluded = ["alignY", "alignX", "closing", "hasMask", "fixed", "children", "onClick", "className"];
/**
 * @see https://vkcom.github.io/VKUI/#/PopoutWrapper
 */
var PopoutWrapper = function PopoutWrapper(_ref) {
  var _ref$alignY = _ref.alignY,
    alignY = _ref$alignY === void 0 ? 'center' : _ref$alignY,
    _ref$alignX = _ref.alignX,
    alignX = _ref$alignX === void 0 ? 'center' : _ref$alignX,
    _ref$closing = _ref.closing,
    closing = _ref$closing === void 0 ? false : _ref$closing,
    _ref$hasMask = _ref.hasMask,
    hasMask = _ref$hasMask === void 0 ? true : _ref$hasMask,
    _ref$fixed = _ref.fixed,
    fixed = _ref$fixed === void 0 ? true : _ref$fixed,
    children = _ref.children,
    onClick = _ref.onClick,
    className = _ref.className,
    restProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  var platform = (0, _usePlatform.usePlatform)();
  var _React$useState = React.useState(!hasMask),
    _React$useState2 = (0, _slicedToArray2.default)(_React$useState, 2),
    opened = _React$useState2[0],
    setOpened = _React$useState2[1];
  var elRef = React.useRef(null);
  var onFadeInEnd = function onFadeInEnd(e) {
    if (!e || e.animationName === 'vkui-animation-full-fade-in') {
      setOpened(true);
    }
  };
  var animationFinishFallback = (0, _useTimeout.useTimeout)(onFadeInEnd, platform === _platform.Platform.IOS ? 300 : 200);
  React.useEffect(function () {
    !opened && animationFinishFallback.set();
  }, [animationFinishFallback, opened]);
  var _useDOM = (0, _dom.useDOM)(),
    window = _useDOM.window;
  (0, _useGlobalEventListener.useGlobalEventListener)(window, 'touchmove', function (e) {
    return e.preventDefault();
  }, {
    passive: false
  });
  return /*#__PURE__*/React.createElement("div", (0, _extends2.default)({}, restProps, {
    className: (0, _vkjs.classNames)("vkuiPopoutWrapper", styles["PopoutWrapper--alignY-".concat(alignY)], styles["PopoutWrapper--alignX-".concat(alignX)], closing && "vkuiPopoutWrapper--closing", opened && "vkuiPopoutWrapper--opened", fixed && "vkuiPopoutWrapper--fixed", hasMask && "vkuiPopoutWrapper--masked", className),
    onAnimationEnd: opened ? undefined : onFadeInEnd,
    ref: elRef
  }), /*#__PURE__*/React.createElement("div", {
    className: "vkuiPopoutWrapper__container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "vkuiPopoutWrapper__overlay",
    onClick: onClick
  }), /*#__PURE__*/React.createElement("div", {
    className: "vkuiPopoutWrapper__content"
  }, children)));
};
exports.PopoutWrapper = PopoutWrapper;
var styles = {
  "PopoutWrapper--alignY-center": "vkuiPopoutWrapper--alignY-center",
  "PopoutWrapper--alignY-bottom": "vkuiPopoutWrapper--alignY-bottom",
  "PopoutWrapper--alignY-top": "vkuiPopoutWrapper--alignY-top",
  "PopoutWrapper--alignX-center": "vkuiPopoutWrapper--alignX-center",
  "PopoutWrapper--alignX-left": "vkuiPopoutWrapper--alignX-left",
  "PopoutWrapper--alignX-right": "vkuiPopoutWrapper--alignX-right"
};
//# sourceMappingURL=PopoutWrapper.js.map