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

var _Caption = _interopRequireDefault(require("../Typography/Caption/Caption"));

var _usePlatform = require("../../hooks/usePlatform");

var _useTimeout = require("../../hooks/useTimeout");

var _useAdaptivity2 = require("../../hooks/useAdaptivity");

var _useObjectMemo = require("../../hooks/useObjectMemo");

var _warnOnce = require("../../lib/warnOnce");

var _vkjs = require("@vkontakte/vkjs");

var _excluded = ["children", "className", "header", "text", "style", "iosCloseItem"];
var warn = (0, _warnOnce.warnOnce)('ActionSheet');

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

  var closeAction = React.useRef(_vkjs.noop);

  var afterClose = function afterClose() {
    restProps.onClose();
    closeAction.current();
  };

  if (process.env.NODE_ENV === 'development' && !restProps.onClose) {
    warn('can\'t close on outer click without onClose');
  }

  var _useAdaptivity = (0, _useAdaptivity2.useAdaptivity)(),
      viewWidth = _useAdaptivity.viewWidth,
      viewHeight = _useAdaptivity.viewHeight,
      hasMouse = _useAdaptivity.hasMouse;

  var isDesktop = viewWidth >= _withAdaptivity.ViewWidth.SMALL_TABLET && (hasMouse || viewHeight >= _withAdaptivity.ViewHeight.MEDIUM);
  var timeout = platform === _platform.IOS ? 300 : 200;
  var fallbackTransitionFinish = (0, _useTimeout.useTimeout)(afterClose, timeout);
  React.useEffect(function () {
    if (closing) {
      if (isDesktop) {
        afterClose();
      } else {
        fallbackTransitionFinish.set();
      }
    } else {
      fallbackTransitionFinish.clear();
    }
  }, [closing]);
  var onItemClick = React.useCallback(function (action, autoclose) {
    return function (event) {
      event.persist();

      if (autoclose) {
        closeAction.current = function () {
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
  return (0, _jsxRuntime.createScopedElement)(_PopoutWrapper.PopoutWrapper, {
    closing: closing,
    alignY: "bottom",
    className: className,
    style: style,
    onClick: !isDesktop ? onClose : null,
    hasMask: !isDesktop,
    fixed: !isDesktop
  }, (0, _jsxRuntime.createScopedElement)(_ActionSheetContext.ActionSheetContext.Provider, {
    value: contextValue
  }, (0, _jsxRuntime.createScopedElement)(DropdownComponent, (0, _extends2.default)({
    closing: closing,
    timeout: timeout
  }, restProps, {
    onClose: onClose
  }), ((0, _utils.hasReactNode)(header) || (0, _utils.hasReactNode)(text)) && (0, _jsxRuntime.createScopedElement)("header", {
    vkuiClass: "ActionSheet__header"
  }, (0, _utils.hasReactNode)(header) && (0, _jsxRuntime.createScopedElement)(_Caption.default, {
    level: "1",
    weight: platform === _platform.IOS ? 'semibold' : 'medium',
    vkuiClass: "ActionSheet__title"
  }, header), (0, _utils.hasReactNode)(text) && (0, _jsxRuntime.createScopedElement)(_Caption.default, {
    level: "1",
    weight: "regular",
    vkuiClass: "ActionSheet__text"
  }, text)), children, platform === _platform.IOS && !isDesktop && iosCloseItem)));
};

exports.ActionSheet = ActionSheet;
ActionSheet.defaultProps = {
  popupDirection: 'bottom'
};
//# sourceMappingURL=ActionSheet.js.map