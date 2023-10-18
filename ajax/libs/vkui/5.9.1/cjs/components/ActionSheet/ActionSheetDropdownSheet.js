"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ActionSheetDropdownSheet", {
    enumerable: true,
    get: function() {
        return ActionSheetDropdownSheet;
    }
});
var _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
var _object_spread = require("@swc/helpers/_/_object_spread");
var _object_spread_props = require("@swc/helpers/_/_object_spread_props");
var _object_without_properties = require("@swc/helpers/_/_object_without_properties");
var _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var _useAdaptivityWithJSMediaQueries = require("../../hooks/useAdaptivityWithJSMediaQueries");
var _usePlatform = require("../../hooks/usePlatform");
var _adaptivity = require("../../lib/adaptivity");
var _platform = require("../../lib/platform");
var _FocusTrap = require("../FocusTrap/FocusTrap");
var stopPropagation = function(e) {
    return e.stopPropagation();
};
var ActionSheetDropdownSheet = function(_param) {
    var children = _param.children, closing = _param.closing, // these 2 props are only omitted - ActionSheetDesktop compat
    toggleRef = _param.toggleRef, className = _param.className, restProps = _object_without_properties._(_param, [
        "children",
        "closing",
        "toggleRef",
        "className"
    ]);
    var sizeY = (0, _useAdaptivityWithJSMediaQueries.useAdaptivityWithJSMediaQueries)().sizeY;
    var platform = (0, _usePlatform.usePlatform)();
    return /*#__PURE__*/ _react.createElement(_FocusTrap.FocusTrap, _object_spread_props._(_object_spread._({}, restProps), {
        onClick: stopPropagation,
        className: (0, _vkjs.classNames)("vkuiActionSheet", platform === _platform.Platform.IOS && "vkuiActionSheet--ios", closing && "vkuiActionSheet--closing", sizeY === _adaptivity.SizeType.COMPACT && "vkuiActionSheet--sizeY-compact", className)
    }), children);
};

//# sourceMappingURL=ActionSheetDropdownSheet.js.map