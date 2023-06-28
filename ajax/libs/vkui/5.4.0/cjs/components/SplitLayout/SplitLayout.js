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
var _interopRequireWildcard = require("@swc/helpers/lib/_interop_require_wildcard.js").default;
var _objectSpread = require("@swc/helpers/lib/_object_spread.js").default;
var _objectSpreadProps = require("@swc/helpers/lib/_object_spread_props.js").default;
var _objectWithoutProperties = require("@swc/helpers/lib/_object_without_properties.js").default;
var _react = /*#__PURE__*/ _interopRequireWildcard(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var _usePlatform = require("../../hooks/usePlatform");
var _platform = require("../../lib/platform");
var _popoutRoot = require("../PopoutRoot/PopoutRoot");
var SplitLayout = function(_param) {
    var popout = _param.popout, modal = _param.modal, header = _param.header, children = _param.children, getRootRef = _param.getRootRef, getRef = _param.getRef, className = _param.className, restProps = _objectWithoutProperties(_param, [
        "popout",
        "modal",
        "header",
        "children",
        "getRootRef",
        "getRef",
        "className"
    ]);
    var platform = (0, _usePlatform.usePlatform)();
    return /*#__PURE__*/ _react.createElement(_popoutRoot.PopoutRoot, {
        className: (0, _vkjs.classNames)("vkuiSplitLayout", platform === _platform.Platform.IOS && "vkuiSplitLayout--ios"),
        popout: popout,
        modal: modal,
        getRootRef: getRootRef
    }, header, /*#__PURE__*/ _react.createElement("div", _objectSpreadProps(_objectSpread({}, restProps), {
        ref: getRef,
        className: (0, _vkjs.classNames)("vkuiSplitLayout__inner", !!header && "vkuiSplitLayout__inner--header", className)
    }), children));
};

//# sourceMappingURL=SplitLayout.js.map