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
var _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
var _object_spread = require("@swc/helpers/_/_object_spread");
var _object_spread_props = require("@swc/helpers/_/_object_spread_props");
var _object_without_properties = require("@swc/helpers/_/_object_without_properties");
var _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
var _icons = require("@vkontakte/icons");
var _utils = require("../../lib/utils");
var _IconButton = require("../IconButton/IconButton");
var CustomSelectClearButton = function(_param) {
    var className = _param.className, onClick = _param.onClick, restProps = _object_without_properties._(_param, [
        "className",
        "onClick"
    ]);
    return /*#__PURE__*/ _react.createElement(_IconButton.IconButton, _object_spread_props._(_object_spread._({
        Component: "button",
        "aria-label": "Очистить поле",
        onKeyDown: _utils.stopPropagation,
        type: "button",
        activeMode: "opacity",
        hoverMode: "opacity"
    }, restProps), {
        className: className,
        onClick: function(e) {
            (0, _utils.stopPropagation)(e);
            e.preventDefault();
            onClick();
        }
    }), /*#__PURE__*/ _react.createElement(_icons.Icon16Cancel, null));
};

//# sourceMappingURL=CustomSelectClearButton.js.map