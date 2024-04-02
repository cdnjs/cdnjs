"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "CustomSelectDropdown", {
    enumerable: true,
    get: function() {
        return CustomSelectDropdown;
    }
});
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _object_spread = require("@swc/helpers/_/_object_spread");
const _object_without_properties = require("@swc/helpers/_/_object_without_properties");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _vkjs = require("@vkontakte/vkjs");
const _CustomScrollView = require("../CustomScrollView/CustomScrollView");
const _Popper = require("../Popper/Popper");
const _Spinner = require("../Spinner/Spinner");
const calcIsTop = (placement)=>placement.startsWith('top');
const CustomSelectDropdown = (_param)=>{
    var { children, targetRef, scrollBoxRef, placement = 'bottom', fetching, onPlacementChange: parentOnPlacementChange, offsetDistance = 0, autoWidth = false, forcePortal = true, autoHideScrollbar, autoHideScrollbarDelay, className, noMaxHeight = false } = _param, restProps = _object_without_properties._(_param, [
        "children",
        "targetRef",
        "scrollBoxRef",
        "placement",
        "fetching",
        "onPlacementChange",
        "offsetDistance",
        "autoWidth",
        "forcePortal",
        "autoHideScrollbar",
        "autoHideScrollbarDelay",
        "className",
        "noMaxHeight"
    ]);
    const [isTop, setIsTop] = _react.useState(()=>calcIsTop(placement));
    const onPlacementChange = _react.useCallback((placement)=>{
        setIsTop(calcIsTop(placement));
        if (parentOnPlacementChange) {
            parentOnPlacementChange(placement);
        }
    }, [
        parentOnPlacementChange
    ]);
    return /*#__PURE__*/ _react.createElement(_Popper.Popper, _object_spread._({
        targetRef: targetRef,
        offsetByMainAxis: offsetDistance,
        sameWidth: !autoWidth,
        onPlacementChange: onPlacementChange,
        placement: placement,
        className: (0, _vkjs.classNames)("vkuiCustomSelectDropdown", 'vkuiInternalCustomSelectDropdown', offsetDistance === 0 && (isTop ? "vkuiCustomSelectDropdown--top" : "vkuiCustomSelectDropdown--bottom"), autoWidth && (0, _vkjs.classNames)("vkuiCustomSelectDropdown--wide", 'vkuiInternalCustomSelectDropdown--wide'), className),
        usePortal: forcePortal,
        autoUpdateOnTargetResize: true
    }, restProps), /*#__PURE__*/ _react.createElement(_CustomScrollView.CustomScrollView, {
        boxRef: scrollBoxRef,
        className: noMaxHeight ? undefined : "vkuiCustomSelectDropdown__in--withMaxHeight",
        autoHideScrollbar: autoHideScrollbar,
        autoHideScrollbarDelay: autoHideScrollbarDelay
    }, fetching ? /*#__PURE__*/ _react.createElement("div", {
        className: "vkuiCustomSelectDropdown__fetching"
    }, /*#__PURE__*/ _react.createElement(_Spinner.Spinner, {
        size: "small"
    })) : children));
};

//# sourceMappingURL=CustomSelectDropdown.js.map