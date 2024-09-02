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
const _object_spread_props = require("@swc/helpers/_/_object_spread_props");
const _object_without_properties = require("@swc/helpers/_/_object_without_properties");
const _jsxruntime = require("react/jsx-runtime");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _vkjs = require("@vkontakte/vkjs");
const _CustomScrollView = require("../CustomScrollView/CustomScrollView");
const _Popper = require("../Popper/Popper");
const _Spinner = require("../Spinner/Spinner");
const CustomSelectDropdown = (_param)=>{
    var { children, targetRef, scrollBoxRef, placement = 'bottom', fetching, offsetDistance = 0, autoWidth = false, forcePortal = true, autoHideScrollbar, autoHideScrollbarDelay, className, noMaxHeight = false, // CustomScrollView
    overscrollBehavior } = _param, restProps = _object_without_properties._(_param, [
        "children",
        "targetRef",
        "scrollBoxRef",
        "placement",
        "fetching",
        "offsetDistance",
        "autoWidth",
        "forcePortal",
        "autoHideScrollbar",
        "autoHideScrollbarDelay",
        "className",
        "noMaxHeight",
        "overscrollBehavior"
    ]);
    return /*#__PURE__*/ (0, _jsxruntime.jsx)(_Popper.Popper, _object_spread_props._(_object_spread._({
        targetRef: targetRef,
        offsetByMainAxis: offsetDistance,
        sameWidth: !autoWidth,
        placement: placement,
        className: (0, _vkjs.classNames)("vkuiCustomSelectDropdown", 'vkuiInternalCustomSelectDropdown', offsetDistance === 0 && (placement.includes('top') ? "vkuiCustomSelectDropdown--top" : "vkuiCustomSelectDropdown--bottom"), autoWidth && (0, _vkjs.classNames)("vkuiCustomSelectDropdown--wide", 'vkuiInternalCustomSelectDropdown--wide'), className),
        usePortal: forcePortal,
        autoUpdateOnTargetResize: true
    }, restProps), {
        children: /*#__PURE__*/ (0, _jsxruntime.jsx)(_CustomScrollView.CustomScrollView, {
            boxRef: scrollBoxRef,
            className: noMaxHeight ? undefined : "vkuiCustomSelectDropdown__in--withMaxHeight",
            autoHideScrollbar: autoHideScrollbar,
            autoHideScrollbarDelay: autoHideScrollbarDelay,
            overscrollBehavior: overscrollBehavior,
            children: fetching ? /*#__PURE__*/ (0, _jsxruntime.jsx)("div", {
                className: "vkuiCustomSelectDropdown__fetching",
                children: /*#__PURE__*/ (0, _jsxruntime.jsx)(_Spinner.Spinner, {
                    size: "small"
                })
            }) : children
        })
    }));
};

//# sourceMappingURL=CustomSelectDropdown.js.map