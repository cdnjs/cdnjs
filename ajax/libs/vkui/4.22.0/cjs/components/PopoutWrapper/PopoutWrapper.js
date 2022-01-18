"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PopoutWrapper = void 0;

var _jsxRuntime = require("../../lib/jsxRuntime");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var React = _interopRequireWildcard(require("react"));

var _getClassName = require("../../helpers/getClassName");

var _classNames = require("../../lib/classNames");

var _platform = require("../../lib/platform");

var _useTimeout = require("../../hooks/useTimeout");

var _usePlatform = require("../../hooks/usePlatform");

var _useGlobalEventListener = require("../../hooks/useGlobalEventListener");

var _dom = require("../../lib/dom");

var _excluded = ["alignY", "alignX", "closing", "hasMask", "fixed", "children", "onClick"];

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
      restProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  var platform = (0, _usePlatform.usePlatform)();

  var _React$useState = React.useState(!hasMask),
      _React$useState2 = (0, _slicedToArray2.default)(_React$useState, 2),
      opened = _React$useState2[0],
      setOpened = _React$useState2[1];

  var elRef = React.useRef();

  var onFadeInEnd = function onFadeInEnd(e) {
    if (!e || e.animationName === 'vkui-animation-full-fade-in') {
      setOpened(true);
    }
  };

  var animationFinishFallback = (0, _useTimeout.useTimeout)(onFadeInEnd, platform === _platform.IOS ? 300 : 200);
  React.useEffect(function () {
    !opened && animationFinishFallback.set();
  }, []);

  var _useDOM = (0, _dom.useDOM)(),
      window = _useDOM.window;

  (0, _useGlobalEventListener.useGlobalEventListener)(window, 'touchmove', function (e) {
    return e.preventDefault();
  }, {
    passive: false
  });
  var baseClassNames = (0, _getClassName.getClassName)('PopoutWrapper', platform);
  return (0, _jsxRuntime.createScopedElement)("div", (0, _extends2.default)({}, restProps, {
    vkuiClass: (0, _classNames.classNames)(baseClassNames, "PopoutWrapper--v-".concat(alignY), "PopoutWrapper--h-".concat(alignX), {
      'PopoutWrapper--closing': closing,
      'PopoutWrapper--opened': opened,
      'PopoutWrapper--fixed': fixed,
      'PopoutWrapper--masked': hasMask
    }),
    onAnimationEnd: opened ? null : onFadeInEnd,
    ref: elRef
  }), (0, _jsxRuntime.createScopedElement)("div", {
    vkuiClass: "PopoutWrapper__container"
  }, (0, _jsxRuntime.createScopedElement)("div", {
    vkuiClass: "PopoutWrapper__overlay",
    onClick: onClick
  }), (0, _jsxRuntime.createScopedElement)("div", {
    vkuiClass: "PopoutWrapper__content"
  }, children)));
};

exports.PopoutWrapper = PopoutWrapper;
//# sourceMappingURL=PopoutWrapper.js.map