"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ActionSheetDropdown", {
    enumerable: true,
    get: function() {
        return ActionSheetDropdown;
    }
});
var _interopRequireWildcard = require("@swc/helpers/lib/_interop_require_wildcard.js").default;
var _objectSpread = require("@swc/helpers/lib/_object_spread.js").default;
var _objectSpreadProps = require("@swc/helpers/lib/_object_spread_props.js").default;
var _objectWithoutProperties = require("@swc/helpers/lib/_object_without_properties.js").default;
var _react = /*#__PURE__*/ _interopRequireWildcard(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var _useAdaptivityWithJSMediaQueries = require("../../hooks/useAdaptivityWithJSMediaQueries");
var _usePlatform = require("../../hooks/usePlatform");
var _adaptivity = require("../../lib/adaptivity");
var _platform = require("../../lib/platform");
var _focusTrap = require("../FocusTrap/FocusTrap");
var stopPropagation = function(e) {
    return e.stopPropagation();
};
var ActionSheetDropdown = function(_param) {
    var children = _param.children, closing = _param.closing, // these 2 props are only omitted - ActionSheetDesktop compat
    toggleRef = _param.toggleRef, className = _param.className, restProps = _objectWithoutProperties(_param, [
        "children",
        "closing",
        "toggleRef",
        "className"
    ]);
    var sizeY = (0, _useAdaptivityWithJSMediaQueries.useAdaptivityWithJSMediaQueries)().sizeY;
    var platform = (0, _usePlatform.usePlatform)();
    return /*#__PURE__*/ _react.createElement(_focusTrap.FocusTrap, _objectSpreadProps(_objectSpread({}, restProps), {
        onClick: stopPropagation,
        className: (0, _vkjs.classNames)("vkuiActionSheet", platform === _platform.Platform.IOS && "vkuiActionSheet--ios", closing && "vkuiActionSheet--closing", sizeY === _adaptivity.SizeType.COMPACT && "vkuiActionSheet--sizeY-compact", className)
    }), children);
};

//# sourceMappingURL=ActionSheetDropdown.js.map