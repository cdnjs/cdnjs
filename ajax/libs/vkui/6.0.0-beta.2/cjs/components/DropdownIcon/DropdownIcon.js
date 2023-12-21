"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "DropdownIcon", {
    enumerable: true,
    get: function() {
        return DropdownIcon;
    }
});
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _object_spread = require("@swc/helpers/_/_object_spread");
const _object_without_properties = require("@swc/helpers/_/_object_without_properties");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _icons = require("@vkontakte/icons");
const _vkjs = require("@vkontakte/vkjs");
const _useAdaptivityConditionalRender = require("../../hooks/useAdaptivityConditionalRender");
const DropdownIcon = (_param)=>{
    var { opened = false, className } = _param, restProps = _object_without_properties._(_param, [
        "opened",
        "className"
    ]);
    const { sizeY } = (0, _useAdaptivityConditionalRender.useAdaptivityConditionalRender)();
    const IconCompact = opened ? _icons.Icon20ChevronUp : _icons.Icon20Dropdown;
    const IconRegular = opened ? _icons.Icon24ChevronUp : _icons.Icon24ChevronDown;
    return /*#__PURE__*/ _react.createElement(_react.Fragment, null, sizeY.compact && /*#__PURE__*/ _react.createElement(IconCompact, _object_spread._({
        className: (0, _vkjs.classNames)(sizeY.compact.className, className)
    }, restProps)), sizeY.regular && /*#__PURE__*/ _react.createElement(IconRegular, _object_spread._({
        className: (0, _vkjs.classNames)(sizeY.regular.className, className)
    }, restProps)));
};

//# sourceMappingURL=DropdownIcon.js.map