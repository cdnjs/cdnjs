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
var _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
var _object_spread = require("@swc/helpers/_/_object_spread");
var _object_spread_props = require("@swc/helpers/_/_object_spread_props");
var _object_without_properties = require("@swc/helpers/_/_object_without_properties");
var _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var _usePlatform = require("../../hooks/usePlatform");
var _platform = require("../../lib/platform");
var _PopoutRoot = require("../PopoutRoot/PopoutRoot");
var SplitLayout = function(_param) {
    var popout = _param.popout, modal = _param.modal, header = _param.header, children = _param.children, getRootRef = _param.getRootRef, getRef = _param.getRef, className = _param.className, restProps = _object_without_properties._(_param, [
        "popout",
        "modal",
        "header",
        "children",
        "getRootRef",
        "getRef",
        "className"
    ]);
    var platform = (0, _usePlatform.usePlatform)();
    return /*#__PURE__*/ _react.createElement(_PopoutRoot.PopoutRoot, {
        className: (0, _vkjs.classNames)("vkuiSplitLayout", platform === _platform.Platform.IOS && "vkuiSplitLayout--ios"),
        popout: popout,
        modal: modal,
        getRootRef: getRootRef
    }, header, /*#__PURE__*/ _react.createElement("div", _object_spread_props._(_object_spread._({}, restProps), {
        ref: getRef,
        className: (0, _vkjs.classNames)("vkuiSplitLayout__inner", !!header && "vkuiSplitLayout__inner--header", className)
    }), children));
};

//# sourceMappingURL=SplitLayout.js.map