"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ActionSheetDropdownMenu", {
    enumerable: true,
    get: function() {
        return ActionSheetDropdownMenu;
    }
});
var _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
var _object_spread = require("@swc/helpers/_/_object_spread");
var _object_spread_props = require("@swc/helpers/_/_object_spread_props");
var _object_without_properties = require("@swc/helpers/_/_object_without_properties");
var _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var _useAdaptivityWithJSMediaQueries = require("../../hooks/useAdaptivityWithJSMediaQueries");
var _useEffectDev = require("../../hooks/useEffectDev");
var _useEventListener = require("../../hooks/useEventListener");
var _usePlatform = require("../../hooks/usePlatform");
var _adaptivity = require("../../lib/adaptivity");
var _dom = require("../../lib/dom");
var _isRefObject = require("../../lib/isRefObject");
var _platform = require("../../lib/platform");
var _warnOnce = require("../../lib/warnOnce");
var _FocusTrap = require("../FocusTrap/FocusTrap");
var _Popper = require("../Popper/Popper");
var warn = (0, _warnOnce.warnOnce)("ActionSheet");
function getEl(ref) {
    return ref && "current" in ref ? ref.current : ref;
}
var ActionSheetDropdownMenu = function(_param) {
    var children = _param.children, toggleRef = _param.toggleRef, closing = _param.closing, popupDirection = _param.popupDirection, onClose = _param.onClose, className = _param.className, style = _param.style, _param_popupOffsetDistance = _param.popupOffsetDistance, popupOffsetDistance = _param_popupOffsetDistance === void 0 ? 0 : _param_popupOffsetDistance, placementProp = _param.placement, restProps = _object_without_properties._(_param, [
        "children",
        "toggleRef",
        "closing",
        "popupDirection",
        "onClose",
        "className",
        "style",
        "popupOffsetDistance",
        "placement"
    ]);
    var document = (0, _dom.useDOM)().document;
    var platform = (0, _usePlatform.usePlatform)();
    var sizeY = (0, _useAdaptivityWithJSMediaQueries.useAdaptivityWithJSMediaQueries)().sizeY;
    var elementRef = _react.useRef(null);
    (0, _useEffectDev.useEffectDev)(function() {
        var toggleEl = getEl(toggleRef);
        if (!toggleEl) {
            warn('Свойство "toggleRef" не передано', "error");
        }
    }, [
        toggleRef
    ]);
    var isPopupDirectionTop = _react.useMemo(function() {
        return popupDirection === "top" || typeof popupDirection === "function" && popupDirection(elementRef) === "top";
    }, [
        popupDirection,
        elementRef
    ]);
    var placement = placementProp !== null && placementProp !== void 0 ? placementProp : isPopupDirectionTop ? "top-end" : "bottom-end";
    var bodyClickListener = (0, _useEventListener.useEventListener)("click", function(e) {
        var dropdownElement = elementRef === null || elementRef === void 0 ? void 0 : elementRef.current;
        if (dropdownElement && !dropdownElement.contains(e.target)) {
            onClose === null || onClose === void 0 ? void 0 : onClose();
        }
    });
    _react.useEffect(function() {
        setTimeout(function() {
            bodyClickListener.add(document.body);
        });
    }, [
        bodyClickListener,
        document
    ]);
    var onClick = _react.useCallback(function(e) {
        return e.stopPropagation();
    }, []);
    var targetRef = _react.useMemo(function() {
        if ((0, _isRefObject.isRefObject)(toggleRef)) {
            return toggleRef;
        }
        return {
            current: toggleRef
        };
    }, [
        toggleRef
    ]);
    return /*#__PURE__*/ _react.createElement(_Popper.Popper, {
        targetRef: targetRef,
        offsetDistance: popupOffsetDistance,
        placement: placement,
        className: (0, _vkjs.classNames)("vkuiActionSheet", platform === _platform.Platform.IOS && "vkuiActionSheet--ios", "vkuiActionSheet--menu", sizeY === _adaptivity.SizeType.COMPACT && "vkuiActionSheet--sizeY-compact", className),
        style: style,
        getRef: elementRef,
        forcePortal: false
    }, /*#__PURE__*/ _react.createElement(_FocusTrap.FocusTrap, _object_spread_props._(_object_spread._({
        onClose: onClose
    }, restProps), {
        onClick: onClick
    }), children));
};

//# sourceMappingURL=ActionSheetDropdownMenu.js.map