"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "Basic", {
    enumerable: true,
    get: function() {
        return Basic;
    }
});
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _object_spread = require("@swc/helpers/_/_object_spread");
const _object_spread_props = require("@swc/helpers/_/_object_spread_props");
const _object_without_properties = require("@swc/helpers/_/_object_without_properties");
const _jsxruntime = require("react/jsx-runtime");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _vkjs = require("@vkontakte/vkjs");
const _useAdaptivity = require("../../../../hooks/useAdaptivity");
const _RootComponent = require("../../../RootComponent/RootComponent");
const _Paragraph = require("../../../Typography/Paragraph/Paragraph");
const _Subhead = require("../../../Typography/Subhead/Subhead");
const stylesLayout = {
    none: "vkuiSnackbar--layout-none",
    vertical: "vkuiSnackbar--layout-vertical",
    horizontal: "vkuiSnackbar--layout-horizontal"
};
const sizeYClassNames = {
    none: "vkuiSnackbar--sizeY-none",
    regular: "vkuiSnackbar--sizeY-regular"
};
function Basic(_param) {
    var { layout: layoutProps, action, after, before, mode, subtitle, children } = _param, restProps = _object_without_properties._(_param, [
        "layout",
        "action",
        "after",
        "before",
        "mode",
        "subtitle",
        "children"
    ]);
    const { sizeY = 'none' } = (0, _useAdaptivity.useAdaptivity)();
    const layout = after || subtitle ? 'vertical' : 'none';
    return /*#__PURE__*/ (0, _jsxruntime.jsxs)(_RootComponent.RootComponent, _object_spread_props._(_object_spread._({}, restProps), {
        baseClassName: (0, _vkjs.classNames)("vkuiSnackbar__body", stylesLayout[layoutProps || layout], sizeY !== 'compact' && sizeYClassNames[sizeY], mode === 'dark' && "vkuiSnackbar--mode-dark"),
        children: [
            before && /*#__PURE__*/ (0, _jsxruntime.jsx)("div", {
                className: "vkuiSnackbar__before",
                children: before
            }),
            /*#__PURE__*/ (0, _jsxruntime.jsxs)("div", {
                className: "vkuiSnackbar__content",
                children: [
                    /*#__PURE__*/ (0, _jsxruntime.jsx)(_Paragraph.Paragraph, {
                        className: "vkuiSnackbar__content-text",
                        children: children
                    }),
                    subtitle && !action && /*#__PURE__*/ (0, _jsxruntime.jsx)(_Subhead.Subhead, {
                        className: "vkuiSnackbar__content-subtitle",
                        children: subtitle
                    }),
                    action && !subtitle && /*#__PURE__*/ (0, _jsxruntime.jsx)("div", {
                        className: "vkuiSnackbar__action",
                        children: action
                    })
                ]
            }),
            after && /*#__PURE__*/ (0, _jsxruntime.jsx)("div", {
                className: "vkuiSnackbar__after",
                children: after
            })
        ]
    }));
}

//# sourceMappingURL=Basic.js.map