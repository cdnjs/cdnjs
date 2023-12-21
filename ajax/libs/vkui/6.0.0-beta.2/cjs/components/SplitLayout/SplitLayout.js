"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "SplitLayout", {
    enumerable: true,
    get: function() {
        return SplitLayout;
    }
});
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _object_spread = require("@swc/helpers/_/_object_spread");
const _object_spread_props = require("@swc/helpers/_/_object_spread_props");
const _object_without_properties = require("@swc/helpers/_/_object_without_properties");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _vkjs = require("@vkontakte/vkjs");
const _usePlatform = require("../../hooks/usePlatform");
const _PopoutRoot = require("../PopoutRoot/PopoutRoot");
const SplitLayout = (_param)=>{
    var { popout, modal, header, children, getRootRef, getRef, className } = _param, restProps = _object_without_properties._(_param, [
        "popout",
        "modal",
        "header",
        "children",
        "getRootRef",
        "getRef",
        "className"
    ]);
    const platform = (0, _usePlatform.usePlatform)();
    return /*#__PURE__*/ _react.createElement(_PopoutRoot.PopoutRoot, {
        className: (0, _vkjs.classNames)("vkuiSplitLayout", platform === 'ios' && "vkuiSplitLayout--ios"),
        popout: popout,
        modal: modal,
        getRootRef: getRootRef
    }, header, /*#__PURE__*/ _react.createElement("div", _object_spread_props._(_object_spread._({}, restProps), {
        ref: getRef,
        className: (0, _vkjs.classNames)("vkuiSplitLayout__inner", !!header && "vkuiSplitLayout__inner--header", className)
    }), children));
};

//# sourceMappingURL=SplitLayout.js.map