"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActionSheetDropdownDesktop = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var React = _interopRequireWildcard(require("react"));
var _getSizeYClassName = require("../../helpers/getSizeYClassName");
var _vkjs = require("@vkontakte/vkjs");
var _dom = require("../../lib/dom");
var _usePlatform = require("../../hooks/usePlatform");
var _useEffectDev = require("../../hooks/useEffectDev");
var _useAdaptivityWithJSMediaQueries = require("../../hooks/useAdaptivityWithJSMediaQueries");
var _isRefObject = require("../../lib/isRefObject");
var _warnOnce = require("../../lib/warnOnce");
var _platform = require("../../lib/platform");
var _useEventListener = require("../../hooks/useEventListener");
var _FocusTrap = require("../FocusTrap/FocusTrap");
var _Popper = require("../Popper/Popper");
var _excluded = ["children", "toggleRef", "closing", "popupDirection", "onClose", "className", "style", "popupOffsetDistance"];
var warn = (0, _warnOnce.warnOnce)('ActionSheet');
function getEl(ref) {
  return ref && 'current' in ref ? ref.current : ref;
}
var ActionSheetDropdownDesktop = function ActionSheetDropdownDesktop(_ref) {
  var children = _ref.children,
    toggleRef = _ref.toggleRef,
    closing = _ref.closing,
    popupDirection = _ref.popupDirection,
    onClose = _ref.onClose,
    className = _ref.className,
    style = _ref.style,
    _ref$popupOffsetDista = _ref.popupOffsetDistance,
    popupOffsetDistance = _ref$popupOffsetDista === void 0 ? 0 : _ref$popupOffsetDista,
    restProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  var _useDOM = (0, _dom.useDOM)(),
    document = _useDOM.document;
  var platform = (0, _usePlatform.usePlatform)();
  var _useAdaptivityWithJSM = (0, _useAdaptivityWithJSMediaQueries.useAdaptivityWithJSMediaQueries)(),
    sizeY = _useAdaptivityWithJSM.sizeY;
  var elementRef = React.useRef(null);
  (0, _useEffectDev.useEffectDev)(function () {
    var toggleEl = getEl(toggleRef);
    if (!toggleEl) {
      warn("\u0421\u0432\u043E\u0439\u0441\u0442\u0432\u043E \"toggleRef\" \u043D\u0435 \u043F\u0435\u0440\u0435\u0434\u0430\u043D\u043E", 'error');
    }
  }, [toggleRef]);
  var isPopupDirectionTop = React.useMemo(function () {
    return popupDirection === 'top' || typeof popupDirection === 'function' && popupDirection(elementRef) === 'top';
  }, [popupDirection, elementRef]);
  var bodyClickListener = (0, _useEventListener.useEventListener)('click', function (e) {
    var dropdownElement = elementRef === null || elementRef === void 0 ? void 0 : elementRef.current;
    if (dropdownElement && !dropdownElement.contains(e.target)) {
      onClose === null || onClose === void 0 ? void 0 : onClose();
    }
  });
  React.useEffect(function () {
    setTimeout(function () {
      bodyClickListener.add(document.body);
    });
  }, [bodyClickListener, document]);
  var onClick = React.useCallback(function (e) {
    return e.stopPropagation();
  }, []);
  var targetRef = React.useMemo(function () {
    if ((0, _isRefObject.isRefObject)(toggleRef)) {
      return toggleRef;
    }
    return {
      current: toggleRef
    };
  }, [toggleRef]);
  return /*#__PURE__*/React.createElement(_Popper.Popper, {
    targetRef: targetRef,
    offsetDistance: popupOffsetDistance,
    placement: isPopupDirectionTop ? 'top-end' : 'bottom-end',
    className: (0, _vkjs.classNames)("vkuiActionSheet", platform === _platform.Platform.IOS && "vkuiActionSheet--ios", "vkuiActionSheet--desktop", (0, _getSizeYClassName.getSizeYClassName)("vkuiActionSheet", sizeY), className),
    style: style,
    getRef: elementRef,
    forcePortal: false
  }, /*#__PURE__*/React.createElement(_FocusTrap.FocusTrap, (0, _extends2.default)({
    onClose: onClose
  }, restProps, {
    onClick: onClick
  }), children));
};
exports.ActionSheetDropdownDesktop = ActionSheetDropdownDesktop;
//# sourceMappingURL=ActionSheetDropdownDesktop.js.map