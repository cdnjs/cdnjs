"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PanelHeaderContext = void 0;

var _jsxRuntime = require("../../lib/jsxRuntime");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var React = _interopRequireWildcard(require("react"));

var _FixedLayout = _interopRequireDefault(require("../FixedLayout/FixedLayout"));

var _classNames = require("../../lib/classNames");

var _getClassName = require("../../helpers/getClassName");

var _AdaptivityContext = require("../AdaptivityProvider/AdaptivityContext");

var _useAdaptivity2 = require("../../hooks/useAdaptivity");

var _dom = require("../../lib/dom");

var _useIsomorphicLayoutEffect = require("../../lib/useIsomorphicLayoutEffect");

var _useGlobalEventListener = require("../../hooks/useGlobalEventListener");

var _useTimeout = require("../../hooks/useTimeout");

var _usePlatform = require("../../hooks/usePlatform");

var _excluded = ["children", "onClose", "opened"];

var PanelHeaderContext = function PanelHeaderContext(_ref) {
  var children = _ref.children,
      onClose = _ref.onClose,
      _ref$opened = _ref.opened,
      opened = _ref$opened === void 0 ? false : _ref$opened,
      restProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);

  var _useDOM = (0, _dom.useDOM)(),
      document = _useDOM.document;

  var platform = (0, _usePlatform.usePlatform)();

  var _React$useState = React.useState(opened),
      _React$useState2 = (0, _slicedToArray2.default)(_React$useState, 2),
      visible = _React$useState2[0],
      setVisible = _React$useState2[1];

  var closing = visible && !opened;

  var _useAdaptivity = (0, _useAdaptivity2.useAdaptivity)(),
      viewWidth = _useAdaptivity.viewWidth;

  var isDesktop = viewWidth >= _AdaptivityContext.ViewWidth.SMALL_TABLET;
  var elementRef = React.useRef(null);
  (0, _useIsomorphicLayoutEffect.useIsomorphicLayoutEffect)(function () {
    opened && setVisible(true);
  }, [opened]); // start closing on outer click

  (0, _useGlobalEventListener.useGlobalEventListener)(document, "click", isDesktop && opened && !closing && function (event) {
    if (elementRef.current && !elementRef.current.contains(event.target)) {
      onClose();
    }
  }); // fallback onAnimationEnd when animationend not supported

  var onAnimationEnd = function onAnimationEnd() {
    return setVisible(false);
  };

  var animationFallback = (0, _useTimeout.useTimeout)(onAnimationEnd, 200);
  React.useEffect(function () {
    return closing ? animationFallback.set() : animationFallback.clear();
  }, [animationFallback, closing]);
  return (0, _jsxRuntime.createScopedElement)(_FixedLayout.default, (0, _extends2.default)({}, restProps, {
    vkuiClass: (0, _classNames.classNames)((0, _getClassName.getClassName)("PanelHeaderContext", platform), {
      "PanelHeaderContext--opened": opened,
      "PanelHeaderContext--closing": closing,
      "PanelHeaderContext--desktop": isDesktop
    }),
    vertical: "top"
  }), (0, _jsxRuntime.createScopedElement)("div", {
    vkuiClass: "PanelHeaderContext__in",
    ref: elementRef,
    onAnimationEnd: closing ? onAnimationEnd : undefined
  }, (0, _jsxRuntime.createScopedElement)("div", {
    vkuiClass: "PanelHeaderContext__content"
  }, visible && children)), !isDesktop && visible && (0, _jsxRuntime.createScopedElement)("div", {
    onClick: onClose,
    vkuiClass: "PanelHeaderContext__fade"
  }));
};

exports.PanelHeaderContext = PanelHeaderContext;
//# sourceMappingURL=PanelHeaderContext.js.map