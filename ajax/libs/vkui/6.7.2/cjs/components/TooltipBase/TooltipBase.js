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
const _jsxruntime = require("react/jsx-runtime");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _icons = require("@vkontakte/icons");
const _vkjs = require("@vkontakte/vkjs");
const _DefaultIcon = require("../FloatingArrow/DefaultIcon");
const _FloatingArrow = require("../FloatingArrow/FloatingArrow");
const _RootComponent = require("../RootComponent/RootComponent");
const _Tappable = require("../Tappable/Tappable");
const _Subhead = require("../Typography/Subhead/Subhead");
const _VisuallyHidden = require("../VisuallyHidden/VisuallyHidden");
const TOOLTIP_MAX_WIDTH = 220;
const stylesAppearance = {
    accent: "vkuiTooltipBase--appearance-accent",
    white: "vkuiTooltipBase--appearance-white",
    black: "vkuiTooltipBase--appearance-black",
    inversion: "vkuiTooltipBase--appearance-inversion"
};
const TooltipBase = (_param)=>{
    var { appearance = 'accent', arrowProps, ArrowIcon = _DefaultIcon.DefaultIcon, text, header, maxWidth = TOOLTIP_MAX_WIDTH, closeIconLabel = 'Закрыть', onCloseIconClick, className } = _param, restProps = _object_without_properties._(_param, [
        "appearance",
        "arrowProps",
        "ArrowIcon",
        "text",
        "header",
        "maxWidth",
        "closeIconLabel",
        "onCloseIconClick",
        "className"
    ]);
    return /*#__PURE__*/ (0, _jsxruntime.jsxs)(_RootComponent.RootComponent, _object_spread_props._(_object_spread._({}, restProps), {
        baseClassName: (0, _vkjs.classNames)("vkuiTooltipBase", appearance !== 'neutral' && stylesAppearance[appearance], className),
        role: "tooltip",
        children: [
            arrowProps && /*#__PURE__*/ (0, _jsxruntime.jsx)(_FloatingArrow.FloatingArrow, _object_spread_props._(_object_spread._({}, arrowProps), {
                iconClassName: (0, _vkjs.classNames)("vkuiTooltipBase__arrow", arrowProps.iconClassName),
                Icon: ArrowIcon
            })),
            /*#__PURE__*/ (0, _jsxruntime.jsxs)("div", {
                className: "vkuiTooltipBase__content",
                style: maxWidth !== null ? {
                    maxWidth
                } : undefined,
                children: [
                    /*#__PURE__*/ (0, _jsxruntime.jsxs)("div", {
                        children: [
                            (0, _vkjs.hasReactNode)(header) && /*#__PURE__*/ (0, _jsxruntime.jsx)(_Subhead.Subhead, {
                                weight: "2",
                                children: header
                            }),
                            (0, _vkjs.hasReactNode)(text) && /*#__PURE__*/ (0, _jsxruntime.jsx)(_Subhead.Subhead, {
                                children: text
                            })
                        ]
                    }),
                    typeof onCloseIconClick === 'function' && /*#__PURE__*/ (0, _jsxruntime.jsxs)(_Tappable.Tappable, {
                        Component: "button",
                        className: "vkuiTooltipBase__closeButton",
                        hoverMode: "opacity",
                        activeMode: "opacity",
                        onClick: onCloseIconClick,
                        children: [
                            /*#__PURE__*/ (0, _jsxruntime.jsx)(_VisuallyHidden.VisuallyHidden, {
                                children: closeIconLabel
                            }),
                            /*#__PURE__*/ (0, _jsxruntime.jsx)(_icons.Icon16Cancel, {
                                display: "block"
                            })
                        ]
                    })
                ]
            })
        ]
    }));
};

//# sourceMappingURL=TooltipBase.js.map