"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActionSheet = void 0;

var _jsxRuntime = require("../../lib/jsxRuntime");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var React = _interopRequireWildcard(require("react"));

var _PopoutWrapper = require("../PopoutWrapper/PopoutWrapper");

var _withAdaptivity = require("../../hoc/withAdaptivity");

var _platform = require("../../lib/platform");

var _ActionSheetDropdownDesktop = require("./ActionSheetDropdownDesktop");

var _ActionSheetDropdown = require("./ActionSheetDropdown");

var _utils = require("../../lib/utils");

var _ActionSheetContext = require("./ActionSheetContext");

var _Caption = require("../Typography/Caption/Caption");

var _usePlatform = require("../../hooks/usePlatform");

var _useTimeout = require("../../hooks/useTimeout");

var _useAdaptivity2 = require("../../hooks/useAdaptivity");

var _useObjectMemo = require("../../hooks/useObjectMemo");

var _warnOnce = require("../../lib/warnOnce");

var _excluded = ["children", "className", "header", "text", "style", "iosCloseItem"];
var warn = (0, _warnOnce.warnOnce)("ActionSheet");

var ActionSheet = function ActionSheet(_ref) {
  var children = _ref.children,
      className = _ref.className,
      header = _ref.header,
      text = _ref.text,
      style = _ref.style,
      iosCloseItem = _ref.iosCloseItem,
      restProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  var platform = (0, _usePlatform.usePlatform)();

  var _React$useState = React.useState(false),
      _React$useState2 = (0, _slicedToArray2.default)(_React$useState, 2),
      closing = _React$useState2[0],
      setClosing = _React$useState2[1];

  var onClose = function onClose() {
    return setClosing(true);
  };

  var _action = React.useRef(_utils.noop);

  var afterClose = function afterClose() {
    var _restProps$onClose;

    (_restProps$onClose = restProps.onClose) === null || _restProps$onClose === void 0 ? void 0 : _restProps$onClose.call(restProps);

    _action.current();

    _action.current = _utils.noop;
  };

  if (process.env.NODE_ENV === "development" && !restProps.onClose) {
    warn("can't close on outer click without onClose");
  }

  var _useAdaptivity = (0, _useAdaptivity2.useAdaptivity)(),
      viewWidth = _useAdaptivity.viewWidth,
      viewHeight = _useAdaptivity.viewHeight,
      hasMouse = _useAdaptivity.hasMouse;

  var isDesktop = viewWidth >= _withAdaptivity.ViewWidth.SMALL_TABLET && (hasMouse || viewHeight >= _withAdaptivity.ViewHeight.MEDIUM);
  var timeout = platform === _platform.IOS ? 300 : 200;

  if (isDesktop) {
    timeout = 0;
  }

  var fallbackTransitionFinish = (0, _useTimeout.useTimeout)(afterClose, timeout);
  React.useEffect(function () {
    if (closing) {
      fallbackTransitionFinish.set();
    } else {
      fallbackTransitionFinish.clear();
    }
  }, [closing, fallbackTransitionFinish]);
  var onItemClick = React.useCallback(function (action, immediateAction, autoclose) {
    return function (event) {
      event.persist();
      immediateAction && immediateAction(event);

      if (autoclose) {
        _action.current = function () {
          return action && action(event);
        };

        setClosing(true);
      } else {
        action && action(event);
      }
    };
  }, []);
  var contextValue = (0, _useObjectMemo.useObjectMemo)({
    onItemClick: onItemClick,
    isDesktop: isDesktop
  });
  var DropdownComponent = isDesktop ? _ActionSheetDropdownDesktop.ActionSheetDropdownDesktop : _ActionSheetDropdown.ActionSheetDropdown;
  var actionSheet = (0, _jsxRuntime.createScopedElement)(_ActionSheetContext.ActionSheetContext.Provider, {
    value: contextValue
  }, (0, _jsxRuntime.createScopedElement)(DropdownComponent, (0, _extends2.default)({
    closing: closing,
    timeout: timeout
  }, restProps, {
    onClose: onClose,
    className: isDesktop ? className : undefined,
    style: isDesktop ? style : undefined
  }), ((0, _utils.hasReactNode)(header) || (0, _utils.hasReactNode)(text)) && (0, _jsxRuntime.createScopedElement)("header", {
    vkuiClass: "ActionSheet__header"
  }, (0, _utils.hasReactNode)(header) && (0, _jsxRuntime.createScopedElement)(_Caption.Caption, {
    weight: platform === _platform.IOS ? "1" : "2",
    vkuiClass: "ActionSheet__title"
  }, header), (0, _utils.hasReactNode)(text) && (0, _jsxRuntime.createScopedElement)(_Caption.Caption, {
    vkuiClass: "ActionSheet__text"
  }, text)), children, platform === _platform.IOS && !isDesktop && iosCloseItem));

  if (isDesktop) {
    return actionSheet;
  }

  return (0, _jsxRuntime.createScopedElement)(_PopoutWrapper.PopoutWrapper, {
    closing: closing,
    alignY: "bottom",
    className: className,
    style: style,
    onClick: onClose,
    hasMask: true,
    fixed: true
  }, actionSheet);
};

exports.ActionSheet = ActionSheet;
ActionSheet.defaultProps = {
  popupDirection: "bottom"
};
//# sourceMappingURL=ActionSheet.js.map