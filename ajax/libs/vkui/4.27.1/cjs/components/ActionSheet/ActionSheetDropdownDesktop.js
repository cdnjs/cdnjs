"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActionSheetDropdownDesktop = void 0;

var _jsxRuntime = require("../../lib/jsxRuntime");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var React = _interopRequireWildcard(require("react"));

var _getClassName = require("../../helpers/getClassName");

var _classNames = require("../../lib/classNames");

var _dom = require("../../lib/dom");

var _usePlatform = require("../../hooks/usePlatform");

var _useEffectDev = require("../../hooks/useEffectDev");

var _useAdaptivity2 = require("../../hooks/useAdaptivity");

var _isRefObject = require("../../lib/isRefObject");

var _warnOnce = require("../../lib/warnOnce");

var _useEventListener = require("../../hooks/useEventListener");

var _FocusTrap = require("../FocusTrap/FocusTrap");

var _Popper = require("../Popper/Popper");

var _excluded = ["children", "toggleRef", "closing", "popupDirection", "onClose", "className", "style"];
var warn = (0, _warnOnce.warnOnce)("ActionSheet");

function getEl(ref) {
  return ref && "current" in ref ? ref.current : ref;
}

var ActionSheetDropdownDesktop = function ActionSheetDropdownDesktop(_ref) {
  var children = _ref.children,
      toggleRef = _ref.toggleRef,
      closing = _ref.closing,
      popupDirection = _ref.popupDirection,
      onClose = _ref.onClose,
      className = _ref.className,
      style = _ref.style,
      restProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);

  var _useDOM = (0, _dom.useDOM)(),
      document = _useDOM.document;

  var platform = (0, _usePlatform.usePlatform)();

  var _useAdaptivity = (0, _useAdaptivity2.useAdaptivity)(),
      sizeY = _useAdaptivity.sizeY;

  var elementRef = React.useRef(null);
  (0, _useEffectDev.useEffectDev)(function () {
    var toggleEl = getEl(toggleRef);

    if (!toggleEl) {
      warn("toggleRef not passed");
    }
  }, [toggleRef]);
  var isPopupDirectionTop = React.useMemo(function () {
    return popupDirection === "top" || typeof popupDirection === "function" && popupDirection(elementRef) === "top";
  }, [popupDirection, elementRef]);
  var bodyClickListener = (0, _useEventListener.useEventListener)("click", function (e) {
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

    var refObject = {
      current: toggleRef
    };
    return refObject;
  }, [toggleRef]);
  return (0, _jsxRuntime.createScopedElement)(_Popper.Popper, {
    targetRef: targetRef,
    offsetDistance: 0,
    placement: isPopupDirectionTop ? "top-end" : "bottom-end",
    vkuiClass: (0, _classNames.classNames)((0, _getClassName.getClassName)("ActionSheet", platform), "ActionSheet--desktop", "ActionSheet--sizeY-".concat(sizeY)),
    className: className,
    style: style,
    getRef: elementRef,
    forcePortal: false
  }, (0, _jsxRuntime.createScopedElement)(_FocusTrap.FocusTrap, (0, _extends2.default)({
    onClose: onClose
  }, restProps, {
    onClick: onClick
  }), children));
};

exports.ActionSheetDropdownDesktop = ActionSheetDropdownDesktop;
//# sourceMappingURL=ActionSheetDropdownDesktop.js.map