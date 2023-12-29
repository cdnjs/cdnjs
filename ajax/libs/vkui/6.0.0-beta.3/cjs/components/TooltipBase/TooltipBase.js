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
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _object_spread = require("@swc/helpers/_/_object_spread");
const _object_spread_props = require("@swc/helpers/_/_object_spread_props");
const _object_without_properties = require("@swc/helpers/_/_object_without_properties");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _vkjs = require("@vkontakte/vkjs");
const _DefaultIcon = require("../FloatingArrow/DefaultIcon");
const _FloatingArrow = require("../FloatingArrow/FloatingArrow");
const _RootComponent = require("../RootComponent/RootComponent");
const _Subhead = require("../Typography/Subhead/Subhead");
const TOOLTIP_MAX_WIDTH = 220;
const stylesAppearance = {
    accent: "vkuiTooltipBase--appearance-accent",
    white: "vkuiTooltipBase--appearance-white",
    black: "vkuiTooltipBase--appearance-black",
    inversion: "vkuiTooltipBase--appearance-inversion"
};
const TooltipBase = (_param)=>{
    var { appearance = 'accent', arrowProps, ArrowIcon = _DefaultIcon.DefaultIcon, text, header, maxWidth = TOOLTIP_MAX_WIDTH, className } = _param, restProps = _object_without_properties._(_param, [
        "appearance",
        "arrowProps",
        "ArrowIcon",
        "text",
        "header",
        "maxWidth",
        "className"
    ]);
    return /*#__PURE__*/ _react.createElement(_RootComponent.RootComponent, _object_spread_props._(_object_spread._({}, restProps), {
        baseClassName: (0, _vkjs.classNames)("vkuiTooltipBase", appearance !== 'neutral' && stylesAppearance[appearance], className),
        role: "tooltip"
    }), arrowProps && /*#__PURE__*/ _react.createElement(_FloatingArrow.FloatingArrow, _object_spread_props._(_object_spread._({}, arrowProps), {
        iconClassName: (0, _vkjs.classNames)("vkuiTooltipBase__arrow", arrowProps.iconClassName),
        Icon: ArrowIcon
    })), /*#__PURE__*/ _react.createElement("div", {
        className: "vkuiTooltipBase__content",
        style: maxWidth !== null ? {
            maxWidth
        } : undefined
    }, header && /*#__PURE__*/ _react.createElement(_Subhead.Subhead, {
        weight: "2"
    }, header), text && /*#__PURE__*/ _react.createElement(_Subhead.Subhead, null, text)));
};

//# sourceMappingURL=TooltipBase.js.map