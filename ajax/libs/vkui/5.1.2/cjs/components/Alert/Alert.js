"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Alert = void 0;
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var React = _interopRequireWildcard(require("react"));
var _Tappable = require("../Tappable/Tappable");
var _PopoutWrapper = require("../PopoutWrapper/PopoutWrapper");
var _vkjs = require("@vkontakte/vkjs");
var _platform = require("../../lib/platform");
var _Button = require("../Button/Button");
var _utils = require("../../lib/utils");
var _Title = require("../Typography/Title/Title");
var _Caption = require("../Typography/Caption/Caption");
var _Footnote = require("../Typography/Footnote/Footnote");
var _Text = require("../Typography/Text/Text");
var _ModalDismissButton = require("../ModalDismissButton/ModalDismissButton");
var _FocusTrap = require("../FocusTrap/FocusTrap");
var _ScrollContext = require("../AppRoot/ScrollContext");
var _useWaitTransitionFinish = require("../../hooks/useWaitTransitionFinish");
var _usePlatform = require("../../hooks/usePlatform");
var _useAdaptivityWithJSMediaQueries = require("../../hooks/useAdaptivityWithJSMediaQueries");
var _excluded = ["action", "onItemClick"],
  _excluded2 = ["Component", "title", "action", "autoClose", "mode"],
  _excluded3 = ["actions", "actionsLayout", "children", "className", "style", "text", "header", "onClose", "dismissLabel"];
var AlertHeader = function AlertHeader(props) {
  var platform = (0, _usePlatform.usePlatform)();
  switch (platform) {
    case _platform.Platform.IOS:
      return /*#__PURE__*/React.createElement(_Title.Title, (0, _extends2.default)({
        className: "vkuiAlert__header",
        weight: "1",
        level: "3"
      }, props));
    default:
      return /*#__PURE__*/React.createElement(_Title.Title, (0, _extends2.default)({
        className: "vkuiAlert__header",
        weight: "2",
        level: "2"
      }, props));
  }
};
var AlertText = function AlertText(props) {
  var platform = (0, _usePlatform.usePlatform)();
  switch (platform) {
    case _platform.Platform.VKCOM:
      return /*#__PURE__*/React.createElement(_Footnote.Footnote, (0, _extends2.default)({
        className: "vkuiAlert__text"
      }, props));
    case _platform.Platform.IOS:
      return /*#__PURE__*/React.createElement(_Caption.Caption, (0, _extends2.default)({
        className: "vkuiAlert__text"
      }, props));
    default:
      return /*#__PURE__*/React.createElement(_Text.Text, (0, _extends2.default)({
        Component: "span",
        className: "vkuiAlert__text",
        weight: "3"
      }, props));
  }
};
var AlertAction = function AlertAction(_ref) {
  var action = _ref.action,
    onItemClick = _ref.onItemClick,
    restProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  var platform = (0, _usePlatform.usePlatform)();
  var handleItemClick = React.useCallback(function () {
    return onItemClick(action);
  }, [onItemClick, action]);
  if (platform === _platform.Platform.IOS) {
    var _action$Component = action.Component,
      Component = _action$Component === void 0 ? 'button' : _action$Component,
      title = action.title,
      actionProp = action.action,
      autoClose = action.autoClose,
      _mode = action.mode,
      restActionProps = (0, _objectWithoutProperties2.default)(action, _excluded2);
    return /*#__PURE__*/React.createElement(_Tappable.Tappable, (0, _extends2.default)({
      Component: restActionProps.href ? 'a' : Component,
      className: (0, _vkjs.classNames)("vkuiAlert__action", styles["Alert__action--mode-".concat(_mode)]),
      onClick: handleItemClick
    }, restActionProps, restProps), title);
  }
  var mode = 'tertiary';
  if (platform === _platform.Platform.VKCOM) {
    mode = action.mode === 'cancel' ? 'secondary' : 'primary';
  }
  return /*#__PURE__*/React.createElement(_Button.Button, {
    className: (0, _vkjs.classNames)("vkuiAlert__button", styles["Alert__button--mode-".concat(action.mode)]),
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
    actionsLayout = _ref2$actionsLayout === void 0 ? 'horizontal' : _ref2$actionsLayout,
    children = _ref2.children,
    className = _ref2.className,
    style = _ref2.style,
    text = _ref2.text,
    header = _ref2.header,
    onClose = _ref2.onClose,
    _ref2$dismissLabel = _ref2.dismissLabel,
    dismissLabel = _ref2$dismissLabel === void 0 ? 'Закрыть предупреждение' : _ref2$dismissLabel,
    restProps = (0, _objectWithoutProperties2.default)(_ref2, _excluded3);
  var platform = (0, _usePlatform.usePlatform)();
  var _useAdaptivityWithJSM = (0, _useAdaptivityWithJSMediaQueries.useAdaptivityWithJSMediaQueries)(),
    isDesktop = _useAdaptivityWithJSM.isDesktop;
  var _useWaitTransitionFin = (0, _useWaitTransitionFinish.useWaitTransitionFinish)(),
    waitTransitionFinish = _useWaitTransitionFin.waitTransitionFinish;
  var _React$useState = React.useState(false),
    _React$useState2 = (0, _slicedToArray2.default)(_React$useState, 2),
    closing = _React$useState2[0],
    setClosing = _React$useState2[1];
  var elementRef = React.useRef(null);
  var resolvedActionsLayout = platform === _platform.Platform.VKCOM ? 'horizontal' : actionsLayout;
  var timeout = platform === _platform.Platform.IOS ? 300 : 200;
  var close = React.useCallback(function () {
    setClosing(true);
    waitTransitionFinish(elementRef.current, function (e) {
      if (!e || e.propertyName === 'opacity') {
        onClose();
      }
    }, timeout);
  }, [elementRef, waitTransitionFinish, onClose, timeout]);
  var onItemClick = React.useCallback(function (item) {
    var action = item.action,
      autoClose = item.autoClose;
    if (autoClose) {
      setClosing(true);
      waitTransitionFinish(elementRef.current, function (e) {
        if (!e || e.propertyName === 'opacity') {
          onClose();
          action && action();
        }
      }, timeout);
    } else {
      action && action();
    }
  }, [elementRef, waitTransitionFinish, onClose, timeout]);
  (0, _ScrollContext.useScrollLock)();
  return /*#__PURE__*/React.createElement(_PopoutWrapper.PopoutWrapper, {
    className: className,
    closing: closing,
    style: style,
    onClick: close
  }, /*#__PURE__*/React.createElement(_FocusTrap.FocusTrap, (0, _extends2.default)({}, restProps, {
    getRootRef: elementRef,
    onClick: _utils.stopPropagation,
    onClose: close,
    timeout: timeout,
    className: (0, _vkjs.classNames)("vkuiAlert", platform === _platform.Platform.IOS && "vkuiAlert--ios", platform === _platform.Platform.VKCOM && "vkuiAlert--vkcom", resolvedActionsLayout === 'vertical' ? "vkuiAlert--v" : "vkuiAlert--h", closing && "vkuiAlert--closing", isDesktop && "vkuiAlert--desktop"),
    role: "alertdialog",
    "aria-modal": true,
    "aria-labelledby": "vkui--alert--title",
    "aria-describedby": "vkui--alert--desc"
  }), /*#__PURE__*/React.createElement("div", {
    className: "vkuiAlert__content"
  }, (0, _vkjs.hasReactNode)(header) && /*#__PURE__*/React.createElement(AlertHeader, {
    id: "vkui--alert--title"
  }, header), (0, _vkjs.hasReactNode)(text) && /*#__PURE__*/React.createElement(AlertText, {
    id: "vkui--alert--desc"
  }, text), children), /*#__PURE__*/React.createElement("div", {
    className: "vkuiAlert__actions"
  }, actions.map(function (action, i) {
    return /*#__PURE__*/React.createElement(AlertAction, {
      key: i,
      action: action,
      onItemClick: onItemClick
    });
  })), isDesktop && /*#__PURE__*/React.createElement(_ModalDismissButton.ModalDismissButton, {
    onClick: close,
    "aria-label": dismissLabel
  })));
};
exports.Alert = Alert;
var styles = {
  "Alert__action--mode-cancel": "vkuiAlert__action--mode-cancel",
  "Alert__action--mode-destructive": "vkuiAlert__action--mode-destructive",
  "Alert__action--mode-default": "vkuiAlert__action--mode-default",
  "Alert__button--mode-cancel": "vkuiAlert__button--mode-cancel",
  "Alert__button--mode-default": "vkuiAlert__button--mode-default",
  "Alert__button--mode-destructive": "vkuiAlert__button--mode-destructive"
};
//# sourceMappingURL=Alert.js.map