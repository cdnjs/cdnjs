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
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _object_spread = require("@swc/helpers/_/_object_spread");
const _object_spread_props = require("@swc/helpers/_/_object_spread_props");
const _object_without_properties = require("@swc/helpers/_/_object_without_properties");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _vkjs = require("@vkontakte/vkjs");
const _useAdaptivityWithJSMediaQueries = require("../../hooks/useAdaptivityWithJSMediaQueries");
const _usePlatform = require("../../hooks/usePlatform");
const _FocusTrap = require("../FocusTrap/FocusTrap");
const stopPropagation = (e)=>e.stopPropagation();
const ActionSheetDropdownSheet = (_param)=>{
    var { children, closing, // these 2 props are only omitted - ActionSheetDesktop compat
    toggleRef, className } = _param, restProps = _object_without_properties._(_param, [
        "children",
        "closing",
        "toggleRef",
        "className"
    ]);
    const { sizeY } = (0, _useAdaptivityWithJSMediaQueries.useAdaptivityWithJSMediaQueries)();
    const platform = (0, _usePlatform.usePlatform)();
    return /*#__PURE__*/ _react.createElement(_FocusTrap.FocusTrap, _object_spread_props._(_object_spread._({}, restProps), {
        onClick: stopPropagation,
        className: (0, _vkjs.classNames)("vkuiActionSheet", platform === 'ios' && "vkuiActionSheet--ios", closing && "vkuiActionSheet--closing", sizeY === 'compact' && "vkuiActionSheet--sizeY-compact", className)
    }), children);
};

//# sourceMappingURL=ActionSheetDropdownSheet.js.map