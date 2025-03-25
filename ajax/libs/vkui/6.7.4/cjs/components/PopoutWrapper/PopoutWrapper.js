"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "PopoutWrapper", {
    enumerable: true,
    get: function() {
        return PopoutWrapper;
    }
});
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _object_spread = require("@swc/helpers/_/_object_spread");
const _object_spread_props = require("@swc/helpers/_/_object_spread_props");
const _object_without_properties = require("@swc/helpers/_/_object_without_properties");
const _jsxruntime = require("react/jsx-runtime");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _vkjs = require("@vkontakte/vkjs");
const _RootComponent = require("../RootComponent/RootComponent");
const stylesAlignX = {
    center: "vkuiPopoutWrapper--alignX-center",
    left: "vkuiPopoutWrapper--alignX-left",
    right: "vkuiPopoutWrapper--alignX-right"
};
const stylesAlignY = {
    center: "vkuiPopoutWrapper--alignY-center",
    top: "vkuiPopoutWrapper--alignY-top",
    bottom: "vkuiPopoutWrapper--alignY-bottom"
};
const PopoutWrapper = (_param)=>{
    var { alignY = 'center', alignX = 'center', closing = false, noBackground = false, fixed = true, children, onClick } = _param, restProps = _object_without_properties._(_param, [
        "alignY",
        "alignX",
        "closing",
        "noBackground",
        "fixed",
        "children",
        "onClick"
    ]);
    return /*#__PURE__*/ (0, _jsxruntime.jsx)(_RootComponent.RootComponent, _object_spread_props._(_object_spread._({}, restProps), {
        baseClassName: (0, _vkjs.classNames)("vkuiPopoutWrapper", stylesAlignY[alignY], stylesAlignX[alignX], closing ? "vkuiPopoutWrapper--closing" : "vkuiPopoutWrapper--opened", fixed && "vkuiPopoutWrapper--fixed", !noBackground && "vkuiPopoutWrapper--masked"),
        children: /*#__PURE__*/ (0, _jsxruntime.jsxs)("div", {
            className: "vkuiPopoutWrapper__container",
            children: [
                /*#__PURE__*/ (0, _jsxruntime.jsx)("div", {
                    className: "vkuiPopoutWrapper__overlay",
                    onClick: onClick
                }),
                /*#__PURE__*/ (0, _jsxruntime.jsx)("div", {
                    className: "vkuiPopoutWrapper__content",
                    children: children
                })
            ]
        })
    }));
};

//# sourceMappingURL=PopoutWrapper.js.map