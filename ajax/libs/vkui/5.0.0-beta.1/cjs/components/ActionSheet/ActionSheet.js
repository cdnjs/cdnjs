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

var _platform = require("../../lib/platform");

var _ActionSheetDropdownDesktop = require("./ActionSheetDropdownDesktop");

var _ActionSheetDropdown = require("./ActionSheetDropdown");

var _utils = require("../../lib/utils");

var _ActionSheetContext = require("./ActionSheetContext");

var _Footnote = require("../Typography/Footnote/Footnote");

var _usePlatform = require("../../hooks/usePlatform");

var _useTimeout = require("../../hooks/useTimeout");

var _useAdaptivityWithMediaQueries = require("../../hooks/useAdaptivityWithMediaQueries");

var _useObjectMemo = require("../../hooks/useObjectMemo");

var _ScrollContext = require("../AppRoot/ScrollContext");

var _excluded = ["children", "className", "header", "text", "style", "iosCloseItem", "popupDirection"];

/**
 * @see https://vkcom.github.io/VKUI/#/ActionSheet
 */
var ActionSheet = function ActionSheet(_ref) {
  var children = _ref.children,
      className = _ref.className,
      header = _ref.header,
      text = _ref.text,
      style = _ref.style,
      iosCloseItem = _ref.iosCloseItem,
      _ref$popupDirection = _ref.popupDirection,
      popupDirection = _ref$popupDirection === void 0 ? "bottom" : _ref$popupDirection,
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
    restProps.onClose();

    _action.current();

    _action.current = _utils.noop;
  };

  var _useAdaptivityWithMed = (0, _useAdaptivityWithMediaQueries.useAdaptivityWithMediaQueries)(),
      isDesktop = _useAdaptivityWithMed.isDesktop;

  (0, _ScrollContext.useScrollLock)(!isDesktop);
  var timeout = platform === _platform.Platform.IOS ? 300 : 200;

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
  var onItemClick = React.useCallback(function (action, immediateAction, autoClose) {
    return function (event) {
      event.persist();
      immediateAction && immediateAction(event);

      if (autoClose) {
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
    popupDirection: popupDirection,
    onClose: onClose,
    className: isDesktop ? className : undefined,
    style: isDesktop ? style : undefined
  }), (header || text) && (0, _jsxRuntime.createScopedElement)("header", {
    vkuiClass: "ActionSheet__header"
  }, header && (0, _jsxRuntime.createScopedElement)(_Footnote.Footnote, {
    weight: "2",
    vkuiClass: "ActionSheet__title"
  }, header), text && (0, _jsxRuntime.createScopedElement)(_Footnote.Footnote, {
    vkuiClass: "ActionSheet__text"
  }, text)), children, platform === _platform.Platform.IOS && !isDesktop && iosCloseItem));

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
//# sourceMappingURL=ActionSheet.js.map