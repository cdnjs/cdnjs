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
var _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
var _object_spread = require("@swc/helpers/_/_object_spread");
var _object_without_properties = require("@swc/helpers/_/_object_without_properties");
var _sliced_to_array = require("@swc/helpers/_/_sliced_to_array");
var _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var _CustomScrollView = require("../CustomScrollView/CustomScrollView");
var _Popper = require("../Popper/Popper");
var _Spinner = require("../Spinner/Spinner");
var calcIsTop = function(placement) {
    return placement === null || placement === void 0 ? void 0 : placement.includes("top");
};
var CustomSelectDropdown = function(_param) {
    var children = _param.children, targetRef = _param.targetRef, scrollBoxRef = _param.scrollBoxRef, placement = _param.placement, fetching = _param.fetching, parentOnPlacementChange = _param.onPlacementChange, _param_offsetDistance = _param.offsetDistance, offsetDistance = _param_offsetDistance === void 0 ? 0 : _param_offsetDistance, _param_sameWidth = _param.sameWidth, sameWidth = _param_sameWidth === void 0 ? true : _param_sameWidth, _param_forcePortal = _param.forcePortal, forcePortal = _param_forcePortal === void 0 ? true : _param_forcePortal, autoHideScrollbar = _param.autoHideScrollbar, autoHideScrollbarDelay = _param.autoHideScrollbarDelay, className = _param.className, _param_noMaxHeight = _param.noMaxHeight, noMaxHeight = _param_noMaxHeight === void 0 ? false : _param_noMaxHeight, restProps = _object_without_properties._(_param, [
        "children",
        "targetRef",
        "scrollBoxRef",
        "placement",
        "fetching",
        "onPlacementChange",
        "offsetDistance",
        "sameWidth",
        "forcePortal",
        "autoHideScrollbar",
        "autoHideScrollbarDelay",
        "className",
        "noMaxHeight"
    ]);
    var _React_useState = _sliced_to_array._(_react.useState(function() {
        return calcIsTop(placement);
    }), 2), isTop = _React_useState[0], setIsTop = _React_useState[1];
    var onPlacementChange = _react.useCallback(function(param) {
        var placement = param.placement;
        setIsTop(calcIsTop(placement));
        parentOnPlacementChange === null || parentOnPlacementChange === void 0 ? void 0 : parentOnPlacementChange(placement);
    }, [
        parentOnPlacementChange,
        setIsTop
    ]);
    return /*#__PURE__*/ _react.createElement(_Popper.Popper, _object_spread._({
        targetRef: targetRef,
        offsetDistance: offsetDistance,
        sameWidth: sameWidth,
        onPlacementChange: onPlacementChange,
        placement: placement,
        className: (0, _vkjs.classNames)("vkuiCustomSelectDropdown", "vkuiInternalCustomSelectDropdown", offsetDistance === 0 && (isTop ? "vkuiCustomSelectDropdown--top" : "vkuiCustomSelectDropdown--bottom"), sameWidth && (0, _vkjs.classNames)("vkuiCustomSelectDropdown--wide", "vkuiInternalCustomSelectDropdown--wide"), className),
        forcePortal: forcePortal,
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