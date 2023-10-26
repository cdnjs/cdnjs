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
var _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
var _icons = require("@vkontakte/icons");
var _utils = require("../../lib/utils");
var _IconButton = require("../IconButton/IconButton");
var CustomSelectClearButton = function(param) {
    var className = param.className, onClick = param.onClick;
    return /*#__PURE__*/ _react.createElement(_IconButton.IconButton, {
        className: className,
        Component: "div",
        onClick: function(e) {
            (0, _utils.stopPropagation)(e);
            onClick();
        },
        "aria-label": "Очистить поле",
        onKeyDown: _utils.stopPropagation,
        role: "button",
        activeMode: "opacity",
        hoverMode: "opacity"
    }, /*#__PURE__*/ _react.createElement(_icons.Icon16Cancel, null));
};

//# sourceMappingURL=CustomSelectClearButton.js.map