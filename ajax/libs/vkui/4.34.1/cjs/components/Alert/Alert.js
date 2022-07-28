"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Alert = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _jsxRuntime = require("../../lib/jsxRuntime");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var React = _interopRequireWildcard(require("react"));

var _Tappable = require("../Tappable/Tappable");

var _PopoutWrapper = require("../PopoutWrapper/PopoutWrapper");

var _getClassName = require("../../helpers/getClassName");

var _classNames = require("../../lib/classNames");

var _platform = require("../../lib/platform");

var _withAdaptivity = require("../../hoc/withAdaptivity");

var _Button = require("../Button/Button");

var _utils = require("../../lib/utils");

var _Title = require("../Typography/Title/Title");

var _Caption = require("../Typography/Caption/Caption");

var _Text = require("../Typography/Text/Text");

var _ModalDismissButton = require("../ModalDismissButton/ModalDismissButton");

var _FocusTrap = require("../FocusTrap/FocusTrap");

var _ScrollContext = require("../AppRoot/ScrollContext");

var _useWaitTransitionFinish = require("../../hooks/useWaitTransitionFinish");

var _usePlatform = require("../../hooks/usePlatform");

var _useAdaptivity3 = require("../../hooks/useAdaptivity");

var _excluded = ["action", "onItemClick"],
    _excluded2 = ["actions", "actionsLayout", "children", "className", "style", "text", "header", "onClose", "dismissLabel"];

var AlertHeader = function AlertHeader(props) {
  var platform = (0, _usePlatform.usePlatform)();

  switch (platform) {
    case _platform.IOS:
      return (0, _jsxRuntime.createScopedElement)(_Title.Title, (0, _extends2.default)({
        vkuiClass: "Alert__header",
        weight: "1",
        level: "3"
      }, props));

    default:
      return (0, _jsxRuntime.createScopedElement)(_Title.Title, (0, _extends2.default)({
        vkuiClass: "Alert__header",
        weight: "2",
        level: "2"
      }, props));
  }
};

var AlertText = function AlertText(props) {
  var platform = (0, _usePlatform.usePlatform)();

  switch (platform) {
    case _platform.VKCOM:
      return (0, _jsxRuntime.createScopedElement)(_Caption.Caption, (0, _extends2.default)({
        vkuiClass: "Alert__text"
      }, props));

    case _platform.IOS:
      return (0, _jsxRuntime.createScopedElement)(_Caption.Caption, (0, _extends2.default)({
        vkuiClass: "Alert__text",
        level: "2"
      }, props));

    default:
      return (0, _jsxRuntime.createScopedElement)(_Text.Text, (0, _extends2.default)({
        Component: "span",
        vkuiClass: "Alert__text",
        weight: "3"
      }, props));
  }
};

var AlertAction = function AlertAction(_ref) {
  var action = _ref.action,
      onItemClick = _ref.onItemClick,
      restProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  var platform = (0, _usePlatform.usePlatform)();

  var _useAdaptivity = (0, _useAdaptivity3.useAdaptivity)(),
      viewWidth = _useAdaptivity.viewWidth;

  var handleItemClick = React.useCallback(function () {
    return onItemClick(action);
  }, [onItemClick, action]);

  if (platform === _platform.IOS) {
    var _action$Component = action.Component,
        Component = _action$Component === void 0 ? "button" : _action$Component;
    return (0, _jsxRuntime.createScopedElement)(_Tappable.Tappable, (0, _extends2.default)({
      Component: action.href ? "a" : Component,
      vkuiClass: (0, _classNames.classNames)("Alert__action", "Alert__action--".concat(action.mode)),
      onClick: handleItemClick,
      href: action.href,
      target: action.target
    }, restProps), action.title);
  }

  var mode = action.mode === "cancel" ? "secondary" : "primary";

  if (platform === _platform.ANDROID) {
    mode = "tertiary";

    if (viewWidth === _withAdaptivity.ViewWidth.DESKTOP && action.mode === "destructive") {
      mode = "destructive";
    }
  }

  return (0, _jsxRuntime.createScopedElement)(_Button.Button, {
    vkuiClass: (0, _classNames.classNames)("Alert__button", "Alert__button--".concat(action.mode)),
    mode: mode,
    size: "m",
    onClick: handleItemClick,
    Component: action.Component,
    href: action.href,
    target: action.target
  }, action.title);
};
/**
 * @see https://vkcom.github.io/VKUI/#/Alert
 */


var Alert = function Alert(_ref2) {
  var _ref2$actions = _ref2.actions,
      actions = _ref2$actions === void 0 ? [] : _ref2$actions,
      _ref2$actionsLayout = _ref2.actionsLayout,
      actionsLayout = _ref2$actionsLayout === void 0 ? "horizontal" : _ref2$actionsLayout,
      children = _ref2.children,
      className = _ref2.className,
      style = _ref2.style,
      text = _ref2.text,
      header = _ref2.header,
      onClose = _ref2.onClose,
      _ref2$dismissLabel = _ref2.dismissLabel,
      dismissLabel = _ref2$dismissLabel === void 0 ? "Закрыть предупреждение" : _ref2$dismissLabel,
      restProps = (0, _objectWithoutProperties2.default)(_ref2, _excluded2);
  var platform = (0, _usePlatform.usePlatform)();

  var _useAdaptivity2 = (0, _useAdaptivity3.useAdaptivity)(),
      viewWidth = _useAdaptivity2.viewWidth;

  var _useWaitTransitionFin = (0, _useWaitTransitionFinish.useWaitTransitionFinish)(),
      waitTransitionFinish = _useWaitTransitionFin.waitTransitionFinish;

  var _React$useState = React.useState(false),
      _React$useState2 = (0, _slicedToArray2.default)(_React$useState, 2),
      closing = _React$useState2[0],
      setClosing = _React$useState2[1];

  var elementRef = React.useRef(null);
  var resolvedActionsLayout = platform === _platform.VKCOM ? "horizontal" : actionsLayout;
  var canShowCloseButton = platform === _platform.VKCOM || platform === _platform.ANDROID && viewWidth >= _withAdaptivity.ViewWidth.SMALL_TABLET;
  var isDesktop = viewWidth >= _withAdaptivity.ViewWidth.SMALL_TABLET;
  var timeout = platform === _platform.ANDROID || platform === _platform.VKCOM ? 200 : 300;
  var close = React.useCallback(function () {
    setClosing(true);
    waitTransitionFinish(elementRef.current, function (e) {
      if (!e || e.propertyName === "opacity") {
        onClose && onClose();
      }
    }, timeout);
  }, [elementRef, waitTransitionFinish, onClose, timeout]);
  var onItemClick = React.useCallback(function (item) {
    var action = item.action,
        autoclose = item.autoclose;

    if (autoclose) {
      setClosing(true);
      waitTransitionFinish(elementRef.current, function (e) {
        if (!e || e.propertyName === "opacity") {
          onClose && onClose();
          action && action();
        }
      }, timeout);
    } else {
      action && action();
    }
  }, [elementRef, waitTransitionFinish, onClose, timeout]);
  (0, _ScrollContext.useScrollLock)();
  return (0, _jsxRuntime.createScopedElement)(_PopoutWrapper.PopoutWrapper, {
    className: className,
    closing: closing,
    style: style,
    onClick: close
  }, (0, _jsxRuntime.createScopedElement)(_FocusTrap.FocusTrap, (0, _extends2.default)({}, restProps, {
    getRootRef: elementRef,
    onClick: _utils.stopPropagation,
    onClose: close,
    timeout: timeout,
    vkuiClass: (0, _classNames.classNames)((0, _getClassName.getClassName)("Alert", platform), resolvedActionsLayout === "vertical" ? "Alert--v" : "Alert--h", closing && "Alert--closing", isDesktop && "Alert--desktop"),
    role: "alertdialog",
    "aria-modal": true,
    "aria-labelledby": "vkui--alert--title",
    "aria-describedby": "vkui--alert--desc"
  }), (0, _jsxRuntime.createScopedElement)("div", {
    vkuiClass: "Alert__content"
  }, (0, _utils.hasReactNode)(header) && (0, _jsxRuntime.createScopedElement)(AlertHeader, {
    id: "vkui--alert--title"
  }, header), (0, _utils.hasReactNode)(text) && (0, _jsxRuntime.createScopedElement)(AlertText, {
    id: "vkui--alert--desc"
  }, text), children), (0, _jsxRuntime.createScopedElement)("div", {
    vkuiClass: "Alert__actions"
  }, actions.map(function (action, i) {
    return (0, _jsxRuntime.createScopedElement)(AlertAction, {
      key: i,
      action: action,
      onItemClick: onItemClick
    });
  })), canShowCloseButton && (0, _jsxRuntime.createScopedElement)(_ModalDismissButton.ModalDismissButton, {
    onClick: close,
    "aria-label": dismissLabel
  })));
};

exports.Alert = Alert;
//# sourceMappingURL=Alert.js.map