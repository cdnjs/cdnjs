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
    PopoutRoot: function() {
        return PopoutRoot;
    },
    PopoutRootModal: function() {
        return PopoutRootModal;
    },
    PopoutRootPopout: function() {
        return PopoutRootPopout;
    }
});
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _object_spread = require("@swc/helpers/_/_object_spread");
const _object_spread_props = require("@swc/helpers/_/_object_spread_props");
const _object_without_properties = require("@swc/helpers/_/_object_without_properties");
const _jsxruntime = require("react/jsx-runtime");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _vkjs = require("@vkontakte/vkjs");
const _AppRootPortal = require("../AppRoot/AppRootPortal");
const _RootComponent = require("../RootComponent/RootComponent");
const PopoutRootPopout = (_param)=>{
    var { className } = _param, restProps = _object_without_properties._(_param, [
        "className"
    ]);
    return /*#__PURE__*/ (0, _jsxruntime.jsx)("div", _object_spread._({
        className: (0, _vkjs.classNames)("vkuiPopoutRoot__popout", className)
    }, restProps));
};
const PopoutRootModal = (_param)=>{
    var { className } = _param, restProps = _object_without_properties._(_param, [
        "className"
    ]);
    return /*#__PURE__*/ (0, _jsxruntime.jsx)("div", _object_spread._({
        className: (0, _vkjs.classNames)("vkuiPopoutRoot__modal", className)
    }, restProps));
};
const PopoutRoot = (_param)=>{
    var { popout, modal, children } = _param, restProps = _object_without_properties._(_param, [
        "popout",
        "modal",
        "children"
    ]);
    return /*#__PURE__*/ (0, _jsxruntime.jsxs)(_RootComponent.RootComponent, _object_spread_props._(_object_spread._({}, restProps), {
        baseClassName: "vkuiPopoutRoot",
        children: [
            children,
            /*#__PURE__*/ (0, _jsxruntime.jsxs)(_AppRootPortal.AppRootPortal, {
                children: [
                    !!popout && /*#__PURE__*/ (0, _jsxruntime.jsx)(PopoutRootPopout, {
                        children: popout
                    }),
                    !!modal && /*#__PURE__*/ (0, _jsxruntime.jsx)(PopoutRootModal, {
                        children: modal
                    })
                ]
            })
        ]
    }));
};

//# sourceMappingURL=PopoutRoot.js.map