"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    TOOLTIP_MAX_WIDTH: function() {
        return TOOLTIP_MAX_WIDTH;
    },
    TooltipBase: function() {
        return TooltipBase;
    }
});
var _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
var _object_spread = require("@swc/helpers/_/_object_spread");
var _object_spread_props = require("@swc/helpers/_/_object_spread_props");
var _object_without_properties = require("@swc/helpers/_/_object_without_properties");
var _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var _DefaultIcon = require("../PopperArrow/DefaultIcon");
var _PopperArrow = require("../PopperArrow/PopperArrow");
var _RootComponent = require("../RootComponent/RootComponent");
var _Subhead = require("../Typography/Subhead/Subhead");
var TOOLTIP_MAX_WIDTH = 220;
var stylesAppearance = {
    accent: "vkuiTooltipBase--appearance-accent",
    white: "vkuiTooltipBase--appearance-white",
    black: "vkuiTooltipBase--appearance-black",
    inversion: "vkuiTooltipBase--appearance-inversion"
};
var TooltipBase = function(_param) {
    var _param_appearance = _param.appearance, appearance = _param_appearance === void 0 ? "accent" : _param_appearance, _param_withArrow = _param.withArrow, withArrow = _param_withArrow === void 0 ? true : _param_withArrow, arrowCoords = _param.arrowCoords, _param_arrowPlacement = _param.arrowPlacement, arrowPlacement = _param_arrowPlacement === void 0 ? "top" : _param_arrowPlacement, getArrowRef = _param.getArrowRef, getRootRef = _param.getRootRef, floatingStyle = _param.floatingStyle, _param_ArrowIcon = _param.ArrowIcon, ArrowIcon = _param_ArrowIcon === void 0 ? _DefaultIcon.DefaultIcon : _param_ArrowIcon, text = _param.text, header = _param.header, _param_maxWidth = _param.maxWidth, maxWidth = _param_maxWidth === void 0 ? TOOLTIP_MAX_WIDTH : _param_maxWidth, restProps = _object_without_properties._(_param, [
        "appearance",
        "withArrow",
        "arrowCoords",
        "arrowPlacement",
        "getArrowRef",
        "getRootRef",
        "floatingStyle",
        "ArrowIcon",
        "text",
        "header",
        "maxWidth"
    ]);
    return /*#__PURE__*/ _react.createElement(_RootComponent.RootComponent, _object_spread_props._(_object_spread._({}, restProps), {
        baseClassName: (0, _vkjs.classNames)("vkuiTooltipBase", appearance !== "neutral" && stylesAppearance[appearance])
    }), /*#__PURE__*/ _react.createElement("div", {
        ref: getRootRef,
        style: floatingStyle
    }, withArrow && /*#__PURE__*/ _react.createElement(_PopperArrow.PopperArrow, {
        coords: arrowCoords,
        placement: arrowPlacement,
        arrowClassName: "vkuiTooltipBase__arrow",
        getRootRef: getArrowRef,
        Icon: ArrowIcon
    }), /*#__PURE__*/ _react.createElement("div", {
        className: "vkuiTooltipBase__content",
        style: maxWidth !== null ? {
            maxWidth: maxWidth
        } : undefined
    }, header && /*#__PURE__*/ _react.createElement(_Subhead.Subhead, {
        weight: "2"
    }, header), text && /*#__PURE__*/ _react.createElement(_Subhead.Subhead, null, text))));
};

//# sourceMappingURL=TooltipBase.js.map