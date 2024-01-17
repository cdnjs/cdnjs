"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "CustomSelectClearButton", {
    enumerable: true,
    get: function() {
        return CustomSelectClearButton;
    }
});
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _object_spread = require("@swc/helpers/_/_object_spread");
const _object_spread_props = require("@swc/helpers/_/_object_spread_props");
const _object_without_properties = require("@swc/helpers/_/_object_without_properties");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _icons = require("@vkontakte/icons");
const _utils = require("../../lib/utils");
const _IconButton = require("../IconButton/IconButton");
const CustomSelectClearButton = (_param)=>{
    var { className, onClick } = _param, restProps = _object_without_properties._(_param, [
        "className",
        "onClick"
    ]);
    return /*#__PURE__*/ _react.createElement(_IconButton.IconButton, _object_spread_props._(_object_spread._({
        Component: "button",
        label: "Очистить поле",
        onKeyDown: _utils.stopPropagation,
        type: "button",
        activeMode: "opacity",
        hoverMode: "opacity"
    }, restProps), {
        className: className,
        onClick: (e)=>{
            (0, _utils.stopPropagation)(e);
            e.preventDefault();
            onClick();
        }
    }), /*#__PURE__*/ _react.createElement(_icons.Icon16Cancel, null));
};

//# sourceMappingURL=CustomSelectClearButton.js.map